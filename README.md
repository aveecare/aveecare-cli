# AveeCare CLI

[![npm version](https://img.shields.io/npm/v/aveecare-cli.svg)](https://www.npmjs.com/package/aveecare-cli)
[![CI](https://github.com/aveecare/aveecare-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/aveecare/aveecare-cli/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The official command line tool for the [AveeCare API](https://www.aveecare.com/docs/api).
List, create and update your home care agency's patients, visits, caregivers and more
from your terminal, cron jobs and shell scripts. Output is JSON, so it pipes straight
into `jq`.

## Install

```sh
npm install -g aveecare-cli
```

This installs the `aveecare` command. It needs Node.js 18 or newer. You can also run it
without installing: `npx aveecare-cli patients list`.

## Quickstart

Create an API key in AveeCare under **Settings → API Keys**, then:

```sh
export AVEECARE_API_KEY=ak_...

aveecare me                                    # which key and agency am I using?
aveecare patients list --active --limit 10
aveecare patients retrieve 9b2e4c71-5d3a-4f08-8e6b-1a7c3d9f2e40
```

On Windows PowerShell, set the key with `$env:AVEECARE_API_KEY = "ak_..."`.

Keep your key secret. Use a read-only key for scripts that only read data.

## Usage

```
aveecare <resource> <action> [id] [flags]
```

Run `aveecare --help` to list every resource, and `aveecare <resource> <action> --help`
for the fields and filters of one command. The help text is generated from the same
[OpenAPI specification](https://github.com/aveecare/aveecare-openapi) as the API reference.

### Listing

```sh
aveecare patients list --lifecycle-stage Prospect --limit 25
aveecare visits list --start-from 2026-10-01T00:00:00Z --start-to 2026-10-08T00:00:00Z
```

A list prints one page as `{ "object": "list", "data": [...], "next_cursor": ..., "has_more": ... }`.
Pass `--cursor <next_cursor>` with the same filters for the next page, or add `--all` to
fetch every page and print one object per line:

```sh
aveecare patients list --active --all | jq -r '[.id, .firstName, .lastName] | @tsv'
```

For incremental sync, pass the newest `updatedAt` you already have:

```sh
aveecare patients list --updated-after 2026-10-05T12:00:00Z --all
```

### Creating and updating

Each field is a flag. Repeat a flag to send a list, and use `--clear <flag>` to send
`null` and clear an optional field:

```sh
aveecare patients create --first-name Margaret --last-name Alvarez --city Phoenix --state AZ

aveecare visits create \
  --patient-id 3f6c2a9e-8b1d-4e7a-9c55-2d0e7b41a6f3 \
  --start-time 2026-10-06T15:00:00Z \
  --end-time 2026-10-06T19:00:00Z \
  --tasks Bathing --tasks 'Meal preparation'

aveecare patients update 9b2e4c71-5d3a-4f08-8e6b-1a7c3d9f2e40 --city Tucson --clear email
```

You can also pass the whole body as JSON with `--data`, inline, from a file (`@body.json`)
or from standard input (`-`). Flags override fields in the JSON:

```sh
aveecare patients create --data @patient.json --office-id 1d2c...
jq -c '.patient' export.json | aveecare patients create --data -
```

Every create sends an `Idempotency-Key`, so a retried request never creates a
duplicate. To make a script safe to re-run, pass your own key:

```sh
aveecare patients create --data @row-1042.json --idempotency-key import-row-1042
```

### Deleting

```sh
aveecare patients delete 9b2e4c71-5d3a-4f08-8e6b-1a7c3d9f2e40
```

## Configuration

| Flag | Environment variable | Default |
|---|---|---|
| `--api-key <key>` | `AVEECARE_API_KEY` | none (required) |
| `--base-url <url>` | `AVEECARE_BASE_URL` | `https://api.aveecare.com` |
| `--timeout <seconds>` | | `60` per attempt |
| `--max-retries <n>` | | `2` |
| `--compact` | | pretty-printed JSON |

Rate limits (`429`), server errors and network failures are retried automatically with
backoff, honoring `Retry-After`.

## Exit codes and errors

| Code | Meaning |
|---|---|
| `0` | Success. The result is on standard output. |
| `1` | The API returned an error, or the request failed. |
| `2` | The command was wrong (unknown flag, missing field, no API key). Nothing was sent. |

Errors go to standard error with the error code and request ID, for example:

```
No such patient. (status 404, code not_found, request req_8f2c...)
```

Quote the request ID if you contact support. See the
[errors reference](https://www.aveecare.com/docs/api/errors) for every code.

## Related

- [API reference](https://www.aveecare.com/docs/api)
- [Node.js library](https://github.com/aveecare/aveecare-node), which this CLI is built on
- [Python](https://github.com/aveecare/aveecare-python), [Rust](https://github.com/aveecare/aveecare-rust),
  [Go](https://github.com/aveecare/aveecare-go), [Ruby](https://github.com/aveecare/aveecare-ruby),
  [PHP](https://github.com/aveecare/aveecare-php), [Java](https://github.com/aveecare/aveecare-java) and
  [.NET](https://github.com/aveecare/aveecare-dotnet) libraries
- [OpenAPI specification](https://github.com/aveecare/aveecare-openapi)
- [MCP server](https://github.com/aveecare/aveecare-mcp) for AI assistants
- [Examples](https://github.com/aveecare/aveecare-examples)

AveeCare is home care software for scheduling, EVV, billing and payroll. Learn more at
[www.aveecare.com](https://www.aveecare.com).

## License

[MIT](LICENSE)
