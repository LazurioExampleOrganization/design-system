---
title: "Empty state"
description: "Says why the place is empty and offers the next step. An illustration for a first start, an icon for an empty result."
do:
  - "Say in the title what is missing; in the text, how to change it."
  - "Offer one action that fills the place."
  - "For an empty search result, offer to clear the filter."
dont:
  - "Do not leave a place empty without an explanation."
  - "Do not write jokes or apologies; say what comes next."
  - "Do not put an illustration into small empty places inside a page."
---

## Three situations

- **A first start**: nothing is here yet. An illustration, a title, one sentence and the primary action.
- **Nothing found**: a search or filter returned nothing. An icon, a title and an action that clears the filter.
- **Done**: everything is handled. An illustration and a short confirmation, without an action.

## Accessibility

The empty state's title is a real heading (`headingLevel`, `h2` by default). The illustration and the icon are hidden from screen readers; the text carries the meaning.
