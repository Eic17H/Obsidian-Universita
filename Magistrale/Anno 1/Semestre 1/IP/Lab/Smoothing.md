---
cssclasses:
  - ip
---
#damettereinordine

[[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Smoothing|Teoria]]
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

## Pipeline

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

Quell'immagine non è inclusa con MatLab quindi la metto qui:

![[Telescopio.png]]

Ovviamente nel codice bisogna mettere il percorso corretto.