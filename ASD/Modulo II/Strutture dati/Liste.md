// LISTE LINEARI DOPPIAMENTE CONCATENATE (utile per PR1)
    /**
     * Insieme di nodi tutti collegati
     * Ogni nodo ha uno o più campi puntatore, che puntano ad altri nodi
     * Lista singolarmente concatenata: un puntatore al prossimo
     * Lista dopp: uno al prox, uno al prev
     * Lineare: l'ultimo punta a NULL, niente punta al primo
     * Circolare: l'ultimo punta al primo, quindi non c'è un ultimo e un primo
     */

    /**
     * Liste LDC
     * nodo:
     *      nodo* prev
     *      nodo* next
     *      Tipo item
     * l'item è il contenuto, e ha il tipo che ci serve, come int o Giocatore
     *
     * Inserimento ordinato:
     *      Bisogna sapere dove va inserito
     *      Si inserisce adattando i prev e i next
     *      1 21 33 77 devo inserire 50
     *      |1| 21 33 77 più piccolo
     *      1 |21| 33 77 più piccolo
     *      1 21 |33| 77 più piccolo
     *      1 21 33 |77| più grande, lo inserisco qui
     *      33 <-> 50 <-> 77
     *
     * Cancellazione
     *      Cerco 50
     *      |1| 21 33 50 77
     *      1 |21| 33 50 77
     *      1 21 |33| 50 77
     *      1 21 33 |50| 77 trovato
     *      33 <-> 50 <-> 77
     *      33 <--------> 77
     *
     * Fusione di due liste
     *      Nuovo puntatore di testa
     *      Nessun nuovo nodo
     *      Guardo quale testa è minore, pop nella nuova lista, finché una non è vuota
     *      Ciò che rimane lo metto direttamente
     *
     * Per l'esercitazione, puoi scegliere due versioni
     * Una un reskin dell'altra
     * Catalogo Netflix o playlist Spotify
     * Campi:
     *      Titolo serie/canzone
     *      Genere
     *      N episodi
     * Elementi ordinati alfabeticamente: strcmp()
     */

/**
 * Funzione aggancia(nodo a, nodo b):
 *      a.next = &b
 *      #se doppiamente concatenata:
 *          b.prev = &a
 *
 * Funzione inserisci(nodo vecchio, nodo nuovo):
 *      aggancia(nuovo, vecchio.next)
 *      aggancia(vecchio, nuovo)
 */
