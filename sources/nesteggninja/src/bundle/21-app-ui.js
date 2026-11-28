function GuideModal({ opened: e, onClose: t }) {
  return jsxRuntime.jsx(Modal, {
    opened: e,
    onClose: t,
    size: "xl",
    title: "Guide and assumptions",
    closeButtonProps: {
      "aria-label": "Close guide",
    },
    children: jsxRuntime.jsxs(Tabs, {
      defaultValue: window.__nfGuideTab || "logic",
      children: [
        jsxRuntime.jsxs(Tabs.List, {
          className: "nf-tabs-list",
          children: [
            jsxRuntime.jsx(Tabs.Tab, {
              value: "logic",
              children: "How it works",
            }),
            jsxRuntime.jsx(Tabs.Tab, {
              value: "update",
              children: "How to update",
            }),
            jsxRuntime.jsx(Tabs.Tab, {
              value: "math",
              children: "Equations",
            }),
            jsxRuntime.jsx(Tabs.Tab, {
              value: "assumptions",
              children: "Assumptions",
            }),
            jsxRuntime.jsx(Tabs.Tab, {
              value: "manual",
              children: "Using the planner",
            }),
            jsxRuntime.jsx(Tabs.Tab, {
              value: "data",
              children: "Help: your data",
            }),
          ],
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "update",
          children: jsxRuntime.jsxs("div", {
            className: "nf-prose",
            children: [
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Change a tax or benefit figure",
              }),
              jsxRuntime.jsx("ol", {
                children: [
                  jsxRuntime.jsx("li", {
                    children: "Copy the file first, as a backup.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Open it in a plain text editor (not Word).",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Search for nf-data. The figures are there.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "Example: for a $7,500 TFSA limit, change tfsaCents to 750000 (cents). Rates are in hundredths of a percent: 1400 is 14%.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "New year: also change taxYear and content-meta.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Save and reopen. The ledger and Help update too.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Check: the TFSA ledger row should say $7,500.",
                  }),
                ],
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "What not to touch",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Edit only nf-data and content-meta. Keep every comma, bracket and quote. If the figures cannot be read, restore your copy.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Sentences typed by hand",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Some ledger notes hold typed figures (the 14,829 minimum basic personal amount, CPP and OAS maximums, FHSA, the earlier OAS threshold, the read date). Search for the old number.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Update the whole app",
              }),
              jsxRuntime.jsx("p", {
                children: "Replace the file. Saved data stays. Older plan files load. Newer ones are refused.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Change the look",
              }),
              jsxRuntime.jsx("ol", {
                children: [
                  jsxRuntime.jsx("li", {
                    children: "Copy the file, then open it in a text editor.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "Search for ACCENT. Two lines set the accent: light look (Paper), then the dark looks. Buttons, sliders and charts follow.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Example: change #0A6572 to #8A1C4A. Keep line one dark and line two light.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Save and reopen. Run stress test shows the new colour.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "Background, text and line colours sit just above, one block per look (search for data-theme). Fonts and spacing are in the same style section. None of these change the figures.",
                  }),
                ],
              }),
              jsxRuntime.jsx("p", {
                "data-cm": "help",
                children: "Content version 2026.1, date 2026-10-31, tax year 2026",
              }),
            ],
          }),
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "logic",
          children: jsxRuntime.jsxs(oo, {
            h: 400,
            offsetScrollbars: !0,
            children: [
              jsxRuntime.jsx(Ue, {
                className: "nf-h3",
                children: "The solvency test",
              }),
              jsxRuntime.jsx(Ue, {
                size: "sm",
                mb: "md",
                children:
                  "NestEggNinja does not use the Rule of 25. It tests every future year as a possible retirement year and asks whether the money lasts to age 95.",
              }),
              jsxRuntime.jsxs(Tn, {
                variant: "separated",
                radius: "xs",
                chevronPosition: "left",
                children: [
                  jsxRuntime.jsxs(Tn.Item, {
                    value: "sim",
                    children: [
                      jsxRuntime.jsx(Tn.Control, {
                        children: "The Simulation Loop",
                      }),
                      jsxRuntime.jsxs(Tn.Panel, {
                        children: [
                          jsxRuntime.jsx(Ue, {
                            size: "xs",
                            c: "dimmed",
                            children: "Each year from your age to 95:",
                          }),
                          jsxRuntime.jsx(PA, {
                            block: !0,
                            className: "nf-code",
                            children: `FOR age = Current TO 95:
  1. Calculate Demand (Spend - Pensions - CPP/OAS)
  2. If Pension is NOT Indexed: Reduce Real Value (Inflation)
  3. If Income > Threshold: Apply OAS Clawback
  4. If Demand > 0:
     - Withdraw from TFSA (Tax Free)
     - Withdraw from Non-Reg (only a flat tax drag on growth; capital gains tax is not modelled)
     - Withdraw from RRSP (Income Tax)
  5. Grow Remaining Assets (Asset * GrowthRate)
    
IF Assets > 0 at Age 95 THEN "Solvent"`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs(Tn.Item, {
                    value: "vesting",
                    children: [
                      jsxRuntime.jsx(Tn.Control, {
                        children: "Service-based pension (government plans)",
                      }),
                      jsxRuntime.jsx(Tn.Panel, {
                        children: jsxRuntime.jsxs(Ue, {
                          size: "xs",
                          c: "dimmed",
                          children: [
                            "For employees with a defined benefit pension, the engine calculates the pension value dynamically based on the specific retirement year being tested.",
                            jsxRuntime.jsx("br", {}),
                            jsxRuntime.jsx("br", {}),
                            jsxRuntime.jsx("strong", {
                              children: "Logic:",
                            }),
                            " If checking solvency at age 45, the engine assumes you stopped working at 45. Your pension is calculated as: ",
                            jsxRuntime.jsx("code", {
                              children: "(45 - StartAge) * 2% * BestAverage",
                            }),
                            '. It also accounts for the "Waiting Period" (Deferred Annuity) if you retire before the payout age.',
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "math",
          children: jsxRuntime.jsxs(oo, {
            h: 400,
            offsetScrollbars: !0,
            children: [
              jsxRuntime.jsx(Ue, {
                className: "nf-h3",
                children: "Equations used",
              }),
              jsxRuntime.jsxs("div", {
                className: "space-y-6",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx(Ue, {
                        size: "sm",
                        fw: 700,
                        c: "var(--ink)",
                        children: "1. Net worth projection",
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "nf-eq",
                        children: [
                          "NW",
                          jsxRuntime.jsx("sub", {
                            children: "t+1",
                          }),
                          " = (NW",
                          jsxRuntime.jsx("sub", {
                            children: "t",
                          }),
                          " + Savings",
                          jsxRuntime.jsx("sub", {
                            children: "t",
                          }),
                          " - Withdrawals",
                          jsxRuntime.jsx("sub", {
                            children: "t",
                          }),
                          ") x (1 + r)",
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx(Ue, {
                        size: "sm",
                        fw: 700,
                        c: "var(--ink)",
                        children: "2. RRSP withdrawals and tax",
                      }),
                      jsxRuntime.jsx("div", {
                        className: "nf-eq",
                        children: "GrossWithdrawal = NetNeed / (1 - MarginalTaxRate)",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx(Ue, {
                        size: "sm",
                        fw: 700,
                        c: "var(--ink)",
                        children: "3. Pension value in real dollars",
                      }),
                      jsxRuntime.jsx("div", {
                        className: "nf-eq",
                        children: "RealPension = NominalPension / (1 + InflationRate)^(YearsSinceRetirement)",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "assumptions",
          children: jsxRuntime.jsx(Dt, {
            withTableBorder: !0,
            withColumnBorders: !0,
            variant: "vertical",
            children: jsxRuntime.jsxs(Dt.Tbody, {
              children: [
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      w: 160,
                      children: "Inflation and dollars",
                    }),
                    jsxRuntime.jsxs(Dt.Td, {
                      children: [
                        "All figures are in ",
                        jsxRuntime.jsx("strong", {
                          children: "today's dollars",
                        }),
                        ". Growth is a real rate. Pensions that are not indexed lose value each year at the fixed 2% inflation rate shown in the assumptions list.",
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      children: "Tax tables",
                    }),
                    jsxRuntime.jsx(Dt.Td, {
                      children: nfT(
                        "Federal and provincial brackets for {year} from canada.ca, except Quebec. Not modelled: provincial credits, surtaxes, health premiums, the high-income cut to the basic personal amount. The ledger lists every figure and source.",
                      ),
                    }),
                  ],
                }),
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      children: "OAS clawback",
                    }),
                    jsxRuntime.jsx(Dt.Td, {
                      children: nfT(
                        "Applied at {pct:c.oasRecoveryE4} on income above {usd:c.oasThresholdCents}, the {year} threshold, counting pension, CPP and OAS income before any RRSP withdrawal.",
                      ),
                    }),
                  ],
                }),
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      children: "Stress test",
                    }),
                    jsxRuntime.jsx(Dt.Td, {
                      children:
                        "Seeded random return paths, run in the background. Yearly real return = real growth plus a bell-shaped draw scaled by volatility. Volatility and seed are your assumptions. Failure: savings short by more than $100 in a year. No historical series is included.",
                    }),
                  ],
                }),
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      children: "Withdrawal rules",
                    }),
                    jsxRuntime.jsx(Dt.Td, {
                      children:
                        "Inflation-adjusted percent: Bengen 1994 (via secondary sources, paper not opened). Guardrails: Guyton and Klinger 2006. Freeze the inflation raise after a negative year if the draw rate is above its start. Cut 10% if the draw rate is over 20% above its start (not in the last 15 years). Raise 10% if over 20% below. Portfolio management rule not modelled. Fixed percent is this app's own.",
                    }),
                  ],
                }),
                jsxRuntime.jsxs(Dt.Tr, {
                  children: [
                    jsxRuntime.jsx(Dt.Th, {
                      children: "CPP, OAS and RRIF",
                    }),
                    jsxRuntime.jsx(Dt.Td, {
                      children: nfT(
                        "CPP start age: {pct:cpp.earlyPerMonthE4} less a month before 65, {pct:cpp.latePerMonthE4} more a month after 65. OAS start age: {pct:oas.latePerMonthE4} more a month after 65, plus {pct:oas.at75E4} from age 75. RRIF minimums use the CRA prescribed factors by age at the start of the year. These apply in the stress test only; the planner above keeps the CPP and OAS amounts you enter.",
                      ),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "manual",
          children: jsxRuntime.jsxs("div", {
            className: "nf-prose",
            children: [
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "1. Province",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Choose the province whose tax tables apply. It changes how much income tax your pension, CPP, OAS and RRSP withdrawals attract.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "2. Pension",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Private or annuity: Fixed amount, yearly. Employer pension plan: Service formula, with start age, career start age and best five-year average.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "3. Saving and loading",
              }),
              jsxRuntime.jsx("p", {
                children: "Load plan file opens a saved file. Save plan file downloads your inputs.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Words used here",
              }),
              jsxRuntime.jsx("ul", {
                children: [
                  jsxRuntime.jsx("li", {
                    children:
                      "RRSP: Registered Retirement Savings Plan, a tax-deferred account. Money taken out is taxed as income.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "TFSA: Tax-Free Savings Account. Growth and withdrawals are not taxed.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "RRIF: Registered Retirement Income Fund, what an RRSP becomes. It has a required minimum withdrawal each year.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "CPP: Canada Pension Plan. OAS: Old Age Security. Both are government pensions paid from about age 65.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "Clawback (OAS recovery tax): the government takes back part of OAS when your income is high.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Seed: a number that makes a random stress test run repeatable.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Volatility: how much returns swing from year to year.",
                  }),
                  jsxRuntime.jsx("li", {
                    children: "Percentile: the 10th percentile is the result that 1 run in 10 falls below.",
                  }),
                  jsxRuntime.jsx("li", {
                    children:
                      "Guardrails: a spending rule that cuts or raises your withdrawal when your savings do badly or well.",
                  }),
                ],
              }),
            ],
          }),
        }),
        jsxRuntime.jsx(Tabs.Panel, {
          value: "data",
          children: jsxRuntime.jsxs("div", {
            className: "nf-prose",
            children: [
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Where your data lives",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Stored in this browser only: database nFireDB, plus localStorage keys nfire_welcome_seen, nfire_look, nfire_lab. Nothing is sent. The page cannot make network requests.",
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Back up your data",
              }),
              jsxRuntime.jsx("p", {
                children: nfT(
                  "Save plan file downloads your inputs. Download year table downloads the projection. Plan files from version 10.3 and plain ones still load; files with an unsafe key or another app name are refused. Both files carry the tax year ({year}) and an illustration label. A plan file is plain text: anyone with it can read your figures. Clearing this site's data deletes the stored plan, so save a file first.",
                ),
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "Delete your data",
              }),
              jsxRuntime.jsx("p", {
                children:
                  'Restore example plan asks "This replaces your plan with the example. Continue?" and changes nothing unless you say yes. To remove everything this page stored, clear this site\'s data in your browser settings.',
              }),
              jsxRuntime.jsx("h3", {
                className: "nf-h3",
                children: "How to update this",
              }),
              jsxRuntime.jsx("p", {
                children:
                  "Open the How to update tab in this guide. It has numbered steps for changing the tax and benefit figures, the look, and for replacing the whole app. Your saved data stays when you replace the file.",
              }),
              jsxRuntime.jsx("p", {
                "data-cm": "help",
                children: "Content version 2026.1, date 2026-10-31, tax year 2026",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function Header() {
  const [t, n] = React.useState(!1);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsxs("header", {
        className: "nf-head",
        children: [
          jsxRuntime.jsxs("div", {
            className: "nf-brand",
            children: [
              jsxRuntime.jsx("p", {
                className: "nf-tag",
                children: "Plan financial independence (Canada). Sneak up on your nest egg.",
              }),
            ],
          }),
          jsxRuntime.jsx(Button, {
            size: "sm",
            variant: "default",
            className: "nf-guide-btn",
            "data-nf-guide": "1",
            onClick: () => {
              window.__nfGuideTab = window.__nfOpenTab || "logic";
              window.__nfOpenTab = null;
              n(!0);
            },
            leftSection: nfIc("M3 3.5h4.5A1.5 1.5 0 0 1 9 5v8.5a1.5 1.5 0 0 0-1.5-1.5H3zM13 3.5H8.5A1.5 1.5 0 0 0 7 5"),
            children: "Guide",
          }),
        ],
      }),
      jsxRuntime.jsx(GuideModal, {
        opened: t,
        onClose: () => n(!1),
      }),
    ],
  });
}
const nfIc = (d) =>
  jsxRuntime.jsx("svg", {
    viewBox: "0 0 16 16",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: "none",
    },
    children: jsxRuntime.jsx("path", {
      d,
    }),
  });
function ResultPanel() {
  const { simulationResult: e, profile: t, getFireNumber: n } = useFireStore(),
    [nfIm, nfSIm] = React.useState(window.__nfIn.m),
    nfIS = Object.keys(nfIm)
      .filter((k) => nfIm[k] && k !== "incomeNote")
      .map((k) => nfIm[k]),
    nfRB = t.target_retirement_age < t.age,
    r = t.assets.rrsp + t.assets.tfsa + t.assets.non_reg,
    i = n(),
    o = i === 0 ? 1 : Math.min(1, r / i),
    a = e.freedomYear === "NEVER",
    s = new Date().getFullYear(),
    u = typeof e.freedomYear == "number" ? e.freedomYear - s : null,
    c = u !== null ? t.age + u : null,
    f = (x) => "$" + Math.round(x).toLocaleString("en-CA"),
    A = t.assumptions,
    L = t.pension,
    H = A.lifespan || 95,
    W = A.withdrawalRate || 0.04,
    pct = (x) => (x * 100).toFixed(1) + "%",
    rows = [
      ["Age now", t.age],
      ["Retirement age (savings stop, withdrawals start)", t.target_retirement_age],
      ["Province", t.province],
      ["Annual income, before tax", f(t.annual_income)],
      ["Annual savings", f(t.annual_savings) + (t.annual_savings > t.annual_income ? " (counted as " + f(t.annual_income) + ": savings cannot exceed income)" : "")],
      ["Retirement spending, after tax", f(t.annual_spend)],
      ["RRSP", f(t.assets.rrsp)],
      ["TFSA", f(t.assets.tfsa)],
      ["Non-registered or corporate", f(t.assets.non_reg)],
      ["Real growth rate", pct(A.growthRate)],
      ["Tax drag on non-registered", pct(A.taxDrag || 0)],
      ["CPP/QPP from age " + (A.cppStartAge || 65), f(A.cppAmount) + " a year"],
      ["OAS", f(A.oasAmount) + " a year"],
      [
        "Defined benefit pension",
        L.enabled
          ? (L.mode === "fixed" ? f(L.annualAmount) + " a year" : "Service formula") +
            " from age " +
            L.startAge +
            (L.isIndexed ? ", indexed" : ", not indexed") +
            (L.mode === "fixed" && Number(L.bridgeAmount) > 0 ? ", plus " + f(L.bridgeAmount) + " a year bridge benefit until age 65" : "")
          : "Not included",
      ],
      ["Withdrawal rate for the target number", pct(W)],
      ["Inflation (non-indexed pension)", pct(A.inflationRate || 0.02)],
      ["Plan runs to age", H],
      ["Tax tables", nfT("{year} federal and provincial brackets from canada.ca; see the assumptions ledger")],
    ];
  React.useEffect(() => {
    const f = () => nfSIm(window.__nfIn.m);
    window.__nfIn.f.push(f);
    f();
    return () => {
      window.__nfIn.f = window.__nfIn.f.filter((g) => g !== f);
    };
  }, []);
  return jsxRuntime.jsxs("div", {
    className: "nf-out",
    children: [
      jsxRuntime.jsx("h2", {
        id: "nf-h-result",
        className: "nf-h2 nf-h2-main",
        children: "Result",
      }),
      nfRB &&
        jsxRuntime.jsx("p", {
          className: "nf-ferr nf-cause",
          children: "Your retirement age is before your current age: change one of them.",
        }),
      nfIS.length > 0 &&
        jsxRuntime.jsx("div", {
          className: "nf-cause",
          children: [
            jsxRuntime.jsx(
              "p",
              {
                className: "nf-ferr",
                children: "Not every entry was applied. This result uses your earlier values:",
              },
              "h",
            ),
            ...nfIS.map((x, q) =>
              jsxRuntime.jsx(
                "p",
                {
                  className: "nf-ferr nf-ferr-w",
                  children: x,
                },
                q,
              ),
            ),
          ],
        }),
      a
        ? jsxRuntime.jsxs("div", {
            className: "nf-answer nf-risk",
            children: [
              jsxRuntime.jsx("p", {
                className: "nf-q",
                children: "Independence year",
              }),
              jsxRuntime.jsx("p", {
                className: "nf-year",
                children: "None found",
              }),
              jsxRuntime.jsx("p", {
                className: "nf-line",
                children:
                  "With these inputs your money runs out before age " +
                  H +
                  ". " +
                  (nfRB || nfIS.length
                    ? "Fix the problem named above first; it may be the cause."
                    : t.annual_income <= t.annual_savings
                      ? "Annual savings is capped at your annual income (" +
                        f(t.annual_income) +
                        "), so check that Annual income is right."
                      : "Raise annual savings or lower retirement spending and this result updates."),
              }),
            ],
          })
        : e.freedomYear
          ? jsxRuntime.jsxs("div", {
              className: "nf-answer",
              children: [
                jsxRuntime.jsx("p", {
                  className: "nf-q",
                  children: "Independence year, if the assumptions below hold",
                }),
                jsxRuntime.jsx("p", {
                  className: "nf-year",
                  children: e.freedomYear,
                }),
                jsxRuntime.jsx("p", {
                  className: "nf-line",
                  children:
                    u === 0
                      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                          children: [
                            "Your current savings already pass the test at age ",
                            jsxRuntime.jsx("strong", {
                              children: c,
                            }),
                            ".",
                          ],
                        })
                      : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                          children: [
                            "You would be ",
                            jsxRuntime.jsx("strong", {
                              children: c,
                            }),
                            " years old. In this illustration your savings last to age ",
                            H,
                            " from that year.",
                          ],
                        }),
                }),
              ],
            })
          : jsxRuntime.jsxs("div", {
              className: "nf-answer",
              children: [
                jsxRuntime.jsx("p", {
                  className: "nf-q",
                  children: "Independence year",
                }),
                jsxRuntime.jsx("p", {
                  className: "nf-year nf-year-wait",
                  children: "Calculating",
                }),
                jsxRuntime.jsx("p", {
                  className: "nf-line",
                  children: "Loading your plan...",
                }),
              ],
            }),
      jsxRuntime.jsxs("div", {
        className: "nf-why",
        children: [
          jsxRuntime.jsx("p", {
            className: "nf-note",
            children:
              "Bar: savings today against the number. Year: first year your savings, with yearly additions, growth and tax, last to age " +
              H +
              ".",
          }),
          t.target_retirement_age < t.age &&
            jsxRuntime.jsx("p", {
              className: "nf-ferr nf-ferr-w",
              "aria-live": "polite",
              children:
                "Your retirement age (" +
                t.target_retirement_age +
                ") is below your current age (" +
                t.age +
                "), so the planner treats you as already retired and starts withdrawals now.",
            }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-meter",
        children: [
          jsxRuntime.jsxs("p", {
            className: "nf-meter-t",
            children: [
              "Savings today ",
              jsxRuntime.jsx("strong", {
                children: f(r),
              }),
              " against an independence number of ",
              jsxRuntime.jsx("strong", {
                children: f(i),
              }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "nf-rule",
            "aria-hidden": "true",
            children: jsxRuntime.jsx("span", {
              style: {
                width: Math.round(o * 100) + "%",
              },
            }),
          }),
          jsxRuntime.jsxs("p", {
            className: "nf-note",
            children: [
              Math.round(o * 100),
              "% of the number. The number is retirement spending, less your pension, divided by the ",
              pct(W),
              " withdrawal rate, plus one year of pension for each year between retirement and the pension start.",
              !a && e.coastYear && e.coastYear !== "N/A" && e.coastYear !== "NEVER"
                ? " First year your savings pass the independence test: " + e.coastYear + "."
                : "",
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("section", {
        className: "nf-ledger",
        "aria-labelledby": "nf-h-ledger",
        children: [
          jsxRuntime.jsx("h3", {
            id: "nf-h-ledger",
            className: "nf-h3",
            children: "Assumptions behind this result",
          }),
          jsxRuntime.jsx("dl", {
            children: rows.map((x) =>
              jsxRuntime.jsxs(
                "div",
                {
                  className: "nf-row",
                  children: [
                    jsxRuntime.jsx("dt", {
                      children: x[0],
                    }),
                    jsxRuntime.jsx("dd", {
                      children: x[1],
                    }),
                  ],
                },
                x[0],
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function nfMoney(s) {
  s = String(s)
    .trim()
    .toLowerCase()
    .replace(/[\s_]/g, "");
  if (s.indexOf(",") >= 0) {
    var cm = /^(-?\$?-?)(\d{1,3}(?:,\d{3})+)((?:\.\d*)?[km]?)$/.exec(s);
    if (!cm) return NaN;
    s = cm[1] + cm[2].replace(/,/g, "") + cm[3];
  }
  if (s === "") return "";
  var g = 1;
  if (s.charAt(0) === "-") {
    g = -1;
    s = s.slice(1);
  }
  if (s.charAt(0) === "$") s = s.slice(1);
  if (s.charAt(0) === "-") {
    g = -g;
    s = s.slice(1);
  }
  var m = /^(\d+(?:\.\d*)?|\.\d+)([km]?)$/.exec(s);
  if (!m) return NaN;
  var n = Number(m[1]) * (m[2] === "k" ? 1e3 : m[2] === "m" ? 1e6 : 1);
  return g * (Math.round(n * 100) / 100);
}
function nfMI({ label: L, description: Ds, v: v, on: on, bad: bad, U: U }) {
  const fm = (x) => (typeof x == "number" && isFinite(x) ? x.toLocaleString("en-CA") : ""),
    [s, S] = React.useState(fm(v)),
    [f, F] = React.useState(!1),
    [rd, RD] = React.useState(""),
    ls = React.useRef(v),
    bd = React.useRef(!1);
  React.useEffect(() => {
    if (v !== ls.current) {
      ls.current = v;
      bd.current = !1;
      RD("");
      S(fm(v));
      return;
    }
    !f && !bd.current && S(fm(v));
  }, [v, f]);
  const ch = (E) => {
    const x = E.currentTarget.value;
    S(x);
    const n = nfMoney(x);
    if (n === "") {
      bd.current = !0;
      RD("");
      on("") && (ls.current = 0);
      return;
    }
    if (typeof n != "number" || isNaN(n)) {
      bd.current = !0;
      RD("");
      bad(
        L +
          ': "' +
          x.trim().slice(0, 24) +
          '" is not a number. Type a number, for example 100000 or 100k. Not applied. Your plan still uses ' +
          U(v) +
          ".",
      );
      return;
    }
    if (on(n)) {
      ls.current = n;
      bd.current = !1;
      RD("read as " + U(n));
    } else {
      bd.current = !0;
      RD("");
    }
  };
  return jsxRuntime.jsxs("div", {
    className: "nf-mi",
    children: [
      jsxRuntime.jsx(cu, {
        label: L,
        description: Ds,
        size: "xs",
        leftSection: "$",
        value: s,
        onChange: ch,
        onFocus: () => F(!0),
        onBlur: () => F(!1),
        inputMode: "decimal",
        autoComplete: "off",
        spellCheck: !1,
      }),
      rd &&
        jsxRuntime.jsx("p", {
          className: "nf-read",
          "aria-live": "polite",
          children: rd,
        }),
    ],
  });
}
function AssumptionsForm() {
  const { profile: e, updateProfile: t, exportData: n, exportCSV: r, importData: i, resetProfile: RP } = useFireStore(),
    [o, a] = React.useState(e.annual_savings),
    [s, u] = React.useState(e.annual_spend),
    [c, d] = React.useState(e.assumptions.growthRate * 100),
    [h, p] = React.useState(e.assumptions.taxDrag * 100),
    [v, b] = React.useState(!1),
    [y, w] = React.useState(!0),
    [x, S] = React.useState(!1),
    [vm, sVm] = React.useState({}),
    [nfRv, nfSRv] = React.useState(0),
    [sv, sSv] = React.useState("idle|0");
  React.useEffect(() => {
    const f = () => sSv(window.__nfSv.s + "|" + window.__nfSv.t);
    window.__nfSv.f.push(f);
    f();
    return () => {
      window.__nfSv.f = window.__nfSv.f.filter((g) => g !== f);
    };
  }, []);
  React.useEffect(() => {
    window.__nfIn.m = vm;
    window.__nfIn.f.slice().forEach((g) => g());
  }, [vm]);
  React.useEffect(() => {
    a(e.annual_savings), u(e.annual_spend), d(e.assumptions.growthRate * 100), p(e.assumptions.taxDrag * 100);
  }, [e]);
  const P = (D) => {
      sVm({});
      nfSRv((x) => x + 1);
      i(D);
    },
    U = (x) => "$" + Number(x).toLocaleString("en-CA"),
    NV = (K, L, D, lo, hi, it, bl, cur) => {
      const set = (m) =>
        sVm((q) =>
          (q[K] || null) === m
            ? q
            : {
                ...q,
                [K]: m,
              },
        );
      if (D === "" || D === null || D === void 0) {
        if (bl !== void 0) {
          set(L + " is empty, so the plan counts it as $0.");
          return bl;
        }
        set(L + " needs a number. Not applied: your plan still uses " + cur + ".");
        return null;
      }
      const n = typeof D === "number" ? D : Number(String(D).replace(/,/g, ""));
      if (!isFinite(n) || n < lo || n > hi || (it && n % 1 !== 0)) {
        set(
          L +
            (n < 0 && lo === 0
              ? " cannot be negative. Enter 0 or more."
              : " must be " +
                (lo === 0 && hi >= 1e9
                  ? "a number, 0 or more."
                  : (it ? "a whole number " : "a number ") + "from " + lo + " to " + hi + ".")) +
            " Not applied: your plan still uses " +
            cur +
            ".",
        );
        return null;
      }
      set(null);
      return n;
    },
    FE = (K) =>
      vm[K] &&
      jsxRuntime.jsx("p", {
        className: "nf-ferr",
        role: "alert",
        children: vm[K],
      }),
    nfMF = (K, L, v, hi, ap, ds) =>
      jsxRuntime.jsx(
        nfMI,
        {
          label: L,
          description: ds,
          v: v,
          U: U,
          on: (D) => {
            const n = NV(K, L, D, 0, hi, 0, 0, U(v));
            if (n === null) return !1;
            ap(n);
            return !0;
          },
          bad: (m) =>
            sVm((q) => ({
              ...q,
              [K]: m,
            })),
        },
        K + "-" + nfRv,
      ),
    O = (D, I) => {
      t({
        assumptions: {
          [D]: Number(I) || 0,
        },
      });
    },
    k = (D, I) => {
      const n = NV(
        "a_" + D,
        {
          rrsp: "RRSP",
          tfsa: "TFSA",
          non_reg: "Non-registered balance",
        }[D],
        I,
        0,
        1e10,
        0,
        0,
        U(e.assets[D]),
      );
      n !== null &&
        t({
          assets: {
            [D]: n,
          },
        });
    },
    R = ({ label: D, help: I }) =>
      jsxRuntime.jsxs("span", {
        className: "nf-lab",
        children: [
          jsxRuntime.jsx("span", {
            className: "nf-lab-t",
            children: D,
          }),
          I &&
            jsxRuntime.jsx("span", {
              className: "nf-help",
              children: I,
            }),
        ],
      }),
    M = ({ title: I, subtitle: V }) =>
      jsxRuntime.jsxs("div", {
        className: "nf-sec",
        children: [
          jsxRuntime.jsx("h3", {
            className: "nf-h3",
            children: I,
          }),
          V &&
            jsxRuntime.jsx("p", {
              className: "nf-sub",
              children: V,
            }),
        ],
      }),
    DB = (I, V, Z, Q) =>
      jsxRuntime.jsxs("button", {
        type: "button",
        className: "nf-disc",
        "aria-expanded": Z,
        onClick: Q,
        children: [
          jsxRuntime.jsxs("span", {
            className: "nf-disc-l",
            children: [
              jsxRuntime.jsx("span", {
                className: "nf-h3",
                children: I,
              }),
              jsxRuntime.jsx("span", {
                className: "nf-sub",
                children: V,
              }),
            ],
          }),
          jsxRuntime.jsx("span", {
            className: "nf-disc-s",
            children: Z ? "Hide" : "Show",
          }),
        ],
      });
  return jsxRuntime.jsxs("div", {
    className: "nf-panel",
    children: [
      jsxRuntime.jsx("h2", {
        id: "nf-h-assume",
        className: "nf-h2 nf-h2-main",
        children: "Your assumptions",
      }),
      jsxRuntime.jsx("p", {
        className: "nf-note",
        children: "Edit any value. Today's dollars. Type 100k or 1.5m.",
      }),
      jsxRuntime.jsx("p", {
        className: "nf-saved",
        "aria-live": "polite",
        children: (() => {
          const q = sv.split("|"),
            s = q[0];
          return s === "saved"
            ? "Saved on this device (" +
                new Date(Number(q[1])).toLocaleTimeString("en-CA", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) +
                "). Changes save here as you type."
            : s === "loaded"
              ? "Saved on this device. Your last plan was restored."
              : s === "readfail"
                ? "Could not read your saved plan; nothing will be overwritten. Reload to retry."
                : s === "fail"
                ? "Could not save on this device (browser storage is blocked or full). Use Save plan file to keep a copy."
                : "Not saved yet. Changes save on this device as you type.";
        })(),
      }),
      jsxRuntime.jsx(M, {
        title: "Income and location",
        subtitle: "Your starting point.",
      }),
      jsxRuntime.jsxs(sn, {
        grow: !0,
        align: "end",
        children: [
          jsxRuntime.jsx(Mp, {
            label: "Province",
            description: "Sets tax tables. No Quebec.",
            size: "xs",
            data: [
              {
                value: "ON",
                label: "Ontario",
              },
              {
                value: "AB",
                label: "Alberta",
              },
              {
                value: "BC",
                label: "British Columbia",
              },
              {
                value: "NS",
                label: "Nova Scotia",
              },
              {
                value: "SK",
                label: "Saskatchewan",
              },
              {
                value: "MB",
                label: "Manitoba",
              },
              {
                value: "NB",
                label: "New Brunswick",
              },
              {
                value: "NL",
                label: "Newfoundland and Labrador",
              },
              {
                value: "PE",
                label: "Prince Edward Island",
              },
              {
                value: "YT",
                label: "Yukon",
              },
              {
                value: "NT",
                label: "Northwest Territories",
              },
              {
                value: "NU",
                label: "Nunavut",
              },
            ],
            value: e.province,
            onChange: (D) =>
              D &&
              t({
                province: D,
              }),
            allowDeselect: !1,
          }),
          nfMF(
            "income",
            "Annual income",
            e.annual_income,
            1e9,
            (n) => {
              {
                n < e.annual_savings
                  ? sVm((q) => ({
                      ...q,
                      incomeNote: "Annual savings is above this income, so the plan counts " + U(n) + " a year of savings. Your savings figure is kept.",
                    }))
                  : sVm((q) =>
                      q.incomeNote
                        ? {
                            ...q,
                            incomeNote: null,
                          }
                        : q,
                    );
                t({
                  annual_income: n,
                });
              }
            },
            "Gross, before tax.",
          ),
        ],
      }),
      FE("income"),
      vm.incomeNote &&
        jsxRuntime.jsx("p", {
          className: "nf-ferr nf-ferr-w",
          "aria-live": "polite",
          children: vm.incomeNote,
        }),
      jsxRuntime.jsx("p", {
        className: "nf-note",
        children: "Income caps RRSP room and savings. It does not change spending.",
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-sliders",
        children: [
          jsxRuntime.jsxs("div", {
            className: "nf-slider",
            children: [
              jsxRuntime.jsxs(sn, {
                justify: "space-between",
                align: "flex-start",
                wrap: "nowrap",
                mb: "xs",
                children: [
                  jsxRuntime.jsx(R, {
                    label: "Annual savings",
                    help: "How much you invest each year.",
                  }),
                  jsxRuntime.jsxs("span", {
                    className: "nf-num",
                    children: ["$", o.toLocaleString("en-CA")],
                  }),
                ],
              }),
              jsxRuntime.jsx(sl, {
                color: "var(--accent)",
                min: 0,
                max: Math.max(1e5, e.annual_income),
                step: 500,
                value: o,
                onChange: a,
                onChangeEnd: (D) =>
                  t({
                    annual_savings: D,
                  }),
                size: "lg",
                label: null,
                thumbLabel: "Annual savings",
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "nf-slider",
            children: [
              jsxRuntime.jsxs(sn, {
                justify: "space-between",
                align: "flex-start",
                wrap: "nowrap",
                mb: "xs",
                children: [
                  jsxRuntime.jsx(R, {
                    label: "Retirement spending",
                    help: "What you want to spend each year once retired, after tax.",
                  }),
                  jsxRuntime.jsxs("span", {
                    className: "nf-num",
                    children: ["$", s.toLocaleString("en-CA")],
                  }),
                ],
              }),
              jsxRuntime.jsx(sl, {
                color: "var(--accent)",
                min: 2e4,
                max: 15e4,
                step: 500,
                value: s,
                onChange: u,
                onChangeEnd: (D) =>
                  t({
                    annual_spend: D,
                  }),
                size: "lg",
                label: null,
                thumbLabel: "Retirement spending",
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx(M, {
        title: "Savings today",
        subtitle: "Balance per account.",
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-group",
        children: [
          jsxRuntime.jsxs("button", {
            type: "button",
            className: "nf-disc nf-disc-s2",
            "aria-expanded": y,
            onClick: () => w(!y),
            children: [
              jsxRuntime.jsx("span", {
                className: "nf-disc-l",
                children: jsxRuntime.jsx("span", {
                  children: "Account balances",
                }),
              }),
              jsxRuntime.jsx("span", {
                className: "nf-disc-s",
                children: y ? "Hide" : "Show",
              }),
            ],
          }),
          jsxRuntime.jsx(al, {
            in: y,
            children: jsxRuntime.jsxs(wl, {
              gap: "xs",
              children: [
                nfMF("a_rrsp", "RRSP", e.assets.rrsp, 1e10, (n) =>
                  t({
                    assets: {
                      rrsp: n,
                    },
                  }),
                ),
                FE("a_rrsp"),
                nfMF("a_tfsa", "TFSA", e.assets.tfsa, 1e10, (n) =>
                  t({
                    assets: {
                      tfsa: n,
                    },
                  }),
                ),
                FE("a_tfsa"),
                nfMF("a_non_reg", "Non-registered or corporate", e.assets.non_reg, 1e10, (n) =>
                  t({
                    assets: {
                      non_reg: n,
                    },
                  }),
                ),
                FE("a_non_reg"),
              ],
            }),
          }),
        ],
      }),
      jsxRuntime.jsx(M, {
        title: "Defined benefit pension",
        subtitle: "Employer defined benefit plans.",
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-group",
        children: [
          jsxRuntime.jsx(xl, {
            label: "Include a pension",
            labelPosition: "left",
            checked: e.pension.enabled,
            onChange: (D) =>
              t({
                pension: {
                  ...e.pension,
                  enabled: D.currentTarget.checked,
                },
              }),
            size: "md",
            className: "nf-switch",
          }),
          jsxRuntime.jsx(al, {
            in: e.pension.enabled,
            children: jsxRuntime.jsxs(wl, {
              gap: "xs",
              mt: "sm",
              children: [
                jsxRuntime.jsx(Mp, {
                  label: "Pension type",
                  size: "xs",
                  data: [
                    {
                      value: "fixed",
                      label: "Fixed amount",
                    },
                    {
                      value: "service",
                      label: "Service formula",
                    },
                  ],
                  value: e.pension.mode,
                  onChange: (D) =>
                    D &&
                    t({
                      pension: {
                        ...e.pension,
                        mode: D,
                      },
                    }),
                  allowDeselect: !1,
                }),
                e.pension.mode === "fixed"
                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        nfMF(
                          "pen",
                          "Annual pension amount",
                          e.pension.annualAmount,
                          1e9,
                          (n) =>
                            t({
                              pension: {
                                ...e.pension,
                                annualAmount: n,
                              },
                            }),
                          "Starts as an example amount. Replace it with your own.",
                        ),
                        FE("pen"),
                      ],
                    })
                  : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        nfMF("best", "Best five-year average earnings", e.pension.bestAverageEarnings, 1e9, (n) =>
                          t({
                            pension: {
                              ...e.pension,
                              bestAverageEarnings: n,
                            },
                          }),
                        ),
                        FE("best"),
                        jsxRuntime.jsxs(sn, {
                          grow: !0,
                          children: [
                            jsxRuntime.jsx($n, {
                              label: "Career start age",
                              size: "xs",
                              value: e.pension.careerStartAge,
                              onChange: (D) =>
                                t({
                                  pension: {
                                    ...e.pension,
                                    careerStartAge: Number(D) || 20,
                                  },
                                }),
                              hideControls: !0,
                            }),
                            jsxRuntime.jsx($n, {
                              label: "Accrual rate",
                              size: "xs",
                              value: Number((e.pension.accrualRate * 100).toFixed(2)),
                              onChange: (D) =>
                                t({
                                  pension: {
                                    ...e.pension,
                                    accrualRate: (Number(D) || 2) / 100,
                                  },
                                }),
                              rightSection: "%",
                              hideControls: !0,
                            }),
                          ],
                        }),
                        jsxRuntime.jsx(xl, {
                          label: "Include bridge benefit",
                          labelPosition: "left",
                          size: "md",
                          className: "nf-switch",
                          checked: e.pension.bridgeEnabled,
                          onChange: (D) =>
                            t({
                              pension: {
                                ...e.pension,
                                bridgeEnabled: D.currentTarget.checked,
                              },
                            }),
                        }),
                      ],
                    }),
                jsxRuntime.jsx($n, {
                  label: "Pension starts at age",
                  size: "xs",
                  value: e.pension.startAge,
                  onChange: (D) =>
                    t({
                      pension: {
                        ...e.pension,
                        startAge: Number(D) || 60,
                      },
                    }),
                  hideControls: !0,
                }),
                jsxRuntime.jsx(xl, {
                  label: "Pension rises with inflation",
                  labelPosition: "left",
                  className: "nf-switch",
                  checked: e.pension.isIndexed,
                  onChange: (D) =>
                    t({
                      pension: {
                        ...e.pension,
                        isIndexed: D.currentTarget.checked,
                      },
                    }),
                  size: "md",
                }),
              ],
            }),
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-group",
        children: [
          DB("Ages", "Your age now and your retirement age.", x, () => S(!x)),
          jsxRuntime.jsx(al, {
            in: x,
            children: jsxRuntime.jsxs(wl, {
              gap: "xs",
              children: [
                jsxRuntime.jsx($n, {
                  label: "Current age",
                  size: "xs",
                  value: e.age,
                  onChange: (D) => {
                    const n = NV("age", "Current age", D, 18, 90, 1, void 0, e.age + "");
                    n !== null &&
                      t({
                        age: n,
                      });
                  },
                  min: 18,
                  max: 90,
                  clampBehavior: "none",
                  hideControls: !0,
                }),
                FE("age"),
                jsxRuntime.jsx($n, {
                  label: "Retirement age",
                  description: "Saving stops, withdrawals start.",
                  size: "xs",
                  value: e.target_retirement_age,
                  onChange: (D) => {
                    const n = NV("ret", "Retirement age", D, 30, 90, 1, void 0, e.target_retirement_age + "");
                    n !== null &&
                      t({
                        target_retirement_age: n,
                      });
                  },
                  min: 30,
                  max: 90,
                  clampBehavior: "none",
                  hideControls: !0,
                }),
                FE("ret"),
                e.target_retirement_age < e.age &&
                  jsxRuntime.jsx("p", {
                    className: "nf-ferr nf-ferr-w",
                    "aria-live": "polite",
                    children:
                      "Your retirement age (" +
                      e.target_retirement_age +
                      ") is below your current age (" +
                      e.age +
                      "), so the planner treats you as already retired and starts withdrawals now. Raise the retirement age to plan ahead.",
                  }),
              ],
            }),
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-group",
        children: [
          DB("Advanced assumptions", "Growth, tax drag, CPP and OAS.", v, () => b(!v)),
          jsxRuntime.jsx(al, {
            in: v,
            children: jsxRuntime.jsxs("div", {
              className: "nf-adv",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "nf-slider",
                  children: [
                    jsxRuntime.jsxs(sn, {
                      justify: "space-between",
                      align: "flex-start",
                      wrap: "nowrap",
                      mb: "xs",
                      children: [
                        jsxRuntime.jsx(R, {
                          label: "Real growth rate",
                          help: "Nominal return minus inflation.",
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "nf-num nf-num-s",
                          children: [c.toFixed(1), "%"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx(sl, {
                      size: "lg",
                      min: 1,
                      max: 10,
                      step: 0.1,
                      value: c,
                      onChange: d,
                      onChangeEnd: (D) => O("growthRate", D / 100),
                      label: null,
                      thumbLabel: "Real growth rate",
                    }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  className: "nf-slider",
                  children: [
                    jsxRuntime.jsxs(sn, {
                      justify: "space-between",
                      align: "flex-start",
                      wrap: "nowrap",
                      mb: "xs",
                      children: [
                        jsxRuntime.jsx(R, {
                          label: "Tax drag",
                          help: "Yearly return lost to tax on non-registered money.",
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "nf-num nf-num-s",
                          children: [h.toFixed(1), "%"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx(sl, {
                      size: "lg",
                      min: 0,
                      max: 5,
                      step: 0.1,
                      value: h,
                      onChange: p,
                      onChangeEnd: (D) => O("taxDrag", D / 100),
                      label: null,
                      thumbLabel: "Tax drag",
                    }),
                  ],
                }),
                jsxRuntime.jsxs(sn, {
                  grow: !0,
                  children: [
                    nfMF("cpp", "CPP/QPP per year", e.assumptions.cppAmount, 1e9, (n) => O("cppAmount", n)),
                    nfMF("oas", "OAS per year", e.assumptions.oasAmount, 1e9, (n) => O("oasAmount", n)),
                  ],
                }),
                FE("cpp"),
                FE("oas"),
              ],
            }),
          }),
        ],
      }),
      jsxRuntime.jsx(M, {
        title: "Your plan file",
        subtitle: "Saved in this browser. Save a file as backup.",
      }),
      jsxRuntime.jsxs("div", {
        className: "nf-data",
        children: [
          jsxRuntime.jsx(Button, {
            variant: "default",
            onClick: n,
            leftSection: nfIc("M8 2.5v8M5 7.5l3 3 3-3M3 13.5h10"),
            children: "Save plan file",
          }),
          jsxRuntime.jsx(D5, {
            onChange: P,
            accept: "application/json",
            inputProps: {
              "aria-label": "Load plan file",
            },
            children: (D) =>
              jsxRuntime.jsx(Button, {
                ...D,
                variant: "default",
                leftSection: nfIc("M8 10.5v-8M5 5.5l3-3 3 3M3 13.5h10"),
                children: "Load plan file",
              }),
          }),
          jsxRuntime.jsx(Button, {
            variant: "default",
            onClick: r,
            leftSection: nfIc("M2.5 3h11v10h-11zM2.5 6.5h11M2.5 10h11M6.5 3v10"),
            children: "Download year table",
          }),
          jsxRuntime.jsx(Button, {
            variant: "default",
            className: "nf-danger",
            onClick: () => {
              (window.__nfireConfirmReset ? window.__nfireConfirmReset() : !1) && (sVm({}), nfSRv((x) => x + 1), RP());
            },
            leftSection: nfIc("M3 8a5 5 0 1 0 1.5-3.5M3 3v2.5h2.5"),
            children: "Restore example plan",
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "nf-note",
        children: "Replaces your numbers with the example. Save a file first.",
      }),
    ],
  });
}
