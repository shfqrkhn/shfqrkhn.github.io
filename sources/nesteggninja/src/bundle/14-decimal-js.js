var ll = 9e15,
  pa = 1e9,
  US = "0123456789abcdef",
  zp =
    "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
  qp =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
  HS = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -ll,
    maxE: ll,
    crypto: !1,
  },
  BB,
  Wi,
  Xe = !0,
  Tv = "[DecimalError] ",
  ua = Tv + "Invalid argument: ",
  FB = Tv + "Precision limit exceeded",
  VB = Tv + "crypto unavailable",
  zB = "[object Decimal]",
  Nn = Math.floor,
  Qt = Math.pow,
  IX = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  DX = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  $X = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  qB = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Qr = 1e7,
  Fe = 7,
  LX = 9007199254740991,
  BX = zp.length - 1,
  KS = qp.length - 1,
  ae = {
    toStringTag: zB,
  };
ae.absoluteValue = ae.abs = function () {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), Ie(e);
};
ae.ceil = function () {
  return Ie(new this.constructor(this), this.e + 1, 2);
};
ae.clampedTo = ae.clamp = function (e, t) {
  var n,
    r = this,
    i = r.constructor;
  if (((e = new i(e)), (t = new i(t)), !e.s || !t.s)) return new i(NaN);
  if (e.gt(t)) throw Error(ua + t);
  return (n = r.cmp(e)), n < 0 ? e : r.cmp(t) > 0 ? t : new i(r);
};
ae.comparedTo = ae.cmp = function (e) {
  var t,
    n,
    r,
    i,
    o = this,
    a = o.d,
    s = (e = new o.constructor(e)).d,
    u = o.s,
    c = e.s;
  if (!a || !s) return !u || !c ? NaN : u !== c ? u : a === s ? 0 : !a ^ (u < 0) ? 1 : -1;
  if (!a[0] || !s[0]) return a[0] ? u : s[0] ? -c : 0;
  if (u !== c) return u;
  if (o.e !== e.e) return (o.e > e.e) ^ (u < 0) ? 1 : -1;
  for (r = a.length, i = s.length, t = 0, n = r < i ? r : i; t < n; ++t)
    if (a[t] !== s[t]) return (a[t] > s[t]) ^ (u < 0) ? 1 : -1;
  return r === i ? 0 : (r > i) ^ (u < 0) ? 1 : -1;
};
ae.cosine = ae.cos = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return n.d
    ? n.d[0]
      ? ((e = r.precision),
        (t = r.rounding),
        (r.precision = e + Math.max(n.e, n.sd()) + Fe),
        (r.rounding = 1),
        (n = FX(r, GB(r, n))),
        (r.precision = e),
        (r.rounding = t),
        Ie(Wi == 2 || Wi == 3 ? n.neg() : n, e, t, !0))
      : new r(1)
    : new r(NaN);
};
ae.cubeRoot = ae.cbrt = function () {
  var e,
    t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d = this,
    h = d.constructor;
  if (!d.isFinite() || d.isZero()) return new h(d);
  for (
    Xe = !1,
      o = d.s * Qt(d.s * d, 1 / 3),
      !o || Math.abs(o) == 1 / 0
        ? ((n = mn(d.d)),
          (e = d.e),
          (o = (e - n.length + 1) % 3) && (n += o == 1 || o == -2 ? "0" : "00"),
          (o = Qt(n, 1 / 3)),
          (e = Nn((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          o == 1 / 0 ? (n = "5e" + e) : ((n = o.toExponential()), (n = n.slice(0, n.indexOf("e") + 1) + e)),
          (r = new h(n)),
          (r.s = d.s))
        : (r = new h(o.toString())),
      a = (e = h.precision) + 3;
    ;

  )
    if (
      ((s = r),
      (u = s.times(s).times(s)),
      (c = u.plus(d)),
      (r = yt(c.plus(d).times(s), c.plus(u), a + 2, 1)),
      mn(s.d).slice(0, a) === (n = mn(r.d)).slice(0, a))
    )
      if (((n = n.slice(a - 3, a + 1)), n == "9999" || (!i && n == "4999"))) {
        if (!i && (Ie(s, e + 1, 0), s.times(s).times(s).eq(d))) {
          r = s;
          break;
        }
        (a += 4), (i = 1);
      } else {
        (!+n || (!+n.slice(1) && n.charAt(0) == "5")) && (Ie(r, e + 1, 1), (t = !r.times(r).times(r).eq(d)));
        break;
      }
  return (Xe = !0), Ie(r, e, h.rounding, t);
};
ae.decimalPlaces = ae.dp = function () {
  var e,
    t = this.d,
    n = NaN;
  if (t) {
    if (((e = t.length - 1), (n = (e - Nn(this.e / Fe)) * Fe), (e = t[e]), e)) for (; e % 10 == 0; e /= 10) n--;
    n < 0 && (n = 0);
  }
  return n;
};
ae.dividedBy = ae.div = function (e) {
  return yt(this, new this.constructor(e));
};
ae.dividedToIntegerBy = ae.divToInt = function (e) {
  var t = this,
    n = t.constructor;
  return Ie(yt(t, new n(e), 0, 1, 1), n.precision, n.rounding);
};
ae.equals = ae.eq = function (e) {
  return this.cmp(e) === 0;
};
ae.floor = function () {
  return Ie(new this.constructor(this), this.e + 1, 3);
};
ae.greaterThan = ae.gt = function (e) {
  return this.cmp(e) > 0;
};
ae.greaterThanOrEqualTo = ae.gte = function (e) {
  var t = this.cmp(e);
  return t == 1 || t === 0;
};
ae.hyperbolicCosine = ae.cosh = function () {
  var e,
    t,
    n,
    r,
    i,
    o = this,
    a = o.constructor,
    s = new a(1);
  if (!o.isFinite()) return new a(o.s ? 1 / 0 : NaN);
  if (o.isZero()) return s;
  (n = a.precision),
    (r = a.rounding),
    (a.precision = n + Math.max(o.e, o.sd()) + 4),
    (a.rounding = 1),
    (i = o.d.length),
    i < 32
      ? ((e = Math.ceil(i / 3)), (t = (1 / kv(4, e)).toString()))
      : ((e = 16), (t = "2.3283064365386962890625e-10")),
    (o = Ml(a, 1, o.times(t), new a(1), !0));
  for (var u, c = e, d = new a(8); c--; ) (u = o.times(o)), (o = s.minus(u.times(d.minus(u.times(d)))));
  return Ie(o, (a.precision = n), (a.rounding = r), !0);
};
ae.hyperbolicSine = ae.sinh = function () {
  var e,
    t,
    n,
    r,
    i = this,
    o = i.constructor;
  if (!i.isFinite() || i.isZero()) return new o(i);
  if (
    ((t = o.precision),
    (n = o.rounding),
    (o.precision = t + Math.max(i.e, i.sd()) + 4),
    (o.rounding = 1),
    (r = i.d.length),
    r < 3)
  )
    i = Ml(o, 2, i, i, !0);
  else {
    (e = 1.4 * Math.sqrt(r)), (e = e > 16 ? 16 : e | 0), (i = i.times(1 / kv(5, e))), (i = Ml(o, 2, i, i, !0));
    for (var a, s = new o(5), u = new o(16), c = new o(20); e--; )
      (a = i.times(i)), (i = i.times(s.plus(a.times(u.times(a).plus(c)))));
  }
  return (o.precision = t), (o.rounding = n), Ie(i, t, n, !0);
};
ae.hyperbolicTangent = ae.tanh = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return n.isFinite()
    ? n.isZero()
      ? new r(n)
      : ((e = r.precision),
        (t = r.rounding),
        (r.precision = e + 7),
        (r.rounding = 1),
        yt(n.sinh(), n.cosh(), (r.precision = e), (r.rounding = t)))
    : new r(n.s);
};
ae.inverseCosine = ae.acos = function () {
  var e = this,
    t = e.constructor,
    n = e.abs().cmp(1),
    r = t.precision,
    i = t.rounding;
  return n !== -1
    ? n === 0
      ? e.isNeg()
        ? hi(t, r, i)
        : new t(0)
      : new t(NaN)
    : e.isZero()
      ? hi(t, r + 4, i).times(0.5)
      : ((t.precision = r + 6),
        (t.rounding = 1),
        (e = new t(1).minus(e).div(e.plus(1)).sqrt().atan()),
        (t.precision = r),
        (t.rounding = i),
        e.times(2));
};
ae.inverseHyperbolicCosine = ae.acosh = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return n.lte(1)
    ? new r(n.eq(1) ? 0 : NaN)
    : n.isFinite()
      ? ((e = r.precision),
        (t = r.rounding),
        (r.precision = e + Math.max(Math.abs(n.e), n.sd()) + 4),
        (r.rounding = 1),
        (Xe = !1),
        (n = n.times(n).minus(1).sqrt().plus(n)),
        (Xe = !0),
        (r.precision = e),
        (r.rounding = t),
        n.ln())
      : new r(n);
};
ae.inverseHyperbolicSine = ae.asinh = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return !n.isFinite() || n.isZero()
    ? new r(n)
    : ((e = r.precision),
      (t = r.rounding),
      (r.precision = e + 2 * Math.max(Math.abs(n.e), n.sd()) + 6),
      (r.rounding = 1),
      (Xe = !1),
      (n = n.times(n).plus(1).sqrt().plus(n)),
      (Xe = !0),
      (r.precision = e),
      (r.rounding = t),
      n.ln());
};
ae.inverseHyperbolicTangent = ae.atanh = function () {
  var e,
    t,
    n,
    r,
    i = this,
    o = i.constructor;
  return i.isFinite()
    ? i.e >= 0
      ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
      : ((e = o.precision),
        (t = o.rounding),
        (r = i.sd()),
        Math.max(r, e) < 2 * -i.e - 1
          ? Ie(new o(i), e, t, !0)
          : ((o.precision = n = r - i.e),
            (i = yt(i.plus(1), new o(1).minus(i), n + e, 1)),
            (o.precision = e + 4),
            (o.rounding = 1),
            (i = i.ln()),
            (o.precision = e),
            (o.rounding = t),
            i.times(0.5)))
    : new o(NaN);
};
ae.inverseSine = ae.asin = function () {
  var e,
    t,
    n,
    r,
    i = this,
    o = i.constructor;
  return i.isZero()
    ? new o(i)
    : ((t = i.abs().cmp(1)),
      (n = o.precision),
      (r = o.rounding),
      t !== -1
        ? t === 0
          ? ((e = hi(o, n + 4, r).times(0.5)), (e.s = i.s), e)
          : new o(NaN)
        : ((o.precision = n + 6),
          (o.rounding = 1),
          (i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan()),
          (o.precision = n),
          (o.rounding = r),
          i.times(2)));
};
ae.inverseTangent = ae.atan = function () {
  var e,
    t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c = this,
    d = c.constructor,
    h = d.precision,
    p = d.rounding;
  if (c.isFinite()) {
    if (c.isZero()) return new d(c);
    if (c.abs().eq(1) && h + 4 <= KS) return (a = hi(d, h + 4, p).times(0.25)), (a.s = c.s), a;
  } else {
    if (!c.s) return new d(NaN);
    if (h + 4 <= KS) return (a = hi(d, h + 4, p).times(0.5)), (a.s = c.s), a;
  }
  for (d.precision = s = h + 10, d.rounding = 1, n = Math.min(28, (s / Fe + 2) | 0), e = n; e; --e)
    c = c.div(c.times(c).plus(1).sqrt().plus(1));
  for (Xe = !1, t = Math.ceil(s / Fe), r = 1, u = c.times(c), a = new d(c), i = c; e !== -1; )
    if (
      ((i = i.times(u)),
      (o = a.minus(i.div((r += 2)))),
      (i = i.times(u)),
      (a = o.plus(i.div((r += 2)))),
      a.d[t] !== void 0)
    )
      for (e = t; a.d[e] === o.d[e] && e--; );
  return n && (a = a.times(2 << (n - 1))), (Xe = !0), Ie(a, (d.precision = h), (d.rounding = p), !0);
};
ae.isFinite = function () {
  return !!this.d;
};
ae.isInteger = ae.isInt = function () {
  return !!this.d && Nn(this.e / Fe) > this.d.length - 2;
};
ae.isNaN = function () {
  return !this.s;
};
ae.isNegative = ae.isNeg = function () {
  return this.s < 0;
};
ae.isPositive = ae.isPos = function () {
  return this.s > 0;
};
ae.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
ae.lessThan = ae.lt = function (e) {
  return this.cmp(e) < 0;
};
ae.lessThanOrEqualTo = ae.lte = function (e) {
  return this.cmp(e) < 1;
};
ae.logarithm = ae.log = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c = this,
    d = c.constructor,
    h = d.precision,
    p = d.rounding,
    v = 5;
  if (e == null) (e = new d(10)), (t = !0);
  else {
    if (((e = new d(e)), (n = e.d), e.s < 0 || !n || !n[0] || e.eq(1))) return new d(NaN);
    t = e.eq(10);
  }
  if (((n = c.d), c.s < 0 || !n || !n[0] || c.eq(1)))
    return new d(n && !n[0] ? -1 / 0 : c.s != 1 ? NaN : n ? 0 : 1 / 0);
  if (t)
    if (n.length > 1) o = !0;
    else {
      for (i = n[0]; i % 10 === 0; ) i /= 10;
      o = i !== 1;
    }
  if (
    ((Xe = !1),
    (s = h + v),
    (a = Qo(c, s)),
    (r = t ? Wp(d, s + 10) : Qo(e, s)),
    (u = yt(a, r, s, 1)),
    cf(u.d, (i = h), p))
  )
    do
      if (((s += 10), (a = Qo(c, s)), (r = t ? Wp(d, s + 10) : Qo(e, s)), (u = yt(a, r, s, 1)), !o)) {
        +mn(u.d).slice(i + 1, i + 15) + 1 == 1e14 && (u = Ie(u, h + 1, 0));
        break;
      }
    while (cf(u.d, (i += 10), p));
  return (Xe = !0), Ie(u, h, p);
};
ae.minus = ae.sub = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h,
    p,
    v = this,
    b = v.constructor;
  if (((e = new b(e)), !v.d || !e.d))
    return !v.s || !e.s ? (e = new b(NaN)) : v.d ? (e.s = -e.s) : (e = new b(e.d || v.s !== e.s ? v : NaN)), e;
  if (v.s != e.s) return (e.s = -e.s), v.plus(e);
  if (((c = v.d), (p = e.d), (s = b.precision), (u = b.rounding), !c[0] || !p[0])) {
    if (p[0]) e.s = -e.s;
    else if (c[0]) e = new b(v);
    else return new b(u === 3 ? -0 : 0);
    return Xe ? Ie(e, s, u) : e;
  }
  if (((n = Nn(e.e / Fe)), (d = Nn(v.e / Fe)), (c = c.slice()), (o = d - n), o)) {
    for (
      h = o < 0,
        h ? ((t = c), (o = -o), (a = p.length)) : ((t = p), (n = d), (a = c.length)),
        r = Math.max(Math.ceil(s / Fe), a) + 2,
        o > r && ((o = r), (t.length = 1)),
        t.reverse(),
        r = o;
      r--;

    )
      t.push(0);
    t.reverse();
  } else {
    for (r = c.length, a = p.length, h = r < a, h && (a = r), r = 0; r < a; r++)
      if (c[r] != p[r]) {
        h = c[r] < p[r];
        break;
      }
    o = 0;
  }
  for (h && ((t = c), (c = p), (p = t), (e.s = -e.s)), a = c.length, r = p.length - a; r > 0; --r) c[a++] = 0;
  for (r = p.length; r > o; ) {
    if (c[--r] < p[r]) {
      for (i = r; i && c[--i] === 0; ) c[i] = Qr - 1;
      --c[i], (c[r] += Qr);
    }
    c[r] -= p[r];
  }
  for (; c[--a] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? ((e.d = c), (e.e = Cv(c, n)), Xe ? Ie(e, s, u) : e) : new b(u === 3 ? -0 : 0);
};
ae.modulo = ae.mod = function (e) {
  var t,
    n = this,
    r = n.constructor;
  return (
    (e = new r(e)),
    !n.d || !e.s || (e.d && !e.d[0])
      ? new r(NaN)
      : !e.d || (n.d && !n.d[0])
        ? Ie(new r(n), r.precision, r.rounding)
        : ((Xe = !1),
          r.modulo == 9 ? ((t = yt(n, e.abs(), 0, 3, 1)), (t.s *= e.s)) : (t = yt(n, e, 0, r.modulo, 1)),
          (t = t.times(e)),
          (Xe = !0),
          n.minus(t))
  );
};
ae.naturalExponential = ae.exp = function () {
  return GS(this);
};
ae.naturalLogarithm = ae.ln = function () {
  return Qo(this);
};
ae.negated = ae.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s), Ie(e);
};
ae.plus = ae.add = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h = this,
    p = h.constructor;
  if (((e = new p(e)), !h.d || !e.d))
    return !h.s || !e.s ? (e = new p(NaN)) : h.d || (e = new p(e.d || h.s === e.s ? h : NaN)), e;
  if (h.s != e.s) return (e.s = -e.s), h.minus(e);
  if (((c = h.d), (d = e.d), (s = p.precision), (u = p.rounding), !c[0] || !d[0]))
    return d[0] || (e = new p(h)), Xe ? Ie(e, s, u) : e;
  if (((o = Nn(h.e / Fe)), (r = Nn(e.e / Fe)), (c = c.slice()), (i = o - r), i)) {
    for (
      i < 0 ? ((n = c), (i = -i), (a = d.length)) : ((n = d), (r = o), (a = c.length)),
        o = Math.ceil(s / Fe),
        a = o > a ? o + 1 : a + 1,
        i > a && ((i = a), (n.length = 1)),
        n.reverse();
      i--;

    )
      n.push(0);
    n.reverse();
  }
  for (a = c.length, i = d.length, a - i < 0 && ((i = a), (n = d), (d = c), (c = n)), t = 0; i; )
    (t = ((c[--i] = c[i] + d[i] + t) / Qr) | 0), (c[i] %= Qr);
  for (t && (c.unshift(t), ++r), a = c.length; c[--a] == 0; ) c.pop();
  return (e.d = c), (e.e = Cv(c, r)), Xe ? Ie(e, s, u) : e;
};
ae.precision = ae.sd = function (e) {
  var t,
    n = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(ua + e);
  return n.d ? ((t = WB(n.d)), e && n.e + 1 > t && (t = n.e + 1)) : (t = NaN), t;
};
ae.round = function () {
  var e = this,
    t = e.constructor;
  return Ie(new t(e), e.e + 1, t.rounding);
};
ae.sine = ae.sin = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return n.isFinite()
    ? n.isZero()
      ? new r(n)
      : ((e = r.precision),
        (t = r.rounding),
        (r.precision = e + Math.max(n.e, n.sd()) + Fe),
        (r.rounding = 1),
        (n = zX(r, GB(r, n))),
        (r.precision = e),
        (r.rounding = t),
        Ie(Wi > 2 ? n.neg() : n, e, t, !0))
    : new r(NaN);
};
ae.squareRoot = ae.sqrt = function () {
  var e,
    t,
    n,
    r,
    i,
    o,
    a = this,
    s = a.d,
    u = a.e,
    c = a.s,
    d = a.constructor;
  if (c !== 1 || !s || !s[0]) return new d(!c || (c < 0 && (!s || s[0])) ? NaN : s ? a : 1 / 0);
  for (
    Xe = !1,
      c = Math.sqrt(+a),
      c == 0 || c == 1 / 0
        ? ((t = mn(s)),
          (t.length + u) % 2 == 0 && (t += "0"),
          (c = Math.sqrt(t)),
          (u = Nn((u + 1) / 2) - (u < 0 || u % 2)),
          c == 1 / 0 ? (t = "5e" + u) : ((t = c.toExponential()), (t = t.slice(0, t.indexOf("e") + 1) + u)),
          (r = new d(t)))
        : (r = new d(c.toString())),
      n = (u = d.precision) + 3;
    ;

  )
    if (((o = r), (r = o.plus(yt(a, o, n + 2, 1)).times(0.5)), mn(o.d).slice(0, n) === (t = mn(r.d)).slice(0, n)))
      if (((t = t.slice(n - 3, n + 1)), t == "9999" || (!i && t == "4999"))) {
        if (!i && (Ie(o, u + 1, 0), o.times(o).eq(a))) {
          r = o;
          break;
        }
        (n += 4), (i = 1);
      } else {
        (!+t || (!+t.slice(1) && t.charAt(0) == "5")) && (Ie(r, u + 1, 1), (e = !r.times(r).eq(a)));
        break;
      }
  return (Xe = !0), Ie(r, u, d.rounding, e);
};
ae.tangent = ae.tan = function () {
  var e,
    t,
    n = this,
    r = n.constructor;
  return n.isFinite()
    ? n.isZero()
      ? new r(n)
      : ((e = r.precision),
        (t = r.rounding),
        (r.precision = e + 10),
        (r.rounding = 1),
        (n = n.sin()),
        (n.s = 1),
        (n = yt(n, new r(1).minus(n.times(n)).sqrt(), e + 10, 0)),
        (r.precision = e),
        (r.rounding = t),
        Ie(Wi == 2 || Wi == 4 ? n.neg() : n, e, t, !0))
    : new r(NaN);
};
ae.times = ae.mul = function (e) {
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
  if (((e.s *= d.s), !p || !p[0] || !v || !v[0]))
    return new h(!e.s || (p && !p[0] && !v) || (v && !v[0] && !p) ? NaN : !p || !v ? e.s / 0 : e.s * 0);
  for (
    n = Nn(d.e / Fe) + Nn(e.e / Fe),
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
    for (t = 0, i = u + r; i > r; ) (s = o[i] + v[r] * p[i - r - 1] + t), (o[i--] = s % Qr | 0), (t = (s / Qr) | 0);
    o[i] = (o[i] + t) % Qr | 0;
  }
  for (; !o[--a]; ) o.pop();
  return t ? ++n : o.shift(), (e.d = o), (e.e = Cv(o, n)), Xe ? Ie(e, h.precision, h.rounding) : e;
};
ae.toBinary = function (e, t) {
  return XA(this, 2, e, t);
};
ae.toDecimalPlaces = ae.toDP = function (e, t) {
  var n = this,
    r = n.constructor;
  return (
    (n = new r(n)),
    e === void 0 ? n : (Jn(e, 0, pa), t === void 0 ? (t = r.rounding) : Jn(t, 0, 8), Ie(n, e + n.e + 1, t))
  );
};
ae.toExponential = function (e, t) {
  var n,
    r = this,
    i = r.constructor;
  return (
    e === void 0
      ? (n = Ai(r, !0))
      : (Jn(e, 0, pa),
        t === void 0 ? (t = i.rounding) : Jn(t, 0, 8),
        (r = Ie(new i(r), e + 1, t)),
        (n = Ai(r, !0, e + 1))),
    r.isNeg() && !r.isZero() ? "-" + n : n
  );
};
ae.toFixed = function (e, t) {
  var n,
    r,
    i = this,
    o = i.constructor;
  return (
    e === void 0
      ? (n = Ai(i))
      : (Jn(e, 0, pa),
        t === void 0 ? (t = o.rounding) : Jn(t, 0, 8),
        (r = Ie(new o(i), e + i.e + 1, t)),
        (n = Ai(r, !1, e + r.e + 1))),
    i.isNeg() && !i.isZero() ? "-" + n : n
  );
};
ae.toFraction = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    u,
    c,
    d,
    h,
    p,
    v = this,
    b = v.d,
    y = v.constructor;
  if (!b) return new y(v);
  if (
    ((c = n = new y(1)),
    (r = u = new y(0)),
    (t = new y(r)),
    (o = t.e = WB(b) - v.e - 1),
    (a = o % Fe),
    (t.d[0] = Qt(10, a < 0 ? Fe + a : a)),
    e == null)
  )
    e = o > 0 ? t : c;
  else {
    if (((s = new y(e)), !s.isInt() || s.lt(c))) throw Error(ua + s);
    e = s.gt(t) ? (o > 0 ? t : c) : s;
  }
  for (
    Xe = !1, s = new y(mn(b)), d = y.precision, y.precision = o = b.length * Fe * 2;
    (h = yt(s, t, 0, 1, 1)), (i = n.plus(h.times(r))), i.cmp(e) != 1;

  )
    (n = r), (r = i), (i = c), (c = u.plus(h.times(i))), (u = i), (i = t), (t = s.minus(h.times(i))), (s = i);
  return (
    (i = yt(e.minus(n), r, 0, 1, 1)),
    (u = u.plus(i.times(c))),
    (n = n.plus(i.times(r))),
    (u.s = c.s = v.s),
    (p =
      yt(c, r, o, 1)
        .minus(v)
        .abs()
        .cmp(yt(u, n, o, 1).minus(v).abs()) < 1
        ? [c, r]
        : [u, n]),
    (y.precision = d),
    (Xe = !0),
    p
  );
};
ae.toHexadecimal = ae.toHex = function (e, t) {
  return XA(this, 16, e, t);
};
ae.toNearest = function (e, t) {
  var n = this,
    r = n.constructor;
  if (((n = new r(n)), e == null)) {
    if (!n.d) return n;
    (e = new r(1)), (t = r.rounding);
  } else {
    if (((e = new r(e)), t === void 0 ? (t = r.rounding) : Jn(t, 0, 8), !n.d)) return e.s ? n : e;
    if (!e.d) return e.s && (e.s = n.s), e;
  }
  return e.d[0] ? ((Xe = !1), (n = yt(n, e, 0, t, 1).times(e)), (Xe = !0), Ie(n)) : ((e.s = n.s), (n = e)), n;
};
ae.toNumber = function () {
  return +this;
};
ae.toOctal = function (e, t) {
  return XA(this, 8, e, t);
};
ae.toPower = ae.pow = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s = this,
    u = s.constructor,
    c = +(e = new u(e));
  if (!s.d || !e.d || !s.d[0] || !e.d[0]) return new u(Qt(+s, c));
  if (((s = new u(s)), s.eq(1))) return s;
  if (((r = u.precision), (o = u.rounding), e.eq(1))) return Ie(s, r, o);
  if (((t = Nn(e.e / Fe)), t >= e.d.length - 1 && (n = c < 0 ? -c : c) <= LX))
    return (i = UB(u, s, n, r)), e.s < 0 ? new u(1).div(i) : Ie(i, r, o);
  if (((a = s.s), a < 0)) {
    if (t < e.d.length - 1) return new u(NaN);
    if (((e.d[t] & 1) == 0 && (a = 1), s.e == 0 && s.d[0] == 1 && s.d.length == 1)) return (s.s = a), s;
  }
  return (
    (n = Qt(+s, c)),
    (t = n == 0 || !isFinite(n) ? Nn(c * (Math.log("0." + mn(s.d)) / Math.LN10 + s.e + 1)) : new u(n + "").e),
    t > u.maxE + 1 || t < u.minE - 1
      ? new u(t > 0 ? a / 0 : 0)
      : ((Xe = !1),
        (u.rounding = s.s = 1),
        (n = Math.min(12, (t + "").length)),
        (i = GS(e.times(Qo(s, r + n)), r)),
        i.d &&
          ((i = Ie(i, r + 5, 1)),
          cf(i.d, r, o) &&
            ((t = r + 10),
            (i = Ie(GS(e.times(Qo(s, t + n)), t), t + 5, 1)),
            +mn(i.d).slice(r + 1, r + 15) + 1 == 1e14 && (i = Ie(i, r + 1, 0)))),
        (i.s = a),
        (Xe = !0),
        (u.rounding = o),
        Ie(i, r, o))
  );
};
ae.toPrecision = function (e, t) {
  var n,
    r = this,
    i = r.constructor;
  return (
    e === void 0
      ? (n = Ai(r, r.e <= i.toExpNeg || r.e >= i.toExpPos))
      : (Jn(e, 1, pa),
        t === void 0 ? (t = i.rounding) : Jn(t, 0, 8),
        (r = Ie(new i(r), e, t)),
        (n = Ai(r, e <= r.e || r.e <= i.toExpNeg, e))),
    r.isNeg() && !r.isZero() ? "-" + n : n
  );
};
ae.toSignificantDigits = ae.toSD = function (e, t) {
  var n = this,
    r = n.constructor;
  return (
    e === void 0
      ? ((e = r.precision), (t = r.rounding))
      : (Jn(e, 1, pa), t === void 0 ? (t = r.rounding) : Jn(t, 0, 8)),
    Ie(new r(n), e, t)
  );
};
ae.toString = function () {
  var e = this,
    t = e.constructor,
    n = Ai(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + n : n;
};
ae.truncated = ae.trunc = function () {
  return Ie(new this.constructor(this), this.e + 1, 1);
};
ae.valueOf = ae.toJSON = function () {
  var e = this,
    t = e.constructor,
    n = Ai(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() ? "-" + n : n;
};
function mn(e) {
  var t,
    n,
    r,
    i = e.length - 1,
    o = "",
    a = e[0];
  if (i > 0) {
    for (o += a, t = 1; t < i; t++) (r = e[t] + ""), (n = Fe - r.length), n && (o += Ko(n)), (o += r);
    (a = e[t]), (r = a + ""), (n = Fe - r.length), n && (o += Ko(n));
  } else if (a === 0) return "0";
  for (; a % 10 === 0; ) a /= 10;
  return o + a;
}
function Jn(e, t, n) {
  if (e !== ~~e || e < t || e > n) throw Error(ua + e);
}
function cf(e, t, n, r) {
  var i, o, a, s;
  for (o = e[0]; o >= 10; o /= 10) --t;
  return (
    --t < 0 ? ((t += Fe), (i = 0)) : ((i = Math.ceil((t + 1) / Fe)), (t %= Fe)),
    (o = Qt(10, Fe - t)),
    (s = e[i] % o | 0),
    r == null
      ? t < 3
        ? (t == 0 ? (s = (s / 100) | 0) : t == 1 && (s = (s / 10) | 0),
          (a = (n < 4 && s == 99999) || (n > 3 && s == 49999) || s == 5e4 || s == 0))
        : (a =
            (((n < 4 && s + 1 == o) || (n > 3 && s + 1 == o / 2)) && ((e[i + 1] / o / 100) | 0) == Qt(10, t - 2) - 1) ||
            ((s == o / 2 || s == 0) && ((e[i + 1] / o / 100) | 0) == 0))
      : t < 4
        ? (t == 0 ? (s = (s / 1e3) | 0) : t == 1 ? (s = (s / 100) | 0) : t == 2 && (s = (s / 10) | 0),
          (a = ((r || n < 4) && s == 9999) || (!r && n > 3 && s == 4999)))
        : (a =
            (((r || n < 4) && s + 1 == o) || (!r && n > 3 && s + 1 == o / 2)) &&
            ((e[i + 1] / o / 1e3) | 0) == Qt(10, t - 3) - 1),
    a
  );
}
function wp(e, t, n) {
  for (var r, i = [0], o, a = 0, s = e.length; a < s; ) {
    for (o = i.length; o--; ) i[o] *= t;
    for (i[0] += US.indexOf(e.charAt(a++)), r = 0; r < i.length; r++)
      i[r] > n - 1 && (i[r + 1] === void 0 && (i[r + 1] = 0), (i[r + 1] += (i[r] / n) | 0), (i[r] %= n));
  }
  return i.reverse();
}
function FX(e, t) {
  var n, r, i;
  if (t.isZero()) return t;
  (r = t.d.length),
    r < 32
      ? ((n = Math.ceil(r / 3)), (i = (1 / kv(4, n)).toString()))
      : ((n = 16), (i = "2.3283064365386962890625e-10")),
    (e.precision += n),
    (t = Ml(e, 1, t.times(i), new e(1)));
  for (var o = n; o--; ) {
    var a = t.times(t);
    t = a.times(a).minus(a).times(8).plus(1);
  }
  return (e.precision -= n), t;
}
var yt = (function () {
  function e(r, i, o) {
    var a,
      s = 0,
      u = r.length;
    for (r = r.slice(); u--; ) (a = r[u] * i + s), (r[u] = a % o | 0), (s = (a / o) | 0);
    return s && r.unshift(s), r;
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
  function n(r, i, o, a) {
    for (var s = 0; o--; ) (r[o] -= s), (s = r[o] < i[o] ? 1 : 0), (r[o] = s * a + r[o] - i[o]);
    for (; !r[0] && r.length > 1; ) r.shift();
  }
  return function (r, i, o, a, s, u) {
    var c,
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
      M,
      D,
      I,
      V,
      z = r.constructor,
      q = r.s == i.s ? 1 : -1,
      U = r.d,
      B = i.d;
    if (!U || !U[0] || !B || !B[0])
      return new z(!r.s || !i.s || (U ? B && U[0] == B[0] : !B) ? NaN : (U && U[0] == 0) || !B ? q * 0 : q / 0);
    for (
      u ? ((v = 1), (d = r.e - i.e)) : ((u = Qr), (v = Fe), (d = Nn(r.e / v) - Nn(i.e / v))),
        I = B.length,
        M = U.length,
        x = new z(q),
        S = x.d = [],
        h = 0;
      B[h] == (U[h] || 0);
      h++
    );
    if (
      (B[h] > (U[h] || 0) && d--,
      o == null ? ((O = o = z.precision), (a = z.rounding)) : s ? (O = o + (r.e - i.e) + 1) : (O = o),
      O < 0)
    )
      S.push(1), (b = !0);
    else {
      if (((O = (O / v + 2) | 0), (h = 0), I == 1)) {
        for (p = 0, B = B[0], O++; (h < M || p) && O--; h++)
          (k = p * u + (U[h] || 0)), (S[h] = (k / B) | 0), (p = k % B | 0);
        b = p || h < M;
      } else {
        for (
          p = (u / (B[0] + 1)) | 0,
            p > 1 && ((B = e(B, p, u)), (U = e(U, p, u)), (I = B.length), (M = U.length)),
            R = I,
            _ = U.slice(0, I),
            E = _.length;
          E < I;

        )
          _[E++] = 0;
        (V = B.slice()), V.unshift(0), (D = B[0]), B[1] >= u / 2 && ++D;
        do
          (p = 0),
            (c = t(B, _, I, E)),
            c < 0
              ? ((P = _[0]),
                I != E && (P = P * u + (_[1] || 0)),
                (p = (P / D) | 0),
                p > 1
                  ? (p >= u && (p = u - 1),
                    (y = e(B, p, u)),
                    (w = y.length),
                    (E = _.length),
                    (c = t(y, _, w, E)),
                    c == 1 && (p--, n(y, I < w ? V : B, w, u)))
                  : (p == 0 && (c = p = 1), (y = B.slice())),
                (w = y.length),
                w < E && y.unshift(0),
                n(_, y, E, u),
                c == -1 && ((E = _.length), (c = t(B, _, I, E)), c < 1 && (p++, n(_, I < E ? V : B, E, u))),
                (E = _.length))
              : c === 0 && (p++, (_ = [0])),
            (S[h++] = p),
            c && _[0] ? (_[E++] = U[R] || 0) : ((_ = [U[R]]), (E = 1));
        while ((R++ < M || _[0] !== void 0) && O--);
        b = _[0] !== void 0;
      }
      S[0] || S.shift();
    }
    if (v == 1) (x.e = d), (BB = b);
    else {
      for (h = 1, p = S[0]; p >= 10; p /= 10) h++;
      (x.e = h + d * v - 1), Ie(x, s ? o + x.e + 1 : o, a, b);
    }
    return x;
  };
})();
function Ie(e, t, n, r) {
  var i,
    o,
    a,
    s,
    u,
    c,
    d,
    h,
    p,
    v = e.constructor;
  e: if (t != null) {
    if (((h = e.d), !h)) return e;
    for (i = 1, s = h[0]; s >= 10; s /= 10) i++;
    if (((o = t - i), o < 0)) (o += Fe), (a = t), (d = h[(p = 0)]), (u = (d / Qt(10, i - a - 1)) % 10 | 0);
    else if (((p = Math.ceil((o + 1) / Fe)), (s = h.length), p >= s)) {
      if (r) {
        for (; s++ <= p; ) h.push(0);
        (d = u = 0), (i = 1), (o %= Fe), (a = o - Fe + 1);
      } else break e;
    } else {
      for (d = s = h[p], i = 1; s >= 10; s /= 10) i++;
      (o %= Fe), (a = o - Fe + i), (u = a < 0 ? 0 : (d / Qt(10, i - a - 1)) % 10 | 0);
    }
    if (
      ((r = r || t < 0 || h[p + 1] !== void 0 || (a < 0 ? d : d % Qt(10, i - a - 1))),
      (c =
        n < 4
          ? (u || r) && (n == 0 || n == (e.s < 0 ? 3 : 2))
          : u > 5 ||
            (u == 5 &&
              (n == 4 ||
                r ||
                (n == 6 && (o > 0 ? (a > 0 ? d / Qt(10, i - a) : 0) : h[p - 1]) % 10 & 1) ||
                n == (e.s < 0 ? 8 : 7)))),
      t < 1 || !h[0])
    )
      return (
        (h.length = 0),
        c ? ((t -= e.e + 1), (h[0] = Qt(10, (Fe - (t % Fe)) % Fe)), (e.e = -t || 0)) : (h[0] = e.e = 0),
        e
      );
    if (
      (o == 0
        ? ((h.length = p), (s = 1), p--)
        : ((h.length = p + 1), (s = Qt(10, Fe - o)), (h[p] = a > 0 ? ((d / Qt(10, i - a)) % Qt(10, a) | 0) * s : 0)),
      c)
    )
      for (;;)
        if (p == 0) {
          for (o = 1, a = h[0]; a >= 10; a /= 10) o++;
          for (a = h[0] += s, s = 1; a >= 10; a /= 10) s++;
          o != s && (e.e++, h[0] == Qr && (h[0] = 1));
          break;
        } else {
          if (((h[p] += s), h[p] != Qr)) break;
          (h[p--] = 0), (s = 1);
        }
    for (o = h.length; h[--o] === 0; ) h.pop();
  }
  return Xe && (e.e > v.maxE ? ((e.d = null), (e.e = NaN)) : e.e < v.minE && ((e.e = 0), (e.d = [0]))), e;
}
function Ai(e, t, n) {
  if (!e.isFinite()) return KB(e);
  var r,
    i = e.e,
    o = mn(e.d),
    a = o.length;
  return (
    t
      ? (n && (r = n - a) > 0
          ? (o = o.charAt(0) + "." + o.slice(1) + Ko(r))
          : a > 1 && (o = o.charAt(0) + "." + o.slice(1)),
        (o = o + (e.e < 0 ? "e" : "e+") + e.e))
      : i < 0
        ? ((o = "0." + Ko(-i - 1) + o), n && (r = n - a) > 0 && (o += Ko(r)))
        : i >= a
          ? ((o += Ko(i + 1 - a)), n && (r = n - i - 1) > 0 && (o = o + "." + Ko(r)))
          : ((r = i + 1) < a && (o = o.slice(0, r) + "." + o.slice(r)),
            n && (r = n - a) > 0 && (i + 1 === a && (o += "."), (o += Ko(r)))),
    o
  );
}
function Cv(e, t) {
  var n = e[0];
  for (t *= Fe; n >= 10; n /= 10) t++;
  return t;
}
function Wp(e, t, n) {
  if (t > BX) throw ((Xe = !0), n && (e.precision = n), Error(FB));
  return Ie(new e(zp), t, 1, !0);
}
function hi(e, t, n) {
  if (t > KS) throw Error(FB);
  return Ie(new e(qp), t, n, !0);
}
function WB(e) {
  var t = e.length - 1,
    n = t * Fe + 1;
  if (((t = e[t]), t)) {
    for (; t % 10 == 0; t /= 10) n--;
    for (t = e[0]; t >= 10; t /= 10) n++;
  }
  return n;
}
function Ko(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function UB(e, t, n, r) {
  var i,
    o = new e(1),
    a = Math.ceil(r / Fe + 4);
  for (Xe = !1; ; ) {
    if ((n % 2 && ((o = o.times(t)), Bj(o.d, a) && (i = !0)), (n = Nn(n / 2)), n === 0)) {
      (n = o.d.length - 1), i && o.d[n] === 0 && ++o.d[n];
      break;
    }
    (t = t.times(t)), Bj(t.d, a);
  }
  return (Xe = !0), o;
}
function Lj(e) {
  return e.d[e.d.length - 1] & 1;
}
function HB(e, t, n) {
  for (var r, i, o = new e(t[0]), a = 0; ++a < t.length; ) {
    if (((i = new e(t[a])), !i.s)) {
      o = i;
      break;
    }
    (r = o.cmp(i)), (r === n || (r === 0 && o.s === n)) && (o = i);
  }
  return o;
}
function GS(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    u,
    c = 0,
    d = 0,
    h = 0,
    p = e.constructor,
    v = p.rounding,
    b = p.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new p(e.d ? (e.d[0] ? (e.s < 0 ? 0 : 1 / 0) : 1) : e.s ? (e.s < 0 ? 0 : e) : NaN);
  for (t == null ? ((Xe = !1), (u = b)) : (u = t), s = new p(0.03125); e.e > -2; ) (e = e.times(s)), (h += 5);
  for (r = ((Math.log(Qt(2, h)) / Math.LN10) * 2 + 5) | 0, u += r, n = o = a = new p(1), p.precision = u; ; ) {
    if (
      ((o = Ie(o.times(e), u, 1)),
      (n = n.times(++d)),
      (s = a.plus(yt(o, n, u, 1))),
      mn(s.d).slice(0, u) === mn(a.d).slice(0, u))
    ) {
      for (i = h; i--; ) a = Ie(a.times(a), u, 1);
      if (t == null) {
        if (c < 3 && cf(a.d, u - r, v, c)) (p.precision = u += 10), (n = o = s = new p(1)), (d = 0), c++;
        else return Ie(a, (p.precision = b), v, (Xe = !0));
      } else return (p.precision = b), a;
    }
    a = s;
  }
}
function Qo(e, t) {
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
    p,
    v = 1,
    b = 10,
    y = e,
    w = y.d,
    x = y.constructor,
    S = x.rounding,
    _ = x.precision;
  if (y.s < 0 || !w || !w[0] || (!y.e && w[0] == 1 && w.length == 1))
    return new x(w && !w[0] ? -1 / 0 : y.s != 1 ? NaN : w ? 0 : y);
  if (
    (t == null ? ((Xe = !1), (d = _)) : (d = t),
    (x.precision = d += b),
    (n = mn(w)),
    (r = n.charAt(0)),
    Math.abs((o = y.e)) < 15e14)
  ) {
    for (; (r < 7 && r != 1) || (r == 1 && n.charAt(1) > 3); ) (y = y.times(e)), (n = mn(y.d)), (r = n.charAt(0)), v++;
    (o = y.e), r > 1 ? ((y = new x("0." + n)), o++) : (y = new x(r + "." + n.slice(1)));
  } else
    return (
      (c = Wp(x, d + 2, _).times(o + "")),
      (y = Qo(new x(r + "." + n.slice(1)), d - b).plus(c)),
      (x.precision = _),
      t == null ? Ie(y, _, S, (Xe = !0)) : y
    );
  for (h = y, u = a = y = yt(y.minus(1), y.plus(1), d, 1), p = Ie(y.times(y), d, 1), i = 3; ; ) {
    if (((a = Ie(a.times(p), d, 1)), (c = u.plus(yt(a, new x(i), d, 1))), mn(c.d).slice(0, d) === mn(u.d).slice(0, d)))
      if (
        ((u = u.times(2)),
        o !== 0 && (u = u.plus(Wp(x, d + 2, _).times(o + ""))),
        (u = yt(u, new x(v), d, 1)),
        t == null)
      ) {
        if (cf(u.d, d - b, S, s))
          (x.precision = d += b),
            (c = a = y = yt(h.minus(1), h.plus(1), d, 1)),
            (p = Ie(y.times(y), d, 1)),
            (i = s = 1);
        else return Ie(u, (x.precision = _), S, (Xe = !0));
      } else return (x.precision = _), u;
    (u = c), (i += 2);
  }
}
function KB(e) {
  return String((e.s * e.s) / 0);
}
function xp(e, t) {
  var n, r, i;
  for (
    (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (r = t.search(/e/i)) > 0
        ? (n < 0 && (n = r), (n += +t.slice(r + 1)), (t = t.substring(0, r)))
        : n < 0 && (n = t.length),
      r = 0;
    t.charCodeAt(r) === 48;
    r++
  );
  for (i = t.length; t.charCodeAt(i - 1) === 48; --i);
  if (((t = t.slice(r, i)), t)) {
    if (((i -= r), (e.e = n = n - r - 1), (e.d = []), (r = (n + 1) % Fe), n < 0 && (r += Fe), r < i)) {
      for (r && e.d.push(+t.slice(0, r)), i -= Fe; r < i; ) e.d.push(+t.slice(r, (r += Fe)));
      (t = t.slice(r)), (r = Fe - t.length);
    } else r -= i;
    for (; r--; ) t += "0";
    e.d.push(+t),
      Xe &&
        (e.e > e.constructor.maxE ? ((e.d = null), (e.e = NaN)) : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
  } else (e.e = 0), (e.d = [0]);
  return e;
}
function VX(e, t) {
  var n, r, i, o, a, s, u, c, d;
  if (t.indexOf("_") > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, "$1")), qB.test(t))) return xp(e, t);
  } else if (t === "Infinity" || t === "NaN") return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e;
  if (DX.test(t)) (n = 16), (t = t.toLowerCase());
  else if (IX.test(t)) n = 2;
  else if ($X.test(t)) n = 8;
  else throw Error(ua + t);
  for (
    o = t.search(/p/i),
      o > 0 ? ((u = +t.slice(o + 1)), (t = t.substring(2, o))) : (t = t.slice(2)),
      o = t.indexOf("."),
      a = o >= 0,
      r = e.constructor,
      a && ((t = t.replace(".", "")), (s = t.length), (o = s - o), (i = UB(r, new r(n), o, o * 2))),
      c = wp(t, n, Qr),
      d = c.length - 1,
      o = d;
    c[o] === 0;
    --o
  )
    c.pop();
  return o < 0
    ? new r(e.s * 0)
    : ((e.e = Cv(c, d)),
      (e.d = c),
      (Xe = !1),
      a && (e = yt(e, i, s * 4)),
      u && (e = e.times(Math.abs(u) < 54 ? Qt(2, u) : Ze.pow(2, u))),
      (Xe = !0),
      e);
}
function zX(e, t) {
  var n,
    r = t.d.length;
  if (r < 3) return t.isZero() ? t : Ml(e, 2, t, t);
  (n = 1.4 * Math.sqrt(r)), (n = n > 16 ? 16 : n | 0), (t = t.times(1 / kv(5, n))), (t = Ml(e, 2, t, t));
  for (var i, o = new e(5), a = new e(16), s = new e(20); n--; )
    (i = t.times(t)), (t = t.times(o.plus(i.times(a.times(i).minus(s)))));
  return t;
}
function Ml(e, t, n, r, i) {
  var o,
    a,
    s,
    u,
    c = e.precision,
    d = Math.ceil(c / Fe);
  for (Xe = !1, u = n.times(n), s = new e(r); ; ) {
    if (
      ((a = yt(s.times(u), new e(t++ * t++), c, 1)),
      (s = i ? r.plus(a) : r.minus(a)),
      (r = yt(a.times(u), new e(t++ * t++), c, 1)),
      (a = s.plus(r)),
      a.d[d] !== void 0)
    ) {
      for (o = d; a.d[o] === s.d[o] && o--; );
      if (o == -1) break;
    }
    (o = s), (s = r), (r = a), (a = o);
  }
  return (Xe = !0), (a.d.length = d + 1), a;
}
function kv(e, t) {
  for (var n = e; --t; ) n *= e;
  return n;
}
function GB(e, t) {
  var n,
    r = t.s < 0,
    i = hi(e, e.precision, 1),
    o = i.times(0.5);
  if (((t = t.abs()), t.lte(o))) return (Wi = r ? 4 : 1), t;
  if (((n = t.divToInt(i)), n.isZero())) Wi = r ? 3 : 2;
  else {
    if (((t = t.minus(n.times(i))), t.lte(o))) return (Wi = Lj(n) ? (r ? 2 : 3) : r ? 4 : 1), t;
    Wi = Lj(n) ? (r ? 1 : 4) : r ? 3 : 2;
  }
  return t.minus(i).abs();
}
function XA(e, t, n, r) {
  var i,
    o,
    a,
    s,
    u,
    c,
    d,
    h,
    p,
    v = e.constructor,
    b = n !== void 0;
  if (
    (b ? (Jn(n, 1, pa), r === void 0 ? (r = v.rounding) : Jn(r, 0, 8)) : ((n = v.precision), (r = v.rounding)),
    !e.isFinite())
  )
    d = KB(e);
  else {
    for (
      d = Ai(e),
        a = d.indexOf("."),
        b ? ((i = 2), t == 16 ? (n = n * 4 - 3) : t == 8 && (n = n * 3 - 2)) : (i = t),
        a >= 0 &&
          ((d = d.replace(".", "")),
          (p = new v(1)),
          (p.e = d.length - a),
          (p.d = wp(Ai(p), 10, i)),
          (p.e = p.d.length)),
        h = wp(d, 10, i),
        o = u = h.length;
      h[--u] == 0;

    )
      h.pop();
    if (!h[0]) d = b ? "0p+0" : "0";
    else {
      if (
        (a < 0
          ? o--
          : ((e = new v(e)), (e.d = h), (e.e = o), (e = yt(e, p, n, r, 0, i)), (h = e.d), (o = e.e), (c = BB)),
        (a = h[n]),
        (s = i / 2),
        (c = c || h[n + 1] !== void 0),
        (c =
          r < 4
            ? (a !== void 0 || c) && (r === 0 || r === (e.s < 0 ? 3 : 2))
            : a > s || (a === s && (r === 4 || c || (r === 6 && h[n - 1] & 1) || r === (e.s < 0 ? 8 : 7)))),
        (h.length = n),
        c)
      )
        for (; ++h[--n] > i - 1; ) (h[n] = 0), n || (++o, h.unshift(1));
      for (u = h.length; !h[u - 1]; --u);
      for (a = 0, d = ""; a < u; a++) d += US.charAt(h[a]);
      if (b) {
        if (u > 1)
          if (t == 16 || t == 8) {
            for (a = t == 16 ? 4 : 3, --u; u % a; u++) d += "0";
            for (h = wp(d, i, t), u = h.length; !h[u - 1]; --u);
            for (a = 1, d = "1."; a < u; a++) d += US.charAt(h[a]);
          } else d = d.charAt(0) + "." + d.slice(1);
        d = d + (o < 0 ? "p" : "p+") + o;
      } else if (o < 0) {
        for (; ++o; ) d = "0" + d;
        d = "0." + d;
      } else if (++o > u) for (o -= u; o--; ) d += "0";
      else o < u && (d = d.slice(0, o) + "." + d.slice(o));
    }
    d = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + d;
  }
  return e.s < 0 ? "-" + d : d;
}
function Bj(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function qX(e) {
  return new this(e).abs();
}
function WX(e) {
  return new this(e).acos();
}
function UX(e) {
  return new this(e).acosh();
}
function HX(e, t) {
  return new this(e).plus(t);
}
function KX(e) {
  return new this(e).asin();
}
function GX(e) {
  return new this(e).asinh();
}
function YX(e) {
  return new this(e).atan();
}
function XX(e) {
  return new this(e).atanh();
}
function ZX(e, t) {
  (e = new this(e)), (t = new this(t));
  var n,
    r = this.precision,
    i = this.rounding,
    o = r + 4;
  return (
    !e.s || !t.s
      ? (n = new this(NaN))
      : !e.d && !t.d
        ? ((n = hi(this, o, 1).times(t.s > 0 ? 0.25 : 0.75)), (n.s = e.s))
        : !t.d || e.isZero()
          ? ((n = t.s < 0 ? hi(this, r, i) : new this(0)), (n.s = e.s))
          : !e.d || t.isZero()
            ? ((n = hi(this, o, 1).times(0.5)), (n.s = e.s))
            : t.s < 0
              ? ((this.precision = o),
                (this.rounding = 1),
                (n = this.atan(yt(e, t, o, 1))),
                (t = hi(this, o, 1)),
                (this.precision = r),
                (this.rounding = i),
                (n = e.s < 0 ? n.minus(t) : n.plus(t)))
              : (n = this.atan(yt(e, t, o, 1))),
    n
  );
}
function QX(e) {
  return new this(e).cbrt();
}
function JX(e) {
  return Ie((e = new this(e)), e.e + 1, 2);
}
function eZ(e, t, n) {
  return new this(e).clamp(t, n);
}
function tZ(e) {
  if (!e || typeof e != "object") throw Error(Tv + "Object expected");
  var t,
    n,
    r,
    i = e.defaults === !0,
    o = [
      "precision",
      1,
      pa,
      "rounding",
      0,
      8,
      "toExpNeg",
      -ll,
      0,
      "toExpPos",
      0,
      ll,
      "maxE",
      0,
      ll,
      "minE",
      -ll,
      0,
      "modulo",
      0,
      9,
    ];
  for (t = 0; t < o.length; t += 3)
    if (((n = o[t]), i && (this[n] = HS[n]), (r = e[n]) !== void 0))
      if (Nn(r) === r && r >= o[t + 1] && r <= o[t + 2]) this[n] = r;
      else throw Error(ua + n + ": " + r);
  if (((n = "crypto"), i && (this[n] = HS[n]), (r = e[n]) !== void 0))
    if (r === !0 || r === !1 || r === 0 || r === 1) {
      if (r) {
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[n] = !0;
        else throw Error(VB);
      } else this[n] = !1;
    } else throw Error(ua + n + ": " + r);
  return this;
}
function nZ(e) {
  return new this(e).cos();
}
function rZ(e) {
  return new this(e).cosh();
}
function YB(e) {
  var t, n, r;
  function i(o) {
    var a,
      s,
      u,
      c = this;
    if (!(c instanceof i)) return new i(o);
    if (((c.constructor = i), Fj(o))) {
      (c.s = o.s),
        Xe
          ? !o.d || o.e > i.maxE
            ? ((c.e = NaN), (c.d = null))
            : o.e < i.minE
              ? ((c.e = 0), (c.d = [0]))
              : ((c.e = o.e), (c.d = o.d.slice()))
          : ((c.e = o.e), (c.d = o.d ? o.d.slice() : o.d));
      return;
    }
    if (((u = typeof o), u === "number")) {
      if (o === 0) {
        (c.s = 1 / o < 0 ? -1 : 1), (c.e = 0), (c.d = [0]);
        return;
      }
      if ((o < 0 ? ((o = -o), (c.s = -1)) : (c.s = 1), o === ~~o && o < 1e7)) {
        for (a = 0, s = o; s >= 10; s /= 10) a++;
        Xe
          ? a > i.maxE
            ? ((c.e = NaN), (c.d = null))
            : a < i.minE
              ? ((c.e = 0), (c.d = [0]))
              : ((c.e = a), (c.d = [o]))
          : ((c.e = a), (c.d = [o]));
        return;
      }
      if (o * 0 !== 0) {
        o || (c.s = NaN), (c.e = NaN), (c.d = null);
        return;
      }
      return xp(c, o.toString());
    }
    if (u === "string")
      return (
        (s = o.charCodeAt(0)) === 45 ? ((o = o.slice(1)), (c.s = -1)) : (s === 43 && (o = o.slice(1)), (c.s = 1)),
        qB.test(o) ? xp(c, o) : VX(c, o)
      );
    if (u === "bigint") return o < 0 ? ((o = -o), (c.s = -1)) : (c.s = 1), xp(c, o.toString());
    throw Error(ua + o);
  }
  if (
    ((i.prototype = ae),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.EUCLID = 9),
    (i.config = i.set = tZ),
    (i.clone = YB),
    (i.isDecimal = Fj),
    (i.abs = qX),
    (i.acos = WX),
    (i.acosh = UX),
    (i.add = HX),
    (i.asin = KX),
    (i.asinh = GX),
    (i.atan = YX),
    (i.atanh = XX),
    (i.atan2 = ZX),
    (i.cbrt = QX),
    (i.ceil = JX),
    (i.clamp = eZ),
    (i.cos = nZ),
    (i.cosh = rZ),
    (i.div = iZ),
    (i.exp = oZ),
    (i.floor = aZ),
    (i.hypot = sZ),
    (i.ln = lZ),
    (i.log = uZ),
    (i.log10 = fZ),
    (i.log2 = cZ),
    (i.max = dZ),
    (i.min = hZ),
    (i.mod = pZ),
    (i.mul = mZ),
    (i.pow = vZ),
    (i.random = yZ),
    (i.round = gZ),
    (i.sign = bZ),
    (i.sin = wZ),
    (i.sinh = xZ),
    (i.sqrt = SZ),
    (i.sub = _Z),
    (i.sum = PZ),
    (i.tan = AZ),
    (i.tanh = OZ),
    (i.trunc = EZ),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      r = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0;
      t < r.length;

    )
      e.hasOwnProperty((n = r[t++])) || (e[n] = this[n]);
  return i.config(e), i;
}
function iZ(e, t) {
  return new this(e).div(t);
}
function oZ(e) {
  return new this(e).exp();
}
function aZ(e) {
  return Ie((e = new this(e)), e.e + 1, 3);
}
function sZ() {
  var e,
    t,
    n = new this(0);
  for (Xe = !1, e = 0; e < arguments.length; )
    if (((t = new this(arguments[e++])), t.d)) n.d && (n = n.plus(t.times(t)));
    else {
      if (t.s) return (Xe = !0), new this(1 / 0);
      n = t;
    }
  return (Xe = !0), n.sqrt();
}
function Fj(e) {
  return e instanceof Ze || (e && e.toStringTag === zB) || !1;
}
function lZ(e) {
  return new this(e).ln();
}
function uZ(e, t) {
  return new this(e).log(t);
}
function cZ(e) {
  return new this(e).log(2);
}
function fZ(e) {
  return new this(e).log(10);
}
function dZ() {
  return HB(this, arguments, -1);
}
function hZ() {
  return HB(this, arguments, 1);
}
function pZ(e, t) {
  return new this(e).mod(t);
}
function mZ(e, t) {
  return new this(e).mul(t);
}
function vZ(e, t) {
  return new this(e).pow(t);
}
function yZ(e) {
  var t,
    n,
    r,
    i,
    o = 0,
    a = new this(1),
    s = [];
  if ((e === void 0 ? (e = this.precision) : Jn(e, 1, pa), (r = Math.ceil(e / Fe)), this.crypto)) {
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(r)); o < r; )
        (i = t[o]), i >= 429e7 ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0]) : (s[o++] = i % 1e7);
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes((r *= 4)); o < r; )
        (i = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24)),
          i >= 214e7 ? crypto.randomBytes(4).copy(t, o) : (s.push(i % 1e7), (o += 4));
      o = r / 4;
    } else throw Error(VB);
  } else for (; o < r; ) s[o++] = (Math.random() * 1e7) | 0;
  for (r = s[--o], e %= Fe, r && e && ((i = Qt(10, Fe - e)), (s[o] = ((r / i) | 0) * i)); s[o] === 0; o--) s.pop();
  if (o < 0) (n = 0), (s = [0]);
  else {
    for (n = -1; s[0] === 0; n -= Fe) s.shift();
    for (r = 1, i = s[0]; i >= 10; i /= 10) r++;
    r < Fe && (n -= Fe - r);
  }
  return (a.e = n), (a.d = s), a;
}
function gZ(e) {
  return Ie((e = new this(e)), e.e + 1, this.rounding);
}
function bZ(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN;
}
function wZ(e) {
  return new this(e).sin();
}
function xZ(e) {
  return new this(e).sinh();
}
function SZ(e) {
  return new this(e).sqrt();
}
function _Z(e, t) {
  return new this(e).sub(t);
}
function PZ() {
  var e = 0,
    t = arguments,
    n = new this(t[e]);
  for (Xe = !1; n.s && ++e < t.length; ) n = n.plus(t[e]);
  return (Xe = !0), Ie(n, this.precision, this.rounding);
}
function AZ(e) {
  return new this(e).tan();
}
function OZ(e) {
  return new this(e).tanh();
}
function EZ(e) {
  return Ie((e = new this(e)), e.e + 1, 1);
}
ae[Symbol.for("nodejs.util.inspect.custom")] = ae.toString;
ae[Symbol.toStringTag] = "Decimal";
var Ze = (ae.constructor = YB(HS));
zp = new Ze(zp);
qp = new Ze(qp);
