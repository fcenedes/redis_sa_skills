# Plan: Fable 5 Skill Hardening

- **Date:** 2026-07-05
- **Repo:** redis_sa_skills (worktree: `pensive-kirch-12fedb`, branch: `claude/pensive-kirch-12fedb`)
- **Source of truth:** [spec.md](spec.md) (Fable 5 patterns P1-P6), [skill-evaluation-report.md](../../skill-evaluation-report.md), AGENTS.md, and the 6-pattern analysis from user's Fable 5 field notes.
- **Supersedes:** [`2026-07-05-codex-followup-skill-hardening/plan.md`](../2026-07-05-codex-followup-skill-hardening/plan.md) — this plan subsumes all 6 original tasks (trimming, compatibility, benchmark, pycache) and adds Fable 5 hardening scope. Original plan status: `superseded`.
- **Non-goals:** No new skills. No commits/pushes. No `description:` frontmatter changes (benchmarked).
- **Execution mode:** `plan-only` — user will paste coordinator-prompt.md into Codex CLI.
- **Autonomy (once started):** `autonomous` — dispatch all waves, audit inline, return only on true decision-blockers.
- **Commit policy:** `not allowed`.
- **Plan granularity:** Task-only. 8 bounded tasks from one spec + one residual-risk report, single worker family, single repo/branch.

## Spec Reference

Read [spec.md](spec.md) before starting any task. It defines:
- P1 (contract over recipe), P2 (authority boundary), P3 (sub-agent dispatch threshold), P4 (tool-result anchoring), P5 (effort calibration), P6 (anti-pitfalls).
- Per-skill change map showing which patterns apply to which skill.

The spec is the authoritative source for what each pattern means and how to apply it. Task contracts below say *where*; the spec says *what* and *why*.

## Parallelization

`max_parallel: 7`. T1–T7 own disjoint file sets (verified below). T8 (Auditor) serial after all 7.

| Task | Owned files/dirs |
|---|---|
| T1 | `agent-delegation-planning/*`, `agent-delegation-routing/*` |
| T2 | `agent-capability-ledger/*` |
| T3 | `docs/skill-evaluation-report.md` §8, `benchmark-results/` (read-only on all 17 skills) |
| T4 | `redis-lucidchart-diagrams/SKILL.md`, `agent-memory-coordination/*` |
| T5 | `agent-memory-docker/scripts/__pycache__/`, `.gitignore` |
| T6 | `AGENTS.md` |
| T7 | `caveman/*`, `rtk-cli/*`, `redis-brand-ui/*`, `redis-product-ui/*`, `redis-presentation-decks/*`, `redis-excalidraw-diagrams/*`, `redis-insight-plugin/*`, `playwright-test/*`, `playwright-cli-agent/*`, `agent-spec-writing/*`, `agent-plan-lifecycle/*`, `agent-memory-docker/SKILL.md` + `references/*` |

T5 and T7 both touch `agent-memory-docker/` but on disjoint paths: T5 deletes `scripts/__pycache__/` and appends to `.gitignore`; T7 edits `SKILL.md` and `references/`.

## Skill stack (whole plan)

- `rtk-cli`: noisy shell output.
- `caveman lite`: coordinator status updates and final report.
- `agent-delegation-routing`: consult before dispatch.
- No UI/frontend/browser work — Playwright mandate does not apply.

## Token economy

Same rules as the superseded plan. Cite paths and line counts; no raw logs, full diffs, or SKILL.md pastes in reports.

## Coordinator blocker handling

Same as superseded plan plus: if applying a Fable 5 pattern would push a skill beyond its current line count by more than 10 lines, extract existing prose to `references/` first. If a skill already exceeds 150L and the Fable 5 additions would worsen it, extract first, then add. If extraction is impossible without losing guardrails, record the exception and the achieved line count.

---

## Task Contracts

### T1 — Trim + Fable-harden agent-delegation-planning + agent-delegation-routing

