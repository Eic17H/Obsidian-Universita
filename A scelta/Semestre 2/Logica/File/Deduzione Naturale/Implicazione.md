---
cssclasses:
  - logica
---
# Proprietà

## Scambio dell'antecedente

$\vdash_{ND}(α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))$. Che assunzioni vogliamo? Prima di tutto l'antecedente dell'implicazione principale, $α\rightarrow(β\rightarrowγ)$, poi vediamo il suo conseguente e prendiamo il suo antecedente, $β$, poi vediamo il suo conseguente e prendiamo il suo antecedente, $α$, è ricorsiva.$$\dfrac{\dfrac{\dfrac{\dfrac{[β]_2 \enspace \enspace \dfrac{[α]_1 \enspace \enspace [α\rightarrow(β\rightarrowγ)]_3}{β\rightarrowγ}\rightarrow\text{-}E}{γ}\rightarrow\text{-}E}{α \rightarrow γ}\rightarrow\text{-}I,1}{β\rightarrow(α \rightarrow γ)}\rightarrow\text{-}I,2}{(α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))
}\rightarrow\text{-}I,3$$
## Legge di Frege

Legge di Frege: l'implicazione distribuisce su sé stessa, $\vdash_{ND} (α\rightarrow(β\rightarrowγ))\rightarrow((α\rightarrowβ)\rightarrow(α\rightarrowγ))$. Tante implicazioni inscatolate. Per trovare le assunzioni smontiamo gli antecedenti:
* $α\rightarrow(β\rightarrowγ)$
* $α\rightarrowβ$
* $\alpha$
Quindi per esempio, con la terza e la seconda assunzione per modus ponens ottengo $\beta$.

$$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{[α]_1 \enspace\enspace\enspace [α\rightarrowβ]_2}{β}\rightarrow E \enspace\enspace\enspace \dfrac{[α]_1\enspace\enspace\enspace [α\rightarrow(β\rightarrowγ)]_3}{β\rightarrowγ}\rightarrow E}{γ}\rightarrow E}{α\rightarrowγ}\rightarrow I,1}{(α\rightarrowβ)\rightarrow(α\rightarrowγ)}\rightarrow I,2}{(α\rightarrow(β\rightarrowγ))\rightarrow((α\rightarrowβ)\rightarrow(α\rightarrowγ))}\rightarrow I,3$$Nota come l'eliminazione $1$ chiude due foglie, che sono entrambe $α$.

## Converso della legge di Frege

La conversa della legge di Frege. Difficile.

$\vdash_{ND} ((α\rightarrowβ)\rightarrow(α\rightarrowγ))\rightarrow(α\rightarrow(β\rightarrowγ))$

Proviamo le premesse
* $(α\rightarrowβ)\rightarrow(α\rightarrowγ)$
* $\alpha$
* $\beta$
Non possiamo fare nessun modus ponens, perché ci mancano le premesse. Siamo nel campo fiorito della logica classica, quello che ci serve ce lo inventiamo chiudendo l'insieme vuoto.$$\dfrac{β}{α\rightarrowβ}\rightarrow I,\emptyset$$Facile, ora modus ponens$$\dfrac{\dfrac{β}{α\rightarrowβ}\rightarrow I,\emptyset \enspace\enspace\enspace(α\rightarrowβ)\rightarrow(α\rightarrowγ)}{α\rightarrowγ}\rightarrow E$$Poi di nuovo$$\dfrac{α \enspace\enspace\enspace \dfrac{\dfrac{β}{α\rightarrowβ}\rightarrow I,\emptyset \enspace\enspace\enspace(α\rightarrowβ)\rightarrow(α\rightarrowγ)}{α\rightarrowγ}\rightarrow E}{γ}\rightarrow E$$Quindi noi $\beta$ non l'abbiamo usata in un modus ponens, ma l'abbiamo usata per *produrre* un pezzo del modus ponens. Chiudiamo$$\dfrac{\dfrac{\dfrac{\dfrac{[α]_2 \enspace\enspace\enspace \dfrac{\dfrac{[β]_1}{α\rightarrowβ}\rightarrow I,\emptyset \enspace\enspace\enspace[(α\rightarrowβ)\rightarrow(α\rightarrowγ)]_3}{α\rightarrowγ}\rightarrow E}{γ}\rightarrow E}{β\rightarrowγ}\rightarrow I,1}{α\rightarrow(β\rightarrowγ)}\rightarrow I,2}{((α\rightarrowβ)\rightarrow(α\rightarrowγ))\rightarrow(α\rightarrow(β\rightarrowγ))}\rightarrow I,3$$

## A fortiori

Questa è molto veloce ma può dare perplessità. A fortiori. $\vdash_{ND} α\rightarrow(β\rightarrowα)$. Ricordiamo che questa è rigettata dai logici rilevanti perché "non ha senso". Quindi potrebbe anche non avere senso la derivazione.

Le assunzioni sono $α$ e $β$.

Io *posso* introdurre un'implicazione *senza chiudere assunzioni* (o chiudendo l'insieme vuoto di assunzioni). E qui ci servirà farlo, perché insomma, se smontiamo $α$ come facciamo a rimontarlo per rimettercela? Noi potremmo avere un albero di derivazione minuscolo:$$α$$E cos'è? Un albero con un unico nodo che è sia foglia che radice. Quindi abbiamo già risolto. E... e quindi come chiudiamo $β$? Allora, usiamo quell'albero lì sopra che da $α$ deriva $α$. Quindi,$$\dfrac{α}{β\rightarrowα}\rightarrow I, \emptyset$$Ora chiudiamo l'assunzione$$\dfrac{\dfrac{[α]_1}{β\rightarrowα}\rightarrow I, \emptyset}{α\rightarrow(β\rightarrowα)}\rightarrow I,1$$
È stranissimo ma funziona e abbiamo finito.

