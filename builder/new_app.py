"""Start a new single-file app from the Omnevum starter, already registered.
  python builder/new_app.py <kind> <slug> "<Title>" --topic <topic> --blurb "<up to 20 words>"
Kinds: apps, tools, games, guides, recipes, courses, references.  Topics: see topics.json.
Creates sources/apps/<APPS|TOOL|GAME|GUID|RECI|COUR|REFE>-<first word of Title>-v0.1.0.html (the design system and the CSP hash are filled in), adds a registry entry
(published by the next build; set "archived" or "private" first if it should not be), and tells you the next step."""
import base64, hashlib, json, os, re, sys
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import OUT, APPS_DIR
KINDS = ("apps", "tools", "games", "guides", "recipes", "courses", "references")


def opt(name, default):
    i = sys.argv.index(name) + 1 if name in sys.argv else 0
    if i and (i >= len(sys.argv) or sys.argv[i].startswith("--")):
        print("%s needs a value." % name); sys.exit(2)
    return sys.argv[i] if i else default


pos = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and not sys.argv[i - 1].startswith("--")]
if len(pos) != 3 or pos[0] not in KINDS:
    print('Usage: python new_app.py <kind> <slug> "<Title>" --topic <topic> --blurb "<text>"\nKinds: ' + ", ".join(KINDS)); sys.exit(2)
kind, slug, title = pos
topic = opt("--topic", "learning"); blurb = opt("--blurb", "One short line that says what this is.")
topics = {t["id"] for t in json.load(open(os.path.join(OM, "topics.json"), encoding="utf-8"))}
if topic not in topics or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug) or len(slug) > 60 or slug.split("-")[0] in {"con", "prn", "aux", "nul", "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9", "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"} or len(blurb.split()) > 20 or re.search("[|<>" + chr(13) + chr(10) + "]", blurb):
    print("Check: topic must be one of %s; slug lowercase-with-dashes; blurb up to 20 words." % ", ".join(sorted(topics))); sys.exit(1)
reg_path = os.path.join(OM, "registry.json"); reg = json.load(open(reg_path, encoding="utf-8"))
if any(p["slug"] == slug for p in reg["pages"]):  # a slug is unique across all kinds (the build requires it)
    print("That address is already used by another page: %s" % slug); sys.exit(1)

tpl = open(os.path.join(OM, "app-starter.html"), encoding="utf-8").read()
css = re.sub(r"\n\s*", "\n", re.sub(r"/\*.*?\*/", "", open(os.path.join(OUT, "scripts", "ui.css"), encoding="utf-8").read(), flags=re.S).strip())
m = re.search(r"<script>(.*?)</script>", tpl, re.S)
script_hash = "sha256-" + base64.b64encode(hashlib.sha256(m.group(1).replace("@@STORAGE_KEY@@", "omn.%s.%s.v1" % (kind, slug)).encode()).digest()).decode()
def _icon(m):
    f = os.path.join(OM, "icons", "phosphor", "regular", m.group(1) + ".svg")
    return re.search(r"<svg[^>]*>(.*)</svg>", open(f, encoding="utf-8").read(), re.S).group(1)


tpl = re.sub(r"@@ICON:([a-z-]+)@@", _icon, tpl)
page = (tpl.replace("@@UI_CSS@@", "/* OMNEVUM KIT:BEGIN */\n" + css + "\n/* OMNEVUM KIT:END */").replace("@@STORAGE_KEY@@", "omn.%s.%s.v1" % (kind, slug)).replace("@@SCRIPT_HASH@@", script_hash)
        .replace("@@TITLE@@", __import__("html").escape(title)).replace("@@BLURB@@", __import__("html").escape(blurb)))
_st = re.search(r"<style>(.*?)</style>", page, re.S).group(1)
page = page.replace("@@STYLE_HASH@@", "sha256-" + base64.b64encode(hashlib.sha256(_st.encode()).digest()).decode())
fname = "APPS-%s-%s-v0.1.0.html" % (kind[:4].upper(), re.sub(r"[^A-Za-z0-9]", "", (title.split() or ["App"])[0]) or "App")  # the stem is the pun, the first word (house naming; rename.py --file-stem expects it)
dest = os.path.join(APPS_DIR, fname)
if os.path.exists(dest):
    print("File exists: " + dest); sys.exit(1)
open(dest, "w", encoding="utf-8", newline="\n").write(page)
reg["pages"].append(dict(id=slug, title=title, kind=kind, slug=slug, source="apps/" + fname.replace("-v0.1.0.html", "-v*.html"), topic=topic, blurb=blurb,
                         keywords=" ".join(re.findall(r"[a-z]+", (title + " " + blurb).lower())), icon="starter", tagline="A new app", lazy=True, private=False, archived=False, license="MIT"))
json.dump(reg, open(reg_path, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
icons_path = os.path.join(OM, "icons.json"); icons = json.load(open(icons_path, encoding="utf-8"))
icons.setdefault("starter", "plus-square")
json.dump(icons, open(icons_path, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
print("Created " + dest + "\nRegistered %s/%s in registry.json (icon 'starter': give it its own icon in icons.json).\n"
      "Next: build the app in that file, then run  python %s" % (kind, slug, os.path.join(OM, "build.py")))
