---
cssclasses:
  - r54
---
Oddio ha tantissime proprietà e tantissime versioni.

È molto interessante come contratto. È una lotteria appunto, ma gli smart contract sono deterministici e usare fonti esterne di casualità non è abbastanza sicuro per uno smart contract, quindi si usa un metodo deterministico per usare i due partecipanti come RNG.

Ciascun giocatore sceglie un segreto e ne invia l'hash (trauma da SRW), insieme a una somma di denaro uguale per entrambi i giocatori. Una volta che il contratto ha entrambe le hash, i giocatori inviano i segreti. Il vincitore è scelto in funzione dei segreti.

Il problema ovviamente è che il funzionamento del contratto si basa sul comportamento dei giocatori, che possono non seguire le regole. Quindi bisogna punire i giocatori disonesti, in modo tale che un giocatore onesto abbia sempre l'esperienza che l'altro giocatore sia onesto, anche se non lo è.

Le regole sono che:

1. Il giocatore 0 invia soldi e hash.
2. Il giocatore 1 invia soldi e hash.
3. G0 rivela il segreto.
4. G1 rivela il segreto.
5. I soldi vengono inviati.

Con l'aggiunta che il turno di ciascun giocatore ha una durata massima. Se un giocatore fa scadere il tempo, l'altro giocatore riceve tutti i soldi presenti nel contratto. Per esempio, tra il passo 1 e 2, se G1 aspetta troppo allora G0 si riprende i soldi. Sono tre attese in totale, dalla durata di `DELTA_TIME` e implementata coi timestamp `end_join`, `end_reveal0` ed `end_reveal1` (il tempo parte alla costruzione del contratto). Come con gli altri contratti, il riscatto dei soldi al timeout è implementato come metodo che va chiamato, però può essere chiamato da chiunque.

La descrizione del contratto non li menziona, compaiono a caso nelle descrizioni delle proprietà, ma il contratto è implementato come macchina a transizione di stato. Gli stati, in ordine, sono `Join0`, `Join1`, `Reveal0`, `Reveal1`, `Win`, `End`. Si parte dallo stato `Join0`, e il passo 1 di prima (la funzione `join0()`) ci porta a `Join1`.

È un contratto interessante. Le proprietà sono tante ma perché sono presenti molte variazioni della stessa proprietà.


| Proprietà                                             | Gruppo                                                                                                                                                                                                                                                                                                                                             | Individuale                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **deadlock-freedom-join1**(-eoa)                      | Nello stato `___`, se il contratto ha soldi, la prossima transazione può essere una transazione che svuota il bilancio.                                                                                                                                                                                                                            | `Join1`                                |
| **deadlock-freedom-reveal0**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | `Reveal0`                              |
| **deadlock-freedom-reveal1**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | `Reveal1`                              |
| **deadlock-freedom-win**(-eoa)                        | ^                                                                                                                                                                                                                                                                                                                                                  | `Win`                                  |
| **deadlock-freedom-join1-witness**(-eoa)              | Dopo la chiamata al metodo `___` che non reverta, il contratto non ha soldi.                                                                                                                                                                                                                                                                       | `redeem0_nojoin1()`                    |
| **deadlock-freedom-reveal0-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | `redeem1_noreveal0()`                  |
| **deadlock-freedom-reveal1-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | `redeem0_noreveal1()`                  |
| **deadlock-freedom-win-witness**(-eoa)                | ^                                                                                                                                                                                                                                                                                                                                                  | `win()`                                |
| **honest-player-profitability-eoa-redeem0-nojoin1**   | Gioc. EOA, in uno stato `___` raggiungibile, dopo la scadenza di quello stato, chiunque può chiamare un metodo che non reverta, che aumenta ($>0$) il bilancio di `___` di esattamente \_\_\_, svuota il bilancio del contratto, e porta lo stato ad `End`.                                                                                        | `Join1`, `player0`, la sua scommessa   |
| **honest-player-profitability-eoa-redeem0-noreveal1** | ^                                                                                                                                                                                                                                                                                                                                                  | `Reveal1`, `player0`, i soldi in gioco |
| **honest-player-profitability-eoa-redeem1-noreveal0** | ^                                                                                                                                                                                                                                                                                                                                                  | `Reveal0`, `player1`, i soldi in gioco |
| **no-incentives-to-abort-eoa**                        | Gioc. EOA, dopo una transazione `reveal0` che non reverta, la prossima transazione può essere `___` e dare i soldi in gioco a `player0`.                                                                                                                                                                                                           | (qualunque)                            |
| **no-incentives-to-abort-witness-eoa**                | ^                                                                                                                                                                                                                                                                                                                                                  | `redeem0_noreveal1()`                  |
| **owner-impartiality-eoa**                            | Gioc. EOA, in qualunque stato in cui il giocatore non è determinato, per ogni transazione il cui mittente non è un giocatore, se questa transazione cambia lo storage del contratto, allora una transazione identica di cui cambia solo il mittente, per qualunque mittente EOA, nello stesso stato, deve produrre le stesse modifiche allo stato. |                                        |
| **player1-should-match-bet**                          | Se una transazione `join1` non reverta, allora `msg.value` è lo stesso della scommessa di `player0`.                                                                                                                                                                                                                                               |                                        |
| **redeem-before-deadline-reverts-nojoin1**            | Una transazione `___` reverta se il timestamp è $\leq$ `___`.                                                                                                                                                                                                                                                                                      | `redeem0_nojoin1()`, `end_join`        |
| **redeem-before-deadline-reverts-noreveal0**          | ^                                                                                                                                                                                                                                                                                                                                                  | `redeem1_noreveal0()`, `end_reveal0`   |
| **redeem-before-deadline-reverts-noreveal1**          | ^                                                                                                                                                                                                                                                                                                                                                  | `redeem0_noreveal1`, `end_reveal1`     |
| **redeem0-noreveal1-fairness-eoa**                    | Gioc. EOA, se lo stato è `Reveal1`, se `compute_winner()` si valuta a `player0`, allora una `redeem0_noreveal1()` che non reverta aumenta ($>0$) il bilancio di `player0`, non cambia il bilancio di `player1`, e diminuisce ($>0$) il bilancio del contratto.                                                                                     |                                        |
| **reveal0-reverts-after-deadline**                    | Una transazione `___` reverta dopo `___`.                                                                                                                                                                                                                                                                                                          | `reveal0()`, `end_reveal0`             |
| **reveal1-reverts-after-deadline**                    | ^                                                                                                                                                                                                                                                                                                                                                  | `reveal1()`, `end_reveal1`             |
| **status-irreversible**                               | Le transizioni di stato vanno in ordine:`Join0` < `Join1` < `Reveal0` < `Reveal1` < `Win` < `End`.                                                                                                                                                                                                                                                 |                                        |
| **win-pays-fair-winner-eoa**                          | Gioc. EOA, in uno stato `Win` raggiungibile, una transazione `win()` che non reverta deve dare al giocatore restituito da `compute_winner()` tutti i soldi in gioco.                                                                                                                                                                               |                                        |
| **win-transaction-env-independent**                   | Due transazioni `win()` che non revertano che partono dallo stesso stato del contratto dovrebbero avere lo stesso vincitore.                                                                                                                                                                                                                       |                                        |
| **winner-computation-env-independent**                | Con gli stessi input, la funzione di vittoria dà lo stesso output a prescindere dall'env.                                                                                                                                                                                                                                                          |                                        |
| **wrong-preimage-reverts-p0**                         | Se una transazione `___(s)` non reverta, allora `s` è la preimmagine dell'hash committata da `___`.                                                                                                                                                                                                                                                | `reveal0()`, `player0`                 |
| **wrong-preimage-reverts-p1**                         | ^                                                                                                                                                                                                                                                                                                                                                  | `reveal1()`, `player1`                 |
Alcune proprietà hanno anche una versione **-eoa**, che si applica solo se i giocatori sono EOA.

