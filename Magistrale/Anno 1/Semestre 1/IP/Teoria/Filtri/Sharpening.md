---
cssclasses:
  - ip
---
#damettereinordine

Il valore di un pixel viene modificato tenendo conto dei pixel in un intorno opportuno. Possono essere lineari o non lineari.

Finora abbiamo visto i filtri di smoothing, oggi finiamo i filtri spaziali vedendo gli operatori di sharpening.

Lo smoothing ha l'obiettivo di eliminare le piccole fluttuazioni.

Lo sharpening mira a rimuovere la sfocatura, amplificare i bordi (edge detection), e purtroppo anche il rumore. I bordi sono parti dell'immagine dove il colore cambia molto in poco spazio.

Lo sharpening si basa sulle derivate (differenziazione spaziale). Derivata prima e seconda.
## Derivata

<span class="am">[[Derivate]]</span>

Trattiamo immagini discrete, quindi la derivata si approssima con differenze. La derivata ci dice quanto cambia in fretta una funzione.

Prendiamo $1$ come unità di misura pari a un pixel. Nella derivata continua, definivamo $h$ come la lunghezza di un "passo" di misurazione, e facevamo il limite con $h \to 0$. Adesso però non possiamo scendere sotto $1$, quindi facciamo il limite con $h \to 1$, che equivale a $h=1$. Perciò, data una funzione $f(x)$ con $x \in \mathbb N$, $f'(x)=f(x+1)-f(x)$.

Questo rispetta anche le proprietà che diamo al concetto di derivata: se la funzione è orizzontale, la derivata deve essere nulla, se la funzione scende la derivata è negativa, e se sale è positiva.

#slide grafico.

La professoressa dà una giustificazione un po' diversa per la stessa formula ma credo che questa sia più semplice e dubito che importi per l'esame.

## Gradiante

Però noi vogliamo lavorare con immagini, in due dimensioni. Dobbiamo quindi usare il gradiente, $\nabla f$. Questo è:$$\nabla f = \left[ \dfrac{\partial f}{\partial x}, \dfrac{\partial f}{\partial y} \right]$$
Cosa?????? Non ho capito niente, #slide . Essenzzialmente con la cotangente trovi $\theta$ e con la norma a $2$ di $\nabla f$ trovi la magnitudine del gradiente, metti una soglia sulla magnitudine e segni tutto ciò che ha magnitudine alta, quelli sono i tuoi edge #todo.

Tra l'altro, ledge è perpendicolare alla direzione del gradiente.

L'edge ideale è un cambiamento immediato, magari da $0$ a $255$. Questo e l'edge a step, e non succede quasi mai nelle immagini reali. Solitamente è graduale, edge a rampa, e dobbiamo riconoscerlo vedendo la variazione lungo l'edge, soprattutto considerando che c'è di mezzo anche il rumore. #todo: immagini con istogramma generato da MatLab.

E io ci provo a farlo con MatLab (ho sprecato tempo e ho fallito provando a farlo con due for annidati).

Essenzialmente invece la derivata seconda è $f(x+1)+f(x-1)-2f(x)$, vedi #slide mi sono distratto.
### Laplaciana

L'operatore laplaciano continuo è definito in termini della derivata seconda:$$L[f(x,y)]=\nabla ^2 f(x,y) = \dfrac{\partial ^2 f(x,y)}{\partial x^2}\dfrac{\partial ^2 f(x,y)}{\partial y ^2}$$
Vediamo com'è con le funzioni discrete, usando la definizione appena vista: facendo la derivata parziale in $x$ teniamo $y$ costante, e viceversa.$$L[f(x,y)] = f(x+1,y)+f(x-1,y)-2f(x,y)+f(x,y+1)+f(x,y-1)-2f(x,y)$$
Possiamo quindi raggruppare:

$$L[f(x,y)] = f(x+1,y)+f(x-1,y)+f(x,y+1)+f(x,y-1)-4f(x,y)$$

E lo possiamo già esprimere come filtro, perché prende in input $9$ pixel e ne rende uno:$$L = \begin{bmatrix} 0 & 1 & 0 \\ 1 & -4 & 1 \\ 0 & 1 & 0 \end{bmatrix}$$
Questa però ci dà solo la derivata verticale e la derivata orizzontale. E se vogliamo considerare tutte le direzioni? Semplice$$L = \begin{bmatrix} 1 & 1 & 1 \\ 1 & -8 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$
Ovviamente la somma di tutti questi elementi è sempre $0$, perché se l'immagine non ha variazione ci deve uscire $0$ dappertutto.

Però non ci basta avere la derivata. Vogliamo lo sharpening di un'immagine, cioè la stessa immagine ma coi bordi amplificati, qua abbiamo solo i bordi. Basta fare la sottrazione.

Ehhhhhhhhhhhhhhhhhhhhh cos'è quello. #slide 

Ah no ok semplicemente approssimi la norma a 2 con la norma a 1.

#### Operatori simili

Possiamo usare la stessa logica per ottenere altri operatori, come l'operatore di Sobel.$$\begin{bmatrix}-1\phantom{-} & -2\phantom{-} & -1\phantom{-} \\ 0 &0&0 \\ 1&2&1\end{bmatrix} \qquad \begin{bmatrix}-1 & 0 & 1 \\ -2 &0&2 \\ -1&0&1\end{bmatrix} $$

Uno verticale e uno orizzontale.

E poi c'è una piccola variazione che è quella di Prewitt, #todo.

Ehhhhh guarda Sobel, #slide metti l'immagine.