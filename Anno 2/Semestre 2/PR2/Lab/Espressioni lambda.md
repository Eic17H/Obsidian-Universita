---
cssclasses: pr2
---
Le lambda sono un modo di Java per cercare di modernizzarsi poco poco. Ok bellissimi gli oggetti quanto vuoi ma ogni tanto sono un po' pesanti. Ci sono momenti in cui fa comodo tornare al C, e definire comportamenti che ci servono solo una volta, un po' come le classi anonime. Le Java Lambda sono piuttosto snelle, stanno spesso in una riga: `(argomenti) -> {corpo}`.

Sono utili per le interfacce funzionali, interfacce con un solo metodo da implementare, per esempio `Predicate<T>`, che ha solo il metodo `boolean test(T)`. Anziché creare una classe che implementa `Predicate`, passiamo una funzione lambda che diventa l'implementazione del metodo.

Un esempio pratico di utilizzo sono gli algoritmi di ordinamento. I criteri di ordinamento sono funzioni, metodi, questo vale in generale. Quindi possiamo definire in una riga un criterio e passarlo, per esempio, ad `Arrays.sort()`.

## Esempio

```Java
import java.util.Arrays;

public class TestLambda {

    public static void main(String[] args) {

        Gatto[] gatti = new Gatto[3];
        gatti[0] = new Gatto("Romeo", 30.5);
        gatti[1] = new Gatto("Duchessa", 28.0);
        gatti[2] = new Gatto("Matisse", 20.3);

        System.out.println("I gatti prima dell'ordinamento:");
        System.out.println(Arrays.toString(gatti));


        Arrays.sort(gatti, (a,b) -> a.getNome().compareTo(b.getNome()));

        System.out.println("\nI gatti ordinati per nome:");
        System.out.println(Arrays.toString(gatti));


        Arrays.sort(gatti, (a,b) -> (a.getCoda().compareTo(b.getCoda())));

        System.out.println("\nI gatti ordinati per lunghezza della coda:");
        System.out.println(Arrays.toString(gatti));

        
        Arrays.sort(gatti, (a,b) -> a.getNome().length() - b.getNome().length());

        System.out.println("\nI gatti ordinati per lunghezza del nome:");
        System.out.println(Arrays.toString(gatti));
    }
}
```