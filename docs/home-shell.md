# SAM 永久主页壳：接管与板块数据约定

## 接管边界

- 唯一视觉源是 `prototype/startup-ai-manager.html`，不复制模板、不经过 Jinja。
- `/` 与兼容地址 `/prototype` 在 full / readonly 都经
  `app/home_shell.py:render_home_shell()` 返回 HTML；默认仍为 `overview`。
- 只在首个 `<script>` 顶部注入 `window.SAM_CONFIG`：
  `mode` 取启动时 RuntimeConfig 的 `SAM_CLOUD_READONLY`（仅 `1` 为 readonly），
  `company_id` 取宿主 `SAM_COMPANY_ID`（未设置为 `default`），不接受 URL 覆盖。
  JSON 转义 `<` / `>` / `&` 和 Unicode 行分隔符，响应 `Cache-Control: no-store`。
- chat 改为同源 `/api/chat`；上传、引导继续用原接口。
- 旧 `/bizov`、`/overview`、`/files`、`/knowledge` 等页面保留。
  云端认证、快照读 API、集中写操作 403 均沿用原机制；没有新增密码功能。
- 没有改造云盘、日程或其他演示板块，也没有接文件柜或首用登记。

模式切换后需重启 Flask；正常 full 启动仍需显式注入已验收的
`SAM_MEMORY_ROOT_URI`，readonly 不装配本地 OV/解析/模型。

## 后续板块怎样接真数据

原型脚本提供 `window.SAM`，但不自动加载或改写任何业务板块。
先注册该板块演示数据，再用现有或后续开发的 GET API：

```javascript
// 示例板块及 /api/example 是接线示意，本任务未新增这个接口或标签槽。
SAM.demo.example = [{title: '演示条目'}];
const result = await SAM.data.load('example', {
  url: '/api/example',
  select: payload => payload.items
});
renderExample(result.data);  // 板块自己的渲染函数，注意使用安全文本渲染。
SAM.data.mark(document.getElementById('exampleDataSource'), result);
```

- `SAM.demo`：按板块注册演示数据的无原型容器；未注册即 load 会显式报错。
- `SAM.data.load(section, {url, select?, isEmpty?})`：只发 GET，
  返回 `{data, source: 'api'|'demo', demo, label, error}`。
  网络异常、非 2xx、JSON 解析失败、空值均回退注册的演示数据，
  `label` 为「演示数据」，`error` 留诊断；真数据 label 为空。
- 默认空值是 `null` / `undefined` / 空字符串 / 空数组 / 空对象；
  `0` / `false` 是有效真数据。嵌套接口需用 `select` 明确取板块字段；
  `isEmpty(data)` 可按接口结构决定空态，不在浏览器推导业务规则。
- `SAM.data.mark(existingLabelElement, result)`：只更新调用者提供的标签槽
  文本与 `data-sam-source`，不自行插入 DOM，不改变现有布局。
- 数据回退只用于板块读取，**不把上传/对话失败伪装成成功**。

## 后续写入口怎样接模式开关

```javascript
button.addEventListener('click', async function () {
  if (!SAM.ui.allowWrite()) return;  // 必须在改 UI、清草稿、建任务之前。
  const response = await SAM.api.request('/api/example', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  // 沿用该接口的状态/错误处理，不套读取用的 demo 回退。
});
```

`SAM.api.request(url, options?)` 只接受同源 `/api/` 相对路径，附带
`credentials: 'same-origin'`，返回原始 Response；GET/HEAD/OPTIONS 允许读取。
readonly 下其他 method 在 fetch 前被拦截，提示「这一步请在本地操作」，
拒绝的 Error.code 为 `sam_readonly`。
`SAM.ui.allowWrite()` 提示相同文案并返回 false。按钮不隐藏、不挪位置。
现有对话发送（含回车、建议/技能入口）、引导开启/刷新、文件选择/拖放/上传
已接此助手，拦截发生在修改聊天或导入 UI 前，草稿保留。

前端配置不是授权机制，也不代替宿主公司范围；云端后端仍集中拒绝写请求。

## 本轮验证（2026-10-09）

- 修改前：372 passed / 3 skipped；修改后：389 passed / 3 skipped，新增 17 用例。
- `.venv/bin/python -m compileall -q app scripts webapp`、`git diff --check` 通过。
- 独立启动 full / readonly Flask（loopback、临时目录、假公司
  `acc-shell-live`）；两者 `/`、`/prototype`、旧 `/bizov`、`/knowledge` 均 200。
  readonly 三个真实写 API（chat/upload/import-guide）返回 403。
- Windows Chromium 147 headless 接入实际 Flask，桌面 1440×1000、移动
  390×844：full / readonly 首屏截图分别与修改前原型的 PNG 完全一致，
  均仅 overview 激活、无横向溢出、无 JS 异常。
  比对时关闭测试页的滚动定时器并等待原有 220ms 淡入结束，未改产品 CSS。
- full 的浏览器对话/引导/上传入口可进入并正确请求同源 API；为不调用真实
  模型/解析，这三个浏览器响应被测试拦截替换。另有 Flask 路由测试验证
  chat 200、upload 202、guide 200（模型/解析替身，上传存储在 tmp_path）。
  **不宣称本轮真实模型回复或真实解析验收已通过。**
- readonly 浏览器点击发送、回车、导入、上传、拖放：5 次本地操作提示，
  0 个写请求，保留草稿。读取和原文页仍按既有路由工作。
- 浏览器启动有 UNC 临时缓存目录权限警告，但调试连接、页面与截图完成。
  首次截图取到了淡入中间帧；等待淡入结束后重验通过，无需更改产品代码。
- 本轮临时服务/浏览器及 acc 测试数据库清理；证据与交付文件存于
  `/tmp/sam-foundation/`，不带入库。未写 `.git`、未提交、未 push；正式
  范范/饭团真机点头与提交仍由饭团负责。

## 文件柜前端修复（2026-10-10）

仅修改唯一视觉源 `prototype/startup-ai-manager.html`：桌面文件柜改为单栏，保留移动端间距并清理无 HTML/JS 引用的旧步骤栏 CSS；已登记时常驻显示当前公司主体和「修改」文字按钮，就地复用首次登记输入框及 `/api/entity-roster` 保存逻辑，成功后恢复主体展示并更新上传登记状态，未改后端规则。主页契约 33 passed（其中 JS 契约 19 passed），补充改名回归脚本和真实 Flask 登记/改名/旧主体替代/上传身份守卫检查通过；全量在显式注入测试根 `SAM_MEMORY_ROOT_URI=viking://sam-test/product-root` 和独立网关端口 `SAM_OPENCLAW_GATEWAY_PORT=19236` 后为 405 passed / 3 skipped，compileall 与 diff --check 通过。浏览器验收未完成、无截图：Windows Chromium 两次报 GPU 子进程不可用退出，替代 Edge 的调试连接报 socket Operation not permitted，未继续重试；宽屏/窄屏视觉及真实浏览器点击流程仍待饭团真机验收。测试使用隔离临时数据库且已清理，未上传文件，真实名册复核仍只有“谷斗科技（上海）有限公司”。 当前沙箱 `.git` 只读，`git add` 报 `index.lock: Read-only file system`，因此未生成 commit、未 push。
