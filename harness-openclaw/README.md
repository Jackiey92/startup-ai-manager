# harness-openclaw

隔离的 OpenClaw 工作区，是产品 Harness 底座的本地实现。`app/harness/runtime/openclaw_adapter.py` 通过一层薄适配器驱动这里的技能，接口可替换，应用本身不与 OpenClaw 硬耦合。

## 目录

- `inbox/`：每个待解析文件的任务 JSON（运行时生成，不入库）。
- `outbox/`：技能产出的 `ParseResult` JSON，仅为 staging 数据（运行时生成，不入库）。
- `scripts/parse_bridge.py`：技能桥接脚本，调用项目内 `app/parsing` 解析器。
- `workspace/skills/parse-xlsx/`：Excel 解析技能定义。
- `state/openclaw.example.json`：OpenClaw 配置模板；复制为 `state/openclaw.json` 并填入本地路径与 `ARK_API_KEY`。
- `cache/`、`state/` 下的运行时数据不入库。

## 准备

1. 安装 Node ≥ 24.16 与 OpenClaw 2026.9.5（使用 `--ignore-scripts`）。
2. 复制配置模板：`state/openclaw.example.json` → `state/openclaw.json`，替换其中的绝对路径占位符。
3. 通过环境变量 `ARK_API_KEY` 提供方舟密钥（不要写进配置或提交）。
4. 如运行时不在默认位置，用 `NODE_DIR`、`OC_MJS`、`GIT_DIR` 环境变量覆盖。

## 安全基线

- 技能输出只进 `outbox/`（staging-only），不直接写事实。
- 事实写入经事务网关与 FactVoucher 校验，区分 verified / claimed / inferred。
- 密钥由环境变量/网关代持，模型与工作区不接触真实凭证。