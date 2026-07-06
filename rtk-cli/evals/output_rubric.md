# RTK CLI Output Rubric

Grade each response the skill produced. Each criterion is PASS/FAIL, not a score out of 10.

## Trigger Correctness

PASS: The skill activated for shell/CLI commands expected to produce significant
output (git, tests, lint, build, logs, grep/find/ls, Docker/Kubernetes, package
managers) and did not activate for requests to shorten the agent's own written prose.

## False-Positive Avoidance

PASS: The skill did not wrap already-tiny commands (e.g. `git diff --stat` on a small
change), did not wrap interactive/streaming commands (`tail -f`, `docker logs -f`,
REPLs), and did not activate for PR-description or explanation-brevity requests
(those belong to `caveman`).

## False-Negative Avoidance

PASS: Commands phrased indirectly ("check the build", "see what changed", "watch for
crash-looping pods") were still recognized as candidates for an RTK wrapper, not run
raw by default just because the word "rtk" wasn't said.

## Task Fit

PASS: The specific RTK subcommand used matches the task (`rtk git diff` for diffs,
`rtk test "..."` for test runs, `rtk read` for files, `rtk grep`/`rtk find` for
search) rather than a generic or mismatched wrapper.

## Output Usefulness

PASS: The returned output is compact but still contains what's needed to act —
failing test names/counts, diff hunks, relevant log lines — not compressed into
uselessness.

## Safety Compliance

PASS: No destructive command's output was silently filtered in a way that hid a
failure, error, or non-zero exit status; if RTK's status looked suspicious, the raw
command was used to cross-check before reporting success.

## Token Discipline

PASS: The smallest/most-scoped command form ran first (path-scoped grep, single file
read, capped `git log -n`), and broader/raw reruns were avoided unless the narrower
form was insufficient.

## Evidence Requirements

PASS: Before claiming "RTK is installed" or "the hook is active," the response is
backed by an actual `rtk --version` / `rtk gain` / `rtk init --show` check — not
assumed.

## Verification Requirements

PASS: When output looked truncated, exit status seemed wrong, or a different `rtk`
binary might be on PATH (reachingforthejack/rtk collision), the response verified
with `which -a rtk` or a raw re-run rather than trusting RTK output blindly.

## Anti-Overreach Behavior

PASS: The skill did not attempt to wrap non-shell tasks (writing prose, answering
conceptual questions, editing files directly) in an RTK command, and did not force an
RTK wrapper onto interactive/streaming commands.

## Final-Answer Quality

PASS: Every checklist item in SKILL.md's "Final Checklist" is literally true for the
delivered response — RTK used where warranted, bypasses justified and stated, no
`cat`/`head`/`tail` substituted for `rtk read`, output small enough to act on without
re-running.
