# Spec Quality Gate

## Scope

- Change deltas (the shape in `change-delta-template.md`) that this skill
  drafts or edits: all thirteen checks apply.
- Other document families (architecture or workflow docs, contracts, data
  models, README or index updates, OpenSpec-native files): checks 1, 2, 3, 4,
  6, 7, and 9 apply; keep the family's own layout and record the others as
  `n/a: <family>`.
- Review-only or diff-compliance work: use the applicable checks as the
  rubric and report `Errors` / `Warnings` / `Info`; write no Validation Report.

## Results

Record every applicable check in the Validation Report with its label from
the Recording section. Allowed results: `pass`, `N fixed`, or `n/a: <family>`.
A check still failing at return time is an Error: list it under `- Errors:`
and include it in the count. `- Errors: 0` is true only when no check is open.

Commands: set `SPEC` once. `grep` exits 1 when it finds nothing; that is a
pass, so every command carries `|| [ $? -eq 1 ]` to survive `set -e`. Exit 2
is a command error.

```bash
SPEC=path/to/change-delta.md   # edit to the draft's path
```

## 1. Numbers rule

Every numeric literal inside a REQ body is one of:

- derived: arithmetic shown inline, e.g. `7 fields × 8 bytes × 5000 entities ≈ 280 KB`;
- cited: `file:line`, doc URL, rule file, or a standard listed in the header
  `Standards cited:` (HTTP status codes are cited once RFC 9110 appears there);
- `(measure)`: with the capture command in the Baseline (REQ-00) table.

Exempt: identifiers (REQ ids, key names, version strings), a sample size or
loop bound inside a capture command (a procedure parameter, not a claim; derive
any percentile index from it inline), and constants defined by a cited source.

Three passes. Unit-bearing literals:

```bash
grep -nE '[<>~≈] ?[0-9]|[0-9.]+ ?(ns|us|µs|ms|s|min|h|d|bytes?|bits?|B|KB|MB|GB|KiB|MiB|GiB|%|rps|qps|ops|req/s|km|m|nanoseconds?|microseconds?|milliseconds?|seconds?|minutes?|hours?|days?|percent|entities|requests|records|rows|items)\b' "$SPEC" || [ $? -eq 1 ]
```

Digits on scenario or constraint lines, including indented sub-bullets and
continuation lines:

```bash
grep -nE '^[[:space:]]*-?[[:space:]]*(Given|When|Then|Constraints|Contract shape):.*[0-9]|^[[:space:]]{4,}.*[0-9]' "$SPEC" || [ $? -eq 1 ]
```

Bare values: a line ending in a number, or any decimal:

```bash
grep -nE ':[[:space:]]*-?[0-9]+(\.[0-9]+)?[[:space:]]*$|[0-9]+\.[0-9]+' "$SPEC" || [ $? -eq 1 ]
```

Read every hit. Rewrite each unsupported constant. Fail cases from the
baseline: `Response body < 200 KB`, `~200-400 cluster centroids`,
`within 1s`, `192 KB memory budget` with no arithmetic, `threshold 0.3` with
no metric.

## 2. Weasel lint

```bash
grep -nE '\b(should|may|might|typically|sufficient|acceptable|probably|likely|roughly|reasonable|etc\.?)\b' "$SPEC" || [ $? -eq 1 ]
```

Case-sensitive on purpose: uppercase RFC 2119 / RFC 8174 keywords (`MUST`,
`SHOULD`, `MAY`) are normative and allowed in any slot when RFC 2119 is in
`Standards cited:`. Target: 0 unquoted lowercase hits in REQ bodies. Replace
each with a number, a command, or an Open Decisions row. Hits inside
backtick-quoted evidence text (any slot) and inside Open Decisions are
allowed; record the count.

## 3. Unit lock

A quantity is one measurement of one thing (p99 limiter latency, camera
distance from ground, window length). Each quantity uses one unit across the
whole document, declared in the header `Units used in this document`. Fail
case: p99 latency as `ms` in REQ-01 and as `s` in REQ-05; camera distance as
metres in one REQ and as a zoom level in another.