Anche con questa riduzione, ci sono comunque 14 macroproprietà.

Sarà certamente scomodo lavorarci.

Vedo che Certora dà FN su **win-pays-fair-winner-eoa**. Il test è molto semplice. Vedo che fa `nativeBalances[expected_winner] == pre_bal + pre_pot`, non credo che Certora faccia overflow ma è meglio controllare. Vedo anche `compute_winner(e, p0, p1, secret0(e), secret1(e))`, quindi mi chiedo se ci sia un problema con l'hash.

Per l'hash, per fortuna qui abbiamo una funzione Solidity di hashing chiamabile da Certora. Ok `secret0()` è il getter della variabile `secret0`. Boh. Dovrò girare il test e vedere il report, ma non lo farò ora.

Cosa c'è da fare domani:
* Controllare **win-pays-fair-winner-eoa**.spec.
* Leggere le 770 righe di ground truth coi commenti..
* Familiarizzare con le 22 versioni.
* Provare a scrivere almeno 5 versioni (le mie solite).
* Magari aggiungere commenti alla ground truth per almeno v1, perché non capisco.


---


Vediamo come funziona **win-pays-fair-winner-eoa**.spec. Vedo già una custom strana:
```CVL
/// @custom:run certoraRun versions/Lottery_v1.sol:Lottery versions/lib/EOA0.sol versions/lib/EOA1.sol --verify Lottery:certora/win-pays-fair-winner-eoa.spec --link Lottery:player0=EOA0 --link Lottery:player1=EOA1 --optimistic_hashing --optimistic_loop
```

In particolare mi sembra strana `--link`.

Il test controlla, nel... Eccoci. La definizione dice ***reachable** state*, ma Certora parte da uno stato arbitrario. Controlla solo che `status == Status.Win`. Allora non lo so.

Vediamo la ground truth per v1. Metto io le giustificazioni che sembrano giuste.

