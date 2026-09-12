---
name: rtk-cli
description: Use when running shell commands, inspecting files, checking git output, reading logs, running tests, lint, typecheck, builds, Docker/Kubernetes commands, package-manager commands, grep/find, or any CLI command likely to produce significant output. Prefer RTK wrappers to keep terminal output compact.
compatibility: Requires the rtk binary (rtk-ai/rtk, 0.49+) on PATH; falls back to raw shell commands if unavailable.
license: MIT
metadata:
  author: redis
  version: "1.2.1"
---
# RTK CLI (Rust Token Killer)

Use RTK wrappers around noisy shell commands so terminal output stays compact and
tokens stay low. RTK is a token-optimized CLI proxy that filters and summarizes
verbose output (60-90% savings on common dev operations). RTK compresses **shell/tool
output only** — it never rewrites the agent's own prose (see "Pairs With caveman" below).

Written against rtk 0.49.0. RTK adds and renames subcommands often: when a form
below fails, trust `rtk <cmd> --help` and `rtk hook check "<raw cmd>"` over this file.

## When to Use

Trigger this skill whenever a shell command is likely to produce significant output:

- Inspecting files, directories, or repository state.
- Reading or searching logs.
- Running tests, lint, typecheck, builds, or formatters.
- Working with git, GitHub/GitLab CLI, Docker, Kubernetes, cloud CLIs, or package managers.
- Running `grep`, `rg`, `find`, `ls`, or any command that can produce many lines.

Some Claude Code hooks rewrite Bash commands to RTK automatically (`rtk hook claude`).
Even then, prefer calling RTK directly when output is likely to be large — it makes
intent explicit and avoids relying on hook coverage. Some agents have built-in
non-shell tools (Read, Grep) that bypass shell hooks entirely; in those agents, prefer
the RTK shell equivalent for any operation that may produce a lot of output.

Do NOT trigger this skill for requests to shorten the agent's own explanation, PR
review comment, commit message, or summary text — route those to `caveman` instead.

## Authority

- Authorized: wrap shell commands to reduce output size while preserving command semantics.
- Not authorized: filter out errors, suppress exit codes, or rewrite what a command actually printed.
- Assessment-only default: if RTK is unavailable or changes behavior, report the fallback instead of pretending RTK ran.

## Before First Use: Verify Installation

```bash
rtk --version   # must print rtk X.Y.Z, not "command not found"
rtk init --show # must list "[ok] Hook: rtk hook claude" (or the host agent's hook)
```

If `rtk --version` fails or reports the wrong tool (name collision with
reachingforthejack/rtk — "Rust Type Kit"), fall back to raw shell commands for this
session and say so. Do not silently pretend RTK ran.

If `rtk gain` prints `Failed to initialize tracking database`, the Bash sandbox is
blocking writes to RTK's data directory. Filtering still works, but **every sandboxed
`rtk` call silently skips tracking and `rtk recall` storage**. Do not treat this as
"RTK is broken". Propose the one-time fix to the user once per setup (it edits their
settings, so ask before applying):

```json
// ~/.claude/settings.json — lets sandboxed rtk write its history/recall DB
"sandbox": { "filesystem": { "allowWrite": ["~/Library/Application Support/rtk"] } }
```

