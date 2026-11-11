---
title: "Záložky"
description: "Přepínají mezi pohledy na jednu věc bez opuštění stránky. Vybraná záložka má plný inkoust a linku pod sebou."
do:
  - "Pojmenujte záložky krátce, jedním nebo dvěma slovy."
  - "Pojmenujte skupinu záložek (`label`) pro čtečky."
  - "Počet položek ukažte odznakem v záložce."
dont:
  - "Nepoužívejte záložky jako navigaci mezi stránkami aplikace."
  - "Nedávejte víc než asi pět záložek; víc patří do výběru nebo navigace."
  - "Neschovávejte do záložky obsah, který je potřeba porovnat s jinou záložkou."
---

## Chování

Záložky se přepnou kliknutím nebo šipkami vlevo a vpravo; Home a End skočí na první a poslední. Výběr se změní hned při přesunu šipkou. Do pořadí tabulátoru patří jen vybraná záložka a za ní obsah jejího panelu.

Záložky se nehýbou: lidé je přepínají často a pohyb by je zdržoval.

## Přístupnost

Seznam záložek má roli `tablist`, záložky `tab` s `aria-selected` a `aria-controls`, panely `tabpanel` s `aria-labelledby`. Skryté panely mají atribut `hidden`.
