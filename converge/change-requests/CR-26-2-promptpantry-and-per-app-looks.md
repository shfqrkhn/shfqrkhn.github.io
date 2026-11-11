# CR-26-2: PromptPantry Library and per-app looks

Status: PromptPantry applied; per-app looks started. Source: the owner's specification for a private prompt library (kept outside the repository) and two later requests: it must not look like generic AI output, and each app should get a look of its own while keeping a path back to the hub.

| Decision | Reason |
| --- | --- |
| Build PromptPantry as one offline page on the kit, stored in localStorage with a read-back check | Same stack as every app; no new dependency; a failed save is shown, never hidden |
| Do not vendor the glass-refraction or animation libraries the draft named | No installs; the same effects come from native CSS and the Web Animations API; licence and rights review stays an owner item |
| Drop blur, body gradients, pill buttons and nested cards from the first draft | RepoRadar design studies (slop checklist, review vocabulary, gate tiers) and the owner's feedback; hairline borders, 4px grid, one accent, weights 400 to 500 |
| Starter prompts are six original ones; the owner's own sample stays out of the repository | Rights and privacy rule in the specification |
| A look is chosen from the app's subject, then built from native features | Studied repositories pick palette, type and effects by subject; their web fonts are not allowed here, so system stacks are used |

Look system, applied per app on top of the shared kit (header, home link, looks, tokens, contrast gate):

1. A subject metaphor decides layout, type, shape and motion, not only the accent.
2. Native features only, each with a fallback: container queries, view transitions, Web Animations, popover and dialog, `color-mix`, SVG, canvas where the subject needs it.
3. Motion respects reduced motion; nothing loops; hover effects sit behind a hover media query.
4. Every look passes the contrast, page-quality, kit and PWA gates in all four looks.

PromptPantry: recipe-card serif titles, a ruled index-card preview with a margin rule, dashed shelf rules, label tags with a punched hole, a shelf grid that follows its container width, a view transition between list and card, and a stamp on copy. Hub: a Zen look is planned. Other apps: one at a time, recorded here as done.

Studied, not copied: heydamir/unslop (CC BY 4.0, idea credit), pbakaus/impeccable, jakubkrehel/skills, Nutlope/hallmark, Leonxlnx/taste-skill, nextlevelbuilder/ui-ux-pro-max-skill, cathrynlavery/diagram-design, google-labs-code/design.md, frankxai/awesome-motion-design-agent-skills. Only landing pages were read; deeper rule files are unread. Ledger records already carry their dispositions.

Owner items: confirm the app name and icon; decide on any glass or animation library (rights review first).

## Rollout record

- 2026-11-11, hub: Zen look (open ring mark, lowercase spaced name, no shadows, hairlines, slow fade-in under no-preference motion). Kit tokens only; all gates pass in 4 looks.
- 2026-11-11, batch 1 (kit selectors only, system fonts, reduced-motion and forced-colors paths, no overflow at 375/768/1024/1440 in four looks, no console errors): StepSleuth (trail: dashed path, footprint dots), TickleTodo (notepad: ruled paper, margin rule), PennyPlanner (ledger: double rules, green-bar rows), NestEggNinja (nest: rounded egg curves, growth underline), FlexxFiles (gym floor: stamped caps, plate-edge bars).
- 2026-11-11, batch 2 (same checks): NoodleNudge (ramen bowl: bowl-shaped cards, rounded type), WorldCupWizard (pitch: stripe bands, chalk borders, scoreboard numerals), AuctionAcademy (auction house: serif lots, double bid-card rule), DecisionDesk (briefing desk: memo rule, small-caps labels), MeetingMediator (round table: soft circles, calm weights).
- 2026-11-11, batch 3 (same checks): BoonBuilder (shrine slabs, carved caps, notched corner), BuildBoss (workbench blueprint grid), EggspressEats (kitchen card, egg curves, yolk-dot rule), HandheldHunter (console bezel cards), MeepleMentor (rulebook serif, double page edge).
- 2026-11-11, batch 4 (same checks): SproutScheduler (seed-packet leaf corners, soil rule), StreamScholar (lecture hall caption bars), AllyAce (controller grip cards), DrumDeck (drum-head arcs, beat caps), GearGuardian (maintenance bay, hazard-stripe edge, forced-colors fallback).
