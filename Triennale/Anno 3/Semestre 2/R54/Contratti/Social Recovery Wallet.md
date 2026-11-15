---
cssclasses:
  - r54
---
Concettualmente, è un salvadanaio. Ci sono due tipi di utente: proprietario e guardiani. Il proprietario ha una password, se la perde i guardiani possono eleggere unanimamente un nuovo utente. Questo salvadanaio non è un salvadanaio, avevo capito male. Anziché usare il proprio conto per fare affari con altri, il proprietario può usare il salvadanaio come tramite, cioè invia comandi al salvadanaio e quello li esegue come se fosse l'utente stesso. Il proprietario può rimuovere guardiani: richiede la rimozione, aspetta tre giorni, dopo tre giorni la può annullare oppure può nominare un sostituto, solo se nomina un sostituto il guardiano viene rimosso e sostituito.

Le proprietà sono:
* **no-recov**: Il recupero è impossibile (falso).
* **owner-cannot-change**: Il proprietario non può essere cambiato (falso).
* **recov-fails**: Il recupero fallisce se non partecipano abbastanza guardiani.
* **recov-implies-guardian**: Se qualcuno ha partecipato a un recupero, è un guardiano (falso, perché può aver partecipato e poi essere stato rimosso).
* **recov-succeeds**: Se hanno partecipato abbastanza guardiani, il recupero ha funzionato e il nuovo proprietario è quello scelto.

Per ora le versioni sono:
* **v1**: Normale.
* **v2**: Non si possono togliere guardiani.

Farei:
* **v3**: Non si può cambiare proprietario.
* **v4**: Quando si prova a cambiare proprietario, il nuovo proprietario è il guardiano che ha proposto il voto.
* **v5**: Quando si prova a cambiare proprietario, se il proprietario corrente non è l'originale, il nuovo proprietario è l'originale.
* **v6**: Qualunque indirizzo è considerato guardiano.
* **v7**: Qualunque indirizzo è considerato proprietario.
* **v8**: Il proprietario è sempre un guardiano.
* **v9**: Quando si cambia proprietario, il vecchio proprietario sostituisce il guardiano che ha proposto il voto.
* **v10**: Quando si propone di cambiare proprietario, il guardiano che ha proposto il voto diventa il proprietario, e l'indirizzo scelto come nuovo proprietario prende il suo posto.
* **v11**: Il recupero non richiede un numero minimo di guardiani.
* **v12**: Il recupero ha un numero massimo di guardiani.
* **v13**: Il recupero fallisce sempre.

I test SolCMC sono tremendi, usano la vecchia nomenclatura per le proprietà che le numera e basta, e sono presenti tante versioni per ogni test (a che ci serve Git, no?). Non ci sono test Certora. Ah no ok i test SolCMC sono di Franco Sainas, che è il primo dev di questo progetto, quindi va bene dai, è roba vecchia. I test sono lunghissimi, cos'è. Ah mi sa che contengono il contratto in sé, perché risalgono a prima dello script Python.

Ti dirò, **v9** è più difficile di quanto sembrasse. Nel senso che per tutte le altre ci ho messo due minuti e per questa cinque.

Fare la ground truth per tutti è stato molto noioso, alla fine sono arrivato a **v19** e ci ho messo 45 minuti.

Sarà più difficile fare i test, perché la struttura del contratto mi sembra un po' contorta, ma sono solo 5 proprietà, quindi 10 test. Dopo mi scrivo le proprietà in linguaggio semi-formale.

* **no-recov**: $\vdash recovery \to revert$
* **owner-cannot-change**: $\vdash owner = firstOwner$
* **recov-fails**: $|\{x\ |\ x \in Guardians \land x.recovery()\}|<threshold \vdash recovery \to revert$
* **recov-implies-guardian**: $x.recovery() \vdash x \in Guardians$
* **recov-succeeds**: $|\{x\ |\ x \in Guardians \land x.recovery(newOwner)\}| \geq threshold \vdash (recovery \to \lnot revert) \land owner_{after}=newOwner$

$x \to revert$ si fa come `x(); assert(false);`.

Non so bene perché questa non funzioni:
```CVL
invariant owner_cannot_change()
    currentContract.owner == currentContract._first_owner;
```

Ok piccolo problema.

```CVL
invariant recov_implies_guardian(address a)
    currentContract.guardianToRecovery[a].usedInExecuteRecovery
    => currentContract.isGuardian[keccak256(
		currentContract.abi.encodePacked(a)
	)];
```

Questa cosa non funziona. Perché? Perché non esiste `abi` in Certora. `abi.encodePacket()` è una cosa per mettere un indirizzo in 20 byte perché sia possibile passarlo a `keccak256()`. E non si può fare in Certora.

E anche **recov-succeeds** non va bene, perché a Certora non piacciono gli array... È ciò che direi se fosse vero. Invece esistono `forall` e `exists`. Per esempio:

```CVL
require forall uint256 i . i < currentContract.esempio.length =>
	(currentContract.esempio[i] / 2) * 2 = currentContract.esempio[i];
```

