#!/usr/bin/env bash
# Canonical browser screenshot helper for SAM dev / CRIS.
#
# Why this exists:
#   Launching the Windows Chrome/Edge from WSL with --user-data-dir pointing
#   at a WSL path (\\wsl.localhost\Ubuntu\tmp\...) breaks file locking and the
#   sandbox ("LockFileEx ... 0x1", "database is locked"), then the GPU process
#   crashes and the browser exits. Do NOT hand-roll CDP launchers with a WSL
#   profile dir. Use this script instead.
#
# Usage:
#   scripts/dev_browser_shot.sh <url> <out.png> [WxH] [virtual-time-ms]
# Example:
#   scripts/dev_browser_shot.sh http://127.0.0.1:18789 /tmp/shot.png 1280x900 4000
set -euo pipefail

URL="${1:?url required}"
OUT_WSL="${2:?output png path required}"
SIZE="${3:-1280x900}"
VTIME="${4:-4000}"

edge_candidates=(
  "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe"
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
)
BROWSER=""
for c in "${edge_candidates[@]}"; do
  if [ -x "$c" ]; then BROWSER="$c"; break; fi
done
[ -n "$BROWSER" ] || { echo "no Edge/Chrome found on Windows side" >&2; exit 1; }

# Output must be a Windows-side path the browser can write to.
case "$OUT_WSL" in
  /mnt/c/*) ;;
  *) echo "output path must be under /mnt/c (got $OUT_WSL)" >&2; exit 1;;
esac
OUT_WIN=$(wslpath -w "$OUT_WSL")
mkdir -p "$(dirname "$OUT_WSL")"
rm -f "$OUT_WSL"

# Pick the real lowercase Windows profile (case-insensitive mount makes -d on
# a wrong-cased name misleading, so verify the Temp subdir is actually usable).
WINUSER="jacki"
if ! mkdir -p "/mnt/c/Users/${WINUSER}/AppData/Local/Temp/.sam-probe" 2>/dev/null; then
  WINUSER=""
  for u in $(ls /mnt/c/Users | grep -v -E '^(All Users|Default|Default User|Public|desktop.ini)$'); do
    if mkdir -p "/mnt/c/Users/${u}/AppData/Local/Temp/.sam-wtest" 2>/dev/null; then
      rmdir "/mnt/c/Users/${u}/AppData/Local/Temp/.sam-wtest" 2>/dev/null
      WINUSER="$u"; break
    fi
  done
fi
[ -n "$WINUSER" ] || { echo "no writable Windows user profile found" >&2; exit 1; }
PROFILE_WSL="/mnt/c/Users/${WINUSER}/AppData/Local/Temp/sam-shot-${RANDOM}"
PROFILE_WIN=$(wslpath -w "$PROFILE_WSL")
rm -rf "$PROFILE_WSL"; mkdir -p "$PROFILE_WSL"

"$BROWSER" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-software-rasterizer \
  --disable-features=Vulkan \
  --user-data-dir="$PROFILE_WIN" \
  --virtual-time-budget="$VTIME" \
  --window-size="$SIZE" \
  --screenshot="$OUT_WIN" \
  "$URL" >/dev/null 2>&1 || true

# Edge often needs a beat after returning to flush the file.
for _ in $(seq 1 20); do [ -s "$OUT_WSL" ] && break; sleep 0.5; done

if [ -s "$OUT_WSL" ]; then
  echo "shot ok: $OUT_WSL ($(stat -c%s "$OUT_WSL") bytes)"
else
  echo "shot failed: $OUT_WSL" >&2
  rm -rf "$PROFILE_WSL"
  exit 1
fi

rm -rf "$PROFILE_WSL"
