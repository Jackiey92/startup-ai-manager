# Phase 3 Tool Search 使用契约

这是给员工的统一用法说明。`tool_search`、`tool_describe`、`tool_call`
是三个控制工具，不是业务工具 ID；不要把控制工具名传给
`tool_describe`，也不要猜测插件前缀。搜索必须使用英文意图，调用只使用
`tool_search` 返回的精确 `name`。

## 固定链路

1. `tool_search({"query":"parse an uploaded document"})`
2. 从结果读取精确工具名，例如 `sam_document_ingest`。
3. `tool_describe({"id":"sam_document_ingest"})`，先确认 schema。
4. `tool_call({"id":"sam_document_ingest","args":{"file_hash":"<64 lowercase hex>","format":"pdf"}})`。

`sam_document_ingest` 的参数**恰好**是 `file_hash` 与 `format`；没有路径参数，
不要传 `source_path`、`file_path`、shell 命令或空对象。原件路径由运行时注入，
产物只能写受控 `runtime_outbox`/`l2_staging`。

## Few-shot

### 正确

```json
{"query":"parse an uploaded PDF into L2 evidence"}
```

```json
{"id":"sam_document_ingest"}
```

```json
{"id":"sam_document_ingest","args":{"file_hash":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef","format":"pdf"}}
```

### 错误（必须停止并重新 search/describe）

```json
{"id":"tool_call","args":{}}
```

```json
{"id":"openclaw:sam-memory:sam_document_ingest","args":{}}
```

```json
{"id":"sam_document_ingest","args":{"path":"/etc/passwd"}}
```

工具返回 `parse_failed` 或质量告警时，员工按 document-ingest 技能决定是否
换引擎重试；不要把失败伪装为完成，也不要绕过工具直接读写宿主路径。
