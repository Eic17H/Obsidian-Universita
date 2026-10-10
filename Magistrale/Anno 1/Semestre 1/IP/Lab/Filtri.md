---
cssclasses:
  - ip
---
[[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri|Teoria]]

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

## Averaging

Per creare un filtro di averaging $m \times m$, basta fare `w = ones(m,m)/m/m`, perché così tutti gli elementi sono uguali e si sommano a $1$. Ovviamente questo rende più difficile rilevare i contorni degli oggetti.

```MatLab
I = imread('cameraman.tif');
figure;
subplot(1,2,1), imshow(I), title('Original image');

h = ones(5,5) / 25;

J = imfilter(I, h);
subplot(1,2,2), imshow(J), title('Filtered image');

```

![[Pasted image 20261010110243.png]]

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

## Utilizzo

### Confronto

Applichiamo a `moon.tif` queste trasformazioni:
* Negativo
* Regolazione della luminosità
* Correzione gamma ($\gamma = 0.5$, $\gamma = 2$)
* Stretching del contrasto

Per ognuna, visualizzare:
* Immagine originale
* Immagine elaborata
* Istogramma originale
* Istogramma elaborato

```MatLab
clear;

I = imread('moon.tif');
N = imcomplement(I);
L = imadd(I, 50);
G1 = im2uint8(im2double(I).^0.5);
G2 = im2uint8(im2double(I).^2);
S = imadjust(I);

figure;

subplot(6,2,1);
imshow(I);
subplot(6,2,3);
imshow(N);
subplot(6,2,5);
imshow(L);
subplot(6,2,7);
imshow(G1);
subplot(6,2,9);
imshow(G2);
subplot(6,2,11);
imshow(S);

subplot(6,2,2);
imhist(I);
subplot(6,2,4);
imhist(N);
subplot(6,2,6);
imhist(L);
subplot(6,2,8);
imhist(G1);
subplot(6,2,10);
imhist(G2);
subplot(6,2,12);
imhist(S);
```

![[Pasted image 20261009120106.png]]


Invece andava fatta per ognuna una figura con due righe e due colonne, a sinistra l'originale e a destra quella in esame. #todo 


### Pipeline

Adesso, prendiamo `telescopio.jpg` e rimuoviamo i corpi celesti piccoli. Dobbiamo usare lo smoothing (operatore di media), poi una soglia ($25\%$ del massimo). Questa è una sorta di pipeline.

```MatLab
I = imread('~/Desktop/Telescopio.png');
h = 15;
J = imfilter(I, ones(h,h)/h/h);
K = im2uint8(J > (max(J(:))/4));
L = im2uint8(im2double(I) .* im2double(K));
figure;
subplot(2,2,1);
imshow(I);
title('originale');
subplot(2,2,2);
imshow(J);
title('sfocata');
subplot(2,2,3);
imshow(K);
title('maschera');
subplot(2,2,4);
imshow(L);
title('risultato');
```

![[Pasted image 20261010114453.png]]

La logica è che gli oggetti piccoli si mischiano con lo sfondo e diventano troppo scuri nell'immagine sfocata.