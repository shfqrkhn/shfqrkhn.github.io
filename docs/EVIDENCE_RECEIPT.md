# Evidence Receipt

This public-safe receipt keeps portfolio claims tied to evidence instead of chat history.

## Evidence Classes

- `PASS`: directly covered by current files, tests, or checks.
- `PASS_WITH_LIMITATIONS`: true only within the stated scope.
- `NOT_RUN`: not checked in the current pass.
- `BLOCKED`: cannot be checked until an external condition changes.
- `NO_GO`: failed or unsafe; do not publish until fixed.

## Claim Firewall Invariant

- Every public technical, security, privacy, routing, download, project-status, sitemap, live, or portfolio claim must map to a `Claim Boundaries` row or be added with evidence before publication.
- Public claims may not exceed `PASS` or `PASS_WITH_LIMITATIONS`; `NOT_RUN`, `BLOCKED`, and `NO_GO` items must stay unpublished or be labeled as unavailable.
- Volatile routing, GitHub API, Pages, sitemap, project-status, and GitHub settings must be rechecked from current repo state before reliance.

## Currentness Watchdog

- Recheck claim evidence before public-facing changes, not on a fixed calendar.
- If current evidence is stale, missing, inaccessible, or contradicted by portfolio/repo/GitHub state, downgrade the affected claim to `NOT_RUN`, `BLOCKED`, or `NO_GO`.
- Do not preserve old status snapshots as proof after routing, screenshots, sitemap entries, retired-project handling, workflows, or public portfolio wording changes.

## Safe-To-Publish Receipt

- Mark this repo safe to publish only when the current pass proves a clean synced tree, no GitHub Releases, no protected tracked paths, no open secret/dependabot/code-scanning alerts or a documented code-scanning not-applicable/no-analysis state, passing required gates, and working live or repository-ZIP distribution surface.
- Runtime portfolio code scanning uses `.github/workflows/codeql.yml` with CodeQL JavaScript analysis; missing or failed analysis must be reported as `PASS_WITH_LIMITATIONS`, `NOT_RUN`, or `NO_GO`.
- If any proof is missing, stale, or contradicted by GitHub/repo/portfolio state, record the repo as `PASS_WITH_LIMITATIONS`, `NOT_RUN`, `BLOCKED`, or `NO_GO` instead of safe.
- The final status table must name remaining risks rather than implying safety from silence.

## Legacy Pages API Residue Evidence

- This portfolio uses branch-based GitHub Pages from `main` rather than an explicit deploy workflow.
- The Pages API `.status` field can temporarily report `building` or `errored` even when current-head static/CodeQL checks are green and `https://shfqrkhn.github.io/` returns HTTP 200.
- Treat that as API residue with `PASS_WITH_LIMITATIONS` when the latest pushed change is docs/tests or other non-runtime evidence, the live URL is healthy, and the legacy Pages log shows build/upload succeeded before a GitHub-side deploy failure such as `Deployment failed, try again later.`
- Source-controlled runtime routes/screenshots/sitemap must still be covered by static tests before calling the residue no app risk.
- Treat it as a real blocker only when runtime payload files changed and the live URL, legacy Pages build, or source-controlled public-surface checks fail.

## Input Accessibility Evidence

- Critical portfolio navigation must remain usable by keyboard-only, mouse/pointer-only, and touch-only users.
- Accessibility claims require current evidence from static labels/ARIA checks, responsive review, live checks, and tap-target/no-overflow checks where applicable.
- If a route or card lacks direct input-mode coverage, label it `PASS_WITH_LIMITATIONS` or `NOT_RUN`; do not claim full accessibility from link presence alone.

## GitHub API Metadata Evidence

- GitHub API and localStorage cache data may enrich supporting repo cards only; it is not proof that a project is flagship, current, active, retired, safe to publish, or privately approved.
- Primary routing, retired-folder absence, sitemap entries, and public-safe project claims must remain source-controlled in this repo and verified by static tests before publication.
- If GitHub API data is stale, rate-limited, unavailable, or contradicted by source-controlled policy, the portfolio must degrade to the static primary cards and downgrade dynamic metadata claims to `PASS_WITH_LIMITATIONS` or `NOT_RUN`.

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Flagship routing | `PASS` | static tests, README, sitemap | Route order must stay ModelTab, nFIRE, FIFA-WC-Sim, then LocalFirstApps. |
| Retired standalone folders absent | `PASS` | static tests, filesystem checks, `git archive` | Do not restore AI-Studio-Cleaner, C3Pedal, CommonGround, Flexx-Files, LedgerSuite, Noodle-Nudge, PMQuiz, or TS-Dash. |
| Public-safe portfolio content | `PASS_WITH_LIMITATIONS` | public surface policy and tests | Recheck no private planning docs, future-project names, PII, keys, exports, or backups appear. |
| Live/static behavior | `PASS_WITH_LIMITATIONS` | `npm test`, Pages/live check, GitHub API metadata evidence | GitHub API data can fail; primary static cards must still render and remain authoritative. |
| Legacy Pages API summary | `PASS_WITH_LIMITATIONS` | current-head static/CodeQL checks, live HTTP 200, static runtime-route checks, legacy Pages build/deploy log | Branch-based Pages `.status` can lag or report deploy residue after docs/test-only pushes; report residue separately. |
| Input accessibility | `PASS_WITH_LIMITATIONS` | static labels/ARIA checks, responsive review, live check | Does not certify screen-reader behavior or every assistive technology/browser pairing. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count 'HEAD...@{u}'`
- `gh release list --limit 5` returns no releases
- `npm run qa`
- `git diff --check`
- protected-path and retired-folder scan
- live Pages check after runtime or public-surface changes
