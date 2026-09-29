Categoria: Informatica

L’insegnamento fornisce conoscenze teoriche e competenze metodologiche e operative per progettare, realizzare e valutare processi di Data Mining, dalla comprensione e dalla preparazione dei dati alla costruzione, alla selezione e all’interpretazione di modelli predittivi e descrittivi.
### Conoscenza e capacità di comprensione.  
Al termine del corso lo studente conoscerà le principali fasi di un processo di Data Mining; le tipologie e le caratteristiche dei dati; i problemi di qualità, rappresentazione, similarità e preparazione dei dati; i fondamenti dell’apprendimento supervisionato e non supervisionato; i principali metodi di classificazione, regressione, clustering, estrazione di regole di associazione, analisi di pattern sequenziali e rilevamento di anomalie; i protocolli e le metriche per la valutazione dei modelli.  
### Capacità di applicare la conoscenza e la comprensione.  
Lo studente sarà in grado di impostare una pipeline di analisi end-to-end, selezionare e applicare tecniche adeguate al problema e ai dati disponibili, implementare esperimenti riproducibili in Python, definire protocolli di validazione appropriati, confrontare modelli alternativi e interpretarne criticamente i risultati, anche in contesti nuovi o non familiari.
### Autonomia di giudizio.  
Lo studente saprà motivare le scelte relative a dati, preprocessing, algoritmi, iperparametri e metriche; individuare problemi quali data leakage, overfitting, sbilanciamento delle classi e valutazioni non affidabili; valutare limiti, robustezza, interpretabilità e possibili implicazioni etiche dell’analisi.
### Abilità comunicative.  
Lo studente saprà descrivere con linguaggio tecnico appropriato un problema di Data Mining, documentare dati, metodi ed esperimenti, presentare risultati mediante tabelle e visualizzazioni e discutere le proprie scelte con interlocutori specialisti.
### Capacità di apprendimento.  
Lo studente sarà in grado di consultare autonomamente manuali, documentazione software e letteratura tecnica, approfondire metodi non trattati nel corso e trasferire le competenze acquisite a nuovi dataset, domini applicativi e strumenti.

## Informazioni abbastanza utili

### Prerequisiti

Per frequentare proficuamente l’insegnamento sono richieste le seguenti conoscenze, abilità e competenze:  
  
- capacità di programmazione: familiarità con il linguaggio Python e con ambienti notebook; le librerie necessarie per le attività pratiche saranno comunque introdotte o richiamate durante il corso;  
- comprensione di algoritmi di base  
- conoscenza di base di elementi di probabilità e statistica descrittiva e inferenziale, incluse distribuzioni, media e varianza, correlazione;  
- conoscenze di base sulla rappresentazione e gestione di dati tabellari;  
  
Le eventuali propedeuticità formali sono quelle previste dal regolamento didattico del Corso di Studio.

### Contenuti

PARTE TEORICA  
  
Le lezioni frontali introducono i fondamenti teorici, gli algoritmi, i criteri di scelta dei metodi e le procedure di valutazione, alternando spiegazioni, esempi guidati e discussione di casi applicativi.  
  
Programma generale:  
  
1. Fondamenti e comprensione dei dati  
  
Introduzione al Data Mining e al processo di scoperta della conoscenza; principali task e applicazioni; tipologie, rappresentazione e qualità dei dati; statistiche descrittive; misure di similarità e di distanza.  
  
2. Data preparation  
  
Esplorazione e visualizzazione dei dati; gestione di valori mancanti, rumore, duplicati e outlier; integrazione e trasformazione; normalizzazione, discretizzazione e campionamento; riduzione della dimensionalità (PCA, LDA 9t-SNE etc.); metodi filter, wrapper ed embedded per la selezione delle caratteristiche; costruzione di pipeline riproducibili.  
  
3. Data Mining predittivo: classificazione  
  
Fondamenti dell’apprendimento supervisionato; k-nearest neighbors, Naive Bayes, alberi decisionali, support vector machine, metodi ensemble e fondamenti delle reti neurali. Valutazione dei classificatori: suddivisione train/validation/test, cross-validation, overfitting, matrice di confusione, accuracy, precision, recall, F1-score e ROC-AUC; gestione dello sbilanciamento delle classi e confronto tra modelli.  
  
4. Data Mining predittivo: regressione  
  
Regressione lineare e polinomiale; cenni alla regolarizzazione e alla selezione del modello; valutazione mediante MAE, MSE, RMSE, MAPE e SMAPE; analisi e interpretazione dei residui.  
  
5. Data Mining descrittivo e orientato ai pattern  
  
Clustering: k-means, clustering gerarchico e DBSCAN; valutazione mediante SSE, silhouette e misure esterne. Regole di associazione: supporto, confidenza, lift e algoritmo Apriori. Introduzione al sequential pattern mining e all’anomaly detection. Aspetti trasversali relativi all&#39;interpretabilità, al bias e all&#39;uso responsabile dei dati e dei modelli.  
  
PARTE PRATICA  
  
Le attività pratiche sono svolte prevalentemente in Python, mediante notebook e librerie per l’analisi dei dati e il machine learning. Esse guidano gli studenti nella costruzione di pipeline che comprendono esplorazione, preprocessing, addestramento, validazione, confronto tra modelli e interpretazione dei risultati.  
  
Le esercitazioni comprendono problemi numerici, applicazione manuale di algoritmi, lettura e interpretazione degli output, confronto tra metodi alternativi e analisi critica degli errori metodologici.

