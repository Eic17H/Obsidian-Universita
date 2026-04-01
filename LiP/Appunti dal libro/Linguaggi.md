## Lettura

Un programma è scritto con un determinato *alfabeto*, rappresentato dalla lettera $Σ$. Ci sono due modi per leggere questo alfabeto e tradurlo in linguaggio macchina:
* **Compilazione**: un programma, il compilatore, traduce l'intero programma dal linguaggio di programmazione in linguaggio macchina, tutto in una volta, prima di poterlo eseguire.
* **Interpretazione**: un programma, l'interprete, traduce il programma un'istruzione alla volta e la macchina fisica esegue il codice man mano che viene tradotto.

Un programma sorgente è un file fatto di istruzioni e costrutti consentiti dal linguaggio usato. Il file in sé è un file di testo composto di una serie di caratteri presi da un insieme determinato dal linguaggio. Quell'insieme è proprio l'alfabeto. La fine del file è segnata dal carattere EOF (End Of File).

Il file sorgente viene inviato carattere per carattere ad un *lexer*, che rimuove i caratteri inutili (come i commenti) e raggruppa i caratteri in gruppi, detti *token*. Un **token** è una coppia formata da un nome (un simbolo che appartiene a una categoria) e da un valore (ciò che rappresenta, come un operatore). I token vengono identificati dal *parser*.

Se il lexer trova una sequenza di caratteri non prevista dalle regole del parser, genera un errore. Non si preoccupa del significato dei token, sa solo quali token sono presenti e quali caratteri non rispettano le regole. L'insieme delle regole è la **grammatica** del linguaggio, regole che generano le parole del linguaggio.

Una grammatica determina cosa è e non è un token e quali sequenze di token sono valide. Il parser organizza i token in sequenze ammesse dalla grammatica. Se il linguaggio viene usato correttamente, il parser organizza i token in modo corretto, altrimenti solleva un errore; potrebbe anche provare a risolvere l'errore, indovinando quale codice corretto il programmatore intendesse scrivere.

Incontrando i token, il parser genera una *tavola dei simboli*, o anche più di una, che contengono i token e le informazioni al loro riguardo, per esempio se un token si riferisce a una procedura o a un valore. La tavola viene usata per controllare i tipi, e il parser può generare errori se il programma contiene interazioni tra tipi non permesse.

## Linguaggi

Introduciamo un po' di concetti.
### Alfabeto e parole

Sia $A$ un insieme finito.