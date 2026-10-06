import { readFileSync } from 'node:fs';
import { AveeCare, AveeCareError } from 'aveecare';
import type { FieldSpec, OperationSpec, ResourceSpec } from './spec.js';
import { RESOURCES } from './generated/commands.js';
import { VERSION } from './version.js';

/** Where the CLI reads and writes. Replaced in tests. */
export interface IO {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  readStdin: () => Promise<string>;
  env: Record<string, string | undefined>;
}

/** A mistake in the command line. Printed with a hint and exit code 2. */
class UsageError extends Error {
  constructor(
    message: string,
    readonly hint?: string,
  ) {
    super(message);
  }
}

const GLOBAL_VALUE_FLAGS = new Set(['api-key', 'base-url', 'timeout', 'max-retries', 'idempotency-key', 'data', 'clear']);
const GLOBAL_SWITCHES = new Set(['all', 'help', 'version', 'compact']);

interface Parsed {
  positionals: string[];
  /** Flag name to every value given, in order. A switch has the value `true`. */
  flags: Map<string, (string | true)[]>;
}

/**
 * Splits argv into positionals and flags. `takesValue` says whether a flag
 * consumes the next token; `optionalValue` flags (booleans) consume it only
 * when it is `true` or `false`.
 */
function parse(argv: readonly string[], takesValue: (flag: string) => 'yes' | 'no' | 'optional' | 'unknown'): Parsed {
  const positionals: string[] = [];
  const flags = new Map<string, (string | true)[]>();
  const add = (flag: string, value: string | true) => {
    const list = flags.get(flag) ?? [];
    list.push(value);
    flags.set(flag, list);
  };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]!;
    if (token === '--') {
      positionals.push(...argv.slice(i + 1));
      break;
    }
    if (token === '-h') {
      add('help', true);
      continue;
    }
    if (token === '-v') {
      add('version', true);
      continue;
    }
    if (!token.startsWith('--') || token === '-') {
      positionals.push(token);
      continue;
    }
    const eq = token.indexOf('=');
    const name = eq === -1 ? token.slice(2) : token.slice(2, eq);
    if (eq !== -1) {
      add(name, token.slice(eq + 1));
      continue;
    }
    const kind = takesValue(name);
    if (kind === 'unknown') throw new UsageError(`Unknown flag --${name}.`, 'Run with --help to see the flags for this command.');
    if (kind === 'no') {
      add(name, true);
    } else if (kind === 'optional') {
      const next = argv[i + 1];
      if (next === 'true' || next === 'false') {
        add(name, next);
        i++;
      } else {
        add(name, true);
      }
    } else {
      const next = argv[i + 1];
      if (next === undefined) throw new UsageError(`--${name} needs a value.`);
      add(name, next);
      i++;
    }
  }
  return { positionals, flags };
}

function convert(field: FieldSpec, raw: string | true): unknown {
  const text = raw === true ? (field.type === 'boolean' ? 'true' : '') : raw;
  const fail = (what: string): never => {
    throw new UsageError(`--${field.flag} must be ${what}; got "${text}".`);
  };
  switch (field.type) {
    case 'integer':
      return /^-?\d+$/.test(text) ? Number(text) : fail('a whole number');
    case 'number': {
      const n = Number(text);
      return text.trim() !== '' && Number.isFinite(n) ? n : fail('a number');
    }
    case 'boolean':
      return text === 'true' ? true : text === 'false' ? false : fail('true or false');
    case 'enum':
      if (field.values && !field.values.includes(text)) {
        const close = field.values.find((v) => v.toLowerCase() === text.toLowerCase());
        throw new UsageError(
          `--${field.flag} must be one of ${field.values.join(', ')}; got "${text}".`,
          close ? `Did you mean ${close}? Values are case-sensitive.` : undefined,
        );
      }
      return text;
    case 'json':
      try {
        return JSON.parse(text);
      } catch {
        return fail('JSON');
      }
    default:
      if (raw === true) fail('a value');
      return text;
  }
}

