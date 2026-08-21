---
cssclasses: pr1
---
```C
    // INDENTAZIONE:

    // questo:
    int a=1,b=2;printf("A=%d\n",a);if(a==b){printf("B=%d\n",b);}if(b==3){printf("aaa\n");}else{printf("uu\n");}

    // e questo:
    printf("A=%d\n",a);
    if(a==b)
    {                       // le parentesi graffe sono necessarie se ci sono più istruzioni
        printf("B=%d",b);
        b++;
    }
    if(b==3){               // o se c'è un else
        printf("aaa\n");
    }
    else{
        printf("uu\n");
    }

    // fanno la stessa cosa, ma il secondo è più leggibile per un essere umano
    // ci sono due stili principali, qui usati entrambi, vedi le slide

```