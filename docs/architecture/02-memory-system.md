# 可信记忆系统

## 核心原则

不让 LLM 直接改写真相。LLM 通过「受约束、可校验的事务」往账本里写；`memory.md` 之类的工作记忆只是从事实层投影出的、可丢弃的缓存。

## 三层记忆

| 层 | 内容 | 谁可写 | 可变性 |
|---|---|---|---|
| 原文层 | 上传原件（PDF / Excel / 扫描件 / 邮件） | 只追加 | 永不修改、永不删除，内容寻址（按哈希） |
| 事实层 | 结构化公司事实图：实体 + 属性 + 关系 | 仅通过校验过的事务 | append-only，只追加不改写 |
| 工作记忆 | memory.md、摘要、对话 scratch | LLM 自由写 | 随时可丢弃、可重建 |

工作记忆写错、写飘、被污染都无所谓——删掉重生成；LLM 永远不能直接编辑事实层。

## 事实凭证（Fact Voucher）

不存裸值，每条事实是一张可追责凭证：

```yaml
fact:
  entity:        # 公司 / 股东 / 客户 ...
  attribute:     # 注册资本 / 持股比例 ...
  value:         # 值（带类型、单位、量纲）
  source:        # { file_hash, page, char_range }
  valid_from:    # 生效时间
  valid_to:      # null；被新事实取代时回填
  confidence:    # 0.0 - 1.0
  status:        # verified | claimed | inferred
  superseded_by: # null
```

- **怎么找原文件**：每条事实死锁 `file_hash + 页码 + 字符区间`；
- **更新不改错**：更新 = 追加新事实 + 旧事实标 superseded（事件溯源）；
- **数据不调错**：数字计算由代码完成，LLM 只负责抽取；
- **可信度不混**：文件支持=verified，口述=claimed（默认未核实），模型推断=inferred。

## 导入即建记忆（带闸门的流水线）

```
解析原件
 → LLM 抽取候选事实（落 staging，不进账）
 → 校验：实体消重 · 单位归一 · 类型 · 勾稽
 → 冲突 / 低置信 → 人工确认队列
 → 通过 → 提交带出处的事实
```

## 对话中的更新：提交「事实事务」

```yaml
transaction:
  action:        # assert | amend | revoke
  entity:
  attribute:
  value:
  source:        # 对话第 N 轮 / 文件引用
  trust:         # 口述默认 claimed
```

Validator 拦截：无出处 → claimed；与现有事实冲突 → 拒绝并生成「矛盾待澄清」；勾稽不成立 → 打回。通过才入账。

## 检索不调错

> 向量索引只用于「找候选」，召回后必须回到原文层打开 char_range 复核，再引用。

引用链：结论 → fact_id → 原文 span；多源冲突不擅自取舍，标「口径冲突」交人裁决。

## 边界

把火力压在高风险、字段封闭、可校验的事实上（股权、现金、注册资本、对赌条款）；开放式叙事可从宽。
