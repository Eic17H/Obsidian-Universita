# Concetto

Regole che determinano come si formano le parole e le frasi sintatticamente corrette. Quindi, un insieme di regole per generare le parole del linguaggio. Cosa significa *generare*?

> **Produzione** - Una *produzione* sull'alfabeto $A$ è una coppia $(\alpha, \beta)$ tale che $α,β \in A^*$ e $α \neq ε$.

Essenzialmente è una relazione su $A^* \times A^*$. Quando troviamo $\alpha$ in una parola, lo sostituiamo (riscriviamo) con $\beta$. La seconda regola ci dice che non possiamo riscrivere la parola vuota. Scriviamo la produzione $(α,β)$ come $α \rightarrow β$.

Noi vedremo solo casi in cui $|α|=1$, quindi riscriviamo un solo simbolo.

# Definizione

> **Grammatica** - Una grammatica su $A$ è la quadrupla $G = (\textbf{V},A,\mathcal{P},\mathcal{S})$, dove:
> * $\textbf{V}$ è un insieme finito di simboli *non terminali*, e $A$ è un insieme finito di simboli *terminali*, tali che $\textbf{V} \cap A = \emptyset$;
> * $\mathcal{P}$ è un insieme di produzioni $α \rightarrow β$ su $\textbf{V} \cup A$ tali che $α \in \textbf{V}$.
> * $\mathcal{S} \in \textbf{V}$ è il simbolo iniziale.

# Esempio

$$G = (\{S\}, \{0,1\},\{S \rightarrow0S0, S\rightarrow1S1,S\rightarrowε\},S)$$
Abbiamo detto che la grammatica si usa per derivare delle parole. Come deriviamo la parola $011110$?
* Dobbiamo partire dal simbolo iniziale, $S$;
* Lo riscriviamo con la prima produzione, $0S0$;
* Poi con la seconda, $01S10$;
* Di nuovo la seconda, $011S110$;
* E poi la terza, $011110$.

E siamo arrivati alla parola che volevamo derivare.

In simboli, possiamo scrivere cose come $0S0 \xrightarrow{S\rightarrow1S1} 01S10$. 

C'è scritta una cosa incomprensibile nel libro, mi fermo qui per ora.