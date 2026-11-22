const LY = ht($Y),
  sB = {},
  { useDebugValue: BY } = ReactDefault,
  { useSyncExternalStoreWithSelector: FY } = LY;
let Pj = !1;
const VY = (e) => e;
function zY(e, t = VY, n) {
  (sB ? "production" : void 0) !== "production" &&
    n &&
    !Pj &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (Pj = !0));
  const r = FY(e.subscribe, e.getState, e.getServerState || e.getInitialState, t, n);
  return BY(r), r;
}
const Aj = (e) => {
    (sB ? "production" : void 0) !== "production" &&
      typeof e != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const t = typeof e == "function" ? RY(e) : e,
      n = (r, i) => zY(t, r, i);
    return Object.assign(n, t), n;
  },
  createStore = (e) => (e ? Aj(e) : Aj),
  At = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global,
  Ht = Object.keys,
  Rn = Array.isArray;
