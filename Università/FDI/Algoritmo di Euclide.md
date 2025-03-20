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