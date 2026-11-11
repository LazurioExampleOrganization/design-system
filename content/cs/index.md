---
title: "Design system Lazurio Example Organization"
description: "Jak vypadají a mluví web, aplikace, dokumenty a prezentace Lazurio Example Organization. Jeden zdroj barev, písma a komponent pro lidi i agenty."
---

## K čemu je

Design system drží pohromadě všechno, co lidé od Lazurio Example Organization vidí: barvy, písmo, rozestupy, pohyb, ikony a komponenty, ze kterých se skládají obrazovky. Kdo staví web, aplikaci nebo prezentaci, nevymýšlí nic od nuly. Vezme si hotové kusy a pravidla, kdy který použít.

Stejně ho používají agenti. Než něco navrhnou, přečtou si [principy](principles/), [hlas a texty](voice/) a stránku komponenty, kterou potřebují.

## Jak je postavený

- **Značka** je na jednom místě, ve složce `brand/`: jméno, paleta, písma, zaoblení, logo a ilustrace. Organizace ji vymění tam a tokeny, komponenty i hlavička tohoto prohlížeče ji převezmou. Texty stránek, které jmenují Organizaci, se upravují zvlášť.
- **Tokeny** pojmenovávají hodnoty podle účelu (`ink`, `surface`, `space-16`). Z jednoho zdroje vznikají proměnné pro CSS i TypeScript, pro světlý i tmavý režim.
- **Komponenty** existují pro Astro i React se stejnými vlastnostmi a stejným HTML. Weby a znalostní báze je berou v Astru, aplikace v Reactu.

Lazurio Example Organization je veřejná ukázková Organizace a nepopisuje žádnou skutečnou firmu. Nosí vymyšlenou značku Example ze šablony design systému. Všechna jména, čísla a zákazníci na těchto stránkách jsou smyšlené.