- **Objective:** (a) Reduce both SKILL.md files toward ≤150 lines via extraction to `references/`. (b) Apply Fable 5 patterns P1, P2, P3, P4, P6 per spec.md change map. (c) Update `agent-delegation-routing/references/routing-table.md` with Fable 5 model guidance (P5).
- **Reasoning effort:** `high` — this is the largest change (580L across 2 SKILL.md + routing-table.md), requires judgment on what to convert from recipe to contract, and must preserve semantic correctness.
- **Owned files:** `agent-delegation-planning/SKILL.md`, `agent-delegation-planning/references/*.md`, `agent-delegation-routing/SKILL.md`, `agent-delegation-routing/references/*.md` (including `routing-table.md`).
- **Forbidden files:** all other skill directories, `scripts/`, `AGENTS.md`, `README.md`.
- **Exact changes — agent-delegation-planning:**
  1. **P1 — Required Shape:** the 28-item checklist in "Required Shape" is a contract, not a tutorial. Replace the bulleted enumeration with a brief contract declaration: "Every plan is a binding ownership, routing, skill, and verification contract. It must declare these fields: [compact table or one-liner list]. Detailed field definitions and templates: see [plan-template.md]." Move field-by-field prose that already lives in plan-template.md out of SKILL.md body.
  2. **P1 — Execution/Autonomy:** the prose blocks explaining execution-start vs autonomy contain worked examples and edge-case qualifications. Keep the 3-sentence core rule; move examples to a reference.
  3. **P2 — Authority boundary:** add a 3-line `## Authority` section (or integrate into existing DO NOT): "Authorized: write plan files, post to agent_memory, dispatch workers when Execution: start-now. Requires user request: start execution when plan-only, commit/push, expand scope beyond the declared plan."
  4. **P3 — Fresh-context verifiers:** in the Audit section, add: "Prefer spawning a fresh verification agent with no prior context over self-reviewing. Fresh-context verifiers catch claim-vs-evidence mismatches that self-review misses."
  5. **P4 — Tool-result anchoring:** in the Audit section, add: "Before reporting completion, the Auditor must re-run verification commands independently. Claims without tool-result evidence from this session are not accepted."
  6. **P6 — Anti-blocking:** in the Autonomy section, add: "When autonomous: proceed without asking for reversible actions that follow from the request. Stop only for destructive actions, genuine scope changes, or decisions the user must make."
  7. Do NOT touch the `description:` frontmatter field.
- **Exact changes — agent-delegation-routing:**
  1. **P1 — Routing Matrix:** the 6-sentence routing matrix in SKILL.md body is a condensed summary of routing-table.md. Keep it as a brief decision table; do not expand into prose. Add one sentence: "These defaults are calibrated per model generation. See routing-table.md for model-specific effort guidance."
  2. **P2 — Authority boundary:** add 3 lines to DO NOT or new Authority section: "Authorized: recommend worker/model/reasoning for tasks in an existing plan. Not authorized: create the plan itself (use agent-delegation-planning), dispatch without a plan, commit/push."
  3. **P3 — Dispatch threshold:** add to body or reference: "Dispatch sub-agents only when work is genuinely parallel and file-disjoint. For sequential single-file tasks, execute directly. Over-delegation wastes tokens and obscures accountability."
  4. Do NOT touch the `description:` frontmatter field.
