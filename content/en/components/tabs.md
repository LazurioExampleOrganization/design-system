---
title: "Tabs"
description: "Switch between views of one thing without leaving the page. The selected tab has full ink and a line under it."
do:
  - "Name tabs briefly, with one or two words."
  - "Name the group of tabs (`label`) for screen readers."
  - "Show a count of items with a badge in the tab."
dont:
  - "Do not use tabs as navigation between the pages of an App."
  - "Do not use more than about five tabs; more belong in a select or navigation."
  - "Do not hide content in a tab that needs to be compared with another tab."
---

## Behaviour

Tabs switch on a click or with the left and right arrows; Home and End jump to the first and the last. The selection changes as soon as the arrow moves. Only the selected tab is in the tab order, followed by its panel's content.

Tabs do not move: people switch them often, and motion would slow them down.

## Accessibility

The list has the `tablist` role, the tabs `tab` with `aria-selected` and `aria-controls`, the panels `tabpanel` with `aria-labelledby`. Hidden panels carry the `hidden` attribute.
