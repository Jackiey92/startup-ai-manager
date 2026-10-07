"""Configurable OV namespace shared by SAM memory subsystems."""
from __future__ import annotations
import os

MEMORY_ROOT = os.environ.get("SAM_MEMORY_ROOT_URI", "").rstrip("/")
if not MEMORY_ROOT:
    raise RuntimeError("Missing SAM_MEMORY_ROOT_URI; set the SAM product OV root explicitly")
