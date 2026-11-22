function MZ(e) {
  const t = React.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const ZA = React.createContext(null),
  JB = React.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function NZ(e = !0) {
  const t = React.useContext(ZA);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: r, register: i } = t,
    o = React.useId();
  React.useEffect(() => {
    e && i(o);
  }, [e]);
  const a = React.useCallback(() => e && r && r(o), [o, r, e]);
  return !n && r ? [!1, a] : [!0];
}
const QA = typeof window < "u",
  IZ = QA ? React.useLayoutEffect : React.useEffect,
  ur = (e) => e;
let eF = ur;
function JA(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Nl = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  Ji = (e) => e * 1e3,
  eo = (e) => e / 1e3,
  DZ = {
    useManualTiming: !1,
  };
function $Z(e) {
  let t = new Set(),
    n = new Set(),
    r = !1,
    i = !1;
  const o = new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1,
  };
  function s(c) {
    o.has(c) && (u.schedule(c), e()), c(a);
  }
  const u = {
    schedule: (c, d = !1, h = !1) => {
      const v = h && r ? t : n;
      return d && o.add(c), v.has(c) || v.add(c), c;
    },
    cancel: (c) => {
      n.delete(c), o.delete(c);
    },
    process: (c) => {
      if (((a = c), r)) {
        i = !0;
        return;
      }
      (r = !0), ([t, n] = [n, t]), t.forEach(s), t.clear(), (r = !1), i && ((i = !1), u.process(c));
    },
  };
  return u;
}
const Hh = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"],
  LZ = 40;
