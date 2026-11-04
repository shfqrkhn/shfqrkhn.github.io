"""Rename or re-colour a page in one command, without breaking anything.
  python builder/rename.py "<page>" "<New Name>"
  python builder/rename.py <page> "<New Name>" --hue 210
  python builder/rename.py "<page>" "<New Name>" --old "Earlier Name" --old "EarlierName"   # also rewrite the name inside the page
Options: --slug <new-slug> (default: the new name in lowercase, words joined by dashes)   --hue <0-359> (the page's accent colour)
         --old <text> (repeatable: earlier spellings of the name to replace inside the page's source file)   --dry-run   --no-build
         --scripts (with --old: also replace the name inside scripts and styles, but only as a whole word that is not part of a longer
                    identifier, then recompute every Content-Security-Policy hash the change affected. Use it only for names that exist
                    purely as display text; storage keys and file-format ids stay untouched because they are different words)
         --tagline "<up to 40 characters>" (the plain descriptor shown under the name on the hub)
         --file-stem <Stem> (also rename the sources source file, PREFIX-Stem[-vX.Y.Z].html, and update every document that names it)

What it does, in order:
1. registry: new title and address; the old name goes to former_names, the old address to aliases (the 404 page forwards old links, and the
   page can still be found by its old name in archive.py);
2. with --old, the page's source file: the name is replaced in <title>, headings and other visible text, and in aria-label/title/alt/placeholder/
   description attributes. Scripts and styles are left alone unless --scripts is given (storage keys, database names and file formats must not
   change); occurrences found there are listed so a person can review them;
3. the build runs, which regenerates the hub, group pages, worker, forwarding and the framework note inventory.
Safe to repeat: renaming a page to the name it already has changes nothing."""
import glob, json, os, re, subprocess, sys
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import V
REG = os.path.join(OM, "registry.json")
ATTRS = ("aria-label", "title", "alt", "placeholder")
META_NAMES = {"description", "application-name", "apple-mobile-web-app-title", "og:title", "og:site_name", "twitter:title", "og:description"}
TOKEN = re.compile(r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>|<!--.*?-->|<[^>]+>)", re.S | re.I)


