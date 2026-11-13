---
cssclasses:
  - r54
---
### `commit-not-revert-isCommitted-was-false`

E qui come dovrei fare?

* $p$: `commit()` avviene con successo, cioè non reverta, `0011`
* $q$: `isCommitted`, `0101`
* $\alpha$ **commit-reverts-if-isCommitted**: $q \to \lnot p$, `1110`
* $\beta$ **commit-not-revert-isCommitted-was-false**: $\lnot q \to p$, `0111`
* $\alpha \land \beta$ **specifiche**: `0110`, cioè $p \text{ xor } q$.
* Una versione con $\lnot \alpha \land \beta$ `0001`
* Una versione con $\alpha \land \lnot \beta$ `1000`
 
---

Allora, capiamo HTLC ora che capisco bene questo tirocinio.

Ci sono proprietario e verificatore, due utenti. Il proprietario ha un segreto che può essere svelato dopo. Il segreto è una stringa, e inizialmente il contratto ne salva lo SHA256.

Il proprietario invia lo SHA256 e dei soldi. $1000$ blocchi dopo (un blocco è un'unità di tempo della macchina virtuale di Ethereum), se il segreto non è ancora stato rivelato come stringa, i soldi vengono inviati al verificatore. Se invece il proprietario rivela il segreto entro $1000$ blocchi, i soldi tornano al proprietario.

Quindi ci sono tre metodi: `commit` per inviare i soldi e lo SHA256, `reveal` per rivelare il segreto e riprendersi i soldi, `timeout` per prendere i soldi scaduto il contratto.

Le proprietà sono:
* **balance-only-increases-on-commit**: $\lnot revert \vdash \Delta (this.balance) \neq 0 \to commit$
- **cant-uncommit**: autoesplicativo
- **commit-auth-owner**: $commit \land \lnot revert \vdash sender = owner$
- **commit-minimum**: $commit \land \lnot revert \vdash \Delta(this.balance)\geq fee$
- **commit-reverts-if-isCommitted**: autoesplicativo
- **commit-twice-reverts**: $commit_{before} \land \lnot revert \vdash commit_{after} \to revert$
- **contract-balance-is-commit-value**: $commit \land \lnot revert \vdash this.balance = fee$, vedo già il problema della `selfdestruct`
- **owner-immutable**: $\forall method \vdash \lnot\Delta(owner)$
- **reveal-auth-owner**: $reveal \vdash \lnot revert \to sender = owner$
- **reveal-timeout-after-isCommitted**: $(reveal \lor timeout) \vdash \lnot revert \to isCommitted$
- **reveal-transfer**: $reveal \land \lnot revert \vdash \Delta(owner.balance) \geq this.balance_{before}$
- **reveal-zeroes-balance**: $reveal \land \lnot revert \vdash this.balance = 0$
- **sent-le-init-bal**: I soldi inviati dal contratto sono al più i soldi depositati all'inizio.
- **timeout-deadline**: $timeout \land \lnot revert \vdash e.block > init.block + waitTime$
- **timeout-transfer**: $timeout \land \lnot revert \vdash \Delta(verifier.balance) \geq this.balance_{before}$
- **timeout-zeroes-balance**: $timeout \land \lnot revert \vdash this.balance = 0$
- **verifier-immutable**: $\lnot \Delta(verifier)$
- **wrong-preimage-reverts**: $reveal(s) \land \lnot revert \vdash hash = sha256(s)$

Ok. Io a quanto pare ho fatto la versione 15 di questo coso, che vïola **commit-reverts-if-isCommitted**, semplicemente togliendo una require. Vediamo tutte le versioni:

1) Normale
2) Puoi fare commit dopo reveal e timeout
3) Puoi fare timeout un blocco in anticipo
4) Timeout paga il mittente anziché il verificatore
5) Chiunque può committare
6) Chiunque può rivelare
7) Reveal e timeout discommittano
8) Reveal accetta tutte le stringhe
9) Puoi committare anche $0 \text{ ETH}$
10) Reveal paga il verificatore anziché il proprietario
11) Timeout paga il proprietario anziché il verificatore
12) Se paghi, reveal cambia l'hash salvato per darti ragione
13) Se paghi, timeout rende te il verificatore
14) Se paghi, reveal rende te il proprietario
15) Puoi committare più volte

Tutte le proprietà sono falsificate almeno una volta. Aggiungerei versioni che revertano sempre e che non fanno niente e cose del genere. 16 reverta sempre, 17 non fa niente ma non reverta, 18 non fa niente e reverta quando dovrebbe.

