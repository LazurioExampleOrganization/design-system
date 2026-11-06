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
bun run tokens   # regenerates kit/tokens.css, tokens.ts, fonts, brand.ts, the manifest and DESIGN.md
bun run check    # contrast of every role pair in both themes, and everything else
```

A palette whose roles fail WCAG contrast fails `bun run check`. Change a step
of the palette, or point a role to another step in `roles.light` or
`roles.dark`, for example `{ "accent": "accent.600" }`.

The Example brand is invented: the name, the logo, the illustrations and the
sample content describe no real company. The fonts are Inter, Inter Tight and
Geist Mono under the SIL Open Font License 1.1 (see `fonts/LICENSE-*.txt` and
the repository's `NOTICE`).

Adopted from: nothing yet; this is the template itself. An Organization records
here the template release and commit its design system was adopted from.
