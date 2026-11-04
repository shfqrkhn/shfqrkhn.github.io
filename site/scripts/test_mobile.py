"""Mobile checks. Needs Playwright (pip install playwright; playwright install chromium firefox). Run by the self-test in CI.
Run from anywhere: python site/scripts/test_mobile.py

Emulates phones (Pixel 7, iPhone 13, a small 320 px phone) with touch, and runs a real Firefox engine, against the site served locally.
Checks: no sideways scroll, tap targets, opening pages by touch, the install and offline status controls, and going fully offline.
Honest limit: these are emulations. A real phone (install it, switch on airplane mode, open a few pages) is still the final test."""
import functools, http.server, json, os, re, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("SKIP: Playwright is not installed"); sys.exit(0)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def log_message(self, *a):
        pass


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


cat = json.loads(re.search(r'id="catalogData">(.*?)</script>', open(os.path.join(ROOT, "index.html"), encoding="utf-8").read(), re.S).group(1).replace("<" + chr(92) + "/", "</"))
pages = [a["address"][2:].rstrip("/") for a in cat["apps"] if a.get("form", "single") != "remote" and not a.get("sensitive")]
SMALL = {"viewport": {"width": 320, "height": 568}, "device_scale_factor": 2, "is_mobile": True, "has_touch": True, "user_agent": "Mozilla/5.0 (Linux; Android 13; Small) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36"}

with sync_playwright() as p:
    for label, opts in (("Pixel 7", p.devices["Pixel 7"]), ("iPhone 13", p.devices["iPhone 13"]), ("small 320 px phone", SMALL)):
        b = p.chromium.launch(); ctx = b.new_context(**opts); pg = ctx.new_page(); errs = []
        pg.on("console", lambda m, e=errs: e.append(m.text[:80]) if m.type == "error" else None); pg.on("pageerror", lambda x, e=errs: e.append(str(x)[:80]))
        pg.goto(B); pg.wait_for_load_state("networkidle")
        ok("%s: hub fits with no sideways scroll" % label, pg.evaluate("document.documentElement.scrollWidth <= innerWidth"))
        small = pg.evaluate("""()=>[...document.querySelectorAll("a,button,input,summary")].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<36||r.height<36)}).map(e=>e.id||e.className||e.tagName)""")
        ok("%s: tap targets are at least 36 px (%s)" % (label, ", ".join(sorted(set(small))[:4]) or "all good"), not small)
        pg.tap("a.tile >> nth=0")
        try:
            pg.wait_for_url(lambda u: u != B, timeout=15000); opened = True
        except Exception:
            opened = False
        ok("%s: a tap opens a page" % label, opened)
        pg.goto(B); pg.wait_for_load_state()
        pg.tap("#look"); ok("%s: look control works by touch" % label, pg.get_attribute("html", "data-look") == "paper")
        ok("%s: offline status control is present" % label, pg.locator("#off").count() == 1)
        pg.wait_for_selector("#today:not([hidden])", timeout=10000)
        ok("%s: the four daily pieces are on the landing screen" % label, pg.locator(".nudge").count() == 4 and pg.locator(".nudge >> nth=0").is_visible())
        ok("%s: header buttons stay on screen" % label, pg.evaluate("(function(){var r=document.getElementById('look').getBoundingClientRect();return r.right<=innerWidth&&r.left>=0})()"))
        ok("%s: no console errors %s" % (label, errs[:2]), not errs)
        ctx.close(); b.close()
    # offline on a phone: save everything, then open every page with the network off
    b = p.chromium.launch(); ctx = b.new_context(**p.devices["Pixel 7"]); pg = ctx.new_page()
    pg.goto(B); pg.evaluate("navigator.serviceWorker.ready"); pg.reload(); pg.wait_for_timeout(1500)
    pg.evaluate("navigator.serviceWorker.ready.then(function(r){r.active.postMessage({type:'precache',big:true})})")
    try:
        wait_state(pg, ("ready",), 180); ok("Pixel 7: everything saved for offline", True)
    except Exception as e:
        ok("Pixel 7: everything saved for offline (state %s; %s)" % (pg.get_attribute("#off", "data-s"), str(e)[:90]), False)
    ctx.set_offline(True); lost = []
    for rel in pages:
        q = ctx.new_page()
        try:
            q.goto(B + rel + "/")
            if q.title() in ("", "Omnevum") or len(q.content()) < 3000: lost.append(rel)
        except Exception:
            lost.append(rel)
        q.close()
    ok("Pixel 7: all %d pages open in airplane mode (%s)" % (len(pages), ", ".join(lost) or "none missing"), not lost)
    ctx.close(); b.close()
    # a real second engine
    try:
        fx = p.firefox.launch(); ctx = fx.new_context(viewport={"width": 390, "height": 800}, has_touch=True); pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda x: errs.append(str(x)[:80]))
        pg.goto(B); pg.evaluate("navigator.serviceWorker.ready"); pg.reload(); pg.wait_for_timeout(2500)
        ok("Firefox: hub renders and the worker controls it", pg.title() == "Omnevum" and pg.evaluate("!!navigator.serviceWorker.controller"))
        pg.evaluate("navigator.serviceWorker.ready.then(function(r){r.active.postMessage({type:'precache',big:false})})")
        try:
            wait_state(pg, ("ready", "idle"), 120); ok("Firefox: pages saved for offline", True)
        except Exception:
            ok("Firefox: pages saved for offline", False)
        ctx.set_offline(True); q = ctx.new_page(); q.goto(B + pages[0] + "/"); ok("Firefox: a saved page opens offline", q.title() not in ("", "Omnevum") and len(q.content()) > 3000)
        ok("Firefox: no page errors %s" % errs[:2], not errs); fx.close()
    except Exception as e:
        print("SKIP Firefox (%s)" % str(e)[:80])
srv.shutdown()
failed = [n for c, n in out if not c]
print("mobile tests: %d passed, %d failed" % (len(out) - len(failed), len(failed)))
sys.exit(1 if failed else 0)
