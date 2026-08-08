---
cssclasses: lip
---
## Concetto

La macchina SECD è una macchina virtuale per linguaggi funzionali con un set di istruzioni piccolo e (relativamente) semplice. Consiste di quattro registri Stack, Environment, Control, Dump. Per quanto riguarda i tipi, $S$, $C$ e $D$ sono degli stack, mentre $E$ è un array associativo (da identificatori a valori).

La macchina in sé è fatto di due pile. Quella principale è la pila $\underset{\underset{\ldots}{(S_2,E_2,C_2)}}{(S_1,E_1,C_1)}$, che contiene i correnti $S$, $E$ e $C$. L'altra è $D$, che contiene $\underset{\underset{\ldots}{(S_b,E_b)}}{(S_a,E_a)}$. Pushare equivale a salvare il contesto, poppare equivale a riprisitnare il contesto.
## Linguaggio

Il nostro [[Anno 3/Semestre 1/LiP/Appunti dal libro/Linguaggi|linguaggio]] è come segue:$$\begin{matrix*}[l]
t:==
\\ & \phantom{|\ }c_i & \text{Costanti}
\\ & |\ x & \text{Identificatori }\in E
\\ & |\ op_i(t_1,\ldots,t_{a_i}) & \text{Operazioni primitive con arietà }a_i
\\ & |\ \textbf{if}(t_1,t_2,t_3) & \text{Condizionale}
\\ & |\ \textbf{fun}(f,x,t) & \text{Funzione anonima}
\\ & |\ \textbf{apply}(t_1,t_2) & \text{Applicazione di funzione}
\end{matrix*}$$
## Regole di inferenza

Sono così incomrensibili. SCrivo wuello che capisco !!!! e poi ci apirlè meglio di più tardi

* Se $top(C)=op(...)$, allora riscrivi $op(...)$ in notazione polacca inversa.
* Se $top(C)=if(...)$, allora //
* // $apply$ //
* Se $top(C)=n\in \mathbb N$, allora $S.push(C.pop())$
* // $b \in \mathbb{Bool}$ //
* Se $top(C) = var(x)$, allora $S.push(E(C.pop())$, cioè togli la variabile da $C$ e metti il suo valore in $S$ (togli $x$ da lì e metti $E(x)$ là)
* Se $top(C)=fun(f,x,t)$, allora $S.push(C.pop())$
* Se $top(S)=v_2::v_1$ ($S$ comincia con due valori) e $top(C)=App$ ($C$ comincia con l'operatore $apply$), allora dobbiamo pushare una nuova $(S,E,C)$ che sarebbe $([], E[v_1/f][v_2/x],t::[])$, nel senso che il nostro nuovo $S$ è vuoto, il nostro nuovo ambiente ha $v_1=f$ e $v_2=x$, e il nostro nuovo $C$ contiene solamente $t$ (perché è il corpo della funzione da valutare, questa è una chiamata a funzione)
* Se $top(S)=v$ e $C=[]$, e c'è un $(S,E,C)$ sotto, poppiamo la pila di SEC, e in quella sotto pushiamo $v$ in $S$.
* Niente, se in cima a $S$ ci sono $n$ valori, e in cima a $C$ c'è un operatore $n$-ario, allora poppa tutti quei valori da $S$, poppa l'operatore da $C$, e pusha il risultato dell'operazione su $S$
* Se in cima a $S$ hai un valore, e in cima a $C$ hai un condizionale in notazione polacca inversa vale a dire $If::t_2::t_3::C$, se $v=true$ allora rimpiazza quello con $t_2::C$, altrimenti con $t_3::C$, e in entrambi i casi poppa $S$.

Casino? Sì.