Il testing è un processo sistematico che esegue del software per trovarne i difetti. Il software in questione è detto SUT, System Under Test.

Vedi anche il [[Agile testing|testing in contesto agile]] nello specifico.
## Definizioni IEEE

> Il **==Software Testing==** è il processo di analisi di un prodotto software per rilevare le differenze tra le condizioni esistenti e richieste (cioè, gli errori) e per valutare le caratteristiche del prodotto software.

> ==**Mistake** (Errore Umano)==: azione umana che produce un risultato non corretto; lo stesso argomento: <span class="ium">[[Errori|IUM]]</span>.

> ==**Fault**/**Defect** (Difetto)==: passaggio o processo o definizione dati non corretti in un programma.

> ==**Failure** (Fallimento)==: l'incapacità del sistema o di un suo componente di svolgere una funzione richiesta entro specifiche prestazioni desiderate.

> ==**Error** (Errore)==: la differenza tra un valore o condizione calcolati, osservati o misurati e un valore o condizione reali, desiderati, teoricamente corretti.
## Scopi
* Verificare la qualità generale del software;
* Trovare bug e difetti;
* Verificare che il prodotto corrisponda alle specifiche;
* Verificare che le specifiche abbiano senso;
* Verificare l'integrazione tra i sistemi;
* Verificare di non apportare modifiche che *peggiorano* il prodotto (regressione).
## Utilità
* Si stima che gli errori non trovati in fase di sviluppo siano tra le 40 e le 100 volte più costosi da risolvere in fase di produzione;
* Riduce il costo di manutenzione per gli utenti finali;
* Fa sì che il prodotto si comporti come previsto;
* Gli utenti sono più soddisfatti.
## Verifica e validazione

Il testing viene fatto in funzione della verifica e della validazione del software, ==V&V==.
### Verifica
Si capisce se, alla fine di una fase di sviluppo, il prodotto parzialmente realizzato soddisfa le condizioni decise all'inizio della fase. Si riferisce a specifiche funzioni, a errori tecnici e logici.
> *Are we building ==the right product==?* Stiamo realizzando il prodotto corretto?

### Validazione
Si capisce se, durante o alla fine di una fase di sviluppo, il prodotto soddisfa certi requisiti. Si riferisce alle richieste del cliente, a errori funzionali e nei requisiti. Un processo più difficile, che può mettere in dubbio che le specifiche esprimano correttamente ciò che vuole il cliente.
> *Are we building ==the product right==?* Stiamo realizzando il prodotto correttamente?

## Nel processo di sviluppo

I test vanno fatti il prima possibile e il più spesso possibile. Devono essere ripetibili e riusabili, e preferibilmente automatici (sviluppo di un semplice programma di test).

I test si pensano ed eseguono iterativamente. Vanno scritti appena si hanno i requisiti, e devono cambiare quando cambiano i requisiti.

## Strategie

### Testing esaustivo

Il ==testing esaustivo== è un principio ideale che prevede di testare tutte le possibili combinazioni di input ammesse dal prodotto, e verificare che ciascuna abbia un riscontro nell'output previsto.

Si tratta di un principio ideale ma non realizzabile: in realtà esistono troppe combinazioni di input (input domain molto grande), cresce esponenzialmente. Bisogna quindi selezionare un sottoinsieme degli input possibili.
### Test case

Un ==test case== è una sequenza di passi che permettono di verificare il corretto funzionamento del software, nell'ambito di una singola funzionalità o un singolo aspetto. Un test case è formato dalla descrizione degli input e del comportamento atteso del software, e dalle condizioni precedenti agli input stessi. Questi sono detti ==test data==.

Una ==test suite== è una collezione di test case.

La forma concreta di un test case dipende dal tipo di software. Se si tratta di un'interfaccia utente, potrebbe contenere passaggi pratici, input e output. Se si tratta di una funzione scritta in un linguaggio di programmazione, potrebbe contenere solo i dati in input e i dati in output.
## Scatole

Vediamo due macrocategorie di test: white box e black box.

Il ==*white box testing*== o *structural testing* si basa sulla conoscenza del SUT, della sua struttura, del suo codice. Gli input mirano a testare il codice in sé.

Il *==black box testing==* o *functional testing* non si basa sulla conoscenza del SUT, solo di ciò che vogliamo che faccia. Gli input si basano sulle specifiche.

### White box testing

Si analizza la struttura interna del codice, verificando sia cosa fa per l'utente ma quali sono i processi interni che portano al comportamento osservato. Il tester, che spesso è il dev, ha accesso diretto al codice.

Consente di controllare tutte le branch delle condizioni logiche, controllare le interazioni tra i loop, controllare che non succeda niente di strano ai casi limite (primo loop, ultimo loop, off-by-one), controllare cosa succede all'interno delle strutture dati durante l'esecuzione del codice.

Un tipico esempio sono gli ==unit test==, che testano singole unità del codice, come singole funzioni, e rilevano fino al 65% dei bug comuni.
#### Copertura

Un concetto chiave del white box testing è la copertura (*coverage*), cioè quanto codice viene eseguito nel test, e quale percentuale non viene minimamente toccata.

L'esempio più semplice è lo Statement Coverage Testing: si assicura che ogni istruzione venga eseguita almeno una volta, senza però controllare tutte le combinazioni di dati in input. Fa parte della ==v==erifica.
#### Limiti

Spesso si producono troppi casi di test e non si può davvero testare tutto, perciò di solito si usa solo per gli unit test e per piccole porzioni del sistema.

Inoltre, non è lontanamente capace a rilevare gli errori causati dalla completa *mancanza* di una funzione (*missing feature errord*), errori che invece richiedono di considerare le specifiche.
### Black box testing

Si applica a qualunque tipo di sistema. Questi test non sono pianificati ed eseguiti dai dev. Questi test si basano solo sui requisiti, non sul codice, quindi si possono progettare prima che sia realizzato il software. Spesso ci sono più team di testing, che possono essere esterni.

Si considerano solo gli input e gli output. Il tester, che agisce come utente, fa cose col software, e vede cosa fa il software in risposta. Se fa ciò che deve, passa il test.
### Confronto

Quale dei due approcci vada scelto dipende dal contesto. Generalmente, sono complementare e sono entrambi necessari. Però, con tester esperti, il testing funzionale può dare più informazioni sulla qualità del prodotto.
## Livelli di testing

Ci sono 8 livelli di testing. Ciascuno può essere esclusivo di white o black box, oppure può avere a disposizione entrambi gli approcci. I livelli si dividono tra *tipi di test* e *applicazioni di test*.
### Tipi di test

Descrivono il livello tecnico o il *focal point*del test.
#### Unit
Testing di singole unità HW o SW. L'*unità* (che può essere una funzione, una classe, o altri elementi semplici così) si testa isolatamente dal resto del codice, per quanto possibile. Si usa uno stub/mock object, oggetti fittizi che simulano un contesto reale. White-box, automatizzabile. [[Unit testing con LLM||Si possono fare anche con gli LLM]].
#### Integration
Si testano le interazioni tra più componenti: comunicazione, scambio di informazioni. Di solito si trovano errori nelle <span class="pr2">[[interfacce]]</span>, per esempio sbagliando l'ordine dei parametri. Può essere sua white box che black box.
#### Functional
Garantisce che si rispettino le funzionalità richieste dalle specifiche. Si può usare su singole funzioni, su moduli integrati, o su interi sistemi. Essendo funzionale, è black box.
#### System
Test condotti su sistemi completi e integrati, per assicurarsi che il sistema rispetti le esigenze specifiche. Verifica che il software soddisfi requisiti e bisogni dell'utente (tramite TA). Non controlla solo la correttezza, ma aggiunge prestazioni, usabilità, sicurezza e quant'altro. Black box.
#### Stress
Si testa il sistema eseguendo più richieste di quelle che dovrebbe ricevere durante l'effettivo utilizzo, oltre un punto di rottura, per vedere cosa succede se non riesce a stare al passo con le richieste. Determina la stabilità, la robustezza, la disponibilità di un sistema, di un'infrastruttura o di un'entità critica. Sono test funzionali, black box.
### Applicazione dei test
Descrivono quando e perché eseguire quei test nel ciclo di sviluppo.
#### Acceptance
Determina se un sistema soddisfa i criteri di accettazione, cioè se il cliente lo può accettare o meno. Si tratta di un uso specifico di test funzionali e di sistema, spesso usa quelli creati in passato. Black box, è per il cliente.
#### Regression
Si ripete un test precedente per essere sicuri "di non aver rotto niente", di non essere tornati indietro (regrediti) nel progresso dello sviluppo con gli ultimi cambiamenti, insomma che ciò che funzionava prima funzioni ancora. Infatti, ogni modifica ha il rischio di avere degli effetti collaterali (*side effects*) in zone che, all'apparenza, non sono state toccate. Questi test beneficiano di test automatici. Black box e white box.
#### Beta
Quando il prodotto non è ancora finito ma è in buone condizioni, lo si fa usare gratuitamente a dei potenziali utenti (anche migliaia), che lo provano genuinamente e così trovano errori e li possono segnalare. Una forma di system testing che si effettua con un utilizzo vero e proprio, genuino, normale, del sistema. Ovviamente black box.
## Pianificazione

> Un ==**piano di test** (*test plan*)== è un documento che descrive, scopo, approccio, risorse e pianificazione dei test previsti. Individua gli elementi da testare, gli aspetti da testare, ed eventuali rischi che richiedono piani di emergenza.

Il TP deve essere definito il prima possibile.

Una componente importante è l'individuazione dei ==casi di test== (*test case*), basati sui requisiti, generalmente basati su questo schema, da seguire in modo non ambiguo:
* Test ID;
* Description: passi e precondizioni;
* Expected results;
* Actual results: quello che è successo davvero.

*==Test early and often==*: bisogna cominciare a testare il prima possibile, per evitare di sprecare tempo lavorando su fondamenta sbagliate, bisogna testare spesso, quindi avere spesso un sistema pronto ai test, quindi integrare spesso (una volta al giorno). I test girano in automatico una volta integrato il sistema.