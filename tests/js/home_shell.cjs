// Execute the real inline JS. Minimal DOM doubles test event wiring, not pixels.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../../prototype/startup-ai-manager.html'), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];
const foundation = script.split('/* ===== /SAM foundation ===== */')[0];
const caseName = process.argv[2];
const readonly = caseName.includes('readonly');
const calls = [], alerts = [];
let fetchImpl = async () => ({ok: true, json: async () => ({rows: [{id: 1}]})});
const window = {
  SAM_CONFIG: {mode: readonly ? 'readonly' : 'full', company_id: 'acc-shell'},
  alert: message => alerts.push(message),
  fetch: async (...args) => {calls.push(args); return fetchImpl(...args);},
  addEventListener() {},
};

class Element {
  constructor(id = '') {
    this.id = id; this.dataset = {}; this.style = {setProperty() {}};
    this.value = ''; this.textContent = ''; this.innerHTML = '';
    this.children = []; this.events = {}; this.parts = new Map(); this.attributes = {};
    const classes = new Set();
    this.classList = {
      add: name => classes.add(name), remove: name => classes.delete(name),
      contains: name => classes.has(name),
      toggle(name, force) {
        const on = force === undefined ? !classes.has(name) : force;
        if (on) classes.add(name); else classes.delete(name);
      },
    };
  }
  addEventListener(name, handler) {(this.events[name] ||= []).push(handler);}
  dispatch(name, extras = {}) {
    for (const handler of this.events[name] || []) handler({target: this, preventDefault() {}, stopPropagation() {}, ...extras});
  }
  click() {this.dispatch('click');}
  focus() {}
  setAttribute(name, value) {this.attributes[name] = value;}
  appendChild(child) {this.children.push(child);}
  insertBefore(child) {this.children.unshift(child);}
  querySelector(selector) {
    if (!this.parts.has(selector)) this.parts.set(selector, new Element());
    return this.parts.get(selector);
  }
}
const elements = new Map();
for (const match of html.matchAll(/\bid="([^"]+)"/g)) elements.set(match[1], new Element(match[1]));
const screens = [...html.matchAll(/class="screen( active)?" id="([^"]+)"/g)].map(match => {
  const element = elements.get(match[2]);
  if (match[1]) element.classList.add('active');
  return element;
});
const suggestion = new Element(); suggestion.dataset.q = '测试建议';
const skill = new Element(); skill.dataset.q = '测试技能';
const document = {
  body: new Element(), addEventListener() {}, createElement: () => new Element(),
  getElementById(id) {assert.ok(elements.has(id), 'missing element: ' + id); return elements.get(id);},
  querySelectorAll(selector) {
    if (selector === '.screen') return screens;
    if (selector === '.sugg-card') return [suggestion];
    if (selector === '.skill') return [skill];
    return [];
  },
};
const context = vm.createContext({window, document, console, setInterval() {},
  FormData: class {append() {}}, getComputedStyle: () => ({background: ''})});
vm.runInContext(caseName.startsWith('ui-') ? script : foundation, context);
const SAM = window.SAM;
SAM.demo.probe = [{id: 'demo'}];
const load = options => SAM.data.load('probe', {url: '/api/probe', ...options});
const flush = () => new Promise(resolve => setImmediate(resolve));

