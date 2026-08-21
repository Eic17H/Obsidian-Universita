## Fondamenta di matematica

### Basi numeriche

Per rappresentare i numeri (positivi interi) usiamo dieci simboli: $0$, $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$ e $9$. Partiamo da zero, $0$, e poi per aumentare di uno usiamo il simbolo successivo. Arrivati a nove, $9$, abbiamo finito i simboli disponibili, quindi ricominciamo da $0$, ma aggiungiamo un altro simbolo a sinistra per contare il numero di volte che abbiamo dovuto ricominciare. Quando anche quello arriva a $9$, ripetiamo lo stesso procedimento aggiungendo un'altra cifra.

Questo sistema è detto *posizionale*, perché il valore di una cifra dipende dalla sua posizione: $1$ vale meno di $5$ da solo, ma in "$15$", quella cifra $1$ vale il doppio del $5$.

Non è universale usare un sistema posizionale. Per esempio i numeri romani non lo sono, $I$ vale sempre uno e $X$ vale sempre dieci, anche se entrambi corrispondono a $1$ nella rappresentazione di undici: $XI$ e $11$. Invece i numeri cinesi hanno un po' in comune con entrambi, perché $二$ vale due e $十$ vale dieci, ma si possono combinare in $二十$ per rappresentare venti.

Tutti e tre questi sistemi si basano sulle potenze di dieci, ma non è obbligatorio. Nel nostro sistema, abbiamo dieci simboli diversi, ma potremmo averne una quantità diversa, magari solo otto, e ricominceremo da $0$ ogni otto numeri e non ogni dieci, e quindi $40$ rappresenterebbe la quantità che noi chiamiamo "trentadue". Le lingue degli aztechi e alcune lingue europee sia antiche che moderne (come, in parte, il francese) danno questo ruolo sia al dieci che al venti, mentre alcune lo danno al dodici.

Questo è il concetto di *base numerica*. Il nostro sistema è in base $10$, cioè *decimale*. Nell'informatica, vengono usate molto la base $2$ (*binario*) e la base $16$ (*esadecimale* o *hex*).

La base $2$ può sembrare strana, vediamo degli esempi. Ci sono due cifre, $0$ e $1$. Partiamo da zero $0$, poi uno $1$, e abbiamo già finito le cifre. Quindi ricominciamo da $0$ e contiamo a sinistra, due $10$, tre $11$. Abbiamo di nuovo finito le cifre a destra, ma anche quelle a sinistra, quindi aggiungiamo una terza cifra, quattro $100$, cinque $101$, sei $110$, sette $111$, e di nuovo otto $1000$ e così via. Un sistema certamente utilizzabile, ma molto scomodo. Vedremo più avanti i motivi fisici dietro l'utilizzo di questa base.

Per indicare in che base abbiamo scritto un numero, la mettiamo sotto. Quindi possiamo scrivere che $1000_2=8_{10}$.

Se proviamo a tradurre tra la base $10$ e la base $2$, notiamo che i gruppi di cifre non corrispondono: $21_{10}$ diventa $10101_2$, ma se prendiamo le cifre separatamente, $2_{10}$ diventa $10_2$ e $1_{10}$ diventa $1_2$. Non c'è una corrispondenza diretta. Poiché $16=2^4$, tra queste due basi invece c'è una corrispondenza diretta: l'esponente è $4$, quindi quattro cifre binarie diventano una cifra esadecimale. $39_{10}=27_{16}=0010\ 0111_2$, e infatti $2_{16}=0010_2$ e $7_{16}=0111_2$. Per questo, la base $16$ si può usare per compattare la base binaria in modo ordinato.

### Logica proposizionale

## Fondamenta di elettronica

### ALU: unità aritmetica e logica

### Memoria

## Fondamenta di informatica

L'informatica non è lo studio dei computer (nonostante la traduzione in inglese sia *computer science*). In realtà l'informatica è nata prima dei computer. Il problema, ovviamente, era che senza i computer l'informatica non è molto utile.
### Algoritmo

