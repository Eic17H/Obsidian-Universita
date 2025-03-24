/**
 * Eulero ha dato la scintilla che ha iniziato la teoria dei grafi.
 * Nato dal problema dei ponti di Koenigsberg.
 * Attraversare tutti i ponti una e una sola volta.
 * (Il rompicapo delle stanze con le porte e devi attraversare tutte le porte 1e1s volta)
 * GRAFI
 * Un grafo è una SD astratta non lineare.
 * Insieme finito e non vuoto di nodi, insieme finito di archi.
 * Arco (o lato): collegamento da un nodo a un altro. Equivalente a una coppia ordinata.
 * I grafi non orientati sono come grafi dove per ogni (a, b) esiste (b, a).
 * (a, b): a coda, b testa.
 * Se (a, b), a e b sono adiacenti.
 * Il lato (a, b) è incidente da a a b.
 * Vediamo le implementazioni. Ce ne sono tante, vediamo la più "didattica".
 * Opzione 1: matrice di adiacenza. M[a][b] = (bool) "esiste (a, b)".
 *      Problema: la matrice è spesso quasi tutta vuota. Spreco di memoria.
 * Opzione 2: liste di adiacenza. Ogni nodo ha una lista di archi.
 *      Versione a: concatenate
 *      Versione b: sequenziali
 * Opzione 3: multiliste di adiacenza. Facciamo finta che non esistano.
 *
 * Usiamo le liste di adiacenza concatenate.
 */
 
 typedef struct node{
    int vertex_id;
    struct node* link;
}Node;

/**
 * Vediamo come usarla.
 *
 * Visita in profondità: DFS.
 *      Usiamo uno stack ausiliario.
 *      Decidiamo da quale nodo partire.
 *      Mettiamo il nodo nello stack, visitiamo il primo nodo adiacente mai visitato.
 *      Se non ha nodi adiacenti non visitati, pop del nodo dallo stack.
 *
 *      Abbiamo 01 03 12 23 24 34 5
 *      Push 0, push 1, push 2, push 3, push 4, pop 4, pop 3, pop 2, pop 1, pop 0;
 *      0: 1, 3. 0->1.
 *      1: 2. 1->2. 0->1->2
 *      2: 3, 4. 2->3. 0->1->2->3.
 *      3: 4. 3->4. 0->1->2->3->4.
 *      Pop di tutti: 0 1 2 3 4.
 *      Il 5 è scollegato da tutti
 *
 * Visita in ampiezza: BFS.
 *      Usiamo una coda ausiliaria.
 *      Nodo di partenza.
 *      Push del nodo di partenza.
 *      A:
 *      Visitiamo tutta la sua adiacenza (push).
 *      Finita l'adiacenza, pop.
 *      Vai ad A con tutta l'adiacenza.
 *      Segnando sempre visitato per ciascun nodo.
 *
 *      Push 0.
 *      0: 1, 3. Push 1, push 3.
 *      1: 2. Push 2.
 *      3: 4. Push 4.
 *      Pop di tutti: 0 1 3 2 4.
 */

int main() {

    Node* grafo[MAX_VERTICI];

    return 0;
}


Dijkstra:

Parti da un nodo
Metti tutte le distanze a inf
Ripeti:
	Vedi tutti i nodi collegati
	Prendi la distanza del nodo in cui sei e la chiami fai D
	Per ogni nodo collegato, aggiorni la distanza a il suo peso + D, se è minore di quello corrente
	Quando lo fai, metti il nodo corrente come quello da cui conviene raggiungerlo
Quando hai finito, percorri l'array della convenienza come lista, a ritroso, e sommi anche i D, e così trovi percorso e distanza
Usi l'insieme V (visitati), F (frontiera), e un altro (mai visti), e li aggiorni man mano