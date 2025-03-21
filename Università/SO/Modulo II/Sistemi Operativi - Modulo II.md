# Concetti base:
#comandi 
`man` - Apri il manuale di un comando.
`help` - Visualizza tutti i comandi disponibili.
`whatis` - Sapere in breve cosa fa un comando.
`apropos` - Se non ricordi bene il nome di un comando.
`pwd` - Stampa la cartella di lavoro.
`ls` - Stampa la lista dei file nella cartella selezionata.
`cd` - Spostati in un'altra cartella.
`umask` - Vedi e modifica i permessi di un file durante la creazione.
`chmod` - Cambia i permessi di un file, se sei proprietario o root.
`cat` - Stampa i contenuti di un file.
`touch` - Crea un file o cambiane l'ultima data di modifica.
`mkdir` - Crea una directory.
`mv` - Sposta o rinomina.
`cp` - Copia e/o rinomina.
`rm` - Rimuovi un file.
`rmdir` - Rimuovi una directory vuota.
`strings` - Visualizza stringhe di testo in un file binario.
`less` - Visualizza un file di testo pagina per pagina.
`more` - Come `less`, ma con meno funzioni (sometimes, `less` is more).
`head`/`tail` - Stampa l'inizio/la fine di un file di testo.
`file` - Analizza e mostra il tipo di un file.
`echo` - Stampa quello che gli scrivi dopo.
`tar` - Comprime e archivia file.
`find` - Cerca un file in una directory e nelle sottodirectory.
`history` - Visualizza l’elenco di tutti i comandi eseguiti.
`mount` - Monta un dispositivo come directory.
`alias` - Crea essenzialmente delle macro per il terminale.
`unalias` - Annulla un `alias`.
#directory
`/bin` - Per i programmi fondamentali del sistema, usabili da tutti gli utenti ordinari.
`/boot` - Con i file essenziali per l’avvio del sistema, come l’immagine del kernel.
`/cdrom` - Per accedere ai CD, ma il device (file in /dev) deve essere prima “montato”.
`/dev` - Contiene i file che identificano i vari device.
`/etc` - Riporta i file di configurazione dei programmi installati nel sistema.
`/home` - Contiene le directory base degli utenti ordinari del sistema.
`/root` - È la directory home dell’amministratore di sistema.
`/lib` - Contiene le librerie del sistema come libc.
`/usr/lib` - Contiene invece le altre librerie dei programmi.
`/proc` - Memorizza le informazioni prese in real-time dal sistema stesso.
`/sbin` - Con gli eseguibili che possono essere lanciati solamente dall’utente root.
`/tmp` - Luogo dei file temporanei e può, di norma, essere scritta da tutti gli utenti.
`/usr` - Per la documentazione, gli eseguibili, librerie e molto altro.
`/var` - Per file variabili, come file di spool (stampa, email, ecc.), i PID dei processi, etc.
#variabili
`GROUPS` - Un array contenente i numeri GID di cui l'utente è membro.
`HOSTTYPE` -  Il nome del tipo di computer.
`OSTYPE` -  Il nome del sistema operativo.
`MACHTYPE` -  Architettura e sistema operativo utilizzato.
`BASH_VERSION` -  Il numero di versione di bash.
`BASH` -  Il percorso completo della copia corrente di bash.
`PPID` -  Il PID del processo genitore della shell attuale.
`UID` -  User ID dell’utente corrente.
`PATH` -  I percorsi di ricerca per i comandi.
`HOME` -  La directory home dell'utente.
`CDPATH` -  Il percorso di ricerca per il comando `cd`.
`PS1` -  Il prompt primario.
`PS2` -  Il prompt secondario.
#scorciatoie
`~` - La tua home.
`/` - La root.
`.` - La cartella corrente.
`..` - La cartella che contiene quella corrente.
`!!` - Riesegue l'ultimo comando appena eseguito
`!n` - Riesegue l'n-esimo comando presente nella cronologia.
`!stringa` - Riesegue l'ultimo comando che inizia con i caratteri indicati in ‘stringa’.
`!stringa:p` - Visualizza l'ultimo comando che inizia con i caratteri indicati in ‘stringa’.
`!?comando?` - Ricerca il comando specificato tra punti interrogativi.
`fc n` - Permette di modificare l’ n-esimo comando con l'editor
predefinito.
`fc -e 'nome' n` - Permette di modificare l’ n-esimo comando con l'editor
specificato.
`^comando1^comando2` - Riesegue l'ultimo comando eseguito che contiene la parola
`comando1` sostituendola con `comando2`.
`tasto TAB` - Autocompleta il nome di un file o di un comando.
`AltGr + ì` - Permette di inserire un simbolo tilde ( ~ ).
`AltGr + ‘` - Permette di inserire un backtick (  \` ).
`*` - Una qualunque stringa.
`?` - Un qualunque carattere.
# 30 Settembre 2024

Ci saranno due parziali: uno a novembre e uno intorno alle vacanze di Natale.
Per gli appelli, si può scegliere se dare teoria, lab o entrambi.
C'è prima quello di teoria, e poco dopo quello di lab. Dopo, si presenta il progetto.
Il voto degli appelli si conserva fino a settembre, e il progetto non scade mai.
Le specifiche del progetto saranno comunicate verso la fine del corso.
Il progetto si discute a un appello, se è fatto correttamente.
Il progetto si può fare in coppie. Vale a dire, è sconsigliato farlo da soli.

Il progetto sarà in C, e avrà una versione multithread e una versione multiprocesso.
Questo corso continua da ARE, e sono importanti PR1 e ASD.

Il #progetto o passa o non passa. Il punteggio è fisso ma dipende dal tempo.
Ci sono punti bonus per progetti eccezionalmente meritevoli.
Puoi sempre prendere 30, ma se lo consegni presto puoi prendere anche 36.
Comunque se vai male ai parziali i bonus ti possono salvare.
Altri dettagli in futuro.

## Prima parte della lezione

Introduzione al vero argomento del corso.
Useremo <span class="blue">Linux</span>. Macchina virtuale.
Nel modulo di laboratorio vedremo:
         <span class="blue">Elaboratori</span>: quanto visto in ARE
             Non basta, vogliamo tanti processi insieme;
         <span class="blue">Processi</span>, che comunicano con l'hardware tramite il sistema operativo
             Il SO gestisce tutto questo;
         <span class="blue">Linux</span>, shell, software open source, amministrazione di sistema e di rete
             Studiamo Linux perché nel backend si usa spesso Linux;
         <span class="blue">Programmazione di sistema</span>, multiprocesso, interprocess communication.
             Chiamate di sistema (creare thread eccetera).

Il software developer non è l'unica opzione lavorativa.
Otterremo abilità per gli altri lavori, come <span class="yellow">amministratore dei sistemi di rete</span>.
L'<span class="yellow">A.S.R.</span> ha a che fare con le ops, gestisce il deployment per adattarsi agli utenti, cloud eccetera.
"Devops" lavoro molto importante.
All'inizio odieremo imparare a usare la linea di comando.
Ogni object che si muove sullo schermo è un processo, e i processi comunicano con le pipe.
La seconda versione del progetto è un processo singolo, in cui ogni object è un thread.

## CENNI STORICI

Pensando a Linux, si pensa a #Unix, sviluppato alla Bell così come il C.
All'inizio non c'erano OS, c'erano grosse macchine che eseguivano un programma alla volta.
Poi hanno fatto i primi OS, scritti in assembly, quindi un OS per macchina.
Anni '60, primo sistema operativo in HLL (C), essendo in HLL si può portare su altre macchine.
     High level language - astrazione.
Il C fu creato per fare un OS in modo astratto, così si può usare su più macchine diverse.
Per fare un OS, il C doveva toccare la memoria. Molto pericoloso (vedi segfault e simili).
	In PR2, che fa OOP con Java, non devi toccare la memoria a mano, fa tutto lui e tu non sbagli.
	In computer graphics, si usa C per essere molto efficienti.
Unix era FOSS, quindi si è diffuso molto, soprattutto tra accademici e sviluppatori.
Si continuò a contribuire in maniera collaborativa e aperta.
Poi il C era facile da imparare.

Tantissime branch di Unix. Qual è il vero Unix?
Molti tentativi per standardizzarlo.
L'IBM aveva AiX, Sun aveva Solaris, insomma c'erano molte versioni di Unix.
Bell claimò copyright (vedi Diritto), morirono le altre branch. Però tutt'ora MacOS è Unix.
Free Software Foundation, Richard Stallman, GNU.
GNU: Gnu's Not Unix. Ispirato a Unix ma non davvero Unix, software davvero libero.
Nascono poi vari programmi importanti molto diffusi anche fuori Linux, e molto importanti tutt'ora:
- <span class="blue">gcc</span> - gnu C compiler
- <span class="blue">LaTeX</span> - formattazione
- <span class="blue">Emacs</span> - ambiente di sviluppo
- <span class="blue">Grub</span> - ne parleremo dopo
Mancava un kernel efficiente. Il kernel è molto fondamentale.
Prof. Tanenbaum creò MINIX (Mini Unix), ispirato a Unix ma nuovo e piccolo.
     Tutto il codice sorgente è in un libro.
Linus Torvalds creò Linux. Era uno studente di Tanenbaum.
Torvalds ha creato Linux come hobby, ha risolto i problemi della gestione dei processi (kernel).
L'ottimo kernel di Linux si unì al sistema operativo di GNU. I due si complementano.
Il Linux moderno è GNU-Linux. Kernel Linux e applicativi GNU.
C'è un diagramma nelle #slide.

## VM o dual boot
Dual boot: bootloader, partizione, grub, più SO sulla stessa macchina.
Mount point, nel caso di Linux è la root, "/".
La swap partition è un meccanismo dei SO per mettere la RAM su disco.
     Windows usa un file, Linux di solito usa una partizione.
Si può cifrare una partizione.
Se cifri la partizione, la chiave sta in RAM, poi nella swap, e ci rimane, quindi cifra anche la swap.
LVM: crea partizioni astratte ma concretamente distribuite su più dischi.
RAID: distribuire i dati su più dischi, duplicati, così se perdi uno hai gli altri.
Il corso consiglia di usare una VM anziché il dual boot.
Creeremo un gioco.
Importante avere la stessa versione di Linux, stiamo facendo cose a basso livello.
Ci sono due tipi di VM.
- Tipo 1: comunicazione diretta con l'HW, efficiente.
- Tipo 2: useremo questa, VirtualBox e simili, VM comunica col SO, più facile da usare.
Useremo Ubuntu 22.04.3 x64 su Oracle VM VirtualBox 7.0.10.

# 7 Ottobre 2024

Alcuni comandi del terminale hanno argomenti e opzioni
Opzioni di `ls`:
- `-a`: tutti i file, anche quelli nascosti (i file nascosti iniziano con `.`);
- `-l`: più informazioni sui file;
- `-i`: particolare e complicato, ne parliamo più avanti.
Queste lettere non sono del tutto a caso, sono un minimo intuitive. `All`, `long`, `i-node`.

`ls -l ./`
Che fa?
La nostra directory corrente è `./`, quello è un argomento.
Le opzioni cominciano di solito con `-` o con `--`.
Quindi lista tutti i file lungamente nella directory corrente.
Cosa ci restituisce?
Ci dice nome, ultima modifica, dimensione, e il numero di link fisici a quel file (non link simbolici).
Il primo carattere indica il tipo di file (file, directory, link, periferica, pipe, socket).
Ci dice i permessi di accesso, vedi le slide. Proprietario del file e gruppo proprietario.
Tornando ai permessi, sono 9 caratteri.
- Relativi al proprietario di cui sopra;
- Relativi al gruppo di cui sopra;
- Relativi agli altri utenti.
Quindi c'è read, write, execute per ciascuno.
`rwx` è tutti e tre, `---` è nessuno. L'utente root ha sempre `rwx`.

Ricorda: `$` significa utente e `#` significa root (root significa admin).
Non restare sempre loggato come root. I permessi esistono per aiutarti e avvisarti.
Se resti sempre root, nessuno ti impedisce di <span class="red">commettere pessimi errori</span>.
Una brutta pratica è di dare `rwx` a tutti. Veramente sbagliato.
Ti semplifica temporaneamente il lavoro, ma un utente malintenzionato o sbadato causa problemi.
La cosa peggiore che può accadere è che qualcuno riesca a ottenere root privilege su una macchina. È l'obiettivo maggiore di un hacker.

Alcuni altri #comandi:
`pwd` - print working directory;
`ls` - list files;
`cd` - change directory.
`umask` - permette di vedere e modificare i permessi di un file durante la creazione.
`chmod` - (change mode) dopo la creazione, lo fa il root e il proprietario.
`cat` - visualizza un file (i contenuti).

#permessi
`chmod <permessi> <nomefile>+`
Accetta una lista di file. I permessi si immettono simbolicamente o numericamente.
Simbolico:
- Chi: User, Group, Other, All (default a)
- Cosa: `rwx` (+ aggiungi, - rimuovi)
Esempio: `chmod uo+rw-x txt.txt img.jpg`
Altrimenti lo fai in binario a dire il vero
`rw-r-x-wx`
`110101011`
`110 101 011`
`6 5 3`
`653`
Questa è la maschera ottale. Sempre in ordine UGO.
Le directory sono trattate come file ma con una struttura i-node associata particolare.
Ma tutto è un file in Linux.
Permessi:
- r: visualizzare i contenuti;
- w: aggiungere o togliere file;
- x: accedere alla dir e ai contenuti.
Puoi cambiare l'owner e il gruppo con `chown` e `chgrp`.
Se non sei root, deve essere il tuo gruppo. Il gruppo del file deve includere l'owner. Altrimenti causerebbe inconsistenze nel sistema di permessi
FAT non supporta questi permessi: `operation not permitted`.

L'utente Gianfranco sta in `/home/Gianfranco`. L'utente root sta in `/root`.
La cartella `/` si chiama root, ma `/root` è un'altra cartella separata.

## I link
Ci sono #link fisici (hardlink) e simbolici.
Abbiamo detto che ci sono file (`-`), directory (`d`), ma sono interessanti anche i link.
Un file può avere più link fisici associati.
Ogni nome di file è associato ad un i-node, una struttura dati che mantiene informazioni sul file.
Possiamo creare nuovi nomi e nuove posizioni per lo stesso i-node.
`ln <file> <link>`. Quella è una L minuscola.
In breve lo stesso file fisico (nel disco) corrisponde a due entità nel file system.
Per rimuovere un file dal sistema, devi eliminare tutti i link fisici.
Invece, i link simbolici come su Windows, se cancelli l'originale i link si rompono.
Gli hardlink non esistono per le directory. (Romperebbe la logica del file system).
Il file system è un albero, con hardlink a directory creeresti dei loop e non sarebbe un albero.
Ecco i symlink: i link normali su Windows. Sono puntatori.
`ln -d <file> <link>`
Ci sono poche differenze superficiali.