Significa $\forall i,\ i<|esempio| \to esempio_i /2\times 2 = esempio_i \vdash$.

Comunque non riesco a fare neanche questa perché serve l'hash.

Ok quelli di SolCMC sono già fatti da Franco Sainas.

Piccolo problema, il test SolCMC vuole eseguire `executeRecovery` che però è esterna e quindi non può.

Ci ha messo quasi un'ora e mezza a far girare tutti i test.

Cosa vediamo di brutto? Oltre ai miei errori della ground truth.

SolCMC
* **recov-implies-guardian** FNv2v14: non so, i guardiani non possono cambiare quindi non capisco perché negativa.
* **recov-fails** ERR: `external` non gli piace. e se usassi il contratto stesso per chiamarla esternamente? non ha senso.
* **recov-succeeds** ERR: `external` non gli piace.

Certora:
* **no-recov** FNv16v17: potrei provare con `assert !currentContract._recovered;`
* **owner-cannot-change**: dà negativo a tutto
* **recov-succeeds**: dà negativo a tutto ma so che non funziona

Onestamente se funziona questo non so quanto altro vada fatto a questo contratto.

---

**recov-succeeds** fallisce perché la funzione è esterna. Mi sembra il momento giusto per usare preghost e postghost. No non funziona ok. Questa era la mia idea:

```Solidity
/// @custom:ghost
address newOwner;
address[] guardianList;

/// @custom:preghost function executeRecovery
require(guardianList.length >= threshold);
require(inRecovery == true);
for (uint i = 0; i < guardianList.length; i++) {
    require(isGuardian[keccak256(abi.encodePacked(guardianList[i]))] == true);
    require(guardianToRecovery[guardianList[i]].proposedOwner == newOwner);
    require(guardianToRecovery[guardianList[i]].recoveryRound == currRecoveryRound);
}

/// @custom:postghost function executeRecovery
assert(owner == newOwner);

/// @custom:invariant
function invariant(address newOwner_, address[] calldata guardianList_) public {
    newOwner = newOwner_;
    guardianList = guardianList_;
}
```

Ma dà positivo a tutto. Ma la speranza non è persa. Pensaci. Se reverta a me non va bene, e non mi va bene neanche se l'owner non è quello giusto. Ma se reverta passa per forza. È finalmente il momento di usare `/// @custom:negate`. Quindi asserisco che l'owner sia sbagliato, il che raggruppa l'owner sbagliato insieme al revert.

Ha senso? Non per forza. C'è ancora il problema di De Morgan. Cosa intendo? Se chiamiamo la proprietà che voglio controllare `ok` (nel nostro caso `ok = (owner == newOwner)`), e il modello $x$:

* $assert(ok) \Rightarrow \forall x,\ (x \to ok) \lor revert$
* $assert (\lnot ok) \Rightarrow \forall x,\ (x \to \lnot ok) \lor revert$
* $negate,\ assert(ok) \Rightarrow \exists x,\ (x \land \lnot ok) \land \lnot revert$
* $negate,\ assert(\lnot ok) \Rightarrow \exists x,\ (x \land \lnot ok) \land \lnot revert$

Io ho fatto l'ultima, che significa "esiste un modello che viola l'assert senza revertare". È quello che voglio? Non so, io vorrei $\forall x,\ (x \to \lnot ok) \to revert$. Voglio vedere se è equivalente all'altra. Proverei a usare il calcolo logico ma visto che non conosco bene la logica dei predicati farò a occhio:
* $(x \to \lnot ok) \to revert$
* $(\lnot x \lor \lnot ok) \to revert$
* $\lnot (\lnot x \lor \lnot ok) \lor revert$
* $(x \land ok) \lor revert$

Che ci somiglia quasi, sia chiaro. Però rimane il problema della differenza tra $\forall$ e $\exists$: v4 e v5 danno falso positivo, perché *esiste* un caso in cui l'assert passa (quando il proprietario corrente è l'originale), ma io vorrei controllare che l'assert passi sempre.

Comunque l'ho fatta così:

```Solidity
/// @custom:negate

/// @custom:ghost
address newOwner;
address[] guardianList;

/// @custom:preghost function executeRecovery
require(guardianList.length >= threshold);
require(inRecovery == true);
for (uint i = 0; i < guardianList.length; i++) {
    require(guardianToRecovery[guardianList[i]].recoveryRound == currRecoveryRound);
    require(guardianToRecovery[guardianList[i]].proposedOwner == newOwner);
    require(!guardianToRecovery[guardianList[i]].usedInExecuteRecovery);
}

/// @custom:postghost function executeRecovery
assert(owner != newOwner);

/// @custom:invariant
function invariant(address newOwner_, address[] calldata guardianList_) public {
    newOwner = newOwner_;
    guardianList = guardianList_;
}
```