* **deadlock-freedom-join1** N: I metodi chiamabili in `Join1` sono `join1()` e `redeem0_nojoin1()`. `join1()` non svuota il bilancio, e `player0` può rifiutare il pagamento di `redeem0_nojoin1()`.
- **deadlock-freedom-join1-eoa** P: `player0` è un utente e riceverà i soldi.
- **deadlock-freedom-join1-witness** N: `player0` può rifiutare il pagamento. 
- **deadlock-freedom-join1-witness-eoa** P: `player0` è un utente e riceverà i soldi.
- ... sono tutti uguali
- **honest-player-profitability-eoa...** P: Il giocatore è un utente.
- **no-incentives-to-abort(-witness)-eoa** P: Sì perché quando scade il tempo funziona così.
- **owner-impartiality-eoa** P: Sì perché non c'è un metodo che dà poteri speciali all'owner.
- **player1-should-match-bet** P: Ovvio 
- **redeem-before-deadline-reverts-...** P: Ovvio  
- **redeem0-noreveal1-fairness-eoa** P: sì dai
- **reveal\_-reverts-after-deadline**: molto letterale
- **status-irreversible**:
- **win-pays-fair-winner-eoa**:
- **win-transaction-env-independent**:
- **winner-computation-env-independent**: 
- **wrong-preimage-reverts-p0**:
- **wrong-preimage-reverts-p1**:

Boh basta, ce ne sono troppi semplici. Metto un po' di commenti a quelli che sono falsi per v1. Ok erano pochi.

Il commento per `deadlock-freedom-reveal1-eoa,v6` mi sembra strano, da rivedere.

Vediamo le versioni.

| Versione | Gruppo                                                                         | Individuale           |
| -------- | ------------------------------------------------------------------------------ | --------------------- |
| 1        | Normale                                                                        | <                     |
| 2        | `___` invia metà dei soldi.                                                    | `redeem0_nojoin1()`   |
| 3        | ^                                                                              | `redeem1_noreveal0()` |
| 4        | ^                                                                              | `redeem0_noreveal1()` |
| 5        | ^                                                                              | `win()`               |
| 6        | `redeem0_noreveal1` paga `player1` anziché `player0`.                          | <                     |
| 7        | `___` non controlla lo stato.                                                  | `join1()`             |
| 8        | ^                                                                              | `reveal0()`           |
| 9        | ^                                                                              | `reveal1()`           |
| 10       | ^                                                                              | `win()`               |
| 11       | Il vincitore dipende dal timestamp.                                            | <                     |
| 12       | `___` non controlla la preimmagine.                                            | `reveal0()`           |
| 13       | ^                                                                              | `reveal1()`           |
| 14       | Il proprietario può decidere il vincitore.                                     | <                     |
| 15       | `redeem0_noreveal1()` controlla il timestamp `end_join` anziché `end_reveal1`. | <                     |
| 16       | `___` non aggiorna lo stato.                                                   | `reveal0()`           |
| 17       | ^                                                                              | `reveal1()`           |
| 18       | La funzione di riscatto paga `msg.sender` (?).                                 | <                     |
| 19       | `join1()` non controlla che la bet sia uguale.                                 | <                     |
| 20       | `win()` paga `msg.sender`.                                                     | <                     |
| 21       | `___` non ha un limite di tempo.                                               | `reveal0()`           |
| 22       | ^                                                                              | `reveal1()`           |

---

Vediamo le proprietà che compaiono solo vere o solo false

- **deadlock-freedom-join1-witness** - N
- **deadlock-freedom-reveal0-witness** - N
- **deadlock-freedom-reveal1-witness** - N
- **deadlock-freedom-win-witness** - N
- **redeem-before-deadline-reverts-nojoin1** - P
- **redeem-before-deadline-reverts-noreveal0** - P

Per gli **-witness**, posso creare una versione che richiede che il proprietario del contratto sia un EOA, e se il pagamento in quei metodi fallisce, i soldi vanno al proprietario. Oppure semplicemente si richiede che i giocatori siano EOA. Possiamo farlo perché tanto devono joinare.

In realtà a SolCMC questa cosa non importa, dà comunque negativo.

Le altre due proprietà sono facilissime da falsificare, è quasi inutile testarne i test, sono molto letterali.

Ok, è stato utile fare la v23, perché mi rendo conto che i test Certora delle proprietà **-witness**, come al solito, non partono da uno stato valido, quindi anche se il contratto non permette giocatori non EOA, il test li considera comunque. Sicuramente se mettessi il check in ogni metodo funzionerebbe. E mi sa che lo faccio. Eh ma non si può, io faccio `msg.sender == tx.origin` per controllare che il *sender* sia un EOA, ma non credo di poterlo fare con terze parti. C'era la tecnica di controllare che il suo codice abbia lunghezza nulla, ma non è infallibile.

---
Vediamo la situazione con SolCMC.

La versione 23 obbliga i giocatori ad essere EOA.