- **Exact changes — routing-table.md (P5):**
  1. Update the opening paragraph: change "As of the 2026-05 guidance" to "As of the 2026-07 guidance" and add: "Anthropic's Fable 5 (Mythos class) is above Opus in capability; effort (not rule density) is the primary control lever."
  2. Add a new `## Fable 5 (Claude Code)` section after the existing `## Claude` section:
     ```markdown
     ## Fable 5 (Claude Code)

     Fable 5 is Anthropic's Mythos-class model, above Opus in capability.
     Control model: contract-based. Define objective, success criteria,
     authority boundary, and obligation of proof. Do not compensate with
     step-by-step recipes — Fable either follows them rigidly (even when
     they're wrong for the task) or contests them mid-task.

     Effort is the primary lever:

     | Effort | Use for | Notes |
     |--------|---------|-------|
     | low | Grep, summaries, tiny docs, simple edits | Fable low ≥ previous-gen xhigh for routine work. |
     | medium | Normal bounded coding, tests, docs, fixes | Default for most worker tasks. |
     | high | Multi-file implementation, integration, debugging | Default for coordinators and non-trivial work. |
     | xhigh | Architecture, subtle regression, security, final verification | Use sparingly — over-deliberation on routine work. |

     Before adding rules to control Fable behavior, lower effort first.
     At high effort on routine work, Fable over-collects context and
     deliberates beyond the task's needs.

     Fresh-context verifiers outperform self-review. For final gates,
     spawn a new verification agent rather than re-checking your own work.

     Anti-pitfalls:
     - Do not include "explain your reasoning" or "show your thinking" in
       prompts — this can trigger reasoning_extraction refusal and fall
       back to Opus 4.8.
     - For autonomous pipelines, add: "You operate autonomously. For
       reversible actions that follow from the request, proceed without
       asking."
     - In long sessions, do not suggest ending or summarizing to save
       context — continue until the task is complete.
     ```
  3. Update the `## Claude` model table to add a Fable 5 row:
     ```
     | Fable 5 | Everything Opus does, with stronger instruction-following and autonomous execution. Default for Claude Code. | Step-by-step recipes (follow the contract model instead), "explain your reasoning" prompts. |
     ```
  4. Update `## Default Team Setup` to include Fable 5.
- **Verify commands:**
  ```bash
  wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md
  git diff --stat -- agent-delegation-planning agent-delegation-routing
  bash scripts/validate-skills.sh
  # Description unchanged:
  git diff -- agent-delegation-planning/SKILL.md | grep -c "^[+-].*description:"
  git diff -- agent-delegation-routing/SKILL.md | grep -c "^[+-].*description:"
  # Fable 5 section exists in routing table:
  grep -c "Fable 5" agent-delegation-routing/references/routing-table.md
  ```
  Target: both SKILL.md ≤150L (or documented exception). Description grep must return 0. Fable 5 grep must return ≥1.
- **Done evidence:** wc -l before→after, validator clean, description untouched, routing table has Fable 5 section.

### T2 — Trim + Fable-harden agent-capability-ledger + add compatibility

- **Objective:** (a) Reduce SKILL.md toward ≤150 lines. (b) Add top-level `compatibility:` field. (c) Apply P2 (authority boundary), P4 (tool-result anchoring in proof taxonomy).
- **Reasoning effort:** `medium`.
- **Owned files:** `agent-capability-ledger/SKILL.md`, `agent-capability-ledger/references/*.md`.
- **Exact changes (Fable 5, in addition to original trimming + compatibility):**
  1. **P2:** Add 3-line authority: "Authorized: create/update ledger rows from repo evidence. Requires explicit request: delete delivered rows, change proof class without new evidence, override repo evidence with memory claims."
  2. **P4:** In `references/proof-taxonomy.md`, add `tool-result` as a proof class: "Proof anchored to a specific tool output (command result, file read, test output) from the current session. Stronger than `self-report`; required for `done` and `audited` status."
- **Verify commands:**
  ```bash
  wc -l agent-capability-ledger/SKILL.md
  awk '/^---$/{c++} c==1' agent-capability-ledger/SKILL.md | grep -c '^compatibility:'
  grep -c "tool-result" agent-capability-ledger/references/proof-taxonomy.md
  bash scripts/validate-skills.sh
  ```
- **Done evidence:** ≤150L (or documented exception), compatibility count = 1 top-level, proof-taxonomy has tool-result, validator clean.

### T3 — Live benchmark all 17 skills

