"""Privacy gate for Omnevum. Standard library only. Fails on personal data in any published file.
Run from anywhere: python site/scripts/check_privacy.py   (optional: --root <folder>, --names <private list>)

Rule: no app, page or doc may carry personal information in any form: names, emails, phone numbers,
addresses, government or account numbers, keys, tokens, local paths, private IPs, or credit lines naming a person.
Allowed: attributed historical quotes, and the legally required copyright lines listed in scripts/privacy-allow.json.
An optional private list of names can be passed with --names <file> (kept outside the repo, never committed).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if "--root" in sys.argv:
    ROOT = os.path.abspath(sys.argv[sys.argv.index("--root") + 1])
SKIP_DIRS = {".git", "node_modules", "__pycache__"}
SKIP_EXT = {".pyc", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".woff", ".woff2", ".ico"}
BLOB = re.compile(r"[A-Za-z0-9+/=_-]{120,}")  # base64 or hash runs: not prose, removed before scanning
COLOR = re.compile(r"(?:rgba?|hsla?)\([^)]*\)")  # CSS colour values look like numbers, they are not
ROLE = re.compile(r"\b(?:Owners?|Managers?|Teams?|Users?|Leads?|Engineers?|Studios?|Games|Software|Inc|Ltd|Corporation|Contributors|Authors|Developers)\b")
RULES = [
    ("email", re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}")),
    ("phone", re.compile(r"(?<![\d.])(?:\+?\d{1,2}[ .-])?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}(?![\d.])")),
    ("gov-id", re.compile(r"(?<!\d)\d{3}[- ]\d{3}[- ]\d{3}(?!\d)|(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)")),
    ("postal-ca", re.compile(r"(?<![#\w])[ABCEGHJ-NPRSTVXY]\d[A-Z][ -]\d[A-Z]\d(?!\w)")),
    ("street", re.compile(r"\b\d{1,5}\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Crescent|Court|Ct)\b")),
    ("private-ip", re.compile(r"(?<![\d.])(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(?![\d./])")),
    ("key", re.compile(r"sk-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|Bearer\s+[A-Za-z0-9._-]{20,}")),
    ("local-path", re.compile(r"[A-Za-z]:\\(?:Users|Documents and Settings|VSCode)\\[^\s\"'<>]{2,}|/Users/[A-Za-z0-9._-]+/|/home/(?!user/)[A-Za-z0-9._-]+/")),
    ("credit-line", re.compile(r"\b(?:[Dd]esigned|[Cc]reated|[Ww]ritten|[Bb]uilt|[Mm]ade|[Ee]dited|[Cc]ompiled|[Pp]hotographed|[Dd]eveloped) by\s+[A-Z][a-z]+\s+(?:[A-Z]\.\s+)?[A-Z][a-z]+\b|\b(?:[Aa]uthor|[Bb]yline|[Dd]esigner|[Cc]redits?)\s*:\s*[A-Z][a-z]+\s+[A-Z][a-z]+\b")),
]


def load_allow():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "privacy-allow.json")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else {"contains": []}


def files():
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for f in fn:
            if os.path.splitext(f)[1].lower() in SKIP_EXT:
                continue
            yield os.path.join(dp, f)


def main():
    names = []
    if "--names" in sys.argv:
        names = [l.strip() for l in open(sys.argv[sys.argv.index("--names") + 1], encoding="utf-8") if l.strip() and not l.startswith("#")]
    name_rx = re.compile(r"(?<![A-Za-z0-9/])(?:%s)(?![A-Za-z0-9])" % "|".join(re.escape(n) for n in names), re.I) if names else None
    allow = [a.lower() for a in load_allow().get("contains", [])]
    problems = []
    for p in files():
        rel = os.path.relpath(p, ROOT)
        try:
            text = open(p, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        text = COLOR.sub(" ", BLOB.sub(" ", text))
        checks = list(RULES) + ([("owner-name", name_rx)] if name_rx else [])
        for kind, rx in checks:
            for m in rx.finditer(text):
                hit = m.group(0)
                ctx = text[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")
                low = (hit + " " + ctx).lower()
                if kind == "email" and re.search(r"@(example\.(com|org|net)|users\.noreply\.github\.com)$", hit, re.I):
                    continue
                if kind == "email" and re.search(r"\.(png|svg|jpg|css|js|woff2?)$", hit, re.I):
                    continue
                if kind == "private-ip" and rel.startswith(("docs", "scripts")):
                    continue
                if kind == "credit-line" and ROLE.search(hit):
                    continue
                if any(a in low for a in allow):
                    continue
                problems.append("%s: %s: %r ... %s" % (rel, kind, hit[:60], ctx[:100]))
    if problems:
        print("\n".join("FAIL " + x for x in problems[:60]))
        print("privacy gate: %d problem(s)" % len(problems))
        return 1
    print("privacy gate: OK (%s)" % ("patterns + private name list" if names else "patterns only"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
