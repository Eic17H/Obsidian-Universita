---
cssclasses:
  - lip
---
I primi linguaggi di programmazione nacquero con la macchina di Von Neumann. I programmi sono dati memorizzati, e caricando dati diversi si possono eseguire programmi diversi. Il programma è "scritto" nei dati tramite un codice numerico, un "linguaggio macchina".

## Anni '50
Furono inventati i linguaggi Fortran e Cobol.
* Erano ad alto livello ed erano orientate rispettivamente al calcolo scientifico e alla gestione dei dati;
* Astrazione procedurale tramite sottoprogrammi (che però erano simili all'equivalente del linguaggio macchina);
* Nuove strutture dati (array e records), ma comunque simili a quelli dei linguaggi macchina.

## Anni '60
Sviluppi che ci portano a una situazione più familiare:
* Nascita del λ-calcolo e delle vere e proprie funzioni grazie a Church;
* Nascita dell'ambiente;
* Procedure con argomenti.
I linguaggi in questione furono:
* Algol'60: primo vero linguaggio ad alto livello, imperativo, scoping statico, memoria a stack;
* Lisp: primo linguaggio funzionale, basato sul λ-calcolo, scoping dinamico, strutture dati dinamiche, memoria heap con garbage collector, interpretato;
* Simula'67: primo passo verso l'OOP.

## Anni '70
Nacquero i tipi astratti, fu formalizzata la OOP, e si cominciò a sviluppare sistemi in linguaggi ad alto livello, con thread. Nacquero questi linguaggi:
* Pascal: basato su Algol'60 con tipi non astratti, puntatori e heap;
* C: Pascal con moduli, tipi astratti ed eccezioni;
* ADA: come il C, ma con concorrenza e costrutti per la programmazione in tempo reale;
* Smalltalk: Pascal con incapsulamento e classi primitive;
* Prolog: calcolo logico con computazioni non-deterministiche;
* ML: funzionale, λ-calcolo tipato, tipi ricorsivi, pattern matching, scoping statico, heap con garbage collector;
* Haskell: come ML ma con valutazione lazy.

## Anni '80
Con la nascita del personal computer, nascono questi linguaggi:
* C++: C con classi e oggetti, heap senza garbage collector, il linguaggio imperativo più avanzato dei tempi;
* CLP (Constraint Logic Programming): calcolo logico come Prolog, ma con domini diversi (per esempio si aggiungono i numeri), algoritmi di soluzione di vincoli.

## Anni '90
* Java: ha quasi tutte le caratteristiche del C++, qualche caratteristica dei linguaggi logici (garbage collector), riduce il numero di meccanismi primitivi con classi ed ereditarietà. Si fa quasi tutto con classi di libreria, ed è un ibrido di compilazione e interpretazione, che lo rende utile nelle applicazioni di rete.

## Anni 2000
* Erlang e altri: primi veri linguaggi concorrenti;
* Scala e altri: tentativi di linguaggi con molte caratteristiche;
* Molti linguaggi special purpose.