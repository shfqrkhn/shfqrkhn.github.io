"""Page quality gate. Standard library only. Run from anywhere: python site/scripts/check_pages.py

Every published page must be a sound, small, self-contained document:
  - doctype, lang, title, viewport; no duplicate ids; images have alt text
  - the hub, group pages and generated pages also carry a Content-Security-Policy and name every button and link
  - no page loads anything from another website (scripts, styles, images, fonts, frames, forms)
  - internal links on the hub, group pages and 404 point at files that exist
  - size budgets, so the site stays fast on a slow phone
Errors fail the check. Warnings are printed and do not.
"""
import html, json, os, re, sys
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
        self._in_title = False; self._stack = []; self._foreign = 0
        self.desc = False; self.viewport_content = ""; self.headings = []; self.bad_tabindex = 0; self.bad_blank = 0

    def handle_decl(self, decl):
        if decl.lower().startswith("doctype html"):
            self.doctype = True

    def set_cdata_mode(self, elem, **kw):
        # inside svg or math, style, title, iframe and the like are not raw text to a browser
        if not self._foreign: super().set_cdata_mode(elem, **kw)

    def handle_starttag(self, tag, attrs):
        if tag in ("svg", "math"): self._foreign += 1
        a = {}
        for _k, _v in attrs:  # the browser uses the first of two same-named attributes
            a.setdefault(_k, _v)
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self._in_title = True
        if tag == "meta":
            if a.get("name") == "viewport": self.viewport = True; self.viewport_content = a.get("content") or ""
            if a.get("name") == "description" and (a.get("content") or "").strip(): self.desc = True
            if (a.get("http-equiv") or "").lower() == "content-security-policy": self.csp = True
        if "id" in a: self.ids.append(a["id"])
        if re.fullmatch(r"h[1-6]", tag): self.headings.append(int(tag[1]))
        if re.fullmatch(r"[1-9][0-9]*", (a.get("tabindex") or "").strip().lstrip("+")) is not None: self.bad_tabindex += 1
        if (a.get("target") or "").strip().lower() == "_blank" and not {"noopener", "noreferrer"} & set((a.get("rel") or "").lower().split()): self.bad_blank += 1
        if tag == "img" and a.get("alt") is None: self.imgs_no_alt += 1
        ext = lambda v: re.match(r"\s*(?:(?:https?:)?[/\\]{2}|https?:)", re.sub(r"^[\x00-\x20]+", "", re.sub(r"[\t\r\n]", "", v or "")), re.I)  # browsers drop tabs and line breaks; any scheme case, // or \\, or http:host
        res = {"script": "src", "img": "src", "iframe": "src", "source": "src", "audio": "src", "video": "src", "embed": "src", "form": "action", "input": "src", "track": "src", "base": "href", "frame": "src"}
        if tag in res and ext(a.get(res[tag])): self.external.append((tag, a[res[tag]]))
        for k, on in (("poster", tag == "video"), ("data", tag == "object"), ("formaction", tag in ("button", "input")), ("href", tag in ("image", "use", "feimage", "script")), ("xlink:href", tag in ("image", "use", "feimage", "script")), ("src", tag == "image"), ("background", True), ("ping", True), ("to", tag in ("set", "animate")), ("from", tag in ("set", "animate")), ("values", tag in ("set", "animate"))):
            if on and ext(a.get(k)): self.external.append((tag, a[k]))
        if tag in ("img", "source") and any(ext(u) for u in (a.get("srcset") or "").split(",")): self.external.append((tag, a["srcset"]))
        if tag == "link" and any(ext(u) for u in (a.get("imagesrcset") or "").split(",")): self.external.append((tag, a["imagesrcset"]))
        if tag == "link" and ext(a.get("href")) and (a.get("rel") or "").strip().lower() not in ("canonical", "alternate"): self.external.append(("link", a["href"]))
        if tag == "meta" and (a.get("http-equiv") or "").lower() == "refresh" and re.search(r"^\s*[\d.]*\s*[;,]?\s*(?:url\s*=\s*)?['\"]?\s*(?:(?:https?:)?[/\\]{2}|https?:)", re.sub(r"[\t\r\n]", "", a.get("content") or ""), re.I): self.external.append(("meta", a["content"]))
        if a.get("srcdoc"):
            inner = Scan(); inner.feed(a["srcdoc"]); self.external += inner.external  # an iframe's inline document loads too
        if tag == "a" and a.get("href") is not None: self.links.append(a["href"])
        if tag in ("a", "button"):
            self._stack.append([tag, bool(a.get("aria-label") or a.get("title") or a.get("aria-labelledby")), False, a.get("href") or a.get("id") or ""])
        elif tag == "img" and self._stack and (a.get("alt") or "").strip():
            self._stack[-1][2] = True  # an image with alt text names its control

    def handle_data(self, data):
        if self._in_title: self.title += data
        if self._stack and data.strip(): self._stack[-1][2] = True

    def handle_endtag(self, tag):
        if tag in ("svg", "math") and self._foreign: self._foreign -= 1
        if tag == "title": self._in_title = False
        if tag in ("a", "button") and self._stack:
            t, named, has_text, ident = self._stack.pop()
            if not (named or has_text): self.unnamed.append("%s %s" % (t, ident))


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


