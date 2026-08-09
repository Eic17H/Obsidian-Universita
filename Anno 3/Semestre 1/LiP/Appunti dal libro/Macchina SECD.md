---
cssclasses: lip
---
## Concetto$\newcommand{\apply}{\textbf{apply}}\newcommand{\fun}{\textbf{fun}}\newcommand{\if}{\textbf{if}}\newcommand{\true}{\textbf{true}}\newcommand{\false}{\textbf{false}}$

La macchina SECD è una macchina virtuale per linguaggi funzionali con un set di istruzioni piccolo e (relativamente) semplice. Consiste di quattro registri Stack, Environment, Control, Dump. Per quanto riguarda i tipi, $S$, $C$ e $D$ sono degli stack, mentre $E$ è un array associativo (da identificatori a valori).

La macchina in sé è fatta di due pile. Quella principale è la pila $\underset{\underset{\ldots}{(S_2,E_2,C_2)}}{(S_1,E_1,C_1)}$, che contiene i correnti $S$, $E$ e $C$. L'altra è $D$, che contiene $\underset{\underset{\ldots}{(S_b,E_b)}}{(S_a,E_a)}$. Pushare equivale a salvare il contesto, poppare equivale a riprisitnare il contesto. In realtà questo è incorretto, vedi [[SECD|l'altro documento]] (poi aggiusterò entrambi i documenti).
## Linguaggio

Il nostro [[Anno 3/Semestre 1/LiP/Appunti dal libro/Linguaggi|linguaggio]] è come segue:$$\begin{matrix*}[l]
t:==
\\ & \phantom{|\ }c_i & \text{Costanti}
\\ & |\ x & \text{Identificatori }\in E
\\ & |\ op_i(t_1,\ldots,t_{a_i}) & \text{Operazioni primitive con arietà }a_i
\\ & |\ \if(t_1,t_2,t_3) & \text{Condizionale}
\\ & |\ \fun(f,x,t) & \text{Funzione anonima}
\\ & |\ \apply(t_1,t_2) & \text{Applicazione di funzione}
\end{matrix*}$$
## Regole di inferenza
$$\begin{matrix*}[l]
\text{Input} && \text{Output} & \text{Nome regola} & \text{Condizioni}\\
(S,E,op_i(t_1,\ldots,t_{a_i})::C)::D &\mapsto& (S,E,t_1::\cdots::t_{a_i}::Prim(op_i)::C)::D & \text{Implementazione operatore} \\
(S,E,\if(t_1,t_2,t_3)::C)::D &\mapsto& (S,E,t_1::If::t_2::t_3::C)::D & \text{Implementazione \if} \\
(S,E,\apply(t_1,t_2)::C)::D &\mapsto& (S,E,t_1::t_2::App::C)::D & \text{Implementazione \apply} \\
(S,E,\textbf{n}::C)::D &\mapsto& (n::S,E,C)::D & \text{Valutazione costante intera} & \textbf{n}\text{ è un numero intero} \\
(S,E,\textbf{b}::C)::D &\mapsto& (b::S,E,C)::D & \text{Valutazione costante booleana} & \textbf{b}\text{ è un booleano} \\
(S,E,\textbf{x}::C)::D &\mapsto& (E(x)::S,E,C)::D & \text{Valutazione variabile} & \textbf{x}\text{ è una variabile} \\
(v::\fun(f,x,t)::S,E,App::C)::D &\mapsto& ([],E[f/\fun(f,x,t)][x/v],t::[])::(S,E,C)::D & \text{Valutazione applicazione funzione} \\
(v::S,E,[])::(S',E',C')::D &\mapsto& (v::S',E',C')::D & \text{Valutazione terminale} \\
(v_{a_i}::\cdots::v_1::S,E,Prim(op_i)::C)::D &\mapsto& (\widetilde{op}_i(v_1,\ldots,v_{a_i})::S,E,C)::D & \text{Valutazione operatore} \\
(v::S,E,If::t_2::t_3::C)::D &\mapsto& (S,E,t_2::C)::D & \text{Valutazione \if true} & v=\true \\
(v::S,E,If::t_2::t_3::C)::D &\mapsto& (S,E,t_3::C)::D & \text{Valutazione \if true} & v=\false \\
\end{matrix*}$$