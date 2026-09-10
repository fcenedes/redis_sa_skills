# Command Patterns

Use RTK to keep delegation and verification token-efficient. Use `rtk proxy`
for non-interactive delegated agent commands where preserving command behavior
matters. Use RTK first-class wrappers for noisy repo commands, tests, builds,
logs, and diffs.

RTK is preferred, not required. If `rtk` is not installed or changes behavior,
use the raw fallback and report that RTK was unavailable or bypassed.

## Preflight

```bash
rtk git status
rtk gain
rtk proxy command -v codex
rtk proxy command -v ollama
rtk proxy ollama list
```

Fallback:

```bash
git status --short
command -v codex
command -v ollama
ollama list
```

## Model Control Gate

Before dispatching, inspect model and effort controls on the destination
runtime. Use the current [routing table](routing-table.md) and
[price/cost method](model-pricing.md); do not infer price from model age.
Record requested and actual settings, billing surface, service tier, price
source/date or unknown, and fallback. Unsupported effort is `not supported`.

Acceptable worker paths for either coordinator:

- Codex CLI with explicit `-m` and `-c model_reasoning_effort=...`.
- Codex subagents with explicit supported overrides: Luna for bounded work,
  Terra for normal implementation, Sol for complex work, Astra for justified
  escalation. GPT-5.4/5.5 are compatibility/pinned alternatives, not budget defaults.
- Native Claude Code subagents with explicit model and supported effort controls;
  resolve aliases to actual model IDs. Do not assume all Claude tools inherit.
- Claude CLI with `--model` and, when supported, `--effort`.
- `ollama run <qwen-model>` or another verified local model.
- An explicit scoped cross-provider bridge/tool/CLI or human handoff.

If a tool only inherits a senior model for bounded low/medium work, use an
explicit CLI/local route or execute directly. Check the tool's override and
context-fork restrictions rather than silently accepting inheritance.

If none is available, write:

```text
No lower-cost worker available; not spawning inherited-model subagent.
```

## Cross-Agent Audit Bridge

Use a cross-agent audit bridge only when an explicit bridge, tool, or CLI exists.
The prompt must name source of truth, changed files, owned scope, verification
already run, requested audit gates, and output format. It must also say: no
secrets, no implementation, no commit, no push, and no default-branch changes.

If the bridge cannot control or report model/reasoning, record:

```text
Actual model: unknown
Actual reasoning effort: unknown
Inherited from coordinator: unknown
```

If no safe bridge exists, use an independent available Auditor or a user-routed
handoff for high-risk public-contract, security, architecture, or release claims.
If the independent audit path fails, hangs, or has to be terminated, record the
failed command/tool path and write `Audit independence: self-evidence only`. Do
not describe local validation or same-agent review as an independent audit.

## Codex Non-Interactive Worker

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' "<worker prompt>"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' "<worker prompt>"
```

Use for repo-aware implementation, tests, refactors, frontend verification, and
integration fixes.

For a justified complex worker, choose Sol and high effort explicitly:

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-sol -c 'model_reasoning_effort="high"' "<worker prompt>"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-sol -c 'model_reasoning_effort="high"' "<worker prompt>"
```

## Codex Review Worker

```bash
rtk proxy codex -C /path/to/repo -m gpt-5.6-terra -c 'model_reasoning_effort="medium"' review "<review prompt>"
```

Fallback:

```bash
codex -C /path/to/repo -m gpt-5.6-terra -c 'model_reasoning_effort="medium"' review "<review prompt>"
```

Use for focused review when the output should be findings, not edits.
`-C` is a top-level Codex flag placed before the `review` subcommand.

Review current branch against `main`:

```bash
rtk proxy codex -C /path/to/repo -m gpt-5.6-terra -c 'model_reasoning_effort="medium"' review --base main "<review prompt>"
```

Fallback:

```bash
codex -C /path/to/repo -m gpt-5.6-terra -c 'model_reasoning_effort="medium"' review --base main "<review prompt>"
```

## Claude Native And CLI Workers

