---
cssclasses:
- logica
---
Hilbert è bello perché è sistematico, si presta bene a dimostrare teoremi metateorici, vedremo nel terzo modulo il teorema di completezza. Nella deduzione naturale viene bene lavorare dentro.

Nel calcolo delle sequenze, avremo dal punto di vista della gestione della derivazione qualcosa di ancora più amichevole e semplice. Il prezzo da pagare in questo caso è una maggiore complessità degli oggetti formali su cui andremo a lavorare, non formule ma sequenze.

Il simbolo che usiamo è $PK$, che non è quello che usa Gentzen ma quello che usa il libro.

Questi $A$ e $B$ che vediamo sono lettere latine, singole formule, e non lettere greche.
# [[Logica/File/Calcolo dei Sequenti/Storia|Storia]] e nome

Introdotta nel 1934 da Gentzen, allievo di Hilbert.

L'obiettivo, come col calcolo alla Hilbert, era la formazione della matematica: dimostrare che il calcolo formale dell'aritmetica non può portare a contraddizioni.

Il libro lo chiama "calcolo dei sequenti", Paoli preferisce "calcolo delle sequenze", perché Gentzen nei suoi scritti usa la parola "Sequenz". Perché sequenti quindi? Negli anni 50, Kleene lo traduce come "sequent", avendo già usato "sequence" con un altro significato.

# Sequenza

Manipoliamo oggetti formali diversi dagli altri due. Con Hilbert dimostriamo formule di $\mathcal{L}_0$, con la deduzione naturale deriviamo formule di $\mathcal{L}_0$. Qui non operiamo su formule ma su *sequenti* di forma $Γ \Rightarrow Δ$:

> **Sequente** $Γ \Rightarrow Δ$: coppia ordinata di successioni finite o vuote di formule di $\mathcal{L}_0$, separate da un simbolo convenzionale chiamato *freccione*.

Attenzione, qui, i simboli $Γ$ e $Δ$, non sono insiemi, ma successioni, dove l'ordine ha importanza. Inoltre, importa anche il numero di occorrenze di ciascuna formula.

Per esempio, una sequenza è:$$p \land q, \; r, \; p\rightarrow q, \; p \rightarrow q \enspace \Rightarrow \enspace q \lor r, \; \lnot p \lor r$$Quello che c'è a sinistra si chiama l'*antecedente* di una sequenza, e quello che c'è a destra si chiama *conseguente*. Ciascuno può essere vuoto, come abbiamo detto, o possono esserlo entrambi. Quindi $\Rightarrow$ è una sequenza.

Come si interpretano intuitivamente le sequenze? $Γ \Rightarrow Δ$ significa "se sono vere *tutte* le formule di $Γ$, allora *è vera* almeno una formula di $Δ$". "Se è vera la congiunzione delle formule del conseguente, è vera la disgiunzione delle formule del conseguente". Questa è una nozione informale, non vediamo una vera e propria congiunzione scritta nell'antecedente, è la lettura informale della virgola nell'antecedente, mentre nel conseguente la leggiamo come una disgiunzione.

Inoltre, la sequenza vuota indica un assurdo, quindi se riusciamo a dimostrare la sequenza vuota allora il nostro calcolo è contraddittorio. Un antecedente vuoto è sempre vero (non esiste un elemento falso), un conseguente vuoto è sempre falso (non esiste un elemento vero).

Confrontiamo i postulati. Hilbert ha tanti assiomi e una regola, ma non ha assunzioni. La deduzione naturale non ha assiomi, ha assunzioni, e ha tante regole. E il calcolo dei sequenti? Ha un assioma e tante regole, ma non tutte riguardano i connettivi logici. Le regole dei connettivi sono solo di introduzione, e si dividono in sinistre e destre. Le altre regole sono *strutturali*, operano sulla struttura delle sequenze.

Tra l'altro, le sequenze sono inferenze. E quindi queste operazioni sono inferenze di inferenze, "se ho queste inferenze, ho quest'altra inferenza", stiamo facendo metainferenze.

