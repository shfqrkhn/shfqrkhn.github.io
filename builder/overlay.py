"""Rebuild overlay: copy the staged apps in rebuild/<app>/ to site/<app>/ after the legacy build has written site/.
The names come from one list, site/scripts/overlay.json ("apps": the folders to publish, "skip": folders and files that are never published).
No rebuild/ folder means nothing happens. A name clash, a symlink, a folder not on the list or a folder with no index.html stops the build.
Rules and how to use it: docs/FRAMEWORK.md (Publish a staged rebuild app).
The site root is a separate, later step: python builder/overlay.py --root, run after the build and the self-test have passed on the
legacy hub (see apply_root and docs/FRAMEWORK.md, Publish the staged root)."""
import json, os, shutil, subprocess, sys

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


def root_rules(site_dir):
    """The "root" entry of site/scripts/overlay.json: replace (root files the staged root may overwrite), skip (staged names never
    published) and keep_hub (the file name the legacy hub page is kept under, so its catalog stays live). None when absent."""
    d = json.load(open(os.path.join(site_dir, "scripts", "overlay.json"), encoding="utf-8")).get("root")
    if d is None:
        return None
    ok = isinstance(d, dict) and all(isinstance(d.get(k), list) and all(isinstance(x, str) and x and "/" not in x for x in d[k]) for k in ("replace", "skip"))
    if not (ok and isinstance(d.get("keep_hub"), str) and d["keep_hub"].endswith(".html") and "/" not in d["keep_hub"]):
        raise ValueError("overlay.json: 'root' needs 'replace' and 'skip' (lists of names) and 'keep_hub' (a .html file name)")
    return d


def apply_root(root_dir, site_dir, rules):
    """Publish the staged root (rebuild/root/) at site/. The legacy hub page is first kept as site/<keep_hub>; then each staged name
    in rules["replace"] overwrites its site file, names in rules["skip"] are left out, and every other name must be new to the site
    (case-blind). Returns the names copied. Raises ValueError with every problem listed; nothing is written then."""
    if rules is None or not os.path.isdir(root_dir):
        return []
    taken = {x.lower() for x in os.listdir(site_dir)}
    problems, todo = [], []
    if not os.path.isfile(os.path.join(root_dir, "index.html")):
        problems.append("rebuild/root has no index.html")
    if rules["keep_hub"].lower() in taken:
        problems.append("site/%s already exists, so the legacy hub cannot be kept there" % rules["keep_hub"])
    links = _links(root_dir)
    if links:
        problems.append("rebuild/root holds a symlink or junction: %s" % ", ".join(os.path.relpath(x, root_dir) for x in links[:3]))
    for name in sorted(os.listdir(root_dir)):
        if name in rules["skip"] or name in JUNK:
            continue
        src = os.path.join(root_dir, name)
        if name in rules["replace"]:
            if not os.path.isfile(src):
                problems.append("rebuild/root/%s must be a file to replace the site's" % name)
                continue
        elif name.lower() in taken:
            problems.append("rebuild/root/%s clashes with site/%s, which the legacy build owns (list it in root.replace or root.skip)" % (name, name))
            continue
        todo.append(name)
    if problems:
        raise ValueError("\n".join(problems))
    shutil.copyfile(os.path.join(site_dir, "index.html"), os.path.join(site_dir, rules["keep_hub"]))
    for name in todo:
        src = os.path.join(root_dir, name)
        if os.path.isfile(src):
            shutil.copyfile(src, os.path.join(site_dir, name))
            continue
        for dp, dn, fn in os.walk(src):
            dn[:] = sorted(x for x in dn if x not in JUNK)
            dest = os.path.join(site_dir, name, os.path.relpath(dp, src))
            os.makedirs(dest, exist_ok=True)
            for f in sorted(fn):
                shutil.copyfile(os.path.join(dp, f), os.path.join(dest, f))
    return todo


if __name__ == "__main__":
    if sys.argv[1:] != ["--root"]:
        print("usage: python builder/overlay.py --root   (after build.py and selftest.py have passed)"); sys.exit(2)
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from paths import OM, OUT, REBUILD
    try:
        done = apply_root(os.path.join(REBUILD, "root"), OUT, root_rules(OUT))
    except ValueError as e:
        print("FAILED root overlay:\n" + str(e)); sys.exit(1)
    if not done:
        print("root overlay: nothing staged, the legacy hub stays at the root"); sys.exit(0)
    names_file = os.path.join(OM, "privacy_names.txt")  # the same privacy gate build.py runs, now over the published root
    r = subprocess.run([sys.executable, "-B", os.path.join(OUT, "scripts", "check_privacy.py"), "--root", OUT] + (["--names", names_file] if os.path.exists(names_file) else []), capture_output=True, text=True)
    if r.returncode:
        print("FAILED privacy gate after the root overlay:\n" + r.stdout[-1500:]); sys.exit(1)
    print("root overlay: " + ", ".join(done) + "; privacy gate passed")
