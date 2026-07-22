---
cssclasses: lip
---
## Teoria

* [[Anno 3/Semestre 1/LiP/Appunti dal libro/Linguaggi|Linguaggi]]
* [[Anno 3/Semestre 1/LiP/Appunti dal libro/Automi|Automi]]
* [[Grammatica|Grammatica]]

## Concetto semplificato

Un linguaggio è una regola che prende una stringa e ti dice che quella stringa fa parte di (*è riconosciuta da*) quel linguaggio. Per esempio, `int main(){return 0;}` è una stringa riconosciuta dal linguaggio C come programma, mentre `burro d'aracnidi` non lo è.

Un ==linguaggio==, per noi, è definito da certi simboli e da un numero di ripetizioni di quei simboli, per esempio: $\mathcal L=\{a^n\ b^m\ c^p \ | \ n=m=2p\}$ significa che il linguaggio riconosce le stringhe che hanno un certo numero di $a$ seguite dallo stesso numero di $b$ seguite dalla quantità doppia di $c$.

Una ==grammatica== invece è un insieme $G = (\mathbf{V},A,\mathcal{P},\mathcal{S})$, dove $\mathbf V$ e $A$ sono insiemi di simboli, $\mathcal P$ è un insieme di regole di sostituzione da simboli di $\mathbf V$ a simboli di $A$, ed $\mathcal S$ è un simbolo di $\mathbf V$.

Si parte da una stringa composta da $\mathcal S$, si applica una sostituzione di $\mathcal P$, e si ottiene un'altra stringa che può essere vuota o può contenere simboli presi da $\mathbf V$ o da $A$. Si ha "finito" quando non sono più presenti simboli di $\mathbf V$. Una stringa vuota si indica con $ε$.

L'obiettivo degli esercizi è, dato un linguaggio, scrivere una grammatica che generi tutte e solo le stringhe riconosciute dal linguaggio. Certe volte propone di farlo con un automa ma non l'ho capito.

Le regole di sostituzione si chiamano produzioni.
## Esercizi

### 10 Luglio 2026

$$\mathcal L = \{a^nb^mc^l\ | \ 2n=m+2k\ \land\ 2|n\}$$

Questo è relativamente difficile, ma ce l'avevo al primo tentativo dell'esame. Ragioniamoci:
* $n$ è pari, quindi si può esprimere come $n=2p$;
* Se $2n=m+2k$, sappiamo che $m$ è pari, quindi si può esprimere come $m=2q$;
* Riscriviamo come $4p=2q+2k$, o anche $2n=2q+2k$.
* Vogliamo tenere $n$ pari; la generazione di termini è praticamente una formula ricorsiva (o iterativa), quindi basta assicurarci che a ogni passo si aggiunga un numero pari di $a$, con una quantità adeguata di $b$;
* Se io aggiungo $aa$, quante $b$ devo aggiungere?
	* Se $k=0$, devo aggiungerne $4$ per ottenere $2\cdot2=4+0$;
	* Se $k=1$, devo aggiungerne $2$ per ottenere $2\cdot2=2+2\cdot1$;
	* Se $k=2$, non ne aggiungo perché è $2\cdot2=0+2\cdot1$;
	* $k>2$ è impossibile perché $!\exists k\in\mathbb N_+ \ | \ 2k<k$.
* E aggiungo quante $c$ voglio.

Otteniamo: $$\mathcal P = \left\{\begin{matrix*}[l]S&\rightarrow&AC\\A&\rightarrow&aaAbbbb\ |\ aaAbb\ |\ aaA\ | \ ε\\C&\rightarrow&Cc\ |\ ε\\\end{matrix*}\right.$$
Il resto della grammatica è $G=(\{S,A,C\},\{a,b,c\},\mathcal P,S)$, dove $\mathcal P$ è quello sopra.

## Trovato su Discord

$$\mathcal L = \{a^nb^mc^k\ |\ n\neq k\ \land\ 3|m\}$$
* Visto che $n\neq k$, ci sono due casi: $n>k$ e $n<k$: li esprimiamo come $n=k+i$ e $k=n+i$, e quindi abbiamo i due casi $a^ka^ib^mc^k$ e $a^nb^mc^nc^i$;
* Per $m|3$, ci basta porre $m=3j$;

$$\mathcal P = \left\{ \begin{matrix*} [l]
S &\rightarrow& AK\ |\ KC \\
A &\rightarrow& aA\ |\ a \\
C &\rightarrow& Cc\ |\ c \\
K &\rightarrow& aKc\ |\ B \\
B &\rightarrow& bbbB\ |\ ε \\
\end{matrix*} \right.$$

Capiamo le regole una alla volta:
* $S$ si separa nei casi $n>k$ e $k>n$, vale a dire $AK$ e $KC$;
* $A$ aggiunge $a$ a sinistra, e $C$ aggiunge $c$ a destra, e non c'è $ε$ perché bisogna sempre aggiungere qualcosa (importante);
* $K$ aggiunge le $a$ e le $c$ nella stessa quantità;
* $B$ rimane al centro e aggiunge $bbb$.

#modulo