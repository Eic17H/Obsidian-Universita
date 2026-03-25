Abbiamo visto le tautologie, le abbiamo fatto a mano. Però, esiste un algoritmo che permette di ottenere *tutte* le tautologie a partire da un piccolo insieme di tautologie? Possiamo chiedere lo stesso per gli schemi di argomento validi. Questa è proprio la nozione di calcolo logico.

# [[Logica/File/Calcolo logico/Storia|Storia]]

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

# Hilbert

$\Gamma \models _{HK} \alpha$. Il nostro sistema sarà un sistema meccanico per generare algoritmicamente schemi di argomento validi, cioè tautologie, cioè $\alpha$ tali che $\emptyset \models _{HK} \alpha$.

Hilbert: generare tautologie da un piccolo numero di postulati (assiomi), che includono particolari formule che sceglierò come assiomi e che saranno tautologie e un certo numero di schemi di argomento valido a partire dai quali tutti gli altri possono essere generati. Piccolo numero di postulati, cioè assiomi e regole di inferenza, e da lì generiamo tutti gli altri.

Quindi vediamo questo calcolo, il calcolo HK: H per Hilbert, K per klassische (classico).

Gli assiomi, ce ne sono 11, sono formule del linguaggio $\L_0$. Alcuni li conosciamo: A1 è l'a fortiori, A2 è la legge di Frege, A3 A4 A5 sono già viste per la congiunzione, A6 A7 A8 disgiunzione, A9 è nuova, A10 è l'ex absurdo quodlibet, A11 è la doppia negazione. 11 tautologie.

E poi c'è un'unica regola d'inferenza, che è uno schema di argomento, il modus ponens: $\dfrac{\alpha \enspace \alpha \rightarrow \beta}{\beta}$.

Esistono un numero infinito di formule derivabili da questi postulati, perché $α$, $β$ e $γ$ sono sostituibili con qualunque formula, e un'istanza di sostituzione di un assioma è un assioma (forse intende tautologia?). Ogni assioma di questo calcolo è in realtà uno schema di assioma che ne compendia (raggruppa) infiniti altri. Quindi il calcolo HK ha infiniti assiomi che possono essere raggruppati in 11 schemi di assioma.

Gli assiomi sono tautologie, questo lo verifichiamo facilmente. Tuttavia Hilbert era in qualche modo, la concezione di sistema assiomatico di Hilbert era molto diversa da quella di Euclide e Aristotele e degli altri inventori dell'assiomatica antica. Per Euclide e Aristotele, gli assiomi sono verità evidenti: per due punti passa una sola retta, per Euclide era impossibile da falsificare in quanto evidente e quindi non andava neanche dimostrata. Ettore Casari la chiamava concezione categorica epistemica. Categorica perché gli assiomi rappresentano verità: sono vere, e come lo so? Intuitivamente. Tutto il dibattito sul quinto postulato di Euclide, era considerato un postulato dubbio proprio perché non era del tutto intuitivo. Poi ci fu una rivoluzione del pensiero matematico, la nascita delle geometrie non euclidee, che considerano i postulati euclidei come qualcosa che scegliamo, e creano sistemi coerenti partendo da altri postulati. Il matematico ha la libertà di scegliere i postulati, purché lo faccia in modo non contraddittorio. Quindi Hilbert disse che, visto che lo scopo è di generare delle tautologie, Hilbert scelse tautologie come assiomi. Ma un assioma è solo qualcosa che viene arbitrariamente dichiarato vero.

Cos'era una dimostrazione per Euclide e Aristotele? Una procedura che trasferisce l'evidenza dagli assiomi ai teoremi. Non è immediatamente evidente che un teorema sia vero, quindi trasferisco l'evidenza degli assiomi sui teoremi. Nell'antichità non venne messo in discussione. Aristotele lo trattò nel primo grande trattato scientifico della storia, gli Analitici Secondi. Per secoli questo fu accettato, fino anche al 1700. Poi all'inizio dell''800, un signore chiamato Bernard Bolzano (teorema di Bolzano-Weierstrass). Bolzano sacerdote boemo che diede contributi formali all'analisi matematica, e filosofo e metodologo della scienza, nel 1837 scrive un libro, Dottrina della Scienza (Wissenschaft Lehrer o simile) (dottrina come Fichte): se davvero le nozioni matematiche dovessero servire a trasferire... allora Euclide non avrebbe dimostrato che un triangolo isoscele ha angoli alla base uguali. Vediamo: certo è intuitivo, ma la dimostrazione di Euclide è molto tortuosa (pons asinorum), ma se il ruolo della dimostrazione è di trasferire l'evidenza dagli assiomi al teorema, il teorema era già ovvio, mica servono gli assiomi per renderlo ovvio. Secondo Bolzano, la dimostrazione serve a capire il motivo profondo.

Poi Hilbert, ogni sistema di enti che ha proprietà codificate dagli assiomi ha proprietà codificate dai teoremi. Il tizio italiano menzionato ha detto che è intuitivo-qualcosaltro. Non dubito della verità degli assiomi, momentaneamente li assumo veri, e da lì prendo quello. Pessimi pessimi appunti. Più importante, ***nuova concezione degli assiomi***. Integra dalle #slide oggi digito lento. E dal libro probabilmente questi appunti sono messi talmente male che le slide non bastano.

