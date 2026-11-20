Se hai un oggetto di nome `citta` con un campo di nome `abitanti`, puoi leggere il campo con `citta.abitanti` o `citta["abitanti"]`. Quindi puoi fare una funzione:
```JS
function getAb(c) {
    return c.abitanti;
}
```

Questo sembra del codice normalissimo, ma c'è un problema: se `c` è `NULL`, quel codice dà errore di tipo, perché non puoi applicare l'operatore `.` a `NULL`. Quindi potresti risolvere così:
```JS
function getAb(c) {
    if(!c) return NULL;
    else return c.abitanti;
}
```

Ma appena la struttura dati è un po' più complicata, il codice diventa disordinato.

La soluzione è di usare un altro operatore. `c?.abitanti` controlla se `c` è `NULL`, e se lo è si valuta a `NULL`, altrimenti valuta il campo.