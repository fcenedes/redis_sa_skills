# Plan: redis-sa-slides

## Control

- Repo: redis_sa_skills
- Branch: `feat/redis-sa-slides`
- Plan directory: `docs/agent-plans/2026-09-02-redis-sa-slides/`
- Plan files:
  - overview: `00-overview.md`
  - epic files: `epic-e1-skill-scaffold.md`, `epic-e2-drive-assets.md`, `epic-e3-reference-files.md`, `epic-e4-validation.md`
  - tracker: `tracker.md`
  - coordinator prompt: `coordinator-prompt.md`
- Memory persistence:
  - backend: agent_memory (if available)
  - namespace: redis-sa-agent-memory
  - user_id: pierre
  - records: plan overview, epic summaries, task status
  - status: available (check at execution)
- Source of truth: `docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md`
- Spec/change source: brainstorming session 2026-09-02
- Local terminology sources: `CONTRIBUTING.md`, `AGENTS.md`, `README.md`, existing skill SKILL.md files
- Goal: implement `redis-sa-slides` skill as a new top-level directory in `redis_sa_skills` repo, fully passing `scripts/validate-skills.sh`, with all reference files, evals, and templates ready for use
- Non-goals: populating the actual SA Slide Bank on Google Drive (separate manual task), uploading template.pptx to Drive (manual), building or modifying Google Slides API tooling, modifying existing skills
- Execution: plan-only
- Autonomy: autonomous
- Commit policy: allowed (working branch only)
- Plan lifecycle state: planned
- Assumptions:
  - Google Drive MCP tools available at runtime for the skill to function
  - SA Template Deck and SA Slide Bank will be manually created on Drive post-skill-build
  - Technical Diagram Toolkit deck ID `1p7Z3-VCsRZqEZVx1P8P2trmM8bzN6AT3_XOn7wOU72Y` is stable
  - logo.dev API token will be configured per-user, not committed
- Open questions: none

## Required Skill Stack

- Whole plan:
  - `rtk-cli`: filter validate-skills.sh output, git diffs
  - `caveman`: compressed prose for plan, worker reports
  - `agent-delegation-routing`: route tasks to workers with model/reasoning
  - `writing-skills`: skill authoring quality (RED-GREEN-REFACTOR)
- Repo/task-specific:
  - `redis-slides`: brand rules, voice, palette, typography source material
  - `redis-excalidraw-diagrams`: diagram integration reference
  - `redis-lucidchart-diagrams`: diagram integration reference

## Routing And Model Budget Rule

- Default implementation worker: Claude Code Sonnet-class medium
- Reference/docs writing: Claude Code Sonnet-class low
- Auditor: Claude Code Opus-class medium (fresh-context verification)
- No Codex subagents needed (local Claude Code execution)

## Token Economy Plan

- RTK usage: `rtk git status`, `rtk git diff` for diffs; raw fallback if RTK unavailable
- Caveman usage:
  - default mode: lite
  - worker report mode: full
  - status/tracker mode: ultra
  - must not compress: file paths, tag names, Drive IDs, hex colors, API endpoints
- References to load lazily: brand-voice.md, layout-catalog.md, charts.md only when writing brand-rules.md
- Worker output limit: files changed + verification evidence only

## Granularity Decision

- Shape: epics
- Reason: 4 distinct ownership areas (skill scaffold, Drive asset config, reference files, validation/evals), multiple reference files, needs integration verification
- Epic triggers checked:
  - ownership areas: 4 (SKILL.md, references/, scripts/, evals/)
  - phases: 2 (scaffold + content, then validation)
  - delivery surfaces: 1 (repo skill directory)

## Packet Mode Decision

- Packet mode: no
- Reason: files within each epic are tightly coupled; no benefit from file-level packet isolation

## Parallelization

- Max parallel: 2
- Decision: E1 and E3 can partially overlap (E3 references need E1 SKILL.md for cross-refs, but reference files are independently writable). E2 depends on E1 (needs Drive asset ID placeholders from SKILL.md). E4 depends on E1+E2+E3 (validates complete skill).
- Dependency waves:
  - Wave 1: E1 (skill scaffold — SKILL.md, directory structure)
  - Wave 2: E2 + E3 in parallel (Drive assets config + reference files)
  - Wave 3: E4 (validation, evals, repo integration)

## Task Tracking

- Tracker file: `docs/agent-plans/2026-09-02-redis-sa-slides/tracker.md`
- Task status values: planning / running / blocked / failed / done / audited

## Epics

### Epic E1: Skill scaffold

Create the `redis-sa-slides/` directory with `SKILL.md` core instructions, proper frontmatter, authority, workflow, DO NOT, verification checklist. Keep SKILL.md under 150 lines per repo convention.

