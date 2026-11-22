"""Behaviour test for the NestEggNinja retirement planner.

usage: python behave.py <serve_dir> <page_path> <out.json> [--host]
  standalone: page_path is the planner page itself.
  --host: page_path is PennyPlanner; the planner is opened in its blob frame.
Records, for five scenarios, the visible text of the planner, the year-table
CSV, the plan file and a seeded stress-test result. Also checks that a plan
saved by one page is restored by another on the same origin (--saved-by).
"""
import sys, re, json, http.server, threading, functools
from playwright.sync_api import sync_playwright

args = [a for a in sys.argv[1:] if not a.startswith("--")]
HOST = "--host" in sys.argv
SAVED_BY = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--saved-by=")), None)
D, PAGE, OUT = args[0], args[1], args[2]

class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(H, directory=D))
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = "http://127.0.0.1:%d/" % srv.server_address[1]

def norm(t):
    t = re.sub(r"Saved on this device \([^)]*\)", "Saved on this device (T)", t)
    t = re.sub(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?", "TS", t)
    return t

problems = []

def open_planner(pg, page_path):
    pg.goto(BASE + page_path)
    if HOST:
        pg.locator("nav").get_by_text("Planning").last.click()
        pg.get_by_role("tab", name="Retirement").click()
        pg.get_by_role("button", name="Open the full retirement planner").click()
        pg.wait_for_selector("#ff-retire-frame:not([hidden])", timeout=15000)
        fr = pg.frame_locator("#ff-retire-frame")
        root = fr.locator("body")
        root.get_by_text("Annual savings").first.wait_for(timeout=20000)
        frame = next(f for f in pg.frames if f.url.startswith("blob:"))
    else:
        frame = pg.main_frame
        pg.wait_for_selector("text=Annual savings", timeout=20000)
    b = frame.get_by_role("button", name="Open the planner")
    if b.count():
        b.click()
    frame.wait_for_timeout(400)
    return frame

def fill(f, label, value):
    el = f.get_by_label(label, exact=True)
    if label in ("Current age", "Retirement age"):
        sec = f.locator("button[aria-expanded=false]", has_text="Ages")
        if sec.count(): sec.first.click(); f.wait_for_timeout(1000)
    el.scroll_into_view_if_needed(); el.click(); el.press("Control+a"); el.type(str(value)); el.press("Tab"); f.wait_for_timeout(250)
    got = re.sub(r"[^0-9]", "", el.input_value())
    assert got == str(value), (label, value, el.input_value())

def slider(f, name, key, presses=0):
    th = f.get_by_role("slider", name=name)
    th.focus(); th.press(key)
    for _ in range(presses):
        th.press("ArrowRight")
    f.wait_for_timeout(200)

def capture(pg, f):
    f.wait_for_timeout(1500)
    out = {}
    out["text"] = norm(f.evaluate("() => document.body.innerText"))
    with pg.expect_download() as d:
        f.get_by_role("button", name="Download year table").first.click()
    out["year_table"] = norm(open(d.value.path(), encoding="utf-8").read())
    with pg.expect_download() as d:
        f.locator("#nf-save").click()
    out["plan_file"] = norm(open(d.value.path(), encoding="utf-8").read())
    f.locator("#nx-seed").fill("12345"); f.locator("#nx-paths").fill("500")
    f.locator("#nx-run").click(); f.wait_for_timeout(2500)
    out["stress"] = norm(f.locator("#nx-out").inner_text())
    return out

SCEN = {
    "default": lambda f: None,
    "early_retirement": lambda f: fill(f, "Retirement age", 45),
    "high_spending": lambda f: slider(f, "Retirement spending", "Home", 140),  # 20,000 + 140*500 = 90,000
    "zero_savings": lambda f: ([fill(f, k, 0) for k in ("RRSP", "TFSA", "Non-registered or corporate")],
                               slider(f, "Annual savings", "Home")),
}

def saved_plan_edit(f):
    fill(f, "Current age", 40); fill(f, "Annual income", 120000); fill(f, "RRSP", 210000)
    slider(f, "Retirement spending", "Home", 100)  # 70,000

res = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for vw in (390,):
        for name, act in SCEN.items():
            ctx = b.new_context(bypass_csp=not HOST, viewport={"width": vw, "height": 900}, accept_downloads=True)
            pg = ctx.new_page(); errs = []
            pg.on("console", lambda m, e=errs: e.append(m.type + ": " + m.text[:200]) if m.type == "error" else None)
            pg.on("pageerror", lambda x, e=errs: e.append("pageerror " + str(x)[:200]))
            f = open_planner(pg, PAGE); act(f)
            res[name] = capture(pg, f); res[name]["errors"] = errs
            if errs: problems.append((name, errs))
            ctx.close()
    # saved-plan reload: edit in page A (SAVED_BY or the page itself), reload page B, capture
    ctx = b.new_context(bypass_csp=not HOST, viewport={"width": 390, "height": 900}, accept_downloads=True)
    pg = ctx.new_page(); errs = []
    pg.on("pageerror", lambda x: errs.append("pageerror " + str(x)[:200]))
    f = open_planner(pg, SAVED_BY or PAGE); saved_plan_edit(f); f.wait_for_timeout(2500)
    f = open_planner(pg, PAGE)
    res["saved_plan_reload"] = capture(pg, f); res["saved_plan_reload"]["errors"] = errs
    res["saved_plan_reload"]["status"] = f.locator("[aria-live=polite]").all_inner_texts()
    ctx.close(); b.close()
srv.shutdown()
json.dump(res, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
for k, v in res.items():
    m = re.search(r"Independence year[^\n]*\n?[^\n]*", v["text"])
    print(k, "|", (m.group(0) if m else "?").replace("\n", " "), "| csv", len(v["year_table"]), "| errs", len(v["errors"]))
print("PROBLEMS", problems)
