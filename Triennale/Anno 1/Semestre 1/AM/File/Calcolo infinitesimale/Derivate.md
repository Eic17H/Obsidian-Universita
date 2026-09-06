---
cssclasses: am
---
## Concetto e definizione

Se vuoi trovare la velocità di un oggetto in movimento la cui posizione all'istante di tempo $x$ è data da $f(x)$, allora prendi due istanti di tempo $x_0$ e $x_1$ e trovi la velocità con $\frac{f(x_1)-f(x_0)}{x_1-x_0}$. Se si stava muovendo a velocità costante, trovi quella velocità, altrimenti trovi la velocità media in quel lasso di tempo. Quella frazione si scrive anche come $\frac{Δf(x)}{Δx}$.

Come trovo la velocità istantanea? Spostando $x_1$ il più vicino possibile a $x_0$. Se $x_1=x_0$, staresti dividendo per $0$, ma possiamo invece fare il [[Limiti|limite]]. Se esprimiamo $x_1$ come $x_0+h$, dove $h$ è la lunghezza del lasso di tempo, otteniamo:$$\lim\limits_{h\to0}\dfrac{f(x+h)-f(x)}{h}$$
Questa è la formula che ci dà la *velocità istantanea*.

Possiamo applicare lo stesso procedimento a tutte le funzioni, non solo una che concettualmente mette in relazione posizione e tempo.

Se chiamiamo $v(x)$ la funzione che dato il tempo ci dà la velocità istantanea, diciamo che $v(x)$ è la ==*derivata*== di $f(x)$.

Se tracciamo il grafico, vediamo che $v(x_0)$ è il valore del coefficiente angolare della retta tangente a $f(x)$ nel punto $(x_0, f(x_0))$. E ha senso, perché se il grafico è molto verticale vuole dire che il valore della funzione sta cambiando molto velocemente.

Una derivata positiva significa che la funzione sta aumentando, una derivata negativa significa che la funzione sta diminuendo.

Possiamo anche fare la derivata della derivata (==*derivata seconda*==). Per ricordarlo, una derivata seconda positiva (bene) indica che la funzione è a forma di sorriso, una derivata seconda negativa (male) indica che è a forma di broncio. Se invece è nulla, punta in alto da un lato e in basso dall'altro.
## Notazione

Abbiamo detto che la derivata di una funzione $f$ è definita così:$$\lim\limits_{h\to0}\dfrac{f(x+h)-f(x)}{h}$$
Possiamo riprendere quella notazione $Δ$ per una variazione discreta e usare $d$ come suo equivalente continuo, scrivendo quindi $\frac{df(x)}{dx}$, o più comunemente $\frac{d}{dx}f(x)$. Possiamo anche abbreviare $\frac{d}{dx}$ con $D$, ottenendo $Df(x)$.

Un modo più comune è di scrivere $f'(x)$.

Se vogliamo fare la derivata seconda, possiamo scrivere $\frac{d^2}{dx^2}f(x)$. $D^2f(x)$, $f^{(2)}(x)$ o $f''(x)$.
## Formule per funzioni specifiche
### Somma

Diciamo che $f(x)=g(x)+s(x)$. Allora $f'(x)=g'(x)+s'(x)$. Vediamo perché.$$\begin{matrix*}[l]
\lim\limits_{h\to0}\dfrac{f(x+h)-f(x)}{h}
& = \\ \lim\limits_{h\to0}\dfrac{g(x+h)+s(x+h)-g(x)-s(x)}{h}
& = \\ \lim\limits_{h\to0}\dfrac{g(x+h)-g(x)+s(x+h)-s(x)}{h}
& = \\ \lim\limits_{h\to0}\dfrac{g(x+h)-g(x)}{h}+\dfrac{s(x+h)-s(x)}{h}
& = \\ \lim\limits_{h\to0}\dfrac{g(x+h)-g(x)}{h}+\lim\limits_{h\to0}\dfrac{s(x+h)-s(x)}{h}
&=\\ g'(x)+s'(x)
\end{matrix*}$$
In poche parole, è perché la derivata è espressa come una frazione (che è un prodotto), e quindi ne eredità la proprietà distributiva sulla somma.
### Potenze di $x$

Vediamo prima cosa risulta dalla definizione di derivata, poi troviamo una generalizzazione che ci dà una regola molto semplice, e da ora in poi usiamo solo quella regola.
#### Quadrato

Vediamo il quadrato, quindi $f(x)=x^2$:
$$\begin{matrix*}[l]
   \dfrac{(x+h)^2-(x)^2}h
& = \\ \dfrac{\cancel{x^2}+2hx+h^2 \cancel{- x^2}}h
& = \\ \dfrac{2hx + h^2}h
& = \\ \dfrac{(2x+h)\cancel{h}} {\cancel h}
& = \\ 2x+h
\end{matrix*}$$
Rimettendolo nel limite:$$\dfrac{d}{dx}x^2=\lim\limits_{x\to\infty}2x+h=2x$$
#### Cubo
$$\begin{matrix*}[l]
   \dfrac{(x+h)³ - x³} h
& = \\ \dfrac{\cancel{x³} + 3x²h + 3xh² + h³ \cancel{- x³}} h
& = \\ \dfrac{3x²\cancel h + 3xh^{\cancel 2} + h^{\cancel23}} {\cancel h}
& = \\ 3x² + 3xh + h²
\end{matrix*}$$
Di nuovo, nel limite si annullano tutti i termini che contengono $h$ e rimane solo $3x^2$.

#### Generalizzazione

Rimane lo stesso concetto. Per $x^n$:
* C'è un $-x^n$ alla fine del numeratore che annulla quello di $(x+h)^n$;
* Il resto del numeratore è della forma $\sum\limits_{a=1}^n \binom n a x^a h^{n-a}$;
* Visto che c'è $h$ al denominatore, si semplifica in $\sum\limits_{a=1}^n \binom n a x^a h^{n-a-1}$;
* L'unico termine che non viene annullato dal limite è quello con $h^0$, che sarebbe quello con $n-a-1=0$, cioè $a=n-1$;
* $\binom {n}{n-1} = n$.

Quindi il termine è $nx^{n-1}$, come volevasi dimostrare.

La stessa regola si applica anche se n non è un numero naturale, come $\sqrt{x} = x^{\frac12}$ e $\dfrac1x=x^{-1}$.

### Prodotto e rapporto
$$\dfrac{d}{dx}f(x)\cdot g(x)=f'(x)\cdot g(x)+f(x)\cdot g'(x)$$
$$\dfrac{d}{dx}\dfrac{f(x)}{g(x)}=\dfrac{f'(x) \cdot g(x)-f(x) \cdot g'(x)}{(g(x))^2}$$
Non vediamo la dimostrazione perché non lo rende più intuitivo.

Per avere un minimo di intuizione sul rapporto, però, possiamo dire che il segno $-$ sopra e il quadrato al denominatore ricordano la derivata di $\frac1x$.

### Combinazione

$$\dfrac{d}{dx}f(g(x)) = f'(g(x))\cdot g'(x)$$

### Funzioni trigonometriche

$sin'(x)=cos(x)$ e $cos'(x)=-sin(x)$, il resto lo derivi da quello. La dimostrazione usa le formule goniometriche.