## Overview

{{brand}}

The design system is calm, trustworthy and quiet. Restraint is the style: expression lives in a few deliberate places, never in decoration. Five principles decide every screen, document and presentation:

1. **Calm is the brand.** White and paper surfaces, hairlines and one accent. When unsure, take something away.
2. **One main action.** At most one primary button per screen; everything else is secondary, soft or quiet.
3. **A state is never colour alone.** Success, warning, error and information always carry colour, icon and word.
4. **Less text, more of the thing.** A section stands on a piece of the product, a table or a picture; the text names it.
5. **Values only from tokens.** A colour, size, space, radius or duration written straight into a page is a bug.

The sources are `brand/brand.json` (the brand: palette, fonts, radius, logo), `tokens/tokens.json` (the system: colour roles for light and dark, type, space, shadow, motion, sizes) and the components in `app/v1/kit/`. This file is generated from them; when it disagrees with them, they win. The viewer App shows every page in Czech and English.

## Colors

- **Roles, not shades.** Use the colour roles (`ink`, `ink-muted`, `surface`, `bg`, `line`, `accent`, `action`, the signal roles); never a step of the palette directly. Each role has a light and a dark value (`dark-*` above).
- **Three layers.** Surfaces and lines make the calm ground; the accent appears in a few places only (a link, the active state, one word of a heading); signal colours report results and are never decoration.
- **Text contrast.** `ink` and `ink-muted` are text colours. `ink-faint` is below 4.5:1 and never text people must read: strokes, separators, illustrations. `line-strong` (at least 3:1) is the boundary of fields and controls.
- **The primary button is black** (`action`) in the light theme and white in the dark. Do not turn it into the accent.
- **No second colour ramp, no gradients on surfaces.**

## Typography

- The text face (`fontFamily` of `body`, `label`, `meta`) sets text and controls; the heading face sets `hero`, `section`, `display` and `title`; the mono face sets code and document numbers. All are self-hosted.
- Headings are weight 600 with slightly tightened tracking; text keeps weight 400.
- **No uppercase anywhere, no eyebrow labels above headings.**
- Paragraphs stay within 68 characters per line; numbers in a column use tabular figures and align right.

## Layout

- A page is paper (`bg`) with white objects (`surface`) on it, separated by hairlines (`line`).
- Spacing comes only from the `space-*` scale; the token's name is its value in pixels.
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px. Detect devices by capability (`hover`, `pointer`), never by width or user agent.

## Elevation & Depth

- Objects in the page flow have a hairline and no shadow. Emphasis is a surface one step darker (`surface-selected`), never a shadow or a coloured fill.
- The one shadow, `shadow-float`, belongs to the floating layer only: menus, dialogs, toasts, always with a `line` border. The dialog's backdrop is `shadow-overlay`.

## Shapes

- **Pill** (`rounded.pill`) for what you press or fill: buttons, single-line fields, selects, switches, badges.
- **xs** for the data tag (`Tag`), the only square control shape; **sm** for icon buttons and navigation items; **md** for cards, dialogs, alerts, multi-line fields and tables; **lg** for large showcase surfaces.

## Components

The components exist for Astro (`app/v1/kit/astro/`) and React (`app/v1/kit/react/`) with the same properties and the same HTML; a test compares them. Styles load once from `app/v1/kit/styles.css`; every class has the prefix `ds-`.

