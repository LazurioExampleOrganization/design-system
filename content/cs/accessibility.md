---
title: "Přístupnost"
description: "Design system splňuje WCAG 2.2 AA. Co hlídají testy a co musí ohlídat ten, kdo z komponent staví obrazovku."
do:
  - "Každému poli dejte viditelný popisek a chybu spojte s polem."
  - "Ověřte obrazovku jen klávesnicí: Tab, Shift+Tab, Enter, mezerník, Escape a šipky."
  - "Pohyb nabízejte s variantou pro omezený pohyb."
  - "Ikonu bez textu pojmenujte (`label` u tlačítka nebo ikony)."
dont:
  - "Nespoléhejte na barvu jako jediný nositel informace."
  - "Neschovávejte rámeček fokusu."
  - "Nevypínejte přiblížení stránky na telefonu."
  - "Nedávejte `ink-faint` na text, který se má číst."
---

## Co hlídá design system sám

- **Kontrast.** Testy spočítají kontrast všech dvojic rolí ve světlém i tmavém režimu: text aspoň 4,5 : 1, hranice polí, ikony a rámeček fokusu aspoň 3 : 1. Paleta, která neprojde, neprojde ani `bun run check`. Výsledek je na stránce [Barvy](../foundations/colors/).
- **Fokus.** Každý ovládací prvek má viditelný `:focus-visible`: dvoubodový rámeček v barvě inkoustu s odstupem, nikdy barevná záře.
- **Nativní prvky.** Tlačítka jsou `<button>`, pole `<input>`, dialog je nativní `<dialog>` otevřený jako modální: fokus zůstane uvnitř, Escape ho zavře a fokus se vrátí na tlačítko, které ho otevřelo.
- **Záložky** se ovládají šipkami podle vzoru WAI-ARIA a do pořadí tabulátoru patří jen vybraná.
- **Stavy** nesou slovo i pro čtečky: upozornění a oznámení mají skryté „Chyba:“, „Hotovo:“.
- **Pole** mají písmo aspoň 16 px, takže se telefon do pole nepřiblíží. Stránka přiblížení nikdy nevypíná.
- **Pohyb** respektuje `prefers-reduced-motion`: posuny a zvětšení zmizí, obsah je hned na místě.

## Co ohlídá ten, kdo staví obrazovku

- Pořadí nadpisů bez přeskakování úrovní; jedna `h1` na stránce.
- Smysluplné texty odkazů a tlačítek (ne „zde“, ne „více“ bez kontextu).
- Tabulka má popisek (`caption`) a záhlaví sloupců `scope="col"`.
- Obsah, který se objeví bez obnovení stránky, oznámí `live` u upozornění nebo oznámení.
- Jazyk stránky v `<html lang>` odpovídá jejímu textu.
