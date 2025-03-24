(nel processo di aggiungere tag e poi separare non cronologicamente ma per argomento)
Ci sarà bisogno di dividere Linguaggio in tipo "Linguaggio generale", "Linguaggio matematico"...
In realtà forse viene troppo male dividere in argomenti
Forse viene meglio dividere in capitoli
Ma è troppo stream of consciousness
Più vai avanti più è ordinato
## Settimana 1

#generale
Minimo 60% presenze.
Tre prove a un terzo, due terzi e alla fine del corso.
Voto massimo: 33/30.
Il primo parziale sarà nella prima metà di Novembre.
Tipi di domande:
Risposta multipla, con una o più risposte corrette;
Vero/Falso;
Aperta.
Il valore di ciascuna domanda è predefinito, e il voto è la somma dei valori.
Saranno test open book.
I test saranno dello stesso tipo di quelli degli anni precedenti.
Prima di ciascun test, ci sarà un’esercitazione: ci darà i test vecchi, alla lezione dopo li correggeremo, e quella successiva sarà il test.

Per contattare il professore:
E-mail: riccardo@unica.it, oggetto: “\[PR1\]”
Orari di ricevimento: dalle 15 alle 17
Telefono: 0706758540, per le emergenze
WhatsApp/Telegram: 3280090937, solo per comunicazioni immediate importanti

Libri consigliati:
Deitel - Il Linguaggio C, Fondamenti e Tecniche di Programmazione - Pearson

Teams: 319p0vs

I voti dei parziali saranno visibili da Teams, quello dell’esame finale solo da Esse3.
In un algoritmo bisogna tenere conto dello stato corrente del sistema. Di solito, lo stato del sistema è la combinazione dei valori delle sue variabili.
Un algoritmo deve avere un numero finito di stati e un numero finito di operazioni possibili per ogni stato.

#algoritmi
Il quesito dell’uovo tartufato può essere automatizzato tramite un algoritmo, che avrà come operazioni lo spostamento da un contenitore a un altro.
Una possibile soluzione sarebbe fare ogni operazione possibile (ne hai 6) per ogni stato, e tornare indietro quando si è bloccati. Bisognerebbe tenere una cronologia per sapere per quali stati si è già passati, e prima o poi si arriva alla soluzione.
Non tutti gli stati sono validi, nel nostro caso la somma deve essere sempre 80.
L’obiettivo del nostro corso è imparare a risolvere problemi e acquisire un metodo.
Parliamo di termini, definizioni, etimologie e storia.

#storia
Alla fine del ‘600 fu inventata la Pascalina, precursore dei computer.

#termine 
Computer: Dall’inglese, in origine la professione di fare calcoli per i censi. I macchinari hanno preso questo nome dopo un po’ di tempo dalla loro invenzione.

#storia
La macchina analitica di Babbage, l’analytical engine, fu inventata intorno al 1840 per risolvere problemi analitici, cioè matematici. Babbage ci spese l’equivalente di oltre 10 milioni di euro.
Babbage si rese conto che questo nuovo tipo di macchina si poteva programmare, a differenza delle macchine precedenti, che potevano compiere un solo lavoro.
La parola computer fu introdotta per questi macchinari negli anni ‘90.

Un altro precursore dei computer era il telaio a schede perforate, che funzionava con lo stesso principio: diamo istruzioni alla macchina perché risolvano problemi per conto nostro.
Inizialmente, questa era una professione stereotipicamente femminile.
La prima programmatrice fu Ada Lovelace.

Altre figure molto importanti furono Alonzo Church e Alan Turing.
Church inventò il λ-calcolo.
Turing ideò la macchina di Turing, che vedremo l’anno prossimo.
Insieme, pubblicarono la tesi di Church-Turing.

#termine
Definizione di computer: Macchina elettronica che può svolgere diversi compiti a seconda delle istruzioni impartitele.

#storia
I Paesi principali della WWII furono il UK, gli US e la Germania, e furono proprio questi i Paesi dove furono inventati i primi computer.
Due altre invenzioni aiutarono molto: la valvola termoionica e il transistor, invenzione degli anni ‘50-‘60 che rimpiazzò le valvole termoioniche.

#boh
L’esistenza dell’informatica non dipende dai computer. Senza computer, l’informatica sarebbe rimasta una disciplina sconosciuta, esoterica e presa in giro.

#termine 
Istruzione: Comando impartito a un computer che determina una variazione di stato.
Bisogna sempre sapere qual è lo stato del sistema.

Obiettivo della programmazione: Trovare una serie finita di istruzioni che ci fanno passare da uno stato iniziale a uno stato finale.

Programma: Sequenza di istruzioni elementari che un computer è in grado di comprendere ed eseguire.
I concetti di sequenza e di istruzione elementare sono parimente importanti.

Programmare: Realizzare un programma per svolgere determinati compiti.
Per imparare la programmazione bisogna conoscere un linguaggio.
Differenza tra comunicazione verbale e scritta: prossemica.

#generale
Programmare un computer è come parlare a un bambino:
Prende tutto alla lettera;
Devi spiegare esattamente tutti i dettagli, non sa inferire dal contesto;
Non puoi dare niente per scontato.
Le macchine si devono adeguare.

#termine
Informatica: Disciplina/scienza dell’informazione e della sua automazione.
L’informatica, derivando dalla matematica, ha tutto il diritto di essere chiamata hard science.
#algoritmi
Serve un processo risolutivo, è fondamentale.
La caratteristica fondamentale del processo risolutivo è la presenza di un algoritmo.
Un po’ di #storia:
900 d.C. (X secolo), impero Persiano, Al-Khwarizmi inventa Al-Jabr, l’algebra.
Dal nome Al-Khwarizmi (e da arithmos, numero) deriva “algoritmo”.
Un algoritmo è un insieme finito e ordinato di passi univoci eseguibili che definiscono un processo che termina.

#algoritmi
Avere un numero di passi finito è facile.
Far sì che ogni passo sia completabile in un tempo finito è facile.
Assicurarsi che la sequenza di passi e stati sia finita, questa è la parte difficile.
Questo è il celebre halting problem, problema della terminazione.

#algoritmi
Un esempio di algoritmo che termina è l’algoritmo di Euclide.
## Settimana 2

