# Design system architecture

## Layers

The design system has four layers. Each has its own authority and never
quietly takes over another's work.

1. **The brand** (`brand/`): the values that make the design system an
   Organization's own: name, palette, fonts, radius, logo, illustrations and
   its own pages. The only place an Organization changes when it adopts the
   template.
2. **The system tokens** (`tokens/tokens.json`): what the values are for:
   colour roles for the light and the dark theme pointing to steps of the
   brand's palette, the type scale, space, shadow, motion, sizes, z-index and
   breakpoints, and the role pairs that must reach WCAG contrast.
3. **The kit** (`app/v1/kit/`): the library, which `package.json` at the root
   exports as the package `design-system`. `tokens.css`, `tokens.ts`,
   `fonts.css`, `fonts/` and `brand.ts` are generated from the two sources; `css/` holds every component's styles composed only of
   tokens; `core/` the framework-free parts (class names, the components' own
   words in Czech and English, icons, dialog, tabs, toast and theme
   behaviour, the busy guard, contrast); `astro/` and `react/` the components with
   the same props and the same HTML.
4. **The viewer** (`app/v1/src/` with `content/`): a read-only Astro App that
   renders the guidelines and a page per component in both languages from
   the kit itself. It owns no value and no rule.

`DESIGN.md` is generated from the sources and the prose in `tokens/design.md`
and `brand/design.md`, for agents and DESIGN.md readers.

## Flow of a change

```text
decision → brand/ or tokens/ → bun run tokens → kit → viewer page → release (tag) → modules move their pin
```

A value starts in `brand/brand.json` or `tokens/tokens.json`. A component's
relation or state starts in `kit/css/` and in both renderers, together with
its page in `content/cs/` and `content/en/` and its view. Product data, copy
and information architecture stay in the module that uses the kit.

## Contracts

- Classes and custom properties carry the prefix `ds-`; nothing collides with
  Lazurio's own `--lz-*` tokens, which its shell declares on an App's page.
- The kit's CSS has no literal colour, length or duration; it reads only
  `--ds-*` tokens (the tests enforce it, media queries repeat the breakpoints).
- A state carries colour, icon and word; focus is a neutral ink ring.
- Buttons, fields and the dialog are native HTML elements.
- The Astro and the React component of the same name render the same HTML
  from the same input; `tests/build.test.ts` compares them.
- The kit imports nothing outside itself but React and Astro's types, so the
  package works in any module as it is.
- `package.json` at the root is a library package, not an App: no scripts, no
  `lazurio.runtime`, no dependencies, only optional peers on the profile's
  Astro and React. Its `exports` are the public paths; where the kit lies is
  not.
- Light is the default theme; `data-theme="dark"` switches every role, and
  without a choice the page follows `prefers-color-scheme`.

## Place in the Organization

The design system is a module of the Organization (slot `design-system`) and
its versioned package. Other modules depend on the package at a released tag
(`docs/adoption.md`), never on a path into this repository or a branch.

## Verification

`bun run check` runs the type check (`astro check`), Biome and the tests:
the token sources and the contrast of every role pair in both themes,
generated files up to date, the kit's CSS made only of tokens, its icons
unchanged, the components' words in both languages, the package installed from
Git into clean Astro and React (Vite, TypeScript 7) projects and built, the
content in both languages, the static build (every page in both languages, one
language per screen, one `h1`, unique ids, live links, named controls and
dialogs), the parity of the Astro and React components, a busy button that
does not act again in a real browser (Chrome), the start contract of
the Module Standard, paths that check out on Windows and the template
contract.
