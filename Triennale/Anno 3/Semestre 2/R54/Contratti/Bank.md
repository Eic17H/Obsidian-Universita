---
cssclasses:
  - r54
---
Zerotoken Bank è abbastanza semplice.

Come al solito devo prima aggiornare i test Certora. Anche qui sto avendo il problema del time out.

Credo di dover sostituire le invarianti con delle regole che seguono una logica per raggiungere solo stati raggiungibili.

Vediamo le proprietà.

- **always-bal-inc**: puoi sempre aumentare il conto.
- **always-bal-to-max**: puoi sempre riempire il conto in una transazione.
- **always-wd-all-many**: puoi sempre svuotare il conto in transazioni finite.
- **always-wd-all-one**: poi sempre svuotare il conto in una transazione.
- **bal-dec-onlyif-wd**: solo tu puoi toglierti soldi, e lo fai con `withdraw`.
- **bal-inc-onlyif-dep**: solo tu puoi aumentarti i soldi, e lo fai con `deposit`.
- **bal-nonneg**: hai sempre soldi non-negativi.
- **bal-sum-dep-wd**: il tuo bilancio è sempre $depositi - prelievi$, contando solo le chiamate non revertite.
- **cbal-eq-sum-bal**: `contract_balance` è sempre la somma dei bilanci degli utenti.
- **cbal-ge-bal**: `contract_balance` è sempre $\geq$ di ciascun bilancio utente.
- **cbal-nonneg**: `contract_balance` $\geq 0$.
- **dep-inc-snd-bal**: `deposit(amount)` aumenta il bilancio di $amount$, se non reverta.
- **dep-not-revert**: `deposit` non reverta.
- **frontrun-many**: un certo $f(a)$ ha lo stesso effetto se preceduto da illimitati $f'(a')$ di altri utenti.
- **frontrun-one**: un certo $f(a)$ ha lo stesso effetto se preceduto da un $f'(a')$ di un altro utente.
- **sum-wd-le-sum-dep**: i soldi che hai prelevato sono $\leq$ i soldi che hai depositato.
- **wd-dec-snd-bal**: `withdraw(amount)` diminuisce il bilancio di $amount$, se non reverta.
- **wd-not-revert**: `withdraw(amount)` non reverta se $amount > 0$ e $amount \leq$ il tuo bilancio.

La prima cosa che farò sarà mettere in ordine la ground truth, mi dispiace ma ci sono dei commenti quasi inutili, "requires inductive reasoning about the sum", "in all versions parameters are uints".

Proprietà che vanno falsificate o verificate:
* **always-bal-to-max**: verificabile permettendo di depositare anche se il bilancio totale non può aumentare.
* **bal-dec-onlyif-wd**: falsificabile mettendo un nuovo metodo o modificando una view.
* **bal-inc-onlyif-dep**: stessa cosa.
* **bal-nonneg**: forse posso cambiare il tipo.
* **cbal-nonneg**: stessa cosa.
* **dep-inc-snd-bal**: falisificabile facilmente, non so perché non lo sia già.
* **dep-not-revert**: basta togliere tutto il codice dal metodo.

Quindi vediamo che versioni fare:
* Se si deposita ma il bilancio del contratto è già al massimo, il bilancio dell'utente viene aggiornato ma il bilancio del contratto no.
* Un nuovo metodo diminuisce il bilancio dell'utente.
* `balanceOf` diminuisce il bilancio dell'utente.
* Un nuovo metodo aumenta il bilancio dell'utente.
* `balanceOf` aumenta il bilancio dell'utente.
* I bilanci sono interi con segno.
* Il bilancio del contratto è un intero con segno.
* `deposit` aumenta il bilancio della somma sbagliata.
* `deposit` non fa niente.
* Tutti i metodi revertano sempre.
* Tutti i metodi non fanno niente.
* Tutti i metodi revertano sempre e non hanno altro codice.
* Tutti i metodi non fanno niente, ma revertano quando dovrebbero.
* Tutti i metodi sono non-rientranti.
* `balances` contiene la serie di Fibonacci, `deposit` e `withdraw` calcolano il prossimo termine, `balanceOf` e `totalBalance` restituiscono la stima corrente moltiplicata per $10^{18}$.

