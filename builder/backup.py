"""Local backup of the repository plus the few files that must never be public. Standard library only.
  python builder/backup.py                 zip the tracked files and the local-only files into Omnevum-backup-<date>.zip beside the repository
  python builder/backup.py --verify <zip>  check a backup: zip integrity, every file hash, no unlisted members, and the .sha256.txt beside it (without that sidecar it proves consistency, not authenticity)
GitHub already holds the tracked files, so the point of this zip is the local-only files: builder/privacy_names.txt (the private name blocklist),
converge/private-skip.txt, and converge/receipts/*.json. Keep the zip off the public internet. Generated files are not stored: python builder/build.py rebuilds them."""
import datetime, hashlib, json, os, subprocess, sys, zipfile

OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import HOME

LOCAL_ONLY = ["builder/privacy_names.txt", "converge/private-skip.txt"]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def make():
    tracked = subprocess.run(["git", "ls-files", "-z"], cwd=HOME, capture_output=True, text=True, check=True).stdout.split("\0")
    files = [f for f in tracked if f and os.path.exists(os.path.join(HOME, f))]
    files += [f for f in LOCAL_ONLY if os.path.exists(os.path.join(HOME, f))]
    for f in LOCAL_ONLY:
        if not os.path.exists(os.path.join(HOME, f)):
            print("warning: %s is missing, so this backup does not hold it" % f)
    rec = os.path.join(HOME, "converge", "receipts")
    if os.path.isdir(rec):
        files += ["converge/receipts/" + f for f in sorted(os.listdir(rec)) if f.endswith(".json")]
    out = os.path.join(os.path.dirname(HOME), "Omnevum-backup-%s.zip" % datetime.date.today().isoformat())
    man = {}
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for f in sorted(set(files)):
            data = open(os.path.join(HOME, f), "rb").read()
            z.writestr("Omnevum/" + f, data); man[f] = sha(data)
        z.writestr("Omnevum/BACKUP-MANIFEST.json", json.dumps({"created": datetime.datetime.now().isoformat(timespec="seconds"), "files": man}, indent=1))
    open(out[:-4] + ".sha256.txt", "w").write("%s  %s\n" % (sha(open(out, "rb").read()), os.path.basename(out)))
    print("backup: %s (%.1f MB, %d files)" % (out, os.path.getsize(out) / 1e6, len(man)))
    return verify(out)


def verify(path):
    bad = []
    try:
        z = zipfile.ZipFile(path)
    except (OSError, zipfile.BadZipFile) as e:
        print("verify: FAILED cannot open the zip (%s)" % type(e).__name__); return 1
    with z:
        if len(z.namelist()) != len(set(z.namelist())):
            bad.append("duplicate member names")
        if z.testzip():
            bad.append("corrupt member")
        try:
            man = json.loads(z.read("Omnevum/BACKUP-MANIFEST.json"))["files"]
            if not isinstance(man, dict):
                raise ValueError
        except (KeyError, ValueError):
            print("verify: FAILED no readable manifest"); return 1
        if not man:
            bad.append("empty manifest")
        bad += ["missing " + f for f in man if "Omnevum/" + f not in z.namelist()]
        for f, h in man.items():
            if "Omnevum/" + f not in z.namelist():
                continue
            if sha(z.read("Omnevum/" + f)) != h:
                bad.append("hash mismatch " + f)
        known = {"Omnevum/" + f for f in man} | {"Omnevum/BACKUP-MANIFEST.json"}
        bad += ["unlisted " + n for n in z.namelist() if n not in known and not n.endswith("/")]
    side = path[:-4] + ".sha256.txt"  # the whole-zip hash written beside the zip: the only value kept outside it
    if os.path.exists(side):
        want = (open(side, encoding="utf-8").read().split() or [""])[0]
        if sha(open(path, "rb").read()) != want:
            bad.append("zip differs from its .sha256.txt")
    gone = [f for f in LOCAL_ONLY if f not in man]
    print("verify: %s (%d files)%s" % ("OK" if not bad else "FAILED " + ", ".join(bad[:8]), len(man), "; not in this backup: " + ", ".join(gone) if gone else ""))
    return 1 if bad else 0


if __name__ == "__main__":
    a = sys.argv[1:]
    sys.exit(verify(a[a.index("--verify") + 1]) if "--verify" in a else make())
