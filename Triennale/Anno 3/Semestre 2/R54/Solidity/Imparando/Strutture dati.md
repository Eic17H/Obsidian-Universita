## Enum

Dichiariamo un'enum con un nome, e a differenza del C, il nome è direttamente un tipo. L'utilizzo dei valori somiglia al Java.

```Solidity
enum Moneta {Testa, Croce}
contract Main {
    Moneta moneta = Moneta.Testa;
}
```

Gli operatori `==` e `!=` funzionano normalmente.

## Struct

Praticamente identico al C, ma come con gli enum non c'è bisogno di definire un tipo.

```Solidity
struct Persona {
    string nome;
    string cognome;
}
```

## Array

```Solidity
string[] public nomi;
```

Questa è la sintassi. Questo array è pubblico, quindi ci crea la funzione `nomi()`. Però chiamare semplicemente `nomi()` non ci restituirà semplicemente l'array, invece dobbiamo passare un parametro che è l'indice, e ci restituisce un elemento alla volta. Gli indici partono da `0`.

## Mappe

Le mappe sono tipi derivati da due tipi.

```Solidity
mapping(string => string) public professoriMaterie;
```

Il primo tipo agisce da chiave, il secondo da dato. Per aggiungere un dato:

```Solidity
idNomi["ALF"] = "Bartoletti";
idNomi["PR1"] = "Scateni";
```