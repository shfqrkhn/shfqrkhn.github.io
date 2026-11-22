function hj({ direction: e, style: t, ...n }) {
  return jsxRuntime.jsx("svg", {
    style: {
      width: "var(--ni-chevron-size)",
      height: "var(--ni-chevron-size)",
      transform: e === "up" ? "rotate(180deg)" : void 0,
      ...t,
    },
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...n,
    children: jsxRuntime.jsx("path", {
      d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
}
var vS = {
  root: "m_e2f5cd4e",
  controls: "m_95e17d22",
  control: "m_80b4b171",
};
const $G = /^(0\.0*|-0(\.0*)?)$/,
  LG = /^-?0\d+(\.\d+)?\.?$/;
function yS(e) {
  return typeof e == "string" && e !== "" && !Number.isNaN(Number(e));
}
function E0(e) {
  return typeof e == "number"
    ? e < Number.MAX_SAFE_INTEGER
    : e === "" || (yS(e) && Number(e) < Number.MAX_SAFE_INTEGER);
}
function BG(e) {
  return e.toString().replace(".", "").length;
}
function FG(e, t) {
  return (
    (typeof e == "number" ? e < Number.MAX_SAFE_INTEGER : !Number.isNaN(Number(e))) &&
    !Number.isNaN(e) &&
    BG(t) < 14 &&
    t !== ""
  );
}
function pj(e, t, n) {
  if (e === void 0) return !0;
  const r = t === void 0 || e >= t,
    i = n === void 0 || e <= n;
  return r && i;
}
const VG = {
    step: 1,
    clampBehavior: "blur",
    allowDecimal: !0,
    allowNegative: !0,
    withKeyboardEvents: !0,
    allowLeadingZeros: !0,
    trimLeadingZeroesOnBlur: !0,
    startValue: 0,
  },
  zG = (e, { size: t }) => ({
    controls: {
      "--ni-chevron-size": dt(t, "ni-chevron-size"),
    },
  });
function qG(e, t, n) {
  const r = e.toString().replace(/^0+/, ""),
    i = parseFloat(r);
  return Number.isNaN(i) ? r : i > Number.MAX_SAFE_INTEGER ? (t !== void 0 ? String(t) : r) : Gi(i, n, t);
}
const $n = ke((e, t) => {
  const n = ye("NumberInput", VG, e),
    {
      className: r,
      classNames: i,
      styles: o,
      unstyled: a,
      vars: s,
      onChange: u,
      onValueChange: c,
      value: d,
      defaultValue: h,
      max: p,
      min: v,
      step: b,
      hideControls: y,
      rightSection: w,
      isAllowed: x,
      clampBehavior: S,
      onBlur: _,
      allowDecimal: E,
      decimalScale: P,
      onKeyDown: O,
      onKeyDownCapture: k,
      handlersRef: R,
      startValue: M,
      disabled: D,
      rightSectionPointerEvents: I,
      allowNegative: V,
      readOnly: z,
      size: q,
      rightSectionWidth: U,
      stepHoldInterval: B,
      stepHoldDelay: F,
      allowLeadingZeros: L,
      withKeyboardEvents: W,
      trimLeadingZeroesOnBlur: G,
      ...$
    } = n,
    K = et({
      name: "NumberInput",
      classes: vS,
      props: n,
      classNames: i,
      styles: o,
      unstyled: a,
      vars: s,
      varsResolver: zG,
    }),
    { resolvedClassNames: ne, resolvedStyles: he } = ev({
      classNames: i,
      styles: o,
      props: n,
    }),
    [le, pe] = Pi({
      value: d,
      defaultValue: h,
      finalValue: "",
      onChange: u,
    }),
    Pe = F !== void 0 && B !== void 0,
    xe = React.useRef(null),
    re = React.useRef(null),
    ve = React.useRef(0),
    je = (ge, Re) => {
      Re.source === "event" &&
        pe(FG(ge.floatValue, ge.value) && !$G.test(ge.value) && !(L && LG.test(ge.value)) ? ge.floatValue : ge.value),
        c?.(ge, Re);
    },
    ie = (ge) => {
      const Re = String(ge).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return Re ? Math.max(0, (Re[1] ? Re[1].length : 0) - (Re[2] ? +Re[2] : 0)) : 0;
    },
    Qe = (ge) => {
      xe.current && typeof ge < "u" && xe.current.setSelectionRange(ge, ge);
    },
    De = React.useRef(rS);
  De.current = () => {
    if (!E0(le)) return;
    let ge;
    const Re = ie(le),
      qt = ie(b),
      qn = Math.max(Re, qt),
      wn = 10 ** qn;
    if (!yS(le) && (typeof le != "number" || Number.isNaN(le))) ge = Gi(M, v, p);
    else if (p !== void 0) {
      const Bt = (Math.round(Number(le) * wn) + Math.round(b * wn)) / wn;
      ge = Bt <= p ? Bt : p;
    } else ge = (Math.round(Number(le) * wn) + Math.round(b * wn)) / wn;
    const Et = ge.toFixed(qn);
    pe(parseFloat(Et)),
      c?.(
        {
          floatValue: parseFloat(Et),
          formattedValue: Et,
          value: Et,
        },
        {
          source: "increment",
        },
      ),
      setTimeout(() => Qe(xe.current?.value.length), 0);
  };
  const Ve = React.useRef(rS);
  Ve.current = () => {
    if (!E0(le)) return;
    let ge;
    const Re = v !== void 0 ? v : V ? Number.MIN_SAFE_INTEGER : 0,
      qt = ie(le),
      qn = ie(b),
      wn = Math.max(qt, qn),
      Et = 10 ** wn;
    if ((!yS(le) && typeof le != "number") || Number.isNaN(le)) ge = Gi(M, Re, p);
    else {
      const Dr = (Math.round(Number(le) * Et) - Math.round(b * Et)) / Et;
      ge = Re !== void 0 && Dr < Re ? Re : Dr;
    }
    const Bt = ge.toFixed(wn);
    pe(parseFloat(Bt)),
      c?.(
        {
          floatValue: parseFloat(Bt),
          formattedValue: Bt,
          value: Bt,
        },
        {
          source: "decrement",
        },
      ),
      setTimeout(() => Qe(xe.current?.value.length), 0);
  };
  const ot = (ge) => {
      O?.(ge),
        !(z || !W) &&
          (ge.key === "ArrowUp" && (ge.preventDefault(), De.current()),
          ge.key === "ArrowDown" && (ge.preventDefault(), Ve.current()));
    },
    se = (ge) => {
      if ((k?.(ge), ge.key === "Backspace")) {
        const Re = xe.current;
        Re.selectionStart === 0 &&
          Re.selectionStart === Re.selectionEnd &&
          (ge.preventDefault(), window.setTimeout(() => Qe(0), 0));
      }
    },
    fe = (ge) => {
      let Re = le;
      S === "blur" && typeof Re == "number" && (Re = Gi(Re, v, p)),
        G && typeof Re == "string" && ie(Re) < 15 && (Re = qG(Re, p, v)),
        le !== Re && pe(Re),
        _?.(ge);
    };
  Xc(R, {
    increment: De.current,
    decrement: Ve.current,
  });
  const we = (ge) => {
      ge ? De.current() : Ve.current(), (ve.current += 1);
    },
    Ne = (ge) => {
      if ((we(ge), Pe)) {
        const Re = typeof B == "number" ? B : B(ve.current);
        re.current = window.setTimeout(() => Ne(ge), Re);
      }
    },
    Ke = (ge, Re) => {
      ge.preventDefault(), xe.current?.focus(), we(Re), Pe && (re.current = window.setTimeout(() => Ne(Re), F));
    },
    Ye = () => {
      re.current && window.clearTimeout(re.current), (re.current = null), (ve.current = 0);
    },
    Je = jsxRuntime.jsxs("div", {
      ...K("controls"),
      children: [
        jsxRuntime.jsx(ao, {
          ...K("control"),
          tabIndex: -1,
          "aria-hidden": !0,
          disabled: D || (typeof le == "number" && p !== void 0 && le >= p),
          mod: {
            direction: "up",
          },
          onMouseDown: (ge) => ge.preventDefault(),
          onPointerDown: (ge) => {
            Ke(ge, !0);
          },
          onPointerUp: Ye,
          onPointerLeave: Ye,
          children: jsxRuntime.jsx(hj, {
            direction: "up",
          }),
        }),
        jsxRuntime.jsx(ao, {
          ...K("control"),
          tabIndex: -1,
          "aria-hidden": !0,
          disabled: D || (typeof le == "number" && v !== void 0 && le <= v),
          mod: {
            direction: "down",
          },
          onMouseDown: (ge) => ge.preventDefault(),
          onPointerDown: (ge) => {
            Ke(ge, !1);
          },
          onPointerUp: Ye,
          onPointerLeave: Ye,
          children: jsxRuntime.jsx(hj, {
            direction: "down",
          }),
        }),
      ],
    });
  return jsxRuntime.jsx(cu, {
    component: DG,
    allowNegative: V,
    className: We(vS.root, r),
    size: q,
    ...$,
    readOnly: z,
    disabled: D,
    value: le,
    getInputRef: bn(t, xe),
    onValueChange: je,
    rightSection: y || z || !E0(le) ? w : w || Je,
    classNames: ne,
    styles: he,
    unstyled: a,
    __staticSelector: "NumberInput",
    decimalScale: E ? P : 0,
    onKeyDown: ot,
    onKeyDownCapture: se,
    rightSectionPointerEvents: I ?? (D ? "none" : void 0),
    rightSectionWidth: U ?? `var(--ni-right-section-width-${q || "sm"})`,
    allowLeadingZeros: L,
    onBlur: fe,
    isAllowed: (ge) =>
      S === "strict" ? (x ? x(ge) && pj(ge.floatValue, v, p) : pj(ge.floatValue, v, p)) : x ? x(ge) : !0,
  });
});
$n.classes = {
  ...cu.classes,
  ...vS,
};
$n.displayName = "@mantine/core/NumberInput";
const WG = {
  duration: 100,
  transition: "fade",
};
function UG(e, t) {
  return {
    ...WG,
    ...t,
    ...e,
  };
}
function HG({ offset: e, position: t, defaultOpened: n }) {
  const [r, i] = React.useState(n),
    o = React.useRef(null),
    {
      x: a,
      y: s,
      elements: u,
      refs: c,
      update: d,
      placement: h,
    } = YP({
      placement: t,
      middleware: [
        UP({
          crossAxis: !0,
          padding: 5,
          rootBoundary: "document",
        }),
      ],
    }),
    p = h.includes("right") ? e : t.includes("left") ? e * -1 : 0,
    v = h.includes("bottom") ? e : t.includes("top") ? e * -1 : 0,
    b = React.useCallback(
      ({ clientX: y, clientY: w }) => {
        c.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: y,
              y: w,
              left: y + p,
              top: w + v,
              right: y,
              bottom: w,
            };
          },
        });
      },
      [u.reference],
    );
  return (
    React.useEffect(() => {
      if (c.floating.current) {
        const y = o.current;
        y.addEventListener("mousemove", b);
        const w = Yi(c.floating.current);
        return (
          w.forEach((x) => {
            x.addEventListener("scroll", d);
          }),
          () => {
            y.removeEventListener("mousemove", b),
              w.forEach((x) => {
                x.removeEventListener("scroll", d);
              });
          }
        );
      }
    }, [u.reference, c.floating.current, d, b, r]),
    {
      handleMouseMove: b,
      x: a,
      y: s,
      opened: r,
      setOpened: i,
      boundaryRef: o,
      floating: c.setFloating,
    }
  );
}
var Pv = {
  tooltip: "m_1b3c8819",
  arrow: "m_f898399f",
};
const KG = {
    refProp: "ref",
    withinPortal: !0,
    offset: 10,
    defaultOpened: !1,
    position: "right",
    zIndex: po("popover"),
  },
  GG = (e, { radius: t, color: n }) => ({
    tooltip: {
      "--tooltip-radius": t === void 0 ? void 0 : gn(t),
      "--tooltip-bg": n ? Vn(n, e) : void 0,
      "--tooltip-color": n ? "var(--mantine-color-white)" : void 0,
    },
  }),
  TA = ke((e, t) => {
    const n = ye("TooltipFloating", KG, e),
      {
        children: r,
        refProp: i,
        withinPortal: o,
        style: a,
        className: s,
        classNames: u,
        styles: c,
        unstyled: d,
        radius: h,
        color: p,
        label: v,
        offset: b,
        position: y,
        multiline: w,
        zIndex: x,
        disabled: S,
        defaultOpened: _,
        variant: E,
        vars: P,
        portalProps: O,
        ...k
      } = n,
      R = ni(),
      M = et({
        name: "TooltipFloating",
        props: n,
        classes: Pv,
        className: s,
        style: a,
        classNames: u,
        styles: c,
        unstyled: d,
        rootSelector: "tooltip",
        vars: P,
        varsResolver: GG,
      }),
      {
        handleMouseMove: D,
        x: I,
        y: V,
        opened: z,
        boundaryRef: q,
        floating: U,
        setOpened: B,
      } = HG({
        offset: b,
        position: y,
        defaultOpened: _,
      });
    if (!vs(r))
      throw new Error(
        "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported",
      );
    const F = bn(q, Qm(r), t),
      L = r.props,
      W = ($) => {
        L.onMouseEnter?.($), D($), B(!0);
      },
      G = ($) => {
        L.onMouseLeave?.($), B(!1);
      };
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx(lu, {
          ...O,
          withinPortal: o,
          children: jsxRuntime.jsx(Se, {
            ...k,
            ...M("tooltip", {
              style: {
                ...$P(a, R),
                zIndex: x,
                display: !S && z ? "block" : "none",
                top: (V && Math.round(V)) ?? "",
                left: (I && Math.round(I)) ?? "",
              },
            }),
            variant: E,
            ref: U,
            mod: {
              multiline: w,
            },
            children: v,
          }),
        }),
        React.cloneElement(r, {
          ...L,
          [i]: F,
          onMouseEnter: W,
          onMouseLeave: G,
        }),
      ],
    });
  });
