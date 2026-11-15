---
cssclasses:
  - r54
---
#hidden

## Cos'ho capito

Ogni contratto ha delle proprietà che devono valere. Queste di base sono scritte in linguaggio naturale (scritto in modo preciso perché un tempo erano più concise ma ambigue).

Nel readme generale c'è una lista di contratti (detti casi d'uso). Quelli segnati con ✅ sono quelli che adesso sono fatti correttamente (per esempio bank). Gli altri sono da aggiustare.

Ogni contratto ha diverse versioni (tipo 10 20). Molte sono sbagliate, quindi non rispettano le specifiche (proprietà) del linguaggio. Quello che dobbiamo fare non è correggerli, non ci interessano i contratti. Quello che ci interessa sono i tool di verifica: noi vogliamo controllare che i tool di verifica verifichino correttamente la correttezza dei contratti. Appunto la repo si chiama "benchmark", stiamo benchmarkando i tool di verifica.

Quindi dovrò anche scrivere delle implementazioni di escrow sbagliate, ma sbagliate in modo subdolo e difficile da cogliere, così che fallisca solo in casi estremamente specifici.

I tool di verifica hanno delle limitazioni espressive. Quindi può succedere che un tool dia positivo ma che in realtà sia negativo (falso positivo), per questo usiamo più tool.

Come facciamo a dimostrare che un contratto è corretto? È corretto quando funziona correttamente con tutti gli input. Questo però è un $\forall$, notoriamente difficile da dimostrare. Invece per dimostrare l'incorrettezza basta un singolo controesempio, $\exists$. Quello che ci interessa è scrivere controesempi.

Foundry è un tool di fuzzing che trova controesempi. Non mi pare abbia menzionato Foundry a me nello specifico però ora che ci penso, c'è nella repo e mi sono informato su cos'è ma mi pare che io debba usare solo Certora e Solcmc.

Il readme di ciascun contratto è generato automaticamente da Makefile e io non lo devo toccare. È generato sulla base del codice, infatti ci sono dei commenti segnati con `//@custom` che poi vengono riportati nel readme.

## Quindi allora

Prendiamo per esempio Escrow, che è quello che mi ha assegnato per ora proprio perché è vecchio e semplice.



La prossima cosa che dovrò capire saranno i test relativi a queste proprietà fatti con Certora e SolCMC.

## La prossima volta

Inferno.

Dà tutto errore e sto litigando con le versioni dei tool perché non si capisce niente, poi faccio cose non cambio niente e all'improvviso funziona.

Però una cosa si blocca per molto tempo e non so bene cosa pensare. Ma almeno adesso un test gira e i risultati sono gli stessi che ci sono nella repo.

## Crowdfund



## Litigando con Certora

Il fatto è che mi sa che il tool è sbagliato, perché è cambiato l'output di Certora. Ma questo è strano, perché un tale dal nome utente LoadWrench l'ha usato di recente e ha funzionato.

Magari me ne farò una ragione.

La cosa brutta è che un ambiente di Solidity ha una sorta di variabile globale `timestamp`, di tipo `uint64`, ma Certora lo testa con `uint256`, quindi possono esserci problemi di overflow, soprattuto coi confronti (dice che $x>y$, ma $x>2^{64}$ quindi una volta troncato la prima disuguaglianza non vale più).

E poi c'è tutto il problema del troncamento degli interi che rende tutto una merda. E quindi sai che faccio, guarda tu, ripesco il trick che usavamo con assembly e moltiplico entrambi i lati dell'equazione per il denominatore. Che è l'opposto di quello che facciamo con CSMN, dove vogliamo numeri bassi perché lavoriamo coi float.

## HTLC



# Allora (18 ottobre)

Avendo installato correttamente Certora, direi che è il momento di fare le cose per bene. Ho aggiustato Escrow al meglio delle mie abilità, oggi Crowdfund.



Non ho ancora cominciato a "fregare il tool" ed è passato esattamente un mese (su quattro e mezzo).

### Il 19 ottobre



Ma mi sa che semplicemente Crowdfund è troppo difficile per me ora.

Lottery ha tanta tanta tanta tanta roba, ma potrebbe essere interessante. No ma figo eh, `ERROR:root:Missing owner-impartiality-eoa-v23 ground truth.`, e io che ne so. Dai magari magari riesco a metterci mano. E tra l'altro è l'unico decente, sembra.

