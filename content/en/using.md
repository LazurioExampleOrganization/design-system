---
title: "Using it in modules"
description: "A website, an App or presentations add the design system as a package: a dependency on a released version, moved when a new one comes."
do:
  - "Add the package `design-system` as a dependency on a released tag."
  - "Load the styles once (`design-system/styles.css`) and import components from `design-system/astro` or `design-system/react`."
  - "Take a new version or a new brand by moving the tag of the dependency."
dont:
  - "Do not copy the design system's files into a module or import them by a relative path."
  - "Do not depend on a branch; always on a released tag."
  - "Do not copy colour or space values into your own CSS; use the `--ds-*` variables."
---

## A package on a released version

The design system is the package `design-system`. A module adds it to its App's `package.json` as a dependency on a released tag, like every shared package in Lazurio. `bun.lock` records the tag's exact commit, so `bun install --frozen-lockfile` always installs the same.

```json
"design-system": "github:LazurioTemplates/design-system#v2.0.0"
```

An Organization's modules depend on its own design system, which carries its brand:

```json
"design-system": "git+ssh://git@github.com/<Organization>/design-system.git#v<version>"
```

The imports are the same in both cases, so moving from the template to the Organization's design system changes one line.

## What to import

- **Styles:** once, `design-system/styles.css`. It holds the tokens, the fonts, base styles and every component.
- **Astro:** `import { Button } from "design-system/astro";`
- **React:** `import { Button } from "design-system/react";`
- **Tokens in code:** `design-system/tokens` (colours for charts, space for calculations).

## A new version and a new brand

A module takes a new version of the design system and a new brand of the Organization the same way: it moves the tag in the dependency, runs `bun install` and its check, and looks at its pages in both themes.

## Language

Components speak Czech or English by their `locale` property. Decide the page's language as Lazurio does: first the person's explicit choice, then the language Lazurio gives, otherwise Czech. `resolveLocale()` and `readLazurioLocale()` from `design-system` help.
