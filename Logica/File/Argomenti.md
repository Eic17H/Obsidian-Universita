@ -1,71 +1,153 @@
Un argomento è un insieme di enunciati che viene composto da un certo numero di premesse addotte a sostegno di una conclusione. Questa definizione definisce contestualmente premesse e conclusioni, senza che sia necessaria una definizione a parte. Sto etichettando un enunciato dell'insieme come conclusione, tutti gli altri implicitamente diventano premesse.

Secondo il proponente dell'argomento, chi accetta la verità di tutte le premesse dovrebbe accettare la verità della conclusione.

Per efficacia retorica, nel linguaggio naturale, potremmo posizionare la conclusione all'inizio, o alla fine, a seconda del caso. Nel linguaggio formale, la mettiamo alla fine.

L'argomentare logico nasce prima di Aristotele, prima di Socrate, prima dei pre-socratici. Viene formalizzato nel 5o secolo dai sofisti, e ha radici nella dialettica. Aveva lo scopo di persuadere l'interlocutore.

Quando le mie premesse sono vere, come negli scacchi, non lascio al mio avversario scelta diversa dall'accettare le mie conclusioni. Nel pratico, la logica ti può dire che "se piove allora o piove o c'è vento". Per sapere che piove, devi guardare fuori dalla finestra. Oppure te lo dice un'autorità; siamo molto propensi a credere e conoscere cose per autorità, magari convincendoci che siano note per esperienza: non ho visto direttamente la guerra in Iran, me l'ha detto il telegiornale.

Secondo esempio delle slide. Un argomento deve essere un insieme di enunciati, e un enunciato è un'espressione linguistica di cui ha senso chiederei se è vera o falsa. "Perché non ti compri una bella macchina a GPL?". Non è un enunciato, è una domanda, quindi formalmente non è un enunciato, quindi il testo non è un argomento. Tuttavia, è abbastanza facile capire che questo insieme di frasi *sottende* un enunciato: si può riformulare ("distillare") per ricavarne un argomento implicito. Processo di distillazione di un argomento grezzo. Nel linguaggio naturale abbiamo un argomento grezzo in cui non è chiaro cosa sia una premessa e cosa sia la conclusione. Nel linguaggio formale abbiamo un argomento distillato in cui le premesse e la conclusione sono chiaramente esplicitate e separate tra loro.

Una spiegazione, strutturalmente, è un argomento. Vedi slide. L'unica differenza è pragmatica: scopo persuasivo e scopo ???.

Da qui in avanti salteremo tra ln e lf e viceversa.

Non ho capito istanze e schemi ma credo abbia a che fare con l'affermazione precedente.

Questo schema a destra è un sillogismo disgiuntivo, o principio del cane di Crisippo. Crisippo il filosofo stoico era anche un appassionato di caccia; pensava che il sillogismo disgiuntivo fosse talmente ovvio che persino un cane da caccia la intuisce. Un cane da caccia che insegue una lepre, un sentiero ha un bivio e la lepre prende una delle due strade. Poi arriva il cane, fiuta il sentiero di sinistra, non sente la lepre, poi senza il bisogno di fiutare il sentiero di destra ci va. Nella logica rilevante ovviamente questo principio viene rifiutato; gli inventori di questa logica, parlando del principio del cane di Crisippo, dicono che solo un cane sarebbe talmente stupido da applicare questa regola.

Le lettere greche possono formalizzare enunciati semplici o composti. Vedi slide. Nello schema 2 non si capisce che è un sillogismo disgiuntivo, non è uno schema valido. Lo stesso argomento può istanziare schemi validi o invalidi. Un argomento quindi è valido se istanzia almeno uno schema valido. Lo stesso schema può formalizzare argomenti diversi. Bisogna sempre sostituire/istanziare in modo uniforme però.

# Distinguere argomenti buoni e cattivi

Argomenti che adempiono allo scopo persuasivo o esplicativo che diamo loro, e argomenti che non sono efficaci e non stanno in piedi.

Quali argomenti sono buoni? Quali sono tentativi di inganno? È una domanda sia naturale che formale. Il professore ha scritto in tal senso un manuale di autodifesa del cittadino, da usare contro politici, pubblicitari e venditori. Chiaramente il venditore può usare questo manuale per correggere i suoi metodi ed essere ancora più ingannevole.

