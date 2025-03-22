## Cos'è un linguaggio?

Esempi di linguaggio: italiano, C, LIS, del corpo. Cos'hanno in comune? Comunicano, trasmettono informazioni. Certi linguaggi sono più adatti per certe cose. L'inglese per la scienza.

Abbiamo il C, a che servono gli altri linguaggi di programmazione? Abbiamo il Python, perché farne altri ancora? Certe cose sono svolte meglio da certi linguaggi. Con il linguaggio naturale, gli umani parlano agli umani, e ai *large language models*. Con i linguaggi di programmazione, gli umani parlano ai computer, alle macchine. I linguaggi naturali sono ambigui ma ampi, i linguaggi formali sono precisi ma specifici.

| Linguaggi di programmazione  | Macchine            | Linguaggi macchina                                                        |
| ---------------------------- | ------------------- | ------------------------------------------------------------------------- |
| C<br>Python<br>Java<br>OCaml | i8088<br>JVM<br>ARM | Linguaggio macchina dell'8088<br>Java bytecode<br>Linguaggio macchina ARM |
Volendo, potremmo immaginare una macchina C, il cui linguaggio macchina è il C.

Come si traduce tra il C e il LM ARM? Nel caso del C, si traduce, si compila. In realtà, non si compila davvero per una macchina fisica. Si compila per una macchina virtuale che è il sistema operativo. Perché? Perché ARM non ha file, cartelle né niente del genere, quelle esistono solo nel sistema operativo. Altri linguaggi sono interpretati, quindi sono tradotti poco alla volta mentre vengono eseguiti.

Il Java è compilato o interpretato? Entrambi! Il Java si compila in Java bytecode, che poi viene interpretato dalla Java Virtual Machine, che lo interpreta per girare su un sistema operativo. La JVM ha un comando per creare un oggetto.

Sarebbe fattibile creare un compilatore da C a Java bytecode.
## Categorizzare i linguaggi di programmazione

* Compilati o interpretati
* Tipi statici o dinamici
* Paradigma imperativo, procedurale, funzionale, procedurale ad oggetti, funzionale ad oggetti, dichiarativo.

Gli oggetti sono appena meno astratti di come concepiamo il mondo, quindi molti linguaggi si adattano alla programmazione ad oggetti, o ci sono basati. Python ci si sta adattando, ma male. Il Java ci si basa, ma se proprio vuoi, li puoi evitare, è anche un linguaggio funzionale.

#disegno