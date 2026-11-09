---
title: "Motion"
description: "Motion only where it helps understand what happened. Short, with a soft landing, and never for what people do a hundred times a day."
do:
  - "Animate only `transform` and `opacity`."
  - "Use `ease-out` to enter and leave, and make leaving shorter."
  - "Give every motion a variant for `prefers-reduced-motion: reduce`."
  - "Keep the response to a press within 160 ms."
dont:
  - "Do not use `ease-in` on an interface element; it feels sluggish."
  - "Do not move what is used from the keyboard or very often (tabs, navigation)."
  - "Do not let anything grow from nothing; start at 95 % of the size at least."
  - "Do not write `transition: all`."
---

## Should it move?

Motion needs a reason: continuity in space (a dialog grows from the centre), a change of state (a switch slides across), a response to an action (a button shrinks when pressed) or softening a jump that would otherwise look broken. "It looks nice" is not a reason. The more often people see something, the less it should move: tabs and navigation do not move at all.

## Durations and curves

The `duration-*` and `ease-*` tokens hold the whole scale. A press takes 120 ms, a colour on hover 160 ms, a menu or toast 200 ms, a dialog 280 ms. Leaving is shorter than entering (`duration-exit`). Entering and leaving use `ease-out`, moving across the screen `ease-in-out`, a change of colour `ease`.

## Reduced motion

Whoever turned on reduced motion in their system sees the content in place at once: movement and scaling disappear, at most a change of opacity stays. The components handle it themselves; your own motion in a page must handle it too.

## Hover only for a mouse

Hover effects belong inside `@media (hover: hover) and (pointer: fine)`. On a touch screen they would stay stuck after a tap.
