---
cssclasses:
  - r54
---
## Primo obiettivo

Rendi escrow, che è vecchio, agli standard di bank

## Cos'ho capito

Ogni contratto ha delle proprietà che devono valere. Queste di base sono scritte in linguaggio naturale (scritto in modo preciso perché un tempo erano più concise ma ambigue).

Nel readme generale c'è una lista di contratti (detti casi d'uso). Quelli segnati con ✅ sono quelli che adesso sono fatti correttamente (per esempio bank). Gli altri sono da aggiustare.

Ogni contratto ha diverse versioni (tipo 10 20). Molte sono sbagliate, quindi non rispettano le specifiche (proprietà) del linguaggio. Quello che dobbiamo fare non è correggerli, non ci interessano i contratti. Quello che ci interessa sono i tool di verifica: noi vogliamo controllare che i tool di verifica verifichino correttamente la correttezza dei contratti. Appunto la repo si chiama "benchmark", stiamo benchmarkando i tool di verifica.

Quindi dovrò anche scrivere delle implementazioni di escrow sbagliate, ma sbagliate in modo subdolo e difficile da cogliere, così che fallisca solo in casi estremamente specifici.

I tool di verifica hanno delle limitazioni espressive. Quindi può succedere che un tool dia positivo ma che in realtà sia negativo (falso positivo), per questo usiamo più tool.

Come facciamo a dimostrare che un contratto è corretto? È corretto quando funziona correttamente con tutti gli input. Questo però è un $\forall$, notoriamente difficile da dimostrare. Invece per dimostrare l'incorrettezza basta un singolo controesempio, $\exists$. Quello che ci interessa è scrivere controesempi.

Foundry è un tool di fuzzing che trova controesempi. Non mi pare abbia menzionato Foundry a me nello specifico però ora che ci penso, c'è nella repo e mi sono informato su cos'è ma mi pare che io debba usare solo Certora e Solcmc.

Il readme di ciascun contratto è generato automaticamente da Makefile e io non lo devo toccare. È generato sulla base del codice, infatti ci sono dei commenti segnati con `//@custom` che poi vengono riportati nel readme.

## Quindi allora

Prendiamo per esempio Escrow, che è quello che mi ha assegnato per ora proprio perché è vecchio e semplice.

Abbiamo il `v1` con `/// @custom:version conformant to specification.` e il `v2` con `/// @custom:version allow arbitrate in any state.` riferito alla proprietà:

> **auth-in-agree**: in the Agree state, only the buyer and the seller can perform actions.

Appunto quello che cambia è che nel `v2` è stato rimosso un modificatore a una funzione:

```Solidity
function arbitrate(address dst) instate(State.DISPUTE) public {...}
```

Se vediamo cos'è quel modificatore:

```Solidity
modifier instate(State expected_state){         
	require(state == expected_state);
	_;
}
```

Quindi appunto, l'arbitro non richiede più lo stato di disputa, cioè è permesso negli altri stati, cioè l'opposto di quello che dice la proprietà.

Appunto noi in `ground-truth.csv`, che è uno spreadsheet che ci dice le cose vere sul contratto, vediamo:

| Property      | Version | Truth |
| ------------- | ------- | ----- |
| auth-in-agree | v1      | 1     |
| auth-in-agree | v2      | 0     |
Cioè, `auth-in-agree` *non vale* nella versione v2.

La prossima cosa che dovrò capire saranno i test relativi a queste proprietà fatti con Certora e SolCMC.

## La prossima volta

Inferno.

Dà tutto errore e sto litigando con le versioni dei tool perché non si capisce niente, poi faccio cose non cambio niente e all'improvviso funziona.

Però una cosa si blocca per molto tempo e non so bene cosa pensare. Ma almeno adesso un test gira e i risultati sono gli stessi che ci sono nella repo.

## Crowdfund

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

## Litigando con Certora

Il fatto è che mi sa che il tool è sbagliato, perché è cambiato l'output di Certora. Ma questo è strano, perché un tale dal nome utente LoadWrench l'ha usato di recente e ha funzionato.

