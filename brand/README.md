# The brand

Everything that makes this design system the Organization's own lives here,
and only here. An Organization that adopts the template replaces these files;
a merge of a later template release keeps them (the ownership rule in
[`../docs/extending.md`](../docs/extending.md#who-owns-which-file)).

| File | Holds |
| --- | --- |
| `brand.json` | Name, a short summary in Czech and English, the repository, the palette (`neutral`, `accent`, `red`, `amber`, `green`), the fonts, the radius, the logo and illustrations, and optional overrides of colour roles per theme (`roles`) |
| `logo/symbol.svg` | The logo symbol; draws in `currentColor`, the accent detail reads `--ds-color-accent` |
| `fonts/` | The font files (WOFF2, Latin and Latin Extended) and their licences |
| `illustrations/` | Own line illustrations for empty states |
| `content/cs/brand.md`, `content/en/brand.md` | The brand page of the viewer |
| `design.md` | The brand's paragraph in `DESIGN.md` |

After a change run, in `app/v1`:

```sh
bun run tokens   # regenerates kit/tokens.css, tokens.ts, fonts, brand.ts, the favicon and DESIGN.md
bun run check    # contrast of every role pair in both themes, and everything else
```

Then release the design system (a tag, `docs/extending.md`); the modules of
the Organization take the new brand by moving their pin to that tag.

A palette whose roles fail WCAG contrast fails `bun run check`. Change a step
of the palette, or point a role to another step in `roles.light` or
`roles.dark`, for example `{ "accent": "accent.600" }`.

The Example brand is invented: the name, the logo, the illustrations and the
sample content describe no real company. The fonts are Inter, Inter Tight and
Geist Mono under the SIL Open Font License 1.1 (see `fonts/LICENSE-*.txt` and
the repository's `NOTICE`).

Adopted from: [`LazurioTemplates/design-system`](https://github.com/LazurioTemplates/design-system)
release `v2.0.0`, commit `05bc729581bd1aa1060b73fe8e03b3c38a56dcd3`, merged
over the adoption of `v1.0.0` (`fc64dc06b563587b215481c9d54b41f0d045aba8`).

## This Organization's copy

Notes for agents. This repository is the design system of Lazurio Example
Organization, Lazurio's public reference Organization. The template grew out
of it and was published with a fresh history; the Organization took `v1.0.0`
by one merge with `--allow-unrelated-histories` and `v2.0.0` by a merge of its
tag, so both releases are ancestors and later ones arrive as ordinary merges
([Taking an update](../docs/extending.md#taking-an-update-of-the-template)).

- **The brand is the template's Example brand**, by the Owner's decision of
  2026-11-11. Everything in this directory is the template's `v2.0.0` word
  for word (palette, roles, fonts, radius, logo, illustrations, the brand
  page and `design.md`) except the identity: `name`, `summary` and
  `repository` in `brand.json`, and in this file the line "Adopted from" and
  this section. The brand page and `design.md` keep the name Example, the
  name of the invented brand and logo the Organization wears. Lazurio's
  product name and logo never go into the brand; the word Lazurio appears
  only as part of the Organization's name. The `v1.0.0` brand (graphite and
  signal blue) is not carried over.
- **What is the Organization's.** Everything in `brand/`; the identity
  (`lazurio.module.json`: `company` and the port lease; `lazurio.runtime` in
  `app/v1/package.json`: `id`, `title`, `company`, `module`); and
  `.github/CODEOWNERS`, which the template does not have. Everything else is
  the template's, word for word, including `AGENTS.md`, `README.md` and
  `docs/`, except the local edits below. Where those files speak of the
  template itself (the maintainer's releases and the registry), read them for
  this copy as the Organization: its tags and GitHub Releases are its own,
  made only on an Owner's instruction.
- **On every merge of a release**, the one rule in `AGENTS.md`,
  `docs/adoption.md` and `docs/extending.md` decides: keep `brand/` and the
  identity, take the template's side everywhere else, regenerate the
  generated files with `bun run tokens`, and resolve a file that mixes both
  with the person. Never move the Organization's brand out of `brand/` or
  edit a template file to carry it; propose such a change to the template.
- **Local edits of template files**, until a release makes them unnecessary.
  They make these files mix both: on a merge keep the edits and take the
  template's side for the rest, and once a release carries the fix, take the
  template's side whole.
  - The Organization's name in the viewer's texts
    ([LazurioTemplates/design-system#8](https://github.com/LazurioTemplates/design-system/issues/8)).
    The template writes the name Example into `content/<locale>/index.md`
    (title, description, text) and into the descriptions of `voice.md` and
    `principles.md`, outside `brand/`. In both languages these lines name
    Lazurio Example Organization instead, and the overview says what follows
    a replaced brand (the tokens, the components and the viewer's header)
    instead of "everything else". The invented App on `examples/app` stays
    the template's Example App.
  - Two template tests
    ([LazurioTemplates/design-system#7](https://github.com/LazurioTemplates/design-system/issues/7)):
    `app/v1/tests/template.test.ts` checks this copy's own identity instead of
    the template's placeholders, and `app/v1/tests/build.test.ts` exempts
    every word of the brand name from the language check.
- **Releases.** None yet. The Organization's modules depend on a released
  tag of this repository ([Release the Organization's design system](../docs/adoption.md#9-release-the-organizations-design-system));
  the repository is public, so `github:LazurioExampleOrganization/design-system#v<version>`
  installs without credentials.
- **The brand stays fictional and public**: never a real company's brand,
  content, customers or data in this repository.
