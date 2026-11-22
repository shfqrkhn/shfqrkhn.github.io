function rv() {
  return typeof window < "u";
}
function au(e) {
  return gL(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Zn(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ei(e) {
  var t;
  return (t = (gL(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function gL(e) {
  return rv() ? e instanceof Node || e instanceof Zn(e).Node : !1;
}
function Pt(e) {
  return rv() ? e instanceof Element || e instanceof Zn(e).Element : !1;
}
function cr(e) {
  return rv() ? e instanceof HTMLElement || e instanceof Zn(e).HTMLElement : !1;
}
function lS(e) {
  return !rv() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Zn(e).ShadowRoot;
}
const pW = new Set(["inline", "contents"]);
function td(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = Tr(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !pW.has(i);
}
const mW = new Set(["table", "td", "th"]);
function vW(e) {
  return mW.has(au(e));
}
const yW = [":popover-open", ":modal"];
function iv(e) {
  return yW.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const gW = ["transform", "translate", "scale", "rotate", "perspective"],
  bW = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  wW = ["paint", "layout", "strict", "content"];
function LP(e) {
  const t = ov(),
    n = Pt(e) ? Tr(e) : e;
  return (
    gW.some((r) => (n[r] ? n[r] !== "none" : !1)) ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    bW.some((r) => (n.willChange || "").includes(r)) ||
    wW.some((r) => (n.contain || "").includes(r))
  );
}
function xW(e) {
  let t = ro(e);
  for (; cr(t) && !oa(t); ) {
    if (LP(t)) return t;
    if (iv(t)) return null;
    t = ro(t);
  }
  return null;
}
function ov() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const SW = new Set(["html", "body", "#document"]);
function oa(e) {
  return SW.has(au(e));
}
function Tr(e) {
  return Zn(e).getComputedStyle(e);
}
function av(e) {
  return Pt(e)
    ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop,
      }
    : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY,
      };
}
function ro(e) {
  if (au(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (lS(e) && e.host) || Ei(e);
  return lS(t) ? t.host : t;
}
function bL(e) {
  const t = ro(e);
  return oa(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : cr(t) && td(t) ? t : bL(t);
}
function Yi(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = bL(e),
    o = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = Zn(i);
  if (o) {
    const s = uS(a);
    return t.concat(a, a.visualViewport || [], td(i) ? i : [], s && n ? Yi(s) : []);
  }
  return t.concat(i, Yi(i, [], n));
}
function uS(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ik(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (n = n.shadowRoot) == null ? void 0 : n.activeElement) != null; ) {
    var n;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function Qc(e, t) {
  if (!e || !t) return !1;
  const n = t.getRootNode == null ? void 0 : t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && lS(n)) {
    let r = t;
    for (; r; ) {
      if (e === r) return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function wL() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function xL() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? e.brands
        .map((t) => {
          let { brand: n, version: r } = t;
          return n + "/" + r;
        })
        .join(" ")
    : navigator.userAgent;
}
function _W(e) {
  return OW()
    ? !1
    : (!Dk() && e.width === 0 && e.height === 0) ||
        (Dk() && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse") ||
        (e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch");
}
function PW() {
  return /apple/i.test(navigator.vendor);
}
function Dk() {
  const e = /android/i;
  return e.test(wL()) || e.test(xL());
}
function AW() {
  return wL().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function OW() {
  return xL().includes("jsdom/");
}
function cS(e, t) {
  const n = ["mouse", "pen"];
  return n.push("", void 0), n.includes(e);
}
function EW(e) {
  return "nativeEvent" in e;
}
function TW(e) {
  return e.matches("html,body");
}
function Ua(e) {
  return e?.ownerDocument || document;
}
function b0(e, t) {
  if (t == null) return !1;
  if ("composedPath" in e) return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
function rl(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const CW =
  "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function kW(e) {
  return cr(e) && e.matches(CW);
}
const ei = Math.min,
  Cn = Math.max,
  Tp = Math.round,
  Dh = Math.floor,
  yi = (e) => ({
    x: e,
    y: e,
  }),
  jW = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom",
  },
  RW = {
    start: "end",
    end: "start",
  };
function fS(e, t, n) {
  return Cn(e, ei(t, n));
}
function io(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ti(e) {
  return e.split("-")[0];
}
function su(e) {
  return e.split("-")[1];
}
function BP(e) {
  return e === "x" ? "y" : "x";
}
function FP(e) {
  return e === "y" ? "height" : "width";
}
const MW = new Set(["top", "bottom"]);
function Gr(e) {
  return MW.has(ti(e)) ? "y" : "x";
}
function VP(e) {
  return BP(Gr(e));
}
function NW(e, t, n) {
  n === void 0 && (n = !1);
  const r = su(e),
    i = VP(e),
    o = FP(i);
  let a = i === "x" ? (r === (n ? "end" : "start") ? "right" : "left") : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (a = Cp(a)), [a, Cp(a)];
}
function IW(e) {
  const t = Cp(e);
  return [dS(e), t, dS(t)];
}
function dS(e) {
  return e.replace(/start|end/g, (t) => RW[t]);
}
const $k = ["left", "right"],
  Lk = ["right", "left"],
  DW = ["top", "bottom"],
  $W = ["bottom", "top"];
function LW(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? Lk : $k) : t ? $k : Lk;
    case "left":
    case "right":
      return t ? DW : $W;
    default:
      return [];
  }
}
function BW(e, t, n, r) {
  const i = su(e);
  let o = LW(ti(e), n === "start", r);
  return i && ((o = o.map((a) => a + "-" + i)), t && (o = o.concat(o.map(dS)))), o;
}
function Cp(e) {
  return e.replace(/left|right|bottom|top/g, (t) => jW[t]);
}
function FW(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e,
  };
}
function zP(e) {
  return typeof e != "number"
    ? FW(e)
    : {
        top: e,
        right: e,
        bottom: e,
        left: e,
      };
}
function Cl(e) {
  const { x: t, y: n, width: r, height: i } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n,
  };
}
function Bk(e, t, n) {
  let { reference: r, floating: i } = e;
  const o = Gr(t),
    a = VP(t),
    s = FP(a),
    u = ti(t),
    c = o === "y",
    d = r.x + r.width / 2 - i.width / 2,
    h = r.y + r.height / 2 - i.height / 2,
    p = r[s] / 2 - i[s] / 2;
  let v;
  switch (u) {
    case "top":
      v = {
        x: d,
        y: r.y - i.height,
      };
      break;
    case "bottom":
      v = {
        x: d,
        y: r.y + r.height,
      };
      break;
    case "right":
      v = {
        x: r.x + r.width,
        y: h,
      };
      break;
    case "left":
      v = {
        x: r.x - i.width,
        y: h,
      };
      break;
    default:
      v = {
        x: r.x,
        y: r.y,
      };
  }
  switch (su(t)) {
    case "start":
      v[a] -= p * (n && c ? -1 : 1);
      break;
    case "end":
      v[a] += p * (n && c ? -1 : 1);
      break;
  }
  return v;
}
const VW = async (e, t, n) => {
  const { placement: r = "bottom", strategy: i = "absolute", middleware: o = [], platform: a } = n,
    s = o.filter(Boolean),
    u = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
      reference: e,
      floating: t,
      strategy: i,
    }),
    { x: d, y: h } = Bk(c, r, u),
    p = r,
    v = {},
    b = 0;
  for (let y = 0; y < s.length; y++) {
    const { name: w, fn: x } = s[y],
      {
        x: S,
        y: _,
        data: E,
        reset: P,
      } = await x({
        x: d,
        y: h,
        initialPlacement: r,
        placement: p,
        strategy: i,
        middlewareData: v,
        rects: c,
        platform: a,
        elements: {
          reference: e,
          floating: t,
        },
      });
    (d = S ?? d),
      (h = _ ?? h),
      (v = {
        ...v,
        [w]: {
          ...v[w],
          ...E,
        },
      }),
      P &&
        b <= 50 &&
        (b++,
        typeof P == "object" &&
          (P.placement && (p = P.placement),
          P.rects &&
            (c =
              P.rects === !0
                ? await a.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: i,
                  })
                : P.rects),
          ({ x: d, y: h } = Bk(c, p, u))),
        (y = -1));
  }
  return {
    x: d,
    y: h,
    placement: p,
    strategy: i,
    middlewareData: v,
  };
};
async function qP(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: o, rects: a, elements: s, strategy: u } = e,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: h = "floating",
      altBoundary: p = !1,
      padding: v = 0,
    } = io(t, e),
    b = zP(v),
    w = s[p ? (h === "floating" ? "reference" : "floating") : h],
    x = Cl(
      await o.getClippingRect({
        element:
          (n = await (o.isElement == null ? void 0 : o.isElement(w))) == null || n
            ? w
            : w.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(s.floating))),
        boundary: c,
        rootBoundary: d,
        strategy: u,
      }),
    ),
    S =
      h === "floating"
        ? {
            x: r,
            y: i,
            width: a.floating.width,
            height: a.floating.height,
          }
        : a.reference,
    _ = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(s.floating)),
    E = (await (o.isElement == null ? void 0 : o.isElement(_)))
      ? (await (o.getScale == null ? void 0 : o.getScale(_))) || {
          x: 1,
          y: 1,
        }
      : {
          x: 1,
          y: 1,
        },
    P = Cl(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: S,
            offsetParent: _,
            strategy: u,
          })
        : S,
    );
  return {
    top: (x.top - P.top + b.top) / E.y,
    bottom: (P.bottom - x.bottom + b.bottom) / E.y,
    left: (x.left - P.left + b.left) / E.x,
    right: (P.right - x.right + b.right) / E.x,
  };
}
const zW = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: i, rects: o, platform: a, elements: s, middlewareData: u } = t,
        { element: c, padding: d = 0 } = io(e, t) || {};
      if (c == null) return {};
      const h = zP(d),
        p = {
          x: n,
          y: r,
        },
        v = VP(i),
        b = FP(v),
        y = await a.getDimensions(c),
        w = v === "y",
        x = w ? "top" : "left",
        S = w ? "bottom" : "right",
        _ = w ? "clientHeight" : "clientWidth",
        E = o.reference[b] + o.reference[v] - p[v] - o.floating[b],
        P = p[v] - o.reference[v],
        O = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
      let k = O ? O[_] : 0;
      (!k || !(await (a.isElement == null ? void 0 : a.isElement(O)))) && (k = s.floating[_] || o.floating[b]);
      const R = E / 2 - P / 2,
        M = k / 2 - y[b] / 2 - 1,
        D = ei(h[x], M),
        I = ei(h[S], M),
        V = D,
        z = k - y[b] - I,
        q = k / 2 - y[b] / 2 + R,
        U = fS(V, q, z),
        B = !u.arrow && su(i) != null && q !== U && o.reference[b] / 2 - (q < V ? D : I) - y[b] / 2 < 0,
        F = B ? (q < V ? q - V : q - z) : 0;
      return {
        [v]: p[v] + F,
        data: {
          [v]: U,
          centerOffset: q - U - F,
          ...(B && {
            alignmentOffset: F,
          }),
        },
        reset: B,
      };
    },
  }),
  qW = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const { placement: i, middlewareData: o, rects: a, initialPlacement: s, platform: u, elements: c } = t,
            {
              mainAxis: d = !0,
              crossAxis: h = !0,
              fallbackPlacements: p,
              fallbackStrategy: v = "bestFit",
              fallbackAxisSideDirection: b = "none",
              flipAlignment: y = !0,
              ...w
            } = io(e, t);
          if ((n = o.arrow) != null && n.alignmentOffset) return {};
          const x = ti(i),
            S = Gr(s),
            _ = ti(s) === s,
            E = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)),
            P = p || (_ || !y ? [Cp(s)] : IW(s)),
            O = b !== "none";
          !p && O && P.push(...BW(s, y, b, E));
          const k = [s, ...P],
            R = await qP(t, w),
            M = [];
          let D = ((r = o.flip) == null ? void 0 : r.overflows) || [];
          if ((d && M.push(R[x]), h)) {
            const q = NW(i, a, E);
            M.push(R[q[0]], R[q[1]]);
          }
          if (
            ((D = [
              ...D,
              {
                placement: i,
                overflows: M,
              },
            ]),
            !M.every((q) => q <= 0))
          ) {
            var I, V;
            const q = (((I = o.flip) == null ? void 0 : I.index) || 0) + 1,
              U = k[q];
            if (
              U &&
              (!(h === "alignment" ? S !== Gr(U) : !1) ||
                D.every((L) => (Gr(L.placement) === S ? L.overflows[0] > 0 : !0)))
            )
              return {
                data: {
                  index: q,
                  overflows: D,
                },
                reset: {
                  placement: U,
                },
              };
            let B =
              (V = D.filter((F) => F.overflows[0] <= 0).sort((F, L) => F.overflows[1] - L.overflows[1])[0]) == null
                ? void 0
                : V.placement;
            if (!B)
              switch (v) {
                case "bestFit": {
                  var z;
                  const F =
                    (z = D.filter((L) => {
                      if (O) {
                        const W = Gr(L.placement);
                        return W === S || W === "y";
                      }
                      return !0;
                    })
                      .map((L) => [L.placement, L.overflows.filter((W) => W > 0).reduce((W, G) => W + G, 0)])
                      .sort((L, W) => L[1] - W[1])[0]) == null
                      ? void 0
                      : z[0];
                  F && (B = F);
                  break;
                }
                case "initialPlacement":
                  B = s;
                  break;
              }
            if (i !== B)
              return {
                reset: {
                  placement: B,
                },
              };
          }
          return {};
        },
      }
    );
  };