### Turing-compatibilità

## Programmazione a basso livello

Un computer capisce solo numeri. In particolare, reagisce a sequenze di impulsi elettrici, che noi interpretiamo come numeri scritti in binario. Però quando tu usi un computer, non pensi ai numeri, semplicemente premi un tasto e compare una foto. Questo è possibile perché abbiamo un sistema per convertire immagini in numeri, e numeri in immagini: un tasto attiva una componente elettronica che invia un numero al computer, e tramite una serie di reazioni fisiche nei circuiti, vengono inviati allo schermo dei numeri che corrispondono a un'immagine.

La capacità di ignorare la realtà fisica dei circuiti è detta *astrazione*. L'opposto di *astratto* è *concreto*. Adesso vedremo, in modo semplificato, come si passa dalla verità concreta di un circuito all'esperienza astratta dei computer moderni.
### Linguaggio macchina

Abbiamo visto l'ALU. Ovviamente, esistono un sacco di componenti intorno all'ALU che sono infinitamente più complicate, che sono la CPU. Non vedremo nel dettaglio come funziona una CPU, ma la logica è simile all'ALU.

Abbiamo detto che la CPU riceve una serie di impulsi elettrici, che per noi rappresentano dei numeri, e a causa delle sue proprietà fisiche "risponde" con un numero che noi consideriamo adeguato: il risultato di un'addizione, un sì, un no.

Immaginiamo che, quando la CPU riceve $00000010\ 00001010\ 00010110$, tramite una serie di reazioni fisiche nel circuito che somiglino alla pallina di un flipper che viene spedita in giro con una certa logica che a noi sfugge, trasmetta poi il segnale $00100000$. Questo è il linguaggio macchina.

Non c'è bisogno che sia così strano. Quelli sono chiaramente quattro numeri scritti in binario, quindi riscriviamoli in decimale: riceve $2\ 10\ 22$ e invia $32$. Chiaramente $10+22=32$, quindi quel $2$ all'inizio significa, nel linguaggio di questa CPU, "fai la somma dei prossimi due numeri".

Questi numeri che corrispondono a parole, come quel $2$ che corrisponde a $+$, sono come un linguaggio in codice. Ed effettivamente questa serie di $1$ e di $0$ è effettivamente detta *codice*. Quando si parla di *codice di un programma*, si intende proprio ciò che il programmatore ha scritto per realizzare il programma. Non è però sempre scritto in linguaggio macchina, anzi al giorno d'oggi non lo è mai, vedremo più nel dettaglio più avanti.

Per i motivi citati sopra, è più comune visualizzarli in esadecimale, quindi $02\ 0A\ 16\to20$.

I comandi disponibili (*opcode*, il primo numero) e la loro numerazione dipendono dalla CPU che si sta utilizzando. Sono cose come "fai una certa operazione", "leggi da questo slot della memoria", "scrivi in uno slot della memoria".

#todo: salto, iterazione, condizionali, algoritmi

All'inizio, i programmi si scrivevano così. Ti facevi uno schema, scritto a mano, dei calcoli che volevi facesse il computer, poi li traducevi in linguaggio macchina e li davi al computer.
### Assembly

Programmare in linguaggio macchina è scomodissimo. Immagina di aver scritto un programma complicatissimo, ma tutti i risultati di prova sono sbagliati, e quindi devi trovare la parte sbagliata, magari hai sbagliato a tradurre da simboli matematici a operazioni della CPU, magari hai sbagliato a scrivere.

Per alleviare questo problema, è stato inventato il linguaggio *assembly*. O per meglio dire, i linguaggi assembly: così come il linguaggio macchina, ce n'è uno per ogni famiglia di CPU.

