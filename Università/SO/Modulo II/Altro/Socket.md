La lezione di ieri ha introdotto i modelli di rete
    Non c'ero, ma le slide si capiscono mi dicono
Oggi, socket
Differenza tcp utp roba del genere:
    TCP - connessione affidabile, arrivano tutti i pacchetti, download file
    UDP - tollera che si perda informazione, meno controlli, streaming

Slide 32 - socket
Comunicazione interprocesso
Le pipe sono un buffer di memoria che risiede nel kernel
Per il socket locale si usa uno spazio nel file system
Locale, stessa macchina, socket di rete, anche via rete, assurdo
Altri tipi
Stream socket - tutti i socket TCP, più affidabile, garantisce l'ordine dei dati, garantisce che si stabilisca una connessione (3-way handshake), bidirez.
Datagram socket - UDP, no ordine dei dati, inaffidabile, non bidirezionale, o send o receive
Raw socket - non li useremo, controlli su protocolli di trasporto, troppo tecnico per noi
Le socket si basano su porte??? boh
Le socket le usiamo come API funzione in C, le chiamiamo Berkley Socket, perché hanno avuto origine in UNIX
    Unix molto diffuso lon academia et industria abbiamo detto, e c'era questa versione di Berkley, e lo stesso creatore ha creato primitive per socket

Anche nelle socket usiamo file descriptor, somigliano un po' a pipe

Quando 2 processi comunicano con socket, uno fa client e uno fa server
    Server accetta richieste multiple da più client che usano un servizio messo a disposizione dal server
Nei nostri esercizi client e server faranno cose molto simili, ma il ruolo è comunque diverso, vedremo

In socket stream (TCP) il server fa una bind: voglio svolgere il ruolo di server e accettare richieste su questo file descriptor
    La listen è la chiamata che dice: sono pronto ad accettare richieste dai client (è ora operativo)
    Client fa connect, richiesta di connessione: voglio connettermi a server a tot indirizzo
    Server accetta facendo accept, 3-way-handshake, sincronizzazione on, sessione avviata, cominciano a comunicare in modo bidirezionale
A differenza delle pipe, non serve una socket per direzione, una socket è bidirezionale (per 2dir con pipe servono 2 pipe)
Importante ricorda aaaaa rilascia memoria e socket, altrimenti rimane lì finché non spegni, soprattutto con un server
    Il server non si spegne mai, problema, e poi si moltiplica per ogni socket, pessimo, memory leak, saturi la ram, ti cade dalle tasche la memoria
        Più avanti useremo Java che risolve questo problema da solo, ma in C dobbiamo farlo noi

In UDP non viene instaurata una sessione, entrambe le parti sono paritarie, no recieve e send ma receiveFrom e sendTo
    TCP è tipo un albero con un nodo radice e tanti nodi foglia, UDP è un grafo qualunque quindi tutti sono collegati a più di uno magari
Vedi le slide
