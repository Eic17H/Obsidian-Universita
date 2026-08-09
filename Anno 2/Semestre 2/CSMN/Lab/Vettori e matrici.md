---
cssclasses: csmn
---
Per convenzione, sia in che fuori MatLab, le matrici si chiamano con le lettere maiuscole e i vettori con le lettere minuscole.

Teoria: [[Vettori]], [[Anno 2/Semestre 2/CSMN/Teoria/Matrici]]
## Creare matrici

### Letterali

In MatLab appunto tutto è una matrice. `x=10`, `x` è una matrice 1x1. `[1 2 3]` è un vettore riga, quindi una matrice 1x3. Per fare più righe si usa il `;`: `[1 2 3; 4 5 6]`, le righe devono essere della stessa lunghezza. Quindi per fare un vettore colonna si fa `[1; 2; 3]`.

### Matrici semplici

`eye(n)` genera la matrice identità di dimensione $n\times n$. `eye(m,n)` restituisce una matrice $m \times n$ che ha le prime $m$ righe della matrice identità $n \times n$, o viceversa se $m>n$.

`zeros(n)` e `zeros(m,n)` sono simili ma per matrici contenenti solo $0$, e `ones()` per matrici contenenti solo $1$.

### Casuali

`rand()` genera per numeri casuali tra $0$ e $1$ con distribuzione uniforme, `randn()` usa la distribuzione gaussiana con $μ=0$ e $σ=1$.

`randi()` genera numeri interi casuali. Se il primo parametro è un vettore contenente due numeri, saranno usati come minimo e massimo. Se il primo parametro è un solo numero, sarà usato come massimo, e il minimo sarà $1$.

### Triangolari e diagonali

`tril(A)` estrae una matrice triangolare inferiore da $A$, mentre `triu(A)` estrae quella superiore. Viene mantenuta la diagonale.

`diag()` è una funzione polimorfica. Applicata a una matrice, estrae la diagonale e la mette in un vettore, e applicata a un vettore, genera una matrice diagonale che ha gli elementi di quel vettore nella diagonale.

Non possiamo generare una matrice diagonale direttamente, ma ci sono due modi per estrarla da una matrice qualunque: eliminare tutti gli elementi fuori dalla diagonale con `tril(triu(A))` o usare le due funzionalità di `diag()` con `diag(diag(A))`.

Altrimenti possiamo generare un vettore casuale e applicarci `diag()`.