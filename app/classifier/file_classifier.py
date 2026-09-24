"""Rule-based coarse classifier run at import time.

Only uses filename / extension / folder keywords. Results are low-confidence
pending classifications meant to be refined after parsing.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

from ..db.database import connect

# module -> filename keyword hints (checked against lowercased name)
MODULE_HINTS = {
    "sales": ["客户", "订单", "销售", "回款", "发货", "invoice", "order", "customer"],
    "marketing": ["线索", "渠道", "活动", "投放", "营销", "lead", "channel", "campaign"],
    "hr": ["员工", "花名册", "合同", "薪酬", "期权", "工资", "hr", "payroll"],
    "finance": ["凭证", "利润", "资产负债", "现金流", "成本", "财务", "finance"],
}

# module -> doc_type keyword hints
DOC_TYPE_HINTS = {
    "sales": {
        "customer": ["客户", "customer"],
        "sales_order": ["订单", "合同", "order"],
        "delivery": ["发货", "验收", "delivery"],
        "payment": ["回款", "收款", "payment"],
    },
    "marketing": {
        "lead": ["线索", "lead"],
        "channel": ["渠道", "channel"],
        "campaign": ["活动", "campaign"],
        "ad_spend": ["投放", "广告", "ad"],
    },
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class CoarseResult:
    module: Optional[str]
    doc_type: Optional[str]
    confidence: float


class FileClassifier:
    @staticmethod
    def guess(original_name: str) -> CoarseResult:
        name = original_name.lower()

        module: Optional[str] = None
        for mod, hints in MODULE_HINTS.items():
            if any(h.lower() in name for h in hints):
                module = mod
                break

        doc_type: Optional[str] = None
        confidence = 0.0
        if module:
            confidence = 0.6
            for dt, hints in DOC_TYPE_HINTS.get(module, {}).items():
                if any(h.lower() in name for h in hints):
                    doc_type = dt
                    confidence = 0.75
                    break

        return CoarseResult(module, doc_type, confidence)

    @staticmethod
    def record_classification(
        file_hash: str,
        result: CoarseResult,
        *,
        conn=None,
    ) -> Optional[int]:
        if result.module is None:
            return None
        own_conn = conn is None
        if own_conn:
            conn = connect()
        try:
            cur = conn.execute(
                "INSERT INTO file_classifications(file_hash,module,doc_type,"
                "confidence,status,classified_by,created_at)"
                " VALUES (?,?,?,?,?,?,?)",
                (
                    file_hash,
                    result.module,
                    result.doc_type,
                    result.confidence,
                    "pending",
                    "auto",
                    _now(),
                ),
            )
            if own_conn:
                conn.commit()
            return cur.lastrowid
        finally:
            if own_conn:
                conn.close()
