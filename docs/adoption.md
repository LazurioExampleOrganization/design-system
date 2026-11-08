# Adopting the design system

This guide is for the agent that works for a person. It has two parts:

- [Adopting the template into an Organization](#adopting-the-template-into-an-organization):
  the Organization gets its own design system module, usually after
  "Přidat do Organizace" in the Marketplace of Lazurio.
- [Using the design system in another module](#using-the-design-system-in-another-module):
  a website, a knowledge base, an App or presentations add the
  Organization's design system (or, for a Marketplace template, this
  template) as a **package**: a Git dependency on a released tag.

Adoption is an agent's reviewed work in pull requests, not an installer. The
person decides; the agent prepares. Nothing is merged, tagged, published or
granted without the person's explicit instruction.

## Who keeps which side

The Organization's design system takes later template releases by merge, and
every merge follows one rule:

> When a merge of a release conflicts, the template's side wins for code and
> components and the Organization's side wins for its brand, brand tokens and
> content: take the template's version of every file outside `brand/`, keep
> the Organization's `brand/` and its identity (`lazurio.module.json` and the
> `id`, `title`, `company` and `module` of `lazurio.runtime` in
> `app/v1/package.json`), regenerate the generated files with
> `bun run tokens` instead of merging them by hand, and resolve a conflict in
> a file that mixes both, such as `app/v1/package.json`, together with the
> person, deliberately.

