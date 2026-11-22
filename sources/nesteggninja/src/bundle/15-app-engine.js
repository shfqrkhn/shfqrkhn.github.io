/* NFIRE_MODEL_SOURCE_START */
(function installNfireModel(global) {
  "use strict";

  const POLICY = (function (D) {
    if (!D || !D.fed || !D.prov) throw new TypeError("NF_DATA is missing: tax figures are required.");
    const rate = (e4) => e4 / 10000;
    const br = (list) =>
      Object.freeze(
        list.map((x) =>
          Object.freeze({
            threshold: x[0] === null ? 999_999_999 : x[0],
            rate: rate(x[1]),
          }),
        ),
      );
    const provinces = {};
    Object.keys(D.prov).forEach((k) => {
      provinces[k] = Object.freeze({
        name: D.prov[k].name,
        brackets: br(D.prov[k].brackets),
      });
    });
    return Object.freeze({
      basis:
        "Tax year " +
        D.taxYear +
        " figures from canada.ca; every figure and its source is listed in the assumptions ledger",
      taxYear: D.taxYear,
      federal: Object.freeze({
        brackets: br(D.fed.brackets),
        basic_personal_amount: D.fed.bpaCents / 100,
      }),
      provinces: Object.freeze(provinces),
      constants: Object.freeze({
        rrsp_limit_pct: D.c.rrspPct / 100,
        rrsp_max_dollar: D.c.rrspMaxCents / 100,
        tfsa_limit: D.c.tfsaCents / 100,
        oas_threshold: D.c.oasThresholdCents / 100,
        oas_recovery_rate: D.c.oasRecoveryE4 / 10000,
        ympe: D.c.ympeCents / 100,
      }),
    });
  })(global.NF_DATA);
  const DEFAULT_PROFILE = Object.freeze({
    age: 32,
    target_retirement_age: 55,
    province: "ON",
    annual_income: 92_000,
    annual_spend: 48_000,
    annual_savings: 20_000,
    assets: Object.freeze({
      rrsp: 40_000,
      tfsa: 60_000,
      non_reg: 5_000,
    }),
    pension: Object.freeze({
      enabled: false,
      mode: "fixed",
      startAge: 60,
      isIndexed: true,
      annualAmount: 42_000,
      bridgeAmount: 9_000,
      careerStartAge: 25,
      accrualRate: 0.02,
      bestAverageEarnings: 95_000,
      bridgeEnabled: true,
    }),
    assumptions: Object.freeze({
      growthRate: 0.05,
      inflationRate: 0.02,
      withdrawalRate: 0.035,
      cppAmount: 12_000,
      oasAmount: 8_500,
      cppStartAge: 65,
      taxDrag: 0.005,
      lifespan: 95,
    }),
  });
  function createEngine(Decimal, options = {}) {
    if (typeof Decimal !== "function" || typeof Decimal.min !== "function" || typeof Decimal.max !== "function") {
      throw new TypeError("createEngine requires a decimal-compatible constructor with min/max statics.");
    }
    const currentYear = options.currentYear ?? (() => new Date().getFullYear());
    const D = (value) => new Decimal(value);
    const oasThreshold = POLICY.constants.oas_threshold;
    function bracketTax(brackets, income) {
      let tax = D(0);
      let previousThreshold = 0;
      for (const bracket of brackets) {
        if (income <= previousThreshold) break;
        const taxable = Math.min(income, bracket.threshold) - previousThreshold;
        tax = tax.plus(D(taxable).times(bracket.rate));
        previousThreshold = bracket.threshold;
      }
      return tax;
    }
    function calculateTax(income, province) {
      if (!POLICY.provinces[province]) throw new RangeError(`Unsupported province: ${province}`);
      let tax = bracketTax(POLICY.federal.brackets, income);
      tax = tax.plus(bracketTax(POLICY.provinces[province].brackets, income));
      const federalCredit = D(POLICY.federal.basic_personal_amount).times(POLICY.federal.brackets[0].rate);
      return Decimal.max(0, tax.minus(federalCredit));
    }
    function grossUpWithdrawal(netNeeded, otherIncome, province) {
      if (netNeeded.lte(0)) return D(0);
      let gross = netNeeded;
      for (let iteration = 0; iteration < 10; iteration += 1) {
        const combinedTax = calculateTax(D(otherIncome).plus(gross).toNumber(), province);
        const baselineTax = calculateTax(otherIncome, province);
        const nextGross = netNeeded.plus(combinedTax.minus(baselineTax));
        if (nextGross.minus(gross).abs().lt(1)) break;
        gross = nextGross;
      }
      return gross;
    }
    function calculatePension(profile, referenceAge) {
      if (!profile.pension.enabled)
        return {
          annual: D(0),
          bridge: D(0),
          startAge: 65,
        };
      if (profile.pension.mode === "fixed") {
        return {
          annual: D(profile.pension.annualAmount),
          bridge: D(profile.pension.bridgeAmount),
          startAge: profile.pension.startAge,
        };
      }
      const careerYears = Math.max(0, referenceAge - profile.pension.careerStartAge);
      const creditedYears = Math.min(careerYears, 35);
      let startAge = profile.pension.startAge;
      if (referenceAge > startAge) startAge = referenceAge;
      const annual = D(creditedYears).times(profile.pension.accrualRate).times(profile.pension.bestAverageEarnings);
      const bridge = profile.pension.bridgeEnabled
        ? D(creditedYears).times(0.00625).times(POLICY.constants.ympe)
        : D(0);
      return {
        annual,
        bridge,
        startAge,
      };
    }
    function annualBenefits(profile, age, referenceAge, pension) {
      let spendingNeed = D(profile.annual_spend);
      let taxableIncome = D(0);
      if (profile.pension.enabled && age >= pension.startAge) {
        let pensionIncome = pension.annual;
        if (!profile.pension.isIndexed) {
          const elapsed = age - referenceAge;
          pensionIncome = pensionIncome.div(Math.pow(1 + (profile.assumptions.inflationRate || 0.02), elapsed));
        }
        if (age < 65) pensionIncome = pensionIncome.plus(pension.bridge);
        spendingNeed = spendingNeed.minus(pensionIncome);
        taxableIncome = taxableIncome.plus(pensionIncome);
      }
      if (age >= (profile.assumptions.cppStartAge || 65)) {
        const cpp = D(profile.assumptions.cppAmount);
        spendingNeed = spendingNeed.minus(cpp);
        taxableIncome = taxableIncome.plus(cpp);
      }
      if (age >= 65) {
        let oas = D(profile.assumptions.oasAmount);
        const income = taxableIncome.toNumber() + oas.toNumber(); // CRA: net income including OAS
        if (income > oasThreshold) {
          const recoveryTax = (income - oasThreshold) * POLICY.constants.oas_recovery_rate;
          oas = oas.minus(Math.min(oas.toNumber(), recoveryTax));
        }
        spendingNeed = spendingNeed.minus(oas);
        taxableIncome = taxableIncome.plus(oas);
      }

      // Spending is after tax: income tax on pension, CPP and net OAS is funded from savings.
      spendingNeed = spendingNeed.plus(calculateTax(taxableIncome.toNumber(), profile.province));
      return {
        spendingNeed,
        taxableIncome,
      };
    }
    function testSolvency(rrsp, tfsa, nonReg, startAge, profile, assumptions, pensionReferenceAge) {
      let rrspBalance = rrsp;
      let tfsaBalance = tfsa;
      let nonRegBalance = nonReg;
      const pension = calculatePension(profile, pensionReferenceAge);
      for (let age = startAge; age <= assumptions.deathAge; age += 1) {
        let { spendingNeed, taxableIncome } = annualBenefits(profile, age, pensionReferenceAge, pension);
        if (spendingNeed.gt(0) && tfsaBalance.gt(0)) {
          const withdrawal = Decimal.min(tfsaBalance, spendingNeed);
          tfsaBalance = tfsaBalance.minus(withdrawal);
          spendingNeed = spendingNeed.minus(withdrawal);
        }
        if (spendingNeed.gt(0) && nonRegBalance.gt(0)) {
          const withdrawal = Decimal.min(nonRegBalance, spendingNeed);
          nonRegBalance = nonRegBalance.minus(withdrawal);
          spendingNeed = spendingNeed.minus(withdrawal);
        }
        if (spendingNeed.gt(0) && rrspBalance.gt(0)) {
          const gross = grossUpWithdrawal(spendingNeed, taxableIncome.toNumber(), profile.province);
          if (rrspBalance.lt(gross)) {
            const combinedTax = calculateTax(taxableIncome.plus(rrspBalance).toNumber(), profile.province);
            const baselineTax = calculateTax(taxableIncome.toNumber(), profile.province);
            const net = rrspBalance.minus(combinedTax.minus(baselineTax));
            rrspBalance = D(0);
            spendingNeed = spendingNeed.minus(net);
          } else {
            rrspBalance = rrspBalance.minus(gross);
            spendingNeed = D(0);
          }
        }
        if (spendingNeed.gt(100) && rrspBalance.lte(1) && tfsaBalance.lte(1) && nonRegBalance.lte(1)) return false;
        rrspBalance = rrspBalance.times(assumptions.realGrowth);
        tfsaBalance = tfsaBalance.times(assumptions.realGrowth);
        nonRegBalance = nonRegBalance.times(assumptions.nonRegNetGrowth);
      }
      return true;
    }
    function simulate(profile) {
      const assumptions = {
        realGrowth: D(1 + profile.assumptions.growthRate),
        nonRegNetGrowth: D(1 + Math.max(0, profile.assumptions.growthRate - (profile.assumptions.taxDrag || 0))),
        cppAge: profile.assumptions.cppStartAge || 65,
        deathAge: Math.max(profile.assumptions.lifespan, profile.age + 1),
        inflationRate: profile.assumptions.inflationRate || 0.02,
      };
      const projection = [];
      let rrsp = D(profile.assets.rrsp);
      let tfsa = D(profile.assets.tfsa);
      let nonReg = D(profile.assets.non_reg);
      let freedomYear = null;
      let coastYear = null;
      if (testSolvency(rrsp, tfsa, nonReg, profile.age, profile, assumptions, profile.age)) {
        freedomYear = currentYear();
      }
      const initialAssets = rrsp.plus(tfsa).plus(nonReg).toNumber();
      if (profile.annual_spend > profile.annual_income && initialAssets === 0 && !freedomYear) {
        return {
          projection: [],
          freedomYear: "NEVER",
          coastYear: "NEVER",
        };
      }
      for (let age = profile.age; age <= assumptions.deathAge; age += 1) {
        const retired = age >= profile.target_retirement_age;
        if (!freedomYear && testSolvency(rrsp, tfsa, nonReg, age, profile, assumptions, age)) {
          freedomYear = currentYear() + (age - profile.age);
        }
        if (!coastYear) {
          if (!freedomYear) {
            if (
              testSolvency(
                rrsp,
                tfsa,
                nonReg,
                age,
                {
                  ...profile,
                },
                assumptions,
                age,
              )
            ) {
              coastYear = currentYear() + (age - profile.age);
            }
          } else {
            coastYear = currentYear() + (age - profile.age);
          }
        }
        if (retired) {
          let { spendingNeed, taxableIncome } = annualBenefits(
            profile,
            age,
            profile.target_retirement_age,
            calculatePension(profile, profile.target_retirement_age),
          );
          if (spendingNeed.gt(0) && tfsa.gt(0)) {
            const withdrawal = Decimal.min(tfsa, spendingNeed);
            tfsa = tfsa.minus(withdrawal);
            spendingNeed = spendingNeed.minus(withdrawal);
          }
          if (spendingNeed.gt(0) && nonReg.gt(0)) {
            const withdrawal = Decimal.min(nonReg, spendingNeed);
            nonReg = nonReg.minus(withdrawal);
            spendingNeed = spendingNeed.minus(withdrawal);
          }
          if (spendingNeed.gt(0) && rrsp.gt(0)) {
            const gross = grossUpWithdrawal(spendingNeed, taxableIncome.toNumber(), profile.province);
            rrsp = rrsp.lt(gross) ? D(0) : rrsp.minus(gross);
          }
        } else {
          let savings = Decimal.min(D(profile.annual_savings), D(profile.annual_income));
          const tfsaRoom = D(POLICY.constants.tfsa_limit);
          const rrspRoom = Decimal.min(
            D(profile.annual_income).times(POLICY.constants.rrsp_limit_pct),
            D(POLICY.constants.rrsp_max_dollar),
          );
          const tfsaContribution = Decimal.min(savings, tfsaRoom);
          tfsa = tfsa.plus(tfsaContribution);
          savings = savings.minus(tfsaContribution);
          if (savings.gt(0)) {
            const rrspContribution = Decimal.min(savings, rrspRoom);
            rrsp = rrsp.plus(rrspContribution);
            savings = savings.minus(rrspContribution);
          }
          if (savings.gt(0)) nonReg = nonReg.plus(savings);
        }
        rrsp = rrsp.times(assumptions.realGrowth);
        tfsa = tfsa.times(assumptions.realGrowth);
        nonReg = nonReg.times(assumptions.nonRegNetGrowth);
        projection.push({
          age,
          netWorth: Math.max(0, rrsp.toNumber()) + Math.max(0, tfsa.toNumber()) + Math.max(0, nonReg.toNumber()),
          rrsp: Math.max(0, rrsp.toNumber()),
          tfsa: Math.max(0, tfsa.toNumber()),
          nonReg: Math.max(0, nonReg.toNumber()),
        });
      }
      return {
        projection,
        freedomYear: freedomYear || "NEVER",
        coastYear: coastYear || "N/A",
      };
    }
    return Object.freeze({
      policy: POLICY,
      oasThreshold,
      calculateTax,
      grossUpWithdrawal,
      calculatePension,
      testSolvency,
      simulate,
    });
  }
  global.nFIREModelSource = Object.freeze({
    policy: POLICY,
    defaultProfile: DEFAULT_PROFILE,
    createEngine,
  });
})(globalThis);
const nFIREEngine = globalThis.nFIREModelSource.createEngine(Ze),
  taxPolicy = nFIREEngine.policy,
  Up = nFIREEngine.oasThreshold,
  Hp = nFIREEngine.calculateTax,
  XB = nFIREEngine.grossUpWithdrawal,
  ZB = nFIREEngine.calculatePension,
  V0 = nFIREEngine.testSolvency,
  z0 = nFIREEngine.simulate;
globalThis.nFIREEngine = nFIREEngine;
/* NFIRE_MODEL_SOURCE_END */
