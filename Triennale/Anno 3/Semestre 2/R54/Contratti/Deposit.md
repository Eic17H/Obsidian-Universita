---
cssclasses:
  - r54
---
Cominciamo bene.

```log
ERROR:root:versions/DepositERC20_v2.sol: Couldn't retrieve contract name.
ERROR:root:versions/DepositERC20_v2.sol: Couldn't retrieve contract name.
ERROR:root:versions/DepositERC20_v2.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v2.sol contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v2.sol contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v2.sol contract name.
ERROR:root:versions/DepositERC20_v1.sol: Couldn't retrieve contract name.
ERROR:root:versions/DepositERC20_v1.sol: Couldn't retrieve contract name.
ERROR:root:versions/DepositERC20_v1.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v1.sol contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v1.sol contract name.
ERROR:root:Could not retrieve versions/DepositERC20_v1.sol contract name.
```

Proviamo SolCMC. Vedo subito che **wd-contract-bal**.sol è sbagliato. Gli errori con Certora sono che il contratto non rispetta le convenzioni di nominazione. Si chiamava `TokenTransfer` che è completamente diverso dal nome del file. Ok i test sono scritti per Certora vecchio, tranne **no-deposit-twice**.

Con entrambi i tool, **wd-contract-bal** è falso negativo. Sicuramente a causa di seldestruct.

Ho la batteria scarica, non credo di poter fare molto altro. Vediamo che versioni posso fare:

* Non reentrant
* Can never deposit
* Can deposit exactly twice
* Can deposit multiple times
* Can't withdraw
* Can only withdraw once
* Tutto revert
* Revert e fa niente
* Niente revert e fa niente
* Solo depositor può withdraw
* Depositor non può withdraw
* Withdraw withholds un po' di soldi
* Each address can only withdraw once
* Withdraw always sends funds to depositor

Il contratto è talmente semplice che è stato facile scriverle tutte.

**no-deposit-twice** e **wd-leq-init-bal** escono giusti per tutte le versioni su SolCMC. **wd-contract-bal** esce perlopiù FN per i motivi già detti. La maggior parte delle versioni corrispondono a tutte le proprietà nonostante siano sbagliate, perché le proprietà non sono sufficienti.

Il problema con Certora è che la variabile `sent` è privata. C'è da usare una hook e una variabile ghost, ma havoc, non so che fare, "the overall withdrawn amount does not exceed the initial deposit" quindi deve essere il conto totale. Non credo di poter risolvere. Certora docs e vedo se si può evitare l'havoc delle variabili ghost. Ok i ghost persistenti non vengono né havocati né revertiti.

No no aspetta, solo alcune versioni danno errore.

```log
Done 0m
Compiling versions/DepositERC20_v10.sol...
Compiling versions/DepositERC20_v10.sol to expose internal function information and local variables...
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_09_22_29_06_3535664ce2
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_09_22_29_06_3535664ce2" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-6] ERROR ALWAYS - Got exception Could not compile access to contract storage currentContract.sent @ wd-leq-init-bal.spec:4:5 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule Using general requirements
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Got exception Could not compile access to contract storage currentContract.sent @ wd-leq-init-bal.spec:4:5 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule Induction base: After the constructor
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

Perché non ha questo problema con la v1 che è identica? Bello non ho capito. Fallisce alla deposit, che non dovrebbe. E non ha il punto esclamativo, sarà per quello. Non capirò come si fa ora.

Sia questo che SRW hanno "variabili ghost" direttamente nel contratto. Secondo me erano per quando non si potevano mettere dal tool. Probabilmente prima della PR mi farà aggiornare questa cosa. Da chiedere a Bartoletti prima o poi o poi o poi.

Vediamo Deposit ETH. Eldarica non ha UNK neanche a 30 secondi, menomale. Solita roba del vecchio metodo dei getters e simili per Certora. `// TODO fregalo`, grazie Roberto Pettinau, io come te.

Ma che significa?