def csp_gaps(text):
    """Inline scripts and styles that the page's own Content-Security-Policy would block (a hash is listed but not for this block)."""
    import base64, hashlib
    gaps = []
    for csp in csp_list(text):  # browsers enforce every policy meta, so each one is judged
        gaps += [g for g in _csp_gaps(text, csp) if g not in gaps]
    return gaps


def csp_list(text):
    """The content of each real Content-Security-Policy meta (not one in a comment, template, noscript, textarea, script or style)."""
    out = []
    for tag_m in re.finditer(r"<meta\b[^>]*>", re.sub(r"<!--.*?-->|<(template|noscript|textarea|xmp|script|style)\b.*?</\1>", lambda k: " " * len(k.group(0)), text, flags=re.S | re.I), re.I):
        if re.search(r"http-equiv\s*=\s*[\"']?Content-Security-Policy", tag_m.group(0), re.I):
            c = re.search(r"content\s*=\s*([\"'])(.*?)\1", tag_m.group(0), re.S)
            out.append(c.group(2) if c else "")
    return out


def _csp_gaps(text, csp):
    import base64, hashlib
    gaps = []
    def _dir(name):
        return re.search(r"(?<![\w-])" + name + r"\s+([^;]*)", csp) or re.search(r"(?<![\w-])default-src\s+([^;]*)", csp)
    markup = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", "", text, flags=re.S | re.I)
    _ss, _sc = _dir("style-src"), _dir("script-src")
    if _ss and ("'unsafe-inline'" not in _ss.group(1) or "'sha256-" in _ss.group(1)) and re.search(r"<[a-zA-Z][^>]*[\s/\"']style\s*=", markup):
        gaps.append("a style attribute is blocked: style-src allows no inline styles (unsafe-inline is ignored when a hash is listed)")
    if _sc and ("'unsafe-inline'" not in _sc.group(1) or "'sha256-" in _sc.group(1)) and re.search(r"<[a-zA-Z][^>]*[\s/\"']on[a-zA-Z]+\s*=", markup):
        gaps.append("an inline event handler is blocked: script-src allows no inline handlers (unsafe-inline is ignored when a hash is listed)")
    if _sc and ("'unsafe-inline'" not in _sc.group(1) or "'sha256-" in _sc.group(1)) and re.search(r"<a\b[^>]*[\s/\"']href\s*=\s*[\"']?\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:", html.unescape(markup), re.I):
        gaps.append("a javascript: link is blocked: script-src allows no inline script")
    h = lambda x: "sha256-" + base64.b64encode(hashlib.sha256(x.replace(chr(13) + chr(10), chr(10)).replace(chr(13), chr(10)).encode("utf-8")).digest()).decode()  # browsers normalise line endings before hashing
    for directive, tag in (("script-src", "script"), ("style-src", "style")):
        d = re.search(r"(?<![\w-])" + directive + r"\s+([^;]*)", csp) or re.search(r"(?<![\w-])default-src\s+([^;]*)", csp)  # an unset directive falls back to default-src
        if not d or ("'unsafe-inline'" in d.group(1) and "'sha256-" not in d.group(1)):  # with a hash listed, browsers ignore unsafe-inline
            continue
        if "'sha256-" not in d.group(1) and directive == "script-src":  # no hash and no unsafe-inline: every inline script is blocked
            if any(b.group(2).strip() and _attr(b.group(1), "src") is None and not _data_block(b.group(1))
                   for b in re.finditer(r"<script\b([^>]*)>(.*?)</script>", text, re.S | re.I)):
                gaps.append("an inline script is blocked: script-src has no hash and no unsafe-inline")
            continue
        if "'sha256-" not in d.group(1):
            if tag == "style" and re.search(r"<style\b[^>]*>\s*\S", text):
                gaps.append("an inline style is blocked: style-src has no hash and no unsafe-inline")
            continue
        for b in re.finditer(r"<%s\b([^>]*)>(.*?)</%s>" % (tag, tag), text, re.S | re.I):
            attrs, body = b.group(1), b.group(2)
            if tag == "script" and (_attr(attrs, "src") is not None or _data_block(attrs)):
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


