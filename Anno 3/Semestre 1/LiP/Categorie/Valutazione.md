---
cssclasses: lip
---
Questo quesito ha un'altra variante, vedi [[SECD]].
## Teoria

* [[Semantica]]
* [[Aritmetica non Tipizzata]]
* [[Stili di semantica]]
* [[Linguaggio imperativo]]

## Concetto semplificato

### Big-step

Avendo compreso il concetto di [[Comune/Regole di inferenza|regola di inferenza]], noi vedremo le regole di inferenza nel contesto della valutazione di un termine. Scriveremo per esempio $let\ x=3\ in\ x+2\rightarrow$ alla radice, costruiremo l'albero verso l'alto fino alla foglia, avendo sempre termini che finiscono con $\rightarrow$. Arrivati alla foglia, riusciremo a mettere qualcosa a destra della sua freccia, e così ripercorreremo l'albero verso il basso per mettere valori a destra della freccia dappertutto fino alla radice.

In realtà, ai nodi avremo una coppie scritte come $⟨\text{formula},\text{contesto}⟩$, dove il contesto è l'associazione tra variabili e valori. Il punto di partenza è il contesto vuoto, scritto come $\bot$. $δ$ è il simbolo di un contesto generico, e se voglio rappresentare un contesto che "è uguale a $δ$, ma con l'aggiunta che $x$ vale $5$", scrivo $δ[x/5]$.

Vediamo delle regole esempio e una loro applicazione semplice. Il professore non dà nomi alle regole ma qui li scrivo per non perderci.

Una regola per le dichiarazioni di variabili, che si comportano come il costrutto `let`/`in` di OCaml:

> $$\dfrac{\langle t_1,δ\rangle\rightarrow v_1 \qquad \langle t_2, δ[x/v_1]\rangle \to v}{\langle let\ x=t_1\ in\ t_2,δ\rangle\rightarrow v}\text{LetIn}$$Vediamo un po' come leggerla. Noi andremo dal basso verso l'alto (bottom-up). Le due espressioni che vediamo sopra sono espressioni che deve essere possibile ottenere dagli assiomi.
> 
> * Posso, in qualche modo, verificare che $\langle t_1,δ\rangle\rightarrow v_1$, cioè che $t_1$ vale un certo $v_1$ nel contesto $δ$? Se sì, allora continuo e applico il resto della regola, altrimenti sono bloccato.
> * Immaginiamo che $v_1$ sia $5$, prendo questo $5$ che ho ottenuto e lo scrivo a destra. Quindi, dato il nostro $t_2$, posso dire che $t_2$ vale un certo $v$ sapendo che $x=5$? Se sì, bene, posso continuare la regola, altrimenti sono bloccato.
> * Immaginiamo che $v$ sia $7$. Adesso posso finalmente scendere verso il basso, e dire che $\langle let\ x=t_1\ in\ t_2,δ\rangle\rightarrow 5$.

Un assioma per utilizzare il valore delle variabili:

> $$\dfrac{}{\langle x,δ[x/v]\rangle\to v}\text{Var}$$Semplicemente, se $x$ vale $v$ nel nostro contesto, e l'espressione da valutare è $x$, allora l'espressione vale $v$.

E un abbastanza simile per le costanti (vale a dire i numeri scritti esplicitamente):

> $$\dfrac{}{\langle c,δ\rangle\to c}\text{Const}$$

Questa me la sto inventando ma serve per fare un esempio veloce:

> $$\dfrac{\langle t, δ \rangle \to v}{\langle t+0, δ \rangle \to v}\text{PlusZero}$$Se $t$ vale $v$, allora $t+0$ vale $v$.

Con queste regole semplici, vediamo un esempio intero:$\newcommand{\aligndown}{\genfrac{}{}{0pt}{0}{}}$

