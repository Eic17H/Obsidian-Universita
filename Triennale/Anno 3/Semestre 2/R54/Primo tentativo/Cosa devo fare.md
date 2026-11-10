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
> Let $a$, $b$ and $c$ be three timestamps such that $start<a<b<c<end$.
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

Vorrei fare una versione che soddisfa le proprietà, ma in modo stupido. In realtà fa tutt'altro, ma per coincidenza soddisfa anche le proprietà. E ora ci penso. Ho tre variabili con tre valori possibili, cioè ho tre trit, cioè ho 9 stati possibili lavorando solo con queste variabili, 18 stati se considero anche lo scorrere del tempo. Se e solo se `b != 0`, allora è possibile usare `deposit` che fa `b--, c++`. Non ho altre restrizioni. Non so non mi viene in mente niente. Potrei fare una cosa che calcola le cifre di $\pi$, semplicemente andando avanti di un passo ogni volta che si chiama un metodo, ho anche trovato un bell'algoritmo che lo fa usando solo gli interi oggi. Potrei far sì che oooooooooooooooooooooooooooh... Potrei far sì che con ogni metodo che chiami, vai avanti di un passo, calcolando le cifre di pi greco in base 9 e codificandole in base 3. Per le restrizioni su `deposit` posso semplicemente continuare ad andare avanti con le cifre finché non trovo una cifra che rispetta quella proprietà. Dai ci sta. Uso le tre variabili solo come display delle cifre, i calcoli li faccio su altre variabili.

## 31 ottobre

La cosa del pi greco sarebbe molto più difficile da implementare quindi direi di no.

Ho invece aggiustato commenti e simili.

Sì rimangono da correggere quei test di Certora di Bet che non so come correggere e così forse posso fare la PR. Ah no devo chiedere a Bartoletti. C'è anche quella cosa di rel-grows-linear e rel-strictly-incr.

No basta sono qui da un'ora e non so come aggiustare quegli lte2.

No ok non so bene cosa fare ora quindi lavoro su HTLC.

### 1 Novembre

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

Fatto questo contratto, se tutto va bene, avrò aggiustato 5 contratti su 12 che dovevo fare.

Quelli dopo che farei sono Lottery, Social Recovery Wallet, Deposit e Deposit.

E dopo rimarrebbe Zerotoken Bank, che è il grande boss. Insieme a Call Wrapper che mi sembra stranamente semplice e mi fa paura, AMM che mi faceva paura un tempo e non so perché, e basta...?

Diciamo mezzo mese per capire il tirocinio, un mesetto per fare cinque contratti, quindi mi aspettano un mesetto per altri quattro contratti, e due mesi per gli ultimi tre strani.

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

### 2 novm

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

Sto per finire anche l'ultimo contratto, devo pensare a cosa devo chiedere a Bartoletti.

* Definizione di strictly increasing e lineare per Vesting Wallet
* No receive after deadline mal definita
* Deadlock definito formalmente in modo che non corrisponde a una nozione normale di deadlock, e qualcosa con v6 (non capisco i miei appunti, da rivedere)
* Non c'entra ma donate-not-dec-donation è da rivedere

Ah ok sono davvero poche cose.

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

> Making the accounting ghosts persistent should address the havoc-related cases; the invariant will also need a condition relating the ghost values to the contract’s commit state

Grazie Copilot non so che farmene, addio basta.

### 3 nov

Cosa devo scrivere quindi al professore?

HTLC:
* **reveal-timeout-after-isCommitted**: "`reveal()` and `timeout()` can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato "committed" prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?

Vesting Wallet:
* **rel-strict-incr**: "\[...\] the releasable amount is strictly increasing \[...\]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
* **rel-grows-linear**: "releasable grows linearly \[...\]: two successful consequent calls to `releasable` differ by c\*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?

Crowdfund:
* Deadlock definito formalmente in modo che non corrisponde a una nozione normale di deadlock, e qualcosa con v6 (non capisco i miei appunti, da rivedere)
* **no-deadlock** "at least one of the main functions (donate, withdraw, reclaim) must not revert if the contract has a balance and the caller has made a donation." - 
* No aspetta non ho capito che problema c'è con questa. Ok è una definizione strana di deadlock (non lo considererei deadlock se l'owner può sbloccare il contratto) ma non sono fatti miei.

**donate-not-dec-donation** devo controllarlo io.

Mi ero segnato anche di controllare **no-receive-after-deadline** ma mi sembra vada bene.

Sto scrivendo la parte di **rel-strict-incr**, e vedendo il mio codice, è orrendo!

```CVL
// Avoid timestamps being so close that releasable1==releasable2 despite the function being strictly increasing.
// Will not work with function that grow faster than linearly.
require (balance1+released1) * (timestamp2 - timestamp1) >= duration;
```

La nuova idea è che, se l'ordinata destra è uguale a quella sinistra, spostiamo l'ascissa destra più a destra, col minor $x$ tale che la $y$ non sia uguale. Ha senso? No. Ha senso solo se la prima $y$ presente ha una differenza di $1$.

Però Certora funziona molto più similmente a un linguaggio funzionale/dichiarativo che imperativo, non posso fare un loop che sposta la $x_2$ a destra finché non va bene. La devo esprimere come si fa tipo in analisi. Quindi, o $x_2$ va bene al primo tentativo, o si prova con un'altra:$$x_2'\ |\ f(x_2')=f(x_1)+1 \land f(x_2'-1)=f(x_1)$$
Questo approccio non funziona perché avrò sbagliato qualcosa coi tipi. Quindi richiedo che *per ogni* ascissa minore di $x_2'$ la sua ordinata è uguale a quella sinistra.

