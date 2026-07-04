# Public Surface Policy

This repository is the public GitHub Pages launchpad. It should route visitors to active canonical projects without exposing private planning material or retired standalone app surfaces.

## Allowed

- Primary routing to ModelTab, nFIRE, and FIFA-WC-Sim.
- Supporting routing to LocalFirstApps and its consolidated app paths.
- Public screenshots, concise portfolio copy, sponsor link, sitemap, robots file, static tests, and public-safe maintainer notes.

## Forbidden

- Standalone folders or sitemap URLs for `AI-Studio-Cleaner`, `C3Pedal`, `CommonGround`, `Flexx-Files`, `LedgerSuite`, `Noodle-Nudge`, `PMQuiz`, or `TS-Dash`.
- Private planning docs, future-project names, API keys, PII, local exports, backups, `node_modules/`, test output, or private workspace paths.
- Claims that retired standalone app repos still exist as public app surfaces.

## Verification

Before publishing changes, run:

```bash
npm test
git diff --check
```

The portfolio must keep the first public route order focused on ModelTab, nFIRE, FIFA-WC-Sim, then LocalFirstApps.