#algoritmi
Massimo Comun Divisore: il metodo più semplice consiste nell’enumerare tutti i divisori del primo numero, tutti quelli del secondo, trovarne l’intersezione, e poi cercare lì il maggiore.
Questo è un metodo di tipo bruteforce, a forza bruta.
Funziona perché l’intersezione non è mai un insieme vuoto, contiene sempre 1.
I metodi bruteforce sono spesso molto lenti e inefficienti, e sono la soluzione in casi disperati, o in certi casi specifici.

Un metodo più efficiente è l’algoritmo di Euclide. È un algoritmo in quanto:
Ha un numero finito di passi;
È scritto in un linguaggio univoco, quello della matematica;
Ogni passo si svolge in un tempo finito.
Termina perché dopo ogni passo, si ottiene un valore strettamente minore del precedente, e lavoriamo con i numeri naturali. Tutte le serie discendenti di numeri naturali prima o poi terminano: non puoi scendere per sempre nei numeri interi senza andare sotto 0.
Otteniamo la risposta giusta? Non lo sappiamo, ma almeno sappiamo che termina sempre.

#linguaggio
Tra l’altro, i simboli matematici sono un linguaggio formalizzato solo dal ‘600, e ancora oggi non sono 100% univoci: la moltiplicazione ha \*, •, ×, e il nulla, la divisione ha :, ÷, /, –.
Prima si scriveva tutto a parole! Confrontiamo la lunghezza:
∀i∈Dx, …
Per ogni i divisore di x, …
Quando si parla di un linguaggio formale, “univocamente interpretabile” è sottinteso.

#termini
Efficacia: Capacità dell’algoritmo di risolvere il problema.
Efficienza: Quanto cresce il tempo di esecuzione al crescere dell’input.

#storia
Von Neumann apparteneva al gruppo dei marziani, un piccolo gruppo di persone che hanno rivoluzionato la scienza, nella zona di Budapest intorno al 1900. Tra questi, anche alcuni che hanno lavorato alla bomba atomica di Oppenheimer.

Dovevano fare tanti calcoli, serviva un calcolatore programmabile per farli in poco tempo.

Macchina di Von Neumann del ‘46:
Nuovo concetto di calcolatore con memoria (per dati e programma), (pensavano in termini di funzioni matematiche)
Esecutore programmabile di istruzioni = processore
Oggi caratteristiche tutte banali.

La prima memoria di massa mai inventata: tre fili ortogonali, intrecciati in un anello di ferrite magnetizzata: a seconda di come passa la corrente per i tre fili, l’anello è magnetizzato in senso orario o antiorario, bit 1 o 0. L’anello può cambiare dinamicamente, ma una volta cambiato senso, il nuovo senso rimane (immagazzinato).

#storia #boh
Era già stato introdotto un modello fondamentale: fetch, decode, execute, ripeti. Prende un po’ di dati codificati, li decodifica, esegue le istruzioni che contengono, e ricomincia. È talmente fondamentale che si usa ancora oggi.
Un algoritmo può essere scritto in pseudo-codice, cioè comprensibile da un essere umano.
Molto diverso è il codice per i computer:
Tempo fa l’unico modo era il codice assembly, che doveva essere cambiato ogni volta che un programma doveva essere usato su una macchina diversa. Questo rendeva impossibile il porting, cioè l’atto di rendere disponibile un programma su più macchine.

#linguaggio #storia
Obiettivo: rendere la programmazione alla portata di molti.
Questo è legato al concetto moderno di natural interaction: per esempio, imparare a usare uno smartphone è intuitivo, perché c’è un lavoro dietro.
La soluzione fu l’invenzione dei linguaggi ad alto livello.
Chomsky, importante linguista, divise le lingue in 4 gruppi, tra cui i linguaggi formali.

#termine
Automa: macchina che esegue istruzioni.
A seconda del linguaggio ci sono automi diversi che comprendono linguaggi diversi.

#linguaggio #termine
Quindi, i linguaggi di programmazione, essendo veri linguaggi, possono essere tradotti.
Traduzione: Prendere il contenuto semantico di una frase ed esprimerlo in un’altra lingua.
Si tiene lo stesso contenuto semantico, ma si cambiano la costruzione della frase, l’ortografia, e le altre cose che caratterizzano un linguaggio.
Traduttore (di lingue naturali): I.A. addestrata sulla traduzione.
I traduttori di linguaggi di programmazione sono molto più semplici, in quanto non hanno bisogno di tenere conto di ambiguità (contrario di univocità).

#linguaggio
Molti termini dei linguaggi di programmazione sono presi da lingue naturali, perlopiù dall’inglese. È per questo che in C troviamo “if() else” e non “profl()”, semplicemente fa comodo a noi perché è una parola familiare.

Ci sono linguaggi compilati e linguaggi interpretati.
Nei linguaggi compilati, come il C, viene prima controllato il codice per vedere se ha un significato logico, poi viene tutto tradotto in linguaggio macchina, e poi viene eseguito.
Nei linguaggi interpretati, si traduce, si esegue, traduci, esegui, sul momento.
I linguaggi interpretati erano passati di moda, ma poi python li ha salvati.
## Settimana 3

#linguaggio
L’architettura dei computer di oggi non è quella di 70 anni fa.
Abbiamo preferito adattare la programmazione ai nostri cervelli piuttosto che il contrario.

Ci sono tre tipi di linguaggi:
Linguaggi naturali: hanno circa 40mila parole, spesso di significato ambiguo, che è la parte difficile, ma la punteggiatura si può usare “a orecchio”;
Linguaggi formali di alto livello: la parte difficile è che hanno regole strette, ma hanno circa 30 o 40 parole, e assecondano l’essere umano;
Linguaggi formali di basso livello: hanno regole strette e poche parole, ma non assecondano l’essere umano e sono più simili al linguaggio macchina.
Ci sono anche altri elementi, come l’ortografia, la sintassi e il lessico.

In generale, i linguaggi umani hanno un lessico complesso ma sintassi semplice, mentre i linguaggi di programmazione hanno un lessico semplice, con pochissime parole chiave, e una sintassi complessa con regole strette.

Un neonato conosce poche parole. Sa esprimere concetti, ma sono concetti semplici espressi in modo semplice.

