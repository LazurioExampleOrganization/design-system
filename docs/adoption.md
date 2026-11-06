# Adopting the design system

This guide is for the agent that works for a person. It has two parts:

- [Adopting the template into an Organization](#adopting-the-template-into-an-organization):
  the Organization gets its own design system module, usually after
  "Přidat do Organizace" in the Marketplace of Lazurio.
- [Using the design system in another module](#using-the-design-system-in-another-module):
  a website, a knowledge base, an App or presentations take the
  Organization's design system (or, for a Marketplace template, this
  template) as a locked subtree.

Adoption is an agent's reviewed work in pull requests, not an installer. The
person decides; the agent prepares. Nothing is merged, tagged, published or
granted without the person's explicit instruction.

## Who keeps which side

Both parts take later releases by merge, and every merge follows one rule:

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

### 9. Access for Teams, last

Who may open the module follows the Organization's manifest and live GitHub
grants. The Marketplace grants nothing. Change access only as the last step
and only on the person's instruction.

## Using the design system in another module

### The one way: a subtree of a release, with a lock

A module that wants the Organization's look merges a release of the design
system as a **Git subtree** into a directory of its App (for example
`app/v3/design-system/`), records it in **`design-system.lock.json`** and
imports only from `<prefix>/app/v1/kit`. This is the only way from 2.0.0 on,
for three reasons:

- **Updates are merges of a tag.** The release stays an ancestor of the
  module, so the next one arrives with `git merge -X subtree=<prefix>` and Git
  resolves what changed on both sides. A copy refreshed by a script loses
  that: every refresh overwrites, and nothing tells an update from a local
  edit.
- **The brand stays the Organization's.** Inside an Organization the module
  merges the Organization's own design system module, whose `brand/` holds its
  brand; that module itself took the template by merge, so the template's
  later releases reach every module through it, with the brand intact.
- **One kit for Astro and React.** The subtree carries the whole kit: the
  styles, the tokens as CSS and TypeScript, the fonts and both renderers. An
  Astro site imports `kit/astro/*.astro`, a React App `kit/react`; no module
  needs its own sync script or its own conversion of the tokens.

The lock makes the copy controlled: the module's test fails when the subtree
is not the locked release (an edit in place) or a file of the kit differs from
its manifest.

### Where the design system comes from

- A module of an Organization: the Organization's design system module, at a
  commit of its `main` (tag `main` in the lock) or a tag it made.
- A template of the Marketplace (`LazurioTemplates/*`): this template, at a
  release tag. When an Organization adopts such a template, it then merges its
  own design system into the same prefix (below, "Switching to the
  Organization's design system").

### Taking it the first time

In a task worktree of the module, with `<prefix>` the directory inside the
App (so the App's `node_modules` resolves React for the kit):

```sh
git remote add design-system https://github.com/<owner>/design-system.git
git fetch design-system tag v<version>            # or: git fetch design-system main
commit=$(git rev-parse 'v<version>^{commit}')     # check it against the registry or the brief
git merge -s ours --no-commit --allow-unrelated-histories "$commit"
git read-tree --prefix=<prefix>/ -u "$commit"
git commit -m "Design system: take <owner>/design-system v<version> as <prefix>"
```

Then write `<App>/design-system.lock.json`:

```json
{
  "schema": "design-system.lock.v1",
  "repository": "<owner>/design-system",
  "tag": "v<version>",
  "commit": "<full commit>",
  "tree": "<git rev-parse '<commit>^{tree}'>",
  "prefix": "<prefix>"
}
```

and a test of the App (Bun):

```ts
import { test, expect } from "bun:test";
import { resolve } from "node:path";
import lock from "../design-system.lock.json";
import { verifyLock } from "../design-system/app/v1/kit/core/lock";

test("the design system is the locked release, untouched", () => {
  expect(verifyLock(resolve(import.meta.dir, "../../.."), lock)).toEqual([]);
});
```

### Wiring it into the App

- **Styles**: import `<prefix>/app/v1/kit/styles.css` once (the layout of an
  Astro site, the entry of a React App).
- **Components**: Astro `import Button from "<prefix>/app/v1/kit/astro/Button.astro"`;
  React `import { Button } from "<prefix>/app/v1/kit/react"`. An alias
  `@design-system/*` → `<prefix>/app/v1/kit/*` in `tsconfig.json` (and
  `resolve.alias` in Vite) shortens it.
- **Your own tooling stays yours**: exclude `<prefix>` from Biome
  (`"!design-system"` in `files.includes`), keep the App's tests to its own
  directory (`bunfig.toml`: `[test] root = "./tests"`), and keep `<prefix>` out
  of the App's `tsconfig.json` `include` (and out of `astro check`); the files
  you import are still type-checked.
- **Language**: pass the page's language to components that speak
  (`locale`), resolved with `resolveLocale()` and `readLazurioLocale()` from
  `kit/core/i18n.ts`.

### Taking a newer release

```sh
git fetch design-system tag v<version>
git merge -X subtree=<prefix> --no-ff -m "Design system: take v<version>" 'v<version>^{commit}'
```

Update `tag`, `commit` and `tree` in the lock, read the release's
`CHANGELOG.md` entry for what the module must change, run the App's check and
open a pull request. Inside `<prefix>` there is nothing of the module's own,
so there is nothing to keep; the module's own files follow the changelog.

### Switching to the Organization's design system

A module that came from a Marketplace template carries this template's
release. Once the Organization has adopted the design system (part one), merge
the Organization's module into the same prefix with
`git merge -X subtree=<prefix>` and update the lock. Because the
Organization's design system contains the template's release as an ancestor,
the merge brings exactly the Organization's brand and anything it added.

### Moving from a copy with a lock and a sync script

Some modules took design system 1.0.0 as a copy of `tokens.json` with their
own `lock.json` and a script (`design-system:sync`, `design-system:refresh`).
They move to the subtree in one pull request:

1. Remove the copy, its lock and the script, and the code that turned the
   copied tokens into CSS custom properties.
2. Take the design system as a subtree (above) and write
   `design-system.lock.json` in the new shape.
3. Import `kit/styles.css`; replace the module's own variables with the
   `--ds-*` tokens (the mapping from 1.0.0 is in
   [`extending.md`](extending.md#from-100-to-200)) and its own copies of
   components with the kit's.
4. Run the App's check and look at its pages in both themes.

## What you never do

- merge, tag, publish, change a repository's visibility or start anything for
  others without the person's explicit instruction;
- force-push, delete a branch, repository or data, or reset a protected
  branch; a failed or partial adoption keeps its worktree and tells the
  person exactly where to resume;
- edit files inside a merged design system in place, or read this
  repository's files at run time: a module takes it by merge.