/** Reads the flags that belong to `fields` into an object keyed by API name. */
function collect(fields: readonly FieldSpec[], flags: Parsed['flags']): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    const given = flags.get(field.flag);
    if (!given) continue;
    if (field.array && field.type !== 'json') out[field.wire] = given.map((v) => convert(field, v));
    else if (given.length > 1) throw new UsageError(`--${field.flag} was given more than once.`);
    else out[field.wire] = convert(field, given[0]!);
  }
  return out;
}

async function readData(source: string, io: IO): Promise<Record<string, unknown>> {
  let text: string;
  if (source === '-') text = await io.readStdin();
  else if (source.startsWith('@')) {
    try {
      text = readFileSync(source.slice(1), 'utf8');
    } catch (err) {
      throw new UsageError(`Could not read ${source.slice(1)}: ${(err as Error).message}`);
    }
  } else text = source;
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new UsageError('--data must be a JSON object.', 'Pass JSON, @file.json, or - to read standard input.');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new UsageError('--data must be a JSON object.');
  return value as Record<string, unknown>;
}

const first = (flags: Parsed['flags'], name: string): string | undefined => {
  const v = flags.get(name);
  if (!v) return undefined;
  if (v.length > 1) throw new UsageError(`--${name} was given more than once.`);
  return v[0] === true ? undefined : v[0];
};

// ---------------------------------------------------------------------------
// Help

const wrapText = (text: string, width: number, indent: string): string => {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if (line && line.length + 1 + w.length > width) {
      lines.push(line);
      line = w;
    } else line = line ? `${line} ${w}` : w;
  }
  if (line) lines.push(line);
  return lines.map((l) => indent + l).join('\n');
};

const GLOBAL_HELP = `Global flags:
  --api-key <key>          Your secret key. Defaults to AVEECARE_API_KEY.
  --base-url <url>         Defaults to AVEECARE_BASE_URL, then https://api.aveecare.com.
  --timeout <seconds>      Per-attempt timeout. Default 60.
  --max-retries <n>        Retries for 429, 5xx and network errors. Default 2.
  --compact                Print JSON on one line.
  -h, --help               Show help.
  -v, --version            Show the version.`;

function rootHelp(): string {
  const width = Math.max(...RESOURCES.map((r) => r.name.length));
  return [
    `AveeCare CLI ${VERSION}: work with your AveeCare data from the terminal.`,
    '',
    'Usage: aveecare <resource> <action> [id] [flags]',
    '',
    'Resources:',
    ...RESOURCES.map((r) => `  ${r.name.padEnd(width)}  ${r.ops.map((o) => o.action).join(', ')}`),
    '',
    GLOBAL_HELP,
    '',
    'Examples:',
    '  aveecare patients list --active --limit 10',
    '  aveecare patients retrieve <id>',
    '  aveecare visits list --start-from 2026-10-01T00:00:00Z --start-to 2026-10-08T00:00:00Z --all',
    '',
    'Docs: https://www.aveecare.com/docs/api',
  ].join('\n');
}

function resourceHelp(resource: ResourceSpec): string {
  const width = Math.max(...resource.ops.map((o) => o.action.length));
  return [
    `Usage: aveecare ${resource.name} <action> [flags]`,
    '',
    ...(resource.description ? [wrapText(resource.description, 78, ''), ''] : []),
    'Actions:',
    ...resource.ops.map((o) => `  ${o.action.padEnd(width)}  ${o.summary}`),
    '',
    `Run "aveecare ${resource.name} <action> --help" for its flags.`,
  ].join('\n');
}

function fieldLine(f: FieldSpec): string {
  const value = f.type === 'boolean' ? ' [true|false]' : f.type === 'enum' ? ' <value>' : f.type === 'json' ? ' <json>' : ` <${f.type === 'string' ? 'text' : f.type}>`;
  const notes = [f.description ?? ''];
  if (f.values) notes.push(`One of: ${f.values.join(', ')}.`);
  if (f.array && f.type !== 'json') notes.push('Repeat to send several.');
  if (f.nullable) notes.push(`--clear ${f.flag} sends null.`);
  const head = `  --${f.flag}${value}${f.required ? '  (required)' : ''}`;
  return `${head}\n${wrapText(notes.filter(Boolean).join(' '), 74, '      ')}`;
}

