#!/usr/bin/env bash
# Builds Debian packages of aveecare-cli from the release tarball made by
# `npm run bundle`. Runs on Debian or Ubuntu with devscripts and debhelper.
#
#   packaging/deb/build.sh binary            # .deb for the AveeCare apt repository
#   packaging/deb/build.sh source <series>   # source package for a Launchpad PPA,
#                                            # e.g. noble; version 0.1.0-1~noble1
#   packaging/deb/build.sh source            # source package for OBS; version 0.1.0-1
#
# Environment:
#   PACKAGER         "Name <email>" for Maintainer and the changelog. Required.
#   DEB_SIGN_KEYID   GPG key to sign the source package with. Unsigned when unset.
#   DEB_REVISION     Debian revision, default 1. Raise it to re-release the same
#                    upstream version with packaging fixes.
#
# Output goes to build/deb/.
set -euo pipefail

mode=${1:?usage: build.sh binary | source [series]}
root=$(cd "$(dirname "$0")/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")
tarball="$root/release/aveecare-cli-$version.tar.gz"
: "${PACKAGER:?set PACKAGER to \"Name <email>\"}"
revision=${DEB_REVISION:-1}

case $mode in
  binary) debversion="$version-$revision" distribution=stable ;;
  source)
    if [ -n "${2:-}" ]; then
      debversion="$version-$revision~${2}1" distribution=$2
    else
      debversion="$version-$revision" distribution=unstable
    fi
    ;;
  *) echo "unknown mode $mode" >&2; exit 2 ;;
esac

[ -f "$tarball" ] || { echo "missing $tarball; run npm run bundle first" >&2; exit 1; }

out="$root/build/deb"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

cp "$tarball" "$work/aveecare-cli_$version.orig.tar.gz"
tar -xzf "$tarball" -C "$work"
src="$work/aveecare-cli-$version"
cp -r "$root/packaging/deb/debian" "$src/debian"
# debhelper runs any executable config file, so only rules may be executable,
# whatever modes the checkout has (all files look executable on a Windows mount).
find "$src/debian" -type f -exec chmod 644 {} +
chmod 755 "$src/debian/rules"
sed -i "s|@PACKAGER@|$PACKAGER|" "$src/debian/control"
cat > "$src/debian/changelog" <<EOF
aveecare-cli ($debversion) $distribution; urgency=medium

  * Release $version. See /usr/share/doc/aveecare-cli/changelog.gz for the
    changes.

 -- $PACKAGER  $(date -R)
EOF

cd "$src"
if [ "$mode" = binary ]; then
  dpkg-buildpackage --build=binary --no-sign
else
  # -sa includes the orig tarball, which Launchpad needs for a first upload.
  if [ -n "${DEB_SIGN_KEYID:-}" ]; then
    dpkg-buildpackage --build=source -sa --sign-key="$DEB_SIGN_KEYID"
  else
    dpkg-buildpackage --build=source -sa --no-sign
  fi
fi

mkdir -p "$out"
find "$work" -maxdepth 1 -type f ! -name '*.orig.tar.gz' -exec cp {} "$out/" \;
[ "$mode" = source ] && cp "$work/aveecare-cli_$version.orig.tar.gz" "$out/"
ls -1 "$out"
