Protocollo: programma che si occupa di mettere in colloquio due nodi di livello pari (slide 41). Ci sono due vantaggi ad essere di livello pari:
* Stessa lunghezza (?), chiedere servizi a livelli superiori cedere servizi a livelli inferiori;
* Se modifico un livello, lo modifico su tutte le macchine
	* Non cambio le chiamate verso l'alto o verso il basso, faccio cambiamenti interni al livello.

(In sostanza la slide 43, memorizza gli schemi)

Nello schema della slide 43 ci sono due host per semplicità, possono essere di più. Standard ex lege a 7 livelli. Un router è un elaboratore, ma è specializzato e ha solo 3 livelli.

Nel TCPIP, il livello IP è il livello rete, ma arriva anche quasi a quello di trasporto. Il livello Data Link non manda bit, ma trame (*frame*). Il livello Rete manda pacchetti, il livello di Trasporto manda segmenti. I livelli Sessione, Presentazione e Applicazione mandano SPDV, PPDV e APDV rispettivamente (*... data unit*), hanno dato, indirizzo mittente e indirizzo destinatario, e un campo di controllo.

Necessario sapere una definizione minima di cosa fa ciascun livello.

Slide 44. Livello fisico: collegamento reale, tratta in bit (leggi le slide). Voltaggio basso per mandarli ma non troppo basso altrimenti si disperdono. Se sono troppo deboli si confondono con un'interferenza. Può avere pin/campi a uso futuro, non indicizzati ma magari serviranno dopo se aggiungiamo funzionalità.

Slide 45. Link. Gestione errori: lo fai qui altrimenti si diffonde in alto. Perché organizziamo in frame? Perché così sappiamo dove inizia e dove finisce il messaggio. Il frame non viene mandato e lasciato: resta al mittente finché il destinatario non manda una conferma di ricezione. Importante che ci sia una checksum. C'è un modo per delimitare i bit, viene chiesto all'esame, si usa l'inversione di voltaggio o simili. Con la checksum capiamo se i dati sono stati danneggiati. Hamming codes, correggo i dati rovinati, uso un po' di bandwidth per mandarli.

(In realtà con la tecnologia moderna ci sono talmente pochi errori che spreco meno bandwidth rimandando il messaggio l'1% delle volte che dedicando il 50% della bandwidth a ridurre la probabilità che un messaggio diventi illeggibile)

Slide 46. Livello router e pacchetti. Quando invio, voglio avere le stesse caratteristiche dell'ultimo invio. Se un nodo va giù, rerouto tramite un altro nodo -> tabella d'instradamento.

* T.D.I. statica: stabilita una volta a rete spenta, se casca un nodo i suoi percorsi vanno tutti giù, magari ok faccio due strade alternative per la stessa combinazione di partenza-destinazione, ma rischio comunque che vadano entrambe giù. Comunque se lo fai ridondante, stabile e robusto può essere molto ottimizzato. Utile solo se sai già quanto traffico avrai in anticipo.
* T.D.I. dinamica: controlla che i livelli di libertà e disponibilità di linee, porte, etc, non superino la capacità massima. Se raggiungi la capacità massima, blocchi quel path e ne crei un altro, magari più lento ma almeno c'è.

Il protocollo IP è dinamico. Se aggiungo un router, non devo spegnere la rete mondiale per aggiornare la tabella.

Il traffico stradale è una metafora perfetta per questo concetto. L'asse mediano quando giocano al Sant'Elia, congestione.

Protocolli di congestione: capiscono quanto si sta congestionando la rete. Al 50% della capienza allocano più risorse per sicurezza.

Si può usare l'enumerazione: primo pacchetto su 10 totali, per esempio.

Slide 47: Transport layer. Ultimo che fa controlli tra due host. Un pacchetto può anche essere piccolo quanto un carattere. Sorgente veloce e destinatario lento. Raro il downward. Vedi le slide.

Slide 48: ADSL, asincrono, ma si può sincronizzare tramite sessioni (che non esistono nel TCPIP).

Slide 49: Non in TCPIP, dove sessione e presentazione sono uniti in Applicazione. Questo della slide 49 si occupa dell'encoding.

Slide 50: Applicativo. Sia in ISO-OSI che in TCPIP. Su TCPIP si occupa anche di sessione e presentazione.

Slide 52: "Non presente" significa che non c'è un layer dedicato, ma le sue funzionalità ci sono comunque. I livelli dell'ISO-OSI sono raggruppati così nel TCPIP: (1, 2), (3), (4, 5), (5, 6, 7).

Nel TCPIP non c'è un "tubo", le cose arrivano quando arrivano, non in sequenza, e poi te le riordini quando le ricevi, perché magari fanno anche strade diverse. Più efficiente e dinamico. Si dice che è "privo di connessione" anche se sembra significhi un'altra cosa. Sfrutto l'efficienza della rete, velocissimo, posso perdere pacchetti.

Forse in realtà ho capito male, ho scritto anche che il TCP ha un tubo mentre UDP non ce l'ha ed è a datagram, ed è quello che può permettersi di perdere pacchetti.

"Datagram" viene da "data telegram".