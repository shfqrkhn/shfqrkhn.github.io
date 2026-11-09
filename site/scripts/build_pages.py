"""Render simple content pages (recipes, guides, board games, lessons) from small data files.
Standard library only.

  content/<kind>/<slug>.json   ->   <kind>/<slug>/index.html   (one self-contained file, same look as the hub)

Check a data file:   python site/scripts/build_pages.py --check
Render all of them:  python site/scripts/build_pages.py
The Omnevum build (builder/build.py) also renders and lists them; see docs/FRAMEWORK.md.
"""
import base64, hashlib, html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BN = json.load(open(os.path.join(os.path.dirname(ROOT), "builder", "brand.json"), encoding="utf-8"))["name"]  # rebrand in builder/brand.json
KINDS = ("games", "guides", "recipes", "courses", "references")
TOPICS = ("money", "health", "home", "food", "games", "learning", "work", "travel", "local", "music", "ai")
E = html.escape

_ICONS = os.path.join(ROOT, "scripts", "ui-icons.json")
ICON = json.load(open(_ICONS, encoding="utf-8")) if os.path.exists(_ICONS) else {}  # Phosphor Icons (MIT), written by the build; empty until the first build
if not ICON and __name__ == "__main__":
    sys.exit("Run python builder/build.py once first: it writes the icon file these scripts need.")

CSS = re.sub(r"\n\s*", "\n", re.sub(r"/\*.*?\*/", "", open(os.path.join(ROOT, "scripts", "ui.css"), encoding="utf-8").read(), flags=re.S).strip())  # the one design system

JS = """(function(){var K="hub.prefs.v1",L=["auto","paper","charcoal","black"],r=document.documentElement,P="auto";
try{var s=JSON.parse(localStorage.getItem(K)||"null");if(s&&L.indexOf(s.look)>=0)P=s.look}catch(e){}
function set(){r.setAttribute("data-look",P)}set();
document.getElementById("look").addEventListener("click",function(){P=L[(L.indexOf(P)+1)%4];try{var s=JSON.parse(localStorage.getItem(K)||"null")||{schemaVersion:1};s.look=P;localStorage.setItem(K,JSON.stringify(s))}catch(e){}set()});
var key="omn.page."+location.pathname.replace(/\\W+/g,".")+".v1",boxes=[].slice.call(document.querySelectorAll(".chk input")),st={};
try{st=JSON.parse(localStorage.getItem(key)||"{}")||{}}catch(e){st={}}
boxes.forEach(function(b,i){b.checked=!!st[i];b.addEventListener("change",function(){st[i]=b.checked?1:0;try{localStorage.setItem(key,JSON.stringify(st))}catch(e){}})});
var rs=document.getElementById("reset");if(rs){rs.addEventListener("click",function(){boxes.forEach(function(b){b.checked=false});st={};try{localStorage.removeItem(key)}catch(e){}})}})();"""


def _svg(inner):
    return '<svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">%s</svg>' % inner


def validate(d, where):
    """Strict shape check. Returns the normalised page or raises ValueError with the file name."""
    def bad(msg):
        raise ValueError("%s: %s" % (where, msg))
    if not isinstance(d, dict):
        bad("the file must hold one JSON object")
    for k in ("title", "kind", "slug", "topic", "blurb", "blocks"):
        if k not in d:
            bad("missing " + k)
    for k in ("title", "kind", "slug", "topic", "blurb"):
        if not isinstance(d[k], str):
            bad(k + " must be text")
    if d["kind"] not in KINDS:
        bad("kind must be one of %s" % ", ".join(KINDS))
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", d["slug"]) or len(d["slug"]) > 60 or d["slug"].split("-")[0] in {"con", "prn", "aux", "nul", "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9", "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"}:
        bad("slug must be lowercase words joined by dashes, up to 60 characters, and not a Windows device name")
    if d["topic"] not in TOPICS:
        bad("topic must be one of %s" % ", ".join(TOPICS))
    if not d["title"].strip() or not (1 <= len(d["title"]) <= 60) or not (1 <= len(d["blurb"].split()) <= 20):
        bad("title up to 60 characters, blurb up to 20 words")
    if re.search("[|<>" + chr(13) + chr(10) + "]", d["blurb"]):
        bad("blurb has no |, <, > or line break (they break llms.txt)")
    if re.search(r"[|<>\r\n\u2013\u2014]", d["title"]):
        bad("title has no |, <, >, line break, em or en dash")
    for k in ("version", "license", "tagline"):
        if k in d and (not isinstance(d[k], str) or re.search(r"[|<>\r\n\u2013\u2014]", d[k])):
            bad(k + " must be text with no |, <, >, line break, em or en dash")
    if "@@" in json.dumps(d, ensure_ascii=False):
        bad("@@ is reserved for build placeholders")
    if "keywords" in d and not isinstance(d["keywords"], str):
        bad("keywords must be text")
    if "lang" in d and not (isinstance(d["lang"], str) and re.fullmatch(r"[A-Za-z]{2,3}(-[A-Za-z0-9]{1,8})*", d["lang"])):
        bad("lang must be a language code such as en or fr-CA")
    if "archived" in d and not isinstance(d["archived"], bool):
        bad("archived must be true or false")
    if len(d.get("tagline", "")) > 40:
        bad("tagline up to 40 characters")
    if "hue" in d and d["hue"] is not None and not (isinstance(d["hue"], int) and not isinstance(d["hue"], bool) and 0 <= d["hue"] <= 359):
        bad("hue must be a whole number from 0 to 359")
    if not isinstance(d["blocks"], list) or not d["blocks"]:
        bad("blocks must be a non-empty list")
    for i, b in enumerate(d["blocks"]):
        if not isinstance(b, dict):
            bad("block %d must be an object" % i)
        if not isinstance(b.get("title", ""), str):
            bad("block %d: title must be text" % i)
        t = b.get("type")
        if "check" in b and not isinstance(b["check"], bool):
            bad("block %d: check must be true or false" % i)
        if t in ("list", "steps"):
            if not isinstance(b.get("items"), list) or not all(isinstance(x, str) and x for x in b["items"]):
                bad("block %d: items must be non-empty strings" % i)
        elif t == "text":
            if not isinstance(b.get("text"), str) or not b["text"]:
                bad("block %d: text must be a string" % i)
        elif t == "table":
            cells = lambda r: isinstance(r, list) and all(isinstance(c, str) for c in r)
            if not cells(b.get("head")) or not isinstance(b.get("rows"), list) or not all(cells(r) and len(r) == len(b["head"]) for r in b["rows"]):
                bad("block %d: head and each row must be lists of text, rows as long as head" % i)
        else:
            bad("block %d: type must be list, steps, text or table" % i)
    d.setdefault("keywords", "")
    d.setdefault("version", "1.0.0")
    d.setdefault("archived", False)
    return d


