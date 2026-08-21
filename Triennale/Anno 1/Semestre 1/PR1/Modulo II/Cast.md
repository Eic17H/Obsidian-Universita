---
cssclasses: pr1
---
```
    // cast implicito ed esplicito:
    int a=5, b=4, c=2;
    float media;

    // cast implicito:
    media = (a+b+c)/3;
    // il valore a destra viene trasformato in float
    printf("Media: %f\n", media);

    // cast esplicito:
    media = (float) (a+b+c)/3;
    // ho reso l'espressione a destra di "(float)" un float
    printf("Media: %f\n", media);

    // potrei scrivere anche questo:
    media = (a+b+c)/(float)3;
    printf("Media: %f\n", media);

    int d = 10/4;
    // 2.5 viene castato a int, quindi d vale 2
    printf("D: %d\n", d);

    float e = 10.0/4.0;
    // e vale 2.5
    printf("E: %f\n", e);

    int f = 10.0/4.0;
    // (double) 2.5 viene castato a (int) 2
    printf("F: %d\n", f);
```