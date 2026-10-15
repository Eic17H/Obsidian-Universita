---
cssclasses:
  - ip
---
#damettereinordine

O filtri locali.

[[Magistrale/Anno 1/Semestre 1/IP/Lab/Filtri spaziali|Lab]]

Vediamo filtri di [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Smoothing|smoothing]] e filtri di [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Sharpening|sharpening]].

## Trasformazioni locali

Possono essere lineari o nonlineari. E possono essere operatori di smoothing e operatori di sharpening.

Lo smoothing riduce le variazioni, quindi riduce il rumore, ma anche gli edge sono variazioni, quindi rendono gli edge meno chiari. Lo sharpening fa l'opposto.

Oggi parliamo di smoothing.

### Lineari e non lineari

Un operatore è lineare se, dato un pixel in coordinate $(i,j)$, l'output $g(i,j)$ è dato da una combinazione lineare di un intorno di $f(i,j)$ in input.

Kernel, o maschera di convoluzione, o filtro. Ha una formula complicata che vediamo nelle slide, ma la possiamo indicare come $f*w$, dove $w$ è il kernel. Associa a ogni posizione intorno al pixel in questione un certo peso.

Essenzialmente prendiamo l'esempio $3 \times 3$, quindi il nostro $w$ è una matrice $3 \times 3$. Abbiamo in input una matrice $3 \times 3$ di pixel. L'output sarà la somma degli elementi della matrice che risulta dal prodotto puntuale delle due matrici.

Essenzialmente:$$\begin{bmatrix}1&2&3\\4&5&6\\7&8&9\end{bmatrix}*\begin{bmatrix}0.9&0.8&0.7\\0.6&0.5&0.4\\0.3&0.2&0.1\end{bmatrix}=1\cdot0.9+2\cdot0.8+\ldots=16.5$$
Me lo recupero dalle #slide sono troppo fuso

Ah no aspetta la convoluzione è ruotata. Ma perché? Non importa, perché di solito sono simmetrici.

Rumore di tipo sale-e-pepe.