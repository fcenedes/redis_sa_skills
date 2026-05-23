#!/usr/bin/env bash
set -euo pipefail

api_url="${AMS_API_URL:-http://localhost:8000}"
sse_url="${AMS_MCP_SSE_URL:-http://localhost:9050/sse}"
http_url="${AMS_MCP_HTTP_URL:-http://localhost:9051/mcp}"

curl -fsS "${api_url}/v1/health" >/dev/null
echo "REST health: ok"

status=0

if code=$(curl --max-time 5 -sS -o /dev/null -w "%{http_code}" "$sse_url" 2>/dev/null || true) && [[ "$code" != "000" ]]; then
  echo "MCP transport SSE: reachable (HTTP $code)"
else
  echo "MCP transport SSE: unreachable" >&2
  status=1
fi

if code=$(curl --max-time 5 -sS -o /dev/null -w "%{http_code}" -H "Accept: application/json, text/event-stream" "$http_url" 2>/dev/null || true) && [[ "$code" != "000" ]]; then
  echo "MCP transport streamable HTTP: reachable (HTTP $code)"
else
  echo "MCP transport streamable HTTP: unreachable" >&2
  status=1
fi

exit "$status"
