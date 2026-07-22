---
cssclasses:
  - lip
---
Lo stesso argomento: <span class="alf">[[Anno 2/Semestre 1/ALF/File/Regex|ALF]]</span>, <span class="so">[[Anno 2/Semestre 1/SO/Lab/Regex|SO]]</span>

## Definizione

Consideriamo un alfabeto $A$. Ad ogni simbolo $a \in A$ associamo $\underline{a}$. Definiamo quindi per induzione un'espressione regolare (e.r.) su $A$:
1) $\underline{\emptyset}$, $\underline{ε}$ e $\underline{a}$ con $a \in A$ sono e.r.;
2) Se $r_1$ ed $r_2$ sono e.r., allora lo sono $r_1+r_2$ ed $r_1 \cdot r_2$;
3) Se $r$ è un'e.r. allora $r^*$ ed $(r)$ sono e.r..

C'è una notazione per scrivere queste regole, la *Backus-Naur Form*, BNF:$$r::= \underline{\emptyset} \;|\; \underline{ε} \;|\; \underline{a} \;|\; r+r \;|\; r \cdot r \;|\; (r)$$Con $A = \{0,1\}$, $(\underline{0} \cdot \underline{1} + \underline{0})^* \cdot 1$ è un'e.r. che rappresenta una stringa che comincia con $0$ e può contenere $1$ solo se si trovano alla fine della stringa o preceduti da uno $0$.

Solitamente si omettono il $\cdot$ e la sottolineatura.

## Linguaggio associato

Possiamo definire, ancora per induzione, un ***linguaggio associato*** a un'e.r.:
1) $\mathcal{L}(\emptyset) = \emptyset$
2) $\mathcal{L}(ε) = \{ε\}$
3) $\mathcal{L}(a) = \{a\}$
4) $\mathcal{L}(r_1+r_2) = \mathcal{L}(r_1) \cup \mathcal{L}(r_2)$
5) $\mathcal{L}(r_1 \cdot r_2) = \mathcal{L}(r_1) \cdot \mathcal{L}(r_2)$
6) $\mathcal{L}(r^*) = \mathcal{L}(r)^*$
7) $\mathcal{L}((r)) = \mathcal{L}(r)$

Per esempio:
* $\mathcal{L}((0+1)^*)$
* 6: $\mathcal{L}(0+1)^*$
* 4: $(\mathcal{L}(0) \cup \mathcal{L}(1))^*$
* 3: $(\{0\} \cup \{1\})^* = \{0,1\}^*$

> Un linguaggio $\mathcal{L}$ è un ***linguaggio regolare*** se esiste un'e.r. $r$ tale che $\mathcal{L}(r) = \mathcal{L}$.

Un linguaggio regolare potrebbe essere associato a più di un'espressione regolare, e in tal caso quelle espressioni regolari sono ***equivalenti***.

## Equivalenza

> Due espressioni regolari $r$ ed $r'$ sono ***equivalenti*** se rappresentano lo stesso linguaggio, quindi $\mathcal{L}(r) = \mathcal{L}(r')$. Questo si indica con $r \equiv r'$.

Ecco alcune equivalenze note:

* $r+r \equiv r$
* $r_1 + r_2 \equiv r_2 + r_1$
* $r_1 + (r_2 + r_3) \equiv (r_1 + r_2) + r_3$
* $r_1 \cdot (r_2 \cdot r_3) \equiv (r_1 \cdot r_2) \cdot r_3$
* $r_1 \cdot (r_2 + r_3) \equiv r_1 \cdot r_2 + r_1 \cdot r_3$
* $r + \underline{\emptyset} \equiv r$
* $r + \underline{ε} \equiv r$
* $\underline{ε}r \equiv r$
* $r \cdot \underline{\emptyset} \equiv \underline{\emptyset}$
* $\underline{\emptyset} \cdot r \equiv \underline{\emptyset}$
* $(r^*)^* \equiv r^*$
* Se $\mathcal{L}(r) \subseteq \mathcal{L}(r')$, $r + r' \equiv r'$

