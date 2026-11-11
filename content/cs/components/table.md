---
title: "Tabulka"
description: "Data v řádcích a sloupcích. Vlasové linky mezi řádky, tichá hlavička, čísla zarovnaná doprava."
do:
  - "Dejte tabulce popisek (`caption`); skryjte ho jen tehdy, když nad tabulkou stojí stejný nadpis."
  - "Čísla a částky zarovnejte doprava třídou `ds-table__num`."
  - "Stav v řádku ukažte odznakem."
  - "Prázdnou tabulku nahraďte prázdným stavem s dalším krokem."
dont:
  - "Nepoužívejte tabulku na rozvržení stránky."
  - "Nedávejte do jedné buňky víc akcí; akce řádku patří do jeho detailu."
  - "Neoznačujte vybraný řádek jen barvou."
---

## Kdy použít

Když lidé data porovnávají, řadí nebo v nich hledají. Pro několik údajů o jedné věci stačí karta; pro seznam bez sloupců navigace nebo jednoduchý seznam.

## Skladba

Tabulka leží v obalu (`ds-table-wrap`), který se na úzké obrazovce posouvá do strany. Obal jde označit klávesnicí, aby se dal posouvat i bez myši, a čtečka ho pojmenuje podle popisku tabulky. Hlavička má šedý podklad, řádky oddělují vlasové linky.

## Řazení

Sloupec, podle kterého se dá řadit, má v hlavičce tlačítko `ds-table__sort` a seřazený sloupec atribut `aria-sort`. Ikona ukazuje směr, skrytý text ho řekne čtečce.

## Varianty

Výchozí, kompaktní (`density="compact"`) pro husté přehledy a interaktivní (`interactive`), jejíž řádky reagují na ukazatel, když otevírají detail.
