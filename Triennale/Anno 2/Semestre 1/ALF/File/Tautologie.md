---
cssclasses:
  - alf
---
Una tautologia è un'affermazione sempre vera.

## Linguaggio naturale

Diciamo che ho tre affermazioni:
1. Se Socrate è umano, Socrate è mortale;
2. Socrate è umano;
3. Socrate è mortale.

Posso anche formularli come $U:\text{"Socrate è umano"}$ ed $M:\text{Socrate è mortale}$, ottenendo:
1. $U \to M$;
2. $U$;
3. $M$.

Qui ho un'==*ipotesi*==, formata da $1$ e $2$, e una ==*tesi*==, formata da $3$, e posso scrivere $1 \land 2 \to 3$.

## Linguaggio formale

Voglio <span class="am">[[Dimostrazioni|dimostrare]]</span> che questa formalmente è una tautologia. La riscrivo per intero:$$[(U \to M) \land U] \to M$$Adesso userò delle trasformazioni, delle regole che, se e solo se applicate a una tautologia, risultano in tautologie, e arriverò a una tautologia nota della forma $M \lor \lnot M$, così saprò che quella originale è una tautologia.

$$\begin{matrix*}[l]
[(U \to M) \land U] \to M & \text{Definizione, } p \to q = \lnot p \lor q \\
\lnot [(\lnot U \lor M) \land U] \lor M & \text{De Morgan} \\
[\lnot (\lnot U \lor M) \lor \lnot U] \lor M & \text{De Morgan} \\
[(U \land \lnot M) \lor \lnot U] \lor M & \text{Elemento neutro, distributiva} \\
(U \land \lnot M) \lor (\lnot U \land \lnot M) \lor (\lnot U \land M) \lor (\lnot U \land M) \lor (U \land M) & \text{Uguali} \\
(U \land \lnot M) \lor (\lnot U \land \lnot M) \lor (\lnot U \land M) \lor (U \land M) & \text{Associativa} \\
(U \lor \lnot U) \land \lnot M \lor (U \lor \lnot U) \land M & \text{Elemento neutro} \\
\lnot M \lor M
\end{matrix*}$$
Come volevasi dimostrare.

### Un altro esempio

1. Se Zenone è umano, allora Zenone è mortale;
2. Zenone non è mortale;
3. Zenone non è umano.

## Con le tabelle di verità

Anziché usare una lunga lista di trasformazioni, possiamo semplicemente usare le tabelle di verità dei connettivi logici. Se la colonna del connettivo principale ha solo $1$, allora è una tautologia.

1. Se Pippo ha copiato, allora Pippo era seduto in ultima fila;
2. Pippo era seduto in ultima fila;
3. Pippo ha copiato.

Vediamo che questa non è una tautologia, non è un buon modo di ragionare, è una <span class="logica">[[fallacie|fallacia logica]]</span>.