Linux: use `~/.local/share/rtk` instead. Details in
[references/rtk-usage.md](references/rtk-usage.md#claude-code-sandbox-and-rtk-tracking).

## Core Workflow

1. Confirm RTK is installed (see above). If not, use raw commands and note the fallback.
2. Not sure an RTK form exists? Ask RTK, don't guess:

   ```bash
   rtk hook check "cargo test"   # prints "rtk cargo test", exit 0
   rtk hook check "npm test"     # "No rewrite for: npm test", exit 1 -> use rtk test npm test
   ```

3. Run the smallest useful command first. Narrow with paths, globs, `-n` caps, or
   `--max-lines` before broadening.
4. Wrap noisy commands with RTK, e.g.:

   ```bash
   rtk git status
   rtk git diff
   rtk git log -n 20
   rtk ls .
   rtk read path/to/file
   rtk read path/to/file --max-lines 40      # replaces head -40
   rtk read path/to/file --tail-lines 40     # replaces tail -40
   rtk grep -r "pattern" src/                # -r required for directories
   rtk rg "pattern" src/
   rtk find src -name "*.ts"
   rtk pytest -q                             # dedicated wrapper beats generic rtk test
   rtk cargo test
   rtk test npm test                         # generic wrapper for anything without one
   rtk npm run build
   rtk docker ps
   rtk docker compose ps
   rtk kubectl get pods
   rtk gh pr list
   ```

5. Output ends with a recovery hint like `[full output: rtk recall 3f9c2a81d4e7]`?
   RTK elided lines. Fetch only what you need instead of re-running raw:

   ```bash
   rtk recall 3f9c2a81d4e7                   # the elided part
   rtk recall 3f9c2a81d4e7 --grep "Error"    # filter recalled lines
   rtk recall 3f9c2a81d4e7 --full            # whole original output
   ```

6. If output is still too large, narrow further (a single file, a single test, a single container) before re-running.
7. Inspect savings periodically with `rtk gain` and `rtk gain --history`.

See [references/rtk-usage.md](references/rtk-usage.md) for setup, the full command-mapping table, and troubleshooting.

## What NOT to Wrap in RTK (bypass rules)

Use the raw command (no RTK wrapper) only when:

- RTK is not installed or `rtk --version` fails.
- RTK breaks the command (parsing errors, missing flags, wrong exit code).
- The exact raw output is required and `rtk recall` cannot supply it (e.g. reproducing a bug, copying logs verbatim).
- The command is interactive or streaming (`docker logs -f`, `tail -f`, REPLs, watchers, TUIs).
- The output is already small (e.g. `git diff --stat` on a tiny change).
- The user explicitly asks for raw output.

Raw-but-tracked: `rtk proxy <cmd>`. Raw and untracked: `rtk run -c "<cmd>"`.
When bypassing, briefly state why so the user understands the choice.

## DO NOT

- DO NOT run noisy commands without RTK when an RTK equivalent exists — check with `rtk hook check`.
- DO NOT pipe `cat`, `head`, or `tail` against large files instead of `rtk read` (`--max-lines`, `--tail-lines`).
- DO NOT run `rtk grep "x" dir/` without `-r`; it errors with `Is a directory`. Use `rtk grep -r` or `rtk rg`.
- DO NOT use `rtk lint` for anything but ESLint; use `rtk ruff`, `rtk mypy`, `rtk rubocop`, `rtk golangci-lint`, `rtk phpstan`.
- DO NOT broaden a command (`rtk grep -r "x" .`) when a path-scoped form would do (`rtk grep -r "x" src/`).
- DO NOT wrap interactive or streaming commands with RTK.
- DO NOT re-run the raw command to see elided lines when a `rtk recall <hash>` hint was printed.
- DO NOT silently swallow errors. If RTK changes the exit status or hides a stack trace, fall back to the raw command and report it.
- DO NOT chain `rtk proxy` for commands that already have a first-class RTK form.
- DO NOT use rtk-cli to compress the agent's own written prose — that's caveman's job.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The output is small enough to skip RTK" | If the command can produce many lines (git log, grep, find, test), use RTK; small output is the happy path, not the guarantee. |
| "cat/head/tail is fine for reading files" | Use `rtk read` (with `--max-lines`/`--tail-lines`) for any non-trivial file; raw cat/head/tail bypasses token optimization. |
| "RTK might change the command behavior" | RTK filters output, not semantics. If exit status or output looks suspicious, `rtk recall` the elided part or fall back to raw and report it. |
| "Wrapping an interactive command with RTK saves tokens too" | Never wrap interactive or streaming commands (docker logs -f, tail -f, REPLs, TUIs) with RTK. |
| "rtk proxy is a good default wrapper" | Use first-class RTK forms (rtk git, rtk grep -r, rtk read, rtk pytest); `rtk proxy` is for commands without a dedicated form — confirm with `rtk hook check`. |
| "rtk test is the wrapper for every test runner" | Dedicated wrappers (`rtk pytest`, `rtk cargo test`, `rtk jest`, `rtk vitest`, `rtk go test`, `rtk mvn test`) filter better; `rtk test <cmd>` is the generic fallback. |
| "Broadening the grep scope will catch more" | Run the smallest scoped command first; broaden only after narrowing proves insufficient. |
| "RTK truncated it, so I need the raw rerun" | A `[full output: rtk recall <hash>]` hint means the full output is stored; recall it (optionally `--grep`) instead of paying for a rerun. |
| "rtk gain errored, so RTK is broken" | `Failed to initialize tracking database` is a sandbox write block on the history DB; filtering still works. |

## Interaction with Other Skills

- **caveman** (complementary): caveman compresses agent prose; RTK compresses shell/tool output. Use both for max token savings.

## Verification

- [ ] `rtk --version` returns the expected version string (e.g. `rtk 0.49.0`) and not a "command not found" error or output from a different `rtk` package.
- [ ] `rtk init --show` lists the host agent's hook as `[ok]` (Claude Code: `Hook: rtk hook claude`).
- [ ] `rtk hook check "git status"` prints `rtk git status` and exits `0` — the rewrite engine is functional.
- [ ] `rtk gain` shows token savings data, or fails only with `Failed to initialize tracking database` inside a sandboxed shell (then confirm outside the sandbox or skip).
- [ ] Hook-based rewriting is active — run `git status` in a hooked shell and confirm (via `rtk gain --history`) that the command was routed through RTK rather than executed raw.

## Pairs With caveman

RTK compresses **shell/tool output**; caveman compresses **agent prose**. Use both
together for max token savings: wrap the command with `rtk`, then describe the
result in caveman style. See the `caveman` skill for the prose side.

## Final Checklist (each item must be literally true before finishing)

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Was RTK used for every command expected to produce noisy output? (yes/no)
- [ ] If a raw bypass was used, was the reason stated (not installed / breaks command
      / interactive / user requested raw)? (yes/no)
- [ ] Did the smallest useful/most-scoped command run first, before any broader rerun? (yes/no)
- [ ] Was `rtk read` used instead of `cat`/`head`/`tail` for any non-trivial file? (yes/no)
- [ ] Was `rtk grep` called with `-r` (or `rtk rg` used) for every directory search? (yes/no)
- [ ] Was every `rtk recall <hash>` hint used instead of a raw rerun when elided lines were needed? (yes/no)
- [ ] Is the returned output small enough to act on without re-running the command? (yes/no)
- [ ] If RTK's exit status or output looked suspicious, was it cross-checked against
      the raw command before reporting success/failure? (yes/no)
