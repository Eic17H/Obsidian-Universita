---
cssclasses: am
---
Lo stesso argomento: <span class="alf">[[Insiemi|ALF]]</span>

Se e come insiemi di diversi interi possono essere legati tra loro.

Definizione di Cantor: vedi #slide 

Una cosa non è un insieme se non si può determinare se un elemento ne fa parte: deve essere ==oggettivo==.

Indichiamo gli insiemi con le lettere maiuscole $A,B,C,\mathbb N, \mathbb Q$ e gli elementi con le lettere minuscole $a,b,c,i,m,n$.

Possiamo definire un insieme in due modi:
* Definizione ==intensiva==: $A=\{\mathbb N \text{ dispari e }<4\}$;
* Definizione ==estensiva==: $A=\{1,3\}$;
* Grafica: diagramma di Eulero-Venn.

Non per forza gli elementi hanno un nesso logico.

Vediamo una definizione intensiva: l'insieme degli alpini morti nella campagna di Russia. È definito, finito, ma è indecidibile, non so quali siano gli elementi, non ho gli strumenti necessari per saperlo. (Vedi anche <span class="logica">[[Filosofia del linguaggio|senso e significato]]</span>).

Vediamo un altro caso: $D=\{\text{soluzioni di }x^8+x^6+x-3=0\}$, è decidibile ma non c'è un algoritmo.

Gli elementi sono distinti, quindi non si ripetono. Un insieme, per esempio, $\{1,1\}$ è in realtà $\{1\}$ semplicemente.

Gli insiemi possono avere qualunque tipo di elemento, potremmo avere insiemi di nomi, insiemi di forme, insiemi di insiemi. Noi però vedremo perlopiù insiemi di numeri, e insiemi di insiemi di numeri. Vedi infatti anche gli [[Insiemi numerici]].

Per indicare che un elemento $a$ è contenuto in un insieme $A$, scriviamo $a \in A$.

## Insieme vuoto

$$\emptyset=\{x\ |\ x\in A \land x \notin A\}$$
Guardiamo la parte a destra. Se prendiamo $p=x\in A$, allora lì abbiamo $p\land\lnot p$, che secondo il principio di non contraddizione è sempre falso, quindi l'insieme vuoto non ha elementi.

Si può definire anche in altri modi: $$\emptyset = \{\mathbb N \text{ dispari e}<1\}, \qquad \{\}$$Un insieme vuoto è comunque un insieme che può esistere. Uno zaino vuoto non smette di esistere solo perché è vuoto.
## Operatori

## Unari

#### Cardinalità

La cardinalità di $A$, scritta come $|A|$, è il numero degli elementi (distinti) di $A$.

Visto che è vuoto, $|\emptyset|=0$.

#### Insieme delle parti

Questa è complicata. Insieme dei sottoinsiemi di un insieme. Eh? Prendi un insieme, prendi tutti i sottoinsiemi (propri e impropri) possibili di quell'insieme, e crei un insieme i cui elementi sono tutti quegli insiemi. È un operatore unario. $$\mathcal P(A)=\{B\ |\ B \subseteq A\}$$
Facciamo un esempio. $$A=\{1,2\}\qquad\mathcal P = \{\emptyset, \{1\},\{2\},\{1,2\}\}$$
Per un paragone con certi linguaggi di programmazione, se $A$ ha elementi di tipo `int`, $\mathcal P(A)$ è di tipo `int[][]`, o `list<list<int>>`.

Non vediamo la dimostrazione, se ci pensi diventa un minimo ovvio, ma $|\mathcal P(A)| = 2^{|A|}$. Per una spiegazione un po' intuitiva, per ogni sottoinsieme, ciascun elemento di $A$ può esserci o non esserci, quindi sono due opzioni per ciascun elemento, cioè ogni elemento raddoppia il numero di sottoinsiemi.

### Binari booleani

#### Uguaglianza

$$A=B\leftrightarrow\forall x,(x\in A \leftrightarrow x \in B)$$
Due insiemi sono uguali se hanno gli stessi elementi. Cioè se un elemento è in $A$, è anche in $B$, e se è in $B$, è anche in $A$.

#### Sottoinsiemi

