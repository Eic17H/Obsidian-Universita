## Setup

Devi farti un account, generare la tua chiave e impostarla come variabile d'ambiente mi pare.

## Studio informale

Osservare `owner-not-change.spec`:

```CVL
/// owner-not-change:
/// the address `owner` does not change after its value is
/// initialized in the constructor.

rule owner_not_change {
    env e;
    calldataarg args;
    method f;

    address old_owner = currentContract.owner;

    f@withrevert(e, args);

    address new_owner = currentContract.owner;

    assert old_owner == new_owner;
}
```

Cosa succede qui? Sta prendendo un contratto e confronta il valore di `.owner` in due momenti dell'esecuzione. Il passaggio del tempo è segnato da `f@withrevert()`. Cos'è?

Sta chiamando il metodo `f` coi parametri `args`, eseguito nell'ambiente `e`. Quindi esegue il metodo e confronta il valore della variabile prima e dopo.

Cos'è quindi `@withrevert`? Dice a Certora di testare anche i casi in cui c'è un [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Funzioni#Revert|revert]].

Guardando gli altri, sono simili, ma hanno anche cose come:

* `require()`
* `@withrevert`
* `assert !lastReverted =>`
* `mathint` per dichiarare variabili
* `nativeBalances[currentContract]` non so cosa sia

Non so cosa sia per esempio `e.block.number` o `e.msg.value`. Probabilmente è perché non ho davvero capito come funziona il paradigma a contratti e cos'è il suo ambiente.