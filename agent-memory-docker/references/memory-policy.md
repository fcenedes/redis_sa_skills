# Agent Memory Default Policy

Use this policy in global agent instructions so each new session uses shared memory consistently.

```markdown
<!-- BEGIN agent-memory-default-policy -->

# Shared Agent Memory

Use the `agent_memory` / `agent-memory` MCP server as the shared memory backend when it is available.

At the start of a session:
- Identify the current project, repository, customer, or task domain before querying memory.
- Search memory for user preferences, active projects, project conventions, and durable setup facts relevant to the current request.
- Filter project-specific searches by the narrowest useful namespace, project name, repository path, customer, or task domain.
- Use broad/global memory only for stable user preferences, cross-project conventions, and shared setup facts.
- Treat `Authentication not supported` / `Authentification non prise en charge` in Codex as non-blocking when MCP tools list or tool calls succeed.

During the session:
- Store only durable, future-useful facts: explicit user preferences, stable project decisions, validated setup details, reusable paths, and constraints.
- Prefer a specific namespace for project or customer facts, for example `project-xyz`, `customer-abc`, or `repo-<name>`.
- Prefer namespace `redis-sa-agent-memory` only for Redis SA shared setup and workflow memories unless a more specific namespace is needed.
- Use `user_id="pierre"` for Pierre's local setup memories.
- Write memories as self-contained sentences with concrete names, absolute dates for events, and no unresolved pronouns.

Do not store:
- API keys, tokens, secrets, credentials, or private raw logs.
- Temporary errors, test IDs, scratch paths, or guesses.
- Facts contradicted by the user or not yet verified.
- Session-local context such as "I am working on XYZ" unless it will be useful in future sessions for that same project.
- Project XYZ details in a namespace that an unrelated ABC agent would search by default.

When using retrieved memory:
- Inject only memories that directly affect the current task.
- Ignore otherwise valid memories when their project, customer, repo, or time scope does not match the current task.
- If a memory looks useful but its scope is ambiguous, ask the user before applying it.

Before finishing a meaningful setup/configuration task:
- Save durable decisions or validated configuration facts that will help future Codex/Claude sessions.
- If unsure whether a fact should be remembered, ask first.

<!-- END agent-memory-default-policy -->
```
