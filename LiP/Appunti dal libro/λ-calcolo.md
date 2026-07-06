---
cssclasses:
  - lip
---
## Introduzione

### Spiegazione intuitiva

Il ==lambda-calcolo== è un modo per scrivere funzioni. Per esempio: $$f = λx.x+1$$ Questo è equivalente a: $$f(x) = x+1$$Per applicare una funzione, come $f(1)$, si scrive $f\ 1$, un po' come in OCaml scriveresti `f 1`. Così come in OCaml, nel lambda-calcolo tutto è una funzione. Quando scriviamo $f\ 1$, prendiamo la "formula" di $f$, la parte a destra del $.$, e scriviamo $1$ al posto di ogni $x$.

### Rigore

La sintassi del λ-calcolo ha tre tipi di termini. Tutti i termini si chiamano lambda-termini, e ciascun tipo ha il suo nome: $$\begin{matrix}t::=\\&x&\text{(variabile)}\\&λx.t&\text{(lambda-astrazione)}\\&t_1t_2&\text{(applicazione)}\end{matrix}$$Ogni termine è una funzione. Le funzioni prendono come argomenti funzioni e restituiscono altre funzioni.

## Sintassi concreta e astratta

Quando si discute la sintassi dei linguaggi di programmazione, si distinguono due livelli di struttura: sintassi concreta e sintassi astratta. La sintassi ==concreta==, o di superficie, è ciò che vediamo e scriviamo, stringe di caratteri. La sintassi ==astratta== è una rappresentazione interna ad albero.

### Passaggio da concreta ad astratta

La trasformazione da concreta ad astratta avviene in due fasi.

1. Il ==lexer== converte la stringa di caratteri in una sequenza di *token* (identificatori, keyword, costanti, punteggiatura), rimuove i commenti e normalizza gli spazi bianchi e i formati delle costanti.
2. Il ==parser== trasforma la sequenza di token in un albero sintattico, usando convenzioni come la precedenza e l'associatività degli operatori.

Io non ho modo di disegnare alberi qui, quindi faremo finta di poterli vedere. La struttura ad albero può comunque essere esplicitata nel testo lineare con le parentesi, per esempio con $s\ (t\ u)$.

Nel lambda-calcolo, l'applicazione associa a sinistra, quindi $s\ t\ u$ equivale a $(s\ t)\ u$. Invece i corpi delle astrazioni si estendono il più a destra possibile, quindi $λx.λy.x\ y\ x$ equivale a $λx.(λy.((x\ y)\ x))$. Nota che quella all'interno è un'applicazione, quindi associa a sinistra.

### Variabili e metavariabili

Con $t$, $s$ e $u$ indicheremo termini arbitrari: sono metavariabili. Invece, $x$, $y$ e $z$ sono metavariabili che indicano variabili nello specifico, e non qualunque tipo di termine.

Però, useremo $x$, $y$ e $z$ *anche* come variabili. Per capire se sono variabili o metavariabili dovremo usare il contesto.

Per esempio, possiamo dire:

> Il termine $λx.λy.x\ y\ x$ è della forma $λz.s$, dove $z=x$ e $s=λy.x\ y\ x$.

$z$ ed $s$ sono metavariabili, $x$ e $y$ sono variabili.

#### Che significa?

Farò un esempio stupido. Diciamo che vogliamo parlare di come funziona l'italiano. Ti potrei dire:

> Immaginiamo di avere due parole qualunque. Ciascuna può essere qualsiasi parola, e possono essere uguali o diverse, ma ci sono comunque due parole. Per comodità, chiamiamo la prima Gianni e la seconda Franco. Allora, se Gianni è preceduto da \[...\]

In questo caso, sto *parlando di* una parola soprannominandola "Gianni". "Gianni" è una metavariabile. Ma allo stesso tempo, "Gianni" è una possibile parola (variabile).