L'ultima non so se metterla.

Ignorando l'ultima, passerebbe da 7 versioni a 21. Farò più avanti la ground truth.

---

Vediamo cosa posso definire in SolCMC:
* ==🟠**always-bal-inc**: non credo, perché il controesempio è una revert.==
* ==🟠**always-bal-to-max**: stessa cosa.==
* ==🟡**always-wd-all-many**: non credo, forse posso provare a usare un loop ma non ha senso.==
* ==🟡**always-wd-all-one**: boh forse.==
* ==🟢**bal-dec-onlyif-wd**: in teoria sì ma è aggirabile.==
* ==🟢**bal-inc-onlyif-dep**: stessa cosa.==
* ==🟢**bal-sum-dep-wd**: semplice.==
* ==🟢**cbal-eq-sum-bal**: semplice.==
* ==🔴**dep-not-revert**: mi sa di no.==
* ==🔴**frontrun-many**: non si possono modellare utenti diversi.==
* ==🔴**frontrun-one**: stessa cosa.==
* ==🟢**sum-wd-le-sum-dep**: semplice.==
* ==🔴**wd-not-revert**: no.==

Per **bal-sum-dep** lo faccio dopo perché non so come devo organizzare l'overloading per il mismatch dei tipi tra `amount` di wd, `amount` di dep e bilanci.

Ecco qualcosa che non funziona:
```Solidity
// for every user `a`,
// their balance entry is equal to the sum of all `amount`s in successful `deposit(amount)` with `msg.sender = a`
// minus those in successful `withdraw(amount)` with `msg.sender = a`.

/// @custom:ghost

// Overloading to support versions with different types

mapping(address => uint) expectedBalsUnsigned;
mapping(address => int) expectedBalsSigned;

bool balSigned = false;
bool balUnsigned = false;
bool depSigned = false;
bool depUnsigned = false;
bool wdSigned = false;
bool wdUnsigned = false;

bool underflow = false;
bool overflow = false;

function updateDep(address a, uint amt, uint bal) private {
    depUnsigned = true;
    balUnsigned = true;
    if(amt > type(uint).max - expectedBalsUnsigned[a]) {
        overflow = true;
    } else {
        expectedBalsUnsigned[a] += uint(amt);
    }
}
function updateDep(address a, uint amt, int bal) private {
    depUnsigned = true;
    balSigned = true;
    if(amt > uint(type(int).max) - uint(expectedBalsSigned[a])) {
        overflow = true;
    } else {
        expectedBalsSigned[a] += int(amt);
    }
}
function updateDep(address a, int amt, uint bal) private {
    depSigned = true;
    balUnsigned = true;
    if(uint(amt) > uint(type(uint).max) - uint(expectedBalsUnsigned[a])) {
        overflow = true;
    } else {
        expectedBalsUnsigned[a] += uint(amt);
    }
}
function updateDep(address a, int amt, int bal) private {
    depSigned = true;
    balSigned = true;
    if(uint(amt) > uint(type(int).max) - uint(expectedBalsUnsigned[a])) {
        overflow = true;
    } else {
        expectedBalsSigned[a] += int(amt);
    }
}

function updateWd(address a, uint amt, uint bal) private {
    wdUnsigned = true;
    balUnsigned = true;
    if(amt > expectedBalsUnsigned[a]) {
        underflow = true;
    } else {
        expectedBalsUnsigned[a] -= uint(amt);
    }
}
function updateWd(address a, uint amt, int bal) private {
    wdUnsigned = true;
    balSigned = true;
    if(amt > uint(expectedBalsSigned[a])) {
        underflow = true;
    } else {
        expectedBalsSigned[a] -= int(amt);
    }
}
function updateWd(address a, int amt, uint bal) private {
    wdSigned = true;
    balUnsigned = true;
    if(uint(amt) > uint(expectedBalsUnsigned[a])) {
        underflow = true;
    } else {
        expectedBalsUnsigned[a] -= uint(amt);
    }
}
function updateWd(address a, int amt, int bal) private {
    wdSigned = true;
    balSigned = true;
    if(uint(amt) > uint(expectedBalsUnsigned[a])) {
        underflow = true;
    } else {
        expectedBalsSigned[a] -= int(amt);
    }
}

/// @custom:preghost function deposit
updateDep(msg.sender, amount, balances[msg.sender]);

/// @custom:preghost function withdraw
updateWd(msg.sender, amount, balances[msg.sender]);

/// @custom:invariant
function invariant(address a) public {
    assert((!balSigned || expectedBalsSigned[a] == int(balances[a]))
    && (!balUnsigned ||expectedBalsUnsigned[a] == uint(balances[a]))
    && (!underflow)
    && (!overflow));
}
```

