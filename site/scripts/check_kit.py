"""Design-language gate. Standard library only. Run from the repo root: python scripts/check_kit.py

Every hand-built page must stay on the shared Omnevum core design language while keeping its own accent colour:
  - its <style> starts with the kit block (/* OMNEVUM KIT:BEGIN */ ... /* OMNEVUM KIT:END */)
  - the kit block carries the current colour tokens of every look (so a token change in scripts/ui.css shows up here as a failure
    until the page is brought up to date)
  - <html> has data-app, and --hue (on the tag, or in the stylesheet for pages whose policy forbids inline styles) equals the page's hue in the catalog
  - the page reads and writes the shared look choice (hub.prefs.v1)
  - it has the shared round home button (id back-to-hub, the only link home)
Generated pages use scripts/ui.css directly and are exempt. Failures name the page and what is stale.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css = open(os.path.join(ROOT, "scripts", "ui.css"), encoding="utf-8").read()
catalog = json.loads(re.search(r'id="catalogData">(.*?)</script>', open(os.path.join(ROOT, "index.html"), encoding="utf-8").read(), re.S).group(1).replace("<" + chr(92) + "/", "</"))
TOKENS = ("--bg", "--fg", "--mut", "--card", "--line")
errors = []


def look_tokens():
    """The colour tokens of each look, read from ui.css: {'paper': {...}, 'charcoal': {...}, 'black': {...}}."""
    def block(sel):
        m = re.search(re.escape(sel) + r"\{([^}]*)\}", css)
        return dict(re.findall(r"(--[\w-]+):\s*([^;]+)(?:;|$)", m.group(1))) if m else {}
    return {"paper": block(":root"), "charcoal": block(":root[data-look=charcoal]"), "black": block(":root[data-look=black]")}


LOOKS = look_tokens()
for a in catalog["apps"]:
    if a.get("form", "single") != "single" or a.get("sensitive"):
        continue
    rel = a["address"].strip("./")
    if os.path.exists(os.path.join(ROOT, "content", rel.split("/")[0], rel.split("/")[1] + ".json")):
        continue  # generated from data with scripts/ui.css
    path = os.path.join(ROOT, rel, "index.html")
    if not os.path.isfile(path):
        continue
    html = open(path, encoding="utf-8", errors="replace").read()
    m = re.search(r"/\*\s*OMNEVUM KIT:BEGIN\s*\*/(.*?)/\*\s*OMNEVUM KIT:END\s*\*/", html, re.S)
    if not m:
        errors.append("%s: no kit block (the page is not on the core design language)" % rel); continue
    block = re.sub(r"\s+", "", m.group(1))
    for look, toks in LOOKS.items():
        for t in TOKENS:
            if t in toks and ("%s:%s" % (t, re.sub(r"\s+", "", toks[t]))) not in block:
                errors.append("%s: kit block is out of date: %s in the %s look should be %s" % (rel, t, look, toks[t].strip())); break
    h = re.search(r"<html\b[^>]*>", html)
    tag = h.group(0) if h else ""
    if "data-app" not in tag:
        errors.append("%s: <html> has no data-app" % rel)
    mh = re.search(r"--hue:\s*(\d+)", tag) or re.search(r":root[^{]*\{[^}]*--hue:\s*(\d+)", html)  # on the tag, or in the stylesheet when the page forbids inline styles
    if a.get("hue") is not None and (not mh or int(mh.group(1)) != a["hue"]):
        errors.append("%s: accent hue is %s on the page but %s in the registry" % (rel, mh.group(1) if mh else "missing", a["hue"]))
    if "hub.prefs.v1" not in html:
        errors.append("%s: does not read or write the shared look (hub.prefs.v1)" % rel)
    if 'id="back-to-hub"' not in html:
        errors.append("%s: no shared home button (id back-to-hub)" % rel)

if errors:
    print("\n".join("FAIL " + e for e in errors))
    print("design-language gate: %d problem(s)" % len(errors)); sys.exit(1)
print("design-language gate: OK (every hand-built page is on the kit with its own accent hue)")
