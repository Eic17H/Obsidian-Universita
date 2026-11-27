---
cssclasses:
  - r54
---
Il mio primo obiettivo è di rendere Escrow, un contratto vecchio, agli standard di Bank.

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

---

Per Escrow v8, devo ricordarmi che `///@custom:negate` esiste.

---

Poi carino per Escrow, mettere che `instate` ha `!=` anziché `==`.

---

Ritorno con molta più saggezza.

Prepariamoci alla PR.

Quali sono i falsi?

* **arbitrate-send** e **redeem-send** FN con SolCMC: Il recipiente della chiamata può rifiutare il pagamento, errore nella ground truth.
* **auth-in-agree** FN con SolCMC: Il test è sbagliato, non richiede lo stato.
* **dispute-if-agree** FPv8v15 con SolCMC: Tutto positivo, credo di dover usare `negate`.
* **recipient-buyer-or-seller** FPv12v14: Stranissimo, provo a usare una ghost.

C'è sicuramente da fare. Non sapevo usare Certora molto bene quando ho fatto queste regole.

SolCMC era abbastanza semplice, ora è tutto vero. Però **no-send-in-agree** ha ERRv11. Ok è perché manca la variabile `deposit`, visto che non è inclusa nella specifica.

Quello che devo fare è sicuramente provare a usare ghost persistenti. Almeno per **recipient-buyer-or-seller** di sicuro visto che ha due FP.

Ho provato così:

```CVL
persistent ghost bool correctRecipient { init_state axiom correctRecipient == false; }
hook CALL(uint g, address addr, uint value, uint argsOffset, uint argsLength, uint retOffset, uint retLength) uint rc {
    correctRecipient = (addr == currentContract.buyer || addr == currentContract.seller);
}

rule recipient_buyer_or_seller {
    env e;
    method f;
    calldataarg args;

    // Calling a different method first, to ensure that redeem() is called in a state where it can be called
    require f.selector != sig:redeem().selector;
    f(e,args);

    redeem(e);
    assert correctRecipient;
}
```

Potrebbe essere che le chiamate ad `address(0)` falliscono sempre secondo Certora. Controllo:

```Solidity
function redeem() instate(State.AGREE) public {
	address(0).call{value: 1}("");
}
```

```CVL
rule test {
    env e;
    redeem@withrevert(e);
    satisfy !lastReverted;
}
```

E Certora dà errore. Questa cosa è molto interessante. A Certora non piace che la chiamata sia esplicitamente a `0x00`. Dopo vari tentativi, ho trovato quest'altra soluzione:

```Solidity
address zero = address(0);
function redeem(address dst) instate(State.AGREE) public {
	(bool success,) = dst.call{value: 1}("");
	require(success);
}
```

```CVL
rule test {
    env e;
    address dst;
    require(dst == currentContract.zero);
    redeem@withrevert(e, dst);
    satisfy !lastReverted;
}
```

Solo in questo caso Certora non dà errore. `satisfy !lastReverted` e `satisfy lastReverted` danno entrambe positivo, ovviamente `assert !lastReverted` dà negativo.

L'altra cosa che posso provare è non assegnare `zero` nel contratto. In quel caso dà errore. Sembra che dia errore solo perché sto provando ad accedere a `zero` da dentro Certora,  perché se rimuovo quello e metto `zero.call` nel contratto invece è sia soffisfacibile che contraddicibile.

Ma quindi.

No no. No no no no no. Come fai a dirmi. È tonto. Vediamo che mi dice se non assegno `recipient` da nessuna parte dai vediamo. No testa di cazzo. Prima mi dici che puoi non revertare se il destinatario è vuoto, e poi passi. Ma che testa di cazzo dai basta.

Cosa.

```CVL
assert lastReverted;
assert correctRecipient;
assert recipient == currentContract.buyer || recipient == currentContract.seller;
```
Questo, senza assegnare il recipiente, non passa. Capito. Però la prima da sola passa. Questo significa che se provo a metterlo nel test intero, un recipiente non assegnato non reverta. Ma se controllo effettivamente il comportamento di questo test, reverta.

Mi arrendo.

E non ci posso fare assolutamente niente. Vaffancvulo.

E non c'è altro da fare con Escrow.

Ok però questa proprietà è interpretabile. "The recipient of the redeem call" significa la variabile `recipient` o chi effettivamente riceve i soldi? Io direi la seconda, e la spec Certora controlla quello. Prima controllavo la variabile, e avevo interpretato così la proprietà. Direi che cambio la ground truth, mi sembra più giusto così.

Se avrò voglia farò la versione che non ha codice, la versione che reverta sempre e non ha codice, la versione che non ha codice e reverta quando deve insomma le solite. Ma non mi sembra necessario.