Vediamo come fare la ground truth. Se c'è $\lnot revert$ nelle assunzioni o nell'antecedente, 16 è vera di sicuro. 

Ok facendo la ground truth vedo che lì c'è una proprietà non presente altrove, **commit-not-revert-isCommitted-was-false**, che immagino sia $commit \vdash \lnot isCommitted \to \lnot revert$. È falsa solo in v15, ma v15 l'ho fatta io, che succede. Aspetta, questa proprietà non c'era prima che arrivassi io, cos'ho fatto?

????????????????????????????????????????

Il 13 ottobre io ho aggiunto questa cosa alla ground truth. Il 23 luglio Monti l'ha aggiunta al readme e ha fatto un test Certora, ma era già nello skeleton. Poi il 24 luglio l'ha tolta dallo skeleton. Non so perché io ce l'abbia allora. Va be' la tolgo.

Che casino lol.

Va be' direi che, capito tutto questo, è il momento di eseguire tutti i test su queste mie nuove versioni.

Visto che non l'ho mai fatto credo, metto il comando qui visto che me lo sto preparando.

```bash
python run_solcmc_simple.py --contract htlc --version 16 --timeout 120
python run_certora_simple.py --contract htlc --version 16
python run_solcmc_simple.py --contract htlc --version 17 --timeout 120
python run_certora_simple.py --contract htlc --version 17
python run_solcmc_simple.py --contract htlc --version 18 --timeout 120
python run_certora_simple.py --contract htlc --version 18
creaReadme htlc
```

Vedo degli `ERR` che non capisco, lo lascio girare.

Ah vedo che non sono sicurissimo di come ho fatto la ground truth perché certe cose diventano difficili da definire quando faccio il coglione e faccio revertare tutto, e che i test Certora non sono mai stati eseguiti. Tocca eseguirli adesso. Vedo quanto ci mette la versione 1. Dalle 16:06 alle 16:08. Dai ci sta.

|         | balance-only-increases-on-commit | cant-uncommit                    | commit-auth-owner                | commit-minimum                   | commit-reverts-if-isCommitted    | commit-twice-reverts             | contract-balance-is-commit-value | owner-immutable                  | reveal-auth-owner                | reveal-timeout-after-isCommitted | reveal-transfer                  | reveal-zeroes-balance            | sent-le-init-bal                 | timeout-deadline                 | timeout-transfer                 | timeout-zeroes-balance           | verifier-immutable               | wrong-preimage-reverts           |
|---------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------------|
| **v1** | FP!                              | FN                               | TP!                              | TP!                              | TP!                              | FN                               | TN                               | FN                               | FN                               | FN                               | TN                               | TN                               | ERR                              | TP!                              | FP!                              | TN                               | FN                               | FN                               |

Alla grande.

---

Vedendo i risultati di HTLC, vedo cosa fare.

SolCMC
* **balance-only-increases-on-commit**, **cant-uncommit**, **owner-immutable**, **sent-le-init-bal** e **verifier-immutable** hanno problemi nei test, danno `ERR` e a primo sguardo l'errore mi sembra stupido
* **commit-reverts-if-isCommitted** dà FP su v17 che non reverta mai, e in più non capisco come hanno fatto il test
* **commit-twice-reverts** FN su v7
* **reveal-timeout-after-isCommitted** FP su v7
* **reveal-transfer**.sol e **reveal-zeroes-balance** FP su v18 e non credo sia colpa mia
* **timeout-transfer** FP su v17 e v18 e non so se è colpa mia
* **timeout-zeroes-balance** FP su v18

Certora è un puttanaio. Prima faccio una lista di quelli dove la maggior parte sono falsi
* **balance-only-increases-on-commit**, per `selfdestruct`
* **cant-uncommit**, ???????
* **commit-twice-reverts** in realtà solo metà, che strano
* **owner-immutable** ?????????????????
* **reveal-auth-owner** com'è possibile, non li ho neanche fatti io
* **reveal-timeout-after-isCommitted**
* **timeout-transfer**
* **verifier-immutable**
* **wrong-preimage-reverts**

Ora invece vediamo quelli con una quantità più interessante di falsi
* **commit-minimum** FN su v3 e v4
* **reveal-transfer** FP su v8 e v16

Tra l'altro non avevo messo la ground truth per v15, cosa stavo pensando.

Ci sarà molto da fare, così almeno posso continuare a rimandare il momento in cui dovrò chiedere informazioni a Bartoletti per fare la PR.

Vediamo un po', che faccio.

