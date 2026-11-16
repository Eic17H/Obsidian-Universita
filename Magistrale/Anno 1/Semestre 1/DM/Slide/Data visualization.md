---
cssclasses:
  - dm
---
La visualizzazione dei dati ha due scopi: leggere i dati e capire cosa significano. Permette di sfruttare la vista per notare strutture anziché doverci pensare attivamente leggendo i dati. Però può anche fuorviare nascondendo dettagli o sottintendendo dati sbagliati (talvolta di proposito).

Per esempio:

![[Pasted image 20261116075808.png]]

A occhio sembra una crescita del 200%, perché ti aspetti che un grafico a barre sia in scala. Invece è una crescita del 10%. In un powerpoint non leggi tutti i numeri, guardi le barre e capisci, ma qui l'informazione visiva è sbagliata. La soluzione ovviamente è mettere $0$ alla base.

Bisogna anche scegliere il tipo di grafico in funzione del tipo di dato.

![[Pasted image 20261116080026.png]]

Poi sono un sacco di slide di tipi diversi di grafico.

* Dot plot simile a un istogramma ma utile per valori discreti piccoli nella $y$.
	* Strip plot simile ma per i gruppi, per quando la $x$ non è discreta ma non ci interessano piccole differenze.
* Istogramma lo conosci bene, mostra bene media e varianza, bimodalità e cose così, puoi fare barre strette o larghe per essere più o meno granulare sulla $x$.
	* Quello a barra è come l'istogramma ma se la $x$ è nominale.
* Grafico a torta, da usare con poche categorie, la $y$ deve avere senso che arrivi a un $100\%$.
* Box plot è quello strano, violin plot è l'altro strano, è bene usarli insieme.
* Scatter plot per relazioni (tante coppie di valori), utile per trovare trend, cluster e outlier.
	* Le heat map sono simili, ma in un certo senso discretizzate nei dati in input.
* Grafici a linea per vedere un valore che cambia nel corso del tempo: la $x$ deve essere numerica, e se metti più linee è spesso bene che la $y$ sia uguale per entrambe.
	* Empirical Cumulative Distribution Function, è distribuzione cumulativa, praticamente l'integrale di un grafico a linea normale.
* I radar plot sono quelli delle statistiche di Pokémon e Persona 5, c'è poco da dire ma almeno così me lo ricordo (dubito serva ricordarlo).

![[Pasted image 20261116080637.png]]

I grafici 3D possono essere difficili da leggere: un dato è dietro un altro e non si vede, la prospettiva non ti fa capire se una cosa è vicina o in alto. Per esempio per una funzione $\mathbb R ^2 \to \mathbb R$ (ma anche lì, l'output può comodamente essere un colore).