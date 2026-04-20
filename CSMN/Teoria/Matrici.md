---
cssclasses:
  - csmn
---
Lo stesso argomento: <span class="md">[[MD/File/Matrici|MD]]</span>

Oggi non c'è il proiettore quindi niente pdf della lavagna.

Abbiamo visto il prodotto e la norma indotta da un prodotto.

Una combinazione lineare è il vettore che si ottiene facendo la somma di certi vettori moltiplicati per degli scalari. Quindi $\underline{x} = a_1 \underline{x}_1 + a_2 \underline{x}_2 + ...$, dato ${\underline{x}_1, \underline{x}_2, ... \underline{x}_k}$. Grazie a questa nozione posso definire due cose: il sottospazio generato (span). Lo span di {x1...xk} è lo spazio dei vettori che posso ottenere facendo variare gli alfa, che non sono a sono alfa, nonostante la sua calligrafia.

$$
\{\underline{x}_1, \underline{x}_2, ... \underline{x}_k\}
$$
Se e solo se la somma di tutti gli aixi=0, allora e solo allora ai=0 per ogni i. Allora xi sono linearmente indipendenti, cioè nessun xi può essere espresso come combinazione degli altri vettori. Per esempio se x1=1;1;0, x2=0;0;1, x3=1;1;1, allora con a1=1, a2=1, a3=-1 ho la somma=0, quindi i vettori non sono linearmente indipendenti.

La base di uno spazio lineare è i vettori linearmente indipendenti + generatori. Non ho capito che ha detto. Esempio semplicissimo, R2\^2 con x1=1;0 e x2=0;1 che sono i miei versori, per ottenere x=a;b, metto alfa1=a e alfa2=b, e ottengo proprio x (che è sottolineato).

# Matrici

Si indicano con le lettere latine maiuscole, di base partono dalla A, alcune particolari hanno altre lettere. Una matrice A non è che una tabella che contiene dei numeri disposti ordinatamente in righe e colonne. Una matrice con m righe ed n colonne è una matrice mxn. Gli elementi di A sono indicati da a con un pedice per la riga e uno per la colonna. Per B saranno b e così via. L'insieme è $R^{mxn}$.

La cosa più semplice che si può fare a una matrice è la trasposta, la trasposta di $A$ è $A^T$. Sia nelle coordinate degli elementi e nelle dimensioni, si scambiano m ed n, o scambiando le righe e le colonne, essenzialmente.

Quando una matrice è complessa, oltre a fare la trasposta si può fare l'aggiunta, $A^*$, che è uguale alla trasposta coniugata. Quindi $(A^*)_{ij} = \overline{A_{ji}}$. Il coniugato inverte il segno della parte complessa ricordiamo.

Se $A$ è reale, $A^* = A^T$.

Lo spazio delle matrici $R^{mxn}$ è uno spazio lineare. C=A+B, allora tutti gli elementi $c_{ij} = a_{ij} + b_{ij}$. Se moltiplico per uno scalare, moltiplico tutti gli elementi. Esiste anche il prodotto tra matrici (volgarmente noto come prodotto righe per colonne).

## Prodotto tra matrici

Non è sempre definito, tra due matrici può non essere possibile fare un prodotto.

Il caso più semplice è il prodotto di una matrice con una sola riga per una con una sola colonna, con la stessa lunghezza, è a11\*b11 + a12\*b21 + ...

Se A è mxn e B è pxq, allora n=p, altrimenti non posso fare la moltiplicazione. mxn pxq, mnemonico, quelli interni n=p, quelli esterni il risultato è mxq. Importante.

Il prodotto tra matrici non è argomento d'esame. È una cosa talmente di base che devi saperla fare in fretta, perché si usa per gli argomenti d'esame.

È come un prodotto scalare tra due vettori. Quindi il prodotto righe per colonne è il prodotto scalare tra tutte le righe e tutte le colonne. cij = \<a(riga i), b(colonna j)> (\<,> è il prodotto scalare). Trattiamo tutti i vettori come matrici colonna. Quindi $<\underline{x},\underline{y}> = \underline{x}^T\underline{y}$. Trattiamo tutto come matrice, così come fa MatLab, che è MatLab e non MathLab perché è Mat di Matrice. Infatti se gli fai il prodotto scalare col `for` lo fa lentamente, se glielo fai con l'operazione matriciale lo fa molto più efficientemente.

I vettori sono sempre in colonna. Se è una riga, è un vettore trasposto. Il vangelo. Abbiamo $x$ e $y$ in $R^n$. $\underline{x}^Ty$ è una matrice 1x1, $\underline{x}\underline{y}^T$ è una matrice nxn.

