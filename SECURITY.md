# Security

## Reporting a problem

Please report a vulnerability or a privacy leak privately: open the repository's **Security** tab and choose **Report a vulnerability**. Do not post it in a public issue.

Include the page or file, what you saw, and how to reproduce it. A leak of personal information in any page or document counts, and is treated as a security issue.

## What is covered

The live site (https://shfqrkhn.github.io) and the `main` branch. Every page is a static file; nothing runs on a server and no page sends your data anywhere on its own. The page-quality gate blocks external scripts, styles, images and links; four apps that use an AI or data service (PromptPlayground, PennyPlanner, MeetingMediator, WorldCupWizard) list its hosts in their Content Security Policy and can contact only those (PromptPlayground also local addresses, for a model on the user's own machine; FlexxFiles allows its own site only), and each app pins its inline scripts with a Content Security Policy (styles may be inline).

## How it is kept safe

- GitHub Actions are pinned to full commit hashes and updated by Dependabot.
- Secret scanning and push protection are on.
- Branch protection on `main` is the owner's setting; when it is on, `main` blocks force-pushes and deletion.
- The privacy gate (`builder/build.py`) runs on every build and in CI; see `docs/PRIVACY.md`.
- Known trade-off: the shared look script (`personalize.js`, first-party and checked) runs from the site's own origin, so each app's `script-src` also allows `'self'`.
