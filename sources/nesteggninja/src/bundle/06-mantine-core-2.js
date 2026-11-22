const [GU, jr] = kr("ScrollArea.Root component was not found in tree");
function kl(e, t) {
  const n = qa(t);
  Jf(() => {
    let r = 0;
    if (e) {
      const i = new ResizeObserver(() => {
        cancelAnimationFrame(r), (r = window.requestAnimationFrame(n));
      });
      return (
        i.observe(e),
        () => {
          window.cancelAnimationFrame(r), i.unobserve(e);
        }
      );
    }
  }, [e, n]);
}
const YU = React.forwardRef((e, t) => {
    const { style: n, ...r } = e,
      i = jr(),
      [o, a] = React.useState(0),
      [s, u] = React.useState(0),
      c = !!(o && s);
    return (
      kl(i.scrollbarX, () => {
        const d = i.scrollbarX?.offsetHeight || 0;
        i.onCornerHeightChange(d), u(d);
      }),
      kl(i.scrollbarY, () => {
        const d = i.scrollbarY?.offsetWidth || 0;
        i.onCornerWidthChange(d), a(d);
      }),
      c
        ? jsxRuntime.jsx("div", {
            ...r,
            ref: t,
            style: {
              ...n,
              width: o,
              height: s,
            },
          })
        : null
    );
  }),
  XU = React.forwardRef((e, t) => {
    const n = jr(),
      r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r
      ? jsxRuntime.jsx(YU, {
          ...e,
          ref: t,
        })
      : null;
  }),
  ZU = {
    scrollHideDelay: 1e3,
    type: "hover",
  },
  DL = React.forwardRef((e, t) => {
    const n = ye("ScrollAreaRoot", ZU, e),
      { type: r, scrollHideDelay: i, scrollbars: o, ...a } = n,
      [s, u] = React.useState(null),
      [c, d] = React.useState(null),
      [h, p] = React.useState(null),
      [v, b] = React.useState(null),
      [y, w] = React.useState(null),
      [x, S] = React.useState(0),
      [_, E] = React.useState(0),
      [P, O] = React.useState(!1),
      [k, R] = React.useState(!1),
      M = bn(t, (D) => u(D));
    return jsxRuntime.jsx(GU, {
      value: {
        type: r,
        scrollHideDelay: i,
        scrollArea: s,
        viewport: c,
        onViewportChange: d,
        content: h,
        onContentChange: p,
        scrollbarX: v,
        onScrollbarXChange: b,
        scrollbarXEnabled: P,
        onScrollbarXEnabledChange: O,
        scrollbarY: y,
        onScrollbarYChange: w,
        scrollbarYEnabled: k,
        onScrollbarYEnabledChange: R,
        onCornerWidthChange: S,
        onCornerHeightChange: E,
      },
      children: jsxRuntime.jsx(Se, {
        ...a,
        ref: M,
        __vars: {
          "--sa-corner-width": o !== "xy" ? "0px" : `${x}px`,
          "--sa-corner-height": o !== "xy" ? "0px" : `${_}px`,
        },
      }),
    });
  });
DL.displayName = "@mantine/core/ScrollAreaRoot";
function $L(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function lv(e) {
  const t = $L(e.viewport, e.content),
    n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function LL(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function QU(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Qk(e, t, n = "ltr") {
  const r = lv(t),
    i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    o = t.scrollbar.size - i,
    a = t.content - t.viewport,
    s = o - r,
    u = n === "ltr" ? [0, a] : [a * -1, 0],
    c = QU(e, u);
  return LL([0, a], [0, s])(c);
}
function JU(e, t, n, r = "ltr") {
  const i = lv(n),
    o = i / 2,
    a = t || o,
    s = i - a,
    u = n.scrollbar.paddingStart + a,
    c = n.scrollbar.size - n.scrollbar.paddingEnd - s,
    d = n.content - n.viewport,
    h = r === "ltr" ? [0, d] : [d * -1, 0];
  return LL([u, c], h)(e);
}
function BL(e, t) {
  return e > 0 && e < t;
}
function Rp(e) {
  return e ? parseInt(e, 10) : 0;
}
function es(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    e?.(r), (n === !1 || !r.defaultPrevented) && t?.(r);
  };
}
const [eH, FL] = kr("ScrollAreaScrollbar was not found in tree"),
  VL = React.forwardRef((e, t) => {
    const {
        sizes: n,
        hasThumb: r,
        onThumbChange: i,
        onThumbPointerUp: o,
        onThumbPointerDown: a,
        onThumbPositionChange: s,
        onDragScroll: u,
        onWheelScroll: c,
        onResize: d,
        ...h
      } = e,
      p = jr(),
      [v, b] = React.useState(null),
      y = bn(t, (R) => b(R)),
      w = React.useRef(null),
      x = React.useRef(""),
      { viewport: S } = p,
      _ = n.content - n.viewport,
      E = qa(c),
      P = qa(s),
      O = Zm(d, 10),
      k = (R) => {
        if (w.current) {
          const M = R.clientX - w.current.left,
            D = R.clientY - w.current.top;
          u({
            x: M,
            y: D,
          });
        }
      };
    return (
      React.useEffect(() => {
        const R = (M) => {
          const D = M.target;
          v?.contains(D) && E(M, _);
        };
        return (
          document.addEventListener("wheel", R, {
            passive: !1,
          }),
          () =>
            document.removeEventListener("wheel", R, {
              passive: !1,
            })
        );
      }, [S, v, _, E]),
      React.useEffect(P, [n, P]),
      kl(v, O),
      kl(p.content, O),
      jsxRuntime.jsx(eH, {
        value: {
          scrollbar: v,
          hasThumb: r,
          onThumbChange: qa(i),
          onThumbPointerUp: qa(o),
          onThumbPositionChange: P,
          onThumbPointerDown: qa(a),
        },
        children: jsxRuntime.jsx("div", {
          ...h,
          ref: y,
          "data-mantine-scrollbar": !0,
          style: {
            position: "absolute",
            ...h.style,
          },
          onPointerDown: es(e.onPointerDown, (R) => {
            R.preventDefault(),
              R.button === 0 &&
                (R.target.setPointerCapture(R.pointerId),
                (w.current = v.getBoundingClientRect()),
                (x.current = document.body.style.webkitUserSelect),
                (document.body.style.webkitUserSelect = "none"),
                k(R));
          }),
          onPointerMove: es(e.onPointerMove, k),
          onPointerUp: es(e.onPointerUp, (R) => {
            const M = R.target;
            M.hasPointerCapture(R.pointerId) && (R.preventDefault(), M.releasePointerCapture(R.pointerId));
          }),
          onLostPointerCapture: () => {
            (document.body.style.webkitUserSelect = x.current), (w.current = null);
          },
        }),
      })
    );
  }),
  zL = React.forwardRef((e, t) => {
    const { sizes: n, onSizesChange: r, style: i, ...o } = e,
      a = jr(),
      [s, u] = React.useState(),
      c = React.useRef(null),
      d = bn(t, c, a.onScrollbarXChange);
    return (
      React.useEffect(() => {
        c.current && u(getComputedStyle(c.current));
      }, [c]),
      jsxRuntime.jsx(VL, {
        "data-orientation": "horizontal",
        ...o,
        ref: d,
        sizes: n,
        style: {
          ...i,
          "--sa-thumb-width": `${lv(n)}px`,
        },
        onThumbPointerDown: (h) => e.onThumbPointerDown(h.x),
        onDragScroll: (h) => e.onDragScroll(h.x),
        onWheelScroll: (h, p) => {
          if (a.viewport) {
            const v = a.viewport.scrollLeft + h.deltaX;
            e.onWheelScroll(v), BL(v, p) && h.preventDefault();
          }
        },
        onResize: () => {
          c.current &&
            a.viewport &&
            s &&
            r({
              content: a.viewport.scrollWidth,
              viewport: a.viewport.offsetWidth,
              scrollbar: {
                size: c.current.clientWidth,
                paddingStart: Rp(s.paddingLeft),
                paddingEnd: Rp(s.paddingRight),
              },
            });
        },
      })
    );
  });
zL.displayName = "@mantine/core/ScrollAreaScrollbarX";
const qL = React.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, style: i, ...o } = e,
    a = jr(),
    [s, u] = React.useState(),
    c = React.useRef(null),
    d = bn(t, c, a.onScrollbarYChange);
  return (
    React.useEffect(() => {
      c.current && u(window.getComputedStyle(c.current));
    }, []),
    jsxRuntime.jsx(VL, {
      ...o,
      "data-orientation": "vertical",
      ref: d,
      sizes: n,
      style: {
        "--sa-thumb-height": `${lv(n)}px`,
        ...i,
      },
      onThumbPointerDown: (h) => e.onThumbPointerDown(h.y),
      onDragScroll: (h) => e.onDragScroll(h.y),
      onWheelScroll: (h, p) => {
        if (a.viewport) {
          const v = a.viewport.scrollTop + h.deltaY;
          e.onWheelScroll(v), BL(v, p) && h.preventDefault();
        }
      },
      onResize: () => {
        c.current &&
          a.viewport &&
          s &&
          r({
            content: a.viewport.scrollHeight,
            viewport: a.viewport.offsetHeight,
            scrollbar: {
              size: c.current.clientHeight,
              paddingStart: Rp(s.paddingTop),
              paddingEnd: Rp(s.paddingBottom),
            },
          });
      },
    })
  );
});
qL.displayName = "@mantine/core/ScrollAreaScrollbarY";
const uv = React.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e,
    { dir: i } = ou(),
    o = jr(),
    a = React.useRef(null),
    s = React.useRef(0),
    [u, c] = React.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0,
      },
    }),
    d = $L(u.viewport, u.content),
    h = {
      ...r,
      sizes: u,
      onSizesChange: c,
      hasThumb: d > 0 && d < 1,
      onThumbChange: (v) => {
        a.current = v;
      },
      onThumbPointerUp: () => {
        s.current = 0;
      },
      onThumbPointerDown: (v) => {
        s.current = v;
      },
    },
    p = (v, b) => JU(v, s.current, u, b);
  return n === "horizontal"
    ? jsxRuntime.jsx(zL, {
        ...h,
        ref: t,
        onThumbPositionChange: () => {
          if (o.viewport && a.current) {
            const v = o.viewport.scrollLeft,
              b = Qk(v, u, i);
            a.current.style.transform = `translate3d(${b}px, 0, 0)`;
          }
        },
        onWheelScroll: (v) => {
          o.viewport && (o.viewport.scrollLeft = v);
        },
        onDragScroll: (v) => {
          o.viewport && (o.viewport.scrollLeft = p(v, i));
        },
      })
    : n === "vertical"
      ? jsxRuntime.jsx(qL, {
          ...h,
          ref: t,
          onThumbPositionChange: () => {
            if (o.viewport && a.current) {
              const v = o.viewport.scrollTop,
                b = Qk(v, u);
              u.scrollbar.size === 0
                ? a.current.style.setProperty("--thumb-opacity", "0")
                : a.current.style.setProperty("--thumb-opacity", "1"),
                (a.current.style.transform = `translate3d(0, ${b}px, 0)`);
            }
          },
          onWheelScroll: (v) => {
            o.viewport && (o.viewport.scrollTop = v);
          },
          onDragScroll: (v) => {
            o.viewport && (o.viewport.scrollTop = p(v));
          },
        })
      : null;
});
uv.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const XP = React.forwardRef((e, t) => {
  const n = jr(),
    { forceMount: r, ...i } = e,
    [o, a] = React.useState(!1),
    s = e.orientation === "horizontal",
    u = Zm(() => {
      if (n.viewport) {
        const c = n.viewport.offsetWidth < n.viewport.scrollWidth,
          d = n.viewport.offsetHeight < n.viewport.scrollHeight;
        a(s ? c : d);
      }
    }, 10);
  return (
    kl(n.viewport, u),
    kl(n.content, u),
    r || o
      ? jsxRuntime.jsx(uv, {
          "data-state": o ? "visible" : "hidden",
          ...i,
          ref: t,
        })
      : null
  );
});
XP.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const WL = React.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e,
    i = jr(),
    [o, a] = React.useState(!1);
  return (
    React.useEffect(() => {
      const { scrollArea: s } = i;
      let u = 0;
      if (s) {
        const c = () => {
            window.clearTimeout(u), a(!0);
          },
          d = () => {
            u = window.setTimeout(() => a(!1), i.scrollHideDelay);
          };
        return (
          s.addEventListener("pointerenter", c),
          s.addEventListener("pointerleave", d),
          () => {
            window.clearTimeout(u), s.removeEventListener("pointerenter", c), s.removeEventListener("pointerleave", d);
          }
        );
      }
    }, [i.scrollArea, i.scrollHideDelay]),
    n || o
      ? jsxRuntime.jsx(XP, {
          "data-state": o ? "visible" : "hidden",
          ...r,
          ref: t,
        })
      : null
  );
});
WL.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const tH = React.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      i = jr(),
      o = e.orientation === "horizontal",
      [a, s] = React.useState("hidden"),
      u = Zm(() => s("idle"), 100);
    return (
      React.useEffect(() => {
        if (a === "idle") {
          const c = window.setTimeout(() => s("hidden"), i.scrollHideDelay);
          return () => window.clearTimeout(c);
        }
      }, [a, i.scrollHideDelay]),
      React.useEffect(() => {
        const { viewport: c } = i,
          d = o ? "scrollLeft" : "scrollTop";
        if (c) {
          let h = c[d];
          const p = () => {
            const v = c[d];
            h !== v && (s("scrolling"), u()), (h = v);
          };
          return c.addEventListener("scroll", p), () => c.removeEventListener("scroll", p);
        }
      }, [i.viewport, o, u]),
      n || a !== "hidden"
        ? jsxRuntime.jsx(uv, {
            "data-state": a === "hidden" ? "hidden" : "visible",
            ...r,
            ref: t,
            onPointerEnter: es(e.onPointerEnter, () => s("interacting")),
            onPointerLeave: es(e.onPointerLeave, () => s("idle")),
          })
        : null
    );
  }),
  pS = React.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      i = jr(),
      { onScrollbarXEnabledChange: o, onScrollbarYEnabledChange: a } = i,
      s = e.orientation === "horizontal";
    return (
      React.useEffect(
        () => (
          s ? o(!0) : a(!0),
          () => {
            s ? o(!1) : a(!1);
          }
        ),
        [s, o, a],
      ),
      i.type === "hover"
        ? jsxRuntime.jsx(WL, {
            ...r,
            ref: t,
            forceMount: n,
          })
        : i.type === "scroll"
          ? jsxRuntime.jsx(tH, {
              ...r,
              ref: t,
              forceMount: n,
            })
          : i.type === "auto"
            ? jsxRuntime.jsx(XP, {
                ...r,
                ref: t,
                forceMount: n,
              })
            : i.type === "always"
              ? jsxRuntime.jsx(uv, {
                  ...r,
                  ref: t,
                })
              : null
    );
  });
