# CR-24-3: measure duplication in the other families, then add content contracts

**Status:** planned (not started).

**Problem (Y):** the money, game, guide and tool families may repeat code or content structure. This is UNVERIFIED; merging on a guess would add risk for no gain.

**Change, step 1 (measure only):** a read-only script converge/dupes.py reports, per family, shared inline script and style bytes between sources (exact blocks above 2 KB). Output is a table.

**Step 2 (only where step 1 shows a block shared by three or more sources):** propose a shared build-time include, as in CR-24-1.

**Step 3 (contracts):** write small versioned data contracts and a template for recipes, board-game rules, game guides and hardware guides. Validate with the one existing item and one synthetic item. Do not add a runtime, a merged app or a new datastore.

**Acceptance:** the table exists; any shared include produces byte-identical pages or listed differences; the synthetic item builds and is removed afterwards.

**Rollback:** delete the script and contracts.

**Risk:** over-abstracting a single instance. Mitigation: no contract is adopted unless it removes manual branching today.
