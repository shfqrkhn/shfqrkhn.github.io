"""Design-language gate. Standard library only. Run from anywhere: python site/scripts/check_kit.py

Every hand-built page must stay on the shared Omnevum core design language while keeping its own accent colour:
  - its <style> starts with the kit block (/* OMNEVUM KIT:BEGIN */ ... /* OMNEVUM KIT:END */)
  - the kit block carries the current colour tokens of every look (so a token change in scripts/ui.css shows up here as a failure
    until the page is brought up to date)
  - <html> has data-app, and --hue (on the tag, or in the stylesheet for pages whose policy forbids inline styles) equals the page's hue in the catalog
  - the page reads and writes the shared look choice (hub.prefs.v1)
  - it has the shared round home button (id back-to-hub)
Generated pages use scripts/ui.css directly and are exempt. Failures name the page and what is stale.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css = open(os.path.join(ROOT, "scripts", "ui.css"), encoding="utf-8").read()
_cm = (re.search(r'id="catalogData">(.*?)</script>', open(os.path.join(ROOT, "index.html"), encoding="utf-8").read(), re.S))
if not _cm:
    print("FAIL the hub has no catalog (id=catalogData)"); sys.exit(1)
catalog = json.loads(_cm.group(1).replace("<" + chr(92) + "/", "</"))
TOKENS = ("--bg", "--fg", "--mut", "--card", "--line")
errors = []


def look_tokens():
    """The colour tokens of each look, read from ui.css: {'paper': {...}, 'charcoal': {...}, 'black': {...}}."""
    def block(sel):
        m = re.search(re.escape(sel) + r"\s*\{([^}]*)\}", css)
        return dict(re.findall(r"(--[\w-]+):\s*([^;]+)(?:;|$)", m.group(1))) if m else {}
    return {"paper": block(":root"), "charcoal": block(":root[data-look=charcoal]"), "black": block(":root[data-look=black]"), "auto": block(":root[data-look=auto]")}


LOOKS = look_tokens()
for _k, _v in LOOKS.items():
    if not all(t in _v for t in TOKENS):
        errors.append("ui.css: the %s look has no complete colour tokens (the gate cannot check the pages)" % _k)
AUTO_WRAP = re.compile(r"@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{\s*:root\[data-look=auto\]\s*\{")
if not AUTO_WRAP.search(css):
    errors.append("ui.css: the auto look must sit inside @media (prefers-color-scheme: dark)")
for a in catalog["apps"]:
    if a.get("form", "single") != "single" or a.get("sensitive"):
        continue
    rel = a["address"].strip("./")
    if rel.count("/") >= 1 and os.path.exists(os.path.join(ROOT, "content", rel.split("/")[0], rel.split("/")[1] + ".json")):
        continue  # generated from data with scripts/ui.css
    path = os.path.join(ROOT, rel, "index.html")
    if not os.path.isfile(path):
        continue
    html = open(path, encoding="utf-8", errors="replace").read()
    b0 = re.search(r"/\*\s*OMNEVUM KIT:BEGIN\s*\*/", html)
    e0 = re.compile(r"/\*\s*OMNEVUM KIT:END\s*\*/").search(html, b0.end()) if b0 else None  # the first end after the first begin; one search, never one per begin
    m = type("M", (), {"group": lambda self, n: html[b0.end():e0.start()]})() if e0 else None
    if not m:
        errors.append("%s: no kit block (the page is not on the core design language)" % rel); continue
    block = re.sub(r"\s+", "", m.group(1))
    if not AUTO_WRAP.search(m.group(1)):
        errors.append("%s: kit block: the auto look must sit inside @media (prefers-color-scheme: dark)" % rel)
    sels = {"paper": ":root", "charcoal": ":root[data-look=charcoal]", "black": ":root[data-look=black]", "auto": ":root[data-look=auto]"}
    for look, toks in LOOKS.items():
        rule = re.search(re.escape(sels[look]) + r"\{([^}]*)\}", block)  # the look's own rule, so a value repeated elsewhere cannot stand in
        have = dict(re.findall(r"(--[\w-]+):([^;]+)(?:;|$)", rule.group(1))) if rule else {}
        for t in TOKENS:
            if t in toks and have.get(t) != re.sub(r"\s+", "", toks[t]):
                errors.append("%s: kit block is out of date: %s in the %s look should be %s" % (rel, t, look, toks[t].strip())); break
    h = re.search(r"<html\b[^>]*>", html)
    tag = h.group(0) if h else ""
    if not re.search(r"\sdata-app[\s=>]", tag):
        errors.append("%s: <html> has no data-app" % rel)
    mh = re.search(r"--hue:\s*(\d+)(?![\d.])", tag) or re.search(r":root[^{]*\{[^}]*--hue:\s*(\d+)(?![\d.])", html)  # on the tag, or in the stylesheet when the page forbids inline styles
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
