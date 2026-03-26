$\newcommand{\vx}{\underline{x}}$$\newcommand{\vy}{\underline{y}}$$\newcommand{\vz}{\underline{0}}$$\newcommand{\sp}{\enspace}$$\newcommand{\R}{\mathbb{R}}$$\newcommand{\maxx}{\max\limits_}$$\newcommand{\inf}{\infty}$Una norma è una funzione che va da uno spazio vettoriale ai reali positivi.
# Proprietà

Le norme matriciali condividono le tre proprietà delle [[norme vettoriali]]:

1. $\|\vx\| \ge 0$ e $\|\vx\| ↔ \vx=\vz$
2. $\|a\vx\| = |a| · \|\vx\|$
3. $\|\vx+\vy\| \le \|\vx\|+\|\vy\|$

Le norme matriciali hanno altre due proprietà

4. Submoltiplicatività: $\|AB\| \leq \|A\|·\|B\|$
5. Consistenza: $A\vx=\vy$, ricorda la regola per sapere le dimensioni, quindi la norma di $\vx$ e la norma di $\vy$ sono norme in $\R^n$ con $n$ diversi tra i due. Quindi se ho $\|·\|_\alpha \in \R^n$ e $\|·\|_\beta \in \R^m$ allora $\|A\vx\|_\beta \le \|A\|\cdot\|\vx\|_\alpha$.

# Norma di Frobenius

Esempio, norma di Frobenius che credo abbia detto sia la più comune, $$\|A\|_F = \sqrt{\sum_{i=1}^{m}{\sum_{j=1}^{n}{|a_{ij}|^2}}}$$
# Norme indotte
## Definizione

La norma indotta dal qualunque norma vettoriale $\|\cdot\|$ è data da $\|A\|$ ed è definita in due modi equivalenti:
$$\maxx{\vx≠\vz} \dfrac{\|A\vx\|}{\|\vx\|} \qquad \maxx{\|\vx\|=1} \|A\vx\|$$

Vedremo la norma a 1, a 2 e a infinito della norma indotta, così come abbiamo visto quelle per i vettori.

Osservazione: per ogni norma indotta, $\|I\|=1$: con $\maxx{\vx≠\vz} \dfrac{\|I\vx\|}{\|\vx\|}$, per esempio, ti rimane $\dfrac{\|\underline{x}\|}{\|\underline{x}\|}= 1$, ci torna. Per la norma di Frobenius invece, ti esce che $\|I\|=\sqrt{n}$, quindi non è una norma indotta.

## Norma indotta dalla norma a infinito

### Teorema

La norma indotta dalla norma vettoriale infinita è:$$\|A\|_{\infty}=max_{i=1,...,m} \sum_{j=1}^{n}{|a_{ij}|}$$Vale a dire, il massimo delle somme riga.

### Dimostrazione
$$\|A\|_{\infty}=\maxx{\|\vx\|_{\infty}=1}\|A\vx\|_{\inf}$$Questo lo sappiamo, è la definizione.$$\|A\underline{x}\|_{\inf}=\maxx{i=1,...,m}|(Ax)_i|$$Cosa significa però. $(Ax)_i$ sarebbe, in parole povere (sbagliate), "la riga i di A · vettore x", cioè $\sum_{j=1}^n a_{ij}x_j$. Sostituiamo: $$\|A\vx\|_{\inf}=\maxx{i=1,...,m}|\sum_{j=1}^n a_{ij}x_j|$$Però sappiamo che il valore assoluto di una somma di prodotti è minore o uguale alla somma dei prodotti dei valori assoluti: $$\|A\vx\|_{\inf}\le \maxx{i=1,...,m}\sum_{j=1}^n |a_{ij}||x_j|$$ Poi possiamo spostare il max $$\|A\vx\|_{\inf}\le \maxx{i=1,...,m}\sum_{j=1}^n |a_{ij}|·\maxx{j=1,...,m}|x_j|$$
Adesso abbiamo però una disuguaglianza, non un'uguaglianza. Per avere un'uguaglianza, considero $\underline{x}=(s_1,...,s_n)^T$, dove $s_j=sign(a_{ij})$, $i$ è l'indice massimo delle somme riga (somma dei valori assoluti degli elementi della riga). Quindi, prendo come riga di riferimento quella con la somma massima dei valori assoluti (somma riga massima). Se quella riga è $(2, 4, -7)$, allora il nostro $x$ sarà $(1,1,-1)$. Non si è capito nulla, ma questo fa sì che si faccia il valore assoluto. Vedi il libro sicuramente aiuterà.

## Norma indotta dalla norma a 1

La simmetrica rispetto a quella a infinito. Facciamo le somme colonna e prendiamo il massimo. La dimostrazione è molto molto simile quindi la possiamo lasciare perdere. Da vedere cosa sono le norme vettoriali perché mancavo e l'anno scorso non ho seguito.

Ah quindi è semplicemente il massimo delle somme colonna? E le somme colonna sono solo la somma dei valori assoluti degli elementi della colonna? Così è molto più semplice. Ok la parte difficile è la dimostrazione immagino

## Norma indotta dalla norma a 2

$$\|A\|_2 = \sqrt{ρ(A^*A)}$$
Quanta roba che c'è in questa piccola piccola formula. E perché è così? Eh questa è brutta.

