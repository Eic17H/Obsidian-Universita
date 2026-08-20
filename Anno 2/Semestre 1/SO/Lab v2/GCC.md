---
cssclasses:
  - so
---
Cominciamo col C
Appunto Unix è stato fatto in C perché C è fatto per essere portabile in diversi computer
Il C è stato fatto per Unix, poi si è diffuso
Unix è stato branchato molto, un po' anche il C, dialetti di C
Poi si sono fatti degli standard di C: C89 e C99 sono i più utilizzati
    Adesso siamo arrivati al C23

Ci sono lnpr compilati e interpretati
    Compilato: tradotto tutto prima e poi eseguito
    Interpretato: tradotta una riga alla volta, eseguita, passa alla prossima riga se non ci sono errori
Il C è compilato

Il C ha modi di gestire puntatori etc per gestione della memoria
    Molto importante la gestione della memoria perché un SO deve avere molto controllo sull'hardware
    I linguaggi più moderni sono molto più astratti, rischi meno errori umani
        Ma comunque se astrai sei meno efficiente, il C è potenzialmente più efficiente se sei bravo
            Importante per la computer graphics
            Se ti serve sicurezza sono meglio altri linguaggi

Un programma C avvia per prima cosa la routine main()

Ok noi scriviamo in C che è simile all'inglese, ma il computer capisce solo 0 e 1
Chi traduce?

Preprocessore
    Procedure di precompilazione
    Espansione delle macro, espansione delle librerie
Compiler
    Da C ad Assembly
Assembler
    Da Assembly a Linguaggio macchina
Linker
    Attaccare il nostro codice in LM con il codice delle librerie

Noi siamo abituati a usare un IDE: clicchiamo un bottoncino e il codice va
In realtà quella è un'astrazione
Il software dell'IDE è una GUI più tanti altri software con vari passaggi
L'IDE si appoggia a software che potrebbero esistere indipendentemente
La compilazione avviene con GCC (Gnu Compiler Collection)
    Lo stesso GNU di Unix
    GCC è un programma che accetta opzioni, come gli altri binari chiamati dalla CLI
        Per esempio -c salta il linking e ti lascia con un file .o per ogni sorgente
        Con -d puoi cambiare i valori delle macro
            Simile ai $1 $2 $3 dei file bash, che sono essenzialmente macro
        Con -o decidi il nome del file di output
    Certe volte l'IDE non trova neanche GCC, e non puoi compilare col bottoncino
    Di default il file in output è a.out

Se ci sono tanti file non vogliamo scrivere tanti comandi per compilarli tutti, vogliamo automatizzare
    Vedremo dopo come

Un'altra funzione degli IDE è il debug
Il debugger è un altro software che ci permette di specificare punti di controllo dove vedremo certi valori
    Così sappiamo a quale passo cominciano ad esserci valori sbagliati e correggiamo lì
    Il debugger è GDB (Gnu DeBugger)

Per il debug puoi aggiungere breakpoint con break tramite la CLI
Se non metti l'opzione -g il debugger non riesce a fare certe cose
Per i veri comandi vedi le slide, utili

Metti che abbiamo un progetto con file1.c file2.c file3.h
Basta fare gcc -c file1, gcc -c file 2, gcc file1.o file2.o
Colleghiamo a mano i due file oggetto nell'ultimo passaggio
Il file in output è a.out

Considerare le dipendenze, grafo delle dipendenze slide
    Non vale solo per C, in generale
Per il C, il grafo è codificato nel file "Makefile" senza estensione

Attento che se non metti file.h su "file1.o: file.h file1.c" poi ignora le modifiche se il file modificato più di recente è file.h
Nelle slide ciascuna regola ha solo un comando gcc, ma puoi mettere quello che vuoi anche rm eccetera più comandi per regola
Per lanciare Makefile usi "make". Se specifichi una regola, fa quella, altrimenti la regola in alto, che idealmente ha legami con quelle successive e quindi a catena fa le dipendenze

Il comando clean elimina i file .o che sono inutili una volta finito

È convenzione chiamare Makefile Makefile, così basta fare "make" senza specificare il nome del file

## Esercizio 1

Source 1 stampa Hello world 1
Source 2 stampa Hello world 2
Compilali in code1 e code2 eseguibili
Con bash vedi se funzionano
Con cmp confronta i due file source e i due file exec
Con diff la stessa cosa

Source 1
```C
#include<stdio.h>

int main(){
	printf("Hello world 1\n");
	return 0;
}
```

Source 2

```C
#include<stdio.h>

int main(){
	printf("Hello world 2\n");
	return 0;
}
```

## Esercizio 2

Acquisisci due interi in input
Definisci funzione max(n,m)
Stampa il maggiore

```C
#include<stdio.h>

int max(int n, int m);

int main(){
	int n, m;
	scanf("%d", &n);
	scanf("%d", &m);
	printf("%d\n", max(n,m));
	return 0;
}

int max(int n, int m){
	return n>m?n:m;
}
```