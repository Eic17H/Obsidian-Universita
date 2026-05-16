Introduciamo gli aspetti basilari dei linguaggi di programmazione. Per semplicità, li vediamo prima senza tipi.

Come linguaggio esempio, ne usiamo uno che tratta solo di numeri e booleani. Vediamo i concetti di *sintassi astratta*, *definizioni*, *dimostrazioni induttive*, *valutazione* ed *errori di runtime*.

## Forme sintattiche

Abbiamo le costanti booleane, le espressioni condizionali, le costanti numeriche, gli operatori numerici di successore e predecessore, e un operatore che controlla se l'argomento è uguale a zero.
```
t ::=
	true
	| false
	| if t then t else t
	| 0
	| succ t
	| pred t
	| iszero t
```

Con questa sintassi, stiamo dicendo che un termine, che chiamiamo per esempio `t`, può assumere una delle forme elencate, che possono a loro volta contenere termini. Questo simbolo `t` è detto *metavariabile*: *meta* perché parla *del* linguaggio anziché farne parte, e *variabile* perché è un segnaposto. Quindi quel blocco di codice non è scritto nel nostro linguaggio esempio, ma in un *metalinguaggio*.

Ecco alcuni esempi di "programmi" scritti nel nostro linguaggio, con il loro valore:
* `if true then 0 else succ 0`: `0`;
* `if false then 0 else succ 0`: `succ 0`;
* `if iszero 0 then 0 else succ 0`: `0`;
* `if iszero succ 0 then 0 else succ 0`: `succ 0`;
* `iszero pred succ 0`: `true`.

Sarebbe un minimo più leggibile se avessimo definito anche delle parentesi. Notiamo che la descrizione in metalinguaggio non ci dà regole per arrivare dalle espressioni al loro valore, ci dice solo che sono espressioni valide. Da ora in poi, anziché scrivere cose come `succ succ succ 0`, scriveremo cose come $3$: questo non fa parte del nostro linguaggio, è solo una convenzione che useremo per descriverlo.

Ho detto che ci dice che sono espressioni valide. Questo metalinguaggio accetta cose come `succ true` e `if 0 then 0 else 0`, che non hanno senso. Certo, sono valide perché le accetta, e le accetta perché sono valide, per definizione, ma non è detto che questa nozione di validità sia utile. Vedremo come evitare questi problemi, che sarà ancora più utile una volta introdotti i tipi.

## Sintassi

Definiamo <span class="am">[[assiomi e induzione|induttivamente]]</span> la sintassi del nostro linguaggio, definendo la nozione di termine.

> **Termine** - L'insieme dei *termini* è il più piccolo insieme $\mathcal T$ tale che:
> 1. $\{$`true`$,\;$`false`$,\;$`0`$\} \subseteq \mathcal T$;
> 2. $t_1 \in \mathcal T \rightarrow \{$`succ`$\;t_1,\;$`pred`$\;t_1,\;$`iszero`$\;t_1\} \subseteq \mathcal T$;
> 3. $\{t_1,\;t_2,\;t_3\} \subseteq \mathcal T \rightarrow\;$`if`$\;t_1\;$`then`$\;t_2\;$`else`$\;t_3 \in \mathcal T$.

Vediamo cosa significa. Ci dà tre espressioni semplici presenti in $\mathcal T$, quattro modi per formare espressioni composte presenti in $\mathcal T$. E ci dice anche che è l'insieme "più piccolo", cioè che l'insieme non ha elementi oltre a quelli strettamente necessari per rispettare le tre clausole.

E le parentesi? Le parentesi in realtà non ci sono, perché nuovamente non formalizziamo stringhe, ma alberi. Le parentesi servono solo a rendere più chiara la rappresentazione in stringa di questi alberi.

Rendiamo quindi più evidenti questi alberi, definendo i termini con le [[regole di inferenza]]:

> **Termine** - L'insieme dei termini è definito da queste regole di inferenza:
> * $true \in \mathcal T$;
> * $false \in \mathcal T$;
> * $0 \in \mathcal T$;
> * $\dfrac{t_1\in \mathcal T}{succ\;t_1\in \mathcal T}$;
> * $\dfrac{t_1\in \mathcal T}{pred\;t_1\in \mathcal T}$;
> * $\dfrac{t_1\in \mathcal T}{iszero\;t_1\in \mathcal T}$;
> * $\dfrac{t_1\in \mathcal T \qquad t_2\in \mathcal T \qquad t_3\in \mathcal T}{if\;t_1\;then\;t_2\;else\;t_3\in \mathcal T}$.

Le prime tre non inferiscono niente, non hanno una riga orizzontale. Questo è perché sono assiomi, sono semplicemente veri. Le altre quattro sono vere e proprie regole di inferenza.

Come si leggono? "Se abbiamo stabilito che la parte sopra è vera, possiamo sapere che la parte sotto è vera". Di solito, con le regole di inferenza, è implicito che l'insieme debba essere il più piccolo che soddisfa le regole.

Per formalismo: visto che $t_1$, $t_2$ e $t_3$ sono metavariabili e non variabili, cioè possono essere sostituite da altre espressioni, le tre regole di inferenza sono propriamente dette "schemi di regole di inferenza", perché per esempio, *istanziando* il secondo schema (sostituendo $t_1$ con lo stesso termine ciascuna volta che compare), posso ottenere questa regola di inferenza:$$\dfrac{succ\;0\in \mathcal T}{pred\;succ\;0\in \mathcal T}$$Uno schema di regole è un insieme infinito di regole.