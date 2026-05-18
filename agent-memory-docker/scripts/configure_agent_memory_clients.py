#!/usr/bin/env python3
"""Configure Codex, Claude Code, and Claude Desktop for local Agent Memory."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from datetime import datetime
from pathlib import Path


MCP_URL = "http://localhost:9051/mcp"


def backup(path: Path) -> None:
    if path.exists():
        stamp = datetime.now().strftime("%Y%m%d%H%M%S")
        shutil.copy2(path, path.with_name(f"{path.name}.bak-agent-memory-{stamp}"))


def configure_codex(url: str) -> None:
    config = Path.home() / ".codex" / "config.toml"
    config.parent.mkdir(parents=True, exist_ok=True)
    text = config.read_text() if config.exists() else ""
    backup(config)

    header = "[mcp_servers.agent_memory]"
    block = f'{header}\nenabled = true\nurl = "{url}"\n'
    lines = text.splitlines()
    out: list[str] = []
    i = 0
    replaced = False
    while i < len(lines):
        if lines[i].strip() == header:
            out.extend(block.rstrip().splitlines())
            replaced = True
            i += 1
            while i < len(lines) and not lines[i].startswith("["):
                i += 1
            continue
        out.append(lines[i])
        i += 1
    if not replaced:
        if out and out[-1].strip():
            out.append("")
        out.extend(block.rstrip().splitlines())
    config.write_text("\n".join(out) + "\n")
    print(f"Configured Codex: {config}")


def configure_claude_code(url: str) -> None:
    claude = shutil.which("claude")
    if not claude:
        print("Claude Code CLI not found; skipping Claude Code")
        return
    subprocess.run(
        [claude, "mcp", "remove", "agent-memory", "--scope", "user"],
        check=False,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    subprocess.run(
        [
            claude,
            "mcp",
            "add",
            "--transport",
            "http",
            "--scope",
            "user",
            "agent-memory",
            url,
        ],
        check=True,
    )
    subprocess.run([claude, "mcp", "list"], check=False)


def configure_claude_desktop(compose_dir: Path) -> None:
    config = (
        Path.home()
        / "Library"
        / "Application Support"
        / "Claude"
        / "claude_desktop_config.json"
    )
    config.parent.mkdir(parents=True, exist_ok=True)
    data = json.loads(config.read_text()) if config.exists() else {}
    backup(config)
    servers = data.setdefault("mcpServers", {})
    servers["agent-memory"] = {
        "command": "docker",
        "args": [
            "compose",
            "-f",
            str(compose_dir / "docker-compose.agent-memory.yml"),
            "--env-file",
            str(compose_dir / ".env.local"),
            "run",
            "--rm",
            "-T",
            "agent-memory-mcp-stdio",
        ],
    }
    config.write_text(json.dumps(data, indent=2) + "\n")
    print(f"Configured Claude Desktop: {config}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Configure all supported clients")
    parser.add_argument("--codex", action="store_true", help="Configure Codex Desktop")
    parser.add_argument("--claude-code", action="store_true", help="Configure Claude Code")
    parser.add_argument("--claude-desktop", action="store_true", help="Configure Claude Desktop")
    parser.add_argument("--url", default=MCP_URL, help="Streamable HTTP MCP URL")
    parser.add_argument(
        "--compose-dir",
        default=str(Path.home() / ".agent-memory-server"),
        help="Runtime directory containing docker-compose.agent-memory.yml and .env.local",
    )
    args = parser.parse_args()

    selected = args.all or args.codex or args.claude_code or args.claude_desktop
    if not selected:
        parser.error("Choose --all, --codex, --claude-code, or --claude-desktop")

    compose_dir = Path(args.compose_dir).expanduser().resolve()

    if args.all or args.codex:
        configure_codex(args.url)
    if args.all or args.claude_code:
        configure_claude_code(args.url)
    if args.all or args.claude_desktop:
        configure_claude_desktop(compose_dir)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
