---
cssclasses: pr1
---
Quando esegui del codice che crea una variabile, a quella variabile viene assegnato un *indirizzo* numerico, che indica la locazione di memoria in cui è immagazzinata. Se tu conosci quell'indirizzo, puoi leggere *e scrivere* quella variabile.

Data una variabile `a`, puoi leggere il suo indirizzo con `&a`. Se noti, è quello che passiamo a [[Input e output|scanf]], appunto perché è una funzione che scrive un valore in una variabile che non è sua. Stiamo praticamente dando le chiavi di quella variabile.

Se tu hai una variabile `b` che contiene l'indirizzo di un'altra variabile che per comodità chiamiamo Michele, puoi riferirti a Michele con `*b`. Ogni volta che scriverai `*b` sarà come scrivere "Michele". Quando usi `*` si dice che stai *dereferenziando*.

Per quanto riguarda il tipo, se hai `int a`, allora `&a` sarà di tipo `int*`, e puoi fare `int* b = &a`. Al rovescio, se hai `int* b`, allora `*b` sarà di tipo `int` e puoi fare `int a = *b`. La cosa brutta è che l'asterisco così ha senso intuitivo, ma da un punto di vista tecnico, in realtà dovresti dichiararlo come `int *b`, perché se fai `int* b, a;` è come fare `int *b; int a;`.

Vediamo le [[Definizione di tipi|struct]]. Anche le struct sono variabili, e hanno un operatore particolare, `.`. Il grande problema di questo operatore, è che ha precedenza su `*`. Quindi se tu hai il tuo struct `Persona riccardo`, e hai il puntatore `Persona* tizio` che punta a Riccardo, certamente puoi fare `*tizio` per riferirti a Riccardo, ma se provi a fare `*tizio.nome` non funziona, perché diventa `*(tizio.nome)` che non funziona. Dovresti scrivere esplicitamente `(*tizio).nome`, che è orrendo. Quindi invece hanno fatto un altro operatore, e scriviamo `tizio->nome`, senza asterisco.

Non puoi dare un valore a caso a un puntatore e dereferenziarlo. Se provi a dereferenziare un puntatore che punta fuori dal tuo territorio, ti dà un errore detto *segmentation fault*, che per gli studenti del C è un incubo ricorrente.