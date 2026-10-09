"""Configurable OV namespace shared by SAM memory subsystems."""
from __future__ import annotations
import os

MEMORY_ROOT = os.environ.get("SAM_MEMORY_ROOT_URI", "").rstrip("/")
if not MEMORY_ROOT and os.environ.get("SAM_CLOUD_READONLY") == "1":
    # An inert namespace only; NullMemoryProvider never reads or writes it.
    MEMORY_ROOT = "viking://sam-cloud-readonly/disabled"
if not MEMORY_ROOT:
    raise RuntimeError("Missing SAM_MEMORY_ROOT_URI; set the SAM product OV root explicitly")