Magari me ne farò una ragione.

La cosa brutta è che un ambiente di Solidity ha una sorta di variabile globale `timestamp`, di tipo `uint64`, ma Certora lo testa con `uint256`, quindi possono esserci problemi di overflow, soprattuto coi confronti (dice che $x>y$, ma $x>2^{64}$ quindi una volta troncato la prima disuguaglianza non vale più).

E poi c'è tutto il problema del troncamento degli interi che rende tutto una merda. E quindi sai che faccio, guarda tu, ripesco il trick che usavamo con assembly e moltiplico entrambi i lati dell'equazione per il denominatore. Che è l'opposto di quello che facciamo con CSMN, dove vogliamo numeri bassi perché lavoriamo coi float.

## HTLC

### `commit-not-revert-isCommitted-was-false`

E qui come dovrei fare?

* $p$: `commit()` avviene con successo, cioè non reverta, `0011`
* $q$: `isCommitted`, `0101`
* $\alpha$ **commit-reverts-if-isCommitted**: $q \to \lnot p$, `1110`
* $\beta$ **commit-not-revert-isCommitted-was-false**: $\lnot q \to p$, `0111`
* $\alpha \land \beta$ **specifiche**: `0110`, cioè $p \text{ xor } q$.
* Una versione con $\lnot \alpha \land \beta$ `0001`
* Una versione con $\alpha \land \lnot \beta$ `1000`
 
### `reveal-preimage`

# Allora (18 ottobre)

Avendo installato correttamente Certora, direi che è il momento di fare le cose per bene. Ho aggiustato Escrow al meglio delle mie abilità, oggi Crowdfund.

`reclaim-own-funds` è tremendo. Con Z3 è perlopiù `UNK`, che va bene perché tanto con Eldarica va tutto bene. Ma con Certora è quasi tutto `FP!`, che va già male, ma addirittura ha sia `TP!` che `TN`, che è strano.

La `v10` ha un problema con gli import che non so come risolvere, mi dice che la cartella degli import è fuori dal path di solc.

`donation-dec-onlyif-reclaim` è perlopiù `FP!` con Certora, e con SolCMC non l'ho fatto, ma dovrebbe (*dovrebbe*) essere facile.

Ci ha messo esattamente un'ora a fare tutti i test di Certora tra l'altro.

`wd-empties-balance` ha un singolo `FP!` con SolCMC. Ci sono un paio di `FN` ma sono pochi e sparsi.

Per il resto, mancano molti test con SolCMC.

Non ho ancora cominciato a "fregare il tool" ed è passato esattamente un mese (su quattro e mezzo).

### Il 19 ottobre

Per quanto riguarda Crowdfund:
* **donation-inc-onlyif-donate** credo di aver finito, SolCMC non passa ma sembra un problema di SolCMC.
* **wd-empties-balance** ha un falso positivo su v2 perché v2 non permette di eseguire un wd, ma la logica del wd per il resto è uguale alle altre
* **no-deadlock** su v9 non ho capito è proprio strana
* **reclaim-own-funds** su Certora è strana e basta, mi sa che solcmc fa una sorta di havoc e certora no
* v14 mi sa che ha la ground truth sbagliata

Ma mi sa che semplicemente Crowdfund è troppo difficile per me ora.

Lottery ha tanta tanta tanta tanta roba, ma potrebbe essere interessante. No ma figo eh, `ERROR:root:Missing owner-impartiality-eoa-v23 ground truth.`, e io che ne so. Dai magari magari riesco a metterci mano. E tra l'altro è l'unico decente, sembra.

Ah no semplicemente hanno lasciato i risultati del test di v23 e v24 ma non v23 e v24 stessi.

#### Venti Ottobre

Scusa eh, Lending Protocol ha una ground truth incompleta. Come.

Quindi quello che farò adesso sarà:
* Capire una proprietà alla volta
* Guardare v5 e v6
* Completare la ground truth

I test Certora sono molto molto strani, ci sono cose che non ho mai visto, ma hanno senso.

Mi sa che controllo bene Escrow e vedo se posso fare una pull request. Devo anche vedere se posso fare una pull request con solo certi file e non altri.

