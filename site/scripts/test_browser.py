"""Browser tests for the site. Needs Playwright (pip install playwright; playwright install chromium). Run by the self-test in CI.
Run from anywhere: python site/scripts/test_browser.py
Serves the repo locally the way GitHub Pages does (including the 404 page) and checks the hub, every group page, every page, the home links,
old-address forwarding and offline use."""
import functools, http.server, json, os, re, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("SKIP: Playwright is not installed")
    sys.exit(0)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def log_message(self, *a):
        pass

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            self.send_response(404); self.send_header("Content-Type", "text/html"); self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
        else:
            super().send_error(code, message, explain)


srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
B = "http://localhost:%d/" % srv.server_address[1]
out = []


def wait_state(pg, states, seconds):
    """Poll the offline status button from outside the page (the hub's strict CSP blocks string evaluation)."""
    import time
    end = time.time() + seconds
    while time.time() < end:
        if pg.get_attribute("#off", "data-s") in states:
            return True
        time.sleep(0.5)
    raise TimeoutError("offline status stayed %s" % pg.get_attribute("#off", "data-s"))


def ok(name, cond):
    out.append((cond, name)); print(("PASS " if cond else "FAIL ") + name)


cat = json.loads(re.search(r'id="catalogData">(.*?)</script>', open(os.path.join(ROOT, "index.html"), encoding="utf-8").read(), re.S).group(1).replace("<\\/", "</"))
pages = [(a["kind"], a["address"][2:].rstrip("/"), a["address"].split("/")[-2]) for a in cat["apps"] if not a["sensitive"]]
kinds = sorted({k for k, _, _ in pages})
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={"width": 390, "height": 800}); pg = ctx.new_page(); errs = []
    pg.on("console", lambda m: errs.append(m.text[:90]) if m.type == "error" and "404" not in m.text else None); pg.on("pageerror", lambda e: errs.append(str(e)[:90]))
    pg.goto(B); pg.wait_for_load_state("networkidle")
    ok("hub: title, pronunciation, no horizontal scroll", pg.title() == "Omnevum" and "VEE" in pg.text_content(".say") and pg.evaluate("document.documentElement.scrollWidth <= innerWidth"))
    pg.wait_for_selector("#today:not([hidden])", timeout=10000)
    ok("hub: one tile per page, no search box and no filter chips", pg.locator("a.tile").count() == len(pages) and pg.locator("#q, .kinds, .find").count() == 0)
    nudges = pg.locator(".nudge")
    ok("hub: all four daily pieces are visible on landing, each with text", nudges.count() == 4 and all(nudges.nth(n).is_visible() and len(nudges.nth(n).inner_text().strip()) > 10 for n in range(4)))
    box = nudges.nth(3).bounding_box()
    ok("hub: the fourth piece starts within the first two screens of a phone", box is not None and box["y"] < 1600)
    ok("hub: the pronunciation stays on one line", pg.evaluate("(function(){var r=document.querySelector('.say').getBoundingClientRect();return r.height<44})()"))
    clip = pg.evaluate("""(function(){var bad=[];document.querySelectorAll('.tile,.ib,summary').forEach(function(el){var p=el.parentElement;while(p&&p!==document.body){var c=getComputedStyle(p);if(/paint|strict|content/.test(c.contain)||c.contentVisibility==='auto'||(c.overflowX!=='visible'&&p.tagName!=='MAIN')||(c.overflowY!=='visible'&&p.tagName!=='MAIN')){bad.push((el.id||el.className)+' inside '+(p.id||p.className||p.tagName));break}p=p.parentElement}});return bad.slice(0,3)})()""")
    ok("hub: no focus or selection outline can be clipped %s" % clip, not clip)
    pg.click("#look"); ok("hub: look control cycles", pg.get_attribute("html", "data-look") == "paper")
    for k in kinds:
        pg.goto(B + k + "/"); n = pg.locator("a.tile").count()
        ok("group %s lists %d" % (k, n), n == sum(1 for x, _, _ in pages if x == k) and pg.get_attribute("a.ib", "href") == "../")
    bad = []
    for k, rel, slug in pages:
        q = ctx.new_page(); e = []
        q.on("console", lambda m, e=e: e.append(m.text[:80]) if m.type == "error" else None); q.on("pageerror", lambda x, e=e: e.append(str(x)[:80]))
        r = q.goto(B + rel + "/"); q.wait_for_timeout(500)
        if r.status != 200 or e or q.locator('a[href="../../"]').count() < 1: bad.append(rel)
        q.close()
    ok("every page: 200, no errors, home link (%s)" % (", ".join(bad) or "all good"), not bad)
    k, rel, slug = pages[0]
    pg.goto(B + rel + "/"); pg.locator('a[href="../../"]').first.click(); pg.wait_for_load_state()
    ok("home link lands on the hub", pg.url == B)
    pg.goto(B + slug + "/"); pg.wait_for_url(B + rel + "/", timeout=5000); ok("old flat address forwards", True)
    fwd = json.loads(re.search(r"var m=(\{.*?\}),s=", open(os.path.join(ROOT, "404.html"), encoding="utf-8").read(), re.S).group(1))
    olds = [(k, v) for k, v in fwd.items() if "/" in k and k != v][:3]
    for k, v in olds:
        pg.goto(B + k + "/"); pg.wait_for_url(B + v + "/", timeout=5000)
    ok("%d renamed addresses forward to the new ones" % len(olds), True)
    pg.goto(B + "no-such-page-xyz/"); ok("unknown address shows the 404 page", pg.locator('a[href="/"]').count() == 1)
    pg.goto(B); pg.evaluate("navigator.serviceWorker.ready"); pg.reload(); pg.wait_for_timeout(1500)
    ok("offline worker controls the page", pg.evaluate("!!navigator.serviceWorker.controller"))
    pg.evaluate("navigator.serviceWorker.ready.then(function(r){r.active.postMessage({type:'precache',big:true})})")
    try:
        wait_state(pg, ("ready",), 180)
        ok("every page is saved for offline", True)
    except Exception:
        ok("every page is saved for offline (state: %s)" % pg.get_attribute("#off", "data-s"), False)
    ctx.set_offline(True)
    pg.goto(B); ok("hub works offline", pg.title() == "Omnevum")
    pg.goto(B + kinds[0] + "/"); ok("group page works offline", pg.locator("a.tile").count() >= 1)
    lost = []
    for k, rel, slug in pages:
        q = ctx.new_page()
        try:
            q.goto(B + rel + "/")
            if q.title() in ("", "Omnevum") or len(q.content()) < 3000: lost.append(rel)
        except Exception:
            lost.append(rel)
        q.close()
    ok("all %d pages open offline (%s)" % (len(pages), ", ".join(lost) or "none missing"), not lost)
    ok("offline status shows offline", (pg.goto(B), pg.get_attribute("#off", "data-s"))[1] == "out")
    ctx.set_offline(False)
    mf = json.loads(open(os.path.join(ROOT, "manifest.webmanifest"), encoding="utf-8").read())
    ok("manifest: name, standalone, 192 and 512 icons, maskable, shortcuts", mf["display"] == "standalone" and {"192x192", "512x512"} <= {i["sizes"] for i in mf["icons"]} and any(i["purpose"] == "maskable" for i in mf["icons"]) and len(mf["shortcuts"]) >= 1)
    try:
        cdp = ctx.new_cdp_session(pg); pg.goto(B); errs_inst = cdp.send("Page.getInstallabilityErrors").get("installabilityErrors", [])
        ok("browser reports no install problems %s" % [e["errorId"] for e in errs_inst][:3], not errs_inst)
    except Exception as e:
        print("SKIP installability check (%s)" % str(e)[:60])
    ctx.set_offline(True)
    ok("no console errors %s" % errs[:2], not errs)
    b.close()
srv.shutdown()
failed = [n for c, n in out if not c]
print("browser tests: %d passed, %d failed" % (len(out) - len(failed), len(failed)))
sys.exit(1 if failed else 0)
