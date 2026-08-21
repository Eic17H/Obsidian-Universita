---
cssclasses:
  - csmn
---
[[Fattorizzazione PALU]]

Teoria: [[Triangolari]]

Una matrice quadrata può essere espressa sotto forma di prodotto di due matrici triangolari, di cui una inferiore e una superiore: $A=LU$. Per trovare $U$ si usa il metodo di Gauss. $L$ è invece definita come segue:$$l_{ij} = \left\{\begin{matrix} m_{ij} & i>j \\ 1 & i=j \\ 0 & j>i\end{matrix}\right.$$Dove $m_{ij}$ è il coefficiente per la riga $j$ e la colonna $k$ trovato nel metodo di Gauss.

Questa fattorizzazione si può usare per risolvere un sistema. Avendo $Ax=b$, lo posso riscrivere come $LUx=b$, definire il vettore $y=Ux$ e ottenere un sistema:$$\left\{ \begin{matrix}L{y} = {b} \\ U{x} = {y} \end{matrix} \right.$$
```MatLab
function [L,U]=alu(A)
    [n,m] = size(A);
    if m~=n
        error("La matrice A deve essere quadrata");
    end
    if abs(det(A)) < 1e-14
        error("La matrice A è singolare")
    end
    n=size(A,1);
    L = eye(n);
    for k = 1:n-1
        for j = k+1:n
	        % Metodo di Gauss
            m = A(j,k)/A(k,k);
            A(j,:)=A(j,:)-m*A(k,:);
            % Gli elementi di L sono i coefficienti
            L(j,k)=m;
        end
    end
    U=A;
end
```