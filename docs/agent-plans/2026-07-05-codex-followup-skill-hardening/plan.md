# Plan: Codex follow-up on skill-hardening residual risks

- **Date:** 2026-07-05
- **Repo:** redis_sa_skills (worktree: `pensive-kirch-12fedb`, branch: `claude/pensive-kirch-12fedb`)
- **Source of truth:** [`docs/skill-evaluation-report.md`](../../skill-evaluation-report.md), sections 10 (Remaining risks) and 11 (Recommended next improvements). That report is itself the eval/improve/benchmark record of a prior pass over all 17 skills in this repo (0 commits made in that pass).
- **Non-goals:** No new skills. No commits or pushes (Commit policy below is explicit and binding). No re-litigating description/DO NOT/checklist content already fixed in the prior pass — only the 5 items below.
- **Plan granularity:** Task-only. 5 small, mostly file-disjoint follow-up items from one report, one delegated worker family (Codex CLI), one repo, one branch. Not multi-goal/multi-area enough to justify epics.
- **Execution mode:** `plan-only` — the user asked for "the prompt to delegate to Codex," i.e. a handoff artifact, not immediate dispatch from this session. See [`coordinator-prompt.md`](coordinator-prompt.md) for the fenced block to paste into Codex CLI.
- **Autonomy mode (for the Codex run once started):** `autonomous` — Codex dispatches all 5 tasks, runs the Auditor task inline, and only returns to the user on a true decision-blocker (see Coordinator Blocker Handling below) or once all tasks are `audited`.
- **Commit policy:** `not allowed`. Codex must leave all changes uncommitted on the working tree, exactly like the prior pass. Pushing and default-branch changes are never in scope for this plan.

## Local terminology sources

- "Skill" = a directory under repo root with a `SKILL.md` per the Agent Skills spec and this repo's own `AGENTS.md` (frontmatter: `name`, `description`, `license`, `metadata.author`, `metadata.version`; body: imperative instructions, `DO NOT` guardrails, final checklist).
- "Line budget" = `AGENTS.md`: "Keep `SKILL.md` files concise. Prefer under ~150 lines." (repo convention, not a hard spec requirement).
- "Validator" = `scripts/validate-skills.sh`, the repo's own frontmatter/artifact/TODO checker. It does **not** currently check line length — do not add that check as part of this plan (out of scope; noted as a separate future item in the source report, §11.1 talks about further trimming, not validator changes).
- "Compatibility field" convention = a **top-level** frontmatter key, sibling to `license` and `metadata`, e.g.:
  ```yaml
  compatibility: Requires Node.js; optional Playwright Chromium and Decktape for overflow/export validation.
  ```
  This is the corrected convention already applied to 8/17 skills in the prior pass (`redis-presentation-decks/SKILL.md` is the canonical example). Do **not** nest it under `metadata:` — that was a defect found and fixed in the prior pass in 4 other skills; do not reintroduce it.

## Capability ledger disposition

No dedicated `agent-capability-ledger` file exists for this repo (verified: `find . -iname "*ledger*"` outside `agent-capability-ledger/` itself returns nothing). Per the Capability Ledger Gate, the baseline classification for this specific follow-up comes from `docs/skill-evaluation-report.md` §10/§11, which already carries per-item status (all 5 items are explicitly `missing`/`deferred` residual risks, not `done`). This is treated as the baseline ledger source for this plan; a full `agent-capability-ledger` file is not created because the scope is 5 bounded, already-fully-specified items with no ambiguity about what remains — spinning up ledger ceremony would not change any task's scope. If a 6th unrelated follow-up round is requested later, use `agent-capability-ledger` properly at that point.

## Anchoring disposition

This is a follow-up plan, which normally requires `charter.md` + `00-index.md`. Skipped here, with justification: single worker family (Codex), single repo/branch, single sitting expected (5 small bounded tasks + 1 audit, no multi-agent parallel coordination beyond simple file-disjoint parallelism, no expected cross-session resume). `plan.md` + `tracker.md` + `coordinator-prompt.md` carry the full contract. If Codex has to stop mid-way and resume in a later session, promote this to anchored form (add `charter.md`/`00-index.md`) before continuing — do not silently resume from tracker.md alone across a session boundary.

