"""Start a new single-file app from the Omnevum starter, already registered.
  python builder/new_app.py <kind> <slug> "<Title>" --topic <topic> --blurb "<up to 20 words>"
Kinds: apps, tools, games, guides, recipes, courses, references.  Topics: see topics.json.
Creates sources/apps/APPS-<KIND>-<Title>-v0.1.0.html (the design system and the CSP hash are filled in), adds a registry entry
(unpublished until you set "archived"/"private" as you wish and run build.py), and tells you the next step."""
import base64, hashlib, json, os, re, sys
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import V, OUT, APPS_DIR
KINDS = ("apps", "tools", "games", "guides", "recipes", "courses", "references")


def opt(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


pos = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and not sys.argv[i - 1].startswith("--")]
if len(pos) != 3 or pos[0] not in KINDS:
    print('Usage: python new_app.py <kind> <slug> "<Title>" --topic <topic> --blurb "<text>"\nKinds: ' + ", ".join(KINDS)); sys.exit(2)
kind, slug, title = pos
topic = opt("--topic", "learning"); blurb = opt("--blurb", "One short line that says what this is.")
topics = {t["id"] for t in json.load(open(os.path.join(OM, "topics.json"), encoding="utf-8"))}
if topic not in topics or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug) or len(blurb.split()) > 20:
    print("Check: topic must be one of %s; slug lowercase-with-dashes; blurb up to 20 words." % ", ".join(sorted(topics))); sys.exit(1)
reg_path = os.path.join(OM, "registry.json"); reg = json.load(open(reg_path, encoding="utf-8"))
if any(p["slug"] == slug and p["kind"] == kind for p in reg["pages"]):
    print("That address is already used: %s/%s" % (kind, slug)); sys.exit(1)

tpl = open(os.path.join(OM, "app-starter.html"), encoding="utf-8").read()
css = re.sub(r"\n\s*", "\n", re.sub(r"/\*.*?\*/", "", open(os.path.join(OUT, "scripts", "ui.css"), encoding="utf-8").read(), flags=re.S).strip())
m = re.search(r"<script>(.*?)</script>", tpl, re.S)
script_hash = "sha256-" + base64.b64encode(hashlib.sha256(m.group(1).replace("@@STORAGE_KEY@@", "omn.%s.%s.v1" % (kind, slug)).encode()).digest()).decode()
def _icon(m):
    f = os.path.join(OM, "icons", "phosphor", "regular", m.group(1) + ".svg")
    return re.search(r"<svg[^>]*>(.*)</svg>", open(f, encoding="utf-8").read(), re.S).group(1)


tpl = re.sub(r"@@ICON:([a-z-]+)@@", _icon, tpl)
page = (tpl.replace("@@UI_CSS@@", css).replace("@@STORAGE_KEY@@", "omn.%s.%s.v1" % (kind, slug)).replace("@@SCRIPT_HASH@@", script_hash)
        .replace("@@TITLE@@", title).replace("@@BLURB@@", blurb))
fname = "APPS-%s-%s-v0.1.0.html" % (kind[:4].upper(), re.sub(r"[^A-Za-z0-9]+", "-", title).strip("-"))
dest = os.path.join(APPS_DIR, fname)
if os.path.exists(dest):
    print("File exists: " + dest); sys.exit(1)
open(dest, "w", encoding="utf-8", newline="\n").write(page)
reg["pages"].append(dict(id=slug, title=title, kind=kind, slug=slug, source="APPS/" + fname.replace("-v0.1.0.html", "-v*.html"), topic=topic, blurb=blurb,
                         keywords=" ".join(re.findall(r"[a-z]+", (title + " " + blurb).lower())), icon="starter", lazy=True, private=False, archived=False, license="MIT"))
json.dump(reg, open(reg_path, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
icons_path = os.path.join(OM, "icons.json"); icons = json.load(open(icons_path, encoding="utf-8"))
icons.setdefault("starter", "plus-square")
json.dump(icons, open(icons_path, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
print("Created " + dest + "\nRegistered %s/%s in registry.json (icon 'starter': give it its own icon in icons.json).\n"
      "Next: build the app in that file, then run  python %s\\build.py" % (kind, slug, OM))
