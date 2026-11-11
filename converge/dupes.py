"""Read-only report of exact inline script and style blocks (over 2 KB) that several page sources share (CR-24-3 step 1).

Usage (repository root): python converge/dupes.py
Prints one row per shared block: size, copies, and the pages by family (the registry kind). Writes nothing and installs nothing.
"""
import collections
import glob
import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIN = 2048
reg = json.load(open(os.path.join(ROOT, "builder", "registry.json"), encoding="utf-8"))
pages = reg["pages"] if isinstance(reg, dict) else reg
groups = collections.defaultdict(list)
for p in pages:
    src = p.get("source")
    if not src or "*" in src and not src.endswith(".html"):
        continue
    for f in glob.glob(os.path.join(ROOT, "sources", src.replace("/", os.sep))):
        raw = open(f, "rb").read()
        raw = re.sub(rb"<script>\n@@KD-ENGINE ([\w.+-]+)@@\n</script>",
                     lambda m: b"<script>\n" + open(os.path.join(ROOT, "sources", "engine", "ENGN-KD-" + m.group(1).decode() + ".js"), "rb").read() + b"\n</script>", raw)
        for kind, rx in (("script", rb"<script>\n?(.*?)</script>"), ("style", rb"<style>\n?(.*?)</style>")):
            for body in re.findall(rx, raw, re.S):
                if len(body) > MIN:
                    groups[(kind, hashlib.sha256(body).hexdigest()[:10], len(body))].append((p.get("kind", "?"), p.get("slug", p.get("id", "?"))))
rows = sorted(((k, sorted(set(v))) for k, v in groups.items() if len(set(v)) > 1), key=lambda r: -r[0][2] * len(r[1]))
print("%-7s %-10s %8s %6s  pages" % ("block", "hash", "bytes", "copies"))
for (kind, h, size), v in rows:
    fam = collections.Counter(k for k, _ in v)
    print("%-7s %-10s %8d %6d  %s" % (kind, h, size, len(v), ", ".join("%s:%d" % x for x in sorted(fam.items()))))
if not rows:
    print("no exact block over %d bytes is shared by two or more pages" % MIN)
sys.exit(0)
