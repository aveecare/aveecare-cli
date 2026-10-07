#!/usr/bin/env bash
# Renders the AUR package of aveecare-cli: PKGBUILD and .SRCINFO, ready to
# commit to ssh://aur@aur.archlinux.org/aveecare-cli.git. The checksum comes
# from the release tarball made by `npm run bundle`, which must be the exact
# file attached to the GitHub release.
#
#   packaging/aur/build.sh           # PKGBUILD only (runs anywhere)
#   packaging/aur/build.sh srcinfo   # PKGBUILD and .SRCINFO (needs makepkg, so Arch)
#
# Environment:
#   PACKAGER   "Name <email>" for the Maintainer line. Required.
#   PKGREL     Package release, default 1. Raise it to re-release the same
#              version with packaging fixes.
#
# Output goes to build/aur/.
set -euo pipefail

root=$(cd "$(dirname "$0")/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
tarball="$root/release/aveecare-cli-$version.tar.gz"
: "${PACKAGER:?set PACKAGER to \"Name <email>\"}"
[ -f "$tarball" ] || { echo "missing $tarball; run npm run bundle first" >&2; exit 1; }
sha256=$(sha256sum "$tarball" | cut -d' ' -f1)

out="$root/build/aur"
mkdir -p "$out"
sed -e "s|@VERSION@|$version|g" -e "s|@PKGREL@|${PKGREL:-1}|g" -e "s|@SHA256@|$sha256|g" \
  -e "s|@PACKAGER@|$PACKAGER|g" "$root/packaging/aur/PKGBUILD.in" > "$out/PKGBUILD"
if [ "${1:-}" = srcinfo ]; then
  (cd "$out" && makepkg --printsrcinfo > .SRCINFO)
fi
ls -A1 "$out"
