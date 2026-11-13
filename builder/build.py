"""Omnevum site builder: the one command.   python builder/build.py
Reads this folder (registry.json = every hand-built page, icons.json, topics.json, today_data.json), the content pages in
site/content (content/<kind>/<slug>.json), and the single-file apps in sources/apps.
Writes the hub, group pages, worker, manifest and 404 into site, then runs the privacy gate on sources and output.
Rules and how to extend it: docs/FRAMEWORK.md."""
import os, sys, re, json, hashlib, base64, html, glob
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import OUT, V, APPS_DIR, SUP, DOCS
VERSION = "1.4.3"
REG = json.load(open(os.path.join(OM, "registry.json"), encoding="utf-8"))["pages"]
TOPICS = json.load(open(os.path.join(OM, "topics.json"), encoding="utf-8"))
BRAND = json.load(open(os.path.join(OM, "brand.json"), encoding="utf-8"))  # the one place the name, pronunciation and blurbs live
for _k, _v in BRAND.items():
    if not isinstance(_v, str) or re.search("[%<>" + chr(34) + chr(13) + chr(10) + "]|@@", _v):
        raise SystemExit("brand.json: '%s' must be text without a percent sign, <, >, a double quote, @@ or a line break" % _k)
BN = BRAND["name"]
ARCHIVED = {p["id"] for p in REG if p.get("archived")}


def _hide(text):
    """In CI the log is public: replace every private name (case-insensitive) before anything is printed."""
    names_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "privacy_names.txt")
    if not os.environ.get("CI") or not os.path.exists(names_file):
        return text
    for n in sorted({l.strip() for l in open(names_file, encoding="utf-8-sig") if l.strip() and not l.startswith("#")}, key=len, reverse=True):
        text = re.sub(re.escape(n), "[hidden in CI]", text, flags=re.I)
    return text


def _hook(kind, value, tb):  # an assert or crash message can carry a registry value: hide private names there too
    import traceback
    if _RESTORE:  # a crash after FRAMEWORK.md was rewritten must not leave it changed
        open(_RESTORE[0], "w", encoding="utf-8", newline="\n").write(_RESTORE[1])
    sys.stderr.write(_hide("".join(traceback.format_exception(kind, value, tb))))


sys.excepthook = _hook
import signal, atexit
try:
    signal.signal(signal.SIGTERM, lambda *a: sys.exit(143))  # a stopped build runs the restore below
except (ValueError, AttributeError, OSError):
    pass


def _restore_at_exit():
    if _RESTORE and not _DONE:
        open(_RESTORE[0], "w", encoding="utf-8", newline="\n").write(_RESTORE[1])


_DONE = False
atexit.register(_restore_at_exit)


_RESTORE = None  # (path, text): a tracked file this build rewrote, put back if a later gate fails


def fail(problems):
    if _RESTORE:
        open(_RESTORE[0], "w", encoding="utf-8", newline="\n").write(_RESTORE[1])
    print(_hide("\nThe build stopped. Fix these, then run it again:\n" + "\n".join("  - " + x for x in problems)))
    raise SystemExit(1)


def check_registry():
    """Plain-language validation: every problem is listed at once, none is silent."""
    kinds = {"apps", "tools", "games", "guides", "recipes", "courses", "references"}
    topics = {t["id"] for t in TOPICS}; icons = json.load(open(os.path.join(OM, "icons.json"), encoding="utf-8"))
    errs, ids, slugs, sources = [], set(), set(), set()
    if not all(isinstance(p, dict) for p in REG):
        return ["registry: each page must be an object"]
    for p in REG:
        who = p.get("id", "(an entry with no id)") if isinstance(p, dict) and isinstance(p.get("id"), str) else "(an entry with no valid id)"
        if not isinstance(p, dict): errs.append("%s: each page must be an object" % who); continue
        _bad = [k for k in ("id", "title", "kind", "slug", "source", "topic", "blurb", "keywords", "icon", "tagline", "form", "license", "version", "url", "host") if k in p and not isinstance(p[k], str)]
        _bad += [k for k in ("aliases", "former_names") if k in p and not (isinstance(p[k], list) and all(isinstance(x, str) for x in p[k]))]
        _bad += [k for k in ("private", "archived", "lazy", "pwa", "wasm", "big") if k in p and not isinstance(p[k], bool)]
        _bad += [k for k in ("hue",) if k in p and p[k] is not None and (not isinstance(p[k], int) or isinstance(p[k], bool))]
        if _bad: errs.append("%s: wrong type for %s (text, a list of text, true or false, or a whole number as the field needs)" % (who, ", ".join(_bad))); continue
        if "@@" in json.dumps(p, ensure_ascii=False): errs.append("%s: @@ is reserved for build placeholders (in any field)" % who)
        for k in ("id", "title", "kind", "slug", "source", "topic", "blurb", "keywords", "icon", "tagline"):
            if k == "source" and p.get("form") == "remote": continue
            if not p.get(k) and p.get(k) is not False: errs.append("%s: missing '%s'" % (who, k))
        if p.get("kind") not in kinds: errs.append("%s: kind must be one of %s" % (who, ", ".join(sorted(kinds))))
        if p.get("topic") not in topics: errs.append("%s: topic '%s' is not in topics.json" % (who, p.get("topic")))
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", p.get("slug", "")) or len(p.get("slug", "")) > 60 or p.get("slug", "").split("-")[0] in {"con", "prn", "aux", "nul", "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9", "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"}: errs.append("%s: slug must be lowercase words joined by dashes, up to 60 characters, and not a Windows device name" % who)
        if len(p.get("blurb", "").split()) > 20: errs.append("%s: blurb is %d words (the limit is 20)" % (who, len(p["blurb"].split())))
        if len(p.get("title", "")) > 40: errs.append("%s: title is longer than 40 characters" % who)
        if len(p.get("tagline", "")) > 40: errs.append("%s: tagline is longer than 40 characters" % who)
        if re.search("[\u2013\u2014]", p.get("tagline", "") + p.get("title", "")): errs.append("%s: no em or en dashes in names" % who)
        if re.search(r"[\[\]]", p.get("title", "")): errs.append("%s: no square brackets in a title (they break the llms.txt link)" % who)
        if re.search(r"[|<>\r\n]", p.get("tagline", "") + p.get("title", "") + str(p.get("blurb", ""))): errs.append("%s: no |, <, > or line break in names or blurb (they break the inventory table and llms.txt)" % who)
        if any(k in p and not isinstance(p[k], str) for k in ("license", "version", "url", "host", "keywords", "title", "tagline", "blurb")): errs.append("%s: license, version, url, host, keywords, title, tagline and blurb must be text" % who)
        if re.search(r"[|<>\r\n]", "".join(str(p.get(k, "")) for k in ("license", "version", "url", "host"))): errs.append("%s: no |, <, > or line break in license, version, url or host" % who)
        if p.get("icon") not in icons: errs.append("%s: icon '%s' is not in icons.json" % (who, p.get("icon")))
        form = p.get("form", "single")
        if form not in FORMS: errs.append("%s: form must be one of %s" % (who, ", ".join(FORMS)))
        if form == "bundle" and not p.get("version"): errs.append("%s: a bundle needs a version" % who)
        if form == "remote":
            if not str(p.get("url", "")).startswith("https://"): errs.append("%s: a remote page needs an https url" % who)
            for k in ("host", "license"):
                if not p.get(k): errs.append("%s: a remote page needs '%s' (where it runs, and its licence)" % (who, k))
        if p.get("pwa") and form != "bundle": errs.append("%s: pwa is only for bundles (the page brings its own manifest and worker)" % who)
        if p.get("hue") is not None and not (isinstance(p["hue"], int) and 0 <= p["hue"] <= 359): errs.append("%s: hue must be a whole number from 0 to 359" % who)
        for al in p.get("aliases", []):
            if not re.fullmatch(r"[a-z]+/[a-z0-9-]+", al): errs.append("%s: alias '%s' must look like kind/slug" % (who, al))
        for al, pk in (p.get("alias_packs") or {}).items():
            if al not in p.get("aliases", []) or not re.fullmatch(r"[a-z0-9-]+", str(pk)): errs.append("%s: alias_packs entry '%s' needs an alias of this page and a pack slug" % (who, al))
        if who in ids: errs.append("%s: id used twice" % who)
        if (p.get("kind"), p.get("slug")) in slugs: errs.append("%s: address %s/%s used twice" % (who, p.get("kind"), p.get("slug")))
        if p.get("source") and p.get("source") in sources: errs.append("%s: source used twice" % who)
        ids.add(who); slugs.add((p.get("kind"), p.get("slug"))); sources.add(p.get("source"))
    _al = {}
    for p in REG:
        for al in p.get("aliases", []):
            if al in _al: errs.append("%s: alias %s is also an alias of %s" % (p.get("id"), al, _al[al]))
            _al[al] = p.get("id")
    _fold = {}
    for p in REG:
        if p.get("slug") in _fold: errs.append("%s: address folder '%s' is also used by %s (a slug must be unique across kinds)" % (p.get("id"), p.get("slug"), _fold[p.get("slug")]))
        _fold[p.get("slug")] = p.get("id")
    live = {"%s/%s" % (p.get("kind"), p.get("slug")) for p in REG}
    for p in REG:
        for al in p.get("aliases", []):
            if al in live: errs.append("%s: alias %s is a live address of another page" % (p.get("id"), al))
    if errs: fail(errs)


