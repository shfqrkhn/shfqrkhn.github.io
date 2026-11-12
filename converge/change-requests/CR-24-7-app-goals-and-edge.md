# CR-24-7: App goals and the stable edge

Why: each app must use the best stable technology to meet and exceed its own goal. That needs the goal written down first.

**Status:** goals done; all 42 pages have a depth record (local receipt); 14 pages have recorded adoptions in the depth receipt (stable features such as persist, audio unlock, accent search, locale sort, PBKDF2 600000, status roles). The other candidates are deferred in the record. The 8 archived apps were assessed under CR-24-5 and then unarchived by owner instruction (2026-11-11, recorded in CR-24-4); the registry has 0 archived.

## Part 1: goals (done, review only)
`converge/app-goals.json` holds one row per registry page (42): goal, success measure, stable-edge checks. Goals are inferred from the registry tagline and blurb and are marked "inferred, owner to confirm". A check in `converge/v23_check.py` fails if any registry id lacks a row.

## Part 2: research, then build, one app at a time
For each app, in this order (pilot: the recipe app, `apex-egg-salad`):
1. Read the goal row. List what a polished, helpful version of this app does (tools, platform features, method, content quality). Use primary sources: MDN and Baseline for platform features, the app's own domain sources for content, RepoRadar and `converge/RADAR.md` for projects.
2. Apply the stable edge rule: adopt only what is widely supported (Baseline) or progressively enhanced with a safe fallback. Unstable ideas go on a watch list in the receipt, not into the app.
3. Pick changes that serve the success measure. Implement in the shared layer when more than one app benefits (style, study engine, templates), else locally. No new network requests, no new dependencies, no personal data.
4. Prove it: build, self-test, gates, a 375px check, and the success measure where it can be measured. Make it reversible (one commit per app).
5. Record in `converge/receipts/v24-depth.json`: ideas considered, adopted, rejected with reason, watch list, evidence.

## Limits
No deploy and no GitHub edits on this request's authority; the owner publishes. Archived pages are treated like active ones (owner direction, 2026-11-10): assess each under CR-24-5, then unarchive the ones worth keeping with `python builder/archive.py`, merge or leave the rest archived, and record the reason. Unarchive one app per commit and the archived count checked in `converge/v23_check.py` (CR-2) is now 0 (done). A recipe or guide fact changes only with a primary source.
