---
cssclasses:
  - csmn
---
A Lab faremo MatLab e faremo anche esercitazioni di teoria. Di MatLab usiamo la versione R2023b, ma se non è proprio la stessa diciamo che va bene comunque, basta sia recente.

MatLab sta per Matrix Laboratory, si usa per fare calcoli con le matrici. Faremo live script, che possiamo salvare come file con estensione `.m`.

Per dichiarare una variabile possiamo scrivere, per esempio, `x = 10;`, e questa variabile viene salvata nel workspace, che è l'insieme delle variabili finora dichiarate, insieme ai loro valori. Questo è un linguaggio non fortemente tipato, il tipo viene dedotto automaticamente. Di default, tutte le variabili sono matrici. Quella `x` è una matrice 1x1. Infatti, `size(x)` dà `1 1`.

Se chiamiamo `size(x)` senza assegnarlo a una variabile, il valore viene assegnato alla variabile `ans`. Possiamo eliminare tutte le variabili con `clear`, e mostrarle tutte con `whos`. Per vederne una sola, per esempio `x`, scriviamo `whos x`.

Una funzionalità molto utile è quella di salvataggio del workspace, usando la funzione `save()`, che prende in input una stringa che sarà il nome del file, per esempio `save("ws1.mat")`. Potremo usare quel file per ripristinare il workspace.

Un'altra funzione utile è il diary, che permette di salvare tutto ciò che è successo nella sessione, quindi tutti i comandi eseguiti, come file di testo. `diary("lab0.txt")`. Possiamo sospendere la registrazione con `diary off`, riprenderla con `diary on`.

Possiamo fare il modulo con `mod(,)`.

Ci sono due comandi, `tic` e `toc`, che avviano e terminano un timer, che ci permette di sapere quanto ci ha impiegato il computer a fare certi calcoli.

Il `;` non è obbligatorio. Però, di default i comandi stampano il risultato, il punto e virgola impedisce la stampa. Si impedisce perché è computazionalmente lenta.

Stampa:
* Un metodo semplice è appunto non mettere il `;`: `x`.
* Un altro modo è `disp(x)`, formattata: `disp("Il valore di x è "+x)`.
* La stampa formattata simile al C si fa con `fprintf()`: `fprintf("x = %d", x)`. `%d %f \n`.
* Per prendere valori in input si usa `input()`: `x = input("Inserisci un valore");`.

`help` è un manuale. Si può anche usare qualcosa come `help disp`.

Il delimitatore di blocco in MatLab è `end`, non ci sono parentesi quanto in C.

```
if x > 5
	disp("x è maggiore di 5")
elseif x < 5
	disp("x è minore di 5")
else
	disp("x è uguale a 5")
end
```

C'è `switch()`/`case`. Il default è `otherwise`, e alla fine si mette `end`. La variabile può essere di qualunque tipo. Si possono ammassare più casi: `case {"c", "d"}` (non esiste il `break`). Ripetere un case, anche parzialmente, è un errore di sintassi, o un warning, a seconda della versione (sembra).

Costrutti iterativi: `while` e `for`.

```
for i=1:10
	disp(i)
end
```

```
i=1
while i<=10
	disp(i)
end
```

Il comando `format` prende un parametro per il formato della stampa dei numeri. `format short` ci dà 4 cifre decimali. `format shorte` ci dà 4 cifre in notazione scientifica, similmente `long` e `longe` per 10 cifre. Questo comando non cambia in alcun modo i calcoli, solo la visualizzazione. L'effetto dura da quando viene chiamato in poi.

La funzione `fix()` tronca tutte le cifre decimali del parametro, quindi arrotonda verso 0. `floor()` arrotonda per difetto, verso -inf. `ceil()` arrotonda per eccesso. `round()` arrotonda all'intero più vicino; prende anche un secondo parametro opzionale, che specifica le cifre dopo la virgola; prende anche un terzo parametro, una stringa, se scrivi `"significant"` considera nel conteggio solo le cifre significative.

Esercizio: script che ci permette di fare le operazioni su un insieme di numeri macchina.

```
% F(10,3,-12,12)

a = input("Inserisci il valore di a\n");
b = input("Inserisci il valore di b\n");
c = input("Inserisci il valore di c\n");

% calcolare (a+b)+c

fla = round(a,3,"significant");
flb = round(b,3,"significant");
flc = round(c,3,"significant");

temp = round(fla+flb, 3, "significant");
r = round(temp+flc, 3, "significant");

% calcoliamo l'errore relativo
esatto = a+b+c;
rho = abs(esatto-r)/abs(esatto)

% calcolare a+(b+c)
temp = round(flc+flb, 3, "significant");
r2 = round(temp+fla, 3, "significant");
% calcoliamo l'errore relativo
rho2 = abs(esatto-r2)/abs(esatto)
```

Un algoritmo per trovare l'epsilon di macchina:
```
% e t.c. 1+e>1
e = 1;
while 1+e/2>1
    e = e/2;
end
disp("L'epsilon di macchina è "+e)
disp("L'epsilon secondo MatLab è "+eps)
```

Proviamo a fare un limite:
```
% lim x->0 di (1-cos(x))/x^2 = 1/2
for i=-1:-1:-10
    x = 10^i;
    y = (1-cos(x))/x^2
end
```
Ci dà 0. Perché? Per il cosiddetto *errore di cancellazione*. $1-cos(x)$ diventa talmente piccolo da diventare 0 come numero di macchina. La soluzione è di riformulare la formula per evitare quel numero piccolo.
```
% lim x->0 di (1-cos(x))/x^2 = 1/2
% 1/2*(sin(x/2)/(x/2))^2
for i=-1:-1:-10
    x = 10^i;
    y = 1/2*(sin(x/2)/(x/2))^2
end
```

Sono formule matematicamente equivalenti, ma qua non raggiungiamo l'epsilon di macchina e quindi otteniamo il risultato corretto, `0.5`.

Esercizio: Generare un numero casuale n tra 10 e 30 finché non è divisibile per 5. Generare una matrice quadrata di dimensione n/5 x n/5 e popolarla con i numeri da 1 a n ordinati in riga.

```
n = randi([10,30])
while(mod(n,5))
    n = randi([10,30])
end
m = n/5;
A = zeros(m);
for i=1:(m*m-1)
    A(floor(i/m)+1, mod(i,m)+1) = i+1;
end
A
```

Dopo che l'ho fatto, ha detto che è utile la funzione `reshape()`. Se gli passi un vettore 1x25 e poi la taglia 5x5, te lo avvolge in una matrice 5x5. Fallisce se le taglie sono incompatibili. Puoi anche appiattire una matrice in un vettore.