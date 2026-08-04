---
cssclasses: rc
---
Il **==border gateway protocol==** è un protocollo di routing che collega router appartenenti ad *==a==utonomous ==s==ystem* diversi. È importantissimo per la rete internet.

## Concetto informale

Tu hai un insieme di indirizzi, e questo insieme si dice *rete* o *prefisso*. C'è una tabella con molti di questi prefissi. Questi prefissi hanno un riscontro fisico, sono praticamente delle zone. Questo protocollo fa due cose:

* Instradare collegamenti basandosi su certe regole che possono anche essere di natura politica;
* Instrada in modo decentralizzato, così che si possano fare più comodamente modifiche alla rete internet.

Il BGP si occupa sia dei collegamenti interni a un ==AS== che a quelli che passano per un ==border==.

Diciamo che tu hai due ==AS== adiacenti (collegati tra loro), che sono detti *peer* (eguali, appunto in collegamento diretto). Ci sono due tipi di router: quelli interni a un AS e quelli che si collegano a un router di un altro AS, detti router di confine.

I router interni a un AS **devono** essere tutti peer degli altri. Quindi è poco scalabile. In realtà questa regola non è molto stretta, perché adesso si usano *route reflector* (il nodo A è peer di tutti, e tutti sono diciamo semi-peer, a due salti di distanza passando per A), e *confederazioni* (un AS ha sotto-AS dentro).

Per instradare, si usano due campi. AS-PATH è la lista di AS per cui è già passato, per evitare loop. NEXT-HOP è la destinazione parziale per andare a quella finale.

## Immagini del prof

![[Pasted image 20260729012202.png]]![[Pasted image 20260729012212.png]]

## Spiegazione rigorosa