# Postulati

## Assiomi

L'unico assioma è:$$p \Rightarrow p$$Dove $p$ è una variabile proposizionale.

Una sorta di principio di identità, quindi è anche detto assioma di identità: ogni variabile può essere derivata da sé stessa.

Vediamo che $p$ è una variabile proposizionale, non è come $α$ e $β$, non contiene connettivi. Quindi qualcosa come $r \lor q \Rightarrow r \lor q$ non è un assioma. È un problema? In realtà no, perché si dimostra che tali schemi sono veri con il [[Eliminazione dell'identità||teorema di eliminazione dell'identità]].

## Regole strutturali

### Scambio sinistro e destro:

Vedi dal libro (Fazio, Ledda, Perco..., pagina 141).

$$\dfrac{Γ,A,B,Π \Rightarrow Δ}{Γ,B,A,Π \Rightarrow Δ}ss \enspace \enspace \enspace\dfrac{Γ \Rightarrow Δ,A,B,Π}{Γ \Rightarrow Δ,B,A,Π}sd$$
$Π$ può anche essere vuoto, cioè non esistere.

Perché valgono queste regole? Perché la congiunzione e la disgiunzione sono commutative.

Posso scambiare formule anche che non sono affiancate, impiegando più passaggi. In quel caso scrivo una riga doppia (cosa che non posso fare in questo documento per limiti tecnici).

Perché quindi sono serie e non insiemi? Perché serve per una dimostrazione particolare che serviva a Gentzen, che con gli insiemi è un disastro. Ci sono anche versioni insiemistiche di questo calcolo.

### Contrazione sinistra e destra:
$$\dfrac{A,A,Γ \Rightarrow Δ}{A,Γ \Rightarrow Δ}cs \enspace \enspace \enspace\dfrac{Γ \Rightarrow Δ,A,A}{Γ \Rightarrow Δ,A}cd$$
Questo è perché la congiunzione e la disgiunzione sono idempotenti. Posso farla anche se non sono consecutive e all'inizio/fine (*posizione attiva*)? Sì, basta scambiare.

### Indebolimento sinistro e destro

Questo può sembrare più strano.$$\dfrac{Γ \Rightarrow Δ}{A,Γ \Rightarrow Δ}is \enspace \enspace \enspace\dfrac{Γ \Rightarrow Δ}{Γ \Rightarrow Δ,A}id$$
Perché? Beh, perché se sono vere tutte le formule in $Γ$ e $A$, sono vere anche tutte le formule in $Γ$. Ed è ancora più evidente con la disgiunzione.

È qui che diventa elegante dare un significato diverso alla virgola a sinistra e a destra del freccione: ci dà questa simmetria delle regole strutturali, senza la quale non avremmo più l'indebolimento destro.

### Cesura

È una sorta di principio di transitività del freccione:$$\dfrac{Γ\RightarrowΔ,A \enspace \enspace A,Γ\RightarrowΔ}{Γ\RightarrowΔ}cut$$
Se ho due formule che differiscono solo per la posizione di una formula, cioè se si trova nell'antecedente o nel conseguente, allora posso eliminarla, tagliarla, e infatti *cesura* e *cut* significano *taglio*.

Come funziona? Vediamo un esempio con formule singole.$$\dfrac{B\Rightarrow C,A \enspace \enspace A,B\Rightarrow C}{B\Rightarrow C}cut$$
La prima ci dice che se $B$ è vera, allora $C$ o $A$ è vera. Nel primo caso, sappiamo che $B \Rightarrow C$ è vera. Nel secondo caso, allora sappiamo che sono vere sia $A$ che $B$, quindi per $A,B \Rightarrow C$ lo è anche $C$, e quindi $B \Rightarrow C$ è vera.

La cesura è un po' scomoda. C'è [[Cesura modificata|una variante]], che possiamo chiamare $cut*$.
## Regole operazionali

