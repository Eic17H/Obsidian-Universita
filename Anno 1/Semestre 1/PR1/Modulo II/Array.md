---
cssclasses: pr1
---
```
/**
     * Array monodimensionali.
     * Vedi slide.
     * Un array è una variabile che contiene tante variabili, a cui possiamo accedere singolarmente.
     * Lunghezza fissata e già decisa a priori.
     * Tutte le variabili dell'array sono una dopo l'altra nella memoria.
     * Ma possiamo accedere a qualsiasi in qualunque momento.
     * Si comincia a contare da 0.
     * Ha una lunghezza fissa: che succede se provi a usare una "casella" fuori da quella lunghezza?
     * Segmentation fault: il compilatore non se ne accorge, compila, il programma crasha e devi capire perché.
     * Visto che conta da 0, quando devi dire la posizione all'utente, aumentala di 1.
     * Inizializzazione: vedi slide.
     * array[0] è il nome della prima variabile dell'array.
     * array è il nome di una variabile che contiene l'indirizzo in memoria del primo elemento dell'array.
     */

    /**
     * Differenze tra while do while e for:
     * While: non conosco il numero.
     * Tutti e tre: hanno una condizione di uscita.
     * Do while fa almeno un'iterazione, utile per controllare la correttezza degli input.
     * For: per gli array.
     */

    /**
     * Evitiamo i goto perché non fa parte della programmazione strutturale,
     * non aggiunge niente di nuovo al C,
     * incasina il codice.
     */

    /**
     * Puoi dichiarare un array senza specificarne la dimensione, verrà decisa dalla prima assegnazione.
     * Non puoi fare array1=array2, quelli sono gli indirizzi, non puoi cambiare un indirizzo.
     */

    int num;
    scanf("%d", &num);
    int a[num];
    a[num-1]=1;
    printf("%d",a[num-1]);
    return 0;
```

```
/**
     * Tipio di dato non primitivi: array multidimensionali.
     * Vedremo quelli bidimensionali, anche detti matrici.
     * In memoria non sono matrici, sono array di array, o array di righe.
     * Però concettualmente sono come matrici.
     * Una matrice è una tabella rettangolare (vedi slide).
     */

    // Una matrice si dichiara così:
    int matrice[N_RIGHE][N_COLONNE] = {{5, 8, 3},{9, 3, 14},{64, 7, 0}};

    int i, j;

    // Mostrare a video
    for(i=0; i<N_RIGHE; i++) {
        for (j = 0; j < N_COLONNE; j++) {
            printf("%2d ", matrice[i][j]);
        }
        printf("\n");
    }

    // Le righe e le colonne partono da 0, quindi la numero "3" è la quarta.
    // Quindi gli [indici] vanno da 0 a N_RIGHE-1 o N_COLONNE-1

    // Inizializzazione:


    // for:
    for(i=0; i<N_RIGHE; i++)
        for(j=0; j<N_COLONNE; j++)
            matrice[i][j] = i+j+1;

    for(i=0; i<N_RIGHE; i++) {
        for (j = 0; j < N_COLONNE; j++) {
            printf("%2d ", matrice[i][j]);
        }
        printf("\n");
    }

    // Da tastiera:
    for(i=0; i<N_RIGHE; i++)
        for(j=0; j<N_COLONNE; j++) {
            printf("[%d][%d]\n", i, j);
            scanf("%d", &matrice[i][j]);
        }

    for(i=0; i<N_RIGHE; i++) {
        for (j = 0; j < N_COLONNE; j++) {
            printf("%2d ", matrice[i][j]);
        }
        printf("\n");
    }

    // Vedi slide


    return 0;
```