## 4. Primitive semantics

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
  | MULTI / EXEC batching, INCR atomics | `rules/data-transactions.md`, `rules/data-incr.md` | `redis-core` |
  | Data structure choice, key naming | `rules/data-choose-structure.md`, `rules/data-key-naming.md` | `redis-core` |
  | TTL, memory limits, hash field expiry | `rules/ram-*.md`, `rules/data-hash-field-expiry.md` | `redis-core` |
  | JSON vs Hash, JSON partial updates | `rules/json-*.md` | `redis-core` |
  | Streams vs Pub/Sub | `rules/stream-choosing-pattern.md` | `redis-core` |
  | Pipelining, pooling, blocking commands, client-side cache, timeouts | `rules/conn-*.md` | `redis-connections` |
  | FT.CREATE / FT.SEARCH / FT.AGGREGATE, field types, DIALECT 2, aliases, SKIPINITIALSCAN | `rules/rqe-*.md` | `redis-search` |
  | Vector index, HNSW/FLAT, FT.HYBRID, hybrid retrieval, RAG | `rules/vector-*.md` | `redis-search` |
  | Semantic cache (LangCache) | `rules/semantic-cache-*.md` | `redis-semantic-cache` |
  | Hash tags, CROSSSLOT, read replicas | `rules/cluster-*.md` | `redis-clustering` |
  | ACL, auth, TLS, network bind | `rules/security-*.md` | `redis-security` |
  | INFO, SLOWLOG, MEMORY DOCTOR, FT.PROFILE, metrics | `rules/observe-*.md` | `redis-observability` |
  | Agent memory on Redis Cloud (Iris), session events, long-term memory | skill body (no `rules/` file) | `iris-development` |
  | WATCH / optimistic locking / replay guards | none upstream — cite https://redis.io/docs/latest/develop/interact/transactions/ | — |
  | Redis Functions / Lua, keyspace notifications, Arrays, GEOSHAPE | none upstream — cite the redis.io doc URL | — |
  | Probabilistic: `BF.*`, `CF.*`, `CMS.*`, `TOPK.*`, `TDIGEST.*` | none upstream — cite https://redis.io/docs/latest/develop/data-types/probabilistic/ | — |

Fail case from the baseline: replay guard written as `SET applied:<id> NX`
before `MULTI`. `MULTI` has no conditional execution, and a check outside the
transaction is not atomic with it. Correct shape, per the transactions doc
above: `WATCH applied:<id>` → `GET` → skip if present → `MULTI` → work →
`SET applied:<id> EX <ttl>` → `EXEC`; on nil, retry up to a stated bound and
state the terminal response after the last attempt. In Redis Cluster the
watched key and every key written in the transaction share one hash slot via
a hash tag (`rules/cluster-hash-tags.md`).

## 5. Cross-REQ interactions

For every pair of REQs touching the same key prefix, table, endpoint, timer,
TTL, or returned object, write one row in the Cross-REQ Interactions table:
`none` or the conflict plus resolution.

Fail case: REQ-08 suppresses writes for unchanged positions while REQ-06
expires the position key after 300 s. A stationary entity vanishes after 300 s
though it is still broadcasting. Resolution must be stated (rotate the filter
below the TTL, or refresh TTL on a filter hit).

## 6. Consistency triad

MODIFIED, REMOVED, SUPERSEDED, Non-Goals, and acceptance scenarios agree:

- SUPERSEDED has rows → MODIFIED or REMOVED is not "none".
- A scenario exercises a Non-Goal → delete the scenario or the Non-Goal.
- A REQ changes existing code (`file:line` in `Evidence checked:`) → it
  appears under MODIFIED or REMOVED, not only ADDED.

## 7. Decision resolution

The author has authority to decide when the answer follows from repo
evidence, official docs, or the request text. Decide every such question in
this revision and cite. Anything else is a Decision row with Owner, Due, and
the REQs it blocks. A "Recommendation" without a decision, where the author
has authority, is a gate failure. If the request names no owner, the owner is
the requester's role, written as such.

DEFERRED holds items out of scope for this revision (trigger-gated). Open
Decisions holds in-scope questions without an answer (date-gated). A row
appears in exactly one.

Fail case: `EXPIRE vs HEXPIRE` deferred as architectural when the answer
follows from the notification model chosen two REQs later.

## 8. No "later" clauses

```bash
grep -nEi 'retarget|(after|once|when) REQ-[0-9A-Za-z]+ (lands|ships|is (done|merged|implemented))' "$SPEC" || [ $? -eq 1 ]
```

