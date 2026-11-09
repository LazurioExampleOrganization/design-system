---
title: "Hlas a texty"
description: "Jak Example mluví v rozhraní, dokumentech a e-mailech, česky i anglicky."
do:
  - "Pište slovesem, co se stane: „Uložit koncept“, ne „OK“."
  - "V chybě řekněte, co má člověk udělat."
  - "Lidem vykejte a výzvy pište v množném čísle."
  - "Čísla, data a částky formátujte podle jazyka stránky."
dont:
  - "Nemíchejte na jedné obrazovce češtinu a angličtinu."
  - "Nepoužívejte reklamní superlativy ani úřední jazyk."
  - "Neobviňujte člověka („Zadali jste špatně…“)."
---

## Jak zníme

Jako kolega, který věci rozumí a nespěchá. Přímo, přirozeně, bez nadšení a bez úředních obratů. Začínáme tím podstatným a souvislosti přidáváme jen tam, kde pomohou rozhodnout.

## Texty v rozhraní

- **Tlačítka** říkají, co se stane: „Odeslat fakturu“, „Smazat koncept“. Hlavní akce je stejná ve formuláři i v potvrzení.
- **Popisky polí** jsou podstatná jména bez dvojtečky. Nápověda pod popiskem říká, co a v jakém tvaru zadat.
- **Chyby** popisují, co udělat: „Doplňte e-mail ve tvaru jmeno@example.com.“
- **Prázdné stavy** vysvětlí, proč je místo prázdné, a nabídnou další krok.
- **Potvrzení** u nevratné akce řekne, co přesně zmizí, a tlačítko to zopakuje.

## Dva jazyky

Rozhraní, ukázky i dokumentace pro lidi jsou česky i anglicky. Jedna obrazovka mluví vždy jedním jazykem. Texty v obou jazycích se píší znovu, ne doslovným překladem: anglická věta bývá kratší, česká potřebuje sloveso. Vlastní jména firem a lidí se nepřekládají.

## Čísla a data

Částky, data a počty formátujte přes `Intl` v jazyce stránky: `18 450 Kč` a `2. 11. 2026` česky, `CZK 18,450` a `2 Nov 2026` anglicky. Čeština skloňuje podle počtu (1 faktura, 2 faktury, 5 faktur); použijte `Intl.PluralRules`.
