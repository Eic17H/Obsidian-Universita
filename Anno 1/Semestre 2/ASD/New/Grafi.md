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

Vedi anche l'[[Anno 1/Semestre 2/ASD/New/Dijkstra|algoritmo di Dijkstra]], che permette di trovare in modo efficiente il percorso migliore tra due nodi.

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
 
Usiamo questa struct, ma onestamente non mi torna:

```C
 typedef struct node{
    int vertex_id;
    struct node* link;
}Node;
```

 Vediamo come usarla, usando come esempio la lista di nodi $0,1,2,3,4,5$:$$\begin{matrix*}[l]0\to1\\ 0\to3\\ 1\to2\\ 2\to3\\ 2\to4\\ 3\to4\end{matrix*}$$
 Che significa che nessun arco parte da $5$.

Mi sa che un grafo viene rappresentato come un array di struct, che hanno come campi le informazioni che ci servono e poi un puntatore a quella struct lì sopra, che usiamo per fare la lista.
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
* Nessun arco disponibile parte da $4$: $pop$; Stack $3::2::1::0$
* Nessun arco disponibile parte da $3$: $pop$; Stack $2::1::0$
* Nessun arco disponibile parte da $2$ (perché abbiamo già visitato $4$): $pop$; Stack $1::0$
* Stessa cosa, $pop$, stack $0$, $pop$, stack vuoto.

E così abbiamo visto che il $5$ non è raggiungibile da $0$. Abbiamo visitato in ordine $0,1,2,3,4$.

Vediamo un'implementazione ricorsiva in C, dove la funzione `visita()` fa quello che ti serve che faccia, per esempio una stampa:

```C
void DFS(Graph grafo[], int visited[], int start_id)
{
    if(visited[start_id])
        return;
    visited[start_id] = 1;
    visita(grafo[start_id]);
    for(Node* nodo = grafo[start_id].lista_adj; nodo != NULL; nodo = nodo->link)
        DFS(grafo, visited, nodo->vertex_id);
}
```

In questo caso non usiamo esplicitamente uno stack, ma usiamo implicitamente lo stack delle chiamate.
 
### Visita in ampiezza: BFS

Usando una [[code|coda]] ausiliaria, decidiamo da quale nodo partire, lo chiamiamo $n$ e lo mettiamo nella coda, poi ripetiamo:
* Segniamo $n$ come visitato;
* $push$iamo tutti i nodi a cui è adiacente che non sono ancora stati visitati;
* $pop$piamo $n$ dalla coda;
* Quando la coda è vuota, abbiamo finito.

Per esempio:
* $push\;0$; Coda: $0$
* $0\to1$, $push\;1$, $0\to3$, $push\;3$; Coda: $3::1::0$;
* Finiti gli archi, $pop$; Coda: $3::1$;
* $1\to2$, $push\;2$; Coda: $2::3::1$;
* $pop$; Coda: $2::3$;
* $3\to4$, $push\;4$; Coda: $4::2::3$;
* $pop$; Coda: $4::2$;
* $2$ non ha vicini non visitati, $pop$; Coda: $4$;
* $4$ non ha vicini, $pop$; Coda vuota.

Di nuovo non abbiamo visitato $5$, che è corretto. Abbiamo visitato $0,1,3,2,4$.

Questa volta l'implementazione usa esplicitamente una coda.

```C
void BFS(Graph grafo[], int visited[], int start_id)
{
    visita(grafo[start_id]);
    visited[start_id] = 1;
    int i;
    Node* nodo = NULL;
    Queue* coda = malloc(sizeof(Queue*));
    coda->front = NULL;
    coda->back = NULL;
    coda->cont = 0;
    coda_push(coda, start_id);
    while(!isEmptyQueue(coda)){
        i = coda_pop(coda);
        nodo = grafo[i].lista_adj;
        while(nodo!=NULL){
            if(!visited[nodo->vertex_id]){
                coda_push(coda, nodo->vertex_id);
                visita(grafo[nodo->vertex_id]);
                visited[nodo->vertex_id] = 1;
            }
            nodo = nodo->link;
        }
    }
}
```

