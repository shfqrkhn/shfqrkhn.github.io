"""Personalization test. Needs Playwright (optional; CI does not run it). Run from the repo root: python scripts/test_personalize.py
Sets an accent colour and a text size in the hub's Personalize dialog, then checks that every single-file page takes both, raises no
console error (the page policies allow the shared script), keeps them when a page saves its own look, and returns to its own
look after Reset."""
import functools, http.server, json, os, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("SKIP: Playwright is not installed")
    sys.exit(0)

sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
start = sw.index("const PAGES = ") + len("const PAGES = ")
PAGES = json.loads(sw[start:sw.index(";" + chr(10) + "const KEEP", start)])
singles = [k for k, v in PAGES.items() if "files" not in v]

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
handler.log_message = lambda *a, **k: None
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = "http://127.0.0.1:%d/" % srv.server_address[1]
out = []


def check(name, ok, info=""):
    out.append(bool(ok))
    print(("PASS " if ok else "FAIL ") + name + ("" if ok or not info else "  " + str(info)))


with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    pg = ctx.new_page(); errs = []
    pg.on("console", lambda m: errs.append(m.text[:120]) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errs.append("JS " + str(e)[:120]))
    pg.goto(base); pg.wait_for_timeout(800)
    check("hub has a Personalize button", pg.locator("#pz").count() == 1)
    pg.click("#pz"); pg.wait_for_timeout(200)
    check("dialog opens", pg.evaluate('document.getElementById("pzd").open'))
    pg.check("input[name=hm][value=one]"); pg.fill("#pzh", "10"); pg.check('input[name=sz][value="130"]')
    prefs = json.loads(pg.evaluate('localStorage.getItem("hub.prefs.v1")'))
    check("choices are saved", prefs.get("hue") == 10 and prefs.get("size") == 130 and prefs.get("look"), prefs)
    check("hub text size applies", pg.evaluate("document.documentElement.style.fontSize") == "130%")
    pg.click("#pzx")
    check("hub raises no console error", not errs, errs)
    bad = []
    for d in singles:
        q = ctx.new_page(); e2 = []
        q.on("console", lambda m, e=e2: e.append(m.text[:100]) if m.type == "error" else None)
        q.on("pageerror", lambda x, e=e2: e.append("JS " + str(x)[:100]))
        q.goto(base + d + "/"); q.wait_for_timeout(500)
        hue = q.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--hue").trim()')
        fs = q.evaluate("document.documentElement.style.fontSize")
        if hue != "10" or fs != "130%" or e2:
            bad.append((d, hue, fs, e2[:2]))
        q.close()
    check("every single-file page (%d) takes the hue and size without errors" % len(singles), not bad, bad)
    q = ctx.new_page(); q.goto(base + singles[0] + "/"); q.wait_for_timeout(500)
    q.evaluate('localStorage.setItem("hub.prefs.v1", JSON.stringify({schemaVersion:1, look:"black"}))')
    after = json.loads(q.evaluate('localStorage.getItem("hub.prefs.v1")'))
    check("a page saving its own look keeps hue and size", after.get("hue") == 10 and after.get("size") == 130 and after.get("look") == "black", after)
    pg.click("#pz"); pg.click("#pzr"); pg.click("#pzx")
    q.reload(); q.wait_for_timeout(500)
    check("Reset returns the page to its own size", q.evaluate("document.documentElement.style.fontSize") == "")
    b.close()
srv.shutdown()
print("personalize tests: %d passed, %d failed" % (sum(out), len(out) - sum(out)))
sys.exit(0 if all(out) else 1)
