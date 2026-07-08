# Fable 5 Skill Hardening — Change Spec

Source: Anthropic Fable 5 prompting guide + field observations from user.
Affects: all 17 skills in this repo, AGENTS.md, and routing-table.md.

## Control Model Inversion

Previous models (Opus, Codex) drifted by **weakness** — skipped steps, forgot plans. Skills compensated with dense scaffolding: step-by-step recipes, tool nudging, "always do X before Y."

Fable 5 drifts by **strength** — reads instructions and evaluates rules instead of executing them, surfacing contradictions mid-task. It updates skills in-flight based on what it learns, so frozen recipes conflict with its own corrections.

New control model: **contract, not prescription.**
Objective + success criteria + authority boundary + obligation of proof.

## Six Patterns

### P1 — Contract over recipe

Replace step-by-step recipes written for weaker models with contract declarations. If a mandatory sequence exists, declare it as a binding contract, not a tutorial.

- **Bad:** "Step 1: read the file. Step 2: check the config. Step 3: run the test."
- **Good:** "The approved plan is a binding contract. Any deviation must be proposed and validated before execution."
- **High impact:** agent-delegation-planning (Required Shape: 28-item checklist → contract declaration), agent-delegation-routing (Routing Matrix prose → reference pointer + brief principle), redis-insight-plugin (3-phase workflow → declared mandatory gates).
- **Low impact:** caveman, rtk-cli, redis-brand-ui (already concise, no prescriptive sequences).

### P2 — Authority boundary

Every skill must explicitly declare its scope of initiative: what it may do without asking, and what requires explicit user request.

Pattern (add 2-3 lines to existing DO NOT section or a new `## Authority` section):

```markdown
## Authority
- Authorized: [list specific autonomous actions this skill takes].
- Requires explicit request: [list actions that need user confirmation].
- Assessment-only default: when the user describes a problem without requesting a change, the deliverable is the assessment — report findings and stop.
```

Examples per skill type:
- **caveman:** "Authorized: compress prose output in the active mode. Not authorized: compress code blocks, alter command output, change communication mode without user trigger."
- **agent-delegation-planning:** "Authorized: write plan files, post to agent_memory, dispatch workers when Execution: start-now. Not authorized: start execution when plan-only, commit or push, expand scope beyond the plan."
- **playwright-cli-agent:** "Authorized: drive browsers for exploration/screenshots against dev/staging. NEVER interact with production without explicit confirmation."

### P3 — Sub-agent dispatch threshold

For delegation/coordination skills, add guidance on when sub-agent dispatch is appropriate vs when to execute directly.

- **Dispatch threshold:** "Dispatch sub-agents only when the work is genuinely parallel, file-disjoint, or requires fresh-context verification. For sequential single-file work, execute directly."
- **Fresh-context verifiers:** "Verification agents with no prior context outperform self-review. For audit and final gates, prefer spawning a fresh verifier over reviewing your own work."
- **Async over blocking:** "Prefer async orchestrator↔worker communication. Do not block waiting for each sub-agent return when results are independent."
- **Applies to:** agent-delegation-planning, agent-delegation-routing, agent-memory-coordination.

### P4 — Tool-result anchoring

Progress claims must cite specific tool results from the current session. No self-reported status without evidence.

- **Pattern:** "Before reporting progress or completion, audit each claim against a tool result from this session. Report only what you can prove with tool output."
- **Integration points:**
  - Checklists: "Each checklist item must be answered by citing a specific command output or file content."
  - Audit requirements: "The auditor re-runs verification commands independently; do not trust self-reports."
  - Proof taxonomy (agent-capability-ledger): add `tool-result` as a proof class.
- **High impact:** agent-plan-lifecycle (promotion gates), agent-capability-ledger (proof), agent-delegation-planning (audit task).
- **Universal:** add one sentence to every skill's final checklist: "Each item below must be proved by a command output or file read from this session, not by memory or prior conversation."

### P5 — Effort calibration

Update routing guidance for Fable 5's effort model. Effort is the primary control lever, not rule density.

- Fable `low` effort ≥ previous-gen `xhigh` for most routine tasks.
- `high` is the default for Fable. `xhigh` for critical only. `medium`/`low` for routine.
- **Before adding rules to control Fable behavior, lower effort first.**
- At high effort on routine work, Fable over-collects context and deliberates beyond need.
- **Integration points:** routing-table.md (add Fable 5 section), AGENTS.md (add effort guidance).

### P6 — Anti-pitfalls

| Pitfall | Where | Fix |
|---------|-------|-----|
| "Explain your reasoning" / "show thinking" triggers `reasoning_extraction` refusal → fallback to Opus 4.8 | All skills | **Audit result: CLEAN** — no such patterns found in any skill. No action needed. |
| Fable suggests ending session when context is long | Long-running task skills | Add: "Do not suggest ending the session or summarizing to save context. Continue until the task is complete or genuinely blocked." |
| Blocking on user mid-autonomous-pipeline | agent-delegation-planning, coordinator prompts | Add: "You operate autonomously. The user cannot answer mid-task. For reversible actions that follow from the request, proceed without asking. Stop only for destructive actions or genuine scope changes." |
| Over-eager sub-agent dispatch | agent-delegation-routing, coordination skills | See P3: dispatch threshold. |

## Per-Skill Change Map

| Skill | P1 | P2 | P3 | P4 | P5 | P6 | Notes |
|-------|----|----|----|----|----|----|-------|
| caveman | — | authority section | — | — | — | — | Already concise. Add 3-line authority. |
| rtk-cli | — | authority section | — | — | — | — | Same. |
| redis-brand-ui | — | authority section | — | checklist anchor | — | — | |
| redis-product-ui | — | authority section | — | checklist anchor | — | — | |
| redis-presentation-decks | — | authority section | — | checklist anchor | — | — | |
| redis-excalidraw-diagrams | — | authority section | — | checklist anchor | — | — | |
| redis-lucidchart-diagrams | — | authority section | — | checklist anchor | — | — | |
| redis-insight-plugin | contract gates | authority section | — | checklist anchor | — | — | 3-phase → "mandatory gates, not suggestions" |
| playwright-test | — | authority section | — | checklist anchor | — | — | |
| playwright-cli-agent | — | authority section (critical: prod) | — | checklist anchor | — | — | Prod guardrail is authority boundary |
| agent-delegation-routing | contract routing | authority section | dispatch threshold | — | **Fable 5 routing table** | — | Routing table gets Fable 5 section |
| agent-delegation-planning | **contract shape** | authority section | dispatch threshold, fresh verifiers | audit anchoring | — | anti-blocking | Biggest change: Required Shape → contract declaration |
| agent-spec-writing | light contract | authority section | — | checklist anchor | — | — | |
| agent-plan-lifecycle | — | authority section | — | promotion anchoring | — | session continuity | |
| agent-capability-ledger | — | authority section | — | proof taxonomy | — | — | Add `tool-result` proof class |
| agent-memory-docker | — | authority section | — | checklist anchor | — | — | |
| agent-memory-coordination | — | authority section | async patterns | — | — | — | Add async orchestrator↔worker |

## Non-Goals

- Do not create new skills.
- Do not change skill `description:` frontmatter fields (benchmarked).
- Do not commit or push.
- Do not exceed ~150-line budget for skills already under it by adding Fable 5 content — if necessary, extract existing prose to make room.
