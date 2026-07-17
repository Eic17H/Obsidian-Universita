---
cssclasses: am
---
Vediamo dei metodi per partire da un'ipotesi, $p$, che siamo sicuri sia vera, e arrivare a dimostrare una tesi, $q$.

Piccola parentesi sull'utilizzo dei connettivi logici per le dimostrazioni, per poi passare all'argomento principale, la dimostrazione per induzione.

Vedi anche: [[Derivazione]]
## Con i connettivi logici
### Modus ponens
$$\dfrac{\begin{matrix}p\\ p \rightarrow q\end{matrix}}{q}$$Una dimostrazione parte da un'ipotesi $p$, trova in un teorema un passaggio della forma $p\rightarrow q$, e ne inferisce $q$.

### Per assurdo

$$\dfrac{\begin{matrix}\lnot p \\ \phantom{} q \land \lnot q\end{matrix}}{p}$$
Se io, partendo da $\lnot p$, riesco a dimostrare sia $q$ che $\lnot q$, allora so che $\lnot p$ è falsa, e cioè che $p$ è vera.

Perché so che $\lnot p$ è falsa? Perché ho $\lnot p \rightarrow (q \land \lnot q)$, ma $q \land \lnot q$ è falsa, e guardando la tabella di verità, se il conseguente è falso allora l'antecedente deve necessariamente essere falso perché l'implicazione sia vera.

## Induzione

Una caratteristica dei numeri naturali è che: $$\forall x, \exists!y\ |\ y+1=x \ \land\ x\in\mathbb N \ \land\ y \in \mathbb N\ \land\ x\neq0$$Cioè, ogni numero naturale diverso da $0$ ha un predecessore, e ogni numero naturale ha un successore.

Questo ci permette di fare dimostrazioni *per induzione*: se so che $\exists x \in \mathbb N \ |\ p(x)$ (passo base), e so che $p(x)\rightarrow p(x+1)$ (passo induttivo), cioè se so che un numero naturale ha una proprietà e se un numero ha quella proprietà allora ce l'ha anche il suo successore, posso *propagare* questo predicato a tutti i numeri naturali. Un effetto domino.

Facciamo un esempio. Vediamo della notazione per la *sommatoria di ==espressione== con ==variabile== che va da ==valore== a ==valore==*, cioè la somma di tutte le iterazioni di un certo loop. $$\sum\limits_{n=1}^n n = \dfrac{n(n+1)}{2}$$Come sappiamo che questa uguaglianza è vera per ogni numero naturale $n$? Com'è possibile? A sinistra c'è una somma di ==interi== ma a destra c'è una frazione.

Dimostriamolo per induzione. Passo base, $n=1$:$$n=1 \qquad 1=\dfrac{1(1+1)}{2}=1\qquad \text{vero}$$Il passo base va bene. Vediamo il passo induttivo. Immaginiamo che ci sia un valore $m$ qualsiasi, e ipotizziamo che la proposizione valga per $n=m$. Questa è la nostra ipotesi, la diamo per vera.

Passo induttivo, dimostriamo che se questo predicato è vero per un certo $m$, allora è necessariamente vero per $m+1$.$$1+2+\ldots+m\mathbf{+(m+1)}=\dfrac{m(m+1)}{2}\mathbf{+(m+1)}$$Qui abbiamo solo aggiunto $\mathbf{+(m+1)}$ al predicato applicato a $m$, da entrambi i lati. A sinistra, abbiamo ottenuto la sommatoria corretta per $m+1$. Adesso vediamo che a destra, facendo i calcoli, otteniamo la forma corretta della frazione per $m+1$, che dovrebbe essere $\dfrac{(m+1)(m+2)}{2}$:$$\dfrac{m(m+1)}{2}+(m+1)=\dfrac{\mathbf{m}(m+1)\mathbf{+2}(m+1)}{2}=\dfrac{(m+1)\mathbf{(m+2)}}{2}$$Come volevasi dimostrare.