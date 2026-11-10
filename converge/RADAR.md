# Keeping RepoRadar current

Goal: all of Omnevum (the Omni core and its four experts, the hub, RepoRadar, the builder), this repository, every app and the vault use current, proven technology, content and practice, without losing stability, robustness, compatibility, speed, token efficiency or low cost.

## What is in scope

| Part | Home | What "current" means there |
|---|---|---|
| Omni core | `TECH/TECH-AINT-Omni-v*.md` | method, model and tool facts, limits, versioning rules match today's tools and evidence |
| Four experts (Knowledge, Local AI, Omnevum-Apps, Prompt-Kits) | `TECH/TECH-AINT-Omni-XPRT-*.md` | domain practice: learning method, local models and agents, web and PWA practice, prompt practice |
| Hub, RepoRadar, builder | this repository (`sources/method`, `builder/`) | platform features, pins, gates, size and speed budgets |
| Apps and readers | `sources/apps/` | content truth, method, accessibility, privacy, offline |
| Vault | `00-META/`, notes | structure, index, conventions |

A change to Omni or an expert is a new version with its own convergence; list it for the owner, do not edit a frozen version in place.

## Automated (weekly, read-only)

`.github/workflows/radar.yml` runs `converge/radar_refresh.py` each Monday and on demand. It needs no secret beyond the built-in token and writes only a report to the run summary. It finds:

1. New popular, recently pushed, openly licensed repositories for each query in `converge/radar-queries.json` that the ledger does not know.
2. Drift: adopted, adapted or studied entries that are now archived, renamed or stale.
3. Pinned GitHub Actions whose latest release differs from the pin.

Run it locally with `python converge/radar_refresh.py`; the report goes to `converge/receipts/radar-report.md` (git-ignored).

## Human step (the rule that keeps quality)

A report is a list of leads, never a change. The queries cover the app families and the expert domains (local models, agents, evaluation, prompt practice, knowledge management). Each lead used goes through the same path:

1. Read its README and licence. Add a ledger entry (`converge/reporadar-ledger.json`) with a disposition (reject, reference, study, adapt, adopt), the apps it applies to, a reason and its limits.
2. For adopt or adapt, write a change request that names the app, the measured gain, the test and the rollback.
3. Apply it, run `python builder/build.py` and `python builder/selftest.py` alone, and record the result.
4. Fold accepted entries into the next RepoRadar release (`sources/method`).

## Rules for adopting

- Measured gain first (bytes, time, tokens, cost, defects). No change for novelty alone.
- Keep routes, storage keys and offline behavior; no new external requests or runtime dependencies without the owner's act.
- Prefer small, auditable code and open licences. Pin versions and hashes.
- Verify against the primary source at the time; state what could not be verified.

## Per-app currency review

Each app gets a row in `converge/receipts/v24-depth.json` (CR-24-4): its goal, the ledger entries that apply, what was adopted, what was rejected and why, and the next check date. An app is reviewed again when the report names a lead for its query or when its pinned data goes stale. No app can be certified as using everything available; the review shows what was considered and why.

## Tune the queries

Edit `converge/radar-queries.json` (name, who it serves, GitHub search terms). Raise `min_stars` to cut noise; `max_calls` bounds API use.

## When the owner asks for an update

An update request means a sweep at every level, not only the named file. For the thing asked about (Omnevum, the repo, one app, a family of apps) check:

| Level | Question | How |
|---|---|---|
| Technology | Is there a newer, smaller or safer way (platform features, standards, pinned tools)? | weekly report, primary docs, browser support tables |
| Content | Are facts, rules, prices, versions and sources still true? | each source's own date and primary source, listed in the page |
| Method | Is there a more effective way to serve the purpose? | the family lens below |
| Practice | Do security, privacy, accessibility, performance and cost match current guidance? | gates, Lighthouse, WCAG, CSP, budgets |
| Fit | Does the change keep routes, saved data, offline use and the budgets? | build, self-test, size diff |

Family lens (questions to brainstorm, then test, never assume):

- Courses: do they use retrieval practice, spaced review, interleaving, worked examples, immediate feedback and mastery gates? Does the reader measure what the learner knows, not time spent? Could a pre-test shorten a path? Is each claim tied to a source?
- Guides and references: is the answer found in few taps, is the fact dated, is the source primary, does it work offline and at 375px?
- Games and recipes: are the rules or steps verified against the maker or a tested source, is the first minute clear, can it be used one-handed, with large text and without sound?
- Tools and apps: what is the worst error a user can make, can data be exported and restored, what is the smallest correct feature set, does it stay fast on a slow phone?
- Omnevum, builder and vault: fewer steps, fewer tokens, clearer failures, one source of truth per fact.

Record the outcome per lead (adopt, adapt, study, reference, reject) in the ledger with the reason. If nothing better exists, say so; that is a valid result.

## The stable edge rule

Every app aims at its own goal in `converge/app-goals.json`. Adopt a technology only when it is stable (widely supported or progressively enhanced with a safe fallback), checked in a primary source such as MDN, Baseline or the project's own docs, and measured against that goal. Anything unstable goes on a watch list and is rechecked on the next update. Each adoption is tested and reversible. See CR-24-7.

## Inherit, do not copy

Put an improvement at the highest level that can hold it, so every child gets it on the next build:

1. Rules live once: Omni, then `AGENTS.md` and `docs/FRAMEWORK.md`, then the gates that enforce them.
2. Shared behavior lives once: the style (`site/scripts/ui.css`), the study engine (CR-24-1), category templates (CR-24-3). A page carries only its data.
3. A fix that fits a gate becomes a gate check, so every page, present and future, inherits it.
4. Only a truly local fact stays in one app.

## Documentation without bloat

Change the one document that owns a fact and point to it from elsewhere. A new document needs a reader and a reason; otherwise add a line to an existing one. Dates and counts are generated or checked by a script where possible. Keep the size budgets in `site/scripts/check_docs.py`.
