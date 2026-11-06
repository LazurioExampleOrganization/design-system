---
title: "Barvy"
description: "Šedá, bílá, černá a jeden akcent. Barvy se používají podle role, ne podle odstínu, a každá role má hodnotu pro světlý i tmavý režim."
do:
  - "Používejte role (`ink`, `surface`, `accent`), nikdy odstín z palety přímo."
  - "Akcent držte střídmě: odkaz, aktivní stav, jedno slovo nadpisu."
  - "Signální barvy nechte jen pro výsledky, které systém hlásí."
dont:
  - "Nepřidávejte druhou barevnou rampu ani přechody na plochy."
  - "Nepoužívejte signální barvy jako ozdobu nebo akcent."
  - "Neměňte hlavní tlačítko na modré."
---

## Role místo odstínů

Paleta značky má neutrální šedou rampu, jednu akcentní rampu a tři signální (červenou, jantarovou a zelenou). Komponenty a stránky ale nikdy nesahají do palety přímo: používají **role**. Role říká, k čemu barva je, a pro každý režim ukazuje na jiný stupeň palety. Díky tomu funguje tmavý režim a díky tomu jde vyměnit značku na jednom místě.

## Tři vrstvy barvy

- **Plochy a linky** (`bg`, `surface`, `line`) tvoří klidný podklad. Papír za stránkou, bílé objekty na něm, vlasové linky mezi nimi.
- **Akcent** (`accent`) se objevuje jen na pár místech stránky. Nikdy nenese strukturu.
- **Signál** (`success`, `warning`, `danger`, `info`) hlásí výsledek. Vždy spolu s ikonou a slovem.

## Tmavý režim

Tmavý režim není převrácená paleta. Plochy jsou téměř černé, text téměř bílý, akcent světlejší, aby měl kontrast, a hlavní tlačítko je bílé. Režim se řídí zařízením, dokud si člověk nevybere sám; volba je atribut `data-theme` na `<html>`.

## Kontrast

Kontrast všech dvojic, které komponenty používají, počítají testy a ukazuje ho tabulka níže. Text potřebuje aspoň 4,5 : 1, grafika a hranice polí 3 : 1. `ink-faint` je pod hranicí pro text, a proto nikdy text není.
