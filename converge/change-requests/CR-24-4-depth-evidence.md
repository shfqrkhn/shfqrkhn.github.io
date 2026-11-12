# CR-24-4: raise the 33 shallow app reviews to evidence

**Status:** partly done: every page has a depth record (considered, adopted, deferred, rejected, watch) in the local receipt v24-depth.json; per-app review of the 33 shallow items is not done.

**Problem (Y):** the 33 per-app reviews numbered A08 to A40 in the predecessor brief (not kept in this repository) have a product contract and a checklist but no executed fixtures, so their safety is unproven.

**Change:** run by consequence, in batches, with fresh read-only subagents and recorded results (PASS, FAIL, NOT_RUN, BLOCKED) at one commit:
1. Shared engine once (after CR-24-1): chapter and question counts, answer keys present, scoring, hostile text escaped, storage denied, export and import.
2. Money and secrets: PennyPlanner, NestEggNinja, PromptPlayground, WorldCupWizard (numbers, keys, network).
3. Parsers: TranscriptTidy, StepSleuth.
4. Dates and rules: SproutScheduler, AuctionAcademy.
5. Remaining guides and games: rights, model or patch specificity, accessibility.

**Not in scope:** checking that lesson content is true against primary sources (needs a domain reviewer; listed as an owner item).

**Acceptance:** one row per app in converge/receipts/v24-depth.json (a separate file, so v23_check.py never overwrites it) with outcome and the fixture used; any FAIL is reproduced before a fix.

**Rollback:** receipts are git-ignored; fixes are separate commits.

**Risk:** time. Mitigation: ordering by consequence; stop at the first FAIL batch and fix.

## Fix record

- 2026-11-11, shared study engine (18 reader apps): a wrong estimate no longer marks the activity done; the estimate tolerance allows float error (0.635 vs 0.625 at 0.01); a scenario end node that has a lesson but no text now renders (it was dropped, so ScopeScribe lost 2 activities and DrumDeck 2). Found by the deep reviews, confirmed by quoting the engine, re-checked in the browser (ScopeScribe shows 7 of 7 activities; ConfigCompass estimate 1007 not done, 7 done). SupportScout keeps its own fork and is not covered.
- 2026-11-11, TranscriptTidy: non-text chunk text is no longer written as "[object Object]"; a blocked clipboard now says so and does not show "Copied". Browser-checked with a hostile export and a blocked clipboard.
- SproutScheduler: the place and zone messages now say "Not saved" when the browser blocks storage (put() helper) instead of always "Saved"; a restore file with a leading BOM is accepted.
- DebtDial: the WACC equity-weight slider now stops at 100 percent (it ran to 130, which gave a negative debt weight).
- BoonBuilder: the tick status says "Not saved" when the browser blocks storage (lsSet now reports success). The MeepleMentor "false saved" claim did not reproduce from the code (no saved message on a failed write), so no change. TrendTracker (minified bundle) is deferred.

- Unarchived by owner instruction (2026-11-11): all eight archived pages (StepSleuth, PromptPlayground, WorldCupWizard, NestEggNinja, PennyPlanner, TickleTodo, DecisionDesk, MeetingMediator) are back in the main hub so every app gets equal consideration for consolidation and enhancement. Registry and FRAMEWORK table updated by archive.py; the Archive section is empty.

## Open claims (2026-11-11, unverified reviewer reports; verify by quote or reproduction before any fix)

- BuildBoss: Final Build total equals the default total; negative or oversize quantity and TDP accepted.
- TrendTracker: Infinity accepted (deferred, minified source).
- DecisionDesk: stuck on Loading when IndexedDB is blocked.
- HandheldHunter: false "saved"; fuzzy "hlaf" gives 0 results with a contradictory note; persistShortlist swallows errors.
- MeepleMentor: search not trimmed.
- NestEggNinja: saved lab never restored (load runs before `var RULES`); `|| 0.02` turns inflation 0 into 2%; import gaps.
- PennyPlanner: CSV skipped-row wording. PromptPlayground: `$&` fill corruption. WorldCupWizard: clampNumber. StepSleuth: distance step 0.1 rejects 5.25.
- NoodleNudge: txt export trailing dashes and "Result: false". TickleTodo: duplicate repeat copy. MeetingMediator: Gemini key in URL query.
- EggspressEats: no food-safety numbers. StreamScholar: "Modern Business Strategy" links to a search. AuctionAcademy: blurb and sessionStorage guard. MoralMap: board-diversity wording.
- SupportScout: fork migration. TranscriptTidy: non-text chunks dropped, unterminated fence, BOM. SproutScheduler: tender-crop frost margin, bad saved bed dropped silently, zone/city mismatch.
- Also: deep-review the 8 restored apps; CR-24-7 deferred items; PromptPantry rows in app-goals.json and v24-depth.json (done).
- Consolidation candidates: BalanceBuddy + CashCrunch merge; MeepleMentor retire or cut; HandheldHunter vs AllyAce; GearGuardian vs SetupSherpa.

