Era collega di Einstein, di Goedel, e di matematici assurdi, come Von Neumann, e Church, e Letschetz. sono arrivato in ritardo.

Allora. Ha scritto alla lavagna.

Ipotesi di induzione: Se Y |- nd alfa con una derivazione che contiene al massimo m nodi, allora per ogni Gammagamma |-pk Gammagamma => alfa.

Tesi: Se Y |-nd alfa con una derivazione che contiene m+1 nodi, allora per ogni Gammagamma, |-pk Gammagamma => a.

C'era anche un albero che ha cancellato, per il caso in cui alfa è un'assunzione in Gammagamma. Ah ok era il passo base che avevo scritto nell'altro appunto.

Adesso, ha detto che ci sono più casi. Quanti? Una per ogni regola del calcolo. Ma noi ne facciamo solo 3, che saranno le uniche che ci chiederà all'esame.

ΛI, ΛE(a), VE. Introduzione ed eliminazione, chiude e non chiude assunzioni.

Supponiamo che $α$ sia ottenuta per $ΛI$. Quale sarà il connettivo principale? $\land$. Diciamo che $α \equiv β \land γ$. E la nostra derivazione ha $m+1$ nodi.$$\dfrac{\begin{matrix}Y&Y\\ \vdots & \vdots \\ β & γ\end{matrix}}{β \land γ}$$Quanti nodi ci sono in $Y \cdots β$? Al più $m$. Inoltre, non possiamo usare assunzioni all'infuori di $Y$, perché in totale è una derivazione da $Y$ a $β\landγ$, quindi nei sottoalberi ci sono altre assunzioni. Possiamo fare lo stesso ragionamento per il sottoalbero destro. Quindi $\vdash_{PK} Γ_Y \Rightarrow β$ e $\vdash_{PK} Γ_Y \Rightarrow γ$. Lui chiama l'albero $D$ e i sottoalberi $D'$ e $D''$.

Perché i due $Γ_Y$ possono essere uguali? Importante, al professore piace questa parte. Possiamo farlo perché la nostra ipotesi questo vale *per ogni* $Γ_Y$.

Quindi io ora ho, e quello era in ND, quell'albero era in ND. E da ND abbiamo visto che i due sottoalberi si "traducono" in PK. Passiamo quindi a un albero PK. E questa è bellissima.$$\dfrac{Γ_Y \Rightarrow β \qquad Γ_Y \Rightarrowγ}{Γ_Y \Rightarrowβ\landγ}Λ\text{-}d$$Lo and behold: la dimostrazione che cercavamo.

Cos'abbiamo fatto? Abbiamo ipotizzato che un albero con al più $m$ nodi si può "tradurre" da ND a PK. Poi abbiamo preso due alberi con al più $m$ nodi in ND e li abbiamo combinati, aggiungendo... beh, in realtà arriviamo al più a $2m+1$ nodi, ma ci va bene comunque per dimostrare il caso con $m+1$ nodi.

Vediamo poi il caso con $Λ\text{-}E(a)$. Il mio albero è così:$$\dfrac{\begin{matrix}Y\\\vdots\\β\landγ\end{matrix}}{β}$$L'albero $D$ ha $m+1$ nodi, e in questo caso $D'$ ha *esattamente* $m$ nodi. Grazie all'ipotesi, so che $D'$ è quindi dimostrabile. Ci serve quindi questo in PK:$$\begin{matrix}Γ_Y \Rightarrow β\landγ\\\vdots\\Γ_Y\Rightarrowβ\end{matrix}$$Ma in PK non esistono regole di eliminazione, possiamo solo complicare scendendo. Qual è l'unica regola che mi permette di distruggere l'informazione? Il $cut$. In questo caso il $cut*$.$$\dfrac{\begin{matrix}Γ_Y \Rightarrow β\landγ\\\vdots\\Γ_Y\Rightarrowβ\landγ \qquad β\landγ\Rightarrowβ\end{matrix}}{Γ_Y\Rightarrowβ}cut*$$A destra si può procedere in due modi. Il metodo che *non* usano le dispense è (bottom-up) con $Λs$ e poi $ss,is$. Il ramo a sinistra è quello che esiste per ipotesi.$$\dfrac{\begin{matrix}Y\\\vdots\\Γ_Y\Rightarrowβ\landγ\end{matrix} \qquad \dfrac{\dfrac{β\Rightarrowβ}{β,γ\Rightarrowβ}ss,is}{β\landγ\Rightarrowβ}Λs}{Γ_Y\Rightarrowβ}cut*$$Non riesco ad allinearlo. Notiamo come la regola destra corrisponde alla regola di introduzione, e la regola sinistra corrisponde alla regola di eliminazione. E ci torna, perché se introduciamo qualcosa la stiamo mettendo nella conclusione.

Vediamo la chiusura di un'assunzione. $D$ è fatto così:$$\dfrac{\begin{matrix}Y&[β]\\&\vdots\\&γ\end{matrix}}{β\rightarrowγ}\rightarrow I$$E capiamoci. Quando faccio $\rightarrow I$, sto cambiando l'insieme di assunzioni aperte. Se $β\rightarrowγ$ segue dall'insieme di assunzioni $Y$, invece $γ$ segue dall'insieme di assunzioni $Y \cup \{β\}$, cioè $\vdash_{PK}β,\;Γ_Y \Rightarrow γ$.

