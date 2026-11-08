# Contributing

Omnevum is a personal project and a working framework. Fixes and ideas are welcome through issues and pull requests.

1. Read `docs/FRAMEWORK.md` (rules and how-tos) and `AGENTS.md` (the short version).
2. Edit the sources (`sources/apps`, `builder/registry.json`, `docs`), never the generated files in `site/`.
3. Run `python builder/build.py` and `python builder/selftest.py`; both must pass.
4. No personal information in any file or commit, and commit with a GitHub noreply address. See `docs/PRIVACY.md`.
5. Open a pull request against `main`. CI builds and tests it; merging deploys the site.

Security or privacy problems: see `SECURITY.md`, and do not open a public issue.
