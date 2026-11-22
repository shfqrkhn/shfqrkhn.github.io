var NF_DATA=null;
/* Loader. The figures live in the block named nf-data above (type application/json), which is not executed
   and is not pinned by the script hash, so it can be edited with any text editor. Do not edit this script. */
try { NF_DATA = JSON.parse(document.getElementById("nf-data").textContent); } catch (e) { window.__nfDataError = String(e && e.message || e); }
function nfGet(p) { var o = NF_DATA, a = String(p).split("."), i; for (i = 0; i < a.length; i++) { if (o === null || o === undefined) return undefined; o = o[a[i]]; } return o; }
function nfUsd(c) { var s = String(Math.floor(c / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ","), r = c % 100; return "$" + s + (r ? "." + (r < 10 ? "0" : "") + r : ""); }
function nfPc(e, fixed) { var v = (e / 100).toFixed(2); return (fixed ? v : v.replace(/\.?0+$/, "")) + "%"; }
function nfBrk(b) { var o = [], i; for (i = 0; i < b.length; i++) { o.push(b[i][0] === null ? "over " + nfUsd(b[i - 1][0] * 100) + " at " + nfPc(b[i][1]) : "up to " + nfUsd(b[i][0] * 100) + " at " + nfPc(b[i][1])); } return o.join("; "); }
/* nfT fills {year} {usd:path} {pct:path} {pct2:path} {num:path} {brk:path} from nf-data; path*N multiplies first. */
function nfT(s) {
  return String(s).replace(/\{(\w+)(?::([\w.]+))?(?:\*(\d+))?\}/g, function (m, k, p, x) {
    if (!NF_DATA) return m;
    if (k === "year") return String(NF_DATA.taxYear);
    var v = nfGet(p);
    if (v === undefined) return m;
    if (x) v = v * Number(x);
    if (k === "usd") return nfUsd(v);
    if (k === "pct") return nfPc(v);
    if (k === "pct2") return nfPc(v, true);
    if (k === "num") return String(v);
    if (k === "brk") return nfBrk(v.brackets || v);
    return m;
  });
}
function nfFill() {
  var l = document.querySelectorAll("[data-nf]"), i, n, s;
  for (i = 0; i < l.length; i++) { n = l[i]; s = nfT(n.getAttribute("data-nf")); if (n.textContent !== s) n.textContent = s; }
  if (window.__nfDataError || !NF_DATA) {
    var b = document.createElement("div");
    b.setAttribute("role", "alert");
    b.setAttribute("style", "padding:16px;margin:0;background:#fff;color:#7a0000;border-bottom:3px solid #7a0000;font:600 16px/1.5 system-ui,sans-serif");
    b.textContent = "The tax and benefit figures could not be read. Open the file in a text editor and look at the block named nf-data near the top for a missing comma, quote or bracket, or put your backup copy of the file back. Nothing was changed or sent.";
    document.body.insertBefore(b, document.body.firstChild);
  }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", nfFill); else nfFill();
/* nFIRE 10.4.5 stress-test core. Money is integer cents. Rates are integers (E4 = ten-thousandths, ppm = millionths).
   No eval, no Date, no Math.random, no transcendental functions: the same seed and inputs give the same result. */
function nfCore(DATA) {
  "use strict";
  var MAXC = 9000000000000000; // 2^53 cents guard (about 90 trillion dollars)

  function md(a, b, c) { // round(a*b/c), a,b >= 0 integers (Numbers), exact through BigInt
    var t = BigInt(a) * BigInt(b), d = BigInt(c);
    return Number((t + d / 2n) / d);
  }
  function mulE4(x, r) { return Math.floor((x * r + 5000) / 10000); } // x*r < 2^53 for the tax code
  function grow(b, ppm) { // b cents, ppm may be negative
    if (b <= 0) return 0;
    var t = BigInt(b) * BigInt(ppm), h = 500000n, q = t >= 0n ? (t + h) / 1000000n : -((-t + h) / 1000000n);
    var v = b + Number(q);
    return v < 0 ? 0 : v;
  }

  // ---- tax (federal + provincial brackets, federal credit on the basic personal amount at the lowest rate) ----
  function bracketTax(br, inc) {
    var tax = 0, prev = 0, i;
    for (i = 0; i < br.length; i++) {
      if (inc <= prev) break;
      var up = br[i][0] === null ? Infinity : br[i][0] * 100;
      tax += mulE4(Math.min(inc, up) - prev, br[i][1]);
      prev = up;
    }
    return tax;
  }
  function taxCents(inc, prov) {
    var p = DATA.prov[prov];
    if (!p) throw new RangeError("Unsupported province: " + prov);
    var t = bracketTax(DATA.fed.brackets, inc) + bracketTax(p.brackets, inc) - mulE4(DATA.fed.bpaCents, DATA.fed.brackets[0][1]);
    return t > 0 ? t : 0;
  }
  function grossUp(net, other, prov) {
    if (net <= 0) return 0;
    var base = taxCents(other, prov);
    function netOf(g) { return g - (taxCents(other + g, prov) - base); }
    var lo = net, hi = net * 3 + 100;
    while (netOf(hi) < net) hi *= 2;
    while (lo < hi) {
      var mid = Math.floor((lo + hi) / 2);
      if (netOf(mid) >= net) hi = mid; else lo = mid + 1;
    }
    return lo;
  }

  // ---- sourced factors ----
  function rrifFactorE4(age) { // age at the beginning of the year
    if (age < 71) return Math.floor((20000 + (90 - age)) / (2 * (90 - age))); // 1/(90-age) in E4, rounded
    if (age >= 95) return DATA.rrif["95"];
    return DATA.rrif[String(age)];
  }
  function cppFactorE4(startAge) { // 10000 = unchanged
    var m = Math.round((startAge - 65) * 12);
    if (m < 0) return 10000 - DATA.cpp.earlyPerMonthE4 * Math.min(-m, 60);
    return 10000 + DATA.cpp.latePerMonthE4 * Math.min(m, 60);
  }
  function oasFactorE4(startAge) {
    var m = Math.round((startAge - 65) * 12);
    return 10000 + DATA.oas.latePerMonthE4 * Math.max(0, Math.min(m, 60));
  }

  // ---- deterministic seeded random numbers (integer and add/multiply only) ----
  function seedFor(seed, i) {
    var h = (seed >>> 0) ^ Math.imul(i + 1, 0x9E3779B1);
    h ^= h >>> 16; h = Math.imul(h, 0x85EBCA6B); h ^= h >>> 13; h = Math.imul(h, 0xC2B2AE35); h ^= h >>> 16;
    return h >>> 0;
  }
  function mulberry32(a) { // public-domain generator
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function normal(rng) { var s = 0, k; for (k = 0; k < 12; k++) s += rng(); return s - 6; } // Irwin-Hall, mean 0, sd 1

  function deflate(cents, years, inflPpm) {
    if (years <= 0) return cents;
    var n = BigInt(1000000 + inflPpm) ** BigInt(years), d = 1000000n ** BigInt(years);
    return Number((BigInt(cents) * d + n / 2n) / n);
  }
  function nominalOf(cents, years, inflPpm) {
    if (years <= 0 || inflPpm === 0) return cents;
    var n = BigInt(1000000 + inflPpm) ** BigInt(years), d = 1000000n ** BigInt(years);
    return Number((BigInt(cents) * n + d / 2n) / d);
  }

  // ---- benefit schedule by age (does not depend on returns) ----
  function schedule(P) {
    var out = {}, ref = P.retireAge, pen = P.pension, age;
    var pAnnual = 0, pBridge = 0, pStart = 65;
    if (pen.enabled) {
      if (pen.mode === "fixed") { pAnnual = pen.annualCents; pBridge = pen.bridgeCents; pStart = pen.startAge; }
      else {
        var cy = Math.max(0, ref - pen.careerStartAge), cr = Math.min(cy, 35);
        pStart = Math.max(pen.startAge, ref);
        pAnnual = md(cr * pen.accrualE4, pen.bestAvgCents, 10000);
        pBridge = pen.bridgeEnabled ? md(cr * DATA.c.ympeCents, 625, 100000) : 0;
      }
    }
    var cppAmt = md(P.cppCents, cppFactorE4(P.cppStartAge), 10000);
    var oasAmt = md(P.oasCents, oasFactorE4(P.oasStartAge), 10000);
    for (age = P.age; age <= P.endAge; age++) {
      var need = P.spendCents, taxable = 0, ben = 0;
      if (pen.enabled && age >= pStart) {
        var pi = pAnnual;
        if (!pen.isIndexed) pi = deflate(pi, age - ref, P.inflPpm);
        if (age < 65) pi += pBridge;
        need -= pi; taxable += pi; ben += pi;
      }
      if (age >= P.cppStartAge) { need -= cppAmt; taxable += cppAmt; ben += cppAmt; }
      if (age >= 65 && age >= P.oasStartAge) {
        var oas = oasAmt;
        if (age >= 75) oas = md(oas, 10000 + DATA.oas.at75E4, 10000);
        var netInc = taxable + oas; // CRA: the recovery test uses net income including OAS
        if (netInc > DATA.c.oasThresholdCents) {
          var rec = mulE4(netInc - DATA.c.oasThresholdCents, DATA.c.oasRecoveryE4);
          oas -= Math.min(oas, rec);
        }
        need -= oas; taxable += oas; ben += oas;
      }
      need += taxCents(taxable, P.province); // income tax on pension, CPP and net OAS is funded from savings
      out[age] = { need: need, taxable: taxable, ben: ben };
    }
    return out;
  }

  // ---- one lifetime. rets: array of real-return ppm by year index (null = fixed growth) ----
  function runPath(P, sched, rets) {
    var rr = P.rrspCents, tf = P.tfsaCents, nr = P.nonRegCents;
    var age, i = 0, open = [], failAge = null, shortfall = 0, firstDraw = null, lastDraw = 0;
    var N = 0, N0 = 0, B0 = 0, prevRet = 0, prevOpen = 0, prevN = 0, started = false;
    var rrspRoom = Math.min(Math.floor(P.incomeCents * DATA.c.rrspPct / 100), DATA.c.rrspMaxCents);
    for (age = P.age; age <= P.endAge; age++, i++) {
      var tot = rr + tf + nr; open.push(tot);
      var r = rets ? rets[i] : P.growthPpm;
      var rNr = r >= 0 ? Math.max(0, r - P.taxDragPpm) : r;
      if (age >= P.retireAge) {
        var s = sched[age], target, O = s.taxable;
        var st = P.strategy.kind;
        if (st === "plan") target = Math.max(0, s.need);
        else {
          if (!started) { started = true; B0 = tot; N0 = md(tot, P.strategy.ratePpm, 1000000); N = N0; }
          else if (st === "fixedPct") N = md(tot, P.strategy.ratePpm, 1000000);
          else if (st === "inflAdj") N = N0;
          else { // guardrails (Guyton and Klinger 2006)
            N = prevN;
            var nomNeg = (1000000 + prevRet) * (1000000 + P.inflPpm) < 1000000000000;
            var prevAbove = prevOpen > 0 && BigInt(prevN) * BigInt(B0) > BigInt(N0) * BigInt(prevOpen);
            if (nomNeg && prevAbove) N = md(N, 1000000, 1000000 + P.inflPpm); // no inflation increase, no make-up
            if (tot > 0) {
              if (BigInt(N) * BigInt(B0) * 10n > BigInt(N0) * BigInt(tot) * 12n && age <= P.endAge - 15) N = md(N, 9, 10);
              else if (BigInt(N) * BigInt(B0) * 10n < BigInt(N0) * BigInt(tot) * 8n) N = md(N, 11, 10);
            }
          }
          target = N;
          prevN = N; prevOpen = tot;
        }
        if (firstDraw === null) firstDraw = target;
        lastDraw = target;
        var rem = target, Ot = O, w;
        if (P.rrif.on && age >= P.rrif.startAge && rr > 0) {
          var minG = Math.min(rr, mulE4(rr, rrifFactorE4(age)));
          var net = minG - (taxCents(Ot + minG, P.province) - taxCents(Ot, P.province));
          rr -= minG; Ot += minG;
          if (net >= rem) { nr += net - rem; rem = 0; } else rem -= net;
        }
        if (rem > 0 && tf > 0) { w = Math.min(tf, rem); tf -= w; rem -= w; }
        if (rem > 0 && nr > 0) { w = Math.min(nr, rem); nr -= w; rem -= w; }
        if (rem > 0 && rr > 0) {
          var g = grossUp(rem, Ot, P.province);
          if (rr < g) {
            var nn = rr - (taxCents(Ot + rr, P.province) - taxCents(Ot, P.province));
            rr = 0; rem = Math.max(0, rem - nn);
          } else { rr -= g; rem = 0; }
        }
        if (rem > 10000 && rr <= 100 && tf <= 100 && nr <= 100 && failAge === null) { failAge = age; shortfall = rem; }
      } else {
        var sv = P.savingsCents, tc = Math.min(sv, DATA.c.tfsaCents);
        tf += tc; sv -= tc;
        if (sv > 0) { var rc = Math.min(sv, rrspRoom); rr += rc; sv -= rc; }
        if (sv > 0) nr += sv;
      }
      rr = grow(rr, r); tf = grow(tf, r); nr = grow(nr, rNr);
      prevRet = r;
      if (rr + tf + nr > MAXC) throw new RangeError("Balance out of range");
    }
    var end = rr + tf + nr;
    return { open: open, failAge: failAge, shortfall: shortfall, end: end, firstDraw: firstDraw || 0, lastDraw: lastDraw };
  }

  function pct(sorted, p) { var n = sorted.length, k = Math.ceil(p / 100 * n) - 1; return sorted[k < 0 ? 0 : k]; }

  function simulate(P) {
    var sched = schedule(P), nAges = P.endAge - P.age + 1, M = P.paths, m, a;
    var cols = [], ends = new Array(M), keys = new Array(M), fails = 0, firstD = [], lastD = [];
    for (a = 0; a < nAges; a++) cols.push(new Array(M));
    for (m = 0; m < M; m++) {
      var rng = mulberry32(seedFor(P.seed, m)), rets = new Array(nAges);
      for (a = 0; a < nAges; a++) {
        var rv = P.growthPpm + Math.round(P.sdPpm * normal(rng));
        rets[a] = rv < -950000 ? -950000 : rv;
      }
      var res = runPath(P, sched, rets);
      for (a = 0; a < nAges; a++) cols[a][m] = res.open[a];
      ends[m] = res.end; firstD.push(res.firstDraw); lastD.push(res.lastDraw);
      if (res.failAge !== null) { fails++; keys[m] = { k: -(P.endAge + 1 - res.failAge) * 1e15, fa: res.failAge, end: res.end, sf: res.shortfall }; }
      else keys[m] = { k: res.end, fa: null, end: res.end, sf: 0 };
    }
    var ages = [], p10 = [], p50 = [], p90 = [];
    for (a = 0; a < nAges; a++) {
      var c = cols[a].slice().sort(function (x, y) { return x - y; });
      ages.push(P.age + a); p10.push(pct(c, 10)); p50.push(pct(c, 50)); p90.push(pct(c, 90));
    }
    keys.sort(function (x, y) { return x.k - y.k; });
    var weak = keys[Math.max(0, Math.ceil(0.1 * M) - 1)];
    var det = runPath(P, sched, null);
    var e2 = ends.slice().sort(function (x, y) { return x - y; });
    firstD.sort(function (x, y) { return x - y; }); lastD.sort(function (x, y) { return x - y; });
    return {
      ages: ages, p10: p10, p50: p50, p90: p90, paths: M, failed: fails, seed: P.seed,
      endP10: pct(e2, 10), endP50: pct(e2, 50), endP90: pct(e2, 90),
      drawFirstP50: pct(firstD, 50), drawLastP50: pct(lastD, 50),
      weak: { failAge: weak.fa, end: weak.end, shortfall: weak.sf },
      det: { failAge: det.failAge, end: det.end, shortfall: det.shortfall, open: det.open }
    };
  }

  return {
    taxCents: taxCents, grossUp: grossUp, rrifFactorE4: rrifFactorE4, cppFactorE4: cppFactorE4, oasFactorE4: oasFactorE4,
    seedFor: seedFor, mulberry32: mulberry32, normal: normal, nominalOf: nominalOf, schedule: schedule,
    runPath: runPath, simulate: simulate, md: md
  };
}
if (typeof module !== "undefined" && module.exports) module.exports = nfCore;
