---
title: "Karta"
description: "Bílý objekt na papíře s vlasovou linkou a bez stínu. Drží několik údajů o jedné věci, nebo celá vede jinam."
do:
  - "Dejte kartě krátký nadpis a nanejvýš jeden řádek popisu."
  - "Kartu jako odkaz (`href`) použijte pro přehled stránek nebo záznamů."
  - "Akce dejte do patičky karty."
dont:
  - "Nedávejte do karty-odkazu další tlačítka nebo odkazy."
  - "Nedávejte kartě stín ani barevné pozadí."
  - "Nevkládejte karty do sebe."
---

## Kdy použít

Pro skupinu údajů o jedné věci (nabídka, zákazník, souhrn) nebo pro rozcestník. Data, která se porovnávají, patří do tabulky.

## Varianty

- **Výchozí**: bílá plocha s linkou, nadpis, popis, obsah a patička s akcemi.
- **Tlumená** (`tone="muted"`): šedá plocha pro tip nebo vedlejší informaci.
- **Odkaz** (`href`): celá karta je jeden odkaz se šipkou; při najetí zesílí linka a šipka se posune.

## Přístupnost

Nadpis karty je skutečný nadpis (`headingLevel`, výchozí `h3`), aby šly karty procházet po nadpisech. Karta-odkaz je jeden prvek `<a>`, takže ji čtečka přečte jednou.
