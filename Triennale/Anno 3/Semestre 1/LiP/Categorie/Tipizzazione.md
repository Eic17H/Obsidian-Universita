---
cssclasses: lip
---
Nel foglio delle regole ci sono due insiemi di regole di inferenza. Il primo è comprensibile con un po' di pratica. Il secondo sembra completamente inutile provare a capirlo, quindi lo ignorerò. Speriamo bene. [[Tipizzazione orrenda|Parliamo di questo]].

Vedo che c'è anche un'altra variante che assume che stiamo lavorando in <span class="alf">[[Triennale/Anno 2/Semestre 1/ALF/OCaml/Funzioni|OCaml]]</span> o "in un linguaggio OCaml-like", quindi non vengono fornite regole di tipizzazione e semplicemente bisogna scrivere un termine con un determinato tipo. Non avendo molte risorse su questo argomento non lo separerò in due documenti.
## Teoria

* [[Triennale/Anno 3/Semestre 1/LiP/Appunti dal libro/Tipi|Tipi]]

## Esercizi con le regole

### Esempio di Giugno 2026

#### Regole

Per ora incollo l'immagine, non so quanto sia sensato scriverle tutte.

![[Pasted image 20260823105620.png]]

#### Termine da tipare

Considerate il tipo$$int * (int \to bool) \to bool$$Un termine nel linguaggio che ha questo tipo potrebbe essere$$\lnot apply(snd(x),fst(x)+1)$$

#### Svolgimento

$$
\dfrac{
\dfrac{
{\dfrac{\Gamma \vdash x : \tau_1 * int \to bool}{\Gamma \vdash snd(x):int \to bool} \qquad \dfrac{\dfrac{\Gamma \vdash x:int*\tau_2}{\Gamma \vdash fst(x):int}}{\Gamma \vdash fst(x)+1:int}}
}
{\Gamma \vdash apply(snd(x),fst(x)+1):bool}
}
{\Gamma \vdash \lnot apply(snd(x),fst(x)+1):bool}
$$
Quindi $\tau_1$ è $int$ e $\tau_2$ è $int \to bool$, cioè $\Gamma \vdash x : int * int \to bool$, cioè $x$ è una coppia il cui primo elemento è un inter e il secondo è una funzione che prende un intero e restituisce un booleano.

## Esercizi OCaml-like

### 11 Luglio 2025

```
int -> (bool * int -> bool) * int -> (int -> bool) * int
```

Questo significa, in termini poco tecnici, che è una funzione che:
* Prende in input un `int`;
* Prende in input un `((bool * int) -> bool) * int`;
* Restituisce un `(int -> bool) * int`;

Sarà della forma `let f a b = (..., ...)`, dove:
* `a` deve essere un `int`, quindi lo coinvolgiamo in qualcosa come `a+1`;
* `b` deve essere una coppia, il cui primo elemento è una funzione che prende in input una coppia:
	* essendo una coppia possiamo applicare `fst b` e `snd b`:
		* `snd b` deve essere un `int`, quindi facciamo `snd b + 1` da qualche parte;
		* `fst b` deve deve essere applicato a un `bool * int` e restituire un `bool`:
			* visto che deve restituire un `bool`, facciamo `not (fst b ...)`;
			* chiamiamo il suo parametro `c`, visto che deve essere una coppia di `bool` e `int` facciamo `(fst c) || ((snd c) + 1 > 0)`;

Per il valore di "ritorno":
* è una coppia con un `int` come secondo elemento, mettiamo `a+1` come secondo elemento;
* al primo elemento vogliamo un `int -> bool`, onestamente farei `(>) 3`, perché `(>)` è `int -> int -> bool`;

In realtà con `b` ho sbagliato, o almeno il ragionamento è incompleto:
* non credo si possa esplicitare questo ipotetico `c`, quindi prendo quel `fst b`, che deve essere di tipo `bool * int -> bool`, lo applico a un `bool * int` sotto forma di `(fst b) (true, 1)` e poi tratto il risultato come `bool`, `not ((fst b) (true, 1))`.

Non credo che questo sia un buon metodo, ma mettiamo tutto insieme:

```OCaml
let f a b = ((if not ((fst b) (true, 1)) then (>) 0 else (<) 0), a + (snd b) + 1);;
```

Ed effettivamente mi dice:

```
val f : int -> (bool * int -> bool) * int -> (int -> bool) * int = <fun>
```

Cos'abbiamo imparato?

* Se un certo `t` deve essere una coppia di tipo `a' * b'`, metti da qualche parte `fst t` e `snd b` e usali nel modo appropriato per i tipi `a'` e `b'`;
* Se un certo `t` deve essere una funzione di tipo `a' -> b'`, metti da qualche parte qualcosa del tipo `B (t A)`, dove `A` è un letterale di tipo `a'`, e `B` prende in input un `b'`;
* Dei letterali esempio sono:
	* `true` per il tipo `bool`;
	* `0` per il tipo `int`;
	* `0.` per il tipo `float`;
	* `(+)` per il tipo `int -> int -> int`;
	* `(>)` per il tipo `int -> int -> bool`;
	* `(+) 0` per il tipo `int -> int`;
	* `(>) 0` per il tipo `int -> bool`;

### 15 Giugno 2025

```
int * (int -> bool) -> int * int -> (int -> bool) * bool
```

Di nuovo due parametri, `f a b`:
* `a` è di tipo `int * (int -> bool)`:
	* `fst a + 0`;
	* `not (snd a 0)`;
* `b` è di tipo `int * int`:
	* `fst b + snd b + 0`;
* Il risultato è di tipo `(int -> bool) * bool`:
	* `((>) 0, true)`;

Mettiamo tutto insieme:

```OCaml
let f a b = ((if not (snd a 0) then (>) (fst a + 0) else (>) (fst b + snd b + 0)), true);;
```

Quello era il mio primo tentativo. Sarebbe stato più conciso:

```OCaml
let f a b = ((>) (fst a + fst b + snd b), not (snd a 0));;
```

Questo semplicemente perché metto tutti gli `int` insieme in una somma, uso quello stesso `int` col `(>)`, e visto che mi serve un `bool` uso `not (snd a 0)`.