function SL(e) {
  const t = ei(...e.map((o) => o.left)),
    n = ei(...e.map((o) => o.top)),
    r = Cn(...e.map((o) => o.right)),
    i = Cn(...e.map((o) => o.bottom));
  return {
    x: t,
    y: n,
    width: r - t,
    height: i - n,
  };
}
function WW(e) {
  const t = e.slice().sort((i, o) => i.y - o.y),
    n = [];
  let r = null;
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    !r || o.y - r.y > r.height / 2 ? n.push([o]) : n[n.length - 1].push(o), (r = o);
  }
  return n.map((i) => Cl(SL(i)));
}
const UW = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "inline",
        options: e,
        async fn(t) {
          const { placement: n, elements: r, rects: i, platform: o, strategy: a } = t,
            { padding: s = 2, x: u, y: c } = io(e, t),
            d = Array.from((await (o.getClientRects == null ? void 0 : o.getClientRects(r.reference))) || []),
            h = WW(d),
            p = Cl(SL(d)),
            v = zP(s);
          function b() {
            if (h.length === 2 && h[0].left > h[1].right && u != null && c != null)
              return (
                h.find(
                  (w) => u > w.left - v.left && u < w.right + v.right && c > w.top - v.top && c < w.bottom + v.bottom,
                ) || p
              );
            if (h.length >= 2) {
              if (Gr(n) === "y") {
                const D = h[0],
                  I = h[h.length - 1],
                  V = ti(n) === "top",
                  z = D.top,
                  q = I.bottom,
                  U = V ? D.left : I.left,
                  B = V ? D.right : I.right,
                  F = B - U,
                  L = q - z;
                return {
                  top: z,
                  bottom: q,
                  left: U,
                  right: B,
                  width: F,
                  height: L,
                  x: U,
                  y: z,
                };
              }
              const w = ti(n) === "left",
                x = Cn(...h.map((D) => D.right)),
                S = ei(...h.map((D) => D.left)),
                _ = h.filter((D) => (w ? D.left === S : D.right === x)),
                E = _[0].top,
                P = _[_.length - 1].bottom,
                O = S,
                k = x,
                R = k - O,
                M = P - E;
              return {
                top: E,
                bottom: P,
                left: O,
                right: k,
                width: R,
                height: M,
                x: O,
                y: E,
              };
            }
            return p;
          }
          const y = await o.getElementRects({
            reference: {
              getBoundingClientRect: b,
            },
            floating: r.floating,
            strategy: a,
          });
          return i.reference.x !== y.reference.x ||
            i.reference.y !== y.reference.y ||
            i.reference.width !== y.reference.width ||
            i.reference.height !== y.reference.height
            ? {
                reset: {
                  rects: y,
                },
              }
            : {};
        },
      }
    );
  },
  _L = new Set(["left", "top"]);