```log
Start Mon Nov 09 22:57:39 CET 2026
The scene contains 1 contracts:
DepositEth : 0xce4604a0000000000000000000000002
Running initial transformations
Has CVL checks.
Checking CVL certora/wd-sender-rcv-EOA.spec for contract DepositEth
Unrolling loops 1 time, unwinding condition is asserted
Error: The signature resolution for a dispatcher summary resolved to a fallback function. This is unsupported.
Error: Had an exception while verifying the rule 'wd_sender_rcv_EOA':
Error: Timed out waiting for background tasks:
    
Done 0m
Compiling versions/DepositEth_v3.sol...
Compiling versions/DepositEth_v3.sol to expose internal function information and local variables...
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_09_22_57_27_6148378415
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_09_22_57_27_6148378415" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - The signature resolution for a dispatcher summary resolved to a fallback function. This is unsupported.
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Had an exception while verifying the rule 'wd_sender_rcv_EOA':
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

L'errore è su tutti i test su v3, che invia soldi ad `address(0)`.

---

Vediamo la ground truth. La maggior parte delle proprietà sono fatte per essere false, tranne **wd-sender-rcv-EOA** e **always-depletable**. Vediamo tutte le proprietà.

* **always-depletable**: any user (EOA) at any time can fire a transaction to receive the full balance of the contract. $\forall x : EOA,\ \forall t : block,\ \exists n,\ x.wd(n) \Rightarrow \Delta x.\$ = -\Delta this.\$ = this.\$_{before}$.
- **wd-contract-bal**: the contract balance is decreased by `amount` after a successful `withdraw(amount)`. $\forall n,\ wd(n) \Rightarrow \Delta this.\$ = -n$. Falsa perché reentrant.
- **wd-leq-init-bal**: the overall withdrawn amount does not exceed the initial deposit. Autoesplicativa, falsa perché coinbase e selfdestruct.
- **wd-not-revert**: a transaction `withdraw(amount)` is not reverted whenever the `amount` does not exceed the contract balance. $n \leq this.\$ \Rightarrow wd(n) \to \lnot revert$. Falsa perché il ricevente può rifiutare la transazione.
- **wd-sender-rcv**: after a successful `withdraw(amount)`, the balance of the transaction sender is increased by `amount` ETH. $\forall x : addr,\ x.wd(n) \land \lnot revert \Rightarrow \Delta x.\$ = n$. Falsa perché può inoltrare subito i soldi.
- **wd-sender-rcv-EOA**: after a successful `withdraw(amount)` originated by an EOA, the balance of the transaction sender is increased by `amount` ETH. $\forall x : EOA,\ x.wd(n) \land \lnot revert \Rightarrow \Delta x.\$ = n$.

**always-depletable**, **wd-not-revert**, **wd-sender-rcv** e **wd-sender-rcv-EOA** compaiono sia vere che false. Per le altre, **wd-contract-bal** può diventare vera con reentrancy guard, per **wd-leq-init-bal** basta rendere impossibile prelevare.

Vediamo le versioni che abbiamo già:

1. Rientrante.
2. Non rientrante.
3. Non rientrante, invia soldi a `0x00`.
4. Non rientrante, invia $1\text{ ETH}$ in meno.
5. Non rientrante, vuole avere almeno $1\text{ ETH}$ dopo il prelievo.
6. Non rientrante, ha una blacklist.
7. Non rientrante, ha una whitelist.
8. Rientrante, solo gli EOA possono prelevare.

Bene, non capisco. Se il problema di **wd-contract-bal** è la rientranza, perché le versioni non rientranti sono comunque negative? A dire il vero, esce positiva a v2, v5, v6 e v7 con SolCMC, ma comunque negativa a tutte su Certora.

**always-depletable** esce negativa con Certora. La cytvuybuh80j9hobhbiuh0u9hobuho9uhiobjohi9u'hiobuhiu90hobuhi9 non ha senso. A me sembra che il destinatario dei soldi li possa sempre rifiutare.

Questo contratto è orrendo.

Guardiamo il contratto in sé. Il contratto accetta soldi a costruzione, e invia soldi a chi chiama wd.

Faccio una funzione che non reverta se la transazione non va a buon fine. E poi uguale ma non rientrante.

Per **always-depletable**, il fatto che ci sia un $\exists$ mi fa pensare a una negate, ma c'è anche un $\forall$. Il problema del test Certora corrente è che fissa $n = this.\$$, ma a noi serve $\exists n$. Potremmo usare satisfy, ma anche quello non va bene, perché ci serve $\forall x$, non $\exists x$. Ok. Trovo un $n$, e poi lo applico a qualunque $x$. Come? Una chiamata sonda in un ambiente, e una chiamata di asserzione in un altro ambiente. `f(probeEnv, args); require ok; f(assertEnv, args); assert ok;`. Cioè, non ci interessa che vadano bene tutti gli argomenti, ci interessa che vadano bene tutti gli ambienti.

```log
Error in spec file (always-depletable.spec:22:5): could not type expression "withdraw(probe,amount)", message: Could not find an overloading of method DepositEth.withdraw that matches the given arguments: mathint.
```
Molto strano. Non puoi castare un `mathint` a un `uint`? Di solito lo fai. Va bene, faccio io. Sempre N. Non c'entra con la rientranza. Non ho messo che il messaggio deve avere valore $0$. Infatti il bilancio rimane uguale a prima della chiamata.

L'unico modo in cui può star revertando è se il mittente rifiuta i soldi. Vediamo la mia versione nuova. Anche lì N. Ma in quel caso non perché reverta, ma perché non ha inviato i soldi. Quindi il problema è effettivamente che i soldi possono non uscire dal conto. Ma perché Forse perché Certora ignora il fatto che il mittente è un EOA.

No non ci credo. Adesso v4 risulta FP!. Vacuo, perché richiediamo che esistano dei parametri che permettono di svuotare il conto, ma non esistono, neghiamo l'antecedente ed esce positivo. La butto lì, ma mi sa di negate e satisfy. Perché così invertiamo tutto due volte tranne quello che rimane invertito una volta sola. Forse.

NO NON CI CREDO. LO SCRIPT PYTHON SCEMO DI QUESTA REPO. Non mi accetta il codice perché dentro `assertion` c'è scritto `assert`. Forse da dire a Bartoletti, perché questa cosa è malata.

Tornando a noi, v4 esce negativo, ma anche v1 esce negativo. Mi segno l'idea, secondo me è possibile mettere `satisfy` al posto della `require` e una `if(...) satisfy(false)` al posto dell'`assert`/`satisfy`.

```CVL
/// @custom:negate