TA.classes = Pv;
TA.displayName = "@mantine/core/TooltipFloating";
const U5 = React.createContext(!1),
  YG = U5.Provider,
  XG = () => React.useContext(U5),
  ZG = {
    openDelay: 0,
    closeDelay: 0,
  };
function CA(e) {
  const { openDelay: t, closeDelay: n, children: r } = ye("TooltipGroup", ZG, e);
  return jsxRuntime.jsx(YG, {
    value: !0,
    children: jsxRuntime.jsx($U, {
      delay: {
        open: t,
        close: n,
      },
      children: r,
    }),
  });
}
CA.displayName = "@mantine/core/TooltipGroup";
CA.extend = (e) => e;
function QG(e) {
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
function JG(e) {
  const t = QG(e.middlewares),
    n = [jL(e.offset)];
  return (
    t.shift &&
      n.push(
        UP(
          typeof t.shift == "boolean"
            ? {
                padding: 8,
              }
            : {
                padding: 8,
                ...t.shift,
              },
        ),
      ),
    t.flip && n.push(typeof t.flip == "boolean" ? jp() : jp(t.flip)),
    n.push(
      RL({
        element: e.arrowRef,
        padding: e.arrowOffset,
      }),
    ),
    t.inline ? n.push(typeof t.inline == "boolean" ? Nc() : Nc(t.inline)) : e.inline && n.push(Nc()),
    n
  );
}
function eY(e) {
  const [t, n] = React.useState(e.defaultOpened),
    i = typeof e.opened == "boolean" ? e.opened : t,
    o = XG(),
    a = mo(),
    s = React.useCallback(
      (O) => {
        n(O), O && S(a);
      },
      [a],
    ),
    {
      x: u,
      y: c,
      context: d,
      refs: h,
      update: p,
      placement: v,
      middlewareData: { arrow: { x: b, y } = {} },
    } = YP({
      strategy: e.strategy,
      placement: e.position,
      open: i,
      onOpenChange: s,
      middleware: JG(e),
    }),
    {
      delay: w,
      currentId: x,
      setCurrentId: S,
    } = LU(d, {
      id: a,
    }),
    { getReferenceProps: _, getFloatingProps: E } = UU([
      IU(d, {
        enabled: e.events?.hover,
        delay: o
          ? w
          : {
              open: e.openDelay,
              close: e.closeDelay,
            },
        mouseOnly: !e.events?.touch,
      }),
      WU(d, {
        enabled: e.events?.focus,
        visibleOnly: !0,
      }),
      KU(d, {
        role: "tooltip",
      }),
      zU(d, {
        enabled: typeof e.opened > "u",
      }),
    ]);
  i5({
    opened: i,
    position: e.position,
    positionDependencies: e.positionDependencies,
    floating: {
      refs: h,
      update: p,
    },
  }),
    ia(() => {
      e.onPositionChange?.(v);
    }, [v]);
  const P = i && x && x !== a;
  return {
    x: u,
    y: c,
    arrowX: b,
    arrowY: y,
    reference: h.setReference,
    floating: h.setFloating,
    getFloatingProps: E,
    getReferenceProps: _,
    isGroupPhase: P,
    opened: i,
    placement: v,
  };
}
const mj = {
    position: "top",
    refProp: "ref",
    withinPortal: !0,
    inline: !1,
    defaultOpened: !1,
    arrowSize: 4,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: "side",
    offset: 5,
    transitionProps: {
      duration: 100,
      transition: "fade",
    },
    events: {
      hover: !0,
      focus: !1,
      touch: !1,
    },
    zIndex: po("popover"),
    positionDependencies: [],
    middlewares: {
      flip: !0,
      shift: !0,
      inline: !1,
    },
  },
  tY = (e, { radius: t, color: n }) => ({
    tooltip: {
      "--tooltip-radius": t === void 0 ? void 0 : gn(t),
      "--tooltip-bg": n ? Vn(n, e) : void 0,
      "--tooltip-color": n ? "var(--mantine-color-white)" : void 0,
    },
  }),
  hu = ke((e, t) => {
    const n = ye("Tooltip", mj, e),
      {
        children: r,
        position: i,
        refProp: o,
        label: a,
        openDelay: s,
        closeDelay: u,
        onPositionChange: c,
        opened: d,
        defaultOpened: h,
        withinPortal: p,
        radius: v,
        color: b,
        classNames: y,
        styles: w,
        unstyled: x,
        style: S,
        className: _,
        withArrow: E,
        arrowSize: P,
        arrowOffset: O,
        arrowRadius: k,
        arrowPosition: R,
        offset: M,
        transitionProps: D,
        multiline: I,
        events: V,
        zIndex: z,
        disabled: q,
        positionDependencies: U,
        onClick: B,
        onMouseEnter: F,
        onMouseLeave: L,
        inline: W,
        variant: G,
        keepMounted: $,
        vars: K,
        portalProps: ne,
        mod: he,
        floatingStrategy: le,
        middlewares: pe,
        ...Pe
      } = ye("Tooltip", mj, n),
      { dir: xe } = ou(),
      re = React.useRef(null),
      ve = eY({
        position: ZL(xe, i),
        closeDelay: u,
        openDelay: s,
        onPositionChange: c,
        opened: d,
        defaultOpened: h,
        events: V,
        arrowRef: re,
        arrowOffset: O,
        offset: typeof M == "number" ? M + (E ? P / 2 : 0) : M,
        positionDependencies: [...U, r],
        inline: W,
        strategy: le,
        middlewares: pe,
      }),
      je = et({
        name: "Tooltip",
        props: n,
        classes: Pv,
        className: _,
        style: S,
        classNames: y,
        styles: w,
        unstyled: x,
        rootSelector: "tooltip",
        vars: K,
        varsResolver: tY,
      });
    if (!vs(r))
      throw new Error(
        "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported",
      );
    const ie = bn(ve.reference, Qm(r), t),
      Qe = UG(D, {
        duration: 100,
        transition: "fade",
      }),
      De = r.props;
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx(lu, {
          ...ne,
          withinPortal: p,
          children: jsxRuntime.jsx(yo, {
            ...Qe,
            keepMounted: $,
            mounted: !q && !!ve.opened,
            duration: ve.isGroupPhase ? 10 : Qe.duration,
            children: (Ve) =>
              jsxRuntime.jsxs(Se, {
                ...Pe,
                "data-fixed": le === "fixed" || void 0,
                variant: G,
                mod: [
                  {
                    multiline: I,
                  },
                  he,
                ],
                ...ve.getFloatingProps({
                  ref: ve.floating,
                  className: je("tooltip").className,
                  style: {
                    ...je("tooltip").style,
                    ...Ve,
                    zIndex: z,
                    top: ve.y ?? 0,
                    left: ve.x ?? 0,
                  },
                }),
                children: [
                  a,
                  jsxRuntime.jsx(tA, {
                    ref: re,
                    arrowX: ve.arrowX,
                    arrowY: ve.arrowY,
                    visible: E,
                    position: ve.placement,
                    arrowSize: P,
                    arrowOffset: O,
                    arrowRadius: k,
                    arrowPosition: R,
                    ...je("arrow"),
                  }),
                ],
              }),
          }),
        }),
        React.cloneElement(
          r,
          ve.getReferenceProps({
            onClick: B,
            onMouseEnter: F,
            onMouseLeave: L,
            onMouseMove: n.onMouseMove,
            onPointerDown: n.onPointerDown,
            onPointerEnter: n.onPointerEnter,
            className: We(_, De.className),
            ...De,
            [o]: ie,
          }),
        ),
      ],
    });
  });
