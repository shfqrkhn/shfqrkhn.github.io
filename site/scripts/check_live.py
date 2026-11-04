"""Live health check. Standard library only. Run from anywhere: python scripts/check_live.py [site-url]

Add --version X to require a specific hub version (used right after a publish).
Fetches the published hub, reads its catalog, then confirms that every hosted page answers 200 and (for single-file pages)
matches its recorded hash. Remote pages are only checked for an https address. Exit 1 if anything differs.
"""
import hashlib, json, re, sys, urllib.request

args = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and sys.argv[i - 1] not in ("--version", "--hub-sha")]
BASE = (args[0] if args else "https://shfqrkhn.github.io/").rstrip("/") + "/"
EXPECT = sys.argv[sys.argv.index("--version") + 1] if "--version" in sys.argv else None
HUBSHA = sys.argv[sys.argv.index("--hub-sha") + 1] if "--hub-sha" in sys.argv else None  # exact fingerprint of the hub that was just published  # wait for this hub version (set after a publish)


def get(path):
    req = urllib.request.Request(BASE + path, headers={"Cache-Control": "no-cache", "User-Agent": "omnevum-health"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.status, r.read()


status, body = get("")
catalog = json.loads(re.search(r'id="catalogData">(.*?)</script>', body.decode("utf-8"), re.S).group(1).replace("<" + chr(92) + "/", "</"))
problems = []
if HUBSHA and hashlib.sha256(body).hexdigest() != HUBSHA:
    problems.append("the live hub is not the one just published (the new deployment is not live yet)")
if EXPECT and catalog["version"] != EXPECT:
    problems.append("live hub is %s, expected %s (the new version is not deployed yet)" % (catalog["version"], EXPECT))
for a in catalog["apps"]:
    form = a.get("form", "single")
    if form == "remote":
        if not a["address"].startswith("https://"):
            problems.append("remote page without https: " + a["id"])
        continue
    try:
        code, data = get(a["address"][2:])
    except Exception as e:
        problems.append("%s: %s" % (a["id"], e)); continue
    if code != 200:
        problems.append("%s: HTTP %d" % (a["id"], code))
    elif form == "single" and hashlib.sha256(data).hexdigest() != a["sha256"]:
        problems.append("%s: content differs from the catalog" % a["id"])
if problems:
    print("\n".join("FAIL " + p for p in problems))
    sys.exit(1)
print("live site OK: %d pages match the catalog (hub %s)" % (len(catalog["apps"]), catalog["version"]))
