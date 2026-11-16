Missingness: una feature manca da certi record. Se è presente in pochi record (40%) cancelli la feature. Se manca da pochissimi record (5%) cancelli i record. Se puoi immaginare quale sarebbe il valore guardando gli altri record, fallo. O in certi casi `NULL` è un valore utile da trattare come valore vero e proprio.

Media e mediana fanno una cosa simile in casi diversi, la media si fa influenzare di più dagli outlier.

Il rumore e gli outlier sono diversi come già detto grazie IA che fa le slide al posto del professore. [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Rumore|Per ridurre il rumore si possono usare smoothing e filtri mediani]], oppure raggruppamento (e poi fai media o mediana del gruppo) o regressione. Gli outlier si possono rimuovere se sono davvero inutili o tenere se sono inutili, per rilevarli puoi usare una formula che non ho intenzione di ricordare o altri metodi come Z-Score.

Duplicati. Prendo l'esempio dalle slide:

| id  | nome        | email                      | città       |
| --- | ----------- | -------------------------- | ----------- |
| 101 | Mario Rossi | m.rossi\@unica.it          | Napoli      |
| 184 | Rossi Mario | m.rossi\@studenti.unica.it | Naples      |
| 207 | M. Rossi    | mariorossi\@gmail.com      | Napoli (NA) |
Anche se i dati non sono tutti identici, questi sono tre record per la stessa persona.

I duplicati (insieme a far corrispondere gli schemi) sono il problema principale dell'integrazione dei dati.

Il resto della slide 2.2 non ho voglia, #todo.