hu.classes = Pv;
hu.displayName = "@mantine/core/Tooltip";
hu.Floating = TA;
hu.Group = CA;
const nY = {
    searchable: !1,
    withCheckIcon: !0,
    allowDeselect: !0,
    checkIconPosition: "left",
  },
  Mp = ke((e, t) => {
    const n = ye("Select", nY, e),
      {
        classNames: r,
        styles: i,
        unstyled: o,
        vars: a,
        dropdownOpened: s,
        defaultDropdownOpened: u,
        onDropdownClose: c,
        onDropdownOpen: d,
        onFocus: h,
        onBlur: p,
        onClick: v,
        onChange: b,
        data: y,
        value: w,
        defaultValue: x,
        selectFirstOptionOnChange: S,
        onOptionSubmit: _,
        comboboxProps: E,
        readOnly: P,
        disabled: O,
        filter: k,
        limit: R,
        withScrollArea: M,
        maxDropdownHeight: D,
        size: I,
        searchable: V,
        rightSection: z,
        checkIconPosition: q,
        withCheckIcon: U,
        nothingFoundMessage: B,
        name: F,
        form: L,
        searchValue: W,
        defaultSearchValue: G,
        onSearchChange: $,
        allowDeselect: K,
        error: ne,
        rightSectionPointerEvents: he,
        id: le,
        clearable: pe,
        clearButtonProps: Pe,
        hiddenInputProps: xe,
        renderOption: re,
        onClear: ve,
        autoComplete: je,
        scrollAreaProps: ie,
        __defaultRightSection: Qe,
        __clearSection: De,
        __clearable: Ve,
        chevronColor: ot,
        ...se
      } = n,
      fe = React.useMemo(() => mK(y), [y]),
      we = React.useMemo(() => _5(fe), [fe]),
      Ne = mo(le),
      [Ke, Ye, Je] = Pi({
        value: w,
        defaultValue: x,
        finalValue: null,
        onChange: b,
      }),
      ge = typeof Ke == "string" ? we[Ke] : void 0,
      Re = Y7(ge),
      [qt, qn, wn] = Pi({
        value: W,
        defaultValue: G,
        finalValue: ge ? ge.label : "",
        onChange: $,
      }),
      Et = C5({
        opened: s,
        defaultOpened: u,
        onDropdownOpen: () => {
          d?.(),
            Et.updateSelectedOptionIndex("active", {
              scrollIntoView: !0,
            });
        },
        onDropdownClose: () => {
          c?.(), Et.resetSelectedOption();
        },
      }),
      Bt = (xn) => {
        qn(xn), Et.resetSelectedOption();
      },
      { resolvedClassNames: Dr, resolvedStyles: Sd } = ev({
        props: n,
        styles: i,
        classNames: r,
      });
    React.useEffect(() => {
      S && Et.selectFirstOption();
    }, [S, qt]),
      React.useEffect(() => {
        w === null && Bt(""),
          typeof w == "string" && ge && (Re?.value !== ge.value || Re?.label !== ge.label) && Bt(ge.label);
      }, [w, ge]),
      React.useEffect(() => {
        !Je && !wn && Bt((typeof Ke == "string" && we[Ke]?.label) || "");
      }, [y, Ke]);
    const _d = jsxRuntime.jsx(mt.ClearButton, {
        ...Pe,
        onClear: () => {
          Ye(null, null), Bt(""), ve?.();
        },
      }),
      Eu = pe && !!Ke && !O && !P;
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsxs(mt, {
          store: Et,
          __staticSelector: "Select",
          classNames: Dr,
          styles: Sd,
          unstyled: o,
          readOnly: P,
          onOptionSubmit: (xn) => {
            _?.(xn);
            const _o = K && we[xn].value === Ke ? null : we[xn],
              xa = _o ? _o.value : null;
            xa !== Ke && Ye(xa, _o), !Je && Bt((typeof xa == "string" && _o?.label) || ""), Et.closeDropdown();
          },
          size: I,
          ...E,
          children: [
            jsxRuntime.jsx(mt.Target, {
              targetType: V ? "input" : "button",
              autoComplete: je,
              children: jsxRuntime.jsx(cu, {
                id: Ne,
                ref: t,
                __defaultRightSection: jsxRuntime.jsx(mt.Chevron, {
                  size: I,
                  error: ne,
                  unstyled: o,
                  color: ot,
                }),
                __clearSection: _d,
                __clearable: Eu,
                rightSection: z,
                rightSectionPointerEvents: he || (Eu ? "all" : "none"),
                ...se,
                size: I,
                __staticSelector: "Select",
                disabled: O,
                readOnly: P || !V,
                value: qt,
                onChange: (xn) => {
                  Bt(xn.currentTarget.value), Et.openDropdown(), S && Et.selectFirstOption();
                },
                onFocus: (xn) => {
                  V && Et.openDropdown(), h?.(xn);
                },
                onBlur: (xn) => {
                  V && Et.closeDropdown(), Bt((Ke != null && we[Ke]?.label) || ""), p?.(xn);
                },
                onClick: (xn) => {
                  V ? Et.openDropdown() : Et.toggleDropdown(), v?.(xn);
                },
                classNames: Dr,
                styles: Sd,
                unstyled: o,
                pointer: !V,
                error: ne,
              }),
            }),
            jsxRuntime.jsx(VK, {
              data: fe,
              hidden: P || O,
              filter: k,
              search: qt,
              limit: R,
              hiddenWhenEmpty: !B,
              withScrollArea: M,
              maxDropdownHeight: D,
              filterOptions: V && ge?.label !== qt,
              value: Ke,
              checkIconPosition: q,
              withCheckIcon: U,
              nothingFoundMessage: B,
              unstyled: o,
              labelId: se.label ? `${Ne}-label` : void 0,
              "aria-label": se.label ? void 0 : se["aria-label"],
              renderOption: re,
              scrollAreaProps: ie,
            }),
          ],
        }),
        jsxRuntime.jsx(mt.HiddenInput, {
          value: Ke,
          name: F,
          form: L,
          disabled: O,
          ...xe,
        }),
      ],
    });
  });
