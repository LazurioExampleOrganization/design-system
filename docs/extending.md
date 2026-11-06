# Extending the design system

How to keep developing the design system after it was adopted, how to replace
the brand and add a component, how to take a newer release of the template
(including the move from 1.0.0 to 2.0.0), and how the template itself is
released. For the first adoption and for modules that use the design system
see [adoption.md](adoption.md).

## Generation and stack profile

The App is generation **`app/v1`**: the content is Markdown and JSON in Git,
edited through pull requests, with no data of its own. The tools follow the
stack profile **[`content@2026.11`](https://github.com/Lazurio/LazurioPlatform/blob/main/docs/stack-profiles.md#content)**:

| Tool | Version | Why |
| --- | --- | --- |
| Bun (`packageManager`, runtime, tests) | 1.4.4 | The App's runtime in Lazurio; `bun test` needs no other runner |
| Astro | 7.4.5 | Static build, content collections |
| `@astrojs/check` | 0.9.12 | Type check of `.astro` files |
| TypeScript | 6.0.3 | `astro check` does not support TypeScript 7 yet |
| Biome | 2.6.4 | Lint and format in one tool |
| `@lazurio/module-kit` | 0.2.0 | Listener, shutdown and development server options |

The App adds, as development dependencies only, React and React DOM 19.3.1
with `@types/react` and `@types/react-dom` 19.3.0 (the pins of the `app`
profile), to type-check the React components and render them in the parity
test, and `iconoir` 7.12.2, the source of the icons. The viewer renders no
React island. Every version is exact, `bun.lock` is committed, and Biome keeps
its Markdown and YAML formatters off and leaves `.astro` files out.

## Who owns which file

> When a merge of a release conflicts, the template's side wins for code and
> components and the Organization's side wins for its brand, brand tokens and
> content: take the template's version of every file outside `brand/`, keep
> the Organization's `brand/` and its identity (`lazurio.module.json` and the
> `id`, `title`, `company` and `module` of `lazurio.runtime` in
> `app/v1/package.json`), regenerate the generated files with
> `bun run tokens` instead of merging them by hand, and resolve a conflict in
> a file that mixes both, such as `app/v1/package.json`, together with the
> person, deliberately.

