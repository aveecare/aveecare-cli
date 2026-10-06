# Contributing to aveecare-cli

Thanks for helping improve the AveeCare command line tool.

## How this tool is built

- **The command table is generated** from the public AveeCare OpenAPI
  specification, published in
  [aveecare-openapi](https://github.com/aveecare/aveecare-openapi). Everything in
  `src/generated/` is overwritten on each release, so please do not edit it by hand.
  If a command, flag or help text is wrong or missing, open an issue here or in
  aveecare-openapi and we will fix it at the source.
- **The rest is hand-written** (argument parsing, help, output and errors) and calls
  the API through the [aveecare](https://github.com/aveecare/aveecare-node) Node.js
  library. Fixes and improvements are very welcome as pull requests.

## Development

```sh
npm install
npm test          # build + tests against a local HTTP server
npm run typecheck
node dist/cli.js --help
```

Tests run the built CLI against a local server and never touch the network.

## Pull requests

1. Open an issue first for anything larger than a small fix.
2. Add or update tests for the behaviour you change.
3. Keep commands, flags and exit codes backwards compatible within a major version.
4. Add a line to `CHANGELOG.md` under "Unreleased".

By contributing you agree that your contributions are licensed under the MIT
License, and you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

Security issues: please follow [SECURITY.md](SECURITY.md) instead of opening a
public issue.
