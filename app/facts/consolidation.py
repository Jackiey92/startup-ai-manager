"""2B consolidation: review deterministic L2 candidates before fact writes.

This module is intentionally independent of conversation ``promote``.  It is
the document-import path: parsed manifest -> deterministic candidates ->
auto-verified operating facts or human-gated todos.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Callable

from ..db.database import connect
from .extractor import ExtractedFact, extract_facts


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass(frozen=True)
class ConsolidationResult:
    verified_fact_ids: tuple[int, ...]
    todo_ids: tuple[int, ...]
    duplicate_fact_ids: tuple[int, ...]


SuggestionProvider = Callable[[ExtractedFact, str | None, str], str]
Authorizer = Callable[[dict, str], None]


def deterministic_suggestion(candidate: ExtractedFact, existing_value: str | None, reason: str) -> str:
    if reason == "critical_review":
        return (
            f"「{candidate.metric}」属于重大指标。建议核验原件坐标后，"
            f"由负责人选择是否采用候选值 {candidate.value}。"
        )
    if reason in {"uncertain", "anomaly"}:
        return f"「{candidate.metric}」候选值需核对原件坐标和语义后再确认，系统不会自动写入。"
    return (
        f"检测到 {candidate.metric} 在期间 {candidate.period} 的候选值 {candidate.value} "
        f"与当前值 {existing_value} 不一致。建议先保留当前值，并核对候选原件坐标后人工决定。"
    )


class ConsolidationService:
    """Append-only fact/todo workflow with a pluggable, non-authoritative suggester."""

    def __init__(self, db_path, *, suggestion_provider: SuggestionProvider | None = None,
                 authorizer: Authorizer | None = None) -> None:
        self._db_path = db_path
        self._suggestion_provider = suggestion_provider
        # First release intentionally has no authentication.  The injected
        # hook is the sole extension point for a later password/SSO policy.
        self._authorizer = authorizer or (lambda _todo, _action: None)

    def _conn(self):
        return connect(self._db_path)

    def consolidate_manifest(self, manifest: dict, *, company_id: str) -> ConsolidationResult:
        candidates = extract_facts(manifest, company_id=company_id)
        return self.consolidate_candidates(candidates)

    def consolidate_candidates(self, candidates) -> ConsolidationResult:
        """Consolidate already ownership-filtered L1 candidates."""
        verified: list[int] = []
        todos: list[int] = []
        duplicates: list[int] = []
        with self._conn() as conn:
            for candidate in candidates:
                current = self._current_fact(conn, candidate)
                if current is None:
                    if candidate.critical or candidate.review_reason:
                        reason = candidate.review_reason or "critical_review"
                        todo_id = self._open_todo(conn, candidate, existing=None, reason=reason)
                        if todo_id is not None:
                            todos.append(todo_id)
                    else:
                        verified.append(self._insert_fact(conn, candidate, confirm_mode="auto"))
                    continue
                if str(current["value"]) == candidate.value:
                    # Same coordinate/value remains one current fact. A resend
                    # of the same source is strictly idempotent; a second
                    # source with equal content also cannot create ambiguity.
                    duplicates.append(int(current["id"]))
                    continue
                todo_id = self._open_todo(conn, candidate, existing=current, reason="conflict")
                if todo_id is not None:
                    todos.append(todo_id)
            conn.commit()
        return ConsolidationResult(tuple(verified), tuple(todos), tuple(duplicates))

    @staticmethod
    def _current_fact(conn, candidate: ExtractedFact):
        return conn.execute(
            """
            SELECT * FROM facts
            WHERE company_id=? AND entity=? AND attribute=? AND period=?
              AND superseded_by IS NULL AND valid_to IS NULL
            ORDER BY id DESC LIMIT 1
            """,
            candidate.entity_coordinate,
        ).fetchone()

    def _open_todo(self, conn, candidate: ExtractedFact, *, existing, reason: str) -> int | None:
        duplicate = conn.execute(
            """
            SELECT id FROM todos WHERE company_id=? AND entity=? AND metric=? AND period=?
              AND candidate_value=? AND source_file=? AND reason=? AND status='open'
            LIMIT 1
            """,
            (candidate.company_id, candidate.entity or candidate.company_id, candidate.metric, candidate.period, candidate.value,
             candidate.source_file, reason),
        ).fetchone()
        if duplicate is not None:
            return None
        existing_value = str(existing["value"]) if existing is not None else None
        suggestion = self._suggest(candidate, existing_value, reason)
        cur = conn.execute(
            """
            INSERT INTO todos(company_id,entity,metric,period,candidate_value,candidate_value_type,
                candidate_unit,existing_value,reason,suggestion,status,related_fact_id,
                source_file,source_page,source_span,created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,'open',?,?,?,?,?)
            """,
            (candidate.company_id, candidate.entity or candidate.company_id, candidate.metric, candidate.period, candidate.value,
             candidate.value_type, candidate.unit, existing_value, reason, suggestion,
             int(existing["id"]) if existing is not None else None, candidate.source_file,
             candidate.source_page, candidate.source_span, _now()),
        )
        return int(cur.lastrowid)

    def _suggest(self, candidate: ExtractedFact, existing_value: str | None, reason: str) -> str:
        if self._suggestion_provider is not None:
            try:
                text = self._suggestion_provider(candidate, existing_value, reason)
                if isinstance(text, str) and text.strip():
                    return text.strip()
            except Exception:
                # A model-backed optional suggestion must never block fact
                # processing or change the deterministic decision path.
                pass
        return deterministic_suggestion(candidate, existing_value, reason)

    @staticmethod
    def _insert_fact(conn, candidate: ExtractedFact, *, confirm_mode: str) -> int:
        cur = conn.execute(
            """
            INSERT INTO facts(company_id,entity,attribute,period,value,value_type,unit,
                source_file,source_page,source_span,valid_from,confidence,status,confirm_mode,created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """,
            (candidate.company_id, candidate.entity or candidate.company_id, candidate.metric, candidate.period,
             candidate.value, candidate.value_type, candidate.unit, candidate.source_file,
             candidate.source_page, candidate.source_span, _now(), candidate.confidence,
             "verified", confirm_mode, _now()),
        )
        return int(cur.lastrowid)

    def list_facts(self, *, company_id: str, file_hash: str | None = None) -> list[dict]:
        sql = "SELECT * FROM facts WHERE company_id=? AND superseded_by IS NULL AND valid_to IS NULL"
        params: list[str] = [company_id]
        if file_hash:
            sql += " AND source_file=?"
            params.append(file_hash)
        sql += " ORDER BY id ASC"
        with self._conn() as conn:
            return [dict(row) for row in conn.execute(sql, params).fetchall()]

    def list_todos(self, *, company_id: str, status: str | None = "open") -> list[dict]:
        sql = "SELECT * FROM todos WHERE company_id=?"
        params: list[str] = [company_id]
        if status:
            sql += " AND status=?"
            params.append(status)
        sql += " ORDER BY id ASC"
        with self._conn() as conn:
            return [dict(row) for row in conn.execute(sql, params).fetchall()]

    def resolve(self, todo_id: int, *, choose: str) -> dict:
        """Resolve a reviewed candidate through the injectable policy hook.

        Conflicting values from one imported source are reviewed as one
        evidence bundle: accepting its candidate applies every still-open
        conflict from that source atomically. Each coordinate retains its own
        append-only todo and supersession trail.
        """
        with self._conn() as conn:
            todo = conn.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
            if todo is None:
                raise KeyError(todo_id)
            if todo["status"] != "open":
                raise ValueError("todo is not open")
            self._authorizer(dict(todo), "resolve")
            if choose in {"candidate", "existing"} and todo["reason"] == "conflict":
                targets = conn.execute(
                    """SELECT * FROM todos WHERE company_id=? AND source_file=?
                       AND reason='conflict' AND status='open' ORDER BY id ASC""",
                    (todo["company_id"], todo["source_file"]),
                ).fetchall()
            else:
                targets = [todo]
            resolved_ids: list[int] = []
            selected_fact_id: int | None = None
            now = _now()
            for target in targets:
                new_fact_id = None
                if choose != "existing":
                    value = str(target["candidate_value"]) if choose == "candidate" else str(choose)
                    candidate = ExtractedFact(
                        company_id=target["company_id"], metric=target["metric"], period=target["period"],
                        value=value, value_type=target["candidate_value_type"], unit=target["candidate_unit"],
                        source_file=target["source_file"], source_page=target["source_page"],
                        source_span=target["source_span"], confidence=1.0, critical=False,
                        entity=target["entity"] or target["company_id"],
                    )
                    new_fact_id = self._insert_fact(conn, candidate, confirm_mode="manual")
                    if target["related_fact_id"] is not None:
                        conn.execute(
                            "UPDATE facts SET superseded_by=?,valid_to=? WHERE id=? AND superseded_by IS NULL",
                            (new_fact_id, now, target["related_fact_id"]),
                        )
                conn.execute(
                    "UPDATE todos SET status='resolved',resolved_at=? WHERE id=?", (now, target["id"])
                )
                resolved_ids.append(int(target["id"]))
                if int(target["id"]) == todo_id:
                    selected_fact_id = new_fact_id
            conn.commit()
            return {"id": todo_id, "status": "resolved", "fact_id": selected_fact_id,
                    "resolved_ids": resolved_ids}

    def dismiss(self, todo_id: int) -> dict:
        with self._conn() as conn:
            todo = conn.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
            if todo is None:
                raise KeyError(todo_id)
            if todo["status"] != "open":
                raise ValueError("todo is not open")
            self._authorizer(dict(todo), "dismiss")
            conn.execute(
                "UPDATE todos SET status='dismissed',resolved_at=? WHERE id=?", (_now(), todo_id)
            )
            conn.commit()
            return {"id": todo_id, "status": "dismissed"}
