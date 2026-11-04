# Omnevum

**Say it:** om-nee-VEE-um, like *continuum*. **Home:** https://shfqrkhn.github.io (GitHub Pages). **Source of truth for this note:** this file. The build copies it to `site/docs/FRAMEWORK.md` and rewrites the two generated blocks below (inventory and build record) on every build. Never edit those blocks by hand.

**Standalone:** paste this note whole into an AI with a request such as "make a guide for X" or "build a tool that does Y". Everything needed is here.

## 1. What Omnevum is

One hub and one framework for everything the owner makes: apps, tools, games, guides, recipes, courses, references, and anything in between. One address, one look, one set of rules, one build, one check. Pages are static files; the hub lists them, caches them for offline use, and links home from every page.

The owner develops continuously, so the framework is built to be changed: add a page, move a page, retire a page, add a kind, add a delivery form. Each is one small, safe, checked step.

## 2. Principles, and what makes each one real

A quality word is only worth writing if something enforces it. This table is the contract.

| Principle | Mechanism (all automatic unless marked) |
| --- | --- |
| Modular | One folder per page: `<kind>/<slug>/`. One registry entry per hand-built page. One data file per generated page. Delivery forms are rows in one table. |
| DRY, one source of truth | One design system file (`site/scripts/ui.css`) inlined into every page. One registry. One catalog in the hub. This note is copied to `site/docs/`, never retyped. |
| Idempotent, deterministic | The site files hold no timestamps and no random values (only this note records its last-changed date). The self-test builds twice and requires identical output. |
| Fault-tolerant | The hub works with no script (links are plain HTML). Storage failures never crash a page. The offline worker serves the last good copy. A bad registry stops the build before anything is written. |
| Repairable | Every failure names the page and the fix in plain words. Re-run the build to regenerate everything derived. Git holds every version. |
| Self-checking | Gates run in the build, in CI on every push, and weekly against the live site. They cannot be skipped by accident. |
| Self-updating | Installed copies update through the worker with a visible, never silent, update button. GitHub Actions are pinned to exact commits and Dependabot proposes updates monthly, grouped into one pull request. Review it (the check must pass) and merge, or apply the pins yourself and close it. Remove a tool from the repo and close its old Dependabot pull requests, or Dependabot will report errors. |
| Self-correcting | Derived files (hub, worker, group pages, 404, this inventory) are regenerated, never patched. Re-running the build removes drift. |
| Self-improving | Every defect found becomes a gate or a self-test case, so it cannot return (the privacy gate and the page-quality gate were each born from a real finding). This step is manual: add the test when you fix the bug. |
| Trustworthy, private | The privacy gate (section 5). No network calls, no tracking, no accounts. Data stays on the device. |
| Free and open | Free and open source options first, always (section 7). Every page declares its licence; the build reports any that is not open. |
| Accessible, polished | One design system with four looks, 44 px targets, AA contrast checked on every colour pair in every look, reduced-motion, high-contrast, print, safe areas. |
| Fast, minimal | Size budgets are enforced. Pages are small. No frameworks are required. |
| Token-efficient, high signal | Say each thing once, in the fewest plain words that stay complete. No filler, no history inside rules (section 13 holds history). Every document has a size budget, so an AI can load `AGENTS.md` first and read more only on need. `check_docs.py` fails on filler, a repeated sentence, a high reading grade, bad heading structure or a blown budget. |
| Grandma test, plain words | The first-time-user test of section 10 applies to every page and document. Short documents stay at reading grade 10 or lower (`check_docs.py`); page text follows rule 6 of section 5. |
| Pictorial, language-light | Icons first (section 5, rule 6): meaning never rests on colour, on text inside an image or on one language. Every icon control has an accessible name; every page sets `lang`; dates, numbers and units come from the browser's `Intl`; labels stay short so a translation fits; text may grow to 200 percent and reflow at 320 px. `check_pages.py` checks `lang`, names, alt text and zoom. |
| Structure and semantics | One `h1`, no skipped heading level, a meta description, a title under 60 characters, natural keyboard order (no `tabindex` above 0), `rel=noopener` on links that open a tab, and motion only with a `prefers-reduced-motion` rule. `check_pages.py` fails generated pages and warns on hand-built apps for description, h1, heading order and motion; zoom, tab order and `noopener` fail everywhere; title length only warns. |
| Sustainable, ethical | Few bytes, no tracking, no ads, no accounts, no autoplay, work offline, honour reduced motion, offer an OLED black look. Confirm or undo risky actions; the user can always export their data. |
| Installable, offline-first, mobile-first | Omnevum is a PWA: a full manifest (192 and 512 icons, maskable icon, shortcuts), iOS and Android install tags, and one worker that saves every page in the background. A status button shows saving, ready or offline. Large pages (over 5 MB) wait for a tap so mobile data is never spent without asking. Storage is asked to be persistent so the phone does not evict it. Checked by `check_pwa.py` and by a browser test that installs, goes offline and opens every page. |
| Overhaul on a dime | Everything a person sees is data, not code. A name, address, accent colour, icon, kind, topic or archive state is one registry field; every colour, radius, spacing and looks value is one token in `site/scripts/ui.css`; every icon is one name in `icons.json`. One command changes it (`rename.py`, `archive.py`, an edit plus the build) and the build regenerates and re-checks everything derived. Old names and addresses are remembered (`former_names`, `aliases`) so nothing breaks. |
| Future proof | Hosting is plain static files with relative paths: it moves to any static host unchanged. New technologies enter as a new form (section 6). |

