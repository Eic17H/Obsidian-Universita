---
cssclasses:
 - logica
---
Abbiamo detto che HK, ND e PK sono equivalenti, ma non abbiamo detto come. Con HK ed ND ce lo possiamo immaginare, abbiamo una nozione di derivabilità.

Cosa stiamo dicendo? Essenzialmente $Γ \vdash_{HK} α \leftrightarrow Γ \vdash_{ND} α$. Non lo dimostriamo, ma sul libro c'è, per i curiosi. A noi interessa far vedere che il calcolo ND e il calcolo PK sono equivalenti, che è sorprendente: uno opera sulle formule, l'altro opera su sequenti, `formula` e `pair<list<list<formula>>>`.

Vediamola in modo intuitivo. E se... $Γ\vdash_{ND}α \leftrightarrow \; \vdash_{PK}Γ\Rightarrowα$. Potrebbe essere un possibile approccio alla questione. Però è sbagliato. È come un falso amico nell'apprendimento delle lingue. In questo caso, $Γ$ e $Γ$ sono cose diverse, stesso simbolo e due significati diversi: insieme vuoto, finito o infinito in ND, sequenza vuota o finita in PK. Quindi non ha nessun senso. Di nuovo, `set<formula> == list<formula>` dà errore di tipo.

Ci serve quindi un modo per tradurre insiemi in successioni e viceversa.

È la parte più impervia del corso. Chi non incontra mai questo metateorema rimane convinto che la logica sia una cosa facile, banale e noiosa.

Cosa c'è di difficile nella logica? Come i matematici bravi passano il giorno a fare calcoli e prendono medaglie quando risolvono sistemi di equazioni con numeri altissimi, i logici prendono medaglie quando dimostrano alberi di derivazione lunghissimi. No, ovviamente, vediamo adesso il succo.

# Nozione di successione

Le abbiamo citate ma non le abbiamo mai formalmente definite. La vediamo sul libro.

> Sia $X$ un insieme. Una **successione** finita di lunghezza $n$ su $X$ è una funzione $Γ()$ che ha come dominio i numeri naturali da $1$ a $n$ e come codominio $X$.

Da vedere meglio nel libro o del documento non so cosa sia, credo sia il documento perché questa è la seconda pagina.

In matematica, abbiamo definito le successioni infinite che hanno $\mathbb{R}$ come codominio. È comunque un concetto simile.

Crucialmente, in una successione l'ordine è importante e ci possono essere elementi ripetuti. Come lo convertiamo in un insieme, in cui non importano né l'ordine né il numero di ripetizioni? Lo chiamiamo *insieme di supporto*.

> Sia $|Γ|$ una successione. Il suo **insieme di supporto** $|Γ|$ è l'insieme degli elementi presenti in $Γ$: $|Γ| = \{x \in X : \exists m \leq n \in \mathbb{N}, x = Γ(m)\}$.

Adesso facciamo il contrario, ricaviamo una successione da un insieme. Denotiamo gli insiemi con le lettere latine, e le successioni con le lettere greche.

> Sia $X$ un insieme non vuoto, sia $Y={a_1,\ldots,a_n}$ un sottoinsieme finito di $X$. Una $Y$-successione è una successione $Γ_Y$ di lunghezza $n$ su $X$ tale che, per qualche permutazione $π$ dei numeri naturali tra $1$ ed $n$, $Γ_Y=\langle a_{π(1)},\ldots,a_{π(n)} \rangle$.

Essenzialmente prendiamo un ordine qualunque, tanto esiste un ordine, ed esistono tutte le sue permutazioni.

# Teoremi

Possiamo finalmente cominciare a vedere qualche teorema.
## Da ND a PK

> Sia $Y$ un insieme finito o vuoto di formule di $\mathcal{L}_0$, e sia $α$ una singola formula di $\mathcal{L}_0$. Allora, se $Y \vdash_{ND} α$, allora, $\forall Γ_Y$, $\vdash_{PK} Γ_Y \Rightarrow α$.

Adesso il typechecker passa, almeno, il problema è ben definito.

