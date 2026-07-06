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

- After setup, critical portfolio navigation must remain fully usable with one available input mode: keyboard only, mouse/pointer only, touch only, or platform-limited input only.
- No critical workflow may require a combined keyboard-plus-pointer, keyboard-plus-touch, hover-plus-keyboard, drag-plus-keyboard, or browser-popup path.
- Accessibility claims require current evidence from static labels/ARIA checks, responsive review, live checks, platform text-entry support, and tap-target/no-overflow checks where applicable.
- If keyboard-only, mouse-only, touch-only, or platform-limited operation is not directly covered for a route or card, label it `PASS_WITH_LIMITATIONS` or `NOT_RUN`; do not claim full accessibility from link presence alone.

## Design Language Evidence

- UI changes must preserve a modern minimalist, utilitarian, professional, joyful, responsive, portfolio-contextual design language with local CSS/Tailwind tokens, semantic native controls, visible focus, reduced-motion-safe transitions, no horizontal overflow, and no component overlap.
- MIT UI libraries/resources such as Uiverse, Open Props, Primer, Radix Colors, Pico CSS, Heroicons, Bootstrap Icons, Floating UI, or A11y Dialog are inspiration sources only unless a source-backed, license-checked, tested need justifies a dependency.
- Reject browser JS popups, blocking overlays, arbitrary component copy-paste, mixed visual systems, unbounded animation, external CDNs, or styling that distracts from flagship routing.

## GitHub API Metadata Evidence

- GitHub API and localStorage cache data may enrich supporting repo cards only; it is not proof that a project is flagship, current, active, retired, safe to publish, or privately approved.
- Primary routing, retired-folder absence, sitemap entries, and public-safe project claims must remain source-controlled in this repo and verified by static tests before publication.
- If GitHub API data is stale, rate-limited, unavailable, or contradicted by source-controlled policy, the portfolio must degrade to the static primary cards and downgrade dynamic metadata claims to `PASS_WITH_LIMITATIONS` or `NOT_RUN`.

## Mission-Critical Reliability Evidence

- Critical portfolio navigation, static routing, fallback metadata, sitemap, and public app-link flows must stay self-checking, crash-recoverable, state-explicit, modular, maintainable, simple, one-input accessible, and TDD/SDD-backed.
- Runtime failures must fail closed to source-controlled static cards, visible status, no browser popup APIs, no hidden upload, and no unsupported retired-project routing.
- New complexity is acceptable only when it directly improves resilience, usability, routing clarity, public safety, or maintainability and is covered by current tests or explicit evidence.
- Autonomous AI-assisted development must start from current files, add or update tests before broad routing/UI changes, keep claims inside evidence boundaries, and leave a reproducible recovery path.

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Flagship routing | `PASS` | static tests, README, sitemap | Route order must stay ModelTab, nFIRE, FIFA-WC-Sim, then LocalFirstApps. |
| Retired standalone folders absent | `PASS` | static tests, filesystem checks, `git archive` | Do not restore AI-Studio-Cleaner, C3Pedal, CommonGround, Flexx-Files, LedgerSuite, Noodle-Nudge, PMQuiz, or TS-Dash. |
| Public-safe portfolio content | `PASS_WITH_LIMITATIONS` | public surface policy and tests | Recheck no private planning docs, future-project names, PII, keys, exports, or backups appear. |
| Live/static behavior | `PASS_WITH_LIMITATIONS` | `npm test`, Pages/live check, GitHub API metadata evidence | GitHub API data can fail; primary static cards must still render and remain authoritative. |
| Legacy Pages API summary | `PASS_WITH_LIMITATIONS` | current-head static/CodeQL checks, live HTTP 200, static runtime-route checks, legacy Pages build/deploy log | Branch-based Pages `.status` can lag or report deploy residue after docs/test-only pushes; report residue separately. |
| Input accessibility | `PASS_WITH_LIMITATIONS` | static labels/ARIA checks, responsive review, live check | Does not certify screen-reader behavior or every assistive technology/browser pairing. |
| Single input operation | `PASS_WITH_LIMITATIONS` | input accessibility evidence, static labels/ARIA checks, no browser popup policy | Does not certify every OS assistive technology or unusual HID/browser pairing. |
| Design language/UI safety | `PASS_WITH_LIMITATIONS` | handoff/evidence docs, static tests, Tailwind build, live/visual checks where run | Does not certify every viewport or assistive technology; portfolio surfaces may be more visual than utility apps. |
| Mission-critical reliability | `PASS_WITH_LIMITATIONS` | mission-critical reliability evidence, build/static/live checks | Does not certify linked app runtime behavior; app repos own their own recovery evidence. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count 'HEAD...@{u}'`
- `gh release list --limit 5` returns no releases
- `npm run qa`
- `git diff --check`
- protected-path and retired-folder scan
- live Pages check after runtime or public-surface changes