From Claude Code, prefer a native subagent whose model and supported effort can
be set explicitly. Use Haiku 4.5 for bounded tasks, Sonnet 5 for ordinary coding,
explicit `claude-opus-4-6` for complex Opus work, and newer Opus/Fable only
for demonstrated benefit after accounting for the newer tokenizer. Resolve
`haiku`/`sonnet` aliases; avoid the floating `opus` alias for the Opus 4.6 route. Use the CLI when
the native tool cannot express the required settings.

Run in the assigned repository with an existing scoped worker prompt:

```bash
rtk proxy claude --print --model claude-sonnet-5 --effort medium < /tmp/worker-prompt.txt
```

Raw fallback:

```bash
claude --print --model claude-sonnet-5 --effort medium < /tmp/worker-prompt.txt
```

This medium-effort example assumes quality was validated for the bounded task;
use high for demanding Sonnet work. Omit `--effort` on Haiku 4.5 and record
`not supported`. Keep existing permissions and prompt ownership constraints.
Check `claude --help` and [model controls](https://code.claude.com/docs/en/model-config)
for the installed version. Environment settings or organization caps can change
applied effort; record actual settings or unknown, not merely the request.
For Claude API workers, use `output_config.effort`, not Codex config keys.

## Local Qwen Through Ollama

```bash
rtk proxy ollama list
rtk proxy ollama run <qwen-model> "<worker prompt>"
```

Fallback:

```bash
ollama list
ollama run <qwen-model> "<worker prompt>"
```

Use for bounded worker tasks. Prefer unified diff output unless the task is
analysis-only.

## Parallel Worker Dispatch

Use the host agent's parallel-subagent tool when available. Otherwise use
separate terminals, tmux panes, or background jobs with one prompt file and one
log per worker. Do not combine multiple workers in one prompt.

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' - < /tmp/worker-a.txt > /tmp/worker-a.log 2>&1 &
rtk proxy ollama run <qwen-model> "$(cat /tmp/worker-b.txt)" > /tmp/worker-b.log 2>&1 &
wait
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' - < /tmp/worker-a.txt > /tmp/worker-a.log 2>&1 &
ollama run <qwen-model> "$(cat /tmp/worker-b.txt)" > /tmp/worker-b.log 2>&1 &
wait
```

After every parallel batch, inspect each log, then review ownership with
`git diff --name-only` before integration.

## Local Model Through Codex OSS Provider

```bash
rtk proxy codex exec --oss --local-provider ollama -m <model> -C /path/to/repo "<worker prompt>"
```

Fallback:

```bash
codex exec --oss --local-provider ollama -m <model> -C /path/to/repo "<worker prompt>"
```

Use when you want Codex's repo workflow around a local model.

## Long Prompt Files

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' - < /tmp/worker-prompt.txt
rtk proxy ollama run <qwen-model> "$(cat /tmp/worker-prompt.txt)"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -m gpt-5.6-luna -c 'model_reasoning_effort="medium"' - < /tmp/worker-prompt.txt
ollama run <qwen-model> "$(cat /tmp/worker-prompt.txt)"
```

Pass prompt files intact using stdin for Codex/Claude; do not filter prompt content.
For Ollama command substitution, use `cat` when exact prompt fidelity is required.

## Patch Handoff

```bash
rtk proxy git apply --check worker.patch
rtk proxy git apply worker.patch
rtk git diff --stat
rtk git diff
```

Fallback:

```bash
git apply --check worker.patch
git apply worker.patch
git diff --stat
git diff
```

Reject patches that touch files outside ownership, include generated artifacts,
reformat unrelated code, or skip verification without saying why.

## Verification Commands

```bash
rtk test "npm test"
rtk test "pnpm test"
rtk test "pytest"
rtk npm run build
rtk tsc
rtk lint
rtk playwright test
```

Use the repo's documented commands when they exist. If a live proof skips
because a service or environment variable is missing, record it as skipped, not
passed.

## Raw Command Bypass

Use raw commands instead of RTK when:

- the command is interactive or streaming
- exact unfiltered output is required
- RTK changes the exit status or hides a needed stack trace
- the user explicitly asks for raw output

Report the bypass reason in the final worker or coordinator output.
