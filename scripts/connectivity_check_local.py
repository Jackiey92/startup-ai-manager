#!/usr/bin/env python3
"""Real-server OpenViking file I/O smoke test; not part of ordinary pytest."""
from __future__ import annotations

import json
import os
import argparse
import shlex
import shutil
import subprocess
import sys
import time
import uuid
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from app.ports import MemoryUnavailable, OpenVikingMemoryProvider


def _text(item: dict) -> str:
    for key in ("content", "text", "body", "abstract"):
        value = item.get(key)
        if isinstance(value, str) and value:
            return value
    return ""


def _search_items(payload: object) -> list[dict]:
    if isinstance(payload, dict):
        payload = payload.get("result", payload)
    if isinstance(payload, dict):
        items = []
        for key in ("memories", "resources", "skills", "results", "items"):
            value = payload.get(key)
            if isinstance(value, list):
                items.extend(item for item in value if isinstance(item, dict))
        return items
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    return []


def _delete_with_retry(provider: OpenVikingMemoryProvider, uri: str, *, recursive: bool) -> None:
    for attempt in range(30):
        try:
            provider.delete(uri, recursive=recursive)
            return
        except FileNotFoundError:
            return
        except MemoryUnavailable as exc:
            detail = str(exc).lower()
            if not any(token in detail for token in ("path_busy", "being processed", "retryable")):
                raise
            if attempt == 29:
                raise
            time.sleep(1)


def _allowlisted_child_env() -> dict[str, str]:
    return {key: os.environ[key] for key in ("PATH", "HOME", "LANG", "LC_ALL", "TMPDIR")
            if os.environ.get(key)}


