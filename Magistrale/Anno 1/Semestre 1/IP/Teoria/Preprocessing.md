---
cssclasses:
  - ip
---
[[Magistrale/Anno 1/Semestre 1/IP/Lab/Preprocessing|Lab]]

La prima fase di elaborazione vera e propria, dopo l'acquisizione, è il preprocessing. L'applicazione all'immagine di tutte quelle operazioni che servono a "migliorare" la qualità delle immagini, dal punto di vista visivo, ma anche del contenuto e dell'informazione, utile a passare alla fase successiva.

Per esempio, si riduce il rumore o si evidenziano i dettagli rilevanti.

Possono operare in tre modalità differenti
* Puntuale: un pixel in input influenza solo il suo omologo in output;
* Locale (*==filtri spaziali==*): il pixel in output è influenzato dal pixel omologo in input e dal suo intorno;
* Globale (*==image restoration==*): il pixel in output è influenzato dall'intera immagine in input.

Diciamo che ci stiamo muovendo nel dominio spaziale $(x,y)$, più avanti vedremo il dominio delle frequenze. Per questo usiamo filtri spaziali, perché siamo nel dominio spaziale. Un processo di dominio spaziale è una funzione $T()$ che #slide.