Il prodotto tra matrici è associativo $A(BC)=(AB)C$, distributivo, $A(B+C)=AB+AC$. Non è commutativo.
# $$AB ≠ BA$$
Importante.

Altra cosa: $A^TB^T = (BA)^T$.

## Matrici invertibili

$3$ è un numero invertibile, il suo inverso è $\frac{1}{3}$, perché $3*\frac{1}{3}=1$. L'equivalente di $1$ è $I$, la matrice con $1$ in tutte le "caselle". L'inversa di $A$ si scrive $A^{-1}$, e $AA^{-1}=I$. Deve essere quadrata, perché $AA^{-1} = A^{-1}A$, quindi m=m ed n=n essenzialmente se ci pensi, sono entrambi interni.

$(AB)^{-1} = B^{-1}A^{-1}$

In più, $(A^T)^{-1} = (A^{-1})^T$, e si indica anche con $A^{-T}$, e così puoi scegliere quale fare prima, certe volte ti viene molto bene farne una.

Se una matrice è invertibile, le sue colonne o le sue righe sono linearmente indipendenti.

## Determinante

È una funzione che prende una matrice **quadrata** e mi restituisce un numero, il determinante.

$$
det: R^{nxn} -|> R
$$
$$
A |-> det(A)
$$
Si fa con Laplace. È la somma di ogni elemento per la determinante della matrice che si ottiene eliminando la sua riga e la sua colonna, e i segni sono a scacchiera.

$$
\sum_{j=1}^{n}{(-1)^{i+j}a_{ij}det(A_{ij})}
$$
Dove $A_{ij}$ è proprio quella matrice senza la riga i e la colonna j.

E quindi il determinante? Una matrice è invertibile solo se ha determinante≠0. Infatti \{\{1;2};\{1;2}} vedi che le colonne sono uguali, mica linearmente indipendenti.

Proprietà:

$det(A^T)=det(A)$
$det(A^*) = \overline{det(A)}$
$det(AB) = det(A)·det(B)$
$det(aA) = a^n · det(A)$, con n dimensione di A. Questa non la ricorda nessuno. Perché? Perché Laplace è ricorsiva.

## Autovalori e autovettori

Per forza. Non puoi non parlarne.

Se calcoli uno calcoli l'altro, anche se solo implicitamente.

Definizione: una coppia $(λ, \underline{x})$, con $λ$ complesso e $x$ in $R^n$ è una coppia autovalore-autovettore della matrice $A$ in $R^{nxn}$ se $A\underline{x}=λ\underline{x}$, con $\underline{x}≠\underline0$.

Nota come matrice·vettore=vettore (vettore sempre colonna mi raccomando). Il vettore rimane sempre a destra.

Come si calcolano?

* Porto tutto a sinistra dell'uguale, $A\underline{x}-λ\underline{x}=\underline{0}$
* Raccolgo la x, ah no non posso fare $A-λ$, posso moltiplicare per $I$ che è l'elemento neutro e non cambia niente
* Raccolgo la x, $(A-λI)\underline{x}=\underline{0}$
* Chiamiamola B, $B\underline{x}=\underline{0}$.

Ma quindi, guarda un po': \[$^1_0$$^1_1$\]·\[$^x_y$\]=\[$^0_0$\], ti esce \{$^{x+y=0}_{y=0}$, un sistema. Perché abbia soluzione devo mettere che $det(B)=0$ necessariamente, e $det(A-λI)$ è detto *polinomio caratteristico*, è un polinomio con n soluzioni.

Ergo troviamolo

* $B=A-λI$
* $det(B)$ è un polinomio
* Metto $det(B)=0$

I due autovalori potrebbero essere uguali tra loro, perché sono soluzioni di un polinomio e anche lì può succedere. Se due autovalori sono uguali, quell'autovalore è uno solo, con molteplicità 2. *molteplicità algebrica*.

Per trovare gli autovettori dobbiamo partire dal passo intermedio $(A-λI)\underline{x}=\underline{0}$. Lo trasformiamo in sistema di equazioni, e magari ci esce che y=0 per esempio, ed x non ci esce, quindi x può essere quello che vuoi, che indichiamo con t. Quindi in quel caso quell'autovalore avrebbe autovalori infiniti, che però diciamo che è un solo autovettore. Il numero di autovettori che trovo è chiamato *molteplicità geometrica*.

Detto in modo rigoroso è completamente diverso. "La dimensione dello spazio generato dalla span di questa matrice".

Come minimo metà dei termini in questi appunti sono interpretati e trascritti male. Da rivedere.

Una matrice che ha una moltiplicità geometrica minore del suo grado è detta *difettiva*, perché non esiste una base di due vettori indipendenti che genera le sue colonne.