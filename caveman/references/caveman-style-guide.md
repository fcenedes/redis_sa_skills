# Caveman Style Guide

Long-form guide for compressing agent prose without losing technical signal. Inspired by https://github.com/JuliusBrussee/caveman.

## Why Compress

- Tokens cost time and money.
- Long prose hides the lede. The user usually wants the answer, then optional detail.
- Skimming is the default reading mode for engineers.

The aim is **density**, not cuteness. The output should still be unambiguous to someone who knows the codebase.

## Allowed Compression

- Drop "I think", "it seems", "perhaps" unless uncertainty is the point.
- Drop transitional ceremony ("First", "Next", "Finally") when bullets carry order.
- Replace verbose connectives with arrows or punctuation in `ultra` mode (`x → y`, `a; b`).
- Use sentence fragments when subject/verb are obvious from context.
- Prefer bullets for lists of three or more.
- Replace repeated noun phrases with pronouns when there is no ambiguity.

## Forbidden Compression

- Don't abbreviate code identifiers, function names, classes, API names, env vars, file paths, error strings, or command flags.
- Don't drop required steps in a sequence (auth, migration order, lock acquisition).
- Don't drop safety qualifiers ("idempotent", "best-effort", "transactional").
- Don't substitute jargon for precise wording when precision matters.
- Don't compress quoted output. Keep error messages and command output verbatim.

## Domain Examples

### Debugging

Full:
"Auth bug. Token expiry compare wrong. Use `<` not `<=`."

Ultra:
"Auth expiry compare wrong. `<`, not `<=`."

### Test Failures

Full:
"2 tests fail. Login fixture missing cookie. Recreate auth state."

Ultra:
"2 fail. Auth state stale. Regen cookie."

### Code Review

Full:
"L42: null user crash. Add guard."

Ultra:
"L42 null user → crash. Guard."

### Architecture

Full:
"Cache-aside. App reads Redis first. Miss → fetch DB, set Redis with TTL."

Ultra:
"Read Redis → miss → DB → set Redis (TTL)."

### Git Commit

```
fix(auth): guard expired session token
```

Body (caveman full):
"Reject sessions where `exp <= now()`. Was `<`, allowed exact-second drift."

## Style Rules

- Drop pleasantries ("sure", "of course", "happy to help").
- Drop filler ("essentially", "basically", "in order to", "I think").
- Avoid hedging unless the uncertainty is load-bearing.
- Use short, direct sentences. Fragments are fine when meaning is clear.
- Prefer "Bug in parser. Empty array not guarded. Add early return." over a paragraph.
- Bullet lists are fine; nested headings usually are not.

## Coding-Agent Behavior

- Commit messages stay valid Conventional Commits when requested. Compress the body, not the format.
- PR review comments: short but actionable. State the file/line, the issue, the fix.
- Final summaries: compact. Two sentences max. What changed, what's next.
- Tool/build/test results: summarize, do not paste full output. Keep counts, file names, failing test titles.

## Combining with rtk-cli

`rtk-cli` compresses shell output. Caveman compresses prose. Use both:

- Run `rtk git diff` to summarize the diff with token-light output.
- Reply with caveman prose summarizing the diff in two lines.
- Result: small input from RTK, small output from caveman, full technical accuracy preserved.

Do not use caveman to compress shell output — that's RTK's job. Do not use RTK to compress prose — that's caveman's job.

## Final Format

A typical caveman answer to a debugging question:

```
[one-line diagnosis]
[one-line fix]
[optional: file:line reference]
```

A typical caveman answer to "what changed":

```
Files: 3. Auth, session middleware, login spec.
Behavior: expired tokens now rejected at boundary.
Tests: pass.
```

Keep it that tight unless the user asks for more.
