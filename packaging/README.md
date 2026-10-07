# Packaging

How `aveecare-cli` gets from a version tag to Linux package managers and Homebrew.
This is for maintainers; users install with `npm install -g aveecare-cli` or one of
the channels below.

## How it fits together

`npm run bundle` builds `release/aveecare-cli-<version>.tar.gz`, which holds:

- `aveecare.cjs`, the CLI with the `aveecare` SDK bundled in (one readable file, not minified)
- `aveecare.1`, a man page made from `aveecare --help`
- `README.md`, `CHANGELOG.md` and `LICENSE`

It needs only Node.js 18 or newer, so every package is architecture-independent and
depends on the distribution's `nodejs`. The tarball is reproducible: the same commit and
SDK version give the same bytes, on Windows or Linux.

Every channel installs that one tarball, attached to the GitHub release:

| Channel | Recipe | Users install with |
|---|---|---|
| Debian, Ubuntu (own repo) | `deb/` | the steps on the repository's `index.html` |
| Fedora, RHEL, openSUSE (own repo) | `rpm/` | the steps on the repository's `index.html` |
| Ubuntu PPA | `deb/` + `deb/upload-ppa.sh` | `sudo add-apt-repository ppa:<owner>/aveecare-cli` |
| Fedora COPR | `rpm/` + `rpm/upload-copr.sh` | `sudo dnf copr enable <owner>/aveecare-cli` |
| openSUSE Build Service | `rpm/` + `deb/` + `obs/upload.sh` | the project's page on software.opensuse.org |
| Arch AUR | `aur/` | `yay -S aveecare-cli` (or any AUR helper) |
| Homebrew (macOS, Linux) | `homebrew/` | `brew install aveecare/tap/aveecare` |

The packages install the bundle to `/usr/share/aveecare-cli/` (`/usr/lib/aveecare-cli/`
on Arch, `libexec` on Homebrew), link `aveecare` into the `bin` directory, and install
the man page.

## Releasing

1. Publish the `aveecare` SDK version the CLI depends on to npm first; the release
   workflow installs it from there.
2. Bump the version in `package.json` and `src/version.ts`, update `CHANGELOG.md`,
   and push a `v<version>` tag.
3. `.github/workflows/packages.yml` builds and tests the bundle, creates the GitHub
   release with the tarball and its `.sha256`, then publishes to each channel whose
   repository variable is set. Channels without it are skipped.

Re-running the workflow for a tag reuses the tarball already on the release, so
checksums never change under users. To ship packaging fixes without a new CLI
version, set `DEB_REVISION`, `RPM_RELEASE` or `PKGREL` above 1.

## One-time setup

Repository variables and secrets live in GitHub under Settings > Secrets and
variables > Actions.

**Every channel** needs the variable `PACKAGER`, the name and email that appear as the
package maintainer, such as `AveeCare <packages@example.com>`.

**Signing key.** The apt/yum repository and the PPA need an OpenPGP key. Use RSA:
openSUSE Leap's rpm cannot verify Ed25519 signatures. The workflow needs it without a
passphrase, so make a dedicated key for package signing:

```sh
gpg --quick-gen-key "AveeCare Packages <packages@example.com>" rsa4096 sign 3y
gpg --armor --export-secret-keys packages@example.com   # paste into the secrets below
```

Keep an offline backup of the key. Losing it means every user has to trust a new one.

### Own apt and yum repository

1. Create a public repository, for example `aveecare/packages`, with one commit (any
   README). Turn on GitHub Pages for it: Settings > Pages > Deploy from a branch, `main`, `/`.
2. Create a fine-grained token with Contents: read and write on that repository only.
3. Secrets: `PACKAGES_REPO_TOKEN` (the token), `REPO_GPG_PRIVATE_KEY` (the signing key).
4. Variables: `PACKAGES_REPO` = `aveecare/packages`. If it is served from a custom
   domain, also `PACKAGES_URL`, such as `https://packages.aveecare.com` (add that
   domain in the Pages settings). The default is `https://aveecare.github.io/packages`.

Each release adds its `.deb` and `.rpm`, keeping earlier ones so users can downgrade.
The generated `index.html` has the install steps for apt, dnf and zypper.

### Homebrew tap

1. Create a public repository named `aveecare/homebrew-tap`. The `homebrew-` prefix is
   what makes `brew install aveecare/tap/aveecare` work.
2. Create a fine-grained token with Contents: read and write on that repository only.
3. Secret `HOMEBREW_TAP_TOKEN`; variable `HOMEBREW_TAP` = `aveecare/homebrew-tap`.