## Fix record (2026-11-11, verified by quote, applied in one batch)
- BuildBoss: quantity clamped to the input max and floor 0; CPU/GPU TDP clamped 0 to 1000. The "Final total equals default" claim was NOT REPRODUCED (defaults equal the MVP build).
- DecisionDesk: startup-failure log is wrapped so the catch reaches the announce call when IndexedDB is blocked.
- HandheldHunter: persistShortlist reports failure and the save status says so; fuzzy note no longer claims matches exist. The false "saved" claim was NOT REPRODUCED. Edit limit for 4-letter words left as is (more false matches).
- MeepleMentor: search is trimmed. NestEggNinja: saved lab load moved after RULES (it threw and was swallowed); inflation 0 kept (null check). Import claim NOT REPRODUCED (validator is thorough).
- StepSleuth: distance step "any". PennyPlanner: skipped-rows wording. PromptPlayground: function replacement so "$&" and "$$" stay literal. WorldCupWizard: duplicate clampNumber removed, one safe definition (empty goes to fallback).
- MeetingMediator: Gemini key moved from URL to the x-goog-api-key header (2 calls). EggspressEats: egg salad keeps 3 to 5 days at 40 F or below (USDA FSIS figure, owner may re-verify). TranscriptTidy: unterminated code fence closed on export. SproutScheduler: ignored bad saved bed now says so. TrendTracker: CSV import rejects Infinity.
- NOT REPRODUCED, no change: NoodleNudge export, TickleTodo repeat text, TranscriptTidy BOM, AuctionAcademy blurb and sessionStorage, MoralMap wording, SupportScout migration, SproutScheduler zone/city. Left for owner: StreamScholar "Modern Business Strategy" link (channel handle unverified); SproutScheduler bean/cucumber frost margin (+10 days, data choice).
- Consolidation: BalanceBuddy + CashCrunch = KEEP BOTH and cross-link (CashCrunch has 12 calculators that BalanceBuddy lacks; BalanceBuddy has 11 more chapters). No archive.
- Consolidation: MeepleMentor = KEEP (no overlapping pair). HandheldHunter + AllyAce = KEEP BOTH and cross-link (different jobs: game shortlist versus device setup). GearGuardian + SetupSherpa = KEEP BOTH (SetupSherpa ROG Ally content may link to AllyAce later). No archive, registry or redirect change. Full self-test on 4385790: 29 passed, 0 failed.

## Deep review of the 8 restored apps (2026-11-11, read-only reviewers, verified by quote, fixed in one batch)
- Fixed: WorldCupWizard run count rounded, export file renamed and revoke delayed, save-state message no longer claims settings are saved. DecisionDesk failed import aborts its transaction, blob URLs revoked after a delay, backup file names use the app name, rating hint says 0 to 10. StepSleuth slip distance localised, Print help says it opens the print dialog, rail cannot skip time validation. TickleTodo ids escaped in selectors, non-ASCII tags, repeat copy no longer inherits focus time. PennyPlanner short CSV rows no longer add the word "undefined". PromptPlayground only real fetch failures are called network or CORS. MeetingMediator Enter during IME composition does not send.
- Deferred with reason (larger or data decisions, each reported by one reviewer and not reproduced in a browser): MeetingMediator focus trap, retired model ids, empty or blocked reply handling, request timeouts, stale-reply races; PromptPlayground streaming re-render, partial reply loss, vault merge, markdown inside code spans, variable re-substitution; WorldCupWizard chaos setting, weather success flag, fair-play overrides; NestEggNinja coast year, fire number, pension 0 defaults, tax credits, OAS base, CPP start age; PennyPlanner dedupe after edit, monthly day drift, scenario year offset, day-first dates, CAD labels, CSV BOM; TickleTodo storage warning overwritten, reopen spawns copies, month-end drift, midnight refresh, unreadable data overwrite; DecisionDesk erase atomicity, OPFS copies, silent invalid ratings, empty-case view, whitespace titles, sensitivity above 100; StepSleuth heading and title, French Look label, Minutes hint.
- Browser check: all 8 built pages load at 375 and 1440 with no console errors and no horizontal overflow.

