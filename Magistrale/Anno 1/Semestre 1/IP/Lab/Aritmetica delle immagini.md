Aritmetica delle immagini:
* `imabsdiff`: differenza assoluta pixel per pixel;
* `imadd`: somma pixel per pixel, o somma dello stesso valore a tutti i pixel;
* `imcomplement`: complemento di un'immagine;
* `imdivide`: divisione pixel per pixel, o divisione di tutti i pixel per lo stesso valore;
* `imlincomb`: combinazione lineare di due immagini, pixel per pixel;
* `immultiply`: prodotto pixel per pixel, o prodotto di tutti i pixel per lo stesso valore;
* `imsubtract`: sottrazione pixel per pixel, o differenza tra tutti i pixel e lo stesso valore.

Si applicano poi le indicizzazioni con `[]` che si applicavano già alle matrici. Per esempio, un range, uno step, fissare una riga o colonna e restituire un array monodimensionale. Quindi `f(1:2:end, 1:2:end)` prende solo i pixel con entrambe le posizioni dispari, `f(150, :)` ci dà la 150ma riga di pixel dell'immagine, da sinistra a destra.

Ci avviciniamo piano piano a quello che faremo all'ultima lezione: quattro casi di studio in cui applicheremo tutti i passaggi visti per risolvere un problema.

Generiamo delle immagini.

Un gradiente da nero (a sinistra) a bianco (a destra), verticalmente costante, detto rampa:
```MatLab
for i = 1:256
	for j = 1:256
		A(i,j) = j-1;
	end
end
A = mat2gray(A);
imshow(A);
```

![[Pasted image 20261002114949.png]]

Se non usassimo `mat2gray`, sarebbe `double`, e quindi la prima riga di pixel sarebbe $0$, ma il resto sarebbe $\geq 1$ e quindi tutto bianco. Sarebbe un problema di *visualizzazione* e non di *elaborazione*, perché i dati andrebbero bene.

Possiamo anche usare `A = uint8(A);` in questo caso, solo perché i valori vanno già da $0$ a $255$. Oppure `imshow(A, []);`.

Proviamo a creare un cerchio di raggio 80, bianco su nero.

```MatLab
for i = 1:256
	for j = 1:256
		if (sqrt((128-i)*(128-i)+(128-j)*(128-j))<80)
           B(i,j) = 1;
        else
            B(i,j) = 0;
        end
	end
end
imshow(B)
```

![[Pasted image 20261002115003.png]]

Quindi usiamo la seconda come maschera per la prima.

```MatLab
C = immultiply(A,B);
imshow(C)
```

![[Pasted image 20261002115018.png]]

Adesso il contrario, prendiamo un'immagine in input e analizziamola, mostrando quanto rosso, verde e blu c'è nell'immagine.

Questa è la mia soluzione, ma le immagini che ne risultano sono in scala di grigio:

```MatLab
A = imread('peppers.png');
imshow(A);
R = A(:, :, 1);
G = A(:, :, 2);
B = A(:, :, 3);
imshow(R)
imshow(G)
imshow(B)
```

![[Pasted image 20261002121446.png]]

Questa è la soluzione vera:

```MatLab
A = imread('peppers.png');
imshow(A);
R = A;
G = A;
B = A;
R(:, :, 2:3) = 0;
G(:, :, 1) = 0;
G(:, :, 3) = 0;
B(:, :, 1:2) = 0;
imshow(R)
imshow(G)
imshow(B)
```

![[Pasted image 20261002120655.png]]

Quando stampiamo, ce le mette a destra in colonna. Possiamo anche visualizzarle in modo più comodo, creando più riquadri. Usiamo per esempio `subplot(2,2,1)` per dividere il plot in $2$ righe e $2$ colonne e selezionare il primo riquadro.

```MatLab
figure
subplot(1,4,1)
imshow(A)
title("Immagine RGB")
subplot(1,4,2)
imshow(R)
title("Canale rosso")
subplot(1,4,3)
imshow(G)
title("Canale verde")
subplot(1,4,4)
imshow(B)
title("Canale blu")
```

![[Pasted image 20261002120655.png]]

Adesso invece convertiamo noi un'immagine da RGB a scala di grigi, e confrontiamo il nostro risultato con `rgb2gray`:

```MatLab
A = imread('peppers.png');
B = imdivide(A(:,:,1),3);
B = imadd(B, imdivide(A(:,:,2),3));
B = imadd(B, imdivide(A(:,:,3),3));
figure
subplot(1,3,1)
imshow(A)
title("Originale")
subplot(1,3,2)
imshow(B)
title("Versione mia")
subplot(1,3,3)
imshow(rgb2gray(A))
title("Versione MatLab")
```

![[Pasted image 20261002121154.png]]

Vediamo che la versione di MatLab ha una luminosità che corrisponde meglio alla nostra percezione. Questo è perché, nel formato RGB, $255$ di blu vale quanto $255$ di verde, ma noi percepiamo il blu come più scuro del verde, ed `rgb2gray()` tiene conto di questa percezione.

Calcoliamo la differenza tra le due immagini, e poi troviamo l'errore medio. Va be' #slide, fai la differenza assoluta e poi fai mean() quella e ti esce un numero circa 10.