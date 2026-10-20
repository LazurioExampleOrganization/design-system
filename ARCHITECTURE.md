# Design system architecture

## Role

The design system:

- extracts reusable truths from the Organization's production sources;
- holds the canonical tokens and brand rules;
- gives agents a repeatable workflow;
- makes visual outputs reviewable in Git;
- offers a read-only viewer for a quick preview.

## Authority model

Default precedence:

1. the website or another production presentation layer;
2. the knowledgebase or another brand or strategy source of truth;
3. the Organization voice guide for tone;
4. this design system as the curated baseline.

The design system never overrides production reality because a newer idea
looks better.

## Layers

### Brand baseline

`content/brand/` holds `colors/tokens.json` (the source of truth for colour
tokens), `colors/palette.md`, `typography/typography.md`, logos and assets
when they exist and may live in Git, and links to the canonical brand
documents.

### Examples

`content/examples/` holds references across categories. Every serious asset
has a sibling Markdown file with the metadata `title`, `source`, `date`,
`category` and `notes`.

### Templates

`content/templates/` holds starters for repeated formats. A template generated
from another module names its primary source.

### Viewer App

`app/v1/` is a read-only Astro viewer that follows the Lazurio Module
Standard:

- its only lease `main` lives in `lazurio.module.json`, inside the
  Organization port pool; the App reads it from the listener environment
  through `@lazurio/module-kit`, and the config reads it only when Astro
  serves, never during `astro build`;
- opened from `main`, it runs as its static build (`build_output: "dist"`,
  Module Standard 4.5): the Launchpad runs `build` (`astro build`, without the
  listener), serves `dist/` with its own small static server and builds again
  after a pull; `dev` (one Astro server) is the preview from a worktree or an
  explicit development start;
- it has no authentication and no authoring UI;
- it renders `content/`; `src/tokens.ts` reads and validates
  `content/brand/colors/tokens.json` at build time.

## Place in the Organization

The design system is a root-level module of the Organization (slot
`design-system`, mounted at `design-system/` next to `workspace/`). Apps of
other modules use its brand assets as a versioned dependency, never through a
relative path into this repository.

## Invariants

- The design system is a standalone repository, never a submodule.
- Another company's brand assets are never copied.
- Secrets never belong here.
- Production takes precedence over the curated mirror.
- The viewer stays read-only.