The table of every path is in [`extending.md`](extending.md#who-owns-which-file).

## Adopting the template into an Organization

The result is a private module of the target Organization whose history
contains the release's commit as an ancestor, with the target's identity
(name, lease, Teams) and, unless the person chose the example, the target's
own brand in `brand/`. Later releases reach it as ordinary merges
([Taking an update](extending.md#taking-an-update-of-the-template)).

### What you need before you start

- The **release**: its tag `v<version>` and the full commit the tag points
  to, both from the brief or the Marketplace registry. A tag alone is not an
  immutable identity: fetch the tag and confirm that it resolves to that
  commit. If it does not, stop and report it.
- The **target Organization**, as the person named it. Never pick another one
  or a personal account instead.
- The **start**: `sample` keeps the invented Example brand to explore it;
  `empty` replaces it with the Organization's own brand (step 7). When the
  brief does not say, ask.

### 1. Read the target's rules

Open the target Organization's root checkout and read its `AGENTS.md`, its
`lazurio.organization.json` and the nearest rules for modules. They apply
inside its checkout and win over this guide where they are stricter (language,
branch names, review). Work in a task worktree of the Organization root, never
in its primary checkout.

### 2. Check live rights

```sh
gh api user --jq .login
gh api orgs/<Organization>/memberships/<login> --jq '.role,.state'   # admin, active
gh api repos/LazurioTemplates/design-system --jq .visibility          # public
```

`lazurio module create` for an Organization is run by an active Owner (admin)
of that Organization. When the person is not one, do not look for another
way: prepare the plan and a short request for an Owner (who and what to run),
record it as an issue in the Organization's root repository, give the person
its URL and stop there.

### 3. Check the name

The template's module id is `design-system`. Look for a collision, letter case
ignored: a slot or directory `design-system` in the target's
`modules.manifest.json`, `workspace/` or the root (Organizations often keep
their design system as a root-level module), and a repository
`<Organization>/design-system` on GitHub. Then:

- **Nothing there**: go on with step 4.
- **An adoption of this template** (its history contains a release): this is
  an update, not an adoption. Follow
  [Taking an update](extending.md#taking-an-update-of-the-template) in that
  module.
- **The Organization's own design system with an unrelated history**, for
  example the one this template grew out of, or one built before the
  template: keep its repository, slug and history. Skip steps 4 and 5 and, in
  a task worktree of that module, merge the release once with
  `--allow-unrelated-histories` (step 6), resolving by the rule above: the
  template's side for code, stack, tests, CI, documents and `CHANGELOG.md`;
  the Organization's for `lazurio.module.json`, the identity of
  `lazurio.runtime` and its brand, which goes into `brand/` (step 7). From
  then on the release is an ancestor and later releases merge normally.
- **Something unrelated with that name**: do not reuse or overwrite
  anything. Tell the person what exists and agree on another slug, for
  example `design-system-example` for a trial beside it.

### 4. Check compatibility

Lazurio on the Environment runs Apps declared with `lazurio.runtime.v1` and
`lazurio.preparation.v1` and fetches the Bun the App pins (`packageManager`,
`bun@1.4.4`). `lazurio module list <Organization> --json` must list the
Organization's modules. The App is static (`build_output: "dist"`) and
declares no secrets and no siblings, so it needs nothing but a port of its
pool.

### 5. Show the plan, then create the module

```sh
lazurio module create <Organization>/<slug> --stack astro --teams <team,team> --dry-run --json
```

Show the person the plan with what follows from it (the private repository,
the Teams that get Write, the port, the release you will merge). Teams come
from the Organization's real list; ask which ones, never invent one. Only
after the person confirms, run it with `--confirm <plan>` from the task
worktree of the Organization root. Commit the declared slot and open the
root's pull request; merging it is the person's Publication.

### 6. Merge the release so it stays an ancestor

In a task worktree of the new module:

```sh
git remote add template https://github.com/LazurioTemplates/design-system.git
git fetch template tag v<version>
test "$(git rev-parse 'v<version>^{commit}')" = "<commit from the brief>"
git merge --allow-unrelated-histories --no-ff -m "Design system: adopt template release v<version>" <commit>
```

Never squash, rebase or copy the files instead: the merge keeps the release
as an ancestor, which lets a later release merge cleanly. Resolve what the
scaffold and the template both have by the rule above:

| File | Keep from the scaffold | Take from the template |
| --- | --- | --- |
| `lazurio.module.json` | `id`, `company`, `port_leases` | `apps`, `default_app` (both `app/v1/package.json`) |
| `app/v1/package.json` | `lazurio.runtime`: `id`, `title`, `company`, `module` | everything else |
| everything else | | the template's; delete what only the scaffold had (its starter page and test) |

### 7. Make it the Organization's own

**Identity** (always): in `brand/brand.json` set `repository` to the new
module's repository (the viewer links each page to its source there), and in
`brand/README.md` replace the line "Adopted from" with the release and commit
you merged. Keep `LICENSE` and `NOTICE`; MIT and the third-party licences
require them to stay with the copy.

**Brand** (the `empty` start, or when the Organization is ready): follow
[Replacing the brand](extending.md#replacing-the-brand). Everything happens
in `brand/`: name and summary in Czech and English, the palette, the fonts
with their licences, the radius, the logo symbol, the illustrations and the
brand pages. Find the Organization's production sources first (website,
brand brief, voice guide); the design system mirrors them and never invents a
brand. Never copy another company's brand or content, and never real
customer data into an example.

### 8. Verify

```sh
cd app/v1
bun install --frozen-lockfile
bun run tokens
bun run check
git merge-base --is-ancestor <commit> HEAD && echo ancestor
```

Look at the viewer in a browser in both languages and both themes. Open the
module's pull request with what you did, what you verified, the merged release
and commit, and what is left. After both pull requests are merged and the
module is on `main`, `lazurio module setup` must report it `current`.

### 9. Release the Organization's design system

Once the module is merged with the Organization's brand, it is the
Organization's package: its modules depend on it, not on this template. On
the person's instruction, tag a release on `main` of the module's repository
and create its GitHub Release (both Publication):

```sh
git tag -a v<version> -m "v<version>"
git push origin v<version>
gh release create v<version> --verify-tag
```

The version is the Organization's own (semantic, see
[Releasing](extending.md#releasing-the-organizations-design-system));
`brand/README.md` and `CHANGELOG.md` say which template release it carries.
Protect the tags (a ruleset on `refs/tags/v*` against deletion and update) so
a released version never moves; the modules' `bun.lock` pins the commit
anyway.

### 10. Access for Teams, last

Who may open the module follows the Organization's manifest and live GitHub
grants. The Marketplace grants nothing. Change access only as the last step
and only on the person's instruction.

## Using the design system in another module

### The one way: a package on a released tag

The design system is a package named `design-system`: `package.json` at the
root of its repository exports the kit (styles, tokens, fonts, icons and the
components for Astro and React). A module adds it to its App's
`package.json` as a Git dependency on a released tag, like every shared
package in Lazurio (`@lazurio/module-kit`, repository-db), and imports from
`design-system/...`. This is the only way from 2.0.0 on:

- **The Module Standard asks for it**: a design system's assets come as a
  dependency on its package, never by a relative path, and shared contracts of
  an Organization are a versioned package it owns, a dependency on a released
  tag. A copy or a subtree puts a second, undeclared package into the module.
- **An update is moving the pin.** `bun.lock` records the exact commit of the
  tag (and for `github:` the tarball's `sha512`); `bun install
  --frozen-lockfile` installs exactly that. A newer release, or the
  Organization's new brand, is a new tag and a one-line change of the
  dependency.
- **The brand stays the Organization's.** Its modules depend on its own design
  system, which carries its brand in `brand/`; the template reaches them
  through it.
- **One package for Astro and React.** The same dependency gives an Astro site
  `design-system/astro` and a React App `design-system/react`, with the same
  styles and tokens; no module converts tokens or syncs files of its own.

Why these specifiers, measured with Bun 1.4.4: `github:<owner>/<repo>#<tag>`
records the commit and a `sha512` in `bun.lock`, but Bun downloads it from
GitHub's API without credentials, so it works only for public repositories
(a private one answers 404, also with `GITHUB_TOKEN`); `git+https://github.com/…`
takes the same unauthenticated path. `git+ssh://` clones with the
Environment's SSH key and works for private repositories; `bun.lock` pins the
full commit SHA. A tarball attached to a GitHub Release would need
authentication Bun cannot send for a private repository. Bun cannot install a
subdirectory of a repository, so the package's root is the repository's root,
and it installs the whole tree of the tag (about 6.5 MB, most of it the
vendored Impeccable skill), ignoring `files`.

### Adding it to a module

In the App's `package.json`, under `dependencies`:

- a template of the Marketplace (public): `"design-system": "github:LazurioTemplates/design-system#v2.0.0"`;
- a module of an Organization (its design system is private):
  `"design-system": "git+ssh://git@github.com/<Organization>/design-system.git#v<version>"`.

Then `bun install` (it updates `bun.lock`; commit both). Never a branch, a
bare commit without a tag, `file:` or a path.

Import in the App:

```astro
---
// An Astro layout or page.
import "design-system/styles.css";
import { Button, TextField } from "design-system/astro";
---
<Button variant="primary">Uložit</Button>
```

```tsx
// The React App's entry (main.tsx) imports the styles once…
import "design-system/styles.css";
// …and any component imports what it uses.
import { Button, TextField } from "design-system/react";

<Button variant="primary">Uložit</Button>;
```

What the package exports:

| Import | Gives |
| --- | --- |
| `design-system/styles.css` | Tokens, fonts, base styles, every component's CSS (import once) |
| `design-system/astro`, `design-system/astro/<Component>.astro` | The Astro components |
| `design-system/react` | The React components and everything of `design-system` |
| `design-system` (or `design-system/core`) | The framework-free core: class names, `resolveLocale()`, `readLazurioLocale()`, `showToast()`, `applyTheme()`, `contrast()`, the icons, the tokens and the brand |
| `design-system/tokens`, `design-system/brand` | The tokens and the brand as TypeScript |
| `design-system/tokens.css`, `design-system/fonts.css`, `design-system/css/<name>.css` | Parts of the styles, for a module that takes only some |

Nothing else is needed: Astro compiles the package's `.astro` files (the
package carries the `astro-component` keyword), Vite and Bun compile its
TypeScript and TSX, and its stylesheets declare their types, so
`import "design-system/styles.css"` type-checks without `vite/client`. The
package's tests install it this way into clean Astro and React (Vite,
TypeScript 7) projects and build them.

Pass the page's language to components that speak (`locale`), resolved with
`resolveLocale()` and `readLazurioLocale()` from `design-system`.

**Continuous integration.** A public design system installs in any CI. A
private one is installed with `git+ssh`: on an Environment with the person's
SSH key it works as it is; a module's GitHub Actions need read access to the
Organization's design system repository (for example a read-only deploy key
of that repository as a secret of the module and an SSH agent step). Setting
that up is the Organization's Admin's work; ask for it with the person
(skill `admin-request`) and do not create keys or secrets yourself.

### Taking a newer release

Change the tag in the dependency, run `bun install` and the App's check, read
the release's `CHANGELOG.md` entry for what the module must change, and open a
pull request that names the release. An Organization's new brand arrives the
same way: a new release of its design system, a new pin in each module.

### Switching from the template to the Organization's design system

A module that came from a Marketplace template depends on
`github:LazurioTemplates/design-system#v<version>`. Once the Organization has
adopted the design system and released it (part one), change the dependency
to `git+ssh://git@github.com/<Organization>/design-system.git#v<version>`;
the imports stay the same, because both packages are named `design-system`.

### Moving from a copy with a lock and a sync script

Some modules took design system 1.0.0 as a copy of `tokens.json` with their
own `lock.json` and a script (`design-system:sync`, `design-system:refresh`).
In one pull request:

1. Remove the copy, its lock, the script and its entry in `package.json`, and
   the code that turned the copied tokens into CSS custom properties.
2. Add the dependency and run `bun install`.
3. Import `design-system/styles.css`; replace the module's own variables with
   the `--ds-*` tokens (the mapping from 1.0.0 is in
   [`extending.md`](extending.md#from-100-to-200)) and its own copies of
   components with the package's.
4. Run the App's check and look at its pages in both themes.

### Moving from a subtree

Some modules merged design system 1.0.0 as a Git subtree (for example
`app/v3/design-system/`) with a `design-system.lock.json`. In one pull request:

1. Delete the subtree directory and `design-system.lock.json`, the test that
   checked the lock, and the exclusions made for the subtree (Biome
   `files.includes`, `bunfig.toml` `[test] root`, `tsconfig.json`), unless the
   module needs them for itself. The merged history stays in Git; nothing of
   it is imported any more.
2. Add the dependency and run `bun install`.
3. Replace imports of `<prefix>/app/v1/src/tokens.ts`,
   `<prefix>/app/v1/src/styles/global.css` and
   `<prefix>/app/v1/kit/...` with `design-system/...`: the styles, the
   tokens and the components (mapping in
   [`extending.md`](extending.md#from-100-to-200)).
4. Run the App's check and look at its pages in both themes.

## What you never do

- merge, tag, publish, change a repository's visibility or start anything for
  others without the person's explicit instruction;
- force-push, delete a branch, repository or data, or reset a protected
  branch; a failed or partial adoption keeps its worktree and tells the
  person exactly where to resume;
- import the design system by a relative path, copy its files into a module
  or depend on a branch: a module depends on the package at a released tag.
