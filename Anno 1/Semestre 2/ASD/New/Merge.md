---
cssclasses:
  - asd
---
Un algoritmo che, date due [[Liste ordinate|liste ordinate]], restituisce una lista ordinata i cui elementi sono l'<span class="am">[[Teoria degli Insiemi#Unione|unione insiemistica]]</span> delle altre due liste.

Trattiamo le liste come [[Code|code]]: confrontiamo le teste delle due liste in input, rimuoviamo l'elemento minore tra i due e lo aggiungiamo alla lista in output. Quando una delle due liste è vuota, non c'è più bisogno di fare confronti, quindi mettiamo tutti gli elementi dell'altra lista in quella in output.

## Pseudocodice

* Abbiamo una lista $l$ di lunghezza $m$, e una lista $r$ di lunghezza $n$;
* Inizializziamo una lista $o$ vuota di lunghezza $m+n$, che conterrà la fusione di $l$ ed $r$;
* Inizializziamo gli indici $i$, $j$ e $k$ a $0$;
* Finché $i<m \land j<n$:
	* Se $l[i]<r[j]$, prendiamo l'elemento da $l$:
		* $o[k]=l[i]$;
		* $i++$;
		* $k++$;
	* Altrimenti, prendiamo l'elemento da $r$:
		* $o[k]=r[j]$;
		* $j++$;
		* $k++$;
* Poi,
* Se $i>m$ vuole dire che $l$ è vuota:
	* Con $t$ che va da $j$ a $n$:
		* $o[k+t-j]=r[t]$
* Altrimenti $r$ è vuota:
	* Con $t$ che va da $i$ a $m$:
		* $o[k+t-i]=l[t]$

## C

Questa implementazione è un po' diversa dallo pseudocodice, perché riceve le due liste in input come un singolo array di lunghezza $m+n$, i cui primi $m$ elementi sono gli elementi di $l$ e i successivi $n$ sono gli elementi di $r$.

Inoltre, permette di non partire dal primo elemento dell'array in input, ma di specificarlo tramite il parametro `i`.

Il secondo array viene trattato solo come array di supporto, e gli elementi ordinati sono ricopiati nell'array originale.

```C
void merge(int lista[], int ordinata[], int i, int m, int n){
    int j = m+1;
    int k = i;
    int posIniz = i;

    while(i<=m && j<=n){
        if(lista[i] <= lista[j]){
            ordinata[k] = lista[i];
            i++;
            k++;
        }else{
            ordinata[k] = lista[j];
            j++;
            k++;
        }
    }

    if(i>m)
        for(int t=j; t<=n; t++)
            ordinata[k+t-j] = lista[t];
    else
        for(int t=i; t<=m; t++)
            ordinata[k+t-i] = lista[t];

    for(int t=posIniz; t<=n; t++)
        lista[t] = ordinata[t];
}
```