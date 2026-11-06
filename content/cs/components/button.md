---
title: "Tlačítko"
description: "Spustí akci. Pilulka; hlavní akce je černá ve světlém a bílá v tmavém režimu."
do:
  - "Na obrazovce nechte nejvýš jedno hlavní tlačítko."
  - "Pojmenujte akci slovesem a výsledkem („Odeslat fakturu“)."
  - "Během akce použijte `busy`; tlačítko zůstane na místě a nedá se stisknout znovu."
  - "Ikonové tlačítko pojmenujte vlastností `label`."
dont:
  - "Nepoužívejte tlačítko jako odkaz na jinou stránku; na to je `href`, které vykreslí odkaz."
  - "Nedávejte vedle sebe dvě hlavní tlačítka."
  - "Neměňte barvu tlačítka podle nálady stránky; nevratná akce má variantu `danger`."
---

## Varianty

- **Hlavní** (`primary`): jediný další krok obrazovky.
- **Vedlejší** (výchozí): běžné akce, bílá s linkou.
- **Měkké** (`soft`): akce, která nemá soutěžit s hlavní.
- **Tiché** (`quiet`): akce v nástrojové liště a ikonová tlačítka.
- **Nevratná** (`danger`): smazat, zrušit, odebrat. Patří do potvrzovacího dialogu.

Velikosti `sm`, `md` (výchozí) a `lg`. Ikonové tlačítko je čtverec se zaoblením 6 px, aby se nepletlo se stavem.

## Chování

Při najetí myší se podklad o stupeň změní, při stisku se tlačítko na okamžik zmenší na 97 %. Zakázané tlačítko je poloprůhledné; když jde jen o to, že akce právě běží, použijte `busy`, které tlačítko nechá v pořadí fokusu a ohlásí „Načítá se“.

## Přístupnost

Tlačítko je nativní `<button type="button">`, odkaz nativní `<a>`. Enter a mezerník fungují samy. Ikonové tlačítko dostane `aria-label` z vlastnosti `label`.
