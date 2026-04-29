Abbiamo visto finora i sistemi lineari: compaiono variabili al primo grado.

Non vedremo sistemi di equazioni non lineari, ma solo equazioni singole. Le variabili che compaiono sono o elevate con esponenti diversi da $1$, o usate in altre funzioni.

Esempio semplicissimo: $x^2 -2 = 0$.
Esempio meno semplice: $e^{sin(x(log(x^2)))}=0$.

La cosa buffa è che queste due, dal punto di vista di un computer, sono la stessa cosa: si chiede solo se è lineare o no.

La cosa che ci interessa è che tutte queste equazioni sono messe nella forma di $f(x)=0$.

Cosa significa trovare le ==radici== o ==soluzioni== di queste equazioni? Trovare i valori che sostituiti a $x$ rendano vera $f(x)=0$. $\{x \; | \; f(x)=0\}$.

Ricordiamo che in analisi numerica, $f(x)=0$ non vuole dire niente, perché ci saranno sempre errori. Quindi vogliamo dire non che è uguale a $0$, ma che ci si avvicina molto, che è ==molto piccolo==. Come già visto a laboratorio, per esempio $|f(x)| < 10^{-10}$. Lavorando in floating point, chiedersi se due valori sono "uguali" significa chiedersi se sono molto vicini, se la loro differenza è molto vicina a $0$. In generale, scriviamo un valore piccolo come $ε$.

Le troviamo con i [[CSMN/Teoria/Equazioni non lineari/Metodi iterativi|metodi iterativi]]

Rivediamo il primo esempio:$$\begin{matrix}&f(x)&=&x^2-2\\f:&\mathbb R & \rightarrow & \mathbb R \\ & 3 & \rightarrowtail & 7 \\  & 4 & \rightarrowtail & 14 \\ & \sqrt 2 & \rightarrowtail & 0 \\ & - \sqrt 2 \phantom - & \rightarrowtail & 0   \end{matrix}$$
Quando vale $0$? Se vediamo il grafico, vediamo che tocca l'asse delle X in due punti, le radici, ma magari quei punti non sono tra i miei numeri macchina, quindi non prendiamo proprio quei valori, ma quelli molto vicini. Non sarebbe male inserire un grafico qui.

Prendiamo quelle radici *ideali* (che magari non sono numeri che esistono) e le chiamiamo $α$. Creiamo una successione $x^0,x^1,\ldots,x^k,\ldots, \rightarrow α$. Abbiamo quindi l'errore $e^k = x^k - α$, e $\lim\limits_{k \rightarrow \infty} |e^k| = 0$.

> **Ordine di convergenza** p se $$\lim\limits_{k \rightarrow \infty} \dfrac{|e_{k+1}|}{|e_k|^p}=c$$ 

Cioè l'errore relativo è costante a un certo punto. Non si capisce, riscriviamola in un altro modo:$$\lim\limits_{k \rightarrow \infty} |e_{k+1}| = \lim\limits_{k \rightarrow \infty} |e_k|^p\cdot c$$Quindi $p$ indica quanto velocemente converge, perché con $p$ più grande, raggiunge certi valori più in fretta. E a ogni iterazione, aumenta, perché viene riapplicata su sé stessa.

$c$ è la costante asintotica dell'errore. $p=1 \rightarrow c<1$. Non ho capito.

Abbiamo visto il condizionamento. Quanto un errore sui dati influisce sulla soluzione.

[[CSMN/Teoria/Equazioni non lineari/Serie di Taylor|Serie di Taylor]]. Analisi. Ricordi? Ovviamente no.

# Tornando a noi

> Una radice $α$ è semplice se la funzione si può fattorizzare in due funzioni: $f(x)=(x-α)h(x)$, con $h(α)≠0$. Quindi $α$ è una radice di una e non dell'altra, quindi è una radice della parte polinomiale.

Esempio: $f(x)=x^2-5x+6$. Quali sono le radici? $2$ e $3$. Quindi? $f(x)=(x-2)(x-3)$, quindi $α=2$ e $h(x)=x-3$.

> Una radice $α$ ha moltiplicità $m>1$ se $f(x)=(x-α)^mh(x)$ con $h(α)≠0$.

Esempio: $x^2-4x+4$. In questo caso le radici sono $2$ e $2$, sono uguali, infatti si può fattorizzare come $(x-2)(x-2)$, cioè $(x-2)^2(x^0)$.

Informalmente, è il numero di volte che quella radice compare tra le radici. Come con gli autovalori.

Io con queste equazioni non posso stabilire la molteplicità di una radice senza trovare la radice, bisognerebbe andare a bruteforce.

