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