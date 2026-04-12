---
cssclasses:
  - csmn
---
I numeri decimali non possono essere memorizzati sempre esattamente su un calcolatore. L'opzione migliore per risparmio di memoria è la <span class="fdi">[[Numeri binari|virgola mobile]]</span>.

Vediamo la memorizzazione di alcuni numeri.

Prima di tutto, voglio sapere quali sono il più piccolo e il più grande rappresentabile. Se richiedo la normalizzazione di un numero $0.d_1d_2d_t..._\beta\beta^p$ con $d_1\neq0$, allora $\beta^{-1}\leq m\leq\beta^{-\tau}$, dove $m$ è la mantissa. Quindi $\beta^{p-1}\leq|x|\leq\beta^{p-\tau}$.

Cosa significa lavorare con dei numeri su un calcolatore? Significa formalmente rimpiazzare il numero $x$ con una sua rappresentazione. Visto che l'abbiamo chiamata *rappresentazione floating point*, la chiamiamo $fl(x)$. Cioè, la funzione $fl()$ prende un numero reale e mi fornisce la sua rappresentazione su un computer. $\mathbb{R} \rightarrow \mathbb{F}, x \rightarrowtail fl(x)$. Ci sono più casi:

* $|x| \in \mathbb{F}$: $x = fl(x)$
* $|x| \leq \beta^{L-1}$: $x \equiv 0$, flush to zero, underflow. Possiamo anche avere gradual underflow, cioè abbandoniamo la normalizzazione per rappresentare numeri più piccoli, quindi il numero minore rappresentabile diventa $b^{L-t}$, scrive $τ$ ma forse è la $t$ nella sua scrittura, da capire
* $|x| \geq \beta^U$: $x\equiv\infty$, overflow.
* Caso più interessante, $\beta^{L-1} \leq |x| \leq \beta^U$ ma $x \notin \mathbb{F}$, cioè ha più cifre significative di quante ne consente la memorizzazione. quindi $x = (0.d_1d_2...d_td_{t+1}d_{t+2}...)_\beta\beta^p$

MatLab non dà errore né con underflow né con overflow, vanno controllati con tecniche di programmazione per produrre warning o errori. inf come valore non darà mai errore.

Comunque nel quarto caso ci sono due opzioni: troncamento e arrotondamento.

## Opzioni

### Troncamento

$fl(x)=Trunc(x)=(0.d_1d_2...d_t)_\beta\beta^p$

L'errore assoluto $ε = |x-fl(x)|$, cioè $x$ con $d_1...d_t=0$. Qual è il numero grande di quel tipo? Quello dove $d_i=9 \forall 1 \leq i \leq t$, che sicuramente è minore di $x$ con $d_i=0\forall 1 \leq i \neq t$. Ma quello lì cos'è? Proprio $\beta^{p-t}$, quindi $ε$ è sicuramente minore di quello. Però $fl(x)$ sarà sempre minore di $x$, siamo nel quarto caso.

Essenzialmente la distanza tra due numeri macchina successivi è lo stesso dell'errore, perché diciamo che se $x$ si avvicina infinitamente al prossimo numero viene comunque troncato e mandato a quello precedente, essenzialmente, intuitivamente.

L'errore relativo invece? Terza elementare: Ho $\dfrac{2}{3}$, come posso trovare una frazione più grande? Aumentando il numeratore o diminuendo il denominatore, cioè $\dfrac{4}{3}$ o $\dfrac{2}{2}$, $\dfrac{2}{3}<\dfrac43<\dfrac42$. Quindi, $ε=\dfrac{|x-fl(x)|}{|x|}$. $|x|$ abbiamo detto che è sicuramente più grande di $β^{p-1}$, e l'errore assoluto abbiamo detto che è $β^{p-t}$, facciamo la frazione e otteniamo $\dfrac{β^{p-t}}{β^{p-1}} = β^{1-t}$. Notiamo come l'errore relativo dipende solo dal numero di cifre significative, cioè $t$, cioè la precisione, e non da $x$.

Il problema è che $fl(x) \leq x$, sempre, quindi l'errore è sempre $\leq 0$, anche se $x$ è infinitamente vicino al successivo numero macchina. Vediamo quindi che è sempre meglio arrotondare al numero macchina più vicino, dimentichiamo tutta questa cavolata del troncamento perché non ha senso farla quando esiste l'arrotondamento.

### Arrotondamento

