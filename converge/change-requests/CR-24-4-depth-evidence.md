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

- 2026-11-11, shared study engine (14 reader apps): a wrong estimate no longer marks the activity done; the estimate tolerance allows float error (0.635 vs 0.625 at 0.01); a scenario end node that has a lesson but no text now renders (it was dropped, so ScopeScribe lost 2 activities and DrumDeck 2). Found by the deep reviews, confirmed by quoting the engine, re-checked in the browser (ScopeScribe shows 7 of 7 activities; ConfigCompass estimate 1007 not done, 7 done). SupportScout keeps its own fork and is not covered.
- 2026-11-11, TranscriptTidy: non-text chunk text is no longer written as "[object Object]"; a blocked clipboard now says so and does not show "Copied". Browser-checked with a hostile export and a blocked clipboard.
