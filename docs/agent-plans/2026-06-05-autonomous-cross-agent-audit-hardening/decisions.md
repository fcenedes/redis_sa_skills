# Decision Log

| Date | Decision | Why | Source / Evidence | Supersedes | Revisit Trigger |
|---|---|---|---|---|---|
| 2026-06-05 | Cross-agent audit should be allowed when an explicit bridge/tool is available. | User said Codex should be able to ask Claude for audit and vice versa. | User request 2026-06-05 | Hard ban on Codex->Claude audit delegation. | If no safe CLI/tool bridge exists. |
| 2026-06-05 | Autonomous execution does not imply autonomous push/default-branch changes. | Keeps delivery fast while preserving repo release control. | CC diff and existing repo policy. | Older no-commit worker default for coordinators only. | User asks for no commits or different release flow. |
| 2026-06-05 | E2 scope expanded from the four CC-edited files to eight planning/routing files. | Routing references outside the four-file CC diff still contradicted the explicit-bridge cross-agent audit policy and had to be aligned for consistency. | E1 grep/diff audit and E2 implementation on commit 7b8820d. | Four-file-only E2 repair boundary. | Future audit finds unrelated file churn or generated artifact edits. |
| 2026-06-05 | Execution start and autonomy are separate plan controls. | `Autonomy: autonomous` should control continuation after execution starts, not whether plan writing surprise-executes. | User/CC follow-up on 2026-06-05. | Single-axis autonomy controlling both start and continuation. | User requests a different default start policy. |
| 2026-06-05 | Commit policy is an explicit gate independent from execution and autonomy. | Fast autonomous execution must not grant commit permission by implication. | User/CC follow-up on 2026-06-05. | Commit permission inferred from user authorization plus autonomy. | User asks for automatic commits by default. |
