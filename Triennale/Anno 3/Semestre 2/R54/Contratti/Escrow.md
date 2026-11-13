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
