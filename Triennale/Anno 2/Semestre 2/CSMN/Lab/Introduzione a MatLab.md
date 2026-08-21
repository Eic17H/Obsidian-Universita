---
cssclasses:
  - csmn
---
A Lab faremo MatLab e faremo anche esercitazioni di teoria. Di MatLab usiamo la versione R2023b, ma se non è proprio la stessa diciamo che va bene comunque, basta sia recente.

MatLab sta per Matrix Laboratory, si usa per fare calcoli con le matrici. Faremo live script, che possiamo salvare come file con estensione `.m`.

## Variabili

Per dichiarare una variabile possiamo scrivere, per esempio, `x = 10;`, e questa variabile viene salvata nel workspace, che è l'insieme delle variabili finora dichiarate, insieme ai loro valori. Questo è un linguaggio non fortemente tipato, il tipo viene dedotto automaticamente. Di default, tutte le variabili sono matrici. Quella `x` è una matrice di taglia $1\times1$. Infatti, `size(x)` restituisce `1 1`.

Se chiamiamo `size(x)` senza assegnarlo a una variabile, il valore viene assegnato alla variabile `ans`. Possiamo eliminare tutte le variabili con `clear`, e mostrarle tutte con `whos`. Per vederne una sola, per esempio `x`, scriviamo `whos x`.

## Salvare

Una funzionalità molto utile è quella di salvataggio del workspace, usando la funzione `save()`, che prende in input una stringa che sarà il nome del file, per esempio `save("workspace.mat")`. Potremo usare quel file per ripristinare il workspace con `load("workspace.mat")`.

Un'altra funzione utile è il *diary*, che permette di salvare tutto ciò che è successo nella sessione, quindi tutti i comandi eseguiti, sotto forma di file di testo. Il nome del file viene passato come parametro: `diary("diario.txt")`. Possiamo sospendere la registrazione con `diary off` e riprenderla con `diary on`.

## Stampa e input

Il `;` non è obbligatorio alla fine di una riga. Di default i comandi stampano il risultato, il punto e virgola serve a impedire la stampa. Si impedisce perché è computazionalmente lenta. Non è l'unica opzione.

`disp()` permette di stampare il valore di singole variabili, come `disp(x)`, o di aggiungere una stringa, come `disp("Il valore di x è "+x)`.

La stampa formattata simile al C si fa con `fprintf()`: `fprintf("x = %d", x)`. `%d %f \n`.

Per prendere valori in input si usa `input()`: `x = input("Inserisci un valore");`.

## Polimorfismo

Certe funzioni sono polimorfiche, cioè cambiano il comportamento a seconda di come le chiamiamo. Per esempio, `eig(A)` restituisce lo spettro di $A$ se assegnata a un vettore, e restituisce autovettori e autovalori in diagonale se assegnata a una coppia di matrici.
## Comandi utili

Il comando `help` permette di consultare il manuale. Può prendere come parametro un comando, come `help diary`, e in quel caso stamperà la sezione che riguarda quel comando. Senza un parametro, fornisce una guida e un link alla documentazione.

`clc` elimina la cronologia della finestra dell'interfaccia a riga di comando.
## Blocchi

Il delimitatore di blocco in MatLab è `end`, non ci sono parentesi quanto in C.

```MatLab
if x > 5
	disp("x è maggiore di 5")
elseif x < 5
	disp("x è minore di 5")
else
	disp("x è uguale a 5")
end
```

## Timer

È possibile utilizzare un timer per misurare il tempo di esecuzione di una porzione di codice, per esempio per confrontare la scalabilità di due algoritmi.

Il comando `tic` avvia il timer, e il comando `toc` lo ferma.

`toc` è polimorfico. Chiamato da solo, stamperà, per esempio, `Elapsed time is 0.002274 seconds.`, e non restituirà nessun valore da assegnare ad `ans`. Altrimenti può essere assegnato a una variabile, come in `x = toc`, e in quel caso non stamperà niente.
## Formati numerici

Il comando `format` prende un parametro per il formato della stampa dei numeri. `format short` ci dà 4 cifre decimali. `format shorte` ci dà 4 cifre in notazione scientifica, similmente `long` e `longe` per 10 cifre. Questo comando non cambia in alcun modo i calcoli, solo la visualizzazione. L'effetto dura da quando viene chiamato in poi.

La funzione `fix()` tronca tutte le cifre decimali del parametro, quindi arrotonda verso $0$. `floor()` arrotonda per difetto, verso $-\infty$. `ceil()` arrotonda per eccesso, verso $+\infty$.

`round()` arrotonda all'intero più vicino, e ha due parametri opzionali: il primo specifica la quantità di cifre dopo la virgola, e il secondo può solo essere una stringa, `"significant"`, che indica che deve considerare nel conteggio solo le cifre significative.

Esercizio: script che ci permette di fare le operazioni su un insieme di numeri macchina.

```MatLab
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
```MatLab
% e t.c. 1+e>1
e = 1;
while 1+e/2>1
    e = e/2;
end
disp("L'epsilon di macchina è "+e)
disp("L'epsilon secondo MatLab è "+eps)
```

Proviamo a fare un limite:
```MatLab
% lim x->0 di (1-cos(x))/x^2 = 1/2
for i=-1:-1:-10
    x = 10^i;
    y = (1-cos(x))/x^2
end
```
Ci dà 0. Perché? Per il cosiddetto *errore di cancellazione*. $1-cos(x)$ diventa talmente piccolo da diventare 0 come numero di macchina. La soluzione è di riformulare la formula per evitare quel numero piccolo.
```MatLab
% lim x->0 di (1-cos(x))/x^2 = 1/2
% 1/2*(sin(x/2)/(x/2))^2
for i=-1:-1:-10
    x = 10^i;
    y = 1/2*(sin(x/2)/(x/2))^2
end
```

Sono formule matematicamente equivalenti, ma qua non raggiungiamo l'epsilon di macchina e quindi otteniamo il risultato corretto, `0.5`.

Esercizio: Generare un numero casuale n tra 10 e 30 finché non è divisibile per 5. Generare una matrice quadrata di dimensione n/5 x n/5 e popolarla con i numeri da 1 a n ordinati in riga.

```MatLab
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

## File `.mlx`

Spieghiamo un attimo i file `.mlx`. In un file mlx possiamo mettere sia porzioni di codice che porzioni di testo: c'è proprio un pulsante "Text" in alto. Sono essenzialmente dei commenti con formattazione, per argomentare. Per rimettere codice, c'è il pulsante "Code".

![[Pasted image 20260320122213.png]]
