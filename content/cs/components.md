---
title: "Komponenty"
description: "Stavební kameny obrazovek. Každá komponenta je pro Astro i React se stejnými vlastnostmi a stejným HTML."
---

## Jak se používají

Styly se načtou jednou (`@design-system/styles.css`), komponenty se importují podle frameworku: v Astru z `@design-system/astro/`, v Reactu z `@design-system/react`. Obě podoby berou stejné vlastnosti; liší se jen tam, kde to framework vyžaduje (v Reactu `className` a `defaultValue`, v Astru sloty).

Test design systému vykreslí každou komponentu v obou frameworcích ze stejných vstupů a porovná HTML. Komponenta, která se v jednom rozejde, neprojde `bun run check`.
