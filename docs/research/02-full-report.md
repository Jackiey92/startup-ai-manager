# 面向初创公司经营场景的「垂类 AI Harness」竞品调研

> 调研日期：2026-09-23 | 调研范围：2025-03 至 2026-09（重点近 12-18 个月）
> 调研对象：GitHub 开源项目、海外创业公司/融资、国内市场（大厂+创业团队）

---

## 一、核心结论

**"面向初创公司经营/ERP/财务/股权/后台职能的垂类 AI Harness"这个品类，在全球范围内尚未出现同名且同构的产品。用户定义的空象限——"Agent 主动执行 + 持久公司专属结构化模型"——没有被任何单一产品完整占据。**

最接近的候选者可分为三类：
1. **财务垂类 harness**：Rillet（$1B 估值）是唯一自称 "harness" 且符合"agent 主动执行 + 持久公司模型（总账）"定义的产品，但它只覆盖财务/会计，不涉及股权、HR、法务、跨域情报耦合。
2. **企业 agent 基础设施**：YC 的 QM（2026-07 开源）、阿里悟空/钉钉、飞书 8.0 提供了公司级 agent 运行时（共享记忆、权限、多 agent 协同），但它们是通用平台，没有预置"公司数字孪生"这个领域模型。
3. **单点垂类 agent 集群**：Basis（会计，$1.15B 估值）、Campfire（$65M）、Doss（运营，$73M）、Puzzle、Zeni 等各自覆盖一个功能，没有产品跨越"财务+股权+HR+法务+外部信号"的跨域边界。

**市场处于"功能垂直化爆发期"，但尚未出现"创业公司经营操作系统"这个品类定义者。**

---

## 二、市场全景：品类命名与占位情况

### 2.1 "Harness" 一词的使用现状

截至调研日，"harness" 一词在 AI agent 语境下有两种主流用法：

