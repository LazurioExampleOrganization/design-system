---
title: "Card"
description: "A white object on paper with a hairline and no shadow. It holds a few facts about one thing, or leads elsewhere as a whole."
do:
  - "Give a card a short title and at most one line of description."
  - "Use a card as a link (`href`) for an overview of pages or records."
  - "Put actions into the card's footer."
dont:
  - "Do not put other buttons or links into a link card."
  - "Do not give a card a shadow or a coloured background."
  - "Do not nest cards."
---

## When to use

For a group of facts about one thing (a quote, a customer, a summary) or as a signpost. Data that is compared belongs in a table.

## Variants

- **Default**: a white surface with a line, a title, a description, content and a footer with actions.
- **Muted** (`tone="muted"`): a grey surface for a tip or secondary information.
- **Link** (`href`): the whole card is one link with an arrow; on hover the line gets stronger and the arrow moves.

## Accessibility

A card's title is a real heading (`headingLevel`, `h3` by default), so cards can be browsed by heading. A link card is one `<a>` element, so a screen reader reads it once.