* **cant-uncommit** fallisce perché considera anche stringhe troppo lunghe per la funzione di hashing.
* **commit-twice-reverts** era eccessivamente complicata prima, faceva chiamare un metodo qualunque ma poi richiedeva che fosse commit, l'ho resa più semplice e funziona.
* **owner-immutable** stessa cosa della stringa lunga
* **reveal-auth-owner** il metodo colpevole per la cosa della stringa, con `require s.length <= 224;` funziona almeno su v1
* **reveal-\*** stessa cosa.
* **timeout-transfer** problema di overflow, corretto $a\geq b+c$ in $a-b \geq c$.
* **verifier-immutable** stringa lunga
* **wrong-preimage-reverts** stringa lunga

Per quelli che chiamano il metodo generico `f` anziché un metodo specifico che usa l'hash, devo capire come limitare la lunghezza della stringa, perché in quei casi si usa un parametro generico.

Quindi quelli sarebbero **cant-uncommit**, **owner-immutable** e **verifier-immutable**.

Farò qualcosa che tecnicamente non va bene, cioè cambiare solo per i due metodi esistenti che prendono una stringa in input. Questo significa che una nuova versione che ha un nuovo metodo che prende una stringa in input fallisce il test. Nacque così HTLC v19.

Quindi... Cosa rimane di falso con Certora?

* **balance-only-increases-on-commit** `selfdestruct`
* **commit-minimum** v3 v4
* **reveal-transfer** redirect
* **sent-init-le-bal** ERR
* **timeout-transfer** `selfdestruct`
* **wrong-preimage-reverts** era uno di quelli che dovrei aver aggiustato con questa cosa della lunghezza

Comunque un grande miglioramento.

---

**wrong-preimage-reverts**, non so perché prima non andasse. Prima richiedeva che la preimmagine fosse sbagliata e asseriva che reveal revertisse, $hashing(s)\neq hash \vdash reveal \to revert$, ora l'ho resa più simile alla descrizione in inglese, $reveal \vdash \lnot revert \to hashing(s) \neq hash$ e funziona.

Falso positivo su v12. Ed è perché leggo l'hash dopo aver fatto reveal. `hash` è un `bytes32`. La leggo prima, ed è comunque negativa. Ok ho capito perché, dice "committed hash", quindi la devo committare dentro il test.

Risposta finale:
```CVL
bool correctPreimage = (hashing(e, s) == hash);
commit(e, hash);
reveal(e, s);
assert correctPreimage;
```

Non copio l'intero codice perché la licenza è *GPL-3.0-only* e non ricordo come funzioni, quindi scrivo del codice incompleto con logica equivalente.

Per quella cosa della lunghezza della stringa, ho provato a fare così:

```CVL
mathint passString;

if (passString == 0) {
	f(e, args);
} else if (passString == 1) {
	f(e, s);
} else if (passString == 2) {
	f(e, args, s);
} else {
	f(e, s, args);
}
```

Però al generico `method f` puoi passare solo un `env` e un `calldataarg`.

Vediamo **commit-minimum**. Quando chiami `commit` devi pagare almeno `fee`. Il test semplicemente committa e poi asserisce che il valore sia almeno `fee`. Ok c'è un errore nel codice di v3, probabilmente copiato da una versione vecchia di v1: il check confronta col letterale `1 ether` anziché con la variabile `fee`. Sì infatti 5 mesi fa era così anche su v1. Ok semplice.

Ultima, **sent-init-le-bal**. Codice orrendo, non perché è fatto male ma perché è molto diverso dal solito, quasi alieno. Ok dà `ERR` perché è troppo lenta ma non passa neanche. Vedo molti ghost quindi credo sia un problema di havoc.

Io copio la risposta di Copilot, poi ci penserò:

> This is a **real counterexample reported by the prover**, not a Solidity compiler error or a prover crash. The constructor/base check passes; the failure is in the **induction step**: the prover checks whether every state satisfying your invariant stays within it after a method call.
> 
> The invariant in `sent-le-init-bal.spec` is too weak to prove that:
> 
> - Its `init_state` axioms set the ghosts to zero initially, but the induction step does not assume every candidate pre-state is reachable from that initial state. It assumes only `total_sent <= _deposited`.
> - That condition allows a candidate pre-state with `isCommitted == false` but `total_sent == 8`.
> - In the `commit` counterexample, `commit` accepts `msg.value == 3` and the HTLC balance becomes `6`. The `isCommitted` hook then sets `_deposited` to `6`, while `total_sent` remains `8`. So the post-state violates `8 <= 6`.
> 
> The reveal and timeout reports show the same underlying weakness: their candidate pre-states contain ghost values that are inconsistent with the intended protocol history. For example, the reveal trace starts with `total_sent == -1`. Those values aren’t reachable from the zero-initialized ghosts, but the current invariant doesn’t rule them out.
> 
> To prove the intended property, strengthen the invariant to capture the protocol phase and the ghosts’ valid ranges—for example, that `total_sent` is nonnegative, and that before commitment both ghosts are zero. Also check that the `CALL` hook counts only the transfers you intend to include.

