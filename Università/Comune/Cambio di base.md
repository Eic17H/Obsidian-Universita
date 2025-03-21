## Puglisi

### Algoritmo di conversione tra basi per i numeri interi

Dato un numero $n$, e una base $B$;
Fai $n/B$;
Ti segni il resto;
Il risultato è il nuovo $n$;
Ricominci finché il risultato non è $0$.
I resti, in ordine inverso, sono le cifre del numero convertito.
Così come le cifre vanno da $0$ a $B-1$, anche i resti vanno da $0$ a $B-1$.

### Conversione di numeri razionali

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
## Mossa
#finire
Una domanda sarà su questo.

Stessa cosa già vista con Puglisi.

Per convertire in base 10, moltiplica ogni cifra per una potenza della base, poi somma.
ABC,DEF11 = A×112 + B×11 + C + D×11-1 + E×11-2 + F×11-3.

Per convertire dalla base 10, ci vogliono più passaggi.
Separa la parte intera da quella decimale.
Dividi la parte intera per la nuova base, ripetutamente.
Il resto ottenuto ogni volta è una cifra, si parte dalle unità.
Il quoziente intero è il nuovo numero che sarà diviso.
Continua finché non arrivi a 0.
La parte decimale, che sarà qualcosa del tipo “0,32776”, va invece moltiplicata.
La nuova cifra delle unità, anche se è 0, è la prossima cifra nella sequenza.
Se non è 0, rendila 0 prima di continuare.
Continua finché non hai le cifre richieste o non arrivi a 0.

Esempio:

15,4375 in base 2:

15/2 = 7r1
7/2 = 3r1
3/2 = 1r1
1/2 = 0r1

0,4375×2 = 0,8750
0,8759×2 = 1,750
0,75×2 = 1,50
0,5×2 = 1,0

1111,0111