#!/usr/bin/env bash
# Builds a signed source package of aveecare-cli for each Ubuntu series and
# uploads it to a Launchpad PPA, which builds and publishes the .debs. Needs
# devscripts, debhelper and dput, and the GPG key registered on the Launchpad
# account that owns the PPA.
#
#   packaging/deb/upload-ppa.sh ppa:aveecare/aveecare-cli [series...]
#
# Series default to noble (24.04) and resolute (26.04). Older series have no
# Node.js 18 in their archive, so the package only installs there alongside
# Node.js from elsewhere, such as NodeSource.
#
# Environment: PACKAGER and DEB_SIGN_KEYID (required here), DEB_REVISION.
# DPUT_FLAGS=-s simulates the upload without sending anything.
set -euo pipefail

ppa=${1:?usage: upload-ppa.sh ppa:<owner>/<name> [series...]}
shift
series=("$@")
[ ${#series[@]} -gt 0 ] || series=(noble resolute)
: "${DEB_SIGN_KEYID:?set DEB_SIGN_KEYID to the GPG key registered on Launchpad}"

here=$(dirname "$0")
root=$(cd "$here/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
for s in "${series[@]}"; do
  bash "$here/build.sh" source "$s"
  changes="$root/build/deb/aveecare-cli_$version-${DEB_REVISION:-1}~${s}1_source.changes"
  # Launchpad's FTP server sometimes answers "550 internal server error" to an
  # upload that goes through a minute later, so retry; -f re-sends files that a
  # failed attempt already recorded as uploaded.
  force=()
  for attempt in 1 2 3 4; do
    # shellcheck disable=SC2086
    dput ${DPUT_FLAGS:-} "${force[@]}" "$ppa" "$changes" && break
    [ "$attempt" = 4 ] && exit 1
    echo "Upload failed; retrying in $((attempt * 60)) seconds." >&2
    sleep $((attempt * 60))
    force=(-f)
  done
done