async function main() {
  switch (caseName) {
    case 'api': {
      const result = await load({select: payload => payload.rows});
      assert.equal(result.data[0].id, 1); assert.equal(result.demo, false);
      assert.equal(result.source, 'api'); assert.equal(result.label, '');
      assert.equal(calls[0][0], '/api/probe');
      assert.equal(calls[0][1].credentials, 'same-origin');
      for (const value of [0, false]) {
        fetchImpl = async () => ({ok: true, json: async () => value});
        assert.equal((await load()).data, value);
        assert.equal((await load()).demo, false);
      }
      assert.equal((await load({isEmpty: () => true})).demo, true);
      break;
    }
    case 'empty':
      for (const value of [null, undefined, '', [], {}]) {
        fetchImpl = async () => ({ok: true, json: async () => value});
        const result = await load();
        assert.equal(result.demo, true); assert.equal(result.data, SAM.demo.probe);
        assert.equal(result.label, '演示数据');
      }
      assert.equal((await load({select: () => undefined})).demo, true);
      break;
    case 'failure':
      for (const implementation of [
        async () => {throw new Error('network');},
        async () => ({ok: false, status: 503}),
        async () => ({ok: true, json: async () => {throw new Error('invalid JSON');}}),
      ]) {
        fetchImpl = implementation;
        const result = await load();
        assert.equal(result.demo, true); assert.equal(result.data, SAM.demo.probe);
        assert.ok(result.error);
      }
      await assert.rejects(SAM.data.load('unregistered', {url: '/api/probe'}), /Register/);
      break;
    case 'label': {
      const element = new Element();
      SAM.data.mark(element, {label: '演示数据', source: 'demo'});
      assert.equal(element.textContent, '演示数据'); assert.equal(element.dataset.samSource, 'demo');
      SAM.data.mark(element, {label: '', source: 'api'});
      assert.equal(element.textContent, ''); assert.equal(element.dataset.samSource, 'api');
      break;
    }
    case 'readonly':
      for (const method of ['POST', 'put', 'PATCH', 'DELETE']) {
        await assert.rejects(SAM.api.request('/api/probe', {method}), error => error.code === 'sam_readonly');
      }
      assert.equal(calls.length, 0); assert.equal(alerts.length, 4);
      assert.ok(alerts.every(message => message === '这一步请在本地操作'));
      assert.equal((await load()).source, 'api');
      await SAM.api.request('/api/probe', {method: 'HEAD'});
      assert.equal(calls.length, 2);
      break;
    case 'full':
      assert.equal(SAM.ui.allowWrite(), true);
      await SAM.api.request('/api/upload', {method: 'POST', body: 'test'});
      assert.equal(calls[0][1].body, 'test'); assert.equal(alerts.length, 0);
      await assert.rejects(SAM.api.request('https://other.invalid/api/chat'), /same-origin/);
      assert.equal(calls.length, 1);
      break;
    case 'ui-readonly': {
      const input = elements.get('chatInput'); input.value = '保留草稿';
      elements.get('sendBtn').click();
      input.dispatch('keydown', {key: 'Enter'});
      suggestion.click(); skill.click();
      for (const id of ['importWizardBtn', 'importNavBtn', 'driveUploadBtn', 'driveWizardBtn', 'importRefresh', 'importPick']) elements.get(id).click();
      elements.get('importFileInput').files = [{name: 'acc-test.pdf'}];
      elements.get('importFileInput').dispatch('change');
      elements.get('importDrop').dispatch('drop', {dataTransfer: {files: [{name: 'acc-test.pdf'}]}});
      assert.equal(calls.length, 0); assert.equal(alerts.length, 12);
      assert.ok(alerts.every(message => message === '这一步请在本地操作'));
      assert.equal(input.value, '保留草稿');
      assert.equal(elements.get('chatInner').children.length, 0);
      assert.equal(elements.get('importMask').classList.contains('open'), false);
      assert.equal(elements.get('overview').classList.contains('active'), true);
      break;
    }
    case 'ui-full':
      fetchImpl = async url => ({ok: true, json: async () => url === '/api/chat' ? {message: '测试回复'} :
        url === '/api/import-guide' ? {guide: {message: '测试引导', next_action: '测试下一步', completeness: {}}} :
        {original_name: 'acc-test.pdf', size: 8}});
      assert.equal(elements.get('overview').classList.contains('active'), true);
      elements.get('chatInput').value = '测试消息'; elements.get('sendBtn').click();
      await flush();
      assert.equal(calls[0][0], '/api/chat'); assert.equal(calls[0][1].method, 'POST');
      assert.equal(elements.get('chatInner').children[1].querySelector('.bubble').textContent, '测试回复');
      elements.get('importNavBtn').click(); await flush();
      assert.equal(elements.get('importMask').classList.contains('open'), true);
      assert.equal(elements.get('importGuideText').textContent, '测试引导');
      elements.get('importFileInput').files = [{name: 'acc-test.pdf'}];
      elements.get('importFileInput').dispatch('change'); await flush();
      assert.deepEqual(calls.map(call => call[0]), ['/api/chat', '/api/import-guide', '/api/upload']);
      assert.equal(elements.get('driveFiles').children.length, 1); assert.equal(alerts.length, 0);
      break;
    default: throw new Error('Unknown contract: ' + caseName);
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});
