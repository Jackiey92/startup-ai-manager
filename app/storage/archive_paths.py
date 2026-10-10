"""Central 2A layout; originals and rebuildable mappings share one root."""
from __future__ import annotations

import os
import re
from pathlib import Path

DEFAULT_2A_ROOT = Path("data/2a")
DEFAULT_OBJECTS_PATH = DEFAULT_2A_ROOT / "bin"


def evidence_root() -> Path:
    return Path(os.environ.get("SAM_2A_ROOT", DEFAULT_2A_ROOT))


def hash_relpath(file_hash: str, *, mapping: bool = False) -> Path:
    if not isinstance(file_hash, str) or not re.fullmatch(r"[0-9a-f]{64}", file_hash):
        raise ValueError("file_hash must be a lowercase sha256 digest")
    return Path(file_hash[:2]) / (file_hash + (".md" if mapping else ""))
