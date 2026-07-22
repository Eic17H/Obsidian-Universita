Da integrare con gli appunti cartacei

# 1. Costruire utilizzando la rappresentazione in forma canonica il polinomio che interpola la seguente tabella


| $x_i$ | $y_i$ |
| ----- | ----- |
| $-1$  | $-2$  |
| $0$   | $0$   |
| $1$   | $-3$  |
| $2$   | $8$   |
Quindi dobbiamo trovare:$$y_i=\sum_{j=0}^na_jx^j$$Quindi costruiamo la matrice di Vandermonde $4\times4$, perché abbiamo 4 punti.$$X=\begin{bmatrix}1&x_0&x_0^2&x_0^3\\
1&x_1&x_1^2&x_1^3\\
1&x_2&x_2^2&x_2^3\\
1&x_3&x_3^2&x_3^3\end{bmatrix}$$E poi dobbiamo trovare $X\underline a = \underline y$. Il nostro sistema è quindi:$$\begin{bmatrix}1&-1&1&-1\\1&0&0&0\\1&1&1&1\\1&2&4&8\end{bmatrix}\begin{bmatrix}a_0\\a_1\\a_2\\a_3\end{bmatrix}=\begin{bmatrix}-2\\0\\-3\\8\end{bmatrix}$$
Cosa facciamo? Notiamo quei $-1$ da una parte e $1$ dall'altra. Comodo. Combinazione lineare. Però prima, scriviamolo come sistema:$$\left\{\begin{matrix}a_0-a_1+a_2-a_3&=&-2\\
a_0&=&0\\a_0+a_1+a_2+a_3&=&-3\\a_0+2a_1+4a_2+8a_3&=&8\end{matrix}\right.$$Combinazione lineare, e usiamo già il valore di $a_0$: $R1 \leftarrow R1+R3$$$\left\{\begin{matrix}2a_2&=&-5\\
a_0&=&0\\a_0+a_1+a_2+a_3&=&-3\\a_0+2a_1+4a_2+8a_3&=&8\end{matrix}\right.$$continuiamo sostituendo$$\left\{\begin{matrix}a_2&=&\dfrac{-5}2\\
a_0&=&0\\a_1-\dfrac52+a_3&=&-3\\2a_1-10+8a_3&=&8\end{matrix}\right.$$Da qui è semplice, $a_3=-\dfrac12-a_1$, $a_1=-\dfrac{11}3$, quindi $a_3=\dfrac{19}6$.

Quindi $p(x)=\dfrac{19}6x^3-\dfrac52x^2-\dfrac{11}3x$.
## a. Trova il valore in $x=-2$

Semplicemente $p(-2)=-\dfrac{19}68-\dfrac524+\dfrac{11}32=-28$.

# 2. Assegnata l'equazione non lineare $(x-2)^2(x+\dfrac15)^2=0$, trovare l'intervallo $[k,k+1]$, con $k$ intero, che contiene la radice $α$ negativa

Solitamente, un approccio potrebbe essere di provare i valori $[-1,0]$, $[0,1]$. Però qui non funziona, perché la funzione, essendo un prodotto di due quadrati, è sempre positiva. Quindi dobbiamo risolverla come equazione.

Quando si annulla? In due casi
* $(x-2)^2=0 \rightarrow x=2$
* $(x+\dfrac15)^2=0\rightarrow x=-\dfrac15$

Ci serve la radice negativa, cioè $-\dfrac15$, che si trova nell'intervallo $[-1,0]$.

## a. Calcolare l'approssimazione di $α$ che si ottiene applicando 2 iterazioni del metodo delle secanti, partendo da $x^{(0)}=k$ e $x^{(1)}=k+1$

Per il metodo delle secanti si utilizza questa formula ricorsiva:$$x^{(k+1)}=x-\dfrac{f(x^{(k)})}{m_k}$$Dove $m_k=\dfrac{f(x^{(k)})-f(x^{(k-1)})}{x^{(k)}-x^{(k-1)}}$.

Quindi $m_1=\dfrac{f(x^{(1)})-f(x^{(0)})}{x^{(1)}-x^{(0)}}$

Dobbiamo calcolarci la funzione in quei due punti.

$f(-1)=(-1-2)^2\left(-1+\dfrac15\right)^2=9\left(\dfrac{16}{25}\right)=\dfrac{144}{25}$

$f(0)=(0-2)^2\left(0-\dfrac15\right)^2=\dfrac4{25}$

Quindi:$$m_1=\dfrac{\dfrac{144}{25}-\dfrac{4}{25}}{-1-0}=-\dfrac{25}5$$
Quindi:$$x^{(2)}=x^{(1)}-\dfrac{f(x^{(1)})}{m_1}=0-\dfrac{4}{25}\left(-\dfrac5{26}\right)=\dfrac{1}{35}$$

## b. Partendo da $x^{(0)}=k$ calcolare un'iterazione del metodo delle corde usando come $m=f'(x^{(0)})$

Quindi dobbiamo prima calcolare $m$ e poi usare la stessa funzione ricorsiva.

$f(x)=(x-2)^2\left(x+\dfrac15\right)^2=g(x)h(x)$
$f'(x)=g'(x)h(x)+g(x)h'(x)=2(x-2)\left(x+\dfrac15\right)^2+(x-2)^22\left(x+\dfrac15\right)$.

Quindi, $f'(x^{(0)})=f'(-1)=2(-3)\left(-\dfrac45\right)^2+(-3)^22\left(-\dfrac45\right)=-\dfrac{96}{25}-\dfrac{72}{5}=-\dfrac{456}{25}$
In realtà poi ci serve anche $f(x^{(0)})=9\dfrac{16}{25}=\dfrac{144}{25}$

E quindi $x^{(1)}=-1+\dfrac{144}{25}\dfrac{25}{456}=-\dfrac{13}{19}$

## c. Qual è l'ordine di convergenza dei metodi utilizzati?

Corde $p=1$, secanti $p=φ=\dfrac{1+\sqrt{5}}{2}$.

# 3.  Assegnato il sistema lineare dipendente dal parametro reale $β$

$$\left\{\begin{matrix}βx_1+3x_3&=&1\\βx_2+2x_3&=&1\\3x_1+2x_2+βx_3&=&1\end{matrix}\right.$$
## a. Quali valori di $β$ rendono $A$ strettamente diagonalmente dominante?

$$A=\begin{bmatrix}β&0&3\\0&β&2\\3&2&β\end{bmatrix}$$$β$ è sempre sulla diagonale, quindi ci esce che $|β|$ deve essere maggiore di $3$, di $2$ e di $5$. Questo è vero quando $β<-5\lorβ>5$.

## b. Stabilire per quali valori di $β$ il metodo di Gauss-Seidel converge

Sfruttiamo la condizione necessaria e sufficiente, ovvero che $ρ(B_{GS})<1$.

Ricordiamo come si definisce la matrice.

$B_{GS}=(D-E)^{-1}F$, dove $D$ è la diagonale, $E$ è l'inferiore negata ed $F$ è la superiore negata.$$D=\begin{bmatrix}β&0&0\\0&β&0\\0&0&β\end{bmatrix}\qquad E=\begin{bmatrix}0&0&0\\0&0&0\\-3&-2&0\end{bmatrix}\qquad F=\begin{bmatrix}0&0&-3\\0&0&-2\\0&0&0\end{bmatrix}$$
Quindi:$$D-E=\begin{bmatrix}β&0&0\\0&β&0\\3&2&β\end{bmatrix}$$E dobbiamo trovare $(D-E)x=e_1$, che equivale a questo sistema:$$\left\{\begin{matrix}βx_1&=&1\\βx_2&=&0\\3x_1+2x_2+βx_3&=&0\end{matrix}\right.\Rightarrow\left\{\begin{matrix}x_1&=&\dfrac1β\\x_2&=&0\\\dfrac3β+βx_3&=&0&\Rightarrow x_3=-\dfrac3{β^2}\end{matrix}\right.$$Ripetiamo la stessa cosa con $e_2$ ed $e_3$, trovando rispettivamente $\left[0, \dfrac1β,-\dfrac{2}{β^2}\right]^T$ e $\left[0,0,\dfrac1β\right]^T$.

Quindi:$$(D-E)^{-1}=\begin{bmatrix}\dfrac1β&0&0\\0&\dfrac1β&0\\-\dfrac{3}{β^2}&-\dfrac{2}{β^2}&\dfrac1β\end{bmatrix}$$Quindi poi troviamo:$$B_{GS}=(D-E)^{-1}F=\begin{bmatrix}0&0&-\dfrac3β\\0&0&-\dfrac2β\\0&0&\dfrac{13}{β^2}\end{bmatrix}$$Trovata questa matrice, noi siamo qui per far convergere Gauss-Seidel, cioè trovare i valori di $β$ tale che $ρ(B_{GS})<1$. Quindi dobbiamo trovare gli autovalori, prendere quello di modulo massimo, e imporlo minore di $1$.

Quindi il solito, polinomio caratteristico, $det(B_{GS}-λI)=0$, ci escono $λ_1=0$ e $λ_2=\dfrac{13}{β^2}$, quindi $\dfrac{13}{β^2}<1;\;β^2>13;\;β>\sqrt{13}\lorβ<-\sqrt{13}$. Ricordare sempre anche la parte negativa.

## c. Con $β=4$, fare due iterazioni di Gauss-Seidel, con vettore iniziale $x^{(0)}=[1,\;0,\;1]^T$

Dobbiamo usare la formula ricorsiva $x^{(k+1)}=B_{GS}x^{(k)}+f_{GS}$

$f_{GS}=(D-E)^{-1}b$. Tra l'altro quell'inversa ce la recuperiamo dall'altro punto e lo calcoliamo da $β$. $b$ invece erano i valori a destra degli $=$ nel sistema di equazioni, quindi $b=[1,\;1,\;1]^T$; moltiplicare per questo vettore equivale a fare la somma delle righe.

Insomma ne risulta che $x^{(1)}=\left[-\dfrac12,\;-\dfrac14,\;\dfrac34\right]$. O forse al primo termine non c'è il $-$.

Assumendo che non ci sia il $-$, $x^{(2)}=\left[-\dfrac{5}{16},\;-\dfrac{1}{8},\;\dfrac{35}{64}\right]$.

## d. Se $β=-6$, si può dedurre qualcosa sulla convergenza di Jacobi senza fare ulteriori calcoli?

Sì.

Per $β=-6$, prima abbiamo visto i valori per cui la matrice dei coefficienti è strettamente diagonalmente dominante. $-6$ rientra tra quei valori, e questa è una condizione sufficiente per la convergenza del metodo di Jacobi.

# Appunto successivo: cosa ripassare

* Criteri di convergenza
* Ordini di convergenza
* Come invertire una matrice usando $e$
* Metodo delle secanti non ho capito nulla