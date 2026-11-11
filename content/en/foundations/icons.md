---
title: "Icons"
description: "Outline icons from the open set Iconoir on a 24 × 24 grid with a 1.5 stroke. They support text, they do not replace it."
do:
  - "Put an icon beside a word that says the same."
  - "Name an icon without text for screen readers."
  - "Draw it in the text colour (`currentColor`)."
dont:
  - "Do not redraw icons or mix them with another set."
  - "Do not colour icons with signal colours outside a state."
  - "Do not use an icon as decoration above a heading."
---

## The set

The design system carries chosen icons from [Iconoir](https://iconoir.com) (MIT licence) right in the kit, without a dependency. All are outlines on a 24 × 24 grid with a 1.5 stroke, drawn in `currentColor`, so they take the text's colour and work in the light and the dark theme.

## Sizes

- `sm` (16 px) in a badge, a small button and breadcrumbs,
- `md` (20 px) in a button, navigation, an alert and a toast,
- `lg` (24 px) on its own, for example in an empty state.

## When an icon is missing

Add its Iconoir name to the list in `app/v1/scripts/icons.ts` and run `bun run icons`. Own icons are not drawn: the set has to stay of one piece.