Ah no semplicemente hanno lasciato i risultati del test di v23 e v24 ma non v23 e v24 stessi.

#### Venti Ottobre



### 21 ottobre

Ora che l'ho fatto, v3 non passa arbitrate send. Ah ma è giusto, ha ragione lui.

Devo poi aggiustare la didascalia di v3 e derivati.

Ehhhh... E mi sa che non c'è altro da fare. Sì ok no vedo che devo aggiungere le didascalie ok. Ma il codice in sé mi sembra finito. A meno che non voglia fare altre versioni ancora. E domani lascio il computer qui a girare test.

Fatto ciò, passerei agli altri contratti. Direi che aggiusto Crowdfund.

Anzi no ho pensato a una versione che reverta qualunque cosa tu faccia.

...

...

Ho sconfitto il computer?

```
ERROR:root:WARNING: 'wait_for_results' has no effect in local tool runs
WARNING: Build cache is used with a local certora-cli script version. Beware of false hits and unexpected behaviors!
Start Wed Oct 21 23:47:05 CEST 2026
The scene contains 1 contracts:
Escrow : 0xce4604a0000000000000000000000001
Running initial transformations
Has CVL checks.
Checking CVL certora/recipient-buyer-or-seller.spec for contract Escrow
Unrolling loops 1 time, unwinding condition is asserted
Error: Got exception Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule recipient_buyer_or_seller
Failed to compile rule recipient_buyer_or_seller due to utils.CertoraException: Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help.
Error: Timed out waiting for background tasks:
    
Done 0m
Compiling versions/Escrow_v15.sol...
Compiling versions/Escrow_v15.sol to expose internal function information and local variables...
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_10_21_23_46_59_148975e662
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_10_21_23_46_59_148975e662" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Got exception Could not compile access to contract storage currentContract.recipient @ recipient-buyer-or-seller.spec:18:12 due to missing context information. This is likely caused by failures elsewhere in the tool; please check the Global Problems view and contact Certora for help. when compiling rule recipient_buyer_or_seller
CRITICAL: [ForkJoinPool-1-worker-1] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

Non lo so. Credo sia semplicemente perché la variabile non è inizializzata? Ma dovrebbe esserlo a `0x0`, boh.

E se............... Io sono qui per testare i limiti dei tool. E ci devo fare la tesi. E adesso sto proprio capendo le basi di logica formale dietro questi limiti. E se tipo la tesi su questo?

### 22 ottobre vesting wallet

5exrctvbuiomp,è.











##### 23 ott



per vedere eoa, tx.origin == msg.sender




### 24 ottobre



Per testare che v8 di non ricordo cosa reverta quando non dovrebbe, metti assert false e ///invert.

Tornando a Vesting Wallet, 

Per Crowdfund, non so cosa fare dopo, ci penserò domani.

###### 26 ottobre

Niente, non ho capito bene cosa fare con Crowdfund, c'è troppa roba.

Ho provato a usare `/// @custom:negate` per rilevare le revert con SolCMC. Il fatto è che, e proverò a scriverlo in logica formale per ragionarci bene, sono veri i seguenti:$$\begin{matrix*}[l]
\vdash \lnot \exists\ \text{assert}(false) \Rightarrow P \\
\vdash \exists\ \text{assert}(false) \Rightarrow N \\
\text{negate} \vdash \lnot \exists\ \text{assert}(false) \Rightarrow N \\
\text{negate} \vdash \exists\ \text{assert}(false) \Rightarrow P
\end{matrix*}$$
Però è scritto malissimo non lo so fare mi arrendo.

Insomma, il fatto è che, di base, se esiste un caso in cui si può fare `assert(false)` e non c'è una revert, allora quel singolo caso rende l'intero test falso. Con negate, il contrario, un singolo caso che passa fa passare l'intero test. Perché la negazione viene applicata dopo.

Essenzialmente quello normale è $\land$, negate è $\lnot \land$, io voglio $\land \lnot$, che non sembra possibile, quindi mi arrendo.



## 30 ottobre 2026

Non ho fatto niente in aereo


### Altro

