"""Page quality gate. Standard library only. Run from the repo root: python scripts/check_pages.py

Every published page must be a sound, small, self-contained document:
  - doctype, lang, title, viewport; no duplicate ids; images have alt text
  - the hub, group pages, 404 and generated pages also carry a Content-Security-Policy and name every button and link
  - no page loads anything from another website (scripts, styles, images, fonts, frames, forms)
  - internal links on the hub, group pages and 404 point at files that exist
  - size budgets, so the site stays fast on a slow phone
Errors fail the check. Warnings are printed and do not.
"""
import json, os, re, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KINDS = ("apps", "tools", "games", "guides", "recipes", "courses", "references")
BUDGET = {"hub": 300_000, "group": 60_000, "generated": 120_000, "app": 3_000_000}  # bytes; pages the worker marks large are the only exception


def _big_pages():
    """Pages the worker marks as large (over 5 MB) are the only ones allowed past the normal size budget. Read from sw.js, never hard-coded."""
    try:
        sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
        start = sw.index("const PAGES = ") + len("const PAGES = ")
        return {k for k, v in json.loads(sw[start:sw.index(";" + chr(10) + "const KEEP", start)]).items() if v.get("big")}
    except Exception:
        return set()


BIG_OK = _big_pages()
errors, warnings = [], []


