---
cssclasses: lip
---
## Teoria$\newcommand{\apply}{\textbf{apply}}\newcommand{\funblock}{\textbf{funblock}}\newcommand{\fun}{\textbf{fun}}\newcommand{\if}{\textbf{if}}\newcommand{\true}{\textbf{true}}\newcommand{\false}{\textbf{false}}$

* [[λ-calcolo]]
* [[Macchina SECD]]
* [[Valutazione]]
## Concetto semplificato

### Notazione

Visto il concetto di stack/pila, useremo sia la notazione intuitiva $\underset{\underset C B} A$, sia la notazione corretta $A::B::C$.$\newcommand{\llangle}{⟪}\newcommand{\rrangle}{⟫}$

Quella da usare negli esercizi è ovviamente la seconda, la prima sarà usata nelle spiegazioni per introdurre i concetti base.

### Registri

La macchina SECD è una macchina virtuale per linguaggi funzionali con un set di istruzioni piccolo e (relativamente) semplice. Consiste di quattro registri Stack, Environment, Control, Dump. Per quanto riguarda i tipi, $S$, $C$ e $D$ sono degli stack, mentre $E$ è un array associativo (da identificatori a valori).

La macchina in sé è fatta di due pile. Quella principale è la pila $\underset{\underset{\ldots}{(S_2,E_2,C_2)}}{(S_1,E_1,C_1)}$, che contiene i correnti $S$, $E$ e $C$. L'altra è $D$, che contiene $\underset{\underset{\ldots}{(S_b,E_b)}}{(S_a,E_a)}$. Pushare equivale a salvare il contesto, poppare equivale a riprisitnare il contesto.

* $S$ è uno stack di valori. Simile allo stack di <span class="are">[[IJVM]]</span>, in cima contiene gli operandi prossimi all'utilizzo.
* $E$ è un ambiente, quindi contiene le associazioni tra variabili e valori.
* $C$ è il codice da eseguire, sotto forma di pila appunto. All'inizio conterrà una sola stringa, ma con le regole di inferenza, scomporremo la stringa in più elementi della pila, per poi trasportarli uno alla volta su $S$. Per lavorare con una pila, trasformeremo la notazione normale del tipo $plus(1,2)$ nella notazione polacca inversa a stack $2::1::Prim(plus)$.

La vedi quella cosa che ho detto di $D$? Onestamente non l'ho capita, io non la uso e gli esercizi mi escono giusti. Non lo vedo usato neanche nel libro. Inoltre, la notazione non mi sembra corrispondere alla definizione: semmai, mi sembra che la macchina intera sia $D$, che contiene la pila che ho chiamato "principale". Non credo proprio che questo dettaglio della teoria sia poi così importante, ma secondo me il libro si è sbagliato. Quindi, vedendo lo stack di terne $(S,E,C)$, e vedendo come sono scritti gli esercizi, direi che $D$ è tutto lo stack tranne l'elemento in cima, che sarebbe appunto il resto del nome "SECD".

### Regole di inferenza

Non ho capito bene. Sento parlare di regole big-step e small-step per la SECD, ma il libro di Dessì non menziona quelle small-step, e il libro di Pinna è poco chiaro: presenta le regole big-step della SECD, e poi *delle* regole small-step dicendo vagamente che non riguardano la SECD, ma un altro linguaggio. Credo però siano quelle.

#### Big-step

Questa doveva essere una spiegazione informale, ma più vai avanti più diventa impossibile evitare i simboli veri e propri. Trovi le regole scritte bene nella teoria.

**Riscrittura in notazione polacca inversa:**
* Se in cima a $C$ c'è un operatore in forma $op(t_1,...,t_n)$ lo riscrivi in forma $t_1::\cdots t_n :: Prim(op)$;
* Se in cima a $C$ c'è un condizionale in forma $\if(t_1,t_2,t_3)$, lo riscrivi in forma $t_1::If::t_2::t_3$;
* Se in cima a $C$ c'è un'applicazione di funzione in forma $\apply(t_1,t_2)$, lo riscrivi in forma $t_1::t_2::App$.

