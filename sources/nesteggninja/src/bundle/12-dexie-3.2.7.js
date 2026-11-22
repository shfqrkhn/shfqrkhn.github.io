function zn(e, t) {
  return (
    typeof t != "object" ||
      Ht(t).forEach(function (n) {
        e[n] = t[n];
      }),
    e
  );
}
typeof Promise > "u" || At.Promise || (At.Promise = Promise);
const nf = Object.getPrototypeOf,
  WY = {}.hasOwnProperty;
function fr(e, t) {
  return WY.call(e, t);
}
function Rl(e, t) {
  typeof t == "function" && (t = t(nf(e))),
    (typeof Reflect > "u" ? Ht : Reflect.ownKeys)(t).forEach((n) => {
      Zi(e, n, t[n]);
    });
}
const lB = Object.defineProperty;
function Zi(e, t, n, r) {
  lB(
    e,
    t,
    zn(
      n && fr(n, "get") && typeof n.get == "function"
        ? {
            get: n.get,
            set: n.set,
            configurable: !0,
          }
        : {
            value: n,
            configurable: !0,
            writable: !0,
          },
      r,
    ),
  );
}
function Sl(e) {
  return {
    from: function (t) {
      return (
        (e.prototype = Object.create(t.prototype)),
        Zi(e.prototype, "constructor", e),
        {
          extend: Rl.bind(null, e.prototype),
        }
      );
    },
  };
}
const UY = Object.getOwnPropertyDescriptor;
function LA(e, t) {
  let n;
  return UY(e, t) || ((n = nf(e)) && LA(n, t));
}
const HY = [].slice;
function Np(e, t, n) {
  return HY.call(e, t, n);
}
function uB(e, t) {
  return t(e);
}
function Oc(e) {
  if (!e) throw new Error("Assertion Failed");
}
function cB(e) {
  At.setImmediate ? setImmediate(e) : setTimeout(e, 0);
}
function fB(e, t) {
  return e.reduce((n, r, i) => {
    var o = t(r, i);
    return o && (n[o[0]] = o[1]), n;
  }, {});
}
function Qi(e, t) {
  if (typeof t == "string" && fr(e, t)) return e[t];
  if (!t) return e;
  if (typeof t != "string") {
    for (var n = [], r = 0, i = t.length; r < i; ++r) {
      var o = Qi(e, t[r]);
      n.push(o);
    }
    return n;
  }
  var a = t.indexOf(".");
  if (a !== -1) {
    var s = e[t.substr(0, a)];
    return s == null ? void 0 : Qi(s, t.substr(a + 1));
  }
}
function Zr(e, t, n) {
  if (e && t !== void 0 && (!("isFrozen" in Object) || !Object.isFrozen(e)))
    if (typeof t != "string" && "length" in t) {
      Oc(typeof n != "string" && "length" in n);
      for (var r = 0, i = t.length; r < i; ++r) Zr(e, t[r], n[r]);
    } else {
      var o = t.indexOf(".");
      if (o !== -1) {
        var a = t.substr(0, o),
          s = t.substr(o + 1);
        if (s === "") n === void 0 ? (Rn(e) && !isNaN(parseInt(a)) ? e.splice(a, 1) : delete e[a]) : (e[a] = n);
        else {
          var u = e[a];
          (u && fr(e, a)) || (u = e[a] = {}), Zr(u, s, n);
        }
      } else n === void 0 ? (Rn(e) && !isNaN(parseInt(t)) ? e.splice(t, 1) : delete e[t]) : (e[t] = n);
    }
}
function dB(e) {
  var t = {};
  for (var n in e) fr(e, n) && (t[n] = e[n]);
  return t;
}
const KY = [].concat;
function hB(e) {
  return KY.apply([], e);
}
const pB =
    "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey"
      .split(",")
      .concat(hB([8, 16, 32, 64].map((e) => ["Int", "Uint", "Float"].map((t) => t + e + "Array"))))
      .filter((e) => At[e]),
  GY = pB.map((e) => At[e]);
fB(pB, (e) => [e, !0]);
let Ho = null;
function sd(e) {
  Ho = typeof WeakMap < "u" && new WeakMap();
  const t = bS(e);
  return (Ho = null), t;
}
function bS(e) {
  if (!e || typeof e != "object") return e;
  let t = Ho && Ho.get(e);
  if (t) return t;
  if (Rn(e)) {
    (t = []), Ho && Ho.set(e, t);
    for (var n = 0, r = e.length; n < r; ++n) t.push(bS(e[n]));
  } else if (GY.indexOf(e.constructor) >= 0) t = e;
  else {
    const o = nf(e);
    for (var i in ((t = o === Object.prototype ? {} : Object.create(o)), Ho && Ho.set(e, t), e))
      fr(e, i) && (t[i] = bS(e[i]));
  }
  return t;
}
const { toString: YY } = {};
function wS(e) {
  return YY.call(e).slice(8, -1);
}
const xS = typeof Symbol < "u" ? Symbol.iterator : "@@iterator",
  XY =
    typeof xS == "symbol"
      ? function (e) {
          var t;
          return e != null && (t = e[xS]) && t.apply(e);
        }
      : function () {
          return null;
        },
  il = {};
function zi(e) {
  var t, n, r, i;
  if (arguments.length === 1) {
    if (Rn(e)) return e.slice();
    if (this === il && typeof e == "string") return [e];
    if ((i = XY(e))) {
      for (n = []; !(r = i.next()).done; ) n.push(r.value);
      return n;
    }
    if (e == null) return [e];
    if (typeof (t = e.length) == "number") {
      for (n = new Array(t); t--; ) n[t] = e[t];
      return n;
    }
    return [e];
  }
  for (t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t];
  return n;
}
const BA = typeof Symbol < "u" ? (e) => e[Symbol.toStringTag] === "AsyncFunction" : () => !1;
var Ti = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function mB(e, t) {
  (Ti = e), (vB = t);
}
var vB = () => !0;
const ZY = !new Error("").stack;
function gs() {
  if (ZY)
    try {
      throw (gs.arguments, new Error());
    } catch (e) {
      return e;
    }
  return new Error();
}
function SS(e, t) {
  var n = e.stack;
  return n
    ? ((t = t || 0),
      n.indexOf(e.name) === 0 &&
        (t += (e.name + e.message).split(`
`).length),
      n
        .split(
          `
`,
        )
        .slice(t)
        .filter(vB)
        .map(
          (r) =>
            `
` + r,
        )
        .join(""))
    : "";
}
var yB = [
    "Unknown",
    "Constraint",
    "Data",
    "TransactionInactive",
    "ReadOnly",
    "Version",
    "NotFound",
    "InvalidState",
    "InvalidAccess",
    "Abort",
    "Timeout",
    "QuotaExceeded",
    "Syntax",
    "DataClone",
  ],
  FA = [
    "Modify",
    "Bulk",
    "OpenFailed",
    "VersionChange",
    "Schema",
    "Upgrade",
    "InvalidTable",
    "MissingAPI",
    "NoSuchDatabase",
    "InvalidArgument",
    "SubTransaction",
    "Unsupported",
    "Internal",
    "DatabaseClosed",
    "PrematureCommit",
    "ForeignAwait",
  ].concat(yB),
  QY = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed",
    MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb",
  };
function _l(e, t) {
  (this._e = gs()), (this.name = e), (this.message = t);
}
function gB(e, t) {
  return (
    e +
    ". Errors: " +
    Object.keys(t)
      .map((n) => t[n].toString())
      .filter((n, r, i) => i.indexOf(n) === r).join(`
`)
  );
}
function Ip(e, t, n, r) {
  (this._e = gs()), (this.failures = t), (this.failedKeys = r), (this.successCount = n), (this.message = gB(e, t));
}
function Ic(e, t) {
  (this._e = gs()),
    (this.name = "BulkError"),
    (this.failures = Object.keys(t).map((n) => t[n])),
    (this.failuresByPos = t),
    (this.message = gB(e, t));
}
Sl(_l)
  .from(Error)
  .extend({
    stack: {
      get: function () {
        return this._stack || (this._stack = this.name + ": " + this.message + SS(this._e, 2));
      },
    },
    toString: function () {
      return this.name + ": " + this.message;
    },
  }),
  Sl(Ip).from(_l),
  Sl(Ic).from(_l);
var VA = FA.reduce((e, t) => ((e[t] = t + "Error"), e), {});
const JY = _l;
var He = FA.reduce((e, t) => {
  var n = t + "Error";
  function r(i, o) {
    (this._e = gs()),
      (this.name = n),
      i
        ? typeof i == "string"
          ? ((this.message = `${i}${
              o
                ? `
 ` + o
                : ""
            }`),
            (this.inner = o || null))
          : typeof i == "object" && ((this.message = `${i.name} ${i.message}`), (this.inner = i))
        : ((this.message = QY[t] || n), (this.inner = null));
  }
  return Sl(r).from(JY), (e[t] = r), e;
}, {});
(He.Syntax = SyntaxError), (He.Type = TypeError), (He.Range = RangeError);
var Oj = yB.reduce((e, t) => ((e[t + "Error"] = He[t]), e), {}),
  hp = FA.reduce((e, t) => (["Syntax", "Type", "Range"].indexOf(t) === -1 && (e[t + "Error"] = He[t]), e), {});
function vt() {}
function rf(e) {
  return e;
}
function eX(e, t) {
  return e == null || e === rf
    ? t
    : function (n) {
        return t(e(n));
      };
}
function cs(e, t) {
  return function () {
    e.apply(this, arguments), t.apply(this, arguments);
  };
}
function tX(e, t) {
  return e === vt
    ? t
    : function () {
        var n = e.apply(this, arguments);
        n !== void 0 && (arguments[0] = n);
        var r = this.onsuccess,
          i = this.onerror;
        (this.onsuccess = null), (this.onerror = null);
        var o = t.apply(this, arguments);
        return (
          r && (this.onsuccess = this.onsuccess ? cs(r, this.onsuccess) : r),
          i && (this.onerror = this.onerror ? cs(i, this.onerror) : i),
          o !== void 0 ? o : n
        );
      };
}
function nX(e, t) {
  return e === vt
    ? t
    : function () {
        e.apply(this, arguments);
        var n = this.onsuccess,
          r = this.onerror;
        (this.onsuccess = this.onerror = null),
          t.apply(this, arguments),
          n && (this.onsuccess = this.onsuccess ? cs(n, this.onsuccess) : n),
          r && (this.onerror = this.onerror ? cs(r, this.onerror) : r);
      };
}
function rX(e, t) {
  return e === vt
    ? t
    : function (n) {
        var r = e.apply(this, arguments);
        zn(n, r);
        var i = this.onsuccess,
          o = this.onerror;
        (this.onsuccess = null), (this.onerror = null);
        var a = t.apply(this, arguments);
        return (
          i && (this.onsuccess = this.onsuccess ? cs(i, this.onsuccess) : i),
          o && (this.onerror = this.onerror ? cs(o, this.onerror) : o),
          r === void 0 ? (a === void 0 ? void 0 : a) : zn(r, a)
        );
      };
}
function iX(e, t) {
  return e === vt
    ? t
    : function () {
        return t.apply(this, arguments) !== !1 && e.apply(this, arguments);
      };
}
function zA(e, t) {
  return e === vt
    ? t
    : function () {
        var n = e.apply(this, arguments);
        if (n && typeof n.then == "function") {
          for (var r = this, i = arguments.length, o = new Array(i); i--; ) o[i] = arguments[i];
          return n.then(function () {
            return t.apply(r, o);
          });
        }
        return t.apply(this, arguments);
      };
}
(hp.ModifyError = Ip), (hp.DexieError = _l), (hp.BulkError = Ic);
var of = {};
const bB = 100,
  [_S, Dp, PS] =
    typeof Promise > "u"
      ? []
      : (() => {
          let e = Promise.resolve();
          if (typeof crypto > "u" || !crypto.subtle) return [e, nf(e), e];
          const t = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
          return [t, nf(t), e];
        })(),
  wB = Dp && Dp.then,
  pp = _S && _S.constructor,
  qA = !!PS;
var AS = !1,
  oX = PS
    ? () => {
        PS.then(Bh);
      }
    : At.setImmediate
      ? setImmediate.bind(null, Bh)
      : At.MutationObserver
        ? () => {
            var e = document.createElement("div");
            new MutationObserver(() => {
              Bh(), (e = null);
            }).observe(e, {
              attributes: !0,
            }),
              e.setAttribute("i", "1");
          }
        : () => {
            setTimeout(Bh, 0);
          },
  Dc = function (e, t) {
    Ec.push([e, t]), $p && (oX(), ($p = !1));
  },
  OS = !0,
  $p = !0,
  ts = [],
  mp = [],
  ES = null,
  TS = rf,
  Pl = {
    id: "global",
    global: !0,
    ref: 0,
    unhandleds: [],
    onunhandled: Cj,
    pgp: !1,
    env: {},
    finalize: function () {
      this.unhandleds.forEach((e) => {
        try {
          Cj(e[0], e[1]);
        } catch {}
      });
    },
  },
  $e = Pl,
  Ec = [],
  ns = 0,
  vp = [];
