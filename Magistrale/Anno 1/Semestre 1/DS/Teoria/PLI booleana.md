---
cssclasses:
  - ds
---
Un tipo specifico di PLI è quello booleano, dove $x$ ha come elementi solo $1$ e $0$, cioè tutti i minimi sono $0$ e tutti i massimi sono $1$. Per esempio il problema dello zaino.

Se $b>\sum\limits_j a_j$, posso mettere $x$ tutto a $1$.

Esercizio per casa: fare la cosa delle slide. Scrivere un'istanza del problema dello zaino per aiutare il ladro. Dobbiamo quindi istanziare $x$. A mano.

$$\begin{matrix*}[l]
\max \sum\limits_{j=1}^n c_jx_j \\
s.t. \\
\sum\limits_{j=1}^n a_jx_j\leq b_j \\
x_j \in \{0,1\}, j=1\ldots n \\
\begin{matrix*}
b & = & 19 \\
c & = & [30 & 36 & 15 & 11 & 5 & 3] \\
a & = & [9 & 12 & 6 & 5 & 3 & 2] \\
x & = & [1 & 0 & 1 & 0 & 1 & 0] \\
\end{matrix*}\\
\end{matrix*}$$

Arriviamo a un costo di $18$ e un valore di $50$. Essenzialmente ho preso gli elementi col maggior rapporto $c_i:a_i$.

Tutti i modi per scrivere i vincoli che si trovano nei libri sono equivalentemente corretti.