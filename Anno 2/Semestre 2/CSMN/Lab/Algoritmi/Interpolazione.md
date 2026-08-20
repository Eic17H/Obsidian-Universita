---
cssclasses:
  - csmn
---
Abbiamo dei punti, e vogliamo generare una funzione che passa per tutti quei punti. Vediamo il metodo della [[Forma canonica|forma canonica]] e il metodo di [[Lagrange|Lagrange]].

Teoria: [[Approssimazione di funzioni]]

## Confronto

```MatLab
f = @(x) 1./(1+25*x.^2);

n = 20;
xx = linspace(-1,1,500);

yy = f(xx);

plot(xx,yy,"b-", "DisplayName","Funzione da interpolare");
xlabel("X");
ylabel("Y");
legend show;

% Adesso dobbiamo campionare i punti

% Equidistanti
x_eq = linspace(-1,1,n+1);
y_eq = f(x_eq);
canint(x_eq,y_eq,xx);
lagrint(x_eq,y_eq,xx);

% Altrimenti usiamo i nodi di Chebychev
k = (0:n)';
x_ch = cos((2*k+1)./(2*(n+1))*pi);
y_ch = f(x_ch);
canint(x_ch,y_ch,xx);
lagrint(x_ch,y_ch,xx);
```