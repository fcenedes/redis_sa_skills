# Agent Memory Default Policy

Use this policy in global agent instructions so each new session uses shared memory consistently.

```markdown
<!-- BEGIN agent-memory-default-policy -->

# Shared Agent Memory

Use the `agent_memory` / `agent-memory` MCP server as the shared memory backend when it is available.

At the start of a session:
- Search memory for user preferences, active projects, project conventions, and durable setup facts relevant to the current request.
- Treat `Authentication not supported` / `Authentification non prise en charge` in Codex as non-blocking when MCP tools list or tool calls succeed.

During the session:
- Store only durable, future-useful facts: explicit user preferences, stable project decisions, validated setup details, reusable paths, and constraints.
- Prefer namespace `redis-sa-agent-memory` for Redis SA shared setup and workflow memories unless a more specific namespace is needed.
- Use `user_id="pierre"` for Pierre's local setup memories.
- Write memories as self-contained sentences with concrete names, absolute dates for events, and no unresolved pronouns.

Do not store:
- API keys, tokens, secrets, credentials, or private raw logs.
- Temporary errors, test IDs, scratch paths, or guesses.
- Facts contradicted by the user or not yet verified.

Before finishing a meaningful setup/configuration task:
- Save durable decisions or validated configuration facts that will help future Codex/Claude sessions.
- If unsure whether a fact should be remembered, ask first.

<!-- END agent-memory-default-policy -->
```
