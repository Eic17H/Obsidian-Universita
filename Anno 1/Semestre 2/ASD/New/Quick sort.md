---
cssclasses:
  - asd
---
In media, ha complessità $O(n\log n)$. Nel caso in cui si scelga un perno particolarmente sfavorevole che è l'elemento minimo dell'array, $O(n^2)$.
## Pseudocodice

È ricorsivo, e il caso base è quello in cui l'array è lungo $1$, nel cui caso è già ordinato.

* Data la lista $l$ di lunghezza $n$;
* Dato $q$ che è il perno di $l$ (vedi sotto);
* Se $l[0:q-1]$ ha più di $1$ elemento, ordinalo con quick sort;
* Se $l[q+1:n]$ ha più di $1$ elemento, ordinalo con quick sort.
### Perno

Preso come *pivot* o *perno* un elemento dell'array (nel nostro caso il primo), vogliamo metterlo al centro, e mettere alla sua sinistra tutti gli elementi minori di lui (in qualunque ordine), e lo stesso a destra per gli elementi maggiori.

* Data la lista $l$ di lunghezza $n$;
* Dati $i$ e $j$ inizializzati a $0$ ed $n$;
* Finché $i<j$:
	* $i$ si sposta a destra finché non trova un elemento maggiore di $l[0]$;
	* $j$ si sposta a sinistra finché non trova un elemento minore di $l[0]$;
	* Si scambiano i due elementi (che sono entrambi fuori posto);
* Ora $j$ è al centro e sta puntando un elemento minore di $l[0]$, scambiamo $l[0]$ con $l[j]$ per mettere il pivot al centro.
* Rendi $j$.
## C

```C
void quickSort(int array[], int u, int v){
    if(u==v)
        return;
    int q = perno(array, u, v);
    if(u<q)
        quickSort(array, u, q-1);
    if(q<v)
        quickSort(array, q+1, v);
}

int perno(int array[], int primo, int ultimo){
    int i = primo; // Limite sinistro
    int j = ultimo+1; // Limite destro
    int pivot = array[primo]; // Elemento che cerchiamo
    while(i<j){
	    // Cerchiamo un elemento da portare da sinistra a destra
        do i++; while(array[i]<=pivot);
        // Cerchiamo un elemento da portare da destra a sinistra
        do j--; while(array[j]>pivot);
        // Se abbiamo trovato entrambi, li scambiamo
        if(i<j) scambiaInt(&array[i], &array[j]);
    }
    // Mettiamo il pivot al centro
    scambiaInt(&array[primo], &array[j]);
    return j;
}
```