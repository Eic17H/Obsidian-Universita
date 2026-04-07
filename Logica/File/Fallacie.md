---
cssclasses:
  - logica
---
Due classi fallacie: fallaci formali e informali.

Quelle formali sono schemi di argomento (L0, insiemi di formule), quelle informali sono argomenti (linguaggio naturale).

## Fallacie formali

Una fallacia formale è uno schema di argomento invalido ma che può essere scambiato per uno schema valido perché è molto simile e quindi ci può ingannare.

### Negazione dell'antecedente

*Se abbiamo un'implicazione e sappiamo che il precedente è falso, allora sappiamo che il conseguente è falso.*

Sarebbe ((α->β) Λ ¬α) -> ¬β. Vediamo la tabella:

| α   | ->  | β   | Λ   | ¬   | α   | ->  | ¬   | β   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 0   | 1   | 1   | 0   | 1   | 1   | 0   |
| 0   | 1   | 1   | 1   | 1   | 0   | 0   | 0   | 1   |
| 1   | 0   | 0   | 0   | 0   | 1   | 1   | 1   | 0   |
| 1   | 1   | 1   |     | 0   | 1   | 1   | 0   | 1   |
Non è una tautologia, quindi non è uno schema valido. Alla seconda riga ho un antecedente vero e un conseguente falso.

Istanziamolo e vediamo che succede: *Se il bambino fa i capricci allora i genitori gli requisiscono la PlayStation. Il bambino non fa i capricci, allora i genitori non li requisiscono la PlayStation.* Ci torna? Sembra di sì. Eppure potrebbero esserci altri motivi. Infatti se *i genitori gli requisiscono la PlayStation in ogni situazione*, è possibile che l'antecedente dello schema sia vero, ma il conseguente sia falso.

Ci inganna perché, per esempio, il modus ponens e il modus tollens hanno una struttura molto simile.

Se hai l'hobby della raccolta di funghi, sai che sei in difficoltà se c'è un fungo velenoso che somiglia moltissimo a un fungo commestibile. Le fallacie formali sono funghi velenosi.

La logica rilevante interpreta certi utilizzi della negazione dell'antecedente di un'implicazione come fallacia normale, quando in logica classica sarebbero semplicemente affermazioni vere. "Oggi non è martedì, quindi se oggi è martedì la luna è verde". Anche l'a fortiori viene considerato una fallacia nella logica rilevante.

## Fallacie informali

Argomenti in linguaggio naturali invalidi e deboli camuffati da argomenti validi e forti. Molto più comuni nelle conversazioni normali, la maggior parte degli inganni sono di questo tipo. Pubblicità, politico, persona qualunque con qui stiamo conversando.

### Fallacie dell'ambiguità

Premessa. Cos'è l'ambiguità? È un fenomeno linguistico proprio del linguaggio naturale che fa riferimento alla pluralità dei significati. Ci sono anche singole parole ambigue, come "banco", che può essere un oggetto in legno su cui posso appoggiare borsa e computer, ma anche a un istituto di credito. La parola "cellulare" si può riferire a un telefonino, ma anche a un veicolo blindato della polizia, anche se quest'ultimo uso sta cadendo in disuso, però vedi la battuta, "Dov'è Tizio? Lo stanno scaricando dal cellulare".

