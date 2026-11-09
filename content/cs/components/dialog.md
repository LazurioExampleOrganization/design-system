---
title: "Dialog"
description: "Přeruší práci kvůli krátkému rozhodnutí nebo úkonu. Nativní modální dialog, plovoucí vrstva se stínem."
do:
  - "V nadpisu se zeptejte na to, o čem člověk rozhoduje („Smazat koncept faktury?“)."
  - "Tlačítko akce pojmenujte stejně jako akci, ne „Ano“ nebo „OK“."
  - "Hlavní tlačítko dejte poslední, vpravo."
  - "Před nevratnou akcí řekněte, co přesně zmizí."
dont:
  - "Nedávejte do dialogu dlouhý formulář; patří na vlastní stránku."
  - "Neotevírejte dialog z dialogu."
  - "Nezavírejte kliknutím mimo dialog, ve kterém je rozepsaný text."
---

## Kdy použít

Pro potvrzení nevratné akce a pro krátký úkon, který na chvíli přeruší práci (přejmenovat, vybrat). Pro výsledek akce použijte oznámení, pro delší úpravu stránku.

## Chování

Dialog je nativní `<dialog>` otevřený jako modální: stránka za ním je neaktivní, fokus zůstane uvnitř a Escape dialog zavře. Po zavření se fokus vrátí na tlačítko, které ho otevřelo. Dialog vyroste ze středu (z 97 % velikosti za 280 ms); s omezeným pohybem se jen objeví.

V Astru dialog otevře tlačítko s `data-ds-dialog-open="<id>"`, v Reactu vlastnost `open`. Zavírací křížek je formulář `method="dialog"`, takže funguje i bez skriptu.

## Zavření kliknutím vedle

Vlastnost `dismissable` zavře dialog kliknutím na závoj. Hodí se pro informativní dialog, nikdy pro dialog s rozepsaným vstupem.
