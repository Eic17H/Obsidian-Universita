Vediamo un contratto e capiamo cosa fa. Per la licenza, includo il link all'[originale](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/finance/VestingWallet.sol).

```Solidity
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (finance/VestingWallet.sol)
pragma solidity >= 0.8.2;

/// @custom:version from OpenZeppelin.
contract VestingWallet {

    uint256 private released;
    address private immutable beneficiary;
    uint64 private immutable start;
    uint64 private immutable duration;

    constructor(address beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds) payable {
        require (beneficiaryAddress != address(0), "VestingWallet: beneficiary is zero address");
	    require (durationSeconds > 0); // require not present in OpenZeppelin
	
        beneficiary = beneficiaryAddress;
        start = startTimestamp;
        duration = durationSeconds;
    }

    receive() external payable virtual {}

    function releasable() public view virtual returns (uint256) {
        return vestedAmount(uint64(block.timestamp)) - released;
    }

    function release() public virtual {
        uint256 amount = releasable();
        released += amount;

        (bool success, ) = beneficiary.call{value: amount}("");
        require (success);
    }

    function vestedAmount(uint64 timestamp) public view virtual returns (uint256) {
        return vestingSchedule(address(this).balance + released, timestamp);
    }

    function vestingSchedule(uint256 totalAllocation, uint64 timestamp) internal view virtual returns (uint256) {
        if (timestamp < start) {
            return 0;
        } else if (timestamp > start + duration) {
            return totalAllocation;
        } else {
            return (totalAllocation * (timestamp - start)) / duration;
        }
    }

}
```

Prima leggo il codice e lo descrivo, poi leggo la definizione in inglese.

Richiede:
* Che il beneficiario sia un indirizzo valido, quindi non l'indirizzo `0` che sarebbe una sorta di `NULL`.
* Che la durata non sia nulla.

`receive()` è una funzione senza implementazione.

`releasable()` chiama `vestedAmount()` con un parametro default, `vestedAmount()` chiama `vestingSchedule()` con un parametro default e uno passato, e `vestingSchedule()` è la funzionalità principale di questo contratto.

`vestingSchedule()` prende i soldi allocati e un momento nel tempo, e restituisce un certo numero. Se il tempo non è valido, restituisce `0`, chiaramente perché prima dell'esistenza del portafogli non c'era niente. Se il tempo è successivo alla scadenza del portafogli, i soldi sono quelli allocati. Altrimenti è una porzione dei soldi allocati, corrispondente alla porzione di tempo passata.

Vediamo la definizione:

> The contract handles the maturation (vesting) of native cryptocurrency for a given beneficiary. The constructor specifies the address of the beneficiary, the first block height (start) where the beneficiary can withdraw funds, and the overall duration of the vesting scheme. Once the scheme is expired, the beneficiary can withdraw all the funds from the contract. At any moment between the start and the expiration of the vesting scheme, the beneficiary can withdraw an amount of ETH proportional to the time passed since the start of the scheme. The contract can receive ETH at any time through external transactions: these funds will follow the vesting schedule as if they were deposited from the beginning.

Quindi, niente, è un conto da cui puoi ritirare solo una certa porzione dei soldi totali mai versati, e questa porzione corrisponde alla porzione della sua esistenza.

