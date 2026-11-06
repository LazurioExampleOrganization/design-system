---
title: "Colour"
description: "Grey, white, black and one accent. Colour is used by role, not by shade, and every role has a value for the light and the dark theme."
do:
  - "Use roles (`ink`, `surface`, `accent`), never a shade of the palette directly."
  - "Keep the accent sparing: a link, the active state, one word of a heading."
  - "Keep the signal colours for results the system reports."
dont:
  - "Do not add a second colour ramp or gradients on surfaces."
  - "Do not use signal colours as decoration or accent."
  - "Do not turn the primary button blue."
---

## Roles instead of shades

The brand's palette has a neutral grey ramp, one accent ramp and three signal ramps (red, amber and green). Components and pages never reach into the palette directly: they use **roles**. A role says what the colour is for and points to a different step of the palette in each theme. That is what makes the dark theme work and the brand replaceable in one place.

## Three layers of colour

- **Surfaces and lines** (`bg`, `surface`, `line`) make the calm ground. Paper behind the page, white objects on it, hairlines between them.
- **The accent** (`accent`) appears in only a few places of a page. It never carries structure.
- **Signal** (`success`, `warning`, `danger`, `info`) reports a result. Always together with an icon and a word.

## The dark theme

The dark theme is not an inverted palette. Surfaces are nearly black, text nearly white, the accent lighter so it keeps its contrast, and the primary button is white. The theme follows the device until the person chooses; the choice is the `data-theme` attribute on `<html>`.

## Contrast

The tests compute the contrast of every pair the components use, and the table below shows it. Text needs at least 4.5:1, graphics and field boundaries 3:1. `ink-faint` is below the line for text and therefore is never text.
