var di = function () {
  return (
    (di =
      Object.assign ||
      function (t) {
        for (var n, r = 1, i = arguments.length; r < i; r++) {
          n = arguments[r];
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }),
    di.apply(this, arguments)
  );
};
function q3(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function Wz(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, o; r < i; r++)
      (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
  return e.concat(o || Array.prototype.slice.call(t));
}
var lp = "right-scroll-bar-position",
  up = "width-before-scroll-bar",
  Uz = "with-scroll-bars-hidden",
  Hz = "--removed-body-scroll-bar-size";
function s0(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Kz(e, t) {
  var n = React.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var i = n.value;
          i !== r && ((n.value = r), n.callback(r, i));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
var Gz = typeof window < "u" ? React.useLayoutEffect : React.useEffect,
  bk = new WeakMap();
function Yz(e, t) {
  var n = Kz(null, function (r) {
    return e.forEach(function (i) {
      return s0(i, r);
    });
  });
  return (
    Gz(
      function () {
        var r = bk.get(n);
        if (r) {
          var i = new Set(r),
            o = new Set(e),
            a = n.current;
          i.forEach(function (s) {
            o.has(s) || s0(s, null);
          }),
            o.forEach(function (s) {
              i.has(s) || s0(s, a);
            });
        }
        bk.set(n, e);
      },
      [e],
    ),
    n
  );
}
function Xz(e) {
  return e;
}
function Zz(e, t) {
  t === void 0 && (t = Xz);
  var n = [],
    r = !1,
    i = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (o) {
        var a = t(o, r);
        return (
          n.push(a),
          function () {
            n = n.filter(function (s) {
              return s !== a;
            });
          }
        );
      },
      assignSyncMedium: function (o) {
        for (r = !0; n.length; ) {
          var a = n;
          (n = []), a.forEach(o);
        }
        n = {
          push: function (s) {
            return o(s);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (o) {
        r = !0;
        var a = [];
        if (n.length) {
          var s = n;
          (n = []), s.forEach(o), (a = n);
        }
        var u = function () {
            var d = a;
            (a = []), d.forEach(o);
          },
          c = function () {
            return Promise.resolve().then(u);
          };
        c(),
          (n = {
            push: function (d) {
              a.push(d), c();
            },
            filter: function (d) {
              return (a = a.filter(d)), n;
            },
          });
      },
    };
  return i;
}
function Qz(e) {
  e === void 0 && (e = {});
  var t = Zz(null);
  return (
    (t.options = di(
      {
        async: !0,
        ssr: !1,
      },
      e,
    )),
    t
  );
}
var W3 = function (e) {
  var t = e.sideCar,
    n = q3(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return React.createElement(r, di({}, n));
};
W3.isSideCarExport = !0;
function Jz(e, t) {
  return e.useMedium(t), W3;
}
var U3 = Qz(),
  l0 = function () {},
  Xm = React.forwardRef(function (e, t) {
    var n = React.useRef(null),
      r = React.useState({
        onScrollCapture: l0,
        onWheelCapture: l0,
        onTouchMoveCapture: l0,
      }),
      i = r[0],
      o = r[1],
      a = e.forwardProps,
      s = e.children,
      u = e.className,
      c = e.removeScrollBar,
      d = e.enabled,
      h = e.shards,
      p = e.sideCar,
      v = e.noRelative,
      b = e.noIsolation,
      y = e.inert,
      w = e.allowPinchZoom,
      x = e.as,
      S = x === void 0 ? "div" : x,
      _ = e.gapMode,
      E = q3(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      P = p,
      O = Yz([n, t]),
      k = di(di({}, E), i);
    return React.createElement(
      React.Fragment,
      null,
      d &&
        React.createElement(P, {
          sideCar: U3,
          removeScrollBar: c,
          shards: h,
          noRelative: v,
          noIsolation: b,
          inert: y,
          setCallbacks: o,
          allowPinchZoom: !!w,
          lockRef: n,
          gapMode: _,
        }),
      a
        ? React.cloneElement(
            React.Children.only(s),
            di(di({}, k), {
              ref: O,
            }),
          )
        : React.createElement(
            S,
            di({}, k, {
              className: u,
              ref: O,
            }),
            s,
          ),
    );
  });
Xm.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1,
};
Xm.classNames = {
  fullWidth: up,
  zeroRight: lp,
};
var e7 = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function t7() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = e7();
  return t && e.setAttribute("nonce", t), e;
}
function n7(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function r7(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var i7 = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = t7()) && (n7(t, n), r7(t)), e++;
      },
      remove: function () {
        e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  o7 = function () {
    var e = i7();
    return function (t, n) {
      React.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  H3 = function () {
    var e = o7(),
      t = function (n) {
        var r = n.styles,
          i = n.dynamic;
        return e(r, i), null;
      };
    return t;
  },
  a7 = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0,
  },
  u0 = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  s7 = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      i = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [u0(n), u0(r), u0(i)];
  },
  l7 = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return a7;
    var t = s7(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  u7 = H3(),
  yl = "data-scroll-locked",
  c7 = function (e, t, n, r) {
    var i = e.left,
      o = e.top,
      a = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          Uz,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          yl,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  i,
                  `px;
    padding-top: `,
                )
                .concat(
                  o,
                  `px;
    padding-right: `,
                )
                .concat(
                  a,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(s, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            n === "padding" && "padding-right: ".concat(s, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          lp,
          ` {
    right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          up,
          ` {
    margin-right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(lp, " .")
        .concat(
          lp,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(up, " .")
        .concat(
          up,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          yl,
          `] {
    `,
        )
        .concat(Hz, ": ")
        .concat(
          s,
          `px;
  }
`,
        )
    );
  },
  wk = function () {
    var e = parseInt(document.body.getAttribute(yl) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  f7 = function () {
    React.useEffect(function () {
      return (
        document.body.setAttribute(yl, (wk() + 1).toString()),
        function () {
          var e = wk() - 1;
          e <= 0 ? document.body.removeAttribute(yl) : document.body.setAttribute(yl, e.toString());
        }
      );
    }, []);
  },
  d7 = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? "margin" : r;
    f7();
    var o = React.useMemo(
      function () {
        return l7(i);
      },
      [i],
    );
    return React.createElement(u7, {
      styles: c7(o, !t, i, n ? "" : "!important"),
    });
  },
  tS = !1;
if (typeof window < "u")
  try {
    var Rh = Object.defineProperty({}, "passive", {
      get: function () {
        return (tS = !0), !0;
      },
    });
    window.addEventListener("test", Rh, Rh), window.removeEventListener("test", Rh, Rh);
  } catch {
    tS = !1;
  }
var Gs = tS
    ? {
        passive: !1,
      }
    : !1,
  h7 = function (e) {
    return e.tagName === "TEXTAREA";
  },
  K3 = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !h7(e) && n[t] === "visible");
  },
  p7 = function (e) {
    return K3(e, "overflowY");
  },
  m7 = function (e) {
    return K3(e, "overflowX");
  },
  xk = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var i = G3(e, r);
      if (i) {
        var o = Y3(e, r),
          a = o[1],
          s = o[2];
        if (a > s) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  v7 = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  y7 = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  G3 = function (e, t) {
    return e === "v" ? p7(t) : m7(t);
  },
  Y3 = function (e, t) {
    return e === "v" ? v7(t) : y7(t);
  },
  g7 = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  b7 = function (e, t, n, r, i) {
    var o = g7(e, window.getComputedStyle(t).direction),
      a = o * r,
      s = n.target,
      u = t.contains(s),
      c = !1,
      d = a > 0,
      h = 0,
      p = 0;
    do {
      if (!s) break;
      var v = Y3(e, s),
        b = v[0],
        y = v[1],
        w = v[2],
        x = y - w - o * b;
      (b || x) && G3(e, s) && ((h += x), (p += b));
      var S = s.parentNode;
      s = S && S.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? S.host : S;
    } while ((!u && s !== document.body) || (u && (t.contains(s) || t === s)));
    return ((d && Math.abs(h) < 1) || (!d && Math.abs(p) < 1)) && (c = !0), c;
  },
  Mh = function (e) {
    return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
  },
  Sk = function (e) {
    return [e.deltaX, e.deltaY];
  },
  _k = function (e) {
    return e && "current" in e ? e.current : e;
  },
  w7 = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  x7 = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  S7 = 0,
  Ys = [];
function _7(e) {
  var t = React.useRef([]),
    n = React.useRef([0, 0]),
    r = React.useRef(),
    i = React.useState(S7++)[0],
    o = React.useState(H3)[0],
    a = React.useRef(e);
  React.useEffect(
    function () {
      a.current = e;
    },
    [e],
  ),
    React.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(i));
          var y = Wz([e.lockRef.current], (e.shards || []).map(_k), !0).filter(Boolean);
          return (
            y.forEach(function (w) {
              return w.classList.add("allow-interactivity-".concat(i));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(i)),
                y.forEach(function (w) {
                  return w.classList.remove("allow-interactivity-".concat(i));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    );
  var s = React.useCallback(function (y, w) {
      if (("touches" in y && y.touches.length === 2) || (y.type === "wheel" && y.ctrlKey))
        return !a.current.allowPinchZoom;
      var x = Mh(y),
        S = n.current,
        _ = "deltaX" in y ? y.deltaX : S[0] - x[0],
        E = "deltaY" in y ? y.deltaY : S[1] - x[1],
        P,
        O = y.target,
        k = Math.abs(_) > Math.abs(E) ? "h" : "v";
      if ("touches" in y && k === "h" && O.type === "range") return !1;
      var R = window.getSelection(),
        M = R && R.anchorNode,
        D = M ? M === O || M.contains(O) : !1;
      if (D) return !1;
      var I = xk(k, O);
      if (!I) return !0;
      if ((I ? (P = k) : ((P = k === "v" ? "h" : "v"), (I = xk(k, O))), !I)) return !1;
      if ((!r.current && "changedTouches" in y && (_ || E) && (r.current = P), !P)) return !0;
      var V = r.current || P;
      return b7(V, w, y, V === "h" ? _ : E);
    }, []),
    u = React.useCallback(function (y) {
      var w = y;
      if (!(!Ys.length || Ys[Ys.length - 1] !== o)) {
        var x = "deltaY" in w ? Sk(w) : Mh(w),
          S = t.current.filter(function (P) {
            return P.name === w.type && (P.target === w.target || w.target === P.shadowParent) && w7(P.delta, x);
          })[0];
        if (S && S.should) {
          w.cancelable && w.preventDefault();
          return;
        }
        if (!S) {
          var _ = (a.current.shards || [])
              .map(_k)
              .filter(Boolean)
              .filter(function (P) {
                return P.contains(w.target);
              }),
            E = _.length > 0 ? s(w, _[0]) : !a.current.noIsolation;
          E && w.cancelable && w.preventDefault();
        }
      }
    }, []),
    c = React.useCallback(function (y, w, x, S) {
      var _ = {
        name: y,
        delta: w,
        target: x,
        should: S,
        shadowParent: P7(x),
      };
      t.current.push(_),
        setTimeout(function () {
          t.current = t.current.filter(function (E) {
            return E !== _;
          });
        }, 1);
    }, []),
    d = React.useCallback(function (y) {
      (n.current = Mh(y)), (r.current = void 0);
    }, []),
    h = React.useCallback(function (y) {
      c(y.type, Sk(y), y.target, s(y, e.lockRef.current));
    }, []),
    p = React.useCallback(function (y) {
      c(y.type, Mh(y), y.target, s(y, e.lockRef.current));
    }, []);
  React.useEffect(function () {
    return (
      Ys.push(o),
      e.setCallbacks({
        onScrollCapture: h,
        onWheelCapture: h,
        onTouchMoveCapture: p,
      }),
      document.addEventListener("wheel", u, Gs),
      document.addEventListener("touchmove", u, Gs),
      document.addEventListener("touchstart", d, Gs),
      function () {
        (Ys = Ys.filter(function (y) {
          return y !== o;
        })),
          document.removeEventListener("wheel", u, Gs),
          document.removeEventListener("touchmove", u, Gs),
          document.removeEventListener("touchstart", d, Gs);
      }
    );
  }, []);
  var v = e.removeScrollBar,
    b = e.inert;
  return React.createElement(
    React.Fragment,
    null,
    b
      ? React.createElement(o, {
          styles: x7(i),
        })
      : null,
    v
      ? React.createElement(d7, {
          noRelative: e.noRelative,
          gapMode: e.gapMode,
        })
      : null,
  );
}
function P7(e) {
  for (var t = null; e !== null; ) e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
  return t;
}
const A7 = Jz(U3, _7);
var X3 = React.forwardRef(function (e, t) {
  return React.createElement(
    Xm,
    di({}, e, {
      ref: t,
      sideCar: A7,
    }),
  );
});
X3.classNames = Xm.classNames;
