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