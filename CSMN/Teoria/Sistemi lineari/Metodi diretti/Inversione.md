$A\underline{x}=\underline{b}$, quindi $\underline{x}=A^{-1}\underline{b}$. Diciamo che ho un altro sistema, con la stessa matrice dei coefficienti ma diverso vettore dei termini noti, per esempio $A\underline{y}=\underline{c}$. Io posso usare la stessa fattorizzazione, per esempio, e cambiare i termini noti, quindi risparmio calcoli.

Diciamo che $X=A^{-1}$, quindi $AX=I$. Le colonne di $I$ si chiamano $\underline{e}$. Quindi abbiamo che $A\begin{bmatrix}\underline{x}_1& \underline{x}_2& \ldots& \underline{x}_n\end{bmatrix} = \begin{bmatrix}\underline{e}_1& \underline{e}_2& \ldots& \underline{e}_n\end{bmatrix}$. Quindi $A\underline{x}_n=\underline{e}_n$.

Poi, $A=LU$, fattorizzazione triangolare. $L\underline{y}=\underline{b}$, applichiamo lì sopra, $L\underline{y}_i=\underline{e}_i$. Quindi poi, in $U\underline{x}_i=\underline{y}_i$, $\underline{x}_i$ è l'$i$-esima colonna di $A^{-1}$.

Con $PA=LU$ invece? Semplicemente abbiamo $L\underline{y}_i=P\underline{e}_i$, dove $P\underline{e}_i$ è l'$i$-esima colonna di $P$.