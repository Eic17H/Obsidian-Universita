---
cssclasses: lip
---
Nel foglio delle regole ci sono due insiemi di regole di inferenza. Il primo è comprensibile con un po' di pratica. Il secondo sembra completamente inutile provare a capirlo. Sembra che all'esame bisogni usare il secondo. Questo documento esiste per completezza ma non ti dice nulla.

Questo esercizio ha una [[Tipizzazione OCaml-like|variante]] in cui si assume un linguaggio OCaml-like.
## Teoria

* [[Triennale/Anno 3/Semestre 1/LiP/Appunti dal libro/Tipi|Tipi]]
## Regole 2025/2026

Per ora incollo l'immagine, non so quanto sia sensato scriverle tutte.

![[Pasted image 20260823105620.png]]

![[Pasted image 20260823012008.png]]
### Esempio fornito

Considerate il tipo$$int * (int \to bool) \to bool$$Un termine nel linguaggio che ha questo tipo potrebbe essere$$\lnot apply(snd(x),fst(x)+1)$$
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

### Settembre 2026

Ha dato questo tipo:$$((int \to bool)*int) \to bool$$
Chiaramente è molto simile a quello dell'esempio, quindi l'ho copiato quasi identico senza aver capito l'argomento.