Si creano nuovi linguaggi di programmazione per adattarsi alle nuove caratteristiche delle macchine.

#linguaggio #storia #generale #boh
Turing: Può esserci una macchina ideale che può risolvere qualsiasi problema.
Macchina di Turing: Macchina con un foglio di carta infinitamente lungo.
Se un linguaggio di programmazione permette di risolvere qualsiasi problema è Turing-compatibile.
I primi programmi Turing-compatibili furono scritti in assembly.

#linguaggio
Quando programmiamo in un linguaggio di alto livello, creiamo un programma che da solo è inutilizzabile, in quanto non c’è una macchina che possa comprenderlo: non è il linguaggio macchina di nessuna macchina.
Serve dunque un processo di traduzione.

“int main() …” è comprensibile per un essere umano.
“10110100101110100” è comprensibile per un computer.
Dobbiamo trovare un codice in linguaggio macchina che sia equivalente, cioè che abbia lo stesso contenuto semantico, del nostro codice in linguaggio di alto livello.
Se facciamo un programma in pascal, e facciamo un programma windows, un programma mac, e uno linux che siano equivalenti al nostro originale, e dunque, per proprietà transitiva, equivalenti tra di loro.

Spesso bisogna aggiustare qualcosa nell’adattare un programma ad altri sistemi operativi, ma grazie ai linguaggi ad alto livello non bisogna cambiare molto.

Ci sono due tipi di errore: un errore di compilazione è dovuto a un codice scritto male, un errore al runtime è dovuto a un ragionamento sbagliato.
C’è un tipo di file, un programma oggetto (file.o), scritto in linguaggio macchina, che però non è eseguibile.

#storia
Java: ‘80-‘90.
I processori stavano diventando sempre più piccoli, si cominciò a pensare di metterli negli elettrodomestici.
Il codice in Java viene prima compilato in bytecode, linguaggio universale, che poi viene interpretato sul momento in linguaggio macchina, quasi parola per parola.
Java si usa molto e funziona molto bene per cose programmabili che non sono esattamente computer, come le lavatrici e i navigatori.

#linguaggio
Grazie ai linguaggi di alto livello, non devo più sprecare tempo a capire il linguaggio macchina, basta risolvere il problema logico.
Nuovo problema: come ragiona l’essere umano?
Scomponiamo un problema in tanti problemi piccoli.
Lo facciamo sempre istintivamente, la nostra mente funziona così.
Scomponiamo un’azione in singoli passaggi, e i passaggi in piccoli movimenti.

Per convenzione, qui si scrive da sinistra a destra.
Se la programmazione fosse nata 1000 anni fa, quando i più colti erano gli arabi, programmeremmo da destra a sinistra.
I programmatori arabi sanno adattarsi a scrivere sia un una direzione che nell’altra.

Se ti dico “fai 12 passi”, non fai lo stesso passo 12 volte, ti “muovi”, perché cambi la condizione di partenza (lo stato del sistema).

Un linguaggio di programmazione deve poter:
Descrivere le istruzioni in modo ordinato;
Selezionare tra due branche di codice secondo una condizione;
Iterare dei comandi cambiando lo stato iniziale;
Noi lo facciamo sempre, ma senza formalizzare questi passaggi.
Nei linguaggi di programmazione introduci costrutti che fanno queste tre cose.
I programmi hanno un punto di inizio e almeno uno di fine.

#linguaggio #storia
Una domanda non aveva risposta fino al ‘66: I linguaggi di alto livello hanno la stessa capacità espressiva che ha l’assembly?
Corrado Böhm (uno dei fondatori dell’informatica in Italia) e il laureando Jacopini, nel ‘66, dimostrarono che l’insieme dei programmi che si possono scrivere in assembly, l’insieme di quelli che si possono scrivere in linguaggi di alto livello, e l’insieme di quelli risolvibili dalla macchina di turing sono in realtà tutti e tre lo stesso insieme.
Programmare sempre in assembly non è dunque obbligatorio.
Programmazione strutturata.

#linguaggio

1. Metodologia:
Comprensione del problema
Modellazione del problema
??? del problema
??? del problema

2. In tutti i linguaggi di programmazione ci sono delle strutture di controllo:
Successione: Implicita, l’ordine in cui appaiono le istruzioni
Scelta: if() else
Iterazione: In C ha molte forme, ma in generale dopo ogni iterazione le condizioni di partenza cambiano, altrimenti sarebbe un loop infinito

3. Torniamo all’uovo tartufato…
Un contenitore ha:
Un nome (“80”);
Un tipo di cosa che può contenere (l’olio tartufato)
Un contenuto corrente (40 ml)

Una macchina automatica (gli dici cosa fare e lo fa) programmabile (sa fare più di una cosa)

Dati in input -> programma <-> dati di lavoro -> programma -> dati in output
Il programma è una funzione:
Prendiamo il programma
Descriviamolo come una funzione
Descriviamone la semantica funzionale

#termine
Programma: una serie ordinata di cambiamenti di stato, che porta dallo stato iniziale, costituito solo dai dati di ingresso, a uno stato finale costituito dai dati di uscita.


Prima dei linguaggi di programmazione, si conservavano valori direttamente in un indirizzo, ma quali dipendeva dall’architettura della macchina.
Ora invece astraiamo, usiamo nomi, e il singolo computer deciderà cosa farne.

#termine
Tavola dei simboli: Associa i nomi delle variabili (astratte) a degli indirizzi di memoria. Associa il modo in cui sono memorizzati i valori nel codice a come sono immagazzinati nella RAM, la memoria ad accesso casuale.
La tavola dei simboli è riempita dal compilatore, solo il compilatore sa com’è fatta.

#storia
Perché si chiama “ad accesso casuale”?
Le prime memorie di massa erano nastri: se ti serve l’indirizzo 50, devi scorrere dall’inizio fino al 50. È molto lento, ma va bene per immagazzinare dati.
Serve anche un modo per accedere ai dati velocemente, e la RAM può andare direttamente all’indirizzo 50 senza scorrere tutta la memoria, può leggere il valore appena mi serve.

