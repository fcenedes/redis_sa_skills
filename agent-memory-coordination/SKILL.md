---
name: agent-memory-coordination
description: Use when coordinating multiple parallel agents or subagents with shared agent_memory prompts, strict file ownership, integration passes, and verification gates across Codex, Claude Code, or other coding agents.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.1.1
---

# Agent Memory Coordination

Coordinate parallel agents through shared `agent_memory` instead of copying long
worker prompts through chat. For repo-backed plans, treat versioned repo docs,
trackers, plans, and capability ledgers as source of truth, `agent_memory` as
coordination cache, and chat as fallback only.

## Namespace Strategy

Use the narrowest useful namespace so agents do not retrieve unrelated memories:
project (`redis-protected-retrieval`), engagement (`acme-engagement`), repository
(`repo-redis-sa-skills`), or broad user preference (`global`, `user-defaults`).
Use broad namespaces only for stable cross-project conventions.

## Required Memory Lookup

Before dispatching workers:

1. Identify the project, repo, customer, or task namespace and `user_id`.
2. Search `agent_memory` with the narrowest matching namespace.
3. Report the backend name if known, searched namespace, searched `user_id`,
   search variants, and whether relevant project memories were found.
4. Retrieve semantic memories for prompts, constraints, ownership boundaries,
   and verification commands.
5. Retrieve episodic memories for recent tracks, skipped live proofs, blockers,
   and previous gate results.
6. Find the repo capability ledger when the task is follow-up, readiness,
   cross-tranche, cross-repo, or "what remains" work.
7. If memory is empty, check repo coordination docs and capability ledgers
   before asking the user.

Recommended fields: `namespace`, `user_id`, `memory_type`, `topics`, and
`entities`. Use `semantic` for reusable prompts and `episodic` for dated
results.

Before writing a memory, search for an equivalent memory in the same namespace.
Update semantic memories when the durable truth changes. Append episodic
memories for new dated events, gate results, blockers, and skipped proofs.

## Tool Capability Discovery

Before declaring `agent_memory` unavailable or read-only, actively discover the
available memory tools. In Codex, Claude Code, or any MCP-based agent, search or
inspect tool names/descriptions for create, add, write, save, upsert, edit,
update, and set-working-memory operations. Lazy-loaded tools may not appear
until searched.

Report read and write capability separately:

```text
Memory backend:
Namespace searched:
User id searched:
Read tool available: yes/no
Write tool discovery attempted: yes/no
Write tool available: yes/no
Write tool used: <tool name or none>
Memory write confirmed: yes/no
Fallback used: repo tracker / repo docs / none
```

If a write tool appears after discovery, use it before reporting degraded mode.
If no write tool is available after discovery, continue with repo tracker files
and say that memory writes are unavailable after tool discovery.

## Source Hierarchy

Use this hierarchy for repo-backed coordination:

1. Versioned repo docs, trackers, plans, and capability ledgers are the source of truth.
2. `agent_memory` is a synchronization cache for prompts, summaries, task state, and ledger row pointers.
3. Chat is fallback only.

When memory conflicts with repo docs, follow repo docs and update or replace the
memory after verification.

When a capability ledger exists, memory records should point to ledger rows and
summarize current status. They must not supersede versioned evidence, tracker
rows, or verification commands.

## Writing Memories

Store durable coordination material only: reusable worker or integrator prompts,
ownership maps, constraints, verification commands, dated results, skipped
proofs, blockers, decisions, and compact capability-ledger status summaries.
Make each memory self-contained with concrete names and absolute dates. Include
capability ID, ledger path, status, evidence path, validation date, and next
delta task when writing ledger-related memories. Use [examples](references/examples.md)
for copy-ready worker prompts, gate results, coordination packets, and bootstrap
packets.

## Cross-Agent Memory Bootstrap

