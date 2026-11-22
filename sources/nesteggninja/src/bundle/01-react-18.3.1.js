var n0 = {
    exports: {},
  },
  cc = {},
  r0 = {
    exports: {},
  },
  tt = {};
var ck;
function Nz() {
  if (ck) return tt;
  ck = 1;
  var e = Symbol.for("react.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    o = Symbol.for("react.provider"),
    a = Symbol.for("react.context"),
    s = Symbol.for("react.forward_ref"),
    u = Symbol.for("react.suspense"),
    c = Symbol.for("react.memo"),
    d = Symbol.for("react.lazy"),
    h = Symbol.iterator;
  function p($) {
    return $ === null || typeof $ != "object"
      ? null
      : (($ = (h && $[h]) || $["@@iterator"]), typeof $ == "function" ? $ : null);
  }
  var v = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    b = Object.assign,
    y = {};
  function w($, K, ne) {
    (this.props = $), (this.context = K), (this.refs = y), (this.updater = ne || v);
  }
  (w.prototype.isReactComponent = {}),
    (w.prototype.setState = function ($, K) {
      if (typeof $ != "object" && typeof $ != "function" && $ != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, $, K, "setState");
    }),
    (w.prototype.forceUpdate = function ($) {
      this.updater.enqueueForceUpdate(this, $, "forceUpdate");
    });
  function x() {}
  x.prototype = w.prototype;
  function S($, K, ne) {
    (this.props = $), (this.context = K), (this.refs = y), (this.updater = ne || v);
  }
  var _ = (S.prototype = new x());
  (_.constructor = S), b(_, w.prototype), (_.isPureReactComponent = !0);
  var E = Array.isArray,
    P = Object.prototype.hasOwnProperty,
    O = {
      current: null,
    },
    k = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0,
    };
  function R($, K, ne) {
    var he,
      le = {},
      pe = null,
      Pe = null;
    if (K != null)
      for (he in (K.ref !== void 0 && (Pe = K.ref), K.key !== void 0 && (pe = "" + K.key), K))
        P.call(K, he) && !k.hasOwnProperty(he) && (le[he] = K[he]);
    var xe = arguments.length - 2;
    if (xe === 1) le.children = ne;
    else if (1 < xe) {
      for (var re = Array(xe), ve = 0; ve < xe; ve++) re[ve] = arguments[ve + 2];
      le.children = re;
    }
    if ($ && $.defaultProps) for (he in ((xe = $.defaultProps), xe)) le[he] === void 0 && (le[he] = xe[he]);
    return {
      $$typeof: e,
      type: $,
      key: pe,
      ref: Pe,
      props: le,
      _owner: O.current,
    };
  }
  function M($, K) {
    return {
      $$typeof: e,
      type: $.type,
      key: K,
      ref: $.ref,
      props: $.props,
      _owner: $._owner,
    };
  }
  function D($) {
    return typeof $ == "object" && $ !== null && $.$$typeof === e;
  }
  function I($) {
    var K = {
      "=": "=0",
      ":": "=2",
    };
    return (
      "$" +
      $.replace(/[=:]/g, function (ne) {
        return K[ne];
      })
    );
  }
  var V = /\/+/g;
  function z($, K) {
    return typeof $ == "object" && $ !== null && $.key != null ? I("" + $.key) : K.toString(36);
  }
  function q($, K, ne, he, le) {
    var pe = typeof $;
    (pe === "undefined" || pe === "boolean") && ($ = null);
    var Pe = !1;
    if ($ === null) Pe = !0;
    else
      switch (pe) {
        case "string":
        case "number":
          Pe = !0;
          break;
        case "object":
          switch ($.$$typeof) {
            case e:
            case t:
              Pe = !0;
          }
      }
    if (Pe)
      return (
        (Pe = $),
        (le = le(Pe)),
        ($ = he === "" ? "." + z(Pe, 0) : he),
        E(le)
          ? ((ne = ""),
            $ != null && (ne = $.replace(V, "$&/") + "/"),
            q(le, K, ne, "", function (ve) {
              return ve;
            }))
          : le != null &&
            (D(le) &&
              (le = M(
                le,
                ne + (!le.key || (Pe && Pe.key === le.key) ? "" : ("" + le.key).replace(V, "$&/") + "/") + $,
              )),
            K.push(le)),
        1
      );
    if (((Pe = 0), (he = he === "" ? "." : he + ":"), E($)))
      for (var xe = 0; xe < $.length; xe++) {
        pe = $[xe];
        var re = he + z(pe, xe);
        Pe += q(pe, K, ne, re, le);
      }
    else if (((re = p($)), typeof re == "function"))
      for ($ = re.call($), xe = 0; !(pe = $.next()).done; )
        (pe = pe.value), (re = he + z(pe, xe++)), (Pe += q(pe, K, ne, re, le));
    else if (pe === "object")
      throw (
        ((K = String($)),
        Error(
          "Objects are not valid as a React child (found: " +
            (K === "[object Object]" ? "object with keys {" + Object.keys($).join(", ") + "}" : K) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return Pe;
  }
  function U($, K, ne) {
    if ($ == null) return $;
    var he = [],
      le = 0;
    return (
      q($, he, "", "", function (pe) {
        return K.call(ne, pe, le++);
      }),
      he
    );
  }
  function B($) {
    if ($._status === -1) {
      var K = $._result;
      (K = K()),
        K.then(
          function (ne) {
            ($._status === 0 || $._status === -1) && (($._status = 1), ($._result = ne));
          },
          function (ne) {
            ($._status === 0 || $._status === -1) && (($._status = 2), ($._result = ne));
          },
        ),
        $._status === -1 && (($._status = 0), ($._result = K));
    }
    if ($._status === 1) return $._result.default;
    throw $._result;
  }
  var F = {
      current: null,
    },
    L = {
      transition: null,
    },
    W = {
      ReactCurrentDispatcher: F,
      ReactCurrentBatchConfig: L,
      ReactCurrentOwner: O,
    };
  function G() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (tt.Children = {
      map: U,
      forEach: function ($, K, ne) {
        U(
          $,
          function () {
            K.apply(this, arguments);
          },
          ne,
        );
      },
      count: function ($) {
        var K = 0;
        return (
          U($, function () {
            K++;
          }),
          K
        );
      },
      toArray: function ($) {
        return (
          U($, function (K) {
            return K;
          }) || []
        );
      },
      only: function ($) {
        if (!D($)) throw Error("React.Children.only expected to receive a single React element child.");
        return $;
      },
    }),
    (tt.Component = w),
    (tt.Fragment = n),
    (tt.Profiler = i),
    (tt.PureComponent = S),
    (tt.StrictMode = r),
    (tt.Suspense = u),
    (tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W),
    (tt.act = G),
    (tt.cloneElement = function ($, K, ne) {
      if ($ == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + $ + ".");
      var he = b({}, $.props),
        le = $.key,
        pe = $.ref,
        Pe = $._owner;
      if (K != null) {
        if (
          (K.ref !== void 0 && ((pe = K.ref), (Pe = O.current)),
          K.key !== void 0 && (le = "" + K.key),
          $.type && $.type.defaultProps)
        )
          var xe = $.type.defaultProps;
        for (re in K)
          P.call(K, re) && !k.hasOwnProperty(re) && (he[re] = K[re] === void 0 && xe !== void 0 ? xe[re] : K[re]);
      }
      var re = arguments.length - 2;
      if (re === 1) he.children = ne;
      else if (1 < re) {
        xe = Array(re);
        for (var ve = 0; ve < re; ve++) xe[ve] = arguments[ve + 2];
        he.children = xe;
      }
      return {
        $$typeof: e,
        type: $.type,
        key: le,
        ref: pe,
        props: he,
        _owner: Pe,
      };
    }),
    (tt.createContext = function ($) {
      return (
        ($ = {
          $$typeof: a,
          _currentValue: $,
          _currentValue2: $,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        ($.Provider = {
          $$typeof: o,
          _context: $,
        }),
        ($.Consumer = $)
      );
    }),
    (tt.createElement = R),
    (tt.createFactory = function ($) {
      var K = R.bind(null, $);
      return (K.type = $), K;
    }),
    (tt.createRef = function () {
      return {
        current: null,
      };
    }),
    (tt.forwardRef = function ($) {
      return {
        $$typeof: s,
        render: $,
      };
    }),
    (tt.isValidElement = D),
    (tt.lazy = function ($) {
      return {
        $$typeof: d,
        _payload: {
          _status: -1,
          _result: $,
        },
        _init: B,
      };
    }),
    (tt.memo = function ($, K) {
      return {
        $$typeof: c,
        type: $,
        compare: K === void 0 ? null : K,
      };
    }),
    (tt.startTransition = function ($) {
      var K = L.transition;
      L.transition = {};
      try {
        $();
      } finally {
        L.transition = K;
      }
    }),
    (tt.unstable_act = G),
    (tt.useCallback = function ($, K) {
      return F.current.useCallback($, K);
    }),
    (tt.useContext = function ($) {
      return F.current.useContext($);
    }),
    (tt.useDebugValue = function () {}),
    (tt.useDeferredValue = function ($) {
      return F.current.useDeferredValue($);
    }),
    (tt.useEffect = function ($, K) {
      return F.current.useEffect($, K);
    }),
    (tt.useId = function () {
      return F.current.useId();
    }),
    (tt.useImperativeHandle = function ($, K, ne) {
      return F.current.useImperativeHandle($, K, ne);
    }),
    (tt.useInsertionEffect = function ($, K) {
      return F.current.useInsertionEffect($, K);
    }),
    (tt.useLayoutEffect = function ($, K) {
      return F.current.useLayoutEffect($, K);
    }),
    (tt.useMemo = function ($, K) {
      return F.current.useMemo($, K);
    }),
    (tt.useReducer = function ($, K, ne) {
      return F.current.useReducer($, K, ne);
    }),
    (tt.useRef = function ($) {
      return F.current.useRef($);
    }),
    (tt.useState = function ($) {
      return F.current.useState($);
    }),
    (tt.useSyncExternalStore = function ($, K, ne) {
      return F.current.useSyncExternalStore($, K, ne);
    }),
    (tt.useTransition = function () {
      return F.current.useTransition();
    }),
    (tt.version = "18.3.1"),
    tt
  );
}
var fk;
function Qf() {
  return fk || ((fk = 1), (r0.exports = Nz())), r0.exports;
}
var dk;
function Iz() {
  if (dk) return cc;
  dk = 1;
  var e = Qf(),
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    o = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0,
    };
  function a(s, u, c) {
    var d,
      h = {},
      p = null,
      v = null;
    c !== void 0 && (p = "" + c), u.key !== void 0 && (p = "" + u.key), u.ref !== void 0 && (v = u.ref);
    for (d in u) r.call(u, d) && !o.hasOwnProperty(d) && (h[d] = u[d]);
    if (s && s.defaultProps) for (d in ((u = s.defaultProps), u)) h[d] === void 0 && (h[d] = u[d]);
    return {
      $$typeof: t,
      type: s,
      key: p,
      ref: v,
      props: h,
      _owner: i.current,
    };
  }
  return (cc.Fragment = n), (cc.jsx = a), (cc.jsxs = a), cc;
}
var hk;
function Dz() {
  return hk || ((hk = 1), (n0.exports = Iz())), n0.exports;
}
var jsxRuntime = Dz(),
  React = Qf();
const ReactDefault = ht(React),
  $z = Mz(
    {
      __proto__: null,
      default: ReactDefault,
    },
    [React],
  );
