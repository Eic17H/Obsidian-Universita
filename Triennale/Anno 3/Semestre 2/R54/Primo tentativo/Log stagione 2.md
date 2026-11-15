---
cssclasses:
  - r54
---
Cambio documento per comodità.

## 13 novembre

Non ce la faccio più con Lottery. Non capisco niente. I test non hanno senso.

Consideriamo tutti i contratti:
* Call Wrapper è talmente semplice da diventare difficile.
* Deposit ETH: C'è quel problema coi quantificatori, e vari falsi strani.
* Deposit ERC: **wd-contract-bal** non va bene, non so perché e non credo sia per la rientranza.
* SRW: **recov-implies-guardian** era il grande problema, e ovviamente **recov-succeeds** su SolCMC.

Forse riesco a fare qualcosa per **wd-contract-bal**. Non sarà elegante, non sarà rigoroso, non rispetterà la lettera della proprietà, ma funzionerà decentemente. Praticamente assumerò che il metodo che permette di rispettare la proprietà sia sempre lo stesso.