| Proprietà                                             | Gruppo                                                                                                                                                                                                                                                                                                                                             | Situazione                                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **deadlock-freedom-join1**(-eoa)                      | Nello stato `___`, se il contratto ha soldi, la prossima transazione può essere una transazione che svuota il bilancio.                                                                                                                                                                                                                            | Dà tutto negativo, la rilevazione degli EOA non funziona.<br>FNv14v18v23.<br>(In v14, si può forzare un invio a un EOA) |
| **deadlock-freedom-reveal0**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **deadlock-freedom-reveal1**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **deadlock-freedom-win**(-eoa)                        | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **deadlock-freedom-join1-witness**(-eoa)              | Dopo la chiamata al metodo `___` che non reverta, il contratto non ha soldi.                                                                                                                                                                                                                                                                       | Versione EOA non presente. Tutto negativo.<br>FNv23.                                                                    |
| **deadlock-freedom-reveal0-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **deadlock-freedom-reveal1-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **deadlock-freedom-win-witness**(-eoa)                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **honest-player-profitability-eoa-redeem0-nojoin1**   | Gioc. EOA, in uno stato `___` raggiungibile, dopo la scadenza di quello stato, chiunque può chiamare un metodo che non reverta, che aumenta ($>0$) il bilancio di `___` di esattamente \_\_\_, svuota il bilancio del contratto, e porta lo stato ad `End`.                                                                                        | ND                                                                                                                      |
| **honest-player-profitability-eoa-redeem0-noreveal1** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **honest-player-profitability-eoa-redeem1-noreveal0** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **no-incentives-to-abort-eoa**                        | Gioc. EOA, dopo una transazione `reveal0` che non reverta, la prossima transazione può essere `___` e dare i soldi in gioco a `player0`.                                                                                                                                                                                                           | ND                                                                                                                      |
| **no-incentives-to-abort-witness-eoa**                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **owner-impartiality-eoa**                            | Gioc. EOA, in qualunque stato in cui il giocatore non è determinato, per ogni transazione il cui mittente non è un giocatore, se questa transazione cambia lo storage del contratto, allora una transazione identica di cui cambia solo il mittente, per qualunque mittente EOA, nello stesso stato, deve produrre le stesse modifiche allo stato. | ==🔴ND e impossibile (forse uso `nondef`)==                                                                             |
| **player1-should-match-bet**                          | Se una transazione `join1` non reverta, allora `msg.value` è lo stesso della scommessa di `player0`.                                                                                                                                                                                                                                               | ==🟢**Tutto ok**==                                                                                                      |
| **redeem-before-deadline-reverts-nojoin1**            | Una transazione `___` reverta se il timestamp è $\leq$ `___`.                                                                                                                                                                                                                                                                                      | ==🟢**Tutto ok**== (fare più versioni)                                                                                  |
| **redeem-before-deadline-reverts-noreveal0**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **redeem-before-deadline-reverts-noreveal1**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **redeem0-noreveal1-fairness-eoa**                    | Gioc. EOA, se lo stato è `Reveal1`, se `compute_winner()` si valuta a `player0`, allora una `redeem0_noreveal1()` che non reverta aumenta ($>0$) il bilancio di `player0`, non cambia il bilancio di `player1`, e diminuisce ($>0$) il bilancio del contratto.                                                                                     | Tutto negativo (probabilmente problema EOA).                                                                            |
| **reveal0-reverts-after-deadline**                    | Una transazione `___` reverta dopo `___`.                                                                                                                                                                                                                                                                                                          | ==🟢**Tutto ok**== (fare più versioni)                                                                                  |
| **reveal1-reverts-after-deadline**                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
| **status-irreversible**                               | Le transizioni di stato vanno in ordine:`Join0` < `Join1` < `Reveal0` < `Reveal1` < `Win` < `End`.                                                                                                                                                                                                                                                 | UNK                                                                                                                     |
| **win-pays-fair-winner-eoa**                          | Gioc. EOA, in uno stato `Win` raggiungibile, una transazione `win()` che non reverta deve dare al giocatore restituito da `compute_winner()` tutti i soldi in gioco.                                                                                                                                                                               | ND                                                                                                                      |
| **win-transaction-env-independent**                   | Due transazioni `win()` che non revertano che partono dallo stesso stato del contratto dovrebbero avere lo stesso vincitore.                                                                                                                                                                                                                       | UNK                                                                                                                     |
| **winner-computation-env-independent**                | Con gli stessi input, la funzione di vittoria dà lo stesso output a prescindere dall'env.                                                                                                                                                                                                                                                          | ==🟡**Tutto ok**== ma so come falsificarlo                                                                              |
| **wrong-preimage-reverts-p0**                         | Se una transazione `___(s)` non reverta, allora `s` è la preimmagine dell'hash committata da `___`.                                                                                                                                                                                                                                                | ==🟢**Tutto ok**== (fare più versioni)                                                                                  |
| **wrong-preimage-reverts-p1**                         | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                                       |
Vedo troppe proprietà che riguardano revert e funzionano bene in SolCMC, è sospetto perché a me non riescono mai. Ah figo. Ah figo. Ah certo.

Se io voglio che $b \to (f() \to rev)$, allora basta fare `preghost f: flag = !b` e `postghost f: assert(flag)`. Quindi se $b$ è vera, allora il test passa solo se la funzione reverta. Ho fatto tante di quelle cavolate con le negate.

E allora devo tornare a lavorare a tutti i contratti vecchi. Che certamente mi dà qualcosa da fare per far passare le ore. Però prima penso a cosa fare per Lottery. Ah no ma tra l'altro il problema era not reverts.

* **redeem-before-deadline-reverts-\***: non abbiamo abbastanza controesempi, l'approccio è sensato ma è solo uno, bisogna trovare modi più strani per magari seguire la regola certe volte e non sempre (se la deadline è esattamente questo numero, falla scadere un blocco in anticipo).
* **status-irreversible**: ho messo il timeout a 300 e dà P! su v1, quindi è da fare con un timeout altissimo.
* **\*-reverts-after-deadline** anche qui farei più controesempi per sicurezza.
* **winner-computation-env-independent**: funziona solo perché in tutte le versioni la formula è la stessa, se la inverti seguendo comunque le specifiche il test fallisce.
* **wrong-preimage-reverts-\***: anche qui, fare condizioni più complicate per se reverta o no.