| Path | Owner | On a conflict |
| --- | --- | --- |
| `brand/**` (brand.json, logo, fonts, illustrations, content, design.md, README.md) | The Organization | Keep the Organization's side |
| `lazurio.module.json` | The Organization (identity) | Keep the Organization's side; a release that changes `apps` says so in its changelog |
| `app/v1/package.json` | Mixed: `lazurio.runtime` `id`, `title`, `company`, `module` are the Organization's, the rest the template's | Resolve deliberately with the person |
| `tokens/`, `content/`, `app/v1/kit/` (hand-written parts), `app/v1/src/`, `app/v1/scripts/`, `app/v1/tests/`, configuration, `bun.lock`, `.github/`, `.agents/`, `.claude/`, `.impeccable/`, `docs/`, `README.md`, `AGENTS.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `LICENSE`, `NOTICE` | The template | Take the template's side |
| Generated: `DESIGN.md`, `app/v1/kit/tokens.css`, `tokens.ts`, `fonts.css`, `fonts/`, `brand.ts`, `manifest.json`, `app/v1/public/favicon.svg` | Generated from `brand/` and `tokens/` | Take either side, then `bun run tokens` |

The files are split so that this rule rarely meets a real conflict: an
Organization changes only `brand/`, a release changes everything else. An
Organization that needs something of the template's to be different
(a component, a role, a page of the viewer) proposes it to the template
rather than editing it locally; a local edit is a file that mixes both.

## Changes within the generation

Most work is here and needs no plan beyond an ordinary pull request. Before
it, in `app/v1`: `bun run tokens` when a source changed, then `bun run check`.

### Replacing the brand

Everything happens in `brand/` (see [`brand/README.md`](../brand/README.md)):

1. `brand/brand.json`: `name`, `summary` (Czech and English), `repository`,
   the `palette` (`neutral` 0–1000, `accent`, `red`, `amber`, `green`, steps
   50–950), the `fonts` (family, fallbacks, WOFF2 files and their subset),
   the `radius` and the paths of the logo and illustrations.
2. Font files and their licences into `brand/fonts/`; only fonts whose
   licence allows embedding and redistribution (SIL OFL is the usual one), and
   record them in `NOTICE` of the Organization's module.
3. The logo symbol `brand/logo/symbol.svg`: one `<svg>` with a `viewBox`,
   drawn in `currentColor`; an accent detail may read
   `var(--ds-color-accent, #……)`.
4. The illustrations in `brand/illustrations/`, own or with a licence that
   allows changes and redistribution.
5. The brand pages `brand/content/cs/brand.md` and `en/brand.md`, and the
   paragraph `brand/design.md` for `DESIGN.md`. Further pages of the
   Organization go into `brand/content/<locale>/<name>.md`, in both
   languages; the viewer lists them after the brand page by itself.
6. `bun run tokens`, `bun run check`. The tests compute the contrast of every
   role pair in both themes; a palette that fails names the pair. Fix it with
   a palette step, or point the role to another step in
   `roles.light` / `roles.dark` of `brand.json`
   (`{ "accent": "accent.600" }`).
7. Look at the viewer in both themes and languages and refresh the
   screenshots if the module shows them.

### Adding a token

A colour role goes into `tokens/tokens.json` `color` with its light and dark
step and its use in Czech and English; add the pairs it must pass to
`contrast`. A size, space or duration goes into its group. Run
`bun run tokens`; use the token as `var(--ds-<group>-<name>)`.

### Adding a component

1. `app/v1/kit/css/<name>.css` composed only of tokens, classes `ds-<name>…`,
   hover inside `@media (hover: hover) and (pointer: fine)`, motion with a
   reduced-motion variant; import it in `app/v1/kit/styles.css`.
2. Shared logic in `app/v1/kit/core/` (class names, words in
   `core/i18n.ts` for both languages, behaviour without a framework).
3. `app/v1/kit/astro/<Name>.astro` and `app/v1/kit/react/<Name>.tsx` with the
   same props and the same HTML; export them in `astro/index.ts` and
   `react/index.ts`.
4. Fixtures in `app/v1/tests/parity-fixtures.ts` for each variant: the test
   renders both and compares the HTML.
5. The page: `content/cs/components/<name>.md` and `content/en/…` (front
   matter with `do` and `dont`), a view in `app/v1/src/views/components/`,
   its entry in `app/v1/src/lib/site.ts` and in `[...path].astro`.
6. `bun run tokens` (the kit's manifest changes), `bun run check`, a look in
   the browser, the changelog under a minor release.

### Adding an icon

Add its Iconoir name to `ICONS` in `app/v1/scripts/icons.ts` and run
`bun run icons` and `bun run tokens`. Icons are never drawn by hand.

## Taking an update of the template

A newer release reaches an adopted design system as a merge of its tag, never
as a copy. In a task worktree of the module:

```sh
git fetch template tag v<version>
test "$(git rev-parse 'v<version>^{commit}')" = "<commit from the Marketplace registry>"
git merge --no-ff -m "Design system: take template release v<version>" 'v<version>^{commit}'
```

Read the release's `CHANGELOG.md` entry first, resolve by the rule in
[Who owns which file](#who-owns-which-file), then
`bun install --frozen-lockfile`, `bun run tokens` and `bun run check`, and open
a pull request that names the release and its commit. Declining the pull
request keeps the module as it was; an undo is a reviewed revert, never a
reset. Modules that use the design system take the module's new state the
same way ([adoption.md](adoption.md#taking-a-newer-release)).

### From 1.0.0 to 2.0.0

2.0.0 rebuilds the design system, so the merge touches almost every file. In
an adopted design system module:

1. Before merging, keep what is the Organization's: its palette and theme
   roles in `content/brand/colors/tokens.json`, its brand texts in
   `content/brand/`, its own screens and templates, and the `REPOSITORY` of
   `app/v1/src/lib/routes.ts`
   (`git show HEAD:content/brand/colors/tokens.json > ~/Documents/<task>/tokens-1.0.0.json`).
2. Merge `v2.0.0`. Take the template's side everywhere outside `brand/`;
   files that 2.0.0 deletes (`BASELINE.md`, `INITIALIZATION.md`, the old
   `content/` and viewer) are deleted, also when the Organization had changed
   them.
3. Put the Organization's brand into `brand/` ([Replacing the brand](#replacing-the-brand)):
   the 1.0.0 primitives become palette ramps, the 1.0.0 roles become role
   overrides where the default mapping does not fit. The roles map like this:

   | 1.0.0 role | 2.0.0 role |
   | --- | --- |
   | `surface` (page) | `bg` |
   | `surface-raised` | `surface`, and `surface-raised` for the floating layer |
   | `surface-sunken` | `surface-muted` |
   | `text`, `text-muted`, `text-subtle` | `ink`, `ink-muted`, `ink-muted` (`ink-faint` is never text) |
   | `border`, `border-strong` | `line`, `line-strong` |
   | `accent`, `accent-hover`, `accent-text`, `accent-subtle`, `on-accent` | `accent`, `accent-strong`, `accent`, `accent-soft`, `on-accent` |
   | `focus` | `focus` (now neutral ink, not the accent) |
   | `success`, `warning`, `danger` and their `-subtle` | the same roles and their `-soft`, with `-line` borders |
   | `highlight`, `on-highlight` | no counterpart; use `accent-soft` |
   | `scrim` | `--ds-shadow-overlay` |

4. Move the Organization's brand texts into `brand/content/cs/` and `en/`
   (both languages), and `REPOSITORY` into `brand.json` `repository`.
5. `bun run tokens`, `bun run check`, a look at the viewer, a pull request.

A module that took 1.0.0 as a subtree merges `v2.0.0` the same way
(`git merge -X subtree=<prefix> 'v2.0.0^{commit}'`), updates its lock to the
2.0.0 shape (`tag`, `commit`, `tree`, `prefix`) and replaces imports of
`app/v1/src/tokens.ts` and `app/v1/src/styles/global.css` with
`app/v1/kit/styles.css`, `app/v1/kit/tokens.ts` and the kit's components. A
module that took a copy of `tokens.json` with a sync script moves to the
subtree ([adoption.md](adoption.md#moving-from-a-copy-with-a-lock-and-a-sync-script)).

## When the module would change generation

Only when it gets data of its own, for example when the Organization wants
people to edit tokens in a form with a draft that someone reviews and
publishes. Then the data moves to repository-db and the App becomes `app/v3`
beside `app/v1`, on the profile for Apps with data; `default_app` switches
only on the decision of the Organization's Steward or the person; the module
keeps at most two generations. A move to `app/v2` brings nothing. The kit's
path would change with the generation, so such a release is major.

## Releasing the template

This part is for the maintainers of `LazurioTemplates/design-system`. A
release is an annotated tag `v<semver>` on `main` and a GitHub Release; the
Marketplace registry records the full commit of the tag. Creating the tag and
the Release is a Publication and waits for the maintainer's explicit
instruction.

The version is semantic and independent of the generation:

- **major**: a module must change its own files to take it: the shape of
  `brand/brand.json` or of the lock, a renamed or removed token, class, prop
  or file of the kit, a new generation, a stack profile release that breaks
  code;
- **minor**: new components, variants, tokens, pages or tests, or a stack
  profile release that needs no change in modules;
- **patch**: fixes, and patch versions of tools for a security fix.

Tool versions change only in a **profile release** of Lazurio (`YYYY.MM`) or
a **generation change**; besides these, only a patch version with a security
fix. The template names the profile release in `README.md` and
`CHANGELOG.md`.

Before a release:

1. Update `CHANGELOG.md` and `version` in `app/v1/package.json`, then
   `bun run tokens` (the kit's manifest carries the version).
2. Refresh the screens in `docs/screenshots/cs/` and `docs/screenshots/en/`
   when the App looks different: the same shots in both languages, WebP,
   1600 px wide, taken from the static build at twice the pixel density of a
   1440 × 900 window and scaled down, invented content only. The first file of
   the registry's list is the Marketplace card.
3. Run `bun run check` and wait for green CI on `main`.
4. On the instruction: `git tag -a v<version> -m "v<version>"`, push the tag,
   `gh release create v<version> --verify-tag`, then a pull request to the
   registry (`Lazurio/marketplace`) with the tag's full commit.