No no non funziona neanche così. Togliamo che fx2=fx1+1. Neanche. Eppure era un'idea così bella.

Eh ma comunque questo approccio considera valida una step function come quella che ho fatto. E come fai a dire che è una step function e non una funzione trigonometrica molto molto particolare? Non puoi, non esiste questa differenza. Incollo qui il mio codice orrendo e tengo l'altra versione.

```CVL
    // Naive approach to the rule
    if(releasable2 > releasable1) assert true;
    else if(releasable2 < releasable1) assert false;
    // If they're equal, check if it's because the function isn't strictly increasing or because the timestamps are too close
    else {
        mathint balance = balance1;
        mathint released = released1;

        // If there's a releasable different from releasable1 between timestamp1 and timestamp2, the function isn't strictly increasing
        env eBetween;
        mathint tsBetween = eBetween.block.timestamp;
        require tsBetween > timestamp1;
        require tsBetween < timestamp2;
        mathint relBetween = currentContract.releasable(eBetween);
        assert relBetween == releasable1 && relBetween == releasable2;

        // Find the least timestamp greater than timestamp2 such that its releasable ...
    }
```

Quindi ok, sono solo quelle tre proprietà. E che problema c'è?

Quindi è questo:

> Buongiorno, ho dubbi sull'interpretazione di alcune proprietà.
> 
> HTLC:
> * **reveal-timeout-after-isCommitted**: "`reveal()` and `timeout()` can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato committed prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?
> 
> Vesting Wallet:
> * **rel-strict-incr**: "\[...\] the releasable amount is strictly increasing \[...\]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
> * **rel-grows-linear**: "releasable grows linearly \[...\]: two successful consequent calls to `releasable` differ by c\*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?

O, in plain text:

```Text
Buongiorno, ho dubbi sull'interpretazione di alcune proprietà.

HTLC:
- reveal-timeout-after-isCommitted: "reveal() and timeout() can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato committed prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?

Vesting Wallet:
- rel-strict-incr: "[...] the releasable amount is strictly increasing [...]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
- rel-grows-linear: "releasable grows linearly [...]: two successful consequent calls to releasable differ by c*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?
```

E niente, poi lo mando.

Adesso direi che quello che rimane da fare è eseguire tutti i test e scrivere i commenti nella ground truth. E magari capire se posso controllare i not-revert con SolCMC perché ho visto un trick carino fatto coi postghost e assert(false).

E mi ha detto che lo studio dei linguaggi e dei tool conta come tempo del tirocinio, quindi dopo aver finito questi cinque contratti e prima di cominciare i prossimi, posso mettere in ordine questi appunti perché sono talmente lunghi che diventa difficile rileggerli. Visto che ci sono anche informazioni false in mezzo.

Poi carino per Escrow, mettere che `instate` ha `!=` anziché `==`.

Quindi, i contratti su cui ho lavorato sono Crowdfund, Escrow, HTLC, Vesting Wallet, e Bet Tokenless. Tengo i loro readme aperti così vedo che test eseguire.

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

Ho capito che gli altri contratti li testo con z3 a 30 secondi e poi con eldarica per farlo davvero.

Per risolvere il problema delle versioni che hanno metodi nuovi che da SolCMC non sono visibili, ho provato a usare preghost e postghost, ma non funziona.

```Solidity
/// @custom:ghost
address user;

/// @custom:preghost function donate
uint donation_prev = donation[user];
/// @custom:postghost function donate
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

/// @custom:preghost function withdraw
uint donation_prev = donation[user];
/// @custom:postghost function withdraw
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

/// @custom:preghost function reclaim
uint donation_prev = donation[user];
/// @custom:postghost function reclaim
uint donation_next = donation[user];
assert (donation_next >= donation_prev || msg.sender);

/// @custom:preghost function clawback
uint donation_prev = donation[user];
/// @custom:postghost function clawback
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

function invariant(address _user) public payable {
    user = _user;
}
```

```
ERROR:root:Preghost injection failed: ../contracts/crowdfund/solcmc/donation-dec-onlyif-reclaim.sol: ../contracts/crowdfund/versions/Crowdfund_v14.sol: function clawback.
```

..........

Hai presente quando ho messo view a tutto? Ecco c'era un motivo se non c'era.

```
   |
82 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v14.sol:84:13:
   |
84 |             redeem();
   |             ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v13.sol:78:9:
   |
78 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v13.sol:78:9:
   |
78 |         redeem();
   |         ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:69:13:
   |
69 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:71:13:
   |
71 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:73:13:
   |
73 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:75:13:
   |
75 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:77:13:
   |
77 |             redeem();
   |             ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:69:13:
   |
69 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:71:13:
   |
71 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:73:13:
   |
73 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:75:13:
   |
75 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:77:13:
   |
77 |             redeem();
   |             ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v1.sol:75:9:
   |
75 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v1.sol:75:9:
   |
75 |         redeem();
   |         ^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:71:24:
   |
71 |     function invariant(uint f) public view {
   |                        ^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:78:9:
   |
78 |         open_dispute();
   |         ^^^^^^^^^^^^^^


ERROR:root:Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:71:24:
   |
71 |     function invariant(uint f) public view {
   |                        ^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:78:9:
   |
78 |         open_dispute();
   |         ^^^^^^^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v10.sol:77:9:
   |
77 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v10.sol:77:9:
   |
77 |         redeem();
   |         ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:74:13:
   |
74 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:76:13:
   |
76 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:78:13:
   |
78 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:80:13:
   |
80 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:82:13:
   |
82 |             redeem();
   |             ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:74:13:
   |
74 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:76:13:
   |
76 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:78:13:
   |
78 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:80:13:
   |
80 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:82:13:
   |
82 |             redeem();
   |             ^^^^^^^^
```