A hit is a failure when the clause changes the REQ's final target (one REQ
specified twice): reorder so the final target is specified once and delete
the clause. A hit that only states a precondition moves into `Depends on:`
and the DAG. Record this check by label only; do not paste the pattern into
the Validation Report.

## 9. Interoperability test

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

## 10. Dependency DAG derivable

No unresolved placeholders and no duplicate ids:

```bash
grep -nE 'REQ-<|^[[:space:]]*-?[[:space:]]*[A-Za-z /()-]+: <[^>]*>[[:space:]]*$' "$SPEC" || [ $? -eq 1 ]
grep -oE '^### REQ-[0-9A-Za-z]+' "$SPEC" | sort | uniq -d
```

Both print nothing. Counts agree:

```bash
grep -c '^- Depends on:' "$SPEC"; grep -c '^### REQ-' "$SPEC"
```

Every `REQ-` token anywhere in the document (scenarios, DAG edges, `Used by`,
`Superseded by`, Cross-REQ pairs, Test Strategy) matches a `### REQ-` heading
or `REQ-00`:

```bash
grep -oE 'REQ-[0-9A-Za-z]+' "$SPEC" | sort -u
```

The edge set has no cycle. The DAG section lists exactly the edges from the
fields; `Derived order:` is their topological sort. Document order is free;
the Summary states the grouping used when it differs from the derived order.
A sentence such as "migration order is encoded in the dependency fields" with
no dependency fields is a gate failure.

## 11. Slots complete

Every `Then:` uses one of these forms: named command plus expected output;
API response (HTTP status plus body shape, or protocol-native reply shape);
metric name plus expected value; file artifact plus the command that reads
it; UI state plus reproduction steps and the check that proves it (DOM query,
screenshot diff, or assertion); audit evidence plus its locator.

Every runtime REQ (endpoint, subscription, timer, query, external call, or
write) has non-`n/a` `Failure mode` (what the caller or operator observes on
failure) and `Observability`. Every REQ that writes durable state additionally
states the crash-mid-write outcome inside `Failure mode` and a non-`n/a`
`Rollback`. Every REQ that adds or changes an interface has a non-`n/a`
`Contract shape`. Every REQ has `Impacted files/components`. Every
`Handoff task` is a title only. The recorded result names every `### REQ-`
heading and its outcome (filled or `n/a` with reason).

## 12. Assumptions dispositioned

Every row of the Assumptions table keeps its text and has `Class` in
{`Verified`, `Verification step`, `Decision`} and a `Disposition` pointer:
Verified → the REQ whose `Evidence checked:` holds the citation;
Verification step → the Test Strategy or Baseline row holding the command;
Decision → the Open Decisions id. No row is blank, and no Decision text is
repeated outside Open Decisions.

## 13. Sections complete

- Baseline (REQ-00): present when any REQ makes a performance, size, latency,
  cost, or volume claim; every `Current` cell is `(measure)` or a cited or
  derived value; every `Baseline row:` names a metric in the table and every
  `Used by` cell names a REQ that references that row.
- Test Strategy: one row per non-deferred REQ.
- Security: a disposition line per REQ that adds an endpoint, a privileged
  operation, or a secret; otherwise `n/a: <reason>`.
- Consumer Rollback: a line per REQ with a non-`n/a` `Contract shape`;
  otherwise `n/a: <reason>`.
- Cross-REQ Interactions and Revision History: present with at least one row.

## Recording

Append to Validation Report, all thirteen labels verbatim:

```
- Quality gate:
  - 1 numbers: <pass | N fixed | n/a: family>
  - 2 weasel: <unquoted lowercase hits in REQ bodies>
  - 3 units: ...
  - 4 primitives: ...
  - 5 interactions: ...
  - 6 consistency: ...
  - 7 decisions: ...
  - 8 later-clauses: ...
  - 9 interoperability: ...
  - 10 dag: ...
  - 11 slots: <per-REQ outcomes>
  - 12 assumptions: ...
  - 13 sections: ...
```

Add a Revision History row. A newly created document is `Revision: 1`
regardless of how many gate passes produced it. An existing document keeps
its repo-native revision scheme and increments once per returned edit.
