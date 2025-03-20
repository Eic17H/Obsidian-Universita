### Condizioni di indifferenza

Certe volte una funzione ha degli input che non compariranno mai, e che quindi non ha degli output corrispondenti. Quando semplifichi la formula, puoi far finta che ciascuno di quegli output a cui sei indifferente sia 1 o 0 a seconda di quale ti permette di semplificarla di più.

L'esempio usato era la codifica BCD, binary coded decimal, che mappa a ogni cifra decimale quattro cifre binarie. Ci sono 10 cifre decimali ma 16 combinazioni di quattro bit, quindi 4 combinazioni sono inutili e posso manipolarle per rendere le loro caselle più simili a quelle adiacenti nella mappa di Karnaugh.

I sottocubi, il modo in cui si raggruppano le caselle dell'output, devono avere lati la cui lunghezza sia sempre una potenza di 2 (sono dati da moltiplicazioni di input binari, e visto che ogni input è un bit, aggiungere bit raddoppia le combinazioni considerate).

Per le forme normali vedi le slide, non ho appunti, ma si capisce dalle slide.

Tutte le porte logiche si possono definire in funzione di NAND.
(non ci provare a mano, non ne vale la pena, prendilo per vero).

Nella conversione da circuiti a formule, una quantità non trascurabile di studenti non mette le parentesi quando un termine di un prodotto è una somma.

Supponiamo per assurdo che io abbia capito, bisogna usare le proprietà dell'algebra booleana (termini neutri, De Morgan, etc) per far ottenere una formula equivalente in forma normale (solo prodotti di somme o solo somme di prodotti) a partire da una mappa di Karnaugh, e poi semplificare gli elementi ridondanti.
Capire quali elementi sono ridondanti è più facile facendo un'altra mappa di Karnaugh.
Per esempio, in $x'y+xz+yz$, $yz$ è ridondante, e si nota dal completo overlap con parte degli altri due termini in una mappa di Karnaugh.
Ci sono anche metodi algebrici per dedurlo. Ecco due metodi:
Poniamo $yz=vero$, quindi $y=z=1$. Il resto dell'espressione diventa $x'1+x1=x+x'=1$. Anche il resto dell'espressione è sempre vero quando $yz$ è vero, quindi $yz$ è una sorta di sottoinsieme (non credo sia il termine giusto) del resto, quindi si può omettere.
Moltiplichiamo $yz$ per $1$. $x+x'=1$, quindi possiamo fare $yz(x+x')=xyz+x'yz$. Lo mettiamo nell'espressione e otteniamo $x'y+x'yz+xz+xyz$. Se raccogliamo per $x'y$ e $xz$ otteniamo $x'y(z+1)+xz(y+1)$. $Qualsiasi\ numero +1$ fa $1$, quindi possiamo semplificare le parti tra parentesi e otteniamo $x'y+xz$.