---
title: Dialog
description: Interrupts to confirm a decision or collect a little input.
order: 15
---

# Dialog

## Purpose

A modal dialog interrupts the work to **confirm a decision** or collect a
little input that belongs to the current step. Anything longer than one short
form is a page.

## Anatomy

Overlay (graphite at 60 % opacity), container (`surface-raised`, `radius-lg`,
overlay shadow, 480 px), title (`h3`), body, footer with actions (secondary
left, primary right), close button top right.

## Variants

| Variant | Use |
|---|---|
| **Confirm** | A decision with consequences; the primary button names the outcome |
| **Destructive confirm** | Deleting, stopping or publishing something irreversible; the primary button is Danger or "Publish", and the body lists exactly what happens |
| **Form** | Up to four fields |

## States

Opening and closing animate opacity only (150 ms; none when the reader prefers
reduced motion). While the action runs, the primary button shows loading and
the dialog cannot be dismissed.

## Usage

| Do | Don't |
|---|---|
| Title as a question: "Publish the stop decision?" | "Are you sure?" |
| List the consequences in the body, with numbers | Repeat the title in the body |
| Keep focus inside the dialog until it closes | Open a dialog from a dialog |

## Content

Title: the decision as a question. Body: what will happen, to whom, and whether
it can be undone. Buttons: "Cancel" and the outcome ("Publish", "Delete
draft").

## Accessibility

- `role="dialog"` (or the native `<dialog>`) with `aria-modal="true"` and
  `aria-labelledby` the title.
- Focus moves to the first focusable element (the least destructive one for a
  destructive confirm) and returns to the trigger on close.
- Escape closes, except while the action runs.

## Tokens

`surface-raised`, `text`, `text-muted`, `border`, `danger`, `accent`,
`focus`, `radius-lg`, `space-6`, type `h3`, `body`.
