---
cssclasses:
  - lip
---
## `typechecker.ml`

Per implementare l'utilizzo delle costanti:
```OCaml
exception ConstantError of ide * ide
...
let string_of_typecheck_error = function
  ...
  | ConstantError (f,x) -> logfun f "variable " ^ x ^ " was declared as constant, but is used as mutable"
  ...
```

Sempre per le costanti:
```OCaml
let is_constant (x : ide) (vdl : var_decl list) = 
  List.fold_left (fun acc (vd : var_decl) -> acc || (vd.name=x && vd.mutability==Constant)) false vdl

(* Se è costante e non è stata inizializzata dà errore *)
(* Il fold left si usa per scorrere la lista di variabili e cercare quella con quel nome *)
let check_constants_init vdl =
  List.fold_left (fun acc vd ->
    if vd.mutability = Constant && vd.init_value = None then
      acc >> Error [ConstantError ("declaration", vd.name)]
    else acc
  ) (Ok ()) vdl
```

E sempre per le costanti:
```OCaml
let rec typecheck_cmd (f : ide) (edl : enum_decl list) (vdl : all_var_decls) = function 
    | Skip -> Ok ()

   | Assign(x,e) -> 
    if is_constant x (get_state_var_decls vdl) then Error [ConstantError (f,x)]
      else if f <> "constructor" && is_immutable x (get_state_var_decls vdl) then Error [ImmutabilityError (f,x)]
    else (
      match eval_const e, typecheck_expr f edl vdl (Var x) with
      (* Caso 1: L'espressione è una costante e la variabile x esiste *)
      | Some(n, d), Ok(tx) -> 
          if n mod d <> 0 then 
            Error [TypeError (f, e, IntET, tx)] 
          else if subtype (IntConstET (n/d)) tx then Ok() 
          else Error [TypeError (f, e, IntConstET (n/d), tx)]

      (* Caso 2: la prima espressione è una costante ma la variabile x non è dichiarata, 
          possibili errori di scoping... *)
      | Some(_), Error errs -> Error errs

      (* Caso 3: eval_const non ha prodotto risultati, procediamo col typecheck standard *)
      | None, _ -> 
          match typecheck_expr f edl vdl e, typecheck_expr f edl vdl (Var x) with
          | Ok(te), Ok(tx) -> if subtype te tx then Ok() else Error [TypeError (f,e,te,tx)]
          | res1, res2 -> typeckeck_result_from_expr_result (res1 >>+ res2)
    )
```

Appunto quella funzione si aggiunge al typechecker:
```OCaml ins={11,12}
let typecheck_contract (Contract(_,edl,vdl,fdl)) : typecheck_result =
  (* no multiply declared enums *)
  typecheck_enums edl 
  >>
  (* no multiply declared state variables *)
  no_dup_var_decls vdl
  >>
  (* no multiply declared functions *)
  no_dup_fun_decls fdl
  >>
  check_constants_init vdl
  >>
  List.fold_left (fun acc fd -> acc >> typecheck_fun edl vdl fd) (Ok ()) fdl  
```