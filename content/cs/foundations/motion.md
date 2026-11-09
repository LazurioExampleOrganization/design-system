---
title: "Pohyb"
description: "Pohyb jen tam, kde pomůže pochopit, co se stalo. Krátký, s měkkým dojezdem, a nikdy pro to, co člověk dělá stokrát denně."
do:
  - "Animujte jen `transform` a `opacity`."
  - "Pro vstup a odchod použijte `ease-out`, odchod zkraťte."
  - "Každý pohyb dejte i do varianty `prefers-reduced-motion: reduce`."
  - "Odezvu na stisk držte do 160 ms."
dont:
  - "Nepoužívejte `ease-in` na prvku rozhraní; působí líně."
  - "Nehýbejte tím, co se ovládá z klávesnice nebo velmi často (záložky, navigace)."
  - "Nenechte nic vyrůst z nuly; začněte nejméně od 95 % velikosti."
  - "Nepište `transition: all`."
---

## Má se to hýbat?

Pohyb potřebuje důvod: návaznost v prostoru (dialog vyroste ze středu), změnu stavu (přepínač dojede na druhou stranu), odezvu na akci (tlačítko se při stisku zmenší) nebo zjemnění skoku, který by jinak působil rozbitě. „Vypadá to hezky“ důvod není. Čím častěji člověk něco vidí, tím méně se to má hýbat: záložky a navigace se nehýbou vůbec.

## Délky a křivky

Tokeny `duration-*` a `ease-*` drží celou škálu. Stisk tlačítka trvá 120 ms, barva při najetí 160 ms, nabídka a oznámení 200 ms, dialog 280 ms. Odchod je kratší než příchod (`duration-exit`). Vstup a odchod mají `ease-out`, pohyb po obrazovce `ease-in-out`, změna barvy `ease`.

## Omezený pohyb

Kdo má v systému zapnutý omezený pohyb, uvidí obsah hned na místě: posuny a zvětšení zmizí, zůstane nanejvýš změna průhlednosti. Komponenty to řeší samy; vlastní pohyb ve stránce to musí řešit také.

## Hover jen pro myš

Efekty při najetí patří do `@media (hover: hover) and (pointer: fine)`. Na dotykové obrazovce by po ťuknutí zůstaly viset.
