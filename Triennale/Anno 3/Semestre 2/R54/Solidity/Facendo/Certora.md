---
cssclasses:
  - r54
---
## Nozioni

La variabile globale `block.timestamp` di Solidity è `uint64`, ma viene trattata come `uint256` in Certora, quindi bisogna fare sempre il modulo con `2^64`. A tal proposito, Solidity fa la potenza con `**`, invece Certora con `^`.