> The main difference is that these are not equivalent harnesses.
> 
> - `arbitrate-send.spec` is a Certora **rule**. It calls `arbitrate` and checks the arbiter’s net balance change, using `mathint` so the difference is not subject to Solidity’s `uint` arithmetic.
> - `arbitrate-send.sol` defines a Solidity function named `invariant`, but that name has no special meaning to SolCMC. It is a public function that the model checker analyzes as part of the contract’s reachable behavior.
> 
> There’s also a likely contract-level confounder: the escrow versions declare `deposit` but don’t assign `msg.value` to it in the constructor. Starting from the constructor’s reachable state, `deposit` is therefore zero. For a positive `fee`, `deposit -= fee` in `arbitrate` underflows and the call reverts before sending the fee. Certora’s rule can reason about a pre-state where `arbitrate` succeeds; SolCMC’s harness runs against reachable state, where that successful path may not exist. A reported SolCMC assertion violation could therefore concern the underflow or the harness execution—not necessarily the fee-transfer assertion. The SolCMC result parser labels a generic “Assertion violation happens here” as a negative result.
> 
> The recorded outcomes also depend heavily on solver: `solcmc-eld.csv` has mostly `N` for this property, while `solcmc-z3.csv` has `UNK` for every version. Certora reports `P!` except for the known wrong-recipient variant, v5, which is `N`.
> 
> So the short answer is: the result gap is likely driven by the missing `deposit` initialization plus the difference between a Certora rule’s pre-state and SolCMC’s reachable-state analysis—not simply by SolCMC discovering that the arbiter receives the wrong amount. To confirm which assertion caused each `N`, we’d need the per-run SolCMC logs; the CSV summary doesn’t include that information.

Devo capire se Copilot dice il vero. Effettivamente deposit mi sembrava strano. Direi che provo a reimplementare da zero Escrow senza guardare v1. (l'ho fatto e l'ho ricreato quasi 1:1 carattere per carattere, inutile).

A mezzanotte capisco che la cosa da risolvere è proprio la cosa di `deposit` adesso. Ah e ho trovato un test che il tool effettivamente sbaglia.

### 21 ottobre

Ora che l'ho fatto, v3 non passa arbitrate send. Ah ma è giusto, ha ragione lui.

Devo poi aggiustare la didascalia di v3 e derivati.

Ehhhh... E mi sa che non c'è altro da fare. Sì ok no vedo che devo aggiungere le didascalie ok. Ma il codice in sé mi sembra finito. A meno che non voglia fare altre versioni ancora. E domani lascio il computer qui a girare test.

Fatto ciò, passerei agli altri contratti. Direi che aggiusto Crowdfund.

Anzi no ho pensato a una versione che reverta qualunque cosa tu faccia.

...

...

Ho sconfitto il computer?

