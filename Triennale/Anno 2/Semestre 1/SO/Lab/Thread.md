---
cssclasses:
  - so
---
Thread

Per compilare:
```
gcc source.c -l pthread -o out
```
Un'altra opzione `-l`. Se lo vogliamo usare con ncurses, dobbiamo mettere entrambi.
Ecco che torna utile makefile, li metti lì.

Tutti i thread hanno un ID, di tipo `pthread_t`.
Ne puoi avviare uno con del codice simile a questo:
```
void* start_routine(void*);
```
Se voglio fare altri thread che fanno una funzione diversa, ne faccio un'altra.
Ogni thread è collegata a una thread function.
Ci possono essere thread per thread function.

Per crearli:
```
int pthread_create(ID, attributi, start routine, argomenti)
```
Gli attributi sono opzioni di sistema, noi le lasciamo a `NULL`.
Gli argomenti invece li useremo.
La start routine è passata come `void*`.

Questione importante sugli argomenti.
Sono simili a come abbiamo messo dei valori nelle pipe.
Non possiamo usare prototipi diversi per thread diversi.
Abbiamo una struttura generica, e definiremo strutture personalizzate.
Passiamo solo un puntatore alla struttura, che poi conterrà tutto.

Valore di ritorno, 0 successo, >0 fallimento, diverso dai processi (dove fallimento è <0).

Quindi, quando accendi un thread, esegue a partire dalla funzione specificata.
Invece il thread principale continua con la funzione chiamante.

Come termino un thread?
Se nelle opzioni metti `NULL`, puoi usare `pthread_cancel(pthread_t)`, simile a `kill()`.
C'è anche `pthread_exit()`, o `return`, simili.
Non useremo `pthread_kill(pthread_t, int signal)`, perché non si aggancia alla logica di quello che dovremo fare.

## 1

```C
#include <stdio.h>
#include <pthread.h>

// Stamperà una sequenza casuale di c e x

void* char_print(void* unused){
    while(1) printf("%c", 'x');
    return 0;
}

int main(){
    pthread_t thread_id;
    pthread_create(&thread_id, NULL, &char_print, NULL);
    while(1) printf("%c", 'c');
    return 0;
}
```

## 2

Il thread principale fa 5 altri thread
Ogni thread stampa 10'000 volte lo stesso carattere (a, e, i, o, u), poi returna
Il main aspetta che finiscano
Carattere e numero come argomenti

```C
// Un thread ne crea 5 che stampano caratteri concorrentemente
// Il carattere e il numero di caratteri sono passati come argomento

#include <stdio.h>
#include <pthread.h>
#include <sys/wait.h>
#include <unistd.h>

#define N 10000

typedef struct{
    int n;
    char c;
}Args;

void* char_print(Args *args){
    int i = args->n;
    while(i --> 0) {printf("%c", args->c); usleep(0);}
    printf("\nOK_%c\n", args->c);
    return 0;
}

int main(){
    // Gli argomenti dei 5 thread
    Args a = {N, 'a'};
    Args e = {N, 'e'};
    Args i = {N, 'i'};
    Args o = {N, 'o'};
    Args u = {N, 'u'};
    // Gli ID dei 5 thread
    pthread_t thread_id_a;
    pthread_t thread_id_e;
    pthread_t thread_id_i;
    pthread_t thread_id_o;
    pthread_t thread_id_u;
    // Attiva i 5 thread
    pthread_create(&thread_id_a, NULL, &char_print, &a);
    pthread_create(&thread_id_e, NULL, &char_print, &e);
    pthread_create(&thread_id_i, NULL, &char_print, &i);
    pthread_create(&thread_id_o, NULL, &char_print, &o);
    pthread_create(&thread_id_u, NULL, &char_print, &u);
    // Attende i 5 thread
    pthread_join(thread_id_a, NULL);
    pthread_join(thread_id_e, NULL);
    pthread_join(thread_id_i, NULL);
    pthread_join(thread_id_o, NULL);
    pthread_join(thread_id_u, NULL);
    // Termina
    return 0;
}
```