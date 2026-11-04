"""Omnevum self-test: proves the framework works, and that its guards really fail when they should.
Run:  python builder/selftest.py
Checks: (1) the build is idempotent (two builds, identical output), (2) a broken registry is refused with a plain message,
(3) the privacy gate catches planted personal data, (4) the page generator renders valid pages, (5) every gate passes on the real site,
(6) the browser tests pass when Playwright is installed."""
import hashlib, json, os, shutil, subprocess, sys, tempfile
sys.dont_write_bytecode = True
OM = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, OM)
os.environ["OMNEVUM_BUILDER"] = OM
from paths import OUT
PY = [sys.executable, "-B"]
results = []


def ok(name, cond, detail=""):
    results.append((cond, name))
    print(("PASS " if cond else "FAIL ") + name + (("  " + detail) if detail and not cond else ""))


def run(args, cwd=None):
    return subprocess.run(PY + args, capture_output=True, text=True, cwd=cwd)


def tree_hash(root):
    h = hashlib.sha256()
    for dp, dn, fn in os.walk(root):
        dn[:] = sorted(d for d in dn if d not in (".git", "__pycache__"))
        for f in sorted(fn):
            p = os.path.join(dp, f)
            if os.path.relpath(p, root).replace(os.sep, "/") == "docs/FRAMEWORK.md":
                continue  # a generated copy of the framework note; it carries a date that moves with the calendar
            h.update(os.path.relpath(p, root).encode()); h.update(open(p, "rb").read())
    return h.hexdigest()


# 1. idempotent build
r1 = run([os.path.join(OM, "build.py")]); t1 = tree_hash(OUT)
r2 = run([os.path.join(OM, "build.py")]); t2 = tree_hash(OUT)
ok("build succeeds twice", r1.returncode == 0 and r2.returncode == 0, (r1.stdout + r2.stdout)[-300:])
ok("build is idempotent (identical output)", t1 == t2)

# 1b. archive and restore round trip: a page moves to the Archive section and back, leaving everything identical
regp = os.path.join(OM, "registry.json"); reg_before = open(regp, "rb").read()
try:
    _ct = next(x["title"] for x in json.load(open(regp, encoding="utf-8"))["pages"] if x["id"] == "codex-ludus")  # the page's current name
    r = run([os.path.join(OM, "archive.py"), "archive", "codex-ludus"])
    page = open(os.path.join(OUT, "index.html"), encoding="utf-8").read(); arch = page[page.index('data-s="archive"'):]
    ok("archive moves a page into the Archive section", r.returncode == 0 and _ct in arch[:arch.index("</details>")], r.stdout[-200:])
    r = run([os.path.join(OM, "archive.py"), "archive", "codex-ludus"])
    ok("archiving twice changes nothing", "nothing to do" in r.stdout)
    r = run([os.path.join(OM, "archive.py"), "restore", "Codex Ludus"])  # an earlier name still finds the page (former_names)
    ok("restore returns it, output identical to before", r.returncode == 0 and tree_hash(OUT) == t2 and open(regp, "rb").read() == reg_before, r.stdout[-200:])
    r = run([os.path.join(OM, "archive.py"), "restore", "no-such-page"])
    ok("an unknown name is refused and changes nothing", r.returncode != 0 and open(regp, "rb").read() == reg_before)
finally:
    if open(regp, "rb").read() != reg_before:
        open(regp, "wb").write(reg_before); run([os.path.join(OM, "build.py")])

# 1c. renaming is safe: the name changes in visible text and safe attributes only, never in scripts, styles or identifiers
sys.path.insert(0, OM)
import rename as _rn
sample = ('<!doctype html><html><head><title>Old Name</title><meta name="description" content="Old Name helps you"><meta name="viewport" content="Old Name">'
          '<style>.Old-Name{color:red}</style></head><body><h1 aria-label="Old Name home">Old Name</h1><p>Welcome to Old Name.</p>'
          '<script>localStorage.setItem("Old Name_v1","x");var t="Old Name";</script></body></html>')
