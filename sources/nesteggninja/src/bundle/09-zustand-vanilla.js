const jY = {},
  bj = (e) => {
    let t;
    const n = new Set(),
      r = (d, h) => {
        const p = typeof d == "function" ? d(t) : d;
        if (!Object.is(p, t)) {
          const v = t;
          (t = (h ?? (typeof p != "object" || p === null)) ? p : Object.assign({}, t, p)), n.forEach((b) => b(t, v));
        }
      },
      i = () => t,
      u = {
        setState: r,
        getState: i,
        getInitialState: () => c,
        subscribe: (d) => (n.add(d), () => n.delete(d)),
        destroy: () => {
          (jY ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear();
        },
      },
      c = (t = e(r, i, u));
    return u;
  },
  RY = (e) => (e ? bj(e) : bj);
