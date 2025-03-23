La funzione $φ$ (fi) di Eulero, o toziente, ha tre proprietà principali.

• $φ(n)$ è il numero di numeri coprìmi con $n$ più piccoli di $n$;
• Con un esempio, $24=22×32$, $φ(24)=22-1×(2-1)×32-1×(3-1)$;
• Per qualsiasi $x$, $[xφ(N)]_N=1$;

Due numeri sono coprimi se il loro MCD è $1$.
Per qualsiasi numero primo $p$, $φ(p)=p-1$.
$φ(a×b)=φ(a)×φ(b)$.

Considera la terza proprietà. $xφ(N)$ è una potenza di $x$, ed è uguale a $1$ modulo $N$.
Proprietà delle potenze
$1 = xφ(N) = x1+φ(N)-1 = x1×xφ(N)-1\ (mod\ N)$.
Guarda bene.
$x1×xφ(N)-1 = 1\ (mod\ N)$.
$xφ(N)-1$ è l’inverso moltiplicativo di $x$ in modulo $N$, per definizione.
Questo vale sempre, se l’inverso moltiplicativo esiste.