Teorema!!!

# Teorema

> Una radice $α$ ha molteplicità $m$ (compreso il caso $m=1$) se e solo se $f^{(k)}(a)=0, \; \forall k=0,\ldots,m-1$ e $f^{(m)}(a)≠0$.

Quindi la derivata si annulla fino alla $m$esima derivata.

Esempio: $f(x)=x^2-4x+4$, $f(2)=0$, $f'(x)=2x-4$, $f'(2)=0$, $f''(x)=2$, $f''(2)=2$, e ci torna.

## Dimostrazione

Dimostriamo sia il se che il solo se.

### Se

$m=1$: $f(x)=(x-α)h(x)$ e $h(α)≠0$. Voglio dimostrare che $f(α)=0$ ma $f'(α)≠0$.

$f(α)=0$

$f'(x)=h(x)+(x-α)h'(x)$, $f'(α)=h(α)+(α-α)h'(α)=h(α)≠0$, per definizione.

Caso $m=2$: $f(x)=f(x-α)^2h(x)$, $h(α)≠0$.

Vogliamo che $f(α)=0$, e ci siamo. Vediamo se $f'(α)=0$.

$f'(x)=2(x-α)h(x)+(x-α)^2h'(x)$, e quindi $f'(α)=0$ perché c'è $(x-α)$ da entrambe le parti.

La derivata seconda è più complicata, ci escono quattro addendi.

$f''(x)=2h(x)+2(x-α)h'(x)+2(x-α)h'(x)+(x-α)^2h''(x)$. Il primo termine, per ipotesi, non si annulla in $α$.

### e solo se

Usiamo le serie di taylor. $x_0=0$$$f(x)=\dfrac{f(α)}{0!}(x-α)^0+\dfrac{f'(α)}{1!}(x-α)^1+\ldots+\dfrac{f^{(m-1)}(α)}{(m-1)!}(x-α)^{m-1}+\dfrac{f^{(m)}(α)}{m!}(x-α)^{m}+\dfrac{f^{(m+1)}(α)}{(m+1)!}(x-α)^{m+1}+\ldots$$
Guardiamo le frazioni. Sono tutte, per ipotesi, nulle fino a $m$, perché sopra c'è la derivata. Per il resto, raccolgo a fattor comune $(x-α)^m$, che è nulla, e ci escono nella parentesi un sacco di addendi che sono tutti nulli tranne il primo, che è il termine con $m$, perché abbiamo raccolto il suo nulla, e quello diventa il nostro $h(x)$, e quello a sinistra è come l'altro fattore dell'altra formula.

# Condizionamento

Radice semplice ($m=1$): $f(x) = f(α)+f'(ξ)(x-α)$. Una radice, come è $α$, l'ho definita come $|f(x)|<ε$. Lo riscrivo come $|f(α)+f'(ξ)(x-α)|<ε$, ma $f(α)=0$, quindi riscrivendo bene mi esce $|f'(ξ)|\cdot|x-α|<ε$.

Io sto cercando il condizionamento. Cioè, quando guardo *intorno* alla radice nei numeri macchina, quanto mi devo discostare (nella $y$)?

$|x-α|$ è l'errore sulla soluzione, $ε$ è l'errore sui dati. Quindi il mio condizionamento è il primo, $|x-α|=\dfrac{ε}{|f'(ξ)|}$. Invece il numero di condizionamento è $\dfrac{1}{|f'(ξ)|}$.

Frazione. Il numeratore non ci interessa. Il denominatore è un punto critico, perché quando si annulla (cioè, nel nostro caso, si avvicina molto a $0$), succedono cose brutte. E quando succede? Quando la radice è doppia, $m=2$.

Vediamo invece il caso con $m=2$. $f(x)=f(α)+f'(α)(x-α)+\dfrac{f''(ξ)}{2!}(x-α)^2$. Le prime due si annullano, quindi otteniamo $|\dfrac{f''(ξ)}{2!}(x-α)^2|<ε$, cioè $|x-α|=\sqrt{\dfrac{2ε}{f''(ξ)}}$. Quando è critico? $m=3$.
Guardiamo entrambi. Tra $\dfrac{1}{|f'(ξ)|}$ e $\sqrt{\dfrac{2ε}{f''(ξ)}}$, qual è più grande? Assumendo che le due derivate siano uguali? Il più grande è il secondo. Quindi il numero di condizionamento, l'errore che commetto, è più grande più sale la moltiplicità. È un problema di più difficile risoluzione, non posso sbagliare molto, altrimenti ottengo un risultato che è molto sbagliato.