pS.displayName = "@mantine/core/ScrollAreaScrollbar";
function nH(e, t = () => {}) {
  let n = {
      left: e.scrollLeft,
      top: e.scrollTop,
    },
    r = 0;
  return (
    (function i() {
      const o = {
          left: e.scrollLeft,
          top: e.scrollTop,
        },
        a = n.left !== o.left,
        s = n.top !== o.top;
      (a || s) && t(), (n = o), (r = window.requestAnimationFrame(i));
    })(),
    () => window.cancelAnimationFrame(r)
  );
}
const UL = React.forwardRef((e, t) => {
  const { style: n, ...r } = e,
    i = jr(),
    o = FL(),
    { onThumbPositionChange: a } = o,
    s = bn(t, (d) => o.onThumbChange(d)),
    u = React.useRef(void 0),
    c = Zm(() => {
      u.current && (u.current(), (u.current = void 0));
    }, 100);
  return (
    React.useEffect(() => {
      const { viewport: d } = i;
      if (d) {
        const h = () => {
          if ((c(), !u.current)) {
            const p = nH(d, a);
            (u.current = p), a();
          }
        };
        return a(), d.addEventListener("scroll", h), () => d.removeEventListener("scroll", h);
      }
    }, [i.viewport, c, a]),
    jsxRuntime.jsx("div", {
      "data-state": o.hasThumb ? "visible" : "hidden",
      ...r,
      ref: s,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...n,
      },
      onPointerDownCapture: es(e.onPointerDownCapture, (d) => {
        const p = d.target.getBoundingClientRect(),
          v = d.clientX - p.left,
          b = d.clientY - p.top;
        o.onThumbPointerDown({
          x: v,
          y: b,
        });
      }),
      onPointerUp: es(e.onPointerUp, o.onThumbPointerUp),
    })
  );
});
UL.displayName = "@mantine/core/ScrollAreaThumb";
const mS = React.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e,
    i = FL();
  return n || i.hasThumb
    ? jsxRuntime.jsx(UL, {
        ref: t,
        ...r,
      })
    : null;
});
mS.displayName = "@mantine/core/ScrollAreaThumb";
const HL = React.forwardRef(({ children: e, style: t, ...n }, r) => {
  const i = jr(),
    o = bn(r, i.onViewportChange);
  return jsxRuntime.jsx(Se, {
    ...n,
    ref: o,
    style: {
      overflowX: i.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: i.scrollbarYEnabled ? "scroll" : "hidden",
      ...t,
    },
    children: jsxRuntime.jsx("div", {
      style: {
        minWidth: "100%",
      },
      ref: i.onContentChange,
      children: e,
    }),
  });
});
HL.displayName = "@mantine/core/ScrollAreaViewport";
var ZP = {
  root: "m_d57069b5",
  viewport: "m_c0783ff9",
  viewportInner: "m_f8f631dd",
  scrollbar: "m_c44ba933",
  thumb: "m_d8b5e363",
  corner: "m_21657268",
};
const KL = {
    scrollHideDelay: 1e3,
    type: "hover",
    scrollbars: "xy",
  },
  rH = (e, { scrollbarSize: t, overscrollBehavior: n }) => ({
    root: {
      "--scrollarea-scrollbar-size": oe(t),
      "--scrollarea-over-scroll-behavior": n,
    },
  }),
  oo = ke((e, t) => {
    const n = ye("ScrollArea", KL, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        scrollbarSize: u,
        vars: c,
        type: d,
        scrollHideDelay: h,
        viewportProps: p,
        viewportRef: v,
        onScrollPositionChange: b,
        children: y,
        offsetScrollbars: w,
        scrollbars: x,
        onBottomReached: S,
        onTopReached: _,
        overscrollBehavior: E,
        ...P
      } = n,
      [O, k] = React.useState(!1),
      [R, M] = React.useState(!1),
      [D, I] = React.useState(!1),
      V = et({
        name: "ScrollArea",
        props: n,
        classes: ZP,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: c,
        varsResolver: rH,
      }),
      z = React.useRef(null),
      q = OU([v, z]);
    return (
      React.useEffect(() => {
        if (!z.current || w !== "present") return;
        const U = z.current,
          B = new ResizeObserver(() => {
            const { scrollHeight: F, clientHeight: L, scrollWidth: W, clientWidth: G } = U;
            M(F > L), I(W > G);
          });
        return B.observe(U), () => B.disconnect();
      }, [z, w]),
      jsxRuntime.jsxs(DL, {
        type: d === "never" ? "always" : d,
        scrollHideDelay: h,
        ref: t,
        scrollbars: x,
        ...V("root"),
        ...P,
        children: [
          jsxRuntime.jsx(HL, {
            ...p,
            ...V("viewport", {
              style: p?.style,
            }),
            ref: q,
            "data-offset-scrollbars": w === !0 ? "xy" : w || void 0,
            "data-scrollbars": x || void 0,
            "data-horizontal-hidden": w === "present" && !D ? "true" : void 0,
            "data-vertical-hidden": w === "present" && !R ? "true" : void 0,
            onScroll: (U) => {
              p?.onScroll?.(U),
                b?.({
                  x: U.currentTarget.scrollLeft,
                  y: U.currentTarget.scrollTop,
                });
              const { scrollTop: B, scrollHeight: F, clientHeight: L } = U.currentTarget;
              B - (F - L) >= -0.6 && S?.(), B === 0 && _?.();
            },
            children: y,
          }),
          (x === "xy" || x === "x") &&
            jsxRuntime.jsx(pS, {
              ...V("scrollbar"),
              orientation: "horizontal",
              "data-hidden": d === "never" || (w === "present" && !D) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => k(!0),
              onMouseLeave: () => k(!1),
              children: jsxRuntime.jsx(mS, {
                ...V("thumb"),
              }),
            }),
          (x === "xy" || x === "y") &&
            jsxRuntime.jsx(pS, {
              ...V("scrollbar"),
              orientation: "vertical",
              "data-hidden": d === "never" || (w === "present" && !R) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => k(!0),
              onMouseLeave: () => k(!1),
              children: jsxRuntime.jsx(mS, {
                ...V("thumb"),
              }),
            }),
          jsxRuntime.jsx(XU, {
            ...V("corner"),
            "data-hovered": O || void 0,
            "data-hidden": d === "never" || void 0,
          }),
        ],
      })
    );
  });
oo.displayName = "@mantine/core/ScrollArea";
const QP = ke((e, t) => {
  const {
    children: n,
    classNames: r,
    styles: i,
    scrollbarSize: o,
    scrollHideDelay: a,
    type: s,
    dir: u,
    offsetScrollbars: c,
    viewportRef: d,
    onScrollPositionChange: h,
    unstyled: p,
    variant: v,
    viewportProps: b,
    scrollbars: y,
    style: w,
    vars: x,
    onBottomReached: S,
    onTopReached: _,
    ...E
  } = ye("ScrollAreaAutosize", KL, e);
  return jsxRuntime.jsx(Se, {
    ...E,
    ref: t,
    style: [
      {
        display: "flex",
        overflow: "auto",
      },
      w,
    ],
    children: jsxRuntime.jsx(Se, {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
      },
      children: jsxRuntime.jsx(oo, {
        classNames: r,
        styles: i,
        scrollHideDelay: a,
        scrollbarSize: o,
        type: s,
        dir: u,
        offsetScrollbars: c,
        viewportRef: d,
        onScrollPositionChange: h,
        unstyled: p,
        variant: v,
        viewportProps: b,
        vars: x,
        scrollbars: y,
        onBottomReached: S,
        onTopReached: _,
        children: n,
      }),
    }),
  });
});
oo.classes = ZP;
QP.displayName = "@mantine/core/ScrollAreaAutosize";
QP.classes = ZP;
oo.Autosize = QP;
var GL = {
  root: "m_87cf2631",
};
const iH = {
    __staticSelector: "UnstyledButton",
  },
  ao = vo((e, t) => {
    const n = ye("UnstyledButton", iH, e),
      {
        className: r,
        component: i = "button",
        __staticSelector: o,
        unstyled: a,
        classNames: s,
        styles: u,
        style: c,
        ...d
      } = n,
      h = et({
        name: o,
        props: n,
        classes: GL,
        className: r,
        style: c,
        classNames: s,
        styles: u,
        unstyled: a,
      });
    return jsxRuntime.jsx(Se, {
      ...h("root", {
        focusable: !0,
      }),
      component: i,
      ref: t,
      type: i === "button" ? "button" : void 0,
      ...d,
    });
  });
ao.classes = GL;
ao.displayName = "@mantine/core/UnstyledButton";
var YL = {
  root: "m_515a97f8",
};
const oH = {},
  JP = ke((e, t) => {
    const n = ye("VisuallyHidden", oH, e),
      { classNames: r, className: i, style: o, styles: a, unstyled: s, vars: u, ...c } = n,
      d = et({
        name: "VisuallyHidden",
        classes: YL,
        props: n,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
      });
    return jsxRuntime.jsx(Se, {
      component: "span",
      ref: t,
      ...d("root"),
      ...c,
    });
  });
JP.classes = YL;
JP.displayName = "@mantine/core/VisuallyHidden";
var XL = {
  root: "m_1b7284a3",
};
const aH = {},
  sH = (e, { radius: t, shadow: n }) => ({
    root: {
      "--paper-radius": t === void 0 ? void 0 : gn(t),
      "--paper-shadow": kP(n),
    },
  }),
  eA = vo((e, t) => {
    const n = ye("Paper", aH, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        withBorder: u,
        vars: c,
        radius: d,
        shadow: h,
        variant: p,
        mod: v,
        ...b
      } = n,
      y = et({
        name: "Paper",
        props: n,
        classes: XL,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: c,
        varsResolver: sH,
      });
    return jsxRuntime.jsx(Se, {
      ref: t,
      mod: [
        {
          "data-with-border": u,
        },
        v,
      ],
      ...y("root"),
      variant: p,
      ...b,
    });
  });
eA.classes = XL;
eA.displayName = "@mantine/core/Paper";
function ZL(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [n, r] = t.split("-"),
      i = n === "right" ? "left" : "right";
    return r === void 0 ? i : `${i}-${r}`;
  }
  return t;
}
function Jk(e, t, n, r) {
  return e === "center" || r === "center"
    ? {
        top: t,
      }
    : e === "end"
      ? {
          bottom: n,
        }
      : e === "start"
        ? {
            top: n,
          }
        : {};
}
function ej(e, t, n, r, i) {
  return e === "center" || r === "center"
    ? {
        left: t,
      }
    : e === "end"
      ? {
          [i === "ltr" ? "right" : "left"]: n,
        }
      : e === "start"
        ? {
            [i === "ltr" ? "left" : "right"]: n,
          }
        : {};
}
const lH = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius",
};
function uH({
  position: e,
  arrowSize: t,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: i,
  arrowX: o,
  arrowY: a,
  dir: s,
}) {
  const [u, c = "center"] = e.split("-"),
    d = {
      width: t,
      height: t,
      transform: "rotate(45deg)",
      position: "absolute",
      [lH[u]]: r,
    },
    h = -t / 2;
  return u === "left"
    ? {
        ...d,
        ...Jk(c, a, n, i),
        right: h,
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
      }
    : u === "right"
      ? {
          ...d,
          ...Jk(c, a, n, i),
          left: h,
          borderRightColor: "transparent",
          borderTopColor: "transparent",
          clipPath: "polygon(0 100%, 0 0, 100% 100%)",
        }
      : u === "top"
        ? {
            ...d,
            ...ej(c, o, n, i, s),
            bottom: h,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          }
        : u === "bottom"
          ? {
              ...d,
              ...ej(c, o, n, i, s),
              top: h,
              borderBottomColor: "transparent",
              borderRightColor: "transparent",
              clipPath: "polygon(0 100%, 0 0, 100% 0)",
            }
          : {};
}
const tA = React.forwardRef(
  (
    {
      position: e,
      arrowSize: t,
      arrowOffset: n,
      arrowRadius: r,
      arrowPosition: i,
      visible: o,
      arrowX: a,
      arrowY: s,
      style: u,
      ...c
    },
    d,
  ) => {
    const { dir: h } = ou();
    return o
      ? jsxRuntime.jsx("div", {
          ...c,
          ref: d,
          style: {
            ...u,
            ...uH({
              position: e,
              arrowSize: t,
              arrowOffset: n,
              arrowRadius: r,
              arrowPosition: i,
              dir: h,
              arrowX: a,
              arrowY: s,
            }),
          },
        })
      : null;
  },
);
tA.displayName = "@mantine/core/FloatingArrow";
var QL = {
  root: "m_9814e45f",
};
const cH = {
    zIndex: po("modal"),
  },
  fH = (e, { gradient: t, color: n, backgroundOpacity: r, blur: i, radius: o, zIndex: a }) => ({
    root: {
      "--overlay-bg": t || ((n !== void 0 || r !== void 0) && ui(n || "#000", r ?? 0.6)) || void 0,
      "--overlay-filter": i ? `blur(${oe(i)})` : void 0,
      "--overlay-radius": o === void 0 ? void 0 : gn(o),
      "--overlay-z-index": a?.toString(),
    },
  }),
  cv = vo((e, t) => {
    const n = ye("Overlay", cH, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        fixed: c,
        center: d,
        children: h,
        radius: p,
        zIndex: v,
        gradient: b,
        blur: y,
        color: w,
        backgroundOpacity: x,
        mod: S,
        ..._
      } = n,
      E = et({
        name: "Overlay",
        props: n,
        classes: QL,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: fH,
      });
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...E("root"),
      mod: [
        {
          center: d,
          fixed: c,
        },
        S,
      ],
      ..._,
      children: h,
    });
  });
cv.classes = QL;
cv.displayName = "@mantine/core/Overlay";
function A0(e) {
  const t = document.createElement("div");
  return (
    t.setAttribute("data-portal", "true"),
    typeof e.className == "string" && t.classList.add(...e.className.split(" ").filter(Boolean)),
    typeof e.style == "object" && Object.assign(t.style, e.style),
    typeof e.id == "string" && t.setAttribute("id", e.id),
    t
  );
}
function dH({ target: e, reuseTargetNode: t, ...n }) {
  if (e) return typeof e == "string" ? document.querySelector(e) || A0(n) : e;
  if (t) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r) return r;
    const i = A0(n);
    return i.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(i), i;
  }
  return A0(n);
}
const hH = {},
  JL = ke((e, t) => {
    const { children: n, target: r, reuseTargetNode: i, ...o } = ye("Portal", hH, e),
      [a, s] = React.useState(!1),
      u = React.useRef(null);
    return (
      Jf(
        () => (
          s(!0),
          (u.current = dH({
            target: r,
            reuseTargetNode: i,
            ...o,
          })),
          Xc(t, u.current),
          !r && !i && u.current && document.body.appendChild(u.current),
          () => {
            !r && !i && u.current && document.body.removeChild(u.current);
          }
        ),
        [r],
      ),
      !a || !u.current
        ? null
        : nv.createPortal(
            jsxRuntime.jsx(jsxRuntime.Fragment, {
              children: n,
            }),
            u.current,
          )
    );
  });
JL.displayName = "@mantine/core/Portal";
const lu = ke(({ withinPortal: e = !0, children: t, ...n }, r) =>
  lL() === "test" || !e
    ? jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: t,
      })
    : jsxRuntime.jsx(JL, {
        ref: r,
        ...n,
        children: t,
      }),
);
lu.displayName = "@mantine/core/OptionalPortal";
const pc = (e) => ({
    in: {
      opacity: 1,
      transform: "scale(1)",
    },
    out: {
      opacity: 0,
      transform: `scale(.9) translateY(${e === "bottom" ? 10 : -10}px)`,
    },
    transitionProperty: "transform, opacity",
  }),
  $h = {
    fade: {
      in: {
        opacity: 1,
      },
      out: {
        opacity: 0,
      },
      transitionProperty: "opacity",
    },
    "fade-up": {
      in: {
        opacity: 1,
        transform: "translateY(0)",
      },
      out: {
        opacity: 0,
        transform: "translateY(30px)",
      },
      transitionProperty: "opacity, transform",
    },
    "fade-down": {
      in: {
        opacity: 1,
        transform: "translateY(0)",
      },
      out: {
        opacity: 0,
        transform: "translateY(-30px)",
      },
      transitionProperty: "opacity, transform",
    },
    "fade-left": {
      in: {
        opacity: 1,
        transform: "translateX(0)",
      },
      out: {
        opacity: 0,
        transform: "translateX(30px)",
      },
      transitionProperty: "opacity, transform",
    },
    "fade-right": {
      in: {
        opacity: 1,
        transform: "translateX(0)",
      },
      out: {
        opacity: 0,
        transform: "translateX(-30px)",
      },
      transitionProperty: "opacity, transform",
    },
    scale: {
      in: {
        opacity: 1,
        transform: "scale(1)",
      },
      out: {
        opacity: 0,
        transform: "scale(0)",
      },
      common: {
        transformOrigin: "top",
      },
      transitionProperty: "transform, opacity",
    },
    "scale-y": {
      in: {
        opacity: 1,
        transform: "scaleY(1)",
      },
      out: {
        opacity: 0,
        transform: "scaleY(0)",
      },
      common: {
        transformOrigin: "top",
      },
      transitionProperty: "transform, opacity",
    },
    "scale-x": {
      in: {
        opacity: 1,
        transform: "scaleX(1)",
      },
      out: {
        opacity: 0,
        transform: "scaleX(0)",
      },
      common: {
        transformOrigin: "left",
      },
      transitionProperty: "transform, opacity",
    },
    "skew-up": {
      in: {
        opacity: 1,
        transform: "translateY(0) skew(0deg, 0deg)",
      },
      out: {
        opacity: 0,
        transform: "translateY(-20px) skew(-10deg, -5deg)",
      },
      common: {
        transformOrigin: "top",
      },
      transitionProperty: "transform, opacity",
    },
    "skew-down": {
      in: {
        opacity: 1,
        transform: "translateY(0) skew(0deg, 0deg)",
      },
      out: {
        opacity: 0,
        transform: "translateY(20px) skew(-10deg, -5deg)",
      },
      common: {
        transformOrigin: "bottom",
      },
      transitionProperty: "transform, opacity",
    },
    "rotate-left": {
      in: {
        opacity: 1,
        transform: "translateY(0) rotate(0deg)",
      },
      out: {
        opacity: 0,
        transform: "translateY(20px) rotate(-5deg)",
      },
      common: {
        transformOrigin: "bottom",
      },
      transitionProperty: "transform, opacity",
    },
    "rotate-right": {
      in: {
        opacity: 1,
        transform: "translateY(0) rotate(0deg)",
      },
      out: {
        opacity: 0,
        transform: "translateY(20px) rotate(5deg)",
      },
      common: {
        transformOrigin: "top",
      },
      transitionProperty: "transform, opacity",
    },
    "slide-down": {
      in: {
        opacity: 1,
        transform: "translateY(0)",
      },
      out: {
        opacity: 0,
        transform: "translateY(-100%)",
      },
      common: {
        transformOrigin: "top",
      },
      transitionProperty: "transform, opacity",
    },
    "slide-up": {
      in: {
        opacity: 1,
        transform: "translateY(0)",
      },
      out: {
        opacity: 0,
        transform: "translateY(100%)",
      },
      common: {
        transformOrigin: "bottom",
      },
      transitionProperty: "transform, opacity",
    },
    "slide-left": {
      in: {
        opacity: 1,
        transform: "translateX(0)",
      },
      out: {
        opacity: 0,
        transform: "translateX(100%)",
      },
      common: {
        transformOrigin: "left",
      },
      transitionProperty: "transform, opacity",
    },
    "slide-right": {
      in: {
        opacity: 1,
        transform: "translateX(0)",
      },
      out: {
        opacity: 0,
        transform: "translateX(-100%)",
      },
      common: {
        transformOrigin: "right",
      },
      transitionProperty: "transform, opacity",
    },
    pop: {
      ...pc("bottom"),
      common: {
        transformOrigin: "center center",
      },
    },
    "pop-bottom-left": {
      ...pc("bottom"),
      common: {
        transformOrigin: "bottom left",
      },
    },
    "pop-bottom-right": {
      ...pc("bottom"),
      common: {
        transformOrigin: "bottom right",
      },
    },
    "pop-top-left": {
      ...pc("top"),
      common: {
        transformOrigin: "top left",
      },
    },
    "pop-top-right": {
      ...pc("top"),
      common: {
        transformOrigin: "top right",
      },
    },
  },
  tj = {
    entering: "in",
    entered: "in",
    exiting: "out",
    exited: "out",
    "pre-exiting": "out",
    "pre-entering": "out",
  };
