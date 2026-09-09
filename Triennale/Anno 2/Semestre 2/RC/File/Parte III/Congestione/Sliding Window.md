---
cssclasses: rc
---
## Concetto informale

Diciamo che il server deve inviare 20 segmenti, e il client ha una finestra di ricezione di 10 segmenti.

Il server invia $S1$, poi invia $S2$. Poi il client manda l'$ACK$ di $S1$. Il server può continuare a mandare segmenti, basta non superare i $10$ segmenti. Quindi potrebbe semplicemente mandare fino a $S10$, e poi aspettare $ACK10$.

Ma può fare di più. Perché nel frattempo ha già ricevuto $ACK1$, e quindi, senza superare la finestra di 10 segmenti, può inviare anche $S11$, tanto $S1$ è già stato gestito. E così via.

Quindi questa finestra parte da $1\text:10$, poi dopo $ACK1$ diventa $2\text:11$, e così via.