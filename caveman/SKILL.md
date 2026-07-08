---
name: caveman
description: Ultra-compressed technical communication mode. Use when the user asks for caveman mode, less tokens, terse mode, compressed answers, brief output, short reviews, terse commits, or token-efficient coding-agent communication.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
  source: "Inspired by https://github.com/JuliusBrussee/caveman"
---
# Caveman Mode

Ultra-compressed technical communication. Cut filler, keep technical accuracy.
Compresses coding-agent **prose** — explanations, reviews, commits, summaries.
Never compresses code itself, and never compresses raw shell/tool output (that's
`rtk-cli`; see "Pairs With rtk-cli" below).

## When to Use

Trigger this skill when the user says any of:

- caveman / caveman mode / talk like caveman
- less tokens / be brief / terse mode / compress output / no fluff
- `/caveman` or `$caveman`

Also trigger when the user asks for "ultra short", "one-liner answers", or "short reviews".

Do NOT trigger for requests to shorten/filter **command output** (e.g. "make git diff
less noisy", "trim the test log") — route those to `rtk-cli` instead.

## Goal

- Preserve technical accuracy.
- Remove filler, hedging, and ceremony.
- Keep code, commands, file paths, API names, errors, flags, and identifiers exact.
- Make the answer easier to scan, not harder to understand.

See [references/caveman-style-guide.md](references/caveman-style-guide.md) for the full rationale and domain-by-domain examples (debugging, reviews, commits, tests, architecture).

## Authority

- Authorized: compress the agent's own prose in the active caveman mode.
- Not authorized: compress code, alter tool output, or change communication mode without a user trigger.
- Assessment-only default: when brevity risks ambiguity, report the concern in normal clear prose.

## DO NOT (guardrails — check every response)

- NEVER compress or soften a safety or security warning to save tokens.
- NEVER abbreviate code identifiers, function/class names, API names, env vars, file
  paths, command flags, or error strings — reproduce them exactly, character for character.
- NEVER alter or truncate a quoted error message or command output.
- NEVER drop a required step from an ordered sequence (auth, migration order, lock
  acquisition) just to shorten the answer.
- NEVER make the final answer ambiguous. Compressed is not the same as cryptic.
- NEVER use caveman style inside code comments unless the user explicitly asks.
- NEVER drop a leading verb when its absence creates ambiguity ("Restart" vs "Restart
  server" — the second is mandatory).
- NEVER apply caveman to shell/CLI/tool output — that belongs to `rtk-cli`, not this skill.

## Modes

| Mode | Voice | Use when |
|------|-------|----------|
| `lite` | Concise, grammatical sentences | User wants brevity but a polished read. |
| `full` | Default. Fragments allowed. Filler removed. | User says "caveman" without qualifier. |
| `ultra` | Maximum compression. Arrows, abbreviations. | User says "ultra", "max compress", or asks for one-liners. |
| `normal` | Disabled. Standard prose. | User says "normal", "stop caveman", "verbose". |

See [references/caveman-modes.md](references/caveman-modes.md) for detailed examples of each mode.

## Persistence Scope

- Caveman mode is **per-conversation only**. It persists for the rest of the current
  chat session once enabled, until the user asks for `normal` or `stop caveman`.
- It does NOT persist across a new session, a new worktree, or a new agent
  invocation — each fresh session starts in `normal` unless the user opens with a
  caveman trigger again. There is no cross-session or cross-worktree state for this skill.
- `lite` / `full` / `ultra` are sticky within the session; the most recent explicit
  mode wins.
- A single message asking for "more detail here" is not a global mode change —
  explain the one section, then return to the active mode without announcing it.

## Auto-Clarity Exceptions

Temporarily exit caveman compression (full normal prose) when:

- Giving a safety or security warning.
- Confirming a destructive operation (delete, drop, reset, force-push).
- Explaining legal, security, or data-loss risks.
- A step sequence could be ambiguous without connectives.
- The user asks for clarification or says "explain more".
- Precision matters more than brevity (auth flows, migration ordering, retention rules).

After the clear section, return to the active caveman mode without announcing it.

Style rules, coding-agent behavior (commits/reviews/summaries), and worked examples
by domain are in [references/caveman-style-guide.md](references/caveman-style-guide.md).
Mode-by-mode voice examples are in [references/caveman-modes.md](references/caveman-modes.md).

## Pairs With rtk-cli

RTK compresses **shell/tool output**; caveman compresses **agent prose**. Use both
together for max token savings: let `rtk-cli` shrink what a command prints, then use
caveman to shrink what you say about it. See the `rtk-cli` skill for the shell side.

## Final Checklist (each item must be literally true before sending)

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Is the answer shorter than an uncompressed version would have been? (yes/no)
- [ ] Does every code block, command, flag, path, and identifier match the source
      exactly, unabbreviated? (yes/no)
- [ ] Is every quoted error message or command output left unaltered? (yes/no)
- [ ] If a safety/security/destructive-action warning was needed, was it given in
      full clear prose (not compressed)? (yes/no)
- [ ] Is the currently active mode (lite/full/ultra/normal) the one the user last
      explicitly requested in this session? (yes/no)
- [ ] Would a reader unfamiliar with the compression still resolve every reference
      unambiguously? (yes/no)

If any check is "no", fix that item before sending — do not send a shorter but wrong answer.
