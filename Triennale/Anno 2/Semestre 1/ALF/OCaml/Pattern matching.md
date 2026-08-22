---
cssclasses: alf
---
Questo è un po' strano.
```ocaml
# let imp a b = match (a,b) with
| (false, false) -> true
| (false, true) -> true
| (true, false) -> false
| (true, true) -> true;;
```
Può sembrare strano ma è in realtà una sorta di `switch/case` del C.

È anche possibile usare una wildcard. Equivale al `default` del C.
```ocaml
# let imp a b = match (a,b) with
| (true, false) -> false
| _ -> true;;
```

Questa `imp` che dichiariamo è una [[Triennale/Anno 2/Semestre 1/ALF/OCaml/Funzioni|funzione]].