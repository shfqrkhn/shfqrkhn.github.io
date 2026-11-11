# Omnevum and RepoRadar: problem-first brief (v24)

Successor to CLAUDE_OMNEVUM_REPORADAR_CONSOLIDATED_v23 (SHA-256 550acb73f53cfa20a23f692bc410fea7bf0cca91bd8649de32adfa779e42447b). v23 stays as the immutable predecessor (not kept in this repository; its hash is recorded for reference); this file restates it around the problem it is meant to solve. Facts below were measured in this repository on 2026-11-10 unless marked UNVERIFIED.

## 1. The ask as stated (X)

Survey RepoRadar for resources that fit Omnevum, the repo and every app, then reduce the number of apps by harmonized, DRY consolidation.

## 2. The problem behind it (Y)

Ask "why reduce the number of apps?" until the answer is not a method:

1. Fewer apps means less to maintain, review and secure.
2. The real cost is repeated code, repeated review and repeated drift between copies, not the count of menu entries.
3. The owner wants one place to fix a defect and every app to benefit, without losing any app's value, data or address.

**Y: lower the cost and risk of keeping 41 pages correct, private, offline and consistent, while keeping every user-visible purpose, route and saved-data format.**

The count of apps is a proxy. Merging products is one way to cut cost, and often the most expensive and risky one.

## 3. What is measured

| Fact | Value | Meaning |
|---|---|---|
| Pages | 41 = 40 app sources plus the RepoRadar source; 8 archived | registry.json |
| Source files | 40 HTML, 27.8 MB | sources/apps |
| Study readers with the shared engine | 19 | data-kd template present |
| Engine code per reader | 82,287 bytes inlined (82,285 in the engine file), byte-identical in 18; SupportScout 81,382 inlined (905 smaller, a migration) | the engine is already one program copied 19 times |
| Copied engine bytes | about 1.5 MB of 27.8 MB (about 5 percent) | real, but small; the saving is review and drift, not size |
| Ledger | 532 entries: 291 reject, 151 reference, 78 study, 9 adapt, 1 adopt, 2 unavailable | most resources are not for adoption |
| Adopt or adapt | 10: 7 applied, 2 deferred, 1 noted | little new to install |

Reading: the largest real duplication is the study engine. Apps in other families (money, games, guides, tools) share conventions but little code, so merging them would save little and widen the blast radius.

## 4. Why the stated method (X) may not serve Y

- Merging apps into fewer products puts more data under one origin and one failure, and breaks archived routes and backups. It does not reduce the code that exists, only where it sits.
- A resource survey does not lower cost unless each resource is tied to a concrete change with an owner, a test and a rollback. A list of 532 entries is not that.
- Counting menu entries rewards the wrong move. The measures that match Y are: bytes of unique maintained code, number of places one fix must be made, number of gates that can fail, and time to add the next item of a category.

## 5. Options and decision

| Option | Serves Y | Risk | Decision |
|---|---|---|---|
| A. Do nothing | no | none | rejected, drift is already shown by SupportScout |
| B. One engine source, 19 data files, builder inlines the engine into each page | yes, largest | low if output is byte-identical | DO FIRST |
| C. Typed content contracts and templates for categories likely to repeat (recipes, board rules, game guides, hardware guides) | yes | low | DO SECOND, with one real and one synthetic item |
| D. Map RepoRadar resources to named changes, role by role | yes, when tied to B or C | low | DO, small |
| E. Evidence gate for the 33 shallow app reviews, by consequence | yes, lowers risk | none | DO as test work |
| F. Merge different apps into fewer products | weak | high | NOT NOW; needs measured benefit and a data migration first |

Keep every route, alias and storage key. An app leaves the menu only by the existing archive path, never by deletion.

## 6. Success measures (for Y)

1. The 19 readers rebuild to the same bytes as before (or a documented, tested difference) from one engine file.
2. Fixing an engine defect needs one edit, one test run.
3. A new reader needs only a data file.
4. No saved data, route or address changes.
5. Gate and self-test results do not get worse; page size does not grow.
6. Each resource used is listed with its role, the change it supports and the result.

## 7. Rules carried from v23

Research does not authorize publishing. Evidence is labelled PASS, FAIL, NOT_RUN or BLOCKED and bound to one commit. Document passes certify consistency only. No deploy, GitHub edit, dependency install or data removal without the owner's explicit act. Changing HEAD voids earlier results.

## 8. Change requests

CR-24-1 to CR-24-7 in converge/change-requests/. The baseline checks are in CR-v23 (CHANGE-REQUEST-v23.md), which stays valid.

## 9. Unknowns

Whether the other families hold copy-pasted code worth sharing (UNVERIFIED; CR-24-3 measures it). Whether the A08 to A40 reviews hold errors (UNVERIFIED; CR-24-4). Whether a combined course directory page is wanted by users (UNVERIFIED; not planned).
