# SAM 记忆子系统 · 代码仓库文件结构设计（05）

> 本文件由饭团设计、范范确认后交 CRIS 实现。**CRIS 必须严格按本结构落地，不得自行命名 / 增删文件。**
> 设计依据：`docs/architecture/02-memory-system.md`。

## 一、设计原则

1. **按记忆域分包**：2A / 2B / 2C 三个域各自独立成目录，域内再按 L2/L1/L0 或职责分文件。看目录即知归属。
2. **名实相符，误导文件必须重命名**（范范铁律）：凡「名字写 L1、实际干 L2」的文件一律改名归位，禁止靠注释掩盖。
3. **存储归属在结构上隔离**：2A 只依赖「外置归档读写」，**不得 import OV / MemoryProvider**；2B、2C 只依赖 OV 端口。从 import 关系上物理保证 2A 不进 OV。
4. **共享能力下沉、不重复**：OV 端口、外置存储读写、员工（模型+skill）、schema 为跨域共享件。
5. 本设计**只重组记忆子系统**，dashboard / harness / entities / employees 等既有稳定模块保持原位、最小触动。

## 二、目标目录结构

```
app/
├── ports.py                         # 共享端口：OvStore（原 MemoryProvider，OV 读写）等
│
├── storage/                         # 【2A 专属】外置归档读写（纯文件系统，不 import OV）
│   ├── archive_paths.py             # 外置 2A 路径配置：bin/ab/<hash>、map/ab/<hash>.md
│   ├── archive_store.py             # 原件二进制：内容寻址、只追加不可变
│   └── mapping_store.py             # 映射 md：渲染 / 读取 / 校正，落外置 map
│
├── employees/                       # 【共享】员工：模型 + skill，负责业务判断（保持原位）
│   └── ...
│
└── memory/                          # 【记忆域】2A / 2B / 2C 统一收口
    ├── archive/                     # 2A 域服务（编排 storage；不触碰 OV）
    │   └── archive_service.py       # 文件柜：登记原件+映射、按哈希读取、供 2B_L2 取数
    │
    ├── company_facts/                # 2B 域（进 OV）
    │   ├── paths.py                 # 2B 在 OV 的 L2/L1/L0 路径常量（无业务规则）
    │   ├── l2_complete_facts.py     # 2B_L2：读 2A 映射，完整整理公司事实（原 facts/l1.py 改名归位）
    │   ├── l2_fact_extractor.py     # L2 逐条抽取（原 facts/extractor.py）
    │   ├── l2_fact_schema.py        # L2 事实记录 / Fact Voucher schema（原 facts/schema.py）
    │   ├── l2_fact_verifier.py      # L2 溯源核验（原 facts/verifier.py）
    │   ├── l2_cap_table.py          # 股权 / 期权 / Cap Table（原 facts/cap_table.py）
    │   ├── l2_consolidation.py      # L2 落库 / 冲突待办（原 facts/consolidation.py）
    │   ├── l2_derivation.py         # L2 派生计算（原 facts/derivation.py）
    │   ├── l1_brief.py              # 2B_L1：提取 L2 → 简述，映射到 L0，接收 2C_L1（新建，最核心）
    │   └── l0_guide.py              # 2B_L0：压缩为给 LEADER 的简略导览（新建）
    │
    └── user_memory/                 # 2C 域（进 OV）
        ├── paths.py                 # 2C 在 OV 的 L2/L1/L0 路径常量
        ├── l2_conversation.py       # 2C_L2：对话原文、事件溯源、折叠（原 conversation_store.py）
        ├── l1_memory_brief.py       # 2C_L1：对话记忆简述，沉淀进 2B_L1（由 runtime_memory 重构）
        └── l0_memory_guide.py       # 2C_L0：给 LEADER 的对话侧简略导览（新建）
```

### 顶层收口
- `app/knowledge.py`（读模型，供 /api/knowledge）：重构为只读编排，分别从 `memory/archive`、`memory/company_facts`、`memory/user_memory` 取数，聚合返回。它是**读服务**，不写记忆。
- 解析主链路 `webapp/app.py::_parse_job_worker`：
  - 删除「2A 映射上传 OV / OV 写 manifest / OV 生成摘要」全部步骤。
  - 改为：原件+映射 → `memory/archive`（外置）；员工整理 → `company_facts/l2_complete_facts`（进 OV）；L1/L0 由对应服务生成。

## 三、文件职责与迁移映射

