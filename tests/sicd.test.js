const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'SICD.js'), 'utf8');

function loadScript(userAgent) {
  const browserInfoHtml = [];
  const opsysInfoHtml = [];

  const context = {
    console: { log: function () {} },
    navigator: { userAgent },
    document: {
      getElementsByTagName: function () {
        return [{ innerHTML: 'Dashboard' }];
      },
      createElement: function () {
        return {
          _text: '',
          set innerText(value) {
            this._text = String(value);
            this.innerHTML = this._text
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          },
          get innerText() {
            return this._text;
          },
          innerHTML: ''
        };
      }
    },
    $: function (selector) {
      return {
        append: function (html) {
          if (selector === '.browser-info') {
            browserInfoHtml.push(html);
          }
          if (selector === '.opsys-info') {
            opsysInfoHtml.push(html);
          }
        },
        show: function () {},
        ready: function () {}
      };
    }
  };

  vm.createContext(context);
  vm.runInContext(source, context);

  return {
    context,
    browserInfoHtml,
    opsysInfoHtml
  };
}

(function testVersionComparison() {
  const { context } = loadScript('Mozilla/5.0 Chrome/99.0.4844.51 Safari/537.36');
  assert.strictEqual(context.isVersionAtLeast('99.0.4844.51', '128'), false, 'Chrome 99 should not satisfy Chrome 128 minimum');
  assert.strictEqual(context.isVersionAtLeast('128.0.1', '128'), true, 'Chrome 128 should satisfy Chrome 128 minimum');
  assert.strictEqual(context.isVersionAtLeast('18.0', '18.0.1'), false, 'Safari 18.0 should not satisfy Safari 18.0.1 minimum');
})();

(function testUnsupportedBrowserRendersErrorState() {
  const { context, browserInfoHtml } = loadScript(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
  );
  const systemInfo = context.getSystemInfo();
  browserInfoHtml.length = 0;
  context.showBrowserInfo(systemInfo);
  assert.ok(browserInfoHtml[0].indexOf('sys-alert-error') !== -1, 'Outdated Chrome should render an error alert');
})();

(function testOperatingSystemIconPathMatchesRepositoryCase() {
  const { context } = loadScript('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  assert.strictEqual(
    context.icons['windowsnt10.0'],
    'images/operating_systems/Windows_10.png',
    'Windows icon path should match the repository directory casing'
  );
})();

console.log('All SICD.js tests passed.');