#boh #algoritmi
Le variabili sono dentro una macchina astratta e sono esse stesse astratte.
Lo stato del sistema è dato:
Dalla RAM (macchina fisica)
Dalle variabili (macchina astratta)

Io, l’utente, conosco l’input, l’output, ma non conosco ciò che c’è in mezzo.

Fisicamente, le variabili sono immagazzinate in ordine casuale.
Se dichiaro tre variabili x, y e z, può anche essere che si trovino agli indirizzi 679, 536 e 892.
Un po’ di storia.

#storia
I primi linguaggi di programmazione furono:
Fortran (formula translation): primo linguaggio con un compilatore;
Lisp (list processor): primo linguaggio interpretato, circa ‘56. 

#termine
Sistema Operativo (OS): insieme di funzionalità di base per far funzionare un computer.

#storia
Il linguaggio C nasce alla fine degli anni ‘60, nel periodo dei primi tentativi di utilizzo di ARPAnet, alla Bell corporation: si sapeva già che le telecomunicazioni non erano destinate ad essere solo audio, ma anche altro.
Volevano fare un OS unificato per tutte le macchine nuove.
All’epoca sembrava impossibile programmare un OS con un linguaggio ad alto livello, venivano programmati sempre in assembly, ma fare un programma che si adatti a più macchine è esattamente lo scopo dei linguaggi ad alto livello.
Serviva dunque un linguaggio di programmazione ad alto livello.
Questo sembrava un progetto folle.
A un linguaggio di programmazione di alto livello serve un compilatore, un programma molto più semplice di un sistema operativo. Basta dunque fare i diversi compilatori in assembly.

Il prossimo passo è fare il linguaggio.
C’era già chi stava lavorando a un linguaggio di programmazione alla Bell, si chiamava B.
Hanno deciso di adattare B al compilatore, quindi potevano adattare anche il compilatore.
Con grande fantasia, questa versione modificata di B venne chiamata C.

I mainframe tennero i loro OS proprietari.

Unix e C vennero sviluppati su PDP 11, un computer relativamente piccolo ed economico.
L’idea era di usare C per fare Unix, e poi abbandonarlo.
Però C piacque.
C’erano molti sviluppatori di linguaggi a basso livello che si rifiutavano di passare a linguaggi ad alto livello, ma C era un’ottima via di mezzo tra i due, che offriva la comodità dell’alto livello ma la totale libertà dell’assembly.
C, pur essendo ad alto livello, aveva bisogno della libertà dell’assembly perché, dovendo compilare un sistema operativo, doveva avere completo accesso alla macchina e a tutti gli elementi dell’OS.
Questo fece incuriosire gli sviluppatori di assembly, che passarono a C.

Ancora oggi, 51 anni dopo, C è uno dei linguaggi più utilizzati e per questo, sebbene sia uno strumento troppo potente per dei principianti, è quello utilizzato nell’istruzione.

A dire il vero, professor Scateni preferisce Pascal come linguaggio per insegnare, ma nessuno conosce Pascal, e ancora meno persone lo usano.
## Settimana 4
#standard #boh #storia
Un linguaggio di programmazione è qualcosa che dovrebbe essere standardizzato.
Molte cose sono standardizzate: i mattoni, l’USB…
Ci sono due organizzazioni per gli standard:
ISO, internazionale;
ANSI, americana.
E ci sono due tipi di standard:
De jure: ufficiali, come C89 e C90, rilasciati da un’organizzazione;
De facto: come il K&R C, diventano standard solo perché li usano tutti.
Gli standard de facto sono come se, esempio assurdo, ci fossero tante marche di crema di nocciole e cioccolato, ma poi una diventa molto famosa, e tutte le altre cominciano a usare la stessa ricetta di quella famosa. È un esempio impossibile, certo, ma la logica è quella.
Gli standard del C sono sempre più simili al precedente, perché sarebbe un disastro se qualcosa che funziona in un vecchio codice improvvisamente smettesse di funzionare.
Un altro esempio di standard de facto è la posizione della leva della freccia a sinistra del volante: non c’è nessuna legge che lo impone, ma sarebbe orrendo se dovessi abituarti alla configurazione di ciascuna nuova macchina che guidi.
Perciò i linguaggi derivati dal C hanno tenuto molti elementi del C: Java, Per, C++, C#, quindi se sai il C, puoi imparare facilmente i suoi derivati.

#linguaggio
Non esiste il concetto di “questo si può programmare solo in C/C++/C#/JS/Java/…”.
Esiste “questo è più facile da programmare in C/…”. Al tuo datore di lavoro non importa.

C ha caratteristiche dei linguaggi di basso livello che non ci aspettiamo da uno ad alto livello.
C può accedere a certe parti dell’architettura della macchina che non dovrebbero essere accessibili ai linguaggi ad alto livello.
Vi può accedere perché dovevano farci un sistema operativo.
Ma per questo motivo, C non è 100% portabile.
Il programmatore ha “troppo potere”, quindi C è più adatto agli esperti.
C di base non può neanche gestire input e output, usa delle librerie per farlo.
Eppure, è il primo linguaggio che si insegna, perché lo usano tutti.
(Questo ci porta alla differenza tra istruzioni del linguaggio e istruzioni delle librerie, più tardi)

Secondo il professor Scateni, Pascal è un ottimo linguaggio per uso didattico.
C’è solo un problema con Pascal: è inutile.
Non lo usa nessuno.
C si usa perché è utile, è molto usato e lo sono anche i suoi derivati, è pieno di ottimi compilatori di C, quindi c’è poco da cambiare per il porting.

#storia
Linux è stato fatto praticamente da una persona, Linus Pauling, sulla base di Unix.
L’idea: portare Unix ai personal computer (che ormai è una sottocategoria obsoleta)

#linguaggio #boh #goodpractice
Donald Knuth ha fatto TeC, da cui deriva LaTeC.
TeC automatizza la qualità tipografica.
Knuth ha preso il manuale statunitense della buona scrittura e l’ha trasformato in codice.
È importante commentare il codice perché C può essere confuso e offuscato.
L’ideale è: 1 riga di codice, 1 riga di commento, circa.
È difficile modificare il codice di qualcun altro (o il proprio vecchio codice), soprattutto se non ci sono commenti.
Esistono addirittura gli Obfuscated C contests, dove meno si capisce, meglio è, e non c’è bisogno di aggiungere altro per far capire in che situazione è il C.

