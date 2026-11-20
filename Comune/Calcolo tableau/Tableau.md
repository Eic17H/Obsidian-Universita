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

Lo scopo è di scomporre formule lunghe in formule più corte.

Da qui, l'articolo wikipedia non ha senso. Usa tre notazioni diverse e la spiegazione a parole non sembra corrispondere a niente. Esiste [questo sito](https://www.umsu.de/trees/) che genera alberi. Per esempio, $p \models p$ diventa:$$\dfrac{\dfrac{p}{\lnot p}}{\times}$$
Vediamo invece $p \to p$:$$\dfrac{\dfrac{\dfrac{\lnot(p \to p)}{p}}{\lnot p}}{\times}$$
Cosa mi sembra di vedere?$$\dfrac{\dfrac{\dfrac{\lnot(p \to p)}{p}T \lnot, F \to}{\lnot p}}{\times}$$
Ok quindi. Neghiamo quello che vogliamo dimostrare, che è della forma $T(\lnot \beta)$. Otteniamo $F(\beta \to \gamma)$, da cui asseriamo $T(\beta)$ e $F(\gamma)$. Visto che stiamo asserendo $p$ e $\lnot p$, abbiamo raggiunto una falsità. Quindi $\lnot(p \to p)$ deve essere falsa.

Sto anche leggendo male l'albero mi sa.

Provo con $(p \lor q) \to p$:$$\dfrac{F((p \lor q) \to p)}
{\dfrac{T(p \lor q)}{} \qquad \dfrac{F(p)}{}} F(\to)$$
È qui che sbaglio. Ok. Devo mettere una sotto l'altra le cose vere, e ramificare solo se ci sono due possibilità.$$
\dfrac{\dfrac{1}{2}}{3}
\dfrac{\dfrac{F((p \lor q) \to p)}{T(p \lor q)}}{F(p)}
\dfrac{}{}$$
E mi rendo conto che scriverle così non va bene, quindi provo a usare matrici.$$\begin{matrix}
1 & F((p \lor q) \to p)\\
2 & T(p \lor q) & 1, F(\to)_a \\
3 & F(p) & 1,F(\to)_b \\
\begin{matrix} 4\\ 5 \end{matrix} & \begin{matrix} T(p) & T(q)\\
\times
\end{matrix} & \begin{matrix}2, T(\lor) \\ 3, 4\end{matrix}
\end{matrix}$$
Praticamente parto dall'alto, cerco la prima formula di cui non ho applicato le regole e le applico. Al quarto passo ramifico. Chiudo a sinistra perché ho sia $T(p)$ che $F(p)$, ma poi non so.

Ah, certo. No ma è così, forse. Perché l'originale è falsificabile. Ho sbagliato io.

Però è una cosa del genere.

Non so come formattarlo ma è carino.

![[Pasted image 20261120151654.png]]

