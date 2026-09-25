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
- `/api/upload`：原型上传入口（存内容寻址 blob，xlsx 走 OpenClaw 解析）。
- `/api/chat`：原型对话入口。
- `/`、`/files/<id>`：已导入文件列表与结构化详情。

## AI 导入引导（Token Plan）

导入弹窗通过 `/api/import-guide` 调用阿里云百炼 Token Plan。默认使用：

- Base URL：`https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1`
- 模型：`auto`（由 Token Plan 自动选择可用模型）

仅在运行环境注入 `SAM_GUIDE_MODEL_API_KEY` 后才会调用模型；密钥不得写入
仓库、`.coze` 或日志。可选环境变量 `SAM_GUIDE_MODEL_BASE_URL` 与
`SAM_GUIDE_MODEL` 用于已授权的兼容端点/模型切换。

默认 bwrap 运行使用 `--unshare-net`。只有经明确授权的模型调用验收才使用：

```bash
SAM_GUIDE_MODEL_API_KEY="$(< ~/.bl_tokenplan_key)" \
  ./tools/run-sam-isolated.sh --allow-model-network
```

该链路只使用上述 Token Plan 端点与默认模型，避免误走按量付费通道。

## 文件

- `app.py`：路由与启动入口。
- `classify.py`：规则式浅度归类。
- `sales_parser.py`：销售文件解析辅助。
- `markdown_render.py`：结构化结果渲染（表格外包一层容器解决超宽）。
- `templates/`：列表与详情页。
