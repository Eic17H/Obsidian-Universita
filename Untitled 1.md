Costruiamo la matrice di Vandermonde$$X = \begin{bmatrix}
1 & -1 & 1 & -1 \\
1 & 0 & 0 & 0 \\
1 & 1 & 1 & 1 \\
1 & 2 & 4 & 8
\end{bmatrix}$$
> **Importante!** Fare *prima* il sistema, e *poi* le trasformazioni di Gauss. E fare bene le somme.

Usiamo le trasformazioni di Gauss per trovare una matrice che corrisponde a un sistema di equazioni con le stesse soluzioni. $R1 \leftarrow R1+R3$.$$X' = \begin{bmatrix}
1 & 0 & 1 & 0 \\
1 & 0 & 0 & 0 \\
1 & 1 & 1 & 1 \\
1 & 2 & 4 & 8
\end{bmatrix}$$Ora possiamo scrivere il sistema:$$\begin{bmatrix}
1 & 0 & 1 & 0 \\
1 & 0 & 0 & 0 \\
1 & 1 & 1 & 1 \\
1 & 2 & 4 & 8
\end{bmatrix}
\begin{bmatrix}
a_0 \\
a_1 \\
a_2 \\
a_3 \\
\end{bmatrix}=
\begin{bmatrix}
-2 \\
0 \\
-3 \\
8 \\
\end{bmatrix}$$Trasformiamolo in un sistema di equazioni:$$\left \{
\begin{matrix}
a_0 && +a_2 & &=& -2 \\
a_0 &&&&=& 0 \\
a_0 & +a_1 & +a_2 & +a_3 &=& -3 \\
a_0 & +2a_1 & +4a_2 & +8a_3 &=& 8 \\
\end{matrix}
\right .$$Abbiamo già trovato il valore di $a_0$.$$\left \{
\begin{matrix}
 && +a_2 & &=& -2 \\
a_0 &&&&=& 0 \\
 & +a_1 & +a_2 & +a_3 &=& -3 \\
 & +2a_1 & +4a_2 & +8a_3 &=& 8 \\
\end{matrix}
\right .$$E il valore di $a_2$.$$\left \{
\begin{matrix}
 && a_2 & &=& -2 \\
a_0 &&&&=& 0 \\
 & +a_1 &  & +a_3 &=& -1 \\
 & +2a_1 & +4a_2 & +8a_3 &=& 8 \\
\end{matrix}
\right .$$
# Metodo delle secanti

$f(x) = (x-2)^2(x+\dfrac15)^2$
$x^{(0)} = -1$
$x^{(1)}=0$

$$m_1=\dfrac{f(x^{(1)})-f(x^{(0)})}{x^{(1)}-x^{(0)}}=-\dfrac{28}{5}$$