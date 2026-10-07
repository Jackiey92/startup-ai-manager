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

## 2a 图文 L0/L1 抽取

SAM 保留现有 Markdown 导入；等待 OV 导入完成后，使用现有
`OpenAICompatibleProvider` 做图文 JSON 抽取并通过 MemoryProvider 写入 SAM 自有路径：
`<root>/2a_extraction/<company>/<source>/L0/abstract.md` 与
`<root>/2a_extraction/<company>/<source>/L1/overview.md`。L2 manifest 的 `ov_sidecar_uris` 只存坐标，
不复制摘要正文。OV 的 Markdown summary 接缝只传文本，不能携带 SAM 保留的
PDF 页图，所以不能仅修改 OV 的 `vlm` 配置满足本流程的视觉要求。

抽取默认 `qwen3.8-flash`，端点与 key 使用 RuntimeConfig 的
`SAM_LEADER_MODEL_BASE_URL` / `SAM_LEADER_MODEL_API_KEY`，显式
`SAM_LEADER_MODEL` 可覆盖。不会修改 leader 的默认模型，也不读取 OV 私人凭证。
PDF/图片由现有 PyMuPDF 渲染为 PNG data URI，每批最多 4 页（长边最多 1600 像素），
多批结果再文本归并；Word/文本不发图。超过 200 页或解析文本超过 200000 字符明确报错，
不静默截断。图片与 base64 不落库。抽取失败沿用导入 deferred 状态并显示错误，不能算验收成功。

先启动本地 OV、显式注入产品记忆根与 Token Plan key 后执行（不进入 pytest）：

```bash
SAM_MEMORY_ROOT_URI='viking://resources/sam-vlm-acceptance' \
  .venv/bin/python scripts/connectivity_check_vlm.py
# 可选：同样验证一页 PDF 图像输入
SAM_MEMORY_ROOT_URI='viking://resources/sam-vlm-acceptance' \
  .venv/bin/python scripts/connectivity_check_vlm.py --image
```

脚本不自动读 key 文件、不打印 key；使用唯一 `acc-vlm-*` scope，finally 删除本轮
scope，并在临时目录清理无密钥 CLI 配置。输出模型/端点、真实 L0/L1 正文、可达 URI
和清理结果。它验证模型到 sidecar 的通路，不代替上传解析/实体/财务全流程验收。
OV 的保留 `.abstract.md` / `.overview.md` 属于 OV 自动产物；SAM 不写、不读、不依赖。
OV reindex 与 SAM 产出互不干扰。读取方只消费 manifest 的准确坐标，不回落旧路径。

读取链路审计：webapp 将 ExtractionRecord 坐标写入 staging；business_overview
通过 ov_navigation 按 manifest 坐标读 SAM L0/L1，无 OV 保留路径回落。
memory_map 仍导航到 L2/mapping.md，context_assembler 消费地图/通用 URI，
两者没有 OV 保留 sidecar 路径假设。旧 manifest 若只有 OV 保留坐标，将不展示
导航正文，需重新抽取；不自动迁移或读取 OV 的正文。
