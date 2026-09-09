---
cssclasses: rc
---
## Concetti chiave

Quattro parametri
* affidabilità (deve funzionare sempre o quasi),
* ritardo,
* jitter (la velocità non è costante, non farlo pesare),
* banda (banda minima garantita).

Quattro tipi di QoS
* velocità costante (una velocità che puoi dare sempre o quasi),
* velocità variabile in tempo reale,
* velocità variabile non in tempo reale,
* velocità disponibile (fai tutto ciò che puoi).

Tecniche
* bufferizzazione (dati in un buffer prima dell'invio),
* traffic shaping
	* leaky bucket (limiti la velocità e scarti i pacchetti in eccesso),
	* token bucket (c'è un po' di flessibilità nel rate),
	* flow specification (ci si accorda in anticipo),
* routing adattivo (distribuisci il carico tra percorsi alternativi),
* sovradimensionamento (costosa ma utile in casi estremi).

## Nello specifico

### Parametri

* **==Affidabilità==**: Non voglio bitflip e non voglio perdere pacchetti. Meglio che la rete non vada in down, e se lo fa non deve essere spesso.
* **==Ritardo==**: Deve essere valutabile e controllabile, per confrontare il contratto e il ritardo effettivo.
* **==Jitter==**: Inconsistenza di velocità, picchi di malfunzionamento.
* **==Banda==**: Bisogna garantire una banda minima garantita (BMG).
### Categorie

* ==**Velocità costante**==: Banda uniforme e ritardo uniforme (come il telefono).
* **==Velocità variabile in tempo reale==**: Videoconferenza.
* **==Velocità variabiile non in tempo reale==**: Video on-demand.
* **==Velocità disponibile==**: Quando non ti importa del jitter (file transfer).

### Tecniche

#### Bufferizzazione

Arriva il flusso, ma no lo si consegna subito. Lo si memorizza in un buffer, i dati ci restano un po' e poi vengono inviati a velocità costante. Così anche se arrivano a velocità variabile, poi ripartono a velocità costante, come ci piace per audio e video in streaming. Però costa risorse.

![[Pasted image 20260820230407.png]]

#### Leaky bucket

Non ho capito la differenza col buffer, mi sembra molto simile.

![[Pasted image 20260820230420.png]]

#### Token bucket

Mentre non sta trasmettendo, l'host ottiene *token* a una velocità costante. Quando vuole trasmettere, lo può fare alla velocità massima disponibile finché non finisce i token. Finiti i token, deve aspettare che ne arrivino altri e sarà limitato dalla loro velocità.

C'è anche un numero massimo di token che si possono avere in un dato momento, oltre ai quali non si possono guadagnare. (Il secchio).

I pacchetti non vengono mai scartati, al massimo si smette di produrli avvertendo il livello superiore.

![[Pasted image 20260820230432.png]]

#### Flow specification

#### Routing adattivo

Niente, ti fai percorsi alternativi dato punto di inizio e punto di fine, e li usi in parallelo, dividendo o in parti uguali o proporzionalmente alla banda.

Non ho capito: Sostanzialmente viene fatto quando il routing ha dei suoi protocolli ulteriori rispetto a quelli normali di rete che consentono di adattare anche per porzioni di rete il routing relativo.

#### Sovradimensionamento

C'è poco da dire faccio copia-incolla.

Prevede un’attribuzione di QoS in ambito di servizi essenziali e/o militari, è una tecnica che consiste nell’aumentare la capacità di calcolo e le dimensioni del buffer dei router e l’ampiezza di banda per singole tratte della sottorete (esempio: necessito di 5Mb/s e ne richiedo di più per sicurezza).

Risulta evidentemente costosa, e spesso inapplicabile. Tuttavia, può rappresentare una valida
soluzione se circoscritta nel tempo e per percorsi definiti.