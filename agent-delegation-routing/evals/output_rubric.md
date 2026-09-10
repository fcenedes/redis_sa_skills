# Output Rubric: agent-delegation-routing

Grade each transcript against the criteria below. Each item is 1-2 lines, skill-specific.

## Trigger correctness

Did the skill fire only when a file-backed plan already exists and a worker/model/command-shape decision was actually needed, not for plan creation itself?

## False-positive avoidance (critical)

Did the transcript avoid invoking this skill's role-selection/Worker Prompt Contract machinery for a one-file, no-plan, no-handoff task? A single-word typo, one-line bug fix, or "just do it yourself" request must be executed directly, not routed.

## False-negative avoidance

When a written plan existed and the request named "which worker," "dispatch," "route to Codex/Claude/Qwen," or packet execution, did the skill trigger rather than silently defaulting to a generic subagent call?

## Task fit

Did the output select the smallest role/model that preserves quality (Routing Matrix, Role Selection), rather than defaulting to the most capable/expensive worker?

## Current models and both providers

Does it support native Claude and Codex routes, verify callable IDs/effort, and include Astra, Sonnet 5, Opus 5, and Fable 5.1 without forcing migrations from explicit pins?

## Cost and efficiency

Does it avoid the old-first price ladder, distinguish API/subscription/local costs and service tiers, and account for retries, cache writes/reads, review, and latency before claiming savings?

## Tokenizer and Opus preference

Does it prefer explicit Opus 4.6, account for the roughly 30% newer-tokenizer increase without double-counting billed tokens, and require evidence before upgrading to newer Opus/Fable?

## Effort correctness

Does it distinguish Codex CLI `model_reasoning_effort`, Responses API `reasoning.effort`, and Claude `output_config.effort`/`--effort`, while marking Haiku effort unsupported?

## Output usefulness

Is the Worker Prompt Contract (or packet dispatch decision) self-contained: role, model, reasoning, ownership, constraints, verify command, output format, `Commit allowed: no`?

## Safety compliance

Did it avoid uncontrolled Claude handoffs from Codex, avoid letting a worker inherit the coordinator's model/reasoning silently, and avoid granting commit/push without an explicit `Commit policy: allowed`?

## Token discipline

For a simple single-worker dispatch, did it load only `routing-table.md` or `specialist-roles.md` as needed rather than pulling in `worker-contract.md`, `anchoring.md`, and `command-patterns.md` all at once?

## Evidence requirements

Does the output record requested/actual model, requested/actual reasoning effort, and inheritance status (`unknown` if not knowable) rather than omitting them?

## Verification requirements

Does every dispatched task include an exact verify command, and does packet dispatch confirm `allowed_files`/`forbidden_files`/dependencies before starting?

## Anti-overreach behavior

Did the skill stay inside the prompt/dispatch contract and avoid re-deriving epics, ownership boundaries, or plan structure that belongs to `agent-delegation-planning`?

## Final-answer quality

Does the final response classify any blocker as bounded-fix/repair-task/decision-needed/environment-blocked, and does it avoid claiming parallel execution unless separate workers actually ran?

Run the model/cost cases in [routing-scenarios](routing-scenarios.md) when changing the routing table.
