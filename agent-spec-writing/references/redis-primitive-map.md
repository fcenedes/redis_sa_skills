# Redis Primitive Map

Load only when a spec touches Redis. Companion to gate check 4 in
[spec-quality-gate](spec-quality-gate.md): it names, per primitive, the rule
file to cite from the `redis-development` bundle and the domain skill to load.

Source: https://github.com/redis/agent-skills — the `redis-development` plugin
bundle (rule files under `rules/`, compiled in its `AGENTS.md`) and eight
domain skills. If they are not installed, do not install them: ask the user to
run `npx skills add redis/agent-skills` (or `--skill <skill-name>`, or
`/plugin install redis-development@claude-plugins-official`) and cite
official redis.io docs meanwhile. Local `redis-query-engine` and
`redis-vector-search` are older aliases of `redis-search`.

## Primitive → rule file

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
above and `rules/cluster-hash-tags.md`:

1. One dedicated connection for the whole sequence. `WATCH` and `MULTI` state
   is connection-local; a pooled connection is not shared or returned
   mid-sequence.
2. `WATCH applied:<id>`; `GET applied:<id>`. If present: `UNWATCH`, return
   "already applied".
3. `MULTI`; queue every command including `SET applied:<id> EX <ttl>`; `EXEC`.
   Any abort after `MULTI` and before `EXEC` uses `DISCARD` (which also
   unwatches) or closes the connection; `UNWATCH` sent after `MULTI` is only
   queued and cleans nothing.
4. `EXEC` returns nil when the watched key changed: retry the whole sequence
   up to a stated bound N, then return the stated terminal response.
5. `EXEC` returns an array: inspect every element. Redis continues past a
   runtime error inside the transaction and has no rollback, so any error
   element means partial failure even though `applied:<id>` is now set. Report
   failure, never success, and run the REQ's stated recovery contract
   (compensating commands or an idempotent re-run). Type safety and idempotency
   reduce the chance of partial failure; they are not rollback.
6. In Redis Cluster every key named in `WATCH` and in every queued command,
   read or write, shares one hash slot via a hash tag.

