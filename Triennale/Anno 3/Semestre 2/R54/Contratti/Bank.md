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

Come posso risolvere quella cosa di v13? Tecnicamente potrei. È brutto, ma potrei:

```Solidity
/// @custom:ghost
mapping(address => uint) expectedBalances;
mapping(address => int) expectedBalancesSigned;
bool balancesSigned;
bool balancesUnsigned;

function checkSigned(int) internal {balancesSigned = true;}
function checkSigned(uint) internal {balancesUnsigned = true;}

/// @custom:preghost function deposit
expectedBalances[msg.sender] += uint(amount);
expectedBalancesSigned[msg.sender] += int(amount);

/// @custom:preghost function withdraw
expectedBalances[msg.sender] -= uint(amount);
expectedBalancesSigned[msg.sender] -= int(amount);

/// @custom:invariant
function invariant(address a) public {
    checkSigned(balances[a]);
    if(balancesSigned) assert(expectedBalancesSigned[a] == int(balances[a]));
    if(balancesUnsigned) assert(expectedBalances[a] == uint(balances[a]));
}
```

Tra l'altro avevo dimenticato di togliere `expectedBalancesSigned`.

Oddio funziona. Oddio funziona. È così stupido. Che schifo. È un linguaggio che non ti permette di confrontare un indirizzo e un uint ma ti permette comunque di fare queste schifezze bitwise per fare contento il typechecker.

---

Devo aggiustare **cbal-eq-sum-bal**.sol. Il problema è che è troppo lento. Il modo più stupido di farlo è come segue:

```Solidity
function invariant() public {
    uint bals = 0;
    uint160 a;
    for(a = 0; a<type(uint160).max; a++) {
            bals += balances[address(a)];
    }
    assert(bals == contract_balance);
}
```

Ci sono tre problemi principali:
* Itera su $2^{160}$ valori, troppo lento.
* L'overflow su `bals` conta come positivo.
* Non è compatibile con v13.

Vorrei applicare la stessa logica dell'altro per gestire i negativi.

Figo, carino. Grazie DeepSeek. Io voglio una lista in cui posso fare `push(addr)`, e *se l'indirizzo non è già nella lista*, viene aggiunto alla lista. Ma per sapere se l'indirizzo c'è già, dovrei leggere tutta la lista e controllare se c'è. E invece no, uso una mappa `address => bool`, falsa di default, vera se l'indirizzo è già stato messo.

```Solidity
mapping (address => bool) hasInteracted;
address[] interacted;
function interact(address addr) public {
    if(!hasInteracted[addr]) {
        hasInteracted[addr] = true;
        interacted.push(addr);
    }
}
```

La gestione dei tipi è uguale all'altro, se i due bilanci totali hanno lo stesso tipo.

```Solidity
if( balSigned &&  cbalSigned) assert( int(balsi) ==  int(contract_balance));
if(!balSigned && !cbalSigned) assert(uint(balsu) == uint(contract_balance));
```

Come gestiamo il caso in cui i tipi sono diversi? Se il bilancio del contratto è senza segno ma la somma è uscita negativa, sicuramente è un problema. Al contrario invece, l'unico problema che può esserci è che la somma sia più del massimo `int`.

```Solidity
if( balSigned && !cbalSigned) assert(balsi >= 0 && uint(balsi) == uint(contract_balance));
if(!balSigned &&  cbalSigned) assert(balsu <= uint(type(int).max) && int(balsu) == int(contract_balance));
```

E ci siamo quasi. Manca solo la protezione dall'overflow.

```Solidity
function overflows(uint n, uint m) public returns (bool) {return m > type(uint).max - n;}
function overflows( int n,  int m) public returns (bool) {return m > type( int).max - n;}
...
overflow = overflows(balsu, uint(balances[a]);
if(!overflow) balsu += uint(balances[a]);
...
```

In totale (e ricordandomi che devo iterare sulla lista di indirizzi):

