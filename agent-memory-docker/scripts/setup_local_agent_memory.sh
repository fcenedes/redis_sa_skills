#!/usr/bin/env bash
set -euo pipefail

skill_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target="${HOME}/.agent-memory-server"
start_stack=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      target="$2"
      shift 2
      ;;
    --start)
      start_stack=1
      shift
      ;;
    -h|--help)
      cat <<'HELP'
Usage:
  setup_local_agent_memory.sh [--target DIR] [--start]

Creates a portable Agent Memory Server runtime directory from bundled templates.
Default target: $HOME/.agent-memory-server
HELP
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

mkdir -p "$target"
cp "$skill_dir/templates/docker-compose.agent-memory.yml" "$target/docker-compose.agent-memory.yml"

if [[ ! -f "$target/.env.local" ]]; then
  cp "$skill_dir/templates/env.local.example" "$target/.env.local"
  echo "Created $target/.env.local"
  echo "Set OPENAI_API_KEY in $target/.env.local before using long-term memory search."
else
  echo "Keeping existing $target/.env.local"
fi

echo "Runtime ready: $target"

if [[ "$start_stack" -eq 1 ]]; then
  (
    cd "$target"
    docker compose -f docker-compose.agent-memory.yml --env-file .env.local up -d redis agent-memory-api agent-memory-mcp-sse agent-memory-mcp-http
  )
fi
