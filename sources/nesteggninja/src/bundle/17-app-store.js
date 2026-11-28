const defaultProfile = {
    age: 32,
    target_retirement_age: 55,
    province: "ON",
    annual_income: 92e3,
    annual_spend: 48e3,
    annual_savings: 2e4,
    assets: {
      rrsp: 4e4,
      tfsa: 6e4,
      non_reg: 5e3,
    },
    pension: {
      enabled: !1,
      mode: "fixed",
      startAge: 60,
      isIndexed: !0,
      annualAmount: 42e3,
      bridgeAmount: 9e3,
      careerStartAge: 25,
      accrualRate: 0.02,
      bestAverageEarnings: 95e3,
      bridgeEnabled: !0,
    },
    assumptions: {
      growthRate: 0.05,
      inflationRate: 0.02,
      withdrawalRate: 0.035,
      cppAmount: 12e3,
      oasAmount: 8500,
      cppStartAge: 65,
      taxDrag: 0.005,
      lifespan: 95,
    },
  },
  useFireStore = createStore((e, t) => ({
    isHydrated: !1,
    welcomeDismissed: !1,
    loadFailed: !1,
    profile: defaultProfile,
    simulationResult: {
      projection: [],
      freedomYear: null,
      coastYear: null,
    },
    getFireNumber: () => {
      const n = t(),
        pp = n.profile.pension,
        ra = n.profile.target_retirement_age,
        r =
          pp.enabled
            ? pp.mode === "fixed"
              ? pp.annualAmount
              : Math.min(35, Math.max(0, ra - pp.careerStartAge)) * pp.accrualRate * pp.bestAverageEarnings
            : 0,
        i = Math.max(0, n.profile.annual_spend - r),
        o = n.profile.assumptions.withdrawalRate || 0.04,
        a = o > 0 ? 1 / o : 0;
      // a pension that starts after retirement still counts, plus its amount for each bridge year before it starts
      return i * a + r * Math.max(0, (pp.startAge || ra) - ra);
    },
    dismissWelcome: () => {
      try {
        localStorage.setItem("nfire_welcome_seen", "true");
      } catch (r) {}
      e({
        welcomeDismissed: !0,
      });
    },
    hydrate: async () => {
      // the welcome flag never blocks the plan read
      let r = !1;
      try {
        r = localStorage.getItem("nfire_welcome_seen") === "true";
      } catch (w) {}
      // absent (null) and a failed read (throw) are different: a failed read locks saving so the default plan never overwrites the real one
      let n = null,
        failed = !1;
      for (let k = 0; k < 2; k++) {
        try {
          n = (await nfireDb.profiles.orderBy("updated_at").last()) || null;
          failed = !1;
          break;
        } catch (x) {
          failed = !0;
          console.error("Hydration read failed:", x);
        }
      }
      if (failed) {
        window.__nfSvSet("readfail");
        e({
          simulationResult: z0(defaultProfile),
          isHydrated: !0,
          welcomeDismissed: r,
          loadFailed: !0,
        });
        return;
      }
      if (n) {
        try {
          if (typeof n !== "object" || Array.isArray(n)) throw new Error("not a plan record");
          const i = {
            ...defaultProfile,
            ...n,
            assets: {
              ...defaultProfile.assets,
              ...(n.assets || {}),
            },
            pension: {
              ...defaultProfile.pension,
              ...(n.pension || {}),
            },
            assumptions: {
              ...defaultProfile.assumptions,
              ...(n.assumptions || {}),
            },
          };
          n.assumptions &&
            n.assumptions.govBenefits &&
            ((i.assumptions.cppAmount = n.assumptions.govBenefits * 0.6),
            (i.assumptions.oasAmount = n.assumptions.govBenefits * 0.4));
          const o = z0(i);
          window.__nfSvSet("loaded");
          e({
            profile: i,
            simulationResult: o,
            isHydrated: !0,
            welcomeDismissed: r,
          });
        } catch (x) {
          // unreadable saved plan: keep a copy, never overwrite it silently
          console.error("Saved plan is unreadable:", x);
          try {
            localStorage.setItem("nfire_unreadable_plan_copy", JSON.stringify(n));
          } catch (w) {}
          window.__nfSvSet("readfail");
          e({
            simulationResult: z0(defaultProfile),
            isHydrated: !0,
            welcomeDismissed: r,
            loadFailed: !0,
          });
        }
      } else
        e({
          simulationResult: z0(defaultProfile),
          isHydrated: !0,
          welcomeDismissed: r,
        });
    },
    updateProfile: (n) => {
      e((r) => {
        const i = {
          ...r.profile,
          ...n,
          assets: {
            ...r.profile.assets,
            ...(n.assets || {}),
          },
          pension: {
            ...r.profile.pension,
            ...(n.pension || {}),
          },
          assumptions: {
            ...r.profile.assumptions,
            ...(n.assumptions || {}),
          },
        };
        i.age > 90 && (i.age = 90),
          i.assumptions.lifespan <= i.age && (i.assumptions.lifespan = i.age + 1);
        const o = z0(i);
        return (
          r.loadFailed ||
            nfireDb.profiles
              .put({
                ...i,
                updated_at: new Date(),
              })
              .then(
                () => window.__nfSvSet("saved"),
                () => window.__nfSvSet("fail"),
              ),
          navigator.vibrate && o.freedomYear !== r.simulationResult.freedomYear && navigator.vibrate(50),
          {
            profile: i,
            simulationResult: o,
          }
        );
      });
    },
    resetProfile: () => {
      const n = JSON.parse(JSON.stringify(defaultProfile));
      e({
        profile: n,
      }),
        t().updateProfile(n);
    },
    exportData: () => {
      const { profile: n } = t(),
        r = new Blob(
          [
            JSON.stringify(
              {
                app: "nFIRE",
                appVersion: "10.4.5",
                schemaVersion: 1,
                exportedAt: new Date().toISOString(),
                data: {
                  ...n,
                  tax_tables_year: NF_DATA.taxYear,
                  illustration_label: nfT(
                    "Illustration only. Not financial, tax or legal advice. Tax and benefit figures are for tax year {year} from canada.ca.",
                  ),
                  lab: window.__nfLab ? window.__nfLab.get() : void 0,
                },
              },
              null,
              2,
            ),
          ],
          {
            type: "application/json;charset=utf-8",
          },
        );
      zj.saveAs(r, `nesteggninja_save_${(()=>{const t=new Date();return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")})()}.json`),
        window.__nfireStatus && window.__nfireStatus("Plan file saved to your downloads. Keep it as your backup.");
    },
    exportCSV: () => {
      const { simulationResult: n } = t(),
        r = ["Age", "NetWorth", "RRSP", "TFSA", "NonReg", "TaxYear", "Note"],
        i = n.projection.map((s) =>
          [
            s.age,
            Math.round(s.netWorth),
            Math.round(s.rrsp),
            Math.round(s.tfsa),
            Math.round(s.nonReg),
            NF_DATA.taxYear,
            "Illustration only",
          ].join(","),
        ),
        o = [r.join(","), ...i].join(`
`),
        a = new Blob([o], {
          type: "text/csv;charset=utf-8;",
        });
      zj.saveAs(a, `nesteggninja_projection_${(()=>{const t=new Date();return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")})()}.csv`),
        window.__nfireStatus && window.__nfireStatus("Year table saved to your downloads as CSV.");
    },
    importData: (n) => {
      const r = new FileReader();
      (r.onload = (i) => {
        try {
          let o = JSON.parse(i.target.result, (k, v) => {
            if (k === "__proto__" || k === "constructor" || k === "prototype") throw new Error("unsafe key");
            return v;
          });
          if (o && typeof o === "object" && o.app !== void 0) {
            const nfSv = Number(o.schemaVersion);
            if (o.app === "nFIRE" && nfSv > 1) throw new Error("newer schema");
            if (o.app !== "nFIRE" || typeof o.data !== "object" || o.data === null || !(nfSv >= 0 && nfSv <= 1))
              throw new Error("bad envelope");
            o = ((d, v) => d)(o.data, nfSv);
          }
          if (!o || typeof o !== "object") throw new Error("not plan");
          const nfLab = o.lab;
          delete o.lab;
          delete o.tax_tables_year;
          delete o.illustration_label;
          delete o.app_version;
          if (["age", "annual_income", "annual_spend", "assets"].every((u) => u in o)) {
            const nfBad = ((d) => {
              const P = (x) => x !== null && typeof x === "object" && !Array.isArray(x),
                N = (x, a, b) => typeof x === "number" && isFinite(x) && x >= a && x <= b,
                M = 1e9,
                A = 1e10,
                F = [
                  ["age", 18, 90],
                  ["target_retirement_age", 30, 90],
                  ["annual_income", 0, M],
                  ["annual_spend", 0, M],
                  ["annual_savings", 0, M],
                ],
                S = [
                  [
                    "assets",
                    [
                      ["rrsp", 0, A],
                      ["tfsa", 0, A],
                      ["non_reg", 0, A],
                    ],
                  ],
                  [
                    "pension",
                    [
                      ["startAge", 0, 120],
                      ["annualAmount", 0, M],
                      ["bridgeAmount", 0, M],
                      ["careerStartAge", 0, 120],
                      ["accrualRate", 0, 1],
                      ["bestAverageEarnings", 0, M],
                    ],
                  ],
                  [
                    "assumptions",
                    [
                      ["growthRate", 0, 1],
                      ["inflationRate", 0, 1],
                      ["withdrawalRate", 0, 1],
                      ["cppAmount", 0, M],
                      ["oasAmount", 0, M],
                      ["cppStartAge", 0, 120],
                      ["taxDrag", 0, 1],
                      ["lifespan", 0, 120],
                    ],
                  ],
                ];
              for (const [k, a, b] of F) {
                if (k in d && !N(d[k], a, b)) return k;
              }
              if (
                "province" in d &&
                !["ON", "AB", "BC", "NS", "SK", "MB", "NB", "NL", "PE", "YT", "NT", "NU"].includes(d.province)
              )
                return "province";
              for (const [g, L] of S) {
                if (g in d) {
                  if (!P(d[g])) return g;
                  for (const [k, a, b] of L) {
                    if (k in d[g] && !N(d[g][k], a, b)) return g + "." + k;
                  }
                }
              }
              return null;
            })(o);
            if (nfBad) {
              window.__nfireStatus &&
                window.__nfireStatus(
                  "This file was refused: the value for " +
                    nfBad +
                    " is missing, not a number or outside the range this app accepts. Your current inputs are unchanged.",
                );
              return;
            }
            const u = t().profile,
              c = {
                ...u,
                ...o,
                assets: {
                  ...u.assets,
                  ...(o.assets || {}),
                },
                pension: {
                  ...u.pension,
                  ...(o.pension || {}),
                },
                assumptions: {
                  ...u.assumptions,
                  ...(o.assumptions || {}),
                },
              };
            t().updateProfile(c),
              nfLab && window.__nfLab && window.__nfLab.set(nfLab),
              window.__nfireStatus &&
                window.__nfireStatus(
                  "Plan file loaded. Your inputs now match the file." +
                    (t().loadFailed
                      ? " It is not saved on this device, because your saved plan could not be read. Reload to retry."
                      : ""),
                );
          } else
            window.__nfireStatus &&
              window.__nfireStatus(
                "This file is not a NestEggNinja plan file: it lacks age, income, spending or account balances. Your current inputs are unchanged. Choose a file made with Save plan file.",
              );
        } catch (o) {
          console.error(o),
            window.__nfireStatus &&
              window.__nfireStatus(
                o && o.message === "unsafe key"
                  ? "This file was refused because it contains an unsafe key. Your current inputs are unchanged."
                  : o && o.message === "not plan"
                    ? "This file is not a NestEggNinja plan file: it lacks age, income, spending or account balances. Your current inputs are unchanged. Choose a file made with Save plan file."
                    : o && o.message === "newer schema"
                      ? "This plan file was made by a newer version of NestEggNinja than this one. Replace this app file with the newer version, then open the plan again. Your current inputs are unchanged."
                      : o && o.message === "bad envelope"
                        ? "This file was refused: its app name or schema version is not one this build reads. Your current inputs are unchanged."
                        : "This file could not be read as JSON. Your current inputs are unchanged. Choose a file made with Save plan file.",
              );
        }
      }),
        r.readAsText(n);
    },
  })),
  __nfX = (globalThis.__nfStore = useFireStore),
  QB = React.createContext({});
