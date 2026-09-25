# Document ingest POC（本地、受控）

日期：2026-09-25。此记录只描述本机解析结果；原始文件、完整文本和密钥没有发送到外部服务。

## 环境与安装

- Python 3.14.4，WSL 无 GPU，主机可见内存约 7.7 GiB。
- MinerU 4.0.7，使用本地 managed `basic` ONNX tier；模型目录约 819 MB，解析服务常驻 RSS 约 1.1 GiB。
- `docling-slim` 2.130.0、`docling-core` 2.98.1；Office 路径不安装 Torch/CUDA，单次进程 RSS 约 234--260 MiB。
- pytest 9.1.1。MinerU 的依赖包括 ONNX Runtime、OpenCV、表格/版面模型和 `docvortex`；本轮没有安装完整 Docling 的 Torch/CUDA 栈。
- MinerU basic 模型下载了 OCR、版面、表格和公式 ONNX 文件，其中最大文件约 591 MB；没有下载 1.2B VLM。

MinerU 服务配置为本地 UDS/回环 managed server，bridge 调用本地 `mineru parse`，不使用远端解析端点。POC 结束后应停止本地 MinerU server；日常运行不应因此默认开放外网。

## 真实样本结果

样本来自本机 `/mnt/d/Desktop/国发文件`，通过 bridge 生成 L2 manifest，四份均通过 JSON Schema 校验：

| 格式 | 引擎/tier | 页 | 文本项 | 表格/数据行 | 出处能力 | bridge 耗时 |
| --- | --- | ---: | ---: | ---: | --- | ---: |
| PDF（公积金单） | MinerU basic | 1 | 6 | 1 / 6 | 页码 + 归一化 bbox | 4489 ms |
| XLSX（营业外支出） | MinerU flash | 1 | 0 | 1 / 38（12 列） | 页级；MinerU 表格 bbox 为空 | 1305 ms |
| DOCX（股东会访谈纪要） | MinerU flash | 1 | 40 | 0 / 0 | 文本块，无稳定页 bbox | 1904 ms |
| PPTX（架构图） | MinerU flash | 1 | 21 | 0 / 0 | 文本块含 slide/shape bbox | 1559 ms |

每份 manifest 都带 `source_id`、原文件 SHA-256、文件名/格式/大小/上传时间、`pages`、`parse_summary`，并强制 `raw_bytes_external=false`、`full_text_external=false`。PDF 的 table/text `source_loc` 含 `file_hash/page_no/bbox/locator`；XLSX 行通过 `source_loc` 绑定页级表块，后续可扩展 sheet/cell 坐标。

## 内嵌图片实测

bridge 现在另产 `images[]`。图片字节只写入本地
`.sam-isolated/data/l2-images/<file_hash>/`，每项含 `image_id`、文件名、MIME、
页码、bbox、图片 SHA-256、本地路径和 `source_loc`；仍由 manifest 的
`raw_bytes_external=false` / `full_text_external=false` 约束，模型侧只应看到“此处有图”
及可选说明，不直接传图片字节。

对同四份真实样本的结果：

- PDF 公积金：抽出 1 张 PNG（约盖章/标识区域），页 1，bbox
  `[485.69,38.59,553.61,106.51]`，本地 hash/path 可回溯。
- XLSX 营业外支出：0 张；该样本没有 OOXML `media` 对象。
- DOCX 股东会纪要：0 张；该样本没有 `word/media` 对象。
- PPTX 架构图：0 张；该样本没有 `ppt/media` 对象。

因此“能否抽图”已在 PDF 上实测成功，但 Office 三份样本没有嵌图，不能据此评价 Office 抽图质量。Office bridge 已支持从 OOXML `*/media/*` 本地解包；页/slide 锚点需后续按关系文件和 shape anchor 补齐。手写、复杂图表和低清印章仍未单独验收。

### Office 含图补充验证（合成容器样本）

为避免把“空样本”当成能力结论，使用一张本地真实企业微信截图作为图片素材，
用脚本生成三个仅用于本机验收的 Office 容器（明确为合成样本，不提交二进制）：

- DOCX：1 张图，定位到 `paragraph=1`，无页码/bbox（DOCX 流本身不保证分页）。
- PPTX：1 张图，定位到 `slide_no=1, shape=2`，返回 shape bbox（EMU 坐标）。
- XLSX：1 张图，定位到 `sheet=Evidence, cell_range=Evidence!R2C2`；当前文件的 anchor 未提供可靠像素 bbox，因此 bbox 为 null。

三者均成功抽出 1 张 PNG，images[] 全部通过 schema，图片哈希可回穿到各自原件。
这证明 OOXML `word/media`、`ppt/media`、`xl/media` 的本地抽图路径成立；并不等于
已经验证真实印章识别或图片内容理解。

### 印章/低清场景

将本地真实营业执照副本 JPG 封装为一个本机合成 PDF（不外发）后运行 MinerU
basic CPU：1 页、20 个 OCR 文本项、抽出 1 张 JPEG，页 1 bbox 可回溯，且
raw/full text external 均为 false。该结果验证了“带执照/可能含印章的低清图片容器”
能被抽取，但没有对印章真伪或印章文字准确率做结论；后续仍需专门的低清盖章样本。

Docling 对同三份 Office 文件做了对照（同一台机器、纯本地）：

| 格式 | 文本项 | 表格 | provenance |
| --- | ---: | ---: | --- |
| DOCX | 40 | 0 | 文本项通常无 page/bbox，只保留 `self_ref` |
| XLSX | 0 | 1（38×12） | page 1 + 表格 bbox `[0,0,12,39]` |
| PPTX | 21 | 0 | page/slide 1 + shape bbox |

Docling PDF conversion 在当前轻量安装下明确失败：`ModuleNotFoundError: No module named 'torch'`（同时提示没有 OCR engine）。这不是伪造的“通过”；要公平比较 Docling PDF，需要另行批准安装完整 Torch/模型栈并重新测量。

## 结论与映射

本轮语料上 MinerU 是当前更可靠的统一主引擎：它在本地 CPU basic tier 已跑通 PDF/CJK/表格和四类输入，PDF 给出页/bbox；代价是常驻内存和模型目录较大。Docling slim 适合 Office 对照，XLSX/PPTX 的结构和 provenance 很好、DOCX 文本稳定且无需重模型，但当前不能处理 PDF。不能据此宣称 Docling 在 PDF 上更差，只能说其完整栈尚未安装。

bridge 的转换层保持单一职责：

- Docling `text.text` → `pages[].text_items[].text`；`prov.page_no/bbox` → `source_loc.page_no/bbox`；无 provenance 的 DOCX 文本使用 `self_ref`，页码保持 null。
- Docling `table.export_to_dataframe()` → `headers/rows`；表 provenance → table `source_loc`。
- MinerU 页 block → 相同 text/table 结构；其 HTML 表格转行，不把原始 HTML 透传到外部。

下一步若要切换引擎，只改 bridge 选择或 RuntimeProvider 注入，不改业务层；两种引擎都只产 L2，不直接写 2b。

## 测试边界

- `pytest -q skills/document-ingest/tests`：`2 passed, 1 skipped`（无默认真实样本依赖）。
- 以四个本机样本变量运行 `test_real_samples.py`：`4 passed`，实际使用 MinerU 本地服务。
- 未测：完整 Docling + Torch 的 PDF、扫描 OCR 的 Docling 对照、老式 DOC/XLS/PPT 的 LibreOffice 转换、GPU 路径。
- 本地 MinerU 服务应在 POC 后关闭；没有 push、部署或外发。
