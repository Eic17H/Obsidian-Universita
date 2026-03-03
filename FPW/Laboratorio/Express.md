Ebbene sì, oggi creiamo un server che collegheremo al sito e al database che abbiamo fatto nelle lezioni precedenti.

## Installazione dei tool

Vedremo un tool chiamato [*Postman*](https://www.postman.com/downloads/), che ci farà vedere come funzionano le chiamate al server e al database, vedremo come utilizzare Express nel nostro server, vedremo Nodemon per tenere il server sempre attivo anche dopo i crash, e vedremo come collegare il server a PGAdmin.

Quando apriamo Postman, ci propone di creare un account. Non facciamolo, usiamo l'API lightweight senza un account.

Nell'url mettiamo `localhost:3000` per ora. Non comparirà niente all'inizio. Prendiamo la cartella del progetto, quella al cui interno c'è solo la cartella `CineVUE`. Questa cartella sarà la root del nostro progetto. In questo documento, anch'essa si chiama `CineVUE`. Dentro la root, creiamo la cartella `Server`.

Apriamo la cartella `Server` nel terminale come amministratori. `npm init -y`. Se tutto va bene, dovrebbe esserci qualcosa del genere:
```
Wrote to C:\GitHub Uni\FPW\Lab\20250430\CineVUE\Server\package.json:
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

Ora installiamo altri pacchetti. Servono appunto Express e Nodemon. Installiamo questi pacchetti.

Sempre in quella cartella, `npm install express`:
```
added 66 packages, and audited 67 packages in 3s

14 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Vediamo che sono apparsi `package.json` e `node_modules/`. I node module sono pacchetti, che non useremo tutti, necessari per far funzionare un sito.

Poi Nodemon. `npm i nodemon`, dove `i` è l'abbreviazione di `install`, sono equivalenti.

```
added 27 packages, and audited 94 packages in 2s

18 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

E poi `npm i pg` per il collegamento a PGAdmin.

```
added 14 packages, and audited 108 packages in 2s

18 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Se non è esattamente uguale non importa. Basta che non dia errore.

Adesso facciamo in modo di avviare un server. Creiamo un nuovo file dentro `Server/`, `server.js`. Creiamoci anche una cartella, `src/`, e una cartella per ciascuna tabella che abbiamo fatto nel database: `src/film`, `src/recensioni`, `src/utenti`. Non è davvero obbligatorio separarle, ma è ordinato quindi è praticamente obbligatorio.

Ricapitolando, la struttura della cartella è questa:
```
/
- Server
  - node_modules
  - src
  - package.json
  - server.js
- CineVUE
  - ...
```

Ricapitolando, abbiamo una cartella con un nome qualunque, chiamiamola la root del progetto, `/`, con dentro `/Server/` e `/CineVUE/`. Quindi apriamo `/Server/server.js`.

## Creazione di un server

Vediamo la sintassi base di JS e la Composition API. Per Vue invece useremo la Option API. Cambia poco. (L'ha detto in modo incomprensibile).

```
const express = require('express');
const app = express();
```

Stiamo richiedendo la presenza di Express, e istanziando Express.

Ogni server si connette a una determinata porta, di default è a caso. Noi usiamo la 3000. Quindi mettiamo il valore in una costante, e diciamo all'app di ascoltare la porta 3000, mettendo poi un'arrow function per farle sapere cosa fare una volta connesso.

```
const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));
```

Usiamo i backtick (`` ` ``) nella stringa così possiamo usare `${}` per metterci il valore di una variabile.

Noi vogliamo avviare il server con uno script di default in `package.json`. Ci sono già cose scritte dentro, tra cui una lista, `"scripts`. Aggiungiamo a `"scripts"` un'entry, `"start": "nodemon server.js"`. Come detto, Nodemon rimane sempre in ascolto, quindi quando c'è bisogno esegue la keyword `start`, associato al comando `nodemon server.js`. Quindi nel terminale scriviamo `npm run start`.

```
> server@1.0.0 start
> nodemon server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
app listening on port 3000
```

Dobbiamo specificare il metodo di ottenimento dei dati, tra get e post. Get è dal server, post è verso il server. Ci sono anche delete e update, che sono come post ma con scopi diversi. Per ora usiamo get.

Scriviamo dentro `server.js`.

Come parametro, mettiamo una stringa che indica la *route* (che in inglese britannico si pronuncia uguale a *root*). Come route mettiamo la root, `/`. Mettiamo anche un'arrow function, che da `req`uest e `res`ponse compie certe azioni. Inviamo informazioni testuali con `res.send()`. 

```
app.get(`/`, (req, res) => {
    res.send('Hello World')
})
```

Queste route create nel server possiamo testarle su Postman.
Apriamo una scheda.
C'è un pulsante con del testo colorato, che indica il metodo di ottenimento dei dati. Sono tantissime, più di 4, com'è possibile, da quando. Non importa, stiamo usando Get. Il nostro server è sul nostro computer, quindi l'indirizzo è `localhost`, e la porta è `:3000`. Visto che la route punta alla root, non dobbiamo aggiungere nient'altro. Premiamo *Send*.

```
Hello World
```

Funziona! Se non funziona, controlla di aver scritto tutto nei file giusti, e di aver **salvato**. Per sicurezza, ecco il contenuto giusto dei file finora:

**package.json**
```
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.1.0",
    "nodemon": "^3.1.10",
    "pg": "^8.15.6"
  }
}
```

**server.js**
```
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));

app.get(`/`, (req, res) => {
    res.send('Hello World')
})
```

## Collegare delle route al database

Dobbiamo creare un altro file. Abbiamo `server.js` che gestisce il server, adesso creiamo `db.js` per gestire il database. Deve essere in `/Server/`, attento perché VSCode è un po' strano con le cartelle. Tra l'altro, creato il file, il server si è riavviato.

Dentro il file è simile a `server.js`. Importiamo la libreria Pool di PGAdmin, e creiamone un'istanza. Dobbiamo ricordare nome utente, password, e nome del database che abbiamo messo su PGAdmin. Tra l'altro, per connetterci dobbiamo tenere aperto PGAdmin o PostgreSQL. Controlla la porta facendo clic destro su *PostgreSQL 14* e cliccando su *Properties*. Di solito è 5432. Nel codice dobbiamo anche esportare pool.

```
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cineva',
    password: 'iloSona',
    port: 5432,
})
module.exports = pool;
```

Spostiamoci dentro la cartella src. Dentro `/Server/src/` creiamo `film_controller.js`, `film_queries.js` e `film_routes.js`.

Prima con `app.get()` abbiamo definito una route. Ma non vogliamo buttarle così a caso nel server, le vogliamo mettere ordinate nei file che sono dentro le cartelle giuste. Quella lasciamola lì, ma le altre le mettiamo in `film_routes.js`. Dobbiamo importare una parte di Express, ossia Router.

```
const {Router} = require('express');
const router = Router();
```

Questo è analogo a quello fatto con Pool, ma scritto in modo diverso.

```
router.get('/', (req, res) => {
    res.send('Film list');
});
module.exports = router;
```

Stiamo puntando alla "root", ma più avanti specificheremo che è la root dei film, per adesso darà errore. Mettiamo una stringa come placeholder per adesso, dopo sarà la lista di film dal database.

Torniamo su `server.js` e importiamo le route dei film. Dobbiamo specificare l'intero path perché non fa parte dei node module.

```
const filmRoutes = require('./src/film/film_routes');
```

Poi nel corpo vero e proprio del codice, dobbiamo farglielo usare.

```
app.use('/film', filmRoutes);
```

Spostiamoci adesso in `film_controller.js`. Lì creeremo tutte le funzioni che ci permettono di collegarci al database.

Cominciamo importando il database, e creando di nuovo un'arrow function con una query. Oltre alla query mettiamo anche una funzione callback, che viene chiamata in risposta.

```
const getFilmList = (req, res) => {
    pool.query('SELECT * FROM film', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
```

Chiaramente `throw error` è una funzione bloccante, quindi tutto quello che c'è dopo non viene eseguito. Se non viene lanciato, diamo il codice di stato per la richiesta andata a buon fine, `200`. Possiamo ometterlo, ma così è più facile capire che sta succedendo. Facciamo restituire qualcosa con questo stato, e lo facciamo restituire in formato json. Con il testo abbiamo usato `.send()`, per json usiamo `.json()`. Mandiamo il contenuto (le righe) della nostra tabella.

Poi esportiamo ciò che abbiamo ottenuto, ma questa volta come lista, perché magari dopo aggiungiamo altro.

```
module.exports = {
    getFilmList,
};
```

Dovrebbe ancora dare errore. Abbiamo creato la prima chiamata al database, ma c'è ancora qualcosa che non va. In `film_routes.js` stiamo ancora mandando un placeholder. Importiamo il controller.

```
const controller = require('./film_controller.js');
```

E nella chiamata, mettiamo quella giusta:

```
router.get('/', controller.getFilmList);
```

Noi abbiamo messo la query in chiaro nella chiamata. Mettiamola invece in `film_queries.js` ed esportiamola:

```
const getFilmList = 'SELECT * FROM film';
module.exports = {
    getFilmList,
};
```

Tra l'altro, a JavaScript non importa se ti mancano i punti e virgola. Tutte le porcate che fai te le accetta. Questo è molto potente, finché tutti i tuoi errori non si combinano in un disastro. Quindi, anche se te lo perdona, comportati bene.

Quindi in `film_controller.js`, importiamo:

```
const queries = require('./film_queries.js');
```

E cambiamo quello di prima: `pool.query(queries.getFilmList, ...`.

**Attento alle cartelle**: `/Server/src/film/film_routes.js`.

Andiamo su `film_queries.js` e facciamo una nuova query, aggiungendola poi alla lista di export.

```
const getFilmById = 'SELECT * FROM film WHERE id = $1';
```

Quelli non sono backtick, ma questa stringa verrà usata dalla libreria di PGAdmin, e quel `$1` funzionerà in modo simile al `${}` di JavaScript. In Postman, glielo passiamo aggiungendo `:id` nell'URL. Il parametro sarà letto come stringa, quindi va parsato come intero. Leggiamolo in `film_controller.js` così:

```
const getFilmById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getFilmById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}
```

Lì stiamo anche chiamando `getFilmByID`, passando i parametri come array. E poi c'è la solita arrow function per l'errore e la restituzione dei risultati.

Attento, attento, ad esportare sempre, e usare `exports` e non `export`.

Richiedendo `localhost:3000/film` dentro Postman, dovresti ricevere una cosa del genere:

```
[
    {
        "id": 1,
        "titolo": "Focus - Niente è come sembra",
        "regista": "Glenn Ficarra",
        "genere": "commedia",
        "descrizione": "Un esperto truffatore, Ncicky Spurgeon, cresciuto in una famiglia di truffatori, ha una propria azienda con cui progetta e mette in atto molteplici colpi",
        "foto_locandina": "focus.png"
    },
    {
        "id": 2,
        "titolo": "Il Diavolo Veste Prada",
        "regista": "David Frenkel",
        "genere": "commedia",
        "descrizione": "Andrea giunge a New York dopo la laurea e trova lavoro come assistente di Miranda Priestly, direttrice di una delle più conosciute riviste di moda",
        "foto_locandina": "diavoloprada.png"
    }
]
```

## Tutti i file a questo punto

### `/Server/db.js`

(i `...` dipendono da come hai configurato il database)

```
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: '...',
    password: '...',
    port: ...,
})

module.exports = pool;
```

### `/Server/package.json`

```
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.1.0",
    "nodemon": "^3.1.10",
    "pg": "^8.15.6"
  }
}
```

### `/Server/server.js`

```
const express = require('express');
const filmRoutes = require('./src/film/film_routes');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));

app.use('/film', filmRoutes);

app.get(`/`, (req, res) => {
    res.send('Hello World')
})
```

### `/Server/src/film/film_controller.js`

```
const pool = require('../../db');
const queries = require('./film_queries');

const getFilmList = (req, res) => {
    pool.query(queries.getFilmList, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getFilmById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getFilmById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getFilmList,
    getFilmById,
};
```

### `/Server/src/film/film_queries.js`

```
const getFilmList = 'SELECT * FROM film';
const getFilmById = 'SELECT * FROM film WHERE id = $1';

module.exports = {
    getFilmList,
    getFilmById,
};
```

### `/Server/src/film/film_controller.js`

```
const {Router} = require('express');
const controller = require('./film_controller');
const router = Router();

router.get('/', controller.getFilmList);
router.get('/:id', controller.getFilmById);

module.exports = router;
```