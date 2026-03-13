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

## Standard induttivi