def gate(root, label):
    """Privacy gate on a folder. Runs before anything is written, and again on the output."""
    import subprocess
    names = os.path.join(OM, "privacy_names.txt")  # the private list: local, or written in CI from the PRIVACY_NAMES secret; without it the pattern checks still run
    r = subprocess.run([sys.executable, "-B", os.path.join(OUT, "scripts", "check_privacy.py"), "--root", root] + (["--names", names] if os.path.exists(names) else []), capture_output=True, text=True)
    print(_hide("privacy gate (%s): %s" % (label, (r.stdout.strip().splitlines() or ["no output"])[-1])))
    if r.returncode: fail(["privacy gate failed in " + label + ":\n" + r.stdout[-1500:]])




# A "form" is how a page is delivered. Adding a new technology means adding one row here and one branch in the places
# that use FORMS below; nothing else changes. Hosting stays static files on GitHub Pages (or any static host).
FORMS = {
    "single": "one self-contained HTML file in sources/apps (the default)",
    "bundle": "a folder of static files: assets, WebAssembly, or an app with its own PWA (set pwa: true); index.html is the entry",
    "remote": "an app hosted elsewhere (full stack with a backend, a live service): listed on the hub as an external link, never copied",
}
FOSS = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "MPL-2.0", "GPL-2.0-only", "GPL-2.0-or-later", "GPL-3.0-only", "GPL-3.0-or-later",
        "LGPL-3.0-or-later", "AGPL-3.0-only", "AGPL-3.0-or-later", "Unlicense", "CC0-1.0", "CC-BY-4.0", "CC-BY-SA-4.0", "OFL-1.1", "Zlib"}


def tree_files(d):
    out = []
    for dp, dn, fn in os.walk(d):
        dn[:] = sorted(x for x in dn if x not in (".git", "__pycache__", "node_modules"))
        for f in sorted(fn):
            full = os.path.join(dp, f); out.append((os.path.relpath(full, d).replace(os.sep, "/"), full))
    return sorted(out)


def tree_hash(d):
    """Same algorithm as scripts/check_site.py: sha256 over 'path NUL file-sha256' lines, sorted by path."""
    h = hashlib.sha256()
    for rel, full in tree_files(d):
        h.update((rel + chr(0) + hashlib.sha256(open(full, "rb").read()).hexdigest() + chr(10)).encode())
    return h.hexdigest()


ENGINE_MARK = re.compile(rb"<script>\n@@KD-ENGINE ([A-Za-z0-9.+-]+)@@\n</script>")


def inline_engine(raw, what=""):
    """Study readers keep one shared program in sources/engine/ENGN-KD-<name>.js. A source holds a marker where the program goes;
    the build puts the program back and recomputes the script pin, so the published page is the same as one with the program written out.
    A source without a marker passes through unchanged."""
    m = ENGINE_MARK.search(raw)
    if not m:
        assert b"@@KD-ENGINE" not in raw, ("malformed engine marker", what)
        return raw
    path = os.path.join(V, "engine", "ENGN-KD-" + m.group(1).decode() + ".js")
    assert os.path.isfile(path), ("engine file not found", what, path)
    body = open(path, "rb").read()
    assert b"</script" not in body.lower(), ("engine text would end the script early", path)
    out = raw[:m.start()] + b"<script>\n" + body + b"\n</script>" + raw[m.end():]
    assert out.count(b"<script>") == 1 and b"@@KD-ENGINE" not in out, ("a reader must hold one inline script", what)
    pin = base64.b64encode(hashlib.sha256((b"\n" + body + b"\n").replace(b"\r\n", b"\n")).digest())
    sm = re.search(rb"script-src[^;]*?'sha256-[A-Za-z0-9+/=]+'", out)
    assert sm, ("script-src pin not found", what)
    head = re.sub(rb"'sha256-[A-Za-z0-9+/=]+'", b"'sha256-" + pin + b"'", sm.group(0))
    return out[:sm.start()] + head + out[sm.end():]


def read_source(path):
    return inline_engine(open(path, "rb").read(), path)


def resolve(src):
    """A registry source is a file under sources/ (the highest -vX.Y.Z wins when it has a * ) or an absolute path."""
    if os.path.isabs(src):
        return src
    found = glob.glob(os.path.join(glob.escape(V), src.replace("/", os.sep)))
    assert found, ("source not found", src)
    def vkey(p):
        m = re.search(r"-v(\d+)\.(\d+)\.(\d+)\.html$", p)
        return tuple(int(x) for x in m.groups()) if m else (0, 0, 0)
    return sorted(found, key=vkey)[-1]


check_registry()
gate(APPS_DIR, "sources")
gate(DOCS, "docs")
gate(os.path.join(V, "method"), "method documents")
# the registry, icon list and the root documents carry names and text too: gate a copy of them
import tempfile, shutil
_stage = tempfile.mkdtemp()
_root = os.path.dirname(OM)
_staged = ["builder/registry.json", "builder/icons.json", "builder/topics.json", "builder/today_data.json", "builder/app-starter.html", "README.md", "AGENTS.md", "CLAUDE.md", "LICENSE",
           "CONTRIBUTING.md", "SECURITY.md", "requirements.txt", ".gitignore", ".github/pull_request_template.md", ".github/dependabot.yml", ".gitattributes", "builder/brand.json", "builder/sw.template.js"]