### Arch AUR

1. Create an account on https://aur.archlinux.org and add an SSH public key to it.
   Use a key made just for this.
2. Secret `AUR_SSH_PRIVATE_KEY` (the private key); variable `PUBLISH_AUR` = `true`.

The first release creates the `aveecare-cli` package. The workflow pins the AUR's
published SSH host key.

### Ubuntu PPA

1. Create a Launchpad account. Upload the signing key's public half to
   keyserver.ubuntu.com and add it under your Launchpad profile's OpenPGP keys.
   Launchpad may ask you to sign the Ubuntu Code of Conduct before you can make a PPA.
2. Create a PPA named `aveecare-cli`.
3. Secret `PPA_GPG_PRIVATE_KEY` (the key registered on Launchpad); variable `PPA` =
   `ppa:<launchpad-name>/aveecare-cli`. Optionally `PPA_SERIES`, a space-separated
   list; the default is `noble resolute` (24.04 and 26.04).

Ubuntu 22.04 and older ship Node.js 12, so the package only installs there next to a
newer Node.js, such as NodeSource's.

### Fedora COPR

1. Log in to https://copr.fedorainfracloud.org with a Fedora account and create a
   project named `aveecare-cli`. Pick its chroots: Fedora releases, `opensuse-tumbleweed`,
   `opensuse-leap-15.6` and, for RHEL 9 and compatibles, `epel-9` with the module
   `nodejs:20` enabled in that chroot's settings (EL9's default Node.js is 16).
2. Copy the config from https://copr.fedorainfracloud.org/api/ into the secret
   `COPR_CONFIG`. It expires after 180 days; renew it there.
3. Variable `COPR_PROJECT` = `<fedora-name>/aveecare-cli`.

### openSUSE Build Service

1. Create an account on https://build.opensuse.org and a package `aveecare-cli` in
   your home project. Add the repositories to build for, such as openSUSE Tumbleweed
   and Leap, Fedora, Debian 12 and 13, and Ubuntu 24.04 and 26.04.
2. Secrets `OBS_USERNAME` and `OBS_PASSWORD`; variable `OBS_PROJECT` = `home:<name>`.

OBS builds RPMs from the spec and `.deb`s from the Debian source package.

## Building by hand

Everything runs on Linux (or WSL, or Docker). Build the tarball first, then:

```sh
npm install && npm run bundle

export PACKAGER="AveeCare <packages@example.com>"
packaging/deb/build.sh binary                 # build/deb/aveecare-cli_<v>-1_all.deb
packaging/deb/build.sh source noble           # PPA source package (signed if DEB_SIGN_KEYID is set)
RPM_NO_DIST=1 packaging/rpm/build.sh rpm      # build/rpm/aveecare-cli-<v>-1.noarch.rpm
packaging/aur/build.sh srcinfo                # build/aur/PKGBUILD and .SRCINFO (needs makepkg)
packaging/homebrew/build.sh                   # build/homebrew/aveecare.rb
REPO_SIGN_KEYID=<key> packaging/repo/build.sh <site-dir>
DEB_SIGN_KEYID=<key> packaging/deb/upload-ppa.sh ppa:<owner>/aveecare-cli
packaging/rpm/upload-copr.sh <owner>/aveecare-cli
packaging/obs/upload.sh home:<name> aveecare-cli
```

`DPUT_FLAGS=-s` makes `upload-ppa.sh` check the upload without sending it.

To test a package, install it and run the test suite against the installed command:

```sh
AVEECARE_CLI_COMMAND=/usr/bin/aveecare node --test --test-reporter=tap test/cli.test.mjs
```

## What has been tested

Each package was built and installed in clean containers, and the test suite passed
against the installed `aveecare`:

- `.deb`: Ubuntu 24.04 and 26.04, Debian 12 and 13; the PPA source packages rebuilt on
  their own series.
- RPM: Fedora 44, openSUSE Tumbleweed and Leap 15.6, Rocky Linux 9 (which refuses it
  until `nodejs:20` is enabled); built natively on Fedora and Tumbleweed.
- AUR: `makepkg` with `check()`, installed with `pacman`.
- Homebrew: `brew install`, `brew test`, `brew audit --strict` and `brew style`, on
  Homebrew for Linux.
- Own repository: served over HTTP and installed with apt, dnf and zypper by following
  `index.html`; apt and dnf refuse it when signed by a key they do not trust.

Not tested: the uploads themselves (Launchpad, COPR, OBS, AUR, the tap and Pages
pushes), which need the accounts above, and Homebrew on macOS.
