---
cssclasses: lip
---
## Teoria

* [[Semantica]]
* [[Aritmetica non Tipizzata]]
* [[Stili di semantica]]
* [[Macchina SECD]]
* [[Linguaggio imperativo]]

## Concetto semplificato

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
## Esempi

#modulo