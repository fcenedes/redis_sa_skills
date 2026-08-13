# Plan: Osmani-Inspired Skill Improvements

## Control

- Repo: /Users/pierre/Documents/Work/redis_sa_skills
- Branch: main (new feature branch recommended before execution)
- Plan directory: docs/agent-plans/2026-08-13-osmani-inspired-improvements/
- Plan files:
  - overview: plan.md (this file)
  - tracker: tracker.md
  - coordinator prompt: coordinator-prompt.md
- Source of truth: docs/research/2026-08-13-osmani-inspired-improvements.md (change delta)
- Spec/change source: addyosmani/agent-skills (GitHub)
- Local terminology sources: README.md, CONTRIBUTING.md, existing SKILL.md frontmatter
- Goal: Fill 7 lifecycle gaps, retrofit 3 structural patterns across 17 skills, add shared references
- Non-goals: vendor Osmani files, change repo structure, build all simultaneously, replicate superpowers coverage
- Execution: plan-only
- Autonomy: autonomous
- Commit policy: not allowed
- Plan lifecycle state: planned
- Assumptions: CONTRIBUTING.md conventions hold; SKILL.md ≤150 lines; references/ for detail
- Open questions: naming (generic vs redis-prefixed, recommend generic), shared refs dir location (recommend repo root `references/`), retrofit scope (recommend all 17)

## Required Skill Stack

- `rtk-cli`: filter validation output, diffs
- `caveman`: compressed prose in SKILL.md content and worker reports
- `agent-spec-writing`: change delta already written (REQ-01 through REQ-11)
- `agent-delegation-routing`: route skill-writing workers
- `writing-skills` or `skill-creator`: skill authoring conventions

## Token Economy

- RTK: yes, for `validate-skills.sh` and grep verification output
- Caveman: lite for plans, full for worker SKILL.md content
- References: load Osmani SKILL.md via web fetch per-task, not wholesale
- Worker output: SKILL.md file + validation pass evidence
- Cleanup: none needed (new files only, no stale docs)

## Granularity Decision

- Shape: epics
- Reason: 4 ownership areas (shared refs, new skill dirs, existing skill dirs, README/integration), 3 phases, parallelizable within phases
- Epic triggers: multiple workers (yes), multiple ownership areas (yes), phases (yes)

## Parallelization

- Max parallel: 7 (one per new skill in E3; limited by agent slots)
- Wave 1: E1 (shared refs) + E2 (retrofits) — parallel, disjoint files
- Wave 2: E3 (new skills) — all 7 parallel after E1 completes (skills reference shared refs)
- Wave 3: E4 (integration + README + validation + audit) — serial, after E2+E3

---

## Epic E1: Shared Reference Checklists

- Objective: Create repo-root `references/` directory with 4 shared checklists (REQ-11)
- Source of truth: Osmani `references/` files, adapted for polyglot + Redis
- Owned areas: `references/**`
- Forbidden areas: `*/SKILL.md`, `README.md`
- Dependencies: none (foundation wave)
- Parallelizable with: E2

### Task E1.T1: Create shared reference checklists

- Objective: Write 4 files in `references/`: `definition-of-done.md`, `testing-patterns.md`, `security-checklist.md`, `observability-checklist.md`
- Worker role: Implementor (skill writer)
- Preferred worker/provider: Claude Code
- Fallback: Codex CLI
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: bounded content writing from known sources, no complex logic
- Owned files: `references/definition-of-done.md`, `references/testing-patterns.md`, `references/security-checklist.md`, `references/observability-checklist.md`
- Forbidden files: `*/SKILL.md`, `README.md`
- Inputs: Osmani reference files (fetch raw from GitHub), REQ-11 from change delta
- Steps:
  1. Fetch Osmani `references/definition-of-done.md`, `testing-patterns.md`, `security-checklist.md`, `observability-checklist.md` from GitHub
  2. Adapt each: remove JS/TS-only content, make polyglot, add Redis-specific items per REQ-11 constraints
  3. Keep each under 200 lines
  4. Write to repo root `references/` directory
- Verify with:
  - `wc -l references/*.md` — each under 200 lines
  - `grep -l "Redis" references/*.md` — Redis content present in each
  - Files exist and are valid markdown
