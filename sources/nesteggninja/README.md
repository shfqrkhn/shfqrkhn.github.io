# NestEggNinja source (recovered)

The retirement planner that PennyPlanner opens from Planning, Retirement. Its original source code is lost. This folder holds a readable source recovered from the built page, and the build turns it back into that page.

## How it is built

- `NEN-Planner-v10.4.5.html` is the page shell: the original page with each inline block replaced by a marker such as `@@NEN src/app.css@@`.
- `builder/build.py` (`assemble_page`) puts each file back in place of its marker. `@@NEN src/bundle@@` takes every `.js` file in `src/bundle/` in name order. It then recomputes the shell's `script-src` sha256 pins, so nobody edits a hash by hand.
- PennyPlanner holds `<template data-kd="embed" id="ff-nen" data-src="nesteggninja/NEN-Planner-v*.html">`. The build's `embed_pages` fills it with the assembled page (gzip, base64), drops the page's hub link, and merges the page's pins and `frame-src blob:` into PennyPlanner's policy. The same embed carries AuctionAcademy in BlueprintBuddy.
- To change the planner: edit a file here, run `python builder/build.py`, then step PennyPlanner's version.

## Layout

| Path | What it is |
|---|---|
| `src/look.js`, `src/reset.js` | Early scripts: colour look and a reset hook, run before the app |
| `src/kit.css` | The page's style sheet (Tailwind utilities and Mantine styles), kept byte for byte |
| `src/content-meta.json`, `src/nf-data.json` | Data blocks: guide text and the tax figures (`NF_DATA`) |
| `src/loader.js` | Reads `nf-data.json` into `NF_DATA` before the app starts |
| `src/bundle/` | The app module, split into 24 ordered parts (table below) |
| `src/app.css` | The app's own styles |
| `src/console-quiet.js`, `src/svg-aria.js`, `src/lab.js` | Small add-ons: console filter, chart labels for screen readers, the stress test panel |
| `tests/behave.py`, `tests/baseline.json` | Behaviour test and the outputs it recorded from the old embed |
| `tools/recover.js`, `tools/recover-report.json` | The one-off recovery script and its report |
| `THIRD-PARTY-NOTICES.md` | Bundled packages and their licences |

## Bundle parts

The parts are cuts of one ES module at top-level statement boundaries. They only work concatenated in order: a few declarations span two parts (part 11 declares names part 12 uses), so they are not separate modules.

| Part | Content | Kind |
|---|---|---|
| 00 | Vite and Rollup helpers, modulepreload polyfill | build output |
| 01, 02 | React 18.3.1 with jsx-runtime; scheduler and react-dom 18.3.1 | third party |
| 03 | tslib helpers, react-remove-scroll family, get-nonce | third party |
| 04, 06, 08 | Mantine core (with clsx) | third party |
| 05 | Floating UI | third party |
| 07 | react-number-format | third party |
| 09, 10, 11 | zustand, use-sync-external-store | third party |
| 12 | Dexie 3.2.7 | third party |
| 13 | Globals and the `nFireDB` database handle | app |
| 14 | decimal.js | third party |
| 15 | Tax and retirement engine (`nFIREModelSource`, between the `NFIRE_MODEL_SOURCE` comments) | app |
| 16 | FileSaver.js | third party |
| 17 | Default plan, store, plan file import and export | app |
| 18 | framer-motion 11.18.2 | third party |
| 19 | Loading screen and hydration gate | app |
| 20 | lucide-react icons | third party |
| 21 | Guide, header, results, money input, assumptions form | app |
| 22 | Recharts with lodash, react-is, d3, decimal.js-light, recharts-scale, tiny-invariant, prop-types, fast-equals, react-smooth, eventemitter3 | third party |
| 23 | Chart, welcome, page, App and mount | app |

## How it was recovered

1. The page was decoded from the gzip and base64 blob in PennyPlanner 1.4.1 (the `ff-nen` script).
2. Its 12 inline blocks were split into files. One block, a style that hid the hub link, was dropped: the build now removes the link itself.
3. The module was parsed with acorn, and cut at 23 statement boundaries where each package starts or ends. Packages were named from version strings and code shape.
4. `tools/recover.js` (Node, with @babel/parser, @babel/traverse and @babel/generator 7.25.6 and prettier 3.3.3) renamed clear top-level names, printed the code, and formatted each part. It escapes `</script` back as `<\/script` so the code can sit in a script block. Rerun: `npm i @babel/parser@7.25.6 @babel/traverse@7.25.6 @babel/generator@7.25.6 prettier@3.3.3`, then `node --max-old-space-size=8192 tools/recover.js <decoded page> <out folder>`.
5. Names restored where the code makes them clear: `jsxRuntime`, `React`, `ReactDefault`, `ReactDOMClient`, `MantineProvider`, `Modal`, `Tabs`, `Button`, `motion`, `Dexie`, `nfireDb`, `createStore`, `defaultProfile`, `useFireStore`, `taxPolicy`, `LoadingScreen`, `HydrationGate`, `GuideModal`, `Header`, `ResultPanel`, `AssumptionsForm`, `ChartTooltip`, `SavingsAreaChart`, `SavingsChartSection`, `WelcomeModal`, `Page`, `App`. Names already used elsewhere in the module were left minified (`Ze` is Decimal; `Up`, `Hp`, `XB`, `ZB`, `V0`, `z0` are the engine's OAS threshold, tax, gross-up, pension, solvency test and simulation).

## Proof

`tests/behave.py` drives the planner in Chromium (Playwright) and records the visible text, the year-table CSV, the saved plan file and a seeded stress test (seed 12345, 500 paths) for five scenarios: default inputs, early retirement (age 45), high spending (90,000), zero savings, and a saved plan reloaded. It ran twice on the old embed (identical results, now `tests/baseline.json`), then on the rebuilt page alone and inside PennyPlanner with its policy on. Every output matched, with no console errors or policy violations. A plan saved by the old live PennyPlanner was restored by the new one. In PennyPlanner 1.4.3 the saved-plan scenario was re-recorded: the old page cut Annual savings to the first digit typed into Annual income (the plan file held savings 1); the fixed page keeps 20,000 and only counts savings up to income in the projection.

Run it: `python tests/behave.py <served folder> <page> <out.json> [--host] [--saved-by=<page>]`. With `--host` the page is PennyPlanner and the planner is opened in its frame.

## What is not certain

- The rebuilt page is not byte-identical to the old one: the code is reprinted and formatted. It is proven equal only by the behaviour test above, not line by line.
- Versions are proven only for React and react-dom 18.3.1, Dexie 3.2.7 and framer-motion 11.18.2 (strings in the code). Mantine (looks like 7.x), zustand (looks like 4.5.x), Recharts (2.x) and the rest are not recorded in the bundle.
- Licences are each project's published ones; no licence text survived minification. See `THIRD-PARTY-NOTICES.md`.
- Third-party parts are minified library code, readable but not the libraries' own source. Replacing them with npm packages would need the exact versions and a bundler, and was not done.
- The original build tool chain (Vite config, TypeScript or JSX sources, Tailwind config) is not recovered.
- The baseline is the old embed. Since PennyPlanner 1.4.3 savings above income are kept and counted only up to income; since 1.4.4 the NetWorth column is the sum of the account columns in the same row (the old page showed the opening balance), so those outputs differ from the baseline on purpose.