_staged += [".github/workflows/" + _f for _f in sorted(os.listdir(os.path.join(_root, ".github", "workflows")))] if os.path.isdir(os.path.join(_root, ".github", "workflows")) else []
_staged += ["converge/" + _f for _f in sorted(os.listdir(os.path.join(_root, "converge"))) if _f.endswith((".py", ".json", ".md"))] if os.path.isdir(os.path.join(_root, "converge")) else []
_staged += ["converge/change-requests/" + _f for _f in sorted(os.listdir(os.path.join(_root, "converge", "change-requests"))) if _f.endswith(".md")] if os.path.isdir(os.path.join(_root, "converge", "change-requests")) else []
_staged += ["builder/" + _f for _f in sorted(os.listdir(OM)) if _f.endswith(".py") and _f != "selftest.py"]  # builder code is scanned too (selftest.py plants fake data on purpose)
_missing = [_r for _r in _staged if not os.path.exists(os.path.join(_root, *_r.split("/")))]
if _missing and not os.environ.get("OMNEVUM_BUILDER"):  # a selftest copy of the builder has no repository around it
    fail(["the privacy gate's list names files that do not exist: " + ", ".join(_missing) + " (update the list in build.py)"])
for _rel in _staged:
    _src = os.path.join(_root, *_rel.split("/"))
    if os.path.exists(_src):
        os.makedirs(os.path.join(_stage, os.path.dirname(_rel)), exist_ok=True); shutil.copy(_src, os.path.join(_stage, *_rel.split("/")))
try:
    if os.listdir(_stage):  # empty only in a self-test copy of the builder
        gate(_stage, "registry and root documents")
finally:
    shutil.rmtree(_stage, ignore_errors=True)
if os.path.isdir(os.path.join(OUT, "content")): gate(os.path.join(OUT, "content"), "content")
APPS, META = [], {}
for p in REG:
    form = p.get("form", "single")
    a = dict(id=p["id"], title=p["title"], folder=p["slug"], form=form, lazy=p.get("lazy", True), sensitive=p.get("private", False),
             own_pwa=bool(p.get("pwa")), license=p.get("license", "MIT"), url=p.get("url"), host=p.get("host"), wasm=bool(p.get("wasm")),
             aliases=list(p.get("aliases", [])), alias_packs=dict(p.get("alias_packs", {})), hue=p.get("hue"), former_names=list(p.get("former_names", [])), tagline=p.get("tagline", ""), big=bool(p.get("big")))
    if form == "single":
        a["path"] = resolve(p["source"]); m = re.search(r"-v(\d+\.\d+\.\d+)\.html$", os.path.basename(a["path"]))
        a["version"] = m.group(1) if m else p.get("version", "")
        if not a["version"]: raise SystemExit("%s: a single page needs a version in its file name (-v1.0.0.html) or a version field" % p["id"])
        assert re.search(rb"(?<![\d.])" + re.escape(a["version"].encode()) + rb"(?!\d|\.\d)", open(a["path"], "rb").read()), ("version text not inside the file", p["id"], a["version"])
    elif form == "bundle":
        a["path"] = resolve(p["source"]); a["version"] = p["version"]
        assert os.path.isfile(os.path.join(a["path"], "index.html")), ("a bundle needs an index.html", p["id"])
        assert b'href="../../"' in open(os.path.join(a["path"], "index.html"), "rb").read(), ("a bundle's index.html needs a home link href=\"../../\"", p["id"])
    else:
        a["path"] = None; a["version"] = p.get("version", "live")
    APPS.append(a)
    META[p["id"]] = dict(topic=p["topic"], blurb=p["blurb"], keywords=p["keywords"], icon=p["icon"])
E = html.escape
PACK = os.path.join(OM, "icons", "phosphor")  # Phosphor Icons (MIT), see site/docs/ICONS-LICENSE.txt (generated)


def P(name, weight="regular"):
    """Inner markup of one Phosphor icon (viewBox 0 0 256 256, filled outlines). A missing name stops the build."""
    f = os.path.join(PACK, weight, name + ("-fill" if weight == "fill" else "") + ".svg")
    assert os.path.isfile(f), ("icon not found in the Phosphor pack (the repository keeps only the icons in use: run builder/fetch_icons.py to restore the full pack)", name, weight)
    return re.search(r"<svg[^>]*>(.*)</svg>", open(f, encoding="utf-8").read(), re.S).group(1)


# 24px stroke icons, one per page (icons.json)
IC = json.load(open(os.path.join(OM, "icons.json"), encoding="utf-8"))
TOPIC_IC = {k: P(v) for k, v in {"money": "coins", "health": "heartbeat", "home": "house-line", "food": "fork-knife", "games": "game-controller",
                                  "learning": "graduation-cap", "work": "users-three", "travel": "airplane-tilt", "local": "map-pin", "music": "music-notes", "ai": "cpu"}.items()}
HUE = {"money": 140, "health": 350, "home": 95, "food": 35, "games": 265, "learning": 215, "work": 190, "travel": 15, "local": 315, "music": 290, "ai": 240}
def svg(inner, cls=""):
    return '<svg%s viewBox="0 0 256 256" aria-hidden="true" focusable="false">%s</svg>' % (' class="%s"' % cls if cls else "", inner)
LOCK = P("lock-simple")
EXT = P("arrow-square-out")

apps = []
for a in APPS:
    m = META[a["id"]]
    if a["form"] == "single":
        b = read_source(a["path"]); sha = hashlib.sha256(b).hexdigest(); size = len(b)
    elif a["form"] == "bundle":
        sha = tree_hash(a["path"]); size = sum(os.path.getsize(f) for _, f in tree_files(a["path"]))
    else:
        sha = hashlib.sha256(a["url"].encode()).hexdigest(); size = 0
    apps.append(dict(a, cache=(a["version"] if a["version"] != "unversioned" else "20261030") + "-" + sha[:8], archived=a["id"] in ARCHIVED,
                     topic=m["topic"], blurb=m["blurb"], keywords=m["keywords"], icon=m["icon"], sha256=sha, size=size))
ids = [a["id"] for a in apps]

# Where each page lives: <kind>/<folder>/index.html. The kind is the only place to change when a page moves between groups;
# the archive is a display flag, not a folder, so retiring a page never changes its address.
KIND = {p["id"]: p["kind"] for p in REG}

def personalize(raw, blurb=""):
    """Load the shared personalization script at the end of the head of a page (before the body paints) and let the page's policy load scripts from its own site.
    Pages without a head or without a script-src (nothing could run there anyway) are left as they are."""
    if b"personalize.js" in raw or b"</head>" not in raw:
        return raw
    out = raw.replace(b"</head>", b'<script src="../../scripts/personalize.js"></script>\n</head>', 1)
    # Lighthouse: the charset must sit in the first 1024 bytes and a page needs a description; meta tags need no CSP hash
    if not re.search(rb"<meta[^>]+charset", out[:1024], re.I):
        # right after the doctype (the head start tag may be omitted), because a long licence comment pushes <head> past the first 1024 bytes
        out = re.sub(rb"(<!doctype html>)", lambda m: m.group(1) + b'<meta charset="utf-8">', out, count=1, flags=re.I)
    if blurb and not re.search(rb'<meta[^>]+name=["\']description', out, re.I):
        out = out.replace(b"</head>", b'<meta name="description" content="' + html.escape(blurb, quote=True).encode("utf-8") + b'">\n</head>', 1)
    m = re.search(rb"script-src ", out)
    if m and b"'self'" not in out[m.end():m.end() + 400].split(b";")[0]:
        out = out[:m.end()] + b"'self' " + out[m.end():]
    return out
assert set(KIND) == set(ids), set(KIND) ^ set(ids)
KINDS = [("apps", "Apps", P("squares-four")), ("tools", "Tools", P("wrench")), ("games", "Games", TOPIC_IC["games"]), ("guides", "Guides", P("book-open")),
         ("recipes", "Recipes", P("cooking-pot")), ("courses", "Courses", TOPIC_IC["learning"]), ("references", "References", P("bookmarks"))]