trcyubinompminvgyfdtcfferfpkiobgh fhghuojkoouvgfxdtyuiokplèò boh lascio così. Faccio uguale recovery fails. Ah no! Non c'è bisogno, perché voglio che fallisca, quindi la revert va bene che sia positiva. E infatti tutto ok (tranne la v11 fatta apposta per fregare questo test perché butta il valore di threshold impostato).

Devo capire se posso fare `recov-fails` in Certora anche senza generare hash validi.

Oppure provo a generare hash validi eh. Vediamo. Vediamo. Quello che mi manca è `abi.encodePacked()`, che a quanto pare rimuove il padding da un indirizzo. Secondo Copilot, basta fare così:

```CVL
bytes20 packedSender = to_bytes20(e.msg.sender);
require currentContract.isGuardian[keccak256(packedSender)];
```

Ok `to_bytes20(address)` dà errore di tipo, perché un indirizzo sta in 32 byte. No, un indirizzo sta in 20 byte in Solidity, ma viene paddato a 20 byte in Certora. Lo posso convertire in `uint20` in Certora? No! Perché Certora non mi fa convertire un indirizzo in un intero! Ma perché! Ah ma posso convertirlo in `uint256`. Non non è vero, secondo DeepSeek posso fare `uint256(e.msg.sender)` ma è falsissimo.

La soluzione fa schifo lol:

```CVL
address senderAddress = e.msg.sender;
bytes32 senderBytes32 = to_bytes32(senderAddress);
uint256 senderNum32 = assert_uint256(senderBytes32);
uint160 senderNum20 = assert_uint160(senderNum32%(2^(8*20)));
bytes20 senderBytes20 = to_bytes20(senderNum20);
require currentContract.isGuardian[keccak256(senderBytes20)];
```

Dà ancora negativo ma almeno questa require non dà errore di tipo, che è quello che volevo fare. Adesso lo rendo tutto una cosa sola.

```CVL
require currentContract.isGuardian[keccak256(to_bytes20(assert_uint160((assert_uint256(to_bytes32(e.msg.sender)))%(2^(8*20)))))];
```

Fa schifo.

Ho formattato così il cast:

```CVL
to_bytes20( // 20 byte array
	assert_uint160( // 20 byte uint
		assert_uint256( // 32 byte uint
			to_bytes32( // 32 byte array
				e.msg.sender
			)
		)
	)
)
```

Voglio ricordare ai cari lettori che questo cast avviene implicitamente in Solidity.

Tornando a noi, questo test non funziona. Le require sono quelle giuste, corrispondono a quelle di Solidity. Gli assert mi tornano.

Ok il problema a quanto pare è che Certora sta girando con un limite di $1$ alla lunghezza dei loop. E che me ne faccio scusa? E come faccio a cambiarlo? Ok si può, ma mi dà stack overflow perché ho messo il limite a 256. E con un limite di 3 dà comunque N. Anche con 64. Fallisce `assert !lastReverted`. Quindi controllo tutti i require del contratto per vedere quale non passa. Oh ma che cazzo non ha più require e reverta comunque? COLPA MIA. Colpa mia. Non è pagabile, andava pagabile. Ok non è solo quello.

> The `e.msg.value == 0` constraint fixed the previous counterexample. This is a **different revert**: Certora now finds `guardianList.length = 17`, and the first encoded address is `0x1000000000000000000000000000000000000f1a7` (`Results.txt`, `counterexample trace`).
> 
> That value is larger than the maximum 160-bit address. Solidity’s generated calldata decoder rejects it **before `executeRecovery`’s body runs**. So commenting out the function’s `require`s won’t prevent this revert; it’s not one of those checks.
> 
> The next thing to constrain in the spec is that every list entry is a valid 160-bit address, in addition to the list length. The trace’s decoder check is specifically testing that address-width condition; the li

Mi prendi in giro. Mi prendi in giro. Ma chi te lo fa fare? Ma se tu sei Certora, e sei fatto letteralmente solo per controllare contratti Solidity, perché hai tutte queste differenze da Solidity?

Non so come fare a limitare i valori degli indirizzi, ci penso dopo, addio. xr6cvybumopminvtydtgvujnm,ovydfcgvbinokhigcgh.

Vediamo un po' come si fa. È proprio vero che bisogna riposare, a mente fresca ci ho messo 15 secondi a rendermi conto che mi basta castare a un intero di Certora, prima ho provato a castare a un intero di Solidity. `to_mathint(guardianList[i]) < 2^160`. Continua a dare N.

Ho provato a evitare anche i duplicati.

```CVL
require forall uint256 i .
	forall uint256 j .
		i < guardianList.length && j < guardianList.length
		&& i != j
		=> guardianList[i] != guardianList[j]
	;
```

Non funziona neanche questo.

Ma certo. Era molto più semplice. Se non puoi portare il cavallo all'acqua, porta l'acqua al cavallo. Quella conversione lunghissima da indirizzo a byte sbagliava l'allineamento dei bit e anche la lunghezza. Basta generare un `bytes20` e confrontarlo con l'indirizzo.

