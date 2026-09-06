---
cssclasses:
  - asd
---
Un algoritmo per la ricerca di una sottostringa (pattern) in una stringa.

## Provo a ricordarmelo

Se il tuo pattern è `nanas`, immagina di aver trovato `nan` nella stringa, alla grande, 3 su 5. Ma poi vedi che il prossimo carattere è `b`, tu hai `nanb` nella stringa che quindi non corrisponde a `nanas`. Il metodo più ingenuo sarebbe di ricominciare da capo, e quindi ripartire dall'inizio del pattern.

KPM invece sfrutta il fatto che il primo e il terzo carattere del pattern sono uguali. Quindi ti dice, "se era uguale fino al terzo carattere e poi ha fallito, non ripartire da 0, riparti dal primo carattere che è uguale al terzo".

```
Stringa:                      ananb
Pattern al primo tentativo:    nanas
Pattern al secondo tentativo:    nanas
```

Quindi in questo caso, anziché confrontare `stringa[3]` con `pattern[0]`, lui sa già che sono uguali, quindi riparte confrontando `stringa[4]` con `pattern[1]`.

Questa informazione è salvata nell'array insuccesso. Avendo fallito al confronto di `pattern[3]` e sapendo che deve riprendere da `pattern[1]`, salva `insuccesso[3]=0`. Sì, `0`, 1 in meno. E l'indice che ho detto potrebbe essere off by one, vedi il codice.
## Pseudocodice

#todo
## C

```C
int main() {
    char pattern[LUNG] = "nanas", stringa[LUNG]="ananas";
    int i, j, insucc[LUNG]={0};
    printf("%d", kmpMatch(stringa, 6, pattern, 5));
    return 0;
}

void insuccesso(char* pat, int* insucc, int lung){
    insucc[0] = -1;
    int i, j;
    // analisi dei prefissi
    for(j=1; j<lung; j++){

        // Stessa logica di kmpMatch()
        i = insucc[j-1];

        // Se i==-1, siamo all'inizio
        // Se la corrispondenza finisce qui, potrebbe continuare più indietro nella stringa
        // anasanab, il pattern è anas, qui c'è una b, quindi controllo più indietro e magari continua con una s
        while(i>=0 && pat[j]!=pat[i+1])
            i = insucc[i];

        // Se corrisponde, l'insuccesso qui è 1 avanti a quello precedente (immediatamente più indietro)
        if(pat[j] == pat[i+1]) insucc[j] = i+1;
        // Altrimenti non corrisponde
        else insucc[j] = -1;
    }
}

int kmpMatch(char* stringa, int lenS, char* pat, int lenP){
    int insucc[LUNG];
    insuccesso(pat, insucc, lenP);
    int i=0, j=0;

    // Continua finché non si arriva alla fine della stringa o del pattern
    while(i<lenS && j<lenP){
        // Se corrispondono, va avanti in entrambe
        if(stringa[i] == pat[j]){
            i++;
            j++;
        // Altrimenti, se il pattern è ancora all'inizio, si va avanti con la stringa
        }else if(j==0) i++;
        // Altrimenti, si ricomincia, tenendo conto dell'array insuccesso
        else j = insucc[j-1]+1;
    }
    // Se il pattern è arrivato alla fine, la posizione dell'inizio della corrispondenza è lenP prima della fine
    if(j==lenP) return i-lenP;
    // Se solo la stringa è arrivata alla fine, non c'è una corrispondenza
    else return -1;
}
```