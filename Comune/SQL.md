# FPW

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
# BD

SQL. Di nuovo. Sì da FPW.

Ci sono vari tipi con anche alias. Char/character, integer/numeric, serial, bigserial. Serial e bigserial quando vengono creati vengono assegnati in modo incrementale, e se si cancella un'entry non si riusa lo stesso seriale. Timestamp, interval, data sono tipi di tempo. Ci sono diversi stili per rappresentare le date in stringhe, si può decidere con SET date_style. C'è Boolean che può essere TRUE, FALSE e NULL. Vedi le slide ovviamente il solito, si capisce.

Apri PGAdmin. A sinistra, apri a tendina Servers, poi PostgreSQL. Clic destro su Databases e crea BDLab2025. In un database possiamo mettere più schemi. Di default ti crea lo schema public. Puoi crearne uno col tasto destro, o col tasto Query Tool, che è ciò che useremo. Il query tool è ciò che ci permette di usare comandi in linguaggio SQL.

```
CREATE SCHEMA tutoraggio;
```

Non premere `Ctrl+S`, quello ti salva la query in un file. Premi invece play.


```
CREATE SCHEMA

Query returned successfully in 31 msec.
```

Bene, ha funzionato. Clic destro, refresh, e vedi che c'è il nuovo schema oltre a public.

Clic destro sul database e creiamo un backup. Formato Plain, il resto lascia default. Compaiono messaggi in basso a destra. Verde se va a buon fine, rosso se non va a buon fine, e comunque rosso certe volte anche se va a buon fine, e va be', peccato.

Ovviamente usiamo SQL come linguaggio. Ha avuto tante versioni, lasciamo perdere la storia perché non c'è all'esame. Una delle tre funzioni principali è la definizione di dati, che si fa con l'istruzione CREATE. (Nota, i domini sono tipi custom). Per creare la tabella impiegato:

```
CREATE TABLE Impiegato
( Matricola CHAR(6) PRIMARY KEY,
Nome VARCHAR(20) NOT NULL,
...
Stipendio DECIMAL(10,2) DEFAULT 0,
  FOREGIN KEY(Dipartimento)
  REFERENCES Dipartimento(NomeDip),
  UNIQUE (Cognome, Nome)
);
```

Qua vediamo un paio di campi con tipi diversi e valori default o vincoli. Mi sono perso va be'.

NULL è un valore compatibile con tutti i tipi di dato, si usa per rappresentare "non lo so". Ah no aspetta ora dice che i bool hanno TRUE FALSE UNKNOWN, che sta dicendo. O magari boh sono sinonimi? Veramente una spiegazione poco chiara, non so se se ne rende conto.

UNKNOWN con gli operatori logici? Ha anche senso. TRUE AND UNKOWN è UNKNOWN ovviamente, ma FALSE AND UNKOWN, a prescindere dal secondo è FALSE. Al contrario con OR. NOT UNKOWN è UNKNOWN. Ha senso se lo dici a parole.

Ma quindi cos'è uno schema? Diciamo che è essenzialmente una cartella con dentro delle tabelle.

Diciamo che abbiamo creato lo schema dipartimento, minuscolo perché con la maiuscola boh SQL ha deciso di fare le bizze.

Domini. Tipi custom.

```
SET SCHEMA 'dipartimento';
CREATE DOMAIN Voto AS SMALLINT
DEFAULT NULL
CHECK ( value >= 18 AND value <= 30 );
```

Un altro esempio

```
SET SCHEMA 'dipartimento';
CREATE DOMAIN AnniCorso AS SMALLINT
DEFAULT 3
NOT NULL;
```

Esercizio: dominio codice fiscale di lunghezza 16. Se metti una stringa più corta in una variabile lunga vengono messi automaticamente spazi vuoti alla fine.

```
SET SCHEMA 'dipartimento';
CREATE DOMAIN CodiceFiscale AS CHAR(16)
DEFAULT NULL
CHECK ( LENGTH(value) = 16 );
```

Se non specifichi lo schema te lo mette in public.

Per convenzione, KEYWORD, Identificatori, identificatori. È "solo" una convenzione, ma le convenzioni sono importanti quindi rispettala.

Le autorizzazioni dello schema sono nelle slide e, crucialmente, **non** nell'esame. Wow.

Creiamo una tabella: vedi le slide.

PRIMARY KEY non può essere NULL e deve essere unica.

Ci sono esercizi che non farò.

Sike l'ho fatto.

```
CREATE SCHEMA acquario;
SET SCHEMA 'acquario';
CREATE TABLE Pesce ( nome VARCHAR(20), famiglia VARCHAR(20), codicep SMALLINT );
CREATE TABLE Vasca ( nome VARCHAR(20), codicev SMALLINT, volume SMALLINT, sala VARCHAR(20) );
CREATE TABLE Presenza ( codicep SMALLINT, codicev SMALLINT, quantita SMALLINT );
```

Vedi le slide non ho più voglia ti giuro. Belli i vincoli però.

"Compiti per casa", importante farli. Queste esercitazioni hanno la stessa struttura degli esami, quindi conviene farle.
