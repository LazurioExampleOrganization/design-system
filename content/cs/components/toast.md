---
title: "Oznámení"
description: "Krátce potvrdí, co se právě stalo, a samo odejde. Plovoucí vrstva dole na obrazovce."
do:
  - "Pište krátce a v minulém čase: „Koncept uložen“."
  - "Oblast pro oznámení dejte na stránku jednou, na její konec."
  - "Chybu nechte, dokud ji člověk nezavře."
dont:
  - "Nedávejte do oznámení jedinou cestu k důležité akci; zmizí."
  - "Neukazujte oznámení pro každou drobnost; jen pro výsledky, které nejsou vidět jinde."
  - "Nepoužívejte oznámení pro chybu ve formuláři; ta patří k poli."
---

## Chování

Oznámení přijede zespodu (200 ms, s omezeným pohybem se jen objeví) a po šesti sekundách odejde. Dokud je na něm ukazatel nebo uvnitř fokus, neodejde. Oznámení s chybou neodejde samo vůbec. Každé má zavírací tlačítko.

V Astru je jedna oblast `ToastRegion` a oznámení přidá `showToast()` z jádra nebo tlačítko s `data-ds-toast-show`. V Reactu drží oznámení `useToasts()` a vykreslí je `ToastRegion` s `Toast`.

## Přístupnost

Oblast je živá (`aria-live="polite"`): čtečka oznámení přečte, až dokončí, co právě čte. Tón se přečte slovem („Hotovo:“). Když oznámení zmizí s fokusem uvnitř, fokus se vrátí na hlavní obsah stránky.
