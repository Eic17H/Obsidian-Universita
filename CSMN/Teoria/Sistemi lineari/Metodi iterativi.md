Vediamo due metodi: quello di [[Jacobi]] e quello di [[Gauss-Seidel]].

Da riordinare.
# Metodi iterativi per la risoluzione dei sistemi lineari

Di nuovo$\newcommand{\u}{\underline}$ $Α \u x = \u b$.

Abbiamo visto finora i metodi diretti, che si implementano con `for`. Invece con i metodi iterativi uso `while`.

A che mi servono i metodi iterativi? Se ho una matrice $10000 \times 10000$, faccio partire l'algoritmo di Gauss, lentamente si fa strada, e al 9995º passo si rompe tutto. E io non ho un risultato parziale, semplicemente non ho nulla. Con i metodi iterativi invece avrò qualcosa che è simile al 99.95% al risultato finale.

Se ho una matrice sparsa, o anche triangolare superiore, e applico Gauss, il computer non se ne rende conto. Fa tutto il calcolo, di continuo, e spreca tempo, perché farà operazioni su tutti quegli elementi nulli. Quindi anche in questo caso il metodo di Gauss non conviene.

I metodi iterativi, anziché trasformare la matrice, utilizzano i prodotti di una specifica matrice per un vettore.

Noi vedremo un sottoinsieme dei metodi iterativi, quelli del primo ordine. In realtà un sottoinsieme di questo sottoinsieme.

## Metodi iterativi del 1º ordine

Cos'è l'ordine? In questo caso, significa che un'iterazione si basa solo su quella precedente, cioè $\u x ^{(k+1)} = ψ(\u x^{(k)})$.

Io chiaramente voglio usare un metodo convergente. Cosa vuole dire?

> Un metodo è **globalmente convergente**, cioè converge sempre qualunque sia il *guess* iniziale, se $\lim \limits_{k \rightarrow \infty} \|\u x ^ {(k)} - \u x\| = \u 0$.

Vedremo metodi lineari, stazionari del 1º ordine (MLS1, scriviamo noi, solo noi però).

### MLS1

$$\u x ^ {(k+1)} = B \u x ^{(k)} + \u f$$
Dove $B$ è la *matrice di ideazione* ed $\u f$ è il *vettore di ideazione*. Somiglia a una retta, $y=mx+q$.

Perché *stazionario*? Perché $B$ ed $\u f$ non cambiano tra un'iterazione e l'altra.

Ci serve anche la definizione di *consistente*:

> Un metodo è **consistente** se, quando a un'iterazione trovo esattamente la soluzione giusta, allora facendo un altro passo rimango sulla stessa soluzione.

Come sono legate convergenza e consistenza? La convergenza implica la consistenza, ma non vale il converso. Perché non vale il converso? Il controesempio più banale è $\u x ^{(k+1)} = \u x ^{(k)}$, è consistente perché non cambia mai, ma non è convergente perché non arriva mai al risultato.

MLS1 è consistente se e solo se $\u f = (I-B) A ^{-1} \u b$.

Dimostrazione: $\u x = A^{-1} \u b$. Diciamo che al passo $k$ ho la soluzione, quindi $\u x ^{(k+1)} = B \u x ^{(k)} +  \u f$, ma visto che ho raggiunto la soluzione ottengo $\u x = B \u x + \u f$, quindi $\u x - B \u x = \u f$, cioè $(I-B) \u x = \u f$, cioè per definizione $(I-B) A^{-1} \u b = \u f$, CVD.

Purtroppo, ahimé ahinoi, dobbiamo fare due teoremi.

Prima di tutto, definizione.

> **L'errore al passo $k$** è la differenza tra il valore al passo $k$ e la soluzione, cioè $\u e _ x = \u x ^{(k)} - \u x$.

Così posso ridefinire la convergenza:

> Un metodo è **convergente** se $\lim \limits_{k \rightarrow \infty} \| \u e _ k \| = 0$.

Quindi io voglio vedere come cambia l'errore andando avanti con le iterazioni.

Vediamo quindi come cambia l'errore con un metodo consistente.

Partiamo dal sistema$$\u x ^{(k+1)} = B \u x ^{(k)} + \u f$$Vediamo poi l'errore$$\u e ^{(k+1)} = \u x ^{(k+1)} - \u x = B \u x ^{(k)} + \u f - (B \u x + \u f) = B (\u x^{(k)}-\u x) = B \u e ^{(k)}$$
Guarda l'inizio e la fine. È diventata ricorsiva. Quindi posso scrivere $$B \u e ^{(k)} = B(B\u e ^{(k-1)})=B^2\u e^{(k-1)}$$E possiamo continuare così fino alla fine. Notiamo che la somma tra l'esponente di $B$ e l'indice è sempre $k+1$. Quindi, unendo inizio e fine:$$\u e ^{(k+1)} = B^{k+1}\u e ^{(0)}$$
Adesso finalmente arriva il primo teorema

# **IL** teorema

Anzi

# **IL** di due teoremi

## molto importanti

Condizione *sufficiente* per la convergenza di un MLS1. Ricorda cos'è una condizione sufficiente.

Questa condizione sufficiente è $\exists \|B\|<1$.

Allora.

Non ce la fa la dimostrazione.

Però è bellina.

Sfrutta il fatto che l'errore è $B^{k+1}e^{(0)}$.

# Teorema 2

Moltiplicazione del pane e dei pesci, trasformazione di acqua in vino. Questi sono i due teoremi che dobbiamo sapere tutti.

Condizione ***necessaria** e sufficiente* per la convergenza di MLS1: $ρ(B)<1$. Così se fallisce il primo check, controlliamo questo.