function tF(e, t) {
  let n = !1,
    r = !0;
  const i = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    o = () => (n = !0),
    a = Hh.reduce((x, S) => ((x[S] = $Z(o)), x), {}),
    { read: s, resolveKeyframes: u, update: c, preRender: d, render: h, postRender: p } = a,
    v = () => {
      const x = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(x - i.timestamp, LZ), 1)),
        (i.timestamp = x),
        (i.isProcessing = !0),
        s.process(i),
        u.process(i),
        c.process(i),
        d.process(i),
        h.process(i),
        p.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(v));
    },
    b = () => {
      (n = !0), (r = !0), i.isProcessing || e(v);
    };
  return {
    schedule: Hh.reduce((x, S) => {
      const _ = a[S];
      return (x[S] = (E, P = !1, O = !1) => (n || b(), _.schedule(E, P, O))), x;
    }, {}),
    cancel: (x) => {
      for (let S = 0; S < Hh.length; S++) a[Hh[S]].cancel(x);
    },
    state: i,
    steps: a,
  };
}
const {
    schedule: Ot,
    cancel: ca,
    state: pn,
    steps: q0,
  } = tF(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ur, !0),
  nF = React.createContext({
    strict: !1,
  }),
  qj = {
    animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Il = {};
for (const e in qj)
  Il[e] = {
    isEnabled: (t) => qj[e].some((n) => !!t[n]),
  };
function BZ(e) {
  for (const t in e)
    Il[t] = {
      ...Il[t],
      ...e[t],
    };
}
const FZ = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Kp(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    FZ.has(e)
  );
}
let rF = (e) => !Kp(e);
function VZ(e) {
  e && (rF = (t) => (t.startsWith("on") ? !Kp(t) : e(t)));
}
try {
  VZ(require("@emotion/is-prop-valid").default);
} catch {}
function zZ(e, t, n) {
  const r = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((rF(i) || (n === !0 && Kp(i)) || (!t && !Kp(i)) || (e.draggable && i.startsWith("onDrag"))) && (r[i] = e[i]));
  return r;
}
function qZ(e) {
  if (typeof Proxy > "u") return e;
  const t = new Map(),
    n = (...r) => e(...r);
  return new Proxy(n, {
    get: (r, i) => (i === "create" ? e : (t.has(i) || t.set(i, e(i)), t.get(i))),
  });
}
const jv = React.createContext({});
function ff(e) {
  return typeof e == "string" || Array.isArray(e);
}
function Rv(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const eO = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  tO = ["initial", ...eO];
function Mv(e) {
  return Rv(e.animate) || tO.some((t) => ff(e[t]));
}
function iF(e) {
  return !!(Mv(e) || e.variants);
}
function WZ(e, t) {
  if (Mv(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || ff(n) ? n : void 0,
      animate: ff(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function UZ(e) {
  const { initial: t, animate: n } = WZ(e, React.useContext(jv));
  return React.useMemo(
    () => ({
      initial: t,
      animate: n,
    }),
    [Wj(t), Wj(n)],
  );
}
function Wj(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const HZ = Symbol.for("motionComponentSymbol");
function ul(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function KZ(e, t, n) {
  return React.useCallback(
    (r) => {
      r && e.onMount && e.onMount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : ul(n) && (n.current = r));
    },
    [t],
  );
}
const nO = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  GZ = "framerAppearId",
  oF = "data-" + nO(GZ),
  { schedule: rO } = tF(queueMicrotask, !1),
  aF = React.createContext({});
function YZ(e, t, n, r, i) {
  var o, a;
  const { visualElement: s } = React.useContext(jv),
    u = React.useContext(nF),
    c = React.useContext(ZA),
    d = React.useContext(JB).reducedMotion,
    h = React.useRef(null);
  (r = r || u.renderer),
    !h.current &&
      r &&
      (h.current = r(e, {
        visualState: t,
        parent: s,
        props: n,
        presenceContext: c,
        blockInitialAnimation: c ? c.initial === !1 : !1,
        reducedMotionConfig: d,
      }));
  const p = h.current,
    v = React.useContext(aF);
  p && !p.projection && i && (p.type === "html" || p.type === "svg") && XZ(h.current, n, i, v);
  const b = React.useRef(!1);
  React.useInsertionEffect(() => {
    p && b.current && p.update(n, c);
  });
  const y = n[oF],
    w = React.useRef(
      !!y &&
        !(!((o = window.MotionHandoffIsComplete) === null || o === void 0) && o.call(window, y)) &&
        ((a = window.MotionHasOptimisedAnimation) === null || a === void 0 ? void 0 : a.call(window, y)),
    );
  return (
    IZ(() => {
      p &&
        ((b.current = !0),
        (window.MotionIsMounted = !0),
        p.updateFeatures(),
        rO.render(p.render),
        w.current && p.animationState && p.animationState.animateChanges());
    }),
    React.useEffect(() => {
      p &&
        (!w.current && p.animationState && p.animationState.animateChanges(),
        w.current &&
          (queueMicrotask(() => {
            var x;
            (x = window.MotionHandoffMarkAsComplete) === null || x === void 0 || x.call(window, y);
          }),
          (w.current = !1)));
    }),
    p
  );
}
function XZ(e, t, n, r) {
  const { layoutId: i, layout: o, drag: a, dragConstraints: s, layoutScroll: u, layoutRoot: c } = t;
  (e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : sF(e.parent))),
    e.projection.setOptions({
      layoutId: i,
      layout: o,
      alwaysMeasureLayout: !!a || (s && ul(s)),
      visualElement: e,
      animationType: typeof o == "string" ? o : "both",
      initialPromotionConfig: r,
      layoutScroll: u,
      layoutRoot: c,
    });
}
function sF(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : sF(e.parent);
}
function ZZ({ preloadedFeatures: e, createVisualElement: t, useRender: n, useVisualState: r, Component: i }) {
  var o, a;
  e && BZ(e);
  function s(c, d) {
    let h;
    const p = {
        ...React.useContext(JB),
        ...c,
        layoutId: QZ(c),
      },
      { isStatic: v } = p,
      b = UZ(c),
      y = r(c, v);
    if (!v && QA) {
      JZ();
      const w = eQ(p);
      (h = w.MeasureLayout), (b.visualElement = YZ(i, y, p, t, w.ProjectionNode));
    }
    return jsxRuntime.jsxs(jv.Provider, {
      value: b,
      children: [
        h && b.visualElement
          ? jsxRuntime.jsx(h, {
              visualElement: b.visualElement,
              ...p,
            })
          : null,
        n(i, c, KZ(y, b.visualElement, d), y, v, b.visualElement),
      ],
    });
  }
  s.displayName = `motion.${typeof i == "string" ? i : `create(${(a = (o = i.displayName) !== null && o !== void 0 ? o : i.name) !== null && a !== void 0 ? a : ""})`}`;
  const u = React.forwardRef(s);
  return (u[HZ] = i), u;
}
function QZ({ layoutId: e }) {
  const t = React.useContext(QB).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function JZ(e, t) {
  React.useContext(nF).strict;
}
function eQ(e) {
  const { drag: t, layout: n } = Il;
  if (!t && !n) return {};
  const r = {
    ...t,
    ...n,
  };
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode,
  };
}
const tQ = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function iO(e) {
  return typeof e != "string" || e.includes("-") ? !1 : !!(tQ.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function Uj(e) {
  const t = [{}, {}];
  return (
    e?.values.forEach((n, r) => {
      (t[0][r] = n.get()), (t[1][r] = n.getVelocity());
    }),
    t
  );
}
function oO(e, t, n, r) {
  if (typeof t == "function") {
    const [i, o] = Uj(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  if ((typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function")) {
    const [i, o] = Uj(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  return t;
}
const YS = (e) => Array.isArray(e),
  nQ = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  rQ = (e) => (YS(e) ? e[e.length - 1] || 0 : e),
  Mn = (e) => !!(e && e.getVelocity);
function _p(e) {
  const t = Mn(e) ? e.get() : e;
  return nQ(t) ? t.toValue() : t;
}
function iQ({ scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: n }, r, i, o) {
  const a = {
    latestValues: oQ(r, i, o, e),
    renderState: t(),
  };
  return (
    n &&
      ((a.onMount = (s) =>
        n({
          props: r,
          current: s,
          ...a,
        })),
      (a.onUpdate = (s) => n(s))),
    a
  );
}
const lF = (e) => (t, n) => {
  const r = React.useContext(jv),
    i = React.useContext(ZA),
    o = () => iQ(e, t, r, i);
  return n ? o() : MZ(o);
};
function oQ(e, t, n, r) {
  const i = {},
    o = r(e, {});
  for (const p in o) i[p] = _p(o[p]);
  let { initial: a, animate: s } = e;
  const u = Mv(e),
    c = iF(e);
  t && c && !u && e.inherit !== !1 && (a === void 0 && (a = t.initial), s === void 0 && (s = t.animate));
  let d = n ? n.initial === !1 : !1;
  d = d || a === !1;
  const h = d ? s : a;
  if (h && typeof h != "boolean" && !Rv(h)) {
    const p = Array.isArray(h) ? h : [h];
    for (let v = 0; v < p.length; v++) {
      const b = oO(e, p[v]);
      if (b) {
        const { transitionEnd: y, transition: w, ...x } = b;
        for (const S in x) {
          let _ = x[S];
          if (Array.isArray(_)) {
            const E = d ? _.length - 1 : 0;
            _ = _[E];
          }
          _ !== null && (i[S] = _);
        }
        for (const S in y) i[S] = y[S];
      }
    }
  }
  return i;
}
const yu = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  bs = new Set(yu),
  uF = (e) => (t) => typeof t == "string" && t.startsWith(e),
  cF = uF("--"),
  aQ = uF("var(--"),
  aO = (e) => (aQ(e) ? sQ.test(e.split("/*")[0].trim()) : !1),
  sQ = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  fF = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  lo = (e, t, n) => (n > t ? t : n < e ? e : n),
  gu = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  df = {
    ...gu,
    transform: (e) => lo(0, 1, e),
  },
  Kh = {
    ...gu,
    default: 1,
  },
  cd = (e) => ({
    test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  Wo = cd("deg"),
  bi = cd("%"),
  qe = cd("px"),
  lQ = cd("vh"),
  uQ = cd("vw"),
  Hj = {
    ...bi,
    parse: (e) => bi.parse(e) / 100,
    transform: (e) => bi.transform(e * 100),
  },
  cQ = {
    borderWidth: qe,
    borderTopWidth: qe,
    borderRightWidth: qe,
    borderBottomWidth: qe,
    borderLeftWidth: qe,
    borderRadius: qe,
    radius: qe,
    borderTopLeftRadius: qe,
    borderTopRightRadius: qe,
    borderBottomRightRadius: qe,
    borderBottomLeftRadius: qe,
    width: qe,
    maxWidth: qe,
    height: qe,
    maxHeight: qe,
    top: qe,
    right: qe,
    bottom: qe,
    left: qe,
    padding: qe,
    paddingTop: qe,
    paddingRight: qe,
    paddingBottom: qe,
    paddingLeft: qe,
    margin: qe,
    marginTop: qe,
    marginRight: qe,
    marginBottom: qe,
    marginLeft: qe,
    backgroundPositionX: qe,
    backgroundPositionY: qe,
  },
  fQ = {
    rotate: Wo,
    rotateX: Wo,
    rotateY: Wo,
    rotateZ: Wo,
    scale: Kh,
    scaleX: Kh,
    scaleY: Kh,
    scaleZ: Kh,
    skew: Wo,
    skewX: Wo,
    skewY: Wo,
    distance: qe,
    translateX: qe,
    translateY: qe,
    translateZ: qe,
    x: qe,
    y: qe,
    z: qe,
    perspective: qe,
    transformPerspective: qe,
    opacity: df,
    originX: Hj,
    originY: Hj,
    originZ: qe,
  },
  Kj = {
    ...gu,
    transform: Math.round,
  },
  sO = {
    ...cQ,
    ...fQ,
    zIndex: Kj,
    size: qe,
    fillOpacity: df,
    strokeOpacity: df,
    numOctaves: Kj,
  },
  dQ = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  hQ = yu.length;
function pQ(e, t, n) {
  let r = "",
    i = !0;
  for (let o = 0; o < hQ; o++) {
    const a = yu[o],
      s = e[a];
    if (s === void 0) continue;
    let u = !0;
    if ((typeof s == "number" ? (u = s === (a.startsWith("scale") ? 1 : 0)) : (u = parseFloat(s) === 0), !u || n)) {
      const c = fF(s, sO[a]);
      if (!u) {
        i = !1;
        const d = dQ[a] || a;
        r += `${d}(${c}) `;
      }
      n && (t[a] = c);
    }
  }
  return (r = r.trim()), n ? (r = n(t, i ? "" : r)) : i && (r = "none"), r;
}
function lO(e, t, n) {
  const { style: r, vars: i, transformOrigin: o } = e;
  let a = !1,
    s = !1;
  for (const u in t) {
    const c = t[u];
    if (bs.has(u)) {
      a = !0;
      continue;
    } else if (cF(u)) {
      i[u] = c;
      continue;
    } else {
      const d = fF(c, sO[u]);
      u.startsWith("origin") ? ((s = !0), (o[u] = d)) : (r[u] = d);
    }
  }
  if ((t.transform || (a || n ? (r.transform = pQ(t, e.transform, n)) : r.transform && (r.transform = "none")), s)) {
    const { originX: u = "50%", originY: c = "50%", originZ: d = 0 } = o;
    r.transformOrigin = `${u} ${c} ${d}`;
  }
}
const mQ = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
  },
  vQ = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
  };
function yQ(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? mQ : vQ;
  e[o.offset] = qe.transform(-r);
  const a = qe.transform(t),
    s = qe.transform(n);
  e[o.array] = `${a} ${s}`;
}
function Gj(e, t, n) {
  return typeof e == "string" ? e : qe.transform(t + n * e);
}
function gQ(e, t, n) {
  const r = Gj(t, e.x, e.width),
    i = Gj(n, e.y, e.height);
  return `${r} ${i}`;
}
function uO(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: a,
    pathSpacing: s = 1,
    pathOffset: u = 0,
    ...c
  },
  d,
  h,
) {
  if ((lO(e, c, h), d)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: p, style: v, dimensions: b } = e;
  p.transform && (b && (v.transform = p.transform), delete p.transform),
    b &&
      (i !== void 0 || o !== void 0 || v.transform) &&
      (v.transformOrigin = gQ(b, i !== void 0 ? i : 0.5, o !== void 0 ? o : 0.5)),
    t !== void 0 && (p.x = t),
    n !== void 0 && (p.y = n),
    r !== void 0 && (p.scale = r),
    a !== void 0 && yQ(p, a, s, u, !1);
}
const cO = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {},
  }),
  dF = () => ({
    ...cO(),
    attrs: {},
  }),
  fO = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function hF(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const o in n) e.style.setProperty(o, n[o]);
}
const pF = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function mF(e, t, n, r) {
  hF(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(pF.has(i) ? i : nO(i), t.attrs[i]);
}
const Gp = {};
function bQ(e) {
  Object.assign(Gp, e);
}
function vF(e, { layout: t, layoutId: n }) {
  return bs.has(e) || e.startsWith("origin") || ((t || n !== void 0) && (!!Gp[e] || e === "opacity"));
}
function dO(e, t, n) {
  var r;
  const { style: i } = e,
    o = {};
  for (const a in i)
    (Mn(i[a]) ||
      (t.style && Mn(t.style[a])) ||
      vF(a, e) ||
      ((r = n?.getValue(a)) === null || r === void 0 ? void 0 : r.liveStyle) !== void 0) &&
      (o[a] = i[a]);
  return o;
}
function yF(e, t, n) {
  const r = dO(e, t, n);
  for (const i in e)
    if (Mn(e[i]) || Mn(t[i])) {
      const o = yu.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      r[o] = e[i];
    }
  return r;
}
function wQ(e, t) {
  try {
    t.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
  } catch {
    t.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }
}
const Yj = ["x", "y", "width", "height", "cx", "cy", "r"],
  xQ = {
    useVisualState: lF({
      scrapeMotionValuesFromProps: yF,
      createRenderState: dF,
      onUpdate: ({ props: e, prevProps: t, current: n, renderState: r, latestValues: i }) => {
        if (!n) return;
        let o = !!e.drag;
        if (!o) {
          for (const s in i)
            if (bs.has(s)) {
              o = !0;
              break;
            }
        }
        if (!o) return;
        let a = !t;
        if (t)
          for (let s = 0; s < Yj.length; s++) {
            const u = Yj[s];
            e[u] !== t[u] && (a = !0);
          }
        a &&
          Ot.read(() => {
            wQ(n, r),
              Ot.render(() => {
                uO(r, i, fO(n.tagName), e.transformTemplate), mF(n, r);
              });
          });
      },
    }),
  },
  SQ = {
    useVisualState: lF({
      scrapeMotionValuesFromProps: dO,
      createRenderState: cO,
    }),
  };
function gF(e, t, n) {
  for (const r in t) !Mn(t[r]) && !vF(r, n) && (e[r] = t[r]);
}
function _Q({ transformTemplate: e }, t) {
  return React.useMemo(() => {
    const n = cO();
    return lO(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function PQ(e, t) {
  const n = e.style || {},
    r = {};
  return gF(r, n, e), Object.assign(r, _Q(e, t)), r;
}
function AQ(e, t) {
  const n = {},
    r = PQ(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
      (r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = r),
    n
  );
}
function OQ(e, t, n, r) {
  const i = React.useMemo(() => {
    const o = dF();
    return (
      uO(o, t, fO(r), e.transformTemplate),
      {
        ...o.attrs,
        style: {
          ...o.style,
        },
      }
    );
  }, [t]);
  if (e.style) {
    const o = {};
    gF(o, e.style, e),
      (i.style = {
        ...o,
        ...i.style,
      });
  }
  return i;
}
function EQ(e = !1) {
  return (n, r, i, { latestValues: o }, a) => {
    const u = (iO(n) ? OQ : AQ)(r, o, a, n),
      c = zZ(r, typeof n == "string", e),
      d =
        n !== React.Fragment
          ? {
              ...c,
              ...u,
              ref: i,
            }
          : {},
      { children: h } = r,
      p = React.useMemo(() => (Mn(h) ? h.get() : h), [h]);
    return React.createElement(n, {
      ...d,
      children: p,
    });
  };
}
function TQ(e, t) {
  return function (
    r,
    { forwardMotionProps: i } = {
      forwardMotionProps: !1,
    },
  ) {
    const a = {
      ...(iO(r) ? xQ : SQ),
      preloadedFeatures: e,
      useRender: EQ(i),
      createVisualElement: t,
      Component: r,
    };
    return ZZ(a);
  };
}
function bF(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function Nv(e, t, n) {
  const r = e.getProps();
  return oO(r, t, n !== void 0 ? n : r.custom, e);
}
const CQ = JA(() => window.ScrollTimeline !== void 0);
class kQ {
  constructor(t) {
    (this.stop = () => this.runAll("stop")), (this.animations = t.filter(Boolean));
  }
  get finished() {
    return Promise.all(this.animations.map((t) => ("finished" in t ? t.finished : t)));
  }
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][t] = n;
  }
  attachTimeline(t, n) {
    const r = this.animations.map((i) => {
      if (CQ() && i.attachTimeline) return i.attachTimeline(t);
      if (typeof n == "function") return n(i);
    });
    return () => {
      r.forEach((i, o) => {
        i && i(), this.animations[o].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++) t = Math.max(t, this.animations[n].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class jQ extends kQ {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n);
  }
}
function hO(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
const XS = 2e4;
function wF(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < XS; ) (t += n), (r = e.next(t));
  return t >= XS ? 1 / 0 : t;
}
function pO(e) {
  return typeof e == "function";
}
function Xj(e, t) {
  (e.timeline = t), (e.onfinish = null);
}
const mO = (e) => Array.isArray(e) && typeof e[0] == "number",
  RQ = {
    linearEasing: void 0,
  };
function MQ(e, t) {
  const n = JA(e);
  return () => {
    var r;
    return (r = RQ[t]) !== null && r !== void 0 ? r : n();
  };
}
const Yp = MQ(() => {
    try {
      document.createElement("div").animate(
        {
          opacity: 0,
        },
        {
          easing: "linear(0, 1)",
        },
      );
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  xF = (e, t, n = 10) => {
    let r = "";
    const i = Math.max(Math.round(t / n), 2);
    for (let o = 0; o < i; o++) r += e(Nl(0, i - 1, o)) + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  };
function SF(e) {
  return !!(
    (typeof e == "function" && Yp()) ||
    !e ||
    (typeof e == "string" && (e in ZS || Yp())) ||
    mO(e) ||
    (Array.isArray(e) && e.every(SF))
  );
}
const Tc = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  ZS = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Tc([0, 0.65, 0.55, 1]),
    circOut: Tc([0.55, 0, 1, 0.45]),
    backIn: Tc([0.31, 0.01, 0.66, -0.59]),
    backOut: Tc([0.33, 1.53, 0.69, 0.99]),
  };
function _F(e, t) {
  if (e)
    return typeof e == "function" && Yp()
      ? xF(e, t)
      : mO(e)
        ? Tc(e)
        : Array.isArray(e)
          ? e.map((n) => _F(n, t) || ZS.easeOut)
          : ZS[e];
}
const Ur = {
  x: !1,
  y: !1,
};
function PF() {
  return Ur.x || Ur.y;
}
function NQ(e, t, n) {
  var r;
  if (e instanceof Element) return [e];
  if (typeof e == "string") {
    let i = document;
    const o = (r = void 0) !== null && r !== void 0 ? r : i.querySelectorAll(e);
    return o ? Array.from(o) : [];
  }
  return Array.from(e);
}
function AF(e, t) {
  const n = NQ(e),
    r = new AbortController(),
    i = {
      passive: !0,
      ...t,
      signal: r.signal,
    };
  return [n, i, () => r.abort()];
}
function Zj(e) {
  return (t) => {
    t.pointerType === "touch" || PF() || e(t);
  };
}
function IQ(e, t, n = {}) {
  const [r, i, o] = AF(e, n),
    a = Zj((s) => {
      const { target: u } = s,
        c = t(s);
      if (typeof c != "function" || !u) return;
      const d = Zj((h) => {
        c(h), u.removeEventListener("pointerleave", d);
      });
      u.addEventListener("pointerleave", d, i);
    });
  return (
    r.forEach((s) => {
      s.addEventListener("pointerenter", a, i);
    }),
    o
  );
}
const OF = (e, t) => (t ? (e === t ? !0 : OF(e, t.parentElement)) : !1),
  vO = (e) => (e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1),
  DQ = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function $Q(e) {
  return DQ.has(e.tagName) || e.tabIndex !== -1;
}
const Cc = new WeakSet();
function Qj(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function W0(e, t) {
  e.dispatchEvent(
    new PointerEvent("pointer" + t, {
      isPrimary: !0,
      bubbles: !0,
    }),
  );
}
const LQ = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const r = Qj(() => {
    if (Cc.has(n)) return;
    W0(n, "down");
    const i = Qj(() => {
        W0(n, "up");
      }),
      o = () => W0(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", o, t);
  });
  n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
function Jj(e) {
  return vO(e) && !PF();
}
function BQ(e, t, n = {}) {
  const [r, i, o] = AF(e, n),
    a = (s) => {
      const u = s.currentTarget;
      if (!Jj(s) || Cc.has(u)) return;
      Cc.add(u);
      const c = t(s),
        d = (v, b) => {
          window.removeEventListener("pointerup", h),
            window.removeEventListener("pointercancel", p),
            !(!Jj(v) || !Cc.has(u)) &&
              (Cc.delete(u),
              typeof c == "function" &&
                c(v, {
                  success: b,
                }));
        },
        h = (v) => {
          d(v, n.useGlobalTarget || OF(u, v.target));
        },
        p = (v) => {
          d(v, !1);
        };
      window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", p, i);
    };
  return (
    r.forEach((s) => {
      !$Q(s) && s.getAttribute("tabindex") === null && (s.tabIndex = 0),
        (n.useGlobalTarget ? window : s).addEventListener("pointerdown", a, i),
        s.addEventListener("focus", (c) => LQ(c, i), i);
    }),
    o
  );
}
function FQ(e) {
  return e === "x" || e === "y"
    ? Ur[e]
      ? null
      : ((Ur[e] = !0),
        () => {
          Ur[e] = !1;
        })
    : Ur.x || Ur.y
      ? null
      : ((Ur.x = Ur.y = !0),
        () => {
          Ur.x = Ur.y = !1;
        });
}
const EF = new Set(["width", "height", "top", "left", "right", "bottom", ...yu]);
let Pp;
function VQ() {
  Pp = void 0;
}
const wi = {
  now: () => (Pp === void 0 && wi.set(pn.isProcessing || DZ.useManualTiming ? pn.timestamp : performance.now()), Pp),
  set: (e) => {
    (Pp = e), queueMicrotask(VQ);
  },
};
function yO(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function gO(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class bO {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return yO(this.subscriptions, t), () => gO(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const a = this.subscriptions[o];
          a && a(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function TF(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const eR = 30,
  zQ = (e) => !isNaN(parseFloat(e));
class qQ {
  constructor(t, n = {}) {
    (this.version = "11.18.2"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const o = wi.now();
        this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev && this.events.change && this.events.change.notify(this.current),
          i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner);
  }
  setCurrent(t) {
    (this.current = t),
      (this.updatedAt = wi.now()),
      this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = zQ(this.current));
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new bO());
    const r = this.events[t].add(n);
    return t === "change"
      ? () => {
          r(),
            Ot.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
  }
  set(t, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(t, n) : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n), (this.prev = void 0), (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(t, n = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = wi.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > eR) return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, eR);
    return TF(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function hf(e, t) {
  return new qQ(e, t);
}
function WQ(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, hf(n));
}
function UQ(e, t) {
  const n = Nv(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {};
  o = {
    ...o,
    ...r,
  };
  for (const a in o) {
    const s = rQ(o[a]);
    WQ(e, a, s);
  }
}
function HQ(e) {
  return !!(Mn(e) && e.add);
}
function QS(e, t) {
  const n = e.getValue("willChange");
  if (HQ(n)) return n.add(t);
}
function CF(e) {
  return e.props[oF];
}
const kF = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  KQ = 1e-7,
  GQ = 12;
function YQ(e, t, n, r, i) {
  let o,
    a,
    s = 0;
  do (a = t + (n - t) / 2), (o = kF(a, r, i) - e), o > 0 ? (n = a) : (t = a);
  while (Math.abs(o) > KQ && ++s < GQ);
  return a;
}
function fd(e, t, n, r) {
  if (e === t && n === r) return ur;
  const i = (o) => YQ(o, 0, 1, e, n);
  return (o) => (o === 0 || o === 1 ? o : kF(i(o), t, r));
}
const jF = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  RF = (e) => (t) => 1 - e(1 - t),
  MF = fd(0.33, 1.53, 0.69, 0.99),
  wO = RF(MF),
  NF = jF(wO),
  IF = (e) => ((e *= 2) < 1 ? 0.5 * wO(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  xO = (e) => 1 - Math.sin(Math.acos(e)),
  DF = RF(xO),
  $F = jF(xO),
  LF = (e) => /^0[^.\s]+$/u.test(e);
function XQ(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || LF(e) : !0;
}
const Fc = (e) => Math.round(e * 1e5) / 1e5,
  SO = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ZQ(e) {
  return e == null;
}
const QQ =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  _O = (e, t) => (n) =>
    !!(
      (typeof n == "string" && QQ.test(n) && n.startsWith(e)) ||
      (t && !ZQ(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  BF = (e, t, n) => (r) => {
    if (typeof r != "string") return r;
    const [i, o, a, s] = r.match(SO);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(a),
      alpha: s !== void 0 ? parseFloat(s) : 1,
    };
  },
  JQ = (e) => lo(0, 255, e),
  U0 = {
    ...gu,
    transform: (e) => Math.round(JQ(e)),
  },
  Ga = {
    test: _O("rgb", "red"),
    parse: BF("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" + U0.transform(e) + ", " + U0.transform(t) + ", " + U0.transform(n) + ", " + Fc(df.transform(r)) + ")",
  };
function eJ(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)), (n = e.substring(3, 5)), (r = e.substring(5, 7)), (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const JS = {
    test: _O("#"),
    parse: eJ,
    transform: Ga.transform,
  },
  cl = {
    test: _O("hsl", "hue"),
    parse: BF("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      bi.transform(Fc(t)) +
      ", " +
      bi.transform(Fc(n)) +
      ", " +
      Fc(df.transform(r)) +
      ")",
  },
  On = {
    test: (e) => Ga.test(e) || JS.test(e) || cl.test(e),
    parse: (e) => (Ga.test(e) ? Ga.parse(e) : cl.test(e) ? cl.parse(e) : JS.parse(e)),
    transform: (e) => (typeof e == "string" ? e : e.hasOwnProperty("red") ? Ga.transform(e) : cl.transform(e)),
  },
  tJ =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function nJ(e) {
  var t, n;
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (((t = e.match(SO)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(tJ)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const FF = "number",
  VF = "color",
  rJ = "var",
  iJ = "var(",
  tR = "${}",
  oJ =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function pf(e) {
  const t = e.toString(),
    n = [],
    r = {
      color: [],
      number: [],
      var: [],
    },
    i = [];
  let o = 0;
  const s = t
    .replace(
      oJ,
      (u) => (
        On.test(u)
          ? (r.color.push(o), i.push(VF), n.push(On.parse(u)))
          : u.startsWith(iJ)
            ? (r.var.push(o), i.push(rJ), n.push(u))
            : (r.number.push(o), i.push(FF), n.push(parseFloat(u))),
        ++o,
        tR
      ),
    )
    .split(tR);
  return {
    values: n,
    split: s,
    indexes: r,
    types: i,
  };
}
function zF(e) {
  return pf(e).values;
}
function qF(e) {
  const { split: t, types: n } = pf(e),
    r = t.length;
  return (i) => {
    let o = "";
    for (let a = 0; a < r; a++)
      if (((o += t[a]), i[a] !== void 0)) {
        const s = n[a];
        s === FF ? (o += Fc(i[a])) : s === VF ? (o += On.transform(i[a])) : (o += i[a]);
      }
    return o;
  };
}
const aJ = (e) => (typeof e == "number" ? 0 : e);
function sJ(e) {
  const t = zF(e);
  return qF(e)(t.map(aJ));
}
const fa = {
    test: nJ,
    parse: zF,
    createTransformer: qF,
    getAnimatableNone: sJ,
  },
  lJ = new Set(["brightness", "contrast", "saturate", "opacity"]);
function uJ(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(SO) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let o = lJ.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + "(" + o + i + ")";
}
const cJ = /\b([a-z-]*)\(.*?\)/gu,
  e_ = {
    ...fa,
    getAnimatableNone: (e) => {
      const t = e.match(cJ);
      return t ? t.map(uJ).join(" ") : e;
    },
  },
  fJ = {
    ...sO,
    color: On,
    backgroundColor: On,
    outlineColor: On,
    fill: On,
    stroke: On,
    borderColor: On,
    borderTopColor: On,
    borderRightColor: On,
    borderBottomColor: On,
    borderLeftColor: On,
    filter: e_,
    WebkitFilter: e_,
  },
  PO = (e) => fJ[e];
function WF(e, t) {
  let n = PO(e);
  return n !== e_ && (n = fa), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const dJ = new Set(["auto", "none", "0"]);
function hJ(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i; ) {
    const o = e[r];
    typeof o == "string" && !dJ.has(o) && pf(o).values.length && (i = e[r]), r++;
  }
  if (i && n) for (const o of t) e[o] = WF(n, i);
}
const nR = (e) => e === gu || e === qe,
  rR = (e, t) => parseFloat(e.split(", ")[t]),
  iR =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/u);
      if (i) return rR(i[1], t);
      {
        const o = r.match(/^matrix\((.+)\)$/u);
        return o ? rR(o[1], e) : 0;
      }
    },
  pJ = new Set(["x", "y", "z"]),
  mJ = yu.filter((e) => !pJ.has(e));
function vJ(e) {
  const t = [];
  return (
    mJ.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const Dl = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: iR(4, 13),
  y: iR(5, 14),
};
Dl.translateX = Dl.x;
Dl.translateY = Dl.y;
const is = new Set();
let t_ = !1,
  n_ = !1;
function UF() {
  if (n_) {
    const e = Array.from(is).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map();
    t.forEach((r) => {
      const i = vJ(r);
      i.length && (n.set(r, i), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render();
        const i = n.get(r);
        i &&
          i.forEach(([o, a]) => {
            var s;
            (s = r.getValue(o)) === null || s === void 0 || s.set(a);
          });
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (n_ = !1), (t_ = !1), is.forEach((e) => e.complete()), is.clear();
}
function HF() {
  is.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (n_ = !0);
  });
}
function yJ() {
  HF(), UF();
}
class AO {
  constructor(t, n, r, i, o, a = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = o),
      (this.isAsync = a);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (is.add(this), t_ || ((t_ = !0), Ot.read(HF), Ot.resolveKeyframes(UF)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: i } = this;
    for (let o = 0; o < t.length; o++)
      if (t[o] === null)
        if (o === 0) {
          const a = i?.get(),
            s = t[t.length - 1];
          if (a !== void 0) t[0] = a;
          else if (r && n) {
            const u = r.readValue(n, s);
            u != null && (t[0] = u);
          }
          t[0] === void 0 && (t[0] = s), i && a === void 0 && i.set(t[0]);
        } else t[o] = t[o - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0), this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), is.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), is.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const KF = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  gJ = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function bJ(e) {
  const t = gJ.exec(e);
  if (!t) return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
function GF(e, t, n = 1) {
  const [r, i] = bJ(e);
  if (!r) return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    const a = o.trim();
    return KF(a) ? parseFloat(a) : a;
  }
  return aO(i) ? GF(i, t, n + 1) : i;
}
const YF = (e) => (t) => t.test(e),
  wJ = {
    test: (e) => e === "auto",
    parse: (e) => e,
  },
  XF = [gu, qe, bi, Wo, uQ, lQ, wJ],
  oR = (e) => XF.find(YF(e));
class ZF extends AO {
  constructor(t, n, r, i, o) {
    super(t, n, r, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let u = 0; u < t.length; u++) {
      let c = t[u];
      if (typeof c == "string" && ((c = c.trim()), aO(c))) {
        const d = GF(c, n.current);
        d !== void 0 && (t[u] = d), u === t.length - 1 && (this.finalKeyframe = c);
      }
    }
    if ((this.resolveNoneKeyframes(), !EF.has(r) || t.length !== 2)) return;
    const [i, o] = t,
      a = oR(i),
      s = oR(o);
    if (a !== s)
      if (nR(a) && nR(s))
        for (let u = 0; u < t.length; u++) {
          const c = t[u];
          typeof c == "string" && (t[u] = parseFloat(c));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = [];
    for (let i = 0; i < t.length; i++) XQ(t[i]) && r.push(i);
    r.length && hJ(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t || !t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Dl[r](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n || !n.current) return;
    const o = n.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const a = i.length - 1,
      s = i[a];
    (i[a] = Dl[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      s !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = s),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([u, c]) => {
          n.getValue(u).set(c);
        }),
      this.resolveNoneKeyframes();
  }
}
const aR = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" && (fa.test(e) || e === "0") && !e.startsWith("url("))
      );
function xJ(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function SJ(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const o = e[e.length - 1],
    a = aR(i, t),
    s = aR(o, t);
  return !a || !s ? !1 : xJ(e) || ((n === "spring" || pO(n)) && r);
}
const _J = (e) => e !== null;
function Iv(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(_J),
    o = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !o || r === void 0 ? i[o] : r;
}
const PJ = 40;
class QF {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: o = 0,
    repeatType: a = "loop",
    ...s
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = wi.now()),
      (this.options = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: o,
        repeatType: a,
        ...s,
      }),
      this.updateFinishedPromise();
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > PJ
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && yJ(), this._resolved;
  }
  onKeyframesResolved(t, n) {
    (this.resolvedAt = wi.now()), (this.hasAttemptedResolve = !0);
    const { name: r, type: i, velocity: o, delay: a, onComplete: s, onUpdate: u, isGenerator: c } = this.options;
    if (!c && !SJ(t, r, i, o))
      if (a) this.options.duration = 0;
      else {
        u && u(Iv(t, this.options, n)), s && s(), this.resolveFinishedPromise();
        return;
      }
    const d = this.initPlayback(t, n);
    d !== !1 &&
      ((this._resolved = {
        keyframes: t,
        finalKeyframe: n,
        ...d,
      }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  flatten() {
    (this.options.type = "keyframes"), (this.options.ease = "linear");
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
const Mt = (e, t, n) => e + (t - e) * n;
function H0(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function AJ({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    o = 0,
    a = 0;
  if (!t) i = o = a = n;
  else {
    const s = n < 0.5 ? n * (1 + t) : n + t - n * t,
      u = 2 * n - s;
    (i = H0(u, s, e + 1 / 3)), (o = H0(u, s, e)), (a = H0(u, s, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(a * 255),
    alpha: r,
  };
}
function Xp(e, t) {
  return (n) => (n > 0 ? t : e);
}
const K0 = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  OJ = [JS, Ga, cl],
  EJ = (e) => OJ.find((t) => t.test(e));
function sR(e) {
  const t = EJ(e);
  if (!t) return !1;
  let n = t.parse(e);
  return t === cl && (n = AJ(n)), n;
}
const lR = (e, t) => {
    const n = sR(e),
      r = sR(t);
    if (!n || !r) return Xp(e, t);
    const i = {
      ...n,
    };
    return (o) => (
      (i.red = K0(n.red, r.red, o)),
      (i.green = K0(n.green, r.green, o)),
      (i.blue = K0(n.blue, r.blue, o)),
      (i.alpha = Mt(n.alpha, r.alpha, o)),
      Ga.transform(i)
    );
  },
  TJ = (e, t) => (n) => t(e(n)),
  dd = (...e) => e.reduce(TJ),
  r_ = new Set(["none", "hidden"]);
function CJ(e, t) {
  return r_.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function kJ(e, t) {
  return (n) => Mt(e, t, n);
}
function OO(e) {
  return typeof e == "number"
    ? kJ
    : typeof e == "string"
      ? aO(e)
        ? Xp
        : On.test(e)
          ? lR
          : MJ
      : Array.isArray(e)
        ? JF
        : typeof e == "object"
          ? On.test(e)
            ? lR
            : jJ
          : Xp;
}
function JF(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((o, a) => OO(o)(o, t[a]));
  return (o) => {
    for (let a = 0; a < r; a++) n[a] = i[a](o);
    return n;
  };
}
function jJ(e, t) {
  const n = {
      ...e,
      ...t,
    },
    r = {};
  for (const i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = OO(e[i])(e[i], t[i]));
  return (i) => {
    for (const o in r) n[o] = r[o](i);
    return n;
  };
}
function RJ(e, t) {
  var n;
  const r = [],
    i = {
      color: 0,
      var: 0,
      number: 0,
    };
  for (let o = 0; o < t.values.length; o++) {
    const a = t.types[o],
      s = e.indexes[a][i[a]],
      u = (n = e.values[s]) !== null && n !== void 0 ? n : 0;
    (r[o] = u), i[a]++;
  }
  return r;
}
const MJ = (e, t) => {
  const n = fa.createTransformer(t),
    r = pf(e),
    i = pf(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (r_.has(e) && !i.values.length) || (r_.has(t) && !r.values.length)
      ? CJ(e, t)
      : dd(JF(RJ(r, i), i.values), n)
    : Xp(e, t);
};
function e4(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? Mt(e, t, n) : OO(e)(e, t);
}
const NJ = 5;
function t4(e, t, n) {
  const r = Math.max(t - NJ, 0);
  return TF(n - e(r), t - r);
}
const $t = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: {
      granular: 0.01,
      default: 2,
    },
    restDelta: {
      granular: 0.005,
      default: 0.5,
    },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  G0 = 0.001;
function IJ({ duration: e = $t.duration, bounce: t = $t.bounce, velocity: n = $t.velocity, mass: r = $t.mass }) {
  let i,
    o,
    a = 1 - t;
  (a = lo($t.minDamping, $t.maxDamping, a)),
    (e = lo($t.minDuration, $t.maxDuration, eo(e))),
    a < 1
      ? ((i = (c) => {
          const d = c * a,
            h = d * e,
            p = d - n,
            v = i_(c, a),
            b = Math.exp(-h);
          return G0 - (p / v) * b;
        }),
        (o = (c) => {
          const h = c * a * e,
            p = h * n + n,
            v = Math.pow(a, 2) * Math.pow(c, 2) * e,
            b = Math.exp(-h),
            y = i_(Math.pow(c, 2), a);
          return ((-i(c) + G0 > 0 ? -1 : 1) * ((p - v) * b)) / y;
        }))
      : ((i = (c) => {
          const d = Math.exp(-c * e),
            h = (c - n) * e + 1;
          return -G0 + d * h;
        }),
        (o = (c) => {
          const d = Math.exp(-c * e),
            h = (n - c) * (e * e);
          return d * h;
        }));
  const s = 5 / e,
    u = $J(i, o, s);
  if (((e = Ji(e)), isNaN(u)))
    return {
      stiffness: $t.stiffness,
      damping: $t.damping,
      duration: e,
    };
  {
    const c = Math.pow(u, 2) * r;
    return {
      stiffness: c,
      damping: a * 2 * Math.sqrt(r * c),
      duration: e,
    };
  }
}
const DJ = 12;
function $J(e, t, n) {
  let r = n;
  for (let i = 1; i < DJ; i++) r = r - e(r) / t(r);
  return r;
}
function i_(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const LJ = ["duration", "bounce"],
  BJ = ["stiffness", "damping", "mass"];
function uR(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function FJ(e) {
  let t = {
    velocity: $t.velocity,
    stiffness: $t.stiffness,
    damping: $t.damping,
    mass: $t.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!uR(e, BJ) && uR(e, LJ))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        i = r * r,
        o = 2 * lo(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = {
        ...t,
        mass: $t.mass,
        stiffness: i,
        damping: o,
      };
    } else {
      const n = IJ(e);
      (t = {
        ...t,
        ...n,
        mass: $t.mass,
      }),
        (t.isResolvedFromDuration = !0);
    }
  return t;
}
function n4(e = $t.visualDuration, t = $t.bounce) {
  const n =
    typeof e != "object"
      ? {
          visualDuration: e,
          keyframes: [0, 1],
          bounce: t,
        }
      : e;
  let { restSpeed: r, restDelta: i } = n;
  const o = n.keyframes[0],
    a = n.keyframes[n.keyframes.length - 1],
    s = {
      done: !1,
      value: o,
    },
    {
      stiffness: u,
      damping: c,
      mass: d,
      duration: h,
      velocity: p,
      isResolvedFromDuration: v,
    } = FJ({
      ...n,
      velocity: -eo(n.velocity || 0),
    }),
    b = p || 0,
    y = c / (2 * Math.sqrt(u * d)),
    w = a - o,
    x = eo(Math.sqrt(u / d)),
    S = Math.abs(w) < 5;
  r || (r = S ? $t.restSpeed.granular : $t.restSpeed.default),
    i || (i = S ? $t.restDelta.granular : $t.restDelta.default);
  let _;
  if (y < 1) {
    const P = i_(x, y);
    _ = (O) => {
      const k = Math.exp(-y * x * O);
      return a - k * (((b + y * x * w) / P) * Math.sin(P * O) + w * Math.cos(P * O));
    };
  } else if (y === 1) _ = (P) => a - Math.exp(-x * P) * (w + (b + x * w) * P);
  else {
    const P = x * Math.sqrt(y * y - 1);
    _ = (O) => {
      const k = Math.exp(-y * x * O),
        R = Math.min(P * O, 300);
      return a - (k * ((b + y * x * w) * Math.sinh(R) + P * w * Math.cosh(R))) / P;
    };
  }
  const E = {
    calculatedDuration: (v && h) || null,
    next: (P) => {
      const O = _(P);
      if (v) s.done = P >= h;
      else {
        let k = 0;
        y < 1 && (k = P === 0 ? Ji(b) : t4(_, P, O));
        const R = Math.abs(k) <= r,
          M = Math.abs(a - O) <= i;
        s.done = R && M;
      }
      return (s.value = s.done ? a : O), s;
    },
    toString: () => {
      const P = Math.min(wF(E), XS),
        O = xF((k) => E.next(P * k).value, P, 30);
      return P + "ms " + O;
    },
  };
  return E;
}
function cR({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: a,
  min: s,
  max: u,
  restDelta: c = 0.5,
  restSpeed: d,
}) {
  const h = e[0],
    p = {
      done: !1,
      value: h,
    },
    v = (R) => (s !== void 0 && R < s) || (u !== void 0 && R > u),
    b = (R) => (s === void 0 ? u : u === void 0 || Math.abs(s - R) < Math.abs(u - R) ? s : u);
  let y = n * t;
  const w = h + y,
    x = a === void 0 ? w : a(w);
  x !== w && (y = x - h);
  const S = (R) => -y * Math.exp(-R / r),
    _ = (R) => x + S(R),
    E = (R) => {
      const M = S(R),
        D = _(R);
      (p.done = Math.abs(M) <= c), (p.value = p.done ? x : D);
    };
  let P, O;
  const k = (R) => {
    v(p.value) &&
      ((P = R),
      (O = n4({
        keyframes: [p.value, b(p.value)],
        velocity: t4(_, R, p.value),
        damping: i,
        stiffness: o,
        restDelta: c,
        restSpeed: d,
      })));
  };
  return (
    k(0),
    {
      calculatedDuration: null,
      next: (R) => {
        let M = !1;
        return !O && P === void 0 && ((M = !0), E(R), k(R)), P !== void 0 && R >= P ? O.next(R - P) : (!M && E(R), p);
      },
    }
  );
}
const VJ = fd(0.42, 0, 1, 1),
  zJ = fd(0, 0, 0.58, 1),
  r4 = fd(0.42, 0, 0.58, 1),
  qJ = (e) => Array.isArray(e) && typeof e[0] != "number",
  WJ = {
    linear: ur,
    easeIn: VJ,
    easeInOut: r4,
    easeOut: zJ,
    circIn: xO,
    circInOut: $F,
    circOut: DF,
    backIn: wO,
    backInOut: NF,
    backOut: MF,
    anticipate: IF,
  },
  fR = (e) => {
    if (mO(e)) {
      eF(e.length === 4);
      const [t, n, r, i] = e;
      return fd(t, n, r, i);
    } else if (typeof e == "string") return WJ[e];
    return e;
  };
function UJ(e, t, n) {
  const r = [],
    i = n || e4,
    o = e.length - 1;
  for (let a = 0; a < o; a++) {
    let s = i(e[a], e[a + 1]);
    if (t) {
      const u = Array.isArray(t) ? t[a] || ur : t;
      s = dd(u, s);
    }
    r.push(s);
  }
  return r;
}
function HJ(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length;
  if ((eF(o === t.length), o === 1)) return () => t[0];
  if (o === 2 && t[0] === t[1]) return () => t[1];
  const a = e[0] === e[1];
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const s = UJ(t, r, i),
    u = s.length,
    c = (d) => {
      if (a && d < e[0]) return t[0];
      let h = 0;
      if (u > 1) for (; h < e.length - 2 && !(d < e[h + 1]); h++);
      const p = Nl(e[h], e[h + 1], d);
      return s[h](p);
    };
  return n ? (d) => c(lo(e[0], e[o - 1], d)) : c;
}
function KJ(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = Nl(0, t, r);
    e.push(Mt(n, 1, i));
  }
}
function GJ(e) {
  const t = [0];
  return KJ(t, e.length - 1), t;
}
function YJ(e, t) {
  return e.map((n) => n * t);
}
function XJ(e, t) {
  return e.map(() => t || r4).splice(0, e.length - 1);
}
function Zp({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  const i = qJ(r) ? r.map(fR) : fR(r),
    o = {
      done: !1,
      value: t[0],
    },
    a = YJ(n && n.length === t.length ? n : GJ(t), e),
    s = HJ(a, t, {
      ease: Array.isArray(i) ? i : XJ(t, i),
    });
  return {
    calculatedDuration: e,
    next: (u) => ((o.value = s(u)), (o.done = u >= e), o),
  };
}
const ZJ = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: () => Ot.update(t, !0),
      stop: () => ca(t),
      now: () => (pn.isProcessing ? pn.timestamp : wi.now()),
    };
  },
  QJ = {
    decay: cR,
    inertia: cR,
    tween: Zp,
    keyframes: Zp,
    spring: n4,
  },
  JJ = (e) => e / 100;
class EO extends QF {
  constructor(t) {
    super(t),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")) return;
        this.teardown();
        const { onStop: u } = this.options;
        u && u();
      });
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options,
      a = i?.KeyframeResolver || AO,
      s = (u, c) => this.onKeyframesResolved(u, c);
    (this.resolver = new a(o, s, n, r, i)), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(t) {
    const { type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: o, velocity: a = 0 } = this.options,
      s = pO(n) ? n : QJ[n] || Zp;
    let u, c;
    s !== Zp && typeof t[0] != "number" && ((u = dd(JJ, e4(t[0], t[1]))), (t = [0, 100]));
    const d = s({
      ...this.options,
      keyframes: t,
    });
    o === "mirror" &&
      (c = s({
        ...this.options,
        keyframes: [...t].reverse(),
        velocity: -a,
      })),
      d.calculatedDuration === null && (d.calculatedDuration = wF(d));
    const { calculatedDuration: h } = d,
      p = h + i,
      v = p * (r + 1) - i;
    return {
      generator: d,
      mirroredGenerator: c,
      mapPercentToKeyframes: u,
      calculatedDuration: h,
      resolvedDuration: p,
      totalDuration: v,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(), this.pendingPlayState === "paused" || !t ? this.pause() : (this.state = this.pendingPlayState);
  }
  tick(t, n = !1) {
    const { resolved: r } = this;
    if (!r) {
      const { keyframes: R } = this.options;
      return {
        done: !0,
        value: R[R.length - 1],
      };
    }
    const {
      finalKeyframe: i,
      generator: o,
      mirroredGenerator: a,
      mapPercentToKeyframes: s,
      keyframes: u,
      calculatedDuration: c,
      totalDuration: d,
      resolvedDuration: h,
    } = r;
    if (this.startTime === null) return o.next(0);
    const { delay: p, repeat: v, repeatType: b, repeatDelay: y, onUpdate: w } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 && (this.startTime = Math.min(t - d / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(t - this.startTime) * this.speed);
    const x = this.currentTime - p * (this.speed >= 0 ? 1 : -1),
      S = this.speed >= 0 ? x < 0 : x > d;
    (this.currentTime = Math.max(x, 0)), this.state === "finished" && this.holdTime === null && (this.currentTime = d);
    let _ = this.currentTime,
      E = o;
    if (v) {
      const R = Math.min(this.currentTime, d) / h;
      let M = Math.floor(R),
        D = R % 1;
      !D && R >= 1 && (D = 1),
        D === 1 && M--,
        (M = Math.min(M, v + 1)),
        M % 2 && (b === "reverse" ? ((D = 1 - D), y && (D -= y / h)) : b === "mirror" && (E = a)),
        (_ = lo(0, 1, D) * h);
    }
    const P = S
      ? {
          done: !1,
          value: u[0],
        }
      : E.next(_);
    s && (P.value = s(P.value));
    let { done: O } = P;
    !S && c !== null && (O = this.speed >= 0 ? this.currentTime >= d : this.currentTime <= 0);
    const k = this.holdTime === null && (this.state === "finished" || (this.state === "running" && O));
    return k && i !== void 0 && (P.value = Iv(u, this.options, i)), w && w(P.value), k && this.finish(), P;
  }
  get duration() {
    const { resolved: t } = this;
    return t ? eo(t.calculatedDuration) : 0;
  }
  get time() {
    return eo(this.currentTime);
  }
  set time(t) {
    (t = Ji(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    (this.playbackSpeed = t), n && (this.time = eo(this.currentTime));
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = ZJ, onPlay: n, startTime: r } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), n && n();
    const i = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
        ? this.state === "finished" && (this.startTime = i)
        : (this.startTime = r ?? this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"), (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0);
  }
  complete() {
    this.state !== "running" && this.play(), (this.pendingPlayState = this.state = "finished"), (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
}
const eee = new Set(["opacity", "clipPath", "filter", "transform"]);
function tee(
  e,
  t,
  n,
  { delay: r = 0, duration: i = 300, repeat: o = 0, repeatType: a = "loop", ease: s = "easeInOut", times: u } = {},
) {
  const c = {
    [t]: n,
  };
  u && (c.offset = u);
  const d = _F(s, i);
  return (
    Array.isArray(d) && (c.easing = d),
    e.animate(c, {
      delay: r,
      duration: i,
      easing: Array.isArray(d) ? "linear" : d,
      fill: "both",
      iterations: o + 1,
      direction: a === "reverse" ? "alternate" : "normal",
    })
  );
}
const nee = JA(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Qp = 10,
  ree = 2e4;
function iee(e) {
  return pO(e.type) || e.type === "spring" || !SF(e.ease);
}
function oee(e, t) {
  const n = new EO({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let r = {
    done: !1,
    value: e[0],
  };
  const i = [];
  let o = 0;
  for (; !r.done && o < ree; ) (r = n.sample(o)), i.push(r.value), (o += Qp);
  return {
    times: void 0,
    keyframes: i,
    duration: o - Qp,
    ease: "linear",
  };
}
const i4 = {
  anticipate: IF,
  backInOut: NF,
  circInOut: $F,
};
function aee(e) {
  return e in i4;
}
class dR extends QF {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options;
    (this.resolver = new ZF(o, (a, s) => this.onKeyframesResolved(a, s), n, r, i)), this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    let { duration: r = 300, times: i, ease: o, type: a, motionValue: s, name: u, startTime: c } = this.options;
    if (!s.owner || !s.owner.current) return !1;
    if ((typeof o == "string" && Yp() && aee(o) && (o = i4[o]), iee(this.options))) {
      const { onComplete: h, onUpdate: p, motionValue: v, element: b, ...y } = this.options,
        w = oee(t, y);
      (t = w.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (r = w.duration),
        (i = w.times),
        (o = w.ease),
        (a = "keyframes");
    }
    const d = tee(s.owner.current, u, t, {
      ...this.options,
      duration: r,
      times: i,
      ease: o,
    });
    return (
      (d.startTime = c ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Xj(d, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (d.onfinish = () => {
            const { onComplete: h } = this.options;
            s.set(Iv(t, this.options, n)), h && h(), this.cancel(), this.resolveFinishedPromise();
          }),
      {
        animation: d,
        duration: r,
        times: i,
        type: a,
        ease: o,
        keyframes: t,
      }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: n } = t;
    return eo(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: n } = t;
    return eo(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.currentTime = Ji(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  get startTime() {
    const { resolved: t } = this;
    if (!t) return null;
    const { animation: n } = t;
    return n.startTime;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n) return ur;
      const { animation: r } = n;
      Xj(r, t);
    }
    return ur;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")) return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n, keyframes: r, duration: i, type: o, ease: a, times: s } = t;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const { motionValue: c, onUpdate: d, onComplete: h, element: p, ...v } = this.options,
        b = new EO({
          ...v,
          keyframes: r,
          duration: i,
          type: o,
          ease: a,
          times: s,
          isGenerator: !0,
        }),
        y = Ji(this.time);
      c.setWithVelocity(b.sample(y - Qp).value, b.sample(y).value, Qp);
    }
    const { onStop: u } = this.options;
    u && u(), this.cancel();
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const { motionValue: n, name: r, repeatDelay: i, repeatType: o, damping: a, type: s } = t;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: u, transformTemplate: c } = n.owner.getProps();
    return nee() && r && eee.has(r) && !u && !c && !i && o !== "mirror" && a !== 0 && s !== "inertia";
  }
}
const see = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  },
  lee = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  uee = {
    type: "keyframes",
    duration: 0.8,
  },
  cee = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
  },
  fee = (e, { keyframes: t }) => (t.length > 2 ? uee : bs.has(e) ? (e.startsWith("scale") ? lee(t[1]) : see) : cee);
function dee({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: a,
  repeatDelay: s,
  from: u,
  elapsed: c,
  ...d
}) {
  return !!Object.keys(d).length;
}
const TO =
  (e, t, n, r = {}, i, o) =>
  (a) => {
    const s = hO(r, e) || {},
      u = s.delay || r.delay || 0;
    let { elapsed: c = 0 } = r;
    c = c - Ji(u);
    let d = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...s,
      delay: -c,
      onUpdate: (p) => {
        t.set(p), s.onUpdate && s.onUpdate(p);
      },
      onComplete: () => {
        a(), s.onComplete && s.onComplete();
      },
      name: e,
      motionValue: t,
      element: o ? void 0 : i,
    };
    dee(s) ||
      (d = {
        ...d,
        ...fee(e, d),
      }),
      d.duration && (d.duration = Ji(d.duration)),
      d.repeatDelay && (d.repeatDelay = Ji(d.repeatDelay)),
      d.from !== void 0 && (d.keyframes[0] = d.from);
    let h = !1;
    if (
      ((d.type === !1 || (d.duration === 0 && !d.repeatDelay)) && ((d.duration = 0), d.delay === 0 && (h = !0)),
      h && !o && t.get() !== void 0)
    ) {
      const p = Iv(d.keyframes, s);
      if (p !== void 0)
        return (
          Ot.update(() => {
            d.onUpdate(p), d.onComplete();
          }),
          new jQ([])
        );
    }
    return !o && dR.supports(d) ? new dR(d) : new EO(d);
  };
function hee({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function o4(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var o;
  let { transition: a = e.getDefaultTransition(), transitionEnd: s, ...u } = t;
  r && (a = r);
  const c = [],
    d = i && e.animationState && e.animationState.getState()[i];
  for (const h in u) {
    const p = e.getValue(h, (o = e.latestValues[h]) !== null && o !== void 0 ? o : null),
      v = u[h];
    if (v === void 0 || (d && hee(d, h))) continue;
    const b = {
      delay: n,
      ...hO(a || {}, h),
    };
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const x = CF(e);
      if (x) {
        const S = window.MotionHandoffAnimation(x, h, Ot);
        S !== null && ((b.startTime = S), (y = !0));
      }
    }
    QS(e, h),
      p.start(
        TO(
          h,
          p,
          v,
          e.shouldReduceMotion && EF.has(h)
            ? {
                type: !1,
              }
            : b,
          e,
          y,
        ),
      );
    const w = p.animation;
    w && c.push(w);
  }
  return (
    s &&
      Promise.all(c).then(() => {
        Ot.update(() => {
          s && UQ(e, s);
        });
      }),
    c
  );
}
function o_(e, t, n = {}) {
  var r;
  const i = Nv(
    e,
    t,
    n.type === "exit" ? ((r = e.presenceContext) === null || r === void 0 ? void 0 : r.custom) : void 0,
  );
  let { transition: o = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (o = n.transitionOverride);
  const a = i ? () => Promise.all(o4(e, i, n)) : () => Promise.resolve(),
    s =
      e.variantChildren && e.variantChildren.size
        ? (c = 0) => {
            const { delayChildren: d = 0, staggerChildren: h, staggerDirection: p } = o;
            return pee(e, t, d + c, h, p, n);
          }
        : () => Promise.resolve(),
    { when: u } = o;
  if (u) {
    const [c, d] = u === "beforeChildren" ? [a, s] : [s, a];
    return c().then(() => d());
  } else return Promise.all([a(), s(n.delay)]);
}
function pee(e, t, n = 0, r = 0, i = 1, o) {
  const a = [],
    s = (e.variantChildren.size - 1) * r,
    u = i === 1 ? (c = 0) => c * r : (c = 0) => s - c * r;
  return (
    Array.from(e.variantChildren)
      .sort(mee)
      .forEach((c, d) => {
        c.notify("AnimationStart", t),
          a.push(
            o_(c, t, {
              ...o,
              delay: n + u(d),
            }).then(() => c.notify("AnimationComplete", t)),
          );
      }),
    Promise.all(a)
  );
}
function mee(e, t) {
  return e.sortNodePosition(t);
}
function vee(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((o) => o_(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = o_(e, t, n);
  else {
    const i = typeof t == "function" ? Nv(e, t, n.custom) : t;
    r = Promise.all(o4(e, i, n));
  }
  return r.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const yee = tO.length;
function a4(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? a4(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < yee; n++) {
    const r = tO[n],
      i = e.props[r];
    (ff(i) || i === !1) && (t[r] = i);
  }
  return t;
}
const gee = [...eO].reverse(),
  bee = eO.length;
function wee(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => vee(e, n, r)));
}
function xee(e) {
  let t = wee(e),
    n = hR(),
    r = !0;
  const i = (u) => (c, d) => {
    var h;
    const p = Nv(e, d, u === "exit" ? ((h = e.presenceContext) === null || h === void 0 ? void 0 : h.custom) : void 0);
    if (p) {
      const { transition: v, transitionEnd: b, ...y } = p;
      c = {
        ...c,
        ...y,
        ...b,
      };
    }
    return c;
  };
  function o(u) {
    t = u(e);
  }
  function a(u) {
    const { props: c } = e,
      d = a4(e.parent) || {},
      h = [],
      p = new Set();
    let v = {},
      b = 1 / 0;
    for (let w = 0; w < bee; w++) {
      const x = gee[w],
        S = n[x],
        _ = c[x] !== void 0 ? c[x] : d[x],
        E = ff(_),
        P = x === u ? S.isActive : null;
      P === !1 && (b = w);
      let O = _ === d[x] && _ !== c[x] && E;
      if (
        (O && r && e.manuallyAnimateOnMount && (O = !1),
        (S.protectedKeys = {
          ...v,
        }),
        (!S.isActive && P === null) || (!_ && !S.prevProp) || Rv(_) || typeof _ == "boolean")
      )
        continue;
      const k = See(S.prevProp, _);
      let R = k || (x === u && S.isActive && !O && E) || (w > b && E),
        M = !1;
      const D = Array.isArray(_) ? _ : [_];
      let I = D.reduce(i(x), {});
      P === !1 && (I = {});
      const { prevResolvedValues: V = {} } = S,
        z = {
          ...V,
          ...I,
        },
        q = (F) => {
          (R = !0), p.has(F) && ((M = !0), p.delete(F)), (S.needsAnimating[F] = !0);
          const L = e.getValue(F);
          L && (L.liveStyle = !1);
        };
      for (const F in z) {
        const L = I[F],
          W = V[F];
        if (v.hasOwnProperty(F)) continue;
        let G = !1;
        YS(L) && YS(W) ? (G = !bF(L, W)) : (G = L !== W),
          G ? (L != null ? q(F) : p.add(F)) : L !== void 0 && p.has(F) ? q(F) : (S.protectedKeys[F] = !0);
      }
      (S.prevProp = _),
        (S.prevResolvedValues = I),
        S.isActive &&
          (v = {
            ...v,
            ...I,
          }),
        r && e.blockInitialAnimation && (R = !1),
        R &&
          (!(O && k) || M) &&
          h.push(
            ...D.map((F) => ({
              animation: F,
              options: {
                type: x,
              },
            })),
          );
    }
    if (p.size) {
      const w = {};
      p.forEach((x) => {
        const S = e.getBaseTarget(x),
          _ = e.getValue(x);
        _ && (_.liveStyle = !0), (w[x] = S ?? null);
      }),
        h.push({
          animation: w,
        });
    }
    let y = !!h.length;
    return (
      r && (c.initial === !1 || c.initial === c.animate) && !e.manuallyAnimateOnMount && (y = !1),
      (r = !1),
      y ? t(h) : Promise.resolve()
    );
  }
  function s(u, c) {
    var d;
    if (n[u].isActive === c) return Promise.resolve();
    (d = e.variantChildren) === null ||
      d === void 0 ||
      d.forEach((p) => {
        var v;
        return (v = p.animationState) === null || v === void 0 ? void 0 : v.setActive(u, c);
      }),
      (n[u].isActive = c);
    const h = a(u);
    for (const p in n) n[p].protectedKeys = {};
    return h;
  }
  return {
    animateChanges: a,
    setActive: s,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      (n = hR()), (r = !0);
    },
  };
}
function See(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !bF(t, e) : !1;
}
function $a(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function hR() {
  return {
    animate: $a(!0),
    whileInView: $a(),
    whileHover: $a(),
    whileTap: $a(),
    whileDrag: $a(),
    whileFocus: $a(),
    exit: $a(),
  };
}
class ma {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
class _ee extends ma {
  constructor(t) {
    super(t), t.animationState || (t.animationState = xee(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Rv(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(), (t = this.unmountControls) === null || t === void 0 || t.call(this);
  }
}
let Pee = 0;
class Aee extends ma {
  constructor() {
    super(...arguments), (this.id = Pee++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const Oee = {
  animation: {
    Feature: _ee,
  },
  exit: {
    Feature: Aee,
  },
};
function mf(
  e,
  t,
  n,
  r = {
    passive: !0,
  },
) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
function hd(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY,
    },
  };
}
const Eee = (e) => (t) => vO(t) && e(t, hd(t));
function Vc(e, t, n, r) {
  return mf(e, t, Eee(n), r);
}
const pR = (e, t) => Math.abs(e - t);
function Tee(e, t) {
  const n = pR(e.x, t.x),
    r = pR(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class s4 {
  constructor(t, n, { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: o = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const h = X0(this.lastMoveEventInfo, this.history),
          p = this.startEvent !== null,
          v =
            Tee(h.offset, {
              x: 0,
              y: 0,
            }) >= 3;
        if (!p && !v) return;
        const { point: b } = h,
          { timestamp: y } = pn;
        this.history.push({
          ...b,
          timestamp: y,
        });
        const { onStart: w, onMove: x } = this.handlers;
        p || (w && w(this.lastMoveEvent, h), (this.startEvent = this.lastMoveEvent)), x && x(this.lastMoveEvent, h);
      }),
      (this.handlePointerMove = (h, p) => {
        (this.lastMoveEvent = h),
          (this.lastMoveEventInfo = Y0(p, this.transformPagePoint)),
          Ot.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (h, p) => {
        this.end();
        const { onEnd: v, onSessionEnd: b, resumeAnimation: y } = this.handlers;
        if ((this.dragSnapToOrigin && y && y(), !(this.lastMoveEvent && this.lastMoveEventInfo))) return;
        const w = X0(
          h.type === "pointercancel" ? this.lastMoveEventInfo : Y0(p, this.transformPagePoint),
          this.history,
        );
        this.startEvent && v && v(h, w), b && b(h, w);
      }),
      !vO(t))
    )
      return;
    (this.dragSnapToOrigin = o), (this.handlers = n), (this.transformPagePoint = r), (this.contextWindow = i || window);
    const a = hd(t),
      s = Y0(a, this.transformPagePoint),
      { point: u } = s,
      { timestamp: c } = pn;
    this.history = [
      {
        ...u,
        timestamp: c,
      },
    ];
    const { onSessionStart: d } = n;
    d && d(t, X0(s, this.history)),
      (this.removeListeners = dd(
        Vc(this.contextWindow, "pointermove", this.handlePointerMove),
        Vc(this.contextWindow, "pointerup", this.handlePointerUp),
        Vc(this.contextWindow, "pointercancel", this.handlePointerUp),
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), ca(this.updatePoint);
  }
}
function Y0(e, t) {
  return t
    ? {
        point: t(e.point),
      }
    : e;
}
function mR(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y,
  };
}
function X0({ point: e }, t) {
  return {
    point: e,
    delta: mR(e, l4(t)),
    offset: mR(e, Cee(t)),
    velocity: kee(t, 0.1),
  };
}
function Cee(e) {
  return e[0];
}
function l4(e) {
  return e[e.length - 1];
}
function kee(e, t) {
  if (e.length < 2)
    return {
      x: 0,
      y: 0,
    };
  let n = e.length - 1,
    r = null;
  const i = l4(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > Ji(t))); ) n--;
  if (!r)
    return {
      x: 0,
      y: 0,
    };
  const o = eo(i.timestamp - r.timestamp);
  if (o === 0)
    return {
      x: 0,
      y: 0,
    };
  const a = {
    x: (i.x - r.x) / o,
    y: (i.y - r.y) / o,
  };
  return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
}
const u4 = 1e-4,
  jee = 1 - u4,
  Ree = 1 + u4,
  c4 = 0.01,
  Mee = 0 - c4,
  Nee = 0 + c4;
function dr(e) {
  return e.max - e.min;
}
function Iee(e, t, n) {
  return Math.abs(e - t) <= n;
}
function vR(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = Mt(t.min, t.max, e.origin)),
    (e.scale = dr(n) / dr(t)),
    (e.translate = Mt(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= jee && e.scale <= Ree) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Mee && e.translate <= Nee) || isNaN(e.translate)) && (e.translate = 0);
}
function zc(e, t, n, r) {
  vR(e.x, t.x, n.x, r ? r.originX : void 0), vR(e.y, t.y, n.y, r ? r.originY : void 0);
}
function yR(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + dr(t));
}
function Dee(e, t, n) {
  yR(e.x, t.x, n.x), yR(e.y, t.y, n.y);
}
function gR(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + dr(t));
}
function qc(e, t, n) {
  gR(e.x, t.x, n.x), gR(e.y, t.y, n.y);
}
function $ee(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? Mt(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? Mt(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function bR(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function Lee(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: bR(e.x, n, i),
    y: bR(e.y, t, r),
  };
}
function wR(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return (
    t.max - t.min < e.max - e.min && ([n, r] = [r, n]),
    {
      min: n,
      max: r,
    }
  );
}
function Bee(e, t) {
  return {
    x: wR(e.x, t.x),
    y: wR(e.y, t.y),
  };
}
function Fee(e, t) {
  let n = 0.5;
  const r = dr(e),
    i = dr(t);
  return i > r ? (n = Nl(t.min, t.max - r, e.min)) : r > i && (n = Nl(e.min, e.max - i, t.min)), lo(0, 1, n);
}
function Vee(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const a_ = 0.35;
function zee(e = a_) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = a_),
    {
      x: xR(e, "left", "right"),
      y: xR(e, "top", "bottom"),
    }
  );
}
function xR(e, t, n) {
  return {
    min: SR(e, t),
    max: SR(e, n),
  };
}
function SR(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const _R = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
  }),
  fl = () => ({
    x: _R(),
    y: _R(),
  }),
  PR = () => ({
    min: 0,
    max: 0,
  }),
  zt = () => ({
    x: PR(),
    y: PR(),
  });
function Pr(e) {
  return [e("x"), e("y")];
}
function f4({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: {
      min: t,
      max: n,
    },
    y: {
      min: e,
      max: r,
    },
  };
}
function qee({ x: e, y: t }) {
  return {
    top: t.min,
    right: e.max,
    bottom: t.max,
    left: e.min,
  };
}
function Wee(e, t) {
  if (!t) return e;
  const n = t({
      x: e.left,
      y: e.top,
    }),
    r = t({
      x: e.right,
      y: e.bottom,
    });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x,
  };
}
function Z0(e) {
  return e === void 0 || e === 1;
}
function s_({ scale: e, scaleX: t, scaleY: n }) {
  return !Z0(e) || !Z0(t) || !Z0(n);
}
function Ba(e) {
  return s_(e) || d4(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function d4(e) {
  return AR(e.x) || AR(e.y);
}
function AR(e) {
  return e && e !== "0%";
}
function Jp(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function OR(e, t, n, r, i) {
  return i !== void 0 && (e = Jp(e, i, r)), Jp(e, n, r) + t;
}
function l_(e, t = 0, n = 1, r, i) {
  (e.min = OR(e.min, t, n, r, i)), (e.max = OR(e.max, t, n, r, i));
}
function h4(e, { x: t, y: n }) {
  l_(e.x, t.translate, t.scale, t.originPoint), l_(e.y, n.translate, n.scale, n.originPoint);
}
const ER = 0.999999999999,
  TR = 1.0000000000001;
function Uee(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let o, a;
  for (let s = 0; s < i; s++) {
    (o = n[s]), (a = o.projectionDelta);
    const { visualElement: u } = o.options;
    (u && u.props.style && u.props.style.display === "contents") ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        hl(e, {
          x: -o.scroll.offset.x,
          y: -o.scroll.offset.y,
        }),
      a && ((t.x *= a.x.scale), (t.y *= a.y.scale), h4(e, a)),
      r && Ba(o.latestValues) && hl(e, o.latestValues));
  }
  t.x < TR && t.x > ER && (t.x = 1), t.y < TR && t.y > ER && (t.y = 1);
}
function dl(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function CR(e, t, n, r, i = 0.5) {
  const o = Mt(e.min, e.max, i);
  l_(e, t, n, o, r);
}
function hl(e, t) {
  CR(e.x, t.x, t.scaleX, t.scale, t.originX), CR(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function p4(e, t) {
  return f4(Wee(e.getBoundingClientRect(), t));
}
function Hee(e, t, n) {
  const r = p4(e, n),
    { scroll: i } = t;
  return i && (dl(r.x, i.offset.x), dl(r.y, i.offset.y)), r;
}
const m4 = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Kee = new WeakMap();
class Gee {
  constructor(t) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = {
        x: 0,
        y: 0,
      }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = zt()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = (d) => {
        const { dragSnapToOrigin: h } = this.getProps();
        h ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(hd(d).point);
      },
      o = (d, h) => {
        const { drag: p, dragPropagation: v, onDragStart: b } = this.getProps();
        if (p && !v && (this.openDragLock && this.openDragLock(), (this.openDragLock = FQ(p)), !this.openDragLock))
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0), (this.visualElement.projection.target = void 0)),
          Pr((w) => {
            let x = this.getAxisMotionValue(w).get() || 0;
            if (bi.test(x)) {
              const { projection: S } = this.visualElement;
              if (S && S.layout) {
                const _ = S.layout.layoutBox[w];
                _ && (x = dr(_) * (parseFloat(x) / 100));
              }
            }
            this.originPoint[w] = x;
          }),
          b && Ot.postRender(() => b(d, h)),
          QS(this.visualElement, "transform");
        const { animationState: y } = this.visualElement;
        y && y.setActive("whileDrag", !0);
      },
      a = (d, h) => {
        const { dragPropagation: p, dragDirectionLock: v, onDirectionLock: b, onDrag: y } = this.getProps();
        if (!p && !this.openDragLock) return;
        const { offset: w } = h;
        if (v && this.currentDirection === null) {
          (this.currentDirection = Yee(w)), this.currentDirection !== null && b && b(this.currentDirection);
          return;
        }
        this.updateAxis("x", h.point, w), this.updateAxis("y", h.point, w), this.visualElement.render(), y && y(d, h);
      },
      s = (d, h) => this.stop(d, h),
      u = () =>
        Pr((d) => {
          var h;
          return (
            this.getAnimationState(d) === "paused" &&
            ((h = this.getAxisMotionValue(d).animation) === null || h === void 0 ? void 0 : h.play())
          );
        }),
      { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new s4(
      t,
      {
        onSessionStart: i,
        onStart: o,
        onMove: a,
        onSessionEnd: s,
        resumeAnimation: u,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: c,
        contextWindow: m4(this.visualElement),
      },
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: o } = this.getProps();
    o && Ot.postRender(() => o(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Gh(t, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(t);
    let a = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (a = $ee(a, this.constraints[t], this.elastic[t])), o.set(a);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
            ? void 0
            : t.layout,
      o = this.constraints;
    n && ul(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = Lee(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = zee(r)),
      o !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Pr((a) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(a) &&
            (this.constraints[a] = Vee(i.layoutBox[a], this.constraints[a]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !ul(t)) return !1;
    const r = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = Hee(r, i.root, this.visualElement.getTransformPagePoint());
    let a = Bee(i.layout.layoutBox, o);
    if (n) {
      const s = n(qee(a));
      (this.hasMutatedConstraints = !!s), s && (a = f4(s));
    }
    return a;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: a,
        onDragTransitionEnd: s,
      } = this.getProps(),
      u = this.constraints || {},
      c = Pr((d) => {
        if (!Gh(d, n, this.currentDirection)) return;
        let h = (u && u[d]) || {};
        a &&
          (h = {
            min: 0,
            max: 0,
          });
        const p = i ? 200 : 1e6,
          v = i ? 40 : 1e7,
          b = {
            type: "inertia",
            velocity: r ? t[d] : 0,
            bounceStiffness: p,
            bounceDamping: v,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...h,
          };
        return this.startAxisValueAnimation(d, b);
      });
    return Promise.all(c).then(s);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return QS(this.visualElement, t), r.start(TO(t, r, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    Pr((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    Pr((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n];
    return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    Pr((n) => {
      const { drag: r } = this.getProps();
      if (!Gh(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: a, max: s } = i.layout.layoutBox[n];
        o.set(t[n] - Mt(a, s, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!ul(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = {
      x: 0,
      y: 0,
    };
    Pr((a) => {
      const s = this.getAxisMotionValue(a);
      if (s && this.constraints !== !1) {
        const u = s.get();
        i[a] = Fee(
          {
            min: u,
            max: u,
          },
          this.constraints[a],
        );
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = o ? o({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      Pr((a) => {
        if (!Gh(a, t, null)) return;
        const s = this.getAxisMotionValue(a),
          { min: u, max: c } = this.constraints[a];
        s.set(Mt(u, c, i[a]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Kee.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Vc(t, "pointerdown", (u) => {
        const { drag: c, dragListener: d = !0 } = this.getProps();
        c && d && this.start(u);
      }),
      r = () => {
        const { dragConstraints: u } = this.getProps();
        ul(u) && u.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), Ot.read(r);
    const a = mf(window, "resize", () => this.scalePositionWithinConstraints()),
      s = i.addEventListener("didUpdate", ({ delta: u, hasLayoutChanged: c }) => {
        this.isDragging &&
          c &&
          (Pr((d) => {
            const h = this.getAxisMotionValue(d);
            h && ((this.originPoint[d] += u[d].translate), h.set(h.get() + u[d].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      a(), n(), o(), s && s();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: a = a_,
        dragMomentum: s = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: a,
      dragMomentum: s,
    };
  }
}
function Gh(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Yee(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
class Xee extends ma {
  constructor(t) {
    super(t), (this.removeGroupControls = ur), (this.removeListeners = ur), (this.controls = new Gee(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || ur);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const kR = (e) => (t, n) => {
  e && Ot.postRender(() => e(t, n));
};
class Zee extends ma {
  constructor() {
    super(...arguments), (this.removePointerDownListener = ur);
  }
  onPointerDown(t) {
    this.session = new s4(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: m4(this.node),
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: kR(t),
      onStart: kR(n),
      onMove: r,
      onEnd: (o, a) => {
        delete this.session, i && Ot.postRender(() => i(o, a));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Vc(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Ap = {
  hasAnimatedSinceResize: !0,
  hasEverUpdated: !1,
};
function jR(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const vc = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (qe.test(e)) e = parseFloat(e);
        else return e;
      const n = jR(e, t.target.x),
        r = jR(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  Qee = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = fa.parse(e);
      if (i.length > 5) return r;
      const o = fa.createTransformer(e),
        a = typeof i[0] != "number" ? 1 : 0,
        s = n.x.scale * t.x,
        u = n.y.scale * t.y;
      (i[0 + a] /= s), (i[1 + a] /= u);
      const c = Mt(s, u, 0.5);
      return typeof i[2 + a] == "number" && (i[2 + a] /= c), typeof i[3 + a] == "number" && (i[3 + a] /= c), o(i);
    },
  };
class Jee extends React.Component {
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i } = this.props,
      { projection: o } = t;
    bQ(ete),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Ap.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: i, isPresent: o } = this.props,
      a = r.projection;
    return (
      a &&
        ((a.isPresent = o),
        i || t.layoutDependency !== n || n === void 0 ? a.willUpdate() : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? a.promote()
            : a.relegate() ||
              Ot.postRender(() => {
                const s = a.getStack();
                (!s || !s.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      rO.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props,
      { projection: i } = t;
    i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function v4(e) {
  const [t, n] = NZ(),
    r = React.useContext(QB);
  return jsxRuntime.jsx(Jee, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: React.useContext(aF),
    isPresent: t,
    safeToRemove: n,
  });
}
const ete = {
  borderRadius: {
    ...vc,
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"],
  },
  borderTopLeftRadius: vc,
  borderTopRightRadius: vc,
  borderBottomLeftRadius: vc,
  borderBottomRightRadius: vc,
  boxShadow: Qee,
};
function tte(e, t, n) {
  const r = Mn(e) ? e : hf(e);
  return r.start(TO("", r, t, n)), r.animation;
}
function nte(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
const rte = (e, t) => e.depth - t.depth;
class ite {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    yO(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    gO(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(rte), (this.isDirty = !1), this.children.forEach(t);
  }
}
function ote(e, t) {
  const n = wi.now(),
    r = ({ timestamp: i }) => {
      const o = i - n;
      o >= t && (ca(r), e(o - t));
    };
  return Ot.read(r, !0), () => ca(r);
}
const y4 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  ate = y4.length,
  RR = (e) => (typeof e == "string" ? parseFloat(e) : e),
  MR = (e) => typeof e == "number" || qe.test(e);
function ste(e, t, n, r, i, o) {
  i
    ? ((e.opacity = Mt(0, n.opacity !== void 0 ? n.opacity : 1, lte(r))),
      (e.opacityExit = Mt(t.opacity !== void 0 ? t.opacity : 1, 0, ute(r))))
    : o && (e.opacity = Mt(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, r));
  for (let a = 0; a < ate; a++) {
    const s = `border${y4[a]}Radius`;
    let u = NR(t, s),
      c = NR(n, s);
    if (u === void 0 && c === void 0) continue;
    u || (u = 0),
      c || (c = 0),
      u === 0 || c === 0 || MR(u) === MR(c)
        ? ((e[s] = Math.max(Mt(RR(u), RR(c), r), 0)), (bi.test(c) || bi.test(u)) && (e[s] += "%"))
        : (e[s] = c);
  }
  (t.rotate || n.rotate) && (e.rotate = Mt(t.rotate || 0, n.rotate || 0, r));
}
function NR(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const lte = g4(0, 0.5, DF),
  ute = g4(0.5, 0.95, ur);
function g4(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(Nl(e, t, r)));
}
function IR(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function wr(e, t) {
  IR(e.x, t.x), IR(e.y, t.y);
}
function DR(e, t) {
  (e.translate = t.translate), (e.scale = t.scale), (e.originPoint = t.originPoint), (e.origin = t.origin);
}
function $R(e, t, n, r, i) {
  return (e -= t), (e = Jp(e, 1 / n, r)), i !== void 0 && (e = Jp(e, 1 / i, r)), e;
}
function cte(e, t = 0, n = 1, r = 0.5, i, o = e, a = e) {
  if ((bi.test(t) && ((t = parseFloat(t)), (t = Mt(a.min, a.max, t / 100) - a.min)), typeof t != "number")) return;
  let s = Mt(o.min, o.max, r);
  e === o && (s -= t), (e.min = $R(e.min, t, n, s, i)), (e.max = $R(e.max, t, n, s, i));
}
function LR(e, t, [n, r, i], o, a) {
  cte(e, t[n], t[r], t[i], t.scale, o, a);
}
const fte = ["x", "scaleX", "originX"],
  dte = ["y", "scaleY", "originY"];
function BR(e, t, n, r) {
  LR(e.x, t, fte, n ? n.x : void 0, r ? r.x : void 0), LR(e.y, t, dte, n ? n.y : void 0, r ? r.y : void 0);
}
function FR(e) {
  return e.translate === 0 && e.scale === 1;
}
function b4(e) {
  return FR(e.x) && FR(e.y);
}
function VR(e, t) {
  return e.min === t.min && e.max === t.max;
}
function hte(e, t) {
  return VR(e.x, t.x) && VR(e.y, t.y);
}
function zR(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function w4(e, t) {
  return zR(e.x, t.x) && zR(e.y, t.y);
}
function qR(e) {
  return dr(e.x) / dr(e.y);
}
function WR(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class pte {
  constructor() {
    this.members = [];
  }
  add(t) {
    yO(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if ((gO(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot && ((t.snapshot = r.snapshot), (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function mte(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y,
    a = n?.z || 0;
  if (
    ((i || o || a) && (r = `translate3d(${i}px, ${o}px, ${a}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const { transformPerspective: c, rotate: d, rotateX: h, rotateY: p, skewX: v, skewY: b } = n;
    c && (r = `perspective(${c}px) ${r}`),
      d && (r += `rotate(${d}deg) `),
      h && (r += `rotateX(${h}deg) `),
      p && (r += `rotateY(${p}deg) `),
      v && (r += `skewX(${v}deg) `),
      b && (r += `skewY(${b}deg) `);
  }
  const s = e.x.scale * t.x,
    u = e.y.scale * t.y;
  return (s !== 1 || u !== 1) && (r += `scale(${s}, ${u})`), r || "none";
}
const Fa = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  kc = typeof window < "u" && window.MotionDebug !== void 0,
  Q0 = ["", "X", "Y", "Z"],
  vte = {
    visibility: "hidden",
  },
  UR = 1e3;
let yte = 0;
function J0(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function x4(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = CF(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", Ot, !(i || o));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && x4(r);
}
function S4({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
  return class {
    constructor(a = {}, s = t?.()) {
      (this.id = yte++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = {
          x: 1,
          y: 1,
        }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            kc && (Fa.totalNodes = Fa.resolvedTargetDeltas = Fa.recalculatedProjection = 0),
            this.nodes.forEach(wte),
            this.nodes.forEach(Ate),
            this.nodes.forEach(Ote),
            this.nodes.forEach(xte),
            kc && window.MotionDebug.record(Fa);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = a),
        (this.root = s ? s.root || s : this),
        (this.path = s ? [...s.path, s] : []),
        (this.parent = s),
        (this.depth = s ? s.depth + 1 : 0);
      for (let u = 0; u < this.path.length; u++) this.path[u].shouldResetTransform = !0;
      this.root === this && (this.nodes = new ite());
    }
    addEventListener(a, s) {
      return this.eventHandlers.has(a) || this.eventHandlers.set(a, new bO()), this.eventHandlers.get(a).add(s);
    }
    notifyListeners(a, ...s) {
      const u = this.eventHandlers.get(a);
      u && u.notify(...s);
    }
    hasListeners(a) {
      return this.eventHandlers.has(a);
    }
    mount(a, s = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = nte(a)), (this.instance = a);
      const { layoutId: u, layout: c, visualElement: d } = this.options;
      if (
        (d && !d.current && d.mount(a),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        s && (c || u) && (this.isLayoutDirty = !0),
        e)
      ) {
        let h;
        const p = () => (this.root.updateBlockedByResize = !1);
        e(a, () => {
          (this.root.updateBlockedByResize = !0),
            h && h(),
            (h = ote(p, 250)),
            Ap.hasAnimatedSinceResize && ((Ap.hasAnimatedSinceResize = !1), this.nodes.forEach(KR));
        });
      }
      u && this.root.registerSharedNode(u, this),
        this.options.animate !== !1 &&
          d &&
          (u || c) &&
          this.addEventListener(
            "didUpdate",
            ({ delta: h, hasLayoutChanged: p, hasRelativeTargetChanged: v, layout: b }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const y = this.options.transition || d.getDefaultTransition() || jte,
                { onLayoutAnimationStart: w, onLayoutAnimationComplete: x } = d.getProps(),
                S = !this.targetLayout || !w4(this.targetLayout, b) || v,
                _ = !p && v;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                _ ||
                (p && (S || !this.currentAnimation))
              ) {
                this.resumeFrom && ((this.resumingFrom = this.resumeFrom), (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(h, _);
                const E = {
                  ...hO(y, "layout"),
                  onPlay: w,
                  onComplete: x,
                };
                (d.shouldReduceMotion || this.options.layoutRoot) && ((E.delay = 0), (E.type = !1)),
                  this.startAnimation(E);
              } else p || KR(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
              this.targetLayout = b;
            },
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const a = this.getStack();
      a && a.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        ca(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() || ((this.isUpdating = !0), this.nodes && this.nodes.forEach(Ete), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: a } = this.options;
      return a && a.getProps().transformTemplate;
    }
    willUpdate(a = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && x4(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let d = 0; d < this.path.length; d++) {
        const h = this.path[d];
        (h.shouldResetTransform = !0), h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: s, layout: u } = this.options;
      if (s === void 0 && !u) return;
      const c = this.getTransformTemplate();
      (this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        a && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(HR);
        return;
      }
      this.isUpdating || this.nodes.forEach(_te),
        (this.isUpdating = !1),
        this.nodes.forEach(Pte),
        this.nodes.forEach(gte),
        this.nodes.forEach(bte),
        this.clearAllSnapshots();
      const s = wi.now();
      (pn.delta = lo(0, 1e3 / 60, s - pn.timestamp)),
        (pn.timestamp = s),
        (pn.isProcessing = !0),
        q0.update.process(pn),
        q0.preRender.process(pn),
        q0.render.process(pn),
        (pn.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), rO.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Ste), this.sharedNodes.forEach(Tte);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), Ot.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ot.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let u = 0; u < this.path.length; u++) this.path[u].updateScroll();
      const a = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = zt()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: s } = this.options;
      s && s.notify("LayoutMeasure", this.layout.layoutBox, a ? a.layoutBox : void 0);
    }
    updateScroll(a = "measure") {
      let s = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === a && (s = !1), s)
      ) {
        const u = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: a,
          isRoot: u,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : u,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const a = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        s = this.projectionDelta && !b4(this.projectionDelta),
        u = this.getTransformTemplate(),
        c = u ? u(this.latestValues, "") : void 0,
        d = c !== this.prevTransformTemplateValue;
      a &&
        (s || Ba(this.latestValues) || d) &&
        (i(this.instance, c), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(a = !0) {
      const s = this.measurePageBox();
      let u = this.removeElementScroll(s);
      return (
        a && (u = this.removeTransform(u)),
        Rte(u),
        {
          animationId: this.root.animationId,
          measuredBox: s,
          layoutBox: u,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var a;
      const { visualElement: s } = this.options;
      if (!s) return zt();
      const u = s.measureViewportBox();
      if (!(((a = this.scroll) === null || a === void 0 ? void 0 : a.wasRoot) || this.path.some(Mte))) {
        const { scroll: d } = this.root;
        d && (dl(u.x, d.offset.x), dl(u.y, d.offset.y));
      }
      return u;
    }
    removeElementScroll(a) {
      var s;
      const u = zt();
      if ((wr(u, a), !((s = this.scroll) === null || s === void 0) && s.wasRoot)) return u;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c],
          { scroll: h, options: p } = d;
        d !== this.root && h && p.layoutScroll && (h.wasRoot && wr(u, a), dl(u.x, h.offset.x), dl(u.y, h.offset.y));
      }
      return u;
    }
    applyTransform(a, s = !1) {
      const u = zt();
      wr(u, a);
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        !s &&
          d.options.layoutScroll &&
          d.scroll &&
          d !== d.root &&
          hl(u, {
            x: -d.scroll.offset.x,
            y: -d.scroll.offset.y,
          }),
          Ba(d.latestValues) && hl(u, d.latestValues);
      }
      return Ba(this.latestValues) && hl(u, this.latestValues), u;
    }
    removeTransform(a) {
      const s = zt();
      wr(s, a);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        if (!c.instance || !Ba(c.latestValues)) continue;
        s_(c.latestValues) && c.updateSnapshot();
        const d = zt(),
          h = c.measurePageBox();
        wr(d, h), BR(s, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, d);
      }
      return Ba(this.latestValues) && BR(s, this.latestValues), s;
    }
    setTargetDelta(a) {
      (this.targetDelta = a), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0);
    }
    setOptions(a) {
      this.options = {
        ...this.options,
        ...a,
        crossfade: a.crossfade !== void 0 ? a.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== pn.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(a = !1) {
      var s;
      const u = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = u.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = u.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = u.isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== u;
      if (
        !(
          a ||
          (c && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) && s.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: h, layoutId: p } = this.options;
      if (!(!this.layout || !(h || p))) {
        if (((this.resolvedRelativeTargetAt = pn.timestamp), !this.targetDelta && !this.relativeTarget)) {
          const v = this.getClosestProjectingParent();
          v && v.layout && this.animationProgress !== 1
            ? ((this.relativeParent = v),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = zt()),
              (this.relativeTargetOrigin = zt()),
              qc(this.relativeTargetOrigin, this.layout.layoutBox, v.layout.layoutBox),
              wr(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = zt()), (this.targetWithTransforms = zt())),
            this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Dee(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : wr(this.target, this.layout.layoutBox),
                  h4(this.target, this.targetDelta))
                : wr(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const v = this.getClosestProjectingParent();
            v &&
            !!v.resumingFrom == !!this.resumingFrom &&
            !v.options.layoutScroll &&
            v.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = v),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = zt()),
                (this.relativeTargetOrigin = zt()),
                qc(this.relativeTargetOrigin, this.target, v.target),
                wr(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          kc && Fa.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || s_(this.parent.latestValues) || d4(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var a;
      const s = this.getLead(),
        u = !!this.resumingFrom || this !== s;
      let c = !0;
      if (
        ((this.isProjectionDirty || (!((a = this.parent) === null || a === void 0) && a.isProjectionDirty)) && (c = !1),
        u && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1),
        this.resolvedRelativeTargetAt === pn.timestamp && (c = !1),
        c)
      )
        return;
      const { layout: d, layoutId: h } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(d || h))
      )
        return;
      wr(this.layoutCorrected, this.layout.layoutBox);
      const p = this.treeScale.x,
        v = this.treeScale.y;
      Uee(this.layoutCorrected, this.treeScale, this.path, u),
        s.layout &&
          !s.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((s.target = s.layout.layoutBox), (s.targetWithTransforms = zt()));
      const { target: b } = s;
      if (!b) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (DR(this.prevProjectionDelta.x, this.projectionDelta.x),
          DR(this.prevProjectionDelta.y, this.projectionDelta.y)),
        zc(this.projectionDelta, this.layoutCorrected, b, this.latestValues),
        (this.treeScale.x !== p ||
          this.treeScale.y !== v ||
          !WR(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !WR(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0), this.scheduleRender(), this.notifyListeners("projectionUpdate", b)),
        kc && Fa.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(a = !0) {
      var s;
      if (((s = this.options.visualElement) === null || s === void 0 || s.scheduleRender(), a)) {
        const u = this.getStack();
        u && u.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = fl()), (this.projectionDelta = fl()), (this.projectionDeltaWithTransform = fl());
    }
    setAnimationOrigin(a, s = !1) {
      const u = this.snapshot,
        c = u ? u.latestValues : {},
        d = {
          ...this.latestValues,
        },
        h = fl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !s);
      const p = zt(),
        v = u ? u.source : void 0,
        b = this.layout ? this.layout.source : void 0,
        y = v !== b,
        w = this.getStack(),
        x = !w || w.members.length <= 1,
        S = !!(y && !x && this.options.crossfade === !0 && !this.path.some(kte));
      this.animationProgress = 0;
      let _;
      (this.mixTargetDelta = (E) => {
        const P = E / 1e3;
        GR(h.x, a.x, P),
          GR(h.y, a.y, P),
          this.setTargetDelta(h),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (qc(p, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Cte(this.relativeTarget, this.relativeTargetOrigin, p, P),
            _ && hte(this.relativeTarget, _) && (this.isProjectionDirty = !1),
            _ || (_ = zt()),
            wr(_, this.relativeTarget)),
          y && ((this.animationValues = d), ste(d, c, this.latestValues, P, S, x)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = P);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(a) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (ca(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Ot.update(() => {
          (Ap.hasAnimatedSinceResize = !0),
            (this.currentAnimation = tte(0, UR, {
              ...a,
              onUpdate: (s) => {
                this.mixTargetDelta(s), a.onUpdate && a.onUpdate(s);
              },
              onComplete: () => {
                a.onComplete && a.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0), (this.resumingFrom.preserveOpacity = void 0));
      const a = this.getStack();
      a && a.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(UR), this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const a = this.getLead();
      let { targetWithTransforms: s, target: u, layout: c, latestValues: d } = a;
      if (!(!s || !u || !c)) {
        if (this !== a && this.layout && c && _4(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          u = this.target || zt();
          const h = dr(this.layout.layoutBox.x);
          (u.x.min = a.target.x.min), (u.x.max = u.x.min + h);
          const p = dr(this.layout.layoutBox.y);
          (u.y.min = a.target.y.min), (u.y.max = u.y.min + p);
        }
        wr(s, u), hl(s, d), zc(this.projectionDeltaWithTransform, this.layoutCorrected, s, d);
      }
    }
    registerSharedNode(a, s) {
      this.sharedNodes.has(a) || this.sharedNodes.set(a, new pte()), this.sharedNodes.get(a).add(s);
      const c = s.options.initialPromotionConfig;
      s.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(s) : void 0,
      });
    }
    isLead() {
      const a = this.getStack();
      return a ? a.lead === this : !0;
    }
    getLead() {
      var a;
      const { layoutId: s } = this.options;
      return s ? ((a = this.getStack()) === null || a === void 0 ? void 0 : a.lead) || this : this;
    }
    getPrevLead() {
      var a;
      const { layoutId: s } = this.options;
      return s ? ((a = this.getStack()) === null || a === void 0 ? void 0 : a.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: a } = this.options;
      if (a) return this.root.sharedNodes.get(a);
    }
    promote({ needsReset: a, transition: s, preserveFollowOpacity: u } = {}) {
      const c = this.getStack();
      c && c.promote(this, u),
        a && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        s &&
          this.setOptions({
            transition: s,
          });
    }
    relegate() {
      const a = this.getStack();
      return a ? a.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: a } = this.options;
      if (!a) return;
      let s = !1;
      const { latestValues: u } = a;
      if (((u.z || u.rotate || u.rotateX || u.rotateY || u.rotateZ || u.skewX || u.skewY) && (s = !0), !s)) return;
      const c = {};
      u.z && J0("z", a, c, this.animationValues);
      for (let d = 0; d < Q0.length; d++)
        J0(`rotate${Q0[d]}`, a, c, this.animationValues), J0(`skew${Q0[d]}`, a, c, this.animationValues);
      a.render();
      for (const d in c) a.setStaticValue(d, c[d]), this.animationValues && (this.animationValues[d] = c[d]);
      a.scheduleRender();
    }
    getProjectionStyles(a) {
      var s, u;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return vte;
      const c = {
          visibility: "",
        },
        d = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (c.opacity = ""),
          (c.pointerEvents = _p(a?.pointerEvents) || ""),
          (c.transform = d ? d(this.latestValues, "") : "none"),
          c
        );
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        const y = {};
        return (
          this.options.layoutId &&
            ((y.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (y.pointerEvents = _p(a?.pointerEvents) || "")),
          this.hasProjected &&
            !Ba(this.latestValues) &&
            ((y.transform = d ? d({}, "") : "none"), (this.hasProjected = !1)),
          y
        );
      }
      const p = h.animationValues || h.latestValues;
      this.applyTransformsToTarget(),
        (c.transform = mte(this.projectionDeltaWithTransform, this.treeScale, p)),
        d && (c.transform = d(p, c.transform));
      const { x: v, y: b } = this.projectionDelta;
      (c.transformOrigin = `${v.origin * 100}% ${b.origin * 100}% 0`),
        h.animationValues
          ? (c.opacity =
              h === this
                ? (u = (s = p.opacity) !== null && s !== void 0 ? s : this.latestValues.opacity) !== null &&
                  u !== void 0
                  ? u
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : p.opacityExit)
          : (c.opacity =
              h === this ? (p.opacity !== void 0 ? p.opacity : "") : p.opacityExit !== void 0 ? p.opacityExit : 0);
      for (const y in Gp) {
        if (p[y] === void 0) continue;
        const { correct: w, applyTo: x } = Gp[y],
          S = c.transform === "none" ? p[y] : w(p[y], h);
        if (x) {
          const _ = x.length;
          for (let E = 0; E < _; E++) c[x[E]] = S;
        } else c[y] = S;
      }
      return this.options.layoutId && (c.pointerEvents = h === this ? _p(a?.pointerEvents) || "" : "none"), c;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((a) => {
        var s;
        return (s = a.currentAnimation) === null || s === void 0 ? void 0 : s.stop();
      }),
        this.root.nodes.forEach(HR),
        this.root.sharedNodes.clear();
    }
  };
}
function gte(e) {
  e.updateLayout();
}
function bte(e) {
  var t;
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: o } = e.options,
      a = n.source !== e.layout.source;
    o === "size"
      ? Pr((h) => {
          const p = a ? n.measuredBox[h] : n.layoutBox[h],
            v = dr(p);
          (p.min = r[h].min), (p.max = p.min + v);
        })
      : _4(o, n.layoutBox, r) &&
        Pr((h) => {
          const p = a ? n.measuredBox[h] : n.layoutBox[h],
            v = dr(r[h]);
          (p.max = p.min + v),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0), (e.relativeTarget[h].max = e.relativeTarget[h].min + v));
        });
    const s = fl();
    zc(s, r, n.layoutBox);
    const u = fl();
    a ? zc(u, e.applyTransform(i, !0), n.measuredBox) : zc(u, r, n.layoutBox);
    const c = !b4(s);
    let d = !1;
    if (!e.resumeFrom) {
      const h = e.getClosestProjectingParent();
      if (h && !h.resumeFrom) {
        const { snapshot: p, layout: v } = h;
        if (p && v) {
          const b = zt();
          qc(b, n.layoutBox, p.layoutBox);
          const y = zt();
          qc(y, r, v.layoutBox),
            w4(b, y) || (d = !0),
            h.options.layoutRoot && ((e.relativeTarget = y), (e.relativeTargetOrigin = b), (e.relativeParent = h));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: u,
      layoutDelta: s,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: d,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function wte(e) {
  kc && Fa.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function xte(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Ste(e) {
  e.clearSnapshot();
}
function HR(e) {
  e.clearMeasurements();
}
function _te(e) {
  e.isLayoutDirty = !1;
}
function Pte(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function KR(e) {
  e.finishAnimation(), (e.targetDelta = e.relativeTarget = e.target = void 0), (e.isProjectionDirty = !0);
}
function Ate(e) {
  e.resolveTargetDelta();
}
function Ote(e) {
  e.calcProjection();
}
function Ete(e) {
  e.resetSkewAndRotation();
}
function Tte(e) {
  e.removeLeadSnapshot();
}
function GR(e, t, n) {
  (e.translate = Mt(t.translate, 0, n)),
    (e.scale = Mt(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function YR(e, t, n, r) {
  (e.min = Mt(t.min, n.min, r)), (e.max = Mt(t.max, n.max, r));
}
function Cte(e, t, n, r) {
  YR(e.x, t.x, n.x, r), YR(e.y, t.y, n.y, r);
}
function kte(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const jte = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
  },
  XR = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  ZR = XR("applewebkit/") && !XR("chrome/") ? Math.round : ur;
function QR(e) {
  (e.min = ZR(e.min)), (e.max = ZR(e.max));
}
function Rte(e) {
  QR(e.x), QR(e.y);
}
function _4(e, t, n) {
  return e === "position" || (e === "preserve-aspect" && !Iee(qR(t), qR(n), 0.2));
}
function Mte(e) {
  var t;
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot);
}
const Nte = S4({
    attachResizeListener: (e, t) => mf(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  eb = {
    current: void 0,
  },
  P4 = S4({
    measureScroll: (e) => ({
      x: e.scrollLeft,
      y: e.scrollTop,
    }),
    defaultParent: () => {
      if (!eb.current) {
        const e = new Nte({});
        e.mount(window),
          e.setOptions({
            layoutScroll: !0,
          }),
          (eb.current = e);
      }
      return eb.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  Ite = {
    pan: {
      Feature: Zee,
    },
    drag: {
      Feature: Xee,
      ProjectionNode: P4,
      MeasureLayout: v4,
    },
  };
function JR(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    o = r[i];
  o && Ot.postRender(() => o(t, hd(t)));
}
class Dte extends ma {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = IQ(t, (n) => (JR(this.node, n, "Start"), (r) => JR(this.node, r, "End"))));
  }
  unmount() {}
}
class $te extends ma {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = dd(
      mf(this.node.current, "focus", () => this.onFocus()),
      mf(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function e2(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    o = r[i];
  o && Ot.postRender(() => o(t, hd(t)));
}
class Lte extends ma {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = BQ(
        t,
        (n) => (e2(this.node, n, "Start"), (r, { success: i }) => e2(this.node, r, i ? "End" : "Cancel")),
        {
          useGlobalTarget: this.node.props.globalTapTarget,
        },
      ));
  }
  unmount() {}
}
const u_ = new WeakMap(),
  tb = new WeakMap(),
  Bte = (e) => {
    const t = u_.get(e.target);
    t && t(e);
  },
  Fte = (e) => {
    e.forEach(Bte);
  };
function Vte({ root: e, ...t }) {
  const n = e || document;
  tb.has(n) || tb.set(n, {});
  const r = tb.get(n),
    i = JSON.stringify(t);
  return (
    r[i] ||
      (r[i] = new IntersectionObserver(Fte, {
        root: e,
        ...t,
      })),
    r[i]
  );
}
function zte(e, t, n) {
  const r = Vte(t);
  return (
    u_.set(e, n),
    r.observe(e),
    () => {
      u_.delete(e), r.unobserve(e);
    }
  );
}
const qte = {
  some: 0,
  all: 1,
};
class Wte extends ma {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = "some", once: o } = t,
      a = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == "number" ? i : qte[i],
      },
      s = (u) => {
        const { isIntersecting: c } = u;
        if (this.isInView === c || ((this.isInView = c), o && !c && this.hasEnteredView)) return;
        c && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive("whileInView", c);
        const { onViewportEnter: d, onViewportLeave: h } = this.node.getProps(),
          p = c ? d : h;
        p && p(u);
      };
    return zte(this.node.current, a, s);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Ute(t, n)) && this.startObserver();
  }
  unmount() {}
}
function Ute({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Hte = {
    inView: {
      Feature: Wte,
    },
    tap: {
      Feature: Lte,
    },
    focus: {
      Feature: $te,
    },
    hover: {
      Feature: Dte,
    },
  },
  Kte = {
    layout: {
      ProjectionNode: P4,
      MeasureLayout: v4,
    },
  },
  c_ = {
    current: null,
  },
  A4 = {
    current: !1,
  };
function Gte() {
  if (((A4.current = !0), !!QA))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (c_.current = e.matches);
      e.addListener(t), t();
    } else c_.current = !1;
}
const Yte = [...XF, On, fa],
  Xte = (e) => Yte.find(YF(e)),
  t2 = new WeakMap();
function Zte(e, t, n) {
  for (const r in t) {
    const i = t[r],
      o = n[r];
    if (Mn(i)) e.addValue(r, i);
    else if (Mn(o))
      e.addValue(
        r,
        hf(i, {
          owner: e,
        }),
      );
    else if (o !== i)
      if (e.hasValue(r)) {
        const a = e.getValue(r);
        a.liveStyle === !0 ? a.jump(i) : a.hasAnimated || a.set(i);
      } else {
        const a = e.getStaticValue(r);
        e.addValue(
          r,
          hf(a !== void 0 ? a : i, {
            owner: e,
          }),
        );
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r);
  return t;
}
const n2 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class Qte {
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor(
    { parent: t, props: n, presenceContext: r, reducedMotionConfig: i, blockInitialAnimation: o, visualState: a },
    s = {},
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = AO),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const v = wi.now();
        this.renderScheduledAt < v && ((this.renderScheduledAt = v), Ot.render(this.render, !1, !0));
      });
    const { latestValues: u, renderState: c, onUpdate: d } = a;
    (this.onUpdate = d),
      (this.latestValues = u),
      (this.baseTarget = {
        ...u,
      }),
      (this.initialValues = n.initial
        ? {
            ...u,
          }
        : {}),
      (this.renderState = c),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = s),
      (this.blockInitialAnimation = !!o),
      (this.isControllingVariants = Mv(n)),
      (this.isVariantNode = iF(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: h, ...p } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const v in p) {
      const b = p[v];
      u[v] !== void 0 && Mn(b) && b.set(u[v], !1);
    }
  }
  mount(t) {
    (this.current = t),
      t2.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      A4.current || Gte(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : c_.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    t2.delete(this.current),
      this.projection && this.projection.unmount(),
      ca(this.notifyUpdate),
      ca(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const r = bs.has(t),
      i = n.on("change", (s) => {
        (this.latestValues[t] = s),
          this.props.onUpdate && Ot.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      o = n.on("renderRequest", this.scheduleRender);
    let a;
    window.MotionCheckAppearSync && (a = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        i(), o(), a && a(), n.owner && n.stop();
      });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in Il) {
      const n = Il[t];
      if (!n) continue;
      const { isEnabled: r, Feature: i } = n;
      if ((!this.features[t] && i && r(this.props) && (this.features[t] = new i(this)), this.features[t])) {
        const o = this.features[t];
        o.isMounted ? o.update() : (o.mount(), (o.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : zt();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < n2.length; r++) {
      const i = n2[r];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = "on" + i,
        a = t[o];
      a && (this.propEventSubscriptions[i] = this.on(i, a));
    }
    (this.prevMotionValues = Zte(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n) return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r &&
      (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = hf(n === null ? void 0 : n, {
          owner: this,
        })),
        this.addValue(t, r)),
      r
    );
  }
  readValue(t, n) {
    var r;
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (r = this.getBaseTargetFromProps(this.props, t)) !== null && r !== void 0
          ? r
          : this.readValueFromInstance(this.current, t, this.options);
    return (
      i != null &&
        (typeof i == "string" && (KF(i) || LF(i)) ? (i = parseFloat(i)) : !Xte(i) && fa.test(n) && (i = WF(t, n)),
        this.setBaseTarget(t, Mn(i) ? i.get() : i)),
      Mn(i) ? i.get() : i
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const { initial: r } = this.props;
    let i;
    if (typeof r == "string" || typeof r == "object") {
      const a = oO(this.props, r, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      a && (i = a[t]);
    }
    if (r && i !== void 0) return i;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !Mn(o) ? o : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new bO()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class O4 extends Qte {
  constructor() {
    super(...arguments), (this.KeyframeResolver = ZF);
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Mn(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function Jte(e) {
  return window.getComputedStyle(e);
}
class ene extends O4 {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = hF);
  }
  readValueFromInstance(t, n) {
    if (bs.has(n)) {
      const r = PO(n);
      return (r && r.default) || 0;
    } else {
      const r = Jte(t),
        i = (cF(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return p4(t, n);
  }
  build(t, n, r) {
    lO(t, n, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return dO(t, n, r);
  }
}
class tne extends O4 {
  constructor() {
    super(...arguments), (this.type = "svg"), (this.isSVGTag = !1), (this.measureInstanceViewportBox = zt);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (bs.has(n)) {
      const r = PO(n);
      return (r && r.default) || 0;
    }
    return (n = pF.has(n) ? n : nO(n)), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return yF(t, n, r);
  }
  build(t, n, r) {
    uO(t, n, this.isSVGTag, r.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    mF(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = fO(t.tagName)), super.mount(t);
  }
}
const nne = (e, t) =>
    iO(e)
      ? new tne(t)
      : new ene(t, {
          allowProjection: e !== React.Fragment,
        }),
  rne = TQ(
    {
      ...Oee,
      ...Hte,
      ...Ite,
      ...Kte,
    },
    nne,
  ),
  motion = qZ(rne);
