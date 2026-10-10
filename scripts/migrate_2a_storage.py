#!/usr/bin/env python3
"""Copy legacy originals and backfill 2A mappings; never delete source files.

Run from the repository root. Use --dry-run first; --db, --legacy-objects and
--two-a-root allow an isolated rehearsal or a custom deployment layout.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import sqlite3
import sys
import tempfile

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from app.source_map import render_mapping, write_mapping
from app.storage.evidence_paths import evidence_root, hash_relpath


def sha256(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def copy_original(source: Path, destination: Path, file_hash: str) -> None:
    """Install a verified copy without ever replacing an existing original."""
    destination.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(dir=destination.parent, prefix=".original-",
                                         suffix=".tmp", delete=False) as stream:
            tmp_path = Path(stream.name)
            with source.open("rb") as original:
                shutil.copyfileobj(original, stream)
            stream.flush()
            os.fsync(stream.fileno())
        if sha256(tmp_path) != file_hash:
            raise ValueError(f"sha256 changed during copy: {source}")
        try:
            os.link(tmp_path, destination)
        except FileExistsError:
            if sha256(destination) != file_hash:
                raise ValueError(f"destination sha256 mismatch: {destination}")
        if sha256(destination) != file_hash:
            raise ValueError(f"destination sha256 mismatch: {destination}")
    finally:
        if tmp_path is not None:
            tmp_path.unlink(missing_ok=True)


def migrate(*, db_path: Path, legacy_objects: Path, two_a_root: Path,
            dry_run: bool = False) -> dict:
    if legacy_objects.resolve() == (two_a_root / "bin").resolve():
        raise ValueError("legacy originals and destination must be separate directories")
    originals: dict[str, Path] = {}
    # Preflight the entire source and destination before installing anything.
    if legacy_objects.exists():
        for source in sorted(legacy_objects.glob("*/*")):
            if source.is_symlink() or source.parent.is_symlink() or not source.is_file():
                raise ValueError(f"not a regular legacy original: {source}")
            name = source.name
            file_hash = name if len(name) == 64 else source.parent.name + name
            relative = hash_relpath(file_hash)
            if source.parent.name != file_hash[:2]:
                raise ValueError(f"incorrect shard: {source}")
            if sha256(source) != file_hash:
                raise ValueError(f"source sha256 mismatch: {source}")
            destination = two_a_root / "bin" / relative
            if destination.exists() and sha256(destination) != file_hash:
                raise ValueError(f"destination sha256 mismatch: {destination}")
            originals[file_hash] = source

    # Never create a ledger or change schema/rows. Actual runs hold the writer
    # lock so parses cannot race map backfill; previews open SQLite read-only.
    mode = "ro" if dry_run else "rw"
    with sqlite3.connect(db_path.resolve().as_uri() + f"?mode={mode}", uri=True, timeout=30) as conn:
        conn.row_factory = sqlite3.Row
        if not dry_run:
            conn.execute("BEGIN IMMEDIATE")
        has_staging = conn.execute(
            "SELECT 1 FROM sqlite_master WHERE type='table' AND name='parse_staging'"
        ).fetchone()
        rows = conn.execute("""
            SELECT p.file_hash,p.payload FROM parse_staging p
            JOIN source_files s ON s.file_hash=p.file_hash
            WHERE p.status='parsed' AND p.id=(
                SELECT MAX(id) FROM parse_staging WHERE file_hash=p.file_hash AND status='parsed'
            ) ORDER BY p.file_hash
        """).fetchall() if has_staging else []
        mappings = []
        for row in rows:
            file_hash = row["file_hash"]
            original = two_a_root / "bin" / hash_relpath(file_hash)
            if file_hash not in originals and (not original.is_file() or sha256(original) != file_hash):
                raise ValueError(f"parsed original missing or corrupt: {file_hash}")
            manifest = json.loads(row["payload"])
            if not isinstance(manifest, dict) or manifest.get("file_hash") != file_hash:
                raise ValueError(f"manifest hash mismatch: {file_hash}")
            mappings.append((two_a_root / "map" / hash_relpath(file_hash, mapping=True),
                             render_mapping(manifest)))

        copied = existing = 0
        for file_hash, source in originals.items():
            destination = two_a_root / "bin" / hash_relpath(file_hash)
            if destination.exists():
                existing += 1
            else:
                copied += 1
                if not dry_run:
                    copy_original(source, destination, file_hash)
        if not dry_run:
            (two_a_root / "bin").mkdir(parents=True, exist_ok=True)
            (two_a_root / "map").mkdir(parents=True, exist_ok=True)
            for path, mapping in mappings:
                write_mapping(path, mapping)
    return {"dry_run": dry_run, "originals_verified": len(originals),
            "originals_to_copy" if dry_run else "originals_copied": copied,
            "originals_already_present": existing,
            "maps_to_write" if dry_run else "maps_written": len(mappings),
            "legacy_preserved": True, "two_a_root": str(two_a_root)}


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", type=Path, default=Path(os.environ.get("SAM_MAIN_DB", "data/app.db")))
    parser.add_argument("--legacy-objects", type=Path, default=Path("data/objects"))
    parser.add_argument("--two-a-root", type=Path, default=evidence_root())
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args(argv)
    try:
        result = migrate(db_path=args.db, legacy_objects=args.legacy_objects,
                         two_a_root=args.two_a_root, dry_run=args.dry_run)
    except (OSError, ValueError, TypeError, sqlite3.Error) as exc:
        print(f"2A migration failed: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
