Per convenzione, sia in che fuori MatLab, le matrici si chiamano con le lettere maiuscole e i vettori con le lettere minuscole.
## Autovalori e autovettori

La funzione `eig()` è polimorfica: cambia il comportamento a seconda di come la chiamate. Se la assegni a un vettore, restituisce lo spettro, se la assegni a un vettore che contiene due matrici, assegna alla prima gli autovettori e alla seconda gli autovalori in diagonale. `diag()` converte da vettore a matrice in diagonale. Per trovare il raggio spettrale, puoi fare `max(abs(eig()))`, perché `abs()` si applica elemento per elemento.

Calcolare autovalori e autovettori. `eigs(A)` ci dà gli autovalori, `[V, D] = eigs()` mette in `V` gli autovettori come colonne, e in `D` gli autovalori nella diagonale. Per prendere un vettore colonna da quel `D` facciamo `diag(D)`.

## Dimensione

Per vedere la lunghezza di una matrice si usa `size()`. Restituisce una tupla, il cui primo elemento è il numero di righe e il secondo è il numero di colonne.

## Creare matrici

### Letterali

In MatLab appunto tutto è una matrice. `x=10`, `x` è una matrice 1x1. `[1 2 3]` è un vettore riga, quindi una matrice 1x3. Per fare più righe si usa il `;`: `[1 2 3; 4 5 6]`, le righe devono essere della stessa lunghezza. Quindi per fare un vettore colonna si fa `[1; 2; 3]`.

### Matrici semplici

`eye(n)` genera la matrice identità di dimensione nxn. `eye(m,n)` restituisce una matrice mxn che ha le prime m righe della matrice identità nxn.

`zeros(n)` e `zeros(m,n)` sono simili ma per matrici contenenti solo 0. `ones()` per 1.

### Casuali

`rand()` per numeri casuali tra 0 e 1 con distribuzione uniforme, `randn()` distribuzione gaussiana con media 0 e sigma 1 (vedi DeM).

`randi()` prende un vettore con due elementi (gli estremi) e poi la taglia. Se il primo parametro è un numero, assume che il minimo sia 1.

### Triangolari e diagonali

Non possiamo generare una matrice triangolare direttamente. Facciamo una matrice normale, e poi ne estraiamo la diagonale usando `tril()` e `triu()`. Invece volendo possiamo estrarre la diagonale di una matrice: `diag(A)` estrae la diagonale in un vettore, e `diag(diag(A))` lo trasforma in una matrice diagonale. Altrimenti possiamo generare un vettore casuale e diagonalizzare quello.

### Ortogonali

Se abbiamo una qualunque matrice `A` e facciamo `A*A'`, ci esce una matrice altrettanto qualunque. Se facciamo `Q=orth(A)`, allora `Q*Q'` è la matrice identità. Perché? Perché è una matrice ortogonale e... da vedere dopo non capisco. Colonne ortogonali tra di loro, `orth()` trova una base del sottospazio generato dalla matrice, di vettori linearmente indipendenti tra di loro. Certamente non ho capito.

## Operazioni tra matrici

Operazioni tra matrici: `A+B` è la somma matriciale, casella per casella. Stessa cosa `A-B`. `A*B` è il prodotto righe per colonne, quindi vale il controllo di dimensione. `A^2` è `A*A`. Per fare il prodotto elemento per elemento facciamo `A.*B`. `A==B` ci dà una matrice con `0` dove sono diverse e `1` dove sono uguali (*maschera booleana*), lo stesso vale per `A<B` e `A>B` eccetera.

Per accedere agli elementi di una matrice si usano le parentesi tonde, e gli indici partono da 1. `A(1,1)` è l'elemento in alto a sinistra. Per prendere tutti gli elementi, letti colonna per colonna, in un vettore colonna facciamo `A(:)`. Per prendere tutta la seconda riga, `A(2,:)` (`:` significa "tutto"). Per un intervallo, `A(1,2:3)`, "prima riga, dal secondo al terzo". Oppure facciamo `A(1,2:end)`, a differenza di Python. Per selezionare un "riquadro" facciamo per esempio `A(2:3,1:2)`.

`size(A,1)` ci dà boh. E c'è anche `size(A,2)`. Credo siano numero di righe e numero di colonne.

Per calcolare l'inversa di una matrice, un modo è la funzione `inv()`. Il problema è che è un po' instabile, infatti se fai `A*inv(A)` alcuni `0` in realtà risultano `-0.000` o qualcosa del genere. Un altro modo è `A^-1`. `det(A)` ti dà il determinante, `rank()` il rango.

La trasposta si fa con `A'`, semplicemente l'apostrofo. In realtà ti fa l'aggiunta, ma l'aggiunta di una matrice reale è uguale alla trasposta.

Per calcolare la norma di una matrice o di un vettore usiamo `norm()`. Per i vettori usa la norma euclidea, per le matrici la norma di Frobenius, di default. Per scegliere, `norm(A,1)`, `norm(A,2)`, `norm(A,inf)`.

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