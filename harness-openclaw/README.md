# harness-openclaw

隔离的 OpenClaw 工作区，是产品 Harness 底座的本地实现。`app/harness/runtime/openclaw_adapter.py` 通过一层薄适配器驱动这里的技能，接口可替换，应用本身不与 OpenClaw 硬耦合。

## 目录

- `inbox/`：每个待解析文件的任务 JSON（运行时生成，不入库）。
- `outbox/`：技能产出的 `ParseResult` JSON，仅为 staging 数据（运行时生成，不入库）。
- `scripts/parse_bridge.py`：技能桥接脚本，调用项目内 `app/parsing` 解析器。
- `workspace/skills/parse-xlsx/`：Excel 解析技能定义。
- `state/openclaw.example.json`：OpenClaw 配置模板；复制为 `state/openclaw.json`，路径和模型端点由 profile/环境变量注入。
- `cache/`、`state/` 下的运行时数据不入库。

## 可移植配置

运行时路径不再要求 Windows 绝对路径。可通过环境变量切换本机、WSL 或隔离环境：

- `SAM_PROJECT_ROOT`：项目根目录
- `SAM_HARNESS_ROOT`：Harness 根目录
- `SAM_VENV_BIN`：虚拟环境 `bin` 目录
- `SAM_NODE_BIN`：Node 可执行文件（默认 `node`）
- `SAM_OPENCLAW_ENTRY`：`openclaw.mjs` 路径
- `SAM_OPENCLAW_STATE_DIR` / `SAM_OPENCLAW_CONFIG`：状态与配置路径
- `SAM_SKILL_MAP`：格式到 Skill 名称的 JSON 映射，例如 `{"xlsx":"parse-xlsx"}`
- `SAM_DATA_ROOT` / `SAM_OBJECTS_DIR` / `SAM_MAIN_DB` / `SAM_APP_DB`：数据、对象和 SQLite 路径
- `SAM_MEMORY_ROOT`：local MemoryProvider 的持久化根目录

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
