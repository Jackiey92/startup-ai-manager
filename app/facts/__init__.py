"""Rebuildable, source-backed 2b fact layer."""

from .schema import FactRecord, SourceRef
from .cap_table import CapTableEvent, CapTableStore, replay_cap_table
from .derivation import FactDerivation
from .extractor import ExtractedFact, MetricSpec, extract_facts
from .l1 import FactExtractionService
from .consolidation import ConsolidationResult, ConsolidationService

__all__ = [
    "FactRecord", "SourceRef", "CapTableEvent", "CapTableStore",
    "replay_cap_table", "FactDerivation",
    "ExtractedFact", "MetricSpec", "extract_facts", "ConsolidationResult",
    "FactExtractionService",
    "ConsolidationService",
]
