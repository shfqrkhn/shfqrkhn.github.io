"""Per-app convergence keys for the live pages (Omni section 6.1 and 6.3). Standard library only.
  python converge/app_keys.py                 print the collection key and one key per item
  python converge/app_keys.py --json FILE     also write the manifest as JSON
  python converge/app_keys.py --views DIR     also write review views (long data lines elided, with hash and length)
Items: every sources/apps/*.html, plus "hub" (the builder, shared site files, engine, method pages, workflows).
An item key hashes the item's own bytes together with the shared closure (the hub files, this script and the
reviewer brief), so a shared change re-freezes every item and an app change re-freezes only that app.
Refuses to run when a closure file differs from the commit, so a key always names committed bytes."""
import hashlib, json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHARED_PREFIXES = ("builder/", "site/", "sources/engine/", "sources/method/", ".github/workflows/")
SHARED_FILES = ("requirements.txt", "converge/app_keys.py", "converge/apps-brief.md")
LONG = 2000  # lines longer than this are data or vendored code; views elide them with hash and length


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, check=True).stdout


def sha(b):
    return hashlib.sha256(b).hexdigest()


def main():
    tracked = [p for p in git("ls-files", "-z").split("\0") if p]
    apps = sorted(p for p in tracked if p.startswith("sources/apps/") and p.endswith(".html"))
    shared = sorted(p for p in tracked if p.startswith(SHARED_PREFIXES) or p in SHARED_FILES)
    missing = [p for p in SHARED_FILES if p not in tracked]
    if missing:
        sys.exit("not committed: " + ", ".join(missing))
    dirty = [l[3:] for l in git("status", "--porcelain", "--", *apps, *shared).splitlines()]
    if dirty:
        sys.exit("closure differs from the commit: " + ", ".join(dirty[:10]))
    file_hash = {p: sha(open(os.path.join(ROOT, p), "rb").read()) for p in apps + shared}
    shared_key = sha("\n".join(f"{p} {file_hash[p]}" for p in shared).encode())
    items = {"hub": {"files": len(shared), "key": shared_key}}
    for p in apps:
        name = os.path.basename(p)[:-5]
        items[name] = {"file": p, "bytes": os.path.getsize(os.path.join(ROOT, p)),
                       "key": sha(f"{p} {file_hash[p]}\nshared {shared_key}".encode())}
    collection = sha("\n".join(f"{n} {v['key']}" for n, v in sorted(items.items())).encode())
    manifest = {"commit": git("rev-parse", "HEAD").strip(), "collection_key": collection,
                "shared_key": shared_key, "items": items}
    print("commit", manifest["commit"][:7], "collection", collection[:16], "items", len(items))
    for n, v in items.items():
        print(f"  {v['key'][:16]}  {n}")
    if "--json" in sys.argv:
        out = sys.argv[sys.argv.index("--json") + 1]
        with open(out, "w", encoding="utf-8", newline="\n") as f:
            json.dump(manifest, f, indent=1)
    if "--views" in sys.argv:
        out = sys.argv[sys.argv.index("--views") + 1]
        os.makedirs(out, exist_ok=True)
        for p in apps:
            lines = open(os.path.join(ROOT, p), encoding="utf-8").read().split("\n")
            view = []
            for i, l in enumerate(lines, 1):
                if len(l) > LONG:
                    view.append(f"<<ELIDED source line {i}: {len(l)} chars, sha256 {sha(l.encode())[:16]}; "
                                f"starts: {l.lstrip()[:240]!r}; ends: {l.rstrip()[-120:]!r}>>")
                else:
                    view.append(l)
            name = os.path.basename(p)[:-5]
            with open(os.path.join(out, name + ".view.html"), "w", encoding="utf-8", newline="\n") as f:
                f.write("\n".join(view))


if __name__ == "__main__":
    main()
