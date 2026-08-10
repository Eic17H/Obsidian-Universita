---
cssclasses: pr1
---
## Cos'è il C

Il C fu inventato da D. M. Ritchie.

Ci sono più versioni:

- K&R C: 1978, l’originale di Ritchie;
- ANSI C: 1989, lo standard americano C89;
- ISO C: 1990, lo standard internazionale C90;
- C11: 2011, con multithreading;
- C23: 2023, sconosciuto a quasi tutti, anche ai professori.

Noi useremo il C90.

Il C è un buon linguaggio per un primo approccio alla programmazione.

Caratteristiche del C:
- Paradigma imperativo: un programma è una lista di azioni;
- Accesso a livelli bassi della memoria, allocabile a proprio piacimento;
- Portabile: lo stesso codice funziona su (quasi) tutti i computer;
- Leggero ed efficiente: collegamento veloce al linguaggio macchina.

Pro:
- Facile (simile al linguaggio umano);
- Molto utilizzato;
- Molto supportato;
- Ha influenzato gli altri linguaggi.

Contro:
- Il programmatore ha troppo controllo sul computer, ha troppa libertà, è pericoloso.
- C’è molto rischio di errori sintattici e semantici.

## Creazione di un programma

Un programma in C ha questa struttura:

```C
#include<stdio.h>

int main() {
	// IL TUO CODICE QUI
	return 0;
}
```

Per ora ignoriamo la logica dietro queste componenti.

Quel `//` indica un *commento*: puoi scriverci quello che vuoi e verrà ignorato, quindi non sarà considerato come codice. Un commento si può anche racchiudere tra `/*` e `*/`, e in quel caso continuerà anche se si va a capo.

Il codice è essenzialmente una sequenza di comandi, e `;` segna la fine di un comando. Se non lo si mette alla fine di un comando, il codice non è corretto e non potrà essere usato.

Possiamo scrivere delle operazioni aritmetiche, come `2*3+3-6/2`, che viene interpretato come $2\cdot3+3-6\div2$. Però da solo questo non ci serve a niente. Il modo principale in cui useremo i valori numerici (e non) è tramite *variabili*: dei contenitori che hanno dei nomi. Vediamo come si crea una variabile:

```C
#include<stdio.h>

int main() {
	int a; // Adesso non contiene niente
	a = 6; // Adesso invece contiene 6
	int nomeLungoQuantoVoglio = a*a-2; // Questa contiene 34
	int b, c=3, d=4; // Ne dichiaro tante insieme, e b non contiene niente
	return 0;
}
```

Vediamo che le variabili si creano (*dichiarano*) con il comando `int`, e possono avere un nome. Il nome deve cominciare con una lettera, e può contenere lettere, numeri, e trattini bassi. Con il segno `=` si cambia il valore (il contenuto) di una variabile, e `int` e `=` si possono anche usare insieme.

È buona abitudine dare valori alle variabili appena le si dichiara. Una variabile senza un valore può dare problemi, soprattutto in C, quindi va bene anche un valore temporaneo che non sarà mai usato.

Quelli che chiamo "comandi" sono formalmente detti *keyword*, o *parole chiave*.

In realtà ci sono più [[Tipi primitivi|tipi]] di variabili. Per vedere che ce ne facciamo delle variabili, dobbiamo introdurre il concetto di [[Input e output|input e output]].