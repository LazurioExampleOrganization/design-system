---
title: "Alert"
description: "Reports a result right in the page. An icon, a short title and what to do. It stays until the situation changes."
do:
  - "Say in the title what happened; in the text, what to do about it."
  - "Give the alert an action that solves the problem."
  - "Announce an alert that appears without a page reload (`live`)."
dont:
  - "Do not put several alerts on a page at once; order them by importance."
  - "Do not use an alert to confirm an ordinary action; a toast is for that."
  - "Do not hide an error before the person has solved it."
---

## Tones

- **Information**: something good to know before the next step.
- **Success**: a result people come back to (a payment matched).
- **Warning**: something needs attention, but the work can go on.
- **Error**: something failed and the person must act.

## Announcing to a screen reader

An alert present since the page loaded is not announced. When it appears later, use `live="polite"`; `live="assertive"` only for an error that stops the work. The tone is told to the screen reader with a word ("Warning:") before the title.
