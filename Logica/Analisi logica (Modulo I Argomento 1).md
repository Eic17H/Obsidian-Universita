Questo argomento l'abbiamo già visto in realtà molto presto, alle elementari. Analisi logica. Ce ne sono due: analisi logica della proposizione, che analizza la singola proposizione, e analisi del periodo, che studia i collegamenti tra proposizioni semplici.

Ovviamente non ripetiamo le elementari. Ci sono dei *falsi amici*, termini che in grammatica significano qualcosa e in logica significano qualcosa di leggermente o significativamente diverso.

Nozione fondamentale: enunciato.

# Enunciati

> Una qualsiasi espressione linguistica a proposito della quale abbia senso chiedersi se è vera o se è falsa.

In grammatica invece, "Che ore sono?" è una proposizione interrogativa, ma non è un enunciato: non ha un valore di verità.

Ci sono espressioni che non sono enunciati per motivi diversi. Per esempio "il padre di Carlo" si usa per riferirsi a un certo individuo, per denotarlo, non per asserire qualcosa. Non è un enunciato perché risponde a un'esigenza linguistica diversa.

Non stiamo dicendo che perché un'espressione sia un enunciato ci debba essere un metodo per *conoscerne* il valore di verità. "In questo esatto momento, in Sardegna, vive un numero dispari di gatti". Potrebbe essere vero, potrebbe essere falso, ma nessuna persona lo sa.

Ci sono enunciati che contengono termini vaghi, molto comuni nel linguaggio naturale. "Giovanni è alto". Supponiamo che Giovanni abbia un'altezza di 1.78m, che lo pone in qualche modo in una fascia che pone noi parlanti della lingua italiana in dubbio. Questo non significa che "Giovanni è alto" non sia un enunciato, significa solo che la vaghezza del predicato "alto", significa solo che anche conoscendo l'altezza di Giovanni alla precisione di un millimetro e anche se fossimo parlanti perfettamente competenti della lingua italiana, potremmo essere incerti riguardo parole elgantissime che ho dimenticato e non voglio dire cazzate quindi finisco qui.

Ci sono due categorie di enunciato: semplice e composto.

## Categorie di enunciato

> Enunciato semplice: non contiene altri enunciati quando non contiene altri enunciati come sue parti proprie.

> Enunciato composto: non è semplice.

"Piove" è un enunciato che consiste di un'unica parola, non contiene altri enunciati, quindi è semplice.

"Piove" è vago se ci pensi. Piove dove? La vaghezza nel linguaggio naturale è omnipervasiva. Non faremo storia, ma il professore citerà molte nozioni storiche. Uno dei padri della logica moderna, Frege, tedesco, ascriveva alla logica un compito molto importante: doveva comporre le fondamenta sicure della matematica, e la formalizzazione era un modo per rimuovere tutte le impurità che la rendevano inadeguata. Per Frege la vaghezza era presente ma eliminabile. Più di recente, sono state fatte delle logiche studiate per formalizzare anche il concetto di vaghezza.

Torniamo a noi.

"Luisa cammina molto lentamente", pur essendo composto di parecchie parole, è semplice. O no? "Luisa cammina" è un enunciato, e "molto lentamente" sottintende un enunciato. Però lo sottintende, non lo contiene, noi trattiamo con le parole, non direttamente col puro significato. Black box, non possiamo guardare all'interno degli enunciati, è troppo avanzato per questo corso.

"Piove e c'è vento" è composto di "piove" e di "c'è vento".

"Se piove prendo l'ombrello" è composto.

A noi interessa il livello degli enunciati complessi. Capire se il valore di verità di un enunciato composto dipende da quello degli enunciati da cui è composto, e come. Dobbiamo capire qual è la colla degli enunciati.

In grammatica a scuola, che dicevamo? Usiamo le congiunzioni. Congiunzioni coordinanti, subordinanti, per esempio "e", "o", "se/allora", "quando", "mentre", "perché", "benché", "quantunque", "ma". Sono troppe. Ci limiteremo a studiare cinque congiunzioni, che chiamiamo *connettivi logici*.

# Connettivi logici

* Congiunzione: e
* Disgiunzione: o
* Implicazione: se+allora
* Doppia implicazione: se e solo se
* Negazione: non

Secondo falso amico rispetto alla grammatica. "Congiunzione". In grammatica, tutte queste, tranne "non", sono congiunzioni. In logica, "congiunzione" si riferisce a un certo tipo di connessione logica.

"Piove e c'è vento", enunciato composto con connettore logico di congiunzione. Anche l'enunciato stesso è detto una congiunzione. I due enunciati semplici sono i "congiunti".

"Piove o c'è vento", disgiunzione, disgiunti.

