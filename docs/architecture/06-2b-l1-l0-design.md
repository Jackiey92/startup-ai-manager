# 2B L1 / L0 代码结构设计（饭团）

> 承接 `02-memory-system.md`。2A 已外置（阶段2），2B_L2 已在 OV（员工初筛事实）。
> 本文只定义 **2B_L1（承上启下）与 2B_L0（简略导览）** 的文件、职责、员工契约与接线。
> 最高约束：**业务判断全在员工，后端无死代码。**
> 责任归属（员工/经理统一凭证）独立成层并排在**下一阶段**，见 `07-accountability.md`；本阶段 L1/L0 **只预留 `attribution_id` 可空字段**，不实现签名账本。

日期：2026-10-10。请范范过目后派 CRIS。

---

## 一、OV 落位（同一公司根，分三级目录）

```
viking://resources/sam/2b/<company>/
    L2/   # 已存在：员工初筛后的逐条事实（现状 facts 表的 OV 投影 + 坐标）
    L1/
        brief.md            # 人读：跨文件聚合的公司事实简述（承上启下）
        brief.json          # 机读：结构化条目，每条预留 attribution_id（阶段4回填）+ 引用的 L2 fact_id
    L0/
        guide.md            # 人读：极简事实导览，直接进 LEADER 上下文
        guide.json          # 机读：导航条目（指向 L1），预留 attribution_id
```

- L1 / L0 **可重建**（删掉重跑，不动 L2、不动 2A）。
- 空态不写文件：没有 L2 事实就不生成，前端不出现毛坯。

---

## 二、新增 / 改动文件（名实相符）

### `app/memory/company_facts/`（本域）

| 文件 | 职责 | 性质 |
|---|---|---|
| `l1_brief.py` | **实现**：`L1BriefService` —— 读 L2 全部已验证事实，交**聚合员工**跨文件归并/提炼，产出 L1 `brief.md` + `brief.json`；每条预留 attribution_id、引用 L2 fact_id；幂等重建 | 编排，判断在员工 |
| `l0_guide.py` | **实现**：`L0GuideService` —— 输入**只能是 L1**，交**导览员工**压缩成给 LEADER 的极简导览 + L1 指针；预留 attribution_id；篇幅预算（token 上限）由护栏截断 | 编排，判断在员工 |
| `paths.py` | **填充**：L2/L1/L0 在 OV 的 URI 常量与拼接（无业务规则） | 纯路径 |
| `l2_fact_extractor.py` | **清理**：删除其中指标别名表 + 正则等死代码过滤；只保留**员工路径**真正需要的纯工具（如 period 解析若被员工路径使用）。不能删除的部分降名为 `_legacy` 并隔离，逐步清出 | 拆除死代码 |
| `__init__.py` | 导出 L1BriefService / L0GuideService / EmployeeAttribution | — |

### 员工运行层

| 文件 | 改动 |
|---|---|
| `app/employees/worker.py` | 本阶段**不改造签名捕获**（留待阶段4统一做）；仅在内部**透传** OpenClaw 的 `run_id/session_id` 到 L1/L0 产出的 `attribution_id` 预留位，能拿到就存、拿不到留空、不伪造 |
| 新 skill `skills/fact-brief/SKILL.md` | **聚合员工**技能：输入是某公司全部 L2 事实（已初筛、只含本公司），跨文件去重/归并/按主题提炼，输出结构化简述条目；不引入 L2 之外的新数字，数字必须来自 L2 并带 fact 引用 |
| 新 skill `skills/fact-guide/SKILL.md` | **导览员工**技能：把 L1 简述压缩成 LEADER 用的极简导览（预算内），只保留入口级结论 + L1 指针；不新增事实 |

> 技能只是方法与输出契约；**挑什么、并什么、压什么全由模型员工判断**。

### 接线

| 文件 | 改动 |
|---|---|
| `webapp/app.py` | ① parse worker 在 L2 事实提交成功后，触发 **L1 重建 → L0 重建**（异步、失败不拖垮上传，沿用 queue 模式）；② LEADER 常驻上下文 `ContextAssembler` 中，把 `memory_map` 来源替换/增补为读取 **2B_L0 guide**（阶段5 再并入 2C_L0） |
| `app/context_assembler.py` | L0 guide 作为常驻层之一；篇幅超预算时按护栏裁剪 |
| 看板（阶段5，不在本次） | 卡片改从 L1 注册，本次只准备好 L1 数据结构，不切换看板 |

---

## 三、员工流程（凭证链留待阶段4）

```
L2 事实（员工初筛产出）
      │  fact-brief 员工：跨文件聚合/提炼
      ▼
L1 brief.json（每条：结论 + 引用的 L2 fact_id 列表 + attribution_id 预留）
      │  fact-guide 员工：压缩 + 指针
      ▼
L0 guide（入口结论 + L1 指针 + attribution_id 预留）
      │
      ▼ 常驻 LEADER 上下文
```

- 任一员工给不出结果 → 不猜，L1/L0 保持上一版（或不生成）；阶段4起该卡点连同责任凭证记录。
- 数字在 L1/L0 不被换算/改写；必须能经引用的 fact_id 回查到 L2 与 2A 原件坐标。

---

## 四、验收

1. compileall + 全量 pytest 全绿（跑前停服）；新增：L0 只能源自 L1、L1 数字均可回查 L2（凭证相关测试归阶段4）。
2. 真机：上传 → L2 事实正常；L1/L0 由对应员工生成、内容真实无 L2 外新数字；删 L1/L0 可重建。
3. ContextAssembler 注入 L0 后，LEADER 问答正常，界面视觉零变化（空态仍精致）。
4. 测完即清（仅留“谷斗科技（上海）有限公司”）。
5. commit / push、重建 staging、部署 startupaimanager01.coze.site。

---

## 五、请确认

1. 同意新增 `fact-brief`、`fact-guide` 两个员工技能，分别承担 L1 聚合、L0 压缩。
2. 同意本阶段 L1/L0 **只预留 `attribution_id`**，责任归属统一在**阶段4（07 文档）**落地。
3. 同意本次做到 L1/L0 生成并把 L0 注入 LEADER；看板切换随阶段5。
