# Tracker: redis-sa-slides

| Task | Epic | Owner | Status | Evidence |
|------|------|-------|--------|----------|
| E1.T1 | E1 | Implementor | done | `wc -l redis-sa-slides/SKILL.md` = 94; frontmatter counts name/description/license = 1; required sections Authority/Required Workflow/DO NOT/Verification/Reference Index = 1 each |
| E2.T1 | E2 | Implementor | done | `drive-assets.md` exists; USER_PROVIDED_REQUIRED gates added; `grep -c 1p7Z3` = 1; pre-use instructions documented |
| E2.T2 | E2 | Implementor | done | `logo-lookup.md` and `diagram-decision-tree.md` exist; `logo.dev` = 5; `excalidraw` = 2; `lucidchart` = 2 |
| E2.T3 | E2 | Implementor | done | `deck-outline-tdd.md` exists; `grep -c SA-BANK` = 27 |
| E3.T1 | E3 | Implementor | done | `brand-rules.md` exists; `#FF4438` = 2; `Space Grotesk` = 4; `Sentence case` = 1 |
| E3.T2 | E3 | Implementor | done | `sa-slide-catalog.md` exists; 94 unique SA-BANK tags (25 added for archetype coverage); 20 categories; 0 missing refs from archetypes/template |
| E3.T3 | E3 | Implementor | done | `deck-archetypes.md` exists; 5 archetypes; all tags reconciled with catalog (11 renames applied) |
| E3.T4 | E3 | Implementor | done | `tdd-quality-rubric.md` exists; sections 1-4 counts = 1 each; `ANSWERED` = 14; POC checklist items = 8 |
| E4.T1 | E4 | Implementor | done | `validate-deck.py` exists; `--help` exits 0; synonym check flags "quick" as warning; `--allow-reported-gaps` skips permitted TODOs; best-effort font/cube checks added |
| E4.T2 | E4 | Implementor | done | eval files exist; `trigger_queries.json` parses as 12 entries with expected eval keys |
| E4.T3 | E4 | Implementor | done | README mentions `redis-sa-slides` 6 times; `bash scripts/validate-skills.sh` exits 0 with 25 skills, 0 errors, 1 TODO warning reviewed as intentional/existing |
| E4.AUDIT | E4 | Auditor | failed | Audit verdict NOT APPROVED at f169857. Repairs applied: drive-assets USER_PROVIDED_REQUIRED gates, 25 tags added to catalog, 11+13 tag renames in archetypes/template, validator synonym/font/cube/gap-allowlist added. Re-audit pending. |