out_html, n_changed, n_left = _rn.rename_html(sample, ["Old Name"], "New Name")
ok("rename: title, headings, text and aria-labels change", "<title>New Name</title>" in out_html and "<h1 aria-label=\"New Name home\">New Name</h1>" in out_html and "Welcome to New Name." in out_html)
ok("rename: scripts and styles are never touched, and are reported", 'setItem("Old Name_v1"' in out_html and ".Old-Name{color:red}" in out_html and n_left == 2)
ok("rename: only safe meta tags change", 'name="description" content="New Name helps you"' in out_html and 'name="viewport" content="Old Name"' in out_html)
again, n2, _l = _rn.rename_html(out_html, ["Old Name"], "New Name")
ok("rename is repeatable (a second run changes nothing)", again == out_html and n2 == 0)

# 2. a broken registry is refused, before anything is written
tmp = tempfile.mkdtemp()
try:
    for f in ("build.py", "paths.py", "icons.json", "topics.json", "today_data.json", "privacy_names.txt", "sw.template.js"):
        if os.path.exists(os.path.join(OM, f)):  # privacy_names.txt is local only and absent in CI
            shutil.copy(os.path.join(OM, f), tmp)
    for d in ("icons", "pwa-icons"):
        shutil.copytree(os.path.join(OM, d), os.path.join(tmp, d))
    reg = json.load(open(os.path.join(OM, "registry.json"), encoding="utf-8"))
    reg["pages"][0]["blurb"] = "word " * 30; reg["pages"][1]["kind"] = "nonsense"; reg["pages"][2]["slug"] = reg["pages"][3]["slug"]; reg["pages"][2]["kind"] = reg["pages"][3]["kind"]
    json.dump(reg, open(os.path.join(tmp, "registry.json"), "w", encoding="utf-8"))
    before = tree_hash(OUT)
    r = run([os.path.join(tmp, "build.py")])
    ok("broken registry is refused with plain messages", r.returncode != 0 and "blurb is 30 words" in r.stdout and "kind must be one of" in r.stdout and "used twice" in r.stdout, r.stdout[-300:])
    ok("a refused build changes nothing", tree_hash(OUT) == before)
finally:
    shutil.rmtree(tmp, ignore_errors=True)

# 2b. the other forms: a bundle with WebAssembly and a remote (full stack) page build, verify and clean up
tmp = tempfile.mkdtemp(); bund = tempfile.mkdtemp()
try:
    os.makedirs(os.path.join(bund, "pkg"))
    open(os.path.join(bund, "index.html"), "w", encoding="utf-8").write(
        '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Wasm test</title></head>'
        '<body><a href="../../" aria-label="Omnevum home">home</a><p>test</p></body></html>')
    open(os.path.join(bund, "pkg", "m.wasm"), "wb").write(bytes([0, 97, 115, 109, 1, 0, 0, 0]))
    for f in ("build.py", "paths.py", "icons.json", "topics.json", "today_data.json", "privacy_names.txt", "sw.template.js"):
        if os.path.exists(os.path.join(OM, f)):  # privacy_names.txt is local only and absent in CI
            shutil.copy(os.path.join(OM, f), tmp)
    for d in ("icons", "pwa-icons"):
        shutil.copytree(os.path.join(OM, d), os.path.join(tmp, d))
    reg = json.load(open(os.path.join(OM, "registry.json"), encoding="utf-8"))
    base = dict(topic="ai", blurb="Test page.", tagline="Test page", keywords="test", icon="ts-dash", lazy=True)
    reg["pages"].append(dict(base, id="zz-wasm", title="Wasm test", kind="tools", slug="zzwasm", form="bundle", source=bund, version="1.0.0", wasm=True, pwa=True))
    reg["pages"].append(dict(base, id="zz-remote", title="Remote test", kind="apps", slug="zzremote", form="remote", url="https://example.org/app/", host="example.org", license="AGPL-3.0-only"))
    json.dump(reg, open(os.path.join(tmp, "registry.json"), "w", encoding="utf-8"))
    r = run([os.path.join(tmp, "build.py")])
    wasm_ok = os.path.isfile(os.path.join(OUT, "tools", "zzwasm", "pkg", "m.wasm"))
    ok("bundle with WebAssembly builds and verifies", r.returncode == 0 and wasm_ok and "1 remote" in r.stdout.replace("(1 remote)", "1 remote"), (r.stdout + r.stderr)[-400:])
    ok("remote page is listed, not copied", not os.path.exists(os.path.join(OUT, "apps", "zzremote")) and 'href="https://example.org/app/"' in open(os.path.join(OUT, "index.html"), encoding="utf-8").read())
    ok("own-PWA bundle stays out of the hub worker", "zzwasm" not in open(os.path.join(OUT, "sw.js"), encoding="utf-8").read())
