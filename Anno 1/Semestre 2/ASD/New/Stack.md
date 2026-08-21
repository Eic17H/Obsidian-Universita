---
cssclasses:
  - asd
---
In italiano anche detto pila.

Una sequenza lineare di elementi. Possiamo fare due cose: mettere un elemento in cima allo stack ($push$) o rimuovere l'elemento in fondo allo stack per leggerlo ($pop$). Non possiamo rimuovere elementi che non sono in cima. Questo è detto *LIFO*, last in first out (l'ultimo entrato è il primo che esce).

Graficamente, possiamo rappresentarli in modo intuitivo come $\underset{\underset C B} A$ o in un modo più facile da digitare, $A::B::C$.

Possiamo impostare una dimensione massima per lo stack.

## Implementazione in C

Dato un nodo fatto per contenere dati di tipo `DataStruct`:

```C
struct node
{
    DataStruct data;
    struct node* link;
};
```

Una pila si può implementare così:

```C
typedef struct
{
    Node* top;
    int cont;
}Stack;
```

Dove `top` punta alla cima dello stack e `cont` contiene il numero di elementi. Uno stack vuoto ha `top` che punta a `NULL`, e l'elemento in fondo allo stack punta a `NULL`.
## Operazioni

### Is empty

Restituisce $vero$ se è vuoto e $falso$ se contiene almeno un elemento.

```C
bool isEmptyStack(Stack* stack){
    return stack->top==NULL;
}
```

### Is full

Restituisce $vero$ se il numero di elementi corrisponde a quello massimo e $falso$ altrimenti.

```C
bool isFullStack(Stack* stack){
    return stack->cont==DIM_STACK;
}
```

### Push

Mette un elemento in cima allo stack, se non è pieno.

```C
void pushStack(Stack* stack, DataStruct val){
    if(isFullStack(stack)){
        printf("errore overflow\n");
    }else{
        Node* new_node = malloc(sizeof(Node));
        new_node->data = val;
        new_node->link = NULL;
        if(isEmptyStack(stack)){
            stack->top = new_node;
        }else{
            new_node->link = stack->top;
            stack->top = new_node;
        }
        stack->cont++;
    }
}
```

### Pop

Rimuove un elemento dalla cima dello stack, se non è vuoto.

```C
Ordine popStack(Stack* stack){
    DataStruct val;
    Node* temp;
    if(isEmptyStack(stack)){
        printf("errore underflow\n");
        // Metti valori default a val 
    }else{
        temp = stack->top;
        val = stack->top->data;
        stack->top = stack->top->link;
        stack->cont--;
        free(temp);
    }
    return val;
}
```