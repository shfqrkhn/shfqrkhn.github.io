"""Start a simple content page (recipe, guide, game page, lesson, reference). Standard library only.

  python scripts/new_page.py recipes egg-salad "Egg salad" --topic food

Creates content/<kind>/<slug>.json with a valid starting page. Edit it, then run python builder/build.py (see docs/FRAMEWORK.md).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts")); sys.dont_write_bytecode = True
import build_pages

args = [a for a in sys.argv[1:] if not a.startswith("--")]
if len(args) != 3:
    print('Usage: python scripts/new_page.py <kind> <slug> "<Title>" [--topic food]\nKinds: ' + ", ".join(build_pages.KINDS) + "\nTopics: " + ", ".join(build_pages.TOPICS))
    sys.exit(2)
kind, slug, title = args
topic = sys.argv[sys.argv.index("--topic") + 1] if "--topic" in sys.argv else "learning"
page = dict(title=title, kind=kind, slug=slug, topic=topic, blurb="One short line that says what this is.", keywords="", blocks=[
    dict(type="text", title="About", text="Write the first idea here."),
    dict(type="list", title="Checklist", check=True, items=["First item", "Second item"]),
    dict(type="steps", title="Steps", items=["First step", "Second step"])])
try:
    build_pages.validate(dict(page), "new page")
except ValueError as e:
    print("FAIL " + str(e)); sys.exit(1)
dest = os.path.join(ROOT, "content", kind); os.makedirs(dest, exist_ok=True)
path = os.path.join(dest, slug + ".json")
if os.path.exists(path):
    print("Already exists: " + path); sys.exit(1)
json.dump(page, open(path, "w", encoding="utf-8", newline="\n"), indent=2, ensure_ascii=False)
open(path, "a", encoding="utf-8").write("\n")
print("Created " + os.path.relpath(path, ROOT) + "\nNext: edit it, run  python scripts/build_pages.py --check , then run the Omnevum build.")
