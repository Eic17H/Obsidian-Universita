---
cssclasses: pr2
---
# Interfacce

Si vedrà meglio in ISW l'anno prossimo.
Non tutti i team che collaborano per un progetto sanno di preciso cosa l'altro deve fare.
Se un cliente ti dice cosa devi fare per un progetto, le interfacce definiscono un accordo tra gruppi, in questo caso tra clienti e la software house.
L'accordo implicito è *il mio software deve avere questa caratteristica*.
Per esempio: John Ferrari ti dice che tutte le classi devono avere metodi che gestiscono i motori Ferrari.
In Java le interfacce sono delle classi, che hanno attributi `static` (globali) e `final` (costanti), con metodi pubblici senza corpo, e metodi statici implementati.

Hanno cose in comune con le classi astratte:
* Non si possono istanziare
* Possono essere *estese* da altre interfacce o *implementate* da classi: `extends` vs `implements`.
Una classe può estendere una sola classe, ma può implementare più classi.
Un'interfaccia può estendere più interfacce.
Una classe può implementare interfacce ed estendere una classe, contemporaneamente

Le interfacce si definiscono con la keyword `interface`.
I metodi sono pubblici di default. Di solito il default è package visibility.

Le interfacce permettono anche il polimorfismo.
Non ho capito un cazzo, non sembra neanche stia parlando italiano onestamente.

# Interfacce importanti

## Clonable

Non contengono qualcosa, ma danno struttura al codice. Non ha metodi dichiarati, ma segna che la nostra classe che lo implementa, implementa il metodo `clone`.

## Iterable

Interfaccia che dice che è possibile iterare su quella classe. Implementata da quasi tutte le interfacce. Permette in modo molto semplice di scorrere. In C, quando abbiamo implementato le liste, dovevamo tenere traccia dei puntatori. Gli iterable hanno invece un metodo per farlo in modo semplice, `foreach`, che prende un metodo come parametro e lo applica a *tutti* gli oggetti.

## Iterator

Permette di scorrere un iterable. Ha alcuni metodi utili:

* `forEachRemaining` - come `forEach`, ma gli passi l'elemento da cui partire;
* `hasNext` - come in ASD, `if(x.next != null) ...`;
* `next` - autoesplicativo;
* `remove` - rimuove l'ultimo elemento,

## Comparable

Definisce l'ordine naturale delle cose, con il metodo `T::compareTo(T o)`, che restituisce un numero negativo se il parametro viene prima del chiamante, $0$ se sono uguali, e un numero negativo se il parametro viene dopo.

## Comparator

Definisce l'ordinamento totale. Definiamo, in un'altra classe, un metodo che confronta due elementi, `compare(T o1, T o2)`. Di nuovo, restituisce un numero negativo se $o_1<o_2$, e così via.

# Collections

Sono nel package `java.util`, che va importato manualmente. Si usano perlopiù le liste, i set e le mappe. Grazie alle collections abbandoniamo gli array.

## `List<T>`

Molto più semplice che in C. Una lista di dimensione variabile, di oggetti senza un ordine particolare. Come coi vettori, possiamo indicizzare direttamente. È implementata da molte classi, la più comune è `ArrayList<T>`. È iterabile.

## `Set<T>`

Come una lista, ma due elementi non possono essere uguali. La classe più utile che la impelementa è `HashSet<T>`. Anche queste sono iterabili.

## `Map<T>`

Come i dizionari di Python. Ha chiavi distinte, ciascuna assegnata a un valore. Un solo valore. Ma i valori possono essere liste, per esempio. Non si può iterare, ma c'è un metodo che ti dà una lista di chiavi e una lista di valori, e le liste sono iterabili. L'implementazione più comune sono le `HashMap<T>`, che utilizzano il principio delle hash per evitare che ci siano chiavi duplicate.