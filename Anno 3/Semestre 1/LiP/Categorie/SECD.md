---
cssclasses: lip
---
## Teoria

* [[λ-calcolo]]
* [[Macchina SECD]]
* [[Valutazione]]
## Concetto semplificato

Quello che c'è scritto qui è sbagliato (mi sa). Controllare la teoria.
### Registri

Una macchina virtuale caratterizzato da quattro registri: Stack, Environment, Control, Dump. Vale a dire, uno stack di cose da valutare, un ambiente, il codice da valutare, e una pila di $SEC$. Eh?

Tu parti con $S$, $E$ e $D$ vuoti, e con $C$ che contiene il codice da valutare, scritto in notazione polacca inversa (cioè $2+4$ si scrive `2 4 +`). Se ricordi come funzionano certi operatori in <span class="are">[[IJVM]]</span>, se in cima allo stack c'è $2;4;+$, al prossimo passo li togli e poi pushi $6$, un po' come l'<span class="are">`add`</span> di IJVM.

$C$, che è una stringa, si comporta come una pila di simboli (non di caratteri) (la cima è a sinistra), e quindi quando si va avanti si fa pop into $S$, essenzialmente facciamo $S.push(C.pop)$, e quindi dopo questo passaggio abbiamo $S=[2]$ e $C=[4;+]$.

$E$ ovviamente parte vuota e poi contiene le associazioni tra identificatori e valori.

$D$ invece. Quando entriamo nel corpo di una funzione (facciamo finta di non essere nel λ-calcolo), dobbiamo resettare $S$, $E$ e $C$ (vedi [[Anno 3/Semestre 1/LiP/Categorie/Scope#Scope statico|scope statico]] e [[context switch]]). Quindi ci creiamo la nostra terna $(S,E,C)$ e la pushiamo in cima a $D$. Quando poi torniamo indietro, poppiamo $D$, ci riprendiamo quella terna $(S,E,C)$ e ci siamo.

Alla fine dell'esecuzione, abbiamo $C$ vuoto perché non c'è più codice da leggere, $D$ vuoto perché siamo nel main, ed $S$ con un solo elemento che è il risultato della valutazione.

## Esercizi

### Esempio 6.1 di Dessì

$$\begin{matrix*}[l]
([],\bot,add(1,2)::[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot,1::2::Prim(add)::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(1::[],\bot,2::Prim(add)::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(2::1::[],\bot,Prim(add)::[])::[] & \mapsto & \text{Valutazione operatore} \\
(3::[],\bot,[])::[]
\end{matrix*}$$

### Esempio 6.2 di Dessì

$$\begin{matrix*}[l]
([],\bot,apply(fun(id,x,x),3)::[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot,fun(id,x,x)::3::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(fun(id,x,x)::[],\bot,3::App::[])::[] & \mapsto & \text{Valutazione costante intera} \\
(3::fun(id,x,x)::[],\bot,App::[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[id/fun(id,x,x)][x/3],x::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(3::[],\bot[id/fun(id,x,x)][x/3],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(3::[],\bot,[])::[]
\end{matrix*}$$