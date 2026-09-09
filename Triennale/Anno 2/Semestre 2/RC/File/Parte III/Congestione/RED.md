---
cssclasses: rc
---
Random Early Detection. Uno schema di [[AQM]] usato nelle reti [[TCP-IP|TCP/IP]].

## Concetto informale

Scarta pacchetti con una probabilità che dipende dalla lunghezza media della coda ([[AQL|AQL]]), dal tempo passato dall'ultima cancellazione e da un parametro $p$ che è la probabilità massima.
Si usano due valori, che chiamiamo $min$ e $max$. Se $AQL<min$, non scartiamo pacchetti; se $AQL>max$, li scartiamo tutti; se è in mezzo, scala linearmente da $0\%$ a $p\%$ di probabilità di scartare.
La casualità evita la sincronizzazione e garantisce una gestione equa, e usa poche risorse.

### RED gentle version

Aggiungiamo un secondo intervallo. Se $max<AQL<2max$, allora la probabilità scala linearmente da $p\%$ a $100\%$. Oltre $2max$ rimane a $100\%$.

## Algoritmo

Definiamo le variabili:
* $avg$: lunghezza media coda;
* $q\_time$: quando la coda è diventata vuota;
* $count$: n. pacchetti instradati senza problemi prima che venisse marcato l'attuale pacchetto;
* $w_q$: peso della coda;
* $min_{th}$: limite minimo della coda;
* $max_{th}$: limite massimo della coda;
* $max_p$: valore massimo di $p_b$;
* $p_a$: probabilità che il pacchetto attuale venga marcato;
* $q$: lunghezza attuale della coda;
* $time$: tempo corrente;
* $f(t)$: una funzione lineare da quantità di tempo a numeri reali.

Anche se è definita nel codice, la anticipo:
* $m$: da quanto tempo la coda è vuota, $f(time-q\_time)$.

Non ho capito:
> Il calcolo di questo algoritmo prende in considerazione il periodo di idle della coda, e calcola il numero di pacchetti che potrebbero essere messi in coda durante quel periodo, come se fossero realmente arrivati al router.

Vediamo l'algoritmo:$$\begin{matrix*}[l]
avg=0\\
count=-1\\
\textbf{per ogni }\text{pacchetto in arrivo}\textbf{ do}\\
\qquad \text{// Calcolo AQL:} \\
\qquad
\left[ \begin{matrix*}[l]
\textbf{if }\text{coda non vuota}\\
\qquad avg=(1-w_q)\cdot avg + w_q\cdot q \\
\textbf{else}\text{ (coda vuota)}\\
\qquad m=f(time-q\_time)\\
\qquad avg=(1-w_q)^{m} \cdot avg\\
\end{matrix*}\right.\\
\qquad \text{// Controllo range avg:}\\
\qquad
\left[ \begin{matrix*}[l] count=-1 \\
\textbf{if }min_{th}\leq avg \leq max_{th} \\
\qquad
\left[ \begin{matrix*}[l]
count++\\
p_b= max_p\dfrac{avg-min_{th}}{max_{th}}-min_{th}\\
*\text{(vedi sotto)} \\
p_a = \dfrac{p_b}{1-count\cdot p_b}\\
\textbf{if }rand(p_a) \\
\qquad marca \\
\qquad count=0 \\
\end{matrix*}\right.\\
\textbf{else if }avg \geq max_{th} \\
\qquad 
\left[ \begin{matrix*}[l]
marca \\
count = 0 \\
\end{matrix*}\right.\\
\textbf{else} \\
\qquad 
\left[ \begin{matrix*}[l] count=-1 \\
\end{matrix*}\right.\\
\end{matrix*}\right.\\
\qquad \textbf{if } \text{coda vuota} \\
\qquad \qquad q\_time = time \text{ // } (m=0)
\end{matrix*}$$
Se vogliamo considerare la grandezza della coda in byte anziché in pacchetti, aggiungiamo un'istruzione dove lì c'è l'asterisco:$$p_b = p_b\cdot \dfrac{\text{PacketSize}}{\text{MaxPacketSize}}$$Dove $\text{PacketSize}$ è la grandezza in byte del pacchetto che stiamo considerando. In questo modo, è più probabile marcare il pacchetto se è più grande.

Secondo Copilot, sottolineo secondo Copilot, $avg=(1-w_q)^{m} \cdot avg$ significa che: quando non arrivano pacchetti (quindi la coda è vuota) non può aggiornare $avg$ logicamente, ma tecnicamente sta andando tutto bene, quindi quando la coda è vuota cambia comportamento e usa quel calcolo per simulare un buon andazzo della coda, praticamente per simulare come sarebbe se arrivassero pacchetti che passano bene e non congestionano la rete.