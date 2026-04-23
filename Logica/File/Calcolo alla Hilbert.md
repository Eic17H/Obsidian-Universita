$\newcommand{\L}{\mathcal{L}}$$\Gamma \models _{HK} \alpha$. Il nostro sistema sarà un sistema meccanico per generare algoritmicamente schemi di argomento validi, cioè tautologie, cioè $\alpha$ tali che $\emptyset \models _{HK} \alpha$.

Hilbert: generare tautologie da un piccolo numero di postulati (assiomi), che includono particolari formule che sceglierò come assiomi e che saranno tautologie e un certo numero di schemi di argomento valido a partire dai quali tutti gli altri possono essere generati. Piccolo numero di postulati, cioè assiomi e regole di inferenza, e da lì generiamo tutti gli altri.

Quindi vediamo questo calcolo, il calcolo HK: H per Hilbert, K per klassische (classico).

Gli [[assiomi]], ce ne sono 11, sono formule del linguaggio $\L_0$. Alcuni li conosciamo: A1 è l'a fortiori, A2 è la legge di Frege, A3 A4 A5 sono già viste per la congiunzione, A6 A7 A8 disgiunzione, A9 è nuova, A10 è l'ex absurdo quodlibet, A11 è la doppia negazione. 11 tautologie.

E poi c'è un'unica regola d'inferenza, che è uno schema di argomento, il modus ponens: $\dfrac{\alpha \enspace \alpha \rightarrow \beta}{\beta}$. ^1

Esistono un numero infinito di formule derivabili da questi postulati, perché $α$, $β$ e $γ$ sono sostituibili con qualunque formula, e un'istanza di sostituzione di un assioma è un assioma. Ogni assioma di questo calcolo è in realtà uno schema di assioma che ne compendia (raggruppa) infiniti altri. Quindi il calcolo HK ha infiniti assiomi che possono essere raggruppati in 11 schemi di assioma.

Vedi anche la [[Logica/File/Calcolo alla Hilbert/Storia|storia]]

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

# Difetti

Il processo di dimostrazione è molto macchinoso. Questi esempi semplici erano già unwieldy. Inoltre, come per primo disse il polacco Jaskowski, il calcolo alla Hilbert non rispetta in maniera fedele il modo di ragionare che abbiamo nelle dimostrazioni matematiche informali. Invece di solito ragioniamo a partire dalle ipotesi: supponiamo questo, e da questo deduciamo quello. In HK non possiamo avere assunzioni.

Faremo quindi un upgrade, per ragionare [[Ragionamento ex hypothesi|ex hypothesi]], per assunzioni. Se supponiamo di poter usare, come punti di partenza, non solo postulati ma anche assunzioni, diventa tutto più maneggevole.

# Alternative al calcolo alla Hilbert

Il calcolo alla Hilbert è macchinoso nella ricerca delle dimostrazioni.

Più filosoficamente:

Gli assiomi di Euclide miravano a codificare delle verità riscontrate da un ambiente preesistente che si provava a descrivere. Invece il concetto moderno di assioma, con Hilbert, gli assiomi sono cose che decidiamo, e non descrivono necessariamente enti che esistono; gli assiomi della geometria di Hilbert sono, in un certo senso, un modo per assegnare un significato ai concetti astratti, quindi non esistenti davvero, di punto, retta e piano: non sto creando termini per descrivere qualcosa, sto creando concetti a partire dalle definizioni dei termini. (non ho capito). Niente il criterio che decide se la teoria vale o no è l'insieme delle relazioni tra gli enti, che potrebbero anche non essere punto retta piano.

Hilbert la pensava allo stesso modo riguardo la logica. Al posto degli enti, la logica ha i connettivi. I connettivi logici non esistono fisicamente fuori dal calcolo, non sono entità che provo a descrivere, secondo Hilbert. Il sistema di assiomi è una definizione implicita dei connettivi logici.

Però c'è un difetto. Quando apprendiamo un linguaggio, impariamo il significato dei termini sentendoli usare. Ci sono due teorie a riguardo. La teoria olistica ci dice che impariamo tutte le parole simultaneamente, sentendole usare insieme, quindi quando ne imparo una imparo quelle con cui è usata, l'uso è contestuale. La teoria molecolaristica sostiene che l'apprendimento avviene quando si verificano le condizioni in cui ciascun termine viene usato di per sé, in isolamento, quando si ha modo di comprendere quando la parola si può usare indipendentemente dalle altre.

I connettivi logici si apprendono in modo contestuale. Secondo i molecolaristi, tra cui Michael Dummet, questo non ci permette davvero di comprendere i connettivi logici, perché non si trovano mai in isolamento (non ho capito). Il calcolo della deduzione naturale affronta questo problema.