#!/usr/bin/env bash
# Commits aveecare-cli to an openSUSE Build Service package, which then builds
# RPMs from the spec and .debs from the Debian source package for every
# repository enabled on the project (openSUSE, Fedora, Debian, Ubuntu and more).
# Needs osc logged in to build.opensuse.org, plus rpm-build, devscripts and
# debhelper (so: run on Debian or Ubuntu with rpm installed).
#
#   packaging/obs/upload.sh home:aveecare aveecare-cli
#
# Environment: PACKAGER (required), RPM_RELEASE, DEB_REVISION.
set -euo pipefail

project=${1:?usage: upload.sh <project> <package>}
package=${2:?usage: upload.sh <project> <package>}
here=$(dirname "$0")
root=$(cd "$here/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")

bash "$here/../rpm/build.sh" spec
bash "$here/../deb/build.sh" source

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
cd "$work"
osc checkout "$project" "$package"
cd "$project/$package"
# Replace the previous release's files with this one's.
find . -maxdepth 1 -type f ! -name '.*' -delete
cp "$root/build/rpm/aveecare-cli.spec" "$root/release/aveecare-cli-$version.tar.gz" .
debversion="$version-${DEB_REVISION:-1}"
cp "$root/build/deb/aveecare-cli_$version.orig.tar.gz" \
  "$root/build/deb/aveecare-cli_$debversion.dsc" \
  "$root/build/deb/aveecare-cli_$debversion.debian.tar.xz" .
osc addremove
osc commit -m "aveecare-cli $version"
