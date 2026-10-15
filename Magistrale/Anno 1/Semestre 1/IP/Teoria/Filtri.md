---
cssclasses:
  - ip
---
Possono operare in tre modalità differenti
* [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Filtri puntuali|Puntuale]]: un pixel in input influenza solo il suo omologo in output;
* Locale ([[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Filtri spaziali|filtri spaziali]]): il pixel in output è influenzato dal pixel omologo in input e dal suo intorno;
* [[Filtri globali|Globale]] (*image restoration*): il pixel in output è influenzato dall'intera immagine in input.

Diciamo che ci stiamo muovendo nel dominio spaziale $(x,y)$, più avanti vedremo il dominio delle frequenze. Per questo usiamo filtri spaziali, perché siamo nel dominio spaziale. Un processo di dominio spaziale è una funzione $T()$ che #slide.