async function HW(e, t) {
  const { placement: n, platform: r, elements: i } = e,
    o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    a = ti(n),
    s = su(n),
    u = Gr(n) === "y",
    c = _L.has(a) ? -1 : 1,
    d = o && u ? -1 : 1,
    h = io(t, e);
  let {
    mainAxis: p,
    crossAxis: v,
    alignmentAxis: b,
  } = typeof h == "number"
    ? {
        mainAxis: h,
        crossAxis: 0,
        alignmentAxis: null,
      }
    : {
        mainAxis: h.mainAxis || 0,
        crossAxis: h.crossAxis || 0,
        alignmentAxis: h.alignmentAxis,
      };
  return (
    s && typeof b == "number" && (v = s === "end" ? b * -1 : b),
    u
      ? {
          x: v * d,
          y: p * c,
        }
      : {
          x: p * c,
          y: v * d,
        }
  );
}
const KW = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: i, y: o, placement: a, middlewareData: s } = t,
            u = await HW(t, e);
          return a === ((n = s.offset) == null ? void 0 : n.placement) && (r = s.arrow) != null && r.alignmentOffset
            ? {}
            : {
                x: i + u.x,
                y: o + u.y,
                data: {
                  ...u,
                  placement: a,
                },
              };
        },
      }
    );
  },
  GW = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: i } = t,
            {
              mainAxis: o = !0,
              crossAxis: a = !1,
              limiter: s = {
                fn: (w) => {
                  let { x, y: S } = w;
                  return {
                    x,
                    y: S,
                  };
                },
              },
              ...u
            } = io(e, t),
            c = {
              x: n,
              y: r,
            },
            d = await qP(t, u),
            h = Gr(ti(i)),
            p = BP(h);
          let v = c[p],
            b = c[h];
          if (o) {
            const w = p === "y" ? "top" : "left",
              x = p === "y" ? "bottom" : "right",
              S = v + d[w],
              _ = v - d[x];
            v = fS(S, v, _);
          }
          if (a) {
            const w = h === "y" ? "top" : "left",
              x = h === "y" ? "bottom" : "right",
              S = b + d[w],
              _ = b - d[x];
            b = fS(S, b, _);
          }
          const y = s.fn({
            ...t,
            [p]: v,
            [h]: b,
          });
          return {
            ...y,
            data: {
              x: y.x - n,
              y: y.y - r,
              enabled: {
                [p]: o,
                [h]: a,
              },
            },
          };
        },
      }
    );
  },
  YW = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: i, rects: o, middlewareData: a } = t,
            { offset: s = 0, mainAxis: u = !0, crossAxis: c = !0 } = io(e, t),
            d = {
              x: n,
              y: r,
            },
            h = Gr(i),
            p = BP(h);
          let v = d[p],
            b = d[h];
          const y = io(s, t),
            w =
              typeof y == "number"
                ? {
                    mainAxis: y,
                    crossAxis: 0,
                  }
                : {
                    mainAxis: 0,
                    crossAxis: 0,
                    ...y,
                  };
          if (u) {
            const _ = p === "y" ? "height" : "width",
              E = o.reference[p] - o.floating[_] + w.mainAxis,
              P = o.reference[p] + o.reference[_] - w.mainAxis;
            v < E ? (v = E) : v > P && (v = P);
          }
          if (c) {
            var x, S;
            const _ = p === "y" ? "width" : "height",
              E = _L.has(ti(i)),
              P =
                o.reference[h] -
                o.floating[_] +
                ((E && ((x = a.offset) == null ? void 0 : x[h])) || 0) +
                (E ? 0 : w.crossAxis),
              O =
                o.reference[h] +
                o.reference[_] +
                (E ? 0 : ((S = a.offset) == null ? void 0 : S[h]) || 0) -
                (E ? w.crossAxis : 0);
            b < P ? (b = P) : b > O && (b = O);
          }
          return {
            [p]: v,
            [h]: b,
          };
        },
      }
    );
  },
  XW = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, r;
          const { placement: i, rects: o, platform: a, elements: s } = t,
            { apply: u = () => {}, ...c } = io(e, t),
            d = await qP(t, c),
            h = ti(i),
            p = su(i),
            v = Gr(i) === "y",
            { width: b, height: y } = o.floating;
          let w, x;
          h === "top" || h === "bottom"
            ? ((w = h),
              (x =
                p === ((await (a.isRTL == null ? void 0 : a.isRTL(s.floating))) ? "start" : "end") ? "left" : "right"))
            : ((x = h), (w = p === "end" ? "top" : "bottom"));
          const S = y - d.top - d.bottom,
            _ = b - d.left - d.right,
            E = ei(y - d[w], S),
            P = ei(b - d[x], _),
            O = !t.middlewareData.shift;
          let k = E,
            R = P;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (R = _),
            (r = t.middlewareData.shift) != null && r.enabled.y && (k = S),
            O && !p)
          ) {
            const D = Cn(d.left, 0),
              I = Cn(d.right, 0),
              V = Cn(d.top, 0),
              z = Cn(d.bottom, 0);
            v
              ? (R = b - 2 * (D !== 0 || I !== 0 ? D + I : Cn(d.left, d.right)))
              : (k = y - 2 * (V !== 0 || z !== 0 ? V + z : Cn(d.top, d.bottom)));
          }
          await u({
            ...t,
            availableWidth: R,
            availableHeight: k,
          });
          const M = await a.getDimensions(s.floating);
          return b !== M.width || y !== M.height
            ? {
                reset: {
                  rects: !0,
                },
              }
            : {};
        },
      }
    );
  };
