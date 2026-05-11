# RTK Usage Reference

Operational reference for RTK (Rust Token Killer). RTK proxies common shell commands and returns compact, token-efficient output.

## Installation Hints

RTK is distributed as a single Rust binary. Install via the upstream installer or your preferred Rust package manager. After install:

```bash
rtk --version       # rtk X.Y.Z
which rtk           # confirm correct binary
```

If `rtk gain` fails with "command not found" or unrelated subcommand help, you may have a different `rtk` (e.g. reachingforthejack/rtk — Rust Type Kit) on your PATH. Reorder PATH or rename the conflicting binary.

## Claude Code Setup

Initialize RTK as a Claude Code Bash hook so commands get rewritten transparently:

```bash
rtk init -g --auto-patch
```

This patches the user-level `~/.claude/settings.json` (or equivalent) so eligible Bash commands are routed through RTK with zero-token overhead.

## Codex Setup

For OpenAI Codex / similar CLI agents:

```bash
rtk init -g --codex
```

## Verification

```bash
rtk init --show           # show current RTK config
rtk gain                  # token savings analytics
rtk gain --history        # per-command history with savings
```

If `rtk init --show` reports no integration, re-run the appropriate `rtk init` command for the host agent.

## Command Mapping

| Raw command                 | Preferred RTK form                  | Notes |
|-----------------------------|-------------------------------------|-------|
| `git status`                | `rtk git status`                    | Removes per-file noise. |
| `git diff`                  | `rtk git diff`                      | Compact hunks. |
| `git diff --stat`           | `rtk git diff --stat`               | Already small; fine to bypass. |
| `git log`                   | `rtk git log -n 20`                 | Always cap with `-n`. |
| `ls -la`                    | `rtk ls .`                          | Ranks/clusters big trees. |
| `cat path`                  | `rtk read path`                     | Use for any non-trivial file. |
| `head/tail path`            | `rtk read path`                     | Avoid `head`/`tail` for token cost. |
| `grep -r "x" .`             | `rtk grep "x" .`                    | Always scope by path. |
| `find . -name "x"`          | `rtk find "x" .`                    | Limit by path first. |
| `npm test` / `pnpm test`    | `rtk test "npm test"`               | RTK strips noisy logs, keeps failures. |
| `pytest` / `cargo test`     | `rtk test "pytest"` / `rtk test "cargo test"` | Same. |
| `tsc --noEmit`              | `rtk tsc`                           | |
| `eslint .` / `ruff .`       | `rtk lint`                          | |
| `npm run build`             | `rtk npm run build`                 | |
| `docker ps` / `docker logs` | `rtk docker ps` / `rtk docker logs <c>` | Don't wrap `-f` streaming logs. |
| `kubectl get pods`          | `rtk kubectl get pods`              | When supported. |

When in doubt, run `rtk proxy <cmd>` to bypass RTK filtering while keeping the call traceable in `rtk gain --history`.

## Troubleshooting

- **`rtk gain` shows nothing.** Hooks aren't installed. Re-run the appropriate `rtk init` command.
- **Command output looks truncated and you need full output.** Run the raw command directly, or use `rtk proxy <cmd>`.
- **Exit status differs from raw command.** Re-run raw to confirm the real status, then report it. Don't trust RTK's status if you suspect filtering is hiding a failure.
- **Different `rtk` binary on PATH.** Run `which -a rtk` to list all candidates; the Rust Token Killer must come first.
- **Interactive command got mangled.** Don't wrap interactive commands. Run raw.
- **Hook didn't fire.** Confirm Claude Code settings include the RTK hook (`rtk init --show`). Some non-shell tools bypass shell hooks entirely — call `rtk` explicitly via Bash in those cases.
- **CI environment.** RTK is fine in CI but rarely needed there since output goes to logs, not a token budget. Only use if you parse the output back into a token-billed agent.