function Ae(e) {
  if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
  (this._listeners = []), (this.onuncatched = vt), (this._lib = !1);
  var t = (this._PSD = $e);
  if ((Ti && ((this._stackHolder = gs()), (this._prev = null), (this._numPrev = 0)), typeof e != "function")) {
    if (e !== of) throw new TypeError("Not a function");
    return (
      (this._state = arguments[1]), (this._value = arguments[2]), void (this._state === !1 && kS(this, this._value))
    );
  }
  (this._state = null), (this._value = null), ++t.ref, SB(this, e);
}
const CS = {
  get: function () {
    var e = $e,
      t = Lp;
    function n(r, i) {
      var o = !e.global && (e !== $e || t !== Lp);
      const a = o && !so();
      var s = new Ae((u, c) => {
        WA(this, new xB(Bp(r, e, o, a), Bp(i, e, o, a), u, c, e));
      });
      return Ti && AB(s, this), s;
    }
    return (n.prototype = of), n;
  },
  set: function (e) {
    Zi(
      this,
      "then",
      e && e.prototype === of
        ? CS
        : {
            get: function () {
              return e;
            },
            set: CS.set,
          },
    );
  },
};
function xB(e, t, n, r, i) {
  (this.onFulfilled = typeof e == "function" ? e : null),
    (this.onRejected = typeof t == "function" ? t : null),
    (this.resolve = n),
    (this.reject = r),
    (this.psd = i);
}
function SB(e, t) {
  try {
    t(
      (n) => {
        if (e._state === null) {
          if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
          var r = e._lib && ld();
          n && typeof n.then == "function"
            ? SB(e, (i, o) => {
                n instanceof Ae ? n._then(i, o) : n.then(i, o);
              })
            : ((e._state = !0), (e._value = n), _B(e)),
            r && ud();
        }
      },
      kS.bind(null, e),
    );
  } catch (n) {
    kS(e, n);
  }
}
function kS(e, t) {
  if ((mp.push(t), e._state === null)) {
    var n = e._lib && ld();
    (t = TS(t)),
      (e._state = !1),
      (e._value = t),
      Ti &&
        t !== null &&
        typeof t == "object" &&
        !t._promise &&
        (function (r, i, o) {
          try {
            r.apply(null, o);
          } catch {}
        })(() => {
          var r = LA(t, "stack");
          (t._promise = e),
            Zi(t, "stack", {
              get: () => (AS ? r && (r.get ? r.get.apply(t) : r.value) : e.stack),
            });
        }),
      (function (r) {
        ts.some((i) => i._value === r._value) || ts.push(r);
      })(e),
      _B(e),
      n && ud();
  }
}
function _B(e) {
  var t = e._listeners;
  e._listeners = [];
  for (var n = 0, r = t.length; n < r; ++n) WA(e, t[n]);
  var i = e._PSD;
  --i.ref || i.finalize(),
    ns === 0 &&
      (++ns,
      Dc(() => {
        --ns == 0 && UA();
      }, []));
}
function WA(e, t) {
  if (e._state !== null) {
    var n = e._state ? t.onFulfilled : t.onRejected;
    if (n === null) return (e._state ? t.resolve : t.reject)(e._value);
    ++t.psd.ref, ++ns, Dc(aX, [n, e, t]);
  } else e._listeners.push(t);
}
function aX(e, t, n) {
  try {
    ES = t;
    var r,
      i = t._value;
    t._state
      ? (r = e(i))
      : (mp.length && (mp = []),
        (r = e(i)),
        mp.indexOf(i) === -1 &&
          (function (o) {
            for (var a = ts.length; a; ) if (ts[--a]._value === o._value) return void ts.splice(a, 1);
          })(t)),
      n.resolve(r);
  } catch (o) {
    n.reject(o);
  } finally {
    (ES = null), --ns == 0 && UA(), --n.psd.ref || n.psd.finalize();
  }
}
function PB(e, t, n) {
  if (t.length === n) return t;
  var r = "";
  if (e._state === !1) {
    var i,
      o,
      a = e._value;
    a != null ? ((i = a.name || "Error"), (o = a.message || a), (r = SS(a, 0))) : ((i = a), (o = "")),
      t.push(i + (o ? ": " + o : "") + r);
  }
  return Ti && ((r = SS(e._stackHolder, 2)) && t.indexOf(r) === -1 && t.push(r), e._prev && PB(e._prev, t, n)), t;
}
function AB(e, t) {
  var n = t ? t._numPrev + 1 : 0;
  n < 100 && ((e._prev = t), (e._numPrev = n));
}
function Bh() {
  ld() && ud();
}
function ld() {
  var e = OS;
  return (OS = !1), ($p = !1), e;
}
function ud() {
  var e, t, n;
  do
    for (; Ec.length > 0; )
      for (e = Ec, Ec = [], n = e.length, t = 0; t < n; ++t) {
        var r = e[t];
        r[0].apply(null, r[1]);
      }
  while (Ec.length > 0);
  (OS = !0), ($p = !0);
}
function UA() {
  var e = ts;
  (ts = []),
    e.forEach((r) => {
      r._PSD.onunhandled.call(null, r._value, r);
    });
  for (var t = vp.slice(0), n = t.length; n; ) t[--n]();
}
function Fh(e) {
  return new Ae(of, !1, e);
}
function Ct(e, t) {
  var n = $e;
  return function () {
    var r = ld(),
      i = $e;
    try {
      return sa(n, !0), e.apply(this, arguments);
    } catch (o) {
      t && t(o);
    } finally {
      sa(i, !1), r && ud();
    }
  };
}
Rl(Ae.prototype, {
  then: CS,
  _then: function (e, t) {
    WA(this, new xB(null, null, e, t, $e));
  },
  catch: function (e) {
    if (arguments.length === 1) return this.then(null, e);
    var t = arguments[0],
      n = arguments[1];
    return typeof t == "function"
      ? this.then(null, (r) => (r instanceof t ? n(r) : Fh(r)))
      : this.then(null, (r) => (r && r.name === t ? n(r) : Fh(r)));
  },
  finally: function (e) {
    return this.then(
      (t) => (e(), t),
      (t) => (e(), Fh(t)),
    );
  },
  stack: {
    get: function () {
      if (this._stack) return this._stack;
      try {
        AS = !0;
        var e = PB(this, [], 20).join(`
From previous: `);
        return this._state !== null && (this._stack = e), e;
      } finally {
        AS = !1;
      }
    },
  },
  timeout: function (e, t) {
    return e < 1 / 0
      ? new Ae((n, r) => {
          var i = setTimeout(() => r(new He.Timeout(t)), e);
          this.then(n, r).finally(clearTimeout.bind(null, i));
        })
      : this;
  },
}),
  typeof Symbol < "u" && Symbol.toStringTag && Zi(Ae.prototype, Symbol.toStringTag, "Dexie.Promise"),
  (Pl.env = OB()),
  Rl(Ae, {
    all: function () {
      var e = zi.apply(null, arguments).map(Vh);
      return new Ae(function (t, n) {
        e.length === 0 && t([]);
        var r = e.length;
        e.forEach((i, o) =>
          Ae.resolve(i).then((a) => {
            (e[o] = a), --r || t(e);
          }, n),
        );
      });
    },
    resolve: (e) => {
      if (e instanceof Ae) return e;
      if (e && typeof e.then == "function")
        return new Ae((n, r) => {
          e.then(n, r);
        });
      var t = new Ae(of, !0, e);
      return AB(t, ES), t;
    },
    reject: Fh,
    race: function () {
      var e = zi.apply(null, arguments).map(Vh);
      return new Ae((t, n) => {
        e.map((r) => Ae.resolve(r).then(t, n));
      });
    },
    PSD: {
      get: () => $e,
      set: (e) => ($e = e),
    },
    totalEchoes: {
      get: () => Lp,
    },
    newPSD: aa,
    usePSD: mu,
    scheduler: {
      get: () => Dc,
      set: (e) => {
        Dc = e;
      },
    },
    rejectionMapper: {
      get: () => TS,
      set: (e) => {
        TS = e;
      },
    },
    follow: (e, t) =>
      new Ae((n, r) =>
        aa(
          (i, o) => {
            var a = $e;
            (a.unhandleds = []),
              (a.onunhandled = o),
              (a.finalize = cs(function () {
                (function (s) {
                  function u() {
                    s(), vp.splice(vp.indexOf(u), 1);
                  }
                  vp.push(u),
                    ++ns,
                    Dc(() => {
                      --ns == 0 && UA();
                    }, []);
                })(() => {
                  this.unhandleds.length === 0 ? i() : o(this.unhandleds[0]);
                });
              }, a.finalize)),
              e();
          },
          t,
          n,
          r,
        ),
      ),
  }),
  pp &&
    (pp.allSettled &&
      Zi(Ae, "allSettled", function () {
        const e = zi.apply(null, arguments).map(Vh);
        return new Ae((t) => {
          e.length === 0 && t([]);
          let n = e.length;
          const r = new Array(n);
          e.forEach((i, o) =>
            Ae.resolve(i)
              .then(
                (a) =>
                  (r[o] = {
                    status: "fulfilled",
                    value: a,
                  }),
                (a) =>
                  (r[o] = {
                    status: "rejected",
                    reason: a,
                  }),
              )
              .then(() => --n || t(r)),
          );
        });
      }),
    pp.any &&
      typeof AggregateError < "u" &&
      Zi(Ae, "any", function () {
        const e = zi.apply(null, arguments).map(Vh);
        return new Ae((t, n) => {
          e.length === 0 && n(new AggregateError([]));
          let r = e.length;
          const i = new Array(r);
          e.forEach((o, a) =>
            Ae.resolve(o).then(
              (s) => t(s),
              (s) => {
                (i[a] = s), --r || n(new AggregateError(i));
              },
            ),
          );
        });
      }));
const jn = {
  awaits: 0,
  echoes: 0,
  id: 0,
};
var sX = 0,
  yp = [],
  N0 = 0,
  Lp = 0,
  lX = 0;
function aa(e, t, n, r) {
  var i = $e,
    o = Object.create(i);
  (o.parent = i), (o.ref = 0), (o.global = !1), (o.id = ++lX);
  var a = Pl.env;
  (o.env = qA
    ? {
        Promise: Ae,
        PromiseProp: {
          value: Ae,
          configurable: !0,
          writable: !0,
        },
        all: Ae.all,
        race: Ae.race,
        allSettled: Ae.allSettled,
        any: Ae.any,
        resolve: Ae.resolve,
        reject: Ae.reject,
        nthen: Ej(a.nthen, o),
        gthen: Ej(a.gthen, o),
      }
    : {}),
    t && zn(o, t),
    ++i.ref,
    (o.finalize = function () {
      --this.parent.ref || this.parent.finalize();
    });
  var s = mu(o, e, n, r);
  return o.ref === 0 && o.finalize(), s;
}
function pu() {
  return jn.id || (jn.id = ++sX), ++jn.awaits, (jn.echoes += bB), jn.id;
}
function so() {
  return !!jn.awaits && (--jn.awaits == 0 && (jn.id = 0), (jn.echoes = jn.awaits * bB), !0);
}
function Vh(e) {
  return jn.echoes && e && e.constructor === pp
    ? (pu(),
      e.then(
        (t) => (so(), t),
        (t) => (so(), en(t)),
      ))
    : e;
}
function uX(e) {
  ++Lp, (jn.echoes && --jn.echoes != 0) || (jn.echoes = jn.id = 0), yp.push($e), sa(e, !0);
}
function cX() {
  var e = yp[yp.length - 1];
  yp.pop(), sa(e, !1);
}
function sa(e, t) {
  var n = $e;
  if (
    ((t ? !jn.echoes || (N0++ && e === $e) : !N0 || (--N0 && e === $e)) || EB(t ? uX.bind(null, e) : cX),
    e !== $e && (($e = e), n === Pl && (Pl.env = OB()), qA))
  ) {
    var r = Pl.env.Promise,
      i = e.env;
    (Dp.then = i.nthen),
      (r.prototype.then = i.gthen),
      (n.global || e.global) &&
        (Object.defineProperty(At, "Promise", i.PromiseProp),
        (r.all = i.all),
        (r.race = i.race),
        (r.resolve = i.resolve),
        (r.reject = i.reject),
        i.allSettled && (r.allSettled = i.allSettled),
        i.any && (r.any = i.any));
  }
}
function OB() {
  var e = At.Promise;
  return qA
    ? {
        Promise: e,
        PromiseProp: Object.getOwnPropertyDescriptor(At, "Promise"),
        all: e.all,
        race: e.race,
        allSettled: e.allSettled,
        any: e.any,
        resolve: e.resolve,
        reject: e.reject,
        nthen: Dp.then,
        gthen: e.prototype.then,
      }
    : {};
}
function mu(e, t, n, r, i) {
  var o = $e;
  try {
    return sa(e, !0), t(n, r, i);
  } finally {
    sa(o, !1);
  }
}
function EB(e) {
  wB.call(_S, e);
}
function Bp(e, t, n, r) {
  return typeof e != "function"
    ? e
    : function () {
        var i = $e;
        n && pu(), sa(t, !0);
        try {
          return e.apply(this, arguments);
        } finally {
          sa(i, !1), r && EB(so);
        }
      };
}
function Ej(e, t) {
  return function (n, r) {
    return e.call(this, Bp(n, t), Bp(r, t));
  };
}
("" + wB).indexOf("[native code]") === -1 && (pu = so = vt);
const Tj = "unhandledrejection";
function Cj(e, t) {
  var n;
  try {
    n = t.onuncatched(e);
  } catch {}
  if (n !== !1)
    try {
      var r,
        i = {
          promise: t,
          reason: e,
        };
      if (
        (At.document && document.createEvent
          ? ((r = document.createEvent("Event")).initEvent(Tj, !0, !0), zn(r, i))
          : At.CustomEvent &&
            zn(
              (r = new CustomEvent(Tj, {
                detail: i,
              })),
              i,
            ),
        r && At.dispatchEvent && (dispatchEvent(r), !At.PromiseRejectionEvent && At.onunhandledrejection))
      )
        try {
          At.onunhandledrejection(r);
        } catch {}
      Ti && r && !r.defaultPrevented && console.warn(`Unhandled rejection: ${e.stack || e}`);
    } catch {}
}
var en = Ae.reject;
function jS(e, t, n, r) {
  if (e.idbdb && (e._state.openComplete || $e.letThrough || e._vip)) {
    var i = e._createTransaction(t, n, e._dbSchema);
    try {
      i.create(), (e._state.PR1398_maxLoop = 3);
    } catch (o) {
      return o.name === VA.InvalidState && e.isOpen() && --e._state.PR1398_maxLoop > 0
        ? (console.warn("Dexie: Need to reopen db"), e._close(), e.open().then(() => jS(e, t, n, r)))
        : en(o);
    }
    return i._promise(t, (o, a) => aa(() => (($e.trans = i), r(o, a, i)))).then((o) => i._completion.then(() => o));
  }
  if (e._state.openComplete) return en(new He.DatabaseClosed(e._state.dbOpenError));
  if (!e._state.isBeingOpened) {
    if (!e._options.autoOpen) return en(new He.DatabaseClosed());
    e.open().catch(vt);
  }
  return e._state.dbReadyPromise.then(() => jS(e, t, n, r));
}
const kj = "3.2.7",
  Ka = "￿",
  RS = -1 / 0,
  Li = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",
  TB = "String expected.",
  $c = [],
  Ov = typeof navigator < "u" && /(MSIE|Trident|Edge)/.test(navigator.userAgent),
  fX = Ov,
  dX = Ov,
  CB = (e) => !/(dexie\.js|dexie\.min\.js)/.test(e),
  Ev = "__dbnames",
  I0 = "readonly",
  D0 = "readwrite";
