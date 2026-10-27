---
title: Data tables
description: Sorting, filtering, bulk actions and evidence in tables.
order: 24
---

# Data tables

Example screen: [Experiments](../examples/screens/experiments.md). Component: [Table](../components/table.md).

## Toolbar

Left: search and filters (status, owner). Right: the one primary action. Active
filters show as removable chips with "Clear all".

## Default order

By what the reader decides on: status (needs a decision first), then the date
of the last change, newest first. Say the order in the header (`aria-sort`).

## Evidence columns

A table that shows results also shows **where they came from**:

- the sample size next to every rate ("3.1 % of 1,240");
- the date of verification;
- a link to the source or the experiment log.

A rate without its sample is shown as a hypothesis, not as a result.

## Bulk actions

Selecting rows replaces the toolbar with a bar: "3 selected", the allowed
actions and "Clear selection". A bulk action that cannot be undone follows
[Irreversible actions](irreversible-actions.md) and lists the selected items.

## Small screens

Below `breakpoint-phone` each row is a stacked block: the name and the status badge first,
then label–value pairs. Horizontal scrolling of a whole table is the last
resort, with the first column sticky.
