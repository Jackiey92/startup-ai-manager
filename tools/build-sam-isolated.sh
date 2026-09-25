#!/usr/bin/env bash
set -euo pipefail

# Build the persistent SAM workspace. This script does not enable networking.
# Dependency installation is deliberately separate: run with --install only
# from a network-authorized execution channel.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
ISO_ROOT="${SAM_ISOLATED_ROOT:-$SOURCE_ROOT/.sam-isolated}"
RESET=0
INSTALL=0

usage() {
  cat <<EOF
Usage: $0 [--reset] [--install]

  --reset    Recreate the isolated workspace and venv directories.
  --install  Install requirements (requires an explicitly network-enabled run).

Default mode only prepares directories and copies project files; it never
opens networking or contacts package indexes.
EOF
}

for arg in "$@"; do
  case "$arg" in
    --reset) RESET=1 ;;
    --install) INSTALL=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown option: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

mkdir -p "$ISO_ROOT"/{rootfs,workspace,data,venv,logs}

if [[ "$RESET" == 1 ]]; then
  rm -rf "$ISO_ROOT/workspace" "$ISO_ROOT/venv" "$ISO_ROOT/logs"
  mkdir -p "$ISO_ROOT/workspace" "$ISO_ROOT/venv" "$ISO_ROOT/logs"
fi

# Avoid copying the host checkout's venv and transient Python caches.
tar \
  --exclude='./.sam-isolated' \
  --exclude='./.venv' \
  --exclude='./__pycache__' \
  --exclude='*/__pycache__' \
  -cf - -C "$SOURCE_ROOT" . | tar -xf - -C "$ISO_ROOT/workspace"

if [[ "$INSTALL" == 1 ]]; then
  echo "Installing isolated requirements; caller must have explicitly enabled network." >&2
  python3 -m venv "$ISO_ROOT/venv"
  "$ISO_ROOT/venv/bin/python" -m pip install -r "$ISO_ROOT/workspace/requirements.txt"
else
  echo "Prepared $ISO_ROOT/workspace"
  echo "Next (network-authorized channel only):"
  echo "  python3 -m venv '$ISO_ROOT/venv'"
  echo "  '$ISO_ROOT/venv/bin/python' -m pip install -r '$ISO_ROOT/workspace/requirements.txt'"
fi

printf 'source_commit='; git -C "$SOURCE_ROOT" rev-parse HEAD 2>/dev/null || echo unknown
printf 'isolated_root=%s\n' "$ISO_ROOT"