### 2A（外置，不进 OV）
| 现有文件 | 目标文件 | 处置 |
|---|---|---|
| `app/storage/evidence_paths.py` | `app/storage/archive_paths.py` | 重命名（含 `DEFAULT_2A_ROOT` 等） |
| `app/storage/source_store.py` | `app/storage/archive_store.py` | 重命名，原件读写 |
| `app/source_map.py` | `app/storage/mapping_store.py` | 迁移，映射渲染/读写/校正 |
| `app/memory/extraction.py` | `app/memory/archive/archive_service.py` | **重构**：删掉所有 OV 写入（ingest 的 put、abstract/overview/L0/L1、sidecar），只保留外置原件+映射编排 |
| `app/memory/visual_extraction.py` | — | **删除**（OV 生成 2A 摘要的错误逻辑） |

### 2B（进 OV）
| 现有文件 | 目标文件 | 处置 |
|---|---|---|
| `app/facts/l1.py`（名不副实） | `app/memory/company_facts/l2_complete_facts.py` | **重命名**，类 `FactExtractionService` → `L2CompleteFactService` |
| `app/facts/extractor.py` | `company_facts/l2_fact_extractor.py` | 迁移 |
| `app/facts/schema.py` | `company_facts/l2_fact_schema.py` | 迁移 |
| `app/facts/verifier.py` | `company_facts/l2_fact_verifier.py` | 迁移 |
| `app/facts/cap_table.py` | `company_facts/l2_cap_table.py` | 迁移 |
| `app/facts/consolidation.py` | `company_facts/l2_consolidation.py` | 迁移 |
| `app/facts/derivation.py` | `company_facts/l2_derivation.py` | 迁移 |
| —（无） | `company_facts/l1_brief.py` | **新建**（2B_L1 核心中转） |
| —（无） | `company_facts/l0_guide.py` | **新建**（2B_L0 简略导览） |

### 2C（进 OV）
| 现有文件 | 目标文件 | 处置 |
|---|---|---|
| `app/conversation_store.py` | `app/memory/user_memory/l2_conversation.py` | 迁移 |
| `app/runtime_memory.py` | `app/memory/user_memory/l1_memory_brief.py` | **重构归位**：工作记忆 + 记忆简述，沉淀 2B_L1 |
| —（无） | `app/memory/user_memory/l0_memory_guide.py` | **新建** |
| `app/memory_map.py` | `company_facts/l0_guide.py` + `user_memory/l0_memory_guide.py` | **拆分吸收后删除**：地图/导航是 L0 职责，不再单设 map store |
| `app/context_assembler.py` | （保留，或移入 memory/） | 仅负责给 LEADER 组装常驻上下文（含 2B/2C 的 L0），实现时再定 |

> 注：`memory_map.py` 当前混合了 2B/2C 的导航元数据，归位时把对应部分并进两条 L0，避免再有第三个「地图」概念。

## 四、存储落点（物理隔离的硬保证）

| 数据 | 落点 | 由谁写 |
|---|---|---|
| 2A 原件 | 外置 `data/2a/bin/ab/<hash>` | `storage/archive_store.py` |
| 2A 映射 md | 外置 `data/2a/map/ab/<hash>.md` | `storage/mapping_store.py` |
| 2B L2 / L1 / L0 | OV：`…/2b/<company>/L2| L1| L0/…` | `memory/company_facts/*` |
| 2C L2 / L1 / L0 | OV：`…/2c/<company>/L2| L1| L0/…` | `memory/user_memory/*` |

- CI / 测试加一条护栏：**grep 全仓，`app/storage` 与 `app/memory/archive` 下不得出现 `import` OV / MemoryProvider / add_resource / put 到 viking 路径**。用 import 边界把「2A 不进 OV」钉死。

## 五、分阶段落地（每阶段停下验收）

- **阶段 1（纯搬结构，最小风险）**：按上表移动 / 重命名 / 建空文件，全部 import 与调用点改通；**不改任何业务逻辑**。要求：全量测试全绿、真机视觉零变化。
- **阶段 2（切断 2A→OV）**：删除 `add_parsed_resource`、OV manifest、`generate_sidecars` 等；2A 只走外置；清理 OV 中已存在的 2A 路径与摘要文件（单独迁移/清理脚本，先 dry-run）。测试 + 真机确认。
- **阶段 3（2B L1/L0）**：L2 已在 OV（员工初筛）；新建 **L1 简述（承上启下）** 与 **L0 简略导览喂 LEADER**，预留 attribution_id。详见 `06-2b-l1-l0-design.md`。
- **阶段 4（责任归属层）**：员工 + 经理统一行动凭证、外置 append-only 账本、可回放。详见 `07-accountability.md`。
- **阶段 5（2C 及汇入）**：2C_L1 沉淀进 2B_L1；看板卡片从 2B_L1 注册（携带 attribution_id）。

## 六、待范范确认的点

1. 是否同意 `app/memory/{archive,company_facts,user_memory}` 这一顶层划分与命名（中文域 → 英文目录名）。
2. 是否同意 `memory_map.py` 拆分进两条 L0、不再单设地图模块。
3. 是否按「阶段 1 纯搬结构」起步（搬完即验收，确保不破坏现有功能）。
