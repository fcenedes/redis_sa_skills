# Spec Quality Gate

## Scope

- Change deltas (the shape in `templates/change-delta-template.md`) that this
  skill drafts or edits: all thirteen checks apply.
- Other document families (architecture or workflow docs, contracts, data
  models, README or index updates, OpenSpec-native files): checks 1, 2, 3, 4,
  6, 7, and 9 apply as attestations; keep the family's own layout; no
  Validation Report is added to the document, results go in the reply.
- Review-only or diff-compliance work: use the applicable checks as the
  rubric and report `Errors` / `Warnings` / `Info`; do not edit the reviewed
  document.

## Two kinds of check

Mechanical checks are asserted by the validator; run it and paste its summary
line into the Validation Report:

```bash
SPEC=path/to/change-delta.md   # edit to the draft's path
python3 "$(dirname "$0")/../scripts/validate-change-delta.py" "$SPEC"   # or the absolute skill path
```

Exit 0 = no structural errors. It checks: REQ id grammar
`REQ-<seg>(-<seg>)*` and duplicates; unresolved `<placeholders>` outside
backticks; every required slot per section; exactly one `Depends on:` per REQ
resolving to `none` or known ids; `Then:` present; DAG edges equal to the
fields, acyclic, `Derived order:` a valid topological order; every `REQ-`
token resolves; Open Decisions ids `D-<n>` unique; Assumptions classes and
pointers; a Test Strategy row per non-deferred REQ; thirteen gate labels with
results in grammar; `- Errors:` integer; a Revision History row; unquoted
lowercase weasel words; RFC 2119 keywords without RFC 2119 in
`Standards cited:`. It prints, for human classification, every numeric token
in REQ bodies (REVIEW) and every sequencing clause (WARNINGS).

Semantic checks are attestations: the author records evidence for each in
the Validation Report. An attestation without evidence is an open check.

## Results

Result grammar per label: `pass (detail)`, `N fixed (detail)`, or
`n/a: <family>`. A check still failing at return time is an Error: list it
under `- Errors:` and include it in the count; `- Errors: 0` is true only when
no check is open.

## 1. Numbers rule (attestation over the validator's REVIEW list)

Every numeric token the validator lists is one of: derived (arithmetic
inline), cited (`file:line`, doc URL, rule file, or a standard in
`Standards cited:`), `(measure)` with its Baseline capture command, or exempt
(identifier, version string, procedure parameter such as a loop bound inside a
capture command, constant defined by a cited source). Record
`pass (N tokens classified)`. Fail cases from the baseline:
`Response body < 200 KB`, `~200-400 cluster centroids`, `within 1s`,
`192 KB memory budget` with no arithmetic, `threshold 0.3` with no metric.

## 2. Weasel lint (validator)

Lowercase `should may might typically sufficient acceptable probably likely
roughly reasonable approximately appropriate adequate fast robust etc.`
outside backticks in a REQ body is an error. Uppercase RFC 2119 / 8174
keywords are allowed in any slot once `Standards cited:` lists RFC 2119.
Vocabulary the validator cannot judge ("as needed", "where possible"): the
author reads each REQ once for it and records `pass (read)`.

## 3. Unit lock (attestation)

A quantity is one measurement of one thing (p99 limiter latency, camera
distance from ground, window length). Each quantity uses one unit across the
document, declared in `Units used in this document`. Fail case: p99 latency
as `ms` in REQ-01 and `s` in REQ-05; camera distance as metres in one REQ and
as a zoom level in another.

## 4. Primitive semantics (attestation)

Every claim about how a platform primitive behaves (transaction conditional
execution, TTL and expiry, index update cost, pub/sub delivery, stream
redelivery, lock semantics) is verified against official docs or a platform
skill and cited in `Evidence checked:`.

- Prefer the platform-native product over a custom construct; if choosing
  custom, state why in one line.
- Cite only a file that contains the claim. If no rule file covers the
  primitive, cite the official doc URL and add a Validation Report warning
  naming the uncovered primitive.
