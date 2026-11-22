function L5(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
var ef;
(function (e) {
  (e.event = "event"), (e.props = "prop");
})(ef || (ef = {}));
function Yo() {}
function hG(e) {
  var t,
    n = void 0;
  return function () {
    for (var r = [], i = arguments.length; i--; ) r[i] = arguments[i];
    return (
      (t &&
        r.length === t.length &&
        r.every(function (o, a) {
          return o === t[a];
        })) ||
        ((t = r), (n = e.apply(void 0, r))),
      n
    );
  };
}
function tf(e) {
  return !!(e || "").match(/\d/);
}
function bl(e) {
  return e == null;
}
function pG(e) {
  return typeof e == "number" && isNaN(e);
}
function B5(e) {
  return bl(e) || pG(e) || (typeof e == "number" && !isFinite(e));
}
function F5(e) {
  return e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function mG(e) {
  switch (e) {
    case "lakh":
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case "wan":
      return /(\d)(?=(\d{4})+(?!\d))/g;
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function vG(e, t, n) {
  var r = mG(n),
    i = e.search(/[1-9]/);
  return (i = i === -1 ? e.length : i), e.substring(0, i) + e.substring(i, e.length).replace(r, "$1" + t);
}
function yG(e) {
  var t = React.useRef(e);
  t.current = e;
  var n = React.useRef(function () {
    for (var r = [], i = arguments.length; i--; ) r[i] = arguments[i];
    return t.current.apply(t, r);
  });
  return n.current;
}
function EA(e, t) {
  t === void 0 && (t = !0);
  var n = e[0] === "-",
    r = n && t;
  e = e.replace("-", "");
  var i = e.split("."),
    o = i[0],
    a = i[1] || "";
  return {
    beforeDecimal: o,
    afterDecimal: a,
    hasNegation: n,
    addNegation: r,
  };
}
function gG(e) {
  if (!e) return e;
  var t = e[0] === "-";
  t && (e = e.substring(1, e.length));
  var n = e.split("."),
    r = n[0].replace(/^0+/, "") || "0",
    i = n[1] || "";
  return (t ? "-" : "") + r + (i ? "." + i : "");
}
function V5(e, t, n) {
  for (var r = "", i = n ? "0" : "", o = 0; o <= t - 1; o++) r += e[o] || i;
  return r;
}
function uj(e, t) {
  return Array(t + 1).join(e);
}
function z5(e) {
  var t = e + "",
    n = t[0] === "-" ? "-" : "";
  n && (t = t.substring(1));
  var r = t.split(/[eE]/g),
    i = r[0],
    o = r[1];
  if (((o = Number(o)), !o)) return n + i;
  i = i.replace(".", "");
  var a = 1 + o,
    s = i.length;
  return (
    a < 0
      ? (i = "0." + uj("0", Math.abs(a)) + i)
      : a >= s
        ? (i = i + uj("0", a - s))
        : (i = (i.substring(0, a) || "0") + "." + i.substring(a)),
    n + i
  );
}
function cj(e, t, n) {
  if (["", "-"].indexOf(e) !== -1) return e;
  var r = (e.indexOf(".") !== -1 || n) && t,
    i = EA(e),
    o = i.beforeDecimal,
    a = i.afterDecimal,
    s = i.hasNegation,
    u = parseFloat("0." + (a || "0")),
    c = a.length <= t ? "0." + a : u.toFixed(t),
    d = c.split("."),
    h = o;
  o &&
    Number(d[0]) &&
    (h = o
      .split("")
      .reverse()
      .reduce(function (y, w, x) {
        return y.length > x ? (Number(y[0]) + Number(w)).toString() + y.substring(1, y.length) : w + y;
      }, d[0]));
  var p = V5(d[1] || "", t, n),
    v = s ? "-" : "",
    b = r ? "." : "";
  return "" + v + h + b + p;
}
function Wa(e, t) {
  if (((e.value = e.value), e !== null)) {
    if (e.createTextRange) {
      var n = e.createTextRange();
      return n.move("character", t), n.select(), !0;
    }
    return e.selectionStart || e.selectionStart === 0 ? (e.focus(), e.setSelectionRange(t, t), !0) : (e.focus(), !1);
  }
}
var q5 = hG(function (e, t) {
    for (var n = 0, r = 0, i = e.length, o = t.length; e[n] === t[n] && n < i; ) n++;
    for (; e[i - 1 - r] === t[o - 1 - r] && o - r > n && i - r > n; ) r++;
    return {
      from: {
        start: n,
        end: i - r,
      },
      to: {
        start: n,
        end: o - r,
      },
    };
  }),
  bG = function (e, t) {
    var n = Math.min(e.selectionStart, t);
    return {
      from: {
        start: n,
        end: e.selectionEnd,
      },
      to: {
        start: n,
        end: t,
      },
    };
  };
function wG(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function O0(e) {
  return Math.max(e.selectionStart, e.selectionEnd);
}
function xG() {
  return typeof navigator < "u" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function SG(e) {
  return {
    from: {
      start: 0,
      end: 0,
    },
    to: {
      start: 0,
      end: e.length,
    },
    lastValue: "",
  };
}
function _G(e) {
  var t = e.currentValue,
    n = e.formattedValue,
    r = e.currentValueIndex,
    i = e.formattedValueIndex;
  return t[r] === n[i];
}
function PG(e, t, n, r, i, o, a) {
  a === void 0 && (a = _G);
  var s = i.findIndex(function (E) {
      return E;
    }),
    u = e.slice(0, s);
  !t && !n.startsWith(u) && ((t = u), (n = u + n), (r = r + u.length));
  for (var c = n.length, d = e.length, h = {}, p = new Array(c), v = 0; v < c; v++) {
    p[v] = -1;
    for (var b = 0, y = d; b < y; b++) {
      var w = a({
        currentValue: n,
        lastValue: t,
        formattedValue: e,
        currentValueIndex: v,
        formattedValueIndex: b,
      });
      if (w && h[b] !== !0) {
        (p[v] = b), (h[b] = !0);
        break;
      }
    }
  }
  for (var x = r; x < c && (p[x] === -1 || !o(n[x])); ) x++;
  var S = x === c || p[x] === -1 ? d : p[x];
  for (x = r - 1; x > 0 && p[x] === -1; ) x--;
  var _ = x === -1 || p[x] === -1 ? 0 : p[x] + 1;
  return _ > S ? S : r - _ < S - r ? _ : S;
}
function fj(e, t, n, r) {
  var i = e.length;
  if (((t = wG(t, 0, i)), r === "left")) {
    for (; t >= 0 && !n[t]; ) t--;
    t === -1 && (t = n.indexOf(!0));
  } else {
    for (; t <= i && !n[t]; ) t++;
    t > i && (t = n.lastIndexOf(!0));
  }
  return t === -1 && (t = i), t;
}
function AG(e) {
  for (
    var t = Array.from({
        length: e.length + 1,
      }).map(function () {
        return !0;
      }),
      n = 0,
      r = t.length;
    n < r;
    n++
  )
    t[n] = !!(tf(e[n]) || tf(e[n - 1]));
  return t;
}
function W5(e, t, n, r, i, o) {
  o === void 0 && (o = Yo);
  var a = yG(function (b, y) {
      var w, x;
      return (
        B5(b)
          ? ((x = ""), (w = ""))
          : typeof b == "number" || y
            ? ((x = typeof b == "number" ? z5(b) : b), (w = r(x)))
            : ((x = i(b, void 0)), (w = r(x))),
        {
          formattedValue: w,
          numAsString: x,
        }
      );
    }),
    s = React.useState(function () {
      return a(bl(e) ? t : e, n);
    }),
    u = s[0],
    c = s[1],
    d = function (b, y) {
      b.formattedValue !== u.formattedValue &&
        c({
          formattedValue: b.formattedValue,
          numAsString: b.value,
        }),
        o(b, y);
    },
    h = e,
    p = n;
  bl(e) && ((h = u.numAsString), (p = !0));
  var v = a(h, p);
  return (
    React.useMemo(
      function () {
        c(v);
      },
      [v.formattedValue],
    ),
    [u, d]
  );
}
function OG(e) {
  return e.replace(/[^0-9]/g, "");
}
function EG(e) {
  return e;
}
function TG(e) {
  var t = e.type;
  t === void 0 && (t = "text");
  var n = e.displayType;
  n === void 0 && (n = "input");
  var r = e.customInput,
    i = e.renderText,
    o = e.getInputRef,
    a = e.format;
  a === void 0 && (a = EG);
  var s = e.removeFormatting;
  s === void 0 && (s = OG);
  var u = e.defaultValue,
    c = e.valueIsNumericString,
    d = e.onValueChange,
    h = e.isAllowed,
    p = e.onChange;
  p === void 0 && (p = Yo);
  var v = e.onKeyDown;
  v === void 0 && (v = Yo);
  var b = e.onMouseUp;
  b === void 0 && (b = Yo);
  var y = e.onFocus;
  y === void 0 && (y = Yo);
  var w = e.onBlur;
  w === void 0 && (w = Yo);
  var x = e.value,
    S = e.getCaretBoundary;
  S === void 0 && (S = AG);
  var _ = e.isValidInputCharacter;
  _ === void 0 && (_ = tf);
  var E = e.isCharacterSame,
    P = L5(e, [
      "type",
      "displayType",
      "customInput",
      "renderText",
      "getInputRef",
      "format",
      "removeFormatting",
      "defaultValue",
      "valueIsNumericString",
      "onValueChange",
      "isAllowed",
      "onChange",
      "onKeyDown",
      "onMouseUp",
      "onFocus",
      "onBlur",
      "value",
      "getCaretBoundary",
      "isValidInputCharacter",
      "isCharacterSame",
    ]),
    O = W5(x, u, !!c, a, s, d),
    k = O[0],
    R = k.formattedValue,
    M = k.numAsString,
    D = O[1],
    I = React.useRef(),
    V = React.useRef({
      formattedValue: R,
      numAsString: M,
    }),
    z = function (se, fe) {
      (V.current = {
        formattedValue: se.formattedValue,
        numAsString: se.value,
      }),
        D(se, fe);
    },
    q = React.useState(!1),
    U = q[0],
    B = q[1],
    F = React.useRef(null),
    L = React.useRef({
      setCaretTimeout: null,
      focusTimeout: null,
    });
  React.useEffect(function () {
    return (
      B(!0),
      function () {
        clearTimeout(L.current.setCaretTimeout), clearTimeout(L.current.focusTimeout);
      }
    );
  }, []);
  var W = a,
    G = function (se, fe) {
      var we = parseFloat(fe);
      return {
        formattedValue: se,
        value: fe,
        floatValue: isNaN(we) ? void 0 : we,
      };
    },
    $ = function (se, fe, we) {
      (se.selectionStart === 0 && se.selectionEnd === se.value.length) ||
        (Wa(se, fe),
        (L.current.setCaretTimeout = setTimeout(function () {
          se.value === we && se.selectionStart !== fe && Wa(se, fe);
        }, 0)));
    },
    K = function (se, fe, we) {
      return fj(se, fe, S(se), we);
    },
    ne = function (se, fe, we) {
      var Ne = S(fe),
        Ke = PG(fe, R, se, we, Ne, _, E);
      return (Ke = fj(fe, Ke, Ne)), Ke;
    },
    he = function (se) {
      var fe = se.formattedValue;
      fe === void 0 && (fe = "");
      var we = se.input,
        Ne = se.source,
        Ke = se.event,
        Ye = se.numAsString,
        Je;
      if (we) {
        var ge = se.inputValue || we.value,
          Re = O0(we);
        (we.value = fe), (Je = ne(ge, fe, Re)), Je !== void 0 && $(we, Je, fe);
      }
      fe !== R &&
        z(G(fe, Ye), {
          event: Ke,
          source: Ne,
        });
    };
  React.useEffect(
    function () {
      var se = V.current,
        fe = se.formattedValue,
        we = se.numAsString;
      (R !== fe || M !== we) &&
        z(G(R, M), {
          event: void 0,
          source: ef.props,
        });
    },
    [R, M],
  );
  var le = F.current ? O0(F.current) : void 0,
    pe = typeof window < "u" ? React.useLayoutEffect : React.useEffect;
  pe(
    function () {
      var se = F.current;
      if (R !== V.current.formattedValue && se) {
        var fe = ne(V.current.formattedValue, R, le);
        (se.value = R), $(se, fe, R);
      }
    },
    [R],
  );
  var Pe = function (se, fe, we) {
      var Ne = fe.target,
        Ke = I.current ? bG(I.current, Ne.selectionEnd) : q5(R, se),
        Ye = Object.assign(Object.assign({}, Ke), {
          lastValue: R,
        }),
        Je = s(se, Ye),
        ge = W(Je);
      if (((Je = s(ge, void 0)), h && !h(G(ge, Je)))) {
        var Re = fe.target,
          qt = O0(Re),
          qn = ne(se, R, qt);
        return (Re.value = R), $(Re, qn, R), !1;
      }
      return (
        he({
          formattedValue: ge,
          numAsString: Je,
          inputValue: se,
          event: fe,
          source: we,
          input: fe.target,
        }),
        !0
      );
    },
    xe = function (se, fe) {
      fe === void 0 && (fe = 0);
      var we = se.selectionStart,
        Ne = se.selectionEnd;
      I.current = {
        selectionStart: we,
        selectionEnd: Ne + fe,
      };
    },
    re = function (se) {
      var fe = se.target,
        we = fe.value,
        Ne = Pe(we, se, ef.event);
      Ne && p(se), (I.current = void 0);
    },
    ve = function (se) {
      var fe = se.target,
        we = se.key,
        Ne = fe.selectionStart,
        Ke = fe.selectionEnd,
        Ye = fe.value;
      Ye === void 0 && (Ye = "");
      var Je;
      we === "ArrowLeft" || we === "Backspace"
        ? (Je = Math.max(Ne - 1, 0))
        : we === "ArrowRight"
          ? (Je = Math.min(Ne + 1, Ye.length))
          : we === "Delete" && (Je = Ne);
      var ge = 0;
      we === "Delete" && Ne === Ke && (ge = 1);
      var Re = we === "ArrowLeft" || we === "ArrowRight";
      if (Je === void 0 || (Ne !== Ke && !Re)) {
        v(se), xe(fe, ge);
        return;
      }
      var qt = Je;
      if (Re) {
        var qn = we === "ArrowLeft" ? "left" : "right";
        (qt = K(Ye, Je, qn)), qt !== Je && se.preventDefault();
      } else
        we === "Delete" && !_(Ye[Je])
          ? (qt = K(Ye, Je, "right"))
          : we === "Backspace" && !_(Ye[Je]) && (qt = K(Ye, Je, "left"));
      qt !== Je && $(fe, qt, Ye), v(se), xe(fe, ge);
    },
    je = function (se) {
      var fe = se.target,
        we = function () {
          var Ne = fe.selectionStart,
            Ke = fe.selectionEnd,
            Ye = fe.value;
          if ((Ye === void 0 && (Ye = ""), Ne === Ke)) {
            var Je = K(Ye, Ne);
            Je !== Ne && $(fe, Je, Ye);
          }
        };
      we(),
        requestAnimationFrame(function () {
          we();
        }),
        b(se),
        xe(fe);
    },
    ie = function (se) {
      se.persist && se.persist();
      var fe = se.target,
        we = se.currentTarget;
      (F.current = fe),
        (L.current.focusTimeout = setTimeout(function () {
          var Ne = fe.selectionStart,
            Ke = fe.selectionEnd,
            Ye = fe.value;
          Ye === void 0 && (Ye = "");
          var Je = K(Ye, Ne);
          Je !== Ne && !(Ne === 0 && Ke === Ye.length) && $(fe, Je, Ye),
            y(
              Object.assign(Object.assign({}, se), {
                currentTarget: we,
              }),
            );
        }, 0));
    },
    Qe = function (se) {
      (F.current = null), clearTimeout(L.current.focusTimeout), clearTimeout(L.current.setCaretTimeout), w(se);
    },
    De = U && xG() ? "numeric" : void 0,
    Ve = Object.assign(
      {
        inputMode: De,
      },
      P,
      {
        type: t,
        value: R,
        onChange: re,
        onKeyDown: ve,
        onMouseUp: je,
        onFocus: ie,
        onBlur: Qe,
      },
    );
  if (n === "text")
    return i
      ? ReactDefault.createElement(ReactDefault.Fragment, null, i(R, P) || null)
      : ReactDefault.createElement(
          "span",
          Object.assign({}, P, {
            ref: o,
          }),
          R,
        );
  if (r) {
    var ot = r;
    return ReactDefault.createElement(
      ot,
      Object.assign({}, Ve, {
        ref: o,
      }),
    );
  }
  return ReactDefault.createElement(
    "input",
    Object.assign({}, Ve, {
      ref: o,
    }),
  );
}
function dj(e, t) {
  var n = t.decimalScale,
    r = t.fixedDecimalScale,
    i = t.prefix;
  i === void 0 && (i = "");
  var o = t.suffix;
  o === void 0 && (o = "");
  var a = t.allowNegative,
    s = t.thousandsGroupStyle;
  if ((s === void 0 && (s = "thousand"), e === "" || e === "-")) return e;
  var u = _v(t),
    c = u.thousandSeparator,
    d = u.decimalSeparator,
    h = (n !== 0 && e.indexOf(".") !== -1) || (n && r),
    p = EA(e, a),
    v = p.beforeDecimal,
    b = p.afterDecimal,
    y = p.addNegation;
  return (
    n !== void 0 && (b = V5(b, n, !!r)),
    c && (v = vG(v, c, s)),
    i && (v = i + v),
    o && (b = b + o),
    y && (v = "-" + v),
    (e = v + ((h && d) || "") + b),
    e
  );
}
function _v(e) {
  var t = e.decimalSeparator;
  t === void 0 && (t = ".");
  var n = e.thousandSeparator,
    r = e.allowedDecimalSeparators;
  return (
    n === !0 && (n = ","),
    r || (r = [t, "."]),
    {
      decimalSeparator: t,
      thousandSeparator: n,
      allowedDecimalSeparators: r,
    }
  );
}
function CG(e, t) {
  e === void 0 && (e = "");
  var n = new RegExp("(-)"),
    r = new RegExp("(-)(.)*(-)"),
    i = n.test(e),
    o = r.test(e);
  return (e = e.replace(/-/g, "")), i && !o && t && (e = "-" + e), e;
}
function kG(e, t) {
  return new RegExp("(^-)|[0-9]|" + F5(e), "g");
}
function jG(e, t, n) {
  return e === "" ? !0 : !t?.match(/\d/) && !n?.match(/\d/) && typeof e == "string" && !isNaN(Number(e));
}
function RG(e, t, n) {
  var r;
  t === void 0 && (t = SG(e));
  var i = n.allowNegative,
    o = n.prefix;
  o === void 0 && (o = "");
  var a = n.suffix;
  a === void 0 && (a = "");
  var s = n.decimalScale,
    u = t.from,
    c = t.to,
    d = c.start,
    h = c.end,
    p = _v(n),
    v = p.allowedDecimalSeparators,
    b = p.decimalSeparator,
    y = e[h] === b;
  if (tf(e) && (e === o || e === a) && t.lastValue === "") return e;
  if (h - d === 1 && v.indexOf(e[d]) !== -1) {
    var w = s === 0 ? "" : b;
    e = e.substring(0, d) + w + e.substring(d + 1, e.length);
  }
  var x = function (F, L, W) {
      var G = !1,
        $ = !1;
      o.startsWith("-")
        ? (G = !1)
        : F.startsWith("--")
          ? ((G = !1), ($ = !0))
          : a.startsWith("-") && F.length === a.length
            ? (G = !1)
            : F[0] === "-" && (G = !0);
      var K = G ? 1 : 0;
      return (
        $ && (K = 2),
        K && ((F = F.substring(K)), (L -= K), (W -= K)),
        {
          value: F,
          start: L,
          end: W,
          hasNegation: G,
        }
      );
    },
    S = x(e, d, h),
    _ = S.hasNegation;
  (r = S), (e = r.value), (d = r.start), (h = r.end);
  var E = x(t.lastValue, u.start, u.end),
    P = E.start,
    O = E.end,
    k = E.value,
    R = e.substring(d, h);
  e.length && k.length && (P > k.length - a.length || O < o.length) && !(R && a.startsWith(R)) && (e = k);
  var M = 0;
  e.startsWith(o) ? (M += o.length) : d < o.length && (M = d), (e = e.substring(M)), (h -= M);
  var D = e.length,
    I = e.length - a.length;
  e.endsWith(a) ? (D = I) : (h > I || h > e.length - a.length) && (D = h),
    (e = e.substring(0, D)),
    (e = CG(_ ? "-" + e : e, i)),
    (e = (e.match(kG(b)) || []).join(""));
  var V = e.indexOf(b);
  e = e.replace(new RegExp(F5(b), "g"), function (F, L) {
    return L === V ? "." : "";
  });
  var z = EA(e, i),
    q = z.beforeDecimal,
    U = z.afterDecimal,
    B = z.addNegation;
  return c.end - c.start < u.end - u.start && q === "" && y && !parseFloat(U) && (e = B ? "-" : ""), e;
}
function MG(e, t) {
  var n = t.prefix;
  n === void 0 && (n = "");
  var r = t.suffix;
  r === void 0 && (r = "");
  var i = Array.from({
      length: e.length + 1,
    }).map(function () {
      return !0;
    }),
    o = e[0] === "-";
  i.fill(!1, 0, n.length + (o ? 1 : 0));
  var a = e.length;
  return i.fill(!1, a - r.length + 1, a + 1), i;
}
function NG(e) {
  var t = _v(e),
    n = t.thousandSeparator,
    r = t.decimalSeparator,
    i = e.prefix;
  i === void 0 && (i = "");
  var o = e.allowNegative;
  if ((o === void 0 && (o = !0), n === r))
    throw new Error(
      `
        Decimal separator can't be same as thousand separator.
        thousandSeparator: ` +
        n +
        ` (thousandSeparator = {true} is same as thousandSeparator = ",")
        decimalSeparator: ` +
        r +
        ` (default value for decimalSeparator is .)
     `,
    );
  return (
    i.startsWith("-") &&
      o &&
      (console.error(
        `
      Prefix can't start with '-' when allowNegative is true.
      prefix: ` +
          i +
          `
      allowNegative: ` +
          o +
          `
    `,
      ),
      (o = !1)),
    Object.assign(Object.assign({}, e), {
      allowNegative: o,
    })
  );
}
function IG(e) {
  (e = NG(e)), e.decimalSeparator, e.allowedDecimalSeparators, e.thousandsGroupStyle;
  var t = e.suffix,
    n = e.allowNegative,
    r = e.allowLeadingZeros,
    i = e.onKeyDown;
  i === void 0 && (i = Yo);
  var o = e.onBlur;
  o === void 0 && (o = Yo);
  var a = e.thousandSeparator,
    s = e.decimalScale,
    u = e.fixedDecimalScale,
    c = e.prefix;
  c === void 0 && (c = "");
  var d = e.defaultValue,
    h = e.value,
    p = e.valueIsNumericString,
    v = e.onValueChange,
    b = L5(e, [
      "decimalSeparator",
      "allowedDecimalSeparators",
      "thousandsGroupStyle",
      "suffix",
      "allowNegative",
      "allowLeadingZeros",
      "onKeyDown",
      "onBlur",
      "thousandSeparator",
      "decimalScale",
      "fixedDecimalScale",
      "prefix",
      "defaultValue",
      "value",
      "valueIsNumericString",
      "onValueChange",
    ]),
    y = _v(e),
    w = y.decimalSeparator,
    x = y.allowedDecimalSeparators,
    S = function (B) {
      return dj(B, e);
    },
    _ = function (B, F) {
      return RG(B, F, e);
    },
    E = bl(h) ? d : h,
    P = p ?? jG(E, c, t);
  bl(h) ? bl(d) || (P = P || typeof d == "number") : (P = P || typeof h == "number");
  var O = function (B) {
      return B5(B) ? B : (typeof B == "number" && (B = z5(B)), P && typeof s == "number" ? cj(B, s, !!u) : B);
    },
    k = W5(O(h), O(d), !!P, S, _, v),
    R = k[0],
    M = R.numAsString,
    D = R.formattedValue,
    I = k[1],
    V = function (B) {
      var F = B.target,
        L = B.key,
        W = F.selectionStart,
        G = F.selectionEnd,
        $ = F.value;
      if (($ === void 0 && ($ = ""), (L === "Backspace" || L === "Delete") && G < c.length)) {
        B.preventDefault();
        return;
      }
      if (W !== G) {
        i(B);
        return;
      }
      L === "Backspace" && $[0] === "-" && W === c.length + 1 && n && Wa(F, 1),
        s &&
          u &&
          (L === "Backspace" && $[W - 1] === w
            ? (Wa(F, W - 1), B.preventDefault())
            : L === "Delete" && $[W] === w && B.preventDefault()),
        x?.includes(L) && $[W] === w && Wa(F, W + 1);
      var K = a === !0 ? "," : a;
      L === "Backspace" && $[W - 1] === K && Wa(F, W - 1), L === "Delete" && $[W] === K && Wa(F, W + 1), i(B);
    },
    z = function (B) {
      var F = M;
      if ((F.match(/\d/g) || (F = ""), r || (F = gG(F)), u && s && (F = cj(F, s, u)), F !== M)) {
        var L = dj(F, e);
        I(
          {
            formattedValue: L,
            value: F,
            floatValue: parseFloat(F),
          },
          {
            event: B,
            source: ef.event,
          },
        );
      }
      o(B);
    },
    q = function (B) {
      return B === w ? !0 : tf(B);
    },
    U = function (B) {
      var F = B.currentValue,
        L = B.lastValue,
        W = B.formattedValue,
        G = B.currentValueIndex,
        $ = B.formattedValueIndex,
        K = F[G],
        ne = W[$],
        he = q5(L, F),
        le = he.to,
        pe = function (Pe) {
          return _(Pe).indexOf(".") + c.length;
        };
      return h === 0 && u && s && F[le.start] === w && pe(F) < G && pe(W) > $
        ? !1
        : G >= le.start && G < le.end && x && x.includes(K) && ne === w
          ? !0
          : K === ne;
    };
  return Object.assign(Object.assign({}, b), {
    value: D,
    valueIsNumericString: !1,
    isValidInputCharacter: q,
    isCharacterSame: U,
    onValueChange: I,
    format: S,
    removeFormatting: _,
    getCaretBoundary: function (B) {
      return MG(B, e);
    },
    onKeyDown: V,
    onBlur: z,
  });
}
function DG(e) {
  var t = IG(e);
  return ReactDefault.createElement(TG, Object.assign({}, t));
}