Il progetto finale, individuale o svolto in gruppi di massimo tre studenti con carico di lavoro proporzionato alla numerosità del gruppo, richiede l’applicazione integrata delle competenze acquisite a un dataset e a un problema di Data Mining.

### Materiale di studio

Materiali, consegne e comunicazioni sono disponibili sulla piattaforma didattica del corso (portale e-learning e canale Teams dedicato).

Testi principali

- P.-N. Tan, M. Steinbach, A. Karpatne, V. Kumar, Introduction to Data Mining, 2nd edition, Pearson, 2019.
- J. Han, J. Pei, H. Tong, Data Mining: Concepts and Techniques, 4th edition, Morgan Kaufmann, 2022.

Testo consigliato per approfondimenti:
-G. James, D. Witten, T. Hastie, R. Tibshirani, J. Taylor, An Introduction to Statistical Learning with Applications in Python, Springer, 2023.

Materiale didattico integrativo:
-slide e dispense predisposte dal docente;
-notebook Python, dataset ed esercitazioni;
-documentazione ufficiale delle librerie utilizzate, in particolare pandas, NumPy, Matplotlib e scikit-learn.

Ulteriori testi consigliati per l’approfondimento di argomenti specifici saranno segnalati durante il corso.

Sulla piattaforma didattica del corso saranno disponibili:

- slide delle lezioni;
- notebook Python utilizzati durante le dimostrazioni;
- dataset e tracce delle esercitazioni;
- soluzioni o linee guida per lo svolgimento degli esercizi;
- esempi di quesiti e prove d’esame;
- istruzioni per l’installazione e l’utilizzo dell’ambiente software;
- tracce, vincoli di consegna e rubrica di valutazione del progetto;
- riferimenti bibliografici e collegamenti alla documentazione tecnica.

Le attività pratiche utilizzeranno principalmente Python e ambienti notebook, con librerie dedicate alla manipolazione dei dati, alla visualizzazione e al machine learning. Gli studenti sono invitati a conservare il codice, i risultati e gli esperimenti in modo ordinato e riproducibile.

Gli studenti lavoratori devono fare riferimento allo stesso programma, agli stessi materiali e alle medesime modalità di verifica previste per gli studenti frequentanti. È raccomandata la consultazione regolare della piattaforma didattica per comunicazioni, aggiornamenti e precisazioni sui materiali di studio e sulle modalità di consegna del progetto.

## Valutazione

La valutazione è espressa in trentesimi ed è composta da:

- una componente scritta, fino a 20 punti;
- un progetto, fino a 10 punti;
- un eventuale bonus, fino a 2 punti complessivi.


### Componente scritta

La componente scritta è articolata in una serie di domande a risposta aperta e a risposta multipla. Comprende quesiti teorici volti a verificare:

- la conoscenza e la comprensione dei metodi;
- la corretta applicazione di algoritmi e metriche;
- la capacità di analizzare dati, output e risultati sperimentali;
- la capacità di motivare le scelte metodologiche.


Sono previste inoltre due prove intermedie durante il corso (una orientativamente a metà novembre, una a fine corso). Ciascuna prova in itinere superata esonera dalla corrispondente sezione della prova scritta finale. Il superamento di entrambe le prove in itinere esonera dall’intera prova scritta. In occasione degli appelli, lo studente sostiene soltanto le sezioni non superate o non sostenute.

La soglia minima per superare ciascuna prova (sia la prova totale sia quella in itinere) è pari a 12/20.

Per prestazioni di particolare qualità nelle prove di preparazione, programmate prima di ciascuna prova in itinere, può essere attribuito fino a 1 punto bonus per prova, per un massimo complessivo di 2 punti.


### Progetto

Il progetto può essere svolto individualmente o in gruppi di massimo tre studenti. Per i gruppi di due o tre componenti sono richieste, rispettivamente, una o due estensioni rispetto al nucleo di attività comune.

La valutazione del progetto è articolata come segue:

- qualità, correttezza e completezza del report;
- organizzazione e riproducibilità del codice;
- breve discussione tecnica individuale.

La discussione tecnica non prevede una presentazione formale, ma comprende alcune domande dirette a verificare l’effettiva comprensione del lavoro e il contributo individuale dello studente.

La soglia minima del progetto è di 6/10.


### Determinazione del voto

L’esame è superato quando:

- la componente scritta è almeno pari a 12/20;
- il progetto è almeno pari a 6/10;
- il punteggio complessivo è almeno pari a 18/30.

Il voto finale è ottenuto sommando i punteggi delle componenti scritta, del progetto e dell’eventuale bonus ed è ricondotto in trentesimi.

La valutazione tiene conto della correttezza delle conoscenze, dell’appropriatezza delle procedure e delle metriche utilizzate, della capacità di interpretare criticamente i risultati e i limiti, della chiarezza del linguaggio tecnico e dell’autonomia dimostrata nel progetto.

18–21: preparazione sufficiente, prevalentemente esecutiva, con capacità di applicare le procedure fondamentali;
22–24: preparazione adeguata e complessivamente corretta;
25–27: buona padronanza degli argomenti e capacità di analisi;
28–30: padronanza molto buona o eccellente, accompagnata da autonomia, rigore e capacità critica.

La lode può essere attribuita quando il punteggio grezzo è superiore a 30 e la discussione individuale dimostra comprensione, autonomia e capacità critica eccellenti.