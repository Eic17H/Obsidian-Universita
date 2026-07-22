Bisogna iscrivere il proprio gruppo con un form.

Il progetto prevede l'utilizzo di LLM. Quindi per forza per fare il progetto devi compilare un modulo su quali LLM conosci.

I due membri del gruppo, tre se contiamo l'LLM, svilupperanno un semplice sistema software di tipo algoritmo. Quindi non un sistema web con più utenti, cosa che era l'anno scorso. Sarà un'elaborazione di dati per risolvere un problema di classificazione.

Gli algoritmi di ottimizzazione e di classificazione da usare li decidiamo noi (o l'LLM).

Il problema però è bene un po' parlarne perché è semplice ma non banale. Ne parliamo a livello matematico, le specifiche verranno dopo.

*Ci saranno modi metodi escogitismi per capire chi copia, usando gli LLM, copiatura, plagiarismo come si suol dire.* Per dare un'idea di come sta parlando.
## Il problema a livello matematico

Problemi QUBO e Feature Reduction. Questo è il titolo della presentazione.

La premessa è che tutta questa presentazione di oggi richiede di capire la notazione matriciale. Ma cosa sta dicendo. Ah certo, noi la conosciamo perché studiamo l'IA. Secondo lui. Due problemi caro. Noi non studiamo l'IA, e facciamo CSMN quindi la conosciamo per quello. Complimenti.

Ci tiene a precisare ZUCCHERO SINTATTICO MENZIONATO. No dicevo, ci tiene a precisare che gli indici partono da 1.

Una forma quadratica è tutte le possibili... Eh? Vedi le slide. Forma quadratica, ci sono solo termini di secondo ordine, una somma. Insomma $(x,A) \Rightarrow x^T A x$, che ci risulta con, in termini umani, ogni elemento di $A$, moltiplicato per l'elemento di $x$ corrispondente alla sua riga, moltiplicato per quello della colonna. $\sum\limits_{i=1}^n \sum\limits_{j=1}^n a_{ij}x_ix_j$.

Risolviamo i problemi QUBO (non c'entra coi cubi). Cerchiamo il minimo o il massimo di una funzione quadratica, dove tutti gli elementi di $x$ sono o $0$ o $1$.

Troviamo quindi la $\underline x$ che minimizza $f(\underline x) = a+\underline b^T\underline x+\underline x^T[Q]\underline x$.

Nelle slide c'è una lista enorme di problemi che si possono risolvere con QUBO.

I calcolatori quantistici risolvono QUBO molto in fretta, ma quelli che abbiamo ora sono molto limitati quindi ancora nel pratico niente. In quel caso, si usano i valori $-1$ e $+1$. Ma c'è una formula di conversione tra una forma e l'altra.

$0$ e $1$ sono particolarmente utili perché fanno sì che $x^2=x$ sempre. Inoltre $1-x$, il complementare, è sempre uno dei due valori.

Niente essenzialmente cerchiamo i minimi. Basta cambiare segno per cercare i massimi. In questa situazione, quel termine costante $a$ non ci cambia nulla, lo trascuriamo. Il termine lineare, $\underline b ^T \underline x$ si può convertire in un termine quadratico $\underline x ^T Diag( \underline b) \underline x$.

Il problema è NP-hard. Se $x$ avesse valori reali, sarebbe facilissimo, perché potremmo fare la derivata e trovare minimi e massimi così, semplicissimo, analisi. Ma noi abbiamo vettori binari.

COSA STA DICENDO. Sta leggendo malissimo, e poi non fa frasi non si capisce niente. Ma sta facendo un'interrogazione brutta delle medie. "E quindi quello che conta è la somma di questi due termini" ma non ci credi neanche tu.

Niente, trasformiamo la nostra matrice $Q$ in una matrice simmetrica, che indichiamo con $Q^s$, che si fa mettendo in ogni casella la media tra sé stessa e la sua posizione speculare. Ma poi non serve a nulla, mi sa che ha detto che non serve a nulla sapere questa cosa. Sicuramente le slide le ha scritte un LLM.

Il problema è NP-hard. La soluzione si trova solo con la ricerca esaustiva. Con metodi metaeuristici si trova in modo più efficiente una buona soluzione, non un minimo globale ma almeno uno locale decente.

Adesso nelle slide vediamo un esempio. Noi scriviamo la parte lineare rendendola quadratica perché $x^2=x$, quindi diventa tutto quadratico. Quindi ottengo solo termini quadratici, che posso ricondurre al risultato di un prodotto del tipo $x^T Q x$. E poi con la formuletta mi faccio $Q$ a partire dai coefficienti.

In un problema vero, si mettono anche vincoli, ma noi non mettiamo vincoli quindi ez.

Per ottenere il minimo si usano algoritmi di ottimizzazione metaeuristici, perché con la ricerca esaustiva il problema esplode.

Ci sono tre approcci possibili. La risoluzione algebrica, risolviamo l'equazione. Se è convessa, quindi ha solo un minimo, usiamo il gradiente ed è facile. Se la funzione è multiminima, quello che vedremo, servono vari algoritmi.

Noi scegliamo un algoritmo, volendo anche più di uno.

Il nostro punto iniziale è una sequenza di $0$ e $1$. Essenzialmente i metodi diversi gestiscono diversamente una regressione per evitare di cadere nei minimi locali.

Uno dei metodi è il Tabu Search. Non ce lo spiega. Essenzialmente ce lo spiega: c'è una coda di tabù per evitare di andare in loop, a ogni ciclo cambia.

Simulated Annealing. *Cristallizzazione con ricottura*. Punto iniziale, un vicino, se il vicino è meglio allora si prende quello, altrimenti a caso si sceglie se continuare dal vicino o no. In ogni caso si tiene traccia del minimo storico. La probabilità di quella scelta random, la probabilità di accettazione, è vista nelle slide. $e^{-\frac{f(x')-f(x)}{T}}$. $T$ è il parametro temperatura, che diminuisce più va avanti l'algoritmo.

Incredibile, nella sezione storia di questo argomento c'è il professore, no way. Uno degli articoli di maggior successo sull'argomento.

Vedi le slide chiaramente. Steepest Descent sconsigliata.

### Feature Reduction

Non è classificazione, è un problema preliminare alla classificazione.

Abbiamo un dataset, un insieme di campioni. Ogni campione ha vari campi (features), e dobbiamo classificare i campioni in due classi, che distinguiamo con vero e falso. Si ha un classificatore, un algoritmo che si configura usando dati e target noti, poi lo si usa su dati nuovi.

Ridurre le feature serve appunto ad avere meno feature, per fare meno calcoli. Se due feature sono dipendenti l'una dall'altra, non serve avere entrambe (una delle due non è informativa). Ci sono anche feature che possono non essere correlate al target quindi togliamo anche quella. La selezione di feature si fa di nuovo con un vettore binario, $0$ si dà alle feature da scartare (forse ho capito male ma mi tornerebbe).

Da lì, le slide sono probabilmente molto più chiare di quanto il professore sia capace ad esserlo.

e5r6ftg7y8hu9j0okiuytr54xe5c5v6b789k8hytrerftgyhjk. "Vogliamo minimizzare qualcosa, quindi in realtà vogliamo massimizzare questa cosa qui". Sta leggendo simboli che lui stesso probabilmente non capisce così bene.