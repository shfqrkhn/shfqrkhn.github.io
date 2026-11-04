"""Publish: check, commit, push. GitHub builds and deploys the site (see .github/workflows/deploy.yml).
  python builder/publish.py "message"            dry run: build, test, then list what would be committed
  python builder/publish.py "message" --yes      commit and push to main, then wait until the live hub matches this build
  --fast                                         skip the self-test (the build and its gates always run)
Needs git with push access to the repository. Generated files (site/ pages, worker, manifest) are never committed: the workflow rebuilds them."""
import hashlib, json, os, re, subprocess, sys, time

OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
from paths import HOME, OUT
PY = [sys.executable, "-B"]


def run(cmd, cwd=HOME, check=True):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if check and r.returncode:
        print("FAILED: " + " ".join(cmd) + "\n" + (r.stdout + r.stderr)[-1500:]); sys.exit(1)
    return r


args = [a for a in sys.argv[1:] if not a.startswith("--")]
msg = args[0] if args else "Update Omnevum"
go = "--yes" in sys.argv
_br = run(["git", "rev-parse", "--abbrev-ref", "HEAD"]).stdout.strip()
if _br != "main":
    print("FAILED: publish.py pushes to main and you are on %s. Check out main first." % _br); sys.exit(1)
print("1/4 build and gates"); run(PY + [os.path.join(OM, "build.py")])
if "--fast" not in sys.argv:
    print("2/4 self-test"); run(PY + [os.path.join(OM, "selftest.py")])
else:
    print("2/4 self-test skipped (--fast)")
status = run(["git", "status", "--short"]).stdout.strip().splitlines()
print("3/4 changes to commit: %d" % len(status))
for line in status[:25]:
    print("  " + line)
if not status:
    print("Nothing to publish: the repository is already up to date."); sys.exit(0)
if not go:
    print("\nDry run. Add --yes to commit and push."); sys.exit(0)
print("4/4 commit and push")
import shutil, tempfile
_stage = tempfile.mkdtemp()
try:
    open(os.path.join(_stage, "commit-message.txt"), "w", encoding="utf-8").write(msg)
    for _f in run(["git", "ls-files", "-mo", "--exclude-standard"]).stdout.splitlines():
        if _f != "builder/selftest.py" and os.path.isfile(os.path.join(HOME, _f)):  # the self-test plants fake personal data on purpose
            os.makedirs(os.path.join(_stage, os.path.dirname(_f)), exist_ok=True); shutil.copy(os.path.join(HOME, _f), os.path.join(_stage, _f))
    _names = os.path.join(OM, "privacy_names.txt")
    _r = run(PY + [os.path.join(os.path.dirname(OM), "site", "scripts", "check_privacy.py"), "--root", _stage] + (["--names", _names] if os.path.exists(_names) else []), check=False)
    if _r.returncode:
        print("FAILED: the privacy gate rejects the commit message or the changed files:\n" + _r.stdout[-1500:]); sys.exit(1)
finally:
    shutil.rmtree(_stage, ignore_errors=True)
run(["git", "add", "-A"])
if not run(["git", "config", "user.email"], check=False).stdout.strip().endswith("@users.noreply.github.com"):
    print("git has no identity. Set one first (use your GitHub noreply address): git config user.name <name>; git config user.email <id>+<user>@users.noreply.github.com"); sys.exit(1)
run(["git", "commit", "--quiet", "-m", msg])
run(["git", "push", "origin", "HEAD:main"])
page = open(os.path.join(OUT, "index.html"), "rb").read()
version = json.loads(re.search(r'id="catalogData">(.*?)</script>', page.decode("utf-8"), re.S).group(1).replace("<" + chr(92) + "/", "</"))["version"]
print("waiting for the deploy workflow to publish hub %s (up to 10 minutes)" % version)
for _ in range(30):
    r = run(PY + [os.path.join(OUT, "scripts", "check_live.py"), "--version", version, "--hub-sha", hashlib.sha256(page).hexdigest()], check=False)
    if r.returncode == 0:
        print(r.stdout.strip().splitlines()[-1]); sys.exit(0)
    time.sleep(20)
print("The push succeeded but the live site does not match yet. See the deploy run at https://github.com/shfqrkhn/shfqrkhn.github.io/actions")
sys.exit(1)