- Redis: load the official skills from https://github.com/redis/agent-skills
  — the `redis-development` plugin bundle (rule files under `rules/`, compiled
  in its `AGENTS.md`) and the domain skill per primitive. If they are not
  installed, do not install them: ask the user to run
  `npx skills add redis/agent-skills` (or `--skill <skill-name>`, or
  `/plugin install redis-development@claude-plugins-official`) and fall back
  to official redis.io docs meanwhile.

  | Primitive | Rule file | Domain skill (redis/agent-skills) |
  |---|---|---|
  | Atomic multi-command execution (MULTI / EXEC), INCR atomics | `rules/data-transactions.md`, `rules/data-incr.md` | `redis-core` |
  | Data structure choice, key naming | `rules/data-choose-structure.md`, `rules/data-key-naming.md` | `redis-core` |
  | TTL, memory limits, hash field expiry | `rules/ram-*.md`, `rules/data-hash-field-expiry.md` | `redis-core` |
  | JSON vs Hash, JSON partial updates | `rules/json-*.md` | `redis-core` |
  | Streams vs Pub/Sub | `rules/stream-choosing-pattern.md` | `redis-core` |
  | Pipelining, pooling, blocking commands, client-side cache, timeouts | `rules/conn-*.md` | `redis-connections` |
  | FT.CREATE / FT.SEARCH / FT.AGGREGATE, field types incl. GEO and GEOSHAPE, DIALECT 2, aliases, SKIPINITIALSCAN | `rules/rqe-*.md` | `redis-search` |
  | Vector index, HNSW/FLAT, FT.HYBRID, hybrid retrieval, RAG | `rules/vector-*.md` | `redis-search` |
  | Semantic cache (LangCache) | `rules/semantic-cache-*.md` | `redis-semantic-cache` |
  | Hash tags, CROSSSLOT, read replicas | `rules/cluster-*.md` | `redis-clustering` |
  | ACL, auth, TLS, network bind | `rules/security-*.md` | `redis-security` |
  | INFO, SLOWLOG, MEMORY DOCTOR, FT.PROFILE, metrics | `rules/observe-*.md` | `redis-observability` |
  | Agent memory on Redis Cloud (Iris), session events, long-term memory | skill body (no `rules/` file) | `iris-development` |
  | WATCH / optimistic locking / replay guards | none upstream — cite https://redis.io/docs/latest/develop/using-commands/transactions/ | — |
  | Redis Functions / Lua, keyspace notifications, Arrays | none upstream — cite the redis.io doc URL | — |
  | Probabilistic: `BF.*`, `CF.*`, `CMS.*`, `TOPK.*`, `TDIGEST.*` | none upstream — cite https://redis.io/docs/latest/develop/data-types/probabilistic/ | — |

Fail case from the baseline: replay guard written as `SET applied:<id> NX`
before `MULTI`. `MULTI` has no conditional execution, and a check outside the
transaction is not atomic with it. Shape that holds, per the transactions doc
above:

1. `WATCH applied:<id>`; `GET applied:<id>`. If present: `UNWATCH`, skip.
2. `MULTI`; queue the work; `SET applied:<id> EX <ttl>`; `EXEC`.
3. `EXEC` returns nil when the watched key changed: retry up to a stated
   bound, then return the stated terminal response. Every exit before `EXEC`
   issues `UNWATCH` (or discards the connection) so a pooled connection is not
   left watching.
4. Redis keeps executing queued commands after a runtime error inside `EXEC`,
   so `applied:<id>` can be set while one queued command failed. Use this
   pattern only when every queued command is type-safe and idempotent, and
   state the recovery contract for a partial `EXEC`.
5. In Redis Cluster the watched key and every written key share one hash
   slot via a hash tag (`rules/cluster-hash-tags.md`).

## 5. Cross-REQ interactions (attestation)

One row per shared resource (key prefix, table, endpoint, timer, TTL,
returned object) touched by two or more REQs, listing those REQs and the
conflict or `none`. If no resource is shared, the table holds one row `none`.

Fail case: REQ-08 suppresses writes for unchanged positions while REQ-06
expires the position key after 300 s. A stationary entity vanishes after 300 s
though it is still broadcasting. Resolution must be stated (rotate the filter
below the TTL, or refresh TTL on a filter hit).

## 6. Consistency triad (attestation)

MODIFIED, REMOVED, SUPERSEDED, Non-Goals, and acceptance scenarios agree:

- SUPERSEDED has rows → MODIFIED or REMOVED is not `none`.
- A scenario exercises a Non-Goal → delete the scenario or the Non-Goal.
- A REQ changes existing code (`file:line` in `Evidence checked:`) → it
  appears under MODIFIED or REMOVED, not only ADDED.