Avevo lavorato a Bet prima di correggere l'installazione di Certora, quindi devo rieseguire i test. (A questo punto per la PR controllo anche quello). Perché lì ho messo la quantità giusta di versioni credo (ogni proprietà è falsa in almeno una versione).

Ci sono dei test che danno ERR perché i metodi hanno parametri formali diversi da quelli di v1, quindi quei test sono da rieseguire prima della PR.

E poi devo controllare tutti i commenti dappertutto.

Quindi per ora avrei "aggiustato" 4 contratti. E vedo che Bank comunque ha 167 falsi e 656 veri, quindi sembra che avere molti falsi vada comunque bene.

Quindi più tardi faccio Bet.

### Bet

Noto che ho sempre dimenticato di mettere `view` alle invarianti. Da aggiustare. Inoltre c'è da mettere la licenza come su Bank, e usare solo `//` e non `///` per scrivere le regole nelle spec. E c'è anche da controllare che le ground truth abbiano i commenti.



## 31 ottobre



No ok non so bene cosa fare ora quindi lavoro su HTLC.

### 1 Novembre



Fatto questo contratto, se tutto va bene, avrò aggiustato 5 contratti su 12 che dovevo fare.

Quelli dopo che farei sono Lottery, Social Recovery Wallet, Deposit e Deposit.

E dopo rimarrebbe Zerotoken Bank, che è il grande boss. Insieme a Call Wrapper che mi sembra stranamente semplice e mi fa paura, AMM che mi faceva paura un tempo e non so perché, e basta...?

Diciamo mezzo mese per capire il tirocinio, un mesetto per fare cinque contratti, quindi mi aspettano un mesetto per altri quattro contratti, e due mesi per gli ultimi tre strani.


### 2 novm

Sto per finire anche l'ultimo contratto, devo pensare a cosa devo chiedere a Bartoletti.

* Definizione di strictly increasing e lineare per Vesting Wallet
* No receive after deadline mal definita
* Deadlock definito formalmente in modo che non corrisponde a una nozione normale di deadlock, e qualcosa con v6 (non capisco i miei appunti, da rivedere)
* Non c'entra ma donate-not-dec-donation è da rivedere

Ah ok sono davvero poche cose.



> Making the accounting ghosts persistent should address the havoc-related cases; the invariant will also need a condition relating the ghost values to the contract’s commit state

Grazie Copilot non so che farmene, addio basta.

### 3 nov

Cosa devo scrivere quindi al professore?

HTLC:
* **reveal-timeout-after-isCommitted**: "`reveal()` and `timeout()` can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato "committed" prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?

Vesting Wallet:
* **rel-strict-incr**: "\[...\] the releasable amount is strictly increasing \[...\]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
* **rel-grows-linear**: "releasable grows linearly \[...\]: two successful consequent calls to `releasable` differ by c\*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?

Crowdfund:
* Deadlock definito formalmente in modo che non corrisponde a una nozione normale di deadlock, e qualcosa con v6 (non capisco i miei appunti, da rivedere)
* **no-deadlock** "at least one of the main functions (donate, withdraw, reclaim) must not revert if the contract has a balance and the caller has made a donation." - 
* No aspetta non ho capito che problema c'è con questa. Ok è una definizione strana di deadlock (non lo considererei deadlock se l'owner può sbloccare il contratto) ma non sono fatti miei.

**donate-not-dec-donation** devo controllarlo io.

Mi ero segnato anche di controllare **no-receive-after-deadline** ma mi sembra vada bene.



Quindi ok, sono solo quelle tre proprietà. E che problema c'è?

Quindi è questo:

> Buongiorno, ho dubbi sull'interpretazione di alcune proprietà.
> 
> HTLC:
> * **reveal-timeout-after-isCommitted**: "`reveal()` and `timeout()` can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato committed prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?
> 
> Vesting Wallet:
> * **rel-strict-incr**: "\[...\] the releasable amount is strictly increasing \[...\]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
> * **rel-grows-linear**: "releasable grows linearly \[...\]: two successful consequent calls to `releasable` differ by c\*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?

O, in plain text:

