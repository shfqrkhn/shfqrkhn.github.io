function vi(e) {
  return Object.keys(e);
}
function c0(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function EP(e, t) {
  const n = {
      ...e,
    },
    r = t;
  return (
    c0(e) &&
      c0(t) &&
      Object.keys(t).forEach((i) => {
        c0(r[i]) && i in e ? (n[i] = EP(n[i], r[i])) : (n[i] = r[i]);
      }),
    n
  );
}
function O7(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function E7(e) {
  return typeof e != "string" || !e.includes("var(--mantine-scale)")
    ? e
    : e
        .match(/^calc\((.*?)\)$/)?.[1]
        .split("*")[0]
        .trim();
}
function T7(e) {
  const t = E7(e);
  return typeof t == "number"
    ? t
    : typeof t == "string"
      ? t.includes("calc") || t.includes("var")
        ? t
        : t.includes("px")
          ? Number(t.replace("px", ""))
          : t.includes("rem")
            ? Number(t.replace("rem", "")) * 16
            : t.includes("em")
              ? Number(t.replace("em", "")) * 16
              : Number(t)
      : NaN;
}
function f0(e) {
  return e === "0rem" ? "0rem" : `calc(${e} * var(--mantine-scale))`;
}
function Z3(e, { shouldScale: t = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0") return `0${e}`;
    if (typeof r == "number") {
      const i = `${r / 16}${e}`;
      return t ? f0(i) : i;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba(")) return r;
      if (r.includes(","))
        return r
          .split(",")
          .map((o) => n(o))
          .join(",");
      if (r.includes(" "))
        return r
          .split(" ")
          .map((o) => n(o))
          .join(" ");
      if (r.includes(e)) return t ? f0(r) : r;
      const i = r.replace("px", "");
      if (!Number.isNaN(Number(i))) {
        const o = `${Number(i) / 16}${e}`;
        return t ? f0(o) : o;
      }
    }
    return r;
  }
  return n;
}
const oe = Z3("rem", {
    shouldScale: !0,
  }),
  Pk = Z3("em");
function TP(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
}
function Q3(e) {
  if (typeof e == "number") return !0;
  if (typeof e == "string") {
    if (e.startsWith("calc(") || e.startsWith("var(") || (e.includes(" ") && e.trim() !== "")) return !0;
    const t =
      /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return e
      .trim()
      .split(/\s+/)
      .every((r) => t.test(r));
  }
  return !1;
}
function vs(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== React.Fragment : !1;
}
function kr(e) {
  const t = React.createContext(null);
  return [
    ({ children: i, value: o }) =>
      jsxRuntime.jsx(t.Provider, {
        value: o,
        children: i,
      }),
    () => {
      const i = React.useContext(t);
      if (i === null) throw new Error(e);
      return i;
    },
  ];
}
function CP(e = null) {
  const t = React.createContext(e);
  return [
    ({ children: i, value: o }) =>
      jsxRuntime.jsx(t.Provider, {
        value: o,
        children: i,
      }),
    () => React.useContext(t),
  ];
}
function Op(e, t) {
  return (n) => {
    if (typeof n != "string" || n.trim().length === 0) throw new Error(t);
    return `${e}-${n}`;
  };
}
function nS(e, t) {
  let n = e;
  for (; (n = n.parentElement) && !n.matches(t); );
  return n;
}
function C7(e, t, n) {
  for (let r = e - 1; r >= 0; r -= 1) if (!t[r].disabled) return r;
  if (n) {
    for (let r = t.length - 1; r > -1; r -= 1) if (!t[r].disabled) return r;
  }
  return e;
}
function k7(e, t, n) {
  for (let r = e + 1; r < t.length; r += 1) if (!t[r].disabled) return r;
  if (n) {
    for (let r = 0; r < t.length; r += 1) if (!t[r].disabled) return r;
  }
  return e;
}
function j7(e, t, n) {
  return nS(e, n) === nS(t, n);
}
function J3({
  parentSelector: e,
  siblingSelector: t,
  onKeyDown: n,
  loop: r = !0,
  activateOnFocus: i = !1,
  dir: o = "rtl",
  orientation: a,
}) {
  return (s) => {
    n?.(s);
    const u = Array.from(nS(s.currentTarget, e)?.querySelectorAll(t) || []).filter((b) => j7(s.currentTarget, b, e)),
      c = u.findIndex((b) => s.currentTarget === b),
      d = k7(c, u, r),
      h = C7(c, u, r),
      p = o === "rtl" ? h : d,
      v = o === "rtl" ? d : h;
    switch (s.key) {
      case "ArrowRight": {
        a === "horizontal" && (s.stopPropagation(), s.preventDefault(), u[p].focus(), i && u[p].click());
        break;
      }
      case "ArrowLeft": {
        a === "horizontal" && (s.stopPropagation(), s.preventDefault(), u[v].focus(), i && u[v].click());
        break;
      }
      case "ArrowUp": {
        a === "vertical" && (s.stopPropagation(), s.preventDefault(), u[h].focus(), i && u[h].click());
        break;
      }
      case "ArrowDown": {
        a === "vertical" && (s.stopPropagation(), s.preventDefault(), u[d].focus(), i && u[d].click());
        break;
      }
      case "Home": {
        s.stopPropagation(), s.preventDefault(), !u[0].disabled && u[0].focus();
        break;
      }
      case "End": {
        s.stopPropagation(), s.preventDefault();
        const b = u.length - 1;
        !u[b].disabled && u[b].focus();
        break;
      }
    }
  };
}
const R7 = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999,
};
function po(e) {
  return R7[e];
}
const rS = () => {};
function M7(
  e,
  t = {
    active: !0,
  },
) {
  return typeof e != "function" || !t.active
    ? t.onKeyDown || rS
    : (n) => {
        n.key === "Escape" && (e(n), t.onTrigger?.());
      };
}
function dt(e, t = "size", n = !0) {
  if (e !== void 0) return Q3(e) ? (n ? oe(e) : e) : `var(--${t}-${e})`;
}
function ls(e) {
  return dt(e, "mantine-spacing");
}
function gn(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : dt(e, "mantine-radius");
}
function yn(e) {
  return dt(e, "mantine-font-size");
}
function eL(e) {
  return dt(e, "mantine-line-height", !1);
}
function kP(e) {
  if (e) return dt(e, "mantine-shadow", !1);
}
function Gi(e, t, n) {
  return t === void 0 && n === void 0
    ? e
    : t !== void 0 && n === void 0
      ? Math.max(e, t)
      : Math.min(t === void 0 && n !== void 0 ? e : Math.max(e, t), n);
}
function N7(e = "mantine-") {
  return `${e}${Math.random().toString(36).slice(2, 11)}`;
}
function qa(e) {
  const t = React.useRef(e);
  return (
    React.useEffect(() => {
      t.current = e;
    }),
    React.useMemo(
      () =>
        (...n) =>
          t.current?.(...n),
      [],
    )
  );
}
function Zm(e, t) {
  const n = typeof t == "number" ? t : t.delay,
    r = typeof t == "number" ? !1 : t.flushOnUnmount,
    i = qa(e),
    o = React.useRef(0),
    a = React.useRef(() => {}),
    s = Object.assign(
      React.useCallback(
        (...u) => {
          window.clearTimeout(o.current);
          const c = () => {
            o.current !== 0 && ((o.current = 0), i(...u));
          };
          (a.current = c), (s.flush = c), (o.current = window.setTimeout(c, n));
        },
        [i, n],
      ),
      {
        flush: a.current,
      },
    );
  return (
    React.useEffect(
      () => () => {
        window.clearTimeout(o.current), r && s.flush();
      },
      [s, r],
    ),
    s
  );
}
const Ak = ["mousedown", "touchstart"];
function I7(e, t, n) {
  const r = React.useRef(null);
  return (
    React.useEffect(() => {
      const i = (o) => {
        const { target: a } = o ?? {};
        if (Array.isArray(n)) {
          const s =
            a?.hasAttribute("data-ignore-outside-clicks") || (!document.body.contains(a) && a.tagName !== "HTML");
          n.every((c) => !!c && !o.composedPath().includes(c)) && !s && e();
        } else r.current && !r.current.contains(a) && e();
      };
      return (
        (t || Ak).forEach((o) => document.addEventListener(o, i)),
        () => {
          (t || Ak).forEach((o) => document.removeEventListener(o, i));
        }
      );
    }, [r, e, n]),
    r
  );
}
function D7(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function $7(e, t) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function L7(
  e,
  t,
  { getInitialValueInEffect: n } = {
    getInitialValueInEffect: !0,
  },
) {
  const [r, i] = React.useState(n ? t : $7(e)),
    o = React.useRef(null);
  return (
    React.useEffect(() => {
      if ("matchMedia" in window)
        return (o.current = window.matchMedia(e)), i(o.current.matches), D7(o.current, (a) => i(a.matches));
    }, [e]),
    r
  );
}
const Jf = typeof document < "u" ? React.useLayoutEffect : React.useEffect;
function ia(e, t) {
  const n = React.useRef(!1);
  React.useEffect(
    () => () => {
      n.current = !1;
    },
    [],
  ),
    React.useEffect(() => {
      if (n.current) return e();
      n.current = !0;
    }, t);
}
function tL({ opened: e, shouldReturnFocus: t = !0 }) {
  const n = React.useRef(null),
    r = () => {
      n.current &&
        "focus" in n.current &&
        typeof n.current.focus == "function" &&
        n.current?.focus({
          preventScroll: !0,
        });
    };
  return (
    ia(() => {
      let i = -1;
      const o = (a) => {
        a.key === "Tab" && window.clearTimeout(i);
      };
      return (
        document.addEventListener("keydown", o),
        e ? (n.current = document.activeElement) : t && (i = window.setTimeout(r, 10)),
        () => {
          window.clearTimeout(i), document.removeEventListener("keydown", o);
        }
      );
    }, [e, t]),
    r
  );
}
const B7 = /input|select|textarea|button|object/,
  nL = "a, input, select, textarea, button, object, [tabindex]";
function F7(e) {
  return e.style.display === "none";
}
function V7(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden") return !1;
  let n = e;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (F7(n)) return !1;
    n = n.parentNode;
  }
  return !0;
}
function rL(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function iS(e) {
  const t = e.nodeName.toLowerCase(),
    n = !Number.isNaN(rL(e));
  return ((B7.test(t) && !e.disabled) || (e instanceof HTMLAnchorElement && e.href) || n) && V7(e);
}
function iL(e) {
  const t = rL(e);
  return (Number.isNaN(t) || t >= 0) && iS(e);
}
function z7(e) {
  return Array.from(e.querySelectorAll(nL)).filter(iL);
}
function q7(e, t) {
  const n = z7(e);
  if (!n.length) {
    t.preventDefault();
    return;
  }
  const r = n[t.shiftKey ? 0 : n.length - 1],
    i = e.getRootNode();
  let o = r === i.activeElement || e === i.activeElement;
  const a = i.activeElement;
  if (
    (a.tagName === "INPUT" &&
      a.getAttribute("type") === "radio" &&
      (o = n
        .filter((d) => d.getAttribute("type") === "radio" && d.getAttribute("name") === a.getAttribute("name"))
        .includes(r)),
    !o)
  )
    return;
  t.preventDefault();
  const u = n[t.shiftKey ? n.length - 1 : 0];
  u && u.focus();
}
function W7(e = !0) {
  const t = React.useRef(null),
    n = (i) => {
      let o = i.querySelector("[data-autofocus]");
      if (!o) {
        const a = Array.from(i.querySelectorAll(nL));
        (o = a.find(iL) || a.find(iS) || null), !o && iS(i) && (o = i);
      }
      o &&
        o.focus({
          preventScroll: !0,
        });
    },
    r = React.useCallback(
      (i) => {
        e &&
          i !== null &&
          t.current !== i &&
          (i
            ? (setTimeout(() => {
                i.getRootNode() && n(i);
              }),
              (t.current = i))
            : (t.current = null));
      },
      [e],
    );
  return (
    React.useEffect(() => {
      if (!e) return;
      t.current && setTimeout(() => n(t.current));
      const i = (o) => {
        o.key === "Tab" && t.current && q7(t.current, o);
      };
      return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
    }, [e]),
    r
  );
}
const U7 = ReactDefault.useId || (() => {});
function H7() {
  const e = U7();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function mo(e) {
  const t = H7(),
    [n, r] = React.useState(t);
  return (
    Jf(() => {
      r(N7());
    }, []),
    typeof e == "string" ? e : typeof window > "u" ? t : n
  );
}
function K7(e, t, n) {
  React.useEffect(() => (window.addEventListener(e, t, n), () => window.removeEventListener(e, t, n)), [e, t]);
}
function Xc(e, t) {
  if (typeof e == "function") return e(t);
  typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function oL(...e) {
  const t = new Map();
  return (n) => {
    if (
      (e.forEach((r) => {
        const i = Xc(r, n);
        i && t.set(r, i);
      }),
      t.size > 0)
    )
      return () => {
        e.forEach((r) => {
          const i = t.get(r);
          i ? i() : Xc(r, null);
        }),
          t.clear();
      };
  };
}
function bn(...e) {
  return React.useCallback(oL(...e), e);
}
function G7(e, t, n = "ltr") {
  const r = React.useRef(null),
    i = React.useRef(!1),
    o = React.useRef(!1),
    a = React.useRef(0),
    [s, u] = React.useState(!1);
  return (
    React.useEffect(() => {
      i.current = !0;
    }, []),
    React.useEffect(() => {
      const c = r.current,
        d = ({ x: _, y: E }) => {
          cancelAnimationFrame(a.current),
            (a.current = requestAnimationFrame(() => {
              if (i.current && c) {
                c.style.userSelect = "none";
                const P = c.getBoundingClientRect();
                if (P.width && P.height) {
                  const O = Gi((_ - P.left) / P.width, 0, 1);
                  e({
                    x: n === "ltr" ? O : 1 - O,
                    y: Gi((E - P.top) / P.height, 0, 1),
                  });
                }
              }
            }));
        },
        h = () => {
          document.addEventListener("mousemove", w),
            document.addEventListener("mouseup", b),
            document.addEventListener("touchmove", S),
            document.addEventListener("touchend", b);
        },
        p = () => {
          document.removeEventListener("mousemove", w),
            document.removeEventListener("mouseup", b),
            document.removeEventListener("touchmove", S),
            document.removeEventListener("touchend", b);
        },
        v = () => {
          !o.current &&
            i.current &&
            ((o.current = !0), typeof t?.onScrubStart == "function" && t.onScrubStart(), u(!0), h());
        },
        b = () => {
          o.current &&
            i.current &&
            ((o.current = !1),
            u(!1),
            p(),
            setTimeout(() => {
              typeof t?.onScrubEnd == "function" && t.onScrubEnd();
            }, 0));
        },
        y = (_) => {
          v(), _.preventDefault(), w(_);
        },
        w = (_) =>
          d({
            x: _.clientX,
            y: _.clientY,
          }),
        x = (_) => {
          _.cancelable && _.preventDefault(), v(), S(_);
        },
        S = (_) => {
          _.cancelable && _.preventDefault(),
            d({
              x: _.changedTouches[0].clientX,
              y: _.changedTouches[0].clientY,
            });
        };
      return (
        c?.addEventListener("mousedown", y),
        c?.addEventListener("touchstart", x, {
          passive: !1,
        }),
        () => {
          c && (c.removeEventListener("mousedown", y), c.removeEventListener("touchstart", x));
        }
      );
    }, [n, e]),
    {
      ref: r,
      active: s,
    }
  );
}
function Pi({ value: e, defaultValue: t, finalValue: n, onChange: r = () => {} }) {
  const [i, o] = React.useState(t !== void 0 ? t : n),
    a = (s, ...u) => {
      o(s), r?.(s, ...u);
    };
  return e !== void 0 ? [e, r, !0] : [i, a, !1];
}
function jP(e, t) {
  return L7("(prefers-reduced-motion: reduce)", e, t);
}
function Y7(e) {
  const t = React.useRef(void 0);
  return (
    React.useEffect(() => {
      t.current = e;
    }, [e]),
    t.current
  );
}
function Ok(e, t) {
  return t.length === 0 ? e : t.reduce((n, r) => (Math.abs(r - e) < Math.abs(n - e) ? r : n));
}
function Qm(e) {
  const t = ReactDefault.version;
  return typeof ReactDefault.version != "string" || t.startsWith("18.") ? e?.ref : e?.props?.ref;
}
function aL(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (n = aL(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function We() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = aL(e)) && (r && (r += " "), (r += t));
  return r;
}
const X7 = {};
function Z7(e) {
  const t = {};
  return (
    e.forEach((n) => {
      Object.entries(n).forEach(([r, i]) => {
        t[r] ? (t[r] = We(t[r], i)) : (t[r] = i);
      });
    }),
    t
  );
}
function Jm({ theme: e, classNames: t, props: n, stylesCtx: r }) {
  const o = (Array.isArray(t) ? t : [t]).map((a) => (typeof a == "function" ? a(e, n, r) : a || X7));
  return Z7(o);
}
function Ep({ theme: e, styles: t, props: n, stylesCtx: r }) {
  return (Array.isArray(t) ? t : [t]).reduce(
    (o, a) =>
      typeof a == "function"
        ? {
            ...o,
            ...a(e, n, r),
          }
        : {
            ...o,
            ...a,
          },
    {},
  );
}
const sL = React.createContext(null);
function da() {
  const e = React.useContext(sL);
  if (!e) throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Q7() {
  return da().cssVariablesResolver;
}
function J7() {
  return da().classNamesPrefix;
}
function RP() {
  return da().getStyleNonce;
}
function eq() {
  return da().withStaticClasses;
}
function tq() {
  return da().headless;
}
function nq() {
  return da().stylesTransform?.sx;
}
function rq() {
  return da().stylesTransform?.styles;
}
function lL() {
  return da().env || "default";
}
function iq(e) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(e);
}
function oq(e) {
  let t = e.replace("#", "");
  if (t.length === 3) {
    const a = t.split("");
    t = [a[0], a[0], a[1], a[1], a[2], a[2]].join("");
  }
  if (t.length === 8) {
    const a = parseInt(t.slice(6, 8), 16) / 255;
    return {
      r: parseInt(t.slice(0, 2), 16),
      g: parseInt(t.slice(2, 4), 16),
      b: parseInt(t.slice(4, 6), 16),
      a,
    };
  }
  const n = parseInt(t, 16),
    r = (n >> 16) & 255,
    i = (n >> 8) & 255,
    o = n & 255;
  return {
    r,
    g: i,
    b: o,
    a: 1,
  };
}
function aq(e) {
  const [t, n, r, i] = e
    .replace(/[^0-9,./]/g, "")
    .split(/[/,]/)
    .map(Number);
  return {
    r: t,
    g: n,
    b: r,
    a: i === void 0 ? 1 : i,
  };
}
function sq(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,
    n = e.match(t);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
  const r = parseInt(n[1], 10),
    i = parseInt(n[2], 10) / 100,
    o = parseInt(n[3], 10) / 100,
    a = n[5] ? parseFloat(n[5]) : void 0,
    s = (1 - Math.abs(2 * o - 1)) * i,
    u = r / 60,
    c = s * (1 - Math.abs((u % 2) - 1)),
    d = o - s / 2;
  let h, p, v;
  return (
    u >= 0 && u < 1
      ? ((h = s), (p = c), (v = 0))
      : u >= 1 && u < 2
        ? ((h = c), (p = s), (v = 0))
        : u >= 2 && u < 3
          ? ((h = 0), (p = s), (v = c))
          : u >= 3 && u < 4
            ? ((h = 0), (p = c), (v = s))
            : u >= 4 && u < 5
              ? ((h = c), (p = 0), (v = s))
              : ((h = s), (p = 0), (v = c)),
    {
      r: Math.round((h + d) * 255),
      g: Math.round((p + d) * 255),
      b: Math.round((v + d) * 255),
      a: a || 1,
    }
  );
}
function MP(e) {
  return iq(e)
    ? oq(e)
    : e.startsWith("rgb")
      ? aq(e)
      : e.startsWith("hsl")
        ? sq(e)
        : {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          };
}
function Nh(e, t) {
  if (e.startsWith("var(")) return `color-mix(in srgb, ${e}, black ${t * 100}%)`;
  const { r: n, g: r, b: i, a: o } = MP(e),
    a = 1 - t,
    s = (u) => Math.round(u * a);
  return `rgba(${s(n)}, ${s(r)}, ${s(i)}, ${o})`;
}
function Zc(e, t) {
  return typeof e.primaryShade == "number" ? e.primaryShade : t === "dark" ? e.primaryShade.dark : e.primaryShade.light;
}
function d0(e) {
  return e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
}
function lq(e) {
  const t = e.match(/oklch\((.*?)%\s/);
  return t ? parseFloat(t[1]) : null;
}
function uq(e) {
  if (e.startsWith("oklch(")) return (lq(e) || 0) / 100;
  const { r: t, g: n, b: r } = MP(e),
    i = t / 255,
    o = n / 255,
    a = r / 255,
    s = d0(i),
    u = d0(o),
    c = d0(a);
  return 0.2126 * s + 0.7152 * u + 0.0722 * c;
}
function fc(e, t = 0.179) {
  return e.startsWith("var(") ? !1 : uq(e) > t;
}
function ed({ color: e, theme: t, colorScheme: n }) {
  if (typeof e != "string")
    throw new Error(`[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof e}`);
  if (e === "bright")
    return {
      color: e,
      value: n === "dark" ? t.white : t.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: fc(n === "dark" ? t.white : t.black, t.luminanceThreshold),
      variable: "--mantine-color-bright",
    };
  if (e === "dimmed")
    return {
      color: e,
      value: n === "dark" ? t.colors.dark[2] : t.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: fc(n === "dark" ? t.colors.dark[2] : t.colors.gray[6], t.luminanceThreshold),
      variable: "--mantine-color-dimmed",
    };
  if (e === "white" || e === "black")
    return {
      color: e,
      value: e === "white" ? t.white : t.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: fc(e === "white" ? t.white : t.black, t.luminanceThreshold),
      variable: `--mantine-color-${e}`,
    };
  const [r, i] = e.split("."),
    o = i ? Number(i) : void 0,
    a = r in t.colors;
  if (a) {
    const s = o !== void 0 ? t.colors[r][o] : t.colors[r][Zc(t, n || "light")];
    return {
      color: r,
      value: s,
      shade: o,
      isThemeColor: a,
      isLight: fc(s, t.luminanceThreshold),
      variable: i ? `--mantine-color-${r}-${o}` : `--mantine-color-${r}-filled`,
    };
  }
  return {
    color: e,
    value: e,
    isThemeColor: a,
    isLight: fc(e, t.luminanceThreshold),
    shade: o,
    variable: void 0,
  };
}
function Vn(e, t) {
  const n = ed({
    color: e || t.primaryColor,
    theme: t,
  });
  return n.variable ? `var(${n.variable})` : e;
}
function oS(e, t) {
  const n = {
      from: e?.from || t.defaultGradient.from,
      to: e?.to || t.defaultGradient.to,
      deg: e?.deg ?? t.defaultGradient.deg ?? 0,
    },
    r = Vn(n.from, t),
    i = Vn(n.to, t);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${i} 100%)`;
}
function ui(e, t) {
  if (typeof e != "string" || t > 1 || t < 0) return "rgba(0, 0, 0, 1)";
  if (e.startsWith("var(")) {
    const o = (1 - t) * 100;
    return `color-mix(in srgb, ${e}, transparent ${o}%)`;
  }
  if (e.startsWith("oklch"))
    return e.includes("/") ? e.replace(/\/\s*[\d.]+\s*\)/, `/ ${t})`) : e.replace(")", ` / ${t})`);
  const { r: n, g: r, b: i } = MP(e);
  return `rgba(${n}, ${r}, ${i}, ${t})`;
}
const Xs = ui,
  cq = ({ color: e, theme: t, variant: n, gradient: r, autoContrast: i }) => {
    const o = ed({
        color: e,
        theme: t,
      }),
      a = typeof i == "boolean" ? i : t.autoContrast;
    if (n === "filled") {
      const s = a && o.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
      return o.isThemeColor
        ? o.shade === void 0
          ? {
              background: `var(--mantine-color-${e}-filled)`,
              hover: `var(--mantine-color-${e}-filled-hover)`,
              color: s,
              border: `${oe(1)} solid transparent`,
            }
          : {
              background: `var(--mantine-color-${o.color}-${o.shade})`,
              hover: `var(--mantine-color-${o.color}-${o.shade === 9 ? 8 : o.shade + 1})`,
              color: s,
              border: `${oe(1)} solid transparent`,
            }
        : {
            background: e,
            hover: Nh(e, 0.1),
            color: s,
            border: `${oe(1)} solid transparent`,
          };
    }
    if (n === "light") {
      if (o.isThemeColor) {
        if (o.shade === void 0)
          return {
            background: `var(--mantine-color-${e}-light)`,
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${oe(1)} solid transparent`,
          };
        const s = t.colors[o.color][o.shade];
        return {
          background: ui(s, 0.1),
          hover: ui(s, 0.12),
          color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
          border: `${oe(1)} solid transparent`,
        };
      }
      return {
        background: ui(e, 0.1),
        hover: ui(e, 0.12),
        color: e,
        border: `${oe(1)} solid transparent`,
      };
    }
    if (n === "outline")
      return o.isThemeColor
        ? o.shade === void 0
          ? {
              background: "transparent",
              hover: `var(--mantine-color-${e}-outline-hover)`,
              color: `var(--mantine-color-${e}-outline)`,
              border: `${oe(1)} solid var(--mantine-color-${e}-outline)`,
            }
          : {
              background: "transparent",
              hover: ui(t.colors[o.color][o.shade], 0.05),
              color: `var(--mantine-color-${o.color}-${o.shade})`,
              border: `${oe(1)} solid var(--mantine-color-${o.color}-${o.shade})`,
            }
        : {
            background: "transparent",
            hover: ui(e, 0.05),
            color: e,
            border: `${oe(1)} solid ${e}`,
          };
    if (n === "subtle") {
      if (o.isThemeColor) {
        if (o.shade === void 0)
          return {
            background: "transparent",
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${oe(1)} solid transparent`,
          };
        const s = t.colors[o.color][o.shade];
        return {
          background: "transparent",
          hover: ui(s, 0.12),
          color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
          border: `${oe(1)} solid transparent`,
        };
      }
      return {
        background: "transparent",
        hover: ui(e, 0.12),
        color: e,
        border: `${oe(1)} solid transparent`,
      };
    }
    return n === "transparent"
      ? o.isThemeColor
        ? o.shade === void 0
          ? {
              background: "transparent",
              hover: "transparent",
              color: `var(--mantine-color-${e}-light-color)`,
              border: `${oe(1)} solid transparent`,
            }
          : {
              background: "transparent",
              hover: "transparent",
              color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
              border: `${oe(1)} solid transparent`,
            }
        : {
            background: "transparent",
            hover: "transparent",
            color: e,
            border: `${oe(1)} solid transparent`,
          }
      : n === "white"
        ? o.isThemeColor
          ? o.shade === void 0
            ? {
                background: "var(--mantine-color-white)",
                hover: Nh(t.white, 0.01),
                color: `var(--mantine-color-${e}-filled)`,
                border: `${oe(1)} solid transparent`,
              }
            : {
                background: "var(--mantine-color-white)",
                hover: Nh(t.white, 0.01),
                color: `var(--mantine-color-${o.color}-${o.shade})`,
                border: `${oe(1)} solid transparent`,
              }
          : {
              background: "var(--mantine-color-white)",
              hover: Nh(t.white, 0.01),
              color: e,
              border: `${oe(1)} solid transparent`,
            }
        : n === "gradient"
          ? {
              background: oS(r, t),
              hover: oS(r, t),
              color: "var(--mantine-color-white)",
              border: "none",
            }
          : n === "default"
            ? {
                background: "var(--mantine-color-default)",
                hover: "var(--mantine-color-default-hover)",
                color: "var(--mantine-color-default-color)",
                border: `${oe(1)} solid var(--mantine-color-default-border)`,
              }
            : {};
  },
  fq = {
    dark: [
      "#C9C9C9",
      "#b8b8b8",
      "#828282",
      "#696969",
      "#424242",
      "#3b3b3b",
      "#2e2e2e",
      "#242424",
      "#1f1f1f",
      "#141414",
    ],
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
    red: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
    pink: [
      "#fff0f6",
      "#ffdeeb",
      "#fcc2d7",
      "#faa2c1",
      "#f783ac",
      "#f06595",
      "#e64980",
      "#d6336c",
      "#c2255c",
      "#a61e4d",
    ],
    grape: [
      "#f8f0fc",
      "#f3d9fa",
      "#eebefa",
      "#e599f7",
      "#da77f2",
      "#cc5de8",
      "#be4bdb",
      "#ae3ec9",
      "#9c36b5",
      "#862e9c",
    ],
    violet: [
      "#f3f0ff",
      "#e5dbff",
      "#d0bfff",
      "#b197fc",
      "#9775fa",
      "#845ef7",
      "#7950f2",
      "#7048e8",
      "#6741d9",
      "#5f3dc4",
    ],
    indigo: [
      "#edf2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4c6ef5",
      "#4263eb",
      "#3b5bdb",
      "#364fc7",
    ],
    blue: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab",
    ],
    cyan: [
      "#e3fafc",
      "#c5f6fa",
      "#99e9f2",
      "#66d9e8",
      "#3bc9db",
      "#22b8cf",
      "#15aabf",
      "#1098ad",
      "#0c8599",
      "#0b7285",
    ],
    teal: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#0ca678",
      "#099268",
      "#087f5b",
    ],
    green: [
      "#ebfbee",
      "#d3f9d8",
      "#b2f2bb",
      "#8ce99a",
      "#69db7c",
      "#51cf66",
      "#40c057",
      "#37b24d",
      "#2f9e44",
      "#2b8a3e",
    ],
    lime: [
      "#f4fce3",
      "#e9fac8",
      "#d8f5a2",
      "#c0eb75",
      "#a9e34b",
      "#94d82d",
      "#82c91e",
      "#74b816",
      "#66a80f",
      "#5c940d",
    ],
    yellow: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#f59f00",
      "#f08c00",
      "#e67700",
    ],
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#d9480f",
    ],
  },
  Ek =
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  NP = {
    scale: 1,
    fontSmoothing: !0,
    focusRing: "auto",
    white: "#fff",
    black: "#000",
    colors: fq,
    primaryShade: {
      light: 6,
      dark: 8,
    },
    primaryColor: "blue",
    variantColorResolver: cq,
    autoContrast: !1,
    luminanceThreshold: 0.3,
    fontFamily: Ek,
    fontFamilyMonospace:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    respectReducedMotion: !1,
    cursorType: "default",
    defaultGradient: {
      from: "blue",
      to: "cyan",
      deg: 45,
    },
    defaultRadius: "sm",
    activeClassName: "mantine-active",
    focusClassName: "",
    headings: {
      fontFamily: Ek,
      fontWeight: "700",
      textWrap: "wrap",
      sizes: {
        h1: {
          fontSize: oe(34),
          lineHeight: "1.3",
        },
        h2: {
          fontSize: oe(26),
          lineHeight: "1.35",
        },
        h3: {
          fontSize: oe(22),
          lineHeight: "1.4",
        },
        h4: {
          fontSize: oe(18),
          lineHeight: "1.45",
        },
        h5: {
          fontSize: oe(16),
          lineHeight: "1.5",
        },
        h6: {
          fontSize: oe(14),
          lineHeight: "1.5",
        },
      },
    },
    fontSizes: {
      xs: oe(12),
      sm: oe(14),
      md: oe(16),
      lg: oe(18),
      xl: oe(20),
    },
    lineHeights: {
      xs: "1.4",
      sm: "1.45",
      md: "1.55",
      lg: "1.6",
      xl: "1.65",
    },
    radius: {
      xs: oe(2),
      sm: oe(4),
      md: oe(8),
      lg: oe(16),
      xl: oe(32),
    },
    spacing: {
      xs: oe(10),
      sm: oe(12),
      md: oe(16),
      lg: oe(20),
      xl: oe(32),
    },
    breakpoints: {
      xs: "36em",
      sm: "48em",
      md: "62em",
      lg: "75em",
      xl: "88em",
    },
    shadows: {
      xs: `0 ${oe(1)} ${oe(3)} rgba(0, 0, 0, 0.05), 0 ${oe(1)} ${oe(2)} rgba(0, 0, 0, 0.1)`,
      sm: `0 ${oe(1)} ${oe(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${oe(10)} ${oe(15)} ${oe(-5)}, rgba(0, 0, 0, 0.04) 0 ${oe(7)} ${oe(7)} ${oe(-5)}`,
      md: `0 ${oe(1)} ${oe(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${oe(20)} ${oe(25)} ${oe(-5)}, rgba(0, 0, 0, 0.04) 0 ${oe(10)} ${oe(10)} ${oe(-5)}`,
      lg: `0 ${oe(1)} ${oe(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${oe(28)} ${oe(23)} ${oe(-7)}, rgba(0, 0, 0, 0.04) 0 ${oe(12)} ${oe(12)} ${oe(-7)}`,
      xl: `0 ${oe(1)} ${oe(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${oe(36)} ${oe(28)} ${oe(-7)}, rgba(0, 0, 0, 0.04) 0 ${oe(17)} ${oe(17)} ${oe(-7)}`,
    },
    other: {},
    components: {},
  };
function Tk(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function dq({ key: e = "mantine-color-scheme-value" } = {}) {
  let t;
  return {
    get: (n) => {
      if (typeof window > "u") return n;
      try {
        const r = window.localStorage.getItem(e);
        return Tk(r) ? r : n;
      } catch {
        return n;
      }
    },
    set: (n) => {
      try {
        window.localStorage.setItem(e, n);
      } catch (r) {
        console.warn("[@mantine/core] Local storage color scheme manager was unable to save color scheme.", r);
      }
    },
    subscribe: (n) => {
      (t = (r) => {
        r.storageArea === window.localStorage && r.key === e && Tk(r.newValue) && n(r.newValue);
      }),
        window.addEventListener("storage", t);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", t);
    },
    clear: () => {
      window.localStorage.removeItem(e);
    },
  };
}
const hq =
    "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color",
  Ck =
    "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function h0(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function kk(e) {
  if (!(e.primaryColor in e.colors)) throw new Error(hq);
  if (typeof e.primaryShade == "object" && (!h0(e.primaryShade.dark) || !h0(e.primaryShade.light))) throw new Error(Ck);
  if (typeof e.primaryShade == "number" && !h0(e.primaryShade)) throw new Error(Ck);
}
function pq(e, t) {
  if (!t) return kk(e), e;
  const n = EP(e, t);
  return t.fontFamily && !t.headings?.fontFamily && (n.headings.fontFamily = t.fontFamily), kk(n), n;
}
const IP = React.createContext(null),
  mq = () => React.useContext(IP) || NP;
function ni() {
  const e = React.useContext(IP);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app",
    );
  return e;
}
function uL({ theme: e, children: t, inherit: n = !0 }) {
  const r = mq(),
    i = React.useMemo(() => pq(n ? r : NP, e), [e, r, n]);
  return jsxRuntime.jsx(IP.Provider, {
    value: i,
    children: t,
  });
}
uL.displayName = "@mantine/core/MantineThemeProvider";
function vq() {
  const e = ni(),
    t = RP(),
    n = vi(e.breakpoints).reduce((r, i) => {
      const o = e.breakpoints[i].includes("px"),
        a = T7(e.breakpoints[i]),
        s = o ? `${a - 0.1}px` : Pk(a - 0.1),
        u = o ? `${a}px` : Pk(a);
      return `${r}@media (max-width: ${s}) {.mantine-visible-from-${i} {display: none !important;}}@media (min-width: ${u}) {.mantine-hidden-from-${i} {display: none !important;}}`;
    }, "");
  return jsxRuntime.jsx("style", {
    "data-mantine-styles": "classes",
    nonce: t?.(),
    dangerouslySetInnerHTML: {
      __html: n,
    },
  });
}
function p0(e) {
  return Object.entries(e)
    .map(([t, n]) => `${t}: ${n};`)
    .join("");
}
function dc(e, t) {
  return (Array.isArray(e) ? e : [e]).reduce((r, i) => `${i}{${r}}`, t);
}
function yq(e, t) {
  const n = p0(e.variables),
    r = n ? dc(t, n) : "",
    i = p0(e.dark),
    o = p0(e.light),
    a = i
      ? dc(t === ":host" ? `${t}([data-mantine-color-scheme="dark"])` : `${t}[data-mantine-color-scheme="dark"]`, i)
      : "",
    s = o
      ? dc(t === ":host" ? `${t}([data-mantine-color-scheme="light"])` : `${t}[data-mantine-color-scheme="light"]`, o)
      : "";
  return `${r}${a}${s}`;
}
function cL({ color: e, theme: t, autoContrast: n }) {
  return (typeof n == "boolean" ? n : t.autoContrast) &&
    ed({
      color: e || t.primaryColor,
      theme: t,
    }).isLight
    ? "var(--mantine-color-black)"
    : "var(--mantine-color-white)";
}
function jk(e, t) {
  return cL({
    color: e.colors[e.primaryColor][Zc(e, t)],
    theme: e,
    autoContrast: null,
  });
}
function Ih({ theme: e, color: t, colorScheme: n, name: r = t, withColorValues: i = !0 }) {
  if (!e.colors[t]) return {};
  if (n === "light") {
    const s = Zc(e, "light"),
      u = {
        [`--mantine-color-${r}-text`]: `var(--mantine-color-${r}-filled)`,
        [`--mantine-color-${r}-filled`]: `var(--mantine-color-${r}-${s})`,
        [`--mantine-color-${r}-filled-hover`]: `var(--mantine-color-${r}-${s === 9 ? 8 : s + 1})`,
        [`--mantine-color-${r}-light`]: Xs(e.colors[t][s], 0.1),
        [`--mantine-color-${r}-light-hover`]: Xs(e.colors[t][s], 0.12),
        [`--mantine-color-${r}-light-color`]: `var(--mantine-color-${r}-${s})`,
        [`--mantine-color-${r}-outline`]: `var(--mantine-color-${r}-${s})`,
        [`--mantine-color-${r}-outline-hover`]: Xs(e.colors[t][s], 0.05),
      };
    return i
      ? {
          [`--mantine-color-${r}-0`]: e.colors[t][0],
          [`--mantine-color-${r}-1`]: e.colors[t][1],
          [`--mantine-color-${r}-2`]: e.colors[t][2],
          [`--mantine-color-${r}-3`]: e.colors[t][3],
          [`--mantine-color-${r}-4`]: e.colors[t][4],
          [`--mantine-color-${r}-5`]: e.colors[t][5],
          [`--mantine-color-${r}-6`]: e.colors[t][6],
          [`--mantine-color-${r}-7`]: e.colors[t][7],
          [`--mantine-color-${r}-8`]: e.colors[t][8],
          [`--mantine-color-${r}-9`]: e.colors[t][9],
          ...u,
        }
      : u;
  }
  const o = Zc(e, "dark"),
    a = {
      [`--mantine-color-${r}-text`]: `var(--mantine-color-${r}-4)`,
      [`--mantine-color-${r}-filled`]: `var(--mantine-color-${r}-${o})`,
      [`--mantine-color-${r}-filled-hover`]: `var(--mantine-color-${r}-${o === 9 ? 8 : o + 1})`,
      [`--mantine-color-${r}-light`]: Xs(e.colors[t][Math.max(0, o - 2)], 0.15),
      [`--mantine-color-${r}-light-hover`]: Xs(e.colors[t][Math.max(0, o - 2)], 0.2),
      [`--mantine-color-${r}-light-color`]: `var(--mantine-color-${r}-${Math.max(o - 5, 0)})`,
      [`--mantine-color-${r}-outline`]: `var(--mantine-color-${r}-${Math.max(o - 4, 0)})`,
      [`--mantine-color-${r}-outline-hover`]: Xs(e.colors[t][Math.max(o - 4, 0)], 0.05),
    };
  return i
    ? {
        [`--mantine-color-${r}-0`]: e.colors[t][0],
        [`--mantine-color-${r}-1`]: e.colors[t][1],
        [`--mantine-color-${r}-2`]: e.colors[t][2],
        [`--mantine-color-${r}-3`]: e.colors[t][3],
        [`--mantine-color-${r}-4`]: e.colors[t][4],
        [`--mantine-color-${r}-5`]: e.colors[t][5],
        [`--mantine-color-${r}-6`]: e.colors[t][6],
        [`--mantine-color-${r}-7`]: e.colors[t][7],
        [`--mantine-color-${r}-8`]: e.colors[t][8],
        [`--mantine-color-${r}-9`]: e.colors[t][9],
        ...a,
      }
    : a;
}
function gq(e) {
  return !!e && typeof e == "object" && "mantine-virtual-color" in e;
}
function Zs(e, t, n) {
  vi(t).forEach((r) =>
    Object.assign(e, {
      [`--mantine-${n}-${r}`]: t[r],
    }),
  );
}
const fL = (e) => {
  const t = Zc(e, "light"),
    n = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : oe(e.defaultRadius),
    r = {
      variables: {
        "--mantine-scale": e.scale.toString(),
        "--mantine-cursor-type": e.cursorType,
        "--mantine-color-scheme": "light dark",
        "--mantine-webkit-font-smoothing": e.fontSmoothing ? "antialiased" : "unset",
        "--mantine-moz-font-smoothing": e.fontSmoothing ? "grayscale" : "unset",
        "--mantine-color-white": e.white,
        "--mantine-color-black": e.black,
        "--mantine-line-height": e.lineHeights.md,
        "--mantine-font-family": e.fontFamily,
        "--mantine-font-family-monospace": e.fontFamilyMonospace,
        "--mantine-font-family-headings": e.headings.fontFamily,
        "--mantine-heading-font-weight": e.headings.fontWeight,
        "--mantine-heading-text-wrap": e.headings.textWrap,
        "--mantine-radius-default": n,
        "--mantine-primary-color-filled": `var(--mantine-color-${e.primaryColor}-filled)`,
        "--mantine-primary-color-filled-hover": `var(--mantine-color-${e.primaryColor}-filled-hover)`,
        "--mantine-primary-color-light": `var(--mantine-color-${e.primaryColor}-light)`,
        "--mantine-primary-color-light-hover": `var(--mantine-color-${e.primaryColor}-light-hover)`,
        "--mantine-primary-color-light-color": `var(--mantine-color-${e.primaryColor}-light-color)`,
      },
      light: {
        "--mantine-primary-color-contrast": jk(e, "light"),
        "--mantine-color-bright": "var(--mantine-color-black)",
        "--mantine-color-text": e.black,
        "--mantine-color-body": e.white,
        "--mantine-color-error": "var(--mantine-color-red-6)",
        "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
        "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-${t})`,
        "--mantine-color-default": "var(--mantine-color-white)",
        "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
        "--mantine-color-default-color": "var(--mantine-color-black)",
        "--mantine-color-default-border": "var(--mantine-color-gray-4)",
        "--mantine-color-dimmed": "var(--mantine-color-gray-6)",
      },
      dark: {
        "--mantine-primary-color-contrast": jk(e, "dark"),
        "--mantine-color-bright": "var(--mantine-color-white)",
        "--mantine-color-text": "var(--mantine-color-dark-0)",
        "--mantine-color-body": "var(--mantine-color-dark-7)",
        "--mantine-color-error": "var(--mantine-color-red-8)",
        "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
        "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-4)`,
        "--mantine-color-default": "var(--mantine-color-dark-6)",
        "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
        "--mantine-color-default-color": "var(--mantine-color-white)",
        "--mantine-color-default-border": "var(--mantine-color-dark-4)",
        "--mantine-color-dimmed": "var(--mantine-color-dark-2)",
      },
    };
  Zs(r.variables, e.breakpoints, "breakpoint"),
    Zs(r.variables, e.spacing, "spacing"),
    Zs(r.variables, e.fontSizes, "font-size"),
    Zs(r.variables, e.lineHeights, "line-height"),
    Zs(r.variables, e.shadows, "shadow"),
    Zs(r.variables, e.radius, "radius"),
    e.colors[e.primaryColor].forEach((o, a) => {
      r.variables[`--mantine-primary-color-${a}`] = `var(--mantine-color-${e.primaryColor}-${a})`;
    }),
    vi(e.colors).forEach((o) => {
      const a = e.colors[o];
      if (gq(a)) {
        Object.assign(
          r.light,
          Ih({
            theme: e,
            name: a.name,
            color: a.light,
            colorScheme: "light",
            withColorValues: !0,
          }),
        ),
          Object.assign(
            r.dark,
            Ih({
              theme: e,
              name: a.name,
              color: a.dark,
              colorScheme: "dark",
              withColorValues: !0,
            }),
          );
        return;
      }
      a.forEach((s, u) => {
        r.variables[`--mantine-color-${o}-${u}`] = s;
      }),
        Object.assign(
          r.light,
          Ih({
            theme: e,
            color: o,
            colorScheme: "light",
            withColorValues: !1,
          }),
        ),
        Object.assign(
          r.dark,
          Ih({
            theme: e,
            color: o,
            colorScheme: "dark",
            withColorValues: !1,
          }),
        );
    });
  const i = e.headings.sizes;
  return (
    vi(i).forEach((o) => {
      (r.variables[`--mantine-${o}-font-size`] = i[o].fontSize),
        (r.variables[`--mantine-${o}-line-height`] = i[o].lineHeight),
        (r.variables[`--mantine-${o}-font-weight`] = i[o].fontWeight || e.headings.fontWeight);
    }),
    r
  );
};
function bq({ theme: e, generator: t }) {
  const n = fL(e),
    r = t?.(e);
  return r ? EP(n, r) : n;
}
const m0 = fL(NP);
function wq(e) {
  const t = {
    variables: {},
    light: {},
    dark: {},
  };
  return (
    vi(e.variables).forEach((n) => {
      m0.variables[n] !== e.variables[n] && (t.variables[n] = e.variables[n]);
    }),
    vi(e.light).forEach((n) => {
      m0.light[n] !== e.light[n] && (t.light[n] = e.light[n]);
    }),
    vi(e.dark).forEach((n) => {
      m0.dark[n] !== e.dark[n] && (t.dark[n] = e.dark[n]);
    }),
    t
  );
}
function xq(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function dL({ cssVariablesSelector: e, deduplicateCssVariables: t }) {
  const n = ni(),
    r = RP(),
    i = Q7(),
    o = bq({
      theme: n,
      generator: i,
    }),
    a = e === ":root" && t,
    s = a ? wq(o) : o,
    u = yq(s, e);
  return u
    ? jsxRuntime.jsx("style", {
        "data-mantine-styles": !0,
        nonce: r?.(),
        dangerouslySetInnerHTML: {
          __html: `${u}${a ? "" : xq(e)}`,
        },
      })
    : null;
}
dL.displayName = "@mantine/CssVariables";
function Sq() {
  const e = console.error;
  console.error = (...t) => {
    (t.length > 1 &&
      typeof t[0] == "string" &&
      t[0].toLowerCase().includes("extra attributes from the server") &&
      typeof t[1] == "string" &&
      t[1].toLowerCase().includes("data-mantine-color-scheme")) ||
      e(...t);
  };
}
function Qs(e, t) {
  const n = typeof window < "u" && "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")?.matches,
    r = e !== "auto" ? e : n ? "dark" : "light";
  t()?.setAttribute("data-mantine-color-scheme", r);
}
function _q({ manager: e, defaultColorScheme: t, getRootElement: n, forceColorScheme: r }) {
  const i = React.useRef(null),
    [o, a] = React.useState(() => e.get(t)),
    s = r || o,
    u = React.useCallback(
      (d) => {
        r || (Qs(d, n), a(d), e.set(d));
      },
      [e.set, s, r],
    ),
    c = React.useCallback(() => {
      a(t), Qs(t, n), e.clear();
    }, [e.clear, t]);
  return (
    React.useEffect(() => (e.subscribe(u), e.unsubscribe), [e.subscribe, e.unsubscribe]),
    Jf(() => {
      Qs(e.get(t), n);
    }, []),
    React.useEffect(() => {
      if (r) return Qs(r, n), () => {};
      r === void 0 && Qs(o, n),
        typeof window < "u" &&
          "matchMedia" in window &&
          (i.current = window.matchMedia("(prefers-color-scheme: dark)"));
      const d = (h) => {
        o === "auto" && Qs(h.matches ? "dark" : "light", n);
      };
      return i.current?.addEventListener("change", d), () => i.current?.removeEventListener("change", d);
    }, [o, r]),
    {
      colorScheme: s,
      setColorScheme: u,
      clearColorScheme: c,
    }
  );
}
function Pq({ respectReducedMotion: e, getRootElement: t }) {
  Jf(() => {
    e && t()?.setAttribute("data-respect-reduced-motion", "true");
  }, [e]);
}
Sq();
function MantineProvider({
  theme: e,
  children: t,
  getStyleNonce: n,
  withStaticClasses: r = !0,
  withGlobalClasses: i = !0,
  deduplicateCssVariables: o = !0,
  withCssVariables: a = !0,
  cssVariablesSelector: s = ":root",
  classNamesPrefix: u = "mantine",
  colorSchemeManager: c = dq(),
  defaultColorScheme: d = "light",
  getRootElement: h = () => document.documentElement,
  cssVariablesResolver: p,
  forceColorScheme: v,
  stylesTransform: b,
  env: y,
}) {
  const {
    colorScheme: w,
    setColorScheme: x,
    clearColorScheme: S,
  } = _q({
    defaultColorScheme: d,
    forceColorScheme: v,
    manager: c,
    getRootElement: h,
  });
  return (
    Pq({
      respectReducedMotion: e?.respectReducedMotion || !1,
      getRootElement: h,
    }),
    jsxRuntime.jsx(sL.Provider, {
      value: {
        colorScheme: w,
        setColorScheme: x,
        clearColorScheme: S,
        getRootElement: h,
        classNamesPrefix: u,
        getStyleNonce: n,
        cssVariablesResolver: p,
        cssVariablesSelector: s,
        withStaticClasses: r,
        stylesTransform: b,
        env: y,
      },
      children: jsxRuntime.jsxs(uL, {
        theme: e,
        children: [
          a &&
            jsxRuntime.jsx(dL, {
              cssVariablesSelector: s,
              deduplicateCssVariables: o,
            }),
          i && jsxRuntime.jsx(vq, {}),
          t,
        ],
      }),
    })
  );
}
MantineProvider.displayName = "@mantine/core/MantineProvider";
function ev({ classNames: e, styles: t, props: n, stylesCtx: r }) {
  const i = ni();
  return {
    resolvedClassNames: Jm({
      theme: i,
      classNames: e,
      props: n,
      stylesCtx: r || void 0,
    }),
    resolvedStyles: Ep({
      theme: i,
      styles: t,
      props: n,
      stylesCtx: r || void 0,
    }),
  };
}
const Aq = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never",
};
function Oq({ theme: e, options: t, unstyled: n }) {
  return We(t?.focusable && !n && (e.focusClassName || Aq[e.focusRing]), t?.active && !n && e.activeClassName);
}
function Eq({ selector: e, stylesCtx: t, options: n, props: r, theme: i }) {
  return Jm({
    theme: i,
    classNames: n?.classNames,
    props: n?.props || r,
    stylesCtx: t,
  })[e];
}
function Rk({ selector: e, stylesCtx: t, theme: n, classNames: r, props: i }) {
  return Jm({
    theme: n,
    classNames: r,
    props: i,
    stylesCtx: t,
  })[e];
}
function Tq({ rootSelector: e, selector: t, className: n }) {
  return e === t ? n : void 0;
}
function Cq({ selector: e, classes: t, unstyled: n }) {
  return n ? void 0 : t[e];
}
function kq({ themeName: e, classNamesPrefix: t, selector: n, withStaticClass: r }) {
  return r === !1 ? [] : e.map((i) => `${t}-${i}-${n}`);
}
function jq({ themeName: e, theme: t, selector: n, props: r, stylesCtx: i }) {
  return e.map(
    (o) =>
      Jm({
        theme: t,
        classNames: t.components[o]?.classNames,
        props: r,
        stylesCtx: i,
      })?.[n],
  );
}
function Rq({ options: e, classes: t, selector: n, unstyled: r }) {
  return e?.variant && !r ? t[`${n}--${e.variant}`] : void 0;
}
function Mq({
  theme: e,
  options: t,
  themeName: n,
  selector: r,
  classNamesPrefix: i,
  classNames: o,
  classes: a,
  unstyled: s,
  className: u,
  rootSelector: c,
  props: d,
  stylesCtx: h,
  withStaticClasses: p,
  headless: v,
  transformedStyles: b,
}) {
  return We(
    Oq({
      theme: e,
      options: t,
      unstyled: s || v,
    }),
    jq({
      theme: e,
      themeName: n,
      selector: r,
      props: d,
      stylesCtx: h,
    }),
    Rq({
      options: t,
      classes: a,
      selector: r,
      unstyled: s,
    }),
    Rk({
      selector: r,
      stylesCtx: h,
      theme: e,
      classNames: o,
      props: d,
    }),
    Rk({
      selector: r,
      stylesCtx: h,
      theme: e,
      classNames: b,
      props: d,
    }),
    Eq({
      selector: r,
      stylesCtx: h,
      options: t,
      props: d,
      theme: e,
    }),
    Tq({
      rootSelector: c,
      selector: r,
      className: u,
    }),
    Cq({
      selector: r,
      classes: a,
      unstyled: s || v,
    }),
    p &&
      !v &&
      kq({
        themeName: n,
        classNamesPrefix: i,
        selector: r,
        withStaticClass: t?.withStaticClass,
      }),
    t?.className,
  );
}
function Nq({ theme: e, themeName: t, props: n, stylesCtx: r, selector: i }) {
  return t
    .map(
      (o) =>
        Ep({
          theme: e,
          styles: e.components[o]?.styles,
          props: n,
          stylesCtx: r,
        })[i],
    )
    .reduce(
      (o, a) => ({
        ...o,
        ...a,
      }),
      {},
    );
}
function aS({ style: e, theme: t }) {
  return Array.isArray(e)
    ? [...e].reduce(
        (n, r) => ({
          ...n,
          ...aS({
            style: r,
            theme: t,
          }),
        }),
        {},
      )
    : typeof e == "function"
      ? e(t)
      : (e ?? {});
}
function Iq(e) {
  return e.reduce(
    (t, n) => (
      n &&
        Object.keys(n).forEach((r) => {
          t[r] = {
            ...t[r],
            ...TP(n[r]),
          };
        }),
      t
    ),
    {},
  );
}
function Dq({ vars: e, varsResolver: t, theme: n, props: r, stylesCtx: i, selector: o, themeName: a, headless: s }) {
  return Iq([s ? {} : t?.(n, r, i), ...a.map((u) => n.components?.[u]?.vars?.(n, r, i)), e?.(n, r, i)])?.[o];
}
function $q({
  theme: e,
  themeName: t,
  selector: n,
  options: r,
  props: i,
  stylesCtx: o,
  rootSelector: a,
  styles: s,
  style: u,
  vars: c,
  varsResolver: d,
  headless: h,
  withStylesTransform: p,
}) {
  return {
    ...(!p &&
      Nq({
        theme: e,
        themeName: t,
        props: i,
        stylesCtx: o,
        selector: n,
      })),
    ...(!p &&
      Ep({
        theme: e,
        styles: s,
        props: i,
        stylesCtx: o,
      })[n]),
    ...(!p &&
      Ep({
        theme: e,
        styles: r?.styles,
        props: r?.props || i,
        stylesCtx: o,
      })[n]),
    ...Dq({
      theme: e,
      props: i,
      stylesCtx: o,
      vars: c,
      varsResolver: d,
      selector: n,
      themeName: t,
      headless: h,
    }),
    ...(a === n
      ? aS({
          style: u,
          theme: e,
        })
      : null),
    ...aS({
      style: r?.style,
      theme: e,
    }),
  };
}
function Lq({ props: e, stylesCtx: t, themeName: n }) {
  const r = ni(),
    i = rq()?.();
  return {
    getTransformedStyles: (a) =>
      i
        ? [
            ...a.map((u) =>
              i(u, {
                props: e,
                theme: r,
                ctx: t,
              }),
            ),
            ...n.map((u) =>
              i(r.components[u]?.styles, {
                props: e,
                theme: r,
                ctx: t,
              }),
            ),
          ].filter(Boolean)
        : [],
    withStylesTransform: !!i,
  };
}
function et({
  name: e,
  classes: t,
  props: n,
  stylesCtx: r,
  className: i,
  style: o,
  rootSelector: a = "root",
  unstyled: s,
  classNames: u,
  styles: c,
  vars: d,
  varsResolver: h,
}) {
  const p = ni(),
    v = J7(),
    b = eq(),
    y = tq(),
    w = (Array.isArray(e) ? e : [e]).filter((_) => _),
    { withStylesTransform: x, getTransformedStyles: S } = Lq({
      props: n,
      stylesCtx: r,
      themeName: w,
    });
  return (_, E) => ({
    className: Mq({
      theme: p,
      options: E,
      themeName: w,
      selector: _,
      classNamesPrefix: v,
      classNames: u,
      classes: t,
      unstyled: s,
      className: i,
      rootSelector: a,
      props: n,
      stylesCtx: r,
      withStaticClasses: b,
      headless: y,
      transformedStyles: S([E?.styles, c]),
    }),
    style: $q({
      theme: p,
      themeName: w,
      selector: _,
      options: E,
      props: n,
      stylesCtx: r,
      rootSelector: a,
      styles: c,
      style: o,
      vars: d,
      varsResolver: h,
      headless: y,
      withStylesTransform: x,
    }),
  });
}
function Bq(e, t) {
  return typeof e == "boolean" ? e : t.autoContrast;
}
function ye(e, t, n) {
  const r = ni(),
    i = r.components[e]?.defaultProps,
    o = typeof i == "function" ? i(r) : i;
  return {
    ...t,
    ...o,
    ...TP(n),
  };
}
function v0(e) {
  return vi(e)
    .reduce((t, n) => (e[n] !== void 0 ? `${t}${O7(n)}:${e[n]};` : t), "")
    .trim();
}
function Fq({ selector: e, styles: t, media: n, container: r }) {
  const i = t ? v0(t) : "",
    o = Array.isArray(n) ? n.map((s) => `@media${s.query}{${e}{${v0(s.styles)}}}`) : [],
    a = Array.isArray(r) ? r.map((s) => `@container ${s.query}{${e}{${v0(s.styles)}}}`) : [];
  return `${i ? `${e}{${i}}` : ""}${o.join("")}${a.join("")}`.trim();
}
function Vq(e) {
  const t = RP();
  return jsxRuntime.jsx("style", {
    "data-mantine-styles": "inline",
    nonce: t?.(),
    dangerouslySetInnerHTML: {
      __html: Fq(e),
    },
  });
}
function tv(e) {
  const {
    m: t,
    mx: n,
    my: r,
    mt: i,
    mb: o,
    ml: a,
    mr: s,
    me: u,
    ms: c,
    p: d,
    px: h,
    py: p,
    pt: v,
    pb: b,
    pl: y,
    pr: w,
    pe: x,
    ps: S,
    bd: _,
    bg: E,
    c: P,
    opacity: O,
    ff: k,
    fz: R,
    fw: M,
    lts: D,
    ta: I,
    lh: V,
    fs: z,
    tt: q,
    td: U,
    w: B,
    miw: F,
    maw: L,
    h: W,
    mih: G,
    mah: $,
    bgsz: K,
    bgp: ne,
    bgr: he,
    bga: le,
    pos: pe,
    top: Pe,
    left: xe,
    bottom: re,
    right: ve,
    inset: je,
    display: ie,
    flex: Qe,
    hiddenFrom: De,
    visibleFrom: Ve,
    lightHidden: ot,
    darkHidden: se,
    sx: fe,
    ...we
  } = e;
  return {
    styleProps: TP({
      m: t,
      mx: n,
      my: r,
      mt: i,
      mb: o,
      ml: a,
      mr: s,
      me: u,
      ms: c,
      p: d,
      px: h,
      py: p,
      pt: v,
      pb: b,
      pl: y,
      pr: w,
      pe: x,
      ps: S,
      bd: _,
      bg: E,
      c: P,
      opacity: O,
      ff: k,
      fz: R,
      fw: M,
      lts: D,
      ta: I,
      lh: V,
      fs: z,
      tt: q,
      td: U,
      w: B,
      miw: F,
      maw: L,
      h: W,
      mih: G,
      mah: $,
      bgsz: K,
      bgp: ne,
      bgr: he,
      bga: le,
      pos: pe,
      top: Pe,
      left: xe,
      bottom: re,
      right: ve,
      inset: je,
      display: ie,
      flex: Qe,
      hiddenFrom: De,
      visibleFrom: Ve,
      lightHidden: ot,
      darkHidden: se,
      sx: fe,
    }),
    rest: we,
  };
}
const zq = {
  m: {
    type: "spacing",
    property: "margin",
  },
  mt: {
    type: "spacing",
    property: "marginTop",
  },
  mb: {
    type: "spacing",
    property: "marginBottom",
  },
  ml: {
    type: "spacing",
    property: "marginLeft",
  },
  mr: {
    type: "spacing",
    property: "marginRight",
  },
  ms: {
    type: "spacing",
    property: "marginInlineStart",
  },
  me: {
    type: "spacing",
    property: "marginInlineEnd",
  },
  mx: {
    type: "spacing",
    property: "marginInline",
  },
  my: {
    type: "spacing",
    property: "marginBlock",
  },
  p: {
    type: "spacing",
    property: "padding",
  },
  pt: {
    type: "spacing",
    property: "paddingTop",
  },
  pb: {
    type: "spacing",
    property: "paddingBottom",
  },
  pl: {
    type: "spacing",
    property: "paddingLeft",
  },
  pr: {
    type: "spacing",
    property: "paddingRight",
  },
  ps: {
    type: "spacing",
    property: "paddingInlineStart",
  },
  pe: {
    type: "spacing",
    property: "paddingInlineEnd",
  },
  px: {
    type: "spacing",
    property: "paddingInline",
  },
  py: {
    type: "spacing",
    property: "paddingBlock",
  },
  bd: {
    type: "border",
    property: "border",
  },
  bg: {
    type: "color",
    property: "background",
  },
  c: {
    type: "textColor",
    property: "color",
  },
  opacity: {
    type: "identity",
    property: "opacity",
  },
  ff: {
    type: "fontFamily",
    property: "fontFamily",
  },
  fz: {
    type: "fontSize",
    property: "fontSize",
  },
  fw: {
    type: "identity",
    property: "fontWeight",
  },
  lts: {
    type: "size",
    property: "letterSpacing",
  },
  ta: {
    type: "identity",
    property: "textAlign",
  },
  lh: {
    type: "lineHeight",
    property: "lineHeight",
  },
  fs: {
    type: "identity",
    property: "fontStyle",
  },
  tt: {
    type: "identity",
    property: "textTransform",
  },
  td: {
    type: "identity",
    property: "textDecoration",
  },
  w: {
    type: "spacing",
    property: "width",
  },
  miw: {
    type: "spacing",
    property: "minWidth",
  },
  maw: {
    type: "spacing",
    property: "maxWidth",
  },
  h: {
    type: "spacing",
    property: "height",
  },
  mih: {
    type: "spacing",
    property: "minHeight",
  },
  mah: {
    type: "spacing",
    property: "maxHeight",
  },
  bgsz: {
    type: "size",
    property: "backgroundSize",
  },
  bgp: {
    type: "identity",
    property: "backgroundPosition",
  },
  bgr: {
    type: "identity",
    property: "backgroundRepeat",
  },
  bga: {
    type: "identity",
    property: "backgroundAttachment",
  },
  pos: {
    type: "identity",
    property: "position",
  },
  top: {
    type: "size",
    property: "top",
  },
  left: {
    type: "size",
    property: "left",
  },
  bottom: {
    type: "size",
    property: "bottom",
  },
  right: {
    type: "size",
    property: "right",
  },
  inset: {
    type: "size",
    property: "inset",
  },
  display: {
    type: "identity",
    property: "display",
  },
  flex: {
    type: "identity",
    property: "flex",
  },
};
function DP(e, t) {
  const n = ed({
    color: e,
    theme: t,
  });
  return n.color === "dimmed"
    ? "var(--mantine-color-dimmed)"
    : n.color === "bright"
      ? "var(--mantine-color-bright)"
      : n.variable
        ? `var(${n.variable})`
        : n.color;
}
function qq(e, t) {
  const n = ed({
    color: e,
    theme: t,
  });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : DP(e, t);
}
function Wq(e, t) {
  if (typeof e == "number") return oe(e);
  if (typeof e == "string") {
    const [n, r, ...i] = e.split(" ").filter((a) => a.trim() !== "");
    let o = `${oe(n)}`;
    return r && (o += ` ${r}`), i.length > 0 && (o += ` ${DP(i.join(" "), t)}`), o.trim();
  }
  return e;
}
const Mk = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)",
};
function Uq(e) {
  return typeof e == "string" && e in Mk ? Mk[e] : e;
}
const Hq = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Kq(e, t) {
  return typeof e == "string" && e in t.fontSizes
    ? `var(--mantine-font-size-${e})`
    : typeof e == "string" && Hq.includes(e)
      ? `var(--mantine-${e}-font-size)`
      : typeof e == "number" || typeof e == "string"
        ? oe(e)
        : e;
}
function Gq(e) {
  return e;
}
const Yq = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Xq(e, t) {
  return typeof e == "string" && e in t.lineHeights
    ? `var(--mantine-line-height-${e})`
    : typeof e == "string" && Yq.includes(e)
      ? `var(--mantine-${e}-line-height)`
      : e;
}
function Zq(e) {
  return typeof e == "number" ? oe(e) : e;
}
function Qq(e, t) {
  if (typeof e == "number") return oe(e);
  if (typeof e == "string") {
    const n = e.replace("-", "");
    if (!(n in t.spacing)) return oe(e);
    const r = `--mantine-spacing-${n}`;
    return e.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return e;
}
const y0 = {
  color: DP,
  textColor: qq,
  fontSize: Kq,
  spacing: Qq,
  identity: Gq,
  size: Zq,
  lineHeight: Xq,
  fontFamily: Uq,
  border: Wq,
};
function Nk(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function Jq({ media: e, ...t }) {
  const r = Object.keys(e)
    .sort((i, o) => Number(Nk(i)) - Number(Nk(o)))
    .map((i) => ({
      query: i,
      styles: e[i],
    }));
  return {
    ...t,
    media: r,
  };
}
function eW(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function tW(e) {
  return typeof e == "object" && e !== null ? ("base" in e ? e.base : void 0) : e;
}
function nW(e) {
  return typeof e == "object" && e !== null ? vi(e).filter((t) => t !== "base") : [];
}
function rW(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function iW({ styleProps: e, data: t, theme: n }) {
  return Jq(
    vi(e).reduce(
      (r, i) => {
        if (i === "hiddenFrom" || i === "visibleFrom" || i === "sx") return r;
        const o = t[i],
          a = Array.isArray(o.property) ? o.property : [o.property],
          s = tW(e[i]);
        if (!eW(e[i]))
          return (
            a.forEach((c) => {
              r.inlineStyles[c] = y0[o.type](s, n);
            }),
            r
          );
        r.hasResponsiveStyles = !0;
        const u = nW(e[i]);
        return (
          a.forEach((c) => {
            s && (r.styles[c] = y0[o.type](s, n)),
              u.forEach((d) => {
                const h = `(min-width: ${n.breakpoints[d]})`;
                r.media[h] = {
                  ...r.media[h],
                  [c]: y0[o.type](rW(e[i], d), n),
                };
              });
          }),
          r
        );
      },
      {
        hasResponsiveStyles: !1,
        styles: {},
        inlineStyles: {},
        media: {},
      },
    ),
  );
}
function oW() {
  return `__m__-${React.useId().replace(/:/g, "")}`;
}
function $P(e, t) {
  return Array.isArray(e)
    ? [...e].reduce(
        (n, r) => ({
          ...n,
          ...$P(r, t),
        }),
        {},
      )
    : typeof e == "function"
      ? e(t)
      : (e ?? {});
}
function pL(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function aW(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return r === void 0 || r === "" || r === !1 || r === null || (t[pL(n)] = e[n]), t;
  }, {});
}
function mL(e) {
  return e
    ? typeof e == "string"
      ? {
          [pL(e)]: !0,
        }
      : Array.isArray(e)
        ? [...e].reduce(
            (t, n) => ({
              ...t,
              ...mL(n),
            }),
            {},
          )
        : aW(e)
    : null;
}
function sS(e, t) {
  return Array.isArray(e)
    ? [...e].reduce(
        (n, r) => ({
          ...n,
          ...sS(r, t),
        }),
        {},
      )
    : typeof e == "function"
      ? e(t)
      : (e ?? {});
}
function sW({ theme: e, style: t, vars: n, styleProps: r }) {
  const i = sS(t, e),
    o = sS(n, e);
  return {
    ...i,
    ...o,
    ...r,
  };
}
const vL = React.forwardRef(
  (
    {
      component: e,
      style: t,
      __vars: n,
      className: r,
      variant: i,
      mod: o,
      size: a,
      hiddenFrom: s,
      visibleFrom: u,
      lightHidden: c,
      darkHidden: d,
      renderRoot: h,
      __size: p,
      ...v
    },
    b,
  ) => {
    const y = ni(),
      w = e || "div",
      { styleProps: x, rest: S } = tv(v),
      E = nq()?.()?.(x.sx),
      P = oW(),
      O = iW({
        styleProps: x,
        theme: y,
        data: zq,
      }),
      k = {
        ref: b,
        style: sW({
          theme: y,
          style: t,
          vars: n,
          styleProps: O.inlineStyles,
        }),
        className: We(r, E, {
          [P]: O.hasResponsiveStyles,
          "mantine-light-hidden": c,
          "mantine-dark-hidden": d,
          [`mantine-hidden-from-${s}`]: s,
          [`mantine-visible-from-${u}`]: u,
        }),
        "data-variant": i,
        "data-size": Q3(a) ? void 0 : a || void 0,
        size: p,
        ...mL(o),
        ...S,
      };
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        O.hasResponsiveStyles &&
          jsxRuntime.jsx(Vq, {
            selector: `.${P}`,
            styles: O.styles,
            media: O.media,
          }),
        typeof h == "function"
          ? h(k)
          : jsxRuntime.jsx(w, {
              ...k,
            }),
      ],
    });
  },
);
vL.displayName = "@mantine/core/Box";
const Se = vL;
function yL(e) {
  return e;
}
function lW(e) {
  const t = e;
  return (n) => {
    const r = React.forwardRef((i, o) =>
      jsxRuntime.jsx(t, {
        ...n,
        ...i,
        ref: o,
      }),
    );
    return (r.extend = t.extend), (r.displayName = `WithProps(${t.displayName})`), r;
  };
}
function ke(e) {
  const t = React.forwardRef(e);
  return (
    (t.extend = yL),
    (t.withProps = (n) => {
      const r = React.forwardRef((i, o) =>
        jsxRuntime.jsx(t, {
          ...n,
          ...i,
          ref: o,
        }),
      );
      return (r.extend = t.extend), (r.displayName = `WithProps(${t.displayName})`), r;
    }),
    t
  );
}
function vo(e) {
  const t = React.forwardRef(e);
  return (
    (t.withProps = (n) => {
      const r = React.forwardRef((i, o) =>
        jsxRuntime.jsx(t, {
          ...n,
          ...i,
          ref: o,
        }),
      );
      return (r.extend = t.extend), (r.displayName = `WithProps(${t.displayName})`), r;
    }),
    (t.extend = yL),
    t
  );
}
const uW = React.createContext({
  dir: "ltr",
  toggleDirection: () => {},
  setDirection: () => {},
});
function ou() {
  return React.useContext(uW);
}
var nv = z3();
const cW = ht(nv);
function fW(e) {
  if (!e || typeof e == "string") return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function g0(e) {
  return e?.current ? e.current.scrollHeight : "auto";
}
const hc = typeof window < "u" && window.requestAnimationFrame;
function dW({ transitionDuration: e, transitionTimingFunction: t = "ease", onTransitionEnd: n = () => {}, opened: r }) {
  const i = React.useRef(null),
    o = 0,
    a = {
      height: 0,
      overflow: "hidden",
    },
    [s, u] = React.useState(r ? {} : a),
    c = (b) => {
      nv.flushSync(() => u(b));
    },
    d = (b) => {
      c((y) => ({
        ...y,
        ...b,
      }));
    };
  function h(b) {
    const y = e || fW(b);
    return {
      transition: `height ${y}ms ${t}, opacity ${y}ms ${t}`,
    };
  }
  ia(() => {
    typeof hc == "function" &&
      hc(
        r
          ? () => {
              d({
                willChange: "height",
                display: "block",
                overflow: "hidden",
              }),
                hc(() => {
                  const b = g0(i);
                  d({
                    ...h(b),
                    height: b,
                  });
                });
            }
          : () => {
              const b = g0(i);
              d({
                ...h(b),
                willChange: "height",
                height: b,
              }),
                hc(() =>
                  d({
                    height: o,
                    overflow: "hidden",
                  }),
                );
            },
      );
  }, [r]);
  const p = (b) => {
    if (!(b.target !== i.current || b.propertyName !== "height"))
      if (r) {
        const y = g0(i);
        y === s.height
          ? c({})
          : d({
              height: y,
            }),
          n();
      } else s.height === o && (c(a), n());
  };
  function v({ style: b = {}, refKey: y = "ref", ...w } = {}) {
    const x = w[y],
      S = {
        "aria-hidden": !r,
        ...w,
        [y]: oL(i, x),
        onTransitionEnd: p,
        style: {
          boxSizing: "border-box",
          ...b,
          ...s,
        },
      };
    return ReactDefault.version.startsWith("18") ? r || (S.inert = "") : (S.inert = !r), S;
  }
  return v;
}
const hW = {
    transitionDuration: 200,
    transitionTimingFunction: "ease",
    animateOpacity: !0,
  },
  al = ke((e, t) => {
    const {
        children: n,
        in: r,
        transitionDuration: i,
        transitionTimingFunction: o,
        style: a,
        onTransitionEnd: s,
        animateOpacity: u,
        ...c
      } = ye("Collapse", hW, e),
      d = ni(),
      h = jP(),
      v = (d.respectReducedMotion ? h : !1) ? 0 : i,
      b = dW({
        opened: r,
        transitionDuration: v,
        transitionTimingFunction: o,
        onTransitionEnd: s,
      });
    return v === 0
      ? r
        ? jsxRuntime.jsx(Se, {
            ...c,
            children: n,
          })
        : null
      : jsxRuntime.jsx(Se, {
          ...b({
            style: {
              opacity: r || !u ? 1 : 0,
              transition: u ? `opacity ${v}ms ${o}` : "none",
              ...$P(a, d),
            },
            ref: t,
            ...c,
          }),
          children: n,
        });
  });
al.displayName = "@mantine/core/Collapse";
