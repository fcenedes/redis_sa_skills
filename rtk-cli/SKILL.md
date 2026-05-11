---
name: rtk-cli
description: Use when running shell commands, inspecting files, checking git output, reading logs, running tests, lint, typecheck, builds, Docker/Kubernetes commands, package-manager commands, grep/find, or any CLI command likely to produce significant output. Prefer RTK wrappers to keep terminal output compact.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
# RTK CLI (Rust Token Killer)

Use RTK wrappers around noisy shell commands so terminal output stays compact and tokens stay low. RTK is a token-optimized CLI proxy that filters and summarizes verbose output (60–90% savings on common dev operations).

## When to Use

Trigger this skill whenever shell commands or command output are involved. In particular:

- Inspecting files, directories, or repository state.
- Reading or searching logs.
- Running tests, lint, typecheck, builds, or formatters.
- Working with git, Docker, Kubernetes, or package managers.
- Running `grep`, `find`, `ls`, or any command that can produce many lines.

Some Claude Code hooks rewrite Bash commands to RTK automatically. Even then, prefer calling RTK directly when output is likely to be large — it makes intent explicit and avoids relying on hook coverage. Some agents have built-in non-shell tools (Read, Grep) that bypass shell hooks entirely; in those agents, prefer the RTK shell equivalent for any operation that may produce a lot of output.

## Core Workflow

1. Verify RTK is installed:

   ```bash
   rtk --version
   rtk gain
   ```

2. Run the smallest useful command first. Narrow with paths, globs, or `-g` filters before broadening.
3. Wrap noisy commands with RTK:

   ```bash
   rtk git status
   rtk git diff
   rtk git log -n 20
   rtk ls .
   rtk read path/to/file
   rtk grep "pattern" .
   rtk find "pattern" .
   rtk tsc
   rtk lint
   rtk test "npm test"
   rtk test "pnpm test"
   rtk test "pytest"
   rtk test "cargo test"
   rtk npm run build
   rtk pnpm test
   rtk docker ps
   rtk docker logs <container>
   ```

4. If output is still too large, narrow further (a single file, a single test, a single container) before re-running.
5. Inspect savings periodically with `rtk gain` and `rtk gain --history`.

See [references/rtk-usage.md](references/rtk-usage.md) for installation, setup, verification, a full command-mapping table, and troubleshooting.

## Bypass Rules

Use the raw command (no RTK wrapper) only when:

- RTK is not installed or `rtk --version` fails.
- RTK breaks the command (parsing errors, missing flags, wrong exit code).
- The exact raw output is required (e.g., reproducing a bug, copying logs verbatim).
- The command is interactive or streaming (`docker logs -f`, `tail -f`, REPLs, watchers, TUIs).
- The user explicitly asks for raw output.

When bypassing, briefly state why so the user understands the choice.

## DO NOT

- DO NOT run noisy commands without RTK when an RTK equivalent exists.
- DO NOT pipe `cat`, `head`, or `tail` against large files instead of using `rtk read`.
- DO NOT broaden a command (`rtk grep "x" .`) when a path-scoped form would do (`rtk grep "x" src/`).
- DO NOT wrap interactive or streaming commands with RTK.
- DO NOT silently swallow errors. If RTK changes the exit status or hides a stack trace, fall back to the raw command and report it.
- DO NOT chain `rtk proxy` for commands that already have a first-class RTK form.

## Final Checklist

- RTK was used for any command likely to produce noisy output.
- Raw bypass was justified and explained when used.
- The smallest useful command ran first; broader reruns were avoided.
- No `cat`/`head`/`tail` was used in place of `rtk read` for large files.
- Output was small enough to act on without re-running.
