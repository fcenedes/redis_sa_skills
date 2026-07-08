# Tool Capability Discovery

Before declaring `agent_memory` unavailable or read-only, actively discover the
available memory tools. In Codex, Claude Code, or any MCP-based agent, search or
inspect tool names/descriptions for create, add, write, save, upsert, edit,
update, and set-working-memory operations. Lazy-loaded tools may not appear
until searched.

Report read and write capability separately:

```text
Memory backend:
Namespace searched:
User id searched:
Read tool available: yes/no
Write tool discovery attempted: yes/no
Write tool available: yes/no
Write tool used: <tool name or none>
Memory write confirmed: yes/no
Fallback used: repo tracker / repo docs / none
```

If a write tool appears after discovery, use it before reporting degraded mode.
If no write tool is available after discovery, continue with repo tracker files
and say that memory writes are unavailable after tool discovery.
