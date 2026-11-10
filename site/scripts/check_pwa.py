"""PWA gate. Standard library only. Run from anywhere: python site/scripts/check_pwa.py

Omnevum must install and work offline on a phone. This checks the contract without a browser:
  manifest: name, id, relative start_url and scope, standalone, 192 and 512 PNG icons that exist at those sizes, a maskable icon, shortcuts that resolve
  hub: manifest link, theme-color, viewport, apple-touch-icon and the iOS app tags
  worker: the shell files exist, the page table matches the catalog (except pages that bring their own PWA), and pages that
  download by themselves (bundles counted in full) total under 15 MB
Run scripts/test_browser.py for the real thing (installs, goes offline, opens every page).
"""
import json, os, re, struct, sys


def _rel(x):
    """A site-relative address without a leading ./ and without a trailing slash (a dot in a folder name stays)."""
    return re.sub(r"^(?:\./)+", "", x).rstrip("/")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors = []


def fail(m):
    errors.append(m)


def png_size(path):
    b = open(path, "rb").read(24)
    if b[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", b[16:24])


try:
    mf = json.load(open(os.path.join(ROOT, "manifest.webmanifest"), encoding="utf-8"))
except (OSError, ValueError) as e:
    print("FAIL manifest cannot be read: %s" % e.__class__.__name__); sys.exit(1)
if not isinstance(mf, dict):
    print("FAIL manifest must be one JSON object"); sys.exit(1)
for k in ("id", "name", "short_name", "start_url", "scope", "display", "background_color", "theme_color", "icons", "lang"):
    if not mf.get(k):
        fail("manifest is missing " + k)
if mf.get("display") != "standalone":
    fail("manifest display must be standalone")
if not (isinstance(mf.get("start_url"), str) and isinstance(mf.get("scope"), str) and mf["start_url"].startswith("./") and mf["scope"].startswith("./")):
    fail("start_url and scope must be relative so the site works from any address")
for _k in ("start_url", "scope"):
    if not isinstance(mf.get(_k), str):
        fail("manifest %s must be text" % _k)
if ".." in str(mf.get("start_url", "")).split("/") or ".." in str(mf.get("scope", "")).split("/"):
    fail("start_url and scope must stay inside the site (no ..)")
elif isinstance(mf.get("start_url"), str) and isinstance(mf.get("scope"), str) and not mf["start_url"].startswith(mf["scope"]):
    fail("start_url must be inside scope")
_REMOTE = re.compile(r"^(?:(?:https?|wss?|ftp):)?[/\\]{2}[^/\\]|^javascript:.", re.I)


def _remote(x):
    """True when a text value would name a remote address once a browser has dropped tabs, line breaks and spaces and read a backslash as a slash."""
    return bool(_REMOTE.match(re.sub(r"[\x00-\x20]+", "", x)))


def _walk(v):
    if isinstance(v, str):
        yield v
    elif isinstance(v, dict):
        for x in v.values():
            yield from _walk(x)
    elif isinstance(v, list):
        for x in v:
            yield from _walk(x)


for _v in _walk(mf):  # the browser reads the manifest outside the page policy: no field may name a remote address (screenshots, share_target, scope_extensions, related_applications, ...)
    if _remote(_v):
        fail("manifest names a remote or script address: " + _v[:60])
sizes, purposes = set(), set()
if not isinstance(mf.get("icons"), list) or not all(isinstance(i, dict) and all(isinstance(i.get(k), str) for k in ("src", "type", "sizes")) for i in mf["icons"]):
    fail("manifest icons must each have text src, type and sizes"); mf["icons"] = []
for i in mf.get("icons", []):
    if ".." in i["src"].split("/") or i["src"].startswith(("/", "http")):
        fail("icon src must stay inside the site: " + i["src"]); continue
    path = os.path.join(ROOT, (i["src"][2:] if i["src"].startswith("./") else i["src"]).replace("/", os.sep))
    if not os.path.isfile(path):
        fail("icon file missing: " + i["src"]); continue
    if i["type"] == "image/png":
        got = png_size(path)
        if got is None or "%dx%d" % got not in i["sizes"].split():
            fail("icon %s is %s, manifest says %s" % (i["src"], got, i["sizes"]))
    sizes.update(i["sizes"].split()); purposes.update(str(i.get("purpose", "any")).split())
if not {"192x192", "512x512"} <= sizes:
    fail("manifest needs 192x192 and 512x512 PNG icons")
if "maskable" not in purposes:
    fail("manifest needs a maskable icon")
if not isinstance(mf.get("shortcuts", []), list):
    fail("manifest shortcuts must be a list"); mf["shortcuts"] = []
for sc in mf.get("shortcuts", []):
    if not isinstance(sc, dict) or not isinstance(sc.get("url"), str):
        fail("each shortcut needs a text url"); continue
    if ".." in sc["url"].split("/") or sc["url"].startswith(("/", "http")):
        fail("shortcut url must stay inside the site: " + sc["url"]); continue
    if not os.path.isdir(os.path.join(ROOT, _rel(sc["url"]))):
        fail("shortcut points nowhere: " + sc["url"])

hub = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
for label, pat in (("manifest link", r'<link rel="manifest"'), ("theme-color", r'<meta name="theme-color"'), ("viewport with viewport-fit", r"viewport-fit=cover"),
                   ("apple-touch-icon", r'<link rel="apple-touch-icon"'), ("iOS web app tag", r'name="apple-mobile-web-app-capable"'), ("mobile-web-app-capable", r'name="mobile-web-app-capable"')):
    if not re.search(pat, hub):
        fail("hub is missing " + label)
if "serviceWorker" not in hub or './sw.js' not in hub:
    fail("hub does not register the worker")

sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
try:
    start = sw.index("const SHELL = ") + len("const SHELL = "); shell = json.loads(sw[start:sw.index(";\nconst PAGES", start)])
    start = sw.index("const PAGES = ") + len("const PAGES = "); pages = json.loads(sw[start:sw.index(";\nconst KEEP", start)])
except ValueError:
    print("FAIL sw.js does not hold the SHELL and PAGES lists in the expected form"); sys.exit(1)
# The worker runs outside the page policy, so its own code may not reach a remote host or pull in a script.
_TOK = re.compile(r"""//[^\n]*|/\*.*?\*/|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`""", re.S)
_code, _strs = [], []
for _t in _TOK.finditer(sw):  # comments are skipped, string literals are judged on their own
    if _t.group()[0] in "'\"`":
        _strs.append(_t.group()[1:-1])
sw_code = _TOK.sub(lambda m: m.group() if m.group()[0] in "'\"`" else " ", sw)
if re.search(r"importScripts|XMLHttpRequest", sw_code) or any(_remote(x) for x in _strs):
    fail("sw.js names a remote address or loads a script (importScripts, XMLHttpRequest, or a string starting with http/https// )")
for f in shell:
    if not isinstance(f, str) or f.startswith(("/", chr(92))) or ".." in f.split("/"):
        fail("worker shell entry must be a path inside the site: %s" % f); continue
    p = os.path.join(ROOT, _rel(f).replace("/", os.sep)) if f != "./" else ROOT
    if not os.path.exists(p):
        fail("worker shell lists a file that does not exist: " + f)
_cm = re.search(r'id="catalogData">(.*?)</script>', hub, re.S)
if not _cm:
    print("FAIL the hub has no catalog (id=catalogData)"); sys.exit(1)
catalog = json.loads(_cm.group(1).replace("<" + chr(92) + "/", "</"))
want = {_rel(a["address"]) for a in catalog["apps"] if a.get("form", "single") != "remote" and not a.get("sensitive") and not a.get("own_pwa")}
if want != set(pages):
    fail("worker page table differs from the catalog: %s" % sorted(want ^ set(pages))[:5])
def _bundle(f):
    """A bundle entry is a published path under the site root (a folder entry ends in a slash)."""
    if not isinstance(f, str) or f.startswith(("/", chr(92))) or not f.strip("/. ") or ".." in f.replace(chr(92), "/").split("/") or os.path.isabs(f) or ":" in f.split("/")[0]:
        return None
    p = os.path.join(ROOT, _rel(f).replace("/", os.sep))
    return p if os.path.exists(p) else None


for k, v in pages.items():
    if not isinstance(v, dict) or not isinstance(v.get("start"), str) or ".." in v["start"].replace(chr(92), "/").split("/"):
        fail("worker page entry has no start: " + str(k)); continue
    if not os.path.isfile(os.path.join(ROOT, _rel(v["start"]).replace("/", os.sep), "index.html")):
        fail("worker lists a page that is not published: " + k)
    if _rel(v["start"]).rstrip("/") != k:
        fail("worker start for %s points at %s" % (k, v["start"]))
    if not isinstance(v.get("cache"), str) or not v["cache"].startswith("app-" + k.split("/")[-1] + "-") or v["cache"] == "app-" + k.split("/")[-1] + "-":
        fail("worker cache name for %s does not carry the page slug" % k)
    fl = v.get("files") or []
    if not isinstance(fl, list):
        fail("worker files for %s is not a list" % k); continue
    for f in fl:
        if _bundle(f) is None:
            fail("worker lists a bundle file that is not published: " + str(f))
_cn = [v.get("cache") for v in pages.values() if isinstance(v, dict)]
if len(_cn) != len(set(_cn)):
    fail("two pages share a worker cache name")
size = {_rel(a["address"]): a.get("size") or 0 for a in catalog["apps"]}
auto = sum(max(size.get(k, 0), os.path.getsize(os.path.join(ROOT, _rel(v["start"]).replace("/", os.sep), "index.html")) if os.path.isfile(os.path.join(ROOT, _rel(v["start"]).replace("/", os.sep), "index.html")) else 0) for k, v in pages.items() if isinstance(v, dict) and isinstance(v.get("start"), str) and not v.get("big"))  # a bundle counts in full
auto += sum(os.path.getsize(_bundle(f)) for v in pages.values() if isinstance(v, dict) and not v.get("big") and isinstance(v.get("files"), list) for f in v["files"] if _bundle(f) and os.path.isfile(_bundle(f)))
if auto > 15_000_000:
    errors.append("pages that download by themselves total %d MB; keep it under 15 MB (mark the largest as big)" % (auto // 1_000_000))

if errors:
    print("\n".join("FAIL " + e for e in errors)); sys.exit(1)
print("pwa gate: OK (%d pages saved for offline, %d large wait for a tap, %d MB downloads by itself)" % (len(pages), sum(1 for v in pages.values() if v.get("big")), auto // 1_000_000))
