# Local OpenViking service

SAM uses OpenViking as an independent loopback service. The repository-owned
launcher never reads ~/.openviking, does not configure remote URLs or keys,
and stores server state under harness-openclaw/state/ov-data/ (ignored local
runtime state). This is the authoritative SAM data directory; the former
/home/jakki/sam-ov-data/ tree is retained untouched as a legacy archive, not
used or deleted automatically. Do not run two servers against one workspace.

## 2026-10-08 local semantic embedding

The existing server on 127.0.0.1:1933 is a protected, persistent instance.
Do not stop/restart it, alter its workspace, or remove any lock as part of
semantic setup. scripts/local-ov config continues to generate the existing
file-only ov.conf. scripts/local-ov semantic-config writes a separate
ov.semantic.conf with the same workspace and local embedding settings for a
future controlled restart; it does not affect a running process.

The local model is OpenViking's built-in GGUF model bge-small-zh-v1.5-f16
(512 dimensions). The first semantic use downloads
bge-small-zh-v1.5-f16.gguf (47,886,240 bytes in the verified local cache).
cache_dir defaults to harness-openclaw/state/ov-data/models/, under the
ignored repository state directory. Set SAM_OV_MODEL_CACHE_DIR to override
it. The generated runtime config may contain its resolved local cache path;
business source code contains neither model weights nor machine-specific
absolute paths.

Install/check the optional local backend with the existing OpenViking 0.4.23
tool interpreter (do not use python -m pip):

~~~sh
/home/jakki/.local/bin/uv pip install \
  --python /home/jakki/.local/share/uv/tools/openviking/bin/python \
  'openviking[local-embed]==0.4.23'
~~~

The extra requires llama-cpp-python; the existing 0.4.23 environment already
had that dependency, so uv reported Checked 1 package and made no package
changes. The real GGUF download was 47,886,240 bytes (45.64 MiB). Do not add
Ollama or use remote embedding credentials.

~~~sh
scripts/local-ov config   # materialize local ov.conf
scripts/local-ov start    # launch in background and wait for /health
scripts/local-ov health
scripts/local-ov stop     # stops only the PID recorded by this launcher
~~~

Override SAM_OPENVIKING_STATE_DIR, SAM_OV_HOST, SAM_OV_PORT,
SAM_OV_MODEL_CACHE_DIR, or OPENVIKING_SERVER_BIN for a separate local
instance. The default host is 127.0.0.1, port 1933. The server launcher
removes OV API-key variables from the child environment.

To run the real-server, file-only end-to-end check, first start the service,
then provide an isolated SAM root URI:

~~~sh
SAM_MEMORY_ROOT_URI=viking://user/acc-local-check python3 scripts/connectivity_check_local.py
~~~

This uses the real ov CLI through OpenVikingMemoryProvider; it is not a pytest
mock. The generated unique acc-* check scope is cleaned on exit. Normal
pytest does not run this check. Provider file writes do not require semantic
models.

To verify actual local semantic indexing/retrieval, start a temporary
instance with a distinct state directory and port (never reuse the 1933
workspace). The semantic-config file is generated independently; this batch
used an isolated configuration and temporary 1934 instance because the live
1933 server must not be restarted.

~~~sh
SAM_OPENVIKING_STATE_DIR=/tmp/sam-ov-semantic \
SAM_OV_HOST=127.0.0.1 SAM_OV_PORT=1934 \
scripts/local-ov semantic-start

SAM_OV_SEMANTIC_CONFIG_FILE=/tmp/sam-ov-semantic/ov.semantic.conf \
SAM_MEMORY_ROOT_URI=viking://user/acc-semantic-check \
SAM_OV_BASE_URL=http://127.0.0.1:1934 \
SAM_OVCLI_CONFIG=harness-openclaw/state/sam-ovcli-semantic.conf \
python3 scripts/connectivity_check_local.py --semantic

SAM_OPENVIKING_STATE_DIR=/tmp/sam-ov-semantic \
SAM_OV_HOST=127.0.0.1 SAM_OV_PORT=1934 \
scripts/local-ov stop
~~~

The semantic check writes two distinguishable Chinese resource memories,
reindexes them with vectors_only, issues a semantic query, checks that the
expected text ranks first, and runs the local GGUF embedder directly to assert
a real 512-element vector. It uses a unique acc-* user scope and deletes that
scope on exit. The CLI configuration is a key-free, SAM-specific file and the
provider's child environment is allowlisted (no OV_APIKEY*).

### VLM for memory extraction: Token Plan qwen3.8-flash

Per product decision, the 2a memory-extraction VLM is not a local model:
use `qwen3.8-flash` through the existing Token Plan OpenAI-compatible route
(`https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1`,
credential from `SAM_LEADER_MODEL_API_KEY` / `~/.bl_tokenplan_key`). Verified
2026-10-08: the model accepts `image_url` multimodal input and correctly read
a test image; usage includes image_tokens. Do not install Ollama or download
local VLMs; the earlier qwen2.5vl:3b local plan is superseded.
