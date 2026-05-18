# Client Configs

Use these snippets after the Docker stack is running. All clients point to the same Redis volume through Agent Memory Server.

## Codex Desktop

Edit `~/.codex/config.toml`:

```toml
[mcp_servers.agent_memory]
enabled = true
url = "http://localhost:9051/mcp"
```

Restart Codex Desktop.

Codex may display `Authentification non prise en charge` / `Authentication not supported` for this local server. That is expected for this auth-disabled local setup: Codex probes OAuth discovery endpoints, Agent Memory Server returns 404 for those endpoints, and Codex can still list and call MCP tools. Treat it as non-blocking when tool calls work.

## Claude Code

Use the streamable HTTP endpoint:

```bash
claude mcp add --transport http --scope user agent-memory http://localhost:9051/mcp
claude mcp list
```

Expected status:

```text
agent-memory: http://localhost:9051/mcp (HTTP) - Connected
```

## Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS and add `mcpServers.agent-memory`. Replace `$HOME/.agent-memory-server` with the actual runtime directory if different:

```json
{
  "mcpServers": {
    "agent-memory": {
      "command": "docker",
      "args": [
        "compose",
        "-f",
        "$HOME/.agent-memory-server/docker-compose.agent-memory.yml",
        "--env-file",
        "$HOME/.agent-memory-server/.env.local",
        "run",
        "--rm",
        "-T",
        "agent-memory-mcp-stdio"
      ]
    }
  }
}
```

Restart Claude Desktop after editing. Claude Desktop uses stdio here because local JSON config is for local MCP servers; HTTP/remote connector setup through Claude web cannot reach `localhost`.

## Claude Web and Remote Connectors

Do not use `localhost` for Claude web, Cowork, or remote custom connectors. Remote connectors originate from Anthropic infrastructure and require a public HTTPS endpoint plus authentication.

## Glean-Compatible Local Clients

Use the streamable HTTP endpoint only when the client runs on the same machine or can reach the local network namespace:

```text
http://localhost:9051/mcp
```

For hosted Glean or any cloud connector, deploy behind HTTPS with `DISABLE_AUTH=false`.
