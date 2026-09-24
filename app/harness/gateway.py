"""Transaction gateway: the only path that writes facts into the ledger.

M1 minimal validation: source present -> claimed default, type/unit checks,
basic cross-fact conflict detection for same entity+attribute.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Optional

from ..db.database import connect

VALID_STATUS = {"verified", "claimed", "inferred"}
VALID_TYPES = {"string", "number", "integer", "boolean", "date"}


class GatewayError(ValueError):
    pass


@dataclass
class FactInput:
    entity: str
    attribute: str
    value: Any
    value_type: str = "string"
    unit: Optional[str] = None
    source_file: Optional[str] = None
    source_page: Optional[int] = None
    source_span: Optional[str] = None
    valid_from: Optional[str] = None
    confidence: float = 1.0
    status: Optional[str] = None  # auto-derived when None
    trust: Optional[str] = None   # asserted conversation facts -> claimed


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class TransactionGateway:
    def __init__(self, db_path=None):
        self._db_path = db_path

    def _conn(self):
        return connect(self._db_path) if self._db_path else connect()

    def assert_fact(self, fact: FactInput) -> int:
        if not fact.entity or not fact.attribute:
            raise GatewayError("entity and attribute are required")
        if fact.value_type not in VALID_TYPES:
            raise GatewayError(f"invalid value_type: {fact.value_type}")
        if not isinstance(fact.confidence, (int, float)) or not 0.0 <= fact.confidence <= 1.0:
            raise GatewayError("confidence must be between 0 and 1")
        if fact.value_type in {"number", "integer"}:
            self._check_numeric(fact)

        status = fact.status
        if status is None:
            if fact.source_file:
                status = "verified"
            elif fact.trust == "claimed":
                status = "claimed"
            else:
                status = "claimed"
        if status not in VALID_STATUS:
            raise GatewayError(f"invalid status: {status}")

        with self._conn() as conn:
            active = conn.execute(
                "SELECT id,value,source_file FROM facts WHERE entity=? AND attribute=?"
                " AND valid_to IS NULL",
                (fact.entity, fact.attribute),
            ).fetchone()
            if active is not None and str(active["value"]) == str(fact.value):
                return active["id"]
            active_source = active["source_file"] if active is not None else None
            if (
                active is not None
                and status == "verified"
                and fact.source_file
                and active_source
                and fact.source_file != active_source
            ):
                raise GatewayError(
                    f"conflict on {fact.entity}.{fact.attribute}: "
                    f"existing={active['value']} new={fact.value}"
                )

            cur = conn.execute(
                "INSERT INTO facts(entity,attribute,value,value_type,unit,"
                "source_file,source_page,source_span,valid_from,confidence,"
                "status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                (
                    fact.entity,
                    fact.attribute,
                    str(fact.value),
                    fact.value_type,
                    fact.unit,
                    fact.source_file,
                    fact.source_page,
                    fact.source_span,
                    fact.valid_from or _now(),
                    fact.confidence,
                    status,
                    _now(),
                ),
            )
            new_id = cur.lastrowid
            if active is not None:
                conn.execute(
                    "UPDATE facts SET valid_to=?, superseded_by=? WHERE id=?",
                    (_now(), new_id, active["id"]),
                )
            conn.commit()
        return new_id

    @staticmethod
    def _check_numeric(fact: FactInput) -> None:
        try:
            float(fact.value)
        except (TypeError, ValueError):
            raise GatewayError(
                f"value {fact.value!r} not numeric for {fact.attribute}"
            )


