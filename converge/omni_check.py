"""Executed identity and reference checks for the Omni document (Omni 8.7 step 1). Standard library only.
  python omni_check.py <Omni file>
Prints the byte hash and a list of script-provable defects: unresolved section references, heading and contents mismatches,
a version string newer than the front matter version, a file name that disagrees with the front matter, compact tiers over their limit under CRLF,
em or en dashes, control characters, carriage returns, duplicate headings; exit 1 when any defect is found."""
import hashlib, os, re, sys

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
if len(sys.argv) < 2:
    print("usage: python omni_check.py <Omni file> | --control"); sys.exit(2)
p = sys.argv[1]
try:
    b = open(p, "rb").read()
except OSError as e:
    print("error: cannot read %s: %s" % (os.path.basename(p), e.strerror)); sys.exit(2)
try:
    s = b.decode("utf-8")
except UnicodeDecodeError:
    print("error: %s is not UTF-8 text" % os.path.basename(p)); sys.exit(2)
print("sha256", hashlib.sha256(b).hexdigest()[:16], "bytes", len(b))
defects = []
fm_version = re.search(r"(?m)^version: (\S+)", s)
file_version = re.search(r"-v(\d+\.\d+\.\d+)\.md$", p)
if fm_version and file_version and fm_version.group(1) != file_version.group(1):
    defects.append("file name version %s differs from the front matter version %s" % (file_version.group(1), fm_version.group(1)))
heads = set()
fence = False
titles = []
for line in s.split("\n"):
    if line.startswith("```"):
        fence = not fence
    if fence:
        continue
    t = re.match(r"## (\d+\. .+|Appendix [A-Z]\. .+)$", line)
    if t:
        titles.append(t.group(1))
    m = re.match(r"#{2,4} (?:(\d+(?:\.\d+)*)\.? |(Appendix [A-Z]|[A-Z]\.\d+) )", line)
    if m:
        k = m.group(1) or m.group(2)
        if k in heads:
            defects.append("duplicate heading number " + k)
        heads.add(k)
bare = {h for h in heads}
refs = set(re.findall(r"§ ?(\d+(?:\.\d+)*)", s))
for r in sorted(refs, key=lambda x: [int(i) for i in x.split(".")]):
    if r not in bare:
        defects.append("section reference with no heading: §" + r)
major = (re.search(r"(?m)^version: (\d+)\.", s) or [None, "7"])[1]
ver = set(re.findall(r"(?<![\d.])" + major + r"\.\d+\.\d+(?!\d|\.\d)", s))
c0 = s.find("\n## Contents")
if c0 >= 0:
    block = s[c0:].split("\n---", 1)[0].split("\n")[2:]
    listed = [x.strip() for x in block if x.strip()]
    want = [t.split(". ", 1)[1] if re.match(r"\d+\. ", t) else t for t in titles]
    got = [x.split(". ", 1)[1] if re.match(r"\d+\. ", x) else x for x in listed]
    if got != want:
        defects.append("contents list does not match the headings: " + str([x for x in want if x not in got][:3] + [x for x in got if x not in want][:3]))
# the file's own version (frontmatter) must appear, and no string may name a LATER version; earlier versions are permanent predecessor records
fv = (re.search(r"(?m)^version: (\d+\.\d+\.\d+)", s) or [None, None])[1]
vkey = lambda v: [int(i) for i in v.split(".")]
if fv is None or fv not in ver or any(vkey(v) > vkey(fv) for v in ver):
    defects.append("version strings disagree with the frontmatter version " + str(fv) + ": " + ", ".join(sorted(ver, key=vkey)))
for n, line in enumerate(s.split("\n"), 1):
    if re.search("[–—]", line):
        defects.append("em or en dash at line %d" % n)
    if re.search("[\x00-\x08\x0b\x0c\x0e-\x1f]", line):
        defects.append("control character at line %d" % n)
if "\r" in s:
    defects.append("carriage returns present")
L = s.split("\n")
for n, line in enumerate(L):
    tm = re.match(r"### 19\.\d+ Tier (\d[\d,]*)$", line)
    if tm:
        limit = int(tm.group(1).replace(",", ""))
        f0 = next((i for i in range(n + 1, len(L)) if L[i].startswith("```")), None)
        f1 = next((i for i in range(f0 + 1, len(L)) if L[i].startswith("```")), None) if f0 is not None else None
        if f1 is not None:
            body = L[f0 + 1:f1]
            if len("\n".join(body)) + len(body) - 1 > limit:
                defects.append("tier %s is over its limit under CRLF" % tm.group(1))
for d in defects[:60]:
    print("DEFECT", d)
print("headings", len(heads), "distinct section references", len(refs), "defects", len(defects))
sys.exit(1 if defects else 0)