function pH({ transition: e, state: t, duration: n, timingFunction: r }) {
  const i = {
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform, opacity",
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r,
  };
  return typeof e == "string"
    ? e in $h
      ? {
          transitionProperty: $h[e].transitionProperty,
          ...i,
          ...$h[e].common,
          ...$h[e][tj[t]],
        }
      : {}
    : {
        transitionProperty: e.transitionProperty,
        ...i,
        ...e.common,
        ...e[tj[t]],
      };
}
function mH({
  duration: e,
  exitDuration: t,
  timingFunction: n,
  mounted: r,
  onEnter: i,
  onExit: o,
  onEntered: a,
  onExited: s,
  enterDelay: u,
  exitDelay: c,
}) {
  const d = ni(),
    h = jP(),
    p = d.respectReducedMotion ? h : !1,
    [v, b] = React.useState(p ? 0 : e),
    [y, w] = React.useState(r ? "entered" : "exited"),
    x = React.useRef(-1),
    S = React.useRef(-1),
    _ = React.useRef(-1);
  function E() {
    window.clearTimeout(x.current), window.clearTimeout(S.current), cancelAnimationFrame(_.current);
  }
  const P = (k) => {
      E();
      const R = k ? i : o,
        M = k ? a : s,
        D = p ? 0 : k ? e : t;
      b(D),
        D === 0
          ? (typeof R == "function" && R(), typeof M == "function" && M(), w(k ? "entered" : "exited"))
          : (_.current = requestAnimationFrame(() => {
              cW.flushSync(() => {
                w(k ? "pre-entering" : "pre-exiting");
              }),
                (_.current = requestAnimationFrame(() => {
                  typeof R == "function" && R(),
                    w(k ? "entering" : "exiting"),
                    (x.current = window.setTimeout(() => {
                      typeof M == "function" && M(), w(k ? "entered" : "exited");
                    }, D));
                }));
            }));
    },
    O = (k) => {
      if ((E(), typeof (k ? u : c) != "number")) {
        P(k);
        return;
      }
      S.current = window.setTimeout(
        () => {
          P(k);
        },
        k ? u : c,
      );
    };
  return (
    ia(() => {
      O(r);
    }, [r]),
    React.useEffect(
      () => () => {
        E();
      },
      [],
    ),
    {
      transitionDuration: v,
      transitionStatus: y,
      transitionTimingFunction: n || "ease",
    }
  );
}
function yo({
  keepMounted: e,
  transition: t = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: i,
  children: o,
  timingFunction: a = "ease",
  onExit: s,
  onEntered: u,
  onEnter: c,
  onExited: d,
  enterDelay: h,
  exitDelay: p,
}) {
  const v = lL(),
    {
      transitionDuration: b,
      transitionStatus: y,
      transitionTimingFunction: w,
    } = mH({
      mounted: i,
      exitDuration: r,
      duration: n,
      timingFunction: a,
      onExit: s,
      onEntered: u,
      onEnter: c,
      onExited: d,
      enterDelay: h,
      exitDelay: p,
    });
  return b === 0 || v === "test"
    ? i
      ? jsxRuntime.jsx(jsxRuntime.Fragment, {
          children: o({}),
        })
      : e
        ? o({
            display: "none",
          })
        : null
    : y === "exited"
      ? e
        ? o({
            display: "none",
          })
        : null
      : jsxRuntime.jsx(jsxRuntime.Fragment, {
          children: o(
            pH({
              transition: t,
              duration: b,
              state: y,
              timingFunction: w,
            }),
          ),
        });
}
yo.displayName = "@mantine/core/Transition";
const [vH, e5] = kr("Popover component was not found in the tree");
function fv({ children: e, active: t = !0, refProp: n = "ref", innerRef: r }) {
  const i = W7(t),
    o = bn(i, r);
  return vs(e)
    ? React.cloneElement(e, {
        [n]: o,
      })
    : e;
}
function t5(e) {
  return jsxRuntime.jsx(JP, {
    tabIndex: -1,
    "data-autofocus": !0,
    ...e,
  });
}
fv.displayName = "@mantine/core/FocusTrap";
t5.displayName = "@mantine/core/FocusTrapInitialFocus";
fv.InitialFocus = t5;
var n5 = {
  dropdown: "m_38a85659",
  arrow: "m_a31dc6c1",
  overlay: "m_3d7bc908",
};
const yH = {},
  nA = ke((e, t) => {
    const n = ye("PopoverDropdown", yH, e),
      {
        className: r,
        style: i,
        vars: o,
        children: a,
        onKeyDownCapture: s,
        variant: u,
        classNames: c,
        styles: d,
        ...h
      } = n,
      p = e5(),
      v = tL({
        opened: p.opened,
        shouldReturnFocus: p.returnFocus,
      }),
      b = p.withRoles
        ? {
            "aria-labelledby": p.getTargetId(),
            id: p.getDropdownId(),
            role: "dialog",
            tabIndex: -1,
          }
        : {},
      y = bn(t, p.floating);
    return p.disabled
      ? null
      : jsxRuntime.jsx(lu, {
          ...p.portalProps,
          withinPortal: p.withinPortal,
          children: jsxRuntime.jsx(yo, {
            mounted: p.opened,
            ...p.transitionProps,
            transition: p.transitionProps?.transition || "fade",
            duration: p.transitionProps?.duration ?? 150,
            keepMounted: p.keepMounted,
            exitDuration:
              typeof p.transitionProps?.exitDuration == "number"
                ? p.transitionProps.exitDuration
                : p.transitionProps?.duration,
            children: (w) =>
              jsxRuntime.jsx(fv, {
                active: p.trapFocus && p.opened,
                innerRef: y,
                children: jsxRuntime.jsxs(Se, {
                  ...b,
                  ...h,
                  variant: u,
                  onKeyDownCapture: M7(
                    () => {
                      p.onClose?.(), p.onDismiss?.();
                    },
                    {
                      active: p.closeOnEscape,
                      onTrigger: v,
                      onKeyDown: s,
                    },
                  ),
                  "data-position": p.placement,
                  "data-fixed": p.floatingStrategy === "fixed" || void 0,
                  ...p.getStyles("dropdown", {
                    className: r,
                    props: n,
                    classNames: c,
                    styles: d,
                    style: [
                      {
                        ...w,
                        zIndex: p.zIndex,
                        top: p.y ?? 0,
                        left: p.x ?? 0,
                        width: p.width === "target" ? void 0 : oe(p.width),
                      },
                      p.resolvedStyles.dropdown,
                      d?.dropdown,
                      i,
                    ],
                  }),
                  children: [
                    a,
                    jsxRuntime.jsx(tA, {
                      ref: p.arrowRef,
                      arrowX: p.arrowX,
                      arrowY: p.arrowY,
                      visible: p.withArrow,
                      position: p.placement,
                      arrowSize: p.arrowSize,
                      arrowRadius: p.arrowRadius,
                      arrowOffset: p.arrowOffset,
                      arrowPosition: p.arrowPosition,
                      ...p.getStyles("arrow", {
                        props: n,
                        classNames: c,
                        styles: d,
                      }),
                    }),
                  ],
                }),
              }),
          }),
        });
  });
