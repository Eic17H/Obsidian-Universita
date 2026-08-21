---
cssclasses: pr1
---


```
// costrutti di selezione

    // if/else, if concat., if annid., !dangling else!
    // espressioni/operatori booleane, confronti tra char
    // operatore ternario: lo vedremo oggi e poi mai più

    int votoPR1;
    printf("Voto di PR1: ");
    scanf("%d", &votoPR1);
    if(votoPR1>18)
        printf("finalmente mi sono liberato di PR1!\n");
    else
        printf("non mi liberero' mai di PR1!\n");

    // if annidato
    int a=4, b=5;
    if(a>b)
    {
        printf("a maggiore di b\n");
    }
    else
    {
        if (a<b)
        {
            printf("a minore di b\n");
        }
        else
        {
            printf("a uguale a b\n");
        }
    }

    // dangling else
    if(a>b)
        if(a==4)
            putchar('a');
        else
            putchar('\n');
    // l'else si riferisce al primo if

    // espressioni booleane
    printf("%d %d\n", 7==5, 7>5);
    // un'espressione booleana può essere 1 o 0, vera o falsa

    // operatori binari con output booleano
    // < > == <= >= !=

    // operatore unario NOT:
    // !p

    // castare da int a bool:
    // se N==0, falso
    // altrimenti vero

    // variabili bool: <bool.h>, valori true/false o 1/0
    // true=1, false=0

    int val = 1>1<1>1<1>1<1>1<1>1<1;
    printf("1>1<1>1<1>1<1>1<1>1<1 = %d\n", val);

    // vedi slide priorità

    if('a'>'A')
        printf("'a'>'A'\n");

    // L'OPERATORE TERNARIO:
    int i=1, j=2, k;
    k = i>j ? i : j;
    // X ? Y : Z
    // if X Y else Z

    if(a=b) printf("AAAAAAAAAAAAA");

    // !! ed && valutano in "corto-circuito", cioè "finché serve"
    // se già dal primo termine sai il valore finale, non continua a guardare gli altri
    // se metti un'assegnazione nell'espressione binaria, !!!< non viene né valutata né eseguita >!!!
    // (può cambiare tra standard e tra compilatori)
```

```
// SWITCH-CASE:

    int scelta=1;

    // questo:
    if(scelta == 0)
        printf("zero\n");
    else if(scelta == 1)
        printf("uno\n");
    else
        printf("altro\n");

    // è equivalente a questo:
    switch(scelta)
    {
        case 0:
            printf("zero\n");
            break;

        case 1:
            printf("uno\n");
            break;

        default:
            printf("altro\n");
            break;
    }

    // se non metti break, esegue sia le proprie che quelle del case successivo

```

```C
// ITERAZIONE
    // anziché fare copia-incolla per ripetere certe istruzioni,
    // usiamo un costrutto di iterazione

    // è buona abitudine usare while e do-while se non sai già quante volte sarà ripetuto
    // e for se lo sai già, ma è tecnicamente possibile scambiarli

    // vedi slide per certi termini

    int condizione=0;

    while(condizione)
    {
        printf("While\n");
    }

    do
    {
        printf("Do while\n");
    }while(condizione);

    // anche se la condizione è falsa, do-while esegue almeno una volta
    // while esegue solo se la prima volta la condizione è vera

    int contatore = 0;

    for(contatore = 0; contatore<5; contatore++)
    {
        printf("Contatore%d ", contatore+1);
    }

    // for si usa per fare cose del genere
    // in informatica si conta da 0, quindi per contare da 1 aggiungo 1
    // in questo caso contatore++ e ++contatore farebbero la stessa cosa
    // scegline uno e continua a usarlo, è bene essere stilisticamente coerenti
```

```C
    /**
     * for, goto e array.
     * Goto è il male, deriva dai LLL, è vecchio e va evitato.
     * For si usa per fare un numero già conosciuto di iterazioni.
     * Può fare anche quelle indefinite, ma per convenzione non si fa.
     * Vedi slide per la sintassi.
     */

    // Per tenere traccia delle ripetizioni si usa una variabile solitamente chiamata i.
    int i;
    // Stampa i numeri da 0 a 9
    for(i=0; i<10; i++)
    {
        printf("Numero: %d\n", i);
    }

    // Se serve più di un i, usi j, k, etc.
    int j;
    // Al contrario: anziché incrementare decremento
    for(j=10; j>0; j--)
    {
        printf("Numero: %d\n", j);
    }

    /**
     * Non è obbligatorio niente però
     * for(;;);
     * Questo qua sopra ripete il nulla e poi ripete senza controllare niente.
     * È un ciclo infinito. Appena ci arriva, il programma si blocca.
     * C'è un modo per fermarlo. È tipico dello "spaghetti code", codice fatto male e incomprensibile.
     * Questo modo è "break", che interrompe qualsasi ciclo.
     * Puoi saltare un'iterazione e andare in anticipo alla prossima con "continue". Non farlo.
     * Ci sono esempi di questi due nelle slide.
     * Comunque non vanno usati, possono essere sostituiti da cose equivalenti più leggibili. Vedi slide.
     * Al posto di for(a;b;c){if(x){continue}else{y}} usa for(a;b;c){if(!x){y}}.
     * Al posto di for(a;b;c){if(x){break}else{y}} usa for(a;b&&!x;c){y}
     */

    // C99 ci permette di fare una cosa:
    for(int k=0; k<10; k++);
    // Non ho dovuto dichiarare k separatamente prima.
    // k sarà eliminata dopo il for, e potrai crearla di nuovo dopo.
    // Scoping: rendere certe variabili visibili solo all'interno di un certo blocco di codice.
    // La k dichiarata in for(int k;;) è visibile solo al ciclo for e al suo blocco di codice.

    // Principio di località: la prossima istruzione sarà vicina a quella precedente.
    // Vedi slide.
    return 0;
```