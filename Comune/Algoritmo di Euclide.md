## Puglisi

* Input: due numeri naturali
* Output: il loro MCD
La divisione di Euclide ha due input naturali $a,b$ e due output naturali: quoziente e resto.
Il resto è sempre compreso tra $0$ e $b$.

Calcolando l'MCD di 20 e 24 per enumerazione (come alle elementari) otteniamo:
* $D20 = \{1, 2, 4, 5, 10, 20\}$
* $D24 = \{1, 2, 3, 4, 6, 8, 12, 24\}$
* In comune: $\{1, 2, 4\}$
* Maggiore: $4$
Ma è un processo lento.
Alle medie impariamo un algoritmo:
* $20 = 2²·5$
* $24 = 2³·3$
* Fattori comuni: $2$, minor esponente: $2$
* $2² = 4$
Ma anche questo è comunque molto inefficiente per i numeri molto grandi.

Euclide ha ideato un algoritmo che non usa la scomposizione in fattori:
* Dati i numeri naturali $a$ e $b$;
* Se $a<b$, scambiali;
* Se $a\%b=0$, il risultato è $b$;
* Altrimenti, $a$ prende il valore di $b$, $b$ prende il valore di $a\%b$ e si ricomincia.
Sappiamo se converge? Cioè, sappiamo se termina?
$0<r<b$, sempre. Ma visto che il nuovo $b$ è il vecchio $r$, $b$ diminuisce sempre, e così anche $r$. Una serie di naturali che diminuisce sempre prima o poi converge a $0$.

Bene, adesso sappiamo che dà sempre una risposta.
La risposta è giusta? Non lo sappiamo ancora. Come facciamo a scoprirlo?
Boh, non ci ho capito nulla.

## Scateni

Massimo Comun Divisore: il metodo più semplice consiste nell’enumerare tutti i divisori del primo numero, tutti quelli del secondo, trovarne l’intersezione, e poi cercare lì il maggiore.  
Questo è un metodo di tipo bruteforce, a forza bruta.  
Funziona perché l’intersezione non è mai un insieme vuoto, contiene sempre 1.  
I metodi bruteforce sono spesso molto lenti e inefficienti, e sono la soluzione in casi disperati, o in certi casi specifici. ^ba1718

Un metodo più efficiente è l’algoritmo di Euclide. È un algoritmo in quanto:  
Ha un numero finito di passi;  
È scritto in un linguaggio univoco, quello della matematica;  
Ogni passo si svolge in un tempo finito.  
Termina perché dopo ogni passo, si ottiene un valore strettamente minore del precedente, e lavoriamo con i numeri naturali. Tutte le serie discendenti di numeri naturali prima o poi terminano: non puoi scendere per sempre nei numeri interi senza andare sotto 0.  
Otteniamo la risposta giusta? Non lo sappiamo, ma almeno sappiamo che termina sempre. ^dd4752