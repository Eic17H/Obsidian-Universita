# Grammatica

## Concetto

Regole che determinano come si formano le parole e le frasi sintatticamente corrette. Quindi, un insieme di regole per generare le parole del linguaggio. Cosa significa *generare*?

> **Produzione** - Una *produzione* sull'alfabeto $A$ è una coppia $(\alpha, \beta)$ tale che $α,β \in A^*$ e $α \neq ε$.

Essenzialmente è una relazione su $A^* \times A^*$. Quando troviamo $\alpha$ in una parola, lo sostituiamo (riscriviamo) con $\beta$. La seconda regola ci dice che non possiamo riscrivere la parola vuota. Scriviamo la produzione $(α,β)$ come $α \rightarrow β$.

Noi vedremo solo casi in cui $|α|=1$, quindi riscriviamo un solo simbolo.

## Definizione

> **Grammatica** - Una grammatica su $A$ è la quadrupla $G = (\textbf{V},A,\mathcal{P},\mathcal{S})$, dove:
> * $\textbf{V}$ è un insieme finito di simboli *non terminali*, e $A$ è un insieme finito di simboli *terminali*, tali che $\textbf{V} \cap A = \emptyset$;
> * $\mathcal{P}$ è un insieme di produzioni $α \rightarrow β$ su $\textbf{V} \cup A$ tali che $α \in \textbf{V}$.
> * $\mathcal{S} \in \textbf{V}$ è il simbolo iniziale.

## Esempio

$$G = (\{S\}, \{0,1\},\{S \rightarrow0S0, S\rightarrow1S1,S\rightarrowε\},S)$$
Abbiamo detto che la grammatica si usa per derivare delle parole. Come deriviamo la parola $011110$?
* Dobbiamo partire dal simbolo iniziale, $S$;
* Lo riscriviamo con la prima produzione, $0S0$;
* Poi con la seconda, $01S10$;
* Di nuovo la seconda, $011S110$;
* E poi la terza, $011110$.

E siamo arrivati alla parola che volevamo derivare.

In simboli, possiamo scrivere cose come $0S0 \xrightarrow{S\rightarrow1S1} 01S10$. 

# Derivazione

Abbiamo parlato di [[derivazione]], ma formalmente cos'è?

Nell'esempio abbiamo visto una derivazione con diversi passaggi, possiamo parlare di *passo di derivazione*:

> **Passo di derivazione** - Sia $G = (\textbf{V},A,\mathcal{P},\mathcal{S})$ una grammatica, esista $a \in (\textbf{V} \cup A)^+$. Un passo di derivazione $α \Rightarrow γ$ usando una produzione $V:i \rightarrow a_i$ ha:
> * $α = βV_iδ$, con $β,δ \in (\textbf{V} \cup A)^+$
> * $γ=βα_iδ$

Un sacco di simboli, ma cosa significano? Non sono sicuro, ma credo significhino questo:

> Sia $G$ una grammatica, esista la stringa di simboli $a$. Un passo di derivazione $α \Rightarrow γ$ usando una produzione $V:i \rightarrow a_i$ ha:
> * $α$ che è una stringa di simboli, con $V_i$ in mezzo da qualche parte.
> * $γ$ come $α$ ma con $α_i$ al posto di $V_i$.

È possibile che abbia scritto per sbaglio $a$ anziché $α$.

Vediamo per esempio $0S0 \xrightarrow{S\rightarrow1S1} 01S10$ di prima:
* $α = 0S0 = βVδ$
* $β = 0$
* $V = S$
* $δ = 0$
* $γ = 01S10 = βα_iδ$

Arriviamo quindi al concetto di **derivazione**: una derivazione è la *chiusura riflessiva e transitiva della relazione $\Rightarrow$*.

> **Derivazione di parole** - Sia $G = (\textbf{V},A,\mathcal{P},\mathcal{S})$ una grammatica, esista $a \in (\textbf{V} \cup A)^+$. Deriviamo da $α \in (\textbf{V} \cup A)^+$ la parola $β \in (\textbf{V} \cup A)^+$ se e solo se $α \xRightarrow{*} β$.

Se $α \xRightarrow{*} β$, diciamo che *deriviamo $α$ da $β$*, quindi esiste una sequenza finita di passi che consentono di arrivare da $α$ a $β$ con passi di derivazione successivi.

## Linguaggio generato da una grammatica

Adesso possiamo finalmente collegare i linguaggi e le grammatiche usando questi concetti.

> Sia $G = (\textbf{V},A,\mathcal{P},\mathcal{S})$ una grammatica. Il linguaggio generato da $G$ è l'insieme delle parole composte solo di simboli terminali che si possono derivare da $S$, $\mathcal{L}(G) = \{w \in A^* | S \xRightarrow{*} w\}$.

# Alberi sintattici

## Nozione di albero

Un `.asd` [[ASD/Modulo II/Strutture dati/Alberi|albero]] è un tipo di grafo. Gli alberi sintattici sono un'alternativa alla derivazione.

Definiamo un grafo in termini di LiP:

> **Grafo etichettato** - Un grafo etichettato su insieme di etichette $\mathcal{E}$ è la quadrupla $(V, A, v_{in}, \mathscr{l})$:
> * $X$ è un insieme di vertici;
> * $A \subseteq X \times X$ è un insieme di archi;
> * $v_{in} \in V$ è un vertice designato come *radice*;
> * $\mathscr{l} : V \rightarrow \mathcal{E}$ è una *funzione di etichettatura*, cioè assegna un'etichetta a ogni vertice.

Mi piace come $X$ non compaia nella quadrupla, grazie libro. Credo che $X$ e $V$ siano la stessa cosa.

Quindi definiamo un cammino:

> **Cammino di un albero**: Dato un grafo $(V, A, v_{in}, \mathscr{l})$, un cammino $\rho$ su quel grafo è una sequenza di vertici $v_0, \dots, v_1$ tale che $(v_{n-1}, v_i) \in A \;\;\; \forall 1 \leq i \leq n$.
> Diciamo che $\rho$ parte da $v_0$ e arriva a $v$.

Con queste due nozioni, possiamo definire un albero:

> **Albero** - Il grafo $(V, A, v_{in}, \mathscr{l})$ è un albero se e solo se $\forall v \in V$, $\exists! \rho$ da $v_{in}$ a $v$.

Vediamo qualche termine relativo agli alberi:

> **Nodo interno** - $v$ è un nodo interno se $\exists v' | (v,v') \in A$.
> **Foglia** - $v$ è una foglia se non è un nodo interno.
> **Figlio** - $v'$ è figlio di $v$ se $(v,v') \in A$.
> **Elenco dei figli** - $succ(v) = \{v' | (v,v') \in A\}$. Se $v$ è una foglia, $succ(v) = \emptyset$. L'ordine con cui sono elencati i figli è rilevante.

## Albero sintattico

Orrendo

Ho capito

* quel $<$ strano è un operatore che permette di ordinare i nodi fratelli, e solo i nodi fratelli tra loro, quindi tra due nodi non fratelli non c'è un ordine
* ogni nodo interno ha un'etichetta che è un simbolo non terminale
* le foglie hanno etichette che possono essere simboli terminali o non, o anche $ε$
* per ogni nodo interno, c'è una produzione dal suo simbolo alla concatenazione dei simboli di tutti i suoi figli, l'ordine è stabilito da quel coso