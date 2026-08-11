---
cssclasses: pr1
---
Per la generazione di numeri causali, abbiamo bisogno di due librerie: `stdlib` ci dà `rand()` e `srand()`, mentre `time` ci dà `time()`.

```C
#include <stdlib.h>
#include <time.h>
```

Ogni volta che apriamo il programma, lo troviamo nello stesso [[stato|stato]], quindi tutti i numeri "casuali" che generiamo saranno sempre gli stessi. Per farli cambiare, dobbiamo cambiare lo stato ad ogni esecuzione del programma, e lo facciamo cambiando un valore numerico. Questo valore è il *seed* della generazione casuale. Per renderlo diverso ogni volta, usiamo come seed la data e l'ora correnti sotto forma di numero intero, che otteniamo dalla subroutine `time()`. In realtà quello che fa è dirci quanto tempo è passato da un determinato momento passato come parametro, quindi metteremo come parametro `NULL`, che corrisponde all'*epoch*, il 1º gennaio 1970 a mezzanotte.

Quando vogliamo generare un valore casuale, usiamo `rand()`. Questo restituirà un intero positivo casuale tra tutti gli interi possibili.

Per dare un minimo e un massimo usiamo due semplici principi matematici.
* Prima pensiamo a cambiare il massimo. Basta usare il modulo: qualunque sia $x$, $x\%3$ sarà sempre $<3$. Quindi il massimo si imposta con $rand()\%(max+1)$;
* Poi cambiamo il minimo. Visto che parte da $0$, basta aggiungere il minimo al valore restituito, quindi $rand()\%(max+1)+min$;
* Però adesso abbiamo aumentato anche il massimo. Torniamo indietro e diminuiamolo della stessa quantità, $rand()\%(max-min+1)+min$.

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
    int num, min=10, max=50;
    num = min + rand()%(max+1-min);
    printf("%d",num);
    return 0;
}
```