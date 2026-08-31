---
cssclasses:
  - lip
---
## `main.ml`

Per la short circuit, abbiamo fatto sì che bastasse che il primo operando fosse valutato:
```OCaml ins={3,4,6,7}
let rec step_expr (e,st) = match e with
  ...
  | And(e1,_) when is_val e1 && bool_of_expr e1 == false->
     (BoolConst false, st)
  ...
  | Or(e1,_) when is_val e1 && bool_of_expr e1 == true->
     (BoolConst true, st)
  ...
```