
| $x_i$ | $y_i$ |
| ----- | ----- |
| -1    | 2     |
| 0     | 0     |
| 1     | -3    |
| 2     | 8     |
Costruiamo la matrice di Vandermonde. Abbiamo 4 coppie, quindi il polinomio sarà di terzo grado, e la matrice sarà 4x4.$$X=\begin{bmatrix}1 & x_0&x_0^2&x_0^3\\1 & x_1&x_1^2&x_1^3\\1 & x_2&x_2^2&x_2^3\\1 & x_3&x_3^2&x_3^3\end{bmatrix}=\begin{bmatrix}1 & -1&1&-1\\1 & 0&0&0\\1 & 1&1&1\\1 & 2&4&8\end{bmatrix}$$Adesso troviamo $\underline a$, per $X\underline a = \underline y$.$$\begin{bmatrix}1 & -1&1&-1\\1 & 0&0&0\\1 & 1&1&1\\1 & 2&4&8\end{bmatrix}\begin{bmatrix}a_0\\a_1\\a_2\\a_3\end{bmatrix}=\begin{bmatrix}2\\0\\-3\\8\end{bmatrix}$$
Diventa un semplice sistema di equazioni:$$\left\{\begin{matrix}a_0&-a_1&+a_2&-a_3&=&2\\a_0&&&&=&0\\a_0&+a_1&+a_2&+a_3&=&-3\\a_0&+2a_1&+4a_2&+8a_3&=&8\end{matrix}\right.$$Abbiamo già trovato $a_0$.$$\left\{\begin{matrix}-a_1&+a_2&-a_3&=&2\\&&&&&a_0=0\\a_1&+a_2&+a_3&=&-3\\2a_1&+4a_2&+8a_3&=&8\end{matrix}\right.$$Combinazione lineare: alla prima riga sommiamo la terza.$$\left\{\begin{matrix}&+2a_2&&=&-1\\&&&&&a_0=0\\a_1&+a_2&+a_3&=&-3\\2a_1&+4a_2&+8a_3&=&8\end{matrix}\right.$$Abbiamo trovato anche $a_2$.$$\left\{\begin{matrix}&&&&&a_2=-\dfrac12\\&&&&&a_0=0\\a_1&-\dfrac12&+a_3&=&-3\\2a_1&-2&+8a_3&=&8\end{matrix}\right.$$