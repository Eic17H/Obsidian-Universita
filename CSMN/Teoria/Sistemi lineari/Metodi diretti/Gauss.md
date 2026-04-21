I metodi diretti basati su strutture che abbiamo visto si usano *sempre* se il testo ti dice che la matrice ha una struttura particolare. Altrimenti, si usa l'\[title card]
# Algoritmo di Gauss

Ci permette di trasformare un algoritmo lineare generico in un sistema con struttura, in particolare una matrice triangolare superiore.

Segretamente, è qualcosa che stavamo già facendo. $x+y=3 \land x-y=1 \rightarrow x=2 \land y=1$. Come lo risolviamo alle medie? "Prendi la prima e sottraila dalla seconda", o il contrario. $x+y-x+y=2; \; 2y=2; \; y=1$. Vediamola sotto forma di matrice.

Primo passo:$$\begin{bmatrix} 1 & 1 \\ 1 & -1\end{bmatrix}$$
Secondo passo (dopo la sottrazione):$$\begin{bmatrix}1 & 1 \\ 0 & 2\end{bmatrix}$$
Sono diverse, la prima è normale e la seconda è triangolare. Le accomuna il fatto che hanno le stesse soluzioni.

Quali sono le regole di equivalenza che le accomunano?

1) Moltiplicare entrambi i "lati" per lo stesso scalare. EQi <- aEQi
2) Posso rimpiazzare un'equazione con la somma tra due equazioni (metodo di riduzione). EQi <- EQi + EQj
3) Posso scambiare due equazioni. EQi <-> EQj

**Non ottengo la stessa matrice. Il sistema associato ha la stessa soluzione.**

Se ho 3x-y in una e 12x-y nell'altra, cosa posso fare? L'algoritmo di Gauss fa rigai <- rigai - mi1 \* riga1, ed mi1=ai1/a11, cioè moltipichi 3x-y per 12/3.

Esempio:

$$\left\{ \begin{matrix}
3x_1 & + 2x_2 & + x_3 & =2\\
x_1 & +2x_2 & +4x_3 & =3\\
4x_1 & +x_2 & +2x_3 & =4\\
\end{matrix} \right.$$
In matrice:$$A=\begin{bmatrix}
3 & 2 & 1\\
1 & 2 & 4\\
4 & 1 & 2\\
\end{bmatrix}
\enspace\enspace\enspace \underline{b}=\begin{bmatrix}
2\\
3\\
4\\
\end{bmatrix}$$
Allora. Cosa posso fare? $m_{21}=\dfrac{1}{3}$, $m_{31} = \dfrac{4}{3}$. E faccio, riga2 <- riga2-m21riga1.$$\begin{bmatrix}1&2&4\end{bmatrix} - \dfrac{1}{3}\begin{bmatrix}3&2&1\end{bmatrix}=\begin{bmatrix}1&2&4\end{bmatrix}-\begin{bmatrix}1&\dfrac{2}{3}&\dfrac{1}{3}\end{bmatrix} = \begin{bmatrix} 0&\dfrac{4}{3}&\dfrac{11}{3}\end{bmatrix}$$
È uscito uno zero a sinistra. Esattamente come volevo. Facciamo lo stesso alla terza riga. Importante, **non scriviamo A= prima della matrice che abbiamo ottenuto**, quella non è A, è una nuova matrice con la stessa soluzione. Ha un altro nome, va bene qualunque altro nome che non sia A, chiamala Marta se vuoi, ma non A. Va bene anche una freccia.$$\begin{bmatrix}
3 & 2 & 1\\
0 & \dfrac{4}{3} & \dfrac{11}{3}\\
0 & -\dfrac{5}{3} & \dfrac{2}{3}\\
\end{bmatrix}$$
C'è un altro problema. La riga 3 al centro non ha 0. Stesso identico procedimento: $m_{32} = - \dfrac{5}{3} \cdot \dfrac{3}{4} = - \dfrac{5}{4}$.

Otteniamo una nuova matrice, magari la chiamiamo Giada.$$\begin{bmatrix}
3 & 2 & 1\\
0 & \dfrac{4}{3} & \dfrac{11}{3}\\
0 & 0 & \dfrac{15}{4}\\
\end{bmatrix}$$
Il sistema che ne risulta è:$$\left\{ \begin{matrix}
3x_1 & + 2x_2 & + x_3 & = \dots\\
 & +\dfrac{4}{3}x_2 & +\dfrac{11}{3}x_3 & =\dots\\
 & & +\dfrac{15}{4}x_3 & =\dots\\
\end{matrix} \right.$$
Quanti passi ci ho messo? Ho cambiato tutte le righe tranne la prima, quindi n-1 passi.

Cosa c'è a destra dell'uguale? Mica può restare invariato. Lascia a noi come esercizio capire come trovare i valori.

Per controllare di aver trovato la soluzione giusta, torna su e sostituisci il valore.

Problema. Che succede quando il denominatore di $m$ si annulla? Il denominatore è sempre l'elemento sulla diagonale. Usiamo il terzo principio di equivalenza: scambia la riga con una che va bene. Questo si chiama *pivoting*. L'elemento diagonale appunto si chiama elemento pivot. Per questioni di stabilità numerica conviene sempre scambiare con la riga dove c'è l'elemento massimo, per ottenere la frazione più piccola possibile.

Introduzione di una definizione che servirà più avanti:

È impossibile che ci sia un pivot nullo se la matrice è di uno di questi due tipi (strutture):

* Simmetrica definita positiva -> nessun pivot sarà nullo
* Diagonalmente dominante (per righe o per colonne): se $|a_{ii}| \geq \sum_{j=1, j≠i}^n|a_{ij}|$ è per righe, al rovescio per colonne.