Cose utili da ricordare: due proprietà di $A^TA$, che per i reali è uguale ad $A^*A$. È simmetrica, sempre, quindi $A^TA = (A^TA)^T$, perché $(A^TA)^T = ((A^T)^TA^T)^T = A^TA$,. È anche sempre definita positiva (altra cosa che ha spiegato quando non c'ero e ho gli incubi dall'esame perché non l'ho mai capito).

Definita positiva:
$$\underline{x}^TA^TA\underline{x}>0$$
$$\underline{x}^TA^TA\underline{x} = (A\underline{x})^TAx$$
ridefiniamo $A\underline{x} = \underline{y}$
$$(\underline{y})^T\underline{y} = \|\underline{y}\|^2_2>0$$
È maggiore di 0 essendo al quadrato. Eh? Eh sì, è così, vedi la norma vettoriale.

Queste erano le proprietà di $A^TA$.

Allora. Quel \|x\| 2 2 = <x,x> = <a1v1 + a2v2 + ..., a1v1 + la stessa cosa> (ha scomposto il vettore). Linearmente indipendenti. < a1v1,a1v1 > + < a1v1, a2v2 > + ...

Però essendo linearmente indipendenti, tutti questi prodotti scalari sono uguali a 0, tranne quelli che hanno lo stesso indice due volte. Ma < a1v1,a1v1 > = a1\^2. E quindi è la somma dei quadrati degli elementi di x.

A noi. Cosa importa.

Ah certo, $$\|A\underline{x}\|^2_2 = <A\underline{x},A\underline{x}> = (A\underline{x})^TA\underline{x} = \underline{x}^TA^TA\underline{x}$$
Con questo? È uguale a $$\sum_{i=1}^n a_iv_i^TA^TA · \sum_{j=1}^na_jv_j$$

E ha detto che abbiamo detto anche che $A^TA\underline{v}_j = λ_j\underline{v}_j$, perché è come $A\underline{x} = λ\underline{x}$. Ah sì? Ok

A me sembra di aver capito quasi tutti i passaggi.

Il prodotto scalare di un vettore x per sé stesso è x trasposto per x. Visto che quel vettore era Ax, abbiamo distribuito la trasposta sul prodotto come abbiamo imparato a fare.

OHHHHHHH! Quei v1 v2 v3, che sono linearmente indipendenti... non sono altro che gli autovettori! Perché...? Va be', ha senso il concetto è quello sono linearmente indipendenti, mi sembra. Quei v quindi sono autovettori. E la matrice si chiama $A^TA$, ma la chiamiamo volentieri $B$. e da lì abbiamo che Bv=λv per definizione no? E.............. Possiamo sostituire B con λ, e B è ATA.......... E lo possiamo mettere dentro la somma, no? Proprietà distributiva, antidistributiva e ridistributiva proprietà commutativa lo mettiamo da un'altra parte tanto non ha l'indice della sommatoria. Ma quindi abbiamo $$\sum_{i=1}^n a_iv_i^T · \sum_{j=1}^na_jλv_j$$
Ma guarda! Guarda! Abbiamo $v^tv$. Ma quindi... Guarda su. Guarda su. Tutto, tutto si annulla, **tranne** le coppie con indice uguale. Cioè... la diagonale. Il prodotto **è diverso da 0 solo se j=i**. Quindi possiamo mettere j=i, e uniamo le sommatorie

$$\sum_{i=1}^n a_iv_i^T · a_iλv_i = \sum_{i=1}^n λa_i^2v_i^Tv_i$$Ah tutti quei lambda dovevano avere il pedice

Eh... Boh. Quindi boh. Ha detto, annunciato, che è uguale al massimo degli autovalori, cioè il raggio. Ma allora, minore o uguale no? Devo prendere, per renderlo uguale, il maggiore. Cioè il raggio spettrale. Ci sono un paio di passaggi qui alla fine che non ho capito.

aaaaaaaaa

# Ora.

# Corollario

Cosa succede se A è simmetrica? La formula generica mi dice che radice quadrata di ro per ata. Però se A è simmetrica, AT=A, e quindi ATA = A\^2. Gli autovalori del quadrato di una matrice sono i quadrati degli autovalori della matrice. Quindi rho(A2) = rho(A)2, e quindi la radice si semplifica e quindi quando la matrice è simmetrica la norma a 2 è uguale al raggio spettrale. woah

Però adesso mi sembra molto più semplice

E io non avevo capito nulla. nulla. Perché avevo dimenticato che nella formula ci fosse il raggio spettrale. Ma non ho ancora capito davvero perché c'è.

Tra l'altro, visto che ATA è sempre simmetrica, ne calcoli un pezzo e un altro pezzo ce l'hai gratis (la diagonale principale non è mai gratis).

AAT è diversa, bisogna stare attenti a non fare AAT, perché ti esce un prodotto 3x3 ma da una matrice di rango 2, che essendo di rango 2 ti darà uno dei tre autovalori nullo.

Poi, se è simmetrica, non devo calcolare il quadrato della matrice, cambio l'ordine e facciamo gli autovalori della matrice originale, e il massimo (in modulo) è lo spettro e quindi la norma.

Teorema:

Se \|·\| è consistente e A è quadrata, allora rho(A)<=\|A\|. Cosa vuol dire? Se faccio la norma e faccio un cerchio che ha come raggio la norma ottengo un cerchio che contiene comunque tutti gli autovalori. Molto molto potente. Calcolare il raggio spettrale è molto lento, la norma a infinito è velocissima, la norma a 1 è velocissima, faccio quello.