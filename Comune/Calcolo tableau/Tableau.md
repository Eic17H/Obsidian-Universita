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
1 & \alpha \lor (\beta \lor \gamma) \\
2 & \alpha & (1) \\
3 & \beta \lor \gamma & (1) \\
& \begin{matrix}
\begin{matrix}
4 & \beta & (3)\end{matrix}
&&&
\begin{matrix}
5 & \gamma & (3)
\end{matrix}
\end{matrix}
\end{matrix}$$
## Dimostrazioni

Per dimostrare che $\alpha$ è una tautologia, deriviamo una contraddizione da $\lnot\alpha$. Questo significa avere, per un certo $\beta$, sia $\beta$ che $\lnot \beta$ nello stesso ramo. Una volta che l'abbiamo fatto per tutti i rami, la dimostrazione è conclusa. $$\begin{matrix}
1 & (p \land \lnot p) \lor (q \land \lnot q)\\
& \begin{matrix}
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
1 & F((α\rightarrow(β\rightarrowγ))\rightarrow(β\rightarrow(α\rightarrowγ))) \\
2 & T(\alpha \to (\beta \to \gamma)) & (1) \\
3 & F(\beta \to (\alpha \to \gamma)) & (1)\\
&\begin{matrix}
\begin{matrix}
4 & F(\alpha) & (2) \\
6 & T(\beta) & (3) \\
8 & F(\alpha \to \gamma) & (3) \\
10 & T(\alpha) & (8) \\
&\times & (4,8)
\\ \\ \\
\end{matrix}
&&&
\begin{matrix}
5 & T(\alpha \to \gamma) & (2) \\
7 & T(\beta) & (3) \\
9 & F(\alpha \to \gamma) & (3) \\
& \begin{matrix}
\begin{matrix}
11 & F(\alpha) & (5) \\
13 & T(\alpha) & (9) \\
& \times & (11,13) \\ \\
\end{matrix}
&&&
\begin{matrix}
12 & T(\gamma) & (5) \\
14 & T(\alpha) & (9) \\
15 & F(\gamma) &(9) \\
& \times & (12,15)
\end{matrix}
\end{matrix}
\end{matrix}
\end{matrix}
\end{matrix}$$
Ok non è male. È brutto da formattare. La cosa che ho sbagliato è che non sei davvero obbligato ad andare dall'alto al basso, puoi inferire dalla $(3)$ che non ramifica prima di inferire dalla $(2)$ che ramifica, così tieni un singolo ramo per più tempo.

![[Pasted image 20261121140651.png]]

Tra l'altro ho anche sbagliato, la $(5)$ ha $\alpha$ anziché $\beta$.