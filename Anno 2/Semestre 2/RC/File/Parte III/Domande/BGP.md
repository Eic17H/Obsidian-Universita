---
cssclasses: rc
---
Il **==border gateway protocol==** è un protocollo di routing che collega router appartenenti ad *==a==utonomous ==s==ystem* diversi. È importantissimo per la rete internet.

## Concetto informale e Wikipedia

Tu hai un insieme di indirizzi, e questo insieme si dice *rete* o *prefisso*. C'è una tabella con molti di questi prefissi. Questi prefissi hanno un riscontro fisico, sono praticamente delle zone. Questo protocollo fa due cose:

* Instradare collegamenti basandosi su certe regole che possono anche essere di natura politica;
* Instrada in modo decentralizzato, così che si possano fare più comodamente modifiche alla rete internet.

Il BGP si occupa sia dei collegamenti interni a un ==AS== che a quelli che passano per un ==border==.

Diciamo che tu hai due ==AS== adiacenti (collegati tra loro), che sono detti *peer* (eguali, appunto in collegamento diretto). Ci sono due tipi di router: quelli interni a un AS e quelli che si collegano a un router di un altro AS, detti router di confine.

I router interni a un AS **devono** essere tutti peer degli altri. Quindi è poco scalabile. In realtà questa regola non è molto stretta, perché adesso si usano *route reflector* (il nodo A è peer di tutti, e tutti sono diciamo semi-peer, a due salti di distanza passando per A), e *confederazioni* (un AS ha sotto-AS dentro).

Per instradare, si usano due campi. ==AS-PATH== è la lista di AS per cui è già passato, per evitare loop. ==NEXT-HOP== è la destinazione parziale per andare a quella finale.

## Dal libro di Dessì

Per scambiare dati all'interno di un [[AS]], si usano [[IGP]], ma se si devono scambiare dati tra un AS e un altro, non si può usare la stessa logica, si hanno obiettivi diversi, quindi si usano gli [[EGP]]. IL BGP (Border Gateway Protocol) è un EGP che si preoccupa degli aspetti politici del routing.

Ci sono dei vincoli imposti sulle politiche di routing: si decide quale traffico può fluire su quali linee tra AS.

> Per esempio, un cliente di un ISP deve pagare un altro ISP perché i suoi dati possano raggiungere qualunque altra destinazione: l'ISP cliente compra un ==servizio di transito== da un ISP fornitore. Il fornitore deve fornire percorsi per tutte le destinazioni possibili, tramite tutte le linee che collegano i due ISP, e il cliente deve fornire percorsi per tutte le destinazioni che gli appartengono: non vuole gestire traffico per destinazioni esterne.

Ci sono tre tipi di politiche: ==transito== (fornisco un servizio di transito), ==client== (collegamento di macchine cliente remoto) e ==peering== (collegamenti equipollenti).

Vediamo un esempio.

> ![[Pasted image 20260729012202.png]]
> 
> Un messaggio che viaggia da A a C deve passare per AS1 grazie al suo servizio di transito offerto ad AS2 e ad AS4. Non può passare per AS3 perché esso non offre un servizio di transito. Quindi farebbe A>AS2>AS1>AS4>C.
> 
> Un messaggio che viaggia da A a B può passare per AS1, ma AS2 e AS3 possono provare a ridurre i costi usando il loro servizio di peering e scambiandosi il traffico direttamente tra di loro.

Per implementare il peering, due AS si scambiano le [[Tabella di routing|tabelle di routing]]. Il peering però non è transitivo, perché due peer devono conoscere la tabella di routing l'uno dell'altro.

Il BGP è di tipo [[distance vector]], ma a differenza degli altri protocolli dello stesso tipo non tiene traccia solo del costo di un cammino, ma memorizza l'intero cammino ([[path vector protocol]]). Il cammino ha due informazioni: qual è il prossimo router da cui si deve saltare di AS, e la sequenza (invertita) di AS attraversati (AS path).

Coppie di router BGP comunicano tramite connessioni [[TCP]] per comunicazioni affidabili.

Faccio copia e incolla perché non ho capito.

> ![[Pasted image 20260729012212.png]]
> 
> Questo è un esempio applicativo di quello che abbiamo visto precedentemente, dove abbiamo un treno di comunicazione dei pacchetti dove è riportato il percorso e il tipo di salto successivo.

## Dalle slide del prof