for a in apps:
    a["kind"] = KIND[a["id"]]; a["dir"] = None if a["form"] == "remote" else a["kind"] + "/" + a["folder"]
    if a["form"] == "single":
        # the apps link home with href="../"; one folder deeper in the site, home is "../../". Sources stay untouched (flat use in the sources).
        raw = read_source(a["path"])
        assert raw.count(b'href="../"') == 1, ("expected exactly one home link", a["id"])
        a["bytes"] = personalize(raw.replace(b'href="../"', b'href="../../"'), a["blurb"])
        a["sha256"] = hashlib.sha256(a["bytes"]).hexdigest(); a["size"] = len(a["bytes"])
        a["cache"] = (a["version"] if a["version"] != "unversioned" else "20261030") + "-" + a["sha256"][:8]

# ---- generated pages: content/<kind>/<slug>.json (one small data file per page)
sys.path.insert(0, os.path.join(OUT, "scripts"))
# ---- icon support files for the page generator (written first: build_pages reads them, and a clean checkout has none)
_ui = {"home": "house", "look": "sun", "reset": "arrow-counter-clockwise", "list": "list-bullets", "steps": "list-numbers", "text": "text-align-left", "table": "table"}
open(os.path.join(OUT, "scripts", "ui-icons.json"), "w", encoding="utf-8", newline="\n").write(json.dumps({k: P(v) for k, v in _ui.items()}, indent=1))
import build_pages
try:
    _content = build_pages.load_all(os.path.join(OUT, "content"))
except (ValueError, TypeError, KeyError) as _e:
    fail(["content page: %s" % _e])
for d in _content:
    raw = personalize(d["html"], d["blurb"]); sha = hashlib.sha256(raw).hexdigest(); pid = d["kind"] + "-" + d["slug"]
    assert pid not in KIND, ("duplicate id", pid)
    apps.append(dict(id=pid, title=d["title"], folder=d["slug"], version=d["version"], path=None, cache=d["version"] + "-" + sha[:8], lazy=True, sensitive=False,
                     archived=d["archived"], topic=d["topic"], blurb=d["blurb"], keywords=d["keywords"], sha256=sha, size=len(raw), kind=d["kind"], form="single", license=d.get("license", "MIT"), own_pwa=False, url=None, aliases=[], hue=d.get("hue"), former_names=[], tagline=d.get("tagline", ""),
                     dir=d["kind"] + "/" + d["slug"], bytes=raw))
    KIND[pid] = d["kind"]
    if d["archived"]: ARCHIVED.add(pid)
_slugs = {}
for a in apps:  # a slug is unique across every kind and both sources (registry and content pages): the 404 map forwards /<slug>/
    if a.get("folder") in _slugs: fail(["%s and %s share the address word '%s' (it must be unique across kinds)" % (_slugs[a["folder"]], a["id"], a["folder"])])
    _slugs[a.get("folder")] = a["id"]

def _tile(a, sect=False):
    hue = HUE[a["topic"]]  # a tile takes its section's hue, so colour means the topic; the page keeps its own accent hue inside
    ico = svg(P(IC[a["icon"]]) if a.get("icon") in IC else TOPIC_IC[a["topic"]])
    if a["sensitive"]:
        return ('<li><span class="tile held" role="img" aria-label="%s, private" style="--h:%d" data-k="%s">'
                '<span class="ic">%s<span class="lock">%s</span></span><span class="nm">%s</span></span></li>'
                % (E(a["title"]), hue, E((a["title"] + " " + a["keywords"]).lower()), ico, svg(LOCK), E(a["title"])))
    if a["form"] == "remote":
        return ('<li><a class="tile ext" href="%s" target="_blank" rel="noopener noreferrer" style="--h:%d" title="%s" data-k="%s"><span class="ic">%s<span class="lock">%s</span></span><span class="nm">%s</span></a></li>'
                % (E(a["url"]), hue, E(a["blurb"] + " (opens another site)"), E((a["title"] + " " + a["keywords"] + " " + a["blurb"]).lower()), ico, svg(EXT), E(a["title"])))
    return ('<li><a class="tile" href="./%s/" style="--h:%d" title="%s" data-k="%s"><span class="ic">%s</span><span class="nm">%s</span></a></li>'
            % (a["folder"] if sect else a["dir"], hue, E(a["blurb"]), E((a["title"] + " " + a["keywords"] + " " + a["blurb"]).lower()), ico, E(a["title"])))

def tile(a, sect=False):
    """A tile is the page's name with its plain descriptor under it, so a pun never has to carry the meaning alone."""
    h = _tile(a, sect); nm = '<span class="nm">%s</span>' % E(a["title"])
    return h.replace(nm, nm + ('<span class="tg">%s</span>' % E(a["tagline"]) if a.get("tagline") else ""), 1)


def section(sid, label_ic, label, items, extra=""):
    return ('<details class="sec" open%s data-s="%s"><summary><span class="sic" style="--h:%d">%s</span><h2>%s</h2></summary><ul class="grid" role="list">%s</ul></details>'
            % (extra, sid, HUE.get(sid, 220), svg(label_ic), E(label), "".join(tile(a) for a in items)))

# One rule places every page, archived or not: its topic decides the section, then its kind, then its title. Restoring a page from the Archive
# therefore puts it straight back where it belongs; nothing is remembered about where it used to sit.
KIND_RANK = {k: n for n, (k, _t, _i) in enumerate(KINDS)}
place = lambda a: (KIND_RANK[a["kind"]], a["title"].lower())
main = []
for t in TOPICS:
    items = sorted((a for a in apps if a["topic"] == t["id"] and not a["archived"]), key=place)
    if items: main.append(section(t["id"], TOPIC_IC[t["id"]], t["title"], items))
arch_items = [a for a in apps if a["archived"]]
ARCH_IC = P("archive")
arch_groups = "".join(
    '<h3 class="sub"><span class="sic" style="--h:%d">%s</span>%s</h3><ul class="grid" role="list">%s</ul>'
    % (HUE.get(t["id"], 220), svg(TOPIC_IC[t["id"]]), E(t["title"]), "".join(tile(a) for a in sorted((a for a in arch_items if a["topic"] == t["id"]), key=place)))
    for t in TOPICS if any(a["topic"] == t["id"] for a in arch_items))
archive = ('<details class="sec arch" data-s="archive"><summary><span class="sic" style="--h:220">%s</span><h2>Archive</h2><span class="n">%d</span></summary>%s</details>'
           % (svg(ARCH_IC), len(arch_items), arch_groups)) if arch_items else ""

