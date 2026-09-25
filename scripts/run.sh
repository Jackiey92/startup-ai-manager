#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

export HOST="${HOST:-0.0.0.0}"
export PORT="${DEPLOY_RUN_PORT:-${PORT:-5000}}"
export SAM_DATA_ROOT="${SAM_DATA_ROOT:-/tmp/sam-data}"
exec python3 webapp/app.py