> Partendo dal contesto vuoto, vogliamo valutare $let\ x=5\ in\ x+0$. Costruiamo l'albero partendo dalla radice.$$\dfrac{}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}$$Dobbiamo trovare una regola la cui radice ha una forma che corrisponde a quella che ho scritta qui. L'unica è $\text{LetIn}$.$$\dfrac{\langle 5,δ\rangle\to\ldots \qquad \langle x+0,δ[\ldots] \rangle\to\ldots}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}\text{LetIn}$$La forma è quella, ma al posto dei puntini non sappiamo ancora cosa mettere. L'unico ramo che ha informazioni complete a sinistra del $\to$ è quello sinistro, quindi proseguiamo con quello. La sua struttura è quella della regola $\text{Const}$.$$\dfrac{\dfrac{}{\langle 5,δ\rangle\to5}\text{Const} \qquad \aligndown{\langle x+0,δ[\ldots] \rangle\to\ldots}}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}\text{LetIn}$$Ottenuto un valore lì, la regola $\text{LetIn}$ ci dice dove copiarla (nella formula sarebbe il $v_1$).$$\dfrac{\dfrac{}{\langle 5,δ\rangle\to5}\text{Const} \qquad \aligndown{\langle x+0,δ[x/5] \rangle\to\ldots}}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}\text{LetIn}$$Non possiamo ancora usare il valore della variabile, perché a sinistra non abbiamo $x$ ma $x+0$. Fortunatamente corrisponde a un'altra regola.$$\dfrac{\dfrac{}{\langle 5,δ\rangle\to5}\text{Const} \qquad \dfrac{\langle x,δ[x/5] \rangle\to\ldots}{\langle x+0,δ[x/5] \rangle\to\ldots}\text{PlusZero}}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}\text{LetIn}$$Adesso sì che possiamo valutare quel ramo.$$\dfrac{\dfrac{}{\langle 5,δ\rangle\to5}\text{Const} \qquad \dfrac{\dfrac{}{\langle x,δ[x/5] \rangle\to5}\text{Var}}{\langle x+0,δ[x/5] \rangle\to\ldots}\text{PlusZero}}{\langle let\ x=5\ in\ x+0, \bot \rangle \to \ldots}\text{LetIn}$$E ora propaghiamo verso il basso seguendo le regole a ritroso. Importantissimo: facciamo così, non perché in automatico il valore a destra della freccia si copia all'infinito in basso, ma perché quegli slot hanno la stessa metavariabile a ogni passo, cioè attraversando la riga del $\text{PlusZero}$ copio il valore dallo slot $v$ all'altro slot $v$. E lo stesso vale per la regola $\text{LetIn}$.$$\dfrac{\dfrac{}{\langle 5,δ\rangle\to5}\text{Const} \qquad \dfrac{\dfrac{}{\langle x,δ[x/5] \rangle\to5}\text{Var}}{\langle x+0,δ[x/5] \rangle\to5}\text{PlusZero}}{\langle let\ x=5\ in\ x+0, \bot \rangle \to 5}\text{LetIn}$$Finito.

### Small-step

Questa è più difficile da capire, quindi la vediamo in funzione delle sue differenze dalla big-step.