**Standards behind the rules.** WCAG 2.2 AA (accessibility), ISO 24495-1 plain language and ASD-STE100 style (short, plain sentences), GOV.UK content design (answer first, one idea per sentence), Nielsen's usability heuristics (visible state, error recovery, undo), the Web Sustainability Guidelines, OWASP-style least privilege (strict CSP, pinned actions), Semantic Versioning and Keep a Changelog (section 13), and SPDX licence ids. The Resource Catalogue lists tools that could check more (a slop detector, a plain-language linter, an interface review pack); compare it under Omni 6.3 and qualify it under Omni 15 before adopting it. Not machine-checked yet: real screen-reader runs, translation quality, device tests, 44 px targets, autoplay, `Intl` use and accessible names inside hand-built apps. They stay manual.

Honest limits: "self-healing" means detect, report, and regenerate; no part rewrites your content on its own. "Self-improving" means findings turn into tests, by you or an assistant, not an automatic learner. Nothing here claims more.

## 3. The model

- **Kind** is what a page is, and its top folder: `apps` (stateful personal apps), `tools` (utilities), `games`, `guides`, `recipes`, `courses`, `references` (catalogues, curated lists, databases).
- **Topic** is what a page is about: money, health, home, food, games, learning, work, travel, local, music, ai. The hub groups by topic. It has no search box and no filter chips (owner decision, 2026-11-02): the landing screen is the Today card with all four daily pieces, then the topic sections. Group pages (`/apps/`, `/games/` and so on) still exist and work as direct addresses, but the hub does not link to them. Topics live in `topics.json`.
- **Form** is how a page is delivered (section 6): `single`, `bundle`, `remote`.
- **Address** is `/<kind>/<slug>/` and never changes once published. The Archive is a display flag in the registry, not a folder, so retiring a page never breaks a link. Old flat addresses forward through `404.html`.
- **Page id and slug.** The slug is the address and must be unique across all kinds; it names the worker cache `app-<slug>-v<version>-<hash8>`. The registry id is an internal key.

## 4. Where things live

```text
Repository (github.com/shfqrkhn/shfqrkhn.github.io): everything needed to rebuild, run and extend the project
  sources/apps/                        hand-built single-file apps, named <PREFIX>-<Name>-v<X.Y.Z>.html (a few keep older prefixes or no version)
  sources/method/                      Omni, the Prompt Clipboard, the Knowledge Distiller, the Resource Catalogue; one file each, `TECH-AINT-<Name>-v<X.Y.Z>.<ext>`, the latest version only (replace the old file when a new one arrives)
  docs/                                this note (FRAMEWORK.md, the source of truth) and PRIVACY.md
  builder/                             the framework tools
    build.py                           THE command: validate, gate, build, check
    paths.py                           where everything lives (the one place a folder name is set)
    registry.json                      every hand-built page (one entry each), icons.json topics.json today_data.json
    icons/phosphor/                    the icons in use (Phosphor Icons, MIT) with the licence; fetch_icons.py restores the full pack
    privacy_names.txt                  PRIVATE list of names that must never appear (local only, git-ignored, never committed)
    app-starter.html  new_app.py       start a new single-file app, already registered
    archive.py                         move pages into or out of the hub Archive by name; or delete a page
    rename.py                          rename a page, give it a new accent colour, keep every old link working
    kit.css                            the shared design system as the apps copy it (generated from site/scripts/ui.css, git-ignored)
    sw.template.js                     the offline worker (the build fills in the page table)
    make_icons.py  pwa-icons/          render the install icons once from one drawing; the build copies them to /icons/
    selftest.py                        proves the framework works and its guards bite
    publish.py                         build, test, commit, push, wait until the live hub matches (dry run by default)
    backup.py                          zip the tracked files plus the local-only files; --verify checks a zip
    fetch_icons.py                     restore the full icon pack from the pinned npm package
  site/                                the published tree: authored scripts/, content/, robots.txt; build.py generates the rest (git-ignored)
  converge/                            review scripts (scan.py, omni_check.py, apply_edits.py); receipts/ and private-skip.txt stay local
  .github/workflows/                   deploy (build, test, deploy to Pages on main), health (weekly, live site)
  history/                             local safety copies made by archive.py (git-ignored; git history is the real history)

Published site (the site/ folder, served at the site root)
  /                                    index.html (hub), today.json (daily content, loaded after first paint), 404.html, sw.js, manifest.webmanifest, icon.svg, robots.txt
  <kind>/index.html                    group page (generated)
  <kind>/<slug>/index.html             a page (single and generated) or a folder of files (bundle)
  content/<kind>/<slug>.json           data for generated pages (folders starting with _ are examples)
  scripts/                             ui.css, build_pages.py, new_page.py, check_*.py, test_*.py, personalize.js
  docs/                                FRAMEWORK.md (copy of this note), PRIVACY.md, ICONS-LICENSE.txt (generated from the icon pack's licence)
```

