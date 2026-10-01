# webapp

Flask 后端单体：承接原型的真实上传与对话，串起「存储 → 归类 → OpenClaw 解析 → staging → 查看」链路。

## 运行

```powershell
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python webapp\app.py
```

服务起在 `http://127.0.0.1:5000`：

- `/prototype`：提供 `prototype/startup-ai-manager.html`。
- `/api/upload`：原型上传入口（存内容寻址 blob，统一走 `document-ingest` staging）。
- `/api/chat`：原型对话入口。
- `/`、`/files/<id>`：已导入文件列表与结构化详情。

## AI 导入引导（OpenClaw 主 Agent）

`/api/upload` 与 `/api/import-guide` 的导入建议统一通过 OpenClaw 的
`sam-leader`（显示名 SAM Leader）主 Agent 编排；Python 网页层不再直连模型端点。主 Agent 会读取
当前公司作用域内的解析证据与 L2 URI，并以结构化 JSON 返回引导结果。模型端点、
模型名和密钥由 `sam-manifest.yaml`/profile 与运行环境注入，密钥不得写入仓库、
`.coze` 或日志。

开发期如需 Token Plan 验收，由 OpenClaw 运行环境注入
`SAM_LEADER_MODEL_API_KEY` 并显式放行模型网络；网页应用本身不读取该密钥。

`scripts/run.sh` 和 `tools/run-sam-isolated.sh` 会注入非敏感的 Token Plan
默认路由（`SAM_LEADER_MODEL_BASE_URL`、`SAM_LEADER_MODEL=qwen3.8-max`）；密钥仍必须
由启动环境提供。运行时会把 `models.providers.token-plan` 和
`token-plan/${SAM_LEADER_MODEL}` 主模型补入缺少它们的旧 OpenClaw 状态文件。

上传接口只等待本地解析和 2a 落库，成功后返回 `guide_status=queued`；导入指引在
每公司单飞后台任务中生成。`/api/import-guide` 会复用正在生成的结果：完成时返回
`guide_status=ready`，等待超时返回可轮询的 `guide_status=generating`（HTTP 202），
避免上传或并发刷新互相启动多个 Agent；随后可读
`GET /api/import-guide/status?company_id=...`，直到终态 `ready` 或带脱敏 `reason` 的
`failed`。后台生成预算默认 180 秒（下限 150 秒），不以缩短超时伪造性能。Gateway 输出
不是单一 JSON 信封、超时或鉴权失败时，诊断仅保存在本地
`data/guide-diagnostics/`（权限 0600，凭证会脱敏），不会返回浏览器。

默认 bwrap 运行使用 `--unshare-net`。只有经明确授权的模型调用验收才使用：

```bash
SAM_LEADER_MODEL_API_KEY="$(< ~/.bl_tokenplan_key)" \
  ./tools/run-sam-isolated.sh --allow-model-network
```

## 文件

- `app.py`：路由与启动入口。
- `classify.py`：规则式浅度归类。
- `../skills/document-ingest/`：统一文档解析技能（MinerU 主引擎、Docling 备选）。
- `markdown_render.py`：结构化结果渲染（表格外包一层容器解决超宽）。
- `templates/`：列表与详情页。