Unchanged from superseded plan. See [../2026-07-05-codex-followup-skill-hardening/plan.md](../2026-07-05-codex-followup-skill-hardening/plan.md) T3 for full contract. Key points:
- `blocked for environment` is expected and acceptable — record per-skill, keep LLM-judged row for that skill.
- Read-only on all 17 skills' SKILL.md and evals/. Do not apply any run_loop.py-proposed changes.
- Edit only §8 of `docs/skill-evaluation-report.md`.

### T4 — Add compatibility + Fable-harden redis-lucidchart-diagrams + agent-memory-coordination

- **Objective:** (a) Add top-level `compatibility:` to both skills (original scope). (b) Apply P2 (authority boundary) to both. (c) Apply P3 (async patterns) to agent-memory-coordination.
- **Reasoning effort:** `medium`.
- **Owned files:** `redis-lucidchart-diagrams/SKILL.md`, `agent-memory-coordination/SKILL.md`, `agent-memory-coordination/references/*.md`.
- **Exact changes (Fable 5, in addition to original compatibility):**
  1. **redis-lucidchart-diagrams P2:** Add to DO NOT or Authority: "Authorized: generate Lucid Standard Import packages for Redis diagrams. Not authorized: execute arbitrary Python, modify files outside the diagram output directory."
  2. **agent-memory-coordination P2:** Add Authority: "Authorized: read/write agent_memory, dispatch workers with scoped prompts, coordinate file ownership. Not authorized: commit/push, access secrets, dispatch without an ownership plan."
  3. **agent-memory-coordination P3 — Async patterns:** Add section or extend existing body: "Prefer async orchestrator↔worker communication: dispatch all independent workers, then collect results. Do not block waiting for each sub-agent return when results are independent. For verification: spawn fresh-context verifiers rather than self-reviewing dispatcher results."
- **Verify commands:**
  ```bash
  awk '/^---$/{c++} c==1' redis-lucidchart-diagrams/SKILL.md agent-memory-coordination/SKILL.md | grep -c '^compatibility:'
  grep -ci "authority\|authorized" agent-memory-coordination/SKILL.md
  bash scripts/validate-skills.sh
  ```

### T5 — Pycache cleanup

Unchanged from superseded plan. Delete `agent-memory-docker/scripts/__pycache__/`, add `__pycache__/` + `*.pyc` to `.gitignore`.

### T6 — AGENTS.md: Fable 5 conventions

- **Objective:** Add Fable 5 guidance to AGENTS.md so all skills inherit the conventions.
- **Reasoning effort:** `medium`.
- **Owned files:** `AGENTS.md` only.
- **Forbidden files:** all skill directories, `scripts/`, `README.md`.
- **Exact changes:**
  1. **New section `## Fable 5 Control Model`** after the existing "Model and Cost Optimization" section. Content:
     ```markdown
     ## Fable 5 Control Model

     Fable 5 (Mythos-class) is the most capable Claude model. It drifts by
     strength, not weakness: it evaluates rules instead of blindly following
     them. Control comes from contracts, not prescriptions.

     ### Authority Boundary Convention

     Every skill must declare its scope of initiative:
     - What actions it may take autonomously.
     - What requires explicit user request.
     - Default: when the user describes a problem without requesting a change,
       the deliverable is the assessment. Report and stop.

     ### Tool-Result Anchoring

     Progress and completion claims must cite tool results from the current
     session. Checklists must be provable by command output or file read, not
     by memory or prior conversation. Auditors re-run verification commands
     independently.

     ### Effort as Primary Lever

     Before adding rules to control model behavior, lower reasoning effort.
     Fable at low effort outperforms previous-gen models at xhigh for routine
     tasks. High effort on routine work causes over-collection and
     over-deliberation.

     ### Anti-Pitfalls

     - Do not include "explain your reasoning" or "show your thinking" in
       skill instructions — can trigger reasoning_extraction refusal.
     - For autonomous pipelines: "proceed without asking for reversible
       actions that follow from the request."
     - In long sessions: do not suggest ending or summarizing to save context.
     ```
  2. **Update "Skill Requirements"** to add: `- Explicit authority boundary (what the skill may do autonomously vs. what requires user request).` after the existing `- A final checklist agents can run through before declaring the task done.`
  3. **Update "Model and Cost Optimization"** to add a Fable 5 entry in context: mention that Fable 5 is the Claude Code default, with effort as the primary lever, and point to `agent-delegation-routing/references/routing-table.md` for detailed routing.
