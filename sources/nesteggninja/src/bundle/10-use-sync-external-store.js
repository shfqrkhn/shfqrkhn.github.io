var k0 = {
    exports: {},
  },
  j0 = {},
  R0 = {
    exports: {},
  },
  M0 = {};
var wj;
function MY() {
  if (wj) return M0;
  wj = 1;
  var e = Qf();
  function t(h, p) {
    return (h === p && (h !== 0 || 1 / h === 1 / p)) || (h !== h && p !== p);
  }
  var n = typeof Object.is == "function" ? Object.is : t,
    r = e.useState,
    i = e.useEffect,
    o = e.useLayoutEffect,
    a = e.useDebugValue;
  function s(h, p) {
    var v = p(),
      b = r({
        inst: {
          value: v,
          getSnapshot: p,
        },
      }),
      y = b[0].inst,
      w = b[1];
    return (
      o(
        function () {
          (y.value = v),
            (y.getSnapshot = p),
            u(y) &&
              w({
                inst: y,
              });
        },
        [h, v, p],
      ),
      i(
        function () {
          return (
            u(y) &&
              w({
                inst: y,
              }),
            h(function () {
              u(y) &&
                w({
                  inst: y,
                });
            })
          );
        },
        [h],
      ),
      a(v),
      v
    );
  }
  function u(h) {
    var p = h.getSnapshot;
    h = h.value;
    try {
      var v = p();
      return !n(h, v);
    } catch {
      return !0;
    }
  }
  function c(h, p) {
    return p();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? c : s;
  return (M0.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d), M0;
}
var xj;
function NY() {
  return xj || ((xj = 1), (R0.exports = MY())), R0.exports;
}
var Sj;
function IY() {
  if (Sj) return j0;
  Sj = 1;
  var e = Qf(),
    t = NY();
  function n(c, d) {
    return (c === d && (c !== 0 || 1 / c === 1 / d)) || (c !== c && d !== d);
  }
  var r = typeof Object.is == "function" ? Object.is : n,
    i = t.useSyncExternalStore,
    o = e.useRef,
    a = e.useEffect,
    s = e.useMemo,
    u = e.useDebugValue;
  return (
    (j0.useSyncExternalStoreWithSelector = function (c, d, h, p, v) {
      var b = o(null);
      if (b.current === null) {
        var y = {
          hasValue: !1,
          value: null,
        };
        b.current = y;
      } else y = b.current;
      b = s(
        function () {
          function x(O) {
            if (!S) {
              if (((S = !0), (_ = O), (O = p(O)), v !== void 0 && y.hasValue)) {
                var k = y.value;
                if (v(k, O)) return (E = k);
              }
              return (E = O);
            }
            if (((k = E), r(_, O))) return k;
            var R = p(O);
            return v !== void 0 && v(k, R) ? ((_ = O), k) : ((_ = O), (E = R));
          }
          var S = !1,
            _,
            E,
            P = h === void 0 ? null : h;
          return [
            function () {
              return x(d());
            },
            P === null
              ? void 0
              : function () {
                  return x(P());
                },
          ];
        },
        [d, h, p, v],
      );
      var w = i(c, b[0], b[1]);
      return (
        a(
          function () {
            (y.hasValue = !0), (y.value = w);
          },
          [w],
        ),
        u(w),
        w
      );
    }),
    j0
  );
}
var _j;
function DY() {
  return _j || ((_j = 1), (k0.exports = IY())), k0.exports;
}
var $Y = DY();