Una regola molto importante per la progettazione di un programma è:
Prima scrivi i commenti, poi il codice.
I commenti sono il progetto originale, il codice è solo una traduzione!
E la traduzione deve essere 1:1, altrimenti:
O manca qualcosa nel commento, quindi è incompleto;
O il commento è innecessariamente lungo, quindi è ridondante.
Il commento è completamente ignorato dal compilatore.

Il compilatore capisce se la sintassi è giusta. Solo la sintassi.

#linguaggio
Si può descrivere la sintassi di un linguaggio naturale (vedi anche slide).
Lo stesso si può fare per un linguaggio formale, e c’è una notazione specifica per farlo.
BNF: Backus e Naur si sono resi conto che serviva un sistema.
\<reale> e \<cifra> sono categorie sintattiche.
“blu”, “ligneo”, “3” eccetera sono simboli terminali.
Per esempio:
\<attribuzione> ::= \<gruppo_nominale> è \<aggettivo>;
\<aggettivo> ::= blu|rosso|basso|ligneo|…;
Dove “::=“ significa “può essere” e “|” significa “o”, la congiunzione.
L’insieme delle regole della sintassi di una lingua è detto grammatica.
[Regole dalle slide]
Per costruire una frase partiamo dal basso (voglio un reale) e andiamo in alto (32.21).

|         3         |    2     |  .  |         2         |    1     |
| :---------------: | :------: | :-: | :---------------: | :------: |
|     \<cifra>      | \<cifra> |  .  |     \<cifra>      | \<cifra> |
| \<sequenza_cifre> |    <     |  .  |     \<cifra>      | \<cifra> |
| \<sequenza_cifre> |    <     |  .  | \<sequenza_cifre> |    <     |
|     \<reale>      |    <     |  <  |         <         |    <     |


12 non è un reale.
È così che il compilatore decide come tradurre un numero da caratteri a linguaggio macchina (vedi FDI, rappresentazione dei numeri interi e razionali).
Lessico: insieme dei simboli e dei termini.

I modelli linguistici generativi generano linguaggio da:
Sintassi;
Vocabolario;
Informazioni esterne.
[Vedi slide col diagramma ad albero etc]
G=(T, N, P, S)


#vedioriginale
Sintassi
Semantica
La tenda
V
V
Lo tenda
V
X

”Lo tenda” al compilatore va bene, siamo noi che dobbiamo controllare la semantica.
Secondo la sintassi, “lo tenda” è giusto perché è “\<articolo> \<nome>”.

## Settimana 5

#linguaggio
Una frase di senso compiuto è una frase il cui significato è contenuti nella frase stessa.
Abbiamo imparato il nostro linguaggio naturale copiando gli altri e poi imparando le regole.
Per fortuna, per imparare i linguaggi di programmazione non si fa così, si studia prima tutta la parte formale, e poi si comincia a usarlo.
Costruiamo una frase, che nei linguaggi di programmazione è un programma.
Quando abbiamo solo simboli terminali abbiamo finito di costruire la frase.
“La tenda” e “lo tenda” sono entrambi sintatticamente corretti.
Ma, il secondo non ha senso semantico.

Nella programmazione, la parte facile è correggere la sintassi, quella difficile è controllare che la semantica sia corretta, cioè ciò che voglio.
Non c’è semantica oggettivamente corretta, dipende da cosa voglio che faccia.
Alla sintassi ci pensa il compilatore.
Come si fa per la semantica?
Si controllano tutte le combinazioni input-output?
Certo, ma no, questo metodo è solitamente impossibile.
Inferno. Non c’è una risposta, mi dispiace.
Il compito di un bravo compilatore è fare un programma che sia facile da testare.
C’è tutto un ramo di studi per questa cosa.

Per la sintassi, usiamo un grafo sintattico. [vedi slide]
È ancora più facile imparare il lessico.
È il contrario delle lingue naturali, dove la sintassi è semplice e il lessico è difficile.
Gli identificatori, essendo stati scelti dai progettatori dei del linguaggio di programmazione, non possono essere usati dal programma stesso.
Gli identificatori (o nomi) sono le parole del linguaggio. In C ce ne sono 33.
Tutti i linguaggi di programmazione sono così. Quello con più parole è Ada, sviluppato negli anni ‘70 dalla difesa statunitense per essere il miglior linguaggio per la sicurezza. Oggi lo usano solo loro. È il linguaggio con più parole riservate e ne ha 110.
Tra l’altro, in C ci sono più operatori che identificatori. Alcuni sono inutili per noi però.

Quando il compilatore vede “/\*”, ignora tutto e cerca un “\*”. Se lo trova, se dopo c’è un “/“, riprende a compilare, altrimenti continua a ignorare.
Questo testo, ignorato dal compilatore, racchiuso tra “/\*” e “\*/“, si chiama commento.

{
	etc…
}

Questo, racchiuso tra parentesi graffe, è un blocco di codice

#boh #linguaggio
C è particolare, in quanto non ha istruzioni proprie per l’input e l’output, deve invece usare istruzioni di librerie esterne. Il primo programma che si fa vedere agli studenti (Hello World), non ha funzioni del linguaggio C. (Diciamo, ci sono nella definizione di printf()).
Perché 5+4=9?
L’addizione è una funzione a due variabili: (N, N)->N (da N cartesiano N ad N).
+(5, 4) = 9.
L’addizione nei computer è un circuito stampato, interazioni tra impulsi elettrici.
Tra l’altro, in binario ti bastano 4 combinazioni di x ed y per fare x+y.
All’inizio si faceva con calcolatori meccanici. Con quelli elettronici è ancora più veloce.
Grazie ai linguaggi ad alto livello possiamo essere più sintetici e scrivere “5+4+5”.

