#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
ISO_ROOT="${SAM_ISOLATED_ROOT:-$SOURCE_ROOT/.sam-isolated}"
VENV="$ISO_ROOT/venv"
ALLOW_MODEL_NETWORK=0

for arg in "$@"; do
  case "$arg" in
    --allow-model-network) ALLOW_MODEL_NETWORK=1 ;;
    --check|-h|--help) ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [[ ! -x "$VENV/bin/python" ]]; then
  echo "Missing isolated venv: $VENV" >&2
  echo "Run build-sam-isolated.sh, then install requirements in a network-authorized channel." >&2
  exit 1
fi

BWRAP_ARGS=(
  --die-with-parent \
  --new-session \
  --ro-bind /usr /usr \
  --ro-bind /bin /bin \
  --ro-bind /sbin /sbin \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --ro-bind /etc /etc \
  --dev /dev \
  --proc /proc \
  --ro-bind /sys /sys \
  --tmpfs /tmp \
  --dir /run \
  --dir /opt \
  --dir /opt/sam \
  --dir /opt/sam/home \
  --bind "$ISO_ROOT/workspace" /opt/sam/workspace \
  --bind "$ISO_ROOT/data" /opt/sam/data \
  --bind "$ISO_ROOT/venv" /opt/sam/venv \
  --bind "$ISO_ROOT/logs" /opt/sam/logs \
  --chdir /opt/sam/workspace \
  --setenv HOME /opt/sam/home \
  --setenv SAM_ISOLATED_ROOT /opt/sam \
  --setenv SAM_VENV_BIN /opt/sam/venv/bin \
  --setenv PATH /opt/sam/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
)

if [[ "$ALLOW_MODEL_NETWORK" != 1 ]]; then
  BWRAP_ARGS=(--unshare-net "${BWRAP_ARGS[@]}")
fi

if [[ "${1:-}" == "--check" ]]; then
  exec bwrap "${BWRAP_ARGS[@]}" /bin/bash -c '
    set -e
    /opt/sam/venv/bin/python webapp/app.py >/opt/sam/logs/flask-check.log 2>&1 &
    pid=$!
    trap "kill $pid 2>/dev/null || true" EXIT
    for i in $(seq 1 20); do
      if /opt/sam/venv/bin/python -c "import urllib.request; r=urllib.request.urlopen(\"http://127.0.0.1:5000/\", timeout=2); print(\"index_status=\", r.status); assert r.status == 200" 2>/dev/null; then
        /opt/sam/venv/bin/python -c "import urllib.request; r=urllib.request.urlopen(\"http://127.0.0.1:5000/prototype\", timeout=2); print(\"prototype_status=\", r.status, \"bytes=\", len(r.read()))"
        /opt/sam/venv/bin/python tools/check-import-guide-api.py
        echo "isolated_flask_check=passed"
        exit 0
      fi
      sleep 0.25
    done
    cat /opt/sam/logs/flask-check.log >&2 || true
    exit 1
  '
fi

if [[ "$ALLOW_MODEL_NETWORK" == 1 ]]; then
  echo "Warning: model network explicitly enabled for this isolated process." >&2
fi
exec bwrap "${BWRAP_ARGS[@]}" /opt/sam/venv/bin/python webapp/app.py
