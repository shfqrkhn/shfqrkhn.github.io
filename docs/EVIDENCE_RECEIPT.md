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

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Flagship routing | `PASS` | static tests, README, sitemap | Route order must stay ModelTab, nFIRE, FIFA-WC-Sim, then LocalFirstApps. |
| Retired standalone folders absent | `PASS` | static tests and filesystem checks | Do not restore AI-Studio-Cleaner, C3Pedal, CommonGround, Flexx-Files, LedgerSuite, Noodle-Nudge, PMQuiz, or TS-Dash. |
| Public-safe portfolio content | `PASS_WITH_LIMITATIONS` | public surface policy and tests | Recheck no private planning docs, future-project names, PII, keys, exports, or backups appear. |
| Live/static behavior | `PASS_WITH_LIMITATIONS` | `npm test`, Pages/live check | GitHub API data can fail; primary static cards must still render. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count HEAD..."@{u}"`
- `npm test`
- `npm run build` when Tailwind or CSS source changes
- `git diff --check`
- protected-path and retired-folder scan
- live Pages check after runtime or public-surface changes
