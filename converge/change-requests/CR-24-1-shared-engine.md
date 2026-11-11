# CR-24-1: one source for the study engine

**Status:** step 1 done: 18 readers use `sources/engine/ENGN-KD-App-1.5.5.js` via a marker; at step 1 all 19 pages and the whole site tree were byte-identical to the baseline; since then the engine gained the CR-24-6 prompt, so an engine edit changes exactly those 18 pages. SupportScout stays inline by decision: its script differs from the engine in six places (three insertions, a changed guard and a reworded message), so a module would need hooks in the shared engine and change the other 18 pages for one reader.

**Problem (Y):** the same 81,134 byte program is copied into 18 reader sources, and SupportScout carries a variant 246 bytes larger. A defect is fixed 19 times, and the copies can drift.

**Change:** move the engine to one file under sources/ (for example sources/engine/kd-app-1.5.5.js). Each reader source keeps only its data block and shell. The builder inlines the engine at build time, so every published page stays one self-contained file. SupportScout's migration code becomes an optional engine module used only by that reader.

**Builder work this needs:** after inlining the engine, build.py must compute the inline-script sha256 pins itself (today only builder/rename.py --repair-csp does that, and the page-quality gate fails when a pin is stale). This is new code and is part of the change.

**Not changing:** routes, aliases, storage keys, page content, the CSP model (scripts stay inline and pinned by hash), the number of apps.

**Prerequisite:** record the current built bytes and sha256 of all 19 pages (baseline).

**Acceptance:**
1. After the change the 19 built pages are byte-identical to the baseline, or each difference is listed and tested.
2. build.py, self-test (29), check_pages, check_pwa, check_contrast, check_kit, v23_check.py pass.
3. Changing one engine line changes the 18 reader pages and nothing else.
4. Pinned script hashes are computed by the builder after inlining, not by hand; a source without its engine is not expected to carry a final pin.

**Rollback:** revert the commit; sources return to inline engines.

**Risk:** builder change touches every reader. Mitigation: baseline compare before commit; do it in one commit.

**Resources (RepoRadar):** none to install. Method note only: shadcn/improve (plan strong, execute cheap).
