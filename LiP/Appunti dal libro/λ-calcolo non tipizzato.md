---
cssclasses:
  - lip
---
## Introduzione

Il lambda-calcolo fu introdotto da Alonzo Church negli anni '30 come parte della sua ricerca delle fondamenta della matematica. Tra il 1936 e il 1940 trovò una formulazione <span class="logica">[[Insieme di formule inconsistente|logicamente consistente]]</span> e la documentò.

### Spiegazione intuitiva

Il ==lambda-calcolo== è un modo per scrivere funzioni. Per esempio: $$f = λx.x+1$$ Questo è equivalente a: $$f(x) = x+1$$Per applicare una funzione, come $f(1)$, si scrive $f\ 1$, un po' come in OCaml scriveresti `f 1`. Così come in OCaml, nel lambda-calcolo tutto è una funzione. Quando scriviamo $f\ 1$, prendiamo la "formula" di $f$, la parte a destra del $.$, e scriviamo $1$ al posto di ogni $x$.

### Rigore

La sintassi del λ-calcolo ha tre tipi di termini. Tutti i termini si chiamano lambda-termini, e ciascun tipo ha il suo nome: $$\begin{matrix}t::=\\&x&\text{(variabile)}\\&λx.t&\text{(lambda-astrazione)}\\&t_1t_2&\text{(applicazione)}\end{matrix}$$Ogni termine è una funzione. Le funzioni prendono come argomenti funzioni e restituiscono altre funzioni.

## Sintassi

### Sintassi concreta e astratta

Quando si discute la sintassi dei linguaggi di programmazione, si distinguono due livelli di struttura: sintassi concreta e sintassi astratta. La sintassi ==concreta==, o di superficie, è ciò che vediamo e scriviamo, stringe di caratteri. La sintassi ==astratta== è una rappresentazione interna ad albero.

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

### Scope (o ambiente)

Scope. <span class="pr1">[[Scope|Strumenti per la pulizia dei pavimenti...?]]</span> No. Lo scope, o ambiente, riguarda il modo in cui ciascuna variabile compare nell'espressione.
* Un'occorrenza della variabile $x$ è ==*vincolata (bound)*== dall'astrazione $λx.t$ quando è presente nel suo corpo $t$, e $λx$ si dice un *legante (binder)* il cui ambiente è $t$.
* Un'occorrenza di $x$ è ==*libera (free)*== se non è vincolata. Per esempio $x$ non è vincolata in $λy.x\ y$, in parole povere perché non è un parametro.

Una variabile può comparire prima vincolata e poi libera nella stessa espressione. Per esempio, in $(λx.x)\ x$, la prima $x$ (quella dopo il $.$) è vincolata, mentre la seconda è libera.

Un termine senza variabili libere si dice ==*termine chiuso*== o *==combinatore==*. L'esempio più semplice è la funzione identità, $id=λx.x$, che restituisce il suo argomento.

## Semantica operazionale

Il lambda-calcolo puro non ha costanti né operatori primitivi, quindi non ci sono numeri, operazioni aritmetiche, condizionali, loop eccetera. Esistono solo quei tre tipi di termini che abbiamo visto, e sono tutti funzioni. L'unica cosa che possiamo fare è applicare astrazioni a variabili. Scriviamo: $$(λx.t_{12})\ t_2 \rightarrow [x \mapsto t_2]\ t_{12}$$
Questa cosa, $[x \mapsto t_2]\ t_{12}$, significa "$t_{12}$, ma con tutte le occorrenze di $x$ sostituite da $t_2$". Questa operazione di riscrittura è detta ==beta-riduzione==, e un termine della forma $(λx.t_{12})\ t_2$ è detto *espressione riducibile*, o ==redex==.

### Strategie di riduzione

Ci sono diverse strategie di valutazione, e differiscono nella scelta di quali redex si possono ridurre in ciascuna fase.

La valutazione è una relazione da termini a termini. Con tutte le strategie tranne la beta-riduzione piena, questa relazione nello specifico è una funzione parziale, poiché un termine $t$ si valuta sempre nello stesso termine $t'$, o in nessun termine.
#### Beta-riduzione piena

Qualunque redex si può ridurre in qualunque momento. Ad ogni passaggio possiamo scegliere un redex qualunque e riscriverlo.

Per esempio: $$(λx.x)\ ((λx.x)\ (λz.(λx.x)\ z))= id\ (id\ (λz.id\ z))$$Ci sono tre redex, quelli sottolineati:
* $\u {id\ (id\ (λz.id\ z))}$
* $id\ \u {(id\ (λz.id\ z))}$
* $id\ (id\ (λz.\u{id\ z}))$

Con la beta-riduzione piena, li possiamo fare in qualunque ordine: $$\begin{matrix*}[l] &id\ (id\ (λz.\u{id\ z}))\\
\rightarrow&\u{id\ (id\ (λz.z))}\\
\rightarrow&\u{id\ (λz.z)}\\
\rightarrow&(λz.z)\\
\nrightarrow\end{matrix*}$$
#### Ordine normale