```Solidity
// `contract_balance` is always equal to the sum of the balance entries.

/// @custom:ghost

mapping (address => bool) hasInteracted;
address[] interacted;
function interact(address addr) public {
    if(!hasInteracted[addr]) {
        hasInteracted[addr] = true;
        interacted.push(addr);
    }
}

function isSigned(uint n) public returns (bool) {return false;}
function isSigned( int n) public returns (bool) {return true;}
function overflows(uint n, uint m) public returns (bool) {return m > type(uint).max - n;}
function overflows( int n,  int m) public returns (bool) {return m > type( int).max - n;}

/// @custom:preghost function deposit
interact(msg.sender);

/// @custom:preghost function withdraw
interact(msg.sender);

/// @custom:invariant
function invariant() public {
    require(interacted.length > 0);
    uint balsu;
    int balsi;
    uint i;
    bool balSigned = isSigned(balances[interacted[0]]);
    bool cbalSigned = isSigned(contract_balance);
    bool overflow;
    if(balSigned) {
        for(i = 0; i<interacted.length && !overflow; i++) {
            overflow = overflows(balsu, uint(balances[interacted[i]]));
            if(!overflow) balsu += uint(balances[interacted[i]]);
        }
    } else {
        for(i = 0; i<interacted.length && !overflow; i++) {
            overflow = overflows(balsi, int(balances[interacted[i]]));
            if(!overflow) balsi += int(balances[interacted[i]]);
        }
    }
    assert(!overflow);
    if( balSigned &&  cbalSigned) assert( int(balsi) ==  int(contract_balance));
    if(!balSigned && !cbalSigned) assert(uint(balsu) == uint(contract_balance));
    if( balSigned && !cbalSigned) assert(balsi >= 0 && uint(balsi) == uint(contract_balance));
    if(!balSigned &&  cbalSigned) assert(balsu <= uint(type(int).max) && int(balsu) == int(contract_balance));
}
```

 È comunque troppo lento. Mi sa tanto che ci serve $O(1)$ per tutti i test. Inoltre, non passa. Ovviamente non passa.

Mi sa che conviene riricominciare da zero, facendo la versione più semplice possibile *senza considerare v13*.

Un modo per eliminare il loop può essere di spostare il carico su `interact`.

```Solidity
/// @custom:ghost
uint expectedBal;

/// @custom:preghost function deposit
expectedBal -= balances[msg.sender];

/// @custom:postghost function deposit
expectedBal += balances[msg.sender];

/// @custom:preghost function withdraw
expectedBal -= balances[msg.sender];

/// @custom:postghost function withdraw
expectedBal += balances[msg.sender];

/// @custom:invariant
function invariant() public {
    assert(contract_balance == expectedBal);
}
```

Ora dà tutto corretto, tranne v13 e v14 che danno `ERR`. Ed è velocissimo. Aggiungiamo il fix per i tipi:

```Solidity
/// @custom:ghost
uint expectedBal;
int expectedBalSigned;
function isSigned(uint n) private pure returns (bool) {return false;}
function isSigned( int n) private pure returns (bool) {return true;}

/// @custom:preghost function deposit
expectedBal -= uint(balances[msg.sender]);
expectedBalSigned -= int(balances[msg.sender]);

/// @custom:postghost function deposit
expectedBal += uint(balances[msg.sender]);
expectedBalSigned += int(balances[msg.sender]);

/// @custom:preghost function withdraw
expectedBal -= uint(balances[msg.sender]);
expectedBalSigned -= int(balances[msg.sender]);

/// @custom:postghost function withdraw
expectedBal += uint(balances[msg.sender]);
expectedBalSigned += int(balances[msg.sender]);

/// @custom:invariant
function invariant() public {
    if(!isSigned(balances[msg.sender])) assert(uint(contract_balance) == expectedBal);
    else assert(int(contract_balance) == expectedBalSigned);
}
```

È un po' più lento. Magari posso renderlo più veloce sostituendo il condizionale con un'espressione booleana.

```Solidity
bool signed = isSigned(balances[msg.sender]);
assert((signed || uint(contract_balance) == expectedBal) && (!signed || int(contract_balance) == expectedBalSigned))
```

Non è veloce come quello normale ma è un po' più veloce.

Funziona con tutte le versioni fatte finora, ma è facilmente ingannabile: non c'è la protezione dall'overflow. E come si fa? Non so, mi arrendo.

L'altra cosa che manca è che non controllo il tipo di `contract_balance`.

