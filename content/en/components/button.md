---
title: "Button"
description: "Starts an action. A pill; the primary action is black in the light theme and white in the dark."
do:
  - "Keep at most one primary button on a screen."
  - "Name the action with a verb and its result (\"Send invoice\")."
  - "Use `busy` while the action runs; the button stays in place and cannot be pressed again."
  - "Name an icon button with the `label` property."
dont:
  - "Do not use a button to go to another page; `href` renders a link for that."
  - "Do not put two primary buttons side by side."
  - "Do not change a button's colour by the page's mood; an irreversible action has the `danger` variant."
---

## Variants

- **Primary** (`primary`): the screen's one next step.
- **Secondary** (default): ordinary actions, white with a line.
- **Soft** (`soft`): an action that must not compete with the primary one.
- **Quiet** (`quiet`): actions in a toolbar and icon buttons.
- **Destructive** (`danger`): delete, cancel, remove. It belongs in a confirmation dialog.

Sizes `sm`, `md` (default) and `lg`. The icon button is a square with a 6 px radius, so it is not mistaken for a state.

## Behaviour

On hover the background changes by one step; when pressed the button briefly shrinks to 97 %. A disabled button is half transparent; when the action is only running, use `busy`, which keeps the button in the focus order and announces "Loading".

## Accessibility

The button is a native `<button type="button">`, a link a native `<a>`. Enter and Space work by themselves. An icon button gets its `aria-label` from the `label` property.
