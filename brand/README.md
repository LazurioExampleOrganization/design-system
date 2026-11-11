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

The brand of Lazurio Example Organization is invented: the Organization is
Lazurio's public reference Organization, and its name, logo, illustrations and
sample content describe no real company. The fonts are Inter, Inter Tight and
Geist Mono under the SIL Open Font License 1.1 (see `fonts/LICENSE-*.txt` and
the repository's `NOTICE`).

Adopted from: [`LazurioTemplates/design-system`](https://github.com/LazurioTemplates/design-system)
release `v2.0.0`, commit `05bc729581bd1aa1060b73fe8e03b3c38a56dcd3`, merged
over the adoption of `v1.0.0` (`fc64dc06b563587b215481c9d54b41f0d045aba8`).

## This Organization's copy

Notes for agents. This repository is the design system of Lazurio Example
Organization. The template grew out of it and was published with a fresh
history; the Organization took `v1.0.0` by one merge with
`--allow-unrelated-histories` and `v2.0.0` by a merge of its tag, so both
releases are ancestors and later ones arrive as ordinary merges
([Taking an update](../docs/extending.md#taking-an-update-of-the-template)).

- **What is the Organization's.** Everything in `brand/`; the identity
  (`lazurio.module.json`: `company` and the port lease; `lazurio.runtime` in
  `app/v1/package.json`: `id`, `title`, `company`, `module`); and
  `.github/CODEOWNERS`, which the template does not have. Everything else is
  the template's, word for word, including `AGENTS.md`, `README.md` and
  `docs/`, except the two tests below. Where those files speak of the
  template itself (the invented brand Example, the maintainer's releases and
  the registry), read them for this copy as the Organization: its brand is
  the one in this directory, and its tags and GitHub Releases are its own,
  made only on an Owner's instruction.
- **On every merge of a release**, the one rule in `AGENTS.md`,
  `docs/adoption.md` and `docs/extending.md` decides: keep `brand/` and the
  identity, take the template's side everywhere else, regenerate the
  generated files with `bun run tokens`, and resolve a file that mixes both
  with the person. Never move the Organization's brand out of `brand/` or
  edit a template file to carry it; propose such a change to the template.
- **Two local edits of template tests**, until a release fixes them
  ([LazurioTemplates/design-system#7](https://github.com/LazurioTemplates/design-system/issues/7)):
  `app/v1/tests/template.test.ts` checks this copy's own identity instead of
  the template's placeholders, and `app/v1/tests/build.test.ts` exempts every
  word of the brand name from the language check. They are files that mix
  both: on a merge keep these two edits and take the template's side for the
  rest, and once a release carries the fix, take the template's side whole.
- **The brand of 1.0.0, carried over.** The palette is the Organization's
  1.0.0 palette (`content/brand/colors/tokens.json` before `v2.0.0`):
  graphite is `neutral`, signal is `accent`, and `red`, `amber` and `green`
  keep their 1.0.0 steps 100, 400, 700 and 900. The steps 1.0.0 did not name
  are interpolated in OKLab between their neighbours. `roles` points the
  2.0.0 roles to the steps their 1.0.0 counterparts used (mapping in
  [From 1.0.0 to 2.0.0](../docs/extending.md#from-100-to-200)), and the
  primary action (`action`) stays signal blue instead of the template's
  black. In the dark theme `accent-strong` keeps the template's step, because
  the 1.0.0 hover blue fails text contrast there, and the floating
  `surface-raised` keeps the template's lighter step above the surface.
  The 1.0.0 radius (4, 8 and 12 px) stays. Without a 2.0.0 counterpart: the
  lumen highlight (its uses now take `accent-soft`), the lumen focus ring of
  the dark theme (focus is neutral ink, as in the template) and JetBrains
  Mono, which 1.0.0 named but never shipped.
- **Releases.** None yet. The Organization's modules depend on a released
  tag of this repository ([Release the Organization's design system](../docs/adoption.md#9-release-the-organizations-design-system));
  the repository is public, so `github:LazurioExampleOrganization/design-system#v<version>`
  installs without credentials.
- **The brand stays fictional and public**: never a real company's brand,
  content, customers or data in this repository.
