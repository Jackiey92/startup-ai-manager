# 主仓云端只读主页

这是主仓 Flask 的只读装配，不是另一个知识库站点。`/` 与 `/prototype`
使用与本地一致的原型壳，经 Flask 注入 readonly 配置；接管与板块数据约定
见 [home-shell.md](home-shell.md)，未接线板块仍保留演示数据。
旧页面导航、路由和样式沿用 `base.html`；云端旧页面显示快照（不复制本地业务
推导规则、不重新生成卡片、不调用模型）。旧页面不是本地的逐像素镜像：
本地已装配的 overview/dashboard 和其他字段按原样展示，新增字段也可见。
资料导入页仅显示本地任务快照；对话页仅显示已同步历史。

## 启动与部署

```bash
python3 -m pip install -r requirements-cloud.txt
# 通过平台 secret 注入 SAM_CLOUD_INGEST_KEY / SAM_VIEW_PASS，勿写进 .coze
export SAM_DATA_ROOT=/tmp/sam-cloud-home
export SAM_COMPANY_ID=acc-demo
export SAM_VIEW_USER=sam
bash scripts/cloud_run.sh
```

- `SAM_CLOUD_READONLY=1`：由启动脚本设置，跳过记忆根/Node24 强校验，
  自动使用 NullMemoryProvider，不建 MAIN_DB、不装配队列/解析 worker。
  所有记忆写方法抛 `ReadOnlyMemoryError`，不落盘、不访问 OV/网络。
- `SAM_DATA_ROOT`：默认系统临时目录下 `sam-cloud-home`（一般是
  `/tmp/sam-cloud-home`）。只存 `cloud-snapshot.db`；可指向平台持久可写卷。
  objects/main_db/app_db 的默认路径也在这里，但云端不读取或初始化业务库。
- `SAM_CLOUD_INGEST_KEY`：必需的收数 secret，无默认钥匙；缺失时收数 503。
- `SAM_VIEW_USER`、`SAM_VIEW_PASS`：沿用现有 Basic Auth，全站（包括读 API、
  静态资源）鉴权；任一为空/漏配时拒绝访问。**两者均未设置会保持开发用
  无鉴权模式，上线必须两者都设；不能把业务快照放到公开无鉴权窗口。**
- `SAM_COMPANY_ID`：建议云端、本地同值。云端设定后拒收其他 company_id；
  页面不接受 URL/body 指定公司，只读已认证推入的当前快照。
  云端未设时由收数钥匙持有人替换整个实例的当前公司快照，不提供多租户查询。
- `PORT`：默认 5000，沿用现有 Flask 端口逻辑；`HOST` 默认 0.0.0.0。
- `SAM_CLOUD_PYTHON`：可选启动解释器。默认选仓库 `.venv/bin/python`（若存在），
  否则平台 python3。无需 Node24、OpenClaw Gateway、OV 或模型凭证。
- `SAM_CLOUD_URL`：本地推送的云端服务根 URL。

`.coze` **没有修改**。饭团部署时只需调整命令，不变更任何 project_id/app_id：

```toml
[deploy]
build = ["python3", "-m", "pip", "install", "-r", "requirements-cloud.txt"]
run = ["bash", "scripts/cloud_run.sh"]
```

平台实例数必须锁为 **max_instance=1**；不要让不同实例各持一份快照。
临时盘在重启/重部署后可能丢失，届时页面回到“暂无同步数据”，需重新推送；
需要跨重启保留时挂持久卷。平台反代必须启用 HTTPS（保护 Basic Auth 和收数
钥匙），接收上限至少 32 MiB，并按平台生产运行规范管理 Flask 进程。

## 快照协议 v1

```json
{
  "version": 1,
  "company_id": "acc-demo",
  "pushed_at": 1791500000.0,
  "payload": {
    "page_context": {
      "facts": [], "todos": [], "files": [],
      "module_counts": {}, "module_labels": {}
    },
    "knowledge": {
      "evidence": {"files": []},
      "facts": {"groups": [], "cap_table": {}},
      "working_memory": {"items": [], "warnings": []}
    },
    "overview": {}, "dashboard": {}, "dashboard_preferences": [],
    "entities": [], "jobs": [], "conversations": []
  }
}
```

