---
cssclasses: csmn
---

## Operazioni

### Operazioni semplici

`A+B` è la somma matriciale, elemento per elemento, e lo stesso vale per `A-B`. `A*B` è il prodotto righe per colonne. `A^2` è `A*A`. Il prodotto elemento per elemento si ottiene con `A.*B`. `A==B` restituisce una matrice che ha `0` nelle posizioni in cui le due matrici sono diverse e `1` dove sono uguali (*maschera booleana*); lo stesso vale per `A<B` e `A>B`.

Per calcolare l'inversa di una matrice, un modo è la funzione `inv()`. È una funzione un po' instabile, infatti `A*inv(A)` alcuni elementi saranno molto vicini a $0$, ma non esattamente $0$, per esempio `-0.000`. Un altro metodo è `A^-1`.

`det(A)` restituisce il determinante, `rank()` il rango.

La trasposta si ottiene con `A'`, semplicemente l'apostrofo. In realtà è l'aggiunta, ma l'aggiunta di una matrice reale è uguale alla trasposta.

### Accedere agli elementi

Per accedere agli elementi di una matrice si usano le parentesi tonde, gli indici partono da 1. `A(1,1)` è l'elemento in alto a sinistra.

Per mettere tutti gli elementi, letti colonna per colonna, in un vettore colonna si usa `A(:)`. Per selezionare tutta la seconda riga, `A(2,:)`. Per un intervallo, `A(1,2:3)`, "prima riga, dal secondo al terzo". Per posizionare un estremo alla fine della matrice, si usa `end`: `A(1,2:end)`. Si possono anche selezionare più righe e più colonne insieme, per esempio `A(2:3,1:2)`.

### Dimensione

`size(A)` restituisce il numero di righe e il numero di colonne in un vettore. `size(A,1)` restituisce solo il numero di righe, e `size(A,2)` restituisce il numero di colonne.

<div style="break-after: page;"></div>

### Norma

Teoria: [[Norme]]

Per calcolare la norma di una matrice o di un vettore usiamo `norm()`. Per i vettori usa la norma euclidea, per le matrici la norma di Frobenius, di default. Per scegliere una norma specifica si usa il secondo parametro: `norm(A,1)`, `norm(A,2)`, `norm(A,inf)`.

### Autovalori e autovettori

Teoria: [[Autovalori e autovettori]]

La funzione `eig()` è polimorfica: cambia il comportamento a seconda di come la si chiama. Se la si assegna a un vettore, restituisce lo spettro, se è assegnata a un vettore che contiene due matrici, assegna alla prima gli autovettori e alla seconda gli autovalori in diagonale. `diag()` converte da vettore a matrice in diagonale. Per trovare il raggio spettrale, si può usare `max(abs(eig()))`, perché `abs()` si applica elemento per elemento.

## Esempio

Esercizio: prendi n casuale tra 10 e 30, rigenera finché non è divisibile per 5, poi fai una matrice n/5 x n/5, con numeri da 1 a n in ordine riga per riga. Io l'ho fatto così:
```MatLab
n = randi([10,30])
while(mod(n,5))
    n = randi([10,30])
end
m = n/5;
A = zeros(m);
for i=1:(m*m-1)
    A(floor(i/m)+1, mod(i,m)+1) = i+1;
end
A
```
Poco dopo, il tutor ha detto che è utile `reshape()`: dato un vettore e una taglia di matrice, avvolge il vettore in una matrice. Oppure, data una matrice e una taglia di vettore, appiattisce la matrice in un vettore. Devono essere taglie compatibili.
Poi ha detto che usare il for è il metodo brutto. Infatti ha usato `A = reshape(1:n,(n/5), [])`, che c'è da dire è molto più bello. `[]` gli fa calcolare in automatico... ecco era sbagliata la consegna. Non deve essere una matrice quadrata, è quadrata solo se n=25, altrimenti non ci sarebbero n elementi. Va be'.
Insomma lui ha fatto 
```MatLab
n = randi([10,30])
while(mod(n,5))
    n = randi([10,30])
end
A = reshape(1:n,(n/5), [])
```