- **Verify commands:**
  ```bash
  grep -c "Fable 5" AGENTS.md
  grep -c "authority boundary" AGENTS.md
  grep -c "tool-result" AGENTS.md
  bash scripts/validate-skills.sh
  ```
- **Done evidence:** Fable 5 section exists, authority boundary in Skill Requirements, validator clean.

### T7 — Fable 5 hardening: remaining 12 skills

- **Objective:** Apply Fable 5 patterns to the 12 skills not covered by T1, T2, or T4.
- **Skills:** caveman, rtk-cli, redis-brand-ui, redis-product-ui, redis-presentation-decks, redis-excalidraw-diagrams, redis-insight-plugin, playwright-test, playwright-cli-agent, agent-spec-writing, agent-plan-lifecycle, agent-memory-docker.
- **Reasoning effort:** `medium` — bounded, mechanical per skill, but 12 files.
- **Owned files:** all 12 skills' `SKILL.md` files and `references/*.md`.
- **Forbidden files:** `agent-delegation-planning/*`, `agent-delegation-routing/*`, `agent-capability-ledger/*`, `redis-lucidchart-diagrams/SKILL.md`, `agent-memory-coordination/*`, `AGENTS.md`, `.gitignore`.
- **Per-skill changes (refer to spec.md per-skill map for which patterns apply):**
  1. **P2 — Authority boundary (all 12):** Add a 2-4 line `## Authority` section or integrate into existing DO NOT. Use the pattern from spec.md. Examples:
     - caveman: "Authorized: compress prose in the active mode. Not authorized: compress code, alter tool output, change mode without user trigger."
     - rtk-cli: "Authorized: wrap shell command output for token reduction. Not authorized: filter out errors, suppress exit codes, alter command semantics."
     - redis-insight-plugin: "Authorized: scaffold, build, and validate plugins. Not authorized: deploy to production without user confirmation, run destructive Redis commands."
     - playwright-cli-agent: "Authorized: drive browsers against dev/staging. NEVER interact with production without explicit confirmation." (strengthen existing prod guardrail as authority boundary)
     - agent-spec-writing: "Authorized: write spec/delta files. Not authorized: apply specs as implementation, archive without evidence."
     - agent-plan-lifecycle: "Authorized: advance plan state based on evidence. Not authorized: mark promoted/archived without auditor approval."
     - agent-memory-docker: "Authorized: generate Docker Compose configs and env templates. Not authorized: start/stop Docker containers, modify host network."
  2. **P1 — Contract gates (redis-insight-plugin only):** The 3-phase workflow (Vanilla → React → Full) must be declared as mandatory gates: "These three phases are mandatory verification gates, not a tutorial. Each phase proves a specific contract (iframe wiring, React mounting, library integration). Skipping a phase means skipping its proof — the next phase will fail in ways that are harder to diagnose."
  3. **P4 — Tool-result anchoring (all 12 that have checklists):** Add to each skill's final checklist preamble: "Each item must be proved by a command output or file read from this session, not by memory or prior conversation."
  4. **P6 — Session continuity (agent-plan-lifecycle):** Add: "Do not suggest ending the session to save context. Continue lifecycle operations until the plan reaches a terminal state or you are genuinely blocked."
  5. **Do NOT touch any `description:` frontmatter field.**
  6. **Line budget discipline:** if a skill is at or above 150L and the additions push it over, extract existing prose to `references/` first. Current over-budget skills in this group: redis-insight-plugin (213L), playwright-cli-agent (150L). For these, extract first, then add Fable 5 content. Other skills in this group are under 150L and have room.
