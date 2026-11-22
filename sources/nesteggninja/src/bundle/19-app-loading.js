function LoadingScreen() {
  return jsxRuntime.jsxs("div", {
    className: "min-h-screen bg-void flex items-center justify-center flex-col z-50 fixed inset-0",
    children: [
      jsxRuntime.jsxs("div", {
        className: "relative w-16 h-16 mb-4",
        children: [
          jsxRuntime.jsx(motion.span, {
            animate: {
              rotate: 360,
            },
            transition: {
              duration: 2,
              repeat: 1 / 0,
              ease: "linear",
            },
            className: "absolute inset-0 border-2 border-neon-green/30 rounded-full border-t-neon-green",
          }),
          jsxRuntime.jsx(motion.span, {
            animate: {
              rotate: -180,
            },
            transition: {
              duration: 3,
              repeat: 1 / 0,
              ease: "linear",
            },
            className: "absolute inset-2 border-2 border-neon-cyan/30 rounded-full border-b-neon-cyan",
          }),
        ],
      }),
      jsxRuntime.jsx(motion.p, {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          repeat: 1 / 0,
          repeatType: "reverse",
        },
        className: "text-neon-green font-mono text-xs tracking-[0.3em]",
        children: "Loading...",
      }),
    ],
  });
}
function HydrationGate({ children: e }) {
  const { hydrate: t, isHydrated: n } = useFireStore();
  return (
    React.useEffect(() => {
      t();
    }, []),
    n ? e : jsxRuntime.jsx(LoadingScreen, {})
  );
}
