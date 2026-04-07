---
cssclasses:
  - lip
aliases:
---
Per riconoscere un linguaggio regolare si usa un **automa a stati finiti** (FA, finite automaton). Questi si dividono in *deterministici* (DFA) e *non-deterministici* (NFA).

## DFA

> Un **automa a stati finiti deterministico** è una quintupla $\mathcal{A}=(Q,A,\delta,q_0,F)$

Dove:
* $Q$ è un insieme finito di stati;
* $A$ è un alfabeto;
* $\delta$ è la funzione di transizione, $Q \times A \rightarrow Q$;
* $q_0 \in Q$ è lo stato iniziale;
* $F \subseteq Q$ è l'insieme degli stati finali.

L'automa ha anche un nastro di input. Se lo stato corrente è $q$ e il prossimo input è $a \in A$, l'automa passa allo stato $q' = \delta(q,a)$ e il nastro passa al prossimo simbolo.

L'automa determina che l'input appartiene al linguaggio se lo stato raggiunto alla fine dell'input è in $F$.

Estendiamo dunque $\delta$ in $\delta^*$, con dominio $Q \times A^*$, in modo ricorsivo:
* Passo base: $\delta^*(q,ε) = q$
* Passo ricorsivo: $\delta^*(q, aw) = \delta^*(\delta(q,a),w)$

$\delta^*(q,w)$ quindi sarebbe lo stato a cui arrivi se applichi a $\delta$ su $q$ e il primo simbolo di $w$, poi al risultato e al secondo simbolo e così via finché non finisci i simboli.

> Il **linguaggio $\mathcal{L}$ accettato dal DFA $\mathcal{A}$** è $\{w \in A^* | \delta^*(q_0,w) \in F\}$, l'insieme delle parole che sono input validi di $A$, cioè che portano l'automa a uno stato finale.

## NFA

> Un **automa a stati finiti non-deterministico** è una quintupla $\mathcal{A}=(Q,A,\delta,q_0,F)$

Dove:
* $Q$ è un insieme finito di stati;
* $A$ è un alfabeto;
* $\delta$ è la funzione di transizione, $Q \times A \rightarrow 2^Q$, dove $2^Q$ è l'insieme delle parti (insieme dei sottoinsiemi) di $Q$;
* $q_0 \in Q$ è lo stato iniziale;
* $F \subseteq Q$ è l'insieme degli stati finali.

Vediamo che $\delta$ è cambiata. Infatti adesso ci dice in *quali* stati si *può* andare dallo stato $q$ con input $a$, il suo output è un insieme di stati, mentre prima ogni coppia $(q,a)$ aveva un solo stato di arrivo. Quindi cambia anche $\delta^*$:
* $\delta^*(q,ε)=\{q\}$
* $\delta^*(q,aw) = \bigcup\limits_{q' \in \delta(q,a)} \delta^*(q',w)$
Vediamo poi il linguaggio:

> Il **linguaggio $\mathcal{L}$ accettato dall'NFA $\mathcal{A}$** è $\{w \in A^* | \delta^*(q_0,w) \cap F \neq \emptyset\}$, l'insieme delle parole che portano l'automa ad *almeno uno* stato finale.

Inoltre,

> Per ogni NFA $\mathcal{A}$, esiste un DFA $\mathcal{A}'$ tale che $\mathcal{L}(\mathcal{A}) = \mathcal{L}(\mathcal{A}')$, e $\mathcal{A}'$ è costruibile da $\mathcal{A}$.

Vediamo come dimostrarlo.

* Partiamo dall'NFA $\mathcal{A} = (Q,A,δ,q_0,F)$.
* Troviamo i componenti del DFA equivalente:
	* L'insieme di stati è $2^Q$, quindi ciascuno stato del DFA è un insieme di stati dell'NFA;
	* L'alfabeto $A$ rimane uguale;
	* La funzione di transizione, che chiamiamo $\hat{δ}$, ha come output degli stati del DFA, che sono insiemi di stati dell'NFA. E gli output di $\delta$ sono proprio insiemi di stati. $\hat{\delta}(X,a) = \bigcup\limits_{q \in X} \delta(q,a)$, cioè porta dall'insieme di stati $X$ e dal simbolo $a$ all'insieme di tutti gli stati $q$ raggiungibili a partire dagli stati contenuti dentro $X$ leggendo $a$ in input;
	* Lo stato iniziale per qualche motivo nel libro diventa un insieme, $\{q_0\}$, non ho capito;
	* L'insieme degli stati finali, $\hat{F}$, è l'insieme di tutti gli $X \subseteq Q$ che sono stati finali validi dell'NFA, cioè hanno almeno un elemento in comune con $F$, e appunto $X$ è un insieme di stati dell'NFA, e quindi è uno stato del DFA, quindi $\hat{F}$ è un insieme di stati del DFA, che è ciò che deve essere. $\hat{F} = \{X \subseteq Q | (X \cap F) \neq \emptyset\}$.

Nel libro c'è anche una frase interessante, "il non-determinismo non aggiunge potere espressivo".

## Espressioni regolari

Come si collegano gli FA alle [[espressioni regolari]]? Con un teorema e un corollario.

> Sia $r$ un'e.r., sia $L(r)$ il linguaggio associato. Esiste un DFA $\mathcal{A}$ tale che $\mathcal{L}(\mathcal{A})=L(r)$.

> Sia $\mathcal{A}$ un DFA, sia $\mathcal{L}(\mathcal{A})$ il linguaggio associato. Esiste un'e.r. $r$ tale che $\mathcal{L}(\mathcal{A})=L(r)$.

Per esempio:$$\mathcal{L} = \{w \in 0,1^* | w \text{ termina con } 1\} = \{0,1\}^* \cdot \{1\}$$Cerchiamo un'e.r. che descriva questo linguaggio. Proviamo con $r = (0|1)^*1$. Usiamo le proprietà per vedere se corrispondono.

* $L((0|1)^*1)$
* $L((0|1)^*) \cdot L(1)$
* $(L(0) \cup L(1))^* \cdot L(1)$
* $(L(0)^* \cup L(1)^*) \cdot L(1)$
* $(\{0\}^* \cup \{1\}^*) \cdot \{1\}$
* $\{0,1\}^* \cdot \{1\}$

Quindi l'uguaglianza è vera. Il DFA che descrive il linguaggio ha questa funzione di transizione:
* $\delta(q_0,0)=q_0$
* $\delta(q_0,1)=q_1$
* $\delta(q_1,0)=q_0$
* $\delta(q_1,1)=q_1$

## Pallogrammi

C'è un modo migliore per rappresentare i DFA? Sì. Il ritorno dei pallogrammi. Quello dell'esempio si rappresenta così:

`.invert`

![[Pasted image 20260404115105.png]]
