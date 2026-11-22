const ChartTooltip = ({ active: e, payload: t, label: n }) => {
    if (e && t && t.length) {
      const r = t[0].payload,
        f = (x) => "$" + Math.round(x).toLocaleString("en-CA");
      return jsxRuntime.jsxs("div", {
        className: "nf-tip",
        children: [
          jsxRuntime.jsxs("p", {
            className: "nf-tip-h",
            children: ["Age ", n, ", net worth ", f(r.netWorth)],
          }),
          jsxRuntime.jsxs("dl", {
            children: [
              jsxRuntime.jsx("dt", {
                children: "RRSP",
              }),
              jsxRuntime.jsx("dd", {
                children: f(r.rrsp),
              }),
              jsxRuntime.jsx("dt", {
                children: "TFSA",
              }),
              jsxRuntime.jsx("dd", {
                children: f(r.tfsa),
              }),
              jsxRuntime.jsx("dt", {
                children: "Non-registered",
              }),
              jsxRuntime.jsx("dd", {
                children: f(r.nonReg),
              }),
            ],
          }),
        ],
      });
    }
    return null;
  },
  i0e = (e) => (e >= 1e6 ? `$${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `$${(e / 1e3).toFixed(0)}k` : e);
function SavingsAreaChart({ data: e, fireNumber: t }) {
  return jsxRuntime.jsx("div", {
    className: "nf-plot",
    role: "img",
    "aria-label":
      "Stacked area chart of projected RRSP, TFSA and non-registered balances by age, in today's dollars. The same values are in the table below the chart.",
    children: jsxRuntime.jsx(sse, {
      width: "100%",
      height: "100%",
      children: jsxRuntime.jsxs(n0e, {
        data: e,
        margin: {
          top: 8,
          right: 8,
          left: 0,
          bottom: 0,
        },
        children: [
          jsxRuntime.jsx(hy, {
            dataKey: "age",
            tick: {
              fill: "#666",
              fontSize: 13,
            },
            axisLine: !1,
            tickLine: !1,
            interval: 4,
          }),
          jsxRuntime.jsx(py, {
            tickFormatter: i0e,
            tick: {
              fill: "#444",
              fontSize: 13,
            },
            axisLine: !1,
            tickLine: !1,
            width: 52,
          }),
          jsxRuntime.jsx(fi, {
            content: jsxRuntime.jsx(ChartTooltip, {}),
            cursor: {
              stroke: "#000",
              strokeWidth: 1,
            },
          }),
          t > 0 &&
            jsxRuntime.jsx(sy, {
              y: t,
              className: "nf-target-line",
              stroke: "#888",
              strokeDasharray: "10 4",
            }),
          jsxRuntime.jsx(_i, {
            type: "monotone",
            dataKey: "nonReg",
            stackId: "1",
            className: "nf-a-nr",
            stroke: "#888",
            fill: "#888",
            fillOpacity: 0.6,
            isAnimationActive: !1,
          }),
          jsxRuntime.jsx(_i, {
            type: "monotone",
            dataKey: "tfsa",
            stackId: "1",
            className: "nf-a-tf",
            stroke: "#888",
            fill: "#888",
            fillOpacity: 0.6,
            isAnimationActive: !1,
          }),
          jsxRuntime.jsx(_i, {
            type: "monotone",
            dataKey: "rrsp",
            stackId: "1",
            className: "nf-a-rr",
            stroke: "#888",
            fill: "#888",
            fillOpacity: 0.6,
            isAnimationActive: !1,
          }),
        ],
      }),
    }),
  });
}
function SavingsChartSection() {
  const { simulationResult: e, getFireNumber: t } = useFireStore(),
    n = e.projection,
    r = t(),
    f = (x) => Math.round(x).toLocaleString("en-CA");
  return !n || n.length === 0
    ? jsxRuntime.jsxs("section", {
        className: "nf-chart",
        "aria-labelledby": "nf-h-chart",
        children: [
          jsxRuntime.jsx("h3", {
            id: "nf-h-chart",
            className: "nf-h3",
            children: "Savings by account",
          }),
          jsxRuntime.jsx("p", {
            className: "nf-empty",
            children: "No chart. Add savings or lower spending.",
          }),
        ],
      })
    : jsxRuntime.jsxs("section", {
        className: "nf-chart",
        "aria-labelledby": "nf-h-chart",
        children: [
          jsxRuntime.jsx("h3", {
            id: "nf-h-chart",
            className: "nf-h3",
            children: "Savings by account, by age",
          }),
          jsxRuntime.jsx("p", {
            className: "nf-note",
            children: nfT(
              "Today's dollars. The accounts are stacked, so the top edge is total net worth. Tax and benefit figures are for tax year {year} from canada.ca; the assumptions ledger under the planner lists each one with its source.",
            ),
          }),
          jsxRuntime.jsxs("ul", {
            className: "nf-legend",
            children: [
              jsxRuntime.jsxs("li", {
                children: [
                  jsxRuntime.jsx("i", {
                    className: "nf-sw nf-sw-rr",
                    "aria-hidden": "true",
                  }),
                  "RRSP, solid line",
                ],
              }),
              jsxRuntime.jsxs("li", {
                children: [
                  jsxRuntime.jsx("i", {
                    className: "nf-sw nf-sw-tf",
                    "aria-hidden": "true",
                  }),
                  "TFSA, dashed line",
                ],
              }),
              jsxRuntime.jsxs("li", {
                children: [
                  jsxRuntime.jsx("i", {
                    className: "nf-sw nf-sw-nr",
                    "aria-hidden": "true",
                  }),
                  "Non-registered, dotted line",
                ],
              }),
              r > 0 &&
                jsxRuntime.jsxs("li", {
                  children: [
                    jsxRuntime.jsx("i", {
                      className: "nf-sw nf-sw-tg",
                      "aria-hidden": "true",
                    }),
                    "Independence number, long dashes",
                  ],
                }),
            ],
          }),
          jsxRuntime.jsx(SavingsAreaChart, {
            data: n,
            fireNumber: r,
          }),
          jsxRuntime.jsxs("details", {
            className: "nf-table",
            children: [
              jsxRuntime.jsx("summary", {
                children: "Year table",
              }),
              jsxRuntime.jsx("div", {
                className: "nf-scroll",
                tabIndex: 0,
                role: "region",
                "aria-label": "Year-by-year balances",
                children: jsxRuntime.jsxs("table", {
                  children: [
                    jsxRuntime.jsx("caption", {
                      children: nfT(
                        "Projected balances by age, in today's dollars, rounded to the dollar. Tax and benefit figures are for tax year {year} from canada.ca; the assumptions ledger under the planner lists each one with its source.",
                      ),
                    }),
                    jsxRuntime.jsx("thead", {
                      children: jsxRuntime.jsxs("tr", {
                        children: [
                          jsxRuntime.jsx("th", {
                            scope: "col",
                            children: "Age",
                          }),
                          jsxRuntime.jsx("th", {
                            scope: "col",
                            children: "Net worth",
                          }),
                          jsxRuntime.jsx("th", {
                            scope: "col",
                            children: "RRSP",
                          }),
                          jsxRuntime.jsx("th", {
                            scope: "col",
                            children: "TFSA",
                          }),
                          jsxRuntime.jsx("th", {
                            scope: "col",
                            children: "Non-registered",
                          }),
                        ],
                      }),
                    }),
                    jsxRuntime.jsx("tbody", {
                      children: n.map((x) =>
                        jsxRuntime.jsxs(
                          "tr",
                          {
                            children: [
                              jsxRuntime.jsx("th", {
                                scope: "row",
                                children: x.age,
                              }),
                              jsxRuntime.jsx("td", {
                                children: f(x.netWorth),
                              }),
                              jsxRuntime.jsx("td", {
                                children: f(x.rrsp),
                              }),
                              jsxRuntime.jsx("td", {
                                children: f(x.tfsa),
                              }),
                              jsxRuntime.jsx("td", {
                                children: f(x.nonReg),
                              }),
                            ],
                          },
                          x.age,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      });
}
function WelcomeModal() {
  const { welcomeDismissed: e, dismissWelcome: t } = useFireStore();
  return jsxRuntime.jsxs(Modal, {
    opened: !e,
    onClose: t,
    withCloseButton: !0,
    closeButtonProps: {
      "aria-label": "Close",
    },
    closeOnEscape: !0,
    centered: !0,
    size: "lg",
    title: "Before you start",
    overlayProps: {
      backgroundOpacity: 0.55,
    },
    children: [
      jsxRuntime.jsx("p", {
        className: "nf-lead",
        children: "Estimates the year your savings can cover your spending.",
      }),
      jsxRuntime.jsxs("ol", {
        className: "nf-steps",
        children: [
          jsxRuntime.jsxs("li", {
            children: [
              jsxRuntime.jsx("strong", {
                children: "Enter your numbers.",
              }),
              " Income, savings, balances.",
            ],
          }),
          jsxRuntime.jsxs("li", {
            children: [
              jsxRuntime.jsx("strong", {
                children: "Set savings and spending.",
              }),
              " Savings and spending.",
            ],
          }),
          jsxRuntime.jsxs("li", {
            children: [
              jsxRuntime.jsx("strong", {
                children: "Read the result.",
              }),
              " The year and its assumptions.",
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("dl", {
        className: "nf-facts",
        children: [
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("dt", {
                children: "Stays here",
              }),
              jsxRuntime.jsx("dd", {
                children: "Stored in this browser. No network requests.",
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("dt", {
                children: "A planning aid",
              }),
              jsxRuntime.jsx("dd", {
                children: "Illustration, not advice.",
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx(Button, {
        fullWidth: !0,
        size: "md",
        onClick: t,
        children: "Open the planner",
      }),
    ],
  });
}
function Page() {
  return jsxRuntime.jsxs("main", {
    id: "main",
    tabIndex: -1,
    className: "nf-page",
    children: [
      jsxRuntime.jsx(WelcomeModal, {}),
      jsxRuntime.jsxs("div", {
        className: "nf-wrap",
        children: [
          jsxRuntime.jsx(Header, {}),
          jsxRuntime.jsxs("div", {
            className: "nf-sheet",
            children: [
              jsxRuntime.jsxs("section", {
                className: "nf-assume",
                "aria-labelledby": "nf-h-assume",
                children: [
                  jsxRuntime.jsx("a", {
                    className: "nf-jump",
                    href: "#nf-result",
                    children: "Result",
                  }),
                  jsxRuntime.jsx(AssumptionsForm, {}),
                ],
              }),
              jsxRuntime.jsxs("section", {
                id: "nf-result",
                tabIndex: -1,
                className: "nf-result",
                "aria-labelledby": "nf-h-result",
                children: [jsxRuntime.jsx(ResultPanel, {}), jsxRuntime.jsx(SavingsChartSection, {})],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function App() {
  return jsxRuntime.jsx(MantineProvider, {
    forceColorScheme: "dark",
    children: jsxRuntime.jsx(HydrationGate, {
      children: jsxRuntime.jsx(Page, {}),
    }),
  });
}
ReactDOMClient.createRoot(document.getElementById("root")).render(
  jsxRuntime.jsx(ReactDefault.StrictMode, {
    children: jsxRuntime.jsx(App, {}),
  }),
);
