Teorema nuovo. $Γ\vdash_{HK}α \leftrightarrow Γ\models_{HK}α$, e anche $\vdash_{HK}α \leftrightarrow \models_{HK}α$.

In una direzione, tutto ciò che dimostro è un teorema. Questo ci dice che il nostro calcolo non è stupido, dimostro solo cose vere. Nell'altra direzione è più interessante, io posso dimostrare tutti i teoremi.

Questo è un metateorema, chiariamo.

$\vdash \rightarrow \models$ è il teorema di correttezza, $\models \rightarrow \vdash$ è il teorema di completezza.

# Teorema

Per ogni $Γ \subseteq For(\mathcal L _0)$ e per ogni $α \in For(\mathcal L _0)$, se $Γ\vdash_{HK}α$, allora $Γ\models_{HK}α$.

Assumiamo $Γ\vdash_{HK}α$. Esiste almeno una derivazione di $α$ da $Γ$. È una successione finita di formule del linguaggio, che quindi avrà una lunghezza esprimibile con un numero naturale: induzione.

Il numero minimo di formule in una derivazione è $1$. Passo base: $n=1$. Però essendo una derivazione di $α$, deve terminare con $α$. L'unico passo è $α$. Siamo in HK, come la giustifichiamo? Come assunzione o come assioma.

Primo caso:$$\begin{matrix}1.&α&\text{assunzione}\end{matrix}$$Questo significa che $α\inΓ$.

Perché $Γ\models_{HK}α$ sia vero, allora quando tutte le formule in $Γ$ sono vere, deve essere vera $α$. Ma visto che $α\inΓ$, quello è vero quasi per definizione.

Secondo caso:$$\begin{matrix}1.&α&A\cdots\end{matrix}$$È un assioma, non sappiamo che numero. La conseguenza logica è monotòna. Essendo un assioma, abbiamo detto che tutti gli assiomi sono tautologie, e quindi $α$ in quanto tautologia è conseguenza logica dell'insieme vuoto, e quindi di qualunque altro insieme, quindi $Γ\models_{HK}α$. Guardiamo i nostri 11 assiomi e vediamo che sono tutti tautologie, quindi questo passo è risolto.

L'unico altro caso sarebbe se $α$ venisse da modus ponens, ma non ci sono abbastanza formule nel passo base per fare modus ponens, quindi il passo base è finito.

Passo induttivo:

Assumiamo che sia dimostrato fino a $n=m$.

Ipotesi: Se $Γ\vdash_{HK}α$ con una derivazione che contiene al massimo $m$ formule, allora $Γ\models_{HK}α$.

Tesi: Se $Γ\vdash_{HK}α$ con una derivazione che contiene al massimo $m+1$ formule, allora $Γ\models_{HK}α$.

Assumiamo l'ipotesi, dimostriamo la tesi.

Allora, noi sappiamo che abbiamo una certa successione $D$ con $m+1$ formule$$\left.\begin{matrix}1.&Γ\\\vdots&\vdots\\(m+1).&α\end{matrix}\right\}D$$Come giustifichiamo l'ultimo passo? Assunzione e assioma li sappiamo fare. Il caso interessante è se è la conclusione di un modus ponens. Ma ciò significa che l'ho giustificato così:$$\left.\begin{matrix}
1.&Γ\\
\vdots&\vdots\\
i.&δ\\
\vdots&\vdots\\
j.&δ\rightarrowα\\
\vdots&\vdots\\
(m+1).&α&R1,i,j
\end{matrix}\right\}D$$$D$ è una derivazione che contiene solo assiomi, modus ponens, e assunzioni in $Γ$. Tutti i tronconi iniziali (derivazioni con gli stessi passi da $1$ a un certo $k<m+1$) sono anche loro derivazioni in HK, che utilizzano assunzioni tratte dallo stesso insieme (i tronconi finali potrebbero non essere derivazioni). Quindi chiamiamoli $D'$ quello che arriva fino a $i$ e $D''$ quello che arriva fino a $j$. Il grande pregio che hanno $D'$ e $D''$ è che sono sufficientemente corte da applicarci l'ipotesi di induzione.

Io ho:
* $Γ \models_{HK} δ$
* $Γ \models_{HK} δ\rightarrowα$

E da questi due io voglio dimostrare:
* $Γ \models_{HK} α$

Ci siamo quasi.

Prendiamo una valutazione $\mathcal V$ tale che $\mathcal V (Γ) = 1$, abbreviazione informale che usiamo per dire che questa valutazione rende vera tutto $Γ$. Ogni tale valutazione mi rende vere anche le sue conseguenze logiche. $\mathcal V (δ)=1$, $\mathcal V (δ\rightarrowα)=1$. Ma le valutazioni sono funzioni dalle formule che rispettano le tavole di verità. Abbiamo un'implicazione vera con antecedente vero, necessariamente il conseguente è vero, quindi $\mathcal V(α)=1$, e quindi ogni volta che $Γ$ è tutto vero allora è vero $α$, che è come definiamo $Γ \models_{HK} α$.

Ora facciamo il *Metodo Google Maps™*. Per capire come arrivare da qualche parte, diamo uno sguardo d'insieme per avere una panoramica generale, vediamo i passi singoli, e poi torniamo alla panoramica.

Volevamo dimostrare $Γ \models_{HK} α$, l'abbiamo fatto per induzione. Al passo base, c'è una sola formula, che può essere un assioma o un'assunzione, e quindi in quel caso è vera. Passo induttivo, se è vera per $m$ formule lo è per $m+1$ formule, assioma o assunzione semplici, modus ponens per forza da formule precedenti, che sono dimostrate in $m$ formule o meno, e quindi per ipotesi di induzione sono conseguenza logica di gamma, e quindi con la definizione di valutazione e le tavole di verità siamo arrivati a dimostrare anche la tesi del passo induttivo.

Ecco il teorema di correttezza.

Adesso vogliamo dimostrare il viceversa, il teorema di completezza.