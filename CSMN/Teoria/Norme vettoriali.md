# Spazio normato

## Definizione

Lo [[spazio lineare]] $V$ è detto *spazio normato* se esiste una funzione $\|\cdot\|:V→\R_+$, che diciamo *norma*, con le seguenti proprietà:
* $\|x\|\ge0$, e $\|x\|=0 ↔ x=0$ - Positività
* $\|ax\|=|a|\cdot\|x\|$ - Omogeneità
* $\|x+y\| \le \|x\|+\|y\|$ - Disuguaglianza triangolare

## Esempi di norme

La "norma a p di x", indicata con $\|x\|_p$, si calcola con la seguente formula:$$\|x\|_p = (\sum_{i=1}^{n} |x_i|^p)^{\frac{1}{p}}$$
### Norma euclidea ($p=2$)

$\|x\|_2 = \sqrt{(x_1)^2+(x_2)^2+...+(x_n)^2}$

### Norma a 1 ($p=1$)

$\|x\|_1 = x_1+x_2+...+x_n$

### Norma del massimo p ($p=\infty$)

$\|x\|_{\infty} = \max\limits_{i=1,...,n}|x_i|$