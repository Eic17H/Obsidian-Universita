> A smart contract is a piece of code that gets executed on the Ethereum blockchain. It functions somewhat like an API microservice on the web that is publicly accessible to everyone. All of the code of the smart contract is visible to the public, and we can allow anyone connected to the network to call functions on the smart contract.

Si può usare l'IDE online [remix.ethereum.org](https://remix.ethereum.org). L'estensione del file è `.sol` e i programmi consistono di *smart contract*. Nel codice sorgente, scriviamo la versione del linguaggio che vogliamo utilizzare e poi dichiariamo un contratto.

```Solidity
pragma solidity ^0.8.0;

contract Main {
	
}
```

> This variable is called a "state variable" because it actually persists data to the blockchain. Anytime that we set this value, the string will be saved to the blockchain! It will get written to storage, not memory.

L'architettura blockchain è un'alternativa all'architettura client-server. Anziché avere un client che si collega a un server che legge dati da un DB, hai un client che si collega alla blockchain, la quale contiene sia i dati che il codice del backend. Mentre con un server puoi modificare il codice, con la blockchain puoi solo aggiungere nuovi dati: la block-chain è una lista con*caten*ata di *blocchi* di codice. Quando aggiungi un blocco, ti colleghi al blocco precedente tramite la sua hash, che quindi non può essere modificato senza avere ripercussioni su tutti quelli successivi.