# Design system

The design system of **Lazurio Example Organization**, Lazurio's public
reference Organization. All content is fictional.

Its job is simple: neither an agent nor a colleague should invent colours,
fonts, layouts or visual rules from scratch. First the Organization's
production source of truth is found; then a curated baseline is written here
that can be repeated across the website, presentations, documents, tables,
offers and internal tools.

The repository is a module that follows the
[Lazurio Module Standard](https://github.com/HumanAndMachines/Lazurio/blob/main/manual/module-standard.md).
It was split from the Organization root's in-tree `design-system/` directory
with its history (`git subtree split`). It has no template upstream.

## Layout

| Path | Holds |
|---|---|
| `BASELINE.md` | The human baseline for visual and formatted work |
| `INITIALIZATION.md` | The checklist for setting up or refreshing the design system |
| `content/brand/` | **Foundations**: the brand, voice and tone, the tokens (`colors/tokens.json`), colour roles, typography, spacing and radius, iconography |
| `content/components/` | Button, input, card, table, dialog, toast, badge and empty state, each with states, usage and accessibility |
| `content/patterns/` | Forms and validation, empty and error states, navigation, data tables, irreversible actions (Draft and Publish) |
| `content/writing/` | Interface text, documents and the terminology list |
| `content/templates/` | Starters: a research brief, an experiment review deck and an update e-mail |
| `content/examples/` | Reviewable references, including the four example screens the viewer renders |
| `app/v1/` | The read-only viewer App (Astro, TypeScript) |
| `lazurio.module.json` | Module id, port lease and Apps |

## Run the viewer

Start it through Lazurio (`lazurio module start
LazurioExampleOrganization/design-system`) or from the Launchpad. The App reads
its host and port only from the listener that Lazurio assigns and refuses to
start without it. Opened from `main`, Lazurio builds the viewer (`bun run
build`) and serves `dist/`; the Astro development server runs only for a
preview from a worktree or `lazurio module start --dev`. It only renders
`content/`; authoring happens by editing files in Git.

The viewer shows every Markdown page of `content/` at its path, the tokens of
both themes with their contrast ratios (**Tokens**), every component in its
states in both themes (**Gallery**) and the example screens of a fictional App
(**Screens**).

## Develop

```sh
cd app/v1
bun install --frozen-lockfile
bun run prepare:app   # astro sync
bun run check         # astro check and biome
bun test              # tokens, start and build contracts
bun run build         # static build
```

## Authority

When the design system disagrees with a production source (the website, a
production UI, the brand brief in the knowledgebase or the voice guide in the
Organization root), production wins and the design system is updated. The
design system is a curated mirror, never a parallel brand silo.