Questi sono i due teoremi chiave.

La dimostrazione di questo teorema naturalmente è differente. Il primo teorema ha solo un'implicazione, questo ha una doppia implicazione.

Ci sono due dimostrazioni, una si fa per assurdo.

# Esempi

# Due metodi

I due metodi che vedremo si fanno con lo *splitting additivo*

# Splitting additivo

$A \u x = \u b$. La scrivo come differenza di due matrici, $A=P-N$.

Partiamo dal fatto che questa cosa si possa fare: si può fare sempre.

Matrice di $P$recondizionamento: si richiede solo che sia non-singolare, cioè sia invertibile, cioè $\exists P^{-1}$.

Quindi posso scrivere $(P-N)\u x = \u b$. Distribuiamo, $P\u x - N \u x = \u b$, spostiamo, $P \u x = N \u x + \u b$, ed è per questo che a sinistra metto una differenza.

Diventa abbastanza familiare.$$P \u x ^{(k+1)} = N \u x ^{(k)} + \u b$$Se devo isolare $\u x ^{(k+1)}$ devo "dividere" per $P$, è per questo che ci serve invertibile.$$\u x ^{(k+1)} = P^{-1}N\u x ^{(k)} + P^{-1} \u b$$E così la riconduciamo a quella formula:$$B = P^{-1}N \quad \quad \quad \quad \u f = P^{-1} \u b$$
Ed eccoci qua, il mio incubo del totale: il metodo di Jacobi e il metodo di Gauss-Seidel. Chiamiamolo Gauss-Seidel, per una volta che non ha fatto tutto Gauss.

Abbiamo quindi una separazione, per entrambi i metodi. $A=D-E-F$. $E$ ed $F$ sono per consistenza col libro, in realtà sono $L$ e $U$.

### Lo split:

Ho la mia matrice $A$. $D$ sarà la sua diagonale, $E$ sarà tutto il triangolo inferiore, senza la diagonale, cambiata di segno, ed $F$ uguale ma sopra. E ci torna che $A=D-E-F$. Perché cambiamo il segno? Stesso motivo prima di $-N$.

### Jacobi:

$B = D$, $N=E+F$. E ci torna, il segno è così, è quello.

### Gauss-Seidel:

$P=D-E$, $N=F$. E il calcolo ci torna comunque.

### Il metodo in generale:

$B = P^{-1}N$, $\u f = P^{-1}\u b$.

Quindi

### Jacobi:

$B_J = D^{-1}(E+F)$, $\u f_J = D^{-1} \u b$

### Gauss-Seidel

$B_{GS} = (D-E)^{-1}F$, $\u f_{GS} = (D-E)^{-1}\u b$

### Errore tipico

Dimenticare il $-$ di $E$ ed $F$.

# Esempio

$$\left\{
\begin{matrix}
2x_1 & -3x_2 & + x_3 & =1\\
x_1 & +2x_2 & - x_3 & =0\\
x_1 & -3x_2 & + 2x_3 & =1\\
\end{matrix}
\right.$$Vale a dire $$A=\begin{bmatrix}
2 & -3 & 1 \\
1 & 2 & -1 \\
1 & -3 & 2 \\
\end{bmatrix}
\quad
D=\begin{bmatrix}
2 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 2 \\
\end{bmatrix}
\quad
E=\begin{bmatrix}
0 & 0 & 0 \\
-1 & 0 & 0 \\
-1 & 3 & 0 \\
\end{bmatrix}
\quad
F=\begin{bmatrix}
0 & 3 & -1 \\
0 & 0 & 1 \\
0 & 0 & 0 \\
\end{bmatrix}
$$
L'inversa di una matrice diagonale è molto semplice, basta fare gli inversi di tutti gli elementi. $$B_J=D^{-1}(E+F)=\begin{bmatrix} \dfrac{1}{2} & 0 & 0 \\ 0 & \dfrac{1}{2} & 0 \\ 0 & 0 & \dfrac{1}{2} \\ \end{bmatrix} \begin{bmatrix} 0 & \dfrac32 & - \dfrac12 \\ - \dfrac 12 & 0 & \dfrac12 \\ - \dfrac 12 & \dfrac 32 & 0 \end{bmatrix}$$
$$\u f = D^{-1} \u b = \begin{bmatrix}
\dfrac{1}{2} & 0 & 0 \\
0 & \dfrac{1}{2} & 0 \\
0 & 0 & \dfrac{1}{2} \\
\end{bmatrix}
\begin{bmatrix}1 \\ 0 \\ -1\end{bmatrix}=\begin{bmatrix}
\dfrac{1}{2} & 0 & 0 \\
0 & 0 & 0 \\
0 & 0 & -\dfrac{1}{2} \\
\end{bmatrix}$$
## Gauss-Seidel

L'inversa è un po' più difficile, perché non è più diagonale.

$D-E$ sarebbe uguale al `tril()` di MatLab. Come si fa l'inversa? Con il trucchetto di prima, sistema lineare, al posto di mettere un vettore generico mettiamo proprio le colonne della matrice identità. È un sistema facile, usiamo la sostituzione in avanti. Lungo la diagonale ci sono sempre gli inversi della diagonale originale, il resto no.

Con Gauss-Seidel servono circa la metà delle iterazioni rispetto a Jacobi.

# Appuntino

Da una lezione precedente, c'è scritto che h è una funzione da 5N a N, e k è una funzione da N a 4N. hok non è definita, e koh è definita e va da 5N ad N. Somiglia alla moltiplicazione matriciale, e in effetti le matrici sono funzioni, e la moltiplicazione è la combinazione.