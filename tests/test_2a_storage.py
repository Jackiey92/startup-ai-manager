"""Stage-one storage contracts: no fact semantics or frontend changes."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path

import pytest

from app.db import connect, init_db
from app.harness.staging import StagingStore
from app.runtime_config import RuntimeConfig
from app.storage.mapping_store import SourceMapService, render_mapping
from app.storage import ArchiveFileStore
from app.storage.archive_paths import hash_relpath
from scripts.migrate_2a_storage import main, migrate

ROOT = Path(__file__).resolve().parents[1]


def manifest(file_hash, text="原始段落"):
    return {"file_hash": file_hash, "filename": "acc-source.pdf", "format": "pdf",
            "parse_summary": {"status": "parsed"},
            "pages": [{"page_no": 1, "text_items": [{"text": text,
                       "source_loc": {"page": 1, "locator": "p1:0-4"}}]}]}


@pytest.fixture
def evidence(tmp_path):
    db = tmp_path / "app.db"
    init_db(db)
    root = tmp_path / "2a"
    store = ArchiveFileStore(root / "bin", db)
    stored = store.put_bytes(b"acc-original", original_name="acc-source.pdf")
    staging = StagingStore(db, maps_path=root / "map")
    service = SourceMapService(db, root / "bin")
    return db, root, store, stored, staging, service


def test_new_original_has_full_hash_and_no_suffix(evidence):
    _, root, store, stored, _, _ = evidence
    assert stored.storage_path == f"{stored.file_hash[:2]}/{stored.file_hash}"
    assert (root / "bin" / stored.storage_path).read_bytes() == b"acc-original"
    path = store.path_for(stored.file_hash)
    before = path.stat().st_mtime_ns
    assert store.put_bytes(b"acc-original", original_name="other.pdf").original_name == "acc-source.pdf"
    assert path.stat().st_mtime_ns == before


def test_configured_root_centrally_routes_bin_and_map(tmp_path, monkeypatch):
    root = tmp_path / "custom-2a"
    monkeypatch.setenv("SAM_2A_ROOT", str(root))
    db = tmp_path / "app.db"
    init_db(db)
    assert ArchiveFileStore(db_path=db).objects_path == root / "bin"
    assert SourceMapService(db).maps_path == root / "map"
    assert StagingStore(db).maps_path == root / "map"
    config = RuntimeConfig.from_env(ROOT, env={"SAM_MEMORY_ROOT_URI": "viking://acc-test/root",
                                              "SAM_2A_ROOT": str(root)})
    assert config.two_a_root == root
    assert config.objects_dir == root / "bin"
    assert config.maps_dir == root / "map"


def test_root_override_wins_over_legacy_manifest(tmp_path):
    config_path = tmp_path / "legacy.yaml"
    config_path.write_text("paths:\n  objects_dir: data/objects\n")
    root = tmp_path / "2a"
    config = RuntimeConfig.from_env(ROOT, env={"SAM_MEMORY_ROOT_URI": "viking://acc-test/root",
        "SAM_MANIFEST": str(config_path), "SAM_2A_ROOT": str(root)})
    assert config.objects_dir == root / "bin"


def test_legacy_explicit_objects_override_remains_supported(tmp_path):
    config = RuntimeConfig.from_env(ROOT, env={"SAM_MEMORY_ROOT_URI": "viking://acc-test/root",
                                              "SAM_OBJECTS_DIR": str(tmp_path / "legacy")})
    assert config.objects_dir == tmp_path / "legacy"
    assert config.maps_dir == tmp_path / "map"


def test_parse_persists_exact_markdown_and_read_prefers_disk(evidence, monkeypatch):
    _, root, _, stored, staging, service = evidence
    payload = manifest(stored.file_hash)
    staging.save_manifest(payload)
    path = root / "map" / stored.file_hash[:2] / f"{stored.file_hash}.md"
    assert path.read_text() == render_mapping(payload)
    monkeypatch.setattr("app.storage.mapping_store.render_mapping", lambda *_args, **_kwargs: pytest.fail("must use disk"))
    assert service.read_map(file_hash=stored.file_hash, company_id="acc-a") == path.read_text()


def test_missing_map_renders_without_read_side_effect(evidence):
    _, _, _, stored, staging, service = evidence
    payload = manifest(stored.file_hash)
    staging.save_manifest(payload)
    path = service.map_path(stored.file_hash)
    path.unlink()
    assert service.read_map(file_hash=stored.file_hash, company_id="acc-a") == render_mapping(payload)
    assert not path.exists()


def test_failed_parse_does_not_overwrite_successful_map(evidence):
    _, _, _, stored, staging, service = evidence
    staging.save_manifest(manifest(stored.file_hash))
    path = service.map_path(stored.file_hash)
    before = path.read_bytes()
    failed = manifest(stored.file_hash, "失败")
    failed["parse_summary"]["status"] = "parse_failed"
    staging.save_manifest(failed)
    assert path.read_bytes() == before


def test_failed_only_parse_does_not_create_map(evidence):
    _, _, _, stored, staging, service = evidence
    failed = manifest(stored.file_hash)
    failed["parse_summary"]["status"] = "parse_failed"
    staging.save_manifest(failed)
    assert not service.map_path(stored.file_hash).exists()


def test_reparse_and_payload_updates_rebuild_latest_projection(evidence):
    _, _, _, stored, staging, service = evidence
    staging.save_manifest(manifest(stored.file_hash))
    newer = manifest(stored.file_hash, "再次解析")
    sid = staging.save_manifest(newer)
    assert service.map_path(stored.file_hash).read_text() == render_mapping(newer)
    staging.update_payload(sid, {"filename": "acc-renamed.pdf"})
    assert service.map_path(stored.file_hash).read_text() == render_mapping({**newer, "filename": "acc-renamed.pdf"})


def test_company_edits_cannot_leak_through_shared_mapping(evidence):
    _, _, store, stored, staging, service = evidence
    original = store.get_bytes(stored.file_hash)
    payload = manifest(stored.file_hash)
    staging.save_manifest(payload)
    service.map_path(stored.file_hash).unlink()
    service.replace(file_hash=stored.file_hash, company_id="acc-a",
                    target_locator="page=1; locator=p1:0-4", replacement_text="公司A修订", confirm=True)
    assert service.map_path(stored.file_hash).read_text() == render_mapping(payload)
    assert "公司A修订" in service.read_map(file_hash=stored.file_hash, company_id="acc-a")
    assert "公司A修订" not in service.read_map(file_hash=stored.file_hash, company_id="acc-b")
    service.remove(file_hash=stored.file_hash, company_id="acc-a",
                   target_locator="page=1; locator=p1:0-4", confirm=True)
    assert "已移除原文片段" in service.read_map(file_hash=stored.file_hash, company_id="acc-a")
    assert store.get_bytes(stored.file_hash) == original


def test_remote_manifest_preference_is_not_changed_by_local_cache(evidence):
    _, _, _, stored, staging, service = evidence
    staging.save_manifest(manifest(stored.file_hash))
    remote = manifest(stored.file_hash, "OV现有原文")
    assert service.read_map(file_hash=stored.file_hash, company_id="acc-a", manifest=remote) == render_mapping(remote)


def test_map_atomic_replace_failure_keeps_previous_file_and_cleans_tmp(evidence, monkeypatch):
    _, root, _, stored, staging, service = evidence
    staging.save_manifest(manifest(stored.file_hash))
    before = service.map_path(stored.file_hash).read_bytes()
    def fail(*_args):
        raise OSError("acc-replace-failure")
    monkeypatch.setattr("app.storage.mapping_store.os.replace", fail)
    with pytest.raises(OSError, match="acc-replace-failure"):
        staging.save_manifest(manifest(stored.file_hash, "更新"))
    assert service.map_path(stored.file_hash).read_bytes() == before
    assert not list((root / "map").rglob("*.tmp"))
    # A failed projection write rolls back the new manifest as well.
    assert service.read_manifest(file_hash=stored.file_hash) == manifest(stored.file_hash)
    monkeypatch.undo()
    assert service.rebuild_map(file_hash=stored.file_hash) == before.decode()


def test_concurrent_parses_leave_latest_manifest_on_disk(evidence):
    _, _, _, stored, staging, service = evidence
    with ThreadPoolExecutor(max_workers=4) as executor:
        list(executor.map(lambda number: staging.save_manifest(manifest(stored.file_hash, str(number))), range(8)))
    assert service.map_path(stored.file_hash).read_text() == render_mapping(service.read_manifest(file_hash=stored.file_hash))


def test_concurrent_uploads_are_immutable_and_deduplicated(evidence):
    db, root, _, _, _, _ = evidence
    data = b"acc-concurrent-original"
    with ThreadPoolExecutor(max_workers=4) as executor:
        stored = list(executor.map(lambda _: ArchiveFileStore(root / "bin", db).put_bytes(data, original_name="acc.bin"), range(8)))
    file_hash = hashlib.sha256(data).hexdigest()
    assert all(item.file_hash == file_hash for item in stored)
    assert (root / "bin" / hash_relpath(file_hash)).read_bytes() == data
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM source_files WHERE file_hash=?", (file_hash,)).fetchone()[0] == 1
    assert not list(root.rglob("*.tmp"))


@pytest.mark.parametrize("file_hash", ["../escape", "a" * 63, "A" * 64, "g" * 64, ""])
def test_invalid_hash_cannot_escape_storage(file_hash):
    with pytest.raises(ValueError, match="sha256"):
        hash_relpath(file_hash, mapping=True)


def legacy_fixture(tmp_path, *, full_hash_name=False):
    db = tmp_path / "app.db"
    init_db(db)
    legacy = tmp_path / "objects"
    data = b"acc-migration-original"
    file_hash = hashlib.sha256(data).hexdigest()
    relpath = Path(file_hash[:2]) / (file_hash if full_hash_name else file_hash[2:])
    source = legacy / relpath
    source.parent.mkdir(parents=True)
    source.write_bytes(data)
    with connect(db) as conn:
        conn.execute("INSERT INTO source_files(file_hash,original_name,size_bytes,storage_path,origin_zone,uploaded_at) VALUES (?,?,?,?,?,?)",
                     (file_hash, "acc-source.pdf", len(data), str(relpath), "internal", "acc-time"))
        conn.execute("CREATE TABLE parse_staging (id INTEGER PRIMARY KEY, file_hash TEXT, payload TEXT, status TEXT)")
        for index, text in enumerate(["旧解析", "新解析"], 1):
            conn.execute("INSERT INTO parse_staging VALUES (?,?,?,?)", (index, file_hash, json.dumps(manifest(file_hash, text)), "parsed"))
        conn.commit()
    return db, legacy, source, file_hash, data


@pytest.mark.parametrize("full_hash_name", [False, True])
def test_migration_dry_run_apply_repeat_and_legacy_read(tmp_path, full_hash_name):
    db, legacy, source, file_hash, data = legacy_fixture(tmp_path, full_hash_name=full_hash_name)
    root = tmp_path / "2a"
    before = db.read_bytes()
    assert ArchiveFileStore(legacy, db).get_bytes(file_hash) == data
    dry = migrate(db_path=db, legacy_objects=legacy, two_a_root=root, dry_run=True)
    assert dry["originals_to_copy"] == dry["maps_to_write"] == 1
    assert not root.exists()
    assert db.read_bytes() == before
    result = migrate(db_path=db, legacy_objects=legacy, two_a_root=root)
    assert result["originals_copied"] == result["maps_written"] == 1
    copied = root / "bin" / hash_relpath(file_hash)
    assert copied.read_bytes() == source.read_bytes() == data
    assert hashlib.sha256(copied.read_bytes()).hexdigest() == file_hash
    assert ArchiveFileStore(root / "bin", db).get_bytes(file_hash) == data
    assert (root / "map" / hash_relpath(file_hash, mapping=True)).read_text() == render_mapping(manifest(file_hash, "新解析"))
    mtime = copied.stat().st_mtime_ns
    repeated = migrate(db_path=db, legacy_objects=legacy, two_a_root=root)
    assert repeated["originals_copied"] == 0
    assert repeated["originals_already_present"] == 1
    assert source.exists() and copied.stat().st_mtime_ns == mtime
    assert db.read_bytes() == before


@pytest.mark.parametrize("corrupt", ["source", "destination", "manifest"])
def test_migration_corruption_aborts_without_deleting_originals(tmp_path, corrupt):
    db, legacy, source, file_hash, _ = legacy_fixture(tmp_path)
    root = tmp_path / "2a"
    if corrupt == "source":
        source.write_bytes(b"acc-corrupt")
    elif corrupt == "destination":
        destination = root / "bin" / hash_relpath(file_hash)
        destination.parent.mkdir(parents=True)
        destination.write_bytes(b"acc-corrupt")
    else:
        with connect(db) as conn:
            conn.execute("UPDATE parse_staging SET payload=?", (json.dumps(manifest("b" * 64)),))
            conn.commit()
    with pytest.raises(ValueError, match="mismatch"):
        migrate(db_path=db, legacy_objects=legacy, two_a_root=root)
    assert source.exists()
    assert not (root / "map").exists()


def test_migration_missing_original_fails_even_on_dry_run(tmp_path):
    db, legacy, source, _, _ = legacy_fixture(tmp_path)
    source.unlink()
    with pytest.raises(ValueError, match="missing or corrupt"):
        migrate(db_path=db, legacy_objects=legacy, two_a_root=tmp_path / "2a", dry_run=True)


def test_migration_without_parsed_table_and_cli_error(tmp_path, capsys):
    db = tmp_path / "app.db"
    init_db(db)
    root = tmp_path / "2a"
    assert migrate(db_path=db, legacy_objects=tmp_path / "missing", two_a_root=root, dry_run=True)["maps_to_write"] == 0
    assert main(["--db", str(tmp_path / "missing.db"), "--dry-run"]) == 1
    assert "2A migration failed:" in capsys.readouterr().err
    assert not (tmp_path / "missing.db").exists()


def test_corrupt_mapping_utf8_falls_back_without_writing(evidence):
    _, _, _, stored, staging, service = evidence
    payload = manifest(stored.file_hash)
    staging.save_manifest(payload)
    path = service.map_path(stored.file_hash)
    path.write_bytes(b"\xff")
    assert service.read_map(file_hash=stored.file_hash, company_id="acc-a") == render_mapping(payload)
    assert path.read_bytes() == b"\xff"


def test_correction_mapping_write_failure_does_not_apply_edit(evidence, monkeypatch):
    db, _, _, stored, staging, service = evidence
    staging.save_manifest(manifest(stored.file_hash))
    def fail(*_args):
        raise OSError("acc-correction-map-failure")
    monkeypatch.setattr("app.storage.mapping_store.os.replace", fail)
    with pytest.raises(OSError, match="acc-correction-map-failure"):
        service.replace(file_hash=stored.file_hash, company_id="acc-a",
                        target_locator="page=1; locator=p1:0-4", replacement_text="不可生效", confirm=True)
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM source_edits").fetchone()[0] == 0
