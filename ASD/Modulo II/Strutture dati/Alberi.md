 * Gli alberi sono strutture dati molto potenti.
 * Vediamo anche heap e coda con priorità, tipi di alberi.
 * L'heap si può usare per ordinare in nlogn (il meglio per l'ordinamento): heap sort.
 *
 * Termini: nodo, grado, radice, foglia, padre, figlio, fratello, antenato, discendente, livello (>=1), altezza/profondità.
 * Albero pieno (ha max nodi per lvl), completo (broad search non ha buchi).

/**
     * Il nodo ha informazione sui dati e sui collegamenti
     * Grado (massimo 2 nei binari)
     * Foglia, padre, radice, fratelli, antenati, discendenti
     * Livello: radice:1, il resto +=1
     *
     * Albero binario: due sottoalberi a loro volta binari
     * ABR: chiavi uniche, sottalbero sx valori minori, sottoalbero dx valori maggior
     * nodo {key *parent *left *right}
     * inserimento: confronta e vai a sx o a dx finché non raggiungi una foglia, poi lo aggiungi
     */