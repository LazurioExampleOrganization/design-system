---
title: "Odznak a štítek"
description: "Odznak hlásí stav barvou, ikonou a slovem. Štítek označuje data, je hranatý, aby se nepletl se stavem."
do:
  - "Ve stavu použijte slovo, které stav pojmenuje („Zaplaceno“, „Po splatnosti“)."
  - "Nechte odznak s výchozí ikonou svého tónu."
  - "Štítek použijte pro kód, kategorii nebo klíčové slovo."
dont:
  - "Nepoužívejte odznak bez slova, jen jako barevnou tečku."
  - "Nedělejte z odznaku tlačítko."
  - "Nepoužívejte signální tón jako ozdobu (zelená „Nové“)."
---

## Tóny

- **Neutrální**: koncept, archiv, stav bez hodnocení.
- **Akcent**: nové, právě vybrané. Bez ikony a střídmě.
- **Úspěch, varování, chyba, informace**: výsledek, který systém hlásí; každý má svou ikonu.

## Štítek

Štítek (`Tag`) označuje data: číslo dokladu, kategorii, klíčové slovo. Je hranatý (`radius-xs`) a v neproporcionálním písmu, takže se nikdy neplete s odznakem stavu.

## Přístupnost

Ikona odznaku je pro čtečku skrytá; stav nese slovo. Když slovo samo nestačí (například „3“), doplňte ho skrytým textem.
