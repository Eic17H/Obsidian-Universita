---
cssclasses:
  - ip
---
#damettereinordine

Oltre alle semplici operazioni aritmetiche tra immagini,

### Negativo

Le parti chiare diventano scure e viceversa. Sia $L$ il numero di livelli di grigio, per esempio $255$, la funzione è $g=L-1-f$.

### Luminosità

Voglio rendere più chiara un'immagine scura o viceversa, $g=f+c$, dove $c>0$ rende l'immagine più chiara. Ovviamente dobbiamo limitare $g$ al range di riferimento, per esempio $[0,255]$.

### Logaritmica

$g = c\cdot \log(1+f)$, amplifica la varietà di toni di grigio nelle zone scure, utile quando serve precisione come le immagini astronomiche e mediche.

### Correzione gamma

Rendere l'immagine più chiara o più scura, $g=cf^\gamma$, lavorando nel range $[0,1]$. Qui, $\gamma>0$ rende l'immagine più scura.

### Toni di grigio

Ci sono di due tipi.

#### Contrast stretching, histogram stretching

L'istogramma è molto compattato, quindi lo modifichiamo perché siano utilizzati tutti i valori disponibili. Quindi il livello di grigio minimo *presente nell'immagine* viene portato al livello minimo disponibile, e lo stesso vale per il chiaro.

#### Equalizzazione dell'istogramma

Essenzialmente, se in input abbiamo un'immagine in cui ci sono certe intensità molto più comuni, in output sono tutte ugualmente comuni, quindi l'istogramma diventa (quanto più possibile) piatto.

Come si fa? $H(x)$ è l'istogramma dell'immagine in input, vogliamo una funzione $y=y(x)$ tale che l'istogramma dell'immagine in output sia $G(y)=C$, con un certo $C$ costante.

La trasformazione chiaramente deve essere monotòna, cioè $x_1 < x_2 \to y(x_1) < y(x_2)$, perciò:$$\dfrac{dy}{dx}=\dfrac1CH(x) \Rightarrow y(x)=\dfrac1C \int\limits_0^x H(x) dx$$
Ma l'immagine è discreta, quindi:$$y(x)=\dfrac1C\sum\limits_{k=0}^\ldots\ldots\ldots\ldots$$
#slide 

Quindi il processo è:
* Trovare l'istogramma $H(k)$
* ......................................................

Ma non lo implementeremo su MatLab, visto che ci sono delle implementazioni black box già incluse. Ma il senso è questo.

Ah non stavo più seguendo, #slide, figo, roba di matrici.