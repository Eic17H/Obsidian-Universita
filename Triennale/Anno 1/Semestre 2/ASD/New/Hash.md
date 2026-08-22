---
cssclasses:
  - asd
---
Lo stesso argomento: <span class="bd">[[Hashing]]</span>

Questa non l'ho capita, mi sa che mancavo a lezione.

Essenzialmente tu hai i tuoi dati, e li vuoi memorizzare. Dato il tuo dato, singolo, ti crei una funzione che trasforma il suo ID in un numero essenzialmente casuale (il suo ==hash==), e usi quel numero come indice in un array grande grande. Adesso, se tu sai l'ID della cosa che cerchi, basta che usi quella funzione per sapere dove trovare il dato nell'array.

Può succedere che due ID diversi abbiano lo stesso hash. Semplicemente per ogni hash, anziché avere un solo slot, hai una lista. Per recuperare il dato, scorri la lista finché non arrivi al nodo con l'ID giusto.

La funzione hash deve darti numeri abbastanza casuali, non tutti uguali o troppo vicini.