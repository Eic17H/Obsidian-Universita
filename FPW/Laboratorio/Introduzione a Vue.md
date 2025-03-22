## Installazione

Installiamo tutti node.js, fondamentale per Vue.

Apri il prompt dei comandi
* `winget install Schniz.fnm`
* Chiudi e riapri
* `fnm install 22`
* Riavvia il computer
* `node -v`
* `npm -v`

Se ti dà le versioni v22.14.0 e 10.9.2 ha funzionato. Altrimenti prova https://nodejs.org/en/download.

## Estensioni di VSCode

* quick-lint-js
* Typos spell checker
* Vue - Official

Il tasto delle estensioni è a sinistra, ha quattro quadrati.

## Usare Vue

* Creiamo una nuova cartella per il progetto
    * Chiamiamola CineVUE
* Tramite il terminale, entriamo dentro quella cartella, e facciamo `npm create vue@latest`
* TypeScript no
* Router sì
* Pinia no
* Prettier come vuoi
* Gli altri no

Se non hai i permessi di eseguire script, prova come amministratore. Segui le istruzioni a schermo, che dovrebbero essere:

* `cd CineVUE`
* `npm install`
* `npm run format`
* `npm run dev`

Ci dà un url, http://localhost:5173/, che ci porta a una demo di Vue.

Nella cartella adesso c'è la cartella `src`.

* `asset`: Contiene cose statiche: css, immagini, font, eccetera, se li vogliamo aggiungere li mettiamo lì.

* `components`: In Vue, tutto (pagina web, qualsiasi cosa) è un componente. Ci sono componenti utilizzabili dentro le pagine, e componenti che sono pagine. La struttura di questi file .vue che ci sono dentro si chiama Single File Component: `<script>` (js), `<template>` (html) e `<style>` (css). Non è necessario che ci siano tutte e tre le sezioni: magari una pagina è tutta statica e non ha JS. Il `<template>` è obbligatorio, anche se vuoto.

* `router`: File `index.js`, che gestisce il routing del nostro sito. Cioè? Ha una funzione simile alla navbar della scorsa lezione. Il metodo di `<a href="...">` non funziona con Vue, questi percorsi vanno definiti nel router.

* `stores`: Lasciamo perdere adesso.

* `views`: Importantissimo. Come detto, Vue è diviso in componenti. Ci sono componenti appunto non riutilizzabili perché sono vere e proprie pagine (non useremo `about` per fare `contatti` perché sono separati). In uno dei file vediamo che ci sono `<script>` e `<template>`. Vediamo che sta importando il componente `TheWelcome`. Sta mettendo appunto i contenuti di `TheWelcome.vue` su `HomeView.vue`. Se modifichiamo `TheWelcome.vue` vediamo che cambia la pagina HomeView. Volendo potrei mettere due componenti `TheWelcome` in `HomeView`: utile se, come l'altra volta, vuoi mettere per esempio più commenti con la stessa struttura.

* `App.vue`: Contiene tutto il nostro sito. Le fondamenta, il *core*. Quella cosa a sinistra della pagina predefinita è praticamente una navbar, no? Questa cosa di solito sta nell'header del sito, qui lo mettiamo in `App.vue`.

Vue include React, quindi passare da Vue a React è relativamente facile.

Fuori da `src/` ma dentro `CineVUE/`, c'è `index.html`. Ci mettiamo i metadati essenzialmente, anziché metterli in ciascuna pagina separatamente, perché nei file Vue non c'è l'head.
I file `.json` a cosa servono? Poco e niente. Contengono una lista di pacchetti, librerie, dipendenze e altre informazioni sul nostro progetto. `package-lock.json` non va modificato.

`vite.config.js`: Vite sta alla base di Vue, non ci interessa particolarmente.

Se anziché file `.js` hai file `.ts`, hai messo TypeScript. In tal caso, cancella tutto e ricomincia. TypeScript sarà anche bello perché evita alcuni errori, ma in questo corso usiamo JavaScript puro.

