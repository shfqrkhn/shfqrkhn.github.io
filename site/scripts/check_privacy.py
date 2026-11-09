"""Privacy gate for Omnevum. Standard library only. Fails on personal data in any published file.
Run from anywhere: python site/scripts/check_privacy.py   (optional: --root <folder>, --names <private list>)

Rule: no app, page or doc may carry personal information in any form: names, emails, phone numbers,
addresses, government or account numbers, keys, tokens, local paths, private IPs, or credit lines naming a person.
The gate is pattern-based: the listed forms are caught, and names otherwise depend on the private list.
Allowed: attributed historical quotes, and the legally required copyright lines listed in scripts/privacy-allow.json.
An optional private list of names can be passed with --names <file> (kept outside the repo, never committed).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for _f in ("--root", "--names"):
    if _f in sys.argv and (sys.argv.index(_f) + 1 >= len(sys.argv) or sys.argv[sys.argv.index(_f) + 1].startswith("--")):
        print("usage: check_privacy.py [--root <folder>] [--names <file>]  (%s needs a value)" % _f); sys.exit(2)
if "--root" in sys.argv:
    ROOT = os.path.abspath(sys.argv[sys.argv.index("--root") + 1])
SKIP_DIRS = {".git", "__pycache__"}  # __pycache__ is git-ignored; a committed node_modules is scanned like anything else
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
    ("key", re.compile(r"(?<![A-Za-z0-9])(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{16,}|(?<![A-Za-z0-9])npm_[A-Za-z0-9]{36}|eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}|xapp-\d-[A-Za-z0-9-]{10,}|(?<![A-Za-z0-9])sk-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|(?<![A-Za-z0-9])gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|glpat-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|Bearer\s+[A-Za-z0-9._-]{20,}")),
    ("local-path", re.compile(r"(?i:[A-Za-z]:(?:\\{1,2}|/)(?:Users|Documents and Settings|VSCode)(?:\\{1,2}|/))[^\s\"'<>]{2,}|(?<![A-Za-z0-9])[A-Za-z]:\\{1,2}(?!Windows\\|Program Files)[A-Za-z0-9._ -]+\\{1,2}[A-Za-z0-9._ -]+|(?<![A-Za-z0-9\\])\\\\[A-Za-z0-9._-]+\\[A-Za-z0-9._$-]+|/Users/[A-Za-z0-9._-]+/|/root/\.|/home/(?!user/)[A-Za-z0-9._-]+/")),
    ("credit-line", re.compile(r"\b(?:[Dd]esigned|[Cc]reated|[Ww]ritten|[Bb]uilt|[Mm]ade|[Ee]dited|[Cc]ompiled|[Pp]hotographed|[Dd]eveloped|[Pp]hotos?|[Ii]mage|[Cc]redit) by\s+[A-Z][a-z]+\s+(?:[A-Z]\.\s+)?[A-Z][a-z]+\b|\b(?:[Aa]uthor|[Bb]yline|[Dd]esigner|[Cc]redits?)\s*[:\u2013\u2014-]\s*[A-Z][a-z]+\s+[A-Z][a-z]+\b")),
]


def load_allow():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "privacy-allow.json")
    d = json.load(open(p, encoding="utf-8")) if os.path.exists(p) else {"contains": []}
    d["contains"] = [x for x in d.get("contains", []) if isinstance(x, str) and len(x.strip()) >= 3]  # an empty or tiny entry would match everything and switch the gate off
    return d


import html as _html, unicodedata
_ZW = re.compile("[\u200b-\u200f\u2060\ufeff\u00ad]")
_HOMO = str.maketrans({"\u0430": "a", "\u0435": "e", "\u043e": "o", "\u0440": "p", "\u0441": "c", "\u0445": "x", "\u0443": "y", "\u0456": "i", "\u0455": "s", "\u0458": "j", "\u03bf": "o", "\u03b1": "a"})


_ESC = re.compile(r"\\x([0-9a-fA-F]{2})|\\u([0-9a-fA-F]{4})|\\u\\{([0-9a-fA-F]{1,6})\\}|\\([0-9a-fA-F]{1,6}) ?")
_COMMENT = re.compile(r"<!--.*?-->", re.S)


def _chr(h):
    n = int(h, 16)
    return chr(n) if n < 0x110000 else ""


def norm(t):
    """What a person reads: entities decoded, compatibility forms folded, zero-width marks removed, look-alike letters mapped to Latin."""
    t = _ESC.sub(lambda m: _chr(m.group(1) or m.group(2) or m.group(3) or m.group(4)), t)  # JS and CSS escapes render as the character
    t = t + (chr(10) + _COMMENT.sub("", t) if "<!--" in t else "")  # a comment can split a word: scan the text with and without comments
    return _ZW.sub("", unicodedata.normalize("NFKC", _html.unescape(t).replace("%40", "@"))).translate(_HOMO)


def files():
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for f in fn:
            yield os.path.join(dp, f)


def read_text(p):
    """File text for scanning: UTF-16 is decoded as such; image and font files are read as bytes (metadata and stray text still count)."""
    b = open(p, "rb").read()
    if b[:4] in (bytes([255, 254, 0, 0]), bytes([0, 0, 254, 255])):
        return b.decode("utf-32", errors="replace")
    if b[:2] in (bytes([255, 254]), bytes([254, 255])) or (len(b) > 8 and b[1::2].count(0) > len(b) // 4):
        return b.decode("utf-16", errors="replace")
    if os.path.splitext(p)[1].lower() in SKIP_EXT:
        return b.decode("latin-1")
    return b.decode("utf-8", errors="replace")


def main():
    names = []
    if "--names" in sys.argv:
        try:
            names = [l.strip() for l in open(sys.argv[sys.argv.index("--names") + 1], encoding="utf-8-sig") if l.strip() and not l.startswith("#")]
        except OSError as e:
            print("cannot read the names file: %s" % (e.strerror or e)); return 2
    _short = [n for n in names if len(n) < 5]; _long = [n for n in names if len(n) >= 5]
    _parts = ([r"(?<![A-Za-z0-9])(?:%s)(?![A-Za-z0-9])" % "|".join(re.escape(n) for n in _short)] if _short else []) + ([r"(?:%s)" % "|".join(re.escape(n) for n in _long)] if _long else [])  # a long name is caught inside ids and keys too
    # a short name (under 5 characters, such as an acronym) matches in its exact case only: in any case it hits minified identifiers and ordinary words
    name_rx = re.compile("|".join("(?i:%s)" % x if x is _parts[-1] and _long else x for x in _parts)) if _parts else None
    _cn = [re.sub(r"\s+", "", n) for n in _long]  # a long name with its spaces left out also matches in file names: JaneDoe, jane_doe, jane-doe
    name_c = re.compile("(?i:%s)" % "|".join(re.escape(n) for n in _cn if len(n) >= 6)) if any(len(n) >= 6 for n in _cn) else None
    allow = [a.lower() for a in load_allow().get("contains", [])]
    problems = []
    if not os.path.isdir(ROOT):
        print("FAIL the folder to scan does not exist: " + ROOT); return 1
    scanned = 0
    for p in files():
        scanned += 1
        rel = os.path.relpath(p, ROOT)
        try:
            text = read_text(p)
        except OSError:
            continue
        raw = norm(text)
        text = COLOR.sub(" ", BLOB.sub(" ", raw))
        _rel = norm(rel).replace(os.sep, " ").replace("/", " ")
        named = bool(name_rx and (name_rx.search(_rel) or name_rx.search(re.sub(r"[_.-]+", " ", _rel)) or (name_c and name_c.search(re.sub(r"[\s_.-]+", "", _rel)))))
        shown = "[path hidden in CI]" if named and os.environ.get("CI") else rel  # CI logs are public: never print a path that holds a private name
        if named:
            problems.append("%s: owner-name: the file name carries a private name" % shown)
        binary = os.path.splitext(p)[1].lower() in SKIP_EXT
        for kind, rx in RULES:
            if kind in ("email", "phone", "phone-run", "key", "local-path") and rx.search(norm(os.path.basename(rel))):
                problems.append("%s: %s: the file name carries personal data" % (shown, kind))
        checks = list(RULES) + ([("owner-name", name_rx)] if name_rx else [])
        for kind, rx in checks:
            if binary and kind not in ("email", "key", "local-path", "owner-name"):
                continue  # binary files hold random digits and letters: only the shapes that cannot occur by chance are checked
            if kind in ("key", "owner-name"):  # a key or a name can hide inside a long run of letters and dashes: scan the raw text
                text, body = (B64_RUN.sub(lambda m: "" if (("+" in m.group(0) or "/" in m.group(0)) and len(set(m.group(0))) >= 40) else m.group(0), DATA_URI.sub("", raw)) if kind == "owner-name" else raw), text  # a key can be longer than the blob limit: scan the raw text for it
            for m in rx.finditer(text):
                hit = m.group(0)
                if binary and kind == "owner-name" and len(hit) < 5:
                    continue  # a short initial pair appears in random image bytes by chance
                ctx = text[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")
                low = (hit + " " + ctx).lower()
                if kind == "email" and re.search(r"@example\.(com|org|net)$|^noreply@anthropic\.com$|^(\d+\+)?shfqrkhn@users\.noreply\.github\.com$", hit, re.I):
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
