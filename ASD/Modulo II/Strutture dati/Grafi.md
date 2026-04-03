---
cssclasses:
  - asd
---
Eulero ha dato la scintilla che ha iniziato la teoria dei grafi col problema dei ponti di Koenigsberg. Essenzialmente consiste nell'attraversare tutti i ponti una e una sola volta, anche noto come il rompicapo delle stanze con le porte e devi attraversare tutte le porte una e una sola volta. Tornando a noi,
# Grafi

Un grafo è una <span class="accented">struttura dati</span> astratta non lineare, composto da un insieme finito e non vuoto di nodi e insieme finito di archi.

> **Arco** (o lato): collegamento da un nodo a un altro. Equivalente a una coppia ordinata.

I grafi non orientati sono come grafi dove per ogni `(a, b)` esiste `(b, a)`, dove in `(a, b)` `a` è la coda e `b` è la testa.

Se `(a, b)`, `a` e `b` sono adiacenti. Il lato `(a, b)` è *incidente* da `a` a `b`.

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
 
```
 typedef struct node{
    int vertex_id;
    struct node* link;
}Node;
```

 Vediamo come usarla.
 
### Visita in profondità: DFS.
 
*      Usiamo uno stack ausiliario.
*      Decidiamo da quale nodo partire.
*      Mettiamo il nodo nello stack, visitiamo il primo nodo adiacente mai visitato.
*      Se non ha nodi adiacenti non visitati, pop del nodo dallo stack.
Per esempio:
*      Abbiamo 01 03 12 23 24 34 5
*      `push 0, push 1, push 2, push 3, push 4, pop 4, pop 3, pop 2, pop 1, pop 0`;
*      0: 1, 3. 0->1.
*      1: 2. 1->2. 0->1->2
*      2: 3, 4. 2->3. 0->1->2->3.
*      3: 4. 3->4. 0->1->2->3->4.
*      Pop di tutti: 0 1 2 3 4.
*      Il 5 è scollegato da tutti
 
### Visita in ampiezza: BFS
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

```
int main() {

	Node* grafo[MAX_VERTICI];

    return 0;
}
```

Vedi anche l'[[dijkstra|algoritmo di Dijkstra]].