```Solidity
/// @custom:invariant
function invariant() public {
    bool signed = isSigned(balances[msg.sender]);
    bool csigned = isSigned(contract_balance);
    assert(
        ( csigned ||  signed || uint(contract_balance) == expectedBal)
    &&  (!csigned || !signed ||  int(contract_balance) == expectedBalSigned)
    &&  (!csigned ||  signed || expectedBal >= 0 && uint(contract_balance) == uint(expectedBal))
    &&  ( csigned || !signed || expectedBalSigned >= 0 && uint(contract_balance) == uint(expectedBalSigned))
    );
}
```

Ok adesso non passa v13. Che caso è v13? `!csigned && signed`, che nell'espressione booleana chiaramente si inverte perché è un'implicazione e diventa il quarto caso. Che è proprio quello su cui non ero sicuro.

Non capisco.

La cosa divertente è che prima funzionava. Cos'è cambiato?

Prima facevo così:

```Solidity
int(contract_balance) == expectedBalSigned
```

E ora faccio così:

```Solidity
uint(contract_balance) == uint(expectedBalSigned)
```

Lo rimetto com'era prima, con l'aggiunta.

```Solidity
contract_balance < uint(type(int).max) && int(contract_balance) == expectedBalSigned)
```

Vediamo. Niente. Però mettendo esattamente l'originale. Ah certo, perché dovrebbe essere `<=`. Neanche. Certo perché ovviamente non ha senso.

Allora dovrei solo cambiare come aggiorno la somma. Perché la somma dovrebbe avere il tipo del contratto del bilancio.

Vedo se posso mettere una postghost al costruttore. Sembra di no. Ok però posso mettere direttamente questo nella ghost:

```Solidity
bool signed = isSigned(balances[msg.sender]);
bool csigned = isSigned(contract_balance);
```

La cosa che c'è da fare è gestire il tipo di `balances[]` negli aggiornamenti di `expectedBal`.

Una cosa del genere:
```Solidity
/// @custom:preghost function deposit
if(balances[msg.sender] < 0) addThis = uint(balances[msg.sender]);
else subThis = uint(balances[msg.sender]);

/// @custom:postghost function deposit
if(balances[msg.sender] < 0) subThis += uint(balances[msg.sender]);
else addThis += uint(balances[msg.sender]);
if(csigned) expectedBal = expectedBal + addThis - subThis;
else expectedBalSigned = expectedBalSigned + int(addThis) - int(subThis);
```

È lento. Ma funziona per v1. FP su v3, come.

La cosa simpatica è che devo fare una cosa del tipo `a-b+c`, stando attento al fatto che deve valutare prima `a-b` che può fare underflow, anche se `a-b+c` è positivo.

Ok io ci provo:

```Solidity
function addsub(uint add1, uint add2, uint sub1, uint sub2) internal pure returns (uint add, uint sub, bool overflow, bool underflow) {
    uint addp1;
    uint subp1;
    uint addp2;
    uint subp2;

    if(add1>sub1) addp1 = add1-sub1;
    else subp1 = sub1-add1;

    if(add2>sub2) addp2 = add2-sub2;
    else subp2 = sub2-add2;

    if(addp1>0 && addp2>0) {
        if(addp1 > type(uint).max-addp2) overflow = true;
        else add = addp1 + addp2;
    } else if(subp1>0 && subp2>0) {
        if(subp1 > type(uint).max-subp2) underflow = true;
        else sub = subp1 + subp2;
    } else if(addp1>0 && subp2>0) {
        if(addp1>subp2) add = addp1-subp2;
        else sub = subp2-addp1;
    } else if(addp2>0 && subp1>0) {
        if(addp2>subp1) add = addp2-subp1;
        else sub = subp1-addp2;
    } else {
        add = addp1+addp2;
        sub = subp1+subp2;
    }
}
```

```Solidity
/// @custom:preghost function deposit
if(balances[msg.sender] < 0) add1 = uint(balances[msg.sender]);
else sub1 = uint(balances[msg.sender]);

/// @custom:postghost function deposit
if(balances[msg.sender] < 0) sub2 = uint(balances[msg.sender]);
else add2 = uint(balances[msg.sender]);
(toAdd, toSub, doesOverflow, doesUnderflow) = addsub(add1, add2, sub1, sub2);
if(!doesUnderflow && !doesOverflow){
    if(csigned) expectedBal = expectedBal + toAdd - toSub;
    else expectedBalSigned = expectedBalSigned + int(toAdd) - int(toSub);
}
```

Però è comunque incompleto e come minimo sarà lentissimo.