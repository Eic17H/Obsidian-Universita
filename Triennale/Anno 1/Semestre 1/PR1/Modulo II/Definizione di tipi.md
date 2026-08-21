---
cssclasses: pr1
---
```
/**
     * DEFINIZIONE NUOVI TIPI
     * Suggerimento: dichiara tra preprocessing e main.
     * Di solito i tipi si dichiarano globalmente.
     * Ci sono due categorie: enumerazioni e strutture.
     *
     * Enumerazioni
     * enum seme {CUORI, QUADRI, FIORI, PICCHE};
     * le maiuscole così non sono obbligatorie ma è buona pratica.
     * una variabile di tipo seme può avere uno di quei quattro valori.
     * ennesimo tipo mappato agli interi, CUORI vale 0, QUADRI 1 e così via.
     * questo significa che non c'è un buon modo per stamparli, bisogna usare switch case o altri metodi contorti del genere.
     * puoi mapparli diversamente:
     * enum seme {CUORI=1, QUADRI, FIORI, PICCHE};
     * così QUADRI vale 2 e così via.
     * la cosa carina che offre il linguaggio è questa:
     * volendo usare una variabile di tipo seme, dovrei fare:
     * enum seme s;
     * la cosa carina che mi piacerebbe fare è questo:
     * seme s;
     * lo posso fare con typedef:
     * typedef enum seme Seme;
     * per convenzione, i tipi definiti da typedef cominciano con la maiuscola.
     * in questo modo "Seme" viene definito come il tipo "enum seme".
     *
     * siccome siamo tutti pigri, con typedef possiamo fare qualcosa di più carino:
     * typedef enum {SI, NO, FORSE} Scelta;
     * e questo ci permette di fare entrambe le cose nella stessa riga.
     *
     * Strutture
     * possiamo imaginarla come una tabella che ha una serie di colonne.
     * queste colonne sono i campi all'interno della struttura, ognuna con un tipo di dato.
     * la keyword che si usa per definire la struttura è struct.
     * struct nomeStruttura{...};
     * tra le graffe facciamo ciò che sembra una serie di dichiarazioni di variabili, quindi "tipo nomeUnivoco;...".
     * non c'è limite al numero di campi.
     * per dichiarare una variabile di tipo struct nomeStruttura, uso:
     * struct nomeStruttura nomeVariabile;
     * ovviamente anche qui funziona la forma compatta con typedef, ma è diversa.
     */

    Seme laMiaCarta = CUORI;
    Calciatore alciaTore;
    alciaTore.altezzaCm = 269;
    strcpy(alciaTore.cognome, "Alciani");
    strcpy(alciaTore.nome, "Salvo");
    alciaTore.peso = 69;

    // Altrimenti lo inizializzi
    Calciatore bassisTa = {84.1, 187, "Tarcisio", "Bassis"};

    // Puoi anche prenderlo dalla tastiera
    scanf("%d", &bassisTa.altezzaCm);

    // E puoi fare assegnamenti
    Calciatore basTarci;
    basTarci = bassisTa;
    // Strano che il C ci permetta di farlo, considerando che contengono array e il C non permette di fare assegnamenti di array
    // Comodo

    // Posso usare enum e strutture dentro strutture (vedi Carta)
    // E posso fare array di strutture
    // E posso passare strutture come parametri di subroutine
    Carta cartaMia = {PICCHE, 2, bassisTa};
```