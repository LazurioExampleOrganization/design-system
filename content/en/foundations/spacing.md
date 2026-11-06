---
title: "Space and shape"
description: "A space scale in steps of four pixels, five radii by what a thing is, and one shadow for the floating layer."
do:
  - "Take space only from the `space-*` scale."
  - "Choose the radius by the kind of thing: a pill for what you press or fill, 10 px for cards."
  - "Give a shadow only to a menu, dialog or toast, always with a hairline."
dont:
  - "Do not give a shadow to a card or table in the page flow."
  - "Do not mix radii: the icon button is a square, not a circle."
  - "Do not invent steps between the scale's values."
---

## Space

The scale grows by four to eight pixels up to 32, then in jumps (48, 64, 96, 128). A token carries its value in its name: `space-24` is 24 pixels, so you never look it up. Small values belong inside elements, large ones separate sections.

## The shape says what a thing is

- **Pill** (`radius-pill`): button, single-line field, select, switch, badge.
- **xs** (3 px): the data tag, the only square control shape.
- **sm** (6 px): icon button, navigation item.
- **md** (10 px): card, dialog, alert, multi-line field, table.
- **lg** (16 px): a large showcase surface.

## Depth

Objects in the page flow have a hairline and no shadow. Emphasis is a surface one step darker, not a shadow. The system's only shadow (`shadow-float`) belongs to the layer that floats above the page: a menu, a dialog and a toast.