- Source of truth: design spec + CONTRIBUTING.md + AGENTS.md
- Owned areas: `redis-sa-slides/SKILL.md`
- Forbidden areas: all other skill directories
- Dependencies: none (first wave)
- Acceptance criteria:
  - SKILL.md exists with valid frontmatter (name, description, license, metadata.author, metadata.version)
  - Under 150 lines
  - Has Authority, Required Workflow, DO NOT, Verification, Reference Index sections
  - References all files in `references/` by relative link

### Epic E2: Drive assets and templates

Create `references/drive-assets.md` (with placeholder Drive IDs for template and bank, real ID for Toolkit), `references/logo-lookup.md`, `references/diagram-decision-tree.md`, and `templates/deck-outline-tdd.md`.

- Source of truth: design spec sections on Drive assets, logo flow, diagram tree
- Owned areas: `redis-sa-slides/references/drive-assets.md`, `redis-sa-slides/references/logo-lookup.md`, `redis-sa-slides/references/diagram-decision-tree.md`, `redis-sa-slides/templates/`
- Forbidden areas: all other skill directories
- Dependencies: E1 (SKILL.md must exist for cross-references)
- Acceptance criteria:
  - drive-assets.md lists 3 Drive assets with ID fields (Toolkit ID real, others placeholder `[TODO: ...]`)
  - logo-lookup.md documents API + web search fallback flow
  - diagram-decision-tree.md documents GSlides vs Excalidraw vs Lucid decision logic
  - deck-outline-tdd.md is a copy-ready TDD outline

### Epic E3: Reference content files

Create the content-heavy reference files: `references/brand-rules.md`, `references/sa-slide-catalog.md`, `references/deck-archetypes.md`, `references/tdd-quality-rubric.md`.

- Source of truth: design spec + redis-slides skill (palette, voice, typography) + TDD rubric from brainstorming
- Owned areas: `redis-sa-slides/references/brand-rules.md`, `redis-sa-slides/references/sa-slide-catalog.md`, `redis-sa-slides/references/deck-archetypes.md`, `redis-sa-slides/references/tdd-quality-rubric.md`
- Forbidden areas: all other skill directories, redis-slides skill files
- Dependencies: E1 (SKILL.md cross-refs)
- Parallelizable with: E2 (disjoint files)
- Acceptance criteria:
  - brand-rules.md covers palette (8 colors with hex), voice (10 rules), typography (2 fonts)
  - sa-slide-catalog.md lists all 20 categories with tag format, slide types
  - deck-archetypes.md has 5 archetypes (TDD, POC Results, Architecture Review, QBR, ROI)
  - tdd-quality-rubric.md has full 4-section rubric with Before/After Architecture, Pain Validation, POC Plan Review

### Epic E4: Validation, evals, and repo integration

Create `scripts/validate-deck.py`, `evals/output_rubric.md`, `evals/trigger_queries.json`. Update `README.md` (4 sections per CONTRIBUTING.md). Run `scripts/validate-skills.sh`.

- Source of truth: design spec + CONTRIBUTING.md + existing eval patterns (redis-excalidraw-diagrams/evals/)
- Owned areas: `redis-sa-slides/scripts/`, `redis-sa-slides/evals/`, `README.md` (redis-sa-slides entries only)
- Forbidden areas: all other skill directories, other README sections
- Dependencies: E1+E2+E3 (validates complete skill)
- Acceptance criteria:
  - validate-deck.py checks placeholder remnants and brand violations
  - output_rubric.md has 11 scoring criteria matching existing eval pattern
  - trigger_queries.json has 10+ queries (6+ should-trigger, 4+ should-not-trigger)
  - README.md updated in Available Skills, Installation, Usage Examples, Versioning
  - `bash scripts/validate-skills.sh` passes for redis-sa-slides

## Integration

- Integrator: coordinator (plan author)
- Shared files: `redis-sa-slides/SKILL.md` (E1 creates, E2-E4 cross-reference)
- Conflict risks: low — epics own disjoint files except SKILL.md Reference Index (E1 writes, others verify)
- Final quality gate: `bash scripts/validate-skills.sh` + manual SKILL.md review

## Documentation Cleanup

- Cleanup owner: coordinator
- Keep: plan files as delivery evidence
- Archive: after all tasks audited, move to `docs/archive/` if repo policy requires

## Final Review

- Auditor task: E4.AUDIT
- Preferred audit path: fresh-context Claude Code agent reads spec, reads produced files, runs validate-skills.sh, checks AC-1 through AC-10 from spec
- Required evidence: validate-skills.sh green, all reference files exist, SKILL.md under 150 lines, frontmatter valid, README updated
