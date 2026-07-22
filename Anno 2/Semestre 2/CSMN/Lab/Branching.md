C'è `switch()`/`case`. Il default è `otherwise`, e alla fine si mette `end`. La variabile può essere di qualunque tipo. Si possono ammassare più casi: `case {"c", "d"}` (non esiste il `break`). Ripetere un case, anche parzialmente, è un errore di sintassi, o un warning, a seconda della versione (sembra).

Costrutti iterativi: `while` e `for`.

```MatLab
for i=1:10
	disp(i)
end
```

```MatLab
i=1
while i<=10
	disp(i)
end
```