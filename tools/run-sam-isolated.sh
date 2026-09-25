#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
ISO_ROOT="${SAM_ISOLATED_ROOT:-$SOURCE_ROOT/.sam-isolated}"
VENV="$ISO_ROOT/venv"

if [[ ! -x "$VENV/bin/python" ]]; then
  echo "Missing isolated venv: $VENV" >&2
  echo "Run build-sam-isolated.sh, then install requirements in a network-authorized channel." >&2
  exit 1
fi

BWRAP_ARGS=(
  --die-with-parent \
  --new-session \
  --unshare-net \
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
  --setenv PATH /opt/sam/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
)

if [[ "${1:-}" == "--check" ]]; then
  exec bwrap "${BWRAP_ARGS[@]}" /bin/bash -c '
    set -e
    /opt/sam/venv/bin/python webapp/app.py >/opt/sam/logs/flask-check.log 2>&1 &
    pid=$!
    trap "kill $pid 2>/dev/null || true" EXIT
    for i in $(seq 1 20); do
      if /opt/sam/venv/bin/python -c "import urllib.request; r=urllib.request.urlopen(\"http://127.0.0.1:5000/\", timeout=2); print(\"index_status=\", r.status); assert r.status == 200" 2>/dev/null; then
        /opt/sam/venv/bin/python -c "import urllib.request; r=urllib.request.urlopen(\"http://127.0.0.1:5000/prototype\", timeout=2); print(\"prototype_status=\", r.status, \"bytes=\", len(r.read()))"
        echo "isolated_flask_check=passed"
        exit 0
      fi
      sleep 0.25
    done
    cat /opt/sam/logs/flask-check.log >&2 || true
    exit 1
  '
fi

exec bwrap "${BWRAP_ARGS[@]}" /opt/sam/venv/bin/python webapp/app.py
