### Prima lezione

Alcuni comandi del terminale hanno argomenti e opzioni

Opzioni di `ls`:
• `-a`: tutti i file, anche quelli nascosti (i file nascosti iniziano con `.`)
• `-l`: più informazioni sui file
• `-i`: particolare e complicato, ne parliamo più avanti
Queste lettere non sono del tutto a caso, sono un minimo intuitive. All, long, i-node.

`ls -l ./`
Che fa?
La nostra directory corrente è `./`, quello è un argomento
Le opzioni cominciano di solito con `-` o con `--`
Quindi lista tutti i file lungamente nella directory corrente
Cosa ci restituisce?
Ci dice nome, ultima modifica, dimensione, e il numero di link fisici a quel file (non link simbolici)
Il primo carattere indica il tipo di file (file, directory, link, periferica, pipe, socket)
Ci dice i permessi di accesso, vedi le slide. Proprietario del file e gruppo proprietario
Tornando ai permessi, sono 9 caratteri
* Relativi al proprietario di cui sopra
* Relativi al gruppo di cui sopra
* Relativi agli altri utenti
Quindi c'è read, write, x per ciascuno
X significa esecuzione, execute
`rwx` è tutti e tre, `---` è nessuno
L'utente root ha sempre `rwx`

Ricorda: `$`utente `#`root (root significa admin)
Non restare sempre loggato come root. I permessi esistono per aiutarti e avvisarti. Se resti sempre root, nessuno ti impedisce di commettere pessimi errori

Una brutta pratica è di dare `rwx` a tutti
Veramente sbagliato
Ti semplifica temporaneamente il lavoro, ma un utente malintenzionato o sbadato causa problemi

`pwd` print working directory
`ls` list files
`cd` change directory

Di nuovo, l'utente Gianfranco sta in `/home/Gianfranco`, l'*utente root* sta in `/root`, la cartella `/` si chiama *root*, ma `/root` è un'altra cartella separata

`umask` permette di vedere e modificare i permessi di un file durante la creazione
`chmod` (change mode) dopo la creazione, lo fa il root e il proprietario
Non posso modificare i permessi degli altri, menomale (?)

La cosa peggiore che può accadere è che qualcuno riesca a ottenere root privilege su una macchina. È l'obiettivo maggiore di un hacker

`chmod <permessi> <nomefile>+`
Accetta una lista di file
I permessi si immettono simbolicamente o numericamente
Simbolico:
• Chi: User, Group, Other, All (default `a`)
• Cosa: `rwx` (`+` aggiungi, `-` rimuovi)
Esempio: `chmod uo+rw-x txt.txt img.jpg`

Altrimenti lo fai in binario a dire il vero
* `rw-r-x-wx`
* `110101011`
* $110$ $101$ $011$
* $6$ $5$ $3$
* `653`
Questa è la maschera ottale
Sempre in ordine `ugo`

Le directory sono trattate come file ma con una struttura i-node associata particolare. Ma tutto è un file in Linux
Permessi:
• `r`: visualizzare i contenuti
• `w`: aggiungere o togliere file
• `x`: accedere alla dir e ai contenuti
Non ho capito bene

Puoi cambiare l'owner e il gruppo
`chown` e `chgrp`
Se non sei root, deve essere il tuo gruppo. Il gruppo del file deve includere l'owner. Altrimenti causerebbe inconsistenze nel sistema di permessi

FAT non supporta questi permessi
operation not permitted

Ultima cosa
I link
Ci sono link fisici (hardlink) e simbolici
Abbiamo detto che ci sono file (`-`), directory (`d`), ma sono interessanti anche i link
Un file può avere più link fisici associati
Ogni nome di file è associato ad un i-node, una struttura dati che mantiene informazioni sul file
Possiamo creare nuovi nomi e nuove posizioni per lo stesso i-node
`ln <file> <link>`
Vedi le slide
Ma comunque lo stesso file fisico (nel disco) corrisponde a due cosi nel file system
Per rimuovere un file dal sistema, devi eliminare tutti i link fisici
Invece, i link simbolici come su Windows, se cancelli l'originale i link si rompono
Gli hardlink non esistono per le directory
(Romperebbe la logica del file system)
La struttura del file system è un albero, con hardlink a directory creeresti dei loop e non sarebbe un albero

Ecco i symlink
I link normali su Windows
Sono puntatori
`ln -d <file> <link>`
Quella è una L comunque
Il symlink ha pieni permessi
Il nome di un symlink include l'originale
Vedi le slide, c'è `-> ~/`
Ci sono poche differenze superficiali

