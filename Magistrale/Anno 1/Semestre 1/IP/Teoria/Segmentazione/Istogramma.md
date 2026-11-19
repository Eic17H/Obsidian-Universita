---
cssclasses:
  - ip
---
## Concetto

Segmentazione tramite istogramma, con una soglia. In certe situazioni, gli oggetti che appartengono alla stessa classe hanno livelli di grigio simili. Vediamo che i livelli di grigio spesso seguono delle mode, se vediamo che i valori nell'istogramma sono concentrati intorno a due valori (due colline nell'istogramma) diciamo che ci sono due mode e quindi è una distribuzione ==bimodale==.

Potrebbe non andare bene usare la stessa soglia per tutta l'immagine, potrebbe essere necessario considerare il contesto dell'intorno di un pixel, in tal caso parliamo di ==soglia variabile==.

Immaginiamo che l'immagine abbia solo due classi: oggetto e sfondo. Dobbiamo assegnare ciascun pixel a una delle due classi. Con il thresholding, lo facciamo semplicemente confrontando la sua intensità con una o più soglie. È semplice da capire e computazionalmente leggero.

Funziona bene quando abbiamo un oggetto chiaro su uno scuro o viceversa, quindi quando c'è alto contrasto tra le due classi. In questo caso, nell'istogramma troviamo una valle tra le mode. Con una soglia globale, possiamo semplicemente mettere la soglia in quella valle. Possiamo anche avere una soglia variabile, cioè una soglia che cambia al variare delle coordinate.

Quanto detto vale quando abbiamo solo due classi. Ma l'istogramma potrebbe essere trimodale, magari con oggetti di due tipi su uno sfondo.

A ogni classe associamo un valore in output. Con due classi sono tendenzialmente $0$ e $1$.

### Difficoltà

Certe volte il problema può sembrare semplice, ma in realtà non può essere risolto con una soglia globale. Per esempio in presenza di rumore. In quel caso possiamo provare a ridurre il rumore e vedere che succede.

![[Pasted image 20261119113214.png]]

C'è anche il problema dell'illuminazione. Addirittura un'immagine che idealmente sarebbe bimodale potrebbe ottenere una terza moda.
![[Pasted image 20261119113238.png]]

Per esempio in quest'immagine celebre, A e B sono di classi diverse ma hanno lo stesso colore:
![[Pasted image 20261119112019.png]]

## Trovare la soglia

### Globale

#### Algoritmo iterativo

L'algoritmo per la soglia globale è di tipo iterativo:
* Parti da una soglia iniziale $T$.
* Separa in due classi usando $T$:
	* $G_1$ dove l'intensità è $\geq T$.
	* $G_2$ dove l'intensità è $< T$.
* Calcola $m_1$ ed $m_2$, le medie dei livelli di grigio delle due classi.
* Aggiorna la soglia come la media $T = \frac12(m_1+m_2)$.
* Fermati quando $\Delta T < T_0$, un parametro predefinito.

Questo algoritmo funziona bene quando c'è una valle netta che separa le mode.

#### Otsu

C'è anche un altro metodo, il metodo di Otsu, che trova la soglia globale migliore. Si basa su questa domanda: nella segmentazione dobbiamo trovare se assegnare un pixel a una classe o un'altra, usando solo il livello di grigio. Può essere visto come una sorta di problema decisionale. Quindi dobbiamo provare a minimizzare l'errore che commettiamo nell'assegnazione di un pixel a una classe o a un'altra. Se l'assegnazione è fatta bene, i pixel sono stati assegnati in modo tale che i pixel che appartengono a una classe sono simili tra di loro, cioè se valutiamo la varianza dei livelli di grigio presenti in ogni classe, questa deve essere bassa. In più, le classi devono essere diverse tra loro, quindi la varianza tra le classi deve essere alta.

Il metodo di Otsu trova la soglia che minimizza la varianza intra-classe e massimizza la varianza inter-classe. Copia l'algoritmo dalle #slide. Ci sono 7 slide di algoritmo.

Il metodo di Otsu è stato poi esteso a istogrammi con più di due mode.

### Soglia variabile

Ci sono due metodi principali:

* Partiziona l'immagine e stima una soglia indipendentemente per ogni parte.
* Stima una soglia per ogni pixel a seconda del suo intorno (utile quando l'illuminazione varia gradualmente per tutta l'immagine).

Vediamo la seconda: #todo 

![[Pasted image 20261119120027.png]]

Un altro modo era la [[Morfologia matematica|trasformazione top-hat]].