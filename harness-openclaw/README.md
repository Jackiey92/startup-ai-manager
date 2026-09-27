# harness-openclaw

隔离的 OpenClaw 工作区，是产品 Harness 底座的本地实现。`app/harness/runtime/openclaw_adapter.py` 通过一层薄适配器驱动这里的技能，接口可替换，应用本身不与 OpenClaw 硬耦合。

## 目录

- `inbox/`：每个待解析文件的任务 JSON（运行时生成，不入库）。
- `outbox/`：技能产出的 `ParseResult` JSON，仅为 staging 数据（运行时生成，不入库）。
- `../skills/document-ingest/`：统一文档导入技能，负责 MinerU/Docling 解析与 L2 staging 输出。
- `state/openclaw.example.json`：OpenClaw 配置模板；复制为 `state/openclaw.json`，路径和模型端点由 profile/环境变量注入。
- `plugins/sam-memory/`：`registerTool` 薄壳；Python bridge 通过 `SAM_TOOL_BRIDGE_PYTHON`/`SAM_PROJECT_ROOT` 注入，作用域由 `SAM_COMPANY_ID`、`SAM_THREAD_ID` 注入。
- `cache/`、`state/` 下的运行时数据不入库。

解析边界：`OpenClawAdapter.run_parse` 对 `document-ingest` 直接调用
`skills/document-ingest/scripts/bridge`，这是本地确定性步骤，不要求主 Agent
拥有 exec 或路径读写权限；解析完成后才由 `sam-guide` 基于 L2 证据生成指引。
每次启动 Agent 前，适配器会把 `SAM_SKILL_ROOT` 注入 OpenClaw 的
`skills.load.extraDirs`，确保仓库自有 Skill 被发现。

## 可移植配置

运行时路径不再要求 Windows 绝对路径。可通过环境变量切换本机、WSL 或隔离环境：

- `SAM_PROJECT_ROOT`：项目根目录
- `SAM_HARNESS_ROOT`：Harness 根目录
- `SAM_VENV_BIN`：虚拟环境 `bin` 目录
- `SAM_NODE_BIN`：Node 可执行文件（默认 `node`）
- `SAM_OPENCLAW_ENTRY`：`openclaw.mjs` 路径
- `SAM_OPENCLAW_STATE_DIR` / `SAM_OPENCLAW_CONFIG`：状态与配置路径
- `SAM_SKILL_MAP`：格式到 Skill 名称的 JSON 映射，默认由 `document-ingest` 接管。
- `SAM_DATA_ROOT` / `SAM_OBJECTS_DIR` / `SAM_MAIN_DB` / `SAM_APP_DB`：数据、对象和 SQLite 路径
- `SAM_MEMORY_ROOT`：local MemoryProvider 的持久化根目录
- `SAM_TOOL_PLUGIN_DIR`：OpenClaw 插件目录（指向 `harness-openclaw/plugins/sam-memory`）
- `SAM_TOOL_BRIDGE_PYTHON`：bridge 使用的 Python 可执行文件；未设置时使用 `SAM_VENV_PYTHON` 或 `python3`
- `SAM_TOOL_BRIDGE_TIMEOUT_MS`：单次工具 bridge 超时，默认 15000ms
- `SAM_COMPANY_ID` / `SAM_THREAD_ID`：由服务端/会话注入的工具作用域，工具参数不得覆盖
- `SAM_ALLOW_PROMOTE=1`：显式启用写入型 `sam_promote`；默认关闭

9.6 及以上应把插件做成安装包而不是把裸目录放进 `plugins.load.paths`：

```bash
openclaw plugins build harness-openclaw/plugins/sam-memory
openclaw plugins install <build-output>
```

安装后由 OpenClaw 维护安装台账；`openclaw.plugin.json` 的
`contracts.tools` 必须与插件注册列表一致。仓库只提交包源文件，不提交运行时台账或密钥。

仓库根目录的 `sam-manifest.yaml` 与 `profiles/local.yaml`、`profiles/cloud.yaml` 记录运行时、Skill、记忆底座和模型端点的声明；密钥只通过环境变量注入。通过 `SAM_PROFILE=local|cloud` 选择路径配置。

## 准备

1. 安装 Node ≥ 24.16 与 OpenClaw 2026.9.5（使用 `--ignore-scripts`）。
2. 复制配置模板：`state/openclaw.example.json` → `state/openclaw.json`，替换其中的绝对路径占位符。
3. 通过 profile 声明的模型密钥环境变量提供凭证（不要写进配置或提交）。
4. 不要使用旧的 `NODE_DIR`、`OC_MJS`、`GIT_DIR` 路径变量；运行时统一读取 `RuntimeConfig` 和 `SAM_*` 覆盖项。

## 安全基线

- 技能输出只进 `outbox/`（staging-only），不直接写事实。
- 事实写入经事务网关与 FactVoucher 校验，区分 verified / claimed / inferred。
- 密钥由环境变量/网关代持，模型与工作区不接触真实凭证。
## Runtime startup

`scripts/run.sh` and `tools/run-sam-isolated.sh` prepare a clean OpenClaw
state before serving: the repository `sam-memory` plugin is mounted into
`$OPENCLAW_STATE_DIR/extensions/sam-memory`, and the generated config enables
the seven read-only `sam_*` tools. This removes the need for a manual symlink
in a fresh state. Gateway mode is the default; the Flask-owned adapter starts
one loopback Gateway on the first Agent call and reuses it for later calls.
Set `SAM_OPENCLAW_MODE=local` only for a one-shot diagnostic run.
