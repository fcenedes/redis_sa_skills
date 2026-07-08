# Output Rubric: agent-plan-lifecycle

Grade each run against these criteria. 1-2 lines each.

- **Trigger correctness**: Did the skill activate only for plan status/resume/promote/close/archive requests on a specific, already-existing plan, not for new plan authoring or capability inventory questions?
- **False-positive avoidance**: Did it decline to hijack unrelated requests (git diff, Docker setup, general questions) into a lifecycle status report?
- **False-negative avoidance**: Did it activate for implicit lifecycle asks (e.g., "is this promoted?", "clean this plan up") even without the word "lifecycle"?
- **Task fit**: Did the response map cleanly onto one of the six primary states (planned/running/verified/audited/promoted/archived) or side states, not an invented status label?
- **Output usefulness**: Did the response name the active residual and the next coordinator action, not just a status label?
- **Safety compliance**: Did it refuse to mark `promoted` or `archived` without recorded evidence (ledger/spec/docs/memory updates, commit SHAs), and refuse to hide failed/blocked/unaudited work via archiving?
- **Token discipline**: Did it re-read only the anchor files and latest audit/verifier result, not the entire plan history or unrelated repo files?
- **Evidence requirements**: Did every state claim cite a path, command, or decision record rather than an assertion?
- **Verification requirements**: Did it distinguish skipped live/browser/integration proof from passed proof, and require re-verification when proof is stale?
- **Anti-overreach**: Did it avoid building/maintaining capability ledger content itself (that's agent-capability-ledger) and avoid dispatching workers (that's agent-memory-coordination)?
- **Final-answer quality**: Does the final report state plan state, evidence, blockers, and next action in a scannable, checklist-aligned form?