## Skill stack (whole plan)

- `rtk-cli`: wrap `wc -l`, `grep`, `git status/diff` output during verification (noisy shell output).
- `caveman lite`: default voice for the coordinator's own status updates and the final report to the user.
- `agent-delegation-routing`: every task and the coordinator prompt must recommend consulting it before dispatch (see Task Contracts below) — it is available in this repo at `agent-delegation-routing/SKILL.md`.
- No UI/frontend/browser work in this plan — Playwright mandate does not apply.
- No requirements/spec authoring needed — `agent-spec-writing` not required; scope is fully specified by the source report.

## Token economy

- Use `rtk-cli` wrappers for `wc -l`, `git diff --stat`, `git status`, and `bash scripts/validate-skills.sh` output; if `rtk` is unavailable in the Codex environment, fall back to raw commands and note the fallback once, not per-task.
- Do not paste full SKILL.md contents, full diffs, or the full `run_loop.py` HTML report into the final report — cite file paths and line counts, summarize only.
- Keep the final report to: files changed, line-count before/after per file, benchmark numbers table (or blocked-reason), audit verdict, residual risks. No raw logs.

## Parallelization

`max_parallel: 5`. Tasks T1–T5 own disjoint file sets (verified below) and have no ordering dependency on each other — dispatch all 5 concurrently as one batch. T6 (Auditor) is `serial because` it needs the final state of all 5 tasks to verify against.

File-ownership disjointness check (must hold; if Codex finds an actual overlap at execution time, that is a bounded blocker to fix directly by re-sequencing T2/T4, not a reason to skip verification):

