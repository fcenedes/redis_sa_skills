---
name: agent-memory-dreaming
description: Use MCP-backed agent-memory dreaming safely: create summaries, run scoped dreams, review/apply candidates, and browse taxonomy without polluting unrelated memory.
license: MIT
---

# Agent Memory Dreaming

Use this skill when working with shared `agent_memory` MCP memory and the task
involves durable memory capture, consolidation, deduplication, taxonomy
organization, or dream review/apply.

## End-to-end MCP Workflow

1. `create_dream_session_summary`
2. `run_memory_dream`
3. `get_memory_dream_run`
4. inspect candidates and rejected inputs
5. `review_memory_dream_candidates`
6. `apply_memory_dream_candidates`
7. browse via `get_memory_category_tree`

By default, stop after review unless the user or request explicitly calls for
applying accepted candidates.

## Policy

MCP is primary for agent memory workflows. Use CLI only when MCP is unavailable
and the user explicitly wants local debugging.

At session start, identify the current project, repository, customer, or task
domain. Search memory with the narrowest useful namespace, project name,
repository path, customer, or task domain. Use broad/global memory only for
stable preferences and cross-project setup. Ignore memories whose scope does not
match the current task.

Use the narrowest useful namespace. Use `user_id="pierre"` for Pierre's local
setup memories unless a more specific user is required.

Store only durable, future-useful facts: explicit user preferences, stable
project decisions, validated setup facts, reusable absolute paths, durable
constraints, project conventions, and recurring mistakes worth avoiding.

Never store secrets. Do not store API keys, tokens, credentials, private raw
logs, temporary errors, test IDs, scratch paths, guesses, contradicted facts,
session-local context that will not help future sessions, or project facts in a
namespace that unrelated agents would search.

## When To Create Summaries

Create `create_dream_session_summary` near the end of a meaningful session that
produced durable facts, decisions, conventions, recurring mistakes, explicit
preferences, or practice-specific evidence.

Do not create summaries for trivial, scratch, or purely exploratory turns.

## When To Run Dreams

Run `run_memory_dream` when a namespace has enough durable inputs to curate:
repeated or overlapping memories, durable session summaries, flat memories that
need taxonomy/category organization, or a human request to consolidate or clean
memory.

Use the narrowest namespace/user/session scope. Do not run broad dreams by
default.

## Review/Apply

Dream candidates are proposals. After `get_memory_dream_run`, inspect action,
confidence, evidence, source memory IDs, proposed memory, category path, and
rejected inputs before review.

Accept only durable, well-scoped, secret-free candidates. Reject session-local
facts, vague facts, guesses, duplicate noise, and candidates that would pollute
unrelated memory.

Only call `apply_memory_dream_candidates` after review. Apply is the mutation
step for accepted candidates.

## Category Browsing

After applying categorize candidates, call `get_memory_category_tree` to inspect
the taxonomy. Use `get_memory_category_memories` to verify representative
memories are classified under useful themes.
