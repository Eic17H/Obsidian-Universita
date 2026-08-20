---
cssclasses: pr2
---
Allora, le stringhe sono immutabili. Una volta assegnata, non si può più cambiare. Se devi fare una serie di trasformazioni, devi fare una copia per trasformazione di ciascuna stringa che devi trasformare. E quelle restano in memoria finché non le toglie il garbage collector. Se devi fare 100 metodi poi, è difficile tenere traccia di ciò che stai facendo. Entrano in gioco le stream.

Una pipeline ha una sorgente (al 99% una collection, altrimenti una funzione generatrice), una sequenza di operazioni intermedie fatte tramite lambda, e un'operazione terminale.

Il metodo `.stream()` ce l'hanno tutte le collections.

Esempio di pipeline:
* Array di stringhe come sorgente
* Estrarre le iniziali
* Maiuscolare le iniziali
* Rimuovere i duplicati
* Stampare tutto

Vantaggi:
* Ogni operazione produce un risultato senza sovrascrivere la sorgente (quindi non ci saranno errori di scrittura, e potrai riutilizzare la stessa sorgente)
* Le operazioni sono lazy, fanno il calcolo solo quando ti serve davvero il risultato, quindi la sorgente può essere potenzialmente infinita
* Ogni elemento viene visitato una sola volta e non si tiene conto dei risultati intermedi, questo significa anche che non puoi controllare la situazione a metà strada per risolvere gli errori

Operazioni intermedie utili:
* `map`: per ogni elemento, ne rende uno corrispondente
* `filter`: rende l'elemento in input, ma solo se soddisfa una condizione
* `concat`: accoda due stream
* `distinct`: rimuove i duplicati, è un caso specifico della filter

Operazioni terminali utili:
* `count`: rende il numero di elementi, la più comune negli esami
* `forEach`: applica una funzione con side effect a ciascun elemento
* `collect`: riconverte la stream in una collezione

Come generare stream:
* `Collection::stream()`
* `Arrays.stream(Object[])` (gli array sono un po' come delle collections)
* `BufferedReader.lines()` (come la lettura dei file in C)
* Metodi statici degli stream:
    * `Stream.iterate()`
    * `IntStream.range()`

La documentazione degli ultimi due è pessima.

## `Stream.iterate()`

Stream *potenzialmente* infinito di elementi. Potenzialmente infinito perché se non stai attento non smette più. Prende in input il primo elemento e una funzione che dato l'n-esimo elemento rende l'n+1-esimo. Questo concetto si usa nel machine learning per ottenere una serie pseudo-random di valori che, dato lo stesso seed, genera la stessa sequenza. Esempio: `Stream.iterate(0, n -> n+1)` genera la sequenza 0, 1, 2, 3, 4, ...

## `IntStream.range()`

IntStream è una sottoclasse di Stream. Parentesi. In Python non c'è il ciclo for del C, si usa quello vero di cui parlava Scateni. Il for del C è un while, il for vero scorre gli indici in un range, tutto qui, l'elemento iniziale è sempre incluso e quello finale è sempre escluso. `IntStream.range(1,5).forEach(System.out::println);` stampa 1 2 3 4.

Tra l'altro, quei `::`. Lo rendono equivalente a una lambda: `e -> System.out.println(e)`.

## Esempio

Prendiamo una collection, la rendiamo una stream, facciamo cose con la stream e la facciamo tornare una collection.

```Java
import java.util.List;
import java.util.Arrays;
import static java.util.stream.Collectors.toList;


public class TestStream {

    public static void main(String[] args) {

        List<String> miaCollection = Arrays.asList("My", "name", "is", "Mario", "Rossi");
        System.out.println("Collezione iniziale:");
        System.out.println(miaCollection.toString());


        List<String> collectionMaiuscola = miaCollection.stream()
            .map(String::toUpperCase)
            .collect(toList());
        
        System.out.println("Collezione maiuscola:");
        System.out.println(collectionMaiuscola.toString());


        List<String> collectionBrevi = miaCollection.stream()
            .filter(e -> e.length()<=4)
            .collect(toList());


        System.out.println("Collezione con le parole di massimo 4 lettere:");
        System.out.println(collectionBrevi.toString());
    }
}
```