If `agent_memory` returns no relevant memories but repo coordination docs or a
capability ledger exist, do not stop. Confirm branch and commit, read the repo
coordination docs and ledger, treat the repo files as source of truth, seed the
available memory backend with a coordination summary if writes are supported,
then continue review or implementation. Ask the user only when memory and repo
source files are both missing.

For Claude Code, use the copy-ready bootstrap report and repo-backed seed
template in [examples](references/examples.md).

## Dispatch Pattern

Run `git status --short`, protect unrelated local changes, reserve shared files
for the integrator, give each worker a disjoint write set, and tell workers they
are not alone. Inspect each worker diff against ownership, reject unrelated
churn, run focused tests, run the integration pass, then run the full quality
gate before committing or pushing.

## Integration Pass

Use a separate integrator prompt when workers touch adjacent systems or shared
files. The integrator preserves worker intent, reconciles shared config and
docs, runs combined tests and the full gate, and records skipped opt-in live
proofs honestly. If two workers need the same file, merge the tracks or move
that file to the integrator.

## Recovery

- Memory store unavailable: use inline prompts, note degradation, and save reusable prompts later.
- Required prompt missing: seed from repo docs and continue; ask only if repo docs are also missing.
- Memory outdated or contradicted: replace it with the latest validated state.
- Retrieved memory scope ambiguous: ask before applying it.
- Write tool appears after initial failure: write the durable record and correct any degraded-mode tracker notes.

## Live Proof Honesty

If an opt-in proof skips because an environment variable or live system is
missing, record it as skipped, not passed. Include command, skip reason, and
missing prerequisite.

## Final Report

Include memory backend, namespace searched, `user_id`, whether relevant memories
were found, read capability, write-discovery result, write tool used, whether
memory was seeded, fallback used, worker ownership, changed files, focused
tests, full gate result, live proof result or skip reason, commit SHA and pushed
branch when applicable, and remaining unrelated untracked files.

## DO NOT

- Do not dispatch workers before checking shared memory for saved prompts.
- Do not report "no memories" without backend, namespace, `user_id`, and fallback status.
- Do not claim `agent_memory` write is unavailable before discovering lazy-loaded memory tools for create/add/write/save/upsert/edit/update/set operations.
- Do not confuse a read-only memory surface with the full memory backend until tool discovery has been attempted.
- Do not claim memory was seeded or updated unless a write-capable backend confirmed the write.
- Do not use chat as the durable fallback when memory is unavailable; use repo tracker files.
- Do not let two workers own the same file; reserve conflicts for integration.
- Do not let workers commit unless explicitly assigned.
- Do not block on missing memory when repo coordination docs exist.
- Do not treat memory as more authoritative than versioned repo docs.
- Do not let stale memory override a capability ledger row or verification evidence.
- Do not overwrite unrelated user changes.
- Do not claim a live proof passed when it skipped.
- Do not store secrets, credentials, tokens, raw logs, temporary IDs, or guesses.
- Do not use memory from a broad namespace when a project-specific namespace exists.
- Do not create duplicate memories before checking for an existing equivalent.
- Do not append a new semantic truth when an older semantic memory should be updated.
- Do not dispatch from stale memory without checking repo source docs, trackers, plans, and ledgers.

## Checklist

- [ ] Backend, namespace, `user_id`, search variants, fallback, and seed status reported.
- [ ] Lazy-loaded memory write tools were searched before write-unavailable status was recorded.
- [ ] Memory writes were confirmed, or write-unavailable degraded mode was recorded.
- [ ] Repo docs and capability ledgers checked when memory is empty; memory seeded when backend writes are available.
- [ ] Unrelated local changes protected; worker ownership is disjoint; shared files reserved for integration.
- [ ] Workers received self-contained prompts, verification commands, and final report requirements.
- [ ] Worker diffs, integration pass, focused tests, and full gate completed.
- [ ] Skipped proofs recorded honestly; durable outcomes saved back to `agent_memory`.
