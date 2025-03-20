## Rappresentazione dell'informazione.

Le grandezze sono relative al mezzo fisico che usiamo: per adesso usiamo gli elettroni.

Rappresentazione analogica: la grandezza rappresentante varia in modo continuo.
Rappresentazione digitale: la grandezza può assumere solo un numero discreto di valori.
La rappresentazione digitale è meno fedele, ma più robusta e affidabile.
Lo è in particolare quella binaria, robusta e affidabile ma con meno potere rappresentativo.
Servono più “slot” nella memoria per avere pari stati diversi.
Se mi servono x valori diversi, mi servono n slot tale che x<2^n.

| Siamo partiti con un metodo semplicissimo               | $IIIIIIIIII$ | $IIIII$ | $III$ |
| ------------------------------------------------------- | :----------: | :-----: | :---: |
| **Poi l'abbiamo reso più complicato ma più efficiente** |     $X$      |   $V$   | $III$ |
| **Fino ad arrivare al nostro sistema corrente**         |     $1$      |   $8$   |   <   |

Un sistema è fatto di simboli e regole.
Il nostro sistema numerico ha regole posizionali: il valore di un simbolo cambia a seconda della sua posizione.
Quando la base $B>=2$, le sue cifre vanno da $0$ a $B-1$.
Per esempio, per la base 16, $β=\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}$.

## Algoritmo di conversione tra basi per i numeri interi

Dato un numero $n$, e una base $B$;
Fai $n/B$;
Ti segni il resto;
Il risultato è il nuovo $n$;
Ricominci finché il risultato non è $0$.
I resti, in ordine inverso, sono le cifre del numero convertito.
Così come le cifre vanno da $0$ a $B-1$, anche i resti vanno da $0$ a $B-1$.

## Conversione di numeri razionali

$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ···$, se è una serie finita, sarà sempre minore di $1$.
Può essere maggiore di $1$ solo se è $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ···$, cioè se la cifra delle unità in binario è $1$ e non $0$.
Ed è proprio la successione di cifre che cerchiamo.
Quindi possiamo controllare la cifra delle unità, poi cambiare qual è quella delle unità.
L'algoritmo che segue da questa logica è:
* Considero solo la parte decimale;
* Moltiplico per 2;
* Se è maggiore di 1, la cifra è 1, altrimenti è 0;
* Ricomincio finché il numero non è 0.
Appunto, non tutti terminano.
$0,78125_{10} = 0,1101_2; 0,9_{10} = 0,1(1100)_2$.