$fl(x) = (0.d_1d_2...\overline{d_t})_ββ^p$, dove $$\overline{d_t}= \left\{ \begin{matrix}
d_t & se & d_{t+1}<\dfracβ2 \\
d_t+1 & se & d_{t+1} \geq \dfracβ2
\end{matrix} \right.$$Per esempio, con $0.1245$, $4$ diventa $5$, però con $0.1243$, $4$ resta $4$. Mettiamoci in testa che il $5$ si approssima **per eccesso**.

Quindi l'errore che si commette è la metà di quello di prima, perché a metà tra un numero macchina e l'altro, il valore assoluto dell'errore comincia a diminuire anziché continuare ad aumentare. Questa quantità ha un nome particolare: $u=\dfrac12β^{1-t}$, e si chiama *errore unitario*, il massimo errore che si commette quando si memorizza un numero in un computer.

Il doppio di questo, $ε_m$, èla precisione di macchina (*machine epsilon*). Su MatLab se ne ottiene il valore dalla variabile predefinita `eps`. Una definizione alternativa di $ε_m$ è *il più piccolo numero che sommato a $1$ mi dà un numero diverso da $1$*, che chiaramente con la precisione infinita dei reali non esiste, ma nella precisione finita esiste. $ε_m = min(\{ε|trunc(1+ε)>1\})$.

In un certo intuitivo senso è il più piccolo numero diverso da 0, ma questa definizione lascia un po' il tempo che trova per altri motivi, ma intuitivamente diciamo che in un certo senso possiamo dire che la possiamo vedere così.

## Precisione

I calcolatori moderni usano la precisione doppia, ma è possibile usare la singola precisione.

La singola precisione usa come insieme $F(2,24,-126,128)$ e alloca 32 bit per numero (1 per il segno, 8 per l'esponente, 23 per la mantissa, +1 sottinteso per la mantissa perché $d_1=1$ sempre). In MatLab si usano con `single(x)`.

Di default invece si usa la doppia precisione, $F(2,53,-1022,1024)$, a 64 bit (1 segno, 11 esponente, 52+1 mantissa). $ε_m ≈ 2 \cdot 10^{-16}$.

Per controllare se un numero è nullo, controlliamo se è vicino a $ε_m$, perché non ti uscirà mai che è $=0$, a meno che non gliel'abbia assegnato.

## Esempi

### Lungo

$F(2,3,-1,2)$. I numeri scrivibili sono $\dfrac14, \dfrac12, 1, 2, \dfrac38, \dfrac34, \dfrac32, 3, \dfrac5{16}, \dfrac58, \dfrac54, \dfrac52, \dfrac7{16}, \dfrac78, \dfrac74, \dfrac72, 0$, e i loro negativi. Mettili su una linea dei numeri: sono molto più fitti più ti avvicini a $0$. È un problema.

Oppure no? Beh, è una cosa tipica dell'aritmetica di macchina, è così sempre, non dipende solo da questi parametri. E stiamo considerando solo numeri normalizzati mi raccomando, e infatti c'è un buco tra $0$ e $\dfrac14$. Con quelli non normalizzati, si aggiungono $\dfrac1{16}, \dfrac18, \dfrac14, \dfrac12, \dfrac3{16}, \dfrac38, \dfrac34, \dfrac32$, alcuni ce li avevo già, proprio perché non sono normalizzati e la normalizzazione serve a evitare i duplicati, ma non ci sono solo i duplicati, ottengo nuovi numeri. E questi nuovi numeri sono $\dfrac1{16}, \dfrac18 e \dfrac3{16}$, che posso aggiungere alla mia linea dei numeri tra $0$ e $\dfrac14$, riempiendo un po' questo buco.

Il mio minimo precedente era $β^{L-1}=\dfrac14$, ora è $β^{1-t}$ o qualcosa del genere boh non mi ricordo (parole sue non mie), che appunto è l'epsilon di macchina, ah sì? E infatti $1+\dfrac14=\dfrac54$, che è presente. Ma $1+\dfrac15=\dfrac65$, e $trunc(\dfrac65)=1$. Il primo è l'epsilon di macchina, si intende. Che casino.

Anzi no no aspetta è una coincidenza, quindi $β^{-4}$ cos'è? Di preciso? Da dove viene il $-4$? Chisssaaaaaà. E questo, questo *hint hint wink wink*, si consiglia fare questo esercizio completo completo, e come mai? Chissà, forse forse perché "potrebbe" **essere un esercizio all'esame**? (l'ha detto earrape al microfono ci sarà un motivo). La consegna è scritta nella ~~whiteboard~~ yellowboard.

### Corto

In un sistema $F(10,3,-5,5)$, calcolare $x-y$ con $x=1234.5$ e $y=1234.4$. Avendo 3 cifre significative così come c'è scritto, $x-y=0$, quanto è l'errore? Con invece 4 cifre, quanto è?

Ogni volta che fai un calcolo, fai sempre sempre sempre la normalizzazione per essere sicuro che si possa memorizzare, il senso degli esercizi è quello, vedere cosa fa un computer. un computer con i passaggi intermedi non ottiene magicamente più bit.