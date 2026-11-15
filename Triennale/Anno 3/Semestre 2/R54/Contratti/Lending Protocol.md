---
cssclasses:
  - r54
---
Scusa eh, Lending Protocol ha una ground truth incompleta. Come.

Quindi quello che farò adesso sarà:
* Capire una proprietà alla volta
* Guardare v5 e v6
* Completare la ground truth

I test Certora sono molto molto strani, ci sono cose che non ho mai visto, ma hanno senso.

Mi sa che controllo bene Escrow e vedo se posso fare una pull request. Devo anche vedere se posso fare una pull request con solo certi file e non altri.

> The main difference is that these are not equivalent harnesses.
> 
> - `arbitrate-send.spec` is a Certora **rule**. It calls `arbitrate` and checks the arbiter’s net balance change, using `mathint` so the difference is not subject to Solidity’s `uint` arithmetic.
> - `arbitrate-send.sol` defines a Solidity function named `invariant`, but that name has no special meaning to SolCMC. It is a public function that the model checker analyzes as part of the contract’s reachable behavior.
> 
> There’s also a likely contract-level confounder: the escrow versions declare `deposit` but don’t assign `msg.value` to it in the constructor. Starting from the constructor’s reachable state, `deposit` is therefore zero. For a positive `fee`, `deposit -= fee` in `arbitrate` underflows and the call reverts before sending the fee. Certora’s rule can reason about a pre-state where `arbitrate` succeeds; SolCMC’s harness runs against reachable state, where that successful path may not exist. A reported SolCMC assertion violation could therefore concern the underflow or the harness execution—not necessarily the fee-transfer assertion. The SolCMC result parser labels a generic “Assertion violation happens here” as a negative result.
> 
> The recorded outcomes also depend heavily on solver: `solcmc-eld.csv` has mostly `N` for this property, while `solcmc-z3.csv` has `UNK` for every version. Certora reports `P!` except for the known wrong-recipient variant, v5, which is `N`.
> 
> So the short answer is: the result gap is likely driven by the missing `deposit` initialization plus the difference between a Certora rule’s pre-state and SolCMC’s reachable-state analysis—not simply by SolCMC discovering that the arbiter receives the wrong amount. To confirm which assertion caused each `N`, we’d need the per-run SolCMC logs; the CSV summary doesn’t include that information.

Devo capire se Copilot dice il vero. Effettivamente deposit mi sembrava strano. Direi che provo a reimplementare da zero Escrow senza guardare v1. (l'ho fatto e l'ho ricreato quasi 1:1 carattere per carattere, inutile).

A mezzanotte capisco che la cosa da risolvere è proprio la cosa di `deposit` adesso. Ah e ho trovato un test che il tool effettivamente sbaglia.

