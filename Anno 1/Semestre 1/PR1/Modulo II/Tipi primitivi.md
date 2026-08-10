---
cssclasses: pr1
---
Abbiamo visto le variabili, che contengono numeri. In realtà questo non è del tutto vero.

```
    /**
     * I bit di rappresentazione hanno degli standard per i minimi.
     * Spesso non sono quelli i minimi, double e float hanno lo stesso minimo ma double ha quasi sempre più bit.
     * Char ha limiti numerici, va da -127 a +128.
     */
```

```
/*
     il tipo char corrisponde 1:1 a int
     le corrispondenze sono illustrate nella tabella ASCII
     c'è ASCII esteso e ASCII non esteso, C dovrebbe usare quello a 256 caratteri

     nei prossimi anni, o forse anche in questo,
     useremo i box drawing characters per fare ASCII art
    */

    char var = 'a';
    var += 3;
    // var si sposta di 3 in avanti nella tabella ASCII
    putchar(var);

    // questo è utile per trasformare un carattere da maiuscolo a minuscolo
    var -= 0x20;
    putchar(var);
    var += 0x20;
    putchar(var);

    // gli operatori hanno una gerarchia di priorità

    /*
     var = (var-65+0x20)%64+65; MAJmin
    */
```