Mp.classes = {
  ...cu.classes,
  ...mt.classes,
};
Mp.displayName = "@mantine/core/Select";
const [rY, Av] = kr("SliderProvider was not found in tree"),
  H5 = React.forwardRef(({ size: e, disabled: t, variant: n, color: r, thumbSize: i, radius: o, ...a }, s) => {
    const { getStyles: u } = Av();
    return jsxRuntime.jsx(Se, {
      tabIndex: -1,
      variant: n,
      size: e,
      ref: s,
      ...u("root"),
      ...a,
    });
  });
H5.displayName = "@mantine/core/SliderRoot";
const K5 = React.forwardRef(
  (
    {
      max: e,
      min: t,
      value: n,
      position: r,
      label: i,
      dragging: o,
      onMouseDown: a,
      onKeyDownCapture: s,
      labelTransitionProps: u,
      labelAlwaysOn: c,
      thumbLabel: d,
      onFocus: h,
      onBlur: p,
      showLabelOnHover: v,
      isHovered: b,
      children: y = null,
      disabled: w,
    },
    x,
  ) => {
    const { getStyles: S } = Av(),
      [_, E] = React.useState(!1),
      P = c || o || _ || (v && b);
    return jsxRuntime.jsxs(Se, {
      tabIndex: 0,
      role: "slider",
      "aria-label": d,
      "aria-valuemax": e,
      "aria-valuemin": t,
      "aria-valuenow": n,
      ref: x,
      __vars: {
        "--slider-thumb-offset": `${r}%`,
      },
      ...S("thumb", {
        focusable: !0,
      }),
      mod: {
        dragging: o,
        disabled: w,
      },
      onFocus: (O) => {
        E(!0), typeof h == "function" && h(O);
      },
      onBlur: (O) => {
        E(!1), typeof p == "function" && p(O);
      },
      onTouchStart: a,
      onMouseDown: a,
      onKeyDownCapture: s,
      onClick: (O) => O.stopPropagation(),
      children: [
        y,
        jsxRuntime.jsx(yo, {
          mounted: i != null && !!P,
          transition: "fade",
          duration: 0,
          ...u,
          children: (O) =>
            jsxRuntime.jsx("div", {
              ...S("label", {
                style: O,
              }),
              children: i,
            }),
        }),
      ],
    });
  },
);
K5.displayName = "@mantine/core/SliderThumb";
function G5({ value: e, min: t, max: n }) {
  const r = ((e - t) / (n - t)) * 100;
  return Math.min(Math.max(r, 0), 100);
}
function iY({ mark: e, offset: t, value: n, inverted: r = !1 }) {
  return r
    ? (typeof t == "number" && e.value <= t) || e.value >= n
    : typeof t == "number"
      ? e.value >= t && e.value <= n
      : e.value <= n;
}
function Y5({ marks: e, min: t, max: n, disabled: r, value: i, offset: o, inverted: a }) {
  const { getStyles: s } = Av();
  if (!e) return null;
  const u = e.map((c, d) =>
    React.createElement(
      Se,
      {
        ...s("markWrapper"),
        __vars: {
          "--mark-offset": `${G5({
            value: c.value,
            min: t,
            max: n,
          })}%`,
        },
        key: d,
      },
      jsxRuntime.jsx(Se, {
        ...s("mark"),
        mod: {
          filled: iY({
            mark: c,
            value: i,
            offset: o,
            inverted: a,
          }),
          disabled: r,
        },
      }),
      c.label &&
        jsxRuntime.jsx("div", {
          ...s("markLabel"),
          children: c.label,
        }),
    ),
  );
  return jsxRuntime.jsx("div", {
    children: u,
  });
}
Y5.displayName = "@mantine/core/SliderMarks";
function X5({ filled: e, children: t, offset: n, disabled: r, marksOffset: i, inverted: o, containerProps: a, ...s }) {
  const { getStyles: u } = Av();
  return jsxRuntime.jsx(Se, {
    ...u("trackContainer"),
    mod: {
      disabled: r,
    },
    ...a,
    children: jsxRuntime.jsxs(Se, {
      ...u("track"),
      mod: {
        inverted: o,
        disabled: r,
      },
      children: [
        jsxRuntime.jsx(Se, {
          mod: {
            inverted: o,
            disabled: r,
          },
          __vars: {
            "--slider-bar-width": `calc(${e}% + var(--slider-size))`,
            "--slider-bar-offset": `calc(${n}% - var(--slider-size))`,
          },
          ...u("bar"),
        }),
        t,
        jsxRuntime.jsx(Y5, {
          ...s,
          offset: i,
          disabled: r,
          inverted: o,
        }),
      ],
    }),
  });
}
X5.displayName = "@mantine/core/SliderTrack";
function oY({ value: e, containerWidth: t, min: n, max: r, step: i, precision: o }) {
  const s = (t ? Math.min(Math.max(e, 0), t) / t : e) * (r - n),
    u = (s !== 0 ? Math.round(s / i) * i : 0) + n,
    c = Math.max(u, n);
  return o !== void 0 ? Number(c.toFixed(o)) : c;
}
function Lh(e, t) {
  return parseFloat(e.toFixed(t));
}
function aY(e) {
  if (!e) return 0;
  const t = e.toString().split(".");
  return t.length > 1 ? t[1].length : 0;
}
function T0(e, t) {
  const r = [...t].sort((i, o) => i.value - o.value).find((i) => i.value > e);
  return r ? r.value : e;
}
function C0(e, t) {
  const r = [...t].sort((i, o) => o.value - i.value).find((i) => i.value < e);
  return r ? r.value : e;
}
function vj(e) {
  const t = [...e].sort((n, r) => n.value - r.value);
  return t.length > 0 ? t[0].value : 0;
}
function yj(e) {
  const t = [...e].sort((n, r) => n.value - r.value);
  return t.length > 0 ? t[t.length - 1].value : 100;
}
var Z5 = {
  root: "m_dd36362e",
  label: "m_c9357328",
  thumb: "m_c9a9a60a",
  trackContainer: "m_a8645c2",
  track: "m_c9ade57f",
  bar: "m_38aeed47",
  markWrapper: "m_b7b0423a",
  mark: "m_dd33bc19",
  markLabel: "m_68c77a5b",
};
const sY = {
    radius: "xl",
    min: 0,
    max: 100,
    step: 1,
    marks: [],
    label: (e) => e,
    labelTransitionProps: {
      transition: "fade",
      duration: 0,
    },
    labelAlwaysOn: !1,
    thumbLabel: "",
    showLabelOnHover: !0,
    disabled: !1,
    scale: (e) => e,
  },
  lY = (e, { size: t, color: n, thumbSize: r, radius: i }) => ({
    root: {
      "--slider-size": dt(t, "slider-size"),
      "--slider-color": n ? Vn(n, e) : void 0,
      "--slider-radius": i === void 0 ? void 0 : gn(i),
      "--slider-thumb-size": r !== void 0 ? oe(r) : "calc(var(--slider-size) * 2)",
    },
  }),
  sl = ke((e, t) => {
    const n = ye("Slider", sY, e),
      {
        classNames: r,
        styles: i,
        value: o,
        onChange: a,
        onChangeEnd: s,
        size: u,
        min: c,
        max: d,
        step: h,
        precision: p,
        defaultValue: v,
        name: b,
        marks: y,
        label: w,
        labelTransitionProps: x,
        labelAlwaysOn: S,
        thumbLabel: _,
        showLabelOnHover: E,
        thumbChildren: P,
        disabled: O,
        unstyled: k,
        scale: R,
        inverted: M,
        className: D,
        style: I,
        vars: V,
        hiddenInputProps: z,
        restrictToMarks: q,
        thumbProps: U,
        ...B
      } = n,
      F = et({
        name: "Slider",
        props: n,
        classes: Z5,
        classNames: r,
        className: D,
        styles: i,
        style: I,
        vars: V,
        varsResolver: lY,
        unstyled: k,
      }),
      { dir: L } = ou(),
      [W, G] = React.useState(!1),
      [$, K] = Pi({
        value: typeof o == "number" ? Gi(o, c, d) : o,
        defaultValue: typeof v == "number" ? Gi(v, c, d) : v,
        finalValue: Gi(0, c, d),
        onChange: a,
      }),
      ne = React.useRef($),
      he = React.useRef(s);
    React.useEffect(() => {
      he.current = s;
    }, [s]);
    const le = React.useRef(null),
      pe = React.useRef(null),
      Pe = G5({
        value: $,
        min: c,
        max: d,
      }),
      xe = R($),
      re = typeof w == "function" ? w(xe) : w,
      ve = p ?? aY(h),
      je = React.useCallback(
        ({ x: se }) => {
          if (!O) {
            const fe = oY({
              value: se,
              min: c,
              max: d,
              step: h,
              precision: ve,
            });
            K(
              q && y?.length
                ? Ok(
                    fe,
                    y.map((we) => we.value),
                  )
                : fe,
            ),
              (ne.current = fe);
          }
        },
        [O, c, d, h, ve, K, y, q],
      ),
      ie = React.useCallback(() => {
        if (!O && he.current) {
          const se =
            q && y?.length
              ? Ok(
                  ne.current,
                  y.map((fe) => fe.value),
                )
              : ne.current;
          he.current(se);
        }
      }, [O, y, q]),
      { ref: Qe, active: De } = G7(
        je,
        {
          onScrubEnd: ie,
        },
        L,
      ),
      Ve = React.useCallback(
        (se) => {
          !O && he.current && he.current(se);
        },
        [O],
      ),
      ot = (se) => {
        if (!O)
          switch (se.key) {
            case "ArrowUp": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                const we = T0($, y);
                K(we), Ve(we);
                break;
              }
              const fe = Lh(Math.min(Math.max($ + h, c), d), ve);
              K(fe), Ve(fe);
              break;
            }
            case "ArrowRight": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                const we = L === "rtl" ? C0($, y) : T0($, y);
                K(we), Ve(we);
                break;
              }
              const fe = Lh(Math.min(Math.max(L === "rtl" ? $ - h : $ + h, c), d), ve);
              K(fe), Ve(fe);
              break;
            }
            case "ArrowDown": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                const we = C0($, y);
                K(we), Ve(we);
                break;
              }
              const fe = Lh(Math.min(Math.max($ - h, c), d), ve);
              K(fe), Ve(fe);
              break;
            }
            case "ArrowLeft": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                const we = L === "rtl" ? T0($, y) : C0($, y);
                K(we), Ve(we);
                break;
              }
              const fe = Lh(Math.min(Math.max(L === "rtl" ? $ + h : $ - h, c), d), ve);
              K(fe), Ve(fe);
              break;
            }
            case "Home": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                K(vj(y)), Ve(vj(y));
                break;
              }
              K(c), Ve(c);
              break;
            }
            case "End": {
              if ((se.preventDefault(), pe.current?.focus(), q && y)) {
                K(yj(y)), Ve(yj(y));
                break;
              }
              K(d), Ve(d);
              break;
            }
          }
      };
    return jsxRuntime.jsx(rY, {
      value: {
        getStyles: F,
      },
      children: jsxRuntime.jsxs(H5, {
        ...B,
        ref: bn(t, le),
        onKeyDownCapture: ot,
        onMouseDownCapture: () => le.current?.focus(),
        size: u,
        disabled: O,
        children: [
          jsxRuntime.jsx(X5, {
            inverted: M,
            offset: 0,
            filled: Pe,
            marks: y,
            min: c,
            max: d,
            value: xe,
            disabled: O,
            containerProps: {
              ref: Qe,
              onMouseEnter: E ? () => G(!0) : void 0,
              onMouseLeave: E ? () => G(!1) : void 0,
            },
            children: jsxRuntime.jsx(K5, {
              max: d,
              min: c,
              value: xe,
              position: Pe,
              dragging: De,
              label: re,
              ref: pe,
              labelTransitionProps: x,
              labelAlwaysOn: S,
              thumbLabel: _,
              showLabelOnHover: E,
              isHovered: W,
              disabled: O,
              ...U,
              children: P,
            }),
          }),
          jsxRuntime.jsx("input", {
            type: "hidden",
            name: b,
            value: xe,
            ...z,
          }),
        ],
      }),
    });
  });
