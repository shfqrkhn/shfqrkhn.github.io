# Agent guide

Instructions for AI coding agents (and people) working in this repository. Read `docs/FRAMEWORK.md` for the full rules; this page is the short version.

## What this is

A static, offline-first site of small apps, built from sources by `builder/build.py` and deployed by GitHub Actions. Sources live in `sources/`, the builder in `builder/`, the published tree in `site/`. Generated files in `site/` are git-ignored: never edit them, never commit them.

## Commands (Python 3.12+, any OS; CI builds on Windows)

```bash
python builder/build.py        # validate, build site/, run every gate; must pass
python builder/selftest.py     # must pass (29 checks, includes browser tests when Playwright is installed)
python builder/publish.py "message" --yes
# --fast skips the self-test (dry run only; --yes refuses to push without it)
```

## Rules that always apply

1. **No personal information, ever.** No names of real people (owner, household, authors, designers, developers, players), no emails, phone numbers, addresses, account numbers, or private paths, in any page, document, registry entry or commit. Historical quotes and legally required copyright lines are allowed. The privacy gate runs in the build; `builder/privacy_names.txt` (local only, never committed) holds the private name list.
2. **Edit sources, not output.** Apps are `sources/apps/*.html`; page names, addresses, colours and archive state are `builder/registry.json`. Use `builder/rename.py` and `builder/archive.py` instead of editing the registry by hand.
3. **Content Security Policy.** Each app pins its inline scripts by sha256, computed after converting CRLF to LF (new apps from the starter pin their styles too). After editing inline code, repair the hashes with `python builder/rename.py --repair-csp <file>`; the page-quality gate fails otherwise. Study readers hold one marker line instead of the shared program in `sources/engine/`; the build inlines it and computes their pin.
4. **House style.** One shared design system (`site/scripts/ui.css`), mobile first, accessible, no external requests, no emoji, no em or en dashes in chrome text and documents (quotes, data and flag glyphs are exempt), plain words, icons first, high signal (each fact once, fewest words; `site/scripts/check_docs.py` enforces it for documents). Page names are `<Pun> <Subject>` with a plain tagline.
5. **Free and open source first.** Prefer open licences and open tools; name anything else.
6. **Check before you claim.** Run the build and the self-test; report what ran and what did not. Verify claims from other models by exact quote against the file.
7. **Commit with the GitHub noreply address, never a personal email.** In this clone: `git config user.name <github-user>` and `git config user.email <id>+<github-user>@users.noreply.github.com`; commit messages and history are public.
8. **History is git.** Do not rewrite `main`; branch protection, when on, blocks force-pushes. A history rewrite needs the owner and protection turned off first.

## Doing the work cheaply

Run scripts first (they are free). Use the cheapest model that is sufficient for reading and first-pass review, a stronger one for adversarial review and for applying edits. Plan with the strong model, execute with the cheap one, and have the strong one check the result. `docs/FRAMEWORK.md` has the review workflow; `converge/` has the scripts.

## Where to look

- `docs/FRAMEWORK.md`: rules, how-tos, lessons learned, change log.
- `sources/method/`: Prompt Clipboard (reusable prompts), Knowledge Distiller, Resource Catalogue (also a page in the hub, RepoRadar). Rebrand: `builder/brand.json`. Any suspicion of PII in history: delete and recreate the repository, then upload the scrubbed files as one commit.
- `README.md`: contents and repository map. `CONTRIBUTING.md`, `SECURITY.md`: change and report rules.
- `converge/RADAR.md`: how RepoRadar stays current, what an update request must sweep (technology, content, method, practice), and inherit-not-copy.
- `.github/workflows/`: what CI does.
