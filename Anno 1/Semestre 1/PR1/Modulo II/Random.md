---
cssclasses: pr1
---
```
#include <stdio.h>
#include <stdlib.h> // necessaria per rand() e srand()
#include <time.h> // necessaria per time()

int main() {
    // GENERAZIONE DI NUMERI CASUALI

    //srand(50); // fornisce un seme alla randomizzazione, altrimenti è sempre uguale
    srand(time(NULL)); // time() dà il tempo passato da una data, NULL è l'epoch, 01/01/1970 00:00:00
    // srand si chiama una sola volta

    int random = rand(); // un valore tra 0 e RAND_MAX, una costante di stdlib
    printf("%d", random);

    // se vuoi cambiare il massimo, puoi usare l'operazione resto %
    // il resto tra un numero x e un numero y sarà sempre tra 0 e y-1, quindi y-1 è il massimo
    // se vuoi cambiare il minimo, prendi il risultato e aggiungi o sottrai qualcosa
    // farlo cambierà anche il massimo però, quindi dovrai cambiare anche il massimo

    int num, min, max;
    num = min + rand()%(max+1-min);
    switch(1)
    {
        case (int) (5==5):
            printf("\nsi");
            break;
        default:
            printf("\nNO");
            break;
    }

    return 0;
}
```