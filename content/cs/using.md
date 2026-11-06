---
title: "Použití v modulech"
description: "Jak si design system převezme web, aplikace nebo prezentace jako kontrolovanou kopii se zámkem a jak z něj berou nové verze."
do:
  - "Převezměte design system sloučením jeho vydání (merge tagu) do vlastního adresáře modulu."
  - "Importujte jen ze složky `app/v1/kit`, nikdy z prohlížeče design systému."
  - "Změnu komponenty navrhněte v design systému a do modulu ji vezměte dalším sloučením."
dont:
  - "Neupravujte soubory převzaté knihovny na místě; kontrola zámku to odhalí."
  - "Nekopírujte hodnoty barev nebo rozestupů do vlastního CSS; použijte proměnné `--ds-*`."
  - "Nečtěte soubory design systému za běhu z jiného repozitáře."
---

## Kontrolovaná kopie se zámkem

Modul, který chce vypadat jako Example, si design system nevkládá ručně. Sloučí jeho vydání jako podstrom (`git merge -X subtree=…`) do vlastní složky, třeba `design-system/`. Vydání tím zůstane v historii modulu a další verze přijde jako běžné sloučení.

Vedle leží soubor `design-system.lock.json` s repozitářem, vydáním, commitem a otiskem manifestu knihovny. Test modulu zavolá `verifyKit()` z `app/v1/kit/core/lock.ts` a selže, když někdo soubor knihovny upravil na místě nebo když knihovna neodpovídá zámku.

## Co importovat

Celá knihovna je ve složce `app/v1/kit`. Doporučujeme pro ni alias `@design-system` v `tsconfig.json` (a ve Vite v `resolve.alias`).

- **Styly:** jednou `@design-system/styles.css`. Obsahuje tokeny, písma, základní styly a všechny komponenty.
- **Astro:** `@design-system/astro/Button.astro` a další.
- **React:** `@design-system/react` exportuje všechny komponenty.
- **Tokeny v kódu:** `@design-system/tokens` (barvy pro grafy, rozestupy pro výpočty).

## Jazyk

Komponenty mluví česky nebo anglicky podle vlastnosti `locale`. Jazyk stránky určete jako Lazurio: nejdřív výslovná volba člověka, pak jazyk, který předá Lazurio, jinak čeština. Pomůže `resolveLocale()` a `readLazurioLocale()` z `@design-system/core/i18n`.