- **Button**: primary (one per screen), secondary (default), soft, quiet, danger; sizes sm, md, lg; icon-only buttons need `label`; `busy` while an action runs.
- **Form fields**: TextField, TextArea, Select, Checkbox, RadioGroup, Switch. Label above, hint before the control, error after it, connected by `aria-describedby`; optional fields are marked, required ones are not; field text is at least 16 px.
- **Table**: a wrapper that scrolls sideways and takes focus, a caption, a quiet head, numbers right-aligned with `ds-table__num`, states as badges.
- **Card**: a white object with a hairline; title, description, body, footer; or a whole-card link.
- **Dialog**: the native modal `<dialog>`; title asks the question, the action button names the action, primary last.
- **Navigation**: `Nav` (vertical or horizontal; the current page is `surface-selected`, never colour) and `Breadcrumbs`.
- **Tabs**: views of one thing; arrows move and select; tabs never animate.
- **Badge** reports a state with colour, icon and word; **Tag** labels data.
- **Alert** reports a result in the page and stays; **Toast** confirms what just happened and leaves after six seconds (errors stay).
- **EmptyState** says why a place is empty and offers the next step.

## Do's and Don'ts

- Do compose every value from tokens; an ad-hoc hex value, size or duration in an App is a bug.
- Do keep one primary action per screen and let a state carry colour, icon and word together.
- Do write button labels as verbs with a result, and errors as what to do.
- Do test with the keyboard alone and with reduced motion.
- Don't use uppercase, eyebrow labels, decorative numbering or drawn grids.
- Don't add a second colour ramp, gradients on surfaces or shadows on objects in the flow.
- Don't use signal colours or the accent as decoration.
- Don't put `ink-faint` on text people must read.
- Don't redraw or recolour the logo, icons or illustrations.
- Don't mix Czech and English on one screen.

## Motion

- Move only where it helps understand what happened: continuity in space, a change of state, a response to an action. What people use very often (tabs, navigation, keyboard actions) does not move.
- Durations: `duration-press` 120ms (a press), `duration-fast` 160ms (hover colour), `duration-base` 200ms (menu, toast), `duration-slow` 280ms (dialog, panel); leaving is shorter (`duration-exit`).
- Curves: `ease-out` to enter and leave, `ease-in-out` to move across the screen, `ease-standard` for colour, `ease-linear` for steady motion. Never `ease-in` on an interface element.
- Animate only `transform` and `opacity`; never `transition: all`; nothing grows from zero (start at 0.95 at least).
- Every motion has a `prefers-reduced-motion: reduce` variant; hover effects live in `@media (hover: hover) and (pointer: fine)`.

## Voice and writing

- Like a colleague who knows the matter: direct, natural, calm; no superlatives, no official jargon.
- Buttons are verbs with a result ("Send invoice"); field labels are nouns without a colon; errors say what to do; empty states explain why and offer the next step; confirmations of irreversible actions say exactly what disappears.
- Interfaces are Czech and English; one screen speaks one language; people are addressed politely (in Czech with "vy"). Names are never translated.
- Format numbers, dates and amounts with `Intl` in the page's language; Czech declines by count (`Intl.PluralRules`).

## Accessibility

- WCAG 2.2 AA. The tests check the contrast of every role pair in both themes (text 4.5:1, graphics 3:1).
- Visible `:focus-visible` everywhere: a 2px ring in `focus` (neutral ink) with an offset.
- Native elements: `<button>`, `<input>`, `<dialog>` opened with `showModal()`; tabs follow the WAI-ARIA pattern.
- Every field has a visible label; icon-only controls have a name; states have a word for screen readers.
- Never turn off zoom; field text is at least 16 px.

## When to use what

- A result the person moves on from: Toast. A problem the person must act on: Alert in the page. A wrong field: the error under it. The state of an item: Badge. Nothing there yet: EmptyState.
- An irreversible action (send, publish, pay, delete): prepare it as a draft and confirm it in a Dialog whose button names the action.
- One of two to five visible options: radio buttons; one of many: Select; on or off at once: Switch; agreement saved with the form: Checkbox.
- Views of one thing: Tabs; places of an App: Nav; where a page sits: Breadcrumbs.

## Light and dark

The light theme is the default; `data-theme="dark"` on `<html>` (or any element) switches every role, and without a choice the page follows `prefers-color-scheme`. The dark theme is not inverted: surfaces nearly black, text nearly white, the accent lighter, the primary button white.