Vediamo i sottoinsiemi impropri:
$$A\subseteq B \leftrightarrow \forall x,(x \in A \rightarrow x \in B)$$
E poi vediamo quelli propri che hanno due condizioni in più:$$A\subset B \leftrightarrow \forall x,(x \in A \rightarrow x \in B)\ \land\ \exists x \ | \ (x \in B \land x \notin A) \ \land \ A\neq\emptyset$$
Tutti gli elementi di $A$ sono anche in $B$. Nel solo caso dei sottoinsiemi propri, c'è almeno un elemento che è in $B$ ma non in $A$, e $A$ non può essere vuoto. Necessariamente: $$A\subset B \rightarrow |A|<|B| \qquad A\subseteq B \rightarrow |A|\leq|B|$$
Inoltre, dati i criteri: $$\forall B, \ \emptyset \subseteq B \ \land \ B \subseteq B$$
### Binari da insiemi a insiemi

#### Unione

Possiamo vederla come la "somma" di due insiemi. La indichiamo con $A \cup B$ e contiene tutti gli elementi di $A$ e tutti gli elementi di $B$, inclusi quelli in comune.$$A\cup B=\{x\ |\ x \in A \ \lor \ x \in B\}$$
Nota come c'è $\lor$, cioè il connettivo ==*o*==. Immaginiamo che ==*e*== unisca e ==*o*== separi, ma il concetto di unione usa il connettivo ==*o*==. Può essere un po' controintuitivo ma basta abituarsi.

Per quanto riguarda la cardinalità, $|A \cup B| \leq |A|+|B|$, e qui si ricollega alla somma numerica. Vediamo che è $\leq$, e infatti ci sono due casi: $=$ quando $A$ e $B$ non hanno elementi in comune, e $<$ in tutti gli altri casi.

Vediamo le proprietà:
* **Commutativa**: $A \cup B = B \cup A$;
* **Associatività**: $A \cup (B \cup C) = (A \cup B) \cup C$;
* **Idempotenza**: $A \cup A = A$;
* **Elemento neutro**: $A \cup \emptyset = A$.
#### Intersezione

L'intersezione di due insiemi è l'insieme dei loro elementi in comune.$$A\cap B=\{x\ |\ x \in A \ \land \ x \in B\}$$Vediamo le proprietà:
* **Commutativa**: $A \cap B = B \cap A$;
* **Associativa**: $A \cap (B \cap C) = (A \cap B) \cap C$;
* **Idempotenza**: $A \cap A = A$;
* **Elemento assorbente**: $A \cap \emptyset = \emptyset$;
* **Distributiva**: $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$;
* **Distributiva**: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$-

Notiamo che l'unione somiglia alla somma e l'intersezione somiglia al prodotto perché la prima ha un elemento neutro e per la seconda lo stesso elemento è assorbente. Vediamo però che, a differenza della somma e del prodotto, la proprietà distributiva si applica in entrambe le direzioni.
#### Sottrazione

$A \setminus B$ è l'insieme degli elementi che sono in $A$ ma che non sono in $B$.$$A \setminus B = \{x\ |\ x\in A\ \land \ x \notin B\}$$
Nel caso in cui $A \subset B$, $B \setminus A$ è detta *complementazione*, e si indica anche come $\mathcal C _A B$. Quando si fa il complementare di un insieme, quello più grande è detto *universo* ($U$).

Questa operazione non è commutativa (si nota anche perché la definizione non è simmetrica).
#### Prodotto cartesiano

Dati due insiemi $A$ e $B$, il loro prodotto cartesiano è l'insieme di [[Coppia ordinata|coppie ordinate]] dei suoi elementi.$$A \times B = \{(a,b)\ |\ a \in A \ \land \ b \in B\}$$
Per la cardinalità, $|A\times B|=|A|\cdot|B|$.

Questa operazione non è commutativa, infatti si tratta di coppie ordinate. Non è neanche associativa.

Pensa a un piano cartesiano. Hai un asse delle $x$, che è un insieme $X$ che contiene tutti i numeri reali, hai un asse delle $y$ che è un insieme $Y$ che contiene tutti i numeri reali, e il piano, la griglia, è l'insieme di tutte le coppie ordinate $(x,y)$, che sono le coordinate.

## Esercizi

$$A=\{R,O,S,A\}\qquad B=\{*,\#,@\}$$
$$B \times A = \left\{\begin{matrix*}[l](*,R),\ (*,O),\ (*,S),\ (*,A),\\ (\#,R),\ (\#,O),\ (\#,S),\ (\#,A),\\ (@,R),\ (@,O),\ (@,S),\ (@,A)\end{matrix*}\right\}$$

$$C=\{a,b\} \qquad D=\{1\} \qquad C\times D = \{(a,1),\ (b,1)\}$$

Non ho voglia di copiare gli altri sono orrendi. Per i lettori, trovare almeno $\mathcal P (B)$.