# Security

## Reporting a problem

Please report a vulnerability or a privacy leak privately: open the repository's **Security** tab and choose **Report a vulnerability**. Do not post it in a public issue.

Include the page or file, what you saw, and how to reproduce it. A leak of personal information in any page or document counts, and is treated as a security issue.

## What is covered

The live site (https://shfqrkhn.github.io) and the `main` branch. Every page is a static file; nothing runs on a server and no page sends your data anywhere. The page-quality gate blocks any external request, and each app pins its own inline code with a Content Security Policy.

## How it is kept safe

- GitHub Actions are pinned to full commit hashes and updated by Dependabot.
- Secret scanning and push protection are on.
- `main` blocks force-pushes and deletion.
- The privacy gate (`builder/build.py`) runs on every build and in CI; see `docs/PRIVACY.md`.
