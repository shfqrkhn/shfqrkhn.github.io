var nb, o2;
function er() {
  if (o2) return nb;
  o2 = 1;
  var e = Array.isArray;
  return (nb = e), nb;
}
var rb, a2;
function j4() {
  if (a2) return rb;
  a2 = 1;
  var e = typeof Zo == "object" && Zo && Zo.Object === Object && Zo;
  return (rb = e), rb;
}
var ib, s2;
function Ci() {
  if (s2) return ib;
  s2 = 1;
  var e = j4(),
    t = typeof self == "object" && self && self.Object === Object && self,
    n = e || t || Function("return this")();
  return (ib = n), ib;
}
var ob, l2;
function pd() {
  if (l2) return ob;
  l2 = 1;
  var e = Ci(),
    t = e.Symbol;
  return (ob = t), ob;
}
var ab, u2;
function One() {
  if (u2) return ab;
  u2 = 1;
  var e = pd(),
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = t.toString,
    i = e ? e.toStringTag : void 0;
  function o(a) {
    var s = n.call(a, i),
      u = a[i];
    try {
      a[i] = void 0;
      var c = !0;
    } catch {}
    var d = r.call(a);
    return c && (s ? (a[i] = u) : delete a[i]), d;
  }
  return (ab = o), ab;
}
var sb, c2;
function Ene() {
  if (c2) return sb;
  c2 = 1;
  var e = Object.prototype,
    t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return (sb = n), sb;
}
var lb, f2;
function wo() {
  if (f2) return lb;
  f2 = 1;
  var e = pd(),
    t = One(),
    n = Ene(),
    r = "[object Null]",
    i = "[object Undefined]",
    o = e ? e.toStringTag : void 0;
  function a(s) {
    return s == null ? (s === void 0 ? i : r) : o && o in Object(s) ? t(s) : n(s);
  }
  return (lb = a), lb;
}
var ub, d2;
function xo() {
  if (d2) return ub;
  d2 = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return (ub = e), ub;
}
var cb, h2;
function bu() {
  if (h2) return cb;
  h2 = 1;
  var e = wo(),
    t = xo(),
    n = "[object Symbol]";
  function r(i) {
    return typeof i == "symbol" || (t(i) && e(i) == n);
  }
  return (cb = r), cb;
}
var fb, p2;
function CO() {
  if (p2) return fb;
  p2 = 1;
  var e = er(),
    t = bu(),
    n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    r = /^\w*$/;
  function i(o, a) {
    if (e(o)) return !1;
    var s = typeof o;
    return s == "number" || s == "symbol" || s == "boolean" || o == null || t(o)
      ? !0
      : r.test(o) || !n.test(o) || (a != null && o in Object(a));
  }
  return (fb = i), fb;
}
var db, m2;
function va() {
  if (m2) return db;
  m2 = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return (db = e), db;
}
var hb, v2;
function kO() {
  if (v2) return hb;
  v2 = 1;
  var e = wo(),
    t = va(),
    n = "[object AsyncFunction]",
    r = "[object Function]",
    i = "[object GeneratorFunction]",
    o = "[object Proxy]";
  function a(s) {
    if (!t(s)) return !1;
    var u = e(s);
    return u == r || u == i || u == n || u == o;
  }
  return (hb = a), hb;
}
var pb, y2;
function Tne() {
  if (y2) return pb;
  y2 = 1;
  var e = Ci(),
    t = e["__core-js_shared__"];
  return (pb = t), pb;
}
var mb, g2;
function Cne() {
  if (g2) return mb;
  g2 = 1;
  var e = Tne(),
    t = (function () {
      var r = /[^.]+$/.exec((e && e.keys && e.keys.IE_PROTO) || "");
      return r ? "Symbol(src)_1." + r : "";
    })();
  function n(r) {
    return !!t && t in r;
  }
  return (mb = n), mb;
}
var vb, b2;
function R4() {
  if (b2) return vb;
  b2 = 1;
  var e = Function.prototype,
    t = e.toString;
  function n(r) {
    if (r != null) {
      try {
        return t.call(r);
      } catch {}
      try {
        return r + "";
      } catch {}
    }
    return "";
  }
  return (vb = n), vb;
}
var yb, w2;
function kne() {
  if (w2) return yb;
  w2 = 1;
  var e = kO(),
    t = Cne(),
    n = va(),
    r = R4(),
    i = /[\\^$.*+?()[\]{}|]/g,
    o = /^\[object .+?Constructor\]$/,
    a = Function.prototype,
    s = Object.prototype,
    u = a.toString,
    c = s.hasOwnProperty,
    d = RegExp(
      "^" +
        u
          .call(c)
          .replace(i, "\\$&")
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
        "$",
    );
  function h(p) {
    if (!n(p) || t(p)) return !1;
    var v = e(p) ? d : o;
    return v.test(r(p));
  }
  return (yb = h), yb;
}
var gb, x2;
function jne() {
  if (x2) return gb;
  x2 = 1;
  function e(t, n) {
    return t?.[n];
  }
  return (gb = e), gb;
}
var bb, S2;
function ws() {
  if (S2) return bb;
  S2 = 1;
  var e = kne(),
    t = jne();
  function n(r, i) {
    var o = t(r, i);
    return e(o) ? o : void 0;
  }
  return (bb = n), bb;
}
var wb, _2;
function Dv() {
  if (_2) return wb;
  _2 = 1;
  var e = ws(),
    t = e(Object, "create");
  return (wb = t), wb;
}
var xb, P2;
function Rne() {
  if (P2) return xb;
  P2 = 1;
  var e = Dv();
  function t() {
    (this.__data__ = e ? e(null) : {}), (this.size = 0);
  }
  return (xb = t), xb;
}
var Sb, A2;
function Mne() {
  if (A2) return Sb;
  A2 = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return (this.size -= n ? 1 : 0), n;
  }
  return (Sb = e), Sb;
}
var _b, O2;
function Nne() {
  if (O2) return _b;
  O2 = 1;
  var e = Dv(),
    t = "__lodash_hash_undefined__",
    n = Object.prototype,
    r = n.hasOwnProperty;
  function i(o) {
    var a = this.__data__;
    if (e) {
      var s = a[o];
      return s === t ? void 0 : s;
    }
    return r.call(a, o) ? a[o] : void 0;
  }
  return (_b = i), _b;
}
var Pb, E2;
function Ine() {
  if (E2) return Pb;
  E2 = 1;
  var e = Dv(),
    t = Object.prototype,
    n = t.hasOwnProperty;
  function r(i) {
    var o = this.__data__;
    return e ? o[i] !== void 0 : n.call(o, i);
  }
  return (Pb = r), Pb;
}
var Ab, T2;
function Dne() {
  if (T2) return Ab;
  T2 = 1;
  var e = Dv(),
    t = "__lodash_hash_undefined__";
  function n(r, i) {
    var o = this.__data__;
    return (this.size += this.has(r) ? 0 : 1), (o[r] = e && i === void 0 ? t : i), this;
  }
  return (Ab = n), Ab;
}
var Ob, C2;
function $ne() {
  if (C2) return Ob;
  C2 = 1;
  var e = Rne(),
    t = Mne(),
    n = Nne(),
    r = Ine(),
    i = Dne();
  function o(a) {
    var s = -1,
      u = a == null ? 0 : a.length;
    for (this.clear(); ++s < u; ) {
      var c = a[s];
      this.set(c[0], c[1]);
    }
  }
  return (
    (o.prototype.clear = e),
    (o.prototype.delete = t),
    (o.prototype.get = n),
    (o.prototype.has = r),
    (o.prototype.set = i),
    (Ob = o),
    Ob
  );
}
var Eb, k2;
function Lne() {
  if (k2) return Eb;
  k2 = 1;
  function e() {
    (this.__data__ = []), (this.size = 0);
  }
  return (Eb = e), Eb;
}
var Tb, j2;
function jO() {
  if (j2) return Tb;
  j2 = 1;
  function e(t, n) {
    return t === n || (t !== t && n !== n);
  }
  return (Tb = e), Tb;
}
var Cb, R2;
function $v() {
  if (R2) return Cb;
  R2 = 1;
  var e = jO();
  function t(n, r) {
    for (var i = n.length; i--; ) if (e(n[i][0], r)) return i;
    return -1;
  }
  return (Cb = t), Cb;
}
var kb, M2;
function Bne() {
  if (M2) return kb;
  M2 = 1;
  var e = $v(),
    t = Array.prototype,
    n = t.splice;
  function r(i) {
    var o = this.__data__,
      a = e(o, i);
    if (a < 0) return !1;
    var s = o.length - 1;
    return a == s ? o.pop() : n.call(o, a, 1), --this.size, !0;
  }
  return (kb = r), kb;
}
var jb, N2;
function Fne() {
  if (N2) return jb;
  N2 = 1;
  var e = $v();
  function t(n) {
    var r = this.__data__,
      i = e(r, n);
    return i < 0 ? void 0 : r[i][1];
  }
  return (jb = t), jb;
}
var Rb, I2;
function Vne() {
  if (I2) return Rb;
  I2 = 1;
  var e = $v();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return (Rb = t), Rb;
}
var Mb, D2;
function zne() {
  if (D2) return Mb;
  D2 = 1;
  var e = $v();
  function t(n, r) {
    var i = this.__data__,
      o = e(i, n);
    return o < 0 ? (++this.size, i.push([n, r])) : (i[o][1] = r), this;
  }
  return (Mb = t), Mb;
}
var Nb, $2;
function Lv() {
  if ($2) return Nb;
  $2 = 1;
  var e = Lne(),
    t = Bne(),
    n = Fne(),
    r = Vne(),
    i = zne();
  function o(a) {
    var s = -1,
      u = a == null ? 0 : a.length;
    for (this.clear(); ++s < u; ) {
      var c = a[s];
      this.set(c[0], c[1]);
    }
  }
  return (
    (o.prototype.clear = e),
    (o.prototype.delete = t),
    (o.prototype.get = n),
    (o.prototype.has = r),
    (o.prototype.set = i),
    (Nb = o),
    Nb
  );
}
var Ib, L2;
function RO() {
  if (L2) return Ib;
  L2 = 1;
  var e = ws(),
    t = Ci(),
    n = e(t, "Map");
  return (Ib = n), Ib;
}
var Db, B2;
function qne() {
  if (B2) return Db;
  B2 = 1;
  var e = $ne(),
    t = Lv(),
    n = RO();
  function r() {
    (this.size = 0),
      (this.__data__ = {
        hash: new e(),
        map: new (n || t)(),
        string: new e(),
      });
  }
  return (Db = r), Db;
}
var $b, F2;
function Wne() {
  if (F2) return $b;
  F2 = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return ($b = e), $b;
}
var Lb, V2;
function Bv() {
  if (V2) return Lb;
  V2 = 1;
  var e = Wne();
  function t(n, r) {
    var i = n.__data__;
    return e(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
  }
  return (Lb = t), Lb;
}
var Bb, z2;
function Une() {
  if (z2) return Bb;
  z2 = 1;
  var e = Bv();
  function t(n) {
    var r = e(this, n).delete(n);
    return (this.size -= r ? 1 : 0), r;
  }
  return (Bb = t), Bb;
}
var Fb, q2;
function Hne() {
  if (q2) return Fb;
  q2 = 1;
  var e = Bv();
  function t(n) {
    return e(this, n).get(n);
  }
  return (Fb = t), Fb;
}
var Vb, W2;
function Kne() {
  if (W2) return Vb;
  W2 = 1;
  var e = Bv();
  function t(n) {
    return e(this, n).has(n);
  }
  return (Vb = t), Vb;
}
var zb, U2;
function Gne() {
  if (U2) return zb;
  U2 = 1;
  var e = Bv();
  function t(n, r) {
    var i = e(this, n),
      o = i.size;
    return i.set(n, r), (this.size += i.size == o ? 0 : 1), this;
  }
  return (zb = t), zb;
}
var qb, H2;
function MO() {
  if (H2) return qb;
  H2 = 1;
  var e = qne(),
    t = Une(),
    n = Hne(),
    r = Kne(),
    i = Gne();
  function o(a) {
    var s = -1,
      u = a == null ? 0 : a.length;
    for (this.clear(); ++s < u; ) {
      var c = a[s];
      this.set(c[0], c[1]);
    }
  }
  return (
    (o.prototype.clear = e),
    (o.prototype.delete = t),
    (o.prototype.get = n),
    (o.prototype.has = r),
    (o.prototype.set = i),
    (qb = o),
    qb
  );
}
var Wb, K2;
function M4() {
  if (K2) return Wb;
  K2 = 1;
  var e = MO(),
    t = "Expected a function";
  function n(r, i) {
    if (typeof r != "function" || (i != null && typeof i != "function")) throw new TypeError(t);
    var o = function () {
      var a = arguments,
        s = i ? i.apply(this, a) : a[0],
        u = o.cache;
      if (u.has(s)) return u.get(s);
      var c = r.apply(this, a);
      return (o.cache = u.set(s, c) || u), c;
    };
    return (o.cache = new (n.Cache || e)()), o;
  }
  return (n.Cache = e), (Wb = n), Wb;
}
var Ub, G2;
function Yne() {
  if (G2) return Ub;
  G2 = 1;
  var e = M4(),
    t = 500;
  function n(r) {
    var i = e(r, function (a) {
        return o.size === t && o.clear(), a;
      }),
      o = i.cache;
    return i;
  }
  return (Ub = n), Ub;
}
var Hb, Y2;
function Xne() {
  if (Y2) return Hb;
  Y2 = 1;
  var e = Yne(),
    t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    n = /\\(\\)?/g,
    r = e(function (i) {
      var o = [];
      return (
        i.charCodeAt(0) === 46 && o.push(""),
        i.replace(t, function (a, s, u, c) {
          o.push(u ? c.replace(n, "$1") : s || a);
        }),
        o
      );
    });
  return (Hb = r), Hb;
}
var Kb, X2;
function NO() {
  if (X2) return Kb;
  X2 = 1;
  function e(t, n) {
    for (var r = -1, i = t == null ? 0 : t.length, o = Array(i); ++r < i; ) o[r] = n(t[r], r, t);
    return o;
  }
  return (Kb = e), Kb;
}
var Gb, Z2;
function Zne() {
  if (Z2) return Gb;
  Z2 = 1;
  var e = pd(),
    t = NO(),
    n = er(),
    r = bu(),
    i = e ? e.prototype : void 0,
    o = i ? i.toString : void 0;
  function a(s) {
    if (typeof s == "string") return s;
    if (n(s)) return t(s, a) + "";
    if (r(s)) return o ? o.call(s) : "";
    var u = s + "";
    return u == "0" && 1 / s == -1 / 0 ? "-0" : u;
  }
  return (Gb = a), Gb;
}
var Yb, Q2;
function N4() {
  if (Q2) return Yb;
  Q2 = 1;
  var e = Zne();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return (Yb = t), Yb;
}
var Xb, J2;
function I4() {
  if (J2) return Xb;
  J2 = 1;
  var e = er(),
    t = CO(),
    n = Xne(),
    r = N4();
  function i(o, a) {
    return e(o) ? o : t(o, a) ? [o] : n(r(o));
  }
  return (Xb = i), Xb;
}
var Zb, eM;
function Fv() {
  if (eM) return Zb;
  eM = 1;
  var e = bu();
  function t(n) {
    if (typeof n == "string" || e(n)) return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return (Zb = t), Zb;
}
var Qb, tM;
function IO() {
  if (tM) return Qb;
  tM = 1;
  var e = I4(),
    t = Fv();
  function n(r, i) {
    i = e(i, r);
    for (var o = 0, a = i.length; r != null && o < a; ) r = r[t(i[o++])];
    return o && o == a ? r : void 0;
  }
  return (Qb = n), Qb;
}
var Jb, nM;
function D4() {
  if (nM) return Jb;
  nM = 1;
  var e = IO();
  function t(n, r, i) {
    var o = n == null ? void 0 : e(n, r);
    return o === void 0 ? i : o;
  }
  return (Jb = t), Jb;
}
var Qne = D4();
const Er = ht(Qne);
var ew, rM;
function Jne() {
  if (rM) return ew;
  rM = 1;
  function e(t) {
    return t == null;
  }
  return (ew = e), ew;
}
var ere = Jne();
const it = ht(ere);
var tw, iM;
function tre() {
  if (iM) return tw;
  iM = 1;
  var e = wo(),
    t = er(),
    n = xo(),
    r = "[object String]";
  function i(o) {
    return typeof o == "string" || (!t(o) && n(o) && e(o) == r);
  }
  return (tw = i), tw;
}
var nre = tre();
const ds = ht(nre);
var rre = kO();
const nt = ht(rre);
var ire = va();
const wu = ht(ire);
var nw = {
    exports: {},
  },
  ut = {};
var oM;
function ore() {
  if (oM) return ut;
  oM = 1;
  var e = Symbol.for("react.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    o = Symbol.for("react.provider"),
    a = Symbol.for("react.context"),
    s = Symbol.for("react.server_context"),
    u = Symbol.for("react.forward_ref"),
    c = Symbol.for("react.suspense"),
    d = Symbol.for("react.suspense_list"),
    h = Symbol.for("react.memo"),
    p = Symbol.for("react.lazy"),
    v = Symbol.for("react.offscreen"),
    b;
  b = Symbol.for("react.module.reference");
  function y(w) {
    if (typeof w == "object" && w !== null) {
      var x = w.$$typeof;
      switch (x) {
        case e:
          switch (((w = w.type), w)) {
            case n:
            case i:
            case r:
            case c:
            case d:
              return w;
            default:
              switch (((w = w && w.$$typeof), w)) {
                case s:
                case a:
                case u:
                case p:
                case h:
                case o:
                  return w;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return (
    (ut.ContextConsumer = a),
    (ut.ContextProvider = o),
    (ut.Element = e),
    (ut.ForwardRef = u),
    (ut.Fragment = n),
    (ut.Lazy = p),
    (ut.Memo = h),
    (ut.Portal = t),
    (ut.Profiler = i),
    (ut.StrictMode = r),
    (ut.Suspense = c),
    (ut.SuspenseList = d),
    (ut.isAsyncMode = function () {
      return !1;
    }),
    (ut.isConcurrentMode = function () {
      return !1;
    }),
    (ut.isContextConsumer = function (w) {
      return y(w) === a;
    }),
    (ut.isContextProvider = function (w) {
      return y(w) === o;
    }),
    (ut.isElement = function (w) {
      return typeof w == "object" && w !== null && w.$$typeof === e;
    }),
    (ut.isForwardRef = function (w) {
      return y(w) === u;
    }),
    (ut.isFragment = function (w) {
      return y(w) === n;
    }),
    (ut.isLazy = function (w) {
      return y(w) === p;
    }),
    (ut.isMemo = function (w) {
      return y(w) === h;
    }),
    (ut.isPortal = function (w) {
      return y(w) === t;
    }),
    (ut.isProfiler = function (w) {
      return y(w) === i;
    }),
    (ut.isStrictMode = function (w) {
      return y(w) === r;
    }),
    (ut.isSuspense = function (w) {
      return y(w) === c;
    }),
    (ut.isSuspenseList = function (w) {
      return y(w) === d;
    }),
    (ut.isValidElementType = function (w) {
      return (
        typeof w == "string" ||
        typeof w == "function" ||
        w === n ||
        w === i ||
        w === r ||
        w === c ||
        w === d ||
        w === v ||
        (typeof w == "object" &&
          w !== null &&
          (w.$$typeof === p ||
            w.$$typeof === h ||
            w.$$typeof === o ||
            w.$$typeof === a ||
            w.$$typeof === u ||
            w.$$typeof === b ||
            w.getModuleId !== void 0))
      );
    }),
    (ut.typeOf = y),
    ut
  );
}
var aM;
function are() {
  return aM || ((aM = 1), (nw.exports = ore())), nw.exports;
}
var sre = are(),
  rw,
  sM;
function $4() {
  if (sM) return rw;
  sM = 1;
  var e = wo(),
    t = xo(),
    n = "[object Number]";
  function r(i) {
    return typeof i == "number" || (t(i) && e(i) == n);
  }
  return (rw = r), rw;
}
var iw, lM;
function lre() {
  if (lM) return iw;
  lM = 1;
  var e = $4();
  function t(n) {
    return e(n) && n != +n;
  }
  return (iw = t), iw;
}
var ure = lre();
const xu = ht(ure);
var cre = $4();
const fre = ht(cre);
var Xr = function (t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1;
  },
  Ya = function (t) {
    return ds(t) && t.indexOf("%") === t.length - 1;
  },
  be = function (t) {
    return fre(t) && !xu(t);
  },
  dre = function (t) {
    return it(t);
  },
  Jt = function (t) {
    return be(t) || ds(t);
  },
  hre = 0,
  md = function (t) {
    var n = ++hre;
    return "".concat(t || "").concat(n);
  },
  hs = function (t, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!be(t) && !ds(t)) return r;
    var o;
    if (Ya(t)) {
      var a = t.indexOf("%");
      o = (n * parseFloat(t.slice(0, a))) / 100;
    } else o = +t;
    return xu(o) && (o = r), i && o > n && (o = n), o;
  },
  ol = function (t) {
    if (!t) return null;
    var n = Object.keys(t);
    return n && n.length ? t[n[0]] : null;
  },
  pre = function (t) {
    if (!Array.isArray(t)) return !1;
    for (var n = t.length, r = {}, i = 0; i < n; i++)
      if (!r[t[i]]) r[t[i]] = !0;
      else return !0;
    return !1;
  },
  Ar = function (t, n) {
    return be(t) && be(n)
      ? function (r) {
          return t + r * (n - t);
        }
      : function () {
          return n;
        };
  };
function em(e, t, n) {
  return !e || !e.length
    ? null
    : e.find(function (r) {
        return r && (typeof t == "function" ? t(r) : Er(r, t)) === n;
      });
}
var mre = function (t, n) {
  return be(t) && be(n)
    ? t - n
    : ds(t) && ds(n)
      ? t.localeCompare(n)
      : t instanceof Date && n instanceof Date
        ? t.getTime() - n.getTime()
        : String(t).localeCompare(String(n));
};
function Al(e, t) {
  for (var n in e) if ({}.hasOwnProperty.call(e, n) && (!{}.hasOwnProperty.call(t, n) || e[n] !== t[n])) return !1;
  for (var r in t) if ({}.hasOwnProperty.call(t, r) && !{}.hasOwnProperty.call(e, r)) return !1;
  return !0;
}
function f_(e) {
  "@babel/helpers - typeof";

  return (
    (f_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    f_(e)
  );
}
var vre = ["viewBox", "children"],
  yre = [
    "aria-activedescendant",
    "aria-atomic",
    "aria-autocomplete",
    "aria-busy",
    "aria-checked",
    "aria-colcount",
    "aria-colindex",
    "aria-colspan",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-disabled",
    "aria-errormessage",
    "aria-expanded",
    "aria-flowto",
    "aria-haspopup",
    "aria-hidden",
    "aria-invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-level",
    "aria-live",
    "aria-modal",
    "aria-multiline",
    "aria-multiselectable",
    "aria-orientation",
    "aria-owns",
    "aria-placeholder",
    "aria-posinset",
    "aria-pressed",
    "aria-readonly",
    "aria-relevant",
    "aria-required",
    "aria-roledescription",
    "aria-rowcount",
    "aria-rowindex",
    "aria-rowspan",
    "aria-selected",
    "aria-setsize",
    "aria-sort",
    "aria-valuemax",
    "aria-valuemin",
    "aria-valuenow",
    "aria-valuetext",
    "className",
    "color",
    "height",
    "id",
    "lang",
    "max",
    "media",
    "method",
    "min",
    "name",
    "style",
    "target",
    "width",
    "role",
    "tabIndex",
    "accentHeight",
    "accumulate",
    "additive",
    "alignmentBaseline",
    "allowReorder",
    "alphabetic",
    "amplitude",
    "arabicForm",
    "ascent",
    "attributeName",
    "attributeType",
    "autoReverse",
    "azimuth",
    "baseFrequency",
    "baselineShift",
    "baseProfile",
    "bbox",
    "begin",
    "bias",
    "by",
    "calcMode",
    "capHeight",
    "clip",
    "clipPath",
    "clipPathUnits",
    "clipRule",
    "colorInterpolation",
    "colorInterpolationFilters",
    "colorProfile",
    "colorRendering",
    "contentScriptType",
    "contentStyleType",
    "cursor",
    "cx",
    "cy",
    "d",
    "decelerate",
    "descent",
    "diffuseConstant",
    "direction",
    "display",
    "divisor",
    "dominantBaseline",
    "dur",
    "dx",
    "dy",
    "edgeMode",
    "elevation",
    "enableBackground",
    "end",
    "exponent",
    "externalResourcesRequired",
    "fill",
    "fillOpacity",
    "fillRule",
    "filter",
    "filterRes",
    "filterUnits",
    "floodColor",
    "floodOpacity",
    "focusable",
    "fontFamily",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "format",
    "from",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyphName",
    "glyphOrientationHorizontal",
    "glyphOrientationVertical",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "hanging",
    "horizAdvX",
    "horizOriginX",
    "href",
    "ideographic",
    "imageRendering",
    "in2",
    "in",
    "intercept",
    "k1",
    "k2",
    "k3",
    "k4",
    "k",
    "kernelMatrix",
    "kernelUnitLength",
    "kerning",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "letterSpacing",
    "lightingColor",
    "limitingConeAngle",
    "local",
    "markerEnd",
    "markerHeight",
    "markerMid",
    "markerStart",
    "markerUnits",
    "markerWidth",
    "mask",
    "maskContentUnits",
    "maskUnits",
    "mathematical",
    "mode",
    "numOctaves",
    "offset",
    "opacity",
    "operator",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "overlinePosition",
    "overlineThickness",
    "paintOrder",
    "panose1",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointerEvents",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "r",
    "radius",
    "refX",
    "refY",
    "renderingIntent",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "restart",
    "result",
    "rotate",
    "rx",
    "ry",
    "seed",
    "shapeRendering",
    "slope",
    "spacing",
    "specularConstant",
    "specularExponent",
    "speed",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stemh",
    "stemv",
    "stitchTiles",
    "stopColor",
    "stopOpacity",
    "strikethroughPosition",
    "strikethroughThickness",
    "string",
    "stroke",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textAnchor",
    "textDecoration",
    "textLength",
    "textRendering",
    "to",
    "transform",
    "u1",
    "u2",
    "underlinePosition",
    "underlineThickness",
    "unicode",
    "unicodeBidi",
    "unicodeRange",
    "unitsPerEm",
    "vAlphabetic",
    "values",
    "vectorEffect",
    "version",
    "vertAdvY",
    "vertOriginX",
    "vertOriginY",
    "vHanging",
    "vIdeographic",
    "viewTarget",
    "visibility",
    "vMathematical",
    "widths",
    "wordSpacing",
    "writingMode",
    "x1",
    "x2",
    "x",
    "xChannelSelector",
    "xHeight",
    "xlinkActuate",
    "xlinkArcrole",
    "xlinkHref",
    "xlinkRole",
    "xlinkShow",
    "xlinkTitle",
    "xlinkType",
    "xmlBase",
    "xmlLang",
    "xmlns",
    "xmlnsXlink",
    "xmlSpace",
    "y1",
    "y2",
    "y",
    "yChannelSelector",
    "z",
    "zoomAndPan",
    "ref",
    "key",
    "angle",
  ],
  uM = ["points", "pathLength"],
  ow = {
    svg: vre,
    polygon: uM,
    polyline: uM,
  },
  DO = [
    "dangerouslySetInnerHTML",
    "onCopy",
    "onCopyCapture",
    "onCut",
    "onCutCapture",
    "onPaste",
    "onPasteCapture",
    "onCompositionEnd",
    "onCompositionEndCapture",
    "onCompositionStart",
    "onCompositionStartCapture",
    "onCompositionUpdate",
    "onCompositionUpdateCapture",
    "onFocus",
    "onFocusCapture",
    "onBlur",
    "onBlurCapture",
    "onChange",
    "onChangeCapture",
    "onBeforeInput",
    "onBeforeInputCapture",
    "onInput",
    "onInputCapture",
    "onReset",
    "onResetCapture",
    "onSubmit",
    "onSubmitCapture",
    "onInvalid",
    "onInvalidCapture",
    "onLoad",
    "onLoadCapture",
    "onError",
    "onErrorCapture",
    "onKeyDown",
    "onKeyDownCapture",
    "onKeyPress",
    "onKeyPressCapture",
    "onKeyUp",
    "onKeyUpCapture",
    "onAbort",
    "onAbortCapture",
    "onCanPlay",
    "onCanPlayCapture",
    "onCanPlayThrough",
    "onCanPlayThroughCapture",
    "onDurationChange",
    "onDurationChangeCapture",
    "onEmptied",
    "onEmptiedCapture",
    "onEncrypted",
    "onEncryptedCapture",
    "onEnded",
    "onEndedCapture",
    "onLoadedData",
    "onLoadedDataCapture",
    "onLoadedMetadata",
    "onLoadedMetadataCapture",
    "onLoadStart",
    "onLoadStartCapture",
    "onPause",
    "onPauseCapture",
    "onPlay",
    "onPlayCapture",
    "onPlaying",
    "onPlayingCapture",
    "onProgress",
    "onProgressCapture",
    "onRateChange",
    "onRateChangeCapture",
    "onSeeked",
    "onSeekedCapture",
    "onSeeking",
    "onSeekingCapture",
    "onStalled",
    "onStalledCapture",
    "onSuspend",
    "onSuspendCapture",
    "onTimeUpdate",
    "onTimeUpdateCapture",
    "onVolumeChange",
    "onVolumeChangeCapture",
    "onWaiting",
    "onWaitingCapture",
    "onAuxClick",
    "onAuxClickCapture",
    "onClick",
    "onClickCapture",
    "onContextMenu",
    "onContextMenuCapture",
    "onDoubleClick",
    "onDoubleClickCapture",
    "onDrag",
    "onDragCapture",
    "onDragEnd",
    "onDragEndCapture",
    "onDragEnter",
    "onDragEnterCapture",
    "onDragExit",
    "onDragExitCapture",
    "onDragLeave",
    "onDragLeaveCapture",
    "onDragOver",
    "onDragOverCapture",
    "onDragStart",
    "onDragStartCapture",
    "onDrop",
    "onDropCapture",
    "onMouseDown",
    "onMouseDownCapture",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onMouseMoveCapture",
    "onMouseOut",
    "onMouseOutCapture",
    "onMouseOver",
    "onMouseOverCapture",
    "onMouseUp",
    "onMouseUpCapture",
    "onSelect",
    "onSelectCapture",
    "onTouchCancel",
    "onTouchCancelCapture",
    "onTouchEnd",
    "onTouchEndCapture",
    "onTouchMove",
    "onTouchMoveCapture",
    "onTouchStart",
    "onTouchStartCapture",
    "onPointerDown",
    "onPointerDownCapture",
    "onPointerMove",
    "onPointerMoveCapture",
    "onPointerUp",
    "onPointerUpCapture",
    "onPointerCancel",
    "onPointerCancelCapture",
    "onPointerEnter",
    "onPointerEnterCapture",
    "onPointerLeave",
    "onPointerLeaveCapture",
    "onPointerOver",
    "onPointerOverCapture",
    "onPointerOut",
    "onPointerOutCapture",
    "onGotPointerCapture",
    "onGotPointerCaptureCapture",
    "onLostPointerCapture",
    "onLostPointerCaptureCapture",
    "onScroll",
    "onScrollCapture",
    "onWheel",
    "onWheelCapture",
    "onAnimationStart",
    "onAnimationStartCapture",
    "onAnimationEnd",
    "onAnimationEndCapture",
    "onAnimationIteration",
    "onAnimationIterationCapture",
    "onTransitionEnd",
    "onTransitionEndCapture",
  ],
  tm = function (t, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var r = t;
    if ((React.isValidElement(t) && (r = t.props), !wu(r))) return null;
    var i = {};
    return (
      Object.keys(r).forEach(function (o) {
        DO.includes(o) &&
          (i[o] =
            n ||
            function (a) {
              return r[o](r, a);
            });
      }),
      i
    );
  },
  gre = function (t, n, r) {
    return function (i) {
      return t(n, r, i), null;
    };
  },
  nm = function (t, n, r) {
    if (!wu(t) || f_(t) !== "object") return null;
    var i = null;
    return (
      Object.keys(t).forEach(function (o) {
        var a = t[o];
        DO.includes(o) && typeof a == "function" && (i || (i = {}), (i[o] = gre(a, n, r)));
      }),
      i
    );
  },
  bre = ["children"],
  wre = ["children"];
function cM(e, t) {
  if (e == null) return {};
  var n = xre(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function xre(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function d_(e) {
  "@babel/helpers - typeof";

  return (
    (d_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    d_(e)
  );
}
var fM = {
    click: "onClick",
    mousedown: "onMouseDown",
    mouseup: "onMouseUp",
    mouseover: "onMouseOver",
    mousemove: "onMouseMove",
    mouseout: "onMouseOut",
    mouseenter: "onMouseEnter",
    mouseleave: "onMouseLeave",
    touchcancel: "onTouchCancel",
    touchend: "onTouchEnd",
    touchmove: "onTouchMove",
    touchstart: "onTouchStart",
    contextmenu: "onContextMenu",
    dblclick: "onDoubleClick",
  },
  to = function (t) {
    return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
  },
  dM = null,
  aw = null,
  $O = function e(t) {
    if (t === dM && Array.isArray(aw)) return aw;
    var n = [];
    return (
      React.Children.forEach(t, function (r) {
        it(r) || (sre.isFragment(r) ? (n = n.concat(e(r.props.children))) : n.push(r));
      }),
      (aw = n),
      (dM = t),
      n
    );
  };
function Jr(e, t) {
  var n = [],
    r = [];
  return (
    Array.isArray(t)
      ? (r = t.map(function (i) {
          return to(i);
        }))
      : (r = [to(t)]),
    $O(e).forEach(function (i) {
      var o = Er(i, "type.displayName") || Er(i, "type.name");
      r.indexOf(o) !== -1 && n.push(i);
    }),
    n
  );
}
function sr(e, t) {
  var n = Jr(e, t);
  return n && n[0];
}
var hM = function (t) {
    if (!t || !t.props) return !1;
    var n = t.props,
      r = n.width,
      i = n.height;
    return !(!be(r) || r <= 0 || !be(i) || i <= 0);
  },
  Sre = [
    "a",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColormatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-url",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "lineGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "script",
    "set",
    "stop",
    "style",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern",
  ],
  _re = function (t) {
    return t && t.type && ds(t.type) && Sre.indexOf(t.type) >= 0;
  },
  Pre = function (t) {
    return t && d_(t) === "object" && "clipDot" in t;
  },
  Are = function (t, n, r, i) {
    var o,
      a = (o = ow?.[i]) !== null && o !== void 0 ? o : [];
    return n.startsWith("data-") || (!nt(t) && ((i && a.includes(n)) || yre.includes(n))) || (r && DO.includes(n));
  },
  rt = function (t, n, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if ((React.isValidElement(t) && (i = t.props), !wu(i))) return null;
    var o = {};
    return (
      Object.keys(i).forEach(function (a) {
        var s;
        Are((s = i) === null || s === void 0 ? void 0 : s[a], a, n, r) && (o[a] = i[a]);
      }),
      o
    );
  },
  h_ = function e(t, n) {
    if (t === n) return !0;
    var r = React.Children.count(t);
    if (r !== React.Children.count(n)) return !1;
    if (r === 0) return !0;
    if (r === 1) return pM(Array.isArray(t) ? t[0] : t, Array.isArray(n) ? n[0] : n);
    for (var i = 0; i < r; i++) {
      var o = t[i],
        a = n[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!e(o, a)) return !1;
      } else if (!pM(o, a)) return !1;
    }
    return !0;
  },
  pM = function (t, n) {
    if (it(t) && it(n)) return !0;
    if (!it(t) && !it(n)) {
      var r = t.props || {},
        i = r.children,
        o = cM(r, bre),
        a = n.props || {},
        s = a.children,
        u = cM(a, wre);
      return i && s ? Al(o, u) && h_(i, s) : !i && !s ? Al(o, u) : !1;
    }
    return !1;
  },
  mM = function (t, n) {
    var r = [],
      i = {};
    return (
      $O(t).forEach(function (o, a) {
        if (_re(o)) r.push(o);
        else if (o) {
          var s = to(o.type),
            u = n[s] || {},
            c = u.handler,
            d = u.once;
          if (c && (!d || !i[s])) {
            var h = c(o, s, a);
            r.push(h), (i[s] = !0);
          }
        }
      }),
      r
    );
  },
  Ore = function (t) {
    var n = t && t.type;
    return n && fM[n] ? fM[n] : null;
  },
  Ere = function (t, n) {
    return $O(n).indexOf(t);
  },
  Tre = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function p_() {
  return (
    (p_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    p_.apply(this, arguments)
  );
}
function Cre(e, t) {
  if (e == null) return {};
  var n = kre(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function kre(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function m_(e) {
  var t = e.children,
    n = e.width,
    r = e.height,
    i = e.viewBox,
    o = e.className,
    a = e.style,
    s = e.title,
    u = e.desc,
    c = Cre(e, Tre),
    d = i || {
      width: n,
      height: r,
      x: 0,
      y: 0,
    },
    h = We("recharts-surface", o);
  return ReactDefault.createElement(
    "svg",
    p_({}, rt(c, !0, "svg"), {
      className: h,
      width: n,
      height: r,
      style: a,
      viewBox: "".concat(d.x, " ").concat(d.y, " ").concat(d.width, " ").concat(d.height),
    }),
    ReactDefault.createElement("title", null, s),
    ReactDefault.createElement("desc", null, u),
    t,
  );
}
var jre = ["children", "className"];
function v_() {
  return (
    (v_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    v_.apply(this, arguments)
  );
}
function Rre(e, t) {
  if (e == null) return {};
  var n = Mre(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Mre(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var Nt = ReactDefault.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = Rre(e, jre),
      o = We("recharts-layer", r);
    return ReactDefault.createElement(
      "g",
      v_(
        {
          className: o,
        },
        rt(i, !0),
        {
          ref: t,
        },
      ),
      n,
    );
  }),
  os = function (t, n) {
    for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];
  },
  sw,
  vM;
function Nre() {
  if (vM) return sw;
  vM = 1;
  function e(t, n, r) {
    var i = -1,
      o = t.length;
    n < 0 && (n = -n > o ? 0 : o + n),
      (r = r > o ? o : r),
      r < 0 && (r += o),
      (o = n > r ? 0 : (r - n) >>> 0),
      (n >>>= 0);
    for (var a = Array(o); ++i < o; ) a[i] = t[i + n];
    return a;
  }
  return (sw = e), sw;
}
var lw, yM;
function Ire() {
  if (yM) return lw;
  yM = 1;
  var e = Nre();
  function t(n, r, i) {
    var o = n.length;
    return (i = i === void 0 ? o : i), !r && i >= o ? n : e(n, r, i);
  }
  return (lw = t), lw;
}
var uw, gM;
function L4() {
  if (gM) return uw;
  gM = 1;
  var e = "\\ud800-\\udfff",
    t = "\\u0300-\\u036f",
    n = "\\ufe20-\\ufe2f",
    r = "\\u20d0-\\u20ff",
    i = t + n + r,
    o = "\\ufe0e\\ufe0f",
    a = "\\u200d",
    s = RegExp("[" + a + e + i + o + "]");
  function u(c) {
    return s.test(c);
  }
  return (uw = u), uw;
}
var cw, bM;
function Dre() {
  if (bM) return cw;
  bM = 1;
  function e(t) {
    return t.split("");
  }
  return (cw = e), cw;
}
var fw, wM;
function $re() {
  if (wM) return fw;
  wM = 1;
  var e = "\\ud800-\\udfff",
    t = "\\u0300-\\u036f",
    n = "\\ufe20-\\ufe2f",
    r = "\\u20d0-\\u20ff",
    i = t + n + r,
    o = "\\ufe0e\\ufe0f",
    a = "[" + e + "]",
    s = "[" + i + "]",
    u = "\\ud83c[\\udffb-\\udfff]",
    c = "(?:" + s + "|" + u + ")",
    d = "[^" + e + "]",
    h = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    p = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    v = "\\u200d",
    b = c + "?",
    y = "[" + o + "]?",
    w = "(?:" + v + "(?:" + [d, h, p].join("|") + ")" + y + b + ")*",
    x = y + b + w,
    S = "(?:" + [d + s + "?", s, h, p, a].join("|") + ")",
    _ = RegExp(u + "(?=" + u + ")|" + S + x, "g");
  function E(P) {
    return P.match(_) || [];
  }
  return (fw = E), fw;
}
var dw, xM;
function Lre() {
  if (xM) return dw;
  xM = 1;
  var e = Dre(),
    t = L4(),
    n = $re();
  function r(i) {
    return t(i) ? n(i) : e(i);
  }
  return (dw = r), dw;
}
var hw, SM;
function Bre() {
  if (SM) return hw;
  SM = 1;
  var e = Ire(),
    t = L4(),
    n = Lre(),
    r = N4();
  function i(o) {
    return function (a) {
      a = r(a);
      var s = t(a) ? n(a) : void 0,
        u = s ? s[0] : a.charAt(0),
        c = s ? e(s, 1).join("") : a.slice(1);
      return u[o]() + c;
    };
  }
  return (hw = i), hw;
}
var pw, _M;
function Fre() {
  if (_M) return pw;
  _M = 1;
  var e = Bre(),
    t = e("toUpperCase");
  return (pw = t), pw;
}
var Vre = Fre();
const Vv = ht(Vre);
function wt(e) {
  return function () {
    return e;
  };
}
const B4 = Math.cos,
  rm = Math.sin,
  ri = Math.sqrt,
  im = Math.PI,
  zv = 2 * im,
  y_ = Math.PI,
  g_ = 2 * y_,
  Va = 1e-6,
  zre = g_ - Va;
function F4(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function qre(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return F4;
  const n = 10 ** t;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i) this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Wre {
  constructor(t) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = ""), (this._append = t == null ? F4 : qre(t));
  }
  moveTo(t, n) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}`;
  }
  closePath() {
    this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +n)}`;
  }
  quadraticCurveTo(t, n, r, i) {
    this._append`Q${+t},${+n},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(t, n, r, i, o, a) {
    this._append`C${+t},${+n},${+r},${+i},${(this._x1 = +o)},${(this._y1 = +a)}`;
  }
  arcTo(t, n, r, i, o) {
    if (((t = +t), (n = +n), (r = +r), (i = +i), (o = +o), o < 0)) throw new Error(`negative radius: ${o}`);
    let a = this._x1,
      s = this._y1,
      u = r - t,
      c = i - n,
      d = a - t,
      h = s - n,
      p = d * d + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = n)}`;
    else if (p > Va)
      if (!(Math.abs(h * u - c * d) > Va) || !o) this._append`L${(this._x1 = t)},${(this._y1 = n)}`;
      else {
        let v = r - a,
          b = i - s,
          y = u * u + c * c,
          w = v * v + b * b,
          x = Math.sqrt(y),
          S = Math.sqrt(p),
          _ = o * Math.tan((y_ - Math.acos((y + p - w) / (2 * x * S))) / 2),
          E = _ / S,
          P = _ / x;
        Math.abs(E - 1) > Va && this._append`L${t + E * d},${n + E * h}`,
          this._append`A${o},${o},0,0,${+(h * v > d * b)},${(this._x1 = t + P * u)},${(this._y1 = n + P * c)}`;
      }
  }
  arc(t, n, r, i, o, a) {
    if (((t = +t), (n = +n), (r = +r), (a = !!a), r < 0)) throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(i),
      u = r * Math.sin(i),
      c = t + s,
      d = n + u,
      h = 1 ^ a,
      p = a ? i - o : o - i;
    this._x1 === null
      ? this._append`M${c},${d}`
      : (Math.abs(this._x1 - c) > Va || Math.abs(this._y1 - d) > Va) && this._append`L${c},${d}`,
      r &&
        (p < 0 && (p = (p % g_) + g_),
        p > zre
          ? this._append`A${r},${r},0,1,${h},${t - s},${n - u}A${r},${r},0,1,${h},${(this._x1 = c)},${(this._y1 = d)}`
          : p > Va &&
            this
              ._append`A${r},${r},0,${+(p >= y_)},${h},${(this._x1 = t + r * Math.cos(o))},${(this._y1 = n + r * Math.sin(o))}`);
  }
  rect(t, n, r, i) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function LO(e) {
  let t = 3;
  return (
    (e.digits = function (n) {
      if (!arguments.length) return t;
      if (n == null) t = null;
      else {
        const r = Math.floor(n);
        if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
        t = r;
      }
      return e;
    }),
    () => new Wre(t)
  );
}
function BO(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function V4(e) {
  this._context = e;
}
V4.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  },
};
function qv(e) {
  return new V4(e);
}
function z4(e) {
  return e[0];
}
function q4(e) {
  return e[1];
}
function W4(e, t) {
  var n = wt(!0),
    r = null,
    i = qv,
    o = null,
    a = LO(s);
  (e = typeof e == "function" ? e : e === void 0 ? z4 : wt(e)),
    (t = typeof t == "function" ? t : t === void 0 ? q4 : wt(t));
  function s(u) {
    var c,
      d = (u = BO(u)).length,
      h,
      p = !1,
      v;
    for (r == null && (o = i((v = a()))), c = 0; c <= d; ++c)
      !(c < d && n((h = u[c]), c, u)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()),
        p && o.point(+e(h, c, u), +t(h, c, u));
    if (v) return (o = null), v + "" || null;
  }
  return (
    (s.x = function (u) {
      return arguments.length ? ((e = typeof u == "function" ? u : wt(+u)), s) : e;
    }),
    (s.y = function (u) {
      return arguments.length ? ((t = typeof u == "function" ? u : wt(+u)), s) : t;
    }),
    (s.defined = function (u) {
      return arguments.length ? ((n = typeof u == "function" ? u : wt(!!u)), s) : n;
    }),
    (s.curve = function (u) {
      return arguments.length ? ((i = u), r != null && (o = i(r)), s) : i;
    }),
    (s.context = function (u) {
      return arguments.length ? (u == null ? (r = o = null) : (o = i((r = u))), s) : r;
    }),
    s
  );
}
function Yh(e, t, n) {
  var r = null,
    i = wt(!0),
    o = null,
    a = qv,
    s = null,
    u = LO(c);
  (e = typeof e == "function" ? e : e === void 0 ? z4 : wt(+e)),
    (t = typeof t == "function" ? t : wt(t === void 0 ? 0 : +t)),
    (n = typeof n == "function" ? n : n === void 0 ? q4 : wt(+n));
  function c(h) {
    var p,
      v,
      b,
      y = (h = BO(h)).length,
      w,
      x = !1,
      S,
      _ = new Array(y),
      E = new Array(y);
    for (o == null && (s = a((S = u()))), p = 0; p <= y; ++p) {
      if (!(p < y && i((w = h[p]), p, h)) === x)
        if ((x = !x)) (v = p), s.areaStart(), s.lineStart();
        else {
          for (s.lineEnd(), s.lineStart(), b = p - 1; b >= v; --b) s.point(_[b], E[b]);
          s.lineEnd(), s.areaEnd();
        }
      x && ((_[p] = +e(w, p, h)), (E[p] = +t(w, p, h)), s.point(r ? +r(w, p, h) : _[p], n ? +n(w, p, h) : E[p]));
    }
    if (S) return (s = null), S + "" || null;
  }
  function d() {
    return W4().defined(i).curve(a).context(o);
  }
  return (
    (c.x = function (h) {
      return arguments.length ? ((e = typeof h == "function" ? h : wt(+h)), (r = null), c) : e;
    }),
    (c.x0 = function (h) {
      return arguments.length ? ((e = typeof h == "function" ? h : wt(+h)), c) : e;
    }),
    (c.x1 = function (h) {
      return arguments.length ? ((r = h == null ? null : typeof h == "function" ? h : wt(+h)), c) : r;
    }),
    (c.y = function (h) {
      return arguments.length ? ((t = typeof h == "function" ? h : wt(+h)), (n = null), c) : t;
    }),
    (c.y0 = function (h) {
      return arguments.length ? ((t = typeof h == "function" ? h : wt(+h)), c) : t;
    }),
    (c.y1 = function (h) {
      return arguments.length ? ((n = h == null ? null : typeof h == "function" ? h : wt(+h)), c) : n;
    }),
    (c.lineX0 = c.lineY0 =
      function () {
        return d().x(e).y(t);
      }),
    (c.lineY1 = function () {
      return d().x(e).y(n);
    }),
    (c.lineX1 = function () {
      return d().x(r).y(t);
    }),
    (c.defined = function (h) {
      return arguments.length ? ((i = typeof h == "function" ? h : wt(!!h)), c) : i;
    }),
    (c.curve = function (h) {
      return arguments.length ? ((a = h), o != null && (s = a(o)), c) : a;
    }),
    (c.context = function (h) {
      return arguments.length ? (h == null ? (o = s = null) : (s = a((o = h))), c) : o;
    }),
    c
  );
}
class U4 {
  constructor(t, n) {
    (this._context = t), (this._x = n);
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
  }
  point(t, n) {
    switch (((t = +t), (n = +n), this._point)) {
      case 0: {
        (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x
          ? this._context.bezierCurveTo((this._x0 = (this._x0 + t) / 2), this._y0, this._x0, n, t, n)
          : this._context.bezierCurveTo(this._x0, (this._y0 = (this._y0 + n) / 2), t, this._y0, t, n);
        break;
      }
    }
    (this._x0 = t), (this._y0 = n);
  }
}
function Ure(e) {
  return new U4(e, !0);
}
function Hre(e) {
  return new U4(e, !1);
}
const FO = {
    draw(e, t) {
      const n = ri(t / im);
      e.moveTo(n, 0), e.arc(0, 0, n, 0, zv);
    },
  },
  Kre = {
    draw(e, t) {
      const n = ri(t / 5) / 2;
      e.moveTo(-3 * n, -n),
        e.lineTo(-n, -n),
        e.lineTo(-n, -3 * n),
        e.lineTo(n, -3 * n),
        e.lineTo(n, -n),
        e.lineTo(3 * n, -n),
        e.lineTo(3 * n, n),
        e.lineTo(n, n),
        e.lineTo(n, 3 * n),
        e.lineTo(-n, 3 * n),
        e.lineTo(-n, n),
        e.lineTo(-3 * n, n),
        e.closePath();
    },
  },
  H4 = ri(1 / 3),
  Gre = H4 * 2,
  Yre = {
    draw(e, t) {
      const n = ri(t / Gre),
        r = n * H4;
      e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
    },
  },
  Xre = {
    draw(e, t) {
      const n = ri(t),
        r = -n / 2;
      e.rect(r, r, n, n);
    },
  },
  Zre = 0.8908130915292852,
  K4 = rm(im / 10) / rm((7 * im) / 10),
  Qre = rm(zv / 10) * K4,
  Jre = -B4(zv / 10) * K4,
  eie = {
    draw(e, t) {
      const n = ri(t * Zre),
        r = Qre * n,
        i = Jre * n;
      e.moveTo(0, -n), e.lineTo(r, i);
      for (let o = 1; o < 5; ++o) {
        const a = (zv * o) / 5,
          s = B4(a),
          u = rm(a);
        e.lineTo(u * n, -s * n), e.lineTo(s * r - u * i, u * r + s * i);
      }
      e.closePath();
    },
  },
  mw = ri(3),
  tie = {
    draw(e, t) {
      const n = -ri(t / (mw * 3));
      e.moveTo(0, n * 2), e.lineTo(-mw * n, -n), e.lineTo(mw * n, -n), e.closePath();
    },
  },
  xr = -0.5,
  Sr = ri(3) / 2,
  b_ = 1 / ri(12),
  nie = (b_ / 2 + 1) * 3,
  rie = {
    draw(e, t) {
      const n = ri(t / nie),
        r = n / 2,
        i = n * b_,
        o = r,
        a = n * b_ + n,
        s = -o,
        u = a;
      e.moveTo(r, i),
        e.lineTo(o, a),
        e.lineTo(s, u),
        e.lineTo(xr * r - Sr * i, Sr * r + xr * i),
        e.lineTo(xr * o - Sr * a, Sr * o + xr * a),
        e.lineTo(xr * s - Sr * u, Sr * s + xr * u),
        e.lineTo(xr * r + Sr * i, xr * i - Sr * r),
        e.lineTo(xr * o + Sr * a, xr * a - Sr * o),
        e.lineTo(xr * s + Sr * u, xr * u - Sr * s),
        e.closePath();
    },
  };
function iie(e, t) {
  let n = null,
    r = LO(i);
  (e = typeof e == "function" ? e : wt(e || FO)), (t = typeof t == "function" ? t : wt(t === void 0 ? 64 : +t));
  function i() {
    let o;
    if ((n || (n = o = r()), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), o))
      return (n = null), o + "" || null;
  }
  return (
    (i.type = function (o) {
      return arguments.length ? ((e = typeof o == "function" ? o : wt(o)), i) : e;
    }),
    (i.size = function (o) {
      return arguments.length ? ((t = typeof o == "function" ? o : wt(+o)), i) : t;
    }),
    (i.context = function (o) {
      return arguments.length ? ((n = o ?? null), i) : n;
    }),
    i
  );
}
function om() {}
function am(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6,
  );
}
function G4(e) {
  this._context = e;
}
G4.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        am(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        (this._point = 3), this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        am(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function oie(e) {
  return new G4(e);
}
function Y4(e) {
  this._context = e;
}
Y4.prototype = {
  areaStart: om,
  areaEnd: om,
  lineStart: function () {
    (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN),
      (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
          this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), (this._x2 = e), (this._y2 = t);
        break;
      case 1:
        (this._point = 2), (this._x3 = e), (this._y3 = t);
        break;
      case 2:
        (this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        am(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function aie(e) {
  return new Y4(e);
}
function X4(e) {
  this._context = e;
}
X4.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 3)) && this._context.closePath(), (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6,
          r = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
        break;
      case 3:
        this._point = 4;
      default:
        am(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function sie(e) {
  return new X4(e);
}
function Z4(e) {
  this._context = e;
}
Z4.prototype = {
  areaStart: om,
  areaEnd: om,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    this._point && this._context.closePath();
  },
  point: function (e, t) {
    (e = +e), (t = +t), this._point ? this._context.lineTo(e, t) : ((this._point = 1), this._context.moveTo(e, t));
  },
};
function lie(e) {
  return new Z4(e);
}
function PM(e) {
  return e < 0 ? -1 : 1;
}
function AM(e, t, n) {
  var r = e._x1 - e._x0,
    i = t - e._x1,
    o = (e._y1 - e._y0) / (r || (i < 0 && -0)),
    a = (n - e._y1) / (i || (r < 0 && -0)),
    s = (o * i + a * r) / (r + i);
  return (PM(o) + PM(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(s)) || 0;
}
function OM(e, t) {
  var n = e._x1 - e._x0;
  return n ? ((3 * (e._y1 - e._y0)) / n - t) / 2 : t;
}
function vw(e, t, n) {
  var r = e._x0,
    i = e._y0,
    o = e._x1,
    a = e._y1,
    s = (o - r) / 3;
  e._context.bezierCurveTo(r + s, i + s * t, o - s, a - s * n, o, a);
}
function sm(e) {
  this._context = e;
}
sm.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        vw(this, this._t0, OM(this, this._t0));
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(), (this._line = 1 - this._line);
  },
  point: function (e, t) {
    var n = NaN;
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3), vw(this, OM(this, (n = AM(this, e, t))), n);
          break;
        default:
          vw(this, this._t0, (n = AM(this, e, t)));
          break;
      }
      (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t), (this._t0 = n);
    }
  },
};
function Q4(e) {
  this._context = new J4(e);
}
(Q4.prototype = Object.create(sm.prototype)).point = function (e, t) {
  sm.prototype.point.call(this, t, e);
};
function J4(e) {
  this._context = e;
}
J4.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function (e, t, n, r, i, o) {
    this._context.bezierCurveTo(t, e, r, n, o, i);
  },
};
function uie(e) {
  return new sm(e);
}
function cie(e) {
  return new Q4(e);
}
function e8(e) {
  this._context = e;
}
e8.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = []), (this._y = []);
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      n = e.length;
    if (n)
      if ((this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2))
        this._context.lineTo(e[1], t[1]);
      else
        for (var r = EM(e), i = EM(t), o = 0, a = 1; a < n; ++o, ++a)
          this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], e[a], t[a]);
    (this._line || (this._line !== 0 && n === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null);
  },
  point: function (e, t) {
    this._x.push(+e), this._y.push(+t);
  },
};
function EM(e) {
  var t,
    n = e.length - 1,
    r,
    i = new Array(n),
    o = new Array(n),
    a = new Array(n);
  for (i[0] = 0, o[0] = 2, a[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t)
    (i[t] = 1), (o[t] = 4), (a[t] = 4 * e[t] + 2 * e[t + 1]);
  for (i[n - 1] = 2, o[n - 1] = 7, a[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t)
    (r = i[t] / o[t - 1]), (o[t] -= r), (a[t] -= r * a[t - 1]);
  for (i[n - 1] = a[n - 1] / o[n - 1], t = n - 2; t >= 0; --t) i[t] = (a[t] - i[t + 1]) / o[t];
  for (o[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) o[t] = 2 * e[t + 1] - i[t + 1];
  return [i, o];
}
function fie(e) {
  return new e8(e);
}
function Wv(e, t) {
  (this._context = e), (this._t = t);
}
Wv.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = this._y = NaN), (this._point = 0);
  },
  lineEnd: function () {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      this._line >= 0 && ((this._t = 1 - this._t), (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(n, this._y), this._context.lineTo(n, t);
        }
        break;
      }
    }
    (this._x = e), (this._y = t);
  },
};
function die(e) {
  return new Wv(e, 0.5);
}
function hie(e) {
  return new Wv(e, 0);
}
function pie(e) {
  return new Wv(e, 1);
}
function $l(e, t) {
  if ((a = e.length) > 1)
    for (var n = 1, r, i, o = e[t[0]], a, s = o.length; n < a; ++n)
      for (i = o, o = e[t[n]], r = 0; r < s; ++r) o[r][1] += o[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
function w_(e) {
  for (var t = e.length, n = new Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function mie(e, t) {
  return e[t];
}
function vie(e) {
  const t = [];
  return (t.key = e), t;
}
function yie() {
  var e = wt([]),
    t = w_,
    n = $l,
    r = mie;
  function i(o) {
    var a = Array.from(e.apply(this, arguments), vie),
      s,
      u = a.length,
      c = -1,
      d;
    for (const h of o) for (s = 0, ++c; s < u; ++s) (a[s][c] = [0, +r(h, a[s].key, c, o)]).data = h;
    for (s = 0, d = BO(t(a)); s < u; ++s) a[d[s]].index = s;
    return n(a, d), a;
  }
  return (
    (i.keys = function (o) {
      return arguments.length ? ((e = typeof o == "function" ? o : wt(Array.from(o))), i) : e;
    }),
    (i.value = function (o) {
      return arguments.length ? ((r = typeof o == "function" ? o : wt(+o)), i) : r;
    }),
    (i.order = function (o) {
      return arguments.length ? ((t = o == null ? w_ : typeof o == "function" ? o : wt(Array.from(o))), i) : t;
    }),
    (i.offset = function (o) {
      return arguments.length ? ((n = o ?? $l), i) : n;
    }),
    i
  );
}
function gie(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, i = 0, o = e[0].length, a; i < o; ++i) {
      for (a = n = 0; n < r; ++n) a += e[n][i][1] || 0;
      if (a) for (n = 0; n < r; ++n) e[n][i][1] /= a;
    }
    $l(e, t);
  }
}
function bie(e, t) {
  if ((i = e.length) > 0) {
    for (var n = 0, r = e[t[0]], i, o = r.length; n < o; ++n) {
      for (var a = 0, s = 0; a < i; ++a) s += e[a][n][1] || 0;
      r[n][1] += r[n][0] = -s / 2;
    }
    $l(e, t);
  }
}
function wie(e, t) {
  if (!(!((a = e.length) > 0) || !((o = (i = e[t[0]]).length) > 0))) {
    for (var n = 0, r = 1, i, o, a; r < o; ++r) {
      for (var s = 0, u = 0, c = 0; s < a; ++s) {
        for (var d = e[t[s]], h = d[r][1] || 0, p = d[r - 1][1] || 0, v = (h - p) / 2, b = 0; b < s; ++b) {
          var y = e[t[b]],
            w = y[r][1] || 0,
            x = y[r - 1][1] || 0;
          v += w - x;
        }
        (u += h), (c += v * h);
      }
      (i[r - 1][1] += i[r - 1][0] = n), u && (n -= c / u);
    }
    (i[r - 1][1] += i[r - 1][0] = n), $l(e, t);
  }
}
function vf(e) {
  "@babel/helpers - typeof";

  return (
    (vf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    vf(e)
  );
}
var xie = ["type", "size", "sizeType"];
function x_() {
  return (
    (x_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    x_.apply(this, arguments)
  );
}
function TM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function CM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? TM(Object(n), !0).forEach(function (r) {
          Sie(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : TM(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Sie(e, t, n) {
  return (
    (t = _ie(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function _ie(e) {
  var t = Pie(e, "string");
  return vf(t) == "symbol" ? t : t + "";
}
function Pie(e, t) {
  if (vf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (vf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Aie(e, t) {
  if (e == null) return {};
  var n = Oie(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Oie(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var t8 = {
    symbolCircle: FO,
    symbolCross: Kre,
    symbolDiamond: Yre,
    symbolSquare: Xre,
    symbolStar: eie,
    symbolTriangle: tie,
    symbolWye: rie,
  },
  Eie = Math.PI / 180,
  Tie = function (t) {
    var n = "symbol".concat(Vv(t));
    return t8[n] || FO;
  },
  Cie = function (t, n, r) {
    if (n === "area") return t;
    switch (r) {
      case "cross":
        return (5 * t * t) / 9;
      case "diamond":
        return (0.5 * t * t) / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * Eie;
        return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2));
      }
      case "triangle":
        return (Math.sqrt(3) * t * t) / 4;
      case "wye":
        return ((21 - 10 * Math.sqrt(3)) * t * t) / 8;
      default:
        return (Math.PI * t * t) / 4;
    }
  },
  kie = function (t, n) {
    t8["symbol".concat(Vv(t))] = n;
  },
  VO = function (t) {
    var n = t.type,
      r = n === void 0 ? "circle" : n,
      i = t.size,
      o = i === void 0 ? 64 : i,
      a = t.sizeType,
      s = a === void 0 ? "area" : a,
      u = Aie(t, xie),
      c = CM(
        CM({}, u),
        {},
        {
          type: r,
          size: o,
          sizeType: s,
        },
      ),
      d = function () {
        var w = Tie(r),
          x = iie()
            .type(w)
            .size(Cie(o, s, r));
        return x();
      },
      h = c.className,
      p = c.cx,
      v = c.cy,
      b = rt(c, !0);
    return p === +p && v === +v && o === +o
      ? ReactDefault.createElement(
          "path",
          x_({}, b, {
            className: We("recharts-symbols", h),
            transform: "translate(".concat(p, ", ").concat(v, ")"),
            d: d(),
          }),
        )
      : null;
  };
VO.registerSymbol = kie;
function Ll(e) {
  "@babel/helpers - typeof";

  return (
    (Ll =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ll(e)
  );
}
function S_() {
  return (
    (S_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    S_.apply(this, arguments)
  );
}
function kM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function jie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? kM(Object(n), !0).forEach(function (r) {
          yf(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : kM(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Rie(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Mie(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r8(r.key), r);
  }
}
function Nie(e, t, n) {
  return (
    t && Mie(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Iie(e, t, n) {
  return (t = lm(t)), Die(e, n8() ? Reflect.construct(t, n || [], lm(e).constructor) : t.apply(e, n));
}
function Die(e, t) {
  if (t && (Ll(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $ie(e);
}
function $ie(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function n8() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (n8 = function () {
    return !!e;
  })();
}
function lm(e) {
  return (
    (lm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    lm(e)
  );
}
function Lie(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && __(e, t);
}
function __(e, t) {
  return (
    (__ = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    __(e, t)
  );
}
function yf(e, t, n) {
  return (
    (t = r8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function r8(e) {
  var t = Bie(e, "string");
  return Ll(t) == "symbol" ? t : t + "";
}
function Bie(e, t) {
  if (Ll(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ll(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var _r = 32,
  zO = (function (e) {
    function t() {
      return Rie(this, t), Iie(this, t, arguments);
    }
    return (
      Lie(t, e),
      Nie(t, [
        {
          key: "renderIcon",
          value: function (r) {
            var i = this.props.inactiveColor,
              o = _r / 2,
              a = _r / 6,
              s = _r / 3,
              u = r.inactive ? i : r.color;
            if (r.type === "plainline")
              return ReactDefault.createElement("line", {
                strokeWidth: 4,
                fill: "none",
                stroke: u,
                strokeDasharray: r.payload.strokeDasharray,
                x1: 0,
                y1: o,
                x2: _r,
                y2: o,
                className: "recharts-legend-icon",
              });
            if (r.type === "line")
              return ReactDefault.createElement("path", {
                strokeWidth: 4,
                fill: "none",
                stroke: u,
                d: "M0,"
                  .concat(o, "h")
                  .concat(
                    s,
                    `
            A`,
                  )
                  .concat(a, ",")
                  .concat(a, ",0,1,1,")
                  .concat(2 * s, ",")
                  .concat(
                    o,
                    `
            H`,
                  )
                  .concat(_r, "M")
                  .concat(2 * s, ",")
                  .concat(
                    o,
                    `
            A`,
                  )
                  .concat(a, ",")
                  .concat(a, ",0,1,1,")
                  .concat(s, ",")
                  .concat(o),
                className: "recharts-legend-icon",
              });
            if (r.type === "rect")
              return ReactDefault.createElement("path", {
                stroke: "none",
                fill: u,
                d: "M0,"
                  .concat(_r / 8, "h")
                  .concat(_r, "v")
                  .concat((_r * 3) / 4, "h")
                  .concat(-_r, "z"),
                className: "recharts-legend-icon",
              });
            if (ReactDefault.isValidElement(r.legendIcon)) {
              var c = jie({}, r);
              return delete c.legendIcon, ReactDefault.cloneElement(r.legendIcon, c);
            }
            return ReactDefault.createElement(VO, {
              fill: u,
              cx: o,
              cy: o,
              size: _r,
              sizeType: "diameter",
              type: r.type,
            });
          },
        },
        {
          key: "renderItems",
          value: function () {
            var r = this,
              i = this.props,
              o = i.payload,
              a = i.iconSize,
              s = i.layout,
              u = i.formatter,
              c = i.inactiveColor,
              d = {
                x: 0,
                y: 0,
                width: _r,
                height: _r,
              },
              h = {
                display: s === "horizontal" ? "inline-block" : "block",
                marginRight: 10,
              },
              p = {
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: 4,
              };
            return o.map(function (v, b) {
              var y = v.formatter || u,
                w = We(
                  yf(
                    yf(
                      {
                        "recharts-legend-item": !0,
                      },
                      "legend-item-".concat(b),
                      !0,
                    ),
                    "inactive",
                    v.inactive,
                  ),
                );
              if (v.type === "none") return null;
              var x = nt(v.value) ? null : v.value;
              os(
                !nt(v.value),
                `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`,
              );
              var S = v.inactive ? c : v.color;
              return ReactDefault.createElement(
                "li",
                S_(
                  {
                    className: w,
                    style: h,
                    key: "legend-item-".concat(b),
                  },
                  nm(r.props, v, b),
                ),
                ReactDefault.createElement(
                  m_,
                  {
                    width: a,
                    height: a,
                    viewBox: d,
                    style: p,
                  },
                  r.renderIcon(v),
                ),
                ReactDefault.createElement(
                  "span",
                  {
                    className: "recharts-legend-item-text",
                    style: {
                      color: S,
                    },
                  },
                  y ? y(x, v, b) : x,
                ),
              );
            });
          },
        },
        {
          key: "render",
          value: function () {
            var r = this.props,
              i = r.payload,
              o = r.layout,
              a = r.align;
            if (!i || !i.length) return null;
            var s = {
              padding: 0,
              margin: 0,
              textAlign: o === "horizontal" ? a : "left",
            };
            return ReactDefault.createElement(
              "ul",
              {
                className: "recharts-default-legend",
                style: s,
              },
              this.renderItems(),
            );
          },
        },
      ])
    );
  })(React.PureComponent);
yf(zO, "displayName", "Legend");
yf(zO, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc",
});
var yw, jM;
function Fie() {
  if (jM) return yw;
  jM = 1;
  var e = Lv();
  function t() {
    (this.__data__ = new e()), (this.size = 0);
  }
  return (yw = t), yw;
}
var gw, RM;
function Vie() {
  if (RM) return gw;
  RM = 1;
  function e(t) {
    var n = this.__data__,
      r = n.delete(t);
    return (this.size = n.size), r;
  }
  return (gw = e), gw;
}
var bw, MM;
function zie() {
  if (MM) return bw;
  MM = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return (bw = e), bw;
}
var ww, NM;
function qie() {
  if (NM) return ww;
  NM = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return (ww = e), ww;
}
var xw, IM;
function Wie() {
  if (IM) return xw;
  IM = 1;
  var e = Lv(),
    t = RO(),
    n = MO(),
    r = 200;
  function i(o, a) {
    var s = this.__data__;
    if (s instanceof e) {
      var u = s.__data__;
      if (!t || u.length < r - 1) return u.push([o, a]), (this.size = ++s.size), this;
      s = this.__data__ = new n(u);
    }
    return s.set(o, a), (this.size = s.size), this;
  }
  return (xw = i), xw;
}
var Sw, DM;
function i8() {
  if (DM) return Sw;
  DM = 1;
  var e = Lv(),
    t = Fie(),
    n = Vie(),
    r = zie(),
    i = qie(),
    o = Wie();
  function a(s) {
    var u = (this.__data__ = new e(s));
    this.size = u.size;
  }
  return (
    (a.prototype.clear = t),
    (a.prototype.delete = n),
    (a.prototype.get = r),
    (a.prototype.has = i),
    (a.prototype.set = o),
    (Sw = a),
    Sw
  );
}
var _w, $M;
function Uie() {
  if ($M) return _w;
  $M = 1;
  var e = "__lodash_hash_undefined__";
  function t(n) {
    return this.__data__.set(n, e), this;
  }
  return (_w = t), _w;
}
var Pw, LM;
function Hie() {
  if (LM) return Pw;
  LM = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return (Pw = e), Pw;
}
var Aw, BM;
function o8() {
  if (BM) return Aw;
  BM = 1;
  var e = MO(),
    t = Uie(),
    n = Hie();
  function r(i) {
    var o = -1,
      a = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++o < a; ) this.add(i[o]);
  }
  return (r.prototype.add = r.prototype.push = t), (r.prototype.has = n), (Aw = r), Aw;
}
var Ow, FM;
function a8() {
  if (FM) return Ow;
  FM = 1;
  function e(t, n) {
    for (var r = -1, i = t == null ? 0 : t.length; ++r < i; ) if (n(t[r], r, t)) return !0;
    return !1;
  }
  return (Ow = e), Ow;
}
var Ew, VM;
function s8() {
  if (VM) return Ew;
  VM = 1;
  function e(t, n) {
    return t.has(n);
  }
  return (Ew = e), Ew;
}
var Tw, zM;
function l8() {
  if (zM) return Tw;
  zM = 1;
  var e = o8(),
    t = a8(),
    n = s8(),
    r = 1,
    i = 2;
  function o(a, s, u, c, d, h) {
    var p = u & r,
      v = a.length,
      b = s.length;
    if (v != b && !(p && b > v)) return !1;
    var y = h.get(a),
      w = h.get(s);
    if (y && w) return y == s && w == a;
    var x = -1,
      S = !0,
      _ = u & i ? new e() : void 0;
    for (h.set(a, s), h.set(s, a); ++x < v; ) {
      var E = a[x],
        P = s[x];
      if (c) var O = p ? c(P, E, x, s, a, h) : c(E, P, x, a, s, h);
      if (O !== void 0) {
        if (O) continue;
        S = !1;
        break;
      }
      if (_) {
        if (
          !t(s, function (k, R) {
            if (!n(_, R) && (E === k || d(E, k, u, c, h))) return _.push(R);
          })
        ) {
          S = !1;
          break;
        }
      } else if (!(E === P || d(E, P, u, c, h))) {
        S = !1;
        break;
      }
    }
    return h.delete(a), h.delete(s), S;
  }
  return (Tw = o), Tw;
}
var Cw, qM;
function Kie() {
  if (qM) return Cw;
  qM = 1;
  var e = Ci(),
    t = e.Uint8Array;
  return (Cw = t), Cw;
}
var kw, WM;
function Gie() {
  if (WM) return kw;
  WM = 1;
  function e(t) {
    var n = -1,
      r = Array(t.size);
    return (
      t.forEach(function (i, o) {
        r[++n] = [o, i];
      }),
      r
    );
  }
  return (kw = e), kw;
}
var jw, UM;
function qO() {
  if (UM) return jw;
  UM = 1;
  function e(t) {
    var n = -1,
      r = Array(t.size);
    return (
      t.forEach(function (i) {
        r[++n] = i;
      }),
      r
    );
  }
  return (jw = e), jw;
}
var Rw, HM;
function Yie() {
  if (HM) return Rw;
  HM = 1;
  var e = pd(),
    t = Kie(),
    n = jO(),
    r = l8(),
    i = Gie(),
    o = qO(),
    a = 1,
    s = 2,
    u = "[object Boolean]",
    c = "[object Date]",
    d = "[object Error]",
    h = "[object Map]",
    p = "[object Number]",
    v = "[object RegExp]",
    b = "[object Set]",
    y = "[object String]",
    w = "[object Symbol]",
    x = "[object ArrayBuffer]",
    S = "[object DataView]",
    _ = e ? e.prototype : void 0,
    E = _ ? _.valueOf : void 0;
  function P(O, k, R, M, D, I, V) {
    switch (R) {
      case S:
        if (O.byteLength != k.byteLength || O.byteOffset != k.byteOffset) return !1;
        (O = O.buffer), (k = k.buffer);
      case x:
        return !(O.byteLength != k.byteLength || !I(new t(O), new t(k)));
      case u:
      case c:
      case p:
        return n(+O, +k);
      case d:
        return O.name == k.name && O.message == k.message;
      case v:
      case y:
        return O == k + "";
      case h:
        var z = i;
      case b:
        var q = M & a;
        if ((z || (z = o), O.size != k.size && !q)) return !1;
        var U = V.get(O);
        if (U) return U == k;
        (M |= s), V.set(O, k);
        var B = r(z(O), z(k), M, D, I, V);
        return V.delete(O), B;
      case w:
        if (E) return E.call(O) == E.call(k);
    }
    return !1;
  }
  return (Rw = P), Rw;
}
var Mw, KM;
function u8() {
  if (KM) return Mw;
  KM = 1;
  function e(t, n) {
    for (var r = -1, i = n.length, o = t.length; ++r < i; ) t[o + r] = n[r];
    return t;
  }
  return (Mw = e), Mw;
}
var Nw, GM;
function Xie() {
  if (GM) return Nw;
  GM = 1;
  var e = u8(),
    t = er();
  function n(r, i, o) {
    var a = i(r);
    return t(r) ? a : e(a, o(r));
  }
  return (Nw = n), Nw;
}
var Iw, YM;
function Zie() {
  if (YM) return Iw;
  YM = 1;
  function e(t, n) {
    for (var r = -1, i = t == null ? 0 : t.length, o = 0, a = []; ++r < i; ) {
      var s = t[r];
      n(s, r, t) && (a[o++] = s);
    }
    return a;
  }
  return (Iw = e), Iw;
}
var Dw, XM;
function Qie() {
  if (XM) return Dw;
  XM = 1;
  function e() {
    return [];
  }
  return (Dw = e), Dw;
}
var $w, ZM;
function Jie() {
  if (ZM) return $w;
  ZM = 1;
  var e = Zie(),
    t = Qie(),
    n = Object.prototype,
    r = n.propertyIsEnumerable,
    i = Object.getOwnPropertySymbols,
    o = i
      ? function (a) {
          return a == null
            ? []
            : ((a = Object(a)),
              e(i(a), function (s) {
                return r.call(a, s);
              }));
        }
      : t;
  return ($w = o), $w;
}
var Lw, QM;
function eoe() {
  if (QM) return Lw;
  QM = 1;
  function e(t, n) {
    for (var r = -1, i = Array(t); ++r < t; ) i[r] = n(r);
    return i;
  }
  return (Lw = e), Lw;
}
var Bw, JM;
function toe() {
  if (JM) return Bw;
  JM = 1;
  var e = wo(),
    t = xo(),
    n = "[object Arguments]";
  function r(i) {
    return t(i) && e(i) == n;
  }
  return (Bw = r), Bw;
}
var Fw, eN;
function WO() {
  if (eN) return Fw;
  eN = 1;
  var e = toe(),
    t = xo(),
    n = Object.prototype,
    r = n.hasOwnProperty,
    i = n.propertyIsEnumerable,
    o = e(
      (function () {
        return arguments;
      })(),
    )
      ? e
      : function (a) {
          return t(a) && r.call(a, "callee") && !i.call(a, "callee");
        };
  return (Fw = o), Fw;
}
var jc = {
    exports: {},
  },
  Vw,
  tN;
function noe() {
  if (tN) return Vw;
  tN = 1;
  function e() {
    return !1;
  }
  return (Vw = e), Vw;
}
jc.exports;
var nN;
function c8() {
  return (
    nN ||
      ((nN = 1),
      (function (e, t) {
        var n = Ci(),
          r = noe(),
          i = t && !t.nodeType && t,
          o = i && !0 && e && !e.nodeType && e,
          a = o && o.exports === i,
          s = a ? n.Buffer : void 0,
          u = s ? s.isBuffer : void 0,
          c = u || r;
        e.exports = c;
      })(jc, jc.exports)),
    jc.exports
  );
}
var zw, rN;
function UO() {
  if (rN) return zw;
  rN = 1;
  var e = 9007199254740991,
    t = /^(?:0|[1-9]\d*)$/;
  function n(r, i) {
    var o = typeof r;
    return (i = i ?? e), !!i && (o == "number" || (o != "symbol" && t.test(r))) && r > -1 && r % 1 == 0 && r < i;
  }
  return (zw = n), zw;
}
var qw, iN;
function HO() {
  if (iN) return qw;
  iN = 1;
  var e = 9007199254740991;
  function t(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= e;
  }
  return (qw = t), qw;
}
var Ww, oN;
function roe() {
  if (oN) return Ww;
  oN = 1;
  var e = wo(),
    t = HO(),
    n = xo(),
    r = "[object Arguments]",
    i = "[object Array]",
    o = "[object Boolean]",
    a = "[object Date]",
    s = "[object Error]",
    u = "[object Function]",
    c = "[object Map]",
    d = "[object Number]",
    h = "[object Object]",
    p = "[object RegExp]",
    v = "[object Set]",
    b = "[object String]",
    y = "[object WeakMap]",
    w = "[object ArrayBuffer]",
    x = "[object DataView]",
    S = "[object Float32Array]",
    _ = "[object Float64Array]",
    E = "[object Int8Array]",
    P = "[object Int16Array]",
    O = "[object Int32Array]",
    k = "[object Uint8Array]",
    R = "[object Uint8ClampedArray]",
    M = "[object Uint16Array]",
    D = "[object Uint32Array]",
    I = {};
  (I[S] = I[_] = I[E] = I[P] = I[O] = I[k] = I[R] = I[M] = I[D] = !0),
    (I[r] = I[i] = I[w] = I[o] = I[x] = I[a] = I[s] = I[u] = I[c] = I[d] = I[h] = I[p] = I[v] = I[b] = I[y] = !1);
  function V(z) {
    return n(z) && t(z.length) && !!I[e(z)];
  }
  return (Ww = V), Ww;
}
var Uw, aN;
function f8() {
  if (aN) return Uw;
  aN = 1;
  function e(t) {
    return function (n) {
      return t(n);
    };
  }
  return (Uw = e), Uw;
}
var Rc = {
  exports: {},
};
Rc.exports;
var sN;
function ioe() {
  return (
    sN ||
      ((sN = 1),
      (function (e, t) {
        var n = j4(),
          r = t && !t.nodeType && t,
          i = r && !0 && e && !e.nodeType && e,
          o = i && i.exports === r,
          a = o && n.process,
          s = (function () {
            try {
              var u = i && i.require && i.require("util").types;
              return u || (a && a.binding && a.binding("util"));
            } catch {}
          })();
        e.exports = s;
      })(Rc, Rc.exports)),
    Rc.exports
  );
}
var Hw, lN;
function d8() {
  if (lN) return Hw;
  lN = 1;
  var e = roe(),
    t = f8(),
    n = ioe(),
    r = n && n.isTypedArray,
    i = r ? t(r) : e;
  return (Hw = i), Hw;
}
var Kw, uN;
function ooe() {
  if (uN) return Kw;
  uN = 1;
  var e = eoe(),
    t = WO(),
    n = er(),
    r = c8(),
    i = UO(),
    o = d8(),
    a = Object.prototype,
    s = a.hasOwnProperty;
  function u(c, d) {
    var h = n(c),
      p = !h && t(c),
      v = !h && !p && r(c),
      b = !h && !p && !v && o(c),
      y = h || p || v || b,
      w = y ? e(c.length, String) : [],
      x = w.length;
    for (var S in c)
      (d || s.call(c, S)) &&
        !(
          y &&
          (S == "length" ||
            (v && (S == "offset" || S == "parent")) ||
            (b && (S == "buffer" || S == "byteLength" || S == "byteOffset")) ||
            i(S, x))
        ) &&
        w.push(S);
    return w;
  }
  return (Kw = u), Kw;
}
var Gw, cN;
function aoe() {
  if (cN) return Gw;
  cN = 1;
  var e = Object.prototype;
  function t(n) {
    var r = n && n.constructor,
      i = (typeof r == "function" && r.prototype) || e;
    return n === i;
  }
  return (Gw = t), Gw;
}
var Yw, fN;
function h8() {
  if (fN) return Yw;
  fN = 1;
  function e(t, n) {
    return function (r) {
      return t(n(r));
    };
  }
  return (Yw = e), Yw;
}
var Xw, dN;
function soe() {
  if (dN) return Xw;
  dN = 1;
  var e = h8(),
    t = e(Object.keys, Object);
  return (Xw = t), Xw;
}
var Zw, hN;
function loe() {
  if (hN) return Zw;
  hN = 1;
  var e = aoe(),
    t = soe(),
    n = Object.prototype,
    r = n.hasOwnProperty;
  function i(o) {
    if (!e(o)) return t(o);
    var a = [];
    for (var s in Object(o)) r.call(o, s) && s != "constructor" && a.push(s);
    return a;
  }
  return (Zw = i), Zw;
}
var Qw, pN;
function vd() {
  if (pN) return Qw;
  pN = 1;
  var e = kO(),
    t = HO();
  function n(r) {
    return r != null && t(r.length) && !e(r);
  }
  return (Qw = n), Qw;
}
var Jw, mN;
function Uv() {
  if (mN) return Jw;
  mN = 1;
  var e = ooe(),
    t = loe(),
    n = vd();
  function r(i) {
    return n(i) ? e(i) : t(i);
  }
  return (Jw = r), Jw;
}
var e1, vN;
function uoe() {
  if (vN) return e1;
  vN = 1;
  var e = Xie(),
    t = Jie(),
    n = Uv();
  function r(i) {
    return e(i, n, t);
  }
  return (e1 = r), e1;
}
var t1, yN;
function coe() {
  if (yN) return t1;
  yN = 1;
  var e = uoe(),
    t = 1,
    n = Object.prototype,
    r = n.hasOwnProperty;
  function i(o, a, s, u, c, d) {
    var h = s & t,
      p = e(o),
      v = p.length,
      b = e(a),
      y = b.length;
    if (v != y && !h) return !1;
    for (var w = v; w--; ) {
      var x = p[w];
      if (!(h ? x in a : r.call(a, x))) return !1;
    }
    var S = d.get(o),
      _ = d.get(a);
    if (S && _) return S == a && _ == o;
    var E = !0;
    d.set(o, a), d.set(a, o);
    for (var P = h; ++w < v; ) {
      x = p[w];
      var O = o[x],
        k = a[x];
      if (u) var R = h ? u(k, O, x, a, o, d) : u(O, k, x, o, a, d);
      if (!(R === void 0 ? O === k || c(O, k, s, u, d) : R)) {
        E = !1;
        break;
      }
      P || (P = x == "constructor");
    }
    if (E && !P) {
      var M = o.constructor,
        D = a.constructor;
      M != D &&
        "constructor" in o &&
        "constructor" in a &&
        !(typeof M == "function" && M instanceof M && typeof D == "function" && D instanceof D) &&
        (E = !1);
    }
    return d.delete(o), d.delete(a), E;
  }
  return (t1 = i), t1;
}
var n1, gN;
function foe() {
  if (gN) return n1;
  gN = 1;
  var e = ws(),
    t = Ci(),
    n = e(t, "DataView");
  return (n1 = n), n1;
}
var r1, bN;
function doe() {
  if (bN) return r1;
  bN = 1;
  var e = ws(),
    t = Ci(),
    n = e(t, "Promise");
  return (r1 = n), r1;
}
var i1, wN;
function p8() {
  if (wN) return i1;
  wN = 1;
  var e = ws(),
    t = Ci(),
    n = e(t, "Set");
  return (i1 = n), i1;
}
var o1, xN;
function hoe() {
  if (xN) return o1;
  xN = 1;
  var e = ws(),
    t = Ci(),
    n = e(t, "WeakMap");
  return (o1 = n), o1;
}
var a1, SN;
function poe() {
  if (SN) return a1;
  SN = 1;
  var e = foe(),
    t = RO(),
    n = doe(),
    r = p8(),
    i = hoe(),
    o = wo(),
    a = R4(),
    s = "[object Map]",
    u = "[object Object]",
    c = "[object Promise]",
    d = "[object Set]",
    h = "[object WeakMap]",
    p = "[object DataView]",
    v = a(e),
    b = a(t),
    y = a(n),
    w = a(r),
    x = a(i),
    S = o;
  return (
    ((e && S(new e(new ArrayBuffer(1))) != p) ||
      (t && S(new t()) != s) ||
      (n && S(n.resolve()) != c) ||
      (r && S(new r()) != d) ||
      (i && S(new i()) != h)) &&
      (S = function (_) {
        var E = o(_),
          P = E == u ? _.constructor : void 0,
          O = P ? a(P) : "";
        if (O)
          switch (O) {
            case v:
              return p;
            case b:
              return s;
            case y:
              return c;
            case w:
              return d;
            case x:
              return h;
          }
        return E;
      }),
    (a1 = S),
    a1
  );
}
var s1, _N;
function moe() {
  if (_N) return s1;
  _N = 1;
  var e = i8(),
    t = l8(),
    n = Yie(),
    r = coe(),
    i = poe(),
    o = er(),
    a = c8(),
    s = d8(),
    u = 1,
    c = "[object Arguments]",
    d = "[object Array]",
    h = "[object Object]",
    p = Object.prototype,
    v = p.hasOwnProperty;
  function b(y, w, x, S, _, E) {
    var P = o(y),
      O = o(w),
      k = P ? d : i(y),
      R = O ? d : i(w);
    (k = k == c ? h : k), (R = R == c ? h : R);
    var M = k == h,
      D = R == h,
      I = k == R;
    if (I && a(y)) {
      if (!a(w)) return !1;
      (P = !0), (M = !1);
    }
    if (I && !M) return E || (E = new e()), P || s(y) ? t(y, w, x, S, _, E) : n(y, w, k, x, S, _, E);
    if (!(x & u)) {
      var V = M && v.call(y, "__wrapped__"),
        z = D && v.call(w, "__wrapped__");
      if (V || z) {
        var q = V ? y.value() : y,
          U = z ? w.value() : w;
        return E || (E = new e()), _(q, U, x, S, E);
      }
    }
    return I ? (E || (E = new e()), r(y, w, x, S, _, E)) : !1;
  }
  return (s1 = b), s1;
}
var l1, PN;
function KO() {
  if (PN) return l1;
  PN = 1;
  var e = moe(),
    t = xo();
  function n(r, i, o, a, s) {
    return r === i ? !0 : r == null || i == null || (!t(r) && !t(i)) ? r !== r && i !== i : e(r, i, o, a, n, s);
  }
  return (l1 = n), l1;
}
var u1, AN;
function voe() {
  if (AN) return u1;
  AN = 1;
  var e = i8(),
    t = KO(),
    n = 1,
    r = 2;
  function i(o, a, s, u) {
    var c = s.length,
      d = c,
      h = !u;
    if (o == null) return !d;
    for (o = Object(o); c--; ) {
      var p = s[c];
      if (h && p[2] ? p[1] !== o[p[0]] : !(p[0] in o)) return !1;
    }
    for (; ++c < d; ) {
      p = s[c];
      var v = p[0],
        b = o[v],
        y = p[1];
      if (h && p[2]) {
        if (b === void 0 && !(v in o)) return !1;
      } else {
        var w = new e();
        if (u) var x = u(b, y, v, o, a, w);
        if (!(x === void 0 ? t(y, b, n | r, u, w) : x)) return !1;
      }
    }
    return !0;
  }
  return (u1 = i), u1;
}
var c1, ON;
function m8() {
  if (ON) return c1;
  ON = 1;
  var e = va();
  function t(n) {
    return n === n && !e(n);
  }
  return (c1 = t), c1;
}
var f1, EN;
function yoe() {
  if (EN) return f1;
  EN = 1;
  var e = m8(),
    t = Uv();
  function n(r) {
    for (var i = t(r), o = i.length; o--; ) {
      var a = i[o],
        s = r[a];
      i[o] = [a, s, e(s)];
    }
    return i;
  }
  return (f1 = n), f1;
}
var d1, TN;
function v8() {
  if (TN) return d1;
  TN = 1;
  function e(t, n) {
    return function (r) {
      return r == null ? !1 : r[t] === n && (n !== void 0 || t in Object(r));
    };
  }
  return (d1 = e), d1;
}
var h1, CN;
function goe() {
  if (CN) return h1;
  CN = 1;
  var e = voe(),
    t = yoe(),
    n = v8();
  function r(i) {
    var o = t(i);
    return o.length == 1 && o[0][2]
      ? n(o[0][0], o[0][1])
      : function (a) {
          return a === i || e(a, i, o);
        };
  }
  return (h1 = r), h1;
}
var p1, kN;
function boe() {
  if (kN) return p1;
  kN = 1;
  function e(t, n) {
    return t != null && n in Object(t);
  }
  return (p1 = e), p1;
}
var m1, jN;
function woe() {
  if (jN) return m1;
  jN = 1;
  var e = I4(),
    t = WO(),
    n = er(),
    r = UO(),
    i = HO(),
    o = Fv();
  function a(s, u, c) {
    u = e(u, s);
    for (var d = -1, h = u.length, p = !1; ++d < h; ) {
      var v = o(u[d]);
      if (!(p = s != null && c(s, v))) break;
      s = s[v];
    }
    return p || ++d != h ? p : ((h = s == null ? 0 : s.length), !!h && i(h) && r(v, h) && (n(s) || t(s)));
  }
  return (m1 = a), m1;
}
var v1, RN;
function xoe() {
  if (RN) return v1;
  RN = 1;
  var e = boe(),
    t = woe();
  function n(r, i) {
    return r != null && t(r, i, e);
  }
  return (v1 = n), v1;
}
var y1, MN;
function Soe() {
  if (MN) return y1;
  MN = 1;
  var e = KO(),
    t = D4(),
    n = xoe(),
    r = CO(),
    i = m8(),
    o = v8(),
    a = Fv(),
    s = 1,
    u = 2;
  function c(d, h) {
    return r(d) && i(h)
      ? o(a(d), h)
      : function (p) {
          var v = t(p, d);
          return v === void 0 && v === h ? n(p, d) : e(h, v, s | u);
        };
  }
  return (y1 = c), y1;
}
var g1, NN;
function Su() {
  if (NN) return g1;
  NN = 1;
  function e(t) {
    return t;
  }
  return (g1 = e), g1;
}
var b1, IN;
function _oe() {
  if (IN) return b1;
  IN = 1;
  function e(t) {
    return function (n) {
      return n?.[t];
    };
  }
  return (b1 = e), b1;
}
var w1, DN;
function Poe() {
  if (DN) return w1;
  DN = 1;
  var e = IO();
  function t(n) {
    return function (r) {
      return e(r, n);
    };
  }
  return (w1 = t), w1;
}
var x1, $N;
function Aoe() {
  if ($N) return x1;
  $N = 1;
  var e = _oe(),
    t = Poe(),
    n = CO(),
    r = Fv();
  function i(o) {
    return n(o) ? e(r(o)) : t(o);
  }
  return (x1 = i), x1;
}
var S1, LN;
function ya() {
  if (LN) return S1;
  LN = 1;
  var e = goe(),
    t = Soe(),
    n = Su(),
    r = er(),
    i = Aoe();
  function o(a) {
    return typeof a == "function" ? a : a == null ? n : typeof a == "object" ? (r(a) ? t(a[0], a[1]) : e(a)) : i(a);
  }
  return (S1 = o), S1;
}
var _1, BN;
function y8() {
  if (BN) return _1;
  BN = 1;
  function e(t, n, r, i) {
    for (var o = t.length, a = r + (i ? 1 : -1); i ? a-- : ++a < o; ) if (n(t[a], a, t)) return a;
    return -1;
  }
  return (_1 = e), _1;
}
var P1, FN;
function Ooe() {
  if (FN) return P1;
  FN = 1;
  function e(t) {
    return t !== t;
  }
  return (P1 = e), P1;
}
var A1, VN;
function Eoe() {
  if (VN) return A1;
  VN = 1;
  function e(t, n, r) {
    for (var i = r - 1, o = t.length; ++i < o; ) if (t[i] === n) return i;
    return -1;
  }
  return (A1 = e), A1;
}
var O1, zN;
function Toe() {
  if (zN) return O1;
  zN = 1;
  var e = y8(),
    t = Ooe(),
    n = Eoe();
  function r(i, o, a) {
    return o === o ? n(i, o, a) : e(i, t, a);
  }
  return (O1 = r), O1;
}
var E1, qN;
function Coe() {
  if (qN) return E1;
  qN = 1;
  var e = Toe();
  function t(n, r) {
    var i = n == null ? 0 : n.length;
    return !!i && e(n, r, 0) > -1;
  }
  return (E1 = t), E1;
}
var T1, WN;
function koe() {
  if (WN) return T1;
  WN = 1;
  function e(t, n, r) {
    for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) if (r(n, t[i])) return !0;
    return !1;
  }
  return (T1 = e), T1;
}
var C1, UN;
function joe() {
  if (UN) return C1;
  UN = 1;
  function e() {}
  return (C1 = e), C1;
}
var k1, HN;
function Roe() {
  if (HN) return k1;
  HN = 1;
  var e = p8(),
    t = joe(),
    n = qO(),
    r = 1 / 0,
    i =
      e && 1 / n(new e([, -0]))[1] == r
        ? function (o) {
            return new e(o);
          }
        : t;
  return (k1 = i), k1;
}
var j1, KN;
function Moe() {
  if (KN) return j1;
  KN = 1;
  var e = o8(),
    t = Coe(),
    n = koe(),
    r = s8(),
    i = Roe(),
    o = qO(),
    a = 200;
  function s(u, c, d) {
    var h = -1,
      p = t,
      v = u.length,
      b = !0,
      y = [],
      w = y;
    if (d) (b = !1), (p = n);
    else if (v >= a) {
      var x = c ? null : i(u);
      if (x) return o(x);
      (b = !1), (p = r), (w = new e());
    } else w = c ? [] : y;
    e: for (; ++h < v; ) {
      var S = u[h],
        _ = c ? c(S) : S;
      if (((S = d || S !== 0 ? S : 0), b && _ === _)) {
        for (var E = w.length; E--; ) if (w[E] === _) continue e;
        c && w.push(_), y.push(S);
      } else p(w, _, d) || (w !== y && w.push(_), y.push(S));
    }
    return y;
  }
  return (j1 = s), j1;
}
var R1, GN;
function Noe() {
  if (GN) return R1;
  GN = 1;
  var e = ya(),
    t = Moe();
  function n(r, i) {
    return r && r.length ? t(r, e(i, 2)) : [];
  }
  return (R1 = n), R1;
}
var Ioe = Noe();
const YN = ht(Ioe);
function g8(e, t, n) {
  return t === !0 ? YN(e, n) : nt(t) ? YN(e, t) : e;
}
function Bl(e) {
  "@babel/helpers - typeof";

  return (
    (Bl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Bl(e)
  );
}
var Doe = ["ref"];
function XN(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Bi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? XN(Object(n), !0).forEach(function (r) {
          Hv(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : XN(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function $oe(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ZN(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, w8(r.key), r);
  }
}
function Loe(e, t, n) {
  return (
    t && ZN(e.prototype, t),
    n && ZN(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Boe(e, t, n) {
  return (t = um(t)), Foe(e, b8() ? Reflect.construct(t, n || [], um(e).constructor) : t.apply(e, n));
}
function Foe(e, t) {
  if (t && (Bl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Voe(e);
}
function Voe(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function b8() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (b8 = function () {
    return !!e;
  })();
}
function um(e) {
  return (
    (um = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    um(e)
  );
}
function zoe(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && P_(e, t);
}
function P_(e, t) {
  return (
    (P_ = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    P_(e, t)
  );
}
function Hv(e, t, n) {
  return (
    (t = w8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function w8(e) {
  var t = qoe(e, "string");
  return Bl(t) == "symbol" ? t : t + "";
}
function qoe(e, t) {
  if (Bl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Bl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Woe(e, t) {
  if (e == null) return {};
  var n = Uoe(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Uoe(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Hoe(e) {
  return e.value;
}
function Koe(e, t) {
  if (ReactDefault.isValidElement(e)) return ReactDefault.cloneElement(e, t);
  if (typeof e == "function") return ReactDefault.createElement(e, t);
  t.ref;
  var n = Woe(t, Doe);
  return ReactDefault.createElement(zO, n);
}
var QN = 1,
  Ol = (function (e) {
    function t() {
      var n;
      $oe(this, t);
      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
      return (
        (n = Boe(this, t, [].concat(i))),
        Hv(n, "lastBoundingBox", {
          width: -1,
          height: -1,
        }),
        n
      );
    }
    return (
      zoe(t, e),
      Loe(
        t,
        [
          {
            key: "componentDidMount",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "getBBox",
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var r = this.wrapperNode.getBoundingClientRect();
                return (r.height = this.wrapperNode.offsetHeight), (r.width = this.wrapperNode.offsetWidth), r;
              }
              return null;
            },
          },
          {
            key: "updateBBox",
            value: function () {
              var r = this.props.onBBoxUpdate,
                i = this.getBBox();
              i
                ? (Math.abs(i.width - this.lastBoundingBox.width) > QN ||
                    Math.abs(i.height - this.lastBoundingBox.height) > QN) &&
                  ((this.lastBoundingBox.width = i.width), (this.lastBoundingBox.height = i.height), r && r(i))
                : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) &&
                  ((this.lastBoundingBox.width = -1), (this.lastBoundingBox.height = -1), r && r(null));
            },
          },
          {
            key: "getBBoxSnapshot",
            value: function () {
              return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0
                ? Bi({}, this.lastBoundingBox)
                : {
                    width: 0,
                    height: 0,
                  };
            },
          },
          {
            key: "getDefaultPosition",
            value: function (r) {
              var i = this.props,
                o = i.layout,
                a = i.align,
                s = i.verticalAlign,
                u = i.margin,
                c = i.chartWidth,
                d = i.chartHeight,
                h,
                p;
              if (!r || ((r.left === void 0 || r.left === null) && (r.right === void 0 || r.right === null)))
                if (a === "center" && o === "vertical") {
                  var v = this.getBBoxSnapshot();
                  h = {
                    left: ((c || 0) - v.width) / 2,
                  };
                } else
                  h =
                    a === "right"
                      ? {
                          right: (u && u.right) || 0,
                        }
                      : {
                          left: (u && u.left) || 0,
                        };
              if (!r || ((r.top === void 0 || r.top === null) && (r.bottom === void 0 || r.bottom === null)))
                if (s === "middle") {
                  var b = this.getBBoxSnapshot();
                  p = {
                    top: ((d || 0) - b.height) / 2,
                  };
                } else
                  p =
                    s === "bottom"
                      ? {
                          bottom: (u && u.bottom) || 0,
                        }
                      : {
                          top: (u && u.top) || 0,
                        };
              return Bi(Bi({}, h), p);
            },
          },
          {
            key: "render",
            value: function () {
              var r = this,
                i = this.props,
                o = i.content,
                a = i.width,
                s = i.height,
                u = i.wrapperStyle,
                c = i.payloadUniqBy,
                d = i.payload,
                h = Bi(
                  Bi(
                    {
                      position: "absolute",
                      width: a || "auto",
                      height: s || "auto",
                    },
                    this.getDefaultPosition(u),
                  ),
                  u,
                );
              return ReactDefault.createElement(
                "div",
                {
                  className: "recharts-legend-wrapper",
                  style: h,
                  ref: function (v) {
                    r.wrapperNode = v;
                  },
                },
                Koe(
                  o,
                  Bi(
                    Bi({}, this.props),
                    {},
                    {
                      payload: g8(d, c, Hoe),
                    },
                  ),
                ),
              );
            },
          },
        ],
        [
          {
            key: "getWithHeight",
            value: function (r, i) {
              var o = Bi(Bi({}, this.defaultProps), r.props),
                a = o.layout;
              return a === "vertical" && be(r.props.height)
                ? {
                    height: r.props.height,
                  }
                : a === "horizontal"
                  ? {
                      width: r.props.width || i,
                    }
                  : null;
            },
          },
        ],
      )
    );
  })(React.PureComponent);
Hv(Ol, "displayName", "Legend");
Hv(Ol, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom",
});
var M1, JN;
function Goe() {
  if (JN) return M1;
  JN = 1;
  var e = pd(),
    t = WO(),
    n = er(),
    r = e ? e.isConcatSpreadable : void 0;
  function i(o) {
    return n(o) || t(o) || !!(r && o && o[r]);
  }
  return (M1 = i), M1;
}
var N1, eI;
function x8() {
  if (eI) return N1;
  eI = 1;
  var e = u8(),
    t = Goe();
  function n(r, i, o, a, s) {
    var u = -1,
      c = r.length;
    for (o || (o = t), s || (s = []); ++u < c; ) {
      var d = r[u];
      i > 0 && o(d) ? (i > 1 ? n(d, i - 1, o, a, s) : e(s, d)) : a || (s[s.length] = d);
    }
    return s;
  }
  return (N1 = n), N1;
}
var I1, tI;
function Yoe() {
  if (tI) return I1;
  tI = 1;
  function e(t) {
    return function (n, r, i) {
      for (var o = -1, a = Object(n), s = i(n), u = s.length; u--; ) {
        var c = s[t ? u : ++o];
        if (r(a[c], c, a) === !1) break;
      }
      return n;
    };
  }
  return (I1 = e), I1;
}
var D1, nI;
function Xoe() {
  if (nI) return D1;
  nI = 1;
  var e = Yoe(),
    t = e();
  return (D1 = t), D1;
}
var $1, rI;
function S8() {
  if (rI) return $1;
  rI = 1;
  var e = Xoe(),
    t = Uv();
  function n(r, i) {
    return r && e(r, i, t);
  }
  return ($1 = n), $1;
}
var L1, iI;
function Zoe() {
  if (iI) return L1;
  iI = 1;
  var e = vd();
  function t(n, r) {
    return function (i, o) {
      if (i == null) return i;
      if (!e(i)) return n(i, o);
      for (var a = i.length, s = r ? a : -1, u = Object(i); (r ? s-- : ++s < a) && o(u[s], s, u) !== !1; );
      return i;
    };
  }
  return (L1 = t), L1;
}
var B1, oI;
function GO() {
  if (oI) return B1;
  oI = 1;
  var e = S8(),
    t = Zoe(),
    n = t(e);
  return (B1 = n), B1;
}
var F1, aI;
function _8() {
  if (aI) return F1;
  aI = 1;
  var e = GO(),
    t = vd();
  function n(r, i) {
    var o = -1,
      a = t(r) ? Array(r.length) : [];
    return (
      e(r, function (s, u, c) {
        a[++o] = i(s, u, c);
      }),
      a
    );
  }
  return (F1 = n), F1;
}
var V1, sI;
function Qoe() {
  if (sI) return V1;
  sI = 1;
  function e(t, n) {
    var r = t.length;
    for (t.sort(n); r--; ) t[r] = t[r].value;
    return t;
  }
  return (V1 = e), V1;
}
var z1, lI;
function Joe() {
  if (lI) return z1;
  lI = 1;
  var e = bu();
  function t(n, r) {
    if (n !== r) {
      var i = n !== void 0,
        o = n === null,
        a = n === n,
        s = e(n),
        u = r !== void 0,
        c = r === null,
        d = r === r,
        h = e(r);
      if ((!c && !h && !s && n > r) || (s && u && d && !c && !h) || (o && u && d) || (!i && d) || !a) return 1;
      if ((!o && !s && !h && n < r) || (h && i && a && !o && !s) || (c && i && a) || (!u && a) || !d) return -1;
    }
    return 0;
  }
  return (z1 = t), z1;
}
var q1, uI;
function eae() {
  if (uI) return q1;
  uI = 1;
  var e = Joe();
  function t(n, r, i) {
    for (var o = -1, a = n.criteria, s = r.criteria, u = a.length, c = i.length; ++o < u; ) {
      var d = e(a[o], s[o]);
      if (d) {
        if (o >= c) return d;
        var h = i[o];
        return d * (h == "desc" ? -1 : 1);
      }
    }
    return n.index - r.index;
  }
  return (q1 = t), q1;
}
var W1, cI;
function tae() {
  if (cI) return W1;
  cI = 1;
  var e = NO(),
    t = IO(),
    n = ya(),
    r = _8(),
    i = Qoe(),
    o = f8(),
    a = eae(),
    s = Su(),
    u = er();
  function c(d, h, p) {
    h.length
      ? (h = e(h, function (y) {
          return u(y)
            ? function (w) {
                return t(w, y.length === 1 ? y[0] : y);
              }
            : y;
        }))
      : (h = [s]);
    var v = -1;
    h = e(h, o(n));
    var b = r(d, function (y, w, x) {
      var S = e(h, function (_) {
        return _(y);
      });
      return {
        criteria: S,
        index: ++v,
        value: y,
      };
    });
    return i(b, function (y, w) {
      return a(y, w, p);
    });
  }
  return (W1 = c), W1;
}
var U1, fI;
function nae() {
  if (fI) return U1;
  fI = 1;
  function e(t, n, r) {
    switch (r.length) {
      case 0:
        return t.call(n);
      case 1:
        return t.call(n, r[0]);
      case 2:
        return t.call(n, r[0], r[1]);
      case 3:
        return t.call(n, r[0], r[1], r[2]);
    }
    return t.apply(n, r);
  }
  return (U1 = e), U1;
}
var H1, dI;
function rae() {
  if (dI) return H1;
  dI = 1;
  var e = nae(),
    t = Math.max;
  function n(r, i, o) {
    return (
      (i = t(i === void 0 ? r.length - 1 : i, 0)),
      function () {
        for (var a = arguments, s = -1, u = t(a.length - i, 0), c = Array(u); ++s < u; ) c[s] = a[i + s];
        s = -1;
        for (var d = Array(i + 1); ++s < i; ) d[s] = a[s];
        return (d[i] = o(c)), e(r, this, d);
      }
    );
  }
  return (H1 = n), H1;
}
var K1, hI;
function iae() {
  if (hI) return K1;
  hI = 1;
  function e(t) {
    return function () {
      return t;
    };
  }
  return (K1 = e), K1;
}
var G1, pI;
function P8() {
  if (pI) return G1;
  pI = 1;
  var e = ws(),
    t = (function () {
      try {
        var n = e(Object, "defineProperty");
        return n({}, "", {}), n;
      } catch {}
    })();
  return (G1 = t), G1;
}
var Y1, mI;
function oae() {
  if (mI) return Y1;
  mI = 1;
  var e = iae(),
    t = P8(),
    n = Su(),
    r = t
      ? function (i, o) {
          return t(i, "toString", {
            configurable: !0,
            enumerable: !1,
            value: e(o),
            writable: !0,
          });
        }
      : n;
  return (Y1 = r), Y1;
}
var X1, vI;
function aae() {
  if (vI) return X1;
  vI = 1;
  var e = 800,
    t = 16,
    n = Date.now;
  function r(i) {
    var o = 0,
      a = 0;
    return function () {
      var s = n(),
        u = t - (s - a);
      if (((a = s), u > 0)) {
        if (++o >= e) return arguments[0];
      } else o = 0;
      return i.apply(void 0, arguments);
    };
  }
  return (X1 = r), X1;
}
var Z1, yI;
function sae() {
  if (yI) return Z1;
  yI = 1;
  var e = oae(),
    t = aae(),
    n = t(e);
  return (Z1 = n), Z1;
}
var Q1, gI;
function lae() {
  if (gI) return Q1;
  gI = 1;
  var e = Su(),
    t = rae(),
    n = sae();
  function r(i, o) {
    return n(t(i, o, e), i + "");
  }
  return (Q1 = r), Q1;
}
var J1, bI;
function Kv() {
  if (bI) return J1;
  bI = 1;
  var e = jO(),
    t = vd(),
    n = UO(),
    r = va();
  function i(o, a, s) {
    if (!r(s)) return !1;
    var u = typeof a;
    return (u == "number" ? t(s) && n(a, s.length) : u == "string" && a in s) ? e(s[a], o) : !1;
  }
  return (J1 = i), J1;
}
var ex, wI;
function uae() {
  if (wI) return ex;
  wI = 1;
  var e = x8(),
    t = tae(),
    n = lae(),
    r = Kv(),
    i = n(function (o, a) {
      if (o == null) return [];
      var s = a.length;
      return s > 1 && r(o, a[0], a[1]) ? (a = []) : s > 2 && r(a[0], a[1], a[2]) && (a = [a[0]]), t(o, e(a, 1), []);
    });
  return (ex = i), ex;
}
var cae = uae();
const YO = ht(cae);
function gf(e) {
  "@babel/helpers - typeof";

  return (
    (gf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    gf(e)
  );
}
function A_() {
  return (
    (A_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    A_.apply(this, arguments)
  );
}
function fae(e, t) {
  return mae(e) || pae(e, t) || hae(e, t) || dae();
}
function dae() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hae(e, t) {
  if (e) {
    if (typeof e == "string") return xI(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return xI(e, t);
  }
}
function xI(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function pae(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function mae(e) {
  if (Array.isArray(e)) return e;
}
function SI(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function tx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? SI(Object(n), !0).forEach(function (r) {
          vae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : SI(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function vae(e, t, n) {
  return (
    (t = yae(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function yae(e) {
  var t = gae(e, "string");
  return gf(t) == "symbol" ? t : t + "";
}
function gae(e, t) {
  if (gf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (gf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bae(e) {
  return Array.isArray(e) && Jt(e[0]) && Jt(e[1]) ? e.join(" ~ ") : e;
}
var wae = function (t) {
  var n = t.separator,
    r = n === void 0 ? " : " : n,
    i = t.contentStyle,
    o = i === void 0 ? {} : i,
    a = t.itemStyle,
    s = a === void 0 ? {} : a,
    u = t.labelStyle,
    c = u === void 0 ? {} : u,
    d = t.payload,
    h = t.formatter,
    p = t.itemSorter,
    v = t.wrapperClassName,
    b = t.labelClassName,
    y = t.label,
    w = t.labelFormatter,
    x = t.accessibilityLayer,
    S = x === void 0 ? !1 : x,
    _ = function () {
      if (d && d.length) {
        var V = {
            padding: 0,
            margin: 0,
          },
          z = (p ? YO(d, p) : d).map(function (q, U) {
            if (q.type === "none") return null;
            var B = tx(
                {
                  display: "block",
                  paddingTop: 4,
                  paddingBottom: 4,
                  color: q.color || "#000",
                },
                s,
              ),
              F = q.formatter || h || bae,
              L = q.value,
              W = q.name,
              G = L,
              $ = W;
            if (F && G != null && $ != null) {
              var K = F(L, W, q, U, d);
              if (Array.isArray(K)) {
                var ne = fae(K, 2);
                (G = ne[0]), ($ = ne[1]);
              } else G = K;
            }
            return ReactDefault.createElement(
              "li",
              {
                className: "recharts-tooltip-item",
                key: "tooltip-item-".concat(U),
                style: B,
              },
              Jt($)
                ? ReactDefault.createElement(
                    "span",
                    {
                      className: "recharts-tooltip-item-name",
                    },
                    $,
                  )
                : null,
              Jt($)
                ? ReactDefault.createElement(
                    "span",
                    {
                      className: "recharts-tooltip-item-separator",
                    },
                    r,
                  )
                : null,
              ReactDefault.createElement(
                "span",
                {
                  className: "recharts-tooltip-item-value",
                },
                G,
              ),
              ReactDefault.createElement(
                "span",
                {
                  className: "recharts-tooltip-item-unit",
                },
                q.unit || "",
              ),
            );
          });
        return ReactDefault.createElement(
          "ul",
          {
            className: "recharts-tooltip-item-list",
            style: V,
          },
          z,
        );
      }
      return null;
    },
    E = tx(
      {
        margin: 0,
        padding: 10,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        whiteSpace: "nowrap",
      },
      o,
    ),
    P = tx(
      {
        margin: 0,
      },
      c,
    ),
    O = !it(y),
    k = O ? y : "",
    R = We("recharts-default-tooltip", v),
    M = We("recharts-tooltip-label", b);
  O && w && d !== void 0 && d !== null && (k = w(y, d));
  var D = S
    ? {
        role: "status",
        "aria-live": "assertive",
      }
    : {};
  return ReactDefault.createElement(
    "div",
    A_(
      {
        className: R,
        style: E,
      },
      D,
    ),
    ReactDefault.createElement(
      "p",
      {
        className: M,
        style: P,
      },
      ReactDefault.isValidElement(k) ? k : "".concat(k),
    ),
    _(),
  );
};
function bf(e) {
  "@babel/helpers - typeof";

  return (
    (bf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    bf(e)
  );
}
function Xh(e, t, n) {
  return (
    (t = xae(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function xae(e) {
  var t = Sae(e, "string");
  return bf(t) == "symbol" ? t : t + "";
}
function Sae(e, t) {
  if (bf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (bf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var yc = "recharts-tooltip-wrapper",
  _ae = {
    visibility: "hidden",
  };
function Pae(e) {
  var t = e.coordinate,
    n = e.translateX,
    r = e.translateY;
  return We(
    yc,
    Xh(
      Xh(
        Xh(
          Xh({}, "".concat(yc, "-right"), be(n) && t && be(t.x) && n >= t.x),
          "".concat(yc, "-left"),
          be(n) && t && be(t.x) && n < t.x,
        ),
        "".concat(yc, "-bottom"),
        be(r) && t && be(t.y) && r >= t.y,
      ),
      "".concat(yc, "-top"),
      be(r) && t && be(t.y) && r < t.y,
    ),
  );
}
function _I(e) {
  var t = e.allowEscapeViewBox,
    n = e.coordinate,
    r = e.key,
    i = e.offsetTopLeft,
    o = e.position,
    a = e.reverseDirection,
    s = e.tooltipDimension,
    u = e.viewBox,
    c = e.viewBoxDimension;
  if (o && be(o[r])) return o[r];
  var d = n[r] - s - i,
    h = n[r] + i;
  if (t[r]) return a[r] ? d : h;
  if (a[r]) {
    var p = d,
      v = u[r];
    return p < v ? Math.max(h, u[r]) : Math.max(d, u[r]);
  }
  var b = h + s,
    y = u[r] + c;
  return b > y ? Math.max(d, u[r]) : Math.max(h, u[r]);
}
function Aae(e) {
  var t = e.translateX,
    n = e.translateY,
    r = e.useTranslate3d;
  return {
    transform: r
      ? "translate3d(".concat(t, "px, ").concat(n, "px, 0)")
      : "translate(".concat(t, "px, ").concat(n, "px)"),
  };
}
function Oae(e) {
  var t = e.allowEscapeViewBox,
    n = e.coordinate,
    r = e.offsetTopLeft,
    i = e.position,
    o = e.reverseDirection,
    a = e.tooltipBox,
    s = e.useTranslate3d,
    u = e.viewBox,
    c,
    d,
    h;
  return (
    a.height > 0 && a.width > 0 && n
      ? ((d = _I({
          allowEscapeViewBox: t,
          coordinate: n,
          key: "x",
          offsetTopLeft: r,
          position: i,
          reverseDirection: o,
          tooltipDimension: a.width,
          viewBox: u,
          viewBoxDimension: u.width,
        })),
        (h = _I({
          allowEscapeViewBox: t,
          coordinate: n,
          key: "y",
          offsetTopLeft: r,
          position: i,
          reverseDirection: o,
          tooltipDimension: a.height,
          viewBox: u,
          viewBoxDimension: u.height,
        })),
        (c = Aae({
          translateX: d,
          translateY: h,
          useTranslate3d: s,
        })))
      : (c = _ae),
    {
      cssProperties: c,
      cssClasses: Pae({
        translateX: d,
        translateY: h,
        coordinate: n,
      }),
    }
  );
}
function Fl(e) {
  "@babel/helpers - typeof";

  return (
    (Fl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Fl(e)
  );
}
function PI(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function AI(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? PI(Object(n), !0).forEach(function (r) {
          E_(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : PI(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Eae(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Tae(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, O8(r.key), r);
  }
}
function Cae(e, t, n) {
  return (
    t && Tae(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function kae(e, t, n) {
  return (t = cm(t)), jae(e, A8() ? Reflect.construct(t, n || [], cm(e).constructor) : t.apply(e, n));
}
function jae(e, t) {
  if (t && (Fl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Rae(e);
}
function Rae(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function A8() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (A8 = function () {
    return !!e;
  })();
}
function cm(e) {
  return (
    (cm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    cm(e)
  );
}
function Mae(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && O_(e, t);
}
function O_(e, t) {
  return (
    (O_ = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    O_(e, t)
  );
}
function E_(e, t, n) {
  return (
    (t = O8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function O8(e) {
  var t = Nae(e, "string");
  return Fl(t) == "symbol" ? t : t + "";
}
function Nae(e, t) {
  if (Fl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Fl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var OI = 1,
  Iae = (function (e) {
    function t() {
      var n;
      Eae(this, t);
      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
      return (
        (n = kae(this, t, [].concat(i))),
        E_(n, "state", {
          dismissed: !1,
          dismissedAtCoordinate: {
            x: 0,
            y: 0,
          },
          lastBoundingBox: {
            width: -1,
            height: -1,
          },
        }),
        E_(n, "handleKeyDown", function (a) {
          if (a.key === "Escape") {
            var s, u, c, d;
            n.setState({
              dismissed: !0,
              dismissedAtCoordinate: {
                x:
                  (s = (u = n.props.coordinate) === null || u === void 0 ? void 0 : u.x) !== null && s !== void 0
                    ? s
                    : 0,
                y:
                  (c = (d = n.props.coordinate) === null || d === void 0 ? void 0 : d.y) !== null && c !== void 0
                    ? c
                    : 0,
              },
            });
          }
        }),
        n
      );
    }
    return (
      Mae(t, e),
      Cae(t, [
        {
          key: "updateBBox",
          value: function () {
            if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
              var r = this.wrapperNode.getBoundingClientRect();
              (Math.abs(r.width - this.state.lastBoundingBox.width) > OI ||
                Math.abs(r.height - this.state.lastBoundingBox.height) > OI) &&
                this.setState({
                  lastBoundingBox: {
                    width: r.width,
                    height: r.height,
                  },
                });
            } else
              (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) &&
                this.setState({
                  lastBoundingBox: {
                    width: -1,
                    height: -1,
                  },
                });
          },
        },
        {
          key: "componentDidMount",
          value: function () {
            document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            document.removeEventListener("keydown", this.handleKeyDown);
          },
        },
        {
          key: "componentDidUpdate",
          value: function () {
            var r, i;
            this.props.active && this.updateBBox(),
              this.state.dismissed &&
                (((r = this.props.coordinate) === null || r === void 0 ? void 0 : r.x) !==
                  this.state.dismissedAtCoordinate.x ||
                  ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !==
                    this.state.dismissedAtCoordinate.y) &&
                (this.state.dismissed = !1);
          },
        },
        {
          key: "render",
          value: function () {
            var r = this,
              i = this.props,
              o = i.active,
              a = i.allowEscapeViewBox,
              s = i.animationDuration,
              u = i.animationEasing,
              c = i.children,
              d = i.coordinate,
              h = i.hasPayload,
              p = i.isAnimationActive,
              v = i.offset,
              b = i.position,
              y = i.reverseDirection,
              w = i.useTranslate3d,
              x = i.viewBox,
              S = i.wrapperStyle,
              _ = Oae({
                allowEscapeViewBox: a,
                coordinate: d,
                offsetTopLeft: v,
                position: b,
                reverseDirection: y,
                tooltipBox: this.state.lastBoundingBox,
                useTranslate3d: w,
                viewBox: x,
              }),
              E = _.cssClasses,
              P = _.cssProperties,
              O = AI(
                AI(
                  {
                    transition: p && o ? "transform ".concat(s, "ms ").concat(u) : void 0,
                  },
                  P,
                ),
                {},
                {
                  pointerEvents: "none",
                  visibility: !this.state.dismissed && o && h ? "visible" : "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                S,
              );
            return ReactDefault.createElement(
              "div",
              {
                tabIndex: -1,
                className: E,
                style: O,
                ref: function (R) {
                  r.wrapperNode = R;
                },
              },
              c,
            );
          },
        },
      ])
    );
  })(React.PureComponent),
  Dae = function () {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
  },
  _u = {
    isSsr: Dae(),
  };
function Vl(e) {
  "@babel/helpers - typeof";

  return (
    (Vl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Vl(e)
  );
}
function EI(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function TI(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? EI(Object(n), !0).forEach(function (r) {
          XO(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : EI(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function $ae(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Lae(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, T8(r.key), r);
  }
}
function Bae(e, t, n) {
  return (
    t && Lae(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Fae(e, t, n) {
  return (t = fm(t)), Vae(e, E8() ? Reflect.construct(t, n || [], fm(e).constructor) : t.apply(e, n));
}
function Vae(e, t) {
  if (t && (Vl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return zae(e);
}
function zae(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function E8() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (E8 = function () {
    return !!e;
  })();
}
function fm(e) {
  return (
    (fm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    fm(e)
  );
}
function qae(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && T_(e, t);
}
function T_(e, t) {
  return (
    (T_ = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    T_(e, t)
  );
}
function XO(e, t, n) {
  return (
    (t = T8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function T8(e) {
  var t = Wae(e, "string");
  return Vl(t) == "symbol" ? t : t + "";
}
function Wae(e, t) {
  if (Vl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Uae(e) {
  return e.dataKey;
}
function Hae(e, t) {
  return ReactDefault.isValidElement(e)
    ? ReactDefault.cloneElement(e, t)
    : typeof e == "function"
      ? ReactDefault.createElement(e, t)
      : ReactDefault.createElement(wae, t);
}
var fi = (function (e) {
  function t() {
    return $ae(this, t), Fae(this, t, arguments);
  }
  return (
    qae(t, e),
    Bae(t, [
      {
        key: "render",
        value: function () {
          var r = this,
            i = this.props,
            o = i.active,
            a = i.allowEscapeViewBox,
            s = i.animationDuration,
            u = i.animationEasing,
            c = i.content,
            d = i.coordinate,
            h = i.filterNull,
            p = i.isAnimationActive,
            v = i.offset,
            b = i.payload,
            y = i.payloadUniqBy,
            w = i.position,
            x = i.reverseDirection,
            S = i.useTranslate3d,
            _ = i.viewBox,
            E = i.wrapperStyle,
            P = b ?? [];
          h &&
            P.length &&
            (P = g8(
              b.filter(function (k) {
                return k.value != null && (k.hide !== !0 || r.props.includeHidden);
              }),
              y,
              Uae,
            ));
          var O = P.length > 0;
          return ReactDefault.createElement(
            Iae,
            {
              allowEscapeViewBox: a,
              animationDuration: s,
              animationEasing: u,
              isAnimationActive: p,
              active: o,
              coordinate: d,
              hasPayload: O,
              offset: v,
              position: w,
              reverseDirection: x,
              useTranslate3d: S,
              viewBox: _,
              wrapperStyle: E,
            },
            Hae(
              c,
              TI(
                TI({}, this.props),
                {},
                {
                  payload: P,
                },
              ),
            ),
          );
        },
      },
    ])
  );
})(React.PureComponent);
XO(fi, "displayName", "Tooltip");
XO(fi, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1,
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0,
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !_u.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1,
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  },
  wrapperStyle: {},
});
var nx, CI;
function Kae() {
  if (CI) return nx;
  CI = 1;
  var e = Ci(),
    t = function () {
      return e.Date.now();
    };
  return (nx = t), nx;
}
var rx, kI;
function Gae() {
  if (kI) return rx;
  kI = 1;
  var e = /\s/;
  function t(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); );
    return r;
  }
  return (rx = t), rx;
}
var ix, jI;
function Yae() {
  if (jI) return ix;
  jI = 1;
  var e = Gae(),
    t = /^\s+/;
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(t, "");
  }
  return (ix = n), ix;
}
var ox, RI;
function C8() {
  if (RI) return ox;
  RI = 1;
  var e = Yae(),
    t = va(),
    n = bu(),
    r = NaN,
    i = /^[-+]0x[0-9a-f]+$/i,
    o = /^0b[01]+$/i,
    a = /^0o[0-7]+$/i,
    s = parseInt;
  function u(c) {
    if (typeof c == "number") return c;
    if (n(c)) return r;
    if (t(c)) {
      var d = typeof c.valueOf == "function" ? c.valueOf() : c;
      c = t(d) ? d + "" : d;
    }
    if (typeof c != "string") return c === 0 ? c : +c;
    c = e(c);
    var h = o.test(c);
    return h || a.test(c) ? s(c.slice(2), h ? 2 : 8) : i.test(c) ? r : +c;
  }
  return (ox = u), ox;
}
var ax, MI;
function Xae() {
  if (MI) return ax;
  MI = 1;
  var e = va(),
    t = Kae(),
    n = C8(),
    r = "Expected a function",
    i = Math.max,
    o = Math.min;
  function a(s, u, c) {
    var d,
      h,
      p,
      v,
      b,
      y,
      w = 0,
      x = !1,
      S = !1,
      _ = !0;
    if (typeof s != "function") throw new TypeError(r);
    (u = n(u) || 0),
      e(c) &&
        ((x = !!c.leading),
        (S = "maxWait" in c),
        (p = S ? i(n(c.maxWait) || 0, u) : p),
        (_ = "trailing" in c ? !!c.trailing : _));
    function E(z) {
      var q = d,
        U = h;
      return (d = h = void 0), (w = z), (v = s.apply(U, q)), v;
    }
    function P(z) {
      return (w = z), (b = setTimeout(R, u)), x ? E(z) : v;
    }
    function O(z) {
      var q = z - y,
        U = z - w,
        B = u - q;
      return S ? o(B, p - U) : B;
    }
    function k(z) {
      var q = z - y,
        U = z - w;
      return y === void 0 || q >= u || q < 0 || (S && U >= p);
    }
    function R() {
      var z = t();
      if (k(z)) return M(z);
      b = setTimeout(R, O(z));
    }
    function M(z) {
      return (b = void 0), _ && d ? E(z) : ((d = h = void 0), v);
    }
    function D() {
      b !== void 0 && clearTimeout(b), (w = 0), (d = y = h = b = void 0);
    }
    function I() {
      return b === void 0 ? v : M(t());
    }
    function V() {
      var z = t(),
        q = k(z);
      if (((d = arguments), (h = this), (y = z), q)) {
        if (b === void 0) return P(y);
        if (S) return clearTimeout(b), (b = setTimeout(R, u)), E(y);
      }
      return b === void 0 && (b = setTimeout(R, u)), v;
    }
    return (V.cancel = D), (V.flush = I), V;
  }
  return (ax = a), ax;
}
var sx, NI;
function Zae() {
  if (NI) return sx;
  NI = 1;
  var e = Xae(),
    t = va(),
    n = "Expected a function";
  function r(i, o, a) {
    var s = !0,
      u = !0;
    if (typeof i != "function") throw new TypeError(n);
    return (
      t(a) && ((s = "leading" in a ? !!a.leading : s), (u = "trailing" in a ? !!a.trailing : u)),
      e(i, o, {
        leading: s,
        maxWait: o,
        trailing: u,
      })
    );
  }
  return (sx = r), sx;
}
var Qae = Zae();
const k8 = ht(Qae);
function wf(e) {
  "@babel/helpers - typeof";

  return (
    (wf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    wf(e)
  );
}
function II(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Zh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? II(Object(n), !0).forEach(function (r) {
          Jae(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : II(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Jae(e, t, n) {
  return (
    (t = ese(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function ese(e) {
  var t = tse(e, "string");
  return wf(t) == "symbol" ? t : t + "";
}
function tse(e, t) {
  if (wf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (wf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nse(e, t) {
  return ase(e) || ose(e, t) || ise(e, t) || rse();
}
function rse() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ise(e, t) {
  if (e) {
    if (typeof e == "string") return DI(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DI(e, t);
  }
}
function DI(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ose(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function ase(e) {
  if (Array.isArray(e)) return e;
}
var sse = React.forwardRef(function (e, t) {
    var n = e.aspect,
      r = e.initialDimension,
      i =
        r === void 0
          ? {
              width: -1,
              height: -1,
            }
          : r,
      o = e.width,
      a = o === void 0 ? "100%" : o,
      s = e.height,
      u = s === void 0 ? "100%" : s,
      c = e.minWidth,
      d = c === void 0 ? 0 : c,
      h = e.minHeight,
      p = e.maxHeight,
      v = e.children,
      b = e.debounce,
      y = b === void 0 ? 0 : b,
      w = e.id,
      x = e.className,
      S = e.onResize,
      _ = e.style,
      E = _ === void 0 ? {} : _,
      P = React.useRef(null),
      O = React.useRef();
    (O.current = S),
      React.useImperativeHandle(t, function () {
        return Object.defineProperty(P.current, "current", {
          get: function () {
            return (
              console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), P.current
            );
          },
          configurable: !0,
        });
      });
    var k = React.useState({
        containerWidth: i.width,
        containerHeight: i.height,
      }),
      R = nse(k, 2),
      M = R[0],
      D = R[1],
      I = React.useCallback(function (z, q) {
        D(function (U) {
          var B = Math.round(z),
            F = Math.round(q);
          return U.containerWidth === B && U.containerHeight === F
            ? U
            : {
                containerWidth: B,
                containerHeight: F,
              };
        });
      }, []);
    React.useEffect(
      function () {
        var z = function (W) {
          var G,
            $ = W[0].contentRect,
            K = $.width,
            ne = $.height;
          I(K, ne), (G = O.current) === null || G === void 0 || G.call(O, K, ne);
        };
        y > 0 &&
          (z = k8(z, y, {
            trailing: !0,
            leading: !1,
          }));
        var q = new ResizeObserver(z),
          U = P.current.getBoundingClientRect(),
          B = U.width,
          F = U.height;
        return (
          I(B, F),
          q.observe(P.current),
          function () {
            q.disconnect();
          }
        );
      },
      [I, y],
    );
    var V = React.useMemo(
      function () {
        var z = M.containerWidth,
          q = M.containerHeight;
        if (z < 0 || q < 0) return null;
        os(
          Ya(a) || Ya(u),
          `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
          a,
          u,
        ),
          os(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
        var U = Ya(a) ? z : a,
          B = Ya(u) ? q : u;
        n && n > 0 && (U ? (B = U / n) : B && (U = B * n), p && B > p && (B = p)),
          os(
            U > 0 || B > 0,
            `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
            U,
            B,
            a,
            u,
            d,
            h,
            n,
          );
        var F = !Array.isArray(v) && to(v.type).endsWith("Chart");
        return ReactDefault.Children.map(v, function (L) {
          return ReactDefault.isValidElement(L)
            ? React.cloneElement(
                L,
                Zh(
                  {
                    width: U,
                    height: B,
                  },
                  F
                    ? {
                        style: Zh(
                          {
                            height: "100%",
                            width: "100%",
                            maxHeight: B,
                            maxWidth: U,
                          },
                          L.props.style,
                        ),
                      }
                    : {},
                ),
              )
            : L;
        });
      },
      [n, v, u, p, h, d, M, a],
    );
    return ReactDefault.createElement(
      "div",
      {
        id: w ? "".concat(w) : void 0,
        className: We("recharts-responsive-container", x),
        style: Zh(
          Zh({}, E),
          {},
          {
            width: a,
            height: u,
            minWidth: d,
            minHeight: h,
            maxHeight: p,
          },
        ),
        ref: P,
      },
      V,
    );
  }),
  j8 = function (t) {
    return null;
  };
j8.displayName = "Cell";
function xf(e) {
  "@babel/helpers - typeof";

  return (
    (xf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    xf(e)
  );
}
function $I(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function C_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? $I(Object(n), !0).forEach(function (r) {
          lse(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : $I(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function lse(e, t, n) {
  return (
    (t = use(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function use(e) {
  var t = cse(e, "string");
  return xf(t) == "symbol" ? t : t + "";
}
function cse(e, t) {
  if (xf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (xf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tl = {
    widthCache: {},
    cacheCount: 0,
  },
  fse = 2e3,
  dse = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre",
  },
  LI = "recharts_measurement_span";
function hse(e) {
  var t = C_({}, e);
  return (
    Object.keys(t).forEach(function (n) {
      t[n] || delete t[n];
    }),
    t
  );
}
var Uc = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || _u.isSsr)
      return {
        width: 0,
        height: 0,
      };
    var r = hse(n),
      i = JSON.stringify({
        text: t,
        copyStyle: r,
      });
    if (tl.widthCache[i]) return tl.widthCache[i];
    try {
      var o = document.getElementById(LI);
      o ||
        ((o = document.createElement("span")),
        o.setAttribute("id", LI),
        o.setAttribute("aria-hidden", "true"),
        document.body.appendChild(o));
      var a = C_(C_({}, dse), r);
      Object.assign(o.style, a), (o.textContent = "".concat(t));
      var s = o.getBoundingClientRect(),
        u = {
          width: s.width,
          height: s.height,
        };
      return (tl.widthCache[i] = u), ++tl.cacheCount > fse && ((tl.cacheCount = 0), (tl.widthCache = {})), u;
    } catch {
      return {
        width: 0,
        height: 0,
      };
    }
  },
  pse = function (t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft,
    };
  };
function Sf(e) {
  "@babel/helpers - typeof";

  return (
    (Sf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Sf(e)
  );
}
function dm(e, t) {
  return gse(e) || yse(e, t) || vse(e, t) || mse();
}
function mse() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vse(e, t) {
  if (e) {
    if (typeof e == "string") return BI(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BI(e, t);
  }
}
function BI(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function yse(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        u = !1;
      } else for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function gse(e) {
  if (Array.isArray(e)) return e;
}
function bse(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function FI(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, xse(r.key), r);
  }
}
function wse(e, t, n) {
  return (
    t && FI(e.prototype, t),
    n && FI(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function xse(e) {
  var t = Sse(e, "string");
  return Sf(t) == "symbol" ? t : t + "";
}
function Sse(e, t) {
  if (Sf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Sf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var VI = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  zI = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  _se = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  Pse = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  R8 = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1,
  },
  Ase = Object.keys(R8),
  pl = "NaN";
function Ose(e, t) {
  return e * R8[t];
}
var Qh = (function () {
  function e(t, n) {
    bse(this, e),
      (this.num = t),
      (this.unit = n),
      (this.num = t),
      (this.unit = n),
      Number.isNaN(t) && (this.unit = ""),
      n !== "" && !_se.test(n) && ((this.num = NaN), (this.unit = "")),
      Ase.includes(n) && ((this.num = Ose(t, n)), (this.unit = "px"));
  }
  return wse(
    e,
    [
      {
        key: "add",
        value: function (n) {
          return this.unit !== n.unit ? new e(NaN, "") : new e(this.num + n.num, this.unit);
        },
      },
      {
        key: "subtract",
        value: function (n) {
          return this.unit !== n.unit ? new e(NaN, "") : new e(this.num - n.num, this.unit);
        },
      },
      {
        key: "multiply",
        value: function (n) {
          return this.unit !== "" && n.unit !== "" && this.unit !== n.unit
            ? new e(NaN, "")
            : new e(this.num * n.num, this.unit || n.unit);
        },
      },
      {
        key: "divide",
        value: function (n) {
          return this.unit !== "" && n.unit !== "" && this.unit !== n.unit
            ? new e(NaN, "")
            : new e(this.num / n.num, this.unit || n.unit);
        },
      },
      {
        key: "toString",
        value: function () {
          return "".concat(this.num).concat(this.unit);
        },
      },
      {
        key: "isNaN",
        value: function () {
          return Number.isNaN(this.num);
        },
      },
    ],
    [
      {
        key: "parse",
        value: function (n) {
          var r,
            i = (r = Pse.exec(n)) !== null && r !== void 0 ? r : [],
            o = dm(i, 3),
            a = o[1],
            s = o[2];
          return new e(parseFloat(a), s ?? "");
        },
      },
    ],
  );
})();
function M8(e) {
  if (e.includes(pl)) return pl;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var n,
      r = (n = VI.exec(t)) !== null && n !== void 0 ? n : [],
      i = dm(r, 4),
      o = i[1],
      a = i[2],
      s = i[3],
      u = Qh.parse(o ?? ""),
      c = Qh.parse(s ?? ""),
      d = a === "*" ? u.multiply(c) : u.divide(c);
    if (d.isNaN()) return pl;
    t = t.replace(VI, d.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var h,
      p = (h = zI.exec(t)) !== null && h !== void 0 ? h : [],
      v = dm(p, 4),
      b = v[1],
      y = v[2],
      w = v[3],
      x = Qh.parse(b ?? ""),
      S = Qh.parse(w ?? ""),
      _ = y === "+" ? x.add(S) : x.subtract(S);
    if (_.isNaN()) return pl;
    t = t.replace(zI, _.toString());
  }
  return t;
}
var qI = /\(([^()]*)\)/;
function Ese(e) {
  for (var t = e; t.includes("("); ) {
    var n = qI.exec(t),
      r = dm(n, 2),
      i = r[1];
    t = t.replace(qI, M8(i));
  }
  return t;
}
function Tse(e) {
  var t = e.replace(/\s+/g, "");
  return (t = Ese(t)), (t = M8(t)), t;
}
function Cse(e) {
  try {
    return Tse(e);
  } catch {
    return pl;
  }
}
function lx(e) {
  var t = Cse(e.slice(5, -1));
  return t === pl ? "" : t;
}
var kse = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  jse = ["dx", "dy", "angle", "className", "breakAll"];
function k_() {
  return (
    (k_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    k_.apply(this, arguments)
  );
}
function WI(e, t) {
  if (e == null) return {};
  var n = Rse(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Rse(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function UI(e, t) {
  return Dse(e) || Ise(e, t) || Nse(e, t) || Mse();
}
function Mse() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Nse(e, t) {
  if (e) {
    if (typeof e == "string") return HI(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return HI(e, t);
  }
}
function HI(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ise(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        u = !1;
      } else for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function Dse(e) {
  if (Array.isArray(e)) return e;
}
var N8 = /[ \f\n\r\t\v\u2028\u2029]+/,
  I8 = function (t) {
    var n = t.children,
      r = t.breakAll,
      i = t.style;
    try {
      var o = [];
      it(n) || (r ? (o = n.toString().split("")) : (o = n.toString().split(N8)));
      var a = o.map(function (u) {
          return {
            word: u,
            width: Uc(u, i).width,
          };
        }),
        s = r ? 0 : Uc(" ", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: s,
      };
    } catch {
      return null;
    }
  },
  $se = function (t, n, r, i, o) {
    var a = t.maxLines,
      s = t.children,
      u = t.style,
      c = t.breakAll,
      d = be(a),
      h = s,
      p = function () {
        var U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return U.reduce(function (B, F) {
          var L = F.word,
            W = F.width,
            G = B[B.length - 1];
          if (G && (i == null || o || G.width + W + r < Number(i))) G.words.push(L), (G.width += W + r);
          else {
            var $ = {
              words: [L],
              width: W,
            };
            B.push($);
          }
          return B;
        }, []);
      },
      v = p(n),
      b = function (U) {
        return U.reduce(function (B, F) {
          return B.width > F.width ? B : F;
        });
      };
    if (!d) return v;
    for (
      var y = "…",
        w = function (U) {
          var B = h.slice(0, U),
            F = I8({
              breakAll: c,
              style: u,
              children: B + y,
            }).wordsWithComputedWidth,
            L = p(F),
            W = L.length > a || b(L).width > Number(i);
          return [W, L];
        },
        x = 0,
        S = h.length - 1,
        _ = 0,
        E;
      x <= S && _ <= h.length - 1;

    ) {
      var P = Math.floor((x + S) / 2),
        O = P - 1,
        k = w(O),
        R = UI(k, 2),
        M = R[0],
        D = R[1],
        I = w(P),
        V = UI(I, 1),
        z = V[0];
      if ((!M && !z && (x = P + 1), M && z && (S = P - 1), !M && z)) {
        E = D;
        break;
      }
      _++;
    }
    return E || v;
  },
  KI = function (t) {
    var n = it(t) ? [] : t.toString().split(N8);
    return [
      {
        words: n,
      },
    ];
  },
  Lse = function (t) {
    var n = t.width,
      r = t.scaleToFit,
      i = t.children,
      o = t.style,
      a = t.breakAll,
      s = t.maxLines;
    if ((n || r) && !_u.isSsr) {
      var u,
        c,
        d = I8({
          breakAll: a,
          children: i,
          style: o,
        });
      if (d) {
        var h = d.wordsWithComputedWidth,
          p = d.spaceWidth;
        (u = h), (c = p);
      } else return KI(i);
      return $se(
        {
          breakAll: a,
          children: i,
          maxLines: s,
          style: o,
        },
        u,
        c,
        n,
        r,
      );
    }
    return KI(i);
  },
  GI = "#808080",
  hm = function (t) {
    var n = t.x,
      r = n === void 0 ? 0 : n,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.lineHeight,
      s = a === void 0 ? "1em" : a,
      u = t.capHeight,
      c = u === void 0 ? "0.71em" : u,
      d = t.scaleToFit,
      h = d === void 0 ? !1 : d,
      p = t.textAnchor,
      v = p === void 0 ? "start" : p,
      b = t.verticalAnchor,
      y = b === void 0 ? "end" : b,
      w = t.fill,
      x = w === void 0 ? GI : w,
      S = WI(t, kse),
      _ = React.useMemo(
        function () {
          return Lse({
            breakAll: S.breakAll,
            children: S.children,
            maxLines: S.maxLines,
            scaleToFit: h,
            style: S.style,
            width: S.width,
          });
        },
        [S.breakAll, S.children, S.maxLines, h, S.style, S.width],
      ),
      E = S.dx,
      P = S.dy,
      O = S.angle,
      k = S.className,
      R = S.breakAll,
      M = WI(S, jse);
    if (!Jt(r) || !Jt(o)) return null;
    var D = r + (be(E) ? E : 0),
      I = o + (be(P) ? P : 0),
      V;
    switch (y) {
      case "start":
        V = lx("calc(".concat(c, ")"));
        break;
      case "middle":
        V = lx(
          "calc("
            .concat((_.length - 1) / 2, " * -")
            .concat(s, " + (")
            .concat(c, " / 2))"),
        );
        break;
      default:
        V = lx("calc(".concat(_.length - 1, " * -").concat(s, ")"));
        break;
    }
    var z = [];
    if (h) {
      var q = _[0].width,
        U = S.width;
      z.push("scale(".concat((be(U) ? U / q : 1) / q, ")"));
    }
    return (
      O && z.push("rotate(".concat(O, ", ").concat(D, ", ").concat(I, ")")),
      z.length && (M.transform = z.join(" ")),
      ReactDefault.createElement(
        "text",
        k_({}, rt(M, !0), {
          x: D,
          y: I,
          className: We("recharts-text", k),
          textAnchor: v,
          fill: x.includes("url") ? GI : x,
        }),
        _.map(function (B, F) {
          var L = B.words.join(R ? "" : " ");
          return ReactDefault.createElement(
            "tspan",
            {
              x: D,
              dy: F === 0 ? V : s,
              key: "".concat(L, "-").concat(F),
            },
            L,
          );
        }),
      )
    );
  };
function na(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Bse(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ZO(e) {
  let t, n, r;
  e.length !== 2
    ? ((t = na), (n = (s, u) => na(e(s), u)), (r = (s, u) => e(s) - u))
    : ((t = e === na || e === Bse ? e : Fse), (n = e), (r = e));
  function i(s, u, c = 0, d = s.length) {
    if (c < d) {
      if (t(u, u) !== 0) return d;
      do {
        const h = (c + d) >>> 1;
        n(s[h], u) < 0 ? (c = h + 1) : (d = h);
      } while (c < d);
    }
    return c;
  }
  function o(s, u, c = 0, d = s.length) {
    if (c < d) {
      if (t(u, u) !== 0) return d;
      do {
        const h = (c + d) >>> 1;
        n(s[h], u) <= 0 ? (c = h + 1) : (d = h);
      } while (c < d);
    }
    return c;
  }
  function a(s, u, c = 0, d = s.length) {
    const h = i(s, u, c, d - 1);
    return h > c && r(s[h - 1], u) > -r(s[h], u) ? h - 1 : h;
  }
  return {
    left: i,
    center: a,
    right: o,
  };
}
function Fse() {
  return 0;
}
function D8(e) {
  return e === null ? NaN : +e;
}
function* Vse(e, t) {
  for (let n of e) n != null && (n = +n) >= n && (yield n);
}
const zse = ZO(na),
  yd = zse.right;
ZO(D8).center;
class YI extends Map {
  constructor(t, n = Use) {
    if (
      (super(),
      Object.defineProperties(this, {
        _intern: {
          value: new Map(),
        },
        _key: {
          value: n,
        },
      }),
      t != null)
    )
      for (const [r, i] of t) this.set(r, i);
  }
  get(t) {
    return super.get(XI(this, t));
  }
  has(t) {
    return super.has(XI(this, t));
  }
  set(t, n) {
    return super.set(qse(this, t), n);
  }
  delete(t) {
    return super.delete(Wse(this, t));
  }
}
function XI({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function qse({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function Wse({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && ((n = e.get(r)), e.delete(r)), n;
}
function Use(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function Hse(e = na) {
  if (e === na) return $8;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, n) => {
    const r = e(t, n);
    return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function $8(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const Kse = Math.sqrt(50),
  Gse = Math.sqrt(10),
  Yse = Math.sqrt(2);
function pm(e, t, n) {
  const r = (t - e) / Math.max(0, n),
    i = Math.floor(Math.log10(r)),
    o = r / Math.pow(10, i),
    a = o >= Kse ? 10 : o >= Gse ? 5 : o >= Yse ? 2 : 1;
  let s, u, c;
  return (
    i < 0
      ? ((c = Math.pow(10, -i) / a),
        (s = Math.round(e * c)),
        (u = Math.round(t * c)),
        s / c < e && ++s,
        u / c > t && --u,
        (c = -c))
      : ((c = Math.pow(10, i) * a),
        (s = Math.round(e / c)),
        (u = Math.round(t / c)),
        s * c < e && ++s,
        u * c > t && --u),
    u < s && 0.5 <= n && n < 2 ? pm(e, t, n * 2) : [s, u, c]
  );
}
function j_(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  const r = t < e,
    [i, o, a] = r ? pm(t, e, n) : pm(e, t, n);
  if (!(o >= i)) return [];
  const s = o - i + 1,
    u = new Array(s);
  if (r) {
    if (a < 0) for (let c = 0; c < s; ++c) u[c] = (o - c) / -a;
    else for (let c = 0; c < s; ++c) u[c] = (o - c) * a;
  } else if (a < 0) for (let c = 0; c < s; ++c) u[c] = (i + c) / -a;
  else for (let c = 0; c < s; ++c) u[c] = (i + c) * a;
  return u;
}
function R_(e, t, n) {
  return (t = +t), (e = +e), (n = +n), pm(e, t, n)[2];
}
function M_(e, t, n) {
  (t = +t), (e = +e), (n = +n);
  const r = t < e,
    i = r ? R_(t, e, n) : R_(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function ZI(e, t) {
  let n;
  for (const r of e) r != null && (n < r || (n === void 0 && r >= r)) && (n = r);
  return n;
}
function QI(e, t) {
  let n;
  for (const r of e) r != null && (n > r || (n === void 0 && r >= r)) && (n = r);
  return n;
}
function L8(e, t, n = 0, r = 1 / 0, i) {
  if (
    ((t = Math.floor(t)),
    (n = Math.floor(Math.max(0, n))),
    (r = Math.floor(Math.min(e.length - 1, r))),
    !(n <= t && t <= r))
  )
    return e;
  for (i = i === void 0 ? $8 : Hse(i); r > n; ) {
    if (r - n > 600) {
      const u = r - n + 1,
        c = t - n + 1,
        d = Math.log(u),
        h = 0.5 * Math.exp((2 * d) / 3),
        p = 0.5 * Math.sqrt((d * h * (u - h)) / u) * (c - u / 2 < 0 ? -1 : 1),
        v = Math.max(n, Math.floor(t - (c * h) / u + p)),
        b = Math.min(r, Math.floor(t + ((u - c) * h) / u + p));
      L8(e, t, v, b, i);
    }
    const o = e[t];
    let a = n,
      s = r;
    for (gc(e, n, t), i(e[r], o) > 0 && gc(e, n, r); a < s; ) {
      for (gc(e, a, s), ++a, --s; i(e[a], o) < 0; ) ++a;
      for (; i(e[s], o) > 0; ) --s;
    }
    i(e[n], o) === 0 ? gc(e, n, s) : (++s, gc(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
  }
  return e;
}
function gc(e, t, n) {
  const r = e[t];
  (e[t] = e[n]), (e[n] = r);
}
function Xse(e, t, n) {
  if (((e = Float64Array.from(Vse(e))), !(!(r = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || r < 2) return QI(e);
    if (t >= 1) return ZI(e);
    var r,
      i = (r - 1) * t,
      o = Math.floor(i),
      a = ZI(L8(e, o).subarray(0, o + 1)),
      s = QI(e.subarray(o + 1));
    return a + (s - a) * (i - o);
  }
}
function Zse(e, t, n = D8) {
  if (!(!(r = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r,
      i = (r - 1) * t,
      o = Math.floor(i),
      a = +n(e[o], o, e),
      s = +n(e[o + 1], o + 1, e);
    return a + (s - a) * (i - o);
  }
}
function Qse(e, t, n) {
  (e = +e), (t = +t), (n = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +n);
  for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, o = new Array(i); ++r < i; ) o[r] = e + r * n;
  return o;
}
function Ir(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function So(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const N_ = Symbol("implicit");
function QO() {
  var e = new YI(),
    t = [],
    n = [],
    r = N_;
  function i(o) {
    let a = e.get(o);
    if (a === void 0) {
      if (r !== N_) return r;
      e.set(o, (a = t.push(o) - 1));
    }
    return n[a % n.length];
  }
  return (
    (i.domain = function (o) {
      if (!arguments.length) return t.slice();
      (t = []), (e = new YI());
      for (const a of o) e.has(a) || e.set(a, t.push(a) - 1);
      return i;
    }),
    (i.range = function (o) {
      return arguments.length ? ((n = Array.from(o)), i) : n.slice();
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((r = o), i) : r;
    }),
    (i.copy = function () {
      return QO(t, n).unknown(r);
    }),
    Ir.apply(i, arguments),
    i
  );
}
function _f() {
  var e = QO().unknown(void 0),
    t = e.domain,
    n = e.range,
    r = 0,
    i = 1,
    o,
    a,
    s = !1,
    u = 0,
    c = 0,
    d = 0.5;
  delete e.unknown;
  function h() {
    var p = t().length,
      v = i < r,
      b = v ? i : r,
      y = v ? r : i;
    (o = (y - b) / Math.max(1, p - u + c * 2)),
      s && (o = Math.floor(o)),
      (b += (y - b - o * (p - u)) * d),
      (a = o * (1 - u)),
      s && ((b = Math.round(b)), (a = Math.round(a)));
    var w = Qse(p).map(function (x) {
      return b + o * x;
    });
    return n(v ? w.reverse() : w);
  }
  return (
    (e.domain = function (p) {
      return arguments.length ? (t(p), h()) : t();
    }),
    (e.range = function (p) {
      return arguments.length ? (([r, i] = p), (r = +r), (i = +i), h()) : [r, i];
    }),
    (e.rangeRound = function (p) {
      return ([r, i] = p), (r = +r), (i = +i), (s = !0), h();
    }),
    (e.bandwidth = function () {
      return a;
    }),
    (e.step = function () {
      return o;
    }),
    (e.round = function (p) {
      return arguments.length ? ((s = !!p), h()) : s;
    }),
    (e.padding = function (p) {
      return arguments.length ? ((u = Math.min(1, (c = +p))), h()) : u;
    }),
    (e.paddingInner = function (p) {
      return arguments.length ? ((u = Math.min(1, p)), h()) : u;
    }),
    (e.paddingOuter = function (p) {
      return arguments.length ? ((c = +p), h()) : c;
    }),
    (e.align = function (p) {
      return arguments.length ? ((d = Math.max(0, Math.min(1, p))), h()) : d;
    }),
    (e.copy = function () {
      return _f(t(), [r, i]).round(s).paddingInner(u).paddingOuter(c).align(d);
    }),
    Ir.apply(h(), arguments)
  );
}
function B8(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return B8(t());
    }),
    e
  );
}
function Hc() {
  return B8(_f.apply(null, arguments).paddingInner(1));
}
function JO(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function F8(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function gd() {}
var Pf = 0.7,
  mm = 1 / Pf,
  El = "\\s*([+-]?\\d+)\\s*",
  Af = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  xi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Jse = /^#([0-9a-f]{3,8})$/,
  ele = new RegExp(`^rgb\\(${El},${El},${El}\\)$`),
  tle = new RegExp(`^rgb\\(${xi},${xi},${xi}\\)$`),
  nle = new RegExp(`^rgba\\(${El},${El},${El},${Af}\\)$`),
  rle = new RegExp(`^rgba\\(${xi},${xi},${xi},${Af}\\)$`),
  ile = new RegExp(`^hsl\\(${Af},${xi},${xi}\\)$`),
  ole = new RegExp(`^hsla\\(${Af},${xi},${xi},${Af}\\)$`),
  JI = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
JO(gd, Of, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: eD,
  formatHex: eD,
  formatHex8: ale,
  formatHsl: sle,
  formatRgb: tD,
  toString: tD,
});
function eD() {
  return this.rgb().formatHex();
}
function ale() {
  return this.rgb().formatHex8();
}
function sle() {
  return V8(this).formatHsl();
}
function tD() {
  return this.rgb().formatRgb();
}
function Of(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = Jse.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? nD(t)
          : n === 3
            ? new Xn(((t >> 8) & 15) | ((t >> 4) & 240), ((t >> 4) & 15) | (t & 240), ((t & 15) << 4) | (t & 15), 1)
            : n === 8
              ? Jh((t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, (t & 255) / 255)
              : n === 4
                ? Jh(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = ele.exec(e))
        ? new Xn(t[1], t[2], t[3], 1)
        : (t = tle.exec(e))
          ? new Xn((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
          : (t = nle.exec(e))
            ? Jh(t[1], t[2], t[3], t[4])
            : (t = rle.exec(e))
              ? Jh((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
              : (t = ile.exec(e))
                ? oD(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = ole.exec(e))
                  ? oD(t[1], t[2] / 100, t[3] / 100, t[4])
                  : JI.hasOwnProperty(e)
                    ? nD(JI[e])
                    : e === "transparent"
                      ? new Xn(NaN, NaN, NaN, 0)
                      : null
  );
}
function nD(e) {
  return new Xn((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Jh(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Xn(e, t, n, r);
}
function lle(e) {
  return e instanceof gd || (e = Of(e)), e ? ((e = e.rgb()), new Xn(e.r, e.g, e.b, e.opacity)) : new Xn();
}
function I_(e, t, n, r) {
  return arguments.length === 1 ? lle(e) : new Xn(e, t, n, r ?? 1);
}
function Xn(e, t, n, r) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
JO(
  Xn,
  I_,
  F8(gd, {
    brighter(e) {
      return (e = e == null ? mm : Math.pow(mm, e)), new Xn(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    darker(e) {
      return (e = e == null ? Pf : Math.pow(Pf, e)), new Xn(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Xn(as(this.r), as(this.g), as(this.b), vm(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: rD,
    formatHex: rD,
    formatHex8: ule,
    formatRgb: iD,
    toString: iD,
  }),
);
function rD() {
  return `#${Xa(this.r)}${Xa(this.g)}${Xa(this.b)}`;
}
function ule() {
  return `#${Xa(this.r)}${Xa(this.g)}${Xa(this.b)}${Xa((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function iD() {
  const e = vm(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${as(this.r)}, ${as(this.g)}, ${as(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function vm(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function as(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Xa(e) {
  return (e = as(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function oD(e, t, n, r) {
  return r <= 0 ? (e = t = n = NaN) : n <= 0 || n >= 1 ? (e = t = NaN) : t <= 0 && (e = NaN), new Kr(e, t, n, r);
}
function V8(e) {
  if (e instanceof Kr) return new Kr(e.h, e.s, e.l, e.opacity);
  if ((e instanceof gd || (e = Of(e)), !e)) return new Kr();
  if (e instanceof Kr) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    i = Math.min(t, n, r),
    o = Math.max(t, n, r),
    a = NaN,
    s = o - i,
    u = (o + i) / 2;
  return (
    s
      ? (t === o ? (a = (n - r) / s + (n < r) * 6) : n === o ? (a = (r - t) / s + 2) : (a = (t - n) / s + 4),
        (s /= u < 0.5 ? o + i : 2 - o - i),
        (a *= 60))
      : (s = u > 0 && u < 1 ? 0 : a),
    new Kr(a, s, u, e.opacity)
  );
}
function cle(e, t, n, r) {
  return arguments.length === 1 ? V8(e) : new Kr(e, t, n, r ?? 1);
}
function Kr(e, t, n, r) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
JO(
  Kr,
  cle,
  F8(gd, {
    brighter(e) {
      return (e = e == null ? mm : Math.pow(mm, e)), new Kr(this.h, this.s, this.l * e, this.opacity);
    },
    darker(e) {
      return (e = e == null ? Pf : Math.pow(Pf, e)), new Kr(this.h, this.s, this.l * e, this.opacity);
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        i = 2 * n - r;
      return new Xn(
        ux(e >= 240 ? e - 240 : e + 120, i, r),
        ux(e, i, r),
        ux(e < 120 ? e + 240 : e - 120, i, r),
        this.opacity,
      );
    },
    clamp() {
      return new Kr(aD(this.h), ep(this.s), ep(this.l), vm(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = vm(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${aD(this.h)}, ${ep(this.s) * 100}%, ${ep(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function aD(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function ep(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ux(e, t, n) {
  return (e < 60 ? t + ((n - t) * e) / 60 : e < 180 ? n : e < 240 ? t + ((n - t) * (240 - e)) / 60 : t) * 255;
}
const eE = (e) => () => e;
function fle(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function dle(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function hle(e) {
  return (e = +e) == 1
    ? z8
    : function (t, n) {
        return n - t ? dle(t, n, e) : eE(isNaN(t) ? n : t);
      };
}
function z8(e, t) {
  var n = t - e;
  return n ? fle(e, n) : eE(isNaN(e) ? t : e);
}
const sD = (function e(t) {
  var n = hle(t);
  function r(i, o) {
    var a = n((i = I_(i)).r, (o = I_(o)).r),
      s = n(i.g, o.g),
      u = n(i.b, o.b),
      c = z8(i.opacity, o.opacity);
    return function (d) {
      return (i.r = a(d)), (i.g = s(d)), (i.b = u(d)), (i.opacity = c(d)), i + "";
    };
  }
  return (r.gamma = e), r;
})(1);
function ple(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    i;
  return function (o) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - o) + t[i] * o;
    return r;
  };
}
function mle(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function vle(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    i = new Array(r),
    o = new Array(n),
    a;
  for (a = 0; a < r; ++a) i[a] = Pu(e[a], t[a]);
  for (; a < n; ++a) o[a] = t[a];
  return function (s) {
    for (a = 0; a < r; ++a) o[a] = i[a](s);
    return o;
  };
}
function yle(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return n.setTime(e * (1 - r) + t * r), n;
    }
  );
}
function ym(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function gle(e, t) {
  var n = {},
    r = {},
    i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? (n[i] = Pu(e[i], t[i])) : (r[i] = t[i]);
  return function (o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var D_ = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  cx = new RegExp(D_.source, "g");
function ble(e) {
  return function () {
    return e;
  };
}
function wle(e) {
  return function (t) {
    return e(t) + "";
  };
}
function xle(e, t) {
  var n = (D_.lastIndex = cx.lastIndex = 0),
    r,
    i,
    o,
    a = -1,
    s = [],
    u = [];
  for (e = e + "", t = t + ""; (r = D_.exec(e)) && (i = cx.exec(t)); )
    (o = i.index) > n && ((o = t.slice(n, o)), s[a] ? (s[a] += o) : (s[++a] = o)),
      (r = r[0]) === (i = i[0])
        ? s[a]
          ? (s[a] += i)
          : (s[++a] = i)
        : ((s[++a] = null),
          u.push({
            i: a,
            x: ym(r, i),
          })),
      (n = cx.lastIndex);
  return (
    n < t.length && ((o = t.slice(n)), s[a] ? (s[a] += o) : (s[++a] = o)),
    s.length < 2
      ? u[0]
        ? wle(u[0].x)
        : ble(t)
      : ((t = u.length),
        function (c) {
          for (var d = 0, h; d < t; ++d) s[(h = u[d]).i] = h.x(c);
          return s.join("");
        })
  );
}
function Pu(e, t) {
  var n = typeof t,
    r;
  return t == null || n === "boolean"
    ? eE(t)
    : (n === "number"
        ? ym
        : n === "string"
          ? (r = Of(t))
            ? ((t = r), sD)
            : xle
          : t instanceof Of
            ? sD
            : t instanceof Date
              ? yle
              : mle(t)
                ? ple
                : Array.isArray(t)
                  ? vle
                  : (typeof t.valueOf != "function" && typeof t.toString != "function") || isNaN(t)
                    ? gle
                    : ym)(e, t);
}
function tE(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function Sle(e, t) {
  t === void 0 && ((t = e), (e = Pu));
  for (var n = 0, r = t.length - 1, i = t[0], o = new Array(r < 0 ? 0 : r); n < r; ) o[n] = e(i, (i = t[++n]));
  return function (a) {
    var s = Math.max(0, Math.min(r - 1, Math.floor((a *= r))));
    return o[s](a - s);
  };
}
function _le(e) {
  return function () {
    return e;
  };
}
function gm(e) {
  return +e;
}
var lD = [0, 1];
function Fn(e) {
  return e;
}
function $_(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : _le(isNaN(t) ? NaN : 0.5);
}
function Ple(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (r) {
      return Math.max(e, Math.min(t, r));
    }
  );
}
function Ale(e, t, n) {
  var r = e[0],
    i = e[1],
    o = t[0],
    a = t[1];
  return (
    i < r ? ((r = $_(i, r)), (o = n(a, o))) : ((r = $_(r, i)), (o = n(o, a))),
    function (s) {
      return o(r(s));
    }
  );
}
function Ole(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    i = new Array(r),
    o = new Array(r),
    a = -1;
  for (e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse())); ++a < r; )
    (i[a] = $_(e[a], e[a + 1])), (o[a] = n(t[a], t[a + 1]));
  return function (s) {
    var u = yd(e, s, 1, r) - 1;
    return o[u](i[u](s));
  };
}
function bd(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Gv() {
  var e = lD,
    t = lD,
    n = Pu,
    r,
    i,
    o,
    a = Fn,
    s,
    u,
    c;
  function d() {
    var p = Math.min(e.length, t.length);
    return a !== Fn && (a = Ple(e[0], e[p - 1])), (s = p > 2 ? Ole : Ale), (u = c = null), h;
  }
  function h(p) {
    return p == null || isNaN((p = +p)) ? o : (u || (u = s(e.map(r), t, n)))(r(a(p)));
  }
  return (
    (h.invert = function (p) {
      return a(i((c || (c = s(t, e.map(r), ym)))(p)));
    }),
    (h.domain = function (p) {
      return arguments.length ? ((e = Array.from(p, gm)), d()) : e.slice();
    }),
    (h.range = function (p) {
      return arguments.length ? ((t = Array.from(p)), d()) : t.slice();
    }),
    (h.rangeRound = function (p) {
      return (t = Array.from(p)), (n = tE), d();
    }),
    (h.clamp = function (p) {
      return arguments.length ? ((a = p ? !0 : Fn), d()) : a !== Fn;
    }),
    (h.interpolate = function (p) {
      return arguments.length ? ((n = p), d()) : n;
    }),
    (h.unknown = function (p) {
      return arguments.length ? ((o = p), h) : o;
    }),
    function (p, v) {
      return (r = p), (i = v), d();
    }
  );
}
function nE() {
  return Gv()(Fn, Fn);
}
function Ele(e) {
  return Math.abs((e = Math.round(e))) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function bm(e, t) {
  if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
  var n,
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function zl(e) {
  return (e = bm(Math.abs(e))), e ? e[1] : NaN;
}
function Tle(e, t) {
  return function (n, r) {
    for (
      var i = n.length, o = [], a = 0, s = e[0], u = 0;
      i > 0 &&
      s > 0 &&
      (u + s + 1 > r && (s = Math.max(1, r - u)), o.push(n.substring((i -= s), i + s)), !((u += s + 1) > r));

    )
      s = e[(a = (a + 1) % e.length)];
    return o.reverse().join(t);
  };
}
function Cle(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (n) {
      return e[+n];
    });
  };
}
var kle = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ef(e) {
  if (!(t = kle.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new rE({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
Ef.prototype = rE.prototype;
function rE(e) {
  (this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + "");
}
rE.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function jle(e) {
  e: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
    switch (e[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), (i = n);
        break;
      default:
        if (!+e[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var q8;
function Rle(e, t) {
  var n = bm(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1],
    o = i - (q8 = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = r.length;
  return o === a
    ? r
    : o > a
      ? r + new Array(o - a + 1).join("0")
      : o > 0
        ? r.slice(0, o) + "." + r.slice(o)
        : "0." + new Array(1 - o).join("0") + bm(e, Math.max(0, t + o - 1))[0];
}
function uD(e, t) {
  var n = bm(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1];
  return i < 0
    ? "0." + new Array(-i).join("0") + r
    : r.length > i + 1
      ? r.slice(0, i + 1) + "." + r.slice(i + 1)
      : r + new Array(i - r.length + 2).join("0");
}
const cD = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: Ele,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => uD(e * 100, t),
  r: uD,
  s: Rle,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function fD(e) {
  return e;
}
var dD = Array.prototype.map,
  hD = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Mle(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? fD : Tle(dD.call(e.grouping, Number), e.thousands + ""),
    n = e.currency === void 0 ? "" : e.currency[0] + "",
    r = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? fD : Cle(dD.call(e.numerals, String)),
    a = e.percent === void 0 ? "%" : e.percent + "",
    s = e.minus === void 0 ? "−" : e.minus + "",
    u = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(h) {
    h = Ef(h);
    var p = h.fill,
      v = h.align,
      b = h.sign,
      y = h.symbol,
      w = h.zero,
      x = h.width,
      S = h.comma,
      _ = h.precision,
      E = h.trim,
      P = h.type;
    P === "n" ? ((S = !0), (P = "g")) : cD[P] || (_ === void 0 && (_ = 12), (E = !0), (P = "g")),
      (w || (p === "0" && v === "=")) && ((w = !0), (p = "0"), (v = "="));
    var O = y === "$" ? n : y === "#" && /[boxX]/.test(P) ? "0" + P.toLowerCase() : "",
      k = y === "$" ? r : /[%p]/.test(P) ? a : "",
      R = cD[P],
      M = /[defgprs%]/.test(P);
    _ = _ === void 0 ? 6 : /[gprs]/.test(P) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
    function D(I) {
      var V = O,
        z = k,
        q,
        U,
        B;
      if (P === "c") (z = R(I) + z), (I = "");
      else {
        I = +I;
        var F = I < 0 || 1 / I < 0;
        if (
          ((I = isNaN(I) ? u : R(Math.abs(I), _)),
          E && (I = jle(I)),
          F && +I == 0 && b !== "+" && (F = !1),
          (V = (F ? (b === "(" ? b : s) : b === "-" || b === "(" ? "" : b) + V),
          (z = (P === "s" ? hD[8 + q8 / 3] : "") + z + (F && b === "(" ? ")" : "")),
          M)
        ) {
          for (q = -1, U = I.length; ++q < U; )
            if (((B = I.charCodeAt(q)), 48 > B || B > 57)) {
              (z = (B === 46 ? i + I.slice(q + 1) : I.slice(q)) + z), (I = I.slice(0, q));
              break;
            }
        }
      }
      S && !w && (I = t(I, 1 / 0));
      var L = V.length + I.length + z.length,
        W = L < x ? new Array(x - L + 1).join(p) : "";
      switch ((S && w && ((I = t(W + I, W.length ? x - z.length : 1 / 0)), (W = "")), v)) {
        case "<":
          I = V + I + z + W;
          break;
        case "=":
          I = V + W + I + z;
          break;
        case "^":
          I = W.slice(0, (L = W.length >> 1)) + V + I + z + W.slice(L);
          break;
        default:
          I = W + V + I + z;
          break;
      }
      return o(I);
    }
    return (
      (D.toString = function () {
        return h + "";
      }),
      D
    );
  }
  function d(h, p) {
    var v = c(((h = Ef(h)), (h.type = "f"), h)),
      b = Math.max(-8, Math.min(8, Math.floor(zl(p) / 3))) * 3,
      y = Math.pow(10, -b),
      w = hD[8 + b / 3];
    return function (x) {
      return v(y * x) + w;
    };
  }
  return {
    format: c,
    formatPrefix: d,
  };
}
var tp, iE, W8;
Nle({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
});
function Nle(e) {
  return (tp = Mle(e)), (iE = tp.format), (W8 = tp.formatPrefix), tp;
}
function Ile(e) {
  return Math.max(0, -zl(Math.abs(e)));
}
function Dle(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(zl(t) / 3))) * 3 - zl(Math.abs(e)));
}
function $le(e, t) {
  return (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, zl(t) - zl(e)) + 1;
}
function U8(e, t, n, r) {
  var i = M_(e, t, n),
    o;
  switch (((r = Ef(r ?? ",f")), r.type)) {
    case "s": {
      var a = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN((o = Dle(i, a))) && (r.precision = o), W8(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null &&
        !isNaN((o = $le(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN((o = Ile(i))) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return iE(r);
}
function ga(e) {
  var t = e.domain;
  return (
    (e.ticks = function (n) {
      var r = t();
      return j_(r[0], r[r.length - 1], n ?? 10);
    }),
    (e.tickFormat = function (n, r) {
      var i = t();
      return U8(i[0], i[i.length - 1], n ?? 10, r);
    }),
    (e.nice = function (n) {
      n == null && (n = 10);
      var r = t(),
        i = 0,
        o = r.length - 1,
        a = r[i],
        s = r[o],
        u,
        c,
        d = 10;
      for (s < a && ((c = a), (a = s), (s = c), (c = i), (i = o), (o = c)); d-- > 0; ) {
        if (((c = R_(a, s, n)), c === u)) return (r[i] = a), (r[o] = s), t(r);
        if (c > 0) (a = Math.floor(a / c) * c), (s = Math.ceil(s / c) * c);
        else if (c < 0) (a = Math.ceil(a * c) / c), (s = Math.floor(s * c) / c);
        else break;
        u = c;
      }
      return e;
    }),
    e
  );
}
function wm() {
  var e = nE();
  return (
    (e.copy = function () {
      return bd(e, wm());
    }),
    Ir.apply(e, arguments),
    ga(e)
  );
}
function H8(e) {
  var t;
  function n(r) {
    return r == null || isNaN((r = +r)) ? t : r;
  }
  return (
    (n.invert = n),
    (n.domain = n.range =
      function (r) {
        return arguments.length ? ((e = Array.from(r, gm)), n) : e.slice();
      }),
    (n.unknown = function (r) {
      return arguments.length ? ((t = r), n) : t;
    }),
    (n.copy = function () {
      return H8(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, gm) : [0, 1]),
    ga(n)
  );
}
function K8(e, t) {
  e = e.slice();
  var n = 0,
    r = e.length - 1,
    i = e[n],
    o = e[r],
    a;
  return o < i && ((a = n), (n = r), (r = a), (a = i), (i = o), (o = a)), (e[n] = t.floor(i)), (e[r] = t.ceil(o)), e;
}
function pD(e) {
  return Math.log(e);
}
function mD(e) {
  return Math.exp(e);
}
function Lle(e) {
  return -Math.log(-e);
}
function Ble(e) {
  return -Math.exp(-e);
}
function Fle(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function Vle(e) {
  return e === 10 ? Fle : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function zle(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) || (e === 2 && Math.log2) || ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function vD(e) {
  return (t, n) => -e(-t, n);
}
function oE(e) {
  const t = e(pD, mD),
    n = t.domain;
  let r = 10,
    i,
    o;
  function a() {
    return (i = zle(r)), (o = Vle(r)), n()[0] < 0 ? ((i = vD(i)), (o = vD(o)), e(Lle, Ble)) : e(pD, mD), t;
  }
  return (
    (t.base = function (s) {
      return arguments.length ? ((r = +s), a()) : r;
    }),
    (t.domain = function (s) {
      return arguments.length ? (n(s), a()) : n();
    }),
    (t.ticks = (s) => {
      const u = n();
      let c = u[0],
        d = u[u.length - 1];
      const h = d < c;
      h && ([c, d] = [d, c]);
      let p = i(c),
        v = i(d),
        b,
        y;
      const w = s == null ? 10 : +s;
      let x = [];
      if (!(r % 1) && v - p < w) {
        if (((p = Math.floor(p)), (v = Math.ceil(v)), c > 0)) {
          for (; p <= v; ++p)
            for (b = 1; b < r; ++b)
              if (((y = p < 0 ? b / o(-p) : b * o(p)), !(y < c))) {
                if (y > d) break;
                x.push(y);
              }
        } else
          for (; p <= v; ++p)
            for (b = r - 1; b >= 1; --b)
              if (((y = p > 0 ? b / o(-p) : b * o(p)), !(y < c))) {
                if (y > d) break;
                x.push(y);
              }
        x.length * 2 < w && (x = j_(c, d, w));
      } else x = j_(p, v, Math.min(v - p, w)).map(o);
      return h ? x.reverse() : x;
    }),
    (t.tickFormat = (s, u) => {
      if (
        (s == null && (s = 10),
        u == null && (u = r === 10 ? "s" : ","),
        typeof u != "function" && (!(r % 1) && (u = Ef(u)).precision == null && (u.trim = !0), (u = iE(u))),
        s === 1 / 0)
      )
        return u;
      const c = Math.max(1, (r * s) / t.ticks().length);
      return (d) => {
        let h = d / o(Math.round(i(d)));
        return h * r < r - 0.5 && (h *= r), h <= c ? u(d) : "";
      };
    }),
    (t.nice = () =>
      n(
        K8(n(), {
          floor: (s) => o(Math.floor(i(s))),
          ceil: (s) => o(Math.ceil(i(s))),
        }),
      )),
    t
  );
}
function G8() {
  const e = oE(Gv()).domain([1, 10]);
  return (e.copy = () => bd(e, G8()).base(e.base())), Ir.apply(e, arguments), e;
}
function yD(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function gD(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function aE(e) {
  var t = 1,
    n = e(yD(t), gD(t));
  return (
    (n.constant = function (r) {
      return arguments.length ? e(yD((t = +r)), gD(t)) : t;
    }),
    ga(n)
  );
}
function Y8() {
  var e = aE(Gv());
  return (
    (e.copy = function () {
      return bd(e, Y8()).constant(e.constant());
    }),
    Ir.apply(e, arguments)
  );
}
function bD(e) {
  return function (t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function qle(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Wle(e) {
  return e < 0 ? -e * e : e * e;
}
function sE(e) {
  var t = e(Fn, Fn),
    n = 1;
  function r() {
    return n === 1 ? e(Fn, Fn) : n === 0.5 ? e(qle, Wle) : e(bD(n), bD(1 / n));
  }
  return (
    (t.exponent = function (i) {
      return arguments.length ? ((n = +i), r()) : n;
    }),
    ga(t)
  );
}
function lE() {
  var e = sE(Gv());
  return (
    (e.copy = function () {
      return bd(e, lE()).exponent(e.exponent());
    }),
    Ir.apply(e, arguments),
    e
  );
}
function Ule() {
  return lE.apply(null, arguments).exponent(0.5);
}
function wD(e) {
  return Math.sign(e) * e * e;
}
function Hle(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function X8() {
  var e = nE(),
    t = [0, 1],
    n = !1,
    r;
  function i(o) {
    var a = Hle(e(o));
    return isNaN(a) ? r : n ? Math.round(a) : a;
  }
  return (
    (i.invert = function (o) {
      return e.invert(wD(o));
    }),
    (i.domain = function (o) {
      return arguments.length ? (e.domain(o), i) : e.domain();
    }),
    (i.range = function (o) {
      return arguments.length ? (e.range((t = Array.from(o, gm)).map(wD)), i) : t.slice();
    }),
    (i.rangeRound = function (o) {
      return i.range(o).round(!0);
    }),
    (i.round = function (o) {
      return arguments.length ? ((n = !!o), i) : n;
    }),
    (i.clamp = function (o) {
      return arguments.length ? (e.clamp(o), i) : e.clamp();
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((r = o), i) : r;
    }),
    (i.copy = function () {
      return X8(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
    }),
    Ir.apply(i, arguments),
    ga(i)
  );
}
function Z8() {
  var e = [],
    t = [],
    n = [],
    r;
  function i() {
    var a = 0,
      s = Math.max(1, t.length);
    for (n = new Array(s - 1); ++a < s; ) n[a - 1] = Zse(e, a / s);
    return o;
  }
  function o(a) {
    return a == null || isNaN((a = +a)) ? r : t[yd(n, a)];
  }
  return (
    (o.invertExtent = function (a) {
      var s = t.indexOf(a);
      return s < 0 ? [NaN, NaN] : [s > 0 ? n[s - 1] : e[0], s < n.length ? n[s] : e[e.length - 1]];
    }),
    (o.domain = function (a) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let s of a) s != null && !isNaN((s = +s)) && e.push(s);
      return e.sort(na), i();
    }),
    (o.range = function (a) {
      return arguments.length ? ((t = Array.from(a)), i()) : t.slice();
    }),
    (o.unknown = function (a) {
      return arguments.length ? ((r = a), o) : r;
    }),
    (o.quantiles = function () {
      return n.slice();
    }),
    (o.copy = function () {
      return Z8().domain(e).range(t).unknown(r);
    }),
    Ir.apply(o, arguments)
  );
}
function Q8() {
  var e = 0,
    t = 1,
    n = 1,
    r = [0.5],
    i = [0, 1],
    o;
  function a(u) {
    return u != null && u <= u ? i[yd(r, u, 0, n)] : o;
  }
  function s() {
    var u = -1;
    for (r = new Array(n); ++u < n; ) r[u] = ((u + 1) * t - (u - n) * e) / (n + 1);
    return a;
  }
  return (
    (a.domain = function (u) {
      return arguments.length ? (([e, t] = u), (e = +e), (t = +t), s()) : [e, t];
    }),
    (a.range = function (u) {
      return arguments.length ? ((n = (i = Array.from(u)).length - 1), s()) : i.slice();
    }),
    (a.invertExtent = function (u) {
      var c = i.indexOf(u);
      return c < 0 ? [NaN, NaN] : c < 1 ? [e, r[0]] : c >= n ? [r[n - 1], t] : [r[c - 1], r[c]];
    }),
    (a.unknown = function (u) {
      return arguments.length && (o = u), a;
    }),
    (a.thresholds = function () {
      return r.slice();
    }),
    (a.copy = function () {
      return Q8().domain([e, t]).range(i).unknown(o);
    }),
    Ir.apply(ga(a), arguments)
  );
}
function J8() {
  var e = [0.5],
    t = [0, 1],
    n,
    r = 1;
  function i(o) {
    return o != null && o <= o ? t[yd(e, o, 0, r)] : n;
  }
  return (
    (i.domain = function (o) {
      return arguments.length ? ((e = Array.from(o)), (r = Math.min(e.length, t.length - 1)), i) : e.slice();
    }),
    (i.range = function (o) {
      return arguments.length ? ((t = Array.from(o)), (r = Math.min(e.length, t.length - 1)), i) : t.slice();
    }),
    (i.invertExtent = function (o) {
      var a = t.indexOf(o);
      return [e[a - 1], e[a]];
    }),
    (i.unknown = function (o) {
      return arguments.length ? ((n = o), i) : n;
    }),
    (i.copy = function () {
      return J8().domain(e).range(t).unknown(n);
    }),
    Ir.apply(i, arguments)
  );
}
const fx = new Date(),
  dx = new Date();
function nn(e, t, n, r) {
  function i(o) {
    return e((o = arguments.length === 0 ? new Date() : new Date(+o))), o;
  }
  return (
    (i.floor = (o) => (e((o = new Date(+o))), o)),
    (i.ceil = (o) => (e((o = new Date(o - 1))), t(o, 1), e(o), o)),
    (i.round = (o) => {
      const a = i(o),
        s = i.ceil(o);
      return o - a < s - o ? a : s;
    }),
    (i.offset = (o, a) => (t((o = new Date(+o)), a == null ? 1 : Math.floor(a)), o)),
    (i.range = (o, a, s) => {
      const u = [];
      if (((o = i.ceil(o)), (s = s == null ? 1 : Math.floor(s)), !(o < a) || !(s > 0))) return u;
      let c;
      do u.push((c = new Date(+o))), t(o, s), e(o);
      while (c < o && o < a);
      return u;
    }),
    (i.filter = (o) =>
      nn(
        (a) => {
          if (a >= a) for (; e(a), !o(a); ) a.setTime(a - 1);
        },
        (a, s) => {
          if (a >= a)
            if (s < 0) for (; ++s <= 0; ) for (; t(a, -1), !o(a); );
            else for (; --s >= 0; ) for (; t(a, 1), !o(a); );
        },
      )),
    n &&
      ((i.count = (o, a) => (fx.setTime(+o), dx.setTime(+a), e(fx), e(dx), Math.floor(n(fx, dx)))),
      (i.every = (o) => (
        (o = Math.floor(o)),
        !isFinite(o) || !(o > 0)
          ? null
          : o > 1
            ? i.filter(r ? (a) => r(a) % o === 0 : (a) => i.count(0, a) % o === 0)
            : i
      ))),
    i
  );
}
const xm = nn(
  () => {},
  (e, t) => {
    e.setTime(+e + t);
  },
  (e, t) => t - e,
);
xm.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? nn(
          (t) => {
            t.setTime(Math.floor(t / e) * e);
          },
          (t, n) => {
            t.setTime(+t + n * e);
          },
          (t, n) => (n - t) / e,
        )
      : xm
);
xm.range;
const Hi = 1e3,
  Or = Hi * 60,
  Ki = Or * 60,
  uo = Ki * 24,
  uE = uo * 7,
  xD = uo * 30,
  hx = uo * 365,
  Za = nn(
    (e) => {
      e.setTime(e - e.getMilliseconds());
    },
    (e, t) => {
      e.setTime(+e + t * Hi);
    },
    (e, t) => (t - e) / Hi,
    (e) => e.getUTCSeconds(),
  );
Za.range;
const cE = nn(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * Hi);
  },
  (e, t) => {
    e.setTime(+e + t * Or);
  },
  (e, t) => (t - e) / Or,
  (e) => e.getMinutes(),
);
cE.range;
const fE = nn(
  (e) => {
    e.setUTCSeconds(0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Or);
  },
  (e, t) => (t - e) / Or,
  (e) => e.getUTCMinutes(),
);
fE.range;
const dE = nn(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * Hi - e.getMinutes() * Or);
  },
  (e, t) => {
    e.setTime(+e + t * Ki);
  },
  (e, t) => (t - e) / Ki,
  (e) => e.getHours(),
);
dE.range;
const hE = nn(
  (e) => {
    e.setUTCMinutes(0, 0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Ki);
  },
  (e, t) => (t - e) / Ki,
  (e) => e.getUTCHours(),
);
hE.range;
const wd = nn(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Or) / uo,
  (e) => e.getDate() - 1,
);
wd.range;
const Yv = nn(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / uo,
  (e) => e.getUTCDate() - 1,
);
Yv.range;
const e6 = nn(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / uo,
  (e) => Math.floor(e / uo),
);
e6.range;
function xs(e) {
  return nn(
    (t) => {
      t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)), t.setHours(0, 0, 0, 0);
    },
    (t, n) => {
      t.setDate(t.getDate() + n * 7);
    },
    (t, n) => (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Or) / uE,
  );
}
const Xv = xs(0),
  Sm = xs(1),
  Kle = xs(2),
  Gle = xs(3),
  ql = xs(4),
  Yle = xs(5),
  Xle = xs(6);
Xv.range;
Sm.range;
Kle.range;
Gle.range;
ql.range;
Yle.range;
Xle.range;
function Ss(e) {
  return nn(
    (t) => {
      t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)), t.setUTCHours(0, 0, 0, 0);
    },
    (t, n) => {
      t.setUTCDate(t.getUTCDate() + n * 7);
    },
    (t, n) => (n - t) / uE,
  );
}
const Zv = Ss(0),
  _m = Ss(1),
  Zle = Ss(2),
  Qle = Ss(3),
  Wl = Ss(4),
  Jle = Ss(5),
  eue = Ss(6);
Zv.range;
_m.range;
Zle.range;
Qle.range;
Wl.range;
Jle.range;
eue.range;
const pE = nn(
  (e) => {
    e.setDate(1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t);
  },
  (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth(),
);
pE.range;
const mE = nn(
  (e) => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t);
  },
  (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth(),
);
mE.range;
const co = nn(
  (e) => {
    e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
);
co.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : nn(
        (t) => {
          t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
        },
        (t, n) => {
          t.setFullYear(t.getFullYear() + n * e);
        },
      );
co.range;
const fo = nn(
  (e) => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
);
fo.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : nn(
        (t) => {
          t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
        },
        (t, n) => {
          t.setUTCFullYear(t.getUTCFullYear() + n * e);
        },
      );
fo.range;
function t6(e, t, n, r, i, o) {
  const a = [
    [Za, 1, Hi],
    [Za, 5, 5 * Hi],
    [Za, 15, 15 * Hi],
    [Za, 30, 30 * Hi],
    [o, 1, Or],
    [o, 5, 5 * Or],
    [o, 15, 15 * Or],
    [o, 30, 30 * Or],
    [i, 1, Ki],
    [i, 3, 3 * Ki],
    [i, 6, 6 * Ki],
    [i, 12, 12 * Ki],
    [r, 1, uo],
    [r, 2, 2 * uo],
    [n, 1, uE],
    [t, 1, xD],
    [t, 3, 3 * xD],
    [e, 1, hx],
  ];
  function s(c, d, h) {
    const p = d < c;
    p && ([c, d] = [d, c]);
    const v = h && typeof h.range == "function" ? h : u(c, d, h),
      b = v ? v.range(c, +d + 1) : [];
    return p ? b.reverse() : b;
  }
  function u(c, d, h) {
    const p = Math.abs(d - c) / h,
      v = ZO(([, , w]) => w).right(a, p);
    if (v === a.length) return e.every(M_(c / hx, d / hx, h));
    if (v === 0) return xm.every(Math.max(M_(c, d, h), 1));
    const [b, y] = a[p / a[v - 1][2] < a[v][2] / p ? v - 1 : v];
    return b.every(y);
  }
  return [s, u];
}
const [tue, nue] = t6(fo, mE, Zv, e6, hE, fE),
  [rue, iue] = t6(co, pE, Xv, wd, dE, cE);
function px(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function mx(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function bc(e, t, n) {
  return {
    y: e,
    m: t,
    d: n,
    H: 0,
    M: 0,
    S: 0,
    L: 0,
  };
}
function oue(e) {
  var t = e.dateTime,
    n = e.date,
    r = e.time,
    i = e.periods,
    o = e.days,
    a = e.shortDays,
    s = e.months,
    u = e.shortMonths,
    c = wc(i),
    d = xc(i),
    h = wc(o),
    p = xc(o),
    v = wc(a),
    b = xc(a),
    y = wc(s),
    w = xc(s),
    x = wc(u),
    S = xc(u),
    _ = {
      a: F,
      A: L,
      b: W,
      B: G,
      c: null,
      d: ED,
      e: ED,
      f: Tue,
      g: Lue,
      G: Fue,
      H: Aue,
      I: Oue,
      j: Eue,
      L: n6,
      m: Cue,
      M: kue,
      p: $,
      q: K,
      Q: kD,
      s: jD,
      S: jue,
      u: Rue,
      U: Mue,
      V: Nue,
      w: Iue,
      W: Due,
      x: null,
      X: null,
      y: $ue,
      Y: Bue,
      Z: Vue,
      "%": CD,
    },
    E = {
      a: ne,
      A: he,
      b: le,
      B: pe,
      c: null,
      d: TD,
      e: TD,
      f: Uue,
      g: tce,
      G: rce,
      H: zue,
      I: que,
      j: Wue,
      L: i6,
      m: Hue,
      M: Kue,
      p: Pe,
      q: xe,
      Q: kD,
      s: jD,
      S: Gue,
      u: Yue,
      U: Xue,
      V: Zue,
      w: Que,
      W: Jue,
      x: null,
      X: null,
      y: ece,
      Y: nce,
      Z: ice,
      "%": CD,
    },
    P = {
      a: D,
      A: I,
      b: V,
      B: z,
      c: q,
      d: AD,
      e: AD,
      f: xue,
      g: PD,
      G: _D,
      H: OD,
      I: OD,
      j: yue,
      L: wue,
      m: vue,
      M: gue,
      p: M,
      q: mue,
      Q: _ue,
      s: Pue,
      S: bue,
      u: cue,
      U: fue,
      V: due,
      w: uue,
      W: hue,
      x: U,
      X: B,
      y: PD,
      Y: _D,
      Z: pue,
      "%": Sue,
    };
  (_.x = O(n, _)), (_.X = O(r, _)), (_.c = O(t, _)), (E.x = O(n, E)), (E.X = O(r, E)), (E.c = O(t, E));
  function O(re, ve) {
    return function (je) {
      var ie = [],
        Qe = -1,
        De = 0,
        Ve = re.length,
        ot,
        se,
        fe;
      for (je instanceof Date || (je = new Date(+je)); ++Qe < Ve; )
        re.charCodeAt(Qe) === 37 &&
          (ie.push(re.slice(De, Qe)),
          (se = SD[(ot = re.charAt(++Qe))]) != null ? (ot = re.charAt(++Qe)) : (se = ot === "e" ? " " : "0"),
          (fe = ve[ot]) && (ot = fe(je, se)),
          ie.push(ot),
          (De = Qe + 1));
      return ie.push(re.slice(De, Qe)), ie.join("");
    };
  }
  function k(re, ve) {
    return function (je) {
      var ie = bc(1900, void 0, 1),
        Qe = R(ie, re, (je += ""), 0),
        De,
        Ve;
      if (Qe != je.length) return null;
      if ("Q" in ie) return new Date(ie.Q);
      if ("s" in ie) return new Date(ie.s * 1e3 + ("L" in ie ? ie.L : 0));
      if (
        (ve && !("Z" in ie) && (ie.Z = 0),
        "p" in ie && (ie.H = (ie.H % 12) + ie.p * 12),
        ie.m === void 0 && (ie.m = "q" in ie ? ie.q : 0),
        "V" in ie)
      ) {
        if (ie.V < 1 || ie.V > 53) return null;
        "w" in ie || (ie.w = 1),
          "Z" in ie
            ? ((De = mx(bc(ie.y, 0, 1))),
              (Ve = De.getUTCDay()),
              (De = Ve > 4 || Ve === 0 ? _m.ceil(De) : _m(De)),
              (De = Yv.offset(De, (ie.V - 1) * 7)),
              (ie.y = De.getUTCFullYear()),
              (ie.m = De.getUTCMonth()),
              (ie.d = De.getUTCDate() + ((ie.w + 6) % 7)))
            : ((De = px(bc(ie.y, 0, 1))),
              (Ve = De.getDay()),
              (De = Ve > 4 || Ve === 0 ? Sm.ceil(De) : Sm(De)),
              (De = wd.offset(De, (ie.V - 1) * 7)),
              (ie.y = De.getFullYear()),
              (ie.m = De.getMonth()),
              (ie.d = De.getDate() + ((ie.w + 6) % 7)));
      } else
        ("W" in ie || "U" in ie) &&
          ("w" in ie || (ie.w = "u" in ie ? ie.u % 7 : "W" in ie ? 1 : 0),
          (Ve = "Z" in ie ? mx(bc(ie.y, 0, 1)).getUTCDay() : px(bc(ie.y, 0, 1)).getDay()),
          (ie.m = 0),
          (ie.d = "W" in ie ? ((ie.w + 6) % 7) + ie.W * 7 - ((Ve + 5) % 7) : ie.w + ie.U * 7 - ((Ve + 6) % 7)));
      return "Z" in ie ? ((ie.H += (ie.Z / 100) | 0), (ie.M += ie.Z % 100), mx(ie)) : px(ie);
    };
  }
  function R(re, ve, je, ie) {
    for (var Qe = 0, De = ve.length, Ve = je.length, ot, se; Qe < De; ) {
      if (ie >= Ve) return -1;
      if (((ot = ve.charCodeAt(Qe++)), ot === 37)) {
        if (((ot = ve.charAt(Qe++)), (se = P[ot in SD ? ve.charAt(Qe++) : ot]), !se || (ie = se(re, je, ie)) < 0))
          return -1;
      } else if (ot != je.charCodeAt(ie++)) return -1;
    }
    return ie;
  }
  function M(re, ve, je) {
    var ie = c.exec(ve.slice(je));
    return ie ? ((re.p = d.get(ie[0].toLowerCase())), je + ie[0].length) : -1;
  }
  function D(re, ve, je) {
    var ie = v.exec(ve.slice(je));
    return ie ? ((re.w = b.get(ie[0].toLowerCase())), je + ie[0].length) : -1;
  }
  function I(re, ve, je) {
    var ie = h.exec(ve.slice(je));
    return ie ? ((re.w = p.get(ie[0].toLowerCase())), je + ie[0].length) : -1;
  }
  function V(re, ve, je) {
    var ie = x.exec(ve.slice(je));
    return ie ? ((re.m = S.get(ie[0].toLowerCase())), je + ie[0].length) : -1;
  }
  function z(re, ve, je) {
    var ie = y.exec(ve.slice(je));
    return ie ? ((re.m = w.get(ie[0].toLowerCase())), je + ie[0].length) : -1;
  }
  function q(re, ve, je) {
    return R(re, t, ve, je);
  }
  function U(re, ve, je) {
    return R(re, n, ve, je);
  }
  function B(re, ve, je) {
    return R(re, r, ve, je);
  }
  function F(re) {
    return a[re.getDay()];
  }
  function L(re) {
    return o[re.getDay()];
  }
  function W(re) {
    return u[re.getMonth()];
  }
  function G(re) {
    return s[re.getMonth()];
  }
  function $(re) {
    return i[+(re.getHours() >= 12)];
  }
  function K(re) {
    return 1 + ~~(re.getMonth() / 3);
  }
  function ne(re) {
    return a[re.getUTCDay()];
  }
  function he(re) {
    return o[re.getUTCDay()];
  }
  function le(re) {
    return u[re.getUTCMonth()];
  }
  function pe(re) {
    return s[re.getUTCMonth()];
  }
  function Pe(re) {
    return i[+(re.getUTCHours() >= 12)];
  }
  function xe(re) {
    return 1 + ~~(re.getUTCMonth() / 3);
  }
  return {
    format: function (re) {
      var ve = O((re += ""), _);
      return (
        (ve.toString = function () {
          return re;
        }),
        ve
      );
    },
    parse: function (re) {
      var ve = k((re += ""), !1);
      return (
        (ve.toString = function () {
          return re;
        }),
        ve
      );
    },
    utcFormat: function (re) {
      var ve = O((re += ""), E);
      return (
        (ve.toString = function () {
          return re;
        }),
        ve
      );
    },
    utcParse: function (re) {
      var ve = k((re += ""), !0);
      return (
        (ve.toString = function () {
          return re;
        }),
        ve
      );
    },
  };
}
var SD = {
    "-": "",
    _: " ",
    0: "0",
  },
  cn = /^\s*\d+/,
  aue = /^%/,
  sue = /[\\^$*+?|[\]().{}]/g;
function lt(e, t, n) {
  var r = e < 0 ? "-" : "",
    i = (r ? -e : e) + "",
    o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(t) + i : i);
}
function lue(e) {
  return e.replace(sue, "\\$&");
}
function wc(e) {
  return new RegExp("^(?:" + e.map(lue).join("|") + ")", "i");
}
function xc(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function uue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 1));
  return r ? ((e.w = +r[0]), n + r[0].length) : -1;
}
function cue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 1));
  return r ? ((e.u = +r[0]), n + r[0].length) : -1;
}
function fue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.U = +r[0]), n + r[0].length) : -1;
}
function due(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.V = +r[0]), n + r[0].length) : -1;
}
function hue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.W = +r[0]), n + r[0].length) : -1;
}
function _D(e, t, n) {
  var r = cn.exec(t.slice(n, n + 4));
  return r ? ((e.y = +r[0]), n + r[0].length) : -1;
}
function PD(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function pue(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), n + r[0].length) : -1;
}
function mue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 1));
  return r ? ((e.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function vue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
}
function AD(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.d = +r[0]), n + r[0].length) : -1;
}
function yue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 3));
  return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
}
function OD(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.H = +r[0]), n + r[0].length) : -1;
}
function gue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.M = +r[0]), n + r[0].length) : -1;
}
function bue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 2));
  return r ? ((e.S = +r[0]), n + r[0].length) : -1;
}
function wue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 3));
  return r ? ((e.L = +r[0]), n + r[0].length) : -1;
}
function xue(e, t, n) {
  var r = cn.exec(t.slice(n, n + 6));
  return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function Sue(e, t, n) {
  var r = aue.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function _ue(e, t, n) {
  var r = cn.exec(t.slice(n));
  return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
}
function Pue(e, t, n) {
  var r = cn.exec(t.slice(n));
  return r ? ((e.s = +r[0]), n + r[0].length) : -1;
}
function ED(e, t) {
  return lt(e.getDate(), t, 2);
}
function Aue(e, t) {
  return lt(e.getHours(), t, 2);
}
function Oue(e, t) {
  return lt(e.getHours() % 12 || 12, t, 2);
}
function Eue(e, t) {
  return lt(1 + wd.count(co(e), e), t, 3);
}
function n6(e, t) {
  return lt(e.getMilliseconds(), t, 3);
}
function Tue(e, t) {
  return n6(e, t) + "000";
}
function Cue(e, t) {
  return lt(e.getMonth() + 1, t, 2);
}
function kue(e, t) {
  return lt(e.getMinutes(), t, 2);
}
function jue(e, t) {
  return lt(e.getSeconds(), t, 2);
}
function Rue(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Mue(e, t) {
  return lt(Xv.count(co(e) - 1, e), t, 2);
}
function r6(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? ql(e) : ql.ceil(e);
}
function Nue(e, t) {
  return (e = r6(e)), lt(ql.count(co(e), e) + (co(e).getDay() === 4), t, 2);
}
function Iue(e) {
  return e.getDay();
}
function Due(e, t) {
  return lt(Sm.count(co(e) - 1, e), t, 2);
}
function $ue(e, t) {
  return lt(e.getFullYear() % 100, t, 2);
}
function Lue(e, t) {
  return (e = r6(e)), lt(e.getFullYear() % 100, t, 2);
}
function Bue(e, t) {
  return lt(e.getFullYear() % 1e4, t, 4);
}
function Fue(e, t) {
  var n = e.getDay();
  return (e = n >= 4 || n === 0 ? ql(e) : ql.ceil(e)), lt(e.getFullYear() % 1e4, t, 4);
}
function Vue(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : ((t *= -1), "+")) + lt((t / 60) | 0, "0", 2) + lt(t % 60, "0", 2);
}
function TD(e, t) {
  return lt(e.getUTCDate(), t, 2);
}
function zue(e, t) {
  return lt(e.getUTCHours(), t, 2);
}
function que(e, t) {
  return lt(e.getUTCHours() % 12 || 12, t, 2);
}
function Wue(e, t) {
  return lt(1 + Yv.count(fo(e), e), t, 3);
}
function i6(e, t) {
  return lt(e.getUTCMilliseconds(), t, 3);
}
function Uue(e, t) {
  return i6(e, t) + "000";
}
function Hue(e, t) {
  return lt(e.getUTCMonth() + 1, t, 2);
}
function Kue(e, t) {
  return lt(e.getUTCMinutes(), t, 2);
}
function Gue(e, t) {
  return lt(e.getUTCSeconds(), t, 2);
}
function Yue(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Xue(e, t) {
  return lt(Zv.count(fo(e) - 1, e), t, 2);
}
function o6(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Wl(e) : Wl.ceil(e);
}
function Zue(e, t) {
  return (e = o6(e)), lt(Wl.count(fo(e), e) + (fo(e).getUTCDay() === 4), t, 2);
}
function Que(e) {
  return e.getUTCDay();
}
function Jue(e, t) {
  return lt(_m.count(fo(e) - 1, e), t, 2);
}
function ece(e, t) {
  return lt(e.getUTCFullYear() % 100, t, 2);
}
function tce(e, t) {
  return (e = o6(e)), lt(e.getUTCFullYear() % 100, t, 2);
}
function nce(e, t) {
  return lt(e.getUTCFullYear() % 1e4, t, 4);
}
function rce(e, t) {
  var n = e.getUTCDay();
  return (e = n >= 4 || n === 0 ? Wl(e) : Wl.ceil(e)), lt(e.getUTCFullYear() % 1e4, t, 4);
}
function ice() {
  return "+0000";
}
function CD() {
  return "%";
}
function kD(e) {
  return +e;
}
function jD(e) {
  return Math.floor(+e / 1e3);
}
var nl, a6, s6;
oce({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
});
function oce(e) {
  return (nl = oue(e)), (a6 = nl.format), nl.parse, (s6 = nl.utcFormat), nl.utcParse, nl;
}
function ace(e) {
  return new Date(e);
}
function sce(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function vE(e, t, n, r, i, o, a, s, u, c) {
  var d = nE(),
    h = d.invert,
    p = d.domain,
    v = c(".%L"),
    b = c(":%S"),
    y = c("%I:%M"),
    w = c("%I %p"),
    x = c("%a %d"),
    S = c("%b %d"),
    _ = c("%B"),
    E = c("%Y");
  function P(O) {
    return (
      u(O) < O ? v : s(O) < O ? b : a(O) < O ? y : o(O) < O ? w : r(O) < O ? (i(O) < O ? x : S) : n(O) < O ? _ : E
    )(O);
  }
  return (
    (d.invert = function (O) {
      return new Date(h(O));
    }),
    (d.domain = function (O) {
      return arguments.length ? p(Array.from(O, sce)) : p().map(ace);
    }),
    (d.ticks = function (O) {
      var k = p();
      return e(k[0], k[k.length - 1], O ?? 10);
    }),
    (d.tickFormat = function (O, k) {
      return k == null ? P : c(k);
    }),
    (d.nice = function (O) {
      var k = p();
      return (!O || typeof O.range != "function") && (O = t(k[0], k[k.length - 1], O ?? 10)), O ? p(K8(k, O)) : d;
    }),
    (d.copy = function () {
      return bd(d, vE(e, t, n, r, i, o, a, s, u, c));
    }),
    d
  );
}
function lce() {
  return Ir.apply(
    vE(rue, iue, co, pE, Xv, wd, dE, cE, Za, a6).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]),
    arguments,
  );
}
function uce() {
  return Ir.apply(
    vE(tue, nue, fo, mE, Zv, Yv, hE, fE, Za, s6).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]),
    arguments,
  );
}
function Qv() {
  var e = 0,
    t = 1,
    n,
    r,
    i,
    o,
    a = Fn,
    s = !1,
    u;
  function c(h) {
    return h == null || isNaN((h = +h))
      ? u
      : a(i === 0 ? 0.5 : ((h = (o(h) - n) * i), s ? Math.max(0, Math.min(1, h)) : h));
  }
  (c.domain = function (h) {
    return arguments.length
      ? (([e, t] = h), (n = o((e = +e))), (r = o((t = +t))), (i = n === r ? 0 : 1 / (r - n)), c)
      : [e, t];
  }),
    (c.clamp = function (h) {
      return arguments.length ? ((s = !!h), c) : s;
    }),
    (c.interpolator = function (h) {
      return arguments.length ? ((a = h), c) : a;
    });
  function d(h) {
    return function (p) {
      var v, b;
      return arguments.length ? (([v, b] = p), (a = h(v, b)), c) : [a(0), a(1)];
    };
  }
  return (
    (c.range = d(Pu)),
    (c.rangeRound = d(tE)),
    (c.unknown = function (h) {
      return arguments.length ? ((u = h), c) : u;
    }),
    function (h) {
      return (o = h), (n = h(e)), (r = h(t)), (i = n === r ? 0 : 1 / (r - n)), c;
    }
  );
}
function ba(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function l6() {
  var e = ga(Qv()(Fn));
  return (
    (e.copy = function () {
      return ba(e, l6());
    }),
    So.apply(e, arguments)
  );
}
function u6() {
  var e = oE(Qv()).domain([1, 10]);
  return (
    (e.copy = function () {
      return ba(e, u6()).base(e.base());
    }),
    So.apply(e, arguments)
  );
}
function c6() {
  var e = aE(Qv());
  return (
    (e.copy = function () {
      return ba(e, c6()).constant(e.constant());
    }),
    So.apply(e, arguments)
  );
}
function yE() {
  var e = sE(Qv());
  return (
    (e.copy = function () {
      return ba(e, yE()).exponent(e.exponent());
    }),
    So.apply(e, arguments)
  );
}
function cce() {
  return yE.apply(null, arguments).exponent(0.5);
}
function f6() {
  var e = [],
    t = Fn;
  function n(r) {
    if (r != null && !isNaN((r = +r))) return t((yd(e, r, 1) - 1) / (e.length - 1));
  }
  return (
    (n.domain = function (r) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let i of r) i != null && !isNaN((i = +i)) && e.push(i);
      return e.sort(na), n;
    }),
    (n.interpolator = function (r) {
      return arguments.length ? ((t = r), n) : t;
    }),
    (n.range = function () {
      return e.map((r, i) => t(i / (e.length - 1)));
    }),
    (n.quantiles = function (r) {
      return Array.from(
        {
          length: r + 1,
        },
        (i, o) => Xse(e, o / r),
      );
    }),
    (n.copy = function () {
      return f6(t).domain(e);
    }),
    So.apply(n, arguments)
  );
}
function Jv() {
  var e = 0,
    t = 0.5,
    n = 1,
    r = 1,
    i,
    o,
    a,
    s,
    u,
    c = Fn,
    d,
    h = !1,
    p;
  function v(y) {
    return isNaN((y = +y))
      ? p
      : ((y = 0.5 + ((y = +d(y)) - o) * (r * y < r * o ? s : u)), c(h ? Math.max(0, Math.min(1, y)) : y));
  }
  (v.domain = function (y) {
    return arguments.length
      ? (([e, t, n] = y),
        (i = d((e = +e))),
        (o = d((t = +t))),
        (a = d((n = +n))),
        (s = i === o ? 0 : 0.5 / (o - i)),
        (u = o === a ? 0 : 0.5 / (a - o)),
        (r = o < i ? -1 : 1),
        v)
      : [e, t, n];
  }),
    (v.clamp = function (y) {
      return arguments.length ? ((h = !!y), v) : h;
    }),
    (v.interpolator = function (y) {
      return arguments.length ? ((c = y), v) : c;
    });
  function b(y) {
    return function (w) {
      var x, S, _;
      return arguments.length ? (([x, S, _] = w), (c = Sle(y, [x, S, _])), v) : [c(0), c(0.5), c(1)];
    };
  }
  return (
    (v.range = b(Pu)),
    (v.rangeRound = b(tE)),
    (v.unknown = function (y) {
      return arguments.length ? ((p = y), v) : p;
    }),
    function (y) {
      return (
        (d = y),
        (i = y(e)),
        (o = y(t)),
        (a = y(n)),
        (s = i === o ? 0 : 0.5 / (o - i)),
        (u = o === a ? 0 : 0.5 / (a - o)),
        (r = o < i ? -1 : 1),
        v
      );
    }
  );
}
function d6() {
  var e = ga(Jv()(Fn));
  return (
    (e.copy = function () {
      return ba(e, d6());
    }),
    So.apply(e, arguments)
  );
}
function h6() {
  var e = oE(Jv()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return ba(e, h6()).base(e.base());
    }),
    So.apply(e, arguments)
  );
}
function p6() {
  var e = aE(Jv());
  return (
    (e.copy = function () {
      return ba(e, p6()).constant(e.constant());
    }),
    So.apply(e, arguments)
  );
}
function gE() {
  var e = sE(Jv());
  return (
    (e.copy = function () {
      return ba(e, gE()).exponent(e.exponent());
    }),
    So.apply(e, arguments)
  );
}
function fce() {
  return gE.apply(null, arguments).exponent(0.5);
}
const RD = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      scaleBand: _f,
      scaleDiverging: d6,
      scaleDivergingLog: h6,
      scaleDivergingPow: gE,
      scaleDivergingSqrt: fce,
      scaleDivergingSymlog: p6,
      scaleIdentity: H8,
      scaleImplicit: N_,
      scaleLinear: wm,
      scaleLog: G8,
      scaleOrdinal: QO,
      scalePoint: Hc,
      scalePow: lE,
      scaleQuantile: Z8,
      scaleQuantize: Q8,
      scaleRadial: X8,
      scaleSequential: l6,
      scaleSequentialLog: u6,
      scaleSequentialPow: yE,
      scaleSequentialQuantile: f6,
      scaleSequentialSqrt: cce,
      scaleSequentialSymlog: c6,
      scaleSqrt: Ule,
      scaleSymlog: Y8,
      scaleThreshold: J8,
      scaleTime: lce,
      scaleUtc: uce,
      tickFormat: U8,
    },
    Symbol.toStringTag,
    {
      value: "Module",
    },
  ),
);
var vx, MD;
function m6() {
  if (MD) return vx;
  MD = 1;
  var e = bu();
  function t(n, r, i) {
    for (var o = -1, a = n.length; ++o < a; ) {
      var s = n[o],
        u = r(s);
      if (u != null && (c === void 0 ? u === u && !e(u) : i(u, c)))
        var c = u,
          d = s;
    }
    return d;
  }
  return (vx = t), vx;
}
var yx, ND;
function dce() {
  if (ND) return yx;
  ND = 1;
  function e(t, n) {
    return t > n;
  }
  return (yx = e), yx;
}
var gx, ID;
function hce() {
  if (ID) return gx;
  ID = 1;
  var e = m6(),
    t = dce(),
    n = Su();
  function r(i) {
    return i && i.length ? e(i, n, t) : void 0;
  }
  return (gx = r), gx;
}
var pce = hce();
const Jo = ht(pce);
var bx, DD;
function mce() {
  if (DD) return bx;
  DD = 1;
  function e(t, n) {
    return t < n;
  }
  return (bx = e), bx;
}
var wx, $D;
function vce() {
  if ($D) return wx;
  $D = 1;
  var e = m6(),
    t = mce(),
    n = Su();
  function r(i) {
    return i && i.length ? e(i, n, t) : void 0;
  }
  return (wx = r), wx;
}
var yce = vce();
const ey = ht(yce);
var xx, LD;
function gce() {
  if (LD) return xx;
  LD = 1;
  var e = NO(),
    t = ya(),
    n = _8(),
    r = er();
  function i(o, a) {
    var s = r(o) ? e : n;
    return s(o, t(a, 3));
  }
  return (xx = i), xx;
}
var Sx, BD;
function bce() {
  if (BD) return Sx;
  BD = 1;
  var e = x8(),
    t = gce();
  function n(r, i) {
    return e(t(r, i), 1);
  }
  return (Sx = n), Sx;
}
var wce = bce();
const xce = ht(wce);
var _x, FD;
function Sce() {
  if (FD) return _x;
  FD = 1;
  var e = KO();
  function t(n, r) {
    return e(n, r);
  }
  return (_x = t), _x;
}
var _ce = Sce();
const Tf = ht(_ce);
var Au = 1e9,
  Pce = {
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
  },
  wE,
  kt = !0,
  Cr = "[DecimalError] ",
  ss = Cr + "Invalid argument: ",
  bE = Cr + "Exponent out of range: ",
  Ou = Math.floor,
  za = Math.pow,
  Ace = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  lr,
  ln = 1e7,
  _t = 7,
  v6 = 9007199254740991,
  Pm = Ou(v6 / _t),
  Ee = {};
Ee.absoluteValue = Ee.abs = function () {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
Ee.comparedTo = Ee.cmp = function (e) {
  var t,
    n,
    r,
    i,
    o = this;
  if (((e = new o.constructor(e)), o.s !== e.s)) return o.s || -e.s;
  if (o.e !== e.e) return (o.e > e.e) ^ (o.s < 0) ? 1 : -1;
  for (r = o.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t)
    if (o.d[t] !== e.d[t]) return (o.d[t] > e.d[t]) ^ (o.s < 0) ? 1 : -1;
  return r === i ? 0 : (r > i) ^ (o.s < 0) ? 1 : -1;
};
Ee.decimalPlaces = Ee.dp = function () {
  var e = this,
    t = e.d.length - 1,
    n = (t - e.e) * _t;
  if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) n--;
  return n < 0 ? 0 : n;
};
Ee.dividedBy = Ee.div = function (e) {
  return no(this, new this.constructor(e));
};
Ee.dividedToIntegerBy = Ee.idiv = function (e) {
  var t = this,
    n = t.constructor;
  return gt(no(t, new n(e), 0, 1), n.precision);
};
Ee.equals = Ee.eq = function (e) {
  return !this.cmp(e);
};
Ee.exponent = function () {
  return Kt(this);
};
Ee.greaterThan = Ee.gt = function (e) {
  return this.cmp(e) > 0;
};
Ee.greaterThanOrEqualTo = Ee.gte = function (e) {
  return this.cmp(e) >= 0;
};
Ee.isInteger = Ee.isint = function () {
  return this.e > this.d.length - 2;
};
Ee.isNegative = Ee.isneg = function () {
  return this.s < 0;
};
Ee.isPositive = Ee.ispos = function () {
  return this.s > 0;
};
Ee.isZero = function () {
  return this.s === 0;
};
Ee.lessThan = Ee.lt = function (e) {
  return this.cmp(e) < 0;
};
Ee.lessThanOrEqualTo = Ee.lte = function (e) {
  return this.cmp(e) < 1;
};
Ee.logarithm = Ee.log = function (e) {
  var t,
    n = this,
    r = n.constructor,
    i = r.precision,
    o = i + 5;
  if (e === void 0) e = new r(10);
  else if (((e = new r(e)), e.s < 1 || e.eq(lr))) throw Error(Cr + "NaN");
  if (n.s < 1) throw Error(Cr + (n.s ? "NaN" : "-Infinity"));
  return n.eq(lr) ? new r(0) : ((kt = !1), (t = no(Cf(n, o), Cf(e, o), o)), (kt = !0), gt(t, i));
};
Ee.minus = Ee.sub = function (e) {
  var t = this;
  return (e = new t.constructor(e)), t.s == e.s ? b6(t, e) : y6(t, ((e.s = -e.s), e));
};
Ee.modulo = Ee.mod = function (e) {
  var t,
    n = this,
    r = n.constructor,
    i = r.precision;
  if (((e = new r(e)), !e.s)) throw Error(Cr + "NaN");
  return n.s ? ((kt = !1), (t = no(n, e, 0, 1).times(e)), (kt = !0), n.minus(t)) : gt(new r(n), i);
};
Ee.naturalExponential = Ee.exp = function () {
  return g6(this);
};
Ee.naturalLogarithm = Ee.ln = function () {
  return Cf(this);
};
Ee.negated = Ee.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s || 0), e;
};
Ee.plus = Ee.add = function (e) {
  var t = this;
  return (e = new t.constructor(e)), t.s == e.s ? y6(t, e) : b6(t, ((e.s = -e.s), e));
};
Ee.precision = Ee.sd = function (e) {
  var t,
    n,
    r,
    i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(ss + e);
  if (((t = Kt(i) + 1), (r = i.d.length - 1), (n = r * _t + 1), (r = i.d[r]), r)) {
    for (; r % 10 == 0; r /= 10) n--;
    for (r = i.d[0]; r >= 10; r /= 10) n++;
  }
  return e && t > n ? t : n;
};
Ee.squareRoot = Ee.sqrt = function () {
  var e,
    t,
    n,
    r,
    i,
    o,
    a,
    s = this,
    u = s.constructor;
  if (s.s < 1) {
    if (!s.s) return new u(0);
    throw Error(Cr + "NaN");
  }
  for (
    e = Kt(s),
      kt = !1,
      i = Math.sqrt(+s),
      i == 0 || i == 1 / 0
        ? ((t = pi(s.d)),
          (t.length + e) % 2 == 0 && (t += "0"),
          (i = Math.sqrt(t)),
          (e = Ou((e + 1) / 2) - (e < 0 || e % 2)),
          i == 1 / 0 ? (t = "5e" + e) : ((t = i.toExponential()), (t = t.slice(0, t.indexOf("e") + 1) + e)),
          (r = new u(t)))
        : (r = new u(i.toString())),
      n = u.precision,
      i = a = n + 3;
    ;

  )
    if (((o = r), (r = o.plus(no(s, o, a + 2)).times(0.5)), pi(o.d).slice(0, a) === (t = pi(r.d)).slice(0, a))) {
      if (((t = t.slice(a - 3, a + 1)), i == a && t == "4999")) {
        if ((gt(o, n + 1, 0), o.times(o).eq(s))) {
          r = o;
          break;
        }
      } else if (t != "9999") break;
      a += 4;
    }
  return (kt = !0), gt(r, n);
};
Ee.times = Ee.mul = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d = this,
    h = d.constructor,
    p = d.d,
    v = (e = new h(e)).d;
  if (!d.s || !e.s) return new h(0);
  for (
    e.s *= d.s,
      n = d.e + e.e,
      u = p.length,
      c = v.length,
      u < c && ((o = p), (p = v), (v = o), (a = u), (u = c), (c = a)),
      o = [],
      a = u + c,
      r = a;
    r--;

  )
    o.push(0);
  for (r = c; --r >= 0; ) {
    for (t = 0, i = u + r; i > r; ) (s = o[i] + v[r] * p[i - r - 1] + t), (o[i--] = s % ln | 0), (t = (s / ln) | 0);
    o[i] = (o[i] + t) % ln | 0;
  }
  for (; !o[--a]; ) o.pop();
  return t ? ++n : o.shift(), (e.d = o), (e.e = n), kt ? gt(e, h.precision) : e;
};
Ee.toDecimalPlaces = Ee.todp = function (e, t) {
  var n = this,
    r = n.constructor;
  return (
    (n = new r(n)),
    e === void 0 ? n : (Oi(e, 0, Au), t === void 0 ? (t = r.rounding) : Oi(t, 0, 8), gt(n, e + Kt(n) + 1, t))
  );
};
Ee.toExponential = function (e, t) {
  var n,
    r = this,
    i = r.constructor;
  return (
    e === void 0
      ? (n = ps(r, !0))
      : (Oi(e, 0, Au),
        t === void 0 ? (t = i.rounding) : Oi(t, 0, 8),
        (r = gt(new i(r), e + 1, t)),
        (n = ps(r, !0, e + 1))),
    n
  );
};
Ee.toFixed = function (e, t) {
  var n,
    r,
    i = this,
    o = i.constructor;
  return e === void 0
    ? ps(i)
    : (Oi(e, 0, Au),
      t === void 0 ? (t = o.rounding) : Oi(t, 0, 8),
      (r = gt(new o(i), e + Kt(i) + 1, t)),
      (n = ps(r.abs(), !1, e + Kt(r) + 1)),
      i.isneg() && !i.isZero() ? "-" + n : n);
};
Ee.toInteger = Ee.toint = function () {
  var e = this,
    t = e.constructor;
  return gt(new t(e), Kt(e) + 1, t.rounding);
};
Ee.toNumber = function () {
  return +this;
};
Ee.toPower = Ee.pow = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s = this,
    u = s.constructor,
    c = 12,
    d = +(e = new u(e));
  if (!e.s) return new u(lr);
  if (((s = new u(s)), !s.s)) {
    if (e.s < 1) throw Error(Cr + "Infinity");
    return s;
  }
  if (s.eq(lr)) return s;
  if (((r = u.precision), e.eq(lr))) return gt(s, r);
  if (((t = e.e), (n = e.d.length - 1), (a = t >= n), (o = s.s), a)) {
    if ((n = d < 0 ? -d : d) <= v6) {
      for (
        i = new u(lr), t = Math.ceil(r / _t + 4), kt = !1;
        n % 2 && ((i = i.times(s)), zD(i.d, t)), (n = Ou(n / 2)), n !== 0;

      )
        (s = s.times(s)), zD(s.d, t);
      return (kt = !0), e.s < 0 ? new u(lr).div(i) : gt(i, r);
    }
  } else if (o < 0) throw Error(Cr + "NaN");
  return (
    (o = o < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1),
    (s.s = 1),
    (kt = !1),
    (i = e.times(Cf(s, r + c))),
    (kt = !0),
    (i = g6(i)),
    (i.s = o),
    i
  );
};
Ee.toPrecision = function (e, t) {
  var n,
    r,
    i = this,
    o = i.constructor;
  return (
    e === void 0
      ? ((n = Kt(i)), (r = ps(i, n <= o.toExpNeg || n >= o.toExpPos)))
      : (Oi(e, 1, Au),
        t === void 0 ? (t = o.rounding) : Oi(t, 0, 8),
        (i = gt(new o(i), e, t)),
        (n = Kt(i)),
        (r = ps(i, e <= n || n <= o.toExpNeg, e))),
    r
  );
};
Ee.toSignificantDigits = Ee.tosd = function (e, t) {
  var n = this,
    r = n.constructor;
  return (
    e === void 0
      ? ((e = r.precision), (t = r.rounding))
      : (Oi(e, 1, Au), t === void 0 ? (t = r.rounding) : Oi(t, 0, 8)),
    gt(new r(n), e, t)
  );
};
Ee.toString =
  Ee.valueOf =
  Ee.val =
  Ee.toJSON =
  Ee[Symbol.for("nodejs.util.inspect.custom")] =
    function () {
      var e = this,
        t = Kt(e),
        n = e.constructor;
      return ps(e, t <= n.toExpNeg || t >= n.toExpPos);
    };
function y6(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d = e.constructor,
    h = d.precision;
  if (!e.s || !t.s) return t.s || (t = new d(e)), kt ? gt(t, h) : t;
  if (((u = e.d), (c = t.d), (a = e.e), (i = t.e), (u = u.slice()), (o = a - i), o)) {
    for (
      o < 0 ? ((r = u), (o = -o), (s = c.length)) : ((r = c), (i = a), (s = u.length)),
        a = Math.ceil(h / _t),
        s = a > s ? a + 1 : s + 1,
        o > s && ((o = s), (r.length = 1)),
        r.reverse();
      o--;

    )
      r.push(0);
    r.reverse();
  }
  for (s = u.length, o = c.length, s - o < 0 && ((o = s), (r = c), (c = u), (u = r)), n = 0; o; )
    (n = ((u[--o] = u[o] + c[o] + n) / ln) | 0), (u[o] %= ln);
  for (n && (u.unshift(n), ++i), s = u.length; u[--s] == 0; ) u.pop();
  return (t.d = u), (t.e = i), kt ? gt(t, h) : t;
}
function Oi(e, t, n) {
  if (e !== ~~e || e < t || e > n) throw Error(ss + e);
}
function pi(e) {
  var t,
    n,
    r,
    i = e.length - 1,
    o = "",
    a = e[0];
  if (i > 0) {
    for (o += a, t = 1; t < i; t++) (r = e[t] + ""), (n = _t - r.length), n && (o += Go(n)), (o += r);
    (a = e[t]), (r = a + ""), (n = _t - r.length), n && (o += Go(n));
  } else if (a === 0) return "0";
  for (; a % 10 === 0; ) a /= 10;
  return o + a;
}
var no = (function () {
  function e(r, i) {
    var o,
      a = 0,
      s = r.length;
    for (r = r.slice(); s--; ) (o = r[s] * i + a), (r[s] = o % ln | 0), (a = (o / ln) | 0);
    return a && r.unshift(a), r;
  }
  function t(r, i, o, a) {
    var s, u;
    if (o != a) u = o > a ? 1 : -1;
    else
      for (s = u = 0; s < o; s++)
        if (r[s] != i[s]) {
          u = r[s] > i[s] ? 1 : -1;
          break;
        }
    return u;
  }
  function n(r, i, o) {
    for (var a = 0; o--; ) (r[o] -= a), (a = r[o] < i[o] ? 1 : 0), (r[o] = a * ln + r[o] - i[o]);
    for (; !r[0] && r.length > 1; ) r.shift();
  }
  return function (r, i, o, a) {
    var s,
      u,
      c,
      d,
      h,
      p,
      v,
      b,
      y,
      w,
      x,
      S,
      _,
      E,
      P,
      O,
      k,
      R,
      M = r.constructor,
      D = r.s == i.s ? 1 : -1,
      I = r.d,
      V = i.d;
    if (!r.s) return new M(r);
    if (!i.s) throw Error(Cr + "Division by zero");
    for (u = r.e - i.e, k = V.length, P = I.length, v = new M(D), b = v.d = [], c = 0; V[c] == (I[c] || 0); ) ++c;
    if (
      (V[c] > (I[c] || 0) && --u,
      o == null ? (S = o = M.precision) : a ? (S = o + (Kt(r) - Kt(i)) + 1) : (S = o),
      S < 0)
    )
      return new M(0);
    if (((S = (S / _t + 2) | 0), (c = 0), k == 1))
      for (d = 0, V = V[0], S++; (c < P || d) && S--; c++)
        (_ = d * ln + (I[c] || 0)), (b[c] = (_ / V) | 0), (d = _ % V | 0);
    else {
      for (
        d = (ln / (V[0] + 1)) | 0,
          d > 1 && ((V = e(V, d)), (I = e(I, d)), (k = V.length), (P = I.length)),
          E = k,
          y = I.slice(0, k),
          w = y.length;
        w < k;

      )
        y[w++] = 0;
      (R = V.slice()), R.unshift(0), (O = V[0]), V[1] >= ln / 2 && ++O;
      do
        (d = 0),
          (s = t(V, y, k, w)),
          s < 0
            ? ((x = y[0]),
              k != w && (x = x * ln + (y[1] || 0)),
              (d = (x / O) | 0),
              d > 1
                ? (d >= ln && (d = ln - 1),
                  (h = e(V, d)),
                  (p = h.length),
                  (w = y.length),
                  (s = t(h, y, p, w)),
                  s == 1 && (d--, n(h, k < p ? R : V, p)))
                : (d == 0 && (s = d = 1), (h = V.slice())),
              (p = h.length),
              p < w && h.unshift(0),
              n(y, h, w),
              s == -1 && ((w = y.length), (s = t(V, y, k, w)), s < 1 && (d++, n(y, k < w ? R : V, w))),
              (w = y.length))
            : s === 0 && (d++, (y = [0])),
          (b[c++] = d),
          s && y[0] ? (y[w++] = I[E] || 0) : ((y = [I[E]]), (w = 1));
      while ((E++ < P || y[0] !== void 0) && S--);
    }
    return b[0] || b.shift(), (v.e = u), gt(v, a ? o + Kt(v) + 1 : o);
  };
})();
function g6(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    u = 0,
    c = 0,
    d = e.constructor,
    h = d.precision;
  if (Kt(e) > 16) throw Error(bE + Kt(e));
  if (!e.s) return new d(lr);
  for (kt = !1, s = h, a = new d(0.03125); e.abs().gte(0.1); ) (e = e.times(a)), (c += 5);
  for (r = ((Math.log(za(2, c)) / Math.LN10) * 2 + 5) | 0, s += r, n = i = o = new d(lr), d.precision = s; ; ) {
    if (
      ((i = gt(i.times(e), s)),
      (n = n.times(++u)),
      (a = o.plus(no(i, n, s))),
      pi(a.d).slice(0, s) === pi(o.d).slice(0, s))
    ) {
      for (; c--; ) o = gt(o.times(o), s);
      return (d.precision = h), t == null ? ((kt = !0), gt(o, h)) : o;
    }
    o = a;
  }
}
function Kt(e) {
  for (var t = e.e * _t, n = e.d[0]; n >= 10; n /= 10) t++;
  return t;
}
function Px(e, t, n) {
  if (t > e.LN10.sd()) throw ((kt = !0), n && (e.precision = n), Error(Cr + "LN10 precision limit exceeded"));
  return gt(new e(e.LN10), t);
}
function Go(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Cf(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h = 1,
    p = 10,
    v = e,
    b = v.d,
    y = v.constructor,
    w = y.precision;
  if (v.s < 1) throw Error(Cr + (v.s ? "NaN" : "-Infinity"));
  if (v.eq(lr)) return new y(0);
  if ((t == null ? ((kt = !1), (c = w)) : (c = t), v.eq(10))) return t == null && (kt = !0), Px(y, c);
  if (((c += p), (y.precision = c), (n = pi(b)), (r = n.charAt(0)), (o = Kt(v)), Math.abs(o) < 15e14)) {
    for (; (r < 7 && r != 1) || (r == 1 && n.charAt(1) > 3); ) (v = v.times(e)), (n = pi(v.d)), (r = n.charAt(0)), h++;
    (o = Kt(v)), r > 1 ? ((v = new y("0." + n)), o++) : (v = new y(r + "." + n.slice(1)));
  } else
    return (
      (u = Px(y, c + 2, w).times(o + "")),
      (v = Cf(new y(r + "." + n.slice(1)), c - p).plus(u)),
      (y.precision = w),
      t == null ? ((kt = !0), gt(v, w)) : v
    );
  for (s = a = v = no(v.minus(lr), v.plus(lr), c), d = gt(v.times(v), c), i = 3; ; ) {
    if (((a = gt(a.times(d), c)), (u = s.plus(no(a, new y(i), c))), pi(u.d).slice(0, c) === pi(s.d).slice(0, c)))
      return (
        (s = s.times(2)),
        o !== 0 && (s = s.plus(Px(y, c + 2, w).times(o + ""))),
        (s = no(s, new y(h), c)),
        (y.precision = w),
        t == null ? ((kt = !0), gt(s, w)) : s
      );
    (s = u), (i += 2);
  }
}
function VD(e, t) {
  var n, r, i;
  for (
    (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (r = t.search(/e/i)) > 0
        ? (n < 0 && (n = r), (n += +t.slice(r + 1)), (t = t.substring(0, r)))
        : n < 0 && (n = t.length),
      r = 0;
    t.charCodeAt(r) === 48;

  )
    ++r;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (((t = t.slice(r, i)), t)) {
    if (((i -= r), (n = n - r - 1), (e.e = Ou(n / _t)), (e.d = []), (r = (n + 1) % _t), n < 0 && (r += _t), r < i)) {
      for (r && e.d.push(+t.slice(0, r)), i -= _t; r < i; ) e.d.push(+t.slice(r, (r += _t)));
      (t = t.slice(r)), (r = _t - t.length);
    } else r -= i;
    for (; r--; ) t += "0";
    if ((e.d.push(+t), kt && (e.e > Pm || e.e < -Pm))) throw Error(bE + n);
  } else (e.s = 0), (e.e = 0), (e.d = [0]);
  return e;
}
function gt(e, t, n) {
  var r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h = e.d;
  for (a = 1, o = h[0]; o >= 10; o /= 10) a++;
  if (((r = t - a), r < 0)) (r += _t), (i = t), (c = h[(d = 0)]);
  else {
    if (((d = Math.ceil((r + 1) / _t)), (o = h.length), d >= o)) return e;
    for (c = o = h[d], a = 1; o >= 10; o /= 10) a++;
    (r %= _t), (i = r - _t + a);
  }
  if (
    (n !== void 0 &&
      ((o = za(10, a - i - 1)),
      (s = (c / o) % 10 | 0),
      (u = t < 0 || h[d + 1] !== void 0 || c % o),
      (u =
        n < 4
          ? (s || u) && (n == 0 || n == (e.s < 0 ? 3 : 2))
          : s > 5 ||
            (s == 5 &&
              (n == 4 ||
                u ||
                (n == 6 && (r > 0 ? (i > 0 ? c / za(10, a - i) : 0) : h[d - 1]) % 10 & 1) ||
                n == (e.s < 0 ? 8 : 7))))),
    t < 1 || !h[0])
  )
    return (
      u
        ? ((o = Kt(e)),
          (h.length = 1),
          (t = t - o - 1),
          (h[0] = za(10, (_t - (t % _t)) % _t)),
          (e.e = Ou(-t / _t) || 0))
        : ((h.length = 1), (h[0] = e.e = e.s = 0)),
      e
    );
  if (
    (r == 0
      ? ((h.length = d), (o = 1), d--)
      : ((h.length = d + 1), (o = za(10, _t - r)), (h[d] = i > 0 ? ((c / za(10, a - i)) % za(10, i) | 0) * o : 0)),
    u)
  )
    for (;;)
      if (d == 0) {
        (h[0] += o) == ln && ((h[0] = 1), ++e.e);
        break;
      } else {
        if (((h[d] += o), h[d] != ln)) break;
        (h[d--] = 0), (o = 1);
      }
  for (r = h.length; h[--r] === 0; ) h.pop();
  if (kt && (e.e > Pm || e.e < -Pm)) throw Error(bE + Kt(e));
  return e;
}
function b6(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h,
    p = e.constructor,
    v = p.precision;
  if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new p(e)), kt ? gt(t, v) : t;
  if (((u = e.d), (h = t.d), (r = t.e), (c = e.e), (u = u.slice()), (a = c - r), a)) {
    for (
      d = a < 0,
        d ? ((n = u), (a = -a), (s = h.length)) : ((n = h), (r = c), (s = u.length)),
        i = Math.max(Math.ceil(v / _t), s) + 2,
        a > i && ((a = i), (n.length = 1)),
        n.reverse(),
        i = a;
      i--;

    )
      n.push(0);
    n.reverse();
  } else {
    for (i = u.length, s = h.length, d = i < s, d && (s = i), i = 0; i < s; i++)
      if (u[i] != h[i]) {
        d = u[i] < h[i];
        break;
      }
    a = 0;
  }
  for (d && ((n = u), (u = h), (h = n), (t.s = -t.s)), s = u.length, i = h.length - s; i > 0; --i) u[s++] = 0;
  for (i = h.length; i > a; ) {
    if (u[--i] < h[i]) {
      for (o = i; o && u[--o] === 0; ) u[o] = ln - 1;
      --u[o], (u[i] += ln);
    }
    u[i] -= h[i];
  }
  for (; u[--s] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --r;
  return u[0] ? ((t.d = u), (t.e = r), kt ? gt(t, v) : t) : new p(0);
}
function ps(e, t, n) {
  var r,
    i = Kt(e),
    o = pi(e.d),
    a = o.length;
  return (
    t
      ? (n && (r = n - a) > 0
          ? (o = o.charAt(0) + "." + o.slice(1) + Go(r))
          : a > 1 && (o = o.charAt(0) + "." + o.slice(1)),
        (o = o + (i < 0 ? "e" : "e+") + i))
      : i < 0
        ? ((o = "0." + Go(-i - 1) + o), n && (r = n - a) > 0 && (o += Go(r)))
        : i >= a
          ? ((o += Go(i + 1 - a)), n && (r = n - i - 1) > 0 && (o = o + "." + Go(r)))
          : ((r = i + 1) < a && (o = o.slice(0, r) + "." + o.slice(r)),
            n && (r = n - a) > 0 && (i + 1 === a && (o += "."), (o += Go(r)))),
    e.s < 0 ? "-" + o : o
  );
}
function zD(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function w6(e) {
  var t, n, r;
  function i(o) {
    var a = this;
    if (!(a instanceof i)) return new i(o);
    if (((a.constructor = i), o instanceof i)) {
      (a.s = o.s), (a.e = o.e), (a.d = (o = o.d) ? o.slice() : o);
      return;
    }
    if (typeof o == "number") {
      if (o * 0 !== 0) throw Error(ss + o);
      if (o > 0) a.s = 1;
      else if (o < 0) (o = -o), (a.s = -1);
      else {
        (a.s = 0), (a.e = 0), (a.d = [0]);
        return;
      }
      if (o === ~~o && o < 1e7) {
        (a.e = 0), (a.d = [o]);
        return;
      }
      return VD(a, o.toString());
    } else if (typeof o != "string") throw Error(ss + o);
    if ((o.charCodeAt(0) === 45 ? ((o = o.slice(1)), (a.s = -1)) : (a.s = 1), Ace.test(o))) VD(a, o);
    else throw Error(ss + o);
  }
  if (
    ((i.prototype = Ee),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = w6),
    (i.config = i.set = Oce),
    e === void 0 && (e = {}),
    e)
  )
    for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < r.length; )
      e.hasOwnProperty((n = r[t++])) || (e[n] = this[n]);
  return i.config(e), i;
}
function Oce(e) {
  if (!e || typeof e != "object") throw Error(Cr + "Object expected");
  var t,
    n,
    r,
    i = ["precision", 1, Au, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
  for (t = 0; t < i.length; t += 3)
    if ((r = e[(n = i[t])]) !== void 0)
      if (Ou(r) === r && r >= i[t + 1] && r <= i[t + 2]) this[n] = r;
      else throw Error(ss + n + ": " + r);
  if ((r = e[(n = "LN10")]) !== void 0)
    if (r == Math.LN10) this[n] = new this(r);
    else throw Error(ss + n + ": " + r);
  return this;
}
var wE = w6(Pce);
lr = new wE(1);
const pt = wE;
function Ece(e) {
  return jce(e) || kce(e) || Cce(e) || Tce();
}
function Tce() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Cce(e, t) {
  if (e) {
    if (typeof e == "string") return L_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return L_(e, t);
  }
}
function kce(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function jce(e) {
  if (Array.isArray(e)) return L_(e);
}
function L_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var Rce = function (t) {
    return t;
  },
  x6 = {},
  S6 = function (t) {
    return t === x6;
  },
  qD = function (t) {
    return function n() {
      return arguments.length === 0 || (arguments.length === 1 && S6(arguments.length <= 0 ? void 0 : arguments[0]))
        ? n
        : t.apply(void 0, arguments);
    };
  },
  Mce = function e(t, n) {
    return t === 1
      ? n
      : qD(function () {
          for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
          var a = i.filter(function (s) {
            return s !== x6;
          }).length;
          return a >= t
            ? n.apply(void 0, i)
            : e(
                t - a,
                qD(function () {
                  for (var s = arguments.length, u = new Array(s), c = 0; c < s; c++) u[c] = arguments[c];
                  var d = i.map(function (h) {
                    return S6(h) ? u.shift() : h;
                  });
                  return n.apply(void 0, Ece(d).concat(u));
                }),
              );
        });
  },
  ty = function (t) {
    return Mce(t.length, t);
  },
  B_ = function (t, n) {
    for (var r = [], i = t; i < n; ++i) r[i - t] = i;
    return r;
  },
  Nce = ty(function (e, t) {
    return Array.isArray(t)
      ? t.map(e)
      : Object.keys(t)
          .map(function (n) {
            return t[n];
          })
          .map(e);
  }),
  Ice = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    if (!n.length) return Rce;
    var i = n.reverse(),
      o = i[0],
      a = i.slice(1);
    return function () {
      return a.reduce(
        function (s, u) {
          return u(s);
        },
        o.apply(void 0, arguments),
      );
    };
  },
  F_ = function (t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
  },
  _6 = function (t) {
    var n = null,
      r = null;
    return function () {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return (
        (n &&
          o.every(function (s, u) {
            return s === n[u];
          })) ||
          ((n = o), (r = t.apply(void 0, o))),
        r
      );
    };
  };
function Dce(e) {
  var t;
  return e === 0 ? (t = 1) : (t = Math.floor(new pt(e).abs().log(10).toNumber()) + 1), t;
}
function $ce(e, t, n) {
  for (var r = new pt(e), i = 0, o = []; r.lt(t) && i < 1e5; ) o.push(r.toNumber()), (r = r.add(n)), i++;
  return o;
}
var Lce = ty(function (e, t, n) {
    var r = +e,
      i = +t;
    return r + n * (i - r);
  }),
  Bce = ty(function (e, t, n) {
    var r = t - +e;
    return (r = r || 1 / 0), (n - e) / r;
  }),
  Fce = ty(function (e, t, n) {
    var r = t - +e;
    return (r = r || 1 / 0), Math.max(0, Math.min(1, (n - e) / r));
  });
const ny = {
  rangeStep: $ce,
  getDigitCount: Dce,
  interpolateNumber: Lce,
  uninterpolateNumber: Bce,
  uninterpolateTruncation: Fce,
};
function V_(e) {
  return qce(e) || zce(e) || P6(e) || Vce();
}
function Vce() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zce(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function qce(e) {
  if (Array.isArray(e)) return z_(e);
}
function kf(e, t) {
  return Hce(e) || Uce(e, t) || P6(e, t) || Wce();
}
function Wce() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function P6(e, t) {
  if (e) {
    if (typeof e == "string") return z_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return z_(e, t);
  }
}
function z_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Uce(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var n = [],
      r = !0,
      i = !1,
      o = void 0;
    try {
      for (
        var a = e[Symbol.iterator](), s;
        !(r = (s = a.next()).done) && (n.push(s.value), !(t && n.length === t));
        r = !0
      );
    } catch (u) {
      (i = !0), (o = u);
    } finally {
      try {
        !r && a.return != null && a.return();
      } finally {
        if (i) throw o;
      }
    }
    return n;
  }
}
function Hce(e) {
  if (Array.isArray(e)) return e;
}
function A6(e) {
  var t = kf(e, 2),
    n = t[0],
    r = t[1],
    i = n,
    o = r;
  return n > r && ((i = r), (o = n)), [i, o];
}
function O6(e, t, n) {
  if (e.lte(0)) return new pt(0);
  var r = ny.getDigitCount(e.toNumber()),
    i = new pt(10).pow(r),
    o = e.div(i),
    a = r !== 1 ? 0.05 : 0.1,
    s = new pt(Math.ceil(o.div(a).toNumber())).add(n).mul(a),
    u = s.mul(i);
  return t ? u : new pt(Math.ceil(u));
}
function Kce(e, t, n) {
  var r = 1,
    i = new pt(e);
  if (!i.isint() && n) {
    var o = Math.abs(e);
    o < 1
      ? ((r = new pt(10).pow(ny.getDigitCount(e) - 1)), (i = new pt(Math.floor(i.div(r).toNumber())).mul(r)))
      : o > 1 && (i = new pt(Math.floor(e)));
  } else e === 0 ? (i = new pt(Math.floor((t - 1) / 2))) : n || (i = new pt(Math.floor(e)));
  var a = Math.floor((t - 1) / 2),
    s = Ice(
      Nce(function (u) {
        return i.add(new pt(u - a).mul(r)).toNumber();
      }),
      B_,
    );
  return s(0, t);
}
function E6(e, t, n, r) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (n - 1)))
    return {
      step: new pt(0),
      tickMin: new pt(0),
      tickMax: new pt(0),
    };
  var o = O6(new pt(t).sub(e).div(n - 1), r, i),
    a;
  e <= 0 && t >= 0 ? (a = new pt(0)) : ((a = new pt(e).add(t).div(2)), (a = a.sub(new pt(a).mod(o))));
  var s = Math.ceil(a.sub(e).div(o).toNumber()),
    u = Math.ceil(new pt(t).sub(a).div(o).toNumber()),
    c = s + u + 1;
  return c > n
    ? E6(e, t, n, r, i + 1)
    : (c < n && ((u = t > 0 ? u + (n - c) : u), (s = t > 0 ? s : s + (n - c))),
      {
        step: o,
        tickMin: a.sub(new pt(s).mul(o)),
        tickMax: a.add(new pt(u).mul(o)),
      });
}
function Gce(e) {
  var t = kf(e, 2),
    n = t[0],
    r = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    s = A6([n, r]),
    u = kf(s, 2),
    c = u[0],
    d = u[1];
  if (c === -1 / 0 || d === 1 / 0) {
    var h =
      d === 1 / 0
        ? [c].concat(
            V_(
              B_(0, i - 1).map(function () {
                return 1 / 0;
              }),
            ),
          )
        : [].concat(
            V_(
              B_(0, i - 1).map(function () {
                return -1 / 0;
              }),
            ),
            [d],
          );
    return n > r ? F_(h) : h;
  }
  if (c === d) return Kce(c, i, o);
  var p = E6(c, d, a, o),
    v = p.step,
    b = p.tickMin,
    y = p.tickMax,
    w = ny.rangeStep(b, y.add(new pt(0.1).mul(v)), v);
  return n > r ? F_(w) : w;
}
function Yce(e, t) {
  var n = kf(e, 2),
    r = n[0],
    i = n[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = A6([r, i]),
    s = kf(a, 2),
    u = s[0],
    c = s[1];
  if (u === -1 / 0 || c === 1 / 0) return [r, i];
  if (u === c) return [u];
  var d = Math.max(t, 2),
    h = O6(new pt(c).sub(u).div(d - 1), o, 0),
    p = [].concat(V_(ny.rangeStep(new pt(u), new pt(c).sub(new pt(0.99).mul(h)), h)), [c]);
  return r > i ? F_(p) : p;
}
var Xce = _6(Gce),
  Zce = _6(Yce),
  Qce = "Invariant failed";
function ms(e, t) {
  throw new Error(Qce);
}
var Jce = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function Ul(e) {
  "@babel/helpers - typeof";

  return (
    (Ul =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ul(e)
  );
}
function Am() {
  return (
    (Am = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Am.apply(this, arguments)
  );
}
function efe(e, t) {
  return ife(e) || rfe(e, t) || nfe(e, t) || tfe();
}
function tfe() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nfe(e, t) {
  if (e) {
    if (typeof e == "string") return WD(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return WD(e, t);
  }
}
function WD(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function rfe(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function ife(e) {
  if (Array.isArray(e)) return e;
}
function ofe(e, t) {
  if (e == null) return {};
  var n = afe(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function afe(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function sfe(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function lfe(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, k6(r.key), r);
  }
}
function ufe(e, t, n) {
  return (
    t && lfe(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function cfe(e, t, n) {
  return (t = Om(t)), ffe(e, T6() ? Reflect.construct(t, n || [], Om(e).constructor) : t.apply(e, n));
}
function ffe(e, t) {
  if (t && (Ul(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return dfe(e);
}
function dfe(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function T6() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (T6 = function () {
    return !!e;
  })();
}
function Om(e) {
  return (
    (Om = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Om(e)
  );
}
function hfe(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && q_(e, t);
}
function q_(e, t) {
  return (
    (q_ = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    q_(e, t)
  );
}
function C6(e, t, n) {
  return (
    (t = k6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function k6(e) {
  var t = pfe(e, "string");
  return Ul(t) == "symbol" ? t : t + "";
}
function pfe(e, t) {
  if (Ul(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ul(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ry = (function (e) {
  function t() {
    return sfe(this, t), cfe(this, t, arguments);
  }
  return (
    hfe(t, e),
    ufe(t, [
      {
        key: "render",
        value: function () {
          var r = this.props,
            i = r.offset,
            o = r.layout,
            a = r.width,
            s = r.dataKey,
            u = r.data,
            c = r.dataPointFormatter,
            d = r.xAxis,
            h = r.yAxis,
            p = ofe(r, Jce),
            v = rt(p, !1);
          this.props.direction === "x" && d.type !== "number" && ms();
          var b = u.map(function (y) {
            var w = c(y, s),
              x = w.x,
              S = w.y,
              _ = w.value,
              E = w.errorVal;
            if (!E) return null;
            var P = [],
              O,
              k;
            if (Array.isArray(E)) {
              var R = efe(E, 2);
              (O = R[0]), (k = R[1]);
            } else O = k = E;
            if (o === "vertical") {
              var M = d.scale,
                D = S + i,
                I = D + a,
                V = D - a,
                z = M(_ - O),
                q = M(_ + k);
              P.push({
                x1: q,
                y1: I,
                x2: q,
                y2: V,
              }),
                P.push({
                  x1: z,
                  y1: D,
                  x2: q,
                  y2: D,
                }),
                P.push({
                  x1: z,
                  y1: I,
                  x2: z,
                  y2: V,
                });
            } else if (o === "horizontal") {
              var U = h.scale,
                B = x + i,
                F = B - a,
                L = B + a,
                W = U(_ - O),
                G = U(_ + k);
              P.push({
                x1: F,
                y1: G,
                x2: L,
                y2: G,
              }),
                P.push({
                  x1: B,
                  y1: W,
                  x2: B,
                  y2: G,
                }),
                P.push({
                  x1: F,
                  y1: W,
                  x2: L,
                  y2: W,
                });
            }
            return ReactDefault.createElement(
              Nt,
              Am(
                {
                  className: "recharts-errorBar",
                  key: "bar-".concat(
                    P.map(function ($) {
                      return "".concat($.x1, "-").concat($.x2, "-").concat($.y1, "-").concat($.y2);
                    }),
                  ),
                },
                v,
              ),
              P.map(function ($) {
                return ReactDefault.createElement(
                  "line",
                  Am({}, $, {
                    key: "line-".concat($.x1, "-").concat($.x2, "-").concat($.y1, "-").concat($.y2),
                  }),
                );
              }),
            );
          });
          return ReactDefault.createElement(
            Nt,
            {
              className: "recharts-errorBars",
            },
            b,
          );
        },
      },
    ])
  );
})(ReactDefault.Component);
C6(ry, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal",
});
C6(ry, "displayName", "ErrorBar");
function jf(e) {
  "@babel/helpers - typeof";

  return (
    (jf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    jf(e)
  );
}
function UD(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function La(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? UD(Object(n), !0).forEach(function (r) {
          mfe(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : UD(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function mfe(e, t, n) {
  return (
    (t = vfe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function vfe(e) {
  var t = yfe(e, "string");
  return jf(t) == "symbol" ? t : t + "";
}
function yfe(e, t) {
  if (jf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (jf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var j6 = function (t) {
  var n = t.children,
    r = t.formattedGraphicalItems,
    i = t.legendWidth,
    o = t.legendContent,
    a = sr(n, Ol);
  if (!a) return null;
  var s = Ol.defaultProps,
    u = s !== void 0 ? La(La({}, s), a.props) : {},
    c;
  return (
    a.props && a.props.payload
      ? (c = a.props && a.props.payload)
      : o === "children"
        ? (c = (r || []).reduce(function (d, h) {
            var p = h.item,
              v = h.props,
              b = v.sectors || v.data || [];
            return d.concat(
              b.map(function (y) {
                return {
                  type: a.props.iconType || p.props.legendType,
                  value: y.name,
                  color: y.fill,
                  payload: y,
                };
              }),
            );
          }, []))
        : (c = (r || []).map(function (d) {
            var h = d.item,
              p = h.type.defaultProps,
              v = p !== void 0 ? La(La({}, p), h.props) : {},
              b = v.dataKey,
              y = v.name,
              w = v.legendType,
              x = v.hide;
            return {
              inactive: x,
              dataKey: b,
              type: u.iconType || w || "square",
              color: xE(h),
              value: y || b,
              payload: v,
            };
          })),
    La(
      La(La({}, u), Ol.getWithHeight(a, i)),
      {},
      {
        payload: c,
        item: a,
      },
    )
  );
};
function Rf(e) {
  "@babel/helpers - typeof";

  return (
    (Rf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Rf(e)
  );
}
function HD(e) {
  return xfe(e) || wfe(e) || bfe(e) || gfe();
}
function gfe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bfe(e, t) {
  if (e) {
    if (typeof e == "string") return W_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return W_(e, t);
  }
}
function wfe(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function xfe(e) {
  if (Array.isArray(e)) return W_(e);
}
function W_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function KD(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Lt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? KD(Object(n), !0).forEach(function (r) {
          Tl(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : KD(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Tl(e, t, n) {
  return (
    (t = Sfe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Sfe(e) {
  var t = _fe(e, "string");
  return Rf(t) == "symbol" ? t : t + "";
}
function _fe(e, t) {
  if (Rf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Rf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function hr(e, t, n) {
  return it(e) || it(t) ? n : Jt(t) ? Er(e, t, n) : nt(t) ? t(e) : n;
}
function Kc(e, t, n, r) {
  var i = xce(e, function (s) {
    return hr(s, t);
  });
  if (n === "number") {
    var o = i.filter(function (s) {
      return be(s) || parseFloat(s);
    });
    return o.length ? [ey(o), Jo(o)] : [1 / 0, -1 / 0];
  }
  var a = r
    ? i.filter(function (s) {
        return !it(s);
      })
    : i;
  return a.map(function (s) {
    return Jt(s) || s instanceof Date ? s : "";
  });
}
var Pfe = function (t) {
    var n,
      r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      i = arguments.length > 2 ? arguments[2] : void 0,
      o = arguments.length > 3 ? arguments[3] : void 0,
      a = -1,
      s = (n = r?.length) !== null && n !== void 0 ? n : 0;
    if (s <= 1) return 0;
    if (o && o.axisType === "angleAxis" && Math.abs(Math.abs(o.range[1] - o.range[0]) - 360) <= 1e-6)
      for (var u = o.range, c = 0; c < s; c++) {
        var d = c > 0 ? i[c - 1].coordinate : i[s - 1].coordinate,
          h = i[c].coordinate,
          p = c >= s - 1 ? i[0].coordinate : i[c + 1].coordinate,
          v = void 0;
        if (Xr(h - d) !== Xr(p - h)) {
          var b = [];
          if (Xr(p - h) === Xr(u[1] - u[0])) {
            v = p;
            var y = h + u[1] - u[0];
            (b[0] = Math.min(y, (y + d) / 2)), (b[1] = Math.max(y, (y + d) / 2));
          } else {
            v = d;
            var w = p + u[1] - u[0];
            (b[0] = Math.min(h, (w + h) / 2)), (b[1] = Math.max(h, (w + h) / 2));
          }
          var x = [Math.min(h, (v + h) / 2), Math.max(h, (v + h) / 2)];
          if ((t > x[0] && t <= x[1]) || (t >= b[0] && t <= b[1])) {
            a = i[c].index;
            break;
          }
        } else {
          var S = Math.min(d, p),
            _ = Math.max(d, p);
          if (t > (S + h) / 2 && t <= (_ + h) / 2) {
            a = i[c].index;
            break;
          }
        }
      }
    else
      for (var E = 0; E < s; E++)
        if (
          (E === 0 && t <= (r[E].coordinate + r[E + 1].coordinate) / 2) ||
          (E > 0 &&
            E < s - 1 &&
            t > (r[E].coordinate + r[E - 1].coordinate) / 2 &&
            t <= (r[E].coordinate + r[E + 1].coordinate) / 2) ||
          (E === s - 1 && t > (r[E].coordinate + r[E - 1].coordinate) / 2)
        ) {
          a = r[E].index;
          break;
        }
    return a;
  },
  xE = function (t) {
    var n,
      r = t,
      i = r.type.displayName,
      o = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Lt(Lt({}, t.type.defaultProps), t.props) : t.props,
      a = o.stroke,
      s = o.fill,
      u;
    switch (i) {
      case "Line":
        u = a;
        break;
      case "Area":
      case "Radar":
        u = a && a !== "none" ? a : s;
        break;
      default:
        u = s;
        break;
    }
    return u;
  },
  Afe = function (t) {
    var n = t.barSize,
      r = t.totalSize,
      i = t.stackGroups,
      o = i === void 0 ? {} : i;
    if (!o) return {};
    for (var a = {}, s = Object.keys(o), u = 0, c = s.length; u < c; u++)
      for (var d = o[s[u]].stackGroups, h = Object.keys(d), p = 0, v = h.length; p < v; p++) {
        var b = d[h[p]],
          y = b.items,
          w = b.cateAxisId,
          x = y.filter(function (k) {
            return to(k.type).indexOf("Bar") >= 0;
          });
        if (x && x.length) {
          var S = x[0].type.defaultProps,
            _ = S !== void 0 ? Lt(Lt({}, S), x[0].props) : x[0].props,
            E = _.barSize,
            P = _[w];
          a[P] || (a[P] = []);
          var O = it(E) ? n : E;
          a[P].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: it(O) ? void 0 : hs(O, r, 0),
          });
        }
      }
    return a;
  },
  Ofe = function (t) {
    var n = t.barGap,
      r = t.barCategoryGap,
      i = t.bandSize,
      o = t.sizeList,
      a = o === void 0 ? [] : o,
      s = t.maxBarSize,
      u = a.length;
    if (u < 1) return null;
    var c = hs(n, i, 0, !0),
      d,
      h = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        v = i / u,
        b = a.reduce(function (E, P) {
          return E + P.barSize || 0;
        }, 0);
      (b += (u - 1) * c),
        b >= i && ((b -= (u - 1) * c), (c = 0)),
        b >= i && v > 0 && ((p = !0), (v *= 0.9), (b = u * v));
      var y = ((i - b) / 2) >> 0,
        w = {
          offset: y - c,
          size: 0,
        };
      d = a.reduce(function (E, P) {
        var O = {
            item: P.item,
            position: {
              offset: w.offset + w.size + c,
              size: p ? v : P.barSize,
            },
          },
          k = [].concat(HD(E), [O]);
        return (
          (w = k[k.length - 1].position),
          P.stackList &&
            P.stackList.length &&
            P.stackList.forEach(function (R) {
              k.push({
                item: R,
                position: w,
              });
            }),
          k
        );
      }, h);
    } else {
      var x = hs(r, i, 0, !0);
      i - 2 * x - (u - 1) * c <= 0 && (c = 0);
      var S = (i - 2 * x - (u - 1) * c) / u;
      S > 1 && (S >>= 0);
      var _ = s === +s ? Math.min(S, s) : S;
      d = a.reduce(function (E, P, O) {
        var k = [].concat(HD(E), [
          {
            item: P.item,
            position: {
              offset: x + (S + c) * O + (S - _) / 2,
              size: _,
            },
          },
        ]);
        return (
          P.stackList &&
            P.stackList.length &&
            P.stackList.forEach(function (R) {
              k.push({
                item: R,
                position: k[k.length - 1].position,
              });
            }),
          k
        );
      }, h);
    }
    return d;
  },
  Efe = function (t, n, r, i) {
    var o = r.children,
      a = r.width,
      s = r.margin,
      u = a - (s.left || 0) - (s.right || 0),
      c = j6({
        children: o,
        legendWidth: u,
      });
    if (c) {
      var d = i || {},
        h = d.width,
        p = d.height,
        v = c.align,
        b = c.verticalAlign,
        y = c.layout;
      if ((y === "vertical" || (y === "horizontal" && b === "middle")) && v !== "center" && be(t[v]))
        return Lt(Lt({}, t), {}, Tl({}, v, t[v] + (h || 0)));
      if ((y === "horizontal" || (y === "vertical" && v === "center")) && b !== "middle" && be(t[b]))
        return Lt(Lt({}, t), {}, Tl({}, b, t[b] + (p || 0)));
    }
    return t;
  },
  Tfe = function (t, n, r) {
    return it(n)
      ? !0
      : t === "horizontal"
        ? n === "yAxis"
        : t === "vertical" || r === "x"
          ? n === "xAxis"
          : r === "y"
            ? n === "yAxis"
            : !0;
  },
  R6 = function (t, n, r, i, o) {
    var a = n.props.children,
      s = Jr(a, ry).filter(function (c) {
        return Tfe(i, o, c.props.direction);
      });
    if (s && s.length) {
      var u = s.map(function (c) {
        return c.props.dataKey;
      });
      return t.reduce(
        function (c, d) {
          var h = hr(d, r);
          if (it(h)) return c;
          var p = Array.isArray(h) ? [ey(h), Jo(h)] : [h, h],
            v = u.reduce(
              function (b, y) {
                var w = hr(d, y, 0),
                  x = p[0] - Math.abs(Array.isArray(w) ? w[0] : w),
                  S = p[1] + Math.abs(Array.isArray(w) ? w[1] : w);
                return [Math.min(x, b[0]), Math.max(S, b[1])];
              },
              [1 / 0, -1 / 0],
            );
          return [Math.min(v[0], c[0]), Math.max(v[1], c[1])];
        },
        [1 / 0, -1 / 0],
      );
    }
    return null;
  },
  Cfe = function (t, n, r, i, o) {
    var a = n
      .map(function (s) {
        return R6(t, s, r, o, i);
      })
      .filter(function (s) {
        return !it(s);
      });
    return a && a.length
      ? a.reduce(
          function (s, u) {
            return [Math.min(s[0], u[0]), Math.max(s[1], u[1])];
          },
          [1 / 0, -1 / 0],
        )
      : null;
  },
  M6 = function (t, n, r, i, o) {
    var a = n.map(function (u) {
      var c = u.props.dataKey;
      return (r === "number" && c && R6(t, u, c, i)) || Kc(t, c, r, o);
    });
    if (r === "number")
      return a.reduce(
        function (u, c) {
          return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
        },
        [1 / 0, -1 / 0],
      );
    var s = {};
    return a.reduce(function (u, c) {
      for (var d = 0, h = c.length; d < h; d++) s[c[d]] || ((s[c[d]] = !0), u.push(c[d]));
      return u;
    }, []);
  },
  N6 = function (t, n) {
    return (
      (t === "horizontal" && n === "xAxis") ||
      (t === "vertical" && n === "yAxis") ||
      (t === "centric" && n === "angleAxis") ||
      (t === "radial" && n === "radiusAxis")
    );
  },
  Qa = function (t, n, r) {
    if (!t) return null;
    var i = t.scale,
      o = t.duplicateDomain,
      a = t.type,
      s = t.range,
      u = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      c = (n || r) && a === "category" && i.bandwidth ? i.bandwidth() / u : 0;
    if (
      ((c = t.axisType === "angleAxis" && s?.length >= 2 ? Xr(s[0] - s[1]) * 2 * c : c), n && (t.ticks || t.niceTicks))
    ) {
      var d = (t.ticks || t.niceTicks).map(function (h) {
        var p = o ? o.indexOf(h) : h;
        return {
          coordinate: i(p) + c,
          value: h,
          offset: c,
        };
      });
      return d.filter(function (h) {
        return !xu(h.coordinate);
      });
    }
    return t.isCategorical && t.categoricalDomain
      ? t.categoricalDomain.map(function (h, p) {
          return {
            coordinate: i(h) + c,
            value: h,
            index: p,
            offset: c,
          };
        })
      : i.ticks && !r
        ? i.ticks(t.tickCount).map(function (h) {
            return {
              coordinate: i(h) + c,
              value: h,
              offset: c,
            };
          })
        : i.domain().map(function (h, p) {
            return {
              coordinate: i(h) + c,
              value: o ? o[h] : h,
              index: p,
              offset: c,
            };
          });
  },
  Ax = new WeakMap(),
  np = function (t, n) {
    if (typeof n != "function") return t;
    Ax.has(t) || Ax.set(t, new WeakMap());
    var r = Ax.get(t);
    if (r.has(n)) return r.get(n);
    var i = function () {
      t.apply(void 0, arguments), n.apply(void 0, arguments);
    };
    return r.set(n, i), i;
  },
  kfe = function (t, n, r) {
    var i = t.scale,
      o = t.type,
      a = t.layout,
      s = t.axisType;
    if (i === "auto")
      return a === "radial" && s === "radiusAxis"
        ? {
            scale: _f(),
            realScaleType: "band",
          }
        : a === "radial" && s === "angleAxis"
          ? {
              scale: wm(),
              realScaleType: "linear",
            }
          : o === "category" &&
              n &&
              (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || (n.indexOf("ComposedChart") >= 0 && !r))
            ? {
                scale: Hc(),
                realScaleType: "point",
              }
            : o === "category"
              ? {
                  scale: _f(),
                  realScaleType: "band",
                }
              : {
                  scale: wm(),
                  realScaleType: "linear",
                };
    if (ds(i)) {
      var u = "scale".concat(Vv(i));
      return {
        scale: (RD[u] || Hc)(),
        realScaleType: RD[u] ? u : "point",
      };
    }
    return nt(i)
      ? {
          scale: i,
        }
      : {
          scale: Hc(),
          realScaleType: "point",
        };
  },
  GD = 1e-4,
  jfe = function (t) {
    var n = t.domain();
    if (!(!n || n.length <= 2)) {
      var r = n.length,
        i = t.range(),
        o = Math.min(i[0], i[1]) - GD,
        a = Math.max(i[0], i[1]) + GD,
        s = t(n[0]),
        u = t(n[r - 1]);
      (s < o || s > a || u < o || u > a) && t.domain([n[0], n[r - 1]]);
    }
  },
  Rfe = function (t, n) {
    if (!t) return null;
    for (var r = 0, i = t.length; r < i; r++) if (t[r].item === n) return t[r].position;
    return null;
  },
  Mfe = function (t, n) {
    if (!n || n.length !== 2 || !be(n[0]) || !be(n[1])) return t;
    var r = Math.min(n[0], n[1]),
      i = Math.max(n[0], n[1]),
      o = [t[0], t[1]];
    return (
      (!be(t[0]) || t[0] < r) && (o[0] = r),
      (!be(t[1]) || t[1] > i) && (o[1] = i),
      o[0] > i && (o[0] = i),
      o[1] < r && (o[1] = r),
      o
    );
  },
  Nfe = function (t) {
    var n = t.length;
    if (!(n <= 0))
      for (var r = 0, i = t[0].length; r < i; ++r)
        for (var o = 0, a = 0, s = 0; s < n; ++s) {
          var u = xu(t[s][r][1]) ? t[s][r][0] : t[s][r][1];
          u >= 0
            ? ((t[s][r][0] = o), (t[s][r][1] = o + u), (o = t[s][r][1]))
            : ((t[s][r][0] = a), (t[s][r][1] = a + u), (a = t[s][r][1]));
        }
  },
  Ife = function (t) {
    var n = t.length;
    if (!(n <= 0))
      for (var r = 0, i = t[0].length; r < i; ++r)
        for (var o = 0, a = 0; a < n; ++a) {
          var s = xu(t[a][r][1]) ? t[a][r][0] : t[a][r][1];
          s >= 0 ? ((t[a][r][0] = o), (t[a][r][1] = o + s), (o = t[a][r][1])) : ((t[a][r][0] = 0), (t[a][r][1] = 0));
        }
  },
  Dfe = {
    sign: Nfe,
    expand: gie,
    none: $l,
    silhouette: bie,
    wiggle: wie,
    positive: Ife,
  },
  $fe = function (t, n, r) {
    var i = n.map(function (s) {
        return s.props.dataKey;
      }),
      o = Dfe[r],
      a = yie()
        .keys(i)
        .value(function (s, u) {
          return +hr(s, u, 0);
        })
        .order(w_)
        .offset(o);
    return a(t);
  },
  Lfe = function (t, n, r, i, o, a) {
    if (!t) return null;
    var s = a ? n.reverse() : n,
      u = {},
      c = s.reduce(function (h, p) {
        var v,
          b =
            (v = p.type) !== null && v !== void 0 && v.defaultProps
              ? Lt(Lt({}, p.type.defaultProps), p.props)
              : p.props,
          y = b.stackId,
          w = b.hide;
        if (w) return h;
        var x = b[r],
          S = h[x] || {
            hasStack: !1,
            stackGroups: {},
          };
        if (Jt(y)) {
          var _ = S.stackGroups[y] || {
            numericAxisId: r,
            cateAxisId: i,
            items: [],
          };
          _.items.push(p), (S.hasStack = !0), (S.stackGroups[y] = _);
        } else
          S.stackGroups[md("_stackId_")] = {
            numericAxisId: r,
            cateAxisId: i,
            items: [p],
          };
        return Lt(Lt({}, h), {}, Tl({}, x, S));
      }, u),
      d = {};
    return Object.keys(c).reduce(function (h, p) {
      var v = c[p];
      if (v.hasStack) {
        var b = {};
        v.stackGroups = Object.keys(v.stackGroups).reduce(function (y, w) {
          var x = v.stackGroups[w];
          return Lt(
            Lt({}, y),
            {},
            Tl({}, w, {
              numericAxisId: r,
              cateAxisId: i,
              items: x.items,
              stackedData: $fe(t, x.items, o),
            }),
          );
        }, b);
      }
      return Lt(Lt({}, h), {}, Tl({}, p, v));
    }, d);
  },
  Bfe = function (t, n) {
    var r = n.realScaleType,
      i = n.type,
      o = n.tickCount,
      a = n.originalDomain,
      s = n.allowDecimals,
      u = r || n.scale;
    if (u !== "auto" && u !== "linear") return null;
    if (o && i === "number" && a && (a[0] === "auto" || a[1] === "auto")) {
      var c = t.domain();
      if (!c.length) return null;
      var d = Xce(c, o, s);
      return (
        t.domain([ey(d), Jo(d)]),
        {
          niceTicks: d,
        }
      );
    }
    if (o && i === "number") {
      var h = t.domain(),
        p = Zce(h, o, s);
      return {
        niceTicks: p,
      };
    }
    return null;
  };
function YD(e) {
  var t = e.axis,
    n = e.ticks,
    r = e.bandSize,
    i = e.entry,
    o = e.index,
    a = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !it(i[t.dataKey])) {
      var s = em(n, "value", i[t.dataKey]);
      if (s) return s.coordinate + r / 2;
    }
    return n[o] ? n[o].coordinate + r / 2 : null;
  }
  var u = hr(i, it(a) ? t.dataKey : a);
  return it(u) ? null : t.scale(u);
}
var XD = function (t) {
    var n = t.axis,
      r = t.ticks,
      i = t.offset,
      o = t.bandSize,
      a = t.entry,
      s = t.index;
    if (n.type === "category") return r[s] ? r[s].coordinate + i : null;
    var u = hr(a, n.dataKey, n.domain[s]);
    return it(u) ? null : n.scale(u) - o / 2 + i;
  },
  Ffe = function (t) {
    var n = t.numericAxis,
      r = n.scale.domain();
    if (n.type === "number") {
      var i = Math.min(r[0], r[1]),
        o = Math.max(r[0], r[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i;
    }
    return r[0];
  },
  Vfe = function (t, n) {
    var r,
      i = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Lt(Lt({}, t.type.defaultProps), t.props) : t.props,
      o = i.stackId;
    if (Jt(o)) {
      var a = n[o];
      if (a) {
        var s = a.items.indexOf(t);
        return s >= 0 ? a.stackedData[s] : null;
      }
    }
    return null;
  },
  zfe = function (t) {
    return t.reduce(
      function (n, r) {
        return [ey(r.concat([n[0]]).filter(be)), Jo(r.concat([n[1]]).filter(be))];
      },
      [1 / 0, -1 / 0],
    );
  },
  I6 = function (t, n, r) {
    return Object.keys(t)
      .reduce(
        function (i, o) {
          var a = t[o],
            s = a.stackedData,
            u = s.reduce(
              function (c, d) {
                var h = zfe(d.slice(n, r + 1));
                return [Math.min(c[0], h[0]), Math.max(c[1], h[1])];
              },
              [1 / 0, -1 / 0],
            );
          return [Math.min(u[0], i[0]), Math.max(u[1], i[1])];
        },
        [1 / 0, -1 / 0],
      )
      .map(function (i) {
        return i === 1 / 0 || i === -1 / 0 ? 0 : i;
      });
  },
  ZD = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  QD = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  U_ = function (t, n, r) {
    if (nt(t)) return t(n, r);
    if (!Array.isArray(t)) return n;
    var i = [];
    if (be(t[0])) i[0] = r ? t[0] : Math.min(t[0], n[0]);
    else if (ZD.test(t[0])) {
      var o = +ZD.exec(t[0])[1];
      i[0] = n[0] - o;
    } else nt(t[0]) ? (i[0] = t[0](n[0])) : (i[0] = n[0]);
    if (be(t[1])) i[1] = r ? t[1] : Math.max(t[1], n[1]);
    else if (QD.test(t[1])) {
      var a = +QD.exec(t[1])[1];
      i[1] = n[1] + a;
    } else nt(t[1]) ? (i[1] = t[1](n[1])) : (i[1] = n[1]);
    return i;
  },
  Em = function (t, n, r) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!r || i > 0) return i;
    }
    if (t && n && n.length >= 2) {
      for (
        var o = YO(n, function (h) {
            return h.coordinate;
          }),
          a = 1 / 0,
          s = 1,
          u = o.length;
        s < u;
        s++
      ) {
        var c = o[s],
          d = o[s - 1];
        a = Math.min((c.coordinate || 0) - (d.coordinate || 0), a);
      }
      return a === 1 / 0 ? 0 : a;
    }
    return r ? void 0 : 0;
  },
  JD = function (t, n, r) {
    return !t || !t.length || Tf(t, Er(r, "type.defaultProps.domain")) ? n : t;
  },
  D6 = function (t, n) {
    var r = t.type.defaultProps ? Lt(Lt({}, t.type.defaultProps), t.props) : t.props,
      i = r.dataKey,
      o = r.name,
      a = r.unit,
      s = r.formatter,
      u = r.tooltipType,
      c = r.chartType,
      d = r.hide;
    return Lt(
      Lt({}, rt(t, !1)),
      {},
      {
        dataKey: i,
        unit: a,
        formatter: s,
        name: o || i,
        color: xE(t),
        value: hr(n, i),
        type: u,
        payload: n,
        chartType: c,
        hide: d,
      },
    );
  };
function Mf(e) {
  "@babel/helpers - typeof";

  return (
    (Mf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Mf(e)
  );
}
function e$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function t$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? e$(Object(n), !0).forEach(function (r) {
          qfe(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : e$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function qfe(e, t, n) {
  return (
    (t = Wfe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Wfe(e) {
  var t = Ufe(e, "string");
  return Mf(t) == "symbol" ? t : t + "";
}
function Ufe(e, t) {
  if (Mf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Mf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Tm = Math.PI / 180,
  Hfe = function (t) {
    return (t * 180) / Math.PI;
  },
  vn = function (t, n, r, i) {
    return {
      x: t + Math.cos(-Tm * i) * r,
      y: n + Math.sin(-Tm * i) * r,
    };
  },
  Kfe = function (t, n) {
    var r = t.x,
      i = t.y,
      o = n.x,
      a = n.y;
    return Math.sqrt(Math.pow(r - o, 2) + Math.pow(i - a, 2));
  },
  Gfe = function (t, n) {
    var r = t.x,
      i = t.y,
      o = n.cx,
      a = n.cy,
      s = Kfe(
        {
          x: r,
          y: i,
        },
        {
          x: o,
          y: a,
        },
      );
    if (s <= 0)
      return {
        radius: s,
      };
    var u = (r - o) / s,
      c = Math.acos(u);
    return (
      i > a && (c = 2 * Math.PI - c),
      {
        radius: s,
        angle: Hfe(c),
        angleInRadian: c,
      }
    );
  },
  Yfe = function (t) {
    var n = t.startAngle,
      r = t.endAngle,
      i = Math.floor(n / 360),
      o = Math.floor(r / 360),
      a = Math.min(i, o);
    return {
      startAngle: n - a * 360,
      endAngle: r - a * 360,
    };
  },
  Xfe = function (t, n) {
    var r = n.startAngle,
      i = n.endAngle,
      o = Math.floor(r / 360),
      a = Math.floor(i / 360),
      s = Math.min(o, a);
    return t + s * 360;
  },
  n$ = function (t, n) {
    var r = t.x,
      i = t.y,
      o = Gfe(
        {
          x: r,
          y: i,
        },
        n,
      ),
      a = o.radius,
      s = o.angle,
      u = n.innerRadius,
      c = n.outerRadius;
    if (a < u || a > c) return !1;
    if (a === 0) return !0;
    var d = Yfe(n),
      h = d.startAngle,
      p = d.endAngle,
      v = s,
      b;
    if (h <= p) {
      for (; v > p; ) v -= 360;
      for (; v < h; ) v += 360;
      b = v >= h && v <= p;
    } else {
      for (; v > h; ) v -= 360;
      for (; v < p; ) v += 360;
      b = v >= p && v <= h;
    }
    return b
      ? t$(
          t$({}, n),
          {},
          {
            radius: a,
            angle: Xfe(v, n),
          },
        )
      : null;
  };
function Nf(e) {
  "@babel/helpers - typeof";

  return (
    (Nf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Nf(e)
  );
}
var Zfe = ["offset"];
function Qfe(e) {
  return nde(e) || tde(e) || ede(e) || Jfe();
}
function Jfe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ede(e, t) {
  if (e) {
    if (typeof e == "string") return H_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return H_(e, t);
  }
}
function tde(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function nde(e) {
  if (Array.isArray(e)) return H_(e);
}
function H_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function rde(e, t) {
  if (e == null) return {};
  var n = ide(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function ide(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function r$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? r$(Object(n), !0).forEach(function (r) {
          ode(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : r$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ode(e, t, n) {
  return (
    (t = ade(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function ade(e) {
  var t = sde(e, "string");
  return Nf(t) == "symbol" ? t : t + "";
}
function sde(e, t) {
  if (Nf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Nf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function If() {
  return (
    (If = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    If.apply(this, arguments)
  );
}
var lde = function (t) {
    var n = t.value,
      r = t.formatter,
      i = it(t.children) ? n : t.children;
    return nt(r) ? r(i) : i;
  },
  ude = function (t, n) {
    var r = Xr(n - t),
      i = Math.min(Math.abs(n - t), 360);
    return r * i;
  },
  cde = function (t, n, r) {
    var i = t.position,
      o = t.viewBox,
      a = t.offset,
      s = t.className,
      u = o,
      c = u.cx,
      d = u.cy,
      h = u.innerRadius,
      p = u.outerRadius,
      v = u.startAngle,
      b = u.endAngle,
      y = u.clockWise,
      w = (h + p) / 2,
      x = ude(v, b),
      S = x >= 0 ? 1 : -1,
      _,
      E;
    i === "insideStart"
      ? ((_ = v + S * a), (E = y))
      : i === "insideEnd"
        ? ((_ = b - S * a), (E = !y))
        : i === "end" && ((_ = b + S * a), (E = y)),
      (E = x <= 0 ? E : !E);
    var P = vn(c, d, w, _),
      O = vn(c, d, w, _ + (E ? 1 : -1) * 359),
      k = "M"
        .concat(P.x, ",")
        .concat(
          P.y,
          `
    A`,
        )
        .concat(w, ",")
        .concat(w, ",0,1,")
        .concat(
          E ? 0 : 1,
          `,
    `,
        )
        .concat(O.x, ",")
        .concat(O.y),
      R = it(t.id) ? md("recharts-radial-line-") : t.id;
    return ReactDefault.createElement(
      "text",
      If({}, r, {
        dominantBaseline: "central",
        className: We("recharts-radial-bar-label", s),
      }),
      ReactDefault.createElement(
        "defs",
        null,
        ReactDefault.createElement("path", {
          id: R,
          d: k,
        }),
      ),
      ReactDefault.createElement(
        "textPath",
        {
          xlinkHref: "#".concat(R),
        },
        n,
      ),
    );
  },
  fde = function (t) {
    var n = t.viewBox,
      r = t.offset,
      i = t.position,
      o = n,
      a = o.cx,
      s = o.cy,
      u = o.innerRadius,
      c = o.outerRadius,
      d = o.startAngle,
      h = o.endAngle,
      p = (d + h) / 2;
    if (i === "outside") {
      var v = vn(a, s, c + r, p),
        b = v.x,
        y = v.y;
      return {
        x: b,
        y,
        textAnchor: b >= a ? "start" : "end",
        verticalAnchor: "middle",
      };
    }
    if (i === "center")
      return {
        x: a,
        y: s,
        textAnchor: "middle",
        verticalAnchor: "middle",
      };
    if (i === "centerTop")
      return {
        x: a,
        y: s,
        textAnchor: "middle",
        verticalAnchor: "start",
      };
    if (i === "centerBottom")
      return {
        x: a,
        y: s,
        textAnchor: "middle",
        verticalAnchor: "end",
      };
    var w = (u + c) / 2,
      x = vn(a, s, w, p),
      S = x.x,
      _ = x.y;
    return {
      x: S,
      y: _,
      textAnchor: "middle",
      verticalAnchor: "middle",
    };
  },
  dde = function (t) {
    var n = t.viewBox,
      r = t.parentViewBox,
      i = t.offset,
      o = t.position,
      a = n,
      s = a.x,
      u = a.y,
      c = a.width,
      d = a.height,
      h = d >= 0 ? 1 : -1,
      p = h * i,
      v = h > 0 ? "end" : "start",
      b = h > 0 ? "start" : "end",
      y = c >= 0 ? 1 : -1,
      w = y * i,
      x = y > 0 ? "end" : "start",
      S = y > 0 ? "start" : "end";
    if (o === "top") {
      var _ = {
        x: s + c / 2,
        y: u - h * i,
        textAnchor: "middle",
        verticalAnchor: v,
      };
      return Zt(
        Zt({}, _),
        r
          ? {
              height: Math.max(u - r.y, 0),
              width: c,
            }
          : {},
      );
    }
    if (o === "bottom") {
      var E = {
        x: s + c / 2,
        y: u + d + p,
        textAnchor: "middle",
        verticalAnchor: b,
      };
      return Zt(
        Zt({}, E),
        r
          ? {
              height: Math.max(r.y + r.height - (u + d), 0),
              width: c,
            }
          : {},
      );
    }
    if (o === "left") {
      var P = {
        x: s - w,
        y: u + d / 2,
        textAnchor: x,
        verticalAnchor: "middle",
      };
      return Zt(
        Zt({}, P),
        r
          ? {
              width: Math.max(P.x - r.x, 0),
              height: d,
            }
          : {},
      );
    }
    if (o === "right") {
      var O = {
        x: s + c + w,
        y: u + d / 2,
        textAnchor: S,
        verticalAnchor: "middle",
      };
      return Zt(
        Zt({}, O),
        r
          ? {
              width: Math.max(r.x + r.width - O.x, 0),
              height: d,
            }
          : {},
      );
    }
    var k = r
      ? {
          width: c,
          height: d,
        }
      : {};
    return o === "insideLeft"
      ? Zt(
          {
            x: s + w,
            y: u + d / 2,
            textAnchor: S,
            verticalAnchor: "middle",
          },
          k,
        )
      : o === "insideRight"
        ? Zt(
            {
              x: s + c - w,
              y: u + d / 2,
              textAnchor: x,
              verticalAnchor: "middle",
            },
            k,
          )
        : o === "insideTop"
          ? Zt(
              {
                x: s + c / 2,
                y: u + p,
                textAnchor: "middle",
                verticalAnchor: b,
              },
              k,
            )
          : o === "insideBottom"
            ? Zt(
                {
                  x: s + c / 2,
                  y: u + d - p,
                  textAnchor: "middle",
                  verticalAnchor: v,
                },
                k,
              )
            : o === "insideTopLeft"
              ? Zt(
                  {
                    x: s + w,
                    y: u + p,
                    textAnchor: S,
                    verticalAnchor: b,
                  },
                  k,
                )
              : o === "insideTopRight"
                ? Zt(
                    {
                      x: s + c - w,
                      y: u + p,
                      textAnchor: x,
                      verticalAnchor: b,
                    },
                    k,
                  )
                : o === "insideBottomLeft"
                  ? Zt(
                      {
                        x: s + w,
                        y: u + d - p,
                        textAnchor: S,
                        verticalAnchor: v,
                      },
                      k,
                    )
                  : o === "insideBottomRight"
                    ? Zt(
                        {
                          x: s + c - w,
                          y: u + d - p,
                          textAnchor: x,
                          verticalAnchor: v,
                        },
                        k,
                      )
                    : wu(o) && (be(o.x) || Ya(o.x)) && (be(o.y) || Ya(o.y))
                      ? Zt(
                          {
                            x: s + hs(o.x, c),
                            y: u + hs(o.y, d),
                            textAnchor: "end",
                            verticalAnchor: "end",
                          },
                          k,
                        )
                      : Zt(
                          {
                            x: s + c / 2,
                            y: u + d / 2,
                            textAnchor: "middle",
                            verticalAnchor: "middle",
                          },
                          k,
                        );
  },
  hde = function (t) {
    return "cx" in t && be(t.cx);
  };
function kn(e) {
  var t = e.offset,
    n = t === void 0 ? 5 : t,
    r = rde(e, Zfe),
    i = Zt(
      {
        offset: n,
      },
      r,
    ),
    o = i.viewBox,
    a = i.position,
    s = i.value,
    u = i.children,
    c = i.content,
    d = i.className,
    h = d === void 0 ? "" : d,
    p = i.textBreakAll;
  if (!o || (it(s) && it(u) && !React.isValidElement(c) && !nt(c))) return null;
  if (React.isValidElement(c)) return React.cloneElement(c, i);
  var v;
  if (nt(c)) {
    if (((v = React.createElement(c, i)), React.isValidElement(v))) return v;
  } else v = lde(i);
  var b = hde(o),
    y = rt(i, !0);
  if (b && (a === "insideStart" || a === "insideEnd" || a === "end")) return cde(i, v, y);
  var w = b ? fde(i) : dde(i);
  return ReactDefault.createElement(
    hm,
    If(
      {
        className: We("recharts-label", h),
      },
      y,
      w,
      {
        breakAll: p,
      },
    ),
    v,
  );
}
kn.displayName = "Label";
var $6 = function (t) {
    var n = t.cx,
      r = t.cy,
      i = t.angle,
      o = t.startAngle,
      a = t.endAngle,
      s = t.r,
      u = t.radius,
      c = t.innerRadius,
      d = t.outerRadius,
      h = t.x,
      p = t.y,
      v = t.top,
      b = t.left,
      y = t.width,
      w = t.height,
      x = t.clockWise,
      S = t.labelViewBox;
    if (S) return S;
    if (be(y) && be(w)) {
      if (be(h) && be(p))
        return {
          x: h,
          y: p,
          width: y,
          height: w,
        };
      if (be(v) && be(b))
        return {
          x: v,
          y: b,
          width: y,
          height: w,
        };
    }
    return be(h) && be(p)
      ? {
          x: h,
          y: p,
          width: 0,
          height: 0,
        }
      : be(n) && be(r)
        ? {
            cx: n,
            cy: r,
            startAngle: o || i || 0,
            endAngle: a || i || 0,
            innerRadius: c || 0,
            outerRadius: d || u || s || 0,
            clockWise: x,
          }
        : t.viewBox
          ? t.viewBox
          : {};
  },
  pde = function (t, n) {
    return t
      ? t === !0
        ? ReactDefault.createElement(kn, {
            key: "label-implicit",
            viewBox: n,
          })
        : Jt(t)
          ? ReactDefault.createElement(kn, {
              key: "label-implicit",
              viewBox: n,
              value: t,
            })
          : React.isValidElement(t)
            ? t.type === kn
              ? React.cloneElement(t, {
                  key: "label-implicit",
                  viewBox: n,
                })
              : ReactDefault.createElement(kn, {
                  key: "label-implicit",
                  content: t,
                  viewBox: n,
                })
            : nt(t)
              ? ReactDefault.createElement(kn, {
                  key: "label-implicit",
                  content: t,
                  viewBox: n,
                })
              : wu(t)
                ? ReactDefault.createElement(
                    kn,
                    If(
                      {
                        viewBox: n,
                      },
                      t,
                      {
                        key: "label-implicit",
                      },
                    ),
                  )
                : null
      : null;
  },
  mde = function (t, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || (!t.children && r && !t.label)) return null;
    var i = t.children,
      o = $6(t),
      a = Jr(i, kn).map(function (u, c) {
        return React.cloneElement(u, {
          viewBox: n || o,
          key: "label-".concat(c),
        });
      });
    if (!r) return a;
    var s = pde(t.label, n || o);
    return [s].concat(Qfe(a));
  };
kn.parseViewBox = $6;
kn.renderCallByParent = mde;
var Ox, i$;
function vde() {
  if (i$) return Ox;
  i$ = 1;
  function e(t) {
    var n = t == null ? 0 : t.length;
    return n ? t[n - 1] : void 0;
  }
  return (Ox = e), Ox;
}
var yde = vde();
const gde = ht(yde);
function Df(e) {
  "@babel/helpers - typeof";

  return (
    (Df =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Df(e)
  );
}
var bde = ["valueAccessor"],
  wde = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function xde(e) {
  return Ade(e) || Pde(e) || _de(e) || Sde();
}
function Sde() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _de(e, t) {
  if (e) {
    if (typeof e == "string") return K_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return K_(e, t);
  }
}
function Pde(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function Ade(e) {
  if (Array.isArray(e)) return K_(e);
}
function K_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Cm() {
  return (
    (Cm = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Cm.apply(this, arguments)
  );
}
function o$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function a$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? o$(Object(n), !0).forEach(function (r) {
          Ode(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : o$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Ode(e, t, n) {
  return (
    (t = Ede(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Ede(e) {
  var t = Tde(e, "string");
  return Df(t) == "symbol" ? t : t + "";
}
function Tde(e, t) {
  if (Df(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Df(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function s$(e, t) {
  if (e == null) return {};
  var n = Cde(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Cde(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var kde = function (t) {
  return Array.isArray(t.value) ? gde(t.value) : t.value;
};
function ra(e) {
  var t = e.valueAccessor,
    n = t === void 0 ? kde : t,
    r = s$(e, bde),
    i = r.data,
    o = r.dataKey,
    a = r.clockWise,
    s = r.id,
    u = r.textBreakAll,
    c = s$(r, wde);
  return !i || !i.length
    ? null
    : ReactDefault.createElement(
        Nt,
        {
          className: "recharts-label-list",
        },
        i.map(function (d, h) {
          var p = it(o) ? n(d, h) : hr(d && d.payload, o),
            v = it(s)
              ? {}
              : {
                  id: "".concat(s, "-").concat(h),
                };
          return ReactDefault.createElement(
            kn,
            Cm({}, rt(d, !0), c, v, {
              parentViewBox: d.parentViewBox,
              value: p,
              textBreakAll: u,
              viewBox: kn.parseViewBox(
                it(a)
                  ? d
                  : a$(
                      a$({}, d),
                      {},
                      {
                        clockWise: a,
                      },
                    ),
              ),
              key: "label-".concat(h),
              index: h,
            }),
          );
        }),
      );
}
ra.displayName = "LabelList";
function jde(e, t) {
  return e
    ? e === !0
      ? ReactDefault.createElement(ra, {
          key: "labelList-implicit",
          data: t,
        })
      : ReactDefault.isValidElement(e) || nt(e)
        ? ReactDefault.createElement(ra, {
            key: "labelList-implicit",
            data: t,
            content: e,
          })
        : wu(e)
          ? ReactDefault.createElement(
              ra,
              Cm(
                {
                  data: t,
                },
                e,
                {
                  key: "labelList-implicit",
                },
              ),
            )
          : null
    : null;
}
function Rde(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || (!e.children && n && !e.label)) return null;
  var r = e.children,
    i = Jr(r, ra).map(function (a, s) {
      return React.cloneElement(a, {
        data: t,
        key: "labelList-".concat(s),
      });
    });
  if (!n) return i;
  var o = jde(e.label, t);
  return [o].concat(xde(i));
}
ra.renderCallByParent = Rde;
function $f(e) {
  "@babel/helpers - typeof";

  return (
    ($f =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    $f(e)
  );
}
function G_() {
  return (
    (G_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    G_.apply(this, arguments)
  );
}
function l$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function u$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? l$(Object(n), !0).forEach(function (r) {
          Mde(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : l$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Mde(e, t, n) {
  return (
    (t = Nde(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Nde(e) {
  var t = Ide(e, "string");
  return $f(t) == "symbol" ? t : t + "";
}
function Ide(e, t) {
  if ($f(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if ($f(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Dde = function (t, n) {
    var r = Xr(n - t),
      i = Math.min(Math.abs(n - t), 359.999);
    return r * i;
  },
  rp = function (t) {
    var n = t.cx,
      r = t.cy,
      i = t.radius,
      o = t.angle,
      a = t.sign,
      s = t.isExternal,
      u = t.cornerRadius,
      c = t.cornerIsExternal,
      d = u * (s ? 1 : -1) + i,
      h = Math.asin(u / d) / Tm,
      p = c ? o : o + a * h,
      v = vn(n, r, d, p),
      b = vn(n, r, i, p),
      y = c ? o - a * h : o,
      w = vn(n, r, d * Math.cos(h * Tm), y);
    return {
      center: v,
      circleTangency: b,
      lineTangency: w,
      theta: h,
    };
  },
  L6 = function (t) {
    var n = t.cx,
      r = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.startAngle,
      s = t.endAngle,
      u = Dde(a, s),
      c = a + u,
      d = vn(n, r, o, a),
      h = vn(n, r, o, c),
      p = "M "
        .concat(d.x, ",")
        .concat(
          d.y,
          `
    A `,
        )
        .concat(o, ",")
        .concat(
          o,
          `,0,
    `,
        )
        .concat(+(Math.abs(u) > 180), ",")
        .concat(
          +(a > c),
          `,
    `,
        )
        .concat(h.x, ",")
        .concat(
          h.y,
          `
  `,
        );
    if (i > 0) {
      var v = vn(n, r, i, a),
        b = vn(n, r, i, c);
      p += "L "
        .concat(b.x, ",")
        .concat(
          b.y,
          `
            A `,
        )
        .concat(i, ",")
        .concat(
          i,
          `,0,
            `,
        )
        .concat(+(Math.abs(u) > 180), ",")
        .concat(
          +(a <= c),
          `,
            `,
        )
        .concat(v.x, ",")
        .concat(v.y, " Z");
    } else p += "L ".concat(n, ",").concat(r, " Z");
    return p;
  },
  $de = function (t) {
    var n = t.cx,
      r = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.cornerRadius,
      s = t.forceCornerRadius,
      u = t.cornerIsExternal,
      c = t.startAngle,
      d = t.endAngle,
      h = Xr(d - c),
      p = rp({
        cx: n,
        cy: r,
        radius: o,
        angle: c,
        sign: h,
        cornerRadius: a,
        cornerIsExternal: u,
      }),
      v = p.circleTangency,
      b = p.lineTangency,
      y = p.theta,
      w = rp({
        cx: n,
        cy: r,
        radius: o,
        angle: d,
        sign: -h,
        cornerRadius: a,
        cornerIsExternal: u,
      }),
      x = w.circleTangency,
      S = w.lineTangency,
      _ = w.theta,
      E = u ? Math.abs(c - d) : Math.abs(c - d) - y - _;
    if (E < 0)
      return s
        ? "M "
            .concat(b.x, ",")
            .concat(
              b.y,
              `
        a`,
            )
            .concat(a, ",")
            .concat(a, ",0,0,1,")
            .concat(
              a * 2,
              `,0
        a`,
            )
            .concat(a, ",")
            .concat(a, ",0,0,1,")
            .concat(
              -a * 2,
              `,0
      `,
            )
        : L6({
            cx: n,
            cy: r,
            innerRadius: i,
            outerRadius: o,
            startAngle: c,
            endAngle: d,
          });
    var P = "M "
      .concat(b.x, ",")
      .concat(
        b.y,
        `
    A`,
      )
      .concat(a, ",")
      .concat(a, ",0,0,")
      .concat(+(h < 0), ",")
      .concat(v.x, ",")
      .concat(
        v.y,
        `
    A`,
      )
      .concat(o, ",")
      .concat(o, ",0,")
      .concat(+(E > 180), ",")
      .concat(+(h < 0), ",")
      .concat(x.x, ",")
      .concat(
        x.y,
        `
    A`,
      )
      .concat(a, ",")
      .concat(a, ",0,0,")
      .concat(+(h < 0), ",")
      .concat(S.x, ",")
      .concat(
        S.y,
        `
  `,
      );
    if (i > 0) {
      var O = rp({
          cx: n,
          cy: r,
          radius: i,
          angle: c,
          sign: h,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: u,
        }),
        k = O.circleTangency,
        R = O.lineTangency,
        M = O.theta,
        D = rp({
          cx: n,
          cy: r,
          radius: i,
          angle: d,
          sign: -h,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: u,
        }),
        I = D.circleTangency,
        V = D.lineTangency,
        z = D.theta,
        q = u ? Math.abs(c - d) : Math.abs(c - d) - M - z;
      if (q < 0 && a === 0) return "".concat(P, "L").concat(n, ",").concat(r, "Z");
      P += "L"
        .concat(V.x, ",")
        .concat(
          V.y,
          `
      A`,
        )
        .concat(a, ",")
        .concat(a, ",0,0,")
        .concat(+(h < 0), ",")
        .concat(I.x, ",")
        .concat(
          I.y,
          `
      A`,
        )
        .concat(i, ",")
        .concat(i, ",0,")
        .concat(+(q > 180), ",")
        .concat(+(h > 0), ",")
        .concat(k.x, ",")
        .concat(
          k.y,
          `
      A`,
        )
        .concat(a, ",")
        .concat(a, ",0,0,")
        .concat(+(h < 0), ",")
        .concat(R.x, ",")
        .concat(R.y, "Z");
    } else P += "L".concat(n, ",").concat(r, "Z");
    return P;
  },
  Lde = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  B6 = function (t) {
    var n = u$(u$({}, Lde), t),
      r = n.cx,
      i = n.cy,
      o = n.innerRadius,
      a = n.outerRadius,
      s = n.cornerRadius,
      u = n.forceCornerRadius,
      c = n.cornerIsExternal,
      d = n.startAngle,
      h = n.endAngle,
      p = n.className;
    if (a < o || d === h) return null;
    var v = We("recharts-sector", p),
      b = a - o,
      y = hs(s, b, 0, !0),
      w;
    return (
      y > 0 && Math.abs(d - h) < 360
        ? (w = $de({
            cx: r,
            cy: i,
            innerRadius: o,
            outerRadius: a,
            cornerRadius: Math.min(y, b / 2),
            forceCornerRadius: u,
            cornerIsExternal: c,
            startAngle: d,
            endAngle: h,
          }))
        : (w = L6({
            cx: r,
            cy: i,
            innerRadius: o,
            outerRadius: a,
            startAngle: d,
            endAngle: h,
          })),
      ReactDefault.createElement(
        "path",
        G_({}, rt(n, !0), {
          className: v,
          d: w,
          role: "img",
        }),
      )
    );
  };
function Lf(e) {
  "@babel/helpers - typeof";

  return (
    (Lf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Lf(e)
  );
}
function Y_() {
  return (
    (Y_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Y_.apply(this, arguments)
  );
}
function c$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function f$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? c$(Object(n), !0).forEach(function (r) {
          Bde(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : c$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Bde(e, t, n) {
  return (
    (t = Fde(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Fde(e) {
  var t = Vde(e, "string");
  return Lf(t) == "symbol" ? t : t + "";
}
function Vde(e, t) {
  if (Lf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Lf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var d$ = {
    curveBasisClosed: aie,
    curveBasisOpen: sie,
    curveBasis: oie,
    curveBumpX: Ure,
    curveBumpY: Hre,
    curveLinearClosed: lie,
    curveLinear: qv,
    curveMonotoneX: uie,
    curveMonotoneY: cie,
    curveNatural: fie,
    curveStep: die,
    curveStepAfter: pie,
    curveStepBefore: hie,
  },
  ip = function (t) {
    return t.x === +t.x && t.y === +t.y;
  },
  Sc = function (t) {
    return t.x;
  },
  _c = function (t) {
    return t.y;
  },
  zde = function (t, n) {
    if (nt(t)) return t;
    var r = "curve".concat(Vv(t));
    return (r === "curveMonotone" || r === "curveBump") && n
      ? d$["".concat(r).concat(n === "vertical" ? "Y" : "X")]
      : d$[r] || qv;
  },
  qde = function (t) {
    var n = t.type,
      r = n === void 0 ? "linear" : n,
      i = t.points,
      o = i === void 0 ? [] : i,
      a = t.baseLine,
      s = t.layout,
      u = t.connectNulls,
      c = u === void 0 ? !1 : u,
      d = zde(r, s),
      h = c
        ? o.filter(function (y) {
            return ip(y);
          })
        : o,
      p;
    if (Array.isArray(a)) {
      var v = c
          ? a.filter(function (y) {
              return ip(y);
            })
          : a,
        b = h.map(function (y, w) {
          return f$(
            f$({}, y),
            {},
            {
              base: v[w],
            },
          );
        });
      return (
        s === "vertical"
          ? (p = Yh()
              .y(_c)
              .x1(Sc)
              .x0(function (y) {
                return y.base.x;
              }))
          : (p = Yh()
              .x(Sc)
              .y1(_c)
              .y0(function (y) {
                return y.base.y;
              })),
        p.defined(ip).curve(d),
        p(b)
      );
    }
    return (
      s === "vertical" && be(a)
        ? (p = Yh().y(_c).x1(Sc).x0(a))
        : be(a)
          ? (p = Yh().x(Sc).y1(_c).y0(a))
          : (p = W4().x(Sc).y(_c)),
      p.defined(ip).curve(d),
      p(h)
    );
  },
  Gc = function (t) {
    var n = t.className,
      r = t.points,
      i = t.path,
      o = t.pathRef;
    if ((!r || !r.length) && !i) return null;
    var a = r && r.length ? qde(t) : i;
    return React.createElement(
      "path",
      Y_({}, rt(t, !1), tm(t), {
        className: We("recharts-curve", n),
        d: a,
        ref: o,
      }),
    );
  },
  Ex = {
    exports: {},
  },
  Tx,
  h$;
function Wde() {
  if (h$) return Tx;
  h$ = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (Tx = e), Tx;
}
var Cx, p$;
function Ude() {
  if (p$) return Cx;
  p$ = 1;
  var e = Wde();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (Cx = function () {
      function r(a, s, u, c, d, h) {
        if (h !== e) {
          var p = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((p.name = "Invariant Violation"), p);
        }
      }
      r.isRequired = r;
      function i() {
        return r;
      }
      var o = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: i,
        element: r,
        elementType: r,
        instanceOf: i,
        node: r,
        objectOf: i,
        oneOf: i,
        oneOfType: i,
        shape: i,
        exact: i,
        checkPropTypes: n,
        resetWarningCache: t,
      };
      return (o.PropTypes = o), o;
    }),
    Cx
  );
}
var m$;
function Hde() {
  return m$ || ((m$ = 1), (Ex.exports = Ude()())), Ex.exports;
}
var Kde = Hde();
const ct = ht(Kde);
var Gde = Object.getOwnPropertyNames,
  Yde = Object.getOwnPropertySymbols,
  Xde = Object.prototype.hasOwnProperty;
function v$(e, t) {
  return function (r, i, o) {
    return e(r, i, o) && t(r, i, o);
  };
}
function op(e) {
  return function (n, r, i) {
    if (!n || !r || typeof n != "object" || typeof r != "object") return e(n, r, i);
    var o = i.cache,
      a = o.get(n),
      s = o.get(r);
    if (a && s) return a === r && s === n;
    o.set(n, r), o.set(r, n);
    var u = e(n, r, i);
    return o.delete(n), o.delete(r), u;
  };
}
function Zde(e) {
  return e?.[Symbol.toStringTag];
}
function y$(e) {
  return Gde(e).concat(Yde(e));
}
var Qde =
  Object.hasOwn ||
  function (e, t) {
    return Xde.call(e, t);
  };
function _s(e, t) {
  return e === t || (!e && !t && e !== e && t !== t);
}
var Jde = "__v",
  ehe = "__o",
  the = "_owner",
  g$ = Object.getOwnPropertyDescriptor,
  b$ = Object.keys;
function nhe(e, t, n) {
  var r = e.length;
  if (t.length !== r) return !1;
  for (; r-- > 0; ) if (!n.equals(e[r], t[r], r, r, e, t, n)) return !1;
  return !0;
}
function rhe(e, t) {
  return _s(e.getTime(), t.getTime());
}
function ihe(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function ohe(e, t) {
  return e === t;
}
function w$(e, t, n) {
  var r = e.size;
  if (r !== t.size) return !1;
  if (!r) return !0;
  for (var i = new Array(r), o = e.entries(), a, s, u = 0; (a = o.next()) && !a.done; ) {
    for (var c = t.entries(), d = !1, h = 0; (s = c.next()) && !s.done; ) {
      if (i[h]) {
        h++;
        continue;
      }
      var p = a.value,
        v = s.value;
      if (n.equals(p[0], v[0], u, h, e, t, n) && n.equals(p[1], v[1], p[0], v[0], e, t, n)) {
        d = i[h] = !0;
        break;
      }
      h++;
    }
    if (!d) return !1;
    u++;
  }
  return !0;
}
var ahe = _s;
function she(e, t, n) {
  var r = b$(e),
    i = r.length;
  if (b$(t).length !== i) return !1;
  for (; i-- > 0; ) if (!F6(e, t, n, r[i])) return !1;
  return !0;
}
function Pc(e, t, n) {
  var r = y$(e),
    i = r.length;
  if (y$(t).length !== i) return !1;
  for (var o, a, s; i-- > 0; )
    if (
      ((o = r[i]),
      !F6(e, t, n, o) ||
        ((a = g$(e, o)),
        (s = g$(t, o)),
        (a || s) &&
          (!a ||
            !s ||
            a.configurable !== s.configurable ||
            a.enumerable !== s.enumerable ||
            a.writable !== s.writable)))
    )
      return !1;
  return !0;
}
function lhe(e, t) {
  return _s(e.valueOf(), t.valueOf());
}
function uhe(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function x$(e, t, n) {
  var r = e.size;
  if (r !== t.size) return !1;
  if (!r) return !0;
  for (var i = new Array(r), o = e.values(), a, s; (a = o.next()) && !a.done; ) {
    for (var u = t.values(), c = !1, d = 0; (s = u.next()) && !s.done; ) {
      if (!i[d] && n.equals(a.value, s.value, a.value, s.value, e, t, n)) {
        c = i[d] = !0;
        break;
      }
      d++;
    }
    if (!c) return !1;
  }
  return !0;
}
function che(e, t) {
  var n = e.length;
  if (t.length !== n) return !1;
  for (; n-- > 0; ) if (e[n] !== t[n]) return !1;
  return !0;
}
function fhe(e, t) {
  return (
    e.hostname === t.hostname &&
    e.pathname === t.pathname &&
    e.protocol === t.protocol &&
    e.port === t.port &&
    e.hash === t.hash &&
    e.username === t.username &&
    e.password === t.password
  );
}
function F6(e, t, n, r) {
  return (r === the || r === ehe || r === Jde) && (e.$$typeof || t.$$typeof)
    ? !0
    : Qde(t, r) && n.equals(e[r], t[r], r, r, e, t, n);
}
var dhe = "[object Arguments]",
  hhe = "[object Boolean]",
  phe = "[object Date]",
  mhe = "[object Error]",
  vhe = "[object Map]",
  yhe = "[object Number]",
  ghe = "[object Object]",
  bhe = "[object RegExp]",
  whe = "[object Set]",
  xhe = "[object String]",
  She = "[object URL]",
  _he = Array.isArray,
  S$ = typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView : null,
  _$ = Object.assign,
  Phe = Object.prototype.toString.call.bind(Object.prototype.toString);
function Ahe(e) {
  var t = e.areArraysEqual,
    n = e.areDatesEqual,
    r = e.areErrorsEqual,
    i = e.areFunctionsEqual,
    o = e.areMapsEqual,
    a = e.areNumbersEqual,
    s = e.areObjectsEqual,
    u = e.arePrimitiveWrappersEqual,
    c = e.areRegExpsEqual,
    d = e.areSetsEqual,
    h = e.areTypedArraysEqual,
    p = e.areUrlsEqual,
    v = e.unknownTagComparators;
  return function (y, w, x) {
    if (y === w) return !0;
    if (y == null || w == null) return !1;
    var S = typeof y;
    if (S !== typeof w) return !1;
    if (S !== "object") return S === "number" ? a(y, w, x) : S === "function" ? i(y, w, x) : !1;
    var _ = y.constructor;
    if (_ !== w.constructor) return !1;
    if (_ === Object) return s(y, w, x);
    if (_he(y)) return t(y, w, x);
    if (S$ != null && S$(y)) return h(y, w, x);
    if (_ === Date) return n(y, w, x);
    if (_ === RegExp) return c(y, w, x);
    if (_ === Map) return o(y, w, x);
    if (_ === Set) return d(y, w, x);
    var E = Phe(y);
    if (E === phe) return n(y, w, x);
    if (E === bhe) return c(y, w, x);
    if (E === vhe) return o(y, w, x);
    if (E === whe) return d(y, w, x);
    if (E === ghe) return typeof y.then != "function" && typeof w.then != "function" && s(y, w, x);
    if (E === She) return p(y, w, x);
    if (E === mhe) return r(y, w, x);
    if (E === dhe) return s(y, w, x);
    if (E === hhe || E === yhe || E === xhe) return u(y, w, x);
    if (v) {
      var P = v[E];
      if (!P) {
        var O = Zde(y);
        O && (P = v[O]);
      }
      if (P) return P(y, w, x);
    }
    return !1;
  };
}
function Ohe(e) {
  var t = e.circular,
    n = e.createCustomConfig,
    r = e.strict,
    i = {
      areArraysEqual: r ? Pc : nhe,
      areDatesEqual: rhe,
      areErrorsEqual: ihe,
      areFunctionsEqual: ohe,
      areMapsEqual: r ? v$(w$, Pc) : w$,
      areNumbersEqual: ahe,
      areObjectsEqual: r ? Pc : she,
      arePrimitiveWrappersEqual: lhe,
      areRegExpsEqual: uhe,
      areSetsEqual: r ? v$(x$, Pc) : x$,
      areTypedArraysEqual: r ? Pc : che,
      areUrlsEqual: fhe,
      unknownTagComparators: void 0,
    };
  if ((n && (i = _$({}, i, n(i))), t)) {
    var o = op(i.areArraysEqual),
      a = op(i.areMapsEqual),
      s = op(i.areObjectsEqual),
      u = op(i.areSetsEqual);
    i = _$({}, i, {
      areArraysEqual: o,
      areMapsEqual: a,
      areObjectsEqual: s,
      areSetsEqual: u,
    });
  }
  return i;
}
function Ehe(e) {
  return function (t, n, r, i, o, a, s) {
    return e(t, n, s);
  };
}
function The(e) {
  var t = e.circular,
    n = e.comparator,
    r = e.createState,
    i = e.equals,
    o = e.strict;
  if (r)
    return function (u, c) {
      var d = r(),
        h = d.cache,
        p = h === void 0 ? (t ? new WeakMap() : void 0) : h,
        v = d.meta;
      return n(u, c, {
        cache: p,
        equals: i,
        meta: v,
        strict: o,
      });
    };
  if (t)
    return function (u, c) {
      return n(u, c, {
        cache: new WeakMap(),
        equals: i,
        meta: void 0,
        strict: o,
      });
    };
  var a = {
    cache: void 0,
    equals: i,
    meta: void 0,
    strict: o,
  };
  return function (u, c) {
    return n(u, c, a);
  };
}
var Che = wa();
wa({
  strict: !0,
});
wa({
  circular: !0,
});
wa({
  circular: !0,
  strict: !0,
});
wa({
  createInternalComparator: function () {
    return _s;
  },
});
wa({
  strict: !0,
  createInternalComparator: function () {
    return _s;
  },
});
wa({
  circular: !0,
  createInternalComparator: function () {
    return _s;
  },
});
wa({
  circular: !0,
  createInternalComparator: function () {
    return _s;
  },
  strict: !0,
});
function wa(e) {
  e === void 0 && (e = {});
  var t = e.circular,
    n = t === void 0 ? !1 : t,
    r = e.createInternalComparator,
    i = e.createState,
    o = e.strict,
    a = o === void 0 ? !1 : o,
    s = Ohe(e),
    u = Ahe(s),
    c = r ? r(u) : Ehe(u);
  return The({
    circular: n,
    comparator: u,
    createState: i,
    equals: c,
    strict: a,
  });
}
function khe(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function P$(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    n = -1,
    r = function i(o) {
      n < 0 && (n = o), o - n > t ? (e(o), (n = -1)) : khe(i);
    };
  requestAnimationFrame(r);
}
function X_(e) {
  "@babel/helpers - typeof";

  return (
    (X_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    X_(e)
  );
}
function jhe(e) {
  return Ihe(e) || Nhe(e) || Mhe(e) || Rhe();
}
function Rhe() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Mhe(e, t) {
  if (e) {
    if (typeof e == "string") return A$(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return A$(e, t);
  }
}
function A$(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Nhe(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function Ihe(e) {
  if (Array.isArray(e)) return e;
}
function Dhe() {
  var e = {},
    t = function () {
      return null;
    },
    n = !1,
    r = function i(o) {
      if (!n) {
        if (Array.isArray(o)) {
          if (!o.length) return;
          var a = o,
            s = jhe(a),
            u = s[0],
            c = s.slice(1);
          if (typeof u == "number") {
            P$(i.bind(null, c), u);
            return;
          }
          i(u), P$(i.bind(null, c));
          return;
        }
        X_(o) === "object" && ((e = o), t(e)), typeof o == "function" && o();
      }
    };
  return {
    stop: function () {
      n = !0;
    },
    start: function (o) {
      (n = !1), r(o);
    },
    subscribe: function (o) {
      return (
        (t = o),
        function () {
          t = function () {
            return null;
          };
        }
      );
    },
  };
}
function Bf(e) {
  "@babel/helpers - typeof";

  return (
    (Bf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Bf(e)
  );
}
function O$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function E$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? O$(Object(n), !0).forEach(function (r) {
          V6(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : O$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function V6(e, t, n) {
  return (
    (t = $he(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function $he(e) {
  var t = Lhe(e, "string");
  return Bf(t) === "symbol" ? t : String(t);
}
function Lhe(e, t) {
  if (Bf(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Bf(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bhe = function (t, n) {
    return [Object.keys(t), Object.keys(n)].reduce(function (r, i) {
      return r.filter(function (o) {
        return i.includes(o);
      });
    });
  },
  Fhe = function (t) {
    return t;
  },
  Vhe = function (t) {
    return t.replace(/([A-Z])/g, function (n) {
      return "-".concat(n.toLowerCase());
    });
  },
  Yc = function (t, n) {
    return Object.keys(n).reduce(function (r, i) {
      return E$(E$({}, r), {}, V6({}, i, t(i, n[i])));
    }, {});
  },
  T$ = function (t, n, r) {
    return t
      .map(function (i) {
        return "".concat(Vhe(i), " ").concat(n, "ms ").concat(r);
      })
      .join(",");
  };
function zhe(e, t) {
  return Uhe(e) || Whe(e, t) || z6(e, t) || qhe();
}
function qhe() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Whe(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function Uhe(e) {
  if (Array.isArray(e)) return e;
}
function Hhe(e) {
  return Yhe(e) || Ghe(e) || z6(e) || Khe();
}
function Khe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function z6(e, t) {
  if (e) {
    if (typeof e == "string") return Z_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Z_(e, t);
  }
}
function Ghe(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function Yhe(e) {
  if (Array.isArray(e)) return Z_(e);
}
function Z_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var km = 1e-4,
  q6 = function (t, n) {
    return [0, 3 * t, 3 * n - 6 * t, 3 * t - 3 * n + 1];
  },
  W6 = function (t, n) {
    return t
      .map(function (r, i) {
        return r * Math.pow(n, i);
      })
      .reduce(function (r, i) {
        return r + i;
      });
  },
  C$ = function (t, n) {
    return function (r) {
      var i = q6(t, n);
      return W6(i, r);
    };
  },
  Xhe = function (t, n) {
    return function (r) {
      var i = q6(t, n),
        o = [].concat(
          Hhe(
            i
              .map(function (a, s) {
                return a * s;
              })
              .slice(1),
          ),
          [0],
        );
      return W6(o, r);
    };
  },
  k$ = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    var i = n[0],
      o = n[1],
      a = n[2],
      s = n[3];
    if (n.length === 1)
      switch (n[0]) {
        case "linear":
          (i = 0), (o = 0), (a = 1), (s = 1);
          break;
        case "ease":
          (i = 0.25), (o = 0.1), (a = 0.25), (s = 1);
          break;
        case "ease-in":
          (i = 0.42), (o = 0), (a = 1), (s = 1);
          break;
        case "ease-out":
          (i = 0.42), (o = 0), (a = 0.58), (s = 1);
          break;
        case "ease-in-out":
          (i = 0), (o = 0), (a = 0.58), (s = 1);
          break;
        default: {
          var u = n[0].split("(");
          if (u[0] === "cubic-bezier" && u[1].split(")")[0].split(",").length === 4) {
            var c = u[1]
                .split(")")[0]
                .split(",")
                .map(function (w) {
                  return parseFloat(w);
                }),
              d = zhe(c, 4);
            (i = d[0]), (o = d[1]), (a = d[2]), (s = d[3]);
          }
        }
      }
    var h = C$(i, a),
      p = C$(o, s),
      v = Xhe(i, a),
      b = function (x) {
        return x > 1 ? 1 : x < 0 ? 0 : x;
      },
      y = function (x) {
        for (var S = x > 1 ? 1 : x, _ = S, E = 0; E < 8; ++E) {
          var P = h(_) - S,
            O = v(_);
          if (Math.abs(P - S) < km || O < km) return p(_);
          _ = b(_ - P / O);
        }
        return p(_);
      };
    return (y.isStepper = !1), y;
  },
  Zhe = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = t.stiff,
      r = n === void 0 ? 100 : n,
      i = t.damping,
      o = i === void 0 ? 8 : i,
      a = t.dt,
      s = a === void 0 ? 17 : a,
      u = function (d, h, p) {
        var v = -(d - h) * r,
          b = p * o,
          y = p + ((v - b) * s) / 1e3,
          w = (p * s) / 1e3 + d;
        return Math.abs(w - h) < km && Math.abs(y) < km ? [h, 0] : [w, y];
      };
    return (u.isStepper = !0), (u.dt = s), u;
  },
  Qhe = function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    var i = n[0];
    if (typeof i == "string")
      switch (i) {
        case "ease":
        case "ease-in-out":
        case "ease-out":
        case "ease-in":
        case "linear":
          return k$(i);
        case "spring":
          return Zhe();
        default:
          if (i.split("(")[0] === "cubic-bezier") return k$(i);
      }
    return typeof i == "function" ? i : null;
  };
function Ff(e) {
  "@babel/helpers - typeof";

  return (
    (Ff =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ff(e)
  );
}
function j$(e) {
  return tpe(e) || epe(e) || U6(e) || Jhe();
}
function Jhe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function epe(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function tpe(e) {
  if (Array.isArray(e)) return J_(e);
}
function R$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function hn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? R$(Object(n), !0).forEach(function (r) {
          Q_(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : R$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Q_(e, t, n) {
  return (
    (t = npe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function npe(e) {
  var t = rpe(e, "string");
  return Ff(t) === "symbol" ? t : String(t);
}
function rpe(e, t) {
  if (Ff(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ff(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ipe(e, t) {
  return spe(e) || ape(e, t) || U6(e, t) || ope();
}
function ope() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function U6(e, t) {
  if (e) {
    if (typeof e == "string") return J_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return J_(e, t);
  }
}
function J_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ape(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function spe(e) {
  if (Array.isArray(e)) return e;
}
var jm = function (t, n, r) {
    return t + (n - t) * r;
  },
  eP = function (t) {
    var n = t.from,
      r = t.to;
    return n !== r;
  },
  lpe = function e(t, n, r) {
    var i = Yc(function (o, a) {
      if (eP(a)) {
        var s = t(a.from, a.to, a.velocity),
          u = ipe(s, 2),
          c = u[0],
          d = u[1];
        return hn(
          hn({}, a),
          {},
          {
            from: c,
            velocity: d,
          },
        );
      }
      return a;
    }, n);
    return r < 1
      ? Yc(function (o, a) {
          return eP(a)
            ? hn(
                hn({}, a),
                {},
                {
                  velocity: jm(a.velocity, i[o].velocity, r),
                  from: jm(a.from, i[o].from, r),
                },
              )
            : a;
        }, n)
      : e(t, i, r - 1);
  };
const upe = function (e, t, n, r, i) {
  var o = Bhe(e, t),
    a = o.reduce(function (w, x) {
      return hn(hn({}, w), {}, Q_({}, x, [e[x], t[x]]));
    }, {}),
    s = o.reduce(function (w, x) {
      return hn(
        hn({}, w),
        {},
        Q_({}, x, {
          from: e[x],
          velocity: 0,
          to: t[x],
        }),
      );
    }, {}),
    u = -1,
    c,
    d,
    h = function () {
      return null;
    },
    p = function () {
      return Yc(function (x, S) {
        return S.from;
      }, s);
    },
    v = function () {
      return !Object.values(s).filter(eP).length;
    },
    b = function (x) {
      c || (c = x);
      var S = x - c,
        _ = S / n.dt;
      (s = lpe(n, s, _)), i(hn(hn(hn({}, e), t), p())), (c = x), v() || (u = requestAnimationFrame(h));
    },
    y = function (x) {
      d || (d = x);
      var S = (x - d) / r,
        _ = Yc(function (P, O) {
          return jm.apply(void 0, j$(O).concat([n(S)]));
        }, a);
      if ((i(hn(hn(hn({}, e), t), _)), S < 1)) u = requestAnimationFrame(h);
      else {
        var E = Yc(function (P, O) {
          return jm.apply(void 0, j$(O).concat([n(1)]));
        }, a);
        i(hn(hn(hn({}, e), t), E));
      }
    };
  return (
    (h = n.isStepper ? b : y),
    function () {
      return (
        requestAnimationFrame(h),
        function () {
          cancelAnimationFrame(u);
        }
      );
    }
  );
};
function Hl(e) {
  "@babel/helpers - typeof";

  return (
    (Hl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Hl(e)
  );
}
var cpe = [
  "children",
  "begin",
  "duration",
  "attributeName",
  "easing",
  "isActive",
  "steps",
  "from",
  "to",
  "canBegin",
  "onAnimationEnd",
  "shouldReAnimate",
  "onAnimationReStart",
];
function fpe(e, t) {
  if (e == null) return {};
  var n = dpe(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function dpe(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++) (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function kx(e) {
  return vpe(e) || mpe(e) || ppe(e) || hpe();
}
function hpe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ppe(e, t) {
  if (e) {
    if (typeof e == "string") return tP(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tP(e, t);
  }
}
function mpe(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function vpe(e) {
  if (Array.isArray(e)) return tP(e);
}
function tP(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function M$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Wr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? M$(Object(n), !0).forEach(function (r) {
          Mc(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : M$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Mc(e, t, n) {
  return (
    (t = H6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function ype(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function gpe(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, H6(r.key), r);
  }
}
function bpe(e, t, n) {
  return (
    t && gpe(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function H6(e) {
  var t = wpe(e, "string");
  return Hl(t) === "symbol" ? t : String(t);
}
function wpe(e, t) {
  if (Hl(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Hl(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xpe(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && nP(e, t);
}
function nP(e, t) {
  return (
    (nP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    nP(e, t)
  );
}
function Spe(e) {
  var t = _pe();
  return function () {
    var r = Rm(e),
      i;
    if (t) {
      var o = Rm(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else i = r.apply(this, arguments);
    return rP(this, i);
  };
}
function rP(e, t) {
  if (t && (Hl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return iP(e);
}
function iP(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _pe() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
  } catch {
    return !1;
  }
}
function Rm(e) {
  return (
    (Rm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Rm(e)
  );
}
var ho = (function (e) {
  xpe(n, e);
  var t = Spe(n);
  function n(r, i) {
    var o;
    ype(this, n), (o = t.call(this, r, i));
    var a = o.props,
      s = a.isActive,
      u = a.attributeName,
      c = a.from,
      d = a.to,
      h = a.steps,
      p = a.children,
      v = a.duration;
    if (
      ((o.handleStyleChange = o.handleStyleChange.bind(iP(o))),
      (o.changeStyle = o.changeStyle.bind(iP(o))),
      !s || v <= 0)
    )
      return (
        (o.state = {
          style: {},
        }),
        typeof p == "function" &&
          (o.state = {
            style: d,
          }),
        rP(o)
      );
    if (h && h.length)
      o.state = {
        style: h[0].style,
      };
    else if (c) {
      if (typeof p == "function")
        return (
          (o.state = {
            style: c,
          }),
          rP(o)
        );
      o.state = {
        style: u ? Mc({}, u, c) : c,
      };
    } else
      o.state = {
        style: {},
      };
    return o;
  }
  return (
    bpe(n, [
      {
        key: "componentDidMount",
        value: function () {
          var i = this.props,
            o = i.isActive,
            a = i.canBegin;
          (this.mounted = !0), !(!o || !a) && this.runAnimation(this.props);
        },
      },
      {
        key: "componentDidUpdate",
        value: function (i) {
          var o = this.props,
            a = o.isActive,
            s = o.canBegin,
            u = o.attributeName,
            c = o.shouldReAnimate,
            d = o.to,
            h = o.from,
            p = this.state.style;
          if (s) {
            if (!a) {
              var v = {
                style: u ? Mc({}, u, d) : d,
              };
              this.state && p && ((u && p[u] !== d) || (!u && p !== d)) && this.setState(v);
              return;
            }
            if (!(Che(i.to, d) && i.canBegin && i.isActive)) {
              var b = !i.canBegin || !i.isActive;
              this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
              var y = b || c ? h : i.to;
              if (this.state && p) {
                var w = {
                  style: u ? Mc({}, u, y) : y,
                };
                ((u && p[u] !== y) || (!u && p !== y)) && this.setState(w);
              }
              this.runAnimation(
                Wr(
                  Wr({}, this.props),
                  {},
                  {
                    from: y,
                    begin: 0,
                  },
                ),
              );
            }
          }
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this.mounted = !1;
          var i = this.props.onAnimationEnd;
          this.unSubscribe && this.unSubscribe(),
            this.manager && (this.manager.stop(), (this.manager = null)),
            this.stopJSAnimation && this.stopJSAnimation(),
            i && i();
        },
      },
      {
        key: "handleStyleChange",
        value: function (i) {
          this.changeStyle(i);
        },
      },
      {
        key: "changeStyle",
        value: function (i) {
          this.mounted &&
            this.setState({
              style: i,
            });
        },
      },
      {
        key: "runJSAnimation",
        value: function (i) {
          var o = this,
            a = i.from,
            s = i.to,
            u = i.duration,
            c = i.easing,
            d = i.begin,
            h = i.onAnimationEnd,
            p = i.onAnimationStart,
            v = upe(a, s, Qhe(c), u, this.changeStyle),
            b = function () {
              o.stopJSAnimation = v();
            };
          this.manager.start([p, d, b, u, h]);
        },
      },
      {
        key: "runStepAnimation",
        value: function (i) {
          var o = this,
            a = i.steps,
            s = i.begin,
            u = i.onAnimationStart,
            c = a[0],
            d = c.style,
            h = c.duration,
            p = h === void 0 ? 0 : h,
            v = function (y, w, x) {
              if (x === 0) return y;
              var S = w.duration,
                _ = w.easing,
                E = _ === void 0 ? "ease" : _,
                P = w.style,
                O = w.properties,
                k = w.onAnimationEnd,
                R = x > 0 ? a[x - 1] : w,
                M = O || Object.keys(P);
              if (typeof E == "function" || E === "spring")
                return [].concat(kx(y), [
                  o.runJSAnimation.bind(o, {
                    from: R.style,
                    to: P,
                    duration: S,
                    easing: E,
                  }),
                  S,
                ]);
              var D = T$(M, S, E),
                I = Wr(
                  Wr(Wr({}, R.style), P),
                  {},
                  {
                    transition: D,
                  },
                );
              return [].concat(kx(y), [I, S, k]).filter(Fhe);
            };
          return this.manager.start([u].concat(kx(a.reduce(v, [d, Math.max(p, s)])), [i.onAnimationEnd]));
        },
      },
      {
        key: "runAnimation",
        value: function (i) {
          this.manager || (this.manager = Dhe());
          var o = i.begin,
            a = i.duration,
            s = i.attributeName,
            u = i.to,
            c = i.easing,
            d = i.onAnimationStart,
            h = i.onAnimationEnd,
            p = i.steps,
            v = i.children,
            b = this.manager;
          if (
            ((this.unSubscribe = b.subscribe(this.handleStyleChange)),
            typeof c == "function" || typeof v == "function" || c === "spring")
          ) {
            this.runJSAnimation(i);
            return;
          }
          if (p.length > 1) {
            this.runStepAnimation(i);
            return;
          }
          var y = s ? Mc({}, s, u) : u,
            w = T$(Object.keys(y), a, c);
          b.start([
            d,
            o,
            Wr(
              Wr({}, y),
              {},
              {
                transition: w,
              },
            ),
            a,
            h,
          ]);
        },
      },
      {
        key: "render",
        value: function () {
          var i = this.props,
            o = i.children;
          i.begin;
          var a = i.duration;
          i.attributeName, i.easing;
          var s = i.isActive;
          i.steps, i.from, i.to, i.canBegin, i.onAnimationEnd, i.shouldReAnimate, i.onAnimationReStart;
          var u = fpe(i, cpe),
            c = React.Children.count(o),
            d = this.state.style;
          if (typeof o == "function") return o(d);
          if (!s || c === 0 || a <= 0) return o;
          var h = function (v) {
            var b = v.props,
              y = b.style,
              w = y === void 0 ? {} : y,
              x = b.className,
              S = React.cloneElement(
                v,
                Wr(
                  Wr({}, u),
                  {},
                  {
                    style: Wr(Wr({}, w), d),
                    className: x,
                  },
                ),
              );
            return S;
          };
          return c === 1
            ? h(React.Children.only(o))
            : ReactDefault.createElement(
                "div",
                null,
                React.Children.map(o, function (p) {
                  return h(p);
                }),
              );
        },
      },
    ]),
    n
  );
})(React.PureComponent);
ho.displayName = "Animate";
ho.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function () {},
  onAnimationStart: function () {},
};
ho.propTypes = {
  from: ct.oneOfType([ct.object, ct.string]),
  to: ct.oneOfType([ct.object, ct.string]),
  attributeName: ct.string,
  duration: ct.number,
  begin: ct.number,
  easing: ct.oneOfType([ct.string, ct.func]),
  steps: ct.arrayOf(
    ct.shape({
      duration: ct.number.isRequired,
      style: ct.object.isRequired,
      easing: ct.oneOfType([ct.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), ct.func]),
      properties: ct.arrayOf("string"),
      onAnimationEnd: ct.func,
    }),
  ),
  children: ct.oneOfType([ct.node, ct.func]),
  isActive: ct.bool,
  canBegin: ct.bool,
  onAnimationEnd: ct.func,
  shouldReAnimate: ct.bool,
  onAnimationStart: ct.func,
  onAnimationReStart: ct.func,
};
function Vf(e) {
  "@babel/helpers - typeof";

  return (
    (Vf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Vf(e)
  );
}
function Mm() {
  return (
    (Mm = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Mm.apply(this, arguments)
  );
}
function Ppe(e, t) {
  return Tpe(e) || Epe(e, t) || Ope(e, t) || Ape();
}
function Ape() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ope(e, t) {
  if (e) {
    if (typeof e == "string") return N$(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return N$(e, t);
  }
}
function N$(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Epe(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function Tpe(e) {
  if (Array.isArray(e)) return e;
}
function I$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function D$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? I$(Object(n), !0).forEach(function (r) {
          Cpe(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : I$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Cpe(e, t, n) {
  return (
    (t = kpe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function kpe(e) {
  var t = jpe(e, "string");
  return Vf(t) == "symbol" ? t : t + "";
}
function jpe(e, t) {
  if (Vf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Vf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var $$ = function (t, n, r, i, o) {
    var a = Math.min(Math.abs(r) / 2, Math.abs(i) / 2),
      s = i >= 0 ? 1 : -1,
      u = r >= 0 ? 1 : -1,
      c = (i >= 0 && r >= 0) || (i < 0 && r < 0) ? 1 : 0,
      d;
    if (a > 0 && o instanceof Array) {
      for (var h = [0, 0, 0, 0], p = 0, v = 4; p < v; p++) h[p] = o[p] > a ? a : o[p];
      (d = "M".concat(t, ",").concat(n + s * h[0])),
        h[0] > 0 &&
          (d += "A "
            .concat(h[0], ",")
            .concat(h[0], ",0,0,")
            .concat(c, ",")
            .concat(t + u * h[0], ",")
            .concat(n)),
        (d += "L ".concat(t + r - u * h[1], ",").concat(n)),
        h[1] > 0 &&
          (d += "A "
            .concat(h[1], ",")
            .concat(h[1], ",0,0,")
            .concat(
              c,
              `,
        `,
            )
            .concat(t + r, ",")
            .concat(n + s * h[1])),
        (d += "L ".concat(t + r, ",").concat(n + i - s * h[2])),
        h[2] > 0 &&
          (d += "A "
            .concat(h[2], ",")
            .concat(h[2], ",0,0,")
            .concat(
              c,
              `,
        `,
            )
            .concat(t + r - u * h[2], ",")
            .concat(n + i)),
        (d += "L ".concat(t + u * h[3], ",").concat(n + i)),
        h[3] > 0 &&
          (d += "A "
            .concat(h[3], ",")
            .concat(h[3], ",0,0,")
            .concat(
              c,
              `,
        `,
            )
            .concat(t, ",")
            .concat(n + i - s * h[3])),
        (d += "Z");
    } else if (a > 0 && o === +o && o > 0) {
      var b = Math.min(a, o);
      d = "M "
        .concat(t, ",")
        .concat(
          n + s * b,
          `
            A `,
        )
        .concat(b, ",")
        .concat(b, ",0,0,")
        .concat(c, ",")
        .concat(t + u * b, ",")
        .concat(
          n,
          `
            L `,
        )
        .concat(t + r - u * b, ",")
        .concat(
          n,
          `
            A `,
        )
        .concat(b, ",")
        .concat(b, ",0,0,")
        .concat(c, ",")
        .concat(t + r, ",")
        .concat(
          n + s * b,
          `
            L `,
        )
        .concat(t + r, ",")
        .concat(
          n + i - s * b,
          `
            A `,
        )
        .concat(b, ",")
        .concat(b, ",0,0,")
        .concat(c, ",")
        .concat(t + r - u * b, ",")
        .concat(
          n + i,
          `
            L `,
        )
        .concat(t + u * b, ",")
        .concat(
          n + i,
          `
            A `,
        )
        .concat(b, ",")
        .concat(b, ",0,0,")
        .concat(c, ",")
        .concat(t, ",")
        .concat(n + i - s * b, " Z");
    } else d = "M ".concat(t, ",").concat(n, " h ").concat(r, " v ").concat(i, " h ").concat(-r, " Z");
    return d;
  },
  Rpe = function (t, n) {
    if (!t || !n) return !1;
    var r = t.x,
      i = t.y,
      o = n.x,
      a = n.y,
      s = n.width,
      u = n.height;
    if (Math.abs(s) > 0 && Math.abs(u) > 0) {
      var c = Math.min(o, o + s),
        d = Math.max(o, o + s),
        h = Math.min(a, a + u),
        p = Math.max(a, a + u);
      return r >= c && r <= d && i >= h && i <= p;
    }
    return !1;
  },
  Mpe = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  SE = function (t) {
    var n = D$(D$({}, Mpe), t),
      r = React.useRef(),
      i = React.useState(-1),
      o = Ppe(i, 2),
      a = o[0],
      s = o[1];
    React.useEffect(function () {
      if (r.current && r.current.getTotalLength)
        try {
          var E = r.current.getTotalLength();
          E && s(E);
        } catch {}
    }, []);
    var u = n.x,
      c = n.y,
      d = n.width,
      h = n.height,
      p = n.radius,
      v = n.className,
      b = n.animationEasing,
      y = n.animationDuration,
      w = n.animationBegin,
      x = n.isAnimationActive,
      S = n.isUpdateAnimationActive;
    if (u !== +u || c !== +c || d !== +d || h !== +h || d === 0 || h === 0) return null;
    var _ = We("recharts-rectangle", v);
    return S
      ? ReactDefault.createElement(
          ho,
          {
            canBegin: a > 0,
            from: {
              width: d,
              height: h,
              x: u,
              y: c,
            },
            to: {
              width: d,
              height: h,
              x: u,
              y: c,
            },
            duration: y,
            animationEasing: b,
            isActive: S,
          },
          function (E) {
            var P = E.width,
              O = E.height,
              k = E.x,
              R = E.y;
            return ReactDefault.createElement(
              ho,
              {
                canBegin: a > 0,
                from: "0px ".concat(a === -1 ? 1 : a, "px"),
                to: "".concat(a, "px 0px"),
                attributeName: "strokeDasharray",
                begin: w,
                duration: y,
                isActive: x,
                easing: b,
              },
              ReactDefault.createElement(
                "path",
                Mm({}, rt(n, !0), {
                  className: _,
                  d: $$(k, R, P, O, p),
                  ref: r,
                }),
              ),
            );
          },
        )
      : ReactDefault.createElement(
          "path",
          Mm({}, rt(n, !0), {
            className: _,
            d: $$(u, c, d, h, p),
          }),
        );
  };
function oP() {
  return (
    (oP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    oP.apply(this, arguments)
  );
}
var _E = function (t) {
  var n = t.cx,
    r = t.cy,
    i = t.r,
    o = t.className,
    a = We("recharts-dot", o);
  return n === +n && r === +r && i === +i
    ? React.createElement(
        "circle",
        oP({}, rt(t, !1), tm(t), {
          className: a,
          cx: n,
          cy: r,
          r: i,
        }),
      )
    : null;
};
function zf(e) {
  "@babel/helpers - typeof";

  return (
    (zf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    zf(e)
  );
}
var Npe = ["x", "y", "top", "left", "width", "height", "className"];
function aP() {
  return (
    (aP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    aP.apply(this, arguments)
  );
}
function L$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ipe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? L$(Object(n), !0).forEach(function (r) {
          Dpe(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : L$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Dpe(e, t, n) {
  return (
    (t = $pe(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function $pe(e) {
  var t = Lpe(e, "string");
  return zf(t) == "symbol" ? t : t + "";
}
function Lpe(e, t) {
  if (zf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (zf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bpe(e, t) {
  if (e == null) return {};
  var n = Fpe(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Fpe(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var Vpe = function (t, n, r, i, o, a) {
    return "M".concat(t, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(n, "h").concat(r);
  },
  zpe = function (t) {
    var n = t.x,
      r = n === void 0 ? 0 : n,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.top,
      s = a === void 0 ? 0 : a,
      u = t.left,
      c = u === void 0 ? 0 : u,
      d = t.width,
      h = d === void 0 ? 0 : d,
      p = t.height,
      v = p === void 0 ? 0 : p,
      b = t.className,
      y = Bpe(t, Npe),
      w = Ipe(
        {
          x: r,
          y: o,
          top: s,
          left: c,
          width: h,
          height: v,
        },
        y,
      );
    return !be(r) || !be(o) || !be(h) || !be(v) || !be(s) || !be(c)
      ? null
      : ReactDefault.createElement(
          "path",
          aP({}, rt(w, !0), {
            className: We("recharts-cross", b),
            d: Vpe(r, o, h, v, s, c),
          }),
        );
  },
  jx,
  B$;
function qpe() {
  if (B$) return jx;
  B$ = 1;
  var e = h8(),
    t = e(Object.getPrototypeOf, Object);
  return (jx = t), jx;
}
var Rx, F$;
function Wpe() {
  if (F$) return Rx;
  F$ = 1;
  var e = wo(),
    t = qpe(),
    n = xo(),
    r = "[object Object]",
    i = Function.prototype,
    o = Object.prototype,
    a = i.toString,
    s = o.hasOwnProperty,
    u = a.call(Object);
  function c(d) {
    if (!n(d) || e(d) != r) return !1;
    var h = t(d);
    if (h === null) return !0;
    var p = s.call(h, "constructor") && h.constructor;
    return typeof p == "function" && p instanceof p && a.call(p) == u;
  }
  return (Rx = c), Rx;
}
var Upe = Wpe();
const Hpe = ht(Upe);
var Mx, V$;
function Kpe() {
  if (V$) return Mx;
  V$ = 1;
  var e = wo(),
    t = xo(),
    n = "[object Boolean]";
  function r(i) {
    return i === !0 || i === !1 || (t(i) && e(i) == n);
  }
  return (Mx = r), Mx;
}
var Gpe = Kpe();
const Ype = ht(Gpe);
function qf(e) {
  "@babel/helpers - typeof";

  return (
    (qf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    qf(e)
  );
}
function Nm() {
  return (
    (Nm = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Nm.apply(this, arguments)
  );
}
function Xpe(e, t) {
  return eme(e) || Jpe(e, t) || Qpe(e, t) || Zpe();
}
function Zpe() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qpe(e, t) {
  if (e) {
    if (typeof e == "string") return z$(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return z$(e, t);
  }
}
function z$(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Jpe(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function eme(e) {
  if (Array.isArray(e)) return e;
}
function q$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function W$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? q$(Object(n), !0).forEach(function (r) {
          tme(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : q$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function tme(e, t, n) {
  return (
    (t = nme(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function nme(e) {
  var t = rme(e, "string");
  return qf(t) == "symbol" ? t : t + "";
}
function rme(e, t) {
  if (qf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (qf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var U$ = function (t, n, r, i, o) {
    var a = r - i,
      s;
    return (
      (s = "M ".concat(t, ",").concat(n)),
      (s += "L ".concat(t + r, ",").concat(n)),
      (s += "L ".concat(t + r - a / 2, ",").concat(n + o)),
      (s += "L ".concat(t + r - a / 2 - i, ",").concat(n + o)),
      (s += "L ".concat(t, ",").concat(n, " Z")),
      s
    );
  },
  ime = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease",
  },
  ome = function (t) {
    var n = W$(W$({}, ime), t),
      r = React.useRef(),
      i = React.useState(-1),
      o = Xpe(i, 2),
      a = o[0],
      s = o[1];
    React.useEffect(function () {
      if (r.current && r.current.getTotalLength)
        try {
          var _ = r.current.getTotalLength();
          _ && s(_);
        } catch {}
    }, []);
    var u = n.x,
      c = n.y,
      d = n.upperWidth,
      h = n.lowerWidth,
      p = n.height,
      v = n.className,
      b = n.animationEasing,
      y = n.animationDuration,
      w = n.animationBegin,
      x = n.isUpdateAnimationActive;
    if (u !== +u || c !== +c || d !== +d || h !== +h || p !== +p || (d === 0 && h === 0) || p === 0) return null;
    var S = We("recharts-trapezoid", v);
    return x
      ? ReactDefault.createElement(
          ho,
          {
            canBegin: a > 0,
            from: {
              upperWidth: 0,
              lowerWidth: 0,
              height: p,
              x: u,
              y: c,
            },
            to: {
              upperWidth: d,
              lowerWidth: h,
              height: p,
              x: u,
              y: c,
            },
            duration: y,
            animationEasing: b,
            isActive: x,
          },
          function (_) {
            var E = _.upperWidth,
              P = _.lowerWidth,
              O = _.height,
              k = _.x,
              R = _.y;
            return ReactDefault.createElement(
              ho,
              {
                canBegin: a > 0,
                from: "0px ".concat(a === -1 ? 1 : a, "px"),
                to: "".concat(a, "px 0px"),
                attributeName: "strokeDasharray",
                begin: w,
                duration: y,
                easing: b,
              },
              ReactDefault.createElement(
                "path",
                Nm({}, rt(n, !0), {
                  className: S,
                  d: U$(k, R, E, P, O),
                  ref: r,
                }),
              ),
            );
          },
        )
      : ReactDefault.createElement(
          "g",
          null,
          ReactDefault.createElement(
            "path",
            Nm({}, rt(n, !0), {
              className: S,
              d: U$(u, c, d, h, p),
            }),
          ),
        );
  },
  ame = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Wf(e) {
  "@babel/helpers - typeof";

  return (
    (Wf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Wf(e)
  );
}
function sme(e, t) {
  if (e == null) return {};
  var n = lme(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function lme(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function H$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Im(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? H$(Object(n), !0).forEach(function (r) {
          ume(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : H$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ume(e, t, n) {
  return (
    (t = cme(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function cme(e) {
  var t = fme(e, "string");
  return Wf(t) == "symbol" ? t : t + "";
}
function fme(e, t) {
  if (Wf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dme(e, t) {
  return Im(Im({}, t), e);
}
function hme(e, t) {
  return e === "symbols";
}
function K$(e) {
  var t = e.shapeType,
    n = e.elementProps;
  switch (t) {
    case "rectangle":
      return ReactDefault.createElement(SE, n);
    case "trapezoid":
      return ReactDefault.createElement(ome, n);
    case "sector":
      return ReactDefault.createElement(B6, n);
    case "symbols":
      if (hme(t)) return ReactDefault.createElement(VO, n);
      break;
    default:
      return null;
  }
}
function pme(e) {
  return React.isValidElement(e) ? e.props : e;
}
function mme(e) {
  var t = e.option,
    n = e.shapeType,
    r = e.propTransformer,
    i = r === void 0 ? dme : r,
    o = e.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    s = e.isActive,
    u = sme(e, ame),
    c;
  if (React.isValidElement(t)) c = React.cloneElement(t, Im(Im({}, u), pme(t)));
  else if (nt(t)) c = t(u);
  else if (Hpe(t) && !Ype(t)) {
    var d = i(t, u);
    c = ReactDefault.createElement(K$, {
      shapeType: n,
      elementProps: d,
    });
  } else {
    var h = u;
    c = ReactDefault.createElement(K$, {
      shapeType: n,
      elementProps: h,
    });
  }
  return s
    ? ReactDefault.createElement(
        Nt,
        {
          className: a,
        },
        c,
      )
    : c;
}
function iy(e, t) {
  return t != null && "trapezoids" in e.props;
}
function oy(e, t) {
  return t != null && "sectors" in e.props;
}
function Uf(e, t) {
  return t != null && "points" in e.props;
}
function vme(e, t) {
  var n,
    r,
    i = e.x === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.x) || e.x === t.x,
    o = e.y === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.y) || e.y === t.y;
  return i && o;
}
function yme(e, t) {
  var n = e.endAngle === t.endAngle,
    r = e.startAngle === t.startAngle;
  return n && r;
}
function gme(e, t) {
  var n = e.x === t.x,
    r = e.y === t.y,
    i = e.z === t.z;
  return n && r && i;
}
function bme(e, t) {
  var n;
  return iy(e, t) ? (n = vme) : oy(e, t) ? (n = yme) : Uf(e, t) && (n = gme), n;
}
function wme(e, t) {
  var n;
  return iy(e, t) ? (n = "trapezoids") : oy(e, t) ? (n = "sectors") : Uf(e, t) && (n = "points"), n;
}
function xme(e, t) {
  if (iy(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null ||
      n === void 0 ||
      (n = n[0]) === null ||
      n === void 0 ||
      (n = n.payload) === null ||
      n === void 0
      ? void 0
      : n.payload;
  }
  if (oy(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null ||
      r === void 0 ||
      (r = r[0]) === null ||
      r === void 0 ||
      (r = r.payload) === null ||
      r === void 0
      ? void 0
      : r.payload;
  }
  return Uf(e, t) ? t.payload : {};
}
function Sme(e) {
  var t = e.activeTooltipItem,
    n = e.graphicalItem,
    r = e.itemData,
    i = wme(n, t),
    o = xme(n, t),
    a = r.filter(function (u, c) {
      var d = Tf(o, u),
        h = n.props[i].filter(function (b) {
          var y = bme(n, t);
          return y(b, t);
        }),
        p = n.props[i].indexOf(h[h.length - 1]),
        v = c === p;
      return d && v;
    }),
    s = r.indexOf(a[a.length - 1]);
  return s;
}
var Nx, G$;
function _me() {
  if (G$) return Nx;
  G$ = 1;
  var e = Math.ceil,
    t = Math.max;
  function n(r, i, o, a) {
    for (var s = -1, u = t(e((i - r) / (o || 1)), 0), c = Array(u); u--; ) (c[a ? u : ++s] = r), (r += o);
    return c;
  }
  return (Nx = n), Nx;
}
var Ix, Y$;
function K6() {
  if (Y$) return Ix;
  Y$ = 1;
  var e = C8(),
    t = 1 / 0,
    n = 17976931348623157e292;
  function r(i) {
    if (!i) return i === 0 ? i : 0;
    if (((i = e(i)), i === t || i === -t)) {
      var o = i < 0 ? -1 : 1;
      return o * n;
    }
    return i === i ? i : 0;
  }
  return (Ix = r), Ix;
}
var Dx, X$;
function Pme() {
  if (X$) return Dx;
  X$ = 1;
  var e = _me(),
    t = Kv(),
    n = K6();
  function r(i) {
    return function (o, a, s) {
      return (
        s && typeof s != "number" && t(o, a, s) && (a = s = void 0),
        (o = n(o)),
        a === void 0 ? ((a = o), (o = 0)) : (a = n(a)),
        (s = s === void 0 ? (o < a ? 1 : -1) : n(s)),
        e(o, a, s, i)
      );
    };
  }
  return (Dx = r), Dx;
}
var $x, Z$;
function Ame() {
  if (Z$) return $x;
  Z$ = 1;
  var e = Pme(),
    t = e();
  return ($x = t), $x;
}
var Ome = Ame();
const Dm = ht(Ome);
function Hf(e) {
  "@babel/helpers - typeof";

  return (
    (Hf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Hf(e)
  );
}
function Q$(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function J$(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Q$(Object(n), !0).forEach(function (r) {
          G6(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Q$(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function G6(e, t, n) {
  return (
    (t = Eme(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Eme(e) {
  var t = Tme(e, "string");
  return Hf(t) == "symbol" ? t : t + "";
}
function Tme(e, t) {
  if (Hf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Hf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cme = ["Webkit", "Moz", "O", "ms"],
  kme = function (t, n) {
    var r = t.replace(/(\w)/, function (o) {
        return o.toUpperCase();
      }),
      i = Cme.reduce(function (o, a) {
        return J$(J$({}, o), {}, G6({}, a + r, n));
      }, {});
    return (i[t] = n), i;
  };
function Kl(e) {
  "@babel/helpers - typeof";

  return (
    (Kl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Kl(e)
  );
}
function $m() {
  return (
    ($m = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $m.apply(this, arguments)
  );
}
function e3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Lx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? e3(Object(n), !0).forEach(function (r) {
          ar(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : e3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function jme(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function t3(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, X6(r.key), r);
  }
}
function Rme(e, t, n) {
  return (
    t && t3(e.prototype, t),
    n && t3(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Mme(e, t, n) {
  return (t = Lm(t)), Nme(e, Y6() ? Reflect.construct(t, n || [], Lm(e).constructor) : t.apply(e, n));
}
function Nme(e, t) {
  if (t && (Kl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Ime(e);
}
function Ime(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Y6() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Y6 = function () {
    return !!e;
  })();
}
function Lm(e) {
  return (
    (Lm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Lm(e)
  );
}
function Dme(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && sP(e, t);
}
function sP(e, t) {
  return (
    (sP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    sP(e, t)
  );
}
function ar(e, t, n) {
  return (
    (t = X6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function X6(e) {
  var t = $me(e, "string");
  return Kl(t) == "symbol" ? t : t + "";
}
function $me(e, t) {
  if (Kl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Kl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Lme = function (t) {
    var n = t.data,
      r = t.startIndex,
      i = t.endIndex,
      o = t.x,
      a = t.width,
      s = t.travellerWidth;
    if (!n || !n.length) return {};
    var u = n.length,
      c = Hc()
        .domain(Dm(0, u))
        .range([o, o + a - s]),
      d = c.domain().map(function (h) {
        return c(h);
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: c(r),
      endX: c(i),
      scale: c,
      scaleValues: d,
    };
  },
  n3 = function (t) {
    return t.changedTouches && !!t.changedTouches.length;
  },
  Gl = (function (e) {
    function t(n) {
      var r;
      return (
        jme(this, t),
        (r = Mme(this, t, [n])),
        ar(r, "handleDrag", function (i) {
          r.leaveTimer && (clearTimeout(r.leaveTimer), (r.leaveTimer = null)),
            r.state.isTravellerMoving ? r.handleTravellerMove(i) : r.state.isSlideMoving && r.handleSlideDrag(i);
        }),
        ar(r, "handleTouchMove", function (i) {
          i.changedTouches != null && i.changedTouches.length > 0 && r.handleDrag(i.changedTouches[0]);
        }),
        ar(r, "handleDragEnd", function () {
          r.setState(
            {
              isTravellerMoving: !1,
              isSlideMoving: !1,
            },
            function () {
              var i = r.props,
                o = i.endIndex,
                a = i.onDragEnd,
                s = i.startIndex;
              a?.({
                endIndex: o,
                startIndex: s,
              });
            },
          ),
            r.detachDragEndListener();
        }),
        ar(r, "handleLeaveWrapper", function () {
          (r.state.isTravellerMoving || r.state.isSlideMoving) &&
            (r.leaveTimer = window.setTimeout(r.handleDragEnd, r.props.leaveTimeOut));
        }),
        ar(r, "handleEnterSlideOrTraveller", function () {
          r.setState({
            isTextActive: !0,
          });
        }),
        ar(r, "handleLeaveSlideOrTraveller", function () {
          r.setState({
            isTextActive: !1,
          });
        }),
        ar(r, "handleSlideDragStart", function (i) {
          var o = n3(i) ? i.changedTouches[0] : i;
          r.setState({
            isTravellerMoving: !1,
            isSlideMoving: !0,
            slideMoveStartX: o.pageX,
          }),
            r.attachDragEndListener();
        }),
        (r.travellerDragStartHandlers = {
          startX: r.handleTravellerDragStart.bind(r, "startX"),
          endX: r.handleTravellerDragStart.bind(r, "endX"),
        }),
        (r.state = {}),
        r
      );
    }
    return (
      Dme(t, e),
      Rme(
        t,
        [
          {
            key: "componentWillUnmount",
            value: function () {
              this.leaveTimer && (clearTimeout(this.leaveTimer), (this.leaveTimer = null)),
                this.detachDragEndListener();
            },
          },
          {
            key: "getIndex",
            value: function (r) {
              var i = r.startX,
                o = r.endX,
                a = this.state.scaleValues,
                s = this.props,
                u = s.gap,
                c = s.data,
                d = c.length - 1,
                h = Math.min(i, o),
                p = Math.max(i, o),
                v = t.getIndexInRange(a, h),
                b = t.getIndexInRange(a, p);
              return {
                startIndex: v - (v % u),
                endIndex: b === d ? d : b - (b % u),
              };
            },
          },
          {
            key: "getTextOfTick",
            value: function (r) {
              var i = this.props,
                o = i.data,
                a = i.tickFormatter,
                s = i.dataKey,
                u = hr(o[r], s, r);
              return nt(a) ? a(u, r) : u;
            },
          },
          {
            key: "attachDragEndListener",
            value: function () {
              window.addEventListener("mouseup", this.handleDragEnd, !0),
                window.addEventListener("touchend", this.handleDragEnd, !0),
                window.addEventListener("mousemove", this.handleDrag, !0);
            },
          },
          {
            key: "detachDragEndListener",
            value: function () {
              window.removeEventListener("mouseup", this.handleDragEnd, !0),
                window.removeEventListener("touchend", this.handleDragEnd, !0),
                window.removeEventListener("mousemove", this.handleDrag, !0);
            },
          },
          {
            key: "handleSlideDrag",
            value: function (r) {
              var i = this.state,
                o = i.slideMoveStartX,
                a = i.startX,
                s = i.endX,
                u = this.props,
                c = u.x,
                d = u.width,
                h = u.travellerWidth,
                p = u.startIndex,
                v = u.endIndex,
                b = u.onChange,
                y = r.pageX - o;
              y > 0 ? (y = Math.min(y, c + d - h - s, c + d - h - a)) : y < 0 && (y = Math.max(y, c - a, c - s));
              var w = this.getIndex({
                startX: a + y,
                endX: s + y,
              });
              (w.startIndex !== p || w.endIndex !== v) && b && b(w),
                this.setState({
                  startX: a + y,
                  endX: s + y,
                  slideMoveStartX: r.pageX,
                });
            },
          },
          {
            key: "handleTravellerDragStart",
            value: function (r, i) {
              var o = n3(i) ? i.changedTouches[0] : i;
              this.setState({
                isSlideMoving: !1,
                isTravellerMoving: !0,
                movingTravellerId: r,
                brushMoveStartX: o.pageX,
              }),
                this.attachDragEndListener();
            },
          },
          {
            key: "handleTravellerMove",
            value: function (r) {
              var i = this.state,
                o = i.brushMoveStartX,
                a = i.movingTravellerId,
                s = i.endX,
                u = i.startX,
                c = this.state[a],
                d = this.props,
                h = d.x,
                p = d.width,
                v = d.travellerWidth,
                b = d.onChange,
                y = d.gap,
                w = d.data,
                x = {
                  startX: this.state.startX,
                  endX: this.state.endX,
                },
                S = r.pageX - o;
              S > 0 ? (S = Math.min(S, h + p - v - c)) : S < 0 && (S = Math.max(S, h - c)), (x[a] = c + S);
              var _ = this.getIndex(x),
                E = _.startIndex,
                P = _.endIndex,
                O = function () {
                  var R = w.length - 1;
                  return (
                    (a === "startX" && (s > u ? E % y === 0 : P % y === 0)) ||
                    (s < u && P === R) ||
                    (a === "endX" && (s > u ? P % y === 0 : E % y === 0)) ||
                    (s > u && P === R)
                  );
                };
              this.setState(ar(ar({}, a, c + S), "brushMoveStartX", r.pageX), function () {
                b && O() && b(_);
              });
            },
          },
          {
            key: "handleTravellerMoveKeyboard",
            value: function (r, i) {
              var o = this,
                a = this.state,
                s = a.scaleValues,
                u = a.startX,
                c = a.endX,
                d = this.state[i],
                h = s.indexOf(d);
              if (h !== -1) {
                var p = h + r;
                if (!(p === -1 || p >= s.length)) {
                  var v = s[p];
                  (i === "startX" && v >= c) ||
                    (i === "endX" && v <= u) ||
                    this.setState(ar({}, i, v), function () {
                      o.props.onChange(
                        o.getIndex({
                          startX: o.state.startX,
                          endX: o.state.endX,
                        }),
                      );
                    });
                }
              }
            },
          },
          {
            key: "renderBackground",
            value: function () {
              var r = this.props,
                i = r.x,
                o = r.y,
                a = r.width,
                s = r.height,
                u = r.fill,
                c = r.stroke;
              return ReactDefault.createElement("rect", {
                stroke: c,
                fill: u,
                x: i,
                y: o,
                width: a,
                height: s,
              });
            },
          },
          {
            key: "renderPanorama",
            value: function () {
              var r = this.props,
                i = r.x,
                o = r.y,
                a = r.width,
                s = r.height,
                u = r.data,
                c = r.children,
                d = r.padding,
                h = React.Children.only(c);
              return h
                ? ReactDefault.cloneElement(h, {
                    x: i,
                    y: o,
                    width: a,
                    height: s,
                    margin: d,
                    compact: !0,
                    data: u,
                  })
                : null;
            },
          },
          {
            key: "renderTravellerLayer",
            value: function (r, i) {
              var o,
                a,
                s = this,
                u = this.props,
                c = u.y,
                d = u.travellerWidth,
                h = u.height,
                p = u.traveller,
                v = u.ariaLabel,
                b = u.data,
                y = u.startIndex,
                w = u.endIndex,
                x = Math.max(r, this.props.x),
                S = Lx(
                  Lx({}, rt(this.props, !1)),
                  {},
                  {
                    x,
                    y: c,
                    width: d,
                    height: h,
                  },
                ),
                _ =
                  v ||
                  "Min value: "
                    .concat((o = b[y]) === null || o === void 0 ? void 0 : o.name, ", Max value: ")
                    .concat((a = b[w]) === null || a === void 0 ? void 0 : a.name);
              return ReactDefault.createElement(
                Nt,
                {
                  tabIndex: 0,
                  role: "slider",
                  "aria-label": _,
                  "aria-valuenow": r,
                  className: "recharts-brush-traveller",
                  onMouseEnter: this.handleEnterSlideOrTraveller,
                  onMouseLeave: this.handleLeaveSlideOrTraveller,
                  onMouseDown: this.travellerDragStartHandlers[i],
                  onTouchStart: this.travellerDragStartHandlers[i],
                  onKeyDown: function (P) {
                    ["ArrowLeft", "ArrowRight"].includes(P.key) &&
                      (P.preventDefault(),
                      P.stopPropagation(),
                      s.handleTravellerMoveKeyboard(P.key === "ArrowRight" ? 1 : -1, i));
                  },
                  onFocus: function () {
                    s.setState({
                      isTravellerFocused: !0,
                    });
                  },
                  onBlur: function () {
                    s.setState({
                      isTravellerFocused: !1,
                    });
                  },
                  style: {
                    cursor: "col-resize",
                  },
                },
                t.renderTraveller(p, S),
              );
            },
          },
          {
            key: "renderSlide",
            value: function (r, i) {
              var o = this.props,
                a = o.y,
                s = o.height,
                u = o.stroke,
                c = o.travellerWidth,
                d = Math.min(r, i) + c,
                h = Math.max(Math.abs(i - r) - c, 0);
              return ReactDefault.createElement("rect", {
                className: "recharts-brush-slide",
                onMouseEnter: this.handleEnterSlideOrTraveller,
                onMouseLeave: this.handleLeaveSlideOrTraveller,
                onMouseDown: this.handleSlideDragStart,
                onTouchStart: this.handleSlideDragStart,
                style: {
                  cursor: "move",
                },
                stroke: "none",
                fill: u,
                fillOpacity: 0.2,
                x: d,
                y: a,
                width: h,
                height: s,
              });
            },
          },
          {
            key: "renderText",
            value: function () {
              var r = this.props,
                i = r.startIndex,
                o = r.endIndex,
                a = r.y,
                s = r.height,
                u = r.travellerWidth,
                c = r.stroke,
                d = this.state,
                h = d.startX,
                p = d.endX,
                v = 5,
                b = {
                  pointerEvents: "none",
                  fill: c,
                };
              return ReactDefault.createElement(
                Nt,
                {
                  className: "recharts-brush-texts",
                },
                ReactDefault.createElement(
                  hm,
                  $m(
                    {
                      textAnchor: "end",
                      verticalAnchor: "middle",
                      x: Math.min(h, p) - v,
                      y: a + s / 2,
                    },
                    b,
                  ),
                  this.getTextOfTick(i),
                ),
                ReactDefault.createElement(
                  hm,
                  $m(
                    {
                      textAnchor: "start",
                      verticalAnchor: "middle",
                      x: Math.max(h, p) + u + v,
                      y: a + s / 2,
                    },
                    b,
                  ),
                  this.getTextOfTick(o),
                ),
              );
            },
          },
          {
            key: "render",
            value: function () {
              var r = this.props,
                i = r.data,
                o = r.className,
                a = r.children,
                s = r.x,
                u = r.y,
                c = r.width,
                d = r.height,
                h = r.alwaysShowText,
                p = this.state,
                v = p.startX,
                b = p.endX,
                y = p.isTextActive,
                w = p.isSlideMoving,
                x = p.isTravellerMoving,
                S = p.isTravellerFocused;
              if (!i || !i.length || !be(s) || !be(u) || !be(c) || !be(d) || c <= 0 || d <= 0) return null;
              var _ = We("recharts-brush", o),
                E = ReactDefault.Children.count(a) === 1,
                P = kme("userSelect", "none");
              return ReactDefault.createElement(
                Nt,
                {
                  className: _,
                  onMouseLeave: this.handleLeaveWrapper,
                  onTouchMove: this.handleTouchMove,
                  style: P,
                },
                this.renderBackground(),
                E && this.renderPanorama(),
                this.renderSlide(v, b),
                this.renderTravellerLayer(v, "startX"),
                this.renderTravellerLayer(b, "endX"),
                (y || w || x || S || h) && this.renderText(),
              );
            },
          },
        ],
        [
          {
            key: "renderDefaultTraveller",
            value: function (r) {
              var i = r.x,
                o = r.y,
                a = r.width,
                s = r.height,
                u = r.stroke,
                c = Math.floor(o + s / 2) - 1;
              return ReactDefault.createElement(
                ReactDefault.Fragment,
                null,
                ReactDefault.createElement("rect", {
                  x: i,
                  y: o,
                  width: a,
                  height: s,
                  fill: u,
                  stroke: "none",
                }),
                ReactDefault.createElement("line", {
                  x1: i + 1,
                  y1: c,
                  x2: i + a - 1,
                  y2: c,
                  fill: "none",
                  stroke: "#fff",
                }),
                ReactDefault.createElement("line", {
                  x1: i + 1,
                  y1: c + 2,
                  x2: i + a - 1,
                  y2: c + 2,
                  fill: "none",
                  stroke: "#fff",
                }),
              );
            },
          },
          {
            key: "renderTraveller",
            value: function (r, i) {
              var o;
              return (
                ReactDefault.isValidElement(r)
                  ? (o = ReactDefault.cloneElement(r, i))
                  : nt(r)
                    ? (o = r(i))
                    : (o = t.renderDefaultTraveller(i)),
                o
              );
            },
          },
          {
            key: "getDerivedStateFromProps",
            value: function (r, i) {
              var o = r.data,
                a = r.width,
                s = r.x,
                u = r.travellerWidth,
                c = r.updateId,
                d = r.startIndex,
                h = r.endIndex;
              if (o !== i.prevData || c !== i.prevUpdateId)
                return Lx(
                  {
                    prevData: o,
                    prevTravellerWidth: u,
                    prevUpdateId: c,
                    prevX: s,
                    prevWidth: a,
                  },
                  o && o.length
                    ? Lme({
                        data: o,
                        width: a,
                        x: s,
                        travellerWidth: u,
                        startIndex: d,
                        endIndex: h,
                      })
                    : {
                        scale: null,
                        scaleValues: null,
                      },
                );
              if (i.scale && (a !== i.prevWidth || s !== i.prevX || u !== i.prevTravellerWidth)) {
                i.scale.range([s, s + a - u]);
                var p = i.scale.domain().map(function (v) {
                  return i.scale(v);
                });
                return {
                  prevData: o,
                  prevTravellerWidth: u,
                  prevUpdateId: c,
                  prevX: s,
                  prevWidth: a,
                  startX: i.scale(r.startIndex),
                  endX: i.scale(r.endIndex),
                  scaleValues: p,
                };
              }
              return null;
            },
          },
          {
            key: "getIndexInRange",
            value: function (r, i) {
              for (var o = r.length, a = 0, s = o - 1; s - a > 1; ) {
                var u = Math.floor((a + s) / 2);
                r[u] > i ? (s = u) : (a = u);
              }
              return i >= r[s] ? s : a;
            },
          },
        ],
      )
    );
  })(React.PureComponent);
ar(Gl, "displayName", "Brush");
ar(Gl, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1,
});
var Bx, r3;
function Bme() {
  if (r3) return Bx;
  r3 = 1;
  var e = GO();
  function t(n, r) {
    var i;
    return (
      e(n, function (o, a, s) {
        return (i = r(o, a, s)), !i;
      }),
      !!i
    );
  }
  return (Bx = t), Bx;
}
var Fx, i3;
function Fme() {
  if (i3) return Fx;
  i3 = 1;
  var e = a8(),
    t = ya(),
    n = Bme(),
    r = er(),
    i = Kv();
  function o(a, s, u) {
    var c = r(a) ? e : n;
    return u && i(a, s, u) && (s = void 0), c(a, t(s, 3));
  }
  return (Fx = o), Fx;
}
var Vme = Fme();
const zme = ht(Vme);
var Si = function (t, n) {
    var r = t.alwaysShow,
      i = t.ifOverflow;
    return r && (i = "extendDomain"), i === n;
  },
  Vx,
  o3;
function qme() {
  if (o3) return Vx;
  o3 = 1;
  var e = P8();
  function t(n, r, i) {
    r == "__proto__" && e
      ? e(n, r, {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0,
        })
      : (n[r] = i);
  }
  return (Vx = t), Vx;
}
var zx, a3;
function Wme() {
  if (a3) return zx;
  a3 = 1;
  var e = qme(),
    t = S8(),
    n = ya();
  function r(i, o) {
    var a = {};
    return (
      (o = n(o, 3)),
      t(i, function (s, u, c) {
        e(a, u, o(s, u, c));
      }),
      a
    );
  }
  return (zx = r), zx;
}
var Ume = Wme();
const Hme = ht(Ume);
var qx, s3;
function Kme() {
  if (s3) return qx;
  s3 = 1;
  function e(t, n) {
    for (var r = -1, i = t == null ? 0 : t.length; ++r < i; ) if (!n(t[r], r, t)) return !1;
    return !0;
  }
  return (qx = e), qx;
}
var Wx, l3;
function Gme() {
  if (l3) return Wx;
  l3 = 1;
  var e = GO();
  function t(n, r) {
    var i = !0;
    return (
      e(n, function (o, a, s) {
        return (i = !!r(o, a, s)), i;
      }),
      i
    );
  }
  return (Wx = t), Wx;
}
var Ux, u3;
function Yme() {
  if (u3) return Ux;
  u3 = 1;
  var e = Kme(),
    t = Gme(),
    n = ya(),
    r = er(),
    i = Kv();
  function o(a, s, u) {
    var c = r(a) ? e : t;
    return u && i(a, s, u) && (s = void 0), c(a, n(s, 3));
  }
  return (Ux = o), Ux;
}
var Xme = Yme();
const Zme = ht(Xme);
var Qme = ["x", "y"];
function Kf(e) {
  "@babel/helpers - typeof";

  return (
    (Kf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Kf(e)
  );
}
function lP() {
  return (
    (lP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    lP.apply(this, arguments)
  );
}
function c3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ac(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? c3(Object(n), !0).forEach(function (r) {
          Jme(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : c3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Jme(e, t, n) {
  return (
    (t = eve(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function eve(e) {
  var t = tve(e, "string");
  return Kf(t) == "symbol" ? t : t + "";
}
function tve(e, t) {
  if (Kf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Kf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nve(e, t) {
  if (e == null) return {};
  var n = rve(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function rve(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function ive(e, t) {
  var n = e.x,
    r = e.y,
    i = nve(e, Qme),
    o = "".concat(n),
    a = parseInt(o, 10),
    s = "".concat(r),
    u = parseInt(s, 10),
    c = "".concat(t.height || i.height),
    d = parseInt(c, 10),
    h = "".concat(t.width || i.width),
    p = parseInt(h, 10);
  return Ac(
    Ac(
      Ac(
        Ac(Ac({}, t), i),
        a
          ? {
              x: a,
            }
          : {},
      ),
      u
        ? {
            y: u,
          }
        : {},
    ),
    {},
    {
      height: d,
      width: p,
      name: t.name,
      radius: t.radius,
    },
  );
}
function f3(e) {
  return ReactDefault.createElement(
    mme,
    lP(
      {
        shapeType: "rectangle",
        propTransformer: ive,
        activeClassName: "recharts-active-bar",
      },
      e,
    ),
  );
}
var ove = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return function (r, i) {
      if (typeof t == "number") return t;
      var o = be(r) || dre(r);
      return o ? t(r, i) : (o || ms(), n);
    };
  },
  ave = ["value", "background"],
  Z6;
function Yl(e) {
  "@babel/helpers - typeof";

  return (
    (Yl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Yl(e)
  );
}
function sve(e, t) {
  if (e == null) return {};
  var n = lve(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function lve(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Bm() {
  return (
    (Bm = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Bm.apply(this, arguments)
  );
}
function d3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? d3(Object(n), !0).forEach(function (r) {
          ea(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : d3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function uve(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h3(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, J6(r.key), r);
  }
}
function cve(e, t, n) {
  return (
    t && h3(e.prototype, t),
    n && h3(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function fve(e, t, n) {
  return (t = Fm(t)), dve(e, Q6() ? Reflect.construct(t, n || [], Fm(e).constructor) : t.apply(e, n));
}
function dve(e, t) {
  if (t && (Yl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return hve(e);
}
function hve(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Q6() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Q6 = function () {
    return !!e;
  })();
}
function Fm(e) {
  return (
    (Fm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Fm(e)
  );
}
function pve(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && uP(e, t);
}
function uP(e, t) {
  return (
    (uP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    uP(e, t)
  );
}
function ea(e, t, n) {
  return (
    (t = J6(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function J6(e) {
  var t = mve(e, "string");
  return Yl(t) == "symbol" ? t : t + "";
}
function mve(e, t) {
  if (Yl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var xd = (function (e) {
  function t() {
    var n;
    uve(this, t);
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
    return (
      (n = fve(this, t, [].concat(i))),
      ea(n, "state", {
        isAnimationFinished: !1,
      }),
      ea(n, "id", md("recharts-bar-")),
      ea(n, "handleAnimationEnd", function () {
        var a = n.props.onAnimationEnd;
        n.setState({
          isAnimationFinished: !0,
        }),
          a && a();
      }),
      ea(n, "handleAnimationStart", function () {
        var a = n.props.onAnimationStart;
        n.setState({
          isAnimationFinished: !1,
        }),
          a && a();
      }),
      n
    );
  }
  return (
    pve(t, e),
    cve(
      t,
      [
        {
          key: "renderRectanglesStatically",
          value: function (r) {
            var i = this,
              o = this.props,
              a = o.shape,
              s = o.dataKey,
              u = o.activeIndex,
              c = o.activeBar,
              d = rt(this.props, !1);
            return (
              r &&
              r.map(function (h, p) {
                var v = p === u,
                  b = v ? c : a,
                  y = Ut(
                    Ut(Ut({}, d), h),
                    {},
                    {
                      isActive: v,
                      option: b,
                      index: p,
                      dataKey: s,
                      onAnimationStart: i.handleAnimationStart,
                      onAnimationEnd: i.handleAnimationEnd,
                    },
                  );
                return ReactDefault.createElement(
                  Nt,
                  Bm(
                    {
                      className: "recharts-bar-rectangle",
                    },
                    nm(i.props, h, p),
                    {
                      key: "rectangle-".concat(h?.x, "-").concat(h?.y, "-").concat(h?.value, "-").concat(p),
                    },
                  ),
                  ReactDefault.createElement(f3, y),
                );
              })
            );
          },
        },
        {
          key: "renderRectanglesWithAnimation",
          value: function () {
            var r = this,
              i = this.props,
              o = i.data,
              a = i.layout,
              s = i.isAnimationActive,
              u = i.animationBegin,
              c = i.animationDuration,
              d = i.animationEasing,
              h = i.animationId,
              p = this.state.prevData;
            return ReactDefault.createElement(
              ho,
              {
                begin: u,
                duration: c,
                isActive: s,
                easing: d,
                from: {
                  t: 0,
                },
                to: {
                  t: 1,
                },
                key: "bar-".concat(h),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (v) {
                var b = v.t,
                  y = o.map(function (w, x) {
                    var S = p && p[x];
                    if (S) {
                      var _ = Ar(S.x, w.x),
                        E = Ar(S.y, w.y),
                        P = Ar(S.width, w.width),
                        O = Ar(S.height, w.height);
                      return Ut(
                        Ut({}, w),
                        {},
                        {
                          x: _(b),
                          y: E(b),
                          width: P(b),
                          height: O(b),
                        },
                      );
                    }
                    if (a === "horizontal") {
                      var k = Ar(0, w.height),
                        R = k(b);
                      return Ut(
                        Ut({}, w),
                        {},
                        {
                          y: w.y + w.height - R,
                          height: R,
                        },
                      );
                    }
                    var M = Ar(0, w.width),
                      D = M(b);
                    return Ut(
                      Ut({}, w),
                      {},
                      {
                        width: D,
                      },
                    );
                  });
                return ReactDefault.createElement(Nt, null, r.renderRectanglesStatically(y));
              },
            );
          },
        },
        {
          key: "renderRectangles",
          value: function () {
            var r = this.props,
              i = r.data,
              o = r.isAnimationActive,
              a = this.state.prevData;
            return o && i && i.length && (!a || !Tf(a, i))
              ? this.renderRectanglesWithAnimation()
              : this.renderRectanglesStatically(i);
          },
        },
        {
          key: "renderBackground",
          value: function () {
            var r = this,
              i = this.props,
              o = i.data,
              a = i.dataKey,
              s = i.activeIndex,
              u = rt(this.props.background, !1);
            return o.map(function (c, d) {
              c.value;
              var h = c.background,
                p = sve(c, ave);
              if (!h) return null;
              var v = Ut(
                Ut(
                  Ut(
                    Ut(
                      Ut({}, p),
                      {},
                      {
                        fill: "#eee",
                      },
                      h,
                    ),
                    u,
                  ),
                  nm(r.props, c, d),
                ),
                {},
                {
                  onAnimationStart: r.handleAnimationStart,
                  onAnimationEnd: r.handleAnimationEnd,
                  dataKey: a,
                  index: d,
                  className: "recharts-bar-background-rectangle",
                },
              );
              return ReactDefault.createElement(
                f3,
                Bm(
                  {
                    key: "background-bar-".concat(d),
                    option: r.props.background,
                    isActive: d === s,
                  },
                  v,
                ),
              );
            });
          },
        },
        {
          key: "renderErrorBar",
          value: function (r, i) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
            var o = this.props,
              a = o.data,
              s = o.xAxis,
              u = o.yAxis,
              c = o.layout,
              d = o.children,
              h = Jr(d, ry);
            if (!h) return null;
            var p = c === "vertical" ? a[0].height / 2 : a[0].width / 2,
              v = function (w, x) {
                var S = Array.isArray(w.value) ? w.value[1] : w.value;
                return {
                  x: w.x,
                  y: w.y,
                  value: S,
                  errorVal: hr(w, x),
                };
              },
              b = {
                clipPath: r ? "url(#clipPath-".concat(i, ")") : null,
              };
            return ReactDefault.createElement(
              Nt,
              b,
              h.map(function (y) {
                return ReactDefault.cloneElement(y, {
                  key: "error-bar-".concat(i, "-").concat(y.props.dataKey),
                  data: a,
                  xAxis: s,
                  yAxis: u,
                  layout: c,
                  offset: p,
                  dataPointFormatter: v,
                });
              }),
            );
          },
        },
        {
          key: "render",
          value: function () {
            var r = this.props,
              i = r.hide,
              o = r.data,
              a = r.className,
              s = r.xAxis,
              u = r.yAxis,
              c = r.left,
              d = r.top,
              h = r.width,
              p = r.height,
              v = r.isAnimationActive,
              b = r.background,
              y = r.id;
            if (i || !o || !o.length) return null;
            var w = this.state.isAnimationFinished,
              x = We("recharts-bar", a),
              S = s && s.allowDataOverflow,
              _ = u && u.allowDataOverflow,
              E = S || _,
              P = it(y) ? this.id : y;
            return ReactDefault.createElement(
              Nt,
              {
                className: x,
              },
              S || _
                ? ReactDefault.createElement(
                    "defs",
                    null,
                    ReactDefault.createElement(
                      "clipPath",
                      {
                        id: "clipPath-".concat(P),
                      },
                      ReactDefault.createElement("rect", {
                        x: S ? c : c - h / 2,
                        y: _ ? d : d - p / 2,
                        width: S ? h : h * 2,
                        height: _ ? p : p * 2,
                      }),
                    ),
                  )
                : null,
              ReactDefault.createElement(
                Nt,
                {
                  className: "recharts-bar-rectangles",
                  clipPath: E ? "url(#clipPath-".concat(P, ")") : null,
                },
                b ? this.renderBackground() : null,
                this.renderRectangles(),
              ),
              this.renderErrorBar(E, P),
              (!v || w) && ra.renderCallByParent(this.props, o),
            );
          },
        },
      ],
      [
        {
          key: "getDerivedStateFromProps",
          value: function (r, i) {
            return r.animationId !== i.prevAnimationId
              ? {
                  prevAnimationId: r.animationId,
                  curData: r.data,
                  prevData: i.curData,
                }
              : r.data !== i.curData
                ? {
                    curData: r.data,
                  }
                : null;
          },
        },
      ],
    )
  );
})(React.PureComponent);
Z6 = xd;
ea(xd, "displayName", "Bar");
ea(xd, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !_u.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
});
ea(xd, "getComposedData", function (e) {
  var t = e.props,
    n = e.item,
    r = e.barPosition,
    i = e.bandSize,
    o = e.xAxis,
    a = e.yAxis,
    s = e.xAxisTicks,
    u = e.yAxisTicks,
    c = e.stackedData,
    d = e.dataStartIndex,
    h = e.displayedData,
    p = e.offset,
    v = Rfe(r, n);
  if (!v) return null;
  var b = t.layout,
    y = n.type.defaultProps,
    w = y !== void 0 ? Ut(Ut({}, y), n.props) : n.props,
    x = w.dataKey,
    S = w.children,
    _ = w.minPointSize,
    E = b === "horizontal" ? a : o,
    P = c ? E.scale.domain() : null,
    O = Ffe({
      numericAxis: E,
    }),
    k = Jr(S, j8),
    R = h.map(function (M, D) {
      var I, V, z, q, U, B;
      c ? (I = Mfe(c[d + D], P)) : ((I = hr(M, x)), Array.isArray(I) || (I = [O, I]));
      var F = ove(_, Z6.defaultProps.minPointSize)(I[1], D);
      if (b === "horizontal") {
        var L,
          W = [a.scale(I[0]), a.scale(I[1])],
          G = W[0],
          $ = W[1];
        (V = XD({
          axis: o,
          ticks: s,
          bandSize: i,
          offset: v.offset,
          entry: M,
          index: D,
        })),
          (z = (L = $ ?? G) !== null && L !== void 0 ? L : void 0),
          (q = v.size);
        var K = G - $;
        if (
          ((U = Number.isNaN(K) ? 0 : K),
          (B = {
            x: V,
            y: a.y,
            width: q,
            height: a.height,
          }),
          Math.abs(F) > 0 && Math.abs(U) < Math.abs(F))
        ) {
          var ne = Xr(U || F) * (Math.abs(F) - Math.abs(U));
          (z -= ne), (U += ne);
        }
      } else {
        var he = [o.scale(I[0]), o.scale(I[1])],
          le = he[0],
          pe = he[1];
        if (
          ((V = le),
          (z = XD({
            axis: a,
            ticks: u,
            bandSize: i,
            offset: v.offset,
            entry: M,
            index: D,
          })),
          (q = pe - le),
          (U = v.size),
          (B = {
            x: o.x,
            y: z,
            width: o.width,
            height: U,
          }),
          Math.abs(F) > 0 && Math.abs(q) < Math.abs(F))
        ) {
          var Pe = Xr(q || F) * (Math.abs(F) - Math.abs(q));
          q += Pe;
        }
      }
      return Ut(
        Ut(
          Ut({}, M),
          {},
          {
            x: V,
            y: z,
            width: q,
            height: U,
            value: c ? I : I[1],
            payload: M,
            background: B,
          },
          k && k[D] && k[D].props,
        ),
        {},
        {
          tooltipPayload: [D6(n, M)],
          tooltipPosition: {
            x: V + q / 2,
            y: z + U / 2,
          },
        },
      );
    });
  return Ut(
    {
      data: R,
      layout: b,
    },
    p,
  );
});
function Gf(e) {
  "@babel/helpers - typeof";

  return (
    (Gf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Gf(e)
  );
}
function vve(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p3(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, e9(r.key), r);
  }
}
function yve(e, t, n) {
  return (
    t && p3(e.prototype, t),
    n && p3(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function m3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? m3(Object(n), !0).forEach(function (r) {
          ay(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : m3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ay(e, t, n) {
  return (
    (t = e9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function e9(e) {
  var t = gve(e, "string");
  return Gf(t) == "symbol" ? t : t + "";
}
function gve(e, t) {
  if (Gf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Gf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bve = function (t, n, r, i, o) {
    var a = t.width,
      s = t.height,
      u = t.layout,
      c = t.children,
      d = Object.keys(n),
      h = {
        left: r.left,
        leftMirror: r.left,
        right: a - r.right,
        rightMirror: a - r.right,
        top: r.top,
        topMirror: r.top,
        bottom: s - r.bottom,
        bottomMirror: s - r.bottom,
      },
      p = !!sr(c, xd);
    return d.reduce(function (v, b) {
      var y = n[b],
        w = y.orientation,
        x = y.domain,
        S = y.padding,
        _ = S === void 0 ? {} : S,
        E = y.mirror,
        P = y.reversed,
        O = "".concat(w).concat(E ? "Mirror" : ""),
        k,
        R,
        M,
        D,
        I;
      if (y.type === "number" && (y.padding === "gap" || y.padding === "no-gap")) {
        var V = x[1] - x[0],
          z = 1 / 0,
          q = y.categoricalDomain.sort(mre);
        if (
          (q.forEach(function (he, le) {
            le > 0 && (z = Math.min((he || 0) - (q[le - 1] || 0), z));
          }),
          Number.isFinite(z))
        ) {
          var U = z / V,
            B = y.layout === "vertical" ? r.height : r.width;
          if ((y.padding === "gap" && (k = (U * B) / 2), y.padding === "no-gap")) {
            var F = hs(t.barCategoryGap, U * B),
              L = (U * B) / 2;
            k = L - F - ((L - F) / B) * F;
          }
        }
      }
      i === "xAxis"
        ? (R = [r.left + (_.left || 0) + (k || 0), r.left + r.width - (_.right || 0) - (k || 0)])
        : i === "yAxis"
          ? (R =
              u === "horizontal"
                ? [r.top + r.height - (_.bottom || 0), r.top + (_.top || 0)]
                : [r.top + (_.top || 0) + (k || 0), r.top + r.height - (_.bottom || 0) - (k || 0)])
          : (R = y.range),
        P && (R = [R[1], R[0]]);
      var W = kfe(y, o, p),
        G = W.scale,
        $ = W.realScaleType;
      G.domain(x).range(R), jfe(G);
      var K = Bfe(
        G,
        Hr(
          Hr({}, y),
          {},
          {
            realScaleType: $,
          },
        ),
      );
      i === "xAxis"
        ? ((I = (w === "top" && !E) || (w === "bottom" && E)), (M = r.left), (D = h[O] - I * y.height))
        : i === "yAxis" && ((I = (w === "left" && !E) || (w === "right" && E)), (M = h[O] - I * y.width), (D = r.top));
      var ne = Hr(
        Hr(Hr({}, y), K),
        {},
        {
          realScaleType: $,
          x: M,
          y: D,
          scale: G,
          width: i === "xAxis" ? r.width : y.width,
          height: i === "yAxis" ? r.height : y.height,
        },
      );
      return (
        (ne.bandSize = Em(ne, K)),
        !y.hide && i === "xAxis" ? (h[O] += (I ? -1 : 1) * ne.height) : y.hide || (h[O] += (I ? -1 : 1) * ne.width),
        Hr(Hr({}, v), {}, ay({}, b, ne))
      );
    }, {});
  },
  t9 = function (t, n) {
    var r = t.x,
      i = t.y,
      o = n.x,
      a = n.y;
    return {
      x: Math.min(r, o),
      y: Math.min(i, a),
      width: Math.abs(o - r),
      height: Math.abs(a - i),
    };
  },
  wve = function (t) {
    var n = t.x1,
      r = t.y1,
      i = t.x2,
      o = t.y2;
    return t9(
      {
        x: n,
        y: r,
      },
      {
        x: i,
        y: o,
      },
    );
  },
  n9 = (function () {
    function e(t) {
      vve(this, e), (this.scale = t);
    }
    return yve(
      e,
      [
        {
          key: "domain",
          get: function () {
            return this.scale.domain;
          },
        },
        {
          key: "range",
          get: function () {
            return this.scale.range;
          },
        },
        {
          key: "rangeMin",
          get: function () {
            return this.range()[0];
          },
        },
        {
          key: "rangeMax",
          get: function () {
            return this.range()[1];
          },
        },
        {
          key: "bandwidth",
          get: function () {
            return this.scale.bandwidth;
          },
        },
        {
          key: "apply",
          value: function (n) {
            var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
              i = r.bandAware,
              o = r.position;
            if (n !== void 0) {
              if (o)
                switch (o) {
                  case "start":
                    return this.scale(n);
                  case "middle": {
                    var a = this.bandwidth ? this.bandwidth() / 2 : 0;
                    return this.scale(n) + a;
                  }
                  case "end": {
                    var s = this.bandwidth ? this.bandwidth() : 0;
                    return this.scale(n) + s;
                  }
                  default:
                    return this.scale(n);
                }
              if (i) {
                var u = this.bandwidth ? this.bandwidth() / 2 : 0;
                return this.scale(n) + u;
              }
              return this.scale(n);
            }
          },
        },
        {
          key: "isInRange",
          value: function (n) {
            var r = this.range(),
              i = r[0],
              o = r[r.length - 1];
            return i <= o ? n >= i && n <= o : n >= o && n <= i;
          },
        },
      ],
      [
        {
          key: "create",
          value: function (n) {
            return new e(n);
          },
        },
      ],
    );
  })();
ay(n9, "EPS", 1e-4);
var PE = function (t) {
  var n = Object.keys(t).reduce(function (r, i) {
    return Hr(Hr({}, r), {}, ay({}, i, n9.create(t[i])));
  }, {});
  return Hr(
    Hr({}, n),
    {},
    {
      apply: function (i) {
        var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          a = o.bandAware,
          s = o.position;
        return Hme(i, function (u, c) {
          return n[c].apply(u, {
            bandAware: a,
            position: s,
          });
        });
      },
      isInRange: function (i) {
        return Zme(i, function (o, a) {
          return n[a].isInRange(o);
        });
      },
    },
  );
};
function xve(e) {
  return ((e % 180) + 180) % 180;
}
var Sve = function (t) {
    var n = t.width,
      r = t.height,
      i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      o = xve(i),
      a = (o * Math.PI) / 180,
      s = Math.atan(r / n),
      u = a > s && a < Math.PI - s ? r / Math.sin(a) : n / Math.cos(a);
    return Math.abs(u);
  },
  Hx,
  v3;
function _ve() {
  if (v3) return Hx;
  v3 = 1;
  var e = ya(),
    t = vd(),
    n = Uv();
  function r(i) {
    return function (o, a, s) {
      var u = Object(o);
      if (!t(o)) {
        var c = e(a, 3);
        (o = n(o)),
          (a = function (h) {
            return c(u[h], h, u);
          });
      }
      var d = i(o, a, s);
      return d > -1 ? u[c ? o[d] : d] : void 0;
    };
  }
  return (Hx = r), Hx;
}
var Kx, y3;
function Pve() {
  if (y3) return Kx;
  y3 = 1;
  var e = K6();
  function t(n) {
    var r = e(n),
      i = r % 1;
    return r === r ? (i ? r - i : r) : 0;
  }
  return (Kx = t), Kx;
}
var Gx, g3;
function Ave() {
  if (g3) return Gx;
  g3 = 1;
  var e = y8(),
    t = ya(),
    n = Pve(),
    r = Math.max;
  function i(o, a, s) {
    var u = o == null ? 0 : o.length;
    if (!u) return -1;
    var c = s == null ? 0 : n(s);
    return c < 0 && (c = r(u + c, 0)), e(o, t(a, 3), c);
  }
  return (Gx = i), Gx;
}
var Yx, b3;
function Ove() {
  if (b3) return Yx;
  b3 = 1;
  var e = _ve(),
    t = Ave(),
    n = e(t);
  return (Yx = n), Yx;
}
Ove();
var Eve = M4();
const Tve = ht(Eve);
var Cve = Tve(
    function (e) {
      return {
        x: e.left,
        y: e.top,
        width: e.width,
        height: e.height,
      };
    },
    function (e) {
      return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
    },
  ),
  r9 = React.createContext(void 0),
  i9 = React.createContext(void 0),
  o9 = React.createContext(void 0),
  kve = React.createContext({}),
  a9 = React.createContext(void 0),
  s9 = React.createContext(0),
  l9 = React.createContext(0),
  w3 = function (t) {
    var n = t.state,
      r = n.xAxisMap,
      i = n.yAxisMap,
      o = n.offset,
      a = t.clipPathId,
      s = t.children,
      u = t.width,
      c = t.height,
      d = Cve(o);
    return ReactDefault.createElement(
      r9.Provider,
      {
        value: r,
      },
      ReactDefault.createElement(
        i9.Provider,
        {
          value: i,
        },
        ReactDefault.createElement(
          kve.Provider,
          {
            value: o,
          },
          ReactDefault.createElement(
            o9.Provider,
            {
              value: d,
            },
            ReactDefault.createElement(
              a9.Provider,
              {
                value: a,
              },
              ReactDefault.createElement(
                s9.Provider,
                {
                  value: c,
                },
                ReactDefault.createElement(
                  l9.Provider,
                  {
                    value: u,
                  },
                  s,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  },
  jve = function () {
    return React.useContext(a9);
  },
  u9 = function (t) {
    var n = React.useContext(r9);
    n == null && ms();
    var r = n[t];
    return r == null && ms(), r;
  },
  c9 = function (t) {
    var n = React.useContext(i9);
    n == null && ms();
    var r = n[t];
    return r == null && ms(), r;
  },
  Rve = function () {
    var t = React.useContext(o9);
    return t;
  },
  f9 = function () {
    return React.useContext(l9);
  },
  d9 = function () {
    return React.useContext(s9);
  };
function Xl(e) {
  "@babel/helpers - typeof";

  return (
    (Xl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Xl(e)
  );
}
function Mve(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Nve(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, p9(r.key), r);
  }
}
function Ive(e, t, n) {
  return (
    t && Nve(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Dve(e, t, n) {
  return (t = Vm(t)), $ve(e, h9() ? Reflect.construct(t, n || [], Vm(e).constructor) : t.apply(e, n));
}
function $ve(e, t) {
  if (t && (Xl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Lve(e);
}
function Lve(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function h9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (h9 = function () {
    return !!e;
  })();
}
function Vm(e) {
  return (
    (Vm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Vm(e)
  );
}
function Bve(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && cP(e, t);
}
function cP(e, t) {
  return (
    (cP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    cP(e, t)
  );
}
function x3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function S3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? x3(Object(n), !0).forEach(function (r) {
          AE(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : x3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function AE(e, t, n) {
  return (
    (t = p9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function p9(e) {
  var t = Fve(e, "string");
  return Xl(t) == "symbol" ? t : t + "";
}
function Fve(e, t) {
  if (Xl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Vve(e, t) {
  return Uve(e) || Wve(e, t) || qve(e, t) || zve();
}
function zve() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qve(e, t) {
  if (e) {
    if (typeof e == "string") return _3(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _3(e, t);
  }
}
function _3(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Wve(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function Uve(e) {
  if (Array.isArray(e)) return e;
}
function fP() {
  return (
    (fP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    fP.apply(this, arguments)
  );
}
var Hve = function (t, n) {
    var r;
    return (
      ReactDefault.isValidElement(t)
        ? (r = ReactDefault.cloneElement(t, n))
        : nt(t)
          ? (r = t(n))
          : (r = ReactDefault.createElement(
              "line",
              fP({}, n, {
                className: "recharts-reference-line-line",
              }),
            )),
      r
    );
  },
  Kve = function (t, n, r, i, o, a, s, u, c) {
    var d = o.x,
      h = o.y,
      p = o.width,
      v = o.height;
    if (r) {
      var b = c.y,
        y = t.y.apply(b, {
          position: a,
        });
      if (Si(c, "discard") && !t.y.isInRange(y)) return null;
      var w = [
        {
          x: d + p,
          y,
        },
        {
          x: d,
          y,
        },
      ];
      return u === "left" ? w.reverse() : w;
    }
    if (n) {
      var x = c.x,
        S = t.x.apply(x, {
          position: a,
        });
      if (Si(c, "discard") && !t.x.isInRange(S)) return null;
      var _ = [
        {
          x: S,
          y: h + v,
        },
        {
          x: S,
          y: h,
        },
      ];
      return s === "top" ? _.reverse() : _;
    }
    if (i) {
      var E = c.segment,
        P = E.map(function (O) {
          return t.apply(O, {
            position: a,
          });
        });
      return Si(c, "discard") &&
        zme(P, function (O) {
          return !t.isInRange(O);
        })
        ? null
        : P;
    }
    return null;
  };
function Gve(e) {
  var t = e.x,
    n = e.y,
    r = e.segment,
    i = e.xAxisId,
    o = e.yAxisId,
    a = e.shape,
    s = e.className,
    u = e.alwaysShow,
    c = jve(),
    d = u9(i),
    h = c9(o),
    p = Rve();
  if (!c || !p) return null;
  os(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var v = PE({
      x: d.scale,
      y: h.scale,
    }),
    b = Jt(t),
    y = Jt(n),
    w = r && r.length === 2,
    x = Kve(v, b, y, w, p, e.position, d.orientation, h.orientation, e);
  if (!x) return null;
  var S = Vve(x, 2),
    _ = S[0],
    E = _.x,
    P = _.y,
    O = S[1],
    k = O.x,
    R = O.y,
    M = Si(e, "hidden") ? "url(#".concat(c, ")") : void 0,
    D = S3(
      S3(
        {
          clipPath: M,
        },
        rt(e, !0),
      ),
      {},
      {
        x1: E,
        y1: P,
        x2: k,
        y2: R,
      },
    );
  return ReactDefault.createElement(
    Nt,
    {
      className: We("recharts-reference-line", s),
    },
    Hve(a, D),
    kn.renderCallByParent(
      e,
      wve({
        x1: E,
        y1: P,
        x2: k,
        y2: R,
      }),
    ),
  );
}
var sy = (function (e) {
  function t() {
    return Mve(this, t), Dve(this, t, arguments);
  }
  return (
    Bve(t, e),
    Ive(t, [
      {
        key: "render",
        value: function () {
          return ReactDefault.createElement(Gve, this.props);
        },
      },
    ])
  );
})(ReactDefault.Component);
AE(sy, "displayName", "ReferenceLine");
AE(sy, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle",
});
function dP() {
  return (
    (dP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    dP.apply(this, arguments)
  );
}
function Zl(e) {
  "@babel/helpers - typeof";

  return (
    (Zl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Zl(e)
  );
}
function P3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function A3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? P3(Object(n), !0).forEach(function (r) {
          ly(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : P3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Yve(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Xve(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, v9(r.key), r);
  }
}
function Zve(e, t, n) {
  return (
    t && Xve(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Qve(e, t, n) {
  return (t = zm(t)), Jve(e, m9() ? Reflect.construct(t, n || [], zm(e).constructor) : t.apply(e, n));
}
function Jve(e, t) {
  if (t && (Zl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return eye(e);
}
function eye(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function m9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (m9 = function () {
    return !!e;
  })();
}
function zm(e) {
  return (
    (zm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    zm(e)
  );
}
function tye(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && hP(e, t);
}
function hP(e, t) {
  return (
    (hP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    hP(e, t)
  );
}
function ly(e, t, n) {
  return (
    (t = v9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function v9(e) {
  var t = nye(e, "string");
  return Zl(t) == "symbol" ? t : t + "";
}
function nye(e, t) {
  if (Zl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var rye = function (t) {
    var n = t.x,
      r = t.y,
      i = t.xAxis,
      o = t.yAxis,
      a = PE({
        x: i.scale,
        y: o.scale,
      }),
      s = a.apply(
        {
          x: n,
          y: r,
        },
        {
          bandAware: !0,
        },
      );
    return Si(t, "discard") && !a.isInRange(s) ? null : s;
  },
  uy = (function (e) {
    function t() {
      return Yve(this, t), Qve(this, t, arguments);
    }
    return (
      tye(t, e),
      Zve(t, [
        {
          key: "render",
          value: function () {
            var r = this.props,
              i = r.x,
              o = r.y,
              a = r.r,
              s = r.alwaysShow,
              u = r.clipPathId,
              c = Jt(i),
              d = Jt(o);
            if (
              (os(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'),
              !c || !d)
            )
              return null;
            var h = rye(this.props);
            if (!h) return null;
            var p = h.x,
              v = h.y,
              b = this.props,
              y = b.shape,
              w = b.className,
              x = Si(this.props, "hidden") ? "url(#".concat(u, ")") : void 0,
              S = A3(
                A3(
                  {
                    clipPath: x,
                  },
                  rt(this.props, !0),
                ),
                {},
                {
                  cx: p,
                  cy: v,
                },
              );
            return ReactDefault.createElement(
              Nt,
              {
                className: We("recharts-reference-dot", w),
              },
              t.renderDot(y, S),
              kn.renderCallByParent(this.props, {
                x: p - a,
                y: v - a,
                width: 2 * a,
                height: 2 * a,
              }),
            );
          },
        },
      ])
    );
  })(ReactDefault.Component);
ly(uy, "displayName", "ReferenceDot");
ly(uy, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
});
ly(uy, "renderDot", function (e, t) {
  var n;
  return (
    ReactDefault.isValidElement(e)
      ? (n = ReactDefault.cloneElement(e, t))
      : nt(e)
        ? (n = e(t))
        : (n = ReactDefault.createElement(
            _E,
            dP({}, t, {
              cx: t.cx,
              cy: t.cy,
              className: "recharts-reference-dot-dot",
            }),
          )),
    n
  );
});
function pP() {
  return (
    (pP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    pP.apply(this, arguments)
  );
}
function Ql(e) {
  "@babel/helpers - typeof";

  return (
    (Ql =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ql(e)
  );
}
function O3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function E3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? O3(Object(n), !0).forEach(function (r) {
          cy(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : O3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function iye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function oye(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, g9(r.key), r);
  }
}
function aye(e, t, n) {
  return (
    t && oye(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function sye(e, t, n) {
  return (t = qm(t)), lye(e, y9() ? Reflect.construct(t, n || [], qm(e).constructor) : t.apply(e, n));
}
function lye(e, t) {
  if (t && (Ql(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return uye(e);
}
function uye(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (y9 = function () {
    return !!e;
  })();
}
function qm(e) {
  return (
    (qm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    qm(e)
  );
}
function cye(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && mP(e, t);
}
function mP(e, t) {
  return (
    (mP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    mP(e, t)
  );
}
function cy(e, t, n) {
  return (
    (t = g9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function g9(e) {
  var t = fye(e, "string");
  return Ql(t) == "symbol" ? t : t + "";
}
function fye(e, t) {
  if (Ql(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Ql(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var dye = function (t, n, r, i, o) {
    var a = o.x1,
      s = o.x2,
      u = o.y1,
      c = o.y2,
      d = o.xAxis,
      h = o.yAxis;
    if (!d || !h) return null;
    var p = PE({
        x: d.scale,
        y: h.scale,
      }),
      v = {
        x: t
          ? p.x.apply(a, {
              position: "start",
            })
          : p.x.rangeMin,
        y: r
          ? p.y.apply(u, {
              position: "start",
            })
          : p.y.rangeMin,
      },
      b = {
        x: n
          ? p.x.apply(s, {
              position: "end",
            })
          : p.x.rangeMax,
        y: i
          ? p.y.apply(c, {
              position: "end",
            })
          : p.y.rangeMax,
      };
    return Si(o, "discard") && (!p.isInRange(v) || !p.isInRange(b)) ? null : t9(v, b);
  },
  fy = (function (e) {
    function t() {
      return iye(this, t), sye(this, t, arguments);
    }
    return (
      cye(t, e),
      aye(t, [
        {
          key: "render",
          value: function () {
            var r = this.props,
              i = r.x1,
              o = r.x2,
              a = r.y1,
              s = r.y2,
              u = r.className,
              c = r.alwaysShow,
              d = r.clipPathId;
            os(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
            var h = Jt(i),
              p = Jt(o),
              v = Jt(a),
              b = Jt(s),
              y = this.props.shape;
            if (!h && !p && !v && !b && !y) return null;
            var w = dye(h, p, v, b, this.props);
            if (!w && !y) return null;
            var x = Si(this.props, "hidden") ? "url(#".concat(d, ")") : void 0;
            return ReactDefault.createElement(
              Nt,
              {
                className: We("recharts-reference-area", u),
              },
              t.renderRect(
                y,
                E3(
                  E3(
                    {
                      clipPath: x,
                    },
                    rt(this.props, !0),
                  ),
                  w,
                ),
              ),
              kn.renderCallByParent(this.props, w),
            );
          },
        },
      ])
    );
  })(ReactDefault.Component);
cy(fy, "displayName", "ReferenceArea");
cy(fy, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1,
});
cy(fy, "renderRect", function (e, t) {
  var n;
  return (
    ReactDefault.isValidElement(e)
      ? (n = ReactDefault.cloneElement(e, t))
      : nt(e)
        ? (n = e(t))
        : (n = ReactDefault.createElement(
            SE,
            pP({}, t, {
              className: "recharts-reference-area-rect",
            }),
          )),
    n
  );
});
function b9(e, t, n) {
  if (t < 1) return [];
  if (t === 1 && n === void 0) return e;
  for (var r = [], i = 0; i < e.length; i += t) r.push(e[i]);
  return r;
}
function hye(e, t, n) {
  var r = {
    width: e.width + t.width,
    height: e.height + t.height,
  };
  return Sve(r, n);
}
function pye(e, t, n) {
  var r = n === "width",
    i = e.x,
    o = e.y,
    a = e.width,
    s = e.height;
  return t === 1
    ? {
        start: r ? i : o,
        end: r ? i + a : o + s,
      }
    : {
        start: r ? i + a : o + s,
        end: r ? i : o,
      };
}
function Wm(e, t, n, r, i) {
  if (e * t < e * r || e * t > e * i) return !1;
  var o = n();
  return e * (t - (e * o) / 2 - r) >= 0 && e * (t + (e * o) / 2 - i) <= 0;
}
function mye(e, t) {
  return b9(e, t + 1);
}
function vye(e, t, n, r, i) {
  for (
    var o = (r || []).slice(),
      a = t.start,
      s = t.end,
      u = 0,
      c = 1,
      d = a,
      h = function () {
        var b = r?.[u];
        if (b === void 0)
          return {
            v: b9(r, c),
          };
        var y = u,
          w,
          x = function () {
            return w === void 0 && (w = n(b, y)), w;
          },
          S = b.coordinate,
          _ = u === 0 || Wm(e, S, x, d, s);
        _ || ((u = 0), (d = a), (c += 1)), _ && ((d = S + e * (x() / 2 + i)), (u += c));
      },
      p;
    c <= o.length;

  )
    if (((p = h()), p)) return p.v;
  return [];
}
function Yf(e) {
  "@babel/helpers - typeof";

  return (
    (Yf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Yf(e)
  );
}
function T3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function En(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? T3(Object(n), !0).forEach(function (r) {
          yye(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : T3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function yye(e, t, n) {
  return (
    (t = gye(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function gye(e) {
  var t = bye(e, "string");
  return Yf(t) == "symbol" ? t : t + "";
}
function bye(e, t) {
  if (Yf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Yf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wye(e, t, n, r, i) {
  for (
    var o = (r || []).slice(),
      a = o.length,
      s = t.start,
      u = t.end,
      c = function (p) {
        var v = o[p],
          b,
          y = function () {
            return b === void 0 && (b = n(v, p)), b;
          };
        if (p === a - 1) {
          var w = e * (v.coordinate + (e * y()) / 2 - u);
          o[p] = v = En(
            En({}, v),
            {},
            {
              tickCoord: w > 0 ? v.coordinate - w * e : v.coordinate,
            },
          );
        } else
          o[p] = v = En(
            En({}, v),
            {},
            {
              tickCoord: v.coordinate,
            },
          );
        var x = Wm(e, v.tickCoord, y, s, u);
        x &&
          ((u = v.tickCoord - e * (y() / 2 + i)),
          (o[p] = En(
            En({}, v),
            {},
            {
              isShow: !0,
            },
          )));
      },
      d = a - 1;
    d >= 0;
    d--
  )
    c(d);
  return o;
}
function xye(e, t, n, r, i, o) {
  var a = (r || []).slice(),
    s = a.length,
    u = t.start,
    c = t.end;
  if (o) {
    var d = r[s - 1],
      h = n(d, s - 1),
      p = e * (d.coordinate + (e * h) / 2 - c);
    a[s - 1] = d = En(
      En({}, d),
      {},
      {
        tickCoord: p > 0 ? d.coordinate - p * e : d.coordinate,
      },
    );
    var v = Wm(
      e,
      d.tickCoord,
      function () {
        return h;
      },
      u,
      c,
    );
    v &&
      ((c = d.tickCoord - e * (h / 2 + i)),
      (a[s - 1] = En(
        En({}, d),
        {},
        {
          isShow: !0,
        },
      )));
  }
  for (
    var b = o ? s - 1 : s,
      y = function (S) {
        var _ = a[S],
          E,
          P = function () {
            return E === void 0 && (E = n(_, S)), E;
          };
        if (S === 0) {
          var O = e * (_.coordinate - (e * P()) / 2 - u);
          a[S] = _ = En(
            En({}, _),
            {},
            {
              tickCoord: O < 0 ? _.coordinate - O * e : _.coordinate,
            },
          );
        } else
          a[S] = _ = En(
            En({}, _),
            {},
            {
              tickCoord: _.coordinate,
            },
          );
        var k = Wm(e, _.tickCoord, P, u, c);
        k &&
          ((u = _.tickCoord + e * (P() / 2 + i)),
          (a[S] = En(
            En({}, _),
            {},
            {
              isShow: !0,
            },
          )));
      },
      w = 0;
    w < b;
    w++
  )
    y(w);
  return a;
}
function Sye(e, t, n) {
  var r = e.tick,
    i = e.ticks,
    o = e.viewBox,
    a = e.minTickGap,
    s = e.orientation,
    u = e.interval,
    c = e.tickFormatter,
    d = e.unit,
    h = e.angle;
  if (!i || !i.length || !r) return [];
  if (be(u) || _u.isSsr) return mye(i, typeof u == "number" && be(u) ? u : 0);
  var p = [],
    v = s === "top" || s === "bottom" ? "width" : "height",
    b =
      d && v === "width"
        ? Uc(d, {
            fontSize: t,
            letterSpacing: n,
          })
        : {
            width: 0,
            height: 0,
          },
    y = function (_, E) {
      var P = nt(c) ? c(_.value, E) : _.value;
      return v === "width"
        ? hye(
            Uc(P, {
              fontSize: t,
              letterSpacing: n,
            }),
            b,
            h,
          )
        : Uc(P, {
            fontSize: t,
            letterSpacing: n,
          })[v];
    },
    w = i.length >= 2 ? Xr(i[1].coordinate - i[0].coordinate) : 1,
    x = pye(o, w, v);
  return u === "equidistantPreserveStart"
    ? vye(w, x, y, i, a)
    : (u === "preserveStart" || u === "preserveStartEnd"
        ? (p = xye(w, x, y, i, a, u === "preserveStartEnd"))
        : (p = wye(w, x, y, i, a)),
      p.filter(function (S) {
        return S.isShow;
      }));
}
var _ye = ["viewBox"],
  Pye = ["viewBox"],
  Aye = ["ticks"];
function Jl(e) {
  "@babel/helpers - typeof";

  return (
    (Jl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Jl(e)
  );
}
function ml() {
  return (
    (ml = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ml.apply(this, arguments)
  );
}
function C3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? C3(Object(n), !0).forEach(function (r) {
          OE(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : C3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Xx(e, t) {
  if (e == null) return {};
  var n = Oye(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Oye(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Eye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function k3(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, x9(r.key), r);
  }
}
function Tye(e, t, n) {
  return (
    t && k3(e.prototype, t),
    n && k3(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Cye(e, t, n) {
  return (t = Um(t)), kye(e, w9() ? Reflect.construct(t, n || [], Um(e).constructor) : t.apply(e, n));
}
function kye(e, t) {
  if (t && (Jl(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return jye(e);
}
function jye(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function w9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (w9 = function () {
    return !!e;
  })();
}
function Um(e) {
  return (
    (Um = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Um(e)
  );
}
function Rye(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && vP(e, t);
}
function vP(e, t) {
  return (
    (vP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    vP(e, t)
  );
}
function OE(e, t, n) {
  return (
    (t = x9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function x9(e) {
  var t = Mye(e, "string");
  return Jl(t) == "symbol" ? t : t + "";
}
function Mye(e, t) {
  if (Jl(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Jl(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var dy = (function (e) {
  function t(n) {
    var r;
    return (
      Eye(this, t),
      (r = Cye(this, t, [n])),
      (r.state = {
        fontSize: "",
        letterSpacing: "",
      }),
      r
    );
  }
  return (
    Rye(t, e),
    Tye(
      t,
      [
        {
          key: "shouldComponentUpdate",
          value: function (r, i) {
            var o = r.viewBox,
              a = Xx(r, _ye),
              s = this.props,
              u = s.viewBox,
              c = Xx(s, Pye);
            return !Al(o, u) || !Al(a, c) || !Al(i, this.state);
          },
        },
        {
          key: "componentDidMount",
          value: function () {
            var r = this.layerReference;
            if (r) {
              var i = r.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
              i &&
                this.setState({
                  fontSize: window.getComputedStyle(i).fontSize,
                  letterSpacing: window.getComputedStyle(i).letterSpacing,
                });
            }
          },
        },
        {
          key: "getTickLineCoord",
          value: function (r) {
            var i = this.props,
              o = i.x,
              a = i.y,
              s = i.width,
              u = i.height,
              c = i.orientation,
              d = i.tickSize,
              h = i.mirror,
              p = i.tickMargin,
              v,
              b,
              y,
              w,
              x,
              S,
              _ = h ? -1 : 1,
              E = r.tickSize || d,
              P = be(r.tickCoord) ? r.tickCoord : r.coordinate;
            switch (c) {
              case "top":
                (v = b = r.coordinate), (w = a + +!h * u), (y = w - _ * E), (S = y - _ * p), (x = P);
                break;
              case "left":
                (y = w = r.coordinate), (b = o + +!h * s), (v = b - _ * E), (x = v - _ * p), (S = P);
                break;
              case "right":
                (y = w = r.coordinate), (b = o + +h * s), (v = b + _ * E), (x = v + _ * p), (S = P);
                break;
              default:
                (v = b = r.coordinate), (w = a + +h * u), (y = w + _ * E), (S = y + _ * p), (x = P);
                break;
            }
            return {
              line: {
                x1: v,
                y1: y,
                x2: b,
                y2: w,
              },
              tick: {
                x,
                y: S,
              },
            };
          },
        },
        {
          key: "getTickTextAnchor",
          value: function () {
            var r = this.props,
              i = r.orientation,
              o = r.mirror,
              a;
            switch (i) {
              case "left":
                a = o ? "start" : "end";
                break;
              case "right":
                a = o ? "end" : "start";
                break;
              default:
                a = "middle";
                break;
            }
            return a;
          },
        },
        {
          key: "getTickVerticalAnchor",
          value: function () {
            var r = this.props,
              i = r.orientation,
              o = r.mirror,
              a = "end";
            switch (i) {
              case "left":
              case "right":
                a = "middle";
                break;
              case "top":
                a = o ? "start" : "end";
                break;
              default:
                a = o ? "end" : "start";
                break;
            }
            return a;
          },
        },
        {
          key: "renderAxisLine",
          value: function () {
            var r = this.props,
              i = r.x,
              o = r.y,
              a = r.width,
              s = r.height,
              u = r.orientation,
              c = r.mirror,
              d = r.axisLine,
              h = Xt(
                Xt(Xt({}, rt(this.props, !1)), rt(d, !1)),
                {},
                {
                  fill: "none",
                },
              );
            if (u === "top" || u === "bottom") {
              var p = +((u === "top" && !c) || (u === "bottom" && c));
              h = Xt(
                Xt({}, h),
                {},
                {
                  x1: i,
                  y1: o + p * s,
                  x2: i + a,
                  y2: o + p * s,
                },
              );
            } else {
              var v = +((u === "left" && !c) || (u === "right" && c));
              h = Xt(
                Xt({}, h),
                {},
                {
                  x1: i + v * a,
                  y1: o,
                  x2: i + v * a,
                  y2: o + s,
                },
              );
            }
            return ReactDefault.createElement(
              "line",
              ml({}, h, {
                className: We("recharts-cartesian-axis-line", Er(d, "className")),
              }),
            );
          },
        },
        {
          key: "renderTicks",
          value: function (r, i, o) {
            var a = this,
              s = this.props,
              u = s.tickLine,
              c = s.stroke,
              d = s.tick,
              h = s.tickFormatter,
              p = s.unit,
              v = Sye(
                Xt(
                  Xt({}, this.props),
                  {},
                  {
                    ticks: r,
                  },
                ),
                i,
                o,
              ),
              b = this.getTickTextAnchor(),
              y = this.getTickVerticalAnchor(),
              w = rt(this.props, !1),
              x = rt(d, !1),
              S = Xt(
                Xt({}, w),
                {},
                {
                  fill: "none",
                },
                rt(u, !1),
              ),
              _ = v.map(function (E, P) {
                var O = a.getTickLineCoord(E),
                  k = O.line,
                  R = O.tick,
                  M = Xt(
                    Xt(
                      Xt(
                        Xt(
                          {
                            textAnchor: b,
                            verticalAnchor: y,
                          },
                          w,
                        ),
                        {},
                        {
                          stroke: "none",
                          fill: c,
                        },
                        x,
                      ),
                      R,
                    ),
                    {},
                    {
                      index: P,
                      payload: E,
                      visibleTicksCount: v.length,
                      tickFormatter: h,
                    },
                  );
                return ReactDefault.createElement(
                  Nt,
                  ml(
                    {
                      className: "recharts-cartesian-axis-tick",
                      key: "tick-".concat(E.value, "-").concat(E.coordinate, "-").concat(E.tickCoord),
                    },
                    nm(a.props, E, P),
                  ),
                  u &&
                    ReactDefault.createElement(
                      "line",
                      ml({}, S, k, {
                        className: We("recharts-cartesian-axis-tick-line", Er(u, "className")),
                      }),
                    ),
                  d && t.renderTickItem(d, M, "".concat(nt(h) ? h(E.value, P) : E.value).concat(p || "")),
                );
              });
            return ReactDefault.createElement(
              "g",
              {
                className: "recharts-cartesian-axis-ticks",
              },
              _,
            );
          },
        },
        {
          key: "render",
          value: function () {
            var r = this,
              i = this.props,
              o = i.axisLine,
              a = i.width,
              s = i.height,
              u = i.ticksGenerator,
              c = i.className,
              d = i.hide;
            if (d) return null;
            var h = this.props,
              p = h.ticks,
              v = Xx(h, Aye),
              b = p;
            return (
              nt(u) && (b = p && p.length > 0 ? u(this.props) : u(v)),
              a <= 0 || s <= 0 || !b || !b.length
                ? null
                : ReactDefault.createElement(
                    Nt,
                    {
                      className: We("recharts-cartesian-axis", c),
                      ref: function (w) {
                        r.layerReference = w;
                      },
                    },
                    o && this.renderAxisLine(),
                    this.renderTicks(b, this.state.fontSize, this.state.letterSpacing),
                    kn.renderCallByParent(this.props),
                  )
            );
          },
        },
      ],
      [
        {
          key: "renderTickItem",
          value: function (r, i, o) {
            var a,
              s = We(i.className, "recharts-cartesian-axis-tick-value");
            return (
              ReactDefault.isValidElement(r)
                ? (a = ReactDefault.cloneElement(
                    r,
                    Xt(
                      Xt({}, i),
                      {},
                      {
                        className: s,
                      },
                    ),
                  ))
                : nt(r)
                  ? (a = r(
                      Xt(
                        Xt({}, i),
                        {},
                        {
                          className: s,
                        },
                      ),
                    ))
                  : (a = ReactDefault.createElement(
                      hm,
                      ml({}, i, {
                        className: "recharts-cartesian-axis-tick-value",
                      }),
                      o,
                    )),
              a
            );
          },
        },
      ],
    )
  );
})(React.Component);
OE(dy, "displayName", "CartesianAxis");
OE(dy, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  orientation: "bottom",
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
});
var Nye = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"],
  Iye = ["key"],
  S9;
function eu(e) {
  "@babel/helpers - typeof";

  return (
    (eu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    eu(e)
  );
}
function _9(e, t) {
  if (e == null) return {};
  var n = Dye(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Dye(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Ja() {
  return (
    (Ja = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ja.apply(this, arguments)
  );
}
function j3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? j3(Object(n), !0).forEach(function (r) {
          mi(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : j3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function $ye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function R3(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, A9(r.key), r);
  }
}
function Lye(e, t, n) {
  return (
    t && R3(e.prototype, t),
    n && R3(e, n),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Bye(e, t, n) {
  return (t = Hm(t)), Fye(e, P9() ? Reflect.construct(t, n || [], Hm(e).constructor) : t.apply(e, n));
}
function Fye(e, t) {
  if (t && (eu(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Vye(e);
}
function Vye(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function P9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (P9 = function () {
    return !!e;
  })();
}
function Hm(e) {
  return (
    (Hm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Hm(e)
  );
}
function zye(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && yP(e, t);
}
function yP(e, t) {
  return (
    (yP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    yP(e, t)
  );
}
function mi(e, t, n) {
  return (
    (t = A9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function A9(e) {
  var t = qye(e, "string");
  return eu(t) == "symbol" ? t : t + "";
}
function qye(e, t) {
  if (eu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (eu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var _i = (function (e) {
  function t() {
    var n;
    $ye(this, t);
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
    return (
      (n = Bye(this, t, [].concat(i))),
      mi(n, "state", {
        isAnimationFinished: !0,
      }),
      mi(n, "id", md("recharts-area-")),
      mi(n, "handleAnimationEnd", function () {
        var a = n.props.onAnimationEnd;
        n.setState({
          isAnimationFinished: !0,
        }),
          nt(a) && a();
      }),
      mi(n, "handleAnimationStart", function () {
        var a = n.props.onAnimationStart;
        n.setState({
          isAnimationFinished: !1,
        }),
          nt(a) && a();
      }),
      n
    );
  }
  return (
    zye(t, e),
    Lye(
      t,
      [
        {
          key: "renderDots",
          value: function (r, i, o) {
            var a = this.props.isAnimationActive,
              s = this.state.isAnimationFinished;
            if (a && !s) return null;
            var u = this.props,
              c = u.dot,
              d = u.points,
              h = u.dataKey,
              p = rt(this.props, !1),
              v = rt(c, !0),
              b = d.map(function (w, x) {
                var S = Uo(
                  Uo(
                    Uo(
                      {
                        key: "dot-".concat(x),
                        r: 3,
                      },
                      p,
                    ),
                    v,
                  ),
                  {},
                  {
                    index: x,
                    cx: w.x,
                    cy: w.y,
                    dataKey: h,
                    value: w.value,
                    payload: w.payload,
                    points: d,
                  },
                );
                return t.renderDotItem(c, S);
              }),
              y = {
                clipPath: r ? "url(#clipPath-".concat(i ? "" : "dots-").concat(o, ")") : null,
              };
            return ReactDefault.createElement(
              Nt,
              Ja(
                {
                  className: "recharts-area-dots",
                },
                y,
              ),
              b,
            );
          },
        },
        {
          key: "renderHorizontalRect",
          value: function (r) {
            var i = this.props,
              o = i.baseLine,
              a = i.points,
              s = i.strokeWidth,
              u = a[0].x,
              c = a[a.length - 1].x,
              d = r * Math.abs(u - c),
              h = Jo(
                a.map(function (p) {
                  return p.y || 0;
                }),
              );
            return (
              be(o) && typeof o == "number"
                ? (h = Math.max(o, h))
                : o &&
                  Array.isArray(o) &&
                  o.length &&
                  (h = Math.max(
                    Jo(
                      o.map(function (p) {
                        return p.y || 0;
                      }),
                    ),
                    h,
                  )),
              be(h)
                ? ReactDefault.createElement("rect", {
                    x: u < c ? u : u - d,
                    y: 0,
                    width: d,
                    height: Math.floor(h + (s ? parseInt("".concat(s), 10) : 1)),
                  })
                : null
            );
          },
        },
        {
          key: "renderVerticalRect",
          value: function (r) {
            var i = this.props,
              o = i.baseLine,
              a = i.points,
              s = i.strokeWidth,
              u = a[0].y,
              c = a[a.length - 1].y,
              d = r * Math.abs(u - c),
              h = Jo(
                a.map(function (p) {
                  return p.x || 0;
                }),
              );
            return (
              be(o) && typeof o == "number"
                ? (h = Math.max(o, h))
                : o &&
                  Array.isArray(o) &&
                  o.length &&
                  (h = Math.max(
                    Jo(
                      o.map(function (p) {
                        return p.x || 0;
                      }),
                    ),
                    h,
                  )),
              be(h)
                ? ReactDefault.createElement("rect", {
                    x: 0,
                    y: u < c ? u : u - d,
                    width: h + (s ? parseInt("".concat(s), 10) : 1),
                    height: Math.floor(d),
                  })
                : null
            );
          },
        },
        {
          key: "renderClipRect",
          value: function (r) {
            var i = this.props.layout;
            return i === "vertical" ? this.renderVerticalRect(r) : this.renderHorizontalRect(r);
          },
        },
        {
          key: "renderAreaStatically",
          value: function (r, i, o, a) {
            var s = this.props,
              u = s.layout,
              c = s.type,
              d = s.stroke,
              h = s.connectNulls,
              p = s.isRange;
            s.ref;
            var v = _9(s, Nye);
            return ReactDefault.createElement(
              Nt,
              {
                clipPath: o ? "url(#clipPath-".concat(a, ")") : null,
              },
              ReactDefault.createElement(
                Gc,
                Ja({}, rt(v, !0), {
                  points: r,
                  connectNulls: h,
                  type: c,
                  baseLine: i,
                  layout: u,
                  stroke: "none",
                  className: "recharts-area-area",
                }),
              ),
              d !== "none" &&
                ReactDefault.createElement(
                  Gc,
                  Ja({}, rt(this.props, !1), {
                    className: "recharts-area-curve",
                    layout: u,
                    type: c,
                    connectNulls: h,
                    fill: "none",
                    points: r,
                  }),
                ),
              d !== "none" &&
                p &&
                ReactDefault.createElement(
                  Gc,
                  Ja({}, rt(this.props, !1), {
                    className: "recharts-area-curve",
                    layout: u,
                    type: c,
                    connectNulls: h,
                    fill: "none",
                    points: i,
                  }),
                ),
            );
          },
        },
        {
          key: "renderAreaWithAnimation",
          value: function (r, i) {
            var o = this,
              a = this.props,
              s = a.points,
              u = a.baseLine,
              c = a.isAnimationActive,
              d = a.animationBegin,
              h = a.animationDuration,
              p = a.animationEasing,
              v = a.animationId,
              b = this.state,
              y = b.prevPoints,
              w = b.prevBaseLine;
            return ReactDefault.createElement(
              ho,
              {
                begin: d,
                duration: h,
                isActive: c,
                easing: p,
                from: {
                  t: 0,
                },
                to: {
                  t: 1,
                },
                key: "area-".concat(v),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (x) {
                var S = x.t;
                if (y) {
                  var _ = y.length / s.length,
                    E = s.map(function (R, M) {
                      var D = Math.floor(M * _);
                      if (y[D]) {
                        var I = y[D],
                          V = Ar(I.x, R.x),
                          z = Ar(I.y, R.y);
                        return Uo(
                          Uo({}, R),
                          {},
                          {
                            x: V(S),
                            y: z(S),
                          },
                        );
                      }
                      return R;
                    }),
                    P;
                  if (be(u) && typeof u == "number") {
                    var O = Ar(w, u);
                    P = O(S);
                  } else if (it(u) || xu(u)) {
                    var k = Ar(w, 0);
                    P = k(S);
                  } else
                    P = u.map(function (R, M) {
                      var D = Math.floor(M * _);
                      if (w[D]) {
                        var I = w[D],
                          V = Ar(I.x, R.x),
                          z = Ar(I.y, R.y);
                        return Uo(
                          Uo({}, R),
                          {},
                          {
                            x: V(S),
                            y: z(S),
                          },
                        );
                      }
                      return R;
                    });
                  return o.renderAreaStatically(E, P, r, i);
                }
                return ReactDefault.createElement(
                  Nt,
                  null,
                  ReactDefault.createElement(
                    "defs",
                    null,
                    ReactDefault.createElement(
                      "clipPath",
                      {
                        id: "animationClipPath-".concat(i),
                      },
                      o.renderClipRect(S),
                    ),
                  ),
                  ReactDefault.createElement(
                    Nt,
                    {
                      clipPath: "url(#animationClipPath-".concat(i, ")"),
                    },
                    o.renderAreaStatically(s, u, r, i),
                  ),
                );
              },
            );
          },
        },
        {
          key: "renderArea",
          value: function (r, i) {
            var o = this.props,
              a = o.points,
              s = o.baseLine,
              u = o.isAnimationActive,
              c = this.state,
              d = c.prevPoints,
              h = c.prevBaseLine,
              p = c.totalLength;
            return u && a && a.length && ((!d && p > 0) || !Tf(d, a) || !Tf(h, s))
              ? this.renderAreaWithAnimation(r, i)
              : this.renderAreaStatically(a, s, r, i);
          },
        },
        {
          key: "render",
          value: function () {
            var r,
              i = this.props,
              o = i.hide,
              a = i.dot,
              s = i.points,
              u = i.className,
              c = i.top,
              d = i.left,
              h = i.xAxis,
              p = i.yAxis,
              v = i.width,
              b = i.height,
              y = i.isAnimationActive,
              w = i.id;
            if (o || !s || !s.length) return null;
            var x = this.state.isAnimationFinished,
              S = s.length === 1,
              _ = We("recharts-area", u),
              E = h && h.allowDataOverflow,
              P = p && p.allowDataOverflow,
              O = E || P,
              k = it(w) ? this.id : w,
              R =
                (r = rt(a, !1)) !== null && r !== void 0
                  ? r
                  : {
                      r: 3,
                      strokeWidth: 2,
                    },
              M = R.r,
              D = M === void 0 ? 3 : M,
              I = R.strokeWidth,
              V = I === void 0 ? 2 : I,
              z = Pre(a) ? a : {},
              q = z.clipDot,
              U = q === void 0 ? !0 : q,
              B = D * 2 + V;
            return ReactDefault.createElement(
              Nt,
              {
                className: _,
              },
              E || P
                ? ReactDefault.createElement(
                    "defs",
                    null,
                    ReactDefault.createElement(
                      "clipPath",
                      {
                        id: "clipPath-".concat(k),
                      },
                      ReactDefault.createElement("rect", {
                        x: E ? d : d - v / 2,
                        y: P ? c : c - b / 2,
                        width: E ? v : v * 2,
                        height: P ? b : b * 2,
                      }),
                    ),
                    !U &&
                      ReactDefault.createElement(
                        "clipPath",
                        {
                          id: "clipPath-dots-".concat(k),
                        },
                        ReactDefault.createElement("rect", {
                          x: d - B / 2,
                          y: c - B / 2,
                          width: v + B,
                          height: b + B,
                        }),
                      ),
                  )
                : null,
              S ? null : this.renderArea(O, k),
              (a || S) && this.renderDots(O, U, k),
              (!y || x) && ra.renderCallByParent(this.props, s),
            );
          },
        },
      ],
      [
        {
          key: "getDerivedStateFromProps",
          value: function (r, i) {
            return r.animationId !== i.prevAnimationId
              ? {
                  prevAnimationId: r.animationId,
                  curPoints: r.points,
                  curBaseLine: r.baseLine,
                  prevPoints: i.curPoints,
                  prevBaseLine: i.curBaseLine,
                }
              : r.points !== i.curPoints || r.baseLine !== i.curBaseLine
                ? {
                    curPoints: r.points,
                    curBaseLine: r.baseLine,
                  }
                : null;
          },
        },
      ],
    )
  );
})(React.PureComponent);
S9 = _i;
mi(_i, "displayName", "Area");
mi(_i, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !_u.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
});
mi(_i, "getBaseValue", function (e, t, n, r) {
  var i = e.layout,
    o = e.baseValue,
    a = t.props.baseValue,
    s = a ?? o;
  if (be(s) && typeof s == "number") return s;
  var u = i === "horizontal" ? r : n,
    c = u.scale.domain();
  if (u.type === "number") {
    var d = Math.max(c[0], c[1]),
      h = Math.min(c[0], c[1]);
    return s === "dataMin" ? h : s === "dataMax" || d < 0 ? d : Math.max(Math.min(c[0], c[1]), 0);
  }
  return s === "dataMin" ? c[0] : s === "dataMax" ? c[1] : c[0];
});
mi(_i, "getComposedData", function (e) {
  var t = e.props,
    n = e.item,
    r = e.xAxis,
    i = e.yAxis,
    o = e.xAxisTicks,
    a = e.yAxisTicks,
    s = e.bandSize,
    u = e.dataKey,
    c = e.stackedData,
    d = e.dataStartIndex,
    h = e.displayedData,
    p = e.offset,
    v = t.layout,
    b = c && c.length,
    y = S9.getBaseValue(t, n, r, i),
    w = v === "horizontal",
    x = !1,
    S = h.map(function (E, P) {
      var O;
      b ? (O = c[d + P]) : ((O = hr(E, u)), Array.isArray(O) ? (x = !0) : (O = [y, O]));
      var k = O[1] == null || (b && hr(E, u) == null);
      return w
        ? {
            x: YD({
              axis: r,
              ticks: o,
              bandSize: s,
              entry: E,
              index: P,
            }),
            y: k ? null : i.scale(O[1]),
            value: O,
            payload: E,
          }
        : {
            x: k ? null : r.scale(O[1]),
            y: YD({
              axis: i,
              ticks: a,
              bandSize: s,
              entry: E,
              index: P,
            }),
            value: O,
            payload: E,
          };
    }),
    _;
  return (
    b || x
      ? (_ = S.map(function (E) {
          var P = Array.isArray(E.value) ? E.value[0] : null;
          return w
            ? {
                x: E.x,
                y: P != null && E.y != null ? i.scale(P) : null,
              }
            : {
                x: P != null ? r.scale(P) : null,
                y: E.y,
              };
        }))
      : (_ = w ? i.scale(y) : r.scale(y)),
    Uo(
      {
        points: S,
        baseLine: _,
        layout: v,
        isRange: x,
      },
      p,
    )
  );
});
mi(_i, "renderDotItem", function (e, t) {
  var n;
  if (ReactDefault.isValidElement(e)) n = ReactDefault.cloneElement(e, t);
  else if (nt(e)) n = e(t);
  else {
    var r = We("recharts-area-dot", typeof e != "boolean" ? e.className : ""),
      i = t.key,
      o = _9(t, Iye);
    n = ReactDefault.createElement(
      _E,
      Ja({}, o, {
        key: i,
        className: r,
      }),
    );
  }
  return n;
});
function tu(e) {
  "@babel/helpers - typeof";

  return (
    (tu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    tu(e)
  );
}
function Wye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Uye(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, T9(r.key), r);
  }
}
function Hye(e, t, n) {
  return (
    t && Uye(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Kye(e, t, n) {
  return (t = Km(t)), Gye(e, O9() ? Reflect.construct(t, n || [], Km(e).constructor) : t.apply(e, n));
}
function Gye(e, t) {
  if (t && (tu(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Yye(e);
}
function Yye(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function O9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (O9 = function () {
    return !!e;
  })();
}
function Km(e) {
  return (
    (Km = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Km(e)
  );
}
function Xye(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && gP(e, t);
}
function gP(e, t) {
  return (
    (gP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    gP(e, t)
  );
}
function E9(e, t, n) {
  return (
    (t = T9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function T9(e) {
  var t = Zye(e, "string");
  return tu(t) == "symbol" ? t : t + "";
}
function Zye(e, t) {
  if (tu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (tu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function bP() {
  return (
    (bP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    bP.apply(this, arguments)
  );
}
function Qye(e) {
  var t = e.xAxisId,
    n = f9(),
    r = d9(),
    i = u9(t);
  return i == null
    ? null
    : React.createElement(
        dy,
        bP({}, i, {
          className: We("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
          viewBox: {
            x: 0,
            y: 0,
            width: n,
            height: r,
          },
          ticksGenerator: function (a) {
            return Qa(a, !0);
          },
        }),
      );
}
var hy = (function (e) {
  function t() {
    return Wye(this, t), Kye(this, t, arguments);
  }
  return (
    Xye(t, e),
    Hye(t, [
      {
        key: "render",
        value: function () {
          return React.createElement(Qye, this.props);
        },
      },
    ])
  );
})(React.Component);
E9(hy, "displayName", "XAxis");
E9(hy, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0,
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0,
});
function nu(e) {
  "@babel/helpers - typeof";

  return (
    (nu =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    nu(e)
  );
}
function Jye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ege(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, j9(r.key), r);
  }
}
function tge(e, t, n) {
  return (
    t && ege(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function nge(e, t, n) {
  return (t = Gm(t)), rge(e, C9() ? Reflect.construct(t, n || [], Gm(e).constructor) : t.apply(e, n));
}
function rge(e, t) {
  if (t && (nu(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ige(e);
}
function ige(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function C9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (C9 = function () {
    return !!e;
  })();
}
function Gm(e) {
  return (
    (Gm = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Gm(e)
  );
}
function oge(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && wP(e, t);
}
function wP(e, t) {
  return (
    (wP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    wP(e, t)
  );
}
function k9(e, t, n) {
  return (
    (t = j9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function j9(e) {
  var t = age(e, "string");
  return nu(t) == "symbol" ? t : t + "";
}
function age(e, t) {
  if (nu(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (nu(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function xP() {
  return (
    (xP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    xP.apply(this, arguments)
  );
}
var sge = function (t) {
    var n = t.yAxisId,
      r = f9(),
      i = d9(),
      o = c9(n);
    return o == null
      ? null
      : React.createElement(
          dy,
          xP({}, o, {
            className: We("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
            viewBox: {
              x: 0,
              y: 0,
              width: r,
              height: i,
            },
            ticksGenerator: function (s) {
              return Qa(s, !0);
            },
          }),
        );
  },
  py = (function (e) {
    function t() {
      return Jye(this, t), nge(this, t, arguments);
    }
    return (
      oge(t, e),
      tge(t, [
        {
          key: "render",
          value: function () {
            return React.createElement(sge, this.props);
          },
        },
      ])
    );
  })(React.Component);
k9(py, "displayName", "YAxis");
k9(py, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0,
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
});
function M3(e) {
  return fge(e) || cge(e) || uge(e) || lge();
}
function lge() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function uge(e, t) {
  if (e) {
    if (typeof e == "string") return SP(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SP(e, t);
  }
}
function cge(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function fge(e) {
  if (Array.isArray(e)) return SP(e);
}
function SP(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var _P = function (t, n, r, i, o) {
    var a = Jr(t, sy),
      s = Jr(t, uy),
      u = [].concat(M3(a), M3(s)),
      c = Jr(t, fy),
      d = "".concat(i, "Id"),
      h = i[0],
      p = n;
    if (
      (u.length &&
        (p = u.reduce(function (y, w) {
          if (w.props[d] === r && Si(w.props, "extendDomain") && be(w.props[h])) {
            var x = w.props[h];
            return [Math.min(y[0], x), Math.max(y[1], x)];
          }
          return y;
        }, p)),
      c.length)
    ) {
      var v = "".concat(h, "1"),
        b = "".concat(h, "2");
      p = c.reduce(function (y, w) {
        if (w.props[d] === r && Si(w.props, "extendDomain") && be(w.props[v]) && be(w.props[b])) {
          var x = w.props[v],
            S = w.props[b];
          return [Math.min(y[0], x, S), Math.max(y[1], x, S)];
        }
        return y;
      }, p);
    }
    return (
      o &&
        o.length &&
        (p = o.reduce(function (y, w) {
          return be(w) ? [Math.min(y[0], w), Math.max(y[1], w)] : y;
        }, p)),
      p
    );
  },
  Zx = {
    exports: {},
  },
  N3;
function dge() {
  return (
    N3 ||
      ((N3 = 1),
      (function (e) {
        var t = Object.prototype.hasOwnProperty,
          n = "~";
        function r() {}
        Object.create && ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1));
        function i(u, c, d) {
          (this.fn = u), (this.context = c), (this.once = d || !1);
        }
        function o(u, c, d, h, p) {
          if (typeof d != "function") throw new TypeError("The listener must be a function");
          var v = new i(d, h || u, p),
            b = n ? n + c : c;
          return (
            u._events[b]
              ? u._events[b].fn
                ? (u._events[b] = [u._events[b], v])
                : u._events[b].push(v)
              : ((u._events[b] = v), u._eventsCount++),
            u
          );
        }
        function a(u, c) {
          --u._eventsCount === 0 ? (u._events = new r()) : delete u._events[c];
        }
        function s() {
          (this._events = new r()), (this._eventsCount = 0);
        }
        (s.prototype.eventNames = function () {
          var c = [],
            d,
            h;
          if (this._eventsCount === 0) return c;
          for (h in (d = this._events)) t.call(d, h) && c.push(n ? h.slice(1) : h);
          return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
        }),
          (s.prototype.listeners = function (c) {
            var d = n ? n + c : c,
              h = this._events[d];
            if (!h) return [];
            if (h.fn) return [h.fn];
            for (var p = 0, v = h.length, b = new Array(v); p < v; p++) b[p] = h[p].fn;
            return b;
          }),
          (s.prototype.listenerCount = function (c) {
            var d = n ? n + c : c,
              h = this._events[d];
            return h ? (h.fn ? 1 : h.length) : 0;
          }),
          (s.prototype.emit = function (c, d, h, p, v, b) {
            var y = n ? n + c : c;
            if (!this._events[y]) return !1;
            var w = this._events[y],
              x = arguments.length,
              S,
              _;
            if (w.fn) {
              switch ((w.once && this.removeListener(c, w.fn, void 0, !0), x)) {
                case 1:
                  return w.fn.call(w.context), !0;
                case 2:
                  return w.fn.call(w.context, d), !0;
                case 3:
                  return w.fn.call(w.context, d, h), !0;
                case 4:
                  return w.fn.call(w.context, d, h, p), !0;
                case 5:
                  return w.fn.call(w.context, d, h, p, v), !0;
                case 6:
                  return w.fn.call(w.context, d, h, p, v, b), !0;
              }
              for (_ = 1, S = new Array(x - 1); _ < x; _++) S[_ - 1] = arguments[_];
              w.fn.apply(w.context, S);
            } else {
              var E = w.length,
                P;
              for (_ = 0; _ < E; _++)
                switch ((w[_].once && this.removeListener(c, w[_].fn, void 0, !0), x)) {
                  case 1:
                    w[_].fn.call(w[_].context);
                    break;
                  case 2:
                    w[_].fn.call(w[_].context, d);
                    break;
                  case 3:
                    w[_].fn.call(w[_].context, d, h);
                    break;
                  case 4:
                    w[_].fn.call(w[_].context, d, h, p);
                    break;
                  default:
                    if (!S) for (P = 1, S = new Array(x - 1); P < x; P++) S[P - 1] = arguments[P];
                    w[_].fn.apply(w[_].context, S);
                }
            }
            return !0;
          }),
          (s.prototype.on = function (c, d, h) {
            return o(this, c, d, h, !1);
          }),
          (s.prototype.once = function (c, d, h) {
            return o(this, c, d, h, !0);
          }),
          (s.prototype.removeListener = function (c, d, h, p) {
            var v = n ? n + c : c;
            if (!this._events[v]) return this;
            if (!d) return a(this, v), this;
            var b = this._events[v];
            if (b.fn) b.fn === d && (!p || b.once) && (!h || b.context === h) && a(this, v);
            else {
              for (var y = 0, w = [], x = b.length; y < x; y++)
                (b[y].fn !== d || (p && !b[y].once) || (h && b[y].context !== h)) && w.push(b[y]);
              w.length ? (this._events[v] = w.length === 1 ? w[0] : w) : a(this, v);
            }
            return this;
          }),
          (s.prototype.removeAllListeners = function (c) {
            var d;
            return (
              c
                ? ((d = n ? n + c : c), this._events[d] && a(this, d))
                : ((this._events = new r()), (this._eventsCount = 0)),
              this
            );
          }),
          (s.prototype.off = s.prototype.removeListener),
          (s.prototype.addListener = s.prototype.on),
          (s.prefixed = n),
          (s.EventEmitter = s),
          (e.exports = s);
      })(Zx)),
    Zx.exports
  );
}
var hge = dge();
const pge = ht(hge);
var Qx = new pge(),
  Jx = "recharts.syncMouseEvents";
function Xf(e) {
  "@babel/helpers - typeof";

  return (
    (Xf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Xf(e)
  );
}
function mge(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function vge(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, R9(r.key), r);
  }
}
function yge(e, t, n) {
  return (
    t && vge(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function eS(e, t, n) {
  return (
    (t = R9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function R9(e) {
  var t = gge(e, "string");
  return Xf(t) == "symbol" ? t : t + "";
}
function gge(e, t) {
  if (Xf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Xf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var bge = (function () {
  function e() {
    mge(this, e), eS(this, "activeIndex", 0), eS(this, "coordinateList", []), eS(this, "layout", "horizontal");
  }
  return yge(e, [
    {
      key: "setDetails",
      value: function (n) {
        var r,
          i = n.coordinateList,
          o = i === void 0 ? null : i,
          a = n.container,
          s = a === void 0 ? null : a,
          u = n.layout,
          c = u === void 0 ? null : u,
          d = n.offset,
          h = d === void 0 ? null : d,
          p = n.mouseHandlerCallback,
          v = p === void 0 ? null : p;
        (this.coordinateList = (r = o ?? this.coordinateList) !== null && r !== void 0 ? r : []),
          (this.container = s ?? this.container),
          (this.layout = c ?? this.layout),
          (this.offset = h ?? this.offset),
          (this.mouseHandlerCallback = v ?? this.mouseHandlerCallback),
          (this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1));
      },
    },
    {
      key: "focus",
      value: function () {
        this.spoofMouse();
      },
    },
    {
      key: "keyboardEvent",
      value: function (n) {
        if (this.coordinateList.length !== 0)
          switch (n.key) {
            case "ArrowRight": {
              if (this.layout !== "horizontal") return;
              (this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1)), this.spoofMouse();
              break;
            }
            case "ArrowLeft": {
              if (this.layout !== "horizontal") return;
              (this.activeIndex = Math.max(this.activeIndex - 1, 0)), this.spoofMouse();
              break;
            }
          }
      },
    },
    {
      key: "setIndex",
      value: function (n) {
        this.activeIndex = n;
      },
    },
    {
      key: "spoofMouse",
      value: function () {
        var n, r;
        if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
          var i = this.container.getBoundingClientRect(),
            o = i.x,
            a = i.y,
            s = i.height,
            u = this.coordinateList[this.activeIndex].coordinate,
            c = ((n = window) === null || n === void 0 ? void 0 : n.scrollX) || 0,
            d = ((r = window) === null || r === void 0 ? void 0 : r.scrollY) || 0,
            h = o + u + c,
            p = a + this.offset.top + s / 2 + d;
          this.mouseHandlerCallback({
            pageX: h,
            pageY: p,
          });
        }
      },
    },
  ]);
})();
function wge(e, t, n) {
  if (n === "number" && t === !0 && Array.isArray(e)) {
    var r = e?.[0],
      i = e?.[1];
    if (r && i && be(r) && be(i)) return !0;
  }
  return !1;
}
function xge(e, t, n, r) {
  var i = r / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : n.left + 0.5,
    y: e === "horizontal" ? n.top + 0.5 : t.y - i,
    width: e === "horizontal" ? r : n.width - 1,
    height: e === "horizontal" ? n.height - 1 : r,
  };
}
function M9(e) {
  var t = e.cx,
    n = e.cy,
    r = e.radius,
    i = e.startAngle,
    o = e.endAngle,
    a = vn(t, n, r, i),
    s = vn(t, n, r, o);
  return {
    points: [a, s],
    cx: t,
    cy: n,
    radius: r,
    startAngle: i,
    endAngle: o,
  };
}
function Sge(e, t, n) {
  var r, i, o, a;
  if (e === "horizontal") (r = t.x), (o = r), (i = n.top), (a = n.top + n.height);
  else if (e === "vertical") (i = t.y), (a = i), (r = n.left), (o = n.left + n.width);
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var s = t.cx,
        u = t.cy,
        c = t.innerRadius,
        d = t.outerRadius,
        h = t.angle,
        p = vn(s, u, c, h),
        v = vn(s, u, d, h);
      (r = p.x), (i = p.y), (o = v.x), (a = v.y);
    } else return M9(t);
  return [
    {
      x: r,
      y: i,
    },
    {
      x: o,
      y: a,
    },
  ];
}
function Zf(e) {
  "@babel/helpers - typeof";

  return (
    (Zf =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Zf(e)
  );
}
function I3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function ap(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? I3(Object(n), !0).forEach(function (r) {
          _ge(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : I3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function _ge(e, t, n) {
  return (
    (t = Pge(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Pge(e) {
  var t = Age(e, "string");
  return Zf(t) == "symbol" ? t : t + "";
}
function Age(e, t) {
  if (Zf(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Zf(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Oge(e) {
  var t,
    n,
    r = e.element,
    i = e.tooltipEventType,
    o = e.isActive,
    a = e.activeCoordinate,
    s = e.activePayload,
    u = e.offset,
    c = e.activeTooltipIndex,
    d = e.tooltipAxisBandSize,
    h = e.layout,
    p = e.chartName,
    v =
      (t = r.props.cursor) !== null && t !== void 0
        ? t
        : (n = r.type.defaultProps) === null || n === void 0
          ? void 0
          : n.cursor;
  if (!r || !v || !o || !a || (p !== "ScatterChart" && i !== "axis")) return null;
  var b,
    y = Gc;
  if (p === "ScatterChart") (b = a), (y = zpe);
  else if (p === "BarChart") (b = xge(h, a, u, d)), (y = SE);
  else if (h === "radial") {
    var w = M9(a),
      x = w.cx,
      S = w.cy,
      _ = w.radius,
      E = w.startAngle,
      P = w.endAngle;
    (b = {
      cx: x,
      cy: S,
      startAngle: E,
      endAngle: P,
      innerRadius: _,
      outerRadius: _,
    }),
      (y = B6);
  } else
    (b = {
      points: Sge(h, a, u),
    }),
      (y = Gc);
  var O = ap(
    ap(
      ap(
        ap(
          {
            stroke: "#ccc",
            pointerEvents: "none",
          },
          u,
        ),
        b,
      ),
      rt(v, !1),
    ),
    {},
    {
      payload: s,
      payloadIndex: c,
      className: We("recharts-tooltip-cursor", v.className),
    },
  );
  return React.isValidElement(v) ? React.cloneElement(v, O) : React.createElement(y, O);
}
var Ege = ["item"],
  Tge = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function ru(e) {
  "@babel/helpers - typeof";

  return (
    (ru =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ru(e)
  );
}
function vl() {
  return (
    (vl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    vl.apply(this, arguments)
  );
}
function D3(e, t) {
  return jge(e) || kge(e, t) || I9(e, t) || Cge();
}
function Cge() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kge(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      a,
      s = [],
      u = !0,
      c = !1;
    try {
      if (((o = (n = n.call(e)).next), t !== 0))
        for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); u = !0);
    } catch (d) {
      (c = !0), (i = d);
    } finally {
      try {
        if (!u && n.return != null && ((a = n.return()), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function jge(e) {
  if (Array.isArray(e)) return e;
}
function $3(e, t) {
  if (e == null) return {};
  var n = Rge(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Rge(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Mge(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Nge(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, D9(r.key), r);
  }
}
function Ige(e, t, n) {
  return (
    t && Nge(e.prototype, t),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    e
  );
}
function Dge(e, t, n) {
  return (t = Ym(t)), $ge(e, N9() ? Reflect.construct(t, n || [], Ym(e).constructor) : t.apply(e, n));
}
function $ge(e, t) {
  if (t && (ru(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Lge(e);
}
function Lge(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function N9() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (N9 = function () {
    return !!e;
  })();
}
function Ym(e) {
  return (
    (Ym = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Ym(e)
  );
}
function Bge(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(e, "prototype", {
      writable: !1,
    }),
    t && PP(e, t);
}
function PP(e, t) {
  return (
    (PP = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    PP(e, t)
  );
}
function iu(e) {
  return zge(e) || Vge(e) || I9(e) || Fge();
}
function Fge() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function I9(e, t) {
  if (e) {
    if (typeof e == "string") return AP(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AP(e, t);
  }
}
function Vge(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function zge(e) {
  if (Array.isArray(e)) return AP(e);
}
function AP(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function L3(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function te(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? L3(Object(n), !0).forEach(function (r) {
          ze(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : L3(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ze(e, t, n) {
  return (
    (t = D9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function D9(e) {
  var t = qge(e, "string");
  return ru(t) == "symbol" ? t : t + "";
}
function qge(e, t) {
  if (ru(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ru(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Wge = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"],
  },
  Uge = {
    width: "100%",
    height: "100%",
  },
  $9 = {
    x: 0,
    y: 0,
  };
function sp(e) {
  return e;
}
var Hge = function (t, n) {
    return n === "horizontal" ? t.x : n === "vertical" ? t.y : n === "centric" ? t.angle : t.radius;
  },
  Kge = function (t, n, r, i) {
    var o = n.find(function (d) {
      return d && d.index === r;
    });
    if (o) {
      if (t === "horizontal")
        return {
          x: o.coordinate,
          y: i.y,
        };
      if (t === "vertical")
        return {
          x: i.x,
          y: o.coordinate,
        };
      if (t === "centric") {
        var a = o.coordinate,
          s = i.radius;
        return te(
          te(te({}, i), vn(i.cx, i.cy, s, a)),
          {},
          {
            angle: a,
            radius: s,
          },
        );
      }
      var u = o.coordinate,
        c = i.angle;
      return te(
        te(te({}, i), vn(i.cx, i.cy, u, c)),
        {},
        {
          angle: c,
          radius: u,
        },
      );
    }
    return $9;
  },
  my = function (t, n) {
    var r = n.graphicalItems,
      i = n.dataStartIndex,
      o = n.dataEndIndex,
      a = (r ?? []).reduce(function (s, u) {
        var c = u.props.data;
        return c && c.length ? [].concat(iu(s), iu(c)) : s;
      }, []);
    return a.length > 0 ? a : t && t.length && be(i) && be(o) ? t.slice(i, o + 1) : [];
  };
function L9(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var OP = function (t, n, r, i) {
    var o = t.graphicalItems,
      a = t.tooltipAxis,
      s = my(n, t);
    return r < 0 || !o || !o.length || r >= s.length
      ? null
      : o.reduce(function (u, c) {
          var d,
            h = (d = c.props.data) !== null && d !== void 0 ? d : n;
          h &&
            t.dataStartIndex + t.dataEndIndex !== 0 &&
            t.dataEndIndex - t.dataStartIndex >= r &&
            (h = h.slice(t.dataStartIndex, t.dataEndIndex + 1));
          var p;
          if (a.dataKey && !a.allowDuplicatedCategory) {
            var v = h === void 0 ? s : h;
            p = em(v, a.dataKey, i);
          } else p = (h && h[r]) || s[r];
          return p ? [].concat(iu(u), [D6(c, p)]) : u;
        }, []);
  },
  B3 = function (t, n, r, i) {
    var o = i || {
        x: t.chartX,
        y: t.chartY,
      },
      a = Hge(o, r),
      s = t.orderedTooltipTicks,
      u = t.tooltipAxis,
      c = t.tooltipTicks,
      d = Pfe(a, s, c, u);
    if (d >= 0 && c) {
      var h = c[d] && c[d].value,
        p = OP(t, n, d, h),
        v = Kge(r, s, d, o);
      return {
        activeTooltipIndex: d,
        activeLabel: h,
        activePayload: p,
        activeCoordinate: v,
      };
    }
    return null;
  },
  Gge = function (t, n) {
    var r = n.axes,
      i = n.graphicalItems,
      o = n.axisType,
      a = n.axisIdKey,
      s = n.stackGroups,
      u = n.dataStartIndex,
      c = n.dataEndIndex,
      d = t.layout,
      h = t.children,
      p = t.stackOffset,
      v = N6(d, o);
    return r.reduce(function (b, y) {
      var w,
        x = y.type.defaultProps !== void 0 ? te(te({}, y.type.defaultProps), y.props) : y.props,
        S = x.type,
        _ = x.dataKey,
        E = x.allowDataOverflow,
        P = x.allowDuplicatedCategory,
        O = x.scale,
        k = x.ticks,
        R = x.includeHidden,
        M = x[a];
      if (b[M]) return b;
      var D = my(t.data, {
          graphicalItems: i.filter(function (K) {
            var ne,
              he = a in K.props ? K.props[a] : (ne = K.type.defaultProps) === null || ne === void 0 ? void 0 : ne[a];
            return he === M;
          }),
          dataStartIndex: u,
          dataEndIndex: c,
        }),
        I = D.length,
        V,
        z,
        q;
      wge(x.domain, E, S) &&
        ((V = U_(x.domain, null, E)), v && (S === "number" || O !== "auto") && (q = Kc(D, _, "category")));
      var U = L9(S);
      if (!V || V.length === 0) {
        var B,
          F = (B = x.domain) !== null && B !== void 0 ? B : U;
        if (_) {
          if (((V = Kc(D, _, S)), S === "category" && v)) {
            var L = pre(V);
            P && L
              ? ((z = V), (V = Dm(0, I)))
              : P ||
                (V = JD(F, V, y).reduce(function (K, ne) {
                  return K.indexOf(ne) >= 0 ? K : [].concat(iu(K), [ne]);
                }, []));
          } else if (S === "category")
            P
              ? (V = V.filter(function (K) {
                  return K !== "" && !it(K);
                }))
              : (V = JD(F, V, y).reduce(function (K, ne) {
                  return K.indexOf(ne) >= 0 || ne === "" || it(ne) ? K : [].concat(iu(K), [ne]);
                }, []));
          else if (S === "number") {
            var W = Cfe(
              D,
              i.filter(function (K) {
                var ne,
                  he,
                  le =
                    a in K.props ? K.props[a] : (ne = K.type.defaultProps) === null || ne === void 0 ? void 0 : ne[a],
                  pe =
                    "hide" in K.props
                      ? K.props.hide
                      : (he = K.type.defaultProps) === null || he === void 0
                        ? void 0
                        : he.hide;
                return le === M && (R || !pe);
              }),
              _,
              o,
              d,
            );
            W && (V = W);
          }
          v && (S === "number" || O !== "auto") && (q = Kc(D, _, "category"));
        } else
          v
            ? (V = Dm(0, I))
            : s && s[M] && s[M].hasStack && S === "number"
              ? (V = p === "expand" ? [0, 1] : I6(s[M].stackGroups, u, c))
              : (V = M6(
                  D,
                  i.filter(function (K) {
                    var ne = a in K.props ? K.props[a] : K.type.defaultProps[a],
                      he = "hide" in K.props ? K.props.hide : K.type.defaultProps.hide;
                    return ne === M && (R || !he);
                  }),
                  S,
                  d,
                  !0,
                ));
        if (S === "number") (V = _P(h, V, M, o, k)), F && (V = U_(F, V, E));
        else if (S === "category" && F) {
          var G = F,
            $ = V.every(function (K) {
              return G.indexOf(K) >= 0;
            });
          $ && (V = G);
        }
      }
      return te(
        te({}, b),
        {},
        ze(
          {},
          M,
          te(
            te({}, x),
            {},
            {
              axisType: o,
              domain: V,
              categoricalDomain: q,
              duplicateDomain: z,
              originalDomain: (w = x.domain) !== null && w !== void 0 ? w : U,
              isCategorical: v,
              layout: d,
            },
          ),
        ),
      );
    }, {});
  },
  Yge = function (t, n) {
    var r = n.graphicalItems,
      i = n.Axis,
      o = n.axisType,
      a = n.axisIdKey,
      s = n.stackGroups,
      u = n.dataStartIndex,
      c = n.dataEndIndex,
      d = t.layout,
      h = t.children,
      p = my(t.data, {
        graphicalItems: r,
        dataStartIndex: u,
        dataEndIndex: c,
      }),
      v = p.length,
      b = N6(d, o),
      y = -1;
    return r.reduce(function (w, x) {
      var S = x.type.defaultProps !== void 0 ? te(te({}, x.type.defaultProps), x.props) : x.props,
        _ = S[a],
        E = L9("number");
      if (!w[_]) {
        y++;
        var P;
        return (
          b
            ? (P = Dm(0, v))
            : s && s[_] && s[_].hasStack
              ? ((P = I6(s[_].stackGroups, u, c)), (P = _P(h, P, _, o)))
              : ((P = U_(
                  E,
                  M6(
                    p,
                    r.filter(function (O) {
                      var k,
                        R,
                        M =
                          a in O.props
                            ? O.props[a]
                            : (k = O.type.defaultProps) === null || k === void 0
                              ? void 0
                              : k[a],
                        D =
                          "hide" in O.props
                            ? O.props.hide
                            : (R = O.type.defaultProps) === null || R === void 0
                              ? void 0
                              : R.hide;
                      return M === _ && !D;
                    }),
                    "number",
                    d,
                  ),
                  i.defaultProps.allowDataOverflow,
                )),
                (P = _P(h, P, _, o))),
          te(
            te({}, w),
            {},
            ze(
              {},
              _,
              te(
                te(
                  {
                    axisType: o,
                  },
                  i.defaultProps,
                ),
                {},
                {
                  hide: !0,
                  orientation: Er(Wge, "".concat(o, ".").concat(y % 2), null),
                  domain: P,
                  originalDomain: E,
                  isCategorical: b,
                  layout: d,
                },
              ),
            ),
          )
        );
      }
      return w;
    }, {});
  },
  Xge = function (t, n) {
    var r = n.axisType,
      i = r === void 0 ? "xAxis" : r,
      o = n.AxisComp,
      a = n.graphicalItems,
      s = n.stackGroups,
      u = n.dataStartIndex,
      c = n.dataEndIndex,
      d = t.children,
      h = "".concat(i, "Id"),
      p = Jr(d, o),
      v = {};
    return (
      p && p.length
        ? (v = Gge(t, {
            axes: p,
            graphicalItems: a,
            axisType: i,
            axisIdKey: h,
            stackGroups: s,
            dataStartIndex: u,
            dataEndIndex: c,
          }))
        : a &&
          a.length &&
          (v = Yge(t, {
            Axis: o,
            graphicalItems: a,
            axisType: i,
            axisIdKey: h,
            stackGroups: s,
            dataStartIndex: u,
            dataEndIndex: c,
          })),
      v
    );
  },
  Zge = function (t) {
    var n = ol(t),
      r = Qa(n, !1, !0);
    return {
      tooltipTicks: r,
      orderedTooltipTicks: YO(r, function (i) {
        return i.coordinate;
      }),
      tooltipAxis: n,
      tooltipAxisBandSize: Em(n, r),
    };
  },
  F3 = function (t) {
    var n = t.children,
      r = t.defaultShowTooltip,
      i = sr(n, Gl),
      o = 0,
      a = 0;
    return (
      t.data && t.data.length !== 0 && (a = t.data.length - 1),
      i &&
        i.props &&
        (i.props.startIndex >= 0 && (o = i.props.startIndex), i.props.endIndex >= 0 && (a = i.props.endIndex)),
      {
        chartX: 0,
        chartY: 0,
        dataStartIndex: o,
        dataEndIndex: a,
        activeTooltipIndex: -1,
        isTooltipActive: !!r,
      }
    );
  },
  Qge = function (t) {
    return !t || !t.length
      ? !1
      : t.some(function (n) {
          var r = to(n && n.type);
          return r && r.indexOf("Bar") >= 0;
        });
  },
  V3 = function (t) {
    return t === "horizontal"
      ? {
          numericAxisName: "yAxis",
          cateAxisName: "xAxis",
        }
      : t === "vertical"
        ? {
            numericAxisName: "xAxis",
            cateAxisName: "yAxis",
          }
        : t === "centric"
          ? {
              numericAxisName: "radiusAxis",
              cateAxisName: "angleAxis",
            }
          : {
              numericAxisName: "angleAxis",
              cateAxisName: "radiusAxis",
            };
  },
  Jge = function (t, n) {
    var r = t.props,
      i = t.graphicalItems,
      o = t.xAxisMap,
      a = o === void 0 ? {} : o,
      s = t.yAxisMap,
      u = s === void 0 ? {} : s,
      c = r.width,
      d = r.height,
      h = r.children,
      p = r.margin || {},
      v = sr(h, Gl),
      b = sr(h, Ol),
      y = Object.keys(u).reduce(
        function (P, O) {
          var k = u[O],
            R = k.orientation;
          return !k.mirror && !k.hide ? te(te({}, P), {}, ze({}, R, P[R] + k.width)) : P;
        },
        {
          left: p.left || 0,
          right: p.right || 0,
        },
      ),
      w = Object.keys(a).reduce(
        function (P, O) {
          var k = a[O],
            R = k.orientation;
          return !k.mirror && !k.hide ? te(te({}, P), {}, ze({}, R, Er(P, "".concat(R)) + k.height)) : P;
        },
        {
          top: p.top || 0,
          bottom: p.bottom || 0,
        },
      ),
      x = te(te({}, w), y),
      S = x.bottom;
    v && (x.bottom += v.props.height || Gl.defaultProps.height), b && n && (x = Efe(x, i, r, n));
    var _ = c - x.left - x.right,
      E = d - x.top - x.bottom;
    return te(
      te(
        {
          brushBottom: S,
        },
        x,
      ),
      {},
      {
        width: Math.max(_, 0),
        height: Math.max(E, 0),
      },
    );
  },
  e0e = function (t, n) {
    if (n === "xAxis") return t[n].width;
    if (n === "yAxis") return t[n].height;
  },
  t0e = function (t) {
    var n = t.chartName,
      r = t.GraphicalChild,
      i = t.defaultTooltipEventType,
      o = i === void 0 ? "axis" : i,
      a = t.validateTooltipEventTypes,
      s = a === void 0 ? ["axis"] : a,
      u = t.axisComponents,
      c = t.legendContent,
      d = t.formatAxisMap,
      h = t.defaultProps,
      p = function (x, S) {
        var _ = S.graphicalItems,
          E = S.stackGroups,
          P = S.offset,
          O = S.updateId,
          k = S.dataStartIndex,
          R = S.dataEndIndex,
          M = x.barSize,
          D = x.layout,
          I = x.barGap,
          V = x.barCategoryGap,
          z = x.maxBarSize,
          q = V3(D),
          U = q.numericAxisName,
          B = q.cateAxisName,
          F = Qge(_),
          L = [];
        return (
          _.forEach(function (W, G) {
            var $ = my(x.data, {
                graphicalItems: [W],
                dataStartIndex: k,
                dataEndIndex: R,
              }),
              K = W.type.defaultProps !== void 0 ? te(te({}, W.type.defaultProps), W.props) : W.props,
              ne = K.dataKey,
              he = K.maxBarSize,
              le = K["".concat(U, "Id")],
              pe = K["".concat(B, "Id")],
              Pe = {},
              xe = u.reduce(function (Ke, Ye) {
                var Je = S["".concat(Ye.axisType, "Map")],
                  ge = K["".concat(Ye.axisType, "Id")];
                (Je && Je[ge]) || Ye.axisType === "zAxis" || ms();
                var Re = Je[ge];
                return te(te({}, Ke), {}, ze(ze({}, Ye.axisType, Re), "".concat(Ye.axisType, "Ticks"), Qa(Re)));
              }, Pe),
              re = xe[B],
              ve = xe["".concat(B, "Ticks")],
              je = E && E[le] && E[le].hasStack && Vfe(W, E[le].stackGroups),
              ie = to(W.type).indexOf("Bar") >= 0,
              Qe = Em(re, ve),
              De = [],
              Ve =
                F &&
                Afe({
                  barSize: M,
                  stackGroups: E,
                  totalSize: e0e(xe, B),
                });
            if (ie) {
              var ot,
                se,
                fe = it(he) ? z : he,
                we =
                  (ot = (se = Em(re, ve, !0)) !== null && se !== void 0 ? se : fe) !== null && ot !== void 0 ? ot : 0;
              (De = Ofe({
                barGap: I,
                barCategoryGap: V,
                bandSize: we !== Qe ? we : Qe,
                sizeList: Ve[pe],
                maxBarSize: fe,
              })),
                we !== Qe &&
                  (De = De.map(function (Ke) {
                    return te(
                      te({}, Ke),
                      {},
                      {
                        position: te(
                          te({}, Ke.position),
                          {},
                          {
                            offset: Ke.position.offset - we / 2,
                          },
                        ),
                      },
                    );
                  }));
            }
            var Ne = W && W.type && W.type.getComposedData;
            Ne &&
              L.push({
                props: te(
                  te(
                    {},
                    Ne(
                      te(
                        te({}, xe),
                        {},
                        {
                          displayedData: $,
                          props: x,
                          dataKey: ne,
                          item: W,
                          bandSize: Qe,
                          barPosition: De,
                          offset: P,
                          stackedData: je,
                          layout: D,
                          dataStartIndex: k,
                          dataEndIndex: R,
                        },
                      ),
                    ),
                  ),
                  {},
                  ze(
                    ze(
                      ze(
                        {
                          key: W.key || "item-".concat(G),
                        },
                        U,
                        xe[U],
                      ),
                      B,
                      xe[B],
                    ),
                    "animationId",
                    O,
                  ),
                ),
                childIndex: Ere(W, x.children),
                item: W,
              });
          }),
          L
        );
      },
      v = function (x, S) {
        var _ = x.props,
          E = x.dataStartIndex,
          P = x.dataEndIndex,
          O = x.updateId;
        if (
          !hM({
            props: _,
          })
        )
          return null;
        var k = _.children,
          R = _.layout,
          M = _.stackOffset,
          D = _.data,
          I = _.reverseStackOrder,
          V = V3(R),
          z = V.numericAxisName,
          q = V.cateAxisName,
          U = Jr(k, r),
          B = Lfe(D, U, "".concat(z, "Id"), "".concat(q, "Id"), M, I),
          F = u.reduce(function (K, ne) {
            var he = "".concat(ne.axisType, "Map");
            return te(
              te({}, K),
              {},
              ze(
                {},
                he,
                Xge(
                  _,
                  te(
                    te({}, ne),
                    {},
                    {
                      graphicalItems: U,
                      stackGroups: ne.axisType === z && B,
                      dataStartIndex: E,
                      dataEndIndex: P,
                    },
                  ),
                ),
              ),
            );
          }, {}),
          L = Jge(
            te(
              te({}, F),
              {},
              {
                props: _,
                graphicalItems: U,
              },
            ),
            S?.legendBBox,
          );
        Object.keys(F).forEach(function (K) {
          F[K] = d(_, F[K], L, K.replace("Map", ""), n);
        });
        var W = F["".concat(q, "Map")],
          G = Zge(W),
          $ = p(
            _,
            te(
              te({}, F),
              {},
              {
                dataStartIndex: E,
                dataEndIndex: P,
                updateId: O,
                graphicalItems: U,
                stackGroups: B,
                offset: L,
              },
            ),
          );
        return te(
          te(
            {
              formattedGraphicalItems: $,
              graphicalItems: U,
              offset: L,
              stackGroups: B,
            },
            G,
          ),
          F,
        );
      },
      b = (function (w) {
        function x(S) {
          var _, E, P;
          return (
            Mge(this, x),
            (P = Dge(this, x, [S])),
            ze(P, "eventEmitterSymbol", Symbol("rechartsEventEmitter")),
            ze(P, "accessibilityManager", new bge()),
            ze(P, "handleLegendBBoxUpdate", function (O) {
              if (O) {
                var k = P.state,
                  R = k.dataStartIndex,
                  M = k.dataEndIndex,
                  D = k.updateId;
                P.setState(
                  te(
                    {
                      legendBBox: O,
                    },
                    v(
                      {
                        props: P.props,
                        dataStartIndex: R,
                        dataEndIndex: M,
                        updateId: D,
                      },
                      te(
                        te({}, P.state),
                        {},
                        {
                          legendBBox: O,
                        },
                      ),
                    ),
                  ),
                );
              }
            }),
            ze(P, "handleReceiveSyncEvent", function (O, k, R) {
              if (P.props.syncId === O) {
                if (R === P.eventEmitterSymbol && typeof P.props.syncMethod != "function") return;
                P.applySyncEvent(k);
              }
            }),
            ze(P, "handleBrushChange", function (O) {
              var k = O.startIndex,
                R = O.endIndex;
              if (k !== P.state.dataStartIndex || R !== P.state.dataEndIndex) {
                var M = P.state.updateId;
                P.setState(function () {
                  return te(
                    {
                      dataStartIndex: k,
                      dataEndIndex: R,
                    },
                    v(
                      {
                        props: P.props,
                        dataStartIndex: k,
                        dataEndIndex: R,
                        updateId: M,
                      },
                      P.state,
                    ),
                  );
                }),
                  P.triggerSyncEvent({
                    dataStartIndex: k,
                    dataEndIndex: R,
                  });
              }
            }),
            ze(P, "handleMouseEnter", function (O) {
              var k = P.getMouseInfo(O);
              if (k) {
                var R = te(
                  te({}, k),
                  {},
                  {
                    isTooltipActive: !0,
                  },
                );
                P.setState(R), P.triggerSyncEvent(R);
                var M = P.props.onMouseEnter;
                nt(M) && M(R, O);
              }
            }),
            ze(P, "triggeredAfterMouseMove", function (O) {
              var k = P.getMouseInfo(O),
                R = k
                  ? te(
                      te({}, k),
                      {},
                      {
                        isTooltipActive: !0,
                      },
                    )
                  : {
                      isTooltipActive: !1,
                    };
              P.setState(R), P.triggerSyncEvent(R);
              var M = P.props.onMouseMove;
              nt(M) && M(R, O);
            }),
            ze(P, "handleItemMouseEnter", function (O) {
              P.setState(function () {
                return {
                  isTooltipActive: !0,
                  activeItem: O,
                  activePayload: O.tooltipPayload,
                  activeCoordinate: O.tooltipPosition || {
                    x: O.cx,
                    y: O.cy,
                  },
                };
              });
            }),
            ze(P, "handleItemMouseLeave", function () {
              P.setState(function () {
                return {
                  isTooltipActive: !1,
                };
              });
            }),
            ze(P, "handleMouseMove", function (O) {
              O.persist(), P.throttleTriggeredAfterMouseMove(O);
            }),
            ze(P, "handleMouseLeave", function (O) {
              P.throttleTriggeredAfterMouseMove.cancel();
              var k = {
                isTooltipActive: !1,
              };
              P.setState(k), P.triggerSyncEvent(k);
              var R = P.props.onMouseLeave;
              nt(R) && R(k, O);
            }),
            ze(P, "handleOuterEvent", function (O) {
              var k = Ore(O),
                R = Er(P.props, "".concat(k));
              if (k && nt(R)) {
                var M, D;
                /.*touch.*/i.test(k) ? (D = P.getMouseInfo(O.changedTouches[0])) : (D = P.getMouseInfo(O)),
                  R((M = D) !== null && M !== void 0 ? M : {}, O);
              }
            }),
            ze(P, "handleClick", function (O) {
              var k = P.getMouseInfo(O);
              if (k) {
                var R = te(
                  te({}, k),
                  {},
                  {
                    isTooltipActive: !0,
                  },
                );
                P.setState(R), P.triggerSyncEvent(R);
                var M = P.props.onClick;
                nt(M) && M(R, O);
              }
            }),
            ze(P, "handleMouseDown", function (O) {
              var k = P.props.onMouseDown;
              if (nt(k)) {
                var R = P.getMouseInfo(O);
                k(R, O);
              }
            }),
            ze(P, "handleMouseUp", function (O) {
              var k = P.props.onMouseUp;
              if (nt(k)) {
                var R = P.getMouseInfo(O);
                k(R, O);
              }
            }),
            ze(P, "handleTouchMove", function (O) {
              O.changedTouches != null &&
                O.changedTouches.length > 0 &&
                P.throttleTriggeredAfterMouseMove(O.changedTouches[0]);
            }),
            ze(P, "handleTouchStart", function (O) {
              O.changedTouches != null && O.changedTouches.length > 0 && P.handleMouseDown(O.changedTouches[0]);
            }),
            ze(P, "handleTouchEnd", function (O) {
              O.changedTouches != null && O.changedTouches.length > 0 && P.handleMouseUp(O.changedTouches[0]);
            }),
            ze(P, "handleDoubleClick", function (O) {
              var k = P.props.onDoubleClick;
              if (nt(k)) {
                var R = P.getMouseInfo(O);
                k(R, O);
              }
            }),
            ze(P, "handleContextMenu", function (O) {
              var k = P.props.onContextMenu;
              if (nt(k)) {
                var R = P.getMouseInfo(O);
                k(R, O);
              }
            }),
            ze(P, "triggerSyncEvent", function (O) {
              P.props.syncId !== void 0 && Qx.emit(Jx, P.props.syncId, O, P.eventEmitterSymbol);
            }),
            ze(P, "applySyncEvent", function (O) {
              var k = P.props,
                R = k.layout,
                M = k.syncMethod,
                D = P.state.updateId,
                I = O.dataStartIndex,
                V = O.dataEndIndex;
              if (O.dataStartIndex !== void 0 || O.dataEndIndex !== void 0)
                P.setState(
                  te(
                    {
                      dataStartIndex: I,
                      dataEndIndex: V,
                    },
                    v(
                      {
                        props: P.props,
                        dataStartIndex: I,
                        dataEndIndex: V,
                        updateId: D,
                      },
                      P.state,
                    ),
                  ),
                );
              else if (O.activeTooltipIndex !== void 0) {
                var z = O.chartX,
                  q = O.chartY,
                  U = O.activeTooltipIndex,
                  B = P.state,
                  F = B.offset,
                  L = B.tooltipTicks;
                if (!F) return;
                if (typeof M == "function") U = M(L, O);
                else if (M === "value") {
                  U = -1;
                  for (var W = 0; W < L.length; W++)
                    if (L[W].value === O.activeLabel) {
                      U = W;
                      break;
                    }
                }
                var G = te(
                    te({}, F),
                    {},
                    {
                      x: F.left,
                      y: F.top,
                    },
                  ),
                  $ = Math.min(z, G.x + G.width),
                  K = Math.min(q, G.y + G.height),
                  ne = L[U] && L[U].value,
                  he = OP(P.state, P.props.data, U),
                  le = L[U]
                    ? {
                        x: R === "horizontal" ? L[U].coordinate : $,
                        y: R === "horizontal" ? K : L[U].coordinate,
                      }
                    : $9;
                P.setState(
                  te(
                    te({}, O),
                    {},
                    {
                      activeLabel: ne,
                      activeCoordinate: le,
                      activePayload: he,
                      activeTooltipIndex: U,
                    },
                  ),
                );
              } else P.setState(O);
            }),
            ze(P, "renderCursor", function (O) {
              var k,
                R = P.state,
                M = R.isTooltipActive,
                D = R.activeCoordinate,
                I = R.activePayload,
                V = R.offset,
                z = R.activeTooltipIndex,
                q = R.tooltipAxisBandSize,
                U = P.getTooltipEventType(),
                B = (k = O.props.active) !== null && k !== void 0 ? k : M,
                F = P.props.layout,
                L = O.key || "_recharts-cursor";
              return ReactDefault.createElement(Oge, {
                key: L,
                activeCoordinate: D,
                activePayload: I,
                activeTooltipIndex: z,
                chartName: n,
                element: O,
                isActive: B,
                layout: F,
                offset: V,
                tooltipAxisBandSize: q,
                tooltipEventType: U,
              });
            }),
            ze(P, "renderPolarAxis", function (O, k, R) {
              var M = Er(O, "type.axisType"),
                D = Er(P.state, "".concat(M, "Map")),
                I = O.type.defaultProps,
                V = I !== void 0 ? te(te({}, I), O.props) : O.props,
                z = D && D[V["".concat(M, "Id")]];
              return React.cloneElement(
                O,
                te(
                  te({}, z),
                  {},
                  {
                    className: We(M, z.className),
                    key: O.key || "".concat(k, "-").concat(R),
                    ticks: Qa(z, !0),
                  },
                ),
              );
            }),
            ze(P, "renderPolarGrid", function (O) {
              var k = O.props,
                R = k.radialLines,
                M = k.polarAngles,
                D = k.polarRadius,
                I = P.state,
                V = I.radiusAxisMap,
                z = I.angleAxisMap,
                q = ol(V),
                U = ol(z),
                B = U.cx,
                F = U.cy,
                L = U.innerRadius,
                W = U.outerRadius;
              return React.cloneElement(O, {
                polarAngles: Array.isArray(M)
                  ? M
                  : Qa(U, !0).map(function (G) {
                      return G.coordinate;
                    }),
                polarRadius: Array.isArray(D)
                  ? D
                  : Qa(q, !0).map(function (G) {
                      return G.coordinate;
                    }),
                cx: B,
                cy: F,
                innerRadius: L,
                outerRadius: W,
                key: O.key || "polar-grid",
                radialLines: R,
              });
            }),
            ze(P, "renderLegend", function () {
              var O = P.state.formattedGraphicalItems,
                k = P.props,
                R = k.children,
                M = k.width,
                D = k.height,
                I = P.props.margin || {},
                V = M - (I.left || 0) - (I.right || 0),
                z = j6({
                  children: R,
                  formattedGraphicalItems: O,
                  legendWidth: V,
                  legendContent: c,
                });
              if (!z) return null;
              var q = z.item,
                U = $3(z, Ege);
              return React.cloneElement(
                q,
                te(
                  te({}, U),
                  {},
                  {
                    chartWidth: M,
                    chartHeight: D,
                    margin: I,
                    onBBoxUpdate: P.handleLegendBBoxUpdate,
                  },
                ),
              );
            }),
            ze(P, "renderTooltip", function () {
              var O,
                k = P.props,
                R = k.children,
                M = k.accessibilityLayer,
                D = sr(R, fi);
              if (!D) return null;
              var I = P.state,
                V = I.isTooltipActive,
                z = I.activeCoordinate,
                q = I.activePayload,
                U = I.activeLabel,
                B = I.offset,
                F = (O = D.props.active) !== null && O !== void 0 ? O : V;
              return React.cloneElement(D, {
                viewBox: te(
                  te({}, B),
                  {},
                  {
                    x: B.left,
                    y: B.top,
                  },
                ),
                active: F,
                label: U,
                payload: F ? q : [],
                coordinate: z,
                accessibilityLayer: M,
              });
            }),
            ze(P, "renderBrush", function (O) {
              var k = P.props,
                R = k.margin,
                M = k.data,
                D = P.state,
                I = D.offset,
                V = D.dataStartIndex,
                z = D.dataEndIndex,
                q = D.updateId;
              return React.cloneElement(O, {
                key: O.key || "_recharts-brush",
                onChange: np(P.handleBrushChange, O.props.onChange),
                data: M,
                x: be(O.props.x) ? O.props.x : I.left,
                y: be(O.props.y) ? O.props.y : I.top + I.height + I.brushBottom - (R.bottom || 0),
                width: be(O.props.width) ? O.props.width : I.width,
                startIndex: V,
                endIndex: z,
                updateId: "brush-".concat(q),
              });
            }),
            ze(P, "renderReferenceElement", function (O, k, R) {
              if (!O) return null;
              var M = P,
                D = M.clipPathId,
                I = P.state,
                V = I.xAxisMap,
                z = I.yAxisMap,
                q = I.offset,
                U = O.type.defaultProps || {},
                B = O.props,
                F = B.xAxisId,
                L = F === void 0 ? U.xAxisId : F,
                W = B.yAxisId,
                G = W === void 0 ? U.yAxisId : W;
              return React.cloneElement(O, {
                key: O.key || "".concat(k, "-").concat(R),
                xAxis: V[L],
                yAxis: z[G],
                viewBox: {
                  x: q.left,
                  y: q.top,
                  width: q.width,
                  height: q.height,
                },
                clipPathId: D,
              });
            }),
            ze(P, "renderActivePoints", function (O) {
              var k = O.item,
                R = O.activePoint,
                M = O.basePoint,
                D = O.childIndex,
                I = O.isRange,
                V = [],
                z = k.props.key,
                q =
                  k.item.type.defaultProps !== void 0
                    ? te(te({}, k.item.type.defaultProps), k.item.props)
                    : k.item.props,
                U = q.activeDot,
                B = q.dataKey,
                F = te(
                  te(
                    {
                      index: D,
                      dataKey: B,
                      cx: R.x,
                      cy: R.y,
                      r: 4,
                      fill: xE(k.item),
                      strokeWidth: 2,
                      stroke: "#fff",
                      payload: R.payload,
                      value: R.value,
                    },
                    rt(U, !1),
                  ),
                  tm(U),
                );
              return (
                V.push(x.renderActiveDot(U, F, "".concat(z, "-activePoint-").concat(D))),
                M
                  ? V.push(
                      x.renderActiveDot(
                        U,
                        te(
                          te({}, F),
                          {},
                          {
                            cx: M.x,
                            cy: M.y,
                          },
                        ),
                        "".concat(z, "-basePoint-").concat(D),
                      ),
                    )
                  : I && V.push(null),
                V
              );
            }),
            ze(P, "renderGraphicChild", function (O, k, R) {
              var M = P.filterFormatItem(O, k, R);
              if (!M) return null;
              var D = P.getTooltipEventType(),
                I = P.state,
                V = I.isTooltipActive,
                z = I.tooltipAxis,
                q = I.activeTooltipIndex,
                U = I.activeLabel,
                B = P.props.children,
                F = sr(B, fi),
                L = M.props,
                W = L.points,
                G = L.isRange,
                $ = L.baseLine,
                K =
                  M.item.type.defaultProps !== void 0
                    ? te(te({}, M.item.type.defaultProps), M.item.props)
                    : M.item.props,
                ne = K.activeDot,
                he = K.hide,
                le = K.activeBar,
                pe = K.activeShape,
                Pe = !!(!he && V && F && (ne || le || pe)),
                xe = {};
              D !== "axis" && F && F.props.trigger === "click"
                ? (xe = {
                    onClick: np(P.handleItemMouseEnter, O.props.onClick),
                  })
                : D !== "axis" &&
                  (xe = {
                    onMouseLeave: np(P.handleItemMouseLeave, O.props.onMouseLeave),
                    onMouseEnter: np(P.handleItemMouseEnter, O.props.onMouseEnter),
                  });
              var re = React.cloneElement(O, te(te({}, M.props), xe));
              function ve(Ye) {
                return typeof z.dataKey == "function" ? z.dataKey(Ye.payload) : null;
              }
              if (Pe)
                if (q >= 0) {
                  var je, ie;
                  if (z.dataKey && !z.allowDuplicatedCategory) {
                    var Qe = typeof z.dataKey == "function" ? ve : "payload.".concat(z.dataKey.toString());
                    (je = em(W, Qe, U)), (ie = G && $ && em($, Qe, U));
                  } else (je = W?.[q]), (ie = G && $ && $[q]);
                  if (pe || le) {
                    var De = O.props.activeIndex !== void 0 ? O.props.activeIndex : q;
                    return [
                      React.cloneElement(
                        O,
                        te(
                          te(te({}, M.props), xe),
                          {},
                          {
                            activeIndex: De,
                          },
                        ),
                      ),
                      null,
                      null,
                    ];
                  }
                  if (!it(je))
                    return [re].concat(
                      iu(
                        P.renderActivePoints({
                          item: M,
                          activePoint: je,
                          basePoint: ie,
                          childIndex: q,
                          isRange: G,
                        }),
                      ),
                    );
                } else {
                  var Ve,
                    ot =
                      (Ve = P.getItemByXY(P.state.activeCoordinate)) !== null && Ve !== void 0
                        ? Ve
                        : {
                            graphicalItem: re,
                          },
                    se = ot.graphicalItem,
                    fe = se.item,
                    we = fe === void 0 ? O : fe,
                    Ne = se.childIndex,
                    Ke = te(
                      te(te({}, M.props), xe),
                      {},
                      {
                        activeIndex: Ne,
                      },
                    );
                  return [React.cloneElement(we, Ke), null, null];
                }
              return G ? [re, null, null] : [re, null];
            }),
            ze(P, "renderCustomized", function (O, k, R) {
              return React.cloneElement(
                O,
                te(
                  te(
                    {
                      key: "recharts-customized-".concat(R),
                    },
                    P.props,
                  ),
                  P.state,
                ),
              );
            }),
            ze(P, "renderMap", {
              CartesianGrid: {
                handler: sp,
                once: !0,
              },
              ReferenceArea: {
                handler: P.renderReferenceElement,
              },
              ReferenceLine: {
                handler: sp,
              },
              ReferenceDot: {
                handler: P.renderReferenceElement,
              },
              XAxis: {
                handler: sp,
              },
              YAxis: {
                handler: sp,
              },
              Brush: {
                handler: P.renderBrush,
                once: !0,
              },
              Bar: {
                handler: P.renderGraphicChild,
              },
              Line: {
                handler: P.renderGraphicChild,
              },
              Area: {
                handler: P.renderGraphicChild,
              },
              Radar: {
                handler: P.renderGraphicChild,
              },
              RadialBar: {
                handler: P.renderGraphicChild,
              },
              Scatter: {
                handler: P.renderGraphicChild,
              },
              Pie: {
                handler: P.renderGraphicChild,
              },
              Funnel: {
                handler: P.renderGraphicChild,
              },
              Tooltip: {
                handler: P.renderCursor,
                once: !0,
              },
              PolarGrid: {
                handler: P.renderPolarGrid,
                once: !0,
              },
              PolarAngleAxis: {
                handler: P.renderPolarAxis,
              },
              PolarRadiusAxis: {
                handler: P.renderPolarAxis,
              },
              Customized: {
                handler: P.renderCustomized,
              },
            }),
            (P.clipPathId = "".concat((_ = S.id) !== null && _ !== void 0 ? _ : md("recharts"), "-clip")),
            (P.throttleTriggeredAfterMouseMove = k8(
              P.triggeredAfterMouseMove,
              (E = S.throttleDelay) !== null && E !== void 0 ? E : 1e3 / 60,
            )),
            (P.state = {}),
            P
          );
        }
        return (
          Bge(x, w),
          Ige(x, [
            {
              key: "componentDidMount",
              value: function () {
                var _, E;
                this.addListener(),
                  this.accessibilityManager.setDetails({
                    container: this.container,
                    offset: {
                      left: (_ = this.props.margin.left) !== null && _ !== void 0 ? _ : 0,
                      top: (E = this.props.margin.top) !== null && E !== void 0 ? E : 0,
                    },
                    coordinateList: this.state.tooltipTicks,
                    mouseHandlerCallback: this.triggeredAfterMouseMove,
                    layout: this.props.layout,
                  }),
                  this.displayDefaultTooltip();
              },
            },
            {
              key: "displayDefaultTooltip",
              value: function () {
                var _ = this.props,
                  E = _.children,
                  P = _.data,
                  O = _.height,
                  k = _.layout,
                  R = sr(E, fi);
                if (R) {
                  var M = R.props.defaultIndex;
                  if (!(typeof M != "number" || M < 0 || M > this.state.tooltipTicks.length - 1)) {
                    var D = this.state.tooltipTicks[M] && this.state.tooltipTicks[M].value,
                      I = OP(this.state, P, M, D),
                      V = this.state.tooltipTicks[M].coordinate,
                      z = (this.state.offset.top + O) / 2,
                      q = k === "horizontal",
                      U = q
                        ? {
                            x: V,
                            y: z,
                          }
                        : {
                            y: V,
                            x: z,
                          },
                      B = this.state.formattedGraphicalItems.find(function (L) {
                        var W = L.item;
                        return W.type.name === "Scatter";
                      });
                    B &&
                      ((U = te(te({}, U), B.props.points[M].tooltipPosition)), (I = B.props.points[M].tooltipPayload));
                    var F = {
                      activeTooltipIndex: M,
                      isTooltipActive: !0,
                      activeLabel: D,
                      activePayload: I,
                      activeCoordinate: U,
                    };
                    this.setState(F), this.renderCursor(R), this.accessibilityManager.setIndex(M);
                  }
                }
              },
            },
            {
              key: "getSnapshotBeforeUpdate",
              value: function (_, E) {
                if (!this.props.accessibilityLayer) return null;
                if (
                  (this.state.tooltipTicks !== E.tooltipTicks &&
                    this.accessibilityManager.setDetails({
                      coordinateList: this.state.tooltipTicks,
                    }),
                  this.props.layout !== _.layout &&
                    this.accessibilityManager.setDetails({
                      layout: this.props.layout,
                    }),
                  this.props.margin !== _.margin)
                ) {
                  var P, O;
                  this.accessibilityManager.setDetails({
                    offset: {
                      left: (P = this.props.margin.left) !== null && P !== void 0 ? P : 0,
                      top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0,
                    },
                  });
                }
                return null;
              },
            },
            {
              key: "componentDidUpdate",
              value: function (_) {
                h_([sr(_.children, fi)], [sr(this.props.children, fi)]) || this.displayDefaultTooltip();
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
              },
            },
            {
              key: "getTooltipEventType",
              value: function () {
                var _ = sr(this.props.children, fi);
                if (_ && typeof _.props.shared == "boolean") {
                  var E = _.props.shared ? "axis" : "item";
                  return s.indexOf(E) >= 0 ? E : o;
                }
                return o;
              },
            },
            {
              key: "getMouseInfo",
              value: function (_) {
                if (!this.container) return null;
                var E = this.container,
                  P = E.getBoundingClientRect(),
                  O = pse(P),
                  k = {
                    chartX: Math.round(_.pageX - O.left),
                    chartY: Math.round(_.pageY - O.top),
                  },
                  R = P.width / E.offsetWidth || 1,
                  M = this.inRange(k.chartX, k.chartY, R);
                if (!M) return null;
                var D = this.state,
                  I = D.xAxisMap,
                  V = D.yAxisMap,
                  z = this.getTooltipEventType(),
                  q = B3(this.state, this.props.data, this.props.layout, M);
                if (z !== "axis" && I && V) {
                  var U = ol(I).scale,
                    B = ol(V).scale,
                    F = U && U.invert ? U.invert(k.chartX) : null,
                    L = B && B.invert ? B.invert(k.chartY) : null;
                  return te(
                    te({}, k),
                    {},
                    {
                      xValue: F,
                      yValue: L,
                    },
                    q,
                  );
                }
                return q ? te(te({}, k), q) : null;
              },
            },
            {
              key: "inRange",
              value: function (_, E) {
                var P = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
                  O = this.props.layout,
                  k = _ / P,
                  R = E / P;
                if (O === "horizontal" || O === "vertical") {
                  var M = this.state.offset,
                    D = k >= M.left && k <= M.left + M.width && R >= M.top && R <= M.top + M.height;
                  return D
                    ? {
                        x: k,
                        y: R,
                      }
                    : null;
                }
                var I = this.state,
                  V = I.angleAxisMap,
                  z = I.radiusAxisMap;
                if (V && z) {
                  var q = ol(V);
                  return n$(
                    {
                      x: k,
                      y: R,
                    },
                    q,
                  );
                }
                return null;
              },
            },
            {
              key: "parseEventsOfWrapper",
              value: function () {
                var _ = this.props.children,
                  E = this.getTooltipEventType(),
                  P = sr(_, fi),
                  O = {};
                P &&
                  E === "axis" &&
                  (P.props.trigger === "click"
                    ? (O = {
                        onClick: this.handleClick,
                      })
                    : (O = {
                        onMouseEnter: this.handleMouseEnter,
                        onDoubleClick: this.handleDoubleClick,
                        onMouseMove: this.handleMouseMove,
                        onMouseLeave: this.handleMouseLeave,
                        onTouchMove: this.handleTouchMove,
                        onTouchStart: this.handleTouchStart,
                        onTouchEnd: this.handleTouchEnd,
                        onContextMenu: this.handleContextMenu,
                      }));
                var k = tm(this.props, this.handleOuterEvent);
                return te(te({}, k), O);
              },
            },
            {
              key: "addListener",
              value: function () {
                Qx.on(Jx, this.handleReceiveSyncEvent);
              },
            },
            {
              key: "removeListener",
              value: function () {
                Qx.removeListener(Jx, this.handleReceiveSyncEvent);
              },
            },
            {
              key: "filterFormatItem",
              value: function (_, E, P) {
                for (var O = this.state.formattedGraphicalItems, k = 0, R = O.length; k < R; k++) {
                  var M = O[k];
                  if (M.item === _ || M.props.key === _.key || (E === to(M.item.type) && P === M.childIndex)) return M;
                }
                return null;
              },
            },
            {
              key: "renderClipPath",
              value: function () {
                var _ = this.clipPathId,
                  E = this.state.offset,
                  P = E.left,
                  O = E.top,
                  k = E.height,
                  R = E.width;
                return ReactDefault.createElement(
                  "defs",
                  null,
                  ReactDefault.createElement(
                    "clipPath",
                    {
                      id: _,
                    },
                    ReactDefault.createElement("rect", {
                      x: P,
                      y: O,
                      height: k,
                      width: R,
                    }),
                  ),
                );
              },
            },
            {
              key: "getXScales",
              value: function () {
                var _ = this.state.xAxisMap;
                return _
                  ? Object.entries(_).reduce(function (E, P) {
                      var O = D3(P, 2),
                        k = O[0],
                        R = O[1];
                      return te(te({}, E), {}, ze({}, k, R.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: "getYScales",
              value: function () {
                var _ = this.state.yAxisMap;
                return _
                  ? Object.entries(_).reduce(function (E, P) {
                      var O = D3(P, 2),
                        k = O[0],
                        R = O[1];
                      return te(te({}, E), {}, ze({}, k, R.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: "getXScaleByAxisId",
              value: function (_) {
                var E;
                return (E = this.state.xAxisMap) === null || E === void 0 || (E = E[_]) === null || E === void 0
                  ? void 0
                  : E.scale;
              },
            },
            {
              key: "getYScaleByAxisId",
              value: function (_) {
                var E;
                return (E = this.state.yAxisMap) === null || E === void 0 || (E = E[_]) === null || E === void 0
                  ? void 0
                  : E.scale;
              },
            },
            {
              key: "getItemByXY",
              value: function (_) {
                var E = this.state,
                  P = E.formattedGraphicalItems,
                  O = E.activeItem;
                if (P && P.length)
                  for (var k = 0, R = P.length; k < R; k++) {
                    var M = P[k],
                      D = M.props,
                      I = M.item,
                      V = I.type.defaultProps !== void 0 ? te(te({}, I.type.defaultProps), I.props) : I.props,
                      z = to(I.type);
                    if (z === "Bar") {
                      var q = (D.data || []).find(function (L) {
                        return Rpe(_, L);
                      });
                      if (q)
                        return {
                          graphicalItem: M,
                          payload: q,
                        };
                    } else if (z === "RadialBar") {
                      var U = (D.data || []).find(function (L) {
                        return n$(_, L);
                      });
                      if (U)
                        return {
                          graphicalItem: M,
                          payload: U,
                        };
                    } else if (iy(M, O) || oy(M, O) || Uf(M, O)) {
                      var B = Sme({
                          graphicalItem: M,
                          activeTooltipItem: O,
                          itemData: V.data,
                        }),
                        F = V.activeIndex === void 0 ? B : V.activeIndex;
                      return {
                        graphicalItem: te(
                          te({}, M),
                          {},
                          {
                            childIndex: F,
                          },
                        ),
                        payload: Uf(M, O) ? V.data[B] : M.props.data[B],
                      };
                    }
                  }
                return null;
              },
            },
            {
              key: "render",
              value: function () {
                var _ = this;
                if (!hM(this)) return null;
                var E = this.props,
                  P = E.children,
                  O = E.className,
                  k = E.width,
                  R = E.height,
                  M = E.style,
                  D = E.compact,
                  I = E.title,
                  V = E.desc,
                  z = $3(E, Tge),
                  q = rt(z, !1);
                if (D)
                  return ReactDefault.createElement(
                    w3,
                    {
                      state: this.state,
                      width: this.props.width,
                      height: this.props.height,
                      clipPathId: this.clipPathId,
                    },
                    ReactDefault.createElement(
                      m_,
                      vl({}, q, {
                        width: k,
                        height: R,
                        title: I,
                        desc: V,
                      }),
                      this.renderClipPath(),
                      mM(P, this.renderMap),
                    ),
                  );
                if (this.props.accessibilityLayer) {
                  var U, B;
                  (q.tabIndex = (U = this.props.tabIndex) !== null && U !== void 0 ? U : 0),
                    (q.role = (B = this.props.role) !== null && B !== void 0 ? B : "application"),
                    (q.onKeyDown = function (L) {
                      _.accessibilityManager.keyboardEvent(L);
                    }),
                    (q.onFocus = function () {
                      _.accessibilityManager.focus();
                    });
                }
                var F = this.parseEventsOfWrapper();
                return ReactDefault.createElement(
                  w3,
                  {
                    state: this.state,
                    width: this.props.width,
                    height: this.props.height,
                    clipPathId: this.clipPathId,
                  },
                  ReactDefault.createElement(
                    "div",
                    vl(
                      {
                        className: We("recharts-wrapper", O),
                        style: te(
                          {
                            position: "relative",
                            cursor: "default",
                            width: k,
                            height: R,
                          },
                          M,
                        ),
                      },
                      F,
                      {
                        ref: function (W) {
                          _.container = W;
                        },
                      },
                    ),
                    ReactDefault.createElement(
                      m_,
                      vl({}, q, {
                        width: k,
                        height: R,
                        title: I,
                        desc: V,
                        style: Uge,
                      }),
                      this.renderClipPath(),
                      mM(P, this.renderMap),
                    ),
                    this.renderLegend(),
                    this.renderTooltip(),
                  ),
                );
              },
            },
          ])
        );
      })(React.Component);
    ze(b, "displayName", n),
      ze(
        b,
        "defaultProps",
        te(
          {
            layout: "horizontal",
            stackOffset: "none",
            barCategoryGap: "10%",
            barGap: 4,
            margin: {
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            },
            reverseStackOrder: !1,
            syncMethod: "index",
          },
          h,
        ),
      ),
      ze(b, "getDerivedStateFromProps", function (w, x) {
        var S = w.dataKey,
          _ = w.data,
          E = w.children,
          P = w.width,
          O = w.height,
          k = w.layout,
          R = w.stackOffset,
          M = w.margin,
          D = x.dataStartIndex,
          I = x.dataEndIndex;
        if (x.updateId === void 0) {
          var V = F3(w);
          return te(
            te(
              te({}, V),
              {},
              {
                updateId: 0,
              },
              v(
                te(
                  te(
                    {
                      props: w,
                    },
                    V,
                  ),
                  {},
                  {
                    updateId: 0,
                  },
                ),
                x,
              ),
            ),
            {},
            {
              prevDataKey: S,
              prevData: _,
              prevWidth: P,
              prevHeight: O,
              prevLayout: k,
              prevStackOffset: R,
              prevMargin: M,
              prevChildren: E,
            },
          );
        }
        if (
          S !== x.prevDataKey ||
          _ !== x.prevData ||
          P !== x.prevWidth ||
          O !== x.prevHeight ||
          k !== x.prevLayout ||
          R !== x.prevStackOffset ||
          !Al(M, x.prevMargin)
        ) {
          var z = F3(w),
            q = {
              chartX: x.chartX,
              chartY: x.chartY,
              isTooltipActive: x.isTooltipActive,
            },
            U = te(
              te({}, B3(x, _, k)),
              {},
              {
                updateId: x.updateId + 1,
              },
            ),
            B = te(te(te({}, z), q), U);
          return te(
            te(
              te({}, B),
              v(
                te(
                  {
                    props: w,
                  },
                  B,
                ),
                x,
              ),
            ),
            {},
            {
              prevDataKey: S,
              prevData: _,
              prevWidth: P,
              prevHeight: O,
              prevLayout: k,
              prevStackOffset: R,
              prevMargin: M,
              prevChildren: E,
            },
          );
        }
        if (!h_(E, x.prevChildren)) {
          var F,
            L,
            W,
            G,
            $ = sr(E, Gl),
            K =
              $ && (F = (L = $.props) === null || L === void 0 ? void 0 : L.startIndex) !== null && F !== void 0
                ? F
                : D,
            ne =
              $ && (W = (G = $.props) === null || G === void 0 ? void 0 : G.endIndex) !== null && W !== void 0 ? W : I,
            he = K !== D || ne !== I,
            le = !it(_),
            pe = le && !he ? x.updateId : x.updateId + 1;
          return te(
            te(
              {
                updateId: pe,
              },
              v(
                te(
                  te(
                    {
                      props: w,
                    },
                    x,
                  ),
                  {},
                  {
                    updateId: pe,
                    dataStartIndex: K,
                    dataEndIndex: ne,
                  },
                ),
                x,
              ),
            ),
            {},
            {
              prevChildren: E,
              dataStartIndex: K,
              dataEndIndex: ne,
            },
          );
        }
        return null;
      }),
      ze(b, "renderActiveDot", function (w, x, S) {
        var _;
        return (
          React.isValidElement(w)
            ? (_ = React.cloneElement(w, x))
            : nt(w)
              ? (_ = w(x))
              : (_ = ReactDefault.createElement(_E, x)),
          ReactDefault.createElement(
            Nt,
            {
              className: "recharts-active-dot",
              key: S,
            },
            _,
          )
        );
      });
    var y = React.forwardRef(function (x, S) {
      return ReactDefault.createElement(
        b,
        vl({}, x, {
          ref: S,
        }),
      );
    });
    return (y.displayName = b.displayName), y;
  },
  n0e = t0e({
    chartName: "AreaChart",
    GraphicalChild: _i,
    axisComponents: [
      {
        axisType: "xAxis",
        AxisComp: hy,
      },
      {
        axisType: "yAxis",
        AxisComp: py,
      },
    ],
    formatAxisMap: bve,
  });
