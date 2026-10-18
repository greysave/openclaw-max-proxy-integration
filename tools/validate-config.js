'use strict';
// Validates an OpenClaw provider config for unsafe shim settings.
const fs = require('fs');

const LOOPBACK = new Set(['127.0.0.1', 'localhost', '[::1]', '::1']);
const TOKEN_RE = /(sk-ant-[A-Za-z0-9_-]{8,}|sk-[A-Za-z0-9]{20,}|oauth|bearer\s+[A-Za-z0-9._-]{16,}|eyJ[A-Za-z0-9_-]{10,}\.)/i;

function walk(node, path, visit) {
  visit(node, path);
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`, visit);
  }
}

function validate(config) {
  const problems = [];
  walk(config, '$', (v, path) => {
    if (typeof v !== 'string') return;
    if (/baseurl$/i.test(path)) {
      let u;
      try { u = new URL(v); } catch { problems.push(`${path}: not a valid URL`); return; }
      if (!LOOPBACK.has(u.hostname)) problems.push(`${path}: host "${u.hostname}" is not loopback`);
    }
    if (/(^|[^0-9])0\.0\.0\.0/.test(v)) problems.push(`${path}: binds/points to 0.0.0.0`);
    if (TOKEN_RE.test(v)) problems.push(`${path}: looks like a credential/token`);
  });
  return problems;
}

module.exports = { validate };

if (require.main === module) {
  const file = process.argv[2];
  if (!file) { console.error('usage: validate-config.js <config.json>'); process.exit(2); }
  const problems = validate(JSON.parse(fs.readFileSync(file, 'utf8')));
  if (problems.length) { problems.forEach((p) => console.error('FAIL ' + p)); process.exit(1); }
  console.log('OK');
}