def run_semantic(provider: OpenVikingMemoryProvider) -> None:
    """Exercise real local vectors and retrieval against the configured server."""
    semantic_config_value = os.environ.get(
        "SAM_OV_SEMANTIC_CONFIG_FILE",
        "harness-openclaw/state/ov-data/ov.semantic.conf",
    )
    semantic_config_path = Path(semantic_config_value)
    if not semantic_config_path.is_absolute():
        semantic_config_path = PROJECT_ROOT / semantic_config_path
    if not semantic_config_path.is_file():
        print(f"SKIP semantic: local semantic config is absent: {semantic_config_path}")
        return
    semantic_config = json.loads(semantic_config_path.read_text(encoding="utf-8"))
    dense = semantic_config.get("embedding", {}).get("dense", {})
    if (dense.get("provider"), dense.get("model"), dense.get("dimension")) != (
        "local", "bge-small-zh-v1.5-f16", 512,
    ):
        print("SKIP semantic: config is not local bge-small-zh-v1.5-f16 at 512 dimensions")
        return
    cache_value = dense.get("cache_dir")
    if not isinstance(cache_value, str) or not cache_value:
        print("SKIP semantic: local embedding cache_dir is not configured")
        return
    cache_dir = Path(cache_value).expanduser()
    model_file = cache_dir / "bge-small-zh-v1.5-f16.gguf"
    if not model_file.is_file():
        print(f"SKIP semantic: local GGUF model is not cached: {model_file}")
        return
    server_script = shutil.which("openviking-server")
    if not server_script:
        print("SKIP semantic: openviking-server tool is not installed")
        return
    shebang = Path(server_script).read_text(encoding="utf-8").splitlines()[0]
    interpreter = shlex.split(shebang[2:])[0] if shebang.startswith("#!") else ""
    if not interpreter or not Path(interpreter).is_file():
        print("SKIP semantic: cannot resolve OpenViking tool interpreter")
        return
    check_import = subprocess.run(
        [interpreter, "-c", "import llama_cpp"], capture_output=True, text=True,
        encoding="utf-8", errors="replace", env=_allowlisted_child_env(),
    )
    if check_import.returncode:
        print("SKIP semantic: llama-cpp-python is unavailable; install openviking[local-embed]")
        return

    username = "acc-semantic-" + uuid.uuid4().hex[:12]
    user_uri = f"viking://user/{username}"
    root_uri = f"{user_uri}/resources"
    docs = [
        "公司为新员工配置笔记本电脑、企业邮箱和办公账号，入职当天完成设备交付与权限开通。",
        "每周盘点仓库的咖啡豆、纸杯和清洁用品，低于安全库存就通知采购补货。",
    ]
    query = "新同事入职时，电脑和工作邮箱账号如何准备？"
    added = False
    try:
        for index, content in enumerate(docs):
            uri = f"{root_uri}/semantic-check-{index}.md"
            provider.put(uri, content, metadata={"connectivity_check": "semantic"})
            added = True
            reindex = provider._run([
                "reindex", uri, "--mode", "vectors_only", "--wait", "true", "--user", username,
            ])
            print(f"ADD_SEMANTIC uri={uri} reindex={json.dumps(reindex, ensure_ascii=False, sort_keys=True)}")
        response = provider._run([
            "find", query, "--uri", root_uri, "--read-content", "--user", username,
        ])
        results = _search_items(response)
        assert results, "semantic query returned no results"
        top1 = results[0]
        top_text = _text(top1)
        assert "笔记本电脑" in top_text and "企业邮箱" in top_text, (
            f"semantic top1 did not match expected memory: {top1!r}"
        )

        # find returns ranked resources rather than exposing its transient query vector.
        cache_dir = cache_dir.resolve()
        probe = (
            "import json; from openviking.models.embedder.local_embedders import "
            "LocalDenseEmbedder; m=LocalDenseEmbedder(model_name='bge-small-zh-v1.5-f16', "
            f"dimension=512, cache_dir={str(cache_dir)!r}); "
            "v=m.embed('检验本地中文向量维度').dense_vector; "
            "print(json.dumps({'dimension':len(v)})); m.close()"
        )
        probe_result = subprocess.run([interpreter, "-c", probe], capture_output=True,
                                      text=True, encoding="utf-8", errors="replace",
                                      env=_allowlisted_child_env(), check=True)
        vector_meta = json.loads(probe_result.stdout.strip().splitlines()[-1])
        dimension = vector_meta.get("dimension")
        assert dimension == 512, f"local model returned dimension={dimension!r}, expected 512"

        env = provider._env()
        forbidden = [key for key in env if key.startswith("OV_APIKEY") or key in {
            "OV_API_KEY", "OPENVIKING_API_KEY", "VIKINGBOT_API_KEY", "OPENVIKING_TOKEN",
        }]
        assert not forbidden, f"credential variables leaked to child environment: {forbidden}"
        config = json.loads(provider.cli_config_path.read_text(encoding="utf-8"))
        assert config == {"url": provider.base_url}, "semantic CLI config is not standalone/key-free"
        assert provider.cli_config_path.name.startswith("sam-ovcli")
        print(f"PASS semantic query: {query}")
        print(f"PASS top1 uri={top1.get('uri') or top1.get('path')} score={top1.get('score')} text={top_text}")
        print(f"PASS local embedding dimension={dimension}")
        print(f"PASS isolated child env and SAM CLI config: {provider.cli_config_path}")
    finally:
        if added:
            try:
                _delete_with_retry(provider, user_uri, recursive=True)
                print(f"PASS semantic cleanup: {user_uri}")
            except FileNotFoundError:
                print(f"PASS semantic cleanup: {user_uri} already absent")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--semantic", action="store_true",
                        help="also add/query real semantic memories and verify local vector dimension")
    args = parser.parse_args()
    root = os.environ.get("SAM_MEMORY_ROOT_URI", "").rstrip("/")
    if not root.startswith("viking://"):
        raise SystemExit("Set SAM_MEMORY_ROOT_URI to the intended SAM memory namespace (viking://...).")
    base_url = os.environ.get("SAM_OV_BASE_URL", "http://127.0.0.1:1933")
    if not base_url.startswith(("http://127.0.0.1:", "http://localhost:", "http://[::1]:")):
        raise SystemExit("Only a local loopback OpenViking endpoint is permitted.")

    # Unique acc-* scope makes cleanup narrowly bounded and auditable.
    company = "acc-connectivity-" + uuid.uuid4().hex[:12]
    scratch = f"{root}/__sam-connectivity-{uuid.uuid4().hex}"
    cli_config_value = Path(os.environ.get(
        "SAM_OVCLI_CONFIG", "harness-openclaw/state/sam-ovcli-connectivity.conf"
    ))
    isolated_cli_config = (cli_config_value if cli_config_value.is_absolute()
                           else PROJECT_ROOT / cli_config_value).resolve()
    provider = OpenVikingMemoryProvider(
        base_url=base_url, memory_root=scratch, cli_config_path=isolated_cli_config,
    )
    env = provider._env()
    forbidden = [key for key in env if key.startswith("OV_APIKEY") or key in {
        "OV_API_KEY", "OPENVIKING_API_KEY", "VIKINGBOT_API_KEY", "OPENVIKING_URL",
        "VIKINGBOT_ENDPOINT", "OPENVIKING_TOKEN",
    }]
    assert not forbidden, f"credential variables leaked to child environment: {forbidden}"
    cli_config = json.loads(isolated_cli_config.read_text(encoding="utf-8"))
    assert cli_config == {"url": base_url}, "SAM CLI config is not a standalone, key-free local config"
    assert isolated_cli_config.name.startswith("sam-ovcli")

    paths = {
        "2b cap_table": f"{scratch}/2b_facts/{company}/cap_table.json",
        "conversation thread index": f"{scratch}/conversations/thread_index.json",
    }
    payloads = {
        "2b cap_table": b'{"status":"verified","fact_key":"cap_table","shares":42}\n',
        "conversation thread index": b'[{"company_id":"acc-connectivity","thread_id":"thread-connectivity"}]\n',
    }
    succeeded: list[str] = []
    try:
        # Provider contract is text-oriented; UTF-8 encoded fixture bytes verify
        # exact disk content and exercise the real CLI/server without embedding.
        for label, uri in paths.items():
            original = payloads[label]
            provider.put(uri, original.decode("utf-8"), metadata={"connectivity_check": "true"})
            assert provider.read(uri).encode("utf-8") == original, f"byte roundtrip failed: {label}"
            parent = uri.rsplit("/", 1)[0]
            rows = provider.query(prefix=parent)
            assert any((item.get("uri") or item.get("path")) == uri for item in rows), f"not listed: {label}: {rows!r}"
            _delete_with_retry(provider, uri, recursive=False)
            try:
                provider.read(uri)
            except FileNotFoundError:
                pass
            else:
                raise AssertionError(f"deleted resource remained readable: {label}")
            succeeded.append(label)
            print(f"PASS {label}: write/read byte-identical/list/delete/not_found")
    finally:
        # Delete the unique company/scratch scopes even after a partial failure.
        # Files were created directly under several shapes, so remove only
        # specifically-created directories and tolerate already-removed files.
        for uri in (f"{scratch}/2b_facts/{company}",
                    f"{scratch}/conversations"):
            try:
                _delete_with_retry(provider, uri, recursive=True)
            except FileNotFoundError:
                continue
        # `rm` of the scratch root is permitted only after its known test children.
        try:
            _delete_with_retry(provider, scratch, recursive=True)
        except FileNotFoundError:
            pass
    print(f"PASS cleanup: {scratch}; paths={len(succeeded)}/{len(paths)}")
    print(f"PASS isolated child env and SAM CLI config: {isolated_cli_config}")
    if args.semantic:
        run_semantic(provider)
    return 0


if __name__ == "__main__":
    sys.exit(main())
