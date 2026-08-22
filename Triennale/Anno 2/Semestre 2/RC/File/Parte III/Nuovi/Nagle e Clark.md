---
cssclasses: rc
---
## Concetto detto in modo stupido

**==Ack cumulativi==**: c'entra con la [[sliding window|.

**==Nagle==**: essenzialmente lui ha la window che è fissa a 0. Quindi nel mentre tu che generi dati da inviare, anziché avere 10 pacchetti da 1 byte, li metti insieme in 1 pacchetto da 10 byte.

**==Clark==**: diciamo che tu hai la tua window di 0 byte, poi ti liberi e la aumenti a 1 byte, si riempie, 0, svuoti, 1, 0, 1, inutile così, ==silly window sindrome==. La soluzione di Clark è che c'è una dimensione minima che deve avere la window prima che tu possa dire al mittente che non è vuota, che magari è metà della dimensione massima, magari una cosa del genere, si decide in anticipo.