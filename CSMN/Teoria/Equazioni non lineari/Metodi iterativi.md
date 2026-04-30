Sono in ritardo non so di che si parli
# Bisezione

$$
f(a)·f(b)<0
$$

$$
[a,b] = [a_1,b_1] \Rightarrow 
$$

Ok ho capito l'argomento

Come troviamo gli zeri? Metodo di bisezione: prendiamo due punti $a$ e $b$, i cui risultati della funzione sono discordi. Vediamo il punto medio e chiamiamolo $c$. Se è discorde con $a$, allora $f(a)·f(c)<0$, e quindi iteriamo con $[a_{k+1},b_{k+1}]=[a_k,c_k]$. Altrimenti, $[c_k,b_k]$. Stiamo, dall'intervallo, prendendo il semiintervallo dove avviene il cambio di segno.

Vedi le #yellowboard per avere tutta la notazione perché qua mi interessava segnarmi il concetto.

Errore:

Qual è il massimo errore che posso commettere con quel $c$, al passo $k$, quindi $c_k$, la radice può essere o a sinistra o a destra di $c$, quindi posso sbagliare *al massimo* di metà del semintervallo, quindi $x_k=c_k=\dfrac{a_k+b_k}{2}$, quindi $|x_k-a|\leq\dfrac12|x_{k-1}-a|$. E vediamo che, non ho capito che dice:$$\lim\limits_{k\rightarrow\infty}\dfrac{|e_{k+1}|}{|e_k|^p}=c$$$p=1$ (c'è scritto, mi fido). $c$ converge a $\dfrac12$. Perché?

Vedi che è ricorsiva. $$|x_k-a|\leq\dfrac12|x_{k-1}-a|\leq\dfrac12\dfrac12|x_{k-2}-a|\leq\ldots\leq\dfrac1{2^k}|x_1-a|$$E $\dfrac1{2^k}$ tende a $0$ se $k$ tende a $\infty$.

Esempio: Determinare l'intervallo della forma $[l,l+1]$, con $l$ intero, che contiene la radice positiva dell'equazione $\cos(4x)-x^2+1=0$. Si indichi l'approssimazione che si ottiene applicando $3$ iterazioni del metodo di bisezione, prendendo dall'intervallo determinato.

Informazioni che vediamo: la radice è positiva, quindi necessariamente $l\geq0$.

Vediamo come determinare l'intervallo. Ci sono due modi. O disegniamo la funzione approssimativamente, o mettiamo i valori e vediamo dove cambia segno. Vediamo poi perché il secondo metodo non va bene.

Cominciamo con $[a,b]=[0,1]$. Troviamo $f(0)$ ed $f(1)$, che sono $2$ e $-0,65$. L'abbiamo beccato subito. I valori $2$ e $-0.65$ ci sono completamente inutili, ci interessa solo il segno. Molti poi li usano come estremi, che non ha assolutamente senso.

$[a_1,b_1]=[0,1]$, $c_1=\dfrac12$. $f(c_1)=0,34>0$, quindi $[a_2,b_2]=[c_1,b_1]$. Conviene segnare il segno sopra le lettere quando fai il calcolo su carta. $\overset + a_1 ,\; \overset - b_1 ,\; \overset + c_1$, una cosa del genere.

E si continua, $[a_2,b_2]=\left[\dfrac12,1\right]$, $c_2=\dfrac34$, $f(c_2)=-0,55<0$.

$[a_3,b_3]=\left[\dfrac12, \dfrac34\right]$, $f(c_3)=f(\dfrac58)=-0,19<0$.

$[a_4,b_4]=\left[\dfrac12,\dfrac58\right]$, $x_4≈c_4=\dfrac9{16}$ mi pare, non l'ho letto e sono di fretta.

# Metodo grafico

$cos(4x)-x^2+1=0$

Vedo che ho due funzioni dall'aspetto noto, faccio $-cos(4x)=x^2-1$ per farmi il grafico e vedere dove si toccano.
```desmos-graph
left=0; right=5;
top=1.5; bottom=-1.5;
---
y=\cos{4x}
y=x^2-1
```

Perché il metodo di bisezione ha problemi? Perché prendi per esempio $(x-1)^2=0$, ha una radice a $x=1$, ma non cambia mai segno.

Importante, imposta la calcolatrice in radianti, modalità `RAD`. Perché si intende quello, $cos(4)$ è il coseno di quattro radianti.

# Metodo di Newton

Allora. Vedi la #yellowboard. Prendi $x_0$, trovi $f'(x_0)$, quindi hai la tangente in $x_0$, trovi il punto in cui interseca l'asse delle $X$, lo chiami $x_1$ e iteri così.

Quindi, il mio primo punto è $(x_0,f(x_0))$. Poi hai la tua tangente che è $y=f'(x_0)(x-x_0)+f(x_0)$, la metti a $0$, e quindi $x_1=x_0-\dfrac{f(x_0)}{f'(x_0)}$. Il problema è che l'unico modo di sapere se $f'(x_0)=0$ è eseguire il metodo e farlo, e se lo è ti fermi. Non c'è un modo per saperlo in anticipo. È un problema a livello numerico, ma anche a livello geometrico, perché se è orizzontale non interseca l'asse delle $X$.

Errore e convergenza.$$\lim\limits_{x\rightarrow\infty}\dfrac{|e_{k+1}|}{|e_k|^2}≈\dfrac12\dfrac{|f''(a)|}{|f'(a)|}$$Se $f'(a)$ si annulla, quindi la moltiplicità è $>1$, allora ehhhh??? $p=2$ se $m=1$, $p=1$ se $m>1$. Questo perché ehhhhhhh io non sto capendo nulla, forse mi sono perso una lezione.

# Metodi quasi Newton

## Metodo delle corde

Essenzialmente non cambi mai il coefficiente angolare $m$. Ci dirà l'esame come calcolarlo, di solito è la tangente della prima $x$. Quindi $m_k=m$.

Questo metodo fa schifo. Il metodo di bisezione è lento ma converge sempre, il metodo di Newton è veloce ma non converge sempre, il metodo delle corde è lento e non converge sempre, il peggio del peggio.

## Metodo delle secanti

Prende come retta non una tangente ma una secante tra il boh e il boh. $m_k=\dfrac{f(x_{k+1})-f(x_k)}{x_{k+1}-x_k}$. Come punto di partenza mi servono due punti di partenza.

# Esempi

Niente più yellowboard, è morto il proiettore.

$f(x)=\cos(4x)-x^2+1=0$, $f'(x)=-4x\sin(4x)-2x$. Lo faccio a casa. Due iterazioni del metodo di Newton. Il risultato deve essere $1,46$.

Metodo delle corde, due iterazioni, $m=f'(x_0)$.

Secanti, $x_2=x_1-\dfrac{f(x_1)}{m_1}$, dove $m_1=\dfrac{f(x_1)-f(x_0)}{1-0}$. Partiamo da $0$ e $1$.