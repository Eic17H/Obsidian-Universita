---
cssclasses: lip
---
Scope: <span class="pr1">[[Anno 1/Semestre 1/PR1/Modulo I/Scope|strumenti per la pulizia di pavimenti…?]]</span> Scherzi a parte, ci sono diversi modi in cui un linguaggio può gestire lo scope e l'ambiente quando una funzione ne chiama un'altra.

Lo scope può essere dinamico o statico, e lo scope dinamico può avere binding di tipo shallow o deep. Lo scope statico è quello del C, per intenderci, viene da sé che gli altri due siano più difficili da capire. Detto che il codice usato è talmente volutamente storto che neanche la somiglianza al C ci salverà. Ho dovuto usare Gemini per capire.

## Teoria

* [Chat con Gemini](https://share.gemini.google/B9MhmM4DlMsB)
* Per lo stack degli ambienti, [[Valutazione#Small-step|Valutazione>Small-step]]
## Concetto semplificato

### Stack di ambienti

Ricordiamo che l'ambiente è una funzione che prende in input un identificatore e rende in output il valore corrente corrispondente. Scriviamo $\bot$ per l'ambiente vuoto, $\delta$ per un ambiente generico, e $\delta[x/k]$ per un ambiente che è identico a $\delta$ ma con la differenza che $x$ vale $k$.

Vediamo dello pseudocodice:

```JS showLineNumbers
function f(x) {
	return x-1
}
function g(x) {
	return x+x
}
function h(x) {
	return f(g(x+1))
}
function main() {
	a=3
	b=h(a)
}
```

Assumendo che questo pseudolinguaggio segua un po' le regole del C, cosa succede quando eseguo `main()`? Si parte dall'ambiente vuoto, $\bot$. Viene poi fatta l'associazione `a=3`, quindi il nostro ambiente è $\bot[a/3]$. Poi entriamo in `h()`.

Cosa succede qua? Logicamente, la variabile `a` non esiste più. Però il parametro `x` assume il valore `3`. Quindi abbiamo un nuovo ambiente $\bot[x/3]$. Noi non vogliamo dimenticare l'ambiente di prima, perché ci servirà di nuovo quando usciremo da `h()` e rientreremo in `main()`. Lo mettiamo da parte, sotto forma di stack: la cima dello stack è l'ambiente corrente, e tutti quelli sotto sono quelli di prima. Quando entro in un nuovo ambiente faccio push, e quando esco faccio pop per tornare a quello vecchio.

Se gli ambienti si indicano con $\delta$, le pile di ambienti si indicano con $\Delta$. Darò nomi solo a quelle utili.

Vediamo quindi come si evolve la pila degli ambienti (non scritta come dice Pinna ma in modo comprensibile):$$\begin{matrix*}[l]
\text{Funzione} & \text{Istruzione} & \text{Stack}\\
main() & & \bot\\
main() & a=3 & \bot[a/3]\\
main() & h(3) & \bot[a/3]\\
h(x) & g(3+1) & \underset {\bot[a/3]} {\bot[x/3]}\\
g(x) & return\ 4+4 &  \underset {\underset {\bot[a/3]} {\bot[x/3]}} {\bot[x/4]}\\
h(x) & f(8) & \underset {\bot[a/3]} {\bot[x/3]}\\
f(x) & return\ 8-1 & \underset {\underset {\bot[a/3]} {\bot[x/3]}} {\bot[x/8]}\\
h(x) & return\ 7 & \underset {\bot[a/3]} {\bot[x/3]} \\
main() & b=7 & \bot[a/3][b/7]
\end{matrix*}$$Vediamo che quando siamo dentro `f(x)`, abbiamo la nozione corrente di `x=8`, ma ci ricordiamo anche che quando torniamo alla funzione chiamante lei ha che `x=3` (e lei si deve ricordare che la funzione prima ancora ha che `a=3`).
### Scope dinamico

Diciamo che abbiamo il corpo del codice con `g(){}; f(){g()};`. Quando entriamo dentro `f()`, nello stack degli ambienti c'è l'ambiente di `f()`, scriviamolo $\delta_f$. Poi entriamo dentro `g()`, e lì lo stack degli ambienti è $\underset {\delta_f} {\delta_g}$.
Se `g()` vuole leggere il valore della variabile `x`, lo cerca prima in $\delta_g$, e se non lo trova lì lo cerca in $\delta_f$ (e se ci fosse altro continuerebbe verso il basso). Gli assegnamenti di `x` poi restano dentro $\delta_f$ se non dichiaro una nuova `x` in `g`, quindi se ho $\langle a=a+1,\ \underset{\bot[a/3]}{\bot}\rangle$ ne risulta $\underset{\bot[a/4]}{\bot}$, e non $\underset{\bot[a/3]}{\bot[a/4]}$.

Vediamo il binding. Prima di tutto un estratto dalla risposta di Deepseek che magari può aiutare a ricordare:
#### Shallow binding

Questa è la parte incomprensibile, si spera che diventi più comprensibile facendo gli esercizi. Con lo shallow binding, quando una funzione viene passata come parametro, il suo ambiente è deciso al momento in cui viene eseguita.

Cioè, io quando passo $g$ passo solo $g$. Quindi se ho una cosa del genere:

```JS
function h(fun, val) {
	k=2
	return fun(val)
}
function g(x) {
	return x+k+1
}
function f() {
	k=3
	return h(g,1)
}
```

Quindi lo stack di $g$ sarebbe $\underset{\underset{\delta_f=\bot[k/3]}{\delta_h=\bot[fun/g][val/1][k/2]}}{\delta_g=\bot[x/1]}$ e restituirebbe $1+2+1=4$.

#### Deep binding

Col deep binding invece, l'ambiente viene deciso quando la funzione viene passata. Cioè, quando passo $g$, in realtà passo la coppia $(g,\Delta)$, e quel "$\Delta$" si riferisce effettivamente a una struttura dati che viene salvata nel momento in cui passo la funzione, quindi se tra quando passo `g` e quando la eseguo ci sono cambiamenti in quell'ambiente, non avranno effetto su `g`.

Nell'esempio di prima, $g$ avrebbe $\underset{\delta_f=\bot[k/3]}{\delta_g=\bot[x/1]}$ e restituirebbe $1+3+1=5$. Partirebbe dallo stack di $f$ perché la coppia $(g,\Delta)$ è stata generata in $f$.

Diciamo che si chiama "deep binding" perché $g$ resta legato al suo $\Delta$ fino alla fine, anziché prendere il primo $\Delta$ che trova quando gli serve.

### Scope statico

#### Scope statico con passaggio per riferimento


## Esercizi

