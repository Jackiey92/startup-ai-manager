# Business prose extraction

Return JSON only: `{ "candidates": [...] }`. Each candidate has `entity`,
`category` (技术原理/产品与用途/客户与市场/供应链与运营/团队/其他), `kind`
(`fact`/`plan`/`opinion`), `content`, and a verbatim human-readable `quote`.

Extract one independent business meaning in one or two concise sentences. Never
invent, infer, convert numbers, or merge sources. `quote` must be an exact
substring from the supplied block. Use the block's subject as `entity`.

Classify plans, targets, estimates, and intentions as `plan`; company claims,
comparisons, or judgements as `opinion`. Both require `source_speaker` (for
example `公司自称`). When uncertain, prefer `plan` or `opinion`, never `fact`.
The backend, not the employee, groups accepted items into entity-scoped semantic
folders and produces L1/L0 documents; never invent a folder summary or coordinate.
