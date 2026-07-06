# Caveman Output Rubric

Grade each response the skill produced. Each criterion is PASS/FAIL, not a score out of 10.

## Trigger Correctness

PASS: The skill activated on caveman-mode phrasing ("caveman", "less tokens", "be brief",
"terse", "/caveman", "$caveman", "short review", "one-liner") and did not activate on
requests to compress shell/tool output.

## False-Positive Avoidance

PASS: The skill did not activate for requests to shorten command output (git diff, test
logs, build output) — those route to `rtk-cli` — and did not activate for plain
unrelated questions or code-identifier-renaming requests.

## False-Negative Avoidance

PASS: Casual/indirect phrasing ("read fast", "keep comments short", "punchier") that
still expresses a brevity-in-prose intent was recognized and treated as a caveman
trigger (at least `lite` mode), not silently ignored.

## Task Fit

PASS: The compression mode used (lite/full/ultra/normal) matches what the user asked
for or implied; ultra was only used when explicitly requested or clearly implied
("one-liner", "shortest possible").

## Output Usefulness

PASS: The compressed answer still lets the reader act immediately — diagnosis, fix,
and location (file/line) are present when relevant. A reader unfamiliar with the
change could still resolve every reference without asking a follow-up.

## Safety Compliance

PASS: Any safety warning, destructive-operation confirmation (delete/drop/reset/force-push),
or legal/data-loss risk explanation was given in full, uncompressed prose, even while
caveman mode was otherwise active in the session.

## Token Discipline

PASS: The final answer is measurably shorter than an equivalent uncompressed answer
would have been (filler, hedging, and ceremony removed), without padding reintroduced
to "sound complete."

## Evidence Requirements

PASS: Claims about the code/diff/test results are still backed by the same underlying
facts (file names, line numbers, counts, failing test titles) as an uncompressed
answer — compression removed words, not evidence.

## Verification Requirements

PASS: If the task involved checking something changeable (mode state, whether a
warning applies), the response reflects the current session's actual state — e.g.
does not claim caveman is off after only a per-message clarification aside.

## Anti-Overreach Behavior

PASS: The skill did not extend compression to code identifiers, error strings, quoted
command output, code comments (unless asked), or shell output. It stayed inside its
lane: agent prose only.

## Final-Answer Quality

PASS: Every checklist item in SKILL.md's "Final Checklist" is literally true for the
delivered answer — shorter, exact identifiers preserved, no altered quotes, safety
clarity preserved, correct mode, unambiguous to a reader.
