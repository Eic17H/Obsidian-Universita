---
cssclasses:
  - rc
---
Un metodo di [[controllo della congestione]].
## Spiegazione informale

Quando sto ricevendo troppi pacchetti e non riesco a gestirli, invio al mittente un choke packet, cioè un pacchetto che gli dice di rallentare. Lo sto inviando al mittente, quindi potrebbe dover attraversare altri nodi prima di arrivarci.

Avrò sollievo dopo un round-trip time, perché gli deve arrivare il mio pacchetto e poi mi devono finire di arrivare i suoi pacchetti inviati prima dell'arrivo del choke packet.

### Hop-by-hop choke packet
Si applica anche a tutti i nodi intermedi finché non raggiunge la fonte. Questo comporta un sollievo immediato per il nodo che ha inviato il choke packet.