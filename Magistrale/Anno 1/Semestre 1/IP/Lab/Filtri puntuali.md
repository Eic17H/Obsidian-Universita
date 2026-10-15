---
cssclasses:
  - ip
---
#damettereinordine

Le trasformazioni puntuali danno un valore al pixel in output in funzione solo del pixel omologo in input.

## Contrasto

### Stretching dell'istogramma

Se un'immagine non usa tutti i toni di grigio disponibili, il suo istogramma è tutto concentrato in una piccola porzione in larghezza. Usiamo `J = imadjust(I)` per allargare la porzione occupata dall'istogramma.

Ha due parametri opzionali. Il primo è una coppia di valori che rappresentano il limite minimo e massimo da considerare in input, il secondo è per il range in output.

```MatLab
I = imread("pout.tif");
J = imadjust(I);
figure;
subplot(2,2,1);
imshow(I);
subplot(2,2,2);
imshow(J);
subplot(2,2,3);
imhist(I);
subplot(2,2,4);
imhist(J);
```

![[Pasted image 20261010104249.png]]

### Equalizzazione dell'istogramma

Per l'equalizzazione si usa `J = histeq(I, nlev)`, che ridistribuisce $I$ in $nlev$ livelli di grigio. Di default $nlev$ è quello del formato che stai usando, quindi $255$.

```MatLab
I = imread('tire.tif');
J = histeq(I);
figure;
subplot(2,2,1);
imshow(I);
subplot(2,2,2);
imshow(J);
subplot(2,2,3);
imhist(I);
subplot(2,2,4);
imhist(J);
```

![[Pasted image 20261010104606.png]]

E così possiamo vedere dettagli che sembravano non esserci proprio.

L'equalizzazione era la più utile qui, ma è sempre utile? Confrontiamo con Cameraman. Con un'immagine già pulita crea artefatti.

```MatLab
I = imread("cameraman.tif");
J = histeq(J);

figure;
subplot(2,2,1);
imshow(I);
title("Originale");
subplot(2,2,2);
imshow(J);
title("Equalizzata");
subplot(2,2,3);
imhist(I);
subplot(2,2,4);
imhist(J);
```

![[Pasted image 20261010114325.png]]

## Altre

`imcomplement()` fa il negativo.

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