[[Ambiguo, vago, relativo|Attenzione a non confondere l'ambiguità con la vaghezza e la relatività.]]

Ci sono due tipi di ambiguità: lessicale e strutturale. La singola parola "banco" è ambigua. Ma anche in un enunciato che non contiene termini ambiguo ci può essere ambiguità. *Vendo letti per bambini di ferro*. Ci sono di ferro, i letti o i bambini? I singoli termini non sono ambigui, ma l'intero enunciato lo è.

Le fallacie dell'ambiguità sono argomenti deboli che sfruttano questo fenomeno per creare l'apparenza di un argomento forte.

Vediamo tre esempi: la quaternia terminorum, e due che non capisco

#### Quaternia terminorum

I termini si basano, di nuovo, sulla logica medievale, quindi si usa il latino.

Sillogismo aristotelico, una forma di argomento con premessa e conclusione: *tutti gli uomini sono mortali, tutti i greci sono uomini, quindi tutti i greci sono mortali*. Premesse e conclusione hanno una forma che viene dalla teoria aristotelica, "tutti gli A sono B", è un po' limitante rispetto alla teoria che studiamo noi. Le due premesse sono fatte in questo modo: soggetto, predicato, ciascun soggetto o predicato accomuna due elementi del sillogismo; il termine in comune tra le premesse è detto termine medio, che scompare nella conclusione, dove compaiono il soggetto di uno e il predicato dell'altro. Crash course di sillogistica. Il sillogismo è valido quando rispetta certe caratteristiche, ma la presenza del termine medio è fondamentale.

I medievali si convinsero del fatto che in un sillogismo, perché il termine medio funzioni, bisogna che questo abbia lo stesso significato in entrambe le premesse, perché se cambio il significato tra una premessa e l'altra è come se fosse due termini diversi, quindi ho quattro termini: *quaternia terminorum*.

"L'Italia è il bel paese. Il bel paese è un formaggio. Quindi l'Italia è un formaggio". Non capita spesso di farci ingannare così.

#### Anfibolia

Sfrutta l'ambiguità strutturale. "Mi è stato vietato di bere dal dottore, quindi berrò dall'avvocato".

##### Fallacia dell'accento

L'ambiguità non è indotta dal significato né della disposizione dei termini, ma su quale parola viene accentuata, o enfatizzata. "Facciamo in modo di non incontrare *Giorgio* in facoltà", odia Giorgio, "ok allora incontriamo Giorgio al bar". Perché poteva essere "facciamo in modo di non incontrare Giorgio *in facoltà*".

Queste sono fallacie innocue che possono farci ridere.

### Fallacie della rilevanza

Si dividono in propriamente dette e ad hominem. Queste ultime attaccano l'argomento proposto attaccando la persona che lo propone. *È come un intervento sul giocatore anziché un intervento sulla palla*.

#### Fallacie della rilevanza in senso stretto

##### Ignoratio elenchi

Elenchos significa confutazione. Ignoriamo la confutazione.

Il proponente prende un argomento forte e ci convince della sua forza. Poi, senza che ce ne accorgiamo, sostituisce la sua conclusione con quella di cui ci vuole convincere, che invece formerebbe un argomento debole. Sembra un gioco di prestigio.

Esempio: il pubblico ministero che dice "questa anziana signora che non ha mai fatto niente a nessuno è stata assassinata per rubarle pochi soldi, e quindi l'imputato va severamente condannato". Sarebbe forte se la conclusione fosse "il colpevole va severamente condannato", ma noi ancora non sappiamo se l'imputato è il colpevole.

Una variante è la fallacia del manichino.
##### Fallacia del manichino

Presento la posizione a cui mi voglio contrapporre, dando una versione caricaturale delle sue tesi, per avere gioco più facile per confutarle.

Mi voglio opporre alle politiche ecologiste, quindi dico "gli ecologisti vorrebbero tornare all'età della pietra, vogliono rimuovere completamente i veicoli a benzina, portare immediatamente a 0 le emissioni, quindi niente di ciò che dicono va ascoltato". Le vere posizioni degli ambientalisti sono più moderate di quelle presentate.

Sostituisco le tesi che voglio confutare con altre che sono più facili da confutare.

"Strawman fallacy", la fallacia dell'uomo di paglia. Nel medioevo i cavalieri si addestravano sui manichini, perché i manichini sono più facili da sconfiggere rispetto a quelli veri.
#### Ad hominem
##### Tu quoque

"Anche tu", "persino tu", famosamente detto da Cesare a Bruto.

Qualcuno ci propone un argomento forte. Ma noi ci rendiamo conto che il proponente ha un comportamento personale che è incoerente con quello che sta dicendo, e quindi gli diciamo "proprio tu mi vieni a dire di non fare questa cosa che tu stesso fai".

Argomentativamente è scorretto perché stiamo prescindendo dalla considerazione del nesso che lega le premesse alla conclusione. Qualunque sia il comportamento del proponente, l'argomento può comunque essere valido.

Il tu quoque è omnipervasivo nella comunicazione quotidiana. "Dovremmo smettere di usare le volgarità nel lessico di tutti i giorni, altrimenti la comunicazione si imbarbarisce", è sensatissimo, ma puoi rispondere con "senti chi parla" e zittirlo immediatamente.

"De virtute non de me loquor" diceva Seneca, "io parlo della virtù, non di me, quindi non accusatemi di essere incoerente". Seneca era contro la ricchezza pur essendo ricco egli stesso.

##### Avvelenamento del pozzo

Si vieta a qualcuno, per dei motivi che possono essere vari, di esprimersi su un argomento, perché non sarebbe degno di esprimere un'opinione su quell'argomento.

"È ora di smetterla con quegli atteggiamenti troppo lassisti/severi nell'educazione della prole", "che ne sai tu che non hai figli?". Chi non ha figli non dovrebbe esprimersi sul modo in cui si crescono i figli?

Nell'argomento ad verecundiam le credenziali sono importanti perché sono la condizione che rende valida la premessa, qui no, perché la premessa non si basa sulle credenziali del proponente.

### Fallacie emotive

Argomenti deboli che vengono camuffati da argomenti forti attraverso un appello a certe emozioni del destinatario, facendo in modo che queste emozioni interferiscano col processo di valutazione del nesso tra premessa e conclusione. Uso le emozioni come disturbo.

Può essere l'emozione della paura, l'emozione della pietà, l'emozione della piaceria o conformismo.

#### Fallacia ad baculum

Paura di una minaccia (bastonate, baculum).
 
"Professore, è giusto che lei mi promuova, sarebbe un peccato se la sua macchina prendesse fuoco".

Diventa un argomento forte con un piccolo cambiamento, "Professore, è materialmente conveniente per lei promuovermi, ...". Diventa solo moralmente discutibile. È comunque un *argomento* ad baculum, ma non è una fallacia.

#### Fallacia ad misericordiam

Fallacia molto diffusa. "È in contravvenzione per aver parcheggiato in terza fila", "ma stavo andando a San Giovanni a trovare mia madre ammalata".

"Se qualcuno parcheggia in terza fila, allora è possibile sia soggetto a contravvenzione", questo è un argomento forte, lo si prova a confutare usando le emozioni.

### Fallacia ad populum

Conformismo.

Trump dice che le sue affermazioni sono corrette perché prendono molti like. "Poiché questo enunciato è condiviso da un grande numero di persone, allora è corretto".

Cerca di insinuare nel destinatario un senso di simpatia o anche di condivisione. "Io sono come te". Un candidato alle elezioni che ha un curriculum di studi impeccabili e un'ottima conoscenza della lingua, ma per somigliare al popolo infila uno strafalcione grammaticale ad arte nel suo discorso. "Votate il premier operaio", che operaio non era.

L'argomento ad populum può essere un argomento forte, per esempio se cerco la strada per un concerto e vedo tutti fare la stessa strada posso supporre che sia la strada giusta.

### Fallacia statistica

Attraverso un uso sbagliato degli strumenti della statistica si formano delle generalizzazioni di tipo induttivo (come quella del coniglio) o generalizzazioni statistiche che non sono legittimate.

Le generalizzazioni statistiche sono di questo tipo: "Poiché nel mio campione una caratteristica è presente nel 60% dei casi, allora è presente nel 60% della popolazione totale", come i sondaggi di opinione per le elezioni.

Spesso è un argomento giustificato, ma certe volte no. Certe volte non si tiene sotto controllo una certa variabile di disturbo. Per esempio, siamo nella prima repubblica, c'è un partito che si rifà alla dottrina della chiesa e ha un sacco di voti; faccio un sondaggio di opinione per le elezioni, la domenica davanti a una chiesa dopo una messa. Nel mio sondaggio, quel partito è preferito da più persone rispetto a quelle del voto insomma una frase uscita male. Tutti i miei campioni avevano una certa caratteristica in comune.

Un altro esempio: "ius soli, gli italiani non vogliono sentirne parlare, secondo un sondaggio nel profilo instagram di Salvini". Chi visita il profilo instagram di Salvini è più propenso ad avere certe opinioni.

Il campione potrebbe essere anche troppo piccolo. "Tutti i miei amici romeni sono cattive persone, perciò tutti i romeni sono cattive persone", ne conosco solo due.

#### Fallacia della linea di base

Dati fittizi: "Chi lo dice che la medicina moderna è più efficace di quella tradizionale? Rispetto al 1890 il numero di decessi per tumore nel nostro Paese è aumentato del 10%". Semplicemente nel 1890 molte cose che adesso sappiamo essere tumori non erano riconosciute come tali, ma poi è anche aumentata la popolazione. L'incidenza relativa è diminuita, eppure i dati presentati sono compatibili con la diminuzione dell'incidenza relativa.

#### Fallacia di Montecarlo

La peggiore di tutte, tipica dei ludopatici. Se al lotto punto su un numero ritardatario (non esce da tante settimane) è più probabile che vinca. Se è uscito testa 5 volte di fila è più probabile che ora esca croce. Se negli ultimi 500 reset non è stato shiny sicuramente tra un po' lo becco shiny (non sto sicuramente criticando uno specifico amico).

È un'interpretazione scorretta della *legge dei grandi numeri*: se io ho un fenomeno che può avere più esiti diversi equiprobabili e lo osservo tantissime volte, tutti gli esiti saranno osservati all'incirca lo stesso numero di volte. Quindi se non esce un numero del lotto da tante settimane, sicuramente adesso recupera quelle che ha perso per tornare in pari con gli altri. Esempio classico di fraintendimento di un teorema matematico: il limite per n tendente all'infinito fa sì che tutti i numeri hanno la stessa incidenza, ma 40 settimane di ritardo di un numero non sono infinite, potrebbe recuperarle con un'incidenza ogni 300 anni per 10000 anni o qualcosa del genere.