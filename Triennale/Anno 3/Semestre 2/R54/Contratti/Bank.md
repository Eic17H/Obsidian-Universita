---
cssclasses:
  - r54
---
Zerotoken Bank è abbastanza semplice.

Come al solito devo prima aggiornare i test Certora. Anche qui sto avendo il problema del time out.

Credo di dover sostituire le invarianti con delle regole che seguono una logica per raggiungere solo stati raggiungibili.

Vediamo le proprietà.

* **always-bal-inc**: puoi sempre aumentare il conto.
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

La prima cosa che farò sarà mettere in ordine la ground truth, mi dispiace ma ci sono dei commenti quasi inutili, "requires inductive reasoning about the sum".