"""Source file layer: content-addressed, immutable blob storage + manifest."""
from __future__ import annotations

import hashlib
import os
import tempfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from ..db.database import connect

from .evidence_paths import DEFAULT_OBJECTS_PATH, evidence_root, hash_relpath


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class StoredFile:
    file_hash: str
    original_name: str
    mime_type: Optional[str]
    size_bytes: int
    storage_path: str
    origin_zone: str
    status: str
    uploaded_by: Optional[str]
    uploaded_at: str


class SourceFileStore:
    def __init__(self, objects_path: Path | str | None = None, db_path=None):
        self.objects_path = Path(objects_path) if objects_path is not None else evidence_root() / "bin"
        self.objects_path.mkdir(parents=True, exist_ok=True)
        self._db_path = db_path

    def _conn(self):
        return connect(self._db_path) if self._db_path else connect()

    @staticmethod
    def hash_bytes(data: bytes) -> str:
        return hashlib.sha256(data).hexdigest()

    def _object_relpath(self, file_hash: str) -> Path:
        return hash_relpath(file_hash)

    def exists(self, file_hash: str) -> bool:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT 1 FROM source_files WHERE file_hash=?", (file_hash,)
            ).fetchone()
        return row is not None

    def put_path(
        self,
        source: Path,
        *,
        mime_type: Optional[str] = None,
        origin_zone: str = "internal",
        uploaded_by: Optional[str] = None,
    ) -> StoredFile:
        data = Path(source).read_bytes()
        return self.put_bytes(
            data,
            original_name=Path(source).name,
            mime_type=mime_type,
            origin_zone=origin_zone,
            uploaded_by=uploaded_by,
        )

    def put_bytes(
        self,
        data: bytes,
        *,
        original_name: str,
        mime_type: Optional[str] = None,
        origin_zone: str = "internal",
        uploaded_by: Optional[str] = None,
    ) -> StoredFile:
        file_hash = self.hash_bytes(data)
        if self.exists(file_hash):
            return self.get(file_hash)

        relpath = self._object_relpath(file_hash)
        full_path = self.objects_path / relpath
        full_path.parent.mkdir(parents=True, exist_ok=True)

        # A unique temporary and create-only link keep concurrent uploads from
        # replacing an immutable original (including pre-existing orphan blobs).
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(dir=full_path.parent, prefix=".original-",
                                             suffix=".tmp", delete=False) as stream:
                tmp_path = Path(stream.name)
                stream.write(data)
                stream.flush()
                os.fsync(stream.fileno())
            try:
                os.link(tmp_path, full_path)
            except FileExistsError:
                if self.hash_bytes(full_path.read_bytes()) != file_hash:
                    raise ValueError(f"original sha256 mismatch: {full_path}")
        finally:
            if tmp_path is not None:
                tmp_path.unlink(missing_ok=True)

        stored = StoredFile(
            file_hash=file_hash,
            original_name=original_name,
            mime_type=mime_type,
            size_bytes=len(data),
            storage_path=str(relpath).replace("\\", "/"),
            origin_zone=origin_zone,
            status='active',
            uploaded_by=uploaded_by,
            uploaded_at=_now(),
        )
        with self._conn() as conn:
            conn.execute(
                "INSERT INTO source_files(file_hash,original_name,mime_type,"
                "size_bytes,storage_path,origin_zone,uploaded_by,uploaded_at)"
                " VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(file_hash) DO NOTHING",
                (
                    stored.file_hash,
                    stored.original_name,
                    stored.mime_type,
                    stored.size_bytes,
                    stored.storage_path,
                    stored.origin_zone,
                    stored.uploaded_by,
                    stored.uploaded_at,
                ),
            )
            conn.commit()
        return self.get(file_hash)

    def get(self, file_hash: str) -> StoredFile:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM source_files WHERE file_hash=?", (file_hash,)
            ).fetchone()
        if row is None:
            raise KeyError(file_hash)
        return StoredFile(**dict(row))

    def get_bytes(self, file_hash: str) -> bytes:
        return self.path_for(file_hash).read_bytes()

    def list_files(self, *, origin_zone: Optional[str] = None) -> list[StoredFile]:
        sql = "SELECT * FROM source_files"
        params: tuple = ()
        if origin_zone:
            sql += " WHERE origin_zone=?"
            params = (origin_zone,)
        sql += " ORDER BY uploaded_at DESC"
        with self._conn() as conn:
            rows = conn.execute(sql, params).fetchall()
        return [StoredFile(**dict(r)) for r in rows]

    def path_for(self, file_hash: str) -> Path:
        """Prefer the new full-hash name; retain reads of legacy shard names."""
        stored = self.get(file_hash)
        path = self.objects_path / hash_relpath(file_hash)
        return path if path.is_file() else self.objects_path / stored.storage_path
