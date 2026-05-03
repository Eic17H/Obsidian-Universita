## Concetto

È difficile comunicare tra gli sviluppatori, che scrivono software, e operations, chi lo rilascia e lo mantiene in produzione. Nel 2009, Patrick Debois conia il termine *==DevOps==*: integrare e automatizzare il ==dev== e l'==ops== per migliorare e velocizzare lo sviluppo, e soprattutto accorciare il tempo tra una modifica del codice e il suo uso in produzione.
### Dev: Sviluppo
* **Chi**: programmatori, architetti software;
* **Obiettivi**: scrivere bel codice, implementare funzionalità, risolvere bug;
* **Attività**: coding, versionamento (Git), code review, unit test;
* **Strumenti**: Git, VS Code, Spring, Django, Docker;
* **Obiettivo complessivo**: evolvere il prodotto senza introdurre difetti.
### Ops: Operations
In passato, l'Ops era separato, lento e burocratico. Grazie a DevOps, è invece automatizzato, integrato col development, usa strumenti moderni, e favorisce la *continuous delivery*.
* **Chi**: sysadmin, DevOps/SRE, cloud engineer;
* **Obiettivi**: stabilità, sicurezza, rilasci continui;
* **Attività**: provisioning, monitoring, CI/CD, gestione ambienti, backup, capacity planning, incident management, ripristino;
* **Strumenti**: Kubernetes, Terraform, Prometheus, piattaforme Cloud;
* **Obiettivo complessivo**: mantenere il servizio disponibile, osservabile e riproducibile.
### QA: Controllo qualità
* **Chi**: tester, QA engineer, automation specialist;
* **Obiettivi**: validare funzionalità, prevenire regressioni;
* **Attività**: test (anche manuali), bug tracking, verifica criteri di accettazione;
* **Strumenti**: Selenium, pytest, Playwright, Postman, Jenkins, SonarQube;
* **Obiettivo complessivo**: assicurarsi che la regressione non si trovi tardi.
## Principi

Mentre il processo Agile aiuta la comunicazione tra il lato business e il lato dev, DevOps appunto sfonda il muro tra dev e ops. DevOps è comunque parte di Agile, ed è guidata da diversi fattori:
* Utilizzo di Agile e Lean per feedback rapido e riduzione degli sprechi;
* Rilasci frequenti in produzione;
* Infrastruttura virtualizzata e cloud;

Si basa su:
* Virtualizzazione dei datacenter (o cloud);
* Automazione;
* Metodologie condivise tra dev e sistemisti;
* Incrementale-iterativo con iterazioni brevi;
* Testing continuo e automatizzato.

I principi si possono riassumere con l'acronimo ==CALMS==:
* **==C==ulture**: collaborazione;
* **==A==utomation**: no azioni manuali ripetitive;
* **==L==ean**: Lean;
* **==M==etrics**: misurare tutto e basare i metodi sui risultati;
* **==S==haring**: condividere le esperienze di successo e di fallimento.
## Stadi

Le slide danno due liste diverse. In ogni caso sono in loop, dopo l'ultima si passa alla prima. Nell'immagine presa da internet sono "plan, code, build, test, release, deploy, operate, monitor". Quelle descritte più nel dettaglio sono:
### Dev

#### Plan
Business value e requisiti:
* Valutazione e aggiornamento del *business plan*;
* Requisiti (backlog, US e altri);
* Metriche di business;
* Aggiornamento delle metriche di rilascio;
* Piano di rilascio, tempistica e business case;
* Politica e sicurezza.
#### Code e Build
Progetto, codifica e configurazione del software:
* Progettazione del software;
* Codifica e versionamento, QA;
* Build: produzione di eseguibili, immagini container, pacchetti o versioni rilasciabili, e controllo delle prestazioni;
* Veloce, affidabile, deterministico.
#### Test
Garanzia della qualità, con test automatici, analisi statica, e analisi di sicurezza:
* Test di accettazione;
* Test di regressione;
* Sicurezza e vulnerabilità;
* Prestazioni;
* Test della configurazione.
#### Package
Il Package, o Staging, è le attività coinvolte quando la versione è pronta alla distribuzione:
* Naming, versionamento, dipendenze;
* Approvazione e pre-approvazione;
* Configurazione del package;
* Triggered releases;
* Release staging and holding.
### Ops

#### Release
Il target è l'ambiente di destinazione finale, si riduce il rischio tenendo le batch piccole e automatizzando il flusso:
* Pianificazione;
* Orchestrazione;
* Provisioning (mettere a disposizione le risorse esterne, come rete e DB);
* Distribuzione.
#### Configure
Configurazione di ambienti, provisioning, secret management, rete, dipendenze infrastrutturali. L'infrastruttura deve essere tracciabile, versionata e riproducibile (*Infrastracture as Code*):
* Automazione continua della configurazione;
* Gestione della configurazione;
* Strumenti di infrastruttura programmati come codice;
* Evitare che il funzionamento del sistema dipenda da chi lo usa (*works on my machine* ¯\\_(ツ)_/¯).
#### Monitor
Fase importante e permanente, permette di trovare problemi di versioni specifiche e capire l'impatto sugli utenti:
* Prestazioni dell'infrastruttura IT;
* Risposta ed esperienza dell'utente finale;
* Metriche e statistiche di produzione.

Con queste informazioni, si passa al Plan del ciclo successivo e si riparte.
## Confronto con Kanban

## Esempio