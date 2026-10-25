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


Altra idea, per rispettare bal Dec onlyif release o quello che è, durante il constructor invia tutto il balance a chi vuole, e così in teoria forse può fare quello che vuole con tutte le revert senza fallire neanche gli altri test.