nA.classes = n5;
nA.displayName = "@mantine/core/PopoverDropdown";
const gH = {
    refProp: "ref",
    popupType: "dialog",
  },
  r5 = ke((e, t) => {
    const { children: n, refProp: r, popupType: i, ...o } = ye("PopoverTarget", gH, e);
    if (!vs(n))
      throw new Error(
        "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const a = o,
      s = e5(),
      u = bn(s.reference, Qm(n), t),
      c = s.withRoles
        ? {
            "aria-haspopup": i,
            "aria-expanded": s.opened,
            "aria-controls": s.getDropdownId(),
            id: s.getTargetId(),
          }
        : {};
    return React.cloneElement(n, {
      ...a,
      ...c,
      ...s.targetProps,
      className: We(s.targetProps.className, a.className, n.props.className),
      [r]: u,
      ...(s.controlled
        ? null
        : {
            onClick: s.onToggle,
          }),
    });
  });
r5.displayName = "@mantine/core/PopoverTarget";
function i5({ opened: e, floating: t, position: n, positionDependencies: r }) {
  const [i, o] = React.useState(0);
  React.useEffect(() => {
    if (t.refs.reference.current && t.refs.floating.current && e)
      return hU(t.refs.reference.current, t.refs.floating.current, t.update);
  }, [t.refs.reference.current, t.refs.floating.current, e, i, n]),
    ia(() => {
      t.update();
    }, r),
    ia(() => {
      o((a) => a + 1);
    }, [e]);
}
function bH(e) {
  if (e === void 0)
    return {
      shift: !0,
      flip: !0,
    };
  const t = {
    ...e,
  };
  return e.shift === void 0 && (t.shift = !0), e.flip === void 0 && (t.flip = !0), t;
}
function wH(e, t) {
  const n = bH(e.middlewares),
    r = [jL(e.offset)];
  return (
    n.shift &&
      r.push(
        UP(
          typeof n.shift == "boolean"
            ? {
                limiter: Uk(),
                padding: 5,
              }
            : {
                limiter: Uk(),
                padding: 5,
                ...n.shift,
              },
        ),
      ),
    n.flip && r.push(typeof n.flip == "boolean" ? jp() : jp(n.flip)),
    n.inline && r.push(typeof n.inline == "boolean" ? Nc() : Nc(n.inline)),
    r.push(
      RL({
        element: e.arrowRef,
        padding: e.arrowOffset,
      }),
    ),
    (n.size || e.width === "target") &&
      r.push(
        AU({
          ...(typeof n.size == "boolean" ? {} : n.size),
          apply({ rects: i, availableWidth: o, availableHeight: a, ...s }) {
            const c = t().refs.floating.current?.style ?? {};
            n.size &&
              (typeof n.size == "object" && n.size.apply
                ? n.size.apply({
                    rects: i,
                    availableWidth: o,
                    availableHeight: a,
                    ...s,
                  })
                : Object.assign(c, {
                    maxWidth: `${o}px`,
                    maxHeight: `${a}px`,
                  })),
              e.width === "target" &&
                Object.assign(c, {
                  width: `${i.reference.width}px`,
                });
          },
        }),
      ),
    r
  );
}
function xH(e) {
  const [t, n] = Pi({
      value: e.opened,
      defaultValue: e.defaultOpened,
      finalValue: !1,
      onChange: e.onChange,
    }),
    r = React.useRef(t),
    i = () => {
      t && !e.disabled && n(!1);
    },
    o = () => !e.disabled && n(!t),
    a = YP({
      strategy: e.strategy,
      placement: e.position,
      middleware: wH(e, () => a),
    });
  return (
    i5({
      opened: t,
      position: e.position,
      positionDependencies: e.positionDependencies || [],
      floating: a,
    }),
    ia(() => {
      e.onPositionChange?.(a.placement);
    }, [a.placement]),
    ia(() => {
      t !== r.current && (t ? e.onOpen?.() : e.onClose?.()), (r.current = t);
    }, [t, e.onClose, e.onOpen]),
    {
      floating: a,
      controlled: typeof e.opened == "boolean",
      opened: t,
      onClose: i,
      onToggle: o,
    }
  );
}
const SH = {
    position: "bottom",
    offset: 8,
    positionDependencies: [],
    transitionProps: {
      transition: "fade",
      duration: 150,
    },
    middlewares: {
      flip: !0,
      shift: !0,
      inline: !1,
    },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: "side",
    closeOnClickOutside: !0,
    withinPortal: !0,
    closeOnEscape: !0,
    trapFocus: !1,
    withRoles: !0,
    returnFocus: !1,
    withOverlay: !1,
    clickOutsideEvents: ["mousedown", "touchstart"],
    zIndex: po("popover"),
    __staticSelector: "Popover",
    width: "max-content",
  },
  _H = (e, { radius: t, shadow: n }) => ({
    dropdown: {
      "--popover-radius": t === void 0 ? void 0 : gn(t),
      "--popover-shadow": kP(n),
    },
  });
function ha(e) {
  const t = ye("Popover", SH, e),
    {
      children: n,
      position: r,
      offset: i,
      onPositionChange: o,
      positionDependencies: a,
      opened: s,
      transitionProps: u,
      onExitTransitionEnd: c,
      onEnterTransitionEnd: d,
      width: h,
      middlewares: p,
      withArrow: v,
      arrowSize: b,
      arrowOffset: y,
      arrowRadius: w,
      arrowPosition: x,
      unstyled: S,
      classNames: _,
      styles: E,
      closeOnClickOutside: P,
      withinPortal: O,
      portalProps: k,
      closeOnEscape: R,
      clickOutsideEvents: M,
      trapFocus: D,
      onClose: I,
      onDismiss: V,
      onOpen: z,
      onChange: q,
      zIndex: U,
      radius: B,
      shadow: F,
      id: L,
      defaultOpened: W,
      __staticSelector: G,
      withRoles: $,
      disabled: K,
      returnFocus: ne,
      variant: he,
      keepMounted: le,
      vars: pe,
      floatingStrategy: Pe,
      withOverlay: xe,
      overlayProps: re,
      ...ve
    } = t,
    je = et({
      name: G,
      props: t,
      classes: n5,
      classNames: _,
      styles: E,
      unstyled: S,
      rootSelector: "dropdown",
      vars: pe,
      varsResolver: _H,
    }),
    { resolvedStyles: ie } = ev({
      classNames: _,
      styles: E,
      props: t,
    }),
    Qe = React.useRef(null),
    [De, Ve] = React.useState(null),
    [ot, se] = React.useState(null),
    { dir: fe } = ou(),
    we = mo(L),
    Ne = xH({
      middlewares: p,
      width: h,
      position: ZL(fe, r),
      offset: typeof i == "number" ? i + (v ? b / 2 : 0) : i,
      arrowRef: Qe,
      arrowOffset: y,
      onPositionChange: o,
      positionDependencies: a,
      opened: s,
      defaultOpened: W,
      onChange: q,
      onOpen: z,
      onClose: I,
      onDismiss: V,
      strategy: Pe,
      disabled: K,
    });
  I7(
    () => {
      P && (Ne.onClose(), V?.());
    },
    M,
    [De, ot],
  );
  const Ke = React.useCallback(
      (Re) => {
        Ve(Re), Ne.floating.refs.setReference(Re);
      },
      [Ne.floating.refs.setReference],
    ),
    Ye = React.useCallback(
      (Re) => {
        se(Re), Ne.floating.refs.setFloating(Re);
      },
      [Ne.floating.refs.setFloating],
    ),
    Je = React.useCallback(() => {
      u?.onExited?.(), c?.();
    }, [u?.onExited, c]),
    ge = React.useCallback(() => {
      u?.onEntered?.(), d?.();
    }, [u?.onEntered, d]);
  return jsxRuntime.jsxs(vH, {
    value: {
      returnFocus: ne,
      disabled: K,
      controlled: Ne.controlled,
      reference: Ke,
      floating: Ye,
      x: Ne.floating.x,
      y: Ne.floating.y,
      arrowX: Ne.floating?.middlewareData?.arrow?.x,
      arrowY: Ne.floating?.middlewareData?.arrow?.y,
      opened: Ne.opened,
      arrowRef: Qe,
      transitionProps: {
        ...u,
        onExited: Je,
        onEntered: ge,
      },
      width: h,
      withArrow: v,
      arrowSize: b,
      arrowOffset: y,
      arrowRadius: w,
      arrowPosition: x,
      placement: Ne.floating.placement,
      trapFocus: D,
      withinPortal: O,
      portalProps: k,
      zIndex: U,
      radius: B,
      shadow: F,
      closeOnEscape: R,
      onDismiss: V,
      onClose: Ne.onClose,
      onToggle: Ne.onToggle,
      getTargetId: () => `${we}-target`,
      getDropdownId: () => `${we}-dropdown`,
      withRoles: $,
      targetProps: ve,
      __staticSelector: G,
      classNames: _,
      styles: E,
      unstyled: S,
      variant: he,
      keepMounted: le,
      getStyles: je,
      resolvedStyles: ie,
      floatingStrategy: Pe,
    },
    children: [
      n,
      xe &&
        jsxRuntime.jsx(yo, {
          transition: "fade",
          mounted: Ne.opened,
          duration: u?.duration || 250,
          exitDuration: u?.exitDuration || 250,
          children: (Re) =>
            jsxRuntime.jsx(lu, {
              withinPortal: O,
              children: jsxRuntime.jsx(cv, {
                ...re,
                ...je("overlay", {
                  className: re?.className,
                  style: [Re, re?.style],
                }),
              }),
            }),
        }),
    ],
  });
}
ha.Target = r5;
ha.Dropdown = nA;
ha.displayName = "@mantine/core/Popover";
ha.extend = (e) => e;
var Yr = {
  root: "m_5ae2e3c",
  barsLoader: "m_7a2bd4cd",
  bar: "m_870bb79",
  "bars-loader-animation": "m_5d2b3b9d",
  dotsLoader: "m_4e3f22d7",
  dot: "m_870c4af",
  "loader-dots-animation": "m_aac34a1",
  ovalLoader: "m_b34414df",
  "oval-loader-animation": "m_f8e89c4b",
};
const o5 = React.forwardRef(({ className: e, ...t }, n) =>
  jsxRuntime.jsxs(Se, {
    component: "span",
    className: We(Yr.barsLoader, e),
    ...t,
    ref: n,
    children: [
      jsxRuntime.jsx("span", {
        className: Yr.bar,
      }),
      jsxRuntime.jsx("span", {
        className: Yr.bar,
      }),
      jsxRuntime.jsx("span", {
        className: Yr.bar,
      }),
    ],
  }),
);
o5.displayName = "@mantine/core/Bars";
const a5 = React.forwardRef(({ className: e, ...t }, n) =>
  jsxRuntime.jsxs(Se, {
    component: "span",
    className: We(Yr.dotsLoader, e),
    ...t,
    ref: n,
    children: [
      jsxRuntime.jsx("span", {
        className: Yr.dot,
      }),
      jsxRuntime.jsx("span", {
        className: Yr.dot,
      }),
      jsxRuntime.jsx("span", {
        className: Yr.dot,
      }),
    ],
  }),
);
a5.displayName = "@mantine/core/Dots";
const s5 = React.forwardRef(({ className: e, ...t }, n) =>
  jsxRuntime.jsx(Se, {
    component: "span",
    className: We(Yr.ovalLoader, e),
    ...t,
    ref: n,
  }),
);
s5.displayName = "@mantine/core/Oval";
const l5 = {
    bars: o5,
    oval: s5,
    dots: a5,
  },
  PH = {
    loaders: l5,
    type: "oval",
  },
  AH = (e, { size: t, color: n }) => ({
    root: {
      "--loader-size": dt(t, "loader-size"),
      "--loader-color": n ? Vn(n, e) : void 0,
    },
  }),
  nd = ke((e, t) => {
    const n = ye("Loader", PH, e),
      {
        size: r,
        color: i,
        type: o,
        vars: a,
        className: s,
        style: u,
        classNames: c,
        styles: d,
        unstyled: h,
        loaders: p,
        variant: v,
        children: b,
        ...y
      } = n,
      w = et({
        name: "Loader",
        props: n,
        classes: Yr,
        className: s,
        style: u,
        classNames: c,
        styles: d,
        unstyled: h,
        vars: a,
        varsResolver: AH,
      });
    return b
      ? jsxRuntime.jsx(Se, {
          ...w("root"),
          ref: t,
          ...y,
          children: b,
        })
      : jsxRuntime.jsx(Se, {
          ...w("root"),
          ref: t,
          component: p[o],
          variant: v,
          size: r,
          ...y,
        });
  });
nd.defaultLoaders = l5;
nd.classes = Yr;
nd.displayName = "@mantine/core/Loader";
var uu = {
  root: "m_8d3f4000",
  icon: "m_8d3afb97",
  loader: "m_302b9fb1",
  group: "m_1a0f1b21",
  groupSection: "m_437b6484",
};
const nj = {
    orientation: "horizontal",
  },
  OH = (e, { borderWidth: t }) => ({
    group: {
      "--ai-border-width": oe(t),
    },
  }),
  rA = ke((e, t) => {
    const n = ye("ActionIconGroup", nj, e),
      {
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        orientation: u,
        vars: c,
        borderWidth: d,
        variant: h,
        mod: p,
        ...v
      } = ye("ActionIconGroup", nj, e),
      b = et({
        name: "ActionIconGroup",
        props: n,
        classes: uu,
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: c,
        varsResolver: OH,
        rootSelector: "group",
      });
    return jsxRuntime.jsx(Se, {
      ...b("group"),
      ref: t,
      variant: h,
      mod: [
        {
          "data-orientation": u,
        },
        p,
      ],
      role: "group",
      ...v,
    });
  });
rA.classes = uu;
rA.displayName = "@mantine/core/ActionIconGroup";
const rj = {},
  EH = (e, { radius: t, color: n, gradient: r, variant: i, autoContrast: o, size: a }) => {
    const s = e.variantColorResolver({
      color: n || e.primaryColor,
      theme: e,
      gradient: r,
      variant: i || "filled",
      autoContrast: o,
    });
    return {
      groupSection: {
        "--section-height": dt(a, "section-height"),
        "--section-padding-x": dt(a, "section-padding-x"),
        "--section-fz": yn(a),
        "--section-radius": t === void 0 ? void 0 : gn(t),
        "--section-bg": n || i ? s.background : void 0,
        "--section-color": s.color,
        "--section-bd": n || i ? s.border : void 0,
      },
    };
  },
  iA = ke((e, t) => {
    const n = ye("ActionIconGroupSection", rj, e),
      {
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: u,
        variant: c,
        gradient: d,
        radius: h,
        autoContrast: p,
        ...v
      } = ye("ActionIconGroupSection", rj, e),
      b = et({
        name: "ActionIconGroupSection",
        props: n,
        classes: uu,
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: EH,
        rootSelector: "groupSection",
      });
    return jsxRuntime.jsx(Se, {
      ...b("groupSection"),
      ref: t,
      variant: c,
      ...v,
    });
  });
iA.classes = uu;
iA.displayName = "@mantine/core/ActionIconGroupSection";
const TH = {},
  CH = (e, { size: t, radius: n, variant: r, gradient: i, color: o, autoContrast: a }) => {
    const s = e.variantColorResolver({
      color: o || e.primaryColor,
      theme: e,
      gradient: i,
      variant: r || "filled",
      autoContrast: a,
    });
    return {
      root: {
        "--ai-size": dt(t, "ai-size"),
        "--ai-radius": n === void 0 ? void 0 : gn(n),
        "--ai-bg": o || r ? s.background : void 0,
        "--ai-hover": o || r ? s.hover : void 0,
        "--ai-hover-color": o || r ? s.hoverColor : void 0,
        "--ai-color": s.color,
        "--ai-bd": o || r ? s.border : void 0,
      },
    };
  },
  ta = vo((e, t) => {
    const n = ye("ActionIcon", TH, e),
      {
        className: r,
        unstyled: i,
        variant: o,
        classNames: a,
        styles: s,
        style: u,
        loading: c,
        loaderProps: d,
        size: h,
        color: p,
        radius: v,
        __staticSelector: b,
        gradient: y,
        vars: w,
        children: x,
        disabled: S,
        "data-disabled": _,
        autoContrast: E,
        mod: P,
        ...O
      } = n,
      k = et({
        name: ["ActionIcon", b],
        props: n,
        className: r,
        style: u,
        classes: uu,
        classNames: a,
        styles: s,
        unstyled: i,
        vars: w,
        varsResolver: CH,
      });
    return jsxRuntime.jsxs(ao, {
      ...k("root", {
        active: !S && !c && !_,
      }),
      ...O,
      unstyled: i,
      variant: o,
      size: h,
      disabled: S || c,
      ref: t,
      mod: [
        {
          loading: c,
          disabled: S || _,
        },
        P,
      ],
      children: [
        jsxRuntime.jsx(yo, {
          mounted: !!c,
          transition: "slide-down",
          duration: 150,
          children: (R) =>
            jsxRuntime.jsx(Se, {
              component: "span",
              ...k("loader", {
                style: R,
              }),
              "aria-hidden": !0,
              children: jsxRuntime.jsx(nd, {
                color: "var(--ai-color)",
                size: "calc(var(--ai-size) * 0.55)",
                ...d,
              }),
            }),
        }),
        jsxRuntime.jsx(Se, {
          component: "span",
          mod: {
            loading: c,
          },
          ...k("icon"),
          children: x,
        }),
      ],
    });
  });
ta.classes = uu;
ta.displayName = "@mantine/core/ActionIcon";
ta.Group = rA;
ta.GroupSection = iA;
const u5 = React.forwardRef(({ size: e = "var(--cb-icon-size, 70%)", style: t, ...n }, r) =>
  jsxRuntime.jsx("svg", {
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      ...t,
      width: e,
      height: e,
    },
    ref: r,
    ...n,
    children: jsxRuntime.jsx("path", {
      d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  }),
);
u5.displayName = "@mantine/core/CloseIcon";
var c5 = {
  root: "m_86a44da5",
  "root--subtle": "m_220c80f2",
};
const kH = {
    variant: "subtle",
  },
  jH = (e, { size: t, radius: n, iconSize: r }) => ({
    root: {
      "--cb-size": dt(t, "cb-size"),
      "--cb-radius": n === void 0 ? void 0 : gn(n),
      "--cb-icon-size": oe(r),
    },
  }),
  dv = vo((e, t) => {
    const n = ye("CloseButton", kH, e),
      {
        iconSize: r,
        children: i,
        vars: o,
        radius: a,
        className: s,
        classNames: u,
        style: c,
        styles: d,
        unstyled: h,
        "data-disabled": p,
        disabled: v,
        variant: b,
        icon: y,
        mod: w,
        __staticSelector: x,
        ...S
      } = n,
      _ = et({
        name: x || "CloseButton",
        props: n,
        className: s,
        style: c,
        classes: c5,
        classNames: u,
        styles: d,
        unstyled: h,
        vars: o,
        varsResolver: jH,
      });
    return jsxRuntime.jsxs(ao, {
      ref: t,
      ...S,
      unstyled: h,
      variant: b,
      disabled: v,
      mod: [
        {
          disabled: v || p,
        },
        w,
      ],
      ..._("root", {
        variant: b,
        active: !v && !p,
      }),
      children: [y || jsxRuntime.jsx(u5, {}), i],
    });
  });
dv.classes = c5;
dv.displayName = "@mantine/core/CloseButton";
function RH(e) {
  return React.Children.toArray(e).filter(Boolean);
}
var f5 = {
  root: "m_4081bf90",
};
const MH = {
    preventGrowOverflow: !0,
    gap: "md",
    align: "center",
    justify: "flex-start",
    wrap: "wrap",
  },
  NH = (e, { grow: t, preventGrowOverflow: n, gap: r, align: i, justify: o, wrap: a }, { childWidth: s }) => ({
    root: {
      "--group-child-width": t && n ? s : void 0,
      "--group-gap": ls(r),
      "--group-align": i,
      "--group-justify": o,
      "--group-wrap": a,
    },
  }),
  sn = ke((e, t) => {
    const n = ye("Group", MH, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        children: u,
        gap: c,
        align: d,
        justify: h,
        wrap: p,
        grow: v,
        preventGrowOverflow: b,
        vars: y,
        variant: w,
        __size: x,
        mod: S,
        ..._
      } = n,
      E = RH(u),
      P = E.length,
      O = ls(c ?? "md"),
      R = {
        childWidth: `calc(${100 / P}% - (${O} - ${O} / ${P}))`,
      },
      M = et({
        name: "Group",
        props: n,
        stylesCtx: R,
        className: i,
        style: o,
        classes: f5,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: y,
        varsResolver: NH,
      });
    return jsxRuntime.jsx(Se, {
      ...M("root"),
      ref: t,
      variant: w,
      mod: [
        {
          grow: v,
        },
        S,
      ],
      size: x,
      ..._,
      children: E,
    });
  });
sn.classes = f5;
sn.displayName = "@mantine/core/Group";
const [IH, go] = kr("ModalBase component was not found in tree");
function DH({ opened: e, transitionDuration: t }) {
  const [n, r] = React.useState(e),
    i = React.useRef(-1),
    a = jP() ? 0 : t;
  return (
    React.useEffect(
      () => (
        e ? (r(!0), window.clearTimeout(i.current)) : a === 0 ? r(!1) : (i.current = window.setTimeout(() => r(!1), a)),
        () => window.clearTimeout(i.current)
      ),
      [e, a],
    ),
    n
  );
}
function $H({ id: e, transitionProps: t, opened: n, trapFocus: r, closeOnEscape: i, onClose: o, returnFocus: a }) {
  const s = mo(e),
    [u, c] = React.useState(!1),
    [d, h] = React.useState(!1),
    p = typeof t?.duration == "number" ? t?.duration : 200,
    v = DH({
      opened: n,
      transitionDuration: p,
    });
  return (
    K7(
      "keydown",
      (b) => {
        b.key === "Escape" &&
          i &&
          !b.isComposing &&
          n &&
          b.target?.getAttribute("data-mantine-stop-propagation") !== "true" &&
          o();
      },
      {
        capture: !0,
      },
    ),
    tL({
      opened: n,
      shouldReturnFocus: r && a,
    }),
    {
      _id: s,
      titleMounted: u,
      bodyMounted: d,
      shouldLockScroll: v,
      setTitleMounted: c,
      setBodyMounted: h,
    }
  );
}
const d5 = React.forwardRef(
  (
    {
      keepMounted: e,
      opened: t,
      onClose: n,
      id: r,
      transitionProps: i,
      onExitTransitionEnd: o,
      onEnterTransitionEnd: a,
      trapFocus: s,
      closeOnEscape: u,
      returnFocus: c,
      closeOnClickOutside: d,
      withinPortal: h,
      portalProps: p,
      lockScroll: v,
      children: b,
      zIndex: y,
      shadow: w,
      padding: x,
      __vars: S,
      unstyled: _,
      removeScrollProps: E,
      ...P
    },
    O,
  ) => {
    const {
        _id: k,
        titleMounted: R,
        bodyMounted: M,
        shouldLockScroll: D,
        setTitleMounted: I,
        setBodyMounted: V,
      } = $H({
        id: r,
        transitionProps: i,
        opened: t,
        trapFocus: s,
        closeOnEscape: u,
        onClose: n,
        returnFocus: c,
      }),
      { key: z, ...q } = E || {};
    return jsxRuntime.jsx(lu, {
      ...p,
      withinPortal: h,
      children: jsxRuntime.jsx(IH, {
        value: {
          opened: t,
          onClose: n,
          closeOnClickOutside: d,
          onExitTransitionEnd: o,
          onEnterTransitionEnd: a,
          transitionProps: {
            ...i,
            keepMounted: e,
          },
          getTitleId: () => `${k}-title`,
          getBodyId: () => `${k}-body`,
          titleMounted: R,
          bodyMounted: M,
          setTitleMounted: I,
          setBodyMounted: V,
          trapFocus: s,
          closeOnEscape: u,
          zIndex: y,
          unstyled: _,
        },
        children: jsxRuntime.jsx(
          X3,
          {
            enabled: D && v,
            ...q,
            children: jsxRuntime.jsx(Se, {
              ref: O,
              ...P,
              __vars: {
                ...S,
                "--mb-z-index": (y || po("modal")).toString(),
                "--mb-shadow": kP(w),
                "--mb-padding": ls(x),
              },
              children: b,
            }),
          },
          z,
        ),
      }),
    });
  },
);
d5.displayName = "@mantine/core/ModalBase";
function LH() {
  const e = go();
  return React.useEffect(() => (e.setBodyMounted(!0), () => e.setBodyMounted(!1)), []), e.getBodyId();
}
var jl = {
  title: "m_615af6c9",
  header: "m_b5489c3c",
  inner: "m_60c222c7",
  content: "m_fd1ab0aa",
  close: "m_606cb269",
  body: "m_5df29311",
};
const h5 = React.forwardRef(({ className: e, ...t }, n) => {
  const r = LH(),
    i = go();
  return jsxRuntime.jsx(Se, {
    ref: n,
    ...t,
    id: r,
    className: We(
      {
        [jl.body]: !i.unstyled,
      },
      e,
    ),
  });
});
h5.displayName = "@mantine/core/ModalBaseBody";
const p5 = React.forwardRef(({ className: e, onClick: t, ...n }, r) => {
  const i = go();
  return jsxRuntime.jsx(dv, {
    ref: r,
    ...n,
    onClick: (o) => {
      i.onClose(), t?.(o);
    },
    className: We(
      {
        [jl.close]: !i.unstyled,
      },
      e,
    ),
    unstyled: i.unstyled,
  });
});
p5.displayName = "@mantine/core/ModalBaseCloseButton";
const m5 = React.forwardRef(({ transitionProps: e, className: t, innerProps: n, onKeyDown: r, style: i, ...o }, a) => {
  const s = go();
  return jsxRuntime.jsx(yo, {
    mounted: s.opened,
    transition: "pop",
    ...s.transitionProps,
    onExited: () => {
      s.onExitTransitionEnd?.(), s.transitionProps?.onExited?.();
    },
    onEntered: () => {
      s.onEnterTransitionEnd?.(), s.transitionProps?.onEntered?.();
    },
    ...e,
    children: (u) =>
      jsxRuntime.jsx("div", {
        ...n,
        className: We(
          {
            [jl.inner]: !s.unstyled,
          },
          n.className,
        ),
        children: jsxRuntime.jsx(fv, {
          active: s.opened && s.trapFocus,
          innerRef: a,
          children: jsxRuntime.jsx(eA, {
            ...o,
            component: "section",
            role: "dialog",
            tabIndex: -1,
            "aria-modal": !0,
            "aria-describedby": s.bodyMounted ? s.getBodyId() : void 0,
            "aria-labelledby": s.titleMounted ? s.getTitleId() : void 0,
            style: [i, u],
            className: We(
              {
                [jl.content]: !s.unstyled,
              },
              t,
            ),
            unstyled: s.unstyled,
            children: o.children,
          }),
        }),
      }),
  });
});
m5.displayName = "@mantine/core/ModalBaseContent";
const v5 = React.forwardRef(({ className: e, ...t }, n) => {
  const r = go();
  return jsxRuntime.jsx(Se, {
    component: "header",
    ref: n,
    className: We(
      {
        [jl.header]: !r.unstyled,
      },
      e,
    ),
    ...t,
  });
});
v5.displayName = "@mantine/core/ModalBaseHeader";
const BH = {
  duration: 200,
  timingFunction: "ease",
  transition: "fade",
};
function FH(e) {
  const t = go();
  return {
    ...BH,
    ...t.transitionProps,
    ...e,
  };
}
const y5 = React.forwardRef(({ onClick: e, transitionProps: t, style: n, visible: r, ...i }, o) => {
  const a = go(),
    s = FH(t);
  return jsxRuntime.jsx(yo, {
    mounted: r !== void 0 ? r : a.opened,
    ...s,
    transition: "fade",
    children: (u) =>
      jsxRuntime.jsx(cv, {
        ref: o,
        fixed: !0,
        style: [n, u],
        zIndex: a.zIndex,
        unstyled: a.unstyled,
        onClick: (c) => {
          e?.(c), a.closeOnClickOutside && a.onClose();
        },
        ...i,
      }),
  });
});
y5.displayName = "@mantine/core/ModalBaseOverlay";
function VH() {
  const e = go();
  return React.useEffect(() => (e.setTitleMounted(!0), () => e.setTitleMounted(!1)), []), e.getTitleId();
}
const g5 = React.forwardRef(({ className: e, ...t }, n) => {
  const r = VH(),
    i = go();
  return jsxRuntime.jsx(Se, {
    component: "h2",
    ref: n,
    className: We(
      {
        [jl.title]: !i.unstyled,
      },
      e,
    ),
    ...t,
    id: r,
  });
});
g5.displayName = "@mantine/core/ModalBaseTitle";
function zH({ children: e }) {
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: e,
  });
}
const [qH, WH] = CP({
    size: "sm",
  }),
  UH = {},
  b5 = ke((e, t) => {
    const n = ye("InputClearButton", UH, e),
      { size: r, variant: i, vars: o, classNames: a, styles: s, ...u } = n,
      c = WH(),
      { resolvedClassNames: d, resolvedStyles: h } = ev({
        classNames: a,
        styles: s,
        props: n,
      });
    return jsxRuntime.jsx(dv, {
      variant: i || "transparent",
      ref: t,
      size: r || c?.size || "sm",
      classNames: d,
      styles: h,
      __staticSelector: "InputClearButton",
      ...u,
    });
  });
