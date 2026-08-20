---
cssclasses:
  - asd
---
Complessità $O(n^2)$.
## Pseudocodice

* Divido l'array $a$ in "Zona Ordinata" ($ZO$) e "Zona Da Ordinare" ($ZDO$), che sono rispettivamente i primi $n$ elementi dell'array e il resto dell'array;
* $n$ parte da $0$;
* Loop:
	* Guardo la $ZDO$, trovo l'elemento minimo $min_{ZDO}$ e lo scambio con il primo elemento $a[n]$;
	* Incremento $n$;
	* Se la $ZDO$ contiene un solo elemento, ho finito.

Equivalentemente, possiamo pensare al loop come una ricorsione, quindi anziché incrementare $n$ al prossimo loop, chiamiamo la stessa funzione con $n$ aumentato di $1$.

Per esempio:$$\begin{matrix*}[l]
|3471 & \text{il minimo è }1\text{ all'indice }3 & \xrightarrow{\text{scambio}} \phantom{} \\
|1473 & & \xrightarrow{n++} \phantom{} \\
1|473 & \text{il minimo è }3\text{ all'indice }3 & \xrightarrow{\text{scambio}} \phantom{} \\
1|374 & & \xrightarrow{n++} \phantom{} \\
13|74 & \text{il minimo è }4\text{ all'indice }3 & \xrightarrow{\text{scambio}} \phantom{} \\
13|47 & & \xrightarrow{n++} \phantom{} \\
134|7 &  & \phantom{\xrightarrow{\text{scambio}} \phantom{}} \\
\end{matrix*}$$

## C

### Versione iterativa

```C
void selectionSortIterativo(int array[], int dimensione){
    int min;
    for(int i=0; i<dimensione-1; i++){
        // sposta l'inizio della parte da ordinare
        min = i;
        // controlla tutta la parte da ordinare
        for(int j=i; j<dimensione; j++) {
            // se trova un nuovo minimo
            if(array[j] < array[min])
                min = j;
        }
        // scambio
        scambiaInt(&array[min], &array[i]);
    }
}
```

### Versione ricorsiva

```C
void selectionSortRicorsivo(int array[], int dimensione){
    int max=0;
    if(dimensione>1) {
        for (int i = 0; i < dimensione; i++)
            if (array[i] > array[max])
                max = i;
        scambiaInt(&array[max], &array[dimensione-1]);
        selectionSortRicorsivo(array, dimensione - 1);
    }
}
```