## Phase A pass 1 (frozen 379e294), fixed and decided (2026-11-11)

- Fixed: RepoRadar header overflowed 16 px at 375 px (`.topmeta`); the 420 px rule now wraps it (CSS only, data and checksum-pinned records untouched; RADAR counts RepoRadar with the hub, not as a method document). Browser: no overflow at 375, 768, 1024, 1440; 0 console errors.
- Fixed: stale records (app-goals.json archived flags, v23_check.py CR-2 counts 42 and 0, CR-24-7 and CR-24-4 text, CHANGE-REQUEST-v23 row CR-2).
- Documented in SECURITY.md: PromptPlayground wildcard Azure and any-port local hosts (needed for user-typed provider addresses); FlexxFiles same-origin update check.
- Decided, no change: no sitemap or canonical links (the docs never promise them; llms.txt is the index; adding files is a deploy-surface change for the owner).

## Phase A pass 2 (frozen 2d605e7), decided (2026-11-11)

- Fixed: RepoRadar detail view had a "Check GitHub metadata now" button whose request the page CSP always blocks (no connect-src), an undocumented dead remote call. Removed the button and its handler; the page stays fully offline. Browser: detail view renders at 375 px, no overflow, 0 console errors.
- Rejected, not a defect: execution lens reported NoodleNudge's Look select inert. Reproduced only in a browser context with blocked storage; in a fresh context NoodleNudge and TickleTodo switch to paper, charcoal and black correctly.
- Routes and coverage lenses: clean.

## Phase A pass 3 (frozen e700c04), decided (2026-11-11)

Routes, adversarial: clean. Coverage found six record defects; fixed in docs: RADAR.md depth-row description and CR list, CR-24-1 byte gap, v24 brief baseline labelled as baseline. Stale v23-execution.json is refreshed by `v23_check.py --save` at the final commit. BlueprintBuddy: the file name carries the study runtime (1.5.5) and the page states its file release as 1.0.0-rc.2 by design; no change.

Pass 3 execution lens (2026-11-11/12): BuildBoss ignored the Look system (its own colour tokens were fixed); fixed in the source (tokens now follow the kit tokens, dark-look accents, always-dark tool card text), verified in 3 looks at 375/768/1024/1440 with no contrast failures or console errors. Decided, no change: per-app paper backgrounds differ by design (CR-26-2 per-app looks); 404.html is a redirect shim whose only visible content is the brand mark linking home, kept minimal on purpose.

## Phase A pass 4 (frozen 341e119 was its fix commit), decided

Pass 4 found stale counts in three records (this file: 14 readers became 18; CR-24-5 risk line; CR-24-7: 14 pages have recorded adoptions); fixed in 341e119. The lens detail was not kept beyond that.

## Phase A pass 5 (frozen 341e119), decided

Coverage found four record defects (FRAMEWORK missing sources/engine and a wrong "no version" note; CR-26-2 stale status; CR-24-1 inline script 81,382; a stale local learning receipt); all fixed in 5ea8ddf. Adversarial found one real defect: WorldCupWizard wrote an imported match number into innerHTML without escaping (HTML and link injection only; the CSP blocks script and exfiltration). Fixed with esc(m.no), checked in the browser at 375 and 1440 (escaped output, no console errors, no overflow). Service-worker message handler and unbounded navigation cache were noted as hardening only, no change.

## Phase A pass 6 (frozen 81e0d1f), decided

Execution and adversarial were clean. Coverage: the CR-24-5 risk line now gives no measured byte figure (the FRAMEWORK margin changes with every edit; measure with wc -c), and the local v23 receipt was refreshed. Routes: the seven group pages (apps, tools, games, guides, recipes, references, courses) are not linked from the hub. Decided no change: the hub groups pages by topic with no group navigation (owner decision, FRAMEWORK topic note); group pages are generated, precached entry points reached by URL. Optional hardening noted, not done: a referrer meta on five app pages (links already use noreferrer).

## Phase A pass 7 and 8 (frozen 4bf5731, 562cf34), decided

