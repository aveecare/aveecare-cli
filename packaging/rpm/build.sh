#!/usr/bin/env bash
# Builds RPMs of aveecare-cli from the release tarball made by `npm run bundle`.
# Runs on Fedora, RHEL-likes or openSUSE with rpm-build installed.
#
#   packaging/rpm/build.sh spec     # only render the spec (for COPR and OBS uploads)
#   packaging/rpm/build.sh srpm     # source RPM
#   packaging/rpm/build.sh rpm      # source RPM and the noarch binary RPM
#
# Environment:
#   PACKAGER      "Name <email>" for the changelog. Required.
#   RPM_RELEASE   Release number, default 1. Raise it to re-release the same
#                 version with packaging fixes.
#   RPM_NO_DIST   Set to 1 to leave the distribution tag (such as .fc44) out of
#                 the release, for the one RPM in the AveeCare yum repository
#                 that serves every RPM distribution.
#
# Output goes to build/rpm/.
set -euo pipefail

mode=${1:?usage: build.sh spec | srpm | rpm}
root=$(cd "$(dirname "$0")/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
tarball="$root/release/aveecare-cli-$version.tar.gz"
: "${PACKAGER:?set PACKAGER to \"Name <email>\"}"
release=${RPM_RELEASE:-1}
out="$root/build/rpm"
mkdir -p "$out"

sed -e "s|@VERSION@|$version|g" -e "s|@RELEASE@|$release|g" -e "s|@PACKAGER@|$PACKAGER|g" \
  -e "s|@DATE@|$(LC_ALL=C date -u '+%a %b %d %Y')|g" \
  "$root/packaging/rpm/aveecare-cli.spec.in" > "$out/aveecare-cli.spec"
[ "$mode" = spec ] && { echo "$out/aveecare-cli.spec"; exit 0; }

[ -f "$tarball" ] || { echo "missing $tarball; run npm run bundle first" >&2; exit 1; }
top=$(mktemp -d)
trap 'rm -rf "$top"' EXIT
mkdir -p "$top/SOURCES"
cp "$tarball" "$top/SOURCES/"
defines=(--define "_topdir $top")
[ "${RPM_NO_DIST:-}" = 1 ] && defines+=(--define "dist %{nil}")
case $mode in
  srpm) rpmbuild "${defines[@]}" -bs "$out/aveecare-cli.spec" ;;
  rpm) rpmbuild "${defines[@]}" -ba "$out/aveecare-cli.spec" ;;
  *) echo "unknown mode $mode" >&2; exit 2 ;;
esac
find "$top/SRPMS" "$top/RPMS" -name '*.rpm' -exec cp {} "$out/" \; 2>/dev/null || true
ls -1 "$out"
