# Agent Routing Table

Model guidance changes. Verify current vendor docs before making durable claims
about exact model names, pricing, limits, or availability. As of the 2026-05
guidance used to create this skill: Anthropic positions Sonnet for most coding,
Opus for hard or wide work, and Haiku for quick mechanical work; OpenAI
positions Codex as long-horizon agentic coding with low/medium/high/xhigh
reasoning effort; Qwen positions Qwen3-Coder as an agentic coding model with
Qwen Code tooling.

Sources to re-check when updating this file:

- Anthropic Claude Code model guidance.
- OpenAI Codex model documentation.
- OpenAI reasoning effort documentation.
- Qwen3-Coder and Qwen Code documentation.

## Short Version

Use Claude for judgment, Codex for execution inside a repo, and Qwen for bounded
local worker tasks.

For role contracts, use [specialist-roles](specialist-roles.md). For command
invocations, use [command-patterns](command-patterns.md).

## Task Routing

| Task | Best first choice | Why |
|------|-------------------|-----|
| Architecture, plan, design review | Claude Opus | Best for ambiguous tradeoffs, cross-cutting reasoning, and deciding what should be done. |
| Normal feature implementation | Codex medium or Claude Sonnet | Use Codex when repo and tool execution matter; use Sonnet for interactive coding with good judgment. |
| Large multi-file implementation | Codex high | Better persistence and repo execution without always paying max reasoning cost. |
| Hard debugging or subtle regression | Claude Opus or Codex high/xhigh | Use Opus for diagnosis; use Codex high/xhigh when deep inspect/edit/run loops are required. |
| Security-sensitive review | Claude Opus plus Codex high verification | Use two-model review; do not trust one pass. |
| Mechanical refactor | Qwen local or Claude Haiku | Cheap and fast when file ownership is bounded. |
| Test generation | Qwen local, Codex medium, or Claude Haiku | Good worker task, but coordinator reviews usefulness. |
| Boilerplate, docs, rename, grep-driven edits | Qwen local or Haiku | Low-risk and easy to verify. |
| Frontend prototype | Codex high | Stronger at producing, running, and verifying actual UI. |
| Final integration, commit, push | Codex medium/high | Strong local repo and tool workflow. |
| Final strategic review | Claude Opus | Good last-pass reviewer for coherence and missed risks. |

## Role Mapping

| Need | Role | Default Execution |
|------|------|-------------------|
| Split ambiguous work | Coordinator | Claude Opus or Codex xhigh |
| Make requirements executable | Spec Writer | Claude Opus/Sonnet |
| Edit repo files | Implementor | Codex medium/high |
| Check completion | Verifier | Codex high or Claude Sonnet |
| Challenge claims | Auditor | Claude Opus or Codex xhigh |
| Review PR/diff | PR Reviewer | Codex review or Claude Opus |
| Drive PR loops | PR Shepherd | Codex medium/high |
| Build product UI | UI Designer | Codex high |
| Cheap bounded patch | Qwen Worker | Qwen local/Ollama |

## Claude

| Model | Use for | Avoid for |
|-------|---------|-----------|
| Opus | Planning, architecture, hard debugging, ambiguous specs, final reviews, high-stakes reasoning. | Bulk edits, cheap loops, mechanical changes. |
| Sonnet | Most coding, refactors, tests, known bugs, implementation from a plan. | Very cheap repetitive tasks. |
| Haiku | Renames, summaries, small docs, regex/log explanations, simple boilerplate. | Architecture, broad repo edits, subtle bugs. |

Practical pattern: Opus plans, Sonnet executes.

## Codex Reasoning

| Effort | Use for |
|--------|---------|
| low | Quick questions, small edits, simple file-local changes. |
| medium | Default normal coding, tests, docs, straightforward bugfixes. |
| high | Multi-file features, frontend work, integration, nontrivial debugging. |
| xhigh | Hard repo archaeology, subtle bugs, security logic, major migrations, final deep verification. |

Do not default every task to xhigh. Higher effort can improve quality on hard
tasks, but costs time and tokens and can over-elaborate.

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
- Security-sensitive work without Claude or Codex review.

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

- Claude Opus: write or review the plan.
- Codex high: implement and run gates.
- Qwen local: parallel bounded worker for tests, docs, and mechanical patches.
- Claude Opus or Codex xhigh: final review only when risk is high.
