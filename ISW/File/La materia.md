---
cssclasses:
  - isw
---
# Scienza

La scienza è la caratteristica principale di questa epoca storica. Si divide in scienze formali, scienze naturali e scienze di progetto. Vedi le slide, la tabella.

Le scienze formali non osservano il mondo, ma si autocostruiscono, quindi possono non essere considerate scienze. La principale è la matematica, ovviamente, e la scoperta matematica è da sempre basata sulla realtà fisica (prima dell'arrivo dell'IA, ora la matematica nasce da sé), che sia per misurare i territori (Gauss e la geometria differenziale) o per vincere al casinò (Boh e la statistica). Gli LLM sono molto bravi nelle scienze formali, perché con tante regole di inferenza e un po' di variazione casuale eseguono tanti calcoli molto in fretta, non perché ci sia un'intelligenza o una coscienza dietro.

Le scienze naturali hanno come scopo comprendere il mondo naturale formulando modelli (matematici) e sperimentandoli empiricamente. Si sperimenta, si misura, si verificano le ipotesi: metodo scientifico, che nasce nel 1200 nelle università medievali, per esempio col filosofo Buridano, famoso per il paradosso dell'asino di Buridano: un asino che è affamato e assetato al massimo quasi muore, gli mettono vicino un cesto di fieno e un secchio d'acqua, ma essendo parimente affamato e assetato non si muove da nessuna delle due parti, e muore nell'attesa. Ma lasciamo perdere. Osservazione, misurazione, ipotesi eccetera insomma no. Si basa sui dati empirici. La matematica serve per analizzare i dati empirici.

Le scienze di progetto si basano sulle altre due, hanno come scopo la realizzazione di strumenti che risolvono problemi pratici. Bisogni, necessità, problem solving tramite matematica e fisica eccetera. Applica le scoperte degli altri campi per trovare soluzioni. Tutte le branche dell'ingegneria, incluso il lato pratico dell'informatica, farmacologia. L'ingegneria del software è un ramo dell'informatica con utilizzi ingegneristici, quindi è un po' in entrambe le categorie.

# Definizione di ingegneria del software

La IEEE Computer Society regola molte cose, le a definisce così:

> Vedi le slide

E poi continua a vedere le slide, per ora è semplice.

# Perché ingegneria?

Vedi le slide con due ponti. Uno per un ruscello, uno è il San Giorgio (il professore è di Genova).

Quello del ruscello, ci è voluta una persona, due giorni, 3000€.

Il San Giorgio, 1000 persone, 330 imprese, 2 anni, 24/7, 202M€.

Il San Giorgio è ingegneria, il ponte del ruscello è artigianato. Mille artigiani non fanno il San Giorgio, una struttura complessa di progettazione è overkill per un ponte sul ruscello.

Allo stesso modo, l'ingegneria del software va incontro a difficoltà non solo tecniche, ma di coordinamento tra persone, di limiti di tempo, budget e qualità. Così come il San Giorgio. "Multi-person construction of multi-version software".

