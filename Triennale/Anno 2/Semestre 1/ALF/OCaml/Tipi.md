---
cssclasses: alf
---
Per cominciare, inseriamo espressioni da valutare. `#` è l'utente, `- :` è il computer.
```ocaml
# 2+2;;
- : int = 4
# true;;
- : bool = true
```
Capisce da solo il tipo, evita che tu faccia errori.
Python se gli dai `2+true` te lo valida a `3`, OCaml ti avverte.
`int` e `float` sono tipi diversi, e hanno operatori diversi:
```ocaml
# 2.1 + 2.2;;
Error: This expression has type float but an expression was expected of type int
# 2.1 +. 2.2;;
- : float = 4.30000000000000071
```
`int` e `float` non possono essere usati insieme, però per esempio `1.0` si può abbreviare a `1.`.
```ocaml
# 1 + 2.3;;
Error: This expression has type float but an expression was expected of type int
# 1 +. 2.3;;
Error: This expression has type int but an expression was expected of type float
  Hint: Did you mean `1.'?
# 1. +. 2.3;;
- : float = 3.3
```
