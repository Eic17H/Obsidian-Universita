Abbiamo visto le tautologie, le abbiamo fatto a mano. Però, esiste un algoritmo che permette di ottenere *tutte* le tautologie a partire da un piccolo insieme di tautologie? Possiamo chiedere lo stesso per gli schemi di argomento validi. Questa è proprio la nozione di calcolo logico.

# Storia

Lo scopo del calcolo può essere anche un modo imparziale per risolvere conflitti, secondo Leibniz. Leibniz ci lavorò molto, ma il suo contributo sul calcolo logico moderno è ridotto; questo è anche perché molti dei suoi scritti non sono stati pubblicati mentre era in vita, furono scoperti secoli dopo da Couturat, quando ormai era già fondato.

Torniamo ancora più indietro, possiamo vedere il calcolo logico come calcolo assiomatico, torniamo ad Euclide. Euclide, da cinque assiomi, o postulati, e da quelli che chiamava "assiomi comuni", cioè proprietà che valgono non solo per la geometria ma per tutto. In realtà, ci sono teoremi che sono validi ma che non si possono dimostrare a partire dai cinque postulati, quindi il sistema non è logicamente impeccabile, ma è il primo esempio di teoria assiomatica, e in quanto tale il modello per tutte le teorie assiomatiche arrivate dopo, inclusa quella moderna.

# Linguaggio

Vediamo il nostro linguaggio L0.

* Alfabeto
	* Logico: ¬ & v -> (togliamo il <-> perché si può definire da & e ->)
	* Descrittivo: $p_1, p_2, p_3, ...$ (variabili proposizionali)
	* Ausiliario: ( )

Ogni formula sarà costituita da quei simboli, ma non ogni stringa di simboli è una formula.

Le formule le abbiamo definite per induzione.

# Rigore

Come abbiamo definito le tautologie? *Mi faccio la mia tabellina di verità, prendo la colonna principale che è quella del connettivo logico che sta fuori da tutte le parentesi incluse quelle implicite e mi deve uscire tutto uno*. E gli schemi di argomento validi a partire dalle tautologie.

Altro problema. L'insieme delle premesse abbiamo detto che deve essere un insieme finito e mai vuoto, perché siamo partiti dagli argomenti del linguaggio naturale: non possiamo parlare all'infinito, e non possiamo partire dal nulla. Dobbiamo invece modificare la nozione di schema di argomento valido per includere questi due casi limite. Quindi prima di cominciare con il calcolo logico dovremo lavorare sull'aspetto semantico.

# Valutazione del linguaggio L0
$\newcommand{\L}{\mathcal{L}}$
La valutazione è una funzione $\mathcal{V}:For(\L_0)->{0,1}$ tale che per ogni α,β in For(L0):
* $\mathcal{V}(¬α)=1$ sse $\mathcal{V}(α)=0$
* a&b
* avb
* a->b a=0vb=1

Quindi la valutazione del linguaggio è una funzione che assegna alle variabili il valore che vuole, e dopo le sue libertà sono finite, perché il resto deriva dalle tavole di verità.

# Conseguenza logica

Definiamo la nozione di conseguenza logica, che è una precisazione della nozione di schema di argomento valido.

$α \in For(\L_0) \land Γ \subseteq For(\L0)$ (α è una formula, Γ è un insieme di formule), allora diciamo che α è conseguenza logica in HK (diciamo che HK è la logica classica per ora) di Γ, e scriviamo in simboli $Γ \models_{HK} α$ quando per ogni valutazione V in L0 se V(γ)=1 per ogni γ in Γ, allora V(α)=1 (cioè non ha controesempi).

Quindi abbiamo tutti i nostri γ, che sono $γ_1,γ_2,γ_3,...$, e nella tavola di verità abbiamo tante righe. Concentriamoci su una riga, cos'è una riga della tavola di verità? Una funzione che assegna 0 o 1 a ciascun γ, arbitrariamente, e ad α secondo le regole dei connettivi logici. Ma non è altro che una valutazione! Quindi implicitamente, informalmente, abbiamo già usato la nozione di valutazione nella nozione di schema di argomento valido, perché lì stavamo usando una riga con 1 dappertutto. La differenza è che Γ può essere infinito.

E se è vuoto? Dobbiamo guardare le righe della tavola di verità. Non ho capito, ma ha detto "una tautologia non è altro che una conseguenza logica di un insieme vuoto di premesse".

Vediamo meglio le tautologie e gli schemi validi. $p, p \rightarrow q \models_{HK} q$. p deve essere 1, e p->q deve essere 1, se q fosse 0 quello sarebbe impossibile quindi q=1, QED.

## Proprietà

Riflessività, monotonia e transitività. Monotonia non nel senso che è monòtona ma che è monotòna.

### Riflessività

Ogni formula è conseguenza logica di tutti gli insiemi che già la contengono. Cioè, $α \in Γ \rightarrow Γ\models_{HK}α$.

### Transitività

$Δ\models_{HK} α \land \forall δ \in Δ, Γ \models_{HK} δ \rightarrow Γ \models_{HK} α$. Se da Delta consegue alfa e per ogni delta in Delta da Gamma consegue delta, allora da Gamma consegue alfa. Le conseguenze delle conseguenze di Gamma sono conseguenze di Gamma.
### Monotonia

$Γ \models_{HK} α \land Γ \subseteq Δ \rightarrow Δ \models_{HK} α$. Aggiungendo premesse non perdo la conseguenza.

Nel linguaggio naturale in realtà ci sono argomenti che non sono monotòne: "metto lo zucchero nel tè, quindi il tè ha un buon sapore", aggiungo una premessa, "metto lo zucchero nel tè e metto la benzina nel tè, quindi il tè ha un buon sapore". Lo studio di inferenze monotòne si studia (studiava) molto nello sviluppo delle IA.

## Tautologia

Una tautologia è una conseguenza logica di un insieme vuoto. $\emptyset \models_{HK} α$.

$\emptyset \subseteq Γ$. Non ci può essere niente che è in Ø ma non in Γ, perché non ci può essere niente in Ø.

Quindi diciamo che α è una tautologia. $\emptyset \models_{HK} α \land \emptyset \subseteq Γ \rightarrow Γ \models_{HK} α$. Una tautologia è conseguenza di qualunque insieme di premesse. Lo deriviamo dalle proprietà.

Quando chiede le definizioni, metti tutti i "per ogni" al posto giusto. "Quando V è..." vs "Quando per ogni V ...". Nella seconda stai essenzialmente dichiarando la variabile V.