---
cssclasses: pr2
---
[[Classi anonime]] ed [[Espressioni lambda]].

## Esempio di utilizzo

Non dovrebbero essere qui ma erano nello stesso file prima. Risolverò il problema prima o poi.

### Vedi se capisci questo

```Java
static <T extends Comparable<? super T>> void sort(List<T> list)
```

Allora, è un metodo generico, quindi il tipo `T` è parametrico. `T` deve estendere i comparable di una propria superclasse (o di sé stessa). Cioè? Deve essere confrontabile con `T`, e possibilmente anche con la sua superclasse, o con la superclasse di quella, e così via.

### L'esempio vero e proprio

```Java
static <T> void sort(List<T> list, Comparator<? super T> comparator) vedi slide non ho visto bene.
```

Visto che la nostra classe è comparabile, non c'è bisogno di specificarla. Invece il comparator può essere una lambda.

```Java
Comparator <String> ignoreFirstCharComparator = (a,b) -> a.substring(1).compareTo(b.substring(1));
```