Noi scriviamo “4+5” e non “+ 4 5” perché ce l’hanno insegnato così.
Prendiamo “3+2\*4”: un compilatore semplice direbbe che fa 20, andando in ordine.
Il compilatore deve trasformarlo in cose del tipo “ADD MUL R1” eccetera. Bel casino.
Deve leggere tutta l’espressione, riordinarla, e poi compilare.
(inserire grafo) Al compilatore piacerebbe farle in ordine.
Un’alternativa è cambiare le relazioni tra operatori e operandi.
“3+4” -> “+ 3 4”, operatore-operando-operando.
“3+2\*4” diventa + * 2 4 3, + * 2 4 3.
Questa si chiama tokenizzazione, e quelli sono 5 token.
Il ragionamento è questo:

+
Cosa c’è dopo?
\+ * 2
Non si può fare, riparto dal secondo token.
\* 2 4
Ok, rimpiazzo questi tre token con uno solo, 8. Adesso ho 3 token in totale.
\+ 8 3
Ok, fa 11.

Se non trova “\<operatore> \<operando> \<operando>” non fa nulla.
(3+2)\*4 è diverso: * + 2 3 4.
Questo metodo abolisce le parentesi grazie agli operatori prefissi.
Semplice, univoco, lo leggi e sai cosa devi fare.
Ma noi complichiamo la vita al compilatore per facilitarla a noi.
Il vantaggio degli operatori infissi è che sono anche separatori, è difficile scrivere bene gli spazi a mano per evitare che diventi “* +2 34”, il cui risultato è 68.

Postscript è un linguaggio nato per descrivere pagine alle stampanti, sviluppato da Adobe, usato nella realizzazione del formato PDF. Quindi ha dominato il mondo. E appunto ha operatori postfissi.
Il linguaggio più diffuso che usa i prefissi è Lisp.
Si fece per adattare il linguaggio alla semplificazione del processo di traduzione.
Quando l’IA era ancora seria, senza media, senza Elon Musk, si usava Lisp.
Se rappresenti dati e programmi nello stesso modo, allora puoi outputtare programmi (programmi in Lisp) e questo fu chiamato machine learning: un programma che può modificare sé stesso.
## Settimana 6

#linguaggio
Calx (sasso) -> calculus (sassolino) -> calcolo renale, calcolo (sassolino dell’abaco).
Anche adesso, anche coi computer, calcolare è contare.
“Il computer sa fare…” = La macchina è progettata per fare…

Mettere gli operatori infissi non è legge, è convenzione.
Se li mettessimo prefissi o postfissi, non servirebbero le parentesi, non servirebbe la precedenza degli operatori, si leggerebbe sempre da sinistra a destra.
La precedenza degli operatori è una proprietà implicita.
Se esiste, complichi la realizzazione del compilatore.

Il C nasce per avere un compilatore semplice, eppure ha operatori infissi.
Più si va avanti, più i linguaggi di programmazione si fanno simili al linguaggio umano.

#boh
Ricorda che la divisione tra interi ha due risultati, anche se lo dimentichiamo.
Da dire che 7:5 = 1R2 passiamo a dire che 7:5=1,4.
Un’operazione però può avere un solo risultato, quindi separiamo la divisione intera in due: la divisione 7/5=1 e il modulo 7%5=2.
Un tempo sapevamo che un’operazione può avere due risultati, ma ce l’hanno fatto dimenticare dopo le elementari.

#boh #linguaggiomatematico #linguaggio #linguaggiosimboli
Che tipo di numero è 25? Domanda ridicola, è 25.
Comunque è un numero naturale.
Facendo parte di N, fa parte anche di Z, quindi di Q, quindi di R.
Nei computer, ci sono due tipi di numero: int e float, completamente separati.
Z fa parte di Q, ma int non fa parte di float.
Gli int e i float sono gestiti da parti diverse del processore.
L’operatore “+” è uno, ma è bino (tipo Dio che è trino), perché è un simbolo, ma ha due operazioni, molto diverse in linguaggio macchina.

13+43, leggi gli operandi e capisci che “+” è l’operazione dell’addizione intera, lo capisci a partire dalle regole implicite del linguaggio.
2.5+3.2, stessa cosa, sai che è un’addizione reale.
3+1.3 e ora? NcZ, quindi è un’addizione reale.
E questa non è una particolarità del C.

Ci sono 5 simboli per le operazione aritmetiche (+ - * / %), ma 9 operazioni.
\+ - * / sono operatori sovraccarichi, overloaded, hanno più di un’operazione ciascuno.
La soluzione è fare nuovi simboli: 13+43 e 2.5☺3.2, eccetera.
Potrei? Sì. Quanto mi conviene? Poco.
Converrebbe molto al compilatore, ma facciamo un compromesso.
OCaml li distingue.

Per quanto riguarda la precedenza, la possiamo modificare co due separatori, ().
Sono strani però: 8-3\*2 = 3-(3\*2). Non cambia nulla ma è sintatticamente corretto.
8(-3*)2 invece no, perché -3* non è un’operazione.
Il C ha 35 operatori, con 15 livelli di precedenza.
Per l’associatività, vedi slide.
L’associatività è LTR per 5-4+3 e RTL per +-k.

#algoritmi #bohguarda #checasino
È possibile che l’intero programma sia un’unica valutazione con tutti gli input e tutti gli output.
Non succede mai.
Abbiamo stabilito che un programma deve cambiare passo-passo lo stato del sistema, tramite delle assegnazioni.
Il succo dello scrivere il programma è capire quali assegnazioni fare.

L’assegnazione ha tre ingredienti:
1 variabile;
1 espressione;
1 simbolo.
E che simbolo?
Una freccia?
var <- expr
Bello. Intuitivo. Ma non c’è nella tastiera.
Una sorta di freccia?
var <-- expr
Non lo usa nessun linguaggio. Peccato, è carino.
Una lettera?
var w expr
La w è inutile, no? Non serve a niente, usiamola qui. Però dai è una lettera, evitiamo lettere e cifre, usiamo la punteggiatura.
Quindi della punteggiatura.
var := expr
No, non è un metaforico simbolo fallico. Bellino, si usa in Pascal. Ma, c’è un problema. Sono due simboli. Si fanno tante assegnazioni, è scomodo.
Togliamone uno.
var = expr
Esattamente ciò che usa il C.


