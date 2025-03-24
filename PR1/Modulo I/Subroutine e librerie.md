## Settimana 10
SUB-ROUTINE
Com- nellalalah… Beh, forse nella vita di tutti i giorni non si usa… Avere una routine significa fare la stessa cosa nello stresso ordine nello stesso modo ogni volta. È la definizione di programma.
In Golf, dove Scateni ha tanta determinazione ma scarsi risultati, si parla di routine. I linguaggi di programmazione, rispetto ai linguaggi naturali, sono formali,
Sotto-, come interpretiamo ‘sto sotto? Sottoparte del problema complessivo. Scomposizione del problema.

Un grande classico quando si parla di programmazione è fare confronti con la cucina.
Esempio: olio tartufato lasagne al forno.
Serve il ragù, la besciamella, e la pasta.
Ma il ragù della pasta al forno è quello dei tortellini sono lo stesso ragù. E magari compri il ragù già fatto e non sai neanche come si fa.
La successione di un programma è una successione di cambiamenti di stato controllati da iterazioni che lavorano tramite formule matematiche.
Astraiamo. Non abbiamo il controllo su ogni singola istruzione, abbiamo il controllo su un’unica istruzione gigante: non sappiamo come fa qualcosa, ma sappiamo che lo fa.
Dal più concreto al più astratto, ci sono il linguaggio macchina, gli HLL, e l’istruzione gigante.
Le azioni giganti non sono definite dal linguaggio, ma dalle subroutine.

NON COME, MA COSA
DAL 20 AL 26 NOVEMBRE 
UNICASTORES
SCONTI DEL BLACK BOX


Per un neofita (bella parola, neofita), non c’è distinzione tra istruzioni del linguaggio e subroutine, ma in realtà la differenza è enorme.

Le variabili sono astrazione delle posizioni di memoria, e la forma più basica di astrazione dei dati. In OOP, il principale modello di astrazione dei dati sono le classi.

Quando si usa una subroutine, in inglese si dice che si effettua una subroutine call, ma in italiano diciamo invocazione di una subroutine. Tipico pathos italiano, non la chiamiamo, la invochiamo.
Subroutine: senza che noi sappiamo come, fa qualcosa che sappiamo.
“Black box”, scatola nera. Dati in, processo ininfluente, dati out.
Chi ha fatto le funzioni di std? Boh. Saranno passati 40 anni. Non ci interessa.
Ci basta la lista di parametri. Il numero va da 0 a molti, valore che dipende dal compilatore.
Una subroutine che restituisce un valore è una funzione, come in matematica, mentre una che compie azioni senza restituire niente è una procedura.
Per dichiarare una subroutine servono queste cose:
Un nome (un identificatore);
Se ha un risultato o no, e se sì di che tipo;
Quanti parametri ha, e se ne ha di che tipo sono.
Per esempio, double sqrt(double) restituisce un valore double e prende un parametro double.
Nei nostri programmi, anche se non compare nel nostro codice, questa funzione è dichiarata perché includiamo math.h, che contiene questa dichiarazione.

I file .h che includiamo sono dei file header, che contengono le dichiarazioni in C, mentre il vero codice è in assembly ed è contenuto nell’associato file .o.
“math.h è una libreria” è una stronzata colossale, math.h è solo l’intestazione (header).
I file header sono a corredo della libreria.

double sqrt(double) è una signature. Non ci possono essere due subroutine con la stessa signature, ma possono essercene con lo stesso nome e signature diverse.

Le funzioni sono praticamente operatori prefissi.
3+4 è come add(3,4).

Le procedure si dichiarano come void foo(int, int).
Si introduce questo tipo fasullo void. Cos’è?
Nelle header c’è typedef void int. È l’ennesimo tipo intero!
Però il compilatore ti impedirà comunque di returnare se una subroutine è void.

Tra l’altro le subroutine sono belle perché posso scrivere il programma invocando quante volte voglio la subroutine funzioneFondamentalissima() senza aver ancora progettato la subroutine stessa, magari mentre aspetto che lo faccia qualcun altro.

Per prassi, quando si fa una libreria, il file .c e il file .h hanno lo stesso nome.

I nomi dei parametri all’interno della subroutine sono da essere utilizzati come variabili.
Vedi le slide, comunque i parametri sono equivalenti a delle variabili.

return restituisce il valore al programma chiamante.