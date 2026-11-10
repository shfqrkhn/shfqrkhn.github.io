# CR-24-5: rule for changing the number of apps

**Problem (Y):** the app count is being used as a goal, but fewer menu entries do not by themselves cut cost or risk.

**Change:** add one short rule to docs/FRAMEWORK.md (only if it fits the 49,830 byte budget, otherwise to the next release notes): an app is merged, archived or kept by these measures, in order: (1) unique maintained code removed, (2) saved data and routes preserved, (3) blast radius not increased, (4) user purpose kept. Archiving uses builder/archive.py; nothing is deleted.

**Acceptance:** the rule is present; check_docs.py passes; no app changes status in this CR.

**Rollback:** revert the doc edit.

**Risk:** FRAMEWORK is at 49,828 bytes: 172 under the 50,000 gate and 2 under the working margin of 49,830, so almost no room. Mitigation: place it in sources/method or the change log, or trim another sentence of equal size.
