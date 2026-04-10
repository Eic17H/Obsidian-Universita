---
cssclasses:
  - logica
---
Noi vediamo come funzionano i connettivi tramite il contesto, ma non abbiamo una regola fissa che possiamo capire isolatamente. Sarebbe invece utile avere connettivi che possono essere definiti e appresi indipendentemente.

Vediamo ora il calcolo della Deduzione Naturale (ND).

Differenze con HK:

HK ha tanti assiomi e una regola di inferenza. ND non ha assiomi, ma ha molte regole di inferenza. Qual è quindi il punto di partenza? Le assunzioni. Però, in HK potevamo derivare qualcosa dalle assunzioni, $Γ \vdash_{HK} α$, o dimostrare teoremi che non derivano da nessuna assunzione, $\emptyset \vdash_{HK} α$. Sarebbe una grande limitazione non poterlo fare anche in ND, e infatti si può: ci sono delle regole che ci permettono di *chiudere delle assunzioni*, cioè ragioniamo a partire da assunzioni, e raggiunta la conclusione rimuoviamo una a una quelle assunzioni.

Le derivazioni sono diverse. In HK sono successioni finite di formule eccetera. Qua invece non vedremo la definizione rigorosa, ma concettualmente saranno fatte ad albero: partiremo da assunzioni, le combineremo usando queste regole, arrivando a un nodo singolo, la radice, che è la conclusione. Quindi se $Γ \vdash_{ND} α$, vuol dire che esiste una deduzione ad albero la cui radice è $α$ e in cui ogni foglia è un elemento di $Γ$.

Avere più regole di inferenza diverse rende meno macchinoso il processo di dimostrazione.
# Regole per la congiunzione

Regola di introduzione della congiunzione, Λ-I congiunzione-introduzione: $\dfrac{α \enspace β}{α \land β}$.

Poi vediamo come eliminarle: $\dfrac{α \land β}{α}$, Λ-E(a) (eliminazione della congiunzione parte a). E poi $\dfrac{α \land β}{β}$, Λ-E(b).

Quindi con le regole introduco ed elimino i connettivi in modo molecolaristico.

Proviamo a dimostrare che $α \vdash_{ND} α \land α$. L'albero sarà così: $^{α \enspace α}$ in alto sono le foglie, poi metto una linea per connettere, $\frac{α \enspace α}{}$, e poi metto la conclusione sotto, scrivendo di lato la regola che ho usato (come le giustificazioni di Hilbert): $\dfrac{α \enspace α}{α \land α} Λ \text{-} I$. Questo è un albero. Regole di inferenza già viste con ALF e LIP.

Proviamo l'altro pezzo dell'idempotenza, $α \land α \vdash_{ND} α$. Ancora più semplice, $\dfrac{α \land α}{α}Λ\text{-}E(a)$. Volendo potrebbe essere anche la regola b.

Commutatività, $α \land β \vdash_{ND} β \land α$. Vogliamo smontare la congiunzione e rimontarla al rovescio.$$\dfrac{\dfrac{α \land β}{β}Λ\text{-}E(b) \enspace \enspace \enspace \dfrac{α \land β}{α}Λ\text{-}E(a)}{β \land α} Λ\text{-}I$$
Associatività, $α \land (β \land γ) \vdash_{ND} (α \land β) \land γ$. Abbiamo due opzioni: lo stile top-down e lo stile bottom-up. Lo stile top-down è quello che abbiamo usato finora, ma per questione di gusti è possibile usare lo stile bottom-up: partiamo dalla conclusione e troviamo le premesse giuste.$$\dfrac{\dfrac{\dfrac{α \land (β\landγ)}{α}Λ\text{-}E(a) \enspace \enspace \enspace \dfrac{\dfrac{α \land (β\landγ)}{β\landγ}Λ\text{-}E(b)}{β}Λ\text{-}E(a)}{α \land β}Λ\text{-}I \enspace \enspace \enspace \dfrac{\dfrac{α \land (β\landγ)}{β\landγ}Λ\text{-}E(b)}{γ}Λ\text{-}E(b)}{(α \land β) \land γ}Λ\text{-}I$$
Per controllare che sia giusto, basta controllare che ciascuna regola sia utilizzata correttamente. E lo sono.

L'IA sta diventando sempre più brava a fare queste cose. Ci sta battendo anche nella dimostrazione dei meta-teoremi.

Però ancora non possiamo chiudere assunzioni. Non possiamo ancora dimostrare teoremi.

# Regole dell'implicazione

Di nuovo abbiamo l'introduzione e l'eliminazione.

Per eliminarla possiamo usare il modus ponens, questa è molto semplice. $\dfrac{α\rightarrowβ \enspace \enspace α}{β}\rightarrow\text{-}E$

Vediamo della notazione molto strana:$$\dfrac{\begin{matrix}[α]_i \newline \vdots \newline β\end{matrix}}{α\rightarrowβ}\rightarrow\text{-}I,i$$

I puntini verticali significano "supponiamo di aver già dimostrato $β$ da $α$". Le parentesi quadre dicono che possiamo chiudere l'assunzione. La $i$ è un indice, un numero, lo usiamo per indicare che al passaggio i chiudiamo quell'assunzione.

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