---

Vediamo SolCMC.

Tutto `ERR`:
* **balance-only-increases-on-commit**
* **cant-uncommit**
* **owner-immutable**
* **sent-le-init-bal**
* **verifier-immutable**

Pochi falsi:
* **commit-reverts-if-isCommitted** Pv17
* **commit-twice-reverts** Nv7
* **reveal-timeout-after-isCommitted** Pv7
* **reveal-transfer** Pv18
* **reveal-zeroes-balance** Pv18
* **timeout-transfer** Pv17v18
* **timeout-zeroes-balance** Pv18

v17 e v18 li ho fatti apposta per avere falsi positivi. È più interessante che v7 abbia un falso positivo e un falso negativo. `reveal()` e `timeout()` discommittano. **reveal-timeout-after-isCommitted** è semplice da correggere, basta leggere `isCommitted` prima di chiamare il metodo. Ah è già così. Problema di ground truth?

Inglese:
> `reveal()` and `timeout()` can only be successfully called if contract is in a committed state

SolCMC:
> $(reveal \lor timeout) \land \lnot revert \to \lnot \lnot isCommitted_{before}$

Certora:

> $(reveal \lor timeout) \land \lnot revert \to isCommitted_{after}$

Ecco qui la fregatura. Eccola qui.

E qui c'è da chiedere a Bartoletti. Perché in inglese mi sembra che `isCommitted` vada letta prima, ed è ciò che fa SolCMC, ma Certora e la ground truth la vogliono letta dopo.

Vediamo l'altra. Ok anche qui ambiguità in inglese immagino, "any immediate \[sic\] following calls to `commit()` must revert". Quindi vanno fatte di fila. Ma il test SolCMC permette anche di avere due chiamate non consecutive. Ma "immediately following" cosa significa?

Ok, se vediamo tutte le proprietà, vediamo che c'è sia **commit-revert-if-isCommitted** che non specifica "immediately" che **commit-twice-reverts**, che specifica "immediately". Quindi immagino che debbano essere di fila. Peccato, mi piaceva questo codice. Vedo se posso mettere una preghost che si applica a tutti i metodi.

Ok vedo che non esiste documentazione pratica di SolCMC. Ho trovato solo un pdf che spiega il lato formale, ma ho fatto CTRL+F `preghost` e non c'era. Cerco nella documentazione di Solidity. Nulla. Copilot. Sembra non si possa. Addio codice carino.

La cosa più semplice che mi viene in mente.

```Solidity
function invariant() public view {
    commit();
    commit();
    assert(false);
}
```

Ok falso positivo su v17 ma ok tanto quello è strano, ora stacco.

Vediamo gli ERR. **balance-only-increases-on-commit**. Vedo della sintassi carina: `msg.sig` è la signature del metodo del messaggio, `this.commit.selector` è la signature di `commit()`, e le puoi confrontare per vedere se il metodo chiamato è quello lì. Ma perché ERR? Figo non ha senso. Devo modificare il parser mi sa. Anzi no vedo un `/// @custom:invariant` che non ho mai visto, provo a toglierlo. Nop ok peggio. No non capisco come modificare il parser.

Ah.

```
$ python run_solcmc_simple.py --contract htlc --version 1 --property balance-only-increases-on-commit

Using z3 as backend SMT-solver:
Compiler run successful. No output generated.

../contracts/htlc/solcmc/build/contracts/Htlc_balance-only-increases-on-commit_v1.sol: ERR

Using eld as backend SMT-solver:
Compiler run successful. No output generated.

../contracts/htlc/solcmc/build/contracts/Htlc_balance-only-increases-on-commit_v1.sol: ERR
```

Ok il problema era che il test stava usando una funzione interna come invariante, segnata come `/// @custom:invariant`, con un assert dentro, ma non veniva mai eseguita e non faceva nulla. Ho messo gli assert nel postghost. Ho anche provato 300 strategie diverse e o dà positivo a tutto o negativo a tutto.

