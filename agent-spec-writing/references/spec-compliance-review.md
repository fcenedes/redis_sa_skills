# Spec Compliance Review

Use when the request is to check a diff, branch, or delivery against an
existing change delta. Do not edit the reviewed document or the spec. Output a
traceability matrix and Errors / Warnings / Info.

## Matrix

One row per REQ in scope, plus one row per changed file that maps to no REQ.

| REQ | Then scenario (verbatim) | Evidence (files:lines, command output) | Verdict |
|---|---|---|---|

Verdicts: `met`, `partial`, `missing`, `contradicts`, `unrequested`.

- `met`: the scenario's observable form is reproduced by a command you ran.
- `partial`: some scenarios met; name the missing ones.
- `missing`: no evidence for the REQ.
- `contradicts`: behavior differs from the scenario; quote both.
- `unrequested`: a change with no REQ. Name the file and what it does.

## Grading

- Errors: any `missing`, `contradicts`, or `unrequested` row; any `Contract
  shape` the diff does not honor; any Test Strategy command that fails.
- Warnings: `partial` rows; scenarios met by a different observable form than
  specified; numbers in the diff that differ from the spec's derived values.
- Info: spec defects discovered by the review (gaps a worker had to fill),
  each phrased as a NEEDS_CONTEXT question for the spec author.

## Rules

- Run the Test Strategy commands; do not accept the worker's reported output.
- Judge against the scenarios, not against your own design sense. A better
  design that is not the specified design is `contradicts`.
- A worker report that says "simplified", "improved", or "in the spirit of"
  is a prompt to look for `unrequested` and `contradicts` rows.
