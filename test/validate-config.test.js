'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { validate } = require('../tools/validate-config.js');

const mk = (baseUrl, apiKey = 'unused-placeholder') => ({ p: { baseUrl, apiKey } });

test('shipped example passes', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../examples/openclaw-provider.example.json'), 'utf8'));
  assert.deepStrictEqual(validate(cfg), []);
});
test('loopback accepted', () => {
  assert.deepStrictEqual(validate(mk('http://localhost:3456/v1')), []);
});
test('non-loopback rejected', () => {
  assert.ok(validate(mk('http://192.0.2.10:3456/v1')).length > 0);
  assert.ok(validate(mk('https://shim.example.invalid/v1')).length > 0);
});
test('0.0.0.0 rejected', () => {
  assert.ok(validate(mk('http://0.0.0.0:3456/v1')).length > 0);
});
test('token-like values rejected', () => {
  assert.ok(validate(mk('http://127.0.0.1:3456/v1', 'sk-ant-api03-AAAAAAAAAAAA')).length > 0);
  assert.ok(validate(mk('http://127.0.0.1:3456/v1', 'Bearer abcdefghijklmnopqrstuv')).length > 0);
});
test('invalid URL rejected', () => {
  assert.ok(validate(mk('not a url')).length > 0);
});
