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

## Codex Non-Interactive Worker

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo "<worker prompt>"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo "<worker prompt>"
```

Use for repo-aware implementation, tests, refactors, frontend verification, and
integration fixes.

Set Codex reasoning through config when needed:

```bash
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -c reasoning.effort=\"high\" "<worker prompt>"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo -c reasoning.effort=\"high\" "<worker prompt>"
```

## Codex Review Worker

```bash
rtk proxy codex -C /path/to/repo review "<review prompt>"
```

Fallback:

```bash
codex -C /path/to/repo review "<review prompt>"
```

Use for focused review when the output should be findings, not edits.
`-C` is a top-level Codex flag placed before the `review` subcommand.

Review current branch against `main`:

```bash
rtk proxy codex -C /path/to/repo review --base main "<review prompt>"
```

Fallback:

```bash
codex -C /path/to/repo review --base main "<review prompt>"
```

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
rtk proxy codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo "$(rtk read /tmp/worker-prompt.txt)"
rtk proxy ollama run <qwen-model> "$(rtk read /tmp/worker-prompt.txt)"
```

Fallback:

```bash
codex --ask-for-approval never --sandbox workspace-write exec -C /path/to/repo "$(cat /tmp/worker-prompt.txt)"
ollama run <qwen-model> "$(cat /tmp/worker-prompt.txt)"
```

If `rtk read` filters content too aggressively for the prompt, use `cat` and
state that exact prompt fidelity was required.

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