function PL(e) {
  const t = Tr(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = cr(e),
    o = i ? e.offsetWidth : n,
    a = i ? e.offsetHeight : r,
    s = Tp(n) !== o || Tp(r) !== a;
  return (
    s && ((n = o), (r = a)),
    {
      width: n,
      height: r,
      $: s,
    }
  );
}
function WP(e) {
  return Pt(e) ? e : e.contextElement;
}
function gl(e) {
  const t = WP(e);
  if (!cr(t)) return yi(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: o } = PL(t);
  let a = (o ? Tp(n.width) : n.width) / r,
    s = (o ? Tp(n.height) : n.height) / i;
  return (
    (!a || !Number.isFinite(a)) && (a = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    {
      x: a,
      y: s,
    }
  );
}
const ZW = yi(0);
function AL(e) {
  const t = Zn(e);
  return !ov() || !t.visualViewport
    ? ZW
    : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop,
      };
}
function QW(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== Zn(e)) ? !1 : t;
}
function us(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(),
    o = WP(e);
  let a = yi(1);
  t && (r ? Pt(r) && (a = gl(r)) : (a = gl(e)));
  const s = QW(o, n, r) ? AL(o) : yi(0);
  let u = (i.left + s.x) / a.x,
    c = (i.top + s.y) / a.y,
    d = i.width / a.x,
    h = i.height / a.y;
  if (o) {
    const p = Zn(o),
      v = r && Pt(r) ? Zn(r) : r;
    let b = p,
      y = uS(b);
    for (; y && r && v !== b; ) {
      const w = gl(y),
        x = y.getBoundingClientRect(),
        S = Tr(y),
        _ = x.left + (y.clientLeft + parseFloat(S.paddingLeft)) * w.x,
        E = x.top + (y.clientTop + parseFloat(S.paddingTop)) * w.y;
      (u *= w.x), (c *= w.y), (d *= w.x), (h *= w.y), (u += _), (c += E), (b = Zn(y)), (y = uS(b));
    }
  }
  return Cl({
    width: d,
    height: h,
    x: u,
    y: c,
  });
}
function sv(e, t) {
  const n = av(e).scrollLeft;
  return t ? t.left + n : us(Ei(e)).left + n;
}
function OL(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - sv(e, n),
    i = n.top + t.scrollTop;
  return {
    x: r,
    y: i,
  };
}
function JW(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
  const o = i === "fixed",
    a = Ei(r),
    s = t ? iv(t.floating) : !1;
  if (r === a || (s && o)) return n;
  let u = {
      scrollLeft: 0,
      scrollTop: 0,
    },
    c = yi(1);
  const d = yi(0),
    h = cr(r);
  if ((h || (!h && !o)) && ((au(r) !== "body" || td(a)) && (u = av(r)), cr(r))) {
    const v = us(r);
    (c = gl(r)), (d.x = v.x + r.clientLeft), (d.y = v.y + r.clientTop);
  }
  const p = a && !h && !o ? OL(a, u) : yi(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + d.x + p.x,
    y: n.y * c.y - u.scrollTop * c.y + d.y + p.y,
  };
}
function eU(e) {
  return Array.from(e.getClientRects());
}
function tU(e) {
  const t = Ei(e),
    n = av(e),
    r = e.ownerDocument.body,
    i = Cn(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    o = Cn(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + sv(e);
  const s = -n.scrollTop;
  return (
    Tr(r).direction === "rtl" && (a += Cn(t.clientWidth, r.clientWidth) - i),
    {
      width: i,
      height: o,
      x: a,
      y: s,
    }
  );
}
const Fk = 25;
function nU(e, t) {
  const n = Zn(e),
    r = Ei(e),
    i = n.visualViewport;
  let o = r.clientWidth,
    a = r.clientHeight,
    s = 0,
    u = 0;
  if (i) {
    (o = i.width), (a = i.height);
    const d = ov();
    (!d || (d && t === "fixed")) && ((s = i.offsetLeft), (u = i.offsetTop));
  }
  const c = sv(r);
  if (c <= 0) {
    const d = r.ownerDocument,
      h = d.body,
      p = getComputedStyle(h),
      v = (d.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
      b = Math.abs(r.clientWidth - h.clientWidth - v);
    b <= Fk && (o -= b);
  } else c <= Fk && (o += c);
  return {
    width: o,
    height: a,
    x: s,
    y: u,
  };
}
const rU = new Set(["absolute", "fixed"]);
function iU(e, t) {
  const n = us(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    o = cr(e) ? gl(e) : yi(1),
    a = e.clientWidth * o.x,
    s = e.clientHeight * o.y,
    u = i * o.x,
    c = r * o.y;
  return {
    width: a,
    height: s,
    x: u,
    y: c,
  };
}
function Vk(e, t, n) {
  let r;
  if (t === "viewport") r = nU(e, n);
  else if (t === "document") r = tU(Ei(e));
  else if (Pt(t)) r = iU(t, n);
  else {
    const i = AL(e);
    r = {
      x: t.x - i.x,
      y: t.y - i.y,
      width: t.width,
      height: t.height,
    };
  }
  return Cl(r);
}
function EL(e, t) {
  const n = ro(e);
  return n === t || !Pt(n) || oa(n) ? !1 : Tr(n).position === "fixed" || EL(n, t);
}
function oU(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Yi(e, [], !1).filter((s) => Pt(s) && au(s) !== "body"),
    i = null;
  const o = Tr(e).position === "fixed";
  let a = o ? ro(e) : e;
  for (; Pt(a) && !oa(a); ) {
    const s = Tr(a),
      u = LP(a);
    !u && s.position === "fixed" && (i = null),
      (o ? !u && !i : (!u && s.position === "static" && !!i && rU.has(i.position)) || (td(a) && !u && EL(e, a)))
        ? (r = r.filter((d) => d !== a))
        : (i = s),
      (a = ro(a));
  }
  return t.set(e, r), r;
}
function aU(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const a = [...(n === "clippingAncestors" ? (iv(t) ? [] : oU(t, this._c)) : [].concat(n)), r],
    s = a[0],
    u = a.reduce(
      (c, d) => {
        const h = Vk(t, d, i);
        return (
          (c.top = Cn(h.top, c.top)),
          (c.right = ei(h.right, c.right)),
          (c.bottom = ei(h.bottom, c.bottom)),
          (c.left = Cn(h.left, c.left)),
          c
        );
      },
      Vk(t, s, i),
    );
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top,
  };
}
function sU(e) {
  const { width: t, height: n } = PL(e);
  return {
    width: t,
    height: n,
  };
}
function lU(e, t, n) {
  const r = cr(t),
    i = Ei(t),
    o = n === "fixed",
    a = us(e, !0, o, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  const u = yi(0);
  function c() {
    u.x = sv(i);
  }
  if (r || (!r && !o))
    if (((au(t) !== "body" || td(i)) && (s = av(t)), r)) {
      const v = us(t, !0, o, t);
      (u.x = v.x + t.clientLeft), (u.y = v.y + t.clientTop);
    } else i && c();
  o && !r && i && c();
  const d = i && !r && !o ? OL(i, s) : yi(0),
    h = a.left + s.scrollLeft - u.x - d.x,
    p = a.top + s.scrollTop - u.y - d.y;
  return {
    x: h,
    y: p,
    width: a.width,
    height: a.height,
  };
}
function w0(e) {
  return Tr(e).position === "static";
}
function zk(e, t) {
  if (!cr(e) || Tr(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Ei(e) === n && (n = n.ownerDocument.body), n;
}
function TL(e, t) {
  const n = Zn(e);
  if (iv(e)) return n;
  if (!cr(e)) {
    let i = ro(e);
    for (; i && !oa(i); ) {
      if (Pt(i) && !w0(i)) return i;
      i = ro(i);
    }
    return n;
  }
  let r = zk(e, t);
  for (; r && vW(r) && w0(r); ) r = zk(r, t);
  return r && oa(r) && w0(r) && !LP(r) ? n : r || xW(e) || n;
}
const uU = async function (e) {
  const t = this.getOffsetParent || TL,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: lU(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height,
    },
  };
};
function cU(e) {
  return Tr(e).direction === "rtl";
}
const fU = {
  convertOffsetParentRelativeRectToViewportRelativeRect: JW,
  getDocumentElement: Ei,
  getClippingRect: aU,
  getOffsetParent: TL,
  getElementRects: uU,
  getClientRects: eU,
  getDimensions: sU,
  getScale: gl,
  isElement: Pt,
  isRTL: cU,
};
function CL(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function dU(e, t) {
  let n = null,
    r;
  const i = Ei(e);
  function o() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), (n = null);
  }
  function a(s, u) {
    s === void 0 && (s = !1), u === void 0 && (u = 1), o();
    const c = e.getBoundingClientRect(),
      { left: d, top: h, width: p, height: v } = c;
    if ((s || t(), !p || !v)) return;
    const b = Dh(h),
      y = Dh(i.clientWidth - (d + p)),
      w = Dh(i.clientHeight - (h + v)),
      x = Dh(d),
      _ = {
        rootMargin: -b + "px " + -y + "px " + -w + "px " + -x + "px",
        threshold: Cn(0, ei(1, u)) || 1,
      };
    let E = !0;
    function P(O) {
      const k = O[0].intersectionRatio;
      if (k !== u) {
        if (!E) return a();
        k
          ? a(!1, k)
          : (r = setTimeout(() => {
              a(!1, 1e-7);
            }, 1e3));
      }
      k === 1 && !CL(c, e.getBoundingClientRect()) && a(), (E = !1);
    }
    try {
      n = new IntersectionObserver(P, {
        ..._,
        root: i.ownerDocument,
      });
    } catch {
      n = new IntersectionObserver(P, _);
    }
    n.observe(e);
  }
  return a(!0), o;
}
function hU(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: a = typeof ResizeObserver == "function",
      layoutShift: s = typeof IntersectionObserver == "function",
      animationFrame: u = !1,
    } = r,
    c = WP(e),
    d = i || o ? [...(c ? Yi(c) : []), ...Yi(t)] : [];
  d.forEach((x) => {
    i &&
      x.addEventListener("scroll", n, {
        passive: !0,
      }),
      o && x.addEventListener("resize", n);
  });
  const h = c && s ? dU(c, n) : null;
  let p = -1,
    v = null;
  a &&
    ((v = new ResizeObserver((x) => {
      let [S] = x;
      S &&
        S.target === c &&
        v &&
        (v.unobserve(t),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var _;
          (_ = v) == null || _.observe(t);
        }))),
        n();
    })),
    c && !u && v.observe(c),
    v.observe(t));
  let b,
    y = u ? us(e) : null;
  u && w();
  function w() {
    const x = us(e);
    y && !CL(y, x) && n(), (y = x), (b = requestAnimationFrame(w));
  }
  return (
    n(),
    () => {
      var x;
      d.forEach((S) => {
        i && S.removeEventListener("scroll", n), o && S.removeEventListener("resize", n);
      }),
        h?.(),
        (x = v) == null || x.disconnect(),
        (v = null),
        u && cancelAnimationFrame(b);
    }
  );
}
const pU = KW,
  mU = GW,
  vU = qW,
  yU = XW,
  qk = zW,
  gU = UW,
  bU = YW,
  wU = (e, t, n) => {
    const r = new Map(),
      i = {
        platform: fU,
        ...n,
      },
      o = {
        ...i.platform,
        _c: r,
      };
    return VW(e, t, {
      ...i,
      platform: o,
    });
  };