Abbiamo solo introduzione, quindi vedremo connettivi solo al piano di sotto, ma potenzialmente sia a sinistra che a destra.

### Negazione

Dal mostro che abbiamo visto in ND, passiamo a queste che sono semplicissime.$$\dfrac{Γ \Rightarrow Δ,A}{¬A,Γ \Rightarrow Δ}¬s \enspace \enspace \enspace\dfrac{A, Γ \Rightarrow Δ}{Γ \Rightarrow Δ,¬A}¬d$$
Perché valgono? Essenzialmente De Morgan.

### Congiunzione

$$\dfrac{Γ,A,B \Rightarrow Δ}{Γ, A \land B \Rightarrow Δ}Λs \qquad \dfrac{Γ \Rightarrow A,Δ \qquad Γ \Rightarrow B,Δ}{Γ \Rightarrow A \land B, Δ}Λd$$

A sinistra, sto traducendo la nozione metalinguistica della virgola in una nozione in $\mathcal{L}_0$ della congiunzione. Anche questa regola assume una [[Congiunzione modificata|variante]].

A destra, parto da due sequenze, e congiungo l'elemento non in comune. Perché se l'elemento in comune non è vero, allora con il terzo escluso so che sono veri quelli non in comune.

### Disgiunzione

$$\dfrac{Γ,A \Rightarrow Δ \qquad Γ,B \Rightarrow Δ}{Γ, A \lor B \Rightarrow Δ}Vs \qquad \dfrac{Γ \Rightarrow A,B,Δ}{Γ \Rightarrow A \lor B, Δ}Vd$$

Qual era l'altro difetto di ND? Noi dalle tavole di verità abbiamo visto che la congiunzione e la disgiunzione hanno una forte relazione di simmetria, che in ND si perde, perché $Λ\text{-}I$ non è il rovescio di $V\text{-}E$. Qua invece ritorna la perfetta simmetria, solo che anziché avere introduzione ed eliminazione abbiamo destra e sinistra.

### Implicazione

$$\dfrac{Γ \Rightarrow A,Δ \qquad Σ,B \Rightarrow Π}{Γ,Σ, A \rightarrow B \Rightarrow Δ,Π}\rightarrow s \qquad \dfrac{Γ,A \Rightarrow B,Δ}{Γ \Rightarrow A \rightarrow B, Δ}\rightarrow d$$

Qui la regola destra è più facile da capire.

Supponiamo che Gamma e Delta siano vuoti. Ci dice che se B segue da A, allora B è implicato da A. Intuitivamente possiamo estenderlo dicendo che Gamma e Delta sono già veri, e l'unico fattore decidente rimasto è A>B.

Quella a sinistra è più difficile da capire intuitivamente quindi per ora la diamo per vera.

Nota personale alle 3 del mattino: Noi da sotto sappiamo che valgono $Γ$ e $Σ$, e che se vale $A$ vale anche $B$. Perché sia valido deve quindi valere o $Δ$ o $Π$. Guardiamo a sinistra: noi sappiamo che $Γ$ vale, quindi o vale $A$ o vale $Δ$. Se vale $Δ$, allora la parte di sotto vale. Se invece vale $A$, allora vale anche $B$, e visto che vale anche $Σ$ deve valere $Π$, che comunque verifica la parte di sotto. Confonde perlopiù perché stiamo guardando le regole in top-down ma poi facciamo gli esercizi in bottom-up.

# Particolarità

Gli alberi come nodi non hanno formule ma sequenze, quindi ciò che voglio derivare non sono formule ma sequenze. Inoltre, alle foglie posso avere assiomi, visto che adesso ne esiste uno. Di nuovo, se alle foglie non ho assunzioni, ho di nuovo un teorema, $\vdash_{PK}Γ\RightarrowΔ$.

# Dimostrazioni

$\vdash_{PK} \; \Rightarrow p \land (p \rightarrow q) \rightarrow q$

Insieme vuoto di assunzioni, e antecedente altrettanto vuoto. Il conseguente contiene una singola formula.

