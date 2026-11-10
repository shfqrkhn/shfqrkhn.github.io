"""Consistency check for the site. Standard library only. Run from anywhere: python site/scripts/check_site.py

Layout: /<kind>/<page>/index.html, one folder per page, grouped by kind (apps, tools, games, guides, recipes, courses, references).
The catalog inside index.html is the single list of pages; this check makes the files, the worker and the catalog agree.
"""
import hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_FILES = {"index.html", "404.html", "sw.js", "manifest.webmanifest", "icon.svg", "today.json", "robots.txt", "llms.txt", "LICENSE", "README.md", ".gitignore", ".gitattributes", ".nojekyll"}
ROOT_DIRS = {"docs", "scripts", "content", "templates", "icons", ".github"}
errors = []


def fail(msg):
    errors.append(msg)


page = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
m = re.search(r'id="catalogData">(.*?)</script>', page, re.S)
if not m:
    print("FAIL the hub has no catalog (id=catalogData)"); sys.exit(1)
catalog = json.loads(m.group(1).replace("<\\/", "</"))
sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
_start = sw.index("const PAGES = ") + len("const PAGES = ")
_end = sw.index(";\nconst KEEP", _start)
sw_keys = set(json.loads(sw[_start:_end]).keys())  # the worker's page table is plain JSON

expected = {}  # kind -> set of page folders
MAX_FILE = 25_000_000      # GitHub Pages serves up to 100 MB per file; 25 MB keeps phones happy
MAX_SITE = 900_000_000     # Pages sites are soft-limited to 1 GB


def tree_hash(d):
    """Same algorithm as the builder: sha256 over 'path NUL file-sha256' lines, sorted by path."""
    items = []
    for dp, dn, fn in os.walk(d):
        dn[:] = [x for x in dn if x not in (".git", "__pycache__", "node_modules")]
        for f in fn:
            full = os.path.join(dp, f); items.append((os.path.relpath(full, d).replace(os.sep, "/"), full))
    h = hashlib.sha256()
    for rel, full in sorted(items):
        h.update((rel + chr(0) + hashlib.sha256(open(full, "rb").read()).hexdigest() + chr(10)).encode())
    return h.hexdigest(), sum(os.path.getsize(f) for _, f in items)


for a in catalog["apps"]:
    form = a.get("form", "single")
    if form == "remote":
        if not a["address"].startswith("https://"):
            fail("remote page must use https: " + a["id"])
        continue
    rel = a["address"].strip("./")
    kind, _, folder = rel.partition("/")
    if a.get("sensitive"):
        if os.path.exists(os.path.join(ROOT, rel)):
            fail("private page is published: " + rel)
        continue
    expected.setdefault(kind, set()).add(folder)
    path = os.path.join(ROOT, rel, "index.html")
    if not os.path.isfile(path):
        fail("missing " + rel + "/index.html")
        continue
    data = open(path, "rb").read()
    if form == "bundle":
        h, size = tree_hash(os.path.join(ROOT, rel))
        if h != a["sha256"] or size != a["size"]:
            fail("bundle differs from catalog: " + rel)
    else:
        if hashlib.sha256(data).hexdigest() != a["sha256"]:
            fail("hash differs from catalog: " + rel)
        if len(data) != a["size"]:
            fail("size differs from catalog: " + rel)
        extra = set(os.listdir(os.path.join(ROOT, rel))) - {"index.html"}
        if extra:
            fail(rel + " has extra files: " + ", ".join(sorted(extra)))
    if not a.get("own_pwa") and rel not in sw_keys:
        fail("not in sw.js: " + rel)
    if b'href="../../"' not in data:
        fail("no home link two levels up: " + rel)

total = 0
for dp, dn, fn in os.walk(ROOT):
    for x in dn + fn:
        if x == ".git":
            fail("a .git entry inside the site would be published and is invisible to the other gates: " + os.path.relpath(os.path.join(dp, x), ROOT))
    dn[:] = [x for x in dn if x != ".git"]
    for f in fn:
        n = os.path.getsize(os.path.join(dp, f)); total += n
        if n > MAX_FILE:
            fail("file over %d MB: %s" % (MAX_FILE // 1_000_000, os.path.relpath(os.path.join(dp, f), ROOT)))
if total > MAX_SITE:
    fail("site is %d MB, over the %d MB budget" % (total // 1_000_000, MAX_SITE // 1_000_000))

for stale in sw_keys - {k + "/" + f for k, v in expected.items() for f in v}:
    fail("sw.js lists a page that does not exist: " + stale)

for name in sorted(os.listdir(ROOT)):
    full = os.path.join(ROOT, name)
    if os.path.isdir(full):
        if name in expected:
            allowed = expected[name] | {"index.html"}
            for sub in sorted(os.listdir(full)):
                if sub not in allowed:
                    fail("unlisted entry in " + name + "/: " + sub)
            if not os.path.isfile(os.path.join(full, "index.html")):
                fail("missing group page " + name + "/index.html")
        elif name not in ROOT_DIRS:
            fail("unlisted folder at root: " + name)
    elif name not in ROOT_FILES:
        fail("unexpected file at root: " + name)

WEB_OK = {os.path.join("scripts", "personalize.js")}  # the only page or script files allowed in the folders the page gate does not walk
for _d in ("docs", "scripts", "content", "templates", "icons", ".github"):
    for dp, dn, fn in os.walk(os.path.join(ROOT, _d)):
        for f in fn:
            rel = os.path.relpath(os.path.join(dp, f), ROOT)
            if os.path.splitext(f)[1].lower() in (".html", ".htm", ".xhtml", ".xht", ".shtml", ".xml", ".xsl", ".xslt", ".mht", ".mhtml", ".js", ".mjs", ".cjs", ".svg", ".svgz") and rel not in WEB_OK:
                fail("page or script file in a folder the page gate does not check: " + rel)
            if os.path.splitext(f)[1].lower() in (".zip", ".gz", ".tgz", ".bz2", ".xz", ".7z", ".rar", ".tar", ".docx", ".xlsx", ".pptx", ".pdf", ".db", ".sqlite", ".sqlite3", ".zst", ".lz4", ".cab", ".iso", ".dmg", ".jar", ".war", ".apk", ".epub", ".odt", ".ods", ".odp", ".rtf", ".mdb", ".parquet"):
                fail("compressed or document file the privacy gate cannot read: " + rel)
if subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "check_privacy.py")]).returncode:
    fail("privacy gate failed")

if errors:
    print("\n".join("FAIL " + e for e in errors))
    sys.exit(1)
pages = sum(len(v) for v in expected.values()); remote = sum(1 for a in catalog["apps"] if a.get("form") == "remote")
print("OK %d pages in %d groups (%d remote), %d private, catalog and worker agree" % (pages, len(expected), remote, sum(1 for a in catalog["apps"] if a.get("sensitive"))))