L'equivalenza vale anche per $Y$ infinito, ma non lo dimostriamo. Inoltre, non ci serve molto, perché in una derivazione usiamo solo un numero finito di assunzioni.

### Dimostrazione generale

Lavoriamo per induzione, ma in modo diverso da ciò che abbiamo già visto. Il nostro parametro sarà il numero di nodi contenuti in un fissato albero di derivazione da $Y$ ad $α$. Qual è il numero minimo di nod? $1$. Un tale albero in ND è $α$, dove $α \in Y$.

#### Passo base

Quindi, se $α \in Y$, allora $α$ sarà anche da qualche parte in $Γ_Y$. Questo vuole dire che la sequenza da dimostrare in PK sarà della forma $α, \ldots \Rightarrow α$, che posso dimostrare tramite una serie di indebolimenti e di scambi in modo abbastanza banale, facendola risalire al teorema di eliminazione dell'identità.$$\dfrac{α \xRightarrow{\times} α}{α,Π \Rightarrow α}is,ss$$
#### Passo induttivo

Impostiamolo. Cos'è? Il teorema è un'implicazione, quindi anche l'ipotesi induttiva deve essere un'implicazione.

Ipotesi di induzione: Se $Y \vdash_{ND} α$ con una derivazione che contiene $\leq m$ nodi, allora per ogni $Γ_Y$, $\vdash_{PK} Γ_Y \Rightarrow α$.

Tesi: Se $Y \vdash_{ND} α$ con una derivazione che contiene $m+1$ nodi, allora per ogni $Γ_Y$, $\vdash_{PK} Γ_Y \Rightarrow α$.
### Dimostrazioni specifiche

Da qui ci sono più casi. Quanti? Uno per ogni regola di inferenza. Noi però ne vediamo solo 3: $Λ\text{-}I$, $Λ\text{-}E(a)$, $V\text{-}E$. Sono scelte per avere un po' tutti i tipi: ne abbiamo di introduzione e di eliminazione, ne abbiamo che chiudono assunzioni e che non ne chiudono.
#### Introduzione della congiunzione

Supponiamo che $α$ sia ottenuta per $ΛI$. Quale sarà il connettivo principale? $\land$. Diciamo che $α \equiv β \land γ$. E la nostra derivazione ha $m+1$ nodi.$$\dfrac{\begin{matrix}Y&Y\\ \vdots & \vdots \\ β & γ\end{matrix}}{β \land γ}$$Quanti nodi ci sono in $Y \cdots β$? Al più $m$. Inoltre, non possiamo usare assunzioni all'infuori di $Y$, perché in totale è una derivazione da $Y$ a $β\landγ$, quindi nei sottoalberi ci sono altre assunzioni. Possiamo fare lo stesso ragionamento per il sottoalbero destro. Quindi $\vdash_{PK} Γ_Y \Rightarrow β$ e $\vdash_{PK} Γ_Y \Rightarrow γ$. Lui chiama l'albero $D$ e i sottoalberi $D'$ e $D''$.

Perché i due $Γ_Y$ possono essere uguali? Importante, al professore piace questa parte. Possiamo farlo perché la nostra ipotesi questo vale *per ogni* $Γ_Y$.

Quindi io ora ho, e quello era in ND, quell'albero era in ND. E da ND abbiamo visto che i due sottoalberi si "traducono" in PK. Passiamo quindi a un albero PK. E questa è bellissima.$$\dfrac{Γ_Y \Rightarrow β \qquad Γ_Y \Rightarrowγ}{Γ_Y \Rightarrowβ\landγ}Λ\text{-}d$$Lo and behold: la dimostrazione che cercavamo.

Cos'abbiamo fatto? Abbiamo ipotizzato che un albero con al più $m$ nodi si può "tradurre" da ND a PK. Poi abbiamo preso due alberi con al più $m$ nodi in ND e li abbiamo combinati, aggiungendo... beh, in realtà arriviamo al più a $2m+1$ nodi, ma ci va bene comunque per dimostrare il caso con $m+1$ nodi.

