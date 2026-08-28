---
cssclasses: pr1
---
Belli i [[Puntatori|puntatori]], belli gli array, ma utilizzi reali? Saranno utili oggi con le locazioni dinamiche.

Finora abbiamo avuto array e matrici di grandezza fissa (recuperare frame e stack dalle #slide). Quando dichiariamo una variabile, allochiamo in maniera statica una posizione di memoria. Si fa in compilazione, fa parte del *data frame*. Possiamo invece allocare *a runtime* in maniera dinamica.

Grazie all'allocazione dinamica possiamo fare strutture finora impossibili.
* **<span class="asd">[[Liste|Liste]]</span>**: blocchi che si comportano come array, ma hanno lunghezza variabile.
* **<span class="asd">[[Alberi|Alberi]]</span>**: complicati.

## Funzioni
### Dimensione

`sizeof(a)` restituisce quanti byte occupa a. `size_t` è un tipo di dato, un intero senza segno. Il risultato di `sizeof()` è di tipo `size_t`. Quando allochiamo, prenderemo spazi di dimensione `size_t` (?).

Un puntatore a `void` è, per ora diciamo, un puntatore di qualsiasi tipo, che poi casteremo.

### Mallocazione

```C
void * malloc(size_t size);
```

La nostra `malloc` (memory allocation) alloca un numero `size` di byte, e restituisce un indirizzo con quella taglia.
Quell'indirizzo non è inizializzato, sta a noi decidere come inizializzarlo.

`int *a = NULL` si fa perché così il compilatore ci impedisce di agire su un indirizzo a cui non dovremmo avere accesso.

`sizeof(int)` restituisce quanti byte prende un int. `malloc(3*sizeof(int))` ci alloca abbastanza spazio per 3 int.

Posso castare, per esempio, `(int *) malloc()` per specificare che sto allocando memoria per un int.

Posso fare questo, certo:

```C
int n=5;
int a[5];
```

Ma questo è uguale, ma potenzialmente dinamico:
```C
int n=5;
int* b = (int*) malloc(n*sieof(int));
```

In questo modo posso leggere `n` da tastiera, che col primo metodo non si potrebbe fare.

Ricorda:
* `b` contiene un indirizzo;
* `malloc()` ci fornisce un indirizzo;
* `5*sizeof(int)` è la grandezza di 5 int;
* `int[5]` ha la grandezza di 5 int.
* `A` ci dà il contenuto di una variabile $A$, `&A` il suo indirizzo e `*A` il contenuto dell'indirizzo puntato da $A$.

#### Fallimento

Per usare `malloc`, devo avere memoria disponibile *contigua* nella quantità richiesta. Se ho organizzato male la memoria, l'allocazione può fallire. Ma non fallisce crashando, fallisce restituendo `NULL`.

Per sicurezza, metto un `if(b==NULL)` per decidere che fare se fallisce. E che faccio? Ovviamente non posso riprovare ad allocare, fallirebbe di nuovo, quindi semplicemente `if(b==NULL) exit(-1)`. Se finisce la memoria c'è poco da fare, posso solo crashare con codice errore. -1 è di solito il codice degli errori.

Proviamo a crashare.
```C
int tantissimo = 100000000000000000000000000000000;
int* crashare = (int *) malloc(tantissimo*sizeof(int));
if(crashare == NULL)
    exit(-1);
```

Per le matrici dobbiamo vedere la versione cattiva della malloc.

### Callocazione

`calloc` è come `malloc`, ma per le matrici. Anziché darci memoria sporca, inizializza a $0$. `calloc(4, 3*sizeof(int))` fa 4 elementi, ciascuno della taglia di 3 int.

Nota che, se fai `calloc(4, sizeof(int))`, stai facendo 4 array, ciascuno con 1 int, ma un array di lunghezza 1 è semplicemente una variabile. Essenzialmente così puoi usare calloc come se fosse malloc, con due differenze:
* Anziché scrivere `n*sizeof(int)` separi i due numeri, così è più leggibile.
* Stai anche pulendo la memoria in una riga, anziché doverlo fare con un `for`.
Ci sono comunque casi dove è megio malloc. Per esempio per una variabile conviene la malloc, tanto fai `sizeof()` anziché `n*sizeof()`.

### Reallocazione

Cugino di `malloc` e `calloc` è `realloc`.

`realloc()` rialloca la memoria, quindi si usa per aggiungere, togliere, e spostare. Sposta il contenuto di un indirizzo a un altro indirizzo (se c'è spazio). Per esempio se ho un array lungo 10, e non mi servono più gli ultimi 5, posso liberare quello spazio, quindi rialloco togliendo gli ultimi 5. Se ho tante variabili sparse per la memoria e mi serve molto spazio contiguo per un array, le rialloco.

`realloc` restituisce un `void*`.

Mantiene lo stesso contenuto. Se allungo l'array, la posizione $0$ mantiene lo stesso valore. Se sposto l'array avanti indietro, da 10 spazi a 5 e poi a 10, potrebbe esserci ancora lo stesso contenuto. Praticamente stai dando il via libera agli altri processi di riscriverci sopra, ma non è detto che lo facciano. È come quando vuoi recuperare i file cancellati.

### ~~Fwionallocazione~~ Liberare la memoria

Eccone un'altra ancora, `fwionalloc`.

No, si chiama `free()`. Se uso `free()` su un indirizzo, sto liberando la memoria lì. Praticamente sto dando anche in questo caso il via libera a scriverci sopra. "Non lo sto più usando, se vi serve è lì".

Se ho preso spazio per 10000000 int, e non mi serve più, mi conviene liberarlo. Non si libera neanche se chiudi il programma altrimenti, solo se dopo un po' qualcos'altro la libera, o se spegni il pc.

```C
if(crashare != NULL)
	free(crashare);
```

Ah e `free` funziona solo sulle cose che ho allocato con `malloc` e `calloc`, non con le cose dichiarate normalmente. Tutte queste funzioni agiscono sulla memoria dell'heap, le variabili normali no.

Liberare non è obbligatorio in C, ma è obbligatorio in PR1, quindi all'esame libera la memoria.

## Allocazione dinamica di matrici

Questa parte non la capisce mai nessuno.

### Metodo delle matrici srotolate

Finora alle subroutine dovevamo passare almeno la seconda dimensione, perché una matrice nella memoria è srotolata.

| Una matrice per noi è così                                    | Ma nella memoria è così |
| ------------------------------------------------------------- | ----------------------- |
| $$\begin{matrix}A&B&C&D&E\\F&G&H&I&J\\K&L&M&N&O\end{matrix}$$ | $ABCDEFGHIJKLMNO$       |

Il modo per lavorarci è scomodo. Concettualizziamola come matrice.
H è a $[1][2]$, ma è anche $[7]$. Cos'è questo $7$? Ci sono $5$ colonne, $7$ è $1\times5+2$. $Y\times C+X$ (posizione Y, numero Colonne, posizione X).

Ora vediamo cosa succede se abbiamo spazi in mezzo. Quelli che non ci servono li segno 0.


| $$\begin{matrix}A&B&C&D&E&0&0&0&0\\F&G&H&I&J&0&0&0&0\\K&L&M&N&O&0&0&0&0\\0&0&0&0&0&0&0&0&0\end{matrix}$$ | $ABCDE0000FGHIJ0000KLMNO0000000000000$ |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------- |

Mi basta cambiare il valore di $C$, e funziona di nuovo.
È per questo che devo passare la seconda dimensione: il numero di righe non compare nella formula. $matrice[i][j]$ e $matrice[i\times C+j]$ sono la stessa cosa se conti, scritta in modo diverso.
Questa è la prima opzione, ma se non la capisci intuitivamente non ne vale tanto la pena.

Vediamo l'altra opzione.

### Metodo dell'altra opzione

Cos'è ogni singola riga, separatamente? Un vettore. Ogni riga è un puntatore di interi quindi. Una matrice $3 \times 3$ è un insieme di $3$ array, ciascuno di lunghezza $3$. Ma possono anche essere tutti in giro a caso questi array. Devo solo essere in grado di trovare ciascuno. Un array cos'è? Un puntatore. E per sapere dov'è un array devo puntare a quell'array.

Mi serve un puntatore... di puntatori. Quindi un array di array. Un array di `int` è di tipo `int*`. E un array di array di `int` è... `int**`.

Se abbiamo i tre array a indirizzo $2348$, $42387$ e $3762$, avremo un altro array che contiene $[2348, 42387, 3762]$. Come posso fare?

```C
int **matrice = NULL;
int r=3, c=2;
matrice = (int**) calloc(r, sizeof(int*));
```

Ah una cosa che confonde.
`matrice` è di tipo `int**`, e `matrice[0]` è di tipo `int*`.
Allo stesso modo, `matrice[0]` è di tipo `int*`, quindi `matrice[0][0]` è `int`.
`array[2]` è equivalente a `*(array+2)`, invece `&(array[2])` è `array+2`.
```C
for(int i=0; i<r; i++){
	matrice[i] = (int*) calloc(c, sizeof(int));
}
```

Avendolo allocato così, visto che le `[]` sono equivalenti a "leggi il contenuto di questo indirizzo",
posso finalmente usare la notazione che già conosco.
```C
for(int i=0; i<r; i++) {
	 for (int j = 0; j < c; j++){
		printf("%3d",matrice[i][j]);
	}
	printf("\n");
}
```
E funziona.

`calloc` le ha inizializzate a $0$, e stamparle con i `for` annidati come al solito funziona.

E si capisce anche meglio del metodo dell'appiattimento.