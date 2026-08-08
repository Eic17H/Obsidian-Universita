---
cssclasses: lip
---
## Concetto

La macchina SECD è una macchina virtuale per linguaggi funzionali con un set di istruzioni piccolo e (relativamente) semplice. Consiste di quattro registri Stack, Environment, Control, Dump. Per quanto riguarda i tipi, $S$, $C$ e $D$ sono degli stack, mentre $E$ è un array associativo (da identificatori a valori).

La macchina in sé è fatta di due pile. Quella principale è la pila $\underset{\underset{\ldots}{(S_2,E_2,C_2)}}{(S_1,E_1,C_1)}$, che contiene i correnti $S$, $E$ e $C$. L'altra è $D$, che contiene $\underset{\underset{\ldots}{(S_b,E_b)}}{(S_a,E_a)}$. Pushare equivale a salvare il contesto, poppare equivale a riprisitnare il contesto.
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