def fix_csp(before, after):
    """After editing inline scripts or styles, recompute the sha256 of each one that changed and update the page's policy."""
    import base64, hashlib
    rx = re.compile(r"<(script|style)\b[^>]*>(.*?)</\1>", re.S | re.I)
    a, b = [m.group(2) for m in rx.finditer(before)], [m.group(2) for m in rx.finditer(after)]
    if len(a) != len(b):
        return after
    h = lambda x: "sha256-" + base64.b64encode(hashlib.sha256(x.replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")).digest()).decode()
    for old, new in zip(a, b):
        if old != new and ("'" + h(old) + "'") in after:
            after = after.replace("'" + h(old) + "'", "'" + h(new) + "'")
    return after


def _version_key(path):
    """Numeric order of -vX.Y.Z file names (the same rule as build.resolve); a name with no version sorts first."""
    m = re.search(r"-v(\d+)\.(\d+)\.(\d+)\.html$", path)
    return tuple(int(x) for x in m.groups()) if m else (0, 0, 0)


def _attr(attrs, name):
    """The value of the first real attribute called name ("" when it has no value, None when absent), as HTML reads it."""
    for am in re.finditer(r"""([^\s=/]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?""", attrs):  # real attributes only, never text inside another value
        if am.group(1).lower() == name:
            return (am.group(2) or "").strip("\"'")
    return None


def _data_block(attrs):
    """A script whose type is not JavaScript never runs (data, templates). Types match case-blind and ignore parameters; an empty type runs."""
    t = _attr(attrs, "type")
    if not t:
        return False
    return t.split(";")[0].strip().lower() not in ("", "module", "text/javascript", "application/javascript", "text/ecmascript", "application/ecmascript", "application/x-javascript", "text/jscript", "text/x-javascript", "text/livescript", "text/x-ecmascript", "application/x-ecmascript")


def repair_csp(html):
    """For each of script-src and style-src that lists sha256 hashes: executable inline blocks that are not covered replace the listed hashes
    that match nothing, in order. Returns (html, number_repaired). Does nothing when the counts cannot be paired."""
    import base64, hashlib
    h = lambda x: "sha256-" + base64.b64encode(hashlib.sha256(x.replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")).digest()).decode()
    m = None
    for tag_m in re.finditer(r"<meta\b[^>]*>", html, re.I):  # any attribute order, either quote
        if re.search(r"http-equiv\s*=\s*[\"']?Content-Security-Policy", tag_m.group(0), re.I):
            c = re.search(r"content\s*=\s*([\"'])(.*?)\1", tag_m.group(0), re.S)
            if c:
                m = type("M", (), {"start": lambda self, g: tag_m.start() + c.start(2), "end": lambda self, g: tag_m.start() + c.end(2), "group": lambda self, g: c.group(2)})()
            break
    if not m:
        return html, 0
    csp, fixed = m.group(2), 0
    for directive, tag in (("script-src", "script"), ("style-src", "style")):
        d = re.search(directive + r"\s+([^;]*)", csp)
        if not d or "'sha256-" not in d.group(1):  # with a hash listed, browsers ignore unsafe-inline, so the hashes must be right
            continue
        listed = re.findall(r"'(sha256-[^']+)'", d.group(1))
        bodies = []
        for b in re.finditer(r"<%s\b([^>]*)>(.*?)</%s>" % (tag, tag), html, re.S | re.I):
            if tag == "script" and (_attr(b.group(1), "src") is not None or _data_block(b.group(1))):
                continue
            if b.group(2).strip():
                bodies.append(h(b.group(2)))
        stale = [x for x in listed if x not in bodies]; missing = [x for x in bodies if x not in listed]
        if stale and len(stale) == len(missing):
            new_dir = d.group(1)
            for st, mi in zip(stale, missing):
                new_dir = new_dir.replace("'" + st + "'", "'" + mi + "'"); fixed += 1
            csp = csp.replace(d.group(1), new_dir)
    return html[:m.start(2)] + csp + html[m.end(2):], fixed


def rename_html(html, olds, new, scripts=False):
    """Replace the name in visible text and safe attributes (and, with scripts=True, as a whole word inside scripts and styles).
    Returns (html, changed, left_in_scripts)."""
    olds = sorted({o for o in olds if o and o != new}, key=len, reverse=True)
    if not olds:
        return html, 0, 0
    pat = re.compile("|".join(re.escape(o) for o in olds))
    word = re.compile(r"(?<![A-Za-z0-9_$])(?:" + "|".join(re.escape(o) for o in olds) + r")(?![A-Za-z0-9_$])")
    out, changed, left = [], 0, 0
    for tok in TOKEN.split(html):
        low = tok[:8].lower()
        if low.startswith("<script") or (scripts and low.startswith("<style")):
            if scripts:
                nv, n = word.subn(lambda _m: new, tok); changed += n; left += len(pat.findall(nv)); out.append(nv)
            else:
                left += len(pat.findall(tok)); out.append(tok)
        elif low.startswith("<style") or tok.startswith("<!--"):
            out.append(tok)
        elif tok.startswith("<") and not tok.startswith("<!"):
            is_meta = low.startswith("<meta")
            names = set(re.findall(r'(?:name|property)="([^"]+)"', tok)) if is_meta else set()
            def attr(m):
                nonlocal changed
                an, q, val = m.group(1), m.group(2), m.group(3)
                if an in ATTRS or (an == "content" and names & META_NAMES):
                    nv, n = pat.subn(lambda _m: new, val); changed += n
                    return "%s=%s%s%s" % (an, q, nv, q)
                return m.group(0)
            out.append(re.sub(r'([\w:-]+)=(["\'])(.*?)\2', attr, tok, flags=re.S))
        else:
            nv, n = pat.subn(lambda _m: new, tok); changed += n; out.append(nv)
    return "".join(out), changed, left


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def main():
    args = sys.argv[1:]
    if args and args[0] == "--repair-csp":  # python builder/rename.py --repair-csp <file> ...: recompute the script and style hashes of a page after editing its inline code
        for f in args[1:]:
            fixed_html, n = repair_csp(open(f, encoding="utf-8", newline="").read())
            open(f, "w", encoding="utf-8", newline="").write(fixed_html); print("%s: %d hash(es) repaired" % (f, n))
        return 0
    flags = {"--dry-run", "--no-build", "--scripts"}
    opts, pos, olds, i = {}, [], [], 0
    while i < len(args):
        a = args[i]
        if a in flags:
            opts[a] = True
        elif a == "--old":
            olds.append(args[i + 1]); i += 1
        elif a in ("--slug", "--hue", "--tagline", "--file-stem"):
            opts[a] = args[i + 1]; i += 1
        else:
            pos.append(a)
        i += 1
    if len(pos) < 1 or (len(pos) < 2 and "--hue" not in opts and "--tagline" not in opts and "--file-stem" not in opts):
        print('Usage: rename.py <page> "<New Name>" [--slug s] [--hue 0-359] [--old "Earlier name"]... [--dry-run] [--no-build]'); return 2
    reg = json.load(open(REG, encoding="utf-8")); word = pos[0].strip().lower()
    hits = [p for p in reg["pages"] if word in (p["id"].lower(), p["slug"].lower(), p["title"].lower()) or word in [f.lower() for f in p.get("former_names", [])]]
    if len(hits) != 1:
        print('"%s": %s' % (pos[0], "no page matches" if not hits else "matches several; use the id")); return 1
    p = hits[0]; new = pos[1].strip() if len(pos) > 1 else p["title"]
    if not (1 <= len(new) <= 40) or re.search("[\u2013\u2014]", new):
        print("The name must be 1 to 40 characters, with no em or en dash."); return 1
    slug = opts.get("--slug") or (slugify(new) if len(pos) > 1 else p["slug"])
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
        print("The address must be lowercase letters, digits and dashes."); return 1
    if any(x is not p and x["slug"] == slug for x in reg["pages"]):  # a slug is unique across all kinds (the build requires it)
        print("That address is already used by another page: %s" % slug); return 1
    if any(x is not p and "%s/%s" % (p["kind"], slug) in x.get("aliases", []) for x in reg["pages"]):
        print("That address is an old address of another page: %s/%s" % (p["kind"], slug)); return 1
    hue = None
    if "--hue" in opts:
        hue = int(opts["--hue"])
        if not 0 <= hue <= 359:
            print("The hue must be 0 to 359."); return 1
    old_title, old_slug = p["title"], p["slug"]; report = []
    if new != old_title:
        p.setdefault("former_names", [])
        if old_title not in p["former_names"]: p["former_names"].append(old_title)
        p["title"] = new; report.append("name: %s -> %s" % (old_title, new))
    if slug != old_slug:
        p.setdefault("aliases", [])
        old_addr = "%s/%s" % (p["kind"], old_slug)
        if old_addr not in p["aliases"]: p["aliases"].append(old_addr)
        p["aliases"] = [a for a in p["aliases"] if a != "%s/%s" % (p["kind"], slug)]  # renaming back to an earlier address makes it live again
        p["slug"] = slug; report.append("address: /%s/%s/ -> /%s/%s/ (old address forwards)" % (p["kind"], old_slug, p["kind"], slug))
    if "--tagline" in opts:
        tl = opts["--tagline"].strip()
        if not (1 <= len(tl) <= 40) or re.search("[\u2013\u2014]", tl):
            print("The tagline must be 1 to 40 characters, with no em or en dash."); return 1
        if p.get("tagline") != tl:
            p["tagline"] = tl; report.append("tagline: %s" % tl)
    if hue is not None and p.get("hue") != hue:
        p["hue"] = hue; report.append("accent hue: %d" % hue)
    pending = []  # source edits are written only after every check has passed

    def flush():
        for f, t in pending:
            open(f, "w", encoding="utf-8", newline="").write(t)
        pending.clear()
    if olds and p.get("form", "single") == "single" and not os.path.isabs(p["source"]):
        files = glob.glob(os.path.join(glob.escape(V), p["source"].replace("/", os.sep)))
        if files:
            f = max(files, key=_version_key); html = open(f, encoding="utf-8", newline="").read()
            new_html, changed, left = rename_html(html, olds + [old_title], new, "--scripts" in opts)
            if "--scripts" in opts:
                new_html = fix_csp(html, new_html)
            report.append("source %s: %d replacement(s) in visible text and attributes; %d occurrence(s) left in scripts for review" % (os.path.basename(f), changed, left))
            if changed and "--dry-run" not in opts:
                pending.append((f, new_html))
    if "--file-stem" in opts and p.get("form", "single") == "single" and not os.path.isabs(p["source"]):
        m = re.fullmatch(r"(?P<dir>.*/)?(?P<pre>(?:[A-Z]+-)+)(?P<stem>[A-Za-z0-9]+)(?P<ver>-v(?:\*|[\d.]+))?\.html", p["source"])
        stem = opts["--file-stem"].strip()
        if not m or not re.fullmatch(r"[A-Za-z0-9]{1,40}", stem):
            print("The source name does not follow PREFIX-Stem[-vX.Y.Z].html, or the stem is not letters and digits."); return 1
        if m.group("stem") != stem:
            new_src = (m.group("dir") or "") + m.group("pre") + stem + (m.group("ver") or "") + ".html"
            moved = []
            for f in glob.glob(os.path.join(glob.escape(V), p["source"].replace("/", os.sep))):
                nf = os.path.join(os.path.dirname(f), os.path.basename(f).replace(m.group("pre") + m.group("stem"), m.group("pre") + stem, 1))
                if os.path.exists(nf):
                    print("A file named %s already exists." % os.path.basename(nf)); return 1
                moved.append((f, nf))
            report.append("source file: %s -> %s (%d file%s)" % (p["source"], new_src, len(moved), "" if len(moved) == 1 else "s"))
            if "--dry-run" not in opts:
                flush()
                for f, nf in moved:
                    os.rename(f, nf)
                old_glob = m.group("pre") + m.group("stem") + (m.group("ver") or "")
                new_glob = m.group("pre") + stem + (m.group("ver") or "")
                p["source"] = new_src
                hits = 0
                for dp, dn, fn in os.walk(V):
                    dn[:] = [d for d in dn if d not in ("archive", ".git", "history")]
                    for fname in fn:
                        fp = os.path.join(dp, fname)
                        if not fname.endswith((".md", ".html")) or os.path.getsize(fp) > 3000000:
                            continue
                        t = open(fp, encoding="utf-8", errors="replace", newline="").read(); t2 = t
                        for f, nf in moved:
                            t2 = t2.replace(os.path.basename(f), os.path.basename(nf))
                        if old_glob.endswith("*"):
                            t2 = t2.replace(old_glob, new_glob)
                        if t2 != t:
                            open(fp, "w", encoding="utf-8", newline="").write(t2); hits += 1
                report.append("files updated with the new file name: %d" % hits)
    print("\n".join(report) if report else "Nothing to change: the page already has that name, address and colour.")
    if "--dry-run" in opts or not report:
        return 0
    flush()
    json.dump(reg, open(REG, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
    if "--no-build" not in opts:
        r = subprocess.run([sys.executable, "-B", os.path.join(OM, "build.py")], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-300:]); return r.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())