```CVL
bytes20 senderHash;
require senderHash == to_bytes20(assert_uint160(to_mathint(e.msg.sender)));
require currentContract.isGuardian[keccak256(senderHash)];
```

Diamo un altro sguardo al mio bellissimo codice brutto:

```CVL
// modifier onlyGuardian
require currentContract.isGuardian[
	keccak256( // hash
		to_bytes20( // 20 byte array
			assert_uint160( // 20 byte uint
				assert_uint256( // 32 byte uint
					to_bytes32( // 32 byte array
						e.msg.sender
					)
				)
			)
		)
	)
];
```

Non funziona comunque neanche la nuova soluzione perché comunque questo stronzo di Certora casta il mio tanto agoniato `bytes20` in un `bytes32` prima di hasharlo. Copilot consiglia di scrivere la funzione di hashing in Solidity e poi chiamarla esternamente da Certora, come si faceva col vecchio `methods.spec`, ma non riesco a importarlo. Ho provato così:

```CVL
/// @custom:run certoraRun versions/SocialRecoveryWallet_v1.sol:Wallet certora/guardianHash.sol:Helper --verify Wallet:certora/recov-succeeds.spec --loop_iter 64
```

Ma non lo prende, ovviamente perché non funziona così. Quindi niente, basta, mi arrendo.

No non mi arrendo così arrivo a 4 ore di tirocinio fatte oggi. Come posso fare? Documentazione di Certora prima di tutto.

