---
cssclasses:
  - ip
---
Un'immagine è una versione finita e discreta di una proiezione bidimensionale di una scena tridimensionale. è una funzione discreta, la cui ampiezza è detta ==*valore*==. Le immagini quindi sono rappresentate da matrici: ogni punto è identificato da una posizione, e a ogni punto corrisponde un valore.

Vediamo nelle slide un'immagine *monocromatica* di un topo. Con monocromatica si intende scala di grigi, quindi ogni pixel ha un valore scalare che va da $0$ a convenzionalmente $255$, o comunque fino a $l-1$, dove $l$ è il numero di step possibili. Quindi le zone più chiare avranno valori vicini a $255$, e le zone più scure valori vicini a $0$.

Il digital image processing è l'utilizzo di algoritmi che modificano le immagini, a scopi vari. Migliorare la qualità visiva (*enhancement*), convertire in codifiche alternative per la compressione, generare visualizzazioni (computer grafica), oppure per produrre modelli per l'*understanding*, che non faremo perché quella è computer vision.

Un esempio di enhancement è di rendere più visibili dei dettagli che sono presenti nell'immagine ma che non sono evidenti a occhio, un esempio banale è l'aumento del contrasto. Un altro è di rimuovere dettagli che non vogliamo vedere, e la cui presenza distoglie l'attenzione dai dettagli che ci interessano, per esempio la riduzione del rumore. Impareremo quali sono le metriche che ci permetteranno di fare queste modifiche.

Foto dalle #slide.

Immaginiamo di voler contare gli oggetti presenti in un'immagine, ma di volerlo far fare a un computer. Possiamo isolare ciascun oggetto in un'area di colore distinto dallo sfondo, questa è detta *segmentazione*.

Ci sono dei passi fondamentali, oltre alla conoscenza del problema, nell'image processing:
* Acquisizione delle immagini;
* Filtri ed enhancing per correggere gli errori dell'acquisizione;
* Restaurazione delle immagini da interferenze;
* Elaborazione morfologica, che può intervenire in qualunque fase, uno strumento che si basa sull'algebra, l'immagine viene vista come un insieme, che permette di riconoscere le forme ed eliminare rumore, ci si può fare filtraggio, strumento molto potente;
* Segmentazione, si isolano gli oggetti dallo sfondo, facile quando ci sono oggetti scuri uniformi su sfondo chiaro uniforme;
* ...

Definizione di immagine digitale. Si ottiene in due fasi, campionamento e digitalizzazione. Vedi #slide.

Quando quantizziamo troppo possiamo cominciare a percepire dei contorni falsi, che in realtà non ci sono, quindi dobbiamo vedere che tipo di campionamento e quantizzazione è più adatto al nostro scopo.

Le immagini a colori, niente vedi #slide oggi non ho voglia e sono cose molto base.

Locale: $3 \times 3$, perché dispari? Perché ci va un pixel al centro.

Qual è la distanza tra due pixel? L'opzione più intuitiva è di usare il teorema di Pitagora. Però può anche essere utile pensare alla distanza di Manhattan: non ti puoi muovere in diagonale, solo in verticale e in orizzontale, in una griglia, conta i passi. E poi ce n'è una simile, la distanza di otto, dove puoi anche andare in diagonale.

Similmente, possiamo decidere se considerare due pixel come connessi se sono collegati di lato o di lato e in diagonale. Cioè, due pixel sono adiacenti se condividono solo un angolo?

Il più comune rumore è gaussiano, cioè rumore che segue la classica distribuzione gaussiana.