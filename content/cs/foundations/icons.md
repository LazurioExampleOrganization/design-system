---
title: "Ikony"
description: "Obrysové ikony z otevřené sady Iconoir na mřížce 24 × 24 s tahem 1,5. Pomáhají textu, nenahrazují ho."
do:
  - "Ikonu dejte vedle slova, které říká totéž."
  - "Ikonu bez textu pojmenujte pro čtečky."
  - "Kreslete ji v barvě textu (`currentColor`)."
dont:
  - "Nepřekreslujte ikony a nemíchejte je s jinou sadou."
  - "Nebarvěte ikony signálními barvami mimo stav."
  - "Nepoužívejte ikonu jako ozdobu nad nadpisem."
---

## Sada

Design system nese vybrané ikony z [Iconoiru](https://iconoir.com) (licence MIT) přímo v knihovně, bez závislosti. Všechny jsou obrysové, na mřížce 24 × 24, s tahem 1,5 a kreslené v `currentColor`, takže převezmou barvu textu a fungují ve světlém i tmavém režimu.

## Velikosti

- `sm` (16 px) v odznaku, malém tlačítku a drobečkové navigaci,
- `md` (20 px) v tlačítku, navigaci, upozornění a oznámení,
- `lg` (24 px) samostatně, například v prázdném stavu.

## Když ikona chybí

Přidejte její jméno z Iconoiru do seznamu ve `app/v1/scripts/icons.ts` a spusťte `bun run icons`. Vlastní ikony se nekreslí: sada má zůstat jednotná.
