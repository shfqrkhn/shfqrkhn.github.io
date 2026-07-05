# AI Maintainer Handoff

Last updated: 2026-07-03.
Repo: `D:\VSCode\GH\shfqrkhn.github.io`.

Treat this as a public-safe continuation map. Re-read current files before editing.

## Mission

Maintain the public portfolio as a focused discovery surface. It should route attention to the highest-value active projects instead of showcasing every repo equally.

## Product Contract

- Static GitHub Pages site from the repository root.
- Primary cards are curated and visible without GitHub API data.
- Supporting cards use public GitHub API data and local cache.
- Sponsor CTA, screenshots, live links, repo links, metadata, and sitemap must stay accurate.
- Retired/deleted standalone app links and redirect folders should not reappear.
- Private planning drafts and future-project names should not appear on the public portfolio until the user explicitly approves launch positioning.

## OmniOS Transfer Contract

- Product truth: focused public portfolio hub, not a full archive or private roadmap surface.
- Execution truth: preserve route order, retired-folder absence, sitemap, screenshot, static-build, and public-surface gates before publishing.
- Evidence truth: use `docs/EVIDENCE_RECEIPT.md`, `docs/PUBLIC_SURFACE_POLICY.md`, static tests, and live checks; public claims must stay within `PASS` or `PASS_WITH_LIMITATIONS`.
- Operations truth: live Pages or current main repository ZIP are the only distribution paths; GitHub Releases stay absent.
- Transfer truth: update this handoff and the evidence receipt when routing, screenshots, sitemap entries, retired-project handling, or public-surface guarantees change.

## Doctrine Delta Decision

- After incidents, rescue runs, maturity passes, or repeated failures, classify reusable lessons as `promote`, `reject`, `quarantine`, or `keep_local`.
- Promote only source-backed, reusable, non-secret lessons that strengthen a gate, checklist, source rule, or failure guard without weakening portfolio focus.
- Keep private, project-specific, speculative, or unverified lessons out of public repos unless the user explicitly approves publication.

## Current Portfolio Strategy

Primary projects:

- `ModelTab`
- `nFIRE`
- `FIFA-WC-Sim`

Supporting project:

- `LocalFirstApps`

## Key Files

- `README.md`: public repo overview.
- `index.html`: static page and primary cards.
- `script.js`: GitHub API fetch, filters, cache, supporting card rendering.
- `styles.css`: static Tailwind build.
- `media/`: primary project screenshots.
- `tests/portfolio-static-regression.mjs`: static portfolio guardrails.
- `sitemap.xml`, `robots.txt`, `.nojekyll`: Pages support files.

## Required Checks

```bash
npm run qa
git diff --check
```

After pushing, verify GitHub Pages and the live URLs for screenshots, primary cards, and routed app links.

If the legacy Pages API reports `building` after a docs/test-only push, compare current-head Static Check/CodeQL, live HTTP 200, and source-controlled route/sitemap tests before editing source; treat a contradictory API summary as stale residue with limitations.

## Continuation Notes

- Do not add every repo back to the homepage.
- Keep ModelTab, nFIRE, and FIFA-WC-Sim as the main public routing targets unless the user changes strategy.
- LocalFirstApps should represent consolidated utility apps rather than old standalone repos.
