# Agent Instructions

This repository is for Redis SA skills: solution architecture, demos, workshops, RedisInsight plugins, troubleshooting, and field-engineering workflows.

## Operating Rules

- Use [RTK](rtk-cli/SKILL.md) for noisy shell output when available (`rtk git status`, `rtk grep`, `rtk read`, `rtk test ...`).
- Keep `SKILL.md` files concise. Prefer under ~150 lines.
- Put long material in `references/`. Put copy-ready files in `templates/`. Put helper scripts in `scripts/`.

## Skill Requirements

Every skill in this repo must have:

- `SKILL.md` at the skill root.
- YAML frontmatter with at minimum:
  - `name`
  - `description` (clear, trigger-focused)
  - `license`
  - `metadata.author`
  - `metadata.version`
- Imperative instructions ("Do X", "Use Y").
- Explicit `DO NOT` guardrails for anti-patterns.
- A final checklist agents can run through before declaring the task done.
- Explicit authority boundary (what the skill may do autonomously vs. what requires user request).

## Do Not Vendor

Do not vendor or copy external skill repositories into this repo. Reference them externally instead:

- Do not duplicate Redis official `redis-development`. Reference [`redis/agent-skills`](https://github.com/redis/agent-skills) instead.
- Do not vendor Superpowers. Reference it as an external recommended plugin (`/plugin install superpowers@claude-plugins-official`).
- Do not vendor `find-skills`, `skill-creator`, `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines`, or `github-actions-docs`. Reference them in the README and let users install them via the Agent Skills CLI.

## Supported Agents

Primary supported agents for documentation:

- Claude Code
- Codex
- Agent Skills CLI

Do not add Cursor-specific instructions unless explicitly requested.

### Codex

- Repository skills may live in `.agents/skills/`.
- Invoke skills with `$skill-name`.
- Use `AGENTS.md` for repo-level instructions.
- Do not create `CODEX.md`.

### Claude Code

- Skills can be invoked with slash commands when installed.
- Keep README examples compatible with Claude Code where possible.
- For external recommendations use `/plugin install <name>@<marketplace>`.

### Agent Skills CLI

- Install pattern: `npx skills add <owner>/<repo> --skill <skill-name>`.
- Discovery: `npx skills add vercel-labs/skills --skill find-skills`.
- Authoring: `npx skills add anthropics/skills --skill skill-creator`.

## Repository Hygiene

Do not commit generated artifacts:

- `node_modules/`
- `dist/`
- `.parcel-cache/`
- screenshots
- binary build outputs
- editor settings or local IDE config

Run `bash scripts/validate-skills.sh` before opening a PR. The script checks frontmatter fields, README cross-references, and the absence of generated artifacts and stray TODO/FIXME markers.

## Model and Cost Optimization

### Fable 5

Fable 5 is the Claude Code default. Use reasoning effort as the primary control lever: lower effort for routine work before adding more rules. See [routing-table.md](agent-delegation-routing/references/routing-table.md) for detailed model routing and effort guidance.

### Tokenizer Inflation: Opus 4.7

Opus 4.7 uses a new tokenizer that inflates token counts by up to ~35% compared to Opus 4.6 for equivalent work. If you are seeing unexpectedly high token usage or cost:

- Prefer **Opus 4.6** (`claude-opus-4-6`) for cost-sensitive workflows. Same capabilities, significantly fewer tokens.
- In Claude Code, toggle with `/fast` (Opus 4.6 fast mode) or set `model: claude-opus-4-6` in configuration.
- Combine with [RTK](rtk-cli/SKILL.md) for an additional 60-90% reduction on shell output tokens.

### Prompt Caching

Enable prompt caching to reduce costs by up to 90% on repeated system prompt and context reads:

- Cached input tokens cost 90% less than uncached reads.
- Default cache TTL is 5 minutes. Each cache hit resets the timer.
- **Extend effective TTL to 1 hour** by ensuring at least one request hits within every 5-minute window, or by configuring `cache_control` breakpoints on large, stable context blocks (system prompts, skill definitions, reference documents).
- Structure prompts so that stable content (system instructions, skill text, repo context) appears first and changes last — this maximizes cache hit rate.

### Claude Code Environment Variables

Set these in your shell profile for leaner, more reliable sessions:

```bash
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1   # Drop telemetry and non-critical network calls
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1   # No silent retry on non-streaming path — fail fast
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=600000           # 10-minute idle timeout (default is shorter, can kill long tool runs)
```

| Variable | Effect | When to use |
|----------|--------|-------------|
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Suppresses telemetry and background requests | Always — reduces noise, saves bandwidth |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | Prevents silent fallback to non-streaming API path | Always — avoids hidden retries that double cost |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` | Idle timeout before stream is killed (ms) | Set to `600000` (10 min) for long builds, large diffs, complex tool chains |

### DO NOTs

- Do not default to Opus 4.7 for batch or cost-sensitive workloads without accounting for the ~35% tokenizer overhead.
- Do not disable prompt caching unless debugging cache-specific issues.
- Do not place volatile content (timestamps, request IDs) before stable content in prompts — it breaks cache alignment.
- Do not leave `CLAUDE_STREAM_IDLE_TIMEOUT_MS` at default for repos with slow builds or large test suites — streams will timeout mid-run.

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

## Scope

Keep this repo focused on:

- Redis SA workflows
- Redis demos and workshops
- RedisInsight Workbench plugins
- Redis troubleshooting and operations
- Visualization (decks, diagrams, brand)
- Compact agent communication and tooling (`rtk-cli`, `caveman`, Playwright skills)

For general Redis development best practices (data modeling, key naming, TTL strategy, vector search, security, observability, performance), use [`redis/agent-skills`](https://github.com/redis/agent-skills). For general engineering methodology (planning, TDD, debugging, code review), use Superpowers.
