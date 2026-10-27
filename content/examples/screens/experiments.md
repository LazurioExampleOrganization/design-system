---
title: "Screen: Experiments"
category: screens
source: app/v1/src/pages/screens/experiments.astro
date: 2026-10-27
screen: /screens/experiments/
notes: A working list where the reader decides what needs a stop or scale decision first.
---

# Screen: Experiments

The list of all experiments of the Organization.

## What to notice

- **One primary action** ("New experiment") next to the page title.
- **Status first**: the table is sorted by status (needs a decision first),
  then by the last change. Status is a [badge](../../components/badge.md) with a
  word.
- **Evidence in the row**: every rate has its sample ("3.1 % of 1,240") and the
  date of verification. A rate without a sample would be a hypothesis.
- **Figures align right** with tabular numerals; unknown values are "–".
- The "New" highlight marks the one row that changed since the last visit.

Patterns: [Navigation](../../patterns/navigation.md),
[Data tables](../../patterns/data-tables.md).
