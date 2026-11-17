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

| Proprietà                                             | Gruppo                                                                                                                                                                                                                                                                                                                                             | Situazione                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **deadlock-freedom-join1**(-eoa)                      | Nello stato `___`, se il contratto ha soldi, la prossima transazione può essere una transazione che svuota il bilancio.                                                                                                                                                                                                                            | Dà tutto negativo, la rilevazione degli EOA non funziona.<br>FNv14v18v23. |
| **deadlock-freedom-reveal0**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **deadlock-freedom-reveal1**(-eoa)                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **deadlock-freedom-win**(-eoa)                        | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **deadlock-freedom-join1-witness**(-eoa)              | Dopo la chiamata al metodo `___` che non reverta, il contratto non ha soldi.                                                                                                                                                                                                                                                                       | Versione EOA non presente. Tutto negativo.<br>FNv23.                      |
| **deadlock-freedom-reveal0-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **deadlock-freedom-reveal1-witness**(-eoa)            | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **deadlock-freedom-win-witness**(-eoa)                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **honest-player-profitability-eoa-redeem0-nojoin1**   | Gioc. EOA, in uno stato `___` raggiungibile, dopo la scadenza di quello stato, chiunque può chiamare un metodo che non reverta, che aumenta ($>0$) il bilancio di `___` di esattamente \_\_\_, svuota il bilancio del contratto, e porta lo stato ad `End`.                                                                                        | ND                                                                        |
| **honest-player-profitability-eoa-redeem0-noreveal1** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **honest-player-profitability-eoa-redeem1-noreveal0** | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **no-incentives-to-abort-eoa**                        | Gioc. EOA, dopo una transazione `reveal0` che non reverta, la prossima transazione può essere `___` e dare i soldi in gioco a `player0`.                                                                                                                                                                                                           | ND                                                                        |
| **no-incentives-to-abort-witness-eoa**                | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **owner-impartiality-eoa**                            | Gioc. EOA, in qualunque stato in cui il giocatore non è determinato, per ogni transazione il cui mittente non è un giocatore, se questa transazione cambia lo storage del contratto, allora una transazione identica di cui cambia solo il mittente, per qualunque mittente EOA, nello stesso stato, deve produrre le stesse modifiche allo stato. | ==🔴ND e impossibile (forse uso `nondef`)==                               |
| **player1-should-match-bet**                          | Se una transazione `join1` non reverta, allora `msg.value` è lo stesso della scommessa di `player0`.                                                                                                                                                                                                                                               | ==🟢**Tutto ok**==                                                        |
| **redeem-before-deadline-reverts-nojoin1**            | Una transazione `___` reverta se il timestamp è $\leq$ `___`.                                                                                                                                                                                                                                                                                      | ==🟢**Tutto ok**== (fare più versioni)                                    |
| **redeem-before-deadline-reverts-noreveal0**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **redeem-before-deadline-reverts-noreveal1**          | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **redeem0-noreveal1-fairness-eoa**                    | Gioc. EOA, se lo stato è `Reveal1`, se `compute_winner()` si valuta a `player0`, allora una `redeem0_noreveal1()` che non reverta aumenta ($>0$) il bilancio di `player0`, non cambia il bilancio di `player1`, e diminuisce ($>0$) il bilancio del contratto.                                                                                     | Tutto negativo (probabilmente problema EOA).                              |
| **reveal0-reverts-after-deadline**                    | Una transazione `___` reverta dopo `___`.                                                                                                                                                                                                                                                                                                          | ==🟢**Tutto ok**== (fare più versioni)                                    |
| **reveal1-reverts-after-deadline**                    | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
| **status-irreversible**                               | Le transizioni di stato vanno in ordine:`Join0` < `Join1` < `Reveal0` < `Reveal1` < `Win` < `End`.                                                                                                                                                                                                                                                 | UNK                                                                       |
| **win-pays-fair-winner-eoa**                          | Gioc. EOA, in uno stato `Win` raggiungibile, una transazione `win()` che non reverta deve dare al giocatore restituito da `compute_winner()` tutti i soldi in gioco.                                                                                                                                                                               | ND                                                                        |
| **win-transaction-env-independent**                   | Due transazioni `win()` che non revertano che partono dallo stesso stato del contratto dovrebbero avere lo stesso vincitore.                                                                                                                                                                                                                       | UNK                                                                       |
| **winner-computation-env-independent**                | Con gli stessi input, la funzione di vittoria dà lo stesso output a prescindere dall'env.                                                                                                                                                                                                                                                          | ==🟡**Tutto ok**== ma so come falsificarlo                                |
| **wrong-preimage-reverts-p0**                         | Se una transazione `___(s)` non reverta, allora `s` è la preimmagine dell'hash committata da `___`.                                                                                                                                                                                                                                                | ==🟢**Tutto ok**== (fare più versioni)                                    |
| **wrong-preimage-reverts-p1**                         | ^                                                                                                                                                                                                                                                                                                                                                  | ^                                                                         |
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

Io non vedo nessun altro contratto usare `/// @custom:nondef`. Vedo che nel readme scrive `FND`.