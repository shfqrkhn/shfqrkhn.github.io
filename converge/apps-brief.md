# Per-app convergence brief (reviewer route)

You are one fresh, read-only reviewer pass over a frozen candidate: the live 42-page site built from this repository. You review only the items named in your dispatch. Your result decides whether each item's pass counts toward three clean passes in a row (Omni section 6.2).

## Identity first

1. Run `python converge/app_keys.py` from the repository root. Compare each of your items' key (first 16 characters) with the key in your dispatch. A mismatch: stop and report `KEY_MISMATCH`; review nothing.
2. Never edit, create or delete a file in the repository. Scratch work and your report go only in the scratch folder your dispatch names.

## What you read

- Every line of each item's source in `sources/apps/`, not a sample. For files with very long lines, read `<views>/<name>.view.html` (your dispatch gives the folder): each line over 2000 characters is replaced by its line number, length, hash and its start and end. You still cover those lines: classify each as data or vendored code. For data, parse and check all of it by script (structure, missing or duplicate keys, answer keys in range, broken references, impossible values). For vendored code, name the library, version and licence from its header and say whether it is loaded from the page itself (no external request).
- The built page in `site/` (the registry, `builder/registry.json`, maps each source to its slug and kind) where behaviour depends on the build: CSP, inlined engine, service worker, shared `site/scripts/ui.css`.
- Study readers (a marker line `@@KD-ENGINE`) use `sources/engine/ENGN-KD-App-1.5.5.js` (DealDojo uses `ENGN-KD-App-1.5.6.js`, which adds the plan worksheet); if your dispatch gives you the engine, read all of it.

## What blocks (critical, material, moderate)

A finding blocks only when a user or a maintainer following the page would hit it:
- a wrong result: a calculation, score, answer key, date, unit or conversion that is wrong; content that teaches a false fact;
- data loss or exposure: saved work lost on reload, import or upgrade; an export that drops data; anything sent off the device; personal data in the page;
- a failure to work: a control that does nothing, a crash or uncaught error on a normal path, a dead link inside the site, a page that fails offline after its first load;
- security: an injection path (untrusted text into `innerHTML` or similar), an external request, a CSP that does not hold;
- an accessibility barrier that stops use: a keyboard trap, an essential control with no accessible name, content not reachable by keyboard;
- two instructions on the page that cannot both be followed.

Minor (never blocks): wording, style, layout polish, naming, a cosmetic contrast nit that does not stop reading, a theoretical case no normal use reaches. List minors briefly.

Do not report a design choice as a defect unless it causes one of the above. Do not report anything you have not confirmed against the exact line.

## Evidence

- Every finding: item, severity, file and line, the exact quoted text, the concrete failure (input, then what goes wrong), and a proposed fix.
- At least one held-out probe per item that you design and execute yourself: for example, extract a function and run it in `node` with chosen inputs and an expected value written before running; or load the built page with Playwright for Python (installed) from `site/` over `file://` or a local server on a free port, act on it and check the result and the console. Record design, command, expected, actual, PASS or FAIL. A probe you did not run is NOT_RUN and does not count.
- Status words only: PASS, FAIL, PARTIAL, NOT_RUN, BLOCKED.

## Report

Write JSON to the report path in your dispatch:

```json
{"group": "...", "keys": {"<item>": "<16 chars>"}, "coverage": {"<item>": "how every line was read or checked"},
 "findings": [{"item": "", "severity": "critical|material|moderate|minor", "file": "", "line": 0, "quote": "", "failure": "", "fix": ""}],
 "probes": [{"item": "", "design": "", "command": "", "expected": "", "actual": "", "status": "PASS|FAIL|NOT_RUN"}],
 "verdict": {"<item>": "CLEAN|BLOCKING"}}
```

Return only: the group, each item's verdict, the count of blocking and minor findings, and the report path.