Senza assunzioni, diciamo derivazione e non dimostrazione.

Noi diciamo che i calcoli sono equivalenti, generano tautologie. Ma qui i nodi sono sequenze, che non possono essere tautologiche. Quindi qui diciamo che l'equivalente è una sequenza con antecedente vuoto e conseguente tautologico.

Nella vita, ci sono due stili di pensiero. Top-down e bottom-up. La differenza? Lo stile top-down parte dalle premesse e arriva alle conclusioni, come abbiamo fatto finora. Lo stile bottom-up invece, parte dalla conclusione, e si chiede come lo si può derivare dagli assiomi. In PK, il bottom-up è molto più produttivo per trovare le dimostrazioni, smontando le formule che ho già, mentre lo stile top-down si usa per verificarle.

Vediamo il fondo: $\Rightarrow p \land (p \rightarrow q) \rightarrow q$. Come l'ho ottenuta, nell'ultimo passaggio? Per scambio? No, c'è solo una formula. Contrazione? Magari. Indebolimento? In teoria sì, da $\Rightarrow$, ma sarebbe un disastro, perché sarebbe una contraddizione. Oppure per cesura, ma anche quello è un problema, perché dovrei tirare a casaccio. Operazionale? Vediamo

Qual è il connettivo principale? L'implicazione. Regola di implicazione destra. Sposto l'antecedente a sinistra.$$\dfrac{p \land (p \rightarrow q) \Rightarrow q}{\Rightarrow p \land (p \rightarrow q) \rightarrow q}\rightarrow d$$
Abbiamo fatto un passettino.

Abbiamo un'altra sequenza. Come l'abbiamo ottenuta? Sì, tutto da capo. Potremmo vedere le regole strutturali, ma prima smontiamo tutti i connettivi logici. Congiunzione, vediamo l'introduzione della congiunzione.$$\dfrac{\dfrac{p, \; p\rightarrow q \Rightarrow q}{p \land (p \rightarrow q) \Rightarrow q}}{{\Rightarrow p \land (p \rightarrow q) \rightarrow q}\rightarrow d} \land s$$
Rimane l'implicazione, ma non è in posizione attiva.

Sto facendo un casino, da rifare, il modo in cui digito funziona solo top down.

Scambo sinistro, ora è in posizione attiva.

Implicazione sinistra, si divide in due. Il contesto, che sono le formule che ci sono ma non stiamo usando, dobbiamo ricopiarle su entrambi i rami. ss, con A=p, B=q, Gamma=successione il cui unico elemento è p, Delta = succession il cui unico elemento è q.

Adesso a sinistra abbiamo un quasi assioma. C'è quella q che mi ferma. E come la togliamo? C'è in realtà una sorta di De Vizia, l'indebolimento. Vedo una formula che non voglio (deve essere in posizione attiva), e con l'indebolimento destro la tolgo. Siamo arrivati a sinistra a una foglia $p \Rightarrow p$, che è un assioma, e lui ha scritto $p \xRightarrow{\times} p$ per chiuderla. Facciamo la stessa cosa a destra, ma con scambio sinistro e indebolimento sinistro, ottenendo $q \xRightarrow{\times} q$.

Se ci blocchiamo, visto che dobbiamo fare scelte, si fa *backtracking* e si fa un'altra scelta. Quindi non è un processo poi così algoritmico.

[[Esempi|Vedi altri esempi]]

# Logica intuizionista

Ma come facciamo qui a ottenere l'altra logica, quella intuizionista? Gentzen la presentò insieme a quella classica. È molto semplice: basta avere $Γ \Rightarrow Δ$ in cui $Δ$ contiene al più una formula.

Per esempio, $\Rightarrow α \lor ¬ α$, un intuizionista non lo vuole fare. Vediamo che succede:$$\dfrac{\Rightarrow p,\;¬p}{p \lor ¬ p}$$E qui abbiamo già finito, perché ci sono due formule a destra. Non possiamo smontare la disgiunzione a destra.

