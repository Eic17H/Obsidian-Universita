## Tipi e variabili

Solidity è staticamente tipato, quindi le variabili vanno dichiarate insieme al tipo.

Per dichiarare una variabile specifichiamo:
* Il tipo;
* Opzionalmente, la [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Ereditarietà#Visibilità|visibilità]], per esempio `public`, dichiarando una variabile pubblica stiamo implicitamente dichiarando una funzione con lo stesso nome che ne restituisce il valore;
* Se è costante, con `constant`;
* Il nome;
* Opzionalmente (o obbligatoriamente se è costante), il valore default, con `=` seguito dal valore.

Le variabili dichiarate nel corpo del contratto, quindi fuori da una funzione, sono *state variables*, e quindi sono scritte nella blockchain. Se invece sono dichiarate dentro una [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Funzioni|funzione]], sono variabili locali.

```Solidity
pragma solidity ^0.8.0;

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
* Indirizzi di blockchain, `address`;
* Numero specifico di byte, da `bytes1` a `bytes32`.

Un `uint` ha di default 256 bit. Possiamo specificare il numero di bit, per esempio `uint8`.

I tipo `bytes` sono indicizzabili con `[]` come se fossero array, ma in sola lettura.

I numeri razionali si comportano correttamente sia come letterali che come risultato delle divisioni. Se un'operazione aritmetica tra razionali ha come risultato un intero, il valore sarà di tipo intero. Un valore razionale non può interagire col valore di una variabile (per esempio in un'espressione aritmetica) o essere assegnato, in quel caso, come `2.5 + a`, è un errore di sintassi (vedi l'<span class="lip">[[Razionali|implementazione nel progetto di LiP]]</span>).

### Indirizzi

Il tipo `address` ha attributi e metodi come una classe di oggetti:
* `.balance` (`uint256`): quanti soldi ha;
* Poi gli altri non li ho capiti;
* Metodi lasciamo stare.
### Variabili globali

Ci sono variabili condivise da tutti i contratti.

* `this`: si riferisce al contratto dentro cui viene usata;
* `super`: un contratto un livello di [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Ereditarietà|ereditarietà]] più in alto.

## Operatori

In ordine di precedenza:
1. `++`, `--`: incremento e decremento unario postfisso;
   `.`: accesso ai membri di enum e contratti;
2. `++`, `--` incremento e decremento unario prefisso;
   `-`: negazione numerica;
   `!`: negazione booleana;
   `~`: negazione bitwise;
3. `**`: esponenziazione;
4. `*`, `/`, `%`: moltiplicazione, divisione, modulo;
5. `+`, `-`: addizione e sottrazione;
6. `<<`, `>>`: bitshift
7. `&`: congiunzione bitwise;
8. `^`: xor bitwise;
9. `|`: disgiunzione bitwise;
10. `<`, `>`, `<=`, `>=`: disuguaglianza;
11. `==`, `!=`: uguaglianza;
12. `&&`: congiunzione logica;
13. `||`: disgiunzione logica;
14. `?:`: operatore ternario;
    `=`, `+=`, ...: assegnamento e assegnamento+operatore;
15. `,`: virgola.

Con gli operatori booleani, si applica la short circuit, che influisce sui side-effects come in C.

## Strutture dati

### Enum

Dichiariamo un'enum con un nome, e a differenza del C, il nome è direttamente un tipo. L'utilizzo dei valori somiglia al Java.

```Solidity
enum Moneta {Testa, Croce}
contract Main {
    Moneta moneta = Moneta.Testa;
}
```

Gli operatori `==` e `!=` funzionano normalmente.

### Struct

Praticamente identico al C, ma come con gli enum non c'è bisogno di definire un tipo.

```Solidity
struct Persona {
    string nome;
    string cognome;
}
```

### Array

```Solidity
string[] public nomi;
```

Questa è la sintassi. Questo array è pubblico, quindi ci crea la funzione `nomi()`. Però chiamare semplicemente `nomi()` non ci restituirà semplicemente l'array, invece dobbiamo passare un parametro che è l'indice, e ci restituisce un elemento alla volta. Gli indici partono da `0`.

### Mappe

Le mappe sono tipi derivati da due tipi.

```Solidity
mapping(string => string) public professoriMaterie;
```

Il primo tipo agisce da chiave, il secondo da dato. Per aggiungere un dato:

```Solidity
professoriMaterie["ALF"] = "Bartoletti";
professoriMaterie["PR1"] = "Scateni";
```

A cosa possono servire?

Per esempio, se io ho degli indirizzi, e di ognuno so quanti soldi ha, per salvarlo posso usare una mappa che come chiave ha gli indirizzi, e come dato ha un intero che rappresenta i suoi soldi.

```Solidity
mapping(address => uint) public conti;
```

Uno dei due tipi può esso stesso essere una mappa. Per esempio, se per ogni indirizzo non voglio salvare i suoi soldi, ma quanti soldi deve a un altro indirizzo, posso avere come chiave l'indirizzo del debitore, e come dato una mappa che rappresenta i suoi debiti. Ciascuna di queste mappe ha come chiave l'indirizzo del creditore, e come valore la quantità di soldi.

```Solidity
mapping(address => mapping(address => uint) public debiti;
```

Concettualmente somiglia a una mappa che come chiave ha una coppia ordinata di indirizzi, e come dato un intero. E se ci pensi questa corrispondenza tra le due strutture ricorda le <span class="alf">[[funzioni di secondo ordine]]</span>.