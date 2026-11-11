# CR-24-6: learning method review of the 19 study readers

**Status:** step 1 done (audit receipt, local): retrieval, spacing, interleaving and feedback exist; three gaps were listed. One is built: a self-explanation prompt and a confidence rating (Guessing, Think so, Sure) before each answer, kept for the session only, with a calibration note after the mark. A light pre-test is built too: each chapter with unanswered questions offers a Try the questions first button that jumps to them. A scored mastery check that adapts the path is not built.

**Why:** the courses exist to teach. Whether the shared engine uses the best-supported methods (retrieval practice, spaced review, interleaving, worked examples, immediate feedback, mastery checks) is not measured here. Evidence for these methods is broad (for example the 2013 review "Improving Students' Learning With Effective Learning Techniques"); verify the current primary sources before relying on any claim.

**Change (audit first, build second):**
1. List which of those methods the engine already supports, quoting the code and data field for each, and which it lacks. Output: converge/receipts/v24-learning.json (created when this runs; receipts are local).
2. For each gap, write the smallest engine feature with a test (for example review scheduling from stored results, mixed-topic practice, a pre-test that skips mastered chapters).
3. Land engine changes once, in the shared engine (CR-24-1), so all 19 readers inherit them; no per-reader copies.

**Not changing:** content truth, routes, storage keys of existing progress (new keys only add), the number of apps.

**Acceptance:** audit receipt exists with a quote per row; each new feature has a passing test and a rollback; stored progress from before loads unchanged; page size growth is stated.

**Risk:** features that look good but do not help learning. Mitigation: keep each behind a setting until the owner reviews it.
