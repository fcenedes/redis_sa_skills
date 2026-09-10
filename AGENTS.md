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

### Model Selection

Support both Codex and Claude Code. Use the dated [routing table](agent-delegation-routing/references/routing-table.md) and [pricing reference](agent-delegation-routing/references/model-pricing.md), and verify the destination runtime before dispatch. Honor explicit model pins. Choose by quality, total cost, and latency; do not assume older models are cheaper or that the configured coordinator is the economical worker default.

### Token Counts And Fast Mode

Prefer explicit `claude-opus-4-6` for Opus work. Claude 4.7 and later use a newer tokenizer producing roughly 30% more tokens for the same text; at equal per-token rates this raises token cost correspondingly. Require demonstrated benefit before choosing newer Opus/Fable. Compare token counts and rates together for other families, and do not add a 30% multiplier to usage already measured with the newer tokenizer. See the [tokenizer comparison](agent-delegation-routing/references/model-pricing.md#tokenizer-adjusted-comparison).

Compare actual billed tokens and accepted-task cost across model versions. Tokenizer changes can alter cost for the same text; they do not prove equal capabilities. Claude `/fast` purchases lower latency at premium rates and may switch models; use explicit model selection for cost control. See [Claude fast mode](https://code.claude.com/docs/en/fast-mode).

### Prompt Caching

Keep stable instructions and reusable context before changing content. Count cache writes, hits, expiration, output, and retries using the selected model's rates. For Claude API caching, a hit refreshes the existing TTL; choose `ttl: "1h"` explicitly when supported and worthwhile. Do not send keepalive requests solely to preserve a cache. See [Claude caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

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

- Do not rank models by age, infer subscription charges from API rates, or enable premium fast mode as a cost-saving measure.
- Do not disable prompt caching unless debugging cache-specific issues.
- Do not place volatile content (timestamps, request IDs) before stable content in prompts — it breaks cache alignment.
- Do not leave `CLAUDE_STREAM_IDLE_TIMEOUT_MS` at default for repos with slow builds or large test suites — streams will timeout mid-run.

## Agent Control Model

For both Codex and Claude, define the objective, authority boundary, success
criteria, and evidence required. Select model and effort for the task rather
than assuming one model is always the default or most capable.

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

Evaluate lower effort for routine work before adding more instructions.
Retain the setting only when quality gates still pass. Follow the exact
model and runtime guidance; identical effort labels are not comparable
across generations, and some models do not support effort controls.

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
