# Design system: rules for agents

This repository is the design system of an Organization: today the invented
brand Example. These rules add to the Organization root `AGENTS.md`.

## Before any visual or formatted work

1. Read [`DESIGN.md`](DESIGN.md): principles, colour, type, layout, depth,
   shape, components, motion, voice, accessibility and when to use what.
2. Use the skill `design-system` (`.agents/skills/design-system/`,
   `.claude/skills/design-system/`): how to apply this design system in a
   module, which component for which need, the checks before handing over.
3. For craft (layout, hierarchy, motion, a critique or an audit of a screen)
   use the vendored skill `impeccable`; this design system's rules win over
   its defaults.
4. Read the page of the component you use (`content/en/components/*.md`, or
   the viewer).

## Source of truth

In order of authority:

1. Production sources of the Organization (website, production UI, brand
   brief).
2. The brand in `brand/` and the system tokens in `tokens/tokens.json`.
3. Everything generated from them: `app/v1/kit/tokens.*`, `fonts.css`,
   `brand.ts`, `manifest.json`, `app/v1/public/favicon.svg`, `DESIGN.md`.
   Never edit these by hand; change a source and run `bun run tokens`.

When the design system disagrees with production, production is right and
the design system is updated.

## Which file for which output

| You are producing | Read and use |
| --- | --- |
| A screen of an App (React) | `DESIGN.md`, the component pages, `app/v1/kit/react` and `app/v1/kit/styles.css` |
| A website or knowledge base page (Astro) | `DESIGN.md`, the component pages, `app/v1/kit/astro/*.astro` and `app/v1/kit/styles.css` |
| A document, presentation or e-mail | `DESIGN.md` (colour roles, type roles, voice); values from `app/v1/kit/tokens.ts` |
| Interface text | `content/en/voice.md` (and `content/cs/voice.md`) |
| Anything that sends, publishes, pays or deletes | `content/en/when-to-use.md`: prepare a draft, confirm in a dialog, act only after the confirmation |
| A change of the brand | `brand/README.md`, then `docs/extending.md#replacing-the-brand` |
| A new component or token | `docs/extending.md#adding-a-component` |
| An adoption, or another module taking the design system | `docs/adoption.md` |
| A merge of a newer template release | `docs/extending.md#taking-an-update-of-the-template` and the rule below |

Use tokens by name (`--ds-color-ink`, `--ds-space-16`, `--ds-type-body-size`);
never invent a colour, size, space or duration. If what you need is missing,
propose it here in a pull request instead of improvising it in the output.

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

The table of every path is in
[`docs/extending.md`](docs/extending.md#who-owns-which-file). Notes of the
Organization for agents belong in `brand/README.md`, not here.

## Languages

Interfaces, samples and the viewer's pages are Czech and English; one screen
speaks one language. Every page has `content/cs/<page>.md` and
`content/en/<page>.md` with the same front matter; the tests check it. Code,
comments and the repository's documents are English.

## Lazurio Module Standard

- One repository is one module; the viewer App lives in `app/v1/`.
- `dev` starts one Astro server; `prepare:app` (`astro sync`) is the
  preparation and `check:prepared` checks it.
- Opened from `main`, the App runs as its static build (`build_output:
  "dist"`); `build` succeeds without the listener and writes
  `dist/index.html` for the health path `/`.
- The App reads its host and port only from
  `LAZURIO_RUNTIME_LISTENER_APP_HOST` and `_PORT` through
  `@lazurio/module-kit` and exits with code 2 without them. The port lives
  only in `lazurio.module.json`.
- No `.env*` files, secrets or imports from outside this repository.
- One change, one worktree, one branch, one pull request; the primary
  checkout stays on `main`.

## Template

This repository is a public template of the Marketplace of Lazurio (MIT,
`LICENSE` and `NOTICE`), published by LazurioTemplates. Everything in it must
stay publishable:

- only the invented brand Example; never a real company's brand, content,
  customers or data, and never a font, image, icon or skill without a
  license that allows it (record it in `NOTICE`);
- the App stays generation `app/v1` on the content stack profile with exact
  versions; tool versions change only in a stack profile release or a
  generation change (`docs/extending.md`);
- a change that adopted modules must follow in their own files is a major
  release and says what to do in `CHANGELOG.md`;
- keep `docs/adoption.md` and `docs/extending.md` true when you change what
  they describe, and refresh `docs/screenshots/cs/` and `/en/` when the App
  looks different;
- tags, GitHub Releases, merges and the registry entry are Publication: only
  on the maintainer's explicit instruction.

## Verification before a pull request

```sh
cd app/v1
bun install --frozen-lockfile
bun run tokens     # when brand/ or tokens/ changed
bun run check      # types, Biome and every test, the build included
lazurio module setup <path to the module> --root <Lazurio Folder> --json
```

Then look at the changed pages in a browser, in both languages and both
themes, at 390 px and 1280 px. The expected `module setup` status is
`current`.
