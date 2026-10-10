"""Rebuildable, source-backed 2b fact layer."""

from .l2_fact_schema import FactRecord, SourceRef
from .l2_cap_table import CapTableEvent, CapTableStore, replay_cap_table
from .l2_derivation import FactDerivation
from .l2_fact_extractor import ExtractedFact, MetricSpec, extract_facts
from .l2_complete_facts import L2CompleteFactService
from .l2_consolidation import ConsolidationResult, ConsolidationService

__all__ = [
    "FactRecord", "SourceRef", "CapTableEvent", "CapTableStore",
    "replay_cap_table", "FactDerivation",
    "ExtractedFact", "MetricSpec", "extract_facts", "ConsolidationResult",
    "L2CompleteFactService",
    "ConsolidationService",
]
