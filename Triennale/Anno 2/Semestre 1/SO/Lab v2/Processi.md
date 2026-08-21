---
cssclasses:
  - so
---
[[Triennale/Anno 2/Semestre 1/SO/Lab v2/Socket]]

## Execl e fork

Programmi diversi che vivono su HW diversi possono comunicare
    API: application program interface

Ci sono diversi livelli nell'architettura linux:
    User
    Standard utility program (shell, text editor, compiler)
    Standard library
    ... boh insomma vedi slide

L'utente usa il sistema tramite system call
In C si usano come se fossero chiamate a funzioni
    Rendono valore negativo in caso di errore (di solito -1)

Concetti utili
    PID - process ID, unico per ciascun processo
    wait - il padre aspetta il processo figlio
    exit - termina un processo rendendo un certo exit status

FORK
Il tipo pid_t è l'ennesimo reskin di int, è il tipo di ritorno di fork()
Quando fai fork() duplichi il codice, il padre e il figlio hanno diversi valori di ritorno
    Se fai fork() di solito vuoi due processi che fanno cose diverse, quindi usi l'ID in un if
    Al padre viene reso l'id del figlio, al figlio 0
    If error then return -1 to padre, il figlio invece non esiste ovviamente perché ha fallito
    Il padre memorizza tutti i pid dei figli così se li gestisce
Abbiamo già visto le pipe in bash
    Adesso invece le pipe sono "tubi" che fanno comunicare i processi
        Una pipe è un file

Ci sono alcune librerie che dobbiamo includere
    unistd.h, sys/types.h
Dichiariamo una variabile all'inizio del main
    pid_t pid
C'è una funzione che dice l'id del processo che la chiama
    pid_t getpid()

Se fai un programma che stampa qualcosa nel padre e un'altra nel figlio, l'output sarà inconsistente
    È quello dell'esempio
Perché?
Cosa succede quando eseguo questo codice? Creo un nuovo processo
I processi, con una sola CPU, fanno a turno a usare la CPU
    I turni sono decisi dallo scheduler
    Se si meritano entrambi di andare allo stesso momento, l'ordine sarà essenzialmente casuale
    Questa è una race condition

exit() termina un processo
I suoi processi figli rimarrebbero orfani e non avrebbero nessuno che recuperi i loro status
Quindi il loro padre viene impostato a 1 (init o systemd lo adottano)
Nel main, exit() equivale a return()

Con wait(int*), si blocca finché non finisce un figlio con exit
Con waitpid(pid_t, int*, int), si blocca finché non finisce un figlio specifico
    int* stat_loc contiene la exit status
Poi ci sono due macro, WIFEXITED, WEXITSTATUS, vedi slide
Restituisce -1 se non esiste un processo con quel PID
waitpid():
    Con pid positivo, attende quel processo
    Con -1, qualsiasi processo figlio
    Con qualunque altro valore negativo, prende i valori con PID gruppo uguali al valore assoluto
    Con 0, bohh vedi slide

Processi zombie: termina ma non rende un exit status
Con ps (terminale) vedo tutti i processi, e mi dice gli ID e se sono defunti

C'è una tabella dei processi, si può riempire, se si riempie non puoi fare altri processi

fork() non è l'ultimo modo per creare altri processi, sarebbe troppo limitato
execl(): esegue un binario
    ececl("/bin/ls", "-l", NULL);
    Chiama il binario che si trova in quel path con quell'opzione
        Se va a buon fine, il processo chiamante non viene più eseguito
        In caso di errore, continua l'esecuzione del processo chiamante
            Quindi magari nel resto del main metti il messaggio di errore


## Fork

### fork

```C
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
	pid_t pid;
	printf("Inizio: %d\n", (int)getpid());
	pid=fork();
	if(pid==0) printf("Figlio: %d\n", (int)getpid());
	else if(pid<0) printf("Errore\n");
	else printf("Genitore: %d, figlio: %d\n", (int)getpid(), (int)pid);
}

```

### tocfork

```C
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
	pid_t pid;
	printf("Toc toc\n");
	pid=fork();
	if(pid==0) printf("Race condition\n");
	else if(pid<0) printf("Avanti\n");
	else printf("Chi è?\n");
}
```

## Execl

```C
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

int main(){
	printf("I file:\n");
	execl("/bin/ls", "-l", NULL);
	printf("Errore: non dovresti essere qui\n");
	exit(-1);
}
```