Riduciamo sempre per primo il redex più a sinistra e più esterno. $$\begin{matrix*}[l] &\u{id\ (id\ (λz.id\ z))}
\\\rightarrow& \u{id\ (λz.id\ z)}
\\\rightarrow& λz.\u{id\ z}
\\\rightarrow& λz.z
\\\nrightarrow
\end{matrix*}$$

#### Chiamata per nome

*Call by name*. Come l'ordine normale ma non sono permesse riduzioni all'interno delle astrazioni. $$\begin{matrix*}[l] &\u{id\ (id\ (λz.id\ z))}
\\\rightarrow& \u{id\ (λz.id\ z)}
\\\rightarrow& λz.id\ z
\\\nrightarrow
\end{matrix*}$$Varianti di questa strategia sono state usate in Algol e Haskell. Quella di Haskell è la chiamata per necessità, *call by need*: quando si valuta un termine, lo si sovrascrive in tutte le sue occorrenze, in modo condiviso, usando grafi anziché alberi di sintassi.

Questa strategia e le sue varianti sono *lazy*, cioè valutano un termine solo quando si usano.
#### Chiamata per valore

La maggior parte dei linguaggi usa questa strategia, *call by value*: si riducono solo i redex più esterni, considerando solo quelli il cui lato destro è già un valore. La valutazione avviene in modo *rigoroso*, l'opposto di lazy, cioè si valutano sempre anche se non vengono usati. $$\begin{matrix*}[l]
&id\ \u{(id\ (λz.id\ z))}
\\\rightarrow& \u{id\ (λz.id\ z)}
\\\rightarrow& λz.id\ z
\\\nrightarrow
\end{matrix*}$$Noi useremo questa strategia, anche se non fa molta differenza nella discussione dei sistemi di tipo.

## Programmare

Questo linguaggio è abbastanza semplice da permetterci di capire alcuni concetti importanti senza troppo sforzo, ma abbastanza potente da, appunto, poter implementare questi concetti.

### Argomenti multipli

Ogni termine è una funzione che prende come parametro una funzione e restituisce una funzione. Come si implementano i parametri multipli? Con le funzioni di ordine superiore, così come in OCaml.

In OCaml, essenzialmente, abbiamo visto che possiamo avere una funzione che prende un numero e restituisce un numero (ignorando che anche i numeri sono funzioni in un certo senso):
```OCaml showLineNumbers
# let square x = x*x;;
val square : int -> int = <fun>
# square 2;;
- : int = 4
```
Ma possiamo anche avere una funzione che restituisce un'altra funzione:
```OCaml showLineNumbers
# let twice f x = f (f x);;
val twice : ('a > 'a) -> 'a -> 'a = <fun>
# twice square 2;;
- : int = 16
# let fourthpower = twice square;;
val fourthpower : int -> int = <fun>
# fourthpower 2;;
- : int = 16
```
La mia funzione `twice` prende in input una funzione e restituisce una funzione con lo stesso dominio, ma che applica due volte la funzione che ho passato in input. Posso passare un parametro a quella funzione, come alla riga 3, o assegnare la funzione a una variabile per darle un nome e riutilizzarla, come alle righe 5 e 7.

Adesso vediamo una dichiarazione con la stessa struttura:
```OCaml showLineNumbers
# let sum a b = a+b;;
val sum : int -> int -> int = <fun>
# sum 3 2;;
- : int = 5
# let sum3 = sum 3;;
val sum3 : int -> int = <fun>
# sum3 2;;
- : int = 5
```
Sembra una funzione con due parametri, si comporta come una funzione con due parametri. Eppure la struttura è identica a quella di `twice`. Questo è perché `sum 3` restituisce la funzione $b \mapsto 3+b$, che se applicata a `2` diventa $[b \mapsto 3+b]\ 2 = 3+2 = 5$.

