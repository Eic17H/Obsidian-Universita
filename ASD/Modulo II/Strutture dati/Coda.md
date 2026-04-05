---
cssclasses:
  - asd
---
La coda si basa sul principio FIFO, "first in first out": il primo che entra è il primo che esce.

Le operazioni possibili sono:
* `push`: inserimento;
* `pop`: prelevo dell'elemento meno recente;
* `create`: creazione di una coda vuota;
* `isEmpty`: vero se la coda è vuota;
* `isFull`: vero se la coda è piena..

L'utilizzo si basa su due puntatori, `front e back`, primo e ultimo, entrambi inizializzati a `null`. Con `push`, si crea un nuovo elemento, lo si fa puntare al vecchio ultimo elemento, e `back` si fa puntare a quello nuovo. Invece `pop` restituisce l'elemento puntato da front, che punterà poi al vecchio secondo elemento, che punterà a `null`, essendo diventato il primo.