rule always_depletable {
    env probe;
    env asser;

    // EOA
    require probe.msg.sender == probe.tx.origin;
    require asser.msg.sender == asser.tx.origin;

    // Method isn't payable
    require probe.msg.value == 0;
    require asser.msg.value == 0;

    // Rule out trivial scenario
    require nativeBalances[currentContract] > 0;

    // We don't know the correct amount, so we find it by requiring that it empties the balance
    // That restricts probe.msg.sender to one that empties the balance
    // So we call withdraw again with an arbitrary sender

    storage initial = lastStorage;

    // exists amount
    uint amount;
    withdraw@withrevert(probe, amount);
    require nativeBalances[currentContract] != 0;

    // for all EOA
    withdraw@withrevert(asser, amount) at initial;
    satisfy nativeBalances[currentContract] != 0;
}
```

Questa sarà difficile, va affrontata con la logica formale, e non so se sarà possibile.

Torniamo su questo caro amico adesso che è mezzanotte passata.

Perché **always-depletable** non va bene? Perché non ho trovato un modo per codificare la formalizzazione che ne ho tratto. Adesso ho due opzioni: formalizzarla in modo diverso o riprovare a codificarla.

> any user (EOA) at any time can fire a transaction to receive the full balance of the contract.

Analizziamola pezzo per pezzo.

* Ambiente $\forall e:env\ |$
	* $\forall e.msg.sender : EOA$ significa che $e.msg.sender=e.tx.origin$
	* $\forall e.block.timestamp$
* Può sparare una transazione, $\exists (f, a):(method, args) \ |$
	* Ricevere l'intero bilancio del contratto $f(e,a) \Rightarrow \Delta e.msg.sender.balance = - \Delta this.balance = this.balance_{before}$

Secondo la ground truth, questa proprietà dovrebbe valere per v1, così come **wd-sender-receive-EOA**. Il fatto è che quella proprietà dà FN per v1 in Certora. In più, io ho scritto sia che il mittente riceve soldi, sia che il contratto perde soldi. Ma il nome dice la seconda, e la descrizione dice la prima. In ogni caso, la seconda mi risulta falsa a causa della selfdestruct, e la prima mi sembra vera ma Certora darebbe falsa.

Vedo perché Certora dà falsa quell'altra proprietà. AH. Sì, è perché devi controllare che il mittente non sia il contratto stesso, altrimenti *certo* che resta uguale prima e dopo la transazione, se manda soldi a sé stesso. Da tenere a mente. Bene allora proviamo così.

Ah aspetta... Come risolvo il problema del $\forall$/$\exists$? Boh, ma ora provo la mia implementazione di prima con queste due correzioni.

Ok ok che strano. Con satisfy dà negativo su v1 e con assert dà positivo. Ah forse non è strano, perché... Ah vuol dire che è sbagliato. Perché satisfy negate dà negativo se esiste un modello sbagliato. Infatti v4 con assert dà positivo. Ok fin qui tutto sbagliato. Provo a rifarlo da capo.

Questo secondo me è un modo molto stupido per farlo:

```CVL
rule always_depletable {
    env e;
    require e.msg.sender == e.tx.origin;
    require e.msg.sender != currentContract;
    require e.msg.value == 0;

    method f;
    calldataarg args;

    mathint senderBalBefore = nativeBalances[e.msg.sender];
    mathint contractBalBefore = nativeBalances[currentContract];

    f@withrevert(e,args);

    mathint senderBalAfter = nativeBalances[e.msg.sender];
    require senderBalAfter > senderBalBefore;
    mathint senderBalDiff = senderBalAfter - senderBalBefore;
    assert senderBalDiff == contractBalBefore;
}
```

Infatti non funziona neanche. Con satisfy certamente funziona, ma non ha senso farlo.

Tra l'altro ho notato che ho scritto male la formalizzazione di prima.$$\forall e:env,\ \exists (f,a):(method,args)\ |\ sender_e=origin_e,\ f(e,a) \Rightarrow \Delta \$_{sender_e}=\$_{this,before}$$Il mio test è:$$\exists e:env,\ \exists (f,a):(method,args)\ |\ sender_e=origin_e,\ f(e,a) \Rightarrow \Delta \$_{sender_e}=\$_{this,before}$$

È sbagliato e basta. Cambia di poco, ma ancora non so come avere $\forall$ ed $\exists$ insieme.

Pensiamoci. $\lnot \forall x.y \leftrightarrow \exists x.\lnot y$, $\lnot \exists x.y \leftrightarrow \forall x . \lnot y$. De Morgan semplicissimo. Il problema è che io voglio $\forall x. \exists y. z$. Come si fa? $\forall x. \lnot \forall y. \lnot z$. Come faccio a mettere un $\lnot$ lì? Non credo di poterlo fare. Allora al contrario. $\lnot \exists x. \forall y. \lnot z$, significa $\forall x.\lnot \forall y. \lnot z$, che significa $\forall x. \exists y. z$, che è ciò che voglio. Ma siamo punto e a capo, come mischio i due quantificatori? Boh.

Finora ho visto cosa volevo dire, ma non so come dirlo. Andiamo nell'altra direzione. Prendiamo tutto ciò che ho a disposizione, e vediamo cosa ci permette di dire.

* `require x; assert y;` $\forall m\ |\ x \Rightarrow y$
* `require x; satisfy y;` $\exists m\ |\ x \Rightarrow y$
* `negate; require x; assert y;` $\exists m\ |\ x \Rightarrow \lnot y$
* `negate; require x; satisfy y;` $\forall m\ |\ x \Rightarrow \lnot y$

Non so come formalizzarlo, ma la `negate` fa anche un'altra cosa che da quello che ho scritto non è evidente: se $m \to \lnot x$, senza la negate il test è positivo, con la negate il test è negativo. Quindi la negate aggiunge una sorta di $\land(\exists x. m \land x)$, mentre senza la negate abbiamo $\lor \lnot(\exists x.m \land x)$, che ovviamente segue da De Morgan. E la seconda si può riscrivere come $\lor(\forall x.m \to \lnot x)$. Quindi riscriviamo

* `require x; assert y;` $(\forall m\ |\  x \Rightarrow y)\lor(\forall x\ |\ m \to \lnot x)$
* `require x; satisfy y;` $(\exists m\ |\ x \Rightarrow y)\lor(\forall x\ |\ m \to \lnot x)$
* `negate; require x; assert y;` $(\exists m\ |\ x \Rightarrow \lnot y)\land(\exists x\ |\  m \land x)$
* `negate; require x; satisfy y;` $(\forall m\ |\ x \Rightarrow \lnot y)\land(\exists x\ |\  m \land x)$

Tecnicamente... No aspetta, ho sbagliato. Perché questi vanno combinati. Perché per esempio nell'ultima dovrei scrivere $\forall m \exists x \ |\ \cdots$. quindi tecnicamente ho trovato un modo per combinare i quantificatori, ma quell'$m$ è un modello. Un modello da cos'è formato? Da valori delle variabili, che sono i nostri $e$, $f$ ed $a$, oltre alle altre variabili.

Ma poi ho anche fatto un casino con l'overloading dei simboli, sto usando $x$ sia come variabile che come statement. Non credo abbia molto senso, ho certamente fatto passi avanti ma mi sembra tutto inutile.

Ma proviamoci comunque. Io voglio questo:$$\forall e \exists (f,a) \ |\ f(e,a) \Rightarrow \lnot revert \land ok(\Delta \$)$$
Dove $ok()$ è una funzione $int \to bool$. Questa formula che ho ottenuto è di una delle forme di cui sopra? Sì, se le avessi scritte bene, sarebbe negate/satisfy, dove $x = (f,a)$ e $y = \lnot ok(\Delta \$)$, credo. Questo significa:
* `negate`
* `f(e,a); require !lastReverted` no non ha senso

Ecco che il problema di mischiare variabili e statements si fa sentire. Perché io voglio davvero *richiedere* che non reverti? Immaginiamo di sì, domani testo, allora avremmo:
* `negate`
* `f@withrevert(e,a); require !lastReverted;`
* `satisfy senderBalDiff != contractBalBefore;`

Mi sembra molto strano. No secondo me non funziona. Secondo me se lavoro all'indietro e provo a formalizzare questo test diventa diverso da quello con cui sono partito. Però quest'idea di trovare una forma canonica per le proprietà e ricondurla a uno di quattro tipi di test mi piace molto.

---

Vediamo come fare. Sacrificherò un po' di rigore per farlo funzionare. Visto che nel funzionamento normale, il metodo che ci interessa è `withdraw`, anziché dire che "per ogni mittente, esiste un metodo che permette di svuotare il bilancio", assumiamo che il metodo sia sempre quello.

Rimane un altro problema: implicitamente stiamo anche dicendo "esiste un parametro per quel metodo tale che il bilancio si svuoti". Siamo ancora nella stessa situazione di $\forall x \exists y$.

Andiamo a tentativi. Diciamo che chiamiamo $withdraw(x)$ e la quantità rimossa può essere espressa come $x-a$ o come $x/ b$. Allora proviamo con $withdraw(x+a)$ e $withdraw(x\cdot b)$. E non solo, con ognuno proviamo un intorno. Sarebbe una cosa del genere:

```CVL
mathint bal = nativeBalances[currentContract];
storage initial = lastStorage;