Vediamo poi come dovrei fare quelli non esistenti:
* **honest-player-profitability-eoa-\***: il check EOA non funziona, ma la descrizione si traduce molto semplicemente in richieste e asserzioni.
* **no-incentives-to-abort-\***: il check EOA non funziona, stessa logica e stesso problema di **deadlock-freedom-\***.
* **win-pays-fair-winner-eoa**: anche questa facilmente traducibile, e il revert gioca in nostro favore.

Io non vedo nessun altro contratto usare `/// @custom:nondef`. Vedo che nel readme scrive `FND`. E anche `FND` non compare in nessun altro contratto.

Farei prima quelli non esistenti.

Ok **status-irreversible** tutto corretto.

**honest-player-profitability-\*** non mi sembra fattibile in SolCMC, dice "può eseguire una transazione", quindi non solo c'è il problema del fatto che deve essere EOA ma deve anche essere un $\exists$, cosa che mi sembra impossibile addio. Ah ma certo, negate (non credo funzioni così ma ok, glielo copio).

Ah. Ah. Ok. Sto vedendo una cosa particolare per Certora:

```CVL
/// @custom:run certoraRun versions/Lottery_v1.sol:Lottery versions/lib/EOA0.sol versions/lib/EOA1.sol --verify Lottery:certora/honest-player-profitability-eoa-redeem0-nojoin1.spec --link Lottery:player0=EOA0 --link Lottery:player1=EOA1
```

Questo significa che questo è il modo per assicurarsi che un contratto sia un EOA.

Il test SolCMC dà tutto negativo. E ti dirò di più, è perché non passa le require mi sa. Infatti l'ho cambiato un po' perché prima le require bloccavano tutta l'esecuzione del test. E adesso dà ancora tutto negativo. Non so cosa fare. Non ha senso. Ho sbagliato di nuovo le require. Ed è per questo che vedo un sacco il metodo `bool pre`/`assert(!pre||)`, perché funziona bene. Ok adesso è lentissimo. UNK a 5 minuti, c'è qualcosa che non va. Sì è proprio perché controllare tutti i metodi non va bene. Infatti se la uso su un solo metodo ci mette pochi secondi. Ma esce tutto `P`. Boh. Orrendo schifo.

Provo a sostituire `assert(...)` con `assertion = ...`, e mettere `assert(assertion)` nell'invariante. Ah e così gira in 7 secondi. Pensavo che fosse una cosa stupida perché è la stessa identica cosa e quando esplora i percorsi possibili risultano uguali ma no. Ok però esce comunque tutto positivo, e stavolta `P!`. Ah è perché non esistono controesempi. Ok l'ho fatto al volo e dà positivo. Non so. EOA immagino. Ah no devo evitare che il pagamento sia di $0$. E invece non basta. Boh.

---

Provo **win-pays-fair-winner-eoa**. Ovviamente è molto semplice, require status win, win, assert diff=pot. Però non funziona, probabilmente per il problema degli EOA. Ma ovviamente c'è anche un errore mio: non dovrei chiamare `win()` dall'invariante quando posso semplicemente mettere le altre cose come preghost e postghost.

No ma il compilatore dice che `.code.length == 0` non è supportato nella versione corrente.

Preferirei scrivere controesempi.

* **redeem-before-deadline-reverts-\***: rimuovi il check della deadline dai metodi redeem, metti che reverta solo se chi lo chiama non è l'owner
* **\*-reverts-after-deadline**: stessa cosa
* **winner-computation-env-independent**: fai una funzione che decide il vincitore al contrario.
* **wrong-preimage-reverts-\***: puoi pagare per farti accettare la preimmagine

Quindi per comodità mia mi segno: che versioni fare e dove saranno false:
* Nella prima non fa proprio il check, nella seconda non fa il check se il chiamate è il proprietario
	- **redeem-before-deadline-reverts-nojoin1**: v24 v27
	- **redeem-before-deadline-reverts-noreveal0**: v25 v28
	- **redeem-before-deadline-reverts-noreveal1**: v26 v29
	- **reveal0-reverts-after-deadline**: (v21) v30
	- **reveal1-reverts-after-deadline**: (v22) v31
- Al contrario:
	- **winner-computation-env-independent** (P): v32
- Method can be bribed:
	- **wrong-preimage-reverts-p0**: v33
	- **wrong-preimage-reverts-p1**: v34

Come mi aspettavo, v32 fallisce con SolCMC ma passa con Certora.

Vediamo i risultati:

Ok molto strano. v26 ha FP su Certora, a questo punto ho il dubbio di averla fatta male. E anche gli ultimi due, probabilmente perché assumono che il valore del messaggio debba essere nullo.

SolCMC invece. v26 ha di nuovo FP, quindi immagino di aver sbagliato davvero. Winner computation FN come ci aspettiamo. Il resto è giusto, incluse le ultime due.

Vediamo v26. Esatto era sbagliata. E ora è giustamente falsa.

La cosa strana è che quelle delle preimmagini non assumono che il messaggio non sia pagato. Non capisco. Per niente. Credo che sia un problema con l'hashing con Certora. Non me l'aspettavo per niente. Non pensavo che quel problema si applicasse anche qui. E non so come risolvere, non credo ci sia un modo.

