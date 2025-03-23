Questo linguaggio è sia interpretato che compilato. Lo useremo come linguaggio interpretato. Si può usare anche con un ambiente di sviluppo online: [try.ocamlpro.com](https://try.ocamlpro.com).

## Tipi

Per cominciare, inseriamo espressioni da valutare. `#` è l'utente, `- :` è il computer.
```
# 2+2;;
- : int = 4
# true;;
- : bool = true
```
Capisce da solo il tipo, evita che tu faccia errori.
Python se gli dai `2+true` te lo valida a `3`, OCaml ti avverte.
`int` e `float` sono tipi diversi, e hanno operatori diversi:
```
# 2.1 + 2.2;;
Error: This expression has type float but an expression was expected of type int
# 2.1 +. 2.2;;
- : float = 4.30000000000000071
```
`int` e `float` non possono essere usati insieme, però per esempio `1.0` si può abbreviare a `1.`.
```
# 1 + 2.3;;
Error: This expression has type float but an expression was expected of type int
# 1 +. 2.3;;
Error: This expression has type int but an expression was expected of type float
  Hint: Did you mean `1.'?
# 1. +. 2.3;;
- : float = 3.3
```

## Funzioni
```
# let imp(a,b) = (not a)||b;;
val imp : bool * bool -> bool = <fun>
```
Notiamo già un po' di cose:
* `val` - le funzioni sono valori
* `bool*bool` - prodotto cartesiano di bool, quindi una coppia di bool
* `-> bool` - l'output è un bool

Dichiarare le funzioni in questo modo si può fare, ma di solito si fa così:
```
# let imp a b = (not a)||b;;
val imp : bool -> bool -> bool = <fun>
```
Il tipo è cambiato. Perché ci sono due frecce?
Quello che sta succedendo è che `imp a` è una funzione che viene applicata a `b`.
Quindi `imp` è una funzione che prende in input un `bool` e restituisce... una funzione.
In matematica, possiamo vederlo come $f_a(b)$, dove $a$ è un parametro della funzione.
Quindi `imp` è l'insieme $f$ di funzioni, e `imp a` è la funzione $f_a$.

Una funzione che restituisce una funzione. Le funzioni sono valori.
Questo è il <span class="yellow"><b><i>paradigma funzionale</i></b></span>, trattiamo le funzioni come trattiamo qualunque altro tipo di dato, quindi possono essere assegnate, hanno operazioni definite su questo tipo, e possono essere input e output di funzioni. È <span class="pink">utilissimo</span>.

A differenza del paradigma procedurale, non ci sono procedure appunto. Una funzione non ha un `{`blocco di codice`}` dove avvengono delle operazioni che portano al calcolo del valore di ritorno, le funzioni sono solo funzioni matematiche.

## if then else

In OCaml appunto non ci sono procedure. Questo `if A then B else C`, in cui tutte e tre le componenti sono obbligatorie, corrisponde al `? :` del C. L'espressione viene sostituita da `B` se `A` è vero, da `C` se è falso.

## Pattern matching

Questo è un po' strano.
```
# let imp a b = match (a,b) with
| (false, false) -> true
| (false, true) -> true
| (true, false) -> false
| (true, true) -> true;;
```
Può sembrare strano ma è in realtà una sorta di `switch/case` del C.

È anche possibile usare una wildcard. Equivale al `default` del C.
```
# let imp a b = match (a,b) with
| (true, false) -> false
| _ -> true;;
```-