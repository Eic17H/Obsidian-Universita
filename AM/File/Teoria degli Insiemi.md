---
cssclasses: am
---
[[Insiemi numerici]]
Lo stesso argomento: <span class="alf">[[ALF/File/Insiemi|ALF]]</span>

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

## Insieme vuoto

$$\emptyset=\{x\ |\ x\in A \land x \notin A\}$$
Guardiamo la parte a destra. Se prendiamo $p=x\in A$, allora lì abbiamo $p\land\lnot p$, che secondo il principio di non contraddizione è sempre falso, quindi l'insieme vuoto non ha elementi.

Si può definire anche in altri modi: $$\emptyset = \{\mathbb N \text{ dispari e}<1\}, \qquad \{\}$$
Visto che è vuoto, $|\emptyset|=0$.

Un insieme vuoto è comunque un insieme che può esistere. Uno zaino vuoto non smette di esistere solo perché è vuoto.
## Operatori

## Unari

#### Cardinalità

La cardinalità di $A$, scritta come $|A|$, è il numero degli elementi (distinti) di $A$.

#### Insieme delle parti

Questa è complicata. Insieme dei sottoinsiemi di un insieme. Eh? Prendi un insieme, prendi tutti i sottoinsiemi (propri e impropri) possibili di quell'insieme, e crei un insieme i cui elementi sono tutti quegli insiemi. È un operatore unario. $$\mathcal P(A)=\{B\ |\ B \subseteq A\}$$
Facciamo un esempio. $$A=\{1,2\}\qquad\mathcal P = \{\emptyset, \{1\},\{2\},\{1,2\}\}$$
Per un paragone con certi linguaggi di programmazione, se $A$ ha elementi di tipo `int`, $\mathcal P(A)$ è di tipo `int[][]`, o `list<list<int>>`.

Non vediamo la dimostrazione, se ci pensi diventa un minimo ovvio, ma $|\mathcal P(A)| = 2^{|A|}$.

### Binari booleani

#### Uguaglianza

$$A=B\leftrightarrow\forall x,(x\in A \leftrightarrow x \in B)$$
Due insiemi sono uguali se hanno gli stessi elementi. Cioè se un elemento è in $A$, è anche in $B$, e se è in $B$, è anche in $A$.

#### Sottoinsiemi

Vediamo i sottoinsiemi impropri:
$$A\subseteq B \leftrightarrow \forall x,(x \in A \rightarrow x \in B)$$
E poi vediamo quelli propri che hanno una condizione in più:$$A\subset B \leftrightarrow \forall x,(x \in A \rightarrow x \in B)\ \land\ \exists x \ | \ (x \in B \land x \notin A) \ \land \ A\neq\emptyset$$
Tutti gli elementi di $A$ sono anche in $B$; nel caso dei sottoinsiemi propri, c'è almeno un elemento che è in $B$ ma non in $A$. Necessariamente: $$A\subset B \rightarrow |A|<|B| \qquad A\subseteq B \rightarrow |A|\leq|B|$$
Inoltre, dati i criteri: $$\forall B, \ \emptyset \subseteq B \ \land \ B \subseteq B$$
### Binari da insiemi a insiemi

#### Unione

#### Intersezione

#### Sottrazione

#### Prodotto cartesiano