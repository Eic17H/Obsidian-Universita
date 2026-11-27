---
cssclasses:
  - r54
---
## `ERR` eccessivi

Quando ho un errore del tipo:

```log
Verifier run command:
 java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_26_23_34_47_814229d7b2
ERROR: Execution of command "java -jar /usr/tirocinio/bin/.certora/prover/emv.jar -ruleSanityChecks none -ciMode true -buildDirectory .certora_internal/26_11_26_23_34_47_814229d7b2" terminated with exitcode 100.
CRITICAL: [ForkJoinPool-1-worker-5] ERROR ALWAYS - Timed out waiting for background tasks:
CRITICAL:     

Certora Prover run failed (code 1)
```

Che si presenta *dopo* che Certora ha già dato il risultato, il parser lo interpreta come `ERR`. In particolare da questa riga:

```Python
# is_violated and is_verified must be mutually exclusive
if (not is_violated) and (not is_verified_once):
	logging.error("182")
	return ERROR, log.stdout
```

Il problema è che questa proprietà è stata violata eccome:

```log
The scene contains 1 contracts:
Htlc : 0xce4604a0000000000000000000000001
Running initial transformations
Has CVL checks.
Checking CVL certora/sent-le-init-bal.spec for contract Htlc
Unrolling loops 1 time, unwinding condition is asserted
Verified: inv-Induction base: After the constructor
Violated: inv-Using general requirements-commit(bytes32)
Violated: inv-Using general requirements-timeout()
Violated: inv-Using general requirements-reveal(string)
Error: Timed out waiting for background tasks:
```

Vediamo le due righe responsabili:

```Python
is_violated = property_violated(log.stdout, spec_path)
is_verified_once = property_verified_at_least_one(log.stdout, spec_path)
```

Mi concentro prima sulla prima.

```Python
def property_violated(output, spec_path):
    property_name = str(spec_path).replace("certora/","").replace(".spec","").replace("-","_")
    return f"Violated: {property_name}" in output or f"Failed on {property_name}" in output
```

Mi sembra strano. Vediamo cosa contiene `output`.

```log
WARNING: 'wait_for_results' has no effect in local tool runs
WARNING: Build cache is used with a local certora-cli script version. Beware of false hits and unexpected behaviors!
Start Thu Nov 26 23:44:39 CET 2026
The scene contains 1 contracts:
Htlc : 0xce4604a0000000000000000000000001
Running initial transformations
Has CVL checks.
Checking CVL certora/sent-le-init-bal.spec for contract Htlc
Unrolling loops 1 time, unwinding condition is asserted
Verified: inv-Induction base: After the constructor
Violated: inv-Using general requirements-timeout()
Violated: inv-Using general requirements-commit(bytes32)
Violated: inv-Using general requirements-reveal(string)
Error: Timed out waiting for background tasks:
```

A me sembra che ci sia. E invece no. Perché c'è `Violated`, ma non col nome della proprietà. Sembra che l'output sia interrotto dal timeout.

Non lo so.

Potrei mettere che riconosce come violazione qualunque `Violated`, ma potrebbe riconoscere come violate certe proprietà che è giusto che non lo siano. Dubito, dovrò fare test.

Ma credo che il vero problema sia il time out.

## `assert` e `satisfy`

Certora non permette ad `assert` e `satisfy` di essere usati nella stessa regola. Niente ti vieta di avere una regola con uno a una regola con l'altro nello stesso file.

Il parser non capisce questa cosa, e rigetta tutti i file che contengono sia "assert" che "satisfy" fuori dai commenti. Non solo questo è sbagliato, visto che potresti avere "assert" nel nome di una variabile, come `assertionBoolean`, ma rigetta anche un file in cui sono presenti in regole diverse.

Credo che Certora stesso sia capace di gestire la situazione da solo... e invece no. No? Ho tolto il check dallo script e mi ha dato positivo.

> `satisfy` statements are never checked in the same sub-rule with `assert` statements, and they are always checked under [optimistic assumptions](https://docs.certora.com/en/latest/docs/user-guide/glossary.html#term-optimistic-assumptions). This means that rules without any explicit `assert` statements will not check the [pessimistic assertions](https://docs.certora.com/en/latest/docs/user-guide/glossary.html#term-pessimistic-assertions), i.e., the implicit assertions that we insert in rules with `assert` statements when at least one of the “optimistic” flags is not set. In order to trigger creation of a sub-rule that contains these checks, users can insert an `assert true` statement into the rule. This assert itself will never be violated, but the sub-rule we create for it will contain all the pessimistic assertions for the program.

Non capisco bene. Credo che semplicemente significhi che se una regola contiene sia `assert` che `satisfy`, la `satisfy` sia ignorata. E mi torna, perché questa regola passa:

```CVL
rule test {
    assert true;
    satisfy false;
}
```

Qui ho tre opzioni:
- Fregarmene e rimuovere completamente il check.
- Sperare che le parentesi graffe delimitino sempre una regola, e vietare due assert o due satisfy all'interno della stessa regola in questo modo.
- Lasciarlo solo come warning.

Di sicuro però devo risolvere il problema di `assertionBoolean`.

Credo che questo funzioni:

```Python
has_assert_and_satisfy = re.search('{[^}]*[^}a-zA-Z0-9_]assert[^}a-zA-        has_assert_and_satisfy = re.search('{[^}]*[^}a-zA-Z0-9_]assert[^}a-zA-Z0-9_][^}]*[^}a-zA-Z0-9_]satisfy[^}a-zA-Z0-9_][^}]*}', spec_no_comments)
	has_satisfy_and_assert = re.search('{[^}]*[^}a-zA-Z0-9_]satisfy[^}a-zA-Z0-9_][^}]*[^}a-zA-Z0-9_]assert[^}a-zA-Z0-9_][^}]*}', spec_no_comments)
	if has_assert_and_satisfy or has_satisfy_and_assert:
		msg = f'Error in {spec_path}: Combining both "satisfy" and "assert" in one rule is not allowed.'
		logging.error(msg)
		return ERROR, msg
```

Non trovo un buon regex per gli identificatori di CVL, ma credo siano quelli.