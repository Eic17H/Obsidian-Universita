#algoritmi
Il quesito dell’uovo tartufato può essere automatizzato tramite un algoritmo, che avrà come operazioni lo spostamento da un contenitore a un altro.
Una possibile soluzione sarebbe fare ogni operazione possibile (ne hai 6) per ogni stato, e tornare indietro quando si è bloccati. Bisognerebbe tenere una cronologia per sapere per quali stati si è già passati, e prima o poi si arriva alla soluzione.
Non tutti gli stati sono validi, nel nostro caso la somma deve essere sempre 80.
L’obiettivo del nostro corso è imparare a risolvere problemi e acquisire un metodo.
Parliamo di termini, definizioni, etimologie e storia.


#algoritmi
Serve un processo risolutivo, è fondamentale.
La caratteristica fondamentale del processo risolutivo è la presenza di un algoritmo.
Un po’ di #storia:
900 d.C. (X secolo), impero Persiano, Al-Khwarizmi inventa Al-Jabr, l’algebra.
Dal nome Al-Khwarizmi (e da arithmos, numero) deriva “algoritmo”.
Un algoritmo è un insieme finito e ordinato di passi univoci eseguibili che definiscono un processo che termina.

#algoritmi
Avere un numero di passi finito è facile.
Far sì che ogni passo sia completabile in un tempo finito è facile.
Assicurarsi che la sequenza di passi e stati sia finita, questa è la parte difficile.
Questo è il celebre halting problem, problema della terminazione.

#algoritmi
Un esempio di algoritmo che termina è l’algoritmo di Euclide.

#algoritmi
Massimo Comun Divisore: il metodo più semplice consiste nell’enumerare tutti i divisori del primo numero, tutti quelli del secondo, trovarne l’intersezione, e poi cercare lì il maggiore.
Questo è un metodo di tipo bruteforce, a forza bruta.
Funziona perché l’intersezione non è mai un insieme vuoto, contiene sempre 1.
I metodi bruteforce sono spesso molto lenti e inefficienti, e sono la soluzione in casi disperati, o in certi casi specifici.

Un metodo più efficiente è l’algoritmo di Euclide. È un algoritmo in quanto:
Ha un numero finito di passi;
È scritto in un linguaggio univoco, quello della matematica;
Ogni passo si svolge in un tempo finito.
Termina perché dopo ogni passo, si ottiene un valore strettamente minore del precedente, e lavoriamo con i numeri naturali. Tutte le serie discendenti di numeri naturali prima o poi terminano: non puoi scendere per sempre nei numeri interi senza andare sotto 0.
Otteniamo la risposta giusta? Non lo sappiamo, ma almeno sappiamo che termina sempre.


