"""Light classification for sales files based on filename keywords."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class ClassInfo:
    module: str
    doc_type: str
    confidence: float


SALES_HINTS = [
    ("sales_order", ["订单", "合同", "协议", "order", "contract"]),
    ("payment", ["回款", "收款", "台账", "payment", "ledger"]),
    ("customer", ["客户", "customer"]),
    ("delivery", ["发货", "验收", "delivery"]),
]


def classify(filename: str) -> ClassInfo:
    name = filename.lower()
    for doc_type, hints in SALES_HINTS:
        if any(h.lower() in name for h in hints):
            return ClassInfo(module="sales", doc_type=doc_type, confidence=0.75)
    return ClassInfo(module="sales", doc_type="unclassified", confidence=0.3)
