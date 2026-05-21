# Agent Memory Coordination Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `agent-memory-coordination` more operational by adding concrete memory examples, read-before-write discipline, update-vs-append rules, and standard topics while keeping `SKILL.md` concise.

**Architecture:** Keep `agent-memory-coordination/SKILL.md` under 150 lines and move copy-heavy examples to `agent-memory-coordination/references/examples.md`. The main skill stays the decision and execution checklist; the reference file carries reusable examples agents can copy into memory.

**Tech Stack:** Markdown skill files, Bash validation via `scripts/validate-skills.sh`, repository line-count checks.

---

## File Structure

Modify:

- `agent-memory-coordination/SKILL.md`
  - Add a compact read-before-write rule.
  - Add update-vs-append guidance.
  - Add standard topic names.
  - Link to examples reference.
  - Keep under 150 lines.

Create:

- `agent-memory-coordination/references/examples.md`
  - Semantic worker prompt example.
  - Episodic gate result example.
  - Coordination packet template.

Verify:

- `bash scripts/validate-skills.sh`
- `wc -l agent-memory-coordination/SKILL.md`
- `rg -n "read before write|Update semantic|Append episodic|worker-prompt|integrator-prompt|coordination packet" agent-memory-coordination`

---

### Task 1: Add Examples Reference

**Files:**
- Create: `agent-memory-coordination/references/examples.md`

- [ ] **Step 1: Create examples reference**

Create `agent-memory-coordination/references/examples.md` with exactly:

```markdown
# Agent Memory Coordination Examples

Use these examples as copy-ready shapes for shared `agent_memory` coordination.

## Semantic Worker Prompt

```text
namespace: redis-protected-retrieval
user_id: pierre
memory_type: semantic
topics: worker-prompt, track-auth
entities: redis-protected-retrieval, auth worker

You are the auth-hardening worker.
Repo: /Users/pierre/Documents/Work/redis-protected-retrieval
You own: src/auth/**, tests/auth/**, config/auth.yaml
Do not edit: files outside your ownership.
Other workers are active; do not revert or reformat files you do not own.
Invariants: every endpoint requires a valid JWT; no raw SQL.
Verify: pytest tests/auth -q
Do not commit. Report files changed, test output, and blockers.
```

## Episodic Gate Result

```text
namespace: redis-protected-retrieval
user_id: pierre
memory_type: episodic
topics: gate-result, 2026-05-21
entities: redis-protected-retrieval, integration gate

2026-05-21: Integration gate passed for auth and retrieval tracks.
Live Redis proof skipped because PILOT_REDIS_URL was unset; this is not a passed proof.
Unit and integration tests passed with pytest -q.
```

## Coordination Packet

```text
namespace:
user_id:
worker:
owns:
must_not_touch:
constraints:
verify:
report:
may_commit:
```
```

- [ ] **Step 2: Verify examples file**

Run:

```bash
rg -n "Semantic Worker Prompt|Episodic Gate Result|Coordination Packet|PILOT_REDIS_URL" agent-memory-coordination/references/examples.md
```

Expected: all four phrases appear.

- [ ] **Step 3: Commit task**

Run:

```bash
git add agent-memory-coordination/references/examples.md
git commit -m "docs: add agent memory coordination examples"
```

Expected: commit succeeds.

---

### Task 2: Tighten Main Skill Rules

**Files:**
- Modify: `agent-memory-coordination/SKILL.md`

- [ ] **Step 1: Insert read-before-write and update rules**

In `agent-memory-coordination/SKILL.md`, replace the paragraph after the `Recommended fields` sentence with:

```markdown
Before writing a memory, search for an equivalent memory in the same namespace.
Update semantic memories when the durable truth changes. Append episodic
memories for new dated events, gate results, blockers, and skipped proofs.
```

- [ ] **Step 2: Add standard topics**

Add this compact paragraph after the new read-before-write rule:

```markdown
Prefer standard topics: `worker-prompt`, `integrator-prompt`, `ownership`,
`constraint`, `gate-result`, `blocker`, and `skip-reason`.
```

- [ ] **Step 3: Link examples reference**

Add this sentence at the end of the `Writing Good Memories` section:

```markdown
Use [examples](references/examples.md) for a worker prompt, gate result, and
coordination packet shape.
```

- [ ] **Step 4: Strengthen guardrails**

Add these bullets to `## DO NOT`:

```markdown
- Do not create duplicate memories before checking for an existing equivalent.
- Do not append a new semantic truth when an older semantic memory should be updated.
```

- [ ] **Step 5: Verify skill size and wording**

Run:

```bash
wc -l agent-memory-coordination/SKILL.md
rg -n "Before writing a memory|Update semantic|Append episodic|worker-prompt|integrator-prompt|references/examples.md|duplicate memories" agent-memory-coordination/SKILL.md
```

Expected:

```text
agent-memory-coordination/SKILL.md is below 150 lines
All searched phrases appear
```

- [ ] **Step 6: Commit task**

Run:

```bash
git add agent-memory-coordination/SKILL.md
git commit -m "docs: tighten agent memory coordination rules"
```

Expected: commit succeeds.

---

### Task 3: Final Validation

**Files:**
- Verify: `agent-memory-coordination/**`
- Verify: `scripts/validate-skills.sh`

- [ ] **Step 1: Run repository validation**

Run:

```bash
bash scripts/validate-skills.sh
```

Expected:

```text
Validation summary
  Errors:         0
  Warnings:       0
```

- [ ] **Step 2: Check skill line count**

Run:

```bash
wc -l agent-memory-coordination/SKILL.md
```

Expected: `agent-memory-coordination/SKILL.md` is below 150 lines.

- [ ] **Step 3: Check generated artifacts are not staged**

Run:

```bash
git status --short
git diff --cached --name-only
```

Expected: no `.DS_Store`, `__pycache__`, screenshots, `node_modules`, or build artifacts are staged.

- [ ] **Step 4: Commit plan file**

Run:

```bash
git add docs/superpowers/plans/2026-05-21-agent-memory-coordination-polish.md
git commit -m "docs: plan agent memory coordination polish"
```

Expected: commit succeeds if the plan file is not already committed.

---

## Self-Review

Spec coverage:

- Concrete examples are covered by Task 1.
- Read-before-write is covered by Task 2.
- Update semantic vs append episodic is covered by Task 2.
- Standard topics are covered by Task 2.
- Repo validation and artifact hygiene are covered by Task 3.

Placeholder scan:

- No placeholder markers or unresolved implementation notes are present.
- Every created file has exact content.
- Every verification command has expected output.

Type and naming consistency:

- The examples reference path is consistently `agent-memory-coordination/references/examples.md`.
- Topic names are consistent between the main skill and examples.
- Memory types are consistently `semantic` and `episodic`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-21-agent-memory-coordination-polish.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
