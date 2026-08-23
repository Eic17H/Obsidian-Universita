---
cssclasses:
  - alf
---
Prerequisiti: <span class="am">[[Triennale/Anno 1/Semestre 1/AM/File/Logica dei predicati|AM]]</span>

## Sintassi

> **==Formula atomica==**: $p^n(t_1,\ldots,t_n)$. Ci dicono cose vere o false sui seguenti.

> **==Arietà==**: quel $p^n$ ha $n$ termini, ed è detto $n$-ario.

Vediamo tre termini fondamentali per la sintassi della logica dei predicati:
* $x$ variabili;
* $c$ costanti;
* $f^n(t_1,\ldots,t_n)$ funzioni.

Questa è solo sintassi, non ha ancora nessuna semantica.

Vediamo poi $0<1+0$. Qui $0$, $1$ e $0$ sono costanti, $+$ è una funzione e $<$ è un ==*predicato*==. Però vediamo che abbiamo scritto $+$ e $<$ come operatori infissi, diverso da come l'abbiamo definito nella semantica poche righe sopra. Riscriviamolo nel modo corretto per la nostra semantica: $$JB^2(0,ADD^2(1,0))$$Che possiamo ricondurre alla forma$$p^2(c,f^2(c,c))$$Ottimo. Adesso, è vera o falsa? Non si può dire in assoluto. Sappiamo che sintatticamente è valida, ma per la semantica, chissà, $JB$ può avere o non avere significato, non è intrinsecamente vera o falsa.

## Semantica

Un modello $\mathbb M = (\mathbb D, \mathbb I)$ dove:
* $\mathbb D$ è un insieme non vuoto detto ==*dominio*==;
* $\mathbb I$ è un'==*interpretazione*== dei nomi di costanti, funzioni e predicati:
	* se $c$ è un nome di costante, allora $c ^ {\mathbb I} \in \mathbb D$;
	* se $f^n$ è un nome di funzione, allora $f ^ {\mathbb I} \in (\mathbb D ^ n \to \mathbb D)$;
	* se $p^n$ è un nome di predicato, allora $p ^ {\mathbb I} \in (\mathbb D ^ n)$.

Adesso userò `questo` per il significato scritto come siamo abituati.

Nel nostro modello $\mathbb M = (\mathbb D, \mathbb I)$:
* $\mathbb D = \{0,1,2,\ldots\}$;
* $0 ^ {\mathbb I}$ = `0`;
* $1 ^ {\mathbb I}$ = `1`;
* $ADD$ è l'addizione tra i numeri naturali $\mathbb N \times \mathbb N \to \mathbb N$;
* $JB$ è la <span class="am">[[Relazioni e funzioni|relazione]]</span> $\{(x,y) \in \mathbb N \times \mathbb N | x<y\}$.

Abbiamo trovato un modello in cui questa formula è vera. Possiamo trovarne uno in cui è falsa? Sì cambiando il significato di $<$ da `<` a `>`.

Ci sono formule che sono vere in tutti i modelli? Sì, scomodiamo la logica proposizionale e scriviamo $p(t) \lor \lnot p(t)$.

### Espansione del dominio

$$\forall x (R(0,x) \to R(x,0))$$

Creiamo un modello in cui è vera.$$\mathbb D = \{5\} \qquad R ^{\mathbb I} = \{(5,5)\} \text{ oppure } R ^{\mathbb I} = \emptyset \qquad 0 ^{\mathbb I} = 5$$
Con $x=5$, che si usi la prima o la seconda definizione di $R^{\mathbb I}$, $R(0,x) \to R(x,0)$ è vera, e visto che $5$ è l'unico valore disponibile nel dominio, vale per ogni valore di $x$, cioè $\forall x$.

Come possiamo renderla falsa? Con l'espansione del dominio. Semplicemente se $\mathbb D = \{5,7\}$, allora esiste $7$ che falsifica $R$, perché... Secondo me manca qualcosa.

### Decidibilità

Come si capisce se è soddisfacibile, insoddisfacibile, una tautologia o una contraddizione? Con la forza bruta, vedi tutte le possibili combinazioni. Computazionalmente <span class="pr1">[[Triennale/Anno 1/Semestre 1/PR1/Modulo I/Complessità|complesso]]</span>.

C'è di meglio? Nella logica proposizionale, sì, ci sono algoritmi. Ma qui non posso provare tutti i modelli, sono infiniti, quindi ***devo*** usare un algoritmo. Spoiler, per la logica dei predicati non esiste questo algoritmo.

I problemi che si possono risolvere con un algoritmo sono un piccolo sottoinsieme.