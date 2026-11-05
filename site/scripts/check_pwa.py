"""PWA gate. Standard library only. Run from anywhere: python site/scripts/check_pwa.py

Omnevum must install and work offline on a phone. This checks the contract without a browser:
  manifest: name, id, start_url inside scope, standalone, 192 and 512 PNG icons that exist at those sizes, a maskable icon, shortcuts that resolve
  hub: manifest link, theme-color, viewport, apple-touch-icon and the iOS app tags
  worker: the shell files exist, and every hosted page (except pages that bring their own PWA) is in the worker's page table
Run scripts/test_browser.py for the real thing (installs, goes offline, opens every page).
"""
import json, os, re, struct, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors = []


def fail(m):
    errors.append(m)


def png_size(path):
    b = open(path, "rb").read(24)
    if b[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", b[16:24])


mf = json.load(open(os.path.join(ROOT, "manifest.webmanifest"), encoding="utf-8"))
for k in ("id", "name", "short_name", "start_url", "scope", "display", "background_color", "theme_color", "icons", "lang"):
    if not mf.get(k):
        fail("manifest is missing " + k)
if mf.get("display") != "standalone":
    fail("manifest display must be standalone")
if not mf.get("start_url", "").startswith("./") or not mf.get("scope", "").startswith("./"):
    fail("start_url and scope must be relative so the site works from any address")
sizes, purposes = set(), set()
for i in mf.get("icons", []):
    path = os.path.join(ROOT, i["src"].lstrip("./").replace("/", os.sep))
    if not os.path.isfile(path):
        fail("icon file missing: " + i["src"]); continue
    if i["type"] == "image/png":
        got = png_size(path)
        if got is None or "%dx%d" % got != i["sizes"]:
            fail("icon %s is %s, manifest says %s" % (i["src"], got, i["sizes"]))
    sizes.add(i["sizes"]); purposes.add(i.get("purpose", "any"))
if not {"192x192", "512x512"} <= sizes:
    fail("manifest needs 192x192 and 512x512 PNG icons")
if "maskable" not in purposes:
    fail("manifest needs a maskable icon")
for sc in mf.get("shortcuts", []):
    if not os.path.isdir(os.path.join(ROOT, sc["url"].lstrip("./"))):
        fail("shortcut points nowhere: " + sc["url"])

hub = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
for label, pat in (("manifest link", r'<link rel="manifest"'), ("theme-color", r'<meta name="theme-color"'), ("viewport with viewport-fit", r"viewport-fit=cover"),
                   ("apple-touch-icon", r'<link rel="apple-touch-icon"'), ("iOS web app tag", r'name="apple-mobile-web-app-capable"'), ("mobile-web-app-capable", r'name="mobile-web-app-capable"')):
    if not re.search(pat, hub):
        fail("hub is missing " + label)
if "serviceWorker" not in hub or './sw.js' not in hub:
    fail("hub does not register the worker")

sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
start = sw.index("const SHELL = ") + len("const SHELL = "); shell = json.loads(sw[start:sw.index(";\nconst PAGES", start)])
for f in shell:
    p = os.path.join(ROOT, f.lstrip("./").replace("/", os.sep)) if f != "./" else ROOT
    if not os.path.exists(p):
        fail("worker shell lists a file that does not exist: " + f)
start = sw.index("const PAGES = ") + len("const PAGES = "); pages = json.loads(sw[start:sw.index(";\nconst KEEP", start)])
catalog = json.loads(re.search(r'id="catalogData">(.*?)</script>', hub, re.S).group(1).replace("<" + chr(92) + "/", "</"))
want = {a["address"].strip("./") for a in catalog["apps"] if a.get("form", "single") != "remote" and not a.get("sensitive") and not a.get("own_pwa")}
if want != set(pages):
    fail("worker page table differs from the catalog: %s" % sorted(want ^ set(pages))[:5])
for k, v in pages.items():
    if not os.path.isfile(os.path.join(ROOT, v["start"].strip("./").replace("/", os.sep), "index.html")):
        fail("worker lists a page that is not published: " + k)
size = {a["address"].strip("./"): a.get("size") or 0 for a in catalog["apps"]}
auto = sum(max(size.get(k, 0), os.path.getsize(os.path.join(ROOT, k.replace("/", os.sep), "index.html"))) for k, v in pages.items() if not v.get("big"))  # a bundle counts in full
if auto > 15_000_000:
    errors.append("pages that download by themselves total %d MB; keep it under 15 MB (mark the largest as big)" % (auto // 1_000_000))

if errors:
    print("\n".join("FAIL " + e for e in errors)); sys.exit(1)
print("pwa gate: OK (%d pages saved for offline, %d large wait for a tap, %d MB downloads by itself)" % (len(pages), sum(1 for v in pages.values() if v.get("big")), auto // 1_000_000))
