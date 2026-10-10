#!/usr/bin/env python3
"""Remove misplaced 2A directories from a local OV workspace (dry-run by default)."""
from __future__ import annotations

import argparse
import os
from pathlib import Path
import re
import shutil

DEFAULT_WORKSPACE = Path(__file__).resolve().parent.parent / "harness-openclaw/state/ov-data/workspace"
PROTECTED = {"2b_facts", "2c_runtime", "runtimes", "memory_maps"}
HASH_DIRECTORY = re.compile(r"[0-9a-f]{64}(?:\.md)?\Z")
MAPPING_NAME = re.compile(r"[0-9a-f]{64}_.+\.md\Z")
MAPPING_TYPE = re.compile(r'''^document_type:\s*["']?2a_source_mapping["']?\s*$''', re.MULTILINE)


def checked_path(workspace: Path, path: Path) -> Path:
    """Reject lexical traversal, symlinks and resolved escapes before any deletion."""
    if ".." in path.parts:
        raise ValueError(f"path traversal rejected: {path}")
    path.relative_to(workspace)
    for part in (path, *path.parents):
        if part.is_symlink():
            raise ValueError(f"symlink rejected: {part}")
    path.resolve(strict=True).relative_to(workspace)
    return path


def raise_walk_error(error: OSError) -> None:
    # Inaccessible subtrees must not turn an incomplete inventory into a
    # deletion plan. Fail closed instead of os.walk's silent default.
    raise error


def inventory(workspace: Path, directory: Path) -> list[Path]:
    checked_path(workspace, directory)
    paths = [directory]
    for base, dirs, files in os.walk(directory, followlinks=False, onerror=raise_walk_error):
        for name in sorted(dirs + files):
            path = Path(base) / name
            checked_path(workspace, path)
            if path.name in PROTECTED:
                raise ValueError(f"protected directory inside target: {path}")
            paths.append(path)
    return sorted(paths)


def is_mapping(files: list[Path]) -> bool:
    for path in files:
        if not path.is_file() or path.suffix != ".md":
            continue
        if MAPPING_NAME.fullmatch(path.name):
            return True
        try:
            with path.open(encoding="utf-8") as stream:
                if stream.readline().strip() != "---":
                    continue
                # Inspect only YAML frontmatter, not arbitrary body mentions.
                frontmatter = []
                for line in stream:
                    if line.strip() == "---":
                        if MAPPING_TYPE.search("".join(frontmatter)):
                            return True
                        break
                    frontmatter.append(line)
        except UnicodeDecodeError:
            continue
    return False


def scan(workspace: Path) -> tuple[dict[Path, list[Path]], list[str]]:
    targets = {}
    skipped = []
    for base, dirs, _files in os.walk(workspace, followlinks=False, onerror=raise_walk_error):
        for name in sorted(dirs[:]):
            path = Path(base) / name
            if path.is_symlink():
                skipped.append(f"{path.relative_to(workspace)}: symlink")
                dirs.remove(name)
                continue
            if name in PROTECTED:
                dirs.remove(name)
                continue
            relative = path.relative_to(workspace)
            extraction = name == "2a_extraction"
            candidate = "resources" in relative.parts[:-1] and HASH_DIRECTORY.fullmatch(name)
            if not extraction and not candidate:
                continue
            try:
                contents = inventory(workspace, path)
            except ValueError as exc:
                skipped.append(f"{relative}: {exc}")
                dirs.remove(name)
                continue
            if extraction or is_mapping(contents):
                targets[path] = contents
                dirs.remove(name)  # An ancestor deletion already covers all descendants.
            else:
                skipped.append(f"{relative}: no 2A mapping signature")
    return targets, skipped


def report(workspace: Path, targets: dict[Path, list[Path]], skipped: list[str], *, title: str) -> None:
    print(title)
    directories = files = 0
    for contents in targets.values():
        for path in contents:
            kind = "DIR" if path.is_dir() else "FILE"
            directories += kind == "DIR"
            files += kind == "FILE"
            print(f"  {kind} {path.relative_to(workspace)}")
    print(f"targets={len(targets)} directories={directories} files={files}")
    for item in skipped:
        print(f"SKIP {item}")
    print(f"skipped={len(skipped)}")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", type=Path, default=DEFAULT_WORKSPACE)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="list only (default)")
    mode.add_argument("--go", action="store_true", help="delete the enumerated directories")
    args = parser.parse_args(argv)
    try:
        if ".." in args.workspace.parts:
            raise ValueError("workspace traversal rejected")
        workspace = args.workspace.absolute()
        checked_path(workspace, workspace)
        if not workspace.is_dir():
            raise ValueError(f"workspace is not a directory: {workspace}")
        targets, skipped = scan(workspace)
        report(workspace, targets, skipped, title="Will delete (GO)" if args.go else "Will delete (DRY RUN)")
        if not args.go:
            return 0
        # Revalidate the complete plan before touching any target, then again
        # at each removal. rmtree does not follow directory symlinks.
        for directory, contents in targets.items():
            if inventory(workspace, directory) != contents:
                raise ValueError(f"target changed after enumeration: {directory}")
        for directory in targets:
            inventory(workspace, directory)
            shutil.rmtree(checked_path(workspace, directory))
            print(f"DELETED {directory.relative_to(workspace)}")
        remaining, skipped = scan(workspace)
        report(workspace, remaining, skipped, title="Post-delete scan")
        if remaining or any(path.exists() for path in targets):
            raise ValueError("2A deletion verification failed")
        return 0
    except (OSError, ValueError) as exc:
        parser.exit(1, f"ERROR: {exc}\n")


if __name__ == "__main__":
    raise SystemExit(main())
