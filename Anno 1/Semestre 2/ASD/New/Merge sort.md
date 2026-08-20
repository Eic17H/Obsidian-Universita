---
cssclasses:
  - asd
---
Facciamo utilizzo dell'algoritmo di [[merge]], in particolare della sua proprietà della preservazione dell'ordinatezza delle liste. Facciamo anche uso del fatto che una lista che ha un solo elemento è sempre ordinata.

Fondendo due liste di lunghezza $1$, otteniamo una lista ordinata di lunghezza $2$. Continuando, otteniamo una lista di lunghezza $4$, $8$, arbitrariamente lunga.

Prendiamo una lista qualunque. La separiamo in due liste. Ordiniamo le due liste separatamente, e e poi le fondiamo. La scelta più ovvia è di ordinare anche le due sottoliste con il mergesort. Questa è una definizione ricorsiva, e il caso base è, ovviamente, il caso in cui la lista da ordinare è di lunghezza $1$, nel cui caso restituiamo la lista senza nessun cambiamento.

Complessità $O(n\log n)$.
## Pseudocodice
* Data una lista $l$ di lunghezza $n$;
* Se $n=1$:
	* Rendi $l$ così com'è;
* Dato $m=floor\left(\dfrac n 2 \right)$;
* $l_a=MergeSort(l[0:m])$;
* $l_b=MergeSort(l[m+1:n])$;
* $l=merge(l_a,l_b)$;
* Rendi $l$.

## C

L'ordinamento avviene in-place, quindi non dichiariamo $l_a$ ed $l_b$ e non rendiamo niente.

Oltre ad avere `upper` come equivalente di $n$, abbiamo anche `lower` se non vogliamo partire da $0$ (e ce n'è bisogno visto che è in-place). Nell'utilizzo normale (quindi non ricorsivo), `lower` sarà $0$ ed `upper` sarà $n-1$.

```C
void mergeSort(int lista[], int ordinata[], int lower, int upper){
    if(lower>=upper)
        return;
    int medium = (lower+upper)/2;
    mergeSort(lista, ordinata, lower, medium);
    mergeSort(lista, ordinata, medium+1, upper);
    merge(lista, ordinata, lower, medium, upper);
}
```