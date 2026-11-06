---
title: "Upozornění"
description: "Hlášení výsledku přímo na stránce. Ikona, krátký nadpis a co dělat. Zůstává, dokud se situace nezmění."
do:
  - "V nadpisu řekněte, co se stalo; v textu, co s tím udělat."
  - "Dejte k upozornění akci, která problém řeší."
  - "Upozornění, které se objeví bez obnovení stránky, oznamte (`live`)."
dont:
  - "Nedávejte na stránku víc upozornění najednou; seřaďte je podle důležitosti."
  - "Nepoužívejte upozornění pro potvrzení běžné akce; na to je oznámení."
  - "Neschovávejte chybu, dokud ji člověk nevyřeší."
---

## Tóny

- **Informace**: něco, co je dobré vědět před dalším krokem.
- **Úspěch**: výsledek, ke kterému se člověk vrátí (platba spárována).
- **Varování**: něco vyžaduje pozornost, ale práce může pokračovat.
- **Chyba**: něco se nepovedlo a člověk musí jednat.

## Oznámení čtečce

Upozornění, které je na stránce od načtení, se neoznamuje. Když se objeví později, použijte `live="polite"`; `live="assertive"` jen pro chybu, která zastaví práci. Tón se čtečce řekne slovem („Varování:“) před nadpisem.
