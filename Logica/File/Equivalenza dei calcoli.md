---
cssclasses:
- Logica
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
### Dimostrazione

Lavoriamo per induzione, ma in modo diverso da ciò che abbiamo già visto. Il nostro parametro sarà il numero di nodi contenuti in un fissato albero di derivazione da $Y$ ad $α$. Qual è il numero minimo di nod? $1$. Un tale albero in ND è $α$, dove $α \in Y$.

Passo base:

Quindi, se $α \in Y$, allora $α$ sarà anche da qualche parte in $Γ_Y$. Questo vuole dire che la sequenza da dimostrare in PK sarà della forma $α, \ldots \Rightarrow α$, che posso dimostrare tramite una serie di indebolimenti e di scambi in modo abbastanza banale, facendola risalire al teorema di eliminazione dell'identità.$$\dfrac{α \xRightarrow{\times} α}{α,Π \Rightarrow α}is,ss$$Passo induttivo:

Impostiamolo. Cos'è? Il teorema è un'implicazione, quindi anche l'ipotesi induttiva deve essere un'implicazione.
## Da PK a ND

> Sia $Γ$ una successione finita o vuota di formule di $\mathcal{L}_0$, e sia $α$ una singola formula di $\mathcal{L}_0$. Allora, se $\vdash_{PK}Γ\Rightarrowα$, allora $|Γ| \vdash_{ND} α$.

E ci torna, visto che le successioni di PK si comportano come insiemi, con le regole di scambio e di contrazione. Molti testi infatti ignorano la differenza.