---
title: "Použití v modulech"
description: "Web, aplikace nebo prezentace přidají design system jako balíček: závislost na vydané verzi, kterou posunou, když přijde nová."
do:
  - "Přidejte balíček `design-system` jako závislost na vydaném tagu."
  - "Styly načtěte jednou (`design-system/styles.css`), komponenty importujte z `design-system/astro` nebo `design-system/react`."
  - "Novou verzi nebo novou značku převezměte posunem tagu v závislosti."
dont:
  - "Nekopírujte soubory design systému do modulu ani je neimportujte relativní cestou."
  - "Nezávisejte na větvi; vždy na vydaném tagu."
  - "Nekopírujte hodnoty barev nebo rozestupů do vlastního CSS; použijte proměnné `--ds-*`."
---

## Balíček na vydané verzi

Design system je balíček `design-system`. Modul ho přidá do `package.json` své aplikace jako závislost na vydaném tagu, stejně jako každý sdílený balíček v Lazuriu. `bun.lock` zapíše přesný commit tagu, takže `bun install --frozen-lockfile` nainstaluje vždy totéž.

```json
"design-system": "github:LazurioTemplates/design-system#v2.0.0"
```

Moduly Organizace závisí na jejím vlastním design systému, který nese její značku:

```json
"design-system": "git+ssh://git@github.com/<Organizace>/design-system.git#v<verze>"
```

Importy jsou v obou případech stejné, takže přechod ze šablony na design system Organizace změní jen jeden řádek.

## Co importovat

- **Styly:** jednou `design-system/styles.css`. Obsahují tokeny, písma, základní styly a všechny komponenty.
- **Astro:** `import { Button } from "design-system/astro";`
- **React:** `import { Button } from "design-system/react";`
- **Tokeny v kódu:** `design-system/tokens` (barvy pro grafy, rozestupy pro výpočty).

## Nová verze a nová značka

Novou verzi design systému i novou značku Organizace převezme modul stejně: posune tag v závislosti, spustí `bun install` a kontrolu a projde své stránky v obou režimech.

## Jazyk

Komponenty mluví česky nebo anglicky podle vlastnosti `locale`. Jazyk stránky určete jako Lazurio: nejdřív výslovná volba člověka, pak jazyk, který předá Lazurio, jinak čeština. Pomůže `resolveLocale()` a `readLazurioLocale()` z `design-system`.
