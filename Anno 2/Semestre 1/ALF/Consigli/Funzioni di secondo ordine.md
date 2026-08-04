---
cssclasses: alf
---
Questa materia ti chiede di immaginare che le funzioni siano un tipo di valore, come lo possono essere i numeri e le stringhe. E quindi come puoi avere una funzione da numeri a numeri, $f(x)=x^2$, e come puoi avere una funzione da stringhe a stringhe, $f(s)=s::s$, secondo loro puoi avere una funzione da funzioni a funzioni, $f(f)=\ldots$ incomprensibile.

In realtà neanche tanto incomprensibile. Conosci già tanto bene una funzione da funzioni a funzioni.

## Simboli

Prima di arrivarci, un po' di simboli. Non so neanche se sono i simboli corretti ma me li invento io, magari più avanti correggerò.

Simboli per gli insiemi:
$$\begin{matrix*}[l]
x_n & \text{Placeholder per i valori} \\
\mathbb t_n & \text{Placeholder per i tipi} \\
\mathbb N & \text{Numeri naturali} \\
\mathbb R & \text{Numeri reali} \\
\mathbb X & \text{Caratteri} \\
\mathbb S=\mathbb X ^* & \text{Stringhe} \\
\mathbb F & \text{Funzioni} \\
\mathbb F\langle \mathbb t_1 \to \mathbb t_2 \rangle & \text{Funzioni da }\mathbb t_1\text{ a }\mathbb t_2 \\
x \in \mathbb t & \text{Il valore }x\text{ ha tipo }\mathbb t
\end{matrix*}$$
Non entreremo nei dettagli di quell'asterisco, diciamo solo che indica gli array.

Simboli per le funzioni:$$\begin{matrix*}[l]
f:\mathbb t_1 \to \mathbb t_2 & \text{Tipi in input e output di una funzione }f \\
f:x_1 \mapsto x_2 & \text{Valori in input e output di una funzione }f
\end{matrix*}$$
## Informazioni

Allora, immaginiamo che quindi abbiamo:$$f:x\mapsto x^2,\ f \in \mathbb F\langle \mathbb R \rightarrow \mathbb R \rangle$$E abbiamo:
$$g:x\mapsto 2x,\ g \in \mathbb F\langle \mathbb R \rightarrow \mathbb R \rangle$$

Avendo seguito <span class="am">[[Derivate|analisi]]</span>, sappiamo che $f'=g$, cioè che $\dfrac{d}{dx}f(x)=g(x)$.

Guardalo. Guardalo bene. Guardalo attentamente. $f \in \mathbb F$. $g \in \mathbb F$.

Lo scrivo in un altro modo. $$D(f)=g$$Guarda bene bene bene. Ma non è che... Ma non è che forse, forse forse...$$D\in \mathbb F \langle \mathbb F \langle \mathbb R \to \mathbb R \rangle \to \mathbb F \langle \mathbb R \to \mathbb R \rangle \rangle$$Non si capisce niente? Compattiamo.$$D\in \mathbb F \langle \mathbb F \to \mathbb F \rangle$$Cioè nel senso che $$D:\mathbb F \to \mathbb F$$Sì, hai capito bene, la derivata è una funzione che prende in input una funzione e ti restituisce in output una funzione. Non è un concetto così ignoto se ci pensi.

## Esempio implementato in OCaml

Usiamo la definizione di derivata:$$f'(x) = \lim_{h\to 0} \dfrac{f(x+h)-f(x)}{h}$$
```OCaml
let h = 1e-08;;
let d f x = ((f (x+.h)) -. (f x)) /. h;;
let square x = x *. x;;
let double = d square;;
```

Fatto ciò, per esempio, `square 4.;;` restituirà `16.`, mentre `double 4.;;` restituirà `7.99999995138023223`.

Vediamo che `double = d square` corrisponde a $x\mapsto2x = D(x\mapsto x^2)$.

Ah e se non capisci l'OCaml (probabile se stai leggendo questo), ecco una traduzione in pseudo-C:
```C
float h = 0.00000001;
float d(float f(float x)) {
	return ((f(x+h)) - f(x)) / h;
}
float square(float x) {
	return x*x;
}
float double(float x) = d(square);
```

Nota come il tipo di `square` corrisponde al tipo del parametro `f` della funzione `d`: sono entrambi `float(float)`.

Ovviamente questo non è codice C valido.