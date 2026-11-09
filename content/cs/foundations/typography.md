---
title: "Typografie"
description: "Inter pro text, Inter Tight pro nadpisy, Geist Mono pro kód. Několik rolí, ze kterých se skládá každá stránka."
do:
  - "Sázejte nadpisy v řezu 600, text v 400."
  - "Čísla pod sebou zarovnejte doprava a v tabulkových číslicích."
  - "Držte řádek odstavce do 68 znaků."
dont:
  - "Nepoužívejte verzálky, ani v malých popiscích."
  - "Nedávejte nad nadpis malý štítek nebo kategorii."
  - "Nepřidávejte písmo, které není ve značce."
---

## Písma

Text sází **Inter** a nadpisy **Inter Tight**, oba ve variabilní podobě hostované přímo v design systému (licence SIL Open Font License). Kód a čísla dokladů sází **Geist Mono**. Písma nejsou z cizího serveru: stránka je načte z vlastních souborů a funguje i bez internetu.

## Role

Role pojmenovávají účel, ne velikost. `display` je nadpis stránky, `title` nadpis sekce nebo karty, `body` běžný text, `label` ovládací prvky a popisky polí, `meta` doplňující údaje. Každá role má velikost, proklad, řez a prostrkání; tokeny `--ds-type-<role>-*` je drží pohromadě.

## Pravidla sazby

- Nadpisy jsou krátké a vyvážené (`text-wrap: balance`).
- Odstavce mají nejvýš 68 znaků na řádek.
- Částky a data pod sebou mají tabulkové číslice, aby se daly porovnat.
- Kurzívu ani podtržení nepoužívejte pro zdůraznění; podtržený je jen odkaz.
