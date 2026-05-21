---
name: agent-memory-coordination
description: Use when coordinating multiple parallel agents or subagents with shared agent_memory prompts, strict file ownership, integration passes, and verification gates across Codex, Claude Code, or other coding agents.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.1.0
---

# Agent Memory Coordination

Coordinate parallel agents through shared `agent_memory` instead of copying long
worker prompts through chat. Treat memory as the canonical source for reusable
worker prompts, integrator prompts, ownership boundaries, stable constraints,
and dated execution evidence.

## What Belongs in Memory

Store durable coordination material: worker prompts, integrator prompts,
ownership maps, shared-file reservations, project constraints, invariants,
verification commands, dated execution results, skipped proofs, blockers, and
decisions.

Do not store secrets, credentials, tokens, API keys, raw private logs, temporary
IDs, scratch paths, guesses, or facts contradicted by the user.

## Namespace Strategy

Use the narrowest useful namespace so agents do not retrieve unrelated memories:
project (`redis-protected-retrieval`), customer (`customer-acme`), repository
(`repo-redis-sa-skills`), or broad user preference (`global`, `user-defaults`).
Use broad namespaces only for stable cross-project conventions.

## Required Memory Lookup

Before dispatching workers:

1. Identify the project, repo, customer, or task namespace and `user_id`.
2. Search `agent_memory` with the narrowest matching namespace.
3. Retrieve semantic memories for prompts, constraints, ownership boundaries,
   and verification commands.
4. Retrieve episodic memories for recent tracks, skipped live proofs, blockers,
   and previous gate results.
5. If a required prompt is missing, stop and ask before reconstructing it from
   chat.

Recommended fields: `namespace`, `user_id`, `memory_type`, `topics`, and
`entities`. Use `semantic` for reusable prompts and `episodic` for dated
results.

Before writing a memory, search for an equivalent memory in the same namespace.
Update semantic memories when the durable truth changes. Append episodic
memories for new dated events, gate results, blockers, and skipped proofs.

Prefer standard topics: `worker-prompt`, `integrator-prompt`, `ownership`,
`constraint`, `gate-result`, `blocker`, and `skip-reason`.

## Writing Good Memories

Future agents do not have the original conversation. Make every memory
self-contained:

- use concrete names, not pronouns;
- use absolute dates, not relative dates;
- include enough context to act without follow-up questions;
- store one fact, prompt, decision, or result per memory;
- use semantic memories for reusable prompts and constraints;
- use episodic memories for dated outcomes and gate results.

Reusable worker or integrator prompts must state repo path, branch rules, exact write ownership,
files not to edit, invariants, verification commands, final response requirements, and commit rules.

Use [examples](references/examples.md) for a worker prompt, gate result, and
coordination packet shape.

## Dispatch Pattern

Use this coordinator sequence:

1. Run `git status --short` and protect unrelated local changes.
2. Reserve shared files for the integrator.
3. Give each worker a disjoint write set.
4. Tell workers they are not alone and must not revert others.
5. Dispatch independent workers in parallel.
6. While workers run, do non-overlapping coordination or review work.
7. On worker completion, inspect the diff against ownership.
8. Reject fail-open security behavior, broad rewrites, and unrelated churn.
9. Run focused tests for each worker area.
10. Run the integration pass for shared files.
11. Run the full quality gate before committing or pushing.

## Integration Pass

Use a separate integrator prompt when workers touch adjacent systems. The
integrator owns shared files and resolves interaction between tracks. The
integrator must preserve each worker's intended behavior, reconcile shared
config and entrypoint wiring, update docs when plans changed, run combined
tests, run the full gate, and record skipped opt-in live proofs honestly.

If two workers need the same file, either merge the tracks or move that file to
the integrator's scope. If a worker edits outside its boundaries, reject the
change.

## Recovery

- Memory store unavailable: fall back to inline prompts, note the degradation,
  and save reusable prompts after the session.
- Required prompt missing: ask the user; do not silently reconstruct a canonical
  prompt from guesses or chat fragments.
- Memory outdated or contradicted: replace it with the latest validated state.
- Retrieved memory scope ambiguous: ask before applying it.

## Live Proof Honesty

If an opt-in proof skips because an environment variable or live system is
missing, record it as skipped, not passed. Include command, skip reason, and
missing prerequisite.

```text
Live Redis proof attempted with `pytest tests/integration/test_live_redis_query_engine.py`.
Result: skipped because `PILOT_REDIS_URL` was unset; this is not a passed proof.
```

## Final Report

Include memory lookup status, worker ownership, changed files, focused tests,
full gate result, live proof result or skip reason, commit SHA and pushed branch
when applicable, and remaining unrelated untracked files.

## DO NOT

- Do not dispatch workers before checking shared memory for saved prompts.
- Do not let two workers own the same file; reserve conflicts for integration.
- Do not let workers commit unless explicitly assigned.
- Do not reconstruct missing canonical prompts silently.
- Do not overwrite unrelated user changes.
- Do not claim a live proof passed when it skipped.
- Do not store secrets, credentials, tokens, raw logs, temporary IDs, or guesses.
- Do not use memory from a broad namespace when a project-specific namespace exists.
- Do not create duplicate memories before checking for an existing equivalent.
- Do not append a new semantic truth when an older semantic memory should be updated.

## Checklist

- [ ] Namespace, `user_id`, prompts, constraints, ownership, and gate results retrieved or noted missing.
- [ ] Unrelated local changes protected; worker ownership is disjoint; shared files reserved for integration.
- [ ] Workers received self-contained prompts, verification commands, and final report requirements.
- [ ] Worker diffs, integration pass, focused tests, and full gate completed.
- [ ] Skipped proofs recorded honestly; durable outcomes saved back to `agent_memory`.
