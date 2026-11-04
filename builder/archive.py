"""Move pages into or out of the hub's Archive section. Addresses never change, so no link breaks.
  python builder/archive.py list
  python builder/archive.py archive "MeepleMentor" goalguru
  python builder/archive.py restore "MeepleMentor"
  python builder/archive.py remove "<page>" --yes     # delete a page for good (see below)
A page can be named by its id, its address slug, or its title (any capitals). Add --no-build to change the registry only.
It is safe to repeat: asking for the state a page already has changes nothing.
"remove" deletes a page: it leaves the registry (or deletes its content file), the site drops it on the next build, and its source file in
sources/apps moves to history (so a mistake is recoverable). It needs --yes. Old links to it show the 404 page."""
import json, os, subprocess, sys
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import OUT as SITE, SUP, V as SOURCES
REG = os.path.join(OM, "registry.json")


def load_all():
    """Every page, from both sources: (label, id, slug, title, getter, setter)."""
    reg = json.load(open(REG, encoding="utf-8"))
    pages = []
    for p in reg["pages"]:
        pages.append(dict(src="registry", data=p, id=p["id"], slug=p["slug"], title=p["title"], kind=p["kind"]))
    content = os.path.join(SITE, "content")
    if os.path.isdir(content):
        for kind in sorted(os.listdir(content)):
            if kind.startswith("_") or not os.path.isdir(os.path.join(content, kind)):
                continue
            for f in sorted(os.listdir(os.path.join(content, kind))):
                if f.endswith(".json"):
                    path = os.path.join(content, kind, f); d = json.load(open(path, encoding="utf-8"))
                    pages.append(dict(src=path, data=d, id=d["kind"] + "-" + d["slug"], slug=d["slug"], title=d["title"], kind=d["kind"]))
    return reg, pages


def find(pages, word):
    w = word.strip().lower()
    hits = [p for p in pages if w in (p["id"].lower(), p["slug"].lower(), p["title"].lower()) or w in [f.lower() for f in p["data"].get("former_names", [])]]
    if not hits:
        hits = [p for p in pages if w in p["title"].lower() or w in p["id"].lower()]
    return hits


def remove(reg, pages, words, build):
    import glob, shutil
    if "--yes" not in sys.argv:
        print("Removing deletes a page from the site. Add --yes to confirm."); return 2
    gone, problems = [], []
    for word in words:
        hits = find(pages, word)
        if len(hits) != 1:
            problems.append('"%s": %s' % (word, "no page matches" if not hits else "matches several (%s); use the id" % ", ".join(h["id"] for h in hits))); continue
        gone.append(hits[0])
    if problems:
        print("Nothing changed.\n  " + "\n  ".join(problems)); return 1
    sup = SUP; os.makedirs(sup, exist_ok=True)
    for p in gone:
        if p["src"] == "registry":
            reg["pages"] = [x for x in reg["pages"] if x["id"] != p["id"]]
            d = p["data"]
            if d.get("form", "single") == "single" and not os.path.isabs(d["source"]):
                for f in glob.glob(os.path.join(glob.escape(SOURCES), d["source"].replace("/", os.sep))):
                    shutil.copy2(f, sup)
                    if open(f, "rb").read() == open(os.path.join(sup, os.path.basename(f)), "rb").read():
                        os.remove(f)
        else:
            shutil.copy2(p["src"], sup); os.remove(p["src"])
        print("Removed: %s (source kept in history)" % p["title"])
    json.dump(reg, open(REG, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
    if build:
        r = subprocess.run([sys.executable, "-B", os.path.join(OM, "build.py")], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-300:])
        return r.returncode
    return 0


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    build = "--no-build" not in sys.argv
    reg, pages = load_all()
    if not args or args[0] == "list":
        for state, label in ((False, "Main hub"), (True, "Archive")):
            print("%s:" % label)
            for p in sorted((p for p in pages if bool(p["data"].get("archived")) == state), key=lambda p: (p["kind"], p["title"].lower())):
                print("  %-26s %-11s %s" % (p["title"], p["kind"], p["id"]))
        return 0
    if args[0] not in ("archive", "restore", "remove") or len(args) < 2:
        print('Usage: archive.py list | archive <page...> | restore <page...> | remove <page...> --yes   (name a page by id, slug or title)'); return 2
    if args[0] == "remove":
        return remove(reg, pages, args[1:], build)
    target = args[0] == "archive"; changed, problems = [], []
    for word in args[1:]:
        hits = find(pages, word)
        if len(hits) != 1:
            problems.append('"%s": %s' % (word, "no page matches" if not hits else "matches several (%s); use the id" % ", ".join(h["id"] for h in hits))); continue
        p = hits[0]
        if bool(p["data"].get("archived")) != target:
            p["data"]["archived"] = target; p["dirty"] = True; changed.append(p)
    if problems:
        print("Nothing changed.\n  " + "\n  ".join(problems)); return 1
    for p in changed:
        if p["src"] == "registry":
            json.dump(reg, open(REG, "w", encoding="utf-8", newline="\n"), indent=1, ensure_ascii=False)
        else:
            json.dump(p["data"], open(p["src"], "w", encoding="utf-8", newline="\n"), indent=2, ensure_ascii=False); open(p["src"], "a", encoding="utf-8").write("\n")
    print(("%s: " % ("Archived" if target else "Restored")) + (", ".join(p["title"] for p in changed) if changed else "nothing to do (already so)"))
    if changed and build:
        r = subprocess.run([sys.executable, "-B", os.path.join(OM, "build.py")], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-300:])
        return r.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())
