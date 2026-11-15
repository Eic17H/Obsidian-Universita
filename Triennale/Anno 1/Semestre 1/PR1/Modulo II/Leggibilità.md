---
cssclasses: pr1
---
Non basta che il codice funzioni, è anche importante che leggendolo si capisca cosa fa.

Uno degli elementi principali è l'indentazione. Vediamo due sezioni di codice.

```C
int a=1,b=2;printf("A=%d\n",a);if(a==b){printf("B=%d\n",b);}if(b==3){printf("aaa\n");}else{printf("uu\n");}
```

```C
printf("A=%d\n",a);
if(a==b) {
    printf("B=%d",b);
    b++;
}
if(b==3) {
    printf("aaa\n");
} else {
    printf("uu\n");
}
```

Fanno la stessa cosa, ma il secondo è più leggibile per un essere umano.

Ci sono diversi stili per l'indentazione e la collocazione delle parentesi, l'importante è seguire lo stesso stile nello stesso progetto.