CHE FIGO. Il problema è che prima chiama `hashing()` per sapere l'hash, e poi chiama `reveal()`. Chiamare `reveal()` pagando è il controesempio che vïola la proprietà, ma per come è scritto il test, se paghi `reveal()` pagando chiami anche `hashing()` pagando, ma `hashing()` non è pagabile. **`hashing()` ha un requisito di non-pagabilità implicito.** Quindi devo chiamarle da due ambienti diversi. E così funziona.

A che punto siamo.

* **honest-player-profitability-\*** ne mancano due basta fare copia incolla
* **no-incentive-to-abort-\*** mancano ma sono facili
* **deadlock-\*-witness-eoa** mancano ma sono facili
* no ma ne mancano letteralmente alcuni caso

Faccio prima a guardare gli ND

* **deadlock-freedom-\*-witness-eoa**: variazione EOA di quelli esistenti
* **honest-player-profitability-eoa-redeem\*-noreveal\***: variazione dell'altro (vedere se ho definito bene il pot)
* **no-incentives-to-abort-\*-eoa**: facile facile

Visto che finalmente ce n'è una carina, vediamo come faccio **no-incentives-to-abort-eoa**. Devo controllare il comportamento di un metodo qualsiasi chiamato subito dopo `reveal0`. Faccio una variabile ghost booleana che di default è falsa. Viene messa vera alla fine di `reveal0`, e viene messa falsa alla fine di tutti gli altri metodi. Questo significa che se un metodo viene eseguito con quella variabile vera all'inizio della sua esecuzione, `reveal0` è il metodo immediatamente precedente. Tra l'altro, è un $\exists$, quindi negate.

Veramente questo tool è una merda. Perché non hai un coso che mi permette di fare una postghost che si applica a tutti metodi? O a tutti i metodi pagabili o cose così? Non ha senso.

Interessante che se non posso mettere preghost e postghost che modificano lo stato a metodi `view`, ha senso. Anche `pure`.

Di nuovo il problema: anziché mettere tante assert, metto una variabile che asserisco una sola volta, ma aggiorno dove voglio.

win transaction env idndododnodn esce N su v1 ciao a domani ciao basta.

---

Vediamo perché. Il test in sé è strano. Chiama `compute_winner` prima di `win` e poi controlla che il vincitore di `win` sia lo stesso calcolato prima.

Ok perfetto il test fa schifo. È cortissimo ma guarda:

```Solidity
assert(winner == expectedWinner);
assert(address(this).balance == 0);
assert(_contract_balance_before == 0 || winner == expectedWinner);
```

Immagino che l'assert fallito sia il primo.

Vediamo la funzione `win`. Richiede lo stato `Win`, assegna `winner`, paga `winner`, porta lo stato a `End`.

Ok l'assert che fallisce è la seconda. Roba di `selfdestruct` perché è rientrante immagino. È richiesto dalla proprietà?

> Two non-reverting `win` transactions performed from equal contract state always yield the same winning player.

No. Bene lo tolgo e ora passa. Il test è comunque sbagliato perché in SolCMC non possiamo confrontare due ambienti.

Ci sono un po' di falsi negativi. 7 8 9 10 14. Vediamoli:

* 7 8 9 10: Un metodo non controlla lo stato. Una chiamata rientrante a quel metodo permette di cambiare il vincitore durante l'esecuzione di `win`.
* 14: Il proprietario ha una variante del metodo `win` che gli permette di decidere il vincitore. Una chiamata rientrante a quel metodo permette di cambiare il vincitore durante l'esecuzione di `win`.

E ti direi che potrebbe significare che la proprietà non vale per queste versioni. Perché se io chiamo `win` due volte partendo dallo stesso stato, ma in un caso c'è la chiamata rientrante e nell'altro no, allora sono due chiamate a `win` dallo stesso stato che risultano in due vincitori diversi. Non so.

Non sono ben definiti "state" e "from". Però ti direi che "state" è lo storage (lo stato è status), l'insieme delle variabili, e "from" è "al momento della chiamata". E quindi ti direi che sì, anche se al momento della chiamata lo stato è uguale, una chiamata rientrante *durante* l'esecuzione di `win`può decidere il vincitore. E direi che cambio la ground truth. E mi sembra che Certora non modelli le chiamate rientranti.

Provo a fare una versione di v14 non rientrante. Infatti funziona.

Adesso, situazione considerando solo i falsi su v1:

* **deadlock-freedom-\*(-witness)-eoa**
* **redeem0-noreveal1-fairness-eoa**
* **win-pays-fair-winner-eoa**

Tutti falsi in cui il problema è che SolCMC non modella gli EOA e quindi modella il caso in cui il destinatario redirige il pagamento.

Aspetta, c'è `FND` e c'è `TND`. Come? v14 ha `TND` su **owner-impartiality-eoa**. E rimane se rieseguo il test. Ok `FND` se deve essere vera. Forse perché interpreta la `N` come un negativo. Ancora una volta strani problemi.

Per il resto non credo ci siano problemi risolvibili.

