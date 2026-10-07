#!/usr/bin/env bash
# Renders the Homebrew formula for aveecare-cli, ready to commit as
# Formula/aveecare.rb in github.com/aveecare/homebrew-tap. The checksum comes
# from the release tarball made by `npm run bundle`, which must be the exact
# file attached to the GitHub release.
#
# Output goes to build/homebrew/aveecare.rb.
set -euo pipefail

root=$(cd "$(dirname "$0")/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
tarball="$root/release/aveecare-cli-$version.tar.gz"
[ -f "$tarball" ] || { echo "missing $tarball; run npm run bundle first" >&2; exit 1; }
sha256=$(sha256sum "$tarball" | cut -d' ' -f1)

mkdir -p "$root/build/homebrew"
sed -e "s|@VERSION@|$version|g" -e "s|@SHA256@|$sha256|g" \
  "$root/packaging/homebrew/aveecare.rb.in" > "$root/build/homebrew/aveecare.rb"
echo "$root/build/homebrew/aveecare.rb"
