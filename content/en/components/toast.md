---
title: "Toast"
description: "Briefly confirms what just happened and leaves by itself. The floating layer at the bottom of the screen."
do:
  - "Write briefly and in the past tense: \"Draft saved\"."
  - "Put the toast region on the page once, at its end."
  - "Keep an error until the person closes it."
dont:
  - "Do not make a toast the only way to an important action; it disappears."
  - "Do not show a toast for every small thing; only for results not visible elsewhere."
  - "Do not use a toast for a form error; that belongs to the field."
---

## Behaviour

A toast slides in from below (200 ms; with reduced motion it simply appears) and leaves after six seconds. While the pointer is on it or focus is inside, it stays. A toast with an error never leaves by itself. Each has a close button.

In Astro there is one `ToastRegion`, and a toast is added by `showToast()` from the core or by a button with `data-ds-toast-show`. In React, `useToasts()` holds the toasts and `ToastRegion` with `Toast` renders them.

## Accessibility

The region is live (`aria-live="polite"`): a screen reader reads the toast once it finishes what it is reading. The tone is read as a word ("Done:"). When a toast disappears with focus inside, focus returns to the page's main content.
