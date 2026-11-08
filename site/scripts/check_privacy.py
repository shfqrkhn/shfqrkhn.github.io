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
B64_RUN = re.compile(r"[A-Za-z0-9+/=]{200,}")  # a long run holding "+" or "/" is base64 file bytes: random letters, not prose
DATA_URI = re.compile(r"(?<=;base64,)[A-Za-z0-9+/=]+")  # embedded file bytes: random letters, not prose; removed before the name scan
BLOB = re.compile(r"[A-Za-z0-9+/=_-]{120,}")  # base64 or hash runs: not prose, removed before scanning
COLOR = re.compile(r"(?:rgba?|hsla?)\([^)]*\)")  # CSS colour values look like numbers, they are not
ROLE = re.compile(r"\b(?:Owners?|Managers?|Teams?|Users?|Leads?|Engineers?|Studios?|Games|Software|Inc|Ltd|Corporation|Contributors|Authors|Developers)\b")
RULES = [
    ("email", re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}")),
    ("phone", re.compile(r"(?<![\d.])(?:\+?\d{1,2}[ .-])?(?:\(\d{3}\)[ .-]?|\d{3}[ .-])\d{3}[ .-]\d{4}(?![\d.])")),
    ("phone-run", re.compile(r"(?:tel:\+?|(?<![\w+])\+)\d{10,14}(?![\d.])", re.I)),
    ("email-spelled", re.compile(r"(?<![A-Za-z0-9._%+-])[A-Za-z0-9._%+-]{1,64}\s*(?:\[at\]|\(at\)|\{at\})\s*[A-Za-z0-9-]{1,63}(?:\s*(?:\[dot\]|\(dot\)|\.)\s*[A-Za-z0-9-]{1,63}){1,4}", re.I)),
    ("gov-id", re.compile(r"(?<!\d)\d{3}[- ]\d{3}[- ]\d{3}(?!\d)|(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)")),
    ("postal-ca", re.compile(r"(?<![#\w])[ABCEGHJ-NPRSTVXY]\d[A-Z][ -]\d[A-Z]\d(?!\w)")),
    ("street", re.compile(r"\b\d{1,5}\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Crescent|Court|Ct)\b")),
    ("private-ip", re.compile(r"(?<![\d.])(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(?![\d./])")),
    ("key", re.compile(r"(?<![A-Za-z0-9])sk-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|(?<![A-Za-z0-9])gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|glpat-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|Bearer\s+[A-Za-z0-9._-]{20,}")),
    ("local-path", re.compile(r"(?i:[A-Za-z]:(?:\\{1,2}|/)(?:Users|Documents and Settings|VSCode)(?:\\{1,2}|/))[^\s\"'<>]{2,}|/Users/[A-Za-z0-9._-]+/|/home/(?!user/)[A-Za-z0-9._-]+/")),
    ("credit-line", re.compile(r"\b(?:[Dd]esigned|[Cc]reated|[Ww]ritten|[Bb]uilt|[Mm]ade|[Ee]dited|[Cc]ompiled|[Pp]hotographed|[Dd]eveloped) by\s+[A-Z][a-z]+\s+(?:[A-Z]\.\s+)?[A-Z][a-z]+\b|\b(?:[Aa]uthor|[Bb]yline|[Dd]esigner|[Cc]redits?)\s*:\s*[A-Z][a-z]+\s+[A-Z][a-z]+\b")),
]


def load_allow():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "privacy-allow.json")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else {"contains": []}


import html as _html, unicodedata
_ZW = re.compile("[\u200b-\u200f\u2060\ufeff\u00ad]")
_HOMO = str.maketrans({"\u0430": "a", "\u0435": "e", "\u043e": "o", "\u0440": "p", "\u0441": "c", "\u0445": "x", "\u0443": "y", "\u0456": "i", "\u0455": "s", "\u0458": "j", "\u03bf": "o", "\u03b1": "a"})


