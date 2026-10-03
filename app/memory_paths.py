"""Configurable OV namespace shared by SAM memory subsystems."""
from __future__ import annotations
import os

DEFAULT_MEMORY_ROOT = "viking://user/default/memories/projects/10_startup_ai_manager"
MEMORY_ROOT = os.environ.get("SAM_MEMORY_ROOT_URI", DEFAULT_MEMORY_ROOT).rstrip("/")