# Algoritmo

Abbiamo visto che l'unica regola che distrugge informazione è la cesura, il $cut$. C'è una formula che scompare. È un problema solo estetico o anche di altro tipo? Altro tipo. Supponiamo di voler rispondere a questa domanda: presa una sequenza arbitraria, esiste un algoritmo che entro un tempo finito mi dice se la sequenza è dimostrabile? Anche non efficiente, ma terminante.

Come facciamo? Per esempio, partiamo dalla sequenza, e creiamo un albero, vedendo tutte le possibili premesse e regole da cui possiamo averla derivata, e continuiamo ricorsivamente ad ogni foglia di questo albero di esplorazione. Se c'è a un certo punto un sottoalbero che chiude, allora la sequenza è dimostrabile. Se nessuna di queste possibilità funziona, allora la sequenza non è dimostrabile. Ricerca esaustiva.

Semplice a dirsi, ma per renderlo un algoritmo, c'è bisogno che questo albero sia finito, quindi c'è bisogno un numero finito di premesse da cui lo si può ottenere. E l'unica regola che crea problemi è la cesura, perché se ho ottenuto $Γ \Rightarrow Δ$ con la cesura, significa che ho tagliato una certa formula, e quale? Può essere qualunque, c'è un numero infinito di possibili coppie di premesse da cui posso averla derivata.

Significa che non esiste un tale algoritmo? No, perché fortunatamente, Gentzen, sempre nella sua tesi di dottorato, dimostra che la regola di cesura è eliminabile. Cosa significa? Significa che se, nel calcolo PK riesco a dimostrare una sequenza usando la cesura, riesco a dimostrarla anche senza. La cesura serve solo a velocizzare le dimostrazioni, è una short$cut$, e infatti nota come non l'abbiamo mai usata negli esercizi, non è necessaria nelle dimostrazioni.

Fuori dalle dimostrazioni, quindi con le assunzioni, la cesura non è più eliminabile. Questo però non riguarda né noi né l'algoritmo.

Abbiamo risolto la decidibilità di PK? No, manca ancora la contrazione. Questa è più sottile, ma ci facciamo un ragionamento.

La regola di contrazione non distrugge informazione, procedendo a ritroso non ho un numero infinito di candidati. L'insidia è più celata.

Supponiamo di aver ottenuto qualcosa per contrazione, $\dfrac{a,\;a,\;Γ \Rightarrow Δ}{a,\;Γ\RightarrowΔ}$. Ma quella di sopra potrebbe anch'essa venire da una contrazione. Chiaramente non può davvero andare all'infinito, ma la sottigliezza sta che non c'è un *bound* superiore che limita a che punto finirà questa catene di contrazioni. $\forall k \in \mathbb{N},\; \exists$ una tale catena.

Ma Gentzen, sempre nella sua tesi di dottorato, risolve il problema. Professor Paoli la confronta al personaggio dei cartoni *Eta Beta*, che ha tasche piccole dai contenuti infiniti, così come una singola tesi di dottorato tira fuori infinite soluzioni ai problemi.

Gentzen dimostra che il *bound* in questione è... 3. Tre? III. Risolto il problema, ez, il problema è sempre decidibile. PER LA LOGICA PROPOSIZIONALE, coi quantificatori è indecidibile.

È un problema *hard*, un problema [[PR1/Modulo I/Complessità|esponenziale]], con parametro la lunghezza dell'input.

# Armonia

Dummet risponde alle critiche su $tonk$ dicendo che le regole di un connettivo devono essere in armonia tra di loro. Si riferiva al calcolo della deduzione naturale, però l'inferenzialismo si può fare anche col calcolo delle sequenze, in cui le regole che devono stare in armonia sono la regola sinistra e quella destra. Vedremo che i due calcoli si possono trasformare l'uno nell'altro.

La regola sinistra sa di cosa ha bisogno la regola destra e viceversa, questa è la loro armonia.