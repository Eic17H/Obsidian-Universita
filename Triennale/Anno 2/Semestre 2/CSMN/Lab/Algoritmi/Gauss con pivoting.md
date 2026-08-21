---
cssclasses: csmn
---
L'algoritmo riscontra un problema quando il denominatore di $m$ si annulla. Per risolvere questo problema, possiamo scambiare la riga in questione con un'altra riga in modo tale che l'elemento sulla diagonale non sia nullo, ottenendo un'altra matrice equivalente.

Questo si chiama *pivoting*, e l'elemento diagonale è detto elemento pivot. Per questioni di stabilità numerica, è sempre meglio scambiare con la riga che ha l'elemento massimo, per ottenere la frazione più piccola possibile.

```MatLab
function [U,b] = gauss_pivot(A,b)
    [n,m] = size(A);
    if m~=n
        error("La matrice A deve essere quadrata");
    end
    if n~=size(b,1)
        error("La dimensione di b deve essere compatibile con A");
    end
    if abs(det(A)) < 1e-14
        error("La matrice A è singolare")
    end
    for k=1:n-1
        % Ricerca della riga con elemento massimo
        [~,pos]=max(abs(A(k:n,k)));
        l = pos + k - 1;
        % Scambio
        A([k l],:) = A([l k],:);
        b([k l]) = b([l k]);
        % Metodo di Gauss normale
        for j=k+1:n
            m = A(j,k)/A(k,k);
            A(j,:)=A(j,:)-m*A(k,:);
            b(j)=b(j)-m*b(k);
        end
    end
    U=A;
end
```
