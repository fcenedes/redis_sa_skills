---
name: agent-memory-docker
description: Use when setting up shared Agent Memory Server locally with Docker for Codex, Claude Code, Claude Desktop, Redis 8, MCP, localhost troubleshooting, or portable teammate onboarding.
compatibility: Requires Docker Compose, a Redis-compatible image, Python 3, and local MCP client configuration.
license: Apache-2.0
metadata:
  author: fcenedes
  version: 1.0.0
---

# Agent Memory Docker

Use this skill to create a portable local Agent Memory Server stack and connect Codex, Claude Code, and Claude Desktop to the same Redis-backed memory.

## Authority

- Authorized: generate Docker Compose configs, env templates, and MCP client snippets for local Agent Memory setup.
- Not authorized: start/stop containers, modify host networking, or expose services beyond localhost without explicit request.
- Assessment-only default: for setup review or troubleshooting, report findings and stop unless changes are requested.

## Workflow

1. Create a local runtime directory, defaulting to `$HOME/.agent-memory-server`.
2. Copy `templates/docker-compose.agent-memory.yml` and `templates/env.local.example` into that directory.
3. Create `.env.local` from the template and set `OPENAI_API_KEY` for embeddings and long-term memory search.
4. Start the stack from the runtime directory:

```bash
docker compose -f docker-compose.agent-memory.yml --env-file .env.local up -d redis agent-memory-api agent-memory-mcp-sse agent-memory-mcp-http
```

5. Run `scripts/check_local_agent_memory.sh` to verify REST, SSE, and streamable HTTP.
6. Configure clients with `scripts/configure_agent_memory_clients.py`; read `references/client-configs.md` for exact snippets.
7. If Codex shows `Authentification non prise en charge`, verify a tool call or `scripts/check_local_agent_memory.sh`; the label is non-blocking for local no-auth MCP.
8. Install default usage policy with `scripts/configure_agent_memory_clients.py --memory-policy`; read `references/memory-policy.md` for the policy text.

## Quick Commands

```bash
bash agent-memory-docker/scripts/setup_local_agent_memory.sh --target "$HOME/.agent-memory-server" --start
python3 agent-memory-docker/scripts/configure_agent_memory_clients.py --all --memory-policy --compose-dir "$HOME/.agent-memory-server"
```

Restart Codex Desktop and Claude Desktop after client config changes. In Claude Code, run `claude mcp list` and confirm `agent-memory` is connected.

## Defaults

| Item | Default |
| --- | --- |
| Runtime directory | `$HOME/.agent-memory-server` |
| Bind host (all services) | `127.0.0.1` (set via `BIND_HOST`) |
| REST API | `http://localhost:8000` |
| MCP SSE | `http://localhost:9050/sse` |
| MCP streamable HTTP | `http://localhost:9051/mcp` |
| Redis host port | `6380` |
| Redis image | `redis:8.6.2` |
| Agent Memory Server image tag | `latest` (set via `REDIS_AGENT_MEMORY_VERSION`; pin in production) |

## DO NOT

- Do not require a checkout of `agent-memory-server`; use bundled templates.
- Do not use Redis Stack; use official Redis 8 images.
- Do not expose `DISABLE_AUTH=true` outside trusted local development.
- Do not configure Claude web or remote connectors with `localhost`; remote connectors require public HTTPS and auth.
- Do not print API keys when checking `.env.local` or container environment.
- Do not treat Codex's local `Authentication not supported` OAuth label as failure when MCP tools list or tool calls succeed.
- Do not override `BIND_HOST` to `0.0.0.0` or a LAN/public IP while `DISABLE_AUTH=true`/`AUTH_MODE=disabled`; if a teammate needs remote access, warn explicitly and require real auth (API key/token or a reverse proxy with auth) before widening the bind address.
- Do not silently comply with a request to "expose this so others can connect"; state the network-exposure-without-auth risk first, then proceed only with explicit acknowledgment or an auth plan.

## Checklist

Each item must be proved by a command output or file read from this session, not by memory or prior conversation.

- [ ] Runtime directory contains compose and `.env.local`.
- [ ] `.env.local` contains `OPENAI_API_KEY`.
- [ ] `docker compose ps` shows Redis, API, and MCP services running.
- [ ] REST health and MCP transport checks pass.
- [ ] Codex has `[mcp_servers.agent_memory]`.
- [ ] Claude Code shows `agent-memory` connected.
- [ ] Claude Desktop has `mcpServers.agent-memory` and has been restarted.
- [ ] Codex/Claude Code global instructions include the shared memory policy and project isolation rules.
- [ ] Confirm services bind to 127.0.0.1 unless intentionally exposed with real auth configured.