#### Eliminazione della congiunzione parte a

Vediamo poi il caso con $Λ\text{-}E(a)$. Il mio albero è così:$$\dfrac{\begin{matrix}Y\\\vdots\\β\landγ\end{matrix}}{β}$$L'albero $D$ ha $m+1$ nodi, e in questo caso $D'$ ha *esattamente* $m$ nodi. Grazie all'ipotesi, so che $D'$ è quindi dimostrabile. Ci serve quindi questo in PK:$$\begin{matrix}Γ_Y \Rightarrow β\landγ\\\vdots\\Γ_Y\Rightarrowβ\end{matrix}$$Ma in PK non esistono regole di eliminazione, possiamo solo complicare scendendo. Qual è l'unica regola che mi permette di distruggere l'informazione? Il $cut$. In questo caso il $cut*$.$$\dfrac{\begin{matrix}Γ_Y \Rightarrow β\landγ\\\vdots\\Γ_Y\Rightarrowβ\landγ \qquad β\landγ\Rightarrowβ\end{matrix}}{Γ_Y\Rightarrowβ}cut*$$A destra si può procedere in due modi. Il metodo che *non* usano le dispense è (bottom-up) con $Λs$ e poi $ss,is$. Il ramo a sinistra è quello che esiste per ipotesi.$$\dfrac{\begin{matrix}Y\\\vdots\\Γ_Y\Rightarrowβ\landγ\end{matrix} \qquad \dfrac{\dfrac{β\Rightarrowβ}{β,γ\Rightarrowβ}ss,is}{β\landγ\Rightarrowβ}Λs}{Γ_Y\Rightarrowβ}cut*$$Non riesco ad allinearlo. Notiamo come la regola destra corrisponde alla regola di introduzione, e la regola sinistra corrisponde alla regola di eliminazione. E ci torna, perché se introduciamo qualcosa la stiamo mettendo nella conclusione.
#### Eliminazione della disgiunzione

Vediamo la chiusura di un'assunzione. $D$ è fatto così:$$\dfrac{\begin{matrix}Y&[β]\\&\vdots\\&γ\end{matrix}}{β\rightarrowγ}\rightarrow I$$E capiamoci. Quando faccio $\rightarrow I$, sto cambiando l'insieme di assunzioni aperte. Se $β\rightarrowγ$ segue dall'insieme di assunzioni $Y$, invece $γ$ segue dall'insieme di assunzioni $Y \cup \{β\}$, cioè $\vdash_{PK}β,\;Γ_Y \Rightarrow γ$.

All'esame ciò che importa non è il calcolone logico di derivazione a mano, è capire *perché* e cosa significa che aggiungiamo quel $β$ alle assunzioni. L'albero da qui è semplice in realtà:$$\dfrac{β,\;Γ_Y\Rightarrowγ}{Γ_Y\Rightarrowβ\rightarrowγ}\rightarrow d$$
Abbiamo adesso dimostrato (per alcuni casi) la conversione da ND a PK, il primo teorema.
## Da PK a ND

> Sia $Γ$ una successione finita o vuota di formule di $\mathcal{L}_0$, e sia $α$ una singola formula di $\mathcal{L}_0$. Allora, se $\vdash_{PK}Γ\Rightarrowα$, allora $|Γ| \vdash_{ND} α$.

E ci torna, visto che le successioni di PK si comportano come insiemi, con le regole di scambio e di contrazione. Molti testi infatti ignorano la differenza.

La tecnica dimostrativa è molto simile alla precedente. Anche qui ragioniamo per induzione sul numero di nodi.
### Dimostrazione generale

#### Passo base

La dimostrazione in PK ha $1$ nodo. Significa che è un assioma, e l'unico assioma è $p\Rightarrow p$. Questo ci dice tante cose:
* $α\equiv p$
* $α \in Γ$
* $Γ = (p)$
* $|Γ| = \{p\}$

Se c'è solo un nodo, che è sia radice che foglia e quindi sia assioma che tesi, è $p \Rightarrow p$. Possiamo derivare una cosa del genere in ND? Sì, l'albero per derivare $p \vdash_{ND} p$ è $p$, tutto qui, l'albero è quella singola lettera.

