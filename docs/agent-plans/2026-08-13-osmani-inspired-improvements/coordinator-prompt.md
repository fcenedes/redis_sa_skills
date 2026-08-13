Role: Coordinator
Plan directory: docs/agent-plans/2026-08-13-osmani-inspired-improvements/
Source of truth: docs/research/2026-08-13-osmani-inspired-improvements.md
Read first:
- docs/agent-plans/2026-08-13-osmani-inspired-improvements/plan.md
- docs/agent-plans/2026-08-13-osmani-inspired-improvements/tracker.md
Use if available:
- $agent-delegation-routing before dispatching
Required skills:
- agent-delegation-routing
- agent-spec-writing (change delta already written)
- writing-skills or skill-creator (skill authoring)
- rtk-cli
- caveman
Execution: plan-only (start when user says go)
Autonomy: autonomous
Commit policy: not allowed
Task:
Execute 3 waves from plan.md. Each new skill: fetch Osmani source via web, adapt
for polyglot + Redis, write SKILL.md ≤150 lines + references/, add rationalizations
+ verification + interaction sections. Each retrofit: read existing SKILL.md, add
missing sections, preserve existing content. Update README.md last. Audit all.
Rules:
- Update tracker.md on every status transition.
- SKILL.md frontmatter must match CONTRIBUTING.md format (name, description, license, metadata).
- SKILL.md body ≤150 lines. Move detail to references/.
- Do not vendor Osmani files. Adapt content, add Redis specifics, use polyglot examples.
- Do not modify existing skill behavior. Retrofits add sections only.
- Shared references go in repo root `references/` directory.
- New skills reference shared checklists via `../../references/<file>.md`.
- Wave 2 (new skills) starts only after E1.T1 (shared refs) reaches done.
- Wave 3 (README + audit) starts only after all E1–E3 tasks reach done.
- Run `bash scripts/validate-skills.sh` after each wave. Stop on errors.
- Audit task uses fresh context (not self-review).
Output:
- current status by task
- blockers
- verification evidence (command outputs)
- audit verdict
- files changed
