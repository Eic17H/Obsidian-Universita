### Argomenti
* Faremo il primo progetto in VSCode
* Cose semplici in HTML
    * Titoli
    * Sottotitoli
    * Liste
    * Struttura base head/body
    * Pochi tag per cose basilari (titoli, paragrafi, link)

Vedremo che si può realizzare un'applicazione web senza un framework specifico oggi.
Domani pomeriggio teoria framework.
Seguite tutte le lezioni avremo la struttura di un progetto completo molto simile a quello finale. Alcuni pezzi saranno online ma metterli insieme sarà più difficile.

## Progetto Cineva

Il nostro progetto si chiama Cineva, creiamo una cartella che si chiama `Cineva` (*cinema evaluation*).
* Creiamo il file `index.html`
* Andiamo su estensioni e cerchiamo *Live Preview*

### Aggiungiamo le prime componenti

* `<!DOCTYPE html>` dice che è un file html, di default l'ultima versione cioè 5
* `<html>` contiene l'effettivo codice html
    * È diviso in `<head>` e `<body>`
        * Head: informazioni di base: titolo, autore etc; più avanti anche link esterni
        * Body: contenuto

Dentro `<head>`, `<title>` indica il titolo, `<meta>` i metadati, insomma cose che servono ai motori di ricerca.

Dentro `<meta>`, specifichiamo il tipo di metadato, con gli attributi del tag
* Struttura: `<tag attributi attributi>contenuti</tag>`
* Nel caso di `<meta>`, un attributo è il nome del metadato, e l'altro è il contenuto del metadato
* Alcuni tag sono autochiudenti e quindi si fa `<tag attributi attributi/>`

In alto a destra, VSCode con l'estensione ha un'icona con una lente d'ingrandimento, per aprire la pagina. Adesso è vuota perché il body è vuoto.

Ora il `<body>`, che contiene le cose visibili all'utente.
* Per testo grande (un titolo visibile), si mette il tag `<h_></h_>` (*heading*), dove `_` è un numero. Numero piccolo -> testo grande. Da 1 a 6.
* Per inserire testo normale, usiamo `<p>` (*paragraph*).

Il tag `<h>` mette anche il grassetto in automatico. Per la formattazione dentro `<p></p>`:
* <b>grassetto</b>, *bold*, `<b></b>`
* <i>corsivo</i>, *italic*, `<i></i>`
* <u>sottolineato</u>, *underlined*, `<u></u>`

## Esercizio 1 - index.html
Per fare una linea orizzontale si usa `<hr/>`, *horizontal*.

## Esercizio 2 - about.html

Ora abbiamo due pagine, ma come ci muoviamo tra una e l'altra?

* Usiamo il tag `<a></a>` (*anchor*), che serve per link e altre cose.
* Mettiamolo su `about.html`
* Senza l'attributo `href` è come un `<p>`. `href` specifica la destinazione

Ora se lo clicchi funziona

Il tag `<a>` si può mettere anche dentro altri tag, così come `<i>`, `<b>` e `<u>`. Mettiamolo dentro un `<p>` in `index.html`.

## Esercizio 3 - contatti.html

* Se se metti più `<p>` di fila, ti mette andate a capo alte in mezzo.
* Per mettere delle andate a capo più piccole, metti tutto nello stesso `<p>` e usi `<br>` per andare a capo. `<br>` è un altro autochiudente, nota come non serve davvero scrivere `<br/>`.

## Ultimo esercizio guidato

Prototipo, versione rudimentale, di una navbar (barra di navigazione).

Introduciamo le liste.

* Andiamo su index.html e sotto il sottotitolo aggiungiamo una lista
    * Due tag possibili, una coi puntini e una coi numeri
        * `<ul>`, unordered list, a puntini
            * Con dentro `<li>`, list item
        * `<ol>`, ordered list, a numeri
*Nota come per usare un tag `<a>` devi metterci DENTRO del testo, altrimenti non compare
    * Per capirci, `<a href="ilmiosito.web">qua dentro</a>`
* Per correttezza specifichiamo che una navbar va sempre dentro un tag `<nav></nav>`
    * Visivamente è uguale ma per correttezza si fa