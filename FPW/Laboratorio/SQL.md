Oggi vedremo cos'è PGAdmin, come si fanno le tabelle, come si fanno collegamenti 1:1 o molti:1, quindi chiavi esterne, inserire ed estrapolare i dati.

## Software

Dobbiamo installare PGAdmin 4 e PostgreSQL 14.
Ricorda la password, deve essere la stessa per entrambi.

## Creazione di una tabella

A sinistra vedi "Database". Clic destro, create, metti il nome *cineva*, create.
Nella tab SQL c'è già del codice, usato per creare il database.
Invece clic destro sul nostro database, query tool, e lì scriviamo la nostra query.
Vedi le slide: ci sono delle tabelle, le facciamo nel nostro database.

```
CREATE TABLE utenti(
	username VARCHAR(20),
	pass VARCHAR(20),
	nome VARCHAR(50),
	cognome VARCHAR(50),
	email VARCHAR(50),
	foto VARCHAR(200)
);
```

Piuttosto autoesplicativo. Sono campi di tipo variabile con lunghezze varie.
Eseguiamola col tasto play in alto.
La possiamo vedere, a sinistra, in Schemas/Tables.
Impostiamo il nome utente come *chiave primaria*, cioè identificatore unico.
Cancelliamo quella query e scriviamo quest'altra:
```
ALTER TABLE utenti ADD PRIMARY KEY (username);
```

Una primary key può essere usata in un'altra tabella come foreign key, essenzialmente per creare un puntatore. Le foreign key devono avere lo stesso tipo e la stessa dimensione delle primary key corrispondenti.
Creiamo quindi altre due tabelle.

```
CREATE TABLE recensioni(
	id SERIAL,
	voto INTEGER,
	commento VARCHAR(500),
	data TIMESTAMP,
	num_like INTEGER,
	num_dislike INTEGER,
	utente_id VARCHAR(20),
	film_id INTEGER
);

CREATE TABLE film(
	id SERIAL,
	titolo VARCHAR(50),
	regista VARCHAR(50),
	genere VARCHAR(10),
	descrizione VARCHAR(250),
	foto_locandina VARCHAR(200)
);
```

## Modificare una tabella

Il tipo SERIAL è un tipo per valori che vengono dati in automatico da Postgres.
Aggiungiamo le primary key.
```
ALTER TABLE film ADD PRIMARY KEY(id);
ALTER TABLE recensioni ADD PRIMARY KEY(id);
```
Ricorda di runnare sempre ogni volta che scrivi una di queste cose.
Colleghiamo adesso le tabelle aggiungendo una foreign key.
```
ALTER TABLE recensioni ADD FOREIGN KEY (utente_id)
	REFERENCES utenti (username) ON UPDATE CASCADE;
ALTER TABLE recensioni ADD FOREIGN KEY (film_id)
	REFERENCES film (id) ON UPDATE CASCADE;
```
Questo va ad aggiornare anche a cascata le tabelle.
Se tutto è andato bene, dovrebbe dire `Query returned successfully in ___ msec.`

Adesso inseriamo dei record con le parole `INSERT INTO`.
```
INSERT INTO utenti
(username, pass, nome, cognome, email, foto)
VALUES
('m_rossi53', 'oiram', 'Mario', 'Rossi', 'maario.rossi53@gmail.com', 'm_rossi54.png');
```
Adesso inseriamo anche un film e una recensione.
```
INSERT INTO film
    (id, titolo, regista, genere, descrizione, foto_locandina)
VALUES
    (default, 'Focus - Niente è come sembra', 'Glenn Ficarra', 'commedia', 'Un esperto truffatore, Ncicky Spurgeon, cresciuto in una famiglia di truffatori, ha una propria azienda con cui progetta e mette in atto molteplici colpi', 'focus.png');

INSERT INTO recensioni
    (id, voto, commento, data, num_like, num_dislike, utente_id, film_id)
VALUES
    (default, 3, 'Film domenicale', '2023-05-06', 2, 0, 'm_rossi53', 1);
```
Appunto mettiamo `default` perché lo fa da solo.

Possiamo anche inserire i dati in modo più compatto senza mettere sempre le colonne.
Mettiamo altri due utenti.
```
INSERT INTO utenti VALUES
('bruno61', 'onurb', 'Bruno', 'Verdi', 'bruno.verdi@gmail.com', 'bruno61.png'),
('carlo57', 'orlac', 'Carlo', 'Gialli', 'carlo.gialli@gmail.com', 'carlo57.png');
```
Con questo metodo, bisogna sempre inserire tutti i campi.

Un altro film e un'altra recensione.
```
INSERT INTO film VALUES
(default, 'Il Diavolo Veste Prada', 'David Frenkel', 'commedia', 'Andrea giunge a New York dopo la laurea e trova lavoro come assistente di Miranda Priestly, direttrice di una delle più conosciute riviste di moda', 'diavoloprada.png');

INSERT INTO recensioni VALUES
(default, 4, 'Commedia diversa a New York', '2023-04-05', 8, 2, 'bruno61', 2);
```

## Visualizzare il contenuto di una tabella

Possiamo visualizzare il contenuto con `SELECT * FROM film;`.

Adesso modifichiamo le tabelle.
```
UPDATE recensioni SET voto = 3 WHERE id = 2;
```
E' piuttosto autoesplicativo.

Eliminiamo un record.
```
DELETE FROM recensioni WHERE id = 1;
```

Usiamo `WHERE` con `SELECT`.
```
SELECT * FROM recensioni WHERE utente_id = 'bruno61';
```

Per mettere insieme i dati di due tabelle, usiamo `JOIN`.
```
SELECT
    recensioni.commento, recensioni.voto, film.titolo, film.descrizione
FROM
    recensioni JOIN film ON recensioni.film_id = film.id
WHERE
    genere = 'commedia';
```