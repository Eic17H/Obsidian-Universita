# Proprietà

## Commutatività

$α \lor β \vdash_{ND} β \lor α$. Abbiamo una disgiunzione già pronta, l'unico modo per usarla è eliminarla.

Assunzioni. Assumiamo $α\lorβ$. Abbiamo due casi: vale $α$ o vale $β$, quindi assumiamo quei due e poi li dobbiamo chiudere. Ma con l'introduzione, posso derivare la mia conclusione da entrambe, che mi permette di chiudere le assunzioni aggiunte e tenere solo quella che mi serviva.$$\dfrac{\begin{matrix}α\lorβ & \dfrac{[α]_1}{β\lorα}VI(b) & \dfrac{[β]_2}{β\lorα}VI(a)\end{matrix}}{β\lorα}VE_{1,2}$$

## Associatività

$α \lor (β\lorγ) \vdash_{ND} (α\lorβ)\lorγ$

La struttura ci dà sempre un indizio. L'assunzione ha una disgiunzione, che quindi va smontata perché altrimenti non me ne faccio niente.$$\begin{matrix}α\lor(β\lorγ) & α & β\lorγ\end{matrix}$$Da qui come procedo? A sinistra, posso ricavarmi un pezzo della disgiunzione finale con l'introduzione, e poi introduzione di nuovo finisco.$$\begin{matrix}α\lor(β\lorγ) & \dfrac{\dfrac{α}{α\lorβ}VI(a)}{(α\lorβ)\lorγ}VI(a) & β\lorγ\end{matrix}$$Ora il problema è che il secondo caso ha una disgiunzione, e quindi devo smontare anche quella. Quindi nel secondo caso distinguiamo due sottocasi. Arriviamo alla fine alternando l'introduzione a e b in ordine diverso.$$\begin{matrix}α\lor(β\lorγ) & \dfrac{\dfrac{α}{α\lorβ}VI(a)}{(α\lorβ)\lorγ}VI(a) &
\begin{matrix}β\lorγ & \dfrac{\dfrac{β}{α\lorβ}VI(b)}{(α\lorβ)\lorγ}VI(a) & \dfrac{γ}{(α\lorβ)\lorγ}VI(b)\end{matrix}
\end{matrix}$$Possiamo tirare le somme una prima volta. A destra, abbiamo ricavato una soluzione identica in entrambi i casi, quindi possiamo eliminare e chiudere.$$\begin{matrix}α\lor(β\lorγ) & \dfrac{\dfrac{α}{α\lorβ}VI(a)}{(α\lorβ)\lorγ}VI(a) &
\dfrac{\begin{matrix}β\lorγ & \dfrac{\dfrac{β}{α\lorβ}VI(b)}{(α\lorβ)\lorγ}VI(a) & \dfrac{γ}{(α\lorβ)\lorγ}VI(b)\end{matrix}}{(α\lorβ)\lorγ}VE_{1,2}
\end{matrix}$$A questo punto, potremmo pensare di aver finito. Però, ci sono ancora assunzioni da chiudere. Come facciamo? Guardiamo meglio: a destra abbiamo ricavato $(α\lorβ)\lorγ$, a destra l'abbiamo ricavato da $β\lorγ$, quindi eliminiamo e abbiamo finito.$$\dfrac{\begin{matrix}α\lor(β\lorγ) & \dfrac{\dfrac{[α]_3}{α\lorβ}VI(a)}{(α\lorβ)\lorγ}VI(a) &
\dfrac{\begin{matrix}[β\lorγ]_4 & \dfrac{\dfrac{β}{α\lorβ}VI(b)}{(α\lorβ)\lorγ}VI(a) & \dfrac{γ}{(α\lorβ)\lorγ}VI(b)\end{matrix}}{(α\lorβ)\lorγ}VE_{1,2}
\end{matrix}}{(α\lorβ)\lorγ}VE_{3,4}$$

Apriamo e chiudiamo la parentesi. Franz Berto fa una battuta sulle assunzioni che dobbiamo tenere e quelle che dobbiamo chiudere. Le prime sono assunzioni a tempo indeterminato, le seconde assunzioni a tempo determinato.

Altra parentesi. Il calcolo alla Hilbert, così come gli LLM, computano ragionamenti in modo molto diverso dal nostro, a noi risulta poco intuitivo, e macchinoso, ma produce gli stessi risultati. La deduzione *naturale* invece somiglia più al nostro ragionamento.

# Esempi

## Con l'implicazione

$\vdash_{ND} (α\rightarrowγ)\lor(β\rightarrowγ)\rightarrow(α\lorβ\rightarrowγ)$

Come facciamo adesso? Smontiamo l'implicazione, quindi guardiamo quella principale e prendiamo il suo antecedente, poi guardiamo il conseguente e prendiamo l'antecedente.
* $(α\rightarrowγ)\lor(β\rightarrowγ)$
* $α\lorβ$

