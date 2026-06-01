# Packet Mode Reference

Use packet mode only when a plan has enough independent, file-owned work to
benefit from highly parallel dispatch. Packet mode does not replace epics,
tasks, capability ledgers, memory tracking, model discipline, Playwright gates,
or audits. It is an optional execution shape inside or alongside epics.

## When To Use

Use packet mode for:

- many disjoint file-owned implementation or docs tasks;
- hotspot files that need exactly one owner;
- generated or schema artifacts that need a single owner;
- dependency waves where later work must wait for specific packets;
- post-audit repair work that should be narrower than the original task.

Do not use packet mode for small task-only requests, broad architecture
judgment, ambiguous specs, or work where file ownership cannot be known yet.

## Packet Index

Create a packet index such as `packets/index.md` or a section in the epic file.
The index is the dispatch board:

```markdown
# Packet Index

Source of truth:
Plan:
Memory namespace:
Tracker:

| Packet | Status | Depends On | Owner | Allowed Files | Forbidden Files | Verify |
|---|---|---|---|---|---|---|
| P1 | planning | none | unassigned | `src/a.ts` | `src/shared.ts` | `npm test -- a` |
| P2 | blocked | P1 | unassigned | `src/b.ts` | `src/shared.ts` | `npm test -- b` |
| R1 | planning | P2.AUDIT | unassigned | `src/b.ts` | `src/shared.ts` | `npm test -- b` |
```

Statuses are `planning`, `running`, `blocked`, `failed`, `done`, and `audited`.
Mark dependency waves explicitly: wave 1 contains packets with no incomplete
dependencies; wave 2 starts only after wave 1 dependencies are done or audited.

## Packet Contract

Each packet is a worker contract, not a theme bucket:

```markdown
---
id: P1
title: <short name>
status: planning
depends_on: []
owner: unassigned
allowed_files:
  - src/a.ts
forbidden_files:
  - src/shared.ts
---

## Objective

## Repo And Branch

- Repo:
- Branch:

## Source Of Truth

## Required Skills

## Routing

- Worker role:
- Preferred worker/provider:
- Fallback worker/provider:
- Routing reason:
- Requested model/model class:
- Requested reasoning effort:
- Actual model: unknown until completion
- Actual reasoning effort: unknown until completion
- Inherited from coordinator: unknown until completion
- Why sufficient:

## Constraints

- Edit only `allowed_files`.
- Stop and report `NEEDS_CONTEXT` if another file is required.
- Do not change generated artifacts unless listed in `allowed_files`.
- Do not commit.

## Steps

## Verify With

## Output

- status:
- routing reason:
- requested/actual model and reasoning:
- inherited from coordinator:
- files changed:
- commands run:
- pass/fail/skip summary:
- blockers:
```

## Minimal Worker Context

Give each packet worker exactly the packet index and assigned packet file by
default. Add other source files only when the packet requires them. Do not paste
the full plan, long logs, or unrelated epic files into packet prompts.

## Dispatcher Prompt

```text
Use $agent-delegation-routing if available to confirm role, model/reasoning,
ownership, command shape, and fallback before starting.
Read only:
- <packet index path>
- <assigned packet path>
Repo: <repo path>
Branch: <branch>
You own only the packet's allowed_files.
Do not touch forbidden_files or opportunistically clean up nearby code.
If a required edit is outside allowed_files, stop with NEEDS_CONTEXT.
Run the packet verification command or record the skip/blocker honestly.
Return the packet output contract. Do not commit.
```

## Review Order

Review packets in this order:

1. Dependency status: no packet started before incomplete dependencies.
2. Boundary compliance: changed files are a subset of `allowed_files`.
3. Forbidden files: no edits to `forbidden_files`.
4. Acceptance criteria and verification evidence.
5. Integration impact on shared files and later waves.

If a packet fails, prefer a narrow repair packet such as `R1` instead of
reopening broad scope. The repair packet must list the exact files it may touch,
the failed evidence, and the re-check command.

## Split Heuristics

Good packet boundaries:

- one package, module, doc, workflow, fixture, or test family;
- one generated artifact owner;
- one API/schema owner plus its focused tests;
- one repair objective from an audit finding.

Bad packet boundaries:

- "frontend cleanup" without files;
- multiple workers sharing a hotspot file;
- one packet that owns source, docs, CI, and live proof;
- a packet that needs broad repo context to understand its task.
