---
cssclasses:
  - logica
---
Noi vediamo come funzionano i connettivi tramite il contesto, ma non abbiamo una regola fissa che possiamo capire isolatamente. Sarebbe invece utile avere connettivi che possono essere definiti e appresi indipendentemente.

Vediamo ora il calcolo della Deduzione Naturale (ND).

# Cenni storici

Gentzen nel 1934 nella sua tesi di dottorato ha introdotto questa cosa qua. Poi Prawitz, svedese ancora vivo, dimostra questo teorema importante: (poco rigoroso) *tutto ciò che può essere derivato in ND, può essere derivato senza ridondanze*, e le ridondanze sono quelle di questo esempio: introdurre una formula ed eliminarla subito, eliminare un connettivo e reintrodurlo e tornare dov'eravamo. Il teorema di normalizzazione ci dice che ogni derivazione contenente questi giri pesca può essere trasformata in maniera algoritmica in una derivazione che non ne contiene.

In una lezione particolare crossover con la filosofia del linguaggio vedremo l'idea del significato dei connettivi che emerge da questo calcolo.

# Differenze con HK

HK ha tanti assiomi e una regola di inferenza. ND non ha assiomi, ma ha molte regole di inferenza. Qual è quindi il punto di partenza? Le assunzioni. Però, in HK potevamo derivare qualcosa dalle assunzioni, $Γ \vdash_{HK} α$, o dimostrare teoremi che non derivano da nessuna assunzione, $\emptyset \vdash_{HK} α$. Sarebbe una grande limitazione non poterlo fare anche in ND, e infatti si può: ci sono delle regole che ci permettono di *chiudere delle assunzioni*, cioè ragioniamo a partire da assunzioni, e raggiunta la conclusione rimuoviamo una a una quelle assunzioni.

Le derivazioni sono diverse. In HK sono successioni finite di formule eccetera. Qua invece non vedremo la definizione rigorosa, ma concettualmente saranno fatte ad albero: partiremo da assunzioni, le combineremo usando queste regole, arrivando a un nodo singolo, la radice, che è la conclusione. Quindi se $Γ \vdash_{ND} α$, vuol dire che esiste una deduzione ad albero la cui radice è $α$ e in cui ogni foglia è un elemento di $Γ$.

Avere più regole di inferenza diverse rende meno macchinoso il processo di dimostrazione.

Le regole di inferenza sono perlopiù divise in regole di introduzione, che da certe premesse ci portano ad avere il connettivo, e regole di eliminazione, che avendo il connettivo nella premessa ci portano a certe conclusioni che non lo contengono. Non essendo presenti altri connettivi oltre a quello introdotto o eliminato dalla regola, sto descrivendo il comportamento dei connettivi in modo molecolaristico.

Abbiamo due opzioni: lo stile top-down e lo stile bottom-up. Lo stile top-down è quello che abbiamo usato finora, ma per questione di gusti è possibile usare lo stile bottom-up: partiamo dalla conclusione e troviamo le premesse giuste.
# Congiunzione

## Introduzione

Regola di introduzione della congiunzione, $Λ\text{-}I$, congiunzione-introduzione: $\dfrac{α \enspace β}{α \land β}$.

## Eliminazione

Poi vediamo come eliminarle: $\dfrac{α \land β}{α}$, $Λ\text{-}E(a)$ (eliminazione della congiunzione parte a). E poi $\dfrac{α \land β}{β}$, $Λ\text{-}E(b)$.

## Esempi

Proviamo a dimostrare che $α \vdash_{ND} α \land α$. L'albero sarà così: $^{α \enspace α}$ in alto sono le foglie, poi metto una linea per connettere, $\frac{α \enspace α}{}$, e poi metto la conclusione sotto, scrivendo di lato la regola che ho usato (come le giustificazioni di Hilbert): $\dfrac{α \enspace α}{α \land α} Λ \text{-} I$. Questo è un albero. Regole di inferenza già viste con ALF e LIP.

Proviamo l'altro pezzo dell'idempotenza, $α \land α \vdash_{ND} α$. Ancora più semplice, $\dfrac{α \land α}{α}Λ\text{-}E(a)$. Volendo potrebbe essere anche la regola b.

Per controllare che sia giusto, basta controllare che ciascuna regola sia utilizzata correttamente. E lo sono.

[[Congiunzione|Altri esempi]]

L'IA sta diventando sempre più brava a fare queste cose. Ci sta battendo anche nella dimostrazione dei meta-teoremi.

Però ancora non possiamo chiudere assunzioni. Non possiamo ancora dimostrare teoremi.

# Implicazione

Di nuovo abbiamo l'introduzione e l'eliminazione.

## Eliminazione

Per eliminarla possiamo usare il modus ponens, questa è molto semplice. $\dfrac{α\rightarrowβ \enspace \enspace α}{β}\rightarrow\text{-}E$

## Introduzione