- Output format: 4 markdown files
- Done evidence: files exist, line counts verified, Redis content confirmed

---

## Epic E2: Structural Retrofits

- Objective: Add anti-rationalization tables (REQ-08), verification checklists (REQ-09), interaction sections (REQ-10) to all 17 existing SKILL.md files
- Source of truth: existing SKILL.md files, change delta REQ-08/09/10
- Owned areas: `*/SKILL.md` (all 17 existing)
- Forbidden areas: `references/**`, new skill directories
- Dependencies: none (parallel with E1)
- Parallelizable with: E1

### Task E2.T1: Retrofit anti-rationalization tables

- Objective: Add `## Common Rationalizations` section to all 17 SKILL.md files (REQ-08)
- Worker role: Implementor (batch editor)
- Preferred worker/provider: Claude Code (needs to read each skill and write domain-specific rationalizations)
- Fallback: manual per-file editing
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: mechanical addition, content must be skill-specific but not architecturally complex
- Owned files: all 17 `*/SKILL.md`
- Forbidden files: `references/**`
- Inputs: existing SKILL.md content (read each), Osmani rationalization table pattern
- Steps:
  1. Read each of 17 SKILL.md files
  2. For each, write 4-8 skill-specific rationalizations as `| Rationalization | Reality |` table
  3. Insert `## Common Rationalizations` section before any existing `## Checklist` or at end
  4. Preserve all existing content unchanged
- Verify with:
  - `grep -r "## Common Rationalizations" */SKILL.md | wc -l` — expect 17
  - `bash scripts/validate-skills.sh` — 0 errors
- Output format: 17 modified SKILL.md files
- Done evidence: grep count = 17, validation passes

### Task E2.T2: Normalize verification checklists

- Objective: Ensure all 17 SKILL.md files have `## Verification` section with `- [ ]` items (REQ-09)
- Worker role: Implementor (batch editor)
- Preferred worker/provider: Claude Code
- Fallback: Codex CLI
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: some files already have checklists; task is normalize + fill gaps
- Owned files: all 17 `*/SKILL.md`
- Forbidden files: `references/**`
- Steps:
  1. Audit which SKILL.md files already have `## Verification` or `## Checklist` sections
  2. Normalize to `## Verification` with `- [ ]` checkbox format
  3. Ensure ≥3 items per skill, each provable by command output or file state
  4. Preserve existing checklist content where it meets quality bar
- Verify with:
  - `grep -r "## Verification" */SKILL.md | wc -l` — expect 17
  - `grep -r "\- \[ \]" */SKILL.md | wc -l` — expect ≥51 (17 × 3)
  - `bash scripts/validate-skills.sh` — 0 errors
- Output format: 17 modified SKILL.md files
- Done evidence: grep counts meet thresholds, validation passes

### Task E2.T3: Add interaction sections to cross-referencing skills

- Objective: Add `## Interaction with Other Skills` to skills that reference other skills (REQ-10)
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: relationship mapping from existing cross-references
- Owned files: all `*/SKILL.md` that reference other skills by name
- Steps:
  1. Grep all SKILL.md for backtick-quoted skill references
  2. For each referencing skill, add `## Interaction with Other Skills` section
  3. List: skill name, relationship (upstream/downstream/complementary/orthogonal), handoff trigger
  4. Skip skills with zero cross-references (e.g., caveman, rtk-cli are standalone)
- Verify with:
  - Skills that reference others have interaction sections
  - `bash scripts/validate-skills.sh` — 0 errors
- Output format: modified SKILL.md files (subset of 17)
- Done evidence: grep verification, validation passes

---

## Epic E3: New Skills

- Objective: Create 7 new skill directories with SKILL.md and references/ (REQ-01 through REQ-07)
- Source of truth: change delta REQ-01–07, Osmani skill files (fetched per-task)
- Owned areas: 7 new top-level directories
- Forbidden areas: existing skill directories, `references/` (E1 owns)
- Dependencies: E1 (new skills reference shared checklists)
- Parallelizable: all 7 skills are independent of each other

### Task E3.T1: source-driven-development

