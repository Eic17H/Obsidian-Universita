---
cssclasses:
  - r54
---
Ho fatto controllare l'intera repo a Copilot e sembra che SolCMC ignori la differenza tra indirizzi qualunque e EOA, anche in Bank.

Imparo da Lottery come affrontare le proprietà che richiedono di rilevare le revert. Se io voglio che $b \to (f() \to rev)$, allora basta fare `preghost f: flag = !b` e `postghost f: assert(flag)`. Quindi se $b$ è vera, allora il test passa solo se la funzione reverta.

Idea. Idea derivata da quello. Che sicuramente non funzionerà perché non funziona così. No infatti non funziona ora che ci penso, ma idea. No ma in effetti il problema è che una revert è una revert. Metti che metto come ghost `executed=false;` come preghost `ok=false; executed=true;` e come postghost `ok=true;`. Non ha senso neanche in concetto. Ma immagina eh non ha senso. Però l'idea era mettere `assert(!executed || ok)` in un'invariante. Però ovviamente la revert funziona che questo non funziona.