#### Passo induttivo

**Ipotesi di induzione**: Se $\vdash_{PK} Γ\Rightarrowα$ con una dimostrazione che contiene $\leq m$ nodi, allora $|Γ| \vdash_{ND}α$.

**Tesi**: Se $\vdash_{PK} Γ\Rightarrowα$ con una dimostrazione che contiene $m+1$ nodi, allora $|Γ| \vdash_{ND}α$.

Sono quasi uguali. Il metodo di induzione verge sulla circolarità, ci somiglia molto, e invece non lo è.

### Dimostrazioni specifiche

La nostra ipotesi ci garantisce l'esistenza di questo albero:$$\begin{matrix}\vdots \\ Γ\Rightarrowα\end{matrix}$$Come è stata ottenuta quella formula? Con una qualsiasi regola. Il caso delle regole strutturali è banale, non sarà chiesto all'esame. Noi facciamo due esempi.

#### Congiunzione sinistra

Quindi non ho lavorato su $α$ ma su una formula del mio contesto. Questo mi dice che $Γ \Rightarrow α \equiv β\landγ,\;Σ\Rightarrowα$, dove $Σ=Γ \setminus \{β\landγ\}$. Quindi il mio albero è così:$$\dfrac{\begin{matrix}\vdots \\ β,\;γ,\;Σ\Rightarrowα\end{matrix}}{β\landγ,\;Σ\Rightarrowα}Λs$$Mettiamo in gioco l'ipotesi di induzione. Mi dice che $|β,\;γ,\;Σ| \vdash_{ND} α$. Quell'insieme supporto contiene $β$, contiene $γ$, e contiene le formule di $Σ$. Vale a dire che in ND ho:$$\dfrac{\begin{matrix}Σ&β&γ\\\vdots&\vdots&\vdots\end{matrix}}{α}$$Ci va quasi bene: nella derivazione che stiamo cercando, $β$ e $γ$ non sono assunzioni che possiamo lasciare aperte, $β\landγ$ lo è. Ma da qui è molto semplice:$$\dfrac{\begin{matrix}\begin{matrix}\\Σ\end{matrix}&\dfrac{β\landγ}{β}&\dfrac{β\landγ}{γ}\\\vdots&\vdots&\vdots\end{matrix}}{α}$$E quindi questo albero è proprio $|Γ| \vdash_{ND}α$, QED.

In tutta Italia, in *tutta* Italia, Cagliari è l'unico luogo in cui queste cose si fanno al corso ***introduttivo*** alla logica. È una prova di sadismo, ma anche una prova di *empowerment*. Il professore prova a farci studiare qualcosa di interessante, e a metterci alla prova.

#### Implicazione destra

Adesso non lavoriamo su una formula del contesto, ma necessariamente su quella attiva.$$\dfrac{\begin{matrix}\vdots \\ β,\;Γ\Rightarrow γ\end{matrix}}{Γ\Rightarrow β\rightarrowγ}\rightarrow d$$Di nuovo, ipotesi, $|β,\;Γ|\vdash_{ND}γ$. E quindi avrò un albero di derivazione in ND:$$\dfrac{\begin{matrix}Γ&β\\\vdots&\vdots\end{matrix}}{γ}$$E di nuovo, ci va quasi bene, tranne che per due cose: deve finire con $β\rightarrowγ$, e tra le assunzioni aperte l'unica che non va bene è $β$. *Come farò mai a risolvere questo problema? Come potrò fare?* Somiglia molto all'introduzione dell'implicazione. Perché è esattamente quello.$$\dfrac{\dfrac{\begin{matrix}Γ&[β]\\\vdots&\vdots\end{matrix}}{γ}}{β\rightarrowγ}\rightarrow I$$E quindi abbiamo che $|Γ|\vdash_{ND}γ$.

Nel terzo modulo, torniamo nel calcolo alla Hilbert e vediamo il teorema di completezza. È in realtà meno complicato dell'equivalenza dei calcoli.