b5.displayName = "@mantine/core/InputClearButton";
const [HH, rd] = CP({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0,
});
var Rr = {
  wrapper: "m_6c018570",
  input: "m_8fb7ebe7",
  section: "m_82577fc2",
  placeholder: "m_88bacfd0",
  root: "m_46b77525",
  label: "m_8fdc1311",
  required: "m_78a94662",
  error: "m_8f816625",
  description: "m_fe47ce59",
};
const ij = {},
  KH = (e, { size: t }) => ({
    description: {
      "--input-description-size": t === void 0 ? void 0 : `calc(${yn(t)} - ${oe(2)})`,
    },
  }),
  hv = ke((e, t) => {
    const n = ye("InputDescription", ij, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        size: c,
        __staticSelector: d,
        __inheritStyles: h = !0,
        variant: p,
        ...v
      } = ye("InputDescription", ij, n),
      b = rd(),
      y = et({
        name: ["InputWrapper", d],
        props: n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        rootSelector: "description",
        vars: u,
        varsResolver: KH,
      }),
      w = (h && b?.getStyles) || y;
    return jsxRuntime.jsx(Se, {
      component: "p",
      ref: t,
      variant: p,
      size: c,
      ...w(
        "description",
        b?.getStyles
          ? {
              className: i,
              style: o,
            }
          : void 0,
      ),
      ...v,
    });
  });
hv.classes = Rr;
hv.displayName = "@mantine/core/InputDescription";
const GH = {},
  YH = (e, { size: t }) => ({
    error: {
      "--input-error-size": t === void 0 ? void 0 : `calc(${yn(t)} - ${oe(2)})`,
    },
  }),
  pv = ke((e, t) => {
    const n = ye("InputError", GH, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        size: c,
        __staticSelector: d,
        __inheritStyles: h = !0,
        variant: p,
        ...v
      } = n,
      b = et({
        name: ["InputWrapper", d],
        props: n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        rootSelector: "error",
        vars: u,
        varsResolver: YH,
      }),
      y = rd(),
      w = (h && y?.getStyles) || b;
    return jsxRuntime.jsx(Se, {
      component: "p",
      ref: t,
      variant: p,
      size: c,
      ...w(
        "error",
        y?.getStyles
          ? {
              className: i,
              style: o,
            }
          : void 0,
      ),
      ...v,
    });
  });
pv.classes = Rr;
pv.displayName = "@mantine/core/InputError";
const oj = {
    labelElement: "label",
  },
  XH = (e, { size: t }) => ({
    label: {
      "--input-label-size": yn(t),
      "--input-asterisk-color": void 0,
    },
  }),
  mv = ke((e, t) => {
    const n = ye("InputLabel", oj, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        labelElement: c,
        size: d,
        required: h,
        htmlFor: p,
        onMouseDown: v,
        children: b,
        __staticSelector: y,
        variant: w,
        mod: x,
        ...S
      } = ye("InputLabel", oj, n),
      _ = et({
        name: ["InputWrapper", y],
        props: n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        rootSelector: "label",
        vars: u,
        varsResolver: XH,
      }),
      E = rd(),
      P = E?.getStyles || _;
    return jsxRuntime.jsxs(Se, {
      ...P(
        "label",
        E?.getStyles
          ? {
              className: i,
              style: o,
            }
          : void 0,
      ),
      component: c,
      variant: w,
      size: d,
      ref: t,
      htmlFor: c === "label" ? p : void 0,
      mod: [
        {
          required: h,
        },
        x,
      ],
      onMouseDown: (O) => {
        v?.(O), !O.defaultPrevented && O.detail > 1 && O.preventDefault();
      },
      ...S,
      children: [
        b,
        h &&
          jsxRuntime.jsx("span", {
            ...P("required"),
            "aria-hidden": !0,
            children: " *",
          }),
      ],
    });
  });
mv.classes = Rr;
mv.displayName = "@mantine/core/InputLabel";
const aj = {},
  oA = ke((e, t) => {
    const n = ye("InputPlaceholder", aj, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        __staticSelector: c,
        variant: d,
        error: h,
        mod: p,
        ...v
      } = ye("InputPlaceholder", aj, n),
      b = et({
        name: ["InputPlaceholder", c],
        props: n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        rootSelector: "placeholder",
      });
    return jsxRuntime.jsx(Se, {
      ...b("placeholder"),
      mod: [
        {
          error: !!h,
        },
        p,
      ],
      component: "span",
      variant: d,
      ref: t,
      ...v,
    });
  });
oA.classes = Rr;
oA.displayName = "@mantine/core/InputPlaceholder";
function ZH(e, { hasDescription: t, hasError: n }) {
  const r = e.findIndex((u) => u === "input"),
    i = e.slice(0, r),
    o = e.slice(r + 1),
    a = (t && i.includes("description")) || (n && i.includes("error"));
  return {
    offsetBottom: (t && o.includes("description")) || (n && o.includes("error")),
    offsetTop: a,
  };
}
const QH = {
    labelElement: "label",
    inputContainer: (e) => e,
    inputWrapperOrder: ["label", "description", "input", "error"],
  },
  JH = (e, { size: t }) => ({
    label: {
      "--input-label-size": yn(t),
      "--input-asterisk-color": void 0,
    },
    error: {
      "--input-error-size": t === void 0 ? void 0 : `calc(${yn(t)} - ${oe(2)})`,
    },
    description: {
      "--input-description-size": t === void 0 ? void 0 : `calc(${yn(t)} - ${oe(2)})`,
    },
  }),
  aA = ke((e, t) => {
    const n = ye("InputWrapper", QH, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        size: c,
        variant: d,
        __staticSelector: h,
        inputContainer: p,
        inputWrapperOrder: v,
        label: b,
        error: y,
        description: w,
        labelProps: x,
        descriptionProps: S,
        errorProps: _,
        labelElement: E,
        children: P,
        withAsterisk: O,
        id: k,
        required: R,
        __stylesApiProps: M,
        mod: D,
        ...I
      } = n,
      V = et({
        name: ["InputWrapper", h],
        props: M || n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: JH,
      }),
      z = {
        size: c,
        variant: d,
        __staticSelector: h,
      },
      q = mo(k),
      U = typeof O == "boolean" ? O : R,
      B = _?.id || `${q}-error`,
      F = S?.id || `${q}-description`,
      L = q,
      W = !!y && typeof y != "boolean",
      G = !!w,
      $ = `${W ? B : ""} ${G ? F : ""}`,
      K = $.trim().length > 0 ? $.trim() : void 0,
      ne = x?.id || `${q}-label`,
      he =
        b &&
        jsxRuntime.jsx(
          mv,
          {
            labelElement: E,
            id: ne,
            htmlFor: L,
            required: U,
            ...z,
            ...x,
            children: b,
          },
          "label",
        ),
      le =
        G &&
        jsxRuntime.jsx(
          hv,
          {
            ...S,
            ...z,
            size: S?.size || z.size,
            id: S?.id || F,
            children: w,
          },
          "description",
        ),
      pe = jsxRuntime.jsx(
        React.Fragment,
        {
          children: p(P),
        },
        "input",
      ),
      Pe =
        W &&
        React.createElement(
          pv,
          {
            ..._,
            ...z,
            size: _?.size || z.size,
            key: "error",
            id: _?.id || B,
          },
          y,
        ),
      xe = v.map((re) => {
        switch (re) {
          case "label":
            return he;
          case "input":
            return pe;
          case "description":
            return le;
          case "error":
            return Pe;
          default:
            return null;
        }
      });
    return jsxRuntime.jsx(HH, {
      value: {
        getStyles: V,
        describedBy: K,
        inputId: L,
        labelId: ne,
        ...ZH(v, {
          hasDescription: G,
          hasError: W,
        }),
      },
      children: jsxRuntime.jsx(Se, {
        ref: t,
        variant: d,
        size: c,
        mod: [
          {
            error: !!y,
          },
          D,
        ],
        ...V("root"),
        ...I,
        children: xe,
      }),
    });
  });
aA.classes = Rr;
aA.displayName = "@mantine/core/InputWrapper";
const eK = {
    variant: "default",
    leftSectionPointerEvents: "none",
    rightSectionPointerEvents: "none",
    withAria: !0,
    withErrorStyles: !0,
  },
  tK = (e, t, n) => ({
    wrapper: {
      "--input-margin-top": n.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
      "--input-margin-bottom": n.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
      "--input-height": dt(t.size, "input-height"),
      "--input-fz": yn(t.size),
      "--input-radius": t.radius === void 0 ? void 0 : gn(t.radius),
      "--input-left-section-width": t.leftSectionWidth !== void 0 ? oe(t.leftSectionWidth) : void 0,
      "--input-right-section-width": t.rightSectionWidth !== void 0 ? oe(t.rightSectionWidth) : void 0,
      "--input-padding-y": t.multiline ? dt(t.size, "input-padding-y") : void 0,
      "--input-left-section-pointer-events": t.leftSectionPointerEvents,
      "--input-right-section-pointer-events": t.rightSectionPointerEvents,
    },
  }),
  un = vo((e, t) => {
    const n = ye("Input", eK, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        required: u,
        __staticSelector: c,
        __stylesApiProps: d,
        size: h,
        wrapperProps: p,
        error: v,
        disabled: b,
        leftSection: y,
        leftSectionProps: w,
        leftSectionWidth: x,
        rightSection: S,
        rightSectionProps: _,
        rightSectionWidth: E,
        rightSectionPointerEvents: P,
        leftSectionPointerEvents: O,
        variant: k,
        vars: R,
        pointer: M,
        multiline: D,
        radius: I,
        id: V,
        withAria: z,
        withErrorStyles: q,
        mod: U,
        inputSize: B,
        __clearSection: F,
        __clearable: L,
        __defaultRightSection: W,
        ...G
      } = n,
      { styleProps: $, rest: K } = tv(G),
      ne = rd(),
      he = {
        offsetBottom: ne?.offsetBottom,
        offsetTop: ne?.offsetTop,
      },
      le = et({
        name: ["Input", c],
        props: d || n,
        classes: Rr,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        stylesCtx: he,
        rootSelector: "wrapper",
        vars: R,
        varsResolver: tK,
      }),
      pe = z
        ? {
            required: u,
            disabled: b,
            "aria-invalid": !!v,
            "aria-describedby": ne?.describedBy,
            id: ne?.inputId || V,
          }
        : {},
      Pe = S || (L && F) || W;
    return jsxRuntime.jsx(qH, {
      value: {
        size: h || "sm",
      },
      children: jsxRuntime.jsxs(Se, {
        ...le("wrapper"),
        ...$,
        ...p,
        mod: [
          {
            error: !!v && q,
            pointer: M,
            disabled: b,
            multiline: D,
            "data-with-right-section": !!Pe,
            "data-with-left-section": !!y,
          },
          U,
        ],
        variant: k,
        size: h,
        children: [
          y &&
            jsxRuntime.jsx("div", {
              ...w,
              "data-position": "left",
              ...le("section", {
                className: w?.className,
                style: w?.style,
              }),
              children: y,
            }),
          jsxRuntime.jsx(Se, {
            component: "input",
            ...K,
            ...pe,
            ref: t,
            required: u,
            mod: {
              disabled: b,
              error: !!v && q,
            },
            variant: k,
            __size: B,
            ...le("input"),
          }),
          Pe &&
            jsxRuntime.jsx("div", {
              ..._,
              "data-position": "right",
              ...le("section", {
                className: _?.className,
                style: _?.style,
              }),
              children: Pe,
            }),
        ],
      }),
    });
  });
un.classes = Rr;
un.Wrapper = aA;
un.Label = mv;
un.Error = pv;
un.Description = hv;
un.Placeholder = oA;
un.ClearButton = b5;
un.displayName = "@mantine/core/Input";
function nK(e, t, n) {
  const r = ye(e, t, n),
    {
      label: i,
      description: o,
      error: a,
      required: s,
      classNames: u,
      styles: c,
      className: d,
      unstyled: h,
      __staticSelector: p,
      __stylesApiProps: v,
      errorProps: b,
      labelProps: y,
      descriptionProps: w,
      wrapperProps: x,
      id: S,
      size: _,
      style: E,
      inputContainer: P,
      inputWrapperOrder: O,
      withAsterisk: k,
      variant: R,
      vars: M,
      mod: D,
      ...I
    } = r,
    { styleProps: V, rest: z } = tv(I),
    q = {
      label: i,
      description: o,
      error: a,
      required: s,
      classNames: u,
      className: d,
      __staticSelector: p,
      __stylesApiProps: v || r,
      errorProps: b,
      labelProps: y,
      descriptionProps: w,
      unstyled: h,
      styles: c,
      size: _,
      style: E,
      inputContainer: P,
      inputWrapperOrder: O,
      withAsterisk: k,
      variant: R,
      id: S,
      mod: D,
      ...x,
    };
  return {
    ...z,
    classNames: u,
    styles: c,
    unstyled: h,
    wrapperProps: {
      ...q,
      ...V,
    },
    inputProps: {
      required: s,
      classNames: u,
      styles: c,
      unstyled: h,
      size: _,
      __staticSelector: p,
      __stylesApiProps: v || r,
      error: a,
      variant: R,
      id: S,
    },
  };
}
const rK = {
    __staticSelector: "InputBase",
    withAria: !0,
  },
  cu = vo((e, t) => {
    const { inputProps: n, wrapperProps: r, ...i } = nK("InputBase", rK, e);
    return jsxRuntime.jsx(un.Wrapper, {
      ...r,
      children: jsxRuntime.jsx(un, {
        ...n,
        ...i,
        ref: t,
      }),
    });
  });
