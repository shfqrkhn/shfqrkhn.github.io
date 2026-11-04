# Privacy rule

Omnevum never publishes personal information. This holds for every app, page and doc, in any form.

## What counts
- Names of real people: the owner, family, friends, authors, designers, developers, players, creators, reviewers.
- Contact and location data: emails, phone numbers, street addresses, postal codes.
- Identifiers: government or account numbers, usernames and handles, IP addresses.
- Secrets: API keys, tokens, private keys.
- Traces: local file paths, credit lines that name a person.
- Employment: employer, ministry, department, agency, military or government-unit names and acronyms that identify the owner's job, and any handle beyond the site address. Keep these terms in the private list only.
- Origin: content taken from work material, internal training or client data. Use public sources only.

## What is allowed
- Attributed historical quotes, with the author's name.
- Legally required copyright lines in third-party licences (listed in `scripts/privacy-allow.json`).
- The public site address itself.
- Names of organisations, products, places and fictional characters.

## How it is enforced
1. `scripts/check_privacy.py` scans every published file for the patterns above. A hit fails the check.
2. `scripts/check_site.py` runs it, and so does the CI workflow on every push.
3. The release build also checks the app sources against a private list of owner and household names. That list is kept outside this repo.
4. Apps keep what you type on your own device. They send nothing anywhere unless you start it, and no app ships with someone's records inside.

## When you add or change an app
- Use neutral labels in sample data ("Person A", "Customer 12").
- Cite sources by title and organisation, not by person.
- Run `python scripts/check_privacy.py`. It must print `OK`.
- If a licence must name a person, add the exact line to `scripts/privacy-allow.json`.
- If something identifying was published, scrub the sources and replace the git history; a later delete-commit leaves it recoverable.
