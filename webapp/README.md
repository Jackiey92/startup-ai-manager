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

运行前按 `harness-openclaw/README.md` 准备 OpenClaw 工作区与 `ARK_API_KEY`。

## 文件

- `app.py`：路由与启动入口。
- `classify.py`：规则式浅度归类。
- `sales_parser.py`：销售文件解析辅助。
- `markdown_render.py`：结构化结果渲染（表格外包一层容器解决超宽）。
- `templates/`：列表与详情页。