Pass 7: three lenses clean; coverage found the engine byte rows in the v24 brief unlabelled (now marked as the start-of-v24 baseline) and the local v23 receipt tied to an old HEAD (refreshed only at the final commit, by design). Pass 8: routes and coverage clean. Execution found two h1 elements on NoodleNudge Journal (a hidden static h1 plus the rendered date or title): the rendered ones are now h2, same classes. Adversarial found two low defects by reproduction: NestEggNinja Lab accepted a prototype name such as constructor as the withdrawal rule (now an own-property check), and WorldCupWizard failed when the stored weather cache was JSON null (now falls back to an empty object). All three checked in the browser at 375 (one h1, no console errors, rule falls back to plan). Service-worker ignoreSearch returning the oldest query copy is noted with the accepted nav-cache item; no change.

## Phase A pass 9 (frozen 8597fd0), decided

Routes clean. Coverage: four record defects fixed (no pass 4 section added; CR-24-1 SupportScout difference worded as about a dozen places; CR-24-6 "18 engine readers"; local receipt wording). Execution: PennyPlanner and MeepleMentor each had two h1 (a hidden static one plus the rendered view title); the static one is now a hidden paragraph, so each page has one h1. Decided, no change: icon buttons named by visually hidden text (StepSleuth Help, PennyPlanner bottom nav) are valid accessible names; the Radix closed-popover aria-controls is library behaviour.
Adversarial (pass 9): TickleTodo accepted a stored sort order such as `constructor` because the label table was a plain object; it now checks own properties (reproduced before, fixed and checked after). WorldCupWizard's two venue checks got the same own-property test. Not tested in pass 9: empty-store IndexedDB apps (MeetingMediator, NestEggNinja, TrendTracker) and some bespoke lookups; pass 10 samples them.

## Phase A pass 10 (frozen 369cb89), decided

Routes and execution (300 runs at 768 and 1024, three looks) clean. Coverage: CR-24-3 gave a false reason for not adopting step 3 (it said recipes, guides and games build from data files; they are hand-built single files); reworded to the real reason (the duplicate scan found only the study engine). Adversarial: MeetingMediator threw and went blank when a stored matter had a null, array, object or number `title` or a null `type`, `phase` or `currentPhase` (reproduced); the escape helper and three `.replace` calls now coerce first, and the same edits reproduce clean. Not exercised in pass 10: NestEggNinja IndexedDB mutation, PennyPlanner CSV import, TrendTracker CSV import, MeetingMediator backup import (pass 11 covers them). Tap targets under 24 px in two main-content link lists (BuildBoss sources, RepoRadar project names) are noted, not changed.

## Phase A pass 11 (frozen 476f01d), decided

Routes and execution (keyboard, reduced motion, forced colors, look persistence, offline) clean. Coverage: CR-26-1 row 2 gave a false reason (the SupportScout flag is set when the old record cleans to a valid record, even with no progress); reworded, cost is a harmless note. Adversarial: WorldCupWizard threw on a saved `sources` list holding a null element, and on a venue `heat`, `humidity` or `altitudeM` of the wrong type (both reproduced); the structural check now rejects both and the venue maths coerces, and the same seeds reproduce clean. The NestEggNinja and PennyPlanner stored-data fuzz did not finish in pass 11 (one tool call hung); pass 12 runs it in small calls.

## Phase A pass 12 (frozen d0d7e40), decided

Routes clean. Coverage: the v24 brief counted the ten RepoRadar repos as 7 applied, 2 deferred, 1 noted, while the ledger gives 6, 3 and 1 (awesome-design-md noted, ai-iso-skill deferred); the brief and the v23 table now match the ledger. CR-24-7 said one app was unarchived per commit, but all eight went in one commit (8d2bb0a); reworded. Execution: at 200% zoom the FlexxFiles sticky header took about half the viewport and covered focused controls (reproduced in 12 of 40 tab stops); it is now sticky only when the viewport is at least 560 px tall. Adversarial: the MeetingMediator backup import threw a raw "Cannot read properties of null" message when an array held a null; the validator now reports "must hold only records" and skips such elements. PennyPlanner showed uncaught errors when IndexedDB records were hand-edited to the wrong type (account type, name and currency; transaction date, description, amount and tags; category name). Accepted, not changed: the app writes only valid types itself, the records can only be altered outside the app, the 2 MB compiled bundle has no source to patch safely, and the app falls back to its error state rather than going blank. NestEggNinja (261 cases) had the same kind of failure for a stored `age`, `target_retirement_age` or `pension.startAge` of `[]` or `{}` and an `age` of 1e308; accepted for the same reasons. The PennyPlanner CSV import and the remaining import and lazy-path scopes did not finish in pass 12; they run in pass 13 in smaller agents.
