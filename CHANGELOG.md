# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-10-05

### Added

- First release of the AveeCare command line tool.
- A command for every public API operation, `aveecare <resource> <action>`, with
  typed flags and help text generated from the OpenAPI specification.
- `--all` to follow every page of a list and print one JSON object per line.
- `--data` to send a request body as JSON inline, from a file or from standard input,
  and `--clear` to send `null` for a field.
- Automatic `Idempotency-Key` on every create, with `--idempotency-key` to set your own.
- Automatic retries with backoff for rate limits, server errors and network failures.
- Exit code 2 for usage mistakes, without calling the API.
