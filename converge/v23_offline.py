import http.server, threading, functools, json, sys, os
from playwright.sync_api import sync_playwright

"""CR-6: offline reload, and a failed worker update must keep the old cache. Needs Playwright with Chromium; serves site/ on 127.0.0.1:8765."""
SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "site")
STATE = {"bad": None, "hits": 0}


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a, **k):
        pass

    def do_GET(self):  # page routes cannot intercept worker script updates, so the server swaps sw.js
        if STATE["bad"] is not None and self.path.split("?")[0] == "/sw.js":
            STATE["hits"] += 1
            body = STATE["bad"].encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


H = functools.partial(Handler, directory=SITE)
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
    online_title = pg.title()
    caches0 = pg.evaluate("caches.keys()")
    out["caches_before"] = caches0
    ctx.set_offline(True)
    pg.reload()
    out["offline_reload_title"] = pg.title()
    out["offline_reload_ok"] = bool(pg.title()) and pg.title() == online_title  # an error page would show the host, not the hub title
    ctx.set_offline(False)
    # update failure: serve a changed worker whose shell is missing a file, plus failing network for it
    src = open(SITE + "/sw.js", encoding="utf-8").read()
    bad = src.replace('const HUB = "hub-shell-v1.4.3"', 'const HUB = "hub-shell-v9.9.9"').replace('"./icon.svg"', '"./does-not-exist.svg"', 1)
    assert bad != src
    STATE["bad"] = bad
    pg.evaluate("navigator.serviceWorker.getRegistration().then(r => r.update()).catch(()=>0)")
    pg.wait_for_timeout(3000)
    keys = pg.evaluate("caches.keys()")
    out["caches_after_failed_update"] = keys
    out["bad_worker_fetched"] = STATE["hits"] > 0
    out["old_hub_cache_kept"] = any("hub-shell-v1.4.3" in k for k in keys)
    out["new_cache_entries"] = {k: pg.evaluate("k => caches.open(k).then(c => c.keys()).then(r => r.length)", k) for k in keys if "v9.9.9" in k}
    out["failed_update_cache_absent"] = all(v == 0 for v in out["new_cache_entries"].values())
    ctx.set_offline(True)
    STATE["bad"] = None
    pg.reload()
    out["offline_reload_after_failed_update"] = bool(pg.title()) and pg.title() == online_title
    b.close()
srv.shutdown()
out["pass"] = out["bad_worker_fetched"] and out["failed_update_cache_absent"] and out["offline_reload_ok"] and out["old_hub_cache_kept"] and out["offline_reload_after_failed_update"]
print(json.dumps(out, indent=1))
sys.exit(0 if out["pass"] else 1)
