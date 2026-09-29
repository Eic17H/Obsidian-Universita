## Setup

Devi farti un account, generare la tua chiave e impostarla come variabile d'ambiente mi pare, con `export CERTORAKEY="..."`.

Poi ho dovuto fare un casino, lascio il terminale qui:

```Bash
(.venv) eic@H17-MSI-Stealth:/mnt/c/gituni/contracts-verification-benchmark/contracts/vesting_wallet$ which certoraRun
/mnt/c/gituni/.venv/bin/certoraRun
(.venv) eic@H17-MSI-Stealth:/mnt/c/gituni/contracts-verification-benchmark/contracts/vesting_wallet$ "$(dirname "$(which certoraRun)")/certoraRun.py"
-bash: /mnt/c/gituni/.venv/bin/certoraRun.py: No such file or directory
(.venv) eic@H17-MSI-Stealth:/mnt/c/gituni/contracts-verification-benchmark/contracts/vesting_wallet$ which certoraRun
/mnt/c/gituni/.venv/bin/certoraRun
(.venv) eic@H17-MSI-Stealth:/mnt/c/gituni/contracts-verification-benchmark/contracts/vesting_wallet$ ln -s /mnt/c/gituni/.venv/lib/python3.12/site-packages/certora_cli/certoraRun.py /mnt/c/gituni/.venv/bin/certoraRun.py
(.venv) eic@H17-MSI-Stealth:/mnt/c/gituni/contracts-verification-benchmark/contracts/vesting_wallet$ chmod +x /mnt/c/gituni/.venv/bin/certoraRun.py
```

Essenzialmente ho dovuto aggiungere la mia installazione di `certoraRun.py` al PATH.

Ho anche dovuto installare Java, versione almeno 19.
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

## Come si fa come funziona

Prima di tutto devi creare il file `getters.sol`. Come suggerisce il nome, è un file che definisce delle funzioni getter, cioè delle funzioni in CVL che restituiscono i valori delle variabili del contratto.

Per esempio, sto facendo Vesting Wallet. La specifica `exp-all-rel.spec` invoca il getter `getStart()`. Provo a definirlo:
```CVL
function getStart() public view returns (uint) {
    return start;
}
```

Io non so se funziona, perché in teoria `start` è privata, ma magari visto che siamo in Certora e non in Solidity gli va bene. 

Il fatto è che i file `.spec` mi dice che sono sbagliati. Che diamine. Però, come al solito, vedere un nuovo errore è un passo avanti.

L'ho girato con un contratto noto buono (ha tutti i file necessari per Certora) e, beh, non dà errore. Però è molto lento. In più quello che fa lo invia al server e te lo ritrovi nell'account. Sono qui da 10 minuti e ne ha fatto 27 su 108. Non lo voglio lasciare così tutta la notte, quindi per ora lo fermo.

## Ecco svelato il trucco

Tu hai le tue specifiche, del tipo `proprieta.spec`, scritte in CVL. Queste possono invocare dei metodi, che vanno definiti e dichiarati in altri file.

Implementi i getter in Solidity in `getters.sol`, e li dichiari in CVL in `methods.spec`. Attenzione, questo tool ha anche dei fallback per le dichiarazioni che sono condivisi dall'intero progetto, quindi il tool ha dichiarato `balanceOf()`, e tu lo implementi una volta per contratto.

Per esempio ho `getters.sol`:
```Solidity
function getBalance() public view returns (uint) {
    return address(this).balance;
}

function getStart() public view returns (uint64) {
    return start;
}

function getDuration() public view returns (uint64) {
    return duration;
}
```

E `methods.spec`:
```CVL
methods {
    function getBalance() external returns (uint) envfree;
    function getStart() external returns (uint64) envfree;
    function getDuration() external returns (uint64) envfree;
}
```

## Spiegazione migliore

I test scritti in Certora usano il linguaggio CVL. Non sono funzioni, ma blocchi di codice; i valori casuali sono assegnati alle variabili dichiarate senza inizializzazione. Anche qui si usano assert e require. La differenza è che si possono oddio è un casino se guardi no-send-in-agree. Stacca stacca, non ci capisco niente in realtà.

## Questo è strano

```
Finished verification request
ERROR: Prover found violations:

[rule] rel_le_bal:
    [func] Induction base: After the constructor: FAIL
    [func] <receiveOrFallback>()
    [func] release()
report url: https://prover.certora.com/output/8113460/0f84be2b550948059f0f3c506f230a4d?anonymousKey=d0488b72b09a6c3891812cc337f0d472c4564219

Violations were found
```

Induction base. Chissà cos'è.