sl.classes = Z5;
sl.displayName = "@mantine/core/Slider";
var Q5 = {
  root: "m_6d731127",
};
const uY = {
    gap: "md",
    align: "stretch",
    justify: "flex-start",
  },
  cY = (e, { gap: t, align: n, justify: r }) => ({
    root: {
      "--stack-gap": ls(t),
      "--stack-align": n,
      "--stack-justify": r,
    },
  }),
  wl = ke((e, t) => {
    const n = ye("Stack", uY, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        align: c,
        justify: d,
        gap: h,
        variant: p,
        ...v
      } = n,
      b = et({
        name: "Stack",
        props: n,
        classes: Q5,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: cY,
      });
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...b("root"),
      variant: p,
      ...v,
    });
  });
wl.classes = Q5;
wl.displayName = "@mantine/core/Stack";
const J5 = React.createContext(null),
  fY = J5.Provider,
  dY = () => React.useContext(J5),
  hY = {},
  kA = ke((e, t) => {
    const {
        value: n,
        defaultValue: r,
        onChange: i,
        size: o,
        wrapperProps: a,
        children: s,
        readOnly: u,
        ...c
      } = ye("SwitchGroup", hY, e),
      [d, h] = Pi({
        value: n,
        defaultValue: r,
        finalValue: [],
        onChange: i,
      }),
      p = (v) => {
        const b = v.currentTarget.value;
        !u && h(d.includes(b) ? d.filter((y) => y !== b) : [...d, b]);
      };
    return jsxRuntime.jsx(fY, {
      value: {
        value: d,
        onChange: p,
        size: o,
      },
      children: jsxRuntime.jsx(un.Wrapper, {
        size: o,
        ref: t,
        ...a,
        ...c,
        labelElement: "div",
        __staticSelector: "SwitchGroup",
        children: jsxRuntime.jsx($K, {
          role: "group",
          children: s,
        }),
      }),
    });
  });
