# Pressure Fixture: agent-spec-writing

Behavioral eval. Build the fixture repo, run the skill on the request, score
the output with the gate greps and the rubric. Every failure class below was
observed in a real first draft (GEV Redis spec, 2026-09-11) before version
1.3.0.

## Fixture repo

Node 20 + Fastify API with a Redis fixed-window rate limiter:
`README.md` (layout, current limiter, known issues), `src/limiter.js`
(`INCR` + `EXPIRE 60`, hardcoded limit 100), `src/server.js` (429 with empty
body), `docs/OPERATIONS.md` (run, observe, known issues).

Request: replace with a per-key sliding-window limiter, configurable limit;
429 tells the client when to retry; support staff can set a per-key override
that survives restarts; limiter overhead must drop versus today. Write the
spec to `out/SPEC.md`. No Redis or server is available to the agent.

## Expected failure classes (each must be absent from a passing output)

| Class | Baseline symptom | Gate check |
|---|---|---|
| Unsupported constant | `Response body < 200 KB`, `within 1s` | 1 |
| Weasel word | "acceptable for demo", "sufficient" | 2 |
| Unit drift | `zoom=8` and `altitude > 5000km` for one quantity | 3 |
| Wrong primitive semantics | `SET NX` before `MULTI` as replay guard | 4 |
| Cross-REQ liveness conflict | Bloom suppression vs position TTL | 5 |
| MODIFIED "none" with SUPERSEDED rows | six superseded items, MODIFIED empty | 6 |
| Deferred but decidable | EXPIRE vs HEXPIRE left as recommendation | 7 |
| Retarget-later clause | "retarget to hot index after REQ-06 lands" | 8 |
| Missing wire shape | delta endpoint with no `removed[]`, no retry bound | 9 |
| Dependencies only in prose | "order encoded in dependency fields" with none | 10 |
| Missing failure mode / rollback / observability | state-writing REQs without them | 11 |
| Untriaged assumptions | seven free-floating assumptions | 12 |
| Missing Test Strategy / Security / Consumer Rollback | absent sections | 13 |

## Scoring

1. Set `SPEC=out/SPEC.md`; run every command in
   `references/spec-quality-gate.md`. Record hits per check.
2. Verify the Validation Report lists 13 labels, none open, `- Errors: 0`.
3. Grade with `evals/output_rubric.md`. Pass = every rubric item satisfied and
   every row above absent.
