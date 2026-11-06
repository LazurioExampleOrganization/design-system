---
name: design-system
description: Use whenever you build, change or review anything people see for this Organization (an App screen, a website or knowledge base page, a document, a presentation, an e-mail) or take this design system into another module. It says where the rules are, which component fits which need, how to use the kit from Astro or React, and what to check before handing over. The rules of this design system win over any other design advice.
---

# Using the design system

## Read first

1. `DESIGN.md` at the root of the design system: principles, tokens, components,
   motion, voice, accessibility, when to use what.
2. The page of each component you use: `content/en/components/<name>.md`
   (Czech beside it in `content/cs/`), or the viewer App.

## Build with the kit, never around it

- Styles: import `app/v1/kit/styles.css` once. It brings the tokens, the
  brand's fonts, base styles and every component.
- Astro: `app/v1/kit/astro/<Component>.astro`. React: the named exports of
  `app/v1/kit/react`. Both take the same props and render the same HTML.
- Values in your own CSS only as tokens: `var(--ds-color-ink)`,
  `var(--ds-space-16)`, `var(--ds-radius-md)`, `var(--ds-duration-base)`. In
  TypeScript (charts, canvas, e-mail) from `app/v1/kit/tokens.ts`.
- A component you need is missing, or one needs a new variant: propose it in
  the design system (its `docs/extending.md`), do not style your own copy.
- In a module that merged the design system, never edit its files in place;
  the lock test fails, and the next merge would lose the edit.

## Decide

- One primary action per screen (`variant="primary"`); the rest secondary,
  soft or quiet.
- A state is colour, icon and word: `Badge` with a tone; never colour alone.
- A result the person moves on from: `Toast`. A problem to act on: `Alert`
  in the page. A wrong field: its `error`. Nothing there yet: `EmptyState`
  with the next step.
- Send, publish, pay, delete: prepare a draft, confirm in a `Dialog` whose
  button names the action, act only after the confirmation.

## Language

Pages and components speak Czech or English (`locale` on components that say
words of their own). Resolve the page's language with `resolveLocale()` from
`app/v1/kit/core/i18n.ts`: the person's explicit choice, then Lazurio's
language (`readLazurioLocale()`), then Czech. One screen, one language. Format
numbers and dates with `Intl` in that language.

## Check before handing over

- `bun run check` in the module (its lock test included).
- In a browser: both themes, both languages, 390 px and 1280 px wide, the
  keyboard alone (Tab, Enter, Space, Escape, arrows), reduced motion.
- Contrast comes from the tokens; a colour you computed yourself must reach
  4.5:1 for text and 3:1 for graphics (`contrast()` in `app/v1/kit/core/contrast.ts`).