var xU = typeof document < "u",
  SU = function () {},
  cp = xU ? React.useLayoutEffect : SU;
function kp(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!kp(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const o = i[r];
      if (!(o === "_owner" && e.$$typeof) && !kp(e[o], t[o])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function kL(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Wk(e, t) {
  const n = kL(e);
  return Math.round(t * n) / n;
}
function x0(e) {
  const t = React.useRef(e);
  return (
    cp(() => {
      t.current = e;
    }),
    t
  );
}
function _U(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: i,
      elements: { reference: o, floating: a } = {},
      transform: s = !0,
      whileElementsMounted: u,
      open: c,
    } = e,
    [d, h] = React.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, v] = React.useState(r);
  kp(p, r) || v(r);
  const [b, y] = React.useState(null),
    [w, x] = React.useState(null),
    S = React.useCallback((L) => {
      L !== O.current && ((O.current = L), y(L));
    }, []),
    _ = React.useCallback((L) => {
      L !== k.current && ((k.current = L), x(L));
    }, []),
    E = o || b,
    P = a || w,
    O = React.useRef(null),
    k = React.useRef(null),
    R = React.useRef(d),
    M = u != null,
    D = x0(u),
    I = x0(i),
    V = x0(c),
    z = React.useCallback(() => {
      if (!O.current || !k.current) return;
      const L = {
        placement: t,
        strategy: n,
        middleware: p,
      };
      I.current && (L.platform = I.current),
        wU(O.current, k.current, L).then((W) => {
          const G = {
            ...W,
            isPositioned: V.current !== !1,
          };
          q.current &&
            !kp(R.current, G) &&
            ((R.current = G),
            nv.flushSync(() => {
              h(G);
            }));
        });
    }, [p, t, n, I, V]);
  cp(() => {
    c === !1 &&
      R.current.isPositioned &&
      ((R.current.isPositioned = !1),
      h((L) => ({
        ...L,
        isPositioned: !1,
      })));
  }, [c]);
  const q = React.useRef(!1);
  cp(
    () => (
      (q.current = !0),
      () => {
        q.current = !1;
      }
    ),
    [],
  ),
    cp(() => {
      if ((E && (O.current = E), P && (k.current = P), E && P)) {
        if (D.current) return D.current(E, P, z);
        z();
      }
    }, [E, P, z, D, M]);
  const U = React.useMemo(
      () => ({
        reference: O,
        floating: k,
        setReference: S,
        setFloating: _,
      }),
      [S, _],
    ),
    B = React.useMemo(
      () => ({
        reference: E,
        floating: P,
      }),
      [E, P],
    ),
    F = React.useMemo(() => {
      const L = {
        position: n,
        left: 0,
        top: 0,
      };
      if (!B.floating) return L;
      const W = Wk(B.floating, d.x),
        G = Wk(B.floating, d.y);
      return s
        ? {
            ...L,
            transform: "translate(" + W + "px, " + G + "px)",
            ...(kL(B.floating) >= 1.5 && {
              willChange: "transform",
            }),
          }
        : {
            position: n,
            left: W,
            top: G,
          };
    }, [n, s, B.floating, d.x, d.y]);
  return React.useMemo(
    () => ({
      ...d,
      update: z,
      refs: U,
      elements: B,
      floatingStyles: F,
    }),
    [d, z, U, B, F],
  );
}
const PU = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: i } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? qk({
                element: r.current,
                padding: i,
              }).fn(n)
            : {}
          : r
            ? qk({
                element: r,
                padding: i,
              }).fn(n)
            : {};
      },
    };
  },
  jL = (e, t) => ({
    ...pU(e),
    options: [e, t],
  }),
  UP = (e, t) => ({
    ...mU(e),
    options: [e, t],
  }),
  Uk = (e, t) => ({
    ...bU(e),
    options: [e, t],
  }),
  jp = (e, t) => ({
    ...vU(e),
    options: [e, t],
  }),
  AU = (e, t) => ({
    ...yU(e),
    options: [e, t],
  }),
  Nc = (e, t) => ({
    ...gU(e),
    options: [e, t],
  }),
  RL = (e, t) => ({
    ...PU(e),
    options: [e, t],
  });
function OU(e) {
  return React.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((n) => {
              typeof n == "function" ? n(t) : n != null && (n.current = t);
            });
          },
    e,
  );
}
const ML = {
    ...$z,
  },
  EU = ML.useInsertionEffect,
  TU = EU || ((e) => e());
function Vi(e) {
  const t = React.useRef(() => {});
  return (
    TU(() => {
      t.current = e;
    }),
    React.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      return t.current == null ? void 0 : t.current(...r);
    }, [])
  );
}
var gi = typeof document < "u" ? React.useLayoutEffect : React.useEffect;
let Hk = !1,
  CU = 0;
const Kk = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + CU++;
function kU() {
  const [e, t] = React.useState(() => (Hk ? Kk() : void 0));
  return (
    gi(() => {
      e == null && t(Kk());
    }, []),
    React.useEffect(() => {
      Hk = !0;
    }, []),
    e
  );
}
const jU = ML.useId,
  NL = jU || kU;
function RU() {
  const e = new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((i) => i(n));
    },
    on(t, n) {
      e.set(t, [...(e.get(t) || []), n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((i) => i !== n)) || []);
    },
  };
}
const MU = React.createContext(null),
  NU = React.createContext(null),
  HP = () => {
    var e;
    return ((e = React.useContext(MU)) == null ? void 0 : e.id) || null;
  },
  KP = () => React.useContext(NU);