def render(d):
    """Return the page as bytes."""
    out = []
    for b in d["blocks"]:
        t = b["type"]
        head = '<h2>%s%s</h2>' % (_svg(ICON[t]), E(b["title"])) if b.get("title") else ""
        if t == "list" and b.get("check"):
            body = '<ul class="chk" role="list">%s</ul>' % "".join('<li><label><input type="checkbox"><span>%s</span></label></li>' % E(x) for x in b["items"])
        elif t == "list":
            body = '<ul class="plain">%s</ul>' % "".join("<li>%s</li>" % E(x) for x in b["items"])
        elif t == "steps":
            body = '<ol class="steps" role="list">%s</ol>' % "".join("<li><span>%s</span></li>" % E(x) for x in b["items"])
        elif t == "text":
            body = "".join("<p>%s</p>" % E(p) for p in b["text"].split("\n\n"))
        else:
            body = '<div class="tw"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (
                "".join("<th>%s</th>" % E(h) for h in b["head"]), "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % E(c) for c in r) for r in b["rows"]))
        out.append('<section class="card">%s%s</section>' % (head, body))
    has_checks = any(b["type"] == "list" and b.get("check") for b in d["blocks"])
    sri = "sha256-" + base64.b64encode(hashlib.sha256(JS.encode()).digest()).decode()
    page = ('<!doctype html>\n<html lang="%s" data-look="auto"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
            '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'%s\'; style-src \'unsafe-inline\'; img-src \'self\' data:; base-uri \'none\'; form-action \'none\'">'
            '<meta name="color-scheme" content="light dark"><meta name="description" content="%s"><title>%s</title>'
            '<link rel="icon" href="../../icon.svg" type="image/svg+xml"><style>%s</style></head><body><div class="wrap narrow page">'
            '<div class="ph"><a class="ib" id="back-to-hub" href="../../" aria-label="' + BN + ' home" title="' + BN + '">%s</a><h1>%s</h1>%s'
            '<button class="ib" id="look" type="button" aria-label="Look" title="Look">%s</button></div>%s</div><script>%s</script></body></html>\n') % (
        E(d.get("lang", "en")), sri, E(d["blurb"]), E(d["title"]), CSS, _svg(ICON["home"]), E(d["title"]),
        '<button class="ib" id="reset" type="button" aria-label="Clear checks" title="Clear checks">%s</button>' % _svg(ICON["reset"]) if has_checks else "",
        _svg(ICON["look"]), "".join(out), JS)
    return page.encode("utf-8")


def load_all(content_dir):
    """Read every content/<kind>/<slug>.json (folders starting with _ are examples and are skipped)."""
    pages = []
    if not os.path.isdir(content_dir):
        return pages
    for kind in sorted(os.listdir(content_dir)):
        kd = os.path.join(content_dir, kind)
        if kind.startswith("_") or not os.path.isdir(kd):
            continue
        for f in sorted(os.listdir(kd)):
            if not f.endswith(".json"):
                continue
            where = "content/%s/%s" % (kind, f)
            try:
                raw = json.load(open(os.path.join(kd, f), encoding="utf-8"))
            except ValueError as e:
                raise ValueError("%s: not valid JSON (%s)" % (where, e))
            d = validate(raw, where)
            if d["kind"] != kind or d["slug"] + ".json" != f:
                raise ValueError("%s: kind and slug must match the folder and file name" % where)
            d["html"] = render(d)
            pages.append(d)
    return pages


if __name__ == "__main__":
    try:
        found = load_all(os.path.join(ROOT, "content"))
    except ValueError as e:
        print("FAIL " + str(e))
        sys.exit(1)
    if "--check" in sys.argv:
        print("OK %d content page(s) valid" % len(found))
        sys.exit(0)
    for d in found:
        dest = os.path.join(ROOT, d["kind"], d["slug"])
        os.makedirs(dest, exist_ok=True)
        open(os.path.join(dest, "index.html"), "wb").write(d["html"])
    print("rendered %d page(s)" % len(found))
