---
cssclasses:
  - r54
---
Un contratto normale è scritto in linguaggio naturale. Il problema è che il linguaggio naturale è spesso <span class="logica">[[Ambiguo, vago, relativo|ambiguo, vago o relativo]]</span>, quindi anche se entrambe le parti coinvolte leggono e sono d'accordo sul contratto, possono comunque non essere d'accordo su quello che significa.

Gli smart contract sono contratti scritti in linguaggio formale, assolutamente non ambiguo, soprattutto perché all'inizio del contratto scriviamo la versione del compilatore che intendiamo usare. Non c'è spazio per interpretazioni. Usiamo la OOP, e ogni contratto è un oggetto.

Il problema qui è diverso: il codice del contratto può essere scritto in modo tale che quello che fa sia diverso da quello che sembra (prendi per esempio il codice offuscato). Sarebbe molto più facile analizzare singoli comportamenti del contratto anziché l'intero contratto, che è molto più complesso. Anziché farlo con [[unit test|unit test]], che potrebbero mancare input specifici che si comportano in modo diverso, usiamo la verifica formale: trasforma il codice in formula matematica e dimostra teoremi su quella formula.

Il mio compito è di scrivere test in due linguaggi, Solidity e CVL, usando due tool, SolCMC e Certora. Questi due tool hanno limitazioni diverse: SolCMC aggiunge solo un metodo al contratto e lo chiama, ma un contratto può avere interazioni possibili solo dall'esterno, e all'interno di un contratto non passa il tempo, mentre Certora esegue chiamate al contratto da uno o più ambienti esterni, ma astrae eccessivamente alcune operazioni e ha alcune differenze con la macchina virtuale di Ethereum.

Ogni contratto presente nel progetto ha una descrizione in linguaggio naturale, compresi i teoremi da dimostrare (proprietà, cioè singoli comportamenti), un'implementazione corretta in Solidity, e una *ground truth*, cioè una lista di vero/falso che ci dice se ciascuna versione del contratto rispetta ciascuna proprietà. Sono anche presenti implementazioni sbagliate del contratto, per vedere se i tool si rendono conto se sono sbagliati. Il mio compito è quindi anche di scrivere versioni appositamente sbagliate (o giuste in modo strano) dei contratti, per vedere se i tool si accorgono che sono sbagliate (o se spingono false accuse).

Alcuni contratti sono già completi, altri li devo completare io. È possibile che una proprietà esista ma che il suo comportamento corretto sia di essere falsa (per esempio la proprietà `non-funziona`).

Inserire cose della selfdestruct.