function GP(e) {
  return "data-floating-ui-" + e;
}
function S0(e) {
  const t = React.useRef(e);
  return (
    gi(() => {
      t.current = e;
    }),
    t
  );
}
const Gk = GP("safe-polygon");
function fp(e, t, n) {
  return n && !cS(n) ? 0 : typeof e == "number" ? e : e?.[t];
}
function IU(e, t) {
  t === void 0 && (t = {});
  const { open: n, onOpenChange: r, dataRef: i, events: o, elements: a } = e,
    { enabled: s = !0, delay: u = 0, handleClose: c = null, mouseOnly: d = !1, restMs: h = 0, move: p = !0 } = t,
    v = KP(),
    b = HP(),
    y = S0(c),
    w = S0(u),
    x = S0(n),
    S = React.useRef(),
    _ = React.useRef(-1),
    E = React.useRef(),
    P = React.useRef(-1),
    O = React.useRef(!0),
    k = React.useRef(!1),
    R = React.useRef(() => {}),
    M = React.useRef(!1),
    D = React.useCallback(() => {
      var F;
      const L = (F = i.current.openEvent) == null ? void 0 : F.type;
      return L?.includes("mouse") && L !== "mousedown";
    }, [i]);
  React.useEffect(() => {
    if (!s) return;
    function F(L) {
      let { open: W } = L;
      W || (clearTimeout(_.current), clearTimeout(P.current), (O.current = !0), (M.current = !1));
    }
    return (
      o.on("openchange", F),
      () => {
        o.off("openchange", F);
      }
    );
  }, [s, o]),
    React.useEffect(() => {
      if (!s || !y.current || !n) return;
      function F(W) {
        D() && r(!1, W, "hover");
      }
      const L = Ua(a.floating).documentElement;
      return (
        L.addEventListener("mouseleave", F),
        () => {
          L.removeEventListener("mouseleave", F);
        }
      );
    }, [a.floating, n, r, s, y, D]);
  const I = React.useCallback(
      function (F, L, W) {
        L === void 0 && (L = !0), W === void 0 && (W = "hover");
        const G = fp(w.current, "close", S.current);
        G && !E.current
          ? (clearTimeout(_.current), (_.current = window.setTimeout(() => r(!1, F, W), G)))
          : L && (clearTimeout(_.current), r(!1, F, W));
      },
      [w, r],
    ),
    V = Vi(() => {
      R.current(), (E.current = void 0);
    }),
    z = Vi(() => {
      if (k.current) {
        const F = Ua(a.floating).body;
        (F.style.pointerEvents = ""), F.removeAttribute(Gk), (k.current = !1);
      }
    }),
    q = Vi(() => (i.current.openEvent ? ["click", "mousedown"].includes(i.current.openEvent.type) : !1));
  React.useEffect(() => {
    if (!s) return;
    function F($) {
      if ((clearTimeout(_.current), (O.current = !1), (d && !cS(S.current)) || (h > 0 && !fp(w.current, "open"))))
        return;
      const K = fp(w.current, "open", S.current);
      K
        ? (_.current = window.setTimeout(() => {
            x.current || r(!0, $, "hover");
          }, K))
        : n || r(!0, $, "hover");
    }
    function L($) {
      if (q()) return;
      R.current();
      const K = Ua(a.floating);
      if ((clearTimeout(P.current), (M.current = !1), y.current && i.current.floatingContext)) {
        n || clearTimeout(_.current),
          (E.current = y.current({
            ...i.current.floatingContext,
            tree: v,
            x: $.clientX,
            y: $.clientY,
            onClose() {
              z(), V(), q() || I($, !0, "safe-polygon");
            },
          }));
        const he = E.current;
        K.addEventListener("mousemove", he),
          (R.current = () => {
            K.removeEventListener("mousemove", he);
          });
        return;
      }
      (S.current !== "touch" || !Qc(a.floating, $.relatedTarget)) && I($);
    }
    function W($) {
      q() ||
        (i.current.floatingContext &&
          (y.current == null ||
            y.current({
              ...i.current.floatingContext,
              tree: v,
              x: $.clientX,
              y: $.clientY,
              onClose() {
                z(), V(), q() || I($);
              },
            })($)));
    }
    if (Pt(a.domReference)) {
      var G;
      const $ = a.domReference;
      return (
        n && $.addEventListener("mouseleave", W),
        (G = a.floating) == null || G.addEventListener("mouseleave", W),
        p &&
          $.addEventListener("mousemove", F, {
            once: !0,
          }),
        $.addEventListener("mouseenter", F),
        $.addEventListener("mouseleave", L),
        () => {
          var K;
          n && $.removeEventListener("mouseleave", W),
            (K = a.floating) == null || K.removeEventListener("mouseleave", W),
            p && $.removeEventListener("mousemove", F),
            $.removeEventListener("mouseenter", F),
            $.removeEventListener("mouseleave", L);
        }
      );
    }
  }, [a, s, e, d, h, p, I, V, z, r, n, x, v, w, y, i, q]),
    gi(() => {
      var F;
      if (s && n && (F = y.current) != null && F.__options.blockPointerEvents && D()) {
        k.current = !0;
        const W = a.floating;
        if (Pt(a.domReference) && W) {
          var L;
          const G = Ua(a.floating).body;
          G.setAttribute(Gk, "");
          const $ = a.domReference,
            K =
              v == null || (L = v.nodesRef.current.find((ne) => ne.id === b)) == null || (L = L.context) == null
                ? void 0
                : L.elements.floating;
          return (
            K && (K.style.pointerEvents = ""),
            (G.style.pointerEvents = "none"),
            ($.style.pointerEvents = "auto"),
            (W.style.pointerEvents = "auto"),
            () => {
              (G.style.pointerEvents = ""), ($.style.pointerEvents = ""), (W.style.pointerEvents = "");
            }
          );
        }
      }
    }, [s, n, b, a, v, y, D]),
    gi(() => {
      n || ((S.current = void 0), (M.current = !1), V(), z());
    }, [n, V, z]),
    React.useEffect(
      () => () => {
        V(), clearTimeout(_.current), clearTimeout(P.current), z();
      },
      [s, a.domReference, V, z],
    );
  const U = React.useMemo(() => {
      function F(L) {
        S.current = L.pointerType;
      }
      return {
        onPointerDown: F,
        onPointerEnter: F,
        onMouseMove(L) {
          const { nativeEvent: W } = L;
          function G() {
            !O.current && !x.current && r(!0, W, "hover");
          }
          (d && !cS(S.current)) ||
            n ||
            h === 0 ||
            (M.current && L.movementX ** 2 + L.movementY ** 2 < 2) ||
            (clearTimeout(P.current),
            S.current === "touch" ? G() : ((M.current = !0), (P.current = window.setTimeout(G, h))));
        },
      };
    }, [d, r, n, x, h]),
    B = React.useMemo(
      () => ({
        onMouseEnter() {
          clearTimeout(_.current);
        },
        onMouseLeave(F) {
          q() || I(F.nativeEvent, !1);
        },
      }),
      [I, q],
    );
  return React.useMemo(
    () =>
      s
        ? {
            reference: U,
            floating: B,
          }
        : {},
    [s, U, B],
  );
}
const hS = () => {},
  IL = React.createContext({
    delay: 0,
    initialDelay: 0,
    timeoutMs: 0,
    currentId: null,
    setCurrentId: hS,
    setState: hS,
    isInstantPhase: !1,
  }),
  DU = () => React.useContext(IL);
function $U(e) {
  const { children: t, delay: n, timeoutMs: r = 0 } = e,
    [i, o] = React.useReducer(
      (u, c) => ({
        ...u,
        ...c,
      }),
      {
        delay: n,
        timeoutMs: r,
        initialDelay: n,
        currentId: null,
        isInstantPhase: !1,
      },
    ),
    a = React.useRef(null),
    s = React.useCallback((u) => {
      o({
        currentId: u,
      });
    }, []);
  return (
    gi(() => {
      i.currentId
        ? a.current === null
          ? (a.current = i.currentId)
          : i.isInstantPhase ||
            o({
              isInstantPhase: !0,
            })
        : (i.isInstantPhase &&
            o({
              isInstantPhase: !1,
            }),
          (a.current = null));
    }, [i.currentId, i.isInstantPhase]),
    React.createElement(
      IL.Provider,
      {
        value: React.useMemo(
          () => ({
            ...i,
            setState: o,
            setCurrentId: s,
          }),
          [i, s],
        ),
      },
      t,
    )
  );
}
function LU(e, t) {
  t === void 0 && (t = {});
  const { open: n, onOpenChange: r, floatingId: i } = e,
    { id: o, enabled: a = !0 } = t,
    s = o ?? i,
    u = DU(),
    { currentId: c, setCurrentId: d, initialDelay: h, setState: p, timeoutMs: v } = u;
  return (
    gi(() => {
      a &&
        c &&
        (p({
          delay: {
            open: 1,
            close: fp(h, "close"),
          },
        }),
        c !== s && r(!1));
    }, [a, s, r, p, c, h]),
    gi(() => {
      function b() {
        r(!1),
          p({
            delay: h,
            currentId: null,
          });
      }
      if (a && c && !n && c === s) {
        if (v) {
          const y = window.setTimeout(b, v);
          return () => {
            clearTimeout(y);
          };
        }
        b();
      }
    }, [a, n, p, c, s, r, h, v]),
    gi(() => {
      a && (d === hS || !n || d(s));
    }, [a, n, d, s]),
    u
  );
}
function _0(e, t) {
  let n = e.filter((i) => {
      var o;
      return i.parentId === t && ((o = i.context) == null ? void 0 : o.open);
    }),
    r = n;
  for (; r.length; )
    (r = e.filter((i) => {
      var o;
      return (o = r) == null
        ? void 0
        : o.some((a) => {
            var s;
            return i.parentId === a.id && ((s = i.context) == null ? void 0 : s.open);
          });
    })),
      (n = n.concat(r));
  return n;
}
const BU = "data-floating-ui-focusable",
  FU = {
    pointerdown: "onPointerDown",
    mousedown: "onMouseDown",
    click: "onClick",
  },
  VU = {
    pointerdown: "onPointerDownCapture",
    mousedown: "onMouseDownCapture",
    click: "onClickCapture",
  },
  Yk = (e) => {
    var t, n;
    return {
      escapeKey: typeof e == "boolean" ? e : (t = e?.escapeKey) != null ? t : !1,
      outsidePress: typeof e == "boolean" ? e : (n = e?.outsidePress) != null ? n : !0,
    };
  };
