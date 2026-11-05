"""Contrast gate for the design system. Standard library only. Run from anywhere: python site/scripts/check_contrast.py

Reads scripts/ui.css and checks, in every look (paper, charcoal, black, auto-dark), against WCAG 2.2:
  text pairs >= 4.5:1, icon and focus colours >= 3:1, for every icon hue (0-359 in steps of 5).
"""
import colorsys, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css = open(os.path.join(ROOT, "scripts", "ui.css"), encoding="utf-8").read()
css = re.sub(r"\s*([{}\[\]=,])\s*", r"\1", re.sub(r"/\*.*?\*/", "", css, flags=re.S)).lower()  # one canonical form, so spacing or case cannot hide a rule


def block(selector_start):
    """Return the declarations of every rule with exactly this selector, later rules winning, as in CSS."""
    ms = list(re.finditer(re.escape(selector_start) + r"\{([^}]*)\}", css))
    if not ms:
        raise SystemExit("ui.css: rule not found: " + selector_start)
    out = {}
    for m in ms:
        out.update(re.findall(r"(--[\w-]+):\s*([^;]+)(?:;|$)", m.group(1)))
    return out


_unknown = set(re.findall(r"data-look=[\"']?(\w+)", css)) - {"charcoal", "black", "auto"}
if _unknown:
    raise SystemExit("ui.css: a look the contrast gate does not check: " + ", ".join(sorted(_unknown)))
_READ = {":root[data-look=charcoal]", ":root[data-look=black]", ":root[data-look=charcoal],:root[data-look=black]", ":root[data-look=auto]"}
def _rules(text):
    """Yield (enclosing at-rule or '', selector, declarations) for every plain rule, by brace depth."""
    stack, start = [], 0
    for i, ch in enumerate(text):
        if ch == "{":
            if stack and not stack[-1].startswith("@"):
                raise SystemExit("ui.css: a rule nested inside " + stack[-1] + " (nested CSS is not read by the gate)")
            stack.append(text[start:i].strip().split("}")[-1].strip()); start = i + 1
        elif ch == "}":
            if stack:
                head = stack.pop()
                if not head.startswith("@"):
                    yield (stack[-1] if stack else ""), head, text[start:i]
            start = i + 1


for _at, _sel, _body in _rules(css):
    _toks = re.findall(r"(?:^|;)\s*(--[\w-]+)\s*:([^;]*)", _body)
    if not _toks:
        continue
    if any("!important" in v for _, v in _toks):
        raise SystemExit("ui.css: !important on a token in " + _sel + " (the gate cannot model it)")
    if _sel not in _READ | {":root", ":root[data-app]"}:
        raise SystemExit("ui.css: tokens set in a rule the contrast gate does not read: " + _sel)
    if _sel == ":root[data-app]" and {t for t, _ in _toks} - {"--acc", "--on-acc"}:
        raise SystemExit("ui.css: :root[data-app] may set only --acc and --on-acc")
    if re.sub(r"\s+", "", _at) != ("@media(prefers-color-scheme:dark)" if _sel == ":root[data-look=auto]" else ""):
        raise SystemExit("ui.css: token rule %s sits in %s, where the gate does not expect it" % (_sel, _at or "no at-rule"))


paper = block(":root")
charcoal = {**paper, **block(":root[data-look=charcoal]")}
dark_ic = block(":root[data-look=charcoal],:root[data-look=black]")
charcoal.update(dark_ic)
black = {**charcoal, **block(":root[data-look=black]")}
auto_dark = {**charcoal, **block(":root[data-look=auto]")}  # inside the prefers-color-scheme block
LOOKS = {"paper": paper, "charcoal": charcoal, "black": black, "auto-dark": auto_dark}


def rgb(v):
    v = v.strip()
    m = re.fullmatch(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})", v)
    if m:
        h = m.group(1); h = "".join(c * 2 for c in h) if len(h) == 3 else h
        return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    raise ValueError("unsupported colour " + v)


def lum(c):
    f = lambda x: x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    r, g, b = (f(x) for x in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def hsl(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l / 100, s / 100)
    return (r, g, b)


def pct(v):
    return float(v.strip().rstrip("%"))


fails, checked = [], 0
for name, t in LOOKS.items():
    pairs = [("text on page", "--fg", "--bg", 4.5), ("text on card", "--fg", "--card", 4.5), ("muted on page", "--mut", "--bg", 4.5),
             ("muted on card", "--mut", "--card", 4.5), ("label on accent", "--on-acc", "--acc", 4.5), ("accent on page (focus, icons)", "--acc", "--bg", 3.0),
             ("accent on card (focus, icons)", "--acc", "--card", 3.0)]
    for label, a, b, need in pairs:
        got = ratio(rgb(t[a]), rgb(t[b])); checked += 1
        if got < need:
            fails.append("%s: %s is %.2f:1 (needs %.1f)" % (name, label, got, need))
    for h in range(0, 360, 5):  # a page's own accent colour, every hue: as text or focus ring on the page and card, and as a button with its label
        acc = hsl(h, pct(t["--app-s"]), pct(t["--app-l"])); on = rgb(t["--app-on"])
        for label, a, b, need in (("accent on page", acc, rgb(t["--bg"]), 4.5), ("accent on card", acc, rgb(t["--card"]), 3.0), ("label on accent button", on, acc, 4.5)):
            got = ratio(a, b); checked += 1
            if got < need:
                fails.append("%s: %s at hue %d is %.2f:1 (needs %.1f)" % (name, label, h, got, need))
        fg = hsl(h, pct(t["--ic-fg-s"]), pct(t["--ic-fg-l"]))
        for tag, bgl in (("icon on tile", t["--ic-bg-l"]), ("icon on heading badge", t["--sic-bg-l"])):
            got = ratio(fg, hsl(h, pct(t["--ic-bg-s"]), pct(bgl))); checked += 1
            if got < 3.0:
                fails.append("%s: %s at hue %d is %.2f:1 (needs 3.0)" % (name, tag, h, got))
if fails:
    print("\n".join("FAIL " + f for f in fails[:25]))
    print("contrast gate: %d problem(s) in %d checks" % (len(fails), checked))
    sys.exit(1)
print("contrast gate: OK (%d checks in %d looks)" % (checked, len(LOOKS)))
