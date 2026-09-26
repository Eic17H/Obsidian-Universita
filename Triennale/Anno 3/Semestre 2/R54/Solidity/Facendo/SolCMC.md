SolCMC è un tool per fare test su contratti. Definiamo il modo in cui bisogna interagire col contratto, i casi da ignorare, i casi in cui il test passa e i casi in cui il test non passa. Se esiste un input che non passa, questo vale controesempio per la proprietà in questione, e sappiamo che la proprietà non vale.

Diciamo che un positivo o un negativo sono soddisfatti quando la proprietà potrebbe valere o potrebbe non valere, e sono asseriti quando si dimostra che vale o che non vale. I primi si indicano coi risultati `P` ed `N`, i secondi con `P!` ed `N!`. `P` può essere un falso positivo ed `N` può essere un falso negativo. Si può avere un falso negativo quando c'è una chiamata esterna, quindi il tool non può sapere se il contratto chiamato fa qualcosa che non va bene per la proprietà. La maggior parte dei risultati sono asseribili.

Si possono usare due solver: [[Z3]] ed [[Eldarica]]. Ci sono cose che uno può dimostrare e l'altro no. Certe volte uno sta tantissimo su una proprietà e non riesce a dimostrare niente, e l'altro lo fa subito, certe volte invece sono uguali. Per quando ci stanno mettendo tanto, c'è un timeout, e quando scade si mette come risultato `UNK`.

Se invece l'esecuzione del test dà errore (il solver non è installato, c'è un errore di Python, simile) il risultato è `ERR`.
## Comprensione informale con esempio

Vediamo `bal-decr-onlyif-wd-reclaim` di Crowdfund. Vediamo la definizione in inglese e in SolCMC.

> after the donation phase, if the contract balance decreases then either a successful `withdraw` or `reclaim` have been performed.


```Solidity
function invariant(uint choice) public payable {
    
    // Siamo nella fase di cui parla la proprietà
    require(block.number > end_donate);

	// Quanti soldi ha all'inizio
    uint _balance = address(this).balance;

    if (choice == 0) {
        donate();
    } else if (choice == 1) {
        withdraw();
    } else if (choice == 2) {
        reclaim();
    } else {
	    // Il test viene ignorato
        require(false);
    }
    
    // Se non lo è, il test viene ignorato
    require(address(this).balance < _balance);
    // Il test è fallito se la condizione è falsa
    assert(choice == 1 || choice == 2);
}
```

Questo test quindi:
* Prende un numero in input, e ignora il test se non è $0$, $1$ o $2$;
* Ignora il test se non vale una disuguaglianza (cosa sia quella disuguaglianza riguarda il funzionamento interno del contratto, non ci pensiamo);
* Legge quanti soldi ha il contratto;
* Esegue un metodo scegliendolo sulla base del numero in input;
* Se i soldi che il contratto ha dopo l'esecuzione del metodo sono minori di quelli di prima, fallisce se il metodo eseguito è quello che corrisponde all'input $0$.

Quindi il test fallisce se l'input $0$, cioè la funzione `donate()`, toglie soldi al contratto. Infatti questo contratto *accetta* donazioni tramite `donate()`, e paga persone con gli altri due metodi.