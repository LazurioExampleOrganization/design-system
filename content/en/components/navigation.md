---
title: "Navigation"
description: "The places of an App or website, and breadcrumbs that show where a page sits. The current page is a surface one step darker, never a colour."
do:
  - "Mark the current page with `current`; it renders `aria-current=\"page\"`."
  - "Name the navigation (`label`), or give it a visible group title (`title`)."
  - "Name items briefly, with a noun."
dont:
  - "Do not mark the current page with the accent colour or a bar on the left."
  - "Do not put more than about seven items into one level."
  - "Do not use navigation for actions; buttons are for those."
---

## Variants

- **Vertical** (default): an App's side panel, optionally with icons, counts and a group title.
- **Horizontal** (`orientation="horizontal"`): a few places in a website's header, items as pills.
- **Breadcrumbs**: the path from the root to the current page; the last item is not a link.

## States

A default item has muted text; on hover a surface one step darker and full ink. The current item has the `surface-selected` surface and full ink. A count (`badge`) is quiet and in tabular figures.

## Accessibility

Navigation is a named `<nav>`, the list a `<ul>`. The current item has `aria-current="page"`. Breadcrumbs are `<nav aria-label="Breadcrumb">` with an ordered list, and the separators are hidden from screen readers.
