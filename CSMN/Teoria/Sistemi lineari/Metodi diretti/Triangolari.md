Dicevamo, Gauss, pivoting, scambiare la riga attuale con quello dove si trova il massimo in modulo.

Invece oggi, fattorizzazione $A=LU$ e $PA=LU$. Da non soprannominare Alu e Palu. Fattorizzazione, no? Sappiamo che $15 = 3 \cdot 15$, stessa cosa. Fattorizzazione triangolare.

# Fattorizzazione Alu

Come troviamo $L$ ed $U$ da $A$?

Per $L$, l'elemento $l_{ij}$ è$$l_{ij} = \left\{\begin{matrix} m_{ij} & i>j \\ 1 & i=j \\ 0 & j>i & \text{essendo triangolare}\end{matrix}\right.$$
Per $U$, uso Gauss, semplicemente.

Cosa me ne faccio? Diciamo che ho $A\underline{x}=\underline{b}$, diventa $LU\underline{x}=\underline{b}$. Noto che $U\underline{x}$ è un vettore, quindi lo chiamo $\underline{y}$ e sostituisco, $L\underline{y}=\underline{b}$, e l'ho separata in due essenzialmente, la risolvo come un sistema:$$\left\{ \begin{matrix}L\underline{y} = \underline{b} \\ U\underline{x} = \underline{y} \end{matrix} \right.$$
E risolvo, facile.

Vediamo che $det(A)=det(LU)=det(L)\cdot det(U)$. Di una inferiore, è $1$, e della superiore, è il prodotto degli elementi nella diagonale, quindi la so così, molto semplice.

Si consiglia di fare $L$ per colonne. E allora non ho capito la sua definizione. Ed eccoci. Quelli che ci sono come elementi i *moltiplicatori* del metodo di Gauss, non gli elementi originali. E infatti è quello che significa $m$. Ed ecco com'è che $A=LU$.

# Fattorizazione Palu

Cos'è questa $P$? Premessa. No, la matrice non è una premessa, intendo che va fatta una premessa. O definizione.

> **Matrice di scambio** - Si ottiene dalla matrice identità $I$ scambiando due righe.

Per esempio:$$
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\xrightarrow{scambio\;1-3}
\begin{bmatrix}
0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 \\
1 & 0 & 0 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}$$
Indichiamola con $P^{(1,3)}$. $P^{(1,3)}A$ scambia le righe $1$ e $3$ di $A$. $A P^{(1,3)}$ scambia invece le colonne. I vettori sono matrici con una sola colonna e tante righe.

Cosa succede se moltiplico due matrici di scambio? Ottengo una matrice di permutazione.

> **Matrice di permutazione** - Prodotto di matrici di scambio.

Applicare una matrice di permutazione è come applicare le matrici di scambio in ordine.

Ricorda proprio lo scambio fatto per il pivoting. E infatti è proprio quello.

E tra l'altro, nella matrice $L$, gli $1$ e gli $0$ sono salvi perché gli scambi avvengono sempre sotto. Come? Perché le cose le scrivi solo dopo che hai fatto gli scambi precedenti, ed è per quello che ci ha detto di scrivere $L$ colonna per colonna.

Essenzialmente nulla, l'equazione diventa $LU\underline{x}=P\underline{b}$.

Il procedimento è il solito, pivoting, ma mi segno gli scambi. Quindi guardo in alto a sinistra, scambio con la riga che mi dà il massimo pivot, mi segno lo scambio. Certamente mettere il pivot massimo mi crea frazioni dappertutto, a noi annoia, ma un computer preferisce numeri piccoli, e noi facciamo finta di essere computer. Facciamo tutto il procedimento col pivoting, ci segnamo gli scambi.

Insomma, se da una matrice con numeri semplicissimi escono frazioni assurde, è normale, magari le semplifichi alla fine e torna normale.

Segnati gli scambi, vediamo $L$.

Il primo scambio avviene quando $L$ è ancora vuota, ignoriamo. Poi segnamo la prima colonna, facciamo il secondo scambio che quindi si applica solo a quella colonna. Poi la prossima colonna, poi magari neanche c'è stato uno scambio, poi la prossima colonna, poi o c'è stato o non c'è stato uno scambio, insomma si continua.

Quindi $P$. Parto da $I$ e faccio gli scambi in ordine.

Si da il caso, e io mi fido perché non stavo seguendo, che sia un calcolo molto più stabile.

Vediamo il determinante.

* $det(PA) = det(LU)$
* $det(P) \cdot det(A) = det(L) \cdot det(U)$
* $det(A) = \dfrac{det(L) \cdot det(U)}{det(P)}$
* $det(A) = \dfrac{1 \cdot det(U)}{det(P)}$

Cos'è $det(P)$? Non ce l'ha detto, voleva dircelo e non ce l'ha detto. Ogni scambio cambia il segno del determinante. Essendo $P$ una permutazione di $I$, sarà $1$ o $-1$

# $det(A) = (-1)^{no.\;scambi} det(U)$

