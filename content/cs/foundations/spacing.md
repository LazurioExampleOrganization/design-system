---
title: "Rozestupy a tvary"
description: "Škála rozestupů po čtyřech pixelech, pět zaoblení podle toho, co věc je, a jediný stín pro plovoucí vrstvu."
do:
  - "Rozestupy berte jen ze škály `space-*`."
  - "Zaoblení volte podle druhu věci: pilulka pro to, co se mačká nebo vyplňuje, 10 px pro karty."
  - "Stín dejte jen nabídce, dialogu a oznámení, vždy s vlasovou linkou."
dont:
  - "Nedávejte stín kartě nebo tabulce v toku stránky."
  - "Nemíchejte zaoblení: ikonové tlačítko je čtverec, ne kolečko."
  - "Nevymýšlejte mezistupně škály."
---

## Rozestupy

Škála roste po čtyřech až osmi pixelech do 32 a dál skoky (48, 64, 96, 128). Token nese hodnotu ve jméně: `space-24` je 24 pixelů, takže ho nemusíte dohledávat. Malé hodnoty patří dovnitř prvků, velké oddělují sekce.

## Tvar říká, co věc je

- **Pilulka** (`radius-pill`): tlačítko, jednořádkové pole, výběr, přepínač, odznak.
- **xs** (3 px): štítek dat, jediný hranatý ovládací tvar.
- **sm** (6 px): ikonové tlačítko, položka navigace.
- **md** (10 px): karta, dialog, upozornění, víceřádkové pole, tabulka.
- **lg** (16 px): velká ukázková plocha.

## Hloubka

Objekty v toku stránky mají vlasovou linku a žádný stín. Zdůraznění je plocha o stupeň tmavší, ne stín. Jediný stín systému (`shadow-float`) patří vrstvě, která pluje nad stránkou: nabídce, dialogu a oznámení.