Chiusa la parentesi OCaml (linguaggio nato da un'estensione del λ-calcolo), allo stesso identico modo usiamo queste *funzioni di ordine superiore* per simulare le funzioni multi-argomento. Questa trasformazione è detta *==currying==* in onore di Haskell Curry, un contemporaneo di Church.

### Booleani di Church

Non possiamo ottenere veri e propri valori come li immaginiamo, visto che esistono solo funzioni. Possiamo però creare delle funzioni che si comportano come dei costrutti di selezione, e chiamare "vero" il costrutto che come condizione ha vero, e "falso" il costrutto che come condizione ha falso. $$\begin{matrix*}[l]tru &=& λt.λf.t\\fls&=&λt.λf.f\end{matrix*}$$Possiamo poi creare un combinatore che si comporta come un vero e proprio costrutto di scelta, cioè prende in input un booleano, un valore per il ramo vero e un valore per il ramo falso: $$\begin{matrix*}if&=λb.λv.λf.\ b\ v\ f&\end{matrix*}$$A dire il vero, per come abbiamo strutturato i booleani, questo combinatore non fa assolutamente nulla, restituisce semplicemente $b\ v\ f$. Il libro lo chiama $test$, non ho capito perché, ma a me sembra più intuitivo introdurlo come equivalente di un `if`.

#### Connettivi logici

Consiglio di pensarci prima di leggere le definizioni.$$\begin{matrix*}[l]and &=& λa.λb.a\ b\ fls\\or&=&λa.λb.a\ tru\ b\\not&=&λb.b\ fls\ tru\end{matrix*}$$Che senso ha?

Per $and$ e $or$, short circuit. Prendiamo per esempio $and$: se $a=fls$, short circuit, necessariamente il risultato è $fls$, quindi per la definizione di $a=fls$, il secondo parametro deve essere $fls$; se invece $a=tru$, dobbiamo controllare $b$, e il risultato finale sarà il suo valore. $or$ è al contrario.

$not$ invece, ha la struttura di `not b = if b then false else true`.

#### Coppie

Visto che i booleani si usano per scegliere uno di due elementi, si possono usare per creare delle coppie. $$\begin{matrix*}[l]pair &=& λf.λs.λb.b\ f\ s\\fst&=&λp.p\ tru\\snd&=&λp.p\ fls\end{matrix*}$$
### Numerali di Church

Di nuovo, non possiamo avere direttamente dei valori, esistono solo funzioni. A cosa servono i numeri nella programmazione? Spesso servono a iterare. Ripensiamo quindi al `twice` di prima come una sorta di funzione che itera una certa funzione due volte: questo è il nostro numero $2$. $$\begin{matrix*}[l]
c_0 &=& λs.λz.z\\
c_1 &=& λs.λz.s\ z\\
c_2 &=& λs.λz.s\ s\ z\\
c_3 &=& λs.λz.s\ s\ s\ z\\
\end{matrix*}$$
Possiamo anche definire la funzione successore: $$\begin{matrix*}[l]
succ &=& λn.λs.λz.s\ (n\ s\ z)
\end{matrix*}$$Cioè? Cioè $c_2=succ\ c_1 = s\ c_1 = s\ s\ z$, scritto in simboli sbagliati ma comprensibili.

È una sorta di sistema di numerazione unario.

#### Operatori

Avendo detto che è un sistema di numerazione unario, possiamo "facilmente" ricavare le operazioni aritmetiche. L'addizione è l'iterazione del successore, la moltiplicazione è l'iterazione dell'addizione. $$\begin{matrix*}[l]
plus &=& λm.λn.λs.λz.m\ s\ (n\ s\ z)\\
mult &=& λm.λn.m\ (plus\ n)\ c_0
\end{matrix*}$$
Adesso ce n'e uno che dal libro non si capisce per niente, $iszero$. Prende in input un numero e restituisce un booleano? Sfruttiamo il fatto che i numerali sono iteratori. Vogliamo un certo $ss$ e un certo $zz$ tale che $ss$ applicato $0$ volte a $zz$ sia $tru$, e invece applicato qualunque altro numero di volte dia $fls$. Se ci pensi due secondi capisci che $zz$ è $tru$ perché è il punto di partenza. Invece $ss$ dà sempre $fls$. $$\begin{matrix*}[l]
iszero &=& λm.m\ (λx.fls)\ tru
\end{matrix*}$$Sembra incomprensibile, è normale. Essenzialmente, $c_0$ evita di applicare il combinatore che lo segue, cioè se $m = c_0$ allora non viene "eseguito" $λx.fls$, cioè teniamo $tru$, invece se viene eseguito almeno una volta quel $tru$ viene sostituito da un $fls$.

##### Sottrazione

Vedo una cosa orrenda nel libro.

Allora. In termini più comprensibili:
* Abbiamo una coppia $(a,b)$;
* Il nostro punto di partenza al passo 0 è $(0,0)$, che chiamiamo $zz$;
* Ad ogni passo, la nuova coppia è $(b,b+1)$;
* Quindi al passo 1 abbiamo $(0,1)$;
* Al passo 2 abbiamo $(1,2)$, e da lì aumentano entrambi di 1 ogni volta;
* In questo modo, a qualunque passo $k\gt0$ abbiamo $(k\text{-}1,k)$;
* Prendendo il primo elemento con $fst$ che abbiamo definito prima, otteniamo $k-1$;
* Ogni passo è un'iterazione, quindi la coppia al passo $k$ è $k\ ss\ (0,0)$ dove $ss$ è la funzione che descrive un "passo";
* Quindi per ottenere il primo elemento usiamo $fst$;
* La formula intera è $λm.fst\ (m\ ss\ zz)$.

Scriviamolo in termini più rigorosi: $$\begin{matrix*}[l]
zz &=& pair\ c_0\ c_0\\
ss &=& λp.pair\ (snd\ p)\ (succ\ (snd\ p))\\
prd &=& λm.fst\ (m\ ss\ zz)
\end{matrix*}$$
## Approfondimenti

Vedi anche delle [[Formalità|ulteriori formalità]] sulla sintassi e sulla semantica del λ-calcolo, e la [[λ-calcolo tipizzato|versione con tipi]].