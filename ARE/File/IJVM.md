---
cssclasses:
- are
---
# Istruzioni

## Blocchi

```IJVM
.constant
	OBJREF 0x40
	endline 0x3b
.end-constant
```

Fuori dal main e dalle altre subroutine. Dichiara costanti globali.

`OBJREF` serve per chiamare le subroutine.

`endline` serve per la funzione `print()` che ci dà Reforgiato. Non la usiamo noi, solo la funzione.


```IJVM
.var			.main			.method nome(param, param)
.end-var		.end-main		.end-method
```

`var` dichiara le variabili di una sola subroutine, e si mette dentro la subroutine.

`main` è il main.

`method` dichiara una subroutine, con parametri separati da una virgola.

Quando invochi una subroutine, non la scrivi con parentesi e virgole, è strano, vedi più avanti.

## Stack

IJVM opera sullo stack. Puoi mettere qualcosa in cima allo stack, e usare il valore che c’è in cima allo stack. Le variabili non sono nello stack, sono a parte.

```
BIPUSH numero			ILOAD variable			ISTORE variable
```

`BIPUSH` mette un numero sullo stack.

`ILOAD` copia il valore di una variabile e lo mette sullo stack.

`ISTORE` vede il valore in cima allo stack, lo toglie dallo stack, e lo mette in una variabile.

## Subroutine

```IJVM
LDC_W OBJREF
...
INVOKEVIRTUAL subroutine
```
  
Al posto dei puntini, metti delle istruzioni che mettono dei valori sullo stack. Quando arrivi a `INVOKEVIRTUAL`, i valori che ci sono sullo stack saranno i parametri della subroutine. Prende solo i valori che hai inserito dopo `LDC_OBJREF`.

Finita la subroutine, il valore returnato, se c’è, verrà messo sullo stack.

Per esempio:

```IJVM
LDC_W OBJREF
        BIPUSH 3
        BIPUSH 4
    INVOKEVIRTUAL mul
ISTORE a
```

La variabile `a` conterrà il valore 12.

L’indentazione è completamente opzionale.

## Aritmetica

```IJVM
IADD			ISUB			SWAP
```

Queste istruzioni operano sui due valori in cima allo stack.

`IADD` fa l’addizione, toglie i due valori dallo stack, e mette il risultato sullo stack.

`ISUB` stessa cosa ma sottrazione. `BIPUSH 8 BIPUSH 7 ISUB` mette sullo stack `1`.

`SWAP` li scambia.

Stai attento all’ordine quando concateni tanti `IADD` e `ISUB`.

Consiglio di operare solo su due numeri alla volta per sicurezza se hai dubbi.

```
IINC variabile valore
```

`IINC` incrementa una variabile di un certo valore.

Non interagisce con lo stack in alcun modo, opera direttamente sulla variabile.

Funziona anche coi numeri negativi.
## Salto

```IJVM
IFLT etichetta			IFEQ etichetta			GOTO etichetta
```

I due `IF` leggono il valore in cima allo stack e lo tolgono.

`IFLT` teletrasporta il cursore all’etichetta se il valore è meno di `0` (Less Than 0)

`IFEQ` uguale, ma se è uguale (EQual) a `0`.

`GOTO` lo fa punto e basta. Non interagisce proprio sullo stack.

```IJVM
etichetta:
```

Un’etichetta si dichiara così. Il cursore può passarci attraverso e non ci interagisce. L’unica cosa che fanno le etichette è essere la destinazione di un teletrasporto.

# Equivalenti di cose che già conosci

  

## `if`

### Uguaglianza

```C
if(x==3){
    a++
}else{
    b++
}
```

Risolvi l’equazione: ti serve $...=0$

$$\begin{matrix}
x&=&3\\
x&=&0-(-3)\\
x + (-3) &=& 0\\
x-3&=&0
\end{matrix}$$
```IJVM
ILOAD x
    BIPUSH 3
ISUB
IFEQ vero
GOTO falso
  
vero:
    IINC a 1
GOTO fine
  
falso:
    IINC b 1
fine:
```

### Disuguaglianza
  
```C
if(x>3){
    a++
}else{
    b++
}
```

Risolvi l’equazione: ti serve $...<0$

$$\begin{matrix}
x&>&3\\
0 + (+x) &>& 3\\
0 &>& 3 + (-x)\\
0 &>& 3-x\\
3-x &<& 0
\end{matrix}$$
```IJVM
BIPUSH 3
    ILOAD x
ISUB
IFLT vero
GOTO falso
  
vero:
    IINC a 1
GOTO fine
  
falso:
    IINC b 1
fine:
```
  

Senza quel `GOTO fine`, dopo il ramo vero eseguirebbe direttamente anche il ramo falso.

Se va al ramo vero, non raggiungerà mai `GOTO falso`

## `while`

```C
while(i<5){
	i++
}
```

Risolvi l'equazione:$$\begin{matrix}
i &<& 5\\
i-5 &<& 0\\
\end{matrix}$$
```IJVM
condizione:
    BIPUSH 5
    ILOAD i
ISUB
IFLT vero
GOTO falso
  
vero:
    IINC i 1
GOTO condizione
  
falso:
```


Il while non ha un equivalente di `else`, quindi il ramo falso è vuoto.

E in effetti, se la condizione è falsa, salta il loop e va avanti.

Invece se fa il loop, deve tornare indietro per ricontrollare la condizione, e infatti è un loop.

# Altro

IJVM non ha moltiplicazione, divisione, modulo, input, stampa e altre cose utili.

Reforgiato ci dà delle subroutine che possiamo (dobbiamo) usare.

Non c’è bisogno di capirle.

Il file con le subroutine contiene anche le costanti che ci servono.

È come il file base dei parziali di PR1 e delle esercitazioni di ASD in laboratorio.

# Curiosità

La funzione `div()` è ricorsiva.

IJVM non ha istruzioni di bitshift. È per questo che `div()` deve essere ricorsiva.

Anche `mod()` è ricorsiva.

Per qualche motivo anche `mul()` è ricorsiva.

`input()` non è ricorsiva ma contiene una chiamata a `mul()`.

`print()` non è ricorsiva, ma invoca `print_digits()` che è ricorsiva. Boh.

# Consigli

Attento a non scrivere `INVOKEVIRTUAL OBJREF`. Non ti dirà che l’errore è quello.

Attento all’ordine quando fai `ISUB`.

Si chiama `IRETURN`, non `RETURN`. Comincia con la `I`. Quella di "informatica".

Le istruzioni possono essere anche in minuscolo.

L’indentazione è opzionale ma utile.

I commenti si scrivono con `//`.

Visual Studio Code ha un’estensione che ti colora le parole chiave dell’IJVM.