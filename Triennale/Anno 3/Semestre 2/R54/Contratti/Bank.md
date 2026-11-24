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