`page_context` 对应原 `_page_context` 的数据；todos 包含已存的全部状态。
knowledge 是 `KnowledgeService.read()` 的完整产物，evidence.files 中已包含
L0/L1/L2 文本与坐标，不需远程读取原始对象文件。
conversations 是当前公司已有 thread 元数据加 `turns` 原文数组。
只校验协议信封（版本、非空公司、有限 Unix 时间戳、payload 对象），不校验
业务字段/含义；字段缺失显示空态，未知字段保留并在完整快照折叠区显示。
整个请求上限 32 MiB，JSON 嵌套深度上限 32；NaN/Infinity 拒绝。
SQLite 单行事务整体替换，绝不合并旧字段；同实例最后提交的快照生效。

## 接口

- `POST /ingest`：`Content-Type: application/json`，`X-Ingest-Key` 独立认证。
  成功 200 `{"ok":true}`；错误 JSON/版本/公司 400；错误钥匙 401；超限 413；
  缺收数配置或存储故障 503。异常请求不改变旧快照。
- `/`、`/prototype`：接管后的精致原型壳，默认 overview，写入口提示回本地。
- `/bizov`、`/overview`、`/todos`、`/facts`、`/knowledge`、
  `/files`、`/chat`、`/inbox`：完整同站导航，只读字段展示，无写入表单。
- `/knowledge/sources/<hash>`、`/files/<hash>`：仅从当前快照定位原文。
  未同步/未知哈希给 200 清晰空态，不查本地对象目录。
- 原有 GET API：bizov/business-overview、dashboard/preferences、knowledge、
  facts、todos、files/classifications、entity-roster、parse-jobs 走快照。
  查询参数不切换公司，也不在云端重算业务状态/筛选结果。
- `GET /api/chat/history`：返回 `company_id` 与快照 conversations。
- `GET /healthz`：公开健康检查，无业务内容。
- 除 ingest 外所有 POST/PUT/PATCH/DELETE 统一 403：
  `{"error":"cloud_readonly","message":"云端为只读演示窗口，请在本地操作"}`。
  OPTIONS 204；未装配的新 GET 路由拒绝 404，不落回本地服务。
- 业务响应 `Cache-Control: no-store`、`Referrer-Policy: no-referrer`，不开放跨域。

## 本地推送

正常本地 RuntimeConfig、真实数据库/对象目录/记忆后端需已就绪：

```bash
unset SAM_CLOUD_READONLY
export SAM_COMPANY_ID=acc-demo
export SAM_MEMORY_ROOT_URI='<本地 SAM 已验收根 URI>'
export SAM_CLOUD_URL='https://<主仓云端域名>'
# 通过安全环境注入 SAM_CLOUD_INGEST_KEY，不在命令里写实际钥匙
.venv/bin/python scripts/sam_knowledge_push.py --homepage
```

`--homepage` 只允许宿主 SAM_COMPANY_ID，不允许调用方覆盖其他公司。
脚本调用现有读服务，不启动 Flask/队列，不新加任何模型业务判定逻辑，
不上传原始二进制文件，不跟随 HTTP 重定向，不自动重试，错误输出脱敏钥匙。
快照各读服务不共享跨 OV/SQLite 事务；本地仍在变化时可再次手动同步。
大于上限时在发送前失败，不截断原文。
不带 `--homepage` 时保留原知识云推送协议与变量，不影响既有独立项目。

## 验收与清理

测试只用 tmp_path / acc-* 假公司，HTTP smoke 仅绑定本机 loopback，结束终止
子进程。测试不连云端、不连实际 OV、不写真实公司数据。
真机验收后删除云端本轮 acc-* 快照（停实例后删除运行目录内
`cloud-snapshot.db`；勿删真实快照），再推送获准展示的真实范围。
普通 pytest 通过不等于云端部署或范范真机验收通过。