Proviamo a fare lo scambio dell'antecedente. $\vdash_{ND}(α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))$. Che assunzioni vogliamo? Prima di tutto l'antecedente dell'implicazione principale, $α\rightarrow(β\rightarrowγ)$, poi vediamo il suo conseguente e prendiamo il suo antecedente, $β$, poi vediamo il suo conseguente e prendiamo il suo antecedente, $α$, è ricorsiva.$$\dfrac{\dfrac{\dfrac{\dfrac{[β]_2 \enspace \enspace \dfrac{[α]_1 \enspace \enspace [α\rightarrow(β\rightarrowγ)]_3}{β\rightarrowγ}\rightarrow\text{-}E}{γ}\rightarrow\text{-}E}{α \rightarrow γ}\rightarrow\text{-}I,1}{β\rightarrow(α \rightarrow γ)}\rightarrow\text{-}I,2}{(α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))
}\rightarrow\text{-}I,3$$
# Regole della disgiunzione

La regola dell'introduzione è suddivisa in parte a e parte b. $\dfrac{α}{α \lor β}VI(a)$, una disgiunzione può essere derivata dal suo primo disgiunto. La parte b è facile da immaginare, $\dfrac{β}{α \lor β}VI(b)$. Somigliano all'inverso dell'eliminazione della congiunzione.

La regola di eliminazione è un po' più complessa:$$\dfrac{\begin{matrix}& [a]_i & [β]_j \\ & \vdots & \vdots \\ α\lorβ & γ & γ\end{matrix}}{γ}VE_{i,j}$$Detto "il dilemma cornuto". Sappiamo che o $α$ o $β$, vale, e ricavo $γ$ da $α$, e ricavo $γ$ da $β$, allora so che vale $γ$. Che io abbia assunto $α$ vera, o che abbia assunto $β$ vera, vale $γ$, quindi la mia conclusione è indipendente dalle mie assunzioni.

In modo informale, vediamo un esempio in linguaggio naturale. "Dopo le elezioni aumenteranno le tasse: o vince la destra o vince la sinistra, se vince la destra aumenteranno le tasse, se vince la sinistra aumenteranno le tasse, quindi aumenteranno le tasse".

Anche qui chiudo due foglie insieme, ma possono essere due assunzioni diverse.

Vediamo delle derivazioni.

## Commutatività

$α \lor β \vdash_{ND} β \lor α$. Abbiamo una disgiunzione già pronta, l'unico modo per usarla è eliminarla.

Assunzioni. Assumiamo $α\lorβ$. Abbiamo due casi: vale $α$ o vale $β$, quindi assumiamo quei due e poi li dobbiamo chiudere. Ma con l'introduzuione, posso derivare la mia conclusione da entrambe, che mi permette di chiudere le assunzioni aggiunte e tenere solo quella che mi serviva.$$\dfrac{\begin{matrix}α\lorβ & \dfrac{[α]_1}{β\lorα}VI(b) & \dfrac{[β]_2}{β\lorα}VI(a)\end{matrix}}{β\lorα}VE_{1,2}$$

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

## Più connettivi insieme

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
## Altro esempio

Vediamo un'altra equivalenza che vale in logica classica. Non l'abbiamo esplicitamente affrontata, però $α\lorβ \leftrightarrow (α\rightarrowβ)\rightarrowβ$. Quindi proviamo, $α\lorβ \vdash_{ND} (α\rightarrowβ)\rightarrowβ$.

Potremmo fare anche la derivazione opposta. In ND non ho modo di farlo con le regole viste finora, perché per passare dall'implicazione alla disgiunzione devo passare per le regole delle negazione. E com'è possibile, non doveva essere molecolare? Questo problema non c'è mai nella logica intuizionista. Alcuni ci vedono la superiorità della logica intuizionista rispetto alla logica classica. Paoli lo vede come un bug del formalismo della deduzione naturale; quando passiamo a un framework più neutrale, quello del calcolo delle sequenze, questo problema scompare completamente. Aristotele criticava questo problema, metabasis eis allos genos, per esempio nelle dimostrazioni aritmetiche che usavano la geometria, anche i medievali, per aliena et remota, e poi anche Kant.

Tornando a noi.

Assunzione a tempo determinato, $α\rightarrowβ$. Ricordiamo la pinnella, assumiamo tutto quello che vogliamo e poi scartiamo.$$\dfrac{\dfrac{\begin{matrix}
α\lorβ
&
\dfrac{[α]_1 \;\; [α\rightarrowβ]_3}{β}\rightarrow E
&
[β]_2
\end{matrix}}{β}VE_{1,2}}{(α\rightarrowβ)\rightarrowβ}\rightarrow I,3$$
## Congiunzione e disgiunzione insieme

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

#todo: mettere gli esercizi in un file a parte

## Disgiunzione e conclusione insieme

Lo stesso di prima ma al contrario.

$(α\landβ)\lor(α\landγ) \vdash_{ND} α \land (β\lorγ)$

La logica lineare non è distributiva, perché le assunzioni si spendono. Ma noi siamo in logica classica e abbiamo la distribuzione.

Ho sonno.

$$\dfrac{\begin{matrix}
(α\landβ)\lor(α\landγ)
&
\dfrac{\dfrac{[α\landβ]_1}{α}ΛE(a) \;\; \dfrac{\dfrac{[α\landβ]_1}{β}ΛE(b)}{β\lorγ}VI(a)}{α\land(β\lorγ)}ΛI
&
\dfrac{\dfrac{[α\landγ]_2}{α}ΛE(a) \;\; \dfrac{\dfrac{[α\landγ]_2}{γ}ΛE(b)}{β\lorγ}VI(b)}{α\land(β\lorγ)}ΛI
\end{matrix}}{α\land(β\lorγ)}VE_{1,2}$$
# Regole della negazione

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