- Objective: Create `source-driven-development/SKILL.md` + references (REQ-01)
- Worker role: Implementor (skill writer)
- Preferred worker/provider: Claude Code
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: content authoring from Osmani source + Redis adaptation
- Owned files: `source-driven-development/**`
- Forbidden files: all other directories
- Inputs: Osmani `skills/source-driven-development/SKILL.md` (fetch raw), REQ-01 acceptance scenarios
- Steps:
  1. Fetch Osmani source-driven-development SKILL.md
  2. Create `source-driven-development/` directory
  3. Write SKILL.md: YAML frontmatter (per CONTRIBUTING.md), DETECT→FETCH→IMPLEMENT→CITE workflow, source hierarchy, retrieval safety, UNVERIFIED flagging, Redis-specific examples (redis-py, Redis OM, Lettuce)
  4. Keep SKILL.md ≤150 lines; move detail to `references/source-hierarchy.md`
  5. Add `## Common Rationalizations` table (6+ entries from Osmani + Redis-specific)
  6. Add `## Verification` checklist (per REQ-09 pattern)
  7. Add `## Interaction with Other Skills` section
- Verify with:
  - `wc -l source-driven-development/SKILL.md` — ≤150
  - Frontmatter has name, description, license, metadata fields
  - `bash scripts/validate-skills.sh` — 0 errors
- Output format: SKILL.md + references/
- Done evidence: file exists, ≤150 lines, frontmatter valid, validation passes

### Task E3.T2: doubt-driven-development

- Objective: Create `doubt-driven-development/SKILL.md` (REQ-02)
- Worker role: Implementor (skill writer)
- Preferred worker/provider: Claude Code
- Requested model: Sonnet-class
- Requested reasoning: medium
- Why sufficient: content authoring; CLAIM→DOUBT cycle is well-defined in Osmani source
- Owned files: `doubt-driven-development/**`
- Forbidden files: all other directories
- Steps:
  1. Fetch Osmani doubt-driven-development SKILL.md
  2. Write SKILL.md: CLAIM→EXTRACT→DOUBT→RECONCILE→STOP, adversarial reviewer prompt template, 4-tier classification, cross-model escalation, loading constraints (main session only)
  3. SKILL.md ≤150 lines; move adversarial prompt template to `references/adversarial-prompt.md`
  4. Add rationalizations, verification, interaction sections
- Verify with: same pattern as E3.T1
- Done evidence: same pattern

### Task E3.T3: performance-optimization

- Objective: Create `performance-optimization/SKILL.md` (REQ-03)
- Owned files: `performance-optimization/**`
- Steps:
  1. Fetch Osmani performance-optimization SKILL.md
  2. Write SKILL.md: MEASURE→IDENTIFY→FIX→VERIFY→GUARD, "neutral is a revert", performance attempt ledger, Redis-specific (`redis-benchmark`, `SLOWLOG`, `LATENCY HISTORY`, `INFO commandstats`)
  3. Move ledger template and anti-patterns catalog to references/
  4. Add rationalizations, verification, interaction sections
- Verify with: same pattern
- Done evidence: same pattern

### Task E3.T4: observability-and-instrumentation

- Objective: Create `observability-and-instrumentation/SKILL.md` (REQ-04)
- Owned files: `observability-and-instrumentation/**`
- Steps:
  1. Fetch Osmani observability SKILL.md
  2. Write SKILL.md: "define working before instrumenting", RED/USE, structured logging, OpenTelemetry, symptom-based alerting, two-severity rule, Redis-specific (`redis_exporter`, `MONITOR` alternatives, keyspace notifications)
  3. Reference shared `references/observability-checklist.md` from E1
  4. Add rationalizations, verification, interaction sections
- Verify with: same pattern
- Done evidence: same pattern

### Task E3.T5: shipping-and-launch

- Objective: Create `shipping-and-launch/SKILL.md` (REQ-05)
- Owned files: `shipping-and-launch/**`
- Steps:
  1. Fetch Osmani shipping-and-launch SKILL.md
  2. Write SKILL.md: pre-launch checklist, feature flag lifecycle, staged rollout with quantitative thresholds (green/yellow/red), rollback plan template, Redis-specific (Redis health checks, cluster failover consideration)
  3. Add rationalizations, verification, interaction sections
