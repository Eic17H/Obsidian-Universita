---
cssclasses: rc
---
La [[QoS]] non dipende sia da fattori interni alla sottorete che esterni. Bisogna quindi concordare il carico posto sugli Host e sulla sottorete. Per farlo, si concordano soglie di garanzia minima e massima su determinati parametri. Questo è il *Service Level Agreement*.

Non ho capito:

> Le SLA hanno la duplice funzione, verso l’Host e verso la sottorete, di raggruppare al loro interno un insieme di servizi, spesso implementati nei protocolli di livello rete, che rendono misurabili prestazioni specifiche sia dell’Host che della sottorete. Le SLA hanno una flessibilità di parametrizzazione che ne consente l’impiego con architetture e tecnologie di rete differenti.

## Cosa considera

* **Throughput per Port** (in bit/sec, frame/sec, packet/sec): garanzia sul livello minimo di produttività all'inoltro per ogni porta del router;
* **DDR** Data Delivery Ratio (bit/sec): garanzia sul livello minimo assicurato di consegna dei dati;
* **CBR** Constant Bit Rate (bit/sec): garanzia sulla mantenimento di una velocità minima concordata di consegna di dati per applicazioni particolari, tipico dell’ATM;
* **Back-up di linea** (a caldo, dinamico) (a freddo, statico): quando cade il collegamento principale, si usa una linea di back-up, che può essere predeterminata e pronta quasi subito (a caldo) o da determinare al momento della caduta (a freddo), e in quel caso si specificano anche i tempi massimi e le risorse stimate per farlo:
* **Back-up router** (a caldo, dinamico) (a freddo, statico): stesso caso, ma al posto della linea si parla del router di interfacciamento;
* **Uptime** (percentuale per mese o anno): per quale percentuale di ciascun mese o ciascun anno è garantito che il servizio sia attivo;
* **RSU** Report Service Unit: si garantisce un pannello di controllo delle prestazioni, di sola lettura;
* **MSU** Management Service Unit: si garantisce un pannello di controllo che permette di modificare certi parametri, come gestire la banda e gestire i circuiti virtuali.

## [[KPI|KPI]]

Di nuovo non capisco e lo incollo così com'è:

> La complessità derivante dalla verifica e/o dalla misurabilità dei livelli di servizio delle SLA, hanno portato alla definizione di più semplici e strutturati parametri di indagine denominati KPI (Key Performance Indicator) che consentono di raggruppare in un unico reporting set l’insieme di KPI necessari alla descrizione del Service Level Agreement desiderato. Se scende sotto 1, il servizio non sta funzionando come vorremmo.