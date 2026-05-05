Il refactoring serve per evitare che il [[debito tecnico]] annulli il valore monetario che il cliente trae dal prodotto.

> *==**Refactoring**== is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure*
> Martin Fowler
## Cos'è
Serve a mantenere il codice in salute: semplice, facile da leggere, organizzato, facile da modificare. Prima e dopo il refactoring, la funzionalità è la stessa: è come convertire $\sum\limits_{i=0}^xi$ in $\tfrac{n^2-n}{2}$.
### Cosa non è
Non è un'attività cosmetica. Non si ripulisce solo il codice a vibe. Non si aggiungono feature, categoricamente. Non è bug-fixing, non stravolge il progetto, non cambia la piattaforma.
## Scopo

### Perché
Ordinare e semplificare il codice perché sia più facile lavorarci, semplificare il testing, rendere più leggibile il codice, rendere più facile trovare bug. Il codice è letto più spesso di quanto viene scritto.
### Quando
Non va pianificato temporalmente ("due settimane ogni due mesi"), va fatto quando in momenti strategici: prima di aggiungere funzionalità, prima di risolvere bug, e quando il codice è brutto ("puzza"); alcune puzze sono porzioni di codice troppo lunghe o troppo corte, codice duplicato, troppi commenti e log, i nomi non si capiscono. In generale, regola dell'80/20 (dove il 20% è di refactoring).
## Come si fa

### Come
* Modifiche piccole del codice;
* Procedure ben definite;
* Una volta fatti refactor di piccoli moduli, si fa quello delle sezioni più grandi.
### Cosa
* Dai ==nomi== più ==descrittivi== alle variabile e ai metodi;
* Rimpiazza i *magic number* con ==costanti== con nomi appropriati.
* ==Scomponi== i condizionali;
* Rimuovi il codice duplicato;
* Usa classi o enum per i parametri;
* Separate Query from Modifier: Rimosso print dalla logica. (non ho capito, è così nelle slide ma mi sembra un po' sconnesso);
### Tools
Immagina dover cambiare a mano il nome di un metodo che usi 300 volte. Se rinomini una classe, devi anche rinominare il file, gli import, ci vuole troppo. Ci sono tool che lo fanno in automatico. Alcuni IDE hanno tool semplici incorporati, e poi ci sono plugin più complessi, che per esempio ti dicono anche quando fare il refactoring.
## Tipi
No basta.