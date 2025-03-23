Dati due numeri reali $a$ e $c$, e un numero intero $b$, se `a%b==c%b`, possiamo scrivere:

* $[a]_b = [c]_b$
* $a ≡ c\ (mod\ b)$

Un insieme di numeri equivalenti tra loro dato un certo $b$ è una *classe di resto*.
Per esempio, $[3]_5=[8]_5=[13]_5$.
In questo caso, nota come tutti questi numeri sono $3+5k$, con $k$ intero.
Possiamo quindi dire che $[a]_b=a+bk$.
Il modulo è distributivo per somma e prodotto: $[ab+c-d]_e=[a]_e[b]_e+[c]_e-[d]_e$.

Non esistono le divisioni, ma esiste qualcosa di simile, l’inverso moltiplicativo.
Dato $[a]_N$, $[a]_N^{-1}$ è un numero tale che $[a]_N×[a]_N^{-1} = 1$.
Per esempio, $[3]_{11}×[4]_{11}=[12]_{11}=[1]_{11}$, quindi $[3]_{11}^{-1} = [4]_{11}$.
L’inverso moltiplicativo esiste solo se $a$ ed $N$ sono coprimi.
Inoltre, $[-2]_{11}=[9]_{11}$. Come l’orario, se l’orario finisce con “:50” sono le “meno 10”, in modulo 60.