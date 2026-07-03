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
- Sponsor CTA, screenshots, live links, repo links, metadata, sitemap, and redirects must stay accurate.
- Retired/deleted repo links should not reappear except intentional compatibility redirects.

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
npm test
git diff --check
```

After pushing, verify GitHub Pages and the live URLs for screenshots, primary cards, and compatibility redirects.

## Continuation Notes

- Do not add every repo back to the homepage.
- Keep ModelTab, nFIRE, and FIFA-WC-Sim as the main public routing targets unless the user changes strategy.
- LocalFirstApps should represent consolidated utility apps rather than old standalone repos.

