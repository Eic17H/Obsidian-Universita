---
cssclasses:
  - asd
---
Vedremo solo le liste lineari. Confronteremo la complessità della lettura, dell'inserimento e della rimozione di un elemento, che sono diverse nel caso delle [[liste ordinate]].
## Come array

Un array così come lo conosci. Gli elementi sono immagazzinati in sequenza. Si indicizza in $O(n)$ se la lista è lunga $n$, ma se devi rimuovere l'$m$-esimo elemento, devi modificare $n-m$ elementi, stessa cosa se vuoi aggiungere un elemento alla posizione $m$, quindi quellle sono $O(n-m)$.
## Con puntatori

Diciamo che vogliamo rappresentare dati di tipo `Dato` (possiamo benissimo sostituirla con un tipo primitivo). Ogni elemento è allocato separatamente, e due elementi adiacenti sono collegati da puntatori.

Creiamo una struct, separata da `Dato`, che chiamiamo `Nodo`.

Gli elementi sono sparsi per la memoria, non sappiamo immediatamente dov'è l'$m$-esimo elemento, quindi per trovare il suo indirizzo dobbiamo scorrere l'intera lista in $O(m)$. Però aggiungere e rimuovere elementi è più particolare.

Per la lista in sé, basta avere una struttura che punta al primo nodo, e magari all'ultimo:

```C
typedef struct lista {
	Nodo* first;
	Nodo* last;
} Lista
```

Vediamo due tipi di lista a seconda di come definiamo i nodi.

#todo: magari aggiungere `aggancia`, `insert`, `remove`, per ora sono lasciate come esercizio per il lettore.
### Singolarmente concatenate

Un nodo ha il dato e il puntatore al nodo successivo. Si può andare avanti ma non tornare indietro.

```C
typedef struct nodo {
	struct nodo* next;
	Dato item;
} Nodo;
```

Se conosco l'indirizzo dell'$m$-esimo nodo, aggiungere un nodo dopo di esso è semplice, perché basta attaccare questo nodo a quello nuovo, e quello nuovo a quello dopo.

Per rimuovere il nodo dopo $m$, basta collegare $m$ a quello dopo ancora e poi liberare la memoria del nodo da rimuovere. Se invece voglio rimuovere proprio $m$, allora devo scorrere dall'inizio della lista fino a $m-1$.
### Doppiamente concatenate

Posso anche tornare indietro, quindi non c'è più quel problema dell'eliminazione, ma ci sono da fare passaggi in più perché ci sono il doppio dei puntatori.

```C
typedef struct nodo {
	struct nodo* prev;
	struct nodo* next;
	Dato item;
} Nodo;
```

## Operazioni

[[Ordinamento]]