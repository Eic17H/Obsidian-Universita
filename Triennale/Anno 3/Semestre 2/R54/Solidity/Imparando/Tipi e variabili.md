Solidity è staticamente tipato, quindi le variabili vanno dichiarate insieme al tipo.

Quando dichiariamo una variabile, la possiamo dichiarare come `public`, che è la sua [[Visibilità|visibilità]]. Dichiarando `int public numero`, stiamo implicitamente anche dichiarando la funzione `numero()` che restituisce il valore della variabile. Possiamo anche dare un valore default alle variabili, `int public numero = 6`, che è equivalente ad assegnare un valore nel costeuttore. Possiamo dichiare `int public constant numero = 6`, e in quel caso non è proprio possibile assegnare un valore nel costruttore.

Un `uint` ha di default 256 bit. Possiamo specificare il numero di bit, per esempio `uint8`.

Le variabili dichiarate nel corpo del contratto, quindi fuori da una funzione, sono *state variables*, e quindi sono scritte nella blockchain. Se invece sono dichiarate dentro una [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Funzioni|funzione]], sono variabili locali.

```Solidity
pragma solidity ^0.8.0

contract MyContract {
	string public stringa = "Hello world";
	bool flag = true;
	int public interoConSegno = 1;
	uint interoSenzaSegno = 1;
	address public indirizzo = 0xBEEF;
}
```

Vediamo alcuni tipi comuni:
* Stringhe, `string`;
* Booleani, `bool`;
* Interi con e senza segno, `int` e `uint`;
* Indirizzi di blockchain, `address`.
## Variabili globali

Ci sono variabili condivise da tutti i contratti.

* `this`: si riferisce al contratto dentro cui viene usata;