Cioè, magari funziona, ma in 60 secondi non dà risposta quindi non si sa.

Provo in un altro modo.

Questa è la versione più semplice possibile:

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalances;

/// @custom:preghost function deposit
expectedBalances[msg.sender] += amount;

/// @custom:preghost function withdraw
expectedBalances[msg.sender] -= amount;

/// @custom:invariant
function invariant(address a) public {
    assert(expectedBalances[a] == balances[a]);
}
```

Noto che devo rifare la groundtruth. Ma l'altro problema ovviamente è che in v13 c'è un errore di tipo.

Semplice cast, approccio molto semplice.

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalances;

/// @custom:preghost function deposit
if(amount > 0) expectedBalances[msg.sender] += uint(amount);
else expectedBalances[msg.sender] -= uint(-amount);

/// @custom:preghost function withdraw
if(amount > 0) expectedBalances[msg.sender] -= uint(amount);
else expectedBalances[msg.sender] += uint(-amount);

/// @custom:invariant
function invariant(address a) public {
    assert(expectedBalances[a] == uint(balances[a]));
}
```

Ovviamente non basta, bisogna effettivamente gestire i bilanci negativi.

Con molto trial and error, sono arrivato a questa soluzione:

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalances;
mapping(address => bool) expectedBalanceIsNegative;

function absv(uint n) internal pure returns (uint) {return n;}
function absv(int n) internal pure returns (uint) {return n<0 ? uint(-n) : uint(n);}

/// @custom:preghost function deposit
if(amount >= 0) {
    if(!expectedBalanceIsNegative[msg.sender]) {
        expectedBalances[msg.sender] += absv(amount);
    } else {
        if(expectedBalances[msg.sender] > absv(amount)) {
            expectedBalances[msg.sender] -= absv(amount);
        } else {
            expectedBalances[msg.sender] = absv(amount) - expectedBalances[msg.sender];
            expectedBalanceIsNegative[msg.sender] = false;
        }
    }
} else {
    if(expectedBalanceIsNegative[msg.sender]) {
        expectedBalances[msg.sender] += absv(amount);
    } else {
        if(expectedBalances[msg.sender] > absv(amount)) {
            expectedBalances[msg.sender] -= absv(amount);
        } else {
            expectedBalances[msg.sender] = absv(amount) - expectedBalances[msg.sender];
            expectedBalanceIsNegative[msg.sender] = true;
        }
    }
}

/// @custom:preghost function withdraw
if(amount < 0) {
    if(!expectedBalanceIsNegative[msg.sender]) {
        expectedBalances[msg.sender] += absv(amount);
    } else {
        if(expectedBalances[msg.sender] > absv(amount)) {
            expectedBalances[msg.sender] -= absv(amount);
        } else {
            expectedBalances[msg.sender] = absv(amount) - expectedBalances[msg.sender];
            expectedBalanceIsNegative[msg.sender] = false;
        }
    }
} else {
    if(expectedBalanceIsNegative[msg.sender]) {
        expectedBalances[msg.sender] += absv(amount);
    } else {
        if(expectedBalances[msg.sender] > absv(amount)) {
            expectedBalances[msg.sender] -= absv(amount);
        } else {
            expectedBalances[msg.sender] = absv(amount) - expectedBalances[msg.sender];
            expectedBalanceIsNegative[msg.sender] = true;
        }
    }
}

