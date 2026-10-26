---
cssclasses:
  - alf
---
In realtà è abbastanza semplice. L'ho capito più di un anno dopo aver passato ALF.

Una macchina di Turing ha due componenti: un [[Triennale/Anno 2/Semestre 1/ALF/File/Automi|automa a stati finiti]] (il codice) e un nastro di memoria binaria (la RAM).

Una macchina di Turing con $n$ stati ha un automa con $n+1$ stati, perché si aggiunge lo stato di terminazione (*halt*), equivalente a quello che conosciamo come `return`. Uno stato viene scelto come stato di partenza.

Ogni cella di memoria può essere $1$ o $0$, si parte con una memoria con solo $0$ dappertutto. C'è un puntatore a una cella di memoria.

Le transizioni di stato hanno come condizione lo stato di partenza e il valore della cella puntata, e come conseguenza lo stato di arrivo, la direzione in cui spostare il puntatore, e il valore da scrivere sulla cella su cui si arriva. Quindi per esempio, "partendo dallo stato $A$ con valore $1$, spostati a destra, scrivi $1$ e passa allo stato $B$", oppure "partendo dallo stato $B$ con valore $0$, $halt$".

Proviamo a scrivere il primo in simboli. Non so con quale sintassi lo scrivesse Bartoletti, ma una possibile può essere $A \xrightarrow {1\ \text R\ 1} B$. Quindi per esempio $A \xrightarrow {0\ \text R\ 1} A,\ A \xrightarrow {1\ \text R\ 1} A$ è una macchina di Turing che parte, va a destra per sempre scrivendo $1$ dove passa, e non termina mai.

È possibile anche che esista una transizione di stato che porta a $halt$, ma che le sue condizioni non vengano mai raggiunte. Per esempio:

* Stati $\{A,B\}$
* Stato di partenza $A$
* Transizioni:
	* $A \xrightarrow {0\ \text R\ 1} B$
	* $A \xrightarrow {1\ \text R\ 1} halt$
	* $B \xrightarrow {0\ \text R\ 1} B$
	* $B \xrightarrow {1\ \text R\ 1} B$

Anche questa scrive per sempre $1$ andando a destra e non si ferma mai, perché non è possibile tornare allo stato $A$ una volta scritto un $1$.