function zU(e, t) {
  t === void 0 && (t = {});
  const { open: n, onOpenChange: r, elements: i, dataRef: o } = e,
    {
      enabled: a = !0,
      escapeKey: s = !0,
      outsidePress: u = !0,
      outsidePressEvent: c = "pointerdown",
      referencePress: d = !1,
      referencePressEvent: h = "pointerdown",
      ancestorScroll: p = !1,
      bubbles: v,
      capture: b,
    } = t,
    y = KP(),
    w = Vi(typeof u == "function" ? u : () => !1),
    x = typeof u == "function" ? w : u,
    S = React.useRef(!1),
    _ = React.useRef(!1),
    { escapeKey: E, outsidePress: P } = Yk(v),
    { escapeKey: O, outsidePress: k } = Yk(b),
    R = React.useRef(!1),
    M = Vi((U) => {
      var B;
      if (!n || !a || !s || U.key !== "Escape" || R.current) return;
      const F = (B = o.current.floatingContext) == null ? void 0 : B.nodeId,
        L = y ? _0(y.nodesRef.current, F) : [];
      if (!E && (U.stopPropagation(), L.length > 0)) {
        let W = !0;
        if (
          (L.forEach((G) => {
            var $;
            if (($ = G.context) != null && $.open && !G.context.dataRef.current.__escapeKeyBubbles) {
              W = !1;
              return;
            }
          }),
          !W)
        )
          return;
      }
      r(!1, EW(U) ? U.nativeEvent : U, "escape-key");
    }),
    D = Vi((U) => {
      var B;
      const F = () => {
        var L;
        M(U), (L = rl(U)) == null || L.removeEventListener("keydown", F);
      };
      (B = rl(U)) == null || B.addEventListener("keydown", F);
    }),
    I = Vi((U) => {
      var B;
      const F = S.current;
      S.current = !1;
      const L = _.current;
      if (((_.current = !1), (c === "click" && L) || F || (typeof x == "function" && !x(U)))) return;
      const W = rl(U),
        G = "[" + GP("inert") + "]",
        $ = Ua(i.floating).querySelectorAll(G);
      let K = Pt(W) ? W : null;
      for (; K && !oa(K); ) {
        const pe = ro(K);
        if (oa(pe) || !Pt(pe)) break;
        K = pe;
      }
      if ($.length && Pt(W) && !TW(W) && !Qc(W, i.floating) && Array.from($).every((pe) => !Qc(K, pe))) return;
      if (cr(W) && q) {
        const pe = W.clientWidth > 0 && W.scrollWidth > W.clientWidth,
          Pe = W.clientHeight > 0 && W.scrollHeight > W.clientHeight;
        let xe = Pe && U.offsetX > W.clientWidth;
        if (
          (Pe && Tr(W).direction === "rtl" && (xe = U.offsetX <= W.offsetWidth - W.clientWidth),
          xe || (pe && U.offsetY > W.clientHeight))
        )
          return;
      }
      const ne = (B = o.current.floatingContext) == null ? void 0 : B.nodeId,
        he =
          y &&
          _0(y.nodesRef.current, ne).some((pe) => {
            var Pe;
            return b0(U, (Pe = pe.context) == null ? void 0 : Pe.elements.floating);
          });
      if (b0(U, i.floating) || b0(U, i.domReference) || he) return;
      const le = y ? _0(y.nodesRef.current, ne) : [];
      if (le.length > 0) {
        let pe = !0;
        if (
          (le.forEach((Pe) => {
            var xe;
            if ((xe = Pe.context) != null && xe.open && !Pe.context.dataRef.current.__outsidePressBubbles) {
              pe = !1;
              return;
            }
          }),
          !pe)
        )
          return;
      }
      r(!1, U, "outside-press");
    }),
    V = Vi((U) => {
      var B;
      const F = () => {
        var L;
        I(U), (L = rl(U)) == null || L.removeEventListener(c, F);
      };
      (B = rl(U)) == null || B.addEventListener(c, F);
    });
  React.useEffect(() => {
    if (!n || !a) return;
    (o.current.__escapeKeyBubbles = E), (o.current.__outsidePressBubbles = P);
    let U = -1;
    function B($) {
      r(!1, $, "ancestor-scroll");
    }
    function F() {
      window.clearTimeout(U), (R.current = !0);
    }
    function L() {
      U = window.setTimeout(
        () => {
          R.current = !1;
        },
        ov() ? 5 : 0,
      );
    }
    const W = Ua(i.floating);
    s &&
      (W.addEventListener("keydown", O ? D : M, O),
      W.addEventListener("compositionstart", F),
      W.addEventListener("compositionend", L)),
      x && W.addEventListener(c, k ? V : I, k);
    let G = [];
    return (
      p &&
        (Pt(i.domReference) && (G = Yi(i.domReference)),
        Pt(i.floating) && (G = G.concat(Yi(i.floating))),
        !Pt(i.reference) &&
          i.reference &&
          i.reference.contextElement &&
          (G = G.concat(Yi(i.reference.contextElement)))),
      (G = G.filter(($) => {
        var K;
        return $ !== ((K = W.defaultView) == null ? void 0 : K.visualViewport);
      })),
      G.forEach(($) => {
        $.addEventListener("scroll", B, {
          passive: !0,
        });
      }),
      () => {
        s &&
          (W.removeEventListener("keydown", O ? D : M, O),
          W.removeEventListener("compositionstart", F),
          W.removeEventListener("compositionend", L)),
          x && W.removeEventListener(c, k ? V : I, k),
          G.forEach(($) => {
            $.removeEventListener("scroll", B);
          }),
          window.clearTimeout(U);
      }
    );
  }, [o, i, s, x, c, n, r, p, a, E, P, M, O, D, I, k, V]),
    React.useEffect(() => {
      S.current = !1;
    }, [x, c]);
  const z = React.useMemo(
      () => ({
        onKeyDown: M,
        [FU[h]]: (U) => {
          d && r(!1, U.nativeEvent, "reference-press");
        },
      }),
      [M, r, d, h],
    ),
    q = React.useMemo(
      () => ({
        onKeyDown: M,
        onMouseDown() {
          _.current = !0;
        },
        onMouseUp() {
          _.current = !0;
        },
        [VU[c]]: () => {
          S.current = !0;
        },
      }),
      [M, c],
    );
  return React.useMemo(
    () =>
      a
        ? {
            reference: z,
            floating: q,
          }
        : {},
    [a, z, q],
  );
}
function qU(e) {
  const { open: t = !1, onOpenChange: n, elements: r } = e,
    i = NL(),
    o = React.useRef({}),
    [a] = React.useState(() => RU()),
    s = HP() != null,
    [u, c] = React.useState(r.reference),
    d = Vi((v, b, y) => {
      (o.current.openEvent = v ? b : void 0),
        a.emit("openchange", {
          open: v,
          event: b,
          reason: y,
          nested: s,
        }),
        n?.(v, b, y);
    }),
    h = React.useMemo(
      () => ({
        setPositionReference: c,
      }),
      [],
    ),
    p = React.useMemo(
      () => ({
        reference: u || r.reference || null,
        floating: r.floating || null,
        domReference: r.reference,
      }),
      [u, r.reference, r.floating],
    );
  return React.useMemo(
    () => ({
      dataRef: o,
      open: t,
      onOpenChange: d,
      elements: p,
      events: a,
      floatingId: i,
      refs: h,
    }),
    [t, d, p, a, i, h],
  );
}
function YP(e) {
  e === void 0 && (e = {});
  const { nodeId: t } = e,
    n = qU({
      ...e,
      elements: {
        reference: null,
        floating: null,
        ...e.elements,
      },
    }),
    r = e.rootContext || n,
    i = r.elements,
    [o, a] = React.useState(null),
    [s, u] = React.useState(null),
    d = i?.domReference || o,
    h = React.useRef(null),
    p = KP();
  gi(() => {
    d && (h.current = d);
  }, [d]);
  const v = _U({
      ...e,
      elements: {
        ...i,
        ...(s && {
          reference: s,
        }),
      },
    }),
    b = React.useCallback(
      (_) => {
        const E = Pt(_)
          ? {
              getBoundingClientRect: () => _.getBoundingClientRect(),
              contextElement: _,
            }
          : _;
        u(E), v.refs.setReference(E);
      },
      [v.refs],
    ),
    y = React.useCallback(
      (_) => {
        (Pt(_) || _ === null) && ((h.current = _), a(_)),
          (Pt(v.refs.reference.current) || v.refs.reference.current === null || (_ !== null && !Pt(_))) &&
            v.refs.setReference(_);
      },
      [v.refs],
    ),
    w = React.useMemo(
      () => ({
        ...v.refs,
        setReference: y,
        setPositionReference: b,
        domReference: h,
      }),
      [v.refs, y, b],
    ),
    x = React.useMemo(
      () => ({
        ...v.elements,
        domReference: d,
      }),
      [v.elements, d],
    ),
    S = React.useMemo(
      () => ({
        ...v,
        ...r,
        refs: w,
        elements: x,
        nodeId: t,
      }),
      [v, w, x, t, r],
    );
  return (
    gi(() => {
      r.dataRef.current.floatingContext = S;
      const _ = p?.nodesRef.current.find((E) => E.id === t);
      _ && (_.context = S);
    }),
    React.useMemo(
      () => ({
        ...v,
        context: S,
        refs: w,
        elements: x,
      }),
      [v, w, x, S],
    )
  );
}
function WU(e, t) {
  t === void 0 && (t = {});
  const { open: n, onOpenChange: r, events: i, dataRef: o, elements: a } = e,
    { enabled: s = !0, visibleOnly: u = !0 } = t,
    c = React.useRef(!1),
    d = React.useRef(),
    h = React.useRef(!0);
  React.useEffect(() => {
    if (!s) return;
    const v = Zn(a.domReference);
    function b() {
      !n && cr(a.domReference) && a.domReference === Ik(Ua(a.domReference)) && (c.current = !0);
    }
    function y() {
      h.current = !0;
    }
    return (
      v.addEventListener("blur", b),
      v.addEventListener("keydown", y, !0),
      () => {
        v.removeEventListener("blur", b), v.removeEventListener("keydown", y, !0);
      }
    );
  }, [a.domReference, n, s]),
    React.useEffect(() => {
      if (!s) return;
      function v(b) {
        let { reason: y } = b;
        (y === "reference-press" || y === "escape-key") && (c.current = !0);
      }
      return (
        i.on("openchange", v),
        () => {
          i.off("openchange", v);
        }
      );
    }, [i, s]),
    React.useEffect(
      () => () => {
        clearTimeout(d.current);
      },
      [],
    );
  const p = React.useMemo(
    () => ({
      onPointerDown(v) {
        _W(v.nativeEvent) || (h.current = !1);
      },
      onMouseLeave() {
        c.current = !1;
      },
      onFocus(v) {
        if (c.current) return;
        const b = rl(v.nativeEvent);
        if (u && Pt(b))
          try {
            if (PW() && AW()) throw Error();
            if (!b.matches(":focus-visible")) return;
          } catch {
            if (!h.current && !kW(b)) return;
          }
        r(!0, v.nativeEvent, "focus");
      },
      onBlur(v) {
        c.current = !1;
        const b = v.relatedTarget,
          y = v.nativeEvent,
          w = Pt(b) && b.hasAttribute(GP("focus-guard")) && b.getAttribute("data-type") === "outside";
        d.current = window.setTimeout(() => {
          var x;
          const S = Ik(a.domReference ? a.domReference.ownerDocument : document);
          (!b && S === a.domReference) ||
            Qc((x = o.current.floatingContext) == null ? void 0 : x.refs.floating.current, S) ||
            Qc(a.domReference, S) ||
            w ||
            r(!1, y, "focus");
        });
      },
    }),
    [o, a.domReference, r, u],
  );
  return React.useMemo(
    () =>
      s
        ? {
            reference: p,
          }
        : {},
    [s, p],
  );
}
const Xk = "active",
  Zk = "selected";
