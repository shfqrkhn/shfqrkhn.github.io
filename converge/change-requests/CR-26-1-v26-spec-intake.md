# CR-26-1: intake of the v26 operating specification

Status: partly applied. Source: an external operating specification (v26, 1,194 lines) written against an earlier snapshot of this repository. It states that it is analysis and planning, not permission to edit; this repository applies only what it can verify itself.

| v26 point | Check here | Disposition |
| --- | --- | --- |
| DecisionDesk asks for persistent storage without handling a rejected promise | Confirmed in the source (`putRecord`) | Fixed: the call is wrapped so a rejection is ignored (best effort, as before) |
| SupportScout migration sets `oldProgressFound` unchecked | The flag is set only when the old data parses to non-empty cleaned progress | No change; kept on the watch list |
| 16 owner-added ledger records absent from the shipped Catalogue | Known and queued for RepoRadar 4.3.2 | Owner item |
| Review depth of the 33 later apps is shallower | Known (CR-24-4) | Open, tracked in `v24-depth.json` |
| New checker fixtures and extra published file types | Not reproduced here | Watch list |
| Four new candidate repositories from bookmarks | Research only | Not adopted |

Reason: apply a verified one-line fix, keep the rest as recorded evidence, change nothing that needs a primary source or an owner decision.
