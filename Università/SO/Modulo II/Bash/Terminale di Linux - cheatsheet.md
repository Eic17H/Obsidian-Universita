* `man` - Apri il manuale di un comando.
* `help` - Visualizza tutti i comandi disponibili.
* `whatis` - Sapere in breve cosa fa un comando.
* `apropos` - Se non ricordi bene il nome di un comando.
* `pwd` - Stampa la cartella di lavoro.
* `ls` - Stampa la lista dei file nella cartella selezionata.
* `cd` - Spostati in un'altra cartella.
* `umask` - Vedi e modifica i permessi di un file durante la creazione.
* `chmod` - Cambia i permessi di un file, se sei proprietario o root.
* `cat` - Stampa i contenuti di un file.
* `touch` - Crea un file o cambiane l'ultima data di modifica.
* `mkdir` - Crea una directory.
* `mv` - Sposta o rinomina.
* `cp` - Copia e/o rinomina.
* `rm` - Rimuovi un file.
* `rmdir` - Rimuovi una directory vuota.
* `strings` - Visualizza stringhe di testo in un file binario.
* `less` - Visualizza un file di testo pagina per pagina.
* `more` - Come `less`, ma con meno funzioni (sometimes, `less` is more).
* `head`/`tail` - Stampa l'inizio/la fine di un file di testo.
* `file` - Analizza e mostra il tipo di un file.
* `echo` - Stampa quello che gli scrivi dopo.
* `tar` - Comprime e archivia file.
* `find` - Cerca un file in una directory e nelle sottodirectory.
* `history` - Visualizza l’elenco di tutti i comandi eseguiti.
* `mount` - Monta un dispositivo come directory.
* `alias` - Crea essenzialmente delle macro per il terminale.
* `unalias` - Annulla un `alias`.
* #directory
* `/bin` - Per i programmi fondamentali del sistema, usabili da tutti gli utenti ordinari.
* `/boot` - Con i file essenziali per l’avvio del sistema, come l’immagine del kernel.
* `/cdrom` - Per accedere ai CD, ma il device (file in /dev) deve essere prima “montato”.
* `/dev` - Contiene i file che identificano i vari device.
* `/etc` - Riporta i file di configurazione dei programmi installati nel sistema.
* `/home` - Contiene le directory base degli utenti ordinari del sistema.
* `/root` - È la directory home dell’amministratore di sistema.
* `/lib` - Contiene le librerie del sistema come libc.
* `/usr/lib` - Contiene invece le altre librerie dei programmi.
* `/proc` - Memorizza le informazioni prese in real-time dal sistema stesso.
* `/sbin` - Con gli eseguibili che possono essere lanciati solamente dall’utente root.
* `/tmp` - Luogo dei file temporanei e può, di norma, essere scritta da tutti gli utenti.
* `/usr` - Per la documentazione, gli eseguibili, librerie e molto altro.
* `/var` - Per file variabili, come file di spool (stampa, email, ecc.), i PID dei processi, etc.
* #variabili
* `GROUPS` - Un array contenente i numeri GID di cui l'utente è membro.
* `HOSTTYPE` -  Il nome del tipo di computer.
* `OSTYPE` -  Il nome del sistema operativo.
* `MACHTYPE` -  Architettura e sistema operativo utilizzato.
* `BASH_VERSION` -  Il numero di versione di bash.
* `BASH` -  Il percorso completo della copia corrente di bash.
* `PPID` -  Il PID del processo genitore della shell attuale.
* `UID` -  User ID dell’utente corrente.
* `PATH` -  I percorsi di ricerca per i comandi.
* `HOME` -  La directory home dell'utente.
* `CDPATH` -  Il percorso di ricerca per il comando `cd`.
* `PS1` -  Il prompt primario.
* `PS2` -  Il prompt secondario.
* #scorciatoie
* `~` - La tua home.
* `/` - La root.
* `.` - La cartella corrente.
* `..` - La cartella che contiene quella corrente.
* `!!` - Riesegue l'ultimo comando appena eseguito
* `!n` - Riesegue l'n-esimo comando presente nella cronologia.
* `!stringa` - Riesegue l'ultimo comando che inizia con i caratteri indicati in ‘stringa’.
* `!stringa:p` - Visualizza l'ultimo comando che inizia con i caratteri indicati in ‘stringa’.
* `!?comando?` - Ricerca il comando specificato tra punti interrogativi.
* `fc n` - Permette di modificare l’ n-esimo comando con l'editor
* predefinito.
* `fc -e 'nome' n` - Permette di modificare l’ n-esimo comando con l'editor
* specificato.
* `^comando1^comando2` - Riesegue l'ultimo comando eseguito che contiene la parola
* `comando1` sostituendola con `comando2`.
* `tasto TAB` - Autocompleta il nome di un file o di un comando.
* `AltGr + ì` - Permette di inserire un simbolo tilde ( ~ ).
* `AltGr + ‘` - Permette di inserire un backtick (  \` ).
* `*` - Una qualunque stringa.
* `?` - Un qualunque carattere.