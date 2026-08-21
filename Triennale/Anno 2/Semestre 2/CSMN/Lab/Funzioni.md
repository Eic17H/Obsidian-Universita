---
cssclasses: csmn
---
Ci sono tre metodi per definire delle funzioni.

Una funzione può essere definita in un file `.m`. Nell'intestazione, si specificano le variabili di cui viene restituito il valore, il nome della funzione e i parametri. La funzione termina con `end`. Per esempio:
```MatLab
function [y] = reciproco(x)
	y = 1/x;
end
```
Questa funzione assegna ad `y` il valore di `1/x` e poi lo restituisce.

Alcuni parametri possono essere opzionali. Possiamo controllare il numero di parametri passati con `nargin`, e assegnare valori ai parametri non passati. Per esempio:
```MatLab
function [x, k] = gauss_seidel(A, b, x0, tau, kmax)
    % Parametri opzionali
    if nargin < 3 || isempty(x0)
        x0 = zeros(size(b));
    end
    if nargin < 4 || isempty(tau)
        tau = 1e-6;
    end
    if nargin < 5 || isempty(kmax)
        kmax = 1000;
    end
	...
end
```

Si possono anche dichiarare dei puntatori a funzione, con `@`. Questo permette di creare alias, per esempio `recip = @reciproco`, ma un utilizzo più utile di `@` è la dichiarazione di funzioni anonime, che non richiedono la creazione di ulteriori file. La seguente funzione è equivalente a `reciproco()`:
```MatLab
rec = @(x) 1/x;
```

I puntatori a funzione possono essere passati ad altre funzioni come parametri.