"""Physical archive boundary and local-only cleanup safety regression tests."""
import ast
from pathlib import Path
import re
import subprocess
import sys

import pytest

from scripts import clean_2a_from_ov as cleaner

ROOT = Path(__file__).resolve().parents[1]
PROTECTED = ("app/storage", "app/memory/archive")
FORBIDDEN = re.compile(r"MemoryProvider|OpenViking|memory_paths|add_resource_to|memory\.put")


def assert_external_only(source, filename):
    assert not FORBIDDEN.search(source), f"OV dependency in {filename}"
    for node in ast.walk(ast.parse(source, filename=str(filename))):
        if isinstance(node, ast.Import):
            modules = [alias.name for alias in node.names]
        elif isinstance(node, ast.ImportFrom):
            modules = [node.module or "", *(alias.name for alias in node.names)]
        else:
            continue
        assert not any(
            module.split(".")[-1] in {"ports", "ov_navigation", "memory_paths"}
            or "openviking" in module.lower() or "memoryprovider" in module.lower()
            for module in modules
        ), f"OV import in {filename}"


def test_archive_storage_has_no_ov_dependency():
    for directory in PROTECTED:
        for path in (ROOT / directory).rglob("*.py"):
            assert_external_only(path.read_text(encoding="utf-8"), path)


@pytest.mark.parametrize("source", [
    "from app.ports import MemoryProvider",
    "from ...ports import LocalMemoryProvider as Store",
    "import app.memory_paths as paths",
    "from app import memory_paths",
    "import openviking",
    "store.add_resource_to('source', 'uri')",
    "memory.put('uri', 'content')",
])
def test_physical_guard_rejects_injected_dependency(tmp_path, source):
    # Exercise the very same scanner on an actual protected-directory fixture.
    path = tmp_path / "app" / "storage" / "archive_store.py"
    path.parent.mkdir(parents=True)
    path.write_text(source, encoding="utf-8")
    with pytest.raises(AssertionError):
        assert_external_only(path.read_text(encoding="utf-8"), path)


def test_repository_has_no_deleted_visual_module_import():
    excluded = {".git", ".venv", "node_modules", "__pycache__"}
    deleted = "app.memory." + "visual_extraction"
    for path in ROOT.rglob("*.py"):
        if excluded.intersection(path.relative_to(ROOT).parts):
            continue
        for node in ast.walk(ast.parse(path.read_text(encoding="utf-8"), filename=str(path))):
            if isinstance(node, ast.Import):
                assert all(alias.name != deleted for alias in node.names), path
            elif isinstance(node, ast.ImportFrom):
                module = node.module or ""
                assert module != deleted, path
                assert not (module == "app.memory" and any(
                    alias.name == deleted.rsplit(".", 1)[1] for alias in node.names
                )), path
    assert not (ROOT / "app/memory" / (deleted.rsplit(".", 1)[1] + ".py")).exists()


def write_file(root, name, text="preserve"):
    path = root / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


def snapshot(root):
    return {path.relative_to(root): path.read_bytes() for path in root.rglob("*") if path.is_file()}


def test_cleanup_enumerates_only_2a_and_preserves_other_bytes(tmp_path, capsys):
    workspace = tmp_path / "workspace"
    for prefix in ("resources/sam", "resources/acc/memories", "user/acc/memories"):
        write_file(workspace, f"viking/default/{prefix}/2a_extraction/acc/source/L2/mapping.md")
    marked = write_file(workspace, f"viking/default/resources/财务/{'a' * 64}.md/mapping.md",
                        '---\ndocument_type: "2a_source_mapping"\n---\noriginal mapping')
    named = write_file(workspace, f"resources/法务/{'b' * 64}/{('b' * 64)}_copy.md")
    write_file(workspace, str(marked.parent.relative_to(workspace) / ".abstract.md"))
    write_file(workspace, str(named.parent.relative_to(workspace) / ".overview.md"))
    # Lookalikes without the mapping signature must never be removed.
    write_file(workspace, f"resources/财务/{'c' * 64}.md/data.md", "not a mapping")
    write_file(workspace, f"resources/财务/{'d' * 64}.md/body.md",
               "# report\ndocument_type: 2a_source_mapping")
    write_file(workspace, f"user/acc/{'e' * 64}.md/mapping.md",
               "---\ndocument_type: 2a_source_mapping\n---")
    write_file(workspace, f"resources/{'f' * 64}.md", "a file, not a directory")
    for name in cleaner.PROTECTED:
        write_file(workspace, f"resources/sam/{name}/data.json")
    write_file(workspace, "resources/财务/.abstract.md")
    write_file(workspace, "resources/财务/.overview.md")
    before = snapshot(workspace)
    targets, skipped = cleaner.scan(workspace)
    assert len(targets) == 5 and len(skipped) == 2
    assert cleaner.main(["--workspace", str(workspace)]) == 0
    assert snapshot(workspace) == before
    output = capsys.readouterr().out
    assert "DRY RUN" in output and "targets=5" in output and "no 2A mapping signature" in output
    preserved = {path: data for path, data in before.items()
                 if not any(target.relative_to(workspace) in path.parents for target in targets)}
    assert cleaner.main(["--workspace", str(workspace), "--go"]) == 0
    assert cleaner.scan(workspace)[0] == {}
    assert snapshot(workspace) == preserved
    assert capsys.readouterr().out.count("DELETED ") == 5
    assert cleaner.main(["--workspace", str(workspace), "--go"]) == 0


def test_cleanup_refuses_symlink_escape_and_protected_descendants(tmp_path, capsys):
    workspace = tmp_path / "workspace"
    outside = tmp_path / "outside"
    write_file(outside, "2a_extraction/original.md")
    workspace.mkdir()
    (workspace / "resources").symlink_to(outside, target_is_directory=True)
    write_file(workspace, "user/2a_extraction/source.md")
    (workspace / "user/2a_extraction/link").symlink_to(outside, target_is_directory=True)
    write_file(workspace, "other/2a_extraction/2b_facts/data.json")
    before = snapshot(outside)
    assert cleaner.main(["--workspace", str(workspace), "--go"]) == 0
    assert snapshot(outside) == before
    assert (workspace / "user/2a_extraction/source.md").exists()
    assert (workspace / "other/2a_extraction/2b_facts/data.json").exists()
    assert "symlink" in capsys.readouterr().out
    with pytest.raises(ValueError):
        cleaner.checked_path(workspace, outside)
    with pytest.raises(ValueError):
        cleaner.checked_path(workspace, workspace / ".." / "outside")
    with pytest.raises(SystemExit) as rejected:
        cleaner.main(["--workspace", str(workspace / "resources"), "--go"])
    assert rejected.value.code == 1


def test_cleanup_standalone_dry_run(tmp_path):
    workspace = tmp_path / "workspace"
    write_file(workspace, "resources/sam/2a_extraction/source.md")
    before = snapshot(workspace)
    result = subprocess.run([sys.executable, str(ROOT / "scripts/clean_2a_from_ov.py"),
                             "--workspace", str(workspace), "--dry-run"],
                            capture_output=True, text=True, cwd=tmp_path, timeout=10)
    assert result.returncode == 0, result.stderr
    assert "targets=1" in result.stdout
    assert snapshot(workspace) == before