Vediamo della notazione molto strana:$$\dfrac{\begin{matrix}[α]_i \newline \vdots \newline β\end{matrix}}{α\rightarrowβ}\rightarrow\text{-}I,i$$

I puntini verticali significano "supponiamo di aver già dimostrato $β$ da $α$". Le parentesi quadre dicono che possiamo chiudere l'assunzione. La $i$ è un indice, un numero, lo usiamo per indicare che al passaggio i chiudiamo quell'assunzione.

Se due foglie dell'albero hanno la stessa assunzione, quando chiudiamo una chiudiamo anche l'altra.

È anche possibile introdurre un'implicazione senza usare nessun'assunzione: in quel caso *chiudiamo l'insieme vuoto di assunzioni*, $\rightarrow I \text{-} \emptyset$. Per esempio:$$\dfrac{α}{β\rightarrowα}\rightarrow I, \emptyset$$Questo è strano. Si può fare eh. Ma è davvero strano. Diciamo che lì possiamo dire che, insomma, c'è una foglia $β$ invisibile che abbiamo chiuso alla prima introduzione senza usarla effettivamente ma almeno l'abbiamo chiusa.

Questo è brutto. Ai logici rilevanti non piace, e infatti permette di derivare l'a fortiori. Quindi nella logica rilevante, è vietato chiudere l'insieme vuoto di premesse.

E poi c'è la logica lineare, che vieta di chiudere due foglie in un colpo. E perché? Nel campo dell'informatica, le premesse sono viste come risorse che una volta consumate non si possono riutilizzare. Per i logici lineari, questo è più vicino a come facciamo deduzione automatica coi computer. Due monete sono uguali tra loro ma per comprare due cose voglio due copie della risorsa, anche se è fungibile.

Questo è legato al tema delle logiche sottostrutturali. Ma questo lo possiamo capire solo una volta fatto il calcolo delle sequenze.

Però torniamo a noi. Noi possiamo chiudere l'insieme vuoto di assunzioni, e ci scateniamo.
## Teoremi

$\vdash_{ND} (α\rightarrowβ)\rightarrow((β\rightarrowγ)\rightarrow(α\rightarrowγ))$. Senza precedenti. Come facciamo? Capiamo come arrivarci. Assunzioni: $α\rightarrowβ$, $β\rightarrowγ$, $α$, con questi possiamo fare modus ponens e arrivare alla fine, e da lì chiudiamo le assunzioni. Vediamo se questa è una strategia valida.$$\dfrac{\dfrac{α \enspace \enspace α\rightarrowβ}{β} \rightarrow\text{-}E \enspace \enspace \enspace β\rightarrowγ}{γ}\rightarrow\text{-}E$$
Abbiamo ora una [[derivazione]] da α a γ: quindi chiudiamo.$$\dfrac{\dfrac{\dfrac{[α]_1 \enspace \enspace α\rightarrowβ}{β} \rightarrow\text{-}E \enspace \enspace \enspace β\rightarrowγ}{γ}\rightarrow\text{-}E}{α\rightarrowγ}\rightarrow\text{-}I,1$$

Poi.$$\dfrac{\dfrac{\dfrac{\dfrac{[α]_1 \enspace \enspace α\rightarrowβ}{β} \rightarrow\text{-}E \enspace \enspace \enspace [β\rightarrowγ]_2}{γ}\rightarrow\text{-}E}{α\rightarrowγ}\rightarrow\text{-}I,1}{(β\rightarrowγ)\rightarrow(α\rightarrowγ)} \rightarrow\text{-}I,2$$
Manca solo un'assunzione da chiudere. E quindi facciamolo.$$
\dfrac
	{\dfrac{\dfrac{\dfrac{\dfrac{[α]_1 \enspace \enspace [α\rightarrowβ]_3}{β} \rightarrow\text{-}E \enspace \enspace \enspace [β\rightarrowγ]_2}{γ}\rightarrow\text{-}E}{α\rightarrowγ}\rightarrow\text{-}I,1}{(β\rightarrowγ)\rightarrow(α\rightarrowγ)} \rightarrow\text{-}I,2}
{(α\rightarrowβ)\rightarrow((β\rightarrowγ)\rightarrow(α\rightarrowγ))}\rightarrow\text{-}I,3$$
È come giocare a pinnella: puoi prendere tutte le carte che vuoi, ma poi le devi scartare.

Però, cosa ci dice che, chiudendo un'assunzione, il ragionamento non dipende più da essa? Perché chiudendo un'assunzione, la promuovo da assunzione a precedente.

Può essere difficile da accettare.

Le assunzioni non sono più assunzioni perché ce le troviamo nella formula che dimostriamo. Non è un trucco quello di chiudere quelle assunzioni. Le ipotesi rimangono: il fatto che $γ$ dipenda da $α$, e da $β\rightarrowγ$, e da $α\rightarrowβ$, non è più un'assunzione, è codificato nella formula che abbiamo derivato.

[[Implicazione|Altri esempi]]
# Disgiunzione

## Introduzione

