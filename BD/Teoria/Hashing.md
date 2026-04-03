---
cssclasses:
  - bd
---
Hai le chiavi `key`, hai una funzione `h()` che data una chiave ne restituisce l'hash. Hai un indice hash in cui all'indice `h(key)`si trova un puntatore al punto in cui è memorizzato il dato con indice `key`.

Le operazioni che si svolgono sono:
* Calcolare h(key), con costo 0 perché non leggo nessun blocco
* Lettura blocco indice hash, costo 1 perché so già dove lo trovo, non devo neanche cercarlo
* Seguo il puntatore e arrivo al dato, lettura blocco record cercato, costo 1 perché appunto so già dove lo trovo grazie al puntatore
Il costo totale è 2, come nel caso di un B-Tree talmente piccolo che è solo la radice. Quindi sì, l'hashing ha un costo molto basso.

Quando è grande un blocco? Di solito 4 kB.

Le #slide sono simpatiche. Quando fai l'hashing, di solito ci sono molte più chiavi possibili che hash, ed è voluto (come detto in ASD e in PR2). Un hash quindi può avere più puntatori (collisione, clash), come facciamo? Beh allochiamo, nell'indice hash, un blocco per possibile valore dell'hash. 4kB bastano per molti puntatori.

Una buona funzione hash deve distribuire bene le chiavi tra i possibili hash.

## Hashing dinamico

Quando io alloco lo spazio per il mio indice hash, alloco lo stesso spazio per ogni hash. Vedi dalle slide, figata.

## Indice Bitmap

Ha una colonna per possibile valore di una proprietà. Ha una riga per riga dei dati. Una riga ha 1 nella colonna corrispondente al valore che dovrebbe avere, e 0 in tutte le altre.

Perché usare l'indice bitmap? Se seleziono per un valore, devo portarmi in memoria tutta la tabella normalmente, invece con l'indice bitmap mi basta portarmi in memoria la colonna corrispondente a quel valore... no. No? Questo professore non dice niente, chiede a noi e noi non lo sappiamo perché siamo qui per imparare e cosa possiamo dire? E quando finalmente si decide a spiegare, apre 500 incisi e fa altre cazzo di domande e che cazzo ne so, come faccio a seguire se parli a voce bassa, fai esempi inutili perché adesso devi astrarre e spiegare il concetto. Sembra un bimbo, un bimbo che è stato chiamato a sorpresa all'interrogazione e non aveva studiato. E poi niente, dopo 50000 incisi arriva alla conclusione che il bitmap è più efficiente perché *è più compatto*. Ma che significa? Dillo cazzo. Di' qualcosa, spiega, pezzo di merda.

Permette anche di fare query composite.

# Definizione degli indici

Ma leggiti il libro di Leonardo Dessì.

Non è standard ma è spesso possibile con molti DBMS.

Perché non è una buona scelta creare un indice su tutto? Gli indici messi insieme mi occuperebbero più spazio dell'intera tabella, e ogni volta che modifico un dato modifico anche l'indice e diventa un po' inutile.

# Algoritmi

Il merge join è molto più efficiente, assume che i dati siano ordinati.