// Builds the standalone release tarball that the Linux and Homebrew packages
// install: release/aveecare-cli-<version>.tar.gz holding one executable file,
// aveecare.cjs, with the CLI and the aveecare SDK bundled in, plus the man page
// aveecare.1. It needs only Node.js 18 or newer at run time, so packages depend
// on nodejs and nothing else.
//
// Run `npm run build` first; the bundle is made from dist/, the same code the
// tests run. The tarball is reproducible: entries are sorted, owned by root and
// stamped with the commit time (SOURCE_DATE_EPOCH) instead of the build time.
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(`${root}package.json`, 'utf8'));
const sdk = JSON.parse(readFileSync(`${root}node_modules/aveecare/package.json`, 'utf8'));
const name = `aveecare-cli-${pkg.version}`;
const outDir = `${root}release`;

const mtime = Number(
  process.env.SOURCE_DATE_EPOCH ?? execFileSync('git', ['log', '-1', '--format=%ct'], { cwd: root, encoding: 'utf8' }).trim(),
);

const result = await build({
  entryPoints: [`${root}dist/cli.js`],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  write: false,
  legalComments: 'none',
  banner: {
    js: `// aveecare-cli ${pkg.version}, bundled with the aveecare SDK ${sdk.version}.\n// https://github.com/aveecare/aveecare-cli. MIT License.`,
  },
});
const bundle = result.outputFiles[0].contents;
// esbuild keeps the entry point's shebang as the first line.
if (!Buffer.from(bundle.subarray(0, 19)).toString().startsWith('#!/usr/bin/env node')) {
  throw new Error('bundle lost its #!/usr/bin/env node line');
}

// The man page wraps the CLI's own --help text, so it never drifts from it.
const help = execFileSync(process.execPath, [`${root}dist/cli.js`, '--help'], { encoding: 'utf8' });
const roff = (text) =>
  text
    .replace(/\\/g, '\\e')
    .replace(/-/g, '\\-')
    .split('\n')
    .map((line) => (/^[.']/.test(line) ? `\\&${line}` : line))
    .join('\n');
const date = new Date(mtime * 1000).toISOString().slice(0, 10);
// String.raw keeps roff's backslash escapes such as \- intact.
const manPage = String.raw`.TH AVEECARE 1 "${date}" "aveecare-cli ${pkg.version}" "User Commands"
.SH NAME
aveecare \- command line tool for the AveeCare home care API
.SH SYNOPSIS
.B aveecare
.I resource action
.RI [ id ]
.RI [ flags ]
.SH DESCRIPTION
.B aveecare
lists, creates, updates and deletes a home care agency's patients, visits,
caregivers, invoices and more through the AveeCare API. Results are printed as
JSON on standard output.
.PP
Run
.B aveecare
.I resource
.B \-\-help
to see a resource's actions, and
.B aveecare
.I resource action
.B \-\-help
to see an action's flags.
.PP
.nf
${roff(help.trimEnd())}
.fi
.SH ENVIRONMENT
.TP
.B AVEECARE_API_KEY
The secret API key, used when
.B \-\-api\-key
is not given. Create one in AveeCare under Settings > API Keys.
.TP
.B AVEECARE_BASE_URL
The API address, used when
.B \-\-base\-url
is not given. Defaults to https://api.aveecare.com.
.SH EXIT STATUS
.TP
.B 0
Success.
.TP
.B 1
The API returned an error or could not be reached. The message on standard
error includes the HTTP status, error code and request ID.
.TP
.B 2
The command line was wrong, such as an unknown flag or a missing API key.
.SH SEE ALSO
.BR jq (1)
.PP
https://www.aveecare.com/docs/api
`;

const files = [
  { path: `${name}/`, mode: 0o755 },
  { path: `${name}/CHANGELOG.md`, mode: 0o644, data: readFileSync(`${root}CHANGELOG.md`) },
  { path: `${name}/LICENSE`, mode: 0o644, data: readFileSync(`${root}LICENSE`) },
  { path: `${name}/README.md`, mode: 0o644, data: readFileSync(`${root}README.md`) },
  { path: `${name}/aveecare.1`, mode: 0o644, data: Buffer.from(manPage) },
  { path: `${name}/aveecare.cjs`, mode: 0o755, data: Buffer.from(bundle) },
];

/** One ustar header block plus the file's data padded to 512 bytes. */
function tarEntry({ path, mode, data }) {
  const header = Buffer.alloc(512);
  const field = (offset, length, value) => header.write(value, offset, length, 'utf8');
  const octal = (offset, length, value) => field(offset, length, value.toString(8).padStart(length - 1, '0') + '\0');
  if (Buffer.byteLength(path) > 100) throw new Error(`path too long for ustar: ${path}`);
  field(0, 100, path);
  octal(100, 8, mode);
  octal(108, 8, 0);
  octal(116, 8, 0);
  octal(124, 12, data ? data.length : 0);
  octal(136, 12, mtime);
  field(148, 8, '        ');
  field(156, 1, data ? '0' : '5');
  field(257, 6, 'ustar\0');
  field(263, 2, '00');
  field(265, 32, 'root');
  field(297, 32, 'root');
  let sum = 0;
  for (const byte of header) sum += byte;
  field(148, 8, sum.toString(8).padStart(6, '0') + '\0 ');
  if (!data) return [header];
  return [header, data, Buffer.alloc((512 - (data.length % 512)) % 512)];
}

const tar = Buffer.concat([...files.flatMap(tarEntry), Buffer.alloc(1024)]);
// gzip's header carries no timestamp or file name when given a buffer. Its
// OS byte differs between zlib builds, so it is pinned to 3 (Unix) to make a
// Windows build byte-identical to a Linux one.
const tgz = gzipSync(tar, { level: 9 });
tgz[9] = 3;
const sha256 = createHash('sha256').update(tgz).digest('hex');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/${name}.tar.gz`, tgz);
writeFileSync(`${outDir}/${name}.tar.gz.sha256`, `${sha256}  ${name}.tar.gz\n`);
console.log(`release/${name}.tar.gz  ${(tgz.length / 1024).toFixed(1)} kB  sha256 ${sha256}`);
