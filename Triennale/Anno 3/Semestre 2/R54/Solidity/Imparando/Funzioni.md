Possiamo dichiarare funzioni.

```Solidity
pragma solidity ^0.8.0;

contract MyContract {
	string nome = "Massimo";
	
	function setName(string memory _name) public {
		nome = _name;
	}
	function getName() public view returns(string memory) {
		return nome;
	}
	function resetName() internal {
		nome = "Massimo";
	}
}
```

Qui, `setName` è una funzione pubblicamente visibile che prende in input una stringa e modifica la variabile di stato `nome`.

Le funzioni possono essere pubbliche o interne, con `public` e `internal`.

In Solidity ci sono due tipi principali di funzioni: quelle che scrivono informazioni nella blockchain e quelle che non lo fanno. La differenza è importante perché scrivere sulla blockchain è a pagamento.

Le funzioni si dichiarano con `function`, e il tipo di ritorno si scrive come ultima cosa come `returns(TIPO)`

#todo: cosa fa `memory`?

## Modificatori

`view` significa che la funzione non modifica lo stato della blockchain (è senza side-effects), ma lo può leggere.

`pure`: non modificano ***né leggono*** lo stato

`payable`: hanno il permesso di ricevere Ether, soldi.

Possiamo anche dichiarare nuovi modificatori e applicarli alle funzioni:

```Solidity
pragma solidity ^0.8.0;

contract MyContract {
	modifier soloProprietario {
		require(msg.sender == owner, 'caller must be owner');
		_;
	}
}
```

Usiamo la keyword `require`, e mettiamo come primo parametro un'espressione booleana che deve essere vera, e come secondo parametro il messaggio di errore. Questo che abbiamo creato fa sì che chi chiama la funzione debba sempre essere il proprietario del contratto.

`_` invece rappresenta il corpo della funzione modificata. Questo è perché il corpo del modificatore non è altro che del normalissimo codice che viene eseguito *al posto* della funzione modificata, ed è per questo che mettiamo `_` per includere anche il codice originale. Questo è utile perché così possiamo anche aggiungere codice *dopo* quello della funzione e non solo prima.

Non possiamo mettere `return` nei modificatori.

## Constructor

`constructor` è una funzione particolare in Solidity. La funzione costruttore è una funzione che viene eseguita una e una sola volta, quando il contratto viene inizializzato nella blockchain.

Non ha altri limiti in confronto a qualunque altro tipo di funzione, puoi darle parametri e renderla pagabile, l'unico vincolo è che si può chiamare una sola volta.