---
title: "Using it in modules"
description: "How a website, an App or presentations take the design system as a controlled copy with a lock, and how they take new releases."
do:
  - "Take the design system by merging its release (the tag) into a directory of your module."
  - "Import only from `app/v1/kit`, never from the design system's viewer."
  - "Propose a change of a component in the design system and take it into the module with the next merge."
dont:
  - "Do not edit files of the merged kit in place; the lock check finds it."
  - "Do not copy colour or space values into your own CSS; use the `--ds-*` variables."
  - "Do not read the design system's files at run time from another repository."
---

## A controlled copy with a lock

A module that wants to look like Example does not paste the design system in by hand. It merges a release as a subtree (`git merge -X subtree=…`) into a directory of its own, for example `design-system/`. The release stays in the module's history, and the next version arrives as an ordinary merge.

Beside it lies `design-system.lock.json` with the repository, the release, the commit and the fingerprint of the kit's manifest. A test of the module calls `verifyKit()` from `app/v1/kit/core/lock.ts` and fails when a file of the kit was edited in place or the kit does not match the lock.

## What to import

The whole library is in `app/v1/kit`. We recommend an alias `@design-system` for it in `tsconfig.json` (and in Vite's `resolve.alias`).

- **Styles:** once, `@design-system/styles.css`. It holds the tokens, the fonts, base styles and every component.
- **Astro:** `@design-system/astro/Button.astro` and the others.
- **React:** `@design-system/react` exports every component.
- **Tokens in code:** `@design-system/tokens` (colours for charts, space for calculations).

## Language

Components speak Czech or English by their `locale` property. Decide the page's language as Lazurio does: first the person's explicit choice, then the language Lazurio gives, otherwise Czech. `resolveLocale()` and `readLazurioLocale()` from `@design-system/core/i18n` help.
