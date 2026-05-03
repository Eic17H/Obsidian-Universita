Vediamo delle pratiche tipiche dell'XP, usate però da tutti gli sviluppatori agili.
Si basano su certi princìpi:
* Automatizzare tutti i test;
* Test Driven Development;
* AT associati a requisiti espressi come US.
## Test automatici

Tutti i test devono essere automatici, realizzati come codice. Chiunque deve poter girare facilmente tutti i test in qualunque momento.

Visto che si possono far partire in qualunque momento, possono formare una suite di regression test: si fanno ripartire i test dopo ogni cambiamento e ci si assicura che il comportamento del sistema non sia cambiato.

Così si risparmiano tempo e denaro, perché debuggare alla cieca è lento e costoso.

Per automatizzare i test, si usano dei [[Framework per i test automatici|framework]].
### Pro e contro

#### Pro
* Sistemi più affidabili;
* Test più facili da gestire e girare;
* Refactoring e modifica dei requisiti più fattibili in corso d'opera.
#### Contro
* I test non sono gratis;
* Bisogna bilanciare costi e benefici.

### Test Automation Manifesto

Il manifesto dei test automatici (Meszaros et al.) illustra le linee guida, caratteristiche che dovrebbero avere i test automatici:
* **==Concisi==**: semplici ma non banali:
* **==Self checking==**: devono comunicare i risultati direttamente, senza che un umano li debba interpretare;
* **==Ripetibili==**: ripetibili senza intervento umano;
* **==Robusti==**: lo stesso test sullo stesso codice deve dare lo stesso risultato, a prescindere dall'ambiente esterno, dall'ordine, dal fallimento di altri test etc;
* **==Sufficienti==**: devono verificare tutti i requisiti;
* **==Necessari==**: devono verificare solo i requisiti;
* **==Chiari==**: il codice del test deve essere comprensibile, e agire da documentazione del sistema che si testa;
* **==Efficienti==**: non ci mettono troppo;
* **==Specifici==**: ciascun fallimento deve essere avere una sola funzionalità corrispondente.

## Stakeholders

Gli stakeholder coinvolti nel testing automatico sono:
* Lo ==sviluppatore==, che deve tenere conto di quanto ci metterà ad automatizzare i test (unit e accettazione);
* Il ==manager==, che deve dare ai dev il tempo di creare i test, un investimento a lungo termine;
* Il ==cliente==, spesso il ==product owner== in Scrum, che deve partecipare alla creazione dei AT.

## Test-Driven Development (TDD)

I test prima di tutto. Prima scriviamo i test, poi scriviamo il codice da testare. Questa pratica si estende oltre il processo di testing, guida l'intero progetto. Se non si riesce a scrivere un test, il problema è che il progetto è organizzato male, non il codice.

Un po' di princìpi:
* Scrivere i test prima del codice;
* Tutto il codice deve avere UT;
* Tutti gli UT vanno superati, altrimenti si corregge il codice;
* Se si trova un bug non coperto dagli UT, si scrivono UT che avrebbero trovato il bug;
* I TA si girano spesso e i risultati sono pubblicati;
* Tutti i test devono essere automatici.

### I 6 passi

Spesso il TDD si applica eseguendo rapidamente questi passi:
1. Breve sessione di progettazione per capire quali aspetti del codice sono importanti per le proprietà in esame;
2. Si scrivono UT automatici;
3. Si eseguono i test, che devono necessariamente fallire visto che il codice non esiste;
4. Si implementa il codice che passa i test;
5. Si controlla se li passa davvero;
6. Si fa un refactoring sul codice e sui test per migliorarne il funzionamento e l'architettura.

### I 4 problemi

Il TDD risolve quattro problemi:
* ==Cowboy coding==: ci si impone di scrivere test e di fare codice che li supera, evitando il cowboy coding;
* ==Accoppiamento e coesione==: è più facile testare codice con basso accoppiamento e alta coesione;
* ==Fiducia==: se il tuo codice supera i test, i compagni si fidano di te;
* ==Ritmo==: avere il ritmo dei 6 passi evita di divagare.

## UT e AT
### Test unitari
* Un test per modulo;
* Una classe di test per classe del sistema;
* Stessi dev per test e codice;
* Gli UT sono raggruppati in una suite ed eseguiti automaticamente;
* Devono essere sempre superati al 100%;
* Storicamente, si usa il framework X-Unit.
### Test di accettazione
* Black box, stesso template;
* Scritti dal PO aiutato dai dev;
* Si basano sulle storie;
* Appartengono al cliente o al PO;
* Fanno anche parte della documentazione;
* Se il TA passa, la storia è implementata;
* Il progresso dello sviluppo si può capire da quanti TA passano;
* Meglio se sono automatici.

## Confronto con il testing tradizionale

|                    | Tradizionale           | Agile                            |
| ------------------ | ---------------------- | -------------------------------- |
| Quando si scrivono | Dopo lo sviluppo       | Prima o durante lo sviluppo      |
| Chi li scrive      | Cliente o QA           | Cliente, PO e dev, tutti insieme |
| Frequenza          | Alla fine del progetto | Ad ogni sprint                   |
| Automazione        | Non sempre             | Quasi sempre                     |
| Ruolo              | Verifica finale        | Progettazione e verifica         |
| User stories       | Quasi niente           | Sono i criteri di accettazione   |
