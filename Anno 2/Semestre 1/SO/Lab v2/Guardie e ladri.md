---
cssclasses: so
---
Concetto:

Guardia: #
Ladro: $
La # è controllata tramite le frecce, parte da in basso a destra
Il $ si muove in modo casuale, parte da in alto a sinistra
Il gioco termina quando la # prende il $


Tecnica:

3 processi
    Figlio: Input e posizione #, solo valore interno
    Figlio: Casuale e posizione $, solo valore interno
    Padre: Stampa, collisioni, termina gioco
Usa pipe, fai funzioni separate, temporizza bene


Questo esercizio fa capire bene come fare la prova pratica


main.c
```C
#include <stdlib.h>
#include <ncurses.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <time.h>

#include "guardia.h"
#include "ladro.h"
#include "comune.h"

#define GUARDIA '#'
#define LADRO '$'
#define VUOTO ' '
#define GUARDIA_START_X 1
#define GUARDIA_START_Y 1
#define LADRO_START_X COLS-1
#define LADRO_START_Y LINES-1

int main(){
            // Cose che si fanno sempre
                initscr();
                noecho();
                curs_set(0);
                cbreak();
                keypad(stdscr, 1);
                box(stdscr, ACS_VLINE, ACS_HLINE);
                refresh();
    srand(time(NULL));
    int pipe_fds_ladro[2];
    int pipe_fds_guardia[2];

    if(pipe(pipe_fds_guardia) == -1) {
        perror("Pipe call");
        exit(1);
    }

    int aaaaa[2]={0, 0};

    // Posizioni di base dei personaggi
        Pos guardia={GUARDIA_START_X, GUARDIA_START_Y};
        Pos ladro={LADRO_START_X, LADRO_START_Y};

    pid_t pid;
    pid = fork();
    if(pid<0) {perror("fork call"); _exit(2);}
    else if(pid==0) while(1);// azioniLadro(pipe_fds_ladro, ladro);
    else{
        pid = fork();
        if(pid<0) {perror("fork call"); _exit(2);}
        else if(pid==0) while(1) azioniGuardia(pipe_fds_guardia, guardia);
        else{
            // padre
            while(1){
                //mvaddch(guardia.y, guardia.x, VUOTO);
                mvaddch(ladro.y, ladro.x, VUOTO);
                close(pipe_fds_ladro[1]);
                close(pipe_fds_guardia[1]);
                //read(pipe_fds_ladro[0], aaaaa, 2);
                read(pipe_fds_guardia[0], aaaaa, 2);
                guardia.x += aaaaa[0];
                guardia.y += aaaaa[1];
                mvaddch(guardia.y, guardia.x, GUARDIA);
                //mvaddch(ladro.y, ladro.x, LADRO);
                wait(NULL);
                usleep(50000);
                refresh();
            }
        }
    }
}
```

guardia.h
```C
#include <stdio.h>
#include <ncurses.h>
#include <unistd.h>
#include "comune.h"

void azioniGuardia(int pipe_fds[2], Pos pos);
```

guardia.c
```C
#include "guardia.h"

void movimentoG(int *x, int *y){
    int dir = -1;
    char c = getch();
    if(258 <= c && c <= 261) dir = c%258;
    switch(dir){
        case 0: (*y)+=1; break;
        case 1: (*y)-=1; break;
        case 2: (*x)-=2; break;
        case 3: (*x)+=2; break;
    }
}

void azioniGuardia(int pipe_fds[2], Pos pos){
    noecho();
    int x = 0;
    int y = 0;
    movimentoG(&x, &y);
    //controlla(&x, &y);
    close(pipe_fds[0]);
    Pos posizione;
    posizione.x = x;
    posizione.y = y;
    int aaaaa[2];
    aaaaa[0]=x; aaaaa[1]=y;
    write(pipe_fds[1], aaaaa, 2);
}
```

ladro.h
```C
#include <stdlib.h>
#include <time.h>
#include <ncurses.h>
#include <unistd.h>
#include "comune.h"

void azioniLadro(int pipe_fds[2], Pos pos);
```

ladro.c
```C
#include "ladro.h"

void movimentoL(int *x, int *y){
    int dir = -1;
    char c = 1;
    if(258 <= c && c <= 261) dir = c%258;
    switch(dir){
        case 0: (*y)+=1; break;
        case 1: (*y)-=1; break;
        case 2: (*x)-=2; break;
        case 3: (*x)+=2; break;
    }
}

void azioniLadro(int pipe_fds[2], Pos pos){
    noecho();
    int x = pos.x;
    int y = pos.y;
    movimentoL(&x, &y);
    controlla(&x, &y);
    close(pipe_fds[0]);
    Pos posizione;
    posizione.x = x;
    posizione.y = y;
    int aaaaa[2];
    aaaaa[0]=x; aaaaa[1]=y;
    write(pipe_fds[1], aaaaa, 2);
}
```

comune.h
```C
#ifndef COMUNE_H
#define COMUNE_H

#include <ncurses.h>

typedef struct{
    int x;
    int y;
}Pos;

void controlla(int *x, int *y);

#endif
```

comune.c
```C
#include "comune.h"

void controlla(int *x, int *y){
    if(*x>COLS-1)  (*x)--;
    if(*x<1)       (*x)++;
    if(*y>LINES-1) (*y)--;
    if(*y<1)       (*y)++;
}
```

makefile
```Makefile
out: clean main.o ladro.o guardia.o comune.o
	gcc main.o ladro.o guardia.o comune.o -l ncurses -o Guardia_e_Ladro
	rm -f *.o
main.o: main.c guardia.h ladro.h comune.h
	gcc -c main.c
ladro.o: ladro.c ladro.h comune.h
	gcc -c ladro.c
guardia.o: guardia.c guardia.h comune.h
	gcc -c guardia.c
comune.o: comune.c comune.h
	gcc -c comune.c
clean:
	rm -f *.o
```