Poi c'è Certora. Ha il problema opposto a quanto pare, assume che le chiamate esterne vadano a buon fine anche se non si specifica che il destinatario è un EOA. Però è strano, **deadlock-freedom-\*-witness** hanno TN. La modifica è la stessa delle altre versioni EOA. Ed è FN anche **deadlock-freedom-win-witness-eoa**. Da testare.

**owner-impartiality-eoa** è da vedere, FN. A me il test sembra giusto.

> Assuming `player0` and `player1` are EOAs: in any state where ==🔴the winner is not yet determined==, for every transaction whose ==🟠sender is neither `player0` nor `player1`==; if such transaction ==🟢changes the contract storage==, then ==🔵the same transaction (except for `msg.sender`)==, made by any EOA, in the same state, ==🟣must produce the same state modifications==.

Cosa fa il test:

* L'indirizzo `addr` è definito e non è il contratto e ==🟠non è un giocatore==.
* I giocatori sono definiti e non sono il contratto e sono diversi.
* Nell'ambiente `e1` ==🟠il mittente è `addr`==.
* Nell'ambiente `e2` il mittente è definito e non è `addr` o un giocatore o un contratto, ==🔵il resto è uguale a `e1`==.
* ==🔴Il vincitore non è definito==.
* Chiama un metodo ==🔵nelle stesse condizioni== in `e1` e in `e2`.
* Considera lo stato cambiato se è cambiato uno tra:
	* Lo status;
	* La scommessa;
	* I segreti o le loro hash;
	* Le deadline;
	* Il vincitore;
	* Il bilancio del contratto.
* Asserisce che ==🟢se lo stato è cambiato in `e1`==, ==🟣allora è cambiato anche in `e2`== (e la funzione non ha revertito).

Ci sono dei problemi. Non controlla che il mittente di `e2` sia un EOA, ma in teoria non cambia perché i giocatori sono definiti. Non controlla che le modifiche allo stato siano **le stesse**, però questo dovrebbe produrre falsi positivi.

Un falso negativo si ha quando non ci sono abbastanza requisiti e quando ci sono troppe asserzioni. È strano che asserisca che la funzione non ha revertito.

Ok, probabilmente Certora non si rende conto che in v1 se i giocatori sono definiti allora non tutti gli status del contratto sono possibili.

Per ora scrivo un commento nella spec, poi sarà da testare con assert diverse. E poi la devo comunque modificare perché tecnicamente non fa quello che dice la descrizione.

Un altro falso con Certora è **win-pays-fair-winner-eoa**. Ok problema dello stato raggiungibile. **win-transaction-env-independent** dà FP adesso su v10 perché non considera la rientranza (detto che dal nome mi sembra che la definizione intendesse qualcosa di diverso).

Devo rileggere gli appunti di oggi perché questa insieme a un'altra cosa che non ricordo andrebbe chiesta a Bartoletti.

Ci sono volute quasi tre ore e mezza ma ho eseguito tutti i tests SolCMC con Z3 ed Eldarica.

Riprendo la tabella.

Metto un $\bigstar$ dove il problema è dovuto al fatto che SolCMC non rileva gli EOA.