kA.classes = un.Wrapper.classes;
kA.displayName = "@mantine/core/SwitchGroup";
var eB = {
  root: "m_5f93f3bb",
  input: "m_926b4011",
  track: "m_9307d992",
  thumb: "m_93039a1d",
  trackLabel: "m_8277e082",
};
const pY = {
    labelPosition: "right",
  },
  mY = (e, { radius: t, color: n, size: r }) => ({
    root: {
      "--switch-radius": t === void 0 ? void 0 : gn(t),
      "--switch-height": dt(r, "switch-height"),
      "--switch-width": dt(r, "switch-width"),
      "--switch-thumb-size": dt(r, "switch-thumb-size"),
      "--switch-label-font-size": dt(r, "switch-label-font-size"),
      "--switch-track-label-padding": dt(r, "switch-track-label-padding"),
      "--switch-color": n ? Vn(n, e) : void 0,
    },
  }),
  xl = ke((e, t) => {
    const n = ye("Switch", pY, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        color: c,
        label: d,
        offLabel: h,
        onLabel: p,
        id: v,
        size: b,
        radius: y,
        wrapperProps: w,
        thumbIcon: x,
        checked: S,
        defaultChecked: _,
        onChange: E,
        labelPosition: P,
        description: O,
        error: k,
        disabled: R,
        variant: M,
        rootRef: D,
        mod: I,
        ...V
      } = n,
      z = dY(),
      q = b || z?.size,
      U = et({
        name: "Switch",
        props: n,
        classes: eB,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: mY,
      }),
      { styleProps: B, rest: F } = tv(V),
      L = mo(v),
      W = z
        ? {
            checked: z.value.includes(F.value),
            onChange: z.onChange,
          }
        : {},
      [G, $] = Pi({
        value: W.checked ?? S,
        defaultValue: _,
        finalValue: !1,
      });
    return jsxRuntime.jsxs(j5, {
      ...U("root"),
      __staticSelector: "Switch",
      __stylesApiProps: n,
      id: L,
      size: q,
      labelPosition: P,
      label: d,
      description: O,
      error: k,
      disabled: R,
      bodyElement: "label",
      labelElement: "span",
      classNames: r,
      styles: a,
      unstyled: s,
      "data-checked": W.checked || S || void 0,
      variant: M,
      ref: D,
      mod: I,
      ...B,
      ...w,
      children: [
        jsxRuntime.jsx("input", {
          ...F,
          disabled: R,
          checked: G,
          "data-checked": W.checked || S || void 0,
          onChange: (K) => {
            z ? W.onChange?.(K) : E?.(K), $(K.currentTarget.checked);
          },
          id: L,
          ref: t,
          type: "checkbox",
          role: "switch",
          ...U("input"),
        }),
        jsxRuntime.jsxs(Se, {
          "aria-hidden": "true",
          component: "span",
          mod: {
            error: k,
            "label-position": P,
            "without-labels": !p && !h,
          },
          ...U("track"),
          children: [
            jsxRuntime.jsx(Se, {
              component: "span",
              mod: "reduce-motion",
              ...U("thumb"),
              children: x,
            }),
            jsxRuntime.jsx("span", {
              ...U("trackLabel"),
              children: G ? p : h,
            }),
          ],
        }),
      ],
    });
  });
