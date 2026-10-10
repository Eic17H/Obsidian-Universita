---
cssclasses:
  - ip
---
## Indice

### Teoria

* [[Immagine]]
* [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Preprocessing|Preprocessing]]

### Lab
* [[Rappresentazione delle immagini]]
* [[Aritmetica delle immagini]]
* [[Magistrale/Anno 1/Semestre 1/IP/Lab/Preprocessing|Preprocessing]]
* [[Trasformazioni puntuali]]
* [[Magistrale/Anno 1/Semestre 1/IP/Lab/Filtri]]

## Informazioni

### La disciplina

Useremo MatLab, in particolare con un toolbox di image processing.

L'image processing e la computer vision è da dire subito che ormai ha assunto un ruolo particolarmente importante nella vita di tutti i giorni. Questo ha avuto un impatto molto forte da un punto di vista sociale e soprattutto economico, perché è applicata in ambiti molto diversi, in quanto con un'immagine rappresentiamo un'informazione in modo più ricco rispetto al testo.

Un'immagine è un modo di rappresentare la realtà, e può rappresentare qualunque cosa, in generale una scena. Può essere frutto di una fotografia o di imaging medico, per esempio, e questi sono già molto diversi.

La **==image analysis==** consiste nell'estrazione di informazioni dalle immagini. Questo è possibile se si parte dalla rappresentazione numerica dell'immagine, quindi abbiamo bisogno di dispositivi che convertono l'immagine in una rappresentazione numerica. Questo è il processo di **==digitalizzazione==**.

L'image processing si collega a molte altre discipline.
* L'image processing si può vedere come una parte della computer vision, ne è un passo che si ferma prima dell'understanding come già detto;
* Pattern recognition, perché per trovare pattern dobbiamo tenere le caratteristiche rilevanti;
* Machine learning, che deriva dal pattern recognition;
* Fisica, che ne fa uso negli strumenti;
* Matematica, molto coinvolta nell'image processing;
* Signal processing, perché alcuni problemi del signal processing monodimensionale possono essere estesi all'image processing bidimensionale;
* Neurobiologia, che si occupa di capire i meccanismi biologici dietro al cervello umano, quindi per esempio studiando il modo in cui l'occhio si interfaccia col cervello questa conoscenza si può estendere all'image processing.

Vediamo come si applica l'image processing:
* Sorveglianza: guida automatica, controllo del traffico, riconoscimento delle targhe;
* Remote sensing: interpretazione e classificazione delle immagini satellitari o aeree, per esempio analizzando lo sviluppo di un centro abitato;
* Militare: purtroppo, tracciamento di persone, animali, carri armati e missili in tempo reale;
* Analisi dei documenti: gestire e creare un'archiviazione digitale dei documenti, ed estrazione del testo;
* Automazione: verificare la correttezza del prodotto;
* Sistemi biometrici: riconoscimento facciale, delle impronte digitali, e soprattutto dell'iride, che è veloce e precisa, e poi c'è il DNA, quindi questo si usa sia nei dispositivi personali che nella law enforcement;
* Speech recognition;
* Visione robot;
* Fotografia: editing, effetti speciali come morphing;
* Astronomia: distinguere una stella da una galassia, classificare le galassie, ripulire immagini dei telescopi;
* Eredità culturale: archivi;
* Scienza della vita: biologia e medicina, enhancement delle immagini da analizzare ad occhio, estrazione di informazioni irrilevabili ad occhio nudo, come la rilevazione del cancro;
* Image retrieval, che usiamo quasi quotidianamente.

L'image processing diventa sempre più rilevante: costa sempre meno farla, ci sono sempre più immagini su internet, giornali, ospedali.

La descrizione testuale è difficile: è limitata e soggettiva. Quindi per trovare un'immagine possiamo usare uno scarabocchio, o una lista di caratteristiche, che sono da estrarre con l'image processing.

La classificazione delle immagini è molto utile, di nuovo per esempio nel campo medico, dove è utile allenare i medici con immagini già classificate, o di riconoscere malattie.

Il corso si compone di:
* Immagini digitali e loro proprietà, definizioni di termini utili nel corso del corso;
* Image pre-processing, miglioramento della qualità dell'immagine;
* Dominio di frequenza, un modo alternativo al dominio spaziale per vedere un'immagine, che permette di affrontare problemi diversi;
* Morfologia matematica;
* Segmentazione;
* Rappresentazione e descrizione degli oggetti;
* Cenni di riconoscimento, più di un cenno sarebbe machine learning.

Libro di testo: Digital Image Processing di Gonzales e Woods, standard internazionale. Su Moodle ci sono slide e materiale aggiuntivo.

### Modalita d'esame

Esame, in quest'ordine:
* Scritto: risposta multipla, teoria, due parziali e tre appelli, il voto si resetta a fine *sessione*
* Orale: si può sostituire con un paper, preferito dalla maggior parte degli studenti, si può fare in gruppo massimo 4 e valutazione individuale, circa 10 minuti a testa, presentazione tutti insieme lo stesso giorno, questo voto non scade
* MatLab: risoluzione di un problema simile a quelli delle esercitazioni, openbook

Sono tutte obbligatorie, e hanno tutte lo stesso valore.

#materia