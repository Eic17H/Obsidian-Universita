I tipi di Certora non corrispondono 1:1 coi [[Valori|tipi di Solidity]], ma i valori di Solidity possono più o meno essere castati nelle variabili di Certora.

## Tipi normali

### `mathint`

## `env`

Se abbiamo un metodo che non è envfree, cioè che scrive o legge dall'ambiente, dobbiamo dichiarare un ambiente in cui viene eseguita, e passarlo come primo parametro.

Quindi, se in Solidity ho il metodo `paga(uint)`, ed è un metodo che modifica l'ambiente, in Certora sarà `paga(env, mathint)`.

Se invece è envfree, non ottiene quel parametro in più.

`env` è essenzialmente una struct i cui campi sono quelle che sarebbero le variabili globali di Solidity: `msg`, `block` e `tx`.

## `method`

#todo

## Tipi definiti in Solidity

I tipi non sono ereditati. Quindi se un tipo `foo` è definito in `Bar`, e usato in `Baz is Bar`, in CVL dovremo comunque scrivere `Bar.foo` come tipo, anche quando testiamo Baz.