```
ERROR:root:WARNING: 'wait_for_results' has no effect in local tool runs
WARNING: Build cache is used with a local certora-cli script version. Beware of false hits and unexpected behaviors!
Start Wed Oct 21 23:47:05 CEST 2026
The scene contains 1 contracts:
Escrow : 0xce4604a0000000000000000000000001
Running initial transformations
Has CVL checks.
Checking CVL certora/recipient-buyer-or-seller.spec for contract Escrow
Unrolling loops 1 time, unwinding condition is asserted
Error: Got exception Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule recipient_buyer_or_seller
Failed to compile rule recipient_buyer_or_seller due to utils.CertoraException: Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help.
Error: Timed out waiting for background tasks:
    
Done 0m
Compiling versions/Escrow_v15.sol...
Compiling versions/Escrow_v15.sol to expose internal function information and local variables...
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_10_21_23_46_59_148975e662
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_10_21_23_46_59_148975e662" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Got exception Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule recipient_buyer_or_seller
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

Non lo so. Credo sia semplicemente perché la variabile non è inizializzata? Ma dovrebbe esserlo a `0x0`, boh.

E se............... Io sono qui per testare i limiti dei tool. E ci devo fare la tesi. E adesso sto proprio capendo le basi di logica formale dietro questi limiti. E se tipo la tesi su questo?

### 22 ottobre vesting wallet

5exrctvbuiomp,è.

non so come tenere conto dell'errore di arrotondamento. non lo so. non lo so. csmn dovrebbe avermelo insegnato ma non l'ho capito. ho prvoato a bruteforce ma mi esce errore potenzialmente infinito, non lo so. devo capirlo meglio, ma non sono abbadtanza intelligenge. basta.

queso è il mio ragionamento

> How to correct for integer truncation
> 
> Let $a$, $b$ and $c$ be three timestamps such that s$tart<a<b<c<end$.
> Let $T$ be the constant `totalAllocation`, let $D=end-start$.
> Assume $start=0$, thus $end=D$.
> Let $v()$ be `vestingSchedule()`:
>      $v(x) := Tx/D$.
> Let $x=v(a), y=v(b), z=v(c)$.
> 
> If we're dealing with real numbers, then we want:
>      $(a-b)/(x-y) === (b-c)/(y-z)$
>      $(a-b)*(y-z) === (b-c)\cdot(x-y)$
> 
> Let's consider integer $v(x)$, that is, $⌊v(⌊x⌋)⌋$.
>      $⌊Ta⌋=Ta$, but $⌊Ta/D⌋\neq Ta/D$
>      We need an upper bound for $Ta/D-⌊Ta/D⌋$.
>          Call that upper bound E, we'll have:
>              $abs((a-b)\cdot(y-z)-(b-c)\cdot(x-y)) < E$
>      How do we compute $E$ in Solidity?
>      Looking back at all of this, this doesn't make sense, as $E<1$.
>      Could the error just be $4$?
>      I think the problem is that I assumed $start=0$;
> 
> Assume $start = S$
> $v(x) := T\cdot(x-S)/D$
> What's the error now?
> I just feel like it's still $4$ (of course I checked it and it's wrong).
> I'm just gonna test it in C.
> The test gives $1$ as maximum error.
> I did it wrong. What's at most 1 is $abs((a-b)\cdot(y-z)-(b-c)\cdot(x-y))/T$.
> Actually very rarely it's $>1000$.

Questo è il codice C bruttissimo che ho usato:

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

int start;
int duration;
int end;

int vestingSchedule(int totalAllocation, int timestamp) {
    if (timestamp < start) {
        return 0;
    } else if (timestamp > start + duration) {
        return totalAllocation;
    } else {
        return (totalAllocation * (timestamp - start)) / duration;
    }
}

float vestingScheduleFloat(int totalAllocation, int timestamp) {
    if (timestamp < start) {
        return 0;
    } else if (timestamp > start + duration) {
        return totalAllocation;
    } else {
        return ((float) (totalAllocation * (timestamp - start))) / ((float) duration);
    }
}

int main() {
    srand(time(0));

    start = abs(rand())%0xFFFF;
    duration = abs(rand())%0xFFFF;
    end = start+duration;

    printf("%d, %d, %d\n", start, duration, end);

    int totalAllocation = abs(rand())%0xFFFF;

    int e;

    float prod;

    float taError, sError, eError;

    for(int i = 0; i<1000; i++) {
        printf("\n\n");
        int t1 = abs(rand())%duration+start;
        int t2 = abs(rand())%duration+start;
        if(t2<t1) {e=t1; t1=t2; t2=e;};
        int t3 = abs(rand())%duration+start;
        if(t3<t2) {e=t3; t3=t2; t2=e;};
        if(t2<t1) {e=t1; t1=t2; t2=e;};

        int i1 = vestingSchedule(totalAllocation, t1);
        int i2 = vestingSchedule(totalAllocation, t2);
        int i3 = vestingSchedule(totalAllocation, t3);

        float f1 = vestingScheduleFloat(totalAllocation, t1);
        float f2 = vestingScheduleFloat(totalAllocation, t2);
        float f3 = vestingScheduleFloat(totalAllocation, t3);

        printf("Timestamps:\t\t%d\t\t%d\t\t%d\nvsInt:\t\t\t%d\t\t%d\t\t%d\nvsFloat:\t\t%f\t%f\t%f\n", t1, t2, t3, i1, i2, i3, f1, f2, f3);

        int di = (i2-i1)*(t3-t2) - (i3-i2)*(t2-t1);
        float df = (f2-f1)*(t3-t2) - (f3-f2)*(t2-t1);

        printf("Differences:\t\t%d\t\t%f\n",di,df);
        printf("Int ratios:\t\t%d\t\t%d\n", (i2-i1)/(t2-t1), (i3-i2)/(t3-t2));
        printf("Int ...:\t\t%d\t\t%d\t\t%d\n", (i2-i1)*(t3-t2), (i3-i2)*(t2-t1), (int)(prod=(i2-i1)*(t3-t2)-(i3-i2)*(t2-t1)));
        printf("Float ratios:\t\t%f\t%f\n", (f2-f1)/(t2-t1), (f3-f2)/(t3-t2));

        if(taError < prod/totalAllocation) taError = prod/totalAllocation;
        if(sError < prod/start) sError = prod/start;
        if(eError < prod/end) eError = prod/end;

        printf("Error ratios: %f, %f, %f\n", prod/totalAllocation, prod/start, prod/end);
    }

    printf("Error ratios: %f, %f, %f\n", taError, sError, eError);

    return 0;
}
```