Essenzialmente è una traduzione 1:1 da linguaggio macchina a qualcosa di comprensibile, quindi se voglio fare un'addizione anziché scrivere $00000010\ 00001010\ 00010110$ posso scrivere `ADD 10 22`. Comodo. E poiché esistono i computer, puoi fare un programma che traduca direttamente da assembly a linguaggio macchina, e questo programma si chiama *assembler*.

Non è comunque comodissimo. Per programmare non basta conoscere la formula matematica che devi applicare, devi comunque tenere traccia di come stai usando fisicamente il computer: devi gestire la memoria, devi sapere quale slot della memoria stai usando. Se fosse la matematica potresti semplicemente dire $\text{sia }x\text{ un numero naturale, allora per ogni }y\text{ tale che...}$ e invece qui devi tenere traccia di `allora, per il numero di prima ho usato lo slot 1596, devo ricordarmi che lo slot 1597 è già in uso per quell'altra parte del programma, poi dei soli quattro slot ad accesso rapido che ho ne devo sacrificare uno per controllare cosa c'è scritto nello slot 344, e poi...`
### C

Fu trovata una soluzione a tutti quei problemi. Furono inventati i linguaggi ad alto livello. `ADD 10 22` è illeggibile? Adesso puoi scrivere `10+22`. Prima potevi fare una sola operazione alla volta e per $10+(22 \times 3)$ dovevi scrivere schifezze come `PUSH 22 PUSH 3 MUL PUSH 10 ADD`? Adesso puoi scrivere `10+(22*3)`. Vuoi decidere che esiste un numero naturale di nome $x$ senza dover litigare con gli slot della memoria? Scrivi `uint x` e, anche se non è ovvio che "`uint`" significhi "$\text{numero naturale}$", puoi farlo.

Questo si chiama linguaggio ad alto livello (mentre assembly e il linguaggio macchina sono a basso livello). Di nuovo, puoi scrivere un programma che traduce da linguaggio ad alto livello ad assembly, e questo tipo di programma si chiama *compilatore*. E non solo, questa volta puoi anche creare due compilatori diversi, così scrivi il programma una volta, poi lo traduci in due versioni diverse e così ce l'hai pronto per due CPU diverse, anziché doverlo riscrivere perché il linguaggio macchina è diverso.

Non era comunque perfetto. Molti programmatori si erano abituati alla scomodità di dover gestire la memoria, e *non poter* gestire la memoria sembrava una limitazione. Inoltre, si pensava che i linguaggi ad alto livello avessero dei limiti che quelli a basso livello non avevano, quindi per i programmi complessi si usava comunque l'assembly.

Fu quindi inventato il linguaggio C: un linguaggio ad alto livello che permette di attingere alla gestione della memoria tipica dei linguaggi a basso livello. Ho detto permette? Se vuoi fare un programma più complesso di `2+2=4` ti *obbliga* a gestire la memoria per conto tuo. E questo piacque ai programmatori che si erano tenuti l'assembly, ma anche ai programmatori che programmavano ad alto livello.

E perché fu inventato questo linguaggio C? Per farci un sistema operativo. Un sistema operativo: un programma che gestisce l'intero computer, gestisce le interazioni tra tutti gli altri programmi, e gestisce tutte le interazioni tra i programmi e dispositivi esterni. Quindi certamente doveva interfacciarsi con la memoria. Questo progetto folle permise di realizzare sistemi operativi utilizzabili su computer con CPU diverse. In particolare, quello per cui è stato creato il linguaggio era Unix; MacOS è una versione di Unix, e Android è una versione di Linux, un sistema operativo molto ispirato a Unix.
### Cos'è un programma

[[Subroutine e librerie]]
### Strutture dati

#### Formati numerici

#### File

### Input e output

#### BIOS e sistema operativo

## Alto livello

### Regole di inferenza

### Astrazione

#### Interfacce

### Paradigmi

## Good practice

### Complessità

### Mantenibilità

## Mondo moderno

### Pseudo-internet

### Lavoro in azienda

### Pagine web

#hidden