## Non ricordo come si chiami


$\vdash_{ND} (α\rightarrowβ)\rightarrow((α\rightarrowγ)\rightarrow(β\rightarrow(α\rightarrowγ)))$

Il manuale ci insegna che dobbiamo smontare l'implicazione partendo da quella principale, mettendo gli antecedenti delle assunzioni
* $α \rightarrow β$
* $α\rightarrowγ$
* $β$
* $α$
Vogliamo arrivare a $γ$, facilissimo, seconda e quarta assunzione, modus ponens,$$\dfrac{α \enspace\enspace\enspace α\rightarrowγ}{γ}\rightarrow E$$E poi... Ma vogliamo, insomma, arrivare a quella formulona lì sopra. E questo non ci basta, come facciamo? Procediamo a ritroso, chiudiamo l'assunzione$$\dfrac{\dfrac{[α]_1 \enspace\enspace\enspace α\rightarrowγ}{γ}\rightarrow E}{α\rightarrowγ}\rightarrow I,1$$Eh però così non ha molto senso, avrei a questo punto potuto derivare $α\rightarrowγ$ da sé stesso.

La ***mia*** idea:$$\dfrac{\dfrac{\dfrac{[α]_1 \enspace\enspace\enspace α\rightarrowγ}{γ}\rightarrow E}{α\rightarrowγ}\rightarrow I,1}{β\rightarrow(α\rightarrowγ)}\rightarrow I,\emptyset$$C'è un piccolo problema, quindi il professore l'ha migliorato:$$\dfrac{\dfrac{[α\rightarrowγ]_1}{β\rightarrow(α\rightarrowγ)}\rightarrow I,\emptyset}{(α\rightarrowγ)\rightarrow(β\rightarrow(α\rightarrowγ))}\rightarrow I,1$$E concludiamo aggiungendo l'altro antecedente, ma senza chiudere nessun'assunzione$$\dfrac{\dfrac{\dfrac{[α\rightarrowγ]_1}{β\rightarrow(α\rightarrowγ)}\rightarrow I,\emptyset}{(α\rightarrowγ)\rightarrow(β\rightarrow(α\rightarrowγ))}\rightarrow I,1}{(α\rightarrowβ)\rightarrow((α\rightarrowγ)\rightarrow(β\rightarrow(α\rightarrowγ)))}\rightarrow I,\emptyset$$Finito.

Osservazioni di un collega, ripensiamo ad Hilbert, ovviamente visto che il conseguente è una tautologia, l'antecedente può essere quello che si vuole e sarà tutto vero, che equivale al fatto che chiudere l'insieme vuoto non ha senso.

## Legge di esportazione

Avevamo fatto la tavola di verità di questa tautologia classica, la legge di esportazione.

$\vdash_{ND} (α\landβ\rightarrowγ)\rightarrow(α\rightarrow(β\rightarrowγ))$

Il solito.

Assunzioni
* $\alpha \land \beta \rightarrow \gamma$
* $\alpha$
* $\beta$
Qui è semplice, introduciamo la congiunzione per poter fare il modus ponens e otteniamo l'antecedente chiudendo la seconda e la terza assunzione$$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{[α]_2 \enspace\enspace\enspace [β]_1}{α\landβ}ΛI \enspace\enspace\enspace [α\landβ\rightarrowγ]_3}{γ}\rightarrow E}{β\rightarrowγ}\rightarrow I,1}{α\rightarrow(β\rightarrowγ)}\rightarrow I,2}{(α\landβ\rightarrowγ)\rightarrow(α\rightarrow(β\rightarrowγ))}\rightarrow I,3$$Abbastanza standard, niente di emozionante a questo punto.

Esiste il converso, la legge di importazione, che è comunque una tautologia.

## Legge di importazione

$\vdash_{ND} (α\rightarrow(β\rightarrowγ))\rightarrow(α\landβ\rightarrowγ)$

Siamo messi un po' peggio, perché ci sono implicazioni inscatolate nell'antecedente.

Assunzioni
* $α\rightarrow(β\rightarrowγ)$
* $α\landβ$
Come facciamo il modus ponens? Eliminazione della conseguenza.

$$\dfrac{\dfrac{α\landβ}{α}ΛE(a) \enspace\enspace\enspace α\rightarrow(β\rightarrowγ)}{β\rightarrowγ}\rightarrow E$$Siamo in logica classica, molto semplicemente riuso la stessa assunzione più volte$$\dfrac{\dfrac{\dfrac{\dfrac{[α\landβ]_1}{β}ΛE(b) \enspace\enspace\enspace \dfrac{\dfrac{[α\landβ]_1}{α}ΛE(a) \enspace\enspace\enspace [α\rightarrow(β\rightarrowγ)]_2}{β\rightarrowγ}\rightarrow E}{γ}\rightarrow E}{α\landβ\rightarrowγ}\rightarrow I,1}{α\rightarrow(β\rightarrowγ))\rightarrow((α\landβ\rightarrowγ)}\rightarrow I,2$$

Sappiamo adesso notare che questa derivazione non è valida nella logica lineare.