Ok ho aggiustato anche le ground truth. C'è un record su cui non sono sicuro, ma in caso se ne occuperà il mio successore.

Ah ma sai che vedendo bene tutto. Nel readme ci sono molti meno contratti che nel progetto intero. Io vedo che Safe ha quasi 2000 righe di codice Solidity, e non credo proprio sia al pari con le specifiche. Io spero di non doverlo toccare. Ha 55 proprietà. Eh?

> NOTE: this file is called ground-truth.csv only for script compatibility, but it DOES NOT REPRESENT the ground truths of the properties, which cannot be reliably determined for this contract. The third entries should hence not be taken into consideration.

Cosa significa... Cioè, è talmente complesso che non lo sanno neanche loro come funziona? Quindi di sicuro non lo devo toccare, ok.

Le altre che non sono nella lista sono Infinifi, Silo Core, e Template (ma va'). Infinifi ha 2411 righe di codice, è bruttissimo, e ha lo stesso warning di Safe. Silo Core ha 7148 righe!!!!!!!!!!!!!!!!!! Ha una sola proprietà. E vedo una cosa bellissima. Ha due versioni. Una è `SiloCore_v1.sol`. L'altra si chiama `Silo_forsev2bohcheck.sol` ed è completamente diversa.

Quindi posso tranquillamente ignorare quelle cose.

Tra l'altro vedo che Bank, che è ciò che devo prendere come esempio, è semplicissimo. Ha 9 righe di corpo vero e proprio. È letteralmente "mi mandi soldi, me lo segno, rivuoi i soldi, te li ridò". Ma ha un sacco di proprietà.

Quindi i piani non cambiano. Domani chiedo a Bartoletti per la PR e mi faccio un'altra branch per lavorare a un altro contratto.

## 4 nov

Quindi, cosa voglio fare adesso? Ho detto Lottery, Social Recovery Wallet, Deposit e Deposit. Lottery ha tantissime proprietà e non ho voglia. I due Deposit sono molto diversi, sono molto semplici, e mi stanno già antipatici. Social Recovery Wallet ha poche proprietà ma 160 righe, comincerei da quello.

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

Onestamente se funziona questo non so quanto altro vada fatto a questo contratto. Proverei già a passare a un altro (ma su un'altra branch per rendere più facile la PR dopo). Proverei con Deposit.

## 5 nov

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

### 6 nov

Allora, ho provato combinazioni diverse generate da DeepSeek per generare un'hash e un indirizzo che vadano bene insieme ma non funziona niente. Quindi vedo adesso come implementare Keccac256 in Certora.

Capiamo l'algoritmo.

* La memoria è di $1600 b$ divisa in una matrice $A \in \mathbb B_{64} ^{5 \times 5}$. Nel nostro caso, da appiattire e da mettere little-endian (forse).
* Prende l'input e lo padda a $136B$ aggiungendo un byte `0x01` subito dopo, e il resto è tutto bit `0`, tranne l'ultimo bit che è `1`.

No non sto capendo. Aiuto.

Pensiamoci un attimo.

1. Inizializza $1600b$ a `0`;
2. Prendi l'input, e mettilo in blocchi di $136B$ (nel nostro caso un solo blocco), dopo ogni blocco applica la permutazione;
3. Dopo l'input, metti `0x01`, poi tutti i bit a `0`, e l'ultimo bit a `1`;
4. Applica la permutazione;
5. Restituisci i primi $32B$.

Una permutazione è:
1. $\theta$: Vettore $c \in \mathbb B _{64} ^{5}$ in cui ogni elemento `c[x]` è lo XOR di `A[x, 1...5]`, poi `D[x] = C[(x+4)%5] XOR ROT(C[(x+1)%5], 1)`, e poi dappertutto `A[x,y] = A[x,y] XOR D[x]`;
2. $\rho$: Esiste `r[x,y]` di cui non vedo una definizione, `A[x,y] = ROT(A[x,y], r[x,y])`;
3. $\pi$: `A[y, (2x+3y)] = A[x,y]`;
4. $\chi$: no basta non capisco.

Basta.

Questa è l'implementazione di DeepSeek, che non è codice CVL valido:

```CVL
function rotl(uint64 x, uint8 n) returns uint64 {
    // CVL: shifts may promote to 256 bits, so mask after each shift
    uint64 mask = 0xFFFFFFFFFFFFFFFF;
    uint64 left  = (x << n) & mask;
    uint64 right = (x >> (64 - n)) & mask;
    return (left | right) & mask;
}

function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    for (uint x = 0; x < 5; x++) {
        C[x] = a[5*0 + x] ^ a[5*1 + x] ^ a[5*2 + x] ^ a[5*3 + x] ^ a[5*4 + x];
    }
    for (uint x = 0; x < 5; x++) {
        D[x] = C[(x + 4) % 5] ^ rotl(C[(x + 1) % 5], 1);
    }
    for (uint x = 0; x < 5; x++) {
        for (uint y = 0; y < 5; y++) {
            a[5*y + x] = a[5*y + x] ^ D[x];
        }
    }
    return a;
}

function rhoPi(uint64[25] a) returns uint64[25] {
    uint64[25] b;
    // Rotation offsets r[x,y] from the Keccak specification
    uint8[25] r = [
         0,  1, 62, 28, 27,
        36, 44,  6, 55, 20,
         3, 10, 43, 25, 39,
        41, 45, 15, 21,  8,
        18,  2, 61, 56, 14
    ];
    for (uint x = 0; x < 5; x++) {
        for (uint y = 0; y < 5; y++) {
            uint64 rotated = rotl(a[5*y + x], r[5*y + x]);
            uint newX = y;
            uint newY = (2*x + 3*y) % 5;
            b[5*newY + newX] = rotated;
        }
    }
    return b;
}

function chi(uint64[25] b) returns uint64[25] {
    uint64[25] a;
    for (uint y = 0; y < 5; y++) {
        for (uint x = 0; x < 5; x++) {
            uint64 notB = ~b[5*y + (x+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
            a[5*y + x] = b[5*y + x] ^ (notB & b[5*y + (x+2)%5]);
        }
    }
    return a;
}

function iota(uint64[25] a, uint256 round) returns uint64[25] {
    // 24 round consta// if a number of guardians greater than or equal to the threshold
// have participated in the same recovery round, and selected the same new owner,
// then `executeRecovery()` will succeed and `owner == newOwner`.

function rotl(uint64 x, uint8 n) returns uint64 {
    // CVL: shifts may promote to 256 bits, so mask after each shift
    uint64 mask = 0xFFFFFFFFFFFFFFFF;
    uint64 left  = (x << n) & mask;
    uint64 right = (x >> assert_uint8((64 - n))) & mask;
    return (left | right) & mask;
}

function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    require C[0] == a[5*0 + 0] ^ a[5*1 + 0] ^ a[5*2 + 0] ^ a[5*3 + 0] ^ a[5*4 + 0];
    require C[1] == a[5*0 + 1] ^ a[5*1 + 1] ^ a[5*2 + 1] ^ a[5*3 + 1] ^ a[5*4 + 1];
    require C[2] == a[5*0 + 2] ^ a[5*1 + 2] ^ a[5*2 + 2] ^ a[5*3 + 2] ^ a[5*4 + 2];
    require C[3] == a[5*0 + 3] ^ a[5*1 + 3] ^ a[5*2 + 3] ^ a[5*3 + 3] ^ a[5*4 + 3];
    require C[4] == a[5*0 + 4] ^ a[5*1 + 4] ^ a[5*2 + 4] ^ a[5*3 + 4] ^ a[5*4 + 4];
    require D[0] == C[(0 + 4) % 5] ^ rotl(C[(0 + 1) % 5], 1);
    require D[1] == C[(1 + 4) % 5] ^ rotl(C[(1 + 1) % 5], 1);
    require D[2] == C[(2 + 4) % 5] ^ rotl(C[(2 + 1) % 5], 1);
    require D[3] == C[(3 + 4) % 5] ^ rotl(C[(3 + 1) % 5], 1);
    require D[4] == C[(4 + 4) % 5] ^ rotl(C[(4 + 1) % 5], 1);
    uint64[25] b;
    b[5*0 + 0] = a[5*0 + 0] ^ D[0]; b[5*1 + 0] = a[5*1 + 0] ^ D[0]; b[5*2 + 0] = a[5*2 + 0] ^ D[0]; b[5*3 + 0] = a[5*3 + 0] ^ D[0]; b[5*4 + 0] = a[5*4 + 0] ^ D[0];
    b[5*0 + 1] = a[5*0 + 1] ^ D[1]; b[5*1 + 1] = a[5*1 + 1] ^ D[1]; b[5*2 + 1] = a[5*2 + 1] ^ D[1]; b[5*3 + 1] = a[5*3 + 1] ^ D[1]; b[5*4 + 1] = a[5*4 + 1] ^ D[1];
    b[5*0 + 2] = a[5*0 + 2] ^ D[2]; b[5*1 + 2] = a[5*1 + 2] ^ D[2]; b[5*2 + 2] = a[5*2 + 2] ^ D[2]; b[5*3 + 2] = a[5*3 + 2] ^ D[2]; b[5*4 + 2] = a[5*4 + 2] ^ D[2];
    b[5*0 + 3] = a[5*0 + 3] ^ D[3]; b[5*1 + 3] = a[5*1 + 3] ^ D[3]; b[5*2 + 3] = a[5*2 + 3] ^ D[3]; b[5*3 + 3] = a[5*3 + 3] ^ D[3]; b[5*4 + 3] = a[5*4 + 3] ^ D[3];
    b[5*0 + 4] = a[5*0 + 4] ^ D[4]; b[5*1 + 4] = a[5*1 + 4] ^ D[4]; b[5*2 + 4] = a[5*2 + 4] ^ D[4]; b[5*3 + 4] = a[5*3 + 4] ^ D[4]; b[5*4 + 4] = a[5*4 + 4] ^ D[4];
    return b;
}

function rhoPi(uint64[25] a) returns uint64[25] {
    uint64[25] b;
    // Rotation offsets r[x,y] from the Keccak specification
    uint8[25] r = [
         0,  1, 62, 28, 27,
        36, 44,  6, 55, 20,
         3, 10, 43, 25, 39,
        41, 45, 15, 21,  8,
        18,  2, 61, 56, 14
    ];
    uint64 rotated;

    uint rotated00 = rotl(a[5*0 + 0], r[5*0 + 0]); uint newX00 = 0; uint newY00 = (2*0 + 3*0) % 5; b[5*newY00 + newX00] = rotated00;
    uint rotated01 = rotl(a[5*1 + 0], r[5*1 + 0]); uint newX01 = 1; uint newY01 = (2*0 + 3*1) % 5; b[5*newY01 + newX01] = rotated01;
    uint rotated02 = rotl(a[5*2 + 0], r[5*2 + 0]); uint newX02 = 2; uint newY02 = (2*0 + 3*2) % 5; b[5*newY02 + newX02] = rotated02;
    uint rotated03 = rotl(a[5*3 + 0], r[5*3 + 0]); uint newX03 = 3; uint newY03 = (2*0 + 3*3) % 5; b[5*newY03 + newX03] = rotated03;
    uint rotated04 = rotl(a[5*4 + 0], r[5*4 + 0]); uint newX04 = 4; uint newY04 = (2*0 + 3*4) % 5; b[5*newY04 + newX04] = rotated04;
    
    uint rotated10 = rotl(a[5*0 + 1], r[5*0 + 1]); uint newX10 = 0; uint newY10 = (2*1 + 3*0) % 5; b[5*newY10 + newX10] = rotated10;
    uint rotated11 = rotl(a[5*1 + 1], r[5*1 + 1]); uint newX11 = 1; uint newY11 = (2*1 + 3*1) % 5; b[5*newY11 + newX11] = rotated11;
    uint rotated12 = rotl(a[5*2 + 1], r[5*2 + 1]); uint newX12 = 2; uint newY12 = (2*1 + 3*2) % 5; b[5*newY12 + newX12] = rotated12;
    uint rotated13 = rotl(a[5*3 + 1], r[5*3 + 1]); uint newX13 = 3; uint newY13 = (2*1 + 3*3) % 5; b[5*newY13 + newX13] = rotated13;
    uint rotated14 = rotl(a[5*4 + 1], r[5*4 + 1]); uint newX14 = 4; uint newY14 = (2*1 + 3*4) % 5; b[5*newY14 + newX14] = rotated14;
    
    uint rotated20 = rotl(a[5*0 + 2], r[5*0 + 2]); uint newX20 = 0; uint newY20 = (2*2 + 3*0) % 5; b[5*newY20 + newX20] = rotated20;
    uint rotated21 = rotl(a[5*1 + 2], r[5*1 + 2]); uint newX21 = 1; uint newY21 = (2*2 + 3*1) % 5; b[5*newY21 + newX21] = rotated21;
    uint rotated22 = rotl(a[5*2 + 2], r[5*2 + 2]); uint newX22 = 2; uint newY22 = (2*2 + 3*2) % 5; b[5*newY22 + newX22] = rotated22;
    uint rotated23 = rotl(a[5*3 + 2], r[5*3 + 2]); uint newX23 = 3; uint newY23 = (2*2 + 3*3) % 5; b[5*newY23 + newX23] = rotated23;
    uint rotated24 = rotl(a[5*4 + 2], r[5*4 + 2]); uint newX24 = 4; uint newY24 = (2*2 + 3*4) % 5; b[5*newY24 + newX24] = rotated24;
    
    uint rotated30 = rotl(a[5*0 + 3], r[5*0 + 3]); uint newX30 = 0; uint newY30 = (2*3 + 3*0) % 5; b[5*newY30 + newX30] = rotated30;
    uint rotated31 = rotl(a[5*1 + 3], r[5*1 + 3]); uint newX31 = 1; uint newY31 = (2*3 + 3*1) % 5; b[5*newY31 + newX31] = rotated31;
    uint rotated32 = rotl(a[5*2 + 3], r[5*2 + 3]); uint newX32 = 2; uint newY32 = (2*3 + 3*2) % 5; b[5*newY32 + newX32] = rotated32;
    uint rotated33 = rotl(a[5*3 + 3], r[5*3 + 3]); uint newX33 = 3; uint newY33 = (2*3 + 3*3) % 5; b[5*newY33 + newX33] = rotated33;
    uint rotated34 = rotl(a[5*4 + 3], r[5*4 + 3]); uint newX34 = 4; uint newY34 = (2*3 + 3*4) % 5; b[5*newY34 + newX34] = rotated34;
    
    uint rotated40 = rotl(a[5*0 + 4], r[5*0 + 4]); uint newX40 = 0; uint newY40 = (2*4 + 3*0) % 5; b[5*newY40 + newX40] = rotated40;
    uint rotated41 = rotl(a[5*1 + 4], r[5*1 + 4]); uint newX41 = 1; uint newY41 = (2*4 + 3*1) % 5; b[5*newY41 + newX41] = rotated41;
    uint rotated42 = rotl(a[5*2 + 4], r[5*2 + 4]); uint newX42 = 2; uint newY42 = (2*4 + 3*2) % 5; b[5*newY42 + newX42] = rotated42;
    uint rotated43 = rotl(a[5*3 + 4], r[5*3 + 4]); uint newX43 = 3; uint newY43 = (2*4 + 3*3) % 5; b[5*newY43 + newX43] = rotated43;
    uint rotated44 = rotl(a[5*4 + 4], r[5*4 + 4]); uint newX44 = 4; uint newY44 = (2*4 + 3*4) % 5; b[5*newY44 + newX44] = rotated44;
    
    return b;
}

function chi(uint64[25] b) returns uint64[25] {
    uint64[25] a;
    uint64 notB00 = ~b[5*0 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 0] = b[5*0 + 0] ^ (notB00 & b[5*0 + (0+2)%5]);
    uint64 notB01 = ~b[5*0 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 1] = b[5*0 + 1] ^ (notB01 & b[5*0 + (1+2)%5]);
    uint64 notB02 = ~b[5*0 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 2] = b[5*0 + 2] ^ (notB02 & b[5*0 + (2+2)%5]);
    uint64 notB03 = ~b[5*0 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 3] = b[5*0 + 3] ^ (notB03 & b[5*0 + (3+2)%5]);
    uint64 notB04 = ~b[5*0 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 4] = b[5*0 + 4] ^ (notB04 & b[5*0 + (4+2)%5]);
    uint64 notB10 = ~b[5*1 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 0] = b[5*1 + 0] ^ (notB10 & b[5*1 + (0+2)%5]);
    uint64 notB11 = ~b[5*1 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 1] = b[5*1 + 1] ^ (notB11 & b[5*1 + (1+2)%5]);
    uint64 notB12 = ~b[5*1 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 2] = b[5*1 + 2] ^ (notB12 & b[5*1 + (2+2)%5]);
    uint64 notB13 = ~b[5*1 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 3] = b[5*1 + 3] ^ (notB13 & b[5*1 + (3+2)%5]);
    uint64 notB14 = ~b[5*1 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 4] = b[5*1 + 4] ^ (notB14 & b[5*1 + (4+2)%5]);
    uint64 notB20 = ~b[5*2 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 0] = b[5*2 + 0] ^ (notB20 & b[5*2 + (0+2)%5]);
    uint64 notB21 = ~b[5*2 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 1] = b[5*2 + 1] ^ (notB21 & b[5*2 + (1+2)%5]);
    uint64 notB22 = ~b[5*2 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 2] = b[5*2 + 2] ^ (notB22 & b[5*2 + (2+2)%5]);
    uint64 notB23 = ~b[5*2 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 3] = b[5*2 + 3] ^ (notB23 & b[5*2 + (3+2)%5]);
    uint64 notB24 = ~b[5*2 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 4] = b[5*2 + 4] ^ (notB24 & b[5*2 + (4+2)%5]);
    uint64 notB30 = ~b[5*3 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 0] = b[5*3 + 0] ^ (notB30 & b[5*3 + (0+2)%5]);
    uint64 notB31 = ~b[5*3 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 1] = b[5*3 + 1] ^ (notB31 & b[5*3 + (1+2)%5]);
    uint64 notB32 = ~b[5*3 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 2] = b[5*3 + 2] ^ (notB32 & b[5*3 + (2+2)%5]);
    uint64 notB33 = ~b[5*3 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 3] = b[5*3 + 3] ^ (notB33 & b[5*3 + (3+2)%5]);
    uint64 notB34 = ~b[5*3 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 4] = b[5*3 + 4] ^ (notB34 & b[5*3 + (4+2)%5]);
    uint64 notB40 = ~b[5*4 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 0] = b[5*4 + 0] ^ (notB40 & b[5*4 + (0+2)%5]);
    uint64 notB41 = ~b[5*4 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 1] = b[5*4 + 1] ^ (notB41 & b[5*4 + (1+2)%5]);
    uint64 notB42 = ~b[5*4 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 2] = b[5*4 + 2] ^ (notB42 & b[5*4 + (2+2)%5]);
    uint64 notB43 = ~b[5*4 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 3] = b[5*4 + 3] ^ (notB43 & b[5*4 + (3+2)%5]);
    uint64 notB44 = ~b[5*4 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 4] = b[5*4 + 4] ^ (notB44 & b[5*4 + (4+2)%5]);
    return a;
}

function iota(uint64[25] a, uint256 round) returns uint64[25] {
    // 24 round constants for Keccak-f[1600]
    uint64[24] RC = [
        0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
        0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
        0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
        0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
        0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
        0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008
    ];
    a[0] = a[0] ^ RC[round];
    return a;
}

function mask64(uint256 x) returns uint64 {
    return to_uint64(x & 0xFFFFFFFFFFFFFFFF);
}

function keccakF1600(uint64[25] a) returns uint64[25] {
    uint a00 = iota(chi(rhoPi(theta(a))), 5*0+0);
    uint a01 = iota(chi(rhoPi(theta(a00))), 5*0+1);
    uint a02 = iota(chi(rhoPi(theta(a01))), 5*0+2);
    uint a03 = iota(chi(rhoPi(theta(a02))), 5*0+3);
    uint a04 = iota(chi(rhoPi(theta(a03))), 5*0+4);
    uint a10 = iota(chi(rhoPi(theta(a04))), 5*1+0);
    uint a11 = iota(chi(rhoPi(theta(a10))), 5*1+1);
    uint a12 = iota(chi(rhoPi(theta(a11))), 5*1+2);
    uint a13 = iota(chi(rhoPi(theta(a12))), 5*1+3);
    uint a14 = iota(chi(rhoPi(theta(a13))), 5*1+4);
    uint a20 = iota(chi(rhoPi(theta(a14))), 5*2+0);
    uint a21 = iota(chi(rhoPi(theta(a20))), 5*2+1);
    uint a22 = iota(chi(rhoPi(theta(a21))), 5*2+2);
    uint a23 = iota(chi(rhoPi(theta(a22))), 5*2+3);
    uint a24 = iota(chi(rhoPi(theta(a23))), 5*2+4);
    uint a30 = iota(chi(rhoPi(theta(a24))), 5*3+0);
    uint a31 = iota(chi(rhoPi(theta(a30))), 5*3+1);
    uint a32 = iota(chi(rhoPi(theta(a31))), 5*3+2);
    uint a33 = iota(chi(rhoPi(theta(a32))), 5*3+3);
    uint a34 = iota(chi(rhoPi(theta(a33))), 5*3+4);
    uint a40 = iota(chi(rhoPi(theta(a34))), 5*4+0);
    uint a41 = iota(chi(rhoPi(theta(a40))), 5*4+1);
    uint a42 = iota(chi(rhoPi(theta(a41))), 5*4+2);
    uint a43 = iota(chi(rhoPi(theta(a42))), 5*4+3);
    uint a44 = iota(chi(rhoPi(theta(a43))), 5*4+4);
    return a44;
}

function keccak256_20(bytes20 input) returns bytes32 {
    // 1. Build the padded 136-byte block
    bytes padded; // bytes type in CVL; you must construct the block byte-by-byte
    // Initialize all 136 bytes to 0x00
    // Copy the 20 input bytes into the first 20 positions
    // Set byte 20 to 0x01
    // Set byte 135 to 0x80 (the final bit of pad10*1)

    // 2. Initialize the 1600-bit state to all zeros
    uint64[25] state;

    // 3. Absorb the single 136-byte block
    // The rate is 1088 bits = 17 lanes of 64 bits.
    // XOR each of the 17 lanes from the padded block into the state.
    uint64 lane0 = extractLane(padded, 0 * 8); // implement byte-to-lane extraction
    require state[0] == 0 ^ lane0;
    uint64 lane1 = extractLane(padded, 1 * 8); // implement byte-to-lane extraction
    require state[1] == 0 ^ lane1;
    uint64 lane2 = extractLane(padded, 2 * 8); // implement byte-to-lane extraction
    require state[2] == 0 ^ lane2;
    uint64 lane3 = extractLane(padded, 3 * 8); // implement byte-to-lane extraction
    require state[3] == 0 ^ lane3;
    uint64 lane4 = extractLane(padded, 4 * 8); // implement byte-to-lane extraction
    require state[4] == 0 ^ lane4;
    uint64 lane5 = extractLane(padded, 5 * 8); // implement byte-to-lane extraction
    require state[5] == 0 ^ lane5;
    uint64 lane6 = extractLane(padded, 6 * 8); // implement byte-to-lane extraction
    require state[6] == 0 ^ lane6;
    uint64 lane7 = extractLane(padded, 7 * 8); // implement byte-to-lane extraction
    require state[7] == 0 ^ lane7;
    uint64 lane8 = extractLane(padded, 8 * 8); // implement byte-to-lane extraction
    require state[8] == 0 ^ lane8;
    uint64 lane9 = extractLane(padded, 9 * 8); // implement byte-to-lane extraction
    require state[9] == 0 ^ lane9;
    uint64 lane10 = extractLane(padded, 10 * 8); // implement byte-to-lane extraction
    require state[10] == 0 ^ lane10;
    uint64 lane11 = extractLane(padded, 11 * 8); // implement byte-to-lane extraction
    require state[11] == 0 ^ lane11;
    uint64 lane12 = extractLane(padded, 12 * 8); // implement byte-to-lane extraction
    require state[12] == 0 ^ lane12;
    uint64 lane13 = extractLane(padded, 13 * 8); // implement byte-to-lane extraction
    require state[13] == 0 ^ lane13;
    uint64 lane14 = extractLane(padded, 14 * 8); // implement byte-to-lane extraction
    require state[14] == 0 ^ lane14;
    uint64 lane15 = extractLane(padded, 15 * 8); // implement byte-to-lane extraction
    require state[15] == 0 ^ lane15;
    uint64 lane16 = extractLane(padded, 16 * 8); // implement byte-to-lane extraction
    require state[16] == 0 ^ lane16;

    // 4. Apply the permutation
    uint64[25] state2 = keccakF1600(state);

    // 5. Squeeze the first 256 bits (lanes 0..3) as the hash
    bytes32 result;
    // Pack state[0]..state[3] into a bytes32 in little-endian lane order
    return packLanes(state2[0], state2[1], state2[2], state2[3]);
}nts for Keccak-f[1600]
    uint64[24] RC = [
        0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
        0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
        0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
        0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
        0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
        0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008
    ];
    a[0] = a[0] ^ RC[round];
    return a;
}

function mask64(uint256 x) returns uint64 {
    return to_uint64(x & 0xFFFFFFFFFFFFFFFF);
}

function keccakF1600(uint64[25] a) returns uint64[25] {
    for (uint round = 0; round < 24; round++) {
        a = theta(a);
        a = rhoPi(a);
        a = chi(a);
        a = iota(a, round);
    }
    return a;
}

function keccak256_20(bytes20 input) returns bytes32 {
    // 1. Build the padded 136-byte block
    bytes padded; // bytes type in CVL; you must construct the block byte-by-byte
    // Initialize all 136 bytes to 0x00
    // Copy the 20 input bytes into the first 20 positions
    // Set byte 20 to 0x01
    // Set byte 135 to 0x80 (the final bit of pad10*1)

    // 2. Initialize the 1600-bit state to all zeros
    uint64[25] state;

    // 3. Absorb the single 136-byte block
    // The rate is 1088 bits = 17 lanes of 64 bits.
    // XOR each of the 17 lanes from the padded block into the state.
    for (uint i = 0; i < 17; i++) {
        uint64 lane = extractLane(padded, i * 8); // implement byte-to-lane extraction
        state[i] = state[i] ^ lane;
    }

    // 4. Apply the permutation
    state = keccakF1600(state);

    // 5. Squeeze the first 256 bits (lanes 0..3) as the hash
    bytes32 result;
    // Pack state[0]..state[3] into a bytes32 in little-endian lane order
    return packLanes(state[0], state[1], state[2], state[3]);
}
```

Il problema più evidente è il `for` che non esiste così. Ma sono solo 25 iterazioni, quindi li srotolo a mano, per esempio:

```CVL
function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    C[0] = a[5*0 + 0] ^ a[5*1 + 0] ^ a[5*2 + 0] ^ a[5*3 + 0] ^ a[5*4 + 0];
    C[1] = a[5*0 + 1] ^ a[5*1 + 1] ^ a[5*2 + 1] ^ a[5*3 + 1] ^ a[5*4 + 1];
    C[2] = a[5*0 + 2] ^ a[5*1 + 2] ^ a[5*2 + 2] ^ a[5*3 + 2] ^ a[5*4 + 2];
    C[3] = a[5*0 + 3] ^ a[5*1 + 3] ^ a[5*2 + 3] ^ a[5*3 + 3] ^ a[5*4 + 3];
    C[4] = a[5*0 + 4] ^ a[5*1 + 4] ^ a[5*2 + 4] ^ a[5*3 + 4] ^ a[5*4 + 4];
    D[0] = C[(0 + 4) % 5] ^ rotl(C[(0 + 1) % 5], 1);
    D[1] = C[(1 + 4) % 5] ^ rotl(C[(1 + 1) % 5], 1);
    D[2] = C[(2 + 4) % 5] ^ rotl(C[(2 + 1) % 5], 1);
    D[3] = C[(3 + 4) % 5] ^ rotl(C[(3 + 1) % 5], 1);
    D[4] = C[(4 + 4) % 5] ^ rotl(C[(4 + 1) % 5], 1);
    a[5*0 + 0] = a[5*0 + 0] ^ D[0]; a[5*1 + 0] = a[5*1 + 0] ^ D[0]; a[5*2 + x] = a[5*2 + 0] ^ D[0]; a[5*3 + 0] = a[5*3 + 0] ^ D[0]; a[5*4 + 0] = a[5*4 + 0] ^ D[0];
    a[5*0 + 1] = a[5*0 + 1] ^ D[1]; a[5*1 + 1] = a[5*1 + 1] ^ D[1]; a[5*2 + x] = a[5*2 + 1] ^ D[1]; a[5*3 + 1] = a[5*3 + 1] ^ D[1]; a[5*4 + 1] = a[5*4 + 1] ^ D[1];
    a[5*0 + 2] = a[5*0 + 2] ^ D[2]; a[5*1 + 2] = a[5*1 + 2] ^ D[2]; a[5*2 + x] = a[5*2 + 2] ^ D[2]; a[5*3 + 2] = a[5*3 + 2] ^ D[2]; a[5*4 + 2] = a[5*4 + 2] ^ D[2];
    a[5*0 + 3] = a[5*0 + 3] ^ D[3]; a[5*1 + 3] = a[5*1 + 3] ^ D[3]; a[5*2 + x] = a[5*2 + 3] ^ D[3]; a[5*3 + 3] = a[5*3 + 3] ^ D[3]; a[5*4 + 3] = a[5*4 + 3] ^ D[3];
    a[5*0 + 4] = a[5*0 + 4] ^ D[4]; a[5*1 + 4] = a[5*1 + 4] ^ D[4]; a[5*2 + x] = a[5*2 + 4] ^ D[4]; a[5*3 + 4] = a[5*3 + 4] ^ D[4]; a[5*4 + 4] = a[5*4 + 4] ^ D[4];
    return a;
}
```

Mi arrendo. Fa tutto schifo. Per i curiosi lettori, il tentativo abbandonato si trova [su GitHub](https://github.com/Eic17H/contracts-verification-benchmark/blob/14ae37a515b2e61fd36c4202dda537c54b6abc1d/contracts/social_recovery_wallet/certora/recov-succeeds.spec).

Cos'ho imparato? Niente onestamente. Ok un po' il comportamento della funzione hash ma non mi serve a niente.

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

### 7 nov

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

### 8 novemrbre

Non funziona. Non funziona molto bene. Dà negativo su v1 com'è giusto che sia, ma dà negativo anche su v2. Questo mi fa pensare che il mio $\lnot A$ del sillogismo disgiuntivo sia sbagliato.

Devo vedere cos'è `memory` in Solidity.

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

### 9nov

Vedo `sstore` in alcuni file SolCMC. Vediamo cos'è. Non c'entra nulla.

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

Vediamo che fare adesso. Lottery ha troppe proprietà, dà fastidio. Deposit ERC20 è semplicissimo, ha solo tre proprietà. Io ci provo.

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

### 10 nov

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