today = json.load(open(os.path.join(OM, "today_data.json"), encoding="utf-8"))
tj = json.dumps({k: today[k] for k in ("quotes", "reflections", "meditations", "biases")}, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
catalog = [dict(id=a["id"], title=a["title"], kind=a["kind"], form=a.get("form", "single"), license=a.get("license", "MIT"), own_pwa=bool(a.get("own_pwa")),
                address=(a["url"] if a.get("form") == "remote" else "./%s/" % a["dir"]), version=a["version"], sha256=a["sha256"], size=a["size"],
                topic=a["topic"], sensitive=a["sensitive"], archived=a["archived"], hue=a.get("hue")) for a in apps]
cj = json.dumps(dict(version=VERSION, apps=catalog), ensure_ascii=False, indent=1).replace("<", "\\u003c")  # no < at all, so no title can open a tag or comment inside the script

CSS = open(os.path.join(OUT, "scripts", "ui.css"), encoding="utf-8").read()  # the one design system, shared with generated pages
CSS = re.sub(r"\n\s*", "\n", re.sub(r"/\*.*?\*/", "", CSS, flags=re.S).strip())
CSS += """
#pzd{border:1px solid var(--line);border-radius:var(--r);background:var(--card);color:var(--fg);padding:var(--s4);width:min(92vw,26rem);max-height:90vh;overflow:auto}
#pzd::backdrop{background:rgba(0,0,0,.5)}
#pzd h2{margin:0 0 var(--s3);font-size:1.15rem}
#pzd fieldset{border:0;margin:0 0 var(--s4);padding:0}
#pzd legend{font-weight:600;margin-bottom:var(--s2);padding:0}
.pzr{display:flex;align-items:center;gap:var(--s2);min-height:44px;cursor:pointer}
.pzr input{width:22px;height:22px;accent-color:var(--acc);flex:none}
#pzh{width:100%;min-height:44px;accent-color:var(--acc)}
.pzs{display:inline-block;width:28px;height:28px;border-radius:50%;border:1px solid var(--line);flex:none}
.pzb{display:flex;gap:var(--s2);justify-content:flex-end;flex-wrap:wrap}
.pzb button{min-height:44px;padding:0 var(--s4);border:1px solid var(--line);border-radius:var(--r);background:var(--card);color:inherit;font:inherit;cursor:pointer}
.pzb .pzp{background:var(--acc);color:var(--on-acc);border-color:var(--acc)}
#toast{position:fixed;left:50%;bottom:calc(var(--s4) + env(safe-area-inset-bottom));transform:translate(-50%,8px);max-width:calc(100vw - 2*var(--s4));padding:var(--s2) var(--s4);border-radius:var(--r);background:var(--fg);color:var(--bg);font-size:.9rem;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:50}
#toast.on{opacity:1;transform:translate(-50%,0)}
@media(prefers-reduced-motion:reduce){#toast{transition:none}}
/* Zen look (hub only): quiet space, hairlines, no shadow, an open enso ring by the name, slow fades. Kit tokens only. */
header.bar{padding-top:var(--s6)}
.brand b{font-weight:400;letter-spacing:.14em;text-transform:lowercase}
.brand b::before{content:"";display:inline-block;width:.8em;height:.8em;margin-right:.6em;border:1.5px solid var(--acc);border-top-color:transparent;border-radius:50%;rotate:-30deg;vertical-align:-.05em}
main.wrap{padding-top:var(--s4)}
.tile,.card,.today{box-shadow:none;border-color:color-mix(in srgb,var(--line) 70%,transparent)}
.tile{gap:var(--s2);padding:var(--s4) var(--s2);font-weight:400}
a.tile:hover{border-color:var(--acc)}
.sec{margin-top:var(--s6)}
@media(prefers-reduced-motion:no-preference){main.wrap{animation:zenin .6s ease-out}@keyframes zenin{from{opacity:0}to{opacity:1}}.brand b::before{transition:rotate .8s ease}.brand:hover b::before{rotate:330deg}}
@media(forced-colors:active){.brand b::before{border-color:CanvasText;border-top-color:transparent}}
"""

JS = r'''(function(){"use strict";
var $=function(i){return document.getElementById(i)},root=document.documentElement,KEY="hub.prefs.v1",LOOKS=["auto","paper","charcoal","black"];
var P={schemaVersion:1,look:"auto",hue:null,size:null};
try{var s=JSON.parse(localStorage.getItem(KEY)||"null");if(s){if(LOOKS.indexOf(s.look)>=0)P.look=s.look;if(Number.isInteger(s.hue)&&s.hue>=0&&s.hue<360)P.hue=s.hue;if([90,115,130].indexOf(s.size)>=0)P.size=s.size}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}
var NAMES={auto:"Auto",paper:"Light",charcoal:"Dark",black:"Black"};function dark(){return !!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)}
function look(){root.setAttribute("data-look",P.look);var b=$("look");var nm="Look: "+NAMES[P.look]+(P.look==="auto"?" ("+(dark()?"Dark":"Light")+")":"");b.setAttribute("aria-label",nm);b.title=nm;
 var m=document.querySelector('meta[name=theme-color]');if(m)m.content=getComputedStyle(document.body).backgroundColor}
var tt=null;
function toast(t){var e=$("toast");if(!e){e=document.createElement("div");e.id="toast";e.setAttribute("role","status");e.setAttribute("aria-live","polite");document.body.appendChild(e)}
 e.textContent=t;e.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){e.classList.remove("on")},1800)}
/* Auto already shows Light or Dark, so the cycle skips the look that would repeat it */
$("look").addEventListener("click",function(){var n=P.look,dup=dark()?"charcoal":"paper";
 do{n=LOOKS[(LOOKS.indexOf(n)+1)%LOOKS.length]}while(n===dup);
 P.look=n;save();look();toast("Look: "+NAMES[n]+(n==="auto"?" ("+(dark()?"Dark":"Light")+" on this device)":""))});look();
/* personalize: accent colour and text size for every page; the pages read the same saved choice */
var pzd=$("pzd"),pzh=$("pzh"),pzs=$("pzs");
function pzApply(){save();if(window.omnevumApply)window.omnevumApply()}
function pzPaint(){var own=P.hue===null;document.querySelector('input[name=hm][value='+(own?"own":"one")+']').checked=true;
 pzh.disabled=own;pzh.value=own?215:P.hue;pzs.style.background=own?"transparent":"hsl("+P.hue+" 70% 45%)";
 var z=document.querySelector('input[name=sz][value="'+(P.size||100)+'"]');if(z)z.checked=true}
$("pz").addEventListener("click",function(){pzPaint();if(pzd.showModal)pzd.showModal();else pzd.setAttribute("open","")});
$("pzx").addEventListener("click",function(){if(pzd.close)pzd.close();else pzd.removeAttribute("open")});
[].forEach.call(document.querySelectorAll("input[name=hm]"),function(r){r.addEventListener("change",function(){P.hue=r.value==="own"?null:+pzh.value;pzApply();pzPaint()})});
pzh.addEventListener("input",function(){P.hue=+pzh.value;pzApply();pzPaint()});
[].forEach.call(document.querySelectorAll("input[name=sz]"),function(r){r.addEventListener("change",function(){P.size=+r.value===100?null:+r.value;pzApply()})});
$("pzr").addEventListener("click",function(){P.hue=null;P.size=null;pzApply();pzPaint()});
/* say it */
var say=$("say");
if("speechSynthesis" in window&&window.SpeechSynthesisUtterance){say.hidden=false;say.addEventListener("click",function(){
 var u=new SpeechSynthesisUtterance("om nee vee um");u.lang="en";u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)})}
/* today */
var T=null,shown=sod(new Date());
fetch("./today.json").then(function(r){return r.ok?r.json():Promise.reject()}).then(function(d){T=d;$("today").hidden=false;paint()}).catch(function(){});
function sod(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function doy(d){return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(d.getFullYear(),0,0))/864e5)}
var fmt;try{fmt=new Intl.DateTimeFormat(undefined,{day:"numeric",month:"short"})}catch(e){}
function put(id,t){var el=$(id);el.textContent=t||"";el.hidden=!t}
function paint(){if(!T)return;var now=sod(new Date());if(shown>now)shown=now;var n=doy(shown)-1;
 function g(k){return (T[k]||[])[n]||["",""]}
 var q=g("quotes"),r=g("reflections"),m=g("meditations"),b=g("biases");
 put("qt",q[0]);put("qa",q[1]);put("rt",r[0]);put("rb",r[1]);put("mt",m[0]);put("mb",m[1]);put("bt",b[0]);put("bb",b[1]);
 $("dt").textContent=fmt?fmt.format(shown):shown.toDateString();$("nx").disabled=shown.getTime()===now.getTime()}
function mv(n){shown=new Date(shown.getFullYear(),shown.getMonth(),shown.getDate()+n);paint()}
$("pv").addEventListener("click",function(){mv(-1)});$("nx").addEventListener("click",function(){mv(1)});
document.addEventListener("visibilitychange",function(){if(!document.hidden)paint()});paint();
/* offline and updates */
if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1")){
 var sw=navigator.serviceWorker,had=!!sw.controller,ok=false,wt=null;
 function offer(w){wt=w;$("upd").hidden=false}
 sw.addEventListener("controllerchange",function(){if(!had){had=true;start();return}if(ok)location.reload();else offer(null)});
 $("updBtn").addEventListener("click",function(){if(wt){ok=true;wt.postMessage({type:"skip-waiting"})}else location.reload()});
 sw.register("./sw.js",{scope:"./"}).then(function(r){if(r.waiting&&sw.controller)offer(r.waiting);
  r.addEventListener("updatefound",function(){var w=r.installing;if(w)w.addEventListener("statechange",function(){if(w.state==="installed"&&sw.controller)offer(w)})})}).catch(function(){});
 /* offline readiness: the worker saves every page in the background; large pages wait for a tap */
 var off=$("off"),ins=$("install"),dip=null,done=0,total=0,big=0,persisted=false,waited=false;
 setTimeout(function(){waited=true;show()},6000);
 function show(){var st,t;
  if(!navigator.onLine){st="out";t="Offline. Saved pages work."}
  else if(total&&done<total&&total-done>big){st="busy";t="Saving for offline "+done+"/"+total}
  else if(big>0){st="idle";t="Tap to save the large pages for offline"}
  else if(total){st="ready";t="Ready offline";if(!persisted&&navigator.storage&&navigator.storage.persist){persisted=true;navigator.storage.persist().catch(function(){})}}
  else if(!total&&waited){st="idle";t="Tap to check offline status"}
  else{st="busy";t="Saving for offline"}
  off.setAttribute("data-s",st);off.title=t;off.setAttribute("aria-label",t);$("offTxt").textContent=t;off.querySelector(".cnt").textContent=st==="busy"&&total?done+"/"+total:""}
 function post(m){if(sw.controller)sw.controller.postMessage(m);else sw.ready.then(function(r){if(r.active)r.active.postMessage(m)})}
 function start(){if(navigator.onLine&&!(navigator.connection&&navigator.connection.saveData))post({type:"precache",big:false});post({type:"status"})}
 sw.addEventListener("message",function(e){var m=e.data;if(m&&m.type==="offline"){done=m.done;total=m.total;big=m.bigPending;show()}});
 off.hidden=false;show();start();sw.ready.then(start);
 window.addEventListener("online",function(){start();show()});window.addEventListener("offline",show);
 off.addEventListener("click",function(){if(!total){start();return}if(big>0&&navigator.onLine)post({type:"precache",big:true});else post({type:"status"})});
 window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();dip=e;ins.hidden=false});
 ins.addEventListener("click",function(){if(dip){dip.prompt();dip=null}ins.hidden=true});
 window.addEventListener("appinstalled",function(){ins.hidden=true})}
})();'''

GJS = """(function(){try{var s=JSON.parse(localStorage.getItem("hub.prefs.v1")||"null");if(s&&["auto","paper","charcoal","black"].indexOf(s.look)>=0)document.documentElement.setAttribute("data-look",s.look)}catch(e){}})();"""
def sri(s): return "sha256-" + base64.b64encode(hashlib.sha256(s.encode()).digest()).decode()
csp = "default-src 'none'; script-src 'self' '%s'; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'" % sri(JS)
I = lambda n: svg(n)
NUDGES = "".join(
    '<article class="nudge" style="--h:%d"><span class="nic">%s</span><div>%s</div></article>' % (h, svg(P(n, "fill")), body) for h, n, body in (
        (215, "quotes", '<p class="nb" id="qt"></p><p class="na" id="qa"></p>'),
        (265, "eye", '<p class="nt" id="rt"></p><p class="nb" id="rb"></p>'),
        (160, "flower-lotus", '<p class="nt" id="mt"></p><p class="nb" id="mb"></p>'),
        (25, "brain", '<p class="nt" id="bt"></p><p class="nb" id="bb"></p>')))
page = ('<!doctype html>\n<html lang="en" data-look="auto">\n<head>\n<meta charset="utf-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
 '<meta http-equiv="Content-Security-Policy" content="%s">\n<meta name="referrer" content="no-referrer">\n<script src="./scripts/personalize.js"></script>\n'
 '<meta name="description" content="' + BN + ' (' + BRAND["say"] + '): ' + BRAND["description"] + '">\n'
 '<meta name="color-scheme" content="light dark">\n<meta name="theme-color" content="#faf8f4">\n<meta name="omnevum-hub-version" content="%s">\n'
 '<title>' + BN + '</title>\n<link rel="icon" href="./icon.svg" type="image/svg+xml">\n<link rel="icon" href="./icons/icon-192.png" sizes="192x192" type="image/png">\n<link rel="apple-touch-icon" href="./icons/apple-touch-icon.png">\n<link rel="manifest" href="./manifest.webmanifest">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Omnevum">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n<style>%s</style>\n</head>\n<body>\n'
 '<a class="skip" href="#main">Skip</a>\n<header class="bar"><div class="wrap"><div class="top"><div class="brand"><b>' + BN + '</b>'
 '<span class="say"><span lang="en" title="/ˌɒmniˈviːəm/">om·nee·VEE·um</span>'
 '<button class="ib sm" id="say" type="button" aria-label="Hear it" title="Hear it" hidden>%s</button></span></div>'
 '<button class="ib" id="look" type="button" aria-label="Look" title="Look">%s</button></div>'
 '</div></header>\n'
 '<main class="wrap" id="main" tabindex="-1">\n<h1 class="vh">' + BN + '</h1>\n'
 '<section class="today" id="today" aria-label="Today"><div class="th"><span class="td">@@TODAY@@</span><span class="dt" id="dt" aria-live="polite"></span>'
 '<button class="ib sm" id="pv" type="button" aria-label="Previous day" title="Previous day">%s</button>'
 '<button class="ib sm" id="nx" type="button" aria-label="Next day" title="Next day">%s</button></div>@@NUDGES@@</section>\n'
 '%s\n'
 '\n%s\n</main>\n'
 '<footer class="wrap"><span>%s</span><span>Local. Offline. Yours.</span></footer>\n'
 '<div id="upd" hidden><button class="ib" id="updBtn" type="button" aria-label="Update" title="Update">%s</button></div>\n'
 '<script type="application/json" id="catalogData">%s</script>\n<script>%s</script>\n</body>\n</html>\n'
) % (csp, VERSION, CSS,
     I(P("speaker-high")), I(P("sun")),
     I(P("caret-left")), I(P("caret-right")), "\n".join(main), archive, VERSION,
     I(P("arrow-clockwise")), cj, JS)
present = [k for k in KINDS if any(a["kind"] == k[0] and not a["sensitive"] for a in apps)]
page = page.replace("@@TODAY@@", svg(P("sun-horizon"))).replace("@@NUDGES@@", NUDGES)
page = re.sub(r' data-k="[^"]*"', "", page)  # search is gone, so the tiles carry no search text
_btns = ('<button class="ib" id="install" type="button" aria-label="Install" title="Install" hidden>%s</button>'
         '<button class="ib off" id="off" type="button" data-s="busy" aria-label="Offline status" title="Offline status" hidden>%s%s%s%s<span class="cnt"></span><span class="vh" id="offTxt" role="status" aria-live="polite"></span></button>'
         % (svg(P("device-mobile")), svg(P("cloud-arrow-down"), "st st-idle"), svg(P("circle-notch"), "st st-busy"), svg(P("cloud-check"), "st st-ready"), svg(P("wifi-slash"), "st st-out")))
_pzbtn = '<button class="ib" id="pz" type="button" aria-label="Personalize" title="Personalize">%s</button>' % svg(P("sliders-horizontal"))
page = page.replace('<button class="ib" id="look"', _btns + _pzbtn + '<button class="ib" id="look"', 1)
_pzd = ('<dialog id="pzd" aria-labelledby="pzt"><h2 id="pzt">Personalize</h2>'
        '<fieldset><legend>Accent colour</legend>'
        '<label class="pzr"><input type="radio" name="hm" value="own" checked>Each page keeps its own</label>'
        '<label class="pzr"><input type="radio" name="hm" value="one">One colour for all <span class="pzs" id="pzs"></span></label>'
        '<input type="range" id="pzh" min="0" max="359" value="215" aria-label="Colour" disabled></fieldset>'
        '<fieldset><legend>Text size</legend>'
        '<label class="pzr"><input type="radio" name="sz" value="90">Small</label>'
        '<label class="pzr"><input type="radio" name="sz" value="100" checked>Default</label>'
        '<label class="pzr"><input type="radio" name="sz" value="115">Large</label>'
        '<label class="pzr"><input type="radio" name="sz" value="130">Larger</label></fieldset>'
        '<div class="pzb"><button type="button" id="pzr">Reset</button><button type="button" id="pzx" class="pzp">Done</button></div></dialog>\n')
page = page.replace('<div id="upd" hidden>', _pzd + '<div id="upd" hidden>', 1)
assert "life" + "os" not in page.lower()  # a retired product word that must never reappear (written in two pieces so the guard itself does not contain it)
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "today.json"), "w", encoding="utf-8", newline="\n").write(tj)
_ll = ["# " + BN, "", "> " + BRAND["llms_summary"], ""]
for _t in TOPICS:
    _items = [a for a in apps if a["topic"] == _t["id"] and not a["archived"] and not a["sensitive"] and a["form"] != "remote" and a["id"] not in ARCHIVED]
    if _items:
        _ll += ["## " + _t["title"], ""] + ["- [%s](/%s/): %s" % (a["title"], a["dir"], a["blurb"]) for a in sorted(_items, key=lambda x: x["title"])] + [""]
