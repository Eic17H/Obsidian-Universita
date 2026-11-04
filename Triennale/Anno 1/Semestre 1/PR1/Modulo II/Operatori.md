---
cssclasses: pr1
---
#damettereinordine

Scambio, booleani, media, 44 gatti, ++, priorità, undefined behavior

## Undefined behavior


Questo codice avrà risultati diversi con diversi compilatori.

```C
    int i=1;
    int j = i++ * ++i;
    printf("i++*++i = %d\n",j);
```