---
cssclasses:
  - fpw
---
Ok allora[[Express|l'altra volta]]  abbiamo fatto `server.js`, abbiamo fatto `db.js` con tutti i dati necessari per connetterci al database, in `src` abbiamo fatto le tre tabelle del database, e in film abbiamo fatto controller, queries e routes.

In film queries abbiamo messo le queries che abbiamo usato per vedere i dati del database. Per ora una per vederli tutti e una per vederne uno dato l'id. In controller, le funzioni js che ci fanno usare quelle queries. Film routes che importa film controller, ci permette di fare richieste al database in base alla root che definiamo in questo modo. Per la root, esegui getfilmlist, invece se gli passiamo un id eseugui getfilmbyid.

# Lezione di oggi

L'altra volta abbiamo visto le get, oggi le post, cioè funzioni che ci permettono di inserire nuovi record nelle tabelle del nostro database.

## Post

Andiamo su filmroutes e cominciamo così.
```
router.post('/', () => {});
```
Può sembrare che stiamo sovrascrivendo quel path, ma è separato.
Andiamo su controller.
```
const addFilm = (req, res) => {};
```
Ora andiamo su PGAdmin per sapere che metterci. A sinistra andiamo su `cineva/Schemas/public/Tables/film/Columns` per vedere le colonne da mettere nel corpo di quella funzione.
```
const { id, titolo, regista, genere, descrizione, foto_locandina } = req.body;
```
Prima di inserire un film, controlliamo se esiste già un altro film con lo stesso id, gestiamo gli altri errori, e poi mettiamo effettivamente il film.
```
const addFilm = (req, res) => {
    const { id, titolo, regista, genere, descrizione, foto_locandina } = req.body;
    pool.query(queries.getFilmById, [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            res.status(400).send("Il film esiste già nel database");
        } else {
            pool.query(queries.addFilm, [id, titolo, regista, genere, descrizione, foto_locandina], (error) => {
                if (error) throw error;
                res.status(201).send('Film aggiunto correttamente');
            })
        }
    })
};
```
`res` è response, `result` è result. `400` è lo stato di richiesta non andata a buon fine. Esportiamo anche questa funzione.
Aggiungiamo la query in queries.
```
const addFilm = 'INSERT INTO film (id, titolo, regista, genere, descrizione, foto_locandina) VALUES ($1, $2, $3, $4, $5, $6)';
```
E aggiungiamola a `module.exports`.
Torniamo su routes e completiamo quella funzione.
```
router.post('/', controller.addFilm);
```

Apriamo Postman, andiamo su Body e selezioniamo raw. A destra nel menù a tendina seleziona JSON per controllare la sintassi.
```
{
    "id": 7,
    "titolo": "Thunderbolts*",
    "regista": "Jack Schreir",
    "genere": "Comics",
    "descrizione": "molto bello andate a vederlo",
    "foto_locandina": "thunderbolts.png"
}
```
Avvia il server con `npm run start` nella cartella `Server` e testa. Deve ancora dare errore.

L'errore dovrebbe essere che non riesce a destrutturare la proprietà 'id' della richiesta. Il server non sa che stiamo mandando JSON, quindi non sa che farsene di ciò che gli mandi. In `server.js` devi importare Express con `app.use(express.json());`. Lo devi mettere appena dopo `const port`. Se c'è altro sopra `app.use(...)` non funzionerà.

Puoi vedere i dati anche aprendo `http://localhost:3000/film` in un browser.

Adesso vediamo come gestire gli errori, perché possono esserci difficoltà a capire gli errori del terminale.
Le scritte in verde indicano un momento in cui il server funziona.
Dopo un po', se c'è un errore, vediamo qualcosa come `CineVUE\Server\src\film\film_controller.js:20:13`.
Ci dice file, riga e colonna. Dopo c'è anche la call stack.
Una riga rossa invece ci indica che il server è crashato, e in quel caso rimane spento finché non modifichi un file. In quel caso potrebbe dirti qualcosa come "taldeitali deve essere un array", e lì sai cosa devi cambiare, perché ti dice anche la riga.
Sapend la sintassi degli errori, facile capire cosa significano perché il resto è a parole.

Adesso facciamo una delete.

## Delete

Prima si faceva con la POST, ma adesso è stata separata.
Torniamo su film routes. È bene separare le routes tra get, post e delete, magari con dei commenti.
Anche qui stiamo usando l'id, quindi sarà simile all'altra volta che l'abbiamo usato.
```
router.delete('/:id', () => {})
```
Andiamo su queries e mettiamo una query.
```
const deleteFilm = 'DELETE FROM film WHERE id = $1';
module.exports = {
    ...
    deleteFilm,
}
```
Poi su controller
```
const deleteFilm = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteFilm, [id], (error, results) => {
        if (error) throw error;
        if (results.rowcount === 0){
            res.status(404).send("Film non trovato");
        }else{
            res.status(200).send("Film eliminato correttamente")
        }
    })
};
module.exports = {
    ...
    deleteFilm,
}
```
rowcount è uguale a rows.length
Allora, prendo l'id come stringa dai parametri, lo parso come int, lo metto nell'id, lo passo come parametro alla query deleteFilm, se c'è un errore lo lancio, se il risultato è vuoto errore 404 non trovato, altrimenti ha funzionato. Esporto questa funzione.
Torniamo quindi su routes.
```
router.delete('/:id', controller.deleteFilm);
```
Proviamo su Postman: `localhost:3000/film/3` con DELETE, e dovrebbe aver funzionato.

Adesso proviamo a fare un update. Su routes usiamo `routes.put()`. Anche PUT è un tipo di POST, ma semanticamente sono diverse. Definiamo la query come update.
Gli esercizi delle slide vanno fatte entro la prossima lezione.