_Q = r"['" + chr(34) + "`]"
_Q2 = r"['" + chr(34) + "]?"
JS_LOAD = re.compile(r"(?:fetch|import|importScripts|WebSocket|EventSource|sendBeacon|Worker|SharedWorker)" + r"\s*\(\s*(?:[^,)]*,\s*)?" + _Q + r"\s*(?:https?:)?//|(?<![\w$.])import\s*(?:[^;'" + chr(34) + r"`]*?from\s*)?" + _Q + r"\s*(?:https?:)?//", re.I)
JS_STATIC = re.compile(r"(?:importScripts|Worker|SharedWorker)" + r"\s*\(\s*(?:[^,)]*,\s*)?" + _Q + r"\s*(?:https?:)?//|(?<![\w$.])import\s*(?:[^;'" + chr(34) + r"`]*?from\s*)?" + _Q + r"\s*(?:https?:)?//", re.I)
REMOTE_CALL = re.compile(r"(?:fetch|import|importScripts|Worker|SharedWorker|WebSocket|EventSource|sendBeacon|open)\s*\(\s*(?:[^,)]*,\s*)?" + _Q + r"\s*(?:https?:)?//|(?:src|href)\s*=\s*" + _Q + r"\s*(?:https?:)?//|@import\s*(?:url\()?\s*" + _Q2 + r"\s*(?:https?:)?//|url\(\s*" + _Q2 + r"\s*(?:https?:)?//", re.I)


def extra_files(full, rel):
    """Other files of a bundle (scripts, styles, pages, images) must not load from another site either."""
    parts = rel.replace(chr(92), "/").split("/")
    if len(parts) < 3 or parts[0] not in KINDS or os.path.splitext(parts[-1])[1].lower() not in (".html", ".htm", ".js", ".mjs", ".css", ".svg"):
        return
    text = open(full, "rb").read().decode("utf-8", "replace")
    if os.path.splitext(parts[-1])[1].lower() in (".html", ".htm"):
        s = Scan(); s.feed(text)
        if s.external: errors.append("%s: loads from another site: %s" % ("/".join(parts), ", ".join(u for _, u in s.external[:3])))
    if REMOTE_CALL.search(html.unescape(text)) or JS_LOAD.search(html.unescape(text)): errors.append("/".join(parts) + ": loads from another site")