`cat <file>` visualizza un file (i contenuti)


### Seconda lezione

Con il comando `cat` puoi vedere i contenuti di un file.
Con il comando `head` puoi vedere la prima riga dei dati in entrata.

Ci sono due modi per dare dati in entrata a un comando:
* La tastiera
* Il carattere `<`

L'output di un comando può essere salvato in un file di testo con il carattere `>`. Con `>` si sostituiscono i contenuti preesistenti del file, con `>>` l'output si aggiunge (append) alla fine del file. Questa si chiama *redirezione dell'output*.

Il comando `ls` ha un output testuale.
```
$ ls /home/user
  Dati Documenti Scrivania
```
Questo output si può mettere in un file
* Prima, viene creato il file
* Poi, si esegue il primo comando e si scrive nel file

Quindi il comando a sinistra del `>` viene chiamato dopo la creazione del file.
```
$ ls -C /home/user > output_data
$ cat output_data
  Dati Documenti Scrivania output_data
```

Se provo a visualizzare qualcosa che non esiste, mi dà errore. Posso redirigere l'output di errore con `2>`
```
  $ ls /home/user/nonesiste 2> error_data
  $ cat error_data
    ls: '/home/user/nonesiste': No such file or directory
```

Questi tre canali si chiamano *standard input*, *standard output* e *standard error*. Abbiamo rediretto lo stanrdard output e lo standard error in un file, ma come lo ridirigiamo nello standard input di un altro comando? Con le pipe: `|`.
```
$ ls ./ | more
```
Magari invece vuoi redirigere lo standard output non nello standard input ma in un'opzione. Questo non si può fare con le pipe, e richiede la *command substitution*:
```
$ echo "/home/Gabri/Desktop/Musica/" > musica.txt
$ cd 'cat musica.txt'
```
È facile confondere le pipe e la command substitution.

Le espressioni regolari (regex) possono essere molto utili. Permettono di cercare del testo tramite il pattern matching, cioè trovare segmenti di testo che hanno la stessa struttura. Così come ci sono molti linguaggi di programmazione, ci sono molti linguaggi per le regex. Ecco le basi:
Quale carattere:
* `.` Un carattere qualunque
* `^` L'inizio della stringa
* `$` La fine della stringa
* `\` Annulla gli effetti speciali del carattere che segue e lo fa trattare da carattere normale
* `[...]` Un carattere qualunque tra quelli dentro le parentesi
* `[^...]` Un carattere qualunque tranne quelli dentro le parentesi
* `[A-Z]` Un carattere qualunque con codice tra quello di A e quello di Z
* `[^A-Z]` Un carattere qualunque con codice non tra quello di A e quello di Z
Quanti caratteri:
* `?` Nessuno o uno
* `+` Uno o più
* `*` Zero o più
* `{n}` Esattamente $n$
* `{n,}` Minimo $n$
* `{,m}` Massimo $m$
* `{n,m}` Minimo $n$ e massimo $m$

Per usare le regex su Linux, si usa il comando `grep` (general regular expression print). Con le pipeline puoi mettere insieme le regex e gli altri comandi.
```
$ echo "la battaglia di magenta" | grep a
```
Vedi le #slide.

Se hai un file con varie righe, i cui contenuti magari sono organizzati in colonne, puoi ordinarli con il comando `sort`. L'opzione `-k` indica la colonna
```
$ cat file.txt
  Echo 3
  Alpha 1
  India 2
$ sort file.txt -k 0
  Alpha 1
  Echo 3
  India 2
$ sort file.txt -k 1
  Alpha 1
  India 2
  Echo 3
```

Quello usato finora è stato il linguaggio Bash, che si può usare anche per creare script. È un po' vecchio ma è noto e versatile.

Con il comando `tr` si può `tr`asformare il testo. Si danno due insiemi di caratteri e il primo viene sostituito col secondo in una stringa.
```
$ echo "test" | tr a-z A-Z
  TEST
$ cat file.txt | tr a-z A-Z > altroFile.txt
```
Il file di origine e quello di destinazione devono essere diversi, perché l'ordine è:
* Viene svuotato `altroFile.txt`
* `cat` legge `file.txt`
* Viene eseguito `tr`
* `>` scrive in `altroFile.txt`

Non confondere `cut` con `cat`.
C'è anche `uniq`

### Terza lezione

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