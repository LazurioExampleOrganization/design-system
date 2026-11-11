---
title: "Typography"
description: "Inter for text, Inter Tight for headings, Geist Mono for code. A few roles every page is made of."
do:
  - "Set headings in weight 600, text in 400."
  - "Align numbers in a column to the right, in tabular figures."
  - "Keep a paragraph's line within 68 characters."
dont:
  - "Do not use capitals, not even in small labels."
  - "Do not put a small label or category above a heading."
  - "Do not add a typeface that is not part of the brand."
---

## Typefaces

Text is set in **Inter** and headings in **Inter Tight**, both variable fonts hosted inside the design system (SIL Open Font License). Code and document numbers use **Geist Mono**. The fonts come from no third-party server: the page loads its own files and works offline.

## Roles

Roles name a purpose, not a size. `display` is a page heading, `title` the heading of a section or card, `body` ordinary text, `label` controls and field labels, `meta` supporting details. Each role has a size, line height, weight and tracking; the `--ds-type-<role>-*` tokens keep them together.

## Rules of setting

- Headings are short and balanced (`text-wrap: balance`).
- Paragraphs have at most 68 characters per line.
- Amounts and dates in a column use tabular figures so they compare.
- Do not use italics or underline for emphasis; only a link is underlined.
