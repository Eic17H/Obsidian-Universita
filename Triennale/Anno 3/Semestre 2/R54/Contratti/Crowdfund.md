---
cssclasses:
  - r54
---
* `donate-not-revert`
* `no-receive-after-deadline`
* `reclaim-not-revert`

Fatti:
* `no-donate-after-deadline`
* `bal-decr-onlyif-wd-reclaim`
* `donate-bal-inc`
* `donation-inc-onlyif-donate`
* `donate-not-dec-donation`
* `exists-unique-donation-change`
* `reclaim-even-if-msgvalue`
* `wd-not-revert`

Il mio problema è con `wd-full-balance`:
> after a non-reverting `withdraw`, the whole balance of the contract is sent to `owner`.

Tutte le versioni ce l'hanno falsa, con la nota:

> This property is false, since during the `withdraw` external call, the owner can send the funds to another contract through its `receive` method.

Guardando il codice, però, mi sembra vera, perché c'è
```Solidity
function withdraw() public {
	require (block.number > end_donate);
	require (address(this).balance >= goal);

	(bool succ,) = owner.call{value: address(this).balance}("");
	require(succ);
}
```

E mi sembra proprio che invii tutti i soldi all'owner.

In quel caso, io non so come renderla vera.

Vediamo invece `bal-decr-onlyif-wd-reclaim` che mi sembra fattibile. Vediamo la definizione in inglese e in SolCMC.

> after the donation phase, if the contract balance decreases then either a successful `withdraw` or `reclaim` have been performed.


```Solidity
function invariant(uint choice) public payable {
    
    // Siamo nella fase di cui parla la proprietà
    require(block.number > end_donate);

    uint _balance = address(this).balance;

    if (choice == 0) {
        donate();
    } else if (choice == 1) {
        withdraw();
    } else if (choice == 2) {
        reclaim();
    } else {
        require(false);
    }
    
    require(address(this).balance < _balance);
    assert(choice == 1 || choice == 2);
}
```

Modo stupido di farlo, metto che `donate()` paga il donatore dopo la fase di donazione. In questo modo vediamo che le `require` sono soddisfatte ma l'`assert` no. Chiaramente viola anche la proprietà `no-donate-after-deadline`.

`msg-value-not-negative` è impossibile. Controlla che, indovina un po', il valore del messaggio non sia negativo. Il valore del messaggio è un `uint`, letteralmente è definito come numero naturale.

---

`reclaim-own-funds` è tremendo. Con Z3 è perlopiù `UNK`, che va bene perché tanto con Eldarica va tutto bene. Ma con Certora è quasi tutto `FP!`, che va già male, ma addirittura ha sia `TP!` che `TN`, che è strano.

La `v10` ha un problema con gli import che non so come risolvere, mi dice che la cartella degli import è fuori dal path di solc.

`donation-dec-onlyif-reclaim` è perlopiù `FP!` con Certora, e con SolCMC non l'ho fatto, ma dovrebbe (*dovrebbe*) essere facile.

Ci ha messo esattamente un'ora a fare tutti i test di Certora tra l'altro.

`wd-empties-balance` ha un singolo `FP!` con SolCMC. Ci sono un paio di `FN` ma sono pochi e sparsi.

Per il resto, mancano molti test con SolCMC.

---
Per quanto riguarda Crowdfund:
* **donation-inc-onlyif-donate** credo di aver finito, SolCMC non passa ma sembra un problema di SolCMC.
* **wd-empties-balance** ha un falso positivo su v2 perché v2 non permette di eseguire un wd, ma la logica del wd per il resto è uguale alle altre
* **no-deadlock** su v9 non ho capito è proprio strana
* **reclaim-own-funds** su Certora è strana e basta, mi sa che solcmc fa una sorta di havoc e certora no
* v14 mi sa che ha la ground truth sbagliata

---

Io seriamente non so che fare con Crowdfund adesso.