def main():
    count = 0
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in (".git", ".github", "__pycache__") and not (dp == ROOT and d in ("docs", "scripts", "content", "templates"))]
        for f in fn:
            if (f != "index.html" and f != "404.html") or classify(os.path.relpath(os.path.join(dp, f), ROOT))[0] is None:
                extra_files(os.path.join(dp, f), os.path.relpath(os.path.join(dp, f), ROOT))
                continue
            full = os.path.join(dp, f); rel = os.path.relpath(full, ROOT)
            kind, strict = classify(rel)
            if not kind:
                continue
            count += 1
            raw = open(full, "rb").read()
            text = raw.decode("utf-8", "replace")
            s = Scan(); s.feed(text)  # HTMLParser already reads script and style bodies as raw text and comments as comments
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
            _cs = re.search(r"connect-src([^;" + chr(34) + "]*)", text) or re.search(r"default-src([^;" + chr(34) + "]*)", text)
            _wild = bool(_cs and re.search(r"(?:^|\s)(?:\*|https?:)(?:\s|$)", _cs.group(1)))  # the CSP is what blocks a network call: a literal call is only a defect when the CSP lets any site through
            if (JS_LOAD if _wild else JS_STATIC).search(html.unescape(text)): errors.append(where + ": a script loads from another site")
            _css = re.sub(r"\\([0-9a-fA-F]{1,6})\s?", lambda m: chr(int(m.group(1), 16)) if int(m.group(1), 16) < 0x110000 else "", html.unescape(text))  # decode HTML entities and CSS escapes first
            _css = re.sub(r"\\([^0-9a-fA-F\n])", r"\1", re.sub(r"/\*.*?\*/", "", _css, flags=re.S))  # then simple escapes and comments
            _css = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", " ", _css)  # control characters the URL parser drops
            if re.search(r"@import\s*(?:url\()?\s*['\"]?\s*(?:(?:https?:)?[/\\]{2}|https?:)|(?:url|image-set)\(\s*['\"]?\s*(?:(?:https?:)?[/\\]{2}|https?:)", _css, re.I): errors.append(where + ": stylesheet, font or image from another site")
            if strict:
                if where != "404.html" and not (s.csp and csp_list(text)): errors.append(where + ": missing Content-Security-Policy")
                if re.search(r"<!\[CDATA\[", text, re.I) and not re.search(r"<(svg|math)\b", text, re.I): errors.append(where + ": a CDATA section outside svg or math is read as a comment, so the checks cannot see its content")
                if s.unnamed: errors.append(where + ": unnamed controls: " + ", ".join(s.unnamed[:4]))
            elif not s.csp:
                (errors if kind == "app" else warnings).append(where + ": no Content-Security-Policy")
            if not strict and s.unnamed: warnings.append(where + ": unnamed controls: " + ", ".join(s.unnamed[:4]))
            # language-light, accessible, high-signal pages (WCAG 2.2, plain structure): errors on generated pages, warnings on hand-built apps
            flag = errors if strict else warnings
            if where != "404.html" and not s.desc: flag.append(where + ": missing meta description")
            if re.search(r"user-scalable\s*=\s*(no|false|0)|maximum-scale\s*=\s*(?:0|1)(?:\.\d+)?(?!\d)", s.viewport_content, re.I): errors.append(where + ": the viewport blocks zoom")
            if s.bad_tabindex: errors.append("%s: %d element(s) with tabindex above 0 (breaks keyboard order)" % (where, s.bad_tabindex))
            if s.bad_blank: errors.append("%s: %d link(s) open a new tab without rel=noopener" % (where, s.bad_blank))
            if s.headings.count(1) != 1: flag.append("%s: %d <h1> (want exactly one)" % (where, s.headings.count(1)))
            if any(b - a > 1 for a, b in zip(s.headings, s.headings[1:])): flag.append(where + ": a heading level is skipped")
            if len(s.title.strip()) >= 60: warnings.append("%s: title is %d characters (keep it under 60)" % (where, len(s.title.strip())))
            if re.search(r"\banimation\s*:|\btransition\s*:", text) and "prefers-reduced-motion" not in text: flag.append(where + ": motion without a prefers-reduced-motion rule")
            if kind in ("hub", "group") or where in ("404.html",):
                base = os.path.dirname(full)
                for h in s.links:
                    if re.match(r"(?:[a-z][a-z0-9+.-]*:|#)", h, re.I):
                        continue
                    target = os.path.normpath(os.path.join(ROOT if h.startswith("/") else base, h.lstrip("/").split("#")[0].split("?")[0]))
                    if os.path.isdir(target): target = os.path.join(target, "index.html")
                    if not os.path.isfile(target) or os.path.commonpath([os.path.realpath(target), os.path.realpath(ROOT)]) != os.path.realpath(ROOT): errors.append("%s: broken link %s" % (where, h))
            if len(raw) > BUDGET[kind] and not any(where == b.rstrip("/") + "/index.html" or where.startswith(b.rstrip("/") + "/") for b in BIG_OK):
                errors.append("%s: %d KB is over the %d KB budget" % (where, len(raw) // 1000, BUDGET[kind] // 1000))
            elif kind == "app" and len(raw) > 1_500_000:
                warnings.append("%s: %d KB (large)" % (where, len(raw) // 1000))
    if count == 0:
        errors.append("no page was checked (the site folder is empty or moved)")
    for w in warnings:
        print("WARN " + w)
    if errors:
        print("\n".join("FAIL " + e for e in errors))
        return 1
    print("page quality: OK (%d pages, %d warning%s)" % (count, len(warnings), "" if len(warnings) == 1 else "s"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