## Il progetto

Proviamo a ricreare la pagina della scorsa lezione. Facciamo i file `ContactView.vue`, `WhoView.vue`, `NewsView.vue` (nominiamoli con lo stesso pattern di quelli che ci sono già per essere ordinati).

Adesso prendiamo il `<body>` del vecchio `index.html` e lo mettiamo nel `<template>` di `HomeView.vue`. Deve esserci uno e un solo tag `<body>`. Facciamo la stessa cosa con le altre pagine. `<main>` lascialo se lo vuoi, il `<body>` in caso va lì dentro.

Per adesso, il contenuto delle pagine rimane adatto al modo in cui funziona HTML+CSS puro, quindi senza View. Inoltre, è rimasta la roba di fianco di Vue, che non è nostra. Cancelliamo la `<header>` da `App.vue`. Cancelliamo anche il CSS da `assets`: cancelliamo tutto da `main.css` e da `base.css`. Vediamo che il nostro sito è tanto privo di stile quanto lo era prima.

I nostri link appunto non funzionano. Dobbiamo modificare `index.js`.
* `import HomeView from '../views/HomeView.vue'`: c'è già. Aggiungiamo gli altri.
* `@` è un alias per la root del nostro progetto.
* Definiamo le routes. Due sono già definite. Una usa `=>`, una arrow function, anziché `import` in alto, che possiamo usare ma non è necessario. Va bene usare copilot per fare questa cosa tediosa di scrivere la stessa cosa 50 volte. (In realtà `import` non mi funziona quindi uso `=>`).
* Abbiamo aggiornato il router per dare percorsi alle pagine, adesso dobbiamo dare questi indirizzi alla navbar dentro le pagine. Sarebbe meglio se fossero del tipo `<RouterLink to="/">Home</RouterLink>`, per utilizzare le componenti proprie di Vue.

## Inserire un'immagine

Scarichiamo il file `logo.png`. Lo mettiamo, appunto, nella cartella `assets/png/`.

Per inserire un'immagine, usiamo il tag `<img src="../assets/png/logo.png" alt="Logo di Cineva" width="200">`:
* `src`: Da dove prende l'immagine
* `alt`: Cosa scrivere se non riesce a caricare l'immagine, e cosa leggeranno TTS per ciechi
* `height` e `width`: ne specifichiamo una sola, l'altra la capisce da solo

Abbiamo aggiunto il logo. Di solito, premendo sul logo del sito si torna alla home. Non possiamo mettere un'`<img>` dentro un `<RouterLink>`, dobbiamo usare `<a>`. (In realtà possiamo adesso ma ci dà problemi con siti più dinamici).

## Usare i componenti

Sicuramente in tutte le pagine avremo il logo, il titolo, e la navbar, quindi dovremo sicuramente riciclare queste tre cose. Per correttezza, normalmente, la navbar è un componente a sé, che non fa parte dell'header ma viene richiamata in essa.

* Creiamo `components/Navbar.vue`. Dentro ci mettiamo appunto la navbar dalla home. Stiamo usando dei `<RouterLink>`, quindi se non `import`iamo `{ RouterLink, RouterView } from 'vue-router'`, esplode.

* Adesso importiamo Navbar nella HomeView: `import Navbar from '../components/Navbar.vue'`. Per usarlo, `<Navbar/>`.

* Facciamo la stessa cosa con Header. Anzi importiamo Navbar in Header e mettiamo la navbar dentro l'header.

* Mettiamo l'Header in tutte le pagine. Adesso se lo modifichiamo nel suo file, le modifiche si applicano in tutte le viste (*View*).

Adesso, ha senso dover importare tutto in ogni pagina? No, il senso è che lo facciamo una volta e abbiamo finito. Li importiamo dentro `App.vue`. Adesso nei file in questa cartella non l'ho fatto, perché ho già chiuso l'host locale, ma insomma si fa così.

Ci sono esercizi da fare.