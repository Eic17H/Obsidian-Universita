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