cu.classes = {
  ...un.classes,
  ...un.Wrapper.classes,
};
cu.displayName = "@mantine/core/InputBase";
const [iK, sA] = kr("Accordion component was not found in the tree");
function lA({ style: e, size: t = 16, ...n }) {
  return jsxRuntime.jsx("svg", {
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      ...e,
      width: oe(t),
      height: oe(t),
      display: "block",
    },
    ...n,
    children: jsxRuntime.jsx("path", {
      d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
}
lA.displayName = "@mantine/core/AccordionChevron";
const [oK, w5] = kr("Accordion.Item component was not found in the tree");
var id = {
  root: "m_9bdbb667",
  panel: "m_df78851f",
  content: "m_4ba554d4",
  itemTitle: "m_8fa820a0",
  control: "m_4ba585b8",
  "control--default": "m_6939a5e9",
  "control--contained": "m_4271d21b",
  label: "m_df3ffa0f",
  chevron: "m_3f35ae96",
  icon: "m_9bd771fe",
  item: "m_9bd7b098",
  "item--default": "m_fe19b709",
  "item--contained": "m_1f921b3b",
  "item--filled": "m_2cdf939a",
  "item--separated": "m_9f59b069",
};
const aK = {},
  uA = ke((e, t) => {
    const {
        classNames: n,
        className: r,
        style: i,
        styles: o,
        vars: a,
        chevron: s,
        icon: u,
        onClick: c,
        onKeyDown: d,
        children: h,
        disabled: p,
        mod: v,
        ...b
      } = ye("AccordionControl", aK, e),
      { value: y } = w5(),
      w = sA(),
      x = w.isItemActive(y),
      S = typeof w.order == "number",
      _ = `h${w.order}`,
      E = jsxRuntime.jsxs(ao, {
        ...b,
        ...w.getStyles("control", {
          className: r,
          classNames: n,
          style: i,
          styles: o,
          variant: w.variant,
        }),
        unstyled: w.unstyled,
        mod: [
          "accordion-control",
          {
            active: x,
            "chevron-position": w.chevronPosition,
            disabled: p,
          },
          v,
        ],
        ref: t,
        onClick: (P) => {
          c?.(P), w.onChange(y);
        },
        type: "button",
        disabled: p,
        "aria-expanded": x,
        "aria-controls": w.getRegionId(y),
        id: w.getControlId(y),
        onKeyDown: J3({
          siblingSelector: "[data-accordion-control]",
          parentSelector: "[data-accordion]",
          activateOnFocus: !1,
          loop: w.loop,
          orientation: "vertical",
          onKeyDown: d,
        }),
        children: [
          jsxRuntime.jsx(Se, {
            component: "span",
            mod: {
              rotate: !w.disableChevronRotation && x,
              position: w.chevronPosition,
            },
            ...w.getStyles("chevron", {
              classNames: n,
              styles: o,
            }),
            children: s || w.chevron,
          }),
          jsxRuntime.jsx("span", {
            ...w.getStyles("label", {
              classNames: n,
              styles: o,
            }),
            children: h,
          }),
          u &&
            jsxRuntime.jsx(Se, {
              component: "span",
              mod: {
                "chevron-position": w.chevronPosition,
              },
              ...w.getStyles("icon", {
                classNames: n,
                styles: o,
              }),
              children: u,
            }),
        ],
      });
    return S
      ? jsxRuntime.jsx(_, {
          ...w.getStyles("itemTitle", {
            classNames: n,
            styles: o,
          }),
          children: E,
        })
      : E;
  });
uA.displayName = "@mantine/core/AccordionControl";
uA.classes = id;
const sK = {},
  cA = ke((e, t) => {
    const {
        classNames: n,
        className: r,
        style: i,
        styles: o,
        vars: a,
        value: s,
        mod: u,
        ...c
      } = ye("AccordionItem", sK, e),
      d = sA();
    return jsxRuntime.jsx(oK, {
      value: {
        value: s,
      },
      children: jsxRuntime.jsx(Se, {
        ref: t,
        mod: [
          {
            active: d.isItemActive(s),
          },
          u,
        ],
        ...d.getStyles("item", {
          className: r,
          classNames: n,
          styles: o,
          style: i,
          variant: d.variant,
        }),
        ...c,
      }),
    });
  });
cA.displayName = "@mantine/core/AccordionItem";
cA.classes = id;
const lK = {},
  fA = ke((e, t) => {
    const {
        classNames: n,
        className: r,
        style: i,
        styles: o,
        vars: a,
        children: s,
        ...u
      } = ye("AccordionPanel", lK, e),
      { value: c } = w5(),
      d = sA();
    return jsxRuntime.jsx(al, {
      ref: t,
      ...d.getStyles("panel", {
        className: r,
        classNames: n,
        style: i,
        styles: o,
      }),
      ...u,
      in: d.isItemActive(c),
      transitionDuration: d.transitionDuration ?? 200,
      role: "region",
      id: d.getRegionId(c),
      "aria-labelledby": d.getControlId(c),
      children: jsxRuntime.jsx("div", {
        ...d.getStyles("content", {
          classNames: n,
          styles: o,
        }),
        children: s,
      }),
    });
  });
fA.displayName = "@mantine/core/AccordionPanel";
fA.classes = id;
const uK = {
    multiple: !1,
    disableChevronRotation: !1,
    chevronPosition: "right",
    variant: "default",
    chevron: jsxRuntime.jsx(lA, {}),
  },
  cK = (e, { transitionDuration: t, chevronSize: n, radius: r }) => ({
    root: {
      "--accordion-transition-duration": t === void 0 ? void 0 : `${t}ms`,
      "--accordion-chevron-size": n === void 0 ? void 0 : oe(n),
      "--accordion-radius": r === void 0 ? void 0 : gn(r),
    },
  });
function Tn(e) {
  const t = ye("Accordion", uK, e),
    {
      classNames: n,
      className: r,
      style: i,
      styles: o,
      unstyled: a,
      vars: s,
      children: u,
      multiple: c,
      value: d,
      defaultValue: h,
      onChange: p,
      id: v,
      loop: b,
      transitionDuration: y,
      disableChevronRotation: w,
      chevronPosition: x,
      chevronSize: S,
      order: _,
      chevron: E,
      variant: P,
      radius: O,
      ...k
    } = t,
    R = mo(v),
    [M, D] = Pi({
      value: d,
      defaultValue: h,
      finalValue: c ? [] : null,
      onChange: p,
    }),
    I = (q) => (Array.isArray(M) ? M.includes(q) : q === M),
    V = (q) => {
      const U = Array.isArray(M) ? (M.includes(q) ? M.filter((B) => B !== q) : [...M, q]) : q === M ? null : q;
      D(U);
    },
    z = et({
      name: "Accordion",
      classes: id,
      props: t,
      className: r,
      style: i,
      classNames: n,
      styles: o,
      unstyled: a,
      vars: s,
      varsResolver: cK,
    });
  return jsxRuntime.jsx(iK, {
    value: {
      isItemActive: I,
      onChange: V,
      getControlId: Op(`${R}-control`, "Accordion.Item component was rendered with invalid value or without value"),
      getRegionId: Op(`${R}-panel`, "Accordion.Item component was rendered with invalid value or without value"),
      transitionDuration: y,
      disableChevronRotation: w,
      chevronPosition: x,
      order: _,
      chevron: E,
      loop: b,
      getStyles: z,
      variant: P,
      unstyled: a,
    },
    children: jsxRuntime.jsx(Se, {
      ...z("root"),
      id: R,
      ...k,
      variant: P,
      "data-accordion": !0,
      children: u,
    }),
  });
}
const fK = (e) => e;
Tn.extend = fK;
Tn.withProps = lW(Tn);
Tn.classes = id;
Tn.displayName = "@mantine/core/Accordion";
Tn.Item = cA;
Tn.Panel = fA;
Tn.Control = uA;
Tn.Chevron = lA;
var x5 = {
  root: "m_b6d8b162",
};
function dK(e) {
  if (e === "start") return "start";
  if (e === "end" || e) return "end";
}
const hK = {
    inherit: !1,
  },
  pK = (e, { variant: t, lineClamp: n, gradient: r, size: i, color: o }) => ({
    root: {
      "--text-fz": yn(i),
      "--text-lh": eL(i),
      "--text-gradient": t === "gradient" ? oS(r, e) : void 0,
      "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
      "--text-color": o ? Vn(o, e) : void 0,
    },
  }),
  Ue = vo((e, t) => {
    const n = ye("Text", hK, e),
      {
        lineClamp: r,
        truncate: i,
        inline: o,
        inherit: a,
        gradient: s,
        span: u,
        __staticSelector: c,
        vars: d,
        className: h,
        style: p,
        classNames: v,
        styles: b,
        unstyled: y,
        variant: w,
        mod: x,
        size: S,
        ..._
      } = n,
      E = et({
        name: ["Text", c],
        props: n,
        classes: x5,
        className: h,
        style: p,
        classNames: v,
        styles: b,
        unstyled: y,
        vars: d,
        varsResolver: pK,
      });
    return jsxRuntime.jsx(Se, {
      ...E("root", {
        focusable: !0,
      }),
      ref: t,
      component: u ? "span" : "p",
      variant: w,
      mod: [
        {
          "data-truncate": dK(i),
          "data-line-clamp": typeof r == "number",
          "data-inline": o,
          "data-inherit": a,
        },
        x,
      ],
      size: S,
      ..._,
    });
  });
Ue.classes = x5;
Ue.displayName = "@mantine/core/Text";
function S5(e) {
  return typeof e == "string"
    ? {
        value: e,
        label: e,
      }
    : "value" in e && !("label" in e)
      ? {
          value: e.value,
          label: e.value,
          disabled: e.disabled,
        }
      : typeof e == "number"
        ? {
            value: e.toString(),
            label: e.toString(),
          }
        : "group" in e
          ? {
              group: e.group,
              items: e.items.map((t) => S5(t)),
            }
          : e;
}
function mK(e) {
  return e ? e.map((t) => S5(t)) : [];
}
function _5(e) {
  return e.reduce(
    (t, n) =>
      "group" in n
        ? {
            ...t,
            ..._5(n.items),
          }
        : ((t[n.value] = n), t),
    {},
  );
}
var Qn = {
  dropdown: "m_88b62a41",
  search: "m_985517d8",
  options: "m_b2821a6e",
  option: "m_92253aa5",
  empty: "m_2530cd1d",
  header: "m_858f94bd",
  footer: "m_82b967cb",
  group: "m_254f3e4f",
  groupLabel: "m_2bb2e9e5",
  chevron: "m_2943220b",
  optionsDropdownOption: "m_390b5f4",
  optionsDropdownCheckIcon: "m_8ee53fc2",
};
const vK = {
    error: null,
  },
  yK = (e, { size: t, color: n }) => ({
    chevron: {
      "--combobox-chevron-size": dt(t, "combobox-chevron-size"),
      "--combobox-chevron-color": n ? Vn(n, e) : void 0,
    },
  }),
  dA = ke((e, t) => {
    const n = ye("ComboboxChevron", vK, e),
      { size: r, error: i, style: o, className: a, classNames: s, styles: u, unstyled: c, vars: d, mod: h, ...p } = n,
      v = et({
        name: "ComboboxChevron",
        classes: Qn,
        props: n,
        style: o,
        className: a,
        classNames: s,
        styles: u,
        unstyled: c,
        vars: d,
        varsResolver: yK,
        rootSelector: "chevron",
      });
    return jsxRuntime.jsx(Se, {
      component: "svg",
      ...p,
      ...v("chevron"),
      size: r,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: [
        "combobox-chevron",
        {
          error: i,
        },
        h,
      ],
      ref: t,
      children: jsxRuntime.jsx("path", {
        d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    });
  });
dA.classes = Qn;
dA.displayName = "@mantine/core/ComboboxChevron";
const [gK, Mr] = kr("Combobox component was not found in tree"),
  P5 = React.forwardRef(({ size: e, onMouseDown: t, onClick: n, onClear: r, ...i }, o) =>
    jsxRuntime.jsx(un.ClearButton, {
      ref: o,
      tabIndex: -1,
      "aria-hidden": !0,
      ...i,
      onMouseDown: (a) => {
        a.preventDefault(), t?.(a);
      },
      onClick: (a) => {
        r(), n?.(a);
      },
    }),
  );
P5.displayName = "@mantine/core/ComboboxClearButton";
const bK = {},
  hA = ke((e, t) => {
    const { classNames: n, styles: r, className: i, style: o, hidden: a, ...s } = ye("ComboboxDropdown", bK, e),
      u = Mr();
    return jsxRuntime.jsx(ha.Dropdown, {
      ...s,
      ref: t,
      role: "presentation",
      "data-hidden": a || void 0,
      ...u.getStyles("dropdown", {
        className: i,
        style: o,
        classNames: n,
        styles: r,
      }),
    });
  });
hA.classes = Qn;
hA.displayName = "@mantine/core/ComboboxDropdown";
const wK = {
    refProp: "ref",
  },
  A5 = ke((e, t) => {
    const { children: n, refProp: r } = ye("ComboboxDropdownTarget", wK, e);
    if ((Mr(), !vs(n)))
      throw new Error(
        "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    return jsxRuntime.jsx(ha.Target, {
      ref: t,
      refProp: r,
      children: n,
    });
  });
A5.displayName = "@mantine/core/ComboboxDropdownTarget";
const xK = {},
  pA = ke((e, t) => {
    const { classNames: n, className: r, style: i, styles: o, vars: a, ...s } = ye("ComboboxEmpty", xK, e),
      u = Mr();
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...u.getStyles("empty", {
        className: r,
        classNames: n,
        styles: o,
        style: i,
      }),
      ...s,
    });
  });
pA.classes = Qn;
pA.displayName = "@mantine/core/ComboboxEmpty";
function mA({
  onKeyDown: e,
  withKeyboardNavigation: t,
  withAriaAttributes: n,
  withExpandedAttribute: r,
  targetType: i,
  autoComplete: o,
}) {
  const a = Mr(),
    [s, u] = React.useState(null),
    c = (h) => {
      if ((e?.(h), !a.readOnly && t)) {
        if (h.nativeEvent.isComposing) return;
        if (
          (h.nativeEvent.code === "ArrowDown" &&
            (h.preventDefault(),
            a.store.dropdownOpened
              ? u(a.store.selectNextOption())
              : (a.store.openDropdown("keyboard"),
                u(a.store.selectActiveOption()),
                a.store.updateSelectedOptionIndex("selected", {
                  scrollIntoView: !0,
                }))),
          h.nativeEvent.code === "ArrowUp" &&
            (h.preventDefault(),
            a.store.dropdownOpened
              ? u(a.store.selectPreviousOption())
              : (a.store.openDropdown("keyboard"),
                u(a.store.selectActiveOption()),
                a.store.updateSelectedOptionIndex("selected", {
                  scrollIntoView: !0,
                }))),
          h.nativeEvent.code === "Enter" || h.nativeEvent.code === "NumpadEnter")
        ) {
          if (h.nativeEvent.keyCode === 229) return;
          const p = a.store.getSelectedOptionIndex();
          a.store.dropdownOpened && p !== -1
            ? (h.preventDefault(), a.store.clickSelectedOption())
            : i === "button" && (h.preventDefault(), a.store.openDropdown("keyboard"));
        }
        h.key === "Escape" && a.store.closeDropdown("keyboard"),
          h.nativeEvent.code === "Space" && i === "button" && (h.preventDefault(), a.store.toggleDropdown("keyboard"));
      }
    };
  return {
    ...(n
      ? {
          "aria-haspopup": "listbox",
          "aria-expanded": (r && !!(a.store.listId && a.store.dropdownOpened)) || void 0,
          "aria-controls": a.store.dropdownOpened ? a.store.listId : void 0,
          "aria-activedescendant": (a.store.dropdownOpened && s) || void 0,
          autoComplete: o,
          "data-expanded": a.store.dropdownOpened || void 0,
          "data-mantine-stop-propagation": a.store.dropdownOpened || void 0,
        }
      : {}),
    onKeyDown: c,
  };
}
const SK = {
    refProp: "ref",
    targetType: "input",
    withKeyboardNavigation: !0,
    withAriaAttributes: !0,
    withExpandedAttribute: !1,
    autoComplete: "off",
  },
  O5 = ke((e, t) => {
    const {
      children: n,
      refProp: r,
      withKeyboardNavigation: i,
      withAriaAttributes: o,
      withExpandedAttribute: a,
      targetType: s,
      autoComplete: u,
      ...c
    } = ye("ComboboxEventsTarget", SK, e);
    if (!vs(n))
      throw new Error(
        "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const d = Mr(),
      h = mA({
        targetType: s,
        withAriaAttributes: o,
        withKeyboardNavigation: i,
        withExpandedAttribute: a,
        onKeyDown: n.props.onKeyDown,
        autoComplete: u,
      });
    return React.cloneElement(n, {
      ...h,
      ...c,
      [r]: bn(t, d.store.targetRef, Qm(n)),
    });
  });
O5.displayName = "@mantine/core/ComboboxEventsTarget";
const _K = {},
  vA = ke((e, t) => {
    const { classNames: n, className: r, style: i, styles: o, vars: a, ...s } = ye("ComboboxFooter", _K, e),
      u = Mr();
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...u.getStyles("footer", {
        className: r,
        classNames: n,
        style: i,
        styles: o,
      }),
      ...s,
      onMouseDown: (c) => {
        c.preventDefault();
      },
    });
  });
vA.classes = Qn;
vA.displayName = "@mantine/core/ComboboxFooter";
const PK = {},
  yA = ke((e, t) => {
    const {
        classNames: n,
        className: r,
        style: i,
        styles: o,
        vars: a,
        children: s,
        label: u,
        ...c
      } = ye("ComboboxGroup", PK, e),
      d = Mr();
    return jsxRuntime.jsxs(Se, {
      ref: t,
      ...d.getStyles("group", {
        className: r,
        classNames: n,
        style: i,
        styles: o,
      }),
      ...c,
      children: [
        u &&
          jsxRuntime.jsx("div", {
            ...d.getStyles("groupLabel", {
              classNames: n,
              styles: o,
            }),
            children: u,
          }),
        s,
      ],
    });
  });
yA.classes = Qn;
yA.displayName = "@mantine/core/ComboboxGroup";
const AK = {},
  gA = ke((e, t) => {
    const { classNames: n, className: r, style: i, styles: o, vars: a, ...s } = ye("ComboboxHeader", AK, e),
      u = Mr();
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...u.getStyles("header", {
        className: r,
        classNames: n,
        style: i,
        styles: o,
      }),
      ...s,
      onMouseDown: (c) => {
        c.preventDefault();
      },
    });
  });
gA.classes = Qn;
gA.displayName = "@mantine/core/ComboboxHeader";
function E5({ value: e, valuesDivider: t = ",", ...n }) {
  return jsxRuntime.jsx("input", {
    type: "hidden",
    value: Array.isArray(e) ? e.join(t) : e || "",
    ...n,
  });
}
E5.displayName = "@mantine/core/ComboboxHiddenInput";
const OK = {},
  bA = ke((e, t) => {
    const n = ye("ComboboxOption", OK, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        vars: s,
        onClick: u,
        id: c,
        active: d,
        onMouseDown: h,
        onMouseOver: p,
        disabled: v,
        selected: b,
        mod: y,
        ...w
      } = n,
      x = Mr(),
      S = React.useId(),
      _ = c || S;
    return jsxRuntime.jsx(Se, {
      ...x.getStyles("option", {
        className: i,
        classNames: r,
        styles: a,
        style: o,
      }),
      ...w,
      ref: t,
      id: _,
      mod: [
        "combobox-option",
        {
          "combobox-active": d,
          "combobox-disabled": v,
          "combobox-selected": b,
        },
        y,
      ],
      role: "option",
      onClick: (E) => {
        v ? E.preventDefault() : (x.onOptionSubmit?.(n.value, n), u?.(E));
      },
      onMouseDown: (E) => {
        E.preventDefault(), h?.(E);
      },
      onMouseOver: (E) => {
        x.resetSelectionOnOptionHover && x.store.resetSelectedOption(), p?.(E);
      },
    });
  });
