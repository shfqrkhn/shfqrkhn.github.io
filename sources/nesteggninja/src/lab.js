(function () {
  "use strict";
  var host = document.getElementById("nf-lab-body");
  if (!host) return;
  var KEY = "nfire_lab";
  var DEF = { seed: 12345, paths: 1000, sd: 12, rule: "plan", rate: 3.5, cpp: 65, oas: 65, rrif: false, rrifAge: 72, dollars: "real", view: "chart" };
  var lab = Object.assign({}, DEF);
  var last = null, worker = null, runId = 0, staleNote = ""; var lastMode = "";
  var RULES = {
    plan: ["Plan spending", "Spend the yearly amount from the planner above, less CPP, OAS and any pension, plus the income tax on them. This is what the planner above does."],
    fixedPct: ["Fixed percent of savings", "Each year draw the chosen percent of the opening balance, so the draw rises and falls with your savings. This is the app's own definition; no single published rule was verified for it."],
    inflAdj: ["Inflation-adjusted percent", "Draw the chosen percent of savings in the first retirement year, then raise that dollar amount with inflation each year (flat in today's dollars). Rule from Bengen, Journal of Financial Planning, 1994."],
    guardrails: ["Guardrails", "Start at the chosen percent. Each year freeze the inflation increase after a negative year when the draw rate is above its start; cut the draw 10% if the draw rate rises more than 20% above its start (not in the last 15 years); raise it 10% if it falls more than 20% below. Rules from Guyton and Klinger, Journal of Financial Planning, March 2006."]
  };

  try { var sv = JSON.parse(localStorage.getItem(KEY) || "null"); if (sv && typeof sv === "object") lab = sanitize(Object.assign({}, DEF, sv)); } catch (e) { }

  function sanitize(l) {
    function n(v, lo, hi, d) { v = Number(v); if (!isFinite(v)) return d; return Math.min(hi, Math.max(lo, v)); }
    l.seed = Math.floor(n(l.seed, 0, 4294967295, DEF.seed));
    l.paths = Math.floor(n(l.paths, 100, 5000, DEF.paths));
    l.sd = n(l.sd, 0, 60, DEF.sd);
    l.rate = n(l.rate, 0.5, 15, DEF.rate);
    l.cpp = Math.floor(n(l.cpp, 60, 70, 65));
    l.oas = Math.floor(n(l.oas, 65, 70, 65));
    l.rrifAge = Math.floor(n(l.rrifAge, 65, 95, 72));
    l.rrif = !!l.rrif;
    if (!RULES[l.rule]) l.rule = "plan";
    if (l.dollars !== "nominal") l.dollars = "real";
    if (l.view !== "table") l.view = "chart";
    return l;
  }
  function saveMsg(t) { var m = document.getElementById("nx-savemsg"); if (m) m.textContent = t; }
  // Read the stored settings fresh. A corrupt value is kept under a backup key before anything overwrites it.
  function readStored() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { return null; }
    if (raw === null) return null;
    try { var v = JSON.parse(raw); if (v && typeof v === "object" && !Array.isArray(v)) return v; } catch (e) { }
    try { localStorage.setItem(KEY + "_backup_" + Date.now(), raw); } catch (e2) { }
    return null;
  }
  // Merge field by field: stored values from other tabs are kept, only the keys this tab changed (keys) win.
  function save(keys) {
    try {
      var m = Object.assign({}, DEF, readStored() || {});
      (keys || []).forEach(function (k) { if (k in lab) m[k] = lab[k]; });
      lab = sanitize(m);
      localStorage.setItem(KEY, JSON.stringify(lab));
      saveMsg("");
    } catch (e) { saveMsg("Not saved: this browser refused to store the stress settings. They apply to this tab only until the page closes."); }
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function grp(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function usd(c) { var d = Math.round(c / 100); return (d < 0 ? "-$" : "$") + grp(Math.abs(d)); }
  function short(c) { var d = c / 100; if (d >= 1e6) return "$" + (d / 1e6).toFixed(1) + "M"; if (d >= 1e3) return "$" + Math.round(d / 1e3) + "k"; return "$" + Math.round(d); }

  function profile() { var s = window.__nfStore; return s ? s.getState().profile : null; }
  function paramsFrom(p) {
    var c = function (v) { return Math.round((Number(v) || 0) * 100); };
    var a = p.assumptions || {}, pen = p.pension || {};
    var age = Math.floor(Number(p.age) || 18);
    return {
      age: age, retireAge: Math.floor(Number(p.target_retirement_age) || 55), endAge: Math.max(Math.floor(Number(a.lifespan) || 95), age + 1),
      province: p.province, incomeCents: c(p.annual_income), spendCents: c(p.annual_spend), savingsCents: Math.min(c(p.annual_savings), c(p.annual_income)),
      rrspCents: c(p.assets.rrsp), tfsaCents: c(p.assets.tfsa), nonRegCents: c(p.assets.non_reg),
      growthPpm: Math.round((Number(a.growthRate) || 0) * 1e6), taxDragPpm: Math.round((Number(a.taxDrag) || 0) * 1e6),
      inflPpm: Math.round((Number(a.inflationRate) || 0.02) * 1e6),
      cppCents: c(a.cppAmount), oasCents: c(a.oasAmount), cppStartAge: lab.cpp, oasStartAge: lab.oas,
      pension: { enabled: !!pen.enabled, mode: pen.mode, startAge: Math.floor(Number(pen.startAge) || 60), isIndexed: !!pen.isIndexed,
        annualCents: c(pen.annualAmount), bridgeCents: c(pen.bridgeAmount), careerStartAge: Math.floor(Number(pen.careerStartAge) || 20),
        accrualE4: Math.round((Number(pen.accrualRate) || 0.02) * 1e4), bestAvgCents: c(pen.bestAverageEarnings), bridgeEnabled: !!pen.bridgeEnabled },
      strategy: { kind: lab.rule, ratePpm: Math.round(lab.rate * 1e4) },
      rrif: { on: lab.rrif, startAge: lab.rrifAge }, sdPpm: Math.round(lab.sd * 1e4), seed: lab.seed, paths: lab.paths
    };
  }

  function runInWorker(P, done, fail) {
    var id = ++runId;
    function main() {
      try { var r = nfCore(NF_DATA).simulate(P); lastMode = "main thread"; if (id === runId) done(r); } catch (e) { if (id === runId) fail(e); }
    }
    try {
      var src = "var nfCore=" + nfCore.toString() + ";onmessage=function(e){try{var C=nfCore(e.data.data);postMessage({ok:1,r:C.simulate(e.data.params)})}catch(x){postMessage({ok:0,m:String(x&&x.message||x)})}}";
      var url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      if (worker) worker.terminate();
      worker = new Worker(url);
      worker.onmessage = function (e) { URL.revokeObjectURL(url); lastMode = "worker"; if (id !== runId) return; if (e.data.ok) done(e.data.r); else fail(new Error(e.data.m)); };
      worker.onerror = function () { URL.revokeObjectURL(url); worker = null; setTimeout(main, 0); };
      worker.postMessage({ data: NF_DATA, params: P });
    } catch (e) { worker = null; setTimeout(main, 0); }
  }

  function field(id, label, input, hint) {
    return '<div class="nx-f"><label for="' + id + '" class="nx-l">' + label + "</label>" + input + (hint ? '<p class="nx-h" id="' + id + '-h">' + hint + "</p>" : "") + "</div>";
  }
  function numText(t) {
    var x = String(t).replace(/\s/g, "");
    if (/^[+-]?[1-9]\d{0,2}(,\d{3})+(\.\d+)?$/.test(x)) x = x.replace(/,/g, "");
    else if (/^[+-]?\d*,\d+$/.test(x)) x = x.replace(",", ".");
    return x;
  }

  function num(id, v, min, max, step, hid) { return '<input class="nx-i" id="' + id + '" type="text" inputmode="decimal" autocomplete="off" min="' + min + '" max="' + max + '" step="' + step + '" value="' + v + '"' + (hid ? ' aria-describedby="' + id + '-h"' : "") + ">"; }

  function build() {
    var opts = Object.keys(RULES).map(function (k) { return '<option value="' + k + '"' + (lab.rule === k ? " selected" : "") + ">" + RULES[k][0] + "</option>"; }).join("");
    host.innerHTML =
      '<form class="nx-form" id="nx-form" novalidate>' +
      field("nx-seed", "Seed", num("nx-seed", lab.seed, 0, 4294967295, 1, 1), "A whole number. The same seed and inputs give the same result.") +
      field("nx-paths", "Simulated lifetimes", num("nx-paths", lab.paths, 100, 5000, 100, 1), "100 to 5,000.") +
      field("nx-sd", "Yearly return volatility (%)", num("nx-sd", lab.sd, 0, 60, 0.5, 1), "Your own assumption, no source. Set 0 for a fixed-return check.") +
      field("nx-rule", "Withdrawal rule", '<select class="nx-i" id="nx-rule" aria-describedby="nx-rule-h">' + opts + "</select>", "") +
      '<p class="nx-h nx-wide" id="nx-rule-h">' + esc(RULES[lab.rule][1]) + "</p>" +
      field("nx-rate", "Starting withdrawal rate (%)", num("nx-rate", lab.rate, 0.5, 15, 0.1, 1), "Used by the three percent rules, not by Plan spending.") +
      field("nx-cpp", "CPP start age", num("nx-cpp", lab.cpp, 60, 70, 1, 1), "60 to 70. The CPP amount above is read as the amount at 65.") +
      field("nx-oas", "OAS start age", num("nx-oas", lab.oas, 65, 70, 1, 1), "65 to 70. The OAS amount above is read as the amount at 65.") +
      '<div class="nx-f"><label class="nx-chk" for="nx-rrif"><input type="checkbox" id="nx-rrif"' + (lab.rrif ? " checked" : "") + '><span class="nx-l">Apply RRIF minimum withdrawals</span></label></div>' +
      field("nx-rrifage", "RRIF minimums start at age", num("nx-rrifage", lab.rrifAge, 65, 95, 1, 1), "Your input. Minimums use the CRA factor for your age at the start of each year.") +
      '<div class="nx-f nx-wide"><button type="submit" class="nx-btn nx-primary" id="nx-run"><svg class="nf-ic" viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"/></svg>&nbsp;Run stress test</button></div>' +
      "</form>" +
      '<p class="nx-h" id="nx-savemsg" role="status"></p><div id="nx-out" class="nx-out" aria-live="polite" tabindex="-1"><p class="nx-h">No run yet. Choose Run stress test.</p></div>';
    var f = document.getElementById("nx-form");
    f.addEventListener("submit", function (ev) { ev.preventDefault(); run(); });
    function bind(id, key, conv) {
      var el = document.getElementById(id);
      el.addEventListener("change", function () { lab[key] = conv ? conv(el) : numText(el.value); lab = sanitize(lab); save([key]); sync(); stale("Settings changed since the last run."); });
    }
    bind("nx-seed", "seed"); bind("nx-paths", "paths"); bind("nx-sd", "sd"); bind("nx-rate", "rate"); bind("nx-cpp", "cpp"); bind("nx-oas", "oas"); bind("nx-rrifage", "rrifAge");
    bind("nx-rrif", "rrif", function (e) { return e.checked; });
    bind("nx-rule", "rule", function (e) { return e.value; });
    document.getElementById("nx-rule").addEventListener("change", function () { document.getElementById("nx-rule-h").textContent = RULES[lab.rule][1]; });
  }
  function sync() {
    var m = { "nx-seed": lab.seed, "nx-paths": lab.paths, "nx-sd": lab.sd, "nx-rate": lab.rate, "nx-cpp": lab.cpp, "nx-oas": lab.oas, "nx-rrifage": lab.rrifAge, "nx-rule": lab.rule };
    for (var k in m) { var el = document.getElementById(k); if (el && el !== document.activeElement && String(el.value) !== String(m[k])) el.value = m[k]; }
    var c = document.getElementById("nx-rrif"); if (c) c.checked = lab.rrif;
    var h = document.getElementById("nx-rule-h"); if (h) h.textContent = RULES[lab.rule][1];
  }
  function stale(msg) {
    if (!last) return;
    staleNote = msg;
    var s = document.getElementById("nx-stale"); if (s) s.textContent = msg + " Run again to refresh.";
  }

  function run() {
    var p = profile(), out = document.getElementById("nx-out");
    if (!p) { out.innerHTML = '<p class="nx-h">The planner has not finished loading. Try again in a moment.</p>'; return; }
    lab = sanitize(lab); save([]); sync();
    var P = paramsFrom(p);
    out.innerHTML = '<p class="nx-h" role="status">Running ' + grp(P.paths) + " lifetimes.</p>";
    document.getElementById("nx-run").disabled = true;
    runInWorker(P, function (r) {
      document.getElementById("nx-run").disabled = false;
      last = { r: r, P: P }; staleNote = ""; render();
    }, function (e) {
      document.getElementById("nx-run").disabled = false;
      out.innerHTML = '<p class="nx-h nx-bad">The run could not finish: ' + esc(e.message || e) + ". Check the inputs above.</p>";
    });
  }

  function series(r, P) {
    var core = nfCore(NF_DATA);
    var conv = function (c, k) { return lab.dollars === "nominal" ? core.nominalOf(c, k, P.inflPpm) : c; };
    return { ages: r.ages, p10: r.p10.map(conv), p50: r.p50.map(conv), p90: r.p90.map(conv), conv: conv };
  }

  function chart(S, P) {
    var W = 640, H = 340, L = 64, R = 56, T = 14, B = 44, n = S.ages.length;
    var max = 1; S.p90.forEach(function (v) { if (v > max) max = v; });
    var maxD = max / 100, step = 1; while (step * 5 < maxD) step *= 10; var top = Math.ceil(maxD / step) * step * 100; if (top <= 0) top = 100;
    var x = function (i) { return L + (n > 1 ? (W - L - R) * i / (n - 1) : 0); }, y = function (v) { return T + (H - T - B) * (1 - v / top); };
    var pts = function (a) { return a.map(function (v, i) { return x(i).toFixed(1) + "," + y(v).toFixed(1); }).join(" "); };
    var area = pts(S.p90) + " " + S.p10.map(function (v, i) { return x(n - 1 - i).toFixed(1) + "," + y(S.p10[n - 1 - i]).toFixed(1); }).join(" ");
    var g = "";
    for (var t = 0; t <= 4; t++) { var v = top * t / 4; g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v).toFixed(1) + '" y2="' + y(v).toFixed(1) + '" class="nx-grid"/><text x="' + (L - 6) + '" y="' + (y(v) + 4).toFixed(1) + '" text-anchor="end" class="nx-ax">' + short(v) + "</text>"; }
    var every = Math.max(1, Math.ceil(n / 8));
    for (var i = 0; i < n; i += every) g += '<text x="' + x(i).toFixed(1) + '" y="' + (H - B + 18) + '" text-anchor="middle" class="nx-ax">' + S.ages[i] + "</text>";
    g += '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="nx-ax">Age</text>';
    var ri = P.retireAge - P.age; if (ri > 0 && ri < n) g += '<line x1="' + x(ri).toFixed(1) + '" x2="' + x(ri).toFixed(1) + '" y1="' + T + '" y2="' + (H - B) + '" class="nx-ret"/><text x="' + (x(ri) + 4).toFixed(1) + '" y="' + (T + 12) + '" class="nx-ax">Retire</text>';
    var lab90 = '<text x="' + (W - R + 4) + '" y="' + (y(S.p90[n - 1]) + 4).toFixed(1) + '" class="nx-ax">90th</text>',
      lab50 = '<text x="' + (W - R + 4) + '" y="' + (y(S.p50[n - 1]) + 4).toFixed(1) + '" class="nx-ax">50th</text>',
      lab10 = '<text x="' + (W - R + 4) + '" y="' + (y(S.p10[n - 1]) + 4).toFixed(1) + '" class="nx-ax">10th</text>';
    return '<svg viewBox="0 0 ' + W + " " + H + '" class="nx-svg" role="img" aria-labelledby="nx-ct nx-cd"><title id="nx-ct">Savings by age, 10th, 50th and 90th percentile</title><desc id="nx-cd">' +
      esc("At age " + S.ages[n - 1] + " the 10th, 50th and 90th percentile balances are " + usd(S.p10[n - 1]) + ", " + usd(S.p50[n - 1]) + " and " + usd(S.p90[n - 1]) + ". The table view lists every age.") + "</desc>" +
      g + '<polygon points="' + area + '" class="nx-band"/><polyline points="' + pts(S.p90) + '" class="nx-l90"/><polyline points="' + pts(S.p10) + '" class="nx-l10"/><polyline points="' + pts(S.p50) + '" class="nx-l50"/>' + lab90 + lab50 + lab10 + "</svg>";
  }
  function table(S) {
    var rows = S.ages.map(function (a, i) { return "<tr><th scope=\"row\">" + a + "</th><td>" + usd(S.p10[i]) + "</td><td>" + usd(S.p50[i]) + "</td><td>" + usd(S.p90[i]) + "</td></tr>"; }).join("");
    return '<div class="nx-tw" role="region" aria-label="Percentile table" tabindex="0"><table class="nx-t"><caption>Opening savings at each age, whole dollars, ' + (lab.dollars === "nominal" ? "future dollars" : "today's dollars") + '</caption><thead><tr><th scope="col">Age</th><th scope="col">10th percentile</th><th scope="col">50th percentile</th><th scope="col">90th percentile</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }

  function render() {
    if (!last) return;
    var r = last.r, P = last.P, out = document.getElementById("nx-out"), cy = new Date().getFullYear();
    var S = series(r, P), k = P.endAge - P.age, conv = S.conv;
    var detTxt = r.det.failAge === null ?
      "Fixed-return illustration (no randomness, growth " + (P.growthPpm / 1e4) + "% a year): savings last through age " + P.endAge + ", ending at " + usd(conv(r.det.end, k)) + "." :
      "Fixed-return illustration (no randomness, growth " + (P.growthPpm / 1e4) + "% a year): savings run out at age " + r.det.failAge + " (year " + (cy + r.det.failAge - P.age) + "), short by " + usd(conv(r.det.shortfall, r.det.failAge - P.age)) + " that year. Ending balance " + usd(0) + ".";
    var weakTxt = r.weak.failAge === null ?
      "Weak case (the 10th percentile lifetime): savings last through age " + P.endAge + ", ending at " + usd(conv(r.weak.end, k)) + "." :
      "Weak case (the 10th percentile lifetime): savings run out at age " + r.weak.failAge + " (year " + (cy + r.weak.failAge - P.age) + "), short by " + usd(conv(r.weak.shortfall, r.weak.failAge - P.age)) + " that year. Ending balance " + usd(0) + ".";
    var rule = RULES[lab.rule][0];
    out.innerHTML =
      '<p class="nx-big" id="nx-fail">Plan failed in ' + grp(r.failed) + " of " + grp(r.paths) + ' periods.</p>' +
      '<p class="nx-p nx-plain" id="nx-plain">In ' + grp(r.failed) + " of " + grp(r.paths) + " random market paths your money ran out before the end. Lower is better.</p>" +
      '<p class="nx-h">Each period is one simulated lifetime from age ' + P.age + " to " + P.endAge + ". A period fails when savings cannot pay the year's spending by more than $100. Seed " + r.seed + ", rule: " + esc(rule) + ".</p>" +
      '<p class="nx-h" id="nx-stale" role="status">' + esc(staleNote ? staleNote + " Run again to refresh." : "") + "</p>" +
      '<div class="nx-tog" role="group" aria-label="Display options">' +
      '<button type="button" class="nx-btn" data-k="dollars" data-v="real" aria-pressed="' + (lab.dollars === "real") + '">Today\'s dollars</button>' +
      '<button type="button" class="nx-btn" data-k="dollars" data-v="nominal" aria-pressed="' + (lab.dollars === "nominal") + '">Future dollars</button>' +
      '<button type="button" class="nx-btn" data-k="view" data-v="chart" aria-pressed="' + (lab.view === "chart") + '">Chart</button>' +
      '<button type="button" class="nx-btn" data-k="view" data-v="table" aria-pressed="' + (lab.view === "table") + '">Table</button></div>' +
      (lab.view === "chart" ? chart(S, P) : table(S)) +
      '<ul class="nx-ul"><li>' + esc(detTxt) + "</li><li>" + esc(weakTxt) + "</li>" +
      "<li>Ending balance across lifetimes: 10th percentile " + usd(conv(r.endP10, k)) + ", median " + usd(conv(r.endP50, k)) + ", 90th percentile " + usd(conv(r.endP90, k)) + ".</li>" +
      "<li>Median draw from savings, after tax: first retirement year " + usd(conv(r.drawFirstP50, Math.max(0, P.retireAge - P.age))) + ", last year " + usd(conv(r.drawLastP50, k)) + ".</li></ul>" +
      '<p class="nx-h">' + (lab.dollars === "nominal" ? "Future dollars use the plan's inflation rate of " + (P.inflPpm / 1e4) + "% a year; tax tables are held fixed in today's dollars." : "Today's dollars. Growth is a real rate.") + "</p>";
    out.querySelectorAll(".nx-tog button").forEach(function (b) {
      b.addEventListener("click", function () { lab[b.getAttribute("data-k")] = b.getAttribute("data-v"); save([b.getAttribute("data-k")]); render(); var q = document.querySelector('.nx-tog [data-k="' + b.getAttribute("data-k") + '"][data-v="' + b.getAttribute("data-v") + '"]'); if (q) q.focus(); });
    });
  }

  build();
  // Another tab changed the stored settings: adopt them without touching the field being typed in.
  window.addEventListener("storage", function (e) {
    if (e.key !== null && e.key !== KEY) return;
    var sv = null;
    try { sv = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (x) { return; }
    lab = sanitize(Object.assign({}, DEF, sv && typeof sv === "object" && !Array.isArray(sv) ? sv : {}));
    sync();
    if (last) { try { render(); } catch (x) { } stale("Settings changed in another tab."); }
  });
  window.__nfLab = {
    get: function () { var st = readStored(); if (st) lab = sanitize(Object.assign({}, DEF, st)); return Object.assign({}, lab); },
    set: function (o) { lab = sanitize(Object.assign({}, lab, o || {})); save(Object.keys(o || {})); sync(); },
    run: run, last: function () { return last; }, mode: function () { return lastMode; }, params: function () { var p = profile(); return p ? paramsFrom(p) : null; }
  };
  var tries = 0, t = setInterval(function () {
    var s = window.__nfStore;
    if (s && s.getState().isHydrated) {
      clearInterval(t);
      var prev = JSON.stringify(s.getState().profile);
      s.subscribe(function (st) { var j = JSON.stringify(st.profile); if (j !== prev) { prev = j; stale("Plan inputs changed since the last run."); } });
    } else if (++tries > 150) clearInterval(t);
  }, 200);
})();
