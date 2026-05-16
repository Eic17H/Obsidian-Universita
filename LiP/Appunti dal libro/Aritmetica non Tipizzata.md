Introduciamo gli aspetti basilari dei linguaggi di programmazione. Per semplicità, li vediamo prima senza tipi.

Come linguaggio esempio, ne usiamo uno che tratta solo di numeri e booleani. Vediamo i concetti di *sintassi astratta*, *definizioni*, *dimostrazioni induttive*, *valutazione* ed *errori di runtime*.

## Sintassi
### Forme sintattiche

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

### Sintassi

Definiamo <span class="am">[[assiomi e induzione|induttivamente]]</span> la sintassi del nostro linguaggio, definendo la nozione di termine.

> **Termine** - L'insieme dei *termini* è il più piccolo insieme $\mathcal T$ tale che:
> 1. $\{$`true`$,\;$`false`$,\;$`0`$\} \subseteq \mathcal T$;
> 2. $t_1 \in \mathcal T \rightarrow \{$`succ`$\;t_1,\;$`pred`$\;t_1,\;$`iszero`$\;t_1\} \subseteq \mathcal T$;
> 3. $\{t_1,\;t_2,\;t_3\} \subseteq \mathcal T \rightarrow\;$`if`$\;t_1\;$`then`$\;t_2\;$`else`$\;t_3 \in \mathcal T$.

Vediamo cosa significa. Ci dà tre espressioni semplici presenti in $\mathcal T$, quattro modi per formare espressioni composte presenti in $\mathcal T$. E ci dice anche che è l'insieme "più piccolo", cioè che l'insieme non ha elementi oltre a quelli strettamente necessari per rispettare le tre clausole.

E le parentesi? Le parentesi in realtà non ci sono, perché nuovamente non formalizziamo stringhe, ma alberi. Le parentesi servono solo a rendere più chiara la rappresentazione in stringa di questi alberi.

Rendiamo quindi più evidenti questi alberi, definendo i termini con le [[regole di inferenza]]:

> **Termine** - L'insieme dei termini è definito da queste regole di inferenza:
> $$true \in \mathcal T \qquad false \in \mathcal T \qquad 0 \in \mathcal T$$
> $$\dfrac{t_1\in \mathcal T}{succ\;t_1\in \mathcal T}\qquad\dfrac{t_1\in \mathcal T}{pred\;t_1\in \mathcal T}\qquad\dfrac{t_1\in \mathcal T}{iszero\;t_1\in \mathcal T}$$
> $$\dfrac{t_1\in \mathcal T \qquad t_2\in \mathcal T \qquad t_3\in \mathcal T}{if\;t_1\;then\;t_2\;else\;t_3\in \mathcal T}$$

Le prime tre non inferiscono niente, non hanno una riga orizzontale. Questo è perché sono assiomi, sono semplicemente veri. Le altre quattro sono vere e proprie regole di inferenza.

Come si leggono? "Se sappiamo che la parte sopra è vera, sappiamo che la parte sotto è vera". Di solito, con le regole di inferenza, è implicito che l'insieme debba essere il più piccolo che soddisfa le regole.

Per formalismo: visto che $t_1$, $t_2$ e $t_3$ sono metavariabili e non variabili, cioè possono essere sostituite da altre espressioni, le tre regole di inferenza sono propriamente dette "schemi di regole di inferenza", perché per esempio, *istanziando* il secondo schema (sostituendo $t_1$ con lo stesso termine ciascuna volta che compare), posso ottenere questa regola di inferenza:$$\dfrac{succ\;0\in \mathcal T}{pred\;succ\;0\in \mathcal T}$$Uno schema di regole è un insieme infinito di regole.

## Semantica

Vediamo prima la [[Stili di semantica|semantica operativa]] delle espressioni booleane.

Provo a capirci qualcosa.

Usiamo la metavariabile $t$ per i termini, e la metavariabile $v$ per i valori. I valori sono un sottoinsieme dei termini, in particolare solo quelli che sono considerati risultati finali della valutazione.

Definiamo entrambi dal punto di vista sintattico:
```
t ::=
	true
	| false
	| if t then t else t
v ::=
	true
	| false
```

E adesso vediamo come *valutarli* in small-step semantic:
* $\text{if true then }t_2\text{ else }t_3 \rightarrow t_2 \qquad (\text{E-IfTrue})$
* $\text{if false then }t_2\text{ else }t_3 \rightarrow t_3 \qquad (\text{E-IfFalse})$
* $\dfrac{t_1 \rightarrow t'_1}{\text{if }t_1\text{ then }t_2\text{ else }t_3 \rightarrow \text{if }t'_1\text{ then }t_2\text{ else }t_3} \qquad (\text{E-If})$

