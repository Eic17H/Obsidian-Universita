---
cssclasses: pr1
---
Da rifare visto che sto introducendo i tipi prima di questo. Aggiungere getchar.
## Output (stampa)

Per visualizzare del testo a schermo, usiamo il comando `printf();`.

```C
#include<stdio.h>

int main() {
	printf("Hello world!\n");
	return 0;
}
```

Questo è un programma che stampa "Hello world!", va a capo, e poi si chiude. È il tipico primo programma di uno studente.

Vediamo che per usare questo comando, dobbiamo mettere quello che vogliamo stampare tra virgolette, e che `\n` indica un'andata a capo. Quella *cosa tra virgolette* è detta una *stringa*.

Vediamo un utilizzo più complicato.

```C
#include<stdio.h>

int main() {
	int a=1;
	printf("a contiene %d", a);
	return 0;
}
```

Qua, anziché avere solo il testo tra le parentesi, c'è anche qualcos'altro. Nella stringa mettiamo `%d`, è un segnaposto che deve essere sostituito da un numero. Dopo la stringa, mettiamo una virgola, e poi ciò che darà il valore a `%d`, nel nostro caso la variabile `a`. Infatti, quel codice stampa `a contiene 1`.

Queste *cose* tra parentesi separate da una virgola sono dette *parametri*. In questo pezzo di codice, abbiamo usato `printf();` con due *parametri*.

Vediamo un utilizzo più complesso dello stesso concetto:

```C
#include<stdio.h>

int main() {
	int a=1, b=2, c=7;
	printf("%d,%d:%d", a, b+c, c-b); // Stampa 1,9,5
	return 0;
}
```

Vediamo che possiamo mettere più segnaposto, e in quel caso dovremo ripetere la stessa struttura con la virgola. Vediamo anche che possiamo usare come valore qualunque cosa che abbia un valore, anche un'espressione.

## Input

Finora abbiamo scritto i valori che volevamo usare direttamente nel codice. Possiamo invece permettere di aprire il programma, scrivere i valori con la tastiera mentre usiamo il programma, e far usare quei valori al programma. Questo è detto *input*.

```C
#include<stdio.h>

int main() {
	int a=0;
	scanf("%d", &a);
	printf("Hai scritto %d", a);
	return 0;
```

Per mettere dentro `a` un numero scritto dalla tastiera, usiamo il comando `scanf();`. Il primo parametro contiene un segnaposto e il secondo specifica la variabile che verrà sovrascritta.

Scriviamo `&a` perché il segno `&` è, in un certo senso, quello che dà le chiavi delle variabili (lo vedremo più formalmente più avanti). La variabile `a` è nostra, noi abbiamo le chiavi, e diamo le chiavi a `scanf();` perché la possa modificare.

```C
// buffer:

	char a, b;
	printf("A: ");
	scanf("%c", &a);
	printf("B: ");
	scanf("%c", &b);
	printf("A e B: %c %c\n", a, b);
	// b conterrà un'andata a capo

	printf("A: ");
	scanf("%c", &a);
	getchar();
	printf("B: ");
	scanf("%c", &b);
	printf("A e B: %c %c\n", a, b);
	// getchar() intercetta l'andata a capo nel buffer

	printf("A: ");
	scanf(" %c", &a);
	printf("B: ");
	scanf(" %c", &b);
	printf("A e B: %c %c\n", a, b);
	// lo spazio indica che scanf deve ignorare tutti i caratteri speciali
```