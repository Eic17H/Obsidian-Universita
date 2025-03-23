## Rappresentazione dell'informazione.

Le grandezze sono relative al mezzo fisico che usiamo: per adesso usiamo gli elettroni.

Rappresentazione analogica: la grandezza rappresentante varia in modo continuo.
Rappresentazione digitale: la grandezza può assumere solo un numero discreto di valori.
La rappresentazione digitale è meno fedele, ma più robusta e affidabile.
Lo è in particolare quella binaria, robusta e affidabile ma con meno potere rappresentativo.
Servono più “slot” nella memoria per avere pari stati diversi.
Se mi servono $x$ valori diversi, mi servono $n$ slot tale che $x<2^n$.

| Siamo partiti con un metodo semplicissimo               | $IIIIIIIIII$ | $IIIII$ | $III$ |
| ------------------------------------------------------- | :----------: | :-----: | :---: |
| **Poi l'abbiamo reso più complicato ma più efficiente** |     $X$      |   $V$   | $III$ |
| **Fino ad arrivare al nostro sistema corrente**         |     $1$      |   $8$   |   <   |

Un sistema è fatto di simboli e regole.
Il nostro sistema numerico ha regole posizionali: il valore di un simbolo cambia a seconda della sua posizione.
Quando la base $B>=2$, le sue cifre vanno da $0$ a $B-1$.
Per esempio, per la base 16, $β=\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}$.

## Conversione tra basi

![[Comune/Cambio di base#Algoritmo di conversione tra basi per i numeri interi|]]

![[Comune/Cambio di base#Conversione di numeri razionali]]