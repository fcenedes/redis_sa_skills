# RTK Usage Reference

Operational reference for RTK (Rust Token Killer, https://github.com/rtk-ai/rtk). RTK proxies common shell commands and returns compact, token-efficient output. Verified against rtk 0.49.0; when this file and `rtk <cmd> --help` disagree, `--help` wins.

## Installation Hints

RTK is distributed as a single Rust binary (Homebrew: `brew install rtk`; also the upstream installer or cargo). After install:

```bash
rtk --version       # rtk 0.49.0
which -a rtk        # Rust Token Killer must come first
```

If `rtk gain` fails with "command not found" or unrelated subcommand help, you may have a different `rtk` (e.g. reachingforthejack/rtk — Rust Type Kit) on your PATH. Reorder PATH or rename the conflicting binary.

## Claude Code Setup

Initialize RTK as a Claude Code Bash hook so commands get rewritten transparently:

```bash
rtk init -g --auto-patch
```

This installs the native hook (`rtk hook claude`) in `~/.claude/settings.json`, writes `~/.claude/RTK.md`, and adds an `@RTK.md` reference to `~/.claude/CLAUDE.md`. Upgrading from a pre-0.37.2 install that used the legacy `rtk-rewrite.sh` shell hook? Re-run `rtk init -g` to migrate. Preview without writing: `rtk init -g --dry-run -v`.

## Claude Code Sandbox and RTK Tracking

Claude Code's sandboxed Bash tool only allows writes to the project directory, `$TMPDIR`, and a few system paths. RTK keeps its tracking database (`history.db`) and, in `sqlite` recall mode, the recall store in its data directory, which is outside that allowlist. Symptoms:

- `rtk gain` fails with `Failed to initialize tracking database: unable to open database file`.
- Filter commands (`rtk git`, `rtk grep`, `rtk pytest`, ...) run fine but record nothing: `rtk gain` totals stop growing, `rtk gain --history` shows no entries from sandboxed sessions, `rtk recall --list` stays empty.
- No warning is printed, even with `-v`. The hook (`rtk hook claude`) itself still rewrites commands because it runs outside the sandbox.

Fix (one-time, per machine): allow-list RTK's data directory for sandbox writes in `~/.claude/settings.json`:

```json
{
  "sandbox": {
    "filesystem": {
      "allowWrite": ["~/Library/Application Support/rtk"]
    }
  }
}
```

| OS    | RTK data directory                    |
|-------|---------------------------------------|
| macOS | `~/Library/Application Support/rtk`   |
| Linux | `~/.local/share/rtk` (or `$XDG_DATA_HOME/rtk`) |

`~/` expansion is supported. The same entry can go in the project's `.claude/settings.local.json` for a per-project scope, or be added from the `/sandbox` panel (Filesystem tab) in an interactive `claude` session. In testing (Claude Code desktop, macOS, rtk 0.49.0) the setting applied to the running session immediately; if tracking still fails, start a new session.

Agents: when you see the symptom, propose this change to the user and wait for approval before editing their settings. After the change, verify with a sandboxed `rtk wc -l <file>` followed by `rtk gain --history` showing that entry.

## Other Agents

```bash
rtk init -g --codex            # Codex CLI: $CODEX_HOME/AGENTS.md + RTK.md, no hook
rtk init -g --gemini           # Gemini CLI
rtk init -g --copilot          # GitHub Copilot (VS Code + CLI)
rtk init -g --agent cursor     # cursor | windsurf | cline | kilocode | antigravity | kimi | pi | hermes | droid | vibe | omp
rtk init -g --uninstall        # remove artifacts for the selected mode
```

## Verification

```bash
rtk init --show                # [ok]/[--] per integration: hook, RTK.md, CLAUDE.md, settings.json
rtk hook check "git status"    # dry-run the rewrite engine -> "rtk git status", exit 0
rtk gain                       # token savings analytics
rtk gain --history             # per-command history with savings (-H)
rtk gain --failures            # commands that fell back to raw execution (-F)
rtk gain --recalls             # elisions vs recalls per filter
rtk discover                   # missed RTK opportunities in Claude Code history
```

If `rtk init --show` reports `[--]` for the hook, re-run the appropriate `rtk init` command for the host agent.

## Discovering the Right Wrapper

`rtk rewrite` is the hook's single source of truth. Use it (or its dry-run alias) before assuming a first-class form exists:

```bash
rtk hook check "cargo test"    # rtk cargo test          (exit 0)
rtk hook check "npm test"      # No rewrite for: npm test (exit 1) -> rtk test npm test
rtk rewrite "grep -r foo src"  # rtk grep -r foo src
```

Exit 0 = rewritten form printed. Exit 1 = no RTK equivalent; use `rtk test <cmd>`, `rtk err <cmd>`, `rtk summary <cmd>`, or `rtk proxy <cmd>`.

## Command Mapping

| Raw command                 | Preferred RTK form                        | Notes |
|-----------------------------|-------------------------------------------|-------|
| `git status`                | `rtk git status`                          | Removes per-file noise. |
| `git diff`                  | `rtk git diff`                            | Compact hunks. |
| `git diff --stat`           | `rtk git diff --stat`                     | Already small; fine to bypass. |
| `git log`                   | `rtk git log -n 20`                       | Always cap with `-n`. |
| `git show <sha>`            | `rtk git show <sha>`                      | Summary + stat + compact diff. |
| `git add/commit/push/pull`  | `rtk git add/commit/push/pull ...`        | Collapses to `ok <hash>` / `ok <branch>`. |
| `ls -la`                    | `rtk ls .`                                | Ranks/clusters big trees. `rtk tree -L 2` for depth. |
| `cat path`                  | `rtk read path`                           | Multiple files OK, like cat. |
| `head -N path`              | `rtk read path --max-lines N`             | |
| `tail -N path`              | `rtk read path --tail-lines N`            | |
| `grep -r "x" dir/`          | `rtk grep -r "x" dir/`                    | **`-r` is required for directories**; without it: `grep: dir/: Is a directory`. |
| `grep "x" file`             | `rtk grep "x" file`                       | Accepts native grep flags (`-i`, `-A 3`, `-v`). |
| `rg "x" dir/`               | `rtk rg "x" dir/`                         | Native ripgrep, same compact filter. |
| `find . -name "*.md"`       | `rtk find . -name "*.md"`                 | Native find syntax; legacy `rtk find "*.md" .` still works. |
| `wc -l files`               | `rtk wc -l files`                         | |
| `pytest`                    | `rtk pytest -q`                           | Dedicated wrapper. |
| `cargo test`                | `rtk cargo test`                          | Dedicated wrapper. |
| `go test ./...`             | `rtk go test ./...`                       | |
| `mvn test` / `./gradlew test` | `rtk mvn test` / `rtk gradlew test`     | |
| `jest` / `vitest` / `playwright test` | `rtk jest` / `rtk vitest` / `rtk playwright test` | |
| `npm test` / `pnpm test`    | `rtk test npm test`                       | No dedicated rewrite; generic failures-only wrapper. |
| `npm run build`             | `rtk npm run build`                       | `rtk npm` covers `npm run` scripts only. |
| `npx tsc` / `npx eslint`    | `rtk npx tsc` / `rtk npx eslint`          | Auto-routes to `rtk tsc` / `rtk lint`. |
| `tsc --noEmit`              | `rtk tsc --noEmit`                        | |
| `eslint .`                  | `rtk lint .`                              | **ESLint only.** |
| `ruff check .` / `mypy .`   | `rtk ruff check .` / `rtk mypy .`         | Not `rtk lint`. |
| `prettier --check .`        | `rtk prettier --check .` or `rtk format`  | `rtk format` = prettier/black/ruff format. |
| `docker ps` / `docker logs` | `rtk docker ps` / `rtk docker logs <c>`   | Don't wrap `-f` streaming logs. |
| `docker compose ps`         | `rtk docker compose ps`                   | |
| `kubectl get pods`          | `rtk kubectl get pods`                    | `rtk oc` for OpenShift. |
| `gh pr list` / `glab mr list` | `rtk gh pr list` / `rtk glab mr list`   | |
| `aws ... ` / `psql ...`     | `rtk aws ...` / `rtk psql ...`            | Forces JSON / strips table borders. |
| `curl <url>`                | `rtk curl <url>`                          | Auto-JSON schema output. |
| `pip install x` / `uv run x`| `rtk pip install x` / `uv run rtk x`      | uv keeps its env; RTK goes inside. |
| `<any cmd>` (errors only)   | `rtk err <cmd>`                           | Shows only errors/warnings. |
| `<any cmd>` (summary)       | `rtk summary <cmd>`                       | Heuristic summary. |
| `<producer> \| ...`         | `<producer> \| rtk pipe -f <filter>`      | Apply a named filter to stdin (`pytest`, `grep`, `git-log`, ...). |
| `<any cmd>` (raw, tracked)  | `rtk proxy <cmd>`                         | Bypass filtering, keep `rtk gain` accounting. |
| `<any cmd>` (raw, untracked)| `rtk run -c "<cmd>"`                      | Plain `sh -c`, no filtering, no tracking. |

## Recovering Elided Output (`rtk recall`)

When a filter drops lines on failure or truncation, RTK stores the full output and appends a hint:

```
[full output: rtk recall 3f9c2a81d4e7]
```

Use the hint instead of re-running the raw command:

```bash
rtk recall 3f9c2a81d4e7                  # only the elided part (a unique prefix of the hash is enough)
rtk recall 3f9c2a81d4e7 --grep "Error"   # regex-filter the recalled lines
rtk recall 3f9c2a81d4e7 --from 120 --lines 40
rtk recall 3f9c2a81d4e7 --full           # complete original output
rtk recall --list                        # stored entries
rtk config recall                        # sqlite (default) | tee (legacy) | disabled
```

Recovery is failure- and truncation-driven only: successful, untruncated runs store nothing.

## Troubleshooting

- **`rtk gain` prints `Failed to initialize tracking database: unable to open database file`.** The shell sandbox is blocking writes to RTK's history DB (macOS: `~/Library/Application Support/rtk/history.db`). Filtering commands still work; only savings tracking is off. Run `rtk gain` from an unsandboxed shell, or ignore in-sandbox.
- **`rtk gain` shows nothing.** Hooks aren't installed. Re-run the appropriate `rtk init` command and confirm with `rtk init --show`.
- **`rtk grep "x" dir/` → `grep: dir/: Is a directory`.** RTK forwards native grep semantics. Add `-r` or use `rtk rg`.
- **Command output looks truncated and you need full output.** Look for a `[full output: rtk recall <hash>]` hint and use `rtk recall`. No hint? Run raw, or `rtk proxy <cmd>`.
- **Exit status differs from raw command.** Re-run raw to confirm the real status, then report it. Don't trust RTK's status if you suspect filtering is hiding a failure.
- **Not sure whether a wrapper exists.** `rtk hook check "<raw cmd>"` (exit 0 = yes, 1 = no). Never invent `rtk <tool>` forms.
- **Different `rtk` binary on PATH.** Run `which -a rtk` to list all candidates; the Rust Token Killer must come first.
- **Interactive command got mangled.** Don't wrap interactive commands. Run raw.
- **Hook didn't fire.** Confirm `rtk init --show` reports `[ok] Hook: rtk hook claude` and `[ok] settings.json`. Some non-shell tools bypass shell hooks entirely — call `rtk` explicitly via Bash in those cases.
- **Legacy `rtk-rewrite.sh` hook still referenced.** Pre-0.37.2 install. Re-run `rtk init -g` to migrate to the native binary hook.
- **CI environment.** RTK is fine in CI but rarely needed there since output goes to logs, not a token budget. Only use if you parse the output back into a token-billed agent.