Nella big-step, noi valutiamo un termine in un singolo passaggio di valutazione: $\newcommand{\ifthenelse}[3]{\textbf{if } #1 \textbf{ then } #2 \textbf{ else } #3}\newcommand{\letin}[2]{\textbf{let } #1 \textbf{ in } #2}\newcommand{\apply}{\textbf{apply}}\newcommand{\fun}{\textbf{fun}}\langle \letin{x=t}{x+0}, \bot \rangle \to 5$. C'è una sola freccia, è un solo passaggio. L'albero di derivazione che c'è sopra è la *giustificazione* di quella valutazione, ma il passaggio vero e proprio è uno solo.

Più informalmente, è come $(2+3)\cdot4\to20$: è semplicemente vero, poi possiamo entrare più nel dettaglio dicendo che $2+3\to5$ e che $5\cdot4\to20$, ma il passaggio che ci interessa è quello di sopra.

Con la small step invece, facciamo $\newcommand{\too}{\rightsquigarrow}(2+3)\cdot4\too5\cdot4\too20$, che se ci pensi è come lo scriveresti normalmente, solo che al posto di usare $\too$ useresti $=$ (che il professore ti dice che è sbagliato).

Allora come usiamo le regole di inferenza? Ogni passaggio, ogni occorrenza di $\too$, ha il proprio albero di derivazione. In realtà la maggior parte delle derivazioni hanno solo uno o due nodi, quindi non li scriviamo neanche come tali: scriviamo invece tutte le radici in sequenza, e se ci sono delle foglie le scriviamo di fianco alla radice corrispondente.

Per capirci, questo:$$\dfrac{}{p_1 \too p_2}(a1), \dfrac{}{p_2 \too p_3}(a2), \dfrac{\dfrac{}{p_a \too p_b}(a3)}{p_3 \too p_4}(r3), \dfrac{}{p_4 \too p_5}(a4)$$Diventa questo:$$\begin{matrix*}[l]
\begin{matrix*}[l]
p_1 & \too & (a1) \\
p_2 & \too & (a2) \\
p_3 & \too & (r3) \\
\end{matrix*}
\\
\qquad \text{questa usa la regola }(a3):p_a \too p_b \\
\begin{matrix*}[l]
p_4 & \too & (a4) \\
p_5
\end{matrix*}
\end{matrix*}$$Qui ho numerato assiomi e regole di inferenza, ma questa volta anche il prof le numera. Sorprendentemente, la seconda versione è più difficile da digitare in LaTeX, almeno col metodo (orrendo) che ho usato finora. La cosa fondamentale qui, è che vietiamo assolutamente alberi con più di due nodi; quindi, anche se trovi qualcosa che può fare uno step di valutazione, se richiede più di due nodi, allora non lo fai, invece fai fare uno step alle parentesi interne.

Questi $p_n$ sono coppie della forma $\newcommand{\llangle}{⟪}\newcommand{\rrangle}{⟫} \llangle t,\Delta\rrangle$, dove $t$ è un termine e $\Delta$ è una pila (stack) di ambienti. Cioè? Probabilmente dovrei metterlo in un documento a parte solo per la teoria, ma essenzialmente quando cominciamo un nuovo blocco (nel nostro caso con $\textbf{let in}$), praticamente stiamo cambiando l'ambiente. Però quando finisce quel blocco, vogliamo tornare al vecchio ambiente. Quindi all'inizio del blocco pushamo il nuovo ambiente in cima alla pila, usiamo quello come ambiente nel corso del blocco, e poi quando finisce il blocco poppiamo la pila per tornare all'ambiente precedente.$\newcommand{\push}[2]{\underset {#2}{#1}}$

> Esempio molto informale (perché lo scrivo non avendo ancora capito l'argomento). $$\llangle \letin{x=2}{x+2},\bot \rrangle \too \llangle x+2, \push {\bot[x/2]} \bot \rrangle \too \llangle 2+2, \bot \rrangle \too \llangle 4, \bot \rrangle$$Chi decide quando finisce un blocco e posso poppare? Delle regole di inferenza fatte bene, che, essendo questo un esempio molto informale, noi non abbiamo.
## Esempi

### Appello del 10 Luglio 2026

#### Big-step

$$
\begin{matrix}
\dfrac{}{\langle x, \delta \rangle \to \delta(x)}Α \qquad
\dfrac{}{\langle c, \delta \rangle \to c}Β \qquad
\dfrac{}{\langle \fun(x,t),\delta\rangle\to \fun(x,t)}Γ \\
\dfrac{\langle t_1,\delta\rangle \to v_1 \qquad \ldots\ldots \qquad \langle t_{a_{i}}, \delta \rangle v_{a_{i}}}{\langle op_i (t_1, \ldots, t_{a_i}),\delta \rangle \to \widetilde{op}(v_1,\ldots,v_{a_i})}Δ \\
\dfrac{\langle t_0, \delta \rangle \to true \qquad \langle t_1,\delta\rangle\to v}{\langle\ifthenelse{t_0}{t_1}{t_2},\delta\rangle\to v} Ε \qquad
\dfrac{\langle t_0, \delta \rangle \to false \qquad \langle t_2,\delta\rangle\to v}{\langle\ifthenelse{t_0}{t_1}{t_2},\delta\rangle\to v} Ζ \\
\dfrac{\langle t_1,\delta\rangle\to \fun(x,t) \qquad \langle t_2,\delta \rangle \to v' \qquad \langle t,\delta[x/v']\rangle\to v}{\langle \apply(t_1,t_2),\delta \rangle \to v}Η \\
\dfrac{\langle t_1,\delta \rangle \to v_1 \qquad \langle t_2,\delta[x/v_1]\rangle \to v}{\langle \letin{x=t_1}{t_2},\delta\rangle\to v}Θ
\end{matrix}$$
Cosa significano? In ordine, gli assiomi per valutare variabili, costanti e funzioni già pronti, la regola per valutare operatori, le regole dei condizionali, la regola dell'applicazione di funzione, e la regola della dichiarazione di una variabile (cambiamento dell'ambiente).

C'era un errore di battitura che ho corretto. Ho anche aggiunto dei nomi alle regole per chiarezza, lui non te li dà.

Vediamo l'esempio dato prima dell'esame. Farò un tentativo io, poi copierò quello fornito.

