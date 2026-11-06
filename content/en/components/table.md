---
title: "Table"
description: "Data in rows and columns. Hairlines between rows, a quiet head, numbers aligned to the right."
do:
  - "Give the table a caption; hide it only when the same heading stands right above."
  - "Align numbers and amounts to the right with the `ds-table__num` class."
  - "Show a row's state with a badge."
  - "Replace an empty table with an empty state and the next step."
dont:
  - "Do not use a table to lay out a page."
  - "Do not put several actions into one cell; a row's actions belong in its detail."
  - "Do not mark a selected row by colour alone."
---

## When to use

When people compare, sort or search data. A few facts about one thing need only a card; a list without columns needs navigation or a simple list.

## Anatomy

The table lies in a wrapper (`ds-table-wrap`) that scrolls sideways on a narrow screen. The wrapper takes keyboard focus so it scrolls without a mouse too, and a screen reader names it by the table's caption. The head has a grey background, hairlines separate the rows.

## Sorting

A sortable column has a `ds-table__sort` button in its header, and the sorted column has `aria-sort`. The icon shows the direction; hidden text tells it to a screen reader.

## Variants

Default, compact (`density="compact"`) for dense overviews, and interactive (`interactive`), whose rows react to the pointer when they open a detail.