La regola dell'introduzione è suddivisa in parte a e parte b. $\dfrac{α}{α \lor β}VI(a)$, una disgiunzione può essere derivata dal suo primo disgiunto. La parte b è facile da immaginare, $\dfrac{β}{α \lor β}VI(b)$. Somigliano all'inverso dell'eliminazione della congiunzione.

## Eliminazione

La regola di eliminazione è un po' più complessa:$$\dfrac{\begin{matrix}& [a]_i & [β]_j \\ & \vdots & \vdots \\ α\lorβ & γ & γ\end{matrix}}{γ}VE_{i,j}$$Detto "il dilemma cornuto". Sappiamo che o $α$ o $β$, vale, e ricavo $γ$ da $α$, e ricavo $γ$ da $β$, allora so che vale $γ$. Che io abbia assunto $α$ vera, o che abbia assunto $β$ vera, vale $γ$, quindi la mia conclusione è indipendente dalle mie assunzioni.

In modo informale, vediamo un esempio in linguaggio naturale. "Dopo le elezioni aumenteranno le tasse: o vince la destra o vince la sinistra, se vince la destra aumenteranno le tasse, se vince la sinistra aumenteranno le tasse, quindi aumenteranno le tasse".

Anche qui chiudo due foglie insieme, ma possono essere due assunzioni diverse.

[[Disgiunzione|Altri esempi]]

## Limiti

Vediamo un'altra equivalenza che vale in logica classica. Non l'abbiamo esplicitamente affrontata, però $α\lorβ \leftrightarrow (α\rightarrowβ)\rightarrowβ$. Quindi possiamo scriverla come $α\lorβ \vdash_{ND} (α\rightarrowβ)\rightarrowβ$.

Potremmo fare anche la derivazione opposta. In ND non ho modo di farlo con le regole viste finora, perché per passare dall'implicazione alla disgiunzione devo passare per le regole delle negazione. E com'è possibile, non doveva essere molecolare? Questo problema non c'è mai nella logica intuizionista. Alcuni ci vedono la superiorità della logica intuizionista rispetto alla logica classica. Paoli lo vede come un bug del formalismo della deduzione naturale; quando passiamo a un framework più neutrale, quello del calcolo delle sequenze, questo problema scompare completamente. Aristotele criticava questo problema, metabasis eis allos genos, per esempio nelle dimostrazioni aritmetiche che usavano la geometria, anche i medievali, per aliena et remota, e poi anche Kant.

# Negazione

Non le vediamo rigorosamente perché sono difficili, e infatti non ci saranno neanche negli esercizi all'esame.

Non c'è introduzione ed eliminazione. È un po' a sé.

Ci sono due regole

Ex absurdo quodlibet, che in un certo senso è di eliminazione, $\dfrac{α \;\; ¬α}{β}[EAQ]$.

L'altra non è di introduzione, ma è il ragionamento per assurdo: si assume l'opposto della tesi che si vuole dimostrare, si arriva a una contraddizione, e quindi si dimostra la propria tesi:$$\dfrac{\begin{matrix}
[¬α]_i & [¬α]_i \\
\vdots & \vdots \\
β & ¬β
\end{matrix}}{α}[RAA]_i$$
Nel calcolo intuizionista, sopra si tolgono le negazioni, e si mettono sotto, quindi lì c'è davvero una regola di introduzione. Nel calcolo delle sequenze invece, possiamo dare definizioni che valgono sia nella logica classica che nella logica intuizionista. Per la logica rilevante serve un altro calcolo ancora, che noi non faremo.

# Osservazione

Noi possiamo pensare, "se vogliamo dimostrare qualcosa con quel connettivo devo usare le regole di quel connettivo"

$\vdash_{ND} γ\rightarrow(α\landβ\rightarrowγ)$

E tu dirai, c'è la congiunzione, devo usare le regole della congiunzione. Ma è un a fortiori, qualunque cosa ci fosse al posto della congiunzione, la dimostrazione dell'a fortiori funzionerebbe allo stesso modo.$$\dfrac{\dfrac{[γ]_1}{α\landβ\rightarrowγ} \rightarrow I,\emptyset}{γ\rightarrow(α\landβ\rightarrowγ)}\rightarrow I,1$$
Era una congiunzione "virtuale", c'era una congiunzione ma potrebbe essere qualunque cosa. E infatti anche se fosse stato $δ$ al posto di $α\landβ$, queste sono metavariabili, potrebbero contenere anche tutti i connettivi, ma noi non usiamo le loro regole, quindi non è un concetto così strano.

# Osservazione

Il calcolo alla Hilbert non rendeva facile fare derivazioni, dovevi tirare un po' a casaccio. Il calcolo delle sequenze permette di farle in modo estremamente algoritmico. Questa è una via di mezzo.

C'è anche il calcolo tableau, sintattico ma vicino alla semantica, ma secondo il professore è orrendo, soprattutto didatticamente. Invece nessuno usa il calcolo delle sequenze.