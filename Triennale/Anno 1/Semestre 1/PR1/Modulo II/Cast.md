---
cssclasses: pr1
---
Due valori di due [[Triennale/Anno 1/Semestre 1/PR1/Modulo I/Tipi|tipi]] diversi possono essere usati insieme. Si dice che *castiamo* da un tipo a un altro. Per esempio, se sommiamo un intero e un float otteniamo un float, ma come passaggio intermedio c'è stata una conversione del primo intero in un float.

Il cast può avvenire in modo implicito o esplicito.

Vediamo un esempio con delle variabili intere che vengono castate a float.

```C
int a=5, b=4, c=2;
float media;
```

Cast implicito:
```C
float media = (a+b+c)/3;
printf("%f\n", media);
```

Da `a+b+c` otteniamo un valore intero `11`. Quindi otteniamo `11/3`, che essendo una divisione tra interi dà semplicemente `3`. E solo dopo questo valore intero viene convertito nel float `3.0` e assegnato a `media`.

Ricordiamo che l'operatore `/` rappresenta due operazioni diverse, cioè la divisione tra interi, che arrotonda per difetto, e la divisione razionale.

Noi ci aspettiamo che quel codice stampi `3.66666`. Per farlo, dobbiamo dire al codice di fare una divisione razionale, e per farlo basta che uno degli operandi sia un float. Possiamo quindi castare esplicitamente il primo o il secondo operando.

```C
int a=5, b=4, c=2;
float media = (float)(a+b+c)/3;
printf("%f\n", media);
media = (a+b+c)/(float)3;
printf("%f\n", media);
```

Quando uno dei due operandi è un float, l'altro viene castato implicitamente. Questo sarebbe valso, per esempio, se il secondo operando fosse stato un letterale float, come `3.0`, anziché un letterale intero, `3`.

Anche se è una divisione di soli letterali, come `2/3`, visto che sia `2` che `3` sono interi non avviene nessun cast e il risultato è `0`.

Se invece castiamo da `float` a `int`, semplicemente tronchiamo, e quindi `(int) 2.5` vale `2`.

```C
int d = 10/4;
printf("D: %d\n", d);

float e = 10.0/4.0;
printf("E: %f\n", e);

int f = 10.0/4.0;
printf("F: %d\n", f);
```

Quel codice stampa:
```
D: 2
E: 2.500000
F: 2
```