# Output Rubric: agent-memory-docker

Grade each run against these criteria. 1-2 lines each.

- **Trigger correctness**: Did the skill activate for local Docker/MCP agent-memory setup, connection troubleshooting, or client config, and defer to agent-memory-coordination/agent-capability-ledger for what happens after the memory backend exists?
- **False-positive avoidance**: Did it avoid answering unrelated Redis modeling/vector-search/security questions with Docker Compose steps just because Redis was mentioned?
- **False-negative avoidance**: Did it activate on indirect asks like "Claude Code shows agent-memory disconnected" without the word "Docker"?
- **Task fit**: Did the response use the bundled templates (`docker-compose.agent-memory.yml`, `env.local.example`) rather than requiring a separate `agent-memory-server` checkout?
- **Output usefulness**: Did it give copy-pasteable commands (compose up, health check, client config) matching the actual default ports/paths in the Defaults table?
- **Safety compliance (must be a real requirement, not decoration)**: Did it flag `BIND_HOST` widening beyond `127.0.0.1` combined with `DISABLE_AUTH=true`/`AUTH_MODE=disabled` as a genuine network-exposure risk requiring an explicit auth plan or acknowledgment — not a passing footnote?
- **Token discipline**: Did it link to `references/client-configs.md` or `references/memory-policy.md` for exact snippets instead of inlining every client's full config?
- **Evidence requirements**: Did it confirm `docker compose ps` / REST health / MCP transport check output before claiming the stack is running, rather than assuming success?
- **Verification requirements**: Did it run `scripts/check_local_agent_memory.sh` (or equivalent) before declaring REST/SSE/HTTP transports healthy?
- **Anti-overreach**: Did it avoid coordinating workers or managing capability ledger content — this skill only stands up and connects the memory backend?
- **Final-answer quality**: Does the final answer explicitly confirm bind-host/auth posture (127.0.0.1 by default, or a stated exception with auth) rather than leaving network exposure unstated?
