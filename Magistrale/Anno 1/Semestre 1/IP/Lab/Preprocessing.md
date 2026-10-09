---
cssclasses:
  - ip
---
Per generare e visualizzare un istogramma usiamo `imhist(I, N)`, dove `I` e l'immagine ed `N` non lo mettiamo per tenerlo default a $256$.

Per esempio, `pout.tif` se la guardi è tremenda. C'è poco contrasto, non usa i grigi più scuri né i grigi più chiari. Quindi l'istogramma sarà tutto concentrato al centro.

```MatLab
I = imread('pout.tif');
figure;
subplot(1,2,1);
imshow(I);
subplot(1,2,2);
imhist(I);
```

![[Pasted image 20261002122149.png]]

Se separi un'immagine a colori nei tre canali, e plotti i tre canali separatamente, esce una cosa carina.

```MatLab
I = imread('football.jpg');
figure;
subplot(1,2,1);
imshow(I);
[yred,x] = imhist(I(:,:,1));
[ygrn,x] = imhist(I(:,:,2));
[yblu,x] = imhist(I(:,:,3));
subplot(1,2,2);
plot(x, yred, 'Red', x, ygrn, 'Green', x, yblu, 'Blue');
```

![[Pasted image 20261002122802.png]]

Adesso generiamo e plottiamo l'istogramma delle immagini `cameraman.tif`, `moon.tif`, `pout.tif`, e facciamo una tabella con immagine, livello medio e contrasto per tutte e tre.

Il contrasto (idea mia ahaha) è la deviazione standard, con `std()`.

```MatLab
C = imread('cameraman.tif');
M = imread('moon.tif');
P = imread('pout.tif');
figure;

subplot(2,3,1);
imshow(C);
title('Cameraman');
subplot(2,3,2);
imshow(M);
title('Moon');
subplot(2,3,3);
imshow(P);
title('Pout');

subplot(2,3,4);
imhist(C);
subplot(2,3,5);
imhist(M);
subplot(2,3,6);
imhist(P);
```

![[Pasted image 20261002123815.png]]

Non ho capito come devo far vedere il resto ma devo usare `table()`, #todo.

Gli altri due sono da fare a casa, #todo.

Se vediamo l'istogramma di un'immagine che figooo, in cui gli oggetti sono scuri e lo sfondo è chiaro, vediamo che l'istogramma ha due colline, cioè è bimodale. Scegliamo quindi un punto di soglia, sotto il quale tutto è oggetto e sopra il quale tutto è sfondo.

Per prendere il contorno, prendiamo i valori che si trovano le due colline, i pixel di transizione tra i due colori.


```MatLab
C = imread('cameraman.tif');
M = imread('moon.tif');
P = imread('pout.tif');
figure;

subplot(4,3,1);
imshow(C);
title('Cameraman');
subplot(4,3,2);
imshow(M);
title('Moon');
subplot(4,3,3);
imshow(P);
title('Pout');

subplot(4,3,4);
imhist(C);
subplot(4,3,5);
imhist(M);
subplot(4,3,6);
imhist(P);

cTreshold = 75;
mTreshold = 25;
pTreshold = 115;

C2 = (C > cTreshold);
M2 = (M > mTreshold);
P2 = (P > pTreshold);

subplot(4,3,7);
imshow(C2);
subplot(4,3,8);
imshow(M2);
subplot(4,3,9);
imshow(P2);

cLow = 21;
cHigh = 86;
mLow = 25;
mHigh = 150;
pLow = 108;
pHigh = 121;

C3 = ((C > cLow) .* (C < cHigh));
M3 = ((M > mLow) .* (M < mHigh));
P3 = ((P > pLow) .* (P < pHigh));

subplot(4,3,10);
imshow(C3);
subplot(4,3,11);
imshow(M3);
subplot(4,3,12);
imshow(P3);
```

![[Pasted image 20261009114224.png]]