mathint x = bal;

withdraw@withrevert(x) at initial;
// The condition is the opposite of the intended behavior
// If the condition is false, the test will stop here as P
// If the condition is true, the test will continue
require nativeBalances[currentContract] != 0;

// If x didn't work
mathint bal1 = nativeBalances[currentContract];
bool tooBig1;
mathint sum;
mathint prod;
if(x < bal1) {
	tooBig1 = true;
	sum = bal1-x;
	prod = bal1/x;
} else {
	tooBig1 = false;
	sum = x-bal1;
	prod = x/bal1;
}

withdraw@withrevert(x+sum) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod) at initial;
require nativeBalances[currentContract] != 0;

// try with nearby values

withdraw@withrevert(x+sum+1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum+1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod+1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod+1) at initial;
require nativeBalances[currentContract] != 0;

withdraw@withrevert(x+sum+2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum+2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod+2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod+2) at initial;
require nativeBalances[currentContract] != 0;

withdraw@withrevert(x+sum+3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum+3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod+3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod+3) at initial;
require nativeBalances[currentContract] != 0;

withdraw@withrevert(x+sum-1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum-1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod-1) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod-1) at initial;
require nativeBalances[currentContract] != 0;

withdraw@withrevert(x+sum-2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum-2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod-2) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod-2) at initial;
require nativeBalances[currentContract] != 0;

withdraw@withrevert(x+sum-3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x-sum-3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x*prod-3) at initial;
require nativeBalances[currentContract] != 0;
withdraw@withrevert(x/prod-3) at initial;
require nativeBalances[currentContract] != 0;

assert(false);
```

Ci sono strani brutti errori di sintassi e typechecking ma secondo me la logica ha senso. Risolti quelli, il test gira molto lentamente.