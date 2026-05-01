$Γ\models_{HK}α \rightarrow Γ\vdash_{HK}α$, e anche $\models_{HK}α \rightarrow \;\vdash_{HK}α$. Tutti i teoremi possono essere dimostrati.

## Contesto

La matematica ha bisogno di basi solide, fondamenta della conoscenza. Il pericolo della matematica è che tratta di infinito; noi sappiamo domare il finito, ma l'infinito potrebbe sfuggirci di mano e diventare contraddittorio senza che ce ne accorgiamo.

Hilbert riesce a domare l'infinito, usando dei metodi riconducibili al finito: le dimostrazioni sono successioni finite. Questa è l'illusione di Hilbert.

Gödel dimostrò che era, appunto, solo un'illusione, infatti dimostra che la matematica è incompleta e che non si può dimostrare la non contraddittorietà.

Ci ha appena rivelato che Gentzen usa poi il calcolo PK sul linguaggio $\mathcal L _1$, e immagino che sia lì che importa l'ordine delle formule nelle sequenze.

## Come lo dimostriamo

Vogliamo dimostrare che se $Γ\models_{HK}α$, allora $Γ\vdash_{HK}α$.
 
Può sembrare strano, ma viene più comodo dimostrarlo per contrapposizione, una forma di modus tollens: $α\rightarrowβ$ è equivalente a $¬β\rightarrow¬α$. E quindi $¬(Γ\vdash_{HK}α) \rightarrow ¬(Γ\models_{HK}α)$. Quale vantaggio ci dà? Sembra abbastanza difficile dire che *non esiste* una derivazione. Però ci dà maggiore controllo sulla tesi, perché $¬(Γ\models_{HK}α)$ significa $Γ\models_{HK}¬α$. E devo partire da elementi sintattici.

Servirà la nozione di [[insieme di formule inconsistente]].

## Dimostrazione

Non so se non ho capito che l'ha fatta o se non l'ha fatta e la vediamo la lezione dopo (a cui non andrò).