# Change request CR-v23: verify the Omnevum and RepoRadar baseline

Source: CLAUDE_OMNEVUM_REPORADAR_CONSOLIDATED_v23 (SHA-256 550acb73f53cfa20a23f692bc410fea7bf0cca91bd8649de32adfa779e42447b, recorded as brief_v23_sha256 in the receipt identity). The brief is an analysis. This request turns its testable parts into work that can be done and checked locally.

## 1. Goal

Prove, at one exact commit, that the generated site, the registry, the RepoRadar ledger and the 19 shared-engine study readers agree with each other, and that the gates catch planted defects. Record every result as PASS, FAIL, NOT_RUN or BLOCKED. Fix a failure only when it is reproduced.

## 2. In scope (implemented here)

| ID | Item | Brief section | How it is checked |
|---|---|---|---|
| CR-1 | Environment and identity: HEAD, Python, Playwright, registry and ledger SHA-256, site/ and sources/ tree hashes | 2, 6.1 | converge/v23_check.py prints and saves them |
| CR-2 | Generated output matches registry: 41 pages (40 app sources plus the RepoRadar source), 8 archived | 2 | counts from registry.json against site/ |
| CR-3 | Ledger reconciliation: 523 entries (507 catalogue plus 16 owner added), unique ids, disposition counts | 2, 6.3 | v23_check.py |
| CR-4 | Shared KD engine contract for the 19 readers: one engine version, unique reader (meta.id), chapter and activity ids, activity claims and chapter sources resolve, every check question has an answer | 3 | v23_check.py parses each data block |
| CR-5 | Gate behavior: build, self-test (29), check_site, check_pwa, check_privacy, check_pages, check_docs, check_contrast, check_kit | 2, 6.1 | existing scripts, run alone |
| CR-6 | Offline update safety: the worker keeps the old cache when an update fails | 2 PWA P0 | Playwright run against a local server (NOT_RUN if the browser cannot start) |
| CR-7 | Backup and restore defined: what backup.py saves, that it excludes nothing the owner needs, and that restore returns identical output | 6.1 | existing backup.py and the self-test archive and restore checks |

## 3. Out of scope

Deploy, GitHub edits, dependency installs, unarchiving apps, data removal, remote crawling, and any rewrite of the worker or an app. The 33 per-app depth reviews (A08 to A40), domain answer checks against primary sources, and rights checks stay NOT_RUN and are listed as remaining gaps. Consolidation proposals (brief section 4) are not implemented.

## 4. Acceptance

1. converge/v23_check.py exits 0 and merges its results (CR-1 to CR-4) into converge/receipts/v23-execution.json; CR-5 to CR-7 outcomes come from the build, self-test and v23_offline.py runs and are added to the same file. Earlier keys are kept on each save.
2. Self-test reports 29 passed, 0 failed, run alone.
3. Any FAIL is either fixed with a reproduced test or listed with its reason.
4. FRAMEWORK.md stays at or under 49,830 bytes (a working margin; the gate in check_docs.py allows 50,000).

## 5. Rollback

All changes are in this repository. Revert the commit that adds converge/v23_check.py and this file. No data, deploy or remote state is touched.

## 6. Risks and known gaps

Receipts are self-reports. A PASS on CR-4 shows the engine data is internally consistent, not that the lessons are true. Browser tests depend on a local Chromium. A change of HEAD voids earlier results, so the check is re-run at the final commit.