open(os.path.join(OUT, "llms.txt"), "w", encoding="utf-8", newline="\n").write("\n".join(_ll))  # llmstxt.org: a plain index for assistants
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8", newline="\n").write(page)

ship = [a for a in apps if not a["sensitive"] and a.get("form", "single") != "remote"]
import shutil
KEEP_ROOT = {"docs", ".github", ".git", "scripts", "content", "templates"}
for name in os.listdir(OUT):  # remove the old flat app folders and stale group folders; the build owns them
    full = os.path.join(OUT, name)
    if os.path.isdir(full) and name not in KEEP_ROOT:
        shutil.rmtree(full)
for a in ship:
    d = os.path.join(OUT, a["kind"], a["folder"]); os.makedirs(d, exist_ok=True)
    if a.get("form", "single") == "bundle":
        for rel, full in tree_files(a["path"]):
            dest = os.path.join(d, *rel.split("/")); os.makedirs(os.path.dirname(dest), exist_ok=True); shutil.copyfile(full, dest)
    else:
        open(os.path.join(d, "index.html"), "wb").write(a["bytes"])
for k, t, ic in present:
    items = [a for a in apps if a["kind"] == k and not a["sensitive"]]
    key = lambda x: x["title"].lower()
    live = "".join(tile(a, True) for a in sorted((a for a in items if not a["archived"]), key=key))
    old = [a for a in sorted(items, key=key) if a["archived"]]
    body = '<ul class="grid" role="list">%s</ul>' % live if live else ""
    if old:
        body += ('<details class="sec arch"><summary><span class="sic" style="--h:220">%s</span><h2>Archive</h2><span class="n">%d</span></summary>'
                 '<ul class="grid" role="list">%s</ul></details>' % (svg(ARCH_IC), len(old), "".join(tile(a, True) for a in old)))
    gp = ('<!doctype html>\n<html lang="en" data-look="auto"><head><meta charset="utf-8">'
          '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
          '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'%s\'; style-src \'unsafe-inline\'; img-src \'self\' data:; base-uri \'none\'; form-action \'none\'">'
          '<meta name="color-scheme" content="light dark"><meta name="description" content="%s: small offline pages on ' + BN + '."><title>%s - ' + BN + '</title>'
          '<link rel="icon" href="../icon.svg" type="image/svg+xml"><style>%s</style></head><body>'
          '<main class="wrap"><div class="ph"><a class="ib" href="../" aria-label="' + BN + ' home" title="' + BN + '">%s</a><h1>%s</h1></div>%s</main>'
          '<script>%s</script></body></html>\n') % (sri(GJS), E(t), E(t), CSS, svg(P("house")), E(t), body, GJS)
    open(os.path.join(OUT, k, "index.html"), "w", encoding="utf-8", newline="\n").write(re.sub(r' data-k="[^"]*"', "", gp))
