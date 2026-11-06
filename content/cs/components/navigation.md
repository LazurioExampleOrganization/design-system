---
title: "Navigace"
description: "Místa aplikace nebo webu a drobečková navigace, která ukáže, kde stránka leží. Aktuální stránka je plocha o stupeň tmavší, nikdy barva."
do:
  - "Aktuální stránku označte `current`; vykreslí se `aria-current=\"page\"`."
  - "Pojmenujte navigaci (`label`), nebo jí dejte viditelný nadpis skupiny (`title`)."
  - "Položky pojmenujte krátce, podstatným jménem."
dont:
  - "Neoznačujte aktuální stránku akcentní barvou ani levým pruhem."
  - "Nedávejte do jedné úrovně víc než asi sedm položek."
  - "Nepoužívejte navigaci pro akce; na ty jsou tlačítka."
---

## Varianty

- **Svislá** (výchozí): boční panel aplikace, volitelně s ikonami, počty a nadpisem skupiny.
- **Vodorovná** (`orientation="horizontal"`): několik míst v hlavičce webu, položky jako pilulky.
- **Drobečková navigace**: cesta od kořene k aktuální stránce; poslední položka není odkaz.

## Stavy

Výchozí položka má tlumený text, při najetí plochu o stupeň tmavší a plný inkoust. Aktuální položka má plochu `surface-selected` a plný inkoust. Počet (`badge`) je tichý a v tabulkových číslicích.

## Přístupnost

Navigace je `<nav>` se jménem, seznam je `<ul>`. Aktuální položka má `aria-current="page"`. Drobečková navigace je `<nav aria-label="Drobečková navigace">` s uspořádaným seznamem a oddělovače jsou pro čtečku skryté.