Lì abbiamo una disgiunzione, quindi potremmo fare un'eliminazione, modus ponens e rimontare l'altra.$$\dfrac{\dfrac{\dfrac{\begin{matrix}
[α \lor β]_3
&
\dfrac{[α]_1 \;\; \dfrac{[(α\rightarrowγ)\lor(β\rightarrowγ)]_4}{α\rightarrowγ}ΛE(a)}{γ}\rightarrow E
&
\dfrac{[β]_2 \;\; \dfrac{[(α\rightarrowγ)\lor(β\rightarrowγ)]_4}{β\rightarrowγ}ΛE(b)}{γ}\rightarrow E
\end{matrix}}{γ}VE_{1,2}}{α\lorβ\rightarrowγ}\rightarrow I,3}{(α\rightarrowγ)\lor(β\rightarrowγ)\rightarrow(α\lorβ\rightarrowγ)}\rightarrow I,4$$

## Con l'implicazione

Vediamo un'altra equivalenza che vale in logica classica. Non l'abbiamo esplicitamente affrontata, però $α\lorβ \leftrightarrow (α\rightarrowβ)\rightarrowβ$. Quindi proviamo, $α\lorβ \vdash_{ND} (α\rightarrowβ)\rightarrowβ$.

Assunzione a tempo determinato, $α\rightarrowβ$. Ricordiamo la pinnella, assumiamo tutto quello che vogliamo e poi scartiamo.$$\dfrac{\dfrac{\begin{matrix}
α\lorβ
&
\dfrac{[α]_1 \;\; [α\rightarrowβ]_3}{β}\rightarrow E
&
[β]_2
\end{matrix}}{β}VE_{1,2}}{(α\rightarrowβ)\rightarrowβ}\rightarrow I,3$$

## Con la congiunzione

Tra le proprietà che abbiamo chiamato algebriche c'è anche la distribuzione.

$α \land (β\lorγ) \vdash_{ND} (α\landβ)\lor(α\landγ)$

Un indizio viene proprio dal ragionamento in linguaggio umano. Io so che vale $α$ e vale o $β$ o $γ$. Quindi male che vada, $α$ vale insieme ad almeno uno dei due.

Possiamo estrarre $β\lorγ$ dall'assunzione tutte le volte che vogliamo.$$\begin{matrix}
\dfrac{α\land(β\lorγ)}{β\lorγ}ΛE(b)
&
β
&
γ
\end{matrix}$$Ci manca $α$, come lo ricaviamo? Di nuovo dall'assunzione a tempo indeterminato.$$\begin{matrix}
\dfrac{α\land(β\lorγ)}{β\lorγ}ΛE(b)
&
\dfrac{\dfrac{β \; \; \dfrac{α\land(β\lorγ)}{α}ΛE(a)}{α\landβ}ΛI}{(α\landβ)\lor(α\landγ)}VI(a)
&
\dfrac{\dfrac{γ \; \; \dfrac{α\land(β\lorγ)}{α}ΛE(a)}{α\landγ}ΛI}{(α\landβ)\lor(α\landγ)}VI(b)
\end{matrix}$$Adesso elimino e chiudo$$\dfrac{\begin{matrix}
\dfrac{α\land(β\lorγ)}{β\lorγ}ΛE(b)
&
\dfrac{\dfrac{[β]_1 \; \; \dfrac{α\land(β\lorγ)}{α}ΛE(a)}{α\landβ}ΛI}{(α\landβ)\lor(α\landγ)}VI(a)
&
\dfrac{\dfrac{[γ]_2 \; \; \dfrac{α\land(β\lorγ)}{α}ΛE(a)}{α\landγ}ΛI}{(α\landβ)\lor(α\landγ)}VI(b)
\end{matrix}}{(α\landβ)\lor(α\landγ)}VE_{1,2}$$L'unica assunzione rimata aperta nelle foglie è quella che se lo può permettere, quindi abbiamo finito.

## Con la congiunzione

Lo stesso di prima ma al contrario.

$(α\landβ)\lor(α\landγ) \vdash_{ND} α \land (β\lorγ)$

La logica lineare non è distributiva, perché le assunzioni si spendono. Ma noi siamo in logica classica e abbiamo la distribuzione.

$$\dfrac{\begin{matrix}
(α\landβ)\lor(α\landγ)
&
\dfrac{\dfrac{[α\landβ]_1}{α}ΛE(a) \;\; \dfrac{\dfrac{[α\landβ]_1}{β}ΛE(b)}{β\lorγ}VI(a)}{α\land(β\lorγ)}ΛI
&
\dfrac{\dfrac{[α\landγ]_2}{α}ΛE(a) \;\; \dfrac{\dfrac{[α\landγ]_2}{γ}ΛE(b)}{β\lorγ}VI(b)}{α\land(β\lorγ)}ΛI
\end{matrix}}{α\land(β\lorγ)}VE_{1,2}$$
