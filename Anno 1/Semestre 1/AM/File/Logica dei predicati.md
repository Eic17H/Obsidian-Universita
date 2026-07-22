---
cssclasses: am
---
Lo stesso argomento: <span class="alf">[[Anno 2/Semestre 1/ALF/File/Logica dei predicati|ALF]]</span>

Abbiamo visto le proposizioni normali. Aggiungiamo le variabili.

> ==**Proposizione aperta**== o ==**predicato**==: proposizione che contiene una variabile.

Una variabile non può sempre assumere tutti i valori; a seconda del predicato certi valori non hanno senso.

> ==**Dominio**== o ==**contesto**==: l'insieme dei valori che una variabile può assumere in un predicato.

Per esempio, per il predicato $x\text{ è verde}$, il dominio di $x$ è l'insieme degli oggetti fisici. Per un paragone con la programmazione in C, il dominio è il tipo del parametro di una funzione, se il predicato è una funzione.

Due sottoinsiemi complementari del dominio sono l'==*insieme di verità*== e l'==*insieme di falsità*==, che sono i valori che rendono rispettivamente vero e falso il predicato.

Vediamo un esempio. Il dominio sono le terne di numeri, indicate con $(A,B,C)$, e il predicato è $A<4\land(C=3\lor B>0)$. Questi tre numeri possono essere uguali o diversi. $(A,B,C)=(2,3,2)$ rende il predicato vero, mentre $(A,B,C)=(2,5,2)$ lo rende falso.

## Quantificatori

I quantificatori sono l'aspetto principale della logica dei predicati. Ne vediamo tre:

* $\forall$, quantificatore universale: "per ogni", dipende dall'insieme considerato;
* $\exists$, quantificatore esistenziale: "esiste almeno uno"
* $\exists!$: "esiste uno e uno solo"

Se un predicato contiene $\exists!$ ed è vero, continua ad essere vero se lo sostituiamo con $\exists$.

Facciamo un esempio. Il nostro dominio è l'insieme di tutti i poligoni, e il predicato è $p(x)=x\text{ è un triangolo}$. Allora $p(x)\forall x$ è falsa (non tutti i poligoni sono triangoli), $\exists x\ |\ p(x)$ è vera (esiste almeno un poligono che è anche un triangolo), e $\exists!x\ |\ p(x)$ è falsa (o vera, a seconda di come interpreti "poligono").

Questa sbarra verticale, $|$, si legge "tale che".

Il linguaggio naturale presenta <span class="logica">[[Ambiguo, vago, relativo|ambiguità]]</span>: con "un", certe volte intendiamo $\exists$, e altre volte intendiamo $\exists!$.

## Quantificatori e connettivi

$\lnot[\forall x, p(x)]$ equivale a $\exists x,\lnot p(x)$

Al contrario, $\forall x, p(x)$ equivale a $\lnot[\exists x,\lnot p(x)]$. Se $p$ vale per tutti gli $x$ allora non esiste un $x$ per cui non valga $p$.

Però non c'è un quantificatore che equivale a $\lnot\exists!$.