| 用法 | 代表 | 含义 | 与目标品类的关系 |
|------|------|------|----------------|
| **Coding agent 运行时** | GitHub Copilot Harness、Microsoft Copilot Studio "GitHub Copilot harness" [(learn.microsoft.com)](https://learn.microsoft.com/is-is/microsoft-copilot-studio/agents-experience/overview) (2026-09) | 指 agent 的执行壳（模型调度、工具调用、沙箱） | 同名不同义：是开发者工具层，不是企业经营 |
| **财务 operating layer** | Rillet CEO Nicolas Kopp: "Rillet is building that harness: one environment where humans and agents share the same financial truth" [(ffnews.com)](https://ffnews.com/news/rillet-secures-100m-series-c-at-1b-valuation-to-scale-ai-native-accounting-erp) (2026-08-20) | 财务 agent 与人类共享同一总账的执行环境 | 最接近目标定义，但仅限财务域 |

**关键判断**：没有任何产品将 "vertical harness" 作为面向"初创公司全经营域"的品类名。Rillet 只在财务域使用了这个比喻。

### 2.2 品类的命名竞争

当前市场上出现的近似品类名包括：

- **"AI-native ERP"**：Rillet、Campfire、DualEntry、Doss、ERPClaw 等自标签——但均限于财务/运营单一维度
- **"Agent-native software"**：Biosync Labs 提出的架构模式 [(biosynclabs.com)](https://www.biosynclabs.com/knowledge-hub/agent-native-software) (2026-03)——描述的是技术架构（agent-first 四层：模型/记忆/工具/可视化），不是具体产品
- **"Startup OS" / "AI Business Copilot"**：Mission Control、BurnRateOS、FounderOS、Nautis 等产品 [(productwatch.io)](https://productwatch.io/blogs/best-ai-business-copilot-tools-to-run-your-business-in-2026) (2026-07)——更接近目标定义，但本质是"规划+仪表盘"，不具备持久公司模型和 agent 主动执行能力
- **"企业级 Agent 平台"**：阿里悟空、飞书 aily、千问办公——提供 agent 运行时和上下文基础设施，但不预置"公司经营模型"
- **"Vertical AI Agent"**：行业分析报告中的通用概念 [(wald.ai)](https://wald.ai/blog/ai-agents-in-2025-why-vertical-ai-agents-are-keytypes-trends-and-insights) (2026-06)——泛指所有垂直领域的 agent，不特指企业经营

---

## 三、最接近的候选产品详细分析

### 3.1 海外：财务垂类 Agent / AI-Native ERP

#### Rillet — 唯一自称 "harness" 的 agent-native ERP

| 维度 | 详情 |
|------|------|
| **定位** | AI-native ERP，agent-first 实时总账 |
| **融资** | $100M Series C @ $1B 估值 (2026-08)；累计 >$200M；14 个月内三轮 [(dailycompanynews.com)](https://www.dailycompanynews.com/rillet-raises-100-million-in-series-c-funding-round/) |
| **投资方** | ICONIQ 领投，Sequoia、a16z、Bain Capital、Battery 等 |
| **客户** | 600+ 家，包括 Mercor（$2B+ ARR，3 人财务团队）、Neuralink、Skild AI、Temporal、Windsurf |
| **核心能力** | 实时总账 + 持续关账 + AI agent（Aura）直接在账本内执行记账、对账、报表，99.7% 日记账自动入账 |
| **与目标品类关系** | 自称"harness"，agent 主动执行 + 持久公司模型（总账），但**仅覆盖财务/会计**，不涉及股权、HR、法务、外部信号耦合 |

**象限定位**：Agent 主动执行 ✓ × 持久公司专属模型 ✓（但模型 = 总账，非全公司经营模型）

#### Basis — 会计 agent 平台，首个十亿美元估值

| 维度 | 详情 |
|------|------|
| **定位** | AI agent 平台，面向会计事务所 |
| **融资** | $100M Series B @ $1.15B 估值 (2026-02)；累计 ~$138M [(crowdfundinsider.com)](https://www.crowdfundinsider.com/2026/02/264192-basis-announces-100m-in-new-funding-at-1-15b-valuation-to-enable-ai-driven-accounting-automation/) |
| **核心能力** | 长时自主 agent（可独立工作数小时），完成税务申报（首个自主完成 Form 1065 的 AI agent）、审计、记账 |
| **客户** | ~30% 美国 Top 25 会计事务所 |
| **与目标品类关系** | agent 自主执行能力强，但面向会计事务所而非初创公司；没有持久公司模型概念 |

#### Campfire — 面向初创公司的 AI-native 财务套件

| 维度 | 详情 |
|------|------|
| **定位** | AI-native ERP，面向初创→中型企业的财务套件 |
| **融资** | $65M Series B（Accel + Ribbit 领投）[(erpresearch.com)](https://erpresearch.com/en-gb/ai-native-erp) (2026-07 更新) |
| **核心能力** | "Large Accounting Model"，对话式界面（Ember AI），GL、收入自动化、关账管理、计费、资金管理 |
| **客户** | Replit、Decagon、PostHog、TwelveLabs 等科技创业公司 |
| **与目标品类关系** | 客户画像最接近（科技初创公司），但仍是纯财务工具 |

#### Doss — 运营侧 agent-native ERP

| 维度 | 详情 |
|------|------|
| **定位** | 运营优先：库存、采购、销售订单、仓储、生产计划 |
| **融资** | $55M Series B (2026-03)；累计 $73M [(erpresearch.com)](https://erpresearch.com/en-gb/ai-native-erp) |
| **核心能力** | 面向 $20M-$250M 消费品牌，与 Rillet/Campfire 配合使用 |
| **与目标品类关系** | 唯一覆盖"运营侧"的 agent-native 产品，但不覆盖财务、股权、HR |

### 3.2 海外：企业级 Agent 运行时 / 通用 Harness

#### YC QM — 最接近"全公司 agent harness"的开源项目

| 维度 | 详情 |
|------|------|
| **定位** | Y Combinator 内部使用的 multiplayer AI agent harness，2026-07-31 以 MIT 开源 [(valueaddvc.com)](https://valueaddvc.com/pulse/y-combinator-qm-open-source-agent-harness-2026) |
| **GitHub** | ~1,900 stars（发布数小时内） |
| **核心特性** | ① 为**全公司**设计（非个人助手）；② 每个员工/房间有独立记忆、文件、权限、cron、持久沙箱；③ 模型无关（Pi、OpenCode、Codex、Claude Code）；④ Slack + Web 双端同一身份 |
| **内部使用** | YC 用 QM 运行会计、法务、活动、工程工作 |
| **与目标品类关系** | **架构层面最接近目标定义**——multiplayer、公司级、有持久记忆和权限，但它是一个**通用 agent 运行时**，没有预置"公司经营模型"（company model / digital twin），需要使用者自行构建场景 |

**关键启示**：YC 作为全球最大加速器，将内部 agent 工具开源，等于在说"这就是我们认为初创公司应该用 agent 的方式"。但它提供的是骨架，不是成品。

#### "The Agency" — 232 个 agent 的虚拟公司

| 维度 | 详情 |
|------|------|
| **定位** | MIT 开源项目，232 个专业 agent 分 16 个部门 [(vijaykakade.com)](https://vijaykakade.com/blog/beyond-the-chatbot-meet-the-agency-open-source-corporate-stack) (2026-06-30) |
| **GitHub** | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) |
| **核心特性** | 每个 agent 有 Markdown 配置文件（人格、工作流、交付标准），中央 Orchestrator 自动分配任务 |
| **与目标品类关系** | 概念上有趣（用 agent 模拟公司组织），但本质是**开发辅助工具**——agent 们都在写代码、做营销，不是在做公司经营（记账、股权、合规） |

#### Mio — Slack 内的 AI Chief of Staff

| 维度 | 详情 |
|------|------|
| **定位** | AI Chief of Staff，在 Slack 内主动工作 [(mio.xyz)](https://www.mio.xyz/blog/mio-vs-microsoft-copilot) (2026-07) |
| **核心特性** | 连接 3,000+ 工具，主动起草周报、会议准备、跟进事项 |
| **与目标品类关系** | "AI 参谋长"概念接近，但是**个人效率工具**（生成文档/摘要），没有持久公司模型，不处理财务/股权/合规 |

### 3.3 国内：大厂的企业 Agent 平台

#### 阿里悟空 — 企业级 Agent 原生工作平台

| 维度 | 详情 |
|------|------|
| **发布** | 2026-03-17，独立 App + 内置钉钉 [(news.cn)](https://www.news.cn/tech/20260319/f8d8c6927a1b482b806e96ada3989669/c.html) |
| **核心能力** | 钉钉底层 CLI 化改造，Agent 原生操作 1,000+ 项钉钉能力；企业权限继承、安全沙箱；OPT"一人团队"十大行业解决方案（电商、跨境、法律、财税、制造等） |
| **生态** | 淘宝、天猫、1688、支付宝、阿里云 B 端能力以 Skills 形式接入 |
| **与目标品类关系** | 最接近"面向中小企业经营的 agent 平台"，但它是**通用平台**（Skill 市场模式），不预置"公司数字孪生"；更像是"agent 可以操作钉钉的所有功能"，而不是"agent 理解并经营你的公司" |

#### 飞书 8.0 — Agent-native 办公系统重构

| 维度 | 详情 |
|------|------|
| **发布** | 2026-09-15，飞书未来无限大会 [(stdaily.com)](http://www.stdaily.com/web/gdxw/2026-09/16/content_581901.html) |
| **核心能力** | 全面向 Agent 开放数据与工具；飞书 aily 升级：主动工作、团队共享智能体、多 Agent 协同；"豆包工作伙伴"——业内首个团队智能体产品 |
| **上下文优势** | "All-in-One"平台沉淀完整工作上下文（消息、文档、组织关系、权限体系） |
| **与目标品类关系** | 提供了 agent 运行所需的最优质上下文（企业上下文），但同样是**通用平台**，没有预置面向初创公司经营的领域模型 |

#### 千问办公（原钉钉体系） — Enterprise Context

| 维度 | 详情 |
|------|------|
| **发布** | 2026-09-22，云栖大会 [(华尔街见闻)](http://m.toutiao.com/group/7688379110334267931/) |
| **核心能力** | Enterprise Context：将群聊、文档、知识库、业务系统信息压缩、结构化、动态更新；数字员工有完整"组织身份"；协作空间支持 Agent 间通信 |
| **与目标品类关系** | "Enterprise Context" 概念与用户定义的"公司专属结构化模型"高度相关，但当前实现更接近**上下文管理层**，不包含经营领域的场景技能（记账、股权、合规） |

#### 用友 / 金蝶 — 传统 ERP 的 AI 化

| 厂商 | 动态 | 与目标品类关系 |
|------|------|----------------|
| **用友 YonAI** | YonGPT 2.0 企业服务大模型 + 八大 HR AI Agent [(yonyou.com)](https://www.yonyou.com/subject/HRSaaS/news/4982) (2026-05) | 在传统 ERP 上叠加 AI，仍是**人填表单 + AI 辅助**模式，非 agent-native |
| **金蝶苍穹/星瀚** | AI 能力嵌入，但未见"agent-native"定位的独立产品 | 同上 |
| **端点科技** | 2025-09 发布 AI 原生 ERP，2026-01 升级为 AIP 全景平台 [(chinadaily.com.cn)](http://caijing.chinadaily.com.cn/a/202601/29/WS697afef1a310942cc499d507.html) | 自称"AI 原生"，但本质仍是传统 ERP 架构加 AI 层 |
| **实在智能** | Agent 品牌峰会，TARS 大模型 + RPA + 屏幕语义理解 [(ai-indeed.com)](https://www.ai-indeed.com/aboutNews/14921.html) (2026-08) | 更偏 RPA 进化，非 agent-native 经营系统 |

### 3.4 GitHub 开源项目

| 项目 | Stars | 定位 | 最近活跃 | 与目标品类关系 |
|------|-------|------|----------|----------------|
| **YC QM** | ~1,900 (2026-07) | 全公司 multiplayer agent harness | 刚发布 | 架构最接近，但无公司经营模型 |
| **OpenClaw** | 150k+ (2026-02) | 个人 AI agent（WhatsApp/Telegram） | 活跃 | 面向个人，非公司经营 |
| **Lambda ERP** | 原型阶段 | 聊天优先的开源 ERP (MIT) | 2026-07 (v0.3.0) | 概念接近（chat-first ERP），但仅是原型，功能有限 |
| **ERPClaw** | 未公开 | 开源 AI-native ERP，14 行业垂直 | 2026-05 | 自称 AI-native，GPL 开源，但面向成熟企业 |
| **agency-agents** | 未详 | 232 agent 虚拟公司 | 2026-06 | 开发辅助，非公司经营 |
| **NocoBase** | 23.1k | AI no-code 企业应用平台 | 活跃 | 提供 agent 运行框架，但无预置经营模型 |
| **Sim** | 28.9k | 多 agent 协作工作区 | 活跃 | 偏开发协作 |

---

## 四、象限分析：谁占了什么位置

```
                      Agent 主动执行
                           ↑
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           │  QM (通用)    │  Rillet       │
           │  悟空 (通用)  │  (仅财务)      │
           │  飞书 (通用)  │  Basis        │
           │  千问 (通用)  │  (仅会计)      │
           │               │               │
 通用模型 ──┼───────────────┼───────────────┼── 公司专属模型
           │               │               │
           │  ChatGPT      │  ★ 空象限 ★   │
           │  豆包/通用助手 │  （你的目标）   │
           │  Mio          │               │
           │  (个人效率)    │               │
           │               │               │
           └───────────────┼───────────────┘
                           │
                      人填表单
```

**空象限确认**：**"Agent 主动执行 × 持久公司专属模型"且面向初创公司全经营域的交叉点，目前没有任何产品占据。**

- Rillet 在右下区域（agent 执行 + 财务域专属模型），但不跨域
- YC QM / 悟空 / 飞书在左上区域（agent 执行 + 通用模型/通用上下文），但没有预置公司经营领域的结构化模型
- 所有"Startup OS"类产品（Mission Control 等）都在左下区域（人驱动 + 泛化上下文）

---

## 五、最值得警惕的 1-2 个玩家

### 5.1 最危险：YC QM

**原因**：
1. **分发优势**：YC 直接面对全球最有影响力的初创公司群体（数千家 portfolio companies），MIT 开源 = 零摩擦采纳
2. **设计意图一致**：multiplayer、公司级、有记忆/权限/沙箱/cron——这就是"垂类 harness"的基础设施层
3. **时间窗口**：它刚发布 2 个月，生态尚未成型，但一旦 YC portfolio 公司基于它构建经营场景 skills，网络效应会迅速形成

**差距**：QM 是通用 agent 运行时，没有预置公司经营领域的场景技能（记账、股权、合规）。它需要有人在上层构建领域层——这正是用户产品可以做的事。

### 5.2 值得密切关注：Rillet 的品类扩张

**原因**：
1. Rillet 已经证明"垂类 agent harness"模式可行且获资本市场认可（$1B 估值、14 个月三轮）
2. CEO 明确表示要"redefine what's possible for the finance team of the future"——目前只扩到 biotech/healthcare/fintech，但这些行业扩展可能触及"全公司经营"
3. Rillet 的"operating layer / harness"语言一旦被市场接受，其他垂类（HR、法务）可能效仿，形成多个"harness"——但跨域整合仍是空白

---

## 六、对用户的启示与建议

### 6.1 核心判断：先发空白存在，但窗口在收窄

- **空象限确实存在**：面向初创公司经营全域的 "agent-native harness with company model" 无人在做完整产品
- **但基础设施层在快速补位**：YC QM 已开源，悟空/飞书在快速迭代——通用 agent 运行时会在 6-12 个月内成熟
- **领域层（场景技能 + 公司模型定义 + 连接器 + 护栏）是真正的壁垒所在**，也是通用平台不会自己做的

### 6.2 战略建议

1. **不要与通用 agent 运行时竞争**（不要自己造 QM/Dify）——用它们作为底层
2. **核心差异化 = "公司经营模型" 的定义权**：
   - 什么是"一家公司的数字孪生"需要包含的结构化实体？（股权、员工、合同、财务、知识产权、合规义务……）
   - 这个模型如何跨域关联？（一个员工的期权授予如何联动 HR 系统、财务系统、Cap table？）
   - 这个模型如何与外部信号耦合？（政策变化如何触发合规建议？）
3. **警惕"Rillet 模式"在单一垂类的成功引发模仿潮**——如果 Basis 扩展到全公司经营，或 Rillet 开始覆盖非财务域，它们可能成为直接竞争者
4. **YC QM 是潜在盟友而非敌人**——可以在 QM 之上构建"startup operating skill pack"，类似 Shopify 在通用电商基础设施上构建垂类 SaaS

### 6.3 时间窗口

- **6 个月内**：空象限仍然存在，是定义品类的最佳窗口
- **12 个月后**：YC QM 生态可能已经长出经营场景 skills；Rillet 可能开始跨域；悟空/飞书可能推出面向中小企业的"一人公司"方案
- **先发者需要在这个窗口内完成**：公司模型定义 + 3-5 个核心场景 skill + 种子用户验证

---

## 七、数据来源汇总

| 来源 | 类型 | 覆盖维度 | 角色 |
|------|------|----------|------|
| FF News / DailyCompanyNews / ERP Research | 科技/创投媒体 | Rillet/Campfire/Doss 融资与产品 | 主要事实来源 |
| AI-Agents+ / Crowdfundinsider | 科技媒体 | Basis 融资 | 主要事实来源 |
| ValueAddVC / GitHub Blog | 科技媒体 | YC QM 开源、GitHub Agent HQ | 主要事实来源 |
| 新华网 / 科技日报 / 华尔街见闻 | 国内权威媒体 | 飞书/钉钉/千问/用友动态 | 主要事实来源 |
| 36Kr / 东方网 | 国内科技媒体 | AI agent 创业潮、悟空发布 | 补充来源 |
| ProductWatch.io / Biosync Labs | 评测/架构分析 | Startup copilot 对比、agent-native 架构 | 参考来源 |
| Biosynclabs.com | 技术博客 | agent-native 四层架构定义 | 参考来源 |
| web_search 通用搜索 | 搜索引擎 | 定性背景、交叉验证 | 补充来源 |

---

## 八、附录：关键产品/项目速查表

| 产品 | 类型 | 融资/规模 | 覆盖域 | 是否 harness | 象限位置 |
|------|------|----------|--------|-------------|----------|
| Rillet | 商业 SaaS | $1B 估值, $200M+ | 财务 | ✓ 自称 | Agent 执行 × 财务专属模型 |
| Basis | 商业 SaaS | $1.15B 估值, $138M | 会计/税务 | ✗ | Agent 执行 × 会计专属模型 |
| Campfire | 商业 SaaS | $65M | 财务 | ✗ | Agent 执行 × 财务模型 |
| Doss | 商业 SaaS | $73M | 运营 | ✗ | Agent 执行 × 运营模型 |
| YC QM | 开源 | MIT 开源 | 通用 | ✓ agent harness | Agent 执行 × 通用模型 |
| OpenClaw | 开源 | 150k stars | 个人 | ✗ | Agent 执行 × 个人上下文 |
| 悟空/钉钉 | 平台 | 阿里 | 通用办公 | ✓ agent 平台 | Agent 执行 × 企业上下文 |
| 飞书 8.0 | 平台 | 字节 | 通用办公 | ✓ agent 平台 | Agent 执行 × 办公上下文 |
| 千问办公 | 平台 | 阿里 | 通用办公 | ✓ agent 平台 | Agent 执行 × Enterprise Context |
| Lambda ERP | 开源原型 | 原型 | 财务/库存 | ✓ chat-first | Agent 执行 × 有限模型 |
| Mio | 商业 SaaS | 早期 | 个人效率 | ✗ | Agent 辅助 × 无专属模型 |
| "The Agency" | 开源 | 社区 | 开发 | ✗ | Agent 执行 × 开发模型 |
| **★ 空象限** | — | — | **初创公司全经营** | — | Agent 执行 × 公司全域模型 |
