## Permessi

Con il comando `ls` del terminale, possiamo visualizzare la lista dei file in una directory. Ha tre opzioni:
• `-a`: Tutti i file, anche quelli nascosti (i file nascosti iniziano con `.`).
• `-l`: Più informazioni sui file: nome, ultima modifica, dimensione, numero di link fisici.
• `-i`: Particolare e complicato, ne parliamo più avanti.
Queste lettere non sono del tutto a caso, sono un minimo intuitive. All, long, i-node.

Il primo carattere indica il tipo di file (file, directory, link, periferica, pipe, socket)
Ci dice i permessi di accesso, vedi le slide. Proprietario del file e gruppo proprietario
Tornando ai permessi, sono 9 caratteri:
* Relativi al proprietario di cui sopra
* Relativi al gruppo di cui sopra
* Relativi agli altri utenti

Quindi c'è read, write, x per ciascuno.
X significa esecuzione, execute.
`rwx` è tutti e tre, `---` è nessuno.
L'utente root ha sempre `rwx`.

Una brutta pratica è di dare `rwx` a tutti.
Veramente sbagliato.
Ti semplifica temporaneamente il lavoro, ma un utente malintenzionato o sbadato causa problemi.

L'utente Gianfranco sta in `/home/Gianfranco`, l'*utente root* sta in `/root`, la cartella `/` si chiama *root*, ma `/root` è un'altra cartella separata.

Le directory sono trattate come file ma con una struttura i-node associata particolare. Ma tutto è un file in Linux
Permessi:
• `r`: Visualizzare i contenuti.
• `w`: Aggiungere o togliere file.
• `x`: Accedere alla directory e ai contenuti.

FAT non supporta questi permessi: operation not permitted.

## Link

Ci sono link fisici (hardlink) e simbolici.
Abbiamo detto che ci sono file (`-`), directory (`d`), ma sono interessanti anche i link.
Un file può avere più link fisici associati.
Ogni nome di file è associato ad un i-node, una struttura dati che mantiene informazioni sul file
Possiamo creare nuovi nomi e nuove posizioni per lo stesso i-node.
`ln <file> <link>`
Ma comunque lo stesso file fisico (nel disco) corrisponde a due *cosi* nel file system.
Per rimuovere un file dal sistema, devi eliminare tutti i link fisici.
Invece, i link simbolici come su Windows, se cancelli l'originale i link si rompono.
Gli hardlink non esistono per le directory: romperebbe la logica del file system.
La struttura del file system è un albero, con hardlink a directory creeresti dei loop e non sarebbe un albero.
Ecco che entrano in gioco i symlink, cioè i link normali su Windows.
Sono puntatori.
`ln -d <file> <link>`