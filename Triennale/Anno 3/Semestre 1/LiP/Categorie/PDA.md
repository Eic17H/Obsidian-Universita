---
cssclasses:
  - lip
---
Push-Down Automaton, automa a pila. Un tipo di automa che fa uso di uno stack.
## Teoria

* [[Triennale/Anno 3/Semestre 1/LiP/Appunti dal libro/Linguaggi|Linguaggi]]
* [[Triennale/Anno 3/Semestre 1/LiP/Appunti dal libro/Automi|Automi]]

## Concetto semplificato

Questo esercizio appare come variante di quello con le [[Triennale/Anno 3/Semestre 1/LiP/Categorie/Linguaggi|grammatiche]].

Non puoi codificare $0^n1^n$ con un automa a stati finiti, perché quando hai finito con gli $0$ devi ricordarti quanti ne hai messi quando poi cominci a mettere gli $1$. Un numero finito di stati non basta, e un FSA non ha altri modi di "ricordare".

Una semplice aggiunta che risolve questo problema è una <span class="asd">[[Triennale/Anno 1/Semestre 2/ASD/New/Stack|pila]]</span>. Concettualmente, ogni volta che metto $0$ pusho qualcosa, che poi poppo quando devo mettere gli $1$, così sono nella stessa quantità.

## Formalità

Un PDA è una settupla $P(Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$, dove:
* $Q$ è un insieme finito di stati;
* $\Sigma$ è un insieme finito di simboli, l'alfabeto d'input;
* $\Gamma$ è un insieme finito di simboli, l'alfabeto della pila;
* $\delta$ è la funzione di transizione:
	* in simboli orrendi, $Q \times (\Sigma \cup \{ε\}) \times \Gamma \to 2^{Q \times \Gamma^*}$;
	* prende in input uno stato, un simbolo d'input e un simbolo della pila;
	* restituisce un insieme di coppie, il cui primo elemento è preso da $Q$ e il secondo è una parola di $\Gamma$;
* $q_0$ è lo stato iniziale ed è in $Q$;
* $Z_0$ è il simbolo iniziale sulla pila ed è in $\Gamma$;
* $F$ è l'insieme degli stati finiti, $F \subseteq Q$.

$\Sigma$ e $\Gamma$ possono avere elementi in comune. Inoltre, se vedi $\delta$, i PDA non sono deterministici.

Ad ogni passaggio, leggo un simbolo e la cima della pila, consumo il simbolo (?) e modifico la pila (boh forse credo boh).