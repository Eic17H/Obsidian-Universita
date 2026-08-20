---
cssclasses:
  - so
---
Opzioni di ls:
• -a: tutti i file, nk ql nascosti (i file nascosti iniziano con .)
• -l: più informazioni sui file
• -i: particolare e complicato, ne parliamo più avanti
Queste lettere non sono del tutto a caso, sono un minimo intuitive. All, long, i-node.

ls -l ./
Che fa?
La nostra directory corrente è ./, quello è un argomento
Le opzioni cominciano di solito con - o con --
Quindi lista tutti i file lungamente nella directory corrente
Cosa ci restituisce?
Ci dice nome, ultima modifica, dimensione, e il numero di link fisici a quel file (non link simbolici)
Il primo carattere indica il tipo di file (file, directory, link, periferica, pipe, socket)
Ci dice i permessi di accesso, vedi le slide. Proprietario del file e gruppo proprietario
Tornando ai permessi, sono 9 caratteri
• Relativi al proprietario di cui sopra
• Relativi al gruppo di cui sopra
• Relativi agli altri utenti
Quindi c'è read, write, x per ciascuno
X significa esecuzione
rwx è tutti e tre, --- è nessuno
L'utente root ha sempre rwx

Ricorda: $utente #root (root significa admin)
Non restare sempre loggato come root. I permessi esistono per aiutarti e avvisarti. Se resti sempre root, nessuno ti impedisce di commettere pessimi errori

Una brutta pratica è di dare rwx a tutti
Veramente sbagliato
Ti semplifica temporaneamente il lavoro, ma un utente malintenzionato o sbadato causa problemi

pwd print working directory
ls list files
cd change directory

Di nuovo, l'utente Gianfranco sta in "/home/Gianfranco", l'utente root sta in "/root", la cartella "/" si chiama root, ma "/root" è un'altra cartella separata

umask permette di vedere e modificare i permessi di un file durante la creazione
chmod (change mode) dopo la creazione, lo fa il root e il proprietario
Non posso modificare i permessi degli altri, menomale (?)

La cosa peggiore che può accadere è che qualcuno riesca a ottenere root privilege su una macchina. È l'obiettivo maggiore di un hacker

chmod <permessi> <nomefile>+
Accetta una lista di file
I permessi si immettono simbolicamente o numericamente
Simbolico:
• Chi: User, Group, Other, All (default a)
• Cosa: rwx (+ aggiungi, - rimuovi)
Esempio: chmod uo+rw-x txt.txt img.jpg

Altrimenti lo fai in binario a dire il vero
rw-r-x-wx
110101011
110 101 011
6 5 3
653
Questa è la maschera ottale
Sempre in ordine ugo

Le directory sono trattate come file ma con una struttura i-node associata particolare. Ma tutto è un file in Linux
Permessi:
• r: visualizzare i contenuti
• w: aggiungere o togliere file
• x: accedere alla dir e ai contenuti
Non ho capito bene

Puoi cambiare l'owner e il gruppo
chown e chgrp
Se non sei root, deve essere il tuo gruppo. Il gruppo del file deve includere l'owner. Altrimenti causerebbe inconsistenze nel sistema di permessi

FAT non supporta questi permessi
operation not permitted

Ultima cosa
I link
Ci sono link fisici (hardlink) e simbolici
Abbiamo detto che ci sono file (-), directory (d), ma sono interessanti anche i link
Un file può avere più link fisici associati
Ogni nome di file è associato ad un i-node, una struttura dati che mantiene informazioni sul file
Possiamo creare nuovi nomi e nuove posizioni per lo stesso i-node
ln <file> <link>
Vedi le slide
Ma comunque lo stesso file fisico (nel disco) corrisponde a due cosi nel file system
Per rimuovere un file dal sistema, devi eliminare tutti i link fisici
Invece, i link simbolici come su Windows, se cancelli l'originale i link si rompono
Gli hardlink non esistono per le dir
(Romperebbe la logica del file system)
La struttura del file system è un albero, con hardlink a directory creeresti dei loop e non sarebbe un albero

Ecco i symlink
I link normali su Windows
Sono puntatori
ln -d <file> <link>
Quella è una L comunque
Il symlink ha pieni permessi
Il nome di un symlink include l'originale
Vedi le slide, c'è -> ~/
Ci sono poche differenze superficiali

cat <file> visualizza un file (i contenuti)