Dalla [documentazione](https://docs.certora.com/en/latest/docs/prover/approx/hashing.html) vedo che l'hash in Certora fa schifo schifissimo. Ci sono proprio delle perle.

* Certora sceglie la funzione `keccak256()` arbitrariamente, quindi non deve necessariamente corrispondere a quella usata da Solidity.
* La funzione di hashing usata da Certora non è necessariamente la stessa per ogni occorrenza del simbolo `keccak256`.
	* Se ho capito bene, questo significa che, dati `x` e `y` arbitrari, `keccak256(x) < keccak256(y) && keccak256(x) >= keccak(256)y` è vera, nonostante normalmente sia un semplicissimo esempio di contraddizione, cioè di espressione sempre falsa.

Quindi sto pensando che forse l'unica via è implementarla in Certora, cosa che molto probabilmente non funzionerebbe comunque. Boh non trovo nessuna formula online.

Sto anche pensando che non capisco questa cosa del limite del loop. Com'è che io posso, tecnicamente, fare copia incolla $2^{256}$ volte dello stesso codice in cui cambio solo una costante numerica, e quello me lo fai fare, ma se uso `forall` allora mi metti un limite perché fai stack overflow? Mannagia.

---

[[Keccac256|Ore di peripezie con la funzione di hashing.]]

No basta. Mi sa che la funzione hash è un muro che Certora non riesce ad aggirare. È un muro, con l'`e.msg.sender` di Certora da un lato, e il `msg.sender` di Solidity dall'altro. E non lo possiamo attraversare. [Chat di DeepSeek](https://chat.deepseek.com/share/yj7achw8gt4xgpte2p) così quando metto in ordine gli appunti mi segno quello che ho scritto.

Ragioniamoci. Detto che secondo me non c'è una soluzione. Ma ragioniamoci. Il modificatore `onlyGuardian` richiede che l'hash dell'indirizzo del mittente sia approvato. Certora sa l'indirizzo del mittente e sa... Aspetta. C'è qualcosa. A Certora non importa che il mittente sia un guardiano, a Certora importa che il mittente sia tale da non essere la causa della revert. Leggiamo bene:

> if a number of guardians greater than or equal to the threshold have participated in the same recovery round, and selected the same new owner, then `executeRecovery()` will succeed and `owner == newOwner`.

Non c'è scritto da nessuna parte che il mittente deve essere un guardiano. Quindi io prendo un mittente a caso, chiamo il metodo, e richiedo che non reverti, in questo modo so che il mittente non causa una revert, *e poi* faccio il test. Devo tirare fuori `lastStorage`.

Praticamente mi segno lo storage iniziale con `storage initial = lastStorage;`, e poi lo ripristino nella chiamata con `executeRecovery(...) at initial;`.

Metto questo all'inizio:

```CVL
// Find a sender that doesn't make the method revert
method f;
calldataarg args;
require f.selector == sig:executeRecovery().selector;
f@withrevert(e,args);
require(!lastReverted);
```

E poi cambio la chiamata:

```CVL
executeRecovery@withrevert(e, newOwner, guardianList) at initial;
```

Ok bene la mia idea ha funzionato. Nuovo problema: troppi loop nel metodo. Provo ad aggiungere la flag `--optimistic_loop` alla chiamata. P. P. P! Adesso lo faccio girare su tutti e fine.

Vediamo i risultati. Abbiamo dei falsi positivi:

* v4, v5, v10: Boh, non so perché, dovrebbe essere semplice vedere che mette il proprietario sbagliato.
* v12, v13: Ma come scusa, reverta in una condizione in cui non dovrebbe e te ne freghi.
* v14: Poco da fare, diventa vacua perché non esiste un mittente valido.

E che succede? Boh.

Per v4, provo a mettere che il nuovo proprietario non deve essere un guardiano. No, vale comunque. Per capire, vediamo chi esce negativo. Solo v16 e v17, dove la recovery non cambia il proprietario.

Il problema è che io sto aggiungendo require, ma le require possono solo rendere il risultato più positivo, io lo voglio rendere più negativo.

Ok ho cambiato l'ordine delle istruzioni e v4 è giusta.

v3 è falsa negativa. Ma è colpa mia, ho fatto male la ground truth. Poi abbiamo 10 12 13 14. 10 non l'ho capita, imposta il proprietario sbagliato, non dovrebbe passare. LE altre possono revertare anche quando sono rispettate le precondizioni.

14 soprat- ahhhh... Reverta sempre, quindi il primo passo di trovare un sender che funziona fallisce e il test passa vacuamente.

v10 è identica a v4 però, l'unica differenza è che cambia la lista dei guardiani. Ah niente, perché leggo la lista dei guardiani prima di chiamare il metodo.

Cosa sta facendo il mio codice?

1. Crea variabili di input, ambiente e storage
2. Requirement semplici
3. Requirement sulla lista dei guardiani
4. Chiama il metodo per cercare un mittente che vada bene
5. Chiama il metodo per davvero
6. Assert

Sposto lo storage a dopo il passo 3 e vedo che succede.

Ha funzionato per v10. Ora giro il test per gli altri e spero bene. No aspetta non ha senso. Ho messo il salvataggio dello storage tra un requirement e l'altro della lista dei guardiani, perché è cambiato? v4 rimane TN. E v12 diventa TN. Giro tutti i test e vedo.

Devo vedere come funziona il salvataggio dello storage, e in generale mettere in ordine questi appunti, ho quasi 20k parole in un solo documento e sta diventando fastidioso scorrere fino in basso per aggiungere cose.

In realtà non so come metterli in ordine, la maggior parte degli appunti sono abbastanza inutili.

Che succede, non ho cambiato il test ma adesso v4 e v10 danno FP. E ora rieseguo e dà TN su v4. Che succede?

**recov-fails** è simile, ma molto più semplice, perché ha meno precondizioni, visto che non devo evitare che fallisca per motivi diversi da quelli specificati.

Ora posso anche fare **recov-implies-guardian**. So come controllare che il mittente è un guardiano, so come controllare che la recovery funzioni. Semplicemente, se **recov-succeed** era $isGuardian(sender) \land Α \to recov \land \lnot revert$, questa è $recov \vdash \lnot revert \to isGuardian(sender)$.

Per avere un mittente tale che sia anche guardiano, uso lo stesso trick di tentare una chiamata generica. No aspetta, non so. Perché stavo usando il fatto che $\lnot revert \to isGuardian(sender)$. Ma questo non significa che $revert \to \lnot isGuardian(sender)$, significa $revert \to \lnot isGuardian(sender) \lor A$. Per essere sicuro che il mittente non sia un guardiano, devo usare il sillogismo disgiuntivo e negare le altre precondizioni di successo della recovery. Quindi mi servono anche tutti quegli altri loop, che possono comunque restare quasi invariati credo.

Sto anche notando che con "recov" non intende "questa chiamata avviene con successo" ma "ha partecipato a una recovery in passato", che è salvato in un array. Quindi non serve fare cose strane con lo storage per fare due chiamate indipendenti. Ed è un array le cui chiavi sono indirizzi (è lo stesso che leggiamo nel loop), quindi non c'è il problema dell'hash.

---

Non funziona. Non funziona molto bene. Dà negativo su v1 com'è giusto che sia, ma dà negativo anche su v2. Questo mi fa pensare che il mio $\lnot A$ del sillogismo disgiuntivo sia sbagliato.

La logica del test mi sembra sensata. Ci mette molto di più a girare su v2, quindi sicuramente sta cercando qualche loophole. Cosa farei senza Copilot. Ok il solito, non ho impostato lo stato di partenza.

Il fatto che le require rendano il test più positivo, e le assert più negativo, mi ricorda comunque il calcolo delle sequenze.

Ok non ho capito questa cosa. Ora ho reso più sensato lo stato di partenza e v1 mi esce positiv... Ah... Devo fare due ambienti forse? Il problema qui è che diventa vacua. No ho già dimenticato il mio ragionamento. Ah sì, essenzialmente un negativo richiede che passi del tempo tra quando un indirizzo partecipa in una recovery e quando faccio l'assert, ma non so come farlo. Perché a questo punto è ovvio che, dopo la recovery, se non reverta allora vuole dire che il mittente ha partecipato alla recovery, e se reverta non ha partecipato.

Provo a usare lo storage iniziale nella chiamata. Niente.

Quello che succede è che io mi faccio un setuppone per chiamare il contratto in modo tale che l'unico modo per cui reverti sia... Eccetera eccetera. Insomma questa cosa mi sporca lo stato del contratto, ma io voglio sperimentare su uno stato arbitrario.

La mia soluzione, se si può fare, è di prendere tutto questo setuppone e metterlo in una funzione che ha il solo scopo di determinare se il mittente è un guardiano. Poi uso questa conoscenza in un'invariante, e l'invariante controlla stati arbitrari credo.

Copilot mi consiglia "ghost state". Dei tre paragrafi, queste due parole sono l'unica cosa utile. Sarebbe bello se facessero un LLM che risponde alle tue domande dicendoti cosa cercare su Google, perché è quello che ha appena fatto Copilot indirettamente.

Ok, un passo avanti mentalmente. Facciamo un passo avanti. Io sto leggendo `currentContract.guardianToRecovery[e.msg.sender].usedInExecuteRecovery` durante l'assert, cioè dopo la recovery. Questo è sbagliato, perché leggere la verità di `senderIsGuardian` modifica `usedInExecuteRecovery` (effetto osservatore). Male. L'idea era quindi di leggere `usedInExecuteRecovery` all'inizio, ma devo richiedere che sia falso per poter leggere `senderIsGuardian`.

Non so come funzioni lo storage. Quindi... L'idea. È di. Leggere `usedInExecuteRecovery`, salvare lo storage, e poi fissare `usedInExecuteRecovery` a falso. Ma questo non funziona.

Un altro modo per controllare che il mittente sia un guardiano c'è. Perché `executeRecovery` non è l'unica `onlyGuardian`. A me basta che sia `onlyGuardian`. Ed `executeRecovery` è l'unica che modifica `usedInExecuteRecovery` (abbastanza ovvio dal nome). Enorme passo avanti. Risolto tutto forse credo spero.

Ok ok ok. Non ho voglia adesso, spero che funzioni.

Questo tirocinio sembrava inutile, ma effettivamente mi sta insegnando a probare il codice senza metterci mano. Io col codice Certora sto leggendo solo le informazioni che il contratto mi permette di leggere. Sarebbe così facile sapere che il mittente è un guardiano se potessi leggere la lista, ma la lista è hashata e quindi devo fare tutti questi giri per ottenere l'informazione, ma devo stare attento a non modificare troppo lo stato, altrimenti la mia verifica diventa vacua.

Siamo sicuri che questo ragionamento funzioni? Per controllare `senderIsGuardian`, devo chiamare `supportRecovery`. Ma poi devo controllare che possa. Ah no. Allora. Devo vedere se il mittente ha partecipato a una recovery. E poi devo vedere se il mittente ha proposto o supportato una recovery. Sono compatibili le due cose? Sembra di sì, perché entrambe le azioni impostano `usedInExecuteRecovery` a falso, quindi prima di chiamarla può essere anche vero.

Ah... Tra l'altro... Non è che potevo semplicemente fare così anche con l'altro test?

Ok allora, neanche questo funziona ovviamente, perché non parte da uno stato sensato. Quindi anche con v2 Certora può inventarsi uno stato che falsifica il test, anche se non è raggiungibile in v2.

Controllo se un'invariante può controllare se un metodo reverta. Non sembra. Non capisco come fare.

Devo stare attento a controllare che non ci siano overflow, perché un metodo può revertare non solo quando c'è scritto ma anche quando c'è un overflow, per esempio con un'addizione. Non c'entrava in questo caso.

I test ci sono tutti. Vediamo la situazione dei falsi.

SolCMC
* ==🟢**recov-fails** FPv11: variabile `threshold` impostata male, niente da fare==
* ==🟢**recov-implies-guardian** FNv14: errore mio, ops==
* **recov-implies-guardian** FNv2: molto strano che SolCMC sbagli questa
* **recov-succeeds** FPv3v4v5v10: non capisco, imposta un proprietario sbagliato
* **recov-succeeds** FPv12v13: non capisco, reverta quando non dovrebbe
* ==🟢**recov-succeeds** FNv15: normale, revert+negate==

Certora:

* ==🔴**no-recov** FNv16v17: esiste il metodo da chiamare, ma non fa niente, non so come risolvere senza sovraspecificare==
* **owner-cannot-change** FNv3v14v15v16v17: ok dà negativo a tutto, da cambiare
* **recov-fails** FNv16: non ha senso per nientissimo
* ==🟡**recov-implies-guardian**: niente da fare==
* ==🟢**recov-succeeds** FPv14: vacuo, richiede che esista un mittente che non fa revertare==

Posso usare satisfy. Eccoci. Forse posso fare due regole dentro una spec. Forse. Spero. Dai. Se posso usare satisfy e posso mettere due regole, metto una seconda regola che richiede che esista almeno un mittente che non fa revertare. Boh vedo `satisfy` in Template e nei test di regressione, credo vada bene.

Mi dice che non posso combinare satisfy e assert. Brutto. È strano però, perché non li ho messi nella stessa regola. E sul sito di Certora c'è scritto che non vanno messi nella stessa *sotto*regola, e sul [GitHub di Certora](https://github.com/Certora/Examples/blob/14668d39a6ddc67af349bc5b82f73db73349ef18/CVLByExample/ConstantProductPool/certora/spec/ConstantProductPool.spec#L243) vedo una spec con satisfy in una regola e assert in un'altra.

Non è un limite di CVL, è nelle regole dello script di Franco Sainas. Sarà una regola fissa del progetto, che non capisco visto che non è una limitazione di Certora, è una regola imposta a caso.

Comunque la mia soluzione era questa, molto semplice:

```CVL
supportRecovery@withrevert(e,addr);
satisfy !lastReverted;
```

Proverei **owner-cannot-change**.spec. Chiaramente non va bene un'invariant. Faccio una regola normale, che chiama un metodo e vede se i l proprietario è cambiato. Ah no, il primo proprietario deve essere sempre il proprietario per la regola. Niente comunque. Ah ma aspetta, prima richiedo che il vecchio proprietario sia il primo proprietario. Ebbene funziona.

Con questo fix, rimangono solo due falsi: v3, che non fa altro che non permettere al proprietario di cambiare, e v17, che non fa niente ma reverta quando serve. Non ha senso ma lo lascio così. Ci sono solo tre veri positivi, 14, 15 e 16, dove la recovery o reverta o non fa niente. Strano che v17, che è la fusione di v15 e v16, prenda un falso negativo.

Mi viene il dubbio che non debba evitare che il metodo chiamato sia il costruttore. Dubito, ma provo. Mi sa che non si può neanche fare. Ah ok v3 fallisce perché c'è un loop nel contratto. Metto `--optimistic-loop`. E ora v3 dà TP, e v1 dà TN. Bello. E allora credo che **no-recov** abbia lo stesso problema. E **recov-fails**? Strano.

Tutto risolto con **owner-cannot-change**. **no-recov** è rimasto uguale. In effetti è solo ambigua la descrizione, "la recovery non dovrebbe mai succedere", ma intendi il metodo o l'azione? Perché in v16 e v17 avviene il metodo ma non l'azione, e il mio test controlla che non avvenga il metodo, invece il test di Franco Sainas asserisce che `!_recovered`. Però boh, da vedere se mi posso fidare di quella variabile, in effetti il contratto si può benissimo implementare senza. Boh, questo contratto è strano.

Vediamo se questo risolve **recov-fails**. Risolve eccome. v11 rimane sbagliato ma non c'è niente da fare.

Quindi ora siamo in questa situazione:

SolCMC
* ==🟢**recov-fails** FPv11: variabile `threshold` impostata male, niente da fare==
* **recov-implies-guardian** FNv2: molto strano che SolCMC sbagli questa
* **recov-succeeds** FPv3v4v5v10: non capisco, imposta un proprietario sbagliato
* **recov-succeeds** FPv12v13: non capisco, reverta quando non dovrebbe
* ==🟢**recov-succeeds** FNv15: normale, revert+negate==

Certora:

* ==🟡**no-recov** FNv16v17: possibile errore nell'interpretazione della proprietà==
* ==🟢**owner-cannot-change**: tutto giusto==
* ==🟢**recov-fails** FNv11: com'è normale che sia==
* ==🟡**recov-implies-guardian**: niente da fare, parte da stati invalidi==
* ==🟢**recov-succeeds** FPv14: vacuo, richiede che esista un mittente che non fa revertare==

Direi che ora mi concentro su SolCMC.

Ok, ho detto abbastanza [[Formalizzazione|baggianate]]. È il momento di vedere SolCMC.

In **recov-implies-guardian**, in inglese dice "has participated in a recovery", che non è ben definito. Una recovery ha tre "fasi": l'inizio, il supporto, e l'esecuzione. Nel mio test Certora, che funziona, io controllo che l'indirizzo abbia partecipato all'esecuzione, ma il test SolCMC controlla che abbia partecipato all'inizio o al supporto. Non credo c'entri nulla. Esatto non c'entra nulla.

Ok, noto che gli unici positivi sono i soliti indiziati, quelli che non fanno niente. Questo è perché gli array non vengono aggiornati e il test passa vacuamente.

Vediamo il log:

```log
Warning: CHC: Error trying to invoke SMT solver.
   --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/social_recovery_wallet/solcmc/build/contracts/SocialRecoveryWallet_recov-implies-guardian_v2.sol:139:9:
    |
139 |         assert(isGuardian[keccak256(abi.encodePacked(a))]);
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Warning: CHC: Assertion violation might happen here.
   --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/social_recovery_wallet/solcmc/build/contracts/SocialRecoveryWallet_recov-implies-guardian_v2.sol:139:9:
    |
139 |         assert(isGuardian[keccak256(abi.encodePacked(a))]);
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Copilot non aiuta. Sembra che il problema sia che al solver non piace `keccak256`, di nuovo. Non so come risolvere. Non posso fare il trick della revert perché su SolCMC le revert passano i test. Provo a farla al contrario, $(p \to q) \leftrightarrow (\lnot q \to \lnot p)$.

Adesso dice così:

```log
Warning: CHC: Error trying to invoke SMT solver.
   --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/social_recovery_wallet/solcmc/build/contracts/SocialRecoveryWallet_recov-implies-guardian_v2.sol:139:9:
    |
139 |         assert(!guardianToRecovery[a].usedInExecuteRecovery);
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Warning: CHC: Assertion violation might happen here.
   --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/social_recovery_wallet/solcmc/build/contracts/SocialRecoveryWallet_recov-implies-guardian_v2.sol:139:9:
    |
139 |         assert(!guardianToRecovery[a].usedInExecuteRecovery);
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Quindi forse non c'entra `keccac256`. E allora niente, non so come fare. Non ha senso.

Con **recov-succeeds**, potrei semplicemente aver fatto un disastro con nomi di variabili e scope. Ok, non era quello il problema, ma di sicuro fa piacere correggerlo. Siamo in negate, quindi aggiungere più require va in negativo. Io rimetto la regola che controlla che tutti i guardiani siano guardiani. Ah ma aspetta. Siamo in negate. Quindi basta una volta che lo fa giusto per renderla positiva. Allora non so.

---

Vediamo bene **recov-succeeds**.

> In inglese:$$constr(G, t) \vdash |\{g\ |\ g \in G' \land Rec(g, r, o) \land isG(g)\}| \geq t \Rightarrow exRec \to \lnot rev \land own'=o$$

> In v1:$$constr(G,t) \vdash isG(m.c), inRec, |g|\geq t, $$

No mi arrendo, è davvero infattibile farla bene, non ha senso. Niente fatto sta che sono equivalenti.

Il test SolCMC fa $|G| \geq t, inRec, \forall g \in G (g.r=r \land g.o = o \land \lnot g.u) \Rightarrow o' = o \land \lnot revert$. Mi sembra giusto. Ah no ho fatto un casino. De Morgan, esiste un esempio, non per ogni modello ma esiste un tale modello. Infatti siamo pieni di falsi positivi. Perché siamo in negate.

Che versioni hanno falsi positivi?

v3: Il processo di recovery può succedere, ma alla fine non cambia il proprietario.

Il falso positivo avviene quando esiste almeno un modello che soddisfa la proprietà, visto che siamo in negate. Visto che siamo in negate, aggiungere requisiti rende la proprietà più falsa. Quindi aggiungo che il proprietario proposto non deve essere quello corrente, perché se lo fosse, non modificare il proprietario soddisferebbe la proprietà. Soddisfa ancora. Metto che il nuovo proprietario non può essere un guardiano. Niente.

Non ha senso. No aspetta non capisco. In che modo le mie variabili interagiscono col metodo? Ecco, ho fatto un casino. Le preghost e postghost sono nello scope del metodo a cui si riferiscono. Quindi quando ho cambiato il nome per evitare lo shadowing, non dovevo. Perché cambiando il nome, diventano completamente scollegate dal metodo. Però passa comunque. Ok ho spostato la require del proprietario diverso dal proprietario e ora è giusto. Giro su tutti e vedo.

Devo dire che quel test è da rifare, perché l'ho fatto con molta confusione. Ok v10 e v4 rimangono sbagliati.

Invece forse dovevo tenere gli identificatori diversi, e poi usare una require per averli uguali a quelli dell'invariante. Boh.

L'ho reso più sensato. v3 non passa. v1 invece passa. Ok quello che ho fatto è stato che l'invariante ha come parametro solo il nuovo proprietario, che viene richiesto sia uguale a quello del parametro del metodo. Come secondo la descrizione in inglese, si richiede che i guardiani che partecipano siano d'accordo e siano almeno il threshold. Richiedo anche che il test non passi banalmente con un proprietario proposto uguale a quello corrente. E poi asserisco che il proprietario sia quello del parametro dell'invariante.

Però v4 passa. Come siamo messi rispetto a prima? FPv4v5v10v13, FNv15. Risolti due e peggiorato uno. v4 non ha senso che passi, perché controllo che il proprietario proposto non sia un guardiano. Va be', non capisco.

Ho aggiunto che il proprietario proposto non deve essere il mittente dei metodi relativi alla recovery. E v4 passa. Ah siamo in negate, devo farla al contrario. Non capisco cosa sto facendo. Ho negato certe require e boh v4 passa ancora. Forse le require devono restare dritte e le assert devono restare storte. Sì perché le require dentro i metodi restano uguali.

Il problema è la negate. La negate è abbastanza inutile. Perché basta un singolo esempio di modello adatto per renderla positiva. v13 ha lo stesso problema.

Situazione:
* ==🟢**recov-fails** FPv11: variabile `threshold` impostata male, niente da fare==
* ==🟡**recov-implies-guardian** FNv2: strano ma niente da fare==
* ==🔴**recov-succeeds**: con la negate basta un solo modello valido==

v8 dà molto `UNK`.

Non so che altro fare con questo contratto. Metto i commenti alla ground truth e provo con un altro.