## 7. Decision resolution (attestation)

The author has authority to decide when the answer follows from repo
evidence, official docs, or the request text. Decide every such question in
this revision and cite. Anything else is an Open Decisions row `D-<n>` with
Owner, Due, and the REQs it blocks. A "Recommendation" without a decision,
where the author has authority, is a gate failure. If the request names no
owner, the owner is the requester's role, written as such.

DEFERRED holds items out of scope for this revision (trigger-gated). Open
Decisions holds in-scope questions without an answer (date-gated). A row
appears in exactly one.

Fail case: `EXPIRE vs HEXPIRE` deferred as architectural when the answer
follows from the notification model chosen two REQs later.

## 8. No "later" clauses (validator warns, author judges)

The validator lists sequencing clauses (`retarget`, `after REQ-x lands`,
`once REQ-x ships`). A clause that changes the REQ's final target is a
failure: specify the final target once, delete the clause. A clause that only
states a precondition moves into `Depends on:`. Record `pass (N reviewed)`.

## 9. Interoperability test (attestation)

Per REQ: could two engineers implement this independently and produce
interoperable results? If not, add the missing detail. Categories that are
missing most often:

- wire shape (field list, types, units, array vs object), including how
  deletions or absences are conveyed;
- identifier definition (batch id, cursor, revision, key format);
- error and empty responses (status, body, header);
- ordering and bounds (limit, cap, truncation flag);
- retry bound and failure response for any coherence protocol;
- count per cycle, derived, for any REQ that adds queries, round trips,
  timers, or subscriptions;
- metric name and range for any threshold on a similarity, distance, or score.

## 10. Dependency DAG (validator)

Exactly one `Depends on:` per REQ; every id resolves; DAG edges equal the
fields; no cycle; `Derived order:` lists every REQ once in a valid
topological order. Document order is free.

## 11. Slots (validator for presence, attestation for applicability)

Validator: every required slot present per section, `Then:` present,
`Handoff task, if any:` a title only. Author attests:

- every `Then:` uses one of six forms: named command plus expected output;
  API response (HTTP status plus body shape, or protocol-native reply shape);
  metric name plus expected value; file artifact plus the command that reads
  it; UI state plus reproduction steps and the check that proves it; audit
  evidence plus its locator;
- every runtime REQ (endpoint, subscription, timer, query, external call, or
  write) has non-`n/a` `Failure mode:` and `Observability:`; state writers
  also state the crash-mid-write outcome and a non-`n/a` `Rollback:`;
- every REQ that adds or changes an interface has a non-`n/a`
  `Contract shape:`.

Record `pass (REQ-01 runtime filled, REQ-02 static n/a, ...)`.

## 12. Assumptions dispositioned (validator)

Every row has Class in {`Verified`, `Verification step`, `Decision`} and a
pointer of the matching kind; Decision pointers name an existing `D-<n>`.

## 13. Sections complete (validator for rows, attestation for applicability)

Validator: a Test Strategy row per non-deferred REQ, a Revision History row.
Author attests: Baseline present when any REQ makes a performance claim with
every `Current` cell `(measure)` or cited; Security has a line per REQ adding
an endpoint, privileged operation, or secret; Consumer Rollback has a line per
REQ whose `Contract shape:` changes what an existing consumer receives;
otherwise those sections read `n/a: <reason>`.

## Recording

Append to Validation Report, all thirteen labels verbatim:

```
- Quality gate:
  - 1 numbers: pass (N tokens classified)
  - 2 weasel: pass (0 unquoted hits; read)
  - 3 units: pass (<quantities>)
  - 4 primitives: pass (<rule files cited>)
  - 5 interactions: pass (<resources>)
  - 6 consistency: pass (...)
  - 7 decisions: pass (<D-ids or none>)
  - 8 later-clauses: pass (N reviewed)
  - 9 interoperability: pass (...)
  - 10 dag: pass (validator)
  - 11 slots: pass (<per-REQ outcomes>)
  - 12 assumptions: pass (validator)
  - 13 sections: pass (...)
```

Add a Revision History row. Use the spec family's own revision scheme when it
has one. Otherwise a newly created document is `Revision: 1` regardless of
how many gate passes produced it, and an existing document increments once per
returned edit.
