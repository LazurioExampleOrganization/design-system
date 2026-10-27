---
title: Spacing, radius and layout
description: The 4 px grid, the spacing and radius scales and layout widths.
order: 6
---

# Spacing, radius and layout

Source of truth for the values: `space` and `radius` in
[`../colors/tokens.json`](../colors/tokens.json).

## Spacing

Everything sits on a **4 px grid**. Use the named steps only:

| Step | Use |
|---|---|
| `space-1` | Between an icon and its label |
| `space-2` | Inside compact controls, between a label and its input |
| `space-3` | Inside badges and table cells, vertical |
| `space-4` | Inside buttons and inputs, between fields of a form |
| `space-6` | Inside cards and dialogs |
| `space-8` | Between sections of a page |
| `space-12`, `space-16` | Around a page title, between major regions, slide margins |

Rule of proximity: things that belong together are closer to each other than
to anything else. If a label is equally far from two inputs, the spacing is
wrong.

## Radius

| Token | Use |
|---|---|
| `radius-sm` | Badges, checkboxes, inline code |
| `radius-md` | Buttons, inputs, toasts, table containers |
| `radius-lg` | Cards and dialogs |
| `radius-pill` | Avatars and the signal dot only |

Nested corners: an element inside a rounded container uses a smaller radius
than the container.

## Elevation

Two levels only:

1. **Raised**: `surface-raised` with a `border`. Cards, tables, inputs.
2. **Overlay**: `surface-raised` with a soft shadow of the `scrim` role.
   Dialogs, toasts, menus.

## Layout widths

| Surface | Width |
|---|---|
| Reading (documents, settings) | max 720 px of content |
| Working (tables, dashboards) | max 1280 px, full width below |
| Dialog | 480 px, or 640 px for a dialog with a list |
| Slide | 16:9, 1920 × 1080, margins `space-16` |

Breakpoints: 640 px (phone), 1024 px (tablet), 1280 px (desktop). Below 640 px
navigation collapses and tables become stacked rows (see
[`../../patterns/data-tables.md`](../../patterns/data-tables.md)).