function operationHelp(resource: ResourceSpec, op: OperationSpec): string {
  const ids = op.pathParams.map((p) => ` <${p}>`).join('');
  const lines = [`Usage: aveecare ${resource.name} ${op.action}${ids} [flags]`, '', op.summary];
  if (op.description) lines.push('', wrapText(op.description, 78, ''));
  if (op.query.length) lines.push('', 'Flags:', ...op.query.map(fieldLine));
  if (op.body) {
    lines.push('', 'Fields:', ...op.body.fields.map(fieldLine));
    lines.push('', '  --data <json|@file|->', '      The request body as JSON. Flags override its fields.');
    if (op.body.fields.some((f) => f.nullable)) lines.push('  --clear <flag>', '      Send null for a field, clearing it. Repeat to clear several.');
  }
  if (op.kind === 'list') lines.push('', '  --all', '      Fetch every page and print one JSON object per line.');
  if (op.method === 'POST') lines.push('  --idempotency-key <key>', '      Reuse a key to make this create safe to repeat.');
  lines.push('', GLOBAL_HELP);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------

export async function run(argv: readonly string[], io: IO): Promise<number> {
  try {
    return await execute(argv, io);
  } catch (err) {
    if (err instanceof UsageError) {
      io.stderr(`aveecare: ${err.message}\n${err.hint ? `${err.hint}\n` : ''}`);
      return 2;
    }
    if (err instanceof AveeCareError) {
      const details = [
        err.status !== undefined ? `status ${err.status}` : '',
        err.code ? `code ${err.code}` : '',
        err.requestId ? `request ${err.requestId}` : '',
      ].filter(Boolean);
      io.stderr(`aveecare: ${err.message}${details.length ? ` (${details.join(', ')})` : ''}\n`);
      return 1;
    }
    throw err;
  }
}

async function execute(argv: readonly string[], io: IO): Promise<number> {
  // Find the resource and action first; they decide which flags exist.
  const pre = parse(argv, (flag) => (GLOBAL_VALUE_FLAGS.has(flag) ? 'yes' : GLOBAL_SWITCHES.has(flag) ? 'no' : 'optional'));
  const [resourceName, actionName] = pre.positionals;
  if (pre.flags.has('version') && !resourceName) {
    io.stdout(`${VERSION}\n`);
    return 0;
  }
  if (!resourceName) {
    io.stdout(`${rootHelp()}\n`);
    return pre.flags.has('help') ? 0 : 2;
  }
  const resource = RESOURCES.find((r) => r.name === resourceName);
  if (!resource) {
    const close = RESOURCES.find((r) => r.name.startsWith(resourceName.slice(0, 4)));
    throw new UsageError(`Unknown resource "${resourceName}".`, close ? `Did you mean ${close.name}? Run "aveecare --help" for the list.` : 'Run "aveecare --help" for the list.');
  }
  // A resource with a single action (such as `me`) runs it without naming it.
  const implicit = resource.ops.length === 1 && (actionName === undefined || actionName !== resource.ops[0]!.action);
  const op = implicit ? resource.ops[0]! : resource.ops.find((o) => o.action === actionName);
  if (!op) {
    if (actionName === undefined || pre.flags.has('help')) {
      io.stdout(`${resourceHelp(resource)}\n`);
      return actionName === undefined && !pre.flags.has('help') ? 2 : 0;
    }
    throw new UsageError(`${resource.name} has no action "${actionName}".`, `Actions: ${resource.ops.map((o) => o.action).join(', ')}.`);
  }
  if (pre.flags.has('help')) {
    io.stdout(`${operationHelp(resource, op)}\n`);
    return 0;
  }

  const fields = [...op.query, ...(op.body?.fields ?? [])];
  const byFlag = new Map(fields.map((f) => [f.flag, f]));
  const listOnly = new Set(op.kind === 'list' ? ['all'] : []);
  const { positionals, flags } = parse(argv, (flag) => {
    if (GLOBAL_VALUE_FLAGS.has(flag)) return 'yes';
    if (GLOBAL_SWITCHES.has(flag) && (flag !== 'all' || listOnly.has('all'))) return 'no';
    const field = byFlag.get(flag);
    if (!field) return 'unknown';
    return field.type === 'boolean' ? 'optional' : 'yes';
  });

  const ids = positionals.slice(implicit && positionals[1] !== op.action ? 1 : 2);
  if (ids.length < op.pathParams.length) {
    throw new UsageError(`Missing <${op.pathParams[ids.length]}>.`, `Usage: aveecare ${resource.name} ${op.action}${op.pathParams.map((p) => ` <${p}>`).join('')}`);
  }
  if (ids.length > op.pathParams.length) throw new UsageError(`Unexpected argument "${ids[op.pathParams.length]}".`);
  let path = op.path;
  op.pathParams.forEach((p, i) => {
    path = path.replace(`{${p}}`, encodeURIComponent(ids[i]!));
  });

  const query = collect(op.query, flags);
  for (const q of op.query) {
    if (q.required && query[q.wire] === undefined) throw new UsageError(`--${q.flag} is required.`);
  }

  let body: Record<string, unknown> | undefined;
  if (op.body) {
    const data = first(flags, 'data');
    body = { ...(data !== undefined ? await readData(data, io) : {}), ...collect(op.body.fields, flags) };
    for (const name of flags.get('clear') ?? []) {
      const field = op.body.fields.find((f) => f.flag === name || f.wire === name);
      if (!field) throw new UsageError(`--clear ${String(name)}: there is no such field.`);
      if (!field.nullable) throw new UsageError(`--clear ${String(name)}: ${field.flag} cannot be cleared.`);
      body[field.wire] = null;
    }
    const missing = op.body.fields.filter((f) => f.required && body![f.wire] === undefined);
    if (missing.length) throw new UsageError(`Missing required ${missing.map((f) => `--${f.flag}`).join(', ')}.`);
  } else if (flags.has('data') || flags.has('clear')) {
    throw new UsageError(`${resource.name} ${op.action} takes no request body.`);
  }
  if (flags.has('idempotency-key') && op.method !== 'POST') throw new UsageError('--idempotency-key only applies to create.');

  const timeout = first(flags, 'timeout');
  const maxRetries = first(flags, 'max-retries');
  if (timeout !== undefined && !(Number(timeout) > 0)) throw new UsageError('--timeout must be a positive number of seconds.');
  if (maxRetries !== undefined && !/^\d+$/.test(maxRetries)) throw new UsageError('--max-retries must be zero or more.');
  const apiKey = first(flags, 'api-key') ?? io.env['AVEECARE_API_KEY'];
  if (!apiKey) {
    throw new UsageError('No API key.', 'Set AVEECARE_API_KEY or pass --api-key. Create a key in AveeCare under Settings > API Keys.');
  }
  const client = new AveeCare({
    apiKey,
    baseURL: first(flags, 'base-url') ?? io.env['AVEECARE_BASE_URL'],
    timeout: timeout !== undefined ? Number(timeout) * 1000 : undefined,
    maxRetries: maxRetries !== undefined ? Number(maxRetries) : undefined,
    defaultHeaders: { 'User-Agent': `aveecare-cli/${VERSION}` },
  });
  const idempotencyKey = first(flags, 'idempotency-key');
  const options = idempotencyKey ? { idempotencyKey } : undefined;
  const compact = flags.has('compact');
  const print = (value: unknown) => io.stdout(`${compact ? JSON.stringify(value) : JSON.stringify(value, null, 2)}\n`);

  if (op.kind === 'list') {
    const pages = client.getList<unknown>(path, query as Record<string, string>, options);
    if (flags.has('all')) {
      for await (const item of pages) io.stdout(`${JSON.stringify(item)}\n`);
    } else {
      const page = await pages;
      print({ object: 'list', data: page.data, next_cursor: page.nextCursor, has_more: page.hasMore });
    }
    return 0;
  }
  const result = await client.request<unknown>(
    { method: op.method, path, query: Object.keys(query).length ? (query as Record<string, string>) : undefined, body },
    options,
  );
  if (op.kind === 'object' && result !== undefined) print(result);
  return 0;
}