Che scelta tragica. Sì ok dopo l’assegnazione sono effettivamente uguali, ma non è proprio la cosa più sensata. Sto prendendo il simbolo matematico che dice “sono uguali!” e lo sto usando per fare un’azione. Lo sto rendendo dinamico.
Forse non era la scelta più sensata. C fu il primo a fare così, seguito dai suoi derivati.
Dai, è solo una convenzione, potevo chiamarlo “pippo” e invece è “=“, non cambia niente.
Non è vero, vedremo più avanti i problemi che causa.

Le operazioni sono calcoli, le istruzioni sono cambiamenti dello stato del sistema.
Quindi l’assegnamento è LA istruzione.
In tutti i linguaggi imperativi lo è.
In C è un operatore.
PERCHÉ? CHE SENSO HA?
Uno solo: puoi fare i=j=k=0 per rendere tutti 0.
L’operatore = cambia il valore di var in expr e restituisce expr.
È un’operazione, ha un risultato.
È diverso dagli altri operatori. “3+5” è 8 ma non fa nulla. “a=5” è 5 ma cambia a.
Questo cambiamento è un side effect.
Quella che negli altri linguaggi è la sua azione fondamentale diventa un effetto collaterale.
C è stato sviluppato con una macchina con 56 KiB di memoria! Serviva la compattezza di
i=j=k=0. Adesso che non abbiamo questi problemi possiamo anche dimenticarcene.
I linguaggi di alto livello non hanno una macchina che li possa capire.
Però, grazie alla traduzione, c’è una macchina astratta che lo capisce.
Il programma della macchina astratta è totalmente equivalente a quello reale.
Tutti gli stati e i cambiamenti di stato del programma astratto equivalgono a quelli reali.

Assegnazione. È il concetto fondamentale.

Operazioni: valutare espressioni.
Istruzioni: modificare lo stato del sistema.
Di queste due grandi famiglie di azioni, diremmo che l’assegnamento è un’istruzione.
Eppure in C è un’operazione.
Soluzione: facciamo finta di no, dimentichiamocene.
Ce ne dobbiamo ricordare nel caso in cui facciamo un errore.

Nella buona progettazione di un linguaggio di programmazione, si evitano i side effect.
I side effect sono uno scopo accessorio spesso indesiderato, ma nell’assegnazione è l’effetto voluto e quello che ci si aspetta come primario.
Il linguaggio Haskell è 100% funzionale, può solo modificare lo stato e non ha side effect.
I linguaggio Scala ha una caratteristica nel mercato: i programmatori di Scala sono pagati di più. Questo è perché Scala è usato in ambienti finanziari, dove girano molti soldi.

3=2 non si può fare.
L’L-value deve essere un contenitore: gli unici contenitori che abbiamo visto sono le variabili.
La semantica dell’assegnamento è:
Valuta l’R-value;
Restituisce il risultato;
Side effect: sostituisce il contenuto dell’L-value col risultato.

Un linguaggio di programmazione senza variabili sembra un concetto strano.
È strano. Se ti interessa, guarda Haskell.

Se il comportamento del programma si basa sullo stato 1, ma lo stato 1 è indeciso, c’è un problema di indecidibilità.
Quindi, il programma va inizializzato.
Esempio:
int i, j, k;
k = i + j;

Quanto vale k? Boh.
Non è un errore sintattico, la sintassi non obbliga a inizializzare le variabili.
(Per esempio, inizializzare k è inutile).
Talvolta non è neanche un errore semantico.
Questo è un errore concettuale.
Per sicurezza, inizializziamo sempre tutto. Al massimo il compilatore semplifica.
int i = 3;

Non è un’assegnazione, ma fa la stessa cosa.
Se non inizializzi, il compilatore ti dà un ignorabilissimo warning.
Li leggi gli warning? No, quando mai, non li legge nessuno.
Assegnamento composto

Aggiornare il valore di una variabile: a=a+2.
Visto che è molto frequente, è stato introdotto a+=2.
+= e non =+: per ricordartelo, tieni a mente che prima fai il + (a+2) e poi l’= (l’assegnazione).
Cursed. Ora è proprio un’operazione pur essendo un’assegnazione, anche concettualmente.

Problema:
a*=3+2 si può interpretare in due modi:
(a = a * 3) + 2;
a = a * (3 + 2): corretta.
La semantica è questa:
Valuta l’R-value: 3+2=5;
Valuta L-value*R-value: a*5 = 5a;
Assegnazione: a = 5a;
Esiste per l’efficienza, per quei 58 KiB di memoria.
È ridondante ma è efficiente per il compilatore: si traduce direttamente come ADD R1 R2.
Ecco perché ci sono così tanti operatori.

Parliamo di qualcosa di ancora più efficiente.
Anziché i=i+1, anziché i+=1, scriviamo i++.
Essendo un operatore di assegnamento, l’L-value deve essere un contenitore.
Ci sono quelli prefissi e quelli postfissi: ++i e i++.
Fanno la stessa assegnazione, ma cambia il risultato.
Se i=1, i++ viene valutato 1, mentre ++i viene valutato 2.
Quindi posso fare j = i++ + ++i.
ECCO. Ci siamo arrivati. Ecco la maledizione.
Questi sono operatori di assegnazione e sono dentro un’espressione.
E SI USANO, CAZZO! È PRASSI COMUNE!
Quando si usano questi operatori, si valuta e si ha un side effect.
In un’espressione di solito non ci sono side effect, si valuta e basta.
In un’assegnazione di solito si ignora la valutazione, si usa il side effect.
Questo ha entrambi. Cursed.

Questi operatori hanno la più alta priorità, gli altri operatori di assegnamento ce l’hanno bassissima. ++i ha più priorità di i++.
Di forma, gli operatori del C fanno schifo, ma sono efficientissimi.

Vediamo un programma con due righe, e i valori dopo ciascuna riga.
i
j
k
int i=3, j=2, k;
1
2
?
k = ++i + j++;
2
3
4


Questo equivale a:

int i=3, j=2, k;
i = i + 1;
k = i + j;
k = j + 1;


## Settimana 7 (prima del parziale)

TUTTE le risposte a TUTTE le domande del mondo.

Per le domande del tipo “Quali di queste?”, o è sì o è no, nient’altro.
“Non è del ‘78 perché la primissima edizione è del 31 dicembre 1977 STA CERCANDO DI FREGARMI” no. Non ci sono domande a trabocchetto.