Criteri molto rigorosi che mi danno una garanzia molto alta che la conclusione sia vera se lo sono anche le premesse. Con gli standard induttivi mi accontento di una garanzia un po' più debole.

Gli standard deduttivi sono talmente rigorosi che gli argomenti che passano il vaglio sono particolarmente poco informativi e rischiano di risultare banali. "Tutti gli uomini sono mortali, ma Socrate è un uomo, dunque Socrate è mortale". Verissimo. Ottimo argomento. E grazie al cazzo. Non ho guadagnato alcuna informazione, se sapevo già le premesse.

Gli standard induttivi saranno un equilibrio tra attendibilità dell'argomento e informatività della conclusione. Giudizi sintetici a priori, Kant.

## Standard deduttivi

Vedi slide. Argomento non minimamente persuasivo. Perché uno che viene decapitato non smette di essere umano. No, diamo per buone le premesse. L'argomento non è valido perché \[VEDI SLIDE\]. Domanda con più vittime all'orale, ricorda quella slide che ti dice se un argomento è valido o no.

Il primo standard che vediamo è l'argomento valido.

### Argomento valido

Un argomento è valido se la sua conclusione è vera **ogniqualvolta** le sue premesse sono vere.

Una definizione sbagliata è: un argomento è valido se la sua conclusione è vera **e** le sue premesse sono vere.

Tutti i tavoli hanno le gambe. Questo tavolo ha le gambe. Quindi questo tavolo è un tavolo. Verissimo, ma se lo applico a un altro soggetto. Tutti i tavoli hanno le gambe. Io ho le gambe. Quindi io sono un tavolo.

In formula, uno schema con premesse da α1 ad αn e conclusione β è valido se e solo se (&\[i=1:n] αi) -> β è una tautologia. Ossia, quando tutte le istanze dello schema di argomento sono valide. Quella formula e quella frase sono equivalenti.

Attenzione, non diciamo che *lo schema è una tautologia*. La singola formula è una tautologia, e lo schema è un insieme di formule.

Alcuni esempi di schemi di argomento validi sono il modus ponens (a->b, a | b), il modus tollens (a->b, ¬b | ¬a), e il sillogismo disgiuntivo (avb, ¬a, | b). Non sono *tutti* gli schemi validi, sono tre esempi. (come al solito sono alfa e beta ma non ho voglia). Quindi per esempio, #slide 

Sono come delle ricette per produrre schemi validi. Quando li istanzio con enunciati del linguaggio naturale, gli argomenti che ne risultano sono necessariamente validi.

### Argomenti formalmente validi

Un altro standard deduttivo abbastanza simile.

Un argomento è formalmente valido se istanzia almeno uno schema valido. Non è uguale a un argomento valido? Come fa un argomento ad essere valido senza esserlo formalmente? Dovrebbe essere uno schema valido che non istanzia nessuno schema valido. Mi sa che sto confondendo schema e argomento.

"Un equino ha quattro zampe (α), quindi un equino è quadrupede (β)". È un argomento valido, perché è un argomento (in linguaggio naturale) in cui è impossibile che la premessa sia vera e la conclusione falsa. Però non è formalmente valido, perché istanzia solo lo schema invalido α|β, in linguaggio formale. Lo schema è invalido, ma l'argomento è valido.

Vediamo un altro argomento. "Se Trump è francese, Trump è europeo. Trump è francese. Quindi Trump è europeo". È un argomento formalmente valido. Il problema è che una delle premesse è falsa: garbage in, garbage out, la conclusione è falsa. Però l'argomento è comunque valido.

C'è una bella tabella nelle #slide.

Adesso: "Briatore è un prete | Briatore è un sacerdote". È un argomento valido, però è formalmente invalido (α|β), inoltre è scorretto perché Briatore non è un prete! Quindi ci sono tre livelli: la verità (corretto), il linguaggio naturale (valido) e il linguaggio formale (formalmente valido).
Adesso: "Briatore è un prete | Briatore è un sacerdote". È un argomento valido, però è formalmente invalido (α|β), inoltre è scorretto perché Briatore non è un prete! Quindi ci sono tre livelli: la verità (corretto), il linguaggio naturale (valido) e il linguaggio formale (formalmente valido). Non esiste uno *schema formalmente valido*, gli *argomenti* sono formalmente validi o invalidi. L'aspetto teorico, cioè formale, quindi le definizioni, è importante all'orale, più degli esercizi computazionali.