Fa schifo e prima di questo codice non sapevo neanche che esistesse "floating point fault".

Ha pure sbagliato Copilot.





Per Escrow v8, devo ricordarmi che `///@custom:negate` esiste.

Ecco però cosa devo fare a Vesting Wallet:
* `exp-all-rel` non ha senso che non passi.
* v9 che ha `releasable` con alcune parti crescenti e altre piatte.
* `benef-only-recv` Certora con `hook` (require riceve assert beneficiario).
* `release-rel` stessa cosa (require beneficiario assert riceve).
* Porting di `rel-strict-incr` a SolCMC copiando quello che ho fatto con Certora.

Cos'ho fatto:
* `exp-all-rel` era il solito problema di conversione tra `mathint` e `uint64`, ma con SolCMC ancora non funziona.

##### 23 ott

fatto:
* v9
* `benef-only-recv`
* `release-rel` fa havoc e quindi devo usare il vecchio trucco di controllare una sola chiamata, quindi fallisce se l'ETH viene inviato in più chiamate, ma mi sa che passa ma dà errore devo capire.

`rel-strict-incr` invece dà positivo a tutto quindi non funziona comunque.

per vedere eoa, tx.origin == msg.sender


Altra idea, per rispettare bal Dec onlyif release o quello che è, durante il constructor invia tutto il balance a chi vuole, e così in teoria forse può fare quello che vuole con tutte le revert senza fallire neanche gli altri test.

### 24 ottobre

No quella cosa non ha funzionato, perché tanto rimangono altre proprietà che non valgono.

Per testare che v8 di non ricordo cosa reverta quando non dovrebbe, metti assert false e ///invert.

Tornando a Vesting Wallet, con molto aiuto da copilot ho capito come calcolare il margine d'errore dello strictly increasing. Non l'ho davvero capito, però quello che ha generato sembra funzionare. Domani lo devo mettere anche su solcmc.

Rimangono gli errori strani a caso in giro.

I falsi positivi su v8 sono giusti direi. Però non so se mettere exp-all-rel come coso invertito. Ah no, release può revertire perché c'è una chiamata esterna quindi probabilmente anche invertire non funzionerebbe, quindi direi che il mio lavoro ha funzionato. Qui si nota pure cosa significa che "le variabili dei metodi non vengono scritte sulla blockchain", perché i test non le possono leggere.

Release rel falsa su v10 è a causa del limite dell'havoc.

Rel strict incr falsa su v6 è a causa del mio metodo di merda di calcolo dell'errore.

Quindi tutto ciò che rimane da fare è tradurre tutto in solcmc e chiedere a Bartoletti che fare per lo strict incr, dopodiché posso passare a Crowdfund, è fatto quello farei la pull request.

