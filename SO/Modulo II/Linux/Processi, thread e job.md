## Processi e job

I processi creano altri processi.
Quando immettiamo un comando nella shell, la shell avvia un processo. Anche la shell è un processo. I processi sono organizzati ad albero, la cui radice è `init` o `systemd`. Il kernel avvia init, e init avvia il sistema operativo. Possiamo collegare i processi con le pipe. Un gruppo di processi è un *job*.

I job possono essere in foreground e in background:
* Foreground: il terminale fa solo questo e si blocca finché non ha finito
* Background: il terminale lo avvia e può fare altro mentre quello è in esecuzione
Nel terminale:
* `comando comando comando` è in foreground
* `comando comando comando &` è in background

Per esempio:
```
find / -name "*.txt" > output.txt 2> error.txt &
```
Questo cerca tutti i file di testo in tutto il file system, scrive i loro nomi in `output.txt`, e tutti gli errori in `error.txt`. Intanto, il terminale può fare altro.

PID = process ID - tutti i processi ne hanno uno, posso usarli per comunicare a processi specifici

`kill` non interrompe necessariamente, può inviare vari segnali, anche sospendere

`ps` mostra i processi correnti:
* `PID`: ID processo
* `TTY`: a quale terminale appartiene (è una struttura ad albero ricorda)
* `TIME`: boh
* `CMD`: con quale comando è stato chiamato
Se vuoi vedere l'effettiva struttura ad albero, `pstree`.
Per una tabella simile al task manager, `top` (table of processes).

Ogni terminale ha i propri processi, e gli altri non vedono i suoi processi.

Ci sono processi con relazione padre/figlio, che possono condividere un certo spazio per passarsi dati.

## Thread

Thread

Per compilare:
```
gcc source.c -l pthread -o out
```
Un'altra opzione `-l`. Se lo vogliamo usare con ncurses, dobbiamo mettere entrambi.
Ecco che torna utile makefile, li metti lì.

Tutti i thread hanno un ID, di tipo `pthread_t`.
Ne puoi avviare uno con del codice simile a questo:
```
void* start_routine(void*);
```
Se voglio fare altri thread che fanno una funzione diversa, ne faccio un'altra.
Ogni thread è collegata a una thread function.
Ci possono essere thread per thread function.

Per crearli:
```
int pthread_create(ID, attributi, start routine, argomenti)
```
Gli attributi sono opzioni di sistema, noi le lasciamo a `NULL`.
Gli argomenti invece li useremo.
La start routine è passata come `void*`.

Questione importante sugli argomenti.
Sono simili a come abbiamo messo dei valori nelle pipe.
Non possiamo usare prototipi diversi per thread diversi.
Abbiamo una struttura generica, e definiremo strutture personalizzate.
Passiamo solo un puntatore alla struttura, che poi conterrà tutto.

Valore di ritorno, 0 successo, >0 fallimento, diverso dai processi (dove fallimento è <0).

Quindi, quando accendi un thread, esegue a partire dalla funzione specificata.
Invece il thread principale continua con la funzione chiamante.

Come termino un thread?
Se nelle opzioni metti `NULL`, puoi usare `pthread_cancel(pthread_t)`, simile a `kill()`.
C'è anche `pthread_exit()`, o `return`, simili.
Non useremo `pthread_kill(pthread_t, int signal)`, perché non si aggancia alla logica di quello che dovremo fare.