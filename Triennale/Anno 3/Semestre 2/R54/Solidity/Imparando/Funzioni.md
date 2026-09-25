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

`payable`: hanno il permesso di ricevere Ether, soldi, e in quel caso c'è un valore `msg.value` di tipo `uint256` che dice quanto ha pagato.

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

## Revert

Una chiamata a funzione può essere abortita con un errore, riportando l'ambiente allo stato in cui era prima dell'esecuzione. Questo ripristino dello stato è detto revert. Il gas utilizzato è perso.

Avviene con `require()`, `revert()` e `assert()`.
## Reentrancy

Una chiamata rientrante (*reentrant call*) è una chiamata a un contratto che avviene mentre è ancora in esecuzione una chiamata precedente allo stesso contratto e lo stato del contratto chiamato non è stato ancora aggiornato.

Per esempio, molto semplice:
```Solidity
mapping(address => uint256) public conti;
function prelievo() external {
	// Quanti soldi ha chi prelieva
	uint256 quantita = conti[msg.sender];
	// Non puoi prelevare se non hai soldi
    require(quantita > 0);

    // Invii i soldi
    (bool ok, ) = msg.sender.call{value: quantita}("");
    require(ok);

	// Ti segni che non ha più soldi
    conti[msg.sender] = 0;
}
```

In questo caso, invii i soldi prima di segnarti che non ha più soldi. Quindi può chiamare la funzione due volte insieme, e tu gli invii due volte i soldi e poi ti segni una sola volta che non ne ha più.

Ricorda SO, se avrò voglia metterò un link. Come visto in SO, questo si può risolvere con un mutex.

Per esempio, nel nostro progetto abbiamo `ReentrancyGuard.sol`, che ha un mutex condiviso da tutte le funzioni che hanno il modificatore `nonReentrant()`. La logica semplificata è:

```Solidity
bool occupato = false;
modifier nonReentrant() {
	require(!occupato);
	occupato = true;
	_;
	occupato = false;
}
```

Questo significa che può esserci una sola funzione non-rientrante alla volta nella call stack. In teoria questo significa che una funzione non-rientrante non può chiamarne un'altra, la soluzione è renderle private e dare loro punti d'entrata non-rientranti esterni.