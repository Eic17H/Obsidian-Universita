## Verofunzionalità

Il calcolo tableau si basa su semplici fatti sui connettivi logici. Data una formula $\alpha$, possiamo dire che è vera, $T(\alpha)$, o falsa, $F(\alpha)$. A seconda del suo connettivo principale, possiamo asserire formule diverse.
* Se $\alpha$ è della forma $\beta \land \gamma$:
	* Se $T(\beta \land \gamma)$, possiamo asserire $T(\beta)$ e $T(\gamma)$.
	* Se $F(\beta \land \gamma)$, possiamo asserire $F(\beta)$ o $F(\gamma)$.
* Se $\alpha$ è della forma $\beta \lor \gamma$:
	* Se $T(\beta \lor \gamma)$, possiamo asserire $T(\beta)$ o $T(\gamma)$.
	* Se $F(\beta \lor \gamma)$, possiamo asserire $F(\beta)$ e $F(\gamma)$.
* Se $\alpha$ è della forma $\beta \to \gamma$:
	* Se $T(\beta \to \gamma)$, possiamo asserire $F(\beta)$ o $T(\gamma)$.
	* Se $F(\beta \to \gamma)$, possiamo asserire $T(\beta)$ e $F(\gamma)$.
* Se $\alpha$ è della forma $\lnot \beta$:
	* Se $T(\lnot \beta)$, possiamo asserire $F(\beta)$.
	* Se $F(\lnot \beta)$, possiamo asserire $T(\beta)$.

Lo scopo è di scomporre formule lunghe in formule più corte. [[Capendo|Ci ho messo un po' a capirlo]].

## Albero

Anche qui una derivazione è un albero i cui nodi sono formule. In realtà possiamo non scrivere esplicitamente $T()$ ed $F()$, lasciamo impliciti i passaggi $T(\lnot (\alpha \lor \beta)) \rightsquigarrow F(\alpha \lor \beta) \rightsquigarrow F(\alpha), F(\beta) \rightsquigarrow T(\lnot \alpha), T(\lnot \beta)$ e scriviamo direttamente $\tfrac{\lnot(\alpha \lor \beta)}{\lnot \alpha, \lnot \beta}$.

Se da un nodo derivano due nodi che sono entrambi veri, anziché ramificare li mettiamo consecutivi. Ramifichiamo solo se due nodi sono alternativi, come con una disgiunzione.

Con la solita notazione con la barra orizzontale sarebbe così:$$\dfrac{\alpha \land (\beta \lor \gamma)}{\dfrac{\alpha}{\dfrac{\beta \lor \gamma}{\beta \qquad \gamma}}}$$Ma per poter numerare le formule scriverò così:$$\begin{matrix}
\begin{matrix}
1 & \alpha \lor (\beta \lor \gamma) \\
2 & \alpha & (1) \\
3 & \beta \lor \gamma & (1) \\
\end{matrix} \\
\begin{matrix}
\begin{matrix}
4 & \beta & (3)\end{matrix}
&&&
\begin{matrix}
5 & \gamma & (3)
\end{matrix}
\end{matrix}
\end{matrix}$$
## Dimostrazioni

Per dimostrare che $\alpha$ è una tautologia, deriviamo una contraddizione da $\lnot\alpha$. Questo significa avere, per un certo $\beta$, sia $\beta$ che $\lnot \beta$ nello stesso ramo. Una volta che l'abbiamo fatto per tutti i rami, la dimostrazione è conclusa. $$\begin{matrix}\begin{matrix}
1 & (p \land \lnot p) \lor (q \land \lnot q)\\
\end{matrix} \\
\begin{matrix}
\begin{matrix}
2 & p \land \lnot p & (1) \\
4 & p & (2) \\
5 & \lnot p & (2) \\
& \times
\end{matrix}
&&&
\begin{matrix}
3 & q \land \lnot q & (1) \\
6 & q & (3) \\
7 & \lnot q & (3) \\
& \times
\end{matrix}
\end{matrix}
\end{matrix}$$
Questo ci dice che la negazione di $(p \land \lnot p) \lor (q \lor \lnot q)$, cioè $(p \lor \lnot p) \land (q \lor \lnot q)$, è una tautologia.

### Esempi

#### Scambio dell'antecedente

$(α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))$

$$\begin{matrix}
\begin{matrix}
1 & F((α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))) \\
2 & T(\alpha \to (\beta \to \gamma)) & (1) \\
3 & F(\beta \to (\alpha \to \gamma)) & (1) \\
4 & T(\beta) & (3) \\
5 & F(\alpha \to \gamma) & (3) \\
6 & T(\alpha) & (5) \\
7 & F(\gamma) & (5) \\
\end{matrix} \\
\begin{matrix}
\begin{matrix}
8 & F(\alpha) & (2) \\
& \times & (6,8) \\ \ 
\end{matrix}
\qquad\qquad
\begin{matrix}
\begin{matrix}
9 & T(\beta \to \gamma) & (2) \\
\end{matrix} \\
\begin{matrix}
\begin{matrix}
10 & F(\beta) & (9) \\
& \times & (4,10)
\end{matrix}
\qquad \qquad
\begin{matrix}
11 & T(\gamma) & (9) \\
& \times & (11,7)
\end{matrix}
\end{matrix}
\end{matrix}
\end{matrix}
\end{matrix}$$
Ho trovato un modo migliore per formattarlo.

Pensavo di aver aggiunto passaggi inutili ma è uguale a come lo fa il sito.