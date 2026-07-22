Una **==User Story==** è una breve descrizione di un'interazione tra un utente e il sistema, dal punto di vista dell'utente, scritta in linguaggio naturale. Una storia si concentra su una feature, e ciascuna feature deve avere almeno una storia. Le storie sono scritte dal cliente o dal PO con l'aiuto degli sviluppatori.

Le storie si scrivono su schede A6. Sono indipendenti tra loro. I dev devono stimare quanto ci mettono a realizzarle. Devono essere testabili e non ambigue, ma sono ammessi chiarimenti.

> **Backlog**: elenco di storie non ancora implementate, lavoro arretrato.

## Confronto con i casi d'uso
### Punti in comune
* Descrivono funzionalità;
* Incrementi dello sviluppo, guidano le iterazioni;
### Differenze
* Le storie sono più semplici e non sono esaustive;
* Le storie sono scritte da cliente e PO, i CdU sono scritti dagli analisti dopo aver parlato col cliente;
* I CdU descrivono i requisiti in modo più completo.

## Raccolta

Si raccolgono durante tutto il progetto, ma la maggior parte si raccolgono all'inizio. Nella prima fase, si raccolgono in riunioni tra cliente e sviluppatori.
### Approcci

#### Goal-oriented
Si parte considerando l'obiettivo del sistema, si capiscono i passi necessari ad arrivare all'obiettivo, e poi si scrivono quei passi nelle storie.
#### Scattergun
Le riunioni non hanno una struttura, si *spara a casaccio* (capito, pistola) e si scrivono le storie basandosi su ciò che emerge dalla riunione.

## Invest

Un acronimo che aiuta a ricordare le caratteristiche che devono avere le storie:
* ==**I**==ndipendente;
* ==**N**==egoziabile col cliente;
* ==**V**==aluable (di valore);
* ==**E**==stimable (stimabile);
* ==**S**==ized (dimensionata) correttamente;
* ==**T**==estabile.

### Indipendente
L'implementazione di una storia non deve dipendere da un'altra. Non è sempre evitabile, ma va minimizzato. Per esempio, "Login" e "Logout" dipendono da "Creazione di un account".
### Negoziabile
Non sono contratti, non sono requisiti assoluti. Non devono essere troppo dettagliate, altrimenti portano a pensare che non ci sia altro da aggiungere o precisare. Bisogna poterle rifinire con cliente e PO.
### Di valore
Ogni storia deve avere un valore per l'utente, che sia tramite informazioni, azioni, o soldi. Deve essere qualcosa per cui valga la pena pagare.
### Stimabile
Una storia non è stimabile se è troppo grande, se gli sviluppatori non sanno fino a che punto si deve spingere, e se non sono capaci a realizzarla. Se non è stimabile, si arriva a una situazione rischiosa e non si può pianificare lo sviluppo, che è lo scopo delle storie.
#### Stime
Le stime si esprimono in *story points*, punti-storia. Spesso ma non sempre, 1 PS equivale a una giornata di lavoro, ma c'è chi lo usa come mezze giornate, come ore, o altre durate. Dopo un certo limite (per esempio, due settimane, 10 PS), la storia diventa un'*epica*. La stima si basa sull'esperienza su altre storie simili, in mancanza della quale si sperimenta; questi esperimenti sono le *spike solution*: si sperimentano soluzioni fatte male usa e getta per capire quanti PS dare a una storia, è gestione del rischio.
### Dimensionata
Una storia troppo grande, che magari impiega troppo tempo ad essere realizzata, è detta *epica*. Le epiche devono essere scomposte in sezioni tali che ciascuna sia comunque una storia, e che queste storie siano indipendenti e si realizzino in pochi giorni ciascuna, se non meno.
### Testabile
Ogni storia deve avere almeno un Test di Accettazione (TA), test funzionali che verificano se la storia è stata implementata correttamente. Si scrivono in codice, simulano un utente, e si possono eseguire in automatico quando serve. Ci sono framework, come Selenium, per farlo con le pagine web.
#### Test
I TA sono scritti dal cliente o dal PO, hanno una relazione molti-a-una con le storie. I dev li automatizzano e devono essere ripetibili. Una storia si considera completata quando passano tutti i test.

## Come si scrivono

Un possibile schema è, per esempio, "sono un ==tipo di utente==, voglio ==azione==, per/perché ==motivo==": *in quanto ==cliente abituale== voglio ==vedere quanti punti fedeltà ho== per ==sapere quando avrò lo sconto==*.

E c'è uno schema corrispondente per i TA: "dato che ==contesto==, quando ==succede qualcosa==, allora deve succedere che ==risultato==": *dato che ==i clienti abituali hanno diritto a uno sconto==, quando ==un cliente vuole avere informazioni sul suo diritto allo sconto==, deve ==poter sapere quanti punti fedeltà ha==*.

### Schede

Le schede devono seguire una certa struttura, con questi elementi:
* ==Titolo==: due o tre parole, con un verbo attivo al presente, come coi CdU;
* ==AT==: una lista di test associati;
* ==Priorità==: decisa dall'utente, dice quali vanno implementate prima, usando di solito tre livelli di priorità (1 è la priorità massima, 3 è la minima);
* ==Story points==: una stima dell'impegno necessario;
* ==Descrizioni==: poche frasi che descrivono i passi che portano all'obiettivo.
## Limiti
Ci sono requisiti che i CdU e le storie non possono documentare. Essi documentano solo i requisiti *funzionali*, ma i requisiti non-funzionali e i vincoli sono difficili da includere. Si possono comunque scrivere a parte esplicitamente in fondo a una storia.
# Integrazione nel processo agile

Nel metodo agile, i requisiti sono espressi come storie, e ciascuna ha punti storia e priorità. Le nuove storie vanno in un elenco, il *==backlog==*. Il processo è diviso in rilasci, *==release==*, divisi in brevi iterazioni, *==sprint==*, e quindi il backlog è diviso in *==sprint backlog==*, uno per sprint.

In una riunione all'inizio dello sprint, si prendono storie dal backlog e le si mettono nello sprint backlog del nuovo sprint. In questa riunione, il cliente/PO spiega i dettagli di queste storie, e rimane aperto a chiarimenti durante lo sprint.

Alla fine dello sprint, il cliente esegue i test per ciascuna storia.