#!/usr/bin/env bash
# Flask only: no Node, Gateway, parser or OpenViking process.
set -Eeuo pipefail
PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"
export SAM_CLOUD_READONLY=1
export PORT="${PORT:-5000}"
# Select explicitly supplied Python, otherwise the local venv or platform Python.
PYTHON="${SAM_CLOUD_PYTHON:-python3}"
if [[ -z "${SAM_CLOUD_PYTHON:-}" && -x .venv/bin/python ]]; then
  PYTHON=.venv/bin/python
fi
exec "$PYTHON" webapp/app.py
