# Shafiqur Khan Portfolio

<p><a href="https://github.com/sponsors/shfqrkhn?o=esb"><strong>Sponsor this project</strong></a></p>

Curated GitHub Pages launchpad for a focused public project portfolio.

- **Status:** Active portfolio hub
- **Live Demo:** [shfqrkhn.github.io](https://shfqrkhn.github.io/)
- **Portfolio Role:** Discovery surface for the flagship projects.

This site presents the public GitHub portfolio with a clear hierarchy: active flagships first, stable companion utilities second, and maintenance apps last.

## Screenshot

![Portfolio project grid](./screenshot.png)

## Why This Exists

A portfolio should reduce noise, not amplify repo sprawl. This site keeps the most valuable projects visible while still allowing visitors to discover stable utilities and older apps.

## Featured Project Strategy

Active flagships:

- `ModelTab`: BYOK AI chat PWA.
- `FIFA-WC-Sim`: sports analytics and simulation.
- `nFIRE`: financial independence and solvency planning.
- `LedgerSuite`: managerial judgment and operational analysis.

Stable companions:

- `CommonGround`
- `TS-Dash`

Maintenance apps:

- `PMQuiz`
- `Noodle-Nudge`
- `Flexx-Files`

## What It Does

- Fetches public GitHub profile and repository data.
- Filters out forks and consolidated redirect repos.
- Renders project cards with description, language, stars, and update date.
- Prioritizes curated flagships ahead of general sorting.
- Caches GitHub API responses locally to reduce rate-limit pressure.

## Quick Start

1. Open the live portfolio.
2. Start with the featured projects.
3. Use stable companions and maintenance apps when relevant.
4. Visit individual repositories for live demos and details.

## Privacy And Data Model

- Uses public GitHub API data only.
- Caches fetched public data in localStorage.
- No backend or analytics service is required.

## Relationship To Other Projects

This repo is the front door. It should not compete with the product repos; it should route attention to the strongest projects.

## Repository Layout

```text
.
├── index.html
├── script.js
├── styles.css
├── src/
└── package.json
```

## Deployment

This is the account-level GitHub Pages site served from the repository root.

## Maintenance

Keep project ranking intentional. Do not showcase every repo equally when the goal is focus, adoption, and clear user pathways.

## License

See `LICENSE`.
