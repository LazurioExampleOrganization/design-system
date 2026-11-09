---
title: "Badge and tag"
description: "A badge reports a state with colour, icon and word. A tag labels data and is square, so it is not mistaken for a state."
do:
  - "Use a word that names the state (\"Paid\", \"Overdue\")."
  - "Keep the badge's default icon for its tone."
  - "Use a tag for a code, a category or a keyword."
dont:
  - "Do not use a badge without a word, as a coloured dot."
  - "Do not turn a badge into a button."
  - "Do not use a signal tone as decoration (a green \"New\")."
---

## Tones

- **Neutral**: a draft, an archive, a state without a judgement.
- **Accent**: new, just selected. Without an icon and sparingly.
- **Success, warning, error, information**: a result the system reports; each has its icon.

## Tag

A tag (`Tag`) labels data: a document number, a category, a keyword. It is square (`radius-xs`) and set in the monospace face, so it is never mistaken for a state badge.

## Accessibility

The badge's icon is hidden from screen readers; the word carries the state. When the word alone is not enough (for example "3"), add hidden text.