finally:
    shutil.rmtree(tmp, ignore_errors=True); shutil.rmtree(bund, ignore_errors=True)
    run([os.path.join(OM, "build.py")])  # restore the real site

# 3. the privacy gate catches planted personal data (and lets the allowed things through)
tmp = tempfile.mkdtemp()
try:
    _nf, names = tempfile.mkstemp(suffix=".txt"); os.close(_nf); open(names, "w", encoding="utf-8").write("Zed\n")  # a made-up name stands in for the private list, kept outside the scanned folder
    open(os.path.join(tmp, "a.html"), "w", encoding="utf-8").write(
        "<p>Mail jane.doe@gmail.com or call 613-555-0142 at 12 Maple Street. Designed by Jane Teamsworth. C:\\Users\\jane\\x. Hello Zed.</p>")
    r = run([os.path.join(OUT, "scripts", "check_privacy.py"), "--root", tmp, "--names", names])
    kinds = ("email", "phone", "street", "credit-line", "local-path", "owner-name")
    ok("privacy gate catches planted PII", r.returncode != 0 and all(k + ":" in r.stdout for k in kinds), r.stdout[-300:])
    open(os.path.join(tmp, "a.html"), "w", encoding="utf-8").write(
        '<p>"The unexamined life is not worth living." Socrates. name@example.com. shfqrkhn.github.io. Asia/Khandyga. Epic Games.</p>')
    r = run([os.path.join(OUT, "scripts", "check_privacy.py"), "--root", tmp, "--names", names])
    ok("privacy gate allows quotes, the site address and neutral text", r.returncode == 0, r.stdout[-300:])
finally:
    shutil.rmtree(tmp, ignore_errors=True)
    os.remove(names)

# 4. the page generator renders a valid page from data
sys.path.insert(0, os.path.join(OUT, "scripts"))
import build_pages
sample = dict(title="Sample recipe", kind="recipes", slug="sample", topic="food", blurb="A sample page used by the self-test.", blocks=[
    dict(type="list", title="Ingredients", check=True, items=["Item A", "Item B"]), dict(type="steps", title="Steps", items=["Do one", "Do two"]),
    dict(type="table", title="Notes", head=["Item", "Amount"], rows=[["A", "1"]]), dict(type="text", text="Plain note.")])
page = build_pages.render(build_pages.validate(dict(sample), "selftest"))
ok("generator renders a page with checks, steps, table", b'class="steps"' in page and b'type="checkbox"' in page and b"<table>" in page and b'href="../../"' in page)
try:
    build_pages.validate(dict(sample, kind="bogus"), "selftest"); bad = False
except ValueError:
    bad = True
ok("generator refuses bad data", bad)

# 5. every gate on the real site
for chk in ("check_privacy.py", "check_docs.py", "check_pages.py", "check_pwa.py", "check_kit.py", "check_site.py"):
    r = run([os.path.join(OUT, "scripts", chk)], cwd=OUT)
    ok(chk + " passes on the site", r.returncode == 0, r.stdout[-300:])
_conv = os.path.join(os.path.dirname(OM), "converge")
if os.path.isdir(_conv):  # the converge scripts must flag their own planted defects (Omni 8.7 step 1)
    _c = [run([os.path.join(_conv, "omni_check.py"), "--control"]), run([os.path.join(_conv, "scan.py"), "--control"])]
    ok("converge scripts flag their planted defects", all(x.returncode == 0 for x in _c), " | ".join(x.stdout[-120:] for x in _c))

# 6. browser tests (optional)
try:
    import playwright  # noqa: F401
    r = run([os.path.join(OUT, "scripts", "test_browser.py")], cwd=OUT)
    ok("browser tests pass", r.returncode == 0, r.stdout[-600:])
    r = run([os.path.join(OUT, "scripts", "test_personalize.py")], cwd=OUT)
    ok("personalization tests pass", r.returncode == 0, r.stdout[-600:])
except ImportError:
    print("SKIP browser tests (Playwright is not installed)")

bad = [n for c, n in results if not c]
print("\nself-test: %d passed, %d failed" % (len(results) - len(bad), len(bad)))
sys.exit(1 if bad else 0)