Questa è detta *relazione di valutazione* o *relazione di riduzione* (c'è chi usa *valutazione* solo per la big-step semantic). Ciò che c'è a sinistra della freccia è lo stato della macchina in un momento, e ciò che c'è alla destra è lo stato al momento successivo, dopo un passo di calcolo. La freccia si legge "restituisce".

Queste sono tre regole di inferenza (o due assiomi e una regola, possiamo dire).

La regola $\text{E-IfTrue}$ ci dice che, se stiamo valutando un termine che è un condizionale la cui condizione è il valore $true$, allora il termine ha lo stesso valore del termine nella sezione $then$. La regola $\text{E-IfFalse}$ ci dice invece che se la condizione è il valore $true$, il valore è quello del termine nella sezione $else$.

Invece la regola $\text{E-If}$ ci dice che un condizionale ha lo stesso valore di un condizionale la cui condizione è il risultato della valutazione della sua condizione (essenzialmente puoi sostituire la condizione con il suo valore). Però c'è una freccia orizzontale: questo passaggio si può fare solo se possiamo valutare quella condizione ("se un'altra macchina il cui stato è quella condizione può fare un passo per valutarla").

Quella $\text{E-}$ ci dice che queste sono regole che si riferiscono alla valutazione (==*evaluation*==), ci saranno anche altre regole.

Notiamo come queste regole non valutano né il ramo falso né il ramo vero. Invece $\text{E-If}$ valuta la condizione, che però non avrà direttamente a che fare con il valore dell'intero termine, e le altre due ci dicono cosa valutare al prossimo passo, quindi potenzialmente qual è il valore del termine. E in effetti, intuitivamente, funziona così: non c'è bisogno di valutare entrambi i rami prima di sapere se la condizione è vera o falsa, lo facciamo dopo, così valutiamo solo quello che ci serve.

Inoltre, notando la differenza di questi due comportamenti, possiamo separare le regole in due categorie: *==regole di **congruenza**==* ($\text{E-If}$) e *==regole di **calcolo**==* (le altre due).

### Definizioni

Definiamo formalmente la relazione di valutazione per essere più precisi.

> **Istanza di una regola di inferenza** - Un'*istanza* di una regola di inferenza si ottiene sostituendo ogni occorrenza di ciascuna metavariabile con lo stesso termine, nella conclusione e nelle premesse della regola.

Per esempio, in $\text{E-IfTrue}$, sostituisco $t_2$ con $true$ e $t_3$ con $false$: $\text{if true then }true\text{ else }false \rightarrow true$. Questa è un'istanza di $\text{E-IfTrue}$. %% non sono per niente consistente con l'utilizzo di \text, non so bene che fare %%

> **Soddisfazione delle regole di inferenza** - Una regola è *soddisfatta* da una relazione se, per ogni istanza della regola, la conclusione è nella relazione, oppure una delle premesse non lo è.

> **One-step evaluation** - La relazione di valutazione *one-step* è la più piccola relazione binaria sui termini che soddisfano le tre regole. Quando la coppia $(t,t')$ è nella relazione di valutazione, diciamo che "il giudizio $t\rightarrow t'$ è derivabile".

"La più piccola" qui è importante: un'affermazione $t \rightarrow t'$ è derivabile ==se e solo se== è verificata dalle regole, cioè o è l'istanza di un assioma, o è la conclusione di un'istanza della regola di inferenza. Si dimostra presentando un albero le cui foglie sono etichettate con istanze degli assiomi, e i nodi interni con istanze della regola.

Esempio immondo:$$\dfrac{\dfrac{\dfrac{}{\text{if true then false else false} \rightarrow \text{false}}[\text{E-IfTrue}]}{\text{if }\textbf{if true then false else false}\text{ then true else true} \rightarrow \text{if }\textbf{false}\text{ then true else true}}[\text{E-If}]}{\text{if }\textbf{if if true then false else false then true else true}\text{ then false else false} \rightarrow \text{if }\textbf{if false then true else true}\text{ then false else false}}[\text{E-If}]$$Ho evidenziato $t_1$ nelle istanze di $\text{E-If}$.

Questo è un albero di derivazione. Che razza di albero è? Non ha rami, ha solo un tronco. Diciamo che è un albero unario. Non abbiamo ancora visto regole che ramificano, le vedremo più avanti. Insomma, il termine più in basso è la radice, e il termine più in alto è la foglia. Per una volta scriviamo gli alberi dritti, quando molto spesso nella teoria dei grafi li scriviamo sottosopra.

Questa dimostrazione che fa uso di alberi è utile perché possiamo fare *dimostrazioni per induzione su derivazioni*: il parametro dell'induzione è il numero di nodi dell'albero, abbiamo un passo base che è un albero molto semplice e un passo induttivo che consiste nell'aggiungere nodi, tenendo conto di tutti i possibili modi di aggiungere nodi.