Prima si capisce se il progetto è fattibile e utile, poi si capisce cosa serve per farlo, poi si progetta concettualmente la struttura, la si realizza, la si valida e collauda tramite QA e ricerca dei bug, e così si raggiunge uno stato che funziona. Se un passo fallisce, si può passare al passo precedente e risolvere dei problemi. In un mondo ideale in cui tutto è perfetto, si andrebbe sempre solo al prossimo passo.

* Le specifiche: scritte e tabelle su un foglio
* Progettazione concettuale: un grafo o qualcosa del genere che spiega come concettualizzi i dati
* Progettazione logica: non posso mettere il mio disegno a mano nel computer, quindi rappresento il mio modello concettuale con delle relazioni
* Progettazione fisica: rappresento effettivamente nel codice con dei dati veri nel mio computer la struttura che avevo ideato logicamente, tramite strutture dati eccetera

Il modello concettuale più diffuso è il modello entità-relazione.

Una cosa che si chiama relationship ma che noi chiamiamo associazione per non confonderci con le relazioni che sono le tabelle, sono cose che collegano due entità, a livello concettuale. Potrebbero diventare tabelle o potrebbero diventare attributi di tabelle. Le associazioni non hanno un verso, quindi proviamo a non usare verbi perché quelli hanno soggetto e oggetto. Quindi anziché "vive in" diciamo "residenza": "X ha la residenza a Y" e "Y è la resistenza di X".

Se due entità sono legate da un'associazione, non possono avere coppie di istanze ripetute. Lo stesso cliente non può ordinare lo stesso prodotto due volte.