Ah ok no falliscono perché `selfdestruct` ovviamente. Mi accontento.

Immagino che **cant-uncommit** abbia lo stesso problema. Sì, un'invariant segnata come interna, basta metterla pubblica. E le altre due.

Ok, carino, i preghost e postghost hanno accesso alle variabili dei metodi, mentre un'invariant no.

Situazione:

* v16, v17 e v18 hanno falsi positivi dove te l'aspetti.
* **commit-twice-reverts** FPv15 è molto strano, FPv2 non capisco se è normale

Ah, fine, ok.

???????? Perché **sent-le-init-bal**.spec dà `ERR` su tutto? Timeout. Ah certo, non capisco nulla di questo codice.

```
'--contracts', './versions', '--specs', './certora/sent-le-init-bal.spec', '--version', '19', '--output', './certora']
ERROR:root:WARNING: 'wait_for_results' has no effect in local tool runs
WARNING: Build cache is used with a local certora-cli script version. Beware of false hits and unexpected behaviors!
Start Mon Nov 02 23:02:42 CET 2026
The scene contains 1 contracts:
Htlc : 0xce4604a0000000000000000000000001
Running initial transformations
Has CVL checks.
Checking CVL certora/sent-le-init-bal.spec for contract Htlc
Unrolling loops 1 time, unwinding condition is asserted
Verified: inv-Induction base: After the constructor
Violated: inv-Using general requirements-timeout()
Violated: inv-Using general requirements-commit(bytes32)
Violated: inv-Using general requirements-reveal(string)
Error: Timed out waiting for background tasks:
    
Done 0m
Compiling versions/Htlc_v19.sol...
Compiling versions/Htlc_v19.sol to expose internal function information and local variables...
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_02_23_02_39_263972f44c
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_02_23_02_39_263972f44c" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-6] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

Allora. Ci sono due variabili ghost, una per i soldi depositati e una per i soldi inviati, inizializzate a $0$. Ad ogni chiamata, i soldi inviati vengono incrementati del valore del messaggio. Vedo una cosa strana:

```CVL
hook Sstore isCommitted bool newVal (bool oldVal) {
    if (newVal && !oldVal) {
        _deposited = to_mathint(nativeBalances[currentContract]);
    }
}
```

Non ho modo di capire cosa è una keyword e cosa no, quindi posso solo sperare che faccia esattamente quello che sembra: la variabile dei soldi depositati è sempre uguale al bilancio del contratto.

E poi c'è un'invariante, che richiede che il totale dei soldi inviati siano meno del bilancio.

Ahhh ok. Quel `newVal` e `oldVal` significano "la variabile sta venendo assegnata" e "la variabile conteneva già un valore". Cioè quell'hook si attiva quando la variabile viene assegnata per la prima volta. Ah no quella è `isCommitted`, quindi niente quello che dicevo non ha senso. Questo hook si attiva quando `isCommitted` viene assegnata, `oldVal` è il valore prima dell'assegnamento e `newVal` è il valore dopo l'assegnamento, quello che io scrivevo $isCommitted_{before}$ e $isCommitted_{after}$.

Ora, perché timeouta? Ah che coincidenza, non solo timeouta Certora, il contratto vïola la proprietà col metodo `timeout()`. Immagino per l'havoc.

wrxecgvbyinompinobiytvycrexuiopmuytvy e ora che faccio??????????

Il mio tentativo ovviamente fa schifo, ma vale la pena provare.

```CVL
rule sent_le_init_bal {
    method f1;
    method f2;
    method f3;
    calldataarg arg1;
    calldataarg arg2;
    calldataarg arg3;
    env e;

    mathint sent = 0;
    mathint deposited = 0;

    f1(e,arg1);
    mathint sent1 = sent + total_sent;
    f2(e,arg2);
    mathint sent2 = sent1 + total_sent;
    f3(e,arg3);
    mathint sent3 = sent2 + total_sent;
    deposited = _deposited;

    assert sent3 <= deposited;
}
```

Beh, il test sta andando. Da molto. Vediamo i log- santi numi quanti file sono.

![[Pasted image 20261102231946.png]]

Credo siano $O(n^3)$ file dove $n$ è il numero di metodi possibili. Quando di solito sarebbe $O(n)$. Il report ha 14k righe e non ha ancora finito. 1500 file e passa. Ma quindi sono 14k o 1k4 righe? 14k, avevo letto bene. Beh adesso sono 17k. Basta.

Ok, mi tengo l'ERR.

Che brutta esperienza.

