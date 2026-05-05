## Condizionali: `if elif else`

Il solito che conosciamo, ma al posto di `else if` c'è `elif`. In C, `else if` termina il primo blocco e ne inizia un altro, invece in Python `elif` continua lo stesso blocco con altre condizioni.

```
if condizione:
	istruzioni
elif condizione2:
	istruzioni2
else:
	istruzioni3
```

## Ciclo: `for in`

Ci permette di iterare su tutti gli elementi di un iterabile (liste, tuple, set, dizionari, etc).

```
for variabile in iterabile:
	istruzioni(variabile)
```

A ogni ciclo, `variabile` si riferirà all'elemento corrente dell'iterabile.

## Ciclo: `while`

Semplicissimo.

```
while condizione:
	istruzioni
```

## Interrompere il ciclo: `break` e `continue`

`break` termina tutti i cicli, `continue` termina il ciclo corrente. Meglio non usarli.