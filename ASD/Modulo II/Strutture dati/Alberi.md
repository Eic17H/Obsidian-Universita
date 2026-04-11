---
cssclasses:
  - asd
---
Gli alberi sono strutture dati molto potenti. Sono un tipo specifico di grafo, con un nodo designato come *radice*, e con tutti gli altri nodi raggiungibili dalla radice con un solo cammino, quindi aciclico.

Gli heap e le code con priorità sono tipi di alberi. L'heap si può usare per ordinare in $n \log(n)$ (il meglio per l'ordinamento), nello heap sort.

# Termini

> **Nodo** - Un elemento che contiene un dato.
> **Grado** - Numero di figli di un nodo.
> **Radice** - Il nodo senza padre.
> **Foglia** - Un nodo senza figli.
> **Padre** - Se due nodi sono collegati, quello più vicino alla radice è il padre.
> **Figlio** - Se due nodi sono collegati, quello più lontano dalla radice è il figlio.
> **Fratello** - Due nodi con lo stesso padre sono fratelli.
> **Antenato** - Un nodo è antenato di un altro se lo è un suo figlio, o se è suo padre.
> **Discendente** - Un nodo è discendente di un altro se lo è suo padre, o se è suo figlio.
> **Livello** - La radice ha livello $1$, tutti gli altri hanno $1+grado_{padre}$.
> **Altezza/profondità** - Il livello massimo presente in un albero.
> **Sottoalbero** - L'albero formato da un nodo, che diventa la radice del sottoalbero, e da tutti i suoi discendenti e i loro collegamenti.

# Tipi di albero

> **Albero pieno** - Ogni livello ha il massimo numero possibile di nodi.
> **Albero completo** - La broad search non ha buchi.
> **Albero binario** - Ha grado massimo $2$. I sottoalberi sono a loro volta binari.
> **Albero binario di ricerca (ABR)** - Ha chiavi uniche; il sottoalbero sinistro ha solo valori minori del nodo padre, il sottoalbero destro ha solo valori maggiori. Per inserire un nodo, basta confrontare ricorsivamente con quelli presenti partendo dalla radice e andando a sinistra o a destra finché non si raggiunge una foglia, e poi si inserisce quello nuovo come figlio.