"Se piove allora prendo l'ombrello", implicazione. I due operandi sono diversi: antecedente e conseguente. Potrebbero essere in ordine inverso nella frase, "prendo l'ombrello se piove". C'erano un tempo termini greci che non si usano più, protasi e apotasi una cosa del genere.

"Piove se e solo se prendo l'ombrello", non si trova nel linguaggio naturale, quasi solo nel linguaggio matematico, ma comunque esiste per noi. Non c'è un nome per gli operandi.

La negazione fa un po' storia a sé. "Non piove", sembrerebbe un enunciato semplice perché contiene un solo enunciato, ma quell'enunciato è distinto dall'enunciato intero, quindi è utile considerarlo composto.

I primi quattro sono connettivi binari: creano un enunciato da due. La negazione è unaria, si applica a un unico enunciato. Possiamo dire che hanno arietà 2 e arietà 1 rispettivamente.

*"Non" non è un enunciato, ma "non piove" è un enunciato, e noi lo vediamo come enunciato composto.* Non non non c'è bisogno di non non scriverlo, mi faceva solo ridere che il professore si fosse ritrovato a dire questa frase che per qualche secondo risultava strana.

In logica classica, che è la prima che vedremo, le uniche congiunzioni che meritano la qualifica di connettivi logici sono quelle che hanno la proprietà della *verofunzionalità*: io considero la "o" come un connettivo logico perché il valore di verità della disgiunzione può essere meccanicamente calcolato dal valore diverità dei disgiunti, senza usare nessun'altra informazione. La *verità* si conosce in *funzione* della verità degli operandi.

"Ma", per esempio, è particolare. Da un punto di vista verofunzionale, è equivalente alla "e". Però, solitamente ha una sfumatura di significato che a livello pragmatico, e non logico, sottintende un'opposizione tra gli operandi. Sottinteso convenzionale. Ben oltre lo scopo della lezione. *Due diverse lessicalizzazioni dello stesso connettivo*.

Esistono in grammatica congiunzioni non verofunzionali? Sì. "Perché". "Giovanni ha i capelli bagnati perché piove". Oggi ha i capelli bagnati e piove, la proposizione è vera? Magari si è fatto la doccia, chissà. Non possiamo saperlo. Come ci poniamo di fronte a questa sfida? O ci inventiamo una logica che consente di trattare questi casi, o prendiamo queste congiunzioni e le escludiamo dalla logica. Noi adoperiamo il secondo metodo.

Associatività. Una congiunzione ha due congiunti, mai tre. Però uno dei congiunti può esso stesso essere una congiunzione. "Piove e c'è freddo e c'è vento", "piove e c'è freddo" è un congiunto.

"Piove, c'è freddo e c'è vento", la congiunzione è lessicalizzata con la virgola. "Piove, c'è freddo o c'è vento", la virgola invece lessicalizza la disgiunzione. "Giovanni e Maria sono italiani", velatamente anche qui c'è una congiunzione, "Giovanni è italiano e Maria è italiana". "Giovanni e Maria sono colleghi", qui "e" non lessicalizza alcun connettivo, non ce ne sono.

Tornando a Frege, per questo motivo i padri della logica decisero di usare un linguaggio formale, per evitare quest'altro problema, l'ambiguità.

# Principî

I connettivi sono verofunzionali, se non è verofunzionale non è un connettivo. Principio di vfnznltà.

Principio di bivalenza, implicito, esistono solo due valori di verità, vero e falso.

Questi sono principi indipendenti, possiamo creare logiche con solo uno dei due o nessuno. La logica classica li accetta entrambi. Vedremo logiche solo verofunzionali. Logica trivalente, con il "non so", logiche infinitovalenti. Logiche non verofunzionali.

In logica classica, con classico non si intende come in letteratura classica, non c'entrano i greci e i latini, non è logica antica, non studiamo Aristotele :(, semplicemente è la prima formale ma è moderna.

# Altro

Richard Montague. Fu allievo di Alfred Tarski. Creò una logica al limite tra la logica e la linguistica, o almeno un precursore, molto interessante. America degli anni 50, era omosessuale, fu assassinato in un night club e non fu fatta luce sul caso. Grammatica di Montague, una disciplina.

# Formalizzazione

Simboli. Inizialmente per abbreviare, poi per eliminare ambiguità e vaghezza.

Per la congiunzione, la Λ che non ho nella tastiera. Disgiunzione V, implicazione ->, doppia implicazione \<->, negazione ¬.

Con le lettere p e q possiamo indicare degli enunciati, e da lì "p V q" eccetera.

E anche "¬ p v (p -> q)", non piove, o se piove c'è vento. Parentesi, come nell'algebra.

# Mercoledì

Preciseremo le condizioni di verità degli enunciati complessi (tavole di verità).i