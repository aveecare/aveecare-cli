#!/usr/bin/env bash
# Adds this release's .deb and .rpm to the AveeCare package repository and
# re-signs it. The repository is a static site (GitHub Pages) that apt, dnf,
# yum and zypper install from:
#
#   <site>/aveecare.asc         public signing key
#   <site>/aveecare.repo        dnf/yum/zypper repository file
#   <site>/deb/                 flat apt repository: Packages, Release, InRelease
#   <site>/rpm/                 signed RPMs and signed repodata
#   <site>/index.html           install instructions
#
#   packaging/repo/build.sh <site-dir>
#
# <site-dir> holds the published repository (a checkout of the Pages repo);
# earlier releases stay in it so users can still install or downgrade to them.
# Build the packages first: `packaging/deb/build.sh binary` and
# `RPM_NO_DIST=1 packaging/rpm/build.sh rpm`.
#
# Needs gpg, apt-utils, createrepo-c and rpm (for rpmsign).
#
# Environment:
#   REPO_SIGN_KEYID   GPG key that signs the repository and RPMs. Required.
#   REPO_BASE_URL     Public URL of <site-dir>, default https://aveecare.github.io/packages
set -euo pipefail

site=${1:?usage: build.sh <site-dir>}
: "${REPO_SIGN_KEYID:?set REPO_SIGN_KEYID to the repository signing key}"
base=${REPO_BASE_URL:-https://aveecare.github.io/packages}
base=${base%/}
root=$(cd "$(dirname "$0")/../.." && pwd)
version=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "$root/package.json")

shopt -s nullglob extglob
debs=("$root"/build/deb/aveecare-cli_"$version"-+([0-9])_all.deb)
rpms=("$root"/build/rpm/aveecare-cli-"$version"-+([0-9]).noarch.rpm)
[ ${#debs[@]} -eq 1 ] || { echo "expected one $version .deb in build/deb, found ${#debs[@]}" >&2; exit 1; }
[ ${#rpms[@]} -eq 1 ] || { echo "expected one $version RPM without a dist tag in build/rpm (RPM_NO_DIST=1), found ${#rpms[@]}" >&2; exit 1; }

mkdir -p "$site/deb" "$site/rpm"
cp "${debs[0]}" "$site/deb/"
cp "${rpms[0]}" "$site/rpm/"
# Ubuntu's rpm looks for gpg at /usr/bin/gpg2, so name the real one.
rpmsign --addsign --define "_gpg_name $REPO_SIGN_KEYID" --define "__gpg $(command -v gpg)"   "$site/rpm/$(basename "${rpms[0]}")" >/dev/null

gpg --batch --yes --armor --export "$REPO_SIGN_KEYID" > "$site/aveecare.asc"
# Serve every file as-is on GitHub Pages.
touch "$site/.nojekyll"

# apt: a flat repository, which suits a single architecture-independent package.
(
  cd "$site/deb"
  apt-ftparchive packages . > Packages
  gzip -9 -n -k -f Packages
  apt-ftparchive \
    -o APT::FTPArchive::Release::Origin=AveeCare \
    -o APT::FTPArchive::Release::Label=AveeCare \
    -o APT::FTPArchive::Release::Description="AveeCare command line tools" \
    release . > Release
  gpg --batch --yes --local-user "$REPO_SIGN_KEYID" --clearsign -o InRelease Release
  gpg --batch --yes --local-user "$REPO_SIGN_KEYID" --armor --detach-sign -o Release.gpg Release
)

# dnf, yum and zypper.
createrepo_c --quiet --update "$site/rpm"
gpg --batch --yes --local-user "$REPO_SIGN_KEYID" --armor --detach-sign \
  -o "$site/rpm/repodata/repomd.xml.asc" "$site/rpm/repodata/repomd.xml"

cat > "$site/aveecare.repo" <<EOF
[aveecare]
name=AveeCare
baseurl=$base/rpm
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=$base/aveecare.asc
EOF

cat > "$site/index.html" <<EOF
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>AveeCare packages</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem}pre{background:#f4f4f4;padding:1rem;overflow-x:auto}</style>
<h1>AveeCare packages</h1>
<p>Packages for the <a href="https://github.com/aveecare/aveecare-cli">AveeCare command line tool</a>.
They need Node.js 18 or newer, which the package manager installs from your distribution.</p>
<h2>Debian and Ubuntu</h2>
<p>Debian 12 or newer, Ubuntu 24.04 or newer.</p>
<pre>sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL $base/aveecare.asc | sudo tee /etc/apt/keyrings/aveecare.asc &gt;/dev/null
echo "deb [signed-by=/etc/apt/keyrings/aveecare.asc] $base/deb ./" | sudo tee /etc/apt/sources.list.d/aveecare.list
sudo apt update &amp;&amp; sudo apt install aveecare-cli</pre>
<h2>Fedora, RHEL and compatible</h2>
<p>On RHEL 9 and compatible, first run <code>sudo dnf module enable nodejs:20</code>.</p>
<pre>sudo curl -fsSL -o /etc/yum.repos.d/aveecare.repo $base/aveecare.repo
sudo dnf install aveecare-cli</pre>
<h2>openSUSE</h2>
<pre>sudo zypper addrepo $base/aveecare.repo
sudo zypper install aveecare-cli</pre>
<p>Signing key: <a href="aveecare.asc">aveecare.asc</a>
(fingerprint <code>$(gpg --batch --with-colons --fingerprint "$REPO_SIGN_KEYID" | awk -F: '/^fpr/ {print $10; exit}')</code>).</p>
</html>
EOF

echo "Added aveecare-cli $version to $site:"
ls -1 "$site/deb"/*.deb "$site/rpm"/*.rpm