```Text
Buongiorno, ho dubbi sull'interpretazione di alcune proprietà.

HTLC:
- reveal-timeout-after-isCommitted: "reveal() and timeout() can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato committed prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?

Vesting Wallet:
- rel-strict-incr: "[...] the releasable amount is strictly increasing [...]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
- rel-grows-linear: "releasable grows linearly [...]: two successful consequent calls to releasable differ by c*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?
```

E niente, poi lo mando.

Adesso direi che quello che rimane da fare è eseguire tutti i test e scrivere i commenti nella ground truth. E magari capire se posso controllare i not-revert con SolCMC perché ho visto un trick carino fatto coi postghost e assert(false).

E mi ha detto che lo studio dei linguaggi e dei tool conta come tempo del tirocinio, quindi dopo aver finito questi cinque contratti e prima di cominciare i prossimi, posso mettere in ordine questi appunti perché sono talmente lunghi che diventa difficile rileggerli. Visto che ci sono anche informazioni false in mezzo.


Quindi, i contratti su cui ho lavorato sono Crowdfund, Escrow, HTLC, Vesting Wallet, e Bet Tokenless. Tengo i loro readme aperti così vedo che test eseguire.



Ho capito che gli altri contratti li testo con z3 a 30 secondi e poi con eldarica per farlo davvero.

Per risolvere il problema delle versioni che hanno metodi nuovi che da SolCMC non sono visibili, ho provato a usare preghost e postghost, ma non funziona.

```Solidity
/// @custom:ghost
address user;

/// @custom:preghost function donate
uint donation_prev = donation[user];
/// @custom:postghost function donate
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

/// @custom:preghost function withdraw
uint donation_prev = donation[user];
/// @custom:postghost function withdraw
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

/// @custom:preghost function reclaim
uint donation_prev = donation[user];
/// @custom:postghost function reclaim
uint donation_next = donation[user];
assert (donation_next >= donation_prev || msg.sender);

/// @custom:preghost function clawback
uint donation_prev = donation[user];
/// @custom:postghost function clawback
uint donation_next = donation[user];
assert (donation_next >= donation_prev);

function invariant(address _user) public payable {
    user = _user;
}
```

```log
ERROR:root:Preghost injection failed: ../contracts/crowdfund/solcmc/donation-dec-onlyif-reclaim.sol: ../contracts/crowdfund/versions/Crowdfund_v14.sol: function clawback.
```

..........

Hai presente quando ho messo view a tutto? Ecco c'era un motivo se non c'era.

```log
   |
82 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v14.sol:84:13:
   |
84 |             redeem();
   |             ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v13.sol:78:9:
   |
78 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v13.sol:78:9:
   |
78 |         redeem();
   |         ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:69:13:
   |
69 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:71:13:
   |
71 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:73:13:
   |
73 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:75:13:
   |
75 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:77:13:
   |
77 |             redeem();
   |             ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:69:13:
   |
69 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:71:13:
   |
71 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:73:13:
   |
73 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:75:13:
   |
75 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-agree_v11.sol:77:13:
   |
77 |             redeem();
   |             ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v1.sol:75:9:
   |
75 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v1.sol:75:9:
   |
75 |         redeem();
   |         ^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:71:24:
   |
71 |     function invariant(uint f) public view {
   |                        ^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:78:9:
   |
78 |         open_dispute();
   |         ^^^^^^^^^^^^^^


ERROR:root:Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:71:24:
   |
71 |     function invariant(uint f) public view {
   |                        ^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_dispute-if-agree_v6.sol:78:9:
   |
78 |         open_dispute();
   |         ^^^^^^^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v10.sol:77:9:
   |
77 |         redeem();
   |         ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_redeem-send_v10.sol:77:9:
   |
77 |         redeem();
   |         ^^^^^^^^


Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:74:13:
   |
74 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:76:13:
   |
76 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:78:13:
   |
78 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:80:13:
   |
80 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:82:13:
   |
82 |             redeem();
   |             ^^^^^^^^


ERROR:root:Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:74:13:
   |
74 |             approve_payment();
   |             ^^^^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:76:13:
   |
76 |             refund();
   |             ^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:78:13:
   |
78 |             open_dispute();
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:80:13:
   |
80 |             arbitrate(dst);
   |             ^^^^^^^^^^^^^^

Error: Function cannot be declared as view because this expression (potentially) modifies the state.
  --> /home/eic/Documents/Uni/git/contracts-verification-benchmark/contracts/escrow/solcmc/build/contracts/Escrow_auth-in-dispute_v4.sol:82:13:
   |
82 |             redeem();
   |             ^^^^^^^^
```

