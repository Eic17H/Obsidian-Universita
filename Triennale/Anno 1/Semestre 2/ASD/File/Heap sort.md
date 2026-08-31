---
cssclasses:
  - asd
---
Sfruttiamo la proprietà degli [[heap|heap]] per ordinare dei dati.

Diciamo che abbiamo un heap. Il suo elemento massimo è alla radice. Possiamo metterlo nel nostro array ordinato e rimuoverlo. Per le proprietà dell'heap, una volta rimosso l'elemento maggiore troviamo il secondo elemento maggiore alla radice, quindi rimuoviamo anche quello e lo mettiamo nell'array ordinato. Continuiamo così finché l'array non è vuoto.

Quello è il concetto. Nella nostra implementazione, anziché avere un array ordinato separato, visto che stiamo già rappresentando l'heap come array, usiamo lo stesso array. Quindi al passo $i$, gli ultimi $i$ elementi dell'array fanno parte dell'array ordinato e non dell'heap.

## Pseudocodice

* Trasformiamo la lista in un heap:
	- Adattiamo tutto da destra a sinistra;
	- All'inizio, i due sottoalberi sono foglie, quindi sono già adatti;
	- Dopo, i due sottoalberi sono alberi veri, ma li abbiamo già adattati;
	- Visto che Adatta riadatta solo il sottoalbero in cui è avvenuto lo scambio, è bene che tutti gli altri siano già adatti;
	- Adesso abbiamo un heap;
- Ripetiamo finché l'heap non è diventato tutto una lista:
	- Mettiamo la testa alla fine, e limitiamo lo heap a uno spazio in meno di prima;
	- Adattiamo lo heap per avere il massimo in testa;
		- I due sottoalberi della radice sono già adattati.

## C

L'ho copiato dall'esercitazione ma mi sembra strano:

```C
void heapSort(int lista[], int n){
    lista--; // Perché l'heap è implementato con un offset di 1
    // Trasformiamo in un heap
    for(int i=n/2; i>=1; i--)
        adatta(lista, i, n);
    // Mettiamo alla fine e adattiamo
    for(int i=n-1; i>=1; i--){
        scambiaInt(&lista[1], &lista[i+1]);
        adatta(lista, 1, i);
    }
}
```