#!/usr/bin/env bash
# Builds the aveecare-cli source RPM and submits it to a Fedora COPR project,
# which builds it for every chroot enabled on the project. Needs rpm-build and
# copr-cli, with an API token from https://copr.fedorainfracloud.org/api/ in
# ~/.config/copr (tokens expire after 180 days).
#
#   packaging/rpm/upload-copr.sh aveecare/aveecare-cli
#
# Environment: PACKAGER (required), RPM_RELEASE.
set -euo pipefail

project=${1:?usage: upload-copr.sh <owner>/<project>}
here=$(dirname "$0")
root=$(cd "$here/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
# COPR rebuilds the SRPM in each chroot with that chroot's dist tag, so build
# it without one and submit exactly that file.
RPM_NO_DIST=1 bash "$here/build.sh" srpm
copr-cli build "$project" "$root/build/rpm/aveecare-cli-$version-${RPM_RELEASE:-1}.src.rpm"
