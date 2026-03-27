Cos'è una derivazione in HK? Una successione finita di formule in $L_0$ ognuna delle quali o è un assioma o è ottenuta da formule precedenti attraverso il modus ponens, oppure *è una formula arbitraria etichettata come assunzione*. La terza è nuova.

Quindi, se dico $Γ \vdash_{HK} α$, dico che α è derivabile come conclusione prendendo come ipotesi le formule in $Γ$, quindi in $Γ$ ci sono le assunzioni.

$Γ$ può essere infinito. E quindi come fa la successione a essere finita? La definizione non implica che si utilizzino *tutte* le assunzioni dell'insieme $Γ$, perché siamo in logica classica. Non siamo obbligati ad usarne neanche una! Anche con $\models$ $Γ$ poteva essere vuoto, e in quel caso $α$ è una tautologia, invece con $\vdash$ è un teorema, perché non richiede assunzioni ma deriva solo dagli assiomi. Vedremo nel terzo modulo che, con la definizione forte del teorema di adeguatezza, i due sono equivalenti: α è derivabile da Γ se e solo se ...

"Ma chi mi garantisce che l'ipotesi sia corretta?" Pensa alla scuola, ti dicevano "ipotizza che questo triangolo sia isoscele, allora vale la proprietà...", e tu dicevi "e chi mi dice che questo triangolo sia *davvero* isoscele?" No, se assumiamo ipoteticamente che valgano le premesse allora valgono le conclusioni.

Il problema del confronto tra una nozione formale e una informale è che la nozione formale deve modellare la nozione informale, e si deve provare a dimostrare che lo faccia bene, ma non si può fare in modo certo, si può solo argomentare e convincere.

## Esempio: transitività

$α\rightarrow β,\;β\rightarrow γ,\;α\vdash_{HK} γ$

Se assumo che $α$ implichi $β$ e che $β$ implichi $γ$ e che $α$ sia vero, allora $γ$ è vero.

1. $α\rightarrow β$  assunzione
2. $β\rightarrow γ$  assunzione
3. $α$  assunzione
4. $β$  R1, 1, 3
5. $γ$  R1, 2, 4

# Proprietà

Le abbiamo già dimostrate per la nozione semantica di conseguenza logica e vediamo che valgono anche per la nozione sintattica di derivazione.

Sono talmente importanti che [[Alfred Tarski]] riteneva che fossero definitorie della nozione astratta di conseguenza, queste tre proprietà assiomatizzano il concetto di conseguenza logica.

## Riflessività

$α \in Γ \rightarrow Γ \vdash_{HK} α$

1. $α$ assunzione

Finito così. Certamente non è infinito. Molto semplice. E tu magari ridi, ridi perché ti sembra una presa in giro, ma è così.
## Monotonia

$Γ \vdash_{HK} α \land Γ \subseteq Δ \rightarrow Δ \vdash_{HK} α$

Per ipotesi, esiste una successione finita che da $Γ$ arriva ad $α$. Esiste una tale successione in $Δ$? Sì, è la stessa, perché sto usando solo assunzioni di $Γ$, che sono anche assunzioni di $Δ$.

Questo, informalmente, non vale. Di nuovo l'esempio del tè con lo zucchero e la benzina. Ma secondo Tarski questa distinzione non è logica ma qualcos'altro, magari pragmatica.
## Transitività

$Γ \vdash_{HK} Δ \land Δ \vdash_{HK} α \rightarrow Γ \vdash_{HK} α$

*Se un insieme di assunzioni me ne implica altre e da queste nuove io derivo $α$, allora $α$ è derivabile anche dalle prime.

Supponiamo che Δ consista di un'unica formula, $Δ={δ}$. La mia ipotesi è che esista una derivazione che termina, all'n-esimo passaggio, con $δ$ nella quale uso solo ipotesi di $Γ$. L'altra ipotesi mi dice che $α$ è derivata da $Δ$, cioè esiste una derivazione che partendo da $Δ$, e quindi solo da $δ$, al passaggio m arriva ad $α$.

Tecnica dell'innesto di derivazioni: creo una nuova derivazione che al passaggio n arriva a $δ$, e partendo da $\delta$ arriva ad $\alpha$ al passaggio m+n, che consiste nella concatenazione delle due derivazioni di prima.

È finita, perché è l'unione di due insiemi finiti. Ho usato solo assunzioni di $Γ$? Magari ho usato $δ$. E qui ci sono due casi: o $δ \in Γ$, e in quel caso va bene, oppure $Γ \vdash_{HK} δ$, come troviamo nella sezione dal passo 1 al passo n.

# Alternative al calcolo alla Hilbert

## Perché

Il calcolo alla Hilbert è macchinoso nella ricerca delle dimostrazioni.

Più filosoficamente:

Gli assiomi di Euclide miravano a codificare delle verità riscontrate da un ambiente preesistente che si provava a descrivere. Invece il concetto moderno di assioma, con Hilbert, gli assiomi sono cose che decidiamo, e non descrivono necessariamente enti che esistono; gli assiomi della geometria di Hilbert sono, in un certo senso, un modo per assegnare un significato ai concetti astratti, quindi non esistenti davvero, di punto, retta e piano: non sto creando termini per descrivere qualcosa, sto creando concetti a partire dalle definizioni dei termini. (non ho capito). Niente il criterio che decide se la teoria vale o no è l'insieme delle relazioni tra gli enti, che potrebbero anche non essere punto retta piano.

Hilbert la pensava allo stesso modo riguardo la logica. Al posto degli enti, la logica ha i connettivi. I connettivi logici non esistono fisicamente fuori dal calcolo, non sono entità che provo a descrivere, secondo Hilbert. Il sistema di assiomi è una definizione implicita dei connettivi logici.

Però c'è un difetto. Quando apprendiamo un linguaggio, impariamo il significato dei termini sentendoli usare. Ci sono due teorie a riguardo. La teoria olistica ci dice che impariamo tutte le parole simultaneamente, sentendole usare insieme, quindi quando ne imparo una imparo quelle con cui è usata, l'uso è contestuale. La teoria molecolaristica sostiene che l'apprendimento avviene quando si verificano le condizioni in cui ciascun termine viene usato di per sé, in isolamento, quando si ha modo di comprendere quando la parola si può usare indipendentemente dalle altre.

I connettivi logici si apprendono in modo contestuale. Secondo i molecolaristi, tra cui Michael Dummet, questo non ci permette davvero di comprendere i connettivi logici, perché non si trovano mai in isolamento (non ho capito). Il calcolo della deduzione naturale affronta questo problema.