## Standard induttivi
### Argomenti corretti

Appunto, un argomento è corretto quando è valido e le premesse sono vere (quindi anche la conclusione è vera).

Però, certi libri possono avere terminologie diverse. Il libro "Logica da 0 a Goedel" con "ragionamento corretto" denota gli argomenti validi. Questo è spesso dovuto a una scelta di traduzione, per esempio dall'inglese "sound", che può essere corretto, valido, sensato.

## Standard induttivi

Gli standard induttivi ci permettono di trovare gli argomenti forti: se le premesse sono vere, allora *molto probabilmente* la conclusione è vera. Quanto è alta questa probabilità? Il problema degli standard induttivi è proprio questa vaghezza. Non avrebbe senso neanche fissare una soglia ben precisa, perché farebbe violenza all'uso linguistico del termine. Sarebbe come fissare per legge un limite minimo in centimetri per il concetto di "persona alta", si potrebbe fare, ma sarebbe una violenza alla comunicazione. Eppure per altre cose si fa, "gli anziani viaggiano gratis", c'è spesso un limite minimo di età, per esempio 65 anni; questo fa violenza all'uso linguistico, nella comunicazione naturale ci sono età in cui si è incerti quando si deve decidere se descrivere qualcuno come anziano o meno, e non dipende solo dall'età.

### Argomenti forti

"Paul ha sempre vissuto in Congo, quindi Paul non sa sciare". È molto probabile che sia così, ma è possibile ci sia un controesempio. Per esempio Paul potrebbe aver viaggiato all'estero, o potrebbe essersi esercitato ogni volta che nevicava su una montagna. In inglese diremmo che sono controesempi *far-fetched*.

"Ieri Sebastiano è caduto dal terzo piano, sicuramente non vincerà la maratona". Tralasciando l'esistenza delle premesse implicite, non è un argomento valido, perché potrebbe essere caduto su un trampolino e poi su un materasso e non essersi fatto male. Ma è molto molto probabile che se la premessa è vera lo sia anche la conclusione.

Gli argomenti validi sono argomenti forti? Sì, e perché? Boh non ho capito

### Argomenti buoni

Gli argomenti buoni sono argomenti forti con premesse *plausibili*. Se Sebastiano non è caduto dal terzo piano, l'argomento è forte ma non è buono, cioè è cattivo.

"Il Lecce non ha una grande squadra e sta navigando in zona retrocessione, quindi l'anno prossimo il Lecce non vincerà lo scudetto" è un argomento invalido, ma buono. È molto probabile, ma non è sicuro. Non è impossibile che compri tutti i giocatori miglior delle altre squadre e vinca, ma è estremamente improbabile, quindi l'argomento è buono.

Se le premesse sono vere ma l'argomento è debole, l'argomento non è comunque buono "Floriana ha i capelli bagnati, quindi è piovuto da poco", sembra un argomento buono, ma non è improbabile che abbia i capelli bagnati per qualunque altro motivo. Tipico esempio di argomento debole, argomento che non sta in piedi.

### Fonti di argomenti forti

#### Argomenti analogici

Consideriamo il caso A e il caso B. Facciamo una premessa analogica: A e B hanno n caratteristiche in comune. Premessa attributiva: A ha inoltre la caratteristica x. Conclusione: anche B ha la caratteristica x.

Gli argomenti analogici non sono quasi mai validi. Ma sono forti?

Esempio: Ieri pioveva, c'era traffico, e ci abbiamo messo mezz'ora ad arrivare. Oggi piove e c'è traffico, quindi ci metteremo mezz'ora ad arrivare.

Però, non ogni analogia è argomentativa. Quando Vasco Rossi dice "sei chiara come un'alba, sei fresca come l'aria", non continua con "quindi sei l'alba e sei l'aria, e quindi l'alba è l'aria".

##### Analogie nella pubblicità