Ok ho aggiustato anche le ground truth. C'è un record su cui non sono sicuro, ma in caso se ne occuperà il mio successore.

Ah ma sai che vedendo bene tutto. Nel readme ci sono molti meno contratti che nel progetto intero. Io vedo che Safe ha quasi 2000 righe di codice Solidity, e non credo proprio sia al pari con le specifiche. Io spero di non doverlo toccare. Ha 55 proprietà. Eh?

> NOTE: this file is called ground-truth.csv only for script compatibility, but it DOES NOT REPRESENT the ground truths of the properties, which cannot be reliably determined for this contract. The third entries should hence not be taken into consideration.

Cosa significa... Cioè, è talmente complesso che non lo sanno neanche loro come funziona? Quindi di sicuro non lo devo toccare, ok.

Le altre che non sono nella lista sono Infinifi, Silo Core, e Template (ma va'). Infinifi ha 2411 righe di codice, è bruttissimo, e ha lo stesso warning di Safe. Silo Core ha 7148 righe!!!!!!!!!!!!!!!!!! Ha una sola proprietà. E vedo una cosa bellissima. Ha due versioni. Una è `SiloCore_v1.sol`. L'altra si chiama `Silo_forsev2bohcheck.sol` ed è completamente diversa.

Quindi posso tranquillamente ignorare quelle cose.

Tra l'altro vedo che Bank, che è ciò che devo prendere come esempio, è semplicissimo. Ha 9 righe di corpo vero e proprio. È letteralmente "mi mandi soldi, me lo segno, rivuoi i soldi, te li ridò". Ma ha un sacco di proprietà.

Quindi i piani non cambiano. Domani chiedo a Bartoletti per la PR e mi faccio un'altra branch per lavorare a un altro contratto.

## 4 nov

Quindi, cosa voglio fare adesso? Ho detto Lottery, Social Recovery Wallet, Deposit e Deposit. Lottery ha tantissime proprietà e non ho voglia. I due Deposit sono molto diversi, sono molto semplici, e mi stanno già antipatici. Social Recovery Wallet ha poche proprietà ma 160 righe, comincerei da quello.

 Proverei già a passare a un altro (ma su un'altra branch per rendere più facile la PR dopo). Proverei con Deposit.

## 5 nov



### 6 nov





### 7 nov



### 8 novemrbre



Devo vedere cos'è `memory` in Solidity.



### 9nov

Vedo `sstore` in alcuni file SolCMC. Vediamo cos'è. Non c'entra nulla.


Vediamo che fare adesso. Lottery ha troppe proprietà, dà fastidio. Deposit ERC20 è semplicissimo, ha solo tre proprietà. Io ci provo.

### 10 nov



### 11/11

Un po' di rigore. In `require x`, `x` è un predicato. Invece in $\exists x$, $x$ è una variabile.

In realtà devo pensare che `mathint x; require p(x);` significhi $\forall x\ |\ p(x)$. Questo ha già più senso. Somiglia al <span class="logica">[[Equivalenza dei calcoli|teorema di equivalenza dei calcoli]]</span>, dove dovevamo far corrispondere le strutture dati tra i due linguaggi formali.

Adesso abbiamo il quantificatore universale. Troviamo il quantificatore esistenziale.

Una specifica tipica è `TYPE x; require p(x); TYPE y; assert q(y);`, che significa $\forall x\ |\ p(x),\ \exists y\ |\ q(y)$. Tra l'altro non ho capito bene come scrivere "tale che" in simboli, non è possibile che debba scrivere spazi espliciti in LaTeX, di solito se scrivo giusto me lo formatta giusto. E non ho scritto i tipi nella notazione logica perché mi sembra ingombrante e meno leggibile.

Fatto sta che abbiamo trovato i quantificatori che cercavamo. Prendiamo la stessa formula e vediamo come cambia se mettiamo `negate` e `satisfy`:

|          | `assert`                          | `satisfy` |
| -------- | --------------------------------- | --------- |
|          | $\forall x.p(x),\ \exists y.q(y)$ |           |
| `negate` |                                   |           |

Non si può scrivere $|$ nelle tabelle perché è anche una "keyword" delle tabelle.

No ma ho sbagliato. Ho sbagliato. Perché non è vero quello che ho detto.

Prima di tutto, è incompleto. Perché fa sembrare che $x$ e $y$ debbano sempre essere distinti, quando in realtà mi conviene dire che ho un modello $m$ che ha membri $x$ e $y$. Tecnicamente tutto quello che voglio può essere incluso in $p()$ e $q()$, ma sto solo offuscando il significato di quello che scrivo.

L'altro problema è che quell'$\exists$ è sbagliato. Perché ovviamente quell'`assert` richiede che **tutte** le coppie $(x,y)$ soddisfino $q()$. Quindi in realtà abbiamo che `require p(m); assert q(m);` significa $\forall m.p(m),\ q(m)$. Chiaramente con la condizione che $\{m:p(m)\} = \emptyset$ è una condizione valida. Con la satisfy e la negate abbiamo le trasformazioni che conosciamo.

Non abbiamo risolto nulla. Io ci provo. Provo a chiedere a un LLM.

> I'm trying to write Certora rules. I'm able to write the rules in propositional logic, but I don't know how to translate them into Certora rules. My tool allows me to add the "negate" modifier to a rule, such that I may write the rule in a way that a certain contract yields negative, but the rule is tagged negative, so the contract is considered to pass the test.
> I have figured out this, for a certain model m:
> require p(m); assert q(m); - for all m such that p(m), q(m) (if p(m) is unsatisfiable, pass the test)
> require p(m); satisfy q(m); - exists m such that p(m), q(m) (if p(m) is unsatisfiable, pass the test)
> negate; require p(m); assert q(m); - exists m such that p(m), not q(m) (if p(m) is unsatisfiable, fail the test)
> negate; require p(m); satisfy q(m); - for all m such that p(m), not q(m) (if p(m) is unsatisfiable, fail the test)
> I want to use an arbitrary combination of for all and exists for variables in the model. For example "for all environments such that timestamp > CONST_X, exists sender Y, such that ...".

In effetti non so neanche come formulare quello che voglio. Io ci provo. No non ha capito niente, sta usando i quantificatori interni a Certora intesi come le regole `forall` ed `exists`, ma quelli richiedono di srotolare i loop e non è ciò che cerco, stai spostando il carico dal solver a un loop che è esattamente ciò che non cerchiamo, credo, forse, boh.

Però se non trovo un'alternativa uso quelli.

Tornando a noi, cosa sto provando a fare?$$\forall e.eoa(e) \exists (f,a) \ |\ f(e,a) \Rightarrow \lnot revert \land ok(\Delta \$)$$Dove:$$ok(x) \leftrightarrow x = this.$_{before} \qquad eoa(x)\leftrightarrow e.msg.sender = e.tx.origin$$
Però non è completo e non so come inserire l'altra cosa. Scrivo bene:
* EOA
* Esiste un metodo e degli argomenti

No non lo so. Aspetta. Se io genero un $(f,a)$ arbitrario, e richiedo che *non* permetta di svuotare il conto. Allora se **no**. Niente.

Filtro. Una require è un filtro. Io voglio che per ogni utente esista un metodo che permetta di fare quella cosa.

Se io genero un metodo arbitrario, allora l'assert mi richiede che $\forall (f,a)$. Io voglio $\exists (f,a)$. Se io metto una require, allora mi fa $(\lnot exists (f,a).p(f,a)) \lor (\forall (f,a).p(f,a),\ q(f,a))$. Che non è comunque ciò che voglio. Se nego tutto? $(exists(f,a).p(f,a)) \land (\exists (f,a),\ p(f,a) \land \lnot q(f,a))$. E tecnicamente io *potrei* mettere il mio $\forall$ dentro $q()$, però nel pratico non posso, perché dopo 64 loop il mio computer si arrende.

Perché il mio vecchio approccio di fare probe e asser mi trovava $\exists (f,a).\forall(e),\ p(f,a,e)$. Ma siamo sicuri? Perché questo mi sta mischiando require e assert. Secondo me sto sbagliando.

Assumiamo per assurdo che sia giusto. Cos'ho fatto con probe e asser? No, sto mischiando i due tentativi.

Provo a scrivere qualcosa, e vedo cosa significa. Come si usa `exists`? Perché realisticamente ci sono pochi metodi, quindi non dovrei avere il problema dei loop. Non c'è bisogno di mettere un "tale che", è un semplice $\exists n.p(n)$. Posso benissimo usare quello.

Non credo di poter mettere una chiamata dentro `exists`.

Bene. Ho scritto una cosa estremamente stupida. Perché questo funzionerebbe in un loop di un linguaggio imperativo.

```CVL
assert exists method f. exists calldataarg a.
	((true || (f@withrevert(e,a) at lastStorage)) => ((nativeBalances[e.msg.sender] - senderBalBefore) == contractBalBefore));
```

O, come l'avevo scritto prima,
```CVL
assert exists method f. exists calldataarg a.
	((true || f(e,a)) => ((nativeBalances[e.msg.sender] - senderBalBefore) == contractBalBefore));
```

Ok in effetti il problema è che `exists calldataarg` ha troppi valori da controllare.

Ma a prescindere è un errore di sintassi. Niente.

Non so come scriverlo, basta.

Ma poi sto sovrageneralizzando, posso provare ad assumere che il metodo sia lo stesso per tutti, e che l'argomento sia lo stesso per tutti. Ma non lo farò adesso. Tornerei su `withdraw`. Secondo me il mio approccio probe/asser può funzionare, anche se non corrisponde astrattamente alla specifica. Sarebbe:$$\exists n.\forall eoa,\ wd(eoa,n) \to ok(\Delta\$)$$Perché posso dire che è $\forall$? Boh perché sì boh basta.

#### Call wrapper

Non ne posso più di Deposit.



Ha più senso provare Lottery.

#### Lottery


Ma poi io non so se Lottery va aggiustato o no. Perché magari il ✅ ce l'hanno solo i contratti che hanno anche Halmos e Forge. No, ok, Vault ha il ✅ ma ha solo Certora e SolCMC. Rassicurante, così non scopro a caso di aver fatto lavoro a vuoto.

### 12 nv
### 13 nov

Vediamo cosa devo scrivere a Bartoletti. Le cose dell'altra volta più cose nuove.

> Buongiorno, ho dubbi sull'interpretazione di alcune proprietà.
> 
> HTLC:
> * **reveal-timeout-after-isCommitted**: "`reveal()` and `timeout()` can only be successfully called if contract is in a committed state" - La definizione sembra intendere che il contratto debba essere nello stato committed prima della chiamata di questi metodi, e il test SolCMC corrisponde a questa interpretazione, ma il test Certora controlla lo stato dopo la chiamata del metodo, che corrisponde alla ground truth. Dovrei fidarmi della ground truth o correggerla?
> 
> Vesting Wallet:
> * **rel-strict-incr**: "\[...\] the releasable amount is strictly increasing \[...\]" - Una funzione da interi a interi è sempre una funzione costante a tratti, poiché i risultati delle divisioni vengono troncati, perciò esistono coefficienti angolari che fanno sì che due valori diversi in input risultino nello stesso output (perché se la funzione fosse continua, la differenza negli output sarebbe minore di 1). Tali funzioni dovrebbero essere considerate strettamente crescenti come secondo la ground truth? Ho scritto un test che compensa il problema se la funzione è lineare.
> * **rel-grows-linear**: "releasable grows linearly \[...\]: two successful consequent calls to `releasable` differ by c\*t, where t is the timestamp difference between the two calls, and c is a fixed constant for the contract" - Stesso problema, anche qui il mio test compensa il troncamento con del margine di errore e corrisponde alla ground truth, dovrei usare la definizione esatta o accettare del margine di errore?

Ok in realtà le altre cose sono le variabili ghost incluse nel contratto che potrebbero essere un rimasuglio di una versione vecchia del progetto, e il fatto che la cosa che controlla che `assert` e `satisfy` non siano nella stessa regola è rotta.

Però in effetti controllo che esista almeno un esempio di un file `.spec` con più di una regola. Ok non c'è un singolo file che contiene due volte la parola `rule`, immagino di non dover usare due regole nella stessa spec.

