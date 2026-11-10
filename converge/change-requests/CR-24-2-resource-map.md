# CR-24-2: tie RepoRadar resources to named changes

**Status:** planned (not started).

**Problem (Y):** the ledger has 523 verdicts, but nothing says which resource supports which change, so "use RepoRadar" is not checkable.

**Change:** add converge/resource-map.json: one row per use, with ledger id, role (IDEA, REFERENCE, ORACLE, AUTHORING, TEST, VENDORED_COMPONENT, RUNTIME), the CR it supports, the result (APPLIED, DEFERRED, REJECTED) and the reason. Extend converge/v23_check.py to fail when a row names an id not in the ledger, or a role not in the list.

**Scope:** start with the 10 adopt or adapt entries and the 78 study entries; rows for reject, reference and unavailable entries only when a change cites one. No installs, no crawling.

**Starting rows (from the ledger):** googlechrome/lighthouse (TEST, live audits), cloudflare/security-audit-skill (AUTHORING, receipt shape, deferred to the next Omni revision), shadcn/improve (AUTHORING, review workflow, applied), hardikpandya/stop-slop (TEST, applied in check_docs.py).

**Acceptance:** the map validates against the ledger; every CR-24 item lists its resources or says none.

**Rollback:** delete the file and the check.

**Risk:** a stale map. Mitigation: the check re-runs with the ledger hash.
