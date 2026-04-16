---
cssclasses:
  - logica
---
Lo stesso argomento: <span class="lip">[[Linguaggi|LiP]]</span>, <span class="alf">[[Linguaggi formali|ALF]]</span>, <span class="pr2">[[PR2/Teoria/Linguaggio|PR2]]</span>

Cos'è questo linguaggio che per ora stavamo utilizzando in maniera molto informale?

The return of the Pinna.

Il mio linguaggio $\mathcal{L}_0$ mi prende una stringa e mi dice se è grammaticalmente corretta nel mio linguaggio. In italiano, ho l'alfabeto, ma non tutte le stringhe di lettere sono espressioni ben formate: "ubwfiunefwiunweifunfoewniew" contiene solo lettere esistenti, ma non significa nulla, "Non sapevo che tu non voleva" contiene parole esistenti ma non è comunque grammaticalmente corretta. Quali stringhe di simboli io considero ben formate.

L'alfabeto si divide in tre sottoclassi: logico, descrittivo, ausiliario. Io nel mio alfabeto devo includere tutti i simboli che mi servono.

Quante variabili mi servono? Non voglio mettere un limite arbitrario, voglio essere capace di scrivere un numero arbitrario di proposizioni arbitrariamente nulle. Mi serve un numero infinito di simboli, ma un infinito numerabile, grande quanto in numeri naturali. Quindi formalmente diamo nomi usando i numeri naturali, ma nel pratico per comodità diciamo p q r eccetera.

Similmente, ZUCCHERO SINTATTICO MENTIONED, magari uso parentesi quadre per comodità ma formalmente non esistono. Non ha davvero menziopnato lo zucchero sintattico ma lo sottintende.

| Logico                                                 | Descrittivo              | Ausiliario |
| ------------------------------------------------------ | ------------------------ | ---------- |
| Connettivi logici                                      | Variabili                | Disambigua |
| Sono 5                                                 | Infinito numerable       | Solo due   |
| $¬$, $\land$, $\lor$, $\rightarrow$, $\leftrightarrow$ | $P_1$, $P_2$, $P_3$, ... | $($, $)$   |
Immaginati un albero piuttosto che una tabella.

Ok, abbiamo definito l'alfabeto, da qui come definiamo poi quali espressioni sono grammaticalmente corrette? Nei linguaggi naturali, non c'è un criterio matematico, c'è un dizionario. Definiamo per induzione.

Definizione induttiva: parto da base e passo. Analisi Matematica menzionata. Episodio crossover, e ovviamente regole di inferenza di ALF. Parto da uno stock iniziale di elementi dell'insieme, che è la base, e definisco nel passo una funzione che mi espande a macchia d'olio l'insieme generando nuovi elementi.

Per esempio, definisco i numeri naturali. La mia base è lo $0$, il passo è l'operatore di successione. Quindi base: "lo $0$ è un numero naturale", passo: "se $N$ è un numero naturale, allora $succ(N)$ è un numero naturale". Quindi, $3$ è un numero naturale? Lo è se lo è $2$, che lo è se lo è $1$, che lo è se lo è $0$, che lo è. Quindi vero: $3$ è un numero naturale.

Per induzione abbiamo definito un insieme infinito a partire da un numero finito di oggetti. Condensiamo l'infinito nel finito. Molto potente, ma molto pericoloso: si avvicina molto alle definizioni circolari, che non sono valide. E qui, nella definizione di numero naturale, in particolare nel passo, uso i numeri naturali. Ma non è circolare, è ricorsiva. Possiamo dire meglio: se $N$ è un numero naturale *già noto*, allora ...

Ma lo prendiamo per vero, su che base? A chi studia filosofia, tutto questo può sembrare un po' naive. Ma se vedo che piove, piove davvero? I sensi ingannano, la nozione di verità e complessa e dibattuta. Uno studente di filosofia problematizza tutto. Ma noi, soprattutto chi l'ha preso come esame a scelta e si sta laureando in informatica, lasciamo perdere e diamo tutto questo per buono. Vedremo i dibattiti sulla definizione di verità più avanti.

Comunque, definiamo il concetto di formula per induzione.

* Base: ogni variabile proposizionale è una formula
* Passo: se $α$ è una formula, allora anche $¬α$ è una formula
* Passo: se $α$ e $β$ sono formule, allora anche $α\landβ$ è una formula
* Passo: se $α$ e $β$ sono formule, allora anche $α\lorβ$ è una formula
* Passo: se $α$ e $β$ sono formule, allora anche $α\rightarrowβ$ è una formula
* Passo: se $α$ e $β$ sono formule, allora anche $α\leftrightarrowβ$ è una formula

L'insieme delle formule è dunque *il più piccolo insieme che si può ottenere partendo dalle variabili proposizionali che è chiuso rispetto all'applicazione dei connettivi logici*.

La definizione induttiva e questa qui sono equivalenti.

Quante sono le formule di $\mathcal{L}_0$? Poiché le variabili sono un insieme infinito numerabile, L0 deve essere quantomeno infinito numerabile. È innumerabile? Allora, no perché puoi contare i connettivi eccetera che non faremo.

Posso riconoscere se una qualche stringa di simboli è una formula nel mio linguaggio o no? Sì, applicando passo per passo la definizione induttiva di formula.

$p \lor (¬q \rightarrow r \lor q)$. Partiamo dall'interno.

* p v (¬**q** -> r v q) - è una variabile
* p v (**¬q** -> r v q) - è una negazione
* p v (*¬q* -> **r** v **q**) - sono variabili
* p v (*¬q* -> **r v q**) - è una disgiunzione
* p v (**¬q -> r v q**) - è un'implicazione
* **p** v *(¬q -> r v q)* - è una variabile
* **p v (¬q -> r v q)** - è una disgiunzione

Sì, è una formula

Quando una stringa non è una formula? $)p→\land qq($

Ok $p$ è una formula, $q$ è una formula, e poi... Non ho altro

Il modo in cui scriviamo i connettivi logici è un tipo di notazione detta infissa. Significa che i connettivi binari vengono scritti in mezzo ai due argomenti. Un'alternativa è la notazione prefissa, dove $p\land q$ diventa $\land pq$. È detta prefissa o "polacca", perché fu usata per la prima volta dai logici polacchi, nelle grandi scuole logiche polacche in cui per la prima volta furono considerate le logiche polivalenti (con non solo vero e falso). grazie alla notazione prefissa possiamo fare a meno dell'alfabeto ausiliario, cioè le parentesi. il grosso svantaggi è che è molto complicata e poco intuitiva, è difficile da decifrare. #aggiustare

Cos'abbiamo fatto? Analizzato una versione semplificata del linguaggio naturale tramite un linguaggio formale. Cosa non abbiamo fatto? Capito come usare gli enunciati per fare dei ragionamenti. Abbiamo studiato gli enunciati in maniera puramente strutturale, ora capiremo come combinare gli enunciati per vedere quali conclusioni possiamo ricavare a partire da quali premesse, per usarli nel ragionamento e nell'argomentazione.

Ci servono dunque delle strutture più complesse dei semplici enunciati, strutture in cui gli enunciati possono avere il ruolo di premessa o il ruolo di conclusione.