**Valutazione:**
* Se in cima a $C$ c'è una costante intera o booleana, la poppi da $C$ e la pushi in $S$;
* Se in cima a $C$ c'è una variabile, la poppi da $C$ e pushi il suo valore in $S$;
* Se in cima a $C$ c'è una funzione in forma $\fun(f,x,t)$, la poppi da $C$ e la pushi così com'è in $S$;

**Applicazione di una funzione:**
* Se in cima ad $S$ ci sono due valori $v_1$ e $v_2$, di cui quello più in basso ($v_1$) è della forma $\fun(f,x,t)$, e in cima a $C$ c'è $App$, allora:
	* Poppi i valori da $S$ e l'applicatore da $C$;
	* Pushi una nuova terna $(S,E,C)$ sulla macchina, dove:
		* Il nuovo $S$ è vuoto;
		* Il nuovo $E$ è come quello di prima, con l'aggiunta di $[f/\fun(f,x,t)]$ e $[x/v_2]$ (dove al posto di $f$, $x$ e $t$ metti quelli che ci sono effettivamente scritti);
		* Il nuovo $C$ ha un'unica istruzione che è quel $t$ scritto nelle parentesi di $\fun$ (ovviamente anche lì ci scrivi quello che c'è scritto dentro le parentesi).

**Valutazione terminale** (hai finito con questa $(S,E,C)$ e puoi poppare e tornare a quella sotto)**:**
* Se $C$ è vuoto ed $S$ contiene un valore $v$ e nient'altro, allora se la nostra pila è $\underset {\underset {\cdots} {(S',E',C')}} {(S,E,C)}$, poppa questa pila, e pusha $v$ su $S'$, ottenendo $\underset {\cdots} {(v::S',E',C')}$.

**Valutazione di un operatore:**
* Simile all'<span class="are">`add`</span> di <span class="are">[[IJVM]]</span>: se in cima a $C$ hai un operatore in forma $Prim(op)$ ($op$ è il nome dell'operatore, per esempio $add$), e in cima ad $S$ hai abbastanza valori per $op$ (nel caso di $add$ sarebbero 2), allora poppa quei valori da $S$, poppa l'operatore da $C$, e pusha il risultato dell'operazione su $S$.

**Valutazione del condizionale:**
* Se in cima a $S$ hai un valore $v$, e in cima a $C$ hai $If::t_2::t_3$, allora poppa $S$, poppa $If::t_2::t_3$ da $C$ e poi:
	* se $v=\true$, pusha $t_2$ su $C$;
	* se $v=\false$, pusha $t_3$ su $C$.

#### Small-step

$\Delta$ è la pila degli ambienti, $top(\Delta)$ è l'ambiente corrente e lo chiamerò $\delta$ solo per rendere la notazione più intuitiva.

* Una variabile $x$ viene valutata come $\delta(x)$; 
* Un'operazione che ha solo valori come operandi viene valutata a un valore;
* Se un'operazione ha almeno un termine non valutato tra gli operandi, valuti il primo;
* If true then il primo, if false then il secondo;
* If (termine non valutato), valutalo;
* $apply(fun(x,t),v)$, pushi x=v su $\Delta$;
* $apply(a,b)$ ma $a$ non è valutato, lo valuti, altrimenti se $b$ non è valutato, lo valuti;
* $\funblock(t)$ ma $t$ non è valutato, lo valuti;
* $\funblock(v)$ e $v$ è un valore, semplicemente vale $v$;
* let x = t in ..., valuta $t$ se non è valutato;
* let x = v in t, diventa $\funblock(t)$ e pushi x=v su $\Delta$.

Valutare qualcosa può avere side effects che cambiano $\Delta$.
## Esercizi

### Esempio 6.1 di Dessì

