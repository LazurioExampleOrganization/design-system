# Changelog: design system

From 1.0.0 a release is an annotated tag `v<semver>` with a GitHub Release,
and the version is independent of the App generation (`docs/extending.md`).
The dated entries below (`YYYYMMDD`) come from before the template.

## 2.0.0 (proposed)

The design system becomes a full design system in the look of Lazurio, with
the brand of the invented company Example in one place. The App stays
generation `app/v1` on the stack profile `content@2026.11`. This is a major
release: modules that took 1.0.0 change their own files
([From 1.0.0 to 2.0.0](docs/extending.md#from-100-to-200)).

### Added

- `brand/`: the whole brand in one place: `brand.json` (name, summary in
  Czech and English, repository, palette ramps, fonts, radius, logo,
  illustrations, role overrides), the logo symbol, three own illustrations,
  Inter, Inter Tight and Geist Mono as self-hosted variable WOFF2 files with
  their OFL licences, and the brand pages.
- `tokens/tokens.json`: 33 colour roles for the light and the dark theme,
  the role pairs that must reach WCAG contrast, 12 type roles, space, shadow,
  motion (durations and curves), sizes, z-index and breakpoints;
  `tokens/design.md`, the prose of `DESIGN.md`.
- `bun run tokens` generates from these two sources the CSS custom
  properties (`app/v1/kit/tokens.css`, prefix `--ds-`, light, dark and the
  device's choice), the TypeScript tokens, `@font-face`, the logo and
  illustrations as markup, the favicon, the kit's manifest and `DESIGN.md` in
  the DESIGN.md format.
- `app/v1/kit/`, the library modules use: `styles.css`; components for Astro
  and React with the same props and HTML: Button, TextField, TextArea, Select,
  Checkbox, RadioGroup, Switch, Table, Card, Dialog (native modal), Nav,
  Breadcrumbs, Tabs, Badge, Tag, Alert, Toast with ToastRegion and
  `useToasts`, EmptyState, Icon and Logo; a framework-free core (class names,
  the components' own words in Czech and English, Lazurio's language
  resolution, dialog, tabs, toast and theme behaviour, contrast, the lock);
  48 Iconoir icons (MIT).
- The viewer in Czech at `/` and in English at `/en/`: principles, voice and
  writing, accessibility, when to use what, colour (palette, roles, live
  contrast table), typography, space and shape, motion, icons,
  illustrations, the brand, every component with an example in both themes,
  its states, use, do and don't and code for Astro and React, and one App
  screen built only from the kit. A language and a theme switch.
- Skills for agents: `design-system` (how to use this design system) and the
  Impeccable design skill 4.7.0 (Apache-2.0), vendored from its upstream tag
  by `app/v1/scripts/vendor-impeccable.sh`.
- One way for other modules: a Git subtree of a release with
  `design-system.lock.json` and `verifyLock()`
  ([adoption.md](docs/adoption.md#using-the-design-system-in-another-module)).
- Tests: the token sources, contrast of every role pair in both themes,
  generated files up to date, the kit's CSS made only of tokens, the kit
  whole, the lock, the icons, both languages of every page and of the
  components' words, one language per screen, the static build, the parity of
  the Astro and React components, and the template contract.
- Screens for the Marketplace in `docs/screenshots/cs/` and
  `docs/screenshots/en/`.

### Changed

- `docs/adoption.md`: an Organization whose design system has an unrelated
  history (the one this template grew out of) merges the release once with
  `--allow-unrelated-histories` and keeps its repository (issue #3); the
  identity now lives in `brand/brand.json` and `brand/README.md`.
- One rule for merging a release, the same in `AGENTS.md`,
  `docs/adoption.md` and `docs/extending.md`: the template's side for code
  and components, the Organization's for its brand, brand tokens and content,
  generated files regenerated, a file that mixes both resolved with the
  person.
- The colour of focus is neutral ink; the primary button is black in light
  and white in dark.

### Removed

- `BASELINE.md`, `INITIALIZATION.md`, `content/brand/colors/tokens.json` and
  the 1.0.0 content (`content/brand`, `components`, `patterns`, `writing`,
  `templates`, `examples`): their guidance is in `DESIGN.md` and the new
  pages; the tokens are in `brand/brand.json` and `tokens/tokens.json`.
- The 1.0.0 viewer, `app/v1/src/tokens.ts` and `app/v1/src/styles/global.css`;
  `@astrojs/markdown-remark` (the viewer no longer rewrites links).

### For adopted modules

- An adopted design system merges `v2.0.0`, takes the template's side outside
  `brand/` and puts its own palette, roles and texts into `brand/`
  ([From 1.0.0 to 2.0.0](docs/extending.md#from-100-to-200)).
- A module that took 1.0.0 as a subtree merges `v2.0.0` with
  `-X subtree=<prefix>`, updates its lock and imports `app/v1/kit/styles.css`
  and the kit's components instead of `app/v1/src/tokens.ts` and
  `global.css`.
- A module that copied `tokens.json` with a sync script moves to the subtree
  ([adoption.md](docs/adoption.md#moving-from-a-copy-with-a-lock-and-a-sync-script)).

## 1.0.0 — 2026-11-03

The first release as a public template of the Marketplace of Lazurio. The App
stays generation `app/v1`.

### Added

- `LICENSE` (MIT) and `NOTICE`: what the license covers, that the brand is
  fictional, and the third-party notes (no font, image or icon file is
  distributed; Inter and JetBrains Mono are named in the font stacks only).
- `docs/adoption.md`: how an agent adopts the template into another
  Organization (live rights, name collision, `lazurio module create`, a merge
  that keeps the release as an ancestor, the Organization's own brand, Teams
  last, nothing published without the person's instruction).
- `docs/extending.md`: changes within the generation, when the module would
  change generation, taking a newer release by merging its tag, the release
  rules, and how the website, knowledge base and presentations templates
  build on the design system.
- Five screens for the Marketplace card in `docs/screenshots/` (WebP, 1600 px,
  invented content).
- Tests for paths that check out on Windows and for the template contract
  (license, documents, exact versions, Bun in CI, screens).

### Changed

- Stack profile `content@2026.11` of Lazurio: Bun 1.4.2 → 1.4.4, Astro 5.18.2 → 7.4.5,
  `@astrojs/check` 0.9.9 → 0.9.12, TypeScript 5.9.3 → 6.0.3, Biome 2.4.15 →
  2.6.4, `@types/bun` 1.4.2 → 1.4.4, and `@astrojs/markdown-remark` 7.3.5 for
  the `unified()` processor that runs the link rewrite. Every version is
  exact. Biome keeps its Markdown and YAML formatters off, as the profile
  asks. The built pages look the same as before (compared pixel by pixel).
- `bun run check` runs the type check, Biome and every test; CI runs only that
  command, with `concurrency` and a timeout.
- README and AGENTS describe the template; the Module Standard link points to
  `Lazurio/LazurioPlatform`.
- Source: `LazurioTemplates/design-system` publishes the template, with fresh
  Git history from the tree of LazurioExampleOrganization/design-system#7. The
  Organization identity is placeholders (`company` `REPLACE-WITH-ORG-NAME`,
  runtime id `replace-with-org-slug-design-system-v1`, port lease 24902), the
  invented brand is called Example (its wordmark already was), and
  `.github/CODEOWNERS` is not part of the template.

### For adopted modules

Nothing yet: this is the first release.

## 20261027

### Added

- A complete fictional design system as the reference example (issue #5):
  foundations (brand, voice and tone, colour roles for light and dark themes,
  type scale, spacing and radius, iconography), eight components with states,
  usage and accessibility, five patterns including Draft and Publish for
  irreversible actions, writing rules and terminology, three templates
  (research brief, review deck, update e-mail) and four example screens.
- The viewer renders every page of `content/`, the tokens of both themes with
  contrast ratios, a gallery of the components and the example screens, with a
  light and dark switch.
- Tests for the token contract, WCAG AA contrast of the role pairs the
  components use, the content of every layer, links between pages and the
  pages of the build.

### Changed

- `tokens.json` moved from a flat draft palette to primitives, theme roles and
  scales (status `reference`).

## 20261020

### Changed

- Opened from `main`, the viewer App runs as its static build instead of the
  Astro development server: `app/v1/package.json` declares `build_output:
  "dist"` and `static_fallback: "404"`, and the Launchpad builds the commit
  (`astro build`), serves `dist/` with its own small static server and builds
  again after a pull (Module Standard 4.5, LazurioPlatform F58). `dev` stays
  the preview from a worktree. A build contract test checks that the build
  succeeds without the listener and that the health path `/` is a file of
  the output.

## 20261016

### Changed

- Split from the Organization root's in-tree `design-system/` into its own
  repository.
- Adopted the Lazurio Module Standard: the viewer moved from `app/` to
  `app/v1/`, is TypeScript only and reads its listener through
  `@lazurio/module-kit`; preparation (`astro sync`) and a single-process `dev`
  are declared; Bun is pinned to 1.4.2 with a fresh `bun.lock`; `bun run
  check` and `bun test` run in CI.
- The colour tokens now have the shape the viewer reads (`name`, `status`,
  `source`, `colors`) and are validated by a test; the viewer shows the draft
  palette it already used.
- README, AGENTS, ARCHITECTURE and the viewer page are in English.
- BASELINE, INITIALIZATION and the brand content (palette, typography,
  examples) are in English; the palette is described as the draft working
  palette in `tokens.json`.

### Removed

- The listener script that read the module's own lease file and the legacy
  `LAZURIO_RUNTIME_HOST/PORT` pair.
