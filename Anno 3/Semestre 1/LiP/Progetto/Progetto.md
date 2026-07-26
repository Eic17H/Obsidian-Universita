---
cssclasses: lip
---
## `main.ml`

Funzione per il massimo comun divisore, necessaria per ridurre le frazioni ai minimi termini:
```OCaml
let rec gcd a b = if b = 0 then a else gcd b (a mod b);;
```

Per la short circuit, abbiamo fatto sì che bastasse che il primo operando fosse valutato:
```OCaml ins={3,4,6,7}
let rec step_expr (e,st) = match e with
  ...
  | And(e1,_) when is_val e1 && bool_of_expr e1 == false->
     (BoolConst false, st)
  ...
  |Or(e1,_) when is_val e1 && bool_of_expr e1 == true->
     (BoolConst true, st)
  ...
```

Non valutiamo le divisioni, tenendole come frazioni, fino alla fine, così nei passaggi intermedi se ci sono moltiplicazioni si possono ridurre anziché troncare:
```OCaml
let rec step_expr (e,st) = match e with
  ...
  (* Riduzione ai minimi termini *)
  | Mul(IntVal n1, Div(IntVal n, IntVal d))
  | Mul(Div(IntVal n, IntVal d), IntVal n1) ->
      let g = gcd (n1 * n) d in
      let n' = (n1 * n) / g  and d' = d / g in
      if d' = 1 then (IntVal n', st)
      else (Div(IntVal n', IntVal d'), st)

  (* Stessa cosa ma con le costanti *)
  |Mul(IntVal n1, Div(IntConst n, IntConst d))
  | Mul(Div(IntConst n, IntConst d), IntVal n1) ->
    let g = gcd (n1 * n) d in
    let n' = (n1 * n) / g  and d' = d / g in
    if d' = 1 then (IntVal n', st)
    else (Div(IntVal n', IntVal d'), st)
  (* Stessa cosa *)
  | Mul(IntConst n1, Div(IntConst n, IntConst d))
  | Mul(Div(IntConst n, IntConst d), IntConst n1) ->
      let g = gcd (n1 * n) d in
      let n' = (n1 * n) / g  and d' = d / g in
      if d' = 1 then (IntConst n', st)
      else (Div(IntConst n', IntConst d'), st)
  ...
  (* Quando rimane solo la divisione, si valuta *)
  | Div(e1,e2) when is_val e1 && is_val e2 -> (match e1,e2 with
    | (IntConst n1, IntConst n2) -> (IntConst (n1/n2), st)
    | (IntConst n1, UintVal n2) when n1>=0 -> (UintVal (n1/n2), st)
    | (UintVal n1, IntConst n2) when n2>=0 -> (UintVal (n1/n2), st)
    | (IntConst n1, IntVal n2) -> (IntVal (n1/n2), st)
    | (IntVal n1, IntConst n2) -> (IntVal (n1/n2), st)
    | (UintVal n1, UintVal n2) -> (UintVal (n1/n2), st)
    | (IntVal n1, IntVal n2) -> (IntVal (n1/n2), st)
    | _ -> raise (TypeError "Div: type mismatch between the operands"))
  | Div(e1,e2) when is_val e1 ->
    let (e2', st') = step_expr (e2, st) in (Div(e1,e2'), st')
  | Div(e1,e2) -> 
    let (e1', st') = step_expr (e1, st) in (Div(e1',e2), st')
  ...
```

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

Prova a ridurre un'espressione a una frazione (numeratore, denominatore).
```OCaml
let rec eval_const = function
  | IntConst n -> Some (n, 1)
  | Mul(e1, e2) -> 
      (match eval_const e1, eval_const e2 with
       | Some (n1, d1), Some (n2, d2) -> Some (n1 * n2, d1 * d2)
       | _ -> None)
  | Div(e1, e2) ->
      (match eval_const e1, eval_const e2 with
       | Some (n1, d1), Some (n2, d2) when n2 <> 0 -> Some (n1 * d2, d1 * n2)
       | _ -> None)
  | Add(e1, e2) ->
      (match eval_const e1, eval_const e2 with
       | Some (n1, d1), Some (n2, d2) -> Some (n1 * d2 + n2 * d1, d1 * d2)
       | _ -> None)
  | Sub(e1, e2) ->
      (match eval_const e1, eval_const e2 with
       | Some (n1, d1), Some (n2, d2) -> Some (n1 * d2 - n2 * d1, d1 * d2)
       | _ -> None)
  | _ -> None
```

Supporto per le frazioni nelle moltiplicazioni e nelle divisioni:
```OCaml
let rec typecheck_expr (f : ide) (edl : enum_decl list) vdl = function
  ...
  | Mul(e1, e2) ->
      (match eval_const (Mul(e1, e2)) with
       | Some (n, d) -> 
           (* Se è una costante, riduciamo. Il controllo del resto n mod d 
              lo facciamo nell'Assign*)
           Ok (IntConstET (n / d))
       | None -> 
           (* Logica standard per variabili o espressioni non costanti *)
           (match (typecheck_expr f edl vdl e1, typecheck_expr f edl vdl e2) with
            | Ok(t1), Ok(t2) when subtype t1 UintET && subtype t2 UintET -> Ok(UintET)
            | Ok(t1), Ok(t2) when subtype t1 IntET && subtype t2 IntET -> Ok(IntET)
            | Ok(t1), _ when not (subtype t1 IntET) -> Error [TypeError (f, e1, t1, IntET)]
            | _, Ok(t2) -> Error [TypeError (f, e2, t2, IntET)]
            | err1, err2 -> err1 >>+ err2))

(*RIPRENDO DA QUI:*)
  | Div(e1, e2) ->
      (match eval_const (Div(e1, e2)) with
       | Some (n, d) -> 
           if d = 0 then 
             Error [TypeError(f, e2, IntConstET 0, IntET)]
           else if n mod d <> 0 then 
             Error [TypeError(f, Div(e1,e2), IntConstET (n/d), IntET)]
           else 
             Ok (IntConstET (n / d))
       | None -> 
           (* Logica per variabili *)
           (match (typecheck_expr f edl vdl e1, typecheck_expr f edl vdl e2) with
            | Ok(_), Ok(IntConstET 0) -> Error [TypeError(f, e2, IntConstET 0, IntET)]
            | Ok(t1), Ok(t2) when subtype t1 UintET && subtype t2 UintET -> Ok(UintET)
            | Ok(t1), Ok(t2) when subtype t1 IntET && subtype t2 IntET -> Ok(IntET)
            | Ok(t1), _ when not (subtype t1 IntET) -> Error [TypeError (f, e1, t1, IntET)]
            | _, Ok(t2) -> Error [TypeError (f, e2, t2, IntET)]
            | err1, err2 -> err1 >>+ err2))
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