bA.classes = Qn;
bA.displayName = "@mantine/core/ComboboxOption";
const EK = {},
  wA = ke((e, t) => {
    const n = ye("ComboboxOptions", EK, e),
      { classNames: r, className: i, style: o, styles: a, id: s, onMouseDown: u, labelledBy: c, ...d } = n,
      h = Mr(),
      p = mo(s);
    return (
      React.useEffect(() => {
        h.store.setListId(p);
      }, [p]),
      jsxRuntime.jsx(Se, {
        ref: t,
        ...h.getStyles("options", {
          className: i,
          style: o,
          classNames: r,
          styles: a,
        }),
        ...d,
        id: p,
        role: "listbox",
        "aria-labelledby": c,
        onMouseDown: (v) => {
          v.preventDefault(), u?.(v);
        },
      })
    );
  });
wA.classes = Qn;
wA.displayName = "@mantine/core/ComboboxOptions";
const TK = {
    withAriaAttributes: !0,
    withKeyboardNavigation: !0,
  },
  xA = ke((e, t) => {
    const n = ye("ComboboxSearch", TK, e),
      {
        classNames: r,
        styles: i,
        unstyled: o,
        vars: a,
        withAriaAttributes: s,
        onKeyDown: u,
        withKeyboardNavigation: c,
        size: d,
        ...h
      } = n,
      p = Mr(),
      v = p.getStyles("search"),
      b = mA({
        targetType: "input",
        withAriaAttributes: s,
        withKeyboardNavigation: c,
        withExpandedAttribute: !1,
        onKeyDown: u,
        autoComplete: "off",
      });
    return jsxRuntime.jsx(un, {
      ref: bn(t, p.store.searchRef),
      classNames: [
        {
          input: v.className,
        },
        r,
      ],
      styles: [
        {
          input: v.style,
        },
        i,
      ],
      size: d || p.size,
      ...b,
      ...h,
      __staticSelector: "Combobox",
    });
  });
xA.classes = Qn;
xA.displayName = "@mantine/core/ComboboxSearch";
const CK = {
    refProp: "ref",
    targetType: "input",
    withKeyboardNavigation: !0,
    withAriaAttributes: !0,
    withExpandedAttribute: !1,
    autoComplete: "off",
  },
  T5 = ke((e, t) => {
    const {
      children: n,
      refProp: r,
      withKeyboardNavigation: i,
      withAriaAttributes: o,
      withExpandedAttribute: a,
      targetType: s,
      autoComplete: u,
      ...c
    } = ye("ComboboxTarget", CK, e);
    if (!vs(n))
      throw new Error(
        "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const d = Mr(),
      h = mA({
        targetType: s,
        withAriaAttributes: o,
        withKeyboardNavigation: i,
        withExpandedAttribute: a,
        onKeyDown: n.props.onKeyDown,
        autoComplete: u,
      }),
      p = React.cloneElement(n, {
        ...h,
        ...c,
      });
    return jsxRuntime.jsx(ha.Target, {
      ref: bn(t, d.store.targetRef),
      children: p,
    });
  });
T5.displayName = "@mantine/core/ComboboxTarget";
function kK(e, t, n) {
  for (let r = e - 1; r >= 0; r -= 1) if (!t[r].hasAttribute("data-combobox-disabled")) return r;
  if (n) {
    for (let r = t.length - 1; r > -1; r -= 1) if (!t[r].hasAttribute("data-combobox-disabled")) return r;
  }
  return e;
}
function jK(e, t, n) {
  for (let r = e + 1; r < t.length; r += 1) if (!t[r].hasAttribute("data-combobox-disabled")) return r;
  if (n) {
    for (let r = 0; r < t.length; r += 1) if (!t[r].hasAttribute("data-combobox-disabled")) return r;
  }
  return e;
}
function RK(e) {
  for (let t = 0; t < e.length; t += 1) if (!e[t].hasAttribute("data-combobox-disabled")) return t;
  return -1;
}
function C5({
  defaultOpened: e,
  opened: t,
  onOpenedChange: n,
  onDropdownClose: r,
  onDropdownOpen: i,
  loop: o = !0,
  scrollBehavior: a = "instant",
} = {}) {
  const [s, u] = Pi({
      value: t,
      defaultValue: e,
      finalValue: !1,
      onChange: n,
    }),
    c = React.useRef(null),
    d = React.useRef(-1),
    h = React.useRef(null),
    p = React.useRef(null),
    v = React.useRef(-1),
    b = React.useRef(-1),
    y = React.useRef(-1),
    w = React.useCallback(
      (B = "unknown") => {
        s || (u(!0), i?.(B));
      },
      [u, i, s],
    ),
    x = React.useCallback(
      (B = "unknown") => {
        s && (u(!1), r?.(B));
      },
      [u, r, s],
    ),
    S = React.useCallback(
      (B = "unknown") => {
        s ? x(B) : w(B);
      },
      [x, w, s],
    ),
    _ = React.useCallback(() => {
      const B = document.querySelector(`#${c.current} [data-combobox-selected]`);
      B?.removeAttribute("data-combobox-selected"), B?.removeAttribute("aria-selected");
    }, []),
    E = React.useCallback(
      (B) => {
        const L = document.getElementById(c.current)?.querySelectorAll("[data-combobox-option]");
        if (!L) return null;
        const W = B >= L.length ? 0 : B < 0 ? L.length - 1 : B;
        return (
          (d.current = W),
          L?.[W] && !L[W].hasAttribute("data-combobox-disabled")
            ? (_(),
              L[W].setAttribute("data-combobox-selected", "true"),
              L[W].setAttribute("aria-selected", "true"),
              L[W].scrollIntoView({
                block: "nearest",
                behavior: a,
              }),
              L[W].id)
            : null
        );
      },
      [a, _],
    ),
    P = React.useCallback(() => {
      const B = document.querySelector(`#${c.current} [data-combobox-active]`);
      if (B) {
        const F = document.querySelectorAll(`#${c.current} [data-combobox-option]`),
          L = Array.from(F).findIndex((W) => W === B);
        return E(L);
      }
      return E(0);
    }, [E]),
    O = React.useCallback(
      () => E(jK(d.current, document.querySelectorAll(`#${c.current} [data-combobox-option]`), o)),
      [E, o],
    ),
    k = React.useCallback(
      () => E(kK(d.current, document.querySelectorAll(`#${c.current} [data-combobox-option]`), o)),
      [E, o],
    ),
    R = React.useCallback(() => E(RK(document.querySelectorAll(`#${c.current} [data-combobox-option]`))), [E]),
    M = React.useCallback((B = "selected", F) => {
      y.current = window.setTimeout(() => {
        const L = document.querySelectorAll(`#${c.current} [data-combobox-option]`),
          W = Array.from(L).findIndex((G) => G.hasAttribute(`data-combobox-${B}`));
        (d.current = W),
          F?.scrollIntoView &&
            L[W]?.scrollIntoView({
              block: "nearest",
              behavior: a,
            });
      }, 0);
    }, []),
    D = React.useCallback(() => {
      (d.current = -1), _();
    }, [_]),
    I = React.useCallback(() => {
      document.querySelectorAll(`#${c.current} [data-combobox-option]`)?.[d.current]?.click();
    }, []),
    V = React.useCallback((B) => {
      c.current = B;
    }, []),
    z = React.useCallback(() => {
      v.current = window.setTimeout(() => h.current.focus(), 0);
    }, []),
    q = React.useCallback(() => {
      b.current = window.setTimeout(() => p.current.focus(), 0);
    }, []),
    U = React.useCallback(() => d.current, []);
  return (
    React.useEffect(
      () => () => {
        window.clearTimeout(v.current), window.clearTimeout(b.current), window.clearTimeout(y.current);
      },
      [],
    ),
    {
      dropdownOpened: s,
      openDropdown: w,
      closeDropdown: x,
      toggleDropdown: S,
      selectedOptionIndex: d.current,
      getSelectedOptionIndex: U,
      selectOption: E,
      selectFirstOption: R,
      selectActiveOption: P,
      selectNextOption: O,
      selectPreviousOption: k,
      resetSelectedOption: D,
      updateSelectedOptionIndex: M,
      listId: c.current,
      setListId: V,
      clickSelectedOption: I,
      searchRef: h,
      focusSearchInput: z,
      targetRef: p,
      focusTarget: q,
    }
  );
}
const MK = {
    keepMounted: !0,
    withinPortal: !0,
    resetSelectionOnOptionHover: !1,
    width: "target",
    transitionProps: {
      transition: "fade",
      duration: 0,
    },
  },
  NK = (e, { size: t, dropdownPadding: n }) => ({
    options: {
      "--combobox-option-fz": yn(t),
      "--combobox-option-padding": dt(t, "combobox-option-padding"),
    },
    dropdown: {
      "--combobox-padding": n === void 0 ? void 0 : oe(n),
      "--combobox-option-fz": yn(t),
      "--combobox-option-padding": dt(t, "combobox-option-padding"),
    },
  });
function mt(e) {
  const t = ye("Combobox", MK, e),
    {
      classNames: n,
      styles: r,
      unstyled: i,
      children: o,
      store: a,
      vars: s,
      onOptionSubmit: u,
      onClose: c,
      size: d,
      dropdownPadding: h,
      resetSelectionOnOptionHover: p,
      __staticSelector: v,
      readOnly: b,
      ...y
    } = t,
    w = C5(),
    x = a || w,
    S = et({
      name: v || "Combobox",
      classes: Qn,
      props: t,
      classNames: n,
      styles: r,
      unstyled: i,
      vars: s,
      varsResolver: NK,
    }),
    _ = () => {
      c?.(), x.closeDropdown();
    };
  return jsxRuntime.jsx(gK, {
    value: {
      getStyles: S,
      store: x,
      onOptionSubmit: u,
      size: d,
      resetSelectionOnOptionHover: p,
      readOnly: b,
    },
    children: jsxRuntime.jsx(ha, {
      opened: x.dropdownOpened,
      ...y,
      onChange: (E) => !E && _(),
      withRoles: !1,
      unstyled: i,
      children: o,
    }),
  });
}
const IK = (e) => e;
mt.extend = IK;
mt.classes = Qn;
mt.displayName = "@mantine/core/Combobox";
mt.Target = T5;
mt.Dropdown = hA;
mt.Options = wA;
mt.Option = bA;
mt.Search = xA;
mt.Empty = pA;
mt.Chevron = dA;
mt.Footer = vA;
mt.Header = gA;
mt.EventsTarget = O5;
mt.DropdownTarget = A5;
mt.Group = yA;
mt.ClearButton = P5;
mt.HiddenInput = E5;
var k5 = {
  root: "m_5f75b09e",
  body: "m_5f6e695e",
  labelWrapper: "m_d3ea56bb",
  label: "m_8ee546b8",
  description: "m_328f68c0",
  error: "m_8e8a99cc",
};
const DK = k5,
  j5 = React.forwardRef(
    (
      {
        __staticSelector: e,
        __stylesApiProps: t,
        className: n,
        classNames: r,
        styles: i,
        unstyled: o,
        children: a,
        label: s,
        description: u,
        id: c,
        disabled: d,
        error: h,
        size: p,
        labelPosition: v = "left",
        bodyElement: b = "div",
        labelElement: y = "label",
        variant: w,
        style: x,
        vars: S,
        mod: _,
        ...E
      },
      P,
    ) => {
      const O = et({
        name: e,
        props: t,
        className: n,
        style: x,
        classes: k5,
        classNames: r,
        styles: i,
        unstyled: o,
      });
      return jsxRuntime.jsx(Se, {
        ...O("root"),
        ref: P,
        __vars: {
          "--label-fz": yn(p),
          "--label-lh": dt(p, "label-lh"),
        },
        mod: [
          {
            "label-position": v,
          },
          _,
        ],
        variant: w,
        size: p,
        ...E,
        children: jsxRuntime.jsxs(Se, {
          component: b,
          htmlFor: b === "label" ? c : void 0,
          ...O("body"),
          children: [
            a,
            jsxRuntime.jsxs("div", {
              ...O("labelWrapper"),
              "data-disabled": d || void 0,
              children: [
                s &&
                  jsxRuntime.jsx(Se, {
                    component: y,
                    htmlFor: y === "label" ? c : void 0,
                    ...O("label"),
                    "data-disabled": d || void 0,
                    children: s,
                  }),
                u &&
                  jsxRuntime.jsx(un.Description, {
                    size: p,
                    __inheritStyles: !1,
                    ...O("description"),
                    children: u,
                  }),
                h &&
                  typeof h != "boolean" &&
                  jsxRuntime.jsx(un.Error, {
                    size: p,
                    __inheritStyles: !1,
                    ...O("error"),
                    children: h,
                  }),
              ],
            }),
          ],
        }),
      });
    },
  );
j5.displayName = "@mantine/core/InlineInput";
function $K({ children: e, role: t }) {
  const n = rd();
  return n
    ? jsxRuntime.jsx("div", {
        role: t,
        "aria-labelledby": n.labelId,
        "aria-describedby": n.describedBy,
        children: e,
      })
    : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: e,
      });
}
function LK({ size: e, style: t, ...n }) {
  const r =
    e !== void 0
      ? {
          width: oe(e),
          height: oe(e),
          ...t,
        }
      : t;
  return jsxRuntime.jsx("svg", {
    viewBox: "0 0 10 7",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: r,
    "aria-hidden": !0,
    ...n,
    children: jsxRuntime.jsx("path", {
      d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
}
function Jc(e) {
  return "group" in e;
}
function R5({ options: e, search: t, limit: n }) {
  const r = t.trim().toLowerCase(),
    i = [];
  for (let o = 0; o < e.length; o += 1) {
    const a = e[o];
    if (i.length === n) return i;
    Jc(a) &&
      i.push({
        group: a.group,
        items: R5({
          options: a.items,
          search: t,
          limit: n - i.length,
        }),
      }),
      Jc(a) || (a.label.toLowerCase().includes(r) && i.push(a));
  }
  return i;
}
function BK(e) {
  if (e.length === 0) return !0;
  for (const t of e) if (!("group" in t) || t.items.length > 0) return !1;
  return !0;
}
function M5(e, t = new Set()) {
  if (Array.isArray(e))
    for (const n of e)
      if (Jc(n)) M5(n.items, t);
      else {
        if (typeof n.value > "u") throw new Error("[@mantine/core] Each option must have value property");
        if (typeof n.value != "string")
          throw new Error(
            `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof n.value}`,
          );
        if (t.has(n.value))
          throw new Error(
            `[@mantine/core] Duplicate options are not supported. Option with value "${n.value}" was provided more than once`,
          );
        t.add(n.value);
      }
}
function FK(e, t) {
  return Array.isArray(e) ? e.includes(t) : e === t;
}
function N5({ data: e, withCheckIcon: t, value: n, checkIconPosition: r, unstyled: i, renderOption: o }) {
  if (!Jc(e)) {
    const s = FK(n, e.value),
      u =
        t &&
        s &&
        jsxRuntime.jsx(LK, {
          className: Qn.optionsDropdownCheckIcon,
        }),
      c = jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
          r === "left" && u,
          jsxRuntime.jsx("span", {
            children: e.label,
          }),
          r === "right" && u,
        ],
      });
    return jsxRuntime.jsx(mt.Option, {
      value: e.value,
      disabled: e.disabled,
      className: We({
        [Qn.optionsDropdownOption]: !i,
      }),
      "data-reverse": r === "right" || void 0,
      "data-checked": s || void 0,
      "aria-selected": s,
      active: s,
      children:
        typeof o == "function"
          ? o({
              option: e,
              checked: s,
            })
          : c,
    });
  }
  const a = e.items.map((s) =>
    jsxRuntime.jsx(
      N5,
      {
        data: s,
        value: n,
        unstyled: i,
        withCheckIcon: t,
        checkIconPosition: r,
        renderOption: o,
      },
      s.value,
    ),
  );
  return jsxRuntime.jsx(mt.Group, {
    label: e.group,
    children: a,
  });
}
function VK({
  data: e,
  hidden: t,
  hiddenWhenEmpty: n,
  filter: r,
  search: i,
  limit: o,
  maxDropdownHeight: a,
  withScrollArea: s = !0,
  filterOptions: u = !0,
  withCheckIcon: c = !1,
  value: d,
  checkIconPosition: h,
  nothingFoundMessage: p,
  unstyled: v,
  labelId: b,
  renderOption: y,
  scrollAreaProps: w,
  "aria-label": x,
}) {
  M5(e);
  const _ =
      typeof i == "string"
        ? (r || R5)({
            options: e,
            search: u ? i : "",
            limit: o ?? 1 / 0,
          })
        : e,
    E = BK(_),
    P = _.map((O) =>
      jsxRuntime.jsx(
        N5,
        {
          data: O,
          withCheckIcon: c,
          value: d,
          checkIconPosition: h,
          unstyled: v,
          renderOption: y,
        },
        Jc(O) ? O.group : O.value,
      ),
    );
  return jsxRuntime.jsx(mt.Dropdown, {
    hidden: t || (n && E),
    "data-composed": !0,
    children: jsxRuntime.jsxs(mt.Options, {
      labelledBy: b,
      "aria-label": x,
      children: [
        s
          ? jsxRuntime.jsx(oo.Autosize, {
              mah: a ?? 220,
              type: "scroll",
              scrollbarSize: "var(--combobox-padding)",
              offsetScrollbars: "y",
              ...w,
              children: P,
            })
          : P,
        E &&
          p &&
          jsxRuntime.jsx(mt.Empty, {
            children: p,
          }),
      ],
    }),
  });
}
var fu = {
  root: "m_77c9d27d",
  inner: "m_80f1301b",
  label: "m_811560b9",
  section: "m_a74036a",
  loader: "m_a25b86ee",
  group: "m_80d6d844",
  groupSection: "m_70be2a01",
};
const sj = {
    orientation: "horizontal",
  },
  zK = (e, { borderWidth: t }) => ({
    group: {
      "--button-border-width": oe(t),
    },
  }),
  SA = ke((e, t) => {
    const n = ye("ButtonGroup", sj, e),
      {
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        orientation: u,
        vars: c,
        borderWidth: d,
        variant: h,
        mod: p,
        ...v
      } = ye("ButtonGroup", sj, e),
      b = et({
        name: "ButtonGroup",
        props: n,
        classes: fu,
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: c,
        varsResolver: zK,
        rootSelector: "group",
      });
    return jsxRuntime.jsx(Se, {
      ...b("group"),
      ref: t,
      variant: h,
      mod: [
        {
          "data-orientation": u,
        },
        p,
      ],
      role: "group",
      ...v,
    });
  });
SA.classes = fu;
SA.displayName = "@mantine/core/ButtonGroup";
const lj = {},
  qK = (e, { radius: t, color: n, gradient: r, variant: i, autoContrast: o, size: a }) => {
    const s = e.variantColorResolver({
      color: n || e.primaryColor,
      theme: e,
      gradient: r,
      variant: i || "filled",
      autoContrast: o,
    });
    return {
      groupSection: {
        "--section-height": dt(a, "section-height"),
        "--section-padding-x": dt(a, "section-padding-x"),
        "--section-fz": a?.includes("compact") ? yn(a.replace("compact-", "")) : yn(a),
        "--section-radius": t === void 0 ? void 0 : gn(t),
        "--section-bg": n || i ? s.background : void 0,
        "--section-color": s.color,
        "--section-bd": n || i ? s.border : void 0,
      },
    };
  },
  _A = ke((e, t) => {
    const n = ye("ButtonGroupSection", lj, e),
      {
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: u,
        variant: c,
        gradient: d,
        radius: h,
        autoContrast: p,
        ...v
      } = ye("ButtonGroupSection", lj, e),
      b = et({
        name: "ButtonGroupSection",
        props: n,
        classes: fu,
        className: r,
        style: i,
        classNames: o,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: qK,
        rootSelector: "groupSection",
      });
    return jsxRuntime.jsx(Se, {
      ...b("groupSection"),
      ref: t,
      variant: c,
      ...v,
    });
  });
_A.classes = fu;
_A.displayName = "@mantine/core/ButtonGroupSection";
const WK = {
    in: {
      opacity: 1,
      transform: `translate(-50%, calc(-50% + ${oe(1)}))`,
    },
    out: {
      opacity: 0,
      transform: "translate(-50%, -200%)",
    },
    common: {
      transformOrigin: "center",
    },
    transitionProperty: "transform, opacity",
  },
  UK = {},
  HK = (e, { radius: t, color: n, gradient: r, variant: i, size: o, justify: a, autoContrast: s }) => {
    const u = e.variantColorResolver({
      color: n || e.primaryColor,
      theme: e,
      gradient: r,
      variant: i || "filled",
      autoContrast: s,
    });
    return {
      root: {
        "--button-justify": a,
        "--button-height": dt(o, "button-height"),
        "--button-padding-x": dt(o, "button-padding-x"),
        "--button-fz": o?.includes("compact") ? yn(o.replace("compact-", "")) : yn(o),
        "--button-radius": t === void 0 ? void 0 : gn(t),
        "--button-bg": n || i ? u.background : void 0,
        "--button-hover": n || i ? u.hover : void 0,
        "--button-color": u.color,
        "--button-bd": n || i ? u.border : void 0,
        "--button-hover-color": n || i ? u.hoverColor : void 0,
      },
    };
  },
  Button = vo((e, t) => {
    const n = ye("Button", UK, e),
      {
        style: r,
        vars: i,
        className: o,
        color: a,
        disabled: s,
        children: u,
        leftSection: c,
        rightSection: d,
        fullWidth: h,
        variant: p,
        radius: v,
        loading: b,
        loaderProps: y,
        gradient: w,
        classNames: x,
        styles: S,
        unstyled: _,
        "data-disabled": E,
        autoContrast: P,
        mod: O,
        ...k
      } = n,
      R = et({
        name: "Button",
        props: n,
        classes: fu,
        className: o,
        style: r,
        classNames: x,
        styles: S,
        unstyled: _,
        vars: i,
        varsResolver: HK,
      }),
      M = !!c,
      D = !!d;
    return jsxRuntime.jsxs(ao, {
      ref: t,
      ...R("root", {
        active: !s && !b && !E,
      }),
      unstyled: _,
      variant: p,
      disabled: s || b,
      mod: [
        {
          disabled: s || E,
          loading: b,
          block: h,
          "with-left-section": M,
          "with-right-section": D,
        },
        O,
      ],
      ...k,
      children: [
        jsxRuntime.jsx(yo, {
          mounted: !!b,
          transition: WK,
          duration: 150,
          children: (I) =>
            jsxRuntime.jsx(Se, {
              component: "span",
              ...R("loader", {
                style: I,
              }),
              "aria-hidden": !0,
              children: jsxRuntime.jsx(nd, {
                color: "var(--button-color)",
                size: "calc(var(--button-height) / 1.8)",
                ...y,
              }),
            }),
        }),
        jsxRuntime.jsxs("span", {
          ...R("inner"),
          children: [
            c &&
              jsxRuntime.jsx(Se, {
                component: "span",
                ...R("section"),
                mod: {
                  position: "left",
                },
                children: c,
              }),
            jsxRuntime.jsx(Se, {
              component: "span",
              mod: {
                loading: b,
              },
              ...R("label"),
              children: u,
            }),
            d &&
              jsxRuntime.jsx(Se, {
                component: "span",
                ...R("section"),
                mod: {
                  position: "right",
                },
                children: d,
              }),
          ],
        }),
      ],
    });
  });
Button.classes = fu;
Button.displayName = "@mantine/core/Button";
Button.Group = SA;
Button.GroupSection = _A;
var I5 = {
  root: "m_b183c0a2",
};
const KK = {},
  GK = (e, { color: t }) => ({
    root: {
      "--code-bg": t ? Vn(t, e) : void 0,
    },
  }),
  PA = ke((e, t) => {
    const n = ye("Code", KK, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        color: c,
        block: d,
        variant: h,
        mod: p,
        ...v
      } = n,
      b = et({
        name: "Code",
        props: n,
        classes: I5,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: GK,
      });
    return jsxRuntime.jsx(Se, {
      component: d ? "pre" : "code",
      variant: h,
      ref: t,
      mod: [
        {
          block: d,
        },
        p,
      ],
      ...b("root"),
      ...v,
      dir: "ltr",
    });
  });
PA.classes = I5;
PA.displayName = "@mantine/core/Code";
const YK = {
    multiple: !1,
  },
  D5 = React.forwardRef((e, t) => {
    const {
        onChange: n,
        children: r,
        multiple: i,
        accept: o,
        name: a,
        form: s,
        resetRef: u,
        disabled: c,
        capture: d,
        inputProps: h,
        ...p
      } = ye("FileButton", YK, e),
      v = React.useRef(null),
      b = () => {
        !c && v.current?.click();
      },
      y = (x) => {
        n(i ? Array.from(x.currentTarget.files) : x.currentTarget.files[0] || null);
      };
    return (
      Xc(u, () => {
        v.current && (v.current.value = "");
      }),
      jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
          jsxRuntime.jsx("input", {
            style: {
              display: "none",
            },
            type: "file",
            accept: o,
            multiple: i,
            onChange: y,
            ref: bn(t, v),
            name: a,
            form: s,
            capture: d,
            ...h,
          }),
          r({
            onClick: b,
            ...p,
          }),
        ],
      })
    );
  });
