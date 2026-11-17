---
cssclasses:
  - r54
---
Ho fatto controllare l'intera repo a Copilot e sembra che SolCMC ignori la differenza tra indirizzi qualunque e EOA, anche in Bank.

Imparo da Lottery come affrontare le proprietà che richiedono di rilevare le revert. Se io voglio che $b \to (f() \to rev)$, allora basta fare `preghost f: flag = !b` e `postghost f: assert(flag)`. Quindi se $b$ è vera, allora il test passa solo se la funzione reverta.