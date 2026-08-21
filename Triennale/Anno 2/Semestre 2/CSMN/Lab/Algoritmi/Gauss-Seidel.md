---
cssclasses:
  - csmn
---
Teoria: [[Triennale/Anno 2/Semestre 2/CSMN/Teoria/Sistemi lineari/Metodi iterativi/Gauss-Seidel]]

La funzione ricorsiva ha $B = (D-E)^{-1}F$ e $f = (D-E)^{-1}b$.

```MatLab
function [x, k] = gauss_seidel(A, b, x0, tau, kmax)
    % Parametri opzionali
    if nargin < 3 || isempty(x0)
        x0 = zeros(size(b));
    end
    if nargin < 4 || isempty(tau)
        tau = 1e-6;
    end
    if nargin < 5 || isempty(kmax)
        kmax = 1000;
    end
    % Split additivo
    D = diag(diag(A));
    E = -tril(A,-1); % parametro per non prendere la diagonale
    F = -triu(A,1); % il parametro cambia segno
    B = (D-E)\F;
    f = (D-E)\b;

    rho = max(abs(eig(B)));
    if rho >= 1
        error("Il metodo non converge, raggio spettrale %.4f", rho);
    end
    flag = true;
    k = 0;
    x_new = x0;
    while flag
        x0 = x_new;
        k = k+1;
        x_new = B*x0+f;
        flag = k<kmax && norm(x_new-x0)>tau*norm(x0);
    end
    if k >= kmax
        error("Il metodo non converge entro %d iterazioni", kmax)
    end
    x = x_new;
end
```