Per le domande a risposta multipla, vediamo quattro tipi di studente:
“Questa è vera di sicuro, metto vera solo questa”: 1/2 risposte giuste, 0,5pt;
“Queste due sono vere di sicuro”: 2/2 risposte giuste, 1pt;
“Queste due sono vere di sicuro”: 1 giusta e 1 sbagliata, -0,5pt;
“Queste tre sono vere di sicuro”: 2/2 giuste ma 1 sbagliata, -0,5pt;
Ne basta una sbagliata per annullare quelle giuste.

Didattica: Scienza dell’insegnamento.
Docimologia: Scienza della valutazione.

Vediamo le domande del parziale dell’anno scorso.

Ho “- / 80 2 4”.
- / 80 non esiste;
/ 80 2 è 40;
- 40 4 è 36.

Bello sarebbe l’operatore +/-. 3 +/- 2, bello. Quanto fa? Boh, più o meno all’incirca siamo lì.

Se chiamo la variabile “precipitevolissimevolmente” ma mi accorgo che usa tropppa memoria, quindi la abbrevio a “precipitevolissime” con l’istruzione di accorciamento della variabile, che usa la parola chiave stocazzo.

L’anno scorso c’erano circa 2,3 risposte esatte per domanda. È quest’anno? Heh.

Se sbagli, puoi mettere un “NO” vicino alla casella sbagliata.

Per la domanda su i, j, k.
Se dai solo i valori e il resto lo lasci in bianco, 1,5pt.
Con uno o più valori errati, 0pt.
Puoi scrivere così:


T1
T2
T3
Linea
Read
Write
i
4
4
4
1
0
0 (3 con int i=4)
j
3
3
4
2
2
1
k
2
2
2
3
3
2
perché


6-2=4
k = k*(i/++j) = 2*(4/4))
Totale
5
3 (o 6)


La risposta alla domanda dopo è i: 3, 4; j: 3, 2.

Per i += --i * j++, quale side effect accade prima? += o --?
Boh, dipende. Dato il risultato, dimmi la logica imprevedibile che ha portato a quel calcolo.

## Settimana 14
Esercitazione

L’esame ha 8 domande a risposta multipla, 7 vero/falso e 6 a risposta aperta.
Se ce ne fossero 5 di un’altra tipologia e 4 di un’altra ancora sarebbe molto bello.
La prima domanda riguarda l’argomento della scorsa lezione (venerdì, oggi è lunedì).
Sicuramente tutti hanno studiato di giorno e dormito di notte, nonostante gli Australian Open giochino di notte, per studiare l’ultimo argomento.

O(n) è un valore teorico, non pratico, riguarda l’algoritmo, non la sua implementazione.

Domande a risposta multipla:

Domanda 1: “Quantità di dati nell’output” è una supercazzola, importano solo i dati in input.

Domanda 2: *(s+2) è come s[2]. “Parco” è P a r c o \0, 6 elementi.
s è come &s[0]. Quel +2 è un “+ 2 volte la dimensione di un char” in questo caso.
“La dimensione è 5” in docimologia si chiama “distrattore”.

Domanda 3: La dimensione di un puntatore dipende dall’architettura della macchina.
Nell’architettura a 32 bit, puoi indicizzare 2³² locazioni di memoria, equivalenti a 4GB.
La prima macchina su cui fu usato il C aveva 11 bit. Che numero è 11 bit? Strano.
La dimensione di un puntatore non dipende dal tipo a cui si punta. E dal nome?
p occupa 1, pippo occupa 5, giovanniDallaBandaNera occupa… No, è fissa.

Domanda 4: La dimensione delle celle di memoria è appunto costante.
I frame vanno tutti sullo stack.
Lo heap è per l’allocazione dinamica, lo stack è per i frame delle subroutine.

Domanda 5: sizeof() determina la dimensione di un frame? No ma sarebbe bello.
Può invece calcolare la memoria occupata da un tipo, e la esprime in byte.

Domanda 6: . e -> sono appunto distinti, come abbiamo visto.

Domanda 7: Se una struct è fatta di un int e un float, puoi inizializzarla come, per esempio, {3, 4.0} o {{3}, {4.0}}, ma non come {{3, 4.0}}. Nel terzo caso, la sottolista viene assegnata all’int, tenendo conto solo del suo primo elemento; il secondo viene scartato, perché a un int basta un valore.
In un mondo giusto, float f = ‘4’ darebbe errore. Ma il C è un mondo giusto? No.

Domanda 8: È possibile non basti la memoria per allocare.
Non si può verificare che lo heap sia pieno. Mai sentito parlare di isHeapFull()?
Ma tanto verificare che sia pieno sarebbe inutile.
Si richiede memoria allo heap, ma non esiste isHeapEmpty().
Non viene sempre allocata memoria quando è richiesta.
Domande vero/falso:

1. Vero, in C non si alloca al runtime, lo fa il programmatore.
2. Vero. Tail recursive: chiama sé stessa una sola volta, alla fine del codice.
3. Falso, puoi fare class.best[2].name.first.
4. Il Basic non consente la ricorsione e non ha lo stack.


Domande a risposta aperta:

Domanda 16: Con Rat si intende rational.
Se volessi fare metodi per normalizzare e semplificare in C non si può fare.

Domanda 17: int*p; p=(int*)malloc(sizeof(int)); realloc...etc;

Domanda 18: Si capisce.

Domanda 19: “Possiamo effettuare” è un’affermazione.
Rat*s=(4,5,6); Un puntatore si inizializza con un solo valore, il resto viene scartato.
In C, int e indirizzi sono compatibili, avviene la type coercion.
L’assegnazione è possibile per due motivi:
	Int e puntatori sono compatibili;
	Una lista di inizializzazione viene usata finché è utile, il resto è scartato.

Domanda 20: Non ci vuole nulla, la formula matematica è già codice.
Caso base (1, 2) e caso ricorsivo (>2).

Consiglio: fai prima le domande più difficili e che impiegano più tempo.

Se hai del codice così:
for ...
	for ...
		for ...
			sum = sum;

Devi moltiplicare tutte le complessità. Se ciascun for è lineare e dentro c’è l’assegnamento, diventa N∙N∙N∙1 = N³.



Adesso il corso è davvero finito.
