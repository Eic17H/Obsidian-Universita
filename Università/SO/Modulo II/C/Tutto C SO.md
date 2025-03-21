## Prima lezione

Cominciamo col C
Appunto Unix è stato fatto in C perché C è fatto per essere portabile in diversi computer
Il C è stato fatto per Unix, poi si è diffuso
Unix è stato branchato molto, un po' anche il C, dialetti di C
Poi si sono fatti degli standard di C: C89 e C99 sono i più utilizzati
    Adesso siamo arrivati al C23

Ci sono lnpr compilati e interpretati
    Compilato: tradotto tutto prima e poi eseguito
    Interpretato: tradotta una riga alla volta, eseguita, passa alla prossima riga se non ci sono errori
Il C è compilato

Il C ha modi di gestire puntatori etc per gestione della memoria
    Molto importante la gestione della memoria perché un SO deve avere molto controllo sull'hardware
    I linguaggi più moderni sono molto più astratti, rischi meno errori umani
        Ma comunque se astrai sei meno efficiente, il C è potenzialmente più efficiente se sei bravo
            Importante per la computer graphics
            Se ti serve sicurezza sono meglio altri linguaggi

Un programma C avvia per prima cosa la routine main()

Ok noi scriviamo in C che è simile all'inglese, ma il computer capisce solo 0 e 1
Chi traduce?

Preprocessore
    Procedure di precompilazione
    Espansione delle macro, espansione delle librerie
Compiler
    Da C ad Assembly
Assembler
    Da Assembly a Linguaggio macchina
Linker
    Attaccare il nostro codice in LM con il codice delle librerie

Noi siamo abituati a usare un IDE: clicchiamo un bottoncino e il codice va
In realtà quella è un'astrazione
Il software dell'IDE è una GUI più tanti altri software con vari passaggi
L'IDE si appoggia a software che potrebbero esistere indipendentemente
La compilazione avviene con GCC (Gnu Compiler Collection)
    Lo stesso GNU di Unix
    GCC è un programma che accetta opzioni, come gli altri binari chiamati dalla CLI
        Per esempio -c salta il linking e ti lascia con un file .o per ogni sorgente
        Con -d puoi cambiare i valori delle macro
            Simile ai $1 $2 $3 dei file bash, che sono essenzialmente macro
        Con -o decidi il nome del file di output
    Certe volte l'IDE non trova neanche GCC, e non puoi compilare col bottoncino
    Di default il file in output è a.out

Se ci sono tanti file non vogliamo scrivere tanti comandi per compilarli tutti, vogliamo automatizzare
    Vedremo dopo come

Un'altra funzione degli IDE è il debug
Il debugger è un altro software che ci permette di specificare punti di controllo dove vedremo certi valori
    Così sappiamo a quale passo cominciano ad esserci valori sbagliati e correggiamo lì
    Il debugger è GDB (Gnu DeBugger)

Per il debug puoi aggiungere breakpoint con break tramite la CLI
Se non metti l'opzione -g il debugger non riesce a fare certe cose
Per i veri comandi vedi le slide, utili

Metti che abbiamo un progetto con file1.c file2.c file3.h
Basta fare gcc -c file1, gcc -c file 2, gcc file1.o file2.o
Colleghiamo a mano i due file oggetto nell'ultimo passaggio
Il file in output è a.out

Considerare le dipendenze, grafo delle dipendenze slide
    Non vale solo per C, in generale
Per il C, il grafo è codificato nel file "Makefile" senza estensione

Attento che se non metti file.h su "file1.o: file.h file1.c" poi ignora le modifiche se il file modificato più di recente è file.h
Nelle slide ciascuna regola ha solo un comando gcc, ma puoi mettere quello che vuoi anche rm eccetera più comandi per regola
Per lanciare Makefile usi "make". Se specifichi una regola, fa quella, altrimenti la regola in alto, che idealmente ha legami con quelle successive e quindi a catena fa le dipendenze

Il comando clean elimina i file .o che sono inutili una volta finito

È convenzione chiamare Makefile Makefile, così basta fare "make" senza specificare il nome del file

## Seconda lezione

Programmi diversi che vivono su HW diversi possono comunicare
    API: application program interface

Ci sono diversi livelli nell'architettura linux:
    User
    Standard utility program (shell, text editor, compiler)
    Standard library
    ... boh insomma vedi slide

L'utente usa il sistema tramite system call
In C si usano come se fossero chiamate a funzioni
    Rendono valore negativo in caso di errore (di solito -1)

Concetti utili
    PID - process ID, unico per ciascun processo
    wait - il padre aspetta il processo figlio
    exit - termina un processo rendendo un certo exit status

FORK
Il tipo pid_t è l'ennesimo reskin di int, è il tipo di ritorno di fork()
Quando fai fork() duplichi il codice, il padre e il figlio hanno diversi valori di ritorno
    Se fai fork() di solito vuoi due processi che fanno cose diverse, quindi usi l'ID in un if
    Al padre viene reso l'id del figlio, al figlio 0
    If error then return -1 to padre, il figlio invece non esiste ovviamente perché ha fallito
    Il padre memorizza tutti i pid dei figli così se li gestisce
Abbiamo già visto le pipe in bash
    Adesso invece le pipe sono "tubi" che fanno comunicare i processi
        Una pipe è un file

Ci sono alcune librerie che dobbiamo includere
    unistd.h, sys/types.h
Dichiariamo una variabile all'inizio del main
    pid_t pid
C'è una funzione che dice l'id del processo che la chiama
    pid_t getpid()`

Se fai un programma che stampa qualcosa nel padre e un'altra nel figlio, l'output sarà inconsistente.
    È quello dell'esempio.
Perché?
Cosa succede quando eseguo questo codice? Creo un nuovo processo.
I processi, con una sola CPU, fanno a turno a usare la CPU.
    I turni sono decisi dallo scheduler.
    Se si meritano entrambi di andare allo stesso momento, l'ordine sarà essenzialmente casuale.
    Questa è una race condition.

`exit()` termina un processo.
I suoi processi figli rimarrebbero orfani e non avrebbero nessuno che recuperi i loro status.
Quindi il loro padre viene impostato a `1` (vengono adottati da init o systemd).
Nel main, `exit()` equivale a `return()`

Con `wait(int*)`, si blocca finché non finisce un figlio con exit
Con `waitpid(pid_t, int*, int)`, si blocca finché non finisce un figlio specifico
    `int* stat_loc` contiene la exit status
Poi ci sono due macro, `WIFEXITED`, `WEXITSTATUS`, vedi slide
Restituisce `-1` se non esiste un processo con quel PID
waitpid():
    Con pid positivo, attende quel processo
    Con `-1`, qualsiasi processo figlio
    Con qualunque altro valore negativo, prende i valori con PID gruppo uguali al valore assoluto
    Con `0`, bohh vedi slide

Processi zombie: termina ma non rende un exit status
Con ps (terminale) vedo tutti i processi, e mi dice gli ID e se sono defunti

C'è una tabella dei processi, si può riempire, se si riempie non puoi fare altri processi

`fork()` non è l'ultimo modo per creare altri processi, sarebbe troppo limitato
`execl()`: esegue un binario
    `ececl("/bin/ls", "-l", NULL);`
    Chiama il binario che si trova in quel path con quell'opzione
        Se va a buon fine, il processo chiamante non viene più eseguito
        In caso di errore, continua l'esecuzione del processo chiamante
            Quindi magari nel resto del main metti il messaggio di errore