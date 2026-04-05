---
cssclasses:
  - lip
---
Lo stesso argomento: [[Linguaggio formale|Logica]]
## Lettura

Un programma è scritto con un determinato *alfabeto*, rappresentato dalla lettera $Σ$. Ci sono due modi per leggere questo alfabeto e tradurlo in linguaggio macchina:
* **Compilazione**: un programma, il compilatore, traduce l'intero programma dal linguaggio di programmazione in linguaggio macchina, tutto in una volta, prima di poterlo eseguire.
* **Interpretazione**: un programma, l'interprete, traduce il programma un'istruzione alla volta e la macchina fisica esegue il codice man mano che viene tradotto.

Un programma sorgente è un file fatto di istruzioni e costrutti consentiti dal linguaggio usato. Il file in sé è un file di testo composto di una serie di caratteri presi da un insieme determinato dal linguaggio. Quell'insieme è proprio l'alfabeto. La fine del file è segnata dal carattere EOF (End Of File).

Il file sorgente viene inviato carattere per carattere ad un *lexer*, che rimuove i caratteri inutili (come i commenti) e raggruppa i caratteri in gruppi, detti *token*. Un **token** è una coppia formata da un nome (un simbolo che appartiene a una categoria) e da un valore (ciò che rappresenta, come un operatore). I token vengono identificati dal *parser*.

Se il lexer trova una sequenza di caratteri non prevista dalle regole del parser, genera un errore. Non si preoccupa del significato dei token, sa solo quali token sono presenti e quali caratteri non rispettano le regole. L'insieme delle regole è la **grammatica** del linguaggio, regole che generano le parole del linguaggio.

Una grammatica determina cosa è e non è un token e quali sequenze di token sono valide. Il parser organizza i token in sequenze ammesse dalla grammatica. Se il linguaggio viene usato correttamente, il parser organizza i token in modo corretto, altrimenti solleva un errore; potrebbe anche provare a risolvere l'errore, indovinando quale codice corretto il programmatore intendesse scrivere.

Incontrando i token, il parser genera una *tavola dei simboli*, o anche più di una, che contengono i token e le informazioni al loro riguardo, per esempio se un token si riferisce a una procedura o a un valore. La tavola viene usata per controllare i tipi, e il parser può generare errori se il programma contiene interazioni tra tipi non permesse.

## Linguaggi

Introduciamo un po' di concetti.
### Alfabeto e parole

Sia $A$ un insieme finito, che chiamiamo alfabeto. $A*$ è l'insieme di tutte le stringhe di lunghezza finita formate dagli insiemi di $A$. Se $A=\{a,b\}$, allora $a \in A*$, e anche $abbabbabbaaabab \in A*$. Diciamo che sono parole.

> **Parola vuota**: Indichiamo con $ε$ la parola vuota, cioè la parola che non contiene simboli. $ε \in A*$.

> **Concatenazione di parole**: Siano $w,w' \in A*$. Con $w \cdot w'$ indichiamo la loro concatenazione, cioè una parola che ha i simboli di $w$ seguiti dai simboli di $w'$. È un'operazione non commutativa, ed $ε$ è l'elemento neutro.

> **Lunghezza di una parola**: Indichiamo con $|w|$ la lunghezza di $w \in A*$. La lunghezza di una parola è definita per induzione, quindi $|ε|=0$, e $|a \cdot w| = |w|+1$, con $a \in A, \; w \in A*$.

> **Prefisso** e **suffisso**: siano $w, w' \in A*$, $w'$ è prefisso di $w$ se esiste $w'' \in A*$ tale che $w = w' \cdot w''$, ed è prefisso di $w$ se esiste $w'' \in A*$ tale che $w = w'' \cdot w'$.

> **Infisso**: siano $w, w' \in A*$, $w'$ è prefisso di $w$ se esistono $w'', w''' \in A*$ tali che $w = w'' \cdot w' \cdot w'''$.

## Linguaggio

Dato un alfabeto, per esempio $A = \{a,b\}$, un linguaggio $\mathcal{L}$ può essere definito, per esempio, come l'insieme delle parole di lunghezza pari in cui $a$ compare il doppio delle volte rispetto a $b$. Per esempio, $baaaba \in \mathcal{L}$.

Possiamo definire un linguaggio con una formula, per esempio con $\mathcal{L} = \{w \in A* | \exists k \in \mathbb{N}. |w| = 2k+1\}$ definiamo un linguaggio che ha solo parole di lunghezza dispari. Possiamo definire una proprietà altrove, indicarla con una lettera, per esempio $P$, e scrivere $\mathcal{L} = \{w \in A* | P(w)\}$.

### Operazioni sui linguaggi

Abbiamo definito i linguaggi come insiemi, perciò si applicano anche le operazioni sugli insiemi. Diciamo che $\mathcal{L}_i = \{w \in A* | P_i (w)\}$:
* Unione: $\mathcal{L}_1 \cup \mathcal{L}_2 = {w \in A* | P_1(w) \lor P_2(w)}$;
* Intersezione: $\mathcal{L}_1 \cap \mathcal{L}_2 = {w \in A* | P_1(w) \land P_2(w)}$;
* Negazione: $\overline{\mathcal{L}_1} = \{w \in A* | ¬P_1(w)\}$;
* Differenza: $\mathcal{L}_1 \setminus \mathcal{L}_2 = {w \in A* | P_1(w) \land ¬P_2(w)}$.

C'è anche un'operazione nuova:
* Concatenazione: $\mathcal{L}_1 \cdot \mathcal{L}_2 = \{w \in A* | \exists w_1, w_2 \in A*. w=w_1 \cdot w_2. w_1 \in \mathcal{L}_1 \land w_2 \in \mathcal{L}_2\}$.
Iterando la concatenazione possiamo definire la **chiusura di Kleene**, $\mathcal{L}^*$, cioè l'insieme di tutte le concatenazioni finite degli elementi di un linguaggio $\mathcal{L}$. Diciamo che $\mathcal{L}^0 = \{ε\}$ e che $\mathcal{L}^{i+1} = \mathcal{L}^i \cdot \mathcal{L}$. Allora:$$\mathcal{L}^* = \bigcup_{i=0}^{\infty} \mathcal{L}^i$$
Questa cosa non l'ho capita: la *chiusura positiva* di $\mathcal{L}$ è $\mathcal{L}^+ = \mathcal{L} \cdot \mathcal{L}^*$.

#### Esempio

Consideriamo l'alfabeto $A = \{0,1\}$, che possiamo usare per creare un linguaggio con cui scrivere numeri interpretabili in qualunque base. Creiamo un linguaggio le cui parole sono solo numeri pari che contengono $1$ tre volte di fila da qualche parte:$$(0+1)^* \cdot 111 \cdot (0+1)^* \cdot 0$$Abbiamo una quantità illimitata di cifre a sinistra e a destra dell'$111$ e necessariamente uno $0$ alla fine per renderlo pari. Ricorda qualcosa? È come le [[espressioni regolari]] già viste in ALF.