function fs(e, t) {
  return e
    ? t
      ? function () {
          return e.apply(this, arguments) && t.apply(this, arguments);
        }
      : e
    : t;
}
const kB = {
  type: 3,
  lower: -1 / 0,
  lowerOpen: !1,
  upper: [[]],
  upperOpen: !1,
};
function zh(e) {
  return typeof e != "string" || /\./.test(e)
    ? (t) => t
    : (t) => (t[e] === void 0 && e in t && delete (t = sd(t))[e], t);
}
class hX {
  _trans(t, n, r) {
    const i = this._tx || $e.trans,
      o = this.name;
    function a(u, c, d) {
      if (!d.schema[o]) throw new He.NotFound("Table " + o + " not part of transaction");
      return n(d.idbtrans, d);
    }
    const s = ld();
    try {
      return i && i.db === this.db
        ? i === $e.trans
          ? i._promise(t, a, r)
          : aa(() => i._promise(t, a, r), {
              trans: i,
              transless: $e.transless || $e,
            })
        : jS(this.db, t, [this.name], a);
    } finally {
      s && ud();
    }
  }
  get(t, n) {
    return t && t.constructor === Object
      ? this.where(t).first(n)
      : this._trans("readonly", (r) =>
          this.core
            .get({
              trans: r,
              key: t,
            })
            .then((i) => this.hook.reading.fire(i)),
        ).then(n);
  }
  where(t) {
    if (typeof t == "string") return new this.db.WhereClause(this, t);
    if (Rn(t)) return new this.db.WhereClause(this, `[${t.join("+")}]`);
    const n = Ht(t);
    if (n.length === 1) return this.where(n[0]).equals(t[n[0]]);
    const r = this.schema.indexes
      .concat(this.schema.primKey)
      .filter((c) => {
        if (c.compound && n.every((d) => c.keyPath.indexOf(d) >= 0)) {
          for (let d = 0; d < n.length; ++d) if (n.indexOf(c.keyPath[d]) === -1) return !1;
          return !0;
        }
        return !1;
      })
      .sort((c, d) => c.keyPath.length - d.keyPath.length)[0];
    if (r && this.db._maxKey !== Ka) {
      const c = r.keyPath.slice(0, n.length);
      return this.where(c).equals(c.map((d) => t[d]));
    }
    !r &&
      Ti &&
      console.warn(`The query ${JSON.stringify(t)} on ${this.name} would benefit of a compound index [${n.join("+")}]`);
    const { idxByName: i } = this.schema,
      o = this.db._deps.indexedDB;
    function a(c, d) {
      try {
        return o.cmp(c, d) === 0;
      } catch {
        return !1;
      }
    }
    const [s, u] = n.reduce(
      ([c, d], h) => {
        const p = i[h],
          v = t[h];
        return [
          c || p,
          c || !p
            ? fs(
                d,
                p && p.multi
                  ? (b) => {
                      const y = Qi(b, h);
                      return Rn(y) && y.some((w) => a(v, w));
                    }
                  : (b) => a(v, Qi(b, h)),
              )
            : d,
        ];
      },
      [null, null],
    );
    return s ? this.where(s.name).equals(t[s.keyPath]).filter(u) : r ? this.filter(u) : this.where(n).equals("");
  }
  filter(t) {
    return this.toCollection().and(t);
  }
  count(t) {
    return this.toCollection().count(t);
  }
  offset(t) {
    return this.toCollection().offset(t);
  }
  limit(t) {
    return this.toCollection().limit(t);
  }
  each(t) {
    return this.toCollection().each(t);
  }
  toArray(t) {
    return this.toCollection().toArray(t);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(t) {
    return new this.db.Collection(new this.db.WhereClause(this, Rn(t) ? `[${t.join("+")}]` : t));
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(t) {
    this.schema.mappedClass = t;
    const n = (r) => {
      if (!r) return r;
      const i = Object.create(t.prototype);
      for (var o in r)
        if (fr(r, o))
          try {
            i[o] = r[o];
          } catch {}
      return i;
    };
    return (
      this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook),
      (this.schema.readHook = n),
      this.hook("reading", n),
      t
    );
  }
  defineClass() {
    return this.mapToClass(function (t) {
      zn(this, t);
    });
  }
  add(t, n) {
    const { auto: r, keyPath: i } = this.schema.primKey;
    let o = t;
    return (
      i && r && (o = zh(i)(t)),
      this._trans("readwrite", (a) =>
        this.core.mutate({
          trans: a,
          type: "add",
          keys: n != null ? [n] : null,
          values: [o],
        }),
      )
        .then((a) => (a.numFailures ? Ae.reject(a.failures[0]) : a.lastResult))
        .then((a) => {
          if (i)
            try {
              Zr(t, i, a);
            } catch {}
          return a;
        })
    );
  }
  update(t, n) {
    if (typeof t != "object" || Rn(t)) return this.where(":id").equals(t).modify(n);
    {
      const r = Qi(t, this.schema.primKey.keyPath);
      if (r === void 0) return en(new He.InvalidArgument("Given object does not contain its primary key"));
      try {
        typeof n != "function"
          ? Ht(n).forEach((i) => {
              Zr(t, i, n[i]);
            })
          : n(t, {
              value: t,
              primKey: r,
            });
      } catch {}
      return this.where(":id").equals(r).modify(n);
    }
  }
  put(t, n) {
    const { auto: r, keyPath: i } = this.schema.primKey;
    let o = t;
    return (
      i && r && (o = zh(i)(t)),
      this._trans("readwrite", (a) =>
        this.core.mutate({
          trans: a,
          type: "put",
          values: [o],
          keys: n != null ? [n] : null,
        }),
      )
        .then((a) => (a.numFailures ? Ae.reject(a.failures[0]) : a.lastResult))
        .then((a) => {
          if (i)
            try {
              Zr(t, i, a);
            } catch {}
          return a;
        })
    );
  }
  delete(t) {
    return this._trans("readwrite", (n) =>
      this.core.mutate({
        trans: n,
        type: "delete",
        keys: [t],
      }),
    ).then((n) => (n.numFailures ? Ae.reject(n.failures[0]) : void 0));
  }
  clear() {
    return this._trans("readwrite", (t) =>
      this.core.mutate({
        trans: t,
        type: "deleteRange",
        range: kB,
      }),
    ).then((t) => (t.numFailures ? Ae.reject(t.failures[0]) : void 0));
  }
  bulkGet(t) {
    return this._trans("readonly", (n) =>
      this.core
        .getMany({
          keys: t,
          trans: n,
        })
        .then((r) => r.map((i) => this.hook.reading.fire(i))),
    );
  }
  bulkAdd(t, n, r) {
    const i = Array.isArray(n) ? n : void 0,
      o = (r = r || (i ? void 0 : n)) ? r.allKeys : void 0;
    return this._trans("readwrite", (a) => {
      const { auto: s, keyPath: u } = this.schema.primKey;
      if (u && i) throw new He.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (i && i.length !== t.length)
        throw new He.InvalidArgument("Arguments objects and keys must have the same length");
      const c = t.length;
      let d = u && s ? t.map(zh(u)) : t;
      return this.core
        .mutate({
          trans: a,
          type: "add",
          keys: i,
          values: d,
          wantResults: o,
        })
        .then(({ numFailures: h, results: p, lastResult: v, failures: b }) => {
          if (h === 0) return o ? p : v;
          throw new Ic(`${this.name}.bulkAdd(): ${h} of ${c} operations failed`, b);
        });
    });
  }
  bulkPut(t, n, r) {
    const i = Array.isArray(n) ? n : void 0,
      o = (r = r || (i ? void 0 : n)) ? r.allKeys : void 0;
    return this._trans("readwrite", (a) => {
      const { auto: s, keyPath: u } = this.schema.primKey;
      if (u && i) throw new He.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (i && i.length !== t.length)
        throw new He.InvalidArgument("Arguments objects and keys must have the same length");
      const c = t.length;
      let d = u && s ? t.map(zh(u)) : t;
      return this.core
        .mutate({
          trans: a,
          type: "put",
          keys: i,
          values: d,
          wantResults: o,
        })
        .then(({ numFailures: h, results: p, lastResult: v, failures: b }) => {
          if (h === 0) return o ? p : v;
          throw new Ic(`${this.name}.bulkPut(): ${h} of ${c} operations failed`, b);
        });
    });
  }
  bulkDelete(t) {
    const n = t.length;
    return this._trans("readwrite", (r) =>
      this.core.mutate({
        trans: r,
        type: "delete",
        keys: t,
      }),
    ).then(({ numFailures: r, lastResult: i, failures: o }) => {
      if (r === 0) return i;
      throw new Ic(`${this.name}.bulkDelete(): ${r} of ${n} operations failed`, o);
    });
  }
}
function Lc(e) {
  var t = {},
    n = function (a, s) {
      if (s) {
        for (var u = arguments.length, c = new Array(u - 1); --u; ) c[u - 1] = arguments[u];
        return t[a].subscribe.apply(null, c), e;
      }
      if (typeof a == "string") return t[a];
    };
  n.addEventType = o;
  for (var r = 1, i = arguments.length; r < i; ++r) o(arguments[r]);
  return n;
  function o(a, s, u) {
    if (typeof a != "object") {
      var c;
      s || (s = iX), u || (u = vt);
      var d = {
        subscribers: [],
        fire: u,
        subscribe: function (h) {
          d.subscribers.indexOf(h) === -1 && (d.subscribers.push(h), (d.fire = s(d.fire, h)));
        },
        unsubscribe: function (h) {
          (d.subscribers = d.subscribers.filter(function (p) {
            return p !== h;
          })),
            (d.fire = d.subscribers.reduce(s, u));
        },
      };
      return (t[a] = n[a] = d), d;
    }
    Ht((c = a)).forEach(function (h) {
      var p = c[h];
      if (Rn(p)) o(h, c[h][0], c[h][1]);
      else {
        if (p !== "asap") throw new He.InvalidArgument("Invalid event config");
        var v = o(h, rf, function () {
          for (var b = arguments.length, y = new Array(b); b--; ) y[b] = arguments[b];
          v.subscribers.forEach(function (w) {
            cB(function () {
              w.apply(null, y);
            });
          });
        });
      }
    });
  }
}
function mc(e, t) {
  return (
    Sl(t).from({
      prototype: e,
    }),
    t
  );
}
function Js(e, t) {
  return !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter);
}
function $0(e, t) {
  e.filter = fs(e.filter, t);
}
function L0(e, t, n) {
  var r = e.replayFilter;
  (e.replayFilter = r ? () => fs(r(), t()) : t), (e.justLimit = n && !r);
}
function gp(e, t) {
  if (e.isPrimKey) return t.primaryKey;
  const n = t.getIndexByKeyPath(e.index);
  if (!n) throw new He.Schema("KeyPath " + e.index + " on object store " + t.name + " is not indexed");
  return n;
}
function jj(e, t, n) {
  const r = gp(e, t.schema);
  return t.openCursor({
    trans: n,
    values: !e.keysOnly,
    reverse: e.dir === "prev",
    unique: !!e.unique,
    query: {
      index: r,
      range: e.range,
    },
  });
}
function qh(e, t, n, r) {
  const i = e.replayFilter ? fs(e.filter, e.replayFilter()) : e.filter;
  if (e.or) {
    const o = {},
      a = (s, u, c) => {
        if (
          !i ||
          i(
            u,
            c,
            (p) => u.stop(p),
            (p) => u.fail(p),
          )
        ) {
          var d = u.primaryKey,
            h = "" + d;
          h === "[object ArrayBuffer]" && (h = "" + new Uint8Array(d)), fr(o, h) || ((o[h] = !0), t(s, u, c));
        }
      };
    return Promise.all([e.or._iterate(a, n), Rj(jj(e, r, n), e.algorithm, a, !e.keysOnly && e.valueMapper)]);
  }
  return Rj(jj(e, r, n), fs(e.algorithm, i), t, !e.keysOnly && e.valueMapper);
}
function Rj(e, t, n, r) {
  var i = Ct(r ? (o, a, s) => n(r(o), a, s) : n);
  return e.then((o) => {
    if (o)
      return o.start(() => {
        var a = () => o.continue();
        (t &&
          !t(
            o,
            (s) => (a = s),
            (s) => {
              o.stop(s), (a = vt);
            },
            (s) => {
              o.fail(s), (a = vt);
            },
          )) ||
          i(o.value, o, (s) => (a = s)),
          a();
      });
  });
}
function Bn(e, t) {
  try {
    const n = Mj(e),
      r = Mj(t);
    if (n !== r)
      return n === "Array"
        ? 1
        : r === "Array"
          ? -1
          : n === "binary"
            ? 1
            : r === "binary"
              ? -1
              : n === "string"
                ? 1
                : r === "string"
                  ? -1
                  : n === "Date"
                    ? 1
                    : r !== "Date"
                      ? NaN
                      : -1;
    switch (n) {
      case "number":
      case "Date":
      case "string":
        return e > t ? 1 : e < t ? -1 : 0;
      case "binary":
        return (function (i, o) {
          const a = i.length,
            s = o.length,
            u = a < s ? a : s;
          for (let c = 0; c < u; ++c) if (i[c] !== o[c]) return i[c] < o[c] ? -1 : 1;
          return a === s ? 0 : a < s ? -1 : 1;
        })(Nj(e), Nj(t));
      case "Array":
        return (function (i, o) {
          const a = i.length,
            s = o.length,
            u = a < s ? a : s;
          for (let c = 0; c < u; ++c) {
            const d = Bn(i[c], o[c]);
            if (d !== 0) return d;
          }
          return a === s ? 0 : a < s ? -1 : 1;
        })(e, t);
    }
  } catch {}
  return NaN;
}
function Mj(e) {
  const t = typeof e;
  if (t !== "object") return t;
  if (ArrayBuffer.isView(e)) return "binary";
  const n = wS(e);
  return n === "ArrayBuffer" ? "binary" : n;
}
function Nj(e) {
  return e instanceof Uint8Array
    ? e
    : ArrayBuffer.isView(e)
      ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
      : new Uint8Array(e);
}
class pX {
  _read(t, n) {
    var r = this._ctx;
    return r.error ? r.table._trans(null, en.bind(null, r.error)) : r.table._trans("readonly", t).then(n);
  }
  _write(t) {
    var n = this._ctx;
    return n.error ? n.table._trans(null, en.bind(null, n.error)) : n.table._trans("readwrite", t, "locked");
  }
  _addAlgorithm(t) {
    var n = this._ctx;
    n.algorithm = fs(n.algorithm, t);
  }
  _iterate(t, n) {
    return qh(this._ctx, t, n, this._ctx.table.core);
  }
  clone(t) {
    var n = Object.create(this.constructor.prototype),
      r = Object.create(this._ctx);
    return t && zn(r, t), (n._ctx = r), n;
  }
  raw() {
    return (this._ctx.valueMapper = null), this;
  }
  each(t) {
    var n = this._ctx;
    return this._read((r) => qh(n, t, r, n.table.core));
  }
  count(t) {
    return this._read((n) => {
      const r = this._ctx,
        i = r.table.core;
      if (Js(r, !0))
        return i
          .count({
            trans: n,
            query: {
              index: gp(r, i.schema),
              range: r.range,
            },
          })
          .then((a) => Math.min(a, r.limit));
      var o = 0;
      return qh(r, () => (++o, !1), n, i).then(() => o);
    }).then(t);
  }
  sortBy(t, n) {
    const r = t.split(".").reverse(),
      i = r[0],
      o = r.length - 1;
    function a(c, d) {
      return d ? a(c[r[d]], d - 1) : c[i];
    }
    var s = this._ctx.dir === "next" ? 1 : -1;
    function u(c, d) {
      var h = a(c, o),
        p = a(d, o);
      return h < p ? -s : h > p ? s : 0;
    }
    return this.toArray(function (c) {
      return c.sort(u);
    }).then(n);
  }
  toArray(t) {
    return this._read((n) => {
      var r = this._ctx;
      if (r.dir === "next" && Js(r, !0) && r.limit > 0) {
        const { valueMapper: i } = r,
          o = gp(r, r.table.core.schema);
        return r.table.core
          .query({
            trans: n,
            limit: r.limit,
            values: !0,
            query: {
              index: o,
              range: r.range,
            },
          })
          .then(({ result: a }) => (i ? a.map(i) : a));
      }
      {
        const i = [];
        return qh(r, (o) => i.push(o), n, r.table.core).then(() => i);
      }
    }, t);
  }
  offset(t) {
    var n = this._ctx;
    return (
      t <= 0 ||
        ((n.offset += t),
        Js(n)
          ? L0(n, () => {
              var r = t;
              return (i, o) =>
                r === 0 ||
                (r === 1
                  ? (--r, !1)
                  : (o(() => {
                      i.advance(r), (r = 0);
                    }),
                    !1));
            })
          : L0(n, () => {
              var r = t;
              return () => --r < 0;
            })),
      this
    );
  }
  limit(t) {
    return (
      (this._ctx.limit = Math.min(this._ctx.limit, t)),
      L0(
        this._ctx,
        () => {
          var n = t;
          return function (r, i, o) {
            return --n <= 0 && i(o), n >= 0;
          };
        },
        !0,
      ),
      this
    );
  }
  until(t, n) {
    return (
      $0(this._ctx, function (r, i, o) {
        return !t(r.value) || (i(o), n);
      }),
      this
    );
  }
  first(t) {
    return this.limit(1)
      .toArray(function (n) {
        return n[0];
      })
      .then(t);
  }
  last(t) {
    return this.reverse().first(t);
  }
  filter(t) {
    var n, r;
    return (
      $0(this._ctx, function (i) {
        return t(i.value);
      }),
      (n = this._ctx),
      (r = t),
      (n.isMatch = fs(n.isMatch, r)),
      this
    );
  }
  and(t) {
    return this.filter(t);
  }
  or(t) {
    return new this.db.WhereClause(this._ctx.table, t, this);
  }
  reverse() {
    return (
      (this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev"),
      this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
      this
    );
  }
  desc() {
    return this.reverse();
  }
  eachKey(t) {
    var n = this._ctx;
    return (
      (n.keysOnly = !n.isMatch),
      this.each(function (r, i) {
        t(i.key, i);
      })
    );
  }
  eachUniqueKey(t) {
    return (this._ctx.unique = "unique"), this.eachKey(t);
  }
  eachPrimaryKey(t) {
    var n = this._ctx;
    return (
      (n.keysOnly = !n.isMatch),
      this.each(function (r, i) {
        t(i.primaryKey, i);
      })
    );
  }
  keys(t) {
    var n = this._ctx;
    n.keysOnly = !n.isMatch;
    var r = [];
    return this.each(function (i, o) {
      r.push(o.key);
    })
      .then(function () {
        return r;
      })
      .then(t);
  }
  primaryKeys(t) {
    var n = this._ctx;
    if (n.dir === "next" && Js(n, !0) && n.limit > 0)
      return this._read((i) => {
        var o = gp(n, n.table.core.schema);
        return n.table.core.query({
          trans: i,
          values: !1,
          limit: n.limit,
          query: {
            index: o,
            range: n.range,
          },
        });
      })
        .then(({ result: i }) => i)
        .then(t);
    n.keysOnly = !n.isMatch;
    var r = [];
    return this.each(function (i, o) {
      r.push(o.primaryKey);
    })
      .then(function () {
        return r;
      })
      .then(t);
  }
  uniqueKeys(t) {
    return (this._ctx.unique = "unique"), this.keys(t);
  }
  firstKey(t) {
    return this.limit(1)
      .keys(function (n) {
        return n[0];
      })
      .then(t);
  }
  lastKey(t) {
    return this.reverse().firstKey(t);
  }
  distinct() {
    var t = this._ctx,
      n = t.index && t.table.schema.idxByName[t.index];
    if (!n || !n.multi) return this;
    var r = {};
    return (
      $0(this._ctx, function (i) {
        var o = i.primaryKey.toString(),
          a = fr(r, o);
        return (r[o] = !0), !a;
      }),
      this
    );
  }
  modify(t) {
    var n = this._ctx;
    return this._write((r) => {
      var i;
      if (typeof t == "function") i = t;
      else {
        var o = Ht(t),
          a = o.length;
        i = function (y) {
          for (var w = !1, x = 0; x < a; ++x) {
            var S = o[x],
              _ = t[S];
            Qi(y, S) !== _ && (Zr(y, S, _), (w = !0));
          }
          return w;
        };
      }
      const s = n.table.core,
        { outbound: u, extractKey: c } = s.schema.primaryKey,
        d = this.db._options.modifyChunkSize || 200,
        h = [];
      let p = 0;
      const v = [],
        b = (y, w) => {
          const { failures: x, numFailures: S } = w;
          p += y - S;
          for (let _ of Ht(x)) h.push(x[_]);
        };
      return this.clone()
        .primaryKeys()
        .then((y) => {
          const w = (x) => {
            const S = Math.min(d, y.length - x);
            return s
              .getMany({
                trans: r,
                keys: y.slice(x, x + S),
                cache: "immutable",
              })
              .then((_) => {
                const E = [],
                  P = [],
                  O = u ? [] : null,
                  k = [];
                for (let M = 0; M < S; ++M) {
                  const D = _[M],
                    I = {
                      value: sd(D),
                      primKey: y[x + M],
                    };
                  i.call(I, I.value, I) !== !1 &&
                    (I.value == null
                      ? k.push(y[x + M])
                      : u || Bn(c(D), c(I.value)) === 0
                        ? (P.push(I.value), u && O.push(y[x + M]))
                        : (k.push(y[x + M]), E.push(I.value)));
                }
                const R = Js(n) &&
                  n.limit === 1 / 0 &&
                  (typeof t != "function" || t === B0) && {
                    index: n.index,
                    range: n.range,
                  };
                return Promise.resolve(
                  E.length > 0 &&
                    s
                      .mutate({
                        trans: r,
                        type: "add",
                        values: E,
                      })
                      .then((M) => {
                        for (let D in M.failures) k.splice(parseInt(D), 1);
                        b(E.length, M);
                      }),
                )
                  .then(
                    () =>
                      (P.length > 0 || (R && typeof t == "object")) &&
                      s
                        .mutate({
                          trans: r,
                          type: "put",
                          keys: O,
                          values: P,
                          criteria: R,
                          changeSpec: typeof t != "function" && t,
                        })
                        .then((M) => b(P.length, M)),
                  )
                  .then(
                    () =>
                      (k.length > 0 || (R && t === B0)) &&
                      s
                        .mutate({
                          trans: r,
                          type: "delete",
                          keys: k,
                          criteria: R,
                        })
                        .then((M) => b(k.length, M)),
                  )
                  .then(() => y.length > x + S && w(x + d));
              });
          };
          return w(0).then(() => {
            if (h.length > 0) throw new Ip("Error modifying one or more objects", h, p, v);
            return y.length;
          });
        });
    });
  }
  delete() {
    var t = this._ctx,
      n = t.range;
    return Js(t) && ((t.isPrimKey && !dX) || n.type === 3)
      ? this._write((r) => {
          const { primaryKey: i } = t.table.core.schema,
            o = n;
          return t.table.core
            .count({
              trans: r,
              query: {
                index: i,
                range: o,
              },
            })
            .then((a) =>
              t.table.core
                .mutate({
                  trans: r,
                  type: "deleteRange",
                  range: o,
                })
                .then(({ failures: s, lastResult: u, results: c, numFailures: d }) => {
                  if (d)
                    throw new Ip(
                      "Could not delete some values",
                      Object.keys(s).map((h) => s[h]),
                      a - d,
                    );
                  return a - d;
                }),
            );
        })
      : this.modify(B0);
  }
}
const B0 = (e, t) => (t.value = null);
function mX(e, t) {
  return e < t ? -1 : e === t ? 0 : 1;
}
function vX(e, t) {
  return e > t ? -1 : e === t ? 0 : 1;
}
function or(e, t, n) {
  var r = e instanceof RB ? new e.Collection(e) : e;
  return (r._ctx.error = n ? new n(t) : new TypeError(t)), r;
}
function el(e) {
  return new e.Collection(e, () => jB("")).limit(0);
}
function yX(e, t, n, r, i, o) {
  for (var a = Math.min(e.length, r.length), s = -1, u = 0; u < a; ++u) {
    var c = t[u];
    if (c !== r[u])
      return i(e[u], n[u]) < 0
        ? e.substr(0, u) + n[u] + n.substr(u + 1)
        : i(e[u], r[u]) < 0
          ? e.substr(0, u) + r[u] + n.substr(u + 1)
          : s >= 0
            ? e.substr(0, s) + t[s] + n.substr(s + 1)
            : null;
    i(e[u], c) < 0 && (s = u);
  }
  return a < r.length && o === "next"
    ? e + n.substr(e.length)
    : a < e.length && o === "prev"
      ? e.substr(0, n.length)
      : s < 0
        ? null
        : e.substr(0, s) + r[s] + n.substr(s + 1);
}
function Wh(e, t, n, r) {
  var i,
    o,
    a,
    s,
    u,
    c,
    d,
    h = n.length;
  if (!n.every((y) => typeof y == "string")) return or(e, TB);
  function p(y) {
    (i = (function (x) {
      return x === "next" ? (S) => S.toUpperCase() : (S) => S.toLowerCase();
    })(y)),
      (o = (function (x) {
        return x === "next" ? (S) => S.toLowerCase() : (S) => S.toUpperCase();
      })(y)),
      (a = y === "next" ? mX : vX);
    var w = n
      .map(function (x) {
        return {
          lower: o(x),
          upper: i(x),
        };
      })
      .sort(function (x, S) {
        return a(x.lower, S.lower);
      });
    (s = w.map(function (x) {
      return x.upper;
    })),
      (u = w.map(function (x) {
        return x.lower;
      })),
      (c = y),
      (d = y === "next" ? "" : r);
  }
  p("next");
  var v = new e.Collection(e, () => qo(s[0], u[h - 1] + r));
  v._ondirectionchange = function (y) {
    p(y);
  };
  var b = 0;
  return (
    v._addAlgorithm(function (y, w, x) {
      var S = y.key;
      if (typeof S != "string") return !1;
      var _ = o(S);
      if (t(_, u, b)) return !0;
      for (var E = null, P = b; P < h; ++P) {
        var O = yX(S, _, s[P], u[P], a, c);
        O === null && E === null ? (b = P + 1) : (E === null || a(E, O) > 0) && (E = O);
      }
      return (
        w(
          E !== null
            ? function () {
                y.continue(E + d);
              }
            : x,
        ),
        !1
      );
    }),
    v
  );
}
function qo(e, t, n, r) {
  return {
    type: 2,
    lower: e,
    upper: t,
    lowerOpen: n,
    upperOpen: r,
  };
}
function jB(e) {
  return {
    type: 1,
    lower: e,
    upper: e,
  };
}
class RB {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(t, n, r, i) {
    (r = r !== !1), (i = i === !0);
    try {
      return this._cmp(t, n) > 0 || (this._cmp(t, n) === 0 && (r || i) && (!r || !i))
        ? el(this)
        : new this.Collection(this, () => qo(t, n, !r, !i));
    } catch {
      return or(this, Li);
    }
  }
  equals(t) {
    return t == null ? or(this, Li) : new this.Collection(this, () => jB(t));
  }
  above(t) {
    return t == null ? or(this, Li) : new this.Collection(this, () => qo(t, void 0, !0));
  }
  aboveOrEqual(t) {
    return t == null ? or(this, Li) : new this.Collection(this, () => qo(t, void 0, !1));
  }
  below(t) {
    return t == null ? or(this, Li) : new this.Collection(this, () => qo(void 0, t, !1, !0));
  }
  belowOrEqual(t) {
    return t == null ? or(this, Li) : new this.Collection(this, () => qo(void 0, t));
  }
  startsWith(t) {
    return typeof t != "string" ? or(this, TB) : this.between(t, t + Ka, !0, !0);
  }
  startsWithIgnoreCase(t) {
    return t === "" ? this.startsWith(t) : Wh(this, (n, r) => n.indexOf(r[0]) === 0, [t], Ka);
  }
  equalsIgnoreCase(t) {
    return Wh(this, (n, r) => n === r[0], [t], "");
  }
  anyOfIgnoreCase() {
    var t = zi.apply(il, arguments);
    return t.length === 0 ? el(this) : Wh(this, (n, r) => r.indexOf(n) !== -1, t, "");
  }
  startsWithAnyOfIgnoreCase() {
    var t = zi.apply(il, arguments);
    return t.length === 0 ? el(this) : Wh(this, (n, r) => r.some((i) => n.indexOf(i) === 0), t, Ka);
  }
  anyOf() {
    const t = zi.apply(il, arguments);
    let n = this._cmp;
    try {
      t.sort(n);
    } catch {
      return or(this, Li);
    }
    if (t.length === 0) return el(this);
    const r = new this.Collection(this, () => qo(t[0], t[t.length - 1]));
    r._ondirectionchange = (o) => {
      (n = o === "next" ? this._ascending : this._descending), t.sort(n);
    };
    let i = 0;
    return (
      r._addAlgorithm((o, a, s) => {
        const u = o.key;
        for (; n(u, t[i]) > 0; ) if ((++i, i === t.length)) return a(s), !1;
        return (
          n(u, t[i]) === 0 ||
          (a(() => {
            o.continue(t[i]);
          }),
          !1)
        );
      }),
      r
    );
  }
  notEqual(t) {
    return this.inAnyRange(
      [
        [RS, t],
        [t, this.db._maxKey],
      ],
      {
        includeLowers: !1,
        includeUppers: !1,
      },
    );
  }
  noneOf() {
    const t = zi.apply(il, arguments);
    if (t.length === 0) return new this.Collection(this);
    try {
      t.sort(this._ascending);
    } catch {
      return or(this, Li);
    }
    const n = t.reduce((r, i) => (r ? r.concat([[r[r.length - 1][1], i]]) : [[RS, i]]), null);
    return (
      n.push([t[t.length - 1], this.db._maxKey]),
      this.inAnyRange(n, {
        includeLowers: !1,
        includeUppers: !1,
      })
    );
  }
  inAnyRange(t, n) {
    const r = this._cmp,
      i = this._ascending,
      o = this._descending,
      a = this._min,
      s = this._max;
    if (t.length === 0) return el(this);
    if (!t.every((S) => S[0] !== void 0 && S[1] !== void 0 && i(S[0], S[1]) <= 0))
      return or(
        this,
        "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",
        He.InvalidArgument,
      );
    const u = !n || n.includeLowers !== !1,
      c = n && n.includeUppers === !0;
    let d,
      h = i;
    function p(S, _) {
      return h(S[0], _[0]);
    }
    try {
      (d = t.reduce(function (S, _) {
        let E = 0,
          P = S.length;
        for (; E < P; ++E) {
          const O = S[E];
          if (r(_[0], O[1]) < 0 && r(_[1], O[0]) > 0) {
            (O[0] = a(O[0], _[0])), (O[1] = s(O[1], _[1]));
            break;
          }
        }
        return E === P && S.push(_), S;
      }, [])),
        d.sort(p);
    } catch {
      return or(this, Li);
    }
    let v = 0;
    const b = c ? (S) => i(S, d[v][1]) > 0 : (S) => i(S, d[v][1]) >= 0,
      y = u ? (S) => o(S, d[v][0]) > 0 : (S) => o(S, d[v][0]) >= 0;
    let w = b;
    const x = new this.Collection(this, () => qo(d[0][0], d[d.length - 1][1], !u, !c));
    return (
      (x._ondirectionchange = (S) => {
        S === "next" ? ((w = b), (h = i)) : ((w = y), (h = o)), d.sort(p);
      }),
      x._addAlgorithm((S, _, E) => {
        for (var P = S.key; w(P); ) if ((++v, v === d.length)) return _(E), !1;
        return (
          !!(function (O) {
            return !b(O) && !y(O);
          })(P) ||
          (this._cmp(P, d[v][1]) === 0 ||
            this._cmp(P, d[v][0]) === 0 ||
            _(() => {
              h === i ? S.continue(d[v][0]) : S.continue(d[v][1]);
            }),
          !1)
        );
      }),
      x
    );
  }
  startsWithAnyOf() {
    const t = zi.apply(il, arguments);
    return t.every((n) => typeof n == "string")
      ? t.length === 0
        ? el(this)
        : this.inAnyRange(t.map((n) => [n, n + Ka]))
      : or(this, "startsWithAnyOf() only works with strings");
  }
}
function ci(e) {
  return Ct(function (t) {
    return af(t), e(t.target.error), !1;
  });
}
function af(e) {
  e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
}
const sf = "storagemutated",
  Xo = "x-storagemutated-1",
  la = Lc(null, sf);
class gX {
  _lock() {
    return Oc(!$e.global), ++this._reculock, this._reculock !== 1 || $e.global || ($e.lockOwnerFor = this), this;
  }
  _unlock() {
    if ((Oc(!$e.global), --this._reculock == 0))
      for ($e.global || ($e.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked(); ) {
        var t = this._blockedFuncs.shift();
        try {
          mu(t[1], t[0]);
        } catch {}
      }
    return this;
  }
  _locked() {
    return this._reculock && $e.lockOwnerFor !== this;
  }
  create(t) {
    if (!this.mode) return this;
    const n = this.db.idbdb,
      r = this.db._state.dbOpenError;
    if ((Oc(!this.idbtrans), !t && !n))
      switch (r && r.name) {
        case "DatabaseClosedError":
          throw new He.DatabaseClosed(r);
        case "MissingAPIError":
          throw new He.MissingAPI(r.message, r);
        default:
          throw new He.OpenFailed(r);
      }
    if (!this.active) throw new He.TransactionInactive();
    return (
      Oc(this._completion._state === null),
      ((t = this.idbtrans =
        t ||
        (this.db.core
          ? this.db.core.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            })
          : n.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            }))).onerror = Ct((i) => {
        af(i), this._reject(t.error);
      })),
      (t.onabort = Ct((i) => {
        af(i), this.active && this._reject(new He.Abort(t.error)), (this.active = !1), this.on("abort").fire(i);
      })),
      (t.oncomplete = Ct(() => {
        (this.active = !1), this._resolve(), "mutatedParts" in t && la.storagemutated.fire(t.mutatedParts);
      })),
      this
    );
  }
  _promise(t, n, r) {
    if (t === "readwrite" && this.mode !== "readwrite") return en(new He.ReadOnly("Transaction is readonly"));
    if (!this.active) return en(new He.TransactionInactive());
    if (this._locked())
      return new Ae((o, a) => {
        this._blockedFuncs.push([
          () => {
            this._promise(t, n, r).then(o, a);
          },
          $e,
        ]);
      });
    if (r)
      return aa(() => {
        var o = new Ae((a, s) => {
          this._lock();
          const u = n(a, s, this);
          u && u.then && u.then(a, s);
        });
        return o.finally(() => this._unlock()), (o._lib = !0), o;
      });
    var i = new Ae((o, a) => {
      var s = n(o, a, this);
      s && s.then && s.then(o, a);
    });
    return (i._lib = !0), i;
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(t) {
    var n = this._root();
    const r = Ae.resolve(t);
    if (n._waitingFor) n._waitingFor = n._waitingFor.then(() => r);
    else {
      (n._waitingFor = r), (n._waitingQueue = []);
      var i = n.idbtrans.objectStore(n.storeNames[0]);
      (function a() {
        for (++n._spinCount; n._waitingQueue.length; ) n._waitingQueue.shift()();
        n._waitingFor && (i.get(-1 / 0).onsuccess = a);
      })();
    }
    var o = n._waitingFor;
    return new Ae((a, s) => {
      r.then(
        (u) => n._waitingQueue.push(Ct(a.bind(null, u))),
        (u) => n._waitingQueue.push(Ct(s.bind(null, u))),
      ).finally(() => {
        n._waitingFor === o && (n._waitingFor = null);
      });
    });
  }
  abort() {
    this.active && ((this.active = !1), this.idbtrans && this.idbtrans.abort(), this._reject(new He.Abort()));
  }
  table(t) {
    const n = this._memoizedTables || (this._memoizedTables = {});
    if (fr(n, t)) return n[t];
    const r = this.schema[t];
    if (!r) throw new He.NotFound("Table " + t + " not part of transaction");
    const i = new this.db.Table(t, r, this);
    return (i.core = this.db.core.table(t)), (n[t] = i), i;
  }
}
function MS(e, t, n, r, i, o, a) {
  return {
    name: e,
    keyPath: t,
    unique: n,
    multi: r,
    auto: i,
    compound: o,
    src: (n && !a ? "&" : "") + (r ? "*" : "") + (i ? "++" : "") + MB(t),
  };
}
function MB(e) {
  return typeof e == "string" ? e : e ? "[" + [].join.call(e, "+") + "]" : "";
}
function NB(e, t, n) {
  return {
    name: e,
    primKey: t,
    indexes: n,
    mappedClass: null,
    idxByName: fB(n, (r) => [r.name, r]),
  };
}
let lf = (e) => {
  try {
    return e.only([[]]), (lf = () => [[]]), [[]];
  } catch {
    return (lf = () => Ka), Ka;
  }
};
function NS(e) {
  return e == null
    ? () => {}
    : typeof e == "string"
      ? (function (t) {
          return t.split(".").length === 1 ? (r) => r[t] : (r) => Qi(r, t);
        })(e)
      : (t) => Qi(t, e);
}
function Ij(e) {
  return [].slice.call(e);
}
let bX = 0;
function Bc(e) {
  return e == null ? ":id" : typeof e == "string" ? e : `[${e.join("+")}]`;
}
function wX(e, t, n) {
  function r(u) {
    if (u.type === 3) return null;
    if (u.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
    const { lower: c, upper: d, lowerOpen: h, upperOpen: p } = u;
    return c === void 0
      ? d === void 0
        ? null
        : t.upperBound(d, !!p)
      : d === void 0
        ? t.lowerBound(c, !!h)
        : t.bound(c, d, !!h, !!p);
  }
  const { schema: i, hasGetAll: o } = (function (u, c) {
      const d = Ij(u.objectStoreNames);
      return {
        schema: {
          name: u.name,
          tables: d
            .map((h) => c.objectStore(h))
            .map((h) => {
              const { keyPath: p, autoIncrement: v } = h,
                b = Rn(p),
                y = p == null,
                w = {},
                x = {
                  name: h.name,
                  primaryKey: {
                    name: null,
                    isPrimaryKey: !0,
                    outbound: y,
                    compound: b,
                    keyPath: p,
                    autoIncrement: v,
                    unique: !0,
                    extractKey: NS(p),
                  },
                  indexes: Ij(h.indexNames)
                    .map((S) => h.index(S))
                    .map((S) => {
                      const { name: _, unique: E, multiEntry: P, keyPath: O } = S,
                        k = {
                          name: _,
                          compound: Rn(O),
                          keyPath: O,
                          unique: E,
                          multiEntry: P,
                          extractKey: NS(O),
                        };
                      return (w[Bc(O)] = k), k;
                    }),
                  getIndexByKeyPath: (S) => w[Bc(S)],
                };
              return (w[":id"] = x.primaryKey), p != null && (w[Bc(p)] = x.primaryKey), x;
            }),
        },
        hasGetAll:
          d.length > 0 &&
          "getAll" in c.objectStore(d[0]) &&
          !(
            typeof navigator < "u" &&
            /Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
          ),
      };
    })(e, n),
    a = i.tables.map((u) =>
      (function (c) {
        const d = c.name;
        return {
          name: d,
          schema: c,
          mutate: function ({ trans: h, type: p, keys: v, values: b, range: y }) {
            return new Promise((w, x) => {
              w = Ct(w);
              const S = h.objectStore(d),
                _ = S.keyPath == null,
                E = p === "put" || p === "add";
              if (!E && p !== "delete" && p !== "deleteRange") throw new Error("Invalid operation type: " + p);
              const { length: P } = v ||
                b || {
                  length: 1,
                };
              if (v && b && v.length !== b.length)
                throw new Error("Given keys array must have same length as given values array.");
              if (P === 0)
                return w({
                  numFailures: 0,
                  failures: {},
                  results: [],
                  lastResult: void 0,
                });
              let O;
              const k = [],
                R = [];
              let M = 0;
              const D = (V) => {
                ++M, af(V);
              };
              if (p === "deleteRange") {
                if (y.type === 4)
                  return w({
                    numFailures: M,
                    failures: R,
                    results: [],
                    lastResult: void 0,
                  });
                y.type === 3 ? k.push((O = S.clear())) : k.push((O = S.delete(r(y))));
              } else {
                const [V, z] = E ? (_ ? [b, v] : [b, null]) : [v, null];
                if (E)
                  for (let q = 0; q < P; ++q)
                    k.push((O = z && z[q] !== void 0 ? S[p](V[q], z[q]) : S[p](V[q]))), (O.onerror = D);
                else for (let q = 0; q < P; ++q) k.push((O = S[p](V[q]))), (O.onerror = D);
              }
              const I = (V) => {
                const z = V.target.result;
                k.forEach((q, U) => q.error != null && (R[U] = q.error)),
                  w({
                    numFailures: M,
                    failures: R,
                    results: p === "delete" ? v : k.map((q) => q.result),
                    lastResult: z,
                  });
              };
              (O.onerror = (V) => {
                D(V), I(V);
              }),
                (O.onsuccess = I);
            });
          },
          getMany: ({ trans: h, keys: p }) =>
            new Promise((v, b) => {
              v = Ct(v);
              const y = h.objectStore(d),
                w = p.length,
                x = new Array(w);
              let S,
                _ = 0,
                E = 0;
              const P = (k) => {
                  const R = k.target;
                  (x[R._pos] = R.result), ++E === _ && v(x);
                },
                O = ci(b);
              for (let k = 0; k < w; ++k)
                p[k] != null && ((S = y.get(p[k])), (S._pos = k), (S.onsuccess = P), (S.onerror = O), ++_);
              _ === 0 && v(x);
            }),
          get: ({ trans: h, key: p }) =>
            new Promise((v, b) => {
              v = Ct(v);
              const y = h.objectStore(d).get(p);
              (y.onsuccess = (w) => v(w.target.result)), (y.onerror = ci(b));
            }),
          query: (function (h) {
            return (p) =>
              new Promise((v, b) => {
                v = Ct(v);
                const { trans: y, values: w, limit: x, query: S } = p,
                  _ = x === 1 / 0 ? void 0 : x,
                  { index: E, range: P } = S,
                  O = y.objectStore(d),
                  k = E.isPrimaryKey ? O : O.index(E.name),
                  R = r(P);
                if (x === 0)
                  return v({
                    result: [],
                  });
                if (h) {
                  const M = w ? k.getAll(R, _) : k.getAllKeys(R, _);
                  (M.onsuccess = (D) =>
                    v({
                      result: D.target.result,
                    })),
                    (M.onerror = ci(b));
                } else {
                  let M = 0;
                  const D = w || !("openKeyCursor" in k) ? k.openCursor(R) : k.openKeyCursor(R),
                    I = [];
                  (D.onsuccess = (V) => {
                    const z = D.result;
                    return z
                      ? (I.push(w ? z.value : z.primaryKey),
                        ++M === x
                          ? v({
                              result: I,
                            })
                          : void z.continue())
                      : v({
                          result: I,
                        });
                  }),
                    (D.onerror = ci(b));
                }
              });
          })(o),
          openCursor: function ({ trans: h, values: p, query: v, reverse: b, unique: y }) {
            return new Promise((w, x) => {
              w = Ct(w);
              const { index: S, range: _ } = v,
                E = h.objectStore(d),
                P = S.isPrimaryKey ? E : E.index(S.name),
                O = b ? (y ? "prevunique" : "prev") : y ? "nextunique" : "next",
                k = p || !("openKeyCursor" in P) ? P.openCursor(r(_), O) : P.openKeyCursor(r(_), O);
              (k.onerror = ci(x)),
                (k.onsuccess = Ct((R) => {
                  const M = k.result;
                  if (!M) return void w(null);
                  (M.___id = ++bX), (M.done = !1);
                  const D = M.continue.bind(M);
                  let I = M.continuePrimaryKey;
                  I && (I = I.bind(M));
                  const V = M.advance.bind(M),
                    z = () => {
                      throw new Error("Cursor not stopped");
                    };
                  (M.trans = h),
                    (M.stop =
                      M.continue =
                      M.continuePrimaryKey =
                      M.advance =
                        () => {
                          throw new Error("Cursor not started");
                        }),
                    (M.fail = Ct(x)),
                    (M.next = function () {
                      let q = 1;
                      return this.start(() => (q-- ? this.continue() : this.stop())).then(() => this);
                    }),
                    (M.start = (q) => {
                      const U = new Promise((F, L) => {
                          (F = Ct(F)),
                            (k.onerror = ci(L)),
                            (M.fail = L),
                            (M.stop = (W) => {
                              (M.stop = M.continue = M.continuePrimaryKey = M.advance = z), F(W);
                            });
                        }),
                        B = () => {
                          if (k.result)
                            try {
                              q();
                            } catch (F) {
                              M.fail(F);
                            }
                          else
                            (M.done = !0),
                              (M.start = () => {
                                throw new Error("Cursor behind last entry");
                              }),
                              M.stop();
                        };
                      return (
                        (k.onsuccess = Ct((F) => {
                          (k.onsuccess = B), B();
                        })),
                        (M.continue = D),
                        (M.continuePrimaryKey = I),
                        (M.advance = V),
                        B(),
                        U
                      );
                    }),
                    w(M);
                }, x));
            });
          },
          count({ query: h, trans: p }) {
            const { index: v, range: b } = h;
            return new Promise((y, w) => {
              const x = p.objectStore(d),
                S = v.isPrimaryKey ? x : x.index(v.name),
                _ = r(b),
                E = _ ? S.count(_) : S.count();
              (E.onsuccess = Ct((P) => y(P.target.result))), (E.onerror = ci(w));
            });
          },
        };
      })(u),
    ),
    s = {};
  return (
    a.forEach((u) => (s[u.name] = u)),
    {
      stack: "dbcore",
      transaction: e.transaction.bind(e),
      table(u) {
        if (!s[u]) throw new Error(`Table '${u}' not found`);
        return s[u];
      },
      MIN_KEY: -1 / 0,
      MAX_KEY: lf(t),
      schema: i,
    }
  );
}
function IS({ _novip: e }, t) {
  const n = t.db,
    r = (function (i, o, { IDBKeyRange: a, indexedDB: s }, u) {
      return {
        dbcore: (function (d, h) {
          return h.reduce(
            (p, { create: v }) => ({
              ...p,
              ...v(p),
            }),
            d,
          );
        })(wX(o, a, u), i.dbcore),
      };
    })(e._middlewares, n, e._deps, t);
  (e.core = r.dbcore),
    e.tables.forEach((i) => {
      const o = i.name;
      e.core.schema.tables.some((a) => a.name === o) &&
        ((i.core = e.core.table(o)), e[o] instanceof e.Table && (e[o].core = i.core));
    });
}
function Fp({ _novip: e }, t, n, r) {
  n.forEach((i) => {
    const o = r[i];
    t.forEach((a) => {
      const s = LA(a, i);
      (!s || ("value" in s && s.value === void 0)) &&
        (a === e.Transaction.prototype || a instanceof e.Transaction
          ? Zi(a, i, {
              get() {
                return this.table(i);
              },
              set(u) {
                lB(this, i, {
                  value: u,
                  writable: !0,
                  configurable: !0,
                  enumerable: !0,
                });
              },
            })
          : (a[i] = new e.Table(i, o)));
    });
  });
}
function DS({ _novip: e }, t) {
  t.forEach((n) => {
    for (let r in n) n[r] instanceof e.Table && delete n[r];
  });
}
function xX(e, t) {
  return e._cfg.version - t._cfg.version;
}
function SX(e, t, n, r) {
  const i = e._dbSchema,
    o = e._createTransaction("readwrite", e._storeNames, i);
  o.create(n), o._completion.catch(r);
  const a = o._reject.bind(o),
    s = $e.transless || $e;
  aa(() => {
    ($e.trans = o),
      ($e.transless = s),
      t === 0
        ? (Ht(i).forEach((u) => {
            F0(n, u, i[u].primKey, i[u].indexes);
          }),
          IS(e, n),
          Ae.follow(() => e.on.populate.fire(o)).catch(a))
        : (function ({ _novip: u }, c, d, h) {
            const p = [],
              v = u._versions;
            let b = (u._dbSchema = LS(u, u.idbdb, h)),
              y = !1;
            const w = v.filter((S) => S._cfg.version >= c);
            function x() {
              return p.length ? Ae.resolve(p.shift()(d.idbtrans)).then(x) : Ae.resolve();
            }
            return (
              w.forEach((S) => {
                p.push(() => {
                  const _ = b,
                    E = S._cfg.dbschema;
                  BS(u, _, h), BS(u, E, h), (b = u._dbSchema = E);
                  const P = IB(_, E);
                  P.add.forEach((k) => {
                    F0(h, k[0], k[1].primKey, k[1].indexes);
                  }),
                    P.change.forEach((k) => {
                      if (k.recreate) throw new He.Upgrade("Not yet support for changing primary key");
                      {
                        const R = h.objectStore(k.name);
                        k.add.forEach((M) => $S(R, M)),
                          k.change.forEach((M) => {
                            R.deleteIndex(M.name), $S(R, M);
                          }),
                          k.del.forEach((M) => R.deleteIndex(M));
                      }
                    });
                  const O = S._cfg.contentUpgrade;
                  if (O && S._cfg.version > c) {
                    IS(u, h), (d._memoizedTables = {}), (y = !0);
                    let k = dB(E);
                    P.del.forEach((I) => {
                      k[I] = _[I];
                    }),
                      DS(u, [u.Transaction.prototype]),
                      Fp(u, [u.Transaction.prototype], Ht(k), k),
                      (d.schema = k);
                    const R = BA(O);
                    let M;
                    R && pu();
                    const D = Ae.follow(() => {
                      if (((M = O(d)), M && R)) {
                        var I = so.bind(null, null);
                        M.then(I, I);
                      }
                    });
                    return M && typeof M.then == "function" ? Ae.resolve(M) : D.then(() => M);
                  }
                }),
                  p.push((_) => {
                    (!y || !fX) &&
                      (function (E, P) {
                        [].slice.call(P.db.objectStoreNames).forEach((O) => E[O] == null && P.db.deleteObjectStore(O));
                      })(S._cfg.dbschema, _),
                      DS(u, [u.Transaction.prototype]),
                      Fp(u, [u.Transaction.prototype], u._storeNames, u._dbSchema),
                      (d.schema = u._dbSchema);
                  });
              }),
              x().then(() => {
                var S, _;
                (_ = h),
                  Ht((S = b)).forEach((E) => {
                    _.db.objectStoreNames.contains(E) || F0(_, E, S[E].primKey, S[E].indexes);
                  });
              })
            );
          })(e, t, o, n).catch(a);
  });
}
function IB(e, t) {
  const n = {
    del: [],
    add: [],
    change: [],
  };
  let r;
  for (r in e) t[r] || n.del.push(r);
  for (r in t) {
    const i = e[r],
      o = t[r];
    if (i) {
      const a = {
        name: r,
        def: o,
        recreate: !1,
        del: [],
        add: [],
        change: [],
      };
      if (
        "" + (i.primKey.keyPath || "") != "" + (o.primKey.keyPath || "") ||
        (i.primKey.auto !== o.primKey.auto && !Ov)
      )
        (a.recreate = !0), n.change.push(a);
      else {
        const s = i.idxByName,
          u = o.idxByName;
        let c;
        for (c in s) u[c] || a.del.push(c);
        for (c in u) {
          const d = s[c],
            h = u[c];
          d ? d.src !== h.src && a.change.push(h) : a.add.push(h);
        }
        (a.del.length > 0 || a.add.length > 0 || a.change.length > 0) && n.change.push(a);
      }
    } else n.add.push([r, o]);
  }
  return n;
}
function F0(e, t, n, r) {
  const i = e.db.createObjectStore(
    t,
    n.keyPath
      ? {
          keyPath: n.keyPath,
          autoIncrement: n.auto,
        }
      : {
          autoIncrement: n.auto,
        },
  );
  return r.forEach((o) => $S(i, o)), i;
}
function $S(e, t) {
  e.createIndex(t.name, t.keyPath, {
    unique: t.unique,
    multiEntry: t.multi,
  });
}
function LS(e, t, n) {
  const r = {};
  return (
    Np(t.objectStoreNames, 0).forEach((i) => {
      const o = n.objectStore(i);
      let a = o.keyPath;
      const s = MS(MB(a), a || "", !1, !1, !!o.autoIncrement, a && typeof a != "string", !0),
        u = [];
      for (let d = 0; d < o.indexNames.length; ++d) {
        const h = o.index(o.indexNames[d]);
        a = h.keyPath;
        var c = MS(h.name, a, !!h.unique, !!h.multiEntry, !1, a && typeof a != "string", !1);
        u.push(c);
      }
      r[i] = NB(i, s, u);
    }),
    r
  );
}
function BS({ _novip: e }, t, n) {
  const r = n.db.objectStoreNames;
  for (let i = 0; i < r.length; ++i) {
    const o = r[i],
      a = n.objectStore(o);
    e._hasGetAll = "getAll" in a;
    for (let s = 0; s < a.indexNames.length; ++s) {
      const u = a.indexNames[s],
        c = a.index(u).keyPath,
        d = typeof c == "string" ? c : "[" + Np(c).join("+") + "]";
      if (t[o]) {
        const h = t[o].idxByName[d];
        h && ((h.name = u), delete t[o].idxByName[d], (t[o].idxByName[u] = h));
      }
    }
  }
  typeof navigator < "u" &&
    /Safari/.test(navigator.userAgent) &&
    !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
    At.WorkerGlobalScope &&
    At instanceof At.WorkerGlobalScope &&
    [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
    (e._hasGetAll = !1);
}
class _X {
  _parseStoresSpec(t, n) {
    Ht(t).forEach((r) => {
      if (t[r] !== null) {
        var i = t[r].split(",").map((a, s) => {
            const u = (a = a.trim()).replace(/([&*]|\+\+)/g, ""),
              c = /^\[/.test(u) ? u.match(/^\[(.*)\]$/)[1].split("+") : u;
            return MS(u, c || null, /\&/.test(a), /\*/.test(a), /\+\+/.test(a), Rn(c), s === 0);
          }),
          o = i.shift();
        if (o.multi) throw new He.Schema("Primary key cannot be multi-valued");
        i.forEach((a) => {
          if (a.auto) throw new He.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!a.keyPath) throw new He.Schema("Index must have a name and cannot be an empty string");
        }),
          (n[r] = NB(r, o, i));
      }
    });
  }
  stores(t) {
    const n = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? zn(this._cfg.storesSource, t) : t;
    const r = n._versions,
      i = {};
    let o = {};
    return (
      r.forEach((a) => {
        zn(i, a._cfg.storesSource), (o = a._cfg.dbschema = {}), a._parseStoresSpec(i, o);
      }),
      (n._dbSchema = o),
      DS(n, [n._allTables, n, n.Transaction.prototype]),
      Fp(n, [n._allTables, n, n.Transaction.prototype, this._cfg.tables], Ht(o), o),
      (n._storeNames = Ht(o)),
      this
    );
  }
  upgrade(t) {
    return (this._cfg.contentUpgrade = zA(this._cfg.contentUpgrade || vt, t)), this;
  }
}
function HA(e, t) {
  let n = e._dbNamesDB;
  return (
    n ||
      ((n = e._dbNamesDB =
        new Dexie(Ev, {
          addons: [],
          indexedDB: e,
          IDBKeyRange: t,
        })),
      n.version(1).stores({
        dbnames: "name",
      })),
    n.table("dbnames")
  );
}
function KA(e) {
  return e && typeof e.databases == "function";
}
function FS(e) {
  return aa(function () {
    return ($e.letThrough = !0), e();
  });
}
function PX() {
  var e;
  return !navigator.userAgentData &&
    /Safari\//.test(navigator.userAgent) &&
    !/Chrom(e|ium)\//.test(navigator.userAgent) &&
    indexedDB.databases
    ? new Promise(function (t) {
        var n = function () {
          return indexedDB.databases().finally(t);
        };
        (e = setInterval(n, 100)), n();
      }).finally(function () {
        return clearInterval(e);
      })
    : Promise.resolve();
}
function AX(e) {
  const t = e._state,
    { indexedDB: n } = e._deps;
  if (t.isBeingOpened || e.idbdb) return t.dbReadyPromise.then(() => (t.dbOpenError ? en(t.dbOpenError) : e));
  Ti && (t.openCanceller._stackHolder = gs()), (t.isBeingOpened = !0), (t.dbOpenError = null), (t.openComplete = !1);
  const r = t.openCanceller;
  function i() {
    if (t.openCanceller !== r) throw new He.DatabaseClosed("db.open() was cancelled");
  }
  let o = t.dbReadyResolve,
    a = null,
    s = !1;
  const u = () =>
    new Ae((c, d) => {
      if ((i(), !n)) throw new He.MissingAPI();
      const h = e.name,
        p = t.autoSchema ? n.open(h) : n.open(h, Math.round(10 * e.verno));
      if (!p) throw new He.MissingAPI();
      (p.onerror = ci(d)),
        (p.onblocked = Ct(e._fireOnBlocked)),
        (p.onupgradeneeded = Ct((v) => {
          if (((a = p.transaction), t.autoSchema && !e._options.allowEmptyDB)) {
            (p.onerror = af), a.abort(), p.result.close();
            const y = n.deleteDatabase(h);
            y.onsuccess = y.onerror = Ct(() => {
              d(new He.NoSuchDatabase(`Database ${h} doesnt exist`));
            });
          } else {
            a.onerror = ci(d);
            var b = v.oldVersion > Math.pow(2, 62) ? 0 : v.oldVersion;
            (s = b < 1), (e._novip.idbdb = p.result), SX(e, b / 10, a, d);
          }
        }, d)),
        (p.onsuccess = Ct(() => {
          a = null;
          const v = (e._novip.idbdb = p.result),
            b = Np(v.objectStoreNames);
          if (b.length > 0)
            try {
              const w = v.transaction((y = b).length === 1 ? y[0] : y, "readonly");
              t.autoSchema
                ? (function ({ _novip: x }, S, _) {
                    x.verno = S.version / 10;
                    const E = (x._dbSchema = LS(0, S, _));
                    (x._storeNames = Np(S.objectStoreNames, 0)), Fp(x, [x._allTables], Ht(E), E);
                  })(e, v, w)
                : (BS(e, e._dbSchema, w),
                  (function (x, S) {
                    const _ = IB(LS(0, x.idbdb, S), x._dbSchema);
                    return !(_.add.length || _.change.some((E) => E.add.length || E.change.length));
                  })(e, w) ||
                    console.warn(
                      "Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.",
                    )),
                IS(e, w);
            } catch {}
          var y;
          $c.push(e),
            (v.onversionchange = Ct((w) => {
              (t.vcFired = !0), e.on("versionchange").fire(w);
            })),
            (v.onclose = Ct((w) => {
              e.on("close").fire(w);
            })),
            s &&
              (function ({ indexedDB: w, IDBKeyRange: x }, S) {
                !KA(w) &&
                  S !== Ev &&
                  HA(w, x)
                    .put({
                      name: S,
                    })
                    .catch(vt);
              })(e._deps, h),
            c();
        }, d));
    }).catch((c) =>
      c && c.name === "UnknownError" && t.PR1398_maxLoop > 0
        ? (t.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), u())
        : Ae.reject(c),
    );
  return Ae.race([r, (typeof navigator > "u" ? Ae.resolve() : PX()).then(u)])
    .then(
      () => (
        i(),
        (t.onReadyBeingFired = []),
        Ae.resolve(FS(() => e.on.ready.fire(e.vip))).then(function c() {
          if (t.onReadyBeingFired.length > 0) {
            let d = t.onReadyBeingFired.reduce(zA, vt);
            return (t.onReadyBeingFired = []), Ae.resolve(FS(() => d(e.vip))).then(c);
          }
        })
      ),
    )
    .finally(() => {
      (t.onReadyBeingFired = null), (t.isBeingOpened = !1);
    })
    .then(() => e)
    .catch((c) => {
      t.dbOpenError = c;
      try {
        a && a.abort();
      } catch {}
      return r === t.openCanceller && e._close(), en(c);
    })
    .finally(() => {
      (t.openComplete = !0), o();
    });
}
function VS(e) {
  var t = (o) => e.next(o),
    n = i(t),
    r = i((o) => e.throw(o));
  function i(o) {
    return (a) => {
      var s = o(a),
        u = s.value;
      return s.done ? u : u && typeof u.then == "function" ? u.then(n, r) : Rn(u) ? Promise.all(u).then(n, r) : n(u);
    };
  }
  return i(t)();
}
function OX(e, t, n) {
  var r = arguments.length;
  if (r < 2) throw new He.InvalidArgument("Too few arguments");
  for (var i = new Array(r - 1); --r; ) i[r - 1] = arguments[r];
  return (n = i.pop()), [e, hB(i), n];
}
function DB(e, t, n, r, i) {
  return Ae.resolve().then(() => {
    const o = $e.transless || $e,
      a = e._createTransaction(t, n, e._dbSchema, r),
      s = {
        trans: a,
        transless: o,
      };
    if (r) a.idbtrans = r.idbtrans;
    else
      try {
        a.create(), (e._state.PR1398_maxLoop = 3);
      } catch (h) {
        return h.name === VA.InvalidState && e.isOpen() && --e._state.PR1398_maxLoop > 0
          ? (console.warn("Dexie: Need to reopen db"), e._close(), e.open().then(() => DB(e, t, n, null, i)))
          : en(h);
      }
    const u = BA(i);
    let c;
    u && pu();
    const d = Ae.follow(() => {
      if (((c = i.call(a, a)), c))
        if (u) {
          var h = so.bind(null, null);
          c.then(h, h);
        } else typeof c.next == "function" && typeof c.throw == "function" && (c = VS(c));
    }, s);
    return (
      c && typeof c.then == "function"
        ? Ae.resolve(c).then((h) =>
            a.active ? h : en(new He.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")),
          )
        : d.then(() => c)
    )
      .then((h) => (r && a._resolve(), a._completion.then(() => h)))
      .catch((h) => (a._reject(h), en(h)));
  });
}
function Uh(e, t, n) {
  const r = Rn(e) ? e.slice() : [e];
  for (let i = 0; i < n; ++i) r.push(t);
  return r;
}
const EX = {
  stack: "dbcore",
  name: "VirtualIndexMiddleware",
  level: 1,
  create: function (e) {
    return {
      ...e,
      table(t) {
        const n = e.table(t),
          { schema: r } = n,
          i = {},
          o = [];
        function a(d, h, p) {
          const v = Bc(d),
            b = (i[v] = i[v] || []),
            y = d == null ? 0 : typeof d == "string" ? 1 : d.length,
            w = h > 0,
            x = {
              ...p,
              isVirtual: w,
              keyTail: h,
              keyLength: y,
              extractKey: NS(d),
              unique: !w && p.unique,
            };
          return (
            b.push(x),
            x.isPrimaryKey || o.push(x),
            y > 1 && a(y === 2 ? d[0] : d.slice(0, y - 1), h + 1, p),
            b.sort((S, _) => S.keyTail - _.keyTail),
            x
          );
        }
        const s = a(r.primaryKey.keyPath, 0, r.primaryKey);
        i[":id"] = [s];
        for (const d of r.indexes) a(d.keyPath, 0, d);
        function u(d) {
          const h = d.query.index;
          return h.isVirtual
            ? {
                ...d,
                query: {
                  index: h,
                  range:
                    ((p = d.query.range),
                    (v = h.keyTail),
                    {
                      type: p.type === 1 ? 2 : p.type,
                      lower: Uh(p.lower, p.lowerOpen ? e.MAX_KEY : e.MIN_KEY, v),
                      lowerOpen: !0,
                      upper: Uh(p.upper, p.upperOpen ? e.MIN_KEY : e.MAX_KEY, v),
                      upperOpen: !0,
                    }),
                },
              }
            : d;
          var p, v;
        }
        return {
          ...n,
          schema: {
            ...r,
            primaryKey: s,
            indexes: o,
            getIndexByKeyPath: function (d) {
              const h = i[Bc(d)];
              return h && h[0];
            },
          },
          count: (d) => n.count(u(d)),
          query: (d) => n.query(u(d)),
          openCursor(d) {
            const { keyTail: h, isVirtual: p, keyLength: v } = d.query.index;
            return p
              ? n.openCursor(u(d)).then(
                  (b) =>
                    b &&
                    (function (y) {
                      return Object.create(y, {
                        continue: {
                          value: function (x) {
                            x != null
                              ? y.continue(Uh(x, d.reverse ? e.MAX_KEY : e.MIN_KEY, h))
                              : d.unique
                                ? y.continue(y.key.slice(0, v).concat(d.reverse ? e.MIN_KEY : e.MAX_KEY, h))
                                : y.continue();
                          },
                        },
                        continuePrimaryKey: {
                          value(x, S) {
                            y.continuePrimaryKey(Uh(x, e.MAX_KEY, h), S);
                          },
                        },
                        primaryKey: {
                          get: () => y.primaryKey,
                        },
                        key: {
                          get() {
                            const x = y.key;
                            return v === 1 ? x[0] : x.slice(0, v);
                          },
                        },
                        value: {
                          get: () => y.value,
                        },
                      });
                    })(b),
                )
              : n.openCursor(d);
          },
        };
      },
    };
  },
};
function GA(e, t, n, r) {
  return (
    (n = n || {}),
    (r = r || ""),
    Ht(e).forEach((i) => {
      if (fr(t, i)) {
        var o = e[i],
          a = t[i];
        if (typeof o == "object" && typeof a == "object" && o && a) {
          const s = wS(o);
          s !== wS(a) ? (n[r + i] = t[i]) : s === "Object" ? GA(o, a, n, r + i + ".") : o !== a && (n[r + i] = t[i]);
        } else o !== a && (n[r + i] = t[i]);
      } else n[r + i] = void 0;
    }),
    Ht(t).forEach((i) => {
      fr(e, i) || (n[r + i] = t[i]);
    }),
    n
  );
}
const TX = {
  stack: "dbcore",
  name: "HooksMiddleware",
  level: 2,
  create: (e) => ({
    ...e,
    table(t) {
      const n = e.table(t),
        { primaryKey: r } = n.schema;
      return {
        ...n,
        mutate(o) {
          const a = $e.trans,
            { deleting: s, creating: u, updating: c } = a.table(t).hook;
          switch (o.type) {
            case "add":
              if (u.fire === vt) break;
              return a._promise("readwrite", () => d(o), !0);
            case "put":
              if (u.fire === vt && c.fire === vt) break;
              return a._promise("readwrite", () => d(o), !0);
            case "delete":
              if (s.fire === vt) break;
              return a._promise("readwrite", () => d(o), !0);
            case "deleteRange":
              if (s.fire === vt) break;
              return a._promise(
                "readwrite",
                () =>
                  (function (p) {
                    return h(p.trans, p.range, 1e4);
                  })(o),
                !0,
              );
          }
          return n.mutate(o);
          function d(p) {
            const v = $e.trans,
              b =
                p.keys ||
                (function (y, w) {
                  return w.type === "delete" ? w.keys : w.keys || w.values.map(y.extractKey);
                })(r, p);
            if (!b) throw new Error("Keys missing");
            return (
              (p =
                p.type === "add" || p.type === "put"
                  ? {
                      ...p,
                      keys: b,
                    }
                  : {
                      ...p,
                    }).type !== "delete" && (p.values = [...p.values]),
              p.keys && (p.keys = [...p.keys]),
              (function (y, w, x) {
                return w.type === "add"
                  ? Promise.resolve([])
                  : y.getMany({
                      trans: w.trans,
                      keys: x,
                      cache: "immutable",
                    });
              })(n, p, b).then((y) => {
                const w = b.map((x, S) => {
                  const _ = y[S],
                    E = {
                      onerror: null,
                      onsuccess: null,
                    };
                  if (p.type === "delete") s.fire.call(E, x, _, v);
                  else if (p.type === "add" || _ === void 0) {
                    const P = u.fire.call(E, x, p.values[S], v);
                    x == null && P != null && ((x = P), (p.keys[S] = x), r.outbound || Zr(p.values[S], r.keyPath, x));
                  } else {
                    const P = GA(_, p.values[S]),
                      O = c.fire.call(E, P, x, _, v);
                    if (O) {
                      const k = p.values[S];
                      Object.keys(O).forEach((R) => {
                        fr(k, R) ? (k[R] = O[R]) : Zr(k, R, O[R]);
                      });
                    }
                  }
                  return E;
                });
                return n
                  .mutate(p)
                  .then(({ failures: x, results: S, numFailures: _, lastResult: E }) => {
                    for (let P = 0; P < b.length; ++P) {
                      const O = S ? S[P] : b[P],
                        k = w[P];
                      O == null
                        ? k.onerror && k.onerror(x[P])
                        : k.onsuccess && k.onsuccess(p.type === "put" && y[P] ? p.values[P] : O);
                    }
                    return {
                      failures: x,
                      results: S,
                      numFailures: _,
                      lastResult: E,
                    };
                  })
                  .catch((x) => (w.forEach((S) => S.onerror && S.onerror(x)), Promise.reject(x)));
              })
            );
          }
          function h(p, v, b) {
            return n
              .query({
                trans: p,
                values: !1,
                query: {
                  index: r,
                  range: v,
                },
                limit: b,
              })
              .then(({ result: y }) =>
                d({
                  type: "delete",
                  keys: y,
                  trans: p,
                }).then((w) =>
                  w.numFailures > 0
                    ? Promise.reject(w.failures[0])
                    : y.length < b
                      ? {
                          failures: [],
                          numFailures: 0,
                          lastResult: void 0,
                        }
                      : h(
                          p,
                          {
                            ...v,
                            lower: y[y.length - 1],
                            lowerOpen: !0,
                          },
                          b,
                        ),
                ),
              );
          }
        },
      };
    },
  }),
};
function $B(e, t, n) {
  try {
    if (!t || t.keys.length < e.length) return null;
    const r = [];
    for (let i = 0, o = 0; i < t.keys.length && o < e.length; ++i)
      Bn(t.keys[i], e[o]) === 0 && (r.push(n ? sd(t.values[i]) : t.values[i]), ++o);
    return r.length === e.length ? r : null;
  } catch {
    return null;
  }
}
const CX = {
  stack: "dbcore",
  level: -1,
  create: (e) => ({
    table: (t) => {
      const n = e.table(t);
      return {
        ...n,
        getMany: (r) => {
          if (!r.cache) return n.getMany(r);
          const i = $B(r.keys, r.trans._cache, r.cache === "clone");
          return i
            ? Ae.resolve(i)
            : n.getMany(r).then(
                (o) => (
                  (r.trans._cache = {
                    keys: r.keys,
                    values: r.cache === "clone" ? sd(o) : o,
                  }),
                  o
                ),
              );
        },
        mutate: (r) => (r.type !== "add" && (r.trans._cache = null), n.mutate(r)),
      };
    },
  }),
};
function YA(e) {
  return !("from" in e);
}
const Fi = function (e, t) {
  if (!this) {
    const n = new Fi();
    return e && "d" in e && zn(n, e), n;
  }
  zn(
    this,
    arguments.length
      ? {
          d: 1,
          from: e,
          to: arguments.length > 1 ? t : e,
        }
      : {
          d: 0,
        },
  );
};
function uf(e, t, n) {
  const r = Bn(t, n);
  if (isNaN(r)) return;
  if (r > 0) throw RangeError();
  if (YA(e))
    return zn(e, {
      from: t,
      to: n,
      d: 1,
    });
  const i = e.l,
    o = e.r;
  if (Bn(n, e.from) < 0)
    return (
      i
        ? uf(i, t, n)
        : (e.l = {
            from: t,
            to: n,
            d: 1,
            l: null,
            r: null,
          }),
      Dj(e)
    );
  if (Bn(t, e.to) > 0)
    return (
      o
        ? uf(o, t, n)
        : (e.r = {
            from: t,
            to: n,
            d: 1,
            l: null,
            r: null,
          }),
      Dj(e)
    );
  Bn(t, e.from) < 0 && ((e.from = t), (e.l = null), (e.d = o ? o.d + 1 : 1)),
    Bn(n, e.to) > 0 && ((e.to = n), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1));
  const a = !e.r;
  i && !e.l && Vp(e, i), o && a && Vp(e, o);
}
function Vp(e, t) {
  YA(t) ||
    (function n(r, { from: i, to: o, l: a, r: s }) {
      uf(r, i, o), a && n(r, a), s && n(r, s);
    })(e, t);
}
function kX(e, t) {
  const n = zS(t);
  let r = n.next();
  if (r.done) return !1;
  let i = r.value;
  const o = zS(e);
  let a = o.next(i.from),
    s = a.value;
  for (; !r.done && !a.done; ) {
    if (Bn(s.from, i.to) <= 0 && Bn(s.to, i.from) >= 0) return !0;
    Bn(i.from, s.from) < 0 ? (i = (r = n.next(s.from)).value) : (s = (a = o.next(i.from)).value);
  }
  return !1;
}
function zS(e) {
  let t = YA(e)
    ? null
    : {
        s: 0,
        n: e,
      };
  return {
    next(n) {
      const r = arguments.length > 0;
      for (; t; )
        switch (t.s) {
          case 0:
            if (((t.s = 1), r))
              for (; t.n.l && Bn(n, t.n.from) < 0; )
                t = {
                  up: t,
                  n: t.n.l,
                  s: 1,
                };
            else
              for (; t.n.l; )
                t = {
                  up: t,
                  n: t.n.l,
                  s: 1,
                };
          case 1:
            if (((t.s = 2), !r || Bn(n, t.n.to) <= 0))
              return {
                value: t.n,
                done: !1,
              };
          case 2:
            if (t.n.r) {
              (t.s = 3),
                (t = {
                  up: t,
                  n: t.n.r,
                  s: 0,
                });
              continue;
            }
          case 3:
            t = t.up;
        }
      return {
        done: !0,
      };
    },
  };
}
function Dj(e) {
  var t, n;
  const r =
      (((t = e.r) === null || t === void 0 ? void 0 : t.d) || 0) -
      (((n = e.l) === null || n === void 0 ? void 0 : n.d) || 0),
    i = r > 1 ? "r" : r < -1 ? "l" : "";
  if (i) {
    const o = i === "r" ? "l" : "r",
      a = {
        ...e,
      },
      s = e[i];
    (e.from = s.from), (e.to = s.to), (e[i] = s[i]), (a[i] = s[o]), (e[o] = a), (a.d = $j(a));
  }
  e.d = $j(e);
}
function $j({ r: e, l: t }) {
  return (e ? (t ? Math.max(e.d, t.d) : e.d) : t ? t.d : 0) + 1;
}
Rl(Fi.prototype, {
  add(e) {
    return Vp(this, e), this;
  },
  addKey(e) {
    return uf(this, e, e), this;
  },
  addKeys(e) {
    return e.forEach((t) => uf(this, t, t)), this;
  },
  [xS]() {
    return zS(this);
  },
});
const jX = {
  stack: "dbcore",
  level: 0,
  create: (e) => {
    const t = e.schema.name,
      n = new Fi(e.MIN_KEY, e.MAX_KEY);
    return {
      ...e,
      table: (r) => {
        const i = e.table(r),
          { schema: o } = i,
          { primaryKey: a } = o,
          { extractKey: s, outbound: u } = a,
          c = {
            ...i,
            mutate: (p) => {
              const v = p.trans,
                b = v.mutatedParts || (v.mutatedParts = {}),
                y = (O) => {
                  const k = `idb://${t}/${r}/${O}`;
                  return b[k] || (b[k] = new Fi());
                },
                w = y(""),
                x = y(":dels"),
                { type: S } = p;
              let [_, E] =
                p.type === "deleteRange"
                  ? [p.range]
                  : p.type === "delete"
                    ? [p.keys]
                    : p.values.length < 50
                      ? [[], p.values]
                      : [];
              const P = p.trans._cache;
              return i.mutate(p).then((O) => {
                if (Rn(_)) {
                  S !== "delete" && (_ = O.results), w.addKeys(_);
                  const k = $B(_, P);
                  k || S === "add" || x.addKeys(_),
                    (k || E) &&
                      (function (R, M, D, I) {
                        function V(z) {
                          const q = R(z.name || "");
                          function U(F) {
                            return F != null ? z.extractKey(F) : null;
                          }
                          const B = (F) => (z.multiEntry && Rn(F) ? F.forEach((L) => q.addKey(L)) : q.addKey(F));
                          (D || I).forEach((F, L) => {
                            const W = D && U(D[L]),
                              G = I && U(I[L]);
                            Bn(W, G) !== 0 && (W != null && B(W), G != null && B(G));
                          });
                        }
                        M.indexes.forEach(V);
                      })(y, o, k, E);
                } else if (_) {
                  const k = {
                    from: _.lower,
                    to: _.upper,
                  };
                  x.add(k), w.add(k);
                } else w.add(n), x.add(n), o.indexes.forEach((k) => y(k.name).add(n));
                return O;
              });
            },
          },
          d = ({ query: { index: p, range: v } }) => {
            var b, y;
            return [
              p,
              new Fi(
                (b = v.lower) !== null && b !== void 0 ? b : e.MIN_KEY,
                (y = v.upper) !== null && y !== void 0 ? y : e.MAX_KEY,
              ),
            ];
          },
          h = {
            get: (p) => [a, new Fi(p.key)],
            getMany: (p) => [a, new Fi().addKeys(p.keys)],
            count: d,
            query: d,
            openCursor: d,
          };
        return (
          Ht(h).forEach((p) => {
            c[p] = function (v) {
              const { subscr: b } = $e;
              if (b) {
                const y = (E) => {
                    const P = `idb://${t}/${r}/${E}`;
                    return b[P] || (b[P] = new Fi());
                  },
                  w = y(""),
                  x = y(":dels"),
                  [S, _] = h[p](v);
                if ((y(S.name || "").add(_), !S.isPrimaryKey)) {
                  if (p !== "count") {
                    const E =
                      p === "query" &&
                      u &&
                      v.values &&
                      i.query({
                        ...v,
                        values: !1,
                      });
                    return i[p].apply(this, arguments).then((P) => {
                      if (p === "query") {
                        if (u && v.values) return E.then(({ result: k }) => (w.addKeys(k), P));
                        const O = v.values ? P.result.map(s) : P.result;
                        v.values ? w.addKeys(O) : x.addKeys(O);
                      } else if (p === "openCursor") {
                        const O = P,
                          k = v.values;
                        return (
                          O &&
                          Object.create(O, {
                            key: {
                              get: () => (x.addKey(O.primaryKey), O.key),
                            },
                            primaryKey: {
                              get() {
                                const R = O.primaryKey;
                                return x.addKey(R), R;
                              },
                            },
                            value: {
                              get: () => (k && w.addKey(O.primaryKey), O.value),
                            },
                          })
                        );
                      }
                      return P;
                    });
                  }
                  x.add(n);
                }
              }
              return i[p].apply(this, arguments);
            };
          }),
          c
        );
      },
    };
  },
};
class Dexie {
  constructor(t, n) {
    (this._middlewares = {}), (this.verno = 0);
    const r = Dexie.dependencies;
    (this._options = n =
      {
        addons: Dexie.addons,
        autoOpen: !0,
        indexedDB: r.indexedDB,
        IDBKeyRange: r.IDBKeyRange,
        ...n,
      }),
      (this._deps = {
        indexedDB: n.indexedDB,
        IDBKeyRange: n.IDBKeyRange,
      });
    const { addons: i } = n;
    (this._dbSchema = {}),
      (this._versions = []),
      (this._storeNames = []),
      (this._allTables = {}),
      (this.idbdb = null),
      (this._novip = this);
    const o = {
      dbOpenError: null,
      isBeingOpened: !1,
      onReadyBeingFired: null,
      openComplete: !1,
      dbReadyResolve: vt,
      dbReadyPromise: null,
      cancelOpen: vt,
      openCanceller: null,
      autoSchema: !0,
      PR1398_maxLoop: 3,
    };
    var a;
    (o.dbReadyPromise = new Ae((s) => {
      o.dbReadyResolve = s;
    })),
      (o.openCanceller = new Ae((s, u) => {
        o.cancelOpen = u;
      })),
      (this._state = o),
      (this.name = t),
      (this.on = Lc(this, "populate", "blocked", "versionchange", "close", {
        ready: [zA, vt],
      })),
      (this.on.ready.subscribe = uB(this.on.ready.subscribe, (s) => (u, c) => {
        Dexie.vip(() => {
          const d = this._state;
          if (d.openComplete) d.dbOpenError || Ae.resolve().then(u), c && s(u);
          else if (d.onReadyBeingFired) d.onReadyBeingFired.push(u), c && s(u);
          else {
            s(u);
            const h = this;
            c ||
              s(function p() {
                h.on.ready.unsubscribe(u), h.on.ready.unsubscribe(p);
              });
          }
        });
      })),
      (this.Collection =
        ((a = this),
        mc(pX.prototype, function (s, u) {
          this.db = a;
          let c = kB,
            d = null;
          if (u)
            try {
              c = u();
            } catch (b) {
              d = b;
            }
          const h = s._ctx,
            p = h.table,
            v = p.hook.reading.fire;
          this._ctx = {
            table: p,
            index: h.index,
            isPrimKey: !h.index || (p.schema.primKey.keyPath && h.index === p.schema.primKey.name),
            range: c,
            keysOnly: !1,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: !0,
            isMatch: null,
            offset: 0,
            limit: 1 / 0,
            error: d,
            or: h.or,
            valueMapper: v !== rf ? v : null,
          };
        }))),
      (this.Table = (function (s) {
        return mc(hX.prototype, function (u, c, d) {
          (this.db = s),
            (this._tx = d),
            (this.name = u),
            (this.schema = c),
            (this.hook = s._allTables[u]
              ? s._allTables[u].hook
              : Lc(null, {
                  creating: [tX, vt],
                  reading: [eX, rf],
                  updating: [rX, vt],
                  deleting: [nX, vt],
                }));
        });
      })(this)),
      (this.Transaction = (function (s) {
        return mc(gX.prototype, function (u, c, d, h, p) {
          (this.db = s),
            (this.mode = u),
            (this.storeNames = c),
            (this.schema = d),
            (this.chromeTransactionDurability = h),
            (this.idbtrans = null),
            (this.on = Lc(this, "complete", "error", "abort")),
            (this.parent = p || null),
            (this.active = !0),
            (this._reculock = 0),
            (this._blockedFuncs = []),
            (this._resolve = null),
            (this._reject = null),
            (this._waitingFor = null),
            (this._waitingQueue = null),
            (this._spinCount = 0),
            (this._completion = new Ae((v, b) => {
              (this._resolve = v), (this._reject = b);
            })),
            this._completion.then(
              () => {
                (this.active = !1), this.on.complete.fire();
              },
              (v) => {
                var b = this.active;
                return (
                  (this.active = !1),
                  this.on.error.fire(v),
                  this.parent ? this.parent._reject(v) : b && this.idbtrans && this.idbtrans.abort(),
                  en(v)
                );
              },
            );
        });
      })(this)),
      (this.Version = (function (s) {
        return mc(_X.prototype, function (u) {
          (this.db = s),
            (this._cfg = {
              version: u,
              storesSource: null,
              dbschema: {},
              tables: {},
              contentUpgrade: null,
            });
        });
      })(this)),
      (this.WhereClause = (function (s) {
        return mc(RB.prototype, function (u, c, d) {
          (this.db = s),
            (this._ctx = {
              table: u,
              index: c === ":id" ? null : c,
              or: d,
            });
          const h = s._deps.indexedDB;
          if (!h) throw new He.MissingAPI();
          (this._cmp = this._ascending = h.cmp.bind(h)),
            (this._descending = (p, v) => h.cmp(v, p)),
            (this._max = (p, v) => (h.cmp(p, v) > 0 ? p : v)),
            (this._min = (p, v) => (h.cmp(p, v) < 0 ? p : v)),
            (this._IDBKeyRange = s._deps.IDBKeyRange);
        });
      })(this)),
      this.on("versionchange", (s) => {
        s.newVersion > 0
          ? console.warn(
              `Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`,
            )
          : console.warn(
              `Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`,
            ),
          this.close();
      }),
      this.on("blocked", (s) => {
        !s.newVersion || s.newVersion < s.oldVersion
          ? console.warn(`Dexie.delete('${this.name}') was blocked`)
          : console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${s.oldVersion / 10}`);
      }),
      (this._maxKey = lf(n.IDBKeyRange)),
      (this._createTransaction = (s, u, c, d) =>
        new this.Transaction(s, u, c, this._options.chromeTransactionDurability, d)),
      (this._fireOnBlocked = (s) => {
        this.on("blocked").fire(s),
          $c
            .filter((u) => u.name === this.name && u !== this && !u._state.vcFired)
            .map((u) => u.on("versionchange").fire(s));
      }),
      this.use(EX),
      this.use(TX),
      this.use(jX),
      this.use(CX),
      (this.vip = Object.create(this, {
        _vip: {
          value: !0,
        },
      })),
      i.forEach((s) => s(this));
  }
  version(t) {
    if (isNaN(t) || t < 0.1) throw new He.Type("Given version is not a positive number");
    if (((t = Math.round(10 * t) / 10), this.idbdb || this._state.isBeingOpened))
      throw new He.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, t);
    const n = this._versions;
    var r = n.filter((i) => i._cfg.version === t)[0];
    return r || ((r = new this.Version(t)), n.push(r), n.sort(xX), r.stores({}), (this._state.autoSchema = !1), r);
  }
  _whenReady(t) {
    return this.idbdb && (this._state.openComplete || $e.letThrough || this._vip)
      ? t()
      : new Ae((n, r) => {
          if (this._state.openComplete) return r(new He.DatabaseClosed(this._state.dbOpenError));
          if (!this._state.isBeingOpened) {
            if (!this._options.autoOpen) return void r(new He.DatabaseClosed());
            this.open().catch(vt);
          }
          this._state.dbReadyPromise.then(n, r);
        }).then(t);
  }
  use({ stack: t, create: n, level: r, name: i }) {
    i &&
      this.unuse({
        stack: t,
        name: i,
      });
    const o = this._middlewares[t] || (this._middlewares[t] = []);
    return (
      o.push({
        stack: t,
        create: n,
        level: r ?? 10,
        name: i,
      }),
      o.sort((a, s) => a.level - s.level),
      this
    );
  }
  unuse({ stack: t, name: n, create: r }) {
    return (
      t &&
        this._middlewares[t] &&
        (this._middlewares[t] = this._middlewares[t].filter((i) => (r ? i.create !== r : !!n && i.name !== n))),
      this
    );
  }
  open() {
    return AX(this);
  }
  _close() {
    const t = this._state,
      n = $c.indexOf(this);
    if ((n >= 0 && $c.splice(n, 1), this.idbdb)) {
      try {
        this.idbdb.close();
      } catch {}
      this._novip.idbdb = null;
    }
    (t.dbReadyPromise = new Ae((r) => {
      t.dbReadyResolve = r;
    })),
      (t.openCanceller = new Ae((r, i) => {
        t.cancelOpen = i;
      }));
  }
  close() {
    this._close();
    const t = this._state;
    (this._options.autoOpen = !1),
      (t.dbOpenError = new He.DatabaseClosed()),
      t.isBeingOpened && t.cancelOpen(t.dbOpenError);
  }
  delete() {
    const t = arguments.length > 0,
      n = this._state;
    return new Ae((r, i) => {
      const o = () => {
        this.close();
        var a = this._deps.indexedDB.deleteDatabase(this.name);
        (a.onsuccess = Ct(() => {
          (function ({ indexedDB: s, IDBKeyRange: u }, c) {
            !KA(s) && c !== Ev && HA(s, u).delete(c).catch(vt);
          })(this._deps, this.name),
            r();
        })),
          (a.onerror = ci(i)),
          (a.onblocked = this._fireOnBlocked);
      };
      if (t) throw new He.InvalidArgument("Arguments not allowed in db.delete()");
      n.isBeingOpened ? n.dbReadyPromise.then(o) : o();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return this.idbdb !== null;
  }
  hasBeenClosed() {
    const t = this._state.dbOpenError;
    return t && t.name === "DatabaseClosed";
  }
  hasFailed() {
    return this._state.dbOpenError !== null;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return Ht(this._allTables).map((t) => this._allTables[t]);
  }
  transaction() {
    const t = OX.apply(this, arguments);
    return this._transaction.apply(this, t);
  }
  _transaction(t, n, r) {
    let i = $e.trans;
    (i && i.db === this && t.indexOf("!") === -1) || (i = null);
    const o = t.indexOf("?") !== -1;
    let a, s;
    t = t.replace("!", "").replace("?", "");
    try {
      if (
        ((s = n.map((c) => {
          var d = c instanceof this.Table ? c.name : c;
          if (typeof d != "string")
            throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
          return d;
        })),
        t == "r" || t === I0)
      )
        a = I0;
      else {
        if (t != "rw" && t != D0) throw new He.InvalidArgument("Invalid transaction mode: " + t);
        a = D0;
      }
      if (i) {
        if (i.mode === I0 && a === D0) {
          if (!o)
            throw new He.SubTransaction(
              "Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY",
            );
          i = null;
        }
        i &&
          s.forEach((c) => {
            if (i && i.storeNames.indexOf(c) === -1) {
              if (!o) throw new He.SubTransaction("Table " + c + " not included in parent transaction.");
              i = null;
            }
          }),
          o && i && !i.active && (i = null);
      }
    } catch (c) {
      return i
        ? i._promise(null, (d, h) => {
            h(c);
          })
        : en(c);
    }
    const u = DB.bind(null, this, a, s, i, r);
    return i ? i._promise(a, u, "lock") : $e.trans ? mu($e.transless, () => this._whenReady(u)) : this._whenReady(u);
  }
  table(t) {
    if (!fr(this._allTables, t)) throw new He.InvalidTable(`Table ${t} does not exist`);
    return this._allTables[t];
  }
}
const RX = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable";
class MX {
  constructor(t) {
    this._subscribe = t;
  }
  subscribe(t, n, r) {
    return this._subscribe(
      t && typeof t != "function"
        ? t
        : {
            next: t,
            error: n,
            complete: r,
          },
    );
  }
  [RX]() {
    return this;
  }
}
function LB(e, t) {
  return (
    Ht(t).forEach((n) => {
      Vp(e[n] || (e[n] = new Fi()), t[n]);
    }),
    e
  );
}
function NX(e) {
  let t,
    n = !1;
  const r = new MX((i) => {
    const o = BA(e);
    let a = !1,
      s = {},
      u = {};
    const c = {
      get closed() {
        return a;
      },
      unsubscribe: () => {
        (a = !0), la.storagemutated.unsubscribe(v);
      },
    };
    i.start && i.start(c);
    let d = !1,
      h = !1;
    function p() {
      return Ht(u).some((y) => s[y] && kX(s[y], u[y]));
    }
    const v = (y) => {
        LB(s, y), p() && b();
      },
      b = () => {
        if (d || a) return;
        s = {};
        const y = {},
          w = (function (x) {
            o && pu();
            const S = () =>
                aa(e, {
                  subscr: x,
                  trans: null,
                }),
              _ = $e.trans ? mu($e.transless, S) : S();
            return o && _.then(so, so), _;
          })(y);
        h || (la(sf, v), (h = !0)),
          (d = !0),
          Promise.resolve(w).then(
            (x) => {
              (n = !0), (t = x), (d = !1), a || (p() ? b() : ((s = {}), (u = y), i.next && i.next(x)));
            },
            (x) => {
              (d = !1), (n = !1), i.error && i.error(x), c.unsubscribe();
            },
          );
      };
    return b(), c;
  });
  return (r.hasValue = () => n), (r.getValue = () => t), r;
}
let qS;
try {
  qS = {
    indexedDB: At.indexedDB || At.mozIndexedDB || At.webkitIndexedDB || At.msIndexedDB,
    IDBKeyRange: At.IDBKeyRange || At.webkitIDBKeyRange,
  };
} catch {
  qS = {
    indexedDB: null,
    IDBKeyRange: null,
  };
}
const Ia = Dexie;
function bp(e) {
  let t = qi;
  try {
    (qi = !0), la.storagemutated.fire(e);
  } finally {
    qi = t;
  }
}
Rl(Ia, {
  ...hp,
  delete: (e) =>
    new Ia(e, {
      addons: [],
    }).delete(),
  exists: (e) =>
    new Ia(e, {
      addons: [],
    })
      .open()
      .then((t) => (t.close(), !0))
      .catch("NoSuchDatabaseError", () => !1),
  getDatabaseNames(e) {
    try {
      return (function ({ indexedDB: t, IDBKeyRange: n }) {
        return KA(t)
          ? Promise.resolve(t.databases()).then((r) => r.map((i) => i.name).filter((i) => i !== Ev))
          : HA(t, n).toCollection().primaryKeys();
      })(Ia.dependencies).then(e);
    } catch {
      return en(new He.MissingAPI());
    }
  },
  defineClass: () =>
    function (e) {
      zn(this, e);
    },
  ignoreTransaction: (e) => ($e.trans ? mu($e.transless, e) : e()),
  vip: FS,
  async: function (e) {
    return function () {
      try {
        var t = VS(e.apply(this, arguments));
        return t && typeof t.then == "function" ? t : Ae.resolve(t);
      } catch (n) {
        return en(n);
      }
    };
  },
  spawn: function (e, t, n) {
    try {
      var r = VS(e.apply(n, t || []));
      return r && typeof r.then == "function" ? r : Ae.resolve(r);
    } catch (i) {
      return en(i);
    }
  },
  currentTransaction: {
    get: () => $e.trans || null,
  },
  waitFor: function (e, t) {
    const n = Ae.resolve(typeof e == "function" ? Ia.ignoreTransaction(e) : e).timeout(t || 6e4);
    return $e.trans ? $e.trans.waitFor(n) : n;
  },
  Promise: Ae,
  debug: {
    get: () => Ti,
    set: (e) => {
      mB(e, e === "dexie" ? () => !0 : CB);
    },
  },
  derive: Sl,
  extend: zn,
  props: Rl,
  override: uB,
  Events: Lc,
  on: la,
  liveQuery: NX,
  extendObservabilitySet: LB,
  getByKeyPath: Qi,
  setByKeyPath: Zr,
  delByKeyPath: function (e, t) {
    typeof t == "string"
      ? Zr(e, t, void 0)
      : "length" in t &&
        [].map.call(t, function (n) {
          Zr(e, n, void 0);
        });
  },
  shallowClone: dB,
  deepClone: sd,
  getObjectDiff: GA,
  cmp: Bn,
  asap: cB,
  minKey: RS,
  addons: [],
  connections: $c,
  errnames: VA,
  dependencies: qS,
  semVer: kj,
  version: kj
    .split(".")
    .map((e) => parseInt(e))
    .reduce((e, t, n) => e + t / Math.pow(10, 2 * n)),
}),
  (Ia.maxKey = lf(Ia.dependencies.IDBKeyRange)),
  typeof dispatchEvent < "u" &&
    typeof addEventListener < "u" &&
    (la(sf, (e) => {
      if (!qi) {
        let t;
        Ov
          ? ((t = document.createEvent("CustomEvent")), t.initCustomEvent(Xo, !0, !0, e))
          : (t = new CustomEvent(Xo, {
              detail: e,
            })),
          (qi = !0),
          dispatchEvent(t),
          (qi = !1);
      }
    }),
    addEventListener(Xo, ({ detail: e }) => {
      qi || bp(e);
    }));
let qi = !1;
if (typeof BroadcastChannel < "u") {
  const e = new BroadcastChannel(Xo);
  typeof e.unref == "function" && e.unref(),
    la(sf, (t) => {
      qi || e.postMessage(t);
    }),
    (e.onmessage = (t) => {
      t.data && bp(t.data);
    });
} else if (typeof self < "u" && typeof navigator < "u") {
  la(sf, (t) => {
    try {
      qi ||
        (typeof localStorage < "u" &&
          localStorage.setItem(
            Xo,
            JSON.stringify({
              trig: Math.random(),
              changedParts: t,
            }),
          ),
        typeof self.clients == "object" &&
          [
            ...self.clients.matchAll({
              includeUncontrolled: !0,
            }),
          ].forEach((n) =>
            n.postMessage({
              type: Xo,
              changedParts: t,
            }),
          ));
    } catch {}
  }),
    typeof addEventListener < "u" &&
      addEventListener("storage", (t) => {
        if (t.key === Xo) {
          const n = JSON.parse(t.newValue);
          n && bp(n.changedParts);
        }
      });
  const e = self.document && navigator.serviceWorker;
  e &&
    e.addEventListener("message", function ({ data: t }) {
      t && t.type === Xo && bp(t.changedParts);
    });
}
(Ae.rejectionMapper = function (e, t) {
  if (!e || e instanceof _l || e instanceof TypeError || e instanceof SyntaxError || !e.name || !Oj[e.name]) return e;
  var n = new Oj[e.name](t || e.message, e);
  return (
    "stack" in e &&
      Zi(n, "stack", {
        get: function () {
          return this.inner.stack;
        },
      }),
    n
  );
}),
  mB(Ti, CB);
