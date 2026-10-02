#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

select_node24() {
  local candidates=() candidate version major i
  if [[ -n "${SAM_NODE_BIN:-}" ]]; then
    candidates+=("$SAM_NODE_BIN")
  else
    shopt -s nullglob
    local installed=("${HOME}/.local"/node-v*-linux-x64/bin/node)
    shopt -u nullglob
    for ((i=${#installed[@]}-1; i>=0; i--)); do
      candidates+=("${installed[$i]}")
    done
    if command -v node >/dev/null 2>&1; then
      candidates+=("$(command -v node)")
    fi
  fi
  for candidate in "${candidates[@]}"; do
    version="$("$candidate" --version 2>/dev/null || true)"
    major="${version#v}"
    major="${major%%.*}"
    if [[ "$major" =~ ^[0-9]+$ ]] && (( major >= 24 )); then
      export SAM_NODE_BIN="$candidate"
      export PATH="$(dirname "$candidate"):$PATH"
      return 0
    fi
  done
  echo "Node.js >=24 is required for OpenClaw Gateway; set SAM_NODE_BIN to a compatible executable" >&2
  exit 2
}

select_node24

export HOST="${HOST:-0.0.0.0}"
# Keep the browser-facing Flask service separate from the resident Gateway.
# This is the canonical startup entry point: Flask 18789, Gateway 18790.
export PORT=18789
export OPENCLAW_GATEWAY_PORT=18790
export SAM_OPENCLAW_GATEWAY_PORT="$OPENCLAW_GATEWAY_PORT"
export SAM_DATA_ROOT="${SAM_DATA_ROOT:-/tmp/sam-data}"
export SAM_PROJECT_ROOT="$PROJECT_DIR"
export SAM_HARNESS_ROOT="${SAM_HARNESS_ROOT:-$PROJECT_DIR/harness-openclaw}"
export SAM_SKILL_ROOT="${SAM_SKILL_ROOT:-$PROJECT_DIR/skills}"
export SAM_TOOL_PLUGIN_DIR="${SAM_TOOL_PLUGIN_DIR:-$PROJECT_DIR/harness-openclaw/plugins/sam-memory}"
# Token Plan routing is declarative; the API key is never given a default and
# must come from the existing secret environment/file, never from source.
if [[ -z "${SAM_LEADER_MODEL_API_KEY:-}" && -n "${SAM_GUIDE_MODEL_API_KEY:-}" ]]; then
  SAM_LEADER_MODEL_API_KEY="$SAM_GUIDE_MODEL_API_KEY"
fi
if [[ -z "${SAM_LEADER_MODEL_API_KEY:-}" && -r "${HOME}/.bl_tokenplan_key" ]]; then
  SAM_LEADER_MODEL_API_KEY="$(< "${HOME}/.bl_tokenplan_key")"
  export SAM_LEADER_MODEL_API_KEY
fi
if [[ -z "${SAM_LEADER_MODEL_API_KEY:-}" ]]; then
  echo "Missing SAM_LEADER_MODEL_API_KEY; set it in the secret environment or ${HOME}/.bl_tokenplan_key" >&2
  exit 2
fi
export SAM_LEADER_MODEL_API_KEY
export SAM_LEADER_MODEL_BASE_URL="${SAM_LEADER_MODEL_BASE_URL:-${SAM_GUIDE_MODEL_BASE_URL:-https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1}}"
export SAM_LEADER_MODEL="${SAM_LEADER_MODEL:-${SAM_GUIDE_MODEL:-qwen3.8-max}}"
python3 scripts/prepare-openclaw-runtime.py
exec python3 webapp/app.py
