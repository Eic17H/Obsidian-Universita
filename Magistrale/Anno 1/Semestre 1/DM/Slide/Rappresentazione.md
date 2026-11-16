---
cssclasses:
  - dm
---
I dati sono rappresentazioni di osservazioni. Le osservazioni sono disordinate, i dati sono organizzati, poi dobbiamo dare loro una struttura che ci permetta di comprenderli.

I dati possono essere organizzati in modi diversi, e i dataset veri spesso li combinano:
* Oggetti complessi, genericamente il concetto di struct annidate o record.
* Spaziali e temporali, organizzati su coordinate, permettono l'esistenza di traiettorie e di scale diverse.
* Grafi.
* *Multimodali*; "testo", "immagine", "audio", "video" sono esempi di *modalità*.

Ci interessa il tipo di dato perché dobbiamo sapere come rappresentarli, codificarli e confrontarli.

I dati possono essere più o meno strutturati:
* Struttura rigida, come database, data frame, e fogli di excel.
* Senza struttura, come testo, immagini e video.
* Una via di mezzo, struct generiche (quindi JSON, XML, NoSQL) o log.

Bisogna considerare che certe grandezze reali possono essere rappresentate in modi diversi, come l'altezza espressa in diverse unità di misura. Anche la differenza tra metri e centimetri va considerata.

Questa è carina, incollo direttamente la tabella.

![[Pasted image 20261116065642.png]]

Non significa che *tutte* le misure della temperatura non permettano i rapporti, se le misuri in Kelvin puoi fare rapporti, ma in Celsius e Fahrenheit non puoi perché lo zero è arbitrario.

Qui sopra vediamo quattro tipi di feature, e possiamo raggruppare i primi due in "categorici" e gli altri due in "numerici".

Un altro senso in cui possiamo parlare di tipo di dato è questa che non so come chiamare:
* Valori continui (misure naturali)
* Valori discreti (contare oggetti o eventi)
* Valori booleani/binari (sì no)
* Valori sparsi, una tabella di tot dimensioni con quasi tutte le caselle false ma una vera ogni tanto (relazione "utente possiede licenza").

I tipi di dato non sono tipi di dato. Nel senso, questi tipi semantici di cui stiamo parlando non corrispondono ai loro `tipi di variabile` nella codifica. Un numero di telefono è nominale, ma lo puoi salvare come intero.

Questa non l'ho capita:

![[Pasted image 20261116070342.png]]

