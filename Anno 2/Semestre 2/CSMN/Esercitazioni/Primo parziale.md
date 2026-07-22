Queste sono le esatte cose che ci saranno al parziale. Non ci dice già i numeri giusti ma gli esercizi sono questi. Si può usare la calcolatrice, servirà poco. I fogli li dà lei, possiamo portare la penna. Gli zaini si lasciano all'ingresso. Domani (mercoledì) non c'è lezione. Venerdì 11:30 davanti al laboratorio, pubblicherà chi è in quale.

Ci saranno più fogli. Uno ha scritto 1, gli altri hanno scritto niente, ce lo scrivi tu. I risultati campati per aria sono considerati sbagliati, vanno giustificati. Il contrario, risultati sbagliati usciti da procedimenti giusti sono considerati giusti.

Non ci saranno domande di teoria, solo esercizi. Chiaramente certe cose di teoria però fanno risparmiare calcoli.

Tre esercizi, ognuno da 10 punti. Difficoltà variabile. L'ultimo esercizio è sui numeri macchina, molto più semplice, quindi punti gratis. Ma! Un errore su un esercizio semplice toglie più punti.

Ex 1. Fattorizzazione PA=LU. Gauss con pivoting, costruisci bene la matrice, calcola bene il determinante.

Due matrici $A$ e $B$ con parametri. Trovare i parametri tali che $A\cdot B=I$. Poi troviamo il condizionamento con le tre norme (?????? cos'è, sono messo male.

Conziglio: Leggete il testo sempre almeno due volte. Controlla di aver copiato bene la matrice, le matrici saranno 3x3.

Il voto della teoria è una semplice media matematica dei due parziali. Poi vale il 70% del voto totale, e il 30% è dato dalla relazione di lab

# Esercizio 1

Fattorizzazione $PA=LU$$$A=\begin{bmatrix}2&1&1\\-1&1&2\\3&2&-1\end{bmatrix}$$
L'elemento pivot al primo passo è il $2$ in alto a sinistra, ma sotto c'è un elemento che è più grande in modulo, faccio uno scambio. Scambio 1-3:$$\rightarrow\begin{bmatrix}3&2&-1\\-1&1&2\\2&1&1\end{bmatrix}$$
Ora l'elemento pivot è il massimo, è $3$. I moltiplicatori sono $\dfrac{-1}3$ e $\dfrac23$.
Quindi la seconda riga sarà $\begin{bmatrix}-1&1&2\end{bmatrix}-\dfrac{-1}3\begin{bmatrix}3&2&1\end{bmatrix}$
La terza riga sarà $\begin{bmatrix}2&1&1\end{bmatrix}-\dfrac{2}3\begin{bmatrix}3&2&1\end{bmatrix}$
La matrice ottenuta è:$$\rightarrow\begin{bmatrix}3&2&-1\\0&\dfrac53&\dfrac53\\0&\dfrac{-1}3&\dfrac53\end{bmatrix}$$
Secondo passo di Gauss. L'elemento pivot è $\dfrac35$, sotto non c'è un elemento più grande in modulo, facciamo i moltiplicatori: è solo uno, $\dfrac{-1}3 / \dfrac53 = \dfrac{-1}5$. Stesso passaggio, ottengo:$$U=\begin{bmatrix}3&2&-1\\0&\dfrac53&\dfrac53\\0&0&2\end{bmatrix}$$
Vediamo adesso $L$: I moltiplicatori sono: $1$ $\dfrac{-1}3$ $\dfrac23$, nessuno scambio, $1$ $\dfrac{-1}5$, nessuno scambio, $1$$$L=\begin{bmatrix}1&0&0\\\dfrac{-1}3&1&0\\\dfrac23&\dfrac{-1}5&1\end{bmatrix}$$
Troviamo $P$: c'è stato un solo scambio, 1-3.$$P=\begin{bmatrix}0&0&1\\0&1&0\\1&0&0\end{bmatrix}$$
Dobbiamo fare il sistema$$\left\{\begin{matrix}L\underline{y}=P\underline{b}\\U\underline{x}=\underline{y}\end{matrix}\right.$$
In questo caso, $P\underline{b}=\underline{b}$. È una coincidenza. Scrivi comunque che hai fatto il passaggio e non cambia, o che insomma scrivi che lo sai, altrimenti sembra che ti sia dimenticato di fare il prodotto e abbia lasciato $\underline{b}$.

Insomma, ci esce un sistema triangolare molto facile da risolvere. Lo facciamo, troviamo la y, facciamo l'altro e fine.

In questo caso, $\underline{x}=\begin{bmatrix}1&1&1\end{bmatrix}^T$, che potremmo anche scrivere in verticale senza la trasposizione.

Adesso, se fossimo molto molto appassionati, potremmo sostituire il risultato ottenuto nell'originale e vedere se è giusto. Se è sbagliato, se avanza tempo lo rifai.

Il determinante di A. $det(A)=(-1)^{\#scambi}$ per la produttoria di tutti i moltiplicatori sulla diagonal, qui $(-1)\cdot(3\cdot\dfrac53\cdot2)$, che non mi sembrano i moltiplciatori, c'è scritto $m_{ii}$, da rivedere.

# Esercizio 2

$AB=I$, in questo caso è commutativa perché è così con le inverse, quindi $AB=BA=I=A^{-1}A=AA^{-1}=BB^{-1}=B^{-1}B$

$$A\cdot B = \begin{bmatrix}2&0&α\\0&2α&-1\\α&-1&2\end{bmatrix} \cdot \dfrac1β \begin{bmatrix}3&-1&-2\\-1&3&2\\-2&2&4\end{bmatrix}$$
Quello scalare $\dfrac1β$, anche se la moltiplicazione matriciale non è commutativa, io lo scalare lo sposto dove voglio, e fa molto comodo. Quindi lascio quella moltiplicazione per ultima.
$$A\cdot B = \begin{bmatrix}6-2α&-2+2α&-4+4α\\-2α+2&6α-2&4α-4\\3α-3&-α+1&-2α+6\end{bmatrix} \cdot \dfrac1β=\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}$$
Consindera che alcuni si ripetono

$$\left\{\begin{matrix}
\dfrac{6-2α}{β}=1\\
\dfrac{6α-2}β=1\\
\dfrac{-1+2α}β=0\\
\dfrac{4α-4}{β}=0\\
\dfrac{2-2α}{β}=0\\
\dfrac{3α-3}{β}=0\\
\dfrac{1-α}{β}=0\\
\end{matrix}\right.$$
Cominciamo da quelle uguali a $0$, perché possiamo ignorare il denominatore. Tutte sono verificate quando $α=1$. Da lì sostituisco e trovo facilmente $β=4$.

Semplice in realtà

Se ci escono valori diversi per lo stesso parametro, diciamo che nessun valore del parametro soddisfa la condizione. Se ci sono cose da fare una volta trovati (assegnati tali valori), probabilmente una soluzione c'è.

Cosa sono gli indici di condizionamento? Dobbiamo trovarli per entrambe le matrici

$$A=\begin{bmatrix}2&0&1\\0&2&-1\\1&-1&2\end{bmatrix}\enspace B=\dfrac14\begin{bmatrix}3&-1&-2\\-1&3&2\\-2&2&4\end{bmatrix}$$
E sono inverse tra loro.

Adesso, indici di condizionamento

$$K_1(A)=\|A\|_1\cdot\|A^{-1}\|_1=\|A\|_1\cdot\|B\|_1=K_1(B)$$
$$K_\infty(A)=\|A\|_\infty\cdot\|A^{-1}\|_\infty=\|A\|_\infty\cdot\|B\|_\infty=K_\infty(B)$$
E scrivilo che visto che sono una l'inversa dell'altra e per quello il condizionamento è uguale.

Per la norma a 2, c'è la formula speciale per le matrici simmetriche, quindi

$$K_2(A)=\dfrac{|λ_{max}(A)|}{|λ_{min}(A)|} \enspace\enspace\enspace K_2(B)=\dfrac{|λ_{max}(B)|}{|λ_{min}(B)|}$$
Visto che sono inverse, $λ_{min}(B)=\dfrac1{λ_{max}(A)}$, e viceversa, quindi anche questi condizionamenti sono uguali.

E poi le matrici sono simmetriche, quindi la norma a 1 e la norma a infinito sono uguali. Non ci sono domande di teoria ma la teoria è utile.

Fa più comodo trovare gli autovalori di $A$.

Ricorda come fare la determinante 3x3, ricorda che si alternano +-+, ricorda che c'è insomma prendi (1,1) e poi prendi la 2x2 ottenuta eliminando riga 1 e colonna 1.

Poi ci fa fare Ax=b, con b=\[4 0 4\]. Come si fa? x=Ainversab, se non ha un'inversa struttura particolare, se neanche quella faccio gauss. Qui chiaramente ho già l'inversa.

# Esercizio 3

Numeri macchina

L'unico errore che puoi fare è dimenticare di arrotondare a ogni passaggio, o arrotondare male

Chiede anche il maggior numero possibile e il minor numero possibile (in valore assoluto)