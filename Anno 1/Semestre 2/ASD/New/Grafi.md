---
cssclasses:
  - asd
---
> Eulero ha dato la scintilla che ha iniziato la teoria dei grafi col problema dei ponti di Koenigsberg. Essenzialmente consiste nell'attraversare tutti i ponti una e una sola volta, anche noto come il rompicapo delle stanze con le porte e devi attraversare tutte le porte una e una sola volta. Tornando a noi,
# Grafi

Un ==grafo== è una <span class="accented">struttura dati</span> astratta non lineare, composto da un insieme finito e non vuoto di nodi e insieme finito di archi.

> **==Arco==** (o lato): collegamento da un nodo a un altro. Equivalente a una coppia ordinata.

I grafi non orientati sono come grafi dove per ogni $(a, b)$ esiste $(b, a)$, dove in $(a, b)$, $a$ è la *==coda==* e $b$ è la *==testa==*.

Se $(a, b)$ esiste, allora $a$ e $b$ sono adiacenti. Il lato $(a, b)$ è *incidente* da $a$ a $b$.

I nodi contengono i dati. Gli archi possono anche contenere un numero ciascuno, che rappresenta il "peso" (costo o distanza) dell'arco.

Gli [[Anno 1/Semestre 2/ASD/New/Alberi|alberi]] sono un tipo particolare di grafo, che non presentano cicli, cioè tra due nodi c'è uno e un solo percorso.

## Implementazioni

Vediamo le implementazioni. Ce ne sono tante, vediamo la più "didattica".

### Opzione 1: Matrice di adiacenza

`M[a][b] = (bool) "esiste (a, b)"`.

Problema: la matrice è spesso quasi tutta vuota. Spreco di memoria.

### Opzione 2: Liste di adiacenza.

Ogni nodo ha una lista di archi.
* Versione a: concatenate
* Versione b: sequenziali

### Opzione 3: Multiliste di adiacenza.

Facciamo finta che non esistano.

## Liste di adiacenza concatenate
 
```C
 typedef struct node{
    int vertex_id;
    struct node* link;
}Node;
```

 Vediamo come usarla, usando come esempio:$$\begin{matrix*}[l]0\to1\\ 0\to3\\ 1\to2\\ 2\to3\\ 2\to4\\ 3\to4\\ 5\end{matrix*}$$
 Che significa che nessun arco parte da $5$.
### Visita in profondità: DFS.
 
Usando uno [[Anno 1/Semestre 2/ASD/New/Stack|stack]] ausiliario, decidiamo da quale nodo partire e lo mettiamo nello stack, poi ripetiamo:
* Guardiamo il nodo in cima allo stack e lo chiamiamo $n$;
* Scorriamo la lista e consideriamo il primo arco $n\to m$ tale che $m$ non è ancora stato visitato;
	* Se abbiamo trovato un tale arco, pushiamo $m$, lo segniamo come visitato e ripartiamo;
	* Altrimenti, poppiamo $n$.

Per esempio:
* Partiamo da $0$: $push\; 0$; Stack $0$
* Scorriamo la lista e troviamo $0\to1$: $push\;1$; Stack $1::0$
* Di nuovo, troviamo $1 \to 2$: $push\;2$; Stack $2::1::0$
* $2\to3$: $push\;3$; Stack $3::2::1::0$
* $3\to4$: $push\;4$; Stack $4::3::2::1::0$
* Nessun arco disponibile parte da $4$: $pop\;4$; Stack $3::2::1::0$
* Nessun arco disponibile parte da $3$: $pop\;3$; Stack $2::1::0$
* Nessun arco disponibile parte da $2$ (perché abbiamo già visitato $4$): $pop\;2$; Stack $1::0$
* Stessa cosa, $pop\;1$ e $pop\;0$. Stack $0$ e poi vuoto.

E così abbiamo visto che il $5$ non è raggiungibile da $0$.
 
### Visita in ampiezza: BFS

Usando una [[code|coda]] ausiliaria, decidiamo da quale nodo partire e lo mettiamo nella coda, poi ripetiamo:
*      Usiamo una coda ausiliaria.
*      Nodo di partenza.
*      Push del nodo di partenza.
*      A:
*      Visitiamo tutta la sua adiacenza (push).
*      Finita l'adiacenza, pop.
*      Vai ad A con tutta l'adiacenza.
*      Segnando sempre visitato per ciascun nodo.
Per esempio:
*      `push 0`.
*      0: 1, 3. `push 1, push 3`.
*      1: 2. `push 2`.
*      3: 4. `push 4`.
*      Pop di tutti: 0 1 3 2 4.

```C
int main() {
	Node* grafo[MAX_VERTICI];
    return 0;
}
```

Vedi anche l'[[Anno 1/Semestre 2/ASD/New/Dijkstra|algoritmo di Dijkstra]].