Sempre più sistemi sono controllati via software. Qualunque paese non in guerra, anche quelli stereotipicamente poveri, escluse le aree rurali trovi il software. Non esiste più il terzo mondo in un certo senso. Le economie dei Paesi ricchi (inclusa l'Italia) dipendono dal software. Nel 2025, il fatturato mondiale IT supera i 2500M€.



# 10 temi dell'ISW

Vedi #slide

# Ruoli

Tradizionali:
* Analista
* Progettista
* Programmatore
* Tester
* Trainer, che scrive i manuali e insegna agli utenti

Moderni:
* Front-end dev: interazione con l'utente, interfacce, quindi web, app eccetera
* Blockchain dev: i sardi sono stati i primi italiani, forse i primi europei, a trattarne
* Back-end dev: logica nascosta all'utente
* Data engineeer: database
* Full stack dev: multiclasse
* Cloud engineer: allestire e gestire sistemi cloud, se è furbo sistemi che si possano salvare in locale e spostare su un altro fornitore, raro
* DevOps: release, prendere un sistema sviluppato e farlo partire sulla macchina dell'utente
* CyberSecurity engineer: sicurezza
* Systems engineer: vedere se il sistema è fatto bene
* QA: verifica e migliora la qualità del software

Due anni fa, questi sono in ordine decrescente di stipendio. La situazione è cambiata

Tutti questi ruoli possono beneficiare degli LLM

# Settori dell'ingegneria del software

Processo di produzione: processi e metodi di produzione

Architettura: come si scompone un sistema in moduli, comunicazione tra moduli

Progettazione: progettare un'architettura, definire i moduli, per mettere a lavoro i dev

I dev non sono ISW, facciamo Python in questo corso perché che diamine, nessun altro, nessun altro in questo corso di laurea fa Python?

# Problematiche dell'ISW

Bisogna produrre software giusto: richiesto e utilizzabile, con clienti disposti a spendere, che possono essere masse (con le app), o un singolo grande cliente (sistema per un'azienda). E bisogna ridurre tempi e costi perché sia profittabile.

Bisogna, anche eticamente, fare software corretto e sicuro, perché potrebbe altrimenti avere conseguenze gravi sulle persone, o almeno dal lato economico.

Il processo di produzione non è lineare: non è ripetibile. Se faccio una macchina, ne faccio un'altra. Se faccio un sistema software, il prossimo che faccio avrà circostanze diverse (vedi IUM), quindi non so se la prossima volta che faccio un sistema sarò capace a interfacciarmi correttamente con le persone, con le specifiche e con i tempi. È più simile all'artigianato, la traduzione da teoria a codice è un processo anche creativo, non stai solo seguendo ciecamente dei passi che portano dalle specifiche al prodotto finito.

# Approcci dell'ISW

Si usano le "best practice", termine inglese usato in italiano (il professore vorrebbe ci fosse un termine italiano ma questa volta non c'è niente da fare). Vedi slide.

# Processo

Il termine viene dal processo penale: una serie di passi predeterminati che vanno seguiti per convenzione perché si sa che funzionano. Vedi slide molto semplice.

* Specifica
* Sviluppo: il sistema viene realizzato
* Validazione: si verifica che il sistema corrisponda alle aspettative del cliente
* Evoluzione: con l'utilizzo, emergono difetti e nuove necessità

Ma quindi cos'è un processo? Un momento in cui persone fanno cose. Possono essere riunioni (in dipendenza temporaneo-logica) ascolta mi sa che ho capito male c'è un muro di testo nelle slide vedi lì dai non credo stia dicendo cose in più rispetto alle slide

Le pietre miliari sono punti in cui si controlla il processo

## Processo Scrum

Un processo agile, forse il più usato in questo momento a livello mondiale. A Cagliari siamo stati i primi accademici, nel 98, ad occuparci di iunfwoinefwoiagile, e nel 2000 si è tenuta qui la prima conferenza su agile, 2001 da un'altra parte a cagliari, 2002 Alghero, pioi Genova e poi il rewsto del mondo, 2024 Bolzano. Conferenza del boh. Schwaber, il padre di Scrum, presentò Scrum a Villasimius.

Scrum è un metodo agile, ma a noi non importa vedere il metodo (momento Pinna), vediamo le fasi di Scrum.

***Scrum master***

Non è un titolo, volevo solo scriverlo perché fa ridere sentire un professore dire questo termine dal suono poco serio

Io non riesco a seguire che dice in modo ordinato. Ogni giorno 15 minuti di riunione scrum. Non ho capito altro, c'è un cerchio nelle slide.

La spiegazione si è devoluta in un boh veramente spero si torni a un argomento ordinato. Un block è un problema. Oppure l'operazione è bloccata e si cancella (sprint). Lo Stakeholder è il chiunque altro interessato al progetto.

E questo è il processo più usato a livello mondiale per sviluppare software. Ma tutti questi termini di cui non ho ancora internalizzato il significato in questa disciplina che hanno significati diversi in altre. Mi manca Paoli di ieri guarda, che succede.

Lo slogan è: ***fatelo giusto fin dalla prima volta***. Questo di plan-driven. Serve magari per l'ingegneria tradfizionale, altrimenti il grattacielo crolla.

Ma per agile, è farlo giusto all'ultima volta, fino ad allora sbaglia quanto vuoi, tanto è codice, ctrlz ctrlz ctrlz. Prova a farlo con un mattone, ti viene un po' male.

La cosa bella del software, è che lo produci una volta ed è stato difficilissimo. Ma lo fai una volta, e cinquecento miliardi di persone lo scaricano e lo usano. Ma anche senza internet, physical media costa noccioline in confronto al costo di sviluppo no? Un'automobile costa tantissimo perché il suo materiale fisico deve essere buono. I binari dell'eseguibile posso scriverli su un biglietto di carta e funzionano comunque, anche se scomodi.

Conversamente, i dati non occupano spazio fisico ma possono valere tantissimo. Computer da 20€ con 10k€ di software sopra e dati che se si corrompono perdo 300k€.

La manutenzione può costare più dello sviluppo, anche 67% del costo totale. E non basta che faccia cose ma deve farle efficientemente.

Ma la domanda è: dove sta andando a parare? E chissà

# Le sfide dell'ISW

È immateriale, è pensiero puro, è così che il software differisce dagli altri prodotti dell'ingegneria.

Pro:
* Duttile
* Libertà
Contro
* Non essendoci vincoli fisici non hai scuse per non fare cose che vanno oltre le tue capacità organizzative
* Limitate basi scientifiche/matematiche: che significa?

L'altra differenza è che i requisiti sono molto mutevoli
* I framework cambiano
* Il cliente cambia idea e tu devi implementare
* Le situazioni cambiano, non sono limitate dal prodotto ingegneristico

Nuovi modelli:
* Vedi slide ti giuro

È difficile sfruttare bene il multicore

L'IA ha ombrato la blockchain

Il quantum computing sarà il futuro? Bohh. Forse ne parleremo alla fine del corso