## Tempi di accesso

Tempi di accesso alla memoria. Quello della memoria secondaria è 4 ordini di grandezza più grande di quella principale, quindi quella principale è trascurabile quando si considera il costo di un'operazione del DBMS. L'hard disk è meno dispendioso se si accede in modo sequenziale, la RAM invece può accedere in qualunque punto allo stesso costo (random access).

Vedi #slide sul buffer. Il direttorio contiene metadati.

Tutto ciò che spiega è nelle slide.

## Flush

Si fa un flush periodicamente. Anche per backup, ma soprattutto mi permette di azzerare tutti i bit di stato, così faccio le modifiche un po' alla volta anziché tutte insieme alla fine.

Se tutti i contatori sono maggiori di 0 è un caso brutto. Posso mettere in attesa l'operazione o posso fare finta di niente. Le #slide continuano ad avere informazioni.

## Strutture dati

Diciamo che cerchiamo un dato con un certo indice. Faccio ricerca binaria? Eh diciamo. Quello normale ha indice denso. Però diciamo che faccio una seconda tabella con indici sparsi, che mi dice per esempio a che indirizzo è il 50 e a quale il 70 (diciamo che sono sequenziali). Trovo così il 60. Posso avere più livelli di questa cosa.

Se devo fare DELETE però devo modificare sia i dati veri che tutti gli indici sparsi. Per velocizzare la ricerca faccio un tradeoff e rallento la delete.

Chiaramente l'indice sparso non funziona se hai dati disordinati. Se sono disordinati ti serve un indice denso: indici in ordine collegati a puntatori ai dati veri che sono in disordine.

Gli array e le liste sono lineari e sono poco flessibili, appunto con una modifica va a puttane tutto. Usiamo una struttura dati migliore, fatta ad-hoc per i DB: i B-tree, gli **Alberi Binari di Ricerca**! (dovrò inserire il link ad ASD quando farò il documento)

Ripassino. Un nodo B ha un sottoalbero sinistro A e uno destro C. Tutti gli elementi di A sono <B, // C >B. A e C sono ABR.

È meglio avere tante chiavi in un blocco o averne poche? Non lo so, ma è una domanda che ha fatto il professore.

I b-tree sono un po' diversi dagli ABR, hanno una cosa strana. Sono praticamente a 3 finché non hanno bisogno di essere a 2. E usano i puntatori anziché avere una struttura ordinata dall'array. Da vedere per conto mio.

E non basta, no? Ci sono i B tree, ma ora vediamo i B+ tree! Sì, B+, che cazzo. Sono utili per le range query, query che agiscono su un intervallo. Nei B tree, ciascun livello è ordinato internamente, no? Quindi basta mettere tutti i dati nelle foglie, così sono ordinati, e hai tutti i dati già ordinati. Come? Boh che strano, vedo dati che compaiono sia nei nodi interni che nelle foglie. Immagino si ripetano fino in basso. Scegli destra o sinistra dove mandare il dato, chiaramente non è ne maggiore né minore di sé stesso.