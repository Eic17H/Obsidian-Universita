---
cssclasses:
  - csmn
---
[[Gauss con pivoting|Versione con pivoting]]

Teoria: [[Gauss]]

L'algoritmo di Gauss permette di trasformare una qualunque matrice in una matrice triangolare superiore, in modo tale che i sistemi associati alle due matrici abbiano la stessa soluzione, cioè le matrici sono equivalenti.

Si annullano tutti gli elementi sotto la diagonale. Per farlo, si sottrae dalla riga che si sta modificando un'altra riga, moltiplicata per un certo coefficiente $m$. Il coefficiente è scelto in modo tale che l'elemento non nullo più a sinistra si annulli, quindi è il rapporto tra l'elemento non nullo più a sinistra delle due righe.

```MatLab
function [U,b] = gauss(A,b)
    
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
        for j=k+1:n
            % Coefficiente per la riga
            m = A(j,k)/A(k,k);
            % Riga j <- Riga j - m*(Riga k)
            A(j,:)=A(j,:)-m*A(k,:);
            % Lo stesso, ma per il vettore
            b(j)=b(j)-m*b(k);
        end
    end
    U=A;
end
```