All'esame ciò che importa non è il calcolone logico di derivazione a mano, è capire *perché* e cosa significa che aggiungiamo quel $β$ alle assunzioni. L'albero da qui è semplice in realtà:$$\dfrac{β,\;Γ_Y\Rightarrowγ}{Γ_Y\Rightarrowβ\rightarrowγ}\rightarrow d$$
Abbiamo adesso dimostrato (per alcuni casi) la conversione da ND a PK, il primo teorema.

# Secondo teorema

Se $Γ$ è una successione finita o vuota di formule di $\mathcal{L}_0$ e $α \in For(\mathcal{L}_0)$, allora se $\vdash_{PK} Γ \Rightarrow α$, allora $|Γ| \vdash_{ND} α$.

La tecnica dimostrativa è molto simile alla precedente. Anche qui ragioniamo per induzione sul numero di nodi.

Base: la dimostrazione in PK ha $1$ nodo. Significa che è un assioma, e l'unico assioma è $p\Rightarrow p$. Questo ci dice tante cose:
* $α\equiv p$
* $α \in Γ$.

Ehhh... L'insieme supporto di questa successione contiene solo la $p$, perché ehhh insomma.

Possiamo derivare una cosa del genere in ND? Sì, l'albero per derivare $p \vdash_{ND} p$ è $p$, tutto qui, l'albero è quella singola lettera.

Passo induttivo:

Ipotesi di induzione: Se $\vdash_{PK} Γ\Rightarrowα$ con una dimostrazione che contiene $\leq m$ nodi, allora $|Γ| \vdash_{ND}α$.

Tesi: Se $\vdash_{PK} Γ\Rightarrowα$ con una dimostrazione che contiene $m+1$ nodi, allora $|Γ| \vdash_{ND}α$.

Sono quasi uguali. Il metodo di induzione verge sulla circolarità, ci somiglia molto, e invece non lo è.

La nostra ipotesi ci garantisce l'esistenza di questo albero:$$\begin{matrix}\vdots \\ Γ\Rightarrowα\end{matrix}$$Come è stata ottenuta quella formula? Con una qualsiasi regola. Il caso delle regole strutturali è banale, non sarà chiesto all'esame. Noi facciamo due esempi.

Congiunzione sinistra. Quindi non ho lavorato su $α$ ma su una formula del mio contesto. Questo mi dice che $Γ \Rightarrow α \equiv β\landγ,\;Σ\Rightarrowα$, dove $Σ=Γ \setminus \{β\landγ\}$. Quindi il mio albero è così:$$\dfrac{\begin{matrix}\vdots \\ β,\;γ,\;Σ\Rightarrowα\end{matrix}}{β\landγ,\;Σ\Rightarrowα}Λs$$Mettiamo in gioco l'ipotesi di induzione. Mi dice che $|β,\;γ,\;Σ| \vdash_{ND} α$. Quell'insieme supporto contiene $β$, contiene $γ$, e contiene le formule di $Σ$. Vale a dire che in ND ho:$$\dfrac{\begin{matrix}Σ&β&γ\\\vdots&\vdots&\vdots\end{matrix}}{α}$$Ci va quasi bene: nella derivazione che stiamo cercando, $β$ e $γ$ non sono assunzioni che possiamo lasciare aperte, $β\landγ$ lo è. Ma da qui è molto semplice:$$\dfrac{\begin{matrix}\begin{matrix}\\Σ\end{matrix}&\dfrac{β\landγ}{β}&\dfrac{β\landγ}{γ}\\\vdots&\vdots&\vdots\end{matrix}}{α}$$E quindi questo albero è proprio $|Γ| \vdash_{ND}α$, QED.

In tutta Italia, in *tutta* Italia, Cagliari è l'unico luogo in cui queste cose si fanno al corso ***introduttivo*** alla logica. È una prova di sadismo, ma anche una prova di *empowerment*. Il professore prova a farci studiare qualcosa di interessante, e a metterci alla prova.

Facciamo adesso il caso dell'implicazione destra:

Adesso non lavoriamo su una formula del contesto, ma necessariamente su quella attiva.$$\dfrac{\begin{matrix}\vdots \\ β,\;Γ\Rightarrow γ\end{matrix}}{Γ\Rightarrow β\rightarrowγ}\rightarrow d$$Di nuovo, ipotesi, $|β,\;Γ|\vdash_{ND}γ$. E quindi avrò un albero di derivazione in ND:$$\dfrac{\begin{matrix}Γ&β\\\vdots&\vdots\end{matrix}}{γ}$$E di nuovo, ci va quasi bene, tranne che per due cose: deve finire con $β\rightarrowγ$, e tra le assunzioni aperte l'unica che non va bene è $β$. *Come farò mai a risolvere questo problema? Come potrò fare?* Somiglia molto all'introduzione dell'implicazione. Perché è esattamente quello.$$\dfrac{\dfrac{\begin{matrix}Γ&[β]\\\vdots&\vdots\end{matrix}}{γ}}{β\rightarrowγ}\rightarrow I$$E quindi abbiamo che $|Γ|\vdash_{ND}γ$.

Nel terzo modulo, torniamo nel calcolo alla Hilbert e vediamo il teorema di completezza. È in realtà meno complicato dell'equivalenza dei calcoli.