BIG = 5_000_000  # pages over 5 MB download only when the owner taps (mobile data)
PAGES = {}
for a in ship:
    if a.get("own_pwa"): continue  # a page with its own PWA brings its own worker
    ent = dict(cache="app-%s-v%s" % (a["folder"], a["cache"]), start="./%s/" % a["dir"])
    if a.get("form", "single") == "bundle":
        ent["files"] = ["./%s/" % a["dir"]] + ["./%s/%s" % (a["dir"], rel) for rel, _ in tree_files(a["path"]) if rel != "index.html"]
    if a["size"] > BIG or a.get("big"): ent["big"] = True  # or the registry says so (big: true), for a large page that should wait for a tap
    PAGES[a["dir"]] = ent
SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./today.json", "./404.html", "./scripts/personalize.js", "./icons/icon-192.png", "./icons/icon-512.png"] + ["./%s/" % k for k, t, ic in present]
sw = open(os.path.join(OM, "sw.template.js"), encoding="utf-8").read().replace("@@VERSION@@", VERSION).replace("@@SHELL@@", json.dumps(SHELL)).replace("@@PAGES@@", json.dumps(PAGES, indent=1))
open(os.path.join(OUT, "sw.js"), "w", encoding="utf-8", newline="\n").write(sw)
# install icons: rendered once by make_icons.py, copied here byte for byte
os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)
for _f in ("icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"):
    shutil.copyfile(os.path.join(OM, "pwa-icons", _f), os.path.join(OUT, "icons", _f))
shutil.copyfile(os.path.join(OM, "pwa-icons", "favicon.svg"), os.path.join(OUT, "icon.svg"))
manifest = dict(
    id="./", name=BN, short_name=BN, description=BRAND["manifest_description"], lang="en", dir="ltr",
    start_url="./", scope="./", display="standalone", display_override=["standalone", "minimal-ui"], orientation="any",
    background_color="#faf8f4", theme_color="#faf8f4", categories=["productivity", "utilities", "lifestyle"], prefer_related_applications=False,
    icons=[dict(src="./icons/icon-192.png", sizes="192x192", type="image/png", purpose="any"), dict(src="./icons/icon-512.png", sizes="512x512", type="image/png", purpose="any"),
           dict(src="./icons/icon-maskable-512.png", sizes="512x512", type="image/png", purpose="maskable"), dict(src="./icon.svg", sizes="any", type="image/svg+xml", purpose="any")],
    shortcuts=[dict(name=t, short_name=t, url="./%s/" % k, icons=[dict(src="./icons/icon-192.png", sizes="192x192", type="image/png")]) for k, t, ic in present[:4]])