| Task | Owned files/dirs |
|---|---|
| T1 | `agent-delegation-planning/SKILL.md`, `agent-delegation-planning/references/*`, `agent-delegation-routing/SKILL.md`, `agent-delegation-routing/references/*` |
| T2 | `agent-capability-ledger/SKILL.md`, `agent-capability-ledger/references/*` |
| T3 | `docs/skill-evaluation-report.md` (§8 only), new dir `docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/` (read-only access to all 17 skills' `SKILL.md`/`evals/`, no writes there) |
| T4 | `redis-lucidchart-diagrams/SKILL.md`, `agent-memory-coordination/SKILL.md` |
| T5 | `agent-memory-docker/scripts/__pycache__/` (delete), `.gitignore` |

T2 owns `agent-capability-ledger/SKILL.md` for **both** the line-trim and the compatibility-metadata add (originally two separate report items, §11.1 and §11.3) — folded into one task specifically to avoid two tasks writing the same file. Do not split this back into two tasks.

## Coordinator blocker handling for this plan

- If `scripts/run_loop.py` (T3) requires the `claude` CLI and it is not present/authenticated in the Codex execution environment: this is `blocked for environment`, not a task failure. Record it as such, leave `docs/skill-evaluation-report.md` §8 unchanged, and continue with T1/T2/T4/T5/T6 — do not skip the whole plan over one blocked task.
- If trimming a SKILL.md below 150 lines would require deleting guardrail/checklist/description content rather than moving it to `references/`: that is a bounded blocker — fix directly by extracting more aggressively to references (the DO NOT/checklist/description content must never be deleted to hit a line count; extraction, not deletion, is the only allowed technique).
- Anything requiring a product/architecture/security decision beyond "where does this paragraph move to" does not exist in this plan's scope; there is no true decision-blocker expected. If one appears anyway, stop and report it — do not improvise scope.

## Memory

- Search `agent_memory` (namespace/category relevant to `redis_sa_skills` or `repo-redis_sa_skills`) before starting, for any record of this plan or the prior eval pass, to avoid duplicate work.
- Write task status transitions (`planning`→`running`→`done`→`audited`) to `agent_memory` if the Codex environment has a connected `agent_memory` MCP/tool; if not available after checking, use `tracker.md` as the sole record and say so in the final report (`Memory persistence: unavailable`).
- Do not write secrets, tokens, or credentials to memory. Do not write the full SKILL.md contents to memory — paths and line counts only.

---

## Task contracts

Every task and the coordinator prompt must include: `Use $agent-delegation-routing if available to confirm role, model/reasoning, ownership, command shape, and fallback before starting.`

### T1 — Trim agent-delegation-planning and agent-delegation-routing below ~150 lines

- **Epic:** none (task-only plan)
- **Objective:** Reduce `agent-delegation-planning/SKILL.md` (currently 345 lines) and `agent-delegation-routing/SKILL.md` (currently 235 lines) toward the repo's own ~150-line convention (`AGENTS.md`) via further internal extraction to `references/`. A prior pass already extracted the Mandatory Skill Stack/Token Economy section (planning) and the Worker Prompt Contract/Packet Dispatch section (routing) but the net reduction was insufficient because boundary/exclusion text was added back.
- **Required skills:** none beyond the whole-plan stack; this is pure Markdown restructuring.
- **Routing reason:** Mechanical extraction/restructuring of existing prose into existing or new reference files, no new judgment calls, no ambiguity about correctness — low/medium reasoning is sufficient.
- **Repo/branch:** redis_sa_skills, current branch (do not create a new branch; do not switch branches).
- **Worker role:** Implementer.
- **Preferred worker/provider:** Codex CLI (explicit user instruction for this plan).
- **Fallback worker/provider:** direct execution by the coordinator itself (Claude Code, this same session) if Codex is unavailable — this is bounded mechanical work with no need for an inherited senior sub-agent.
- **Requested model/reasoning:** whatever model backs the Codex CLI session in use; reasoning effort `medium` (bounded restructuring, no architectural ambiguity, but must preserve exact meaning while moving text — not `low`, since accidentally dropping a guardrail while moving prose is a real failure mode).
- **Inheritance status / why sufficient:** not inherited from a senior planning agent; `medium` is sufficient because the task is "move this prose, don't lose meaning," verified mechanically by grep/line-count, not by subjective judgment.
- **Escalation trigger:** none expected. If hitting 150 lines is impossible without deleting DO NOT/checklist/description content, stop and report — do not delete guardrails to hit a number.
- **Owned files:** `agent-delegation-planning/SKILL.md`, `agent-delegation-planning/references/*.md` (existing files, and new reference files may be created, e.g. splitting further), `agent-delegation-routing/SKILL.md`, `agent-delegation-routing/references/*.md`.
- **Forbidden files:** every other skill directory; `scripts/validate-skills.sh`; `README.md`; `AGENTS.md`.
- **Other agents active:** T2, T3, T4, T5 run concurrently on disjoint files — do not touch their owned files.
- **Inputs:** current `agent-delegation-planning/SKILL.md`, `agent-delegation-routing/SKILL.md`, and their existing `references/` directories. Read them fully before editing.
- **Exact steps:**
  1. `wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md` — record starting counts.
  2. For each file, identify remaining body sections that are detailed prose rather than "when do I load what" pointers (e.g. long worked examples, full field-by-field explanations that duplicate what a linked reference already covers) and move them into an existing or new file under that skill's `references/`, leaving a one-line pointer in `SKILL.md` ("See `references/<file>.md` for <what/when>.").
  3. **Do not modify the YAML frontmatter `description:` field of either file at all** — a downstream task (T3) benchmarks the current description text and any change would invalidate that comparison. Body-section extraction only.
  4. Do not delete any `DO NOT` item, checklist item, or required-field name — only relocate explanatory prose about them.
  5. Re-run `wc -l` on both files after edits.
- **Exact verify commands:**
  ```bash
  wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md
  git diff --stat -- agent-delegation-planning agent-delegation-routing
  bash scripts/validate-skills.sh
  ```
  Target: both files ≤150 lines. If not fully achievable, report the closest achieved count and why (see Escalation trigger).
- **Output format:** a short status block: file, before-line-count, after-line-count, list of new/changed reference files, confirmation the `description:` field is byte-identical to before (`git diff agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md` should show no hunk touching the `description:` block).
- **Audit:** covered by T6.
- **Tracking:** write `T1: running` then `T1: done` (with evidence = the verify command output) to `agent_memory`/tracker.
- **Done evidence:** `wc -l` output showing both files ≤150 lines (or documented exception), `validate-skills.sh` showing 0 new errors, `git diff` showing no `description:` change.
- **Commit allowed:** no.

### T2 — Trim agent-capability-ledger below ~150 lines, add compatibility metadata

- **Objective:** Reduce `agent-capability-ledger/SKILL.md` (currently ~176–177 lines) below ~150 lines via internal extraction to `references/`, **and** add a top-level `compatibility:` frontmatter field if the skill has a genuine runtime dependency worth stating (it optionally uses the `agent_memory` MCP and an optional "Redis Array" mirror per `references/redis-array-mirror.md` — check that file to phrase this accurately, do not invent a dependency that isn't there).
- **Required skills:** none beyond the whole-plan stack.
- **Routing reason:** same as T1 — mechanical restructuring plus one frontmatter line; low ambiguity.
- **Repo/branch:** redis_sa_skills, current branch.
- **Worker role:** Implementer.
- **Preferred worker/provider:** Codex CLI. **Fallback:** coordinator direct execution.
- **Requested model/reasoning:** Codex CLI default model; reasoning `medium` (same rationale as T1 — mechanical but meaning-preserving).
- **Escalation trigger:** none expected; same "do not delete guardrails to hit line count" rule as T1.
- **Owned files:** `agent-capability-ledger/SKILL.md`, `agent-capability-ledger/references/*.md`.
- **Forbidden files:** every other skill directory (including `agent-memory-coordination/` — T4 owns its compatibility field, not this task); `scripts/validate-skills.sh`; `README.md`.
- **Other agents active:** T1, T3, T4, T5 concurrent, disjoint files.
- **Inputs:** current `agent-capability-ledger/SKILL.md` and its `references/` directory, specifically `references/redis-array-mirror.md` and `references/memory-sync.md` to determine the accurate compatibility statement.
- **Exact steps:**
  1. `wc -l agent-capability-ledger/SKILL.md` — record starting count.
  2. Extract detailed body prose to `references/` the same way as T1 (pointer left in `SKILL.md`), without touching the `description:` field (not part of any downstream benchmark this round, but keep the same discipline for consistency — do not change it without being asked).
  3. Add, at the top level of the frontmatter (sibling to `license:`, matching the convention shown in the "Local terminology sources" section above — **not** nested under `metadata:`):
     ```yaml
     compatibility: Requires the agent_memory MCP for ledger↔memory sync (optional; falls back to repo-file-only ledger if unavailable).
     ```
     Adjust the exact wording only if reading `references/redis-array-mirror.md`/`references/memory-sync.md` reveals the dependency is phrased differently — the requirement is "top-level field, accurate, one sentence," not this exact string verbatim.
  4. Re-run `wc -l`.
- **Exact verify commands:**
  ```bash
  wc -l agent-capability-ledger/SKILL.md
  awk '/^---$/{c++} c==1' agent-capability-ledger/SKILL.md | grep -c '^compatibility:'
  git diff --stat -- agent-capability-ledger
  bash scripts/validate-skills.sh
  ```
  Second command must print `1` (compatibility present, top-level, exactly once).
- **Output format:** before/after line count, confirmation `compatibility:` is top-level (not nested under `metadata:`), list of changed/new reference files.
- **Audit:** covered by T6.
- **Tracking:** `T2: running` → `T2: done`.
- **Done evidence:** `wc -l` ≤150 (or documented exception), `compatibility:` grep count = 1, validator clean.
- **Commit allowed:** no.

### T3 — Live automated trigger benchmark via skill-creator's run_loop.py

- **Objective:** Replace the manual LLM-judged benchmark numbers in `docs/skill-evaluation-report.md` §8 for **all 17 skills** in this repo with real automated numbers from `scripts/run_loop.py` in the skill-creator plugin, run in **measurement-only** mode (no description mutation applied to any skill). (Scope was widened from the original 4 categories to all 17 skills at explicit user request, matching the full-coverage LLM-judged pass already recorded in §8.)
- **Required skills:** none beyond the whole-plan stack. This task calls an external script, not a repo skill.
- **Routing reason:** requires verifying an external environment dependency (the `claude` CLI) and running a script with exact flags — low ambiguity once the environment is confirmed, but real risk of silently getting it wrong (browser popups in headless envs, accidentally applying the optimization loop's suggested description). Medium reasoning to handle the verification/flag discipline correctly.
- **Repo/branch:** redis_sa_skills, current branch.
- **Worker role:** Implementer (benchmark runner).
- **Preferred worker/provider:** Codex CLI. **Fallback:** coordinator direct execution (same caveat about `claude` CLI availability applies either way).
- **Requested model/reasoning:** Codex CLI default model; reasoning `medium`.
- **Escalation trigger:** `claude` CLI unavailable/unauthenticated in the execution environment → `blocked for environment` (see Coordinator blocker handling above). This is an explicit, expected possible outcome, not a failure to fix.
- **Owned files:** `docs/skill-evaluation-report.md` (§8 "Benchmark summary" section **only** — do not touch any other section), new directory `docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/`.
- **Forbidden files:** all 17 skills' `SKILL.md` files and their `evals/` directories are **read-only** inputs — do not edit them, do not apply any description `run_loop.py` proposes.
- **Other agents active:** T1 is concurrently editing `agent-delegation-planning/SKILL.md` — T1 is explicitly forbidden from touching the `description:` field, so the description T3 reads/tests will be stable regardless of T1's progress. Do not wait for T1; if `run_loop.py` needs a stable file read, re-read it fresh at the moment of the run (no fixed dependency ordering required, but the two must not write to the same lines — they don't).
- **Inputs:** the skill-creator plugin at `/Users/pierre/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/skills/skill-creator/scripts/run_loop.py`. **First check this exact path exists in the Codex execution environment** — if it does not (different sandbox/container without access to this Claude Code plugin cache), that is `blocked for environment`; stop this task, leave §8 unchanged, and say so in the final report. Do not attempt to reimplement or vendor the script.
- **Exact steps (only if the script path above exists and `claude --version` succeeds):**
  1. Verify environment: `which claude && claude --version`. If this fails, stop — `blocked for environment`.
  2. `cd /Users/pierre/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/skills/skill-creator` (the script uses `from scripts.generate_report import generate_html`, a relative import that requires this working directory).
  3. For **each of the 17 skills** listed below, using **absolute paths** for the repo-side arguments (repo root: `/Users/pierre/Documents/Work/redis_sa_skills/.claude/worktrees/pensive-kirch-12fedb`), run:
     ```bash
     python3 -m scripts.run_loop \
       --eval-set /Users/pierre/Documents/Work/redis_sa_skills/.claude/worktrees/pensive-kirch-12fedb/<skill>/evals/trigger_queries.json \
       --skill-path /Users/pierre/Documents/Work/redis_sa_skills/.claude/worktrees/pensive-kirch-12fedb/<skill> \
       --model claude-fable-5 \
       --max-iterations 1 \
       --runs-per-query 3 \
       --report none \
       --results-dir /Users/pierre/Documents/Work/redis_sa_skills/.claude/worktrees/pensive-kirch-12fedb/docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/<skill> \
       --verbose
     ```
     Replace `<skill>` with each of: `caveman`, `rtk-cli`, `redis-brand-ui`, `redis-product-ui`, `redis-presentation-decks`, `redis-excalidraw-diagrams`, `redis-lucidchart-diagrams`, `redis-insight-plugin`, `playwright-test`, `playwright-cli-agent`, `agent-delegation-routing`, `agent-delegation-planning`, `agent-spec-writing`, `agent-plan-lifecycle`, `agent-capability-ledger`, `agent-memory-docker`, `agent-memory-coordination` — 17 separate invocations, each writing its own `--results-dir` subfolder. `--max-iterations 1` and `--report none` are mandatory (measurement-only, no browser popup in a headless environment). This is a real volume of `claude -p` calls (17 skills × 3 runs/query × ~10-14 queries each ≈ 500-650 invocations total) — run skills sequentially or in small batches if the environment has rate limits; a slow/long-running task is expected and acceptable, a failed/hung one is not a reason to abandon the rest. If one skill's invocation fails or times out, record it as `blocked for environment` **for that skill only** in tracker.md, keep its old LLM-judged §8 row unchanged, and continue with the remaining skills — do not let one failure void the whole task.
  4. From each run's `results.json` in its `--results-dir`, extract precision/recall/false-positive-count/false-negative-count for the **current** (unmodified) description — do not read or apply any "improved" description the loop may propose for a hypothetical next iteration; this task only needs the iteration-0 measurement of the description as it exists right now.
  5. Edit `docs/skill-evaluation-report.md` §8 ("Benchmark summary"): replace the existing manual/LLM-judged table with the new automated numbers for every skill that completed, and add one sentence noting the methodology changed from LLM-judged to `scripts/run_loop.py` live automated measurement (cite the `results.json` paths under `benchmark-results/`). For any skill that hit `blocked for environment`, leave its existing LLM-judged row unchanged and add a one-line note next to it: "live benchmark blocked for environment, LLM-judged number retained." Keep the same table shape (skill, category, precision before→after, recall before→after, FP before→after, FN before→after) — "before" here means the *original pre-improvement* one-line description (same baseline already recorded in the prior report), "after" means the live-measured number for the current description.
- **Exact verify commands:**
  ```bash
  ls docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/*/results.json | wc -l
  git diff --stat -- docs/skill-evaluation-report.md
  ```
  First command should print up to 17 (fewer only if some skills are legitimately `blocked for environment`, each with a recorded reason). `git diff` must show changes confined to §8 (spot-check: no hunk touching §1–§7, §9–§11).
- **Output format:** either (a) the `results.json` paths for every completed skill + updated §8 table + confirmation no other section changed, or (b) per-skill `Task T3 blocked for environment: <skill>: <exact command and error>` for any skill that could not run, with that skill's §8 row left untouched. A mix of both is expected and acceptable — this is not all-or-nothing.
- **Audit:** covered by T6.
- **Tracking:** `T3: running` → `T3: done` or `T3: blocked` with reason.
- **Done evidence:** up to 17 `results.json` files present (one per completed skill) and §8 updated for each, with any per-skill blocked-for-environment record explicit and its old row retained.
- **Commit allowed:** no.

### T4 — Add compatibility metadata to redis-lucidchart-diagrams and agent-memory-coordination

- **Objective:** Add a top-level `compatibility:` frontmatter field to `redis-lucidchart-diagrams/SKILL.md` and `agent-memory-coordination/SKILL.md`, following the exact convention shown in "Local terminology sources" above, only where the dependency is real (do not invent one).
- **Required skills:** none beyond the whole-plan stack.
- **Routing reason:** trivial, low-ambiguity, one line per file.
- **Repo/branch:** redis_sa_skills, current branch.
- **Worker role:** Implementer.
- **Preferred worker/provider:** Codex CLI. **Fallback:** coordinator direct execution.
- **Requested model/reasoning:** Codex CLI default model; reasoning `low`.
- **Escalation trigger:** none expected.
- **Owned files:** `redis-lucidchart-diagrams/SKILL.md`, `agent-memory-coordination/SKILL.md`.
- **Forbidden files:** `agent-capability-ledger/SKILL.md` (T2 owns its own compatibility field — do not duplicate work there); every other skill directory.
- **Other agents active:** T1, T2, T3, T5 concurrent, disjoint files.
- **Inputs:** `redis-lucidchart-diagrams/scripts/package_lucid_import.py` (confirms the real dependency is Python) and `agent-memory-coordination/SKILL.md` + its reference to the `agent_memory` MCP tool family (confirms the real dependency is that optional MCP).
- **Exact steps:**
  1. In `redis-lucidchart-diagrams/SKILL.md` frontmatter, add (top-level, sibling to `license:`):
     ```yaml
     compatibility: Requires Python for scripts/package_lucid_import.py to package the Lucid Standard Import source.
     ```
  2. In `agent-memory-coordination/SKILL.md` frontmatter, add (top-level, sibling to `license:`):
     ```yaml
     compatibility: Requires the agent_memory MCP for shared worker-prompt/gate-result memory (optional; falls back to repo tracker files if unavailable).
     ```
  3. Adjust exact wording only if it's factually inaccurate after reading the files above — the requirement is "top-level, accurate, one sentence," not the verbatim string.
- **Exact verify commands:**
  ```bash
  awk '/^---$/{c++} c==1' redis-lucidchart-diagrams/SKILL.md agent-memory-coordination/SKILL.md | grep -c '^compatibility:'
  bash scripts/validate-skills.sh
  ```
  Must show exactly 2 top-level `compatibility:` matches total across the two files.
- **Output format:** confirmation of the 2 added lines, exact text used.
- **Audit:** covered by T6.
- **Tracking:** `T4: running` → `T4: done`.
- **Done evidence:** grep count = 2, validator clean.
- **Commit allowed:** no.

### T5 — Remove stray pycache artifact and prevent recurrence

- **Objective:** Delete the untracked `agent-memory-docker/scripts/__pycache__/` directory (currently contains `configure_agent_memory_clients.cpython-314.pyc`) and add `__pycache__/` + `*.pyc` to the repo's root `.gitignore` so it does not reappear as an untracked artifact after the script is run again.
- **Required skills:** none beyond the whole-plan stack.
- **Routing reason:** trivial, zero ambiguity.
- **Repo/branch:** redis_sa_skills, current branch.
- **Worker role:** Implementer.
- **Preferred worker/provider:** Codex CLI. **Fallback:** coordinator direct execution.
- **Requested model/reasoning:** Codex CLI default model; reasoning `low`.
- **Escalation trigger:** none expected.
- **Owned files:** `agent-memory-docker/scripts/__pycache__/` (delete only), `.gitignore` (append only, do not reorder/rewrite existing entries).
- **Forbidden files:** every skill directory's content beyond the one deletion above; do not touch `agent-memory-docker/SKILL.md` or any other file in that skill.
- **Other agents active:** T1, T2, T3, T4 concurrent, disjoint files.
- **Inputs:** current `.gitignore` (already has sections for Dependencies, Build outputs, IDE, OS, Environment, Logs, Local agent execution plans — add a `Python` section following the same style).
- **Exact steps:**
  1. `rm -rf agent-memory-docker/scripts/__pycache__`
  2. Append to `.gitignore` (new section, matching existing style):
     ```
     # Python
     __pycache__/
     *.pyc
     ```
  3. Confirm no other `__pycache__` or `*.pyc` artifacts exist anywhere else in the repo (`find . -name "__pycache__" -o -name "*.pyc"` should return nothing after the delete).
- **Exact verify commands:**
  ```bash
  test -d agent-memory-docker/scripts/__pycache__ && echo STILL_PRESENT || echo REMOVED
  grep -c "__pycache__" .gitignore
  git status --porcelain | grep -c "pycache"
  ```
  Expect `REMOVED`, a count ≥1, and the last command returning `0` (nothing untracked left matching pycache).
- **Output format:** confirmation of deletion, confirmation `.gitignore` updated, confirmation no residual matches.
- **Audit:** covered by T6.
- **Tracking:** `T5: running` → `T5: done`.
- **Done evidence:** the three verify command outputs above.
- **Commit allowed:** no.

### T6 — Auditor (serial, after T1–T5)

- **Objective:** Independently verify all 5 tasks actually did what they claim, with evidence, before the plan is reported to the user as complete.
- **Required skills:** whole-plan stack; `rtk-cli` for wrapping `git diff`/`wc -l`/validator output.
- **Routing reason:** final gate before handoff; needs to catch silent partial completion (e.g. T1 claiming success while frontmatter `description:` actually changed, T3 claiming a live benchmark ran while `results.json` is actually empty/missing).
- **Repo/branch:** redis_sa_skills, current branch.
- **Worker role:** Auditor.
- **Preferred worker/provider:** an independent pass by the same Codex CLI session is acceptable if no cross-agent bridge to a separate auditor is available in this environment (record `Audit independence: self-evidence only` if so — do not claim independent audit if it is not). **Fallback:** coordinator (Claude Code) reviews the diff directly if Codex cannot self-audit.
- **Requested model/reasoning:** `high` — this is the final correctness gate; escalation reason: catching silent claim-vs-evidence mismatches across 5 tasks requires actually re-running verification commands, not trusting task reports.
- **Escalation trigger:** any task's done-evidence does not actually hold (e.g. a file still >150 lines, `compatibility:` missing or nested under `metadata:`, `validate-skills.sh` shows new errors, a forbidden file was touched, or `description:` fields changed where forbidden) → do not mark that task `audited`; either fix directly (bounded) or create a narrow repair task, then re-verify. This is a bounded blocker per Coordinator Blocker Handling — fix in-flight, do not escalate to the user for anything on this list.
- **Owned files:** none (read-only verification), except may make small direct fixes to the same files the failing task owned, if the fix is bounded and mechanical (e.g. re-running an extraction that left the file at 151 lines instead of ≤150).
- **Forbidden files:** none beyond the general rule of not inventing new scope.
- **Other agents active:** none — this runs after T1–T5 complete.
- **Inputs:** the final state of the working tree, this plan.md, `tracker.md`.
- **Exact steps:**
  1. `bash scripts/validate-skills.sh` — must show 0 errors (the pre-existing 1 benign TODO-string warning in `rtk-cli/evals/trigger_queries.json` is expected and not a regression; any *new* warning is a finding).
  2. `wc -l agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md agent-capability-ledger/SKILL.md` — confirm all three ≤150, or that T6 has recorded why not and applied its own bounded fix.
  3. For each of `agent-capability-ledger`, `redis-lucidchart-diagrams`, `agent-memory-coordination`: `awk '/^---$/{c++} c==1' <skill>/SKILL.md | grep -c '^compatibility:'` must print `1` each, top-level (not nested under `metadata:`).
  4. `git diff -- agent-delegation-planning/SKILL.md agent-delegation-routing/SKILL.md` — confirm no hunk touches the `description:` block.
  5. `ls docs/agent-plans/2026-07-05-codex-followup-skill-hardening/benchmark-results/*/results.json` and re-read `docs/skill-evaluation-report.md` §8 — confirm either real numbers with cited paths, or an explicit blocked-for-environment note; confirm no other report section changed (`git diff -- docs/skill-evaluation-report.md` hunks confined to §8).
  6. `test -d agent-memory-docker/scripts/__pycache__` must report absent; `grep pycache .gitignore` must report present.
  7. `git status --porcelain` — confirm nothing outside the 5 tasks' owned files changed, and confirm nothing is staged/committed (this plan is `Commit policy: not allowed`).
- **Exact verify commands:** the 7 commands above, run in order.
- **Output format:** a verdict per task (`T1..T5: pass|fail`, with the exact evidence line for each), overall verdict, `Audit independence: <self-evidence only | cross-agent via <bridge>>`, and a list of any bounded fixes it applied directly.
- **Audit:** N/A (this is the audit).
- **Tracking:** write `T6: done` with the verdict block to `agent_memory`/tracker; mark T1–T5 `audited` in the tracker only for tasks that passed.
- **Done evidence:** the verdict block itself, plus the 7 command outputs it ran.
- **Commit allowed:** no.

## Final report contract (for Codex to hand back)

The final response to the user must include, in `caveman lite` voice, no raw logs:
1. Per-task status (`done`/`audited`/`blocked` + reason) for T1–T6.
2. Line counts before→after for the 3 trimmed files.
3. Confirmation of the 3 new/fixed `compatibility:` fields (files + exact top-level placement confirmed).
4. T3 outcome: either the new benchmark table (cite `results.json` paths) or the explicit blocked-for-environment record.
5. Confirmation the pycache artifact is gone and `.gitignore` updated.
6. Full audit verdict from T6, including `Audit independence` disposition.
7. Confirmation: 0 commits made, `git status --porcelain` output showing only the expected changed/untracked files.
8. Any residual risk the Auditor flagged that was not fixed in-flight (should be none, given the bounded-blocker rule above — if there is one, it must be a true decision-blocker, named explicitly).
