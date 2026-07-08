---
cssclasses:
  - lip
---
## A cosa servono i tipi

Abbiamo visto questi termini: $$\begin{matrix*}[l]
t::=\\
&true&(\text{costante true})\\
&false&(\text{costante false})\\
&if\ t\ then\ t\ else\ t&(\text{condizionale})\\
&0&(\text{costante 0})\\
&succ\ t&(\text{successore})\\
&prev\ t&(\text{predecessore})\\
&iszero\ t&(\text{test 0})\\
\end{matrix*}$$e i valori: $$\begin{matrix*}[l]
v::=\\
&true&(\text{valore true})\\
&false&(\text{valore false})\\
&nv&(\text{valore numerico})\\
nv::=\\
&0&(\text{valore 0})\\
&succ\ nv&(\text{successore di un nv})
\end{matrix*}$$

Il problema adesso è che possiamo scrivere $succ\ false$, che non ha significato semantico, ma sintatticamente è permesso. Inoltre, $0$ e $false$ sono lo stesso valore, e il linguaggio non li sa distinguere.

Noi scopriamo problemi come $succ\ false$ valutando il termine, quindi nella semantica. Sarebbe bello trovare il problema direttamente con la sintassi. I tipi servono proprio a quello.

## Introduzione dei tipi

Introduciamo due tipi, $Nat$ e $Bool$. Le metavariabili che si riferiscono ai tipi saranno lettere latine maiuscole.

Possiamo dire che il termine $t$ ha tipo $T$ (appartiene a $T$, è un elemento di $T$) quando possiamo sapere che $t$ valuta un valore della forma corretta per $T$, e possiamo saperlo anche senza valutare $t$. Scriviamo $t:T$.

Quando ci limitiamo alla sintassi senza entrare nella valutazione, non possiamo conoscere il tipo di $if\ iszero\ 0\ then\ 0\ else\ false$, anche se è ovvio che è un $Nat$, perché per sapere che è un $Nat$ dobbiamo anche sapere che $iszero\ 0$ si valuta in $true$.

## Relazione di tipizzazione

Scopriamo il tipo di un termine tramite le regole di inferenza.

I nostri assiomi sono: $$\dfrac{}{0:Nat}(\text{T-Zero})\qquad\dfrac{}{true:Bool}(\text{T-True})\qquad\dfrac{}{false:Bool}(\text{T-False})$$
Inferiamo poi: $$\begin{matrix}\dfrac{t1:Bool \qquad t2:T \\ t3:T}{if\ t1\ then \ t2 \ else \ t3:T}(\text{T-If}) \\ \dfrac{t:Nat}{succ\ t:Nat}(\text{T-Succ}) \\ \dfrac{t:Nat}{pred\ t:Nat}(\text{T-Pred}) \\ \dfrac{t:Nat}{iszero\ t:Bool}(\text{T-Iszero})\end{matrix}$$

Adesso, una definizione dalla struttura familiare:

> La **==relazione di tipizzazione==** per le espressioni aritmetiche è la *più piccola* relazione binaria tra termini e tipi che soddisfa quelle regole di inferenza.

> Un termine $t$ è tipizzabile (ben tipizzato, well typed) se esiste un $T$ tale che $t:T$.

C'è una parte che non ho capito concretamente ma credo si riferisca praticamente alle derivazioni bottom-up: anziché partire dagli assiomi e derivare un termine ben tipizzato, prendiamo un termine e dimostriamo che è ben tipizzato costruendo un albero di derivazione per esso.

> **==Teorema dell'unicità dei tipi==**: ogni termine $t$ ha al massimo un tipo, e c'è solo una possibile derivazione costruibile dalle regole di inferenza.

Questo teorema vale... Nel nostro linguaggio molto semplice. Con la sottotipizzazione (che non vedremo), il tipo può non essere unico, e la derivazione può non essere unica.

## Correttezza

La correttezza, o sicurezza, è una proprietà di questo sistema di tipi: un termine ben tipizzato o è un valore finale o può essere valutato in un termine ben tipizzato. Queste sono in realtà due sotto proprietà, dette progresso e preservazione.

* ==Progresso==: Un termine tipizzabile o è un valore o può essere valutato, cioè esiste un termine $t'$ tale che $t \rightarrow t'$;
* ==Preservazione==: Se un termine tipizzabile viene valutato, ne risulta un termine tipizzabile, cioè se $t:T$ e $t \rightarrow t'$ allora $t':T$.
