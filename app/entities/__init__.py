"""Deterministic entity roster extraction and review."""

from .roster import EntityRosterService, RosterCandidate
from .bridge import EntityBridgeService, classify_block
from .model_client import EntityAttributionModelClient

__all__ = [
    "EntityRosterService", "RosterCandidate", "EntityBridgeService", "classify_block",
    "EntityAttributionModelClient",
]
