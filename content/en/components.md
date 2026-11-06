---
title: "Components"
description: "The building blocks of screens. Every component exists for Astro and React with the same properties and the same HTML."
---

## How to use them

The styles load once (`@design-system/styles.css`), the components are imported by framework: in Astro from `@design-system/astro/`, in React from `@design-system/react`. Both take the same properties; they differ only where the framework requires it (`className` and `defaultValue` in React, slots in Astro).

A test of the design system renders every component in both frameworks from the same input and compares the HTML. A component that drifts in one of them fails `bun run check`.
