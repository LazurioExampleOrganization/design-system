---
title: "Accessibility"
description: "The design system meets WCAG 2.2 AA. What the tests watch, and what whoever builds a screen from the components must watch."
do:
  - "Give every field a visible label and connect its error to it."
  - "Check the screen with the keyboard alone: Tab, Shift+Tab, Enter, Space, Escape and the arrows."
  - "Offer motion with a variant for reduced motion."
  - "Name an icon without text (`label` on the button or icon)."
dont:
  - "Do not rely on colour as the only carrier of information."
  - "Do not hide the focus ring."
  - "Do not turn off zoom on phones."
  - "Do not put `ink-faint` on text people must read."
---

## What the design system watches itself

- **Contrast.** The tests compute the contrast of every role pair in the light and the dark theme: text at least 4.5:1, field boundaries, icons and the focus ring at least 3:1. A palette that fails, fails `bun run check`. The result is on the [Colour](../foundations/colors/) page.
- **Focus.** Every control has a visible `:focus-visible`: a two-pixel ring in the ink colour with an offset, never a coloured glow.
- **Native elements.** Buttons are `<button>`, fields `<input>`, the dialog is a native `<dialog>` opened as modal: focus stays inside, Escape closes it and focus returns to the button that opened it.
- **Tabs** work with the arrow keys after the WAI-ARIA pattern, and only the selected one is in the tab order.
- **States** carry a word for screen readers too: alerts and toasts have a hidden "Error:", "Done:".
- **Fields** have text of at least 16 px, so a phone does not zoom into them. The page never turns zoom off.
- **Motion** respects `prefers-reduced-motion`: movement and scaling disappear, the content is in place at once.

## What whoever builds a screen watches

- Headings in order without skipping levels; one `h1` per page.
- Meaningful link and button text (not "here", not "more" without context).
- A table has a caption and column headers with `scope="col"`.
- Content that appears without a page reload announces itself with `live` on an alert or a toast.
- The page's language in `<html lang>` matches its text.