Per Crowdfund, non so cosa fare dopo, ci penserò domani.

###### 26 ottobre

Niente, non ho capito bene cosa fare con Crowdfund, c'è troppa roba.

Ho provato a usare `/// @custom:negate` per rilevare le revert con SolCMC. Il fatto è che, e proverò a scriverlo in logica formale per ragionarci bene, sono veri i seguenti:$$\begin{matrix*}[l]
\vdash \lnot \exists\ \text{assert}(false) \Rightarrow P \\
\vdash \exists\ \text{assert}(false) \Rightarrow N \\
\text{negate} \vdash \lnot \exists\ \text{assert}(false) \Rightarrow N \\
\text{negate} \vdash \exists\ \text{assert}(false) \Rightarrow P
\end{matrix*}$$
Però è scritto malissimo non lo so fare mi arrendo.

Insomma, il fatto è che, di base, se esiste un caso in cui si può fare `assert(false)` e non c'è una revert, allora quel singolo caso rende l'intero test falso. Con negate, il contrario, un singolo caso che passa fa passare l'intero test. Perché la negazione viene applicata dopo.

Essenzialmente quello normale è $\land$, negate è $\lnot \land$, io voglio $\land \lnot$, che non sembra possibile, quindi mi arrendo.

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

## 30 ottobre 2026

Non ho fatto niente in aereo

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
### Altro

Avevo lavorato a Bet prima di correggere l'installazione di Certora, quindi devo rieseguire i test. (A questo punto per la PR controllo anche quello). Perché lì ho messo la quantità giusta di versioni credo (ogni proprietà è falsa in almeno una versione).

Ci sono dei test che danno ERR perché i metodi hanno parametri formali diversi da quelli di v1, quindi quei test sono da rieseguire prima della PR.

E poi devo controllare tutti i commenti dappertutto.

Quindi per ora avrei "aggiustato" 4 contratti. E vedo che Bank comunque ha 167 falsi e 656 veri, quindi sembra che avere molti falsi vada comunque bene.

Quindi più tardi faccio Bet.

### Bet

Noto che ho sempre dimenticato di mettere `view` alle invarianti. Da aggiustare. Inoltre c'è da mettere la licenza come su Bank, e usare solo `//` e non `///` per scrivere le regole nelle spec. E c'è anche da controllare che le ground truth abbiano i commenti.

Vedo molti molti molti molti molti molti molti falsi. Capiamoci

|        | ab-gte0 | ab-lte2 | bb-gte0 | bb-lte2 | candep | cannotdep | cb-gte0 | cb-lte2 |
| ------ | ------- | ------- | ------- | ------- | ------ | --------- | ------- | ------- |
| **v1** | TP!     | **FN**  | TP!     | **FN**  | TP!    | **FN**    | TP!     | **FN**  |
| **v2** | TP!     | TN      | TN      | **FN**  | TP!    | TN        | TP!     | TN      |
| **v3** | TN      | **FN**  | TP!     | TN      | TN     | **FN**    | TP!     | **FN**  |
| **v4** | TP!     | **FN**  | TP!     | **FN**  | TN     | **FN**    | TP!     | TP!     |
| **v5** | TP!     | **FN**  | TP!     | **FN**  | TP!    | **FN**    | TN      | **FN**  |

Vediamo. Le regole **lte2** sono sbagliatissime, e anche **cannotdep**. Ci sono anche un paio di falsi negativi condivisi con SolCMC, namely **cannotdep**-v3 e **cb-lte2**-v3. v3 è quella in cui il giocatore A può depositare e avere un bilancio negativo. La seconda è un errore mio, la prima è il test che non controlla il sender.

Il problema è che le regole **lte2** sono implementate nel modo più semplice possibile:

```CVL
invariant ab_lte2()
	currentContract.balance_a<=2;
```

Io non capisco come risolvere. Forse con qualcosa che non è un'invariant ma un test più normale con require eccetera.

Ho introdotto un falso positivo creando v6 che reverta con tutto.

Quindi, concettualmente: mettere più require, controllare il sender, non usare invariant.