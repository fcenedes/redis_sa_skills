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

Use Claude-side routing for judgment, Codex for execution inside a repo, and
Qwen for bounded local worker tasks.

Claude choices are external routing choices for humans or Claude-side
coordinators. Codex coordinators must not spawn, call, or delegate directly to
Claude; use Codex/local alternatives or ask the user to route work to Claude.

For role contracts, use [specialist-roles](specialist-roles.md). For command
invocations, use [command-patterns](command-patterns.md).

## Task Routing

| Task | Best first choice | Why |
|------|-------------------|-----|
| Architecture, plan, design review | Claude Opus or Codex xhigh | Use Claude only by human/Claude-side routing; Codex coordinators use Codex xhigh or ask the user to route to Claude. |
| Normal feature implementation | Codex medium or Claude Sonnet | Use Codex when repo and tool execution matter; use Sonnet only by human/Claude-side routing. |
| Large multi-file implementation | Codex high | Better persistence and repo execution without always paying max reasoning cost. |
| Hard debugging or subtle regression | Claude Opus or Codex high/xhigh | Use Opus only by human/Claude-side routing; use Codex high/xhigh for deep inspect/edit/run loops. |
| Security-sensitive review | Claude Opus plus Codex high verification | Use two-model review when a human or Claude-side coordinator routes the Claude pass. |
| Mechanical refactor | Qwen local, Codex low/medium, or Claude Haiku | Cheap and fast when file ownership is bounded; Claude Haiku is human/Claude-side routing only. |
| Test generation | Qwen local, Codex medium, or Claude Haiku | Good worker task; Claude Haiku is human/Claude-side routing only and coordinator reviews usefulness. |
| Boilerplate, docs, rename, grep-driven edits | Qwen local, Codex low/medium, or Claude Haiku | Low-risk and easy to verify; Claude Haiku is human/Claude-side routing only. Use high only for a separate public-contract/release/security review. |
| Frontend prototype | Codex high | Stronger at producing, running, and verifying actual UI. |
| Final integration, commit, push | Codex medium/high | Strong local repo and tool workflow. |
| Final strategic review | Claude Opus or Codex xhigh | Use Claude only by human/Claude-side routing; Codex coordinators use Codex xhigh. |

## Role Mapping

Same boundary: Claude entries are not Codex delegation targets.

| Need | Role | Default Execution |
|------|------|-------------------|
| Split ambiguous work | Coordinator | Codex xhigh, or Claude Opus by human/Claude-side routing |
| Make requirements executable | Spec Writer | Codex high/xhigh, or Claude Opus/Sonnet by human/Claude-side routing |
| Edit repo files | Implementor | Codex medium/high |
| Check completion | Verifier | Codex high, or Claude Sonnet by human/Claude-side routing |
| Challenge claims | Auditor | Codex xhigh, or Claude Opus by human/Claude-side routing |
| Review PR/diff | PR Reviewer | Codex review, or Claude Opus by human/Claude-side routing |
| Drive PR loops | PR Shepherd | Codex medium/high |
| Build product UI | UI Designer | Codex high |
| Cheap bounded patch | Qwen Worker | Qwen local/Ollama |

## Claude

This section is guidance for Claude-side coordinators or humans deciding to run
Claude. It is not permission for Codex to delegate directly to Claude.

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

Do not default every task to xhigh. Higher effort can improve quality on hard
tasks, but costs time and tokens and can over-elaborate.

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
- Codex high: implement and run gates.
- Qwen local: parallel bounded worker for tests, docs, and mechanical patches.
- Claude Opus by human/Claude-side routing, or Codex xhigh: final review only when risk is high.
