---
cssclasses:
  - asd
---
Un heap (o uno heap) è un albero con una proprietà specifica: il dato di ogni nodo è maggiore o uguale al dato dei suoi figli. Questa proprietà è utile per l'[[Heap sort|ordinamento]].

Noi consideriamo gli alberi binari rappresentati [[Alberi#Array|come array]].

## Operazioni

Nell'implementazione, usiamo una variabile intera per tenere traccia della dimensione, e una macro per la dimensione massima.

Il tipo mostrato è `Dato`, e sono presenti confronti con `>` e simili. Se il tipo utilizzato nel codice è una struct, bisognerà sostituire l'operatore con una funzione con lo stesso comportamento.

### Adatta

Dato un albero rappresentato come array, lo trasforma in un heap.

* Se la testa è già maggiore di entrambi i figli, termina qui;
* Scambia la testa con il maggiore dei due figli, che essendo il maggiore è una testa valida;
* Se il sottoalbero dell'ex-testa non è una foglia, adattalo ricorsivamente.

In questo modo stiamo prendendo la testa e la stiamo "spingendo in basso" finché non è in una posizione corretta, cioè è minore di tutti i suoi antenati e maggiore di tutti i suoi discendenti, definizione di heap.

```C
void adatta(Dato heap[], int radice, int dimHeap){
    Dato temp = heap[radice];
    int figlio = 2*radice;
    while(figlio <= dimHeap){
        if(figlio<dimHeap && heap[figlio]<heap[figlio+1])
            figlio++;

        if(temp>heap[figlio])
            break;
        else{
            heap[figlio/2] = heap[figlio];
            figlio *= 2;
        }
    }
    heap[figlio/2] = temp;
}
```
### Inserimento

* Se l'heap è pieno, non possiamo inserire;
* Aumentiamo la grandezza dell'heap;
* Partiamo dal fondo dell'heap e "tiriamo in basso" il padre di ogni nodo, finché non arriviamo al posto in cui si dovrebbe inserire il nuovo dato (quando il nuovo dato è maggiore del nodo che stiamo tirando giù);
* Mettiamo il nuovo dato nello spazio lasciato vuoto dall'ultimo nodo che abbiamo tirato giù.

```C
void insertHeap(Dato nuovoDato, Dato heap[HEAPSIZE], int* dimHeap){
    if(*dimHeap >= HEAPSIZE-1) return;
    
    (*dimHeap)++;
    
	int i;
    // Facciamo scendere gli elementi che devono scendere
    for(i=*dimHeap; i!=1 && nuovoDato>heap[i/2]; i/=2)
	    heap[i] = heap[i/2];
	heap[i] = nuovoDato;
}
```

### Rimozione

Per eliminare un nodo, mettiamo al suo posto l'elemento che si trova alla fine dell'array, e poi accorciamo l'array di 1. In questo modo otteniamo un albero che non è un heap, e per ritrasformarlo in un heap lo adattiamo.

Poiché tutti i sottoalberi di un heap sono heap, possiamo semplicemente implementare l'algoritmo che elimina la radice, e passargli un sottoalbero dell'heap intero.

```C
Dato deleteHeap(Dato* heap, int* dimHeap){
	if(*dimHeap <= 0) return 0;
    Dato testa = heap[1];
    heap[1] = heap[*dimHeap];
    (*dimHeap)--;
    adatta(heap, 1, *dimHeap);
    return testa;
}
```