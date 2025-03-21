Ci sono app web statiche e dinamiche.
Se mi collego a un sito, sto semplicemente chiedendo al server di mandarmi pagine web, che sono file (tipicamente file .html) nel suo file system.
Un sito statico, ogni volta che vi accedi ti manda lo stesso file html. Puoi vederlo come un file in una cartella, e poi ti sposti di file e di cartella.
In quelle dinamiche invece, le pagine non sono più un file statico nel file system del server, sono una risorsa leggermente differente che viene confezionata al momento della richiesta.
Io richiedo al server, il server accetta, confeziona una pagina sul momento (dinamicamente) e poi me la manda. Se lo faccio domani, se lo fa qualcun altro, ne confeziona una diversa a seconda dei dati.

Esempio statico:
Sito vetrina. Mostra i prodotti, il numero di telefono e basta. Sono scritte in un file in un file system.

Esempio dinamico:
Facebook (il sito). La mia homepage è diversa dalla tua.

Insomma, avremo dei server con servizi, e client che li richiede.
Noi semplificheremo molto, perché avremo client e server sulla stessa macchina.

Un browser web è un programma che legge le risorse di un file html e le disegna, le renderizza, le visualizza.
Il server ci manda di fatto qualcosa che è sempre testuale, codice.
È solo il browser che lo interpreta e ce lo fa vedere convertendolo in qualcosa di organizzato visivamente.

Un tempo, i browser non erano standardizzati. Adesso perlopiù sì. Prima era difficile fare un sito che si vedeva uguale in ogni browser.
Quello che dava più problemi era Internet Explorer. Era l'incubo dei programmatori web. Stavi ore a fare una pagina bella, poi su IE si rompeva.

Server e client comunicano tramite il protocollo HTTP, che ha una sintassi che consente a client e server di comunicare.
Un tempo gli unici client erano i browser, adesso ci sono anche le app ma vedremo solo i browser.
La versione che rimane più utilizzata è HTTP 1.1, del 99, vecchia ma ancora lo standard.

Il web è nato come rete di ipertesti (HT), file di testo interconnessi.
L'obiettivo era di trasferirli (T).
T. Barners-Lee ha risolto questo problema con un protocollo (P).
Ecco, HTTP: HyperText Transfer Protocol.
Da allora, sono cambiate le velocità, i protocolli interni ai server, ma rimane valido.

Questo protocollo non ha stati. Finito un trasferimento, il prossimo non è correlato al precedente
In realtà esistono modi di correlarli, ma non sono proprie del'HTTP, ma sono costruite sopra il protocollo.

Le richieste sono eseguite col protocollo TCP, che vedremo a Reti Di Calcolatori
Le slide sono utili.

Gli indirizzi IP non fanno parte di questo corso.
Insomma l'indIP ci dice come collegarci al server.
Non lo dice proprio a noi. Noi mettiamo un URL, il browser chiede al DNS a quale indirizzo IP corrisponde, e POI ci connettiamo al server.
Chiediamo, tipicamente, il file index.html.

Quando noi pensiamo di richiedere una pagina web, nella nostra mente è solo un file su un file system.
In realtà è una combinazione di una marea di risorse separate.

Richiesta HTTP. Ci sono diversi metodi.
Metodo GET: i dati viaggiano in chiaro.
Metodo POST: i dati in transito non sono visibili.
Quindi magari Get ho l'url www.sito.web/page?dati=imieidatiinchiaro, invece Post ho i miei dati in un file a parte e non nell'URL.

Ci sono codici risposta HTTP.
Per esempio "404" significa "file non trovato", ma è un errore LATO CLIENT (come tutti quelli che cominciano con 4).
500 server error.
Non vanno ricordati tutti a memoria per questo esame.
Per altri esami sì.
Vedi le slide va'.