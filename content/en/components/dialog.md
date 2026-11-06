---
title: "Dialog"
description: "Interrupts the work for a short decision or task. A native modal dialog, the floating layer with a shadow."
do:
  - "Ask in the title about what the person decides (\"Delete the invoice draft?\")."
  - "Name the action button like the action, not \"Yes\" or \"OK\"."
  - "Put the primary button last, on the right."
  - "Before an irreversible action, say exactly what disappears."
dont:
  - "Do not put a long form into a dialog; it belongs on a page of its own."
  - "Do not open a dialog from a dialog."
  - "Do not close a dialog with typed-in text on a click outside."
---

## When to use

To confirm an irreversible action and for a short task that briefly interrupts the work (rename, choose). For the result of an action use a toast, for a longer edit a page.

## Behaviour

The dialog is a native `<dialog>` opened as modal: the page behind it is inert, focus stays inside and Escape closes it. After closing, focus returns to the button that opened it. The dialog grows from the centre (from 97 % of its size in 280 ms); with reduced motion it simply appears.

In Astro a button with `data-ds-dialog-open="<id>"` opens the dialog, in React the `open` property. The close cross is a `method="dialog"` form, so it works without a script too.

## Closing with a click outside

The `dismissable` property closes the dialog on a click on the backdrop. It suits an informative dialog, never one with unsaved input.
