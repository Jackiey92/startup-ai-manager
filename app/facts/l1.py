"""2B.a: extract facts only from completed self-attributed bridge blocks."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import json
import logging
import os
import sqlite3
import re
import tempfile
from pathlib import Path

from ..db.database import connect
from .consolidation import ConsolidationResult, ConsolidationService
from .extractor import ExtractedFact, extract_block_facts, _period, period_from_text
from .verifier import verify_candidates
from ..employees import EmployeeRunner, WorkerUnavailable


LOGGER = logging.getLogger(__name__)


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
    unresolved: tuple[dict, ...] = ()


class FactExtractionService:
    def __init__(self, db_path, *, authorizer=None, handoff_root=None):
        self.db_path = db_path
        self.consolidation = ConsolidationService(db_path, authorizer=authorizer)
        self.handoff_root = Path(handoff_root) if handoff_root else Path(db_path).parent / "runtime_outbox"

    @staticmethod
    def _unresolved_block(block: dict, *, reason: str, detail: str | None = None) -> dict:
        """Build a manager handoff without inventing a metric or value."""
        return {
            "status": "unresolved",
            "reason": reason,
            "blocking": detail or "employee produced no verifiable finance conclusion",
            "source": {
                "file_hash": str(block.get("file_hash") or ""),
                "page": block.get("source_page"),
                "span": block.get("source_span"),
                "text": str(block.get("content") or ""),
                "entity": block.get("subject"),
                "classification": block.get("classification"),
            },
        }

    def _write_unresolved_handoff(self, prepared: PreparedFactExtraction) -> dict | None:
        if not prepared.unresolved:
            return None
        file_hash = str(prepared.unresolved[0].get("source", {}).get("file_hash") or "unknown")
        directory = self.handoff_root / "unresolved" / "finance_analyst"
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / f"{file_hash}.json"
        payload = {
            "contract_version": "phase3.v1",
            "stage": "2b_facts",
            "status": "unresolved",
            "role": "finance_analyst",
            "artifact_id": f"{file_hash}:fact-run:{prepared.run_id}:unresolved",
            "source_file_hash": file_hash,
            "path": f"runtime_outbox/unresolved/finance_analyst/{file_hash}.json",
            "items": list(prepared.unresolved),
        }
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", dir=directory, prefix=f".{file_hash}.", suffix=".tmp", delete=False,
        ) as handle:
            json.dump(payload, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            temporary = handle.name
        os.replace(temporary, path)
        return {"path": payload["path"], "artifact_id": payload["artifact_id"], "count": len(prepared.unresolved)}

    def _blocks(self, company_id: str, file_hash: str, bridge_run_id: int | None):
        sql = """SELECT b.*, f.original_name FROM entity_bridge_blocks b
                 JOIN source_files f ON f.file_hash=b.file_hash
                 WHERE b.company_id=? AND b.file_hash=?
                   AND (NOT EXISTS (SELECT 1 FROM entity_bridge_runs r WHERE r.id=b.run_id)
                        OR EXISTS (SELECT 1 FROM entity_bridge_runs r
                                   WHERE r.id=b.run_id AND r.status='completed'))
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
        artifact_id = blocks[0].get("artifact_id") if blocks else None
        with connect(self.db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")
            legacy_parent_id = None
            if selected_run is not None:
                artifact = conn.execute(
                    """SELECT artifact_id FROM entity_bridge_artifacts
                       WHERE run_id=? AND company_id=? AND file_hash=? AND status='completed'""",
                    (selected_run, company_id, file_hash),
                ).fetchone()
                if artifact is not None:
                    artifact_id = str(artifact["artifact_id"])
                # New artifacts use a non-FK grouping token.  Preserve the
                # legacy parent reference only when an old row genuinely
                # exists; never manufacture a parent to satisfy a child FK.
                parent = conn.execute(
                    """SELECT id FROM entity_bridge_runs
                       WHERE id=? AND company_id=? AND file_hash=? AND status='completed'""",
                    (selected_run, company_id, file_hash),
                ).fetchone()
                if parent is not None:
                    legacy_parent_id = int(parent["id"])
                elif artifact is None and not blocks:
                    raise KeyError(f"bridge artifact not committed: {selected_run}")
            try:
                cur = conn.execute(
                    """INSERT INTO fact_runs
                       (company_id,file_hash,bridge_run_id,bridge_artifact_id,status,created_at)
                       VALUES (?,?,?,?,?,?)""",
                    (company_id, file_hash, legacy_parent_id, artifact_id, "running", _now()),
                )
            except sqlite3.IntegrityError:
                LOGGER.exception(
                    "fact_runs INSERT failed company_id=%s file_hash=%s bridge_run_id=%s artifact_id=%s",
                    company_id, file_hash, legacy_parent_id, artifact_id,
                )
                raise
            run_id = int(cur.lastrowid)
            filename = blocks[0].get("original_name", "") if blocks else ""
            conn.commit()
        period = _period({"filename": filename})
        candidates = []
        unresolved: list[dict] = []
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
                    candidates.extend(verified)
                    if not verified:
                        unresolved.append(self._unresolved_block(
                            block,
                            reason="employee_empty" if not proposed else "employee_candidates_unverified",
                            detail=("employee returned no candidates" if not proposed
                                    else "employee candidates failed source verification"),
                        ))
                    continue
                except WorkerUnavailable as exc:
                    unresolved.append(self._unresolved_block(
                        block, reason="employee_unavailable", detail=str(exc) or "employee unavailable",
                    ))
                    continue
                except Exception as exc:
                    unresolved.append(self._unresolved_block(
                        block, reason="employee_error", detail=str(exc) or "employee failed",
                    ))
                    continue
            # Explicit legacy/non-employee mode remains available for callers
            # while it is being inventoried. It is not a fallback for the
            # employee path and is not used by the upload worker.
            candidates.extend(extract_block_facts(normalized_block, company_id=company_id, period=block_period))
        return PreparedFactExtraction(run_id=run_id, candidates=tuple(candidates), unresolved=tuple(unresolved))

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
        result = dict(row)
        result["unresolved"] = list(prepared.unresolved)
        result["unresolved_handoff"] = self._write_unresolved_handoff(prepared)
        return result

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
