---
cssclasses:
  - ip
---
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