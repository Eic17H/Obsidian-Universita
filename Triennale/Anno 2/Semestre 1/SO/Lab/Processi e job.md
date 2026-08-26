---
cssclasses:
  - so
---
Processi e job.
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