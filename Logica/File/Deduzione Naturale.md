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
Abbiamo ora una derivazione da α a γ: quindi chiudiamo.$$\dfrac{\dfrac{\dfrac{[α]_1 \enspace \enspace α\rightarrowβ}{β} \rightarrow\text{-}E \enspace \enspace \enspace β\rightarrowγ}{γ}\rightarrow\text{-}E}{α\rightarrowγ}\rightarrow\text{-}I,1$$

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