xl.classes = {
  ...eB,
  ...DK,
};
xl.displayName = "@mantine/core/Switch";
xl.Group = kA;
const [vY, yY] = kr("Table component was not found in the tree");
var od = {
  table: "m_b23fa0ef",
  th: "m_4e7aa4f3",
  tr: "m_4e7aa4fd",
  td: "m_4e7aa4ef",
  tbody: "m_b2404537",
  thead: "m_b242d975",
  caption: "m_9e5a3ac7",
  scrollContainer: "m_a100c15",
  scrollContainerInner: "m_62259741",
};
function gY(e, t) {
  if (!t) return;
  const n = {};
  return (
    t.columnBorder && e.withColumnBorders && (n["data-with-column-border"] = !0),
    t.rowBorder && e.withRowBorders && (n["data-with-row-border"] = !0),
    t.striped && e.striped && (n["data-striped"] = e.striped),
    t.highlightOnHover && e.highlightOnHover && (n["data-hover"] = !0),
    t.captionSide && e.captionSide && (n["data-side"] = e.captionSide),
    t.stickyHeader && e.stickyHeader && (n["data-sticky"] = !0),
    n
  );
}
function ys(e, t) {
  const n = `Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,
    r = ke((i, o) => {
      const a = ye(n, {}, i),
        { classNames: s, className: u, style: c, styles: d, ...h } = a,
        p = yY();
      return jsxRuntime.jsx(Se, {
        component: e,
        ref: o,
        ...gY(p, t),
        ...p.getStyles(e, {
          className: u,
          classNames: s,
          style: c,
          styles: d,
          props: a,
        }),
        ...h,
      });
    });
  return (r.displayName = `@mantine/core/${n}`), (r.classes = od), r;
}
const gS = ys("th", {
    columnBorder: !0,
  }),
  tB = ys("td", {
    columnBorder: !0,
  }),
  dp = ys("tr", {
    rowBorder: !0,
    striped: !0,
    highlightOnHover: !0,
  }),
  nB = ys("thead", {
    stickyHeader: !0,
  }),
  rB = ys("tbody"),
  iB = ys("tfoot"),
  oB = ys("caption", {
    captionSide: !0,
  });
function jA({ data: e }) {
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      e.caption &&
        jsxRuntime.jsx(oB, {
          children: e.caption,
        }),
      e.head &&
        jsxRuntime.jsx(nB, {
          children: jsxRuntime.jsx(dp, {
            children: e.head.map((t, n) =>
              jsxRuntime.jsx(
                gS,
                {
                  children: t,
                },
                n,
              ),
            ),
          }),
        }),
      e.body &&
        jsxRuntime.jsx(rB, {
          children: e.body.map((t, n) =>
            jsxRuntime.jsx(
              dp,
              {
                children: t.map((r, i) =>
                  jsxRuntime.jsx(
                    tB,
                    {
                      children: r,
                    },
                    i,
                  ),
                ),
              },
              n,
            ),
          ),
        }),
      e.foot &&
        jsxRuntime.jsx(iB, {
          children: jsxRuntime.jsx(dp, {
            children: e.foot.map((t, n) =>
              jsxRuntime.jsx(
                gS,
                {
                  children: t,
                },
                n,
              ),
            ),
          }),
        }),
    ],
  });
}
jA.displayName = "@mantine/core/TableDataRenderer";
const bY = {
    type: "scrollarea",
  },
  wY = (e, { minWidth: t, maxHeight: n, type: r }) => ({
    scrollContainer: {
      "--table-min-width": oe(t),
      "--table-max-height": oe(n),
      "--table-overflow": r === "native" ? "auto" : void 0,
    },
  }),
  RA = ke((e, t) => {
    const n = ye("TableScrollContainer", bY, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        children: c,
        minWidth: d,
        maxHeight: h,
        type: p,
        scrollAreaProps: v,
        ...b
      } = n,
      y = et({
        name: "TableScrollContainer",
        classes: od,
        props: n,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: wY,
        rootSelector: "scrollContainer",
      });
    return jsxRuntime.jsx(Se, {
      component: p === "scrollarea" ? oo : "div",
      ...(p === "scrollarea"
        ? h
          ? {
              offsetScrollbars: "xy",
              ...v,
            }
          : {
              offsetScrollbars: "x",
              ...v,
            }
        : {}),
      ref: t,
      ...y("scrollContainer"),
      ...b,
      children: jsxRuntime.jsx("div", {
        ...y("scrollContainerInner"),
        children: c,
      }),
    });
  });
RA.classes = od;
RA.displayName = "@mantine/core/TableScrollContainer";
const xY = {
    withRowBorders: !0,
    verticalSpacing: 7,
  },
  SY = (
    e,
    {
      layout: t,
      captionSide: n,
      horizontalSpacing: r,
      verticalSpacing: i,
      borderColor: o,
      stripedColor: a,
      highlightOnHoverColor: s,
      striped: u,
      highlightOnHover: c,
      stickyHeaderOffset: d,
      stickyHeader: h,
    },
  ) => ({
    table: {
      "--table-layout": t,
      "--table-caption-side": n,
      "--table-horizontal-spacing": ls(r),
      "--table-vertical-spacing": ls(i),
      "--table-border-color": o ? Vn(o, e) : void 0,
      "--table-striped-color": u && a ? Vn(a, e) : void 0,
      "--table-highlight-on-hover-color": c && s ? Vn(s, e) : void 0,
      "--table-sticky-header-offset": h ? oe(d) : void 0,
    },
  }),
  Dt = ke((e, t) => {
    const n = ye("Table", xY, e),
      {
        classNames: r,
        className: i,
        style: o,
        styles: a,
        unstyled: s,
        vars: u,
        horizontalSpacing: c,
        verticalSpacing: d,
        captionSide: h,
        stripedColor: p,
        highlightOnHoverColor: v,
        striped: b,
        highlightOnHover: y,
        withColumnBorders: w,
        withRowBorders: x,
        withTableBorder: S,
        borderColor: _,
        layout: E,
        variant: P,
        data: O,
        children: k,
        stickyHeader: R,
        stickyHeaderOffset: M,
        mod: D,
        tabularNums: I,
        ...V
      } = n,
      z = et({
        name: "Table",
        props: n,
        className: i,
        style: o,
        classes: od,
        classNames: r,
        styles: a,
        unstyled: s,
        rootSelector: "table",
        vars: u,
        varsResolver: SY,
      });
    return jsxRuntime.jsx(vY, {
      value: {
        getStyles: z,
        stickyHeader: R,
        striped: b === !0 ? "odd" : b || void 0,
        highlightOnHover: y,
        withColumnBorders: w,
        withRowBorders: x,
        captionSide: h || "bottom",
      },
      children: jsxRuntime.jsx(Se, {
        component: "table",
        variant: P,
        ref: t,
        mod: [
          {
            "data-with-table-border": S,
            "data-tabular-nums": I,
          },
          D,
        ],
        ...z("table"),
        ...V,
        children:
          k ||
          (!!O &&
            jsxRuntime.jsx(jA, {
              data: O,
            })),
      }),
    });
  });
Dt.classes = od;
Dt.displayName = "@mantine/core/Table";
Dt.Td = tB;
Dt.Th = gS;
Dt.Tr = dp;
Dt.Thead = nB;
Dt.Tbody = rB;
Dt.Tfoot = iB;
Dt.Caption = oB;
Dt.ScrollContainer = RA;
Dt.DataRenderer = jA;
const [_Y, MA] = kr("Tabs component was not found in the tree");
var ad = {
  root: "m_89d60db1",
  "list--default": "m_576c9d4",
  list: "m_89d33d6d",
  panel: "m_b0c91715",
  tab: "m_4ec4dce6",
  tabSection: "m_fc420b1f",
  "tab--default": "m_539e827b",
  "list--outline": "m_6772fbd5",
  "tab--outline": "m_b59ab47c",
  "tab--pills": "m_c3381914",
};
const PY = {},
  NA = ke((e, t) => {
    const n = ye("TabsList", PY, e),
      { children: r, className: i, grow: o, justify: a, classNames: s, styles: u, style: c, mod: d, ...h } = n,
      p = MA();
    return jsxRuntime.jsx(Se, {
      ...h,
      ...p.getStyles("list", {
        className: i,
        style: c,
        classNames: s,
        styles: u,
        props: n,
        variant: p.variant,
      }),
      ref: t,
      role: "tablist",
      variant: p.variant,
      mod: [
        {
          grow: o,
          orientation: p.orientation,
          placement: p.orientation === "vertical" && p.placement,
          inverted: p.inverted,
        },
        d,
      ],
      "aria-orientation": p.orientation,
      __vars: {
        "--tabs-justify": a,
      },
      children: r,
    });
  });
NA.classes = ad;
NA.displayName = "@mantine/core/TabsList";
const AY = {},
  IA = ke((e, t) => {
    const n = ye("TabsPanel", AY, e),
      { children: r, className: i, value: o, classNames: a, styles: s, style: u, mod: c, keepMounted: d, ...h } = n,
      p = MA(),
      v = p.value === o,
      b = p.keepMounted || d || v ? r : null;
    return jsxRuntime.jsx(Se, {
      ...h,
      ...p.getStyles("panel", {
        className: i,
        classNames: a,
        styles: s,
        style: [
          u,
          v
            ? void 0
            : {
                display: "none",
              },
        ],
        props: n,
      }),
      ref: t,
      mod: [
        {
          orientation: p.orientation,
        },
        c,
      ],
      role: "tabpanel",
      id: p.getPanelId(o),
      "aria-labelledby": p.getTabId(o),
      children: b,
    });
  });
IA.classes = ad;
IA.displayName = "@mantine/core/TabsPanel";
const OY = {},
  DA = ke((e, t) => {
    const n = ye("TabsTab", OY, e),
      {
        className: r,
        children: i,
        rightSection: o,
        leftSection: a,
        value: s,
        onClick: u,
        onKeyDown: c,
        disabled: d,
        color: h,
        style: p,
        classNames: v,
        styles: b,
        vars: y,
        mod: w,
        tabIndex: x,
        ...S
      } = n,
      _ = ni(),
      { dir: E } = ou(),
      P = MA(),
      O = s === P.value,
      k = (M) => {
        P.onChange(P.allowTabDeactivation && s === P.value ? null : s), u?.(M);
      },
      R = {
        classNames: v,
        styles: b,
        props: n,
      };
    return jsxRuntime.jsxs(ao, {
      ...S,
      ...P.getStyles("tab", {
        className: r,
        style: p,
        variant: P.variant,
        ...R,
      }),
      disabled: d,
      unstyled: P.unstyled,
      variant: P.variant,
      mod: [
        {
          active: O,
          disabled: d,
          orientation: P.orientation,
          inverted: P.inverted,
          placement: P.orientation === "vertical" && P.placement,
        },
        w,
      ],
      ref: t,
      role: "tab",
      id: P.getTabId(s),
      "aria-selected": O,
      tabIndex: x !== void 0 ? x : O || P.value === null ? 0 : -1,
      "aria-controls": P.getPanelId(s),
      onClick: k,
      __vars: {
        "--tabs-color": h ? Vn(h, _) : void 0,
      },
      onKeyDown: J3({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: P.activateTabWithKeyboard,
        loop: P.loop,
        orientation: P.orientation || "horizontal",
        dir: E,
        onKeyDown: c,
      }),
      children: [
        a &&
          jsxRuntime.jsx("span", {
            ...P.getStyles("tabSection", R),
            "data-position": "left",
            children: a,
          }),
        i &&
          jsxRuntime.jsx("span", {
            ...P.getStyles("tabLabel", R),
            children: i,
          }),
        o &&
          jsxRuntime.jsx("span", {
            ...P.getStyles("tabSection", R),
            "data-position": "right",
            children: o,
          }),
      ],
    });
  });
DA.classes = ad;
DA.displayName = "@mantine/core/TabsTab";
const gj = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",
  EY = {
    keepMounted: !0,
    orientation: "horizontal",
    loop: !0,
    activateTabWithKeyboard: !0,
    allowTabDeactivation: !1,
    unstyled: !1,
    inverted: !1,
    variant: "default",
    placement: "left",
  },
  TY = (e, { radius: t, color: n, autoContrast: r }) => ({
    root: {
      "--tabs-radius": gn(t),
      "--tabs-color": Vn(n, e),
      "--tabs-text-color": Bq(r, e)
        ? cL({
            color: n,
            theme: e,
            autoContrast: r,
          })
        : void 0,
    },
  }),
  Tabs = ke((e, t) => {
    const n = ye("Tabs", EY, e),
      {
        defaultValue: r,
        value: i,
        onChange: o,
        orientation: a,
        children: s,
        loop: u,
        id: c,
        activateTabWithKeyboard: d,
        allowTabDeactivation: h,
        variant: p,
        color: v,
        radius: b,
        inverted: y,
        placement: w,
        keepMounted: x,
        classNames: S,
        styles: _,
        unstyled: E,
        className: P,
        style: O,
        vars: k,
        autoContrast: R,
        mod: M,
        ...D
      } = n,
      I = mo(c),
      [V, z] = Pi({
        value: i,
        defaultValue: r,
        finalValue: null,
        onChange: o,
      }),
      q = et({
        name: "Tabs",
        props: n,
        classes: ad,
        className: P,
        style: O,
        classNames: S,
        styles: _,
        unstyled: E,
        vars: k,
        varsResolver: TY,
      });
    return jsxRuntime.jsx(_Y, {
      value: {
        placement: w,
        value: V,
        orientation: a,
        id: I,
        loop: u,
        activateTabWithKeyboard: d,
        getTabId: Op(`${I}-tab`, gj),
        getPanelId: Op(`${I}-panel`, gj),
        onChange: z,
        allowTabDeactivation: h,
        variant: p,
        color: v,
        radius: b,
        inverted: y,
        keepMounted: x,
        unstyled: E,
        getStyles: q,
      },
      children: jsxRuntime.jsx(Se, {
        ref: t,
        id: I,
        variant: p,
        mod: [
          {
            orientation: a,
            inverted: a === "horizontal" && y,
            placement: a === "vertical" && w,
          },
          M,
        ],
        ...q("root"),
        ...D,
        children: s,
      }),
    });
  });
Tabs.classes = ad;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = DA;
Tabs.Panel = IA;
Tabs.List = NA;
var aB = {
  root: "m_7341320d",
};
const CY = {},
  kY = (e, { size: t, radius: n, variant: r, gradient: i, color: o, autoContrast: a }) => {
    const s = e.variantColorResolver({
      color: o || e.primaryColor,
      theme: e,
      gradient: i,
      variant: r || "filled",
      autoContrast: a,
    });
    return {
      root: {
        "--ti-size": dt(t, "ti-size"),
        "--ti-radius": n === void 0 ? void 0 : gn(n),
        "--ti-bg": o || r ? s.background : void 0,
        "--ti-color": o || r ? s.color : void 0,
        "--ti-bd": o || r ? s.border : void 0,
      },
    };
  },
  $A = ke((e, t) => {
    const n = ye("ThemeIcon", CY, e),
      { classNames: r, className: i, style: o, styles: a, unstyled: s, vars: u, autoContrast: c, ...d } = n,
      h = et({
        name: "ThemeIcon",
        classes: aB,
        props: n,
        className: i,
        style: o,
        classNames: r,
        styles: a,
        unstyled: s,
        vars: u,
        varsResolver: kY,
      });
    return jsxRuntime.jsx(Se, {
      ref: t,
      ...h("root"),
      ...d,
    });
  });
$A.classes = aB;
$A.displayName = "@mantine/core/ThemeIcon";