$$\begin{matrix*}[l]
([],\bot,add(1,2)::[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot,1::2::Prim(add)::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(1::[],\bot,2::Prim(add)::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(2::1::[],\bot,Prim(add)::[])::[] & \mapsto & \text{Valutazione operatore} \\
(3::[],\bot,[])::[]
\end{matrix*}$$

$$\begin{matrix*}[l]
\llangle add(1,2),\bot \rrangle & \rightsquigarrow\\
\llangle 3,\bot \rrangle
\end{matrix*}$$
Forse questa è un po' troppo semplice con la small step.
### Esempio 6.2 di Dessì

$$\begin{matrix*}[l]
([],\bot,\apply(\fun(id,x,x),3)::[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot,\fun(id,x,x)::3::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(id,x,x)::[],\bot,3::App::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(3::\fun(id,x,x)::[],\bot,App::[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[id/\fun(id,x,x)][x/3],x::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(3::[],\bot[id/\fun(id,x,x)][x/3],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(3::[],\bot,[])::[]
\end{matrix*}$$
$$\begin{matrix*}[l]
\llangle \apply(\fun(id,x,x),3),\bot \rrangle & \rightsquigarrow\\
\llangle \funblock(x),\bot[x/3]::\bot \rrangle & \rightsquigarrow\\
\llangle \funblock(3),\bot[x/3]::\bot \rrangle & \rightsquigarrow\\
\llangle 3,\bot \rrangle
\end{matrix*}$$

### Esercizio 6.1 di Dessì

$$\begin{matrix*}[l]
([],\bot,\apply(\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1))),\fun(h,z,sub(8,z)))::[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot,\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::\fun(h,z,sub(8,z))::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::[],\bot,\fun(h,z,sub(8,z))::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(h,z,sub(8,z))::\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::[],\bot,App::[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\apply(x,\apply(\fun(g,y,mul(y,2)),1))::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],x::\apply(\fun(g,y,mul(y,2)),1)::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\apply(\fun(g,y,mul(y,2)),1)::App::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione apply} \\
(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\fun(g,y,mul(y,2))::1::App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(g,y,mul(y,2))::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],1::App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante intera} \\
(1::\fun(g,y,mul(y,2))::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(g,y,mul(y,2))][y/1],mul(y,2)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot[f/\fun(g,y,mul(y,2))][y/1],y::2::Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(1::[],\bot[f/\fun(g,y,mul(y,2))][y/1],2::Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante} \\
(2::1::[],\bot[f/\fun(g,y,mul(y,2))][y/1],Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione operatore} \\
(2::[],\bot[f/\fun(g,y,mul(y,2))][y/1],[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(2::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(h,z,sub(8,z))][z/2],sub(8,z)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot[f/\fun(h,z,sub(8,z))][z/2],8::z::Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante intera} \\
(8::[],\bot[f/\fun(h,z,sub(8,z))][z/2],z::Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(2::8::[],\bot[f/\fun(h,z,sub(8,z))][z/2],Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione operatore} \\
(6::[],\bot[f/\fun(h,z,sub(8,z))][z/2],[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(6::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(6::[],\bot,[])::[] & \mapsto & \text{} \\
\end{matrix*}$$
Mi dà 6. Gemini dice che è giusto.

Ci sono anche degli errori di battitura, certe volte ho chiamato la funzione $f$ anche se aveva un altro nome, ma funziona lo stesso perché questo codice non è molto complesso.

Inoltre, altro errore che non ha influito sul risultato, quando chiamo una funzione parto sempre dall'ambiente vuoto $\bot$. Questo è sbagliato, bisognerebbe invece partire copiando l'ambiente della funzione chiamante.

Provo small-step.
$$\begin{matrix*}[l]
\llangle \apply(\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1))),\fun(h,z,sub(8,z))),\bot \rrangle & \rightsquigarrow\\
\llangle \llangle\funblock(\apply(x,\apply(\fun(g,y,mul(y,2)),1))),\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(\apply(\fun(h,z,sub(8,z)),\apply(\fun(g,y,mul(y,2)),1))),\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(\apply(\fun(h,z,sub(8,z)),2)),\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(\funblock(sub(8,z)),\bot[x/\fun(h,z,sub(8,z))][z/2]::\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(\funblock(sub(8,2)),\bot[x/\fun(h,z,sub(8,z))][z/2]::\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(\funblock(6)),\bot[x/\fun(h,z,sub(8,z))][z/2]::\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle\funblock(6),\bot[x/\fun(h,z,sub(8,z))]::\bot \rrangle & \rightsquigarrow\\
\llangle6,\bot \rrangle
\end{matrix*}$$
Ci sono stati errori di copia-incolla e non ho giustificato il passaggio che richiedeva una giustificazione ma ci siamo.