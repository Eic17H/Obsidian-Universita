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

## 16 novembre

Lottery è carina, continuerò con Lottery, altro che.

## 25 novembre

Ho finalmente parlato con Bartoletti. Le risposte:
* Posso mettere più `rule` in una `.spec`.
* `satisfy` non funziona benissimo.
* Il fatto che `assert` e `satisfy` non si possano mettere nello stesso file anche in regole diverse è un bug, posso aggiustare lo script di Python.
* Per **reveal-timeout-after-isCommitted** devo cambiare la ground truth.
* Per **rel-strict-incr** e **rel-grows-linear** in effetti non ho capito bene se va bene tenere i test così e cosa fare con la ground truth. Glielo chiederò di nuovo. Però mi ha detto di fare test Forge, che sono singoli controesempi per ciascuna versione.
* Per la tesi posso fare un nuovo use case (contratto) che dia insight. Oppure posso lavorare su Social Recovery Wallet, che lui voleva buttare perché pensava fosse completamente privo di valore ma io ne ho trovato.
* Praticamente i contratti su cui ho lavorato di più ha detto che voleva già considerarli completi e poi gli ho detto che avevo trovato altro da aggiungere.
* Ha detto che sto facendo un lavoro lodevole (let's fucking go).

Mi ha fatto piacere arrivare lì e vederlo avere difficoltà con git per una cosa semplicissima (non puoi fare pull perché hai cambiamenti, non puoi fare stash perché non hai cambiamenti, quindi direttamente elimina il file e fa pull). Mi sento meno scemo per aver fatto potenzialmente casino con una rebase.

Quindi adesso devo:
* Rifinire e fare PR per:
	* Escrow
	* Crowdfund
	* Bet
	* Vesting Wallet
	* HTLC
* Correggere lo script Python e includerlo nella PR.
* Fare controesempi in Forge per VW.
* Pensare a un altro use case nuovo per la tesi, se non voglio fare SRW, e mostrare anche quale insight si ottiene dalla mia ricerca su SRW.

E onestamente godo, perché mi ero inscimmiato su SRW per la cosa dell'hash con Certora. Altrimenti posso comunque prendere gli elementi che mi hanno dato difficoltà e combinarli in un contratto.

La prossima volta (tra due settimane):
* Discutere sulla tesi.
* Chiedere meglio cosa fare per VW perché in effetti ho capito che devo fare i controesempi con Forge ma non ho capito se correggere la ground truth (anche se a questo punto mi sembra di sì).

L'altra cosa importante è che posso aggiungere nuove proprietà ai contratti se mi serve. Quindi se vedo che posso fare una versione che non funziona ma verifica tutte le proprietà, posso aggiungere proprietà.

## 26 novembre

L'altra cosa che devo chiedere a Bartoletti è se posso usare `/// @custom:nondef`.

## 27 novembre

