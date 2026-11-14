"""Raise an app's version: the file name and every exact copy of the old version string inside it, then repair its CSP pins.
  python builder/bump.py <source file> [patch|minor|major]   (default patch)
Use it when the app's behaviour or data changes. It prints each line it changed, so a version number that is data, not the
app's version, can be spotted and put back by hand."""
import os, re, subprocess, sys
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))

src = sys.argv[1]; part = sys.argv[2] if len(sys.argv) > 2 else "patch"
m = re.search(r"-v(\d+)\.(\d+)\.(\d+)\.html$", src)
if not m or part not in ("patch", "minor", "major"):
    print(__doc__); sys.exit(2)
a, b, c = map(int, m.groups())
new = {"patch": (a, b, c + 1), "minor": (a, b + 1, 0), "major": (a + 1, 0, 0)}[part]
old_s, new_s = "%d.%d.%d" % (a, b, c), "%d.%d.%d" % new
t = open(src, encoding="utf-8", newline="").read()
pat = re.compile(r"(?<![\d.])" + re.escape(old_s) + r"(?![\d.]*\d)")
for ln in t.splitlines():
    if pat.search(ln):
        print("  " + ln.strip()[:140])
t = pat.sub(new_s, t)
dest = src[:m.start()] + "-v" + new_s + ".html"
open(dest, "w", encoding="utf-8", newline="").write(t)
if dest != src:
    os.remove(src)
subprocess.run([sys.executable, os.path.join(OM, "rename.py"), "--repair-csp", dest], check=True)
print("%s -> %s" % (old_s, new_s)); print(dest)
