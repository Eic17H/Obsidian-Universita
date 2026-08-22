---
cssclasses: alf
---
```ocaml
# let imp(a,b) = (not a)||b;;
val imp : bool * bool -> bool = <fun>
```
Notiamo già un po' di cose:
* `val` - le funzioni sono valori
* `bool*bool` - prodotto cartesiano di bool, quindi una coppia di bool
* `-> bool` - l'output è un bool

Dichiarare le funzioni in questo modo si può fare, ma di solito si fa così:
```ocaml
# let imp a b = (not a)||b;;
val imp : bool -> bool -> bool = <fun>
```
Il tipo è cambiato. Perché ci sono due frecce?
Quello che sta succedendo è che `imp a` è una funzione che viene applicata a `b`.
Quindi `imp` è una funzione che prende in input un `bool` e restituisce... una funzione.
In matematica, possiamo vederlo come $f_a(b)$, dove $a$ è un parametro della funzione.
Quindi `imp` è l'insieme $f$ di funzioni, e `imp a` è la funzione $f_a$.

Una funzione che restituisce una funzione. Le funzioni sono valori.
Questo è il <span class="yellow"><b><i>paradigma funzionale</i></b></span>, trattiamo le funzioni come trattiamo qualunque altro [[Triennale/Anno 2/Semestre 1/ALF/OCaml/Tipi|tipo]] di dato, quindi possono essere assegnate, hanno operazioni definite su questo tipo, e possono essere input e output di funzioni. È <span class="pink">utilissimo</span>. [[Programmazione funzionale|Più informazioni]].

Possiamo anche definirla in un altro modo, col [[Pattern matching|pattern matching]].

A differenza del paradigma procedurale, non ci sono procedure appunto. Una funzione non ha un `{`blocco di codice`}` dove avvengono delle operazioni che portano al calcolo del valore di ritorno, le funzioni sono solo funzioni matematiche.