open(os.path.join(OUT, "manifest.webmanifest"), "w", encoding="utf-8", newline="\n").write(json.dumps(manifest, indent=1) + "\n")
NF = ('<!doctype html>\n<html lang="en" data-look="auto"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
      '<meta name="robots" content="noindex"><meta name="color-scheme" content="light dark"><title>@@BN@@</title><link rel="icon" href="/icon.svg" type="image/svg+xml">'
      '<style>@@CSS@@</style></head><body><div class="lost"><h1 class="vh">@@BN@@</h1><a href="/" aria-label="@@BN@@ home">@@HOME@@<b>@@BN@@</b></a></div>'
      '<script>(function(){var m=@@MAP@@,h=Object.prototype.hasOwnProperty,s=location.pathname.split("/").filter(Boolean),k=s.slice(0,2).join("/"),t=h.call(m,k)?m[k]:h.call(m,s[0])?m[s[0]]:"";if(t){var u=t.split("?");location.replace("/"+u[0]+"/"+(u[1]?"?"+u[1]+(location.search?"&"+location.search.slice(1):""):location.search)+location.hash)}'
      'try{var s=JSON.parse(localStorage.getItem("hub.prefs.v1")||"null");if(s&&s.look)document.documentElement.setAttribute("data-look",s.look)}catch(e){}})();</script></body></html>\n')
FWD = {a["folder"]: a["dir"] for a in apps if a["dir"]}  # the first flat address, from before pages were grouped
for a in apps:
    for al in a.get("aliases", []):
        if a["dir"]:
            tgt = a["dir"] + ("?pack=" + a["alias_packs"][al] if al in a.get("alias_packs", {}) else "")  # a merged page opens on the old page's pack
            FWD[al] = tgt; FWD.setdefault(al.split("/")[-1], tgt)
NF = NF.replace("@@BN@@", html.escape(BN)).replace("@@CSS@@", CSS).replace("@@HOME@@", svg(P("house"))).replace("@@MAP@@", json.dumps(FWD, separators=(",", ":")))
open(os.path.join(OUT, "404.html"), "w", encoding="utf-8", newline="\n").write(NF)
print("hub bytes", len(page.encode()), "tiles", len(apps), "shipped", len(ship), "archive", len(arch_items))

# ---- keep the framework note current: regenerate its two generated blocks, copy a path-free version to the site docs
import datetime
NOTE = os.path.join(DOCS, "FRAMEWORK.md")


def set_block(text, name, body):
    a = "<!-- %s:BEGIN -->" % name; b = "<!-- %s:END -->" % name
    i = text.index(a) + len(a); j = re.compile(r"^" + re.escape(b), re.M).search(text, i).start()  # the END marker only counts at the start of a line
    return text[:i] + "\n" + body + "\n" + text[j:]


if os.path.isfile(NOTE):
    note = open(NOTE, encoding="utf-8", newline="").read().replace("\r\n", "\n")
    rows = ["| Page | Kind | Form | Topic | Version | Status | Licence | Address |", "| --- | --- | --- | --- | --- | --- | --- | --- |"]
    for a in sorted(apps, key=lambda x: (x["kind"], x["title"].lower())):
        gen = a.get("path") is None and a.get("form", "single") == "single"
        form = "generated" if gen else a.get("form", "single")
        status = "private" if a["sensitive"] else ("archived" if a["archived"] else ("remote" if form == "remote" else "live"))
        addr = a["url"] if form == "remote" else "/%s/" % a["dir"]
        rows.append("| %s | %s | %s | %s | %s | %s | %s | %s |" % (a["title"], a["kind"], form, a["topic"], a["version"], status, a.get("license", "MIT"), addr))
    inv = "\n".join(rows)
    sig = hashlib.sha256((inv + VERSION).encode()).hexdigest()[:8]
    prior = re.search(r"fingerprint `(\w+)`, last changed (\d{4}-\d{2}-\d{2})", note)
    day = prior.group(2) if prior and prior.group(1) == sig else datetime.date.today().isoformat()  # the date moves only when the inventory does
    forms = [("generated" if (a.get("path") is None and a.get("form", "single") == "single") else a.get("form", "single")) for a in apps]
    rec = ("Hub %s. %d pages in %d groups: %d single, %d bundle, %d remote, %d generated; %d archived, %d private. Inventory fingerprint `%s`, last changed %s."
           % (VERSION, len(apps), len({a["kind"] for a in apps}), forms.count("single"), forms.count("bundle"), forms.count("remote"), forms.count("generated"),
              sum(1 for a in apps if a["archived"]), sum(1 for a in apps if a["sensitive"]), sig, day))
    new = set_block(set_block(note, "INV", inv), "BUILD", rec)
    if new != note:
        open(NOTE, "w", encoding="utf-8", newline="\n").write(new)
        _RESTORE = (NOTE, note)
    body = new[new.index("# Omnevum"):]
    os.makedirs(os.path.join(OUT, "docs"), exist_ok=True)
    open(os.path.join(OUT, "docs", "FRAMEWORK.md"), "w", encoding="utf-8", newline="\n").write(body)
    if os.path.isfile(os.path.join(DOCS, "PRIVACY.md")):  # the privacy rules travel with the site
        shutil.copyfile(os.path.join(DOCS, "PRIVACY.md"), os.path.join(OUT, "docs", "PRIVACY.md"))
else:
    print("note: framework note not found, docs not refreshed")

# ---- icon support files: the few icons the page generator needs, and the icon licence (MIT requires it to travel with the icons)
os.makedirs(os.path.join(OUT, "docs"), exist_ok=True)
open(os.path.join(OUT, "docs", "ICONS-LICENSE.txt"), "w", encoding="utf-8", newline="\n").write(
    "Icons: Phosphor Icons, https://github.com/phosphor-icons/core (MIT)\n\n" + open(os.path.join(PACK, "LICENSE"), encoding="utf-8").read().replace("\r\n", "\n"))

# ---- the kit that hand-built apps copy their tokens and chrome from: always the current shared stylesheet
shutil.copyfile(os.path.join(OUT, "scripts", "ui.css"), os.path.join(OM, "kit.css"))

# ---- free and open source report: the default choice is always an open licence; anything else is named, never hidden
_non = [(a["id"], a.get("license", "MIT")) for a in apps if a.get("license", "MIT") not in FOSS]
print("FOSS: %d of %d pages use an open licence%s" % (len(apps) - len(_non), len(apps), ("; NOT open: " + ", ".join("%s (%s)" % x for x in _non)) if _non else ""))

# ---- output gate and quality gates (the sources were gated before anything was written)
gate(OUT, "output")
import subprocess
for _chk in ("check_docs.py", "check_contrast.py", "check_pages.py", "check_pwa.py", "check_kit.py", "check_site.py"):
    _r = subprocess.run([sys.executable, "-B", os.path.join(OUT, "scripts", _chk)], capture_output=True, text=True, cwd=OUT)
    _out = (_r.stdout + _r.stderr).strip()  # a gate may report through SystemExit, which writes to stderr
    print(_hide("%s -> %s" % (_chk, (_out.splitlines() or ["no output"])[-1])))
    if _r.returncode: fail([_chk + " failed: " + _out[-1500:].replace("\n", " | ")])
_DONE = True  # every gate passed: keep the rewritten FRAMEWORK.md
