---
cssclasses:
  - dm
---
Il processo è cambiato nel corso del tempo. Il vecchio processo KDD (Knowledge Discovery in Databases) era:
* Selezione dei dati
* Estrazione di pattern e modelli
* Interpretazione
* Conoscenza utile

La moderna pipeline di data mining è invece:
* Definizione del problema, rilevazione degli obiettivi
* Data understanding
* Preprocessing per pulire e integrare i dati
* Estrazione di pattern e modelli
* Valutazione di qualità e utilità del modello
* Interpretazione e comunicazione dei risultati
* Conoscenza utile

Tutto parte dai dati, che possono essere di vari tipi: tabelle, database, log, testo, immagini, sensori. Il data understanding consiste nel comprendere l'organizzazione dei dati e cosa rappresentano, e trovare eventuali problemi che ci portano a preprocessare i dati o a scartarli completamente.

La preparazione dei dati (che le slide proclamano essere diversa dal preprocessing senza dire davvero la differenza) consiste nella pulizia (correzione di errori e buchi), integrazione di dati da più fonti, codifica e scaling dei dati, e <span class="isw">[[Triennale/Anno 3/Semestre 2/ISW/Progetto/Progetto|riduzione]]</span> dei dati, cioè selezione e compressione.

Il modeling può consistere di classificazione (raggruppare in categorie strette), regressione (ricondurre a una funzione lineare), clustering (raggruppare in gruppi), associazione, pattern sequenziali e rilevazione di anomalie. Tutto questo come modello predittivo, cioè una volta deciso come applicare queste cose ai dati in input, il modello deve sapere da solo come trattare i nuovi dati futuri.

Da lì possiamo valutare il modello secondo diversi criteri. Accuratezza, come se la cava con dati nuovi (generalizzazione) o col rumore (robustezza), efficienza (complessità) e soprattutto, *business relevance*, devi vedere se è davvero utile.

Una volta che abbiamo l'output del modello dobbiamo capire che farci. Cosa ci dice l'output, come lo possiamo riassumere a parole, come dobbiamo muoverci in funzione di quello che abbiamo imparato dall'output.

Degli errori comuni sono:
* Partire volendo già un algoritmo specifico, anziché guardare il problema e capire che algoritmo va usato.
* Ignorare la qualità dei dati.
* Applicare il preprocessing prima della separazione tra dati di training e dati di test (si è dimenticato di dirci cosa sono).
* Usare metriche sbagliate.
* Comunicare risultati senza interpretarli.
* "Confusing statistical patterns with useful knowledge".

## Differenze tra due cose alla volta

Perché all'IA che ha fatto le slide piace tanto.
### Preprocessing vs [[data preparation|preparation]]

Il preprocessing fa parte della preparation. Il preprocessing pulisce, integra, codifica, scala e riduce i dati. La preparazione include il preprocessing, ma anche la riduzione del data leakage, il design della pipeline e la separazione del dataset. Praticamente la preparazione ti costruisce un dataset utile a partire dal dataset mezzo inutile con cui parti.

### Predictive vs descriptive

Con la predizione, vuoi predire il valore di una variabile target. Apprendimento supervisionato. Classificazione e regressione. Sai già che esiste una regola e vuoi che il modello capisca come si comporta quella regola nello specifico.

Con la descrizione, non parti con un target, stai cercando di capire se esistono pattern e strutture. Analisi esplorativa non supervisionata. Clustering, associazione, regole.

Il rilevamento delle anomalie è condiviso da entrambi i tipi.

### Interpretazione e reporting

Ma siamo seri? Ma che slide è questa.

![[Pasted image 20261116063710.png]]

Che schifo

![[Pasted image 20261116064031.png]]