- **Verify commands:**
  ```bash
  wc -l caveman/SKILL.md rtk-cli/SKILL.md redis-brand-ui/SKILL.md redis-product-ui/SKILL.md redis-presentation-decks/SKILL.md redis-excalidraw-diagrams/SKILL.md redis-insight-plugin/SKILL.md playwright-test/SKILL.md playwright-cli-agent/SKILL.md agent-spec-writing/SKILL.md agent-plan-lifecycle/SKILL.md agent-memory-docker/SKILL.md
  # Authority boundary exists in each:
  for s in caveman rtk-cli redis-brand-ui redis-product-ui redis-presentation-decks redis-excalidraw-diagrams redis-insight-plugin playwright-test playwright-cli-agent agent-spec-writing agent-plan-lifecycle agent-memory-docker; do echo -n "$s: "; grep -ci "authority\|authorized" "$s/SKILL.md"; done
  # Description fields untouched:
  for s in caveman rtk-cli redis-brand-ui redis-product-ui redis-presentation-decks redis-excalidraw-diagrams redis-insight-plugin playwright-test playwright-cli-agent agent-spec-writing agent-plan-lifecycle agent-memory-docker; do echo -n "$s: "; git diff -- "$s/SKILL.md" | grep -c "^[+-].*description:"; done
  bash scripts/validate-skills.sh
  ```
- **Done evidence:** all 12 have authority boundary (grep count ≥1 each), no description changes, validator clean, no skill exceeds its pre-task line count by more than 10 (or extracted to compensate).

### T8 — Auditor

- **Objective:** Independently verify T1–T7.
- **Reasoning effort:** `high` — final correctness gate.
- **Serial after:** T1–T7 all complete.
- **Verify steps (run all independently, do not trust task self-reports):**
  1. `bash scripts/validate-skills.sh` — 0 new errors.
  2. `wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md agent-capability-ledger/SKILL.md` — all ≤150 or documented exception.
  3. `awk` compatibility checks for agent-capability-ledger, redis-lucidchart-diagrams, agent-memory-coordination — 1 each, top-level.
  4. `git diff -- agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md` — no hunk touches `description:`.
  5. `grep "Fable 5" agent-delegation-routing/references/routing-table.md AGENTS.md` — present in both.
  6. `grep -ci "authority\|authorized" */SKILL.md` — all 17 skills return ≥1.
  7. `grep "tool-result" agent-capability-ledger/references/proof-taxonomy.md` — present.
  8. T3 benchmark: `ls docs/agent-plans/2026-07-05-fable5-skill-hardening/benchmark-results/*/results.json 2>/dev/null | wc -l` (or blocked-for-environment record).
  9. `test -d agent-memory-docker/scripts/__pycache__` → must be absent. `grep __pycache__ .gitignore` → present.
  10. All 17 `description:` fields untouched: `for s in */SKILL.md; do git diff -- "$s" | grep -c "^[+-].*description:"; done` — all 0.
  11. `git status --porcelain` — nothing staged/committed, only expected changes.
- **Bounded fixes:** if any check fails, fix directly (same rules as superseded plan).
- **Done evidence:** per-task verdict, audit independence disposition, 0 commits confirmed.

## Final report contract

Caveman lite voice. Must include:
1. Per-task status (T1–T8).
2. Line counts before→after for 3 trimmed skills.
3. 3 compatibility fields confirmed (files + top-level placement).
4. Fable 5 routing table section confirmed.
5. AGENTS.md Fable 5 conventions confirmed.
6. Authority boundary presence confirmed across all 17 skills.
7. Tool-result anchoring in proof taxonomy and checklists confirmed.
8. T3 benchmark outcome (numbers or blocked-for-environment).
9. Pycache removal + gitignore confirmed.
10. Full audit verdict from T8.
11. 0 commits, git status output.
12. Residual risk (should be none).
