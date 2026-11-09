# The kit

The library that `package.json` at the root of the repository exports as the
package `design-system`. Modules add the package as a Git dependency on a
released tag and import from `design-system/...`, never from these paths
(`docs/adoption.md`, "Using the design system in another module").

| Path | Holds | Import |
| --- | --- | --- |
| `styles.css` | Tokens, fonts, base styles, every component | `design-system/styles.css` |
| `tokens.css`, `tokens.ts` | The tokens as CSS custom properties (`--ds-*`, light and dark) and as TypeScript; generated | `design-system/tokens.css`, `design-system/tokens` |
| `fonts.css`, `fonts/` | The brand's fonts and their licences; generated | `design-system/fonts.css` |
| `brand.ts` | The brand's name, summary, logo and illustrations; generated | `design-system/brand` |
| `css/` | One stylesheet per component, only tokens | `design-system/css/<name>.css` |
| `core/` | Class names, words in Czech and English, language, icons, dialog, tabs, toast, theme, busy guard, contrast | `design-system`, `design-system/core/<name>` |
| `astro/` | The components for Astro | `design-system/astro`, `design-system/astro/<Name>.astro` |
| `react/` | The components for React | `design-system/react` |
| `licenses/` | Licences of third-party material in the kit | |
| `css.d.ts` | The stylesheets' types (a side-effect import) | |