def norm(t):
    """What a person reads: entities decoded, compatibility forms folded, zero-width marks removed, look-alike letters mapped to Latin."""
    return _ZW.sub("", unicodedata.normalize("NFKC", _html.unescape(t).replace("%40", "@"))).translate(_HOMO)


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
        names = [l.strip() for l in open(sys.argv[sys.argv.index("--names") + 1], encoding="utf-8-sig") if l.strip() and not l.startswith("#")]
    _short = [n for n in names if len(n) < 5]; _long = [n for n in names if len(n) >= 5]
    _parts = ([r"(?<![A-Za-z0-9])(?:%s)(?![A-Za-z0-9])" % "|".join(re.escape(n) for n in _short)] if _short else []) + ([r"(?:%s)" % "|".join(re.escape(n) for n in _long)] if _long else [])  # a long name is caught inside ids and keys too
    # a short name (under 5 characters, such as an acronym) matches in its exact case only: in any case it hits minified identifiers and ordinary words
    name_rx = re.compile("|".join("(?i:%s)" % x if x is _parts[-1] and _long else x for x in _parts)) if _parts else None
    allow = [a.lower() for a in load_allow().get("contains", [])]
    problems = []
    if not os.path.isdir(ROOT):
        print("FAIL the folder to scan does not exist: " + ROOT); return 1
    scanned = 0
    for p in files():
        scanned += 1
        rel = os.path.relpath(p, ROOT)
        try:
            text = open(p, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        raw = norm(text)
        text = COLOR.sub(" ", BLOB.sub(" ", raw))
        named = bool(name_rx and name_rx.search(norm(rel).replace(os.sep, " ").replace("/", " ")))
        shown = "[path hidden in CI]" if named and os.environ.get("CI") else rel  # CI logs are public: never print a path that holds a private name
        if named:
            problems.append("%s: owner-name: the file name carries a private name" % shown)
        for kind, rx in RULES:
            if kind in ("email", "phone", "phone-run", "key", "local-path") and rx.search(norm(os.path.basename(rel))):
                problems.append("%s: %s: the file name carries personal data" % (shown, kind))
        checks = list(RULES) + ([("owner-name", name_rx)] if name_rx else [])
        for kind, rx in checks:
            if kind in ("key", "owner-name"):  # a key or a name can hide inside a long run of letters and dashes: scan the raw text
                text, body = (B64_RUN.sub(lambda m: "" if ("+" in m.group(0) or "/" in m.group(0)) else m.group(0), DATA_URI.sub("", raw)) if kind == "owner-name" else raw), text  # a key can be longer than the blob limit: scan the raw text for it
            for m in rx.finditer(text):
                hit = m.group(0)
                ctx = text[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")
                low = (hit + " " + ctx).lower()
                if kind == "email" and re.search(r"@example\.(com|org|net)$|^(\d+\+)?shfqrkhn@users\.noreply\.github\.com$", hit, re.I):
                    continue
                if kind == "email" and re.search(r"\.(png|svg|jpg|css|js|woff2?)$", hit, re.I):
                    continue
                if kind == "private-ip" and rel.split(os.sep)[0] in ("docs", "scripts"):
                    continue
                if kind == "credit-line" and ROLE.search(hit):
                    continue
                if any(a in low for a in allow):
                    continue
                if os.environ.get("CI"):  # CI logs are public: never print what was found or its context there
                    hit, ctx = "[hidden in CI]", "[context hidden in CI]"
                problems.append("%s: %s: %r ... %s" % (shown, kind, hit[:60], ctx[:100]))
            if kind in ("key", "owner-name"):
                text = body
    if scanned == 0:
        print("FAIL no file was scanned in " + ROOT + ": a moved or renamed folder must not shrink the gate")
        return 1
    if problems:
        print("\n".join("FAIL " + x for x in problems[:60]))
        print("privacy gate: %d problem(s)" % len(problems))
        return 1
    print("privacy gate: OK (%s)" % ("patterns + private name list" if names else "patterns only"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
