---
title: "Kdy co použít"
description: "Která komponenta patří ke které situaci, když se nabízí víc možností."
---

## Oznámit výsledek

| Situace | Použijte |
| --- | --- |
| Akce se povedla a člověk pokračuje dál | [Oznámení](../components/toast/), zmizí samo |
| Něco se nepovedlo a člověk musí jednat | [Upozornění](../components/alert/) přímo na stránce; oznámení s chybou nezmizí samo |
| Stav jedné položky (faktura, úkol) | [Odznak](../components/badge/) s ikonou a slovem |
| Pole formuláře je špatně | Chyba pod polem ve [formuláři](../components/form/) |
| Na stránce zatím nic není | [Prázdný stav](../components/empty-state/) s dalším krokem |

## Zeptat se nebo potvrdit

| Situace | Použijte |
| --- | --- |
| Nevratná akce (smazat, odeslat, zaplatit) | [Dialog](../components/dialog/) s tlačítkem, které akci pojmenuje |
| Krátký úkon, který přeruší práci (přejmenovat) | Dialog s formulářem |
| Delší úprava | Samostatná stránka, ne dialog |

Odeslat, zveřejnit, zaplatit a smazat jsou kroky, které nejde snadno vrátit. Připravte je jako koncept, ukažte, co se stane, a proveďte je až po výslovném potvrzení.

## Vybrat

| Situace | Použijte |
| --- | --- |
| Jedna ze dvou až pěti možností, všechny vidět | Přepínače (radio) |
| Jedna z mnoha možností | Výběr (select) |
| Zapnout nebo vypnout s okamžitým účinkem | Přepínač (switch) |
| Souhlas nebo volba, která se uloží s formulářem | Zaškrtávací pole |

## Přepnout pohled

| Situace | Použijte |
| --- | --- |
| Pohledy na jednu věc (přehled, faktury, poznámky) | [Záložky](../components/tabs/) |
| Různá místa aplikace | [Navigace](../components/navigation/) |
| Kde v hierarchii stránka leží | Drobečková navigace |
