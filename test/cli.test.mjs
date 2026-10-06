// Runs the built CLI (dist/cli.js) as a child process against a local HTTP
// server that records every request and answers from a queue.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLI = fileURLToPath(new URL('../dist/cli.js', import.meta.url));
const KEY = 'ak_test1234_secretsecret';

let server;
let baseURL;
const requests = [];
const queue = [];

before(async () => {
  server = createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      requests.push({ method: req.method, url: req.url, headers: req.headers, body: body ? JSON.parse(body) : undefined });
      const next = queue.shift() ?? { status: 500, json: { error: { type: 'api_error', code: 'internal_error', message: 'nothing queued' } } };
      res.writeHead(next.status, { 'content-type': 'application/json', 'request-id': 'req_test', ...(next.headers ?? {}) });
      res.end(next.json === undefined ? '' : JSON.stringify(next.json));
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseURL = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

function reply(status, json, headers) {
  queue.push({ status, json, headers });
}

function cli(args, { input, env = {} } = {}) {
  requests.length = 0;
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [CLI, ...args], {
      env: { ...process.env, AVEECARE_API_KEY: KEY, AVEECARE_BASE_URL: baseURL, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.stdin.end(input ?? '');
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

const patient = (id, extra = {}) => ({ object: 'patient', id, firstName: 'Margaret', lastName: 'Alvarez', ...extra });
const list = (data, next = null) => ({ object: 'list', data, next_cursor: next, has_more: next !== null });

test('help and version need no key and exit 0', async () => {
  const help = await cli(['--help'], { env: { AVEECARE_API_KEY: '' } });
  assert.equal(help.code, 0);
  assert.match(help.stdout, /Usage: aveecare <resource> <action>/);
  assert.match(help.stdout, /care-plans\s+list, create, retrieve, update, delete/);
  const op = await cli(['visits', 'list', '--help']);
  assert.equal(op.code, 0);
  assert.match(op.stdout, /--start-from <text>\s+\(required\)/);
  assert.match(op.stdout, /--all/);
  const version = await cli(['--version']);
  assert.equal(version.stdout.trim(), '0.1.0');
  assert.equal(requests.length, 0);
});

test('list sends typed filters and prints the page', async () => {
  reply(200, list([patient('pat_1')], 'c2'));
  const r = await cli(['patients', 'list', '--active', '--lifecycle-stage', 'Prospect', '--limit', '10']);
  assert.equal(r.code, 0, r.stderr);
  assert.equal(requests[0].url, '/v1/patients?active=true&lifecycle_stage=Prospect&limit=10');
  assert.equal(requests[0].headers.authorization, `Bearer ${KEY}`);
  assert.match(requests[0].headers['user-agent'], /^aveecare-cli\/0\.1\.0/);
  assert.deepEqual(JSON.parse(r.stdout), list([patient('pat_1')], 'c2'));
});

test('--all follows cursors and prints one object per line', async () => {
  reply(200, list([patient('pat_1'), patient('pat_2')], 'c2'));
  reply(200, list([patient('pat_3')]));
  const r = await cli(['patients', 'list', '--active', 'false', '--all']);
  assert.equal(r.code, 0, r.stderr);
  assert.deepEqual(requests.map((q) => q.url), ['/v1/patients?active=false', '/v1/patients?active=false&cursor=c2']);
  assert.deepEqual(r.stdout.trim().split('\n').map((l) => JSON.parse(l).id), ['pat_1', 'pat_2', 'pat_3']);
});

test('create sends only the given fields, typed, with an idempotency key', async () => {
  reply(201, patient('pat_9'));
  const r = await cli(['patients', 'create', '--first-name', 'Margaret', '--last-name', 'Alvarez', '--active', 'false', '--compact']);
  assert.equal(r.code, 0, r.stderr);
  assert.equal(requests[0].method, 'POST');
  assert.deepEqual(requests[0].body, { firstName: 'Margaret', lastName: 'Alvarez', active: false });
  assert.match(requests[0].headers['idempotency-key'], /^[0-9a-f-]{36}$/);
  assert.equal(r.stdout, `${JSON.stringify(patient('pat_9'))}\n`);

  reply(201, patient('pat_9'));
  await cli(['patients', 'create', '--first-name', 'A', '--last-name', 'B', '--idempotency-key', 'import-row-1042']);
  assert.equal(requests[0].headers['idempotency-key'], 'import-row-1042');
});

test('repeated flags send arrays', async () => {
  reply(201, { object: 'visit', id: 'vis_1' });
  const r = await cli([
    'visits', 'create',
    '--patient-id', 'pat_1', '--start-time', '2026-10-06T15:00:00Z', '--end-time', '2026-10-06T17:00:00Z',
    '--tasks', 'Bathing', '--tasks', 'Meal preparation',
  ]);
  assert.equal(r.code, 0, r.stderr);
  assert.deepEqual(requests[0].body.tasks, ['Bathing', 'Meal preparation']);
});

test('--data from a file or stdin merges under flags, and --clear sends null', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'aveecare-cli-test-'));
  try {
    const file = join(dir, 'body.json');
    writeFileSync(file, JSON.stringify({ city: 'Phoenix', primaryLanguage: 'Spanish' }));
    reply(200, patient('pat_1'));
    const r = await cli(['patients', 'update', 'pat_1', '--data', `@${file}`, '--city', 'Tucson', '--clear', 'email']);
    assert.equal(r.code, 0, r.stderr);
    assert.equal(requests[0].method, 'PATCH');
    assert.equal(requests[0].url, '/v1/patients/pat_1');
    assert.equal(requests[0].headers['idempotency-key'], undefined);
    assert.deepEqual(requests[0].body, { city: 'Tucson', primaryLanguage: 'Spanish', email: null });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  reply(200, patient('pat_1'));
  const piped = await cli(['patients', 'update', 'pat_1', '--data', '-'], { input: '{"gender":"Female"}' });
  assert.equal(piped.code, 0, piped.stderr);
  assert.deepEqual(requests[0].body, { gender: 'Female' });
});

test('mistakes exit 2 without calling the API', async () => {
  const cases = [
    [['patients', 'create', '--first-name', 'A'], /Missing required --last-name/],
    [['patients', 'list', '--nope', 'x'], /Unknown flag --nope/],
    [['patients', 'list', '--limit', 'ten'], /--limit must be a whole number/],
    [['patients', 'retrieve'], /Missing <id>/],
    [['patients', 'frobnicate'], /has no action "frobnicate"/],
    [['patint', 'list'], /Unknown resource "patint"/],
    [['visits', 'list'], /--start-from is required/],
    [['patients', 'update', 'pat_1', '--clear', 'first-name'], /first-name cannot be cleared/],
    [['patients', 'retrieve', 'pat_1', '--data', '{}'], /takes no request body/],
    [['patients', 'retrieve', 'pat_1', '--all'], /Unknown flag --all/],
    [['patients', 'update', 'pat_1', '--data', '[1]'], /--data must be a JSON object/],
  ];
  for (const [args, message] of cases) {
    const r = await cli(args);
    assert.equal(r.code, 2, `${args.join(' ')}: ${r.stderr}`);
    assert.match(r.stderr, message);
    assert.equal(requests.length, 0, args.join(' '));
  }
  const noKey = await cli(['patients', 'list'], { env: { AVEECARE_API_KEY: '' } });
  assert.equal(noKey.code, 2);
  assert.match(noKey.stderr, /AVEECARE_API_KEY/);
});

test('API errors exit 1 with the code and request ID', async () => {
  reply(404, { error: { type: 'invalid_request_error', code: 'not_found', message: 'No such patient.', request_id: 'req_abc' } });
  const r = await cli(['patients', 'retrieve', 'a/b c', '--max-retries', '0']);
  assert.equal(r.code, 1);
  assert.equal(requests[0].url, '/v1/patients/a%2Fb%20c');
  assert.match(r.stderr, /No such patient\. \(status 404, code not_found, request req_abc\)/);
  assert.equal(r.stdout, '');
});

test('a resource with one action runs it without naming it', async () => {
  reply(200, { object: 'api_key', id: 'key_1' });
  const r = await cli(['me']);
  assert.equal(r.code, 0, r.stderr);
  assert.equal(requests[0].url, '/v1/me');
  reply(200, { object: 'api_key', id: 'key_1' });
  assert.equal((await cli(['me', 'retrieve'])).code, 0);
});

test('--api-key and --base-url override the environment', async () => {
  reply(200, { object: 'api_key', id: 'key_1' });
  const r = await cli(['me', '--api-key', 'ak_other_key', '--base-url', baseURL], { env: { AVEECARE_API_KEY: '', AVEECARE_BASE_URL: 'http://127.0.0.1:1' } });
  assert.equal(r.code, 0, r.stderr);
  assert.equal(requests[0].headers.authorization, 'Bearer ak_other_key');
});