class Scan(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.doctype = False; self.lang = None; self.title = ""; self.viewport = False; self.csp = False
        self.ids = []; self.imgs_no_alt = 0; self.external = []; self.links = []; self.unnamed = []
        self._in_title = False; self._stack = []

    def handle_decl(self, decl):
        if decl.lower().startswith("doctype html"):
            self.doctype = True

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self._in_title = True
        if tag == "meta":
            if a.get("name") == "viewport": self.viewport = True
            if (a.get("http-equiv") or "").lower() == "content-security-policy": self.csp = True
        if "id" in a: self.ids.append(a["id"])
        if tag == "img" and a.get("alt") is None: self.imgs_no_alt += 1
        res = {"script": "src", "img": "src", "iframe": "src", "source": "src", "audio": "src", "video": "src", "embed": "src", "form": "action"}
        if tag in res and re.match(r"(https?:)?//", a.get(res[tag]) or ""): self.external.append((tag, a[res[tag]]))
        if tag == "link" and re.match(r"(https?:)?//", a.get("href") or "") and (a.get("rel") or "") not in ("canonical", "alternate"): self.external.append(("link", a["href"]))
        if tag == "a" and a.get("href") is not None: self.links.append(a["href"])
        if tag in ("a", "button"):
            self._stack.append([tag, bool(a.get("aria-label") or a.get("title")), False, a.get("href") or a.get("id") or ""])
        elif tag == "svg" and self._stack:
            self._stack[-1][2] = self._stack[-1][2]  # icons alone do not name a control

    def handle_data(self, data):
        if self._in_title: self.title += data
        if self._stack and data.strip(): self._stack[-1][2] = True

    def handle_endtag(self, tag):
        if tag == "title": self._in_title = False
        if tag in ("a", "button") and self._stack:
            t, named, has_text, ident = self._stack.pop()
            if not (named or has_text): self.unnamed.append("%s %s" % (t, ident))


def csp_gaps(text):
    """Inline scripts and styles that the page's own Content-Security-Policy would block (a hash is listed but not for this block)."""
    import base64, hashlib
    m = re.search(r'http-equiv="Content-Security-Policy"\s+content="([^"]*)"', text)
    if not m:
        return []
    csp = m.group(1); gaps = []
    h = lambda x: "sha256-" + base64.b64encode(hashlib.sha256(x.replace(chr(13) + chr(10), chr(10)).replace(chr(13), chr(10)).encode("utf-8")).digest()).decode()  # browsers normalise line endings before hashing
    for directive, tag in (("script-src", "script"), ("style-src", "style")):
        d = re.search(directive + r"\s+([^;]*)", csp)
        if not d or "'unsafe-inline'" in d.group(1) or "'sha256-" not in d.group(1):
            continue
        for b in re.finditer(r"<%s\b([^>]*)>(.*?)</%s>" % (tag, tag), text, re.S | re.I):
            attrs, body = b.group(1), b.group(2)
            if tag == "script" and ("src=" in attrs or re.search(r'type="(?!module)[^"]*"', attrs)):
                continue  # external, or a data block that never runs
            if not body.strip():
                continue
            if "'" + h(body) + "'" not in d.group(1):
                gaps.append("%s of %d bytes is not covered by %s" % (tag, len(body), directive))
    return gaps


def classify(rel):
    p = rel.replace("\\", "/")
    if p == "index.html": return "hub", True
    if p == "404.html": return "group", True
    parts = p.split("/")
    if len(parts) == 2 and parts[0] in KINDS: return "group", True
    if len(parts) == 3 and parts[0] in KINDS:
        gen = os.path.exists(os.path.join(ROOT, "content", parts[0], parts[1] + ".json"))
        return ("generated" if gen else "app"), gen
    return None, False


def main():
    count = 0
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in (".git", "docs", "scripts", "content", "templates", ".github", "__pycache__")]
        for f in fn:
            if f != "index.html" and f != "404.html":
                continue
            full = os.path.join(dp, f); rel = os.path.relpath(full, ROOT)
            kind, strict = classify(rel)
            if not kind:
                continue
            count += 1
            raw = open(full, "rb").read()
            text = raw.decode("utf-8", "replace")
            s = Scan(); s.feed(re.sub(r"<script[^>]*>.*?</script>|<style[^>]*>.*?</style>", lambda m: m.group(0)[: m.group(0).index(">") + 1] + "</" + ("script" if m.group(0).startswith("<script") else "style") + ">", text, flags=re.S))
            where = rel.replace("\\", "/")
            if not s.doctype: errors.append(where + ": missing <!doctype html>")
            if not s.lang: errors.append(where + ": missing lang")
            if not s.title.strip(): errors.append(where + ": missing title")
            if not s.viewport: errors.append(where + ": missing viewport")
            for g in csp_gaps(text): errors.append(where + ": " + g)
            dup = sorted({i for i in s.ids if s.ids.count(i) > 1})
            if dup: errors.append(where + ": duplicate ids " + ", ".join(dup[:5]))
            if s.imgs_no_alt: errors.append("%s: %d image(s) without alt" % (where, s.imgs_no_alt))
            if s.external: errors.append(where + ": loads from another site: " + ", ".join(u for _, u in s.external[:3]))
            if re.search(r"@import\s+url\(\s*['\"]?https?:|url\(\s*['\"]?https?://[^)]*\.(?:woff2?|ttf|otf|css)", text): errors.append(where + ": stylesheet or font from another site")
            if strict:
                if where != "404.html" and not s.csp: errors.append(where + ": missing Content-Security-Policy")
                if s.unnamed: errors.append(where + ": unnamed controls: " + ", ".join(s.unnamed[:4]))
            elif not s.csp:
                warnings.append(where + ": no Content-Security-Policy")
            if kind in ("hub", "group") or where in ("404.html",):
                base = os.path.dirname(full)
                for h in s.links:
                    if re.match(r"(https?:|mailto:|#|javascript:)", h):
                        continue
                    target = os.path.normpath(os.path.join(ROOT if h.startswith("/") else base, h.lstrip("/").split("#")[0].split("?")[0]))
                    if os.path.isdir(target): target = os.path.join(target, "index.html")
                    if not os.path.isfile(target): errors.append("%s: broken link %s" % (where, h))
            if len(raw) > BUDGET[kind] and not any(where.startswith(b) for b in BIG_OK):
                errors.append("%s: %d KB is over the %d KB budget" % (where, len(raw) // 1000, BUDGET[kind] // 1000))
            elif kind == "app" and len(raw) > 1_500_000:
                warnings.append("%s: %d KB (large)" % (where, len(raw) // 1000))
    for w in warnings:
        print("WARN " + w)
    if errors:
        print("\n".join("FAIL " + e for e in errors))
        return 1
    print("page quality: OK (%d pages, %d warning%s)" % (count, len(warnings), "" if len(warnings) == 1 else "s"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
