# The kit

What modules use from the design system. A module merges a release of the
design system as a Git subtree and imports only from this directory
(`docs/adoption.md`, "Using the design system in another module"). Never edit
these files in place: `verifyLock()` in `core/lock.ts` fails, and the next
merge would lose the edit.

| Path | Holds |
| --- | --- |
| `styles.css` | Import once: tokens, fonts, base styles, every component |
| `tokens.css`, `tokens.ts` | The tokens as CSS custom properties (`--ds-*`, light and dark) and as TypeScript; generated |
| `fonts.css`, `fonts/` | The brand's fonts and their licences; generated |
| `brand.ts` | The brand's name, summary, logo and illustrations; generated |
| `css/` | One stylesheet per component, only tokens |
| `core/` | Class names, words in Czech and English, language, icons, dialog, tabs, toast, theme, contrast, the lock |
| `astro/` | The components for Astro |
| `react/` | The components for React (`index.ts` exports all) |
| `licenses/` | Licences of third-party material in the kit |
| `manifest.json` | SHA-256 of every file here; generated |

```astro
---
import "../design-system/app/v1/kit/styles.css";
import Button from "../design-system/app/v1/kit/astro/Button.astro";
---
<Button variant="primary">Uložit</Button>
```

```tsx
import "../design-system/app/v1/kit/styles.css";
import { Button } from "../design-system/app/v1/kit/react";

<Button variant="primary">Uložit</Button>;
```
