La LPC studia le proposizioni che possono essere <span class="green">vere</span> o <span class="red">false</span>.

**Frase**: "Joker è un nemico di Batman"
**Frase**: "Joker è un nemico del supereroe la cui identità segreta è Bruce Wayne"
Due frasi diverse che corrispondono alla stessa preposizione, in questo caso <span class="green">vera</span>.

"Professor Bartoletti è Batman", "la congettura di Goldman è vera".
Possono essere <span class="green">vere</span> o <span class="red">false</span>, ma non sappiamo quale siano.
Alcune proposizioni si possono scomporre, altre no: **proposizioni atomiche**. #termine 
Da proposizioni atomiche e connettivi logici puoi creare "molecole logiche".
$∧$, $∨$, $¬$, $→$. $And$, $or$, $not$, $pertanto$.

Il $pertanto$ ti frega. Pertanto, dunque, se-allora.
In questa situazione abbiamo una lavagna nera e un muro bianco.
"Se la lavagna è bianca, allora il muro è bianco".
Quella è <span class="green">vera</span>. Non c'è causalità, è un semplice connettore logico.
"$X → Y$" equivale a "$¬X ∨ Y$".
È semplice <span class="pink">zucchero sintattico</span>.

I babilonesi facevano matematica con algoritmi rudimentali.
Ridurre il ragionamento al puro calcolo tramite la logica.
Aveva cominciato Aristotele, ma l'ha generalizzato Leibniz. E poi arrivò Boole.

Usiamo delle <span class="termine">variabili</span>, o <span class="termine"><i>lettere proposizionali</i></span>. #termine 
Ne abbiamo infinite: $p$, $q$, $r$, $p'$, $q_7$, $r_{r_{r_{r_{r_{r_{r}}}}}}$.
L'insieme delle formule proposizionali è definito dalle seguenti regole:
1) Tutte le <span class="termine">lettere proposizionali</span> sono formule;
2) Se $P$ e $Q$ sono <span class="blue">FP</span>, $(P⋆Q)$ è una <span class="blue">FP</span>, $∀⋆ | ⋆$ è un connettore.

È importante avere un insieme ben definito di connettori. Altrimenti nessuno mi vieterebbe di dire che $(P∧Q)♥☺$ sia una proposizione logica.

Per non dover scrivere troppe parentesi, usiamo la precedenza e l'associatività.
Dove associa $→$? Lasciamo stare, usiamo le parentesi.
$(P∧Q)∧R = P∧(Q∧R)$, ma $(P→Q)→R ≠ P→(Q→R)$.
$P←Q$ non esiste secondo la logica che abbiamo definito.

$P$ e $Q$ sono <span class="termine">variabili</span>, come in matematica.
In matematica, puoi assegnare valori numerici alle variabili.
A $P$ e $Q$ cosa assegnamo? $0$ e $1$, sono *valori di verità*.

#definizione 
Sia $v$ una funzione da lettere proposizionali a $\{0, 1\}$.
Diciamo che $v$ è un'<span class="termine"><i>interpretazione</i></span> se:
* $v(¬A) = 1-v(A)$
* $v(A∧B)=min(v(A),v(B))$
* $v(A∨B)=max(v(A),v(B))$
* $v(A→B)=max(1-v(A),v(B))$

Avrei potuto definirla per casi, ma ho preferito trasformarla in numeri.
Continuiamo questo giochetto.
* $A = ¬((P∨Q)→(P∧Q))$
* $v(P)=1$
* $v(Q)=0$
* $v(A)=1-max(1-max(P,Q),min(P,Q))$
  * $= 1-max(1-max(1,0),min(1,0))$
  * $= 1-max(1-1,0)$
  * $= 1-max(0,0)$
  * $= 1-0$
  * $= 1$

Questo è un conto stupido, ma è bello vedere quanto sia stupido, perché vuol dire che un computer lo fa bene. Queste cose le sappiamo fare, e le sappiamo fare bene, con definizioni rigorose, a macchina.

#definizione 
Una formula $A$ è:
* <span class="termine">soddisfacibile</span> se: esiste un'interpretazione $v$ valida tale che $v(A)=1$
* <span class="termine">insoddisfacibile</span> se: non è soddisfacibile
* <span class="termine">tautologica</span> se: $∀v, v(A)=1$

Per esempio, $P∨¬P$ è una tautologia.
Sembra ovvio, ma è molto importante che sia una tautologia.
Ci sono logiche in cui non ci sono tautologie.
$P∧¬P$ invece è insoddisfacibile.
Queste due infatti sono <span class="pink">zucchero sintattico</span> per definire "<span class="green">vero</span>" e "<span class="red">falso</span>".

$(P∧¬P)→Q$ è un'altra tautologia.
Principio di esplosione.
Ci sono state discussioni tra filosofi.
Dire che falsificare la premessa verifica la deduzione sembra strano.
"*Se la lavagna è nera, professor Bartoletti è Batman.*"
La lavagna è bianca, quindi quella frase è vera.
Sembra sbagliato, ma è stato definito così.