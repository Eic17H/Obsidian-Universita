Lo stesso argomento: <span class="am">[[AM/File/Calcolo infinitesimale/Serie di Taylor|Analisi]]</span>

Se una funzione è abbastanza regolare (non è a gradini, non ha salti, ha un comportamento abbastanza *smooth*, liscio), allora la posso approssimare abbastanza bene con un polinomio, che è la forma più semplice di equazione non lineare.

Regolare (in Analichese); sia $f \in \mathbb C^{n+1}[a,b]$ (derivate fino alla $n+1$esima continue tra $a$ e $b$) e sia $x_0 \in [a,b]$, allora $\forall x \in [a,b], \forall n \in \mathbb N, \exists t_n \text{ di grado } n \; | \; f(x) = t_n(x) + R_{n+1}(x)$. Cioè, la posso approssimare con un polinomio più uno scarto, un $R$esto.

Come è fatto $t_n(x)$? Coinvolge le derivate:$$t_n(x)=\sum_{k=0}^n \dfrac{f^{(k)}(x_0)}{k!}(x-x_0)^k \qquad \qquad R_{n+1}=\dfrac{f^{(n+1)}(ξ)}{(n+1)!}(x-x_0)^{n+1}$$
Dove $ξ$ è un certo valore ma non ci importa sapere quale.

Il caso specifico con $x_0=0$ è detta serie di McLourin. Non c'è niente di speciale, potremmo decidere che da oggi a CSMN si parte da $x_0=4$ e chiamarle serie di Fenu.

Esempio: $f(x)=e^x$, la più banale che esista, le derivate sono tutte uguali quindi si possono raccogliere a fattor comune, $\sum\limits_{k=1}^n \dfrac{x^k}{k!}$.
Con seno e coseno è similmente semplice, otteniamo solo le potenze pari e le potenze dispari, con il segno che si alterna.