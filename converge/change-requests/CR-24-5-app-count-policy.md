# CR-24-5: rule for changing the number of apps

**Status:** done: the rule is in converge/RADAR.md (kept there by choice; FRAMEWORK now has room under its 300,000 byte gate).

**Problem (Y):** the app count is being used as a goal, but fewer menu entries do not by themselves cut cost or risk.

**Change:** add one short rule to docs/FRAMEWORK.md (only if it fits the FRAMEWORK gate (300,000 bytes since 2026-11-12); otherwise to the next release notes): an app is merged, archived or kept by these measures, in order: (1) unique maintained code removed, (2) saved data and routes preserved, (3) blast radius not increased, (4) user purpose kept. Archiving uses builder/archive.py; nothing is deleted.

**Acceptance:** the rule is present; check_docs.py passes; no app changes status in this CR.

**Rollback:** revert the doc edit.

**Risk:** FRAMEWORK now has ample room under its 300,000 byte gate (measure with wc -c), so this risk is closed.