## 5. Hard rules

1. **Privacy gate.** No page, doc or registry text may carry personal information in any form: names of real people (owner, household, authors, designers, developers, players, creators), emails, phone numbers, addresses, government or account numbers, usernames or handles (the owner's GitHub handle in site and repository addresses is the one allowed handle), IP addresses, keys, tokens, local paths, credit lines naming a person. Allowed: attributed historical quotes; copyright lines in third-party licences that the licence requires; the public site address; names of organisations, products, places and fictional characters. Sample data uses neutral labels ("Person A"). Nothing published may reveal who the owner is or where they work: no employer, ministry, department, agency, military or government-unit names or acronyms that identify the owner's job, and no handle beyond the owner's GitHub handle in the site and repository addresses. These terms go in the private list (`builder/privacy_names.txt`), so the public repository never spells them out. Content must come from public sources, never from work material, internal training or client data. The public credit an open-data licence requires is allowed. If something identifying ever reaches the repository, deleting it in a later commit is not enough because history keeps it: scrub the sources, then replace the history with one clean commit (needs branch protection off for the push) and, to clear old pull request refs, recreate the repository.
2. **No network.** A page makes no request unless the user starts it. Four apps that use an AI or data service (PromptPlayground, PennyPlanner, MeetingMediator, WorldCupWizard) list that service's hosts in their Content-Security-Policy `connect-src` and FlexxFiles allows its own origin only; no other host is allowed, and `check_pages.py` inspects only `src`, `href` and `action` attributes, not `connect-src`. No analytics, no external fonts, scripts or styles. The hub and generated pages ship a strict Content-Security-Policy.
3. **Local-first.** Everything the user enters stays on the device (localStorage or IndexedDB). Every page that stores data offers export and restore. Storage keys are never renamed. Schemas carry a version and are validated on read.
4. **Offline.** Every page works with the network off. The hub saves all pages in the background after the first visit (large ones on a tap), tries the network first for freshness but falls back to the saved copy after 3.5 seconds, and updates only when the person taps the update button. A page with its own PWA (bundle with `pwa: true`) brings its own worker and scope.
5. **Home link.** Every single-file page has one link `href="../"` (the source file), which the build rewrites to `../../` on the site. Bundles write `../../` themselves. Remote pages link out and are labelled.
6. **Icons first, few words.** One icon family everywhere: Phosphor Icons (MIT), Regular weight, with the Fill weight for the selected state. Never hand-draw an icon. Buttons are icons with an accessible name. Labels are one to three words. Help is one short line. Empty states are an icon and three to six words. Sentences stay under 20 words. No emoji. No em or en dashes in text the owner writes for the page chrome and the documents; quoted text, imported data and country-flag glyphs are exempt.
7. **Accessible.** Real buttons and links, labelled controls, keyboard operable, visible focus, 44 px targets, AA contrast, reflow to 320 px, respects reduced motion.
8. **Looks.** Auto, Paper, Charcoal, Black. The choice lives in `hub.prefs.v1` and every page reads it.
9. **Small.** Budgets: hub 300 KB, group page 60 KB, generated page 120 KB, any file 25 MB, whole site 900 MB. Any app page: 3 MB; a page over 5 MB would be exempt by the worker's `big` flag and wait for a tap before it is saved offline.
10. **Licence.** Every page declares an SPDX licence in the registry (default MIT). Prefer free and open source for every dependency (section 7).
11. **Never publish what the gates reject.** A failing gate stops the build. Do not weaken a gate to pass; fix the cause, or add an exact, reasoned allowance in `site/scripts/privacy-allow.json`.
12. **Nothing irreversible without the owner.** Deleting repositories, rewriting history and spending money are the owner's acts.

## 6. Delivery forms

| Form | What it is | Registry fields | Hosting |
| --- | --- | --- | --- |
| `single` (default) | One self-contained HTML file in `sources/apps`. Highest version wins when the source has `-v*.html`. The version text must appear in the file. | `source` | Copied to `/<kind>/<slug>/index.html` |
| `bundle` | A folder of static files: assets, images, **WebAssembly**, a build output, or an app with its **own PWA**. `index.html` is the entry and must contain a home link `href="../../"`. | `source` (folder), `version`, optional `wasm: true`, `pwa: true` | Whole folder copied; tree hash recorded. With `pwa: true` the page brings its own manifest and worker (scope = its folder) and the hub worker leaves it alone. For WebAssembly add `'wasm-unsafe-eval'` to the page's `script-src`. |
| `remote` | An app hosted elsewhere: a **full stack app with a backend**, or any live service. Listed on the hub as an external link, never copied. | `url` (https), `host`, `license`, optional `stack` | Anywhere: see below. The hub labels it as another site and opens it in a new tab with `noopener noreferrer`. |
| generated | A recipe, guide, game page, lesson or reference built from `content/<kind>/<slug>.json` by one template. | the JSON file | Rendered to `/<kind>/<slug>/index.html` |

**Add a new form** (a technology not invented yet): add one row to `FORMS` in `build.py`, handle it in the places that use `FORMS` in `build.py` (find and identify its content, write its files, list it), add a self-test case in `selftest.py`, and document it here. Nothing else changes.

GitHub Pages serves static files only and has published size and bandwidth limits: check the current limits before a large release (the limits were not rechecked on 2026-11-02). Pages cannot run server code, so any backend lives elsewhere (section 7) and the page is `remote`, or a static front end that calls a backend the user starts.

## 7. Free and open source first

Order of preference for every choice: (1) free and open source, self-hostable; (2) free and open source with a free hosted tier; (3) free but proprietary, only when nothing open exists, recorded as an exception in the registry (`license` and a short reason).

Starting points (verify current licences and terms at the time of use; this list is a map, not a promise):
- **Hosting static pages:** GitHub Pages today (free, not open source; as of 2026-11-02, recheck before relying on it). The site is plain static files with relative paths, so it moves to any static host (for example a Forgejo-based host such as Codeberg Pages, or self-hosted Caddy or nginx) by changing nothing but the address.
- **Backend for a `remote` app:** PocketBase (single binary with SQLite, MIT), Supabase (Apache-2.0, self-hostable), Appwrite (BSD-3-Clause), plain Deno or Node (MIT) services. Prefer a backend whose data the user can export.
- **WebAssembly:** Rust with wasm-bindgen (MIT or Apache-2.0), Emscripten (MIT), TinyGo, AssemblyScript (Apache-2.0), Pyodide for Python in the browser (MPL-2.0), SQLite compiled to WebAssembly (public domain) for a real database in a page.
- **Local-first data and sync:** IndexedDB and the Origin Private File System; CRDT libraries such as Yjs or Automerge (MIT) when several devices must agree.
- **Tooling:** Python standard library for every gate (no dependencies to rot); Playwright (Apache-2.0) for optional browser tests.
- **Fonts and icons:** system fonts and the inline icon set; if a font is needed, an SIL Open Font License one, embedded.

## 8. How to...

Every path ends the same way: run the build; it validates, gates and checks everything; then publish.

**Make a new single-file app** (also tools, games, guides, recipes, courses, references):
1. `python builder/new_app.py <kind> <slug> "<Title>" --topic <topic> --blurb "<up to 20 words>"`
2. Open the new file in `sources/apps`. Build the app inside it. Keep the starter's pieces: strict CSP (recompute the script hash whenever you edit the inline script), the home link, the look control, validated storage, export, `textContent` for user data, the version meta.
3. Give it its own icon: a Phosphor icon name in `icons.json`. Set `lazy`, `archived`, `license` in `registry.json` if needed.
4. Run the build. Fix what it reports.

**Make a simple content page** (a recipe, guide, board game page, lesson):
1. `python site/scripts/new_page.py <kind> <slug> "<Title>" --topic <topic>`
2. Edit `content/<kind>/<slug>.json`. Blocks: `list` (add `"check": true` for a tick list that remembers), `steps`, `text`, `table`. Check with `python site/scripts/build_pages.py --check`.
3. Run the build. The page, its tile, its group page and its offline cache appear.

**Make a bundle or WebAssembly page:** put the folder under `sources/apps/<slug>/` (or any absolute path), add a registry entry with `form: "bundle"`, a `version`, and `wasm: true` or `pwa: true` as needed. Make `index.html` link home with `href="../../"`. Run the build.

**List a full stack app:** add a registry entry with `form: "remote"`, `url`, `host`, `license`, `stack`. Nothing is copied.

**Give a page its icon:** find a name in `builder/icons/phosphor/regular/` (one file per icon, for example `egg.svg`), put that name in `icons.json` under the page's icon key, run the build. Inside a hand-built app, copy the inner paths of the icon file into `<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">`.

**Rename or recolour a page:** `python builder/rename.py "<page>" "<New Name>"` (add `--hue 0-359` for its accent colour, `--slug` to choose the address, `--tagline "<up to 40 characters>"` for the plain descriptor, `--file-stem <Stem>` to also rename the source file (and every document that names it), `--old "<earlier spelling>"` to also rewrite the name inside the page, `--dry-run` to preview). It updates the registry, remembers the old name in `former_names` and the old address in `aliases` (the 404 page forwards old links, including addresses from before pages were grouped), rewrites the name in the page's visible text and safe attributes only (never scripts, styles, storage keys or file formats; occurrences left in scripts are listed for review), and rebuilds. Names follow the house style: funny, punny, alliterative, generic and CamelCase like NoodleNudge; never a trademark or a person's name. Page file names in `sources/apps` keep their old names until a deliberate move (the registry points at them).

**Back up:** GitHub is the primary copy of everything tracked, and its history is the project's history. `python builder/backup.py` also zips the tracked files plus the few local-only files (`builder/privacy_names.txt`, `converge/private-skip.txt`, `converge/receipts/`); keep that zip private and off this computer, and `--verify <zip>` rechecks it. Generated files are not stored: `python builder/build.py` rebuilds them and the deploy workflow does it on every push. The full icon pack is restored with `python builder/fetch_icons.py`. Make a backup after each release and test a restore once.

**Re-skin the whole site:** edit tokens in `site/scripts/ui.css` (colours per look, radius, spacing, type), run the build. The contrast gate re-checks every colour pair for every accent hue; the kit file for the apps (`builder/kit.css`) regenerates; the hub, group pages, generated pages and the 404 follow at once. Hand-built apps follow the kit through their kit block (section 10); to push a token change into them, re-run the same copy step the owner or an assistant used (the kit block is delimited by `OMNEVUM KIT:BEGIN` and `OMNEVUM KIT:END`).

**Update an app:** edit the file, bump the version in the file name and in the version meta, run the build. The hash changes, so installed copies fetch the new version.

**Archive or restore a page** (move its icon to or from the Archive section at the bottom of the hub). Say "archive X" or "restore X" and run:
- `python builder/archive.py list` shows what is on the main hub and what is archived.
- `python builder/archive.py archive "MeepleMentor" goalguru` archives one or more pages.
- `python builder/archive.py restore "MeepleMentor"` brings it back.
One rule places every page, archived or not: its topic picks the section, then its kind, then its title. The Archive is grouped by topic in the same order as the main hub (and on each group page, archived pages sit in a collapsed Archive section). Nothing is remembered about where a page "used to be": restoring simply stops excluding it, so it returns to its correct place by itself. A page is named by its id, slug or title. It rebuilds and checks automatically (add `--no-build` to only change the registry). Addresses never change, installed copies keep working, and repeating a command is harmless. Under the hood it flips `"archived"` in `registry.json` (or in the page's `content/` file); you may also edit that flag by hand and run the build.

**Delete a page for good:** `python builder/archive.py remove "<page>" --yes`. It leaves the registry (or deletes its content file) and moves its source file from `sources/apps` into the git-ignored `history/` (git history keeps it too) so a mistake is recoverable. The next build and publish remove it from the site; its old address then shows the 404 page.

**Move a page to another kind:** change `kind`. Old links forward through the 404 page.

**Add a topic or kind:** topics: add to `topics.json`, a colour and an icon in `build.py` (`TOPIC_IC`), and `TOPICS` in `build_pages.py`. Kind: add to `KINDS` in `build.py` (name and icon), to `KINDS` in `new_app.py`, and to the allowed lists in `build_pages.py`, `check_pages.py` and `check_registry` in `build.py`.

**Publish:** `python builder/publish.py "Message"` is a dry run: it builds, tests and lists the changes. Add `--yes` to commit and push to main; the deploy workflow then builds and publishes the site, and the command waits until the live hub matches this build. Generated files are never committed (git ignores them). Check the live site any time with `python site/scripts/check_live.py`.

**Self-test everything:** `python builder/selftest.py`.

## 9. Gates

| Gate | Checks | Runs |
| --- | --- | --- |
| Registry | required fields, forms, unique ids and addresses, blurb length, icons and topics exist | build |
| Privacy | personal data patterns, keys, credit lines, private name list; also the registry, root documents, workflows and converge scripts, and the commit message in `publish.py` | build (sources, content, output), publish, CI |
| Pages | doctype, lang, title, viewport (zoom allowed), meta description, one h1, heading order, unique ids, alt text, named controls, tab order, noopener, reduced motion, no outside requests, CSP, internal links, size budgets | build, CI |
| PWA | manifest, icons at the stated sizes, maskable icon, iOS tags, worker shell and page table match the catalog, download budget | build, CI |
| Site | files, worker, catalog and hashes agree; nothing unlisted; size limits | build, CI |
| Contrast | every colour pair in every look meets WCAG 2.2 (1468 checks, hues in steps of 5) | build, CI |
| Docs | filler, repeated sentences, reading grade, heading structure and size budget of the repository documents | build, CI |
| Kit | every hand-built page carries the current kit block and its own accent hue | build, CI |
| Self-test | idempotent build, refusals, planted-PII catch, forms, generator, browser tests | CI, every push |
| Live | the published site still matches the catalog | weekly, after publish |

### Review workflow (scripts first, cheap models, strong tier last)

- Run the executed checks first: `build.py` (all gates), `selftest.py`, `site/scripts/test_mobile.py`, `site/scripts/test_personalize.py`. They are free and decide most questions.
- For reading and coverage use the cheapest sufficient model: haiku agents, or Codex with the text passed in the prompt and low or medium effort (`codex exec -s read-only -c model_reasoning_effort="low"`). Keep a strong model for adversarial passes and for applying edits. Converge is the owner's convergence method (Omni section 8), run with the Prompt Clipboard blocks ConvergeOmni, ConvergeWork and ConvergeLibrary. Verify every reported defect by exact quote before acting; most reports from weaker models are false positives.
- The Converge tooling lives in `converge/` (`scan.py` (use `--root .` to cover the whole repository; it finds Omni under any folder), `omni_check.py`, `apply_edits.py`; receipts stay local and git-ignored because they list private file names). A receipt counts as a baseline only when its run ended ASSURED_CONVERGED (Omni 8.4).

## 10. Design system

One file: `site/scripts/ui.css`. Tokens (`--bg --fg --mut --card --line --acc --on-acc`, spacing `--s1..--s6`, radius `--r`), four looks, shared components: `.ph` header, `.ib` round icon button, `.card`, `.tile`, `.grid`, `.today` with four `.nudge` rows, `.chk` tick list, `.steps`, table, `.none` empty state, `.skip`. Icons are Phosphor Icons (MIT), Regular weight on a 256 grid, drawn as filled outlines with `fill: currentColor`; the Fill weight marks a selected state. The pack lives in `builder/icons/phosphor/`; `icons.json` maps each page's icon key to a Phosphor name; the build inlines only the icons used and ships the licence as `docs/ICONS-LICENSE.txt`. Motion is short and disabled for reduced-motion. Print hides controls. Forced-colours mode keeps borders.

**Core design language and individuality.** Every page shares the core: the same four looks stored under `hub.prefs.v1`, the same neutral palette tokens, system font at 16/1.5, a 16 px card radius with a 1 px border, round 44 px icon buttons, a 3 px accent focus ring, spacing in multiples of 4, Phosphor icons, and one page chrome (a round home button, the app's own icon and name, a spacer, then round icon buttons for Help, Look and the app's actions). Each page keeps its individuality through five things only: its name (funny, punny, alliterative), its accent hue (`hue` in the registry, applied by `<html data-app style="--hue:N">`; the hub tile uses the same hue), its icon, its signature components and layout, and one short playful line (six words at most) on its first screen. Everything else is shared, so a token change reaches every page. Apps carry the shared part as a kit block that is copied from `kit.css` by hand; `check_kit.py` verifies in the build that every block is current.

**Grandma test** (every new page must pass): a first-time visitor with no instructions and no reading can find the main action, do it, see that it worked, and undo or export their work. If a screen needs a paragraph to explain it, redesign the screen.

### Personalization (visitor choices and owner rebrands)

- Visitor choices: the hub's Personalize button opens a dialog with an accent colour (each page keeps its own, or one colour for all) and a text size (small, default, large, larger). They are saved in `hub.prefs.v1` as `{schemaVersion, look, hue, size}`. Every single-file page loads `site/scripts/personalize.js` first in its head, so the choice applies before paint, offline, and across tabs.
- The build injects that script tag and adds `'self'` to the page's `script-src`; the sources stay untouched. Pages with their own PWA (bundles) are not touched.
- The script merges writes to `hub.prefs.v1`, so a page that saves only its own look never erases the hue or size. A page with no hue of its own simply falls back to its own accent when the choice is reset.
- Any hue is safe: the contrast gate proves every hue against all four looks.
- Owner rebrand: `rename.py` renames a page and its address (old ones forward), `--hue` recolours it, `--tagline` rewrites its descriptor. A whole-site look change is a change to `site/scripts/ui.css` tokens, then one build.
- Test: `site/scripts/test_personalize.py` (part of the self-test) sets the choices in the dialog, then checks every single-file page, the CSP, the merge and the reset.

## 11. Known limits and owner decisions

- Pages share one origin, so any page on the site could read another page's stored data. Pages here are all the owner's, and no page ships third-party scripts. A page that must be isolated should live on its own origin as a `remote` page.
- The live repo's history was rewritten on 2026-11-02 to a single commit with a noreply author, so earlier content is gone from `main`. GitHub may still hold old pull request refs; only deleting and recreating the repo clears them (needs the owner's delete permission). `shfqrkhn.github.io` is the only repo; the five archived ones are deleted. Branch protection on `main` is off at the owner's choice and blocks force-pushes when on.
- Some third-party licences name their authors in a copyright line that the licence requires; those lines are kept.
- The self-test runs browser tests in headless Chromium; `test_mobile.py` (Chromium and Firefox) is run by hand. Real-device checks are manual.

## 11a. Lessons learned (read before building any new app)

Each line is a mistake that happened once. A new page should never repeat it.

- Hands-free matters. Apps used mid-activity (workout, cooking, game table, timed meeting) must keep the screen awake with the Screen Wake Lock API: request on load and on every visibility return (the lock is released when the tab is hidden), re-request on first tap, ignore failures silently, and offer a way to turn it off. The screen may dim; it must not lock. Never ask someone with sweaty or messy hands to unlock a phone. Pair this with big tap targets (44 px minimum, 64 px for the main action) and automatic next steps (for example the rest timer starts itself when a round ends).
- Hash inline scripts and styles in the page's Content-Security-Policy the way a browser does: normalise CRLF to LF first. After any edit to inline code, run `rename.py` helpers `fix_csp` or `repair_csp`; the page-quality gate fails otherwise. Adding a hash to a directive that already lists 'unsafe-inline' silently disables inline code, so do not mix them.
- No shell escapes for edits: backslash sequences collapse in shells. Write a patch file (or use the Edit tool) and assert each replacement matches exactly once.
- Names: a pun must carry a plain `tagline` (40 characters or fewer) so the name never has to explain itself. Renames go through `rename.py` so old addresses and names keep working.
- Never name a person in any page, doc or fixture. The privacy gate has a private name list; new regressions go on it.
- A dependency that points at a repository must be checked to exist before it is shipped (a page once depended on a repository that was never created).
- Test on a phone viewport (390 and 320 px) and offline; scrollbar gutters, shrinking flex children and below-the-fold primary controls only show there.
- Test fixtures must track required registry keys; when a key becomes required, update the self-test in the same change.
- Naming scales: a page name is `<Pun> <Subject>` where the subject says exactly what this one page is (`Eggspress Egg Salad`, `BoonBuilder Hades Guide`), never only the kind. With many recipes or guides, a bare pun cannot tell them apart. The address is the same words in lowercase with dashes. Check the subject is true (a Hades guide is not a Hades II guide) before naming.
- Long names must wrap, not push buttons off screen: never `white-space:nowrap` on a header title; the kit rule (`overflow-wrap:anywhere`, `min-width:0`) already handles it. After any rename, run the mobile audit at 320 px for horizontal overflow, tap targets under 40 px and console errors.
- Pages seen on a phone may be an older cached copy; judge a screenshot against the current build before fixing.
- Knowledge Distiller changes need a cold re-run and fresh reviewers; never claim convergence from the author's own pass.
- Put the control the user needs next, directly under the primary action (FlexxFiles had its reps-in-reserve buttons below the fold until they were moved under Complete set).
- Stop any local test server you start (`python -m http.server`, node dev servers) when the test ends; stray ones lock folders and block moves into the archive.
- Run a history rewrite only with branch protection off, and check the old pull request refs first; they survive a force-push.

## 12. Generated blocks (do not edit)

<!-- BUILD:BEGIN -->
Hub 1.4.3. 19 pages in 7 groups: 19 single, 0 bundle, 0 remote, 0 generated; 8 archived, 0 private. Inventory fingerprint `707fca73`, last changed 2026-11-04.
<!-- BUILD:END -->

<!-- INV:BEGIN -->
| Page | Kind | Form | Topic | Version | Status | Licence | Address |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DecisionDesk Briefs | apps | single | money | 0.5.3 | archived | MIT | /apps/decisiondesk-briefs/ |
| FlexxFiles Workout Log | apps | single | health | 2.5.5 | live | MIT | /apps/flexxfiles-workout-log/ |
| MeetingMediator Sessions | apps | single | work | 0.5.3 | archived | MIT | /apps/meetingmediator-sessions/ |
| NestEggNinja Retirement | apps | single | money | 10.4.5 | archived | MIT | /apps/nesteggninja-retirement/ |
| NoodleNudge Journal | apps | single | health | 1.7.6 | live | MIT | /apps/noodlenudge-journal/ |
| PennyPlanner Budget | apps | single | money | 1.3.7 | archived | MIT | /apps/pennyplanner-budget/ |
| TickleTodo Tasks | apps | single | health | 1.3.4 | archived | MIT | /apps/tickletodo-tasks/ |
| ProjectPopQuiz Exams | courses | single | learning | 1.7.4 | live | MIT | /courses/projectpopquiz-exams/ |
| MeepleMentor Board Game Rules | games | single | games | 14.5.3 | live | MIT | /games/meeplementor-board-game-rules/ |
| WorldCupWizard Predictions | games | single | games | 1.5.4 | archived | MIT | /games/worldcupwizard-predictions/ |
| BoonBuilder Hades Guide | guides | single | games | 1.1.4 | live | MIT | /guides/boonbuilder-hades-guide/ |
| SproutScheduler Planting Calendar | guides | single | home | 1.4.4 | live | MIT | /guides/sproutscheduler-planting-calendar/ |
| Eggspress Egg Salad | recipes | single | food | 1.3.3 | live | MIT | /recipes/eggspress-egg-salad/ |
| HandheldHunter PC Games | references | single | games | 16.10.3 | live | MIT | /references/handheldhunter-pc-games/ |
| StreamScholar YouTube Channels | references | single | learning | 1.1.4 | live | MIT | /references/streamscholar-youtube-channels/ |
| PromptPlayground AI Chat | tools | single | ai | 0.5.5 | archived | MIT | /tools/promptplayground-ai-chat/ |
| StepSleuth Step Counter | tools | single | health | 1.2.4 | archived | MIT | /tools/stepsleuth-step-counter/ |
| TranscriptTidy AI Exports | tools | single | ai | 1.6.2 | live | MIT | /tools/transcripttidy-ai-exports/ |
| TrendTracker Charts | tools | single | ai | 1.5.3 | live | MIT | /tools/trendtracker-charts/ |
<!-- INV:END -->

## 13. Change log (newest first)

- 2026-11-04, hub 1.4.3 and later: the builder runs on Windows, macOS and Linux (no hard-coded path separators; CI still builds on Windows); the method documents are now Omni 7.33.1, Resource Catalogue 2.0.1, Prompt Clipboard 1.0.1 and Knowledge Distiller 1.5.6 (the separate MIT edition is retired; 1.5.6 is the single release), with local paths replaced by neutral placeholders; `scan.py` now includes the governing Omni text in its keys wherever the repository keeps Omni.
- 2026-11-04, hub 1.4.3: identity hardening. The privacy rule now also forbids employer, ministry, department, agency, military and government-unit names or acronyms, and any handle beyond the site address; the private list carries them; content must come from public sources; leaks are fixed by rewriting history, not by a later commit. The retirement planner lost its government-specific wording; the licence holder is now "Omnevum contributors".
- 2026-11-04, hub 1.4.3: the whole project moved into this repository: sources, builder, framework documents and review scripts live beside the site. GitHub Actions now builds and deploys the site on every push, so generated files are no longer committed; `publish.py` commits and pushes sources and waits for the deploy; `backup.py` zips tracked and local-only files. The rebuilt site was proven byte for byte identical to the previously published one. The Obsidian vault is no longer part of the workflow.
- 4.0.0, hub 1.4.3 and later: `backup.py` (dated zip with manifest, `--verify`).
- 4.0.0, hub 1.4.2 (with 1.4.1): FlexxFiles reps-in-reserve buttons moved directly under Complete set (first screen on a phone); Omni 7.31.1 and the Prompt Clipboard converged to PARTIAL under the 3-round cap; Resource Catalogue 1.3.1; review workflow and lessons added; live repo history rewritten to one commit; archived repos deleted; PennyPlanner and NestEggNinja top bars stay one row from 320 px up; `rename.py --file-stem`; Knowledge Distiller rule to extract its template by script when a shell exists.
- 4.0.0, hub 1.4.0: personalization (accent colour and text size for every page, from the hub); self-explanatory page names (`<Pun> <Subject>`); legacy build folders moved to archive; Converge economy tooling in `converge`.
- 4.0.0, hub 1.3.0: screen stays awake (dimming allowed) during FlexxFiles workouts, Eggspress Eats cooking, Meeple Mentor play and Meeting Mediator meetings; lessons-learned section added; Knowledge Distiller 1.5.1.
- 4.0.0, later the same day: rebrand and convergence (owner request): every page renamed in the house style, a per-page accent hue (all hues pass the contrast gate in all four looks), `rename.py`, `aliases` and `former_names` with forwarding of every old address (a test follows them), data-driven size exceptions (no hard-coded page addresses anywhere in the scripts), the core design language written down, the apps moved onto the shared kit while keeping their own layout and signature components; hub 1.2.0 (owner request): search box and filter chips removed; Today shows all four Noodle Nudge pieces (quote, reflection, meditation, thinking trap) on the landing screen; the pronunciation fits one line; the section containment that clipped focus outlines is gone and every grid has room for its outline (a test enforces it); the offline status stops spinning when the worker is silent. PWA contract (section 2 and rule 4): installable manifest with PNG and maskable icons, shortcuts, iOS tags, a background-saving offline worker with a status button and install button, persistent storage request, `check_pwa.py`, and a full offline browser test; the Archive is grouped by topic and restoring is automatic; Noodle Nudge questionnaires audited and repaired (blank answers no longer score as zero, band gaps closed, derived scores fixed, proprietary instruments replaced with original reflection exercises, a not-a-diagnosis line and a crisis-line line where needed); one icon family (Phosphor Icons, MIT) in the hub, group pages, generated pages, starter and apps; daily content moved to `today.json` (hub 225 KB to 65 KB); `archive.py`; Dependabot grouped monthly with pinned actions; the live check waits for the new hub version.
- 4.0.0 (2026-11-02): rebuilt as the single framework: grouped addresses, registry, forms (single, bundle, remote), generated pages, privacy gate, page-quality and contrast gates, self-test, publish command, scaffolders, design system, free and open source rule. Supersedes 3.0.0, which is kept in the archive as the record of the first 21 pages and their evidence.
