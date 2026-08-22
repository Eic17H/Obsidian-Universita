## Cosa sono gli LLM?

Sono addestrati su enormi volumi di dati ottenuti sia legalmente che illegalmente per apprendere pattern di regole grammaticali e relazioni semantiche. Hanno molto in comune coi motori di ricerca; ci sono molti motori di ricerca, qua il più comune è Google, in Cina Baidou, in Russia Yandex. In Cina addirittura hanno bloccato Microsoft e Google, che ha funzionato benissimo per sviluppare giganti informatici interni senza dipendere dall'America.

Come funziona un motore di ricerca? Tramite enormi sistemi hardware e software, hanno programmi detti vermi (crawler) che esplorano tutte le pagine web che trovano, le leggono, ne fanno indici, aggiornano gli indici se sono già state indicizzate, e in continuazione esplorano il web, che chiaramente ha milioni di nuove pagine ogni giorno, categorizzarlo e fare indici di parole e sottoparole di tutti i documenti trovati online, HTML e non. Petabyte di informazioni con tutti gli indici, e dati gli indici contiene la possibilità in tempi anche molto brevi le pagine che contengono certe parole chiave. Servono una quantità di software e hardware colossali. Una volta ottenuti gli indici, l'interrogazione (la ricerca) è rapidissima.

Una cosa simile la hanno gli LLM. Non hanno tanto la pretesa di catalogare tutto il web in tempo reale, ma hanno preso tutti i documenti disponibili in web, quindi quantità colossali, cristallizzati a una certa data, e li hanno analizzati. Da questa analisi è nata una rete neurale. Questi dati includono sia linguaggio naturale che codice, chiaramente.

Le reti neurali sono state introdotte negli anni '50, poi reintrodotte con la back-propagation negli '80. Contengono "tutto lo scibile umano", perché lo scibile umano è ripetitivo. Imparando una lingua, con solo 5000 parole (intese come lemmi) te la cavi benissimo, sei abbastanza bravo. Certamente non bastano le parole, serve la grammatica, ma comunque c'è una certa ripetitività anche lì. E questi pattern vengono messi in una rete di numeri. Eppure sembrano umani, superano il test di Turing, che quindi non era un ottimo test.

Test di Turing, abbastanza filosofico. Io so di esistere, interagisco con altre persone, quindi deduco che esistano. Ma l'unica certezza è che esisto io, cogito ergo sum. Ma solipsisticamente, tutti gli altri potrebbero essere solo immaginati. Però assumendo che esistano, so che sono umani perché parlano come tali. Eppure molto spesso una conversazione scritta con un'IA è uguale a una con un umano. In certe attività, sono anche migliori degli umani, come negli scacchi, già decenni fa con l'IBM.

Riusciremo a creare macchine che provano piacere e dolore? Non abbiamo motivo di farlo. Non è esclusivo degli umani, lo fanno tutti i mammiferi, magari anche gli uccelli, forse forse anche i rettili, i pesci boh. Ma comunque, *per ora*, sembra essere quello che una macchina non può e non potrà mai fare. Può essere fatto per evitare i danni fisici al suo hardware così come fa un essere umano, ma non è che prova dolore.

Il concetto fondamentale per gli LLM è il token. Tokenizzazione, divisione del testo in unità atomiche. Può essere una parola intera (il), una sottoparola (-mente, -zione), un carattere (?, !), un byte (caratteri di controllo). A ogni token del dizionario è associato un ID. Quanti sono? In un linguaggio naturale possono essere anche 200k, in un linguaggio di programmazione spesso meno di 1000.

Non è che ogni parola nuova che arriva le dà un numero, si usano gli ID delle componenti. Quindi "inguardabile" ha quattro ID: in, guard, abil, e, sono quattro token separati.

Il cuore dell'architettura è il transformer, e il meccanismo si chiama self-attention. Una frase è una successione di token, si analizzano le frasi in maniera parallela. Quindi non più con ogni parola si analizza tenendo conto di tutte quelle precedenti, sarebbe lento. I trasformatori invece permettono di andare in parallelo avendo comunque un contesto.

Due token possono avere la stessa rappresentazione: la pesca e la pesca. L'LLM differenzia i due grazie al contesto, quindi grazie alle parole circostanti.

## Fasi: vedi #slide 

Pre-training algebra lineare, stesso tipo di calcolo che si usa per la grafica e quindi GPU. Calcolo vettoriale matriciale.

## Altro

Sembrano senzienti, ma sono macchine statistiche. Dato un prompt, danno solo la risposta più probabilmente corretta.

## Allucinazioni

Danno risposte sempre con molta sicurezza, per il modo in cui sono fatti non sono capaci a dire "non lo so". E se non sanno qualcosa, inventano. È successo che abbiano usato un LLM per scrivere un articolo, e abbia messo come fonte articoli plausibilissimi che non esistono; un professore di questa università è stato citato come fonte tramite un articolo che non ha mai scritto, e, forse in quanto fonte, stava anche revisionando l'articolo che lo citava, aneddoto simpatico.

## Bias

Se i documenti su cui è allenato hanno bias, come il razzismo, il modello li eredita.

## Bolla

Durante la bolla di internet, il valore della Tiscali aveva superato la Fiat. L'IA è una bolla ancora più grande di com'era internet quando è scoppiata.

## Nuove informazioni

Prima, una volta fatto il modello, la sua conoscenza era congelata a quel momento. Adesso, tramite il retrieval, possono cercare su internet al momento del prompt per avere informazioni aggiornate.

# ROBOT CINESI

In Cina stanno già lavorando ai robot, probabilmente entro fine anno ci siamo. Avranno intelligenza on-board o dovranno comunicare con un server? Vediamo. Probabilmente dipenderà dallo scopo del robot. Useranno droni (che sono robot) anche droni marini per invadere Taiwan probabilmente. Non ci saranno attacchi umani, magari non all'inizio, le guerre si combatteranno con l'IA da ora in poi. Anche ora in Ucraina, anche se meno, i droni sono più importanti di armate e carri armati, ci sono invece pochi soldati scortati dai droni. Completamente diverso dalla guerra in Sudan, un cambiamento enorme in pochi anni.

# Prompt engineering dicevamo.

L'arte e la scienza di progettare input efficaci per i modelli linguistici. Gli input sono appunto detti prompt. Il prompt engineering non è programmazione, perché si usa il linguaggio naturale. Vedi #slide 

Interrogazione molto iterativa, non risponde bene al primo tentativo.

Vediti benissimo le #slide 