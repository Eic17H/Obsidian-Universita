---
cssclasses:
  - asd
---
[[Heap]]

## Pseudocodice

Adattiamo tutto da destra a sinistra
All'inizio, i due sottoalberi sono foglie, quindi sono già adatti
Dopo, i due sottoalberi sono alberi veri, ma li abbiamo già adattati
Visto che Adatta riadatta solo il sottoalbero in cui è avvenuto lo scambio, è bene che tutti gli altri siano già adatti
Adesso abbiamo un heap
Mettiamo la testa alla fine, e limitiamo lo heap a uno spazio in meno di prima
Adattiamo lo heap
I due sottoalberi della radice sono già adatti, quindi vale la stessa logica di prima
E si ripete

## C

L'ho copiato dall'esercitazione ma mi sembra strano:

```C
void heapSort(int lista[], int n){
    lista--;
    for(int i=n/2; i>=1; i--)
        adatta(lista, i, n);
    for(int i=n-1; i>=1; i--){
        scambiaInt(&lista[1], &lista[i+1]);
        adatta(lista, 1, i);
    }
}
```