Io vedo che esiste questa cosa:
```Solidity
function no_deadlock() public {
    
    require(address(this).balance > 0);
    
    require(donation[address(this)] > 0);

    bool donateSuccess;
    bool withdrawSuccess;
    bool reclaimSuccess;

    try this.donate{value: 0}() {
        donateSuccess = true;
    } catch {
        donateSuccess = false;
    }

    try this.withdraw() {
        withdrawSuccess = true;
    } catch {
        withdrawSuccess = false;
    }

    try this.reclaim() {
        reclaimSuccess = true;
    } catch {
        reclaimSuccess = false;
    }

    assert(donateSuccess || withdrawSuccess || reclaimSuccess);
}
```

Se guardiamo cos'ho scritto prima:

![[SolCMC#try catch]]

Quindi che succede? Posso usarlo per controllare se un metodo reverta? In teoria sì? Ah no. Ah no. Ecco, il fatto è proprio che quei metodi contengono chiamate esterne.

Ma quindi significa che con questo contratto in particolare io quella cosa la posso fare eccome.

E ora ci provo.

Ok l'altro problema è che l'invariante viene chiamata dal contratto stesso, non da un chiamante arbitrario.

No niente ho provato e non funziona perché fa una sorta di cosa che concettualmente somiglia all'havoc diciamo.

```Solidity
/// donate-not-revert-overflow:
/// a transaction `donate` is not reverted if
/// the donation phase has not ended and
/// sum between the old and the current donation does not overflow.

function invariant(uint256 val) public {
    require(block.number <= end_donate);
    require(val <= address(this).balance);
    require(donation[address(this)] <= type(uint256).max - val);

    bool success;

    try this.donate{value: val} () {
        success = true;
    } catch {
        success = false;
    }

    assert(success);
}
```

Non so più che fare.

Mi faccio una lista dei falsi positivi o negativi.

| Proprietà                       | Z3                                                                                                                                                                                            | eld                       | Certora                                                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **donate-bal-inc**              | Durante `donate` v4 invia ETH all'owner se può farlo senza diminuire il proprio bilancio, ma nessuno dei tre capisce che si assicura di non diminuire il bilancio. Non credo sia risolvibile. |                           | <                                                                                                                              |
| **donate-not-dec-donation**     | UNK anche a 120s.                                                                                                                                                                            Non ha senso. FN su v14. o.  |                                                                                                                                |
| **donation-dec-onlyif-reclaim** | Credo sia la solita cosa della reentrancy.                                                                                                                                                                                |                                                                                                                                |
| **donation-inc-onlyif-donate**  | Anche qui credo reentrancy, e anche selfdestruct.                                                                                                                                                                         |                                                                                                                                |
| **no-deadlock**                 | Falsi positivi su v9 e v21 perché le revert passano i test.                                                                                                                                                               | Falso negativo su v6, non so perché.                                                                                           |
| **no-receive-after-deadline**   |                                                                                                                                                                                                                           | Falso positivo su v21 e v7. Possibile errore nella ground truth.                                                               |
| **owner-only-recv**             |                                                                                                                                                                                                                           | Falsi negativi su v2, v21 e v7. Tutti e tre si rifiutano di fare qualunque cosa, possibile formalizzazione sbagliata nel test. |
| **reclaim-even-if-msgvalue**    |                                                                                                                                                                                                                           | FN su v18, molto strano, probabilmente un errore nel test.                                                                     |
| **reclaim-own-funds**           | Stranamente è corretto su SolCMC ma pieno di FP (con alcuni TN e TP) su Certora.                                                                                                                                          | <                                                                                                                              |
| **wd-empties-balance**          | FP su v2, perché le condizioni della wd sono velatamente insoddisfacibili (ma quindi in un certo senso è vacuamente TP, da vedere).                                                                                       |                                                                                                                                |
| **wd-full-balance**             |                                                                                                                                                                                                                           | FP su v10, il solito problema del fatto che può inoltrare subito l'ETH.                                                        |
| **wd-transfer-to-owner**        |                                                                                                                                                                                                                           | FN su v2, ma mi aspetterei il problema opposto.                                                                                |

Quindi cosa farei adesso? Oltre a vedere gli UNK, cosa che non mi conviene perché devo risparmiare batteria, farei una lista:

* **donate-not-dec-donation** molto strano.
* **no-deadlock.sol** secondo me non posso farci niente.
* **no-deadlock.spec** sarà difficile.
* **no-receive-after-deadline** da vedere ground truth e chiedere a Bartoletti come interpretare gli "if" e "only if" del linguaggio naturale.
* **owner-only-recv** formalizzazione errata nel test di sicuro (e possibile esempio della formalizzazione classica di "if").
* **reclaim-even-if-msgvalue** dovrebbe essere facile.
* **reclaim-own-funds** sembra difficile.
* **wd-empties-balance** anche qui ground truth da chiedere.
* **wd-transfer-to-owner** non ho idea se sono capace a risolvere.

Comincio.

 **reclaim-even-if-msgvalue** credo di aver trovato una soluzione orrenda con negate.

```CVL
/// @custom:negate
// This test will pass if the contract always accepts calls to `reclaim` with `msg.value>0`
// With `assert !lastReverted` and no `@custom:negate`, a test would fail if there was
// any way for `reclaim` to revert with `msg.value>0`, even for unrelated reasons,
// such as a sender that rejects ETH.

rule reclaim_even_if_msgvalue {
    env e;

    require(e.block.number > currentContract.end_donate);
    require(nativeBalances[currentContract] < currentContract.goal);
    require(currentContract.donation[e.msg.sender] > 0);
    
    require(e.msg.value > 0);

    reclaim@withrevert(e);

    assert lastReverted;
}
```

**no-deadlock**

Veramente non capisco, non ha senso. v21 è sempre in deadlock, perché tutto reverta sempre, quindi tutti i try/catch dovrebbero mettere la variabile falsa e l'assert dovrebbe fallire. Ah no, niente, haha, perché v21 non può avere soldi, è impossibile mandarglieli. Quindi ho sbagliato la ground truth. Ah e invece no, guarda cos'ho scritto:

> All methods always revert, and the contract can receive $\text{ETH}$ when it address is specified in a coinbase transaction or in a `selfdestruct`, meaning the property is not vacuously true.

Strano. E questa non me la sono inventata io eh, c'è di default su tutte per **no-receive-after-deadline**

> This property should always be false, since a contract can receive $\text{ETH}$ when its address is specified in a coinbase transaction or in a `selfdestruct`.

Quindi nulla, un vero e proprio errore del tool. Mission complete.

v9 fallisce perché nessuno viene contato come donatore (quindi nessuno ha il permesso di ritirare i soldi), ma il contratto si tiene $1 \text{ ETH}$ da ogni donazione (tranne se la donazione è di $1 \text{ ETH}$). Guardiamo la definizione di deadlock.

>  at least one of the main functions (donate, withdraw, reclaim) must not revert if the contract has a balance and the caller has made a donation.

Vale a dire:$$this.balance>0 \land caller.donation > 0 \vdash donate \lor wd \lor reclaim$$
Però $caller.donation = 0\ \forall\ caller$, quindi direi che lo lascio così, con l'asterisco di chiedere a Bartoletti. Non mi sembra un'ottima definizione di deadlock, perché l'owner non ha fatto una donazione, ma ok.

Vediamo invece v6. La ground truth mi torna: chiunque può withdraware quindi non c'è rischio che l'owner causi il deadlock. Però anche qui secondo me è un problema con la formalizzazione, perché il problema si ha se per ogni caller non c'è nulla da fare, invece il test e la formalizzazione controllano che esista un tale caller. Forse bisogna chiedere a Bartoletti.

**donate-not-dec-donation**

No non ha il minimo senso.

**cosa mi rimane?**

* **no-receive-after-deadline**: ground truth secondo me
* **owner-only-recv**: probabilmente formalizzazione sbagliata
* **reclaim-own-funds**: ??????????
* **wd-empties-balance**: ground truth?
* **wd-transfer-to-owner**: ????????????????????????

Per ora basta.

Ok 5 minuti dopo riprendo.

**no-receive-after-deadline**

> the contract balance does not increase after the end of the donation phase

Vale a dire:$$timestamp>end \vdash \lnot \uparrow this.balance$$

Ovviamente c'è poca formalità nei miei simboli.

Falso positivo su v21 e v7. Cosa fa il test Certora?$$timestamp > end \vdash \lnot (method \to \uparrow this.balance)$$
Ora sì che si vede una differenza. Però però però... perché esce positiva su v1? Sia per v1 che per v21, $timestamp > end \vdash \forall method\ |\ payable(method),\ method \to revert$, questo non cambia.

Cedo e chiedo di nuovo a Copilot. Cioè non mi sembra- ah ok quella cosa di `selfdestruct` eccetera vale solo se il contratto può fare una chiamata esterna. Ah no ok, *Certora* lo considera solo se il contratto può fare chiamate esterne, se mi fido di quello che dice Copilot (e a questo punto mi fido), allora è comunque possibile ma Certora non se ne accorge.

Boh.

**wd-empties-balance**

Vediamo cosa dice la regola in inglese:

> after a non-reverting `withdraw`, the ETH balance of the Crowdfund contract is equal to zero.

Provo a formalizzarla:$$wd \land \lnot revert \vdash this.balance=0$$
Vediamo il codice:

```Solidity
function wd_empties_balance() public payable {
    
    require(block.number > end_donate);
    require(address(this).balance >= goal);
    require(msg.value == 0);
    
    withdraw();

    assert(address(this).balance == 0);
}
```

Vale a dire:$$timestamp>end \land this.balance > goal \land msg.value = 0 \land wd \land \lnot revert \vdash this.balance = 0$$
La maggior parte di quelle require sono già incluse in $wd$ (non so come formalizzarlo), quindi possiamo toglierle per idempotenza:$$wd \land \lnot revert \vdash this.balance=0$$
E quindi sì, è uguale, il test è corretto, mi sembra.

Adesso vediamo v2:

Ok il fatto è che $end=2^{256}-1$, quindi $\forall timestamp,\ \lnot(timestamp > end)$. Ah però $wd$ non include $timestamp>end$. Ah, ecco il problema. In un certo senso è cambiata la definizione di $wd$. Però noi abbiamo FP, qua mi aspetterei FN, questo significa che c'è un errore nel ground truth.

E infatti, `withdraw` reverterà sempre. Quindi $wd \land \lnot revert = \bot$, e quindi la regola vale vacuamente. Ah no no no no no sono stupido di nuovo. Questo wd reverta quando il goal non è ancora raggiunto. Ma allora che succede? Succede che dopo la wd si può ancora donare, quindi subito dopo la wd qualcuno può donare e il test vede che il bilancio non è $0$. E ti dirò di più, a causa della rientranza il bilancio può aumentare *durante* l'esecuzione di `withdraw()`, niente da fare.

**owner-only-recv**

> only the owner can receive ETH from the contract.

Vale a dire:$$this\xrightarrow{send}x \vdash x = owner$$
v2, v21 e v7 FN su Certora.

Non è havoc. Vediamo il test e formalizziamolo:

```CVL
ghost bool violated {
    init_state axiom violated == false;
}

hook CALL(uint g, address addr, uint value, uint argsOffset, uint argsLength, uint retOffset, uint retLength) uint rc {
    if (addr != currentContract.owner && value != 0) {
        violated = true;
    }
}

rule owner_only_recv {
    assert(violated == false);
}
```

$$\forall method,\ method \vdash msg.sender \neq owner \land msg.value \neq 0 \to \bot$$
Scritto in modo meno stupido:

$$\forall method,\ method \vdash msg.value \neq 0 \to msg.sender = owner$$
Che è un altro modo per scrivere quello di prima, quindi il test in sé è giusto.

Non capisco.

No aspetta, che dice? Ah ok certo

* v2 non finisce mai la fase di donazione quindi non si può fare reclaim
* v7 reclaim reverta sempre quando prova a inviare soldi, ma lo fa anche withdraw
* v21 reverta sempre
Con tutte e tre neghiamo l'antecedente. Ah ho dimenticato di formalizzare che non reverta. Però neghiamo l'antecedente con tutte e tre.

Il problema con withdraw di v7 fallirebbe il test se il test facesse la fallacia della negazione del conseguente, ma non è questo il caso.

Boh anche con Copilot non capisco.

Il resto lo lascio a domani, faccio in aereo

* **reclaim-own-funds**: molto strano su SolCMC
* **wd-transfer-to-owner**: v2 Certora

---

### reclaim-own-funds

Solito metodo.

Descrizione in inglese:$$reclaim \land \lnot revert \vdash \Delta (msg.sender.balance)=donation[msg.sender]_{before}$$
SolCMC:$$reclaim \land \lnot revert \vdash \Delta(msg.sender.balance)=donation[msg.sender]_{before}$$
Certora:$$reclaim \land \lnot revert \vdash \Delta(msg.sender.balance)=donation[msg.sender]_{before}$$
Implementazione in v1:$$reclaim \land \lnot revert \vdash \Delta(msg.sender.balance)=donation[msg.sender]_{before}$$

Su Certora, vediamo che è perlopiù $FP!$,  tranne $TP!$ su v2, v21 e v9, e $TN$ su v4 e v7. Su SolCMC invece è tutto corretto.

La ground truth ci dice che la proprietà deve essere falsa perché il sender può essere un contratto che redirige i soldi a un altro indirizzo, di cui SolCMC può tenere conto ma Certora no. Ci aspettiamo dunque molti positivi da parte di Certora, che sono corretti nel caso di v2 e v21 perché revertano troppo, e v9 invece perché donation è sempre $0$ (non viene usata) e quindi reclaim reverta comunque sempre.

Vediamo invece i negativi su v4 e v7. In v4, reclaim invia 1 wei meno di quanto dovrebbe (ovviamente Certora se ne accorge), e v7 invece reverta, oltre alle condizioni normali incluse in $revert$, reverta se il pagamento funziona e non reverta se non funziona, cioè i casi che arrivano all'assert sono quelli dove il pagamento non ha funzionato e quindi ovviamente il test non passa.

Quindi niente di strano? Cosa scrivo?

Ricapitolando, di base Certora dà falsi positivi perché non considera il caso in cui il ricevente dei soldi li inoltra subito a qualcun altro. I veri positivi sono su versioni che lo passano vacuamente revertando sempre. I veri negativi sono su un caso semplice (la formula usata è semplicemente sbagliata) e su uno che non reverta solo se il pagamento non ha funzionato (e quindi arriva all'assert senza aver inviato soldi).

Quindi ok, ho scritto nel test i motivi per cui dà falsi positivi:

> Fails to take into account cases where the sender redirects the funds to another address upon receiving them, yielding false positives.

> The test will still fail if the contract sends the wrong amount in a non-reverting call.

### wd-transfer-to-owner

> after a non-reverting `withdraw`, the ETH balance of owner is increased by an amount equal to the balance (of Crowdfund) before `withdraw` was called

$$wd \land \lnot revert \vdash \Delta(owner.balance) = this.balance_{before}$$

Con SolCMC non c'è. Abbiamo detto che non si può vedere il bilancio di un altro contratto in SolCMC? Non lo so.

Con Certora invece, abbiamo FP su v10 ed FN su v2.

Per v1 questa proprietà non vale, con la giustificazione:

> This property is false, since `owner` can be a contract which can redirect the received funds to another address.

Vediamo come è scritto il test in Certora.$$time>end \land this.balance > goal \land msg.value=0 \vdash \lnot revert \to \Delta(owner.balance)=this.balance_{before}$$
Notiamo che ~~la maggior parte delle volte dimentico di mettere il metodo nelle assunzioni~~.

Notiamo che in realtà è equivalente all'altro, perché possiamo spostare l'antecedente nelle assunzioni e applicare l'idempotenza della congiunzione. Visto che però le condizioni di revert nelle altre versioni possono cambiare, questo può non essere vero per tutte le versioni. Li chiamerei $revert_1$, $revert_2$ e $revert_{10}$.

v2 rende impossibile $time > end$, ma lo rimuove dalla definizione di $\lnot revert$. Non capisco come questo cambi la sua interazione con questa proprietà, quindi adesso scrivo il test in SolCMC e vedo che mi dice. Effettivamente SolCMC concorda e dice che per v2 vale. Ma non ha sens- ah... È vacua. Perché $time>end$ è sempre falsa. Rimuoverei quegli assert, perché tanto lo sa già se reverta o no. Tanto tecnicamente la definizione della proprietà non lo specifica. Ed ecco qua che è falsa anche per v2.

Ah no ma avevamo FN su v2. E adesso momentaneamente mi ha dato P!. E... non ha comunque senso, perché i cambiamenti in v2 non cambiano quella cosa. Io cambierei la ground truth.

Ora v10. v10 è quella sicura: è non-rientrante, richiede che il costruttore non abbia codice (un metodo fallato per controllare che sia un utente e non un contratto), che l'obiettivo sia strettamente positivo, che il timestamp di fine sia nel futuro, e che il contratto non abbia soldi dopo la withdraw. Falso positivo. Qui c'è allora da capire *perché* il test Certora non passa nelle altre versioni, perché come sappiamo non è il motivo giusto: SolCMC infatti non passa neanche con v10. Credo che sia il solito motivo della reentrancy, non c'entra niente col motivo dato dalla ground truth. Quindi è un'effettiva limitazione di Certora.

### Ricapitolando tutto quanto

Vediamo tutti i falsi che rimangono su Crowdfund:

* **donate-bal-inc** FN v4 v9: Errore stupido dei tool.
* **donate-not-dec-donation** FN v14 SolCMC: Non l'ho capito.
* **donation-dec-onlyif-reclaim** FN v2 v7 SolCMC: Reentrancy.
* **donation-dec-onlyif-reclaim** FP molti Certora: Reentrancy.
* **donation-inc-onlyif-donate** FN molti SolCMC: Reentrancy.
* **no-deadlock** FP v9 v21 SolCMC: Vacue (revert e abuso degli attributi).
* **no-deadlock** FN v6 Certora: Chiedere a Bartoletti (addirittura?).
* **no-receive-after-deadline** FP v7 v21 Certora: Limite del tool, non considera interferenze esterne se non è il contratto stesso a fare chiamate esterne.
* **owner-only-recv** FN v2 v7 v21 Certora: Ah... FN perché a occhio le chiamate che inviano soldi ad altri esistono, ma in realtà revertano sempre, e non so come risolvere il problema senza fare danno.
* **reclaim-own-funds** FP molti Certora: Limite del tool, redirezione dei soldi.
* **wd-empties-balance** FP v2 SolCMC: Vacuo, revert.
* **wd-full-balance** FP v10 Certora: Redirezione e rientranza.
* **wd-transfer-to-owner** FP v10 Certora: Redirezione e rientranza.

Quindi gli unici strani sono **donate-not-dec-donation** che non ha senso e **no-deadlock** che è da chiedere a Bartoletti.

---

Per prima cosa tutti gli UNK, perlopiù di Z3 perché è lentissimo.

Rimarranno poi gli ERR delle versioni che richiedono di modificare i test perché i parametri formali sono diversi.

```Bash
python run_solcmc_simple.py --contract crowdfund --version 9 --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property donation-dec-onlyif-reclaim --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property donation-inc-onlyif-donate --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property no-receive-after-deadline --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property reclaim-own-funds --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property wd-empties-balance --solver z3 --timeout 300
creaReadme crowdfund
python run_solcmc_simple.py --contract crowdfund --property wd-transfer-to-owner --solver z3 --timeout 300
creaReadme crowdfund
```

18:17, si comincia, vediamo quando finisce tutto.

19:20 siamo a **reclaim-own-funds**, tutto inutile tra l'altro perché è ancora pieno di UNK.