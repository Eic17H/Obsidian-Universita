Abbiamo delle coppie $(x_i,y_i)$ per un certo $i=0,\ldots,n$. Sappiamo che questi sono punti che appartengono a una funzione che però non conosciamo esattamente. Approssimiamo questa funzione con una che passa per quei punti e, si spera, è vicina a quella vera in altri punti.

## Interpolazione polinomiale

Se la funzione è continua in $[a,b]$, allora fissato $ε>0$,$$\|f-p_n\|<ε$$
$\phi(x)$ è detta interpolante se $\phi(x_i)=y_i \; \forall i \in [0,n]$.

Esprimiamo $\phi(x)$ come una somma di funzioni lineari scalate (=una combinazione lineare mi sa #fix). Quindi:$$\phi(x_i)=y_i=\sum\limits_{j=0}\limits^{n}a_jφ_j(x_i)$$Definiamo una matrice:$$Φ_{i+1,j+1}=φ_j(x_i)$$Possiamo esprimere l'equazione sopra come $Φ\underline a = \underline y$, che è della forma $A\underline x = \underline b$.

### Esempio
* $(x_0,y_0)=(0,1)$
* $(x_1,y_1)=\left(\dfracπ2,0\right)$
* $φ_0(x)=\sin(x)$
* $φ_1(x)=\cos(x)$

Abbiamo che:$$Φ=\begin{bmatrix}φ_0(x_0) & φ_1(x_0) \\ φ_1(x_0) & φ_1(x_1)\end{bmatrix} = \begin{bmatrix}\sin(0) & \cos(0) \\ \sin\left(\dfracπ2\right) & \cos\left(\dfracπ2\right)\end{bmatrix} = \begin{bmatrix}0&1\\1&0\end{bmatrix}$$E troviamo che $a_1=1$, $a_0=0$, quindi $Φ(x)=\cos(x)$.

## Vandermonde

$$P_n(x)=c_nx^n+c_{n-1}x^{n-1}+\ldots+c_1x+c_0$$
Questo si ottiene definendo $φ_n=x^n$.$$P_n(x)=\sum\limits_{j=0}\limits^{n}c_jx^j\qquad p_n(x_i)=\sum\limits_{j=0}\limits^{n}c_jx_i^j=y_i$$La vediamo come matrice, un tipo particolare di matrice detta *Matrice di Vandermonde*:$$X=\begin{bmatrix}1&x_0&x_0^2&\cdots \\ \vdots & x_1 & x_1^2 & \cdots \\ \vdots & \vdots & \vdots & \ddots \\ 1 & x_n & x_n^2 & \cdots \end{bmatrix}$$La determinante di questa matrice è degna di nota, ma non si capisce quello che ha scritto perché ha abbreviato informalmente.

### Base di lagrange

Per poter parlare di questo polinomio, dobbiamo prima definire una lagrangiana:$$L_J(x)=\prod\limits_{\underset{k≠J}{k=0}}\limits^{n}\dfrac{x-x_k}{x_J-x_k}$$Da lì vediamo il polinomio vero e proprio:$$P_n(x)=\sum\limits_{J=0}\limits^{n}a_JL_J(x)$$Non ho capito niente della yellowboard onestamente.