/// @custom:invariant
function invariant(address a) public {
    assert(expectedBalances[a] == absv(balances[a]));
    assert(!expectedBalanceIsNegative[a] || balances[a] < 0);
}
```

È molto lento e v1 non passa. Il problema sembra essere l'esistenza di $-0$. DeepSeek consiglia di usare semplicemente variabili con segno nel test, ma ci sarebbe un semplice controesempio.

Dopo un po' di correzioni, ha generato questo:

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalanceMagnitude;
mapping(address => bool) expectedBalanceIsNegative; // false whenever magnitude == 0

// Signed -> (magnitude, negative). Handles int256 min without overflow.
function magOf(uint n) internal pure returns (uint, bool) { return (n, false); }
function magOf(int  n) internal pure returns (uint, bool) {
    if (n >= 0) return (uint(n), false);
    if (n == type(int).min) return (uint(1) << 255, true);
    return (uint(-n), true);
}

// (mag, neg) + (d, dNeg), zero-normalized.
function sAdd(uint mag, bool neg, uint d, bool dNeg) internal pure returns (uint, bool) {
    if (neg == dNeg) return (mag + d, neg);
    if (mag > d)     return (mag - d, neg);
    if (mag == d)    return (0, false);   // exact zero -> non-negative
    return (d - mag, dNeg);
}
// sSub(mag,neg,d,dNeg) == sAdd(mag,neg,d,!dNeg)

function _apply(address who, uint d, bool dNeg, bool subtract) internal {
    (expectedBalanceMagnitude[who], expectedBalanceIsNegative[who]) =
        sAdd(expectedBalanceMagnitude[who], expectedBalanceIsNegative[who], d, subtract ? !dNeg : dNeg);
}

function _recordDeposit(address who, uint amount) internal { _apply(who, amount, false, false); }
function _recordDeposit(address who, int  amount) internal { (uint d, bool n) = magOf(amount); _apply(who, d, n, false); }
function _recordWithdraw(address who, uint amount) internal { _apply(who, amount, false, true); }
function _recordWithdraw(address who, int  amount) internal { (uint d, bool n) = magOf(amount); _apply(who, d, n, true); }

/// @custom:preghost function deposit
_recordDeposit(msg.sender, amount);

/// @custom:preghost function withdraw
_recordWithdraw(msg.sender, amount);

/// @custom:invariant
function invariant(address a) public {
    (uint am, bool an) = magOf(balances[a]);
    assert(expectedBalanceMagnitude[a] == am);
    assert(expectedBalanceMagnitude[a] == 0 || expectedBalanceIsNegative[a] == an);
}
```

Ovviamente non mi piace. Mi aspettavo che ci mettesse un sacco a girare, invece finisce subito ma dà `N` su v1.

Non so se c'è una soluzione. Potrebbe essere un errore mio e di DeepSeek, potrebbe essere che il solver non gestisce bene questa cosa.

Ehhhh. Io ho riprovato a fare una cosa semplice.

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalances;
mapping(address => int) expectedBalancesSigned;
bool balancesSigned;
bool balancesUnsigned;

function checkSigned(int) internal {balancesSigned = true;}
function checkSigned(uint) internal {balancesUnsigned = true;}

/// @custom:preghost function deposit
expectedBalances[msg.sender] += amount;

/// @custom:preghost function withdraw
expectedBalances[msg.sender] -= amount;

/// @custom:invariant
function invariant(address a) public {
    checkSigned(balances[a]);
    if(balancesSigned) assert(balances[a] > 0 && expectedBalances[a] == uint(balances[a])); // todo: balances[a]>0 is wrong
    if(balancesUnsigned) assert(expectedBalances[a] == uint(balances[a]));
}
```

Ci sono molti falsi negativi:

* v9: errore nella ground truth
* v10: errore nella ground truth
* v11: errore nella ground truth
* v12: errore nella ground truth
* v13: `balances[a] > 0`
* v15: errore nella ground truth
* v16: ho interpretato male la proprietà
* v18: ho interpretato male la proprietà
* v20: ho interpretato male la proprietà
* v22: errore nella ground truth

Da fare domani: update alla ground truth, gestione di bilanci negativi, e capire come interpretare la proprietà (in caso chiedo a Bartoletti).