- Verify with: same pattern
- Done evidence: same pattern

### Task E3.T6: deprecation-and-migration

- Objective: Create `deprecation-and-migration/SKILL.md` (REQ-06)
- Owned files: `deprecation-and-migration/**`
- Steps:
  1. Fetch Osmani deprecation-and-migration SKILL.md
  2. Write SKILL.md: 5-question deprecation decision, Expand/Contract, Strangler pattern, Zombie Code diagnosis, Churn Rule, Redis-specific (Redis version migration 6→7→8, module compat, ACL migration)
  3. Move Expand/Contract worked example to references/
  4. Add rationalizations, verification, interaction sections
- Verify with: same pattern
- Done evidence: same pattern

### Task E3.T7: ci-cd-and-automation

- Objective: Create `ci-cd-and-automation/SKILL.md` (REQ-07)
- Owned files: `ci-cd-and-automation/**`
- Steps:
  1. Fetch Osmani ci-cd-and-automation SKILL.md
  2. Write SKILL.md: quality gate pipeline, CI feedback loop for agents, deployment strategies, feature flags, Redis-specific (Redis health checks in CI, `PING`/`INFO server` version check)
  3. GitHub Actions examples in references/
  4. Add rationalizations, verification, interaction sections
- Verify with: same pattern
- Done evidence: same pattern

---

## Epic E4: Integration, README, Validation, Audit

- Objective: Update README.md, run full validation, audit all deliveries
- Source of truth: README.md tables, CONTRIBUTING.md update rules
- Owned areas: `README.md`, plan tracker
- Forbidden areas: skill SKILL.md files (E2/E3 own)
- Dependencies: E1, E2, E3 all complete

### Task E4.T1: Update README.md

- Objective: Add 7 new skills to Available Skills table, Installation, Usage Examples, Versioning
- Worker role: Implementor
- Requested model: Sonnet-class
- Requested reasoning: low
- Why sufficient: mechanical table updates from known content
- Owned files: `README.md`
- Steps:
  1. Read current README.md
  2. Add new skills to Available Skills table in appropriate categories
  3. Update Installation command block
  4. Update Usage Examples
  5. Add version 1.0.0 rows to Versioning table
- Verify with: `bash scripts/validate-skills.sh`
- Done evidence: README sections updated, validation passes

### Task E4.T2: Full validation + audit

- Objective: Run validation, verify all REQ acceptance scenarios, audit completeness
- Worker role: Auditor
- Preferred worker/provider: Claude Code (fresh context)
- Requested model: Opus-class
- Requested reasoning: high
- Why sufficient: audit of 11 requirements needs thorough cross-checking against acceptance scenarios
- Inputs: change delta, all new/modified files, validation output
- Steps:
  1. `bash scripts/validate-skills.sh` — expect 0 errors
  2. `grep -r "## Common Rationalizations" */SKILL.md | wc -l` — expect ≥24 (17 existing + 7 new)
  3. `grep -r "## Verification" */SKILL.md | wc -l` — expect ≥24
  4. `wc -l */SKILL.md` — all ≤150 lines
  5. Verify YAML frontmatter in all 7 new SKILL.md (name, description, license, metadata)
  6. Verify shared references exist and are under 200 lines
  7. Verify README.md tables include all 7 new skills
  8. Spot-check 3 anti-rationalization tables for specificity (not generic)
  9. Spot-check 2 new skills for Redis-specific content
- Verify with: all commands above
- Gates: spec compliance, structural compliance, content quality, validation green
- Verdict: APPROVED / NOT APPROVED / BLOCKED
- Done evidence: all verification commands pass, findings documented

---

## Summary

| Epic | Tasks | Parallel | Depends on | Ownership |
|------|-------|----------|------------|-----------|
| E1: Shared refs | 1 | with E2 | — | `references/**` |
| E2: Retrofits | 3 | with E1 | — | existing `*/SKILL.md` |
| E3: New skills | 7 | all internal | E1 | 7 new directories |
| E4: Integration | 2 | serial | E1+E2+E3 | `README.md`, audit |

Total: 13 implementation tasks + 1 audit task = 14 tasks
Estimated scope: M-L per new skill (3-5 files each), S per retrofit task, S for README, M for audit
