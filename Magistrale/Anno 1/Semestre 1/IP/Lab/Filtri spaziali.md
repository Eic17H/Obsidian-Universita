---
cssclasses:
  - ip
---
#damettereinordine

[[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Filtri spaziali|Teoria]]

Un filtro in MatLab è semplicemente una matrice.

Usiamo la funzione `imfilter(f, w, filtering_mode, boundary_options, size_options)` per fare $f*w$.

`filtering_mode` permette di scegliere tra convoluzione (il filtro viene ruotato di $180°$) e combinazione (il filtro è dritto).

`boundary_option` può essere:
* Un numero, di default `0`, che mette quel valore a tutti i pixel fuori dall'immagine;
* `'symmetric'`, i bordi dell'immagine si comportano come specchi;
* `'replicate'`, un pixel fuori dal bordo è uguale al pixel più vicino;
* `'circular'`, effetto pacman.

`size_options` determina le dimensioni dell'immagine in output:
* `'same'`: Quello di default, rimane uguale all'input;
* `'full'`: si estende un po' oltre i bordi perché il filtro sporge.

## Filtri speciali

`fspecial()` crea un filtro. Prende in input un tipo come stringa e altri parametri che dipendono dal tipo.
* `'average'`: averaging come quellp che abbiamo appena creato:
	* Prende in input `HSIZE`, che può essere un vettore con due elementi che sono righe e colonne, o uno scalare per un filtro quadrato, di default $3 \times 3$;
* `'disk'`: media rotonda:
	* Prende in input `RADIUS`, che è il raggio escluso il centro, quindi risulta in una matrice $(2r+1)\times(2r+1)$, di default $5$;
* `gaussian`: gaussiana:
	* Prende in input `HSIZE`, che può essere un vettore o uno scalare, di default $3 \times 3$;
	* E `SIGMA`, che è il $\sigma$ positivo della formula, di default $0.5$;
* `laplacian`: approssima la derivata seconda bidimensionale:
	* Il parametro `ALPHA`, tra $0$ e $1$, di default $0.2$, controlla la forma;
* `log`: laplaciana rotazionalmente simmetrica applicata alla gaussiana:
	* `HSIZE` è per la gaussiana;
	* `SIGMA` è $\sigma$;
* `motion`: ti dismossa la foto mossa:
	* `LEN` la lunghezza, in pixel, della mossatura della foto, di default $9$;
	* `THETA`: l'angolo della mossatura della foto, antiorario partendo da destra, di default $0$;
* `prewitt`: sharpening orizzontale, una costante $\begin{bmatrix}\phantom{-}1&\phantom{-}1&\phantom{-}1\\\phantom{-}0&\phantom{-}0&\phantom{-}0\\-1&-1&-1\end{bmatrix}$ che enfatizza gli edge orizzontali approssimando un gradiente verticale, si può trasporre per fare lo sharpening verticale;
* `sobel`: simile, ma è $\begin{bmatrix}\phantom{-}1&\phantom{-}2&\phantom{-}1\\\phantom{-}0&\phantom{-}0&\phantom{-}0\\-1&-2&-1\end{bmatrix}$.


## Nello specifico

Vedi i [[Magistrale/Anno 1/Semestre 1/IP/Lab/Smoothing|fiiltri di smoothing]] e i [[Magistrale/Anno 1/Semestre 1/IP/Lab/Sharpening|filtri di sharpening]].