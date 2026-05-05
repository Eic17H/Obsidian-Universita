## Concetto

Quando si prende una decisione rapida ma meno pensata a un certo punto dello sviluppo, le conseguenze potrebbero crescere e diventare difficili da gestire più avanti. Questo è detto ==debito tecnico==, o *technical debt* (TD).

Il termine è stato coniato nel 1992 da Ward Cunningham.

Si può spiegare confrontandolo con concetti della finanza:
### Metafora economica

| Finanza                      | Sviluppo                                |
| ---------------------------- | --------------------------------------- |
| Ottieni un prestito = debito | Scrivi codice "quick & dirty"           |
| Paghi interessi nel tempo    | Serve più manutenzione                  |
| Il debito si può estinguere  | Refactoring                             |
| Interessi composti           | Il TD porta ad altre scelte indebitanti |
| Bancarotta                   | Le modifiche diventano più costose      |

## Tipi di TD

Il debito può essere volontario o involontario, prudente o avventato. Se è prudente e volontario, può essere un modo per far arrivare in tempo il prodotto al mercato, se ci sono piani per colmare il debito. Se è avventato e involontario, è perché il team non è capace.

Se è involontario ma prudente, conosci i tuoi limiti e agisci entro essi. Se è avventato ma volontario, è ancora più una scommessa.
## Cause
* Serviva più tempo;
* Non ci sono test, quindi hai paura del refactoring perché potrebbe rompere tutto;
* Manca la documentazione, quindi non sai come mettere mano sul codice;
* Troppo accoppiamento, quindi una modifica ne comporta chissà quante altre;
* Codice duplicato, quindi la stessa modifica va fatta chissà quante volte;
* Nomi poco chiari, stile non rispettato;
* Funzioni troppo lunghe;
* Codice non reviewato.
## Sintomi
* Stime poco affidabili;
* Molta regressione;
* Task in lavorazione troppo a lungo;
* Build lente;
* Certo codice che nessuno vuole toccare (mi ricorda un certo progetto di SO);
* Più lead time, meno throughput.
### Kanban
* Più lavoro bloccato;
* Non si capisce quale WIP sia davvero WIP;
* Code più lunghe;
* Più feature che violano il WIP.
### Scrum
* Meno capacità reale;
* Stime meno credibili;
* Velocità costante all'apparenza;
* Fragilità;
* Le riunioni di retrospettiva diventano tutte uguali e non si dice niente di pratico.
## Soluzione

La soluzione al debito tecnico è la pratica del [[refactoring]].