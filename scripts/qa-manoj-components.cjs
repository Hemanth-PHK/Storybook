/* Run after build-storybook. Uses installed Chrome and Node 22+, no added dependencies. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../packages/ui/storybook-static');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const results = [];
let browser, socket, server;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'skillforge-qa-'));
async function main() {
  server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
    fs.readFile(file, (error, data) => { res.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(error ? '' : data); });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const chrome = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  browser.on('error', error => { console.error(error); process.exitCode = 1; });
  let debugPort;
  for (let i = 0; i < 100; i++) {
    try { debugPort = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]; break; } catch { await sleep(100); }
  }
  assert(debugPort, 'Chrome debugger started');
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) { const task = pending.get(message.id); pending.delete(message.id); message.error ? task.reject(message.error) : task.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  await send('Runtime.enable');
  await send('Page.enable');
  const index = JSON.parse(fs.readFileSync(path.join(root, 'index.json'), 'utf8')).entries;
  const stories = Object.values(index).filter(entry => entry.type === 'story');
  async function open(id) {
    errors.length = 0;
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/iframe.html?id=${id}&viewMode=story` });
    for (let i = 0; i < 150; i++) {
      if (await evaluate(`window.__STORYBOOK_PREVIEW__?.currentRender?.id === ${JSON.stringify(id)} && document.querySelector('#storybook-root')?.children.length > 0 && !document.querySelector('.sb-errordisplay')?.checkVisibility()`)) { await sleep(80); return; }
      await sleep(100);
    }
    throw new Error(`Story did not render: ${id}; ${await evaluate('document.body.innerText.slice(0,3000)')}; exceptions: ${errors.join(', ')}`);
  }
  const selected = stories.filter(entry => /^Components\/(Tabs|Accordion|Breadcrumb|Table|Pagination)$/.test(entry.title));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    for (const story of selected) {
      await open(story.id);
      assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `${story.id}: overflow at ${width}`);
      assert.equal(errors.length, 0, `${story.id}: runtime error`);
      results.push(`${story.id}: rendered, no viewport overflow at ${width}px`);
    }
  }
  async function check(id, expression, label) {
    await open(id);
    const scoped = expression.replaceAll('document.querySelector', "document.getElementById('storybook-root').querySelector");
    assert.equal(await evaluate(scoped), true, `${label}; DOM: ${await evaluate('document.querySelector("#storybook-root")?.innerHTML.slice(0,5000)')}`);
    results.push(label);
  }
  const tick = `await new Promise(r => setTimeout(r, 50));`;
  for (const story of ['default', 'full-width', 'disabled-tab']) {
    await check(`components-tabs--${story}`, `(async()=>{
      const tabs=[...document.querySelectorAll('[role=tab]')], enabled=tabs.filter(t=>!t.disabled);
      enabled[0].focus(); return true;
    })()`, `Tabs ${story}: initial focus`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
    await sleep(60);
    assert(await evaluate(`(()=>{const e=[...document.querySelectorAll('[role=tab]')].filter(t=>!t.disabled);return document.activeElement===e[1]&&e[1].getAttribute('aria-selected')==='true'})()`));
    for (const [key, position] of [['End', -1], ['Home', 0]]) {
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key });
      await sleep(60);
      assert(await evaluate(`(()=>{const e=[...document.querySelectorAll('[role=tab]')].filter(t=>!t.disabled);const t=e.at(${position});return document.activeElement===t&&t.getAttribute('aria-selected')==='true'&&document.getElementById(t.getAttribute('aria-controls')).getAttribute('aria-labelledby')===t.id})()`));
    }
    results.push(`Tabs ${story}: real arrow/Home/End keyboard selection and ARIA relationships`);
  }
  for (const [story, multiple] of [['single-open', false], ['multiple-open', true]]) {
    await check(`components-accordion--${story}`, `(async()=>{const b=[...document.querySelectorAll('button[aria-expanded]')];b[2].click();${tick}return b[2].getAttribute('aria-expanded')==='true'&&b[0].getAttribute('aria-expanded')==='${multiple}'&&document.getElementById(b[2].getAttribute('aria-controls')).hidden===false})()`, `Accordion ${story}: expansion and relationships`);
    await evaluate(`document.querySelector('button[aria-expanded]').focus()`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
    assert(await evaluate(`document.activeElement===document.querySelectorAll('button[aria-expanded]')[1]`));
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await sleep(50);
    assert(await evaluate(`document.activeElement.getAttribute('aria-expanded')==='${!multiple}'`), `Accordion ${story}: Enter toggles expansion`);
    results.push(`Accordion ${story}: real arrow and Enter keys`);
  }
  await check('components-accordion--disabled-item', `(async()=>{let b=document.querySelectorAll('button[aria-expanded]')[1];b.click();${tick}return b.disabled&&b.getAttribute('aria-expanded')==='false'})()`, 'Accordion: disabled item cannot expand');
  await check('components-breadcrumb--collapsed-long-path', `(async()=>{let n=document.querySelector('nav');if(n.querySelectorAll('a').length!==2)return false;n.querySelector('button').click();${tick}return n.querySelectorAll('a').length===5&&n.querySelector('[aria-current=page]')?.textContent==='Study guide'})()`, 'Breadcrumb: collapse expands all links and preserves current page');
  await check('components-breadcrumb--basic', `(async()=>{document.querySelector('nav a').click();${tick}return document.querySelector('[role=status]').textContent==='Selected home'})()`, 'Breadcrumb: supplied link callback');
  await check('components-table--sortable', `(async()=>{let h=document.querySelector('th');if(h.getAttribute('aria-sort')!=='ascending')return false;h.querySelector('button').click();${tick}return h.getAttribute('aria-sort')==='descending'&&document.querySelector('tbody td').textContent==='Understanding ecosystems'})()`, 'Table: controlled sorting changes row order and aria-sort');
  await check('components-table--loading', `document.querySelector('table').getAttribute('aria-busy')==='true'&&document.querySelector('tbody').textContent.includes('Loading')`, 'Table: loading status');
  await check('components-table--empty', `document.querySelector('tbody').textContent.includes('No resources match')`, 'Table: custom empty content');
  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 900, deviceScaleFactor: 1, mobile: false });
  await check('components-table--responsive-overflow', `(()=>{const r=document.querySelector('[role=region]');return r.scrollWidth>r.clientWidth&&r.tabIndex===0&&document.documentElement.scrollWidth<=innerWidth})()`, 'Table: keyboard-focusable horizontal overflow retains every column at 320px');
  await check('components-table--with-toolbar-or-filters', `(async()=>{const i=document.querySelector('input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(i,'ecosystems');i.dispatchEvent(new Event('input',{bubbles:true}));${tick}return document.querySelectorAll('tbody tr').length===1&&document.querySelector('tbody').textContent.includes('Understanding ecosystems')&&document.querySelector('nav').textContent.includes('1–1 of 1')})()`, 'Table and Pagination: toolbar filtering integration');
  for (const [story, before, after] of [['first-page', 'Previous page', 'Next page'], ['last-page', 'Next page', 'Previous page']]) {
    await check(`components-pagination--${story}`, `(async()=>{const b=document.querySelector('button[aria-label="${before}"]');if(!b.disabled)return false;document.querySelector('button[aria-label="${after}"]').click();${tick}return document.querySelector('button[aria-current=page]').getAttribute('aria-label')==='Page ${story === 'first-page' ? 2 : 11}'})()`, `Pagination ${story}: boundaries and navigation callbacks`);
  }
  await check('components-pagination--with-page-size', `(async()=>{const s=document.querySelector('select');s.value='25';s.dispatchEvent(new Event('change',{bubbles:true}));${tick}return document.querySelector('nav p').textContent==='1–25 of 120 items'&&document.querySelector('button[aria-current]').textContent==='1'})()`, 'Pagination: page-size callback and reset');
  await check('components-pagination--middle-page', `(async()=>{document.querySelector('button[aria-label="Page 1"]').click();${tick}return document.querySelector('[aria-current=page]').textContent==='1'})()`, 'Pagination: direct selection');
  for (const story of ['zero-items', 'one-page']) await check(`components-pagination--${story}`, `document.querySelector('button[aria-label="Previous page"]').disabled&&document.querySelector('button[aria-label="Next page"]').disabled`, `Pagination ${story}: boundaries`);
  const existing = stories.filter(entry => !selected.includes(entry));
  for (const story of existing) { await open(story.id); assert.equal(errors.length, 0, story.id); }
  results.push(`Regression: ${existing.length} existing stories rendered without uncaught runtime exceptions`);
  console.log(JSON.stringify({ passed: results.length, newStories: selected.length, existingStories: existing.length, results }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (socket) socket.close();
  if (browser) browser.kill();
  if (server) server.close();
  // Only this script's unique temporary profile is removed.
  await sleep(300);
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold temporary files. */ }
});