D5.displayName = "@mantine/core/FileButton";
const [XK, ZK] = kr("List component was not found in tree");
var AA = {
  root: "m_abbac491",
  item: "m_abb6bec2",
  itemWrapper: "m_75cd9f71",
  itemIcon: "m_60f83e5b",
};
const QK = {},
  OA = ke((e, t) => {
    const n = ye("ListItem", QK, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, icon: u, children: c, mod: d, ...h } = n,
      p = ZK(),
      v = u || p.icon,
      b = {
        classNames: r,
        styles: a,
      };
    return jsxRuntime.jsx(Se, {
      ...p.getStyles("item", {
        ...b,
        className: i,
        style: o,
      }),
      component: "li",
      mod: [
        {
          "with-icon": !!v,
          centered: p.center,
        },
        d,
      ],
      ref: t,
      ...h,
      children: jsxRuntime.jsxs("div", {
        ...p.getStyles("itemWrapper", b),
        children: [
          v &&
            jsxRuntime.jsx("span", {
              ...p.getStyles("itemIcon", b),
              children: v,
            }),
          jsxRuntime.jsx("span", {
            ...p.getStyles("itemLabel", b),
            children: c,
          }),
        ],
      }),
    });
  });
OA.classes = AA;
OA.displayName = "@mantine/core/ListItem";
const JK = {
    type: "unordered",
  },
  eG = (e, { size: t, spacing: n }) => ({
    root: {
      "--list-fz": yn(t),
      "--list-lh": eL(t),
      "--list-spacing": ls(n),
    },
  }),
  Ha = ke((e, t) => {
    const n = ye("List", JK, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        children: c,
        type: d,
        withPadding: h,
        icon: p,
        spacing: v,
        center: b,
        listStyleType: y,
        mod: w,
        ...x
      } = n,
      S = et({
        name: "List",
        classes: AA,
        props: n,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: eG,
      });
    return jsxRuntime.jsx(XK, {
      value: {
        center: b,
        icon: p,
        getStyles: S,
      },
      children: jsxRuntime.jsx(Se, {
        ...S("root", {
          style: {
            listStyleType: y,
          },
        }),
        component: d === "unordered" ? "ul" : "ol",
        mod: [
          {
            "with-padding": h,
          },
          w,
        ],
        ref: t,
        ...x,
        children: c,
      }),
    });
  });
Ha.classes = AA;
Ha.displayName = "@mantine/core/List";
Ha.Item = OA;
const [tG, du] = kr("Modal component was not found in tree");
var bo = {
  root: "m_9df02822",
  content: "m_54c44539",
  inner: "m_1f958f16",
  header: "m_d0e2b9cd",
};
const nG = {},
  vv = ke((e, t) => {
    const n = ye("ModalBody", nG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, ...u } = n,
      c = du();
    return jsxRuntime.jsx(h5, {
      ref: t,
      ...c.getStyles("body", {
        classNames: r,
        style: o,
        styles: a,
        className: i,
      }),
      ...u,
    });
  });
vv.classes = bo;
vv.displayName = "@mantine/core/ModalBody";
const rG = {},
  yv = ke((e, t) => {
    const n = ye("ModalCloseButton", rG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, ...u } = n,
      c = du();
    return jsxRuntime.jsx(p5, {
      ref: t,
      ...c.getStyles("close", {
        classNames: r,
        style: o,
        styles: a,
        className: i,
      }),
      ...u,
    });
  });
yv.classes = bo;
yv.displayName = "@mantine/core/ModalCloseButton";
const iG = {},
  gv = ke((e, t) => {
    const n = ye("ModalContent", iG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, children: u, __hidden: c, ...d } = n,
      h = du(),
      p = h.scrollAreaComponent || zH;
    return jsxRuntime.jsx(m5, {
      ...h.getStyles("content", {
        className: i,
        style: o,
        styles: a,
        classNames: r,
      }),
      innerProps: h.getStyles("inner", {
        className: i,
        style: o,
        styles: a,
        classNames: r,
      }),
      "data-full-screen": h.fullScreen || void 0,
      "data-modal-content": !0,
      "data-hidden": c || void 0,
      ref: t,
      ...d,
      children: jsxRuntime.jsx(p, {
        style: {
          maxHeight: h.fullScreen ? "100dvh" : `calc(100dvh - (${oe(h.yOffset)} * 2))`,
        },
        children: u,
      }),
    });
  });
gv.classes = bo;
gv.displayName = "@mantine/core/ModalContent";
const oG = {},
  bv = ke((e, t) => {
    const n = ye("ModalHeader", oG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, ...u } = n,
      c = du();
    return jsxRuntime.jsx(v5, {
      ref: t,
      ...c.getStyles("header", {
        classNames: r,
        style: o,
        styles: a,
        className: i,
      }),
      ...u,
    });
  });
bv.classes = bo;
bv.displayName = "@mantine/core/ModalHeader";
const aG = {},
  wv = ke((e, t) => {
    const n = ye("ModalOverlay", aG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, ...u } = n,
      c = du();
    return jsxRuntime.jsx(y5, {
      ref: t,
      ...c.getStyles("overlay", {
        classNames: r,
        style: o,
        styles: a,
        className: i,
      }),
      ...u,
    });
  });
wv.classes = bo;
wv.displayName = "@mantine/core/ModalOverlay";
const sG = {
    __staticSelector: "Modal",
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: po("modal"),
    transitionProps: {
      duration: 200,
      transition: "fade-down",
    },
    yOffset: "5dvh",
  },
  lG = (e, { radius: t, size: n, yOffset: r, xOffset: i }) => ({
    root: {
      "--modal-radius": t === void 0 ? void 0 : gn(t),
      "--modal-size": dt(n, "modal-size"),
      "--modal-y-offset": oe(r),
      "--modal-x-offset": oe(i),
    },
  }),
  xv = ke((e, t) => {
    const n = ye("ModalRoot", sG, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        yOffset: c,
        scrollAreaComponent: d,
        radius: h,
        fullScreen: p,
        centered: v,
        xOffset: b,
        __staticSelector: y,
        ...w
      } = n,
      x = et({
        name: y,
        classes: bo,
        props: n,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: lG,
      });
    return jsxRuntime.jsx(tG, {
      value: {
        yOffset: c,
        scrollAreaComponent: d,
        getStyles: x,
        fullScreen: p,
      },
      children: jsxRuntime.jsx(d5, {
        ref: t,
        ...x("root"),
        "data-full-screen": p || void 0,
        "data-centered": v || void 0,
        "data-offset-scrollbars": d === oo.Autosize || void 0,
        unstyled: s,
        ...w,
      }),
    });
  });
xv.classes = bo;
xv.displayName = "@mantine/core/ModalRoot";
const [uG, cG] = CP();
function $5({ children: e }) {
  const [t, n] = React.useState([]),
    [r, i] = React.useState(po("modal"));
  return jsxRuntime.jsx(uG, {
    value: {
      stack: t,
      addModal: (o, a) => {
        n((s) => [...new Set([...s, o])]),
          i((s) => (typeof a == "number" && typeof s == "number" ? Math.max(s, a) : s));
      },
      removeModal: (o) => n((a) => a.filter((s) => s !== o)),
      getZIndex: (o) => `calc(${r} + ${t.indexOf(o)} + 1)`,
      currentId: t[t.length - 1],
      maxZIndex: r,
    },
    children: e,
  });
}
$5.displayName = "@mantine/core/ModalStack";
const fG = {},
  Sv = ke((e, t) => {
    const n = ye("ModalTitle", fG, e),
      { classNames: r, className: i, style: o, styles: a, vars: s, ...u } = n,
      c = du();
    return jsxRuntime.jsx(g5, {
      ref: t,
      ...c.getStyles("title", {
        classNames: r,
        style: o,
        styles: a,
        className: i,
      }),
      ...u,
    });
  });
Sv.classes = bo;
Sv.displayName = "@mantine/core/ModalTitle";
const dG = {
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: po("modal"),
    transitionProps: {
      duration: 200,
      transition: "fade-down",
    },
    withOverlay: !0,
    withCloseButton: !0,
  },
  Modal = ke((e, t) => {
    const {
        title: n,
        withOverlay: r,
        overlayProps: i,
        withCloseButton: o,
        closeButtonProps: a,
        children: s,
        radius: u,
        opened: c,
        stackId: d,
        zIndex: h,
        ...p
      } = ye("Modal", dG, e),
      v = cG(),
      b = !!n || o,
      y =
        v && d
          ? {
              closeOnEscape: v.currentId === d,
              trapFocus: v.currentId === d,
              zIndex: v.getZIndex(d),
            }
          : {},
      w = r === !1 ? !1 : d && v ? v.currentId === d : c;
    return (
      React.useEffect(() => {
        v && d && (c ? v.addModal(d, h || po("modal")) : v.removeModal(d));
      }, [c, d, h]),
      jsxRuntime.jsxs(xv, {
        ref: t,
        radius: u,
        opened: c,
        zIndex: v && d ? v.getZIndex(d) : h,
        ...p,
        ...y,
        children: [
          r &&
            jsxRuntime.jsx(wv, {
              visible: w,
              transitionProps:
                v && d
                  ? {
                      duration: 0,
                    }
                  : void 0,
              ...i,
            }),
          jsxRuntime.jsxs(gv, {
            radius: u,
            __hidden: v && d && c ? d !== v.currentId : !1,
            children: [
              b &&
                jsxRuntime.jsxs(bv, {
                  children: [
                    n &&
                      jsxRuntime.jsx(Sv, {
                        children: n,
                      }),
                    o &&
                      jsxRuntime.jsx(yv, {
                        ...a,
                      }),
                  ],
                }),
              jsxRuntime.jsx(vv, {
                children: s,
              }),
            ],
          }),
        ],
      })
    );
  });
Modal.classes = bo;
Modal.displayName = "@mantine/core/Modal";
Modal.Root = xv;
Modal.Overlay = wv;
Modal.Content = gv;
Modal.Body = vv;
Modal.Header = bv;
Modal.Title = Sv;
Modal.CloseButton = yv;
Modal.Stack = $5;
