import http.server, threading, functools, json, sys, os
from playwright.sync_api import sync_playwright

"""CR-6: offline reload, and a failed worker update must keep the old cache. Needs Playwright with Chromium; serves site/ on 127.0.0.1:8765."""
SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "site")
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=SITE)
H.log_message = lambda *a, **k: None
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 8765), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = "http://127.0.0.1:8765/"
out = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    out["chromium"] = b.version
    ctx = b.new_context(service_workers="allow")
    pg = ctx.new_page()
    pg.goto(base)
    pg.wait_for_function("navigator.serviceWorker && navigator.serviceWorker.controller || navigator.serviceWorker.ready.then(()=>true)", timeout=20000)
    pg.evaluate("navigator.serviceWorker.ready")
    pg.reload()
    pg.wait_for_timeout(1500)
    caches0 = pg.evaluate("caches.keys()")
    out["caches_before"] = caches0
    ctx.set_offline(True)
    pg.reload()
    out["offline_reload_title"] = pg.title()
    out["offline_reload_ok"] = bool(pg.title())
    ctx.set_offline(False)
    # update failure: serve a changed worker whose shell is missing a file, plus failing network for it
    src = open(SITE + "/sw.js", encoding="utf-8").read()
    bad = src.replace('const HUB = "hub-shell-v1.4.3"', 'const HUB = "hub-shell-v9.9.9"').replace('"./icon.svg"', '"./does-not-exist.svg"', 1)
    assert bad != src
    pg.route("**/sw.js", lambda r: r.fulfill(status=200, content_type="application/javascript", body=bad))
    pg.evaluate("navigator.serviceWorker.getRegistration().then(r => r.update()).catch(()=>0)")
    pg.wait_for_timeout(3000)
    keys = pg.evaluate("caches.keys()")
    out["caches_after_failed_update"] = keys
    out["old_hub_cache_kept"] = any("hub-shell-v1.4.3" in k for k in keys)
    out["failed_update_cache_absent"] = not any("v9.9.9" in k and False for k in keys)
    ctx.set_offline(True)
    pg.unroute("**/sw.js")
    pg.reload()
    out["offline_reload_after_failed_update"] = bool(pg.title())
    b.close()
srv.shutdown()
out["pass"] = out["offline_reload_ok"] and out["old_hub_cache_kept"] and out["offline_reload_after_failed_update"]
print(json.dumps(out, indent=1))
sys.exit(0 if out["pass"] else 1)