$$\dfrac{
\dfrac{}{\langle \fun(x,x), \bot \rangle \to \fun(x,x)}Γ
\qquad
\dfrac{
\dfrac{}{\langle f, \bot[f/\fun(x,x)]\rangle \to \fun(x,x)}Α
\qquad
\dfrac{}{\langle 1, \bot[f/\fun(x,x)] \rangle \to 1}Β
\qquad
\dfrac{}{\langle x, \bot[f/\fun(x,x)][x/1]\rangle \to 1}Α
}{\langle \apply(f,1), \bot[f/\fun(x,x)] \rangle \to 1}Η
}{\langle\letin{f=\fun(x,x)}{\apply(f,1)},\bot\rangle\to 1} Θ$$
Ed è giusta, deve dare $1$. Alla fine si nota anche, sarebbe $\lambda x.x\ 1$ che ovviamente dà $1$.

Lui l'ha fatta uguale, solo che anziché scrivere ogni volta $\bot[f/\fun(x,x)]$ ha scritto $\delta$ nella formula e $\delta = \bot[f/\fun(x,x)]$ sotto. Stessa cosa con $\delta' = \bot[f/\fun(x,x)][x/1]$, ma avendo seguito Istituzioni di Logica a me piace scriverlo per intero, almeno qui. Su carta non c'è spazio neanche scrivendolo abbreviato, non so davvero come si aspetti che riusciamo a farlo. Io all'esame ho dovuto usare asterischi e cose del genere per farcelo stare.

#### Small-step

Come primo tentativo, userò la notazione sbagliata per avere qualcosa di familiare. E per ora non ho voglia di copiare tutte le regole, prima o poi lo farò.

$$
\dfrac{}{\llangle \letin{f=fun(x,x)}{\apply(f,1)},\ push(\bot,emptystack)\rrangle \too \llangle funblock(\apply(f,1)),\push{\bot[f/fun(x,x)]}{\bot}\rrangle}(13),\qquad
\dfrac{\dfrac{}{\llangle \apply(f,1),\push{\bot[f/fun(x,x)]}{\bot} \rrangle \too \llangle \apply(fun(x,x),1),\push{\bot[f/fun(x,x)]}{\bot} \rrangle}(1)}{\llangle funblock(\apply(f,1)),\push{\bot[f/fun(x,x)]}{\bot}\rrangle \too \llangle funblock(\apply(fun(x,x),1)),\push{\bot[f/fun(x,x)]}{\bot} \rrangle}(10)
$$
Per ora mi arrendo qui. Sembra giusto. Ma ho capito perché si usa quell'altra notazione.

$$
\begin{matrix*}[l]
\Delta = push(\bot,emptystack) \\
\Delta' = push(top(\Delta[f/fun(x,x)],\Delta))\\
\Delta'' = push(top(\Delta'[x/1],\Delta')) \\
\\
\begin{matrix*}[l]
\llangle \letin{f=fun(x,x)}{\apply(f,1)},\ \Delta \rrangle & \too & (13)\\
\llangle funblock(\apply(f,1)),\Delta' \rrangle & \too & (8) \\
\qquad\text{Usando la regola }(1): \llangle f, \Delta'\rrangle \too \llangle fun(x,x),\Delta'\rrangle \\
\llangle funblock(\apply(fun(x,x),1)),\Delta'\rrangle & \too & (7) \\
\llangle funblock(funblock(x)),\Delta''\rrangle & \too & (10) \\
\qquad\text{Usando la regola }(1): \llangle x, \Delta'' \rrangle \too \llangle 1, \Delta '' \rrangle \\
\llangle funblock(funblock(1)),\Delta'' \rrangle & \too & (11) \\
\llangle funblock(1),\Delta' \rrangle & \too & (11) \\
\llangle 1, \Delta \rrangle
\end{matrix*}
\end{matrix*}$$
Perché il primo passaggio è $(13)$ e non $(12)$? Credo che sia perché $fun(x,x)$ non può essere valutato, quindi non potresti avere $fun(x,x)\too\ldots$ sopra nella $(12)$ perché non compare in nessuna regola.

Perché al secondo passaggio non posso usare la $(10)$? Perché richiederebbe più di due nodi nella derivazione e questo è vietato. Invece, facciamo fare uno step alle parentesi interne.

CE L'HO FATTA. È identica a quella del prof. Dai non è così male. Lo so che questi dovrebbero essere appunti da cui studiare per quelli degli anni dopo ma questa è letteralmente la prima volta che provo a fare questo tipo di esercizio.

#modulo 