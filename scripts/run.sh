#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

export HOST="${HOST:-0.0.0.0}"
export PORT="${DEPLOY_RUN_PORT:-${PORT:-5000}}"
export SAM_DATA_ROOT="${SAM_DATA_ROOT:-/tmp/sam-data}"
# Token Plan routing is declarative; the API key is never given a default and
# must already be present in the process environment.
export SAM_GUIDE_MODEL_BASE_URL="${SAM_GUIDE_MODEL_BASE_URL:-https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1}"
export SAM_GUIDE_MODEL="${SAM_GUIDE_MODEL:-qwen3.8-max}"
python3 scripts/prepare-openclaw-runtime.py
exec python3 webapp/app.py
