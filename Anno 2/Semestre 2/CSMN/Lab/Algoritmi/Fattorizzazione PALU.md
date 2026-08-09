---
cssclasses:
  - csmn
---
Una variante in cui si aggiunge una matrice $P$, che è una matrice di permutazione, cioè una matrice ottenuta tramite una serie di scambi dalla matrice identità. Data una matrice $A$, $PA$ è la matrice ottenuta eseguendo gli stessi scambi su $A$. Nel caso di questo algoritmo, $P$ corrisponde agli scambi eseguiti nel pivoting.

```MatLab
function [L,U,P] = palu_decomposition(A)
    [n,m] = size(A);
    if m~=n
        error("La matrice A deve essere quadrata");
    end
    if abs(det(A)) < 1e-14
        error("La matrice A è singolare")
    end
    P=eye(n);
    L=eye(n);
    for k=1:n-1
        % Ricerca della riga con elemento massimo
        [~,pos]=max(abs(A(k:n,k)));
        l = pos + k - 1;
        % Scambio
        A([k l],:) = A([l k],:);
        P([k l],:) = P([l k],:);
        % Bisogna modificare solo gli elementi sotto la diagonale di L
        L([k,l], 1:k-1) = L([l,k], 1:k-1);
        for j=k+1:n
            % Comportamento normale del metodo di Gauss
            m = A(j,k)/A(k,k);
            A(j,:)=A(j,:)-m*A(k,:);
            % Assegnazione di L
            L(j,k)=m;
        end
    end
    U=A;
end 
```
