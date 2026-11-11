---
title: "Formulářové prvky"
description: "Textové pole, víceřádkové pole, výběr, zaškrtávací pole, přepínače a vypínač. Popisek nad polem, nápověda před ním, chyba za ním."
do:
  - "Každému poli dejte viditelný popisek."
  - "Označte nepovinná pole (`optional`), povinná nechte bez značky."
  - "Chybu ukažte u pole, až když člověk pole opustí nebo odešle formulář."
  - "Nastavte `type`, `autocomplete` a `inputmode`, ať telefon nabídne správnou klávesnici."
dont:
  - "Nenahrazujte popisek zástupným textem (`placeholder`)."
  - "Nezakazujte tlačítko Odeslat jen proto, že formulář ještě není vyplněný."
  - "Nemažte, co člověk napsal, když je pole chybné."
---

## Skladba pole

Popisek je nad polem, nápověda pod popiskem a před polem, chyba za polem s ikonou. Nápověda i chyba jsou s polem spojené přes `aria-describedby`, takže je čtečka přečte spolu s polem. Chybné pole má `aria-invalid` a červenou hranici.

## Který prvek

- **Textové pole** pro krátký text, číslo, e-mail nebo datum.
- **Víceřádkové pole** pro poznámky; roste svisle.
- **Výběr** pro jednu z mnoha možností; s výzvou (`placeholder`), když se má vybrat vědomě.
- **Přepínače** (radio) pro jednu ze dvou až pěti možností, které mají být vidět.
- **Zaškrtávací pole** pro souhlas nebo volbu, která se uloží s formulářem.
- **Vypínač** (switch) pro nastavení, které platí hned.

## Stavy

Výchozí, s nápovědou, nepovinné, chybné, zakázané a jen ke čtení. Pole jen ke čtení má přerušovanou hranici a jde z něj kopírovat; zakázané ne.

## Velikost písma

Text v poli má aspoň 16 px, takže se telefon při psaní nepřiblíží.
