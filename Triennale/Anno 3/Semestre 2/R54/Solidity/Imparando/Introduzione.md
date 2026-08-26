A smart contract is a piece of code that gets executed on the Ethereum blockchain. It functions somewhat like an API microservice on the web that is publicly accessible to everyone. All of the code of the smart contract is visible to the public, and we can allow anyone connected to the network to call functions on the smart contract.

Si può usare l'IDE online [remix.ethereum.org](remix.ethereum.org). L'estensione del file è `.sol` e i programmi consistono di *smart contract*. Nel codice sorgente, scriviamo la versione del linguaggio che vogliamo utilizzare e poi dichiariamo un contratto.

```Solidity
pragma solidity ^0.8.0

contract Main {
	
}
```

This variable is called a "state variable" because it actually persists data to the blockchain. Anytime that we set this value, the string will be saved to the blockchain! It will get written to storage, not memory.