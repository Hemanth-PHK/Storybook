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
      if (await evaluate(`window.__STORYBOOK_PREVIEW__?.currentRender?.id === ${JSON.stringify(id)} && document.getElementById('storybook-root')?.children.length > 0 && !document.querySelector('.sb-errordisplay')?.checkVisibility()`)) { await sleep(80); return; }
      await sleep(100);
    }
    throw new Error(`Story did not render: ${id}; ${await evaluate('document.body.innerText.slice(0,3000)')}; exceptions: ${errors.join(', ')}`);
  }
  const selected = stories.filter(entry => /^Components\/(ErrorState|QuizCard|Avatar|ProgressBar|EmptyState)$/.test(entry.title));
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

  await check('components-quizcard--default', `(async()=>{const radios=[...document.querySelectorAll('input')];radios[1].click();${tick}return radios[1].checked&&!radios[0].checked})()`, 'Quiz: controlled selection callback');
  await evaluate(`document.querySelector('#storybook-root input').focus()`);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
  await sleep(60);
  assert(await evaluate(`document.querySelectorAll('#storybook-root input')[1].checked`));
  results.push('Quiz: real arrow keyboard selection');
  await check('components-quizcard--disabled', `Array.from(document.querySelectorAll('input')).every(i=>i.matches(':disabled'))`, 'Quiz: disabled fieldset');
  await check('components-quizcard--disabled-option', `(async()=>{let i=document.querySelector('input');i.click();${tick}return i.disabled&&!i.checked})()`, 'Quiz: disabled option');
  await check('components-quizcard--submission', `(async()=>{let b=document.querySelector('button');if(!b.disabled)return false;document.querySelector('input').click();${tick}b.click();b.click();${tick}return b.disabled&&document.querySelector('[role=status]').textContent==='Answer submitted for assessment.'&&document.querySelector('input').matches(':disabled')})()`, 'Quiz: submission requires selection and locks repeated submission');
  await check('components-quizcard--validation-error', `(async()=>{
    if(document.querySelector('[role=alert]'))return false;
    document.querySelector('button').click();${tick}
    let f=document.querySelector('fieldset'),alert=document.querySelector('[role=alert]');
    if(alert?.textContent.trim()!=='Select an answer to continue.'||f.nextElementSibling!==alert||document.getElementById(f.getAttribute('aria-describedby'))!==alert)return false;
    document.querySelector('input').click();${tick}
    return !document.querySelector('[role=alert]')&&!f.hasAttribute('aria-describedby')&&!document.querySelector('input').hasAttribute('aria-invalid');
  })()`, 'Quiz: validation appears only after submit, follows options, clears on selection');
  await check('components-quizcard--incorrect-feedback', `(async()=>{
    let radios=[...document.querySelectorAll('input')];radios[1].click();${tick}
    let button=document.querySelector('button');button.click();button.click();${tick}
    if(!button.disabled||!radios[1].matches(':disabled')||document.querySelector('[role=status]').textContent!=='Submitting answer...')return false;
    await new Promise(r=>setTimeout(r,700));
    let retry=document.querySelector('button');
    if(document.querySelector('[role=status]').textContent!=='Incorrect answer. Try again.'||retry.textContent!=='Retry'||!radios[1].checked||!radios[1].closest('label').classList.contains('border-danger')||!radios[1].closest('label').textContent.includes('Incorrect')||document.getElementById('storybook-root').textContent.includes('interactive form control'))return false;
    retry.click();${tick}
    if(!radios[1].checked||radios[1].matches(':disabled')||document.querySelector('[role=status]'))return false;
    radios[0].click();${tick}document.querySelector('button').click();
    await new Promise(r=>setTimeout(r,700));
    return document.querySelector('[role=status]').textContent==='Correct answer.'&&radios[0].closest('label').classList.contains('border-success')&&document.querySelector('button').disabled&&document.getElementById('storybook-root').textContent.includes('A button is an interactive form control.');
  })()`, 'Quiz: pending lock, incorrect retained/highlighted, retry, correct finalization and gated explanation');
  await check('components-quizcard--correct-feedback', `(async()=>{document.querySelector('input').focus();return !document.querySelector('[role=status]')})()`, 'Quiz: correct feedback initially hidden, keyboard focus');
  await send('Input.dispatchKeyEvent', { type:'keyDown', key:' ', code:'Space', text:' ', windowsVirtualKeyCode:32 });
  await send('Input.dispatchKeyEvent', { type:'keyUp', key:' ', code:'Space', windowsVirtualKeyCode:32 });
  await sleep(60);
  assert(await evaluate(`document.querySelector('#storybook-root input').checked`));
  await evaluate(`document.querySelector('#storybook-root button').focus()`);
  await send('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', text:'\r', windowsVirtualKeyCode:13 });
  await send('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 });
  await sleep(750);
  assert(await evaluate(`document.querySelector('#storybook-root [role=status]').textContent==='Correct answer.'&&document.querySelector('#storybook-root button').disabled`));
  results.push('Quiz: real Space selection and Enter submission finalize answer');
  await check('components-errorstate--loading-retry', `(async()=>{let b=document.querySelector('button');b.focus();return true})()`, 'Retry: focusable action');
  await send('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', text:'\r', windowsVirtualKeyCode:13 });
  await send('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 });
  await sleep(60);
  assert(await evaluate(`document.querySelector('#storybook-root button').disabled`));
  results.push('Retry: real Enter activates loading and disables action');
  await check('components-avatar--broken-image-fallback', `(async()=>{${tick}return !document.querySelector('img')&&document.querySelector('[role=img]').textContent==='RG'&&document.querySelector('[role=img]').getAttribute('aria-label')==='Ramesh Goud'})()`, 'Avatar: broken image accessible initials');
  await check('components-avatar--image', `document.querySelector('img').complete&&document.querySelector('img').naturalWidth>0`, 'Avatar: image loads');
  await check('components-avatar--all-sizes', `(()=>{let a=[...document.querySelectorAll('span.inline-flex')];return a.length===3&&a.every((e,i)=>e.clientWidth===[30,46,62][i]&&getComputedStyle(e).borderRadius==='9999px')})()`, 'Avatar: circular supported sizes');
  await check('components-progressbar--milestones', `Array.from(document.querySelectorAll('[role=progressbar]')).every((e,i)=>Number(e.getAttribute('aria-valuenow'))===[0,25,50,75,100][i]&&e.getAttribute('aria-valuemin')==='0'&&e.getAttribute('aria-valuemax')==='100')`, 'Progress: milestones and ARIA');
  await check('components-progressbar--invalid-values', `Array.from(document.querySelectorAll('[role=progressbar]')).every((e,i)=>Number(e.getAttribute('aria-valuenow'))===[0,100,0,100,0][i])`, 'Progress: invalid numeric values clamped');
  await check('components-emptystate--title-only', `(()=>{let g=document.querySelector('[role=group]');return document.getElementById(g.getAttribute('aria-labelledby')).textContent==='No courses yet'&&!g.hasAttribute('aria-describedby')})()`, 'EmptyState: optional content and accessible title');
  fs.mkdirSync(path.join(root, 'qa'), { recursive:true });
  await send('Emulation.setDeviceMetricsOverride', { width:320, height:900, deviceScaleFactor:1, mobile:false });
  for (const state of ['validation-error', 'incorrect-feedback', 'correct-feedback']) {
    await open(`components-quizcard--${state}`);
    if (state !== 'validation-error') await evaluate(`document.querySelectorAll('#storybook-root input')[${state === 'incorrect-feedback' ? 1 : 0}].click()`);
    await sleep(60);
    await evaluate(`document.querySelector('#storybook-root button').click()`);
    await sleep(750);
    const screenshot=await send('Page.captureScreenshot', {format:'png'});
    fs.writeFileSync(path.join(root,'qa',`quizcard-${state}-320.png`), Buffer.from(screenshot.data,'base64'));
  }
  for (const width of [320,1440]) {
    await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
    for (const component of ['errorstate','quizcard','avatar','progressbar','emptystate']) {
      const id = `components-${component}--${component==='avatar'?'all-sizes':component==='emptystate'?'with-action':component==='quizcard'?'submission':component==='progressbar'?'milestones':'loading-retry'}`;
      await open(id);
      for (const theme of ['scholar-indigo','teal-focus','warm-academy','violet-scholar','forest-growth','midnight-study']) {
        await evaluate(`document.documentElement.setAttribute('data-theme', '${theme}')`);
        await sleep(350);
        assert(await evaluate(`(()=>{const root=document.getElementById('storybook-root');const style=getComputedStyle(root);const probe=document.createElement('span');probe.style.color=style.getPropertyValue('--color-text');root.append(probe);const expected=getComputedStyle(probe).color;probe.remove();return style.color===expected})()`), `${component}: text follows ${theme}`);
        if (['scholar-indigo','midnight-study'].includes(theme)) {
          const screenshot=await send('Page.captureScreenshot',{format:'png'});
          fs.writeFileSync(path.join(root,'qa',`${component}-${width}-${theme}.png`),Buffer.from(screenshot.data,'base64'));
        }
      }
    }
  }
  results.push('All five components rendered in six themes; 20 mobile/desktop screenshots captured');
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
