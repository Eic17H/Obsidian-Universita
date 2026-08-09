---
cssclasses: csmn
---
## Costrutti di scelta

Un'opzione per il branching è il costrutto `switch()`/`case`. Per il ramo da eseguire se il valore non corrisponde a nessuno dei casi si usa `otherwise`. Per terminare questo blocco, così come qualunque altro blocco, si usa `end`. Si possono ammassare più casi: `case {"c", "d"}`. Ripetere un caso, anche parzialmente, è un errore di sintassi, o un warning, a seconda della versione.

```MatLab
switch(x)
    case 1
        disp("Caso semplice")
    case {2, 3}
        disp("Caso ammassato")
    otherwise
        disp("Default")
end
```

Altrimenti, si usano `if()` ed `else()`. Il seguente codice è equivalente a quello sopra:

```Matlab
if(x==1)
    disp("Caso semplice")
elseif(x==2 | x==3)
    disp("Caso ammassato")
else
    disp("Default")
end
```
## Costrutti iterativi

`for` opera su una variabile indice, di cui si deve specificare l'intervallo in cui itererà. `while` invece controlla semplicemente che una condizione sia vera.

```MatLab
for i=1:10
	disp(i)
end
```

```MatLab
i=1
while i<=10
	disp(i)
	i=i-1
end
```