#todo: separare la storia in un altro file già predisposto

E questo è il calcolo HK.

Piccolo inciso: siamo sempre convinti che gli antichi siano ingenui e che il presente abbia tutta la verità oggettiva pronta finita fatta perfetta.

# Dimostrazione

Quindi cos'è la dimostrazione in calcolo HK? Una successione finita di formule in L0 ognuna delle quali o è un assioma o è ottenuta da formule precedenti (nella successione) ottenuta dall'unica regola di inferenza, ossia il modus ponens.

Metamatematica. La matematica si occupa di numeri e geometria eccetera. La metamatematica si occupa di dimostrazioni matematiche nelle teorie assiomatiche formali. Per questo Hilbert voleva che i suoi assiomi fossero matematicamente definiti per farci sopra delle dimostrazioni metamatematiche. (Non so se sono scemo io o se ha menzionato Peano perché ho visto stamattina un video su Peano e sulla metamatematica e sono ancora mezzo addormentato).

Un teorema è la formula conclusiva di una dimostrazione. (me lo segno, ormai è già tutto disordinato, mi fa realizzare che il corretto utilizzo di il vs uno è simile a $\exists$ e $\forall$).

Quindi, dimostro un teorema, lo uso insieme ad altri assiomi per dimostrare altri teoremi, e da poche tautologie dimostro tutte le altre.

# Esempio

Vogliamo dimostrare $\alpha \rightarrow \alpha$. Non è un assioma.

Nelle slide vediamo una dimostrazione. Non si capisce niente. Come si legge? Abbiamo 5 formule nella dimostrazione, e nella colonna di sinistra le numeriamo. Nella colonna di destra giustifichiamo ciascun passaggio, o con un assioma (dico quale) o con il modus ponens (dico da quali due formule precedenti deriva). Per esempio, la 3a formula deriva dal modus ponens, dalla 1a formula e dalla 2a formula. Sapendo, questo, è comprensibile.

Ricorda che ogni istanza di sostituzione di un assioma è un assioma. Senza quello non ha senso. E ricorda che, per esempio, posso sostituire $β$ con $α\rightarrowα$.

Cioè insomma, ho detto che "non è un assioma". Però strettamente, stiamo dimostrando che è un'istanza di sostituzione di uno schema di assioma, quindi è un assioma.

# Altro esempio

$(α\rightarrow(α\rightarrowβ))\rightarrow(α\rightarrowβ)$.

Possiamo fare sostituzioni diverse in due formule diverse.

Al passo 2 abbiamo, come giustificazione, T1, che è il nome che diamo momentaneamente al teorema dimostrato prima. Anziché riscrivere tutta la dimostrazione, che potremmo fare ma questo è equivalente.

Non esistono domande stupide, solo risposte stupide. A lezione, l'unico possibile stupido è il professore, all'esame noi.

Allora, questi schemi (in senso informale) sono come quei disegni giapponesi (ha detto così il professore) che sembrano macchie finché non noti il pattern e da lì noti che è un disegno di qualcosa e non riesci più a non vederlo (un po' come un'illusione ottica).

Il passo 5 è addirittura su due righe, è lunghissimo, scomodo scomodo. Però per capirla possiamo guardare il caro connettivo principale.

# Allora

Avendolo dimostrato, possiamo scrivere $\models_{HK} α\rightarrowα$, ma con una sola lineetta su $\models$ che per ora non so come digitare. Due linee: funzione semantica, ci dice che è una tautologia (lo è). Con una linea, funzione sintattica, ci dice che un computer lo potrebbe dimostrare. Vedi 09:20 nella registrazione. Concetto semantico (verità) e concetto sintattico (manipolazioni formali). La cosa veramente bella è che queste due nozioni coincidono tra di loro. Il teorema di adeguatezza del calcolo HK, dimostrato nel terzo modulo, ci dice che i teoremi del calcolo HK sono tutte e sole le tautologie. Dai teoremi dimostro *solo* tautologie, e dimostro *tutte* le tautologie. Quindi partendo da due prospettive concettualmente molto diverse si arriva allo stesso risultato, che è una proprietà dei teoremi profondi: due approcci che sembrano non avere niente a che fare e si trova un ponte che ci dice che sono equivalenti. Chi ha dimostrato questo teorema per un calcolo equivalente all'HK (per la logica proposizionale classica)? E.L. Post, statunitense, circa 100 anni fa.

Più complicato è dimostrarlo per la logica dei predicati, dove ci sono i quantificatori, l'ha dimostrato Goedel nel 1930 col teorema di completezza (Goedel ha anche un teorema di incompletezza).

All'esame non produrremo dimostrazioni col calcolo HK, perché non è maneggevole per il calcolo delle dimostrazioni, "non lo saprei fare neanche io". Però ti chiederà di spiegare una dimostrazione già fatta. Questo calcolo è subottimale per la ricerca delle dimostrazioni, vedremo calcoli più efficienti.