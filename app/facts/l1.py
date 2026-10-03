"""2B.a: extract facts only from completed self-attributed bridge blocks."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import re

from ..db.database import connect
from .consolidation import ConsolidationResult, ConsolidationService
from .extractor import ExtractedFact, extract_block_facts, _period, period_from_text
from .verifier import verify_candidates
from ..employees import EmployeeRunner, WorkerUnavailable


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_finance_text(text: str) -> str:
    """Collapse MinerU character-spacing without changing source coordinates."""
    value = str(text or "")
    value = re.sub(r"(?<=\d)\s*\.\s*(?=\d)", ".", value)
    value = re.sub(r"(?<=\d)\s+(?=[\d.])", "", value)
    value = re.sub(r"(?<=\.)\s+(?=\d)", "", value)
    value = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=\d)", "", value)
    value = re.sub(r"(?<=\d)\s+(?=[\u4e00-\u9fff%])", "", value)
    return value


@dataclass(frozen=True)
class PreparedFactExtraction:
    run_id: int
    candidates: tuple[ExtractedFact, ...]


class FactExtractionService:
    def __init__(self, db_path, *, authorizer=None):
        self.db_path = db_path
        self.consolidation = ConsolidationService(db_path, authorizer=authorizer)

    def _blocks(self, company_id: str, file_hash: str, bridge_run_id: int | None):
        sql = """SELECT b.*, f.original_name FROM entity_bridge_blocks b
                 JOIN entity_bridge_runs r ON r.id=b.run_id
                 JOIN source_files f ON f.file_hash=b.file_hash
                 WHERE b.company_id=? AND b.file_hash=? AND r.status='completed'
                   AND (b.classification='self' OR
                        (b.classification='related' AND b.relation IN ('并表子公司','控股子公司','全资子公司','子公司')))"""
        params = [company_id, file_hash]
        if bridge_run_id is not None:
            sql += " AND b.run_id=?"
            params.append(bridge_run_id)
        sql += " ORDER BY b.run_id ASC, b.block_index ASC"
        with connect(self.db_path) as conn:
            return [dict(row) for row in conn.execute(sql, params).fetchall()]

    def prepare(self, *, company_id: str, file_hash: str, bridge_run_id: int | None = None,
                use_worker: bool = False, worker=None,
                thread_id: str | None = None) -> PreparedFactExtraction:
        """Run bounded extraction without writing any candidate to ``facts``."""
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        blocks = self._blocks(company_id, file_hash, bridge_run_id)
        selected_run = bridge_run_id or (blocks[0]["run_id"] if blocks else None)
        with connect(self.db_path) as conn:
            cur = conn.execute(
                "INSERT INTO fact_runs(company_id,file_hash,bridge_run_id,status,created_at) VALUES (?,?,?,?,?)",
                (company_id, file_hash, selected_run, "running", _now()),
            )
            run_id = int(cur.lastrowid)
            filename = blocks[0].get("original_name", "") if blocks else ""
        period = _period({"filename": filename})
        candidates = []
        employee = worker or (EmployeeRunner() if use_worker else None)
        for block in blocks:
            block_period = period_from_text(block.get("content", ""), period)
            normalized_block = dict(block)
            normalized_block["content"] = normalize_finance_text(block.get("content", ""))
            if use_worker:
                try:
                    proposed = employee.run(skill="finance-fact-extraction", text=normalized_block["content"],
                                            company_id=company_id, thread_id=thread_id)
                    verified = verify_candidates(proposed, [normalized_block], company_id=company_id)
                    # A healthy employee may return an empty/partial payload
                    # (for example after a model timeout). Never let that
                    # suppress the deterministic finance extractor.
                    candidates.extend(verified)
                    if not proposed:
                        candidates.extend(extract_block_facts(
                            normalized_block, company_id=company_id, period=block_period,
                        ))
                    continue
                except WorkerUnavailable:
                    pass
                except Exception:
                    pass
            candidates.extend(extract_block_facts(normalized_block, company_id=company_id, period=block_period))
        return PreparedFactExtraction(run_id=run_id, candidates=tuple(candidates))

    def commit(self, prepared: PreparedFactExtraction) -> dict:
        """Apply a prepared batch in the short local-write critical section."""
        result: ConsolidationResult = self.consolidation.consolidate_candidates(prepared.candidates)
        with connect(self.db_path) as conn:
            conn.execute(
                """UPDATE fact_runs SET status='completed',candidate_count=?,fact_count=?,todo_count=?,
                   completed_at=? WHERE id=?""",
                (len(prepared.candidates), len(result.verified_fact_ids), len(result.todo_ids),
                 _now(), prepared.run_id),
            )
            conn.commit()
            row = conn.execute("SELECT * FROM fact_runs WHERE id=?", (prepared.run_id,)).fetchone()
        return dict(row)

    def abort(self, prepared: PreparedFactExtraction, *, status: str = "canceled") -> None:
        if status not in {"canceled", "failed"}:
            raise ValueError("invalid fact extraction terminal status")
        with connect(self.db_path) as conn:
            conn.execute(
                "UPDATE fact_runs SET status=?,completed_at=? WHERE id=? AND status='running'",
                (status, _now(), prepared.run_id),
            )
            conn.commit()

    def extract(self, *, company_id: str, file_hash: str, bridge_run_id: int | None = None,
                use_worker: bool = False, worker=None, thread_id: str | None = None) -> dict:
        prepared = self.prepare(
            company_id=company_id, file_hash=file_hash, bridge_run_id=bridge_run_id,
            use_worker=use_worker, worker=worker, thread_id=thread_id,
        )
        return self.commit(prepared)

    def list_facts(self, *, company_id: str, file_hash: str | None = None):
        return self.consolidation.list_facts(company_id=company_id, file_hash=file_hash)

    def list_todos(self, *, company_id: str, status: str | None = "open"):
        return self.consolidation.list_todos(company_id=company_id, status=status)

    def decide(self, *, company_id: str, todo_id: int, choose: str, confirm: bool = False):
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        if not confirm:
            raise PermissionError("write operation requires --confirm")
        return self.consolidation.resolve(todo_id, choose=choose)
