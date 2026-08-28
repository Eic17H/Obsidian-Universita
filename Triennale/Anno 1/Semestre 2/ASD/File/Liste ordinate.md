---
cssclasses: asd
---
Confronteremo la complessità della lettura, dell'inserimento e della rimozione di un elemento, che sono diverse nel caso delle [[Liste|liste non ordinate]].
## Come array

Un array così come lo conosci. Gli elementi sono immagazzinati in sequenza.
## Con puntatori

### Singolarmente concatenate

### Doppiamente concatenate

#### Inserimento

Bisogna sapere dove va inserito
Si inserisce adattando i prev e i next
1 21 33 77 devo inserire 50
|1| 21 33 77 più piccolo
1 |21| 33 77 più piccolo
1 21 |33| 77 più piccolo
1 21 33 |77| più grande, lo inserisco qui
33 <-> 50 <-> 77
#### Cancellazione

Cerco 50
|1| 21 33 50 77
1 |21| 33 50 77
1 21 |33| 50 77
1 21 33 |50| 77 trovato
33 <-> 50 <-> 77
33 <--------> 77

## Operazioni

[[Merge]]