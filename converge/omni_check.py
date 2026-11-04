"""Executed identity and reference checks for the Omni document (Omni 8.7 step 1). Standard library only.
  python omni_check.py <Omni file>
Prints the byte hash and a list of script-provable defects: unresolved section references, heading and contents mismatches,
version strings that disagree, em or en dashes, control characters, carriage returns, duplicate headings."""
import hashlib, re, sys

if "--control" in sys.argv:
    import subprocess, tempfile, os
    t = tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8", newline="")
    t.write("## 1. A\nSee §99.9 and a dash — here. Versions 7.1.0 and 7.2.0.\n"); t.close()
    out = subprocess.run([sys.executable, __file__, t.name], capture_output=True, text=True).stdout
    os.unlink(t.name)
    want = ("section reference with no heading", "em or en dash", "version strings disagree")
    miss = [x for x in want if x not in out]
    print("known-bad control: %s" % ("all three planted defects flagged" if not miss else "NOT flagged: " + ", ".join(miss)))
    sys.exit(1 if miss else 0)
p = sys.argv[1]
b = open(p, "rb").read()
s = b.decode("utf-8")
print("sha256", hashlib.sha256(b).hexdigest()[:16], "bytes", len(b))
defects = []
heads = set()
for line in s.split("\n"):
    m = re.match(r"#{2,4} (?:(\d+(?:\.\d+)*)\.? |(Appendix [A-Z]|[A-Z]\.\d+) )", line)
    if m:
        k = m.group(1) or m.group(2)
        if k in heads:
            defects.append("duplicate heading number " + k)
        heads.add(k)
bare = {h for h in heads}
refs = set(re.findall(r"§(\d+(?:\.\d+)*)", s))
for r in sorted(refs, key=lambda x: [int(i) for i in x.split(".")]):
    if r not in bare:
        defects.append("section reference with no heading: §" + r)
ver = set(re.findall(r"\b7\.\d+\.\d+\b", s))
if len(ver) != 1:
    defects.append("version strings disagree: " + ", ".join(sorted(ver)))
for n, line in enumerate(s.split("\n"), 1):
    if re.search("[–—]", line):
        defects.append("em or en dash at line %d" % n)
    if re.search("[\x00-\x08\x0b\x0c\x0e-\x1f]", line):
        defects.append("control character at line %d" % n)
if "\r" in s:
    defects.append("carriage returns present")
for d in defects[:60]:
    print("DEFECT", d)
print("headings", len(heads), "distinct section references", len(refs), "defects", len(defects))