function P0(e, t, n) {
  const r = new Map(),
    i = n === "item";
  let o = e;
  if (i && e) {
    const { [Xk]: a, [Zk]: s, ...u } = e;
    o = u;
  }
  return {
    ...(n === "floating" && {
      tabIndex: -1,
      [BU]: "",
    }),
    ...o,
    ...t
      .map((a) => {
        const s = a ? a[n] : null;
        return typeof s == "function" ? (e ? s(e) : null) : s;
      })
      .concat(e)
      .reduce(
        (a, s) => (
          s &&
            Object.entries(s).forEach((u) => {
              let [c, d] = u;
              if (!(i && [Xk, Zk].includes(c)))
                if (c.indexOf("on") === 0) {
                  if ((r.has(c) || r.set(c, []), typeof d == "function")) {
                    var h;
                    (h = r.get(c)) == null || h.push(d),
                      (a[c] = function () {
                        for (var p, v = arguments.length, b = new Array(v), y = 0; y < v; y++) b[y] = arguments[y];
                        return (p = r.get(c)) == null ? void 0 : p.map((w) => w(...b)).find((w) => w !== void 0);
                      });
                  }
                } else a[c] = d;
            }),
          a
        ),
        {},
      ),
  };
}
function UU(e) {
  e === void 0 && (e = []);
  const t = e.map((s) => s?.reference),
    n = e.map((s) => s?.floating),
    r = e.map((s) => s?.item),
    i = React.useCallback((s) => P0(s, e, "reference"), t),
    o = React.useCallback((s) => P0(s, e, "floating"), n),
    a = React.useCallback((s) => P0(s, e, "item"), r);
  return React.useMemo(
    () => ({
      getReferenceProps: i,
      getFloatingProps: o,
      getItemProps: a,
    }),
    [i, o, a],
  );
}
const HU = new Map([
  ["select", "listbox"],
  ["combobox", "listbox"],
  ["label", !1],
]);
function KU(e, t) {
  var n;
  t === void 0 && (t = {});
  const { open: r, floatingId: i } = e,
    { enabled: o = !0, role: a = "dialog" } = t,
    s = (n = HU.get(a)) != null ? n : a,
    u = NL(),
    d = HP() != null,
    h = React.useMemo(
      () =>
        s === "tooltip" || a === "label"
          ? {
              ["aria-" + (a === "label" ? "labelledby" : "describedby")]: r ? i : void 0,
            }
          : {
              "aria-expanded": r ? "true" : "false",
              "aria-haspopup": s === "alertdialog" ? "dialog" : s,
              "aria-controls": r ? i : void 0,
              ...(s === "listbox" && {
                role: "combobox",
              }),
              ...(s === "menu" && {
                id: u,
              }),
              ...(s === "menu" &&
                d && {
                  role: "menuitem",
                }),
              ...(a === "select" && {
                "aria-autocomplete": "none",
              }),
              ...(a === "combobox" && {
                "aria-autocomplete": "list",
              }),
            },
      [s, i, d, r, u, a],
    ),
    p = React.useMemo(() => {
      const b = {
        id: i,
        ...(s && {
          role: s,
        }),
      };
      return s === "tooltip" || a === "label"
        ? b
        : {
            ...b,
            ...(s === "menu" && {
              "aria-labelledby": u,
            }),
          };
    }, [s, i, u, a]),
    v = React.useCallback(
      (b) => {
        let { active: y, selected: w } = b;
        const x = {
          role: "option",
          ...(y && {
            id: i + "-option",
          }),
        };
        switch (a) {
          case "select":
            return {
              ...x,
              "aria-selected": y && w,
            };
          case "combobox":
            return {
              ...x,
              ...(y && {
                "aria-selected": !0,
              }),
            };
        }
        return {};
      },
      [i, a],
    );
  return React.useMemo(
    () =>
      o
        ? {
            reference: h,
            floating: p,
            item: v,
          }
        : {},
    [o, h, p, v],
  );
}
