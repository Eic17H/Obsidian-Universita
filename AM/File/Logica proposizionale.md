---
cssclasses: am
---
Lo stesso argomento: <span class="alf">[[Logica proposizionale classica|ALF]]</span>, <span class="logica">[[Enunciati|Logica]]</span>

## Cos'è la logica

La logica è l'unione della matematica, della filosofia e dell'informatica, è la scienza del corretto ragionamento. Nasce come parte della filosofia perché un tempo filosofia e scienza non erano distinte; invece, la filosofia includeva le scienze naturali, la fisica e la chimica.

Nella logica, partiamo dal vero e ne concludiamo il vero: propaghiamo la verità. Se concludiamo il falso, le basi sono false o il ragionamento è fallace. Vedremo tre metodi dimostrativi.

Trasformare il linguaggio umano in un linguaggio simbolico.

Il primo logico fu Aristotele, nel 300 a.C., e tanto importante quanto lui fu Boole, del 1800 d.C., i cui studi sono stati ricondotti ai computer da Shannon.

## Proposizioni: concetto

Le proposizioni, o enunciati, sono un concetto fondamentale per la logica. Una proposizione è qualcosa con un significato che può essere vera o falsa; se non può essere vera o falsa non è un enunciato.

"La luna è lontana" è soggettivo, non è strettamente né vera né falsa. "Il cane di Marco è nero" non è una proposizione perché "il cane" e "Marco" sono indefiniti, e lo stesso vale per "$x>4$".

Prendiamo questo concetto di vero e falso e applichiamolo ai computer, considerando tre componenti: elettronico, ottico, magnetico. Possiamo quindi chiederci: Passa corrente? Riflette la luce? È magnetizzato? Sono tre domande *decidibili*.

Principi della logica:
* Identità: $p=p$;
* Non contraddizione: un dato $p$ non può essere sia vero che falso, $\lnot(p\land\lnot p)$;
* Terzo escluso: esistono solo vero e falso, nessun altro valore di verità esiste.

Ci sono due tipi di enunciati:
* Semplici: verificabili immediatamente;
* Composti: fatti di enunciati semplici connessi tra loro da connettivi.

Una strategia per capire se un enunciato composto è vero o falso in tempo finito è detta algoritmo.

Vediamo due tipi di connettivi, sia per quanto riguarda le proposizioni che i numeri:
* Unari: fattoriale, valore assoluto, identità, negazione;
* Binari: addizione, sottrazione, 16 diversi connettivi binari.

L'identità è un connettivo che, preso un valore vero o falso, restituisce lo stesso valore. Dei 16 connettivi binari logici, non tutti sono utili o hanno nomi.

## Formalità

Vediamo una definizione vera e propria.

> ==**Proposizioni**==: espressioni linguistiche con significato, i linguaggio naturale, che possono essere vere o false.

Vero e falso sono detti ==*valori di verità*==.

In analisi matematica usiamo la notazione simbolica.

### Connettivi

Gli operatori logici sono detti ==*connettivi*==. Creano una nuova proposizione a partire da una (unari) o due (binari) altre proposizioni.

Quanti connettivi binari ci sono? Dati due valori di verità in input, e uno in output, ce ne possono essere 16, però non sono tutti utili. Vediamone alcuni.

* ==Congiunzione==: Il simbolo è $\land$, letto "e", "et" o "and". $p\land q$ è vera se sono vere sia $p$ che $q$. In logica naturale ci preoccupiamo anche della semantica, ma qui no.
* ==Disgiunzione non esclusiva==: $\lor$, letto "o", "vel" o "or". $p \lor q$ è vera se è vera $p$, o $q$, o entrambe.
* ==Disgiunzione esclusiva==: $\oplus$, e $p \oplus q$ si legge "o p o q", "aut p aut q", o "p xor q". Vera se è vera una delle due ma non entrambe.
* ==Implicazione semplice== o materiale: $p \rightarrow q$, "se p allora q" o "p implica q". Non indica una conseguenza di causa-effetto, semplicemente è vera se $p$ è falsa, o se $q$ è vera, o entrambe le cose insieme. $p$ è l'antecedente e $q$ è il conseguente, e $p$ è detta *condizione sufficiente* di $q$.
* ==Implicazione inversa==: $p \leftarrow q$, "p solo se q", equivalente a $q \rightarrow p$. $p$ è detta *condizione necessaria* di $q$.
* ==Implicazione doppia==: $p \leftrightarrow q$, "p se e solo se q", vera se sono entrambe vere o entrambe false. $p$ è *condizione necessaria e sufficiente* di $q$. Qualcosa è un triangolo *se e solo se* ha tre lati.

Rappresentando due numeri in binario, e trattando ciascun bit come proposizione, è possibile calcolare la loro somma con solo ==and== e ==xor==.