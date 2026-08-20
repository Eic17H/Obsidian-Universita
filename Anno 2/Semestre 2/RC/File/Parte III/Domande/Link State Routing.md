---
cssclasses: rc
---
Un [[Algoritmi dinamici|algoritmo dinamico]].

(le cinque fasi e schema delle slide)

## Cinque fasi

1. Indagare sui vicini e rilevarne l’indirizzo;
2. Misurare ritardo o costo per raggiungerli;
3. Costruire un link state packet;
4. Inviare il link state packet agli altri router;
5. Definire i nuovi percorsi minimi per raggiungere i router.

### Indagare

$HELLO$.

### Misurare

$ECHO$.

### LSP

Abbiamo questa sottorete:
![[Pasted image 20260820213920.png]]

Questi sono i pacchetti che contengono lo stato dei collegamenti in quella sottorete:
![[Pasted image 20260820214017.png]]

### Inviare

Tramite flooding.

![[Pasted image 20260820214056.png]]

### Definire

Tramite [[OSPF]] o [[IS-IS]].