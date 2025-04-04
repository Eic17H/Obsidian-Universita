Una domanda sarà su questo.

Un numero $n$ è divisibile per $m$ se $n=mk$, cioè $[m]_n=0$. Si scrive $m|n$, “m divide n”.
Se $n$ è $4736$, questo è uguale a $4×103+7×102+3×10+6$.
In generale, $x = a_k×10^k+a_{k-1}×10^{k-1}+…+a_1×10+a_0$.
Possiamo distribuire il modulo.
$[x]_N = [a_k]_N×[10^k]_N+[a_{k-1}]_N×[10^{k-1}]_N+…+[a_1]_N×[10]_N+[a_0]_N$.

Diamo valori a $N$:

### $N=2$.
$[x]_2 = [a_k]_2×[10^k]_2+[a_{k-1}]_2×[10^{k-1}]_2+…+[a_1]_2×[10]_2+[a_0]_2$.
Nota che $[10]_2=[0]_2$.
$[x]_2 = [a_k]_2×[0^k]_2+[a_{k-1}]_2×[0^{k-1}]_2+…+[a_1]_2×[0]_2+[a_0]_2$.
Quindi rimane solo l’unico addendo non moltiplicato per 0.
$[x]_2 = [a_0]_2$.
$2|x\ ⟺\ [x]_2=0\ ⟺\ [a_0]_2=0\ ⟺\ 2|a_0$.
$2|x\ ⟺\ 2|a_0$.
“Un numero è divisibile per 2 se e solo se lo è la sua ultima cifra”.
La stessa logica si applica a 5.

### $N=4$.
Caso simile.
$[100]_4=[0]_4$, quindi tutti i multipli (non solo le potenze) di 100 diventano 0.
“Un numero è divisibile per 4 se e solo se lo sono le sue ultime due cifre”.
E così via per tutte le potenze di 2 e di 5.

### $N=3$.
$[10]_3=[1]_3$, quindi cosa rimane? La somma di tutte le cifre.
$[x]_3 = [a_k]_3×[10^k]_3+[a_{k-1}]_3×[10^{k-1}]_3+…+[a_1]_3×[10]_3+[a_0]_3$;
$[x]_3 = [a_k]_3×[1^k]_3+[a_{k-1}]_3×[1^{k-1}]_3+…+[a_1]_3×[1]_3+[a_0]_3$;
$[x]_3 = [a_k]_3×[1]_3+[a_{k-1}]_3×[1]_3+…+[a_1]_3×[1]_3+[a_0]_3$;
$[x]3 = [ak]3+[ak-1]3+…+[a1]3+[a0]3$;
$[x]_3 = [a_k+a_{k-1}+…+a_1+a_0]_3$;
$3|x ⟺ [x]_3=0 ⟺ [a_k+a_{k-1}+…+a_1+a_0]_3=0 ⟺ 3|(a_k+a_{k-1}+…+a_1+a_0)$;
$3|x ⟺ 3|(a_k+a_{k-1}+…+a_1+a_0)$.
“Un numero è divisibile per 3 se lo è la somma delle sue cifre”.

### $N=11$.
$[10]_{11}=[-1]_{11}$, quindi è come il 3, ma anziché sommarle, alterni i segni.
La cifra delle unità ha esponente $0$, quindi è positiva, e da lì si alterna.
Alterni perché $-1^n$ è $1$ per $n$ pari e $-1$ per $n$ dispari.

### $N=7$.
Non credo lo chieda, è troppo complicato.