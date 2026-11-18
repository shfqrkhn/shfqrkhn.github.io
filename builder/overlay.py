"""Rebuild overlay: copy the staged apps in rebuild/<app>/ to site/<app>/ after the legacy build has written site/.
The names come from one list, site/scripts/overlay.json ("apps": the folders to publish, "skip": folders and files that are never published).
No rebuild/ folder means nothing happens. A name clash, a symlink, a folder not on the list or a folder with no index.html stops the build.
Rules and how to use it: docs/FRAMEWORK.md (Publish a staged rebuild app)."""
import json, os, shutil

JUNK = (".git", "__pycache__", "node_modules")


def names(site_dir):
    """(apps, skip) from site/scripts/overlay.json, the one list the builder, the gates and the worker share."""
    d = json.load(open(os.path.join(site_dir, "scripts", "overlay.json"), encoding="utf-8"))
    apps, skip = d.get("apps"), d.get("skip")
    if not (isinstance(apps, list) and isinstance(skip, list) and all(isinstance(x, str) and x for x in apps + skip)):
        raise ValueError("overlay.json: 'apps' and 'skip' must be lists of folder names")
    return apps, skip


def _links(root):
    """Every symlink or junction under root (and root itself)."""
    isj = getattr(os.path, "isjunction", lambda p: False)
    bad = [root] if os.path.islink(root) or isj(root) else []
    for dp, dn, fn in os.walk(root):
        bad += [os.path.join(dp, x) for x in dn + fn if os.path.islink(os.path.join(dp, x)) or isj(os.path.join(dp, x))]
    return bad


def apply(rebuild_dir, site_dir, apps, skip):
    """Copy each staged app folder to site/<name>/. Returns the list of names copied. Raises ValueError with every problem listed."""
    if not os.path.isdir(rebuild_dir):
        return []
    taken = {x.lower() for x in os.listdir(site_dir)}  # case-blind: a Windows build must not hide a clash the live host would show
    problems, todo = [], []
    for name in sorted(os.listdir(rebuild_dir)):
        src = os.path.join(rebuild_dir, name)
        if name in skip or not (os.path.isdir(src) or os.path.islink(src)):
            continue  # stubs/, root/ and top-level files such as receipts never reach the site
        if name not in apps:
            problems.append("rebuild/%s is not listed in site/scripts/overlay.json (add the name there, or remove the folder)" % name)
            continue
        if name.lower() in taken:
            problems.append("rebuild/%s clashes with site/%s, which the legacy build already owns" % (name, name))
            continue
        links = _links(src)
        if links:
            problems.append("rebuild/%s holds a symlink or junction: %s" % (name, ", ".join(os.path.relpath(x, src) for x in links[:3])))
            continue
        if not os.path.isfile(os.path.join(src, "index.html")):
            problems.append("rebuild/%s has no index.html" % name)
            continue
        todo.append((name, src))
    if problems:
        raise ValueError("\n".join(problems))
    for name, src in todo:
        for dp, dn, fn in os.walk(src):
            dn[:] = sorted(x for x in dn if x not in JUNK)
            dest = os.path.join(site_dir, name, os.path.relpath(dp, src))
            os.makedirs(dest, exist_ok=True)
            for f in sorted(fn):
                shutil.copyfile(os.path.join(dp, f), os.path.join(dest, f))  # content only: no timestamps, so the output stays identical
    return [n for n, _ in todo]
