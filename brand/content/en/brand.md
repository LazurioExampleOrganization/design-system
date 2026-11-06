---
title: "The Example brand"
description: "Example is an invented company. Its brand shows how the design system carries an Organization's brand and replaces it in one place."
do:
  - "Use the logo whole and unchanged, in the text colour."
  - "Leave free space around the logo of at least the symbol's height."
  - "Replace the Organization's brand in the `brand/` directory and run `bun run tokens`."
dont:
  - "Do not redraw, recolour or crop the logo."
  - "Do not use the logo as decoration or a pattern."
  - "Do not change colours or fonts anywhere but in `brand/brand.json`."
---

## Logo

The Example symbol is three bars and one accent dot: a shorthand for the letter E and "a full stop after the matter". The name stands beside the symbol in the heading face. The symbol draws in the text colour, so it works in the light and the dark theme; the dot takes the accent.

## Character

Example feels calm and matter-of-fact: white and paper surfaces, hairlines, black pill buttons and one ultramarine accent. It is expressive in only a few places where that helps.

## Replacing the brand

Everything that makes the Example brand lies in the `brand/` directory: name and summary, palette, fonts, radius, logo, illustrations and this page. An Organization that adopts the design system replaces these files and runs `bun run tokens` and `bun run check`. The components, the role tokens and the documentation stay, and new releases of the template keep updating them.
