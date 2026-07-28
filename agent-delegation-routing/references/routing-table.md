# Agent Routing Table

Model guidance changes. Verify current vendor docs or the tool schema before
making durable claims about exact model names, pricing, limits, or availability.
As of the 2026-07 Codex app/subagent schema, callable Codex workers include
`gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `gpt-5.5`, and `gpt-5.4`.
Anthropic labels such as Sonnet and Opus are external routing labels, not Codex
model IDs. OpenAI positions Codex as long-horizon agentic coding with explicit
model and low/medium/high/xhigh reasoning controls; Qwen positions Qwen3-Coder
as an agentic coding model with Qwen Code tooling.

Sources to re-check when updating this file:

- Anthropic Claude Code model guidance.
- OpenAI Codex model documentation.
- OpenAI reasoning effort documentation.
- Qwen3-Coder and Qwen Code documentation.

## Short Version

Use Claude-side routing for judgment, Codex for execution inside a repo, and
Qwen for bounded local worker tasks.

Cost rule: explicit model control is necessary but not sufficient. Pick the
cheapest sufficient explicit model/reasoning pair, and record why each
higher-cost or newer-generation choice is needed. "Avoids inherited-model
ambiguity" justifies using an explicit override; it does not justify selecting
`gpt-5.6-terra`, `gpt-5.6-sol`, high, or xhigh when `gpt-5.4`, `gpt-5.5`, local
Qwen, or direct execution would be sufficient.

Claude choices require an explicit bridge/tool/CLI, a Claude-side coordinator, or
human routing. Codex coordinators must not use uncontrolled Claude handoffs; use
Codex/local alternatives, a scoped bridge request, or ask the user to route work
to Claude.

For role contracts, use [specialist-roles](specialist-roles.md). For command
invocations, use [command-patterns](command-patterns.md).

## Task Routing

| Task | Best first choice | Why |
|------|-------------------|-----|
| Architecture, plan, design review | Claude Opus or Codex high/xhigh | Use Claude through an explicit bridge/tool or human/Claude-side routing; Codex coordinators use Codex high by default and xhigh only for major ambiguity or high-risk decisions. |
| Normal feature implementation | Codex medium or Claude Sonnet | Use Codex when repo and tool execution matter; use Sonnet only through an explicit bridge/tool or human/Claude-side routing. |
| Large multi-file implementation | Codex high | Better persistence and repo execution without always paying max reasoning cost. |
| Hard debugging or subtle regression | Claude Opus or Codex high/xhigh | Use Opus only through an explicit bridge/tool or human/Claude-side routing; use Codex high/xhigh for deep inspect/edit/run loops. |
| Security-sensitive review | Claude Opus plus Codex high verification | Use two-model review when an explicit bridge/tool, a human, or a Claude-side coordinator routes the Claude pass. |
| Mechanical refactor | Qwen local, Codex low/medium, or Claude Haiku | Cheap and fast when file ownership is bounded; Claude Haiku requires an explicit bridge/tool or human/Claude-side routing. |
| Test generation | Qwen local, Codex medium, or Claude Haiku | Good worker task; Claude Haiku requires an explicit bridge/tool or human/Claude-side routing and coordinator reviews usefulness. |
| Boilerplate, docs, rename, grep-driven edits | Qwen local, Codex low/medium, or Claude Haiku | Low-risk and easy to verify; Claude Haiku requires an explicit bridge/tool or human/Claude-side routing. Use high only for a separate public-contract/release/security review. |
| Frontend prototype | Codex high | Stronger at producing, running, and verifying actual UI. |
| Final integration, commit, push | Codex medium/high | Strong local repo and tool workflow. |
| Final strategic review | Claude Opus or Codex high/xhigh | Use Claude through an explicit bridge/tool or human/Claude-side routing; Codex coordinators use Codex high by default and xhigh only when risk is high. |

## Codex Subagent Model Ladder

Use this when a Codex subagent or Codex app task exposes the 2026-07 model
choices. If availability differs, re-check the tool schema and keep the same
cost-first rule.

| Model | Use for | Avoid for |
|-------|---------|-----------|
| `gpt-5.4` | Low/medium bounded implementation, docs, tests, grep-driven edits, small refactors, and verifiable file-local fixes. | Work needing latest-generation agentic persistence, broad repo synthesis, or high-risk judgment. |
| `gpt-5.5` | Complex coding, research, broader repo analysis, and implementation that outgrows `gpt-5.4` but does not need 5.6. | Cheap docs/mechanical tasks, or final high-risk authority when `gpt-5.6-sol`/explicit senior audit is justified. |
| `gpt-5.6-luna` | Fast latest-generation worker when latency/tool robustness matters and `gpt-5.4` is not enough. | Default implementation workers where older cheaper models suffice. |
| `gpt-5.6-terra` | Balanced latest-generation coding for multi-file or longer agentic work after a cheaper model is insufficient or clearly risky. | Routine implementation, docs, tests, or audits chosen only to avoid inheritance ambiguity. |
| `gpt-5.6-sol` | Frontier audit, architecture/security review, subtle regression analysis, major migration planning, or final high-risk verification. | Normal implementation workers and low/medium-risk reviews. |

Reasoning effort stays separate from model. Prefer `low` for mechanical tasks,
`medium` for normal coding/docs/tests, `high` for multi-file integration or
nontrivial debugging, and `xhigh` only for named high-risk ambiguity. `max` and
`ultra`, when exposed, require an explicit user request or a recorded
security/architecture/release-risk reason.

## Role Mapping

Same boundary: Claude entries require an explicit bridge/tool, Claude-side
coordinator, or human routing; they are not uncontrolled Codex delegation
targets.

| Need | Role | Default Execution |
|------|------|-------------------|
| Split ambiguous work | Coordinator | Codex medium/high, or Claude Sonnet/Opus by human/Claude-side routing |
| Make requirements executable | Spec Writer | Codex medium/high, or Claude Sonnet/Opus by human/Claude-side routing |
| Edit repo files | Implementor | Codex `gpt-5.4` medium by default; escalate per ladder |
| Check completion | Verifier | Codex `gpt-5.5`/`gpt-5.6-terra` high when evidence is nontrivial, or Claude Sonnet by human/Claude-side routing |
| Challenge claims | Auditor | Codex `gpt-5.6-sol` high/xhigh only for high-risk claims, or Claude Opus by human/Claude-side routing |
| Review PR/diff | PR Reviewer | Codex review, or Claude Opus by human/Claude-side routing |
| Drive PR loops | PR Shepherd | Codex medium/high |
| Build product UI | UI Designer | Codex high |
| Reconcile delivered/missing capability rows | Capability Ledger Maintainer | Qwen local, Codex low/medium, or Claude Haiku/Sonnet by human/Claude-side routing |
| Audit readiness or ledger claims | Capability Auditor | Codex medium/high, or Claude Sonnet/Opus by human/Claude-side routing |
| Cheap bounded patch | Qwen Worker | Qwen local/Ollama |

## Claude

This section is guidance for Claude-side coordinators, humans, or explicit
bridge/tool routes deciding to run Claude. It is not permission for uncontrolled
Codex-to-Claude handoff.

| Model | Use for | Avoid for |
|-------|---------|-----------|
| Opus | Planning, architecture, hard debugging, ambiguous specs, final reviews, high-stakes reasoning. | Bulk edits, cheap loops, mechanical changes. |
| Sonnet | Most coding, refactors, tests, known bugs, implementation from a plan. | Very cheap repetitive tasks. |
| Haiku | Renames, summaries, small docs, regex/log explanations, simple boilerplate. | Architecture, broad repo edits, subtle bugs. |

Practical pattern on the Claude side: Opus plans, Sonnet executes.

## Codex Reasoning

| Effort | Use for |
|--------|---------|
| low | Quick questions, small edits, simple file-local changes. |
| medium | Default normal coding, tests, docs, straightforward bugfixes. |
| high | Multi-file features, frontend work, integration, nontrivial debugging. |
| xhigh | Hard repo archaeology, subtle bugs, security logic, major migrations, final deep verification. |

Do not default every task, coordinator, spec writer, or auditor to xhigh. Higher
effort can improve quality on hard tasks, but costs time and tokens and can
over-elaborate. Use xhigh only for named high-risk ambiguity, subtle regression,
security logic, major migration, or final deep verification.

Docs rule: docs execution defaults to low/medium. Public command wording, route
inventories, release posture, and live-proof semantics may justify a high
Spec Writer or Auditor pass, but not inherited high-reasoning docs workers. If
the dispatch path can only inherit a senior coordinator model, do the docs edit
directly or use a lower-cost CLI/local worker.

## Qwen Local

Use Qwen as a worker, not coordinator.

Good tasks:

- Generate tests for a module.
- Convert examples to docs.
- Produce a patch for a narrow bug.
- Rename an API in specified files only.
- Summarize source files.
- Review a diff for obvious mistakes.

Avoid:

- Final authority.
- Broad architecture.
- Cross-repo reasoning.
- Edits touching shared config or lockfiles.
- Security-sensitive work without senior Claude-side or Codex review.

Best Qwen prompt style:

```text
You own only: <files>
Do not edit anything else.
Return a unified diff only.
Do not commit.
Run or state this verification: <command>
Report blockers.
```

## Default Team Setup

- Claude Opus: write or review the plan when routed by a human or Claude-side coordinator.
- Codex medium/high: implement and run gates based on risk.
- Qwen local: parallel bounded worker for tests, docs, and mechanical patches.
- Claude Opus by human/Claude-side routing, or Codex xhigh: final review only when risk is high.
