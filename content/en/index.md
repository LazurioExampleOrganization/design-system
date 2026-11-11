---
title: "The Lazurio Example Organization design system"
description: "How the website, Apps, documents and presentations of Lazurio Example Organization look and speak. One source of colour, type and components for people and agents."
---

## What it is for

The design system holds together everything people see of Lazurio Example Organization: colour, type, space, motion, icons and the components screens are made of. Whoever builds a website, an App or a presentation invents nothing from scratch. They take finished parts and the rules for when to use which.

Agents use it the same way. Before they design anything, they read the [principles](principles/), [voice and writing](voice/) and the page of the component they need.

## How it is built

- **The brand** is in one place, the `brand/` directory: name, palette, fonts, radius, logo and illustrations. An Organization replaces it there, and the tokens, the components and this viewer's header follow. The page texts that name the Organization are edited separately.
- **Tokens** name values by purpose (`ink`, `surface`, `space-16`). One source gives the variables for CSS and TypeScript, for the light and the dark theme.
- **Components** exist for Astro and React with the same properties and the same HTML. Websites and knowledge bases take them in Astro, Apps in React.

Lazurio Example Organization is a public reference Organization and describes no real company. It wears the invented Example brand of the design system template. Every name, figure and customer on these pages is fictional.