| Proprietà                                             | Gruppo                                                                                                                                                                                                                                                                                                                                             | Situazione                                                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **deadlock-freedom-join1**(-eoa)                      | Nello stato `___`, se il contratto ha soldi, la prossima transazione può essere una transazione che svuota il bilancio.                                                                                                                                                                                                                            | ==🟡FN per gli EOA $\bigstar$.<br>FN su v14, v18, v23, v35 $\bigstar$.==                                       |
| **deadlock-freedom-reveal0**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **deadlock-freedom-reveal1**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **deadlock-freedom-win**(-eoa)                        | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **deadlock-freedom-join1-witness**(-eoa)              | Dopo la chiamata al metodo `___` che non reverta, il contratto non ha soldi.                                                                                                                                                                                                                                                                       | ==🟡FN per gli EOA $\bigstar$.<br>FN su v23 $\bigstar$.==<br>==🔴FP su v16 v17 (non lo so).==<br>              |
| **deadlock-freedom-reveal0-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **deadlock-freedom-reveal1-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **deadlock-freedom-win-witness**(-eoa)                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **honest-player-profitability-eoa-redeem0-nojoin1**   | Gioc. EOA, in uno stato `___` raggiungibile, dopo la scadenza di quello stato, chiunque può chiamare un metodo che non reverta, che aumenta ($>0$) il bilancio di `___` di esattamente \_\_\_, svuota il bilancio del contratto, e porta lo stato ad `End`.                                                                                        | ==🔴FP sulle versioni che non fanno altro che sbagliare questa proprietà, da rivedere il test che fa schifo.== |
| **honest-player-profitability-eoa-redeem0-noreveal1** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **honest-player-profitability-eoa-redeem1-noreveal0** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **no-incentives-to-abort-eoa**                        | Gioc. EOA, dopo una transazione `reveal0` che non reverta, la prossima transazione può essere `___` e dare i soldi in gioco a `player0`.                                                                                                                                                                                                           | ==🔴FP su v4, v6, v16. Non ne ho idea.==                                                                       |
| **no-incentives-to-abort-witness-eoa**                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **owner-impartiality-eoa**                            | Gioc. EOA, in qualunque stato in cui il giocatore non è determinato, per ogni transazione il cui mittente non è un giocatore, se questa transazione cambia lo storage del contratto, allora una transazione identica di cui cambia solo il mittente, per qualunque mittente EOA, nello stesso stato, deve produrre le stesse modifiche allo stato. | ==🟢Non si può==                                                                                               |
| **player1-should-match-bet**                          | Se una transazione `join1` non reverta, allora `msg.value` è lo stesso della scommessa di `player0`.                                                                                                                                                                                                                                               | ==🟢Tutto ok==                                                                                                 |
| **redeem-before-deadline-reverts-nojoin1**            | Una transazione `___` reverta se il timestamp è $\leq$ `___`.                                                                                                                                                                                                                                                                                      | ==🟢Tutto ok==                                                                                                 |
| **redeem-before-deadline-reverts-noreveal0**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **redeem-before-deadline-reverts-noreveal1**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **redeem0-noreveal1-fairness-eoa**                    | Gioc. EOA, se lo stato è `Reveal1`, se `compute_winner()` si valuta a `player0`, allora una `redeem0_noreveal1()` che non reverta aumenta ($>0$) il bilancio di `player0`, non cambia il bilancio di `player1`, e diminuisce ($>0$) il bilancio del contratto.                                                                                     | ==🟡Tutto FN $\bigstar$==                                                                                      |
| **reveal0-reverts-after-deadline**                    | Una transazione `___` reverta dopo `___`.                                                                                                                                                                                                                                                                                                          | ==🟢Tutto ok==                                                                                                 |
| **reveal1-reverts-after-deadline**                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
| **status-irreversible**                               | Le transizioni di stato vanno in ordine:`Join0` < `Join1` < `Reveal0` < `Reveal1` < `Win` < `End`.                                                                                                                                                                                                                                                 | ==🟢Tutto ok==                                                                                                 |
| **win-pays-fair-winner-eoa**                          | Gioc. EOA, in uno stato `Win` raggiungibile, una transazione `win()` che non reverta deve dare al giocatore restituito da `compute_winner()` tutti i soldi in gioco.                                                                                                                                                                               | ==🟡Tutto FN $\bigstar$==                                                                                      |
| **win-transaction-env-independent**                   | Due transazioni `win()` che non revertano che partono dallo stesso stato del contratto dovrebbero avere lo stesso vincitore.                                                                                                                                                                                                                       | ==🟢Tutto ok== ==🟡(ma credo falsificabile, è fatto male)==                                                    |
| **winner-computation-env-independent**                | Con gli stessi input, la funzione di vittoria dà lo stesso output a prescindere dall'env.                                                                                                                                                                                                                                                          | ==🟢Eh== (impossibile da fare correttamente, per coincidenza quasi tutto giusto)                               |
| **wrong-preimage-reverts-p0**                         | Se una transazione `___(s)` non reverta, allora `s` è la preimmagine dell'hash committata da `___`.                                                                                                                                                                                                                                                | ==🟢Tutto ok==                                                                                                 |
| **wrong-preimage-reverts-p1**                         | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                                                              |
Quindi cosa devo fare davvero:
* **Deadlock**: v16 v17
* **Honest**: Radere al suolo e rifare da zero
* **No-incentives**: Da vedere con attenzione
* **win-transaction-env-independent**: Scrivere una versione che la falsifichi

Per fare l'ultima, basta fare una versione in cui il calcolo del vincitore è non-rientrante (da fuori) e non usa l'ambiente nella formula (mittente, origine, blocco, valore). Però ogni volta che viene chiamato inverte il risultato preso la prossima volta. In questo modo ahhh no. Ah no. No, non può cambiare. No aspetta, all'inizio di `win` posso impostare una variabile che inverte il risultato. Così ogni volta che chiami `win` si comporta allo stesso modo, e il contratto usa `compute_winner` solo dentro `win`, ma se la funzione viene chiamata da fuori, allora è invertita.

È molto contorto. No è tutto inutile. È stato tutto inutile. Ah no aspetta. È perché si rompe con la rientranza. Non so se serve a qualcosa onestamente. Tutto inutile in realtà. La tengo, ma essenzialmente il modo in cui funziona SolCMC e in cui è scritto il test fa sì che reverti sempre (sta chiamando `compute_winner` da dentro `win`).

Bene falsificato.

---

Deadlock. Nelle versioni 16 e 17, `reveal0` e `reveal1` non aggiornano lo stato. Danno FP su **deadlock-freedom-win-witness**. v16 lo dà anche su **deadlock-freedom-reveal1-witness**.

Ok semplicemente è perché non esiste una chiamata a **win** che non reverta, quindi la proprietà è vacuamente vera. Quindi va corretta la ground truth, se la logica non è un'opinione.

Incentivi. In v4 `redeem0_noreveal1` paga la metà di quanto dovrebbe. In v6 paga il giocatore sbagliato. v16 è sempre lei. Incomprensibile. Davvero. Se questo test esce AHHHH. Se questo test esce positivo, esiste almeno un caso positivo. Devo controllare che la bet non sia $0$. E anzi che sia maggiore di $1$ per evitare il troncamento credo. È ancora positivo.

E com'è possibile. Il test mi sembra giusto. No non lo so, non ne ho idea. Andrebbe rifatto da capo.

Honest coso è orrendo allo stesso modo e voglio rifarlo.