Gli argomenti analogici sono usati spesso nelle pubblicità, sotto forma di testimonial: una celebrità bella, giovane, intelligente e/o in forma usa un certo prodotto. Anche tu sei bello, giovane, intelligente e/o in forma, quindi dovresti usare lo stesso prodotto. Se non sei bello, intelligente o in forma, vale nell'altra direzione: se tu usassi il prodotto, allora anche tu saresti bello, giovane, intelligente e/o in forma. Jannik Sinner non è un esperto di tecnologia, ma il suo consiglio non ha lo stesso impatto di qualcuno con la laurea magistrale in telecomunicazioni, quindi chiamano lui per le pubblicità della Vodafone o quello che è. Questa è una fallacia?

##### Analogie nella giurisprudenza

Le analogie vengono usate nella giurisprudenza, sotto forma di precedenti. Caso di tribunale on condizioni e sentenza, caso di oggi con stesse condizioni -> stessa sentenza.

Esempio: #slide.

### Confutare l'analogia

Per attaccare l'argomento, posso attaccare la premessa analogica o la premessa attributiva.

#### Attaccare la premessa analogica

Attaccando la premessa analogica, posso attaccare la *pertinenza* delle caratteristiche comuni: "l'ultima volta che avevo scarpe nere, calze grigie, pantaloni blu e maglietta bianca ho trovato 5€ per terra, quindi se mi rimetto gli stessi vestiti troverò di nuovo 5€ per terra". Non è un argomento forte.

"Hanno queste in comune, ma questa caratteristica più importante è diversa" è un altro modo.

#### Attaccare la premessa attributiva

#slide

Dico che x non è vera essenzialmente.

#### Attaccare la premessa analogica

#slide. Non è un episodio autobiografico del professore, sia chiaro.

Le premesse attributive sono pertinenti, ma la premessa analo no guarda non ho capito #slide

#### Confutare tramite controanalogia

"Gli Stati Uniti hanno tagliato le tasse e l'economia è cresciuta, quindi se tagliamo le tasse in Italia l'economia crescerà anche qui". Controesempio: "l'Argentina ha tagliato le tasse e l'economia non è cresciuta, quindi se tagliamo le tasse in Italia l'economia non crescerà".

Possiamo confutarla anche in altri modi, sia chiaro, potremmo dire che il taglio delle tasse era diverso negli USA, o dire che l'economia non è cresciuta.

## Argomenti ad verecundiam

Per controllare la veridicità delle premesse possiamo usare l'esperienza diretta (guardare fuori dalla finestra e vedere che piove) o l'autorità: accetto una premessa perché lo dice un esperto.

*Ieri il Cagliari ha perso.* Come lo sai? *L'ho visto sul telefono*, non allo stadio. Come so che non è un filmato falso? *Beh DAZN spero proprio che non mi freghi.* In questo caso DAZN è l'autorità.

L'allunaggio. Abbiamo visto dei filmati provenienti da fonti attendibili, che sono autorità, ma non l'abbiamo visto di persona.

Non possiamo però rifiutare *tutta* la conoscenza autoritaria. Non potremmo mai attraversare un ponte perché non sapremmo se crollerà o no. Non potremmo fare nulla.

# Quindi

Gli argomenti per analogia sono un tipo di argomento forte. La premessa analogica è l'insieme di caratteristiche in comune, la premessa attributiva è la caratteristica aggiunta.

È un ragionamento induttivo no? "Un coniglio vede che tutti i giorni gli danno da mangiare alla stessa ora". È possibile da questo estrarre una legge di natura? Evidentemente no, oggi a quell'ora l'hanno avvelenato. Ma le leggi scientifiche non si formano allo stesso modo? "Ho sempre visto che il rame è sempre un buon conduttore, quindi tutti i pezzi di rame passati presenti e futuri sono buoni conduttori". C'è una differenza. Questo è il problema di Hume: *non esiste nessun criterio logicamente fondato che giustifica le generalizzazioni scientifiche. L'induzione non ha nessuna base, e quindi la scienza, che si basa sull'induzione, non ha nessuna base*. Questo è uno dei problemi filosofici più importanti. Ci sono più opzioni da qui: Hume sbaglia, Hume ha ragione (scetticismo), l'induzione non ha basi ma la scienza ha qualcosa in più che la rende fondata.