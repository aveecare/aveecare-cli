#!/usr/bin/env bash
# Commits aveecare-cli to an openSUSE Build Service package, which then builds
# RPMs from the spec and .debs from the Debian source package for every
# repository enabled on the project (openSUSE, Fedora, Debian, Ubuntu and more).
# Needs osc logged in to build.opensuse.org, plus rpm-build, devscripts and
# debhelper (so: run on Debian or Ubuntu with rpm installed).
#
#   packaging/obs/upload.sh home:aveecare aveecare-cli
#
# Creates the project and package when they do not exist yet, and gives a project
# without repositories the default set in repositories() below.
#
# Environment: PACKAGER (required), RPM_RELEASE, DEB_REVISION, OBS_USERNAME (the
# maintainer of a project it creates; defaults to the name after "home:").
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

# <repository name> <distribution project> <its repositories to build against...>
repositories() {
  local name dist repos repo
  while read -r name dist repos; do
    printf '  <repository name="%s">\n' "$name"
    for repo in $repos; do
      printf '    <path project="%s" repository="%s"/>\n' "$dist" "$repo"
    done
    printf '    <arch>x86_64</arch>\n  </repository>\n'
  done <<'END'
openSUSE_Tumbleweed openSUSE:Factory snapshot
openSUSE_Leap_16.0 openSUSE:Leap:16.0 standard
openSUSE_Leap_15.6 openSUSE:Leap:15.6 standard
Fedora_44 Fedora:44 update
Fedora_43 Fedora:43 update
Debian_13 Debian:13 update
Debian_12 Debian:12 update
xUbuntu_26.04 Ubuntu:26.04 universe-update update
xUbuntu_24.04 Ubuntu:24.04 universe-update update
END
}

if ! osc meta prj "$project" > project.xml 2> /dev/null; then
  cat > project.xml <<END
<project name="$project">
  <title>AveeCare</title>
  <description>The aveecare command line tool.</description>
  <person userid="${OBS_USERNAME:-${project#home:}}" role="maintainer"/>
</project>
END
fi
if ! grep -q '<repository' project.xml; then
  { sed '/<\/project>/d' project.xml; repositories; echo '</project>'; } > project.new.xml
  osc meta prj -F project.new.xml "$project"
fi
if ! osc meta pkg "$project" "$package" > /dev/null 2>&1; then
  cat > package.xml <<END
<package name="$package" project="$project">
  <title>aveecare-cli</title>
  <description>The aveecare command line tool for the AveeCare API.</description>
</package>
END
  osc meta pkg -F package.xml "$project" "$package"
fi

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
