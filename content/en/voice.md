---
title: "Voice and writing"
description: "How Example speaks in interfaces, documents and e-mails, in Czech and English."
do:
  - "Write with a verb what will happen: \"Save draft\", not \"OK\"."
  - "In an error, say what the person should do."
  - "Address people directly and politely."
  - "Format numbers, dates and amounts by the page's language."
dont:
  - "Do not mix Czech and English on one screen."
  - "Do not use advertising superlatives or official jargon."
  - "Do not blame the person (\"You entered it wrong…\")."
---

## How we sound

Like a colleague who knows the matter and is not in a hurry. Direct, natural, without excitement or official phrasing. We start with what matters and add context only where it helps decide.

## Interface text

- **Buttons** say what happens: "Send invoice", "Delete draft". The main action has the same words in the form and in the confirmation.
- **Field labels** are nouns without a colon. The hint under the label says what to enter and in which format.
- **Errors** describe what to do: "Enter an e-mail like name@example.com."
- **Empty states** explain why the place is empty and offer the next step.
- **Confirmations** of an irreversible action say exactly what disappears, and the button repeats it.

## Two languages

Interfaces, samples and documentation for people are in Czech and English. One screen always speaks one language. Text in each language is written anew, not translated word for word: an English sentence is often shorter, a Czech one needs its verb. Names of companies and people are never translated.

## Numbers and dates

Format amounts, dates and counts with `Intl` in the page's language: `CZK 18,450` and `2 Nov 2026` in English, `18 450 Kč` and `2. 11. 2026` in Czech. Czech declines by count (1 faktura, 2 faktury, 5 faktur); use `Intl.PluralRules`.
