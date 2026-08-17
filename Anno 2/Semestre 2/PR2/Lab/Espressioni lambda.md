---
cssclasses: pr2
---
# Espressioni Lambda

Le lambda sono un modo di Java per cercare di modernizzarsi poco poco. Ok bellissimi gli oggetti quanto vuoi ma ogni tanto sono un po' pesanti. Ci sono momenti in cui fa comodo tornare al C, e definire comportamenti che ci servono solo una volta, un po' come le classi anonime. Le Java Lambda sono piuttosto snelle, stanno spesso in una riga: `(argomenti) -> {corpo}`.

Sono utili per le interfacce funzionali, interfacce con un solo metodo da implementare, per esempio `Predicate<T>`, che ha solo il metodo `boolean test(T)`. Anziché creare una classe che implementa `Predicate`, passiamo una funzione lambda che diventa l'implementazione del metodo.

Un esempio pratico di utilizzo sono gli algoritmi di ordinamento. I criteri di ordinamento sono funzioni, metodi, questo vale in generale. Quindi possiamo definire in una riga un criterio.